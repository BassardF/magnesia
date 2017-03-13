import Node from './node'

class Map {
  
	constructor(data) {
		if(data){
			for(var key in data){
				this[key] = data[key];
			}
		}
	}

	changeNodeLocation(nid, x, y){
		if(this.nodes && this.nodes[nid]){
			this.nodes[nid].x = x;
			this.nodes[nid].y = y;
		}
	}

	initEmpty(uid, timestamp, userName){
		this.title = "Map Name";
		this.description = "description";
		this.events = [{
			uid : uid,
			timestamp : timestamp,
			type : 0
		}];
		this.users = this.users || {};
		this.users[uid] = userName;
		this.nodes = [
			new Node().initEmpty(0, uid, timestamp)
		]
		return this;
	}

	save(){
		firebase.database().ref('maps/' + this.mid).set(this);
	}

}

export default Map;