import * as React from 'react';
import { HashRouter, Route, Redirect, Link } from 'react-router-dom';

import Counter from '../Counter';
import Field from '../Field';

import './style.less';

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
                <Link to="/field">Field</Link>
              </li>
            </ul>
            <hr />
            <Route exact path="/" render={() => <Redirect to="/counter" />} />
            <Route exact path="/counter" component={Counter.view} />
            <Route exact path="/field" component={Field.view} />
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
