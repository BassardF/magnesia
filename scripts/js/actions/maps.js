'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = replaceMaps;
function replaceMaps(maps) {
	if (user) return { type: 'SET_MAPS', maps: maps };
	return {};
}
