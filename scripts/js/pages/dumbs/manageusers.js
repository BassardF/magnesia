'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.InnerManageUser = exports.ManageUsers = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _auth = require('../../services/auth');

var _auth2 = _interopRequireDefault(_auth);

var _encode = require('../../services/encode');

var _encode2 = _interopRequireDefault(_encode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ManageUsers = exports.ManageUsers = function (_React$Component) {
	_inherits(ManageUsers, _React$Component);

	function ManageUsers(props) {
		_classCallCheck(this, ManageUsers);

		var _this = _possibleConstructorReturn(this, (ManageUsers.__proto__ || Object.getPrototypeOf(ManageUsers)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(ManageUsers, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'map-details' },
				_react2.default.createElement(
					'div',
					{ id: 'map-details-title', onClick: this.props.promptChangeTitle },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'span',
							{ id: 'map-details-title-content' },
							this.props.map.title
						)
					),
					_react2.default.createElement(
						'div',
						{ style: { marginTop: "7px" } },
						_react2.default.createElement(
							'span',
							{ id: 'map-details-title-sub' },
							_react2.default.createElement('img', { style: { verticalAlign: "middle", width: "10px", marginRight: "5px" }, src: '../assets/images/edit.svg' }),
							_react2.default.createElement(
								'span',
								{ style: { verticalAlign: "middle" } },
								'edit'
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ style: { maxWidth: "500px", marginRight: "auto", marginLeft: "auto" } },
					_react2.default.createElement(
						'div',
						{ style: { fontSize: "14px", height: "20px" } },
						_react2.default.createElement(
							'div',
							{ onClick: this.props.toggleManageUsers, className: 'purple-unerlined-hover', style: { cursor: "pointer", display: "inline-block", marginLeft: "10px", float: "right" } },
							_react2.default.createElement('img', { className: 'rotate-180', style: { verticalAlign: "middle", width: "10px", marginRight: "5px" }, src: '../assets/images/arrow-right.svg' }),
							_react2.default.createElement(
								'span',
								{ style: { verticalAlign: "middle" } },
								'back to my maps'
							)
						)
					)
				),
				_react2.default.createElement(InnerManageUser, { map: this.props.map, user: this.props.user })
			);
		}
	}]);

	return ManageUsers;
}(_react2.default.Component);

;

