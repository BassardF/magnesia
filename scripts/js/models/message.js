"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function Message(data, mid) {
	_classCallCheck(this, Message);

	if (mid) this.mid = mid;
	if (data) {
		for (var key in data) {
			this[key] = data[key];
		}
	}
};

exports.default = Message;
