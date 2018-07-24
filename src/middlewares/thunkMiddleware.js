const thunkMiddleware = provider => next => action => {
    if (typeof action === 'function') {
        return action({ state: provider.state, dispatch: provider.dispatch });
    }

    return next(action);
};

export default thunkMiddleware;
