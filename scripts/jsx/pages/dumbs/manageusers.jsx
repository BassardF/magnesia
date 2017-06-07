import React from 'react'

import AuthServices from '../../services/auth'

import EncodeServices from '../../services/encode'

export class ManageUsers extends React.Component {

	constructor(props) {
	    super(props);

	    this.state = {};
	}

	render() {
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
						<div onClick={this.props.toggleManageUsers} className="purple-unerlined-hover" style={{cursor:"pointer", display:"inline-block", marginLeft: "10px", float:"right"}}>
							<img className="rotate-180" style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/arrow-right.svg"/>
							<span style={{verticalAlign:"middle"}}>back to my maps</span>
						</div>
					</div>
				</div>

				<InnerManageUser map={this.props.map} user={this.props.user}/>
			</div>
		);
	}
};

export class InnerManageUser extends React.Component {

	constructor(props) {
	    super(props);
	    this.changeSearch = this.changeSearch.bind(this);
	    this.inviteUser = this.inviteUser.bind(this);
	    this.inviteExternalUser = this.inviteExternalUser.bind(this);
	    this.isInvited = this.isInvited.bind(this);

	    this.state = {
	    	search : "",
	    	results : [],
	    	loading : false
	    };
	}

	inviteExternalUser(email){
		let map = this.props.map;
		map.externalInvite(email, AuthServices.getUid());
		let mid = map.mid,
			title = map.title,
			name = this.props.user ? this.props.user.name : '';

		var url = "https://hooks.zapier.com/hooks/catch/1087623/91dvog/";
		var params = "email="+email+"&title="+title+"&mid="+mid+"&name="+name;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(params);
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
			firebase.database().ref('emails').orderByKey().startAt(EncodeServices.encode(val)).limitToFirst(10).once("value", (res)=>{
				var results = res.val();
				if(results){
					let map = this.props.map;
					for(var email in results){
						var decoded = EncodeServices.decode(email);
						if(decoded.toLowerCase().indexOf(val.toLowerCase()) === 0){
							let uid = results[email];
							if((!map.invites || !map.invites[uid]) && !map.users[uid]){
								arr.push({
									email : decoded,
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

	isInvited(email) {
		let map = this.props.map;
		if(map.invites){
			for (let uid in map.invites) {
				if(map.invites[uid].email == email) return true;
			}
		}
		if(map.externalInvites){
			for (let i = 0; i < map.externalInvites.length; i++) {
				if(map.externalInvites[i].email == email) return true;
			}
		}
		return false;
	}

	render() {
		let map = this.props.map;
		let userDom = [], prospectDom = [];

		for(let uid in map.users){
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

		if(map.externalInvites){
			for (var i = 0; i < map.externalInvites.length; i++) {
				if(!map.externalInvites[i].joined)
					userDom.push(
						<ProspectLine key={"key-external-prospect-selected-line" + i} invited={true} external={true} name={map.externalInvites[i].email}/>
					);
			}
		}

		for (let i = 0; i < this.state.results.length; i++) {
			let uid = this.state.results[i].uid;
			let email = this.state.results[i].email;
			if(!this.isInvited(email)){
				userDom.push(
					<ProspectLine key={"key-prospect-result-selected-line" + uid} invited={false} uid={uid} name={email} inviteUser={this.inviteUser.bind(this, uid, email)}/>
				);
			}
		}

		let externalInvite = null;
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!this.isInvited(this.state.search) && !this.state.results.length && !this.state.loading && re.test(this.state.search)){
			externalInvite = <ExternalProspectLine key={"key-external-prospect-selected-line"} name={this.state.search} inviteUser={this.inviteExternalUser.bind(this, this.state.search)}/>
		}

		let loadIcon = !this.state.loading ? 
			<img style={{verticalAlign:"middle", width:"20px", marginRight : "5px"}} src="../assets/images/magnifier.svg"/> :
			<img src="../assets/images/spinner-purple.svg" className="rotate" style={{verticalAlign:"middle", width:"20px", height:"20px", marginRight : "5px"}}/>;

		return (
			<div>
				<div className="search-user-input-wrapper" style={{maxWidth: "280px", marginTop: "30px", marginRight:"auto", marginLeft:"auto"}}>
					{loadIcon}
					<input value={this.state.value} onChange={this.changeSearch} placeholder="email address" style={{verticalAlign:"middle", width:"250px", fontSize : "17px", border : "none", outline : "none"}}/>
				</div>

				<div style={{display: (this.state.search.length && this.isInvited(this.state.search) ? "block" : "none"), marginTop: "30px", maxWidth:"500px", marginRight:"auto", marginLeft:"auto", textAlign: "center"}}>
					User already invited
				</div>

				<div style={{marginTop: "30px", maxWidth:"500px", marginRight:"auto", marginLeft:"auto"}}>
					{userDom}
				</div>
				
				<div style={{marginTop: "30px", maxWidth:"500px", marginRight:"auto", marginLeft:"auto"}}>
					{prospectDom}
				</div>

				<div style={{marginTop: "30px", maxWidth:"500px", marginRight:"auto", marginLeft:"auto"}}>
					{externalInvite}
				</div>
			</div>
		);
	}
};		

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
				&#x2713; invited {this.props.external ? " to Mg." : ""}
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
						{this.props.name}
					</div>
					<div style={{textAlign:"right"}} className="flex-grow-1 purple">
						{rs}
					</div>
				</div>
			</div>
		);
	}
};

class ExternalProspectLine extends React.Component {

	render() {

		return (
			<div className="selected-user-line">
				<div className="flex">
					<div className="flex-grow-1">
						{this.props.name}
					</div>
					<div style={{textAlign:"right"}} className="flex-grow-1 purple">
						<span className="invite-user-button" onClick={this.props.inviteUser || null}>
							<img className="hide-hover" style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/invite-purple.svg"/>
							<img className="show-hover" style={{verticalAlign:"middle", width:"10px", marginRight : "5px"}} src="../assets/images/invite-grey.svg"/>
							invite to Mg.
						</span>
					</div>
				</div>
			</div>
		);
	}
};
