import React from 'react';
import {connect} from "react-redux";
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FinancialChartsNestedMenu from './FinancialChartsNestedMenu';
import { selectCoinForChart } from '../actions/index';

const style = {
  maxHeight: '40px',
};

class FinancialChartToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: "EOS"
    };
    //this._renderCoinOptions = this._renderCoinOptions.bind(this);
    //this.props.handleClick(this.state.value);
  }

  _renderCoinOptions() {
    if (this.props === null) {
      return <p>Loading...</p>;
    } else {
      return(this.props.coinData.map((coin, index) => {
        return <MenuItem value={coin.ticker} primaryText={coin.ticker} />
      }));
    }
  }

  _renderToobarGroup() {
    if (this.props.selectedCoin.data === undefined) {
      return;
    } else {
      const len = this.props.selectedCoin.data.length;
      const usd = `USD: ${this.props.selectedCoin.data[len-1].close}`;
      const vol = `VOL: ${this.props.selectedCoin.data[len-1].volume}`;
      return (
        <div>
          <ToolbarTitle text={usd} />
          <ToolbarTitle text={vol} />
        </div>
      );
    }
  }


  handleChange = (event, index, value) => {
    console.log(`event: ${event}, index: ${index} value: ${value}`);
    this.setState({value: value});
    this.props.dispatch(selectCoinForChart(value, this.props.timeFrame));
    //this.props.handleClick();
  };

  render() {
    //console.log("Financialchart toolbar props: ", this.props.selectedCoin.data);
    return (
      <Toolbar style={style}>
        <ToolbarGroup firstChild={true}>
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            {this._renderCoinOptions()}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          {this._renderToobarGroup()}
          <FinancialChartsNestedMenu/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

function mapStateToProps({ selectedCoin , timeFrame}) {
  return { selectedCoin, timeFrame }
}

export default connect(mapStateToProps)(FinancialChartToolbar);
