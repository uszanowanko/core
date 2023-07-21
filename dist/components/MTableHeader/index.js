'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _typeof = require('@babel/runtime/helpers/typeof');
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.MTableHeader = MTableHeader;
exports.styles = exports['default'] = void 0;
var _Box2 = _interopRequireDefault(require('@mui/material/Box'));
var _Tooltip2 = _interopRequireDefault(require('@mui/material/Tooltip'));
var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
);
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);
var _slicedToArray2 = _interopRequireDefault(
  require('@babel/runtime/helpers/slicedToArray')
);
var _objectWithoutProperties2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutProperties')
);
var _react = _interopRequireDefault(require('react'));
var _propTypes = _interopRequireDefault(require('prop-types'));
var _TableHead = _interopRequireDefault(require('@mui/material/TableHead'));
var _TableRow = _interopRequireDefault(require('@mui/material/TableRow'));
var _TableCell = _interopRequireDefault(require('@mui/material/TableCell'));
var _TableSortLabel = _interopRequireDefault(
  require('@mui/material/TableSortLabel')
);
var _Checkbox = _interopRequireDefault(require('@mui/material/Checkbox'));
var _dnd = require('@hello-pangea/dnd');
var CommonValues = _interopRequireWildcard(
  require('../../utils/common-values')
);
var _store = require('../../store');
var _excluded = ['onColumnResized', 'classes', 'sx', 'columns'];
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
function MTableHeader(_ref) {
  var onColumnResized = _ref.onColumnResized,
    classes = _ref.classes,
    sx = _ref.sx,
    columns = _ref.columns,
    props = (0, _objectWithoutProperties2['default'])(_ref, _excluded);
  var localization = (0, _store.useLocalizationStore)().header;
  var options = (0, _store.useOptionStore)();
  var icons = (0, _store.useIconStore)();
  var defaultMinColumnWidth = 20;
  var defaultMaxColumnWidth = 10000;
  var _React$useState = _react['default'].useState(undefined),
    _React$useState2 = (0, _slicedToArray2['default'])(_React$useState, 2),
    resizing = _React$useState2[0],
    setResizing = _React$useState2[1];
  var _React$useState3 = _react['default'].useState(0),
    _React$useState4 = (0, _slicedToArray2['default'])(_React$useState3, 2),
    lastX = _React$useState4[0],
    setLastX = _React$useState4[1];
  var displayingColumns = _react['default'].useMemo(
    function () {
      return columns.filter(function (c) {
        return c.hidden !== true;
      });
    },
    [columns]
  );
  var handleMouseDown = function handleMouseDown(e, columnDef, colIndex) {
    var startX = e.clientX;
    var th = e.target.closest('th');
    var currentWidth =
      th && Math.round(+window.getComputedStyle(th).width.slice(0, -2));
    var initialColWidths =
      resizing === null || resizing === void 0
        ? void 0
        : resizing.initialColWidths;
    var nextWidth;
    var nextColIndex;
    if (options.tableWidth === 'full') {
      var nextTh = th.nextSibling;
      nextWidth =
        nextTh &&
        Math.round(+window.getComputedStyle(nextTh).width.slice(0, -2));
      nextColIndex = displayingColumns.findIndex(function (c) {
        return c.tableData.id === columnDef.tableData.id + 1;
      });
    } else if (!initialColWidths) {
      // Ensure we have all column widths in pixels
      initialColWidths = Array.from(th.parentNode.children).map(function (th) {
        return Math.round(+window.getComputedStyle(th).width.slice(0, -2));
      });
    }
    setLastX(startX);
    var nextColumn = displayingColumns[nextColIndex];
    setResizing(
      _objectSpread(
        _objectSpread(
          {
            colIndex: colIndex,
            nextColIndex: nextColIndex,
            lastColData: _objectSpread(
              _objectSpread({}, columnDef.tableData),
              {},
              {
                width: currentWidth
              }
            )
          },
          nextColIndex &&
            nextColumn && {
              lastNextColData: _objectSpread(
                _objectSpread({}, nextColumn.tableData),
                {},
                {
                  width: nextWidth
                }
              )
            }
        ),
        {},
        {
          initialColWidths: initialColWidths,
          startX: startX
        }
      )
    );
  };
  var constrainedColumnResize = function constrainedColumnResize(
    col,
    lastWidth,
    offset
  ) {
    // Extra max/min are to avoid sudden column changes when a column that starts without
    // an explicit width is resized
    var constrainedNewWidth = Math.min(
      Math.max(col.maxWidth || defaultMaxColumnWidth, lastWidth),
      // Avoid sudden decrease in column width
      Math.max(
        Math.min(col.minWidth || defaultMinColumnWidth, lastWidth),
        // Avoid sudden increase in column width
        lastWidth + offset
      )
    );
    return constrainedNewWidth - lastWidth;
  };
  var handleMouseMove = _react['default'].useCallback(
    // Use usecallback to prevent triggering theuse effect too much
    function (e) {
      if (!resizing) return;
      if (e.preventDefault) {
        // prevent text in table being selected
        e.preventDefault();
      }
      var curX = e.clientX;
      var col = displayingColumns[resizing.colIndex];
      var alreadyOffset =
        col.tableData.additionalWidth - resizing.lastColData.additionalWidth;
      var offset = constrainedColumnResize(
        col,
        resizing.lastColData.width + alreadyOffset,
        curX - lastX
      );
      offset = Math.round(offset);
      var widths = [resizing.lastColData.width + alreadyOffset];
      if (options.tableWidth === 'full' && resizing.lastNextColData) {
        offset = -constrainedColumnResize(
          displayingColumns[resizing.nextColIndex],
          resizing.lastNextColData.width - alreadyOffset,
          -offset
        );
        widths.push(resizing.lastNextColData.width - alreadyOffset);
      }
      setLastX(curX);
      if (offset) {
        onColumnResized(
          col.tableData.id,
          offset,
          widths,
          resizing.initialColWidths
        );
      }
    },
    [lastX, resizing, onColumnResized]
  );
  var handleMouseUp = _react['default'].useCallback(
    function (e) {
      if (resizing && lastX !== resizing.startX) {
        onColumnResized(
          displayingColumns[resizing.colIndex].tableData.id,
          0,
          [],
          []
        );
      }
      setResizing(undefined);
    },
    [setResizing, resizing, lastX, onColumnResized]
  );
  _react['default'].useEffect(
    function () {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return function () {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    },
    [handleMouseMove, handleMouseUp]
  ); // ONly reset the listeners if needed

  var renderActionsHeader = function renderActionsHeader() {
    var width = CommonValues.actionsColumnWidth(
      _objectSpread(
        {
          options: options
        },
        props
      )
    );
    return /*#__PURE__*/ _react['default'].createElement(
      _TableCell['default'],
      {
        key: 'key-actions-column',
        padding: 'checkbox',
        sx: styles.header,
        style: _objectSpread(
          _objectSpread(
            {
              textAlign: 'center'
            },
            options.headerStyle
          ),
          {},
          {
            width: width,
            boxSizing: 'border-box'
          }
        )
      },
      /*#__PURE__*/ _react['default'].createElement(
        _TableSortLabel['default'],
        {
          hideSortIcon: true,
          disabled: true
        },
        localization.actions
      )
    );
  };
  var getCellStyle = function getCellStyle(columnDef) {
    var width = options.columnResizable
      ? CommonValues.reducePercentsInCalc(
          columnDef.tableData.width,
          props.scrollWidth
        )
      : columnDef.tableData.width;
    var style = _objectSpread(
      _objectSpread(
        _objectSpread(
          _objectSpread({}, options.headerStyle),
          columnDef.headerStyle
        ),
        {},
        {
          boxSizing: 'border-box',
          width: width
        },
        options.tableWidth === 'full' &&
          columnDef.minWidth && {
            minWidth: columnDef.minWidth
          }
      ),
      options.tableWidth === 'full' &&
        columnDef.maxWidth && {
          maxWidth: columnDef.maxWidth
        }
    );
    if (
      options.tableLayout === 'fixed' &&
      options.columnResizable &&
      columnDef.resizable !== false
    ) {
      style.paddingLeft = 8;
      style.paddingRight = 2;
      style.position = 'relative';
    }
    return style;
  };
  function RenderHeader() {
    var size = options.padding === 'default' ? 'medium' : 'small';
    return displayingColumns
      .filter(function (columnDef) {
        return (
          !(columnDef.tableData.groupOrder > -1) && !columnDef.tableData.hiddden
        );
      })
      .sort(function (a, b) {
        return a.tableData.columnOrder - b.tableData.columnOrder;
      })
      .map(function (columnDef, index, allCols) {
        var cellAlignment =
          columnDef.align !== undefined
            ? columnDef.align
            : ['numeric', 'currency'].indexOf(columnDef.type) !== -1
            ? 'right'
            : 'left';
        var content = columnDef.title;
        if (options.draggable && columnDef.draggable !== false) {
          content = /*#__PURE__*/ _react['default'].createElement(
            _dnd.Draggable,
            {
              key: columnDef.tableData.id,
              draggableId: columnDef.tableData.id.toString(),
              index: index,
              style: {
                zIndex: 99
              }
            },
            function (provided, snapshot) {
              return /*#__PURE__*/ _react['default'].createElement(
                'div',
                (0, _extends2['default'])(
                  {
                    ref: provided.innerRef
                  },
                  provided.draggableProps,
                  provided.dragHandleProps,
                  {
                    style: snapshot.isDragging
                      ? provided.draggableProps.style
                      : {
                          position: 'relative',
                          minWidth: 0,
                          display: 'flex',
                          flexDirection:
                            cellAlignment === 'right'
                              ? 'row-reverse'
                              : undefined
                        }
                  }
                ),
                columnDef.sorting !== false &&
                  props.sorting &&
                  props.allowSorting
                  ? /*#__PURE__*/ _react['default'].createElement(
                      RenderSortButton,
                      {
                        columnDef: columnDef,
                        keepSortDirectionOnColumnSwitch:
                          options.keepSortDirectionOnColumnSwitch,
                        icon: icons.SortArrow,
                        thirdSortClick: options.thirdSortClick,
                        onOrderChange: props.onOrderChange,
                        orderByCollection: props.orderByCollection,
                        showColumnSortOrder: options.showColumnSortOrder,
                        sortOrderIndicatorStyle: options.sortOrderIndicatorStyle
                      },
                      columnDef.title
                    )
                  : columnDef.title
              );
            }
          );
        } else if (
          columnDef.sorting !== false &&
          props.sorting &&
          props.allowSorting
        ) {
          content = /*#__PURE__*/ _react['default'].createElement(
            RenderSortButton,
            {
              columnDef: columnDef,
              keepSortDirectionOnColumnSwitch:
                options.keepSortDirectionOnColumnSwitch,
              icon: icons.SortArrow,
              thirdSortClick: options.thirdSortClick,
              onOrderChange: props.onOrderChange,
              orderByCollection: props.orderByCollection,
              showColumnSortOrder: options.showColumnSortOrder,
              sortOrderIndicatorStyle: options.sortOrderIndicatorStyle
            },
            columnDef.title
          );
        }
        if (columnDef.tooltip) {
          content = /*#__PURE__*/ _react['default'].createElement(
            _Tooltip2['default'],
            {
              title: columnDef.tooltip,
              placement: 'bottom'
            },
            /*#__PURE__*/ _react['default'].createElement('span', null, content)
          );
        }
        if (
          options.tableLayout === 'fixed' &&
          options.columnResizable &&
          columnDef.resizable !== false &&
          !(options.tableWidth === 'full' && index === allCols.length - 1)
        ) {
          var Resize = icons.Resize
            ? icons.Resize
            : function (props) {
                return /*#__PURE__*/ _react['default'].createElement(
                  _Box2['default'],
                  (0, _extends2['default'])({}, props, {
                    'data-test-id': 'drag_handle'
                  })
                );
              };
          content = /*#__PURE__*/ _react['default'].createElement(
            _Box2['default'],
            {
              sx: styles.headerWrap(cellAlignment === 'right')
            },
            /*#__PURE__*/ _react['default'].createElement(
              _Box2['default'],
              {
                sx: styles.headerContent(cellAlignment === 'right')
              },
              content
            ),
            /*#__PURE__*/ _react['default'].createElement('div', null),
            /*#__PURE__*/ _react['default'].createElement(Resize, {
              sx: styles.headerResize(
                (resizing === null || resizing === void 0
                  ? void 0
                  : resizing.col) &&
                  resizing.col.tableData.id === columnDef.tableData.id
              ),
              onMouseDown: function onMouseDown(e) {
                return handleMouseDown(e, columnDef, index);
              }
            })
          );
        }
        return /*#__PURE__*/ _react['default'].createElement(
          _TableCell['default'],
          {
            key: columnDef.tableData.id,
            align: cellAlignment,
            sx: styles.header,
            style: getCellStyle(columnDef),
            size: size,
            'aria-label': columnDef.ariaLabel
          },
          content
        );
      });
  }
  function renderSelectionHeader() {
    var selectionWidth = CommonValues.selectionMaxWidth(
      _objectSpread(
        _objectSpread({}, props),
        {},
        {
          options: options
        }
      ),
      props.treeDataMaxLevel
    );
    return /*#__PURE__*/ _react['default'].createElement(
      _TableCell['default'],
      {
        padding: 'none',
        key: 'key-selection-column',
        sx: styles.header,
        style: _objectSpread(
          _objectSpread({}, options.headerStyle),
          {},
          {
            width: selectionWidth
          }
        )
      },
      options.showSelectAllCheckbox &&
        /*#__PURE__*/ _react['default'].createElement(
          _Checkbox['default'],
          (0, _extends2['default'])(
            {
              indeterminate:
                props.selectedCount > 0 &&
                props.selectedCount < props.dataCount,
              checked:
                props.dataCount > 0 && props.selectedCount >= props.dataCount,
              onChange: function onChange(event, checked) {
                return props.onAllSelected && props.onAllSelected(checked);
              }
            },
            options.headerSelectionProps
          )
        )
    );
  }
  function renderDetailPanelColumnCell() {
    return /*#__PURE__*/ _react['default'].createElement(
      _TableCell['default'],
      {
        padding: 'none',
        key: 'key-detail-panel-column',
        sx: styles.header,
        style: options.headerStyle
      }
    );
  }
  var headers = RenderHeader();
  if (options.selection) {
    headers.splice(0, 0, renderSelectionHeader());
  }
  if (props.showActionsColumn) {
    if (options.actionsColumnIndex >= 0) {
      var endPos = 0;
      if (options.selection) {
        endPos = 1;
      }
      headers.splice(
        options.actionsColumnIndex + endPos,
        0,
        renderActionsHeader()
      );
    } else if (options.actionsColumnIndex === -1) {
      headers.push(renderActionsHeader());
    }
  }
  if (props.hasDetailPanel && options.showDetailPanelIcon) {
    if (options.detailPanelColumnAlignment === 'right') {
      headers.push(renderDetailPanelColumnCell());
    } else {
      headers.splice(0, 0, renderDetailPanelColumnCell());
    }
  }
  if (props.isTreeData > 0) {
    headers.splice(
      0,
      0,
      /*#__PURE__*/ _react['default'].createElement(_TableCell['default'], {
        padding: 'none',
        key: 'key-tree-data-header',
        sx: styles.header,
        style: options.headerStyle
      })
    );
  }
  displayingColumns
    .filter(function (columnDef) {
      return columnDef.tableData.groupOrder > -1;
    })
    .forEach(function (columnDef) {
      headers.splice(
        0,
        0,
        /*#__PURE__*/ _react['default'].createElement(_TableCell['default'], {
          padding: 'checkbox',
          key: 'key-group-header' + columnDef.tableData.id,
          sx: styles.header,
          style: options.headerStyle
        })
      );
    });
  return /*#__PURE__*/ _react['default'].createElement(
    _TableHead['default'],
    {
      ref: props.forwardedRef,
      classes: classes,
      sx: sx
    },
    /*#__PURE__*/ _react['default'].createElement(
      _TableRow['default'],
      {
        sx: styles.headerRow
      },
      headers
    )
  );
}
var computeNewOrderDirection = function computeNewOrderDirection(
  orderBy,
  orderDirection,
  columnDef,
  thirdSortClick,
  keepSortDirectionOnColumnSwitch
) {
  if (columnDef.tableData.id !== orderBy) {
    if (keepSortDirectionOnColumnSwitch) {
      // use the current sort order when switching columns if defined
      return orderDirection || 'asc';
    } else {
      return 'asc';
    }
  } else if (orderDirection === 'asc') {
    return 'desc';
  } else if (orderDirection === 'desc') {
    if (thirdSortClick) {
      // third sort click brings to no order direction after desc
      return '';
    } else {
      return 'asc';
    }
  }
  return 'asc';
};
function RenderSortButton(_ref2) {
  var columnDef = _ref2.columnDef,
    keepSortDirectionOnColumnSwitch = _ref2.keepSortDirectionOnColumnSwitch,
    icon = _ref2.icon,
    thirdSortClick = _ref2.thirdSortClick,
    onOrderChange = _ref2.onOrderChange,
    children = _ref2.children,
    orderByCollection = _ref2.orderByCollection,
    showColumnSortOrder = _ref2.showColumnSortOrder,
    sortOrderIndicatorStyle = _ref2.sortOrderIndicatorStyle;
  var activeColumn = orderByCollection.find(function (_ref3) {
    var orderBy = _ref3.orderBy;
    return orderBy === columnDef.tableData.id;
  });
  // If current sorted column or prop asked to
  // maintain sort order when switching sorted column,
  // follow computed order direction if defined
  // else default direction is asc
  var direction =
    activeColumn || keepSortDirectionOnColumnSwitch
      ? (activeColumn && activeColumn.orderDirection) || 'asc'
      : 'asc';
  var ariaSort = 'none';
  if (activeColumn && direction === 'asc') {
    ariaSort = columnDef.ariaSortAsc || 'ascending';
  } else if (activeColumn && direction === 'desc') {
    ariaSort = columnDef.ariaSortDesc || 'descending';
  }
  var orderBy = activeColumn && activeColumn.orderBy;
  return /*#__PURE__*/ _react['default'].createElement(
    _react['default'].Fragment,
    null,
    /*#__PURE__*/ _react['default'].createElement(
      _TableSortLabel['default'],
      {
        role: 'columnheader',
        'aria-sort': ariaSort,
        'aria-label': columnDef.ariaLabel,
        IconComponent: icon,
        active: Boolean(activeColumn),
        'data-testid': 'mtableheader-sortlabel',
        direction: direction,
        onClick: function onClick() {
          var newOrderDirection = computeNewOrderDirection(
            orderBy,
            direction,
            columnDef,
            thirdSortClick,
            keepSortDirectionOnColumnSwitch
          );
          onOrderChange(
            columnDef.tableData.id,
            newOrderDirection,
            activeColumn && activeColumn.sortOrder
          );
        }
      },
      children
    ),
    /*#__PURE__*/ _react['default'].createElement(
      'span',
      {
        style: _objectSpread(
          _objectSpread({}, sortOrderIndicatorStyle),
          {},
          {
            width: '1em'
          }
        ),
        'data-testid': 'material-table-column-sort-order-indicator'
      },
      showColumnSortOrder && activeColumn ? activeColumn.sortOrder : ''
    )
  );
}
MTableHeader.defaultProps = {
  dataCount: 0,
  selectedCount: 0,
  orderByCollection: [],
  allowSorting: true
};
MTableHeader.propTypes = {
  columns: _propTypes['default'].array.isRequired,
  classes: _propTypes['default'].object,
  sx: _propTypes['default'].object,
  dataCount: _propTypes['default'].number,
  hasDetailPanel: _propTypes['default'].bool.isRequired,
  selectedCount: _propTypes['default'].number,
  onAllSelected: _propTypes['default'].func,
  onOrderChange: _propTypes['default'].func,
  showActionsColumn: _propTypes['default'].bool,
  orderByCollection: _propTypes['default'].array,
  showColumnSortOrder: _propTypes['default'].bool,
  tooltip: _propTypes['default'].string,
  allowSorting: _propTypes['default'].bool
};
var styles = {
  headerRow: {
    zIndex: 10
  },
  header: {
    // display: 'inline-block',
    // position: 'sticky',
    top: 0,
    backgroundColor: 'background.paper' // Change according to theme,
  },

  headerWrap: function headerWrap(alignRight) {
    return {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      left: 4
    };
  },
  headerWrapRight: function headerWrapRight(alignRight) {
    return {
      display: 'flex',
      alignItems: 'center',
      pr: alignRight ? 1 : undefined,
      position: 'relative',
      left: 4,
      justifyContent: 'flex-end'
    };
  },
  headerContent: function headerContent(alignRight) {
    return {
      minWidth: 0,
      display: 'flex',
      flex: '1 0 100%',
      flexDirection: alignRight ? 'row-reverse' : undefined,
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      position: 'relative'
    };
  },
  headerResize: function headerResize(resize) {
    return {
      color: resize ? 'primary.main' : 'inherit',
      flex: 1,
      cursor: 'col-resize',
      position: 'absolute',
      // allow div to straddle adjacent columns
      height: '100%',
      width: 16,
      display: 'flex',
      justifyContent: 'center',
      right: -8,
      zIndex: 20 // so half that overlaps next column can be used to resize
    };
  }
};
exports.styles = styles;
var MTableHeaderRef = /*#__PURE__*/ _react['default'].forwardRef(
  function MTableHeaderRef(props, ref) {
    return /*#__PURE__*/ _react['default'].createElement(
      MTableHeader,
      (0, _extends2['default'])({}, props, {
        forwardedRef: ref
      })
    );
  }
);
var _default = /*#__PURE__*/ _react['default'].memo(MTableHeaderRef);
exports['default'] = _default;
