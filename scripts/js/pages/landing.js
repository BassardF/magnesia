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

		_this.scrollToSecondBlock = _this.scrollToSecondBlock.bind(_this);

		_this.state = {
			drawDone: false,
			thirdLine1: false,
			thirdLine2: false,
			thirdLine3: false
		};
		return _this;
	}

	_createClass(LandingPage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var view = document.getElementById('landing-page');
			var target = document.getElementById('landing-page-second-section');
			var tl1 = document.getElementById('third-line-1');
			var tl2 = document.getElementById('third-line-2');
			var tl3 = document.getElementById('third-line-3');
			this.checkSecondSectionInView(view, target, false);
			this.checkTlInVew(view, tl1, false);
			this.checkTlInVew(view, tl2, false);
			this.checkTlInVew(view, tl3, false);
			view.addEventListener('scroll', function () {
				if (!_this2.state.drawDone) _this2.checkSecondSectionInView(view, target, true);
				if (!_this2.state.thirdLine1) _this2.checkTlInVew(view, tl1, true, "thirdLine1");
				if (!_this2.state.thirdLine2) _this2.checkTlInVew(view, tl2, true, "thirdLine2");
				if (!_this2.state.thirdLine3) _this2.checkTlInVew(view, tl3, true, "thirdLine3");
			});
		}
	}, {
		key: 'checkTlInVew',
		value: function checkTlInVew(view, target, scroll, name) {
			var elemTop = target.getBoundingClientRect().top;
			var elemBottom = target.getBoundingClientRect().bottom;
			if (elemTop < window.innerHeight && elemBottom >= 0) {
				var st = this.state;
				st[name] = true;
				this.setState(st);
			}
		}
	}, {
		key: 'checkSecondSectionInView',
		value: function checkSecondSectionInView(view, target, scroll) {
			var _this3 = this;

			var elemTop = target.getBoundingClientRect().top;
			var elemBottom = target.getBoundingClientRect().bottom;
			if (elemTop + 100 < window.innerHeight && elemBottom >= 0) {
				this.setState({
					drawDone: true
				}, function () {
					if (scroll) _this3.scrollToSecondBlock();
				});
			}
		}
	}, {
		key: 'scrollToSecondBlock',
		value: function scrollToSecondBlock() {
			var startY = document.getElementById('landing-page').scrollTop;
			var stopY = 0;
			var elm = document.getElementById("landing-page-second-section");
			if (elm) {
				var y = elm.offsetTop;
				var node = elm;
				while (node.offsetParent && node.offsetParent != document.body) {
					node = node.offsetParent;
					y += node.offsetTop;
				}
				stopY = y - 31;

				var distance = stopY > startY ? stopY - startY : startY - stopY;
				if (distance < 100) {
					scrollTo(0, stopY);return;
				}
				var speed = Math.round(distance / 50);
				if (speed >= 20) speed = 20;
				var step = Math.round(distance / 25);
				var leapY = stopY > startY ? startY + step : startY - step;
				var timer = 0;
				if (stopY > startY) {
					for (var i = startY; i < stopY; i += step) {
						setTimeout("document.getElementById('landing-page').scrollTop = " + leapY, timer * speed);
						leapY += step;if (leapY > stopY) leapY = stopY;timer++;
					}return;
				}
				for (var i = startY; i > stopY; i -= step) {
					setTimeout("document.getElementById('landing-page').scrollTop = " + leapY, timer * speed);
					leapY -= step;if (leapY < stopY) leapY = stopY;timer++;
				}
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ id: 'landing-page', style: { maxWidth: "1440px", marginLeft: "auto", marginRight: "auto", overflow: "auto", height: "100%" } },
				_react2.default.createElement(TopSection, { scrollToSecondBlock: this.scrollToSecondBlock }),
				_react2.default.createElement(SecondSection, { drawDone: this.state.drawDone }),
				_react2.default.createElement(ThirdSection, { thirdLine1: this.state.thirdLine1, thirdLine2: this.state.thirdLine2, thirdLine3: this.state.thirdLine3 }),
				_react2.default.createElement(
					'div',
					{ style: { display: "none" } },
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
				)
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

		var _this4 = _possibleConstructorReturn(this, (TopSection.__proto__ || Object.getPrototypeOf(TopSection)).call(this, props));

		_this4.draw = _this4.draw.bind(_this4);
		_this4.drawNodes = _this4.drawNodes.bind(_this4);
		_this4.drawLinks = _this4.drawLinks.bind(_this4);
		_this4.state = {};
		return _this4;
	}

	_createClass(TopSection, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.draw();
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this5 = this;

			var svg = d3.select("#headersvg"),
			    width = svg.property("width"),
			    height = svg.property("height");

			var wd = document.getElementById("landing-page-top-section").offsetWidth;
			this.drawNodes(svg, wd, 300, _demonodes2.default.mainNode, 1);
			setTimeout(function () {
				_this5.drawNodes(svg, wd, 300, _demonodes2.default.secondaryNodes, 2);
			}, 1000);
			setTimeout(function () {
				_this5.drawNodes(svg, wd, 300, _demonodes2.default.tertiaryNodes, 3);
			}, 2000);

			setTimeout(function () {
				_this5.drawLinks(svg, wd, 300, _demonodes2.default.firstLinks, 1);
			}, 1500);
			setTimeout(function () {
				_this5.drawLinks(svg, wd, 300, _demonodes2.default.secondaryLinks, 2);
			}, 2500);
		}
	}, {
		key: 'drawNodes',
		value: function drawNodes(svg, width, height, nodes, nb) {
			var _this6 = this;

			var gs = svg.select("g#nodes" + nb).selectAll("g.node").data(nodes, function (d, ind) {
				return d;
			});

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "node");

			var t = d3.transition().duration(500);

			elemtEnter.append("circle").attr("stroke", function (d, i) {
				return _demodrawing2.default.defaultCircleStrokeColor;
			}).attr("stroke-width", function (d, i) {
				return _demodrawing2.default.defaultCircleStrokeWidth;
			}).attr("fill", "#9C27B0").attr("r", function (d, i) {
				return 40 * (nodes[i].scale ? +nodes[i].scale : 1);
			}).attr("cy", function (d, i) {
				return height / 2 + (nodes[i].y ? +nodes[i].y : 0);
			}).attr("cx", function (d, i) {
				return width / 2 + (nodes[i].x ? +nodes[i].x : 0);
			}).attr("stroke", function (d, i) {
				return nodes[i].nid == _this6.state.selectedNode ? _demodrawing2.default.selectedCircleStrokeColor : _demodrawing2.default.defaultCircleStrokeColor;
			}).attr("stroke-width", function (d, i) {
				return nodes[i].nid == _this6.state.selectedNode ? _demodrawing2.default.selectedCircleStrokeWidth : _demodrawing2.default.defaultCircleStrokeWidth;
			}).style("opacity", 0).transition(t).style("opacity", 1);

			elemtEnter.append("text").attr("fill", _demodrawing2.default.defaultTextColor).attr("text-anchor", "middle").attr("class", "noselect").attr("dx", function (d, i) {
				return width / 2 + (nodes[i].x ? +nodes[i].x : 0);
			}).attr("dy", function (d, i) {
				return height / 2 + (nodes[i].y ? +nodes[i].y : 0) + 5;
			}).text(function (d, i) {
				return nodes[i].title;
			}).style("opacity", 0).transition(t).style("opacity", 1);
		}
	}, {
		key: 'drawLinks',
		value: function drawLinks(svg, width, height, links, nb) {

			var gs = svg.select("g#links" + nb).selectAll("g.link").data(links, function (d) {
				return d;
			});

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "link");
			var allNodes = _demonodes2.default.mainNode.concat(_demonodes2.default.secondaryNodes).concat(_demonodes2.default.tertiaryNodes);

			var t = d3.transition().duration(500);

			elemtEnter.append("line").attr("stroke-width", function (d, i) {
				return _demodrawing2.default.defaultCircleStrokeWidth;
			}).attr("stroke", function (d, i) {
				var id = Object.keys(links[i].nodes).join("");
				return _demodrawing2.default.defaultCircleStrokeColor;
			}).attr("x1", function (d, i) {
				var origin = allNodes[Object.keys(links[i].nodes)[0]];
				return width / 2 + (origin.x ? +origin.x : 0);
			}).attr("y1", function (d, i) {
				var origin = allNodes[Object.keys(links[i].nodes)[0]];
				return height / 2 + (origin.y ? +origin.y : 0);
			}).attr("x2", function (d, i) {
				var destination = allNodes[Object.keys(links[i].nodes)[1]];
				return width / 2 + (destination.x ? +destination.x : 0);
			}).attr("y2", function (d, i) {
				var destination = allNodes[Object.keys(links[i].nodes)[1]];
				return height / 2 + (destination.y ? +destination.y : 0);
			}).style("opacity", 0).transition(t).style("opacity", 1);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ id: 'landing-page-top-section', className: 'purple-bcg' },
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
					),
					_react2.default.createElement(
						'svg',
						{ id: 'headersvg', style: { width: "100%", height: "300px" } },
						_react2.default.createElement('g', { id: 'links1' }),
						_react2.default.createElement('g', { id: 'links2' }),
						_react2.default.createElement('g', { id: 'nodes1' }),
						_react2.default.createElement('g', { id: 'nodes2' }),
						_react2.default.createElement('g', { id: 'nodes3' })
					),
					_react2.default.createElement(
						'div',
						{ style: { display: "flex" } },
						_react2.default.createElement('div', { id: 'triangle-left', style: { flexGrow: 0 } }),
						_react2.default.createElement(
							'div',
							{ onClick: this.props.scrollToSecondBlock, id: '', style: { flexGrow: 1, textAlign: "center", color: "white", cursor: "pointer" } },
							_react2.default.createElement(
								'div',
								null,
								'Get your early access'
							),
							_react2.default.createElement(
								'div',
								{ style: { height: "20px", width: "20px", marginLeft: "auto", marginRight: "auto" }, className: 'rotate-90 vertical-bounce' },
								'\u276F'
							)
						),
						_react2.default.createElement('div', { id: 'triangle-right', style: { flexGrow: 0 } })
					)
				)
			);
		}
	}]);

	return TopSection;
}(_react2.default.Component);

