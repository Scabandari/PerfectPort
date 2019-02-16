import axios from 'axios';
import { _getDateFromTimeStamp, DAILY } from '../utils';
import {
  FETCH_USER,
  GET_COINS,
  DISPLAY_OPTIONS,
  SELECT_COIN,
  TIME_FRAME
} from './types';


export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const changeTimeFrame = timeFrame => dispatch => {
  dispatch({ type: TIME_FRAME, payload: timeFrame});
};

export const toggleChartsDisplay = chartsDisplayed => dispatch => {
  const chartsAreDisplayed = !chartsDisplayed;
  dispatch({ type: DISPLAY_OPTIONS, payload: chartsAreDisplayed});
};

// todo get rid of this
export const addUserCoin = coin_data => async dispatch => {
	const ticker = coin_data.ticker;
	const pos_size = coin_data.positionSize;
	const res = await axios.get('/api/current_user');
	const user_id = res.data._id;
  // console.log("From addUserCoin action creator: ", coin_data);
  // console.log("From addUserCoin action creator: ", res.data._id);
	// todo make a call to PUT a new coin in user's coin list
  const listing = await axios.get('/api/listing', {
  	params: {
  		symbol: ticker
		}
	});
  // id here means the id for the coin given by coinmarketcap.com so we can further use their api
  const coin_id = listing.data.id;
  const full_coin = await axios.get(`https://api.coinmarketcap.com/v2/ticker/${coin_id}/`);
  // full coin means we have all the data we need for that coin
  //console.log("full_coin: ", full_coin);
  // new coin to be added to user's list
  const new_coin = full_coin.data.data;
  const quotes = full_coin.data.data.quotes.USD;

	const req_params = {
		user_id: user_id,
    ticker: new_coin.symbol,
    id: new_coin.id,
    name: new_coin.name,
    positionSize: pos_size,
    price: quotes.price,
    volume_24h: quotes.volume_24h,
    percent_change_1h: quotes.percent_change_1h,
    percent_change_24h: quotes.percent_change_24h,
    percent_change_7d: quotes.percent_change_7d
	};

	const put_coin = await axios.put('/api/coins', {
		params: req_params
	});
	const user_coins = await axios.get('api/coins', {
		params: {
			user_id: user_id
		}
	});
	//console.log("New coins list for user: ", user_coins);
  dispatch({ type: GET_COINS, payload: user_coins.data.coins });

};

// todo this isn't working in combo w/ getCoin() below. Why?
// function updateUserCoins(coin_data) {
//   return {
//     type: GET_COINS,
//     payload: coin_data
//   }
// }

// todo this should get a users list of coins from DB and make api calls to coinmarket cap
// Makes a call to our db to get users coins, then makes calls to api to get price, vol,...etc
export const getCoins = () => async dispatch =>  {
  const res = await axios.get('/api/current_user');
  const user_id = res.data._id;
  const coins = await axios.get('api/coins', {
    params: {
      user_id: user_id
    }
  });

  console.log("coins:", coins);
//  const full_coin = await axios.get(`https://api.coinmarketcap.com/v2/ticker/${coin_id}/`);
  const promiseArray = await coins.data.coins.map(coin =>
    axios.get(`https://api.coinmarketcap.com/v2/ticker/${coin.id}/`));
  //console.log("calls: ", promiseArray);

  const updatedCoins = [];
  await axios.all(promiseArray).then(arr => {
    console.log("arr: ", arr);
    arr.map((item, index) => {
      updatedCoins.push({
        user_id: user_id,
        ticker: item.data.data.symbol,
        id: item.data.data.id,
        name: item.data.data.name,
        positionSize: coins.data.coins[index].positionSize,
        price: item.data.data.quotes.USD.price,
        volume_24h: item.data.data.quotes.USD.volume_24h,
        percent_change_1h: item.data.data.quotes.USD.percent_change_1h,
        percent_change_24h: item.data.data.quotes.USD.percent_change_24h,
        percent_change_7d: item.data.data.quotes.USD.percent_change_7d
      });
    })
  }).catch(err => {
    console.log("Error with axios.all(): ", err);
  });

  //console.log("updatedCoins: ", updatedCoins);

  // return function (dispatch) {
  //   dispatch(updateUserCoins(updatedCoins));
  // };

  // todo why doesn't the 3 lines above work?
  dispatch({ type: GET_COINS, payload: updatedCoins });

};

export const selectCoinForChart = (coin, time_frame) => async dispatch => {

  let url;
  if(time_frame === DAILY) {
    url = `https://min-api.cryptocompare.com/data/histo${time_frame}?fsym=${coin}&tsym=USD&allData=true`;
  } else {
    url = `https://min-api.cryptocompare.com/data/histo${time_frame}?fsym=${coin}&tsym=USD&limit=2000`;
  }
  //console.log("select coin action called on: ", coin, "time_frame: ", time_frame);
  const req = await axios.get(url);
  //console.log("request successfully made");
  const data = req.data.Data.map(point => {
    return ({
      open: point.open,
      high: point.high,
      low: point.low,
      close: point.close,
      volume: point.volumeto,
      date: _getDateFromTimeStamp(point.time),
      absoluteChange: undefined,
      dividend: "",
      percentChange: undefined,
      split: ""
    })
  });

  const coin_data = {
    coin: coin,
    data: data
  };
  //console.log("coin: ", coin_data.coin, "data: ", coin_data.data);

  dispatch({type: SELECT_COIN, payload: coin_data});
};

