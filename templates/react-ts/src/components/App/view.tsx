import * as types from './type';
import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';

// use webpack module when load assets like .svg
const logo = require('./logo.svg') as string;
import './style';

class App extends React.Component<any, any> {
  public static defaultProps: Partial<any> = {
    count: 0
  };

  constructor(props: any) {
    super(props);
    this.handleCount = this.handleCount.bind(this);
  }

  handleCount(): void {
    this.props.handleCount(1);
  }

  render(): JSX.Element {
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
          To get started, edit <code>src/components/App/view.tsx</code> and save
          to reload.
        </p>

        <div>
          <h2>{count}</h2>
          <button onClick={this.handleCount}>Click me!</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (
  state: types.IAppStateToProps,
  props: object
): types.IAppStateToProps => state;
const mapDispatchToProps = (
  dispatch: any,
  props: object
): types.IAppDispatchToProps => ({
  handleCount(num: number) {
    dispatch(actions.add(num));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
