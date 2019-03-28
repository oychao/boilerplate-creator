import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import App from '../App';

class Counter extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number.isRequired,
    handleCount: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.handleCount = this.handleCount.bind(this);
  }

  handleCount() {
    const { handleCount } = this.props;
    handleCount(1);
  }

  render() {
    const { count } = this.props;
    return (
      <div>
        <h2>{count}</h2>
        <button type="button" onClick={this.handleCount}>Click me!</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  count: state.app.count
});
const mapDispatchToProps = dispatch => ({
  handleCount: num => dispatch(App.actions.add(num))
});

export default hot(module)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Counter)
);
