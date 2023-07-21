'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.widthToNumber =
  exports.selectionMaxWidth =
  exports.rowActions =
  exports.reducePercentsInCalc =
  exports.parseFirstLastPageButtons =
  exports.elementSize =
  exports.baseIconSize =
  exports.actionsColumnWidth =
    void 0;
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);
var _typeof2 = _interopRequireDefault(require('@babel/runtime/helpers/typeof'));
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
var elementSize = function elementSize(props) {
  return props.options.padding === 'normal' ? 'medium' : 'small';
};
exports.elementSize = elementSize;
var baseIconSize = function baseIconSize(props) {
  return elementSize(props) === 'medium' ? 48 : 32;
};
exports.baseIconSize = baseIconSize;
var rowActions = function rowActions(props) {
  return props.actions
    ? props.actions.filter(function (a) {
        return a.position === 'row' || typeof a === 'function';
      })
    : [];
};
exports.rowActions = rowActions;
var actionsColumnWidth = function actionsColumnWidth(props) {
  return rowActions(props).length * baseIconSize(props);
};
exports.actionsColumnWidth = actionsColumnWidth;
var selectionMaxWidth = function selectionMaxWidth(props, maxTreeLevel) {
  return baseIconSize(props) + 9 * maxTreeLevel;
};
exports.selectionMaxWidth = selectionMaxWidth;
var reducePercentsInCalc = function reducePercentsInCalc(calc, fullValue) {
  if (!calc) return ''.concat(fullValue, 'px');
  var captureGroups = calc.match(/(\d*)%/);
  if (captureGroups && captureGroups.length > 1) {
    var percentage = captureGroups[1];
    return calc.replace(
      /\d*%/,
      ''.concat(fullValue * (percentage / 100), 'px')
    );
  }
  return calc.replace(/\d*%/, ''.concat(fullValue, 'px'));
};
exports.reducePercentsInCalc = reducePercentsInCalc;
var widthToNumber = function widthToNumber(width) {
  if (typeof width === 'number') return width;
  if (!width || !width.match(/^\s*\d+(px)?\s*$/)) return NaN;
  return Number(width.replace(/px$/, ''));
};
exports.widthToNumber = widthToNumber;
var parseFirstLastPageButtons = function parseFirstLastPageButtons(
  showFirstLastPageButtons,
  isRTL
) {
  var result = {
    first: true,
    last: true
  };
  if (typeof showFirstLastPageButtons === 'boolean') {
    result = {
      first: showFirstLastPageButtons,
      last: showFirstLastPageButtons
    };
  } else if ((0, _typeof2['default'])(showFirstLastPageButtons) === 'object') {
    result = _objectSpread(_objectSpread({}, result), showFirstLastPageButtons);
  }
  if (isRTL) {
    result = {
      first: result.last,
      last: result.first
    };
  }
  return result;
};
exports.parseFirstLastPageButtons = parseFirstLastPageButtons;
