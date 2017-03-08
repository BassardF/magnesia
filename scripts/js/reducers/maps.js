'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = mapsReducers;
function mapsReducers() {
	var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
	var action = arguments[1];

	switch (action.type) {
		case 'SET_MAPS':
			return action.maps;
		case 'ADD_MAP':
			return state.concat(action.map);
		default:
			return state;
	}
}
