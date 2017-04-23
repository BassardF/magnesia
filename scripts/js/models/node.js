"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(data, mid) {
    _classCallCheck(this, Node);

    if (mid) this.mid = mid;
    if (data) {
      for (var key in data) {
        this[key] = data[key];
      }
    }
  }

  _createClass(Node, [{
    key: "initEmpty",
    value: function initEmpty(nid, uid, timestamp, mid) {

      this.nid = nid;
      this.utt = new Date().getTime();
      this.mid = mid || null;
      this.title = "First Node";
      this.description = "";
      this.color = "#000000";
      this.bcg_color = "#ffffff";
      this.scale = 1;
      this.x = 0;
      this.y = 0;
      this.events = [{
        uid: uid,
        timestamp: timestamp,
        type: 1
      }];
      return this;
    }
  }, {
    key: "initSecondary",
    value: function initSecondary(nid, uid, timestamp, x, y, mid) {

      this.nid = nid;
      this.mid = mid || null;
      this.utt = new Date().getTime();
      this.title = "New Node";
      this.description = "";
      this.color = "#000000";
      this.bcg_color = "#ffffff";
      this.scale = 1;
      this.x = x;
      this.y = y;
      this.events = [{
        uid: uid,
        timestamp: timestamp,
        type: 1
      }];
      return this;
    }
  }, {
    key: "save",
    value: function save() {
      firebase.database().ref('maps/' + this.mid + "/nodes/" + this.nid).set(this);
    }
  }, {
    key: "upgradeFromServer",
    value: function upgradeFromServer(data) {
      if (data) {
        //Add & Upgrade
        for (var key in data) {
          this[key] = data[key];
        }
        //Delete
        for (var key2 in this) {
          if (this.hasOwnProperty(key2) && _typeof(data[key2]) === undefined) delete this[key2];
        }
      }
    }
  }]);

  return Node;
}();

exports.default = Node;
