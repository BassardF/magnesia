import Node from './node'
import Link from './link'
import Message from './message'

import EncodeServices from '../services/encode'

class Map {
  
	constructor(data) {
		if(data){
			for(var key in data){
				if(key === "nodes"){
					this.nodes = [];
					for(var nid in data.nodes){
						this.nodes[nid] = new Node(data.nodes[nid], data.mid);
					}
				} else if(key === "links"){
					this.links = [];
					for(var nid in data.links){
						this.links[nid] = new Link(data.links[nid], data.mid);
					}
				}
				else if(key === "messages"){
					this.messages = {};
					for(var mid in data.messages){
						this.messages[mid] = new Message(data.messages[mid], data.mid);
					}
				}
				else this[key] = data[key];
			}
			if(!this.nodes) this.nodes = [];
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
			new Node().initEmpty(0, uid, timestamp, this.mid)
		]
		return this;
	}

	changeNodeLocation(nid, x, y){
		if(this.nodes && this.nodes[nid]){
			this.nodes[nid].x = x;
			this.nodes[nid].y = y;
		}
	}

	deleteNode(nid){
		var tmpLinks = []
		if(this.nodes && this.nodes[nid]){
			for (var i = nid + 1; i < this.nodes.length; i++) {
				this.nodes[i].nid = this.nodes[i].nid - 1;
				this.nodes[i-1] = this.nodes[i];
			}
			this.nodes.pop();
			if(this.links){
				for (var i = 0; i < this.links.length; i++) {
					if(!this.links[i].nodes[nid]){
						for (var inid in this.links[i].nodes) {
							if(+inid > +nid) {
								this.links[i].nodes[inid - 1] = this.links[i].nodes[inid];
								delete this.links[i].nodes[inid];
							}
						}
						tmpLinks.push(this.links[i]);
					}
				}
				this.links = tmpLinks;
			}
		}
		this.save();
	}

	deleteLink(l){
		if(l && l.length == 2 && this.links && this.links.length){
			for (var i = this.links.length - 1; i >= 0; i--) {
				var link = this.links[i];
				var nkeys = link && link.nodes ? Object.keys(link.nodes).join("") : null;
				if(nkeys == l){
					this.links.splice(i, 1);
					this.save();
				}
			}
		}
	}

	changeTitle(title){
		this.title = title;
		this.save();
	}

	save(){
		firebase.database().ref('maps/' + this.mid).set(this);
	}

	invite(to, email, from){
		if(!this.invites) this.invites = {};
		this.invites[to] = {
			from : from,
			timestamp : new Date().getTime(),
			email : email
		};
		firebase.database().ref('users/' + to + '/invites/' + this.mid).set({
			from : from,
			timestamp : new Date().getTime()	
		});
		this.save();
	}

	externalInvite(email, from){
		if(!this.externalInvites) this.externalInvites = [];
		this.externalInvites.push({
			from : from,
			timestamp : new Date().getTime(),
			email : email,
			joined : false
		});
		this.save();
	}

	leave(uid){
		firebase.database().ref('maps/' + this.mid + '/users/' + uid).remove();
		firebase.database().ref('users/' + uid + '/maps/' + this.mid).remove();
	}

	sendMessage(msg, uid, name){
		var message = new Message({
			content : msg,
			uid : uid,
			name : name,
			timestamp : new Date().getTime()
		});
		firebase.database().ref('maps/' + this.mid + '/messages').push(message);
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
			else this.nodes[nid] = new Node(data[nid], this.mid);
		}
		for(var nid2 in this.nodes){
			//Delete
			if(!data[nid2]) this.nodes.splice(nid2, 1);
		}
	}

	addNewLink(uid, nid1, nid2){
		if(!this.links) this.links = [];
		for (var i = 0; i < this.links.length; i++) {
			if(this.links[i] && this.links[i].nodes && this.links[i].nodes[nid1] && this.links[i].nodes[nid2]) return;
		}
		this.links.push(new Link().initEmpty(uid, new Date().getTime(), nid1, nid2, this.mid));
	}

	addNewNode(uid, x, y, connectedNode){
		var nid = this.nodes ? this.nodes.length : 0;
		this.nodes[nid] = new Node().initSecondary(nid, uid, new Date().getTime(), x, y, this.mid);
		if(connectedNode || connectedNode === 0){
			this.addNewLink(uid, connectedNode, nid);
		}
	}

}

export default Map;