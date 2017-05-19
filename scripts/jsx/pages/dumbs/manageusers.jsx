import React from 'react'

import AuthServices from '../../services/auth'

class ManageUsers extends React.Component {

	constructor(props) {
	    super(props);
	    this.changeSearch = this.changeSearch.bind(this);
	    this.inviteUser = this.inviteUser.bind(this);

	    this.state = {
	    	search : "",
	    	results : [],
	    	loading : false
	    };
	}

	inviteUser(uid, email){
		let map = this.props.map;
		map.invite(uid, email, AuthServices.getUid());
	}

	changeSearch(e){
		let val = e.target.value;
		var arr = [];
		
		if(val && val.length >= 3){
			this.setState({loading : true});
			firebase.database().ref('emails').orderByKey().startAt(val).limitToFirst(10).once("value", (res)=>{
				var results = res.val();
				if(results){
					let map = this.props.map;
					for(var email in results){
						if(email.toLowerCase().indexOf(val.toLowerCase()) === 0){
							let uid = results[email];
							if((!map.invites || !map.invites[uid]) && !map.users[uid]){
								arr.push({
									email : email,
									uid : uid
								});		
							}
						}
					}
				}
				this.setState({
					results : arr,
					loading : false
				});
			});
		}
		this.setState({
			search : val
		});
	}

	render() {
		let map = this.props.map;

		var userDom = [], invitedDom = [], prospectDom = [];;

		for(var uid in map.users){
			userDom.push(
				<UserLine key={"key-user-selected-line" + uid} uid={uid} name={map.users[uid]} />
			);			
		}

		if(map.invites){
			for(var uid in map.invites){
				userDom.push(
					<ProspectLine key={"key-prospect-selected-line" + uid} invited={true} uid={uid} name={map.invites[uid].email}/>
				);
			}
		}

		for (var i = 0; i < this.state.results.length; i++) {
			var uid = this.state.results[i].uid;
			var email = this.state.results[i].email;
			var invited = !!(map.invites && map.invites[uid]);
			if(!invited){
				userDom.push(
					<ProspectLine key={"key-prospect-selected-line" + uid} invited={false} uid={uid} name={email} inviteUser={this.inviteUser.bind(this, uid, email)}/>
				);
			}
			
		}

		var loadIcon = !this.state.loading ? 
			<img style={{verticalAlign:"middle", width:"20px", marginRight : "5px"}} src="../assets/images/magnifier.svg"/> :
			<img src="../assets/images/spinner-purple.svg" className="rotate" style={{verticalAlign:"middle", width:"20px", height:"20px", marginRight : "5px"}}/>;

		return (
			<div className="map-details">
				<div id="map-details-title" onClick={this.props.promptChangeTitle}>
					<div>
						<span id="map-details-title-content">{this.props.map.title}</span>
					</div>
					<div style={{marginTop:"7px"}}>
						<span id="map-details-title-sub">
							<img style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/edit.svg"/>
							<span style={{verticalAlign:"middle"}}>edit</span>
						</span>
					</div>
				</div>

				<div style={{maxWidth:"500px", marginRight:"auto", marginLeft:"auto"}}>
					<div style={{fontSize:"14px", height:"20px"}}>
						<div onClick={this.props.toggleManageUsers} className="purple-unerlined-hover" style={{cursor:"pointer", display:"inline-block", marginLeft: "10px"}}>
							<img className="rotate-180" style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/arrow-right.svg"/>
							<span style={{verticalAlign:"middle"}}>back to my maps</span>
						</div>
					</div>
				</div>

				<div className="search-user-input-wrapper" style={{maxWidth: "280px", marginTop: "30px", marginRight:"auto", marginLeft:"auto"}}>
					{loadIcon}
					<input value={this.state.value} onChange={this.changeSearch} placeholder="email address" style={{verticalAlign:"middle", width:"250px", fontSize : "17px", border : "none", outline : "none"}}/>
				</div>

				<div style={{marginTop: "30px", maxWidth:"500px", marginRight:"auto", marginLeft:"auto"}}>
					{userDom}
				</div>
				
				<div style={{marginTop: "30px", maxWidth:"500px", marginRight:"auto", marginLeft:"auto"}}>
					{prospectDom}
				</div>
			</div>
		);
	}
};

export default ManageUsers;

class UserLine extends React.Component {

	render() {
		return (
			<div className="selected-user-line">
				<div className="flex">
					<div className="flex-grow-1">
						{this.props.name}
					</div>
					<div style={{textAlign:"right"}} className="flex-grow-1 purple">
						&#x2713; joined
					</div>
				</div>
			</div>
		);
	}
};

class ProspectLine extends React.Component {

	render() {

		var rs = this.props.invited ? 
			<div style={{textAlign:"right"}} className="flex-grow-1 purple">
				&#x2713; invited
			</div> 
		:
			<span className="invite-user-button" onClick={this.props.inviteUser || null}>
				<img className="hide-hover" style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/invite-purple.svg"/>
				<img className="show-hover" style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/invite-grey.svg"/>
				invite
			</span>;	

		return (
			<div className="selected-user-line">
				<div className="flex">
					<div className="flex-grow-1">
						{this.props.name.split("_").join(".")}
					</div>
					<div style={{textAlign:"right"}} className="flex-grow-1 purple">
						{rs}
					</div>
				</div>
			</div>
		);
	}
};

