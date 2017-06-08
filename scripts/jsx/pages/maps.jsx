import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import {replaceMaps, addMap} from '../actions/maps'
import replaceUser from '../actions/users'
import AuthServices from '../services/auth'
import Map from '../models/map'

import PlansModal from './plans'
import MapBlock from './dumbs/mapblock'
import MapDetails from './dumbs/mapdetails'
import {ManageUsers} from './dumbs/manageusers'
import InviteLine from './dumbs/invite'

class MapsPageComp extends React.Component {

	constructor(props) {
	    super(props);
	    this.refreshMaps = this.refreshMaps.bind(this);
	    this.createMap = this.createMap.bind(this);
	    this.selectMap = this.selectMap.bind(this);
	    this.promptChangeTitle = this.promptChangeTitle.bind(this);
	    this.promptLeaveMap = this.promptLeaveMap.bind(this);
	    this.leaveMap = this.leaveMap.bind(this);
	    this.toggleManageUsers = this.toggleManageUsers.bind(this);
	    this.fetchInvites = this.fetchInvites.bind(this);
	    this.validateInvite = this.validateInvite.bind(this);
	    this.cancelInvite = this.cancelInvite.bind(this);
	    this.changeName = this.changeName.bind(this);
	    this.openPlansModal = this.openPlansModal.bind(this);
	    this.hidePlansModal = this.hidePlansModal.bind(this);

	    this.state = {
	    	selected : 0,
	    	invites : [],
	    	selectedMap : null,
	    	manageUsers : false
	    };
	}

	componentWillMount(){
		document.title = "Maps";
		this.props.replaceMaps([]);
		this.refreshMaps(()=>{
			this.selectMap(0, true);
			if(this.props.user && this.props.user.name == "placeholder"){
				this.changeName(true, this.props.user.name);
			}
		});
	}

	componentDidMount(){
		new Tippy('.tippymaps', {
		    position: 'bottom',
		    animation: 'shift',
		    duration: 200,
		    arrow: true
		})
	}

	componentWillUnMount(){
		this.removeCurrentOn();
	}

	changeName(newName, current){
		let title = "Change your name";
		let text = "Your current name is " + current;
		if(newName){
			title = "Choose a name";
			text = "It will be useful for collaborative work !";
		}

		swal({
		  title: title,
		  text: text,
		  type: "input",
		  showCancelButton: true,
		  closeOnConfirm: false,
		  closeOnCancel: false,
		  animation: "slide-from-top",
		  inputPlaceholder: "Name"
		}, (inputValue) => {
		  if (inputValue === false) {
		  	swal("Name not set", "Your current name is 'placeholder'. You can click on your name on the topbar to modify it.", "warning");
		  } else if (inputValue === "") {
		    swal.showInputError("Please enter a name");
		    return false;
		  } else {
		  	var usr = this.props.user;
		  	usr.changeName(AuthServices.getUid(), inputValue);
		  	swal("Nice!", "Your name has been changed", "success");	
		  }
		});
	}

	validateInvite(ind){
		var usr = this.props.user;
		var mid = this.state.invites[ind].mid;
		usr.acceptInvite(mid, AuthServices.getUid());
		var invites = this.state.invites;
		invites.splice(ind, 1);

		firebase.database().ref('maps/' + mid).once("value", (snap) => {
			if(snap && snap.val()) {
				this.props.addMap(new Map(snap.val()));
			}
			this.setState({
				invites: invites
			});
		});

	}

	cancelInvite(ind){
		var usr = this.props.user;
		usr.cancelInvite(this.state.invites[ind].mid, AuthServices.getUid());
		var invites = this.state.invites;
		invites.splice(ind, 1);
		this.setState({
			invites: invites
		});
	}

	fetchInvites(){
		if(this.props.user && this.props.user.invites){
			for(var mid in this.props.user.invites){
				if(!this.props.user.invites[mid].answer){
					firebase.database().ref('maps/' + mid + '/title').once("value", (titlesnap) => {
						var title = titlesnap.val();
						var invites = this.state.invites;
						invites.push({
							mid : mid,
							title : title
						});
						this.setState({
							invites : invites
						});
					});
					
				}
			}
		}
	}

	toggleManageUsers(){
		this.setState({
			manageUsers : !this.state.manageUsers
		});
	}

	logout(){
		AuthServices.logout();
	}

