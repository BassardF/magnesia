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

var _register = require('./register');

var _register2 = _interopRequireDefault(_register);

var _DropModal = require('boron/DropModal');

var _DropModal2 = _interopRequireDefault(_DropModal);

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
		_this.scrollToSecondBlockMobile = _this.scrollToSecondBlockMobile.bind(_this);
		_this.scrollToThirdBlock = _this.scrollToThirdBlock.bind(_this);
		_this.scrollToFourthBlock = _this.scrollToFourthBlock.bind(_this);
		_this.checkTlInVew = _this.checkTlInVew.bind(_this);
		_this.checkSecondSectionInView = _this.checkSecondSectionInView.bind(_this);
		_this.sendPropsectMail = _this.sendPropsectMail.bind(_this);
		_this.generateAccessCode = _this.generateAccessCode.bind(_this);
		_this.showRegisterModal = _this.showRegisterModal.bind(_this);
		_this.hideRegisterModal = _this.hideRegisterModal.bind(_this);
		_this.showEarlyAccessModal = _this.showEarlyAccessModal.bind(_this);
		_this.hideEarlyAccessModal = _this.hideEarlyAccessModal.bind(_this);

		_this.state = {
			drawDone: false,
			thirdLine1: false,
			thirdLine2: false,
			thirdLine3: false,
			autoScroll: false,
			showRegisterModal: false,
			externalInvite: null,
			showEarlyAccessModal: false
		};
		return _this;
	}

	_createClass(LandingPage, [{
		key: 'showRegisterModal',
		value: function showRegisterModal(ei) {
			ga('send', 'pageview', "/register");
			this.setState({
				showRegisterModal: true,
				externalInvite: ei || null
			});
		}
	}, {
		key: 'hideRegisterModal',
		value: function hideRegisterModal() {
			ga('send', 'pageview', "/");
			this.setState({
				showRegisterModal: false
			});
		}
	}, {
		key: 'showEarlyAccessModal',
		value: function showEarlyAccessModal() {
			ga('send', 'pageview', "/earlyaccess");
			this.setState({
				showEarlyAccessModal: true
			});
		}
	}, {
		key: 'hideEarlyAccessModal',
		value: function hideEarlyAccessModal() {
			ga('send', 'pageview', "/");
			this.setState({
				showEarlyAccessModal: false
			});
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			//show modal hook
			if (location && location.search && location.search.indexOf("register") !== -1) this.showRegisterModal();
			//external invite
			if (location && location.search && location.search.indexOf("invited=true") !== -1) {
				var search = location.search.substring(1);
				var split = search.split("&");
				var ei = {};
				for (var i = 0; i < split.length; i++) {
					var insplit = split[i].split("=");
					ei[insplit[0]] = insplit[1];
				};

				this.showRegisterModal(ei);
			}

			var view = document.getElementById('landing-page');
			var target = document.getElementById('landing-page-second-section');
			var tl1 = document.getElementById('third-line-1');
			var tl2 = document.getElementById('third-line-2');
			this.checkSecondSectionInView(view, target, false);
			this.checkTlInVew(view, tl1, false, "thirdLine1");
			this.checkTlInVew(view, tl2, false, "thirdLine2");
			view.addEventListener('scroll', function () {
				if (!_this2.state.drawDone) _this2.checkSecondSectionInView(view, target, true);
				if (!_this2.state.thirdLine1) _this2.checkTlInVew(view, tl1, true, "thirdLine1");
				if (!_this2.state.thirdLine2) _this2.checkTlInVew(view, tl2, true, "thirdLine2");
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
			var elemTop = target.getBoundingClientRect().top;
			var elemBottom = target.getBoundingClientRect().bottom;
			if (elemTop + 100 < window.innerHeight && elemBottom >= 0) {
				this.setState({
					drawDone: true
				});
			}
		}
	}, {
		key: 'scrollToSecondBlock',
		value: function scrollToSecondBlock() {
			var _this3 = this;

			ga('send', {
				hitType: 'event',
				eventCategory: "landing page",
				eventAction: "scroll to early access",
				eventLabel: ""
			});
			this.setState({ autoScroll: true });
			this.scrollToId("landing-page-second-section");
			setTimeout(function () {
				_this3.setState({ autoScroll: false });
			}, 2000);
		}
	}, {
		key: 'scrollToSecondBlockMobile',
		value: function scrollToSecondBlockMobile() {
			ga('send', {
				hitType: 'event',
				eventCategory: "landing page",
				eventAction: "scroll to early access",
				eventLabel: ""
			});
			this.scrollToId("mob-landing-page-second-section");
		}
	}, {
		key: 'scrollToThirdBlock',
		value: function scrollToThirdBlock() {
			var _this4 = this;

			ga('send', {
				hitType: 'event',
				eventCategory: "landing page",
				eventAction: "scroll to description section",
				eventLabel: ""
			});
			this.setState({ autoScroll: true });
			//this.scrollToId("landing-page-third-section");
			this.scrollToId("landing-page-quote-section-sub");
			setTimeout(function () {
				_this4.setState({ autoScroll: false });
			}, 2000);
		}
	}, {
		key: 'scrollToFourthBlock',
		value: function scrollToFourthBlock() {
			var _this5 = this;

			ga('send', {
				hitType: 'event',
				eventCategory: "landing page",
				eventAction: "scroll to contact",
				eventLabel: ""
			});
			this.setState({ autoScroll: true });
			this.scrollToId("landing-page-fourth-section");
			setTimeout(function () {
				_this5.setState({ autoScroll: false });
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
			ga('send', {
				hitType: 'event',
				eventCategory: "landing page",
				eventAction: "generate access code",
				eventLabel: ""
			});
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
				_react2.default.createElement(RegisterModal, { externalInvite: this.state.externalInvite, show: this.state.showRegisterModal, showRegisterModal: this.showRegisterModal, hideRegisterModal: this.hideRegisterModal }),
				_react2.default.createElement(RegisterEarlyAccess, { sendPropsectMail: this.sendPropsectMail, generateAccessCode: this.generateAccessCode, show: this.state.showEarlyAccessModal, showEarlyAccessModal: this.showEarlyAccessModal, hideEarlyAccessModal: this.hideEarlyAccessModal }),
				_react2.default.createElement(TopSection, {
					showEarlyAccessModal: this.showEarlyAccessModal,
					scrollToSecondBlock: this.scrollToSecondBlock,
					scrollToSecondBlockMobile: this.scrollToSecondBlockMobile,
					scrollToThirdBlock: this.scrollToThirdBlock,
					scrollToFourthBlock: this.scrollToFourthBlock }),
				_react2.default.createElement(MockupsSection, null),
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

		var _this6 = _possibleConstructorReturn(this, (TopSection.__proto__ || Object.getPrototypeOf(TopSection)).call(this, props));

		_this6.draw = _this6.draw.bind(_this6);
		_this6.drawNodes = _this6.drawNodes.bind(_this6);
		_this6.drawLinks = _this6.drawLinks.bind(_this6);
		_this6.state = {};
		return _this6;
	}

	_createClass(TopSection, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.draw();
			//this.drawMob();
		}
	}, {
		key: 'draw',
		value: function draw() {
			var _this7 = this;

			var svg = d3.select("#headersvg"),
			    width = svg.property("width"),
			    height = svg.property("height");

			var wd = document.getElementById("landing-page-top-section").offsetWidth;
			this.drawNodes(svg, wd, 300, _demonodes2.default.mainNode, 1);
			setTimeout(function () {
				_this7.drawNodes(svg, wd, 300, _demonodes2.default.secondaryNodes, 2);
			}, 1000);
			setTimeout(function () {
				_this7.drawNodes(svg, wd, 300, _demonodes2.default.tertiaryNodes, 3);
			}, 2000);

			setTimeout(function () {
				_this7.drawLinks(svg, wd, 300, _demonodes2.default.firstLinks, 1, true);
			}, 1500);
			setTimeout(function () {
				_this7.drawLinks(svg, wd, 300, _demonodes2.default.secondaryLinks, 2, true);
			}, 2500);
		}
	}, {
		key: 'drawMob',
		value: function drawMob() {
			var _this8 = this;

			var svg = d3.select("#mobheadersvg"),
			    width = svg.property("width"),
			    height = svg.property("height");

			var wd = document.getElementById("mob-landing-page-top-section").offsetWidth;
			this.drawNodes(svg, wd, 200, _demonodes2.default.mobMainNode, 1);
			setTimeout(function () {
				_this8.drawNodes(svg, wd, 200, _demonodes2.default.mobSecondaryNodes, 2);
			}, 1000);

			setTimeout(function () {
				_this8.drawLinks(svg, wd, 200, _demonodes2.default.mobFirstLinks, 1, false);
			}, 1500);
		}
	}, {
		key: 'drawNodes',
		value: function drawNodes(svg, width, height, nodes, nb) {
			var _this9 = this;

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
				return nodes[i].nid == _this9.state.selectedNode ? _demodrawing2.default.selectedCircleStrokeColor : _demodrawing2.default.defaultCircleStrokeColor;
			}).attr("stroke-width", function (d, i) {
				return nodes[i].nid == _this9.state.selectedNode ? _demodrawing2.default.selectedCircleStrokeWidth : _demodrawing2.default.defaultCircleStrokeWidth;
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
					{ id: 'landing-page-top-section', className: 'hidden-xs' },
					_react2.default.createElement(
						'div',
						{ onClick: this.props.showEarlyAccessModal, className: 'purple-bcg', style: { width: "100%", zIndex: "-1", paddingTop: "50px", paddingBottom: "140px" } },
						_react2.default.createElement(
							'svg',
							{ id: 'headersvg', style: { width: "100%", height: "300px" } },
							_react2.default.createElement('g', { id: 'links1' }),
							_react2.default.createElement('g', { id: 'links2' }),
							_react2.default.createElement('g', { id: 'nodes1' }),
							_react2.default.createElement('g', { id: 'nodes2' }),
							_react2.default.createElement('g', { id: 'nodes3' })
						)
					),
					_react2.default.createElement(
						'div',
						{ id: 'lp-header-section' },
						'Mg.',
						_react2.default.createElement(
							'div',
							{ id: 'header-rs-wrapper' },
							_react2.default.createElement(
								'div',
								{ onClick: this.props.showEarlyAccessModal },
								'Early Access'
							)
						)
					),
					_react2.default.createElement(
						'h1',
						{ id: 'lp-header-name' },
						'Magnesia'
					),
					_react2.default.createElement(
						'h2',
						{ id: 'lp-header-sub-name' },
						_react2.default.createElement(
							'em',
							null,
							'Mind Maps'
						),
						' ',
						_react2.default.createElement(
							'span',
							{ style: { fontSize: "20px", marginRight: "5px", marginLeft: "5px" } },
							'for'
						),
						' ',
						_react2.default.createElement(
							'em',
							null,
							'Creatives'
						)
					),
					_react2.default.createElement(
						'div',
						{ onClick: this.props.showEarlyAccessModal, style: { border: "1px solid white", padding: "10px", letterSpacing: "1px", cursor: "pointer", fontWeight: "100", color: "white", textAlign: "center", marginLeft: "auto", marginRight: "auto", marginBottom: "40px", fontSize: "20px", width: "250px", borderRadius: "4px" } },
						'\u276F Free Early Access'
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
						'h1',
						{ id: 'mob-lp-header-name' },
						'Magnesia'
					),
					_react2.default.createElement(
						'h2',
						{ id: 'mob-lp-header-sub-name' },
						_react2.default.createElement(
							'em',
							null,
							'Mind Maps'
						),
						' ',
						_react2.default.createElement(
							'span',
							{ style: { fontSize: "20px", marginRight: "5px", marginLeft: "5px" } },
							'for'
						),
						' ',
						_react2.default.createElement(
							'em',
							null,
							'Creatives'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'mobile-drawing-bcg', style: { height: "140px", paddingTop: "70px" } },
						_react2.default.createElement(
							'div',
							{ onClick: this.props.showEarlyAccessModal, style: { border: "1px solid white", padding: "10px", letterSpacing: "1px", cursor: "pointer", fontWeight: "100", color: "white", textAlign: "center", marginLeft: "auto", marginRight: "auto", fontSize: "20px", width: "250px", borderRadius: "4px" } },
							'\u276F Free Early Access'
						)
					)
				)
			);
		}
	}]);

	return TopSection;
}(_react2.default.Component);

;

var MockupsSection = function (_React$Component3) {
	_inherits(MockupsSection, _React$Component3);

	function MockupsSection(props) {
		_classCallCheck(this, MockupsSection);

		var _this10 = _possibleConstructorReturn(this, (MockupsSection.__proto__ || Object.getPrototypeOf(MockupsSection)).call(this, props));

		_this10.state = {};
		return _this10;
	}

	_createClass(MockupsSection, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ id: 'landing-page-mockups-section', style: { color: "#424242", marginTop: "30px", marginBottom: "30px" }, className: 'hidden-xs' },
					_react2.default.createElement('img', { className: 'boxshadow', style: { maxWidth: "60%", marginRight: "auto", marginLeft: "auto", display: "block" }, src: '../assets/images/mockup-center.png' }),
					_react2.default.createElement(
						'div',
						{ style: { display: "flex", marginTop: "50px" } },
						_react2.default.createElement(
							'div',
							{ style: { flexGrow: "1" } },
							_react2.default.createElement(
								'div',
								{ style: { maxWidth: "300px", paddingLeft: "15px", paddingRight: "15px", marginLeft: "auto", marginRight: "auto" } },
								_react2.default.createElement(
									'h2',
									{ style: { display: "flex" } },
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "0" } },
										_react2.default.createElement('img', { style: { width: "40px", marginRight: "5px" }, src: '../assets/images/lp-brainstorm.svg' })
									),
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "1", fontWeight: "100", paddingTop: "8px" } },
										'Brainstorm'
									)
								),
								_react2.default.createElement(
									'div',
									null,
									'Magnesia is a safe place for volatile ideas. It was designed to provide developing ideas the environment they deserve.'
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ style: { flexGrow: "1" } },
							_react2.default.createElement(
								'div',
								{ style: { maxWidth: "300px", paddingLeft: "15px", paddingRight: "15px", marginLeft: "auto", marginRight: "auto" } },
								_react2.default.createElement(
									'h2',
									{ style: { display: "flex" } },
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "0" } },
										_react2.default.createElement('img', { style: { width: "40px", marginRight: "5px" }, src: '../assets/images/lp-social.svg' })
									),
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "1", fontWeight: "100", paddingTop: "8px" } },
										'Easy to use'
									)
								),
								_react2.default.createElement(
									'div',
									null,
									'We are committed to deliver a quick and simple to use tool, allowing to dedicate all focus to emerging ideas.'
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ style: { flexGrow: "1" } },
							_react2.default.createElement(
								'div',
								{ style: { maxWidth: "300px", paddingLeft: "15px", paddingRight: "15px", marginLeft: "auto", marginRight: "auto" } },
								_react2.default.createElement(
									'h2',
									{ style: { display: "flex" } },
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "0" } },
										_react2.default.createElement('img', { style: { width: "40px", marginRight: "5px" }, src: '../assets/images/lp-brainstorming.svg' })
									),
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "1", fontWeight: "100", paddingTop: "8px" } },
										'Collaborative'
									)
								),
								_react2.default.createElement(
									'div',
									null,
									'Whether you are lone wolf or playing within a team, Magnesia promotes the sharing of ideas as well as provides a solid structure for further development.'
								)
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ id: 'mob-landing-page-mockups-section', className: 'shown-xs' },
					_react2.default.createElement('img', { className: 'boxshadow', style: { marginTop: "-50px", maxWidth: "95%", marginRight: "auto", marginLeft: "auto", display: "block" }, src: '../assets/images/mockup-center.png' }),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ style: { marginTop: "60px" } },
							_react2.default.createElement(
								'div',
								{ style: { maxWidth: "300px", paddingLeft: "15px", paddingRight: "15px", marginLeft: "auto", marginRight: "auto" } },
								_react2.default.createElement(
									'h2',
									{ style: { display: "flex" } },
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "0" } },
										_react2.default.createElement('img', { style: { width: "40px", marginRight: "5px" }, src: '../assets/images/lp-brainstorm.svg' })
									),
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "1", fontWeight: "100", paddingTop: "8px" } },
										'Brainstorm'
									)
								),
								_react2.default.createElement(
									'div',
									null,
									'Magnesia is a safe place for volatile ideas. It was designed to provide developing ideas the environment they deserve.'
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ style: { marginTop: "60px" } },
							_react2.default.createElement(
								'div',
								{ style: { textAlign: "right", maxWidth: "300px", paddingLeft: "15px", paddingRight: "15px", marginLeft: "auto", marginRight: "auto" } },
								_react2.default.createElement(
									'h2',
									{ style: { display: "flex" } },
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "1", fontWeight: "100", paddingTop: "4px", marginRight: "5px" } },
										'Easy to use'
									),
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "0" } },
										_react2.default.createElement('img', { style: { width: "40px" }, src: '../assets/images/lp-social.svg' })
									)
								),
								_react2.default.createElement(
									'div',
									null,
									'We are committed to deliver a quick and simple to use tool, allowing to dedicate all focus to emerging ideas.'
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ style: { marginTop: "60px", marginBottom: "60px" } },
							_react2.default.createElement(
								'div',
								{ style: { maxWidth: "300px", paddingLeft: "15px", paddingRight: "15px", marginLeft: "auto", marginRight: "auto" } },
								_react2.default.createElement(
									'h2',
									{ style: { display: "flex" } },
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "0" } },
										_react2.default.createElement('img', { style: { width: "40px", marginRight: "5px" }, src: '../assets/images/lp-brainstorming.svg' })
									),
									_react2.default.createElement(
										'div',
										{ style: { flexGrow: "1", fontWeight: "100", paddingTop: "8px" } },
										'Collaborative'
									)
								),
								_react2.default.createElement(
									'div',
									null,
									'Whether you are lone wolf or playing within a team, Magnesia promotes the sharing of ideas as well as provides a solid structure for further development.'
								)
							)
						)
					)
				)
			);
		}
	}]);

	return MockupsSection;
}(_react2.default.Component);

