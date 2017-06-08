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

  dismissAdvice(uid, type){
    firebase.database().ref("users/" + uid + "/advice/" + type).set(true);
  }

  resetTutorial(uid){
    firebase.database().ref("users/" + uid + "/advice").remove();
  }

  changeName(uid, newName){
    this.name = newName;
    firebase.database().ref("users/" + uid + "/name").set(newName);
    if(this.maps){
      for(var mid in this.maps){
        firebase.database().ref("maps/" + mid + "/users/" + uid).set(newName);
        firebase.database().ref("maps/" + mid + "/messages").once("value", (res)=>{
          var msgs = res.val();
          if(msgs){
            for(var messid in msgs){
              if(msgs[messid].uid == uid){
                firebase.database().ref("maps/" + mid + "/messages/" + messid + "/name").set(newName);
              }
            }
          }
        });
      }
    }
  }

  getPlan(){
    if (this.rights == 1) return "Standard";
    if (this.rights == 2) return "Ultimate";
    return "Starter";
  }

}

export default User;