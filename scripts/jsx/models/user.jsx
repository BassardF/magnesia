class User {
  
  constructor(data) {
    if(data){
      for(var key in data){
        this[key] = data[key];
      }
    }
  }

  cancelInvite(mid, uid){
  	delete this.invites[mid];
  	firebase.database().ref("users/" + uid + "/invites/" + mid).remove();
  	firebase.database().ref("maps/" + mid + "/invites/" + uid).remove();
  }

  acceptInvite(mid, uid){
  	delete this.invites[mid];
  	firebase.database().ref("users/" + uid + "/invites/" + mid).remove();
  	firebase.database().ref("maps/" + mid + "/invites/" + uid).remove();
  	firebase.database().ref("users/" + uid + "/maps/" + mid).set(new Date().getTime());
  	firebase.database().ref("maps/" + mid + "/users/" + uid).set(this.name);
  	if(!this.maps) this.maps = {};
  	this.maps[mid] = new Date().getTime();
  }

}

export default User;