'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.replaceMaps = replaceMaps;
exports.addMap = addMap;
function replaceMaps(maps) {
	if (maps) return { type: 'SET_MAPS', maps: maps };
	return {};
}

function addMap(map) {
	if (map) return { type: 'ADD_MAP', map: map };
	return {};
}
