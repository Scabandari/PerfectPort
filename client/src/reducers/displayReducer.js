import { DISPLAY_OPTIONS } from '../actions/types';

export default function(state=true, action) {
  //console.log("displayReducer being called");
  switch(action.type) {
    case DISPLAY_OPTIONS:
      return action.payload;
    default:
      return state;
  }
}