class Link {
  
	constructor(data, mid) {
		if(mid) this.mid = mid;
		if(data){
			for(var key in data){
				this[key] = data[key];
			}
		}
	}

	initEmpty(uid, timestamp, nid1, nid2, mid){
		this.mid = mid
		this.label = "";
		this.scale = 1;
		this.events = [{
			uid : uid,
			timestamp : timestamp,
			type : 2
		}];
		this.nodes = {};
		this.nodes[nid1] = {
			label : "",
			type : false
		}
		this.nodes[nid2] = {
			label : "",
			type : false
		}
		return this;
	}


}

export default Link;