'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = usersReducers;
function usersReducers() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var action = arguments[1];

	switch (action.type) {
		case 'SET_USER':
			return action.user;
		default:
			return state;
	}
}
