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

		_this.scrollToId = _this.scrollToId.bind(_this);
		_this.scrollToSecondBlock = _this.scrollToSecondBlock.bind(_this);
		_this.scrollToThirdBlock = _this.scrollToThirdBlock.bind(_this);
		_this.scrollToFourthBlock = _this.scrollToFourthBlock.bind(_this);
		_this.checkTlInVew = _this.checkTlInVew.bind(_this);
		_this.checkSecondSectionInView = _this.checkSecondSectionInView.bind(_this);
		_this.sendPropsectMail = _this.sendPropsectMail.bind(_this);
		_this.generateAccessCode = _this.generateAccessCode.bind(_this);

		_this.state = {
			drawDone: false,
			thirdLine1: false,
			thirdLine2: false,
			thirdLine3: false,
			autoScroll: false
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
			this.checkTlInVew(view, tl1, false, "thirdLine1");
			this.checkTlInVew(view, tl2, false, "thirdLine2");
			this.checkTlInVew(view, tl3, false, "thirdLine3");
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
				st.drawDone = true;
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
					if (scroll && !_this3.state.autoScroll) _this3.scrollToSecondBlock();
				});
			}
		}
	}, {
		key: 'scrollToSecondBlock',
		value: function scrollToSecondBlock() {
			var _this4 = this;

			this.setState({ autoScroll: true });
			this.scrollToId("landing-page-second-section");
			setTimeout(function () {
				_this4.setState({ autoScroll: false });
			}, 2000);
		}
	}, {
		key: 'scrollToThirdBlock',
		value: function scrollToThirdBlock() {
			var _this5 = this;

			this.setState({ autoScroll: true });
			//this.scrollToId("landing-page-third-section");
			this.scrollToId("landing-page-quote-section-sub");
			setTimeout(function () {
				_this5.setState({ autoScroll: false });
			}, 2000);
		}
	}, {
		key: 'scrollToFourthBlock',
		value: function scrollToFourthBlock() {
			var _this6 = this;

			this.setState({ autoScroll: true });
			this.scrollToId("landing-page-fourth-section");
			setTimeout(function () {
				_this6.setState({ autoScroll: false });
			}, 2000);
		}
	}, {
		key: 'scrollToId',
		value: function scrollToId(id) {
			var startY = document.getElementById('landing-page').scrollTop;
			var stopY = 0;
			var elm = document.getElementById(id);
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
		key: 'generateAccessCode',
		value: function generateAccessCode() {
			var text = "";
			var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			var len = 10;
			for (var i = 0; i < len; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}return text;
		}
	}, {
		key: 'sendPropsectMail',
		value: function sendPropsectMail(email, code) {
			var url = "https://hooks.zapier.com/hooks/catch/1087623/9hib4q";
			var params = "email=" + email + "&code=" + code;
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(params);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ id: 'landing-page', style: { maxWidth: "1440px", marginLeft: "auto", marginRight: "auto", overflow: "auto", height: "100%" } },
				_react2.default.createElement(TopSection, {
					scrollToSecondBlock: this.scrollToSecondBlock,
					scrollToThirdBlock: this.scrollToThirdBlock,
					scrollToFourthBlock: this.scrollToFourthBlock }),
				_react2.default.createElement(SecondSection, { generateAccessCode: this.generateAccessCode, sendPropsectMail: this.sendPropsectMail, drawDone: this.state.drawDone }),
				_react2.default.createElement(QuoteSection, null),
				_react2.default.createElement(ThirdSection, { thirdLine1: this.state.thirdLine1, thirdLine2: this.state.thirdLine2, thirdLine3: this.state.thirdLine3 }),
				_react2.default.createElement(FourthSection, { generateAccessCode: this.generateAccessCode, sendPropsectMail: this.sendPropsectMail })
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

		var _this7 = _possibleConstructorReturn(this, (TopSection.__proto__ || Object.getPrototypeOf(TopSection)).call(this, props));

		_this7.draw = _this7.draw.bind(_this7);
		_this7.drawNodes = _this7.drawNodes.bind(_this7);
		_this7.drawLinks = _this7.drawLinks.bind(_this7);
		_this7.state = {};
		return _this7;
	}

	_createClass(TopSection, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.draw();
			this.drawMob();
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this8 = this;

			var svg = d3.select("#headersvg"),
			    width = svg.property("width"),
			    height = svg.property("height");

			var wd = document.getElementById("landing-page-top-section").offsetWidth;
			this.drawNodes(svg, wd, 300, _demonodes2.default.mainNode, 1);
			setTimeout(function () {
				_this8.drawNodes(svg, wd, 300, _demonodes2.default.secondaryNodes, 2);
			}, 1000);
			setTimeout(function () {
				_this8.drawNodes(svg, wd, 300, _demonodes2.default.tertiaryNodes, 3);
			}, 2000);

			setTimeout(function () {
				_this8.drawLinks(svg, wd, 300, _demonodes2.default.firstLinks, 1, true);
			}, 1500);
			setTimeout(function () {
				_this8.drawLinks(svg, wd, 300, _demonodes2.default.secondaryLinks, 2, true);
			}, 2500);
		}
	}, {
		key: 'drawMob',
		value: function drawMob() {
			var _this9 = this;

			var svg = d3.select("#mobheadersvg"),
			    width = svg.property("width"),
			    height = svg.property("height");

			var wd = document.getElementById("mob-landing-page-top-section").offsetWidth;
			this.drawNodes(svg, wd, 300, _demonodes2.default.mobMainNode, 1);
			setTimeout(function () {
				_this9.drawNodes(svg, wd, 300, _demonodes2.default.mobSecondaryNodes, 2);
			}, 1000);

			setTimeout(function () {
				_this9.drawLinks(svg, wd, 300, _demonodes2.default.mobFirstLinks, 1, false);
			}, 1500);
		}
	}, {
		key: 'drawNodes',
		value: function drawNodes(svg, width, height, nodes, nb) {
			var _this10 = this;

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
			}).attr("fill", _demodrawing2.default.defaultCircleFillColor).attr("r", function (d, i) {
				return 40 * (nodes[i].scale ? +nodes[i].scale : 1);
			}).attr("cy", function (d, i) {
				return height / 2 + (nodes[i].y ? +nodes[i].y : 0);
			}).attr("cx", function (d, i) {
				return width / 2 + (nodes[i].x ? +nodes[i].x : 0);
			}).attr("stroke", function (d, i) {
				return nodes[i].nid == _this10.state.selectedNode ? _demodrawing2.default.selectedCircleStrokeColor : _demodrawing2.default.defaultCircleStrokeColor;
			}).attr("stroke-width", function (d, i) {
				return nodes[i].nid == _this10.state.selectedNode ? _demodrawing2.default.selectedCircleStrokeWidth : _demodrawing2.default.defaultCircleStrokeWidth;
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
		value: function drawLinks(svg, width, height, links, nb, isDesktop) {

			var gs = svg.select("g#links" + nb).selectAll("g.link").data(links, function (d) {
				return d;
			});

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "link");
			var allNodes = isDesktop ? _demonodes2.default.mainNode.concat(_demonodes2.default.secondaryNodes).concat(_demonodes2.default.tertiaryNodes) : _demonodes2.default.mobMainNode.concat(_demonodes2.default.mobSecondaryNodes);

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
					{ id: 'landing-page-top-section', className: 'purple-bcg hidden-xs' },
					_react2.default.createElement(
						'div',
						{ id: 'lp-header-section' },
						'Mg.',
						_react2.default.createElement(
							'div',
							{ id: 'header-rs-wrapper' },
							_react2.default.createElement(
								'div',
								{ onClick: this.props.scrollToSecondBlock },
								'Early Access'
							),
							_react2.default.createElement(
								'div',
								{ onClick: this.props.scrollToThirdBlock },
								'Pillars'
							),
							_react2.default.createElement(
								'div',
								{ onClick: this.props.scrollToFourthBlock },
								'Contact'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ id: 'lp-header-name' },
						'Magnesia'
					),
					_react2.default.createElement(
						'div',
						{ id: 'lp-header-sub-name' },
						'Nurturing brilliant ideas'
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
								{ style: { fontSize: "20px" } },
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
				),
				_react2.default.createElement(
					'div',
					{ id: 'mob-landing-page-top-section', className: 'purple-bcg shown-xs' },
					_react2.default.createElement(
						'div',
						{ id: 'mob-lp-header-section' },
						'Mg.'
					),
					_react2.default.createElement(
						'div',
						{ id: 'mob-lp-header-name' },
						'Magnesia'
					),
					_react2.default.createElement(
						'div',
						{ id: 'mob-lp-header-sub-name' },
						'Nurturing brilliant ideas'
					),
					_react2.default.createElement(
						'svg',
						{ id: 'mobheadersvg', style: { width: "100%", height: "250px" } },
						_react2.default.createElement('g', { id: 'links1' }),
						_react2.default.createElement('g', { id: 'nodes1' }),
						_react2.default.createElement('g', { id: 'nodes2' })
					),
					_react2.default.createElement(
						'div',
						{ style: { display: "flex" } },
						_react2.default.createElement('div', { id: 'mob-triangle-left', style: { flexGrow: 0 } }),
						_react2.default.createElement(
							'div',
							{ onClick: this.props.scrollToSecondBlock, id: '', style: { flexGrow: 1, textAlign: "center", color: "white", cursor: "pointer" } },
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "14px" } },
								'Get your early access'
							),
							_react2.default.createElement(
								'div',
								{ style: { height: "20px", width: "20px", marginLeft: "auto", marginRight: "auto" }, className: 'rotate-90 vertical-bounce' },
								'\u276F'
							)
						),
						_react2.default.createElement('div', { id: 'mob-triangle-right', style: { flexGrow: 0 } })
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

		var _this11 = _possibleConstructorReturn(this, (SecondSection.__proto__ || Object.getPrototypeOf(SecondSection)).call(this, props));

		_this11.draw = _this11.draw.bind(_this11);
		_this11.changeEmail = _this11.changeEmail.bind(_this11);
		_this11.send = _this11.send.bind(_this11);
		_this11.onKeyUp = _this11.onKeyUp.bind(_this11);

		_this11.state = {
			email: ""
		};
		return _this11;
	}

	_createClass(SecondSection, [{
		key: 'changeEmail',
		value: function changeEmail(e) {
			this.setState({ email: e.target.value });
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.drawMob();
			if (this.props && this.props.drawDone) {
				this.draw();
			}
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(np) {
			if (np && np.drawDone) {
				this.draw();
			}
		}
	}, {
		key: 'onKeyUp',
		value: function onKeyUp(evt) {
			if (evt && evt.which && evt.which === 13) {
				this.send();
			}
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this12 = this;

			var svg = d3.select("#secondsvg"),
			    width = svg.property("width"),
			    height = svg.property("height");

			var wd = document.getElementById("landing-page-second-section").offsetWidth;
			//The idea
			this.drawNodes(svg, wd, 300, [50], 1, "#424242");
			this.drawText(svg, wd, 300, [{ x: 0, y: 20, text: "The Journey Began" }], 1, "#424242");
			this.drawLine(svg, wd, 300, [[50, 150]], "#424242");
			//Version 0
			setTimeout(function () {
				_this12.drawNodes(svg, wd, 300, [150], 1, "#424242");
				_this12.drawText(svg, wd, 300, [{ x: 80, y: 155, text: "Closed Beta" }], 2, "#424242");
				_this12.drawLine(svg, wd, 300, [[150, 250]], "#424242");
			}, 500);
			//Pre launch
			setTimeout(function () {
				_this12.drawNodes(svg, wd, 300, [250], 1, "#424242");
				_this12.drawText(svg, wd, 300, [{ x: -80, y: 255, text: "Pre-Launch" }], 3, "#424242");
				_this12.drawLine(svg, wd, 300, [[250, 350]], "#BDBDBD");
			}, 1000);
			//Release
			setTimeout(function () {
				_this12.drawNodes(svg, wd, 300, [350], 1, "#BDBDBD");
				_this12.drawText(svg, wd, 300, [{ x: 0, y: 390, text: "Release" }], 4, "#BDBDBD");
				_this12.refs.getaccessblock.className = "show";
			}, 1500);
		}
	}, {
		key: 'drawMob',
		value: function drawMob() {
			var _this13 = this;

			var svg = d3.select("#mob-secondsvg"),
			    width = svg.property("width"),
			    height = svg.property("height");

			var wd = document.getElementById("mob-secondsvg").clientWidth;
			//The idea
			this.drawNodes(svg, wd, 300, [50], 1, "#424242", true);
			this.drawText(svg, wd, 300, [{ x: 0, y: 20, text: "The Journey Began" }], 1, "#424242", true);
			this.drawLine(svg, wd, 300, [[50, 150]], "#424242", true);
			//Version 0
			setTimeout(function () {
				_this13.drawNodes(svg, wd, 300, [150], 1, "#424242", true);
				_this13.drawText(svg, wd, 300, [{ x: 80, y: 155, text: "Closed Beta" }], 2, "#424242", true);
				_this13.drawLine(svg, wd, 300, [[150, 250]], "#424242", true);
			}, 500);
			//Pre launch
			setTimeout(function () {
				_this13.drawNodes(svg, wd, 300, [250], 1, "#424242", true);
				_this13.drawText(svg, wd, 300, [{ x: -80, y: 255, text: "Pre-Launch" }], 3, "#424242", true);
				_this13.drawLine(svg, wd, 300, [[250, 350]], "#BDBDBD", true);
			}, 1000);
			//Release
			setTimeout(function () {
				_this13.drawNodes(svg, wd, 300, [350], 1, "#BDBDBD", true);
				_this13.drawText(svg, wd, 300, [{ x: 0, y: 390, text: "Release" }], 4, "#BDBDBD", true);
				_this13.refs.getaccessblock.className = "show";
			}, 1500);
		}
	}, {
		key: 'drawText',
		value: function drawText(svg, width, height, texts, nb, color, isMobile) {

			var gs = svg.select("g#stexts" + nb).selectAll("g.text").data(texts, function (d, ind) {
				return d;
			});

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "text");

			var t = d3.transition().duration(200);

			elemtEnter.append("text").attr("fill", color).attr("text-anchor", "middle").attr("class", "noselect").attr("font-size", isMobile ? "16px" : "20px").attr("dx", function (d, i) {
				return (isMobile ? width / 2 : 150) + d.x;
			}).attr("dy", function (d, i) {
				return d.y;
			}).text(function (d, i) {
				return d.text;
			}).style("opacity", 0).transition(t).style("opacity", 1);
		}
	}, {
		key: 'drawNodes',
		value: function drawNodes(svg, width, height, node, nb, color, isMobile) {

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
				return isMobile ? width / 2 : 150;
			}).style("opacity", 0).transition(t).style("opacity", 1);
		}
	}, {
		key: 'drawLine',
		value: function drawLine(svg, width, height, line, color, isMobile) {

			var gs = svg.select("g#sline").selectAll("g.link").data(line, function (d) {
				return d;
			});

			//Enter
			var elemtEnter = gs.enter().append("g").attr("class", "link");

			var t = d3.transition().duration(1000);

			elemtEnter.append("line").attr("stroke-width", "5px").attr("stroke", color).attr("x1", isMobile ? width / 2 : 150).attr("y1", function (d, i) {
				return d[0];
			}).attr("x2", isMobile ? width / 2 : 150).attr("y2", function (d, i) {
				return d[0];
			}).transition(t).attr("y2", function (d, i) {
				return d[1];
			});
		}
	}, {
		key: 'send',
		value: function send() {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!this.state.email || !re.test(this.state.email)) {
				swal("Invalid Email", "Please check your email address, it seems to be invalid", "warning");
			} else {
				swal("Thank You", "We are glad to count you in !", "success");
				var code = this.props.generateAccessCode();
				firebase.database().ref("prospects").push({
					email: this.state.email,
					date: new Date().getTime(),
					code: code
				});
				this.props.sendPropsectMail(this.state.email, code);
				document.getElementById("get-access-block").style.display = "none";
				document.getElementById("landing-page-second-section").style.maxWidth = "300px";
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ id: 'landing-page-second-section', className: 'hidden-xs' },
					_react2.default.createElement(
						'div',
						{ ref: 'getaccessblock', id: 'get-access-block' },
						_react2.default.createElement(
							'div',
							{ id: 'gyac' },
							'Get your early access'
						),
						_react2.default.createElement('input', { onKeyUp: this.onKeyUp, value: this.state.email, onChange: this.changeEmail, type: 'email', placeholder: 'Email Address' }),
						_react2.default.createElement(
							'div',
							{ onClick: this.send, id: 'i-m-in' },
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
				),
				_react2.default.createElement(
					'div',
					{ id: 'mob-landing-page-second-section', className: 'shown-xs' },
					_react2.default.createElement(
						'svg',
						{ id: 'mob-secondsvg', style: { width: "100%", height: "400px" } },
						_react2.default.createElement('g', { id: 'sline' }),
						_react2.default.createElement('g', { id: 'snodes1' }),
						_react2.default.createElement('g', { id: 'stexts1' }),
						_react2.default.createElement('g', { id: 'stexts2' }),
						_react2.default.createElement('g', { id: 'stexts3' }),
						_react2.default.createElement('g', { id: 'stexts4' })
					),
					_react2.default.createElement(
						'div',
						{ ref: 'getaccessblock-2', id: 'mob-get-access-block' },
						_react2.default.createElement(
							'div',
							{ id: 'mob-gyac' },
							'Get your early access'
						),
						_react2.default.createElement('input', { onKeyUp: this.onKeyUp, value: this.state.email, onChange: this.changeEmail, type: 'email', placeholder: 'Email Address' }),
						_react2.default.createElement(
							'div',
							{ onClick: this.send, id: 'mob-i-m-in' },
							'I\'m in !'
						)
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
					{ id: 'landing-page-third-section', className: 'hidden-xs' },
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
								'Stronger in teams'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px" } },
								'Concepts are born in one mind and grown by groups. Magnesia has been made to maximize user experience as teams.'
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
								'The Power of Vizualisation'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px", textAlign: "right" } },
								'Mouvement makes team work easier than ever before. Vizualisation doesn\'t have to be static !'
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
								'Simplicity as a priority'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px" } },
								'Keep all your brain power for your ideas. We envision our plateform as a tool to grow your ideas, minimizing usage complexity.'
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ id: 'mob-landing-page-third-section', className: 'shown-xs' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ id: 'mob-third-line-1', className: this.props.thirdLine1 ? "sel-full-third-line full-third-line" : "full-third-line", style: { display: "flex" } },
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
									{ style: { fontSize: "22px", letterSpacing: "1px", fontWeight: "bold", marginTop: "9px" } },
									'Stronger in teams'
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ style: { fontSize: "16px", marginTop: "10px" } },
							'Concepts are born in one mind and grown by groups. Magnesia has been made to maximize user experience as teams.'
						)
					),
					_react2.default.createElement(
						'div',
						{ style: { marginTop: "70px", marginBottom: "70px" } },
						_react2.default.createElement(
							'div',
							{ id: 'mob-third-line-2', className: this.props.thirdLine2 ? "sel-full-third-line full-third-line" : "full-third-line", style: { display: "flex" } },
							_react2.default.createElement(
								'div',
								{ className: 'fg1 ls', style: { flexGrow: 1, paddingLeft: '20px', paddingRight: '20px' } },
								_react2.default.createElement(
									'div',
									{ style: { fontSize: "22px", letterSpacing: "1px", textAlign: "right", fontWeight: "bold", marginTop: "9px" } },
									'The Power of Vizualisation'
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
							{ style: { fontSize: "16px", marginTop: "10px", textAlign: "right" } },
							'Mouvement makes team work easier than ever before. Vizualisation doesn\'t have to be static !'
						)
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ id: 'mob-third-line-3', className: this.props.thirdLine3 ? "sel-full-third-line full-third-line" : "full-third-line", style: { display: "flex" } },
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
									{ style: { fontSize: "22px", letterSpacing: "1px", fontWeight: "bold", marginTop: "9px" } },
									'Simplicity as a priority'
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ style: { fontSize: "16px", marginTop: "10px" } },
							'Keep all your brain power for your ideas. We envision our plateform as a tool to grow your ideas, minimizing usage complexity.'
						)
					)
				)
			);
		}
	}]);

	return ThirdSection;
}(_react2.default.Component);

