"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function User(data) {
  _classCallCheck(this, User);

  if (data) {
    for (var key in data) {
      this[key] = data[key];
    }
  }
};

exports.default = User;
