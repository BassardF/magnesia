export default function replaceUser(user) {
	if(user) return {type: 'SET_USER', user: user};
	return {type: 'SET_USER', user: null};
}