'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _users = require('../actions/users');

var _users2 = _interopRequireDefault(_users);

var _auth = require('../services/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RootPageComp = function (_React$Component) {
	_inherits(RootPageComp, _React$Component);

	function RootPageComp(props) {
		_classCallCheck(this, RootPageComp);

		var _this = _possibleConstructorReturn(this, (RootPageComp.__proto__ || Object.getPrototypeOf(RootPageComp)).call(this, props));

		_this.getPotentialMapToAdd = _this.getPotentialMapToAdd.bind(_this);
		_this.state = {};
		return _this;
	}

	_createClass(RootPageComp, [{
		key: 'getPotentialMapToAdd',
		value: function getPotentialMapToAdd(uid) {
			try {
				var mid = sessionStorage.getItem('classToJoin');
				var inviteToUse = sessionStorage.getItem('inviteToUse');
				if (mid && inviteToUse) {
					sessionStorage.removeItem('classToJoin');
					sessionStorage.removeItem('inviteToUse');
					firebase.database().ref(inviteToUse).set(true);
					firebase.database().ref('maps/' + mid + "/users/" + uid).set("placeholder");
					return mid;
				}
			} catch (e) {
				return null;
			}
			return null;
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			//Firebase auth event callback
			firebase.auth().onAuthStateChanged(function (user) {
				//Valid token
				if (user) {
					//No state user
					if (!_this2.props.user) {
						//Check login case
						_this2.setState({ uid: user.uid });
						firebase.database().ref('users/' + user.uid).on("value", function (snap) {
							var fetchedUser = new _user2.default(snap.val());
							if (snap && snap.val() && fetchedUser) {
								//Set email for search
								_auth2.default.uploadEmail(user.uid, fetchedUser.email);
								if (fetchedUser.email !== user.email) user.updateEmail(fetchedUser.email);

								_this2.props.replaceUser(fetchedUser);
								if (_reactRouter.browserHistory.getCurrentLocation().pathname == "/") _reactRouter.browserHistory.push('/maps');
							} else {
								//Fallback on register
								var joinMap = _this2.getPotentialMapToAdd(user.uid);
								_auth2.default.createUser(user.uid, user.email, joinMap, function (createdUser) {
									_this2.props.replaceUser(createdUser);
									_reactRouter.browserHistory.push('/maps');
								});
							}
						});
					}
					//No token
				} else {
					//Remove user from state
					if (_this2.props.user) {
						firebase.database().ref('users/' + _this2.state.uid).off();
						_this2.props.replaceUser(null);
						_reactRouter.browserHistory.push('/');
					}
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'root-page', style: { height: "100%" } },
				this.props.children
			);
		}
	}]);

	return RootPageComp;
}(_react2.default.Component);

;

var mapStateToProps = function mapStateToProps(state) {
	return {
		user: state.user
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		replaceUser: function replaceUser(user) {
			dispatch((0, _users2.default)(user));
		}
	};
};

var RootPage = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RootPageComp);

exports.default = RootPage;
