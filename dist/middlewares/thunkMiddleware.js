'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var thunkMiddleware = function thunkMiddleware(provider) {
    return function (next) {
        return function (action) {
            if (typeof action === 'function') {
                return action(provider.provideContext());
            }

            return next(action);
        };
    };
};

exports.default = thunkMiddleware;