;

var SecondSection = function (_React$Component4) {
	_inherits(SecondSection, _React$Component4);

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
				if (_this12.refs.getaccessblock) _this12.refs.getaccessblock.className = "show";
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
			ga('send', {
				hitType: 'event',
				eventCategory: "landing page",
				eventAction: "clicked on I'm in",
				eventLabel: ""
			});
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

var ThirdSection = function (_React$Component5) {
	_inherits(ThirdSection, _React$Component5);

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
							{ className: 'fg1 rs', style: { flexGrow: 1, paddingLeft: '20px', paddingRight: '20px', borderLeft: "solid 4px #2196F3" } },
							_react2.default.createElement(
								'h2',
								{ style: { fontSize: "22px", letterSpacing: "1px", fontWeight: "bold", marginTop: "5px", marginBottom: "5px" } },
								'Mind Maps ?'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px" } },
								'A ',
								_react2.default.createElement(
									'em',
									null,
									'Mind Map'
								),
								' is a visual representation of an idea or a concept. It is based on the human tendency to structure thoughts visually. Free your mind from any unnecessary workload and give full expression to your creativity !'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ id: 'third-line-2', className: this.props.thirdLine2 ? "sel-full-third-line full-third-line" : "full-third-line", style: { display: "flex", marginTop: "70px", marginBottom: "70px" } },
						_react2.default.createElement(
							'div',
							{ className: 'fg1 ls', style: { flexGrow: 1, paddingLeft: '20px', paddingRight: '20px', borderRight: "solid 4px #2196F3" } },
							_react2.default.createElement(
								'h2',
								{ style: { fontSize: "22px", letterSpacing: "1px", textAlign: "right", fontWeight: "bold", marginTop: "15px", marginBottom: "5px" } },
								'Why ',
								_react2.default.createElement(
									'em',
									null,
									'"Magnesia"'
								),
								' ?'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px", textAlign: "right" } },
								'Magnesia is an fictional and ideal city-state depicted in ',
								_react2.default.createElement(
									'em',
									null,
									'Plato\'s Laws'
								),
								'. It represents the state of ',
								_react2.default.createElement(
									'em',
									null,
									'"Tabula Rasa"'
								),
								', which allows the creation of an ideal without restriction. The blank sheet for a new Mind Map is the best foundation for brilliant ideas !'
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ id: 'mob-landing-page-third-section', className: 'shown-xs' },
					_react2.default.createElement(
						'div',
						{ id: 'mob-third-line-1', className: this.props.thirdLine1 ? "sel-full-third-line full-third-line" : "full-third-line", style: { display: "flex" } },
						_react2.default.createElement(
							'div',
							{ className: 'fg1 rs', style: { flexGrow: 1, paddingLeft: '20px', paddingRight: '20px', borderLeft: "solid 4px #2196F3" } },
							_react2.default.createElement(
								'h2',
								{ style: { fontSize: "22px", letterSpacing: "1px", fontWeight: "bold", marginTop: "5px", marginBottom: "5px" } },
								'Mind Maps ?'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px" } },
								'A ',
								_react2.default.createElement(
									'em',
									null,
									'Mind Map'
								),
								' is a visual representation of an idea or a concept. It is based on the human tendency to structure thoughts visually. Free your mind from any unnecessary workload and give full expression to your creativity !'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ id: 'mob-third-line-2', className: this.props.thirdLine2 ? "sel-full-third-line full-third-line" : "full-third-line", style: { display: "flex", marginTop: "70px", marginBottom: "0px" } },
						_react2.default.createElement(
							'div',
							{ className: 'fg1 ls', style: { flexGrow: 1, paddingLeft: '20px', paddingRight: '20px', borderRight: "solid 4px #2196F3" } },
							_react2.default.createElement(
								'h2',
								{ style: { fontSize: "22px", letterSpacing: "1px", textAlign: "right", fontWeight: "bold", marginTop: "15px", marginBottom: "5px" } },
								'Why ',
								_react2.default.createElement(
									'em',
									null,
									'"Magnesia"'
								),
								' ?'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "16px", marginTop: "5px", textAlign: "right" } },
								'Magnesia is an fictional and ideal city-state depicted in ',
								_react2.default.createElement(
									'em',
									null,
									'Plato\'s Laws'
								),
								'. It represents the state of ',
								_react2.default.createElement(
									'em',
									null,
									'"Tabula Rasa"'
								),
								', which allows the creation of an ideal without restriction. The blank sheet for a new Mind Map is the best foundation for brilliant ideas !'
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

var FourthSection = function (_React$Component6) {
	_inherits(FourthSection, _React$Component6);

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
			ga('send', {
				hitType: 'event',
				eventCategory: "landing page",
				eventAction: "clicked on 'send'",
				eventLabel: ""
			});
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

var QuoteSection = function (_React$Component7) {
	_inherits(QuoteSection, _React$Component7);

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
						{ id: 'landing-page-quote-section-sub', style: { color: "#424242", letterSpacing: ".5px", fontSize: "23px", marginBottom: "10px" } },
						'"Mind Maps are the Meta-language of the human race"'
					),
					_react2.default.createElement(
						'div',
						{ style: { color: "#424242", fontSize: "18px" } },
						' -Tony Buzan'
					)
				),
				_react2.default.createElement(
					'div',
					{ id: 'mob-landing-page-quote-section', className: 'shown-xs', style: { textAlign: "center", paddingTop: "30px", paddingBottom: "40px" } },
					_react2.default.createElement(
						'div',
						{ id: 'landing-page-quote-section-sub', style: { color: "#424242", letterSpacing: ".5px", fontSize: "18px", marginBottom: "10px" } },
						'"Mind Maps are the Meta-language of the human race"'
					),
					_react2.default.createElement(
						'div',
						{ style: { color: "#424242", fontSize: "14px" } },
						' -Tony Buzan'
					)
				)
			);
		}
	}]);

	return QuoteSection;
}(_react2.default.Component);

