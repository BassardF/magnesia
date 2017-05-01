import React from 'react'

import AuthServices from '../services/auth'

class RegisterPage extends React.Component {

	constructor(props) {
	    super(props);
	    this.changeEmail = this.changeEmail.bind(this);
		this.changePwd = this.changePwd.bind(this);
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		
	    this.state = {
	    	email : "",
			pwd : ""
	    };
	}

	changeEmail (){
		this.setState((prevState) => ({
	      email: this.refs.email.value
	    }));
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
		return (
			<div id="register-page">
				<div>
					<h1>Regiser</h1>
					<div><input ref="email" type="email" value={this.state.email} onChange={this.changeEmail} placeholder="Email"/></div>
					<div><input ref="pwd" type="password" value={this.state.pwd} onChange={this.changePwd} placeholder="Password"/></div>
					<button onClick={this.register}>register</button>
					<button onClick={this.login}>login</button>
				</div>

			</div>
		);
	}
};

export default RegisterPage;