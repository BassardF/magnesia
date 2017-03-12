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
		_this.state = {};
		return _this;
	}

	_createClass(MapsPageComp, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.refreshMaps();
		}
	}, {
		key: 'refreshMaps',
		value: function refreshMaps() {
			var _this2 = this;

			if (this.props.user && this.props.user.maps) {
				for (var mid in this.props.user.maps) {
					firebase.database().ref('maps/' + mid).once("value", function (snap) {
						if (snap && snap.val()) _this2.props.addMap(new _map2.default(snap.val()));
					});
				}
			}
		}
	}, {
		key: 'createMap',
		value: function createMap() {
			var _this3 = this;

			var creationTimestamp = new Date().getTime();
			var newMap = new _map2.default().initEmpty(_auth2.default.getUid(), creationTimestamp, this.props.user.name);
			//Uploading our new Map
			var newMapRef = firebase.database().ref('maps').push();
			var newMapkey = newMapRef.key;
			newMap.mid = newMapkey;
			newMapRef.set(newMap, function (error) {
				if (!error) {
					_this3.props.replaceMaps(_this3.props.maps ? _this3.props.maps.concat(newMap) : [newMap]);
					//Adding the Map to the user
					firebase.database().ref('users/' + _auth2.default.getUid() + '/maps/' + newMapkey).set(creationTimestamp, function (error2) {
						if (!error2) {
							if (!_this3.props.user.maps) _this3.props.user.maps = {};
							_this3.props.user.maps[newMapkey] = creationTimestamp;
							_this3.props.replaceUser(_this3.props.user);
						}
					});
				}
			});
		}
	}, {
		key: 'goToMap',
		value: function goToMap(mid) {
			_reactRouter.browserHistory.push('/map/' + mid);
		}
	}, {
		key: 'render',
		value: function render() {
			var maps = [];
			for (var i = 0; i < this.props.maps.length; i++) {
				maps.push(_react2.default.createElement(
					'div',
					{ onClick: this.goToMap.bind(this, this.props.maps[i].mid), key: "map-line-" + i },
					this.props.maps[i].title
				));
			}
			return _react2.default.createElement(
				'div',
				{ id: 'maps-page' },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h1',
						null,
						'Maps'
					),
					_react2.default.createElement(
						'h2',
						null,
						'Welcome, ',
						this.props.user.name
					),
					maps,
					_react2.default.createElement(
						'button',
						{ onClick: this.createMap },
						'Create map'
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
