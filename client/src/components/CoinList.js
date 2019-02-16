import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};


class CoinList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: true,
      height: '300px'
      //myCoins: []
    };
  }

  renderContent() {
    switch(this.props.coinData) {
      case undefined:
      case false:
      case null:
        return (
          <TableRow key='BTC'>
            <TableRowColumn>BTC</TableRowColumn>
            <TableRowColumn>Bitcoin</TableRowColumn>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>1</TableRowColumn>
            <TableRowColumn>1</TableRowColumn>
          </TableRow>
        );

      default:
        return (
          this.props.coinData.map( (row) => (
            <TableRow key={row.ticker}>
              <TableRowColumn>{row.ticker}</TableRowColumn>
              <TableRowColumn>{row.name}</TableRowColumn>
              <TableRowColumn>{row.positionSize}</TableRowColumn>
              <TableRowColumn>{row.price}</TableRowColumn>
              <TableRowColumn>{row.price*row.positionSize}</TableRowColumn>
              <TableRowColumn>{row.volume_24h}</TableRowColumn>
              <TableRowColumn>{row.percent_change_1h}</TableRowColumn>
              <TableRowColumn>{row.percent_change_24h}</TableRowColumn>
              <TableRowColumn>{row.percent_change_7d}</TableRowColumn>
            </TableRow>
          ))
        )
    }
  }

  render() {
    return(
      <div className="CoinList">
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}>

          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={this.state.enableSelectAll}>

            <TableRow>
              <TableHeaderColumn colSpan="5" style={{textAlign: 'center'}}>
                My Coins
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn >Ticker</TableHeaderColumn>
              <TableHeaderColumn >Name</TableHeaderColumn>
              <TableHeaderColumn >Position Size</TableHeaderColumn>
              <TableHeaderColumn >Price</TableHeaderColumn>
              <TableHeaderColumn >Value</TableHeaderColumn>
              <TableHeaderColumn >24hr Vol</TableHeaderColumn>
              <TableHeaderColumn >1hr %</TableHeaderColumn>
              <TableHeaderColumn >24hr %</TableHeaderColumn>
              <TableHeaderColumn >7d %</TableHeaderColumn>

            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={this.state.deselectOnClickaway}

            stripedRows={this.state.stripedRows}>

            {this.renderContent()}
          </TableBody>

        </Table>
      </div>
    );
  }
}

export default CoinList;