import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';

import {replaceMaps, addMap} from '../actions/maps'
import replaceUser from '../actions/users'
import AuthServices from '../services/auth'
import Map from '../models/map'

class MapsPageComp extends React.Component {

	constructor(props) {
	    super(props);
	    this.refreshMaps = this.refreshMaps.bind(this);
	    this.createMap = this.createMap.bind(this);
	    this.state = {};
	}

	componentWillMount(){
		this.refreshMaps();
	}

	refreshMaps(){
		if(this.props.user && this.props.user.maps){
			for(var kid in this.props.user.maps){
				firebase.database().ref('maps/' + kid).once("value", (snap) => {
					if(snap && snap.val()) this.props.addMap(snap.val());
				});
			}
		}
		
	}

	createMap(){
		let creationTimestamp = new Date().getTime();
		let newMap = new Map({
			title : "Map Name",
			description : "description",
			events : [{
				uid : AuthServices.getUid(),
				timestamp : creationTimestamp,
				type : 0
			}]
		});
		newMap.users = {};
		newMap.users[AuthServices.getUid()] = this.props.user.name;

		//Uploading our new Map
		let newMapRef = firebase.database().ref('maps').push();
  		let newMapkey = newMapRef.key;
		newMapRef.set(newMap, (error) => {
			if(!error){
				this.props.replaceMaps(this.props.maps ? this.props.maps.concat(newMap) : [newMap]);
				//Adding the Map to the user
				firebase.database().ref('users/' + AuthServices.getUid() + '/maps/' + newMapkey).set(creationTimestamp, (error2)=>{
					if(!error2){
						if(!this.props.user.maps) this.props.user.maps = {};
						this.props.user.maps[newMapkey] = creationTimestamp;
						this.props.replaceUser(this.props.user);
					}
				});
			}
		});

	}

	render() {
		return (
			<div id="maps-page">
				<div>
					<h1>Maps</h1>
					<button onClick={this.createMap}>Create map</button>
				</div>
			</div>
		);
	}
};

const mapStateToProps = (state) => {
	console.log("nst", state);
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
      console.log("dispatch", map);
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