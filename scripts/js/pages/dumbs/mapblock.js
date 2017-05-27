'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapBlock = function (_React$Component) {
	_inherits(MapBlock, _React$Component);

	function MapBlock() {
		_classCallCheck(this, MapBlock);

		return _possibleConstructorReturn(this, (MapBlock.__proto__ || Object.getPrototypeOf(MapBlock)).apply(this, arguments));
	}

	_createClass(MapBlock, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			new Tippy('.tippymapblock', {
				position: 'right',
				animation: 'shift',
				duration: 200,
				arrow: true
			});
		}
	}, {
		key: 'render',
		value: function render() {

			if (this.props.map) {
				return _react2.default.createElement(
					'div',
					{ className: this.props.selected ? "map-block-selected" : "map-block", onClick: this.props.selected ? null : this.props.selectMap },
					_react2.default.createElement(
						'div',
						{ className: 'map-block-sub' },
						_react2.default.createElement(
							'div',
							{ onClick: this.props.goToMap, title: 'get in', className: 'purple-go-button tippymapblock' },
							_react2.default.createElement('img', { src: '../assets/images/arrow-right-white.svg', style: { marginTop: "-34px", verticalAlign: "middle", width: "15px", marginRight: "5px" } })
						),
						_react2.default.createElement('img', { style: { verticalAlign: "middle", height: "20px", width: "20px" }, src: '../assets/images/map.svg' }),
						_react2.default.createElement(
							'span',
							{ style: { fontSize: "15px", verticalAlign: "middle", marginLeft: "10px" } },
							this.props.map.title
						),
						_react2.default.createElement(
							'div',
							{ className: "flex " + (this.props.selected ? "hide" : ""), style: { fontSize: "11px", marginTop: "10px" } },
							_react2.default.createElement(
								'div',
								{ className: 'flex-grow-1' },
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'span',
										{ className: 'purple' },
										this.props.map.nodes.length
									),
									' nodes'
								),
								_react2.default.createElement(
									'div',
									{ style: { marginTop: "3px" } },
									_react2.default.createElement(
										'span',
										{ className: 'purple' },
										this.props.map.users ? Object.keys(this.props.map.users).length : 0
									),
									' users'
								)
							),
							_react2.default.createElement(
								'div',
								{ className: 'flex-grow-1' },
								_react2.default.createElement(
									'div',
									null,
									_react2.default.createElement(
										'span',
										{ className: 'purple' },
										this.props.map.messages ? Object.keys(this.props.map.messages).length : 0
									),
									' messages'
								),
								_react2.default.createElement(
									'div',
									{ style: { marginTop: "3px" } },
									_react2.default.createElement(
										'span',
										{ className: 'purple' },
										this.props.map.links ? Object.keys(this.props.map.links).length : 0
									),
									' links'
								)
							)
						)
					)
				);
			} else {
				return _react2.default.createElement(
					'div',
					{ onClick: this.props.createMap, className: 'empty-map-block', style: { textAlign: "center", cursor: "pointer" } },
					_react2.default.createElement(
						'div',
						{ style: { marginTop: "10px" } },
						_react2.default.createElement(
							'div',
							{ style: { fontSize: "14px", marginRight: "10px" } },
							'Create a new Map'
						),
						_react2.default.createElement(
							'div',
							{ style: { fontSize: "25px", marginRight: "10px" } },
							_react2.default.createElement('img', { className: 'first-map-small-img', src: '../assets/images/newmap.svg', style: { display: "block", marginLeft: "auto", marginRight: "auto" } })
						)
					)
				);
			}
		}
	}]);

	return MapBlock;
}(_react2.default.Component);

;

exports.default = MapBlock;
