/* eslint-disable  no-underscore-dangle */
export default function devtoolsMiddleware (provider) {
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
    /* const unsubscribe = */ devTools.subscribe((message) => {
        if (message.type === 'DISPATCH' && message.payload.type === 'JUMP_TO_STATE') {
            const state = typeof message.state === 'string'
                ? JSON.parse(message.state)
                : message.state;
            provider.setState(state);
        }
    });

    /*
    const unmount = provider.componentWillUnmount.bind(provider);
    // eslint-disable-next-line  no-param-reassign
    provider.componentWillUnmount = function componentWillUnmount () {
        unmount();
        unsubscribe();
    };
    */

    return next => action => {
        if (typeof action === 'object') {
            const nextState = {
                ...provider.state,
                ...action.reduce(provider.state),
            };
            devTools.send(action.type, nextState);
        }

        return next(action);
    };
}