;

var RegisterModal = function (_React$Component8) {
	_inherits(RegisterModal, _React$Component8);

	function RegisterModal(props) {
		_classCallCheck(this, RegisterModal);

		var _this17 = _possibleConstructorReturn(this, (RegisterModal.__proto__ || Object.getPrototypeOf(RegisterModal)).call(this, props));

		_this17.showModal = _this17.showModal.bind(_this17);
		_this17.hideModal = _this17.hideModal.bind(_this17);

		_this17.state = {
			email: ""
		};
		return _this17;
	}

	_createClass(RegisterModal, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(np) {
			if (np && np.show && !this.props.show) {
				this.showModal();
			} else if (!np.show && this.props.show) {
				this.hideModal();
			}
		}
	}, {
		key: 'showModal',
		value: function showModal() {
			this.refs.modal.show();
		}
	}, {
		key: 'hideModal',
		value: function hideModal() {
			this.refs.modal.hide();
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_DropModal2.default,
					{ ref: 'modal', onHide: this.props.hideRegisterModal },
					_react2.default.createElement(_register2.default, { externalInvite: this.props.externalInvite })
				)
			);
		}
	}]);

	return RegisterModal;
}(_react2.default.Component);

;

var RegisterEarlyAccess = function (_React$Component9) {
	_inherits(RegisterEarlyAccess, _React$Component9);

	function RegisterEarlyAccess(props) {
		_classCallCheck(this, RegisterEarlyAccess);

		var _this18 = _possibleConstructorReturn(this, (RegisterEarlyAccess.__proto__ || Object.getPrototypeOf(RegisterEarlyAccess)).call(this, props));

		_this18.showModal = _this18.showModal.bind(_this18);
		_this18.hideModal = _this18.hideModal.bind(_this18);
		_this18.isMailValid = _this18.isMailValid.bind(_this18);
		_this18.changeEmail = _this18.changeEmail.bind(_this18);
		_this18.send = _this18.send.bind(_this18);
		_this18.state = {
			email: "",
			validEmail: false
		};
		return _this18;
	}

	_createClass(RegisterEarlyAccess, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(np) {
			if (np && np.show && !this.props.show) {
				this.showModal();
			} else if (!np.show && this.props.show) {
				this.hideModal();
			}
		}
	}, {
		key: 'showModal',
		value: function showModal() {
			this.refs.modal.show();
		}
	}, {
		key: 'hideModal',
		value: function hideModal() {
			this.refs.modal.hide();
		}
	}, {
		key: 'isMailValid',
		value: function isMailValid(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}
	}, {
		key: 'changeEmail',
		value: function changeEmail() {
			var _this19 = this;

			var email = this.refs.email.value;
			var validEmail = email && this.isMailValid(email);
			this.setState(function (prevState) {
				return {
					email: _this19.refs.email.value,
					validEmail: validEmail
				};
			});
			// if(validEmail){
			// 	firebase.database().ref('emails/' + EncodeServices.encode(email)).once("value", (snap) => {
			// 		this.setState((prevState) => ({
			//     mailTaken : !!snap.val()
			//   }));
			// 	}, (error) => {
			// 		console.log("error", error);
			// 	});
			// }
		}
	}, {
		key: 'send',
		value: function send() {
			ga('send', {
				hitType: 'event',
				eventCategory: "early access modal page",
				eventAction: "clicked on free early access",
				eventLabel: ""
			});
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (this.state.email && this.state.validEmail) {
				var code = this.props.generateAccessCode();
				firebase.database().ref("prospects").push({
					email: this.state.email,
					date: new Date().getTime(),
					code: code
				});
				this.props.sendPropsectMail(this.state.email, code);
				this.props.hideEarlyAccessModal();
				swal("Thank You", "We are glad to count you in !", "success");
			}
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var _this20 = this;

			if (this.props.show && !this.state.tippy) {
				this.setState({
					tippy: true
				}, function () {
					new Tippy('.tippyearlyaccess', {
						position: 'bottom',
						animation: 'shift',
						duration: 200,
						arrow: true
					});
					_this20.refs.email.focus();
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ id: 'early-access-modal-wrapper' },
				_react2.default.createElement(
					_DropModal2.default,
					{ ref: 'modal', onHide: this.props.hideEarlyAccessModal },
					_react2.default.createElement(
						'div',
						{ style: { color: "#424242" } },
						_react2.default.createElement(
							'h2',
							{ style: { textAlign: "center", paddingTop: "30px", paddingBottom: "30px" } },
							'Get Free Early Access'
						),
						_react2.default.createElement(
							'p',
							{ style: { paddingLeft: "50px", paddingRight: "50px" } },
							'Join us now and get an early access to Magnesia as well as a month as a premium user !'
						),
						',',
						_react2.default.createElement(
							'div',
							{ style: { width: "195px", marginLeft: "auto", marginRight: "auto" } },
							_react2.default.createElement('img', { style: { verticalAlign: "middle", maxWidth: "50px", marginRight: "auto", marginLeft: "auto", display: "inline-block" }, src: '../assets/images/eac-hourglass.svg' }),
							_react2.default.createElement(
								'div',
								{ style: { verticalAlign: "middle", display: "inline-block", fontSize: "25px", marginLeft: "40px", marginRight: "40px" } },
								'+'
							),
							_react2.default.createElement('img', { style: { verticalAlign: "middle", maxWidth: "50px", marginRight: "auto", marginLeft: "auto", display: "inline-block" }, src: '../assets/images/eac-diamond.svg' })
						),
						_react2.default.createElement(
							'div',
							{ style: { width: "265px", marginLeft: "auto", marginRight: "auto", fontSize: "14px", marginTop: "10px", marginBottom: "20px" } },
							_react2.default.createElement(
								'div',
								{ style: { textAlign: "center", verticalAlign: "middle", width: "50%", display: "inline-block" } },
								'Early Access'
							),
							_react2.default.createElement(
								'div',
								{ style: { textAlign: "center", verticalAlign: "middle", width: "50%", display: "inline-block" } },
								'Premium Month'
							)
						),
						_react2.default.createElement('input', { className: "reg-inp " + (this.state.validEmail ? "validated" : ""), ref: 'email', type: 'email', value: this.state.email, onChange: this.changeEmail, placeholder: 'Email Address' }),
						_react2.default.createElement(
							'div',
							{ className: 'eam-email-wrapper' },
							_react2.default.createElement(
								'div',
								{ style: { color: "#9C27B0", fontSize: "13px", marginTop: "-55px", marginRight: "30px", float: "right", display: this.state.validEmail ? "block" : "none" } },
								_react2.default.createElement(
									'span',
									{ className: 'eam-email-wrapper-inner' },
									'valid email'
								),
								' \u2714'
							),
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "13px", marginTop: "-55px", marginRight: "30px", float: "right", display: this.state.validEmail ? "none" : "block" } },
								_react2.default.createElement(
									'span',
									{ className: 'eam-email-wrapper-inner' },
									'invalid email'
								),
								' \u2715'
							)
						),
						_react2.default.createElement(
							'div',
							{ onClick: this.send },
							_react2.default.createElement(
								'div',
								{ title: 'Please enter a valid email address', className: 'tippyearlyaccess disabled-fac-button', onClick: this.props.showEarlyAccessModal, style: { display: this.state.validEmail ? "none" : "block", border: "1px solid #9C27B0", padding: "10px", letterSpacing: "1px", cursor: "pointer", fontWeight: "100", color: "#9C27B0", textAlign: "center", marginLeft: "auto", marginRight: "auto", marginBottom: "50px", fontSize: "16px", width: "250px", borderRadius: "4px" } },
								'\u276F Free Early Access'
							),
							_react2.default.createElement(
								'div',
								{ title: 'Claim your early acces code !', className: 'tippyearlyaccess', onClick: this.props.showEarlyAccessModal, style: { display: this.state.validEmail ? "block" : "none", border: "1px solid #9C27B0", padding: "10px", letterSpacing: "1px", cursor: "pointer", fontWeight: "100", color: "#9C27B0", textAlign: "center", marginLeft: "auto", marginRight: "auto", marginBottom: "50px", fontSize: "16px", width: "250px", borderRadius: "4px" } },
								'\u276F Free Early Access'
							)
						)
					)
				)
			);
		}
	}]);

	return RegisterEarlyAccess;
}(_react2.default.Component);

;

exports.default = LandingPage;
