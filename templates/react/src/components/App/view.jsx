import React from 'react';
import { connect, } from 'react-redux';
import { hot, } from 'react-hot-loader';

import * as actions from './actions';

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
        const { count, } = this.props;
        return (
            <div>
                <h1>Hello World</h1>
                <h2>{count}</h2>
                <button onClick={this.handleCount}>Click me!</button>
            </div>
        );
    }
}

// I don't think PropTypes is a good idea for type checks,
// if you really need it, use flow or typescript instead

const mapStateToProps = (state, props) => ({
    count: state.count,
});
const mapDispatchToProps = (dispatch, props) => ({
    handleCount: num => dispatch(actions.add(num)),
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
