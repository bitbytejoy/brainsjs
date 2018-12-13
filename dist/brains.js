"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var brains = function brains(s, a, React) {
  var state = s;
  var actions = a;
  var callbacks = [];

  var listen = function listen(callback) {
    return callbacks.push(callback) - 1;
  };

  var ignore = function ignore(i) {
    return callbacks.splice(i, 1);
  };

  var action = function action(e) {
    var action = actions[e.type];
    state = action ? action(state, e.payload) : state;

    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i](state);
    }
  };

  return function (Component) {
    var stateMapping = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (s) {
      return {
        state: s
      };
    };
    var actionMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (a) {
      return {
        action: a
      };
    };
    return (
      /*#__PURE__*/
      function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class() {
          var _this;

          _classCallCheck(this, _class);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).apply(this, arguments));
          _this.listenId = null;
          return _this;
        }

        _createClass(_class, [{
          key: "componentDidMount",
          value: function componentDidMount() {
            var _this2 = this;

            this.listenId = listen(function () {
              return _this2.forceUpdate();
            }); // If the child triggers an action during componentDidMount
            // we need to make sure it gets the updates back
            // Because the parent triggers componentDidMount after the child

            this.forceUpdate();
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            ignore(this.listenId);
          }
        }, {
          key: "render",
          value: function render() {
            var props = stateMapping(state);
            return React.createElement(Component, _extends({}, this.props, stateMapping(state), actionMapping(action)));
          }
        }]);

        return _class;
      }(React.Component)
    );
  };
};

if (window) window.brains = brains;
var _default = brains;
exports.default = _default;