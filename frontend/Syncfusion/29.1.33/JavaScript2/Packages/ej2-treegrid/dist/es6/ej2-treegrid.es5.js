import { Property, merge, ChildProperty, Collection, isNullOrUndefined, Browser, removeClass, addClass, getValue, createElement, setValue, extend as extend$1, Internationalization, getEnumValue, compile, L10n, EventHandler, KeyboardEvents, SanitizeHtmlHelper, Complex, Event, NotifyPropertyChanges, Component, closest, setStyleAttribute, select, classList, debounce, remove } from '@syncfusion/ej2-base';
import { Grid, Logger as Logger$1, detailLists, Clipboard, getObject, parentsUntil, Print as Print$1, templateCompiler, appendChildren, extend, CellRenderer, getUid, CellType, Freeze as Freeze$1, getNumberFormat, getActualProperties, iterateArrayOrObject, RowDropSettings as RowDropSettings$1, Reorder as Reorder$1, Resize as Resize$1, Scroll, RowDD as RowDD$1, VirtualRowModelGenerator, Filter as Filter$1, Data, ExportHelper, ExcelExport as ExcelExport$1, PdfExport as PdfExport$1, Page as Page$1, Toolbar as Toolbar$1, calculateAggregate, Aggregate as Aggregate$1, Sort as Sort$1, ColumnMenu as ColumnMenu$1, ContextMenu as ContextMenu$1, resetRowIndex, Edit as Edit$1, CommandColumn as CommandColumn$1, DetailRow as DetailRow$1, Cell, VirtualContentRenderer, InterSectionObserver, getTransformValues, RenderType, VirtualHeaderRenderer, VirtualScroll as VirtualScroll$1, ColumnChooser as ColumnChooser$1, RowRenderer, InfiniteScroll as InfiniteScroll$1 } from '@syncfusion/ej2-grids';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import { DataManager, ODataAdaptor, WebApiAdaptor, WebMethodAdaptor, CacheAdaptor, UrlAdaptor, Query, DataUtil, RemoteSaveAdaptor, Deferred, JsonAdaptor, Predicate as Predicate$1 } from '@syncfusion/ej2-data';
import { showSpinner, hideSpinner, createSpinner } from '@syncfusion/ej2-popups';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the "Column" model class for TreeGrid, defining essential properties and functionalities of a column.
 */
var Column = /** @class */ (function () {
    function Column(options) {
        /**
         * Allows or disallows editing of the column. Set to `false` to make a column non-editable.
         * By default, all columns are editable.
         *
         * @default true
         */
        this.allowEditing = true;
        /**
         * Customization options for the edit cell.
         *
         * @default {}
         */
        this.edit = {};
        /**
         * When set to `true`, encodes HTML content in headers and cells to prevent HTML injection.
         *
         * @default true
         */
        this.disableHtmlEncode = true;
        /**
         * Disables column reordering if set to `false`. By default, columns can be reordered.
         *
         * @default true
         */
        this.allowReordering = true;
        /**
         * Disables column menu for the column if set to `false`. By default, column menus are enabled for all columns.
         *
         * @default true
         */
        this.showColumnMenu = true;
        /**
         * Disables filtering for the column if set to `false`. By default, columns are filterable.
         *
         * @default true
         */
        this.allowFiltering = true;
        /**
         * Disables sorting for the column if set to `false`. By default, columns are sortable.
         *
         * @default true
         */
        this.allowSorting = true;
        /**
         * Disables resizing for the column if set to `false`. By default, columns can be resized.
         *
         * @default true
         */
        this.allowResizing = true;
        /**
         * Customize default filter options for a specific column, providing types and UI definitions for custom components.
         *
         * @default null
         */
        this.filter = {};
        merge(this, options);
    }
    /**
     * Reflects state changes for TreeGrid column directives, particularly in React.
     *
     * @param {Column} column - The column to update.
     * @returns {void}
     * @hidden
     */
    Column.prototype.setProperties = function (column) {
        var keys = Object.keys(column);
        for (var i = 0; i < keys.length; i++) {
            this[keys[parseInt(i.toString(), 10)]] = column[keys[parseInt(i.toString(), 10)]];
            if (this.parent && this.parent['isReact'] && keys[parseInt(i.toString(), 10)] === 'template') {
                var refreshReactColumnTemplateByUid = 'refreshReactColumnTemplateByUid';
                this.parent.clipboardModule['treeGridParent'].renderModule["" + refreshReactColumnTemplateByUid](this.uid);
            }
        }
    };
    return Column;
}());
/**
 * Defines TreeGrid column
 */
var TreeGridColumn = /** @class */ (function (_super) {
    __extends(TreeGridColumn, _super);
    function TreeGridColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], TreeGridColumn.prototype, "columns", void 0);
    return TreeGridColumn;
}(Column));
/**
 * Defines stacked tree grid column
 */
var StackedColumn = /** @class */ (function (_super) {
    __extends(StackedColumn, _super);
    function StackedColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StackedColumn;
}(TreeGridColumn));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the loading indicator for the Tree Grid, allowing you to display a visual indicator during data loading operations to enhance user experience.
 */
var LoadingIndicator = /** @class */ (function (_super) {
    __extends$1(LoadingIndicator, _super);
    function LoadingIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property('Spinner')
    ], LoadingIndicator.prototype, "indicatorType", void 0);
    return LoadingIndicator;
}(ChildProperty));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the filter configuration for a column in the TreeGrid.
 */
var Predicate = /** @class */ (function (_super) {
    __extends$2(Predicate, _super);
    function Predicate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property()
    ], Predicate.prototype, "field", void 0);
    __decorate$2([
        Property()
    ], Predicate.prototype, "operator", void 0);
    __decorate$2([
        Property()
    ], Predicate.prototype, "value", void 0);
    __decorate$2([
        Property()
    ], Predicate.prototype, "matchCase", void 0);
    __decorate$2([
        Property()
    ], Predicate.prototype, "ignoreAccent", void 0);
    __decorate$2([
        Property()
    ], Predicate.prototype, "predicate", void 0);
    __decorate$2([
        Property({})
    ], Predicate.prototype, "actualFilterValue", void 0);
    __decorate$2([
        Property({})
    ], Predicate.prototype, "actualOperator", void 0);
    __decorate$2([
        Property()
    ], Predicate.prototype, "type", void 0);
    __decorate$2([
        Property()
    ], Predicate.prototype, "ejpredicate", void 0);
    __decorate$2([
        Property()
    ], Predicate.prototype, "uid", void 0);
    __decorate$2([
        Property()
    ], Predicate.prototype, "isForeignKey", void 0);
    return Predicate;
}(ChildProperty));
/**
 * Configures the filtering behavior of the TreeGrid, enabling complex data filtering capabilities.
 */
var FilterSettings = /** @class */ (function (_super) {
    __extends$2(FilterSettings, _super);
    function FilterSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Collection([], Predicate)
    ], FilterSettings.prototype, "columns", void 0);
    __decorate$2([
        Property('FilterBar')
    ], FilterSettings.prototype, "type", void 0);
    __decorate$2([
        Property()
    ], FilterSettings.prototype, "mode", void 0);
    __decorate$2([
        Property(true)
    ], FilterSettings.prototype, "showFilterBarStatus", void 0);
    __decorate$2([
        Property(1500)
    ], FilterSettings.prototype, "immediateModeDelay", void 0);
    __decorate$2([
        Property()
    ], FilterSettings.prototype, "operators", void 0);
    __decorate$2([
        Property(false)
    ], FilterSettings.prototype, "ignoreAccent", void 0);
    __decorate$2([
        Property('Parent')
    ], FilterSettings.prototype, "hierarchyMode", void 0);
    return FilterSettings;
}(ChildProperty));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the text wrapping behavior of the TreeGrid.
 */
var TextWrapSettings = /** @class */ (function (_super) {
    __extends$3(TextWrapSettings, _super);
    function TextWrapSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property('Both')
    ], TextWrapSettings.prototype, "wrapMode", void 0);
    return TextWrapSettings;
}(ChildProperty));

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Logger module for TreeGrid
 *
 * @hidden
 */
var DOC_URL = 'https://ej2.syncfusion.com/documentation/treegrid';
var BASE_DOC_URL = 'https://ej2.syncfusion.com/documentation';
var ERROR = '[EJ2TreeGrid.Error]';
var IsRowDDEnabled = false;
var Logger = /** @class */ (function (_super) {
    __extends$4(Logger, _super);
    function Logger(parent) {
        var _this = this;
        Grid.Inject(Logger$1);
        _this = _super.call(this, parent) || this;
        return _this;
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} - Returns Logger module name
     */
    Logger.prototype.getModuleName = function () {
        return 'logger';
    };
    Logger.prototype.log = function (types, args) {
        if (!(types instanceof Array)) {
            types = [types];
        }
        var type = types;
        for (var i = 0; i < type.length; i++) {
            var item = detailLists[type[parseInt(i.toString(), 10)]];
            var cOp = item.check(args, this.parent);
            if (cOp.success) {
                var message = item.generateMessage(args, this.parent, cOp.options);
                message = message.replace('EJ2Grid', 'EJ2TreeGrid').replace('* Hierarchy Grid', '').replace('* Grouping', '');
                if (IsRowDDEnabled && type[parseInt(i.toString(), 10)] === 'primary_column_missing') {
                    message = message.replace('Editing', 'Row DragAndDrop');
                    IsRowDDEnabled = false;
                }
                var index = message.indexOf('https');
                var gridurl = message.substring(index);
                if (type[parseInt(i.toString(), 10)] === 'module_missing') {
                    message = message.replace(gridurl, DOC_URL + '/modules');
                }
                else if (type[parseInt(i.toString(), 10)] === 'primary_column_missing' || type[parseInt(i.toString(), 10)] === 'selection_key_missing') {
                    message = message.replace(gridurl, BASE_DOC_URL + '/api/treegrid/column/#isprimarykey');
                }
                else if (type[parseInt(i.toString(), 10)] === 'grid_remote_edit') {
                    message = message.replace(gridurl, DOC_URL + '/edit');
                }
                else if (type[parseInt(i.toString(), 10)] === 'virtual_height') {
                    message = message.replace(gridurl, DOC_URL + '/virtual');
                }
                else if (type[parseInt(i.toString(), 10)] === 'check_datasource_columns') {
                    message = message.replace(gridurl, DOC_URL + '/columns');
                }
                else if (type[parseInt(i.toString(), 10)] === 'locale_missing') {
                    message = message.replace(gridurl, DOC_URL + '/global-local/#localization');
                }
                if (type[parseInt(i.toString(), 10)] === 'datasource_syntax_mismatch') {
                    if (!isNullOrUndefined(this.treeGridObj) && !isNullOrUndefined(this.treeGridObj.dataStateChange)) {
                        // eslint-disable-next-line no-console
                        console[item.logType](message);
                    }
                }
                else {
                    // eslint-disable-next-line no-console
                    console[item.logType](message);
                }
            }
        }
    };
    Logger.prototype.treeLog = function (types, args, treeGrid) {
        this.treeGridObj = treeGrid;
        if (!(types instanceof Array)) {
            types = [types];
        }
        var type = types;
        if (treeGrid.allowRowDragAndDrop && !treeGrid.columns.filter(function (column) { return column.isPrimaryKey; }).length) {
            IsRowDDEnabled = true;
            this.log('primary_column_missing', args);
        }
        for (var i = 0; i < type.length; i++) {
            var item = treeGridDetails[type[parseInt(i.toString(), 10)]];
            var cOp = item.check(args, treeGrid);
            if (cOp.success) {
                var message = item.generateMessage(args, treeGrid, cOp.options);
                // eslint-disable-next-line no-console
                console[item.logType](message);
            }
        }
    };
    return Logger;
}(Logger$1));
var treeGridDetails = {
    // eslint-disable-next-line camelcase
    mapping_fields_missing: {
        type: 'mapping_fields_missing',
        logType: 'error',
        check: function (args, parent) {
            var opt = { success: false };
            if ((isNullOrUndefined(parent.idMapping) && isNullOrUndefined(parent.childMapping)
                && isNullOrUndefined(parent.parentIdMapping)) ||
                (!isNullOrUndefined(parent.idMapping) && isNullOrUndefined(parent.parentIdMapping)) ||
                (isNullOrUndefined(parent.idMapping) && !isNullOrUndefined(parent.parentIdMapping))) {
                opt = { success: true };
            }
            return opt;
        },
        generateMessage: function () {
            return ERROR + ':' + ' MAPPING FIELDS MISSING \n' + 'One of the following fields is missing. It is ' +
                'required for the hierarchical relationship of records in TreeGrid:\n' +
                '* childMapping\n' + '* idMapping\n' + '* parentIdMapping\n' +
                'Refer to the following documentation links for more details.\n' +
                (BASE_DOC_URL + "/api/treegrid#childmapping") + '\n' +
                (BASE_DOC_URL + "/api/treegrid#idmapping") + '\n' +
                (BASE_DOC_URL + "/api/treegrid#$parentidmapping");
        }
    }
};

/**
 *  @hidden
 */
var load = 'load';
/** @hidden */
var rowDataBound = 'rowDataBound';
/** @hidden */
var dataBound = 'dataBound';
/** @hidden */
var queryCellInfo = 'queryCellInfo';
/** @hidden */
var beforeDataBound = 'beforeDataBound';
/** @hidden */
var actionBegin = 'actionBegin';
/** @hidden */
var dataStateChange = 'dataStateChange';
/** @hidden */
var actionComplete = 'actionComplete';
/** @hidden */
var rowSelecting = 'rowSelecting';
/** @hidden */
var rowSelected = 'rowSelected';
/** @hidden */
var checkboxChange = 'checkboxChange';
/** @hidden */
var rowDeselected = 'rowDeselected';
/** @hidden */
var toolbarClick = 'toolbarClick';
/** @hidden */
var beforeExcelExport = 'beforeExcelExport';
/** @hidden */
var beforePdfExport = 'beforePdfExport';
/** @hidden */
var resizeStop = 'resizeStop';
/** @hidden */
var expanded = 'expanded';
/** @hidden */
var expanding = 'expanding';
/** @hidden */
var collapsed = 'collapsed';
/** @hidden */
var collapsing = 'collapsing';
/** @hidden */
var remoteExpand = 'remoteExpand';
/** @hidden */
var localPagedExpandCollapse = 'localPagedExpandCollapse';
/** @hidden */
var pagingActions = 'pagingActions';
/** @hidden */
var printGridInit = 'printGrid-Init';
/** @hidden */
var contextMenuOpen = 'contextMenuOpen';
/** @hidden */
var contextMenuClick = 'contextMenuClick';
/** @hidden */
var beforeCopy = 'beforeCopy';
/** @hidden */
var beforePaste = 'beforePaste';
/** @hidden */
var savePreviousRowPosition = 'savePreviousRowPosition';
/** @hidden */
var crudAction = 'crudAction';
/** @hidden */
var beginEdit = 'beginEdit';
/** @hidden */
var beginAdd = 'beginAdd';
/** @hidden */
var recordDoubleClick = 'recordDoubleClick';
/** @hidden */
var cellSave = 'cellSave';
/** @hidden */
var cellSaved = 'cellSaved';
/** @hidden */
var cellEdit = 'cellEdit';
/** @hidden */
var batchDelete = 'batchDelete';
/** @hidden */
var batchCancel = 'batchCancel';
/** @hidden */
var batchAdd = 'batchAdd';
/** @hidden */
var beforeBatchDelete = 'beforeBatchDelete';
/** @hidden */
var beforeBatchAdd = 'beforeBatchAdd';
/** @hidden */
var beforeBatchSave = 'beforeBatchSave';
/** @hidden */
var batchSave = 'batchSave';
/** @hidden */
var keyPressed = 'key-pressed';
/** @hidden */
var updateData = 'update-data';
/** @hidden */
var doubleTap = 'double-tap';
/** @hidden */
var virtualColumnIndex = 'virtualColumnIndex';
/** @hidden */
var virtualActionArgs = 'virtual-action-args';
/** @hidden */
var destroy = 'destroy';
/** @hidden */
var dataListener = 'data-listener';
/** @hidden */
var indexModifier = 'index-modifier';
/** @hidden */
var beforeStartEdit = 'edit-form';
/** @hidden */
var beforeBatchCancel = 'before-batch-cancel';
/** @hidden */
var batchEditFormRendered = 'batcheditform-rendered';
/** @hidden */
var detailDataBound = 'detailDataBound';
/** @hidden */
var rowDrag = 'rowDrag';
/** @hidden */
var rowDragStartHelper = 'rowDragStartHelper';
/** @hidden */
var rowDrop = 'rowDrop';
/** @hidden */
var rowDragStart = 'rowDragStart';
/** @hidden */
var rowsAdd = 'rows-add';
/** @hidden */
var rowsRemove = 'rows-remove';
/** @hidden */
var rowdraging = 'row-draging';
/** @hidden */
var rowDropped = 'row-dropped';
/** @hidden */
var autoCol = 'auto-col';
/** @hidden */
var rowDeselecting = 'rowDeselecting';
/** @hidden */
var headerContent = 'e-headercontent';
/** @hidden */
var movableContent = 'e-movablecontent';
/** @hidden */
var movableHeader = 'e-movableheader';
/** @hidden */
var frozenContent = 'e-frozencontent';
/** @hidden */
var frozenHeader = 'e-frozenheader';
/** @hidden */
var content = 'e-content';
/** @hidden */
var table = 'e-table';
/** @hidden */
var leftRight = 'Left-Right';
/** @hidden */
var frozenRight = 'frozen-right';
/** @hidden */
var frozenLeft = 'frozen-left';
/** @hidden */
var ariaColIndex = 'aria-colindex';
/** @hidden */
var ariaRowIndex = 'aria-rowindex';
/** @hidden */
var actionFailure = 'actionFailure';

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * The `Clipboard` module is used to handle clipboard copy action.
 *
 * @hidden
 */
var TreeClipboard = /** @class */ (function (_super) {
    __extends$5(TreeClipboard, _super);
    function TreeClipboard(parent, serviceLocator) {
        var _this = _super.call(this, parent.grid, serviceLocator) || this;
        _this.treeCopyContent = '';
        _this.copiedUniqueIdCollection = [];
        _this.treeGridParent = parent;
        _this.serviceLocator = serviceLocator;
        return _this;
    }
    TreeClipboard.prototype.setCopyData = function (withHeader) {
        var copyContent = 'copyContent';
        var getCopyData = 'getCopyData';
        var isSelect = 'isSelect';
        var uniqueID = 'uniqueID';
        var currentRecords = this.treeGridParent.getCurrentViewRecords();
        if (window.getSelection().toString() === '') {
            this.clipBoardTextArea.value = this["" + copyContent] = '';
            var rows = this.treeGridParent.grid.getRows();
            if (this.treeGridParent.selectionSettings.mode !== 'Cell') {
                var selectedIndexes = this.treeGridParent.getSelectedRowIndexes().sort(function (a, b) {
                    return a - b;
                });
                for (var i = 0; i < selectedIndexes.length; i++) {
                    if (i > 0) {
                        this.treeCopyContent += '\n';
                    }
                    if (!rows[selectedIndexes[parseInt(i.toString(), 10)]].classList.contains('e-summaryrow')) {
                        var cells = [].slice.call(rows[selectedIndexes[parseInt(i.toString(), 10)]].querySelectorAll('.e-rowcell'));
                        var uniqueid = this.treeGridParent.getSelectedRecords()[parseInt(i.toString(), 10)]["" + uniqueID];
                        if (this.copiedUniqueIdCollection.indexOf(uniqueid) === -1) {
                            if (this.treeGridParent.copyHierarchyMode === 'Parent' || this.treeGridParent.copyHierarchyMode === 'Both') {
                                this.parentContentData(currentRecords, selectedIndexes[parseInt(i.toString(), 10)], rows, withHeader, i);
                            }
                            this["" + getCopyData](cells, false, '\t', withHeader);
                            this.treeCopyContent += this["" + copyContent];
                            this.copiedUniqueIdCollection.push(uniqueid);
                            this["" + copyContent] = '';
                            if (this.treeGridParent.copyHierarchyMode === 'Child' || this.treeGridParent.copyHierarchyMode === 'Both') {
                                this.childContentData(currentRecords, selectedIndexes[parseInt(i.toString(), 10)], rows, withHeader);
                            }
                        }
                    }
                }
                if (withHeader) {
                    var headerTextArray = [];
                    for (var i = 0; i < this.treeGridParent.getVisibleColumns().length; i++) {
                        headerTextArray[parseInt(i.toString(), 10)] =
                            this.treeGridParent.getVisibleColumns()[parseInt(i.toString(), 10)].headerText;
                    }
                    this["" + getCopyData](headerTextArray, false, '\t', withHeader);
                    this.treeCopyContent = this["" + copyContent] + '\n' + this.treeCopyContent;
                }
                var args = {
                    data: this.treeCopyContent,
                    cancel: false
                };
                this.treeGridParent.trigger(beforeCopy, args);
                if (args.cancel) {
                    return;
                }
                this.clipBoardTextArea.value = this["" + copyContent] = args.data;
                if (!Browser.userAgent.match(/ipad|ipod|iphone/i)) {
                    this.clipBoardTextArea.select();
                }
                else {
                    this.clipBoardTextArea.setSelectionRange(0, this.clipBoardTextArea.value.length);
                }
                this["" + isSelect] = true;
                this.copiedUniqueIdCollection = [];
                this.treeCopyContent = '';
            }
            else {
                _super.prototype.setCopyData.call(this, withHeader);
            }
        }
    };
    TreeClipboard.prototype.parentContentData = function (currentRecords, selectedIndex, rows, withHeader, index) {
        var getCopyData = 'getCopyData';
        var copyContent = 'copyContent';
        var parentItem = 'parentItem';
        var uniqueID = 'uniqueID';
        var level = 'level';
        if (!isNullOrUndefined(currentRecords[parseInt(selectedIndex.toString(), 10)]["" + parentItem])) {
            var treeLevel = currentRecords[parseInt(selectedIndex.toString(), 10)]["" + parentItem]["" + level];
            for (var i = 0; i < treeLevel + 1; i++) {
                for (var j = 0; j < currentRecords.length; j++) {
                    if (!isNullOrUndefined(currentRecords[parseInt(selectedIndex.toString(), 10)]["" + parentItem]) &&
                        currentRecords[parseInt(j.toString(), 10)]["" + uniqueID] === currentRecords[parseInt(selectedIndex.toString(), 10)]["" + parentItem]["" + uniqueID]) {
                        selectedIndex = j;
                        var cells = [].slice.call(rows[parseInt(selectedIndex.toString(), 10)].querySelectorAll('.e-rowcell'));
                        var uniqueid = currentRecords[parseInt(j.toString(), 10)]["" + uniqueID];
                        if (this.copiedUniqueIdCollection.indexOf(uniqueid) === -1) {
                            this["" + getCopyData](cells, false, '\t', withHeader);
                            if (index > 0) {
                                this.treeCopyContent = this.treeCopyContent + this["" + copyContent] + '\n';
                            }
                            else {
                                this.treeCopyContent = this["" + copyContent] + '\n' + this.treeCopyContent;
                            }
                            this.copiedUniqueIdCollection.push(uniqueid);
                            this["" + copyContent] = '';
                            break;
                        }
                    }
                }
            }
        }
    };
    TreeClipboard.prototype.copy = function (withHeader) {
        _super.prototype.copy.call(this, withHeader);
    };
    TreeClipboard.prototype.paste = function (data, rowIndex, colIndex) {
        _super.prototype.paste.call(this, data, rowIndex, colIndex);
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns clipboard module name
     */
    TreeClipboard.prototype.getModuleName = function () {
        return 'clipboard';
    };
    /**
     * To destroy the clipboard
     *
     * @returns {void}
     * @hidden
     */
    TreeClipboard.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    TreeClipboard.prototype.childContentData = function (currentRecords, selectedIndex, rows, withHeader) {
        var getCopyData = 'getCopyData';
        var copyContent = 'copyContent';
        var childRecords = 'childRecords';
        var hasChildRecords = 'hasChildRecords';
        var uniqueID = 'uniqueID';
        if (currentRecords[parseInt(selectedIndex.toString(), 10)]["" + hasChildRecords]) {
            var childData = currentRecords[parseInt(selectedIndex.toString(), 10)]["" + childRecords];
            for (var i = 0; i < childData.length; i++) {
                for (var j = 0; j < currentRecords.length; j++) {
                    if (!isNullOrUndefined(childData[parseInt(i.toString(), 10)]["" + uniqueID]) && currentRecords[parseInt(j.toString(), 10)]["" + uniqueID] === childData[parseInt(i.toString(), 10)]["" + uniqueID]) {
                        if ((!isNullOrUndefined(rows[parseInt(j.toString(), 10)])) && !rows[parseInt(j.toString(), 10)].classList.contains('e-summaryrow')) {
                            var cells = [].slice.call(rows[parseInt(j.toString(), 10)].querySelectorAll('.e-rowcell'));
                            var uniqueid = currentRecords[parseInt(j.toString(), 10)]["" + uniqueID];
                            if (this.copiedUniqueIdCollection.indexOf(uniqueid) === -1) {
                                this["" + getCopyData](cells, false, '\t', withHeader);
                                this.treeCopyContent += ('\n' + this["" + copyContent]);
                                this["" + copyContent] = '';
                                this.copiedUniqueIdCollection.push(uniqueid);
                                this.childContentData(currentRecords, j, rows, withHeader);
                            }
                        }
                        break;
                    }
                }
            }
        }
    };
    return TreeClipboard;
}(Clipboard));

/**
 * @param {TreeGrid} parent - Tree Grid instance
 * @returns {boolean} - Specifies whether remote data binding
 */
function isRemoteData(parent) {
    if (parent.dataSource instanceof DataManager) {
        var adaptor = parent.dataSource.adaptor;
        return (adaptor instanceof ODataAdaptor ||
            (adaptor instanceof WebApiAdaptor) || (adaptor instanceof WebMethodAdaptor) ||
            (adaptor instanceof CacheAdaptor) || adaptor instanceof UrlAdaptor);
    }
    return false;
}
/**
 * @param {TreeGrid | IGrid} parent - Tree Grid or Grid instance
 * @returns {boolean} - Returns whether custom binding
 */
function isCountRequired(parent) {
    if (parent.dataSource && 'result' in parent.dataSource) {
        return true;
    }
    return false;
}
/**
 * @param {TreeGrid} parent - Tree Grid instance
 * @returns {boolean} - Returns whether checkbox column is enabled
 */
function isCheckboxcolumn(parent) {
    for (var i = 0; i < parent.columns.length; i++) {
        if (parent.columns[parseInt(i.toString(), 10)].showCheckbox) {
            return true;
        }
    }
    return false;
}
/**
 * @param {TreeGrid} parent - Tree Grid instance
 * @returns {boolean} - Returns whether filtering and searching done
 */
function isFilterChildHierarchy(parent) {
    if ((!isNullOrUndefined(parent.grid.searchSettings.key) && parent.grid.searchSettings.key !== '' &&
        (parent.searchSettings.hierarchyMode === 'Child' || parent.searchSettings.hierarchyMode === 'None')) ||
        (parent.allowFiltering && parent.grid.filterSettings.columns.length &&
            (parent.filterSettings.hierarchyMode === 'Child' || parent.filterSettings.hierarchyMode === 'None'))) {
        return true;
    }
    return false;
}
/**
 * @param {Object} records - Define records for which parent records has to be found
 * @hidden
 * @returns {Object} - Returns parent records collection
 */
function findParentRecords(records) {
    var datas = [];
    var recordsLength = Object.keys(records).length;
    for (var i = 0, len = recordsLength; i < len; i++) {
        var hasChild = getObject('hasChildRecords', records[parseInt(i.toString(), 10)]);
        if (hasChild) {
            datas.push(records[parseInt(i.toString(), 10)]);
        }
    }
    return datas;
}
/**
 * @param {TreeGrid} parent - Tree Grid instance
 * @returns {boolean} - Returns the expand status of record
 * @param {ITreeData} record - Define the record for which expand status has be found
 * @param {ITreeData[]} parents - Parent Data collection
 * @hidden
 */
function getExpandStatus(parent, record, parents) {
    var parentRecord = isNullOrUndefined(record.parentItem) ? null :
        getParentData(parent, record.parentItem.uniqueID);
    var childParent;
    if (parentRecord != null) {
        if (parent.initialRender && !isNullOrUndefined(parentRecord[parent.expandStateMapping])
            && !parentRecord[parent.expandStateMapping]) {
            parentRecord.expanded = false;
            return false;
        }
        else if (parentRecord.expanded === false) {
            return false;
        }
        else if (parentRecord.parentItem) {
            childParent = getParentData(parent, parentRecord.parentItem.uniqueID);
            if (childParent && parent.initialRender && !isNullOrUndefined(childParent[parent.expandStateMapping])
                && !childParent[parent.expandStateMapping]) {
                childParent.expanded = false;
                return false;
            }
            if (childParent && childParent.expanded === false) {
                return false;
            }
            else if (childParent) {
                return getExpandStatus(parent, childParent);
            }
            return true;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
/**
 * @param {ITreeData} records - Define the record for which child records has to be found
 * @returns {Object[]} - Returns child records collection
 * @hidden
 */
function findChildrenRecords(records) {
    var datas = [];
    if (isNullOrUndefined(records) || (!records.hasChildRecords && !isNullOrUndefined(records.childRecords)
        && !records.childRecords.length)) {
        return [];
    }
    if (!isNullOrUndefined(records.childRecords)) {
        var childRecords = records.childRecords.filter(function (item) { return !item.isSummaryRow; });
        var keys = Object.keys(childRecords);
        for (var i = 0, len = keys.length; i < len; i++) {
            datas.push(childRecords[parseInt(i.toString(), 10)]);
            if (childRecords[parseInt(i.toString(), 10)].hasChildRecords ||
                (!isNullOrUndefined(childRecords[parseInt(i.toString(), 10)].childRecords) &&
                    childRecords[parseInt(i.toString(), 10)].childRecords.length)) {
                datas = datas.concat(findChildrenRecords(childRecords[parseInt(i.toString(), 10)]));
            }
        }
    }
    return datas;
}
/**
 * @param {TreeGrid} parent - Tree Grid instance
 * @returns {boolean} - Returns whether local data binding
 */
function isOffline(parent) {
    if (isRemoteData(parent)) {
        var dm = parent.dataSource;
        return !isNullOrUndefined(dm.ready);
    }
    return true;
}
/**
 * @param {Object[]} array - Defines the array to be cloned
 * @returns {Object[]} - Returns cloned array collection
 */
function extendArray(array) {
    var objArr = [];
    var obj;
    var keys;
    for (var i = 0; array && i < array.length; i++) {
        keys = Object.keys(array[parseInt(i.toString(), 10)]);
        obj = {};
        for (var j = 0; j < keys.length; j++) {
            obj[keys[parseInt(j.toString(), 10)]] = array[parseInt(i.toString(), 10)][keys[parseInt(j.toString(), 10)]];
        }
        objArr.push(obj);
    }
    return objArr;
}
/**
 * @param {ITreeData} value - Defined the dirty data to be cleaned
 * @returns {ITreeData} - Returns cleaned original data
 */
function getPlainData(value) {
    delete value.hasChildRecords;
    delete value.childRecords;
    delete value.index;
    delete value.parentItem;
    delete value.level;
    delete value.taskData;
    delete value.uniqueID;
    return value;
}
/**
 * @param {TreeGrid} parent - TreeGrid instance
 * @param {string} value - IdMapping field name
 * @param {boolean} requireFilter - Specified whether treegrid data is filtered
 * @returns {ITreeData} - Returns IdMapping matched record
 */
function getParentData(parent, value, requireFilter) {
    if (requireFilter) {
        var idFilter = 'uniqueIDFilterCollection';
        return parent["" + idFilter]["" + value];
    }
    else {
        var id = 'uniqueIDCollection';
        return parent["" + id]["" + value];
    }
}
/**
 * @param {HTMLTableRowElement} el - Row element
 * @returns {boolean} - Returns whether hidden
 */
function isHidden(el) {
    var style = window.getComputedStyle(el);
    return ((style.display === 'none') || (style.visibility === 'hidden'));
}

/**
 * TreeGrid Selection module
 *
 * @hidden
 */
var Selection = /** @class */ (function () {
    /**
     * Constructor for Selection module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Selection(parent) {
        this.parent = parent;
        this.selectedItems = [];
        this.selectedIndexes = [];
        this.filteredList = [];
        this.searchingRecords = [];
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Selection module name
     */
    Selection.prototype.getModuleName = function () {
        return 'selection';
    };
    Selection.prototype.addEventListener = function () {
        this.parent.on('dataBoundArg', this.headerCheckbox, this);
        this.parent.on('columnCheckbox', this.columnCheckbox, this);
        this.parent.on('updateGridActions', this.updateGridActions, this);
        this.parent.grid.on('colgroup-refresh', this.headerCheckbox, this);
        this.parent.on('checkboxSelection', this.checkboxSelection, this);
    };
    Selection.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('dataBoundArg', this.headerCheckbox);
        this.parent.off('columnCheckbox', this.columnCheckbox);
        this.parent.grid.off('colgroup-refresh', this.headerCheckbox);
        this.parent.off('checkboxSelection', this.checkboxSelection);
        this.parent.off('updateGridActions', this.updateGridActions);
    };
    /**
     * To destroy the Selection
     *
     * @returns {void}
     * @hidden
     */
    Selection.prototype.destroy = function () {
        this.removeEventListener();
    };
    Selection.prototype.checkboxSelection = function (args) {
        var _a;
        var target = getObject('target', args);
        var checkWrap = parentsUntil(target, 'e-checkbox-wrapper');
        var checkBox;
        if (checkWrap && checkWrap.querySelectorAll('.e-treecheckselect').length > 0) {
            checkBox = checkWrap.querySelector('input[type="checkbox"]');
            var rowIndex = [];
            rowIndex.push(target.closest('tr').rowIndex);
            this.selectCheckboxes(rowIndex);
            this.triggerChkChangeEvent(checkBox, checkBox.nextElementSibling.classList.contains('e-check'), target.closest('tr'));
        }
        else if (checkWrap && checkWrap.querySelectorAll('.e-treeselectall').length > 0 && this.parent.autoCheckHierarchy) {
            var checkBoxvalue = !checkWrap.querySelector('.e-frame').classList.contains('e-check')
                && !checkWrap.querySelector('.e-frame').classList.contains('e-stop');
            this.headerSelection(checkBoxvalue);
            checkBox = checkWrap.querySelector('input[type="checkbox"]');
            this.triggerChkChangeEvent(checkBox, checkBoxvalue, target.closest('tr'));
        }
        if (!isNullOrUndefined(this.parent['parentQuery']) && this.parent.selectionSettings.persistSelection
            && this.parent['columnModel'].filter(function (col) { return col.type === 'checkbox'; }).length > 0
            && isRemoteData(this.parent)) {
            if (this.parent['parentQuery'].length > 0) {
                (_a = this.parent.query.queries).push.apply(_a, this.parent['parentQuery']);
                this.parent['parentQuery'] = [];
            }
        }
    };
    Selection.prototype.triggerChkChangeEvent = function (checkBox, checkState, rowElement) {
        var data = this.parent.getCurrentViewRecords()[rowElement.rowIndex];
        var args = { checked: checkState, target: checkBox, rowElement: rowElement,
            rowData: checkBox.classList.contains('e-treeselectall')
                ? this.parent.getCheckedRecords() : data };
        this.parent.trigger(checkboxChange, args);
    };
    Selection.prototype.getCheckboxcolumnIndex = function () {
        var mappingUid;
        var columnIndex;
        var stackedHeader = 'stackedHeader';
        var columnModel = 'columnModel';
        var columns = this.parent["" + stackedHeader] ? this.parent["" + columnModel] : (this.parent.columns);
        for (var col = 0; col < columns.length; col++) {
            if (columns[parseInt(col.toString(), 10)].showCheckbox) {
                mappingUid = columns[parseInt(col.toString(), 10)].uid;
            }
        }
        var headerCelllength = this.parent.getHeaderContent().querySelectorAll('.e-headercelldiv').length;
        for (var j = 0; j < headerCelllength; j++) {
            var headercell = this.parent.getHeaderContent().querySelectorAll('.e-headercelldiv')[parseInt(j.toString(), 10)];
            if (headercell.getAttribute('e-mappinguid') === mappingUid) {
                columnIndex = j;
            }
        }
        return columnIndex;
    };
    Selection.prototype.headerCheckbox = function () {
        this.columnIndex = this.getCheckboxcolumnIndex();
        if (this.columnIndex > -1 && this.parent.getHeaderContent().querySelectorAll('.e-treeselectall').length === 0) {
            var headerElement = this.parent.getHeaderContent().querySelectorAll('.e-headercelldiv')[this.columnIndex];
            var value = false;
            var rowChkBox = this.parent.createElement('input', { className: 'e-treeselectall', attrs: { 'type': 'checkbox' } });
            var checkWrap = createCheckBox(this.parent.createElement, false, { checked: value, label: ' ' });
            checkWrap.classList.add('e-hierarchycheckbox');
            checkWrap.insertBefore(rowChkBox.cloneNode(), checkWrap.firstChild);
            if (!isNullOrUndefined(headerElement)) {
                headerElement.insertBefore(checkWrap, headerElement.firstChild);
            }
            if (this.parent.autoCheckHierarchy) {
                this.headerSelection();
            }
        }
        else if (this.columnIndex > -1 && this.parent.getHeaderContent().querySelectorAll('.e-treeselectall').length > 0) {
            var checkWrap = this.parent.getHeaderContent().querySelectorAll('.e-checkbox-wrapper')[0];
            var checkBoxvalue = checkWrap.querySelector('.e-frame').classList.contains('e-check');
            if (this.parent.autoCheckHierarchy && checkBoxvalue) {
                this.headerSelection(checkBoxvalue);
            }
        }
    };
    Selection.prototype.renderColumnCheckbox = function (args) {
        var rowChkBox = this.parent.createElement('input', { className: 'e-treecheckselect', attrs: { 'type': 'checkbox', 'aria-label': 'checkbox' } });
        var data = args.data;
        args.cell.classList.add('e-treegridcheckbox');
        args.cell.setAttribute('aria-label', 'checkbox');
        var value = (isNullOrUndefined(data.checkboxState) || data.checkboxState === 'uncheck') ? false : true;
        var checkWrap = createCheckBox(this.parent.createElement, false, { checked: value, label: ' ' });
        checkWrap.classList.add('e-hierarchycheckbox');
        if (this.parent.allowTextWrap) {
            checkWrap.querySelector('.e-frame').style.width = '18px';
        }
        if (data.checkboxState === 'indeterminate') {
            var checkbox = checkWrap.querySelectorAll('.e-frame')[0];
            removeClass([checkbox], ['e-check', 'e-stop', 'e-uncheck']);
            checkWrap.querySelector('.e-frame').classList.add('e-stop');
        }
        checkWrap.insertBefore(rowChkBox.cloneNode(), checkWrap.firstChild);
        return checkWrap;
    };
    Selection.prototype.columnCheckbox = function (container) {
        var checkWrap = this.renderColumnCheckbox(container);
        var containerELe = container.cell.querySelector('.e-treecolumn-container');
        if (!isNullOrUndefined(containerELe)) {
            if (!container.cell.querySelector('.e-hierarchycheckbox')) {
                containerELe.insertBefore(checkWrap, containerELe.querySelectorAll('.e-treecell')[0]);
            }
        }
        else {
            var spanEle = this.parent.createElement('span', { className: 'e-treecheckbox' });
            var data = container.cell.innerHTML;
            container.cell.innerHTML = '';
            spanEle.innerHTML = data;
            var divEle = this.parent.createElement('div', { className: 'e-treecheckbox-container' });
            divEle.appendChild(checkWrap);
            divEle.appendChild(spanEle);
            container.cell.appendChild(divEle);
        }
    };
    Selection.prototype.selectCheckboxes = function (rowIndexes) {
        if (isNullOrUndefined(rowIndexes)) {
            var error = 'The provided value for the rowIndexes is undefined. Please ensure the rowIndexes contains number.';
            this.parent.trigger(actionFailure, { error: error });
        }
        for (var i = 0; i < rowIndexes.length; i++) {
            var record = this.parent.getCurrentViewRecords()[rowIndexes[parseInt(i.toString(), 10)]];
            var flatRecord = getParentData(this.parent, record.uniqueID);
            record = flatRecord;
            var checkboxState = (record.checkboxState === 'uncheck') ? 'check' : 'uncheck';
            record.checkboxState = checkboxState;
            var keys = Object.keys(record);
            for (var j = 0; j < keys.length; j++) {
                if (Object.prototype.hasOwnProperty.call(flatRecord, keys[parseInt(j.toString(), 10)])) {
                    flatRecord[keys[parseInt(j.toString(), 10)]] = record[keys[parseInt(j.toString(), 10)]];
                }
            }
            this.traverSelection(record, checkboxState, false);
            if (this.parent.autoCheckHierarchy) {
                this.headerSelection();
            }
        }
    };
    Selection.prototype.traverSelection = function (record, checkboxState, ischildItem) {
        var length = 0;
        this.updateSelectedItems(record, checkboxState);
        if (!ischildItem && record.parentItem && this.parent.autoCheckHierarchy) {
            this.updateParentSelection(record.parentItem);
        }
        if (record.childRecords && this.parent.autoCheckHierarchy) {
            var childRecords = record.childRecords;
            if (!isNullOrUndefined(this.parent.filterModule) &&
                this.parent.filterModule.filteredResult.length > 0 && this.parent.autoCheckHierarchy) {
                childRecords = this.getFilteredChildRecords(childRecords);
            }
            length = childRecords.length;
            for (var count = 0; count < length; count++) {
                if (!childRecords[parseInt(count.toString(), 10)].isSummaryRow) {
                    if (childRecords[parseInt(count.toString(), 10)].hasChildRecords) {
                        this.traverSelection(childRecords[parseInt(count.toString(), 10)], checkboxState, true);
                    }
                    else {
                        this.updateSelectedItems(childRecords[parseInt(count.toString(), 10)], checkboxState);
                    }
                }
            }
        }
    };
    Selection.prototype.getFilteredChildRecords = function (childRecords) {
        var _this = this;
        var filteredChildRecords = childRecords.filter(function (e) {
            return _this.parent.filterModule.filteredResult.indexOf(e) > -1;
        });
        return filteredChildRecords;
    };
    Selection.prototype.updateParentSelection = function (parentRecord) {
        var length = 0;
        var childRecords = [];
        var record = getParentData(this.parent, parentRecord.uniqueID);
        if (record && record.childRecords) {
            childRecords = record.childRecords;
        }
        if (!isNullOrUndefined(this.parent.filterModule) &&
            this.parent.filterModule.filteredResult.length > 0 && this.parent.autoCheckHierarchy) {
            childRecords = this.getFilteredChildRecords(childRecords);
        }
        length = childRecords && childRecords.length;
        var indeter = 0;
        var checkChildRecords = 0;
        if (!isNullOrUndefined(record)) {
            for (var i = 0; i < childRecords.length; i++) {
                var currentRecord = getParentData(this.parent, childRecords[parseInt(i.toString(), 10)].uniqueID);
                var checkBoxRecord = currentRecord;
                if (!isNullOrUndefined(checkBoxRecord)) {
                    if (checkBoxRecord.checkboxState === 'indeterminate') {
                        indeter++;
                    }
                    else if (checkBoxRecord.checkboxState === 'check') {
                        checkChildRecords++;
                    }
                }
            }
            if (indeter > 0 || (checkChildRecords > 0 && checkChildRecords !== length)) {
                record.checkboxState = 'indeterminate';
            }
            else if (checkChildRecords === 0 && (!record.hasFilteredChildRecords || isNullOrUndefined(record.hasFilteredChildRecords)) && !isNullOrUndefined(this.parent['dataResults']['actionArgs']) &&
                (this.parent['dataResults']['actionArgs'].requestType === 'searching' || this.parent['dataResults']['actionArgs'].requestType === 'filtering') && record.checkboxState === 'check') {
                record.checkboxState = 'check';
            }
            else if ((checkChildRecords === 0 && indeter === 0) || (checkChildRecords === 0 && record.hasFilteredChildRecords && !isNullOrUndefined(this.parent['dataResults']['actionArgs']) &&
                (this.parent['dataResults']['actionArgs'].requestType === 'searching' || this.parent['dataResults']['actionArgs'].requestType === 'filtering') && record.checkboxState === 'check')) {
                record.checkboxState = 'uncheck';
            }
            else {
                record.checkboxState = 'check';
            }
            this.updateSelectedItems(record, record.checkboxState);
            if (record.parentItem) {
                this.updateParentSelection(record.parentItem);
            }
        }
    };
    Selection.prototype.headerSelection = function (checkAll) {
        var _this = this;
        var index = -1;
        var length = 0;
        //This property used to maintain the check state of the currentview data after clear filtering
        var multiFilterCheckState = false;
        if (!isNullOrUndefined(this.parent.filterModule) && this.parent.filterModule.filteredResult.length > 0) {
            var filterResult = this.parent.filterModule.filteredResult;
            if (this.filteredList.length === 0) {
                this.filteredList = filterResult;
            }
            if (this.parent.grid.searchSettings.key.length) {
                this.searchingRecords = filterResult;
            }
            else {
                if (this.filteredList !== filterResult) {
                    this.filteredList = filterResult;
                    multiFilterCheckState = true;
                }
                else {
                    multiFilterCheckState = false;
                }
            }
        }
        if (this.filteredList.length > 0) {
            if (!this.parent.filterSettings.columns.length && this.filteredList.length && !this.parent.grid.searchSettings.key.length) {
                this.filteredList = [];
            }
            if (this.searchingRecords.length && !isNullOrUndefined(checkAll)) {
                this.filteredList = this.searchingRecords;
            }
        }
        var data;
        if (!(isNullOrUndefined(this.parent.filterModule)) &&
            this.parent.filterModule.filteredResult.length === 0 && this.parent.getCurrentViewRecords().length === 0 &&
            this.parent.filterSettings.columns.length > 0) {
            data = this.filteredList;
        }
        else {
            data = (!isNullOrUndefined(this.parent.filterModule) &&
                (this.filteredList.length > 0)) ? this.filteredList : this.parent.flatData;
        }
        data = isRemoteData(this.parent) ? this.parent.getCurrentViewRecords() : data;
        if (!isNullOrUndefined(checkAll)) {
            for (var i = 0; i < data.length; i++) {
                if (checkAll) {
                    if (data[parseInt(i.toString(), 10)].checkboxState === 'check') {
                        continue;
                    }
                    if (multiFilterCheckState) {
                        continue;
                    }
                    data[parseInt(i.toString(), 10)].checkboxState = 'check';
                    this.updateSelectedItems(data[parseInt(i.toString(), 10)], data[parseInt(i.toString(), 10)].checkboxState);
                }
                else {
                    index = this.selectedItems.indexOf(data[parseInt(i.toString(), 10)]);
                    if (index > -1) {
                        data[parseInt(i.toString(), 10)].checkboxState = 'uncheck';
                        this.updateSelectedItems(data[parseInt(i.toString(), 10)], data[parseInt(i.toString(), 10)].checkboxState);
                        if (this.parent.autoCheckHierarchy) {
                            this.updateParentSelection(data[parseInt(i.toString(), 10)]);
                        }
                    }
                }
            }
        }
        if (checkAll === false && this.parent.enableVirtualization) {
            this.selectedItems = [];
            this.selectedIndexes = [];
            data.filter(function (rec) {
                rec.checkboxState = 'uncheck';
                _this.updateSelectedItems(rec, rec.checkboxState);
            });
        }
        length = this.selectedItems.length;
        var checkbox = this.parent.getHeaderContent().querySelectorAll('.e-frame')[0];
        if (length > 0 && data.length > 0) {
            if (length !== data.length && !checkAll) {
                removeClass([checkbox], ['e-check']);
                checkbox.classList.add('e-stop');
            }
            else {
                removeClass([checkbox], ['e-stop']);
                checkbox.classList.add('e-check');
            }
        }
        else {
            removeClass([checkbox], ['e-check', 'e-stop']);
        }
    };
    Selection.prototype.updateSelectedItems = function (currentRecord, checkState) {
        var record = this.parent.grid.currentViewData.filter(function (e) {
            return e.uniqueID === currentRecord.uniqueID;
        });
        var checkedRecord;
        var recordIndex = this.parent.grid.currentViewData.indexOf(record[0]);
        var checkboxRecord = getParentData(this.parent, currentRecord.uniqueID);
        var tr = this.parent.getRows()[parseInt(recordIndex.toString(), 10)];
        var checkbox;
        if (recordIndex > -1) {
            var movableTr = void 0;
            if (this.parent.frozenRows || this.parent.getFrozenColumns()) {
                movableTr = this.parent.getDataRows()[parseInt(recordIndex.toString(), 10)];
            }
            checkbox = tr.querySelectorAll('.e-hierarchycheckbox .e-frame')[0] ? tr.querySelectorAll('.e-hierarchycheckbox .e-frame')[0]
                : movableTr.querySelectorAll('.e-hierarchycheckbox .e-frame')[0];
            if (!isNullOrUndefined(checkbox)) {
                removeClass([checkbox], ['e-check', 'e-stop', 'e-uncheck']);
            }
        }
        checkedRecord = checkboxRecord;
        if (isNullOrUndefined(checkedRecord)) {
            checkedRecord = currentRecord;
        }
        checkedRecord.checkboxState = checkState;
        if (checkState === 'check' && isNullOrUndefined(currentRecord.isSummaryRow)) {
            if (recordIndex !== -1 && this.selectedIndexes.indexOf(recordIndex) === -1) {
                this.selectedIndexes.push(recordIndex);
            }
            if (this.selectedItems.indexOf(checkedRecord) === -1 && (recordIndex !== -1 &&
                (!isNullOrUndefined(this.parent.filterModule) && this.parent.filterModule.filteredResult.length > 0))) {
                this.selectedItems.push(checkedRecord);
            }
            if (this.selectedItems.indexOf(checkedRecord) === -1 && (this.parent.enableVirtualization || this.parent.allowPaging) && ((!isNullOrUndefined(this.parent.filterModule) && this.parent.filterModule.filteredResult.length > 0))) {
                this.selectedItems.push(checkedRecord);
            }
            if (this.selectedItems.indexOf(checkedRecord) === -1 && (!isNullOrUndefined(this.parent.filterModule) &&
                this.parent.filterModule.filteredResult.length === 0)) {
                this.selectedItems.push(checkedRecord);
            }
            if (this.selectedItems.indexOf(checkedRecord) === -1 && isNullOrUndefined(this.parent.filterModule)) {
                this.selectedItems.push(checkedRecord);
            }
        }
        else if ((checkState === 'uncheck' || checkState === 'indeterminate') && isNullOrUndefined(currentRecord.isSummaryRow)) {
            var index = this.selectedItems.indexOf(checkedRecord);
            if (index !== -1) {
                this.selectedItems.splice(index, 1);
            }
            if (this.selectedIndexes.indexOf(recordIndex) !== -1) {
                var checkedIndex = this.selectedIndexes.indexOf(recordIndex);
                this.selectedIndexes.splice(checkedIndex, 1);
            }
        }
        var checkBoxclass = checkState === 'indeterminate' ? 'e-stop' : 'e-' + checkState;
        if (recordIndex > -1) {
            if (!isNullOrUndefined(checkbox)) {
                checkbox.classList.add(checkBoxclass);
                tr.querySelector('.e-treecheckselect').setAttribute('aria-checked', checkState === 'check' ? 'true' : checkState === 'uncheck' ? 'false' : 'mixed');
            }
        }
    };
    Selection.prototype.updateGridActions = function (args) {
        var _this = this;
        var requestType = args.requestType;
        var childData;
        var childLength;
        if (isCheckboxcolumn(this.parent)) {
            if (this.parent.autoCheckHierarchy) {
                if ((requestType === 'sorting' || requestType === 'paging')) {
                    var rows = this.parent.grid.getRows();
                    childData = this.parent.getCurrentViewRecords();
                    childLength = childData.length;
                    this.selectedIndexes = [];
                    for (var i = 0; i < childLength; i++) {
                        if (!rows[parseInt(i.toString(), 10)].classList.contains('e-summaryrow')) {
                            this.updateSelectedItems(childData[parseInt(i.toString(), 10)], childData[parseInt(i.toString(), 10)].checkboxState);
                        }
                    }
                }
                else if (requestType === 'delete' || args.action === 'add') {
                    var updatedData = [];
                    if (requestType === 'delete') {
                        updatedData = args.data;
                    }
                    else {
                        updatedData.push(args.data);
                    }
                    for (var i = 0; i < updatedData.length; i++) {
                        if (requestType === 'delete') {
                            var index = this.parent.flatData.indexOf(updatedData[parseInt(i.toString(), 10)]);
                            var checkedIndex = this.selectedIndexes.indexOf(index);
                            this.selectedIndexes.splice(checkedIndex, 1);
                            this.updateSelectedItems(updatedData[parseInt(i.toString(), 10)], 'uncheck');
                        }
                        if (!isNullOrUndefined(updatedData[parseInt(i.toString(), 10)].parentItem)) {
                            this.updateParentSelection(updatedData[parseInt(i.toString(), 10)].parentItem);
                        }
                    }
                }
                else if (args.requestType === 'add' && this.parent.autoCheckHierarchy) {
                    args.data.checkboxState = 'uncheck';
                }
                else if (requestType === 'filtering' || requestType === 'searching' || requestType === 'refresh'
                    && !isRemoteData(this.parent)) {
                    this.selectedItems = [];
                    this.selectedIndexes = [];
                    childData = (!isNullOrUndefined(this.parent.filterModule) && this.parent.filterModule.filteredResult.length > 0) ?
                        this.parent.filterModule.filteredResult : this.parent.flatData;
                    childData.forEach(function (record) {
                        if (_this.parent.enableVirtualization) {
                            if (record.hasChildRecords && record.childRecords.length > 0) {
                                _this.updateParentSelection(record);
                            }
                            else {
                                _this.updateSelectedItems(record, record.checkboxState);
                            }
                            var child = findChildrenRecords(record);
                            child = _this.getFilteredChildRecords(child);
                            for (var i = 0; i < child.length; i++) {
                                if (child[parseInt(i.toString(), 10)].hasChildRecords) {
                                    _this.updateParentSelection(child[parseInt(i.toString(), 10)]);
                                }
                                else if (!(child[parseInt(i.toString(), 10)].hasChildRecords) &&
                                    !isNullOrUndefined(child[parseInt(i.toString(), 10)])) {
                                    _this.updateSelectedItems(child[parseInt(i.toString(), 10)], child[parseInt(i.toString(), 10)].checkboxState);
                                }
                            }
                        }
                        else {
                            if (record.hasChildRecords) {
                                _this.updateParentSelection(record);
                            }
                            else {
                                _this.updateSelectedItems(record, record.checkboxState);
                            }
                        }
                    });
                    this.headerSelection();
                }
            }
        }
    };
    Selection.prototype.getCheckedrecords = function () {
        return this.selectedItems;
    };
    Selection.prototype.getCheckedRowIndexes = function () {
        return this.selectedIndexes;
    };
    return Selection;
}());

/**
 * TreeGrid Print module
 *
 * @hidden
 */
var Print = /** @class */ (function () {
    /**
     * Constructor for Print module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Print(parent) {
        this.parent = parent;
        Grid.Inject(Print$1);
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Print module name
     */
    Print.prototype.getModuleName = function () {
        return 'print';
    };
    /**
     * @hidden
     * @returns {void}
     */
    Print.prototype.addEventListener = function () {
        this.parent.grid.on(printGridInit, this.printTreeGrid, this);
    };
    Print.prototype.removeEventListener = function () {
        this.parent.grid.off(printGridInit, this.printTreeGrid);
    };
    Print.prototype.printTreeGrid = function (printGrid) {
        var grid = getObject('printgrid', printGrid);
        var gridElement = getObject('element', printGrid);
        grid.addEventListener(queryCellInfo, this.parent.grid.queryCellInfo);
        grid.addEventListener(rowDataBound, this.parent.grid.rowDataBound);
        grid.addEventListener(beforeDataBound, this.parent.grid.beforeDataBound);
        addClass([gridElement], 'e-treegrid');
    };
    Print.prototype.print = function () {
        this.parent.grid.print();
    };
    /**
     * To destroy the Print
     *
     * @returns {void}
     * @hidden
     */
    Print.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Print;
}());

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the searching behavior of the TreeGrid.
 */
var SearchSettings = /** @class */ (function (_super) {
    __extends$6(SearchSettings, _super);
    function SearchSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property()
    ], SearchSettings.prototype, "fields", void 0);
    __decorate$4([
        Property(false)
    ], SearchSettings.prototype, "ignoreCase", void 0);
    __decorate$4([
        Property('contains')
    ], SearchSettings.prototype, "operator", void 0);
    __decorate$4([
        Property()
    ], SearchSettings.prototype, "key", void 0);
    __decorate$4([
        Property()
    ], SearchSettings.prototype, "hierarchyMode", void 0);
    return SearchSettings;
}(ChildProperty));

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the selection behavior of the TreeGrid.
 */
var SelectionSettings = /** @class */ (function (_super) {
    __extends$7(SelectionSettings, _super);
    function SelectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$5([
        Property('Row')
    ], SelectionSettings.prototype, "mode", void 0);
    __decorate$5([
        Property('Flow')
    ], SelectionSettings.prototype, "cellSelectionMode", void 0);
    __decorate$5([
        Property('Single')
    ], SelectionSettings.prototype, "type", void 0);
    __decorate$5([
        Property(false)
    ], SelectionSettings.prototype, "persistSelection", void 0);
    __decorate$5([
        Property('Default')
    ], SelectionSettings.prototype, "checkboxMode", void 0);
    __decorate$5([
        Property(false)
    ], SelectionSettings.prototype, "checkboxOnly", void 0);
    __decorate$5([
        Property(true)
    ], SelectionSettings.prototype, "enableToggle", void 0);
    return SelectionSettings;
}(ChildProperty));

/**
 * TreeGrid render module
 *
 * @hidden
 */
var Render = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Render(parent) {
        this.parent = parent;
        this.templateResult = null;
        this.parent.grid.on('template-result', this.columnTemplateResult, this);
        this.parent.grid.on('reactTemplateRender', this.reactTemplateRender, this);
    }
    /**
     * Updated row elements for TreeGrid
     *
     * @param {RowDataBoundEventArgs} args - Row details before its bound to DOM
     * @returns {void}
     */
    Render.prototype.RowModifier = function (args) {
        if (!args.data) {
            return;
        }
        var data = args.data;
        var parentData = data.parentItem;
        if (!isNullOrUndefined(data.parentItem) && !isFilterChildHierarchy(this.parent) &&
            (!(this.parent.allowPaging && !(this.parent.pageSettings.pageSizeMode === 'Root')) ||
                (isRemoteData(this.parent) && !isOffline(this.parent)))) {
            var collapsed = (this.parent.initialRender && (!(isNullOrUndefined(parentData[this.parent.expandStateMapping]) ||
                parentData[this.parent.expandStateMapping]) || this.parent.enableCollapseAll)) ||
                !getExpandStatus(this.parent, args.data, this.parent.grid.getCurrentViewRecords());
            if (collapsed && !isNullOrUndefined(args.row)) {
                this.parent['toggleRowVisibility'](args.row, 'e-childrow-hidden');
                var rowsObj = this.parent.grid.getRowsObject();
                if (!this.parent.grid.isFrozenGrid() && !isNullOrUndefined(args.row.getAttribute('data-uid'))) {
                    rowsObj.filter(function (e) { return e.uid === args.row.getAttribute('data-uid'); })[0].visible = false;
                }
            }
        }
        if (isRemoteData(this.parent) && !isOffline(this.parent)) {
            var proxy_1 = this.parent;
            var parentrec = this.parent.getCurrentViewRecords().filter(function (rec) {
                return getValue(proxy_1.idMapping, rec) === getValue(proxy_1.parentIdMapping, data);
            });
            if (parentrec.length > 0 && !parentrec[0].isSummaryRow && !isNullOrUndefined(args.row)) {
                var display = parentrec[0].expanded ? 'e-childrow-visible' : 'e-childrow-hidden';
                this.parent['toggleRowVisibility'](args.row, display);
            }
        }
        //addClass([args.row], 'e-gridrowindex' + index + 'level' + (<ITreeData>args.data).level);
        var summaryRow = getObject('isSummaryRow', args.data);
        if (summaryRow) {
            addClass([args.row], 'e-summaryrow');
        }
        if (!isNullOrUndefined(args.row)) {
            if (args.row.querySelector('.e-treegridexpand')) {
                args.row.setAttribute('aria-expanded', 'true');
            }
            else if (args.row.querySelector('.e-treegridcollapse')) {
                args.row.setAttribute('aria-expanded', 'false');
            }
            if (this.parent.enableCollapseAll && this.parent.initialRender) {
                if (!isNullOrUndefined(data.parentItem)) {
                    this.parent['toggleRowVisibility'](args.row, 'e-childrow-hidden');
                }
            }
        }
        var dragStartData = 'dragStartData';
        var draggedRecord = 'draggedRecord';
        if (this.parent.rowDragAndDropModule && this.parent.grid.rowDragAndDropModule && (this.parent.grid.rowDragAndDropModule["" + dragStartData] ||
            this.parent.rowDragAndDropModule["" + draggedRecord]) && this.parent.getContentTable().scrollHeight <= this.parent.getContent().clientHeight) {
            var lastRowBorder = 'lastRowBorder';
            var lastVisualData = this.parent.getVisibleRecords()[this.parent.getVisibleRecords().length - 1];
            if (lastVisualData.uniqueID === args.data.uniqueID && !isNullOrUndefined(args.row) && !args.row.cells[0].classList.contains('e-lastrowcell')) {
                this.parent["" + lastRowBorder](args.row, true);
            }
        }
        if (this.parent.isReact) {
            var renderReactTemplates = 'renderReactTemplates';
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var thisRef_1 = this;
            // tslint:disable-next-line:typedef
            thisRef_1.parent["" + renderReactTemplates](function () {
                thisRef_1.parent.trigger(rowDataBound, args);
            });
        }
        else {
            this.parent.trigger(rowDataBound, args);
        }
    };
    /**
     * cell renderer for tree column index cell
     *
     * @param {QueryCellInfoEventArgs} args - Cell detail before its bound to DOM
     * @returns {void}
     */
    Render.prototype.cellRender = function (args) {
        if (!args.data) {
            return;
        }
        var grid = this.parent.grid;
        var data = args.data;
        var index;
        var ispadfilter = isNullOrUndefined(data.filterLevel);
        var pad = ispadfilter ? data.level : data.filterLevel;
        var totalIconsWidth = 0;
        var cellElement;
        var column = this.parent.getColumnByUid(args.column.uid);
        var summaryRow = data.isSummaryRow;
        var frozenColumns = this.parent.getFrozenColumns();
        if (!isNullOrUndefined(data.parentItem)) {
            index = data.parentItem.index;
        }
        else {
            index = data.index;
        }
        var columnIndex;
        var getVirtualColIndexByUid = 'getVirtualColIndexByUid';
        if (this.parent.enableColumnVirtualization && !this.parent.initialRender) {
            columnIndex = this.parent["" + getVirtualColIndexByUid](args.column.uid);
        }
        else {
            columnIndex = grid.getColumnIndexByUid(args.column.uid);
        }
        if (columnIndex === this.parent.treeColumnIndex && (args.requestType === 'add' || args.requestType
            === 'rowDragAndDrop' || args.requestType === 'delete' || isNullOrUndefined(args.cell.querySelector('.e-treecell')))) {
            var container = createElement('div', { className: 'e-treecolumn-container' });
            var emptyExpandIcon = createElement('span', { className: 'e-icons e-none' });
            emptyExpandIcon.style.width = '10px';
            emptyExpandIcon.style.display = 'inline-block';
            for (var n = 0; n < pad; n++) {
                totalIconsWidth += 10;
                container.appendChild(emptyExpandIcon.cloneNode());
            }
            var iconRequired = !isNullOrUndefined(data.hasFilteredChildRecords)
                ? data.hasFilteredChildRecords : data.hasChildRecords;
            if (iconRequired && !isNullOrUndefined(data.childRecords)) {
                if (this.parent['isFromGantt'] && this.parent.loadChildOnDemand) {
                    iconRequired = data.hasChildRecords;
                }
                else {
                    iconRequired = !(data.childRecords.length === 0);
                }
            }
            if (iconRequired) {
                addClass([args.cell], 'e-treerowcell');
                args.cell.setAttribute('aria-expanded', data.expanded ? 'true' : 'false');
                var expandIcon = createElement('span', { className: 'e-icons' });
                var expand = void 0;
                if (this.parent.initialRender) {
                    expand = data.expanded &&
                        (isNullOrUndefined(data[this.parent.expandStateMapping]) || data[this.parent.expandStateMapping]) &&
                        !this.parent.enableCollapseAll;
                }
                else {
                    expand = !(!data.expanded || !getExpandStatus(this.parent, data, this.parent.grid.getCurrentViewRecords()));
                }
                addClass([expandIcon], (expand) ? 'e-treegridexpand' : 'e-treegridcollapse');
                totalIconsWidth += 18;
                container.appendChild(expandIcon);
                emptyExpandIcon.style.width = '4px';
                totalIconsWidth += 7;
                container.appendChild(emptyExpandIcon.cloneNode());
            }
            else if (pad || !pad && !data.level) {
                // icons width
                totalIconsWidth += 20;
                container.appendChild(emptyExpandIcon.cloneNode());
                container.appendChild(emptyExpandIcon.cloneNode());
            }
            //should add below code when paging funcitonality implemented
            // if (data.hasChildRecords) {
            //     addClass([expandIcon], data.expanded ? 'e-treegridexpand' : 'e-treegridcollapse');
            // }
            cellElement = createElement('span', { className: 'e-treecell' });
            if (this.parent.allowTextWrap) {
                cellElement.style.width = 'Calc(100% - ' + totalIconsWidth + 'px)';
            }
            addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            this.updateTreeCell(args, cellElement);
            container.appendChild(cellElement);
            args.cell.appendChild(container);
        }
        else if (this.templateResult) {
            this.templateResult = null;
        }
        var freeze = (grid.getFrozenLeftColumnsCount() > 0 || grid.getFrozenRightColumnsCount() > 0) ? true : false;
        if (!freeze) {
            if (frozenColumns > this.parent.treeColumnIndex && frozenColumns > 0 &&
                grid.getColumnIndexByUid(args.column.uid) === frozenColumns) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
            else if (frozenColumns < this.parent.treeColumnIndex && frozenColumns > 0 &&
                (grid.getColumnIndexByUid(args.column.uid) === frozenColumns
                    || grid.getColumnIndexByUid(args.column.uid) === frozenColumns - 1)) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
            else if (frozenColumns === this.parent.treeColumnIndex && frozenColumns > 0 &&
                grid.getColumnIndexByUid(args.column.uid) === this.parent.treeColumnIndex - 1) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
        }
        else {
            var freezerightColumns = grid.getFrozenRightColumns();
            var freezeLeftColumns = grid.getFrozenLeftColumns();
            var movableColumns = grid.getMovableColumns();
            if ((freezerightColumns.length > 0) && freezerightColumns[0].field === args.column.field) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
            else if ((freezeLeftColumns.length > 0) && freezeLeftColumns[0].field === args.column.field) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
            else if ((movableColumns.length > 0) && movableColumns[0].field === args.column.field) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
        }
        if (!isNullOrUndefined(column) && column.showCheckbox) {
            this.parent.notify('columnCheckbox', args);
            if (this.parent.allowTextWrap) {
                var checkboxElement = args.cell.querySelectorAll('.e-frame')[0];
                var width = parseInt(checkboxElement.style.width, 16);
                totalIconsWidth += width;
                totalIconsWidth += 10;
                if (grid.getColumnIndexByUid(args.column.uid) === this.parent.treeColumnIndex) {
                    cellElement = args.cell.querySelector('.e-treecell');
                }
                else {
                    cellElement = args.cell.querySelector('.e-treecheckbox');
                }
                cellElement.style.width = 'Calc(100% - ' + totalIconsWidth + 'px)';
            }
        }
        if (summaryRow) {
            addClass([args.cell], 'e-summarycell');
            var summaryData = getObject(args.column.field, args.data);
            summaryData = isNullOrUndefined(summaryData) ? null : summaryData;
            if (args.cell.querySelector('.e-treecell') != null) {
                args.cell.querySelector('.e-treecell').innerHTML = summaryData;
            }
            else {
                if (args.column.template) {
                    args.cell.innerHTML = null;
                }
                else {
                    args.cell.innerHTML = summaryData;
                }
            }
        }
        this.parent['args'] = args;
        var columnModel = getValue('columnModel', this.parent);
        var treeColumn = columnModel[this.parent.treeColumnIndex];
        if ((isNullOrUndefined(this.parent.rowTemplate) && !(this.parent.isReact))
            || ((this.parent.isReact) &&
                !args.column['template'])) {
            this.parent.trigger(queryCellInfo, args);
        }
        else if (((this.parent.isReact) &&
            treeColumn.field !== args.column.field)) {
            var renderReactTemplates = 'renderReactTemplates';
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var thisRef_2 = this;
            // tslint:disable-next-line:typedef
            thisRef_2.parent["" + renderReactTemplates](function () {
                thisRef_2.parent.trigger(queryCellInfo, args);
            });
        }
    };
    Render.prototype.updateTreeCell = function (args, cellElement) {
        var columnModel = getValue('columnModel', this.parent);
        var treeColumn = columnModel[this.parent.treeColumnIndex];
        var templateFn = 'templateFn';
        var colindex = args.column.index;
        if (isNullOrUndefined(treeColumn.field)) {
            args.cell.setAttribute('aria-colindex', (colindex + 1) + '');
        }
        if (treeColumn.field === args.column.field && !isNullOrUndefined(treeColumn.template)) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            args.column.template = treeColumn.template;
            args.column["" + templateFn] = templateCompiler(args.column.template);
            args.cell.classList.add('e-templatecell');
        }
        var textContent = args.cell.querySelector('.e-treecell') != null ?
            args.cell.querySelector('.e-treecell').innerHTML : args.cell.innerHTML;
        if (typeof (args.column.template) === 'object' && this.templateResult) {
            appendChildren(cellElement, this.templateResult);
            this.templateResult = null;
            args.cell.innerHTML = '';
        }
        else if (args.cell.classList.contains('e-templatecell')) {
            var len = args.cell.children.length;
            var tempID = this.parent.element.id + args.column.uid;
            if (treeColumn.field === args.column.field && !isNullOrUndefined(treeColumn.template)) {
                var portals = 'portals';
                var renderReactTemplates = 'renderReactTemplates';
                if (this.parent.isReact && typeof (args.column.template) !== 'string') {
                    args.column["" + templateFn](args.data, this.parent, 'columnTemplate', tempID, null, null, cellElement);
                    if (isNullOrUndefined(this.parent.grid["" + portals])) {
                        this.parent.grid["" + portals] = this.parent["" + portals];
                    }
                    this.parent.notify('renderReactTemplate', this.parent["" + portals]);
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    var thisRef_3 = this;
                    // tslint:disable-next-line:typedef
                    thisRef_3.parent["" + renderReactTemplates](function () {
                        thisRef_3.parent.trigger(queryCellInfo, args);
                    });
                }
                else {
                    var str = 'isStringTemplate';
                    var result = args.column["" + templateFn](extend({ 'index': '' }, args.data), this.parent, 'template', tempID, this.parent["" + str]);
                    appendChildren(cellElement, result);
                }
                delete args.column.template;
                delete args.column["" + templateFn];
                args.cell.innerHTML = '';
            }
            else {
                for (var i = 0; i < len; len = args.cell.children.length) {
                    cellElement.appendChild(args.cell.children[parseInt(i.toString(), 10)]);
                }
            }
        }
        else {
            cellElement.innerHTML = textContent;
            args.cell.innerHTML = '';
        }
    };
    /**
     * @param {string} columnUid - Defines column uid
     * @returns {void}
     * @hidden
     */
    Render.prototype.refreshReactColumnTemplateByUid = function (columnUid) {
        var _this = this;
        if (this.parent.isReact) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.parent.clearTemplate(['columnTemplate'], undefined, function () {
                var cells = 'cells';
                var rowIdx = 'index';
                var rowsObj = _this.parent.grid.getRowsObject();
                var rows = _this.parent.getDataRows();
                var indent = _this.parent.grid.getIndentCount();
                var cellIndex = _this.parent.grid.getNormalizedColumnIndex(columnUid);
                if (rows.length !== 0) {
                    for (var j = 0; j < rowsObj.length; j++) {
                        if (rowsObj[parseInt(j.toString(), 10)].isDataRow
                            && !isNullOrUndefined(rowsObj[parseInt(j.toString(), 10)].index)) {
                            var cell = rowsObj[parseInt(j.toString(), 10)]["" + cells][parseInt(cellIndex.toString(), 10)];
                            var cellRenderer = new CellRenderer(_this.parent.grid, _this.parent.grid.serviceLocator);
                            var td = rows.length >= rowsObj.length
                                ? _this.parent.getCellFromIndex(rowsObj[parseInt(j.toString(), 10)].index, cellIndex - indent)
                                : rows[rowsObj[parseInt(j.toString(), 10)].index].querySelector('.e-templatecell');
                            cellRenderer.refreshTD(td, cell, rowsObj[parseInt(j.toString(), 10)].data, { index: rowsObj[parseInt(j.toString(), 10)]["" + rowIdx] });
                            var treecell = _this.parent.getRows()[parseInt(j.toString(), 10)]
                                .cells[parseInt(cellIndex.toString(), 10)];
                            _this.cellRender({ data: rowsObj[parseInt(j.toString(), 10)].data, cell: treecell, column: cell.column });
                        }
                    }
                }
            });
        }
    };
    Render.prototype.columnTemplateResult = function (args) {
        this.templateResult = args.template;
    };
    // eslint-disable-next-line
    Render.prototype.reactTemplateRender = function (args, callBack) {
        var renderReactTemplates = 'renderReactTemplates';
        var portals = 'portals';
        this.parent["" + portals] = args;
        this.parent.notify('renderReactTemplate', this.parent["" + portals]);
        this.parent["" + renderReactTemplates](callBack);
    };
    Render.prototype.destroy = function () {
        this.parent.grid.off('template-result', this.columnTemplateResult);
        this.parent.grid.off('reactTemplateRender', this.reactTemplateRender);
    };
    return Render;
}());

/**
 * Internal dataoperations for tree grid
 *
 * @hidden
 */
var DataManipulation = /** @class */ (function () {
    function DataManipulation(grid) {
        this.addedRecords = 'addedRecords';
        this.parent = grid;
        this.parentItems = [];
        this.taskIds = [];
        this.hierarchyData = [];
        this.storedIndex = -1;
        this.sortedData = [];
        this.isSortAction = false;
        this.addEventListener();
        this.dataResults = {};
        this.isSelfReference = !isNullOrUndefined(this.parent.parentIdMapping);
    }
    /**
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.addEventListener = function () {
        this.parent.on('updateRemoteLevel', this.updateParentRemoteData, this);
        this.parent.grid.on('sorting-begin', this.beginSorting, this);
        this.parent.on('updateAction', this.updateData, this);
        this.parent.on(remoteExpand, this.collectExpandingRecs, this);
        this.parent.on('dataProcessor', this.dataProcessor, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(remoteExpand, this.collectExpandingRecs);
        this.parent.off('updateRemoteLevel', this.updateParentRemoteData);
        this.parent.off('updateAction', this.updateData);
        this.parent.off('dataProcessor', this.dataProcessor);
        this.parent.grid.off('sorting-begin', this.beginSorting);
    };
    /**
     * To destroy the dataModule
     *
     * @returns {void}
     * @hidden
     */
    DataManipulation.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @hidden
     * @returns {boolean} -Returns whether remote data binding
     */
    DataManipulation.prototype.isRemote = function () {
        if (!(this.parent.dataSource instanceof DataManager)) {
            return false;
        }
        return true;
        // let gridData:  DataManager = <DataManager>this.parent.dataSource;
        // return gridData.dataSource.offline !== true && gridData.dataSource.url !== undefined;
    };
    /**
     * Function to manipulate datasource
     *
     * @param {Object} data - Provide tree grid datasource to convert to flat data
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.convertToFlatData = function (data) {
        var _this = this;
        this.parent.flatData = (!isNullOrUndefined(data) && Object.keys(data).length === 0
            && !(this.parent.dataSource instanceof DataManager) ?
            this.parent.dataSource : []);
        this.parent.parentData = [];
        if ((isRemoteData(this.parent) && !isOffline(this.parent)) && data instanceof DataManager && !(data instanceof Array)) {
            var dm = this.parent.dataSource;
            if (this.parent.parentIdMapping) {
                this.parent.query = isNullOrUndefined(this.parent.query) ?
                    new Query() : this.parent.query;
                if (this.parent.parentIdMapping) {
                    var filterKey = this.parent.query.params.filter(function (param) { return param.key === 'IdMapping'; });
                    if (this.parent.initialRender && !filterKey.length) {
                        this.parent.query.where(this.parent.parentIdMapping, 'equal', null);
                        this.parent.query.addParams('IdMapping', this.parent.idMapping);
                    }
                }
                if (!this.parent.hasChildMapping) {
                    var qry = this.parent.query.clone();
                    qry.queries = [];
                    qry = qry.select([this.parent.parentIdMapping]);
                    qry.isCountRequired = true;
                    dm.executeQuery(qry).then(function (e) {
                        _this.parentItems = DataUtil.distinct(e.result, _this.parent.parentIdMapping, false);
                        var req;
                        if (e.result) {
                            req = 0;
                        }
                        else {
                            req = 1;
                        }
                        if (req === 0) {
                            setValue('grid.contentModule.isLoaded', true, _this.parent);
                            if (!isNullOrUndefined(_this.zerothLevelData)) {
                                setValue('cancel', false, _this.zerothLevelData);
                                getValue('grid.renderModule', _this.parent).dataManagerSuccess(_this.zerothLevelData);
                                _this.zerothLevelData = null;
                            }
                            _this.parent.grid.hideSpinner();
                        }
                    });
                }
            }
        }
        else if (data instanceof Array) {
            this.convertJSONData(data);
        }
    };
    DataManipulation.prototype.convertJSONData = function (data) {
        this.hierarchyData = [];
        this.taskIds = [];
        if (!this.parent.idMapping) {
            this.hierarchyData = data;
        }
        else {
            var keys = Object.keys(data);
            for (var i = 0; i < keys.length; i++) {
                var tempData = data[parseInt(i.toString(), 10)];
                this.hierarchyData.push(extend$1({}, tempData));
                if (!isNullOrUndefined(tempData[this.parent.idMapping])) {
                    this.taskIds.push(tempData[this.parent.idMapping]);
                }
            }
        }
        if (this.isSelfReference) {
            var selfData = [];
            var mappingData = new DataManager(this.hierarchyData).executeLocal(new Query()
                .group(this.parent.parentIdMapping));
            for (var i = 0; i < mappingData.length; i++) {
                var groupData = mappingData[parseInt(i.toString(), 10)];
                var index = this.taskIds.indexOf(groupData.key);
                if (!isNullOrUndefined(groupData.key)) {
                    if (index > -1) {
                        var childData = (groupData.items);
                        this.hierarchyData[parseInt(index.toString(), 10)][this.parent.childMapping] = childData;
                        continue;
                    }
                }
                selfData.push.apply(selfData, groupData.items);
            }
            this.hierarchyData = this.selfReferenceUpdate(selfData);
        }
        if (!Object.keys(this.hierarchyData).length) {
            var isGantt = 'isGantt';
            var referenceData = !(this.parent.dataSource instanceof DataManager) && this.parent["" + isGantt];
            this.parent.flatData = referenceData ? (this.parent.dataSource) : [];
        }
        else {
            this.createRecords(this.hierarchyData);
        }
        this.storedIndex = -1;
    };
    // private crudActions(): void {
    //   if (this.parent.dataSource instanceof DataManager && (this.parent.dataSource.adaptor instanceof RemoteSaveAdaptor)) {
    //     let oldUpdate: Function = this.parent.dataSource.adaptor.update;
    //     this.parent.dataSource.adaptor.update =
    //         function (dm: DataManager, keyField: string, value: Object, tableName?: string, query?: Query, original?: Object): Object {
    //                value = getPlainData(value);
    //                return oldUpdate.apply(this, [dm, keyField, value, tableName, query, original]);
    //              }
    //   }
    // }
    DataManipulation.prototype.selfReferenceUpdate = function (selfData) {
        var result = [];
        while (this.hierarchyData.length > 0 && selfData.length > 0) {
            var index = selfData.indexOf(this.hierarchyData[0]);
            if (index === -1) {
                this.hierarchyData.shift();
            }
            else {
                result.push(this.hierarchyData.shift());
                selfData.splice(index, 1);
            }
        }
        return result;
    };
    /**
     * Function to update the zeroth level parent records in remote binding
     *
     * @param {BeforeDataBoundArgs} args - contains data before its bounds to tree grid
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.updateParentRemoteData = function (args) {
        var _this = this;
        var actionArgs = 'actionArgs';
        if (isRemoteData(this.parent) && this.parent.enableVirtualization && args["" + actionArgs].requestType === 'virtualscroll') {
            this.parent.hideSpinner();
        }
        var records = args.result;
        if (isRemoteData(this.parent) && this.parent.enableVirtualization && (args["" + actionArgs].requestType === 'virtualscroll' || args["" + actionArgs].action === 'clearFilter' || args["" + actionArgs].searchString === '')) {
            this.parent.query.expands = [];
        }
        if (!this.parent.hasChildMapping && !this.parentItems.length &&
            (this.parent.loadChildOnDemand)) {
            this.zerothLevelData = args;
            setValue('cancel', true, args);
        }
        else {
            if (this.parent.loadChildOnDemand) {
                var index = 0;
                var _loop_1 = function (rec) {
                    if (isCountRequired(this_1.parent) && records[parseInt(rec.toString(), 10)].hasChildRecords &&
                        this_1.parent.initialRender) {
                        records[parseInt(rec.toString(), 10)].expanded = false;
                    }
                    if (isRemoteData(this_1.parent) && this_1.parent.enableVirtualization) {
                        var childRecords_1 = [];
                        var parent_1 = this_1.parent;
                        records.filter(function (e) {
                            if (e["" + parent_1.parentIdMapping] === records[parseInt(rec.toString(), 10)]["" + parent_1.idMapping]) {
                                childRecords_1.push(e);
                            }
                        });
                        if (childRecords_1.length) {
                            records[parseInt(rec.toString(), 10)].expanded = true;
                        }
                        else if (records[parseInt(rec.toString(), 10)].hasChildRecords) {
                            records[parseInt(rec.toString(), 10)].expanded = false;
                        }
                    }
                    if (isNullOrUndefined(records[parseInt(rec.toString(), 10)].index)) {
                        records[parseInt(rec.toString(), 10)].taskData = extend$1({}, records[parseInt(rec.toString(), 10)]);
                        records[parseInt(rec.toString(), 10)].uniqueID = getUid(this_1.parent.element.id + '_data_');
                        setValue('uniqueIDCollection.' + records[parseInt(rec.toString(), 10)].uniqueID, records[parseInt(rec.toString(), 10)], this_1.parent);
                        if (isRemoteData(this_1.parent) && this_1.parent.enableVirtualization && records[parseInt(rec.toString(), 10)]["" + this_1.parent.parentIdMapping] && (isNullOrUndefined(records[parseInt(rec.toString(), 10)].level) || records[parseInt(rec.toString(), 10)].level === 0)) {
                            var parentID_1 = records[parseInt(rec.toString(), 10)]["" + this_1.parent.parentIdMapping];
                            var parentRec = records.find(function (record) { return record["" + _this.parent.idMapping] === parentID_1; });
                            if (parentRec) {
                                records[parseInt(rec.toString(), 10)].level = parentRec.level + 1;
                            }
                        }
                        else {
                            records[parseInt(rec.toString(), 10)].level = 0;
                        }
                        records[parseInt(rec.toString(), 10)].index = index;
                        if ((records[parseInt(rec.toString(), 10)][this_1.parent.hasChildMapping] ||
                            this_1.parentItems.indexOf(records[parseInt(rec.toString(), 10)][this_1.parent.idMapping]) !== -1)) {
                            records[parseInt(rec.toString(), 10)].hasChildRecords = true;
                        }
                        records[parseInt(rec.toString(), 10)].checkboxState = 'uncheck';
                    }
                    index++;
                };
                var this_1 = this;
                for (var rec = 0; rec < records.length; rec++) {
                    _loop_1(rec);
                }
            }
            else {
                var dataResults = 'dataResults';
                var expandRecord = 'expandRecord';
                if (!isNullOrUndefined(records) && !((!this.parent.loadChildOnDemand) && isCountRequired(this.parent) && !isNullOrUndefined(this.parent["" + dataResults]["" + expandRecord])) &&
                    !(isRemoteData(this.parent) && !this.parent.loadChildOnDemand && args["" + actionArgs].isExpandCollapse && this.parent.enableVirtualization)) {
                    this.convertToFlatData(records);
                }
            }
        }
        if (isRemoteData(this.parent) && !this.parent.loadChildOnDemand && args["" + actionArgs].isExpandCollapse && this.parent.enableVirtualization) {
            args.result = records;
        }
        else if (isRemoteData(this.parent) && this.parent.enableVirtualization && this.parent.loadChildOnDemand) {
            args.result = records;
        }
        else {
            args.result = !this.parent.loadChildOnDemand ? this.parent.flatData : records;
        }
        this.UpdateIndexLevel(args.result);
        if (isRemoteData(this.parent) && this.parent.enableVirtualization && !this.parent.loadChildOnDemand
            && this.parent.grid.aggregates.length && this.parent.grid.sortSettings.columns.length === 0
            && this.parent.grid.filterSettings.columns.length === 0 && !this.parent.grid.searchSettings.key.length) {
            var query = 'query';
            var summaryQuery = args["" + query].queries.filter(function (q) { return q.fn === 'onAggregates'; });
            args.result = this.parent.summaryModule.calculateSummaryValue(summaryQuery, this.parent.flatData, true);
        }
        this.parent.notify('updateResults', args);
    };
    /**
     * Updates the index level for the given data array.
     *
     * @param {object[]} data - An array of objects representing the data whose index levels need to be updated.
     * @returns {void}
     */
    DataManipulation.prototype.UpdateIndexLevel = function (data) {
        var i = 0;
        var level = 0;
        data.forEach(function (item) {
            var record = item;
            var parentItem = record.parentItem;
            if (parentItem != null) {
                var parentLevel = parentItem.level;
                record.level = parentLevel + 1;
            }
            else {
                record.level = level;
            }
            record.index = i;
            i++;
        });
    };
    /**
     * Function to manipulate datasource
     *
     * @param {{record: ITreeData, rows: HTMLTableRowElement[], parentRow: HTMLTableRowElement}} rowDetails - Row details for which child rows has to be fetched
     * @param {ITreeData} rowDetails.record - current expanding record
     * @param {HTMLTableRowElement[]} rowDetails.rows - Expanding Row element
     * @param {HTMLTableRowElement} rowDetails.parentRow  - Curent expanding row element
     * @param {boolean} isChild - Specified whether current record is already a child record
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.collectExpandingRecs = function (rowDetails, isChild) {
        var gridRows = this.parent.getRows();
        var name = 'name';
        if (this.parent.rowTemplate) {
            var rows = this.parent.getContentTable().rows;
            gridRows = [].slice.call(rows);
        }
        var childRecord;
        if (rowDetails.rows.length > 0) {
            if (!isChild) {
                rowDetails.record.expanded = true;
            }
            for (var i = 0; i < rowDetails.rows.length; i++) {
                this.parent['toggleRowVisibility'](rowDetails.rows[parseInt(i.toString(), 10)], 'e-childrow-visible');
                if (!this.parent.loadChildOnDemand) {
                    var targetEle = rowDetails.rows[parseInt(i.toString(), 10)].getElementsByClassName('e-treegridcollapse')[0];
                    childRecord = this.parent.rowTemplate ?
                        this.parent.grid.getCurrentViewRecords()[rowDetails.rows[parseInt(i.toString(), 10)].rowIndex] :
                        this.parent.grid.getRowObjectFromUID(rowDetails.rows[parseInt(i.toString(), 10)].getAttribute('data-Uid')).data;
                    if (!isNullOrUndefined(targetEle) && childRecord.expanded) {
                        addClass([targetEle], 'e-treegridexpand');
                        removeClass([targetEle], 'e-treegridcollapse');
                    }
                    var childRows = [];
                    childRows = gridRows.filter(function (r) {
                        return r.querySelector('.e-gridrowindex' + childRecord.index + 'level' + (childRecord.level + 1));
                    });
                    if (childRows.length && childRecord.expanded) {
                        this.collectExpandingRecs({ record: childRecord, rows: childRows, parentRow: rowDetails.parentRow }, true);
                    }
                }
                var expandingTd = rowDetails.rows[parseInt(i.toString(), 10)].querySelector('.e-detailrowcollapse');
                if (!isNullOrUndefined(expandingTd)) {
                    this.parent.grid.detailRowModule.expand(expandingTd);
                }
            }
            this.parent.grid.pageSettings.totalRecordsCount += rowDetails.rows.length;
        }
        else {
            this.fetchRemoteChildData({ action: rowDetails["" + name], record: rowDetails.record, rows: rowDetails.rows, parentRow: rowDetails.parentRow });
        }
    };
    DataManipulation.prototype.fetchRemoteChildData = function (rowDetails) {
        var _this = this;
        var args = { row: rowDetails.parentRow, data: rowDetails.record };
        var dm = this.parent.dataSource;
        var qry = this.parent.grid.getDataModule().generateQuery();
        var clonequries = qry.queries.filter(function (e) { return e.fn !== 'onPage' && e.fn !== 'onWhere'; });
        qry.queries = clonequries;
        qry.isCountRequired = true;
        var idMappingValue = parseInt(rowDetails.record[this.parent.idMapping], 10);
        if (isNaN(idMappingValue)) {
            idMappingValue = rowDetails.record[this.parent.idMapping].toString();
        }
        if (this.parent.enableVirtualization && rowDetails.action === 'remoteExpand') {
            qry.take(this.parent.pageSettings.pageSize);
            var expandDetail = [];
            expandDetail.push('ExpandingAction', idMappingValue.toString());
            qry.expand(expandDetail);
        }
        else if (this.parent.enableVirtualization && rowDetails.action === 'collapse') {
            qry.take(this.parent.grid.pageSettings.pageSize);
            var expandDetail = [];
            expandDetail.push('CollapsingAction', idMappingValue.toString());
            qry.expand(expandDetail);
        }
        qry.where(this.parent.parentIdMapping, 'equal', rowDetails.record[this.parent.idMapping]);
        if (rowDetails.action === 'remoteExpand' && this.parent.grid.filterSettings && this.parent.grid.filterSettings.columns.length) {
            var filterqry = this.parent.grid.getDataModule().generateQuery().queries.filter(function (e) { return e.fn !== 'onPage' && typeof e.e.predicates !== 'undefined'; });
            qry.queries.push(filterqry[0]);
        }
        showSpinner(this.parent.element);
        dm.executeQuery(qry).then(function (e) {
            var remoteExpandedData = 'remoteExpandedData';
            var remoteCollapsedData = 'remoteCollapsedData';
            var level = 'level';
            var datas = _this.parent.grid.currentViewData.slice();
            var inx;
            var idMapping = _this.parent.idMapping;
            if (_this.parent['isGantt'] && _this.parent.loadChildOnDemand && _this.parent.hasChildMapping) {
                for (var i = 0; i < _this.parent.grid.currentViewData.length; i++) {
                    if (rowDetails.record[idMapping] === _this.parent.grid.currentViewData[i][idMapping]) {
                        inx = i;
                        break;
                    }
                }
            }
            else {
                inx = datas.indexOf(rowDetails.record);
            }
            if (_this.parent.enableVirtualization && (rowDetails.action === 'collapse' || rowDetails.action === 'remoteExpand')) {
                datas = [];
                for (var i = 0; i < inx; i++) {
                    datas.push(_this.parent.grid.currentViewData[parseInt(i.toString(), 10)]);
                }
            }
            if (inx === -1) {
                _this.parent.grid.getRowsObject().forEach(function (rows) {
                    if (rows.data.uniqueID === rowDetails.record.uniqueID) {
                        inx = rows.index;
                    }
                });
            }
            var haveChild = getObject('actual.nextLevel', e);
            var result = e.result;
            var resultChildData = [];
            if (rowDetails.action === 'remoteExpand' && _this.parent.grid.filterModule && _this.parent.grid.filterModule['value']) {
                for (var i = 0; i < datas.length; i++) {
                    if (Object.prototype.hasOwnProperty.call(datas[parseInt(i.toString(), 10)], _this.parent.parentIdMapping) && datas[parseInt(i.toString(), 10)]['' + _this.parent.parentIdMapping] !== null && datas[parseInt(i.toString(), 10)].level === 0) {
                        datas.splice(i, 1);
                        i--;
                    }
                }
                for (var i = 0; i < result.length; i++) {
                    if (rowDetails.record['' + _this.parent.idMapping] !== result[parseInt(i.toString(), 10)]['' + _this.parent.idMapping] &&
                        rowDetails.record['' + _this.parent.idMapping] === result[parseInt(i.toString(), 10)]['' + _this.parent.parentIdMapping]) {
                        if (Object.prototype.hasOwnProperty.call(result, i)) {
                            resultChildData.push(result[parseInt(i.toString(), 10)]);
                        }
                    }
                }
                result = resultChildData;
            }
            if (_this.parent.enableVirtualization && rowDetails.action === 'remoteExpand') {
                rowDetails.record.childRecords = [];
                for (var i = 0; i < result.length; i++) {
                    if (rowDetails.record['' + _this.parent.idMapping] !== result[parseInt(i.toString(), 10)]['' + _this.parent.idMapping] &&
                        rowDetails.record['' + _this.parent.idMapping] === result[parseInt(i.toString(), 10)]['' + _this.parent.parentIdMapping] && Object.prototype.hasOwnProperty.call(result, i)) {
                        rowDetails.record.childRecords.push(result[parseInt(i.toString(), 10)]);
                    }
                }
            }
            else {
                rowDetails.record.childRecords = result;
            }
            for (var r = 0; r < result.length; r++) {
                var record = result[parseInt(r.toString(), 10)];
                if (_this.parent.enableVirtualization && record["" + _this.parent.idMapping] === rowDetails.record["" + _this.parent.idMapping] && rowDetails.action === 'remoteExpand') {
                    _this.parent["" + remoteExpandedData].push(rowDetails.record);
                }
                else if (_this.parent.enableVirtualization && record["" + _this.parent.idMapping] === rowDetails.record["" + _this.parent.idMapping] && rowDetails.action === 'collapse') {
                    for (var i = 0; i < _this.parent["" + remoteExpandedData].length; i++) {
                        if (rowDetails.record["" + _this.parent.idMapping] === _this.parent["" + remoteExpandedData][parseInt(i.toString(), 10)]["" + _this.parent.idMapping]) {
                            _this.parent["" + remoteExpandedData].splice(i, 1);
                        }
                    }
                }
                record.taskData = extend$1({}, record);
                if (record["" + _this.parent.parentIdMapping] && _this.parent.enableVirtualization && _this.parent["" + remoteExpandedData].length) {
                    for (var i = 0; i < _this.parent["" + remoteExpandedData].length; i++) {
                        if (record["" + _this.parent.parentIdMapping] === _this.parent["" + remoteExpandedData][parseInt(i.toString(), 10)]["" + _this.parent.idMapping]) {
                            record.level = _this.parent["" + remoteExpandedData][parseInt(i.toString(), 10)]["" + level] + 1;
                            var parentData = _this.parent["" + remoteExpandedData][parseInt(i.toString(), 10)];
                            delete parentData.childRecords;
                            record.parentItem = parentData;
                            record.parentUniqueID = parentData.uniqueID;
                        }
                    }
                }
                else if (_this.parent.enableVirtualization) {
                    if ((record["" + _this.parent.hasChildMapping] ||
                        _this.parentItems.indexOf(record["" + _this.parent.idMapping]) !== -1)
                        && !(haveChild && !haveChild[parseInt(r.toString(), 10)])) {
                        if (isNullOrUndefined(record["" + _this.parent.parentIdMapping])) {
                            record.level = 0;
                            if (rowDetails.action === 'remoteExpand') {
                                record.childRecords = [];
                                record.childRecords = rowDetails.record.childRecords;
                            }
                        }
                        else {
                            record.level = rowDetails.record.level;
                        }
                    }
                    else {
                        var parentData = extend$1({}, rowDetails.record);
                        delete parentData.childRecords;
                        record.parentItem = parentData;
                        record.parentUniqueID = rowDetails.record.uniqueID;
                    }
                }
                else {
                    record.level = rowDetails.record.level + 1;
                    var parentData = extend$1({}, rowDetails.record);
                    delete parentData.childRecords;
                    record.parentItem = parentData;
                    record.parentUniqueID = rowDetails.record.uniqueID;
                }
                if (isNullOrUndefined(record.index) && !isNullOrUndefined(record.parentItem)) {
                    if (record["" + _this.parent.parentIdMapping]) {
                        record.index = record.parentItem.index;
                    }
                }
                record.uniqueID = getUid(_this.parent.element.id + '_data_');
                if (rowDetails.record["" + _this.parent.idMapping] === record["" + _this.parent.idMapping]) {
                    rowDetails.record.uniqueID = record.uniqueID;
                }
                record.checkboxState = 'uncheck';
                if (_this.parent.enableVirtualization && isNullOrUndefined(record.level)) {
                    for (var p = 0; p < _this.parent.grid.currentViewData.length; p++) {
                        if (_this.parent.grid.currentViewData[parseInt(p.toString(), 10)]["" + _this.parent.idMapping] === record["" + _this.parent.parentIdMapping]) {
                            record.level = _this.parent.grid.currentViewData[parseInt(p.toString(), 10)]['level'] + 1;
                        }
                    }
                }
                setValue('uniqueIDCollection.' + record.uniqueID, record, _this.parent);
                // delete result[r].parentItem.childRecords;
                if ((record["" + _this.parent.hasChildMapping] ||
                    _this.parentItems.indexOf(record["" + _this.parent.idMapping]) !== -1)
                    && !(haveChild && !haveChild[parseInt(r.toString(), 10)])) {
                    record.hasChildRecords = true;
                    if (_this.parent.enableVirtualization && !_this.parent.loadChildOnDemand) {
                        for (var i = 0; i < _this.parent["" + remoteCollapsedData].length; i++) {
                            if (record["" + _this.parent.idMapping] === _this.parent["" + remoteCollapsedData][parseInt(i.toString(), 10)]["" + _this.parent.idMapping]) {
                                record.expanded = _this.parent["" + remoteCollapsedData][parseInt(i.toString(), 10)]['expanded'];
                            }
                        }
                        if (rowDetails.action === 'collapse' && record["" + _this.parent.idMapping] !== rowDetails.record["" + _this.parent.idMapping] && record.expanded !== false) {
                            record.expanded = true;
                        }
                        else if (rowDetails.action === 'collapse' && record["" + _this.parent.idMapping] === rowDetails.record["" + _this.parent.idMapping]) {
                            record.expanded = false;
                            _this.parent["" + remoteCollapsedData].push(rowDetails.record);
                        }
                        else if (rowDetails.action === 'remoteExpand') {
                            for (var i = 0; i < _this.parent.grid.currentViewData.length; i++) {
                                if (_this.parent.grid.currentViewData[parseInt(i.toString(), 10)]["" + _this.parent.idMapping] === record["" + _this.parent.idMapping]) {
                                    result.splice(r, 1, _this.parent.grid.currentViewData[parseInt(i.toString(), 10)]);
                                }
                            }
                            if (record[_this.parent.idMapping] === rowDetails.record["" + _this.parent.idMapping]) {
                                for (var i = 0; i < _this.parent["" + remoteCollapsedData].length; i++) {
                                    if (rowDetails.record["" + _this.parent.idMapping] === _this.parent["" + remoteCollapsedData][parseInt(i.toString(), 10)]["" + _this.parent.idMapping]) {
                                        _this.parent["" + remoteCollapsedData].splice(i, 1);
                                    }
                                }
                            }
                            if (record.expanded !== false) {
                                record.expanded = true;
                            }
                        }
                    }
                    else if (_this.parent.enableVirtualization && record["" + _this.parent.idMapping] === rowDetails.record["" + _this.parent.idMapping] && rowDetails.action !== 'collapse') {
                        record.expanded = true;
                    }
                    else if (!(_this.parent.enableVirtualization && !_this.parent.loadChildOnDemand)) {
                        record.expanded = false;
                    }
                }
                datas.splice(inx + r + 1, 0, record);
            }
            setValue('result', datas, e);
            setValue('action', 'beforecontentrender', e);
            _this.parent.trigger(actionComplete, e);
            hideSpinner(_this.parent.element);
            if (_this.parent.grid.aggregates.length > 0 && !_this.parent.enableVirtualization) {
                var gridQuery = getObject('query', e);
                var result_1 = 'result';
                if (isNullOrUndefined(gridQuery)) {
                    gridQuery = getValue('grid.renderModule.data', _this.parent).aggregateQuery(new Query());
                }
                if (!isNullOrUndefined(gridQuery)) {
                    var summaryQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onAggregates'; });
                    e["" + result_1] = _this.parent.summaryModule.calculateSummaryValue(summaryQuery, e["" + result_1], true);
                }
            }
            if (rowDetails.action === 'remoteExpand' && _this.parent.allowPaging && _this.parent.pageSettings.pageSizeMode === 'All') {
                _this.parent.grid.pageSettings.totalRecordsCount = _this.parent.grid.pageSettings.totalRecordsCount + result.length;
            }
            if (_this.parent.enableVirtualization) {
                _this.parent.grid.pageSettings.totalRecordsCount = e.count;
            }
            e.count = _this.parent.grid.pageSettings.totalRecordsCount;
            var virtualArgs = {};
            if (_this.parent.enableVirtualization) {
                _this.remoteVirtualAction(virtualArgs);
            }
            var notifyArgs = { index: inx, childData: result };
            if (_this.parent.enableInfiniteScrolling) {
                _this.parent.notify('infinite-remote-expand', notifyArgs);
            }
            else {
                getValue('grid.renderModule', _this.parent).dataManagerSuccess(e, virtualArgs);
            }
            _this.parent.trigger(expanded, args);
        });
    };
    DataManipulation.prototype.remoteVirtualAction = function (virtualArgs) {
        virtualArgs.requestType = 'refresh';
        setValue('isExpandCollapse', true, virtualArgs);
        var contentModule = getValue('grid.contentModule', this.parent);
        var currentInfo = getValue('currentInfo', contentModule);
        var prevInfo = getValue('prevInfo', contentModule);
        if (currentInfo.loadNext && this.parent.grid.pageSettings.currentPage === currentInfo.nextInfo.page) {
            this.parent.grid.pageSettings.currentPage = prevInfo.page;
        }
    };
    DataManipulation.prototype.beginSorting = function () {
        this.isSortAction = true;
        if (isRemoteData(this.parent) && this.parent.enableVirtualization) {
            var index = this.parent.query.queries.indexOf(this.parent.query.queries.filter(function (q) { return q.fn === 'onSortBy'; })[0]);
            if (index !== -1) {
                this.parent.query.queries.splice(index, 1);
            }
            if (this.parent.grid.sortSettings.columns.length === 0) {
                this.parent.query.sortBy(null, null);
            }
        }
    };
    DataManipulation.prototype.createRecords = function (data, parentRecords) {
        var treeGridData = [];
        var keys = Object.keys(data);
        for (var i = 0, len = keys.length; i < len; i++) {
            var currentData = extend$1({}, data[parseInt(i.toString(), 10)]);
            currentData.taskData = data[parseInt(i.toString(), 10)];
            var level = 0;
            this.storedIndex++;
            if (!Object.prototype.hasOwnProperty.call(currentData, 'index')) {
                currentData.index = this.storedIndex;
            }
            var childMapping = currentData[this.parent.childMapping];
            var hasChildren = !isNullOrUndefined(childMapping) && childMapping.length > 0;
            var shouldCount = isCountRequired(this.parent);
            var hasChildMapping = currentData[this.parent.hasChildMapping];
            if ((hasChildren && !shouldCount) || (hasChildMapping && shouldCount)) {
                currentData.hasChildRecords = true;
            }
            else {
                currentData.hasChildRecords = false;
            }
            if ((!isNullOrUndefined(childMapping) && !shouldCount) ||
                (hasChildMapping) && shouldCount) {
                if (this.parent.enableCollapseAll || !isNullOrUndefined(this.parent.dataStateChange)
                    && isNullOrUndefined(childMapping)) {
                    currentData.expanded = false;
                }
                else {
                    currentData.expanded = !isNullOrUndefined(currentData[this.parent.expandStateMapping])
                        ? currentData[this.parent.expandStateMapping] : true;
                }
            }
            if (!Object.prototype.hasOwnProperty.call(currentData, 'index')) {
                currentData.index = currentData.hasChildRecords ? this.storedIndex : this.storedIndex;
            }
            if (this.isSelfReference && isNullOrUndefined(currentData[this.parent.parentIdMapping])) {
                this.parent.parentData.push(currentData);
            }
            currentData.uniqueID = getUid(this.parent.element.id + '_data_');
            setValue('uniqueIDCollection.' + currentData.uniqueID, currentData, this.parent);
            if (!isNullOrUndefined(parentRecords)) {
                var parentData = extend$1({}, parentRecords);
                delete parentData.childRecords;
                delete parentData[this.parent.childMapping];
                if (this.isSelfReference) {
                    delete parentData.taskData[this.parent.childMapping];
                }
                currentData.parentItem = parentData;
                currentData.parentUniqueID = parentData.uniqueID;
                level = parentRecords.level + 1;
            }
            if (!Object.prototype.hasOwnProperty.call(currentData, 'level')) {
                currentData.level = level;
            }
            currentData.checkboxState = 'uncheck';
            var remoteCollapsedData = 'remoteCollapsedData';
            if (this.parent.enableVirtualization && !this.parent.loadChildOnDemand && isRemoteData(this.parent)
                && !this.parent.initialRender) {
                if (!currentData.hasChildRecords && isNullOrUndefined(currentData["" + this.parent.parentIdMapping])) {
                    currentData.hasChildRecords = true;
                    for (var c = 0; c < this.parent["" + remoteCollapsedData].length; c++) {
                        if (this.parent["" + remoteCollapsedData][parseInt(c.toString(), 10)]["" + this.parent.idMapping] === currentData["" + this.parent.idMapping]) {
                            currentData.expanded = false;
                        }
                    }
                }
                else if (currentData.level === 0 && isNullOrUndefined(parentRecords) && !currentData.hasChildRecords) {
                    currentData.level = currentData.level + 1;
                }
                if (currentData["" + this.parent.hasChildMapping] && !isNullOrUndefined(currentData["" + this.parent.expandStateMapping])) {
                    currentData.expanded = currentData["" + this.parent.expandStateMapping];
                    currentData.hasChildRecords = true;
                }
                this.parent.flatData.push(currentData);
            }
            else if (isNullOrUndefined(currentData["" + this.parent.parentIdMapping]) || currentData.parentItem) {
                if (!isNullOrUndefined(this.parent.rowDropSettings.targetID)) {
                    if (!this.parent.rowDragAndDropModule['isDuplicateData'](currentData)) {
                        this.parent.flatData.push(currentData);
                    }
                }
                else {
                    this.parent.flatData.push(currentData);
                }
                this.parent['infiniteScrollData'].push(currentData);
            }
            if (!this.isSelfReference && currentData.level === 0) {
                this.parent.parentData.push(currentData);
            }
            if (!isNullOrUndefined(currentData[this.parent.childMapping] && currentData[this.parent.childMapping].length)) {
                var record = this.createRecords(currentData[this.parent.childMapping], currentData);
                currentData.childRecords = record;
            }
            treeGridData.push(currentData);
        }
        return treeGridData;
    };
    /**
     * Function to perform filtering/sorting action for local data
     *
     * @param {BeforeDataBoundArgs} args - data details to be processed before binding to grid
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.dataProcessor = function (args) {
        var isExport = getObject('isExport', args);
        var expresults = getObject('expresults', args);
        var exportType = getObject('exportType', args);
        var isPrinting = getObject('isPrinting', args);
        var dataObj;
        var actionArgs = getObject('actionArgs', args);
        var requestType = getObject('requestType', args);
        var actionData = getObject('data', args);
        var action = getObject('action', args);
        var actionAddArgs = actionArgs;
        var primaryKeyColumnName = this.parent.getPrimaryKeyFieldNames()[0];
        var dataValue = getObject('data', actionAddArgs);
        if ((!isNullOrUndefined(actionAddArgs)) && (!isNullOrUndefined(actionAddArgs.action)) && (actionAddArgs.action === 'add')
            && (!isNullOrUndefined(actionAddArgs.data)) && isNullOrUndefined(actionAddArgs.data["" + primaryKeyColumnName])) {
            actionAddArgs.data["" + primaryKeyColumnName] = args.result[actionAddArgs.index]["" + primaryKeyColumnName];
            dataValue.taskData["" + primaryKeyColumnName] = args.result[actionAddArgs.index]["" + primaryKeyColumnName];
        }
        if ((!isNullOrUndefined(actionArgs) && Object.keys(actionArgs).length) || requestType === 'save') {
            requestType = requestType ? requestType : actionArgs.requestType;
            actionData = actionData ? actionData : getObject('data', actionArgs);
            action = action ? action : getObject('action', actionArgs);
            if (this.parent.editSettings.mode === 'Batch') {
                this.batchChanges = this.parent.grid.editModule.getBatchChanges();
            }
            if (this.parent.isLocalData) {
                this.updateAction(actionData, action, requestType);
            }
        }
        if (isExport && !isNullOrUndefined(expresults)) {
            dataObj = expresults;
        }
        else {
            dataObj = isCountRequired(this.parent) ? getValue('result', this.parent.grid.dataSource)
                : this.parent.grid.dataSource;
        }
        var results = dataObj instanceof DataManager ? dataObj.dataSource.json : dataObj;
        var count = isCountRequired(this.parent) ? getValue('count', this.parent.dataSource)
            : results.length;
        var qry = new Query();
        var gridQuery = getObject('query', args);
        var filterQuery;
        var searchQuery;
        if (!isNullOrUndefined(gridQuery)) {
            filterQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onWhere'; });
            searchQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onSearch'; });
        }
        if ((this.parent.grid.allowFiltering && this.parent.grid.filterSettings.columns.length) ||
            (this.parent.grid.searchSettings.key.length > 0) || (!isNullOrUndefined(gridQuery) &&
            (filterQuery.length || searchQuery.length) && this.parent.isLocalData)) {
            if (isNullOrUndefined(gridQuery)) {
                gridQuery = new Query();
                gridQuery = getValue('grid.renderModule.data', this.parent).filterQuery(gridQuery);
                gridQuery = getValue('grid.renderModule.data', this.parent).searchQuery(gridQuery);
            }
            var fltrQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onWhere'; });
            var srchQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onSearch'; });
            qry.queries = fltrQuery.concat(srchQuery);
            var filteredData = new DataManager(results).executeLocal(qry);
            this.parent.notify('updateFilterRecs', { data: filteredData });
            results = this.dataResults.result;
            this.dataResults.result = null;
            if (this.parent.grid.aggregates.length > 0) {
                var query = getObject('query', args);
                if (isNullOrUndefined(gridQuery)) {
                    gridQuery = getValue('grid.renderModule.data', this.parent).aggregateQuery(new Query());
                }
                if (!isNullOrUndefined(query)) {
                    var summaryQuery = query.queries.filter(function (q) { return q.fn === 'onAggregates'; });
                    results = this.parent.summaryModule.calculateSummaryValue(summaryQuery, results, true);
                }
            }
        }
        if (this.parent.grid.aggregates.length && this.parent.grid.sortSettings.columns.length === 0
            && this.parent.grid.filterSettings.columns.length === 0 && !this.parent.grid.searchSettings.key.length) {
            var gridQuery_1 = getObject('query', args);
            if (isNullOrUndefined(gridQuery_1)) {
                gridQuery_1 = getValue('grid.renderModule.data', this.parent).aggregateQuery(new Query());
            }
            var summaryQuery = gridQuery_1.queries.filter(function (q) { return q.fn === 'onAggregates'; });
            results = this.parent.summaryModule.calculateSummaryValue(summaryQuery, this.parent.flatData, true);
        }
        if (this.parent.grid.sortSettings.columns.length > 0 || this.isSortAction) {
            this.isSortAction = false;
            var parentData = this.parent.parentData;
            var query = getObject('query', args);
            var srtQry = new Query();
            for (var srt = this.parent.grid.sortSettings.columns.length - 1; srt >= 0; srt--) {
                var getColumnByField = 'getColumnByField';
                var col = this.parent.grid.renderModule.data["" + getColumnByField](this.parent.grid.
                    sortSettings.columns[parseInt(srt.toString(), 10)].field);
                var compFun = col.sortComparer && isOffline(this.parent) ?
                    col.sortComparer.bind(col) :
                    this.parent.grid.sortSettings.columns[parseInt(srt.toString(), 10)].direction;
                srtQry.sortBy(this.parent.grid.sortSettings.columns[parseInt(srt.toString(), 10)].field, compFun);
            }
            var modifiedData = new DataManager(parentData).executeLocal(srtQry);
            if (this.parent.allowRowDragAndDrop && !isNullOrUndefined(this.parent.rowDragAndDropModule['draggedRecord']) &&
                this.parent.rowDragAndDropModule['droppedRecord'].hasChildRecords && this.parent.rowDragAndDropModule['dropPosition'] !== 'middleSegment') {
                var dragdIndex = modifiedData.indexOf(this.parent.rowDragAndDropModule['draggedRecord']);
                modifiedData.splice(dragdIndex, 1);
                var dropdIndex = modifiedData.indexOf(this.parent.rowDragAndDropModule['droppedRecord']);
                if (this.parent.rowDragAndDropModule['droppedRecord'].hasChildRecords && this.parent.rowDragAndDropModule['dropPosition'] === 'topSegment') {
                    modifiedData.splice(dropdIndex, 0, this.parent.rowDragAndDropModule['draggedRecord']);
                }
                else if (this.parent.rowDragAndDropModule['dropPosition'] === 'bottomSegment') {
                    modifiedData.splice(dropdIndex + 1, 0, this.parent.rowDragAndDropModule['draggedRecord']);
                }
            }
            var sortArgs = { modifiedData: modifiedData, filteredData: results, srtQry: srtQry };
            this.parent.notify('createSort', sortArgs);
            results = sortArgs.modifiedData;
            this.dataResults.result = null;
            this.sortedData = results;
            this.parent.notify('updateModel', {});
            if (this.parent.grid.aggregates.length > 0 && !isNullOrUndefined(query)) {
                var isSort = false;
                var query_1 = getObject('query', args);
                var summaryQuery = query_1.queries.filter(function (q) { return q.fn === 'onAggregates'; });
                results = this.parent.summaryModule.calculateSummaryValue(summaryQuery, this.sortedData, isSort);
            }
        }
        count = isCountRequired(this.parent) ? getValue('count', this.parent.dataSource)
            : results.length;
        var temp = this.paging(results, count, isExport, isPrinting, exportType, args);
        results = temp.result;
        count = temp.count;
        args.result = results;
        args.count = count;
        this.parent.notify('updateResults', args);
    };
    DataManipulation.prototype.paging = function (results, count, isExport, isPrinting, exportType, args) {
        if (this.parent.allowPaging && (!isExport || exportType === 'CurrentPage')
            && (!isPrinting || this.parent.printMode === 'CurrentPage')) {
            this.parent.notify(pagingActions, { result: results, count: count, actionArgs: args });
            results = this.dataResults.result;
            count = isCountRequired(this.parent) ? getValue('count', this.parent.dataSource)
                : this.dataResults.count;
        }
        else if ((this.parent.enableVirtualization || this.parent.enableInfiniteScrolling) && (!isExport || exportType === 'CurrentPage')
            && getValue('requestType', args) !== 'save') {
            var actArgs = this.parent.enableInfiniteScrolling ? args : getValue('actionArgs', args);
            this.parent.notify(pagingActions, { result: results, count: count, actionArgs: actArgs });
            results = this.dataResults.result;
            count = this.dataResults.count;
        }
        var isPdfExport = 'isPdfExport';
        var isCollapsedStatePersist = 'isCollapsedStatePersist';
        if ((isPrinting === true || (args["" + isPdfExport] && (isNullOrUndefined(args["" + isCollapsedStatePersist])
            || args["" + isCollapsedStatePersist]))) && this.parent.printMode === 'AllPages') {
            var actualResults = [];
            for (var i = 0; i < results.length; i++) {
                var expandStatus = getExpandStatus(this.parent, results[parseInt(i.toString(), 10)], this.parent.parentData);
                if (expandStatus) {
                    actualResults.push(results[parseInt(i.toString(), 10)]);
                }
            }
            results = actualResults;
            count = results.length;
        }
        var value = { result: results, count: count };
        return value;
    };
    DataManipulation.prototype.updateData = function (dataResult) {
        this.dataResults = dataResult;
    };
    DataManipulation.prototype.updateAction = function (actionData, action, requestType) {
        if ((requestType === 'delete' || requestType === 'save')) {
            this.parent.notify(crudAction, { value: actionData, action: action || requestType });
        }
        if (requestType === 'batchsave' && this.parent.editSettings.mode === 'Batch') {
            this.parent.notify(batchSave, {});
        }
    };
    return DataManipulation;
}());

/**
 * Defines enumerable toolbar items for programmatic access.
 *
 * @hidden
 */
var ToolbarItem;
(function (ToolbarItem) {
    ToolbarItem[ToolbarItem["Add"] = 0] = "Add";
    ToolbarItem[ToolbarItem["Edit"] = 1] = "Edit";
    ToolbarItem[ToolbarItem["Update"] = 2] = "Update";
    ToolbarItem[ToolbarItem["Delete"] = 3] = "Delete";
    ToolbarItem[ToolbarItem["Cancel"] = 4] = "Cancel";
    ToolbarItem[ToolbarItem["Search"] = 5] = "Search";
    ToolbarItem[ToolbarItem["ExpandAll"] = 6] = "ExpandAll";
    ToolbarItem[ToolbarItem["CollapseAll"] = 7] = "CollapseAll";
    ToolbarItem[ToolbarItem["ExcelExport"] = 8] = "ExcelExport";
    ToolbarItem[ToolbarItem["PdfExport"] = 9] = "PdfExport";
    ToolbarItem[ToolbarItem["CsvExport"] = 10] = "CsvExport";
    ToolbarItem[ToolbarItem["Print"] = 11] = "Print";
    ToolbarItem[ToolbarItem["RowIndent"] = 12] = "RowIndent";
    ToolbarItem[ToolbarItem["RowOutdent"] = 13] = "RowOutdent";
})(ToolbarItem || (ToolbarItem = {}));
/**
 * Enumerates detailed context menu items used for menu configurations.
 *
 * @hidden
 */
var ContextMenuItems;
(function (ContextMenuItems) {
    ContextMenuItems[ContextMenuItems["AutoFit"] = 0] = "AutoFit";
    ContextMenuItems[ContextMenuItems["AutoFitAll"] = 1] = "AutoFitAll";
    ContextMenuItems[ContextMenuItems["SortAscending"] = 2] = "SortAscending";
    ContextMenuItems[ContextMenuItems["SortDescending"] = 3] = "SortDescending";
    ContextMenuItems[ContextMenuItems["Edit"] = 4] = "Edit";
    ContextMenuItems[ContextMenuItems["Delete"] = 5] = "Delete";
    ContextMenuItems[ContextMenuItems["Save"] = 6] = "Save";
    ContextMenuItems[ContextMenuItems["Cancel"] = 7] = "Cancel";
    ContextMenuItems[ContextMenuItems["PdfExport"] = 8] = "PdfExport";
    ContextMenuItems[ContextMenuItems["ExcelExport"] = 9] = "ExcelExport";
    ContextMenuItems[ContextMenuItems["CsvExport"] = 10] = "CsvExport";
    ContextMenuItems[ContextMenuItems["FirstPage"] = 11] = "FirstPage";
    ContextMenuItems[ContextMenuItems["PrevPage"] = 12] = "PrevPage";
    ContextMenuItems[ContextMenuItems["LastPage"] = 13] = "LastPage";
    ContextMenuItems[ContextMenuItems["NextPage"] = 14] = "NextPage";
    ContextMenuItems[ContextMenuItems["AddRow"] = 15] = "AddRow";
    ContextMenuItems[ContextMenuItems["RowIndent"] = 16] = "RowIndent";
    ContextMenuItems[ContextMenuItems["RowOutdent"] = 17] = "RowOutdent";
})(ContextMenuItems || (ContextMenuItems = {}));

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the paging behavior of the TreeGrid, enabling you to manage and display data efficiently across multiple pages.
 */
var PageSettings = /** @class */ (function (_super) {
    __extends$8(PageSettings, _super);
    function PageSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$6([
        Property(12)
    ], PageSettings.prototype, "pageSize", void 0);
    __decorate$6([
        Property(8)
    ], PageSettings.prototype, "pageCount", void 0);
    __decorate$6([
        Property(1)
    ], PageSettings.prototype, "currentPage", void 0);
    __decorate$6([
        Property()
    ], PageSettings.prototype, "totalRecordsCount", void 0);
    __decorate$6([
        Property(false)
    ], PageSettings.prototype, "enableQueryString", void 0);
    __decorate$6([
        Property(false)
    ], PageSettings.prototype, "pageSizes", void 0);
    __decorate$6([
        Property(null)
    ], PageSettings.prototype, "template", void 0);
    __decorate$6([
        Property('All')
    ], PageSettings.prototype, "pageSizeMode", void 0);
    return PageSettings;
}(ChildProperty));

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the aggregate column for the TreeGrid.
 */
var AggregateColumn = /** @class */ (function (_super) {
    __extends$9(AggregateColumn, _super);
    function AggregateColumn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.intl = new Internationalization();
        _this.templateFn = {};
        return _this;
    }
    /**
     * Custom format function
     *
     * @hidden
     * @param {string} cultureName - culture name to format
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    AggregateColumn.prototype.setFormatter = function (cultureName) {
        if (this.format && (this.format.skeleton || this.format.format)) {
            this.formatFn = this.getFormatFunction(this.format);
        }
    };
    /**
     * @param {NumberFormatOptions | DateFormatOptions} format - formatting options for number and date values
     * @hidden
     * @returns {Function} - return formatter function
     */
    AggregateColumn.prototype.getFormatFunction = function (format) {
        if (format.type) {
            return this.intl.getDateFormat(format);
        }
        else {
            return this.intl.getNumberFormat(format);
        }
    };
    /**
     * @hidden
     * @returns {Function} - Returns formatter function
     */
    AggregateColumn.prototype.getFormatter = function () {
        return this.formatFn;
    };
    /**
     * @param {Object} helper - Specified the helper
     * @hidden
     * @returns {void}
     */
    AggregateColumn.prototype.setTemplate = function (helper) {
        if (helper === void 0) { helper = {}; }
        if (this.footerTemplate !== undefined) {
            this.templateFn[getEnumValue(CellType, CellType.Summary)] = { fn: compile(this.footerTemplate, helper),
                property: 'footerTemplate' };
        }
    };
    /**
     * @param {CellType} type - specifies the cell type
     * @returns {Object} returns the object
     * @hidden
     */
    AggregateColumn.prototype.getTemplate = function (type) {
        return this.templateFn[getEnumValue(CellType, type)];
    };
    /**
     * @param {Object} prop - updates aggregate properties without change detection
     * @hidden
     * @returns {void}
     */
    AggregateColumn.prototype.setPropertiesSilent = function (prop) {
        this.setProperties(prop, true);
    };
    __decorate$7([
        Property()
    ], AggregateColumn.prototype, "type", void 0);
    __decorate$7([
        Property()
    ], AggregateColumn.prototype, "footerTemplate", void 0);
    __decorate$7([
        Property()
    ], AggregateColumn.prototype, "field", void 0);
    __decorate$7([
        Property()
    ], AggregateColumn.prototype, "format", void 0);
    __decorate$7([
        Property()
    ], AggregateColumn.prototype, "columnName", void 0);
    __decorate$7([
        Property()
    ], AggregateColumn.prototype, "customAggregate", void 0);
    return AggregateColumn;
}(ChildProperty));
/**
 * Configures the aggregate rows in the TreeGrid.
 */
var AggregateRow = /** @class */ (function (_super) {
    __extends$9(AggregateRow, _super);
    function AggregateRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$7([
        Collection([], AggregateColumn)
    ], AggregateRow.prototype, "columns", void 0);
    __decorate$7([
        Property(true)
    ], AggregateRow.prototype, "showChildSummary", void 0);
    return AggregateRow;
}(ChildProperty));

var __extends$a = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the edit behavior of the TreeGrid, defining how records can be added, modified, or deleted.
 */
var EditSettings = /** @class */ (function (_super) {
    __extends$a(EditSettings, _super);
    function EditSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$8([
        Property(false)
    ], EditSettings.prototype, "allowAdding", void 0);
    __decorate$8([
        Property(false)
    ], EditSettings.prototype, "allowEditing", void 0);
    __decorate$8([
        Property(false)
    ], EditSettings.prototype, "allowDeleting", void 0);
    __decorate$8([
        Property('Cell')
    ], EditSettings.prototype, "mode", void 0);
    __decorate$8([
        Property('Top')
    ], EditSettings.prototype, "newRowPosition", void 0);
    __decorate$8([
        Property(true)
    ], EditSettings.prototype, "allowEditOnDblClick", void 0);
    __decorate$8([
        Property(true)
    ], EditSettings.prototype, "showConfirmDialog", void 0);
    __decorate$8([
        Property(false)
    ], EditSettings.prototype, "showDeleteConfirmDialog", void 0);
    __decorate$8([
        Property('')
    ], EditSettings.prototype, "template", void 0);
    __decorate$8([
        Property({})
    ], EditSettings.prototype, "dialog", void 0);
    __decorate$8([
        Property(false)
    ], EditSettings.prototype, "allowNextRowEdit", void 0);
    return EditSettings;
}(ChildProperty));

var __extends$b = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the field name and direction of a sort column in the TreeGrid.
 */
var SortDescriptor = /** @class */ (function (_super) {
    __extends$b(SortDescriptor, _super);
    function SortDescriptor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$9([
        Property()
    ], SortDescriptor.prototype, "field", void 0);
    __decorate$9([
        Property()
    ], SortDescriptor.prototype, "direction", void 0);
    return SortDescriptor;
}(ChildProperty));
/**
 * Configures the sorting behavior of the TreeGrid.
 */
var SortSettings = /** @class */ (function (_super) {
    __extends$b(SortSettings, _super);
    function SortSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$9([
        Collection([], SortDescriptor)
    ], SortSettings.prototype, "columns", void 0);
    __decorate$9([
        Property(true)
    ], SortSettings.prototype, "allowUnsort", void 0);
    return SortSettings;
}(ChildProperty));

/**
 * Performs CRUD update to Tree Grid data source
 *
 * @param {{value: ITreeData, action: string }} details - Gets modified record value and CRUD action type
 * @param {TreeGrid} details.value - Gets modified record value
 * @param {string} details.action - CRUD action type
 * @param {TreeGrid} control - Tree Grid instance
 * @param {boolean} isSelfReference - Denotes whether Self Referential data binding
 * @param {number} addRowIndex - New add row index
 * @param {number} selectedIndex - Selected Row index
 * @param {string} columnName - Column field name
 * @param {ITreeData} addRowRecord - Newly added record
 * @returns {void}
 */
function editAction(details, control, isSelfReference, addRowIndex, selectedIndex, columnName, addRowRecord) {
    var value = details.value;
    var action = details.action;
    var changedRecords = 'changedRecords';
    var i;
    var j;
    var addedRecords = 'addedRecords';
    var batchChanges;
    var key = control.grid.getPrimaryKeyFieldNames()[0];
    var treeData = control.dataSource instanceof DataManager ?
        control.dataSource.dataSource.json : control.dataSource;
    var modifiedData = [];
    var originalData = value;
    var isSkip = false;
    if (control.editSettings.mode === 'Batch') {
        batchChanges = control.grid.editModule.getBatchChanges();
    }
    if (action === 'add' || (action === 'batchsave' && (control.editSettings.mode === 'Batch'
        && batchChanges["" + addedRecords].length))) {
        var addAct = addAction(details, treeData, control, isSelfReference, addRowIndex, selectedIndex, addRowRecord);
        value = addAct.value;
        isSkip = addAct.isSkip;
    }
    if (value instanceof Array) {
        modifiedData = extendArray(value);
    }
    else {
        modifiedData.push(extend$1({}, value));
    }
    if (!isSkip && (action !== 'add' ||
        (control.editSettings.newRowPosition !== 'Top' && control.editSettings.newRowPosition !== 'Bottom'))) {
        for (var k = 0; k < modifiedData.length; k++) {
            if (typeof (modifiedData[parseInt(k.toString(), 10)]["" + key]) === 'object') {
                modifiedData[parseInt(k.toString(), 10)] = modifiedData[parseInt(k.toString(), 10)]["" + key];
            }
            var keys = modifiedData[parseInt(k.toString(), 10)].taskData ?
                Object.keys(modifiedData[parseInt(k.toString(), 10)].taskData) :
                Object.keys(modifiedData[parseInt(k.toString(), 10)]);
            i = treeData.length;
            var _loop_1 = function () {
                if (treeData[parseInt(i.toString(), 10)]["" + key] === modifiedData[parseInt(k.toString(), 10)]["" + key]) {
                    if (action === 'delete') {
                        var currentData_1 = treeData[parseInt(i.toString(), 10)];
                        treeData.splice(i, 1);
                        if (isSelfReference) {
                            if (!isNullOrUndefined(currentData_1["" + control.parentIdMapping])) {
                                var parentData = control.flatData.filter(function (e) {
                                    return e["" + control.idMapping] === currentData_1["" + control.parentIdMapping];
                                })[0];
                                var childRecords = parentData ? parentData["" + control.childMapping] : [];
                                for (var p = childRecords.length - 1; p >= 0; p--) {
                                    if (childRecords[parseInt(p.toString(), 10)]["" + control.idMapping] === currentData_1["" + control.idMapping]) {
                                        if (!control.enableImmutableMode && parentData.childRecords.length === parentData['Children'].length) {
                                            parentData['childRecords'].splice(p, 1);
                                        }
                                        childRecords.splice(p, 1);
                                        if (!childRecords.length) {
                                            parentData.hasChildRecords = false;
                                            updateParentRow(key, parentData, action, control, isSelfReference);
                                        }
                                        break;
                                    }
                                }
                            }
                            return "break";
                        }
                    }
                    else {
                        if (action === 'edit') {
                            for (j = 0; j < keys.length; j++) {
                                if (Object.prototype.hasOwnProperty.call(treeData[parseInt(i.toString(), 10)], keys[parseInt(j.toString(), 10)]) && ((control.editSettings.mode !== 'Cell'
                                    || (!isNullOrUndefined(batchChanges) && batchChanges["" + changedRecords].length === 0))
                                    || keys[parseInt(j.toString(), 10)] === columnName)) {
                                    var editedData = getParentData(control, modifiedData[parseInt(k.toString(), 10)].uniqueID);
                                    treeData[parseInt(i.toString(), 10)][keys[parseInt(j.toString(), 10)]] =
                                        modifiedData[parseInt(k.toString(), 10)][keys[parseInt(j.toString(), 10)]];
                                    if (editedData && editedData.taskData) {
                                        editedData.taskData[keys[parseInt(j.toString(), 10)]] = editedData[keys[parseInt(j.toString(), 10)]]
                                            = treeData[parseInt(i.toString(), 10)][keys[parseInt(j.toString(), 10)]];
                                    }
                                }
                            }
                        }
                        else if (action === 'add' || action === 'batchsave') {
                            var index = void 0;
                            if (control.editSettings.newRowPosition === 'Child') {
                                if (isSelfReference) {
                                    originalData.taskData["" + control.parentIdMapping] = treeData[parseInt(i.toString(), 10)]["" + control.idMapping];
                                    treeData.splice(i + 1, 0, originalData.taskData);
                                }
                                else {
                                    if (!Object.prototype.hasOwnProperty.call(treeData[parseInt(i.toString(), 10)], control.childMapping)) {
                                        treeData[parseInt(i.toString(), 10)]["" + control.childMapping] = [];
                                    }
                                    treeData[parseInt(i.toString(), 10)]["" + control.childMapping].push(originalData.taskData);
                                    updateParentRow(key, treeData[parseInt(i.toString(), 10)], action, control, isSelfReference, originalData);
                                }
                            }
                            else if (control.editSettings.newRowPosition === 'Below') {
                                treeData.splice(i + 1, 0, originalData.taskData);
                                if (!isNullOrUndefined(originalData.parentItem)) {
                                    updateParentRow(key, treeData[i + 1], action, control, isSelfReference, originalData);
                                }
                            }
                            else if (!addRowIndex) {
                                index = 0;
                                treeData.splice(index, 0, originalData.taskData);
                            }
                            else if (control.editSettings.newRowPosition === 'Above') {
                                treeData.splice(i, 0, originalData.taskData);
                                if (!isNullOrUndefined(originalData.parentItem)) {
                                    updateParentRow(key, treeData[parseInt(i.toString(), 10)], action, control, isSelfReference, originalData);
                                }
                            }
                        }
                        return "break";
                    }
                }
                else if (!isNullOrUndefined(treeData[parseInt(i.toString(), 10)]["" + control.childMapping])) {
                    if (removeChildRecords(treeData[parseInt(i.toString(), 10)]["" + control.childMapping], modifiedData[parseInt(k.toString(), 10)], action, key, control, isSelfReference, originalData, columnName)) {
                        updateParentRow(key, treeData[parseInt(i.toString(), 10)], action, control, isSelfReference);
                    }
                }
            };
            while (i-- && i >= 0) {
                var state_1 = _loop_1();
                if (state_1 === "break")
                    break;
            }
        }
    }
}
/**
 * Performs Add action to Tree Grid data source
 *
 * @param {{value: ITreeData, action: string }} details - Gets modified record value and CRUD action type
 * @param {TreeGrid} details.value - Gets modified record value
 * @param {string} details.action - CRUD action type
 * @param {Object[]} treeData - Tree Grid data source
 * @param {TreeGrid} control - Tree Grid instance
 * @param {boolean} isSelfReference - Denotes whether Self Referential data binding
 * @param {number} addRowIndex - New add row index
 * @param {number} selectedIndex - Selected Row index
 * @param {ITreeData} addRowRecord - Newly added record
 * @returns {void}
 */
function addAction(details, treeData, control, isSelfReference, addRowIndex, selectedIndex, addRowRecord) {
    var value;
    var isSkip = false;
    var currentViewRecords = control.grid.getCurrentViewRecords();
    value = extend$1({}, details.value);
    value = getPlainData(value);
    switch (control.editSettings.newRowPosition) {
        case 'Top':
            treeData.unshift(value);
            isSkip = true;
            break;
        case 'Bottom':
            treeData.push(value);
            isSkip = true;
            break;
        case 'Above':
            if (!isNullOrUndefined(addRowRecord)) {
                value = extend$1({}, addRowRecord);
                value = getPlainData(value);
            }
            else {
                value = extend$1({}, currentViewRecords[addRowIndex + 1]);
                value = getPlainData(value);
            }
            break;
        case 'Below':
        case 'Child':
            if (!isNullOrUndefined(addRowRecord)) {
                value = extend$1({}, addRowRecord);
                value = getPlainData(value);
            }
            else {
                var primaryKeys = control.grid.getPrimaryKeyFieldNames()[0];
                var currentdata = currentViewRecords[parseInt(addRowIndex.toString(), 10)];
                if (!isNullOrUndefined(currentdata) && currentdata["" + primaryKeys] === details.value["" + primaryKeys] || selectedIndex !== -1) {
                    value = extend$1({}, currentdata);
                }
                else {
                    value = extend$1({}, details.value);
                }
                value = getPlainData(value);
                var internalProperty = 'internalProperties';
                control.editModule["" + internalProperty].taskData = value;
            }
            if (selectedIndex === -1) {
                treeData.unshift(value);
                isSkip = true;
            }
    }
    return { value: value, isSkip: isSkip };
}
/**
 * @param {ITreeData[]} childRecords - Child Records collection
 * @param {Object} modifiedData - Modified data in crud action
 * @param {string} action - crud action type
 * @param {string} key - Primary key field name
 * @param {TreeGrid} control - Tree Grid instance
 * @param {boolean} isSelfReference - Specified whether Self Referential data binding
 * @param {ITreeData} originalData - Non updated data from data source, of edited data
 * @param {string} columnName - column field name
 * @returns {boolean} Returns whether child records exists
 */
function removeChildRecords(childRecords, modifiedData, action, key, control, isSelfReference, originalData, columnName) {
    var isChildAll = false;
    var j = childRecords.length;
    while (j-- && j >= 0) {
        if (childRecords[parseInt(j.toString(), 10)]["" + key] === modifiedData["" + key] ||
            (isSelfReference && childRecords[parseInt(j.toString(), 10)][control.parentIdMapping] === modifiedData[control.idMapping])) {
            if (action === 'edit') {
                var keys = Object.keys(modifiedData);
                var editedData = getParentData(control, modifiedData.uniqueID);
                for (var i = 0; i < keys.length; i++) {
                    if (Object.prototype.hasOwnProperty.call(childRecords[parseInt(j.toString(), 10)], keys[parseInt(i.toString(), 10)]) &&
                        (control.editSettings.mode !== 'Cell' || keys[parseInt(i.toString(), 10)] === columnName)) {
                        editedData[keys[parseInt(i.toString(), 10)]] =
                            editedData.taskData[keys[parseInt(i.toString(), 10)]] =
                                childRecords[parseInt(j.toString(), 10)][keys[parseInt(i.toString(), 10)]] =
                                    modifiedData[keys[parseInt(i.toString(), 10)]];
                        if (control.grid.editSettings.mode === 'Normal' && control.editSettings.mode === 'Cell' && !isNullOrUndefined(control.grid.editModule)) {
                            var editModule = 'editModule';
                            control.grid.editModule["" + editModule].editRowIndex = modifiedData.index;
                            control.grid.editModule["" + editModule].updateCurrentViewData(modifiedData);
                        }
                    }
                }
                break;
            }
            else if (action === 'add' || action === 'batchsave') {
                if (control.editSettings.newRowPosition === 'Child') {
                    if (isSelfReference) {
                        originalData["" + control.parentIdMapping] = childRecords[parseInt(j.toString(), 10)][control.idMapping];
                        childRecords.splice(j + 1, 0, originalData);
                        updateParentRow(key, childRecords[parseInt(j.toString(), 10)], action, control, isSelfReference, originalData);
                    }
                    else {
                        if (!Object.prototype.hasOwnProperty.call(childRecords[parseInt(j.toString(), 10)], control.childMapping)) {
                            childRecords[parseInt(j.toString(), 10)][control.childMapping] = [];
                        }
                        childRecords[parseInt(j.toString(), 10)][control.childMapping].push(originalData.taskData);
                        updateParentRow(key, childRecords[parseInt(j.toString(), 10)], action, control, isSelfReference, originalData);
                    }
                }
                else if (control.editSettings.newRowPosition === 'Above') {
                    childRecords.splice(j, 0, originalData.taskData);
                    if (!isNullOrUndefined(originalData.parentItem)) {
                        updateParentRow(key, childRecords[parseInt(j.toString(), 10)], action, control, isSelfReference, originalData);
                    }
                }
                else if (control.editSettings.newRowPosition === 'Below') {
                    childRecords.splice(j + 1, 0, originalData.taskData);
                    if (!isNullOrUndefined(originalData.parentItem)) {
                        updateParentRow(key, childRecords[parseInt(j.toString(), 10)], action, control, isSelfReference, originalData);
                    }
                }
            }
            else {
                childRecords.splice(j, 1);
                if (!childRecords.length) {
                    isChildAll = true;
                }
            }
        }
        else if (!isNullOrUndefined(childRecords[parseInt(j.toString(), 10)][control.childMapping])) {
            if (removeChildRecords(childRecords[parseInt(j.toString(), 10)][control.childMapping], modifiedData, action, key, control, isSelfReference, originalData, columnName)) {
                updateParentRow(key, childRecords[parseInt(j.toString(), 10)], action, control, isSelfReference);
            }
        }
    }
    return isChildAll;
}
/**
 * @param {string} key - Primary key field name
 * @param {ITreeData} record - Parent Record which has to be updated
 * @param {string} action - CRUD action type
 * @param {TreeGrid} control - Tree Grid instance
 * @param {boolean} isSelfReference - Specified whether self referential data binding
 * @param {ITreeData} child - Specifies child record
 * @returns {void}
 */
function updateParentRow(key, record, action, control, isSelfReference, child) {
    if ((control.editSettings.newRowPosition === 'Above' || control.editSettings.newRowPosition === 'Below')
        && ((action === 'add' || action === 'batchsave')) && !isNullOrUndefined(child.parentItem)) {
        var parentData = getParentData(control, child.parentItem.uniqueID);
        parentData.childRecords.push(child);
    }
    else {
        var currentRecords = control.grid.getCurrentViewRecords();
        var index_1;
        currentRecords.map(function (e, i) { if (e["" + key] === record["" + key]) {
            index_1 = i;
            return;
        } });
        if (control.enableVirtualization && isNullOrUndefined(index_1)) {
            var updatedParent = getValue('uniqueIDCollection.' + child.parentUniqueID, control);
            record = updatedParent;
        }
        if (!isNullOrUndefined(index_1)) {
            record = currentRecords[parseInt(index_1.toString(), 10)];
        }
        if (control.enableVirtualization && isNullOrUndefined(record) && !isNullOrUndefined(child)) {
            record = getValue('uniqueIDCollection.' + child.parentUniqueID, control);
        }
        if (!isSelfReference && !isNullOrUndefined(record.childRecords) && record.childRecords.length) {
            record.hasChildRecords = true;
        }
        else {
            record.hasChildRecords = false;
        }
        if (action === 'add' || action === 'batchsave') {
            record.expanded = true;
            record.hasChildRecords = true;
            if (control.sortSettings.columns.length && isNullOrUndefined(child)) {
                child = currentRecords.filter(function (e) {
                    if (e.parentUniqueID === record.uniqueID) {
                        return e;
                    }
                    else {
                        return null;
                    }
                });
            }
            var childRecords = child ? child instanceof Array ? child[0] : child : currentRecords[index_1 + 1];
            if (control.editSettings.newRowPosition !== 'Below') {
                if (!Object.prototype.hasOwnProperty.call(record, 'childRecords')) {
                    record.childRecords = [];
                }
                else {
                    if (!isNullOrUndefined(child) && record["" + key] !== child["" + key]) {
                        record.childRecords.push(child);
                    }
                }
                if (record.childRecords.indexOf(childRecords) === -1 && record["" + key] !== child["" + key]) {
                    record.childRecords.unshift(childRecords);
                }
                if (isSelfReference) {
                    if (!Object.prototype.hasOwnProperty.call(record, control.childMapping)) {
                        record[control.childMapping] = [];
                    }
                    if (record["" + control.childMapping].indexOf(childRecords) === -1 && record["" + key] !== child["" + key]) {
                        record[control.childMapping].unshift(childRecords);
                    }
                }
            }
        }
        var primaryKeys = control.grid.getPrimaryKeyFieldNames()[0];
        var data = control.grid.dataSource instanceof DataManager ?
            control.grid.dataSource.dataSource.json : control.grid.dataSource;
        for (var i = 0; i < data.length; i++) {
            if (data[parseInt(i.toString(), 10)]["" + primaryKeys] === record["" + primaryKeys]) {
                data[parseInt(i.toString(), 10)] = record;
                break;
            }
        }
        control.grid.setRowData(key, record);
        var row = control.getRowByIndex(index_1);
        if (control.editSettings.mode === 'Batch') {
            if (action === 'add') {
                row = control.getRows()[control.grid.getCurrentViewRecords().indexOf(record)];
            }
            else {
                row = control.getRows()[control.grid.getRowIndexByPrimaryKey(record["" + key])];
            }
        }
        var movableRow = void 0;
        if (control.frozenRows || control.getFrozenColumns()) {
            movableRow = control.getRowByIndex(index_1);
        }
        if (!control.enableVirtualization && !isNullOrUndefined(row) || !isNullOrUndefined(movableRow)) {
            var index_2 = control.treeColumnIndex;
            if (control.allowRowDragAndDrop && control.enableImmutableMode) {
                index_2 = index_2 + 1;
            }
            control.renderModule.cellRender({
                data: record, cell: row.cells[parseInt(index_2.toString(), 10)] ? row.cells[parseInt(index_2.toString(), 10)]
                    : movableRow.cells[index_2 - control.getFrozenColumns()],
                column: control.grid.getColumns()[control.treeColumnIndex],
                requestType: action
            });
            if (control.enableImmutableMode && control['action'] === 'indenting' || control['action'] === 'outdenting') {
                control.renderModule.RowModifier({
                    data: record, row: row
                });
            }
        }
    }
}

var __extends$c = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the infinite scroll behavior of the Tree Grid.
 */
var InfiniteScrollSettings = /** @class */ (function (_super) {
    __extends$c(InfiniteScrollSettings, _super);
    function InfiniteScrollSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$a([
        Property(false)
    ], InfiniteScrollSettings.prototype, "enableCache", void 0);
    __decorate$a([
        Property(3)
    ], InfiniteScrollSettings.prototype, "maxBlocks", void 0);
    __decorate$a([
        Property(3)
    ], InfiniteScrollSettings.prototype, "initialBlocks", void 0);
    return InfiniteScrollSettings;
}(ChildProperty));

var __extends$d = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents the TreeGrid component.
 * ```html
 * <div id='treegrid'></div>
 * <script>
 *  var treegridObj = new TreeGrid({ allowPaging: true });
 *  treegridObj.appendTo('#treegrid');
 * </script>
 * ```
 */
var TreeGrid = /** @class */ (function (_super) {
    __extends$d(TreeGrid, _super);
    function TreeGrid(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.dataResults = {};
        _this.uniqueIDCollection = {};
        _this.uniqueIDFilterCollection = {};
        _this.changedRecords = 'changedRecords';
        _this.deletedRecords = 'deletedRecords';
        _this.addedRecords = 'addedRecords';
        _this.indentOutdentAction = 'indentOutdentAction';
        _this.isFromChartSide = false;
        _this.modifiedRecords = [];
        _this.stackedHeader = false;
        _this.objectEqualityChecker = function (old, current) {
            if (old) {
                var keys = Object.keys(old);
                var isEqual = true;
                var excludeKeys = ['Children', 'childRecords', 'taskData', 'uniqueID', 'parentItem', 'parentUniqueID', 'index'];
                for (var i = 0; i < keys.length; i++) {
                    if (old[keys[parseInt(i.toString(), 10)]] !== current[keys[parseInt(i.toString(), 10)]] &&
                        excludeKeys.indexOf(keys[parseInt(i.toString(), 10)]) === -1) {
                        var isDate = old[keys[parseInt(i.toString(), 10)]] instanceof Date &&
                            current[keys[parseInt(i.toString(), 10)]] instanceof Date;
                        if (!isDate || (old[keys[parseInt(i.toString(), 10)]].getTime() !==
                            current[keys[parseInt(i.toString(), 10)]].getTime())) {
                            isEqual = false;
                            break;
                        }
                    }
                }
                return isEqual;
            }
            else {
                return false;
            }
        };
        TreeGrid_1.Inject(Selection, Logger);
        setValue('mergePersistData', _this.mergePersistTreeGridData, _this);
        var logger = 'Logger';
        if (!isNullOrUndefined(_this.injectedModules["" + logger])) {
            Grid.Inject(Logger$1);
        }
        var freezeModulePresent = _this.injectedModules.filter(function (e) {
            if (e.prototype.getModuleName() === 'freeze') {
                Grid.Inject(Freeze$1);
            }
        });
        _this.grid = new Grid();
        return _this;
    }
    TreeGrid_1 = TreeGrid;
    /**
     * Exports the TreeGrid data to an Excel file (.xlsx).
     *
     * @param {ExcelExportProperties | TreeGridExcelExportProperties} excelExportProperties - The properties used to configure the Excel export.
     * @param {boolean} isMultipleExport - Indicates whether multiple exporting is enabled.
     * @param {workbook} workbook - The workbook instance used for multiple exports.
     * @param {boolean} isBlob - If set to true, the result will be returned as blob data.
     * @returns {Promise<any>} - Returns a promise that resolves with the result of the export action.
     */
    /* eslint-disable */
    TreeGrid.prototype.excelExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        /* eslint-enable */
        return this.excelExportModule.Map(excelExportProperties, isMultipleExport, workbook, isBlob, false);
    };
    /**
     * Exports the TreeGrid data to a CSV file.
     *
     * @param {ExcelExportProperties} excelExportProperties - The properties used to configure the CSV export.
     * @param {boolean} isMultipleExport - Indicates whether multiple exporting is enabled.
     * @param {workbook} workbook - The workbook instance used for multiple exports.
     * @param {boolean} isBlob - If set to true, the result will be returned as blob data.
     * @returns {Promise<any>} - Returns a promise that resolves with the result of the export action.
     */
    /* eslint-disable */
    TreeGrid.prototype.csvExport = function (excelExportProperties, isMultipleExport, workbook, isBlob) {
        /* eslint-enable */
        return this.excelExportModule.Map(excelExportProperties, isMultipleExport, workbook, isBlob, true);
    };
    /**
     * Exports the TreeGrid data to a PDF document.
     *
     * @param {PdfExportProperties | TreeGridPdfExportProperties} pdfExportProperties - The properties used to configure the PDF export.
     * @param {boolean} isMultipleExport - Indicates whether multiple exporting is enabled.
     * @param {Object} pdfDoc - The PDF document instance used for multiple exports.
     * @param {boolean} isBlob - If set to true, the result will be returned as blob data.
     * @returns {Promise<any>} - Returns a promise that resolves with the result of the export action.
     */
    TreeGrid.prototype.pdfExport = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        return this.pdfExportModule.Map(pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
    };
    /**
     * Sends a POST request to export the TreeGrid to an Excel file on the server side.
     *
     * @param {string} url - The URL for the server-side Excel export action.
     * @returns {void}
     */
    TreeGrid.prototype.serverExcelExport = function (url) {
        this.isExcel = true;
        this.exportTreeGrid(url);
    };
    /**
     * Sends a POST request to export the TreeGrid to a PDF document on the server side.
     *
     * @param {string} url - The URL for the server-side PDF export action.
     * @returns {void}
     */
    TreeGrid.prototype.serverPdfExport = function (url) {
        this.isExcel = false;
        this.exportTreeGrid(url);
    };
    /**
     * Sends a POST request to export the TreeGrid to a CSV file on the server side.
     *
     * @param {string} url - The URL for the server-side CSV export action.
     * @returns {void}
     */
    TreeGrid.prototype.serverCsvExport = function (url) {
        this.isExcel = true;
        this.exportTreeGrid(url);
    };
    /**
     * Exports the TreeGrid data to the specified URL using a POST request.
     *
     * @param {string} url - Defines exporting url
     * @returns {void}
     */
    TreeGrid.prototype.exportTreeGrid = function (url) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var treegrid = this;
        var query = treegrid.grid.getDataModule().generateQuery(true);
        var state = new UrlAdaptor().processQuery(new DataManager({ url: '' }), query);
        var queries = JSON.parse(state.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var treeGridModel = JSON.parse(this.addOnPersist(['allowPaging', 'pageSettings', 'sortSettings', 'allowPdfExport', 'allowExcelExport', 'aggregates',
            'filterSettings', 'columns', 'locale', 'searchSettings', 'idMapping', 'parentIdMapping', 'childMapping', 'treeColumnIndex']));
        var include = ['field', 'headerText', 'type', 'format', 'visible',
            'template', 'index', 'width', 'textAlign', 'headerTextAlign', 'columns'];
        treeGridModel.filterSettings.columns = queries.where;
        treeGridModel.searchSettings.fields = queries.search && queries.search[0]['fields'] || [];
        treeGridModel.sortSettings.columns = queries.sorted;
        treeGridModel.columns = this.setHeaderText(treeGridModel.columns, include);
        var form = this.createElement('form', { id: 'ExportForm' });
        form.style.display = 'none';
        var treeGridInput = this.createElement('input', { id: 'treeGridInput', attrs: { name: 'treeGridModel' } });
        treeGridInput.value = JSON.stringify(treeGridModel);
        form.method = 'POST';
        form.action = url;
        form.appendChild(treeGridInput);
        document.body.appendChild(form);
        form.submit();
        form.remove();
    };
    /**
     * Sets the header text and other properties for an array of columns based on specified criteria.
     *
     * @param {Column[]} columns - Defines array of columns
     * @param {string[]} include - Defines array of sting
     * @returns {Column[]} returns array of columns
     */
    TreeGrid.prototype.setHeaderText = function (columns, include) {
        for (var i = 0; i < columns.length; i++) {
            var column = this.getColumnByUid(columns[parseInt(i.toString(), 10)].uid);
            if (this.stackedHeader && isNullOrUndefined(column)) {
                column = !isNullOrUndefined(columns[parseInt(i.toString(), 10)].field) ?
                    this.getColumnByField(columns[parseInt(i.toString(), 10)].field) : columns[parseInt(i.toString(), 10)];
            }
            columns[parseInt(i.toString(), 10)].headerText = column.headerText;
            if (!isNullOrUndefined(column.template)) {
                columns[parseInt(i.toString(), 10)].template = 'true';
            }
            if (columns[parseInt(i.toString(), 10)].format) {
                columns[parseInt(i.toString(), 10)].format = getNumberFormat(this.getFormat(column.format), column.type, false, this.currencyCode);
                if (!this.isExcel && (column.type === 'datetime' || column.type === 'date')) {
                    columns[parseInt(i.toString(), 10)].format = columns[parseInt(i.toString(), 10)].format.toString().replace('AM/PM', 'tt');
                }
                columns[parseInt(i.toString(), 10)].type = column.type;
            }
            if (columns[parseInt(i.toString(), 10)].columns) {
                this.setHeaderText(columns[parseInt(i.toString(), 10)].columns, include);
            }
            var keys = Object.keys(columns[parseInt(i.toString(), 10)]);
            for (var j = 0; j < keys.length; j++) {
                if (include.indexOf(keys[parseInt(j.toString(), 10)]) < 0) {
                    delete columns[parseInt(i.toString(), 10)][keys[parseInt(j.toString(), 10)]];
                }
            }
        }
        return columns;
    };
    /**
     * Retrieves the appropriate format string from the given format options.
     *
     * @param {string | NumberFormatOptions | DateFormatOptions} format - The format options to retrieve the format string from.
     * @returns {string} The format string extracted from the provided format options.
     */
    TreeGrid.prototype.getFormat = function (format) {
        return typeof (format) === 'object' ? !isNullOrUndefined(format.format) ?
            format.format : format.skeleton : format;
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns TreeGrid module name
     */
    TreeGrid.prototype.getModuleName = function () {
        return 'treegrid';
    };
    /**
     * For internal use only - Initialize the event handler;
     *
     * @private
     * @returns {void}
     */
    TreeGrid.prototype.preRender = function () {
        this.TreeGridLocale();
        this.initProperties();
        this.defaultLocale = {
            Above: 'Above',
            Below: 'Below',
            Child: 'Child',
            AddRow: 'Add Row',
            ExpandAll: 'Expand All',
            CollapseAll: 'Collapse All',
            RowIndent: 'Indent',
            RowOutdent: 'Outdent'
        };
        this.l10n = new L10n('treegrid', this.defaultLocale, this.locale);
        if (this.isSelfReference && isNullOrUndefined(this.childMapping)) {
            this.childMapping = 'Children';
        }
    };
    /**
     * Sorts a column with the specified options.
     *
     * @param {string} columnName - The name of the column to be sorted.
     * @param {SortDirection} direction - The direction of the sorting operation.
     * @param {boolean} isMultiSort - Specifies whether previous sorted columns should be maintained during sorting.
     * @returns {void}
     */
    TreeGrid.prototype.sortByColumn = function (columnName, direction, isMultiSort) {
        if (this.sortModule) {
            this.sortModule.sortColumn(columnName, direction, isMultiSort);
        }
    };
    /**
     * Clears all the sorted columns in the TreeGrid.
     *
     * @returns {void}
     */
    TreeGrid.prototype.clearSorting = function () {
        if (this.sortModule) {
            this.sortModule.clearSorting();
        }
    };
    /**
     * Removes the sorted state from a column specified by the field name.
     *
     * @param {string} field - The field name of the column from which the sort state should be removed.
     * @returns {void}
     * @hidden
     */
    TreeGrid.prototype.removeSortColumn = function (field) {
        if (this.sortModule) {
            this.sortModule.removeSortColumn(field);
        }
    };
    /**
     * Searches for TreeGrid records using a specified search string.
     * Customize the search behavior through the [searchSettings](./#searchsettings/).
     *
     * @param {string} searchString - The string used as the search key.
     * @returns {void}
     */
    TreeGrid.prototype.search = function (searchString) {
        this.grid.search(searchString);
    };
    /**
     * Adjusts column widths to fit their content, ensuring content is displayed without wrapping or truncation.
     * - Hidden columns are ignored by this method.
     * - Use the `autoFitColumns` method during the `dataBound` event for initial rendering.
     *
     * @param {string | string[]} fieldNames - The name(s) of the column(s) to be auto-fitted.
     * @returns {void}
     */
    TreeGrid.prototype.autoFitColumns = function (fieldNames) {
        this.resizeModule.autoFitColumns(fieldNames);
        this.updateColumnModel();
    };
    /**
     * Reorders TreeGrid columns by specifying their field names.
     *
     * @param {string | string[]} fromFName - The field name(s) of the column(s) to be moved.
     * @param {string} toFName - The destination field name to place the moved columns.
     * @returns {void}
     */
    TreeGrid.prototype.reorderColumns = function (fromFName, toFName) {
        this.grid.reorderColumns(fromFName, toFName);
    };
    TreeGrid.prototype.TreeGridLocale = function () {
        if (!isNullOrUndefined(this.locale)) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var locale = L10n.locale;
            var localeObject = {};
            setValue(this.locale, {}, localeObject);
            var gridLocale = void 0;
            gridLocale = {};
            gridLocale = getObject(this.locale, locale);
            var treeGridLocale = void 0;
            treeGridLocale = {};
            treeGridLocale = getObject(this.getModuleName(), gridLocale);
            setValue('grid', treeGridLocale, getObject(this.locale, localeObject));
            L10n.load(localeObject);
        }
    };
    /**
     * Prints all the pages of the TreeGrid and hides the pager by default.
     * Customize print options using the [printMode](./#printmode).
     *
     * @returns {void}
     */
    TreeGrid.prototype.print = function () {
        this.printModule.print();
    };
    TreeGrid.prototype.treeGridkeyActionHandler = function (e) {
        if (this.allowKeyboard) {
            var target = void 0;
            var parentTarget = void 0;
            var column = void 0;
            var row = void 0;
            var summaryElement = void 0;
            switch (e.action) {
                case 'ctrlDownArrow':
                    this.expandAll();
                    break;
                case 'ctrlUpArrow':
                    this.collapseAll();
                    break;
                case 'ctrlShiftUpArrow':
                    target = e.target;
                    column = target.closest('.e-rowcell');
                    if (!isNullOrUndefined(column)) {
                        row = column.closest('tr');
                        if (!isNullOrUndefined(row) && !(isNullOrUndefined(row.getElementsByClassName('e-treegridexpand')[0]))) {
                            this.expandCollapseRequest(row.querySelector('.e-treegridexpand'));
                        }
                    }
                    break;
                case 'ctrlShiftDownArrow':
                    target = e.target;
                    column = target.closest('.e-rowcell');
                    if (!isNullOrUndefined(column)) {
                        row = column.closest('tr');
                        if (!isNullOrUndefined(row) && !(isNullOrUndefined(row.getElementsByClassName('e-treegridcollapse')[0]))) {
                            this.expandCollapseRequest(row.querySelector('.e-treegridcollapse'));
                        }
                    }
                    break;
                case 'downArrow':
                    if (!this.enableVirtualization && isNullOrUndefined(this.rowTemplate)) {
                        target = e.target;
                        if (!isNullOrUndefined(target.querySelectorAll('.e-rowcell'))) {
                            target = parentsUntil(target, 'e-rowcell');
                        }
                        if (!isNullOrUndefined(target)) {
                            parentTarget = target.parentElement;
                            if (!isNullOrUndefined(parentTarget)) {
                                var cellIndex = parentTarget.cellIndex;
                                if (this.grid.getColumnByIndex(cellIndex).editType === 'dropdownedit' && isNullOrUndefined(this.grid.getColumnByIndex(cellIndex).edit['obj'])) {
                                    parentTarget = target;
                                }
                                summaryElement = this.findnextRowElement(parentTarget);
                                if (summaryElement !== null) {
                                    var cellIndex_1 = target.cellIndex;
                                    var row_1 = summaryElement.children[parseInt(cellIndex_1.toString(), 10)];
                                    if (!isNullOrUndefined(row_1) && !this.grid.isEdit) {
                                        addClass([row_1], 'e-focused');
                                        addClass([row_1], 'e-focus');
                                    }
                                }
                                else {
                                    this.clearSelection();
                                }
                            }
                        }
                    }
                    break;
                case 'upArrow':
                    if (!this.enableVirtualization && isNullOrUndefined(this.rowTemplate)) {
                        target = e.target;
                        if (!isNullOrUndefined(target.querySelectorAll('.e-rowcell'))) {
                            target = parentsUntil(target, 'e-rowcell');
                        }
                        if (!isNullOrUndefined(target)) {
                            parentTarget = target.parentElement;
                            if (!isNullOrUndefined(parentTarget)) {
                                var cellIndex = parentTarget.cellIndex;
                                if (this.grid.getColumnByIndex(cellIndex).editType === 'dropdownedit' && isNullOrUndefined(this.grid.getColumnByIndex(cellIndex).edit['obj'])) {
                                    parentTarget = target;
                                }
                                summaryElement = this.findPreviousRowElement(parentTarget);
                                if (summaryElement !== null) {
                                    var cellIndex_2 = target.cellIndex;
                                    if (!isNullOrUndefined(cellIndex_2)) {
                                        var row_2 = summaryElement.children[parseInt(cellIndex_2.toString(), 10)];
                                        if (!isNullOrUndefined(row_2) && !this.grid.isEdit) {
                                            addClass([row_2], 'e-focused');
                                            addClass([row_2], 'e-focus');
                                        }
                                    }
                                }
                                else {
                                    this.clearSelection();
                                }
                            }
                        }
                    }
            }
        }
    };
    // Get Proper Row Element from the summary
    TreeGrid.prototype.findnextRowElement = function (summaryRowElement) {
        var rowElement = summaryRowElement.nextElementSibling;
        if (rowElement !== null && (rowElement.className.indexOf('e-summaryrow') !== -1 ||
            rowElement.classList.contains('e-childrow-hidden'))) {
            rowElement = this.findnextRowElement(rowElement);
        }
        return rowElement;
    };
    // Get Proper Row Element from the summary
    TreeGrid.prototype.findPreviousRowElement = function (summaryRowElement) {
        var rowElement = summaryRowElement.previousElementSibling;
        if (rowElement !== null && (rowElement.className.indexOf('e-summaryrow') !== -1 ||
            rowElement.classList.contains('e-childrow-hidden'))) {
            rowElement = this.findPreviousRowElement(rowElement);
        }
        return rowElement;
    };
    TreeGrid.prototype.initProperties = function () {
        this.defaultLocale = {};
        this.flatData = [];
        this.infiniteScrollData = [];
        this.remoteCollapsedData = [];
        this.remoteExpandedData = [];
        this.parentData = [];
        this.columnModel = [];
        this.isExpandAll = false;
        this.isCollapseAll = false;
        this.keyConfigs = {
            ctrlDownArrow: 'ctrl+downarrow',
            ctrlUpArrow: 'ctrl+uparrow',
            ctrlShiftUpArrow: 'ctrl+shift+uparrow',
            ctrlShiftDownArrow: 'ctrl+shift+downarrow',
            downArrow: 'downArrow',
            upArrow: 'upArrow'
        };
        this.isLocalData = (!(this.dataSource instanceof DataManager) || this.dataSource.dataSource.offline
            || (!isNullOrUndefined(this.dataSource.ready)) || this.dataSource.adaptor instanceof RemoteSaveAdaptor);
        this.isSelfReference = !isNullOrUndefined(this.parentIdMapping);
    };
    /**
     * Attaches event handlers to the necessary elements during the component's initialization.
     *
     * @hidden
     * @returns {void}
     */
    TreeGrid.prototype.wireEvents = function () {
        EventHandler.add(this.grid.element, 'click', this.mouseClickHandler, this);
        EventHandler.add(this.element, 'touchend', this.mouseClickHandler, this);
        this.keyboardModule = new KeyboardEvents(this.element, {
            keyAction: this.treeGridkeyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        if (this.allowKeyboard) {
            this.element.tabIndex = this.element.tabIndex === -1 ? 0 : this.element.tabIndex;
        }
    };
    /**
     * Provides a list of the modules that are required for rendering the TreeGrid component.
     *
     * This method is essential for ensuring that all dependent modules are loaded and available
     * during the component's lifecycle, enabling full functionality.
     *
     * @returns {ModuleDeclaration[]} - Returns an array of the required TreeGrid module declarations.
     * @hidden
     */
    TreeGrid.prototype.requiredModules = function () {
        var modules = [];
        var splitFrozenCount = 'splitFrozenCount';
        if (isNullOrUndefined(this['changedProperties'].columns)) {
            this.grid["" + splitFrozenCount](this.getColumns());
        }
        if (this.isDestroyed) {
            return modules;
        }
        modules.push({
            member: 'filter', args: [this, this.filterSettings],
            name: 'Filter'
        });
        if (!isNullOrUndefined(this.toolbar)) {
            modules.push({
                member: 'toolbar',
                args: [this],
                name: 'Toolbar'
            });
        }
        if (this.contextMenuItems) {
            modules.push({
                member: 'contextMenu',
                args: [this],
                name: 'ContextMenu'
            });
        }
        if (this.allowPaging) {
            modules.push({
                member: 'pager',
                args: [this, this.pageSettings],
                name: 'Page'
            });
        }
        if (this.allowReordering) {
            modules.push({
                member: 'reorder',
                args: [this],
                name: 'Reorder'
            });
        }
        if (this.allowSorting) {
            modules.push({
                member: 'sort',
                args: [this],
                name: 'Sort'
            });
        }
        if (this.aggregates.length > 0) {
            modules.push({
                member: 'summary', args: [this],
                name: 'Aggregate'
            });
        }
        if (this.resizeCheck()) {
            modules.push({
                member: 'resize', args: [this],
                name: 'Resize'
            });
        }
        if (this.allowExcelExport) {
            modules.push({
                member: 'ExcelExport', args: [this],
                name: 'ExcelExport'
            });
        }
        var freezePresent = this.injectedModules.filter(function (e) {
            return e.prototype.getModuleName() === 'freeze';
        });
        var hasFreezeProp = Array.isArray(this.columns) &&
            this.columns.some(function (col) { return !!col.freeze; });
        if ((this.frozenColumns || this.frozenRows || this.getFrozenColumns() ||
            hasFreezeProp) && freezePresent.length > 0) {
            modules.push({
                member: 'freeze', args: [this],
                name: 'Freeze'
            });
        }
        if (this.detailTemplate) {
            modules.push({
                member: 'detailRow', args: [this],
                name: 'DetailRow'
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'PdfExport', args: [this],
                name: 'PdfExport'
            });
        }
        if (this.showColumnMenu) {
            modules.push({
                member: 'columnMenu', args: [this],
                name: 'ColumnMenu'
            });
        }
        if (this.showColumnChooser) {
            modules.push({
                member: 'ColumnChooser', args: [this],
                name: 'ColumnChooser'
            });
        }
        this.extendRequiredModules(modules);
        return modules;
    };
    TreeGrid.prototype.resizeCheck = function () {
        var columnMenu = this.showColumnMenu && (!this.columnMenuItems || this.columnMenuItems
            .filter(function (c) { return c === 'AutoFit' || c === 'AutoFitAll'; }).length) ? true : false;
        var contextMenu = this.contextMenuItems && this.contextMenuItems
            .filter(function (c) { return c === 'AutoFit' || c === 'AutoFitAll'; }).length ? true : false;
        return this.allowResizing || columnMenu || contextMenu;
    };
    TreeGrid.prototype.extendRequiredModules = function (modules) {
        var IsRowDDInjected = this.injectedModules.filter(function (e) {
            return e.prototype.getModuleName() === 'rowDragAndDrop';
        });
        if (this.allowRowDragAndDrop || IsRowDDInjected.length) {
            if ((!isNullOrUndefined(this.toolbar) && (this.toolbar['includes']('Indent') ||
                this.toolbar['includes']('Outdent')))) {
                this.isIndentEnabled = true;
            }
            modules.push({
                member: 'rowDragAndDrop',
                args: [this],
                name: 'RowDD'
            });
        }
        if (this.editSettings.allowAdding || this.editSettings.allowDeleting || this.editSettings.allowEditing) {
            modules.push({
                member: 'edit',
                args: [this],
                name: 'Edit'
            });
        }
        if (!isNullOrUndefined(this.columns) && this.isCommandColumn(this.columns)) {
            modules.push({
                member: 'commandColumn',
                args: [this],
                name: 'CommandColumn'
            });
        }
        if (this.allowSelection) {
            modules.push({
                member: 'selection',
                args: [this],
                name: 'Selection'
            });
        }
        if (this.enableVirtualization) {
            modules.push({
                member: 'virtualScroll',
                args: [this],
                name: 'VirtualScroll'
            });
        }
        if (this.enableInfiniteScrolling) {
            modules.push({
                member: 'infiniteScroll',
                args: [this],
                name: 'InfiniteScroll'
            });
        }
        modules.push({
            member: 'logger',
            args: [this.grid]
        });
    };
    TreeGrid.prototype.isCommandColumn = function (columns) {
        var _this = this;
        return columns.some(function (col) {
            if (col.columns) {
                return _this.isCommandColumn(col.columns);
            }
            return !!(col.commands || col.commandsTemplate);
        });
    };
    /**
     * Unbinding events from the element while component destroy.
     *
     * @hidden
     * @returns {void}
     */
    TreeGrid.prototype.unwireEvents = function () {
        if (this.grid && this.grid.element) {
            EventHandler.remove(this.grid.element, 'click', this.mouseClickHandler);
        }
        if (this.element) {
            EventHandler.remove(this.element, 'touchend', this.mouseClickHandler);
            if (this.keyboardModule) {
                this.keyboardModule.destroy();
                this.keyboardModule = null;
            }
            if (this.allowKeyboard) {
                this.element.removeAttribute('tabIndex');
            }
        }
    };
    /**
     * Logs tree grid error message on console
     *
     * @param {string | string[]} types - Tree Grid error type
     * @param {object} args - Error details
     * @hidden
     * @private
     * @returns {void}
     */
    TreeGrid.prototype.log = function (types, args) {
        if (this.loggerModule) {
            this.loggerModule.treeLog(types, args, this);
        }
    };
    /**
     * For internal use only - To Initialize the component rendering.
     *
     * @private
     * @returns {void}
     */
    TreeGrid.prototype.render = function () {
        var _this = this;
        if (this.isReact) {
            this.grid.isReact = true;
            this.grid.portals = [];
        }
        if (this.isVue) {
            this.grid.isVue = true;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.grid.vueInstance = this.vueInstance;
        }
        createSpinner({ target: this.element }, this.createElement);
        this.log(['mapping_fields_missing']);
        this.renderModule = new Render(this);
        this.dataModule = new DataManipulation(this);
        this.printModule = new Print(this);
        this.trigger(load);
        this.autoGenerateColumns();
        this.initialRender = true;
        if (!isNullOrUndefined(this.dataSource)) {
            this.convertTreeData(this.dataSource);
        }
        this.loadGrid();
        if (this.element.classList.contains('e-treegrid') && this.rowDropSettings.targetID) {
            this.grid.rowDropSettings.targetID += '_gridcontrol';
        }
        this.addListener();
        var gridContainer = createElement('div', { id: this.element.id + '_gridcontrol', className: 'e-treelistgrid' });
        addClass([this.element], 'e-treegrid');
        if (!isNullOrUndefined(this.height) && typeof (this.height) === 'string' && this.height.indexOf('%') !== -1) {
            this.element.style.height = this.height;
        }
        if (!isNullOrUndefined(this.width) && typeof (this.width) === 'string' && this.width.indexOf('%') !== -1) {
            this.element.style.width = this.width;
        }
        this.element.appendChild(gridContainer);
        var gridRequiredModules = this.grid.requiredModules;
        this.grid.requiredModules = function () {
            var modules = [];
            modules = gridRequiredModules.apply(this);
            for (var i = 0; i < modules.length; i++) {
                if (modules[parseInt(i.toString(), 10)].member === 'virtualscroll') {
                    modules[parseInt(i.toString(), 10)].member = 'treeVirtualScroll';
                }
            }
            return modules;
        };
        var root = 'root';
        this.grid["" + root] = this["" + root] ? this["" + root] : this;
        this.grid.appendTo(gridContainer);
        this.actionFailureHandler();
        var gridContent = this.element.getElementsByClassName('e-gridcontent')[0].childNodes[0];
        gridContent.setAttribute('tabindex', '0');
        var contentTable = this.element.getElementsByClassName('e-content')[0].querySelector('.e-table');
        if (!isNullOrUndefined(contentTable)) {
            contentTable.setAttribute('role', 'treegrid');
        }
        if (this.isIndentEnabled) {
            this.refreshToolbarItems();
        }
        this.wireEvents();
        this.renderComplete();
        var destroyTemplate = 'destroyTemplate';
        var destroyTemplateFn = this.grid["" + destroyTemplate];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.grid["" + destroyTemplate] = function (args, index) {
            destroyTemplateFn.apply(_this.grid);
            var portals = 'portals';
            if (!(_this.isReact && isNullOrUndefined(_this["" + portals]))) {
                _this.clearTemplate(args, index);
            }
        };
    };
    TreeGrid.prototype.actionFailureHandler = function () {
        var _this = this;
        var failureCases = [];
        var primaryKeyFieldNames = this.getPrimaryKeyFieldNames();
        var RecordsCount = this.flatData.length;
        if ((this.editSettings.allowAdding || this.editSettings.allowDeleting || this.editSettings.allowEditing)
            && primaryKeyFieldNames.length === 0 && RecordsCount !== 0) {
            failureCases.push('For the CRUD actions, it is necessary to enable Primary Key field for the unique data column.');
        }
        if (this.allowRowDragAndDrop && primaryKeyFieldNames.length === 0 && RecordsCount !== 0) {
            failureCases.push('For the Row Drag and Drop actions, it is necessary to enable Primary Key field for the unique data column.');
        }
        if (this.allowPaging && this.enableVirtualization) {
            failureCases.push('Paging is not allowed in virtualization case.');
        }
        if (RecordsCount === 0 && this.columns.length === 0) {
            failureCases.push('Either of the Data source or columns should be given.');
        }
        if (this.frozenColumns > 0 && this.columnModel.filter(function (col) { return col.isFrozen; })) {
            failureCases.push('Use only one attribute for Frozen either IsFrozen or FrozenColumns.');
        }
        if (this.enableVirtualization && !isNullOrUndefined(this.detailTemplate)) {
            failureCases.push('Virtual scrolling is not compatible with the detail template');
        }
        if ((this.frozenColumns > 0 || this.frozenRows > 0 || this.columnModel.filter(function (col) { return col.isFrozen; }))
            && (!isNullOrUndefined(this.detailTemplate) || !isNullOrUndefined(this.rowTemplate))) {
            failureCases.push('Frozen rows and columns are not supported with the Detail template and row template.');
        }
        if ((this.frozenColumns > 0 || this.columnModel.filter(function (col) { return col.isFrozen; }).length > 0 || this.frozenRows > 0) && this.editSettings.mode === 'Cell') {
            failureCases.push('Frozen rows and columns are not supported with cell editing.');
        }
        if (this.allowSelection && !isNullOrUndefined(this.rowTemplate)) {
            failureCases.push('Selection is not supported in RowTemplate');
        }
        if (this.treeColumnIndex >= this.columns.length) {
            failureCases.push('TreeColumnIndex value should not exceed the total column count.');
        }
        if (this.enableVirtualization &&
            (this.columnModel.some(function (col) { return /%$/.test(col.width); }) ||
                /%$/.test(this.height.toString()))) {
            failureCases.push('column width and height should be in pixels');
        }
        if ((this.childMapping !== 'Children') && !isNullOrUndefined(this.idMapping)) {
            failureCases.push('Both IdMapping and ChildMapping should not be used together for tree grid rendering.');
        }
        if ((!isNullOrUndefined(this.idMapping) && (isNullOrUndefined(this.parentIdMapping))) ||
            ((isNullOrUndefined(this.idMapping) && (!isNullOrUndefined(this.parentIdMapping))))) {
            failureCases.push('IdMapping and ParentIdMapping properties should be defined and vice versa.');
        }
        var checkboxColumn = this.columnModel.filter(function (col) { return col.showCheckbox; });
        var treeColumn = this.columns[this.treeColumnIndex];
        if (checkboxColumn.length !== 0) {
            if (checkboxColumn !== treeColumn) {
                failureCases.push('ShowCheckbox column should not be defined other than the tree column.');
            }
            if (checkboxColumn.length > 1) {
                failureCases.push('Only one column can have the ShowCheckbox option enabled.');
            }
        }
        var alignColumn;
        if (this.treeColumnIndex !== null && this.treeColumnIndex !== -1) {
            alignColumn = this.columnModel.filter(function (col) { return col.textAlign === 'Right' && col.field === _this.columnModel[_this.treeColumnIndex].field; });
            if (alignColumn.length !== 0) {
                failureCases.push('TextAlign right for the tree column is not applicable.');
            }
        }
        if (failureCases.length > 0) {
            var failureEventArgs_1 = {
                error: {}
            };
            failureCases.forEach(function (failureCase, index) {
                failureEventArgs_1.error[parseInt(index.toString(), 10)] = failureCase;
            });
            this.trigger(actionFailure, failureEventArgs_1);
        }
    };
    TreeGrid.prototype.refreshToolbarItems = function () {
        var toolbarElement = this.toolbarModule.getToolbar();
        var indentID = this.element.id + '_gridcontrol_indent';
        var outdentID = this.element.id + '_gridcontrol_outdent';
        var indentElement = toolbarElement.querySelector('#' + indentID).parentElement;
        var outdentElement = toolbarElement.querySelector('#' + outdentID).parentElement;
        indentElement.classList.add('e-hidden');
        outdentElement.classList.add('e-hidden');
    };
    TreeGrid.prototype.afterGridRender = function () {
        if (!isNullOrUndefined(this.grid.clipboardModule)) {
            this.grid.clipboardModule.destroy();
        }
        this.clipboardModule = this.grid.clipboardModule = new TreeClipboard(this, this.grid.serviceLocator);
    };
    TreeGrid.prototype.convertTreeData = function (data) {
        var _this = this;
        if (isCountRequired(this)) {
            data = getValue('result', data);
        }
        if (data instanceof Array && data.length > 0 && Object.prototype.hasOwnProperty.call(data[0], 'level')) {
            this.flatData = data;
            this.flatData.filter(function (e) {
                setValue('uniqueIDCollection.' + e.uniqueID, e, _this);
                if (e.level === 0 && !_this.parentData.some(function (record) { return record.uniqueID === e.uniqueID; })) {
                    _this.parentData.push(e);
                }
            });
        }
        else {
            if (isCountRequired(this)) {
                var griddata = getValue('result', this.dataSource);
                this.dataModule.convertToFlatData(griddata);
            }
            else {
                this.dataModule.convertToFlatData(data);
            }
        }
    };
    // private getGridData(): Object {
    //   if (isRemoteData(this)) {
    //     return this.dataSource;
    //   } else if (this.isLocalData && this.dataSource instanceof DataManager) {
    //     this.dataSource.dataSource.json = this.flatData;
    //     return this.dataSource;
    //   }
    //   return this.flatData;
    // }
    TreeGrid.prototype.bindGridProperties = function () {
        this.bindedDataSource();
        this.grid.enableRtl = this.enableRtl;
        this.grid.allowKeyboard = this.allowKeyboard;
        this.grid.columns = this.getGridColumns(this.columns);
        this.grid.allowExcelExport = this.allowExcelExport;
        this.grid.allowPdfExport = this.allowPdfExport;
        this.grid.query = this.query;
        this.grid.columnQueryMode = this.columnQueryMode;
        this.grid.allowPaging = this.allowPaging;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.grid.pageSettings = getActualProperties(this.pageSettings);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.grid.pagerTemplate = this.pagerTemplate;
        this.grid.showColumnMenu = this.showColumnMenu;
        this.grid.allowSorting = this.allowSorting;
        this.grid.allowFiltering = this.allowFiltering;
        this.grid.enableVirtualization = this.enableVirtualization;
        this.grid.enableColumnVirtualization = this.enableColumnVirtualization;
        this.grid.enableInfiniteScrolling = this.enableInfiniteScrolling;
        this.grid.infiniteScrollSettings = this.infiniteScrollSettings;
        this.grid.enableVirtualMaskRow = this.enableVirtualMaskRow;
        this.grid.loadingIndicator = this.loadingIndicator;
        this.grid.width = this.width;
        this.grid.height = this.height;
        this.grid.enableAltRow = this.enableAltRow;
        this.grid.allowReordering = this.allowReordering;
        this.grid.allowTextWrap = this.allowTextWrap;
        this.grid.allowResizing = this.allowResizing;
        this.grid.enableHover = this.enableHover;
        this.grid.enableAutoFill = this.enableAutoFill;
        this.grid.enableAdaptiveUI = this.enableAdaptiveUI;
        this.grid.enableImmutableMode = this.enableImmutableMode;
        this.grid.allowRowDragAndDrop = this.allowRowDragAndDrop;
        this.grid.rowDropSettings = getActualProperties(this.rowDropSettings);
        this.grid.rowHeight = this.rowHeight;
        this.grid.gridLines = this.gridLines;
        this.grid.allowSelection = this.allowSelection;
        this.grid.toolbar = getActualProperties(this.getGridToolbar());
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.grid.toolbarTemplate = this.toolbarTemplate;
        this.grid.showColumnChooser = this.showColumnChooser;
        this.grid.filterSettings = getActualProperties(this.filterSettings);
        this.grid.selectionSettings = getActualProperties(this.selectionSettings);
        this.grid.sortSettings = getActualProperties(this.sortSettings);
        this.grid.searchSettings = getActualProperties(this.searchSettings);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.grid.aggregates = getActualProperties(this.aggregates);
        this.grid.textWrapSettings = getActualProperties(this.textWrapSettings);
        this.grid.printMode = getActualProperties(this.printMode);
        this.grid.locale = getActualProperties(this.locale);
        this.grid.selectedRowIndex = this.selectedRowIndex;
        this.grid.contextMenuItems = getActualProperties(this.getContextMenu());
        this.grid.columnMenuItems = getActualProperties(this.columnMenuItems);
        this.grid.editSettings = this.getGridEditSettings();
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.grid.rowTemplate = getActualProperties(this.rowTemplate);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.grid.detailTemplate = getActualProperties(this.detailTemplate);
        this.grid.frozenRows = this.frozenRows;
        this.grid.frozenColumns = this.frozenColumns;
        this.grid.clipMode = getActualProperties(this.clipMode);
        var templateInstance = 'templateDotnetInstance';
        this.grid["" + templateInstance] = this["" + templateInstance];
        var isJsComponent = 'isJsComponent';
        this.grid["" + isJsComponent] = true;
        var enableHtmlSanitizer = 'enableHtmlSanitizer';
        this.grid["" + enableHtmlSanitizer] = this.enableHtmlSanitizer;
    };
    TreeGrid.prototype.triggerEvents = function (args) {
        this.trigger(getObject('name', args), args);
    };
    TreeGrid.prototype.IsExpandCollapseClicked = function (args) {
        if (!this.isFromChartSide && !isNullOrUndefined(args.target) && (args.target.classList.contains('e-treegridexpand')
            || args.target.classList.contains('e-treegridcollapse') || args.target.classList.contains('e-summarycell'))
            && !this.selectionSettings.checkboxOnly) {
            if ((!isNullOrUndefined(args.data) && args.data['hasChildRecords']) || (args.rowIndex !== -1 && isNullOrUndefined(args.data))) {
                args.cancel = true;
                return;
            }
        }
    };
    TreeGrid.prototype.bindGridEvents = function () {
        var _this = this;
        this.grid.rowSelecting = function (args) {
            _this.IsExpandCollapseClicked(args);
            if (!isNullOrUndefined(args.data) && _this.selectionSettings.persistSelection
                && _this.columnModel.filter(function (col) { return col.type === 'checkbox'; }).length > 0 && isRemoteData(_this)) {
                if (!isNullOrUndefined(args.data.parentItem) || args.isHeaderCheckboxClicked) {
                    _this.parentQuery = _this.query.queries.filter(function (q) { return q.e.field === _this.parentIdMapping; });
                    _this.query.queries = _this.query.queries.slice(0, 0);
                }
            }
            if (_this.pageSettings.pageSizeMode === 'Root') {
                _this.grid.selectionModule['totalRecordsCount'] = _this.grid.currentViewData.length;
            }
            if (!args.cancel) {
                _this.trigger(rowSelecting, args);
            }
        };
        this.grid.rowDeselecting = function (args) {
            _this.IsExpandCollapseClicked(args);
            if (!isNullOrUndefined(args.data) && _this.selectionSettings.persistSelection
                && _this.columnModel.filter(function (col) { return col.type === 'checkbox'; }).length > 0 && isRemoteData(_this)) {
                _this.parentQuery = _this.query.queries.filter(function (q) { return q.e.field === _this.parentIdMapping; });
                _this.query.queries = _this.query.queries.slice(0, 0);
            }
            _this.trigger(rowDeselecting, args);
        };
        this.grid.rowSelected = function (args) {
            if (_this.enableVirtualization) {
                _this.virtualScrollModule.updateSelection(args);
            }
            _this.selectedRowIndex = _this.grid.selectedRowIndex;
            _this.notify(rowSelected, args);
            _this.trigger(rowSelected, args);
        };
        this.grid.rowDeselected = function (args) {
            _this.selectedRowIndex = _this.grid.selectedRowIndex;
            if (!isNullOrUndefined(args.data)) {
                _this.notify(rowDeselected, args);
            }
            _this.trigger(rowDeselected, args);
        };
        this.grid.resizeStop = function (args) {
            _this.updateColumnModel();
            _this.trigger(resizeStop, args);
        };
        this.grid.excelQueryCellInfo = function (args) {
            _this.notify('excelCellInfo', args);
            args = _this.dataResults;
        };
        this.grid.pdfQueryCellInfo = function (args) {
            _this.notify('pdfCellInfo', args);
            args = _this.dataResults;
        };
        this.grid.checkBoxChange = function (args) {
            _this.trigger(checkboxChange, args);
        };
        this.grid.pdfExportComplete = this.triggerEvents.bind(this);
        this.grid.excelExportComplete = this.triggerEvents.bind(this);
        this.grid.excelHeaderQueryCellInfo = this.triggerEvents.bind(this);
        this.grid.pdfHeaderQueryCellInfo = this.triggerEvents.bind(this);
        this.grid.dataSourceChanged = this.triggerEvents.bind(this);
        this.grid.recordDoubleClick = this.triggerEvents.bind(this);
        this.grid.cellDeselected = this.triggerEvents.bind(this);
        this.grid.cellDeselecting = this.triggerEvents.bind(this);
        this.grid.columnMenuOpen = this.triggerEvents.bind(this);
        this.grid.columnMenuClick = this.triggerEvents.bind(this);
        this.grid.cellSelected = this.triggerEvents.bind(this);
        this.grid.headerCellInfo = this.triggerEvents.bind(this);
        this.grid.resizeStart = this.triggerEvents.bind(this);
        this.grid.resizing = this.triggerEvents.bind(this);
        this.grid.columnDrag = this.triggerEvents.bind(this);
        this.grid.columnDragStart = this.triggerEvents.bind(this);
        this.grid.columnDrop = this.triggerEvents.bind(this);
        this.grid.beforePrint = this.triggerEvents.bind(this);
        this.grid.beforeCopy = this.triggerEvents.bind(this);
        this.grid.beforePaste = function (args) {
            var rows = _this.getRows();
            var rowIndex = 'rowIndex';
            while (rows[args["" + rowIndex]].classList.contains('e-summaryrow')) {
                args["" + rowIndex]++;
            }
            _this.trigger(beforePaste, args);
        };
        this.grid.load = function () {
            _this.grid.on('initial-end', _this.afterGridRender, _this);
            if (!isNullOrUndefined(_this.loggerModule)) {
                var loggerModule = 'loggerModule';
                _this.loggerModule = _this.grid["" + loggerModule] = new Logger(_this.grid);
            }
        };
        this.grid.printComplete = this.triggerEvents.bind(this);
        this.grid.actionFailure = function (args) {
            _this.trigger(actionFailure, args);
        };
        this.extendedGridDataBoundEvent();
        this.extendedGridEvents();
        this.extendedGridActionEvents();
        this.extendedGridEditEvents();
        this.bindGridDragEvents();
        this.bindCallBackEvents();
    };
    TreeGrid.prototype.lastRowBorder = function (visiblerow, isAddBorder) {
        for (var j = 0; j < visiblerow.cells.length; j++) {
            if (isAddBorder) {
                addClass([visiblerow.cells[parseInt(j.toString(), 10)]], 'e-lastrowcell');
            }
            else {
                removeClass([visiblerow.cells[parseInt(j.toString(), 10)]], 'e-lastrowcell');
            }
        }
    };
    TreeGrid.prototype.isPixelHeight = function () {
        if (this.height !== 'auto' && this.height.toString().indexOf('%') === -1) {
            return true;
        }
        else {
            return false;
        }
    };
    TreeGrid.prototype.extendedGridDataBoundEvent = function () {
        var _this = this;
        this.grid.dataBound = function (args) {
            _this.updateRowTemplate();
            _this.updateColumnModel();
            _this.updateAltRow(_this.getRows());
            _this.notify('dataBoundArg', args);
            if (isRemoteData(_this) && !isOffline(_this) && !_this.hasChildMapping) {
                var req = void 0;
                if (_this.dataResults.result) {
                    req = 0;
                }
                else {
                    req = 1;
                }
                setValue('grid.contentModule.isLoaded', !(req > 0), _this);
            }
            if (_this.isPixelHeight() && _this.initialRender) {
                var rows = _this.getContentTable().rows;
                var totalRows = [].slice.call(rows);
                for (var i = totalRows.length - 1; i > 0; i--) {
                    if (!isHidden(totalRows[parseInt(i.toString(), 10)])) {
                        if (totalRows[parseInt(i.toString(), 10)].nextElementSibling) {
                            _this.lastRowBorder(totalRows[parseInt(i.toString(), 10)], true);
                        }
                        break;
                    }
                }
            }
            var action = 'action';
            if (_this.enableVirtualization && _this.selectionSettings.persistSelection && (_this.dataResults["" + action] === 'expand' || _this.dataResults["" + action] === 'collapse')) {
                var refreshPersistSelection = 'refreshPersistSelection';
                _this.grid.selectionModule["" + refreshPersistSelection]();
                if (_this.grid.selectionSettings.type === 'Single') {
                    var updateRowSelection = 'updateRowSelection';
                    var index = _this.getCurrentViewRecords().indexOf(_this.grid.selectionModule['data']);
                    _this.grid.selectionModule["" + updateRowSelection](_this.getRows()[parseInt(index.toString(), 10)], index);
                }
            }
            if (_this.enableVirtualization && _this.selectionSettings.persistSelection
                && !isNullOrUndefined(_this.virtualScrollModule.prevSelectedRecord)) {
                for (var i = 0; i < _this.virtualScrollModule.prevSelectedRecord.length; i++) {
                    var updateRowSelection = 'updateRowSelection';
                    var index = 
                    // eslint-disable-next-line max-len
                    _this.getCurrentViewRecords().indexOf(_this.virtualScrollModule.prevSelectedRecord[parseInt(i.toString(), 10)]);
                    _this.grid.selectionModule["" + updateRowSelection](_this.getRows()[parseInt(index.toString(), 10)], index);
                }
            }
            _this.trigger(dataBound, args);
            _this.initialRender = false;
        };
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var treeGrid = this;
        this.grid.beforeDataBound = function (args) {
            var dataSource = 'dataSource';
            var requestType = getObject('action', args);
            if (((isRemoteData(treeGrid) && !isOffline(treeGrid)) || isCountRequired(this)) && requestType !== 'edit') {
                treeGrid.notify('updateRemoteLevel', args);
                args = (treeGrid.dataResults);
            }
            else if (treeGrid.flatData.length === 0 && isOffline(treeGrid) && treeGrid.dataSource instanceof DataManager) {
                var dm = treeGrid.dataSource;
                treeGrid.dataModule.convertToFlatData(dm.dataSource.json);
                args.result = treeGrid.grid.dataSource["" + dataSource].json = treeGrid.flatData;
            }
            if (!isRemoteData(treeGrid) && !isCountRequired(this) && !isNullOrUndefined(treeGrid.dataSource)) {
                if (this.isPrinting) {
                    setValue('isPrinting', true, args);
                }
                treeGrid.notify('dataProcessor', args);
                //args = treeGrid.dataModule.dataProcessor(args);
            }
            extend$1(args, treeGrid.dataResults);
            if (treeGrid.enableImmutableMode) {
                args.result = args.result.slice();
            }
            if (treeGrid.initialRender) {
                this.contentModule.objectEqualityChecker = treeGrid.objectEqualityChecker;
            }
            // treeGrid.notify(events.beforeDataBound, args);
            if (!this.isPrinting) {
                var callBackPromise_1 = new Deferred();
                treeGrid.trigger(beforeDataBound, args, function (beforeDataBoundArgs) {
                    callBackPromise_1.resolve(beforeDataBoundArgs);
                });
                return callBackPromise_1;
            }
        };
        this.grid.log = function (type, args) {
            if (_this.loggerModule) {
                _this.loggerModule.log(type, args);
            }
        };
    };
    TreeGrid.prototype.bindCallBackEvents = function () {
        var _this = this;
        this.grid.toolbarClick = function (args) {
            if ((args.item.id === _this.grid.element.id + '_excelexport' && _this.allowExcelExport === false) ||
                (args.item.id === _this.grid.element.id + '_pdfexport' && _this.allowPdfExport === false) ||
                (args.item.id === _this.grid.element.id + '_csvexport' && _this.allowExcelExport === false)) {
                return;
            }
            var callBackPromise = new Deferred();
            _this.trigger(toolbarClick, args, function (toolbarargs) {
                if (!toolbarargs.cancel) {
                    _this.notify(toolbarClick, args);
                }
                callBackPromise.resolve(toolbarargs);
            });
            return callBackPromise;
        };
        this.grid.cellSelecting = function (args) {
            var actualTarget = 'actualTarget';
            var target = _this.grid.selectionModule["" + actualTarget];
            if (!isNullOrUndefined(target) && (target.classList.contains('e-treegridexpand') || target.classList.contains('e-treegridcollapse'))) {
                args.cancel = true;
            }
            var callBackPromise = new Deferred();
            _this.trigger(getObject('name', args), args, function (cellselectingArgs) {
                callBackPromise.resolve(cellselectingArgs);
            });
            return callBackPromise;
        };
        this.grid.beginEdit = function (args) {
            if (!isNullOrUndefined(args.row) && args.row.classList.contains('e-summaryrow')) {
                args.cancel = true;
                return;
            }
            var callBackPromise = new Deferred();
            _this.trigger(beginEdit, args, function (begineditArgs) {
                callBackPromise.resolve(begineditArgs);
            });
            return callBackPromise;
        };
    };
    TreeGrid.prototype.extendedGridEditEvents = function () {
        var _this = this;
        this.grid.dataStateChange = function (args) {
            if (_this.isExpandRefresh) {
                _this.isExpandRefresh = false;
                _this.grid.dataSource = { result: _this.flatData, count: getValue('count', _this.grid.dataSource) };
            }
            else {
                if (args.action.requestType !== 'infiniteScroll') {
                    _this.infiniteScrollData = [];
                }
                _this.trigger(dataStateChange, args);
            }
        };
        this.grid.cellSave = function (args) {
            if (_this.grid.isContextMenuOpen()) {
                var contextitems = _this.grid.contextMenuModule.contextMenu.element.getElementsByClassName('e-selected')[0];
                if ((isNullOrUndefined(contextitems) || contextitems.id !== _this.element.id + '_gridcontrol_cmenu_Save')) {
                    args.cancel = true;
                }
            }
            var callBackPromise = new Deferred();
            _this.trigger(cellSave, args, function (cellsaveArgs) {
                if (!cellsaveArgs.cancel) {
                    _this.notify(cellSave, cellsaveArgs);
                }
                callBackPromise.resolve(cellsaveArgs);
            });
            return callBackPromise;
        };
        this.grid.cellSaved = function (args) {
            _this.trigger(cellSaved, args);
            _this.notify(cellSaved, args);
        };
        this.grid.cellEdit = function (args) {
            var prom = 'promise';
            var promise = new Deferred();
            args["" + prom] = promise;
            _this.notify(cellEdit, args);
            return promise;
        };
        this.grid.batchAdd = function (args) {
            _this.trigger(batchAdd, args);
            _this.notify(batchAdd, args);
        };
        this.grid.beforeBatchSave = function (args) {
            _this.trigger(beforeBatchSave, args);
            _this.notify(beforeBatchSave, args);
        };
        this.grid.beforeBatchAdd = function (args) {
            _this.trigger(beforeBatchAdd, args);
            _this.notify(beforeBatchAdd, args);
        };
        this.grid.batchDelete = function (args) {
            _this.trigger(batchDelete, args);
            _this.notify(batchDelete, args);
        };
        this.grid.beforeBatchDelete = function (args) {
            _this.trigger(beforeBatchDelete, args);
            _this.notify(beforeBatchDelete, args);
        };
        this.grid.batchCancel = function (args) {
            if (_this.editSettings.mode !== 'Cell') {
                _this.trigger(batchCancel, args);
            }
            _this.notify(batchCancel, args);
        };
    };
    TreeGrid.prototype.updateRowTemplate = function () {
        var _this = this;
        if (this.rowTemplate) {
            if (this.isReact && this.getContentTable().rows.length === 0) {
                setTimeout(function () {
                    _this.treeColumnRowTemplate();
                    if (_this.enableCollapseAll) {
                        var currentData = _this.getCurrentViewRecords();
                        var rows = _this.getContentTable().rows;
                        for (var i = 0; i < rows.length; i++) {
                            var args = { data: currentData[parseInt(i.toString(), 10)],
                                row: rows[parseInt(i.toString(), 10)] };
                            _this.renderModule.RowModifier(args);
                        }
                    }
                }, 0);
            }
            else {
                this.treeColumnRowTemplate();
            }
        }
    };
    TreeGrid.prototype.bindedDataSource = function () {
        var dataSource = 'dataSource';
        var isDataAvailable = 'isDataAvailable';
        var adaptor = 'adaptor';
        var ready = 'ready';
        if (this.dataSource && isCountRequired(this)) {
            var data = this.flatData;
            var datacount = getValue('count', this.dataSource);
            this.grid.dataSource = { result: data, count: datacount };
        }
        else {
            this.grid.dataSource = !(this.dataSource instanceof DataManager) ?
                this.flatData : new DataManager(this.dataSource.dataSource, this.dataSource.defaultQuery, this.dataSource.adaptor);
        }
        if (this.dataSource instanceof DataManager && (this.dataSource.dataSource.offline || this.dataSource.ready)) {
            this.grid.dataSource["" + dataSource].json = extendArray(this.dataSource["" + dataSource].json);
            this.grid.dataSource["" + ready] = this.dataSource.ready;
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var proxy_1 = this;
            if (!isNullOrUndefined(this.grid.dataSource["" + ready])) {
                this.grid.dataSource["" + ready].then(function (e) {
                    var dm = proxy_1.grid.dataSource;
                    dm["" + dataSource].offline = true;
                    dm["" + isDataAvailable] = true;
                    dm["" + dataSource].json = e.result;
                    dm["" + adaptor] = new JsonAdaptor();
                });
            }
        }
    };
    TreeGrid.prototype.extendedGridActionEvents = function () {
        var _this = this;
        this.grid.actionBegin = function (args) {
            if (args.requestType === 'sorting' && args.target && args.target.parentElement &&
                args.target.parentElement.classList.contains('e-hierarchycheckbox')) {
                args.cancel = true;
            }
            var requestType = getObject('requestType', args);
            if (requestType === 'reorder') {
                _this.notify('getColumnIndex', {});
            }
            if (isRemoteData(_this) && _this.enableVirtualization) {
                if (args.requestType === 'virtualscroll') {
                    _this.query.expand('VirtualScrollingAction');
                    _this.showSpinner();
                }
                else if (args.requestType === 'searching' && args.searchString === '') {
                    _this.query.expand('ClearSearchingAction');
                }
                else if (args.action === 'clearFilter') {
                    _this.query.expand('ClearFilteringAction');
                }
            }
            _this.notify('actionBegin', { editAction: args });
            if (!isRemoteData(_this) && !isNullOrUndefined(_this.filterModule) && !isCountRequired(_this)
                && (_this.grid.filterSettings.columns.length === 0 && _this.grid.searchSettings.key.length === 0)) {
                _this.notify('clearFilters', { flatData: _this.grid.dataSource });
                _this.grid.setProperties({ dataSource: _this.dataResults.result }, true);
                if (isNullOrUndefined(_this.grid['changedProperties'].dataSource)) {
                    _this.grid.renderModule.data.dataManager = _this.grid.dataSource instanceof DataManager ?
                        _this.grid.dataSource :
                        (isNullOrUndefined(_this.grid.dataSource) ? new DataManager() : new DataManager(_this.grid.dataSource));
                    _this.grid.renderModule.data.isQueryInvokedFromData = true;
                    _this.grid.query = _this.grid.query instanceof Query ? _this.grid.query : new Query();
                }
            }
            if (_this.action !== 'indenting' && _this.action !== 'outdenting') {
                var callBackPromise_2 = new Deferred();
                _this.trigger(actionBegin, args, function (actionArgs) {
                    if (!actionArgs.cancel) {
                        _this.notify(beginEdit, actionArgs);
                    }
                    callBackPromise_2.resolve(actionArgs);
                });
                return callBackPromise_2;
            }
        };
        this.grid.actionComplete = function (args) {
            _this.notify('actioncomplete', args);
            _this.updateColumnModel();
            _this.updateTreeGridModel();
            if (args.requestType === 'reorder') {
                _this.notify('setColumnIndex', {});
            }
            _this.notify('actionComplete', { editAction: args });
            if (args.requestType === 'add' && (_this.editSettings.newRowPosition !== 'Top' && _this.editSettings.newRowPosition !== 'Bottom')) {
                _this.notify(beginAdd, args);
            }
            if (args.requestType === 'batchsave') {
                _this.notify(batchSave, args);
            }
            _this.notify('updateGridActions', args);
            if (args.requestType === 'save' && _this.aggregates.map(function (ag) { return ag.showChildSummary === true; }).length) {
                _this.grid.refresh();
            }
            if (args.action === 'filter') {
                if (_this.filterModule['currentFilterObject'] !== '' && _this.enableVirtualization && !_this.initialRender && !(isRemoteData(_this) && _this.enableVirtualization)) {
                    _this.expandAll();
                }
            }
            if (args.requestType === 'searching') {
                if (_this.searchSettings.key !== '' && _this.enableVirtualization && !_this.initialRender && !(isRemoteData(_this) && _this.enableVirtualization)) {
                    _this.expandAll();
                }
            }
            if (args.action === 'clearFilter' && _this.enableCollapseAll) {
                _this.collapseAll();
            }
            if (_this.action === 'indenting' || _this.action === 'outdenting') {
                _this.action = _this.action === 'indenting' ? 'indented' : 'outdented';
                var selectedItem_1 = [_this.selectedRecords];
                var actionArgs = {
                    data: selectedItem_1,
                    dropIndex: _this.dropIndex,
                    dropPosition: _this.dropPosition,
                    modifiedRecords: _this.modifiedRecords,
                    requestType: _this.action,
                    row: _this.selectedRows
                };
                _this.trigger(actionComplete, actionArgs);
                var currentPageItem = _this.getCurrentViewRecords().filter(function (e) {
                    return e.uniqueID === selectedItem_1[0].uniqueID;
                });
                if (!currentPageItem.length) {
                    _this.refreshToolbarItems();
                }
                _this.action = '';
                _this.selectedRecords = _this.selectedRows = _this.modifiedRecords = [];
            }
            else {
                if (_this.grid.isFrozenGrid() && _this.enableVirtualization && args['tableName'] === 'movable') {
                    var movableContent$1 = _this.grid.element.querySelector('.' + movableContent);
                    var frozenContent$1 = _this.grid.element.querySelector('.' + frozenContent);
                    movableContent$1.style.height = frozenContent$1.style.height = 'auto';
                }
                _this.trigger(actionComplete, args);
            }
        };
    };
    TreeGrid.prototype.extendedGridEvents = function () {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var treeGrid = this;
        this.grid.recordDoubleClick = function (args) {
            _this.trigger(recordDoubleClick, args);
            _this.notify(recordDoubleClick, args);
        };
        this.grid.detailDataBound = function (args) {
            _this.notify('detaildataBound', args);
            _this.trigger(detailDataBound, args);
        };
        this.grid.rowDataBound = function (args) {
            if (isNullOrUndefined(this.isPrinting)) {
                setValue('isPrinting', false, args);
            }
            else {
                setValue('isPrinting', this.isPrinting, args);
            }
            treeGrid.renderModule.RowModifier(args);
        };
        this.grid.queryCellInfo = function (args) {
            if (isNullOrUndefined(this.isPrinting)) {
                setValue('isPrinting', false, args);
            }
            else {
                setValue('isPrinting', this.isPrinting, args);
            }
            treeGrid.renderModule.cellRender(args);
        };
        this.grid.contextMenuClick = function (args) {
            _this.notify(contextMenuClick, args);
            _this.trigger(contextMenuClick, args);
        };
        this.grid.contextMenuOpen = function (args) {
            _this.notify(contextMenuOpen, args);
            _this.trigger(contextMenuOpen, args);
        };
        this.grid.queryCellInfo = function (args) {
            _this.renderModule.cellRender(args);
        };
    };
    TreeGrid.prototype.bindGridDragEvents = function () {
        var _this = this;
        this.grid.rowDragStartHelper = function (args) {
            _this.trigger(rowDragStartHelper, args);
        };
        this.grid.rowDragStart = function (args) {
            _this.trigger(rowDragStart, args);
        };
        this.grid.rowDrag = function (args) {
            if (_this.grid.isEdit) {
                args.cancel = true;
                return;
            }
            _this.notify(rowdraging, args);
            _this.trigger(rowDrag, args);
        };
        this.grid.rowDrop = function (args) {
            if (_this.grid.isEdit) {
                args.cancel = true;
                return;
            }
            _this.notify(rowDropped, args);
            args.cancel = true;
        };
    };
    /**
     * Renders TreeGrid component
     *
     * @private
     * @returns {void}
     */
    TreeGrid.prototype.loadGrid = function () {
        this.bindGridProperties();
        this.bindGridEvents();
        setValue('registeredTemplate', this.registeredTemplate, this.grid);
        var ref = 'viewContainerRef';
        setValue('viewContainerRef', this["" + ref], this.grid);
    };
    /**
     * AutoGenerate TreeGrid columns from first record
     *
     * @hidden
     * @returns {void}
     */
    TreeGrid.prototype.autoGenerateColumns = function () {
        if (!this.columns.length && (!this.dataModule.isRemote() && Object.keys(this.dataSource).length)) {
            this.columns = [];
            // if (this.dataSource instanceof DataManager) {
            //   record = (<DataManager>this.dataSource).dataSource.json[0];
            // } else {
            var record = this.dataSource[0];
            // }
            var keys = Object.keys(record);
            for (var i = 0; i < keys.length; i++) {
                if ([this.childMapping, this.parentIdMapping].indexOf(keys[parseInt(i.toString(), 10)]) === -1) {
                    this.columns.push(keys[parseInt(i.toString(), 10)]);
                }
            }
        }
    };
    TreeGrid.prototype.getGridEditSettings = function () {
        var edit = {};
        var guid = 'guid';
        edit.allowAdding = this.editSettings.allowAdding;
        edit.allowEditing = this.editSettings.allowEditing;
        edit.allowDeleting = this.editSettings.allowDeleting;
        edit.newRowPosition = this.editSettings.newRowPosition === 'Bottom' ? 'Bottom' : 'Top';
        edit.allowEditOnDblClick = this.editSettings.allowEditOnDblClick;
        edit.showConfirmDialog = this.editSettings.showConfirmDialog;
        edit.template = this.editSettings.template;
        edit.showDeleteConfirmDialog = this.editSettings.showDeleteConfirmDialog;
        edit.allowNextRowEdit = this.editSettings.allowNextRowEdit;
        edit["" + guid] = this.editSettings["" + guid];
        edit.dialog = this.editSettings.dialog;
        switch (this.editSettings.mode) {
            case 'Dialog':
                edit.mode = this.editSettings.mode;
                break;
            case 'Batch':
                edit.mode = this.editSettings.mode;
                break;
            case 'Row':
                edit.mode = 'Normal';
                break;
            case 'Cell':
                edit.mode = 'Normal';
                edit.showConfirmDialog = false;
                break;
        }
        return edit;
    };
    /**
     * Defines grid toolbar from treegrid toolbar model
     *
     * @hidden
     * @returns {Object[]} - returns context menu items
     */
    TreeGrid.prototype.getContextMenu = function () {
        if (this.contextMenuItems) {
            var items = [];
            for (var i = 0; i < this.contextMenuItems.length; i++) {
                switch (this.contextMenuItems[parseInt(i.toString(), 10)]) {
                    case 'AddRow':
                    case ContextMenuItems.AddRow:
                        items.push({ text: this.l10n.getConstant('AddRow'),
                            target: '.e-content', id: this.element.id + '_gridcontrol_cmenu_AddRow',
                            items: [{ text: this.l10n.getConstant('Above'), id: 'Above' }, { text: this.l10n.getConstant('Below'), id: 'Below' }, { text: this.l10n.getConstant('Child'), id: 'Child' }] });
                        break;
                    case 'Indent':
                    case ContextMenuItems.RowIndent:
                        items.push({ text: this.l10n.getConstant('RowIndent'),
                            target: '.e-content', iconCss: 'e-indent e-icons', id: this.element.id + '_gridcontrol_cmenu_Indent' });
                        break;
                    case 'Outdent':
                    case ContextMenuItems.RowOutdent:
                        items.push({ text: this.l10n.getConstant('RowOutdent'),
                            target: '.e-content', iconCss: 'e-outdent e-icons', id: this.element.id + '_gridcontrol_cmenu_Outdent' });
                        break;
                    default:
                        items.push(this.contextMenuItems[parseInt(i.toString(), 10)]);
                }
            }
            return items;
        }
        else {
            return null;
        }
    };
    /**
     * Defines grid toolbar from treegrid toolbar model
     *
     * @hidden
     * @returns {Object[]} - Returns toolbar items
     */
    TreeGrid.prototype.getGridToolbar = function () {
        if (this.toolbar) {
            this.l10n = new L10n('treegrid', this.defaultLocale, this.locale);
            var items = [];
            var tooltipText = void 0;
            for (var i = 0; i < this.toolbar.length; i++) {
                switch (this.toolbar[parseInt(i.toString(), 10)]) {
                    case 'Search':
                    case ToolbarItem.Search:
                        items.push('Search');
                        break;
                    case 'Print':
                    case ToolbarItem.Print:
                        items.push('Print');
                        break;
                    case 'ExpandAll':
                    case ToolbarItem.ExpandAll:
                        tooltipText = this.l10n.getConstant('ExpandAll');
                        items.push({ text: tooltipText, tooltipText: tooltipText,
                            prefixIcon: 'e-expand', id: this.element.id + '_gridcontrol_expandall' });
                        break;
                    case 'CollapseAll':
                    case ToolbarItem.CollapseAll:
                        tooltipText = this.l10n.getConstant('CollapseAll');
                        items.push({ text: tooltipText,
                            tooltipText: tooltipText, prefixIcon: 'e-collapse', id: this.element.id + '_gridcontrol_collapseall'
                        });
                        break;
                    case 'Indent':
                    case ToolbarItem.RowIndent:
                        tooltipText = this.l10n.getConstant('RowIndent');
                        items.push({
                            text: tooltipText, tooltipText: tooltipText,
                            prefixIcon: 'e-indent', id: this.element.id + '_gridcontrol_indent'
                        });
                        break;
                    case 'Outdent':
                    case ToolbarItem.RowOutdent:
                        tooltipText = this.l10n.getConstant('RowOutdent');
                        items.push({
                            text: tooltipText, tooltipText: tooltipText,
                            prefixIcon: 'e-outdent', id: this.element.id + '_gridcontrol_outdent'
                        });
                        break;
                    default:
                        items.push(this.toolbar[parseInt(i.toString(), 10)]);
                }
            }
            return items;
        }
        else {
            return null;
        }
    };
    TreeGrid.prototype.getGridColumns = function (columns, isEmptyColumnModel, index) {
        if (isEmptyColumnModel === void 0) { isEmptyColumnModel = true; }
        if (index === void 0) { index = 0; }
        var column = columns;
        var stackedColumn = 'columns';
        if (isEmptyColumnModel) {
            this.columnModel = [];
        }
        var treeGridColumn;
        var gridColumn;
        if (this.columnModel.length === 0) {
            index = index === 0 ? -1 : index;
        }
        var gridColumnCollection = [];
        for (var i = 0; i < column.length; i++) {
            index = index + 1;
            var treeColumn = this.grid.getColumnByUid(column[parseInt(i.toString(), 10)].uid);
            gridColumn = treeColumn ? treeColumn : {};
            treeGridColumn = {};
            if (typeof this.columns[parseInt(i.toString(), 10)] === 'string') {
                gridColumn.field = treeGridColumn.field = this.columns[parseInt(i.toString(), 10)];
            }
            else {
                for (var _i = 0, _a = Object.keys(column[parseInt(i.toString(), 10)]); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    if (index === this.treeColumnIndex && prop === 'template') {
                        treeGridColumn["" + prop] = column[parseInt(i.toString(), 10)]["" + prop];
                    }
                    else if (prop === 'columns' && !isNullOrUndefined(column[parseInt(i.toString(), 10)]["" + prop])) {
                        gridColumn["" + prop] = this.getGridColumns(column[parseInt(i.toString(), 10)]["" + prop], false, this.columnModel.length - 1);
                        treeGridColumn["" + prop] = column[parseInt(i.toString(), 10)]["" + prop];
                    }
                    else if (this.initialRender && !isNullOrUndefined(treeColumn) && this.enablePersistence && prop === 'edit') {
                        gridColumn["" + prop] = treeGridColumn["" + prop] = treeColumn["" + prop];
                    }
                    else if (!(treeColumn) || prop !== 'sortComparer') {
                        gridColumn["" + prop] = treeGridColumn["" + prop] = column[parseInt(i.toString(), 10)]["" + prop];
                    }
                }
            }
            if (!treeGridColumn["" + stackedColumn]) {
                this.columnModel.push(new Column(treeGridColumn));
            }
            gridColumnCollection.push(gridColumn);
            if (!isNullOrUndefined(this.columnModel[this.treeColumnIndex]) && this.enableRtl) {
                if (gridColumn.field === this.columnModel[this.treeColumnIndex].field) {
                    if (isNullOrUndefined(this.treeColumnTextAlign)) {
                        this.treeColumnTextAlign = this.columnModel[this.treeColumnIndex].textAlign;
                        this.treeColumnField = this.columnModel[this.treeColumnIndex].field;
                    }
                    gridColumn.textAlign = 'Right';
                }
            }
        }
        return gridColumnCollection;
    };
    TreeGrid.prototype.lastRowCellBorderUpdated = function () {
        var rows = this.getContentTable().querySelectorAll('tr.e-row');
        var visibleRows = Array.from(rows).filter(function (row) { return !row.classList.contains('e-childrow-hidden'); });
        if (visibleRows.length > 0) {
            var lastVisibleRow = visibleRows[visibleRows.length - 1];
            this.lastRowBorder(lastVisibleRow, true);
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {TreeGridModel} newProp - properties details which has to be modified
     * @hidden
     * @returns {void}
     */
    TreeGrid.prototype.onPropertyChanged = function (newProp) {
        var properties = Object.keys(newProp);
        var requireRefresh = false;
        if (properties.indexOf('columns') > -1 && !isNullOrUndefined(newProp.columns)) {
            this.refreshColumns();
        }
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            switch (prop) {
                case 'treeColumnIndex':
                    this.grid.refreshColumns();
                    break;
                case 'allowPaging':
                    this.grid.allowPaging = this.allowPaging;
                    break;
                case 'pageSettings':
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    this.grid.pageSettings = getActualProperties(this.pageSettings);
                    requireRefresh = true;
                    break;
                case 'enableVirtualization':
                    this.grid.enableVirtualization = this.enableVirtualization;
                    break;
                case 'enableColumnVirtualization':
                    this.grid.enableColumnVirtualization = this.enableColumnVirtualization;
                    break;
                case 'toolbar':
                    this.grid.toolbar = this.getGridToolbar();
                    break;
                case 'allowSelection':
                    this.grid.allowSelection = this.allowSelection;
                    break;
                case 'selectionSettings':
                    this.grid.selectionSettings = getActualProperties(this.selectionSettings);
                    break;
                case 'allowSorting':
                    this.grid.allowSorting = this.allowSorting;
                    break;
                case 'allowMultiSorting':
                    this.grid.allowMultiSorting = this.allowMultiSorting;
                    break;
                case 'sortSettings':
                    this.grid.sortSettings = getActualProperties(this.sortSettings);
                    break;
                case 'searchSettings':
                    this.grid.searchSettings = getActualProperties(this.searchSettings);
                    break;
                case 'allowFiltering':
                    this.grid.allowFiltering = this.allowFiltering;
                    break;
                case 'filterSettings':
                    if (!this.initialRender) {
                        this.grid.filterSettings = getActualProperties(this.filterSettings);
                    }
                    break;
                case 'showColumnMenu':
                    this.grid.showColumnMenu = this.showColumnMenu;
                    break;
                case 'allowRowDragAndDrop':
                    this.grid.allowRowDragAndDrop = this.allowRowDragAndDrop;
                    break;
                case 'aggregates':
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    this.grid.aggregates = getActualProperties(this.aggregates);
                    break;
                case 'enableInfiniteScrolling':
                    this.grid.enableInfiniteScrolling = this.enableInfiniteScrolling;
                    break;
                case 'dataSource':
                    this.isLocalData = (!(this.dataSource instanceof DataManager) || (!isNullOrUndefined(this.dataSource.ready))
                        || this.dataSource.adaptor instanceof RemoteSaveAdaptor);
                    this.convertTreeData(this.dataSource);
                    if (this.isLocalData) {
                        if (isCountRequired(this)) {
                            var count = getValue('count', this.dataSource);
                            this.grid.dataSource = { result: this.flatData, count: count };
                        }
                        else {
                            var data = this.dataSource;
                            this.grid.dataSource = !(data instanceof DataManager) ?
                                this.flatData : new DataManager(data.dataSource, data.defaultQuery, data.adaptor);
                        }
                        if (this.enableVirtualization) {
                            this.grid.contentModule.isDataSourceChanged = true;
                        }
                    }
                    else {
                        this.bindedDataSource();
                        if (this.enableVirtualization) {
                            this.grid.contentModule.removeEventListener();
                            this.grid.contentModule.eventListener('on');
                            this.grid.contentModule.renderTable();
                        }
                    }
                    break;
                case 'query':
                    this.grid.query = this.query;
                    break;
                case 'enableCollapseAll':
                    if (newProp["" + prop]) {
                        this.collapseAll();
                    }
                    else {
                        this.expandAll();
                    }
                    break;
                case 'expandStateMapping':
                    this.grid.refresh();
                    break;
                case 'gridLines':
                    this.grid.gridLines = this.gridLines;
                    break;
                case 'rowTemplate':
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    this.grid.rowTemplate = getActualProperties(this.rowTemplate);
                    break;
                case 'frozenRows':
                    this.grid.frozenRows = this.frozenRows;
                    break;
                case 'frozenColumns':
                    this.grid.frozenColumns = this.frozenColumns;
                    break;
                case 'rowHeight':
                    this.grid.rowHeight = this.rowHeight;
                    break;
                case 'height':
                    if (!isNullOrUndefined(this.height) && typeof (this.height) === 'string' && this.height.indexOf('%') !== -1) {
                        this.element.style.height = this.height;
                    }
                    this.grid.height = this.height;
                    break;
                case 'width':
                    if (!isNullOrUndefined(this.width) && typeof (this.width) === 'string' && this.width.indexOf('%') !== -1) {
                        this.element.style.width = this.width;
                    }
                    this.grid.width = this.width;
                    break;
                case 'locale':
                    this.grid.locale = this.locale;
                    this.TreeGridLocale();
                    this.grid.toolbar = this.getGridToolbar();
                    this.grid.contextMenuItems = this.getContextMenu();
                    break;
                case 'selectedRowIndex':
                    this.grid.selectedRowIndex = this.selectedRowIndex;
                    break;
                case 'enableAltRow':
                    this.grid.enableAltRow = this.enableAltRow;
                    break;
                case 'enableHover':
                    this.grid.enableHover = this.enableHover;
                    break;
                case 'enableAutoFill':
                    this.grid.enableAutoFill = this.enableAutoFill;
                    break;
                case 'enableAdaptiveUI':
                    this.grid.enableAdaptiveUI = this.enableAdaptiveUI;
                    break;
                case 'enableImmutableMode':
                    this.grid.enableImmutableMode = this.enableImmutableMode;
                    break;
                case 'allowExcelExport':
                    this.grid.allowExcelExport = this.allowExcelExport;
                    break;
                case 'allowPdfExport':
                    this.grid.allowPdfExport = this.allowPdfExport;
                    break;
                case 'enableRtl':
                    if (!isNullOrUndefined(this.treeColumnField)) {
                        this.updateTreeColumnTextAlign();
                    }
                    this.grid.enableRtl = this.enableRtl;
                    break;
                case 'allowReordering':
                    this.grid.allowReordering = this.allowReordering;
                    break;
                case 'allowResizing':
                    this.grid.allowResizing = this.allowResizing;
                    break;
                case 'textWrapSettings':
                    this.grid.textWrapSettings = getActualProperties(this.textWrapSettings);
                    break;
                case 'allowTextWrap':
                    this.grid.allowTextWrap = getActualProperties(this.allowTextWrap);
                    this.grid.refresh();
                    break;
                case 'contextMenuItems':
                    this.grid.contextMenuItems = this.getContextMenu();
                    break;
                case 'showColumnChooser':
                    this.grid.showColumnChooser = this.showColumnChooser;
                    break;
                case 'detailTemplate':
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    this.grid.detailTemplate = getActualProperties(this.detailTemplate);
                    break;
                case 'columnMenuItems':
                    this.grid.columnMenuItems = getActualProperties(this.columnMenuItems);
                    break;
                case 'editSettings':
                    if (this.grid.isEdit && this.grid.editSettings.mode === 'Normal' && newProp["" + prop].mode &&
                        (newProp["" + prop].mode === 'Cell' || newProp["" + prop].mode === 'Row')) {
                        this.grid.closeEdit();
                    }
                    this.grid.editSettings = this.getGridEditSettings();
                    break;
            }
            if (requireRefresh) {
                this.grid.refresh();
            }
        }
    };
    TreeGrid.prototype.updateTreeColumnTextAlign = function () {
        var gridColumn = this.grid.getColumnByField(this.treeColumnField);
        gridColumn.textAlign = this.enableRtl ? 'Right' : this.treeColumnTextAlign;
        this.grid.refreshColumns();
    };
    /**
     * Destroys the TreeGrid component by detaching event handlers,
     * removing attributes and classes, and clearing the component's DOM elements.
     *
     * This method ensures that all resources used by the TreeGrid are properly released
     * and the component is cleaned up from the DOM to prevent memory leaks.
     *
     * @method destroy
     * @returns {void}
     */
    TreeGrid.prototype.destroy = function () {
        var treeGridElement = this.element;
        if (!treeGridElement) {
            return;
        }
        var hasTreeGridChild = treeGridElement.querySelector('.' + 'e-gridheader') &&
            treeGridElement.querySelector('.' + 'e-gridcontent') ? true : false;
        if (hasTreeGridChild) {
            this.unwireEvents();
        }
        this.removeListener();
        if (hasTreeGridChild) {
            _super.prototype.destroy.call(this);
        }
        if (this.grid) {
            this.grid.destroy();
        }
        if (this.dataModule) {
            this.dataModule.destroy();
        }
        var modules = ['dataModule', 'sortModule', 'renderModule', 'filterModule', 'printModule', 'clipboardModule',
            'excelExportModule', 'pdfExportModule', 'toolbarModule', 'summaryModule', 'reorderModule', 'resizeModule',
            'pagerModule', 'keyboardModule', 'columnMenuModule', 'contextMenuModule', 'editModule', 'virtualScrollModule',
            'selectionModule', 'detailRow', 'rowDragAndDropModule', 'freezeModule'];
        for (var i = 0; i < modules.length; i++) {
            if (this[modules[parseInt(i.toString(), 10)]]) {
                this[modules[parseInt(i.toString(), 10)]] = null;
            }
        }
        this.element.innerHTML = '';
        this.grid = null;
    };
    /**
     * Updates the TreeGrid model and ensures that the underlying Grid's data model is in sync with TreeGrid.
     * This method binds current data and settings to the TreeGrid.
     *
     * @method dataBind
     * @returns {void}
     * @private
     */
    TreeGrid.prototype.dataBind = function () {
        if (isNullOrUndefined(this.grid)) {
            return;
        }
        if (!isNullOrUndefined(this.rowDropSettings.targetID) &&
            isNullOrUndefined(document.getElementById(this.grid.rowDropSettings.targetID))) {
            document.getElementById(this.rowDropSettings.targetID).id = this.grid.rowDropSettings.targetID;
            this.rowDropSettings.targetID = this.grid.rowDropSettings.targetID;
        }
        _super.prototype.dataBind.call(this);
        this.grid.dataBind();
    };
    /**
     * Retrieves the properties of the TreeGrid that should be retained and persisted between sessions.
     *
     * The method ensures that user preferences and important settings like paging, sorting, filtering,
     * column configurations, etc., are preserved and can be restored when the component is re-initialized.
     *
     * @returns {string} - Returns persist properties details
     * @hidden
     */
    TreeGrid.prototype.getPersistData = function () {
        var keyEntity = ['pageSettings', 'sortSettings',
            'filterSettings', 'columns', 'searchSettings', 'selectedRowIndex', 'treeColumnIndex', 'scrollPosition'];
        var ignoreOnPersist = {
            pageSettings: ['template', 'pageSizes', 'pageSizeMode', 'enableQueryString', 'totalRecordsCount', 'pageCount'],
            filterSettings: ['type', 'mode', 'showFilterBarStatus', 'immediateModeDelay', 'ignoreAccent', 'hierarchyMode'],
            searchSettings: ['fields', 'operator', 'ignoreCase'],
            sortSettings: [], columns: [], selectedRowIndex: [], scrollPosition: []
        };
        var ignoreOnColumn = ['filter', 'edit', 'filterBarTemplate', 'headerTemplate', 'template',
            'commandTemplate', 'commands', 'dataSource'];
        for (var i = 0; i < keyEntity.length; i++) {
            var currentObject = this[keyEntity[parseInt(i.toString(), 10)]];
            for (var k = 0, val = ignoreOnPersist[keyEntity[parseInt(i.toString(), 10)]]; (!isNullOrUndefined(val) && k < val.length); k++) {
                var objVal = val[parseInt(k.toString(), 10)];
                delete currentObject["" + objVal];
            }
        }
        this.ignoreInArrays(ignoreOnColumn, this.columns);
        return this.addOnPersist(keyEntity);
    };
    TreeGrid.prototype.ignoreInArrays = function (ignoreOnColumn, columns) {
        for (var i = 0; i < columns.length; i++) {
            if (columns[parseInt(i.toString(), 10)].columns) {
                this.ignoreInColumn(ignoreOnColumn, columns[parseInt(i.toString(), 10)]);
                this.ignoreInArrays(ignoreOnColumn, columns[parseInt(i.toString(), 10)].columns);
            }
            else {
                this.ignoreInColumn(ignoreOnColumn, columns[parseInt(i.toString(), 10)]);
            }
        }
    };
    TreeGrid.prototype.ignoreInColumn = function (ignoreOnColumn, column) {
        if (isNullOrUndefined(column.template)) {
            for (var i = 0; i < ignoreOnColumn.length; i++) {
                delete column[ignoreOnColumn[parseInt(i.toString(), 10)]];
                column.filter = {};
            }
        }
    };
    TreeGrid.prototype.mouseClickHandler = function (e) {
        var _this = this;
        if (!isNullOrUndefined(e.touches)) {
            return;
        }
        var target = e.target;
        if ((target.classList.contains('e-treegridexpand') ||
            target.classList.contains('e-treegridcollapse')) && (!this.isEditCollapse && !this.grid.isEdit)) {
            this.expandCollapseRequest(target);
        }
        var isEllipsisTooltip = 'isEllipsisTooltip';
        if ((target.classList.contains('e-treegridexpand') || target.classList.contains('e-treegridcollapse')) &&
            (this.grid["" + isEllipsisTooltip]())) {
            this.grid['toolTipObj'].close();
        }
        this.isEditCollapse = false;
        this.notify('checkboxSelection', { target: target });
        if (this.grid.isCheckBoxSelection && !this.grid.isPersistSelection) {
            if (this.aggregates.map(function (ag) { return ag.showChildSummary === true; }).length) {
                var checkedTarget = this.grid.getHeaderContent().querySelector('.e-checkselectall');
                var checkedLen = this.grid.getSelectedRowIndexes().length;
                var totalRecords = this.getCurrentViewRecords().length;
                if (checkedLen === totalRecords) {
                    var spanEle = checkedTarget.nextElementSibling;
                    removeClass([spanEle], ['e-stop', 'e-uncheck']);
                    addClass([spanEle], ['e-check']);
                }
            }
        }
        if (((target.classList.contains('e-flmenu-cancelbtn') || target.classList.contains('e-flmenu-okbtn')
            || target.classList.contains('e-content') || target.classList.contains('e-rowcell'))
            && !isNullOrUndefined(this.grid.filterModule) && this.isReact)) {
            if (!isNullOrUndefined(this.grid.filterModule['column'])) {
                if (this.grid.filterModule['column'].filterTemplate) {
                    var elem = document.getElementById(this.grid.filterModule.filterModule['dlgObj'].element.id);
                    this.grid.filterModule['fltrDlgDetails'].isOpen = false;
                    if (this.grid.filterModule.filterModule['dlgObj'] && !this.grid.filterModule.filterModule['dlgObj'].isDestroyed && elem) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this.clearTemplate(['filterTemplate'], undefined, function () {
                            _this.grid.filterModule.filterModule['dlgObj'].destroy();
                        });
                    }
                }
            }
        }
    };
    /**
     * Retrieves all the TreeGrid row elements.
     *
     * This method is useful for accessing the HTML representation of the rows for further manipulation or inspection.
     *
     * @returns {HTMLTableRowElement[]} - Returns row elements collection
     */
    TreeGrid.prototype.getRows = function () {
        return this.grid.getRows();
    };
    /**
     * Obtains the pager element of the TreeGrid.
     *
     * The pager enables navigation between pages when the TreeGrid displays paginated data.
     *
     * @returns {Element} - Returns pager element
     */
    TreeGrid.prototype.getPager = function () {
        return this.grid.getPager(); //get element from pager
    };
    /**
     * Adds a new record to the TreeGrid at the specified position or default location.
     *
     * @param {Object} data - Object containing the data for the new record. If omitted, an empty row is added.
     * @param {number} index - The index at which the new row should be added.
     * @param {RowPosition} position - Specifies the position of the new row (e.g., before, after or child).
     *
     * > Requires `editSettings.allowAdding` to be true.
     *
     * @returns {void}
     */
    TreeGrid.prototype.addRecord = function (data, index, position) {
        if (this.editModule) {
            var isAddedRowByMethod = 'isAddedRowByMethod';
            this.editModule["" + isAddedRowByMethod] = true;
            this.editModule.addRecord(data, index, position);
        }
    };
    /**
     * Cancels the current edit operation on the TreeGrid.
     *
     * This method discards changes made to the row and exits the edit mode without saving.
     *
     * @returns {void}
     */
    TreeGrid.prototype.closeEdit = function () {
        if (this.grid.editModule) {
            this.editModule['closeEdit']();
        }
    };
    /**
     * Saves the current cell value changes without committing to the data source.
     *
     * This operation persists the changes in the UI but not in the underlying data model.
     *
     * @returns {void}
     */
    TreeGrid.prototype.saveCell = function () {
        if (this.grid.editModule) {
            this.grid.editModule.saveCell();
        }
    };
    /**
     * Updates the value of a specific cell directly, bypassing the edit mode.
     *
     * This method provides a quick way to update the UI and data without user interaction.
     *
     * @param {number} rowIndex Defines the row index.
     * @param {string} field Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to be changed.
     * @returns {void}
     */
    TreeGrid.prototype.updateCell = function (rowIndex, field, value) {
        if (this.grid.editModule) {
            this.grid.editModule.updateCell(rowIndex, field, value);
        }
    };
    /**
     * Updates a specific row with given values directly, skipping the edit state.
     *
     * This method allows for bulk updates of row data programmatically.
     *
     * @param {number} index - The index of the row to update.
     * @param {Object} data - The data object containing updated field values.
     * @returns {void}
     */
    TreeGrid.prototype.updateRow = function (index, data) {
        if (this.grid.editModule) {
            if (!isNullOrUndefined(index)) {
                var griddata = this.grid.getCurrentViewRecords()[parseInt(index.toString(), 10)];
                extend$1(griddata, data);
                this.grid.editModule.updateRow(index, griddata);
            }
            else {
                this.grid.editModule.updateRow(index, data);
            }
        }
    };
    /**
     * Deletes a record based on specified criteria or the selected record if none specified.
     *
     * @param {string} fieldName - The name of the primary key field.
     * @param {Object} data - The data object representing the record to delete.
     * @returns {void}
     *
     * > Requires `editSettings.allowDeleting` to be true.
     */
    TreeGrid.prototype.deleteRecord = function (fieldName, data) {
        if ((isNullOrUndefined(fieldName) && (isNullOrUndefined(data)) || (this.getSelectedRecords().length <= 0))) {
            var error = 'The provided value for the fieldName and data is undefined. Please ensure the fieldName and data contains number.';
            this.trigger(actionFailure, { error: error });
        }
        if (this.grid.editModule) {
            this.grid.editModule.deleteRecord(fieldName, data);
        }
    };
    /**
     * Initiates editing for a specific row using its HTML element.
     *
     * This allows for manual control of which row enters edit mode through the UI.
     *
     * @param {HTMLTableRowElement} row - The table row element to enter into edit mode.
     * @returns {void}
     */
    TreeGrid.prototype.startEdit = function (row) {
        if (this.grid.editModule) {
            this.grid.editModule.startEdit(row);
        }
    };
    /**
     * Begins editing of a specific cell using row and field indices.
     *
     * Customers can programmatically specify which cell to edit without user input.
     *
     * @param {number} rowIndex - The index of the row containing the cell.
     * @param {string} field - The field name of the cell to edit.
     * @returns {void}
     */
    TreeGrid.prototype.editCell = function (rowIndex, field) {
        if (this.editModule) {
            this.editModule.editCell(rowIndex, field);
        }
    };
    /**
     * Enables or disables specified ToolBar items within the TreeGrid.
     *
     * This facilitates dynamic control of toolbar actions based on application logic.
     *
     * @param {string[]} items - Array of ToolBar item IDs to enable or disable.
     * @param {boolean} isEnable - Boolean flag to determine whether to enable (true) or disable (false) items.
     * @returns {void}
     */
    TreeGrid.prototype.enableToolbarItems = function (items, isEnable) {
        if (this.grid.toolbarModule) {
            this.grid.toolbarModule.enableItems(items, isEnable);
        }
    };
    /**
     * Commits the edits made to a record in edit mode, updating the data source.
     *
     * Use this method to finalize changes for rows in edit mode, ensuring persistence.
     *
     * @returns {void}
     */
    TreeGrid.prototype.endEdit = function () {
        if (this.grid.editModule) {
            this.grid.editModule.endEdit();
        }
    };
    /**
     * Displays the column chooser at a specified screen position.
     *
     * Useful for customizing the visibility of columns interactively via the UI.
     *
     * @param {number} x - The X-axis position of the column chooser.
     * @param {number} y - The Y-axis position of the column chooser.
     * @returns {void}
     */
    TreeGrid.prototype.openColumnChooser = function (x, y) {
        if (this.columnChooserModule) {
            this.columnChooserModule.openColumnChooser(x, y);
        }
    };
    /**
     * Deletes a visible row from the TreeGrid using its HTML element.
     *
     * Apply this method when handling row deletions through DOM manipulations.
     *
     * @param {HTMLTableRowElement} tr - The table row element to remove.
     * @returns {void}
     */
    TreeGrid.prototype.deleteRow = function (tr) {
        if (this.grid.editModule) {
            this.grid.editModule.deleteRow(tr);
        }
    };
    /**
     * Retrieves the primary key field names used in the TreeGrid.
     *
     * This information is crucial for identifying and manipulating unique rows.
     *
     * @returns {string[]} - Returns an array of primary key field names.
     */
    TreeGrid.prototype.getPrimaryKeyFieldNames = function () {
        return this.grid.getPrimaryKeyFieldNames();
    };
    /**
     * Updates the value of a specific cell using its primary key for identification.
     *
     * Useful for targeted updates that leverage unique identifiers to ensure accuracy.
     *
     * @param {string| number} key - The primary key value of the row containing the cell.
     * @param {string} field - The field name of the cell to update.
     * @param {string | number | boolean | Date} value - The new value to assign to the specified cell.
     * @returns {void}
     */
    TreeGrid.prototype.setCellValue = function (key, field, value) {
        this.grid.setCellValue(key, field, value);
        var rowIndex = this.grid.getRowIndexByPrimaryKey(key);
        var record = this.getCurrentViewRecords()[parseInt(rowIndex.toString(), 10)];
        editAction({ value: record, action: 'edit' }, this, this.isSelfReference, record.index, this.grid.selectedRowIndex, field);
    };
    /**
     * Updates the data for a specific row identified by its primary key and refreshes the display.
     *
     * Important for keeping the displayed data consistent with the source database or dataset.
     *
     * @param {string| number} key - The primary key value of the row to update.
     * @param {Object} rowData - The new data to apply to the row.
     * @returns {void}
     */
    TreeGrid.prototype.setRowData = function (key, rowData) {
        var currentRecords = this.getCurrentViewRecords();
        var primaryKey = this.grid.getPrimaryKeyFieldNames()[0];
        var level = 0;
        var record = {};
        currentRecords.some(function (value) {
            if (value["" + primaryKey] === key) {
                record = value;
                return true;
            }
            else {
                return false;
            }
        });
        level = record.level;
        rowData.level = level;
        rowData.index = record.index;
        rowData.childRecords = record.childRecords;
        rowData.taskData = record.taskData;
        rowData.uniqueID = record.uniqueID;
        rowData.parentItem = record.parentItem;
        rowData.checkboxState = record.checkboxState;
        rowData.hasChildRecords = record.hasChildRecords;
        rowData.parentUniqueID = record.parentUniqueID;
        rowData.expanded = record.expanded;
        this.grid.setRowData(key, rowData);
        var visibleRecords = this.getVisibleRecords();
        if (visibleRecords.length > 0 && key === (visibleRecords[visibleRecords.length - 1])["" + primaryKey]) {
            var table = this.getContentTable();
            var sHeight = table.scrollHeight;
            var clientHeight = this.getContent().clientHeight;
            this.lastRowBorder(this.getRows()[currentRecords.indexOf(record)], sHeight <= clientHeight);
        }
    };
    /**
     * Navigates to a specified page number within the TreeGrid pagination.
     *
     * This can be used to programmatically change the page being viewed,
     * allowing for scripted navigation through data.
     *
     * @param {number} pageNo - The page number to navigate to. Must be within valid page range.
     * @returns {void}
     */
    TreeGrid.prototype.goToPage = function (pageNo) {
        if (this.grid.pagerModule) {
            this.grid.pagerModule.goToPage(pageNo);
        }
    };
    /**
     * Updates the external message displayed within the pager component.
     *
     * This is useful for showing custom messages or additional information
     * related to the data set or pagination status.
     *
     * @param {string} message - The custom message to display in the pager.
     * @returns {void}
     */
    TreeGrid.prototype.updateExternalMessage = function (message) {
        if (this.pagerModule) {
            this.grid.pagerModule.updateExternalMessage(message);
        }
    };
    /**
     * Retrieves a cell element based on its row and column indices in the TreeGrid.
     *
     * This method is helpful for accessing cell-level elements for custom
     * operations or styling.
     *
     * @param {number} rowIndex - The index of the row containing the cell.
     * @param {number} columnIndex - The index of the column containing the cell.
     * @returns {Element} - Returns the HTML element of the specified cell.
     */
    TreeGrid.prototype.getCellFromIndex = function (rowIndex, columnIndex) {
        return this.grid.getCellFromIndex(rowIndex, columnIndex);
    };
    /**
     * Retrieves a column object by the column's field name.
     *
     * This is typically used for obtaining the details of a column for
     * configuration or data manipulation purposes.
     *
     * @param {string} field - The field name of the column.
     * @returns {Column} - Returns the column object corresponding to the field.
     */
    TreeGrid.prototype.getColumnByField = function (field) {
        return iterateArrayOrObject(this.columnModel, function (item) {
            if (item.field === field) {
                return item;
            }
            return undefined;
        })[0];
    };
    /**
     * Fetches a column object using the column's unique identifier (UID).
     *
     * Useful in scenarios where columns do not have unique field names but
     * are uniquely identifiable via UID.
     *
     * @param {string} uid - The unique identifier for the column.
     * @returns {Column} - Returns the column object for the given UID.
     */
    TreeGrid.prototype.getColumnByUid = function (uid) {
        var Columns = this.initialRender ? this.grid.columns : this.columns;
        var columnModel = 'columnModel';
        if (this.grid.columns.length !== this.columnModel.length) {
            Columns = this.grid["" + columnModel];
        }
        return iterateArrayOrObject(Columns, function (item) {
            if (item.uid === uid) {
                return item;
            }
            return undefined;
        })[0];
    };
    /**
     * Retrieves the names of all column fields in the TreeGrid.
     *
     * This method provides a list of field names useful for dynamic operations
     * or configuration where fields need to be enumerated or manipulated.
     *
     * @returns {string[]} - Returns an array of column field names.
     */
    TreeGrid.prototype.getColumnFieldNames = function () {
        return this.grid.getColumnFieldNames();
    };
    /**
     * Retrieves the footer content element of the TreeGrid, usually for styling or custom manipulation.
     *
     * This can be used to access the footer for adding custom functionality
     * or styling purposes to enhance user interaction at the bottom of the grid.
     *
     * @returns {Element} - Returns the footer content HTML element.
     */
    TreeGrid.prototype.getFooterContent = function () {
        return this.grid.getFooterContent();
    };
    /**
     * Acquires the footer table element of the TreeGrid for layout management.
     *
     * Useful for manipulating the table's structure or style beneath the grid content.
     *
     * @returns {Element} - Returns the footer table HTML element.
     */
    TreeGrid.prototype.getFooterContentTable = function () {
        return this.grid.getFooterContentTable();
    };
    /**
     * Shows one or more columns based on the specified column names.
     *
     * This is useful for dynamically adjusting the visibility of columns
     * based on user actions or application logic.
     *
     * @param {string|string[]} keys - A single column name or an array of column names to show.
     * @param {string} showBy - Key to determine visibility either as field name or header text.
     * @returns {void}
     */
    TreeGrid.prototype.showColumns = function (keys, showBy) {
        this.grid.showColumns(keys, showBy);
        this.updateColumnModel();
    };
    /**
     * Hides one or more columns based on the specified column names.
     *
     * Utilized to dynamically reduce the visibility of columns based on
     * user roles or preferences.
     *
     * @param {string|string[]} keys - A single column name or an array of column names to hide.
     * @param {string} hideBy - Key to evaluate columns either as field name or header text.
     * @returns {void}
     */
    TreeGrid.prototype.hideColumns = function (keys, hideBy) {
        this.grid.hideColumns(keys, hideBy);
        this.updateColumnModel();
    };
    /**
     * Retrieves a column header element based on the field name of the column.
     *
     * This method helps to directly manipulate headers, such as applying custom styles.
     *
     * @param {string} field - The field name of the desired column.
     * @returns {Element} - Returns the HTML element of the column header.
     */
    TreeGrid.prototype.getColumnHeaderByField = function (field) {
        return this.grid.getColumnHeaderByField(field);
    };
    /**
     * Acquires the column header element using the column's index.
     *
     * Suitable for situations where direct column index is available
     * and header access is needed for operations.
     *
     * @param {number} index - The index of the column.
     * @returns {Element} - Returns the HTML element of the specified column header.
     */
    TreeGrid.prototype.getColumnHeaderByIndex = function (index) {
        return this.grid.getColumnHeaderByIndex(index);
    };
    /**
     * Retrieves a column header element utilizing the column's UID.
     *
     * Useful for precision access to header elements when UIDs are used
     * uniquely to manage column identities.
     *
     * @param {string} uid - The UID of the column.
     * @returns {Element} - Returns the HTML element of the column header.
     */
    TreeGrid.prototype.getColumnHeaderByUid = function (uid) {
        return this.grid.getColumnHeaderByUid(uid);
    };
    /**
     * Determines the column index by the specified field name.
     *
     * Helpful in converting field names to indices for operations that require
     * numeric input for array or collection indexing.
     *
     * @param {string} field - The field name of the column.
     * @returns {number} - Returns the index of the column.
     */
    TreeGrid.prototype.getColumnIndexByField = function (field) {
        return this.grid.getColumnIndexByField(field);
    };
    TreeGrid.prototype.getVirtualColIndexByUid = function (uid) {
        var columnModel = 'columnModel';
        var index = iterateArrayOrObject(this.grid["" + columnModel], function (item, index) {
            if (item.uid === uid) {
                return index;
            }
            return undefined;
        })[0];
        return !isNullOrUndefined(index) ? index : -1;
    };
    /**
     * Determines the column index based on the unique identifier (UID).
     *
     * This can be crucial in scenarios that involve dynamic column management
     * where UID provides an accurate reference.
     *
     * @param {string} uid - The UID of the column.
     * @returns {number} - Returns the column index.
     */
    TreeGrid.prototype.getColumnIndexByUid = function (uid) {
        return this.grid.getColumnIndexByUid(uid);
    };
    /**
     * Fetches a collection of columns from the TreeGrid optionally refreshing the column model.
     *
     * Use this method to retrieve and optionally refresh the list of columns
     * to ensure up-to-date configurations and settings.
     *
     * @param {boolean} isRefresh - Determines whether to refresh the grid's column model.
     * @returns {Column[]} - Returns an array of TreeGrid column objects.
     */
    TreeGrid.prototype.getColumns = function (isRefresh) {
        this.updateColumnModel(this.grid.getColumns(isRefresh));
        return this.columnModel;
    };
    TreeGrid.prototype.updateColumnModel = function (column) {
        var temp;
        var field;
        var gridColumns = isNullOrUndefined(column) ? this.grid.getColumns() : column;
        if (this.treeColumnIndex !== -1 && this.columnModel[this.treeColumnIndex] &&
            !isNullOrUndefined(this.columnModel[this.treeColumnIndex].template)) {
            temp = this.columnModel[this.treeColumnIndex].template;
            field = this.columnModel[this.treeColumnIndex].field;
        }
        var gridColumn;
        if (!this.enableColumnVirtualization || (this.enableColumnVirtualization && this.columnModel.length === gridColumns.length)) {
            this.columnModel = [];
            for (var i = 0; i < gridColumns.length; i++) {
                gridColumn = {};
                for (var _i = 0, _a = Object.keys(gridColumns[parseInt(i.toString(), 10)]); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    gridColumn["" + prop] = gridColumns[parseInt(i.toString(), 10)]["" + prop];
                }
                this.columnModel.push(new Column(gridColumn));
                if (field === this.columnModel[parseInt(i.toString(), 10)].field && this.columnModel[parseInt(i.toString(), 10)].type !== 'checkbox' && (!isNullOrUndefined(temp) && temp !== '')) {
                    this.columnModel[parseInt(i.toString(), 10)].template = temp;
                }
            }
        }
        var deepMerge = 'deepMerge';
        this["" + deepMerge] = ['columns']; // Workaround for blazor updateModel
        if (this.grid.columns.length !== this.columnModel.length) {
            this.stackedHeader = true;
        }
        if (this.stackedHeader && !isNullOrUndefined(this.detailTemplate)) {
            var error = 'Stacked header is not compatible with the detail template';
            this.trigger(actionFailure, { error: error });
        }
        if (this.stackedHeader && this.allowResizing && !isNullOrUndefined(this.columns)) {
            this.updateColumnsWidth(this.columns);
        }
        if (!this.stackedHeader && !isNullOrUndefined(this.columns)) {
            merge(this.columns, this.columnModel);
        }
        this["" + deepMerge] = undefined; // Workaround for blazor updateModel
        return this.columnModel;
    };
    TreeGrid.prototype.updateColumnsWidth = function (columns) {
        var _this = this;
        columns.forEach(function (column) {
            if (!isNullOrUndefined(column) && column.columns) {
                _this.updateColumnsWidth(column.columns);
            }
            else if (!isNullOrUndefined(column) && column.field) {
                var currentColumn = _this.grid.getColumnByField(column.field);
                if (!isNullOrUndefined(currentColumn)) {
                    column.width = currentColumn.width;
                }
            }
        });
    };
    /**
     * Retrieves the main content area of the TreeGrid.
     *
     * This method allows access to the main content DIV, which can
     * be used for layout adjustments or adding custom elements.
     *
     * @returns {Element} - Returns the TreeGrid content HTML element.
     */
    TreeGrid.prototype.getContent = function () {
        return this.grid.getContent();
    };
    TreeGrid.prototype.mergePersistTreeGridData = function () {
        var persist1 = 'mergePersistGridData';
        this.grid["" + persist1].apply(this);
    };
    TreeGrid.prototype.mergeColumns = function (storedColumn, columns) {
        var persist2 = 'mergeColumns';
        this.grid["" + persist2].apply(this, [storedColumn, columns]);
    };
    TreeGrid.prototype.setFrozenCount = function () {
        var persist3 = 'setFrozenCount';
        this.grid["" + persist3].apply(this.grid);
    };
    TreeGrid.prototype.splitFrozenCount = function (columns) {
        var persist4 = 'splitFrozenCount';
        this.grid["" + persist4].apply(this.grid, [columns]);
    };
    TreeGrid.prototype.isFrozenGrid = function () {
        return this.grid.isFrozenGrid();
    };
    TreeGrid.prototype.updateTreeGridModel = function () {
        this.setProperties({ filterSettings: getObject('properties', this.grid.filterSettings) }, true);
        this.setProperties({ pageSettings: getObject('properties', this.grid.pageSettings) }, true);
        this.setProperties({ searchSettings: getObject('properties', this.grid.searchSettings) }, true);
        this.setProperties({ sortSettings: getObject('properties', this.grid.sortSettings) }, true);
    };
    /**
     * Retrieves the content table element of the TreeGrid.
     *
     * This table contains the main data display area, allowing for
     * interaction and data manipulation directly within the TreeGrid.
     *
     * @returns {Element} - Returns the HTML element representing the content table.
     */
    TreeGrid.prototype.getContentTable = function () {
        return this.grid.getContentTable();
    };
    /**
     * Obtains all data row elements from the TreeGrid, excluding summary rows.
     *
     * Provides a way to access the visual representation of data for purposes
     * like custom formatting or event binding.
     *
     * @returns {Element[]} - Returns an array of data row elements.
     */
    TreeGrid.prototype.getDataRows = function () {
        var dRows = [];
        var rows = this.grid.getDataRows();
        for (var i = 0, len = rows.length; i < len; i++) {
            if (!rows[parseInt(i.toString(), 10)].classList.contains('e-summaryrow')) {
                dRows.push(rows[parseInt(i.toString(), 10)]);
            }
        }
        return dRows;
    };
    /**
     * Retrieves the current set of records that are visible in the TreeGrid view.
     *
     * This method excludes any summary rows to focus on the main data set
     * currently being viewed by the user.
     *
     * @returns {Object[]} - Returns an array of the current view records.
     * @isGenericType true
     */
    TreeGrid.prototype.getCurrentViewRecords = function () {
        var isSummaryRow = 'isSummaryRow';
        return this.grid.currentViewData.filter(function (e) { return isNullOrUndefined(e["" + isSummaryRow]); });
    };
    /**
     * Collects data changes (added, edited, and deleted) that have not been saved in batch mode.
     *
     * This allows you to view pending changes awaiting a commit to the data source.
     *
     * @returns {Object} - Returns an object detailing batch changes.
     */
    TreeGrid.prototype.getBatchChanges = function () {
        return this.grid.editModule.getBatchChanges();
    };
    /**
     * Retrieves the header content element of the TreeGrid.
     *
     * Mainly used for interacting with the header section, which includes
     * column headers and any applied header styling or events.
     *
     * @returns {Element} - Returns the HTML element for header content.
     */
    TreeGrid.prototype.getHeaderContent = function () {
        return this.grid.getHeaderContent();
    };
    /**
     * Retrieves the header table element of the TreeGrid.
     *
     * This method is useful for direct access to the table structure
     * where column headers are defined.
     *
     * @returns {Element} - Returns the HTML element for the header table.
     */
    TreeGrid.prototype.getHeaderTable = function () {
        return this.grid.getHeaderTable();
    };
    /**
     * Fetches a specific row element based on its index in the TreeGrid.
     *
     * This provides a way to directly access and manipulate a row using its index.
     *
     * @param {number} index - The index of the desired row.
     * @returns {Element} - Returns the HTML element of the specified row.
     */
    TreeGrid.prototype.getRowByIndex = function (index) {
        return this.grid.getRowByIndex(index);
    };
    /**
     * Provides detailed information about a row based on a specified target element.
     *
     * Integral for retrieving metadata such as row index or data object
     * when working with events or complex tree structures.
     *
     * @param {Element | EventTarget} target - The target element or event triggering the request.
     * @returns {RowInfo} - Returns an object containing row information.
     */
    TreeGrid.prototype.getRowInfo = function (target) {
        return this.grid.getRowInfo(target);
    };
    /**
     * Finds the unique identifier (UID) for a column based on its field name.
     *
     * UIDs are essential for precise identification and manipulation within complex grids.
     *
     * @param {string} field - The field name of the column.
     * @returns {string} - Returns the unique identifier for the specified column.
     */
    TreeGrid.prototype.getUidByColumnField = function (field) {
        return this.grid.getUidByColumnField(field);
    };
    /**
     * Retrieves all the columns that are currently set to be visible within the TreeGrid.
     *
     * Helps in understanding the user's current view and can be used to dynamically
     * adjust the visible columns.
     *
     * @returns {Column[]} - Returns an array of visible column objects.
     */
    TreeGrid.prototype.getVisibleColumns = function () {
        var cols = [];
        for (var _i = 0, _a = this.columnModel; _i < _a.length; _i++) {
            var col = _a[_i];
            if (col.visible) {
                cols.push(col);
            }
        }
        return cols;
    };
    /**
     * Displays a loading spinner overlay across the TreeGrid for any data action or long-running process.
     *
     * This can be manually invoked to indicate processing, enhancing user experience by providing feedback.
     *
     * @returns {void}
     */
    TreeGrid.prototype.showSpinner = function () {
        showSpinner(this.element);
    };
    /**
     * Hides a manually shown loading spinner overlay from the TreeGrid.
     *
     * Ensures that any long-running process indication is removed after completion
     * to manage user interface aesthetics.
     *
     * @returns {void}
     */
    TreeGrid.prototype.hideSpinner = function () {
        hideSpinner(this.element);
    };
    /**
     * Refreshes the visual appearance and data of the TreeGrid, updating header and content.
     *
     * This is crucial for synchronizing the displayed data with the underlying data source,
     * ensuring the view reflects current data.
     *
     * @returns {void}
     */
    TreeGrid.prototype.refresh = function () {
        this.uniqueIDCollection = {};
        this.convertTreeData(this.dataSource);
        if (!isCountRequired(this)) {
            if (!(this.dataSource instanceof DataManager)) {
                this.grid.dataSource = this.flatData;
            }
            else {
                this.grid.setProperties({
                    dataSource: new DataManager(this.dataSource.dataSource, this.dataSource.defaultQuery, this.dataSource.adaptor)
                }, true);
            }
        }
        this.grid.refresh();
    };
    /**
     * Retrieves the records associated with rows that have their checkboxes checked.
     *
     * Facilitates operations that require information about specifically selected or
     * interacted rows within the grid.
     *
     * @returns {Object[]} - Returns an array of checked row data objects.
     * @isGenericType true
     */
    TreeGrid.prototype.getCheckedRecords = function () {
        return this.selectionModule.getCheckedrecords();
    };
    /**
     * Retrieves currently visible records according to the TreeGrid's visual state.
     *
     * It considers row expansion and collapse states to return only those records
     * that a user can currently interact with.
     *
     * @returns {Object[]} - Returns visible records reflecting the TreeGrid's current view.
     * @isGenericType true
     */
    TreeGrid.prototype.getVisibleRecords = function () {
        var visibleRecords = [];
        var currentViewRecords = this.getCurrentViewRecords();
        if (!this.allowPaging) {
            for (var i = 0; i < currentViewRecords.length; i++) {
                visibleRecords.push(currentViewRecords[parseInt(i.toString(), 10)]);
                if (!currentViewRecords[parseInt(i.toString(), 10)].expanded) {
                    i += findChildrenRecords(currentViewRecords[parseInt(i.toString(), 10)]).length;
                }
            }
        }
        else {
            visibleRecords = currentViewRecords;
        }
        return visibleRecords;
    };
    /**
     * Retrieves the indices of rows that have their checkboxes checked.
     *
     * This can assist in programatically assessing which rows have been selected
     * by checkbox interaction for further processing.
     *
     * @returns {number[]} - Returns an array of indices corresponding to checked rows.
     */
    TreeGrid.prototype.getCheckedRowIndexes = function () {
        return this.selectionModule.getCheckedRowIndexes();
    };
    /**
     * Selects rows in the TreeGrid using row indices, checking their associated checkboxes.
     *
     * This method provides automation for selecting or highlighting specific rows,
     * useful in scenarios needing pre-selection or default selections.
     *
     * @param {number[]} indexes - An array of row indices to be marked as selected.
     * @returns {void}
     */
    TreeGrid.prototype.selectCheckboxes = function (indexes) {
        this.selectionModule.selectCheckboxes(indexes);
    };
    /**
     * Updates and refreshes the TreeGrid's column definitions and layout.
     *
     * Ensures that the latest column settings are displayed, either refreshing the UI
     * or adjusting internal configurations to match current data or configuration updates.
     *
     * @param {boolean} refreshUI - A flag indicating whether the DOM should be updated.
     * @returns {void}
     */
    TreeGrid.prototype.refreshColumns = function (refreshUI) {
        if (isNullOrUndefined(refreshUI) || refreshUI) {
            this.grid.columns = this.getGridColumns(this.columns);
            this.getTreeColumn();
            this.grid.refreshColumns();
        }
        else {
            this.grid.setProperties({ columns: this.getGridColumns(this.columns) }, true);
        }
    };
    TreeGrid.prototype.getTreeColumn = function () {
        var columnModel = 'columnModel';
        var treeColumn = this["" + columnModel][this.treeColumnIndex];
        var treeIndex;
        var updatedCols = this.getColumns();
        for (var f = 0; f < updatedCols.length; f++) {
            var treeColumnfield = getObject('field', treeColumn);
            var parentColumnfield = getObject('field', updatedCols[parseInt(f.toString(), 10)]);
            if (treeColumnfield === parentColumnfield) {
                treeIndex = f;
                break;
            }
        }
        this.setProperties({ treeColumnIndex: treeIndex }, true);
    };
    /**
     * Refreshes the header section of the TreeGrid to reflect any structural or data changes.
     *
     * This method is useful when there are dynamic updates or layout adjustments
     * needed in the header portion to ensure it aligns with current grid data or settings.
     *
     * @returns {void}
     */
    TreeGrid.prototype.refreshHeader = function () {
        this.grid.refreshHeader();
    };
    /**
     * Expands or collapse child records
     *
     * @param {HTMLElement} target - Expand collapse icon cell as target element
     * @returns {void}
     * @hidden
     */
    TreeGrid.prototype.expandCollapseRequest = function (target) {
        if (this.editSettings.mode === 'Batch') {
            var obj = 'dialogObj';
            var showDialog = 'showDialog';
            if ((this.getBatchChanges()[this.changedRecords].length || this.getBatchChanges()[this.deletedRecords].length ||
                this.getBatchChanges()[this.addedRecords].length) && this.editSettings.showConfirmDialog) {
                var dialogObj = this.grid.editModule["" + obj];
                this.grid.editModule["" + showDialog]('CancelEdit', dialogObj);
                this.targetElement = target;
                return;
            }
        }
        if (this.rowTemplate) {
            var rowInfo = target.closest('.e-treerowcell').parentElement;
            var record = this.getCurrentViewRecords()[rowInfo.rowIndex];
            if (target.classList.contains('e-treegridexpand')) {
                this.collapseRow(rowInfo, record);
            }
            else {
                this.expandRow(rowInfo, record);
            }
        }
        else {
            var rowInfo_1 = this.grid.getRowInfo(target);
            var record = rowInfo_1.rowData;
            if (this.grid.isFrozenGrid() && this.enableVirtualization && !Object.keys(record).length) {
                var freezeRows = 'freezeRows';
                record = this.grid.contentModule["" + freezeRows].filter(function (e) { return e.uid === rowInfo_1.row.getAttribute('data-uid'); })[0].data;
            }
            if (this.enableImmutableMode) {
                record = this.getCurrentViewRecords()[rowInfo_1.rowIndex];
            }
            if (target.classList.contains('e-treegridexpand')) {
                this.collapseRow(rowInfo_1.row, record);
            }
            else {
                this.expandRow(rowInfo_1.row, record);
            }
        }
    };
    /**
     * Expands the specified parent row within the TreeGrid to reveal its nested data.
     *
     * This method is useful for programmatically expanding rows to display their
     * hierarchical children, providing detailed views for nested data structures.
     *
     * @param {HTMLTableRowElement} row - The table row element that should be expanded.
     * @param {Object} record - Optional. Represents the data record associated with the row to be expanded.
     * @param {Object} key - Optional. The primary key value that uniquely identifies the record.
     * @param {number} level - Optional. Indicates the hierarchical level of the record within the TreeGrid.
     * @returns {void}
     */
    TreeGrid.prototype.expandRow = function (row, record, key, level) {
        var _this = this;
        this.isCollapseAll = false;
        var parentRec = this.parentData;
        if (!this.enableVirtualization) {
            parentRec = this.flatData.filter(function (e) {
                return e.hasChildRecords;
            });
        }
        record = this.getCollapseExpandRecords(row, record);
        if (isNullOrUndefined(row) && isNullOrUndefined(record)) {
            return;
        }
        if (!isNullOrUndefined(row) && row.cells[0].classList.contains('e-lastrowcell')) {
            this.lastRowBorder(row, false);
        }
        if (this.isExpandAll && !isRemoteData(this)) {
            var args = { data: parentRec, row: row, cancel: false };
            var pagerValuePresent = false;
            if (this.grid.pagerModule && !isNullOrUndefined(this.grid.pagerModule.pagerObj.pagerdropdownModule)) {
                pagerValuePresent = this.grid.pagerModule.pagerObj.pagerdropdownModule['dropDownListObject'].value ? true : false;
            }
            if (!this.isExpandingEventTriggered) {
                this.trigger(expanding, args, function (expandingArgs) {
                    _this.expandAllPrevent = expandingArgs.cancel;
                    if (!expandingArgs.cancel && !isNullOrUndefined(record)) {
                        if (expandingArgs.expandAll) {
                            _this.expandCollapseAllChildren(record, 'expand', key, level);
                        }
                        _this.expandRows(row, record, parentRec);
                    }
                });
            }
            else if ((!this.allowPaging || (pagerValuePresent && this.grid.pagerModule.pagerObj.pagerdropdownModule['dropDownListObject'].value === 'All')) &&
                !this.expandAllPrevent && this.isExpandingEventTriggered) {
                this.expandRows(row, record, parentRec);
            }
            this.isExpandingEventTriggered = true;
        }
        else if (!this.isExpandAll || (this.isExpandAll && isRemoteData(this))) {
            var args = { data: record, row: row, cancel: false };
            this.trigger(expanding, args, function (expandingArgs) {
                if (!expandingArgs.cancel) {
                    if (expandingArgs.expandAll) {
                        _this.expandCollapseAllChildren(record, 'expand', key, level);
                    }
                    _this.expandRows(row, record, parentRec);
                }
            });
        }
    };
    // Internal method to handle the rows expand
    TreeGrid.prototype.expandRows = function (row, record, parentRec) {
        this.expandCollapse('expand', row, record);
        var children = 'Children';
        if (!(isRemoteData(this) && !isOffline(this)) && (!isCountRequired(this) || !isNullOrUndefined(record["" + children]))) {
            var expandArgs = { data: record, row: row };
            if (!isNullOrUndefined(this.expandStateMapping)) {
                this.updateExpandStateMapping(expandArgs.data, true);
            }
            if (this.isExpandAll && !this.isExpandedEventTriggered) {
                this.isExpandedEventTriggered = true;
                expandArgs = { data: parentRec, row: row };
                this.trigger(expanded, expandArgs);
            }
            else if (!this.isExpandAll && this.enableVirtualization && this.selectionSettings.persistSelection
                && !isNullOrUndefined(this.virtualScrollModule.prevSelectedRecord)) {
                this.virtualScrollModule.prevSelectedRecord = [];
            }
            else if (!this.isExpandAll) {
                this.trigger(expanded, expandArgs);
            }
        }
    };
    TreeGrid.prototype.expandCollapseAllChildren = function (record, action, key, level) {
        if ((!isNullOrUndefined(key) && record[this.getPrimaryKeyFieldNames()[0]] !== key) ||
            (!isNullOrUndefined(level) && level !== record.level)) {
            return;
        }
        var records = findChildrenRecords(record).filter(function (e) {
            return e.hasChildRecords;
        });
        records.unshift(record);
        for (var i = 0; i < records.length; i++) {
            this.expandCollapse(action, null, records[parseInt(i.toString(), 10)]);
        }
    };
    TreeGrid.prototype.getCollapseExpandRecords = function (row, record) {
        if (this.allowPaging && this.pageSettings.pageSizeMode === 'All' && this.isExpandAll && isNullOrUndefined(record) &&
            !isRemoteData(this)) {
            record = this.flatData.filter(function (e) {
                return e.hasChildRecords;
            });
        }
        else if (isNullOrUndefined(record) && !isNullOrUndefined(row)) {
            if (this.detailTemplate) {
                record = this.grid.getCurrentViewRecords()[parseInt(row.getAttribute('aria-rowindex'), 10) - 1];
            }
            else {
                if (this.enableVirtualization && (this.isCollapseAll || this.isExpandAll)) {
                    if (row.rowIndex === -1) {
                        record = this.grid.getCurrentViewRecords()[parseInt(row.getAttribute('aria-rowindex'), 10) - 1];
                    }
                    else {
                        record = this.grid.getCurrentViewRecords()[row.rowIndex];
                    }
                }
                else if (this.rowTemplate) {
                    record = this.grid.getCurrentViewRecords()[row.rowIndex];
                }
                else {
                    record = this.grid.getCurrentViewRecords()[parseInt(row.getAttribute('aria-rowindex'), 10) - 1];
                }
            }
        }
        return record;
    };
    /**
     * Collapses the specified parent row in the TreeGrid.
     *
     * This method collapses the row associated with the provided HTMLTableRowElement,
     * hiding any of its displayed child rows. It is typically used to manage the
     * visibility of hierarchical data within a tree structure.
     *
     * @param {HTMLTableRowElement} row - The HTMLTableRowElement representing the parent row
     *                                    whose child rows are to be collapsed.
     * @param {Object} record - (Optional) The data record associated with the row being collapsed.
     *                            This can be used to access or manipulate the underlying data
     *                            when collapsing the row.
     * @param {Object} key - (Optional) The primary key value of the record. It can be used to identify
     *                         the target record uniquely when collapsing the row, especially in cases
     *                         where the row or record data needs to be referenced or logged.
     * @returns {void}
     */
    TreeGrid.prototype.collapseRow = function (row, record, key) {
        var _this = this;
        this.isExpandAll = false;
        var parentRec = this.parentData;
        if (!this.enableVirtualization) {
            parentRec = this.flatData.filter(function (e) {
                return e.hasChildRecords;
            });
        }
        record = this.getCollapseExpandRecords(row, record);
        if (isNullOrUndefined(row) && isNullOrUndefined(record)) {
            return;
        }
        if (this.isCollapseAll && !isRemoteData(this)) {
            var args = { data: parentRec, row: row, cancel: false };
            if (!this.isCollapsingEventTriggered) {
                this.trigger(collapsing, args, function (collapsingArgs) {
                    _this.collapseAllPrevent = collapsingArgs.cancel;
                    if (!collapsingArgs.cancel) {
                        if (collapsingArgs.collapseAll) {
                            _this.expandCollapseAllChildren(record, 'collapse', key);
                        }
                        _this.collapseRows(row, record, parentRec);
                    }
                });
            }
            else if (!this.allowPaging && !this.collapseAllPrevent && this.isCollapsingEventTriggered) {
                this.collapseRows(row, record, parentRec);
            }
            this.isCollapsingEventTriggered = true;
        }
        else if (!this.isCollapseAll || (this.isCollapseAll && isRemoteData(this))) {
            var args = { data: record, row: row, cancel: false };
            this.trigger(collapsing, args, function (collapsingArgs) {
                if (!collapsingArgs.cancel) {
                    _this.collapseRows(row, record, parentRec);
                }
            });
        }
    };
    // Internal method for handling the rows collapse
    TreeGrid.prototype.collapseRows = function (row, record, parentRec) {
        this.expandCollapse('collapse', row, record);
        var collapseArgs = { data: record, row: row };
        if (!isRemoteData(this)) {
            if (!isNullOrUndefined(this.expandStateMapping)) {
                this.updateExpandStateMapping(collapseArgs.data, false);
            }
            if (this.isCollapseAll && !this.isCollapsedEventTriggered) {
                this.isCollapsedEventTriggered = true;
                collapseArgs = { data: parentRec, row: row };
                this.trigger(collapsed, collapseArgs);
            }
            else if (!this.isCollapseAll) {
                this.trigger(collapsed, collapseArgs);
            }
            if (this.enableInfiniteScrolling) {
                var scrollHeight = this.grid.getContent().firstElementChild.scrollHeight;
                var scrollTop = this.grid.getContent().firstElementChild.scrollTop;
                if ((scrollHeight - scrollTop) < this.grid.getRowHeight() + +this.height) {
                    this.grid.getContent().firstElementChild.scrollBy(0, this.grid.getRowHeight());
                }
            }
        }
    };
    TreeGrid.prototype.updateExpandStateMapping = function (record, state) {
        var totalRecords = record;
        if (totalRecords.length) {
            for (var i = 0; i < totalRecords.length; i++) {
                totalRecords[parseInt(i.toString(), 10)][this.expandStateMapping] = state;
                editAction({ value: totalRecords[parseInt(i.toString(), 10)], action: 'edit' }, this, this.isSelfReference, totalRecords[parseInt(i.toString(), 10)].index, this.grid.selectedRowIndex, this.expandStateMapping);
            }
        }
        else {
            record["" + this.expandStateMapping] = state;
            editAction({ value: record, action: 'edit' }, this, this.isSelfReference, record.index, this.grid.selectedRowIndex, this.expandStateMapping);
        }
    };
    /**
     * Expands all the records at the specified hierarchical level within the TreeGrid.
     *
     * This method is useful for visually expanding data at a certain depth, making
     * all parent rows visible at the given level and their child rows accessible.
     *
     * @param {number} level - The hierarchical level at which parent rows should be expanded.
     * @returns {void}
     */
    TreeGrid.prototype.expandAtLevel = function (level) {
        if (((this.allowPaging && this.pageSettings.pageSizeMode === 'All') || this.enableVirtualization) && !isRemoteData(this)) {
            var rec = this.grid.dataSource.filter(function (e) {
                if (e.hasChildRecords && e.level === level) {
                    e.expanded = true;
                }
                return e.hasChildRecords && e.level === level;
            });
            this.expandAction(rec, null, level, true);
        }
        else {
            var rec = this.getRecordDetails(level);
            var record = getObject('records', rec);
            this.expandAction(record, null, level);
        }
    };
    /**
     * Expands a specific record identified by the provided primary key value.
     *
     * This method is useful for expanding particular node in the TreeGrid when
     * the parent rows need to be targeted individually by their unique key.
     *
     * @param {Object} key - The primary key value of the record to be expanded.
     * @returns {void}
     */
    TreeGrid.prototype.expandByKey = function (key) {
        this.expandCollapseActionByKey(key, 'Expand');
    };
    TreeGrid.prototype.expandAction = function (record, key, level, isPaging) {
        if (isPaging === void 0) { isPaging = false; }
        var _loop_1 = function (i) {
            if (!isNullOrUndefined(record[parseInt(i.toString(), 10)].parentItem)) {
                var puniqueID_1 = record[parseInt(i.toString(), 10)].parentItem.uniqueID;
                var parentItem = this_1.flatData.filter(function (e) {
                    return e.uniqueID === puniqueID_1;
                });
                if (isRemoteData(this_1)) {
                    parentItem = this_1.getCurrentViewRecords().filter(function (e) {
                        return e.uniqueID === puniqueID_1;
                    });
                }
                if (parentItem[0].expanded === false) {
                    record.push(parentItem[0]);
                    parentItem[0].expanded = true;
                }
                else {
                    if (!getExpandStatus(this_1, parentItem[0], this_1.parentData)) {
                        if (parentItem[0].expanded && parentItem[0].parentItem !== undefined) {
                            record.push(parentItem[0]);
                        }
                    }
                }
            }
            if (!isPaging) {
                this_1.expandRow(null, record[parseInt(i.toString(), 10)], key, level);
            }
        };
        var this_1 = this;
        for (var i = 0; i < record.length; i++) {
            _loop_1(i);
        }
        if (isPaging) {
            this.expandRow(null, record, key, level);
        }
    };
    TreeGrid.prototype.getRecordDetails = function (level) {
        var rows = this.getRows().filter(function (e) {
            return (e.className.indexOf('level' + level) !== -1
                && (e.querySelector('.e-treegridcollapse') || e.querySelector('.e-treegridexpand')));
        });
        var records = this.getCurrentViewRecords().filter(function (e) {
            return e.level === level && e.hasChildRecords;
        });
        var obj = { records: records, rows: rows };
        return obj;
    };
    /**
     * Collapses all the records at the specified hierarchical level within the TreeGrid.
     *
     * This function helps in hiding child rows for all parent nodes at a given level,
     * effectively reducing the visible depth of the hierarchical structure.
     *
     * @param {number} level - The hierarchical level at which parent rows should be collapsed.
     * @returns {void}
     */
    TreeGrid.prototype.collapseAtLevel = function (level) {
        if (((this.allowPaging && this.pageSettings.pageSizeMode === 'All') || this.enableVirtualization) && !isRemoteData(this)) {
            var record = this.grid.dataSource.filter(function (e) {
                if (e.hasChildRecords && e.level === level) {
                    e.expanded = false;
                }
                return e.hasChildRecords && e.level === level;
            });
            this.collapseAction(record, null, true);
        }
        else {
            var rec = this.getRecordDetails(level);
            var records = getObject('records', rec);
            this.collapseAction(records);
        }
    };
    /**
     * Collapses a specific record identified by the provided primary key value.
     *
     * This method is useful for collapsing particular node in the TreeGrid when
     * the parent rows need to be targeted individually by their unique key.
     *
     * @param {Object} key - The primary key value of the record to be collapsed.
     * @returns {void}
     */
    TreeGrid.prototype.collapseByKey = function (key) {
        this.expandCollapseActionByKey(key, 'Collapse');
    };
    TreeGrid.prototype.expandCollapseActionByKey = function (key, action) {
        var primaryKeyField = this.getPrimaryKeyFieldNames()[0];
        var dataSource = isRemoteData(this) ? this.getCurrentViewRecords() : this.grid.dataSource;
        if (!isNullOrUndefined(primaryKeyField)) {
            var rec = dataSource.filter(function (e) {
                return e["" + primaryKeyField].toString() === key.toString();
            });
            if (action === 'Expand') {
                this.expandAction(rec, key, null);
            }
            else {
                this.collapseAction(rec, key);
            }
        }
    };
    TreeGrid.prototype.collapseAction = function (record, key, isPaging) {
        if (isPaging === void 0) { isPaging = false; }
        if (isPaging) {
            this.collapseRow(null, record);
        }
        else {
            for (var i = 0; i < record.length; i++) {
                this.collapseRow(null, record[parseInt(i.toString(), 10)], key);
            }
        }
        if (!this.grid.contentModule.isDataSourceChanged && this.enableVirtualization && this.getRows()
            && this.parentData.length === this.getRows().length) {
            var endIndex = 'endIndex';
            this.grid.contentModule.startIndex = -1;
            this.grid.contentModule["" + endIndex] = -1;
        }
    };
    /**
     * Expands all rows in the TreeGrid, making the full hierarchy visible.
     *
     * This method should be used with caution on large datasets, as it makes
     * all nodes and their child rows visible, which might affect performance.
     *
     * @returns {void}
     */
    TreeGrid.prototype.expandAll = function () {
        if (this.getCurrentViewRecords().length === 0) {
            var error = 'The provided value for the datasource is undefined. Please ensure to add the dataSource.';
            this.trigger(actionFailure, { error: error });
        }
        this.isExpandedEventTriggered = false;
        this.isExpandingEventTriggered = false;
        this.expandCollapseAll('expand');
    };
    /**
     * Collapses all rows in the TreeGrid, hiding all child rows and leaving only parent nodes visible.
     *
     * This method can be used to quickly minimize the view to only top-level data,
     * which is helpful for summarizing or performing broad overviews of the dataset.
     *
     * @returns {void}
     */
    TreeGrid.prototype.collapseAll = function () {
        if (this.getCurrentViewRecords().length === 0) {
            var error = 'The provided value for the datasource is undefined. Please ensure to add the dataSource.';
            this.trigger(actionFailure, { error: error });
        }
        this.isCollapsedEventTriggered = false;
        this.isCollapsingEventTriggered = false;
        this.expandCollapseAll('collapse');
    };
    TreeGrid.prototype.expandCollapseAll = function (action) {
        var rows;
        if (this.rowTemplate) {
            rows = [].slice.call(this.grid.getContentTable().querySelectorAll('tr')).filter(function (e) {
                return e.querySelector('.e-treegrid' + (action === 'expand' ? 'collapse' : 'expand'));
            });
        }
        else {
            rows = this.getRows().filter(function (e) {
                return e.querySelector('.e-treegrid' + (action === 'expand' ? 'collapse' : 'expand'));
            });
        }
        if (!rows.length && this.getRows().length) {
            rows.push(this.getRows()[0]);
        }
        this.isExpandAll = true;
        this.isCollapseAll = true;
        if (((this.allowPaging && this.pageSettings.pageSizeMode === 'All') || this.enableVirtualization || this.enableInfiniteScrolling) && !isRemoteData(this)) {
            this.flatData.filter(function (e) {
                if (e.hasChildRecords) {
                    e.expanded = action === 'collapse' ? false : true;
                }
            });
            if (rows.length) {
                for (var i = 0; i < rows.length; i++) {
                    if (action === 'collapse') {
                        if (!isNullOrUndefined(this.getCurrentViewRecords()[rows[parseInt(i.toString(), 10)].rowIndex])) {
                            this.collapseRow(rows[parseInt(i.toString(), 10)]);
                        }
                    }
                    else {
                        if (!this.enableVirtualization) {
                            this.expandRow(rows[parseInt(i.toString(), 10)]);
                        }
                        else if (rows[0].getAttribute('aria-expanded') !== 'true') {
                            this.expandRow(rows[0]);
                        }
                    }
                }
            }
            else if (this.allowPaging) {
                var isExpandCollapseall = this.enableCollapseAll;
                this.setProperties({ enableCollapseAll: true }, true);
                this.grid.pagerModule.goToPage(1);
                this.setProperties({ enableCollapseAll: isExpandCollapseall }, true);
            }
        }
        else {
            for (var i = 0; i < rows.length; i++) {
                if (action === 'collapse') {
                    this.collapseRow(rows[parseInt(i.toString(), 10)]);
                }
                else {
                    this.expandRow(rows[parseInt(i.toString(), 10)]);
                }
            }
        }
        this.isExpandAll = false;
        this.isCollapseAll = false;
    };
    TreeGrid.prototype.expandCollapse = function (action, row, record, isChild) {
        var _this = this;
        var expandingArgs = { row: row, data: record, childData: [], requestType: action };
        var childRecords = this.grid.currentViewData.filter(function (e) {
            return e.parentUniqueID === record.uniqueID;
        });
        var targetEle;
        if ((!isRemoteData(this) && action === 'expand' && this.isSelfReference && isCountRequired(this) && !childRecords.length) || (action === 'collapse' || (this.isExpandAll && !this.loadChildOnDemand) && !isRemoteData(this) && this.isSelfReference && isCountRequired(this))) {
            this.updateChildOnDemand(expandingArgs);
        }
        var gridRows = this.getRows();
        if (this.rowTemplate) {
            var rows = this.getContentTable().rows;
            gridRows = [].slice.call(rows);
        }
        var rowIndex;
        if (isNullOrUndefined(row)) {
            rowIndex = this.grid.currentViewData.indexOf(record);
            row = gridRows[parseInt(rowIndex.toString(), 10)];
        }
        else {
            rowIndex = +row.getAttribute('aria-rowindex') - 1;
        }
        if (!isNullOrUndefined(row)) {
            row.setAttribute('aria-expanded', action === 'expand' ? 'true' : 'false');
        }
        if (((this.allowPaging && this.pageSettings.pageSizeMode === 'All') || this.enableVirtualization) && !isRemoteData(this)
            && !isCountRequired(this)) {
            this.notify(localPagedExpandCollapse, { action: action, row: row, record: record });
        }
        else {
            var displayAction = void 0;
            if (action === 'expand') {
                displayAction = 'e-childrow-visible';
                if (!isChild) {
                    record.expanded = true;
                    this.uniqueIDCollection[record.uniqueID].expanded = record.expanded;
                }
                if (!isNullOrUndefined(row)) {
                    targetEle = row.getElementsByClassName('e-treegridcollapse')[0];
                }
                if (isChild && !isNullOrUndefined(record[this.expandStateMapping]) &&
                    record[this.expandStateMapping] && isNullOrUndefined(targetEle)) {
                    targetEle = row.getElementsByClassName('e-treegridexpand')[0];
                }
                if (isNullOrUndefined(targetEle)) {
                    return;
                }
                if (!targetEle.classList.contains('e-treegridexpand')) {
                    addClass([targetEle], 'e-treegridexpand');
                }
                removeClass([targetEle], 'e-treegridcollapse');
            }
            else {
                displayAction = 'e-childrow-hidden';
                if (!isChild || isCountRequired(this)) {
                    record.expanded = false;
                    this.uniqueIDCollection[record.uniqueID].expanded = record.expanded;
                }
                if (!isNullOrUndefined(row)) {
                    targetEle = row.getElementsByClassName('e-treegridexpand')[0];
                }
                if (isChild && !isNullOrUndefined(record[this.expandStateMapping]) &&
                    !record[this.expandStateMapping] && isNullOrUndefined(targetEle)) {
                    targetEle = row.getElementsByClassName('e-treegridcollapse')[0];
                }
                if (isNullOrUndefined(targetEle)) {
                    return;
                }
                if (!targetEle.classList.contains('e-treegridcollapse')) {
                    addClass([targetEle], 'e-treegridcollapse');
                }
                removeClass([targetEle], 'e-treegridexpand');
            }
            row.querySelectorAll('.e-treerowcell')[0].setAttribute('aria-expanded', action === 'expand' ? 'true' : 'false');
            var detailrows = gridRows.filter(function (r) {
                return r.classList.contains('e-griddetailrowindex' + record.index + 'level' + (record.level + 1));
            });
            if (isRemoteData(this) && !isOffline(this)) {
                this.remoteExpand(action, row, record);
            }
            else {
                if ((!isCountRequired(this) || childRecords.length) || action === 'collapse') {
                    this.localExpand(action, row, record);
                }
                var lastrowIdx = this.getVisibleRecords()[this.getVisibleRecords().length - 1]['index'];
                var lastRow = this.getRowByIndex(lastrowIdx);
                if (this.grid.getContentTable().clientHeight <= this.grid.getContent().clientHeight && !isNullOrUndefined(lastRow) && !lastRow.cells[0].classList.contains('e-lastrowcell')) {
                    this.lastRowBorder(lastRow, true);
                }
            }
            if (isCountRequired(this) && action === 'expand') {
                var currentData = this.getCurrentViewRecords();
                var visibleRecords = currentData.filter(function (e) {
                    return getExpandStatus(_this, e, _this.parentData);
                });
                this.dataResults.result = visibleRecords;
            }
            if (!isNullOrUndefined(targetEle) && targetEle.closest('.e-treerowcell').classList.contains('e-cellselectionbackground')) {
                targetEle.closest('.e-treerowcell').classList.remove('e-cellselectionbackground');
                targetEle.closest('.e-treerowcell').removeAttribute('aria-selected');
            }
            if (this.isPixelHeight() && !row.cells[0].classList.contains('e-lastrowcell')) {
                var totalRows = this.getRows();
                var rows = this.getContentTable().rows;
                totalRows = [].slice.call(rows);
                for (var i = totalRows.length - 1; i >= 0; i--) {
                    if (!isHidden(totalRows[parseInt(i.toString(), 10)])) {
                        var table = this.getContentTable();
                        var sHeight = table.scrollHeight;
                        var clientHeight = this.getContent().clientHeight;
                        this.lastRowBorder(totalRows[parseInt(i.toString(), 10)], sHeight <= clientHeight);
                        break;
                    }
                }
            }
            this.notify('rowExpandCollapse', { detailrows: detailrows, action: displayAction, record: record, row: row });
            this.updateAltRow(gridRows);
        }
    };
    TreeGrid.prototype.updateChildOnDemand = function (expandingArgs) {
        var _this = this;
        if (expandingArgs.requestType === 'collapse' && isCountRequired(this)) {
            var flatDataRecords = this.flatData.slice();
            for (var i = 0; i < flatDataRecords.length; i++) {
                if (flatDataRecords[parseInt(i.toString(), 10)]['parentUniqueID'] === expandingArgs.data['uniqueID']) {
                    flatDataRecords.splice(i, 1);
                    i = i - 1;
                }
            }
            this.dataResults.result = flatDataRecords;
            return;
        }
        var deff = new Deferred();
        var childDataBind = 'childDataBind';
        expandingArgs["" + childDataBind] = deff.resolve;
        var record = expandingArgs.data;
        this.trigger(dataStateChange, expandingArgs);
        deff.promise.then(function () {
            if (expandingArgs.childData.length) {
                if (isCountRequired(_this)) {
                    _this.flatData = _this.dataResults.result;
                }
                if (_this.enableInfiniteScrolling && isCountRequired(_this)) {
                    _this.flatData = _this.infiniteScrollData;
                }
                var currentData = (_this.flatData);
                var index = 0;
                for (var i = 0; i < currentData.length; i++) {
                    if (currentData[parseInt(i.toString(), 10)].taskData === record.taskData) {
                        index = i;
                        break;
                    }
                }
                var data_1 = getValue('result', _this.dataSource);
                var childData = extendArray(expandingArgs.childData);
                var length_1 = record[_this.childMapping] ? record[_this.childMapping].length > childData.length ?
                    record[_this.childMapping].length : childData.length : childData.length;
                for (var i = 0; i < length_1; i++) {
                    if (record[_this.childMapping]) {
                        data_1.filter(function (e, i) {
                            if (e[_this.parentIdMapping] === record[_this.idMapping]) {
                                data_1.splice(i, 1);
                            }
                        });
                    }
                    if (childData[parseInt(i.toString(), 10)]) {
                        childData[parseInt(i.toString(), 10)].level = record.level + 1;
                        childData[parseInt(i.toString(), 10)].index = Math.ceil(Math.random() * 1000);
                        childData[parseInt(i.toString(), 10)].parentItem = extend$1({}, record);
                        childData[parseInt(i.toString(), 10)].taskData = extend$1({}, childData[parseInt(i.toString(), 10)]);
                        delete childData[parseInt(i.toString(), 10)].parentItem.childRecords;
                        delete childData[parseInt(i.toString(), 10)].taskData.parentItem;
                        childData[parseInt(i.toString(), 10)].parentUniqueID = record.uniqueID;
                        childData[parseInt(i.toString(), 10)].uniqueID = getUid(_this.element.id + '_data_');
                        setValue('uniqueIDCollection.' + childData[parseInt(i.toString(), 10)].uniqueID, childData[parseInt(i.toString(), 10)], _this);
                        if (!isNullOrUndefined(childData[parseInt(i.toString(), 10)][_this.childMapping]) ||
                            (childData[parseInt(i.toString(), 10)][_this.hasChildMapping] && isCountRequired(_this))) {
                            childData[parseInt(i.toString(), 10)].hasChildRecords = true;
                        }
                        if (isCountRequired(_this) && record[_this.childMapping] && record[_this.childMapping][parseInt(i.toString(), 10)]) {
                            currentData.splice(index + 1 + i, 0, childData[parseInt(i.toString(), 10)]);
                        }
                        else {
                            currentData.splice(index + 1 + i, record[_this.childMapping] &&
                                record[_this.childMapping][parseInt(i.toString(), 10)] ? 1 : 0, childData[parseInt(i.toString(), 10)]);
                        }
                    }
                    else {
                        currentData.splice(index + 1 + i, 1);
                    }
                }
                currentData[parseInt(index.toString(), 10)]["" + _this.childMapping] = childData;
                currentData[parseInt(index.toString(), 10)].childRecords = childData;
                currentData[parseInt(index.toString(), 10)].expanded = true;
                setValue('uniqueIDCollection.' + currentData[parseInt(index.toString(), 10)].uniqueID, currentData[parseInt(index.toString(), 10)], _this);
                for (var j = 0; j < expandingArgs.childData.length; j++) {
                    data_1.push(expandingArgs.childData[parseInt(j.toString(), 10)]);
                }
            }
            if (isCountRequired(_this) && !_this.loadChildOnDemand && expandingArgs.requestType === 'expand') {
                _this.dataResults['expandRecord'] = {};
                _this.dataResults['expandRecord'] = expandingArgs.data;
            }
            _this.isExpandRefresh = true;
            var scrollHeightBeforeRefresh = _this.getContentTable().parentElement.scrollTop;
            _this.grid.refresh();
            if (_this.enableInfiniteScrolling) {
                _this.getContentTable().parentElement.scrollTop = scrollHeightBeforeRefresh;
            }
            _this.trigger(expanded, expandingArgs);
        });
    };
    TreeGrid.prototype.remoteExpand = function (action, row, record) {
        var gridRows = this.getRows();
        var fetchRemoteChildData = 'fetchRemoteChildData';
        if (this.rowTemplate) {
            var rows_1 = this.getContentTable().rows;
            gridRows = [].slice.call(rows_1);
        }
        var args = { data: record, row: row };
        var rows = [];
        rows = gridRows.filter(function (r) {
            return ((r.querySelector('.e-gridrowindex' + record.index + 'level' + (record.level + 1))) || (r.querySelector('.e-gridrowindex' + record.index + 'level0' + '.e-summarycell')));
        });
        if (action === 'expand') {
            this.notify(remoteExpand, { record: record, rows: rows, parentRow: row });
            var args_1 = { row: row, data: record };
            if (rows.length > 0) {
                this.trigger(expanded, args_1);
            }
        }
        else if (action === 'collapse' && this.enableVirtualization) {
            this.dataModule["" + fetchRemoteChildData]({ action: action, record: args.data, rows: null, parentRow: args.row });
        }
        else {
            this.collapseRemoteChild({ record: record, rows: rows });
            this.trigger(collapsed, args);
        }
    };
    TreeGrid.prototype.localExpand = function (action, row, record) {
        var rows;
        var childRecords = this.grid.currentViewData.filter(function (e) {
            return e.parentUniqueID === record.uniqueID;
        });
        if (this.isPixelHeight() && row.cells[0].classList.contains('e-lastrowcell')) {
            this.lastRowBorder(row, false);
        }
        var movableRows;
        var freezeRightRows;
        var gridRows = this.getRows();
        if (this.rowTemplate) {
            var rows_2 = this.getContentTable().rows;
            gridRows = [].slice.call(rows_2);
        }
        var displayAction = (action === 'expand') ? 'e-childrow-visible' : 'e-childrow-hidden';
        var primaryKeyField = this.getPrimaryKeyFieldNames()[0];
        if (this.enableImmutableMode && !this.allowPaging) {
            rows = [];
            for (var i = 0; i < childRecords.length; i++) {
                var rowIndex = this.grid.getRowIndexByPrimaryKey(childRecords[parseInt(i.toString(), 10)]["" + primaryKeyField]);
                rows.push(this.getRows()[parseInt(rowIndex.toString(), 10)]);
            }
        }
        else {
            rows = gridRows.filter(function (r) {
                return r.querySelector('.e-gridrowindex' + record.index + 'level' + (record.level + 1));
            });
        }
        var freeze = (this.grid.getFrozenLeftColumnsCount() > 0 || this.grid.getFrozenRightColumnsCount() > 0) ? true : false;
        if (this.frozenRows || this.frozenColumns || this.getFrozenColumns() || freeze) {
            movableRows = this.getRows().filter(function (r) {
                return r.querySelector('.e-gridrowindex' + record.index + 'level' + (record.level + 1));
            });
        }
        if (freeze) {
            freezeRightRows = this.getRows().filter(function (r) {
                return r.querySelector('.e-gridrowindex' + record.index + 'level' + (record.level + 1));
            });
        }
        var gridRowsObject = this.grid.getRowsObject();
        var currentViewData = this.grid.currentViewData;
        var currentRecord = currentViewData.filter(function (e) {
            return e.uniqueID === record.uniqueID;
        });
        var currentIndex = currentViewData.indexOf(currentRecord[0]);
        if (!isNullOrUndefined(gridRowsObject[parseInt(currentIndex.toString(), 10)].visible) &&
            gridRowsObject[parseInt(currentIndex.toString(), 10)].visible !== false) {
            gridRowsObject[parseInt(currentIndex.toString(), 10)].visible = true;
        }
        var detailrows = gridRows.filter(function (r) {
            return r.classList.contains('e-griddetailrowindex' + record.index + 'level' + (record.level + 1));
        });
        for (var i = 0; i < rows.length; i++) {
            if (!isNullOrUndefined(rows[parseInt(i.toString(), 10)])) {
                this.toggleRowVisibility(rows[parseInt(i.toString(), 10)], displayAction);
            }
            if (!isNullOrUndefined(rows[parseInt(i.toString(), 10)]) && !this.allowPaging && !(this.enableVirtualization
                || this.enableInfiniteScrolling || isRemoteData(this) || isCountRequired(this))) {
                if (!isNullOrUndefined(gridRowsObject[rows[parseInt(i.toString(), 10)].rowIndex])) {
                    gridRowsObject[rows[parseInt(i.toString(), 10)].rowIndex].visible = displayAction !== 'e-childrow-hidden' ? true : false;
                }
                var parentRecord = currentViewData.filter(function (e) {
                    return e.uniqueID === currentRecord[0].parentUniqueID;
                });
                if (!isNullOrUndefined(parentRecord[0]) && gridRows[currentViewData.indexOf(parentRecord[0])].getElementsByClassName('e-treegridcollapse').length) {
                    gridRowsObject[parseInt(currentIndex.toString(), 10)].visible = false;
                }
            }
            if (!isNullOrUndefined(movableRows)) {
                this.toggleRowVisibility(movableRows[parseInt(i.toString(), 10)], displayAction);
            }
            if (!isNullOrUndefined(freezeRightRows)) {
                this.toggleRowVisibility(freezeRightRows[parseInt(i.toString(), 10)], displayAction);
            }
            this.notify('childRowExpand', { row: rows[parseInt(i.toString(), 10)] });
            if ((!isNullOrUndefined(childRecords)) && (!isNullOrUndefined(childRecords[parseInt(i.toString(), 10)].childRecords) && childRecords[parseInt(i.toString(), 10)].childRecords.length > 0) && (action !== 'expand' ||
                isNullOrUndefined(childRecords[parseInt(i.toString(), 10)].expanded) || childRecords[parseInt(i.toString(), 10)].expanded)) {
                this.expandCollapse(action, rows[parseInt(i.toString(), 10)], childRecords[parseInt(i.toString(), 10)], true);
                if (this.frozenColumns <= this.treeColumnIndex && !isNullOrUndefined(movableRows)) {
                    this.expandCollapse(action, movableRows[parseInt(i.toString(), 10)], childRecords[parseInt(i.toString(), 10)], true);
                }
            }
        }
        for (var i = 0; i < detailrows.length; i++) {
            if (!isNullOrUndefined(detailrows[parseInt(i.toString(), 10)]) && !this.allowPaging && !(this.enableVirtualization ||
                this.enableInfiniteScrolling || isRemoteData(this) || isCountRequired(this))) {
                gridRowsObject[detailrows[parseInt(i.toString(), 10)].rowIndex].visible = displayAction !== 'e-childrow-hidden' ? true : false;
                this.toggleRowVisibility(detailrows[parseInt(i.toString(), 10)], displayAction);
            }
        }
        if (!this.allowPaging && !(this.enableVirtualization || this.enableInfiniteScrolling || isRemoteData(this)
            || isCountRequired(this))) {
            this.grid.notify('refresh-Expand-and-Collapse', { rows: this.grid.getRowsObject() });
        }
    };
    TreeGrid.prototype.toggleRowVisibility = function (row, displayAction) {
        if (row) {
            row.classList.remove('e-childrow-hidden', 'e-childrow-visible', 'e-hide');
            row.classList.add(displayAction);
        }
    };
    TreeGrid.prototype.updateAltRow = function (rows) {
        if (this.enableAltRow && !this.rowTemplate) {
            var visibleRowCount = 0;
            for (var i = 0; rows && i < rows.length; i++) {
                var gridRow = rows[parseInt(i.toString(), 10)];
                if (!gridRow.classList.contains('e-childrow-hidden')) {
                    if (gridRow.classList.contains('e-altrow')) {
                        removeClass([gridRow], 'e-altrow');
                    }
                    if (visibleRowCount % 2 !== 0 && !gridRow.classList.contains('e-summaryrow') && !gridRow.classList.contains('e-detailrow')) {
                        addClass([gridRow], 'e-altrow');
                    }
                    if (!gridRow.classList.contains('e-summaryrow') && !gridRow.classList.contains('e-detailrow')) {
                        visibleRowCount++;
                    }
                }
            }
        }
    };
    TreeGrid.prototype.treeColumnRowTemplate = function () {
        var rows = this.getContentTable().rows;
        rows = [].slice.call(rows);
        var rowsObject = this.grid.getRowsObject();
        for (var i = 0; i < rows.length; i++) {
            var rcell = this.grid.getContentTable().rows[parseInt(i.toString(), 10)]
                .cells[this.treeColumnIndex];
            var row = rows[parseInt(i.toString(), 10)];
            var rowData = rowsObject.length !== 0 ? rowsObject[parseInt(i.toString(), 10)].data : new Object();
            var arg = { data: rowData, row: row, cell: rcell, column: this.getColumns()[this.treeColumnIndex] };
            this.renderModule.cellRender(arg);
        }
    };
    TreeGrid.prototype.collapseRemoteChild = function (rowDetails, isChild) {
        if (!isNullOrUndefined(isChild) && !isChild && this.loadChildOnDemand) {
            rowDetails.record.expanded = false;
        }
        var rows = rowDetails.rows;
        var row;
        var childRecord;
        var movablerows = [];
        var rightrows = [];
        var freeze = (this.getFrozenLeftColumnsCount() > 0 || this.getFrozenRightColumnsCount() > 0) ? true : false;
        if (freeze) {
            movablerows = this.getRows().filter(function (r) {
                return r.querySelector('.e-gridrowindex' + rowDetails.record.index + 'level' + (rowDetails.record.level + 1));
            });
            rightrows = this.getRows().filter(function (r) {
                return r.querySelector('.e-gridrowindex' + rowDetails.record.index + 'level' + (rowDetails.record.level + 1));
            });
        }
        for (var i = 0; i < rows.length; i++) {
            this.toggleRowVisibility(rows[parseInt(i.toString(), 10)], 'e-childrow-hidden');
            row = rows[parseInt(i.toString(), 10)];
            var collapsingTd = rows[parseInt(i.toString(), 10)].querySelector('.e-detailrowexpand');
            if (!isNullOrUndefined(collapsingTd)) {
                this.grid.detailRowModule.collapse(collapsingTd);
            }
            if (freeze) {
                this.toggleRowVisibility(movablerows[parseInt(i.toString(), 10)], 'e-childrow-hidden');
                this.toggleRowVisibility(rightrows[parseInt(i.toString(), 10)], 'e-childrow-hidden');
                if (!rows[parseInt(i.toString(), 10)].querySelector('.e-treecolumn-container .e-treegridexpand')) {
                    if (movablerows[parseInt(i.toString(), 10)].querySelector('.e-treecolumn-container .e-treegridexpand')) {
                        row = movablerows[parseInt(i.toString(), 10)];
                    }
                    else if (rightrows[parseInt(i.toString(), 10)].querySelector('.e-treecolumn-container .e-treegridexpand')) {
                        row = rightrows[parseInt(i.toString(), 10)];
                    }
                }
            }
            if (row.querySelector('.e-treecolumn-container .e-treegridexpand')) {
                var expandElement = row.querySelector('.e-treecolumn-container .e-treegridexpand');
                childRecord = this.rowTemplate ? this.grid.getCurrentViewRecords()[rows[parseInt(i.toString(), 10)].rowIndex] :
                    this.grid.getRowObjectFromUID(rows[parseInt(i.toString(), 10)].getAttribute('data-Uid')).data;
                if (!isNullOrUndefined(expandElement) && childRecord.expanded) {
                    removeClass([expandElement], 'e-treegridexpand');
                    addClass([expandElement], 'e-treegridcollapse');
                }
                var cRow = [];
                var eRows = this.getRows();
                for (var i_1 = 0; i_1 < eRows.length; i_1++) {
                    if (eRows[parseInt(i_1.toString(), 10)].querySelector('.e-gridrowindex' + childRecord.index + 'level' + (childRecord.level + 1))) {
                        cRow.push(eRows[parseInt(i_1.toString(), 10)]);
                    }
                }
                if (cRow.length && childRecord.expanded) {
                    this.collapseRemoteChild({ record: childRecord, rows: cRow }, false);
                }
            }
        }
        this.grid.pageSettings.totalRecordsCount -= rows.length;
    };
    /**
     * Method to sanitize html element
     *
     * @param {any} value - Specifies the html value to sanitize
     * @returns {any} Returns the sanitized html value
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TreeGrid.prototype.sanitize = function (value) {
        if (this.enableHtmlSanitizer && typeof (value) === 'string') {
            return SanitizeHtmlHelper.sanitize(value);
        }
        return value;
    };
    /**
     * @hidden
     * @returns {void}
     */
    TreeGrid.prototype.addListener = function () {
        this.on('updateResults', this.updateResultModel, this);
        this.grid.on('initial-end', this.afterGridRender, this);
        this.grid.on('last-rowcell-border-updated', this.lastRowCellBorderUpdated, this);
    };
    TreeGrid.prototype.updateResultModel = function (returnResult) {
        this.dataResults = returnResult;
    };
    /**
     * @hidden
     * @returns {void}
     */
    TreeGrid.prototype.removeListener = function () {
        if (this.isDestroyed) {
            return;
        }
        this.off('updateResults', this.updateResultModel);
        this.grid.off('initial-end', this.afterGridRender);
        this.grid.off('last-rowcell-border-updated', this.lastRowCellBorderUpdated);
    };
    /**
     * Filters the TreeGrid rows based on a specified column and filter criteria.
     *
     * This method allows for dynamic filtering against column data using various
     * operators and values, supporting case-sensitive filtering and accent sensitivity.
     *
     * @param {string} fieldName - The name of the column to apply the filter on.
     * @param {string} filterOperator - The operator used to perform the filter (e.g., 'equals', 'startswith').
     * @param {string | number | Date | boolean } filterValue - The value to filter against.
     * @param {string} predicate - The logical operator ('AND'/'OR') to combine this filter with others.
     * @param {boolean} matchCase - If true, the filter performs a case-sensitive match.
     * @param {boolean} ignoreAccent - If true, the filter ignores diacritical marks.
     * @param {string} actualFilterValue - The original value used for filtering, useful for distinguishing displayed and actual values.
     * @param {string} actualOperator - The actual operator that is applied when different from the displayed operator.
     * @returns {void}
     */
    TreeGrid.prototype.filterByColumn = function (fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator) {
        this.grid.filterByColumn(fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent, actualFilterValue, actualOperator);
    };
    /**
     * Clears all filters applied to the TreeGrid, restoring the view to show all records.
     *
     * This method is useful for resetting the grid to its unfiltered state.
     *
     * @returns {void}
     */
    TreeGrid.prototype.clearFiltering = function () {
        this.grid.clearFiltering();
    };
    /**
     * Removes filtered column by field name.
     *
     * @param  {string} field - Defines column field name to remove filter.
     * @param  {boolean} isClearFilterBar -  Specifies whether the filter bar value needs to be cleared.
     * @returns {void}
     * @hidden
     */
    TreeGrid.prototype.removeFilteredColsByField = function (field, isClearFilterBar) {
        this.grid.removeFilteredColsByField(field, isClearFilterBar);
    };
    /**
     * Selects a row in the TreeGrid by its index.
     *
     * Use this method to highlight a specific row; useful for programmatically navigating data.
     *
     * @param {number} index - Index of the row to select.
     * @param {boolean} isToggle - If true, toggles the selection state of the row.
     * @returns {void}
     */
    TreeGrid.prototype.selectRow = function (index, isToggle) {
        this.grid.selectRow(index, isToggle);
    };
    /**
     * Selects multiple rows in the TreeGrid given an array of row indexes.
     *
     * Useful for batch operations where multiple row selections are necessary.
     *
     * @param {number[]} rowIndexes - Array of row index numbers to select.
     * @returns {void}
     */
    TreeGrid.prototype.selectRows = function (rowIndexes) {
        this.grid.selectRows(rowIndexes);
    };
    /**
     * Deselects all selected rows and cells within the TreeGrid.
     *
     * Resets the selection state of the grid, which is useful after bulk operations.
     *
     * @returns {void}
     */
    TreeGrid.prototype.clearSelection = function () {
        if (!isNullOrUndefined(this.grid.selectionModule)) {
            this.grid.selectionModule['actualTarget'] = null;
        }
        this.grid.clearSelection();
    };
    /**
     * Copies the data of selected rows or cells to the clipboard.
     *
     * This method supports including headers for better context when pasting elsewhere.
     *
     * @param {boolean} withHeader - (Optional) If true, includes column headers in the copied data.
     * @returns {void}
     */
    TreeGrid.prototype.copy = function (withHeader) {
        this.clipboardModule.copy(withHeader);
    };
    /**
     * Pastes data into the selected cells from the clipboard.
     *
     * Automatically places the pasted data starting from the specified indices.
     *
     * @param {string} data - The clipboard data to paste.
     * @param {number} rowIndex - The starting row index for pasting.
     * @param {number} colIndex - The starting column index for pasting.
     * @returns {void}
     */
    TreeGrid.prototype.paste = function (data, rowIndex, colIndex) {
        this.clipboardModule.paste(data, rowIndex, colIndex);
    };
    /**
     * Selects a cell by its index position in the TreeGrid.
     *
     * Useful for navigating or highlighting specific data cells within the grid.
     *
     * @param {IIndex} cellIndex - An object specifying the row and column indexes.
     * @param {boolean} isToggle - (Optional) If true, toggles the selection state of the cell.
     * @returns {void}
     */
    TreeGrid.prototype.selectCell = function (cellIndex, isToggle) {
        this.grid.selectCell(cellIndex, isToggle);
    };
    /**
     * Retrieves the currently selected rows.
     *
     * Useful for obtaining the selected data elements for downstream processing.
     *
     * @returns {Element[]} - An array of Element objects representing the selected rows.
     */
    TreeGrid.prototype.getSelectedRows = function () {
        return this.grid.getSelectedRows();
    };
    /**
     * Gets a movable table cell by row and column index.
     *
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @returns {Element} - Returns movable cell element from the indexes passed
     *
     * @deprecated This method is deprecated. Use getCellFromIndex method instead.
     */
    TreeGrid.prototype.getMovableCellFromIndex = function (rowIndex, columnIndex) {
        return this.grid.getCellFromIndex(rowIndex, columnIndex);
    };
    /**
     * Gets all the TreeGrid's movable table data rows.
     *
     * @returns {Element[]} - Returns element collection of movable rows
     *
     * @deprecated This method is deprecated. Use getDataRows method instead.
     */
    TreeGrid.prototype.getMovableDataRows = function () {
        return this.grid.getDataRows();
    };
    /**
     * Gets a movable tables row by index.
     *
     * @param  {number} index - Specifies the row index.
     * @returns {Element} - Returns movable row based on index passed
     *
     * @deprecated This method is deprecated. Use getRowByIndex method instead.
     */
    TreeGrid.prototype.getMovableRowByIndex = function (index) {
        return this.grid.getRowByIndex(index);
    };
    /**
     * Gets the TreeGrid's movable content rows from frozen treegrid.
     *
     * @returns {Element[]}: Returns movable row element
     * @deprecated This method is deprecated. Use getRows method instead.
     */
    TreeGrid.prototype.getMovableRows = function () {
        return this.grid.getRows();
    };
    /**
     * Gets a frozen right tables row element by index.
     *
     * @param  {number} index - Specifies the row index.
     * @returns {Element} returns the element
     *
     * @deprecated This method is deprecated. Use getRowByIndex method instead.
     */
    TreeGrid.prototype.getFrozenRightRowByIndex = function (index) {
        return this.grid.getRowByIndex(index);
    };
    /**
     * Gets the Tree Grid's frozen right content rows from frozen Tree Grid.
     *
     * @returns {Element[]} returns the element
     *
     * @deprecated This method is deprecated. Use getRows method instead.
     */
    TreeGrid.prototype.getFrozenRightRows = function () {
        return this.grid.getRows();
    };
    /**
     * Gets all the Tree Grid's frozen right table data rows.
     *
     * @returns {Element[]} Returns the Element
     *
     * @deprecated This method is deprecated. Use getDataRows method instead.
     */
    TreeGrid.prototype.getFrozenRightDataRows = function () {
        return this.grid.getDataRows();
    };
    /**
     * Gets a frozen right table cell by row and column index.
     *
     * @param  {number} rowIndex - Specifies the row index.
     * @param  {number} columnIndex - Specifies the column index.
     * @returns {Element} Returns the Element
     *
     * @deprecated This method is deprecated. Use getCellFromIndex method instead.
     */
    TreeGrid.prototype.getFrozenRightCellFromIndex = function (rowIndex, columnIndex) {
        return this.grid.getCellFromIndex(rowIndex, columnIndex);
    };
    /**
     * Gets a frozen left column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     *
     * @deprecated This method is deprecated. Use getColumnHeaderByIndex method instead.
     */
    TreeGrid.prototype.getFrozenLeftColumnHeaderByIndex = function (index) {
        return this.grid.getColumnHeaderByIndex(index);
    };
    /**
     * Gets a frozen right column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     *
     * @deprecated This method is deprecated. Use getColumnHeaderByIndex method instead.
     */
    TreeGrid.prototype.getFrozenRightColumnHeaderByIndex = function (index) {
        return this.grid.getColumnHeaderByIndex(index);
    };
    /**
     * Gets a movable column header by column index.
     *
     * @param  {number} index - Specifies the column index.
     * @returns {Element} Returns the Element
     *
     * @deprecated This method is deprecated. Use getColumnHeaderByIndex method instead.
     */
    TreeGrid.prototype.getMovableColumnHeaderByIndex = function (index) {
        return this.grid.getColumnHeaderByIndex(index);
    };
    /**
     * @hidden
     * @returns {number} Returns the movable column count
     */
    TreeGrid.prototype.getMovableColumnsCount = function () {
        return this.grid.getMovableColumnsCount();
    };
    /**
     * @hidden
     * @returns {number} Returns the Frozen Left column
     */
    TreeGrid.prototype.getFrozenLeftColumnsCount = function () {
        return this.grid.getFrozenLeftColumnsCount();
    };
    /**
     * @hidden
     * @returns {number} Returns the Frozen Right column count
     */
    TreeGrid.prototype.getFrozenRightColumnsCount = function () {
        return this.grid.getFrozenRightColumnsCount();
    };
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    TreeGrid.prototype.getFrozenLeftColumns = function () {
        this.updateColumnModel(this.grid.getFrozenLeftColumns());
        return this.columnModel;
    };
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    TreeGrid.prototype.getFrozenRightColumns = function () {
        this.updateColumnModel(this.grid.getFrozenRightColumns());
        return this.columnModel;
    };
    /**
     * @hidden
     * @returns {number} Returns the visible movable count
     */
    TreeGrid.prototype.getVisibleMovableCount = function () {
        return this.grid.getVisibleMovableCount();
    };
    /**
     * @hidden
     * @returns {number} Returns the visible Frozen Right count
     */
    TreeGrid.prototype.getVisibleFrozenRightCount = function () {
        return this.grid.getVisibleFrozenRightCount();
    };
    /**
     * @hidden
     * @returns {number} Returns the visible Frozen left count
     */
    TreeGrid.prototype.getVisibleFrozenLeftCount = function () {
        return this.grid.getVisibleFrozenLeftCount();
    };
    /**
     * @hidden
     * @returns {Column[]} Returns the column
     */
    TreeGrid.prototype.getMovableColumns = function () {
        this.updateColumnModel(this.grid.getMovableColumns());
        return this.columnModel;
    };
    /**
     * Gets the number of frozen column in tree grid
     *
     * @hidden
     * @returns {number} - Returns frozen column count
     */
    TreeGrid.prototype.getFrozenColumns = function () {
        return this.getFrozenCount(!isNullOrUndefined(this.columns) && this.columns, 0) + this.frozenColumns;
    };
    TreeGrid.prototype.getFrozenCount = function (cols, cnt) {
        for (var j = 0, len = cols.length; j < len; j++) {
            if (cols[parseInt(j.toString(), 10)].columns) {
                cnt = this.getFrozenCount(cols[parseInt(j.toString(), 10)].columns, cnt);
            }
            else {
                if (cols[parseInt(j.toString(), 10)].isFrozen) {
                    cnt++;
                }
            }
        }
        return cnt;
    };
    /**
     * Retrieves the indexes of the currently selected rows in the TreeGrid.
     *
     * This method is useful when you need to perform actions based on the selected rows,
     * such as retrieving data or changing the selection.
     *
     * @returns {number[]} - An array of numbers representing the indexes of selected rows.
     */
    TreeGrid.prototype.getSelectedRowIndexes = function () {
        return this.grid.getSelectedRowIndexes();
    };
    /**
     * Retrieves the indexes of the selected cells within the selected rows.
     *
     * This can be useful for handling cell-specific operations, such as
     * applying styles or editing values programmatically.
     *
     * @returns {ISelectedCell[]} - An array of objects representing the selected cells' indexes.
     */
    TreeGrid.prototype.getSelectedRowCellIndexes = function () {
        return this.grid.getSelectedRowCellIndexes();
    };
    /**
     * Retrieves the data records corresponding to the currently selected rows.
     *
     * This method provides the full record data for the selected rows,
     * which is useful for data manipulation or extraction operations.
     *
     * @isGenericType true
     * @returns {Object[]} - An array of data objects representing the selected records.
     */
    TreeGrid.prototype.getSelectedRecords = function () {
        return this.grid.getSelectedRecords();
    };
    /**
     * Obtains the data handling modules used by the TreeGrid.
     *
     * This includes both the base data module for standard grid operations and the tree module
     * for handling hierarchical data, giving complete access to data management capabilities.
     *
     * @returns {{baseModule: Data, treeModule: DataManipulation}} - An object containing both grid and tree data modules.
     */
    TreeGrid.prototype.getDataModule = function () {
        return { baseModule: this.grid.getDataModule(), treeModule: this.dataModule };
    };
    /**
     * Reorders rows in the TreeGrid based on specified source indexes and a target position.
     *
     * This functionality allows for dynamic rearrangement of rows, such as moving selected
     * rows to a new position as siblings or children.
     *
     * @param {number[]} fromIndexes - An array indicating the source indexes of the rows to be moved.
     * @param {number} toIndex - The target index where the rows should be moved.
     * @param {string} position - The position relative to the target index ('above', 'below', 'child').
     * @returns {void}
     */
    TreeGrid.prototype.reorderRows = function (fromIndexes, toIndex, position) {
        if (!isNullOrUndefined(this.rowDragAndDropModule)) {
            this.rowDragAndDropModule.reorderRows(fromIndexes, toIndex, position);
        }
    };
    /**
     * Indents a specified record, promoting it to one level deeper in the hierarchy.
     *
     * This function moves the selected row to become the last child of its preceding row,
     * altering the visual and hierarchical data structure.
     *
     * @param {Object} record - (Optional) The record to be indented. If omitted, the currently selected row is used.
     * @returns {void}
     */
    TreeGrid.prototype.indent = function (record) {
        if (!isNullOrUndefined(this.rowDragAndDropModule)) {
            record = record;
            this.rowDragAndDropModule[this.indentOutdentAction](record, 'indent');
        }
    };
    /**
     * Outdents a specified record, moving it one level up in the hierarchy.
     *
     * This method repositions the selected row to be a sibling of its parent, impacting
     * its display and the hierarchical relationships within the TreeGrid.
     *
     * @param {Object} record - (Optional) The record to be outdented. If omitted, the currently selected row is used.
     * @returns {void}
     */
    TreeGrid.prototype.outdent = function (record) {
        if (!isNullOrUndefined(this.rowDragAndDropModule)) {
            record = record;
            this.rowDragAndDropModule[this.indentOutdentAction](record, 'outdent');
        }
    };
    var TreeGrid_1;
    __decorate$b([
        Property(0)
    ], TreeGrid.prototype, "frozenRows", void 0);
    __decorate$b([
        Property(0)
    ], TreeGrid.prototype, "frozenColumns", void 0);
    __decorate$b([
        Property('Ellipsis')
    ], TreeGrid.prototype, "clipMode", void 0);
    __decorate$b([
        Property([])
    ], TreeGrid.prototype, "columns", void 0);
    __decorate$b([
        Property(null)
    ], TreeGrid.prototype, "childMapping", void 0);
    __decorate$b([
        Property(null)
    ], TreeGrid.prototype, "hasChildMapping", void 0);
    __decorate$b([
        Property(0)
    ], TreeGrid.prototype, "treeColumnIndex", void 0);
    __decorate$b([
        Property(null)
    ], TreeGrid.prototype, "idMapping", void 0);
    __decorate$b([
        Property(null)
    ], TreeGrid.prototype, "parentIdMapping", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "enableCollapseAll", void 0);
    __decorate$b([
        Property(null)
    ], TreeGrid.prototype, "expandStateMapping", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "allowRowDragAndDrop", void 0);
    __decorate$b([
        Property([])
    ], TreeGrid.prototype, "dataSource", void 0);
    __decorate$b([
        Property()
    ], TreeGrid.prototype, "query", void 0);
    __decorate$b([
        Property()
    ], TreeGrid.prototype, "cloneQuery", void 0);
    __decorate$b([
        Property('AllPages')
    ], TreeGrid.prototype, "printMode", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "allowPaging", void 0);
    __decorate$b([
        Property(true)
    ], TreeGrid.prototype, "loadChildOnDemand", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "allowTextWrap", void 0);
    __decorate$b([
        Complex({}, TextWrapSettings)
    ], TreeGrid.prototype, "textWrapSettings", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "allowReordering", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "allowResizing", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "autoCheckHierarchy", void 0);
    __decorate$b([
        Complex({}, PageSettings)
    ], TreeGrid.prototype, "pageSettings", void 0);
    __decorate$b([
        Complex({}, RowDropSettings$1)
    ], TreeGrid.prototype, "rowDropSettings", void 0);
    __decorate$b([
        Property('USD')
    ], TreeGrid.prototype, "currencyCode", void 0);
    __decorate$b([
        Property()
    ], TreeGrid.prototype, "pagerTemplate", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "showColumnMenu", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "showColumnChooser", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "allowSorting", void 0);
    __decorate$b([
        Property(true)
    ], TreeGrid.prototype, "allowMultiSorting", void 0);
    __decorate$b([
        Complex({}, SortSettings)
    ], TreeGrid.prototype, "sortSettings", void 0);
    __decorate$b([
        Collection([], AggregateRow)
    ], TreeGrid.prototype, "aggregates", void 0);
    __decorate$b([
        Complex({}, EditSettings)
    ], TreeGrid.prototype, "editSettings", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "allowFiltering", void 0);
    __decorate$b([
        Property()
    ], TreeGrid.prototype, "detailTemplate", void 0);
    __decorate$b([
        Complex({}, FilterSettings)
    ], TreeGrid.prototype, "filterSettings", void 0);
    __decorate$b([
        Complex({}, SearchSettings)
    ], TreeGrid.prototype, "searchSettings", void 0);
    __decorate$b([
        Property()
    ], TreeGrid.prototype, "toolbar", void 0);
    __decorate$b([
        Property()
    ], TreeGrid.prototype, "toolbarTemplate", void 0);
    __decorate$b([
        Property('Default')
    ], TreeGrid.prototype, "gridLines", void 0);
    __decorate$b([
        Property()
    ], TreeGrid.prototype, "contextMenuItems", void 0);
    __decorate$b([
        Property()
    ], TreeGrid.prototype, "columnMenuItems", void 0);
    __decorate$b([
        Property()
    ], TreeGrid.prototype, "rowTemplate", void 0);
    __decorate$b([
        Property('Parent')
    ], TreeGrid.prototype, "copyHierarchyMode", void 0);
    __decorate$b([
        Property(null)
    ], TreeGrid.prototype, "rowHeight", void 0);
    __decorate$b([
        Property(true)
    ], TreeGrid.prototype, "enableAltRow", void 0);
    __decorate$b([
        Property(true)
    ], TreeGrid.prototype, "allowKeyboard", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "enableHover", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "enableAutoFill", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "enableAdaptiveUI", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "enableImmutableMode", void 0);
    __decorate$b([
        Property('auto')
    ], TreeGrid.prototype, "height", void 0);
    __decorate$b([
        Property('auto')
    ], TreeGrid.prototype, "width", void 0);
    __decorate$b([
        Complex({}, LoadingIndicator)
    ], TreeGrid.prototype, "loadingIndicator", void 0);
    __decorate$b([
        Property(true)
    ], TreeGrid.prototype, "enableVirtualMaskRow", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "enableVirtualization", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "enableColumnVirtualization", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "enableHtmlSanitizer", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "enableInfiniteScrolling", void 0);
    __decorate$b([
        Complex({}, InfiniteScrollSettings)
    ], TreeGrid.prototype, "infiniteScrollSettings", void 0);
    __decorate$b([
        Property('All')
    ], TreeGrid.prototype, "columnQueryMode", void 0);
    __decorate$b([
        Property(true)
    ], TreeGrid.prototype, "allowSelection", void 0);
    __decorate$b([
        Property(-1)
    ], TreeGrid.prototype, "selectedRowIndex", void 0);
    __decorate$b([
        Complex({}, SelectionSettings)
    ], TreeGrid.prototype, "selectionSettings", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "allowExcelExport", void 0);
    __decorate$b([
        Property(false)
    ], TreeGrid.prototype, "allowPdfExport", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "created", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "load", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "expanding", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "expanded", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "collapsing", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "collapsed", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "cellSave", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "cellSaved", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "actionBegin", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "actionComplete", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "beginEdit", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "batchAdd", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "batchDelete", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "batchCancel", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "beforeBatchAdd", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "beforeBatchDelete", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "beforeBatchSave", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "cellEdit", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "actionFailure", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "dataBound", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "dataSourceChanged", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "dataStateChange", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "recordDoubleClick", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "rowDataBound", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "detailDataBound", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "queryCellInfo", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "rowSelecting", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "rowSelected", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "rowDeselecting", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "rowDeselected", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "headerCellInfo", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "cellSelecting", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "columnMenuOpen", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "columnMenuClick", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "cellSelected", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "cellDeselecting", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "cellDeselected", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "resizeStart", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "resizing", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "resizeStop", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "columnDragStart", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "columnDrag", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "columnDrop", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "checkboxChange", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "printComplete", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "beforePrint", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "toolbarClick", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "beforeDataBound", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "contextMenuOpen", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "contextMenuClick", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "beforeCopy", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "beforePaste", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "rowDrag", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "rowDragStart", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "rowDragStartHelper", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "rowDrop", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "pdfQueryCellInfo", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "pdfHeaderQueryCellInfo", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "excelQueryCellInfo", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "excelHeaderQueryCellInfo", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "beforeExcelExport", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "excelExportComplete", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "beforePdfExport", void 0);
    __decorate$b([
        Event()
    ], TreeGrid.prototype, "pdfExportComplete", void 0);
    TreeGrid = TreeGrid_1 = __decorate$b([
        NotifyPropertyChanges
    ], TreeGrid);
    return TreeGrid;
}(Component));

/**
 * TreeGrid Reorder module
 *
 * @hidden
 */
var Reorder = /** @class */ (function () {
    /**
     * Constructor for Reorder module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Reorder(parent) {
        Grid.Inject(Reorder$1);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Reorder module name
     */
    Reorder.prototype.getModuleName = function () {
        return 'reorder';
    };
    /**
     * @hidden
     * @returns {void}
     */
    Reorder.prototype.addEventListener = function () {
        this.parent.on('getColumnIndex', this.updateTreeColumn, this);
    };
    Reorder.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('getColumnIndex', this.updateTreeColumn);
    };
    /**
     * To destroy the Reorder
     *
     * @returns {void}
     * @hidden
     */
    Reorder.prototype.destroy = function () {
        this.removeEventListener();
    };
    Reorder.prototype.updateTreeColumn = function () {
        this.parent['getTreeColumn']();
    };
    return Reorder;
}());

/**
 * TreeGrid Resize module
 *
 * @hidden
 */
var Resize = /** @class */ (function () {
    /**
     * Constructor for Resize module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Resize(parent) {
        Grid.Inject(Resize$1);
        this.parent = parent;
    }
    /**
     * Resize by field names.
     *
     * @param  {string|string[]} fName - Defines the field name.
     * @returns {void}
     */
    Resize.prototype.autoFitColumns = function (fName) {
        this.parent.grid.autoFitColumns(fName);
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Resize module name
     */
    Resize.prototype.getModuleName = function () {
        return 'resize';
    };
    /**
     * Destroys the Resize.
     *
     * @function destroy
     * @returns {void}
     */
    Resize.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.grid.resizeModule.destroy();
    };
    return Resize;
}());

/**
 * TreeGrid RowDragAndDrop module
 *
 * @hidden
 */
var RowDD = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function RowDD(parent) {
        /** @hidden
         * Indicates whether a row can be dropped into the current target position during a drag-and-drop operation.
         */
        this.canDrop = true;
        /** @hidden
         * Indicates whether the current drag operation includes child records of the dragged item.
         */
        this.isDraggedWithChild = false;
        /** @hidden
         * Indicates whether multiple TreeGrid instances are being managed or displayed.
         */
        this.modifiedRecords = 'modifiedRecords';
        /** @hidden
         * Represents the currently selected item in the TreeGrid.
         */
        this.selectedRecords = 'selectedRecords';
        /** @hidden
         * Holds an array of currently selected records in the TreeGrid.
         */
        this.selectedRows = 'selectedRows';
        /** @hidden
         * Indicates whether there is a droppable item in the TreeGrid.
         */
        this.hasDropItem = true;
        /** @hidden
         * Indicates whether the item is being added to the bottom of the TreeGrid.
         */
        this.isaddtoBottom = false;
        Grid.Inject(RowDD$1);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * Retrieves child records for a specified parent ID in the TreeGrid.
     *
     * @param {string} id - The unique ID of the parent record for which to retrieve child records.
     * @returns {ITreeData[]} An array of child records corresponding to the specified parent ID.
     */
    RowDD.prototype.getChildrecordsByParentID = function (id) {
        var treeGridDataSource;
        if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
            treeGridDataSource = this.parent.grid.dataSource.dataSource.json;
        }
        else {
            treeGridDataSource = this.parent.grid.dataSource;
        }
        var record = treeGridDataSource.filter(function (e) {
            return e.uniqueID === id;
        });
        return record;
    };
    /**
     * @hidden
     * @returns {void}
     */
    RowDD.prototype.addEventListener = function () {
        this.parent.on(rowdraging, this.Rowdraging, this);
        this.parent.on(rowDropped, this.rowDropped, this);
        this.parent.on(rowsAdd, this.rowsAdded, this);
        this.parent.on(rowsRemove, this.rowsRemoved, this);
    };
    /**
     * Reorder the rows based on given indexes and position
     *
     * @returns {void}
     * @param {number[]} fromIndexes - source indexes of rows to be re-ordered
     * @param {number} toIndex - Destination row index
     * @param {string} position - Drop position as above or below or child
     */
    RowDD.prototype.reorderRows = function (fromIndexes, toIndex, position) {
        var tObj = this.parent;
        if (fromIndexes[0] === toIndex || ['above', 'below', 'child'].indexOf(position) === -1) {
            return;
        }
        var action = 'action';
        var dropPosition = 'dropPosition';
        if (fromIndexes[0] !== toIndex && ['above', 'below', 'child'].indexOf(position) !== -1) {
            if (position === 'above') {
                this.dropPosition = 'topSegment';
            }
            if (position === 'below') {
                this.dropPosition = 'bottomSegment';
            }
            if (position === 'child') {
                this.dropPosition = 'middleSegment';
            }
            this.parent["" + dropPosition] = this.dropPosition;
            var data = [];
            for (var i = 0; i < fromIndexes.length; i++) {
                var index = this.parent.getRowByIndex(fromIndexes[parseInt(i.toString(), 10)]).rowIndex;
                data[parseInt(i.toString(), 10)] = this.parent.getCurrentViewRecords()[parseInt(index.toString(), 10)];
            }
            var isByMethod = true;
            var args = {
                data: data,
                dropIndex: toIndex
            };
            if (!isCountRequired(this.parent)) {
                this.dropRows(args, isByMethod);
            }
            //this.refreshGridDataSource();
            if (tObj.isLocalData) {
                tObj.flatData = this.orderToIndex(tObj.flatData);
            }
            if (this.parent["" + action] === 'outdenting') {
                if (!isNullOrUndefined(data[0].parentItem)) {
                    data[0].level = data[0].parentItem.level + 1;
                }
            }
            this.parent.grid.refresh();
            if (this.parent.enableImmutableMode && this.dropPosition === 'middleSegment') {
                var index = this.parent.allowRowDragAndDrop
                    ? this.parent.treeColumnIndex + 1
                    : (this.parent["" + action] === 'indenting' ? this.parent.treeColumnIndex : undefined);
                var row = this.parent.getRows()[fromIndexes[0]];
                var dropData = args.data[0];
                var totalRecord = [];
                var rows = [];
                totalRecord.push(dropData);
                rows.push(row);
                var parentUniqueID = 'parentUniqueID';
                var parentData = getParentData(this.parent, args.data[0]["" + parentUniqueID]);
                var parentrow = this.parent.getRows()[parseInt(toIndex.toString(), 10)];
                totalRecord.push(parentData);
                rows.push(parentrow);
                this.updateRowAndCellElements(totalRecord, rows, index);
            }
            if (this.parent.enableImmutableMode && this.parent["" + action] === 'outdenting') {
                var index = this.parent.allowRowDragAndDrop
                    ? this.parent.treeColumnIndex + 1
                    : (this.parent["" + action] === 'outdenting' ? this.parent.treeColumnIndex : undefined);
                var record = args.data[0];
                var row = this.parent.getRows()[fromIndexes[0]];
                var totalRecord = [];
                var rows = [];
                totalRecord.push(record);
                rows.push(row);
                this.updateRowAndCellElements(totalRecord, rows, index);
            }
        }
    };
    /**
     * Updates the rows and cells
     *
     * @param {Object[]} records - Updates the given records
     * @param {HTMLTableRowElement[]} rows - Updates the given rows
     * @param {number} index -  Updates the given cell index
     * @returns {void}
     */
    RowDD.prototype.updateRowAndCellElements = function (records, rows, index) {
        for (var i = 0; i < records.length; i++) {
            this.parent.renderModule.cellRender({
                data: records[parseInt(i.toString(), 10)], cell: rows[parseInt(i.toString(), 10)].cells[parseInt(index.toString(), 10)],
                column: this.parent.grid.getColumns()[this.parent.treeColumnIndex],
                requestType: 'rowDragAndDrop'
            });
            if (this.parent['action'] === 'indenting' || this.parent['action'] === 'outdenting') {
                this.parent.renderModule.RowModifier({
                    data: records[parseInt(i.toString(), 10)], row: rows[parseInt(i.toString(), 10)]
                });
            }
        }
    };
    /**
     * Performs indent or outdent actions on selected records in the TreeGrid.
     *
     * @param {ITreeData} [record] - The record to be indented or outdented. If undefined, the method operates on the currently selected record.
     * @param {string} [request] - The action to perform, either 'indent' or 'outdent'.
     * @returns {void}
     */
    RowDD.prototype.indentOutdentAction = function (record, request) {
        var tObj = this.parent;
        var action = 'action';
        var droppedIndex = 'dropIndex';
        var selectedItemIndex = -1;
        if (isNullOrUndefined(record) && this.parent.selectedRowIndex === -1) {
            return;
        }
        else {
            if (this.parent.enableVirtualization && this.parent.selectedRowIndex !== -1) {
                selectedItemIndex = this.parent.getSelectedRows()[0].rowIndex;
            }
            else if (this.parent.selectedRowIndex !== -1) {
                selectedItemIndex = this.parent.selectedRowIndex;
            }
            this.selectedItem = isNullOrUndefined(record) ?
                tObj.getCurrentViewRecords()[parseInt(selectedItemIndex.toString(), 10)] : record;
            var primaryKeyField = this.parent.getPrimaryKeyFieldNames()[0];
            var rowIndex = this.parent.grid.getRowIndexByPrimaryKey(this.selectedItem["" + primaryKeyField]);
            this.selectedRow = this.parent[this.selectedRows] = selectedItemIndex !== -1 ?
                this.parent.getSelectedRows()[0]
                : this.parent.grid.getRowByIndex(rowIndex);
            this.selectedRecord = this.parent[this.selectedRecords] = selectedItemIndex !== -1 ?
                tObj.getCurrentViewRecords()[parseInt(selectedItemIndex.toString(), 10)]
                : this.selectedItem;
            if (request === 'indent') {
                var record_1 = tObj.getCurrentViewRecords()[this.selectedRow.rowIndex - 1];
                var dropIndex = void 0;
                if (this.selectedRow.rowIndex === 0 || this.selectedRow.rowIndex === -1 ||
                    tObj.getCurrentViewRecords()[this.selectedRow.rowIndex].level - record_1.level === 1) {
                    return;
                }
                if (record_1.level > this.selectedRecord.level) {
                    for (var i = 0; i < tObj.getCurrentViewRecords().length; i++) {
                        if (tObj.getCurrentViewRecords()[parseInt(i.toString(), 10)].taskData ===
                            record_1.parentItem.taskData) {
                            dropIndex = i;
                            if (tObj.enableVirtualization) {
                                dropIndex = parseInt(tObj.getRows()[parseInt(i.toString(), 10)].getAttribute('aria-rowindex'), 10) - 1;
                            }
                        }
                    }
                }
                else {
                    dropIndex = this.selectedRow.rowIndex - 1;
                }
                if (this.parent.enableVirtualization && this.selectedRecord && !(record_1.level > this.selectedRecord.level)) {
                    dropIndex = parseInt(this.selectedRow.getAttribute('aria-rowindex'), 10) - 2;
                }
                tObj["" + action] = 'indenting';
                tObj["" + droppedIndex] = dropIndex;
                this.eventTrigger('indenting', dropIndex);
            }
            else if (request === 'outdent') {
                var isInvalidSelection = this.selectedRow.rowIndex === -1 || this.selectedRow.rowIndex === 0;
                var isRootLevel = tObj.getCurrentViewRecords()[this.selectedRow.rowIndex].level === 0;
                if (isInvalidSelection || isRootLevel) {
                    return;
                }
                var parentItem_1 = this.selectedRecord.parentItem;
                var records = tObj.getCurrentViewRecords();
                var dropIndex = records.findIndex(function (record) { return record.uniqueID === parentItem_1.uniqueID; });
                if (dropIndex === -1) {
                    return;
                }
                if (this.parent.enableVirtualization && this.selectedRecord) {
                    var ariaRowIndex = this.parent.getRows()[parseInt(dropIndex.toString(), 10)].getAttribute('aria-rowindex');
                    dropIndex = parseInt(ariaRowIndex, 10) - 1;
                }
                tObj["" + action] = 'outdenting';
                tObj["" + droppedIndex] = dropIndex;
                this.eventTrigger('outdenting', dropIndex);
            }
        }
    };
    /**
     * Triggers a specified event for the TreeGrid, notifying subscribers about the event occurrence.
     *
     * @param {string} action - The action to be triggered, either 'indenting' or 'outdenting'.
     * @param {number} dropIndex - The index at which the row should be dropped.
     * @returns {void}
     */
    RowDD.prototype.eventTrigger = function (action, dropIndex) {
        var _this = this;
        var actionArgs = {
            action: action,
            cancel: false,
            data: [this.parent[this.selectedRecords]],
            row: this.parent[this.selectedRows]
        };
        this.parent.trigger(actionBegin, actionArgs, function (actionArgs) {
            if (!actionArgs.cancel) {
                if (actionArgs.action === 'indenting') {
                    if (_this.parent.enableVirtualization) {
                        _this.reorderRows([parseInt(_this.selectedRow.getAttribute('aria-rowindex'), 10) - 1], dropIndex, 'child');
                    }
                    else {
                        _this.reorderRows([_this.selectedRow.rowIndex], dropIndex, 'child');
                    }
                }
                else if (actionArgs.action === 'outdenting') {
                    if (_this.parent.enableVirtualization) {
                        _this.reorderRows([parseInt(_this.selectedRow.getAttribute('aria-rowindex'), 10) - 1], dropIndex, 'below');
                    }
                    else {
                        _this.reorderRows([_this.selectedRow.rowIndex], dropIndex, 'below');
                    }
                }
            }
        });
    };
    /**
     * Reorders the flat data array of the TreeGrid and updates the index of each record.
     *
     * @param {ITreeData[]} currentData - The array of tree data records to reorder.
     * @returns {ITreeData[]} The updated array of tree data records with indices set.
     */
    RowDD.prototype.orderToIndex = function (currentData) {
        for (var i = 0; i < currentData.length; i++) {
            currentData[parseInt(i.toString(), 10)].index = i;
            if (!isNullOrUndefined(currentData[parseInt(i.toString(), 10)].parentItem)) {
                var updatedParent = getValue('uniqueIDCollection.' + currentData[parseInt(i.toString(), 10)].parentUniqueID, this.parent);
                currentData[parseInt(i.toString(), 10)].parentItem.index = updatedParent.index;
            }
        }
        return currentData;
    };
    /**
     * Handles the addition of new rows to the TreeGrid.
     *
     * @param {Object} e - The event object containing information about the rows being added.
     * @param {number} e.toIndex - The index at which the new rows should be added in the TreeGrid.
     * @param {Object[]} e.records - An array of the records to be added to the TreeGrid.
     *
     * @returns {void} This function does not return any value.
     */
    RowDD.prototype.rowsAdded = function (e) {
        var draggedRecord;
        var dragRecords = e.records;
        for (var i = e.records.length - 1; i > -1; i--) {
            draggedRecord = dragRecords[parseInt(i.toString(), 10)];
            if (draggedRecord.parentUniqueID) {
                var record = dragRecords.filter(function (data) {
                    return data.uniqueID === draggedRecord.parentUniqueID;
                });
                if (record.length) {
                    var index = record[0].childRecords.indexOf(draggedRecord);
                    var parentRecord = record[0];
                    if (index !== -1) {
                        if (isNullOrUndefined(this.parent.idMapping)) {
                            parentRecord.childRecords.splice(index, 1);
                            if (!parentRecord.childRecords.length) {
                                parentRecord.hasChildRecords = false;
                                parentRecord.hasFilteredChildRecords = false;
                            }
                        }
                        this.isDraggedWithChild = true;
                    }
                }
            }
        }
        if (isNullOrUndefined(this.parent.dataSource) || !this.parent.dataSource.length) {
            var tObj = this.parent;
            var draggedRecord_1;
            var dragRecords_1 = e.records;
            var dragLength = e.records.length;
            for (var i = dragLength - 1; i > -1; i--) {
                draggedRecord_1 = dragRecords_1[parseInt(i.toString(), 10)];
                if (!i && draggedRecord_1.hasChildRecords) {
                    draggedRecord_1.taskData[this.parent.parentIdMapping] = null;
                }
                var recordIndex1 = 0;
                if (!isNullOrUndefined(tObj.parentIdMapping)) {
                    tObj.childMapping = null;
                }
                if (!isNullOrUndefined(draggedRecord_1.taskData) && !isNullOrUndefined(tObj.childMapping) &&
                    !Object.prototype.hasOwnProperty.call(draggedRecord_1.taskData, tObj.childMapping)) {
                    draggedRecord_1.taskData[tObj.childMapping] = [];
                }
                if (!isNullOrUndefined(draggedRecord_1[tObj.childMapping])) {
                    if (Object.prototype.hasOwnProperty.call(draggedRecord_1, tObj.childMapping) &&
                        (draggedRecord_1[tObj.childMapping]).length && !this.isDraggedWithChild &&
                        !isNullOrUndefined(tObj.parentIdMapping)) {
                        var childData = (draggedRecord_1[tObj.childMapping]);
                        for (var j = 0; j < childData.length; j++) {
                            if (dragRecords_1.indexOf(childData[parseInt(j.toString(), 10)]) === -1) {
                                dragRecords_1.splice(j, 0, childData[parseInt(j.toString(), 10)]);
                                childData[parseInt(j.toString(), 10)].taskData = extend$1({}, childData[parseInt(j.toString(), 10)]);
                                i += 1;
                            }
                        }
                    }
                }
                if (Object.prototype.hasOwnProperty.call(draggedRecord_1, tObj.parentIdMapping)
                    && draggedRecord_1[tObj.parentIdMapping] !== null
                    && !this.isDraggedWithChild) {
                    draggedRecord_1.taskData[tObj.parentIdMapping] = null;
                    delete draggedRecord_1.parentItem;
                    delete draggedRecord_1.parentUniqueID;
                }
                if (isNullOrUndefined(tObj.dataSource)) {
                    tObj.dataSource = [];
                }
                tObj.dataSource.splice(recordIndex1, 0, draggedRecord_1.taskData);
            }
            tObj.setProperties({ dataSource: tObj.dataSource }, false);
        }
        else {
            for (var i = 0; i < dragRecords.length; i++) {
                setValue('uniqueIDCollection.' + dragRecords[parseInt(i.toString(), 10)].uniqueID, dragRecords[parseInt(i.toString(), 10)], this.parent);
            }
            var args = { data: e.records, dropIndex: e.toIndex };
            if (this.parent.dataSource instanceof DataManager) {
                this.treeGridData = this.parent.dataSource.dataSource.json;
                this.treeData = this.parent.dataSource.dataSource.json;
            }
            else {
                this.treeGridData = this.parent.grid.dataSource;
                this.treeData = this.parent.dataSource;
            }
            if (isNullOrUndefined(this.dropPosition)) {
                this.dropPosition = 'bottomSegment';
                args.dropIndex = this.parent.getCurrentViewRecords().length > 1 ? this.parent.getCurrentViewRecords().length - 1 :
                    args.dropIndex;
                args.data = args.data.map(function (i) {
                    if (i.hasChildRecords && isNullOrUndefined(i.parentItem)) {
                        i.level = 0;
                        return i;
                    }
                    else {
                        delete i.parentItem;
                        delete i.parentUniqueID;
                        i.level = 0;
                        return i;
                    }
                });
            }
            this.dropRows(args);
        }
    };
    /**
     * Handles the removal of specified rows from the TreeGrid.
     *
     * @param {Object} e - The event object containing information about the removed rows.
     * @param {number[]} e.indexes - An array of indexes of the rows that were removed.
     * @param {Object[]} e.records - An array of the records corresponding to the removed rows.
     *
     * @returns {void} This function does not return any value.
     */
    RowDD.prototype.rowsRemoved = function (e) {
        for (var i = 0; i < e.records.length; i++) {
            this.draggedRecord = e.records[parseInt(i.toString(), 10)];
            if (this.draggedRecord.hasChildRecords || this.draggedRecord.parentItem &&
                this.parent.grid.dataSource.
                    indexOf(this.getChildrecordsByParentID(this.draggedRecord.parentUniqueID)[0]) !== -1 ||
                this.draggedRecord.level === 0) {
                this.deleteDragRow();
            }
        }
    };
    /**
     * Refreshes the data source of the TreeGrid.
     *
     * @returns {void} This function does not return any value.
     */
    RowDD.prototype.refreshGridDataSource = function () {
        var draggedRecord = this.draggedRecord;
        var droppedRecord = this.droppedRecord;
        var proxy = this.parent;
        var temporaryDataSource;
        var indexOfDroppedRecord;
        if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
            temporaryDataSource = proxy.dataSource.dataSource.json;
        }
        else {
            temporaryDataSource = proxy.dataSource;
        }
        if (temporaryDataSource && (!isNullOrUndefined(droppedRecord) && !droppedRecord.parentItem)
            && !isNullOrUndefined(droppedRecord.taskData)) {
            var keys = Object.keys(temporaryDataSource);
            for (var i = 0; i < keys.length; i++) {
                if (temporaryDataSource[parseInt(i.toString(), 10)][this.parent.childMapping] ===
                    droppedRecord.taskData[this.parent.childMapping]) {
                    indexOfDroppedRecord = i;
                }
            }
            if (!this.parent.idMapping) {
                var positionAdjustment = this.dropPosition === 'topSegment' ? 0 : 1;
                if (this.dropPosition === 'topSegment' || this.dropPosition === 'bottomSegment') {
                    temporaryDataSource.splice(indexOfDroppedRecord + positionAdjustment, 0, draggedRecord.taskData);
                }
            }
        }
        else if (!this.parent.parentIdMapping && (!isNullOrUndefined(droppedRecord) && droppedRecord.parentItem)) {
            if (this.dropPosition === 'topSegment' || this.dropPosition === 'bottomSegment') {
                var record = this.getChildrecordsByParentID(droppedRecord.parentUniqueID)[0];
                var childRecords = record.childRecords;
                for (var i = 0; i < childRecords.length; i++) {
                    droppedRecord.parentItem.taskData[this.parent.childMapping][parseInt(i.toString(), 10)]
                        = childRecords[parseInt(i.toString(), 10)].taskData;
                }
            }
        }
        if (this.parent.parentIdMapping) {
            if (draggedRecord.parentItem) {
                if (this.dropPosition === 'topSegment' || this.dropPosition === 'bottomSegment') {
                    draggedRecord[this.parent.parentIdMapping] = droppedRecord[this.parent.parentIdMapping];
                    draggedRecord.taskData[this.parent.parentIdMapping] = droppedRecord[this.parent.parentIdMapping];
                }
                else {
                    draggedRecord[this.parent.parentIdMapping] = droppedRecord[this.parent.idMapping];
                    draggedRecord.taskData[this.parent.parentIdMapping] = droppedRecord[this.parent.idMapping];
                }
            }
            else {
                draggedRecord.taskData[this.parent.parentIdMapping] = null;
                draggedRecord[this.parent.parentIdMapping] = null;
            }
        }
    };
    /**
     * Removes the border from the first row of the TreeGrid.
     *
     * @param {HTMLTableRowElement} element - The table row element from which to remove the border.
     * @returns {void} This function does not return any value.
     */
    RowDD.prototype.removeFirstrowBorder = function (element) {
        var canremove = this.dropPosition === 'bottomSegment';
        if (this.parent.element.getElementsByClassName('e-firstrow-border').length > 0 && element &&
            (element.rowIndex !== 0 || canremove)) {
            this.parent.element.getElementsByClassName('e-firstrow-border')[0].remove();
        }
    };
    /**
     * Removes the border from the last row of the TreeGrid.
     *
     * @param {HTMLTableRowElement} element - The row element from which to remove the last row border.
     * @returns {void}
     */
    RowDD.prototype.removeLastrowBorder = function (element) {
        if (!element) {
            return;
        }
        var isEmptyRow = element.classList.contains('e-emptyrow') ||
            element.classList.contains('e-columnheader') ||
            element.classList.contains('e-detailrow');
        if (isEmptyRow) {
            return;
        }
        var lastRow = this.parent.enableVirtualization ?
            this.parent.getRows()[this.parent.getCurrentViewRecords().length - 1] :
            this.parent.getRowByIndex(this.parent.getCurrentViewRecords().length - 1);
        var isNotLastRow = lastRow.getAttribute('data-uid') !== element.getAttribute('data-uid');
        var canRemove = isNotLastRow || this.dropPosition === 'topSegment';
        var lastRowBorderElement = this.parent.element.getElementsByClassName('e-lastrow-border')[0];
        if (lastRowBorderElement && canRemove) {
            lastRowBorderElement.remove();
        }
    };
    /**
     * Updates the icons associated with the specified rows in the TreeGrid.
     *
     * @param {Element[]} row - The array of row elements to update the icons for.
     * @param {number} index - The index of the row being updated.
     * @param {RowDragEventArgs} args - The event arguments associated with the row drag operation.
     * @returns {string} The drop position ('topSegment', 'middleSegment', 'bottomSegment', or 'Invalid').
     */
    RowDD.prototype.updateIcon = function (row, index, args) {
        var rowEle = args.target ? closest(args.target, 'tr') : null;
        this.dropPosition = undefined;
        var rowPositionHeight = 0;
        this.removeFirstrowBorder(rowEle);
        this.removeLastrowBorder(rowEle);
        for (var i = 0; i < args.rows.length; i++) {
            if (!isNullOrUndefined(rowEle) && rowEle.getAttribute('data-uid') === args.rows[parseInt(i.toString(), 10)].getAttribute('data-uid')
                || !parentsUntil(args.target, 'e-gridcontent')) {
                this.dropPosition = 'Invalid';
                this.addErrorElem();
                if (isNullOrUndefined(this.parent.rowDropSettings.targetID)) {
                    this.removetopOrBottomBorder();
                    this.removeChildBorder();
                }
            }
        }
        // To get the corresponding drop position related to mouse position
        var tObj = this.parent;
        var rowTop = 0;
        var roundOff = 0;
        var toolHeight = tObj.toolbar && tObj.toolbar.length ?
            document.getElementById(tObj.element.id + '_gridcontrol_toolbarItems').offsetHeight : 0;
        // tObj.lastRow = tObj.getRowByIndex(tObj.getCurrentViewRecords().length - 1);
        var positionOffSet = this.getOffset(tObj.element);
        // let contentHeight1: number = (tObj.element.offsetHeight  - (tObj.getContent() as HTMLElement).offsetHeight) + positionOffSet.top;
        var contentHeight = tObj.getHeaderContent().offsetHeight + positionOffSet.top + toolHeight;
        var scrollTop = tObj.getContent().firstElementChild.scrollTop;
        if (!isNullOrUndefined(rowEle)) {
            rowPositionHeight = rowEle.offsetTop - scrollTop;
        }
        // let scrollTop = (tObj.grid.scrollModule as any).content.scrollTop;
        if (this.parent.enableVirtualization) {
            rowTop = rowEle.getBoundingClientRect().top;
        }
        else {
            rowTop = rowPositionHeight + contentHeight + roundOff;
        }
        var rowBottom = row[0].offsetHeight !== 0 && isNullOrUndefined(rowEle) ?
            rowTop + row[0].offsetHeight : rowTop + rowEle.offsetHeight;
        var difference = rowBottom - rowTop;
        var divide = difference / 3;
        var topRowSegment = rowTop + divide;
        var middleRowSegment = topRowSegment + divide;
        var bottomRowSegment = middleRowSegment + divide;
        var mouseEvent = getObject('originalEvent.event', args);
        var touchEvent = getObject('originalEvent.event', args);
        var posy = (mouseEvent.type === 'mousemove') ? mouseEvent.pageY : ((!isNullOrUndefined(touchEvent) &&
            !isNullOrUndefined(touchEvent.changedTouches)) ? touchEvent.changedTouches[0].pageY : null);
        if (this.parent.enableVirtualization) {
            posy = (mouseEvent.type === 'mousemove') ? mouseEvent.clientY : ((!isNullOrUndefined(touchEvent) &&
                !isNullOrUndefined(touchEvent.changedTouches)) ? touchEvent.changedTouches[0].clientY : null);
        }
        var isTopSegment = posy <= topRowSegment;
        var isMiddleRowSegment = (posy > topRowSegment && posy <= middleRowSegment);
        var isBottomRowSegment = (posy > middleRowSegment && posy <= bottomRowSegment);
        var isBorderNeed = true;
        if (isTopSegment || isMiddleRowSegment || isBottomRowSegment) {
            if (isTopSegment && this.dropPosition !== 'Invalid') {
                this.removeChildBorder();
                this.dropPosition = 'topSegment';
                this.removetopOrBottomBorder();
                this.addFirstrowBorder(rowEle);
                this.removeErrorElem();
                this.removeLastrowBorder(rowEle);
            }
            if (isMiddleRowSegment && this.dropPosition !== 'Invalid') {
                this.removetopOrBottomBorder();
                this.dropPosition = 'middleSegment';
                this.addLastRowborder(rowEle);
                this.addFirstrowBorder(rowEle);
            }
            if (isBottomRowSegment && this.dropPosition !== 'Invalid') {
                this.removeErrorElem();
                this.removetopOrBottomBorder();
                this.removeChildBorder();
                this.dropPosition = 'bottomSegment';
                this.addLastRowborder(rowEle);
                this.removeFirstrowBorder(rowEle);
            }
            if ((isTopSegment || isBottomRowSegment) && this.dropPosition !== 'Invalid') {
                isBorderNeed = this.updateBorderStatus(row, index);
                this.topOrBottomBorder(args.target, isBorderNeed);
            }
            else if (isMiddleRowSegment && this.dropPosition !== 'Invalid') {
                var rowElement = [];
                var element = closest(args.target, 'tr');
                rowElement = [].slice.call(element.querySelectorAll('.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse'));
                isBorderNeed = this.updateBorderStatus(row, index);
                if (rowElement.length > 0 && isBorderNeed) {
                    this.addRemoveClasses(rowElement, true, 'e-childborder');
                }
            }
        }
        return this.dropPosition;
    };
    /**
     * Updates the border status for a specified row and index.
     *
     * @private
     * @param {Element[]} row - The array of row elements to be updated.
     * @param {number} index - The index of the row element for which the border status is to be updated.
     * @returns {boolean} - Returns true if the border status was successfully updated, otherwise false.
     */
    RowDD.prototype.updateBorderStatus = function (row, index) {
        var _this = this;
        var isBorderNeed = true;
        var rows = this.parent.grid.getRows();
        var childRows = [];
        var hasDetailTemplate = false;
        if (!isNullOrUndefined(this.parent.detailTemplate)) {
            rows = this.parent.getDataRows();
            hasDetailTemplate = true;
        }
        var treegridColumnIndex = this.parent.treeColumnIndex;
        var treeColIndex = this.parent.allowRowDragAndDrop ?
            (hasDetailTemplate ? treegridColumnIndex + 2 : treegridColumnIndex + 1) :
            (hasDetailTemplate ? treegridColumnIndex + 1 : treegridColumnIndex);
        if (!isNullOrUndefined(this.parent.rowDropSettings.targetID)) {
            treeColIndex = treegridColumnIndex;
        }
        var dragRows = row;
        var targetRow = [rows["" + index]];
        if (this.dropPosition === 'topSegment') {
            row.filter(function (e) {
                if (isNullOrUndefined(e) || isNullOrUndefined(e.cells) || isNullOrUndefined(targetRow[0]) ||
                    isNullOrUndefined(targetRow[0].cells)) {
                    return true;
                }
                var regex = /index(\d+)|level(\d+)/g;
                var parentIndexLevel = e === null || e === undefined ? undefined : e.cells["" + treeColIndex].className.match(regex);
                var dropIndexLevel = targetRow[0].cells["" + treeColIndex].className.match(regex);
                if (isNullOrUndefined(dropIndexLevel) || isNullOrUndefined(dropIndexLevel)) {
                    return true;
                }
                var parentLevel = +parentIndexLevel[1].match(/\d+/)[0];
                var dropParentLevel = +dropIndexLevel[1].match(/\d+/)[0];
                var InDraggedRowIndex = false;
                if (parentLevel !== 0 && parentLevel !== dropParentLevel) {
                    return true;
                }
                for (var i = 0; i < rows.length; i++) {
                    if (rows[parseInt(i.toString(), 10)] === dragRows[0]) {
                        InDraggedRowIndex = true;
                    }
                    if (InDraggedRowIndex && rows[parseInt(i.toString(), 10)] !== dragRows[0]) {
                        var parentIndexLevelInRow = rows[parseInt(i.toString(), 10)].cells["" + treeColIndex].className.match(regex);
                        var parentLevelInRow = +parentIndexLevelInRow[1].match(/\d+/)[0];
                        if (parentLevelInRow !== parentLevel && parentLevelInRow > parentLevel) {
                            childRows.push(rows[parseInt(i.toString(), 10)]);
                        }
                        else {
                            break;
                        }
                    }
                }
                if (parentLevel === dropParentLevel && ((childRows.length > 0 && parseInt(row[0].getAttribute('aria-rowindex'), 10) - 1 === index - (childRows.length + 1)) || (childRows.length === 0 && parseInt(row[0].getAttribute('aria-rowindex'), 10) - 1 === index - 1))) {
                    isBorderNeed = false;
                }
                return true;
            });
            isBorderNeed = (!isNullOrUndefined(row) && childRows.length === 0 && !isNullOrUndefined(row[0].getAttribute('aria-rowindex')) && parseInt(row[0].getAttribute('aria-rowindex'), 10) - 1 === index - 1) && isNullOrUndefined(row[0]) ? false : isBorderNeed;
        }
        if (this.dropPosition === 'bottomSegment') {
            targetRow.filter(function (e) {
                if (isNullOrUndefined(e) || isNullOrUndefined(e.cells) || isNullOrUndefined(dragRows[0]) ||
                    isNullOrUndefined(dragRows[0].cells)) {
                    return true;
                }
                var regex = /index(\d+)|level(\d+)/g;
                var parentIndexLevel = e === null || e === undefined ? undefined : e.cells["" + treeColIndex].className.match(regex);
                var dragIndexLevel = dragRows[0].cells["" + treeColIndex].className.match(regex);
                if (isNullOrUndefined(dragIndexLevel) || isNullOrUndefined(parentIndexLevel)) {
                    return true;
                }
                var parentLevel = +parentIndexLevel[1].match(/\d+/)[0];
                var dragParentLevel = +dragIndexLevel[1].match(/\d+/)[0];
                var InDraggedRowIndex = false;
                if (parentLevel !== 0 && parentLevel !== dragParentLevel) {
                    return true;
                }
                for (var i = 0; i < rows.length; i++) {
                    if (rows[parseInt(i.toString(), 10)] === targetRow[0]) {
                        InDraggedRowIndex = true;
                    }
                    if (InDraggedRowIndex && rows[parseInt(i.toString(), 10)] !== targetRow[0]) {
                        var parentIndexLevelInRow = rows[parseInt(i.toString(), 10)].cells["" + treeColIndex].className.match(regex);
                        var parentLevelInRow = +parentIndexLevelInRow[1].match(/\d+/)[0];
                        if (parentLevelInRow !== parentLevel && parentLevelInRow > parentLevel) {
                            childRows.push(rows[parseInt(i.toString(), 10)]);
                        }
                        else {
                            break;
                        }
                    }
                }
                if (!isNullOrUndefined(row) && parentLevel === dragParentLevel && ((childRows.length > 0 && !isNullOrUndefined(row[0].getAttribute('aria-rowindex')) && parseInt(row[0].getAttribute('aria-rowindex'), 10) - 1 === index + (childRows.length + 1)) || (childRows.length === 0 && !isNullOrUndefined(row[0].getAttribute('aria-rowindex')) && parseInt(row[0].getAttribute('aria-rowindex'), 10) - 1 === index + 1))) {
                    isBorderNeed = false;
                }
                return true;
            });
            isBorderNeed = (!isNullOrUndefined(row) && childRows.length === 0 && !isNullOrUndefined(row[0].getAttribute('aria-rowindex')) && parseInt(row[0].getAttribute('aria-rowindex'), 10) - 1 === index + 1) && isNullOrUndefined(row[0]) ? false : isBorderNeed;
        }
        if (this.dropPosition === 'middleSegment') {
            targetRow.filter(function (e) {
                if (isNullOrUndefined(e) || isNullOrUndefined(e.cells) || isNullOrUndefined(dragRows[0]) ||
                    isNullOrUndefined(dragRows[0].cells)) {
                    return true;
                }
                for (var i = 0; i < dragRows.length; i++) {
                    var regex = /index(\d+)|level(\d+)/g;
                    var dropActualIndex = targetRow[0].rowIndex;
                    var dragIndexLevel = dragRows[parseInt(i.toString(), 10)].cells["" + treeColIndex].className.match(regex);
                    if (!dragIndexLevel) {
                        return true;
                    }
                    var dragIndex = parseInt(dragIndexLevel.find(function (item) { return item.includes('index'); }).match(/\d+/)[0] || '0', 10);
                    if (hasDetailTemplate) {
                        dropActualIndex = dropActualIndex / 2;
                    }
                    if (dragIndex === dropActualIndex) {
                        isBorderNeed = false;
                    }
                    else {
                        isBorderNeed = true;
                        break;
                    }
                }
                if (!isBorderNeed) {
                    _this.dropPosition = 'Invalid';
                    _this.addErrorElem();
                }
                return isBorderNeed;
            });
        }
        this.canDrop = isBorderNeed;
        return isBorderNeed;
    };
    /**
     * Removes the visual border from all child rows within the TreeGrid.
     *
     * @returns {void} No return value.
     */
    RowDD.prototype.removeChildBorder = function () {
        var borderElem = [];
        borderElem = [].slice.call(this.parent.element.querySelectorAll('.e-childborder'));
        if (borderElem.length > 0) {
            this.addRemoveClasses(borderElem, false, 'e-childborder');
        }
    };
    /**
     * Adds a visual border to the first row of the TreeGrid.
     *
     * @param {HTMLTableRowElement} targetRow - The target row element to which the border will be added, if it is the first row.
     * @returns {void} No return value.
     */
    RowDD.prototype.addFirstrowBorder = function (targetRow) {
        var node = this.parent.element;
        var tObj = this.parent;
        if (targetRow && targetRow.rowIndex === 0 && !targetRow.classList.contains('e-emptyrow')) {
            var div = this.parent.createElement('div', { className: 'e-firstrow-border' });
            var gridheaderEle = this.parent.getHeaderContent();
            var toolbarHeight = 0;
            if (tObj.toolbar) {
                toolbarHeight = tObj.toolbarModule.getToolbar().offsetHeight;
            }
            var multiplegrid = !isNullOrUndefined(this.parent.rowDropSettings.targetID);
            if (multiplegrid) {
                div.style.top = this.parent.grid.element.getElementsByClassName('e-gridheader')[0].offsetHeight
                    + toolbarHeight + 'px';
            }
            div.style.width = multiplegrid ? node.offsetWidth + 'px' :
                node.offsetWidth - this.getScrollWidth() + 'px';
            if (!gridheaderEle.querySelectorAll('.e-firstrow-border').length) {
                gridheaderEle.appendChild(div);
            }
        }
    };
    /**
     * Adds a visual border to the last row of the TreeGrid.
     *
     * @param {HTMLTableRowElement} trElement - The table row element to which the border will be added, if it is the last row.
     * @returns {void} No return value.
     */
    RowDD.prototype.addLastRowborder = function (trElement) {
        if (!trElement) {
            return;
        }
        var isEmptyRow = trElement && (trElement.classList.contains('e-emptyrow') ||
            trElement.classList.contains('e-columnheader') || trElement.classList.contains('e-detailrow'));
        if (isEmptyRow) {
            return;
        }
        if (trElement && !isEmptyRow && this.parent.getRows()[this.parent.getCurrentViewRecords().length - 1].getAttribute('data-uid') ===
            trElement.getAttribute('data-uid')) {
            var bottomborder = this.parent.createElement('div', { className: 'e-lastrow-border' });
            var gridcontentEle = this.parent.getContent();
            bottomborder.style.width = this.parent.element.offsetWidth - this.getScrollWidth() + 'px';
            if (!gridcontentEle.querySelectorAll('.e-lastrow-border').length) {
                gridcontentEle.classList.add('e-treegrid-relative');
                gridcontentEle.appendChild(bottomborder);
                bottomborder.style.bottom = this.getScrollWidth() + 'px';
            }
        }
    };
    /**
     * Retrieves the total scroll width of the TreeGrid content area.
     *
     * @returns {number} The width of the scrollbar if content overflows, otherwise 0.
     */
    RowDD.prototype.getScrollWidth = function () {
        var scrollElem = this.parent.getContent().firstElementChild;
        return scrollElem.scrollWidth > scrollElem.offsetWidth ? Scroll.getScrollBarWidth() : 0;
    };
    /**
     * Adds an error element to the dragged row element during a row drag-and-drop operation.
     *
     * @returns {void} No return value.
     */
    RowDD.prototype.addErrorElem = function () {
        var dragelem = document.getElementsByClassName('e-cloneproperties')[0];
        var errorelemCount = dragelem.querySelectorAll('.e-errorelem').length;
        var sanitize = 'sanitize';
        if (!errorelemCount && !this.parent.rowDropSettings.targetID) {
            var errorContainer = document.createElement('div');
            errorContainer.classList.add('e-errorcontainer', 'e-icons', 'e-errorelem');
            var rowCell = dragelem.querySelector('.e-rowcell');
            var errorVal = dragelem.querySelector('.errorValue');
            var content = rowCell.innerHTML;
            if (errorVal) {
                content = this.parent["" + sanitize](errorVal.innerHTML);
                errorVal.parentNode.removeChild(errorVal);
            }
            rowCell.innerHTML = '';
            var spanContent = document.createElement('span');
            spanContent.className = 'errorValue';
            spanContent.style.paddingLeft = '16px';
            spanContent.innerHTML = this.parent["" + sanitize](content);
            rowCell.appendChild(errorContainer);
            rowCell.appendChild(spanContent);
            var dropItemSpan = document.querySelector('.e-dropitemscount');
            if (this.hasDropItem && dropItemSpan) {
                var dropItemLeft = parseInt(dropItemSpan.style.left, 10) + errorContainer.offsetWidth + 16;
                var spanLeft = !this.parent.enableRtl ? dropItemLeft : 0;
                dropItemSpan.style.left = spanLeft + "px";
                this.hasDropItem = false;
            }
        }
    };
    /**
     * Removes the error element from the DOM and adjusts the position of the drop item count if necessary.
     *
     * @returns {void} No return value.
     */
    RowDD.prototype.removeErrorElem = function () {
        var errorelem = document.querySelector('.e-errorelem');
        var errorValue = document.querySelector('.errorValue');
        var dropItemSpan = document.querySelector('.e-dropitemscount');
        if (errorelem) {
            if (dropItemSpan) {
                var dropItemLeft = parseInt(dropItemSpan.style.left, 10) - errorelem.offsetWidth - 16;
                setStyleAttribute(errorValue, {
                    paddingLeft: '0px'
                });
                if (!this.parent.enableRtl) {
                    setStyleAttribute(dropItemSpan, {
                        left: dropItemLeft + "px"
                    });
                }
            }
            errorelem.remove();
        }
        this.hasDropItem = true;
    };
    /**
     * Applies drop border styles to row elements based on the current drop position ('topSegment' or 'bottomSegment').
     *
     * @param {Element} target - The target element where the drop action is taking place.
     * @param {boolean} [isBorderNeed=true] - Indicates whether a border is needed during the drop action. Defaults to `true`.
     * @returns {void} No return value.
     */
    RowDD.prototype.topOrBottomBorder = function (target, isBorderNeed) {
        if (isBorderNeed === void 0) { isBorderNeed = true; }
        var element = closest(target, 'tr');
        var rowElements = element ?
            Array.from(element.querySelectorAll('.e-rowcell, .e-rowdragdrop, .e-detailrowcollapse')) : [];
        if (!rowElements.length) {
            return;
        }
        var classAction = isBorderNeed ? this.addRemoveClasses.bind(this, rowElements, true) : this.addRemoveClasses.bind(this, rowElements, false, 'e-dragborder');
        if (this.dropPosition === 'topSegment') {
            classAction('e-droptop');
            var lastRowDragBorder = this.parent.element.querySelector('.e-lastrow-dragborder');
            if (lastRowDragBorder) {
                lastRowDragBorder.remove();
            }
        }
        if (this.dropPosition === 'bottomSegment') {
            classAction('e-dropbottom');
        }
    };
    /**
     * Removes the drop border classes ('e-dropbottom' and 'e-droptop') from the parent element if present.
     *
     * @returns {void} No return value.
     */
    RowDD.prototype.removetopOrBottomBorder = function () {
        var border = [];
        border = [].slice.call(this.parent.element.querySelectorAll('.e-dropbottom, .e-droptop'));
        if (border.length) {
            this.addRemoveClasses(border, false, 'e-dropbottom');
            this.addRemoveClasses(border, false, 'e-droptop');
        }
    };
    /**
     * Adds or removes a specified class from a list of HTML elements.
     *
     * @param {Element[]} cells - The list of HTML elements to which the class will be added or removed.
     * @param {boolean} add - A flag indicating whether to add (`true`) or remove (`false`) the class.
     * @param {string} className - The class name to be added or removed from each element in `cells`.
     * @returns {void} No return value.
     */
    RowDD.prototype.addRemoveClasses = function (cells, add, className) {
        for (var i = 0, len = cells.length; i < len; i++) {
            if (add) {
                cells[parseInt(i.toString(), 10)].classList.add(className);
            }
            else {
                cells[parseInt(i.toString(), 10)].classList.remove(className);
            }
        }
    };
    /**
     * Calculates the offset position of the specified HTML element relative to the document.
     *
     * @param {Element} element - The HTML element for which the offset position is calculated.
     * @returns {PositionOffSet} The offset position containing `top` and `left` values.
     */
    RowDD.prototype.getOffset = function (element) {
        var box = element.getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        return { top: Math.round(top), left: Math.round(left) };
    };
    /**
     * Handles the dragging of rows in the TreeGrid.
     *
     * @param {RowDragEventArgs} args - The event arguments for the row drag action.
     * @returns {void} This function does not return a value.
     */
    RowDD.prototype.Rowdraging = function (args) {
        var tObj = this.parent;
        var cloneElement = this.parent.element.querySelector('.e-cloneproperties');
        if (!cloneElement) {
            return;
        }
        cloneElement.style.cursor = '';
        var rowEle = args.target ? closest(args.target, 'tr') : null;
        var rowIdx = -1;
        if (!isNullOrUndefined(this.parent.detailTemplate)) {
            rowIdx = rowEle ? this.parent.getDataRows().indexOf(rowEle) : -1;
        }
        else {
            rowIdx = rowEle ? rowEle.rowIndex : -1;
        }
        if (rowIdx === -1) {
            this.canDrop = false;
            this.addErrorElem();
            this.removetopOrBottomBorder();
            this.removeChildBorder();
            return;
        }
        var dragRecords = Array.isArray(args.data) ? args.data : [args.data];
        var droppedRecord = tObj.getCurrentViewRecords()[parseInt(rowIdx.toString(), 10)];
        this.removeErrorElem();
        this.canDrop = true;
        this.ensuredropPosition(dragRecords, droppedRecord);
        if (!tObj.rowDropSettings.targetID && this.canDrop && !isNullOrUndefined(args.rows[0])) {
            tObj.rowDragAndDropModule.updateIcon(args.rows, rowIdx, args);
        }
        if (tObj.rowDropSettings.targetID) {
            var dropElement = parentsUntil(args.target, 'e-treegrid');
            if (dropElement && dropElement.id === this.parent.rowDropSettings.targetID) {
                var srcControl = dropElement.ej2_instances[0];
                srcControl.rowDragAndDropModule.updateIcon(args.rows, rowIdx, args);
            }
        }
        if (args.target && closest(args.target, '#' + tObj.rowDropSettings.targetID)) {
            var dropElement = parentsUntil(args.target, 'e-treegrid');
            if (!dropElement) {
                cloneElement.style.cursor = 'default';
            }
        }
    };
    /**
     * Handles the row drop event for the TreeGrid.
     *
     * @param {RowDropEventArgs} args - The event arguments for the row drop action.
     * @returns {void} This function does not return a value.
     */
    RowDD.prototype.rowDropped = function (args) {
        var tObj = this.parent;
        var parentItem = 'parentItem';
        if (!tObj.rowDropSettings.targetID) {
            if (parentsUntil(args.target, 'e-content') || (this.dropPosition === 'Invalid' || !this.canDrop)) {
                if (this.parent.element.querySelector('.e-errorelem') || !this.canDrop) {
                    this.dropPosition = 'Invalid';
                }
                setValue('dropPosition', this.dropPosition, args);
                tObj.trigger(rowDrop, args);
                if (!args.cancel) {
                    if (!isCountRequired(this.parent) && (this.dropPosition === 'Invalid' && !this.canDrop)) {
                        return;
                    }
                    if (!isCountRequired(this.parent)) {
                        this.dropRows(args);
                    }
                    if (tObj.isLocalData) {
                        tObj.flatData = this.orderToIndex(tObj.flatData);
                    }
                    tObj.grid.refresh();
                    this.removeRowBorders();
                }
            }
        }
        else {
            if (args.target && closest(args.target, '#' + tObj.rowDropSettings.targetID) || parentsUntil(args.target, 'e-treegrid') &&
                parentsUntil(args.target, 'e-treegrid').id === tObj.rowDropSettings.targetID || args.target && document.getElementById(tObj.rowDropSettings.targetID)) {
                if (!this.canDrop) {
                    this.dropPosition = 'Invalid';
                }
                setValue('dropPosition', this.dropPosition, args);
                tObj.trigger(rowDrop, args);
                if (!args.cancel && tObj.rowDropSettings.targetID) {
                    if (this.dropPosition === 'Invalid' && !this.canDrop) {
                        return;
                    }
                    this.dragDropGrid(args);
                    if (tObj.isLocalData) {
                        tObj.flatData = this.orderToIndex(tObj.flatData);
                    }
                }
            }
        }
        this.removetopOrBottomBorder();
        this.removeChildBorder();
        this.removeRowBorders();
        if (this.parent.enableImmutableMode && !this.parent.allowPaging && !isNullOrUndefined(args.data[0]["" + parentItem])) {
            var index = this.parent.treeColumnIndex;
            index = index + 1;
            var primaryKeyField = this.parent.getPrimaryKeyFieldNames()[0];
            var rowIndex = this.parent.grid.getRowIndexByPrimaryKey(args.data[0]["" + primaryKeyField]);
            var row = this.parent.getRows()[parseInt(rowIndex.toString(), 10)];
            var data = args.data[0];
            if (this.dropPosition === 'middleSegment') {
                var record = [];
                var rows = [];
                record.push(data);
                rows.push(row);
                var parentUniqueID = 'parentUniqueID';
                data = getParentData(this.parent, args.data[0]["" + parentUniqueID]);
                rowIndex = this.parent.grid.getRowIndexByPrimaryKey(data["" + primaryKeyField]);
                var parentrow = this.parent.getRows()[parseInt(rowIndex.toString(), 10)];
                record.push(data);
                rows.push(parentrow);
                for (var i = 0; i < record.length; i++) {
                    this.parent.renderModule.cellRender({
                        data: record[parseInt(i.toString(), 10)],
                        cell: rows[parseInt(i.toString(), 10)].cells[parseInt(index.toString(), 10)],
                        column: this.parent.grid.getColumns()[this.parent.treeColumnIndex],
                        requestType: 'rowDragAndDrop'
                    });
                }
                var targetEle = parentrow.getElementsByClassName('e-treegridcollapse')[0];
                if (!isNullOrUndefined(targetEle)) {
                    removeClass([targetEle], 'e-treegridcollapse');
                    addClass([targetEle], 'e-treegridexpand');
                }
            }
            else {
                this.parent.renderModule.cellRender({
                    data: data, cell: row.cells[parseInt(index.toString(), 10)],
                    column: this.parent.grid.getColumns()[this.parent.treeColumnIndex],
                    requestType: 'rowDragAndDrop'
                });
            }
        }
    };
    /**
     * Removes the border elements for the first and last rows of the TreeGrid.
     *
     * @returns {void} This function does not return a value.
     */
    RowDD.prototype.removeRowBorders = function () {
        var _this = this;
        ['e-firstrow-border', 'e-lastrow-border'].forEach(function (className) {
            var element = _this.parent.element.getElementsByClassName(className)[0];
            if (element) {
                element.remove();
            }
        });
    };
    /**
     * Handles the drag-and-drop operation between TreeGrids, updating the source and target grids.
     *
     * @param {RowDropEventArgs} args - The arguments related to the row drop event, including target information and data being dropped.
     * @returns {void} - This function does not return any value.
     */
    RowDD.prototype.dragDropGrid = function (args) {
        var tObj = this.parent;
        var targetRow = closest(args.target, 'tr');
        var targetIndex = isNaN(this.getTargetIdx(targetRow)) ? 0 : this.getTargetIdx(targetRow);
        var dropElement = parentsUntil(args.target, 'e-treegrid');
        var srcControl;
        if (dropElement && dropElement.id === this.parent.rowDropSettings.targetID && !isRemoteData(this.parent)
            && !isCountRequired(this.parent)) {
            srcControl = dropElement.ej2_instances[0];
            var records = tObj.getSelectedRecords();
            var indexes = [];
            for (var i = 0; i < records.length; i++) {
                indexes[parseInt(i.toString(), 10)] = records[parseInt(i.toString(), 10)].index;
            }
            var data = srcControl.dataSource;
            if (this.parent.idMapping !== null && (isNullOrUndefined(this.dropPosition) || this.dropPosition === 'bottomSegment' || this.dropPosition === 'Invalid') && !(data.length)) {
                var actualData = [];
                for (var i = 0; i < records.length; i++) {
                    if (records[parseInt(i.toString(), 10)].hasChildRecords) {
                        actualData.push(records[parseInt(i.toString(), 10)]);
                        var child = findChildrenRecords(records[parseInt(i.toString(), 10)]);
                        for (var i_1 = 0; i_1 < child.length; i_1++) {
                            actualData.push(child[parseInt(i_1.toString(), 10)]); // push child records to drop the parent record along with its child records
                        }
                    }
                }
                if (actualData.length) {
                    records = actualData;
                }
            }
            tObj.notify(rowsRemove, { indexes: indexes, records: records });
            srcControl.notify(rowsAdd, { toIndex: targetIndex, records: records });
            var srcControlFlatData = srcControl.rowDragAndDropModule.treeGridData;
            if (!isNullOrUndefined(srcControlFlatData)) {
                for (var i = 0; i < srcControlFlatData.length; i++) {
                    srcControlFlatData[parseInt(i.toString(), 10)].index = i;
                    if (!isNullOrUndefined(srcControlFlatData[parseInt(i.toString(), 10)].parentItem)) {
                        var actualIndex = getValue('uniqueIDCollection.' + srcControlFlatData[parseInt(i.toString(), 10)].parentUniqueID + '.index', srcControl);
                        srcControlFlatData[parseInt(i.toString(), 10)].parentItem.index = actualIndex;
                    }
                }
            }
            tObj.grid.refresh();
            srcControl.grid.refresh();
            if (srcControl.grid.dataSource.length > 1) {
                srcControl.grid.refresh();
                if (!isNullOrUndefined(srcControl.getHeaderContent().querySelector('.e-firstrow-border'))) {
                    srcControl.getHeaderContent().querySelector('.e-firstrow-border').remove();
                }
                if (!isNullOrUndefined(srcControl.getContent().querySelector('.e-lastrow-border'))) {
                    srcControl.getContent().querySelector('.e-lastrow-border').remove();
                }
            }
        }
        if (isCountRequired(this.parent)) {
            srcControl = dropElement.ej2_instances[0];
            tObj.grid.refresh();
            srcControl.grid.refresh();
        }
    };
    /**
     * Retrieves the index of the target row based on its 'aria-rowindex' attribute.
     *
     * @param {Element} targetRow - The target row element from which to retrieve the index.
     * @returns {number} - The index of the target row, or 0 if the targetRow is null or undefined.
     */
    RowDD.prototype.getTargetIdx = function (targetRow) {
        return targetRow ? parseInt(targetRow.getAttribute('aria-rowindex'), 10) - 1 : 0;
    };
    /**
     * Retrieves the parent data of a given record during a row drag-and-drop operation.
     *
     * @param {ITreeData} record - The record for which to retrieve the parent data.
     * @param {Object[]} [data] - Optional data array containing additional information related to the drop operation.
     * @returns {void} - This function does not return any value.
     */
    RowDD.prototype.getParentData = function (record, data) {
        var parentItem = record.parentItem;
        var selectedItemIndex = -1;
        if (this.parent.enableVirtualization && this.parent.selectedRowIndex !== -1) {
            selectedItemIndex = this.parent.getSelectedRows()[0].rowIndex;
        }
        else if (this.parent.selectedRowIndex !== -1) {
            selectedItemIndex = this.parent.selectedRowIndex;
        }
        if (this.dropPosition === 'bottomSegment') {
            var primaryKeyField = this.parent.getPrimaryKeyFieldNames()[0];
            var rowIndex = selectedItemIndex === -1 ?
                (this.parent.grid.getRowIndexByPrimaryKey(data[0]["" + primaryKeyField]))
                : this.parent.getSelectedRowIndexes()[0];
            var selectedRecord = this.parent.getCurrentViewRecords()[parseInt(rowIndex.toString(), 10)];
            this.droppedRecord = getParentData(this.parent, selectedRecord.parentItem.uniqueID);
        }
        if (this.dropPosition === 'middleSegment') {
            var level = this.parent.getCurrentViewRecords()[parseInt(selectedItemIndex.toString(), 10)].level;
            if (level === parentItem.level) {
                this.droppedRecord = getParentData(this.parent, parentItem.uniqueID);
            }
            else {
                this.getParentData(parentItem);
            }
        }
    };
    /**
     * Handles the row drop operation for the tree grid.
     *
     * @param {RowDropEventArgs} args - The event arguments containing details about the drop operation, including the target index and data.
     * @param {boolean} [isByMethod=false] - Optional flag indicating if the drop operation is triggered by a method.
     * @returns {void} - This function does not return any value.
     */
    RowDD.prototype.dropRows = function (args, isByMethod) {
        if (this.dropPosition !== 'Invalid' && !isRemoteData(this.parent)) {
            var tObj = this.parent;
            var draggedRecord_2;
            var droppedRecord = void 0;
            if (isNullOrUndefined(args.dropIndex)) {
                var primaryKeyField = this.parent.getPrimaryKeyFieldNames()[0];
                var rowIndex = tObj.selectedRowIndex === -1 ?
                    (this.parent.grid.getRowIndexByPrimaryKey(args.data[0]["" + primaryKeyField])) - 1
                    : tObj.getSelectedRowIndexes()[0] - 1;
                var record = tObj.getCurrentViewRecords()[parseInt(rowIndex.toString(), 10)];
                this.getParentData(record, args.data);
            }
            else {
                args.dropIndex = args.dropIndex === args.fromIndex ? this.getTargetIdx(args.target.parentElement) : args.dropIndex;
                if (this.parent.enableVirtualization) {
                    var index = this.parent.getRowByIndex(args.dropIndex).rowIndex;
                    this.droppedRecord = tObj.getCurrentViewRecords()[parseInt(index.toString(), 10)];
                }
                else {
                    if (!isNullOrUndefined(this.parent.rowDropSettings.targetID)) {
                        var rowsObject = this.parent.grid.getRowsObject();
                        this.droppedRecord = rowsObject[args.dropIndex].data;
                    }
                    else {
                        this.droppedRecord = tObj.getCurrentViewRecords()[args.dropIndex];
                    }
                }
            }
            var dragRecords = [];
            droppedRecord = this.droppedRecord;
            if (!args.data[0]) {
                dragRecords.push(args.data);
            }
            else {
                dragRecords = args.data;
            }
            this.parent[this.modifiedRecords].push(args.data[0], droppedRecord);
            var count = 0;
            var multiplegrid = this.parent.rowDropSettings.targetID;
            this.isMultipleGrid = multiplegrid;
            if (!multiplegrid) {
                this.ensuredropPosition(dragRecords, droppedRecord);
            }
            else {
                this.isaddtoBottom = multiplegrid && this.isDraggedWithChild;
            }
            var dragLength = dragRecords.length;
            if (!isNullOrUndefined(this.parent.idMapping)) {
                dragRecords.reverse();
            }
            var _loop_1 = function (i) {
                draggedRecord_2 = dragRecords[parseInt(i.toString(), 10)];
                this_1.draggedRecord = draggedRecord_2;
                if (!this_1.draggedRecord.hasChildRecords) {
                    for (var _i = 0, dragRecords_2 = dragRecords; _i < dragRecords_2.length; _i++) {
                        var dragRecord = dragRecords_2[_i];
                        if (!isNullOrUndefined(dragRecord.childRecords) &&
                            dragRecord.childRecords.indexOf(this_1.draggedRecord) !== -1) {
                            this_1.draggedRecord = undefined;
                        }
                    }
                }
                if (!isNullOrUndefined(this_1.draggedRecord)) {
                    if (this_1.dropPosition !== 'Invalid' && !isNullOrUndefined(this_1.droppedRecord)) {
                        if (!tObj.rowDropSettings.targetID || isByMethod) {
                            this_1.deleteDragRow();
                        }
                        if (this_1.draggedRecord === this_1.droppedRecord) {
                            var correctIndex = this_1.getTargetIdx(args.target.offsetParent.parentElement);
                            if (isNaN(correctIndex)) {
                                correctIndex = this_1.getTargetIdx(args.target.parentElement);
                            }
                            args.dropIndex = correctIndex;
                            droppedRecord = this_1.droppedRecord = this_1.parent.getCurrentViewRecords()[args.dropIndex];
                        }
                        if (droppedRecord.parentItem || this_1.dropPosition === 'middleSegment') {
                            var parentRecords = tObj.parentData;
                            var newParentIndex = parentRecords.indexOf(this_1.draggedRecord);
                            if (newParentIndex !== -1) {
                                parentRecords.splice(newParentIndex, 1);
                            }
                        }
                        var recordIndex1 = this_1.treeGridData.indexOf(droppedRecord);
                        this_1.dropAtTop(recordIndex1);
                        if (this_1.dropPosition === 'bottomSegment') {
                            if (!droppedRecord.hasChildRecords) {
                                if (this_1.parent.parentIdMapping) {
                                    this_1.treeData.splice(recordIndex1 + 1, 0, this_1.draggedRecord.taskData);
                                }
                                this_1.treeGridData.splice(recordIndex1 + 1, 0, this_1.draggedRecord);
                            }
                            else {
                                count = this_1.getChildCount(droppedRecord, 0);
                                if (this_1.parent.parentIdMapping) {
                                    this_1.treeData.splice(recordIndex1 + count + 1, 0, this_1.draggedRecord.taskData);
                                }
                                this_1.treeGridData.splice(recordIndex1 + count + 1, 0, this_1.draggedRecord);
                            }
                            if (isNullOrUndefined(droppedRecord.parentItem)) {
                                delete draggedRecord_2.parentItem;
                                delete draggedRecord_2.parentUniqueID;
                                draggedRecord_2.level = 0;
                                if (this_1.parent.parentIdMapping) {
                                    draggedRecord_2[this_1.parent.parentIdMapping] = null;
                                }
                            }
                            if (droppedRecord.parentItem) {
                                var rec = this_1.getChildrecordsByParentID(droppedRecord.parentUniqueID);
                                var childRecords = rec[0].childRecords;
                                var droppedRecordIndex = childRecords.indexOf(droppedRecord) + 1;
                                childRecords.splice(droppedRecordIndex, 0, draggedRecord_2);
                                draggedRecord_2.parentItem = droppedRecord.parentItem;
                                draggedRecord_2.parentUniqueID = droppedRecord.parentUniqueID;
                                draggedRecord_2.level = droppedRecord.level;
                                if (this_1.parent.parentIdMapping) {
                                    draggedRecord_2[this_1.parent.parentIdMapping] = droppedRecord[this_1.parent.parentIdMapping];
                                    draggedRecord_2.parentItem = droppedRecord.parentItem;
                                    draggedRecord_2.level = droppedRecord.level;
                                }
                            }
                            if (draggedRecord_2.hasChildRecords) {
                                var level = 1;
                                this_1.updateChildRecordLevel(draggedRecord_2, level);
                                this_1.updateChildRecord(draggedRecord_2, recordIndex1 + count + 1);
                            }
                        }
                        this_1.dropMiddle(recordIndex1);
                    }
                    if (isNullOrUndefined(draggedRecord_2.parentItem)) {
                        var parentRecords = tObj.parentData;
                        var newParentIndex = parentRecords.indexOf(this_1.droppedRecord);
                        var nonRepeat_1 = 0;
                        parentRecords.filter(function (e) {
                            if (draggedRecord_2.uniqueID === e.uniqueID) {
                                nonRepeat_1++;
                            }
                        });
                        if (this_1.dropPosition === 'bottomSegment' && nonRepeat_1 === 0) {
                            parentRecords.splice(newParentIndex + 1, 0, draggedRecord_2);
                        }
                        else if (this_1.dropPosition === 'topSegment' && nonRepeat_1 === 0) {
                            parentRecords.splice(newParentIndex, 0, draggedRecord_2);
                        }
                    }
                    tObj.rowDragAndDropModule.refreshGridDataSource();
                }
            };
            var this_1 = this;
            for (var i = 0; i < dragLength; i++) {
                _loop_1(i);
            }
        }
    };
    /**
     * Handles the logic for inserting a dragged record into the middle of a parent record's child records.
     *
     * @param {number} recordIndex - The index at which to insert the dragged record relative to the parent record's child records.
     * @returns {void} - This function does not return any value.
     */
    RowDD.prototype.dropMiddle = function (recordIndex) {
        var tObj = this.parent;
        var childRecords = findChildrenRecords(this.droppedRecord);
        var childRecordsLength = (isNullOrUndefined(childRecords) ||
            childRecords.length === 0) ? recordIndex + 1 :
            childRecords.length + recordIndex + 1;
        if (this.dropPosition === 'middleSegment') {
            if (tObj.parentIdMapping) {
                this.treeData.splice(childRecordsLength, 0, this.draggedRecord.taskData);
                this.treeGridData.splice(childRecordsLength, 0, this.draggedRecord);
            }
            else {
                this.treeGridData.splice(childRecordsLength, 0, this.draggedRecord);
            }
            this.recordLevel();
            if (this.draggedRecord.hasChildRecords) {
                this.updateChildRecord(this.draggedRecord, childRecordsLength);
            }
        }
    };
    /**
     * Handles the logic for inserting a dragged record at the top of a parent record's child records.
     *
     * @param {number} recordIndex1 - The index at which to insert the dragged record in the tree grid data.
     * @returns {void} - This function does not return any value.
     */
    RowDD.prototype.dropAtTop = function (recordIndex1) {
        var tObj = this.parent;
        if (this.dropPosition === 'topSegment') {
            if (tObj.parentIdMapping) {
                this.treeData.splice(recordIndex1, 0, this.draggedRecord.taskData);
            }
            var targetRecord = this.treeGridData[parseInt(recordIndex1.toString(), 10)];
            this.draggedRecord.parentItem = targetRecord.parentItem;
            this.draggedRecord.parentUniqueID = targetRecord.parentUniqueID;
            this.draggedRecord.level = targetRecord.level;
            // Insert dragged record into the grid data
            this.treeGridData.splice(parseInt(recordIndex1.toString(), 10), 0, this.draggedRecord);
            if (this.draggedRecord.hasChildRecords) {
                var level = 1;
                this.updateChildRecord(this.draggedRecord, recordIndex1);
                this.updateChildRecordLevel(this.draggedRecord, level);
            }
            if (this.droppedRecord.parentItem) {
                var rec = this.getChildrecordsByParentID(this.droppedRecord.parentUniqueID);
                var childRecords = rec[0].childRecords;
                var droppedRecordIndex = childRecords.indexOf(this.droppedRecord);
                // Insert the dragged record into the child records at the appropriate position
                childRecords.splice(droppedRecordIndex, 0, this.draggedRecord);
            }
        }
    };
    /**
     * Updates the level and hierarchy of the dragged record based on the drop position.
     *
     * @returns {void} - This function does not return any value.
     */
    RowDD.prototype.recordLevel = function () {
        var tObj = this.parent;
        var draggedRecord = this.draggedRecord;
        var droppedRecord = this.droppedRecord;
        var childItem = tObj.childMapping;
        if (!droppedRecord.hasChildRecords) {
            droppedRecord.hasChildRecords = true;
            droppedRecord.hasFilteredChildRecords = true;
            if (isNullOrUndefined(droppedRecord.childRecords) || droppedRecord.childRecords.length === 0) {
                droppedRecord.childRecords = [];
                if (!tObj.parentIdMapping && isNullOrUndefined(droppedRecord.taskData["" + childItem])) {
                    droppedRecord.taskData["" + childItem] = [];
                }
            }
        }
        if (this.dropPosition === 'middleSegment') {
            var parentItem = extend$1({}, droppedRecord);
            delete parentItem.childRecords;
            draggedRecord.parentItem = parentItem;
            draggedRecord.parentUniqueID = droppedRecord.uniqueID;
            droppedRecord.childRecords.splice(droppedRecord.childRecords.length, 0, draggedRecord);
            setValue('uniqueIDCollection.' + draggedRecord.uniqueID, draggedRecord, tObj);
            var isSelfReference = 'isSelfReference';
            if (tObj["" + isSelfReference]) {
                droppedRecord[tObj.childMapping] = [];
                droppedRecord[tObj.childMapping].splice(droppedRecord[tObj.childMapping].length, 0, draggedRecord);
            }
            if (!isNullOrUndefined(draggedRecord) && !tObj.parentIdMapping && !isNullOrUndefined(droppedRecord.taskData["" + childItem])) {
                droppedRecord.taskData[tObj.childMapping].splice(droppedRecord.childRecords.length, 0, draggedRecord.taskData);
            }
            if (!draggedRecord.hasChildRecords) {
                draggedRecord.level = droppedRecord.level + 1;
            }
            else {
                var level = 1;
                draggedRecord.level = droppedRecord.level + 1;
                this.updateChildRecordLevel(draggedRecord, level);
            }
            droppedRecord.expanded = true;
        }
    };
    /**
     * Deletes the currently dragged row from the TreeGrid.
     *
     * @returns {void} - This function does not return any value.
     */
    RowDD.prototype.deleteDragRow = function () {
        if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
            this.treeGridData = this.parent.grid.dataSource.dataSource.json;
            this.treeData = this.parent.dataSource.dataSource.json;
        }
        else {
            this.treeGridData = this.parent.grid.dataSource;
            this.treeData = this.parent.dataSource;
        }
        var deletedRow = getParentData(this.parent, this.draggedRecord.uniqueID);
        if (!isNullOrUndefined(deletedRow.childRecords) && deletedRow.childRecords.length) {
            deletedRow.hasChildRecords = true;
        }
        this.removeRecords(deletedRow);
    };
    /**
     * Updates the child records of a specified parent record in the TreeGrid.
     *
     * @param {ITreeData} record - The parent record whose child records will be updated.
     * @param {number} count - The initial count to keep track of record positioning.
     * @returns {number} - The updated count after processing all child records.
     */
    RowDD.prototype.updateChildRecord = function (record, count) {
        var currentRecord;
        var tObj = this.parent;
        var length = 0;
        if (!record.hasChildRecords) {
            return 0;
        }
        length = record.childRecords.length;
        for (var i = 0; i < length; i++) {
            if (!this.isMultipleGrid) {
                currentRecord = getValue('uniqueIDCollection.' + record.childRecords[parseInt(i.toString(), 10)].uniqueID, tObj);
            }
            else {
                currentRecord = record.childRecords[parseInt(i.toString(), 10)];
            }
            count++;
            tObj.flatData.splice(count, 0, currentRecord);
            setValue('uniqueIDCollection.' + currentRecord.uniqueID, currentRecord, this.parent);
            if (tObj.parentIdMapping) {
                this.treeData.splice(count, 0, currentRecord.taskData);
            }
            if (currentRecord.hasChildRecords) {
                count = this.updateChildRecord(currentRecord, count);
            }
        }
        return count;
    };
    /**
     * Updates the level of child records for a specified parent record in the TreeGrid.
     *
     * @param {ITreeData} record - The parent record whose child records' levels will be updated.
     * @param {number} level - The current level of the parent record.
     * @returns {number} - The updated level after processing all child records.
     */
    RowDD.prototype.updateChildRecordLevel = function (record, level) {
        var length = 0;
        var currentRecord;
        level++;
        if (!record.hasChildRecords) {
            return 0;
        }
        length = record.childRecords.length;
        for (var i = 0; i < length; i++) {
            if (!this.isMultipleGrid) {
                currentRecord = getValue('uniqueIDCollection.' + record.childRecords[parseInt(i.toString(), 10)].uniqueID, this.parent);
            }
            else {
                currentRecord = record.childRecords[parseInt(i.toString(), 10)];
            }
            var parentData = void 0;
            if (record.parentItem) {
                parentData = getParentData(this.parent, record.parentItem.uniqueID);
            }
            if (isNullOrUndefined(parentData) && !isNullOrUndefined(record.parentItem)) {
                parentData = record.parentItem;
            }
            currentRecord.level = record.parentItem ? parentData.level + level : record.level + 1;
            if (currentRecord.hasChildRecords) {
                level--;
                level = this.updateChildRecordLevel(currentRecord, level);
            }
        }
        return level;
    };
    /**
     * Removes specified records from the TreeGrid data source.
     *
     * @param {ITreeData} record - The record to be removed, including any child records if applicable.
     * @returns {void} - This method does not return a value.
     */
    RowDD.prototype.removeRecords = function (record) {
        var tObj = this.parent;
        var dataSource;
        if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
            dataSource = this.parent.dataSource.dataSource.json;
        }
        else {
            dataSource = this.parent.dataSource;
        }
        var deletedRow = record;
        var isSelfReference = !isNullOrUndefined(tObj.parentIdMapping);
        var flatParentData = this.getChildrecordsByParentID(deletedRow.parentUniqueID)[0];
        if (deletedRow) {
            if (deletedRow.parentItem) {
                var childRecords = flatParentData ? flatParentData.childRecords : [];
                var childIndex = 0;
                if (childRecords && childRecords.length > 0) {
                    childIndex = childRecords.indexOf(deletedRow);
                    flatParentData.childRecords.splice(childIndex, 1);
                    if (!this.parent.parentIdMapping || tObj.enableImmutableMode) {
                        editAction({ value: deletedRow, action: 'delete' }, this.parent, isSelfReference, deletedRow.index, deletedRow.index);
                    }
                }
            }
            if (tObj.parentIdMapping) {
                if (deletedRow.hasChildRecords && deletedRow.childRecords.length > 0) {
                    this.removeChildItem(deletedRow);
                }
                var idx = void 0;
                var idz = void 0;
                var treeGridData = dataSource;
                for (var i = 0; i < treeGridData.length; i++) {
                    if (treeGridData[parseInt(i.toString(), 10)][this.parent.idMapping] === deletedRow.taskData[this.parent.idMapping]) {
                        idx = i;
                    }
                }
                for (var i = 0; i < this.treeGridData.length; i++) {
                    if (this.treeGridData[parseInt(i.toString(), 10)][this.parent.idMapping]
                        === deletedRow.taskData[this.parent.idMapping]) {
                        idz = i;
                    }
                }
                if (idx !== -1 && !isNullOrUndefined(idx)) {
                    dataSource.splice(idx, 1);
                }
                if (idz !== -1 && !isNullOrUndefined(idz)) {
                    this.treeGridData.splice(idz, 1);
                }
            }
            var recordIndex = this.treeGridData.indexOf(deletedRow);
            if (!tObj.parentIdMapping) {
                var parentIndex = this.parent.parentData.indexOf(deletedRow);
                if (parentIndex !== -1) {
                    tObj.parentData.splice(parentIndex, 1);
                    dataSource.splice(parentIndex, 1);
                }
            }
            if (recordIndex === -1 && !tObj.parentIdMapping) {
                var primaryKeyField = tObj.getPrimaryKeyFieldNames()[0];
                for (var j = 0; j < this.treeGridData.length; j++) {
                    if (this.treeGridData[parseInt(j.toString(), 10)]["" + primaryKeyField] === deletedRow["" + primaryKeyField]) {
                        recordIndex = j;
                    }
                }
            }
            if (!tObj.parentIdMapping) {
                var deletedRecordCount = this.getChildCount(deletedRow, 0);
                this.treeGridData.splice(recordIndex, deletedRecordCount + 1);
            }
            if (deletedRow.parentItem && flatParentData && flatParentData.childRecords && !flatParentData.childRecords.length) {
                flatParentData.expanded = false;
                flatParentData.hasChildRecords = false;
                flatParentData.hasFilteredChildRecords = false;
            }
            if (this.parent[this.modifiedRecords].indexOf(flatParentData) === -1 && !isNullOrUndefined(flatParentData)) {
                this.parent[this.modifiedRecords].push(flatParentData);
            }
            if (!isNullOrUndefined(flatParentData)) {
                this.updateModifiedRecords(flatParentData);
            }
        }
    };
    /**
     * Updates the records in the TreeGrid data source that have been modified.
     *
     * @param {ITreeData} record - The record to update, along with its parent records if applicable.
     * @returns {void} - This method does not return a value.
     */
    RowDD.prototype.updateModifiedRecords = function (record) {
        var parentData = getParentData(this.parent, record.parentUniqueID);
        if (!isNullOrUndefined(parentData)) {
            this.parent[this.modifiedRecords].push(parentData);
            this.updateModifiedRecords(parentData);
        }
    };
    /**
     * Recursively removes child records from the specified record and updates the data source.
     *
     * @param {ITreeData} record - The parent record whose child records are to be removed.
     * @returns {void} - This method does not return a value.
     */
    RowDD.prototype.removeChildItem = function (record) {
        var currentRecord;
        var idx;
        var idz;
        var dataSource;
        if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
            dataSource = this.parent.dataSource.dataSource.json;
        }
        else {
            dataSource = this.parent.dataSource;
        }
        for (var i = 0; i < record.childRecords.length; i++) {
            currentRecord = record.childRecords[parseInt(i.toString(), 10)];
            if (!isNullOrUndefined(currentRecord.childRecords) && currentRecord.childRecords.length) {
                currentRecord.hasChildRecords = true;
            }
            var treeGridData = void 0;
            if (this.parent.dataSource instanceof DataManager && isOffline(this.parent)) {
                treeGridData = this.parent.dataSource.dataSource.json;
            }
            else {
                treeGridData = this.parent.dataSource;
            }
            for (var i_2 = 0; i_2 < treeGridData.length; i_2++) {
                if (treeGridData[parseInt(i_2.toString(), 10)][this.parent.idMapping] === currentRecord.taskData[this.parent.idMapping]) {
                    idx = i_2;
                }
            }
            for (var i_3 = 0; i_3 < this.treeGridData.length; i_3++) {
                if (this.treeGridData[parseInt(i_3.toString(), 10)][this.parent.idMapping]
                    === currentRecord.taskData[this.parent.idMapping]) {
                    idz = i_3;
                    break;
                }
            }
            if (idx !== -1 && !isNullOrUndefined(idx)) {
                dataSource.splice(idx, 1);
            }
            if (idz !== -1 && !isNullOrUndefined(idz)) {
                this.treeGridData.splice(idz, 1);
            }
            if (currentRecord.hasChildRecords) {
                this.removeChildItem(currentRecord);
            }
        }
    };
    /**
     * Retrieves the count of child records associated with the specified parent record.
     *
     * @param {ITreeData} record - The parent record for which child count is to be calculated.
     * @param {number} count - The initial count to start with, usually passed as 0.
     * @returns {number} - The total count of child records.
     */
    RowDD.prototype.getChildCount = function (record, count) {
        var currentRecord;
        if (!record.hasChildRecords) {
            return 0;
        }
        for (var i = 0; i < record.childRecords.length; i++) {
            currentRecord = record.childRecords[parseInt(i.toString(), 10)];
            count++;
            if (currentRecord.hasChildRecords) {
                count = this.getChildCount(currentRecord, count);
            }
        }
        return count;
    };
    /**
     * Ensures the validity of the drop position for the dragged records by verifying the hierarchy and position constraints.
     * If the current record is found in the dragged records' children, sets the drop position to 'Invalid'.
     *
     * @param {ITreeData[]} draggedRecords - The array of dragged records being verified.
     * @param {ITreeData} currentRecord - The current record to check against dragged records.
     * @returns {void} - This function does not return a value.
     */
    RowDD.prototype.ensuredropPosition = function (draggedRecords, currentRecord) {
        var _this = this;
        draggedRecords.filter(function (e) {
            if (e.hasChildRecords && !isNullOrUndefined(e.childRecords)) {
                var valid = e.childRecords.indexOf(currentRecord);
                if (valid === -1) {
                    _this.ensuredropPosition(e.childRecords, currentRecord);
                }
                else {
                    _this.dropPosition = 'Invalid';
                    _this.addErrorElem();
                    _this.canDrop = false;
                    if (isNullOrUndefined(_this.parent.rowDropSettings.targetID)) {
                        _this.removetopOrBottomBorder();
                        _this.removeChildBorder();
                    }
                    return;
                }
            }
        });
    };
    RowDD.prototype.isDuplicateData = function (currentData) {
        var primaryKeys = this.parent.getPrimaryKeyFieldNames();
        if (primaryKeys.length === 0) {
            return false;
        }
        return this.parent.flatData.some(function (data) {
            // eslint-disable-next-line
            return primaryKeys.every(function (key) { return data[key] === currentData[key]; });
        });
    };
    /**
     * Cleans up resources, event listeners, and DOM elements when the TreeGrid component is destroyed.
     *
     * @returns {void}
     */
    RowDD.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @hidden
     * @returns {void}
     */
    RowDD.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(rowdraging, this.Rowdraging);
        this.parent.off(rowDropped, this.rowDropped);
        this.parent.off(rowsAdd, this.rowsAdded);
        this.parent.off(rowsRemove, this.rowsRemoved);
    };
    /**
     * hidden
     */
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns RowDragAndDrop module name
     */
    RowDD.prototype.getModuleName = function () {
        return 'rowDragAndDrop';
    };
    return RowDD;
}());

var __extends$e = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Configures the settings for row dragging and dropping within the TreeGrid, allowing for enhanced user interaction and data manipulation capabilities.
 */
var RowDropSettings = /** @class */ (function (_super) {
    __extends$e(RowDropSettings, _super);
    function RowDropSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$c([
        Property()
    ], RowDropSettings.prototype, "targetID", void 0);
    return RowDropSettings;
}(ChildProperty));

var __extends$f = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * RowModelGenerator is used to generate grid data rows.
 *
 * @hidden
 */
var TreeVirtualRowModelGenerator = /** @class */ (function (_super) {
    __extends$f(TreeVirtualRowModelGenerator, _super);
    function TreeVirtualRowModelGenerator(parent) {
        var _this = _super.call(this, parent) || this;
        _this.addEventListener();
        return _this;
    }
    TreeVirtualRowModelGenerator.prototype.addEventListener = function () {
        this.parent.on(dataListener, this.getDatas, this);
    };
    TreeVirtualRowModelGenerator.prototype.getDatas = function (args) {
        this.visualData = args.data;
    };
    TreeVirtualRowModelGenerator.prototype.getDataInfo = function () {
        return _super.prototype.getData.call(this);
    };
    TreeVirtualRowModelGenerator.prototype.generateRows = function (data, notifyArgs) {
        if (!isNullOrUndefined(notifyArgs.virtualInfo) && notifyArgs.virtualInfo.loadNext &&
            notifyArgs.virtualInfo.nextInfo.page !== this.parent.pageSettings.currentPage) {
            this.parent.setProperties({ pageSettings: { currentPage: notifyArgs.virtualInfo.nextInfo.page } }, true);
        }
        else if (!isNullOrUndefined(notifyArgs.virtualInfo) && !notifyArgs.virtualInfo.loadNext &&
            notifyArgs.virtualInfo.page !== this.parent.pageSettings.currentPage) {
            this.parent.setProperties({ pageSettings: { currentPage: notifyArgs.virtualInfo.page } }, true);
        }
        var info = this.getDataInfo();
        if (!isNullOrUndefined(notifyArgs.virtualInfo)) {
            if (notifyArgs.virtualInfo.direction !== 'right' && notifyArgs.virtualInfo.direction !== 'left') {
                if (!((this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
                    && !this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || isCountRequired(this.parent))
                    || notifyArgs.virtualInfo.blockIndexes.length === 1) {
                    notifyArgs.virtualInfo.blockIndexes = info.blockIndexes;
                }
            }
            else {
                notifyArgs.virtualInfo.blockIndexes = this.getBlockIndexes(notifyArgs.virtualInfo.page);
            }
        }
        if ((this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && !this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || isCountRequired(this.parent)) {
            return _super.prototype.generateRows.call(this, data, notifyArgs);
        }
        else {
            if (!isNullOrUndefined(notifyArgs.requestType) && notifyArgs.requestType.toString() === 'collapseAll') {
                notifyArgs.requestType = 'refresh';
            }
            var rows = _super.prototype.generateRows.call(this, data, notifyArgs);
            if (!isNullOrUndefined((this.visualData))) {
                for (var r = 0; r < rows.length; r++) {
                    rows[parseInt(r.toString(), 10)].index
                        = (this.visualData).indexOf(rows[parseInt(r.toString(), 10)].data);
                }
            }
            return rows;
        }
    };
    TreeVirtualRowModelGenerator.prototype.checkAndResetCache = function (action) {
        var clear = ['paging', 'refresh', 'sorting', 'filtering', 'searching', 'reorder',
            'save', 'delete'].some(function (value) { return action === value; });
        if ((this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && !this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || isCountRequired(this.parent)) {
            var model = 'model';
            var currentPage = this["" + model].currentPage;
            if (clear) {
                this.cache = {};
                /*this.movableCache = {};
                this.frozenRightCache = {};*/
                this.data = {};
                this.groups = {};
            }
            else if (action === 'virtualscroll' && this.cache[parseInt(currentPage.toString(), 10)] &&
                this.cache[parseInt(currentPage.toString(), 10)].length >
                    (this.parent.contentModule).getBlockSize()) {
                delete this.cache[parseInt(currentPage.toString(), 10)];
            }
        }
        else {
            if (clear || action === 'virtualscroll') {
                this.cache = {};
                this.data = {};
                this.groups = {};
                /*this.movableCache = {};
                this.frozenRightCache = {};*/
            }
        }
        return clear;
    };
    return TreeVirtualRowModelGenerator;
}(VirtualRowModelGenerator));

/**
 * TreeGrid Filter module will handle filtering action
 *
 * @hidden
 */
var Filter = /** @class */ (function () {
    /**
     * Constructor for Filter module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Filter(parent) {
        Grid.Inject(Filter$1);
        this.parent = parent;
        this.isHierarchyFilter = false;
        this.filteredResult = [];
        this.flatFilteredData = [];
        this.filteredParentRecs = [];
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Filter module name
     */
    Filter.prototype.getModuleName = function () {
        return 'filter';
    };
    /**
     * To destroy the Filter module
     *
     * @returns {void}
     * @hidden
     */
    Filter.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @hidden
     * @returns {void}
     */
    Filter.prototype.addEventListener = function () {
        this.parent.on('updateFilterRecs', this.updatedFilteredRecord, this);
        this.parent.on('clearFilters', this.clearFilterLevel, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    Filter.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('updateFilterRecs', this.updatedFilteredRecord);
        this.parent.off('clearFilters', this.clearFilterLevel);
    };
    /**
     * Function to update filtered records
     *
     * @param {{data: Object} } dataDetails - Filtered data collection
     * @param {Object} dataDetails.data - Fliltered data collection
     * @hidden
     * @returns {void}
     */
    Filter.prototype.updatedFilteredRecord = function (dataDetails) {
        setValue('uniqueIDFilterCollection', {}, this.parent);
        this.flatFilteredData = dataDetails.data;
        this.filteredParentRecs = [];
        this.filteredResult = [];
        this.isHierarchyFilter = false;
        for (var f = 0; f < this.flatFilteredData.length; f++) {
            var rec = this.flatFilteredData[parseInt(f.toString(), 10)];
            this.addParentRecord(rec);
            var hierarchyMode = this.parent.grid.searchSettings.key === '' ? this.parent.filterSettings.hierarchyMode
                : this.parent.searchSettings.hierarchyMode;
            if (((hierarchyMode === 'Child' || hierarchyMode === 'None') &&
                (this.parent.grid.filterSettings.columns.length !== 0 || this.parent.grid.searchSettings.key !== ''))) {
                this.isHierarchyFilter = true;
            }
            var ischild = getObject('childRecords', rec);
            if (!isNullOrUndefined(ischild) && ischild.length) {
                setValue('hasFilteredChildRecords', this.checkChildExsist(rec), rec);
            }
            var parent_1 = getObject('parentItem', rec);
            if (!isNullOrUndefined(parent_1)) {
                var parRecord = getParentData(this.parent, rec.parentItem.uniqueID, true);
                //let parRecord: Object = this.flatFilteredData.filter((e: ITreeData) => {
                //          return e.uniqueID === rec.parentItem.uniqueID; })[0];
                setValue('hasFilteredChildRecords', true, parRecord);
                if (parRecord && parRecord.parentItem) {
                    this.updateParentFilteredRecord(parRecord);
                }
            }
        }
        if (this.flatFilteredData.length > 0 && this.isHierarchyFilter) {
            this.updateFilterLevel();
        }
        this.parent.notify('updateAction', { result: this.filteredResult });
    };
    Filter.prototype.updateParentFilteredRecord = function (record) {
        var parRecord = getParentData(this.parent, record.parentItem.uniqueID, true);
        var uniqueIDValue = getValue('uniqueIDFilterCollection', this.parent);
        if (parRecord && Object.prototype.hasOwnProperty.call(uniqueIDValue, parRecord.uniqueID)) {
            setValue('hasFilteredChildRecords', true, parRecord);
        }
        if (parRecord && parRecord.parentItem) {
            this.updateParentFilteredRecord(parRecord);
        }
    };
    Filter.prototype.addParentRecord = function (record) {
        var parent = getParentData(this.parent, record.parentUniqueID);
        //let parent: Object = this.parent.flatData.filter((e: ITreeData) => {return e.uniqueID === record.parentUniqueID; })[0];
        var hierarchyMode = this.parent.grid.searchSettings.key === '' ? this.parent.filterSettings.hierarchyMode
            : this.parent.searchSettings.hierarchyMode;
        if (hierarchyMode === 'None' && (this.parent.grid.filterSettings.columns.length !== 0
            || this.parent.grid.searchSettings.key !== '')) {
            if (isNullOrUndefined(parent)) {
                if (this.flatFilteredData.indexOf(record) !== -1) {
                    if (this.filteredResult.indexOf(record) === -1) {
                        this.filteredResult.push(record);
                        setValue('uniqueIDFilterCollection.' + record.uniqueID, record, this.parent);
                        record.hasFilteredChildRecords = true;
                    }
                    return;
                }
            }
            else {
                this.addParentRecord(parent);
                if (this.flatFilteredData.indexOf(parent) !== -1 || this.filteredResult.indexOf(parent) !== -1) {
                    if (this.filteredResult.indexOf(record) === -1) {
                        this.filteredResult.push(record);
                        setValue('uniqueIDFilterCollection.' + record.uniqueID, record, this.parent);
                    }
                }
                else {
                    if (this.filteredResult.indexOf(record) === -1 && this.flatFilteredData.indexOf(record) !== -1) {
                        this.filteredResult.push(record);
                        setValue('uniqueIDFilterCollection.' + record.uniqueID, record, this.parent);
                    }
                }
            }
        }
        else {
            if (!isNullOrUndefined(parent)) {
                var hierarchyMode_1 = this.parent.grid.searchSettings.key === '' ?
                    this.parent.filterSettings.hierarchyMode : this.parent.searchSettings.hierarchyMode;
                if (hierarchyMode_1 === 'Child' && (this.parent.grid.filterSettings.columns.length !== 0
                    || this.parent.grid.searchSettings.key !== '')) {
                    if (this.flatFilteredData.indexOf(parent) !== -1) {
                        this.addParentRecord(parent);
                    }
                }
                else {
                    this.addParentRecord(parent);
                }
            }
            if (this.filteredResult.indexOf(record) === -1) {
                this.filteredResult.push(record);
                setValue('uniqueIDFilterCollection.' + record.uniqueID, record, this.parent);
            }
        }
    };
    Filter.prototype.checkChildExsist = function (records) {
        var childRec = getObject('childRecords', records);
        var isExist = false;
        for (var count = 0; count < childRec.length; count++) {
            var ischild = childRec[parseInt(count.toString(), 10)].childRecords;
            var hierarchyMode = this.parent.grid.searchSettings.key === '' ?
                this.parent.filterSettings.hierarchyMode : this.parent.searchSettings.hierarchyMode;
            if (((hierarchyMode === 'Child' || hierarchyMode === 'Both') && (this.parent.grid.filterSettings.columns.length !== 0
                || this.parent.grid.searchSettings.key !== ''))) {
                var uniqueIDValue = getValue('uniqueIDFilterCollection', this.parent);
                if (!Object.prototype.hasOwnProperty.call(uniqueIDValue, childRec[parseInt(count.toString(), 10)].uniqueID)) {
                    this.filteredResult.push(childRec[parseInt(count.toString(), 10)]);
                    setValue('uniqueIDFilterCollection.' + childRec[parseInt(count.toString(), 10)].uniqueID, childRec[parseInt(count.toString(), 10)], this.parent);
                    isExist = true;
                }
            }
            if ((hierarchyMode === 'None')
                && (this.parent.grid.filterSettings.columns.length !== 0 || this.parent.grid.searchSettings.key !== '')) {
                if (this.flatFilteredData.indexOf(childRec[parseInt(count.toString(), 10)]) !== -1) {
                    isExist = true;
                    break;
                }
            }
            if (!isNullOrUndefined(ischild) && ischild.length) {
                isExist = this.checkChildExsist(childRec[parseInt(count.toString(), 10)]);
            }
            if ((hierarchyMode === 'Child' || hierarchyMode === 'Both') && childRec.length) {
                isExist = true;
            }
        }
        return isExist;
    };
    Filter.prototype.updateFilterLevel = function () {
        var record = this.filteredResult;
        var len = this.filteredResult.length;
        for (var c = 0; c < len; c++) {
            var parent_2 = getParentData(this.parent, record[parseInt(c.toString(), 10)].parentUniqueID);
            var isPrst = record.indexOf(parent_2) !== -1;
            if (isPrst) {
                var parent_3 = getParentData(this.parent, record[parseInt(c.toString(), 10)].parentUniqueID, true);
                record[parseInt(c.toString(), 10)].filterLevel = parent_3.filterLevel + 1;
            }
            else {
                record[parseInt(c.toString(), 10)].filterLevel = 0;
                this.filteredParentRecs.push(record[parseInt(c.toString(), 10)]);
            }
        }
    };
    Filter.prototype.clearFilterLevel = function (data) {
        var count = 0;
        var flatData = data.flatData;
        var len = flatData.length;
        var currentRecord;
        for (count; count < len; count++) {
            currentRecord = flatData[parseInt(count.toString(), 10)];
            var fLevel = currentRecord.filterLevel;
            if (fLevel || fLevel === 0 || !isNullOrUndefined(currentRecord.hasFilteredChildRecords)) {
                currentRecord.hasFilteredChildRecords = null;
                currentRecord.filterLevel = null;
            }
        }
        this.filteredResult = [];
        this.parent.notify('updateResults', { result: flatData, count: flatData.length });
    };
    return Filter;
}());

/**
 * TreeGrid Excel Export module
 *
 * @hidden
 */
var ExcelExport = /** @class */ (function () {
    /**
     * Constructor for Excel Export module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function ExcelExport(parent) {
        this.isCollapsedStatePersist = false;
        Grid.Inject(ExcelExport$1);
        this.parent = parent;
        this.dataResults = {};
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns ExcelExport module name
     */
    ExcelExport.prototype.getModuleName = function () {
        return 'ExcelExport';
    };
    /**
     * @hidden
     * @returns {void}
     */
    ExcelExport.prototype.addEventListener = function () {
        this.parent.on('updateResults', this.updateExcelResultModel, this);
        this.parent.on('excelCellInfo', this.excelQueryCellInfo, this);
        this.parent.grid.on('export-RowDataBound', this.exportRowDataBound, this);
        this.parent.grid.on('finalPageSetup', this.finalPageSetup, this);
    };
    /**
     * To destroy the Excel Export
     *
     * @returns {void}
     * @hidden
     */
    ExcelExport.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @hidden
     * @returns {void}
     */
    ExcelExport.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('updateResults', this.updateExcelResultModel);
        this.parent.off('excelCellInfo', this.excelQueryCellInfo);
        this.parent.grid.off('export-RowDataBound', this.exportRowDataBound);
        this.parent.grid.off('finalPageSetup', this.finalPageSetup);
    };
    ExcelExport.prototype.updateExcelResultModel = function (returnResult) {
        this.dataResults = returnResult;
    };
    ExcelExport.prototype.Map = function (excelExportProperties, 
    /* eslint-disable-next-line */
    isMultipleExport, workbook, isBlob, isCsv) {
        var _this = this;
        var dataSource = this.parent.dataSource;
        var data = new Data(this.parent.grid);
        var property = Object();
        setValue('isCsv', isCsv, property);
        setValue('cancel', false, property);
        if (!isNullOrUndefined(excelExportProperties)) {
            this.isCollapsedStatePersist = excelExportProperties.isCollapsedStatePersist;
        }
        if (!isNullOrUndefined(excelExportProperties)) {
            if (!isNullOrUndefined(excelExportProperties.dataSource) && !excelExportProperties.dataSource['dataSource']) {
                return this.parent.grid.excelExportModule.Map(this.parent.grid, excelExportProperties, isMultipleExport, workbook, isCsv, isBlob);
            }
            if (excelExportProperties.exportType === 'CurrentPage') {
                excelExportProperties.dataSource = this.parent.getCurrentViewRecords();
                return this.parent.grid.excelExportModule.Map(this.parent.grid, excelExportProperties, isMultipleExport, workbook, isCsv, isBlob);
            }
        }
        return new Promise(function (resolve) {
            var dm = _this.isLocal() && !(dataSource instanceof DataManager) ? new DataManager(dataSource)
                : _this.parent.dataSource;
            var query = new Query();
            if (!_this.isLocal()) {
                query = _this.generateQuery(query);
                query.queries = _this.parent.grid.getDataModule().generateQuery().queries;
                query = ExportHelper.getQuery(_this.parent.grid, data);
                if (isNullOrUndefined(_this.parent.filterModule)) {
                    query.queries = query.queries.slice(1, 2);
                    query.params = query.params.slice(0, 0);
                }
                setValue('query', query, property);
            }
            _this.parent.trigger(beforeExcelExport, extend$1(property, excelExportProperties));
            if (getObject('cancel', property)) {
                return null;
            }
            dm.executeQuery(query).then(function (e) {
                var customData = null;
                if (!isNullOrUndefined(excelExportProperties) && !isNullOrUndefined(excelExportProperties.dataSource)) {
                    customData = excelExportProperties.dataSource;
                }
                excelExportProperties = _this.manipulateExportProperties(excelExportProperties, dataSource, e);
                return _this.parent.grid.excelExportModule.Map(_this.parent.grid, excelExportProperties, isMultipleExport, workbook, isCsv, isBlob).then(function (book) {
                    if (customData != null) {
                        excelExportProperties.dataSource = customData;
                    }
                    else {
                        delete excelExportProperties.dataSource;
                    }
                    resolve(book);
                });
            });
        });
    };
    ExcelExport.prototype.generateQuery = function (query, property) {
        if (!isNullOrUndefined(property) && property.exportType === 'CurrentPage'
            && this.parent.allowPaging) {
            property.exportType = 'AllPages';
            query.addParams('ExportType', 'CurrentPage');
            query.where(this.parent.parentIdMapping, 'equal', null);
            query = getObject('grid.renderModule.data.pageQuery', this.parent)(query);
        }
        return query;
    };
    ExcelExport.prototype.manipulateExportProperties = function (property, dtSrc, queryResult) {
        //count not required for this query
        var args = Object();
        if (!isNullOrUndefined(this.parent.grid.getDataModule())) {
            setValue('query', this.parent.grid.getDataModule().generateQuery(true), args);
        }
        setValue('isExport', true, args);
        if (!isNullOrUndefined(property) && !isNullOrUndefined(property.exportType)) {
            setValue('exportType', property.exportType, args);
        }
        if (!this.isLocal()) {
            this.parent.parentData = [];
            this.parent.dataModule.convertToFlatData(getObject('result', queryResult));
            setValue('expresults', this.parent.flatData, args);
        }
        this.parent.notify('dataProcessor', args);
        //args = this.parent.dataModule.dataProcessor(args);
        args = this.dataResults;
        dtSrc = isNullOrUndefined(args.result) ? this.parent.flatData.slice(0) : args.result;
        if (!this.isLocal()) {
            this.parent.flatData = [];
        }
        if (property && property.dataSource) {
            var flatsData = this.parent.flatData;
            var dataSrc = property.dataSource instanceof DataManager ? property.dataSource.dataSource.json : property.dataSource;
            this.parent.dataModule.convertToFlatData(dataSrc);
            dtSrc = this.parent.flatData;
            this.parent.flatData = flatsData;
        }
        property = isNullOrUndefined(property) ? Object() : property;
        property.dataSource = new DataManager({ json: dtSrc });
        if (this.parent.aggregates.length > 0) {
            property.query = args['query'];
        }
        return property;
    };
    /**
     * TreeGrid Excel Export cell modifier
     *
     * @param {ExcelQueryCellInfoEventArgs} args - current cell details
     * @hidden
     * @returns {void}
     */
    ExcelExport.prototype.excelQueryCellInfo = function (args) {
        if (this.parent.grid.getColumnIndexByUid(args.column.uid) === this.parent.treeColumnIndex) {
            var style = {};
            var data = args.data;
            var ispadfilter = isNullOrUndefined(data.filterLevel);
            var pad = ispadfilter ? data.level : data.filterLevel;
            style.indent = pad;
            args.style = style;
        }
        this.parent.notify('updateResults', args);
        this.parent.trigger('excelQueryCellInfo', args);
    };
    ExcelExport.prototype.exportRowDataBound = function (excelRow) {
        if (excelRow.type === 'excel') {
            var excelrowobj = excelRow.rowObj.data;
            var filtercolumnlength = this.parent.grid.filterSettings.columns.length;
            var rowlength = excelRow.excelRows.length;
            var rowlevel = excelrowobj.level;
            if (excelrowobj.parentItem && getParentData(this.parent, excelrowobj.parentItem.uniqueID, Boolean(filtercolumnlength))) {
                var expandedStatus = false;
                var sublevelState = false;
                var state = getExpandStatus(this.parent, excelrowobj, this.parent.parentData);
                if (this.isCollapsedStatePersist && (!state || !this.parent.isLocalData)) {
                    expandedStatus = true;
                    sublevelState = excelrowobj.expanded ? false : true;
                }
                excelRow.excelRows[rowlength - 1].grouping = { outlineLevel: rowlevel, isCollapsed: sublevelState,
                    isHidden: expandedStatus };
            }
            else if (excelrowobj.hasChildRecords && isNullOrUndefined(excelrowobj.parentItem)) {
                excelRow.excelRows[rowlength - 1].grouping = { outlineLevel: rowlevel };
            }
        }
    };
    /* eslint-disable-next-line */
    ExcelExport.prototype.finalPageSetup = function (workbook) {
        for (var i = 0; i < workbook.worksheets.length; i++) {
            if (workbook.worksheets[parseInt(i.toString(), 10)].rows) {
                workbook.worksheets[parseInt(i.toString(), 10)].pageSetup = { isSummaryRowBelow: false };
            }
        }
    };
    ExcelExport.prototype.isLocal = function () {
        return !isRemoteData(this.parent) && isOffline(this.parent);
    };
    return ExcelExport;
}());

/**
 * TreeGrid PDF Export module
 *
 * @hidden
 */
var PdfExport = /** @class */ (function () {
    /**
     * Constructor for PDF export module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function PdfExport(parent) {
        Grid.Inject(PdfExport$1);
        this.parent = parent;
        this.dataResults = {};
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} PdfExport module name
     */
    PdfExport.prototype.getModuleName = function () {
        return 'PdfExport';
    };
    /**
     * @hidden
     * @returns {void}
     */
    PdfExport.prototype.addEventListener = function () {
        this.parent.on('pdfCellInfo', this.pdfQueryCellInfo, this);
        this.parent.on('updateResults', this.updatePdfResultModel, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    PdfExport.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('pdfCellInfo', this.pdfQueryCellInfo);
        this.parent.off('updateResults', this.updatePdfResultModel);
    };
    /**
     * To destroy the PDF Export
     *
     * @returns {void}
     * @hidden
     */
    PdfExport.prototype.destroy = function () {
        this.removeEventListener();
    };
    PdfExport.prototype.updatePdfResultModel = function (returnResult) {
        this.dataResults = returnResult;
    };
    PdfExport.prototype.Map = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        var _this = this;
        var dtSrc = this.parent.dataSource;
        var prop = Object();
        var isLocal = !isRemoteData(this.parent) && isOffline(this.parent);
        setValue('cancel', false, prop);
        return new Promise(function (resolve) {
            var dm = isLocal && !(dtSrc instanceof DataManager) ? new DataManager(dtSrc)
                : _this.parent.dataSource;
            var query = new Query();
            if (!isLocal) {
                query = _this.generateQuery(query);
                setValue('query', query, prop);
            }
            _this.parent.trigger(beforePdfExport, extend$1(prop, pdfExportProperties));
            if (getObject('cancel', prop)) {
                return null;
            }
            dm.executeQuery(query).then(function (e) {
                var customsData = null;
                if (!isNullOrUndefined(pdfExportProperties) && !isNullOrUndefined(pdfExportProperties.dataSource)) {
                    customsData = pdfExportProperties.dataSource;
                }
                pdfExportProperties = _this.manipulatePdfProperties(pdfExportProperties, dtSrc, e);
                return _this.parent.grid.pdfExportModule.Map(_this.parent.grid, pdfExportProperties, isMultipleExport, pdfDoc, isBlob).then(function (document) {
                    if (customsData != null) {
                        pdfExportProperties.dataSource = customsData;
                    }
                    else {
                        delete pdfExportProperties.dataSource;
                    }
                    resolve(document);
                });
            });
        });
    };
    PdfExport.prototype.generateQuery = function (query, prop) {
        if (!isNullOrUndefined(prop) && prop.exportType === 'CurrentPage'
            && this.parent.allowPaging) {
            prop.exportType = 'AllPages';
            query.addParams('ExportType', 'CurrentPage');
            query.where(this.parent.parentIdMapping, 'equal', null);
            query = getObject('grid.renderModule.data.pageQuery', this.parent)(query);
        }
        return query;
    };
    PdfExport.prototype.manipulatePdfProperties = function (prop, dtSrc, queryResult) {
        var args = {};
        //count not required for this query
        var isLocal = !isRemoteData(this.parent) && isOffline(this.parent);
        setValue('query', this.parent.grid.getDataModule().generateQuery(true), args);
        setValue('isExport', true, args);
        setValue('isPdfExport', true, args);
        if (!isNullOrUndefined(prop) && !isNullOrUndefined(prop.isCollapsedStatePersist)) {
            setValue('isCollapsedStatePersist', prop.isCollapsedStatePersist, args);
        }
        if (!isNullOrUndefined(prop) && !isNullOrUndefined(prop.exportType)) {
            setValue('exportType', prop.exportType, args);
        }
        if (!isLocal) {
            this.parent.parentData = [];
            this.parent.dataModule.convertToFlatData(getValue('result', queryResult));
            setValue('expresults', this.parent.flatData, args);
        }
        this.parent.notify('dataProcessor', args);
        //args = this.parent.dataModule.dataProcessor(args);
        args = this.dataResults;
        dtSrc = isNullOrUndefined(args.result) ? this.parent.flatData.slice(0) : args.result;
        if (!isLocal) {
            this.parent.flatData = [];
        }
        if (prop && prop.dataSource && isLocal) {
            var flatDatas = this.parent.flatData;
            var dataSrc = prop.dataSource instanceof DataManager ? prop.dataSource.dataSource.json : prop.dataSource;
            this.parent.dataModule.convertToFlatData(dataSrc);
            dtSrc = this.parent.flatData;
            this.parent.flatData = flatDatas;
        }
        prop = isNullOrUndefined(prop) ? {} : prop;
        prop.dataSource = new DataManager({ json: dtSrc });
        prop.query = args['query'];
        return prop;
    };
    /**
     * TreeGrid PDF Export cell modifier
     *
     * @param {PdfQueryCellInfoEventArgs} args - Current cell details
     * @hidden
     * @returns {void}
     */
    PdfExport.prototype.pdfQueryCellInfo = function (args) {
        if (this.parent.grid.getColumnIndexByUid(args.column.uid) === this.parent.treeColumnIndex) {
            var style = {};
            var data = getObject('data', args);
            var ispadfilter = isNullOrUndefined(data.filterLevel);
            var pad = ispadfilter ? data.level : data.filterLevel;
            style.paragraphIndent = pad * 3;
            args.style = style;
        }
        this.parent.notify('updateResults', args);
        this.parent.trigger('pdfQueryCellInfo', args);
    };
    return PdfExport;
}());

/**
 * The `Page` module is used to render pager and handle paging action.
 *
 * @hidden
 */
var Page = /** @class */ (function () {
    function Page(parent) {
        Grid.Inject(Page$1);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * @hidden
     * @returns {void}
     */
    Page.prototype.addEventListener = function () {
        this.parent.on(localPagedExpandCollapse, this.collapseExpandPagedchilds, this);
        this.parent.on(pagingActions, this.pageAction, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    Page.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(localPagedExpandCollapse, this.collapseExpandPagedchilds);
        this.parent.off(pagingActions, this.pageAction);
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Pager module name
     */
    Page.prototype.getModuleName = function () {
        return 'pager';
    };
    /**
     * Refreshes the page count, pager information, and external message.
     *
     * @returns {void}
     */
    Page.prototype.refresh = function () {
        this.parent.grid.pagerModule.refresh();
    };
    /**
     * To destroy the pager
     *
     * @returns {void}
     * @hidden
     */
    Page.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * Navigates to the target page according to the given number.
     *
     * @param  {number} pageNo - Defines the page number to navigate.
     * @returns {void}
     */
    Page.prototype.goToPage = function (pageNo) {
        this.parent.grid.pagerModule.goToPage(pageNo);
    };
    /**
     * Defines the text of the external message.
     *
     * @param  {string} message - Defines the message to update.
     * @returns {void}
     */
    Page.prototype.updateExternalMessage = function (message) {
        if (isNullOrUndefined(message)) {
            var error = 'The provided value for the message is undefined. Please ensure the message contains string.';
            this.parent.trigger(actionFailure, { error: error });
        }
        this.parent.grid.pagerModule.updateExternalMessage(message);
    };
    /**
     * @param {{action: string, row: HTMLTableRowElement, record: ITreeData, args: RowCollapsedEventArgs}} rowDetails - Expand Collapse details arguments
     * @param {string} rowDetails.action - Expand Collapse action type
     * @param {HTMLTableRowElement} rowDetails.row - Row element
     * @param {ITreeData} rowDetails.record - Row object data
     * @param {RowCollapsedEventArgs} rowDetails.args - Expand Collapse event arguments
     * @hidden
     * @returns {void}
     */
    Page.prototype.collapseExpandPagedchilds = function (rowDetails) {
        rowDetails.record.expanded = rowDetails.action === 'collapse' ? false : true;
        this.parent.flatData.map(function (e) { return e.expanded = e.uniqueID === rowDetails.record.uniqueID &&
            e.expanded !== rowDetails.record.expanded ? rowDetails.record.expanded : e.expanded; });
        if (this.parent.enableImmutableMode) {
            var primaryKeyField_1 = this.parent.getPrimaryKeyFieldNames()[0];
            var record = this.parent.flatData.filter(function (e) {
                return e["" + primaryKeyField_1] === rowDetails.record["" + primaryKeyField_1];
            });
            if (record.length) {
                record[0].expanded = rowDetails.record.expanded;
            }
        }
        var ret = {
            result: this.parent.flatData,
            row: rowDetails.row,
            action: rowDetails.action,
            record: rowDetails.record,
            count: this.parent.flatData.length
        };
        getValue('grid.renderModule', this.parent).dataManagerSuccess(ret);
        if (this.parent.enableImmutableMode) {
            var row = 'row';
            var action = 'action';
            var targetEle = void 0;
            if (ret["" + action] === 'collapse') {
                targetEle = ret["" + row].getElementsByClassName('e-treegridexpand')[0];
                if (!isNullOrUndefined(targetEle)) {
                    removeClass([targetEle], 'e-treegridexpand');
                    addClass([targetEle], 'e-treegridcollapse');
                }
            }
            else if (ret["" + action] === 'expand') {
                targetEle = ret["" + row].getElementsByClassName('e-treegridcollapse')[0];
                if (!isNullOrUndefined(targetEle)) {
                    removeClass([targetEle], 'e-treegridcollapse');
                    addClass([targetEle], 'e-treegridexpand');
                }
            }
        }
    };
    Page.prototype.pageRoot = function (pagedResults, temp, result) {
        var newResults = isNullOrUndefined(result) ? [] : result;
        var _loop_1 = function (t) {
            newResults.push(temp[parseInt(t.toString(), 10)]);
            var res = [];
            if (temp[parseInt(t.toString(), 10)].hasChildRecords) {
                res = pagedResults.filter(function (e) {
                    return temp[parseInt(t.toString(), 10)].uniqueID === e.parentUniqueID;
                });
                newResults = this_1.pageRoot(pagedResults, res, newResults);
            }
        };
        var this_1 = this;
        for (var t = 0; t < temp.length; t++) {
            _loop_1(t);
        }
        return newResults;
    };
    Page.prototype.updatePageSize = function (pageingDetails) {
        var updateSize = pageingDetails.count;
        var gridPagerModule = this.parent.grid.pagerModule;
        if (this.parent.pageSettings.pageSizes === true) {
            if (gridPagerModule.pagerObj.pagerdropdownModule['dropDownListObject'].value === gridPagerModule.pagerObj.getLocalizedLabel('All')) {
                gridPagerModule['pagerObj'].totalRecordsCount = updateSize;
                this.parent.grid.pageSettings.pageSize = updateSize;
            }
        }
    };
    Page.prototype.pageAction = function (pageingDetails) {
        var _this = this;
        var dm = new DataManager(pageingDetails.result);
        if (this.parent.pageSettings.pageSizeMode === 'Root') {
            var temp = [];
            var propname = (this.parent.grid.filterSettings.columns.length > 0) &&
                (this.parent.filterSettings.hierarchyMode === 'Child' || this.parent.filterSettings.hierarchyMode === 'None') ?
                'filterLevel' : 'level';
            var query = new Query().where(propname, 'equal', 0);
            temp = dm.executeLocal(query);
            pageingDetails.count = temp.length;
            var size = this.parent.grid.pageSettings.pageSize;
            var current = this.parent.grid.pageSettings.currentPage;
            var skip = size * (current - 1);
            query = query.skip(skip).take(size);
            temp = dm.executeLocal(query);
            var newResults = this.pageRoot(pageingDetails.result, temp);
            pageingDetails.result = newResults;
        }
        else {
            var dm_1 = new DataManager(pageingDetails.result);
            var expanded = new Predicate$1('expanded', 'notequal', null).or('expanded', 'notequal', undefined);
            var parents_1 = dm_1.executeLocal(new Query().where(expanded));
            var visualData = void 0;
            if (isFilterChildHierarchy(this.parent) && (pageingDetails.actionArgs.action !== 'collapse' &&
                pageingDetails.actionArgs.action !== 'expand')) {
                visualData = parents_1;
            }
            else {
                visualData = parents_1.filter(function (e) {
                    return getExpandStatus(_this.parent, e);
                });
            }
            pageingDetails.count = visualData.length;
            var query = new Query();
            var size = this.parent.grid.pageSettings.pageSize;
            this.updatePageSize(pageingDetails);
            var current = this.parent.grid.pageSettings.currentPage;
            if (visualData.length < (current * size)) {
                current = (Math.floor(visualData.length / size)) + ((visualData.length % size) ? 1 : 0);
                current = current ? current : 1;
                this.parent.grid.setProperties({ pageSettings: { currentPage: current } }, true);
            }
            var skip = size * (current - 1);
            query = query.skip(skip).take(size);
            dm_1.dataSource.json = visualData;
            pageingDetails.result = dm_1.executeLocal(query);
        }
        this.parent.notify('updateAction', pageingDetails);
    };
    return Page;
}());

/**
 * Toolbar Module for TreeGrid
 *
 * @hidden
 */
var Toolbar = /** @class */ (function () {
    function Toolbar(parent) {
        Grid.Inject(Toolbar$1);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} - Returns Toolbar module name
     */
    Toolbar.prototype.getModuleName = function () {
        return 'toolbar';
    };
    /**
     * @hidden
     * @returns {void}
     */
    Toolbar.prototype.addEventListener = function () {
        this.parent.on(rowSelected, this.refreshToolbar, this);
        this.parent.on(rowDeselected, this.refreshToolbar, this);
        this.parent.on(toolbarClick, this.toolbarClickHandler, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    Toolbar.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(rowSelected, this.refreshToolbar);
        this.parent.off(rowDeselected, this.refreshToolbar);
        this.parent.off(toolbarClick, this.toolbarClickHandler);
    };
    Toolbar.prototype.refreshToolbar = function (args) {
        var toolbarElement = this.parent.grid.toolbarModule.getToolbar();
        if (!isNullOrUndefined(toolbarElement)) {
            var tObj = this.parent;
            var indentElement = void 0;
            var outdentElement = void 0;
            var indentID = tObj.element.id + '_gridcontrol_indent';
            var outdentID = tObj.element.id + '_gridcontrol_outdent';
            var indentEle = toolbarElement.querySelector('#' + indentID);
            var outdentEle = toolbarElement.querySelector('#' + outdentID);
            var row = args.row;
            var selectedrow = tObj.getSelectedRows()[0];
            if (!isNullOrUndefined(row[0])) {
                row = row[0];
            }
            row = (!isNullOrUndefined(selectedrow) && selectedrow.rowIndex !== row.rowIndex) ? selectedrow : row;
            if (indentEle !== null && outdentEle !== null) {
                indentElement = toolbarElement.querySelector('#' + indentID).parentElement;
                outdentElement = toolbarElement.querySelector('#' + outdentID).parentElement;
                if (row.rowIndex === 0 || tObj.getSelectedRowIndexes().length > 1) {
                    indentElement.classList.add('e-hidden');
                    outdentElement.classList.add('e-hidden');
                }
                else if (args['name'] !== 'rowDeselected' || (!isNullOrUndefined(selectedrow) && tObj.grid.isCheckBoxSelection)) {
                    var selectedItem = tObj.getCurrentViewRecords()[row.rowIndex];
                    if (!isNullOrUndefined(selectedItem)) {
                        if ((selectedItem.level > tObj.getCurrentViewRecords()[row.rowIndex - 1].level)) {
                            indentElement.classList.add('e-hidden');
                        }
                        else {
                            indentElement.classList.remove('e-hidden');
                        }
                        if (selectedItem.level === tObj.getCurrentViewRecords()[row.rowIndex - 1].level) {
                            indentElement.classList.remove('e-hidden');
                        }
                        if (selectedItem.level === 0) {
                            outdentElement.classList.add('e-hidden');
                        }
                        if (selectedItem.level !== 0) {
                            outdentElement.classList.remove('e-hidden');
                        }
                    }
                }
                if (args['name'] === 'rowDeselected' && isNullOrUndefined(selectedrow) && !tObj.grid.isCheckBoxSelection) {
                    if (this.parent.toolbar['includes']('Indent')) {
                        indentElement.classList.add('e-hidden');
                    }
                    if (this.parent.toolbar['includes']('Outdent')) {
                        outdentElement.classList.add('e-hidden');
                    }
                }
            }
        }
    };
    Toolbar.prototype.toolbarClickHandler = function (args) {
        var tObj = this.parent;
        var indentOutdentAction = 'indentOutdentAction';
        if (this.parent.editSettings.mode === 'Cell' && this.parent.grid.editSettings.mode === 'Batch' &&
            args.item.id === this.parent.grid.element.id + '_update') {
            args.cancel = true;
            this.parent.grid.editModule.saveCell();
        }
        if (args.item.id === this.parent.grid.element.id + '_expandall') {
            this.parent.expandAll();
        }
        if (args.item.id === this.parent.grid.element.id + '_collapseall') {
            this.parent.collapseAll();
        }
        if (args.item.id === tObj.grid.element.id + '_indent' && tObj.getSelectedRecords().length
            && !isNullOrUndefined(tObj.rowDragAndDropModule)) {
            this.parent.rowDragAndDropModule["" + indentOutdentAction](null, 'indent');
        }
        if (args.item.id === tObj.grid.element.id + '_outdent' && tObj.getSelectedRecords().length
            && !isNullOrUndefined(tObj.rowDragAndDropModule)) {
            this.parent.rowDragAndDropModule["" + indentOutdentAction](null, 'outdent');
        }
    };
    /**
     * Gets the toolbar of the TreeGrid.
     *
     * @returns {Element} - Returns Toolbar element
     * @hidden
     */
    Toolbar.prototype.getToolbar = function () {
        return this.parent.grid.toolbarModule.getToolbar();
    };
    /**
     * Enables or disables ToolBar items.
     *
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @returns {void}
     * @hidden
     */
    Toolbar.prototype.enableItems = function (items, isEnable) {
        this.parent.grid.toolbarModule.enableItems(items, isEnable);
    };
    /**
     * Destroys the ToolBar.
     *
     * @method destroy
     * @returns {void}
     */
    Toolbar.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Toolbar;
}());

/**
 * TreeGrid Aggregate module
 *
 * @hidden
 */
var Aggregate = /** @class */ (function () {
    /**
     * Constructor for Aggregate module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Aggregate(parent) {
        Grid.Inject(Aggregate$1);
        this.parent = parent;
        this.flatChildRecords = [];
        this.summaryQuery = [];
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Summary module name
     */
    Aggregate.prototype.getModuleName = function () {
        return 'summary';
    };
    Aggregate.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
    };
    /**
     * Function to calculate summary values
     *
     * @param {QueryOptions[]} summaryQuery - DataManager query for aggregate operations
     * @param {Object[]} filteredData - Filtered data collection
     * @param {boolean} isSort - Specified whether sorting operation performed
     * @hidden
     * @returns {Object[]} -  return flat records with summary values
     */
    Aggregate.prototype.calculateSummaryValue = function (summaryQuery, filteredData, isSort) {
        this.summaryQuery = summaryQuery;
        var parentRecord;
        var parentDataLength = Object.keys(filteredData).length;
        var parentData = [];
        for (var p = 0, len = parentDataLength; p < len; p++) {
            var summaryRow = getObject('isSummaryRow', filteredData[parseInt(p.toString(), 10)]);
            if (!summaryRow) {
                parentData.push(filteredData[parseInt(p.toString(), 10)]);
            }
        }
        var parentRecords = findParentRecords(parentData);
        var flatRecords = parentData.slice();
        var summaryLength = Object.keys(this.parent.aggregates).length;
        var dataLength = Object.keys(parentRecords).length;
        var childRecordsLength;
        var columns = this.parent.getColumns();
        if (this.parent.aggregates.filter(function (x) { return x.showChildSummary; }).length) {
            for (var i = 0, len = dataLength; i < len; i++) {
                parentRecord = parentRecords[parseInt(i.toString(), 10)];
                childRecordsLength = this.getChildRecordsLength(parentRecord, flatRecords);
                if (childRecordsLength) {
                    var _loop_1 = function (summaryRowIndex, len_1) {
                        var item = void 0;
                        item = {};
                        for (var i_1 = 0; i_1 < columns.length; i_1++) {
                            var field = (isNullOrUndefined(getObject('field', columns[parseInt(i_1.toString(), 10)]))) ?
                                columns[parseInt(i_1.toString(), 10)] : getObject('field', (columns[parseInt(i_1.toString(), 10)]));
                            item["" + field] = null;
                        }
                        if (this_1.parent.aggregates[summaryRowIndex - 1].showChildSummary) {
                            var idx_1;
                            flatRecords.map(function (e, i) {
                                if (e.uniqueID === parentRecord.uniqueID) {
                                    idx_1 = i;
                                    return;
                                }
                            });
                            var currentIndex = idx_1 + childRecordsLength + summaryRowIndex;
                            item = this_1.createSummaryItem(item, this_1.parent.aggregates[summaryRowIndex - 1], currentIndex);
                            var summaryParent = extend$1({}, parentRecord);
                            delete summaryParent.childRecords;
                            delete summaryParent[this_1.parent.childMapping];
                            setValue('parentItem', summaryParent, item);
                            var level = getObject('level', summaryParent);
                            setValue('level', level + 1, item);
                            setValue('isSummaryRow', true, item);
                            setValue('parentUniqueID', summaryParent.uniqueID, item);
                            if (isSort) {
                                var childRecords = getObject('childRecords', parentRecord);
                                if (childRecords.length) {
                                    childRecords.push(item);
                                }
                            }
                            flatRecords.splice(currentIndex, 0, item);
                        }
                        else {
                            item = this_1.createSummaryItem(item, this_1.parent.aggregates[summaryRowIndex - 1]);
                            return "continue";
                        }
                    };
                    var this_1 = this;
                    for (var summaryRowIndex = 1, len_1 = summaryLength; summaryRowIndex <= len_1; summaryRowIndex++) {
                        _loop_1(summaryRowIndex, len_1);
                    }
                    this.flatChildRecords = [];
                }
            }
        }
        else {
            var items = {};
            for (var columnIndex = 0, length_1 = columns.length; columnIndex < length_1; columnIndex++) {
                var fields = isNullOrUndefined(getObject('field', columns[parseInt(columnIndex.toString(), 10)])) ?
                    columns[parseInt(columnIndex.toString(), 10)] : getObject('field', columns[parseInt(columnIndex.toString(), 10)]);
                items["" + fields] = null;
            }
            for (var summaryRowIndex = 1, length_2 = summaryLength; summaryRowIndex <= length_2; summaryRowIndex++) {
                this.createSummaryItem(items, this.parent.aggregates[summaryRowIndex - 1]);
            }
        }
        return flatRecords;
    };
    Aggregate.prototype.getChildRecordsLength = function (parentData, flatData) {
        var recordLength = Object.keys(flatData).length;
        var record;
        for (var i = 0, len = recordLength; i < len; i++) {
            record = flatData[parseInt(i.toString(), 10)];
            var parent_1 = isNullOrUndefined(record.parentItem) ? null :
                flatData.filter(function (e) { return e.uniqueID === record.parentItem.uniqueID; })[0];
            if (parentData === parent_1) {
                this.flatChildRecords.push(record);
                var hasChild = getObject('hasChildRecords', record);
                if (hasChild) {
                    this.getChildRecordsLength(record, flatData);
                }
                else {
                    continue;
                }
            }
        }
        return this.flatChildRecords.length;
    };
    Aggregate.prototype.createSummaryItem = function (itemData, summary, rowIndex) {
        var summaryColumnLength = Object.keys(summary.columns).length;
        for (var i = 0, len = summaryColumnLength; i < len; i++) {
            var displayColumn = isNullOrUndefined(summary.columns[parseInt(i.toString(), 10)].columnName) ?
                summary.columns[parseInt(i.toString(), 10)].field : summary.columns[parseInt(i.toString(), 10)].columnName;
            var keys = Object.keys(itemData);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                if (key === displayColumn) {
                    if (this.flatChildRecords.length) {
                        itemData["" + key] = this.getSummaryValues(summary.columns[parseInt(i.toString(), 10)], this.flatChildRecords, rowIndex);
                    }
                    else if (this.parent.isLocalData) {
                        var data = this.parent.dataSource instanceof DataManager ? this.parent.dataSource.dataSource.json
                            : this.parent.flatData;
                        itemData["" + key] = this.getSummaryValues(summary.columns[parseInt(i.toString(), 10)], data, rowIndex);
                    }
                }
                else {
                    continue;
                }
            }
        }
        return itemData;
    };
    Aggregate.prototype.getSummaryValues = function (summaryColumn, summaryData, rowIndex) {
        var qry = new Query();
        var single = {};
        var helper = {};
        var type = !isNullOrUndefined(summaryColumn.field) ?
            this.parent.getColumnByField(summaryColumn.field).type : undefined;
        summaryColumn.setPropertiesSilent({ format: this.getFormatFromType(summaryColumn.format, type) });
        summaryColumn.setFormatter(this.parent.grid.locale);
        var formatFn = summaryColumn.getFormatter() || (function () { return function (a) { return a; }; })();
        summaryColumn.setTemplate(helper);
        var tempObj = summaryColumn.getTemplate(2);
        qry.queries = this.summaryQuery;
        qry.requiresCount();
        var sumData = new DataManager(summaryData).executeLocal(qry);
        var types = summaryColumn.type;
        var summaryKey;
        types = [summaryColumn.type];
        for (var i = 0; i < types.length; i++) {
            summaryKey = types[parseInt(i.toString(), 10)];
            var key = summaryColumn.field + ' - ' + types[parseInt(i.toString(), 10)].toLowerCase();
            var val = types[parseInt(i.toString(), 10)] !== 'Custom' ? getObject('aggregates', sumData) :
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                calculateAggregate(types[parseInt(i.toString(), 10)], sumData, summaryColumn, this.parent);
            var disp = summaryColumn.columnName;
            var value_1 = types[parseInt(i.toString(), 10)] !== 'Custom' ? val["" + key] : val;
            single["" + disp] = single["" + disp] || {};
            single["" + disp]["" + key] = value_1;
            single["" + disp][types[parseInt(i.toString(), 10)]] = !isNullOrUndefined(val) ? formatFn(value_1) : ' ';
        }
        helper.format = summaryColumn.getFormatter();
        var cellElement = createElement('td', {
            className: 'e-summary'
        });
        if (this.parent.isReact) {
            var renderReactTemplates = 'renderReactTemplates';
            tempObj.fn(single[summaryColumn.columnName], this.parent, tempObj.property, '', null, null, cellElement);
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var thisRef_1 = this;
            var colIndex_1 = this.parent.getColumnIndexByField(summaryColumn.field);
            // tslint:disable-next-line:typedef
            this.parent["" + renderReactTemplates](function () {
                setTimeout(function () {
                    var td = thisRef_1.parent.getCellFromIndex(rowIndex, colIndex_1);
                    if (thisRef_1.parent.treeColumnIndex === colIndex_1) {
                        var treeCell = td.querySelector('.e-treecell');
                        if (treeCell) {
                            treeCell.innerHTML = cellElement.innerHTML;
                        }
                    }
                    else {
                        td.innerHTML = cellElement.innerHTML;
                    }
                }, 0);
            });
        }
        else {
            appendChildren(cellElement, tempObj.fn(single[summaryColumn.columnName], this.parent, tempObj.property));
        }
        var value = single["" + summaryColumn.columnName]["" + summaryKey];
        var summaryValue;
        if (cellElement.innerHTML.indexOf(value) === -1) {
            summaryValue = cellElement.innerHTML + value;
            return summaryValue;
        }
        else {
            return cellElement.innerHTML;
        }
    };
    Aggregate.prototype.getFormatFromType = function (summaryformat, type) {
        if (isNullOrUndefined(type) || typeof summaryformat !== 'string') {
            return summaryformat;
        }
        var obj;
        switch (type) {
            case 'number':
                obj = { format: summaryformat };
                break;
            case 'datetime':
                obj = { type: 'dateTime', skeleton: summaryformat };
                break;
            case 'date':
                obj = { type: type, skeleton: summaryformat };
                break;
        }
        return obj;
    };
    /**
     * To destroy the Aggregate module
     *
     * @returns {void}
     * @hidden
     */
    Aggregate.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Aggregate;
}());

/**
 * Internal dataoperations for TreeGrid
 *
 * @hidden
 */
var Sort = /** @class */ (function () {
    function Sort(grid) {
        Grid.Inject(Sort$1);
        this.parent = grid;
        this.taskIds = [];
        this.flatSortedData = [];
        this.storedIndex = -1;
        this.isSelfReference = !isNullOrUndefined(this.parent.parentIdMapping);
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Sort module name
     */
    Sort.prototype.getModuleName = function () {
        return 'sort';
    };
    /**
     * @hidden
     */
    Sort.prototype.addEventListener = function () {
        this.parent.on('updateModel', this.updateModel, this);
        this.parent.on('createSort', this.createdSortedRecords, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    Sort.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('updateModel', this.updateModel);
        this.parent.off('createSort', this.createdSortedRecords);
    };
    Sort.prototype.createdSortedRecords = function (sortParams) {
        var data = sortParams.modifiedData;
        var srtQry = sortParams.srtQry;
        this.iterateSort(data, srtQry);
        this.storedIndex = -1;
        sortParams.modifiedData = this.flatSortedData;
        this.flatSortedData = [];
    };
    Sort.prototype.iterateSort = function (data, srtQry) {
        for (var d = 0; d < data.length; d++) {
            if (this.parent.grid.filterSettings.columns.length > 0 || this.parent.grid.searchSettings.key !== '') {
                if (!isNullOrUndefined(getParentData(this.parent, data[parseInt(d.toString(), 10)].uniqueID, true))) {
                    this.storedIndex++;
                    this.flatSortedData[this.storedIndex] = data[parseInt(d.toString(), 10)];
                }
            }
            else {
                this.storedIndex++;
                this.flatSortedData[this.storedIndex] = data[parseInt(d.toString(), 10)];
            }
            if (data[parseInt(d.toString(), 10)].hasChildRecords) {
                var childSort = (new DataManager(data[parseInt(d.toString(), 10)].childRecords)
                    .executeLocal(srtQry));
                if (this.parent.allowRowDragAndDrop && data[parseInt(d.toString(), 10)].childRecords.indexOf(this.parent.rowDragAndDropModule['draggedRecord']) !== -1 && this.parent.rowDragAndDropModule['dropPosition'] !== 'middleSegment') {
                    var dragdIndex = childSort.indexOf(this.parent.rowDragAndDropModule['draggedRecord']);
                    childSort.splice(dragdIndex, 1);
                    var dropdIndex = childSort.indexOf(this.parent.rowDragAndDropModule['droppedRecord']);
                    if (this.parent.rowDragAndDropModule['dropPosition'] === 'topSegment') {
                        childSort.splice(dropdIndex, 0, this.parent.rowDragAndDropModule['draggedRecord']);
                    }
                    else if (this.parent.rowDragAndDropModule['dropPosition'] === 'bottomSegment') {
                        childSort.splice(dropdIndex + 1, 0, this.parent.rowDragAndDropModule['draggedRecord']);
                    }
                }
                this.iterateSort(childSort, srtQry);
            }
        }
    };
    /**
     * Sorts a column with the given options.
     *
     * @param {string} columnName - Defines the column name to be sorted.
     * @param {SortDirection} direction - Defines the direction of sorting field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns are to be maintained.
     * @returns {void}
     */
    Sort.prototype.sortColumn = function (columnName, direction, isMultiSort) {
        this.parent.grid.sortColumn(columnName, direction, isMultiSort);
    };
    Sort.prototype.removeSortColumn = function (field) {
        this.parent.grid.removeSortColumn(field);
    };
    /**
     * The function used to update sortSettings of TreeGrid.
     *
     * @returns {void}
     * @hidden
     */
    Sort.prototype.updateModel = function () {
        this.parent.setProperties({ sortSettings: getActualProperties(this.parent.grid.sortSettings) }, true);
    };
    /**
     * Clears all the sorted columns of the TreeGrid.
     *
     * @returns {void}
     */
    Sort.prototype.clearSorting = function () {
        this.parent.grid.clearSorting();
        this.updateModel();
    };
    /**
     * Destroys the Sorting of TreeGrid.
     *
     * @function destroy
     * @returns {void}
     */
    Sort.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Sort;
}());

/**
 * TreeGrid ColumnMenu module
 *
 * @hidden
 */
var ColumnMenu = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function ColumnMenu(parent) {
        Grid.Inject(ColumnMenu$1);
        this.parent = parent;
    }
    ColumnMenu.prototype.getColumnMenu = function () {
        return this.parent.grid.columnMenuModule.getColumnMenu();
    };
    ColumnMenu.prototype.destroy = function () {
        //this.parent.grid.columnMenuModule.destroy();
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns ColumnMenu module name
     */
    ColumnMenu.prototype.getModuleName = function () {
        return 'columnMenu';
    };
    return ColumnMenu;
}());

/**
 * ContextMenu Module for TreeGrid
 *
 * @hidden
 */
var ContextMenu = /** @class */ (function () {
    function ContextMenu(parent) {
        Grid.Inject(ContextMenu$1);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * @hidden
     * @returns {void}
     */
    ContextMenu.prototype.addEventListener = function () {
        this.parent.on('contextMenuOpen', this.contextMenuOpen, this);
        this.parent.on('contextMenuClick', this.contextMenuClick, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    ContextMenu.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('contextMenuOpen', this.contextMenuOpen);
        this.parent.off('contextMenuClick', this.contextMenuClick);
    };
    ContextMenu.prototype.contextMenuOpen = function (args) {
        var addRow = select('#' + this.parent.element.id + '_gridcontrol_cmenu_AddRow', args.element);
        var editRecord = select('#' + this.parent.element.id + '_gridcontrol_cmenu_Edit', args.element);
        var indent = select('#' + this.parent.element.id + '_gridcontrol_cmenu_Indent', args.element);
        var outdent = select('#' + this.parent.element.id + '_gridcontrol_cmenu_Outdent', args.element);
        if (addRow) {
            if (this.parent.grid.editSettings.allowAdding === false || this.parent.grid.isEdit) {
                addRow.style.display = 'none';
            }
            else {
                addRow.style.display = 'block';
            }
        }
        if ((this.parent.editSettings.mode === 'Cell' || this.parent.editSettings.mode === 'Batch')
            && !(isNullOrUndefined(editRecord)) && !(editRecord.classList.contains('e-menu-hide'))) {
            editRecord.style.display = 'none';
        }
        var tObj = this.parent;
        var selectedrow = tObj.getSelectedRows()[0];
        if ((indent || outdent) && !isNullOrUndefined(selectedrow)) {
            var targetElement = args.event.target.closest('td');
            if (isNullOrUndefined(targetElement) || (!isNullOrUndefined(targetElement) && (!targetElement.classList.contains('e-rowcell') ||
                targetElement.querySelectorAll('.e-gridform').length !== 0))) {
                for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
                    var items = _a[_i];
                    if (items.text === 'Outdent' || items.text === 'Indent') {
                        tObj.grid.contextMenuModule['hiddenItems'].push(items.text);
                    }
                }
                tObj.grid.contextMenuModule.contextMenu.hideItems(tObj.grid.contextMenuModule['hiddenItems']);
                indent.style.display = outdent.style.display = 'none';
            }
            else {
                if (selectedrow.rowIndex === 0 || tObj.getSelectedRowIndexes().length > 1) {
                    indent.style.display = outdent.style.display = 'none';
                }
                else if (args['name'] !== 'rowDeselected' || (!isNullOrUndefined(selectedrow) && tObj.grid.isCheckBoxSelection)) {
                    var selectedItem = tObj.getCurrentViewRecords()[selectedrow.rowIndex];
                    if (!isNullOrUndefined(selectedItem)) {
                        if ((selectedItem.level > tObj.getCurrentViewRecords()[selectedrow.rowIndex - 1].level)) {
                            indent.style.display = 'none';
                        }
                        else {
                            indent.style.display = 'block';
                        }
                        if ((selectedItem.level === tObj.getCurrentViewRecords()[selectedrow.rowIndex - 1].level)) {
                            indent.style.display = 'block';
                        }
                        if ((selectedItem.level === 0)) {
                            outdent.style.display = 'none';
                        }
                        else {
                            outdent.style.display = 'block';
                        }
                    }
                }
            }
        }
        else {
            if (((indent || outdent) || tObj.grid.isEdit) && isNullOrUndefined(selectedrow)) {
                for (var _b = 0, _c = args.items; _b < _c.length; _b++) {
                    var items = _c[_b];
                    if (items.text === 'Outdent' || items.text === 'Indent') {
                        if (!tObj.grid.contextMenuModule['hiddenItems'].includes(items.text)) {
                            tObj.grid.contextMenuModule['hiddenItems'].push(items.text);
                        }
                    }
                }
                tObj.grid.contextMenuModule.contextMenu.hideItems(tObj.grid.contextMenuModule['hiddenItems']);
                indent.style.display = outdent.style.display = 'none';
            }
        }
    };
    ContextMenu.prototype.contextMenuClick = function (args) {
        if (args.item.id === 'Above' || args.item.id === 'Below' || args.item.id === 'Child') {
            this.parent.notify('savePreviousRowPosition', args);
            this.parent.setProperties({ editSettings: { newRowPosition: args.item.id } }, true);
            this.parent.editModule['isAddedRowByContextMenu'] = true;
            this.parent.addRecord();
        }
        if (args.item.id === this.parent.element.id + '_gridcontrol_cmenu_Indent' || args.item.id === this.parent.element.id + '_gridcontrol_cmenu_Outdent') {
            if (!isNullOrUndefined(this.parent.rowDragAndDropModule)) {
                var indentOutdentAction = 'indentOutdentAction';
                var action = args.item.id === this.parent.element.id + '_gridcontrol_cmenu_Indent' ? 'indent' : 'outdent';
                this.parent.rowDragAndDropModule["" + indentOutdentAction](null, action);
            }
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns ContextMenu module name
     */
    ContextMenu.prototype.getModuleName = function () {
        return 'contextMenu';
    };
    /**
     * Destroys the ContextMenu.
     *
     * @function destroy
     * @returns {void}
     */
    ContextMenu.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * Gets the context menu element from the TreeGrid.
     *
     * @returns {Element} Return Context Menu root element.
     */
    ContextMenu.prototype.getContextMenu = function () {
        return this.parent.grid.contextMenuModule.getContextMenu();
    };
    return ContextMenu;
}());

/**
 * `BatchEdit` module is used to handle batch editing actions.
 *
 * @hidden
 */
var BatchEdit = /** @class */ (function () {
    function BatchEdit(parent) {
        this.batchChildCount = 0;
        this.addedRecords = 'addedRecords';
        this.deletedRecords = 'deletedRecords';
        this.batchAddedRecords = [];
        this.batchDeletedRecords = [];
        this.batchAddRowRecord = [];
        this.parent = parent;
        this.isSelfReference = !isNullOrUndefined(parent.parentIdMapping);
        this.batchRecords = [];
        this.currentViewRecords = [];
        this.isAdd = false;
        this.addEventListener();
    }
    BatchEdit.prototype.addEventListener = function () {
        this.parent.on(cellSaved, this.cellSaved, this);
        this.parent.on(batchAdd, this.batchAdd, this);
        this.parent.on(beforeBatchAdd, this.beforeBatchAdd, this);
        this.parent.on(batchSave, this.batchSave, this);
        this.parent.on(beforeBatchDelete, this.beforeBatchDelete, this);
        this.parent.on(beforeBatchSave, this.beforeBatchSave, this);
        this.parent.on('batchPageAction', this.batchPageAction, this);
        this.parent.on('batchCancelAction', this.batchCancelAction, this);
        this.parent.grid.on('immutable-batch-cancel', this.immutableBatchAction, this);
        this.parent.grid.on('next-cell-index', this.nextCellIndex, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    BatchEdit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(cellSaved, this.cellSaved);
        this.parent.off(batchAdd, this.batchAdd);
        this.parent.off(batchSave, this.batchSave);
        this.parent.off(beforeBatchAdd, this.beforeBatchAdd);
        this.parent.off(beforeBatchDelete, this.beforeBatchDelete);
        this.parent.off(beforeBatchSave, this.beforeBatchSave);
        this.parent.off('batchPageAction', this.batchPageAction);
        this.parent.off('batchCancelAction', this.batchCancelAction);
        this.parent.grid.off('immutable-batch-cancel', this.immutableBatchAction);
        this.parent.grid.off('next-cell-index', this.nextCellIndex);
    };
    /**
     * To destroy the editModule
     *
     * @returns {void}
     * @hidden
     */
    BatchEdit.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @hidden
     * @returns {Object[]} Returns modified records in batch editing.
     */
    BatchEdit.prototype.getBatchRecords = function () {
        return this.batchRecords;
    };
    /**
     * @hidden
     * @returns {number} Returns index of newly add row
     */
    BatchEdit.prototype.getAddRowIndex = function () {
        return this.addRowIndex;
    };
    /**
     * @hidden
     * @returns {number} Returns selected row index
     */
    BatchEdit.prototype.getSelectedIndex = function () {
        return this.selectedIndex;
    };
    /**
     * @hidden
     * @returns {number} Returns newly added child count
     */
    BatchEdit.prototype.getBatchChildCount = function () {
        return this.batchChildCount;
    };
    BatchEdit.prototype.batchPageAction = function () {
        var data = (this.parent.grid.dataSource instanceof DataManager ?
            this.parent.grid.dataSource.dataSource.json : this.parent.grid.dataSource);
        var primaryKey = this.parent.grid.getPrimaryKeyFieldNames()[0];
        var index;
        if (!isNullOrUndefined(this.batchAddedRecords) && this.batchAddedRecords.length) {
            for (var i = 0; i < this.batchAddedRecords.length; i++) {
                index = data.map(function (e) { return e["" + primaryKey]; }).indexOf(this.batchAddedRecords[parseInt(i.toString(), 10)]["" + primaryKey]);
                data.splice(index, 1);
            }
        }
        this.batchAddedRecords = this.batchRecords = this.batchAddRowRecord = this.batchDeletedRecords = this.currentViewRecords = [];
    };
    BatchEdit.prototype.cellSaved = function (args) {
        var actualCellIndex = args.column.index;
        if (actualCellIndex === this.parent.treeColumnIndex) {
            this.parent.renderModule.cellRender({ data: args.rowData, cell: args.cell,
                column: this.parent.grid.getColumnByIndex(args.column.index)
            });
        }
        if (this.isAdd && this.parent.editSettings.mode === 'Batch' && this.parent.editSettings.newRowPosition !== 'Bottom') {
            var data = (this.parent.grid.dataSource instanceof DataManager ?
                this.parent.grid.dataSource.dataSource.json : this.parent.grid.dataSource);
            var added = void 0;
            var level = 'level';
            var primaryKey_1 = this.parent.grid.getPrimaryKeyFieldNames()[0];
            var currentDataIndex = void 0;
            var indexvalue = void 0;
            var parentItem = 'parentItem';
            var uniqueID = 'uniqueID';
            var parentRecord = this.selectedIndex > -1 ? this.batchRecords[parseInt(this.addRowIndex.toString(), 10)]["" + parentItem] : null;
            var idMapping = void 0;
            var parentUniqueID = void 0;
            var parentIdMapping = void 0;
            var rowObjectIndex = this.parent.editSettings.newRowPosition === 'Top' || this.selectedIndex === -1 ? 0 :
                this.parent.editSettings.newRowPosition === 'Above' ? this.addRowIndex
                    : this.addRowIndex + 1;
            rowObjectIndex = this.getActualRowObjectIndex(rowObjectIndex);
            if (this.newBatchRowAdded) {
                if (this.batchRecords.length) {
                    idMapping = this.batchRecords[this.addRowIndex][this.parent.idMapping];
                    parentIdMapping = this.batchRecords[this.addRowIndex][this.parent.parentIdMapping];
                    if (this.batchRecords[parseInt(this.addRowIndex.toString(), 10)]["" + parentItem]) {
                        parentUniqueID = this.batchRecords[parseInt(this.addRowIndex.toString(), 10)]["" + parentItem]["" + uniqueID];
                    }
                }
                this.batchAddedRecords = extendArray(this.batchAddedRecords);
                this.batchAddRowRecord = extendArray(this.batchAddRowRecord);
                this.batchAddRowRecord.push(this.batchRecords[this.addRowIndex]);
                added = this.parent.grid.getRowsObject()[parseInt(rowObjectIndex.toString(), 10)].changes;
                if (!isNullOrUndefined(added)) {
                    added.uniqueID = getUid(this.parent.element.id + '_data_');
                    setValue('uniqueIDCollection.' + added.uniqueID, added, this.parent);
                    if (!Object.prototype.hasOwnProperty.call(added, 'level')) {
                        this.batchIndex = this.selectedIndex === -1 ? 0 : this.batchIndex;
                        if (this.parent.editSettings.newRowPosition === 'Child') {
                            added.primaryParent = parentRecord;
                            if (this.selectedIndex > -1) {
                                added.parentItem = extend$1({}, this.batchRecords[this.addRowIndex]);
                                added.parentUniqueID = added.parentItem.uniqueID;
                                delete added.parentItem.childRecords;
                                delete added.parentItem[this.parent.childMapping];
                                added.level = added.parentItem.level + 1;
                                added.index = this.batchIndex;
                                var childRecordCount = findChildrenRecords(this.batchRecords[this.addRowIndex]).length;
                                var record = findChildrenRecords(this.batchRecords[this.addRowIndex])[childRecordCount - 1];
                                record = isNullOrUndefined(record) ? this.batchRecords[this.addRowIndex] : record;
                                currentDataIndex = data.map(function (e) { return e["" + primaryKey_1]; }).indexOf(record["" + primaryKey_1]);
                                if (this.isSelfReference) {
                                    added[this.parent.parentIdMapping] = idMapping;
                                }
                                updateParentRow(primaryKey_1, added.parentItem, 'add', this.parent, this.isSelfReference, added);
                            }
                        }
                        else if ((this.parent.editSettings.newRowPosition === 'Above' || this.parent.editSettings.newRowPosition === 'Below')
                            && !isNullOrUndefined(this.batchRecords[this.addRowIndex])) {
                            added.level = this.batchRecords[parseInt(this.addRowIndex.toString(), 10)]["" + level];
                            if (added.level && this.selectedIndex > -1) {
                                added.parentItem = parentRecord;
                                added.parentUniqueID = parentUniqueID;
                                delete added.parentItem.childRecords;
                                delete added.parentItem[this.parent.childMapping];
                            }
                            added.index = this.parent.editSettings.newRowPosition === 'Below' ? this.batchIndex : this.batchIndex - 1;
                            if (this.parent.editSettings.newRowPosition === 'Below' && this.selectedIndex > -1) {
                                var childRecordCount = findChildrenRecords(this.batchRecords[this.addRowIndex]).length;
                                var record = findChildrenRecords(this.batchRecords[this.addRowIndex])[childRecordCount - 1];
                                record = isNullOrUndefined(record) ? this.batchRecords[this.addRowIndex] : record;
                                currentDataIndex = data.map(function (e) { return e["" + primaryKey_1]; }).indexOf(record["" + primaryKey_1]);
                            }
                            if (this.parent.editSettings.newRowPosition === 'Above' && this.selectedIndex > -1) {
                                var record = this.batchRecords[this.addRowIndex];
                                currentDataIndex = data.map(function (e) { return e["" + primaryKey_1]; }).indexOf(record["" + primaryKey_1]);
                            }
                            if (this.isSelfReference) {
                                added[this.parent.parentIdMapping] = parentIdMapping;
                            }
                        }
                        added.index = added.index === -1 ? 0 : added.index;
                        added.hasChildRecords = false;
                        added.childRecords = [];
                        this.batchRecords.splice(added.index, 0, added);
                        this.currentViewRecords.splice(added.index, 0, added);
                        if (currentDataIndex) {
                            indexvalue = currentDataIndex;
                        }
                        else {
                            indexvalue = added.index;
                        }
                        if (this.parent.editSettings.newRowPosition !== 'Above') {
                            indexvalue = added.index === 0 ? indexvalue : indexvalue + 1;
                        }
                        data.splice(indexvalue, 0, added);
                        this.batchAddedRecords.push(added);
                    }
                }
                this.parent.grid.getRowsObject()[parseInt(rowObjectIndex.toString(), 10)].data = added;
                this.newBatchRowAdded = false;
            }
        }
    };
    BatchEdit.prototype.beforeBatchAdd = function (e) {
        var isTabLastRow = 'isTabLastRow';
        if (this.parent.editSettings.mode === 'Cell' && this.parent.editModule["" + isTabLastRow]) {
            e.cancel = true;
            this.parent.editModule["" + isTabLastRow] = false;
            return;
        }
        if (this.parent.editModule['isAddedRowByMethod'] && !isNullOrUndefined(this.parent.editModule['addRowIndex']) &&
            !this.parent.editModule['isAddedRowByContextMenu'] && (this.parent.grid.selectedRowIndex === -1 || this.parent.editModule['batchEditModule'].isAdd)) {
            this.selectedIndex = this.parent.editModule['selectedIndex'];
            this.addRowIndex = this.parent.editModule['addRowIndex'];
            this.addRowRecord = this.batchRecords.length ? this.batchRecords[this.selectedIndex]
                : this.parent.getCurrentViewRecords()[this.selectedIndex];
        }
        else {
            this.selectedIndex = this.parent.grid.selectedRowIndex;
            this.addRowIndex = this.parent.grid.selectedRowIndex > -1 ? this.parent.grid.selectedRowIndex : 0;
            this.parent.editModule['addRowIndex'] = this.parent.grid.selectedRowIndex > -1 ? this.parent.grid.selectedRowIndex : 0;
            this.addRowRecord = this.parent.getSelectedRecords()[0];
        }
    };
    BatchEdit.prototype.batchAdd = function (e) {
        if (this.parent.editSettings.newRowPosition !== 'Bottom') {
            this.isAdd = true;
            this.newBatchRowAdded = true;
            var actualIndex = 0;
            if (!this.batchRecords.length) {
                this.batchAddedRecords = [];
                this.batchRecords = extendArray(this.parent.grid.getCurrentViewRecords());
                this.currentViewRecords = extendArray(this.parent.grid.getCurrentViewRecords());
            }
            if (this.parent.editModule['isAddedRowByMethod'] && !isNullOrUndefined(this.parent.editModule['addRowIndex'])) {
                classList(this.parent.grid.getDataRows()[0], ['e-batchrow'], []);
            }
            if (this.parent.editSettings.newRowPosition !== 'Top') {
                var records = this.parent.grid.getCurrentViewRecords();
                if (this.parent.editSettings.mode === 'Batch' && (this.parent.getBatchChanges()[this.addedRecords].length > 1
                    || this.parent.getBatchChanges()[this.deletedRecords].length)) {
                    records = this.batchRecords;
                }
                this.updateChildCount(records);
                this.parent.notify(beginAdd, {});
                this.batchChildCount = 0;
            }
            this.updateRowIndex();
            // update focus module, need to refix this once grid source modified.
            var focusModule = getValue('focusModule', this.parent.grid);
            var table = this.parent.getContentTable();
            if (this.parent.getBatchChanges()[this.deletedRecords].length && this.parent.editSettings.newRowPosition === 'Above') {
                actualIndex = e.row.rowIndex;
                focusModule.getContent().matrix.matrix = this.matrix;
            }
            else {
                actualIndex = table.getElementsByClassName('e-batchrow')[0].rowIndex;
                // if (this.parent.frozenRows || this.parent.frozenColumns) {
                //   actualIndex = this.batchIndex;
                // }
            }
            focusModule.getContent().matrix.current = [actualIndex, focusModule.getContent().matrix.current[1]];
            if (this.parent.editModule['isAddedRowByMethod'] && !isNullOrUndefined(this.parent.editModule['addRowIndex']) && !this.parent.editModule['isAddedRowByContextMenu']) {
                var newlyAddedRecords = this.parent.getBatchChanges()['addedRecords'];
                var index = parseInt(this.parent.getContentTable().getElementsByClassName('e-insertedrow')[newlyAddedRecords.length - 1].getAttribute('aria-rowindex'), 10) - 1;
                this.batchRecords.splice(index, 0, newlyAddedRecords[newlyAddedRecords.length - 1]);
            }
        }
    };
    BatchEdit.prototype.beforeBatchDelete = function (args) {
        if (!this.batchRecords.length) {
            this.batchRecords = extendArray(this.parent.grid.getCurrentViewRecords());
            this.currentViewRecords = extendArray(this.parent.grid.getCurrentViewRecords());
        }
        var focusModule = getValue('focusModule', this.parent.grid);
        this.matrix = focusModule.getContent().matrix.matrix;
        var row = [];
        var records = [];
        var primarykey = this.parent.grid.getPrimaryKeyFieldNames()[0];
        var data;
        var childs;
        var uid;
        var rowElement = Array.isArray(args.row) ? args.row[0] : args.row;
        if (!isNullOrUndefined(rowElement) && this.parent.getSelectedRows().indexOf(rowElement) === -1) {
            data = args.rowData;
            childs = findChildrenRecords(data);
            uid = rowElement.getAttribute('data-uid');
        }
        else {
            data = this.parent.grid.getSelectedRecords()[this.parent.grid.getSelectedRecords().length - 1];
            childs = findChildrenRecords(data);
            uid = this.parent.getSelectedRows()[0].getAttribute('data-uid');
        }
        var parentRowIndex = parseInt(this.parent.grid.getRowElementByUID(uid).getAttribute('aria-rowindex'), 10) - 1;
        if (childs.length) {
            var totalCount = parentRowIndex + childs.length;
            var firstChildIndex = parentRowIndex + 1;
            for (var i = firstChildIndex; i <= totalCount; i++) {
                row.push(this.parent.grid.getDataRows()[parseInt(i.toString(), 10)]);
                if (this.parent.frozenRows || this.parent.frozenColumns || this.parent.getFrozenColumns()) {
                    row.push(this.parent.grid.getHeaderContent()[parseInt(i.toString(), 10)]);
                }
            }
        }
        if (!isNullOrUndefined(data.parentItem)) {
            var parentItem = getParentData(this.parent, data.parentItem.uniqueID);
            if (!isNullOrUndefined(parentItem) && parentItem.hasChildRecords) {
                var childIndex = parentItem.childRecords.indexOf(data);
                parentItem.childRecords.splice(childIndex, 1);
            }
            this.batchDeletedRecords = extendArray(this.batchDeletedRecords);
            this.batchDeletedRecords.push(data);
        }
        childs.push(data);
        records = childs;
        for (var i = 0; i < records.length; i++) {
            var indexvalue = this.batchRecords.map(function (e) { return e["" + primarykey]; }).indexOf(records[parseInt(i.toString(), 10)]["" + primarykey]);
            if (indexvalue !== -1) {
                this.batchRecords.splice(indexvalue, 1);
            }
        }
        for (var i = 0; i < row.length; i++) {
            if (!isNullOrUndefined(row[parseInt(i.toString(), 10)])) {
                this.parent.grid.selectionModule.selectedRecords.push(row[parseInt(i.toString(), 10)]);
            }
        }
    };
    BatchEdit.prototype.updateRowIndex = function () {
        var rows = this.parent.grid.getDataRows();
        for (var i = 0; i < rows.length; i++) {
            rows[parseInt(i.toString(), 10)].setAttribute('aria-rowindex', (i + 1).toString());
        }
    };
    BatchEdit.prototype.updateChildCount = function (records) {
        var primaryKey = this.parent.grid.getPrimaryKeyFieldNames()[0];
        var addedRecords = 'addedRecords';
        var parentItem = this.parent.editSettings.newRowPosition === 'Child' ? 'primaryParent' : 'parentItem';
        for (var i = 0; i < this.parent.getBatchChanges()["" + addedRecords].length; i++) {
            if (!isNullOrUndefined(this.parent.getBatchChanges()["" + addedRecords][parseInt(i.toString(), 10)]["" + parentItem])) {
                if (this.parent.getBatchChanges()["" + addedRecords][parseInt(i.toString(), 10)]["" + parentItem]["" + primaryKey] === records[parseInt(this.addRowIndex.toString(), 10)]["" + primaryKey]) {
                    this.batchChildCount = this.batchChildCount + 1;
                }
            }
        }
    };
    BatchEdit.prototype.beforeBatchSave = function (e) {
        var changeRecords = 'changedRecords';
        var deleterecords = 'deletedRecords';
        var changedRecords = e.batchChanges["" + changeRecords];
        if (e.batchChanges["" + changeRecords].length) {
            var columnName = void 0;
            for (var i = 0; i < changedRecords.length; i++) {
                editAction({ value: changedRecords[parseInt(i.toString(), 10)], action: 'edit' }, this.parent, this.isSelfReference, this.addRowIndex, this.selectedIndex, columnName);
            }
        }
        if (e.batchChanges["" + deleterecords].length) {
            var deletedRecords = e.batchChanges["" + deleterecords];
            var record = deletedRecords;
            for (var i = 0; i < record.length; i++) {
                this.deleteUniqueID(record[parseInt(i.toString(), 10)].uniqueID);
                var childs = findChildrenRecords(record[parseInt(i.toString(), 10)]);
                for (var c = 0; c < childs.length; c++) {
                    this.deleteUniqueID(childs[parseInt(c.toString(), 10)].uniqueID);
                }
                e.batchChanges["" + deleterecords] = e.batchChanges["" + deleterecords].concat(childs);
            }
        }
        this.isAdd = false;
    };
    BatchEdit.prototype.deleteUniqueID = function (value) {
        var idFilter = 'uniqueIDFilterCollection';
        delete this.parent["" + idFilter]["" + value];
        var id = 'uniqueIDCollection';
        delete this.parent["" + id]["" + value];
    };
    BatchEdit.prototype.batchCancelAction = function () {
        var targetElement = 'targetElement';
        var index;
        var parentItem = 'parentItem';
        var indexvalue = 'index';
        var currentViewRecords = this.parent.grid.getCurrentViewRecords();
        var childRecords = 'childRecords';
        var data = (this.parent.grid.dataSource instanceof DataManager ?
            this.parent.grid.dataSource.dataSource.json : this.parent.grid.dataSource);
        var primaryKey = this.parent.grid.getPrimaryKeyFieldNames()[0];
        if (!isNullOrUndefined(this.batchAddedRecords)) {
            for (var i = 0; i < this.batchAddedRecords.length; i++) {
                index = data.map(function (e) { return e["" + primaryKey]; }).indexOf(this.batchAddedRecords[parseInt(i.toString(), 10)]["" + primaryKey]);
                if (index !== -1) {
                    data.splice(index, 1);
                }
                if (this.parent.editSettings.newRowPosition === 'Child') {
                    index = currentViewRecords.map(function (e) { return e["" + primaryKey]; })
                        .indexOf(this.batchAddedRecords[parseInt(i.toString(), 10)]["" + parentItem] ? this.batchAddedRecords[parseInt(i.toString(), 10)]["" + parentItem]["" + primaryKey]
                        : this.batchAddedRecords[parseInt(i.toString(), 10)]["" + primaryKey]);
                    if (!isNullOrUndefined(currentViewRecords[parseInt(index.toString(), 10)])) {
                        var children = currentViewRecords[parseInt(index.toString(), 10)]["" + childRecords];
                        for (var j = 0; children && j < children.length; j++) {
                            if (children[parseInt(j.toString(), 10)]["" + primaryKey] === this.batchAddedRecords[parseInt(i.toString(), 10)]["" + primaryKey]) {
                                currentViewRecords[parseInt(index.toString(), 10)]["" + childRecords].splice(j, 1);
                            }
                        }
                    }
                }
            }
        }
        if (!isNullOrUndefined(this.parent["" + targetElement])) {
            var row = this.parent["" + targetElement].closest('tr');
            this.parent.collapseRow(row);
            this.parent["" + targetElement] = null;
        }
        if (!isNullOrUndefined(this.batchDeletedRecords)) {
            for (var i = 0; i < this.batchDeletedRecords.length; i++) {
                if (!isNullOrUndefined(this.batchDeletedRecords[parseInt(i.toString(), 10)]["" + parentItem])) {
                    index = currentViewRecords.map(function (e) { return e["" + primaryKey]; })
                        .indexOf(this.batchDeletedRecords[parseInt(i.toString(), 10)]["" + parentItem]["" + primaryKey]);
                    var positionIndex = this.batchDeletedRecords[parseInt(i.toString(), 10)]["" + indexvalue] === 0 ? this.batchDeletedRecords[parseInt(i.toString(), 10)]["" + indexvalue] :
                        this.batchDeletedRecords[parseInt(i.toString(), 10)]["" + indexvalue] - 1;
                    if (!isNullOrUndefined(currentViewRecords[parseInt(index.toString(), 10)])) {
                        currentViewRecords[parseInt(index.toString(), 10)]["" + childRecords].splice(positionIndex, 0, this.batchDeletedRecords[parseInt(i.toString(), 10)]);
                    }
                }
            }
        }
        this.batchAddedRecords = this.batchRecords = this.batchAddRowRecord = this.currentViewRecords = [];
        this.batchRecords = extendArray(this.parent.grid.getCurrentViewRecords());
        this.batchIndex = 0;
        this.currentViewRecords = extendArray(this.parent.grid.getCurrentViewRecords());
        this.batchDeletedRecords = [];
        this.parent.grid.renderModule.refresh();
    };
    BatchEdit.prototype.batchSave = function (args) {
        if (this.parent.editSettings.mode === 'Batch') {
            var i = void 0;
            var batchChanges = Object.hasOwnProperty.call(args, 'updatedRecords') ? args.updatedRecords : this.parent.getBatchChanges();
            var deletedRecords = 'deletedRecords';
            var addedRecords = 'addedRecords';
            var index = 'index';
            var uniqueID = 'uniqueID';
            var data = (this.parent.grid.dataSource instanceof DataManager ?
                this.parent.grid.dataSource.dataSource.json : this.parent.grid.dataSource);
            var currentViewRecords = this.parent.grid.getCurrentViewRecords();
            var primarykey_1 = this.parent.grid.getPrimaryKeyFieldNames()[0];
            var level = 'level';
            var addRecords = batchChanges["" + addedRecords];
            var parentItem = 'parentItem';
            var selectedIndex = void 0;
            var addRowIndex = void 0;
            var columnName = void 0;
            var addRowRecord = void 0;
            var childRecords = 'childRecords';
            if (addRecords.length > 1 && this.parent.editSettings.newRowPosition !== 'Bottom') {
                addRecords.reverse();
            }
            if (this.parent.editSettings.newRowPosition !== 'Bottom' && !Object.hasOwnProperty.call(args, 'updatedRecords')) {
                data.splice(data.length - addRecords.length, addRecords.length);
                if (this.parent.editModule['isAddedRowByMethod'] && addRecords.length && !isNullOrUndefined(this.parent.editModule['addRowIndex']) && !this.parent.editModule['isAddedRowByContextMenu']) {
                    addRecords.reverse();
                    for (var i_1 = 0; i_1 < addRecords.length; i_1++) {
                        var index_1 = parseInt(this.parent.getContentTable().getElementsByClassName('e-insertedrow')[parseInt(i_1.toString(), 10)].getAttribute('aria-rowindex'), 10) - 1;
                        data.splice(index_1, 0, addRecords[parseInt(i_1.toString(), 10)]);
                    }
                }
                if (!this.parent.allowPaging && data.length !== currentViewRecords.length) {
                    if (currentViewRecords.length > addRecords.length) {
                        currentViewRecords.splice(currentViewRecords.length - addRecords.length, addRecords.length);
                    }
                }
                else {
                    var totalRecords = extendArray(data);
                    if (totalRecords.length) {
                        var startIndex = totalRecords.map(function (e) { return e["" + primarykey_1]; })
                            .indexOf(currentViewRecords[0]["" + primarykey_1]);
                        var endIndex = startIndex + this.parent.grid.pageSettings.pageSize;
                        currentViewRecords = totalRecords.splice(startIndex, endIndex);
                    }
                }
            }
            if (this.batchAddRowRecord.length === 0) {
                this.batchAddRowRecord.push(this.parent.flatData[args.index]);
            }
            if (this.parent.editModule['isAddedRowByContextMenu']) {
                addRecords.reverse();
            }
            for (i = 0; i < addRecords.length; i++) {
                var taskData = extend$1({}, addRecords[parseInt(i.toString(), 10)]);
                delete taskData.parentItem;
                delete taskData.uniqueID;
                delete taskData.index;
                delete taskData.level;
                delete taskData.hasChildRecords;
                delete taskData.childRecords;
                delete taskData.parentUniqueID;
                if (!isNullOrUndefined(taskData.primaryParent)) {
                    delete taskData.primaryParent;
                }
                if (addRecords.length > 1 && this.parent.editModule['isAddedRowByContextMenu']) {
                    var rowPosition = this.parent.editSettings.newRowPosition;
                    this.parent.editSettings.newRowPosition = this.parent.editModule['previousNewRowPosition'];
                    this.parent.editModule['previousNewRowPosition'] = rowPosition;
                }
                addRecords[parseInt(i.toString(), 10)].taskData = taskData;
                addRowRecord = this.batchAddRowRecord[parseInt(i.toString(), 10)];
                if (isNullOrUndefined(addRowRecord)) {
                    addRowRecord = this.batchAddRowRecord[i - 1];
                }
                if (this.isSelfReference) {
                    if (!isNullOrUndefined(addRecords[parseInt(i.toString(), 10)].parentItem)) {
                        updateParentRow(primarykey_1, addRecords[parseInt(i.toString(), 10)].parentItem, 'add', this.parent, this.isSelfReference, addRecords[parseInt(i.toString(), 10)]);
                    }
                }
                if (!isNullOrUndefined(addRowRecord)) {
                    addRowIndex = addRowRecord.index;
                }
                if (isNullOrUndefined(addRecords[parseInt(i.toString(), 10)].index)) {
                    addRowIndex = 0;
                }
                if (this.parent.editSettings.newRowPosition !== 'Top' && this.parent.editSettings.newRowPosition !== 'Bottom') {
                    if (isNullOrUndefined(addRecords[parseInt(i.toString(), 10)].parentItem) && this.selectedIndex === -1) {
                        selectedIndex = -1;
                        addRowRecord = null;
                    }
                }
                editAction({ value: addRecords[parseInt(i.toString(), 10)], action: 'add' }, this.parent, this.isSelfReference, addRowIndex, selectedIndex, columnName, addRowRecord);
                selectedIndex = null;
                if (this.parent.editSettings.newRowPosition === 'Child' && !isNullOrUndefined(addRecords[parseInt(i.toString(), 10)]["" + parentItem]) &&
                    (isNullOrUndefined(this.parent.editModule['addRowIndex']) || this.isSelfReference)) {
                    var indexValue = currentViewRecords.map(function (e) { return e["" + primarykey_1]; })
                        .indexOf(addRecords[parseInt(i.toString(), 10)]["" + parentItem]["" + primarykey_1]);
                    var children = currentViewRecords[parseInt(indexValue.toString(), 10)]["" + childRecords];
                    for (var j = 0; j < children.length; j++) {
                        if (children[parseInt(j.toString(), 10)]["" + primarykey_1] === addRecords[parseInt(i.toString(), 10)]["" + primarykey_1]) {
                            currentViewRecords[parseInt(indexValue.toString(), 10)]["" + childRecords].splice(j, 1);
                        }
                    }
                }
            }
            if (batchChanges["" + deletedRecords].length) {
                for (i = 0; i < batchChanges["" + deletedRecords].length; i++) {
                    editAction({ value: batchChanges["" + deletedRecords][parseInt(i.toString(), 10)], action: 'delete' }, this.parent, this.isSelfReference, addRowIndex, selectedIndex, columnName, addRowRecord);
                }
            }
            this.parent.parentData = [];
            for (var i_2 = 0; i_2 < data.length; i_2++) {
                data[parseInt(i_2.toString(), 10)]["" + index] = i_2;
                setValue('uniqueIDCollection.' + data[parseInt(i_2.toString(), 10)]["" + uniqueID] + '.index', i_2, this.parent);
                if (!data[parseInt(i_2.toString(), 10)]["" + level]) {
                    this.parent.parentData.push(data[parseInt(i_2.toString(), 10)]);
                }
            }
        }
        this.batchAddRowRecord = this.batchAddedRecords = this.batchRecords = this.batchDeletedRecords = this.currentViewRecords = [];
        if (this.parent.editModule['isAddedRowByContextMenu']) {
            this.parent.editModule['isAddedRowByContextMenu'] = false;
        }
    };
    BatchEdit.prototype.getActualRowObjectIndex = function (index) {
        var rows = this.parent.grid.getDataRows();
        if ((this.parent.editSettings.newRowPosition === 'Below' || this.parent.editSettings.newRowPosition === 'Child')
            && this.selectedIndex > -1) {
            if (!isNullOrUndefined(this.batchRecords[this.addRowIndex]) && this.batchRecords[this.addRowIndex].expanded) {
                if (this.parent.getBatchChanges()[this.addedRecords].length > 1
                    || this.parent.getBatchChanges()[this.deletedRecords].length) {
                    index += findChildrenRecords(this.batchRecords[this.addRowIndex]).length;
                    if (this.parent.editSettings.newRowPosition !== 'Child') {
                        var batchChildCount = this.getBatchChildCount();
                        index = index + batchChildCount;
                    }
                }
                else {
                    index += findChildrenRecords(this.batchRecords[this.addRowIndex]).length;
                }
            }
            if (index >= rows.length) {
                index = rows.length - 1;
            }
            this.updateChildCount(this.parent.grid.getCurrentViewRecords());
            if (this.batchChildCount) {
                index += this.batchChildCount;
            }
            this.batchChildCount = 0;
        }
        return index;
    };
    BatchEdit.prototype.immutableBatchAction = function (e) {
        e.args.cancel = true;
        var changes = this.parent.grid.getBatchChanges();
        var addedRecords = [];
        var index = 'index';
        if (Object.keys(changes).length) {
            addedRecords = changes.addedRecords;
        }
        for (var i = 0; i < addedRecords.length; i++) {
            e.rows.splice(addedRecords[parseInt(i.toString(), 10)]["" + index], 1);
        }
    };
    BatchEdit.prototype.nextCellIndex = function (args) {
        var index = 'index';
        var rowIndex = 'rowIndex';
        if (this.parent.getSelectedRows().length) {
            args["" + index] = this.parent.getSelectedRows()[0]["" + rowIndex];
        }
        else {
            args["" + index] = this.batchIndex;
        }
    };
    return BatchEdit;
}());

/**
 * TreeGrid Edit Module
 * The `Edit` module is used to handle editing actions.
 */
var Edit = /** @class */ (function () {
    /**
     * Constructor for Edit module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Edit(parent) {
        this.addedRecords = 'addedRecords';
        this.deletedRecords = 'deletedRecords';
        this.prevAriaRowIndex = '-1';
        this.isAddedRowByMethod = false;
        this.isAddedRowByContextMenu = false;
        Grid.Inject(Edit$1);
        this.parent = parent;
        this.isSelfReference = !isNullOrUndefined(parent.parentIdMapping);
        this.previousNewRowPosition = null;
        this.internalProperties = {};
        this.batchEditModule = new BatchEdit(this.parent);
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Edit module name
     */
    Edit.prototype.getModuleName = function () {
        return 'edit';
    };
    /**
     * @hidden
     * @returns {void}
     */
    Edit.prototype.addEventListener = function () {
        this.parent.on(crudAction, this.crudAction, this);
        this.parent.on(beginEdit, this.beginEdit, this);
        this.parent.on(beginAdd, this.beginAdd, this);
        this.parent.on(recordDoubleClick, this.recordDoubleClick, this);
        this.parent.on(cellSave, this.cellSave, this);
        this.parent.on(batchCancel, this.batchCancel, this);
        this.parent.grid.on(keyPressed, this.keyPressed, this);
        this.parent.grid.on('batchedit-form', this.lastCellTab, this);
        this.parent.grid.on('content-ready', this.contentready, this);
        this.parent.on(cellEdit, this.cellEdit, this);
        this.parent.on('actionBegin', this.editActionEvents, this);
        this.parent.on('actionComplete', this.editActionEvents, this);
        this.parent.grid.on(doubleTap, this.recordDoubleClick, this);
        this.parent.grid.on('dblclick', this.gridDblClick, this);
        this.parent.grid.on('recordAdded', this.customCellSave, this);
        this.parent.on('savePreviousRowPosition', this.savePreviousRowPosition, this);
        // this.parent.on(events.beforeDataBound, this.beforeDataBound, this);
        this.parent.grid.on(beforeStartEdit, this.beforeStartEdit, this);
        this.parent.grid.on(beforeBatchCancel, this.beforeBatchCancel, this);
        this.parent.grid.on('reset-edit-props', this.resetIsOnBatch, this);
        this.parent.grid.on('get-row-position', this.getRowPosition, this);
    };
    Edit.prototype.gridDblClick = function (e) {
        this.doubleClickTarget = e.target;
        if (e.target.classList.contains('e-frame') && this.parent.getCurrentViewRecords().length === 0) {
            this.doubleClickTarget = null;
        }
        if (e.target.classList.contains('e-treegridcollapse') || e.target.classList.contains('e-treegridexpand')) {
            var tr = parentsUntil(e.target, 'e-row');
            var rowIndex = tr && parseInt(tr.getAttribute('aria-rowindex'), 10) - 1;
            if (!isNullOrUndefined(rowIndex) && rowIndex >= 0 && this.parent.allowPaging) {
                /* eslint-disable-next-line */
                this.parent.grid.getDataRows()[rowIndex].dataset.uid = this.parent.grid.contentModule.getRows()[rowIndex].uid;
            }
        }
    };
    Edit.prototype.getRowPosition = function (addArgs) {
        addArgs.newRowPosition = this.parent.editSettings.newRowPosition;
        addArgs.addRowIndex = this.addRowIndex;
        addArgs.dataRowIndex = +this.prevAriaRowIndex;
    };
    Edit.prototype.beforeStartEdit = function (args) {
        if (this.parent.editSettings.mode === 'Cell') {
            this.parent.trigger(actionBegin, args);
        }
    };
    Edit.prototype.beforeBatchCancel = function (args) {
        if (this.parent.editSettings.mode === 'Cell') {
            args['requestType'] = 'cancel';
            this.parent.trigger(actionComplete, args);
        }
    };
    /**
     * @hidden
     * @returns {void}
     */
    Edit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(crudAction, this.crudAction);
        this.parent.off(beginEdit, this.beginEdit);
        this.parent.off(beginAdd, this.beginAdd);
        this.parent.off(recordDoubleClick, this.recordDoubleClick);
        this.parent.off(batchCancel, this.batchCancel);
        this.parent.grid.off(keyPressed, this.keyPressed);
        this.parent.grid.off('batchedit-form', this.lastCellTab);
        this.parent.grid.off('content-ready', this.contentready);
        this.parent.off(cellEdit, this.cellEdit);
        this.parent.off('actionBegin', this.editActionEvents);
        this.parent.off('actionComplete', this.editActionEvents);
        this.parent.grid.off('recordAdded', this.customCellSave);
        this.parent.grid.off(doubleTap, this.recordDoubleClick);
        this.parent.off('savePreviousRowPosition', this.savePreviousRowPosition);
        this.parent.grid.off(beforeStartEdit, this.beforeStartEdit);
        this.parent.grid.off(beforeBatchCancel, this.beforeBatchCancel);
        this.parent.grid.off('dblclick', this.gridDblClick);
        this.parent.grid.off('reset-edit-props', this.resetIsOnBatch);
        this.parent.grid.off('get-row-position', this.getRowPosition);
        //this.parent.grid.off('click', this.gridSingleClick);
    };
    /**
     * To destroy the editModule
     *
     * @returns {void}
     * @hidden
     */
    Edit.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @param {Column[]} cols - Column property Collection
     * @hidden
     * @returns {void}
     */
    Edit.prototype.applyFormValidation = function (cols) {
        this.parent.grid.editModule.applyFormValidation(cols);
    };
    Edit.prototype.editActionEvents = function (args) {
        var eventArgs = getObject('editAction', args);
        var eventName = getObject('name', eventArgs);
        var treeObj = this.parent;
        var adaptor = !isNullOrUndefined(treeObj.dataSource)
            && treeObj.dataSource.adaptor;
        if (!isNullOrUndefined(adaptor) && (isRemoteData(treeObj) || adaptor instanceof RemoteSaveAdaptor) &&
            (eventArgs.requestType === 'save' && eventArgs.action === 'add') &&
            (treeObj.editSettings.newRowPosition === 'Child' || treeObj.editSettings.newRowPosition === 'Below'
                || treeObj.editSettings.newRowPosition === 'Above')) {
            if (eventName === 'actionBegin') {
                var rowIndex = isNullOrUndefined(eventArgs.row) || !Object.keys(eventArgs.row).length ? this.selectedIndex :
                    eventArgs.row.rowIndex - 1;
                var keyData = (!isNullOrUndefined(rowIndex) && rowIndex !== -1) ?
                    treeObj.getCurrentViewRecords()[parseInt(rowIndex.toString(), 10)][treeObj.getPrimaryKeyFieldNames()[0]] : -1;
                treeObj.grid.query.addParams('relationalKey', keyData);
            }
            else if (eventName === 'actionComplete') {
                var paramsLength = treeObj.grid.query.params.length;
                for (var i = 0; i < paramsLength; i++) {
                    if (treeObj.grid.query.params[parseInt(i.toString(), 10)].key === 'relationalKey') {
                        treeObj.grid.query.params.splice(i);
                    }
                }
            }
        }
        if (this.parent.enableInfiniteScrolling && eventName === 'actionComplete') {
            this.infiniteAddAction(eventArgs);
        }
        if (this.parent.editSettings.mode === 'Batch' && eventArgs.requestType === 'paging') {
            this.parent.notify('batchPageAction', {});
        }
    };
    Edit.prototype.infiniteAddAction = function (args) {
        if ((args.requestType === 'save' && args.action === 'add') || args.requestType === 'delete') {
            if (this.parent.editSettings.newRowPosition !== 'Top' && this.selectedIndex !== -1
                && (args.requestType === 'save' && args.action === 'add')) {
                var rowObjects = this.parent.grid.getRowsObject();
                var newRowObject = rowObjects.splice(0, 1)[0];
                var newRowObjectIndex = this.addRowIndex;
                var currentData = this.parent.getCurrentViewRecords();
                if (this.parent.editSettings.newRowPosition === 'Below' || this.parent.editSettings.newRowPosition === 'Child') {
                    newRowObjectIndex += findChildrenRecords(currentData[newRowObjectIndex + 1]).length;
                }
                newRowObjectIndex = this.parent.editSettings.newRowPosition === 'Below' ? newRowObjectIndex + 1 : newRowObjectIndex;
                rowObjects.splice(newRowObjectIndex, 0, newRowObject);
                var newRecord = currentData.splice(0, 1)[0];
                currentData.splice(newRowObjectIndex, 0, newRecord);
                this.updateInfiniteCurrentViewData(newRecord, this.addRowIndex);
            }
            var movableRows = this.parent.grid.getRows();
            var movableRowsObject = this.parent.grid.getRowsObject();
            var isCache = this.parent.infiniteScrollSettings.enableCache;
            if (!isCache) {
                resetRowIndex(this.parent.grid, this.parent.grid.getRowsObject(), this.parent.grid.getRows(), 0);
                this.updateIndex(this.parent.grid.dataSource, this.parent.getRows(), this.parent.getCurrentViewRecords());
            }
            if (!isCache && this.parent.getFrozenColumns() > 0) {
                resetRowIndex(this.parent.grid, movableRowsObject, movableRows, 0);
                this.updateIndex(this.parent.grid.dataSource, movableRows, this.parent.getCurrentViewRecords());
            }
        }
    };
    Edit.prototype.updateInfiniteCurrentViewData = function (newRecord, newRowIndex) {
        var _this = this;
        var infiniteData = 'infiniteCurrentViewData';
        var updateCurrentViewData = 'updateCurrentViewData';
        var size = Math.ceil(newRowIndex / this.parent.grid.pageSettings.pageSize);
        var page = size > 0 ? size : 1;
        var dataIndex = newRowIndex - ((page - 1) * this.parent.pageSettings.pageSize);
        var infiniteCurrentViewData = this.parent.grid.infiniteScrollModule["" + infiniteData];
        infiniteCurrentViewData[1].splice(0, 1);
        var data = infiniteCurrentViewData[parseInt(page.toString(), 10)];
        if (!isNullOrUndefined(this.addRowRecord)) {
            data.filter(function (e, index) {
                if (e.uniqueID === _this.addRowRecord.uniqueID) {
                    dataIndex = index;
                }
            });
            if (this.addRowRecord.hasChildRecords && this.addRowRecord.childRecords.length &&
                this.parent.editSettings.newRowPosition === 'Below' || this.parent.editSettings.newRowPosition === 'Child') {
                dataIndex += findChildrenRecords(this.addRowRecord).length;
            }
        }
        if (dataIndex >= this.parent.pageSettings.pageSize) {
            page += 1;
            data = infiniteCurrentViewData[parseInt(page.toString(), 10)];
            dataIndex = dataIndex - this.parent.pageSettings.pageSize >= 0 ? dataIndex - this.parent.pageSettings.pageSize : 0;
        }
        dataIndex = this.parent.editSettings.newRowPosition === 'Below' ? dataIndex + 1 : dataIndex;
        data.splice(dataIndex, 0, newRecord);
        this.parent.grid.infiniteScrollModule["" + updateCurrentViewData]();
    };
    Edit.prototype.recordDoubleClick = function (args) {
        var target = args.target;
        if (isNullOrUndefined(target.closest('td.e-rowcell'))) {
            return;
        }
        if (!(this.parent.grid.editSettings.allowEditing) || this.parent.grid.isEdit) {
            return;
        }
        var column = this.parent.grid.getColumnByIndex(+target.closest('td.e-rowcell').getAttribute('aria-colindex') - 1);
        if (this.parent.editSettings.mode === 'Cell' && !this.isOnBatch && column && !column.isPrimaryKey &&
            this.parent.editSettings.allowEditing && column.allowEditing && !(target.classList.contains('e-treegridexpand') ||
            target.classList.contains('e-treegridcollapse')) && this.parent.editSettings.allowEditOnDblClick) {
            this.isOnBatch = true;
            this.parent.grid.setProperties({ selectedRowIndex: args.rowIndex }, true);
            if (this.parent.enableVirtualization) {
                var tr = parentsUntil(args.target, 'e-row');
                this.prevAriaRowIndex = tr.getAttribute('aria-rowindex');
                tr.setAttribute('aria-rowindex', (tr.rowIndex + 1) + '');
            }
            this.updateGridEditMode('Batch');
        }
        else if (this.parent.editSettings.mode === 'Cell' && (!column.allowEditing || column.isPrimaryKey)) {
            this.isOnBatch = true;
            this.updateGridEditMode('Batch');
        }
    };
    Edit.prototype.updateGridEditMode = function (mode) {
        this.parent.grid.setProperties({ editSettings: { mode: mode } }, true);
        var updateMethod = getObject('updateEditObj', this.parent.grid.editModule);
        updateMethod.apply(this.parent.grid.editModule);
        this.parent.grid.isEdit = false;
    };
    Edit.prototype.resetIsOnBatch = function () {
        if (this.parent.enableVirtualization && this.parent.editSettings.mode === 'Cell') {
            this.isOnBatch = false;
            this.updateGridEditMode('Normal');
        }
    };
    Edit.prototype.keyPressed = function (args) {
        if (this.isOnBatch) {
            this.keyPress = args.action;
        }
        if (args.action === 'f2') {
            this.recordDoubleClick(args);
        }
        if (args.action === 'escape') {
            this.closeEdit();
        }
    };
    Edit.prototype.deleteUniqueID = function (value) {
        var idFilter = 'uniqueIDFilterCollection';
        delete this.parent["" + idFilter]["" + value];
        var id = 'uniqueIDCollection';
        delete this.parent["" + id]["" + value];
    };
    Edit.prototype.cellEdit = function (args) {
        var _this = this;
        var promise = 'promise';
        var prom = args["" + promise];
        delete args["" + promise];
        if (this.parent.enableVirtualization && !isNullOrUndefined(this.prevAriaRowIndex) && this.prevAriaRowIndex !== '-1') {
            args.row.setAttribute('aria-rowindex', this.prevAriaRowIndex);
            this.prevAriaRowIndex = undefined;
        }
        if (this.keyPress !== 'enter') {
            this.parent.trigger(cellEdit, args, function (celleditArgs) {
                if (!celleditArgs.cancel && _this.parent.editSettings.mode === 'Cell') {
                    _this.enableToolbarItems('edit');
                }
                else if (celleditArgs.cancel && _this.parent.editSettings.mode === 'Cell') {
                    _this.isOnBatch = false;
                    _this.updateGridEditMode('Normal');
                }
                if (!isNullOrUndefined(prom)) {
                    prom.resolve(celleditArgs);
                }
            });
        }
        if (this.doubleClickTarget && (this.doubleClickTarget.classList.contains('e-treegridexpand') ||
            this.doubleClickTarget.classList.contains('e-treegridcollapse') || this.doubleClickTarget.classList.contains('e-summarycell'))) {
            args.cancel = true;
            this.doubleClickTarget = null;
            return;
        }
        if (this.parent.editSettings.mode === 'Cell') {
            if (this.keyPress === 'tab' || this.keyPress === 'shiftTab') {
                this.keyPress = null;
            }
            else if (this.keyPress === 'enter') {
                args.cancel = true;
                this.keyPress = null;
                setValue('isEditCollapse', false, this.parent);
            }
            if (!args.columnObject.allowEditing) {
                args.cancel = true;
            }
        }
        if (this.parent.enableVirtualization) {
            this.parent.grid.contentModule['editedRowIndex'] = this.parent.grid.editModule.editModule['index'];
        }
        // if (this.isAdd && this.parent.editSettings.mode === 'Batch' && !args.cell.parentElement.classList.contains('e-insertedrow')) {
        //   this.isAdd = false;
        // }
    };
    Edit.prototype.enableToolbarItems = function (request) {
        if (!isNullOrUndefined(this.parent.grid.toolbarModule)) {
            var toolbarID = this.parent.element.id + '_gridcontrol_';
            this.parent.grid.toolbarModule.enableItems([toolbarID + 'add', toolbarID + 'edit', toolbarID + 'delete'], request === 'save');
            this.parent.grid.toolbarModule.enableItems([toolbarID + 'update', toolbarID + 'cancel'], request === 'edit');
        }
    };
    Edit.prototype.batchCancel = function () {
        if (this.parent.editSettings.mode === 'Cell') {
            var cellDetails = getValue('editModule.cellDetails', this.parent.grid.editModule);
            if (!isNullOrUndefined(this.editedRowIndex)) {
                cellDetails.rowIndex = this.editedRowIndex;
            }
            var treeCell = this.parent.getCellFromIndex(cellDetails.rowIndex, this.parent.treeColumnIndex);
            this.parent.renderModule.cellRender({
                data: cellDetails.rowData,
                cell: treeCell,
                column: this.parent.grid.getColumns()[this.parent.treeColumnIndex]
            });
            this.updateGridEditMode('Normal');
            this.isOnBatch = false;
        }
        if (this.parent.editSettings.mode === 'Batch') {
            this.parent.notify('batchCancelAction', {});
        }
    };
    Edit.prototype.customCellSave = function (args) {
        if (isCountRequired(this.parent) && this.parent.editSettings.mode === 'Cell' && args.action === 'edit') {
            this.updateCell(args, args.rowIndex);
            this.afterCellSave(args, args.row);
        }
    };
    Edit.prototype.cellSave = function (args) {
        var _this = this;
        if (this.parent.editSettings.mode === 'Cell' && this.parent.element.querySelector('form')) {
            args.cancel = true;
            var editModule = 'editModule';
            setValue('isEditCollapse', true, this.parent);
            args.rowData[args.columnName] = args.value;
            var row_1;
            if (isNullOrUndefined(args.cell)) {
                row_1 = this.parent.grid.editModule["" + editModule].form.parentElement.parentNode;
            }
            else {
                row_1 = args.cell.parentNode;
            }
            var rowIndex_1;
            var primaryKeys_1 = this.parent.getPrimaryKeyFieldNames();
            if (isNullOrUndefined(row_1)) {
                this.parent.grid.getCurrentViewRecords().filter(function (e, i) {
                    if (e[primaryKeys_1[0]] === args.rowData[primaryKeys_1[0]]) {
                        rowIndex_1 = i;
                        return;
                    }
                });
            }
            else {
                var freeze = (this.parent.getFrozenLeftColumnsCount() > 0 ||
                    this.parent.getFrozenRightColumnsCount() > 0) ? true : false;
                if (freeze) {
                    if (this.parent.getRows().indexOf(row_1) !== -1) {
                        rowIndex_1 = this.parent.getRows().indexOf(row_1);
                    }
                    else {
                        rowIndex_1 = this.parent.getRows().indexOf(row_1);
                    }
                }
                else {
                    rowIndex_1 = (this.parent.getRows().indexOf(row_1) === -1 && (this.parent.getFrozenColumns() > 0)) ?
                        this.parent.grid.getRows().indexOf(row_1) : this.parent.getRows().indexOf(row_1);
                }
            }
            var arg = {};
            extend$1(arg, args);
            arg.cancel = false;
            arg.type = 'save';
            row_1 = this.parent.grid.getRows()[row_1.rowIndex];
            this.parent.trigger(actionBegin, arg);
            if (!arg.cancel) {
                if ((row_1.rowIndex === this.parent.getCurrentViewRecords().length - 1) && this.keyPress === 'tab') {
                    this.isTabLastRow = true;
                }
                if (!isRemoteData(this.parent) &&
                    !(this.parent.dataSource instanceof DataManager && this.parent.dataSource.adaptor instanceof RemoteSaveAdaptor)) {
                    if (isCountRequired(this.parent)) {
                        var eventPromise = 'eventPromise';
                        var editArgs = { requestType: 'save', data: args.rowData, action: 'edit', row: row_1,
                            rowIndex: rowIndex_1, rowData: args.rowData, columnName: args.columnName,
                            filterChoiceCount: null, excelSearchOperator: null };
                        this.parent.grid.getDataModule()["" + eventPromise](editArgs, this.parent.grid.query);
                    }
                    else {
                        this.updateCell(args, rowIndex_1);
                        setValue('isEdit', false, this.parent.grid);
                        this.afterCellSave(args, row_1);
                    }
                }
                else if (isRemoteData(this.parent) ||
                    (this.parent.dataSource instanceof DataManager && this.parent.dataSource.adaptor instanceof RemoteSaveAdaptor)) {
                    var query = this.parent.grid.query;
                    if (this.parent['isGantt'] && this.parent.loadChildOnDemand) {
                        this.updateCell(args, rowIndex_1);
                        setValue('isEdit', false, this.parent.grid);
                        this.afterCellSave(args, row_1);
                    }
                    else {
                        var crud = null;
                        crud = this.parent.grid.dataSource.update(primaryKeys_1[0], args.rowData, query.fromTable, query, args.previousValue);
                        crud.then(function (e) {
                            if (!isNullOrUndefined(e)) {
                                args.rowData[args.columnName] = e[args.columnName];
                            }
                            _this.updateCell(args, rowIndex_1);
                            setValue('isEdit', false, _this.parent.grid);
                            _this.afterCellSave(args, row_1);
                        });
                    }
                }
            }
            else {
                this.parent.grid.isEdit = true;
            }
        }
        if (this.parent.enableVirtualization) {
            this.parent.grid.contentModule['virtualData'] = {};
        }
    };
    Edit.prototype.afterCellSave = function (args, row) {
        if (this.parent.grid.aggregateModule) {
            this.parent.grid.aggregateModule.refresh(args.rowData);
        }
        this.parent.grid.editModule.destroyWidgets([this.parent.grid.getColumnByField(args.columnName)]);
        this.parent.grid.editModule.formObj.destroy();
        if (this.keyPress !== 'tab' && this.keyPress !== 'shiftTab') {
            this.updateGridEditMode('Normal');
            this.isOnBatch = false;
        }
        this.enableToolbarItems('save');
        removeClass([row], ['e-editedrow', 'e-batchrow']);
        removeClass(row.querySelectorAll('.e-rowcell'), ['e-editedbatchcell', 'e-updatedtd']);
        if (this.parent['isCellSaveFocus'] !== false) {
            this.parent.grid.focusModule.restoreFocus();
        }
        editAction({ value: args.rowData, action: 'edit' }, this.parent, this.isSelfReference, this.addRowIndex, this.selectedIndex, args.columnName);
        if ((row.rowIndex === this.parent.getCurrentViewRecords().length - 1) && this.keyPress === 'enter') {
            this.keyPress = null;
        }
        var saveArgs = {
            type: 'save', column: this.parent.getColumnByField(args.columnName), data: args.rowData,
            previousData: args.previousValue, row: row, target: args.cell
        };
        if (this.parent.aggregates.map(function (ag) { return ag.showChildSummary === true; }).length) {
            this.parent.grid.refresh();
        }
        this.parent.trigger(actionComplete, saveArgs);
    };
    Edit.prototype.lastCellTab = function () {
        if (!this.parent.grid.isEdit && this.isOnBatch && this.keyPress === 'tab' && this.parent.editSettings.mode === 'Cell') {
            if (!this.parent.editSettings.allowNextRowEdit) {
                this.updateGridEditMode('Normal');
                this.isOnBatch = false;
                this.keyPress = null;
            }
            else {
                this.enableToolbarItems('edit');
            }
        }
    };
    Edit.prototype.updateCell = function (args, rowIndex) {
        this.parent.grid.editModule.updateCell(rowIndex, args.columnName, args.rowData[args.columnName]);
        this.parent.grid.getRowsObject()[parseInt(rowIndex.toString(), 10)].data = args.rowData;
    };
    Edit.prototype.crudAction = function (details, columnName) {
        editAction(details, this.parent, this.isSelfReference, this.addRowIndex, this.selectedIndex, columnName, this.addRowRecord);
        this.parent.parentData = [];
        var data = this.parent.grid.dataSource instanceof DataManager ?
            this.parent.grid.dataSource.dataSource.json : this.parent.grid.dataSource;
        for (var i = 0; i < data.length; i++) {
            data[parseInt(i.toString(), 10)].index = i;
            var key = this.parent.grid.getPrimaryKeyFieldNames()[0];
            if (details.value["" + key] === data[parseInt(i.toString(), 10)]["" + key]) {
                if (details.action === 'add') {
                    data[parseInt(i.toString(), 10)].level = this.internalProperties.level;
                    data[parseInt(i.toString(), 10)].taskData = this.internalProperties.taskData;
                    data[parseInt(i.toString(), 10)].uniqueID = this.internalProperties.uniqueID;
                    if (!isNullOrUndefined(this.internalProperties.parentItem)) {
                        data[parseInt(i.toString(), 10)].parentItem = this.internalProperties.parentItem;
                        data[parseInt(i.toString(), 10)].parentUniqueID = this.internalProperties.parentUniqueID;
                    }
                    data[parseInt(i.toString(), 10)].childRecords = this.internalProperties.childRecords;
                }
            }
            setValue('uniqueIDCollection.' + data[parseInt(i.toString(), 10)].uniqueID + '.index', i, this.parent);
            var adaptor = this.parent.dataSource.adaptor;
            if ((isRemoteData(this.parent) || adaptor instanceof RemoteSaveAdaptor)) {
                setValue('uniqueIDCollection.' + data[parseInt(i.toString(), 10)].uniqueID, data[parseInt(i.toString(), 10)], this.parent);
            }
            if (!data[parseInt(i.toString(), 10)].level) {
                this.parent.parentData.push(data[parseInt(i.toString(), 10)]);
            }
        }
        if (!this.parent.enableInfiniteScrolling) {
            if (details.action === 'add' && this.previousNewRowPosition != null) {
                this.parent.setProperties({ editSettings: { newRowPosition: this.previousNewRowPosition } }, true);
                this.previousNewRowPosition = null;
            }
        }
    };
    Edit.prototype.updateIndex = function (data, rows, records) {
        for (var j = 0; j < this.parent.getDataRows().length; j++) {
            var data1 = records[parseInt(j.toString(), 10)];
            if (!isNullOrUndefined(data1)) {
                var index = getValue('uniqueIDCollection.' + data1.uniqueID + '.index', this.parent);
                data1.index = index;
                if (!isNullOrUndefined(data1.parentItem)) {
                    var parentIndex = getValue('uniqueIDCollection.' + data1.parentItem.uniqueID + '.index', this.parent);
                    data1.parentItem.index = parentIndex;
                }
            }
        }
        var count = -1;
        var treeColIndex = this.parent.treeColumnIndex;
        if (this.parent.getFrozenColumns() > 0) {
            var cells = rows[0].querySelectorAll('.e-rowcell');
            for (var l = 0; l < cells.length; l++) {
                if (cells[parseInt(l.toString(), 10)].classList.contains('e-gridrowindex0level0')) {
                    treeColIndex = l;
                    break;
                }
            }
        }
        for (var k = 0; k < this.parent.getRows().length; k++) {
            if (!rows[parseInt(k.toString(), 10)].classList.contains('e-detailrow')) {
                count++;
            }
            var data2 = records[parseInt(count.toString(), 10)];
            if (!isNullOrUndefined(data2)) {
                var index = data2.index;
                var level = data2.level;
                var row = rows[parseInt(k.toString(), 10)];
                if (!isNullOrUndefined(data2.parentItem)) {
                    index = getValue('uniqueIDCollection.' + data2.parentItem.uniqueID + '.index', this.parent);
                }
                var treecell = row.cells[parseInt(treeColIndex.toString(), 10)];
                if (!isNullOrUndefined(treecell)) {
                    for (var l = 0; l < treecell.classList.length; l++) {
                        var value = treecell.classList[parseInt(l.toString(), 10)];
                        var remove = /e-gridrowindex/i;
                        var removed = /e-griddetailrowindex/i;
                        var result = value.match(remove);
                        var results = value.match(removed);
                        if (result != null) {
                            removeClass([treecell], value);
                        }
                        if (results != null) {
                            removeClass([treecell], value);
                        }
                    }
                    if (!rows[parseInt(k.toString(), 10)].classList.contains('e-detailrow')) {
                        addClass([treecell], 'e-gridrowindex' + index + 'level' + level);
                    }
                    else {
                        addClass([treecell], 'e-griddetailrowindex' + index + 'level' + level);
                    }
                }
            }
        }
    };
    Edit.prototype.beginAdd = function () {
        var position;
        var index = this.addRowIndex;
        var records = this.parent.grid.getCurrentViewRecords();
        if (this.parent.editSettings.mode === 'Batch') {
            index = this.batchEditModule.getAddRowIndex();
            this.selectedIndex = this.batchEditModule.getSelectedIndex();
            if (this.parent.getBatchChanges()[this.addedRecords].length > 1
                || this.parent.getBatchChanges()[this.deletedRecords].length) {
                records = this.batchEditModule.getBatchRecords();
            }
        }
        var rows = this.parent.grid.getDataRows();
        var firstAriaIndex = rows.length ? +rows[0].getAttribute('aria-rowindex') - 1 : 0;
        var lastAriaIndex = rows.length ? +rows[rows.length - 1].getAttribute('aria-rowindex') - 1 : 0;
        var withinRange = this.selectedIndex >= firstAriaIndex && this.selectedIndex <= lastAriaIndex;
        var isVirtualization = this.parent.enableVirtualization && this.addRowIndex > -1 && this.prevAriaRowIndex !== '-1';
        if (this.parent.editSettings.mode !== 'Dialog') {
            if (this.parent.editSettings.newRowPosition === 'Above') {
                position = 'before';
            }
            else if ((this.parent.editSettings.newRowPosition === 'Below' || this.parent.editSettings.newRowPosition === 'Child')
                && (this.selectedIndex > -1 || isVirtualization) && withinRange) {
                position = 'after';
                if (!isNullOrUndefined(records[parseInt(index.toString(), 10)]) &&
                    records[parseInt(index.toString(), 10)].expanded) {
                    if (this.parent.editSettings.mode === 'Batch' && (this.parent.getBatchChanges()[this.addedRecords].length > 1
                        || this.parent.getBatchChanges()[this.deletedRecords].length)) {
                        index += findChildrenRecords(records[parseInt(index.toString(), 10)]).length;
                        if (this.parent.editSettings.newRowPosition !== 'Child') {
                            var batchChildCount = this.batchEditModule.getBatchChildCount();
                            index = index + batchChildCount;
                        }
                    }
                    else if (!this.parent.enableVirtualization) {
                        index += findChildrenRecords(records[parseInt(index.toString(), 10)]).length;
                    }
                }
            }
            if ((this.selectedIndex > -1 || isVirtualization) && withinRange
                && (index || (this.parent.editSettings.newRowPosition === 'Child'
                    || this.parent.editSettings.newRowPosition === 'Below'))) {
                if (index >= rows.length - 1) {
                    index = rows.length - 2;
                }
                var r = 'rows';
                var newRowObject = this.parent.grid.contentModule["" + r][0];
                var focussedElement = document.activeElement;
                rows[index + 1]["" + position](rows[0]);
                setValue('batchIndex', index + 1, this.batchEditModule);
                var rowObjectIndex = this.parent.editSettings.newRowPosition === 'Above' ? index : index + 1;
                if (this.parent.editSettings.mode === 'Batch') {
                    this.parent.grid.contentModule["" + r].splice(0, 1);
                    this.parent.grid.contentModule["" + r].splice(rowObjectIndex, 0, newRowObject);
                }
                if (this.parent.editSettings.mode === 'Row' || this.parent.editSettings.mode === 'Cell') {
                    var errors = this.parent.grid.getContentTable().querySelectorAll('.e-griderror');
                    for (var i = 0; i < errors.length; i++) {
                        errors[parseInt(i.toString(), 10)].remove();
                    }
                    setValue('errorRules', [], this.parent.grid.editModule.formObj);
                }
                if (isVirtualization) {
                    this.prevAriaRowIndex = '-1';
                }
                if (!this.parent.enableVirtualization || this.parent.enableVirtualization) {
                    this.isScrollByFocus = true;
                    focussedElement.focus();
                }
                if (this.parent.enableVirtualization && !Object.keys(this.parent.grid.contentModule['emptyRowData']).length) {
                    this.parent.grid.contentModule['createEmptyRowdata']();
                }
            }
        }
        if (this.parent.editSettings.mode === 'Batch' && !isNullOrUndefined(this.addRowIndex) && this.addRowIndex !== -1 && this['isAddedRowByMethod'] && !this.isAddedRowByContextMenu) {
            index = this.batchEditModule.getAddRowIndex();
            this.selectedIndex = this.batchEditModule.getSelectedIndex();
            var batchAddedRecords = this.parent.getBatchChanges()['addedRecords'];
            var newlyAddedRecord = void 0;
            if (batchAddedRecords.length) {
                for (var i = 0; i < batchAddedRecords.length; i++) {
                    if (isNullOrUndefined(batchAddedRecords[parseInt(i.toString(), 10)].uniqueID)) {
                        newlyAddedRecord = batchAddedRecords[parseInt(i.toString(), 10)];
                    }
                }
            }
            var args = {
                action: 'add',
                data: newlyAddedRecord,
                index: index,
                seletedRow: 0
            };
            this.beginAddEdit(args);
            this.batchEditModule['batchAddRowRecord'].push(this.batchEditModule['addRowRecord']);
            this.batchEditModule['batchAddedRecords'].push(args['data']);
        }
    };
    // private beforeDataBound(args: BeforeDataBoundArgs): void {
    //   if (this.parent.grid.isEdit && this.parent.dataSource instanceof DataManager &&
    //         this.parent.dataSource.adaptor instanceof RemoteSaveAdaptor) {
    //     let action: string = getValue('action', args);
    //     let data: Object = getValue('data', args);
    //     if (action === 'edit' && !isNullOrUndefined(this.editedData)) {
    //       data = extend(this.editedData, data);
    //       this.editedData = null;
    //     }
    //     if (!isNullOrUndefined(this.addedData)) {
    //       let addedData: Object = args.result[args.result.length - 1];
    //       addedData = extend(this.addedData, addedData);
    //       this.addedData = null;
    //       args.result.splice(this.addedIndex, 0, addedData);
    //       args.result.splice(args.result.length, 1);
    //     }
    //   }
    // }
    Edit.prototype.beginEdit = function (args) {
        if (args.requestType === 'refresh' && this.isOnBatch) {
            args.cancel = true;
            return;
        }
        if (this.parent.editSettings.mode === 'Cell' && args.requestType === 'beginEdit') {
            args.cancel = true;
            return;
        }
        if (this.doubleClickTarget && args.requestType !== 'delete' && (this.doubleClickTarget.classList.contains('e-treegridexpand') ||
            this.doubleClickTarget.classList.contains('e-treegridcollapse') || this.doubleClickTarget.classList.contains('e-frame'))) {
            args.cancel = true;
            this.doubleClickTarget = null;
            return;
        }
        if (args.requestType === 'delete') {
            var data_1 = args.data;
            if (isNullOrUndefined(args.data[0].uniqueID)) {
                var primaryKeys_2 = this.parent.getPrimaryKeyFieldNames();
                var _loop_1 = function (i) {
                    this_1.parent.flatData.filter(function (e) {
                        if (e["" + primaryKeys_2[0]] === args.data[parseInt(i.toString(), 10)][primaryKeys_2[0]]) {
                            data_1[parseInt(i.toString(), 10)] = e;
                        }
                    });
                };
                var this_1 = this;
                for (var i = 0; i < data_1.length; i++) {
                    _loop_1(i);
                }
            }
            for (var i = 0; i < data_1.length; i++) {
                this.deleteUniqueID(data_1[parseInt(i.toString(), 10)].uniqueID);
                var childs = findChildrenRecords(data_1[parseInt(i.toString(), 10)]);
                for (var c = 0; c < childs.length; c++) {
                    this.deleteUniqueID(childs[parseInt(c.toString(), 10)].uniqueID);
                }
                args.data = args.data.concat(childs);
            }
        }
        if (args.requestType === 'add' || (this.isAddedRowByMethod && (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling))) {
            if (!(this.parent.grid.selectedRowIndex === -1 && this.isAddedRowByMethod)
                && args.index === this.parent.grid.selectedRowIndex || args.index === 0) {
                this.selectedIndex = this.parent.grid.selectedRowIndex;
            }
            if (this.parent.enableVirtualization) {
                var selector = '.e-row[aria-rowindex="' + (this.selectedIndex + 1) + '"]';
                var row = void 0;
                if (this.selectedIndex > -1 && this.parent.editSettings.newRowPosition !== 'Top' &&
                    this.parent.editSettings.newRowPosition !== 'Bottom') {
                    this.prevAriaRowIndex = this.selectedIndex.toString();
                    row = this.parent.getContent().querySelector(selector);
                    this.addRowIndex = row ? row.rowIndex : 0;
                }
                else {
                    if (this.prevAriaRowIndex && this.prevAriaRowIndex !== '-1') {
                        selector = '.e-row[aria-rowindex="' + (this.prevAriaRowIndex + 1) + '"]';
                        row = this.parent.getContent().querySelector(selector);
                        this.addRowIndex = row ? row.rowIndex : 0;
                    }
                    else {
                        this.addRowIndex = 0;
                    }
                }
            }
            else {
                if (this.isAddedRowByMethod && (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling)) {
                    if (args.index !== 0) {
                        this.addRowIndex = args.index;
                    }
                    else {
                        this.addRowIndex = this.parent.grid.selectedRowIndex;
                    }
                }
                else {
                    this.addRowIndex = this.parent.grid.selectedRowIndex > -1 ? this.parent.grid.selectedRowIndex : 0;
                }
            }
            var selectedRecords = this.parent.getSelectedRecords()[0];
            if ((this.isAddedRowByMethod || (this.isAddedRowByContextMenu && this.parent.grid.selectedRowIndex !== -1)) &&
                (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling)) {
                this.addRowRecord = this.parent.flatData[this.parent.grid.selectedRowIndex];
                if (this.parent.enableVirtualization && this.isAddedRowByContextMenu) {
                    this.addRowRecord = this.parent.getCurrentViewRecords()[this.addRowIndex];
                }
            }
            else if (!isNullOrUndefined(selectedRecords)) {
                this.addRowRecord = selectedRecords;
            }
        }
        if (this.isAddedRowByMethod && args.index !== 0) {
            this.addRowRecord = this.parent.flatData[args.index];
            this.addRowIndex = args.index;
        }
        if (this.parent.editSettings.newRowPosition === 'Child' &&
            !isNullOrUndefined(this.parent.getSelectedRecords()[0])) {
            this.addRowRecord = this.parent.getSelectedRecords()[0];
        }
        if (isNullOrUndefined(this.addRowRecord) && this.parent.getCurrentViewRecords().length > this.addRowIndex &&
            args.requestType === 'save' && this.parent.getSelectedRecords().length !== 0) {
            this.addRowRecord = this.parent.getCurrentViewRecords()[this.addRowIndex];
        }
        this.isAddedRowByMethod = false;
        args = this.beginAddEdit(args);
        // if (args.requestType === 'save' &&
        //    ((this.parent.dataSource instanceof DataManager && this.parent.dataSource.adaptor instanceof RemoteSaveAdaptor))) {
        //      if (args.action === 'edit') {
        //           this.editedData = args.data;
        //      } else if (args.action === 'add') {
        //           this.addedData = value;
        //      }
        // }
    };
    Edit.prototype.savePreviousRowPosition = function () {
        if (this.previousNewRowPosition === null) {
            this.previousNewRowPosition = this.parent.editSettings.newRowPosition;
        }
    };
    Edit.prototype.beginAddEdit = function (args) {
        var value = args.data;
        if (args.action === 'add') {
            var key = this.parent.grid.getPrimaryKeyFieldNames()[0];
            var position = null;
            value.taskData = isNullOrUndefined(value.taskData) ? extend$1({}, args.data) : value.taskData;
            var currentData = void 0;
            if (this.parent.enableVirtualization && args.index !== 0) {
                currentData = this.parent.flatData;
            }
            else if (this.parent.editSettings.mode === 'Batch' && this['isAddedRowByMethod'] && !isNullOrUndefined(this.addRowIndex)) {
                currentData = this.batchEditModule['batchRecords'];
            }
            else {
                currentData = this.parent.grid.getCurrentViewRecords();
            }
            if (this.parent.enableVirtualization && args.index !== 0) {
                this.addRowIndex = this.parent.flatData.indexOf(this.addRowRecord);
                this.selectedIndex = this.addRowIndex;
            }
            var index = this.addRowIndex;
            value.uniqueID = getUid(this.parent.element.id + '_data_');
            setValue('uniqueIDCollection.' + value.uniqueID, value, this.parent);
            var level = 0;
            var idMapping = void 0;
            var parentUniqueID = void 0;
            var parentItem = void 0;
            var parentIdMapping = void 0;
            var isVirtualization = this.parent.enableVirtualization && this.addRowIndex > -1 && this.prevAriaRowIndex !== '-1';
            var rows = this.parent.getRows();
            var firstAriaIndex = rows.length ? currentData.indexOf(currentData[0]) : 0;
            var lastAriaIndex = rows.length ? +rows[rows.length - 1].getAttribute('aria-rowindex') - 1 : 0;
            var withinRange = this.parent.enableVirtualization && args.index !== 0 ? true :
                this.selectedIndex >= firstAriaIndex && this.selectedIndex <= lastAriaIndex;
            if (currentData.length) {
                idMapping = currentData[this.addRowIndex][this.parent.idMapping];
                parentIdMapping = currentData[this.addRowIndex][this.parent.parentIdMapping];
                if (currentData[this.addRowIndex].parentItem) {
                    parentUniqueID = currentData[this.addRowIndex].parentItem.uniqueID;
                }
                parentItem = currentData[this.addRowIndex].parentItem;
            }
            if (this.parent.editSettings.newRowPosition !== 'Top' && currentData.length) {
                level = currentData[this.addRowIndex].level;
                if (this.parent.editSettings.newRowPosition === 'Above') {
                    position = 'before';
                    index = currentData[this.addRowIndex].index;
                }
                else if (this.parent.editSettings.newRowPosition === 'Below') {
                    position = 'after';
                    var childRecordCount = findChildrenRecords(currentData[this.addRowIndex]).length;
                    var currentDataIndex = currentData[this.addRowIndex].index;
                    index = (childRecordCount > 0) ? (currentDataIndex + childRecordCount) : (currentDataIndex);
                }
                else if (this.parent.editSettings.newRowPosition === 'Child') {
                    position = 'after';
                    if ((this.selectedIndex > -1 || isVirtualization) && withinRange) {
                        value.parentItem = extend$1({}, currentData[this.addRowIndex]);
                        value.parentUniqueID = value.parentItem.uniqueID;
                        delete value.parentItem.childRecords;
                        delete value.parentItem[this.parent.childMapping];
                    }
                    var childRecordCount1 = findChildrenRecords(currentData[this.addRowIndex]).length;
                    var currentDataIndex1 = currentData[this.addRowIndex].index;
                    if (this.selectedIndex >= 0) {
                        value.level = level + 1;
                    }
                    index = (childRecordCount1 > 0) ? (currentDataIndex1 + childRecordCount1) : (currentDataIndex1);
                    if (this.isSelfReference) {
                        if (!this.parent.isLocalData && this.parent.editModule.selectedIndex === -1) {
                            value.taskData[this.parent.parentIdMapping] = value[this.parent.parentIdMapping] = null;
                        }
                        else {
                            value.taskData[this.parent.parentIdMapping] = value[this.parent.parentIdMapping] = idMapping;
                        }
                        if (!isNullOrUndefined(value.parentItem)) {
                            updateParentRow(key, value.parentItem, 'add', this.parent, this.isSelfReference, value);
                        }
                    }
                }
                if (this.parent.editSettings.newRowPosition === 'Above' || this.parent.editSettings.newRowPosition === 'Below') {
                    if ((this.selectedIndex > -1 || isVirtualization) && level && withinRange) {
                        value.parentUniqueID = parentUniqueID;
                        value.parentItem = extend$1({}, parentItem);
                        delete value.parentItem.childRecords;
                        delete value.parentItem[this.parent.childMapping];
                    }
                    value.level = level;
                    if (this.isSelfReference) {
                        value.taskData[this.parent.parentIdMapping] = value[this.parent.parentIdMapping] = parentIdMapping;
                        if (!isNullOrUndefined(value.parentItem)) {
                            updateParentRow(key, value.parentItem, 'add', this.parent, this.isSelfReference, value);
                        }
                    }
                }
                if (position != null && (this.selectedIndex > -1 || isVirtualization) && withinRange) {
                    args.index = position === 'before' ? index : index + 1;
                }
                if (this.parent.editSettings.newRowPosition === 'Bottom') {
                    level = 0;
                    var dataSource = (this.parent.grid.dataSource instanceof DataManager ?
                        this.parent.grid.dataSource.dataSource.json : this.parent.grid.dataSource);
                    args.index = dataSource.length;
                }
            }
            if (isNullOrUndefined(value.level)) {
                value.level = level;
            }
            value.hasChildRecords = false;
            value.childRecords = [];
            value.index = 0;
        }
        if (args.action === 'add') {
            this.internalProperties = { level: value.level, parentItem: value.parentItem, uniqueID: value.uniqueID,
                taskData: value.taskData, parentUniqueID: isNullOrUndefined(value.parentItem) ? undefined : value.parentItem.uniqueID,
                childRecords: value.childRecords };
        }
        if (args.requestType === 'delete') {
            var deletedValues = args.data;
            for (var i = 0; i < deletedValues.length; i++) {
                if (deletedValues[parseInt(i.toString(), 10)].parentItem) {
                    var parentItem = getParentData(this.parent, deletedValues[parseInt(i.toString(), 10)].parentItem.uniqueID);
                    if (!isNullOrUndefined(parentItem) && parentItem.hasChildRecords) {
                        var childIndex = parentItem.childRecords.indexOf(deletedValues[parseInt(i.toString(), 10)]);
                        parentItem.childRecords.splice(childIndex, 1);
                    }
                }
            }
        }
        return args;
    };
    /**
     * If the data,index and position given, Adds the record to treegrid rows otherwise it will create edit form.
     *
     * @returns {void}
     */
    Edit.prototype.addRecord = function (data, index, position) {
        if (this.parent.editSettings.newRowPosition === this.previousNewRowPosition || this.previousNewRowPosition === null) {
            this.previousNewRowPosition = this.parent.editSettings.newRowPosition;
        }
        if (!this.isSelfReference && !isNullOrUndefined(data) && Object.hasOwnProperty.call(data, this.parent.childMapping)) {
            var addRecords = [];
            var previousEditMode = this.parent.editSettings.mode;
            var previousGridEditMode = this.parent.grid.editSettings.mode;
            addRecords.push(data);
            this.parent.setProperties({ editSettings: { mode: 'Batch' } }, true);
            this.parent.grid.setProperties({ editSettings: { mode: 'Batch' } }, true);
            if (!isNullOrUndefined(position)) {
                this.parent.setProperties({ editSettings: { newRowPosition: position } }, true);
            }
            var updatedRecords = { addedRecords: addRecords, changedRecords: [], deletedRecords: [] };
            this.parent.notify(batchSave, { updatedRecords: updatedRecords, index: index });
            this.parent.setProperties({ editSettings: { mode: previousEditMode } }, true);
            this.parent.grid.setProperties({ editSettings: { mode: previousGridEditMode } }, true);
            this.parent.refresh();
        }
        else {
            if (data) {
                if (index > -1) {
                    this.selectedIndex = index;
                    this.addRowIndex = index;
                }
                else {
                    this.selectedIndex = this.parent.selectedRowIndex;
                    this.addRowIndex = this.parent.selectedRowIndex;
                }
                if (position) {
                    this.parent.setProperties({ editSettings: { newRowPosition: position } }, true);
                }
                this.parent.grid.editModule.addRecord(data, index);
            }
            else {
                this.parent.grid.editModule.addRecord(data, index);
            }
        }
    };
    /**
     * Checks the status of validation at the time of editing. If validation is passed, it returns true.
     *
     * @returns {boolean} Returns form validation results
     */
    Edit.prototype.editFormValidate = function () {
        return this.parent.grid.editModule.editFormValidate();
    };
    /**
     * @hidden
     * @returns {void}
     */
    Edit.prototype.destroyForm = function () {
        this.parent.grid.editModule.destroyForm();
    };
    Edit.prototype.contentready = function (e) {
        if (!isNullOrUndefined(e.args.requestType)
            && (e.args.requestType.toString() === 'delete' || e.args.requestType.toString() === 'save'
                || (this.parent.editSettings.mode === 'Batch' && e.args.requestType.toString() === 'batchsave'))) {
            this.updateIndex(this.parent.grid.dataSource, this.parent.getRows(), this.parent.getCurrentViewRecords());
            if (this.parent.frozenRows || this.parent.getFrozenColumns() || this.parent.frozenColumns) {
                if (this.parent.grid.dataSource.length === this.parent.getDataRows().length) {
                    this.updateIndex(this.parent.grid.dataSource, this.parent.getDataRows(), this.parent.getCurrentViewRecords());
                }
            }
        }
    };
    /**
     * If the row index and field is given, edits the particular cell in a row.
     *
     * @returns {void}
     */
    Edit.prototype.editCell = function (rowIndex, field) {
        if (this.parent.editSettings.mode === 'Cell' || this.parent.editSettings.mode === 'Batch') {
            if (this.parent.editSettings.mode !== 'Batch') {
                this.isOnBatch = true;
                this.updateGridEditMode('Batch');
            }
            this.parent.grid.editModule.editCell(rowIndex, field);
        }
    };
    /**
     * Cancels edited state.
     *
     * @returns {void}
     */
    Edit.prototype.closeEdit = function () {
        if (this.parent.enableVirtualization && this.parent.grid.editSettings.mode === 'Batch' && this.parent.grid.pageSettings.currentPage > 1) {
            this.editedRowIndex = this.parent.grid.editModule.editModule['cellDetails'].rowIndex;
            this.parent.grid.editModule.editModule['cellDetails'].rowIndex = parseInt(this.parent.getRows()[this.parent.grid.editModule.editModule['cellDetails'].rowIndex].getAttribute('aria-rowIndex'), 10) - 1;
        }
        this.parent.grid.editModule.closeEdit();
    };
    return Edit;
}());

/**
 * Command Column Module for TreeGrid
 *
 * @hidden
 */
var CommandColumn = /** @class */ (function () {
    function CommandColumn(parent) {
        Grid.Inject(CommandColumn$1);
        this.parent = parent;
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns CommandColumn module name
     */
    CommandColumn.prototype.getModuleName = function () {
        return 'commandColumn';
    };
    /**
     * Destroys the ContextMenu.
     *
     * @function destroy
     * @returns {void}
     */
    CommandColumn.prototype.destroy = function () {
        //this.removeEventListener();
    };
    return CommandColumn;
}());

/**
 * TreeGrid Detail Row module
 *
 * @hidden
 */
var DetailRow = /** @class */ (function () {
    function DetailRow(parent) {
        Grid.Inject(DetailRow$1);
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * @hidden
     */
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns DetailRow module name
     */
    DetailRow.prototype.getModuleName = function () {
        return 'detailRow';
    };
    DetailRow.prototype.addEventListener = function () {
        this.parent.on('dataBoundArg', this.dataBoundArg, this);
        this.parent.on('detaildataBound', this.detaildataBound, this);
        this.parent.grid.on('detail-indentcell-info', this.setIndentVisibility, this);
        this.parent.on('childRowExpand', this.childRowExpand, this);
        this.parent.on('rowExpandCollapse', this.rowExpandCollapse, this);
        this.parent.on('actioncomplete', this.actioncomplete, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    DetailRow.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('dataBoundArg', this.dataBoundArg);
        this.parent.off('detaildataBound', this.detaildataBound);
        this.parent.off('childRowExpand', this.childRowExpand);
        this.parent.off('rowExpandCollapse', this.rowExpandCollapse);
        this.parent.off('actioncomplete', this.actioncomplete);
        this.parent.grid.off('detail-indentcell-info', this.setIndentVisibility);
    };
    DetailRow.prototype.setIndentVisibility = function (args) {
        var visible = 'visible';
        args["" + visible] = false;
    };
    DetailRow.prototype.dataBoundArg = function () {
        var detailele = this.parent.getRows().filter(function (e) {
            return !e.classList.contains('e-detailrow');
        });
        for (var i = 0; i < detailele.length; i++) {
            var elements = detailele[parseInt(i.toString(), 10)].getElementsByClassName('e-detailrowcollapse');
            var detailData = this.parent.grid.getRowObjectFromUID(detailele[parseInt(i.toString(), 10)].getAttribute('data-Uid'));
            var parentItem = getObject('parentItem', this.parent.grid.getCurrentViewRecords()[parseInt(i.toString(), 10)]);
            if (isNullOrUndefined(parentItem) || !isNullOrUndefined(parentItem) &&
                getExpandStatus(this.parent, detailData.data, this.parent.grid.getCurrentViewRecords())) {
                this.parent.grid.detailRowModule.expand(elements[0]);
            }
        }
    };
    DetailRow.prototype.childRowExpand = function (args) {
        var detailRowElement = args.row.getElementsByClassName('e-detailrowcollapse');
        if (!isNullOrUndefined(detailRowElement[0])) {
            this.parent.grid.detailRowModule.expand(detailRowElement[0]);
        }
    };
    DetailRow.prototype.rowExpandCollapse = function (args) {
        if (isRemoteData(this.parent)) {
            return;
        }
        for (var i = 0; i < args.detailrows.length; i++) {
            this.parent['toggleRowVisibility'](args.detailrows[parseInt(i.toString(), 10)], args.action);
        }
    };
    DetailRow.prototype.detaildataBound = function (args) {
        var data = args.data;
        var row = args.detailElement.parentElement.previousSibling;
        var index = !isNullOrUndefined(data.parentItem) ? data.parentItem.index : data.index;
        var expandClass = 'e-gridrowindex' + index + 'level' + data.level;
        var classlist = row.querySelector('.' + expandClass).classList;
        var gridClas = [].slice.call(classlist).filter(function (gridclass) { return (gridclass === expandClass); });
        var newNo = gridClas[0].length;
        var slicedclas = gridClas.toString().slice(6, newNo);
        var detailClass = 'e-griddetail' + slicedclas;
        addClass([args.detailElement.parentElement], detailClass);
    };
    DetailRow.prototype.actioncomplete = function (args) {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            var spann = (args.row.querySelectorAll('.e-editcell')[0].getAttribute('colSpan'));
            var colum = parseInt(spann, 10) - 1;
            var updtdcolum = colum.toString();
            args.row.querySelectorAll('.e-editcell')[0].setAttribute('colSpan', updtdcolum);
        }
        var focusElement = this.parent.grid.contentModule.getRows();
        for (var i = 0; i < focusElement.length; i++) {
            focusElement[parseInt(i.toString(), 10)].cells[0].visible = false;
        }
        var focusModule = getObject('focusModule', this.parent.grid);
        var matrix = 'refreshMatrix';
        focusModule["" + matrix](true)({ rows: this.parent.grid.contentModule.getRows() });
    };
    /**
     * Destroys the DetailModule.
     *
     * @function destroy
     * @returns {void}
     */
    DetailRow.prototype.destroy = function () {
        this.removeEventListener();
    };
    return DetailRow;
}());

var __extends$g = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * VirtualTreeContentRenderer
 *
 * @hidden
 */
var VirtualTreeContentRenderer = /** @class */ (function (_super) {
    __extends$g(VirtualTreeContentRenderer, _super);
    function VirtualTreeContentRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.isExpandCollapse = false;
        _this.translateY = 0;
        _this.maxiPage = 0;
        _this.recordAdded = false;
        /** @hidden */
        _this.startIndex = -1;
        _this.endIndex = -1;
        _this.preTranslate = 0;
        _this.isRemoteExpand = false;
        /** @hidden */
        _this.isDataSourceChanged = false;
        _this.addEventListener();
        return _this;
    }
    VirtualTreeContentRenderer.prototype.getModelGenerator = function () {
        return new TreeVirtualRowModelGenerator(this.parent);
    };
    /**
     * Retrieves the row element for a given row index.
     *
     * @param {number} index - The index of the row to retrieve.
     * @returns {Element} The row element at the specified index.
     */
    VirtualTreeContentRenderer.prototype.getRowByIndex = function (index) {
        if (this.parent.enableVirtualization && this.parent.isFrozenGrid()) {
            return this.getRowCollection(index, true);
        }
        var dataRows = this.parent.getDataRows();
        var targetRow = dataRows.find(function (e) { return parseInt(e.getAttribute('aria-rowindex'), 10) - 1 === index; });
        if (!targetRow && this.parent.isEdit && this.parent.editSettings.mode === 'Batch') {
            return index != null ? this.parent.getRows()[parseInt(index.toString(), 10)] : undefined;
        }
        return targetRow;
    };
    /**
     * Retrieves the frozen right virtual row element by its index.
     *
     * @param {number} index - The index of the row to be retrieved.
     * @returns {Element} The DOM element representing the frozen right virtual row.
     */
    VirtualTreeContentRenderer.prototype.getFrozenRightVirtualRowByIndex = function (index) {
        return this.getRowCollection(index, false, false, true);
    };
    /**
     * Retrieves the row or record from the virtual tree grid based on the provided index.
     * Considers conditions such as frozen rows and pagination for accurate retrieval.
     *
     * @param {number} index - The index of the desired row or record.
     * @param {boolean} isMovable - Specifies if the content is movable.
     * @param {boolean} [isRowObject] - Optional. Determines if the return value should be a row object.
     * @param {boolean} [isFrozenRight] - Optional. Used for determining frozen right rows.
     * @returns {Element | Object} - The HTML element or row object.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    VirtualTreeContentRenderer.prototype.getRowCollection = function (index, isMovable, isRowObject, isFrozenRight) {
        var startIdx = parseInt(this.parent.getRows()[0].getAttribute(ariaRowIndex), 10) - 1;
        var rowCollection = this.parent.getDataRows();
        var collection = isRowObject ? this.parent.getCurrentViewRecords() : rowCollection;
        var selectedRow = collection[index - startIdx];
        if (this.parent.frozenRows && this.parent.pageSettings.currentPage > 1) {
            if (!isRowObject) {
                selectedRow = index <= this.parent.frozenRows ? rowCollection[parseInt(index.toString(), 10)]
                    : rowCollection[(index - startIdx) + this.parent.frozenRows];
            }
            else {
                selectedRow = index <= this.parent.frozenRows ?
                    this.parent.getRowsObject()[parseInt(index.toString(), 10)].data : selectedRow;
            }
        }
        if (selectedRow == null && index != null && this.parent.editSettings.mode === 'Batch' && this.parent.isEdit && isMovable) {
            selectedRow = rowCollection[parseInt(index.toString(), 10)];
        }
        return selectedRow;
    };
    /**
     * @hidden
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.addEventListener = function () {
        this.parent.on(virtualActionArgs, this.virtualOtherAction, this);
        this.parent.on(indexModifier, this.indexModifier, this);
    };
    /**
     * Handles virtual scrolling actions based on the provided arguments.
     *
     * @param {Object} args - The argument object.
     * @param {boolean} args.setTop - Determines if the virtual scroll position should reset to top.
     * @param {boolean} args.isExpandCollapse - Determines if the action is part of an expand/collapse operation.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.virtualOtherAction = function (args) {
        if (args.setTop) {
            this.translateY = 0;
            this.startIndex = 0;
            this.endIndex = this.parent.pageSettings.pageSize - 1;
        }
        else if (args.isExpandCollapse) {
            this.isExpandCollapse = true;
        }
    };
    /**
     * Modifies the index based on various conditions such as record addition, deletion, or data source changes.
     *
     * @private
     * @param {Object} args - Contains parameters for the current operation.
     * @param {number} args.startIndex - The starting index for the modification.
     * @param {number} args.endIndex - The ending index for the modification.
     * @param {number} args.count - The number of items affected in the operation.
     * @param {string} args.requestType - The type of request, such as 'insert', 'delete', or 'update'.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.indexModifier = function (args) {
        var content = this.parent.getContent().querySelector('.e-content');
        var pageSize = this.parent.pageSettings.pageSize;
        if ((this.recordAdded || args.requestType === 'delete' && this.endIndex > args.count - this.parent.pageSettings.pageSize) && this.startIndex > -1 && this.endIndex > -1) {
            if (this.endIndex > args.count - pageSize) {
                var nextSetResIndex = ~~(content.scrollTop / this.parent.getRowHeight());
                var lastIndex = nextSetResIndex + this.parent.getRows().length;
                if (lastIndex > args.count) {
                    lastIndex = nextSetResIndex +
                        (args.count - nextSetResIndex);
                }
                this.startIndex = lastIndex - this.parent.getRows().length;
                this.endIndex = lastIndex;
            }
            else if (this.parent.root.editSettings.newRowPosition !== 'Top' && this.parent.root.editModule.selectedIndex !== -1 || this.parent.root.editModule.selectedIndex !== -1) {
                this.startIndex += 1;
                this.endIndex += 1;
            }
            this.recordAdded = false;
        }
        if (this.isDataSourceChanged) {
            this.startIndex = 0;
            this.endIndex = pageSize - 1;
        }
        if ((this.endIndex - this.startIndex !== pageSize) &&
            (this.totalRecords > pageSize)
            && (this.endIndex === this.totalRecords)) {
            args.startIndex = this.endIndex - pageSize;
            args.endIndex = this.endIndex;
        }
        else {
            args.startIndex = this.startIndex;
            args.endIndex = this.endIndex;
        }
    };
    /**
     * Handles the addition or removal of event listeners for virtual scrolling in a TreeGrid.
     *
     * @param {string} action - The action to perform, either 'on' or 'off'.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.eventListener = function (action) {
        var _this = this;
        if (!(this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || !isCountRequired(this.parent)) {
            this.parent["" + action]('data-ready', this.onDataReady, this);
            this.parent["" + action]('refresh-virtual-block', this.refreshContentRows, this);
            this.fn = function () {
                _this.observers.observes(function (scrollArgs) { return _this.scrollListeners(scrollArgs); }, _this.onEnteredAction(), _this.parent);
                var gObj = _this.parent;
                if (gObj.root.enablePersistence && gObj.root.scrollPosition) {
                    _this.content.scrollTop = gObj.root.scrollPosition.top;
                    if (gObj.root.enableColumnVirtualization) {
                        _this.content.scrollLeft = gObj.root.scrollPosition.left;
                    }
                    var scrollValues = {
                        direction: 'down', sentinel: _this.observer.sentinelInfo.down,
                        offset: gObj.root.scrollPosition, focusElement: gObj.element
                    };
                    _this.scrollListeners(scrollValues);
                }
                _this.parent.off('content-ready', _this.fn);
            };
            this.parent.addEventListener('dataBound', this.dataBoundEvent.bind(this));
            this.parent.addEventListener('rowSelected', this.rowSelectedEvent.bind(this));
            this.parent["" + action]('select-virtual-Row', this.toSelectVirtualRow, this);
            this.parent.on('content-ready', this.fn, this);
            this.parent.addEventListener(actionBegin, this.handleActionBegin.bind(this));
            this.parent.addEventListener(actionComplete, this.onActionComplete.bind(this));
            this.parent["" + action]('virtual-scroll-edit-action-begin', this.beginEdit, this);
            this.parent["" + action]('virtual-scroll-add-action-begin', this.beginAdd, this);
            this.parent["" + action]('virtual-scroll-edit-success', this.virtualEditSuccess, this);
            this.parent["" + action]('edit-reset', this.resetIseditValue, this);
            this.parent["" + action]('get-virtual-data', this.getData, this);
            this.parent["" + action]('virtual-scroll-edit-cancel', this.cancelEdit, this);
            this.parent["" + action]('select-row-on-context-open', this.toSelectRowOnContextOpen, this);
            this.parent["" + action]('refresh-virtual-editform-cells', this.refreshCell, this);
            this.parent["" + action]('virtaul-cell-focus', this.cellFocus, this);
            this.parent["" + action]('virtual-scroll-edit', this.restoreEditState, this);
        }
        else {
            _super.prototype.eventListener.call(this, 'on');
        }
    };
    /**
     * Handles cell focus transitions in a virtualized tree grid component
     * when a keyboard event is triggered.
     *
     * @param {KeyboardEventArgs} e - The keyboard event arguments that contain
     *                                information about the key action.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.cellFocus = function (e) {
        var virtualCellFocus = 'virtualCellFocus';
        _super.prototype["" + virtualCellFocus].call(this, e);
    };
    /**
     * Handles the data ready event for the virtual tree grid content renderer.
     *
     * @param {NotifyArgs} [e] - The notification arguments that contain information about the data.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.onDataReady = function (e) {
        _super.prototype.onDataReady.call(this, e);
        if (!(this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || !isCountRequired(this.parent)) {
            if (!isNullOrUndefined(e.count)) {
                this.totalRecords = e.count;
                // To overcome the white space issue in last page when records collapsed
                if (this.parent.isFrozenGrid() && e.count < Object.keys(this.parent.dataSource).length) {
                    var width = this.parent.enableColumnVirtualization ?
                        this.getColumnOffset(this.parent.columns.length - 1) + 'px' : '100%';
                    var height = (this.parent.getRowHeight() * e.count) -
                        (this.parent.getRowHeight() * this.parent.pageSettings.pageSize);
                    getValue('virtualEle', this).setVirtualHeight(height, width);
                }
                if (!this.parent.enableColumnVirtualization && !this.parent.isFrozenGrid()) {
                    getValue('virtualEle', this).setVirtualHeight(this.parent.getRowHeight() * e.count, '100%');
                }
            }
            if ((!isNullOrUndefined(e.requestType) && e.requestType.toString() === 'collapseAll') || (this.isDataSourceChanged && (this.startIndex === -1 || this.startIndex === 0 && this['preStartIndex'] === 0))) {
                this.contents.scrollTop = 0;
                this.isDataSourceChanged = false;
            }
        }
    };
    /**
     * Renders the table for the virtual tree content. It sets up a new `TreeInterSectionObserver`
     * based on certain conditions regarding the data source and counting requirements.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.renderTable = function () {
        _super.prototype.renderTable.call(this);
        if (!(this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || !isCountRequired(this.parent)) {
            getValue('observer', this).options.debounceEvent = false;
            this.observers = new TreeInterSectionObserver(getValue('observer', this).element, getValue('observer', this).options);
            this.contents = this.getPanel().firstChild;
        }
    };
    /**
     * Calculates the translateY value for a virtual tree grid based on the scroll top, container height,
     * and additional virtual scrolling information. This method specifically handles logic for remote
     * data sources and ensures smooth scrolling with respect to expansion states.
     *
     * @param {number} sTop - The scroll top position.
     * @param {number} cHeight - The height of the container.
     * @param {VirtualInfo} [info] - Optional virtual scrolling information.
     * @param {boolean} [isOnenter] - Flag indicating if the scroll event is on enter.
     * @returns {number} The calculated translateY value.
     */
    VirtualTreeContentRenderer.prototype.getTranslateY = function (sTop, cHeight, info, isOnenter) {
        if ((this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && !this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || isCountRequired(this.parent)) {
            if (this.isRemoteExpand) {
                this.isRemoteExpand = false;
                return this.preTranslate;
            }
            this.preTranslate = _super.prototype.getTranslateY.call(this, sTop, cHeight, info, isOnenter);
        }
        return _super.prototype.getTranslateY.call(this, sTop, cHeight, info, isOnenter);
    };
    /**
     * Handles the dataBound event to calculate and set the initial row top position for the grid.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.dataBoundEvent = function () {
        var dataBoundEve = 'dataBound';
        var initialRowTop = 'initialRowTop';
        if (!isNullOrUndefined(this.parent.getRows()) && this.parent.getRows().length && !isNullOrUndefined(this.parent.getRowByIndex(0)) && !this["" + initialRowTop]) {
            var rowTop = this.parent.getRowByIndex(0).getBoundingClientRect().top;
            var gridTop = this.parent.element.getBoundingClientRect().top;
            if (rowTop > 0) {
                this["" + initialRowTop] = this.parent.getRowByIndex(0).getBoundingClientRect().top - gridTop;
            }
            else if (this.parent.selectedRowIndex === -1) {
                this["" + initialRowTop] = this.content.getBoundingClientRect().top -
                    this.parent.getRowByIndex(0).getBoundingClientRect().height;
            }
        }
        _super.prototype["" + dataBoundEve].call(this);
    };
    /**
     * Handles the row selection event for virtual tree grid rows.
     * It invokes the base class's rowSelected method and notifies
     * the parent component about a virtual transformation change.
     *
     * @param {RowSelectEventArgs} args - The arguments related to the row selection event.
     * @returns {void} This method does not return a value.
     */
    VirtualTreeContentRenderer.prototype.rowSelectedEvent = function (args) {
        var rowSelected = 'rowSelected';
        _super.prototype["" + rowSelected].call(this, args);
        this.parent.notify('virtualTransform', { requestType: 'transformChange' });
    };
    /**
     * Handles virtual row selection in TreeGrid.
     *
     * @param {Object} args - The argument object containing the selected index.
     * @param {number} args.selectedIndex - The index of the row to be selected.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.toSelectVirtualRow = function (args) {
        if (this.parent.isEdit) {
            return;
        }
        var selectVirtualRow = 'selectVirtualRow';
        var containerRect = 'containerRect';
        if (isNullOrUndefined(this.observer["" + containerRect])) {
            this.observer["" + containerRect] = this.observers["" + containerRect];
        }
        var treeGridParent = this.parent.clipboardModule['treeGridParent'];
        if (isNullOrUndefined(treeGridParent.editModule) ||
            isNullOrUndefined(treeGridParent.editModule['addRowIndex']) || args.selectedIndex !== 0) {
            if (!isNullOrUndefined(treeGridParent.grid.sortModule) && treeGridParent.grid.sortModule['sortedColumns'].length > 0) {
                var sortedData = treeGridParent.dataModule['sortedData'];
                if (!isNullOrUndefined(sortedData) && sortedData.length > 0) {
                    var targetIndex = sortedData.findIndex(function (record) { return record.index === args.selectedIndex; });
                    args.selectedIndex = targetIndex;
                }
            }
            _super.prototype["" + selectVirtualRow].call(this, args);
        }
    };
    /**
     * Refreshes the cells for the given row object by regenerating them.
     *
     * @param {Row<Column>} rowObj - The row object for which the cells need to be refreshed.
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.refreshCell = function (rowObj) {
        rowObj.cells = this.generateCells();
    };
    /**
     * Generates an array of cells for each column in the parent.
     *
     * @returns {Cell<Column>[]} An array of cells for the corresponding columns.
     */
    VirtualTreeContentRenderer.prototype.generateCells = function () {
        var cells = [];
        for (var i = 0; i < this.parent.columns.length; i++) {
            cells.push(this.generateCell(this.parent.columns[parseInt(i.toString(), 10)]));
        }
        return cells;
    };
    /**
     * Generates a cell object with provided column and row configurations.
     *
     * @param {Column} col - The Column object which holds the column configuration.
     * @param {string} [rowId] - An optional string that represents the row ID.
     * @param {CellType} [cellType] - An optional CellType enum to specify the type of the cell.
     * @param {number} [colSpan] - An optional number to specify the column span of the cell.
     * @param {number} [oIndex] - An optional number for the order index of the cell.
     * @param {Object} [foreignKeyData] - An optional object for foreign key data associated with the column.
     *
     * @returns {Cell<Column>} Returns a newly created Cell object of type Column.
     */
    VirtualTreeContentRenderer.prototype.generateCell = function (col, rowId, cellType, colSpan, oIndex, foreignKeyData) {
        var opt = {
            'visible': col.visible,
            'isDataCell': !isNullOrUndefined(col.field || col.template),
            'isTemplate': !isNullOrUndefined(col.template),
            'rowID': rowId,
            'column': col,
            'cellType': !isNullOrUndefined(cellType) ? cellType : CellType.Data,
            'colSpan': colSpan,
            'commands': col.commands,
            'isForeignKey': col.isForeignColumn && col.isForeignColumn(),
            'foreignKeyData': col.isForeignColumn && col.isForeignColumn() && getValue(col.field, foreignKeyData)
        };
        if (opt.isDataCell || opt.column.type === 'checkbox' || opt.commands) {
            opt.index = oIndex;
        }
        return new Cell(opt);
    };
    /**
     * Begins the edit operation for a specified row in the grid.
     * Updates the `editedRowIndex` and assigns row data to the event data.
     *
     * @param {{ data: Object, index: number }} e - An object containing the row data and index.
     * @param {Object} e.data - The data of the row to be edited.
     * @param {number} e.index - The index of the row to be edited.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.beginEdit = function (e) {
        this['editedRowIndex'] = e.index;
        var selector = '.e-row[aria-rowindex="' + (e.index + 1) + '"]';
        var index = this.parent.getContent().querySelector(selector).rowIndex;
        var rowData = this.parent.getCurrentViewRecords()[parseInt(index.toString(), 10)];
        e.data = rowData;
    };
    /**
     * Begins the process of adding a new row in the tree grid.
     *
     * @param {Object} args - The arguments for adding a new row.
     * @param {boolean} args.startEdit - A flag indicating whether to start editing.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.beginAdd = function (args) {
        var addAction = 'addActionBegin';
        var isAdd = 'isAdd';
        var addArgs = { newRowPosition: this.rowPosition, addRowIndex: this.addRowIndex, dataRowIndex: this.dataRowIndex };
        this.parent.notify('get-row-position', addArgs);
        this.rowPosition = addArgs.newRowPosition;
        this.addRowIndex = addArgs.addRowIndex;
        this.dataRowIndex = addArgs.dataRowIndex;
        var rows = this.parent.getRows();
        var firstAriaIndex = rows.length ? +rows[0].getAttribute('aria-rowindex') - 1 : 0;
        var lastAriaIndex = rows.length ? +rows[rows.length - 1].getAttribute('aria-rowindex') - 1 : 0;
        var withInRange = this.parent.selectedRowIndex >= firstAriaIndex && this.parent.selectedRowIndex <= lastAriaIndex;
        if (!(this.rowPosition === 'Top' || this.rowPosition === 'Bottom')) {
            this["" + isAdd] = true;
        }
        if (this.rowPosition === 'Top' || this.rowPosition === 'Bottom' ||
            ((!this.addRowIndex || this.addRowIndex === -1) && (this.parent.selectedRowIndex === -1 || !withInRange))) {
            _super.prototype["" + addAction].call(this, args);
        }
    };
    /**
     * Restores the edit state of the tree grid content. This method calls the
     * base class method to handle the restoration logic.
     *
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.restoreEditState = function () {
        var restoreEdit = 'restoreEdit';
        _super.prototype["" + restoreEdit].call(this);
    };
    /**
     * Resets the edit state if certain conditions are met.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.resetIseditValue = function () {
        var resetIsEdit = 'resetIsedit';
        var isAdd = 'isAdd';
        this.parent.notify('reset-edit-props', {});
        if ((this.rowPosition === 'Top' || this.rowPosition === 'Bottom') && this["" + isAdd]) {
            _super.prototype["" + resetIsEdit].call(this);
        }
    };
    /**
     * Handles the successful editing operation when virtual scrolling is enabled.
     * Checks if a row has been added to the tree grid and sets the `recordAdded` flag accordingly.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.virtualEditSuccess = function () {
        var isAdd = 'isAdd';
        var content = this.parent.getContent().querySelector('.e-content');
        if (this["" + isAdd] && content.querySelector('.e-addedrow')) {
            this.recordAdded = true;
        }
    };
    /**
     * Cancels the edit operation for the provided data.
     *
     * @param {Object} args - The arguments containing the data to cancel edit for.
     * @param {Object} args.data - The specific data object for which the edit operation needs to be canceled.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.cancelEdit = function (args) {
        var editCancel = 'editCancel';
        _super.prototype["" + editCancel].call(this, args);
    };
    /**
     * Handles the action of selecting a row when the context menu is opened.
     *
     * @param {Object} args - An object containing related parameters.
     * @param {boolean} args.isOpen - A flag indicating whether the context menu is open.
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.toSelectRowOnContextOpen = function (args) {
        var selectRowOnContextOpen = 'selectRowOnContextOpen';
        _super.prototype["" + selectRowOnContextOpen].call(this, args);
    };
    /**
     * Restores a new row in the grid when necessary by adding it back to the content.
     *
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.restoreNewRow = function () {
        var isAdd = 'isAdd';
        var content = this.parent.getContent().querySelector('.e-content');
        if (this["" + isAdd] && !content.querySelector('.e-addedrow')) {
            this.parent.isEdit = false;
            this.parent.editModule.addRecord(null, this.parent.root.editModule.selectedIndex);
        }
    };
    /**
     * Retrieves virtual data for operations like adding or canceling rows in the grid.
     *
     * @param {Object} data - An object containing properties to determine the virtual data processing.
     * @param {Object} data.virtualData - The virtual data object to be processed.
     * @param {boolean} data.isAdd - A boolean indicating if the operation is an addition.
     * @param {boolean} data.isCancel - A boolean indicating if the operation is a cancellation.
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.getData = function (data) {
        var getVirtualData = 'getVirtualData';
        _super.prototype["" + getVirtualData].call(this, data);
    };
    /**
     * Initiates the beginning of an action within the tree grid component.
     * This method is invoked before any action is performed, allowing for
     * any necessary modifications or cancellations of the upcoming action.
     *
     * @param {NotifyArgs} args - The arguments associated with the action,
     * providing context and specifics about what is being commenced.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.handleActionBegin = function (args) {
        var actionBegin = 'actionBegin';
        _super.prototype["" + actionBegin].call(this, args);
    };
    /**
     * Handles the completion of various actions, such as adding a new row.
     * Updates row positions and indexes based on the action completed.
     *
     * @param {NotifyArgs} args - An object containing the details of the completed action.
     *               Specifically, it includes the `requestType` which determines the type
     *               of action that was completed.
     * @returns {void} This method does not return any value.
     */
    VirtualTreeContentRenderer.prototype.onActionComplete = function (args) {
        if (args.requestType === 'add') {
            var addArgs = { newRowPosition: this.rowPosition, addRowIndex: this.addRowIndex, dataRowIndex: this.dataRowIndex };
            this.parent.notify('get-row-position', addArgs);
            this.rowPosition = addArgs.newRowPosition;
            this.addRowIndex = addArgs.addRowIndex;
            this.dataRowIndex = this.parent.root.editModule.selectedIndex;
        }
        var actionComplete = 'actionComplete';
        _super.prototype["" + actionComplete].call(this, args);
    };
    /**
     * Creates a callback function to be executed during virtual scrolling actions.
     * This function handles the adjustment of virtual elements and rendering logic,
     * particularly optimizing for non-IE browsers, wheel events, and virtual masks.
     *
     * @returns {Function} A function that handles scrolling and adjusts table rendering.
     * @param {HTMLElement} element - The HTML element involved in the action.
     * @param {SentinelType} current - The type of sentinel indicating the scroll.
     * @param {string} direction - The scroll direction.
     * @param {Offsets} e - The offset values indicating the current scroll position.
     * @param {boolean} isWheel - Indicates if the scrolling was initiated by a mouse wheel.
     * @param {boolean} check - A boolean flag for additional control logic.
     */
    VirtualTreeContentRenderer.prototype.onEnteredAction = function () {
        var _this = this;
        return function (element, current, direction, e, isWheel, check) {
            var directVirtualRender = 'directVirtualRender';
            if (!_this.parent["" + directVirtualRender]) { // with this property, columns are rendered without debouncing on horizontal scroll.
                var preventEvent = 'preventEvent';
                if (Browser.isIE && !isWheel && check && !_this["" + preventEvent] && !_this.parent.enableVirtualMaskRow) {
                    _this.parent.showSpinner();
                }
                if (_this.parent.enableVirtualMaskRow && !_this["" + preventEvent]) {
                    setTimeout(function () {
                        _this.parent.showMaskRow(current.axis);
                        _this.parent.notify('showGanttShimmer', { requestType: 'showShimmer' });
                    }, 0);
                }
                var height = _this.content.getBoundingClientRect().height;
                var top_1 = _this.prevInfo.offsets ? _this.prevInfo.offsets.top : null;
                var xAxis = current.axis === 'X';
                var x = _this.getColumnOffset(xAxis ? _this.vgenerator.getColumnIndexes()[0] - 1 : _this.prevInfo.columnIndexes[0]
                    - 1);
                if (xAxis) {
                    var idx = Object.keys(_this.vgenerator.cOffsets).length - _this.prevInfo.columnIndexes.length;
                    var maxLeft = _this.vgenerator.cOffsets[idx - 1];
                    x = x > maxLeft ? maxLeft : x; //TODO: This fix horizontal scrollbar jumping issue in column virtualization.
                }
                var y = _this.getTranslateY(e.top, height, xAxis && top_1 === e.top ? _this.prevInfo : undefined, true);
                if (!_this.parent.isFrozenGrid() || _this.parent.enableVirtualMaskRow) {
                    if (_this.parent.enableVirtualMaskRow) {
                        var upScroll = (e.top - _this.translateY) < 0;
                        y = (Math.round(_this.translateY) > y && !upScroll) ? Math.round(_this.translateY) : y;
                        _this.virtualEle.adjustTable(x, y);
                    }
                    else {
                        _this.virtualEle.adjustTable(x, _this.translateY);
                    }
                    if (_this.parent.enableColumnVirtualization) {
                        _this.header.virtualEle.adjustTable(x, 0);
                    }
                }
            }
        };
    };
    /**
     * Handles scroll events to manage virtual scrolling and row rendering.
     * Adjusts view information, row indexes, and translates viewport positioning
     * based on the given scroll arguments.
     *
     * @param {ScrollArg} scrollArgs - Contains the scroll offsets, sentinel information, direction of scroll, and other related details.
     * @returns {void} - No return value. It adjusts scrolling state internally.
     */
    VirtualTreeContentRenderer.prototype.scrollListeners = function (scrollArgs) {
        this['scrollAfterEdit']();
        this.shouldPreventScrolling(scrollArgs);
        if (this.parent.root.enablePersistence) {
            this.parent.root.scrollPosition = scrollArgs.offset;
        }
        var info = scrollArgs.sentinel;
        var rowHeight = this.parent.getRowHeight();
        var outBuffer = this.parent.pageSettings.pageSize - Math.ceil(this.parent.pageSettings.pageSize / 2);
        var content;
        if (!isNullOrUndefined(this.parent.contentModule)) {
            content = this.parent.getContent().querySelector('.e-content');
        }
        var scrollHeight = outBuffer * rowHeight;
        var upScroll = (scrollArgs.offset.top - this.translateY) < 0 && this.activeKey !== 'downArrow';
        var downScroll = Math.ceil(scrollArgs.offset.top - this.translateY) + rowHeight >= scrollHeight;
        var selectedRowIndex = 'selectedRowIndex';
        var currentViewData = this.parent.currentViewData;
        var indexValue = 'index';
        if (upScroll && (scrollArgs.direction !== 'right' && scrollArgs.direction !== 'left') && !isNullOrUndefined(content)) {
            var vHeight = +(this.parent.height.toString().indexOf('%') < 0 ? parseInt(this.parent.height.toString(), 10) :
                this.parent.element.getBoundingClientRect().height);
            // Calculate the integer number of rows that are scrolled past plus the number of rows that fit within the visible height
            var scrolledRows = Math.floor(content.scrollTop / rowHeight);
            var visibleRows = Math.ceil(vHeight / rowHeight);
            // Calculate the index by subtracting the page size from the total rows taken into account
            var index = scrolledRows + visibleRows - this.parent.pageSettings.pageSize;
            index = (index > 0) ? index : 0;
            if (!isNullOrUndefined(this["" + selectedRowIndex]) && this["" + selectedRowIndex] !== -1 && index !== this["" + selectedRowIndex] &&
                ((this.parent.rowHeight * this.parent.pageSettings.pageSize) < content.scrollTop) && !this.parent.allowRowDragAndDrop) {
                index = this["" + selectedRowIndex];
            }
            this.startIndex = index;
            this.endIndex = index + this.parent.pageSettings.pageSize;
            if (this.endIndex > this.totalRecords) {
                var lastInx = this.totalRecords;
                var remains = this.endIndex % lastInx;
                this.endIndex = lastInx;
                this.startIndex = (this.startIndex - remains) < 0 ? 0 : (this.startIndex - remains);
            }
            if (currentViewData.length && (currentViewData[0]["" + indexValue] >= this.parent.pageSettings.pageSize / 2) &&
                ((currentViewData[0]["" + indexValue] - this.startIndex) < (this.parent.pageSettings.pageSize / 2)) &&
                this.parent.selectionModule && this.parent.selectionModule.isRowSelected) {
                this.startIndex = currentViewData[0]["" + indexValue] - (this.parent.pageSettings.pageSize / 2);
                this.endIndex = this.startIndex + this.parent.pageSettings.pageSize;
            }
            //var firsttdinx = parseInt(this.parent.getContent().querySelector('.e-content td').getAttribute('index'), 0);
            var rowPt = Math.ceil(scrollArgs.offset.top / rowHeight);
            rowPt = rowPt % this.parent.pageSettings.pageSize;
            var firsttdinx = 0;
            if (!isNullOrUndefined(this.parent.getRows()[parseInt(rowPt.toString(), 10)]) &&
                !isNullOrUndefined(this.parent.getContent().querySelectorAll('.e-content tr')[parseInt(rowPt.toString(), 10)])) {
                var attr = this.parent.getContent().querySelectorAll('.e-content tr')[parseInt(rowPt.toString(), 10)]
                    .querySelector('td').getAttribute('index');
                firsttdinx = +attr; // this.parent.getContent().querySelector('.e-content tr').getAttribute('data-rowindex');
            }
            if (firsttdinx === 0) {
                if (this.endIndex - this.startIndex < this.parent.pageSettings.pageSize) {
                    this.translateY = !isNullOrUndefined(this.endIndex) ?
                        (this.endIndex - this.parent.pageSettings.pageSize) * (this.parent.rowHeight ?
                            this.parent.rowHeight : this.parent.getRowHeight()) : 0;
                }
                else if (this.startIndex === this["" + selectedRowIndex]) {
                    this.translateY = scrollArgs.offset.top;
                }
                else {
                    this.translateY = (scrollArgs.offset.top - (outBuffer * rowHeight) > 0) ?
                        scrollArgs.offset.top - (outBuffer * rowHeight) + rowHeight : 0;
                }
            }
            else if (this.parent.getFrozenColumns() > 0) {
                scrollArgs.offset.top = scrollArgs.offset.top + 80;
                this.translateY = (scrollArgs.offset.top - (outBuffer * rowHeight) > 0) ?
                    scrollArgs.offset.top - (outBuffer * rowHeight) + 10 : 0;
            }
            else {
                this.translateY = (scrollArgs.offset.top - (outBuffer * rowHeight) > 0) ?
                    scrollArgs.offset.top - (outBuffer * rowHeight) + 10 : 0;
            }
        }
        else if (downScroll && (scrollArgs.direction !== 'right' && scrollArgs.direction !== 'left' && scrollArgs.direction !== 'up') && !isNullOrUndefined(content)) {
            var nextSetResIndex = ~~(content.scrollTop / rowHeight);
            var isLastBlock = (this["" + selectedRowIndex] + this.parent.pageSettings.pageSize) < this.totalRecords ? false : true;
            if (!isNullOrUndefined(this["" + selectedRowIndex]) && this["" + selectedRowIndex] !== -1 &&
                nextSetResIndex !== this["" + selectedRowIndex] && !isLastBlock && !this.parent.allowRowDragAndDrop) {
                nextSetResIndex = this["" + selectedRowIndex];
            }
            var lastIndex = nextSetResIndex + this.parent.pageSettings.pageSize;
            if (lastIndex > this.totalRecords) {
                lastIndex = nextSetResIndex +
                    (this.totalRecords - nextSetResIndex);
            }
            this.startIndex = !isLastBlock || isNullOrUndefined(this['' + selectedRowIndex]) ? lastIndex - this.parent.pageSettings.pageSize : nextSetResIndex;
            this.endIndex = lastIndex;
            if ((nextSetResIndex + this.parent.pageSettings.pageSize) > this.totalRecords && (this.endIndex - this.startIndex) <
                (this.parent.pageSettings.pageSize / 2) && (this.endIndex - nextSetResIndex) < (this.parent.pageSettings.pageSize / 2)) {
                this.startIndex = lastIndex - (this.parent.pageSettings.pageSize / 2);
            }
            if (currentViewData.length && this.startIndex > currentViewData[0]["" + indexValue] &&
                ((this.startIndex - currentViewData[0]["" + indexValue]) < (this.parent.pageSettings.pageSize / 2)) &&
                this.parent.selectionModule && this.parent.selectionModule.isRowSelected) {
                this.startIndex = currentViewData[0]["" + indexValue] + (this.parent.pageSettings.pageSize / 2);
            }
            if (scrollArgs.offset.top > (rowHeight * this.totalRecords)) {
                this.translateY = this.getTranslateY(scrollArgs.offset.top, content.getBoundingClientRect().height);
            }
            else {
                if (this.totalRecords === this.endIndex) {
                    if (this.totalRecords === this.endIndex) {
                        if (this.parent.isEdit) {
                            this.translateY = ((this.totalRecords * rowHeight) - (this.parent.pageSettings.pageSize * rowHeight))
                                + rowHeight;
                        }
                        else {
                            this.translateY = (this.totalRecords * rowHeight) - (this.parent.pageSettings.pageSize * rowHeight);
                        }
                    }
                }
                else {
                    if (this.parent.getFrozenColumns() > 0) {
                        this.translateY = scrollArgs.offset.top - ((rowHeight * 2) + this.parent.pageSettings.pageSize);
                    }
                    else {
                        this.translateY = scrollArgs.offset.top;
                    }
                }
            }
        }
        if (((downScroll && (scrollArgs.offset.top < (rowHeight * this.totalRecords)))
            || (upScroll)) || (scrollArgs.direction === 'right' || scrollArgs.direction === 'left') ||
            ((this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
                && !this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') && (downScroll || upScroll) || isCountRequired(this.parent))) {
            var viewInfo = this.currentInfo = getValue('getInfoFromView', this).apply(this, [scrollArgs.direction, info, scrollArgs.offset]);
            this.previousInfo = viewInfo;
            if (this.prevInfo && viewInfo.event !== 'refresh-virtual-block' && ((info.axis === 'Y' && this.prevInfo.blockIndexes.toString() === viewInfo.blockIndexes.toString())
                || ((info.axis === 'X' && this.prevInfo.columnIndexes.toString() === viewInfo.columnIndexes.toString())
                    || (this.parent.isFrozenGrid() && this.parent.getVisibleFrozenLeftCount() >= viewInfo.columnIndexes[0]
                        && this.prevInfo.columnIndexes.toString().includes(viewInfo.columnIndexes.toString()))))) {
                this.parent.removeMaskRow();
                if (Browser.isIE) {
                    this.parent.hideSpinner();
                }
                this.requestType = this.requestType === 'virtualscroll' ? this['empty'] : this.requestType;
                if (info.axis === 'Y') {
                    this.restoreEditState();
                }
                return;
            }
            this.parent.setColumnIndexesInView(this.parent.enableColumnVirtualization ? viewInfo.columnIndexes : []);
            var page = viewInfo.loadNext && !viewInfo.loadSelf ? viewInfo.nextInfo.page : viewInfo.page;
            this.parent.setProperties({ pageSettings: { currentPage: page } }, true);
            if (downScroll && this.endIndex === this.totalRecords && viewInfo.loadNext) {
                viewInfo.loadNext = false;
            }
            this.requestType = 'virtualscroll';
            if (scrollArgs.direction !== 'right' && scrollArgs.direction !== 'left') {
                viewInfo.event = viewInfo.event === 'refresh-virtual-block' ? 'model-changed' : viewInfo.event;
            }
            if (this.parent.enableVirtualMaskRow) {
                this.parent.showMaskRow(info.axis);
                this.parent.addShimmerEffect();
                this.parent.notify('showGanttShimmer', { requestType: 'showShimmer' });
            }
            this.parent.notify(viewInfo.event, { requestType: 'virtualscroll', virtualInfo: viewInfo, focusElement: scrollArgs.focusElement });
        }
        else {
            if (this.parent.enableVirtualMaskRow) {
                this.parent.removeMaskRow();
                this.parent.notify('removeGanttShimmer', { requestType: 'hideShimmer' });
            }
        }
    };
    /**
     * Prevents scrolling under specific conditions related to adding a new row.
     *
     * @param {ScrollArg} scrollArgs - The scroll event arguments containing offset details.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.shouldPreventScrolling = function (scrollArgs) {
        var addedRow = this.parent.element.querySelector('.e-addedrow');
        if (addedRow && this.rowPosition !== 'Top' && this.rowPosition !== 'Bottom' && scrollArgs.offset.top !== 0) {
            this.parent.closeEdit();
            return;
        }
    };
    /**
     * Appends content to the target element. Handles dynamic adjustments for remote data sources,
     * frozen columns, and virtual scrolling.
     *
     * @param {HTMLElement} target - The target HTML element where content is to be appended.
     * @param {DocumentFragment} newChild - The new content as a DocumentFragment to append.
     * @param {NotifyArgs} e - Object containing information about the operation.
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.appendContent = function (target, newChild, e) {
        if ((this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.url !== undefined
            && !this.parent.dataSource.dataSource.offline && this.parent.dataSource.dataSource.url !== '') || isCountRequired(this.parent)
            || (this.parent.isFrozenGrid() && (e.requestType === undefined || !isNullOrUndefined(e.virtualInfo) && (e.virtualInfo.direction === 'right' || e.virtualInfo.direction === 'left')))) {
            if (getValue('isExpandCollapse', e)) {
                this.isRemoteExpand = true;
            }
            _super.prototype.appendContent.call(this, target, newChild, e);
            if (getValue('requestTypes', this).indexOf('isFrozen') !== -1) {
                getValue('requestTypes', this).splice(getValue('requestTypes', this).indexOf('isFrozen'), 1);
                this.requestType = this.requestType === 'isFrozen' ? undefined : this.requestType;
            }
        }
        else {
            var info = e.virtualInfo.sentinelInfo && e.virtualInfo.sentinelInfo.axis === 'Y' &&
                getValue('currentInfo', this).page && getValue('currentInfo', this).page !== e.virtualInfo.page ?
                getValue('currentInfo', this) : e.virtualInfo;
            var cBlock = (info.columnIndexes[0]) - 1;
            var cOffset = this.getColumnOffset(cBlock);
            var width = void 0;
            if (this.parent.enableColumnVirtualization) {
                this.header.virtualEle.adjustTable(cOffset, 0);
                var cIndex = info.columnIndexes;
                width = this.getColumnOffset(cIndex[cIndex.length - 1]) - this.getColumnOffset(cIndex[0] - 1) + '';
                this.header.virtualEle.setWrapperWidth(width);
            }
            this.virtualEle.setWrapperWidth(width, (Browser.isIE || Browser.info.name === 'edge'));
            target = this.parent.createElement('tbody');
            target.appendChild(newChild);
            var replace = 'replaceWith';
            this.getTable().querySelector('tbody')["" + replace](target);
            if (e.requestType === 'virtualscroll' && e.virtualInfo.sentinelInfo.axis === 'Y') {
                this.isExpandCollapse = false;
            }
            if (!this.isExpandCollapse || this.translateY === 0) {
                this.translateY = this.translateY < 0 ? 0 : this.translateY;
                getValue('virtualEle', this).adjustTable(cOffset, this.translateY);
            }
            else {
                this.isExpandCollapse = false;
            }
            setValue('prevInfo', this.previousInfo ? this.previousInfo : info, this);
            if (e.requestType === 'virtualscroll' && e.virtualInfo.sentinelInfo.axis === 'X') {
                this.parent.notify(autoCol, {});
            }
            var focusCell = 'focusCell';
            var restoreAdd = 'restoreAdd';
            var ensureSelectedRowPosition = 'ensureSelectedRowPosition';
            _super.prototype["" + focusCell].call(this, e);
            var isAdd = 'isAdd';
            if (this["" + isAdd] && !this.parent.getContent().querySelector('.e-content').querySelector('.e-addedrow')) {
                if (!(this.rowPosition === 'Top' || this.rowPosition === 'Bottom')) {
                    if (this.dataRowIndex >= this.startIndex) {
                        this.restoreNewRow();
                    }
                    else if (this.addRowIndex && this.addRowIndex > -1) {
                        this["" + isAdd] = false;
                        this.parent.isEdit = false;
                    }
                }
            }
            this.restoreEditState();
            _super.prototype["" + restoreAdd].call(this);
            _super.prototype["" + ensureSelectedRowPosition].call(this);
        }
    };
    /**
     * Unsubscribes all event listeners to prevent memory leaks.
     * This method is called when the component is being destroyed or when event listeners need to be cleaned up.
     *
     * @returns {void}
     */
    VirtualTreeContentRenderer.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('data-ready', this.onDataReady);
        this.parent.off('content-ready', this.fn);
        this.parent.off('select-virtual-Row', this.toSelectVirtualRow);
        this.parent.off('dataBound', this.dataBoundEvent);
        this.parent.off('rowSelected', this.rowSelectedEvent);
        this.parent.off(virtualActionArgs, this.virtualOtherAction);
        this.parent.off(indexModifier, this.indexModifier);
        this.parent.off('virtual-scroll-edit-action-begin', this.beginEdit);
        this.parent.off('virtual-scroll-add-action-begin', this.beginAdd);
        this.parent.off('virtual-scroll-edit-success', this.virtualEditSuccess);
        this.parent.off('edit-reset', this.resetIseditValue);
        this.parent.off('get-virtual-data', this.getData);
        this.parent.off('virtual-scroll-edit-cancel', this.cancelEdit);
        this.parent.off('select-row-on-context-open', this.toSelectRowOnContextOpen);
        this.parent.off('refresh-virtual-editform-cells', this.refreshCell);
        this.parent.off('virtaul-cell-focus', this.cellFocus);
        this.parent.off('virtual-scroll-edit', this.restoreEditState);
    };
    return VirtualTreeContentRenderer;
}(VirtualContentRenderer));
var TreeInterSectionObserver = /** @class */ (function (_super) {
    __extends$g(TreeInterSectionObserver, _super);
    function TreeInterSectionObserver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isWheeling = false;
        _this.newPos = 0;
        _this.lastPos = 0;
        _this.timer = 0;
        return _this;
    }
    /**
     * Sets up observers to monitor scroll events on a given container
     * and its movable companion within a virtual grid setup.
     *
     * @param {Function} callback - Function to call when a scroll event is detected.
     * @param {Function} onEnterCallback - Function to call when a specific event, like entering a region, is detected.
     * @param {IGrid} instance - The grid instance that requires observation.
     * @returns {void}
     */
    TreeInterSectionObserver.prototype.observes = function (callback, onEnterCallback, instance) {
        var containerRect = 'containerRect';
        _super.prototype["" + containerRect] = getValue('options', this).container.getBoundingClientRect();
        EventHandler.add(getValue('options', this).container, 'scroll', this.virtualScrollHandlers(callback, onEnterCallback, instance), this);
        if (getValue('options', this).movableContainer) {
            var movableContainerRect = 'movableContainerRect';
            _super.prototype["" + movableContainerRect] = getValue('options', this).movableContainer.getBoundingClientRect();
            EventHandler.add(getValue('options', this).movableContainer, 'scroll', this.virtualScrollHandlers(callback, onEnterCallback, instance), this);
        }
    };
    /**
     * Clears the last known position.
     *
     * @returns {void} No value is returned from this function.
     */
    TreeInterSectionObserver.prototype.clear = function () {
        this.lastPos = null;
    };
    /**
     * Handles virtual scrolling events and manages scroll direction and debouncing for rendering updates.
     *
     * @private
     * @param {Function} callback - Function to call on scroll end.
     * @param {Function} onEnterCallback - Function to call on entering a virtual scrolling area.
     * @param {IGrid} instance - The grid instance on which virtual scrolling is being implemented.
     * @returns {Function} - A function that processes scroll events.
     */
    TreeInterSectionObserver.prototype.virtualScrollHandlers = function (callback, onEnterCallback, instance) {
        var _this = this;
        var delay = Browser.info.name === 'chrome' ? 200 : 100;
        var options = 'options';
        var movableEle = 'movableEle';
        var element = 'element';
        var fromWheel = 'fromWheel';
        var debounced100 = debounce(callback, delay);
        var debounced50 = debounce(callback, 50);
        this["" + options].prevTop = this["" + options].prevLeft = 0;
        var isScrollByFocus = 'isScrollByFocus';
        return function (e) {
            if (instance.isEdit && instance.root.editModule["" + isScrollByFocus]) {
                instance.root.editModule["" + isScrollByFocus] = false;
                return;
            }
            var top = _this["" + options].movableContainer ? _this["" + options].container.scrollTop : e.target.scrollTop;
            var left = _this["" + options].movableContainer ? _this["" + options].scrollbar.scrollLeft : e.target.scrollLeft;
            var direction = _this["" + options].prevTop < top ? 'down' : 'up';
            direction = _this["" + options].prevLeft === left ? direction : _this["" + options].prevLeft < left ? 'right' : 'left';
            _this["" + options].prevTop = top;
            _this["" + options].prevLeft = left;
            var current = _this.sentinelInfo["" + direction];
            var delta = 0;
            _this.newPos = top;
            if (_this.lastPos != null) { // && newPos < maxScroll
                delta = _this.newPos - _this.lastPos;
            }
            _this.lastPos = _this.newPos;
            if (_this.timer) {
                clearTimeout(_this.timer);
            }
            _this.timer = setTimeout(_this.clear, 0);
            if ((delta > 100 || delta < -100) && (e && e.preventDefault)) {
                e.returnValue = false;
                e.preventDefault();
            }
            if (_this["" + options].axes.indexOf(current.axis) === -1) {
                return;
            }
            var containerRect = 'containerRect';
            _this["" + containerRect] = _this["" + options].container.getBoundingClientRect();
            var check = _this.check(direction);
            if (current.entered && (current.axis === 'X' || instance.enableVirtualMaskRow)) {
                if (_this["" + movableEle] && (direction === 'right' || direction === 'left')) {
                    onEnterCallback(_this["" + movableEle], current, direction, { top: top, left: left }, _this["" + fromWheel], check);
                }
                else {
                    onEnterCallback(_this["" + element], current, direction, { top: top, left: left }, _this["" + fromWheel], check);
                }
            }
            if (check) {
                var fn = debounced50;
                if (current.axis === 'X') {
                    fn({ direction: direction, sentinel: current, offset: { top: top, left: left },
                        focusElement: document.activeElement });
                }
                else {
                    if ((instance.dataSource instanceof DataManager && instance.dataSource.dataSource.url !== undefined
                        && !instance.dataSource.dataSource.offline && instance.dataSource.dataSource.url !== '') || isCountRequired(instance)
                        || instance.enableVirtualMaskRow) {
                        fn = instance.enableVirtualMaskRow ? debounced100 : fn;
                        fn({ direction: direction, sentinel: current, offset: { top: top, left: left },
                            focusElement: document.activeElement });
                    }
                    else {
                        callback({ direction: direction, sentinel: current, offset: { top: top, left: left },
                            focusElement: document.activeElement });
                    }
                }
            }
            _this["" + fromWheel] = false;
        };
    };
    return TreeInterSectionObserver;
}(InterSectionObserver));

var __extends$h = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * TreeGrid Virtual Scroll module will handle Virtualization
 *
 * @hidden
 */
var VirtualScroll = /** @class */ (function () {
    /**
     * Constructor for VirtualScroll module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function VirtualScroll(parent) {
        this.prevstartIndex = -1;
        this.setEndIndexToGantt = true;
        this.prevendIndex = -1;
        this.prevSelectedRecord = [];
        this.parent = parent;
        Grid.Inject(TreeVirtual);
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} - Returns VirtualScroll module name
     */
    VirtualScroll.prototype.getModuleName = function () {
        return 'virtualScroll';
    };
    /**
     * @hidden
     * @returns {void}
     */
    VirtualScroll.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(localPagedExpandCollapse, this.collapseExpandVirtualchilds, this);
        this.parent.on(pagingActions, this.virtualPageAction, this);
        this.parent.on(destroy, this.destroy, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    VirtualScroll.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(localPagedExpandCollapse, this.collapseExpandVirtualchilds);
        this.parent.off(pagingActions, this.virtualPageAction);
        this.parent.off(destroy, this.destroy);
    };
    /**
     * Handles the virtual child collapse or expand action in a tree grid.
     *
     * @param {object} row - Object containing information about the collapse/expand action.
     * @param {string} row.action - The type of action, either "collapse" or "expand".
     * @param {HTMLTableRowElement} row.row - The HTML row element that is affected by the action.
     * @param {ITreeData} row.record - The tree data record associated with the row.
     * @param {RowCollapsedEventArgs} row.args - Additional event arguments related to the row collapse or expand.
     *
     * @returns {void} No return value as the function executes a procedure.
     */
    VirtualScroll.prototype.collapseExpandVirtualchilds = function (row) {
        this.parent.grid.notify(virtualActionArgs, { isExpandCollapse: true });
        this.expandCollapseRec = row.record;
        row.record.expanded = row.action === 'collapse' ? false : true;
        var actionDetails = {
            result: this.parent.flatData,
            row: row.row,
            action: row.action,
            record: row.record,
            count: this.parent.flatData.length
        };
        this.handleSelection();
        var requestType = getValue('isCollapseAll', this.parent) ? 'collapseAll' : 'refresh';
        getValue('grid.renderModule', this.parent).dataManagerSuccess(actionDetails, { requestType: requestType });
    };
    /**
     * Handles selection logic for the TreeGrid component.
     *
     * @returns {void}
     */
    VirtualScroll.prototype.handleSelection = function () {
        if ((this.parent.selectionSettings.mode === 'Cell' ||
            (this.parent.selectionSettings.mode === 'Row' && !this.parent.selectionSettings.persistSelection))) {
            this.parent.grid.clearSelection();
        }
        if (getValue('isCollapseAll', this.parent) && this.parent.selectionSettings.persistSelection && this.parent.getSelectedRecords().length > 0) {
            this.prevSelectedRecord = this.parent.getSelectedRecords();
            this.parent.grid.clearSelection();
        }
    };
    /**
     * Handles the action related to virtual scrolling with paging details.
     *
     * @param {Object} pageingDetails - Contains the result data, count of results, and action arguments.
     * @param {ITreeData[]} pageingDetails.result - The result data to be handled.
     * @param {number} pageingDetails.count - The count of results.
     * @param {ActionEventArgs} pageingDetails.actionArgs - The action arguments related to the virtual page action.
     * @returns {void}
     */
    VirtualScroll.prototype.virtualPageAction = function (pageingDetails) {
        var _this = this;
        var dm = new DataManager(pageingDetails.result);
        var expanded = new Predicate$1('expanded', 'notequal', null).or('expanded', 'notequal', undefined);
        var parents = dm.executeLocal(new Query().where(expanded));
        var visualData = parents.filter(function (e) {
            return getExpandStatus(_this.parent, e);
        });
        this.visualData = visualData;
        pageingDetails.count = visualData.length;
        this.parent.grid.notify(dataListener, { data: visualData });
        var counts = { startIndex: -1, endIndex: -1, count: pageingDetails.count, requestType: pageingDetails.actionArgs.requestType };
        this.parent.grid.notify(indexModifier, counts);
        var startIndex = counts.startIndex;
        var endIndex = counts.endIndex;
        pageingDetails.count = visualData.length;
        if (startIndex === -1 && endIndex === -1) {
            var query = new Query();
            var size = this.parent.grid.pageSettings.pageSize;
            var current = this.parent.grid.pageSettings.currentPage;
            var skip = size * (current - 1);
            query = query.skip(skip).take(size);
            dm.dataSource.json = visualData;
            pageingDetails.result = dm.executeLocal(query);
        }
        else {
            var requestType = pageingDetails.actionArgs.requestType;
            if (requestType === 'filtering' || requestType === 'collapseAll' || requestType === 'searching' || (requestType === 'refresh' && getValue('isExpandAll', this.parent)) ||
                (requestType === 'refresh' && this.parent.enableCollapseAll && endIndex > visualData.length && isNullOrUndefined(this.expandCollapseRec))) {
                startIndex = 0;
                endIndex = this.parent.grid.pageSettings.pageSize;
                this.parent.grid.getContent().firstElementChild.scrollTop = 0;
                this.parent.grid.notify(virtualActionArgs, { setTop: true });
            }
            if ((requestType === 'save' && pageingDetails.actionArgs.index >= (counts.count - this.parent.grid.pageSettings.pageSize)) || (requestType === 'refresh' && this.parent['isGantt'] && this.parent['isAddedFromGantt'])) {
                if (this.setEndIndexToGantt) {
                    this.ganttEndIndex = counts.endIndex;
                }
                if ((counts.endIndex + this.parent.pageSettings.pageSize >= counts.count && (this.parent.root && counts.count - this.ganttEndIndex === this.visualData.length - this.parent.root['previousFlatData'].length))
                    || !(this.parent['isGantt'] && this.parent['isAddedFromGantt'])) {
                    startIndex = counts.startIndex + (counts.count - counts.endIndex);
                    endIndex = counts.count;
                    this.setEndIndexToGantt = false;
                }
                this.ganttEndIndex = endIndex;
                this.parent['isAddedFromGantt'] = false;
            }
            //if ((this.prevendIndex !== -1 && this.prevstartIndex !== -1) &&
            //this.prevendIndex === endIndex && this.prevstartIndex === startIndex) {
            var virtualWrapperElement = this.parent.grid.contentModule.virtualEle.wrapper;
            var translateY = getTransformValues(virtualWrapperElement).height;
            if (!isNullOrUndefined(this.expandCollapseRec) && (pageingDetails.actionArgs.requestType === 'virtualscroll' ||
                (pageingDetails.actionArgs.requestType === 'refresh' && startIndex !== this.prevstartIndex)) &&
                (startIndex < this.parent.getRows().length && endIndex <= startIndex + this.parent.getRows().length) && translateY === 0) {
                startIndex = 0;
            }
            if ((pageingDetails.actionArgs.requestType === 'save' && startIndex !== this.prevstartIndex) &&
                (startIndex < this.parent.getRows().length && endIndex <= startIndex + this.parent.getRows().length) && translateY === 0) {
                startIndex = 0;
                endIndex = startIndex + this.parent.grid.pageSettings.pageSize;
            }
            if (!isNullOrUndefined(this.expandCollapseRec)) {
                var resourceCount = this.parent.grid.pageSettings.pageSize;
                var sIndex = visualData.indexOf(this.expandCollapseRec);
                var tempdata = visualData.slice(sIndex, sIndex + resourceCount);
                if (tempdata.length < resourceCount && sIndex >= 0 && startIndex !== 0) {
                    sIndex = visualData.length - resourceCount;
                    sIndex = sIndex > 0 ? sIndex : 0;
                    endIndex = visualData.length;
                    if (endIndex - startIndex < resourceCount) {
                        var newRowsCount = sIndex - startIndex;
                        startIndex = sIndex;
                        if (visualData.indexOf(this.expandCollapseRec) > visualData.length - resourceCount / 2) {
                            var newTranslateY = translateY + (newRowsCount * this.parent.grid.getRowHeight());
                            this.parent.grid.contentModule['translateY'] = newTranslateY;
                            this.parent.grid.contentModule.virtualEle.adjustTable(0, newTranslateY);
                        }
                    }
                }
                else if (getValue('isCollapseAll', this.parent)) {
                    startIndex = 0;
                    endIndex = this.parent.grid.pageSettings.pageSize - 1;
                    this.parent.grid.notify(virtualActionArgs, { setTop: true });
                }
            }
            //}
            if (this.prevrequestType === 'collapseAll' && pageingDetails.actionArgs.requestType === 'virtualscroll'
                && !isNullOrUndefined(this.parent.idMapping) && startIndex === 0) {
                startIndex = 0;
                endIndex = this.parent.grid.pageSettings.pageSize - 1;
                this.parent.grid.notify(virtualActionArgs, { setTop: true });
            }
            if ((this.parent.enableCollapseAll || this.parent.expandStateMapping) && !isNullOrUndefined(this.expandCollapseRec)) {
                if (pageingDetails.count < this.parent.getRows()[0].getBoundingClientRect().height) {
                    startIndex = 0;
                }
                else if (!this.parent['isExpandAll']) {
                    startIndex = this.prevstartIndex === -1 ? 0 : this.prevstartIndex;
                }
            }
            this.expandCollapseRec = null;
            startIndex = startIndex < 0 ? 0 : startIndex;
            if (endIndex === 0 && visualData.length > 0) {
                pageingDetails.result = visualData;
            }
            else {
                pageingDetails.result = visualData.slice(startIndex, endIndex);
            }
            this.prevstartIndex = startIndex;
            this.prevendIndex = endIndex;
            this.prevrequestType = pageingDetails.actionArgs.requestType;
        }
        this.parent.notify('updateAction', pageingDetails);
    };
    /**
     * To destroy the virtualScroll module
     *
     * @returns {void}
     * @hidden
     */
    VirtualScroll.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * Updates the row selection when the header checkbox is clicked and the number of selected rows
     * does not match the current view data length.
     *
     * @param {RowDeselectEventArgs} args - The arguments containing details of the row deselection event.
     * @returns {void} - This method does not return a value.
     */
    VirtualScroll.prototype.updateSelection = function (args) {
        if (args.isHeaderCheckboxClicked &&
            this.parent.grid.currentViewData.length !== this.parent.grid.selectionModule.selectedRowIndexes.length) {
            var updateRowSelection = 'updateRowSelection';
            for (var i = 0; i < this.parent.getRows().length; i++) {
                if (this.parent.getRows()[parseInt(i.toString(), 10)].getElementsByClassName('e-frame e-icons e-uncheck').length) {
                    this.parent.grid.selectionModule["" + updateRowSelection](this.parent.getRows()[parseInt(i.toString(), 10)], 
                    // eslint-disable-next-line max-len
                    this.parent.getCurrentViewRecords()[parseInt(i.toString(), 10)].index);
                }
            }
        }
    };
    return VirtualScroll;
}());
var TreeVirtual = /** @class */ (function (_super) {
    __extends$h(TreeVirtual, _super);
    function TreeVirtual(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        getValue('parent', _this).off('initial-load', getValue('instantiateRenderer', _this), _this);
        getValue('parent', _this).on('initial-load', _this.instantiateRenderers, _this);
        return _this;
    }
    TreeVirtual.prototype.getModuleName = function () {
        return 'treeVirtualScroll';
    };
    TreeVirtual.prototype.instantiateRenderers = function () {
        var parentGrid = getValue('parent', this);
        getValue('parent', this).log(['limitation', 'virtual_height'], 'virtualization');
        var renderer = getValue('locator', this).getService('rendererFactory');
        if (parentGrid.enableColumnVirtualization) {
            getValue('addRenderer', renderer)
                .apply(renderer, [RenderType.Header, new VirtualHeaderRenderer(getValue('parent', this), getValue('locator', this))]);
        }
        getValue('addRenderer', renderer)
            .apply(renderer, [RenderType.Content, new VirtualTreeContentRenderer(getValue('parent', this), getValue('locator', this))]);
        this.ensurePageSize();
    };
    TreeVirtual.prototype.ensurePageSize = function () {
        var parentGrid = getValue('parent', this);
        var rowHeight = parentGrid.getRowHeight();
        if (!isNullOrUndefined(parentGrid.height) && typeof (parentGrid.height) === 'string' && parentGrid.height.indexOf('%') !== -1) {
            parentGrid.element.style.height = parentGrid.height;
        }
        var vHeight = parentGrid.height.toString().indexOf('%') < 0 ? parseInt(parentGrid.height.toString(), 10) :
            parentGrid.element.getBoundingClientRect().height;
        var blockSize = ~~(vHeight / rowHeight);
        var height = blockSize * 2;
        var size = parentGrid.pageSettings.pageSize;
        parentGrid.setProperties({ pageSettings: { pageSize: size < height ? height : size } }, true);
    };
    return TreeVirtual;
}(VirtualScroll$1));

/**
 * TreeGrid Freeze module
 *
 * @hidden
 */
var Freeze = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Freeze(parent) {
        Grid.Inject(Freeze$1);
        this.parent = parent;
        this.addEventListener();
    }
    Freeze.prototype.addEventListener = function () {
        this.parent.on('rowExpandCollapse', this.rowExpandCollapse, this);
        this.parent.on('dataBoundArg', this.dataBoundArg, this);
        this.parent.grid.on('dblclick', this.dblClickHandler, this);
    };
    Freeze.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('rowExpandCollapse', this.rowExpandCollapse);
        this.parent.off('dataBoundArg', this.dataBoundArg);
        this.parent.grid.off('dblclick', this.dblClickHandler);
    };
    Freeze.prototype.rowExpandCollapse = function (args) {
        var movableRows = this.parent.getDataRows();
        var frozenrows = this.parent.getRows();
        var rows;
        var frozenRightRows;
        var freeze = (this.parent.getFrozenLeftColumnsCount() > 0 ||
            this.parent.getFrozenRightColumnsCount() > 0) ? true : false;
        if (freeze) {
            frozenRightRows = this.parent.getRows().filter(function (e) {
                return e.querySelector('.e-gridrowindex' + args.record.index + 'level' + (args.record.level + 1));
            });
        }
        if (!args.detailrows.length) {
            rows = movableRows.filter(function (e) {
                return e.querySelector('.e-gridrowindex' + args.record.index + 'level' + (args.record.level + 1));
            });
        }
        else {
            rows = args.detailrows;
        }
        for (var i = 0; i < rows.length; i++) {
            var row = rows[parseInt(i.toString(), 10)];
            var rData = this.parent.grid.getRowObjectFromUID(row.getAttribute('data-Uid')).data;
            if (!isNullOrUndefined(movableRows) && row.parentElement.firstElementChild.clientHeight > 0) {
                row.style.height = row.parentElement.firstElementChild.clientHeight + 'px';
            }
            this.parent['toggleRowVisibility'](row, args.action);
            if (freeze && frozenRightRows.length) {
                this.parent['toggleRowVisibility'](frozenRightRows[parseInt(i.toString(), 10)], args.action);
            }
            var queryselector = args.action === 'e-childrow-hidden' ? '.e-treecolumn-container .e-treegridcollapse'
                : '.e-treecolumn-container .e-treegridexpand';
            if (frozenrows[row.rowIndex].querySelector(queryselector)) {
                var cRow = [];
                for (var i_1 = 0; i_1 < movableRows.length; i_1++) {
                    if (movableRows[parseInt(i_1.toString(), 10)].querySelector('.e-gridrowindex' + rData.index + 'level' + (rData.level + 1))) {
                        cRow.push(movableRows[parseInt(i_1.toString(), 10)]);
                    }
                }
                if (cRow.length) {
                    var data = this.parent.getCurrentViewRecords()[cRow[0].rowIndex];
                    this.rowExpandCollapse({ detailrows: cRow, action: args.action, record: data });
                }
            }
        }
    };
    Freeze.prototype.dblClickHandler = function (e) {
        if (parentsUntil(e.target, 'e-rowcell') &&
            this.parent.grid.editSettings.allowEditOnDblClick && this.parent.editSettings.mode !== 'Cell' && (!e.target['classList'].contains('e-treegridcollapse') && !e.target['classList'].contains('e-treegridexpand'))) {
            this.parent.startEdit(parentsUntil(e.target, 'e-row'));
        }
    };
    Freeze.prototype.dataBoundArg = function () {
        var checkboxColumn = this.parent.getColumns().filter(function (e) {
            return e.showCheckbox;
        });
        if (checkboxColumn.length && this.parent.freezeModule && this.parent.initialRender) {
            addClass([this.parent.element.getElementsByClassName('e-grid')[0]], 'e-checkselection');
        }
    };
    Freeze.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns Freeze module name
     */
    Freeze.prototype.getModuleName = function () {
        return 'freeze';
    };
    return Freeze;
}());

/**
 * TreeGrid ColumnChooser module
 *
 * @hidden
 */
var ColumnChooser = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {TreeGrid} parent - Tree Grid instance.
     */
    function ColumnChooser(parent) {
        Grid.Inject(ColumnChooser$1);
        this.parent = parent;
    }
    /**
     * Column chooser can be displayed on screen by given position(X and Y axis).
     *
     * @param  {number} X - Defines the X axis.
     * @param  {number} Y - Defines the Y axis.
     * @returns {void}
     */
    ColumnChooser.prototype.openColumnChooser = function (X, Y) {
        return this.parent.grid.columnChooserModule.openColumnChooser(X, Y);
    };
    /**
     * Destroys the openColumnChooser.
     *
     * @function destroy
     * @returns {void}
     */
    ColumnChooser.prototype.destroy = function () {
        //this.parent.grid.ColumnChooserModule.destroy();
    };
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns ColumnChooser module name
     */
    ColumnChooser.prototype.getModuleName = function () {
        return 'ColumnChooser';
    };
    return ColumnChooser;
}());

/**
 * TreeGrid Infinite Scroll module will handle Infinite Scrolling.
 *
 * @hidden
 */
var InfiniteScroll = /** @class */ (function () {
    /**
     * Constructor for VirtualScroll module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function InfiniteScroll(parent) {
        this.parent = parent;
        Grid.Inject(InfiniteScroll$1);
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} - Returns Logger module name
     */
    InfiniteScroll.prototype.getModuleName = function () {
        return 'infiniteScroll';
    };
    /**
     * @hidden
     * @returns {void}
     */
    InfiniteScroll.prototype.addEventListener = function () {
        this.parent.on(pagingActions, this.infinitePageAction, this);
        this.parent.on('infinite-remote-expand', this.infiniteRemoteExpand, this);
        this.parent.grid.on('delete-complete', this.infiniteDeleteHandler, this);
        this.parent.grid.on('infinite-edit-handler', this.infiniteEditHandler, this);
        this.parent.grid.on('infinite-crud-cancel', this.createRows, this);
        this.parent.grid.on('content-ready', this.contentready, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    InfiniteScroll.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('infinite-remote-expand', this.infiniteRemoteExpand);
        this.parent.grid.off('delete-complete', this.infiniteDeleteHandler);
        this.parent.grid.off('infinite-edit-handler', this.infiniteEditHandler);
        this.parent.off(pagingActions, this.infinitePageAction);
        this.parent.grid.off('infinite-crud-cancel', this.createRows);
        this.parent.grid.off('content-ready', this.contentready);
    };
    /**
     * Handles the Expand Collapse action for Remote data with infinite scrolling.
     *
     * @param {{ index: number, childData: ITreeData[] }} args - expanded row index and its child data
     * @param { number } args.index - expanded row index
     * @param { ITreeData[] } args.childData - child data of expanded row
     * @returns {void}
     */
    InfiniteScroll.prototype.infiniteRemoteExpand = function (args) {
        var rowObjects = this.parent.grid.getRowsObject();
        var locator = 'serviceLocator';
        var generateRows = 'generateRows';
        var serviceLocator = this.parent.grid.infiniteScrollModule["" + locator];
        var rowRenderer = new RowRenderer(serviceLocator, null, this.parent.grid);
        var rows = this.parent.getRows();
        var position = args.index === rows.length - 1 ? 'after' : 'before';
        var cols = this.parent.grid.getColumns();
        var childRowObjects = this.parent.grid.infiniteScrollModule["" + generateRows](args.childData, args);
        var childRowElements = [];
        for (var i = 0; i < childRowObjects.length; i++) {
            childRowElements.push(rowRenderer.render(childRowObjects[parseInt(i.toString(), 10)], cols));
        }
        rowObjects.splice.apply(rowObjects, [args.index + 1, 0].concat(childRowObjects));
        for (var i = 0; i < childRowElements.length; i++) {
            if (position === 'after') {
                rows[args.index + i]["" + position](childRowElements[parseInt(i.toString(), 10)]);
            }
            else {
                rows[args.index + i + 1]["" + position](childRowElements[parseInt(i.toString(), 10)]);
            }
            rows.splice(args.index + 1 + i, 0, childRowElements[parseInt(i.toString(), 10)]);
        }
        resetRowIndex(this.parent.grid, this.parent.grid.getRowsObject(), this.parent.grid.getRows(), 0);
    };
    /**
     * Resetted the row index for expand collapse action for cache support.
     *
     * @returns {void}
     */
    InfiniteScroll.prototype.contentready = function () {
        if (this.parent.infiniteScrollSettings.enableCache && !isNullOrUndefined(this.parent.editModule)) {
            var updateIndex = 'updateIndex';
            this.parent.editModule["" + updateIndex](this.parent.grid.dataSource, this.parent.getRows(), this.parent.getCurrentViewRecords());
            if (this.parent.getFrozenColumns()) {
                this.parent.editModule["" + updateIndex](this.parent.grid.dataSource, this.parent.getDataRows(), this.parent.getCurrentViewRecords());
            }
        }
    };
    /**
     * Handles the page query for Data operations and CRUD actions.
     *
     * @param {{ result: ITreeData[], count: number, actionArgs: object }} pageingDetails - data, its count and action details
     * @param {ITreeData[]} pageingDetails.result - data on scroll action
     * @param {number} pageingDetails.count - data count on scroll action
     * @param {Object} pageingDetails.actionArgs - scroll action details
     * @returns {void}
     */
    InfiniteScroll.prototype.infinitePageAction = function (pageingDetails) {
        var dm = new DataManager(pageingDetails.result);
        var expanded = new Predicate$1('expanded', 'notequal', null).or('expanded', 'notequal', undefined);
        var visualData = dm.executeLocal(new Query().where(expanded));
        var actionArgs = getValue('actionArgs', pageingDetails.actionArgs);
        var actions = getValue('actions', this.parent.grid.infiniteScrollModule);
        if (this.parent.grid.infiniteScrollModule['isInitialRender'] && !this.parent.initialRender) {
            this.parent.grid.pageSettings.currentPage = 1;
        }
        var initial = actions.some(function (value) { return value === actionArgs.requestType; });
        var initialRender = initial ? true : this.parent.initialRender ? true : false;
        this.visualData = visualData;
        pageingDetails.count = visualData.length;
        if (getValue('isPrinting', pageingDetails.actionArgs)) {
            pageingDetails.result = visualData;
        }
        else {
            var query = new Query();
            var isCache = this.parent.infiniteScrollSettings.enableCache;
            if (isCache && this.parent.infiniteScrollSettings.initialBlocks > this.parent.infiniteScrollSettings.maxBlocks) {
                this.parent.infiniteScrollSettings.initialBlocks = this.parent.infiniteScrollSettings.maxBlocks;
            }
            var size = initialRender ?
                this.parent.grid.pageSettings.pageSize * this.parent.infiniteScrollSettings.initialBlocks :
                this.parent.grid.pageSettings.pageSize;
            var current = this.parent.grid.pageSettings.currentPage;
            if (!isNullOrUndefined(actionArgs)) {
                var lastIndex = getValue('lastIndex', this.parent.grid.infiniteScrollModule);
                var firstIndex = getValue('firstIndex', this.parent.grid.infiniteScrollModule);
                if (!isCache && actionArgs.requestType === 'delete') {
                    var skip = lastIndex - actionArgs.data.length + 1;
                    var take = actionArgs.data.length;
                    query = query.skip(skip).take(take);
                }
                else if (isCache && actionArgs.requestType === 'delete' ||
                    (actionArgs.requestType === 'save' && actionArgs.action === 'add')) {
                    query = query.skip(firstIndex);
                    query = query.take(this.parent.infiniteScrollSettings.initialBlocks * this.parent.pageSettings.pageSize);
                }
                else {
                    query = query.page(current, size);
                }
            }
            else {
                query = query.page(current, size);
            }
            dm.dataSource.json = visualData;
            if (!isCache && !isNullOrUndefined(actionArgs) && actionArgs.requestType === 'save' && actionArgs.action === 'add') {
                pageingDetails.result = [actionArgs.data];
            }
            else {
                pageingDetails.result = dm.executeLocal(query);
            }
        }
        this.parent.notify('updateAction', pageingDetails);
    };
    /**
     * Handles the currentviewdata for delete operation.
     *
     * @param {{ e: InfiniteScrollArgs, result: Object[] }} args - Scroller and data details
     * @param {InfiniteScrollArgs} args.e -  scroller details while CRUD
     * @param {Object[]} args.result - data details while CRUD
     * @returns {void}
     */
    InfiniteScroll.prototype.infiniteEditHandler = function (args) {
        var infiniteData = 'infiniteCurrentViewData';
        var infiniteCurrentViewData = this.parent.grid.infiniteScrollModule["" + infiniteData];
        var keys = Object.keys(infiniteCurrentViewData);
        if (args.e.requestType === 'delete' && args.result.length > 1) {
            for (var i = 1; i < args.result.length; i++) {
                infiniteCurrentViewData[keys[keys.length - 1]].push(args.result[parseInt(i.toString(), 10)]);
            }
        }
    };
    /**
     * Handles the row objects for delete operation.
     *
     * @param {ActionEventArgs} args - crud action details
     * @returns {void}
     */
    InfiniteScroll.prototype.infiniteDeleteHandler = function (args) {
        if (args.requestType === 'delete') {
            var rows = this.parent.grid.getRowsObject();
            var rowElms = this.parent.getRows();
            var data = args.data instanceof Array ? args.data : [args.data];
            var keyField = this.parent.grid.getPrimaryKeyFieldNames()[0];
            this.removeRows(rowElms, rows, data, keyField, true);
            if (this.parent.getFrozenColumns() > 0) {
                var mRows = this.parent.grid.getRowsObject();
                var mRowElms = this.parent.grid.getRows();
                this.removeRows(mRowElms, mRows, data, keyField);
            }
        }
    };
    /**
     * Handles the row objects for delete operation.
     *
     * @param {Element[]} rowElms - row elements
     * @param {Row<Column>[]} rows - Row object collection
     * @param {Object[]} data - data collection
     * @param {string} keyField - primary key name
     * @param { boolean} isFrozen - Specifies whether frozen column enabled
     * @returns {void}
     */
    InfiniteScroll.prototype.removeRows = function (rowElms, rows, data, keyField, isFrozen) {
        var _this = this;
        var resetInfiniteCurrentViewData = 'resetInfiniteCurrentViewData';
        var _loop_1 = function (i) {
            rows.filter(function (e, index) {
                if (e.data["" + keyField] === data[parseInt(i.toString(), 10)]["" + keyField]) {
                    if (isFrozen) {
                        var page = Math.ceil((index + 1) / _this.parent.grid.pageSettings.pageSize);
                        _this.parent.grid.infiniteScrollModule["" + resetInfiniteCurrentViewData](page, index);
                    }
                    rows.splice(index, 1);
                    remove(rowElms[parseInt(index.toString(), 10)]);
                    rowElms.splice(index, 1);
                }
            });
        };
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * Handles the row objects for Add operation.
     */
    InfiniteScroll.prototype.createRows = function (eventArgs) {
        var locator = 'serviceLocator';
        var actionArgs = eventArgs.args.e;
        var row = eventArgs.row;
        var serviceLocator = this.parent.grid.infiniteScrollModule["" + locator];
        var rowRenderer = new RowRenderer(serviceLocator, null, this.parent.grid);
        var tbody;
        var currentData = this.parent.getCurrentViewRecords();
        var currentRows = eventArgs.isMovable ? this.parent.grid.getRows()
            : this.parent.grid.getDataRows();
        if (eventArgs.isFrozenRight) {
            tbody = this.parent.element.querySelector('.e-frozen-right-content').querySelector('tbody');
        }
        else {
            tbody = !this.parent.grid.isFrozenGrid() ? this.parent.getContent().querySelector('tbody') : eventArgs.isMovable
                ? this.parent.grid.getContent().querySelector('tbody')
                : this.parent.grid.getContent().querySelector('tbody');
        }
        if (this.parent.frozenRows) {
            tbody = eventArgs.isFrozenRows && this.parent.grid.infiniteScrollModule.requestType !== 'add'
                || !eventArgs.isFrozenRows && this.parent.grid.infiniteScrollModule.requestType === 'add'
                ? !this.parent.grid.isFrozenGrid() ? this.parent.getHeaderContent().querySelector('tbody')
                    : eventArgs.isMovable ? this.parent.grid.getHeaderContent().querySelector('tbody')
                        : eventArgs.isFrozenRight ? this.parent.element.querySelector('.e-frozen-right-header').querySelector('tbody')
                            : this.parent.grid.getHeaderContent().querySelector('tbody') : tbody;
        }
        var position;
        var addRowIndex = 'addRowIndex';
        var newRowIndex = this.parent.editModule["" + addRowIndex];
        for (var i = 0; i < row.length; i++) {
            var newRow = rowRenderer.render(row[parseInt(i.toString(), 10)], this.parent.grid.getColumns());
            if (actionArgs.requestType === 'save' && actionArgs.action === 'add') {
                if (getValue('selectedIndex', this.parent.editModule) !== -1 && this.parent.editSettings.newRowPosition !== 'Top') {
                    if (this.parent.editSettings.newRowPosition === 'Below' || this.parent.editSettings.newRowPosition === 'Child') {
                        position = 'after';
                        newRowIndex += findChildrenRecords(currentData[parseInt(newRowIndex.toString(), 10)]).length;
                        if (this.parent.editSettings.newRowPosition === 'Child') {
                            newRowIndex -= 1; //// for child position already child record is added in childRecords so subtracting 1
                        }
                        currentRows[parseInt(newRowIndex.toString(), 10)]["" + position](newRow);
                    }
                    else if (this.parent.editSettings.newRowPosition === 'Above') {
                        position = 'before';
                        currentRows[this.parent.editModule["" + addRowIndex]]["" + position](newRow);
                    }
                }
                else if (this.parent.editSettings.newRowPosition === 'Bottom') {
                    tbody.appendChild(newRow);
                }
                else {
                    tbody.insertBefore(newRow, tbody.firstElementChild);
                }
            }
            else if (actionArgs.requestType === 'delete') {
                tbody.appendChild(newRow);
            }
        }
        eventArgs.cancel = true;
    };
    /**
     * To destroy the infiniteScroll module
     *
     * @returns {void}
     * @hidden
     */
    InfiniteScroll.prototype.destroy = function () {
        this.removeEventListener();
    };
    return InfiniteScroll;
}());

export { Aggregate, AggregateColumn, AggregateRow, Column, ColumnChooser, ColumnMenu, CommandColumn, ContextMenu, ContextMenuItems, DataManipulation, DetailRow, Edit, EditSettings, ExcelExport, Filter, FilterSettings, Freeze, InfiniteScroll, InfiniteScrollSettings, LoadingIndicator, Logger, Page, PageSettings, PdfExport, Predicate, Render, Reorder, Resize, RowDD, RowDropSettings, SearchSettings, Selection, SelectionSettings, Sort, SortDescriptor, SortSettings, StackedColumn, Toolbar, ToolbarItem, TreeClipboard, TreeGrid, TreeGridColumn, TreeVirtual, TreeVirtualRowModelGenerator, VirtualScroll, actionBegin, actionComplete, actionFailure, ariaColIndex, ariaRowIndex, autoCol, batchAdd, batchCancel, batchDelete, batchEditFormRendered, batchSave, beforeBatchAdd, beforeBatchCancel, beforeBatchDelete, beforeBatchSave, beforeCopy, beforeDataBound, beforeExcelExport, beforePaste, beforePdfExport, beforeStartEdit, beginAdd, beginEdit, cellEdit, cellSave, cellSaved, checkboxChange, collapsed, collapsing, content, contextMenuClick, contextMenuOpen, crudAction, dataBound, dataListener, dataStateChange, destroy, detailDataBound, doubleTap, expanded, expanding, extendArray, findChildrenRecords, findParentRecords, frozenContent, frozenHeader, frozenLeft, frozenRight, getExpandStatus, getParentData, getPlainData, headerContent, indexModifier, isCheckboxcolumn, isCountRequired, isFilterChildHierarchy, isHidden, isOffline, isRemoteData, keyPressed, leftRight, load, localPagedExpandCollapse, movableContent, movableHeader, pagingActions, printGridInit, queryCellInfo, recordDoubleClick, remoteExpand, resizeStop, rowDataBound, rowDeselected, rowDeselecting, rowDrag, rowDragStart, rowDragStartHelper, rowDrop, rowDropped, rowSelected, rowSelecting, rowdraging, rowsAdd, rowsRemove, savePreviousRowPosition, table, toolbarClick, treeGridDetails, updateData, virtualActionArgs, virtualColumnIndex };
//# sourceMappingURL=ej2-treegrid.es5.js.map
