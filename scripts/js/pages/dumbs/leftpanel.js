'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _deletebutton = require('./deletebutton');

var _deletebutton2 = _interopRequireDefault(_deletebutton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftPanel = function (_React$Component) {
	_inherits(LeftPanel, _React$Component);

	function LeftPanel(props) {
		_classCallCheck(this, LeftPanel);

		var _this = _possibleConstructorReturn(this, (LeftPanel.__proto__ || Object.getPrototypeOf(LeftPanel)).call(this, props));

		_this.state = {
			nav: 0
		};
		return _this;
	}

	_createClass(LeftPanel, [{
		key: 'componentWillMount',
		value: function componentWillMount() {}
	}, {
		key: 'componentWillUnMount',
		value: function componentWillUnMount() {}
	}, {
		key: 'selectNav',
		value: function selectNav(nav) {
			this.setState({
				nav: nav
			});
		}
	}, {
		key: 'render',
		value: function render() {

			var dom = null,
			    title = "";
			var nodeSelected = !(this.props.selectedNode === undefined || this.props.selectedNode === null);
			if (!nodeSelected && this.state.nav == 1) this.state.nav = 0;
			var subSpace = window.innerHeight - (76 + 40 + 42);
			switch (this.state.nav) {
				case 0:
					dom = _react2.default.createElement(NodeTree, { map: this.props.map,
						selectedNode: this.props.selectedNode, selectNode: this.props.selectNode,
						selectedLink: this.props.selectedLink, selectLink: this.props.selectLink,
						deleteSelectedNode: this.props.deleteSelectedNode,
						deleteLink: this.props.deleteLink });
					title = "Navigation Tree";
					break;
				case 1:
					dom = _react2.default.createElement(NodeDetails, { map: this.props.map,
						changeNodeText: this.props.changeNodeText, changeNodeDescription: this.props.changeNodeDescription,
						selectedNode: this.props.selectedNode, selectNode: this.props.selectNode,
						changeNodeScale: this.props.changeNodeScale });
					title = "Node Details";
					break;
				case 2:
					title = "Messages";
					dom = _react2.default.createElement(MessageBlock, { vspace: subSpace, map: this.props.map, sendMessage: this.props.sendMessage });
					break;
				case 3:
					title = "Logs";
					dom = _react2.default.createElement(LogsBlock, null);
					break;
			}

			return _react2.default.createElement(
				'div',
				{ id: 'left-panel' },
				_react2.default.createElement(
					'div',
					{ id: 'logo' },
					'Mg.'
				),
				_react2.default.createElement(
					'div',
					{ className: '' },
					_react2.default.createElement(
						'div',
						{ className: 'flex' },
						_react2.default.createElement(
							'div',
							{ onClick: this.selectNav.bind(this, 0), className: this.state.nav == 0 ? "left-panel-nav-selected" : "left-panel-nav", style: { cursor: "pointer" } },
							_react2.default.createElement('img', { style: { marginTop: "10px", display: "block", marginLeft: "auto", marginRight: "auto" }, src: "../assets/images/" + (this.state.nav == 0 ? "tree.svg" : "tree-white.svg") })
						),
						_react2.default.createElement(
							'div',
							{ onClick: nodeSelected ? this.selectNav.bind(this, 1) : null, className: this.state.nav == 1 ? "left-panel-nav-selected" : "left-panel-nav", style: { cursor: nodeSelected ? "pointer" : "not-allowed" } },
							_react2.default.createElement('img', { style: { marginTop: "10px", display: "block", marginLeft: "auto", marginRight: "auto", opacity: nodeSelected ? "1" : ".5" }, src: "../assets/images/" + (this.state.nav == 1 ? "node.svg" : "node-white.svg") })
						),
						_react2.default.createElement(
							'div',
							{ onClick: this.selectNav.bind(this, 2), className: this.state.nav == 2 ? "left-panel-nav-selected" : "left-panel-nav", style: { cursor: "pointer" } },
							_react2.default.createElement('img', { style: { marginTop: "10px", display: "block", marginLeft: "auto", marginRight: "auto" }, src: "../assets/images/" + (this.state.nav == 2 ? "chat.svg" : "chat-white.svg") })
						),
						_react2.default.createElement(
							'div',
							{ onClick: this.selectNav.bind(this, 3), className: this.state.nav == 3 ? "left-panel-nav-selected" : "left-panel-nav", style: { cursor: "pointer" } },
							_react2.default.createElement('img', { style: { marginTop: "10px", display: "block", marginLeft: "auto", marginRight: "auto" }, src: "../assets/images/" + (this.state.nav == 3 ? "logs.svg" : "logs-white.svg") })
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'left-panel-title' },
					title
				),
				_react2.default.createElement(
					'div',
					{ style: { padding: "10px" } },
					dom
				)
			);
		}
	}]);

	return LeftPanel;
}(_react2.default.Component);

;

exports.default = LeftPanel;

var NodeTree = function (_React$Component2) {
	_inherits(NodeTree, _React$Component2);

	function NodeTree() {
		_classCallCheck(this, NodeTree);

		return _possibleConstructorReturn(this, (NodeTree.__proto__ || Object.getPrototypeOf(NodeTree)).apply(this, arguments));
	}

	_createClass(NodeTree, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var domNodes = [];
			if (this.props.map && this.props.map.nodes) {
				domNodes = this.props.map.nodes.map(function (n, ind) {
					return n && (n.nid || n.nid == 0) ? _react2.default.createElement(NodeLine, { key: "key-lp-node-line-" + n.nid, nodes: _this3.props.map.nodes,
						links: _this3.props.map.links, selectedLink: _this3.props.selectedLink, selectLink: _this3.props.selectLink,
						node: n, selectedNode: _this3.props.selectedNode, selectNode: _this3.props.selectNode,
						deleteSelectedNode: _this3.props.deleteSelectedNode,
						deleteLink: _this3.props.deleteLink }) : null;
				});
			}
			return _react2.default.createElement(
				'div',
				null,
				domNodes
			);
		}
	}]);

	return NodeTree;
}(_react2.default.Component);

