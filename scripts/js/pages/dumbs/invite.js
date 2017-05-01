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

var InviteLine = function (_React$Component) {
	_inherits(InviteLine, _React$Component);

	function InviteLine() {
		_classCallCheck(this, InviteLine);

		return _possibleConstructorReturn(this, (InviteLine.__proto__ || Object.getPrototypeOf(InviteLine)).apply(this, arguments));
	}

	_createClass(InviteLine, [{
		key: "render",
		value: function render() {

			return _react2.default.createElement(
				"div",
				{ className: "invite-line", onClick: null },
				_react2.default.createElement(
					"div",
					null,
					this.props.invite.title
				),
				_react2.default.createElement(
					"div",
					{ style: { marginTop: "5px" } },
					_react2.default.createElement(
						"div",
						{ className: "invite-line-buttons", onClick: this.props.validate },
						_react2.default.createElement(
							"span",
							{ style: { marginRight: "3px" }, className: "inline-block" },
							"\u2713"
						),
						_react2.default.createElement(
							"span",
							{ className: "inline-block", style: { marginRight: "3px" } },
							"accept"
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "invite-line-buttons", onClick: this.props.cancel },
						_react2.default.createElement(
							"span",
							{ style: { marginRight: "3px" }, className: "inline-block" },
							"\xD7"
						),
						_react2.default.createElement(
							"span",
							{ className: "inline-block", style: { marginRight: "3px" } },
							"cancel"
						)
					)
				)
			);
		}
	}]);

	return InviteLine;
}(_react2.default.Component);

;

exports.default = InviteLine;
