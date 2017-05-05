import React from 'react'

import AuthServices from '../services/auth'

class RegisterPage extends React.Component {

	constructor(props) {
	    super(props);
	    this.changeEmail = this.changeEmail.bind(this);
		this.changePwd = this.changePwd.bind(this);
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.isMailValid = this.isMailValid.bind(this);
		this.toggleLoading = this.toggleLoading.bind(this);

	    this.state = {
	    	email : "",
			pwd : "",
			loading : false,
			errorMessage : null
	    };
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
	      mailTaken : null,
	      errorMessage : null
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
	      pwd: this.refs.pwd.value,
	      errorMessage : null
	    }));
	}

	register (){
		this.toggleLoading();
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd).catch((error, ad) => {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  this.setState({
		  	errorMessage : errorMessage,
		  	loading : false
		  });
		});
	}

	login () {
		this.toggleLoading();
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd).catch((error) => {
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  this.setState({
		  	errorMessage : errorMessage,
		  	loading : false
		  });
		});
	}

	toggleLoading(){
		this.setState({
			loading : !this.state.loading
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
				<h1 style={{marginTop: "60px", marginBottom: "60px", fontSize : "20px", textAlign:"center"}}>
					Join Us - or - Login
				</h1>
				<div className="purple" style={{display :(this.state.errorMessage ? "block" : "none"), textAlign:"center", paddingBottom : "40px"}}>
					{this.state.errorMessage}
				</div>
				<div style={{maxWidth:"700px", marginLeft:"auto", marginRight:"auto"}}>
					<div className="col-wrap">
						<div className="half">
							<div>
								<input className={"reg-inp " + (this.state.validEmail ? "validated" : "")} ref="email" type="email" value={this.state.email} onChange={this.changeEmail} placeholder="email address"/>
							</div>
							<div>
								<input className={"reg-inp " + (this.state.pwd && this.state.pwd.length >= 6 ? "validated" : "")} ref="pwd" type="password" value={this.state.pwd} onChange={this.changePwd} placeholder="password"/>
							</div>
							<button className="pre-loading-button" style={{display : (!showRegister && !showLogin ? "block" : "none")}}>
								<span>login / register</span>
							</button>
							<button className={(this.state.loading ? "loading-button " : "reg-button ") + (this.state.validEmail && this.state.pwd && this.state.pwd.length >= 6 ? "" : "disabled-button")} 
									style={{display : (showRegister ? "block" : "none")}} 
									onClick={this.state.validEmail && this.state.pwd && this.state.pwd.length >= 6 ? this.register : null}>
									<span style={{display: this.state.loading ? "inline" : "none"}}>
										<img src="../assets/images/spinner-purple.svg" className="rotate" style={{display:"block", width:"20px", height:"20px", marginRight:"auto", marginLeft:"auto"}}/> 
										<span style={{verticalAlgin : "middle"}}>Loading</span> 
									</span>
									<span style={{display: this.state.loading ? "none" : "inline"}}>
										register
									</span>
							</button>
							<button className={(this.state.loading ? "loading-button " : "reg-button ") + (this.state.validEmail && this.state.pwd && this.state.pwd.length >= 6 ? "" : "disabled-button")} 
									style={{display : (showLogin ? "block" : "none")}} 
									onClick={this.state.validEmail && this.state.pwd && this.state.pwd.length >= 6 ? this.login : null}>
									<span style={{display: this.state.loading ? "inline" : "none"}}>
										<img src="../assets/images/spinner-purple.svg" className="rotate" style={{display:"block", width:"20px", height:"20px", marginRight:"auto", marginLeft:"auto"}}/> 
										<span style={{verticalAlgin : "middle"}}>Loading</span> 
									</span>
									<span style={{display: this.state.loading ? "none" : "inline"}}>
										login
									</span>
							</button>
						</div>
						<div className="half">
							<div style={{marginTop :"20px", paddingLeft: "30px"}}>
								<div className={"invalid-step-line " + (this.state.validEmail ? "hide" : "")}>
									<span style={{marginRight:"5px"}}>&#10007;</span> Invalid email address
								</div>
								<div className={"step-line " + (this.state.validEmail ? "valid" : "")}>
									<span style={{marginRight:"5px"}}>&#10004;</span> Valid email address
								</div>
								<div className={"step-line " + (showLogin ? "valid" : "")}>
									<span style={{marginRight:"5px"}}>&#10004;</span> Existing account
								</div>
								<div className={"step-line " + (showRegister ? "valid" : "")}>
									<span style={{marginRight:"5px"}}>&#10004;</span> Email available
								</div>
								<div className={"step-line " + (this.state.pwd && this.state.pwd.length >= 6 ? "valid" : "")}>
									<span style={{marginRight:"5px"}}>&#10004;</span> Valid password length
								</div>
								<div className={"invalid-step-line " + (this.state.pwd && this.state.pwd.length >= 6 ? "hide" : "")}>
									<span style={{marginRight:"5px"}}>&#10007;</span> Password too short
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default RegisterPage;