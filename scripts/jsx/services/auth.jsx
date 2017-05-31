import User from '../models/user'

import EncodeServices from '../services/encode'

class AuthServices {

  static innerCreateUser(uid, email, pontentialMap, callback){
    var newUser = new User({
      email: email,
      register_date : new Date().getTime(),
      name : "placeholder"
    });
    if(pontentialMap){
      newUser.maps = {};
      newUser.maps[pontentialMap] = new Date().getTime();
    }
    firebase.database().ref('users/' + uid).set(newUser, (error)=>{
      if(callback) callback(error ? null : newUser);
    });
  }

  static createUser(uid, email, pontentialMap, callback) {
    if(email){
      AuthServices.innerCreateUser(uid, email, pontentialMap, callback);  
    } else {
      swal({
        title: "Email Address",
        text: "Sorry but your provider didn't give your email address. Please enter a valid one to enable collaboration.",
        type: "input",
        closeOnConfirm: false,
        inputPlaceholder: "Email Address"
      },
      function(inputValue){
         var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!inputValue || !re.test(inputValue)) {
          swal.showInputError("Please enter a valid email address");
          return false;
        } else {
          AuthServices.innerCreateUser(uid, inputValue, pontentialMap, callback);
          swal("Thank you !", "You can now be invited by other users.", "success");
        }
        
      });      
    }
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
      firebase.database().ref('emails/' + EncodeServices.encode(email)).set(uid);
    }
    
  }

}

export default AuthServices;