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
        this.dispatch = makeDispatcher(this);
        this.state = props.initialState;
        // manage a pending state due to the fact that
        // setState does not work in a synchronous way.
        this.pendingState = this.state;
        this.getState = () => this.pendingState;
        const setReactState = this.setState.bind(this);
        // hook into setState and perform an update to our pending state.
        this.setState = (...args) => {
            const [firstArg, callback] = args;

            let stateUpdate;
            if (typeof firstArg === 'function') {
                stateUpdate = firstArg(this.pendingState);
            } else if (typeof firstArg === 'object' && firstArg !== null) {
                stateUpdate = firstArg;
            }

            this.pendingState = { ...this.pendingState, ...stateUpdate };

            // call original setState and catch up with the component's state.
            setReactState(firstArg, () => {
                this.pendingState = this.state;
                if (callback) callback();
            });
        };

        this.middleware = combineMiddlewares(this)([
            ...props.middlewares,
            actionMiddleware,
        ]);
    }

    provideContext () {
        return {
            dispatch: this.dispatch,
            state: this.state,
            getState: this.getState,
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
