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
var _defineProperty2 = _interopRequireDefault(
  require('@babel/runtime/helpers/defineProperty')
);
var _Toolbar = _interopRequireDefault(require('@mui/material/Toolbar'));
var _Chip = _interopRequireDefault(require('@mui/material/Chip'));
var _Typography = _interopRequireDefault(require('@mui/material/Typography'));
var _propTypes = _interopRequireDefault(require('prop-types'));
var _react = _interopRequireWildcard(require('react'));
var _dnd = require('@hello-pangea/dnd');
var _store = require('../../store');
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
} /* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

function MTableGroupbar(props) {
  var localization = (0, _store.useLocalizationStore)().grouping;
  var icons = (0, _store.useIconStore)();
  var options = (0, _LocalizationStore.useOptionStore)();
  var getItemStyle = function getItemStyle(isDragging, draggableStyle) {
    return _objectSpread(
      {
        // some basic styles to make the items look a bit nicer
        userSelect: 'none',
        // padding: '8px 16px',
        margin: '0 '.concat(8, 'px 0 0')
      },
      draggableStyle
    );
  };
  var getListStyle = function getListStyle(isDraggingOver) {
    return {
      // background: isDraggingOver ? 'lightblue' : '#0000000a',
      background: '#0000000a',
      display: 'flex',
      width: '100%',
      padding: 1,
      overflow: 'auto',
      border: '1px solid #ccc',
      borderStyle: 'dashed'
    };
  };
  (0, _react.useEffect)(
    function () {
      if (props.persistentGroupingsId) {
        var persistentGroupings = props.groupColumns.map(function (column) {
          return {
            field: column.field,
            groupOrder: column.tableData.groupOrder,
            groupSort: column.tableData.groupSort,
            columnOrder: column.tableData.columnOrder
          };
        });
        var materialTableGroupings = localStorage.getItem(
          'material-table-groupings'
        );
        if (materialTableGroupings) {
          materialTableGroupings = JSON.parse(materialTableGroupings);
        } else {
          materialTableGroupings = {};
        }
        if (persistentGroupings.length === 0) {
          delete materialTableGroupings[props.persistentGroupingsId];
          if (Object.keys(materialTableGroupings).length === 0) {
            localStorage.removeItem('material-table-groupings');
          } else {
            localStorage.setItem(
              'material-table-groupings',
              JSON.stringify(materialTableGroupings)
            );
          }
        } else {
          materialTableGroupings[props.persistentGroupingsId] =
            persistentGroupings;
          localStorage.setItem(
            'material-table-groupings',
            JSON.stringify(materialTableGroupings)
          );
        }
      }
      props.onGroupChange && props.onGroupChange(props.groupColumns);
    },
    [props.groupColumns]
  );
  return /*#__PURE__*/ _react['default'].createElement(
    _Toolbar['default'],
    {
      className: props.className,
      disableGutters: true,
      ref: props.forwardedRef
    },
    /*#__PURE__*/ _react['default'].createElement(
      _dnd.Droppable,
      {
        droppableId: 'groups',
        direction: 'horizontal',
        placeholder: 'Deneme'
      },
      function (provided, snapshot) {
        return /*#__PURE__*/ _react['default'].createElement(
          _Box2['default'],
          {
            ref: provided.innerRef,
            sx: getListStyle(snapshot.isDraggingOver)
          },
          props.groupColumns.length > 0 &&
            /*#__PURE__*/ _react['default'].createElement(
              _Typography['default'],
              {
                variant: 'caption',
                sx: {
                  padding: 1
                }
              },
              localization.groupedBy
            ),
          props.groupColumns.map(function (columnDef, index) {
            return /*#__PURE__*/ _react['default'].createElement(
              _dnd.Draggable,
              {
                key: columnDef.tableData.id.toString(),
                draggableId: columnDef.tableData.id.toString(),
                index: index
              },
              function (provided, snapshot) {
                var _options$groupChipPro;
                return /*#__PURE__*/ _react['default'].createElement(
                  _Box2['default'],
                  (0, _extends2['default'])(
                    {
                      ref: provided.innerRef
                    },
                    provided.draggableProps,
                    provided.dragHandleProps,
                    {
                      sx: getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )
                    }
                  ),
                  /*#__PURE__*/ _react['default'].createElement(
                    _Chip['default'],
                    (0, _extends2['default'])(
                      {},
                      provided.dragHandleProps,
                      options.groupChipProps,
                      {
                        onClick: function onClick() {
                          return props.onSortChanged(columnDef);
                        },
                        label: /*#__PURE__*/ _react['default'].createElement(
                          _Box2['default'],
                          {
                            sx: {
                              display: 'flex',
                              alignItems: 'center'
                            }
                          },
                          /*#__PURE__*/ _react['default'].createElement(
                            _Box2['default'],
                            {
                              sx: {
                                float: 'left'
                              }
                            },
                            columnDef.title
                          ),
                          columnDef.tableData.groupSort &&
                            /*#__PURE__*/ _react['default'].createElement(
                              icons.SortArrow,
                              {
                                sx: {
                                  transition: '300ms ease all',
                                  transform:
                                    columnDef.tableData.groupSort === 'asc'
                                      ? 'rotate(-180deg)'
                                      : 'none',
                                  fontSize: 18
                                }
                              }
                            )
                        ),
                        sx: _objectSpread(
                          {
                            boxShadow: 'none',
                            textTransform: 'none'
                          },
                          (_options$groupChipPro = options.groupChipProps) !==
                            null && _options$groupChipPro !== void 0
                            ? _options$groupChipPro
                            : {}
                        ),
                        onDelete: function onDelete() {
                          return props.onGroupRemoved(columnDef, index);
                        }
                      }
                    )
                  )
                );
              }
            );
          }),
          props.groupColumns.length === 0 &&
            /*#__PURE__*/ _react['default'].createElement(
              _Typography['default'],
              {
                variant: 'caption',
                sx: {
                  padding: 1
                }
              },
              localization.placeholder
            ),
          provided.placeholder
        );
      }
    )
  );
}
MTableGroupbar.defaultProps = {};
MTableGroupbar.propTypes = {
  forwardedRef: _propTypes['default'].element,
  className: _propTypes['default'].string,
  onSortChanged: _propTypes['default'].func,
  onGroupRemoved: _propTypes['default'].func,
  onGroupChange: _propTypes['default'].func,
  persistentGroupingsId: _propTypes['default'].string
};
var _default = /*#__PURE__*/ _react['default'].forwardRef(
  function MTableGroupbarRef(props, ref) {
    return /*#__PURE__*/ _react['default'].createElement(
      MTableGroupbar,
      (0, _extends2['default'])({}, props, {
        forwardedRef: ref
      })
    );
  }
);
exports['default'] = _default;
