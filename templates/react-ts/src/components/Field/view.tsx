import * as React from 'react';
import { connect } from 'react-redux';

import App from 'comps/App';
import * as AppTypes from 'comps/App/type';

class Field extends React.PureComponent<any, any> {
  public static defaultProps: Partial<any> = {
    text: ''
  };

  constructor(props: any) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e: any): void {
    this.props.handleInput(e.target.value);
  }

  render(): JSX.Element {
    const { text } = this.props;
    return (
      <div>
        <input type="text" onInput={this.handleInput} defaultValue={text} />
        <h4>{text}</h4>
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
  handleInput(text: string) {
    dispatch(App.actions.input(text));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Field);
