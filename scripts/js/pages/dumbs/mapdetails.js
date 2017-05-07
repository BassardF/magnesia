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

var MapDetails = function (_React$Component) {
	_inherits(MapDetails, _React$Component);

	function MapDetails(props) {
		_classCallCheck(this, MapDetails);

		var _this = _possibleConstructorReturn(this, (MapDetails.__proto__ || Object.getPrototypeOf(MapDetails)).call(this, props));

		_this.state = {
			map: null
		};
		return _this;
	}

	_createClass(MapDetails, [{
		key: "componentWillReceiveProps",
		value: function componentWillReceiveProps(np) {
			if (np.map && (!this.state.map || np.map.mid !== this.state.map.mid)) {
				this.redrawStats(np);
			}
		}
	}, {
		key: "redrawStats",
		value: function redrawStats(np) {
			var _this2 = this;

			this.setState({
				map: np.map
			}, function () {
				var counts = _this2.getCount();
				var max = Math.max(counts.nodes, counts.users, counts.messages, counts.links, 5);
				_this2.refs.progressbarusers.style.width = counts.users * 100 / max + "%";
				_this2.refs.progressbarnodes.style.width = counts.nodes * 100 / max + "%";
				_this2.refs.progressbarlinks.style.width = counts.links * 100 / max + "%";
				_this2.refs.progressbarmessages.style.width = counts.messages * 100 / max + "%";
			});
		}
	}, {
		key: "getCount",
		value: function getCount() {
			return {
				nodes: this.props.map.nodes.length,
				users: this.props.map.users ? Object.keys(this.props.map.users).length : 0,
				messages: this.props.map.messages ? Object.keys(this.props.map.messages).length : 0,
				links: this.props.map.links ? Object.keys(this.props.map.links).length : 0
			};
		}
	}, {
		key: "render",
		value: function render() {
			var map = this.props.map;
			var counts = this.getCount();

			return _react2.default.createElement(
				"div",
				{ className: "map-details" },
				_react2.default.createElement(
					"div",
					{ id: "map-details-title", onClick: this.props.promptChangeTitle },
					_react2.default.createElement(
						"div",
						null,
						_react2.default.createElement(
							"span",
							{ id: "map-details-title-content" },
							this.props.map.title
						)
					),
					_react2.default.createElement(
						"div",
						{ style: { marginTop: "7px" } },
						_react2.default.createElement(
							"span",
							{ id: "map-details-title-sub" },
							_react2.default.createElement("img", { style: { verticalAlign: "middle", width: "10px", marginRight: "5px" }, src: "../assets/images/edit.svg" }),
							_react2.default.createElement(
								"span",
								{ style: { verticalAlign: "middle" } },
								"edit"
							)
						)
					)
				),
				_react2.default.createElement(
					"div",
					{ style: { fontSize: "14px", height: "20px" } },
					_react2.default.createElement(
						"div",
						{ onClick: this.props.leaveMap, className: "purple-unerlined-hover", style: { marginRight: "10px", cursor: "pointer", float: "right", display: "inline-block" } },
						_react2.default.createElement("img", { style: { verticalAlign: "middle", width: "10px", marginRight: "5px" }, src: "../assets/images/exit.svg" }),
						_react2.default.createElement(
							"span",
							{ style: { verticalAlign: "middle" } },
							"leave map"
						)
					),
					_react2.default.createElement(
						"div",
						{ style: { float: "right", display: "inline-block", marginLeft: "10px", marginRight: "10px" } },
						" | "
					),
					_react2.default.createElement(
						"div",
						{ onClick: this.props.toggleManageUsers, className: "purple-unerlined-hover", style: { cursor: "pointer", float: "right", display: "inline-block" } },
						_react2.default.createElement("img", { style: { verticalAlign: "middle", width: "10px", marginRight: "5px" }, src: "../assets/images/invite.svg" }),
						_react2.default.createElement(
							"span",
							{ style: { verticalAlign: "middle" } },
							"manage users"
						)
					),
					_react2.default.createElement(
						"div",
						{ style: { float: "right", display: "inline-block", marginLeft: "10px", marginRight: "10px" } },
						" | "
					),
					_react2.default.createElement(
						"div",
						{ onClick: this.props.goToMap, className: "purple-unerlined-hover", style: { cursor: "pointer", float: "right", display: "inline-block" } },
						_react2.default.createElement("img", { style: { verticalAlign: "middle", width: "10px", marginRight: "5px" }, src: "../assets/images/arrow-right.svg" }),
						_react2.default.createElement(
							"span",
							{ style: { verticalAlign: "middle" } },
							"get in"
						)
					)
				),
				_react2.default.createElement(
					"div",
					{ style: { paddingLeft: "40px", paddingRight: "40px" } },
					_react2.default.createElement(
						"div",
						{ className: "flex", style: { marginTop: "30px" } },
						_react2.default.createElement(
							"div",
							{ className: "flex-grow-0" },
							_react2.default.createElement(
								"div",
								{ style: { width: "100px" } },
								_react2.default.createElement(
									"div",
									{ style: { marginTop: "10px" } },
									"users"
								),
								_react2.default.createElement(
									"div",
									{ style: { float: "right", marginTop: "-17px", marginRight: "5px" } },
									counts.users
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "flex-grow-1" },
							_react2.default.createElement(
								"div",
								null,
								_react2.default.createElement("div", { ref: "progressbarusers", style: { width: 0 + "%" }, className: "maps-progress-bar blue0-bcg" })
							)
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "flex", style: { marginTop: "30px" } },
						_react2.default.createElement(
							"div",
							{ className: "flex-grow-0" },
							_react2.default.createElement(
								"div",
								{ style: { width: "100px" } },
								_react2.default.createElement(
									"div",
									{ style: { marginTop: "10px" } },
									"nodes"
								),
								_react2.default.createElement(
									"div",
									{ style: { float: "right", marginTop: "-17px", marginRight: "5px" } },
									counts.nodes
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "flex-grow-1" },
							_react2.default.createElement(
								"div",
								null,
								_react2.default.createElement("div", { ref: "progressbarnodes", style: { width: 0 + "%" }, className: "maps-progress-bar blue1-bcg" })
							)
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "flex", style: { marginTop: "30px" } },
						_react2.default.createElement(
							"div",
							{ className: "flex-grow-0" },
							_react2.default.createElement(
								"div",
								{ style: { width: "100px" } },
								_react2.default.createElement(
									"div",
									{ style: { marginTop: "10px" } },
									"links"
								),
								_react2.default.createElement(
									"div",
									{ style: { float: "right", marginTop: "-17px", marginRight: "5px" } },
									counts.links
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "flex-grow-1" },
							_react2.default.createElement(
								"div",
								null,
								_react2.default.createElement("div", { ref: "progressbarlinks", style: { width: 0 + "%" }, className: "maps-progress-bar blue2-bcg" })
							)
						)
					),
					_react2.default.createElement(
						"div",
						{ className: "flex", style: { marginTop: "30px" } },
						_react2.default.createElement(
							"div",
							{ className: "flex-grow-0" },
							_react2.default.createElement(
								"div",
								{ style: { width: "100px" } },
								_react2.default.createElement(
									"div",
									{ style: { marginTop: "10px" } },
									"messages"
								),
								_react2.default.createElement(
									"div",
									{ style: { float: "right", marginTop: "-17px", marginRight: "5px" } },
									counts.messages
								)
							)
						),
						_react2.default.createElement(
							"div",
							{ className: "flex-grow-1" },
							_react2.default.createElement(
								"div",
								null,
								_react2.default.createElement("div", { ref: "progressbarmessages", style: { width: 0 + "%" }, className: "maps-progress-bar blue3-bcg" })
							)
						)
					)
				)
			);
		}
	}]);

	return MapDetails;
}(_react2.default.Component);

;

exports.default = MapDetails;