	removeCurrentOn(){
		if(this.props.maps && this.props.maps[this.state.selected]){
			var mid = this.props.maps[this.state.selected].mid;
			firebase.database().ref('maps/' + mid).off();
		}
	}

	selectMap(ind, force){
		if(ind !== this.state.selected || force){
			var map = this.props.maps[ind];
			if(!map && this.props.user && this.props.user.maps){
				var keys = Object.keys(this.props.user.maps);
				var mid = keys[ind];
			} else if(map){
				var mid = map.mid;
			} else return;

			this.removeCurrentOn();
			firebase.database().ref('maps/' + mid).on("value", (snap) => {
				var bod = snap.val();
				if(snap && bod && bod.users && bod.users[AuthServices.getUid()]) {
					var newMp = new Map(bod);
					var mps = this.props.maps;
					mps[ind] = newMp;
					this.props.replaceMaps(mps);
				} else {
					this.removeCurrentOn();
					var mps = this.props.maps;
					mps.splice(ind, 1);
					this.props.replaceMaps(mps);
					if(mps.length) this.selectMap(0, true);
				}
				this.forceUpdate();
			});

			this.setState({
				selected : ind,
				manageUsers : false
			});
		}
	}

	refreshMaps(callback){
		if(this.props.user && this.props.user.maps){
			var keysCount = Object.keys(this.props.user.maps).length;
			var count = 0;
			for(var mid in this.props.user.maps){
				(function(mid){
					firebase.database().ref('maps/' + mid).once("value", (snap) => {
						if(snap && snap.val()) {
							this.props.addMap(new Map(snap.val()));
						}
						count++;
						if(count == keysCount && callback){
							callback();
						}
					});
				}.bind(this)(mid))
			}
		}
	}

	createMap(){
		let creationTimestamp = new Date().getTime();
		let newMap = new Map().initEmpty(AuthServices.getUid(), creationTimestamp, this.props.user.name);
		//Uploading our new Map
		let newMapRef = firebase.database().ref('maps').push();
  		let newMapkey = newMapRef.key;
  		newMap.mid = newMapkey;
		newMapRef.set(newMap, (error) => {
			if(!error){
				var mapArray = this.props.maps ? this.props.maps.concat(newMap) : [newMap];
				this.props.replaceMaps(mapArray);
				//Adding the Map to the user
				firebase.database().ref('users/' + AuthServices.getUid() + '/maps/' + newMapkey).set(creationTimestamp, (error2)=>{
					if(!error2){
						if(!this.props.user.maps) this.props.user.maps = {};
						this.props.user.maps[newMapkey] = creationTimestamp;
						this.selectMap(mapArray.length - 1, true);
					}
				});
			}
		});
	}

	goToMap(mid){
		this.removeCurrentOn();
		browserHistory.push('/map/' + mid);
	}

	changeCurrentMapTitle(title){
		var selectedMap = this.props.maps[this.state.selected];
		selectedMap.changeTitle(title);
	}

	promptChangeTitle(){
		var selectedMap = this.props.maps[this.state.selected];
		swal({
		  title: "Change title",
		  text: "Choose a new title for '" + selectedMap.title + "'",
		  type: "input",
		  showCancelButton: true,
		  closeOnConfirm: false,
		  inputPlaceholder: "title"
		},
		function(inputValue){
		  if (inputValue === false) return false;
		  
		  if (inputValue === "") {
		    swal.showInputError("Choose a new title!");
		    return false
		  }
		  this.changeCurrentMapTitle(inputValue);
		  swal("Title changed!", "New title: " + inputValue, "success");
		}.bind(this));
	}

	leaveMap(){
		var selectedMap = this.props.maps[this.state.selected];
		selectedMap.leave(AuthServices.getUid());
	}

	promptLeaveMap(){
		swal({
		  title: "Are you sure?",
		  text: "Would you like to leave this map?",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "#DD6B55",
		  confirmButtonText: "Yes!",
		  closeOnConfirm: false
		}, function(){
			swal("Done", "You have just left the map!", "success");
			this.leaveMap();
		}.bind(this));
	}

	openPlansModal(){
		this.setState({
			showPlansModal : true
		})
	}

	hidePlansModal(){
		this.setState({
			showPlansModal : false
		})
	}

