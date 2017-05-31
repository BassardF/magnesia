'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _encode = require('../services/encode');

var _encode2 = _interopRequireDefault(_encode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthServices = function () {
  function AuthServices() {
    _classCallCheck(this, AuthServices);
  }

  _createClass(AuthServices, null, [{
    key: 'innerCreateUser',
    value: function innerCreateUser(uid, email, pontentialMap, callback) {
      var newUser = new _user2.default({
        email: email,
        register_date: new Date().getTime(),
        name: "placeholder"
      });
      if (pontentialMap) {
        newUser.maps = {};
        newUser.maps[pontentialMap] = new Date().getTime();
      }
      firebase.database().ref('users/' + uid).set(newUser, function (error) {
        if (callback) callback(error ? null : newUser);
      });
    }
  }, {
    key: 'createUser',
    value: function createUser(uid, email, pontentialMap, callback) {
      if (email) {
        AuthServices.innerCreateUser(uid, email, pontentialMap, callback);
      } else {
        swal({
          title: "Email Address",
          text: "Sorry but your provider didn't give your email address. Please enter a valid one to enable collaboration.",
          type: "input",
          closeOnConfirm: false,
          inputPlaceholder: "Email Address"
        }, function (inputValue) {
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
  }, {
    key: 'fetchUser',
    value: function fetchUser(uid, callback) {
      firebase.database().ref('users/' + uid).once("value", function (snap) {
        if (callback) callback(snap && snap.val() ? new _user2.default(snap.val()) : null);
      });
    }
  }, {
    key: 'getUid',
    value: function getUid() {
      return firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
    }
  }, {
    key: 'logout',
    value: function logout() {
      document.title = "Magnesia";
      firebase.auth().signOut();
    }
  }, {
    key: 'uploadEmail',
    value: function uploadEmail(uid, email) {
      var unauthorized = [".", "#", "$", "[", "]"];
      if (uid && email) {
        firebase.database().ref('emails/' + _encode2.default.encode(email)).set(uid);
      }
    }
  }]);

  return AuthServices;
}();

exports.default = AuthServices;
