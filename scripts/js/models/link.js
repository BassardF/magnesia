"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Link = function () {
	function Link(data, mid) {
		_classCallCheck(this, Link);

		if (mid) this.mid = mid;
		if (data) {
			for (var key in data) {
				this[key] = data[key];
			}
		}
	}

	_createClass(Link, [{
		key: "initEmpty",
		value: function initEmpty(uid, timestamp, nid1, nid2, mid) {
			this.mid = mid;
			this.label = "";
			this.scale = 1;
			this.events = [{
				uid: uid,
				timestamp: timestamp,
				type: 2
			}];
			this.nodes = {};
			this.nodes[nid1] = {
				label: "",
				type: false
			};
			this.nodes[nid2] = {
				label: "",
				type: false
			};
			return this;
		}
	}]);

	return Link;
}();

exports.default = Link;
