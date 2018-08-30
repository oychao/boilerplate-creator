import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Redirect, Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import Counter from '../Counter';
import Input from '../Input';

import './style.less';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app">
        <h1>React</h1>
        <HashRouter>
          <div>
            <ul className="app__router">
              <li>
                <Link to="/counter">Counter</Link>
              </li>
              <li>
                <Link to="/input">Input</Link>
              </li>
            </ul>
            <hr />
            <Route exact path="/" render={() => <Redirect to="/counter" />} />
            <Route exact path="/counter" component={Counter.view} />
            <Route exact path="/input" component={Input.view} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default hot(module)(App);
