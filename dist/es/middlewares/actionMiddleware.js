'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var actionMiddleware = function actionMiddleware(provider) {
    return function (next) {
        return function (action) {
            if ((typeof action === 'undefined' ? 'undefined' : _typeof(action)) === 'object') {
                provider.setState(action.reduce || action);
                return action;
            }

            return next(action);
        };
    };
};

exports.default = actionMiddleware;