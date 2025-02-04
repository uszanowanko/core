'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;
var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);
var _TextField2 = _interopRequireDefault(require('@mui/material/TextField'));
var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
);
var _react = _interopRequireDefault(require('react'));
var _AdapterDateFns = require('@mui/x-date-pickers/AdapterDateFns');
var _xDatePickers = require('@mui/x-date-pickers');
var _excluded = ['columnDef', 'value', 'onChange', 'locale', 'forwardedRef'],
  _excluded2 = [
    'columnDef',
    'rowData',
    'onRowDataChange',
    'errorState',
    'onBulkEditRowChanged',
    'scrollWidth'
  ];
function DateField(_ref) {
  var columnDef = _ref.columnDef,
    value = _ref.value,
    onChange = _ref.onChange,
    locale = _ref.locale,
    forwardedRef = _ref.forwardedRef,
    rest = (0, _objectWithoutProperties2['default'])(_ref, _excluded);
  var getProps = function getProps() {
    var columnDef = rest.columnDef,
      rowData = rest.rowData,
      onRowDataChange = rest.onRowDataChange,
      errorState = rest.errorState,
      onBulkEditRowChanged = rest.onBulkEditRowChanged,
      scrollWidth = rest.scrollWidth,
      remaining = (0, _objectWithoutProperties2['default'])(rest, _excluded2);
    return remaining;
  };
  var dateFormat =
    columnDef.dateSetting && columnDef.dateSetting.format
      ? columnDef.dateSetting.format
      : 'dd.MM.yyyy';
  var datePickerProps = getProps();
  return /*#__PURE__*/ _react['default'].createElement(
    _xDatePickers.LocalizationProvider,
    {
      dateAdapter: _AdapterDateFns.AdapterDateFns,
      locale: locale
    },
    /*#__PURE__*/ _react['default'].createElement(
      _xDatePickers.DatePicker,
      (0, _extends2['default'])({}, datePickerProps, {
        ref: forwardedRef,
        format: dateFormat,
        value: value || null,
        onChange: onChange,
        clearable: true,
        InputProps: {
          style: {
            fontSize: 13
          }
        },
        renderInput: function renderInput(params) {
          return /*#__PURE__*/ _react['default'].createElement(
            _TextField2['default'],
            params
          );
        },
        inputProps: {
          'aria-label': ''.concat(columnDef.title, ': press space to edit')
        }
      })
    )
  );
}
var _default = /*#__PURE__*/ _react['default'].forwardRef(function DateFieldRef(
  props,
  ref
) {
  return /*#__PURE__*/ _react['default'].createElement(
    DateField,
    (0, _extends2['default'])({}, props, {
      forwardedRef: ref
    })
  );
});
exports['default'] = _default;
