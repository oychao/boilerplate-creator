import * as types from './type';
import * as React from 'react';
import { connect } from 'react-redux';

import * as actions from './actions';
import './style';

class App extends React.Component<any, any> {
    public static defaultProps: Partial<any> = {
        count: 0,
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
                <h1>Hello World</h1>
                <h2>{count}</h2>
                <button onClick={this.handleCount}>Click me!</button>
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
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
