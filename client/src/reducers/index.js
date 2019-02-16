import { combineReducers } from 'redux';
import authReducer from './authReducer';
import coinsReducer from './coinsReducer';
import displayReducer from './displayReducer';
import selectCoinReducer from "./selectCoinReducer";
import timeFrameReducer from "./timeFrameReducer";

export default combineReducers({
	auth: authReducer,
	coins: coinsReducer,
	showCharts: displayReducer,
	selectedCoin: selectCoinReducer,
	timeFrame: timeFrameReducer
});