var InnerManageUser = exports.InnerManageUser = function (_React$Component2) {
	_inherits(InnerManageUser, _React$Component2);

	function InnerManageUser(props) {
		_classCallCheck(this, InnerManageUser);

		var _this2 = _possibleConstructorReturn(this, (InnerManageUser.__proto__ || Object.getPrototypeOf(InnerManageUser)).call(this, props));

		_this2.changeSearch = _this2.changeSearch.bind(_this2);
		_this2.inviteUser = _this2.inviteUser.bind(_this2);
		_this2.inviteExternalUser = _this2.inviteExternalUser.bind(_this2);
		_this2.isInvited = _this2.isInvited.bind(_this2);

		_this2.state = {
			search: "",
			results: [],
			loading: false
		};
		return _this2;
	}

	_createClass(InnerManageUser, [{
		key: 'inviteExternalUser',
		value: function inviteExternalUser(email) {
			var map = this.props.map;
			map.externalInvite(email, _auth2.default.getUid());
			var mid = map.mid,
			    title = map.title,
			    name = this.props.user ? this.props.user.name : '';

			var url = "https://hooks.zapier.com/hooks/catch/1087623/91dvog/";
			var params = "email=" + email + "&title=" + title + "&mid=" + mid + "&name=" + name;
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(params);
		}
	}, {
		key: 'inviteUser',
		value: function inviteUser(uid, email) {
			var map = this.props.map;
			map.invite(uid, email, _auth2.default.getUid());
		}
	}, {
		key: 'changeSearch',
		value: function changeSearch(e) {
			var _this3 = this;

			var val = e.target.value;
			var arr = [];

			if (val && val.length >= 3) {
				this.setState({ loading: true });
				firebase.database().ref('emails').orderByKey().startAt(_encode2.default.encode(val)).limitToFirst(10).once("value", function (res) {
					var results = res.val();
					if (results) {
						var map = _this3.props.map;
						for (var email in results) {
							var decoded = _encode2.default.decode(email);
							if (decoded.toLowerCase().indexOf(val.toLowerCase()) === 0) {
								var uid = results[email];
								if ((!map.invites || !map.invites[uid]) && !map.users[uid]) {
									arr.push({
										email: decoded,
										uid: uid
									});
								}
							}
						}
					}
					_this3.setState({
						results: arr,
						loading: false
					});
				});
			}
			this.setState({
				search: val
			});
		}
	}, {
		key: 'isInvited',
		value: function isInvited(email) {
			var map = this.props.map;
			if (map.invites) {
				for (var uid in map.invites) {
					if (map.invites[uid].email == email) return true;
				}
			}
			if (map.externalInvites) {
				for (var i = 0; i < map.externalInvites.length; i++) {
					if (map.externalInvites[i].email == email) return true;
				}
			}
			return false;
		}
	}, {
		key: 'render',
		value: function render() {
			var map = this.props.map;
			var userDom = [],
			    prospectDom = [];

			for (var _uid in map.users) {
				userDom.push(_react2.default.createElement(UserLine, { key: "key-user-selected-line" + _uid, uid: _uid, name: map.users[_uid] }));
			}

			if (map.invites) {
				for (var uid in map.invites) {
					userDom.push(_react2.default.createElement(ProspectLine, { key: "key-prospect-selected-line" + uid, invited: true, uid: uid, name: map.invites[uid].email }));
				}
			}

			if (map.externalInvites) {
				for (var i = 0; i < map.externalInvites.length; i++) {
					if (!map.externalInvites[i].joined) userDom.push(_react2.default.createElement(ProspectLine, { key: "key-external-prospect-selected-line" + i, invited: true, external: true, name: map.externalInvites[i].email }));
				}
			}

			for (var _i = 0; _i < this.state.results.length; _i++) {
				var _uid2 = this.state.results[_i].uid;
				var email = this.state.results[_i].email;
				if (!this.isInvited(email)) {
					userDom.push(_react2.default.createElement(ProspectLine, { key: "key-prospect-result-selected-line" + _uid2, invited: false, uid: _uid2, name: email, inviteUser: this.inviteUser.bind(this, _uid2, email) }));
				}
			}

			var externalInvite = null;
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!this.isInvited(this.state.search) && !this.state.results.length && !this.state.loading && re.test(this.state.search)) {
				externalInvite = _react2.default.createElement(ExternalProspectLine, { key: "key-external-prospect-selected-line", name: this.state.search, inviteUser: this.inviteExternalUser.bind(this, this.state.search) });
			}

			var loadIcon = !this.state.loading ? _react2.default.createElement('img', { style: { verticalAlign: "middle", width: "20px", marginRight: "5px" }, src: '../assets/images/magnifier.svg' }) : _react2.default.createElement('img', { src: '../assets/images/spinner-purple.svg', className: 'rotate', style: { verticalAlign: "middle", width: "20px", height: "20px", marginRight: "5px" } });

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ className: 'search-user-input-wrapper', style: { maxWidth: "280px", marginTop: "30px", marginRight: "auto", marginLeft: "auto" } },
					loadIcon,
					_react2.default.createElement('input', { value: this.state.value, onChange: this.changeSearch, placeholder: 'email address', style: { verticalAlign: "middle", width: "250px", fontSize: "17px", border: "none", outline: "none" } })
				),
				_react2.default.createElement(
					'div',
					{ style: { display: this.state.search.length && this.isInvited(this.state.search) ? "block" : "none", marginTop: "30px", maxWidth: "500px", marginRight: "auto", marginLeft: "auto", textAlign: "center" } },
					'User already invited'
				),
				_react2.default.createElement(
					'div',
					{ style: { marginTop: "30px", maxWidth: "500px", marginRight: "auto", marginLeft: "auto" } },
					userDom
				),
				_react2.default.createElement(
					'div',
					{ style: { marginTop: "30px", maxWidth: "500px", marginRight: "auto", marginLeft: "auto" } },
					prospectDom
				),
				_react2.default.createElement(
					'div',
					{ style: { marginTop: "30px", maxWidth: "500px", marginRight: "auto", marginLeft: "auto" } },
					externalInvite
				)
			);
		}
	}]);

	return InnerManageUser;
}(_react2.default.Component);

