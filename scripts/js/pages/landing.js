"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LandingPage = function (_React$Component) {
	_inherits(LandingPage, _React$Component);

	function LandingPage(props) {
		_classCallCheck(this, LandingPage);

		var _this = _possibleConstructorReturn(this, (LandingPage.__proto__ || Object.getPrototypeOf(LandingPage)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(LandingPage, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ id: "landing-page", style: { padding: "50px" } },
				_react2.default.createElement(
					"h1",
					null,
					"ideas"
				),
				_react2.default.createElement(
					"h3",
					null,
					"Why / How / What / Ex"
				),
				_react2.default.createElement(
					"div",
					null,
					"W : Ideas worth blooming - Growing brilliant ideas - Nurture your best ideas"
				),
				_react2.default.createElement(
					"div",
					null,
					"H : Visual representation | Structuration | Sharing @team"
				),
				_react2.default.createElement(
					"div",
					null,
					"Wh : Magnesia"
				),
				_react2.default.createElement(
					"h3",
					null,
					"tools ID"
				),
				_react2.default.createElement(
					"div",
					null,
					"node/user count"
				),
				_react2.default.createElement("div", null)
			);
		}
	}]);

	return LandingPage;
}(_react2.default.Component);

;

exports.default = LandingPage;
