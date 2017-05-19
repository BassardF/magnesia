'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _demodrawing = require('../properties/demodrawing');

var _demodrawing2 = _interopRequireDefault(_demodrawing);

var _demonodes = require('../properties/demonodes');

var _demonodes2 = _interopRequireDefault(_demonodes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LandingPage = function (_React$Component) {
	_inherits(LandingPage, _React$Component);

	function LandingPage(props) {
		_classCallCheck(this, LandingPage);

		var _this = _possibleConstructorReturn(this, (LandingPage.__proto__ || Object.getPrototypeOf(LandingPage)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(LandingPage, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ id: 'landing-page', style: { maxWidth: "1440px", marginLeft: "auto", marginRight: "auto" } },
				_react2.default.createElement(TopSection, null),
				_react2.default.createElement(
					'h1',
					null,
					'ideas'
				),
				_react2.default.createElement(
					'h3',
					null,
					'Why / How / What / Ex'
				),
				_react2.default.createElement(
					'div',
					null,
					'W : Ideas worth blooming - Growing brilliant ideas - Nurture your best ideas'
				),
				_react2.default.createElement(
					'div',
					null,
					'H : Visual representation | Structuration | Sharing @team'
				),
				_react2.default.createElement(
					'div',
					null,
					'Wh : Magnesia'
				),
				_react2.default.createElement(
					'h3',
					null,
					'tools ID'
				),
				_react2.default.createElement(
					'div',
					null,
					'node/user count'
				),
				_react2.default.createElement('div', null)
			);
		}
	}]);

	return LandingPage;
}(_react2.default.Component);

;

var TopSection = function (_React$Component2) {
	_inherits(TopSection, _React$Component2);

	function TopSection(props) {
		_classCallCheck(this, TopSection);

		var _this2 = _possibleConstructorReturn(this, (TopSection.__proto__ || Object.getPrototypeOf(TopSection)).call(this, props));

		_this2.draw = _this2.draw.bind(_this2);
		_this2.drawNodes = _this2.drawNodes.bind(_this2);
		_this2.drawLinks = _this2.drawLinks.bind(_this2);
		_this2.state = {};
		return _this2;
	}

	_createClass(TopSection, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			console.log("componentDidMount", _demonodes2.default);
			this.draw();
		}
	}, {
		key: 'draw',
		value: function draw() {
			var svg = d3.select("#headersvg"),
			    width = svg.property("width"),
			    height = svg.property("height");

			var wd = document.body.offsetWidth;
			this.drawNodes(svg, wd, 300);
			this.drawLinks(svg, wd, 300);
		}
	}, {
		key: 'drawNodes',
		value: function drawNodes(svg, width, height) {
			var _this3 = this;

			var nodes = _demonodes2.default.nodes;

			var gs = svg.select("g#nodes").selectAll("g.node").data(nodes, function (d, ind) {
				return d;
			});

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "node");

			elemtEnter.append("circle").attr("stroke", function (d, i) {
				return _demodrawing2.default.defaultCircleStrokeColor;
			}).attr("stroke-width", function (d, i) {
				return _demodrawing2.default.defaultCircleStrokeWidth;
			}).attr("fill", "#9C27B0").style("cursor", "pointer").merge(gs.selectAll("circle")).attr("r", function (d, i) {
				return 40 * (nodes[i].scale ? +nodes[i].scale : 1);
			}).attr("cy", function (d, i) {
				return height / 2 + (nodes[i].y ? +nodes[i].y : 0);
			}).attr("cx", function (d, i) {
				return width / 2 + (nodes[i].x ? +nodes[i].x : 0);
			}).attr("stroke", function (d, i) {
				return nodes[i].nid == _this3.state.selectedNode ? _demodrawing2.default.selectedCircleStrokeColor : _demodrawing2.default.defaultCircleStrokeColor;
			}).attr("stroke-width", function (d, i) {
				return nodes[i].nid == _this3.state.selectedNode ? _demodrawing2.default.selectedCircleStrokeWidth : _demodrawing2.default.defaultCircleStrokeWidth;
			});

			elemtEnter.append("text").attr("fill", _demodrawing2.default.defaultTextColor).attr("text-anchor", "middle").attr("class", "noselect").merge(gs.selectAll("text")).attr("dx", function (d, i) {
				return width / 2 + (nodes[i].x ? +nodes[i].x : 0);
			}).attr("dy", function (d, i) {
				return height / 2 + (nodes[i].y ? +nodes[i].y : 0) + 5;
			}).text(function (d, i) {
				return nodes[i].title;
			});
		}
	}, {
		key: 'drawLinks',
		value: function drawLinks(svg, width, height) {

			var links = _demonodes2.default.links;
			var gs = svg.select("g#links").selectAll("g.link").data(links, function (d) {
				return d;
			});

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "link");

			elemtEnter.append("line").attr("stroke-width", function (d, i) {
				return _demodrawing2.default.defaultCircleStrokeWidth;
			}).merge(gs.selectAll("line")).attr("stroke", function (d, i) {
				var id = Object.keys(links[i].nodes).join("");
				return _demodrawing2.default.defaultCircleStrokeColor;
			}).attr("x1", function (d, i) {
				var origin = _demonodes2.default.nodes[Object.keys(links[i].nodes)[0]];
				return width / 2 + (origin.x ? +origin.x : 0);
			}).attr("y1", function (d, i) {
				var origin = _demonodes2.default.nodes[Object.keys(links[i].nodes)[0]];
				return height / 2 + (origin.y ? +origin.y : 0);
			}).attr("x2", function (d, i) {
				var destination = _demonodes2.default.nodes[Object.keys(links[i].nodes)[1]];
				return width / 2 + (destination.x ? +destination.x : 0);
			}).attr("y2", function (d, i) {
				var destination = _demonodes2.default.nodes[Object.keys(links[i].nodes)[1]];
				return height / 2 + (destination.y ? +destination.y : 0);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ id: 'landing-page-top-section', className: 'section purple-bcg' },
					_react2.default.createElement(
						'div',
						{ id: 'lp-header-section' },
						'Mg.'
					),
					_react2.default.createElement(
						'div',
						{ id: 'lp-header-name' },
						'Magnesia'
					),
					_react2.default.createElement(
						'div',
						{ id: 'lp-header-sub-name' },
						'Nurture your brilliant ideas'
					)
				),
				_react2.default.createElement(
					'svg',
					{ id: 'headersvg', style: { width: "100%", height: "300px", marginTop: "-300px" } },
					_react2.default.createElement('g', { id: 'links' }),
					_react2.default.createElement('g', { id: 'nodes' })
				)
			);
		}
	}]);

	return TopSection;
}(_react2.default.Component);

;

exports.default = LandingPage;