;

var SecondSection = function (_React$Component3) {
	_inherits(SecondSection, _React$Component3);

	function SecondSection(props) {
		_classCallCheck(this, SecondSection);

		var _this7 = _possibleConstructorReturn(this, (SecondSection.__proto__ || Object.getPrototypeOf(SecondSection)).call(this, props));

		_this7.draw = _this7.draw.bind(_this7);
		_this7.state = {};
		return _this7;
	}

	_createClass(SecondSection, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(np) {
			if (np && np.drawDone) {
				this.draw();
			}
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this8 = this;

			var svg = d3.select("#secondsvg"),
			    width = svg.property("width"),
			    height = svg.property("height");

			var wd = document.getElementById("landing-page-second-section").offsetWidth;
			//The idea
			this.drawNodes(svg, wd, 300, [50], 1, "#424242");
			this.drawText(svg, wd, 300, [{ x: 0, y: 20, text: "The Idea" }], 1, "#424242");
			this.drawLine(svg, wd, 300, [[50, 150]], "#424242");
			//Version 0
			setTimeout(function () {
				_this8.drawNodes(svg, wd, 300, [150], 1, "#424242");
				_this8.drawText(svg, wd, 300, [{ x: 80, y: 155, text: "First Version" }], 2, "#424242");
				_this8.drawLine(svg, wd, 300, [[150, 250]], "#424242");
			}, 1000);
			//Pre launch
			setTimeout(function () {
				_this8.drawNodes(svg, wd, 300, [250], 1, "#424242");
				_this8.drawText(svg, wd, 300, [{ x: -80, y: 255, text: "Pre-Launch" }], 3, "#424242");
				_this8.drawLine(svg, wd, 300, [[250, 350]], "#BDBDBD");
			}, 2000);
			//Release
			setTimeout(function () {
				_this8.drawNodes(svg, wd, 300, [350], 1, "#BDBDBD");
				_this8.drawText(svg, wd, 300, [{ x: 0, y: 390, text: "Release" }], 4, "#BDBDBD");
				_this8.refs.getaccessblock.className = "show";
			}, 3000);
		}
	}, {
		key: 'drawText',
		value: function drawText(svg, width, height, texts, nb, color) {

			var gs = svg.select("g#stexts" + nb).selectAll("g.text").data(texts, function (d, ind) {
				return d;
			});

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "text");

			var t = d3.transition().duration(200);

			elemtEnter.append("text").attr("fill", color).attr("text-anchor", "middle").attr("class", "noselect").attr("font-size", "20px").attr("dx", function (d, i) {
				return 150 + d.x;
			}).attr("dy", function (d, i) {
				return d.y;
			}).text(function (d, i) {
				return d.text;
			}).style("opacity", 0).transition(t).style("opacity", 1);
		}
	}, {
		key: 'drawNodes',
		value: function drawNodes(svg, width, height, node, nb, color) {

			var gs = svg.select("g#snodes" + nb).selectAll("g.node").data(node, function (d, ind) {
				return d;
			});

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "node");

			var t = d3.transition().duration(200);

			elemtEnter.append("circle").attr("fill", color).attr("r", function (d, i) {
				return 10;
			}).attr("cy", function (d, i) {
				return node[0];
			}).attr("cx", function (d, i) {
				return 150;
			}).style("opacity", 0).transition(t).style("opacity", 1);
		}
	}, {
		key: 'drawLine',
		value: function drawLine(svg, width, height, line, color) {

			var gs = svg.select("g#sline").selectAll("g.link").data(line, function (d) {
				return d;
			});

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "link");

			var t = d3.transition().duration(1000);

			elemtEnter.append("line").attr("stroke-width", "5px").attr("stroke", color).attr("x1", 150).attr("y1", function (d, i) {
				return d[0];
			}).attr("x2", 150).attr("y2", function (d, i) {
				return d[0];
			}).transition(t).attr("y2", function (d, i) {
				return d[1];
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
					{ id: 'landing-page-second-section' },
					_react2.default.createElement(
						'div',
						{ ref: 'getaccessblock', id: 'get-access-block' },
						_react2.default.createElement(
							'div',
							{ id: 'gyac' },
							'Get your early access'
						),
						_react2.default.createElement('input', { type: 'text', placeholder: 'Email Address' }),
						_react2.default.createElement(
							'div',
							{ id: 'i-m-in' },
							'I\'m in !'
						)
					),
					_react2.default.createElement(
						'svg',
						{ id: 'secondsvg', style: { width: "100%", height: "400px" } },
						_react2.default.createElement('g', { id: 'sline' }),
						_react2.default.createElement('g', { id: 'snodes1' }),
						_react2.default.createElement('g', { id: 'stexts1' }),
						_react2.default.createElement('g', { id: 'stexts2' }),
						_react2.default.createElement('g', { id: 'stexts3' }),
						_react2.default.createElement('g', { id: 'stexts4' })
					)
				)
			);
		}
	}]);

	return SecondSection;
}(_react2.default.Component);

