"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(data) {
    _classCallCheck(this, User);

    if (data) {
      for (var key in data) {
        this[key] = data[key];
      }
    }
  }

  _createClass(User, [{
    key: "cancelInvite",
    value: function cancelInvite(mid, uid) {
      delete this.invites[mid];
      firebase.database().ref("users/" + uid + "/invites/" + mid).remove();
      firebase.database().ref("maps/" + mid + "/invites/" + uid).remove();
    }
  }, {
    key: "acceptInvite",
    value: function acceptInvite(mid, uid) {
      delete this.invites[mid];
      firebase.database().ref("users/" + uid + "/invites/" + mid).remove();
      firebase.database().ref("maps/" + mid + "/invites/" + uid).remove();
      firebase.database().ref("users/" + uid + "/maps/" + mid).set(new Date().getTime());
      firebase.database().ref("maps/" + mid + "/users/" + uid).set(this.name);
      if (!this.maps) this.maps = {};
      this.maps[mid] = new Date().getTime();
    }
  }, {
    key: "changeName",
    value: function changeName(uid, newName) {
      this.name = newName;
      firebase.database().ref("users/" + uid + "/name").set(newName);
      if (this.maps) {
        for (var mid in this.maps) {
          firebase.database().ref("maps/" + mid + "/users/" + uid).set(newName);
          firebase.database().ref("maps/" + mid + "/messages").once("value", function (res) {
            var msgs = res.val();
            if (msgs) {
              for (var messid in msgs) {
                if (msgs[messid].uid == uid) {
                  firebase.database().ref("maps/" + mid + "/messages/" + messid + "/name").set(newName);
                }
              }
            }
          });
        }
      }
    }
  }]);

  return User;
}();

exports.default = User;
