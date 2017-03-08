export default function usersReducers(state = 0, action) {
	switch (action.type) {
		case 'SET_USER':
			return action.user
		default:
			return state;
	}
}