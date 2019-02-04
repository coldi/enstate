const actionMiddleware = provider => next => action => {
    if (typeof action === 'object') {
        provider.setState(action.update || action);
        return action;
    }

    return next(action);
};

export default actionMiddleware;
