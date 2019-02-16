import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../App.css';
import { toggleChartsDisplay } from '../actions/index';


class Header extends Component {
	constructor(props) {
		super(props);
    this._onButtonClick = this._onButtonClick.bind(this);
	}

	_renderLogin() {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return (
					<li>
						<a href="/auth/google">Login With Google</a>
					</li>
				);
			default:
				return (
					<li>
						<a href="/api/logout">Logout</a>
					</li>
				);
		}
	}

  _renderChartsToggle() {
    switch (this.props.showCharts){
      case false:
        return (
					<a id="buttonMoveRight"
						 onClick={this._onButtonClick}
						 className="btn">
						<i id="icon-on-button"
							 className="material-icons left">
							show_chart</i>
					</a>
        );
      case true:
        return (
        <a id="buttonMoveRight"
           onClick={this._onButtonClick}
           className="btn">
          <i id="icon-on-button"
             className="material-icons left">
            pie_chart</i>
        </a>
      );
			default:
        return ;
    }
  }

	_onButtonClick() {
    this.props.dispatch(toggleChartsDisplay(this.props.showCharts));
	}

	componentDidMount() {
    //this.props.dispatch(toggleChartsDisplay());
	}

	render() {
    //console.log("render from header: ", this.props.auth);

    return (
			<nav>
				<div className="nav-wrapper">
					<Link
						to={this.props.auth ? '/crypto' : '/'}
						className="left brand-logo"
					>
						PerfectPort
					</Link>
					<div className="right" id="item-group-right-appbar">
            <div id="charts-toggle-button">
              <ul >{this._renderChartsToggle()}</ul>
            </div>
            <div id="login-button">
              <ul >{this._renderLogin()}</ul>
            </div>
					</div>
				</div>
			</nav>
		);
	}
}

function mapStateToProps({ auth, showCharts }) {
	return { auth, showCharts };
}

export default connect(mapStateToProps)(Header);