;

var NodeLine = function (_React$Component3) {
	_inherits(NodeLine, _React$Component3);

	function NodeLine(props) {
		_classCallCheck(this, NodeLine);

		var _this4 = _possibleConstructorReturn(this, (NodeLine.__proto__ || Object.getPrototypeOf(NodeLine)).call(this, props));

		_this4.selectNode = _this4.selectNode.bind(_this4);
		_this4.deleteNode = _this4.deleteNode.bind(_this4);
		_this4.state = {};
		return _this4;
	}

	_createClass(NodeLine, [{
		key: 'selectNode',
		value: function selectNode() {
			this.props.selectNode(this.props.node.nid);
		}
	}, {
		key: 'deleteNode',
		value: function deleteNode(e) {
			e.stopPropagation();
			this.props.deleteSelectedNode(this.props.node.nid);
		}
	}, {
		key: 'render',
		value: function render() {
			var selected = this.props.selectedNode == this.props.node.nid;
			var domLinks = [];
			if (this.props.links && selected) {
				for (var i = 0; i < this.props.links.length; i++) {
					var link = this.props.links[i];
					if (link && link.nodes && link.nodes[this.props.node.nid]) {
						domLinks.push(_react2.default.createElement(LinkLine, { key: "key-node-" + this.props.node.nid + "-link-" + i, link: link, nodes: this.props.nodes,
							selectedNode: this.props.selectedNode, selectedLink: this.props.selectedLink, selectLink: this.props.selectLink,
							deleteLink: this.props.deleteLink }));
					}
				}
			}
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ onClick: this.selectNode, className: selected ? "selected-node-line" : "node-line" },
					_react2.default.createElement('div', { className: 'arrow-right v-align-middle inline-block' }),
					_react2.default.createElement(
						'span',
						{ className: 'v-align-middle', style: { marginLeft: selected ? "4px" : "5px" } },
						this.props.node.title
					),
					_react2.default.createElement(_deletebutton2.default, { label: 'delete', action: this.deleteNode })
				),
				_react2.default.createElement(
					'div',
					null,
					domLinks
				),
				_react2.default.createElement(
					'div',
					{ style: { opacity: ".5", marginLeft: "10px", marginTop: "3px", marginBottom: "3px" }, className: !selected || domLinks && domLinks.length ? "hide" : "" },
					_react2.default.createElement('div', { style: { display: "inline-block", verticalAlign: "middle" }, className: 'tiny-sphere' }),
					_react2.default.createElement(
						'div',
						{ style: { display: "inline-block", verticalAlign: "middle", marginLeft: "3px" } },
						'no link'
					)
				)
			);
		}
	}]);

	return NodeLine;
}(_react2.default.Component);

;

