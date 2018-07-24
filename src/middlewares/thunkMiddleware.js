const thunkMiddleware = provider => next => action => {
    if (typeof action === 'function') {
        return action(provider.provideContext());
    }

    return next(action);
};

export default thunkMiddleware;
