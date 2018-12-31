import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import App from '../components/App';

const history = createBrowserHistory();

// do not use this enhancer when in production environment
const composeEnhancers = (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    router: connectRouter(history),
    app: App.reducer
  }),
  composeEnhancers(applyMiddleware(routerMiddleware(history)))
);

export default store;
