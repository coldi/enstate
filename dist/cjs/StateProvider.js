'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

var _actionMiddleware = require('./middlewares/actionMiddleware');

var _actionMiddleware2 = _interopRequireDefault(_actionMiddleware);

var _thunkMiddleware = require('./middlewares/thunkMiddleware');

var _thunkMiddleware2 = _interopRequireDefault(_thunkMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var makeDispatcher = function makeDispatcher(provider) {
    return function (action) {
        return provider.middleware(action);
    };
};

var combineMiddlewares = function combineMiddlewares(provider) {
    return function (middlewares) {
        var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var current = middlewares[i];
        var next = middlewares[i + 1] ? combineMiddlewares(provider)(middlewares, i + 1) : function () {};
        return current(provider)(next);
    };
};

var StateProvider = function (_React$Component) {
    _inherits(StateProvider, _React$Component);

    function StateProvider(props) {
        _classCallCheck(this, StateProvider);

        var _this = _possibleConstructorReturn(this, (StateProvider.__proto__ || Object.getPrototypeOf(StateProvider)).call(this, props));

        _this.dispatch = makeDispatcher(_this);
        _this.state = props.initialState;
        // manage a pending state due to the fact that
        // setState does not work in a synchronous way.
        _this.pendingState = _this.state;
        _this.getState = function () {
            return _this.pendingState;
        };
        var setReactState = _this.setState.bind(_this);
        // hook into setState and perform an update to our pending state.
        _this.setState = function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var firstArg = args[0],
                callback = args[1];


            var stateUpdate = void 0;
            if (typeof firstArg === 'function') {
                stateUpdate = firstArg(_this.pendingState);
            } else if ((typeof firstArg === 'undefined' ? 'undefined' : _typeof(firstArg)) === 'object' && firstArg !== null) {
                stateUpdate = firstArg;
            }

            _this.pendingState = _extends({}, _this.pendingState, stateUpdate);

            // call original setState and catch up with the component's state.
            setReactState(firstArg, function () {
                _this.pendingState = _this.state;
                if (callback) callback();
            });
        };

        _this.middleware = combineMiddlewares(_this)(props.middlewares);
        return _this;
    }

    _createClass(StateProvider, [{
        key: 'provideContext',
        value: function provideContext() {
            return {
                dispatch: this.dispatch,
                state: this.state,
                getState: this.getState
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _Context2.default.Provider,
                { value: this.provideContext() },
                this.props.children
            );
        }
    }]);

    return StateProvider;
}(_react2.default.Component);

StateProvider.propTypes = {
    children: _propTypes2.default.node.isRequired,
    initialState: _propTypes2.default.shape(),
    middlewares: _propTypes2.default.arrayOf(_propTypes2.default.func)
};
StateProvider.defaultProps = {
    initialState: {},
    // apply default middlewares unless custom middlewares are defined
    middlewares: [_thunkMiddleware2.default, _actionMiddleware2.default]
};
exports.default = StateProvider;