;

var UserLine = function (_React$Component3) {
	_inherits(UserLine, _React$Component3);

	function UserLine() {
		_classCallCheck(this, UserLine);

		return _possibleConstructorReturn(this, (UserLine.__proto__ || Object.getPrototypeOf(UserLine)).apply(this, arguments));
	}

	_createClass(UserLine, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'selected-user-line' },
				_react2.default.createElement(
					'div',
					{ className: 'flex' },
					_react2.default.createElement(
						'div',
						{ className: 'flex-grow-1' },
						this.props.name
					),
					_react2.default.createElement(
						'div',
						{ style: { textAlign: "right" }, className: 'flex-grow-1 purple' },
						'\u2713 joined'
					)
				)
			);
		}
	}]);

	return UserLine;
}(_react2.default.Component);

;

var ProspectLine = function (_React$Component4) {
	_inherits(ProspectLine, _React$Component4);

	function ProspectLine() {
		_classCallCheck(this, ProspectLine);

		return _possibleConstructorReturn(this, (ProspectLine.__proto__ || Object.getPrototypeOf(ProspectLine)).apply(this, arguments));
	}

	_createClass(ProspectLine, [{
		key: 'render',
		value: function render() {

			var rs = this.props.invited ? _react2.default.createElement(
				'div',
				{ style: { textAlign: "right" }, className: 'flex-grow-1 purple' },
				'\u2713 invited ',
				this.props.external ? " to Mg." : ""
			) : _react2.default.createElement(
				'span',
				{ className: 'invite-user-button', onClick: this.props.inviteUser || null },
				_react2.default.createElement('img', { className: 'hide-hover', style: { verticalAlign: "middle", width: "10px", marginRight: "5px" }, src: '../assets/images/invite-purple.svg' }),
				_react2.default.createElement('img', { className: 'show-hover', style: { verticalAlign: "middle", width: "10px", marginRight: "5px" }, src: '../assets/images/invite-grey.svg' }),
				'invite'
			);

			return _react2.default.createElement(
				'div',
				{ className: 'selected-user-line' },
				_react2.default.createElement(
					'div',
					{ className: 'flex' },
					_react2.default.createElement(
						'div',
						{ className: 'flex-grow-1' },
						this.props.name
					),
					_react2.default.createElement(
						'div',
						{ style: { textAlign: "right" }, className: 'flex-grow-1 purple' },
						rs
					)
				)
			);
		}
	}]);

	return ProspectLine;
}(_react2.default.Component);

;

var ExternalProspectLine = function (_React$Component5) {
	_inherits(ExternalProspectLine, _React$Component5);

	function ExternalProspectLine() {
		_classCallCheck(this, ExternalProspectLine);

		return _possibleConstructorReturn(this, (ExternalProspectLine.__proto__ || Object.getPrototypeOf(ExternalProspectLine)).apply(this, arguments));
	}

	_createClass(ExternalProspectLine, [{
		key: 'render',
		value: function render() {

			return _react2.default.createElement(
				'div',
				{ className: 'selected-user-line' },
				_react2.default.createElement(
					'div',
					{ className: 'flex' },
					_react2.default.createElement(
						'div',
						{ className: 'flex-grow-1' },
						this.props.name
					),
					_react2.default.createElement(
						'div',
						{ style: { textAlign: "right" }, className: 'flex-grow-1 purple' },
						_react2.default.createElement(
							'span',
							{ className: 'invite-user-button', onClick: this.props.inviteUser || null },
							_react2.default.createElement('img', { className: 'hide-hover', style: { verticalAlign: "middle", width: "10px", marginRight: "5px" }, src: '../assets/images/invite-purple.svg' }),
							_react2.default.createElement('img', { className: 'show-hover', style: { verticalAlign: "middle", width: "10px", marginRight: "5px" }, src: '../assets/images/invite-grey.svg' }),
							'invite to Mg.'
						)
					)
				)
			);
		}
	}]);

	return ExternalProspectLine;
}(_react2.default.Component);

;
