'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthServices = function () {
  function AuthServices() {
    _classCallCheck(this, AuthServices);
  }

  _createClass(AuthServices, null, [{
    key: 'createUser',
    value: function createUser(uid, email, callback) {

      var newUser = new _user2.default({
        email: email,
        register_date: new Date().getTime(),
        name: "placeholder name"
      });
      firebase.database().ref('users/' + uid).set(newUser, function (error) {
        if (callback) callback(error ? null : newUser);
      });
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
  }]);

  return AuthServices;
}();

exports.default = AuthServices;
