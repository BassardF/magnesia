'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = mapsReducers;
function mapsReducers() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	var action = arguments[1];

	switch (action.type) {
		case 'SET_MAPS':
			return Object.assign({}, state, {
				maps: action.maps
			});
		default:
			return state;
	}
}
