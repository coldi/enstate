'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Context = require('./Context');

var _Context2 = _interopRequireDefault(_Context);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Container);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Container.__proto__ || Object.getPrototypeOf(Container)).call.apply(_ref, [this].concat(args))), _this), _this.renderChildWithContext = function (context) {
            return _this.props.children(_extends({
                state: context.state
            }, _this.transformSelectors(context), _this.transformActions(context)));
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Container, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.onMount) this.props.onMount();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.onUnmount) this.props.onUnmount();
        }
    }, {
        key: 'transformSelectors',
        value: function transformSelectors(_ref2) {
            var state = _ref2.state;

            return Object.entries(this.props.selectors).reduce(function (actions, _ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    key = _ref4[0],
                    fn = _ref4[1];

                return _extends({}, actions, _defineProperty({}, key, function () {
                    return fn.apply(undefined, arguments)(state);
                }));
            }, {});
        }
    }, {
        key: 'transformActions',
        value: function transformActions(_ref5) {
            var dispatch = _ref5.dispatch;

            return Object.entries(this.props.actions).reduce(function (actions, _ref6) {
                var _ref7 = _slicedToArray(_ref6, 2),
                    key = _ref7[0],
                    fn = _ref7[1];

                return _extends({}, actions, _defineProperty({}, key, function () {
                    return dispatch(fn.apply(undefined, arguments));
                }));
            }, {});
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var isChildFn = typeof this.props.children === 'function';

            return _react2.default.createElement(
                _Context2.default.Consumer,
                null,
                isChildFn ? this.renderChildWithContext : function () {
                    return _this2.props.children;
                }
            );
        }
    }]);

    return Container;
}(_react2.default.Component);

Container.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
    selectors: _propTypes2.default.shape(),
    actions: _propTypes2.default.shape(),
    onMount: _propTypes2.default.func,
    onUnmount: _propTypes2.default.func
};
Container.defaultProps = {
    selectors: {},
    actions: {}
};
exports.default = Container;