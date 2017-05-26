import User from '../models/user'

class AuthServices {

  static createUser(uid, email, callback) {

    var newUser = new User({
      email: email,
      register_date : new Date().getTime(),
      name : "placeholder"
    });
    firebase.database().ref('users/' + uid).set(newUser, (error)=>{
      if(callback) callback(error ? null : newUser);
    });
    
  }

  static fetchUser(uid, callback) {
    firebase.database().ref('users/' + uid).once("value", (snap)=>{
      if(callback) callback(snap && snap.val() ? new User(snap.val()) : null);
    });
  }

  static getUid(){
    return firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
  }

  static logout(){
    document.title = "Magnesia";
    firebase.auth().signOut();
  }

  static uploadEmail(uid, email){
    var unauthorized = [".", "#", "$", "[", "]"];
    if(uid && email){
      for (var i = 0; i < unauthorized.length; i++) {
        email = email.split(unauthorized[i]).join("___");
      }
      firebase.database().ref('emails/' + email).set(uid);
    }
    
  }

}

export default AuthServices;