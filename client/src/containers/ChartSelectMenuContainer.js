import React, { Component } from 'react';
import '../App.css';
import { connect } from "react-redux";
import ChartSelectMenu from '../components/ChartSelectMenu';
import { selectCoinForChart } from '../actions/index';


class ChartSelectMenuContainer extends Component {
  constructor(props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(ticker) {
    //event.preventDefault();
    console.log("Clicked: ", ticker);
    console.log("coin_list: ", this.props);

    const coin_list = this.props.coins;
    //
    for (let i=0; i<coin_list.length; i++) {
      if (coin_list[i].ticker === ticker) {
        this.props.dispatch(selectCoinForChart(ticker));
      }
    }
  }

  render() {
    console.log("Container props on render(): ", this.props);
      return (
        <ChartSelectMenu
        onClickHandler={this._handleClick}
        coinData={this.props.coins}
        />
      );
  }
}

function mapStateToProps({ auth, coins, selectedCoin }) {
  return { auth, coins, selectedCoin };
}

export default connect(mapStateToProps)(ChartSelectMenuContainer);

// todo broadcast an action creator when a user clicks on their coin, show correct chart





