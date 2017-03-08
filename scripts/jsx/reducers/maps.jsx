export default function mapsReducers(state = [], action) {
	switch (action.type) {
		case 'SET_MAPS':
			return action.maps
		case 'ADD_MAP':
			return state.concat(action.map)
		default:
			return state;
	}
}