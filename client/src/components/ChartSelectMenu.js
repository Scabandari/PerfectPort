import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
  display: 'inline-block',
  margin: '16px 0px 16px 0px',
  maxHeight: '400px',
  overflow: 'auto',
};

class ChartSelectMenu extends Component {
  constructor(props) {
    super(props);
    }

  _renderMenuItems() {
    if (this.props === null) {
      return <h3>Loading...</h3>;
    } else {
      return(this.props.coinData.map((coin) => {
        return <MenuItem
          key={coin.ticker}
          onClick={this.props.onClickHandler.bind(this, coin.ticker)}
          primaryText={coin.ticker}
        />
      }));
    }
  }
  render() {
    //console.log('ChartSelectMenu props: ', this.props);
    return (
      <div>
        <Paper style={style}>
          <Menu>
            <ul>
              {this._renderMenuItems()}
            </ul>
          </Menu>
        </Paper>
      </div>
    )
  }
}

export default ChartSelectMenu;