;

var FourthSection = function (_React$Component5) {
	_inherits(FourthSection, _React$Component5);

	function FourthSection(props) {
		_classCallCheck(this, FourthSection);

		var _this15 = _possibleConstructorReturn(this, (FourthSection.__proto__ || Object.getPrototypeOf(FourthSection)).call(this, props));

		_this15.changeEmail = _this15.changeEmail.bind(_this15);
		_this15.changeText = _this15.changeText.bind(_this15);
		_this15.onKeyUp = _this15.onKeyUp.bind(_this15);
		_this15.send = _this15.send.bind(_this15);

		_this15.state = {
			email: "",
			text: ""
		};
		return _this15;
	}

	_createClass(FourthSection, [{
		key: 'changeEmail',
		value: function changeEmail(e) {
			this.setState({ email: e.target.value });
		}
	}, {
		key: 'changeText',
		value: function changeText(e) {
			this.setState({ text: e.target.value });
		}
	}, {
		key: 'send',
		value: function send() {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!this.state.email || !re.test(this.state.email)) {
				swal("Invalid Email", "Please check your email address, it seems to be invalid", "warning");
			} else {
				swal("Thank You", "We are glad to count you in !", "success");
				var code = this.props.generateAccessCode();
				firebase.database().ref("prospects").push({
					email: this.state.email,
					date: new Date().getTime(),
					text: this.state.text,
					code: code
				});
				this.props.sendPropsectMail(this.state.email, code);
				this.setState({
					email: "",
					text: ""
				});
			}
		}
	}, {
		key: 'onKeyUp',
		value: function onKeyUp(evt) {
			if (evt && evt.which && evt.which === 13) {
				this.send();
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ style: { backgroundColor: "#2196F3" } },
				_react2.default.createElement(
					'div',
					{ id: 'landing-page-fourth-section', className: 'hidden-xs' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "22px", letterSpacing: "1px", fontWeight: "bold", marginTop: "5px" } },
								'Your vision matters'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "18px", marginTop: "10px" } },
								'Magnesia is based on feedback from users. Let us know abour your own vision and needs !'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "18px", marginTop: "5px" } },
								'Alternatively just get in touch, we are always keen on having a chat !'
							)
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('input', { ref: 'inp', onKeyUp: this.onKeyUp, value: this.state.email, onChange: this.changeEmail, type: 'email', placeholder: 'Email Address' }),
							_react2.default.createElement('textarea', { ref: 'texta', value: this.state.text, onChange: this.changeText, rows: '6', placeholder: 'Share your vision or get in touch !' }),
							_react2.default.createElement(
								'div',
								{ onClick: this.send, id: 'send' },
								'Send'
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ id: 'mob-landing-page-fourth-section', className: 'shown-xs' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "22px", letterSpacing: "1px", fontWeight: "bold", marginTop: "5px" } },
								'Your vision matters'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "10px" } },
								'Magnesia is based on feedback from users. Let us know abour your own vision and needs !'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px" } },
								'Alternatively just get in touch, we are always keen on having a chat !'
							)
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('input', { ref: 'inp', onKeyUp: this.onKeyUp, value: this.state.email, onChange: this.changeEmail, type: 'email', placeholder: 'Email Address' }),
							_react2.default.createElement('textarea', { ref: 'texta', value: this.state.text, onChange: this.changeText, rows: '6', placeholder: 'Share your vision or get in touch !' }),
							_react2.default.createElement(
								'div',
								{ onClick: this.send, id: 'send' },
								'Send'
							)
						)
					)
				)
			);
		}
	}]);

	return FourthSection;
}(_react2.default.Component);

