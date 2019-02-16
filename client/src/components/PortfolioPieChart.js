import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
//import axios from 'axios';

const colors = [
  '#d32f2f',
  '#0288D1',
  '#FBC02D',
  '#455A64',
  '#C2185B',
  '#0097A7',
  '#FFA000',
  '#7B1FA2',
  '#00796B',
  '#F57C00',
  '#512DA8',
  '#388E3C',
  '#E64A19',
  '#303F9F',
  '#689F38',
  '#5D4037',
];

class PortfolioPieChart extends Component {
  constructor(props) {
    super(props);
  }
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
    location: 'city'
  };

  _getPortfolioValue(coin_list) {
    let sum = 0;
    const len = coin_list.length;
    for(let i=0; i<len; i++) {
      sum += coin_list[i].positionSize * coin_list[i].price;
    }
    return Math.floor(sum);
  }

  render() {
    console.log("props from pie chart: ", this.props);
    const labels_ = this.props.coinData.map(myCoin => myCoin.ticker);
    const positions = this.props.coinData.map(myCoin => myCoin.price*myCoin.positionSize);
    const backgroundColors = labels_.map((label, i) => (colors[i]));
    const chartData = {
      labels: labels_,
      datasets: [{
      label: 'Value',
      data: positions,
      backgroundColor: backgroundColors
      }]
    };
    return (
      <Pie
        data={chartData}
        options={{
          title: {
            display: this.props.displayTitle,
            text: `Portfolio Value: ${this._getPortfolioValue(this.props.coinData)} USD`,
            fontsize: 55
          },
          legend: {
            display: this.props.displayLegend,
            position: this.props.legendPosition
          }
        }}
      />
    );
  }
}

export default PortfolioPieChart;