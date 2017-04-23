'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _auth = require('../services/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapPageComp = function (_React$Component) {
	_inherits(MapPageComp, _React$Component);

	function MapPageComp(props) {
		_classCallCheck(this, MapPageComp);

		var _this = _possibleConstructorReturn(this, (MapPageComp.__proto__ || Object.getPrototypeOf(MapPageComp)).call(this, props));

		_this.selectNode = _this.selectNode.bind(_this);
		_this.addNewNode = _this.addNewNode.bind(_this);
		_this.draw = _this.draw.bind(_this);
		_this.drawNodes = _this.drawNodes.bind(_this);
		_this.drawLinks = _this.drawLinks.bind(_this);
		_this.selectLink = _this.selectLink.bind(_this);
		_this.changeNodeText = _this.changeNodeText.bind(_this);
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
						if (snap && snap.val()) {
							if (!_this2.state.map) _this2.setState({ map: new _map2.default(snap.val()) });else {
								var map = _this2.state.map;
								map.upgradeFromServer(snap.val());
								_this2.setState({ map: map });
							}
						}
					});
				}
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this3 = this;

			document.body.onkeydown = function (e) {
				if (e.keyCode == 8) {
					_this3.deleteSelectedNode();
				}
			};
		}
	}, {
		key: 'deleteSelectedNode',
		value: function deleteSelectedNode() {
			if (this.state.selectedNode) {
				this.state.map.deleteNode(this.state.selectedNode);
				this.selectNode(null);
			} else if (this.state.selectedNode !== null) {
				alert("Root node can't be deleted");
			}
		}
	}, {
		key: 'componentWillUnMount',
		value: function componentWillUnMount() {
			if (this.state.mapRef) mapRef.off();
		}
	}, {
		key: 'selectNode',
		value: function selectNode(nid) {
			this.setState({
				selectedNode: this.state.selectedNode === nid ? null : nid,
				selectedLink: this.state.selectedNode === nid ? this.state.selectedLink : null
			});
		}
	}, {
		key: 'selectLink',
		value: function selectLink(link) {
			var id = Object.keys(link.nodes).join("");
			this.setState({
				selectedLink: this.state.selectedLink === id ? null : id,
				selectedNode: this.state.selectedLink === id ? this.state.selectedNode : null
			});
		}
	}, {
		key: 'addNewNode',
		value: function addNewNode(x, y) {
			var map = this.state.map;
			map.addNewNode(_auth2.default.getUid(), x, y, this.state.selectedNode);
			map.save();
		}
	}, {
		key: 'changeNodeText',
		value: function changeNodeText(nid, text) {
			var map = this.state.map;
			var node = map.nodes[nid];
			node.title = text || "------";
			node.save();
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this4 = this;

			if (this.state.map) {
				var svg = d3.select("svg"),
				    width = svg.property("width"),
				    height = svg.property("height");

				if (this.state.map.links) this.drawLinks(svg, width, height);

				if (this.state.map.nodes) this.drawNodes(svg, width, height);

				svg.on("dblclick", function (d) {
					if (!d3.event.defaultPrevented) {
						_this4.addNewNode(d3.event.x - 200 - width.animVal.value / 2, d3.event.y - 58 - height.animVal.value / 2);
					}
				});
			}
		}
	}, {
		key: 'drawNodes',
		value: function drawNodes(svg, width, height) {
			var _this5 = this;

			var gs = svg.select("g#nodes").selectAll("g.node").data(this.state.map.nodes, function (d, ind) {
				return d;
			});

			//Exit
			gs.exit().remove();

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "node");

			elemtEnter.append("circle").attr("r", function (d, i) {
				return 40 * (d.scale ? +d.scale : 1);
			}).attr("stroke", function (d, i) {
				return _drawing2.default.defaultCircleStrokeColor;
			}).attr("stroke-width", function (d, i) {
				return _drawing2.default.defaultCircleStrokeWidth;
			}).attr("fill", "white").merge(gs.selectAll("circle")).attr("cy", function (d, i) {
				return height.animVal.value / 2 + (d.y ? +d.y : 0);
			}).attr("cx", function (d, i) {
				return width.animVal.value / 2 + (d.x ? +d.x : 0);
			}).attr("stroke", function (d, i) {
				return d.nid == _this5.state.selectedNode ? _drawing2.default.selectedCircleStrokeColor : _drawing2.default.defaultCircleStrokeColor;
			}).attr("stroke-width", function (d, i) {
				return d.nid == _this5.state.selectedNode ? _drawing2.default.selectedCircleStrokeWidth : _drawing2.default.defaultCircleStrokeWidth;
			});

			elemtEnter.append("text").attr("color", _drawing2.default.defaultTextColor).attr("text-anchor", "middle").attr("class", "noselect").merge(gs.selectAll("text")).attr("dx", function (d, i) {
				return width.animVal.value / 2 + (d.x ? +d.x : 0);
			}).attr("dy", function (d, i) {
				return height.animVal.value / 2 + (d.y ? +d.y : 0) + 5;
			}).text(function (d, i) {
				return d.title;
			});

			//Actions
			svg.selectAll("g.node text").call(this.makeEditable, "tmp", this);

			svg.selectAll("g.node").on("click", function (d) {
				if (!d3.event.defaultPrevented) {
					d3.event.preventDefault();
					if (d && _typeof(d.nid) !== undefined) _this5.selectNode(d.nid);
				}
			}).on("dblclick", function (d) {
				if (!d3.event.defaultPrevented) {
					d3.event.preventDefault();
				}
			}).call(d3.drag().on("drag", function (d) {
				d.active = true;
				var imap = _this5.state.map;
				var r = 40 * (d.scale ? +d.scale : 1);
				imap.changeNodeLocation(d.nid, d3.event.x, d3.event.y);
				_this5.setState({
					map: imap
				});
			}).on("end", function (d) {
				if (d.active) {
					var imap = _this5.state.map;
					d.active = false;
					var r = 40 * (d.scale ? +d.scale : 1);
					imap.changeNodeLocation(d.nid, d3.event.x, d3.event.y);
					imap.save();
				}
			}));
		}
	}, {
		key: 'drawLinks',
		value: function drawLinks(svg, width, height) {
			var _this6 = this;

			var gs = svg.select("g#links").selectAll("g.link").data(this.state.map.links, function (d) {
				return d;
			});

			//Exit
			gs.exit().remove();

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "link");

			elemtEnter.append("line").attr("stroke-width", function (d, i) {
				return _drawing2.default.defaultCircleStrokeWidth;
			}).merge(gs.selectAll("line")).attr("stroke", function (d, i) {
				var id = Object.keys(d.nodes).join("");
				var selected = _this6.state.selectedLink && id == _this6.state.selectedLink;
				return selected ? _drawing2.default.selectedCircleStrokeColor : _drawing2.default.defaultCircleStrokeColor;
			}).attr("x1", function (d, i) {
				var origin = _this6.state.map.nodes[Object.keys(d.nodes)[0]];
				return width.animVal.value / 2 + (origin.x ? +origin.x : 0);
			}).attr("y1", function (d, i) {
				var origin = _this6.state.map.nodes[Object.keys(d.nodes)[0]];
				return height.animVal.value / 2 + (origin.y ? +origin.y : 0);
			}).attr("x2", function (d, i) {
				var destination = _this6.state.map.nodes[Object.keys(d.nodes)[1]];
				return width.animVal.value / 2 + (destination.x ? +destination.x : 0);
			}).attr("y2", function (d, i) {
				var destination = _this6.state.map.nodes[Object.keys(d.nodes)[1]];
				return height.animVal.value / 2 + (destination.y ? +destination.y : 0);
			});

			svg.selectAll("g.link").on("click", function (d) {
				d3.event.preventDefault();
				if (d && _typeof(d.nid) !== undefined && d.nodes) _this6.selectLink(d);
			});
		}
	}, {
		key: 'makeEditable',
		value: function makeEditable(d, field, thisRef) {
			d.on("mouseover", function () {
				d3.select(this).style("fill", "#c380ac").style("cursor", "pointer");
			}).on("mouseout", function () {
				d3.select(this).style("fill", null);
			}).on("click", function (d) {

				d3.event.preventDefault();

				var p = this.parentNode;
				var xy = this.getBBox();
				var p_xy = p.getBBox();

				var svg = d3.select("svg"),
				    width = svg.property("width"),
				    height = svg.property("height");

				var r = 40 * (d.scale ? +d.scale : 1);
				xy.x = width.animVal.value / 2 + (d.x ? +d.x : 0) - r + 5;
				xy.y = height.animVal.value / 2 + (d.y ? +d.y : 0) - 10;

				var el = d3.select(this);
				var p_el = d3.select(p);

				var frm = p_el.append("foreignObject");

				var inp = frm.attr("x", xy.x).attr("y", xy.y).attr("width", r * 2 - 10).attr("height", 25).append("xhtml:form").append("input").attr("class", "node-text-input").attr("value", function () {
					// nasty spot to place this call, but here we are sure that the <input> tag is available
					// and is handily pointed at by 'this':
					this.focus();
					return d[field];
				}).attr("style", "width: " + (r * 2 - 10) + "px;")
				// make the form go away when you jump out (form looses focus) or hit ENTER:
				.on("blur", function () {

					var txt = inp.node().value;
					d[field] = txt;
					el.text(function (d) {
						return d[field];
					});

					// Note to self: frm.remove() will remove the entire <g> group! Remember the D3 selection logic!
					p_el.select("foreignObject").remove();

					thisRef.changeNodeText(d.nid, txt);
				}).on("keypress", function () {
					// IE fix
					if (!d3.event) d3.event = window.event;

					var e = d3.event;
					if (e.keyCode == 13) {
						if (typeof e.cancelBubble !== 'undefined') // IE
							e.cancelBubble = true;
						if (e.stopPropagation) e.stopPropagation();
						e.preventDefault();

						var txt = inp.node().value;

						d[field] = txt;
						el.text(function (d) {
							return d[field];
						});

						thisRef.changeNodeText(d.nid, txt);
						// odd. Should work in Safari, but the debugger crashes on this instead.
						// Anyway, it SHOULD be here and it doesn't hurt otherwise.
						try {
							p_el.select("foreignObject").remove();
						} catch (e) {}
					}
				});
			});
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
							{ id: 'nav-panel-wrapper', style: { width: "200px" }, className: 'flex-grow-0' },
							_react2.default.createElement(_navigationpanel2.default, { map: this.state.map, selectedNode: this.state.selectedNode, selectNode: this.selectNode })
						),
						_react2.default.createElement(
							'div',
							{ id: 'drawing-wrapper', className: 'flex-grow-1' },
							_react2.default.createElement(
								'svg',
								{ style: { height: space + 'px', width: '100%' } },
								_react2.default.createElement('g', { id: 'links' }),
								_react2.default.createElement('g', { id: 'nodes' })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'flex-grow-0' },
							_react2.default.createElement(_toolspanel2.default, { map: this.state.map, selectedNode: this.state.selectedNode })
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