;

var QuoteSection = function (_React$Component6) {
	_inherits(QuoteSection, _React$Component6);

	function QuoteSection() {
		_classCallCheck(this, QuoteSection);

		return _possibleConstructorReturn(this, (QuoteSection.__proto__ || Object.getPrototypeOf(QuoteSection)).apply(this, arguments));
	}

	_createClass(QuoteSection, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ id: 'landing-page-quote-section', className: 'hidden-xs', style: { textAlign: "center", paddingTop: "70px", paddingBottom: "60px" } },
					_react2.default.createElement(
						'div',
						{ id: 'landing-page-quote-section-sub', style: { fontWeight: "bold", letterSpacing: ".5px", fontSize: "23px", marginBottom: "10px" } },
						'"Mind Maps are the Meta-language of the human race"'
					),
					_react2.default.createElement(
						'div',
						{ style: { fontSize: "18px" } },
						' -Tony Buzan'
					)
				),
				_react2.default.createElement(
					'div',
					{ id: 'mob-landing-page-quote-section', className: 'shown-xs', style: { textAlign: "center", paddingTop: "30px", paddingBottom: "40px" } },
					_react2.default.createElement(
						'div',
						{ id: 'landing-page-quote-section-sub', style: { fontWeight: "bold", letterSpacing: ".5px", fontSize: "18px", marginBottom: "10px" } },
						'"Mind Maps are the Meta-language of the human race"'
					),
					_react2.default.createElement(
						'div',
						{ style: { fontSize: "14px" } },
						' -Tony Buzan'
					)
				)
			);
		}
	}]);

	return QuoteSection;
}(_react2.default.Component);

;

exports.default = LandingPage;
