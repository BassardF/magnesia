'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DropModal = require('boron/DropModal');

var _DropModal2 = _interopRequireDefault(_DropModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlansModal = function (_React$Component) {
	_inherits(PlansModal, _React$Component);

	function PlansModal(props) {
		_classCallCheck(this, PlansModal);

		var _this = _possibleConstructorReturn(this, (PlansModal.__proto__ || Object.getPrototypeOf(PlansModal)).call(this, props));

		_this.showModal = _this.showModal.bind(_this);
		_this.hideModal = _this.hideModal.bind(_this);

		_this.state = {};
		return _this;
	}

	_createClass(PlansModal, [{
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
		key: 'componentDidMount',
		value: function componentDidMount() {
			new Tippy('.tippyPlansModal', {
				position: 'bottom',
				animation: 'shift',
				duration: 200,
				arrow: true
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var rights = this.props.user ? this.props.user.rights : 0;
			return _react2.default.createElement(
				'div',
				{ id: 'early-access-modal-wrapper' },
				_react2.default.createElement(
					_DropModal2.default,
					{ ref: 'modal', onHide: this.props.hideModal },
					_react2.default.createElement(
						'h2',
						{ style: { textAlign: "center", paddingTop: "20px", paddingBottom: "15px" } },
						_react2.default.createElement(
							'span',
							{ style: { fontWeight: "200" } },
							'Current plan : '
						),
						' ',
						_react2.default.createElement(
							'span',
							{ className: 'purple' },
							this.props.user ? this.props.user.getPlan() : ""
						)
					),
					_react2.default.createElement(
						'div',
						null,
						_react2.default.createElement(
							'div',
							{ style: { verticalAlign: "top", width: "33%", display: "inline-block", flexGrow: 1, textAlign: "center" } },
							_react2.default.createElement(
								'div',
								{ style: { paddingLeft: "10px", paddingRight: "10px" } },
								_react2.default.createElement(
									'h3',
									{ style: { marginTop: "10px", marginBottom: "10px", textAlign: "left", fontWeight: "200" } },
									'Starter'
								),
								_react2.default.createElement(
									'div',
									{ style: { marginTop: "-45px", float: "right", marginRight: "auto", width: "50px", height: "50px", borderRadius: "50px", backgroundColor: "#F3E5F5" } },
									_react2.default.createElement('img', { style: { marginTop: "10px", width: "30px", height: "30px" }, src: '../assets/images/view-white.svg' })
								),
								_react2.default.createElement(
									'div',
									{ style: { borderTop: "solid 3px #F3E5F5" } },
									_react2.default.createElement(
										'div',
										{ style: { marginTop: "20px", marginBottom: "20px" } },
										_react2.default.createElement(
											'span',
											{ style: { fontWeight: "100", fontSize: "30px" } },
											'Free'
										)
									),
									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(
											'div',
											{ className: "purple " + (rights == 0 ? "disabled-button" : "pointer"), style: { marginBottom: "10px", backgroundColor: "#9C27B0", borderRadius: "4px", padding: "5px", fontSize: "14px", color: "white" } },
											rights == 0 ? "Current" : "Select"
										)
									),
									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(
											'div',
											{ style: { marginBottom: "15px", fontSize: "14px" } },
											_react2.default.createElement(
												'b',
												null,
												'3'
											),
											' maps'
										)
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ style: { verticalAlign: "top", width: "33%", display: "inline-block", flexGrow: 1, textAlign: "center" } },
							_react2.default.createElement(
								'div',
								{ style: { paddingLeft: "10px", paddingRight: "10px" } },
								_react2.default.createElement(
									'h3',
									{ style: { marginTop: "10px", marginBottom: "10px", textAlign: "left", fontWeight: "200" } },
									'Standard'
								),
								_react2.default.createElement(
									'div',
									{ style: { marginTop: "-45px", float: "right", marginRight: "auto", width: "50px", height: "50px", borderRadius: "50px", backgroundColor: "#CE93D8" } },
									_react2.default.createElement('img', { style: { marginTop: "10px", width: "30px", height: "30px" }, src: '../assets/images/quality-badge-white.svg' })
								),
								_react2.default.createElement(
									'div',
									{ style: { borderTop: "solid 3px #CE93D8" } },
									_react2.default.createElement(
										'div',
										{ style: { marginTop: "20px", marginBottom: "20px" } },
										_react2.default.createElement(
											'span',
											{ style: { fontWeight: "100", fontSize: "30px" } },
											'$10'
										),
										' / mo'
									),
									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(
											'div',
											{ className: "purple " + (rights == 1 ? "disabled-button" : "pointer"), style: { marginBottom: "10px", backgroundColor: "#9C27B0", borderRadius: "4px", padding: "5px", fontSize: "14px", color: "white" } },
											rights == 1 ? "Current" : "Select"
										)
									),
									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(
											'div',
											{ style: { marginBottom: "15px", fontSize: "14px" } },
											_react2.default.createElement(
												'b',
												null,
												'unlimited'
											),
											' maps'
										),
										_react2.default.createElement(
											'div',
											{ style: { marginBottom: "15px", fontSize: "14px" } },
											_react2.default.createElement(
												'b',
												null,
												'3 invites'
											),
											' p.m.'
										)
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ style: { verticalAlign: "top", width: "33%", display: "inline-block", flexGrow: 1, textAlign: "center" } },
							_react2.default.createElement(
								'div',
								{ style: { paddingLeft: "10px", paddingRight: "10px" } },
								_react2.default.createElement(
									'h3',
									{ style: { marginTop: "10px", marginBottom: "10px", textAlign: "left", fontWeight: "200" } },
									'Ultimate'
								),
								_react2.default.createElement(
									'div',
									{ style: { marginTop: "-45px", float: "right", marginRight: "auto", width: "50px", height: "50px", borderRadius: "50px", backgroundColor: "#9C27B0" } },
									_react2.default.createElement('img', { style: { marginTop: "10px", width: "30px", height: "30px" }, src: '../assets/images/eac-diamond-white.svg' })
								),
								_react2.default.createElement(
									'div',
									{ style: { borderTop: "solid 3px #9C27B0" } },
									_react2.default.createElement(
										'div',
										{ style: { marginTop: "20px", marginBottom: "20px" } },
										_react2.default.createElement(
											'span',
											{ style: { fontWeight: "100", fontSize: "30px" } },
											'$25'
										),
										' / mo'
									),
									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(
											'div',
											{ className: "purple " + (rights == 2 ? "disabled-button" : "pointer"), style: { marginBottom: "10px", backgroundColor: "#9C27B0", borderRadius: "4px", padding: "5px", fontSize: "14px", color: "white" } },
											rights == 2 ? "Current" : "Select"
										)
									),
									_react2.default.createElement(
										'div',
										null,
										_react2.default.createElement(
											'div',
											{ style: { marginBottom: "15px", fontSize: "14px" } },
											_react2.default.createElement(
												'b',
												null,
												'unlimited'
											),
											' maps'
										),
										_react2.default.createElement(
											'div',
											{ style: { marginBottom: "15px", fontSize: "14px" } },
											_react2.default.createElement(
												'b',
												null,
												'unlimited invites'
											),
											' p.m.'
										)
									)
								)
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ style: { textAlign: "center", fontSize: "14px", marginBottom: "10px", marginTop: "10px" } },
						_react2.default.createElement(
							'div',
							null,
							'Any problem, question or suggestion ?'
						),
						_react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'a',
								{ className: 'purple', href: 'mailto:f.bassard@gmail.com' },
								'Contact'
							),
							' me directly'
						)
					)
				)
			);
		}
	}]);

	return PlansModal;
}(_react2.default.Component);

;

exports.default = PlansModal;