	render() {
		var maps = [], invitesDom = [], pendingInvites = 0;
		if(this.props.user && this.props.user.invites){
			for(var mid in this.props.user.invites){
				if(!this.props.user.invites[mid].answer) pendingInvites++;
			}
		}
		for (var i = 0; i < this.props.maps.length + 1; i++) {
			maps.push(
				<MapBlock 
					key={"map-block-" + i}
					map={this.props.maps[i]}
					selected={this.state.selected == i}
					selectMap={this.selectMap.bind(this, i)}
					goToMap={this.props.maps[i] ? this.goToMap.bind(this, this.props.maps[i].mid) : null}
					createMap={this.createMap}/>
			);
		}
		var selectedMap = this.props.maps[this.state.selected],
			rightSide = null;
		if(selectedMap){
			rightSide = 
				<div>
					<div style={{display : this.state.manageUsers ? "block" : "none"}}>
						<ManageUsers 
							map={selectedMap} promptChangeTitle={this.promptChangeTitle}
							toggleManageUsers={this.toggleManageUsers}
							user={this.props.user}/> 
					</div>
					<div style={{display : this.state.manageUsers ? "none" : "block"}}>
						<MapDetails 
							goToMap={this.goToMap.bind(this, selectedMap.mid)}
							map={selectedMap} promptChangeTitle={this.promptChangeTitle} 
							leaveMap={this.promptLeaveMap} toggleManageUsers={this.toggleManageUsers}/>
					</div>
				</div>;
		} else {
			rightSide = <div onClick={this.createMap} style={{textAlign:"center"}}>
				<div style={{marginTop:"20px", fontSize:"30px"}}>Create your first Mind Map</div>
				<img className="first-map-img" src="../assets/images/newmap.svg" style={{display:"block", marginLeft:"auto", marginRight:"auto"}}/>
			</div>;
		}

		if(this.state.invites){
			for (var i = 0; i < this.state.invites.length; i++) {
				invitesDom.push(
					<InviteLine key={"invite-key-" + i} cancel={this.cancelInvite.bind(this, i)} validate={this.validateInvite.bind(this, i)} invite={this.state.invites[i]}/>
				);	
			}
		}
		let subSpace = window.innerHeight - 103;
		let plan = this.props.user ? this.props.user.getPlan() : "Starter";

		return (
			<div id="maps-page">
				<PlansModal user={this.props.user} hideModal={this.hidePlansModal} show={this.state.showPlansModal}/>
				<div style={{maxWidth:"900px", marginLeft:"auto", marginRight:"auto"}}>
					<div id="logo-wrapper">
						<div id="logo">Mg.</div>
						<div style={{float:"right", marginRight:"20px", marginTop:"-45px"}}>
							
							<div title="change name" className="tippymaps purple-unerlined-hover" style={{fontSize:"14px", cursor:"pointer", display:"inline-block", marginRight:"20px"}} onClick={this.props.user ? this.changeName.bind(this, false, this.props.user.name) : null}>
								{this.props.user ? this.props.user.name : "John Doe"}
							</div>

							<div title="manage plan" className="tippymaps purple-unerlined-hover purple" style={{fontSize:"14px", display:"inline-block", cursor : "pointer", marginRight:"20px"}} onClick={this.openPlansModal}>
								{plan}
							</div>

							<div className="purple-unerlined-hover" style={{fontSize:"14px", display:"inline-block", cursor : "pointer"}} onClick={this.logout}>
								Logout
							</div>
						</div>
					</div>

					<div>
						<div className="flex">
							<div style={{width:"200px", paddingLeft:"20px", paddingRight:"20px", height: subSpace, overflow:"auto"}} className="flex-grow-0">
								<div onClick={this.fetchInvites} className="pending-invites-cta" style={{display : (pendingInvites && !this.state.invites.length ? "block" : "none")}}>
									{pendingInvites} pending invitation{pendingInvites > 1 ? "s" : ""}
								</div>
								{invitesDom}
								{maps}
							</div>
							<div style={{paddingLeft:"20px", paddingRight:"20px", height: subSpace, overflow:"auto"}} className="flex-grow-1">
								{rightSide}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		user : state.user,
		maps : state.maps
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    replaceMaps: (maps) => {
      dispatch(replaceMaps(maps));
    },
    addMap: (map) => {
      dispatch(addMap(map));
    },
    replaceUser: (user) => {
      dispatch(replaceUser(user));
    }
  }
}

const MapsPage = connect(
	mapStateToProps,
	mapDispatchToProps
)(MapsPageComp)

export default MapsPage;