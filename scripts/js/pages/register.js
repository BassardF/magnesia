'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _auth = require('../services/auth');

var _auth2 = _interopRequireDefault(_auth);

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
		_this.changeName = _this.changeName.bind(_this);
		_this.register = _this.register.bind(_this);
		_this.login = _this.login.bind(_this);
		_this.isMailValid = _this.isMailValid.bind(_this);

		_this.state = {
			email: "",
			pwd: "",
			name: ""
		};
		return _this;
	}

	_createClass(RegisterPage, [{
		key: 'changeName',
		value: function changeName() {
			var _this2 = this;

			this.setState(function (prevState) {
				return {
					name: _this2.refs.name.value
				};
			});
		}
	}, {
		key: 'isMailValid',
		value: function isMailValid(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	}, {
		key: 'changeEmail',
		value: function changeEmail() {
			var _this3 = this;

			var email = this.refs.email.value;
			var validEmail = email && this.isMailValid(email);
			this.setState(function (prevState) {
				return {
					email: _this3.refs.email.value,
					validEmail: validEmail,
					mailTaken: null
				};
			});
			if (validEmail) {
				var unauthorized = [".", "#", "$", "[", "]"];
				for (var i = 0; i < unauthorized.length; i++) {
					email = email.split(unauthorized[i]).join("_");
				}
				firebase.database().ref('emails/' + email).once("value", function (snap) {
					_this3.setState(function (prevState) {
						return {
							mailTaken: !!snap.val()
						};
					});
				}, function (error) {
					console.log("error", error);
				});
			}
		}
	}, {
		key: 'changePwd',
		value: function changePwd() {
			var _this4 = this;

			this.setState(function (prevState) {
				return {
					pwd: _this4.refs.pwd.value
				};
			});
		}
	}, {
		key: 'register',
		value: function register() {
			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode + errorMessage);
			});
		}
	}, {
		key: 'login',
		value: function login() {
			firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log(errorCode + errorMessage);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var showRegister = this.state.validEmail && this.state.mailTaken === false;
			var showLogin = this.state.validEmail && this.state.mailTaken === true;

			return _react2.default.createElement(
				'div',
				{ id: 'register-page' },
				_react2.default.createElement(
					'div',
					{ style: { maxWidth: "900px", marginLeft: "auto", marginRight: "auto" } },
					_react2.default.createElement(
						'div',
						{ id: 'logo-wrapper' },
						_react2.default.createElement(
							'div',
							{ id: 'logo' },
							'Mg.'
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ style: { maxWidth: "500px", marginLeft: "auto", marginRight: "auto" } },
					_react2.default.createElement(
						'h1',
						{ style: { marginTop: "40px", fontSize: "20px" } },
						'Register or Login !'
					),
					_react2.default.createElement(
						'h3',
						{ style: { fontSize: "14px", marginBottom: "40px" }, className: 'light-purple' },
						'Wether you already have an account or not you\'re in the right place !'
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement('input', { className: 'reg-inp', ref: 'email', type: 'email', value: this.state.email, onChange: this.changeEmail, placeholder: 'email address' })
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement('input', { className: 'reg-inp', ref: 'pwd', type: 'password', value: this.state.pwd, onChange: this.changePwd, placeholder: 'password' })
					),
					_react2.default.createElement(
						'div',
						{ style: { display: showRegister ? "block" : "none" } },
						_react2.default.createElement('input', { className: 'reg-inp', ref: 'name', type: 'text', value: this.state.name, onChange: this.changeName, placeholder: 'name' })
					),
					_react2.default.createElement(
						'button',
						{ className: 'reg-button', style: { display: showRegister ? "block" : "none" }, onClick: this.register },
						'register'
					),
					_react2.default.createElement(
						'button',
						{ className: 'reg-button', style: { display: showLogin ? "block" : "none" }, onClick: this.login },
						'login'
					)
				)
			);
		}
	}]);

	return RegisterPage;
}(_react2.default.Component);

;

exports.default = RegisterPage;
