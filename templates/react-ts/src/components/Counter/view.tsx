import * as React from 'react';
import { connect } from 'react-redux';

import App from 'comps/App';
import * as AppTypes from 'comps/App/type';

export class Counter extends React.PureComponent<any, any> {
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
      <div>
        <h2>{count}</h2>
        <button onClick={this.handleCount}>Click me!</button>
      </div>
    );
  }
}

const mapStateToProps = (
  state: AppTypes.IReduxState,
  props: object
): AppTypes.IAppStateToProps => state.app;
const mapDispatchToProps = (
  dispatch: any,
  props: object
): AppTypes.IAppDispatchToProps => ({
  handleCount(num: number) {
    dispatch(App.actions.add(num));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
