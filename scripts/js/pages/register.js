'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

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
		_this.register = _this.register.bind(_this);
		_this.login = _this.login.bind(_this);
		_this.isMailValid = _this.isMailValid.bind(_this);
		_this.toggleLoading = _this.toggleLoading.bind(_this);
		_this.pwskeyUp = _this.pwskeyUp.bind(_this);

		_this.state = {
			email: "",
			pwd: "",
			loading: false,
			errorMessage: null
		};
		return _this;
	}

	_createClass(RegisterPage, [{
		key: 'isMailValid',
		value: function isMailValid(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	}, {
		key: 'changeEmail',
		value: function changeEmail() {
			var _this2 = this;

			var email = this.refs.email.value;
			var validEmail = email && this.isMailValid(email);
			this.setState(function (prevState) {
				return {
					email: _this2.refs.email.value,
					validEmail: validEmail,
					mailTaken: null,
					errorMessage: null
				};
			});
			if (validEmail) {
				var unauthorized = [".", "#", "$", "[", "]"];
				for (var i = 0; i < unauthorized.length; i++) {
					email = email.split(unauthorized[i]).join("_");
				}
				firebase.database().ref('emails/' + email).once("value", function (snap) {
					_this2.setState(function (prevState) {
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
			var _this3 = this;

			this.setState(function (prevState) {
				return {
					pwd: _this3.refs.pwd.value,
					errorMessage: null
				};
			});
		}
	}, {
		key: 'pwskeyUp',
		value: function pwskeyUp(e) {
			if (e.which && e.which === 13) {
				var showRegister = this.state.validEmail && this.state.mailTaken === false;
				var showLogin = this.state.validEmail && this.state.mailTaken === true;
				var refB = this.refs.regbutton;
				var refL = this.refs.loginbutton;
				if (showRegister && refB) refB.click();
				if (showLogin && refL) refL.click();
			}
		}
	}, {
		key: 'register',
		value: function register() {
			var _this4 = this;

			this.toggleLoading();
			firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pwd).catch(function (error, ad) {
				var errorCode = error.code;
				var errorMessage = error.message;
				_this4.setState({
					errorMessage: errorMessage,
					loading: false
				});
			});
		}
	}, {
		key: 'login',
		value: function login() {
			var _this5 = this;

			this.toggleLoading();
			firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pwd).catch(function (error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				_this5.setState({
					errorMessage: errorMessage,
					loading: false
				});
			});
		}
	}, {
		key: 'toggleLoading',
		value: function toggleLoading() {
			this.setState({
				loading: !this.state.loading
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
					'h1',
					{ style: { marginTop: "30px", marginBottom: "30px", fontSize: "20px", textAlign: "center" } },
					'Join Us - or - Login'
				),
				_react2.default.createElement(
					'div',
					{ className: 'purple', style: { display: this.state.errorMessage ? "block" : "none", textAlign: "center", marginTop: "-20px", paddingBottom: "30px" } },
					this.state.errorMessage
				),
				_react2.default.createElement(
					'div',
					{ style: { maxWidth: "700px", marginLeft: "auto", marginRight: "auto" } },
					_react2.default.createElement(
						'div',
						{ className: 'col-wrap' },
						_react2.default.createElement(
							'div',
							{ className: 'half' },
							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement('input', { className: "reg-inp " + (this.state.validEmail ? "validated" : ""), ref: 'email', type: 'email', value: this.state.email, onChange: this.changeEmail, placeholder: 'email address' })
							),
							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement('input', { onKeyPress: this.pwskeyUp, className: "reg-inp " + (this.state.pwd && this.state.pwd.length >= 6 ? "validated" : ""), ref: 'pwd', type: 'password', value: this.state.pwd, onChange: this.changePwd, placeholder: 'password' })
							),
							_react2.default.createElement(
								'button',
								{ className: 'pre-loading-button', style: { display: !showRegister && !showLogin ? "block" : "none" } },
								_react2.default.createElement(
									'span',
									null,
									'login / register'
								)
							),
							_react2.default.createElement(
								'button',
								{ ref: 'regbutton', className: (this.state.loading ? "loading-button " : "reg-button ") + (this.state.validEmail && this.state.pwd && this.state.pwd.length >= 6 ? "" : "disabled-button"),
									style: { display: showRegister ? "block" : "none" },
									onClick: this.state.validEmail && this.state.pwd && this.state.pwd.length >= 6 ? this.register : null },
								_react2.default.createElement(
									'span',
									{ style: { display: this.state.loading ? "inline" : "none" } },
									_react2.default.createElement('img', { src: '../assets/images/spinner-purple.svg', className: 'rotate', style: { display: "block", width: "20px", height: "20px", marginRight: "auto", marginLeft: "auto" } }),
									_react2.default.createElement(
										'span',
										{ style: { verticalAlgin: "middle" } },
										'Loading'
									)
								),
								_react2.default.createElement(
									'span',
									{ style: { display: this.state.loading ? "none" : "inline" } },
									'register'
								)
							),
							_react2.default.createElement(
								'button',
								{ ref: 'loginbutton', className: (this.state.loading ? "loading-button " : "reg-button ") + (this.state.validEmail && this.state.pwd && this.state.pwd.length >= 6 ? "" : "disabled-button"),
									style: { display: showLogin ? "block" : "none" },
									onClick: this.state.validEmail && this.state.pwd && this.state.pwd.length >= 6 ? this.login : null },
								_react2.default.createElement(
									'span',
									{ style: { display: this.state.loading ? "inline" : "none" } },
									_react2.default.createElement('img', { src: '../assets/images/spinner-purple.svg', className: 'rotate', style: { display: "block", width: "20px", height: "20px", marginRight: "auto", marginLeft: "auto" } }),
									_react2.default.createElement(
										'span',
										{ style: { verticalAlgin: "middle" } },
										'Loading'
									)
								),
								_react2.default.createElement(
									'span',
									{ style: { display: this.state.loading ? "none" : "inline" } },
									'login'
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'half' },
							_react2.default.createElement(
								'div',
								{ style: { marginTop: "20px", paddingLeft: "30px" } },
								_react2.default.createElement(
									'div',
									{ className: "invalid-step-line " + (this.state.validEmail ? "hide" : "") },
									_react2.default.createElement(
										'span',
										{ style: { marginRight: "5px" } },
										'\u2717'
									),
									' Invalid email address'
								),
								_react2.default.createElement(
									'div',
									{ className: "step-line " + (this.state.validEmail ? "valid" : "") },
									_react2.default.createElement(
										'span',
										{ style: { marginRight: "5px" } },
										'\u2714'
									),
									' Valid email address'
								),
								_react2.default.createElement(
									'div',
									{ className: "step-line " + (showLogin ? "valid" : "") },
									_react2.default.createElement(
										'span',
										{ style: { marginRight: "5px" } },
										'\u2714'
									),
									' Existing account'
								),
								_react2.default.createElement(
									'div',
									{ className: "step-line " + (showRegister ? "valid" : "") },
									_react2.default.createElement(
										'span',
										{ style: { marginRight: "5px" } },
										'\u2714'
									),
									' Email available'
								),
								_react2.default.createElement(
									'div',
									{ className: "step-line " + (this.state.pwd && this.state.pwd.length >= 6 ? "valid" : "") },
									_react2.default.createElement(
										'span',
										{ style: { marginRight: "5px" } },
										'\u2714'
									),
									' Valid password length'
								),
								_react2.default.createElement(
									'div',
									{ className: "invalid-step-line " + (this.state.pwd && this.state.pwd.length >= 6 ? "hide" : "") },
									_react2.default.createElement(
										'span',
										{ style: { marginRight: "5px" } },
										'\u2717'
									),
									' Password too short'
								)
							)
						)
					)
				)
			);
		}
	}]);

	return RegisterPage;
}(_react2.default.Component);

;

exports.default = RegisterPage;
