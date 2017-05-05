'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = replaceUser;
function replaceUser(user) {
	if (user) return { type: 'SET_USER', user: user };
	return { type: 'SET_USER', user: null };
}
