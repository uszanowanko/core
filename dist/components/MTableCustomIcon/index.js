'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = MTableCustomIcon;
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);
var _Icon2 = _interopRequireDefault(require('@mui/material/Icon'));
var _react = _interopRequireDefault(require('react'));
var _propTypes = _interopRequireDefault(require('prop-types'));
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
}
function MTableCustomIcon(_ref) {
  var icon = _ref.icon,
    iconProps = _ref.iconProps;
  if (!icon) {
    return;
  }
  if (typeof icon === 'string') {
    return /*#__PURE__*/ _react['default'].createElement(
      _Icon2['default'],
      iconProps,
      icon
    );
  }
  return /*#__PURE__*/ _react['default'].createElement(
    icon,
    _objectSpread({}, iconProps)
  );
}
MTableCustomIcon.defaultProps = {
  iconProps: {}
};
MTableCustomIcon.propTypes = {
  icon: _propTypes['default'].oneOfType([
    _propTypes['default'].element,
    _propTypes['default'].elementType
  ]).isRequired,
  iconProps: _propTypes['default'].object
};
