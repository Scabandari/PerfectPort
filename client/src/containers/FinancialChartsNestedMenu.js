import React, { Component } from 'react';
import {connect} from "react-redux";
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { DAILY, MINUTE, HOUR } from '../utils';
import { selectCoinForChart, changeTimeFrame } from '../actions/index';
import { toggleTimeFrame } from "../actions/index";

class FinancialChartsNestedMenu extends Component {
  constructor(props) {
    super(props);

    this._handleDailyClick = this._handleDailyClick.bind(this);
  }

  _handleDailyClick(e, time_frame) {
    e.preventDefault();
    // todo get rid of toggelTimeFrame code??????????????/
    this.props.dispatch(changeTimeFrame(time_frame));
    this.props.dispatch(selectCoinForChart(this.props.selectedCoin.coin, time_frame));
  }

  render() {

    return (
      <IconMenu
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Data"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="Daily" onClick={(e) => {this._handleDailyClick(e, DAILY)}} />,
            <MenuItem primaryText="Hourly" onClick={(e) => {this._handleDailyClick(e, HOUR)}} />,
            <MenuItem primaryText="Minute" onClick={(e) => {this._handleDailyClick(e, MINUTE)}} />
          ]}
        />

        <MenuItem
          primaryText="Case Tools"
          rightIcon={<ArrowDropRight />}
          menuItems={[
            <MenuItem primaryText="UPPERCASE" />,
            <MenuItem primaryText="lowercase" />,
            <MenuItem primaryText="CamelCase" />,
            <MenuItem primaryText="Propercase" />,
          ]}
        />
        <Divider />
        <MenuItem primaryText="Download" leftIcon={<Download />} />
        <Divider />
        <MenuItem value="Del" primaryText="Delete" />

      </IconMenu>
    )
  }
}

function mapStateToProps({ selectedCoin, timeFrame }) {
  return { selectedCoin, timeFrame };
}

export default connect(mapStateToProps)(FinancialChartsNestedMenu);