import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import replaceUser from '../actions/users'
import AuthServices from '../services/auth'

import User from '../models/user'

class RootPageComp extends React.Component {

	constructor(props) {
	    super(props);
	    this.getPotentialMapToAdd = this.getPotentialMapToAdd.bind(this);
 	    this.state = {};
	}

	getPotentialMapToAdd(uid){
		try{
			let mid = sessionStorage.getItem('classToJoin');
			let inviteToUse = sessionStorage.getItem('inviteToUse');
			if(mid && inviteToUse){
				sessionStorage.removeItem('classToJoin');
				sessionStorage.removeItem('inviteToUse');
				firebase.database().ref(inviteToUse).set(true);
				firebase.database().ref('maps/' + mid + "/users/" + uid).set("placeholder");
				return mid;
			}
		} catch(e){
			return null;
		}
		return null;
	}

	componentWillMount(){
		//Firebase auth event callback
		firebase.auth().onAuthStateChanged((user) => {
			//Valid token
			if(user){
				//No state user
				if(!this.props.user){
					//Check login case
					this.setState({uid : user.uid});
					firebase.database().ref('users/' + user.uid).on("value", (snap)=>{
				      var fetchedUser = new User(snap.val());
				      if(snap && snap.val() && fetchedUser){
				      		//Set email for search
							AuthServices.uploadEmail(user.uid, fetchedUser.email);
							if(fetchedUser.email !== user.email) user.updateEmail(fetchedUser.email);

							this.props.replaceUser(fetchedUser);
							if(browserHistory.getCurrentLocation().pathname == "/") browserHistory.push('/maps');
						} else {
							//Fallback on register
							let joinMap = this.getPotentialMapToAdd(user.uid);
							AuthServices.createUser(user.uid, user.email, joinMap, (createdUser)=>{
								this.props.replaceUser(createdUser);
								browserHistory.push('/maps');
							});	
						}
				    });
				}
			//No token
			} else {
				//Remove user from state
				if(this.props.user){
					firebase.database().ref('users/' + this.state.uid).off();
					this.props.replaceUser(null);
					browserHistory.push('/');
				}
			}
		});
	}

	render() {
		return (
			<div className="root-page" style={{height:"100%"}}>
				{this.props.children}
			</div>
		);
	}
};

const mapStateToProps = (state) => {
  return {
  	user : state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    replaceUser: (user) => {
      dispatch(replaceUser(user));
    }
  }
}

const RootPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(RootPageComp)

export default RootPage;