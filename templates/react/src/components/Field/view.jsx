import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import App from '../App';

class Field extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string.isRequired,
    handleInput: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    const { handleInput } = this.props;
    handleInput(e.target.value);
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        <input type="text" onInput={this.handleInput} defaultValue={text} />
        <h4>{text}</h4>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  text: state.app.text
});
const mapDispatchToProps = dispatch => ({
  handleInput: text => dispatch(App.actions.input(text))
});

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Field)
);
