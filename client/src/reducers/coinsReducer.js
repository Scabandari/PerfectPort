import { GET_COINS } from '../actions/types';

export default function(state=[], action) {
  //console.log("coinsReducer being called");
  switch(action.type) {
    case GET_COINS:
      return action.payload;
    default:
      return state;
  }
}