;

var ThirdSection = function (_React$Component4) {
	_inherits(ThirdSection, _React$Component4);

	function ThirdSection() {
		_classCallCheck(this, ThirdSection);

		return _possibleConstructorReturn(this, (ThirdSection.__proto__ || Object.getPrototypeOf(ThirdSection)).apply(this, arguments));
	}

	_createClass(ThirdSection, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ id: 'landing-page-third-section' },
					_react2.default.createElement(
						'div',
						{ id: 'third-line-1', className: this.props.thirdLine1 ? "sel-full-third-line full-third-line" : "full-third-line", style: { display: "flex" } },
						_react2.default.createElement(
							'div',
							{ className: 'fg0 ls', style: { flexGrow: 0 } },
							_react2.default.createElement(
								'div',
								{ className: 'value-wrapper' },
								'Team'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'fg1 rs', style: { flexGrow: 1, paddingLeft: '20px', paddingRight: '20px' } },
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "22px", letterSpacing: "1px", fontWeight: "bold", marginTop: "5px" } },
								'Thought out for teams'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px" } },
								'Idea are better grown in teams. Wether you are working in the same room or on opposite emispheres, we will provide the best experience.'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ id: 'third-line-2', className: this.props.thirdLine2 ? "sel-full-third-line full-third-line" : "full-third-line", style: { display: "flex", marginTop: "70px", marginBottom: "70px" } },
						_react2.default.createElement(
							'div',
							{ className: 'fg1 ls', style: { flexGrow: 1, paddingLeft: '20px', paddingRight: '20px' } },
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "22px", letterSpacing: "1px", textAlign: "right", fontWeight: "bold", marginTop: "15px" } },
								'Instant visual'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px", textAlign: "right" } },
								'Mouvement is key as most of us are visual first. We made every modification live to ease communication.'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'fg0 rs', style: { flexGrow: 0 } },
							_react2.default.createElement(
								'div',
								{ className: 'value-wrapper' },
								'Live'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ id: 'third-line-3', className: this.props.thirdLine3 ? "sel-full-third-line full-third-line" : "full-third-line", style: { display: "flex" } },
						_react2.default.createElement(
							'div',
							{ className: 'fg0 ls', style: { flexGrow: 0 } },
							_react2.default.createElement(
								'div',
								{ className: 'value-wrapper' },
								'Simple'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'fg1 rs', style: { flexGrow: 1, paddingLeft: '20px', paddingRight: '20px' } },
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "22px", letterSpacing: "1px", fontWeight: "bold", marginTop: "15px" } },
								'Simplicity is a priority'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px" } },
								'Keep all your brain power for your ideas. We focus on the main features to make it as easy to use as possible.'
							)
						)
					)
				)
			);
		}
	}]);

	return ThirdSection;
}(_react2.default.Component);

;

exports.default = LandingPage;
