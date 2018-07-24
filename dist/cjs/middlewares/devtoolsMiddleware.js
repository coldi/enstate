'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = devtoolsMiddleware;
/* eslint-disable  no-underscore-dangle */
function devtoolsMiddleware(provider) {
    var devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
    /* const unsubscribe = */devTools.subscribe(function (message) {
        if (message.type === 'DISPATCH' && message.payload.type === 'JUMP_TO_STATE') {
            var state = typeof message.state === 'string' ? JSON.parse(message.state) : message.state;
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

    return function (next) {
        return function (action) {
            if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object') {
                var nextState = _extends({}, provider.state, action.reduce(provider.state));
                devTools.send(action.type, nextState);
            }

            return next(action);
        };
    };
}