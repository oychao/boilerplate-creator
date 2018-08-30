import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './src/store';
import App from './src/components/App';

import './less';

ReactDOM.render(
  <Provider store={store}>
    <App.view />
  </Provider>,
  document.querySelector('#app')
);
