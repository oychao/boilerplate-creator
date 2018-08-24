import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import * as actions from './actions';

import logo from './logo.svg';
import './style.less';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleCount = this.handleCount.bind(this);
  }

  handleCount() {
    this.props.handleCount(1);
  }

  render() {
    const { count } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <div
            dangerouslySetInnerHTML={{ __html: logo }}
            className="App-logo"
          />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
                    To get started, edit{' '}
          <code>src/components/App/view.jsx</code> and save to reload.
        </p>
        <div>
          <h2>{count}</h2>
          <button onClick={this.handleCount}>Click me!</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  count: state.count
});
const mapDispatchToProps = (dispatch, props) => ({
  handleCount: num => dispatch(actions.add(num))
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
