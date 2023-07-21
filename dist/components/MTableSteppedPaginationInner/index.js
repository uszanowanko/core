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
var _IconButton = _interopRequireDefault(require('@mui/material/IconButton'));
var _Tooltip = _interopRequireDefault(require('@mui/material/Tooltip'));
var _Box = _interopRequireDefault(require('@mui/material/Box'));
var _Button = _interopRequireDefault(require('@mui/material/Button'));
var _propTypes = _interopRequireDefault(require('prop-types'));
var _react = _interopRequireDefault(require('react'));
var _styles = require('@mui/material/styles');
var CommonValues = _interopRequireWildcard(
  require('../../utils/common-values')
);
var _store = require('../../store');
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
function MTablePaginationInner(props) {
  var theme = (0, _styles.useTheme)();
  var localization = (0, _store.useLocalizationStore)().pagination;
  var icons = (0, _store.useIconStore)();
  var handleFirstPageButtonClick = function handleFirstPageButtonClick(event) {
    props.onPageChange(event, 0);
  };
  var handleBackButtonClick = function handleBackButtonClick(event) {
    props.onPageChange(event, props.page - 1);
  };
  var handleNextButtonClick = function handleNextButtonClick(event) {
    props.onPageChange(event, props.page + 1);
  };
  var handleNumberButtonClick = function handleNumberButtonClick(number) {
    return function (event) {
      props.onPageChange(event, number);
    };
  };
  var handleLastPageButtonClick = function handleLastPageButtonClick(event) {
    props.onPageChange(
      event,
      Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1)
    );
  };
  function renderPagesButton(start, end, maxPages, numberOfPagesAround) {
    var buttons = [];

    // normalize to 1 - 10
    numberOfPagesAround = Math.max(1, Math.min(10, numberOfPagesAround));
    for (
      var p = Math.max(start - numberOfPagesAround + 1, 0);
      p <= Math.min(end + numberOfPagesAround - 1, maxPages);
      p++
    ) {
      var buttonVariant = p === props.page ? 'contained' : 'text';
      buttons.push(
        /*#__PURE__*/ _react['default'].createElement(
          _Button['default'],
          {
            size: 'small',
            style: {
              boxShadow: 'none',
              maxWidth: '30px',
              maxHeight: '30px',
              minWidth: '30px',
              minHeight: '30px'
            },
            disabled: p === props.page,
            variant: buttonVariant,
            onClick: handleNumberButtonClick(p),
            key: p
          },
          p + 1
        )
      );
    }
    return /*#__PURE__*/ _react['default'].createElement('span', null, buttons);
  }
  var count = props.count,
    page = props.page,
    rowsPerPage = props.rowsPerPage,
    showFirstLastPageButtons = props.showFirstLastPageButtons,
    numberOfPagesAround = props.numberOfPagesAround;
  var maxPages = Math.ceil(count / rowsPerPage) - 1;
  var pageStart = Math.max(page - 1, 0);
  var pageEnd = Math.min(maxPages, page + 1);
  var _CommonValues$parseFi = CommonValues.parseFirstLastPageButtons(
      showFirstLastPageButtons,
      theme.direction === 'rtl'
    ),
    first = _CommonValues$parseFi.first,
    last = _CommonValues$parseFi.last;
  return /*#__PURE__*/ _react['default'].createElement(
    _Box['default'],
    {
      sx: {
        flexShrink: 0,
        color: 'text.secondary',
        marginLeft: 2.5,
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
          /*#__PURE__*/ _react['default'].createElement(
            icons.PreviousPage,
            null
          )
        )
      )
    ),
    /*#__PURE__*/ _react['default'].createElement(
      _Box['default'],
      {
        sx: {
          display: {
            xs: 'false',
            sm: 'false',
            md: 'block'
          }
        }
      },
      renderPagesButton(pageStart, pageEnd, maxPages, numberOfPagesAround)
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
            disabled: page >= maxPages,
            'aria-label': localization.nextAriaLabel,
            size: 'large'
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
MTablePaginationInner.propTypes = {
  onPageChange: _propTypes['default'].func,
  page: _propTypes['default'].number,
  forwardedRef: _propTypes['default'].func,
  count: _propTypes['default'].number,
  rowsPerPage: _propTypes['default'].number,
  numberOfPagesAround: _propTypes['default'].number,
  classes: _propTypes['default'].object,
  theme: _propTypes['default'].any,
  showFirstLastPageButtons: _propTypes['default'].oneOfType([
    _propTypes['default'].object,
    _propTypes['default'].bool
  ])
};
MTablePaginationInner.defaultProps = {
  showFirstLastPageButtons: true
};
var MTableSteppedPaginationRef = /*#__PURE__*/ _react['default'].forwardRef(
  function MTableSteppedPaginationRef(props, ref) {
    return /*#__PURE__*/ _react['default'].createElement(
      MTablePaginationInner,
      (0, _extends2['default'])({}, props, {
        forwardedRef: ref
      })
    );
  }
);
var MTableSteppedPagination = MTableSteppedPaginationRef;
var _default = MTableSteppedPagination;
exports['default'] = _default;
