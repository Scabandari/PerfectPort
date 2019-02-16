import React from 'react';
import {connect} from "react-redux";
import Chart from '../components/charts/CandleStickChartWithRSIIndicator';
import Bollinger from '../components/charts/CandleStickChartWithBollingerBandOverlay';
import CandleStickChart from '../components/charts/CandleStickChart';
import { getData, getCryptoCompare } from "../utils"
import { TypeChooser } from "react-stockcharts/lib/helper";


class CandleStickContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // getData().then(data => {
    //   this.setState({ theirData: data });
    // });

  //   getCryptoCompare(this.props.coinForChart).then(data => {
  //     data.columns = [
  //       "date",
  //       "open",
  //       "high",
  //       "low",
  //       "close",
  //       "volume",
  //       "split",
  //       "dividend",
  //       "absoluteChange",
  //       "percentChange"
  //     ];
  //     this.setState({ myData: data });
  //     //console.log("Mine: ", data);
  //   });
   }

  render() {

    if(this.props.selectedCoin.data === undefined) {
      console.log("undefined");
      return <h3>Loading...</h3>
    } else {
      //console.log("Acceptable chart data: ", this.state.myData);
      return (
        <TypeChooser>
          {type => <Bollinger type={type} data={this.props.selectedCoin.data} />}
        </TypeChooser>
      )
    }
  }
}

function mapStateToProps({ coins, selectedCoin }) {
  return { coins, selectedCoin };
}

export default connect(mapStateToProps)(CandleStickContainer);