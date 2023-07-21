'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _typeof = require('@babel/runtime/helpers/typeof');
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MTableToolbar = MTableToolbar;
exports['default'] = void 0;
var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);
var _Box2 = _interopRequireDefault(require('@mui/material/Box'));
var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);
var _Checkbox = _interopRequireDefault(require('@mui/material/Checkbox'));
var _InputAdornment = _interopRequireDefault(
  require('@mui/material/InputAdornment')
);
var _IconButton = _interopRequireDefault(require('@mui/material/IconButton'));
var _Menu = _interopRequireDefault(require('@mui/material/Menu'));
var _MenuItem = _interopRequireDefault(require('@mui/material/MenuItem'));
var _TextField = _interopRequireDefault(require('@mui/material/TextField'));
var _Toolbar = _interopRequireDefault(require('@mui/material/Toolbar'));
var _Tooltip = _interopRequireDefault(require('@mui/material/Tooltip'));
var _Typography = _interopRequireDefault(require('@mui/material/Typography'));
var _styles = require('@mui/material/styles');
var _propTypes = _interopRequireDefault(require('prop-types'));
var _react = _interopRequireWildcard(require('react'));
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
var searchTimer;
function MTableToolbar(props) {
  var theme = (0, _styles.useTheme)();
  var localization = (0, _store.useLocalizationStore)().toolbar;
  var _useState = (0, _react.useState)(props.searchText),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    searchText = _useState2[0],
    setSearchText = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = (0, _slicedToArray2['default'])(_useState3, 2),
    exportButtonAnchorEl = _useState4[0],
    setExportButtonAnchorEl = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = (0, _slicedToArray2['default'])(_useState5, 2),
    columnsButtonAnchorEl = _useState6[0],
    setColumnsButtonAnchorEl = _useState6[1];
  var icons = (0, _store.useIconStore)();
  var options = (0, _store.useOptionStore)();
  var selectedRows = _react['default'].useMemo(
    function () {
      return props.originalData.filter(function (a) {
        return a.tableData.checked;
      });
    },
    [props.originalData]
  );
  var onSearchChange = function onSearchChange(searchText) {
    setSearchText(searchText);
    props.dataManager.changeSearchText(searchText);
    if (!props.isRemoteData) {
      props.onSearchChanged(searchText);
      return;
    }
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(function () {
      props.onSearchChanged(searchText);
      searchTimer = null;
    }, props.searchDebounceDelay);
  };
  var getTableData = function getTableData() {
    var columns = props.columns
      .filter(function (columnDef) {
        return (
          (!columnDef.hidden || columnDef['export'] === true) &&
          columnDef.field &&
          columnDef['export'] !== false
        );
      })
      .sort(function (a, b) {
        return a.tableData.columnOrder > b.tableData.columnOrder ? 1 : -1;
      });

    // If the data is grouped, it will have an array at the data key
    var extractedData = flatData(props.data());
    var data = extractedData.map(function (rowData) {
      return columns.reduce(function (agg, columnDef) {
        var value;
        /*
          About: column.customExport
          This bit of code checks if prop customExport in column is a function, and if it is then it
          uses that function to transform the data, this is useful in cases where a column contains
          complex objects or array and it needs to be handled before it's passed to the exporter
          to avoid [object Object] output (e.g. to flatten data).
          Please note that it is also possible to transform data within under exportMenu
          using a custom function (exportMenu.exportFunc) for each exporter.
          */
        if (typeof columnDef.customExport === 'function') {
          value = columnDef.customExport(rowData);
        } else {
          value = props.getFieldValue(rowData, columnDef);
        }
        agg[columnDef.field] = value;
        return agg;
      }, {});
    });
    return [columns, data];
  };
  function renderSearch() {
    if (options.search) {
      return /*#__PURE__*/ _react['default'].createElement(
        _TextField['default'],
        {
          autoFocus: options.searchAutoFocus,
          sx:
            options.searchFieldAlignment === 'left' &&
            options.showTitle === false
              ? undefined
              : styles.searchField,
          value: searchText,
          onChange: function onChange(event) {
            return onSearchChange(event.target.value);
          },
          placeholder: localization.searchPlaceholder,
          variant: options.searchFieldVariant,
          InputProps: {
            startAdornment: /*#__PURE__*/ _react['default'].createElement(
              _InputAdornment['default'],
              {
                position: 'start'
              },
              /*#__PURE__*/ _react['default'].createElement(
                _Tooltip['default'],
                {
                  title: localization.searchTooltip
                },
                /*#__PURE__*/ _react['default'].createElement(icons.Search, {
                  fontSize: 'small'
                })
              )
            ),
            endAdornment: /*#__PURE__*/ _react['default'].createElement(
              _InputAdornment['default'],
              {
                position: 'end'
              },
              /*#__PURE__*/ _react['default'].createElement(
                _IconButton['default'],
                {
                  disabled: !searchText,
                  onClick: function onClick() {
                    return onSearchChange('');
                  },
                  'aria-label': localization.clearSearchAriaLabel
                },
                /*#__PURE__*/ _react['default'].createElement(
                  icons.ResetSearch,
                  {
                    fontSize: 'small',
                    'aria-label': 'clear'
                  }
                )
              )
            ),
            style: options.searchFieldStyle,
            inputProps: {
              'aria-label': localization.searchAriaLabel
            }
          }
        }
      );
    } else {
      return null;
    }
  }
  function renderDefaultActions(isSelectionActive) {
    var diplayedActions = isSelectionActive ? 'toolbarOnSelect' : 'toolbar';
    return /*#__PURE__*/ _react['default'].createElement(
      'div',
      {
        style: {
          display: 'flex'
        }
      },
      options.columnsButton &&
        !isSelectionActive &&
        /*#__PURE__*/ _react['default'].createElement(
          'span',
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _Tooltip['default'],
            {
              title: localization.showColumnsTitle
            },
            /*#__PURE__*/ _react['default'].createElement(
              _IconButton['default'],
              {
                color: 'inherit',
                onClick: function onClick(event) {
                  return setColumnsButtonAnchorEl(event.currentTarget);
                },
                'aria-label': localization.showColumnsAriaLabel
              },
              /*#__PURE__*/ _react['default'].createElement(
                icons.ViewColumn,
                null
              )
            )
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _Menu['default'],
            {
              anchorEl: columnsButtonAnchorEl,
              open: Boolean(columnsButtonAnchorEl),
              onClose: function onClose() {
                return setColumnsButtonAnchorEl(null);
              }
            },
            /*#__PURE__*/ _react['default'].createElement(
              _MenuItem['default'],
              {
                key: 'text',
                disabled: true,
                style: {
                  opacity: 1,
                  fontWeight: 600,
                  fontSize: 12
                }
              },
              localization.addRemoveColumns
            ),
            props.columns.map(function (col) {
              var hiddenFromColumnsButtonMenu =
                col.hiddenByColumnsButton !== undefined
                  ? col.hiddenByColumnsButton
                  : props.columnsHiddenInColumnsButton;
              if (hiddenFromColumnsButtonMenu) {
                return null;
              }
              return /*#__PURE__*/ _react['default'].createElement(
                'li',
                {
                  key: col.tableData.id
                },
                /*#__PURE__*/ _react['default'].createElement(
                  _MenuItem['default'],
                  {
                    sx: styles.formControlLabel,
                    component: 'label',
                    htmlFor: 'column-toggle-'.concat(col.tableData.id),
                    disabled: col.removable === false
                  },
                  /*#__PURE__*/ _react['default'].createElement(
                    _Checkbox['default'],
                    {
                      checked: !col.hidden,
                      id: 'column-toggle-'.concat(col.tableData.id),
                      onChange: function onChange() {
                        return props.onColumnsChanged(col, !col.hidden);
                      }
                    }
                  ),
                  /*#__PURE__*/ _react['default'].createElement(
                    'span',
                    null,
                    col.title
                  )
                )
              );
            })
          )
        ),
      options.exportMenu.length > 0 &&
        /*#__PURE__*/ _react['default'].createElement(
          'span',
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _Tooltip['default'],
            {
              title: localization.exportTitle
            },
            /*#__PURE__*/ _react['default'].createElement(
              _IconButton['default'],
              {
                color: 'inherit',
                onClick: function onClick(event) {
                  return setExportButtonAnchorEl(event.currentTarget);
                },
                'aria-label': localization.exportAriaLabel
              },
              /*#__PURE__*/ _react['default'].createElement(icons.Export, null)
            )
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _Menu['default'],
            {
              anchorEl: exportButtonAnchorEl,
              open: Boolean(exportButtonAnchorEl),
              onClose: function onClose() {
                return setExportButtonAnchorEl(null);
              }
            },
            options.exportMenu.map(function (menuitem, index) {
              var _getTableData = getTableData(),
                _getTableData2 = (0, _slicedToArray2['default'])(
                  _getTableData,
                  2
                ),
                cols = _getTableData2[0],
                datas = _getTableData2[1];
              return /*#__PURE__*/ _react['default'].createElement(
                _MenuItem['default'],
                {
                  key: ''.concat(menuitem.label).concat(index),
                  onClick: function onClick() {
                    menuitem.exportFunc(cols, datas, {
                      searchedData: props.dataManager.searchedData,
                      filteredData: props.dataManager.filteredData,
                      groupedData: props.dataManager.groupedData,
                      selectedData: selectedRows
                    });
                    setExportButtonAnchorEl(null);
                  }
                },
                menuitem.label
              );
            })
          )
        ),
      /*#__PURE__*/ _react['default'].createElement(
        'span',
        null,
        /*#__PURE__*/ _react['default'].createElement(
          props.components.Actions,
          {
            actions:
              props.actions &&
              props.actions.filter(function (a) {
                return a.position === diplayedActions;
              }),
            data: isSelectionActive ? selectedRows : undefined,
            components: props.components
          }
        )
      )
    );
  }
  function renderActions() {
    return /*#__PURE__*/ _react['default'].createElement(
      _Box2['default'],
      {
        sx: styles.actions
      },
      /*#__PURE__*/ _react['default'].createElement(
        'div',
        null,
        renderDefaultActions(selectedRows.length > 0)
      )
    );
  }
  function renderToolbarTitle(title) {
    var toolBarTitle =
      // eslint-disable-next-line multiline-ternary
      typeof title === 'string'
        ? /*#__PURE__*/ _react['default'].createElement(
            _Typography['default'],
            {
              variant: 'h6',
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }
            },
            title
          )
        : title;
    return /*#__PURE__*/ _react['default'].createElement(
      _Box2['default'],
      {
        sx: styles.title
      },
      toolBarTitle
    );
  }
  var title =
    options.showTextRowsSelected && selectedRows.length > 0
      ? typeof localization.nRowsSelected === 'function'
        ? localization.nRowsSelected(selectedRows.length)
        : localization.nRowsSelected.replace('{0}', selectedRows.length)
      : options.showTitle
      ? props.title
      : null;
  return /*#__PURE__*/ _react['default'].createElement(
    _Toolbar['default'],
    {
      ref: props.forwardedRef,
      className: props.className,
      sx: _objectSpread(
        _objectSpread({}, styles.root),
        options.showTextRowsSelected && selectedRows.length > 0
          ? styles.highlight(theme)
          : {}
      )
    },
    title && renderToolbarTitle(title),
    options.searchFieldAlignment === 'left' && renderSearch(),
    options.toolbarButtonAlignment === 'left' && renderActions(),
    /*#__PURE__*/ _react['default'].createElement(_Box2['default'], {
      sx: styles.spacer
    }),
    options.searchFieldAlignment === 'right' && renderSearch(),
    options.toolbarButtonAlignment === 'right' && renderActions()
  );
}
MTableToolbar.defaultProps = {
  actions: [],
  columns: [],
  columnsHiddenInColumnsButton: false,
  // By default, all columns are shown in the Columns Button (columns action when `options.columnsButton = true`)
  searchText: '',
  originalData: [],
  title: 'No Title!'
};
MTableToolbar.propTypes = {
  actions: _propTypes['default'].array,
  className: _propTypes['default'].string,
  columns: _propTypes['default'].array,
  components: _propTypes['default'].object.isRequired,
  getFieldValue: _propTypes['default'].func.isRequired,
  onColumnsChanged: _propTypes['default'].func.isRequired,
  dataManager: _propTypes['default'].object.isRequired,
  searchText: _propTypes['default'].string,
  onSearchChanged: _propTypes['default'].func.isRequired,
  originalData: _propTypes['default'].array,
  title: _propTypes['default'].oneOfType([
    _propTypes['default'].element,
    _propTypes['default'].string
  ]),
  renderData: _propTypes['default'].array,
  data: _propTypes['default'].oneOfType([
    _propTypes['default'].array,
    _propTypes['default'].func
  ]),
  exportAllData: _propTypes['default'].bool,
  exportMenu: _propTypes['default'].arrayOf(
    _propTypes['default'].shape({
      name: _propTypes['default'].string,
      handler: _propTypes['default'].func
    })
  ),
  searchAutoFocus: _propTypes['default'].bool,
  classes: _propTypes['default'].object
};
var styles = {
  root: {
    paddingRight: 1,
    paddingLeft: 2
  },
  highlight: function highlight(theme) {
    return theme.palette.mode === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: (0, _styles.lighten)(
            theme.palette.secondary.light,
            0.85
          )
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        };
  },
  spacer: {
    flex: '1 1 10%'
  },
  actions: {
    color: 'text.secondary'
  },
  title: {
    overflow: 'hidden'
  },
  searchField: {
    minWidth: 150,
    paddingLeft: 2
  },
  formControlLabel: {
    px: 1
  }
};
var MTableToolbarRef = /*#__PURE__*/ _react['default'].forwardRef(
  function MTableToolbarRef(props, ref) {
    return /*#__PURE__*/ _react['default'].createElement(
      MTableToolbar,
      (0, _extends2['default'])({}, props, {
        forwardedRef: ref
      })
    );
  }
);
function flatData(data) {
  var extractedData = data;
  while (
    Array.isArray(
      (_extractedData = extractedData) === null ||
        _extractedData === void 0 ||
        (_extractedData = _extractedData[0]) === null ||
        _extractedData === void 0
        ? void 0
        : _extractedData.data
    )
  ) {
    var _extractedData;
    // Extract each row of the grouped data
    extractedData = extractedData
      .map(function (row) {
        return row.groups.length !== 0 ? row.groups : row.data;
      })
      .flat();
  }
  return extractedData;
}
var _default = /*#__PURE__*/ _react['default'].memo(MTableToolbarRef);
exports['default'] = _default;
