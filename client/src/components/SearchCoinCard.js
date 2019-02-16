import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import AutoComplete from "material-ui/AutoComplete/index";
import axios from 'axios';


class SearchCoinCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentCoin: "",
      positionSize: 0
      //listings: []
    };

    this._onCoinChange = this._onCoinChange.bind(this);
    this._onPositionSizeChange = this._onPositionSizeChange.bind(this);
    this._submitCoin = this._submitCoin.bind(this);
  }


  _onPositionSizeChange(event) {
    event.preventDefault();
    //console.log("_onPositionSizeChange triggered: ", this.state.currentCoin);
    this.setState({
      positionSize: event.target.value
    });
    //console.log("new state: ", this.state.positionSize);
  }

  _onCoinChange(event) {
    event.preventDefault();
    //console.log("_onCoinChange triggered: ", this.state.currentCoin);
    this.setState({
      currentCoin: event.target.value
    });
    //console.log("new state: ", this.state.currentCoin);
  }

  _submitCoin() {
    const newCoin = {
      ticker: this.state.currentCoin,
      positionSize: this.state.positionSize
    };
    this.props.addCoin(newCoin);
    this.setState({
      currentCoin: "",
      positionSize: 0
    });
  }

  render() {
    console.log("props: ",this.props);
    return(
      <Card>
        <CardHeader
          title="Manage Your Portfolio"
        />
        <CardText>
          <div>
            <TextField
              hintText="Symbol"
              value={this.state.currentCoin}
              onChange={this._onCoinChange}
            />
          </div>
          <div>
            <TextField
              hintText="Amount"
              value={this.state.positionSize}
              onChange={this._onPositionSizeChange}
            />
          </div>
        </CardText>
        <CardActions>
          <FlatButton
            label="Add"
            //onClick={() => this.props.addCoin(this.state.currentCoin)}/>
            onClick={() => this._submitCoin()}/>
        </CardActions>
      </Card>
    );
  }
}


export default SearchCoinCard;
