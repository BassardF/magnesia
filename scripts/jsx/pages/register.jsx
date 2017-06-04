import React from 'react'
import { browserHistory } from 'react-router';

import AuthServices from '../services/auth'

import EncodeServices from '../services/encode'

class RegisterPage extends React.Component {

	constructor(props) {
	    super(props);
	    this.changeEmail = this.changeEmail.bind(this);
		this.changePwd = this.changePwd.bind(this);
		this.register = this.register.bind(this);
		this.login = this.login.bind(this);
		this.isMailValid = this.isMailValid.bind(this);
		this.toggleLoading = this.toggleLoading.bind(this);
		this.pwskeyUp = this.pwskeyUp.bind(this);
		this.withGoogle = this.withGoogle.bind(this);
		this.withFacebook = this.withFacebook.bind(this);
		this.withTwitter = this.withTwitter.bind(this);

	    this.state = {
	    	email : "",
			pwd : "",
			loading : false,
			errorMessage : null,
			externalInviteValidated : false
	    };
	}

	componentDidMount(){
		if(this.props.externalInvite && this.props.externalInvite.mid){
			firebase.database().ref('maps/' + this.props.externalInvite.mid + '/externalInvites').once("value", (snap) => {
				var invites = snap.val();
				if(invites){
					for (var i = 0; i < invites.length; i++) {
						if(!invites[i].joined && invites[i].email == this.props.externalInvite.email){
							this.setState({externalInviteValidated: true});
							try{
								sessionStorage.setItem('classToJoin', this.props.externalInvite.mid);
								sessionStorage.setItem('inviteToUse', 'maps/' + this.props.externalInvite.mid + '/externalInvites/'+ i + '/joined');
							} catch(e){}
						}
					}
				}
			}, (error)=>{
				console.log("error", error);
			});
		}
	}

	isMailValid(email){
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	withGoogle (){
		firebase.auth().signInWithPopup(googleProvider).then(function(result) {
			var token = result.credential.accessToken;
			var user = result.user;
		}).catch(function(error) {
			console.log("error", error);
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
		});
	}

	withFacebook(){
		firebase.auth().signInWithPopup(facebookProvider).then(function(result) {
			var token = result.credential.accessToken;
			var user = result.user;
		}).catch(function(error) {
			console.log("error", error);
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
		});
	}

	withTwitter(){
		firebase.auth().signInWithPopup(twitterProvider).then(function(result) {
			var token = result.credential.accessToken;
			var user = result.user;
		}).catch(function(error) {
			console.log("error", error);
			var errorCode = error.code;
			var errorMessage = error.message;
			var email = error.email;
			var credential = error.credential;
		});
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
    		firebase.database().ref('emails/' + EncodeServices.encode(email)).once("value", (snap) => {
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

	pwskeyUp(e){
        if(e.which && e.which === 13){
        	var showRegister = this.state.validEmail && this.state.mailTaken === false;
			var showLogin = this.state.validEmail && this.state.mailTaken === true;
            var refB = this.refs.regbutton;
            var refL = this.refs.loginbutton;
			if(showRegister && refB) refB.click();
			if(showLogin && refL) refL.click();
        }
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
				<div style={{textAlign:"center", display : (this.state.externalInviteValidated ? "block" : "none")}}>
					<div style={{fontWeight:"bold", marginBottom:"5px"}}>{this.props.externalInvite ? this.props.externalInvite.name : ""} invited you to join {this.props.externalInvite ? this.props.externalInvite.title : ""}</div>
					<div>Register below and {this.props.externalInvite ? this.props.externalInvite.title : ""} will be joined automatically</div>
				</div>
				<div style={{paddingLeft:"30px", paddingRight:"30px", marginTop: "20px", marginBottom: "20px", display:"flex"}}>
					<div style={{flexGrow:1}}><hr style={{opacity:".3", borderTop:"solid 1px #424242", borderBottom:"none"}}/></div>
					<div style={{flexGrow:0, fontSize:"14px", paddingLeft:"10px", paddingRight:"10px"}}><div>Join Us - or - Login</div></div>
					<div style={{flexGrow:1}}><hr style={{opacity:".3", borderTop:"solid 1px #424242", borderBottom:"none"}}/></div>
				</div>
				<div className="purple" style={{display :(this.state.errorMessage ? "block" : "none"), textAlign:"center", marginTop:"-20px", paddingBottom:"30px"}}>
					{this.state.errorMessage}
				</div>
				<div>
					<div className="oath-button" id="oath-google" onClick={this.withGoogle}>
						<img style={{height:"15px", marginRight:"10px", verticalAlign:"middle", marginLeft:"-18px"}} src="../assets/images/social-google.svg"/>
						<span style={{verticalAlign:"middle"}}>with Google</span>
					</div>
					<div className="oath-button" id="oath-facebook" onClick={this.withFacebook}>
						<img style={{height:"15px", marginRight:"10px", verticalAlign:"middle"}} src="../assets/images/social-facebook.svg"/>
						<span style={{verticalAlign:"middle"}}>with Facebook</span>
					</div>
					<div className="oath-button" id="oath-twitter" onClick={this.withTwitter}>
						<img style={{height:"15px", marginRight:"10px", verticalAlign:"middle", marginLeft:"-18px"}} src="../assets/images/social-twitter.svg"/>
						<span style={{verticalAlign:"middle"}}>with Twitter</span>
					</div>
				</div>
				<div style={{paddingLeft:"30px", paddingRight:"30px", marginTop: "20px", marginBottom: "20px", display:"flex"}}>
					<div style={{flexGrow:1}}><hr style={{opacity:".3", borderTop:"solid 1px #424242", borderBottom:"none"}}/></div>
					<div style={{flexGrow:0, fontSize:"14px", paddingLeft:"10px", paddingRight:"10px"}}><div>Or with an email</div></div>
					<div style={{flexGrow:1}}><hr style={{opacity:".3", borderTop:"solid 1px #424242", borderBottom:"none"}}/></div>
				</div>
				<div style={{maxWidth:"700px", marginTop:"20px", marginLeft:"auto", marginRight:"auto"}}>
					<div className="col-wrap">
						<div className="half">
							<div>
								<input className={"reg-inp " + (this.state.validEmail ? "validated" : "")} ref="email" type="email" value={this.state.email} onChange={this.changeEmail} placeholder="email address"/>
							</div>
							<div>
								<input onKeyPress={this.pwskeyUp} className={"reg-inp " + (this.state.pwd && this.state.pwd.length >= 6 ? "validated" : "")} ref="pwd" type="password" value={this.state.pwd} onChange={this.changePwd} placeholder="password"/>
							</div>
						</div>
						<div className="half">
							<div style={{marginTop :(this.state.validEmail ? "20px" : "30px"), paddingLeft: "30px"}}>
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

				<div style={{maxWidth:"300px", marginLeft:"auto", marginRight : "auto"}}>
					<button className="pre-loading-button" style={{display : (!showRegister && !showLogin ? "block" : "none")}}>
						<span>login / register</span>
					</button>
					<button ref="regbutton" className={(this.state.loading ? "loading-button " : "reg-button ") + (this.state.validEmail && this.state.pwd && this.state.pwd.length >= 6 ? "" : "disabled-button")} 
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
					<button ref="loginbutton" className={(this.state.loading ? "loading-button " : "reg-button ") + (this.state.validEmail && this.state.pwd && this.state.pwd.length >= 6 ? "" : "disabled-button")} 
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
			</div>
		);
	}
};

export default RegisterPage;