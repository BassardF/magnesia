export default function usersReducers(state = 0, action) {
	switch (action.type) {
		case 'SET_USER':
			return Object.assign({}, state, {
				user: action.user
			})
		default:
			return state;
	}
}