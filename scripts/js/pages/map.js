'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _map = require('../models/map');

var _map2 = _interopRequireDefault(_map);

var _navigationpanel = require('./dumbs/navigationpanel');

var _navigationpanel2 = _interopRequireDefault(_navigationpanel);

var _toolspanel = require('./dumbs/toolspanel');

var _toolspanel2 = _interopRequireDefault(_toolspanel);

var _drawing = require('../properties/drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapPageComp = function (_React$Component) {
	_inherits(MapPageComp, _React$Component);

	function MapPageComp(props) {
		_classCallCheck(this, MapPageComp);

		var _this = _possibleConstructorReturn(this, (MapPageComp.__proto__ || Object.getPrototypeOf(MapPageComp)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(MapPageComp, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			var _this2 = this;

			if (this.props.routeParams && this.props.routeParams.mid) {
				var mid = this.props.routeParams.mid;
				if (mid) {
					if (this.state.mapRef) mapRef.off();
					var mapRef = firebase.database().ref('maps/' + mid);
					this.setState({ mapRef: mapRef });
					mapRef.on("value", function (snap) {
						if (snap && snap.val()) _this2.setState({ map: new _map2.default(snap.val()) });
					});
				}
			}
		}
	}, {
		key: 'componentWillUnMount',
		value: function componentWillUnMount() {
			if (this.state.mapRef) mapRef.off();
		}
	}, {
		key: 'draw',
		value: function draw(map) {
			var _this3 = this;

			if (this.state.map && this.state.map.nodes) {

				var svg = d3.select("svg"),
				    width = svg.property("width"),
				    height = svg.property("height");

				var gs = svg.selectAll("g").data([map ? map.nodes : this.state.map.nodes], function (d) {
					return d;
				});

				//Exit
				gs.exit().remove();

				//Enter
				var elemtEnter = gs.enter().append("g");

				elemtEnter.on("click", function (d) {
					console.log("click", d);
				}).call(d3.drag().on("drag", function (d) {
					console.log("drag");
					d.active = true;
					var map = _this3.state.map;
					var r = 40 * (d[0].scale ? +d[0].scale : 1);
					map.changeNodeLocation(d[0].nid, d3.event.x - width.animVal.value / 2, d3.event.y - width.animVal.value / 2 + r);
					_this3.draw(map);
				}).on("end", function (d) {
					if (d.active) {
						console.log("end");
						var map = _this3.state.map;
						d.active = false;
						var r = 40 * (d[0].scale ? +d[0].scale : 1);
						map.changeNodeLocation(d[0].nid, d3.event.x - width.animVal.value / 2, d3.event.y - width.animVal.value / 2 + r);
						_this3.setState({ map: map });
					}
				}));

				elemtEnter.append("circle").attr("cy", function (d, i) {
					return height.animVal.value / 2 + (d[i].y ? +d[i].y : 0);
				}).attr("cx", function (d, i) {
					return width.animVal.value / 2 + (d[i].x ? +d[i].x : 0);
				}).attr("r", function (d, i) {
					return 40 * (d[i].scale ? +d[i].scale : 1);
				}).attr("stroke", function (d, i) {
					return _drawing2.default.defaultCircleStrokeColor;
				}).attr("stroke-width", function (d, i) {
					return _drawing2.default.defaultCircleStrokeWidth;
				}).attr("fill", "white");

				elemtEnter.append("text").attr("dx", function (d, i) {
					return width.animVal.value / 2 + (d[i].x ? +d[i].x : 0);
				}).attr("dy", function (d, i) {
					return height.animVal.value / 2 + (d[i].y ? +d[i].y : 0) + 5;
				}).attr("color", _drawing2.default.defaultTextColor).attr("text-anchor", "middle").text(function (d, i) {
					return d[i].title;
				});

				//Update
				gs.selectAll("circle").attr("cy", function (d, i) {
					return height.animVal.value / 2 + (d[i].y ? +d[i].y : 0);
				}).attr("cx", function (d, i) {
					return width.animVal.value / 2 + (d[i].x ? +d[i].x : 0);
				});

				gs.selectAll("circle").transition().attr("stroke", function (d, i) {
					return d.active ? _drawing2.default.selectedCircleStrokeColor : _drawing2.default.defaultCircleStrokeColor;
				}).attr("stroke-width", function (d, i) {
					return d.active ? _drawing2.default.selectedCircleStrokeWidth : _drawing2.default.defaultCircleStrokeWidth;
				}).duration(70);

				gs.selectAll("text").attr("dx", function (d, i) {
					return width.animVal.value / 2 + (d[i].x ? +d[i].x : 0);
				}).attr("dy", function (d, i) {
					return height.animVal.value / 2 + (d[i].y ? +d[i].y : 0) + 5;
				});
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			this.draw();
		}
	}, {
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate() {
			return true;
		}
	}, {
		key: 'render',
		value: function render() {
			var space = document.body.offsetHeight - document.getElementById("topbar-wrapper").offsetHeight;
			return _react2.default.createElement(
				'div',
				{ id: 'maps-page' },
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ className: 'flex', style: { maxHeight: space } },
						_react2.default.createElement(
							'div',
							{ className: 'flex-grow-0' },
							_react2.default.createElement(_navigationpanel2.default, null)
						),
						_react2.default.createElement(
							'div',
							{ id: 'drawing-wrapper', className: 'flex-grow-1' },
							_react2.default.createElement('svg', { style: { height: space + 'px', width: '100%' } })
						),
						_react2.default.createElement(
							'div',
							{ className: 'flex-grow-0' },
							_react2.default.createElement(_toolspanel2.default, null)
						)
					)
				)
			);
		}
	}]);

	return MapPageComp;
}(_react2.default.Component);

;

var mapStateToProps = function mapStateToProps(state) {
	return {
		user: state.user
	};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		replaceUser: function (_replaceUser) {
			function replaceUser(_x) {
				return _replaceUser.apply(this, arguments);
			}

			replaceUser.toString = function () {
				return _replaceUser.toString();
			};

			return replaceUser;
		}(function (user) {
			dispatch(replaceUser(user));
		})
	};
};

var MapPage = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MapPageComp);

exports.default = MapPage;
