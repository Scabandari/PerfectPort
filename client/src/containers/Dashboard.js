import React, { Component } from 'react';
import '../App.css';
import {connect} from "react-redux";
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CoinList from '../components/CoinList';
import ChartSelectMenuContainer from '../containers/ChartSelectMenuContainer';
import SearchCoinCardContainer from '../containers/SearchCoinCardContainer';
import PortfolioPieChart from '../components/PortfolioPieChart';
import FinancialChartToolbar from './FinancialChartToolbar';
import CandleStickContainer from './CandleStickContainer';
import { getCoins } from '../actions/index';
import {selectCoinForChart} from "../actions";


class Dashboard extends Component {
  constructor(props) {
    super(props);

    // todo get rid of this??
   // this._handleToolbarClick = this._handleToolbarClick.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getCoins());
  }

  // _handleToolbarClick(ticker) {
  // _handleToolbarClick() {
  //   //console.log("_handleToolbarClick, ticker: ");
  //   this.props.dispatch(
  //     selectCoinForChart(
  //       this.props.selectedCoin,
  //       this.props.timeFrame
  //     )
  //   )
  // }

  _renderCharts() {
    switch (this.props.showCharts){
      case false:
        return (
          <div>
            <div id="addCryptoAndPieChart">
              <div id="searchCoinCard">
                <SearchCoinCardContainer id="limit" className="CoinSearch" />
              </div>
              <div id="pieChart">
                <PortfolioPieChart coinData={this.props.coins}/>
              </div>
            </div>
            <CoinList coinData={this.props.coins} />
          </div>
        );
      case true:
        return (
          <div>
            <div id="financial-chart-toolbar">
              <FinancialChartToolbar
                // handleClick={this._handleToolbarClick}
                selectedCoin={this.props.selectedCoin}
                coinData={this.props.coins}
              />
            </div>
            <div id="candle-stick-and-coin-list-skinny">
              <div id="candle-stick">
                <CandleStickContainer />
              </div>
            </div>
          </div>
        );
      default:
        return ;
    }
  }

  render() {
    //console.log("Dashboard coinListing: ", this.state.coinListing);
    return (
     <MuiThemeProvider>
       <div>
         <div>
           {this._renderCharts()}
         </div>
       </div>

     </MuiThemeProvider>
    );
  }
}

function mapStateToProps({ auth, coins, showCharts, selectedCoin, timeFrame }) {
  return { auth, coins, showCharts, selectedCoin, timeFrame };
}

export default connect(mapStateToProps)(Dashboard);
