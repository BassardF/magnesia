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
    this.x = 0;
    this.y = 0;
  	this.events = [{
  		uid : uid,
  		timestamp : timestamp,
  		type : 1
  	}];
  	return this;
  }

  initSecondary(nid, uid, timestamp, x, y){

    this.nid = nid;
    this.title = "New Node";
    this.description = "";
    this.color = "#000000";
    this.bcg_color = "#ffffff";
    this.scale = 1;
    this.x = x;
    this.y = y;
    this.events = [{
      uid : uid,
      timestamp : timestamp,
      type : 1
    }];
    return this;
  }

  upgradeFromServer(data){
    if(data){
      //Add & Upgrade
      for(var key in data){
        this[key] = data[key];
      }
      //Delete
      for(var key2 in this){
        if(this.hasOwnProperty(key2) && typeof data[key2] === undefined) 
          delete this[key2];
      }
    }
  }

}

export default Node;