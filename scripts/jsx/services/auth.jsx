import User from '../models/user'

class AuthServices {

  static createUser(uid, email, callback) {

    var newUser = new User({
      email: email,
      register_date : new Date().getTime()
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

}

export default AuthServices;