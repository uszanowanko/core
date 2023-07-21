'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _typeof = require('@babel/runtime/helpers/typeof');
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;
var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);
var _Box2 = _interopRequireDefault(require('@mui/material/Box'));
var _IconButton = _interopRequireDefault(require('@mui/material/IconButton'));
var _Tooltip = _interopRequireDefault(require('@mui/material/Tooltip'));
var _Typography = _interopRequireDefault(require('@mui/material/Typography'));
var _propTypes = _interopRequireDefault(require('prop-types'));
var _react = _interopRequireDefault(require('react'));
var _styles = require('@mui/material/styles');
var CommonValues = _interopRequireWildcard(
  require('../../utils/common-values')
);
var _LocalizationStore = require('../../store/LocalizationStore');
function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null;
  var cacheBabelInterop = new WeakMap();
  var cacheNodeInterop = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
  })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache(nodeInterop);
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}
/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

function MTablePagination(props) {
  var theme = (0, _styles.useTheme)();
  var icons = (0, _LocalizationStore.useIconStore)();
  var localization = (0, _LocalizationStore.useLocalizationStore)().pagination;
  if (process.env.NODE_ENV === 'development' && !props.onPageChange) {
    console.error(
      'The prop `onPageChange` in pagination is undefined and paging does not work. ' +
        'This is most likely caused by an old material-ui version <= 4.11.X.' +
        'To fix this, install either material-ui >=4.12 or downgrade material-table-core to <=3.0.15.'
    );
  }
  if (process.env.NODE_ENV === 'development' && localization.labelRowsSelect) {
    console.warn(
      'The prop `labelRowsSelect` was renamed to labelDisplayedRows. Please rename the prop accordingly: https://mui.com/material-ui/api/table-pagination/#main-content.'
    );
  }
  var handleFirstPageButtonClick = function handleFirstPageButtonClick(event) {
    props.onPageChange(event, 0);
  };
  var handleBackButtonClick = function handleBackButtonClick(event) {
    props.onPageChange(event, props.page - 1);
  };
  var handleNextButtonClick = function handleNextButtonClick(event) {
    props.onPageChange(event, props.page + 1);
  };
  var handleLastPageButtonClick = function handleLastPageButtonClick(event) {
    props.onPageChange(
      event,
      Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1)
    );
  };
  var count = props.count,
    page = props.page,
    rowsPerPage = props.rowsPerPage,
    showFirstLastPageButtons = props.showFirstLastPageButtons;
  var _CommonValues$parseFi = CommonValues.parseFirstLastPageButtons(
      showFirstLastPageButtons,
      theme.direction === 'rtl'
    ),
    first = _CommonValues$parseFi.first,
    last = _CommonValues$parseFi.last;
  return /*#__PURE__*/ _react['default'].createElement(
    _Box2['default'],
    {
      sx: {
        flexShrink: 0,
        color: 'text.secondary',
        display: 'flex',
        alignItems: 'center'
      },
      ref: props.forwardedRef
    },
    first &&
      /*#__PURE__*/ _react['default'].createElement(
        _Tooltip['default'],
        {
          title: localization.firstTooltip
        },
        /*#__PURE__*/ _react['default'].createElement(
          'span',
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _IconButton['default'],
            {
              onClick: handleFirstPageButtonClick,
              disabled: page === 0,
              'aria-label': localization.firstAriaLabel,
              size: 'large'
            },
            theme.direction === 'rtl'
              ? /*#__PURE__*/ _react['default'].createElement(
                  icons.LastPage,
                  null
                )
              : /*#__PURE__*/ _react['default'].createElement(
                  icons.FirstPage,
                  null
                )
          )
        )
      ),
    /*#__PURE__*/ _react['default'].createElement(
      _Tooltip['default'],
      {
        title: localization.previousTooltip
      },
      /*#__PURE__*/ _react['default'].createElement(
        'span',
        null,
        /*#__PURE__*/ _react['default'].createElement(
          _IconButton['default'],
          {
            onClick: handleBackButtonClick,
            disabled: page === 0,
            'aria-label': localization.previousAriaLabel
          },
          theme.direction === 'rtl'
            ? /*#__PURE__*/ _react['default'].createElement(
                icons.NextPage,
                null
              )
            : /*#__PURE__*/ _react['default'].createElement(
                icons.PreviousPage,
                null
              )
        )
      )
    ),
    /*#__PURE__*/ _react['default'].createElement(
      _Typography['default'],
      {
        variant: 'caption',
        style: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center',
          flexBasis: 'inherit'
        }
      },
      localization.labelDisplayedRows
        .replace(
          '{from}',
          props.count === 0 ? 0 : props.page * props.rowsPerPage + 1
        )
        .replace(
          '{to}',
          Math.min((props.page + 1) * props.rowsPerPage, props.count)
        )
        .replace('{count}', props.count)
    ),
    /*#__PURE__*/ _react['default'].createElement(
      _Tooltip['default'],
      {
        title: localization.nextTooltip
      },
      /*#__PURE__*/ _react['default'].createElement(
        'span',
        null,
        /*#__PURE__*/ _react['default'].createElement(
          _IconButton['default'],
          {
            onClick: handleNextButtonClick,
            disabled: page >= Math.ceil(count / rowsPerPage) - 1,
            'aria-label': localization.nextAriaLabel
          },
          theme.direction === 'rtl'
            ? /*#__PURE__*/ _react['default'].createElement(
                icons.PreviousPage,
                null
              )
            : /*#__PURE__*/ _react['default'].createElement(
                icons.NextPage,
                null
              )
        )
      )
    ),
    last &&
      /*#__PURE__*/ _react['default'].createElement(
        _Tooltip['default'],
        {
          title: localization.lastTooltip
        },
        /*#__PURE__*/ _react['default'].createElement(
          'span',
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _IconButton['default'],
            {
              onClick: handleLastPageButtonClick,
              disabled: page >= Math.ceil(count / rowsPerPage) - 1,
              'aria-label': localization.lastAriaLabel,
              size: 'large'
            },
            theme.direction === 'rtl'
              ? /*#__PURE__*/ _react['default'].createElement(
                  icons.FirstPage,
                  null
                )
              : /*#__PURE__*/ _react['default'].createElement(
                  icons.LastPage,
                  null
                )
          )
        )
      )
  );
}
MTablePagination.propTypes = {
  onPageChange: _propTypes['default'].func,
  page: _propTypes['default'].number,
  count: _propTypes['default'].number,
  rowsPerPage: _propTypes['default'].number,
  classes: _propTypes['default'].object,
  localization: _propTypes['default'].object,
  showFirstLastPageButtons: _propTypes['default'].oneOfType([
    _propTypes['default'].object,
    _propTypes['default'].bool
  ]),
  forwardedRef: _propTypes['default'].func
};
MTablePagination.defaultProps = {
  showFirstLastPageButtons: true
};
var MTableGroupRowRef = /*#__PURE__*/ _react['default'].forwardRef(
  function MTablePaginationRef(props, ref) {
    return /*#__PURE__*/ _react['default'].createElement(
      MTablePagination,
      (0, _extends2['default'])({}, props, {
        forwardedRef: ref
      })
    );
  }
);
var MTablePaginationOuter = MTableGroupRowRef;
var _default = MTablePaginationOuter;
exports['default'] = _default;
