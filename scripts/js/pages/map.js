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

var _leftpanel = require('./dumbs/leftpanel');

var _leftpanel2 = _interopRequireDefault(_leftpanel);

var _advice = require('./dumbs/advice');

var _advice2 = _interopRequireDefault(_advice);

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
		_this.sendMessage = _this.sendMessage.bind(_this);
		_this.resizeSvg = _this.resizeSvg.bind(_this);
		_this.addNewLink = _this.addNewLink.bind(_this);

		_this.changeNodeText = _this.changeNodeText.bind(_this);
		_this.changeNodeDescription = _this.changeNodeDescription.bind(_this);
		_this.changeNodeScale = _this.changeNodeScale.bind(_this);

		_this.deleteSelectedNode = _this.deleteSelectedNode.bind(_this);
		_this.deleteLink = _this.deleteLink.bind(_this);

		_this.changeMode = _this.changeMode.bind(_this);

		_this.state = {
			mode: 1
		};
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
					if (!document.activeElement || document.activeElement.tagName !== "INPUT" || document.activeElement.tagName !== "TEXTAREA") _this3.deleteSelectedNode();
				}
			};
		}
	}, {
		key: 'componentWillUnMount',
		value: function componentWillUnMount() {
			if (this.state.mapRef) mapRef.off();
		}
	}, {
		key: 'changeMode',
		value: function changeMode(mode) {
			this.setState({
				mode: mode
			});
		}
	}, {
		key: 'resizeSvg',
		value: function resizeSvg() {
			var _this4 = this;

			setTimeout(function () {
				_this4.draw();
			}, 0);
		}
	}, {
		key: 'deleteSelectedNode',
		value: function deleteSelectedNode(optionalNid) {
			if (optionalNid !== undefined || this.state.selectedNode !== undefined && this.state.selectedNode !== null) {
				swal({
					title: "Are you sure?",
					text: "Do you want to delete this node?",
					type: "warning",
					showCancelButton: true,
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "Yes!",
					closeOnConfirm: true,
					closeOnCancel: true
				}, function () {
					if (optionalNid || optionalNid === 0) this.state.map.deleteNode(optionalNid);else if (this.state.selectedNode !== null) this.state.map.deleteNode(this.state.selectedNode);
					this.selectNode(null);
				}.bind(this));
			}
		}
	}, {
		key: 'deleteLink',
		value: function deleteLink(l) {
			if (l && this.state.map) this.state.map.deleteLink(l);
		}
	}, {
		key: 'selectNode',
		value: function selectNode(nid, cb) {
			this.setState({
				selectedNode: this.state.selectedNode === nid ? null : nid
			}, function () {
				if (cb) cb();
			});
		}
	}, {
		key: 'selectLink',
		value: function selectLink(link) {
			var id = Object.keys(link.nodes).join("");
			this.setState({
				selectedLink: this.state.selectedLink === id ? null : id
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
		key: 'addNewLink',
		value: function addNewLink(nid1, nid2) {
			if (this.state.map) {
				var map = this.state.map;
				map.addNewLink(_auth2.default.getUid(), nid1, nid2);
				this.setState({
					map: map
				});
			}
		}
	}, {
		key: 'sendMessage',
		value: function sendMessage(msg) {
			var uid = _auth2.default.getUid();
			var name = this.props.user ? this.props.user.name : "John Doe";
			this.state.map.sendMessage(msg, uid, name);
		}
	}, {
		key: 'changeNodeScale',
		value: function changeNodeScale(nid, scale) {
			var map = this.state.map;
			var node = map.nodes[nid];
			node.scale = scale || 1;
			node.save();
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
		key: 'changeNodeDescription',
		value: function changeNodeDescription(nid, description) {
			var map = this.state.map;
			var node = map.nodes[nid];
			node.description = description || "";
			node.save();
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this5 = this;

			if (this.state.map) {
				var svg = d3.select("svg"),
				    width = svg.property("width"),
				    height = svg.property("height");

				if (this.state.map.links) this.drawLinks(svg, width, height);

				if (this.state.map.nodes) this.drawNodes(svg, width, height);

				svg.on("dblclick", function (d) {
					if (!d3.event.defaultPrevented) {
						if (_this5.state.mode === 1) {
							_this5.addNewNode(d3.event.x - document.getElementById("left-panel").offsetWidth - width.animVal.value / 2, d3.event.y - height.animVal.value / 2);
						}
					}
				});
			}
		}
	}, {
		key: 'drawNodes',
		value: function drawNodes(svg, width, height) {
			var _this6 = this;

			var nodes = this.state.map.nodes;
			var gs = svg.select("g#nodes").selectAll("g.node").data(nodes, function (d, ind) {
				return d;
			});

			//Exit
			gs.exit().remove();

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "node");

			elemtEnter.append("circle").attr("stroke", function (d, i) {
				return _drawing2.default.defaultCircleStrokeColor;
			}).attr("stroke-width", function (d, i) {
				return _drawing2.default.defaultCircleStrokeWidth;
			}).attr("fill", "white").style("cursor", "pointer").merge(gs.selectAll("circle")).attr("r", function (d, i) {
				return 40 * (nodes[i].scale ? +nodes[i].scale : 1);
			}).attr("cy", function (d, i) {
				return height.animVal.value / 2 + (nodes[i].y ? +nodes[i].y : 0);
			}).attr("cx", function (d, i) {
				return width.animVal.value / 2 + (nodes[i].x ? +nodes[i].x : 0);
			}).attr("stroke", function (d, i) {
				return nodes[i].nid == _this6.state.selectedNode ? _drawing2.default.selectedCircleStrokeColor : _drawing2.default.defaultCircleStrokeColor;
			}).attr("stroke-width", function (d, i) {
				return nodes[i].nid == _this6.state.selectedNode ? _drawing2.default.selectedCircleStrokeWidth : _drawing2.default.defaultCircleStrokeWidth;
			});

			elemtEnter.append("text").attr("color", _drawing2.default.defaultTextColor).attr("text-anchor", "middle").attr("class", "noselect").merge(gs.selectAll("text")).attr("dx", function (d, i) {
				return width.animVal.value / 2 + (nodes[i].x ? +nodes[i].x : 0);
			}).attr("dy", function (d, i) {
				return height.animVal.value / 2 + (nodes[i].y ? +nodes[i].y : 0) + 5;
			}).text(function (d, i) {
				return nodes[i].title;
			});

			//Actions
			svg.selectAll("g.node text").call(this.makeEditable, "tmp", this);

			svg.selectAll("g.node").on("click", function (d) {
				if (!d3.event.defaultPrevented) {
					d3.event.preventDefault();
					if (d && _typeof(d.nid) !== undefined) {
						if (_this6.state.mode === 2 && _this6.state.selectedNode && d.nid != _this6.state.selectedNode) {
							_this6.addNewLink(d.nid, _this6.state.selectedNode);
						} else {
							_this6.selectNode(d.nid);
						}
					}
				}
			}).on("dblclick", function (d) {
				if (!d3.event.defaultPrevented) {
					d3.event.preventDefault();
				}
			}).call(d3.drag().on("drag", function (d) {
				d.active = true;
				var imap = _this6.state.map;
				var r = 40 * (d.scale ? +d.scale : 1);
				imap.changeNodeLocation(d.nid, d3.event.x, d3.event.y);
				_this6.setState({
					map: imap
				});
			}).on("end", function (d) {
				if (d.active) {
					var imap = _this6.state.map;
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
			var _this7 = this;

			var links = this.state.map.links;
			var gs = svg.select("g#links").selectAll("g.link").data(links, function (d) {
				return d;
			});

			//Exit
			gs.exit().remove();

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "link");

			elemtEnter.append("line").attr("stroke-width", function (d, i) {
				return _drawing2.default.defaultCircleStrokeWidth;
			}).merge(gs.selectAll("line")).attr("stroke", function (d, i) {
				var id = Object.keys(links[i].nodes).join("");
				var selected = _this7.state.selectedLink && id == _this7.state.selectedLink;
				return selected ? _drawing2.default.selectedCircleStrokeColor : _drawing2.default.defaultCircleStrokeColor;
			}).attr("x1", function (d, i) {
				var origin = _this7.state.map.nodes[Object.keys(links[i].nodes)[0]];
				return width.animVal.value / 2 + (origin.x ? +origin.x : 0);
			}).attr("y1", function (d, i) {
				var origin = _this7.state.map.nodes[Object.keys(links[i].nodes)[0]];
				return height.animVal.value / 2 + (origin.y ? +origin.y : 0);
			}).attr("x2", function (d, i) {
				var destination = _this7.state.map.nodes[Object.keys(links[i].nodes)[1]];
				return width.animVal.value / 2 + (destination.x ? +destination.x : 0);
			}).attr("y2", function (d, i) {
				var destination = _this7.state.map.nodes[Object.keys(links[i].nodes)[1]];
				return height.animVal.value / 2 + (destination.y ? +destination.y : 0);
			});

			svg.selectAll("g.link").on("click", function (d) {
				d3.event.preventDefault();
				if (d && _typeof(d.nid) !== undefined && d.nodes) _this7.selectLink(d);
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

			return _react2.default.createElement(
				'div',
				{ id: 'maps-page', style: { height: "100%" } },
				_react2.default.createElement(_advice2.default, { user: this.props.user, map: this.state.map, selectedNode: this.state.selectedNode }),
				_react2.default.createElement(
					'div',
					{ className: 'flex', style: { height: "100%" } },
					_react2.default.createElement(_leftpanel2.default, { map: this.state.map,
						user: this.props.user,
						mode: this.state.mode,
						changeMode: this.changeMode,
						changeNodeText: this.changeNodeText, changeNodeDescription: this.changeNodeDescription,
						selectedLink: this.state.selectedLink, selectLink: this.selectLink,
						selectedNode: this.state.selectedNode, selectNode: this.selectNode,
						changeNodeScale: this.changeNodeScale,
						resizeSvg: this.resizeSvg,
						deleteSelectedNode: this.deleteSelectedNode,
						deleteLink: this.deleteLink,
						sendMessage: this.sendMessage }),
					_react2.default.createElement(
						'div',
						{ id: 'drawing-wrapper', className: 'flex-grow-1', style: { height: "100%" } },
						_react2.default.createElement(
							'svg',
							{ ref: 'svg', style: { height: '100%', width: '100%' } },
							_react2.default.createElement('g', { id: 'links' }),
							_react2.default.createElement('g', { id: 'nodes' })
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