var LinkLine = function (_React$Component4) {
	_inherits(LinkLine, _React$Component4);

	function LinkLine(props) {
		_classCallCheck(this, LinkLine);

		var _this5 = _possibleConstructorReturn(this, (LinkLine.__proto__ || Object.getPrototypeOf(LinkLine)).call(this, props));

		_this5.selectLink = _this5.selectLink.bind(_this5);
		_this5.deleteLink = _this5.deleteLink.bind(_this5);
		_this5.state = {};
		return _this5;
	}

	_createClass(LinkLine, [{
		key: 'selectLink',
		value: function selectLink() {
			this.props.selectLink(this.props.link);
		}
	}, {
		key: 'deleteLink',
		value: function deleteLink(e) {
			e.stopPropagation();
			var link = this.props.link;
			var nkeys = link && link.nodes ? Object.keys(link.nodes).join("") : null;
			if (nkeys) this.props.deleteLink(nkeys);
		}
	}, {
		key: 'render',
		value: function render() {
			var link = this.props.link;
			var nkeys = link && link.nodes ? Object.keys(link.nodes) : [];
			var selected = !!(link.nodes && this.props.selectedLink && this.props.selectedLink == nkeys.join(""));
			var targetNid = 0;
			if (nkeys.length) {
				if (nkeys[0] == this.props.selectedNode) targetNid = nkeys[1];else targetNid = nkeys[0];
			}

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ onClick: this.selectLink, className: selected ? "selected-link-line" : "link-line" },
					_react2.default.createElement(
						'div',
						{ className: 'arrow-right v-align-middle inline-block' },
						'\u2014'
					),
					_react2.default.createElement(
						'span',
						{ className: 'v-align-middle', style: { marginLeft: "5px" } },
						this.props.nodes && this.props.nodes[targetNid] ? this.props.nodes[targetNid].title : ""
					),
					_react2.default.createElement(_deletebutton2.default, { label: 'unlink', action: this.deleteLink })
				)
			);
		}
	}]);

	return LinkLine;
}(_react2.default.Component);

;

