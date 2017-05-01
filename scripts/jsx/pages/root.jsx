import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import replaceUser from '../actions/users'
import AuthServices from '../services/auth'

class RootPageComp extends React.Component {

	componentWillMount(){
		//Firebase auth event callback
		firebase.auth().onAuthStateChanged((user) => {
			//Valid token
			if(user){
				//No state user
				if(!this.props.user){
					//Set email for search
					AuthServices.uploadEmail(user.uid, user.email);
					//Check login case
					AuthServices.fetchUser(user.uid, (fetchedUser)=>{
						if(fetchedUser){
							this.props.replaceUser(fetchedUser);
							browserHistory.push('/maps');
						} else {
							//Fallback on register
							AuthServices.createUser(user.uid, user.email, (createdUser)=>{
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
					browserHistory.push('/');
					// this.props.replaceUser(null); 	
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