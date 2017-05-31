'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _link = require('./link');

var _link2 = _interopRequireDefault(_link);

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _encode = require('../services/encode');

var _encode2 = _interopRequireDefault(_encode);

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
						this.nodes[nid] = new _node2.default(data.nodes[nid], data.mid);
					}
				} else if (key === "links") {
					this.links = [];
					for (var nid in data.links) {
						this.links[nid] = new _link2.default(data.links[nid], data.mid);
					}
				} else if (key === "messages") {
					this.messages = {};
					for (var mid in data.messages) {
						this.messages[mid] = new _message2.default(data.messages[mid], data.mid);
					}
				} else this[key] = data[key];
			}
			if (!this.nodes) this.nodes = [];
		}
	}

	_createClass(Map, [{
		key: 'initEmpty',
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
			this.nodes = [new _node2.default().initEmpty(0, uid, timestamp, this.mid)];
			return this;
		}
	}, {
		key: 'changeNodeLocation',
		value: function changeNodeLocation(nid, x, y) {
			if (this.nodes && this.nodes[nid]) {
				this.nodes[nid].x = x;
				this.nodes[nid].y = y;
			}
		}
	}, {
		key: 'deleteNode',
		value: function deleteNode(nid) {
			var tmpLinks = [];
			if (this.nodes && this.nodes[nid]) {
				for (var i = nid + 1; i < this.nodes.length; i++) {
					this.nodes[i].nid = this.nodes[i].nid - 1;
					this.nodes[i - 1] = this.nodes[i];
				}
				this.nodes.pop();
				if (this.links) {
					for (var i = 0; i < this.links.length; i++) {
						if (!this.links[i].nodes[nid]) {
							for (var inid in this.links[i].nodes) {
								if (+inid > +nid) {
									this.links[i].nodes[inid - 1] = this.links[i].nodes[inid];
									delete this.links[i].nodes[inid];
								}
							}
							tmpLinks.push(this.links[i]);
						}
					}
					this.links = tmpLinks;
				}
			}
			this.save();
		}
	}, {
		key: 'deleteLink',
		value: function deleteLink(l) {
			if (l && l.length == 2 && this.links && this.links.length) {
				for (var i = this.links.length - 1; i >= 0; i--) {
					var link = this.links[i];
					var nkeys = link && link.nodes ? Object.keys(link.nodes).join("") : null;
					if (nkeys == l) {
						this.links.splice(i, 1);
						this.save();
					}
				}
			}
		}
	}, {
		key: 'changeTitle',
		value: function changeTitle(title) {
			this.title = title;
			this.save();
		}
	}, {
		key: 'save',
		value: function save() {
			firebase.database().ref('maps/' + this.mid).set(this);
		}
	}, {
		key: 'invite',
		value: function invite(to, email, from) {
			if (!this.invites) this.invites = {};
			this.invites[to] = {
				from: from,
				timestamp: new Date().getTime(),
				email: email
			};
			firebase.database().ref('users/' + to + '/invites/' + this.mid).set({
				from: from,
				timestamp: new Date().getTime()
			});
			this.save();
		}
	}, {
		key: 'externalInvite',
		value: function externalInvite(email, from) {
			if (!this.externalInvites) this.externalInvites = [];
			this.externalInvites.push({
				from: from,
				timestamp: new Date().getTime(),
				email: email,
				joined: false
			});
			this.save();
		}
	}, {
		key: 'leave',
		value: function leave(uid) {
			firebase.database().ref('maps/' + this.mid + '/users/' + uid).remove();
			firebase.database().ref('users/' + uid + '/maps/' + this.mid).remove();
		}
	}, {
		key: 'sendMessage',
		value: function sendMessage(msg, uid, name) {
			var message = new _message2.default({
				content: msg,
				uid: uid,
				name: name,
				timestamp: new Date().getTime()
			});
			firebase.database().ref('maps/' + this.mid + '/messages').push(message);
		}
	}, {
		key: 'upgradeFromServer',
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
		key: 'copyNodes',
		value: function copyNodes(data) {
			for (var nid in data) {
				//Upgrade
				if (this.nodes[nid]) this.nodes[nid].upgradeFromServer(data[nid]);
				//Add
				else this.nodes[nid] = new _node2.default(data[nid], this.mid);
			}
			for (var nid2 in this.nodes) {
				//Delete
				if (!data[nid2]) this.nodes.splice(nid2, 1);
			}
		}
	}, {
		key: 'addNewLink',
		value: function addNewLink(uid, nid1, nid2) {
			if (!this.links) this.links = [];
			for (var i = 0; i < this.links.length; i++) {
				if (this.links[i] && this.links[i].nodes && this.links[i].nodes[nid1] && this.links[i].nodes[nid2]) return;
			}
			this.links.push(new _link2.default().initEmpty(uid, new Date().getTime(), nid1, nid2, this.mid));
		}
	}, {
		key: 'addNewNode',
		value: function addNewNode(uid, x, y, connectedNode) {
			var nid = this.nodes ? this.nodes.length : 0;
			this.nodes[nid] = new _node2.default().initSecondary(nid, uid, new Date().getTime(), x, y, this.mid);
			if (connectedNode || connectedNode === 0) {
				this.addNewLink(uid, connectedNode, nid);
			}
		}
	}]);

	return Map;
}();

exports.default = Map;
