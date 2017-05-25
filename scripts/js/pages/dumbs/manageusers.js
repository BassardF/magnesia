'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _auth = require('../../services/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ManageUsers = function (_React$Component) {
	_inherits(ManageUsers, _React$Component);

	function ManageUsers(props) {
		_classCallCheck(this, ManageUsers);

		var _this = _possibleConstructorReturn(this, (ManageUsers.__proto__ || Object.getPrototypeOf(ManageUsers)).call(this, props));

		_this.changeSearch = _this.changeSearch.bind(_this);
		_this.inviteUser = _this.inviteUser.bind(_this);

		_this.state = {
			search: "",
			results: [],
			loading: false
		};
		return _this;
	}

	_createClass(ManageUsers, [{
		key: 'inviteUser',
		value: function inviteUser(uid, email) {
			var map = this.props.map;
			map.invite(uid, email, _auth2.default.getUid());
		}
	}, {
		key: 'changeSearch',
		value: function changeSearch(e) {
			var _this2 = this;

			var val = e.target.value;
			var arr = [];

			if (val && val.length >= 3) {
				this.setState({ loading: true });
				firebase.database().ref('emails').orderByKey().startAt(val).limitToFirst(10).once("value", function (res) {
					var results = res.val();
					if (results) {
						var map = _this2.props.map;
						for (var email in results) {
							if (email.toLowerCase().indexOf(val.toLowerCase()) === 0) {
								var uid = results[email];
								if ((!map.invites || !map.invites[uid]) && !map.users[uid]) {
									arr.push({
										email: email,
										uid: uid
									});
								}
							}
						}
					}
					_this2.setState({
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
		key: 'render',
		value: function render() {
			var map = this.props.map;

			var userDom = [],
			    invitedDom = [],
			    prospectDom = [];;

			for (var uid in map.users) {
				userDom.push(_react2.default.createElement(UserLine, { key: "key-user-selected-line" + uid, uid: uid, name: map.users[uid] }));
			}

			if (map.invites) {
				for (var uid in map.invites) {
					userDom.push(_react2.default.createElement(ProspectLine, { key: "key-prospect-selected-line" + uid, invited: true, uid: uid, name: map.invites[uid].email }));
				}
			}

			for (var i = 0; i < this.state.results.length; i++) {
				var uid = this.state.results[i].uid;
				var email = this.state.results[i].email;
				var invited = !!(map.invites && map.invites[uid]);
				if (!invited) {
					userDom.push(_react2.default.createElement(ProspectLine, { key: "key-prospect-selected-line" + uid, invited: false, uid: uid, name: email, inviteUser: this.inviteUser.bind(this, uid, email) }));
				}
			}

			var loadIcon = !this.state.loading ? _react2.default.createElement('img', { style: { verticalAlign: "middle", width: "20px", marginRight: "5px" }, src: '../assets/images/magnifier.svg' }) : _react2.default.createElement('img', { src: '../assets/images/spinner-purple.svg', className: 'rotate', style: { verticalAlign: "middle", width: "20px", height: "20px", marginRight: "5px" } });

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
				_react2.default.createElement(
					'div',
					{ className: 'search-user-input-wrapper', style: { maxWidth: "280px", marginTop: "30px", marginRight: "auto", marginLeft: "auto" } },
					loadIcon,
					_react2.default.createElement('input', { value: this.state.value, onChange: this.changeSearch, placeholder: 'email address', style: { verticalAlign: "middle", width: "250px", fontSize: "17px", border: "none", outline: "none" } })
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
				)
			);
		}
	}]);

	return ManageUsers;
}(_react2.default.Component);

;

exports.default = ManageUsers;

var UserLine = function (_React$Component2) {
	_inherits(UserLine, _React$Component2);

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

var ProspectLine = function (_React$Component3) {
	_inherits(ProspectLine, _React$Component3);

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
				'\u2713 invited'
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
						this.props.name.split("_").join(".")
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
