import { FETCH_USER } from '../actions/types';

// const default_state = {
//   _id: "5afdf0008267527f7b13dc7f",
// 	googleId: "110930916491768943372",
// };

export default function(state={}, action) {
	switch (action.type) {
		case FETCH_USER:
			return action.payload || false;
		default:
			return state;
	}
}
