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

var RegisterPage = function (_React$Component) {
	_inherits(RegisterPage, _React$Component);

	function RegisterPage(props) {
		_classCallCheck(this, RegisterPage);

		var _this = _possibleConstructorReturn(this, (RegisterPage.__proto__ || Object.getPrototypeOf(RegisterPage)).call(this, props));

		_this.changeEmail = _this.changeEmail.bind(_this);
		_this.changePwd = _this.changePwd.bind(_this);
		_this.register = _this.register.bind(_this);
		_this.login = _this.login.bind(_this);

		_this.state = {
			email: "",
			pwd: ""
		};
		return _this;
	}

	_createClass(RegisterPage, [{
		key: "changeEmail",
		value: function changeEmail() {
			var _this2 = this;

			this.setState(function (prevState) {
				return {
					email: _this2.refs.email.value
				};
			});
		}
	}, {
		key: "changePwd",
		value: function changePwd() {
			var _this3 = this;

			this.setState(function (prevState) {
				return {
					pwd: _this3.refs.pwd.value
				};
			});
		}
	}, {
		key: "register",
		value: function register() {
			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode + errorMessage);
			});
		}
	}, {
		key: "login",
		value: function login() {
			firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode + errorMessage);
			});
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ id: "register-page" },
				_react2.default.createElement(
					"div",
					null,
					_react2.default.createElement(
						"h1",
						null,
						"Regiser"
					),
					_react2.default.createElement(
						"div",
						null,
						_react2.default.createElement("input", { ref: "email", type: "email", value: this.state.email, onChange: this.changeEmail, placeholder: "Email" })
					),
					_react2.default.createElement(
						"div",
						null,
						_react2.default.createElement("input", { ref: "pwd", type: "password", value: this.state.pwd, onChange: this.changePwd, placeholder: "Password" })
					),
					_react2.default.createElement(
						"button",
						{ onClick: this.register },
						"register"
					),
					_react2.default.createElement(
						"button",
						{ onClick: this.login },
						"login"
					)
				)
			);
		}
	}]);

	return RegisterPage;
}(_react2.default.Component);

;

exports.default = RegisterPage;
