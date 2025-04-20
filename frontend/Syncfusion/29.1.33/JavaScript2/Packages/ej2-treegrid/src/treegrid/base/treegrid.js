var __extends = (this && this.__extends) || (function () {
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, addClass, createElement, EventHandler, isNullOrUndefined, extend, merge, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { removeClass, Complex, Collection, getValue } from '@syncfusion/ej2-base';
import { Event, Property, NotifyPropertyChanges, setValue, KeyboardEvents, L10n } from '@syncfusion/ej2-base';
import { Column } from '../models/column';
import { getNumberFormat } from '@syncfusion/ej2-grids';
import { Freeze as FreezeColumn } from '@syncfusion/ej2-grids';
import { RowDropSettings, getUid, parentsUntil } from '@syncfusion/ej2-grids';
import { LoadingIndicator } from '../models/loading-indicator';
import { FilterSettings } from '../models/filter-settings';
import { TextWrapSettings } from '../models/textwrap-settings';
import { Logger as TreeLogger } from '../actions/logger';
import { TreeClipboard } from '../actions/clipboard';
import { Selection as TreeGridSelection } from '../actions/selection';
import { Print } from '../actions/print';
import * as events from '../base/constant';
import { SearchSettings } from '../models/search-settings';
import { SelectionSettings } from '../models/selection-settings';
import { getActualProperties, getObject } from '@syncfusion/ej2-grids';
import { DataManager, RemoteSaveAdaptor, Query, JsonAdaptor, Deferred, UrlAdaptor } from '@syncfusion/ej2-data';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { isRemoteData, isOffline, extendArray, isCountRequired, findChildrenRecords } from '../utils';
import { Grid, Logger } from '@syncfusion/ej2-grids';
import { Render } from '../renderer/render';
import { DataManipulation } from './data';
import { iterateArrayOrObject } from '@syncfusion/ej2-grids';
import { ToolbarItem, ContextMenuItems } from '../enum';
import { PageSettings } from '../models/page-settings';
import { AggregateRow } from '../models/summary';
import { EditSettings } from '../models/edit-settings';
import { SortSettings } from '../models/sort-settings';
import { isHidden, getExpandStatus } from '../utils';
import { editAction } from '../actions/crud-actions';
import { InfiniteScrollSettings } from '../models/infinite-scroll-settings';
import * as literals from '../base/constant';
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
    __extends(TreeGrid, _super);
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
        TreeGrid_1.Inject(TreeGridSelection, TreeLogger);
        setValue('mergePersistData', _this.mergePersistTreeGridData, _this);
        var logger = 'Logger';
        if (!isNullOrUndefined(_this.injectedModules["" + logger])) {
            Grid.Inject(Logger);
        }
        var freezeModulePresent = _this.injectedModules.filter(function (e) {
            if (e.prototype.getModuleName() === 'freeze') {
                Grid.Inject(FreezeColumn);
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
        this.trigger(events.load);
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
            this.trigger(events.actionFailure, failureEventArgs_1);
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
                _this.trigger(events.rowSelecting, args);
            }
        };
        this.grid.rowDeselecting = function (args) {
            _this.IsExpandCollapseClicked(args);
            if (!isNullOrUndefined(args.data) && _this.selectionSettings.persistSelection
                && _this.columnModel.filter(function (col) { return col.type === 'checkbox'; }).length > 0 && isRemoteData(_this)) {
                _this.parentQuery = _this.query.queries.filter(function (q) { return q.e.field === _this.parentIdMapping; });
                _this.query.queries = _this.query.queries.slice(0, 0);
            }
            _this.trigger(events.rowDeselecting, args);
        };
        this.grid.rowSelected = function (args) {
            if (_this.enableVirtualization) {
                _this.virtualScrollModule.updateSelection(args);
            }
            _this.selectedRowIndex = _this.grid.selectedRowIndex;
            _this.notify(events.rowSelected, args);
            _this.trigger(events.rowSelected, args);
        };
        this.grid.rowDeselected = function (args) {
            _this.selectedRowIndex = _this.grid.selectedRowIndex;
            if (!isNullOrUndefined(args.data)) {
                _this.notify(events.rowDeselected, args);
            }
            _this.trigger(events.rowDeselected, args);
        };
        this.grid.resizeStop = function (args) {
            _this.updateColumnModel();
            _this.trigger(events.resizeStop, args);
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
            _this.trigger(events.checkboxChange, args);
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
            _this.trigger(events.beforePaste, args);
        };
        this.grid.load = function () {
            _this.grid.on('initial-end', _this.afterGridRender, _this);
            if (!isNullOrUndefined(_this.loggerModule)) {
                var loggerModule = 'loggerModule';
                _this.loggerModule = _this.grid["" + loggerModule] = new TreeLogger(_this.grid);
            }
        };
        this.grid.printComplete = this.triggerEvents.bind(this);
        this.grid.actionFailure = function (args) {
            _this.trigger(events.actionFailure, args);
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
            _this.trigger(events.dataBound, args);
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
            extend(args, treeGrid.dataResults);
            if (treeGrid.enableImmutableMode) {
                args.result = args.result.slice();
            }
            if (treeGrid.initialRender) {
                this.contentModule.objectEqualityChecker = treeGrid.objectEqualityChecker;
            }
            // treeGrid.notify(events.beforeDataBound, args);
            if (!this.isPrinting) {
                var callBackPromise_1 = new Deferred();
                treeGrid.trigger(events.beforeDataBound, args, function (beforeDataBoundArgs) {
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
            _this.trigger(events.toolbarClick, args, function (toolbarargs) {
                if (!toolbarargs.cancel) {
                    _this.notify(events.toolbarClick, args);
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
            _this.trigger(events.beginEdit, args, function (begineditArgs) {
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
                _this.trigger(events.dataStateChange, args);
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
            _this.trigger(events.cellSave, args, function (cellsaveArgs) {
                if (!cellsaveArgs.cancel) {
                    _this.notify(events.cellSave, cellsaveArgs);
                }
                callBackPromise.resolve(cellsaveArgs);
            });
            return callBackPromise;
        };
        this.grid.cellSaved = function (args) {
            _this.trigger(events.cellSaved, args);
            _this.notify(events.cellSaved, args);
        };
        this.grid.cellEdit = function (args) {
            var prom = 'promise';
            var promise = new Deferred();
            args["" + prom] = promise;
            _this.notify(events.cellEdit, args);
            return promise;
        };
        this.grid.batchAdd = function (args) {
            _this.trigger(events.batchAdd, args);
            _this.notify(events.batchAdd, args);
        };
        this.grid.beforeBatchSave = function (args) {
            _this.trigger(events.beforeBatchSave, args);
            _this.notify(events.beforeBatchSave, args);
        };
        this.grid.beforeBatchAdd = function (args) {
            _this.trigger(events.beforeBatchAdd, args);
            _this.notify(events.beforeBatchAdd, args);
        };
        this.grid.batchDelete = function (args) {
            _this.trigger(events.batchDelete, args);
            _this.notify(events.batchDelete, args);
        };
        this.grid.beforeBatchDelete = function (args) {
            _this.trigger(events.beforeBatchDelete, args);
            _this.notify(events.beforeBatchDelete, args);
        };
        this.grid.batchCancel = function (args) {
            if (_this.editSettings.mode !== 'Cell') {
                _this.trigger(events.batchCancel, args);
            }
            _this.notify(events.batchCancel, args);
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
                _this.trigger(events.actionBegin, args, function (actionArgs) {
                    if (!actionArgs.cancel) {
                        _this.notify(events.beginEdit, actionArgs);
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
                _this.notify(events.beginAdd, args);
            }
            if (args.requestType === 'batchsave') {
                _this.notify(events.batchSave, args);
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
                _this.trigger(events.actionComplete, actionArgs);
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
                    var movableContent = _this.grid.element.querySelector('.' + literals.movableContent);
                    var frozenContent = _this.grid.element.querySelector('.' + literals.frozenContent);
                    movableContent.style.height = frozenContent.style.height = 'auto';
                }
                _this.trigger(events.actionComplete, args);
            }
        };
    };
    TreeGrid.prototype.extendedGridEvents = function () {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var treeGrid = this;
        this.grid.recordDoubleClick = function (args) {
            _this.trigger(events.recordDoubleClick, args);
            _this.notify(events.recordDoubleClick, args);
        };
        this.grid.detailDataBound = function (args) {
            _this.notify('detaildataBound', args);
            _this.trigger(events.detailDataBound, args);
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
            _this.notify(events.contextMenuClick, args);
            _this.trigger(events.contextMenuClick, args);
        };
        this.grid.contextMenuOpen = function (args) {
            _this.notify(events.contextMenuOpen, args);
            _this.trigger(events.contextMenuOpen, args);
        };
        this.grid.queryCellInfo = function (args) {
            _this.renderModule.cellRender(args);
        };
    };
    TreeGrid.prototype.bindGridDragEvents = function () {
        var _this = this;
        this.grid.rowDragStartHelper = function (args) {
            _this.trigger(events.rowDragStartHelper, args);
        };
        this.grid.rowDragStart = function (args) {
            _this.trigger(events.rowDragStart, args);
        };
        this.grid.rowDrag = function (args) {
            if (_this.grid.isEdit) {
                args.cancel = true;
                return;
            }
            _this.notify(events.rowdraging, args);
            _this.trigger(events.rowDrag, args);
        };
        this.grid.rowDrop = function (args) {
            if (_this.grid.isEdit) {
                args.cancel = true;
                return;
            }
            _this.notify(events.rowDropped, args);
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
                extend(griddata, data);
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
            this.trigger(events.actionFailure, { error: error });
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
            this.trigger(events.actionFailure, { error: error });
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
                this.trigger(events.expanding, args, function (expandingArgs) {
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
            this.trigger(events.expanding, args, function (expandingArgs) {
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
                this.trigger(events.expanded, expandArgs);
            }
            else if (!this.isExpandAll && this.enableVirtualization && this.selectionSettings.persistSelection
                && !isNullOrUndefined(this.virtualScrollModule.prevSelectedRecord)) {
                this.virtualScrollModule.prevSelectedRecord = [];
            }
            else if (!this.isExpandAll) {
                this.trigger(events.expanded, expandArgs);
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
                this.trigger(events.collapsing, args, function (collapsingArgs) {
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
            this.trigger(events.collapsing, args, function (collapsingArgs) {
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
                this.trigger(events.collapsed, collapseArgs);
            }
            else if (!this.isCollapseAll) {
                this.trigger(events.collapsed, collapseArgs);
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
            this.trigger(events.actionFailure, { error: error });
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
            this.trigger(events.actionFailure, { error: error });
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
            this.notify(events.localPagedExpandCollapse, { action: action, row: row, record: record });
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
        this.trigger(events.dataStateChange, expandingArgs);
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
                        childData[parseInt(i.toString(), 10)].parentItem = extend({}, record);
                        childData[parseInt(i.toString(), 10)].taskData = extend({}, childData[parseInt(i.toString(), 10)]);
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
            _this.trigger(events.expanded, expandingArgs);
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
            this.notify(events.remoteExpand, { record: record, rows: rows, parentRow: row });
            var args_1 = { row: row, data: record };
            if (rows.length > 0) {
                this.trigger(events.expanded, args_1);
            }
        }
        else if (action === 'collapse' && this.enableVirtualization) {
            this.dataModule["" + fetchRemoteChildData]({ action: action, record: args.data, rows: null, parentRow: args.row });
        }
        else {
            this.collapseRemoteChild({ record: record, rows: rows });
            this.trigger(events.collapsed, args);
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
    __decorate([
        Property(0)
    ], TreeGrid.prototype, "frozenRows", void 0);
    __decorate([
        Property(0)
    ], TreeGrid.prototype, "frozenColumns", void 0);
    __decorate([
        Property('Ellipsis')
    ], TreeGrid.prototype, "clipMode", void 0);
    __decorate([
        Property([])
    ], TreeGrid.prototype, "columns", void 0);
    __decorate([
        Property(null)
    ], TreeGrid.prototype, "childMapping", void 0);
    __decorate([
        Property(null)
    ], TreeGrid.prototype, "hasChildMapping", void 0);
    __decorate([
        Property(0)
    ], TreeGrid.prototype, "treeColumnIndex", void 0);
    __decorate([
        Property(null)
    ], TreeGrid.prototype, "idMapping", void 0);
    __decorate([
        Property(null)
    ], TreeGrid.prototype, "parentIdMapping", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "enableCollapseAll", void 0);
    __decorate([
        Property(null)
    ], TreeGrid.prototype, "expandStateMapping", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "allowRowDragAndDrop", void 0);
    __decorate([
        Property([])
    ], TreeGrid.prototype, "dataSource", void 0);
    __decorate([
        Property()
    ], TreeGrid.prototype, "query", void 0);
    __decorate([
        Property()
    ], TreeGrid.prototype, "cloneQuery", void 0);
    __decorate([
        Property('AllPages')
    ], TreeGrid.prototype, "printMode", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "allowPaging", void 0);
    __decorate([
        Property(true)
    ], TreeGrid.prototype, "loadChildOnDemand", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "allowTextWrap", void 0);
    __decorate([
        Complex({}, TextWrapSettings)
    ], TreeGrid.prototype, "textWrapSettings", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "allowReordering", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "allowResizing", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "autoCheckHierarchy", void 0);
    __decorate([
        Complex({}, PageSettings)
    ], TreeGrid.prototype, "pageSettings", void 0);
    __decorate([
        Complex({}, RowDropSettings)
    ], TreeGrid.prototype, "rowDropSettings", void 0);
    __decorate([
        Property('USD')
    ], TreeGrid.prototype, "currencyCode", void 0);
    __decorate([
        Property()
    ], TreeGrid.prototype, "pagerTemplate", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "showColumnMenu", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "showColumnChooser", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "allowSorting", void 0);
    __decorate([
        Property(true)
    ], TreeGrid.prototype, "allowMultiSorting", void 0);
    __decorate([
        Complex({}, SortSettings)
    ], TreeGrid.prototype, "sortSettings", void 0);
    __decorate([
        Collection([], AggregateRow)
    ], TreeGrid.prototype, "aggregates", void 0);
    __decorate([
        Complex({}, EditSettings)
    ], TreeGrid.prototype, "editSettings", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "allowFiltering", void 0);
    __decorate([
        Property()
    ], TreeGrid.prototype, "detailTemplate", void 0);
    __decorate([
        Complex({}, FilterSettings)
    ], TreeGrid.prototype, "filterSettings", void 0);
    __decorate([
        Complex({}, SearchSettings)
    ], TreeGrid.prototype, "searchSettings", void 0);
    __decorate([
        Property()
    ], TreeGrid.prototype, "toolbar", void 0);
    __decorate([
        Property()
    ], TreeGrid.prototype, "toolbarTemplate", void 0);
    __decorate([
        Property('Default')
    ], TreeGrid.prototype, "gridLines", void 0);
    __decorate([
        Property()
    ], TreeGrid.prototype, "contextMenuItems", void 0);
    __decorate([
        Property()
    ], TreeGrid.prototype, "columnMenuItems", void 0);
    __decorate([
        Property()
    ], TreeGrid.prototype, "rowTemplate", void 0);
    __decorate([
        Property('Parent')
    ], TreeGrid.prototype, "copyHierarchyMode", void 0);
    __decorate([
        Property(null)
    ], TreeGrid.prototype, "rowHeight", void 0);
    __decorate([
        Property(true)
    ], TreeGrid.prototype, "enableAltRow", void 0);
    __decorate([
        Property(true)
    ], TreeGrid.prototype, "allowKeyboard", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "enableHover", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "enableAutoFill", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "enableAdaptiveUI", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "enableImmutableMode", void 0);
    __decorate([
        Property('auto')
    ], TreeGrid.prototype, "height", void 0);
    __decorate([
        Property('auto')
    ], TreeGrid.prototype, "width", void 0);
    __decorate([
        Complex({}, LoadingIndicator)
    ], TreeGrid.prototype, "loadingIndicator", void 0);
    __decorate([
        Property(true)
    ], TreeGrid.prototype, "enableVirtualMaskRow", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "enableVirtualization", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "enableColumnVirtualization", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "enableInfiniteScrolling", void 0);
    __decorate([
        Complex({}, InfiniteScrollSettings)
    ], TreeGrid.prototype, "infiniteScrollSettings", void 0);
    __decorate([
        Property('All')
    ], TreeGrid.prototype, "columnQueryMode", void 0);
    __decorate([
        Property(true)
    ], TreeGrid.prototype, "allowSelection", void 0);
    __decorate([
        Property(-1)
    ], TreeGrid.prototype, "selectedRowIndex", void 0);
    __decorate([
        Complex({}, SelectionSettings)
    ], TreeGrid.prototype, "selectionSettings", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "allowExcelExport", void 0);
    __decorate([
        Property(false)
    ], TreeGrid.prototype, "allowPdfExport", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "created", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "load", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "expanding", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "expanded", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "collapsing", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "collapsed", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "cellSave", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "cellSaved", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "beginEdit", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "batchAdd", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "batchDelete", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "batchCancel", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "beforeBatchAdd", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "beforeBatchDelete", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "beforeBatchSave", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "cellEdit", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "dataSourceChanged", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "dataStateChange", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "recordDoubleClick", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "rowDataBound", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "detailDataBound", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "queryCellInfo", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "rowSelecting", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "rowSelected", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "rowDeselecting", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "rowDeselected", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "headerCellInfo", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "cellSelecting", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "columnMenuOpen", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "columnMenuClick", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "cellSelected", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "cellDeselecting", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "cellDeselected", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "resizeStart", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "columnDragStart", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "columnDrag", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "columnDrop", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "checkboxChange", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "printComplete", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "beforePrint", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "toolbarClick", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "beforeDataBound", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "contextMenuOpen", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "contextMenuClick", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "beforeCopy", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "beforePaste", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "rowDrag", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "rowDragStart", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "rowDragStartHelper", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "rowDrop", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "pdfQueryCellInfo", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "pdfHeaderQueryCellInfo", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "excelQueryCellInfo", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "excelHeaderQueryCellInfo", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "beforeExcelExport", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "excelExportComplete", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "beforePdfExport", void 0);
    __decorate([
        Event()
    ], TreeGrid.prototype, "pdfExportComplete", void 0);
    TreeGrid = TreeGrid_1 = __decorate([
        NotifyPropertyChanges
    ], TreeGrid);
    return TreeGrid;
}(Component));
export { TreeGrid };
