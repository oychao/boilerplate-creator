import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import App from '../components/App';
import { create } from 'domain';

const history = createBrowserHistory();

// do not use this enhancer when in production environment
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  connectRouter(history)(App.reducer),
  composeEnhancers(applyMiddleware(routerMiddleware(history)))
);

export default store;
