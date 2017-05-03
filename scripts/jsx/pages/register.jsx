import React from 'react'

import AuthServices from '../services/auth'

class RegisterPage extends React.Component {

	constructor(props) {
	    super(props);
	    this.changeEmail = this.changeEmail.bind(this);
		this.changePwd = this.changePwd.bind(this);
		this.changeName = this.changeName.bind(this);
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.isMailValid = this.isMailValid.bind(this);

	    this.state = {
	    	email : "",
			pwd : "",
			name : ""
	    };
	}

	changeName (){
		this.setState((prevState) => ({
	      name: this.refs.name.value
	    }));
	}

	isMailValid(email){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	changeEmail (){
		
    	var email = this.refs.email.value;
    	var validEmail = email && this.isMailValid(email);
		this.setState((prevState) => ({
	      email: this.refs.email.value,
	      validEmail: validEmail,
	      mailTaken : null
	    }));
	    if(validEmail){
	    	var unauthorized = [".", "#", "$", "[", "]"];
			for (var i = 0; i < unauthorized.length; i++) {
				email = email.split(unauthorized[i]).join("_");
			}
    		firebase.database().ref('emails/' + email).once("value", (snap) => {
    			this.setState((prevState) => ({
			      mailTaken : !!snap.val()
			    }));
    		}, (error) => {
    			console.log("error", error);
    		});
	    }
	}

	changePwd (){
		this.setState((prevState) => ({
	      pwd: this.refs.pwd.value
	    }));
	}

	register (){
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd).catch((error) => {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode + errorMessage);
		});
	}

	login () {
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd).catch((error) => {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode + errorMessage);
		});
	}

	render() {
		var showRegister = this.state.validEmail && this.state.mailTaken === false;
		var showLogin = this.state.validEmail && this.state.mailTaken === true;

		return (
			<div id="register-page">
				<div style={{maxWidth:"900px", marginLeft:"auto", marginRight:"auto"}}>
					<div id="logo-wrapper">
						<div id="logo">Mg.</div>
					</div>
				</div>
				<div style={{maxWidth:"500px", marginLeft:"auto", marginRight:"auto"}}>
					<h1 style={{marginTop: "40px", fontSize : "20px"}}>Register or Login !</h1>
					<h3 style={{fontSize : "14px", marginBottom: "40px"}} className="light-purple">
						Wether you already have an account or not you're in the right place !
					</h3>
					<div>
						<input className="reg-inp" ref="email" type="email" value={this.state.email} onChange={this.changeEmail} placeholder="email address"/>
					</div>
					<div>
						<input className="reg-inp" ref="pwd" type="password" value={this.state.pwd} onChange={this.changePwd} placeholder="password"/>
					</div>
					<div style={{display : (showRegister ? "block" : "none")}}>
						<input className="reg-inp" ref="name" type="text" value={this.state.name} onChange={this.changeName} placeholder="name"/>
					</div>

					<button className="reg-button" style={{display : (showRegister ? "block" : "none")}} onClick={this.register}>register</button>
					<button className="reg-button" style={{display : (showLogin ? "block" : "none")}} onClick={this.login}>login</button>
				</div>
			</div>
		);
	}
};

export default RegisterPage;