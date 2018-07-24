import PropTypes from 'prop-types';
import React from 'react';
import Context from './Context';
import actionMiddleware from './middlewares/actionMiddleware';
import thunkMiddleware from './middlewares/thunkMiddleware';

const makeDispatcher = provider => action => provider.middleware(action);

const combineMiddlewares = provider => (middlewares, i = 0) => {
    const current = middlewares[i];
    const next = middlewares[i + 1]
        ? combineMiddlewares(provider)(middlewares, i + 1)
        : (() => {});
    return current(provider)(next);
};

export default class StateProvider extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        initialState: PropTypes.shape(),
        middlewares: PropTypes.arrayOf(PropTypes.func),
    };

    static defaultProps = {
        initialState: {},
        // apply thunk middleware unless custom middlewares are defined
        middlewares: [thunkMiddleware],
    };

    constructor (props) {
        super(props);
        this.state = props.initialState;
        this.dispatch = makeDispatcher(this);
        this.middleware = combineMiddlewares(this)([
            ...props.middlewares,
            actionMiddleware,
        ]);
    }

    provideContext () {
        return {
            dispatch: this.dispatch,
            state: this.state, // TODO: getState() instead?
        };
    }

    render() {
        return (
            <Context.Provider value={this.provideContext()}>
                {this.props.children}
            </Context.Provider>
        );
    }
}
