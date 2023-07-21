'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;
var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);
var _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'));
var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);
var _react = _interopRequireDefault(require('react'));
var _propTypes = _interopRequireDefault(require('prop-types'));
var _Icon = _interopRequireDefault(require('@mui/material/Icon'));
var _IconButton = _interopRequireDefault(require('@mui/material/IconButton'));
var _Tooltip = _interopRequireDefault(require('@mui/material/Tooltip'));
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly &&
      (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })),
      keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2
      ? ownKeys(Object(source), !0).forEach(function (key) {
          (0, _defineProperty2['default'])(target, key, source[key]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        )
      : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
  }
  return target;
} /* eslint-disable multiline-ternary */
function MTableAction(props) {
  var action = props.action;
  if (typeof action === 'function') {
    action = action(props.data);
    if (!action) {
      return null;
    }
  }
  if (action.action) {
    action = action.action(props.data);
    if (!action) {
      return null;
    }
  }
  if (action.hidden) {
    return null;
  }
  var disabled = action.disabled || props.disabled;
  var handleOnClick = function handleOnClick(event) {
    if (action.onClick) {
      action.onClick(event, props.data);
      event.stopPropagation();
    }
  };

  // You may provide events via the "action.handlers" prop. It is an object.
  // The event name is the key, and the value is the handler func.
  var handlers = action.handlers || {};
  var eventHandlers = Object.entries(handlers).reduce(function (o, _ref) {
    var _ref2 = (0, _slicedToArray2['default'])(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];
    o[k] = function (e) {
      return v(e, props.data);
    };
    return o;
  }, {});
  var icon = null;
  switch ((0, _typeof2['default'])(action.icon)) {
    case 'string':
      icon = /*#__PURE__*/ _react['default'].createElement(
        _Icon['default'],
        action.iconProps,
        action.icon
      );
      break;
    case 'function':
      icon = action.icon(
        _objectSpread(
          _objectSpread({}, action.iconProps),
          {},
          {
            disabled: disabled
          }
        )
      );
      break;
    case 'undefined':
      icon = null;
      break;
    default:
      icon = /*#__PURE__*/ _react['default'].createElement(
        action.icon,
        action.iconProps
      );
  }
  var button = /*#__PURE__*/ _react['default'].createElement(
    _IconButton['default'],
    (0, _extends2['default'])(
      {
        ref: props.forwardedRef,
        size: props.size,
        color: 'inherit',
        disabled: disabled,
        onClick: handleOnClick
      },
      eventHandlers
    ),
    icon
  );
  if (action.tooltip) {
    // fix for issue #1049
    // https://github.com/mbrn/material-table/issues/1049
    return disabled
      ? /*#__PURE__*/ _react['default'].createElement(
          _Tooltip['default'],
          {
            title: action.tooltip
          },
          /*#__PURE__*/ _react['default'].createElement('span', null, button)
        )
      : /*#__PURE__*/ _react['default'].createElement(
          _Tooltip['default'],
          {
            title: action.tooltip
          },
          button
        );
  } else {
    return button;
  }
}
MTableAction.defaultProps = {
  action: {},
  data: {}
};
MTableAction.propTypes = {
  action: _propTypes['default'].oneOfType([
    _propTypes['default'].func,
    _propTypes['default'].object
  ]).isRequired,
  data: _propTypes['default'].oneOfType([
    _propTypes['default'].object,
    _propTypes['default'].arrayOf(_propTypes['default'].object)
  ]),
  disabled: _propTypes['default'].bool,
  size: _propTypes['default'].string
};
var _default = /*#__PURE__*/ _react['default'].forwardRef(
  function MTableActionRef(props, ref) {
    return /*#__PURE__*/ _react['default'].createElement(
      MTableAction,
      (0, _extends2['default'])({}, props, {
        forwardedRef: ref
      })
    );
  }
);
exports['default'] = _default;
