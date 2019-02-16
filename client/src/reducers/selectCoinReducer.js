import { SELECT_COIN } from '../actions/types';

export default function(state={}, action) {
  //console.log("coinsReducer being called");
  switch(action.type) {
    case SELECT_COIN:
      return action.payload;
    default:
      return state;
  }
}