import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from '../containers/Header';
import Landing from './Landing';
import Dashboard from '../containers/Dashboard';
import SearchCoinCardContainer from '../containers/SearchCoinCardContainer';

class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
    //console.log("render from App: ", this.props.auth);
		return (
			<div className="container">
				<BrowserRouter>
					<div>
						<Header />
						<Route exact path="/" component={Landing} />
						<Route exact path="/crypto" component={Dashboard} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
