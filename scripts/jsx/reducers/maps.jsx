export default function mapsReducers(state = 0, action) {
	switch (action.type) {
		case 'SET_MAPS':
			return Object.assign({}, state, {
				maps: action.maps
			})
		default:
			return state;
	}
}