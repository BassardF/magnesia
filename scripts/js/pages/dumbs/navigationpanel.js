"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NavigationPanel = function (_React$Component) {
	_inherits(NavigationPanel, _React$Component);

	function NavigationPanel(props) {
		_classCallCheck(this, NavigationPanel);

		var _this = _possibleConstructorReturn(this, (NavigationPanel.__proto__ || Object.getPrototypeOf(NavigationPanel)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(NavigationPanel, [{
		key: "componentWillMount",
		value: function componentWillMount() {}
	}, {
		key: "componentWillUnMount",
		value: function componentWillUnMount() {}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var domNodes = [];
			if (this.props.map && this.props.map.nodes) {
				domNodes = this.props.map.nodes.map(function (n, ind) {
					return _react2.default.createElement(NodeLine, { key: "key-lp-node-line-" + n.nid, links: _this2.props.map.links, node: n, selectedNode: _this2.props.selectedNode, selectNode: _this2.props.selectNode });
				});
			}
			return _react2.default.createElement(
				"div",
				{ id: "navigation-panel" },
				domNodes
			);
		}
	}]);

	return NavigationPanel;
}(_react2.default.Component);

;

exports.default = NavigationPanel;

var NodeLine = function (_React$Component2) {
	_inherits(NodeLine, _React$Component2);

	function NodeLine(props) {
		_classCallCheck(this, NodeLine);

		var _this3 = _possibleConstructorReturn(this, (NodeLine.__proto__ || Object.getPrototypeOf(NodeLine)).call(this, props));

		_this3.selectNode = _this3.selectNode.bind(_this3);
		_this3.state = {};
		return _this3;
	}

	_createClass(NodeLine, [{
		key: "selectNode",
		value: function selectNode() {
			this.props.selectNode(this.props.node.nid);
		}
	}, {
		key: "render",
		value: function render() {
			var selected = this.props.selectedNode == this.props.node.nid;
			return _react2.default.createElement(
				"div",
				null,
				_react2.default.createElement(
					"div",
					{ onClick: this.selectNode, className: selected ? "selected-node-line" : "node-line" },
					_react2.default.createElement("div", { className: "arrow-right v-align-middle inline-block" }),
					_react2.default.createElement(
						"span",
						{ className: "v-align-middle", style: { marginLeft: "5px" } },
						this.props.node.title
					)
				)
			);
		}
	}]);

	return NodeLine;
}(_react2.default.Component);

;
