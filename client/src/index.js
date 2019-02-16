import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import ReduxPromise from 'redux-promise';
import { createLogger } from 'redux-logger';import App from './components/App';
import reducers from './reducers';

// todo: Am i allowed to have ReduxPromise && promise above?

const middleware = applyMiddleware(promise(), ReduxThunk , createLogger());

const allStoreEnhancers = compose(
  middleware,
  window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(reducers, {}, allStoreEnhancers);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
