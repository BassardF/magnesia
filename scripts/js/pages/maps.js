'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _maps = require('../actions/maps');

var _users = require('../actions/users');

var _users2 = _interopRequireDefault(_users);

var _auth = require('../services/auth');

var _auth2 = _interopRequireDefault(_auth);

var _map = require('../models/map');

var _map2 = _interopRequireDefault(_map);

var _plans = require('./plans');

var _plans2 = _interopRequireDefault(_plans);

var _mapblock = require('./dumbs/mapblock');

var _mapblock2 = _interopRequireDefault(_mapblock);

var _mapdetails = require('./dumbs/mapdetails');

var _mapdetails2 = _interopRequireDefault(_mapdetails);

var _manageusers = require('./dumbs/manageusers');

var _invite = require('./dumbs/invite');

var _invite2 = _interopRequireDefault(_invite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapsPageComp = function (_React$Component) {
	_inherits(MapsPageComp, _React$Component);

	function MapsPageComp(props) {
		_classCallCheck(this, MapsPageComp);

		var _this = _possibleConstructorReturn(this, (MapsPageComp.__proto__ || Object.getPrototypeOf(MapsPageComp)).call(this, props));

		_this.refreshMaps = _this.refreshMaps.bind(_this);
		_this.createMap = _this.createMap.bind(_this);
		_this.selectMap = _this.selectMap.bind(_this);
		_this.promptChangeTitle = _this.promptChangeTitle.bind(_this);
		_this.promptLeaveMap = _this.promptLeaveMap.bind(_this);
		_this.leaveMap = _this.leaveMap.bind(_this);
		_this.toggleManageUsers = _this.toggleManageUsers.bind(_this);
		_this.fetchInvites = _this.fetchInvites.bind(_this);
		_this.validateInvite = _this.validateInvite.bind(_this);
		_this.cancelInvite = _this.cancelInvite.bind(_this);
		_this.changeName = _this.changeName.bind(_this);
		_this.openPlansModal = _this.openPlansModal.bind(_this);
		_this.hidePlansModal = _this.hidePlansModal.bind(_this);

		_this.state = {
			selected: 0,
			invites: [],
			selectedMap: null,
			manageUsers: false
		};
		return _this;
	}

	_createClass(MapsPageComp, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			document.title = "Maps";
			this.props.replaceMaps([]);
			this.refreshMaps(function () {
				_this2.selectMap(0, true);
				if (_this2.props.user && _this2.props.user.name == "placeholder") {
					_this2.changeName(true, _this2.props.user.name);
				}
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			new Tippy('.tippymaps', {
				position: 'bottom',
				animation: 'shift',
				duration: 200,
				arrow: true
			});
		}
	}, {
		key: 'componentWillUnMount',
		value: function componentWillUnMount() {
			this.removeCurrentOn();
		}
	}, {
		key: 'changeName',
		value: function changeName(newName, current) {
			var _this3 = this;

			var title = "Change your name";
			var text = "Your current name is " + current;
			if (newName) {
				title = "Choose a name";
				text = "It will be useful for collaborative work !";
			}

			swal({
				title: title,
				text: text,
				type: "input",
				showCancelButton: true,
				closeOnConfirm: false,
				closeOnCancel: false,
				animation: "slide-from-top",
				inputPlaceholder: "Name"
			}, function (inputValue) {
				if (inputValue === false) {
					swal("Name not set", "Your current name is 'placeholder'. You can click on your name on the topbar to modify it.", "warning");
				} else if (inputValue === "") {
					swal.showInputError("Please enter a name");
					return false;
				} else {
					var usr = _this3.props.user;
					usr.changeName(_auth2.default.getUid(), inputValue);
					swal("Nice!", "Your name has been changed", "success");
				}
			});
		}
	}, {
		key: 'validateInvite',
		value: function validateInvite(ind) {
			var _this4 = this;

			var usr = this.props.user;
			var mid = this.state.invites[ind].mid;
			usr.acceptInvite(mid, _auth2.default.getUid());
			var invites = this.state.invites;
			invites.splice(ind, 1);

			firebase.database().ref('maps/' + mid).once("value", function (snap) {
				if (snap && snap.val()) {
					_this4.props.addMap(new _map2.default(snap.val()));
				}
				_this4.setState({
					invites: invites
				});
			});
		}
	}, {
		key: 'cancelInvite',
		value: function cancelInvite(ind) {
			var usr = this.props.user;
			usr.cancelInvite(this.state.invites[ind].mid, _auth2.default.getUid());
			var invites = this.state.invites;
			invites.splice(ind, 1);
			this.setState({
				invites: invites
			});
		}
	}, {
		key: 'fetchInvites',
		value: function fetchInvites() {
			var _this5 = this;

			if (this.props.user && this.props.user.invites) {
				for (var mid in this.props.user.invites) {
					if (!this.props.user.invites[mid].answer) {
						firebase.database().ref('maps/' + mid + '/title').once("value", function (titlesnap) {
							var title = titlesnap.val();
							var invites = _this5.state.invites;
							invites.push({
								mid: mid,
								title: title
							});
							_this5.setState({
								invites: invites
							});
						});
					}
				}
			}
		}
	}, {
		key: 'toggleManageUsers',
		value: function toggleManageUsers() {
			this.setState({
				manageUsers: !this.state.manageUsers
			});
		}
	}, {
		key: 'logout',
		value: function logout() {
			_auth2.default.logout();
		}
	}, {
		key: 'removeCurrentOn',
		value: function removeCurrentOn() {
			if (this.props.maps && this.props.maps[this.state.selected]) {
				var mid = this.props.maps[this.state.selected].mid;
				firebase.database().ref('maps/' + mid).off();
			}
		}
	}, {
		key: 'selectMap',
		value: function selectMap(ind, force) {
			var _this6 = this;

			if (ind !== this.state.selected || force) {
				var map = this.props.maps[ind];
				if (!map && this.props.user && this.props.user.maps) {
					var keys = Object.keys(this.props.user.maps);
					var mid = keys[ind];
				} else if (map) {
					var mid = map.mid;
				} else return;

				this.removeCurrentOn();
				firebase.database().ref('maps/' + mid).on("value", function (snap) {
					var bod = snap.val();
					if (snap && bod && bod.users && bod.users[_auth2.default.getUid()]) {
						var newMp = new _map2.default(bod);
						var mps = _this6.props.maps;
						mps[ind] = newMp;
						_this6.props.replaceMaps(mps);
					} else {
						_this6.removeCurrentOn();
						var mps = _this6.props.maps;
						mps.splice(ind, 1);
						_this6.props.replaceMaps(mps);
						if (mps.length) _this6.selectMap(0, true);
					}
					_this6.forceUpdate();
				});

				this.setState({
					selected: ind,
					manageUsers: false
				});
			}
		}
	}, {
		key: 'refreshMaps',
		value: function refreshMaps(callback) {
			if (this.props.user && this.props.user.maps) {
				var keysCount = Object.keys(this.props.user.maps).length;
				var count = 0;
				for (var mid in this.props.user.maps) {
					(function (mid) {
						var _this7 = this;

						firebase.database().ref('maps/' + mid).once("value", function (snap) {
							if (snap && snap.val()) {
								_this7.props.addMap(new _map2.default(snap.val()));
							}
							count++;
							if (count == keysCount && callback) {
								callback();
							}
						});
					}).bind(this)(mid);
				}
			}
		}
	}, {
		key: 'createMap',
		value: function createMap() {
			var _this8 = this;

			var creationTimestamp = new Date().getTime();
			var newMap = new _map2.default().initEmpty(_auth2.default.getUid(), creationTimestamp, this.props.user.name);
			//Uploading our new Map
			var newMapRef = firebase.database().ref('maps').push();
			var newMapkey = newMapRef.key;
			newMap.mid = newMapkey;
			newMapRef.set(newMap, function (error) {
				if (!error) {
					var mapArray = _this8.props.maps ? _this8.props.maps.concat(newMap) : [newMap];
					_this8.props.replaceMaps(mapArray);
					//Adding the Map to the user
					firebase.database().ref('users/' + _auth2.default.getUid() + '/maps/' + newMapkey).set(creationTimestamp, function (error2) {
						if (!error2) {
							if (!_this8.props.user.maps) _this8.props.user.maps = {};
							_this8.props.user.maps[newMapkey] = creationTimestamp;
							_this8.selectMap(mapArray.length - 1, true);
						}
					});
				}
			});
		}
	}, {
		key: 'goToMap',
		value: function goToMap(mid) {
			this.removeCurrentOn();
			_reactRouter.browserHistory.push('/map/' + mid);
		}
	}, {
		key: 'changeCurrentMapTitle',
		value: function changeCurrentMapTitle(title) {
			var selectedMap = this.props.maps[this.state.selected];
			selectedMap.changeTitle(title);
		}
	}, {
		key: 'promptChangeTitle',
		value: function promptChangeTitle() {
			var selectedMap = this.props.maps[this.state.selected];
			swal({
				title: "Change title",
				text: "Choose a new title for '" + selectedMap.title + "'",
				type: "input",
				showCancelButton: true,
				closeOnConfirm: false,
				inputPlaceholder: "title"
			}, function (inputValue) {
				if (inputValue === false) return false;

				if (inputValue === "") {
					swal.showInputError("Choose a new title!");
					return false;
				}
				this.changeCurrentMapTitle(inputValue);
				swal("Title changed!", "New title: " + inputValue, "success");
			}.bind(this));
		}
	}, {
		key: 'leaveMap',
		value: function leaveMap() {
			var selectedMap = this.props.maps[this.state.selected];
			selectedMap.leave(_auth2.default.getUid());
		}
	}, {
		key: 'promptLeaveMap',
		value: function promptLeaveMap() {
			swal({
				title: "Are you sure?",
				text: "Would you like to leave this map?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "Yes!",
				closeOnConfirm: false
			}, function () {
				swal("Done", "You have just left the map!", "success");
				this.leaveMap();
			}.bind(this));
		}
	}, {
		key: 'openPlansModal',
		value: function openPlansModal() {
			this.setState({
				showPlansModal: true
			});
		}
	}, {
		key: 'hidePlansModal',
		value: function hidePlansModal() {
			this.setState({
				showPlansModal: false
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var maps = [],
			    invitesDom = [],
			    pendingInvites = 0;
			if (this.props.user && this.props.user.invites) {
				for (var mid in this.props.user.invites) {
					if (!this.props.user.invites[mid].answer) pendingInvites++;
				}
			}
			for (var i = 0; i < this.props.maps.length + 1; i++) {
				maps.push(_react2.default.createElement(_mapblock2.default, {
					key: "map-block-" + i,
					map: this.props.maps[i],
					selected: this.state.selected == i,
					selectMap: this.selectMap.bind(this, i),
					goToMap: this.props.maps[i] ? this.goToMap.bind(this, this.props.maps[i].mid) : null,
					createMap: this.createMap }));
			}
			var selectedMap = this.props.maps[this.state.selected],
			    rightSide = null;
			if (selectedMap) {
				rightSide = _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ style: { display: this.state.manageUsers ? "block" : "none" } },
						_react2.default.createElement(_manageusers.ManageUsers, {
							map: selectedMap, promptChangeTitle: this.promptChangeTitle,
							toggleManageUsers: this.toggleManageUsers,
							user: this.props.user })
					),
					_react2.default.createElement(
						'div',
						{ style: { display: this.state.manageUsers ? "none" : "block" } },
						_react2.default.createElement(_mapdetails2.default, {
							goToMap: this.goToMap.bind(this, selectedMap.mid),
							map: selectedMap, promptChangeTitle: this.promptChangeTitle,
							leaveMap: this.promptLeaveMap, toggleManageUsers: this.toggleManageUsers })
					)
				);
			} else {
				rightSide = _react2.default.createElement(
					'div',
					{ onClick: this.createMap, style: { textAlign: "center" } },
					_react2.default.createElement(
						'div',
						{ style: { marginTop: "20px", fontSize: "30px" } },
						'Create your first Mind Map'
					),
					_react2.default.createElement('img', { className: 'first-map-img', src: '../assets/images/newmap.svg', style: { display: "block", marginLeft: "auto", marginRight: "auto" } })
				);
			}

			if (this.state.invites) {
				for (var i = 0; i < this.state.invites.length; i++) {
					invitesDom.push(_react2.default.createElement(_invite2.default, { key: "invite-key-" + i, cancel: this.cancelInvite.bind(this, i), validate: this.validateInvite.bind(this, i), invite: this.state.invites[i] }));
				}
			}
			var subSpace = window.innerHeight - 103;
			var plan = this.props.user ? this.props.user.getPlan() : "Starter";

			return _react2.default.createElement(
				'div',
				{ id: 'maps-page' },
				_react2.default.createElement(_plans2.default, { user: this.props.user, hideModal: this.hidePlansModal, show: this.state.showPlansModal }),
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
						),
						_react2.default.createElement(
							'div',
							{ style: { float: "right", marginRight: "20px", marginTop: "-45px" } },
							_react2.default.createElement(
								'div',
								{ title: 'change name', className: 'tippymaps purple-unerlined-hover', style: { fontSize: "14px", cursor: "pointer", display: "inline-block", marginRight: "20px" }, onClick: this.props.user ? this.changeName.bind(this, false, this.props.user.name) : null },
								this.props.user ? this.props.user.name : "John Doe"
							),
							_react2.default.createElement(
								'div',
								{ title: 'manage plan', className: 'tippymaps purple-unerlined-hover purple', style: { fontSize: "14px", display: "inline-block", cursor: "pointer", marginRight: "20px" }, onClick: this.openPlansModal },
								plan
							),
							_react2.default.createElement(
								'div',
								{ className: 'purple-unerlined-hover', style: { fontSize: "14px", display: "inline-block", cursor: "pointer" }, onClick: this.logout },
								'Logout'
							)
						)
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ className: 'flex' },
							_react2.default.createElement(
								'div',
								{ style: { width: "200px", paddingLeft: "20px", paddingRight: "20px", height: subSpace, overflow: "auto" }, className: 'flex-grow-0' },
								_react2.default.createElement(
									'div',
									{ onClick: this.fetchInvites, className: 'pending-invites-cta', style: { display: pendingInvites && !this.state.invites.length ? "block" : "none" } },
									pendingInvites,
									' pending invitation',
									pendingInvites > 1 ? "s" : ""
								),
								invitesDom,
								maps
							),
							_react2.default.createElement(
								'div',
								{ style: { paddingLeft: "20px", paddingRight: "20px", height: subSpace, overflow: "auto" }, className: 'flex-grow-1' },
								rightSide
							)
						)
					)
				)
			);
		}
	}]);

	return MapsPageComp;
}(_react2.default.Component);

;

var mapStateToProps = function mapStateToProps(state) {
	return {
		user: state.user,
		maps: state.maps
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		replaceMaps: function replaceMaps(maps) {
			dispatch((0, _maps.replaceMaps)(maps));
		},
		addMap: function addMap(map) {
			dispatch((0, _maps.addMap)(map));
		},
		replaceUser: function replaceUser(user) {
			dispatch((0, _users2.default)(user));
		}
	};
};

var MapsPage = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MapsPageComp);

exports.default = MapsPage;
