import React, { Component } from 'react';
//import '../App.css';
import { connect } from 'react-redux';
//import { fetchUser } from '../actions/userActions';
//import { fetchTweets } from '../actions/tweetsAction';
import { addUserCoin } from "../actions";
import SearchCoinCard from '../components/SearchCoinCard';

class SearchCoinCardContainer extends Component {

  constructor(props) {
    super(props);

    this._actionCreatorCaller = this._actionCreatorCaller.bind(this);
  }

  componentDidMount() {
    //this.props.dispatch(fetchUser());
  }
  //
  // fetchTweets() {
  //   this.props.dispatch(fetchTweets());
  // }

  _actionCreatorCaller(coin_data){
    //console.log("actionCreatorCaller: ", coin_data.positionSize);
    this.props.dispatch(addUserCoin(coin_data));
  }

  render() {
    //const { user, tweets } = this.props;
    // if (!tweets.length) {
    //   //return <button onClick={this.fetchTweets.bind(this)}>Load Tweets</button>
    // }
    return(
      <SearchCoinCard addCoin={this._actionCreatorCaller} />
    )
  }
}

export default connect ((store) => {
  return {
    coins: store.coins
  };
})(SearchCoinCardContainer);