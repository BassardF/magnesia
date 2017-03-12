"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
				this[key] = data[key];
			}
		}
	}

	_createClass(Map, [{
		key: "changeNodeLocation",
		value: function changeNodeLocation(nid, x, y) {
			if (this.nodes && this.nodes[nid]) {
				this.nodes[nid].x = x;
				this.nodes[nid].y = y;
			}
		}
	}, {
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
	}]);

	return Map;
}();

exports.default = Map;