var NodeDetails = function (_React$Component5) {
	_inherits(NodeDetails, _React$Component5);

	function NodeDetails(props) {
		_classCallCheck(this, NodeDetails);

		var _this6 = _possibleConstructorReturn(this, (NodeDetails.__proto__ || Object.getPrototypeOf(NodeDetails)).call(this, props));

		_this6.deleteNode = _this6.deleteNode.bind(_this6);
		_this6.changeText = _this6.changeText.bind(_this6);
		_this6.changeDescription = _this6.changeDescription.bind(_this6);
		_this6.appl = _this6.appl.bind(_this6);
		_this6.okd = _this6.okd.bind(_this6);
		_this6.appl2 = _this6.appl2.bind(_this6);
		_this6.changeNodeScale = _this6.changeNodeScale.bind(_this6);

		var node = _this6.props.map && _this6.props.map.nodes && _this6.props.selectedNode !== undefined && _this6.props.map.nodes[_this6.props.selectedNode];

		_this6.state = {
			text: node ? node.title : "",
			description: node ? node.description : ""
		};
		return _this6;
	}

	_createClass(NodeDetails, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(np) {
			var node = np.map && np.map.nodes && np.selectedNode !== undefined && np.map.nodes[np.selectedNode];
			if (node.title !== this.state.text) {
				this.setState({
					text: node.title
				});
			}
		}
	}, {
		key: 'deleteNode',
		value: function deleteNode(e) {
			e.stopPropagation();
			this.props.deleteSelectedNode(this.props.node.nid);
		}
	}, {
		key: 'changeText',
		value: function changeText(e) {
			this.setState({
				text: e.target.value
			});
		}
	}, {
		key: 'changeDescription',
		value: function changeDescription(e) {
			this.setState({
				description: e.target.value
			}, function () {
				var el = this.refs.lpnodedescription;
				setTimeout(function () {
					var baseCss = "text-align: center; font-size: 12px; background-color: inherit; border-top: none; border-right: none; border-bottom: 1px solid black; border-left: none; border-image: initial;resize: none;";
					el.style.cssText = baseCss + 'height:auto; padding:0';
					el.style.cssText = baseCss + 'height:' + el.scrollHeight + 'px';
				}, 0);
			});
		}
	}, {
		key: 'okd',
		value: function okd(e) {
			if (e.keyCode == 13 && this.state.text) this.appl();
		}
	}, {
		key: 'appl',
		value: function appl() {
			this.props.changeNodeText(this.props.selectedNode, this.state.text);
			this.refs.lpnodeinput.blur();
		}
	}, {
		key: 'appl2',
		value: function appl2() {
			this.props.changeNodeDescription(this.props.selectedNode, this.state.description);
			this.refs.lpnodedescription.blur();
		}
	}, {
		key: 'changeNodeScale',
		value: function changeNodeScale(scale) {
			this.props.changeNodeScale(this.props.selectedNode, scale);
		}
	}, {
		key: 'render',
		value: function render() {
			var node = this.props.map && this.props.map.nodes && this.props.selectedNode !== undefined && this.props.map.nodes[this.props.selectedNode];
			if (!node) return null;
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h3',
						null,
						'Text'
					),
					_react2.default.createElement(
						'div',
						{ className: 'flex' },
						_react2.default.createElement(
							'div',
							{ className: 'flex-grow-1' },
							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement('input', { ref: 'lpnodeinput', className: 'no-outline', style: { textAlign: "center", fontSize: "12px", backgroundColor: "inherit", border: "none", borderBottom: "solid 1px black" },
									onKeyDown: this.okd, value: this.state.text, onChange: this.changeText, placeholder: "node's text" })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'flex-grow-0' },
							_react2.default.createElement(
								'div',
								{ onClick: this.appl, className: "hover-toggle " + (this.state.text == node.title ? "" : "hover-active"), style: { width: "50px", paddingLeft: "5px", fontSize: "12px", cursor: "pointer" } },
								'\u2713 apply'
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h3',
						null,
						'Details'
					),
					_react2.default.createElement(
						'div',
						{ className: 'flex' },
						_react2.default.createElement(
							'div',
							{ className: 'flex-grow-1' },
							_react2.default.createElement(
								'div',
								null,
								_react2.default.createElement('textarea', { rows: '1', ref: 'lpnodedescription', className: 'no-outline', style: { textAlign: "center", fontSize: "12px", backgroundColor: "inherit", border: "none", borderBottom: "solid 1px black", resize: "none" },
									value: this.state.description, onChange: this.changeDescription, placeholder: "node's description" })
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'flex-grow-0' },
							_react2.default.createElement(
								'div',
								{ onClick: this.appl2, className: "hover-toggle " + (this.state.description == node.description ? "" : "hover-active"), style: { width: "50px", paddingLeft: "5px", fontSize: "12px", cursor: "pointer" } },
								'\u2713 apply'
							)
						)
					)
				),
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h3',
						null,
						'Scale'
					),
					_react2.default.createElement(
						'div',
						{ className: 'flex' },
						_react2.default.createElement(
							'div',
							{ onClick: this.changeNodeScale.bind(this, 0.5), className: 'flex-grow-1 scale-wrapper' },
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "12px", textAlign: "center" } },
								'small'
							),
							_react2.default.createElement('div', { className: "scale-05 " + (node && node.scale == 0.5 ? "selected-scale" : "") })
						),
						_react2.default.createElement(
							'div',
							{ onClick: this.changeNodeScale.bind(this, 1), className: 'flex-grow-1 scale-wrapper' },
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "12px", textAlign: "center" } },
								'normal'
							),
							_react2.default.createElement('div', { className: "scale-1 " + (node && node.scale == 1 ? "selected-scale" : "") })
						),
						_react2.default.createElement(
							'div',
							{ onClick: this.changeNodeScale.bind(this, 2), className: 'flex-grow-1 scale-wrapper' },
							_react2.default.createElement(
								'div',
								{ style: { fontSize: "12px", textAlign: "center" } },
								'large'
							),
							_react2.default.createElement('div', { className: "scale-2 " + (node && node.scale == 2 ? "selected-scale" : "") })
						)
					)
				)
			);
		}
	}]);

	return NodeDetails;
}(_react2.default.Component);

;

