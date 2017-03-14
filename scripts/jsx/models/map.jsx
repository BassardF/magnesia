import Node from './node'

class Map {
  
	constructor(data) {
		if(data){
			for(var key in data){
				if(key === "nodes"){
					this.nodes = [];
					for(var nid in data.nodes){
						this.nodes[nid] = new Node(data.nodes[nid]);
					}
				}
				else this[key] = data[key];
			}
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

	changeNodeLocation(nid, x, y){
		if(this.nodes && this.nodes[nid]){
			this.nodes[nid].x = x;
			this.nodes[nid].y = y;
		}
	}

	save(){
		firebase.database().ref('maps/' + this.mid).set(this);
	}

	upgradeFromServer(data){
		if(data){
			//Add
			for(var key in data){
				if(key !== "nodes") this[key] = data[key];
			}
			this.copyNodes(data.nodes);
			//Remove
			for(var key2 in this){
				if(this.hasOwnProperty(key2) && typeof data[key2] === undefined) 
					delete this[key2];
			}
		}
	}

	copyNodes(data){
		for(var nid in data){
			//Upgrade
			if(this.nodes[nid]) this.nodes[nid].upgradeFromServer(data[nid]);
			//Add
			else this.nodes[nid] = new Node(data[nid]);
		}
		for(var nid2 in this.nodes){
			//Delete
			if(!data[nid2]) this.nodes[nid2] = null;
		}
	}

	addNewNode(uid, x, y){
		var nid = this.nodes.length;
		this.nodes[nid] = new Node().initSecondary(nid, uid, new Date().getTime(), x, y);
	}

}

export default Map;