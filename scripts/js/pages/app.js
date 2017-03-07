'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _users = require('../reducers/users');

var _users2 = _interopRequireDefault(_users);

var _register = require('./register');

var _register2 = _interopRequireDefault(_register);

var _maps = require('./maps');

var _maps2 = _interopRequireDefault(_maps);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = (0, _redux.createStore)(_users2.default);

(0, _reactDom.render)(_react2.default.createElement(
	_reactRedux.Provider,
	{ store: store },
	_react2.default.createElement(
		_reactRouter.Router,
		{ history: _reactRouter.browserHistory },
		_react2.default.createElement(
			_reactRouter.Route,
			{ path: '/', component: _root2.default },
			_react2.default.createElement(_reactRouter.Route, { path: '/maps', component: _maps2.default }),
			_react2.default.createElement(_reactRouter.Route, { path: '*', component: _register2.default })
		)
	)
), document.getElementById('root'));
