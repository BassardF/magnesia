'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _auth = require('../../services/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Advice = function (_React$Component) {
	_inherits(Advice, _React$Component);

	function Advice(props) {
		_classCallCheck(this, Advice);

		var _this = _possibleConstructorReturn(this, (Advice.__proto__ || Object.getPrototypeOf(Advice)).call(this, props));

		_this.changePage = _this.changePage.bind(_this);
		_this.getTutoNode = _this.getTutoNode.bind(_this);
		_this.dismiss = _this.dismiss.bind(_this);

		_this.state = {
			map: null,
			current: null,
			page: 0
		};
		return _this;
	}

	_createClass(Advice, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(np) {
			var hasNNS = np.user && np.user.advice && np.user.advice['no-node-selected'];
			var hasNS = np.user && np.user.advice && np.user.advice['node-selected'];
			if (np.map && !np.selectedNode && np.selectedNode !== 0 && !hasNNS) {
				this.setState({
					current: "no-node-selected"
				});
			} else if (np.map && (np.selectedNode || np.selectedNode === 0) && !hasNS) {
				this.setState({
					current: "node-selected"
				});
			} else {
				this.setState({
					page: 0,
					current: null
				});
			}
		}
	}, {
		key: 'dismiss',
		value: function dismiss() {
			var _this2 = this;

			this.refs.advicewrapper.className = "border-shadow advice-wrapper";
			setTimeout(function () {
				if (_this2.props.user) _this2.props.user.dismissAdvice(_auth2.default.getUid(), _this2.state.current);
				_this2.setState({
					page: 0,
					current: null
				});
			}, 500);
		}
	}, {
		key: 'changePage',
		value: function changePage(page) {
			this.setState({
				page: page
			});
		}
	}, {
		key: 'getTutoNode',
		value: function getTutoNode(count, action, how, img, mtop) {
			return _react2.default.createElement(
				'div',
				{ key: "tuto-" + count, className: 'flex', style: { display: this.state.page == count ? "" : "none" } },
				_react2.default.createElement(
					'div',
					{ className: 'flex-grow-1', style: { verticalAlign: "middle", marginBottom: "3px" } },
					_react2.default.createElement(
						'div',
						{ style: { minWidth: "190px", fontWeight: "bold", marginBottom: "3px" } },
						action
					),
					_react2.default.createElement(
						'div',
						null,
						how
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'flex-grow-0', style: { verticalAlign: "middle" } },
					_react2.default.createElement(
						'div',
						{ style: { minWidth: "40px" } },
						_react2.default.createElement('img', { style: { height: "30px", marginRight: "5px", marginLeft: "5px" }, src: "../assets/images/" + img })
					)
				)
			);
		}
	}, {
		key: 'componentDidUpdate',
		value: function componentDidUpdate() {
			if (this.state.current) {
				this.refs.advicewrapper.className = "border-shadow advice-wrapper advice-wrapper-shown";
			} else {
				this.refs.advicewrapper.className = "border-shadow advice-wrapper";
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var dom = [],
			    pages = [],
			    count = 0;
			if (this.state.current == "no-node-selected") {
				dom.push(this.getTutoNode(count, "New node", "double click on the background", "tuto-dbclick.svg"));
				count++;
				dom.push(this.getTutoNode(count, "Select a node", "click on its background", "tuto-select-node.png"));
				count++;
				dom.push(this.getTutoNode(count, "Modify title", "click on it", "tuto-change-title.png"));
				count++;
			} else if (this.state.current == "node-selected") {
				dom.push(this.getTutoNode(count, "New related node", "double click on the background", "tuto-dbclick.svg"));
				count++;
				dom.push(this.getTutoNode(count, "More options", "get into the option tab!", "node.svg"));
				count++;
				dom.push(this.getTutoNode(count, "Deselect", "click on the node again", "tuto-select-node.png"));
				count++;
				dom.push(this.getTutoNode(count, "Delete this node", "press 'delete'", "tuto-delete.svg"));
				count++;
			}

			for (var i = 0; i < dom.length; i++) {
				pages.push(_react2.default.createElement(
					'span',
					{ onClick: this.changePage.bind(this, i), style: { cursor: "pointer" }, key: "pager-" + i, className: i == this.state.page ? "purple bold" : "extra-light-purple" },
					'\u2609'
				));
			}

			return _react2.default.createElement(
				'div',
				{ ref: 'advicewrapper', className: "advice-wrapper " + (count ? "border-shadow " : ""), style: { padding: "10px", position: "absolute", top: "10px", fontSize: "12px" } },
				_react2.default.createElement(
					'div',
					null,
					dom
				),
				_react2.default.createElement(
					'div',
					{ style: { marginTop: '3px' } },
					pages,
					_react2.default.createElement(
						'span',
						{ style: { display: count ? "inline" : "none", float: "right", cursor: "pointer", fontSize: "14px" }, className: 'purple' },
						_react2.default.createElement(
							'span',
							{ onClick: this.changePage.bind(this, this.state.page + 1), style: { display: this.state.page == pages.length - 1 ? "none" : "inline" } },
							'next ',
							_react2.default.createElement(
								'span',
								{ style: { marginLeft: "3px" } },
								'\u276F'
							)
						),
						_react2.default.createElement(
							'span',
							{ onClick: this.dismiss, style: { display: this.state.page == pages.length - 1 ? "inline" : "none" } },
							'dismiss ',
							_react2.default.createElement(
								'span',
								{ style: { marginLeft: "3px" } },
								'\u2715'
							)
						)
					)
				)
			);
		}
	}]);

	return Advice;
}(_react2.default.Component);

;

exports.default = Advice;
