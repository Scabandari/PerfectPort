import { TIME_FRAME } from '../actions/types';
import { DAILY }  from '../utils';

export default function(state=DAILY, action) {
  //console.log("coinsReducer being called");
  switch(action.type) {
    case TIME_FRAME:
      return action.payload;
    default:
      return state;
  }
}