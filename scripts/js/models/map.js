"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require("./node");

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
	function Map(data) {
		_classCallCheck(this, Map);

		if (data) {
			for (var key in data) {
				if (key === "nodes") {
					this.nodes = [];
					for (var nid in data.nodes) {
						this.nodes[nid] = new _node2.default(data.nodes[nid]);
					}
				} else this[key] = data[key];
			}
		}
	}

	_createClass(Map, [{
		key: "initEmpty",
		value: function initEmpty(uid, timestamp, userName) {
			this.title = "Map Name";
			this.description = "description";
			this.events = [{
				uid: uid,
				timestamp: timestamp,
				type: 0
			}];
			this.users = this.users || {};
			this.users[uid] = userName;
			this.nodes = [new _node2.default().initEmpty(0, uid, timestamp)];
			return this;
		}
	}, {
		key: "changeNodeLocation",
		value: function changeNodeLocation(nid, x, y) {
			if (this.nodes && this.nodes[nid]) {
				this.nodes[nid].x = x;
				this.nodes[nid].y = y;
			}
		}
	}, {
		key: "save",
		value: function save() {
			firebase.database().ref('maps/' + this.mid).set(this);
		}
	}, {
		key: "upgradeFromServer",
		value: function upgradeFromServer(data) {
			if (data) {
				//Add
				for (var key in data) {
					if (key !== "nodes") this[key] = data[key];
				}
				this.copyNodes(data.nodes);
				//Remove
				for (var key2 in this) {
					if (this.hasOwnProperty(key2) && _typeof(data[key2]) === undefined) delete this[key2];
				}
			}
		}
	}, {
		key: "copyNodes",
		value: function copyNodes(data) {
			for (var nid in data) {
				//Upgrade
				if (this.nodes[nid]) this.nodes[nid].upgradeFromServer(data[nid]);
				//Add
				else this.nodes[nid] = new _node2.default(data[nid]);
			}
			for (var nid2 in this.nodes) {
				//Delete
				if (!data[nid2]) this.nodes[nid2] = null;
			}
		}
	}, {
		key: "addNewNode",
		value: function addNewNode(uid, x, y) {
			var nid = this.nodes.length;
			this.nodes[nid] = new _node2.default().initSecondary(nid, uid, new Date().getTime(), x, y);
		}
	}]);

	return Map;
}();

exports.default = Map;