var MessageBlock = function (_React$Component6) {
	_inherits(MessageBlock, _React$Component6);

	function MessageBlock(props) {
		_classCallCheck(this, MessageBlock);

		var _this7 = _possibleConstructorReturn(this, (MessageBlock.__proto__ || Object.getPrototypeOf(MessageBlock)).call(this, props));

		_this7.changePrompt = _this7.changePrompt.bind(_this7);
		_this7.send = _this7.send.bind(_this7);
		_this7.okd = _this7.okd.bind(_this7);
		_this7.state = {};
		return _this7;
	}

	_createClass(MessageBlock, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.refs.prompt.focus();
			var el = this.refs.messages;
			if (el) el.scrollTop = el.scrollHeight;
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			var el = this.refs.messages;
			if (el) el.scrollTop = el.scrollHeight;
		}
	}, {
		key: 'changePrompt',
		value: function changePrompt(e) {
			this.setState({
				prompt: e.target.value
			}, function () {
				var el = this.refs.prompt;
				setTimeout(function () {
					var baseCss = "width:98%;text-align: center; font-size: 12px; background-color: inherit; border-top: none; border-right: none; border-bottom: 1px solid black; border-left: none; border-image: initial;resize: none;";
					el.style.cssText = baseCss + 'height:auto; padding:0';
					el.style.cssText = baseCss + 'height:' + el.scrollHeight + 'px';
				}, 0);
			});
		}
	}, {
		key: 'okd',
		value: function okd(e) {
			if (e.keyCode == 13 && this.state.prompt) {
				e.stopPropagation();
				e.preventDefault();
				this.send();
			}
		}
	}, {
		key: 'send',
		value: function send() {
			this.props.sendMessage(this.state.prompt);
			this.setState({
				prompt: ''
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var msgs = [];
			if (this.props.map.messages) {
				for (var mid in this.props.map.messages) {
					msgs.push(_react2.default.createElement(MessageLine, { key: "key-msg-" + mid, message: this.props.map.messages[mid] }));
				}
			}
			var headerHeight = 41;
			var headerNode = this.refs.msgactionwrapper;
			if (headerNode) {
				headerHeight = headerNode.offsetHeight;
			}

			var msgHeight = this.props.vspace - 40 - headerHeight;
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					{ ref: 'msgactionwrapper' },
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement('textarea', { ref: 'prompt', rows: '1', onKeyDown: this.okd, className: 'no-outline', style: { width: "98%", textAlign: "center", fontSize: "12px", backgroundColor: "inherit", border: "none", borderBottom: "solid 1px black", resize: "none" },
								value: this.state.prompt, onChange: this.changePrompt, placeholder: "message..." })
						)
					),
					_react2.default.createElement(
						'div',
						{ style: { height: "17px" } },
						_react2.default.createElement(
							'div',
							{ onClick: this.state.prompt ? this.send : null, className: "hover-toggle " + (this.state.prompt ? "hover-active" : ""), style: { marginBottom: "5px", marginTop: "5px", fontSize: "14px", cursor: this.state.prompt ? "pointer" : "default", textAlign: "center" } },
							'\u2712 send'
						)
					)
				),
				_react2.default.createElement(
					'div',
					{ ref: 'messages', style: { overflow: "scroll", height: msgHeight + "px" } },
					msgs
				)
			);
		}
	}]);

	return MessageBlock;
}(_react2.default.Component);

;

var MessageLine = function (_React$Component7) {
	_inherits(MessageLine, _React$Component7);

	function MessageLine() {
		_classCallCheck(this, MessageLine);

		return _possibleConstructorReturn(this, (MessageLine.__proto__ || Object.getPrototypeOf(MessageLine)).apply(this, arguments));
	}

	_createClass(MessageLine, [{
		key: 'render',
		value: function render() {
			var time = this.props.message && this.props.message.timestamp ? this.props.message.timestamp : null;
			if (time) {
				var t = new Date(time),
				    now = new Date();
				if (t.getDate() == now.getDate() && t.getMonth() == now.getMonth() && t.getFullYear() == now.getFullYear()) {
					time = t.getHours() + ":" + (t.getMinutes() < 10 ? '0' : '') + t.getMinutes();
				} else {
					var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
					time = t.getDate() + " " + months[t.getMonth()] + " " + (t.getFullYear() - 2000);
				}
			}

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h4',
						{ style: { fontSize: "15px", marginBottom: "0px" } },
						this.props.message.name
					),
					_react2.default.createElement(
						'div',
						{ style: { fontSize: "11px", textAlign: "right" } },
						time
					)
				),
				_react2.default.createElement(
					'div',
					{ style: { fontSize: "13px" } },
					this.props.message.content
				)
			);
		}
	}]);

	return MessageLine;
}(_react2.default.Component);

;

var LogsBlock = function (_React$Component8) {
	_inherits(LogsBlock, _React$Component8);

	function LogsBlock() {
		_classCallCheck(this, LogsBlock);

		return _possibleConstructorReturn(this, (LogsBlock.__proto__ || Object.getPrototypeOf(LogsBlock)).apply(this, arguments));
	}

	_createClass(LogsBlock, [{
		key: 'render',
		value: function render() {

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ style: { marginTop: "20px", marginBottom: "20px", textAlign: "center", fontSize: "22px" } },
						'Area under'
					),
					_react2.default.createElement('img', { style: { width: "70px", display: "block", marginLeft: "auto", marginRight: "auto" }, src: '../assets/images/construction.svg' }),
					_react2.default.createElement(
						'div',
						{ style: { marginTop: "20px", textAlign: "center", fontSize: "22px" } },
						'construction'
					)
				)
			);
		}
	}]);

	return LogsBlock;
}(_react2.default.Component);

;
