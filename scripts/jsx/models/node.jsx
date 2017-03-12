class Node {
  
  constructor(data) {
    if(data){
      for(var key in data){
        this[key] = data[key];
      }
    }
  }

  initEmpty(nid, uid, timestamp){

    this.nid = nid;
  	this.title = "First Node";
  	this.description = "";
  	this.color = "#000000";
  	this.bcg_color = "#ffffff";
  	this.scale = 1;
  	this.events = [{
  		uid : uid,
  		timestamp : timestamp,
  		type : 1
  	}];
  	return this;
  }

}

export default Node;