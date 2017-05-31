"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EncodeServices = function () {
  function EncodeServices() {
    _classCallCheck(this, EncodeServices);
  }

  _createClass(EncodeServices, null, [{
    key: "encode",
    value: function encode(text) {
      if (!text) return "";
      text = text.split(".").join("___");
      text = text.split("[").join("____");
      text = text.split("]").join("_____");
      text = encodeURIComponent(text);
      return text;
    }
  }, {
    key: "decode",
    value: function decode(text) {
      if (!text) return "";
      text = decodeURIComponent(text);
      text = text.split("_____").join("]");
      text = text.split("____").join("[");
      text = text.split("___").join(".");
      return text;
    }
  }]);

  return EncodeServices;
}();

exports.default = EncodeServices;
