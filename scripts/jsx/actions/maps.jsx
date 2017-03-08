export function replaceMaps(maps) {
	if(maps) return {type: 'SET_MAPS', maps: maps};
	return {};
}

export function addMap(map) {
	if(map) return {type: 'ADD_MAP', map: map};
	return {};
}