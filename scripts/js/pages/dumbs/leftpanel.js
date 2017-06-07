'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _deletebutton = require('./deletebutton');

var _deletebutton2 = _interopRequireDefault(_deletebutton);

var _fullbutton = require('./fullbutton');

var _fullbutton2 = _interopRequireDefault(_fullbutton);

var _drawing = require('../../properties/drawing');

var _drawing2 = _interopRequireDefault(_drawing);

var _auth = require('../../services/auth');

var _auth2 = _interopRequireDefault(_auth);

var _manageusers = require('./manageusers');

var _DropModal = require('boron/DropModal');

var _DropModal2 = _interopRequireDefault(_DropModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LeftPanel = function (_React$Component) {
	_inherits(LeftPanel, _React$Component);

	function LeftPanel(props) {
		_classCallCheck(this, LeftPanel);

		var _this = _possibleConstructorReturn(this, (LeftPanel.__proto__ || Object.getPrototypeOf(LeftPanel)).call(this, props));

		_this.backToMyMaps = _this.backToMyMaps.bind(_this);
		_this.resetTutorial = _this.resetTutorial.bind(_this);
		_this.minimizeOrExpand = _this.minimizeOrExpand.bind(_this);
		_this.changeMode = _this.changeMode.bind(_this);
		_this.printWindow = _this.printWindow.bind(_this);
		_this.showInviteModal = _this.showInviteModal.bind(_this);
		_this.hideInviteModal = _this.hideInviteModal.bind(_this);

		_this.state = {
			nav: 0,
			minimize: false,
			showManageUserModal: false
		};
		return _this;
	}

	_createClass(LeftPanel, [{
		key: 'componentWillMount',
		value: function componentWillMount() {}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			new Tippy('.tippyleftpanel', {
				position: 'right',
				animation: 'shift',
				duration: 200,
				arrow: true
			});
		}
	}, {
		key: 'componentWillUnMount',
		value: function componentWillUnMount() {}
	}, {
		key: 'minimizeOrExpand',
		value: function minimizeOrExpand() {
			var _this2 = this;

			this.setState({
				minimize: !this.state.minimize
			}, function () {
				_this2.props.resizeSvg();
			});
		}
	}, {
		key: 'selectNav',
		value: function selectNav(nav) {
			this.setState({
				nav: nav,
				minimize: false
			});
		}
	}, {
		key: 'backToMyMaps',
		value: function backToMyMaps() {
			this.props.selectNode(null, function () {
				_reactRouter.browserHistory.push('/maps');
			});
		}
	}, {
		key: 'resetTutorial',
		value: function resetTutorial() {
			this.props.user.resetTutorial(_auth2.default.getUid());
		}
	}, {
		key: 'changeMode',
		value: function changeMode(mode) {
			this.props.changeMode(mode);
		}
	}, {
		key: 'printWindow',
		value: function printWindow() {
			window.print();
		}
	}, {
		key: 'hideInviteModal',
		value: function hideInviteModal() {
			console.log("hideInviteModal");
			this.refs.manageusermodal.hide();
			this.setState({
				showManageUserModal: false
			});
		}
	}, {
		key: 'showInviteModal',
		value: function showInviteModal() {
			console.log("showInviteModal");
			console.log(this.refs.manageusermodal);
			this.refs.manageusermodal.show();
			this.setState({
				showManageUserModal: true
			});
		}
	}, {
		key: 'render',
		value: function render() {

			var dom = null,
			    title = "";
			var nodeSelected = !(this.props.selectedNode === undefined || this.props.selectedNode === null);
			if (!nodeSelected && this.state.nav == 1) this.state.nav = 0;
			var subSpace = window.innerHeight - 65;
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
						changeNodeColor: this.props.changeNodeColor,
						changeNodeBcgColor: this.props.changeNodeBcgColor,
						changeNodeBorderColor: this.props.changeNodeBorderColor,
						changeNodeText: this.props.changeNodeText, changeNodeDescription: this.props.changeNodeDescription,
						selectedNode: this.props.selectedNode, selectNode: this.props.selectNode,
						deleteSelectedNode: this.props.deleteSelectedNode,
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

			var ls = !this.state.minimize ? _react2.default.createElement(
				'div',
				null,
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
			) : null;

			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					_DropModal2.default,
					{ ref: 'manageusermodal', onHide: this.hideInviteModal },
					_react2.default.createElement(
						'div',
						{ style: { paddingLeft: "30px", paddingRight: "30px", marginTop: "20px", marginBottom: "20px", display: "flex" } },
						_react2.default.createElement(
							'div',
							{ style: { flexGrow: 1 } },
							_react2.default.createElement('hr', { style: { opacity: ".3", borderTop: "solid 1px #424242", borderBottom: "none" } })
						),
						_react2.default.createElement(
							'div',
							{ style: { flexGrow: 0, fontSize: "14px", paddingLeft: "10px", paddingRight: "10px" } },
							_react2.default.createElement(
								'div',
								null,
								'Manage Map Users'
							)
						),
						_react2.default.createElement(
							'div',
							{ style: { flexGrow: 1 } },
							_react2.default.createElement('hr', { style: { opacity: ".3", borderTop: "solid 1px #424242", borderBottom: "none" } })
						)
					),
					_react2.default.createElement(_manageusers.InnerManageUser, { map: this.props.map, user: this.props.user })
				),
				_react2.default.createElement(
					'div',
					{ id: 'left-panel-wrapper', ref: 'left-panel-wrapper', style: { width: this.state.minimize ? "auto" : "250px", height: "100%" }, className: 'flex-grow-0' },
					_react2.default.createElement(
						'div',
						{ id: 'left-panel' },
						_react2.default.createElement(
							'div',
							{ className: 'flex', style: { paddingTop: "10px", paddingBottom: "10px" } },
							_react2.default.createElement(
								'div',
								{ className: 'flex-grow-0', style: { paddingTop: "10px", paddingLeft: this.state.minimize ? "2px" : "10px", paddingRight: this.state.minimize ? "2px" : "10px" }, id: 'logo' },
								'Mg.'
							),
							_react2.default.createElement(
								'div',
								{ id: 'lp-node-block', className: 'flex-grow-1', style: { textAlign: "right", display: this.state.minimize ? "none" : "block" } },
								_react2.default.createElement(
									'div',
									{ title: 'create and modify nodes', className: "tippyleftpanel " + (this.props.mode === 1 ? "selected-mode-line" : "un-selected-mode-line"), onClick: this.changeMode.bind(this, 1) },
									_react2.default.createElement(
										'span',
										{ style: { verticalAlign: "middle" } },
										'Creation'
									),
									_react2.default.createElement('img', { style: { verticalAlign: "middle", marginLeft: "5px", marginRight: "5px", width: "30px", marginTop: "3px" }, src: "../assets/images/mode-creation" + (this.props.mode === 1 ? "-purple.svg" : ".svg") })
								),
								_react2.default.createElement(
									'div',
									{ title: 'create relations between nodes', className: "tippyleftpanel " + (this.props.mode === 2 ? "selected-mode-line" : "un-selected-mode-line"), onClick: this.changeMode.bind(this, 2) },
									_react2.default.createElement(
										'span',
										{ style: { verticalAlign: "middle" } },
										'Relation'
									),
									_react2.default.createElement('img', { style: { verticalAlign: "middle", marginLeft: "5px", marginRight: "5px", width: "30px", marginTop: "3px" }, src: "../assets/images/mode-relation" + (this.props.mode === 2 ? "-purple.svg" : ".svg") })
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'flex' },
							_react2.default.createElement(
								'div',
								{ className: 'flex-grow-0' },
								_react2.default.createElement(
									'div',
									{ style: { display: this.state.minimize ? "block" : "none" } },
									_react2.default.createElement(
										'div',
										{ title: 'create and modify nodes', className: "tippyleftpanel " + (this.props.mode === 1 ? "selected-mode-line" : "un-selected-mode-line"), onClick: this.changeMode.bind(this, 1) },
										_react2.default.createElement('img', { style: { cursor: "pointer", display: "block", marginLeft: "auto", marginRight: "auto", width: "20px", marginBottom: "10px" }, src: "../assets/images/mode-creation" + (this.props.mode === 1 ? "-purple.svg" : ".svg") })
									),
									_react2.default.createElement(
										'div',
										{ title: 'create relations between nodes', className: "tippyleftpanel " + (this.props.mode === 2 ? "selected-mode-line" : "un-selected-mode-line"), onClick: this.changeMode.bind(this, 2) },
										_react2.default.createElement('img', { style: { cursor: "pointer", display: "block", marginLeft: "auto", marginRight: "auto", width: "20px", marginBottom: "10px" }, src: "../assets/images/mode-relation" + (this.props.mode === 2 ? "-purple.svg" : ".svg") })
									)
								),
								_react2.default.createElement(
									'div',
									{ onClick: this.backToMyMaps, className: "left-panel-nav tippyleftpanel", title: 'back to my maps', style: { cursor: "pointer" } },
									_react2.default.createElement('img', { className: 'rotate-180', style: { display: "block", marginLeft: "auto", marginRight: "auto" }, src: '../assets/images/arrow-right-white.svg' })
								),
								_react2.default.createElement(
									'div',
									{ onClick: this.minimizeOrExpand, className: "left-panel-nav tippyleftpanel", title: 'minimize', style: { cursor: "pointer", display: this.state.minimize ? "none" : "block" } },
									_react2.default.createElement('img', { style: { display: "block", marginLeft: "auto", marginRight: "auto" }, src: '../assets/images/minimize-white.svg' })
								),
								_react2.default.createElement(
									'div',
									{ onClick: this.minimizeOrExpand, className: "left-panel-nav tippyleftpanel", title: 'expand', style: { cursor: "pointer", display: this.state.minimize ? "block" : "none" } },
									_react2.default.createElement('img', { style: { display: "block", marginLeft: "auto", marginRight: "auto" }, src: '../assets/images/expand-white.svg' })
								),
								_react2.default.createElement(
									'div',
									{ onClick: this.selectNav.bind(this, 0), className: "tippyleftpanel " + (!this.state.minimize && this.state.nav == 0 ? "left-panel-nav-selected" : "left-panel-nav"), title: 'navigation tree', style: { cursor: "pointer" } },
									_react2.default.createElement('img', { style: { display: "block", marginLeft: "auto", marginRight: "auto" }, src: "../assets/images/" + (!this.state.minimize && this.state.nav == 0 ? "tree.svg" : "tree-white.svg") })
								),
								_react2.default.createElement(
									'div',
									{ onClick: nodeSelected ? this.selectNav.bind(this, 1) : null, className: "tippyleftpanel " + (!this.state.minimize && this.state.nav == 1 ? "left-panel-nav-selected" : "left-panel-nav"), title: 'modify node', style: { cursor: nodeSelected ? "pointer" : "not-allowed" } },
									_react2.default.createElement('img', { style: { display: "block", marginLeft: "auto", marginRight: "auto", opacity: nodeSelected ? "1" : ".5" }, src: "../assets/images/" + (!this.state.minimize && this.state.nav == 1 ? "node.svg" : "node-white.svg") })
								),
								_react2.default.createElement(
									'div',
									{ onClick: this.selectNav.bind(this, 2), className: "tippyleftpanel " + (!this.state.minimize && this.state.nav == 2 ? "left-panel-nav-selected" : "left-panel-nav"), title: 'chat', style: { cursor: "pointer" } },
									_react2.default.createElement('img', { style: { display: "block", marginLeft: "auto", marginRight: "auto" }, src: "../assets/images/" + (!this.state.minimize && this.state.nav == 2 ? "chat.svg" : "chat-white.svg") })
								),
								_react2.default.createElement(
									'div',
									{ onClick: this.selectNav.bind(this, 3), className: "tippyleftpanel " + (!this.state.minimize && this.state.nav == 3 ? "left-panel-nav-selected" : "left-panel-nav"), title: 'logs', style: { cursor: "pointer", display: "none" } },
									_react2.default.createElement('img', { style: { display: "block", marginLeft: "auto", marginRight: "auto" }, src: "../assets/images/" + (!this.state.minimize && this.state.nav == 3 ? "logs.svg" : "logs-white.svg") })
								),
								_react2.default.createElement(
									'div',
									{ onClick: this.showInviteModal, className: 'tippyleftpanel left-panel-nav', title: 'manage users', style: { cursor: "pointer" } },
									_react2.default.createElement('img', { style: { display: "block", marginLeft: "auto", marginRight: "auto" }, src: '../assets/images/invite-white.svg' })
								),
								_react2.default.createElement(
									'div',
									{ onClick: this.printWindow, className: 'tippyleftpanel left-panel-nav', title: 'export', style: { cursor: "pointer" } },
									_react2.default.createElement('img', { style: { display: "block", marginLeft: "auto", marginRight: "auto" }, src: '../assets/images/export-white.svg' })
								),
								_react2.default.createElement(
									'div',
									{ onClick: this.resetTutorial, className: 'tippyleftpanel left-panel-nav', title: 'reset tutorials', style: { cursor: "pointer", display: this.props.user && this.props.user.advice ? "block" : "none" } },
									_react2.default.createElement('img', { style: { display: "block", marginLeft: "auto", marginRight: "auto" }, src: '../assets/images/graphic-white.svg' })
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'flex-grow-1' },
								ls
							)
						)
					)
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
			var _this4 = this;

			var domNodes = [];
			if (this.props.map && this.props.map.nodes) {
				domNodes = this.props.map.nodes.map(function (n, ind) {
					return n && (n.nid || n.nid == 0) ? _react2.default.createElement(NodeLine, { key: "key-lp-node-line-" + n.nid, nodes: _this4.props.map.nodes,
						links: _this4.props.map.links, selectedLink: _this4.props.selectedLink, selectLink: _this4.props.selectLink,
						node: n, selectedNode: _this4.props.selectedNode, selectNode: _this4.props.selectNode,
						deleteSelectedNode: _this4.props.deleteSelectedNode,
						deleteLink: _this4.props.deleteLink }) : null;
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

		var _this5 = _possibleConstructorReturn(this, (NodeLine.__proto__ || Object.getPrototypeOf(NodeLine)).call(this, props));

		_this5.selectNode = _this5.selectNode.bind(_this5);
		_this5.deleteNode = _this5.deleteNode.bind(_this5);
		_this5.state = {};
		return _this5;
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
						'div',
						{ className: 'v-align-middle', style: { maxWidth: "100px", overflow: "hidden", display: "inline-block", marginLeft: selected ? "4px" : "5px" } },
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

		var _this6 = _possibleConstructorReturn(this, (LinkLine.__proto__ || Object.getPrototypeOf(LinkLine)).call(this, props));

		_this6.selectLink = _this6.selectLink.bind(_this6);
		_this6.deleteLink = _this6.deleteLink.bind(_this6);
		_this6.state = {};
		return _this6;
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
						'div',
						{ className: 'v-align-middle', style: { display: "inline-block", maxWidth: "100px", overflow: "hidden", marginLeft: "5px" } },
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

		var _this7 = _possibleConstructorReturn(this, (NodeDetails.__proto__ || Object.getPrototypeOf(NodeDetails)).call(this, props));

		_this7.deleteNode = _this7.deleteNode.bind(_this7);
		_this7.changeText = _this7.changeText.bind(_this7);
		_this7.changeDescription = _this7.changeDescription.bind(_this7);
		_this7.appl = _this7.appl.bind(_this7);
		_this7.okd = _this7.okd.bind(_this7);
		_this7.appl2 = _this7.appl2.bind(_this7);
		_this7.changeNodeScale = _this7.changeNodeScale.bind(_this7);
		_this7.changeNodeColor = _this7.changeNodeColor.bind(_this7);
		_this7.changeNodeBcgColor = _this7.changeNodeBcgColor.bind(_this7);
		_this7.changeNodeBorderColor = _this7.changeNodeBorderColor.bind(_this7);

		var node = _this7.props.map && _this7.props.map.nodes && _this7.props.selectedNode !== undefined && _this7.props.map.nodes[_this7.props.selectedNode];

		_this7.state = {
			text: node ? node.title : "",
			description: node ? node.description : "",
			showColor: 2
		};
		return _this7;
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
			var node = this.props.map && this.props.map.nodes && this.props.selectedNode !== undefined && this.props.map.nodes[this.props.selectedNode];
			this.props.deleteSelectedNode(node.nid);
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
		key: 'changeNodeColor',
		value: function changeNodeColor(color) {
			this.props.changeNodeColor(color);
		}
	}, {
		key: 'changeNodeBcgColor',
		value: function changeNodeBcgColor(color) {
			this.props.changeNodeBcgColor(color);
		}
	}, {
		key: 'changeNodeBorderColor',
		value: function changeNodeBorderColor(color) {
			this.props.changeNodeBorderColor(color);
		}
	}, {
		key: 'changeShowColor',
		value: function changeShowColor(showColor) {
			this.setState({
				showColor: showColor
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var node = this.props.map && this.props.map.nodes && this.props.selectedNode !== undefined && this.props.map.nodes[this.props.selectedNode];
			var textColors = [],
			    bcgColors = [],
			    borderColors = [],
			    currentText = [],
			    currentBcg = [],
			    currentBorder = [];
			for (var i = 0; i < _drawing2.default.colors.length; i++) {

				currentText.push(_react2.default.createElement(
					'div',
					{ className: 'flex-grow-1', key: "text-color-key-" + i },
					_react2.default.createElement('div', { onClick: this.changeNodeColor.bind(this, _drawing2.default.colors[i]), style: { backgroundColor: _drawing2.default.colors[i], height: "20px", cursor: "pointer", border: "solid 2px " + (node.color == _drawing2.default.colors[i] ? "white" : _drawing2.default.colors[i]) } })
				));
				currentBcg.push(_react2.default.createElement(
					'div',
					{ className: 'flex-grow-1', key: "bcg-color-key-" + i },
					_react2.default.createElement('div', { onClick: this.changeNodeBcgColor.bind(this, _drawing2.default.colors[i]), style: { backgroundColor: _drawing2.default.colors[i], height: "20px", cursor: "pointer", border: "solid 2px " + (node.bcg_color == _drawing2.default.colors[i] ? "white" : _drawing2.default.colors[i]) } })
				));
				currentBorder.push(_react2.default.createElement(
					'div',
					{ className: 'flex-grow-1', key: "border-color-key-" + i },
					_react2.default.createElement('div', { onClick: this.changeNodeBorderColor.bind(this, _drawing2.default.colors[i]), style: { backgroundColor: _drawing2.default.colors[i], height: "20px", cursor: "pointer", border: "solid 2px " + (node.border_color == _drawing2.default.colors[i] ? "white" : _drawing2.default.colors[i]) } })
				));

				if ((i + 1) % 6 == 0 || i == _drawing2.default.colors.length - 1) {
					textColors.push(_react2.default.createElement(
						'div',
						{ key: "flex-key-text-key" + i, className: 'flex' },
						currentText
					));
					bcgColors.push(_react2.default.createElement(
						'div',
						{ key: "flex-key-bcg-key" + i, className: 'flex' },
						currentBcg
					));
					borderColors.push(_react2.default.createElement(
						'div',
						{ key: "flex-key-border-key" + i, className: 'flex' },
						currentBorder
					));
					currentText = [];
					currentBcg = [];
					currentBorder = [];
				}
			}
			if (!node) return null;
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'h3',
						{ style: { marginTop: '0px' } },
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
						'Color'
					),
					_react2.default.createElement(
						'div',
						{ style: { textAlign: "center", marginBottom: "5px" } },
						_react2.default.createElement(
							'span',
							{ style: { cursor: "pointer", color: this.state.showColor === 2 ? "#9C27B0" : "#424242" }, onClick: this.changeShowColor.bind(this, 2) },
							'background'
						),
						_react2.default.createElement(
							'span',
							null,
							' | '
						),
						_react2.default.createElement(
							'span',
							{ style: { cursor: "pointer", color: this.state.showColor === 1 ? "#9C27B0" : "#424242" }, onClick: this.changeShowColor.bind(this, 1) },
							'title'
						),
						_react2.default.createElement(
							'span',
							null,
							' | '
						),
						_react2.default.createElement(
							'span',
							{ style: { cursor: "pointer", color: this.state.showColor === 3 ? "#9C27B0" : "#424242" }, onClick: this.changeShowColor.bind(this, 3) },
							'border'
						)
					),
					_react2.default.createElement(
						'div',
						{ style: { display: this.state.showColor === 1 ? "block" : "none" } },
						textColors
					),
					_react2.default.createElement(
						'div',
						{ style: { display: this.state.showColor === 2 ? "block" : "none" } },
						bcgColors
					),
					_react2.default.createElement(
						'div',
						{ style: { display: this.state.showColor === 3 ? "block" : "none" } },
						borderColors
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
				),
				_react2.default.createElement(
					'div',
					{ style: { marginTop: "20px", textAlign: "center" } },
					_react2.default.createElement(_fullbutton2.default, { label: 'delete this node', action: this.deleteNode })
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

		var _this8 = _possibleConstructorReturn(this, (MessageBlock.__proto__ || Object.getPrototypeOf(MessageBlock)).call(this, props));

		_this8.changePrompt = _this8.changePrompt.bind(_this8);
		_this8.send = _this8.send.bind(_this8);
		_this8.okd = _this8.okd.bind(_this8);
		_this8.state = {};
		return _this8;
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

			var msgHeight = this.props.vspace - 70 - headerHeight;
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
					msgs,
					_react2.default.createElement(
						'div',
						{ style: { marginTop: "20px", textAlign: "center", fontSize: "13px", display: msgs.length ? "none" : "block" } },
						'Empty History'
					)
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
