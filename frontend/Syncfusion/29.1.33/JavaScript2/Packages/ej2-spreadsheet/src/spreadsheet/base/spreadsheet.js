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
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../../workbook/base/workbook-model.d.ts'/>
import { Property, NotifyPropertyChanges, Event, isUndefined, attributes } from '@syncfusion/ej2-base';
import { addClass, removeClass, Complex, formatUnit, L10n, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { detach, select, closest, setStyleAttribute, EventHandler, getComponent } from '@syncfusion/ej2-base';
import { mouseDown, spreadsheetDestroyed, keyUp, clearViewer, refreshSheetTabs, positionAutoFillElement, readonlyAlert, deInitProperties, isColumnRange, isRowRange } from '../common/index';
import { performUndoRedo, overlay, createImageElement, deleteImage, removeHyperlink } from '../common/index';
import { sheetNameUpdate, updateUndoRedoCollection, getUpdateUsingRaf, setAutoFit } from '../common/index';
import { actionEvents, keyDown, enableFileMenuItems, hideToolbarItems, updateAction } from '../common/index';
import { colWidthChanged, rowHeightChanged, hideRibbonTabs, addFileMenuItems, getSiblingsHeight } from '../common/index';
import { defaultLocale, locale, setResize, initiateFilterUI, clearFilter, focus, removeDesignChart } from '../common/index';
import { ribbon, formulaBar, sheetTabs, formulaOperation, addRibbonTabs } from '../common/index';
import { addContextMenuItems, removeContextMenuItems, enableContextMenuItems, selectRange, addToolbarItems } from '../common/index';
import { cut, copy, paste, dialog, editOperation, activeSheetChanged, refreshFormulaDatasource } from '../common/index';
import { Render } from '../renderer/render';
import { Scroll, VirtualScroll, Edit, CellFormat, Selection, KeyboardNavigation, KeyboardShortcut, WrapText } from '../actions/index';
import { Clipboard, ShowHide, UndoRedo, SpreadsheetHyperlink, Resize, Insert, Delete, FindAndReplace, Merge, AutoFill, SpreadsheetNote } from '../actions/index';
import { ProtectSheet } from '../actions/index';
import { click, hideFileMenuItems } from '../common/index';
import { Dialog, ActionEvents, Overlay } from '../services/index';
import { ServiceLocator } from '../../workbook/services/index';
import { getColumnsWidth, getSheetIndex, WorkbookHyperlink } from './../../workbook/index';
import { getCellAddress, getColumnHeaderText, getSwapRange, getSheetIndexFromAddress, isReadOnlyCells, updateSortCollection } from './../../workbook/common/index';
import { afterHyperlinkCreate, getColIndex, setLinkModel } from './../../workbook/index';
import { WorkbookInsert, WorkbookDelete, WorkbookMerge } from './../../workbook/index';
import { getSheetNameFromAddress, DataBind, beforeHyperlinkCreate } from './../../workbook/index';
import { sortComplete, dataSourceChanged, isHiddenRow, isHiddenCol } from './../../workbook/index';
import { getSheetIndexFromId, WorkbookEdit, WorkbookOpen, WorkbookSave, WorkbookCellFormat, WorkbookSort, getSheet } from './../../workbook/index';
import { findKeyUp, refreshRibbonIcons, hideShow } from './../../workbook/index';
import { Workbook } from '../../workbook/base/workbook';
import { getRequiredModules, ScrollSettings, enableToolbarItems } from '../common/index';
import { SelectionSettings, getStartEvent, enableRibbonTabs, getDPRValue } from '../common/index';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { setRowHeight, getRowsHeight, getColumnWidth, getRowHeight, getCell, setColumn, setCell, setRow } from './../../workbook/base/index';
import { getRangeIndexes, getIndexesFromAddress, getCellIndexes, WorkbookNumberFormat, WorkbookFormula } from '../../workbook/index';
import { Ribbon, FormulaBar, SheetTabs, Open, ContextMenu, Save, NumberFormat, Formula } from '../integrations/index';
import { Sort, Filter, SpreadsheetImage, SpreadsheetChart } from '../integrations/index';
import { isNumber, getColumn, getRow, WorkbookFilter, refreshInsertDelete } from '../../workbook/index';
import { fltrPrevent } from '@syncfusion/ej2-grids';
import { DataValidation, spreadsheetCreated, showAggregate } from './../index';
import { WorkbookDataValidation, WorkbookConditionalFormat, WorkbookFindAndReplace, WorkbookAutoFill } from '../../workbook/actions/index';
import { findAllValues, getFormattedCellObject } from './../../workbook/common/index';
import { ConditionalFormatting } from '../actions/conditional-formatting';
import { WorkbookImage, WorkbookChart, updateView, focusChartBorder } from '../../workbook/index';
import { WorkbookProtectSheet, isImported } from '../../workbook/index';
import { contentLoaded, completeAction, freeze, refreshOverlayElem, insertDesignChart } from '../common/index';
import { beginAction, sheetsDestroyed, workbookFormulaOperation, getRangeAddress } from './../../workbook/common/index';
import { updateScroll, clearCopy, clearUndoRedoCollection, clearChartBorder, propertyChange } from '../common/index';
import { Print } from '../renderer/print';
/**
 * Represents the Spreadsheet component.
 *
 * ```html
 * <div id='spreadsheet'></div>
 * <script>
 *  let spreadsheetObj = new Spreadsheet();
 *  spreadsheetObj.appendTo('#spreadsheet');
 * </script>
 * ```
 */
var Spreadsheet = /** @class */ (function (_super) {
    __extends(Spreadsheet, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param  {SpreadsheetModel} options - Configures Spreadsheet options.
     * @param  {string|HTMLElement} element - Element to render Spreadsheet.
     */
    function Spreadsheet(options, element) {
        var _this = _super.call(this, options) || this;
        /** @hidden */
        _this.viewport = {
            rowCount: 0, colCount: 0, height: 0, topIndex: 0, leftIndex: 0, width: 0,
            bottomIndex: 0, rightIndex: 0, beforeFreezeHeight: 0, beforeFreezeWidth: 0, scaleX: 1, scaleY: 1
        };
        _this.needsID = true;
        Spreadsheet_1.Inject(Ribbon, FormulaBar, SheetTabs, Selection, Edit, KeyboardNavigation, KeyboardShortcut, Clipboard, DataBind, Open, ContextMenu, Save, NumberFormat, CellFormat, Formula, WrapText, WorkbookEdit, WorkbookOpen, WorkbookSave, WorkbookCellFormat, WorkbookNumberFormat, WorkbookFormula, Sort, WorkbookSort, Resize, UndoRedo, WorkbookFilter, Filter, SpreadsheetHyperlink, WorkbookHyperlink, Insert, Delete, WorkbookInsert, WorkbookDelete, DataValidation, WorkbookDataValidation, Print, ProtectSheet, WorkbookProtectSheet, FindAndReplace, WorkbookFindAndReplace, Merge, WorkbookMerge, SpreadsheetImage, ConditionalFormatting, WorkbookImage, WorkbookConditionalFormat, SpreadsheetChart, WorkbookChart, AutoFill, WorkbookAutoFill, SpreadsheetNote);
        if (element) {
            _this.appendTo(element);
        }
        return _this;
    }
    Spreadsheet_1 = Spreadsheet;
    /**
     * To get cell element.
     *
     * @param {number} rowIndex - specify the rowIndex.
     * @param {number} colIndex - specify the colIndex.
     * @param {HTMLTableElement} row - specify the row.
     * @returns {HTMLElement} - Get cell element
     * @hidden
     */
    Spreadsheet.prototype.getCell = function (rowIndex, colIndex, row) {
        var td;
        if (this.insideViewport(rowIndex, colIndex)) {
            if (!row) {
                row = this.getRow(rowIndex, null, colIndex);
            }
            colIndex = this.getViewportIndex(colIndex, true);
            td = row ? row.cells[colIndex] : row;
        }
        return td;
    };
    /**
     * Get cell element.
     *
     * @param {number} index - specify the index.
     * @param {HTMLTableElement} table - specify the table.
     * @param {number} colIdx - specify the column index.
     * @returns {HTMLTableRowElement} - Get cell element
     * @hidden
     */
    Spreadsheet.prototype.getRow = function (index, table, colIdx) {
        if (!table) {
            var sheet = this.getActiveSheet();
            var frozenRow = this.frozenRowCount(sheet);
            var frozenCol = this.frozenColCount(sheet);
            if (isNullOrUndefined(colIdx) || index > frozenRow - 1 && colIdx > frozenCol - 1) {
                table = this.getContentTable();
            }
            else {
                table = index < frozenRow && colIdx < frozenCol ? this.sheetModule.getSelectAllTable() : (index < frozenRow ?
                    this.getColHeaderTable() : this.getRowHeaderTable());
            }
        }
        index = this.getViewportIndex(index);
        return table ? table.rows[index] : null;
    };
    /**
     * To get hidden row/column count between two specified index.
     *
     * Set `layout` as `columns` if you want to get column hidden count.
     *
     * @param {number} startIndex - specify the startIndex.
     * @param {number} endIndex - specify the endIndex.
     * @param {string} layout - specify the layout.
     * @param {SheetModel} sheet - specify the sheet.
     * @returns {number} - To get hidden row/column count between two specified index.
     * @hidden
     */
    Spreadsheet.prototype.hiddenCount = function (startIndex, endIndex, layout, sheet) {
        if (layout === void 0) { layout = 'rows'; }
        if (sheet === void 0) { sheet = this.getActiveSheet(); }
        var count = 0;
        var rowColModel;
        for (var i = startIndex; i <= endIndex; i++) {
            rowColModel = sheet["" + layout][i];
            if (rowColModel && rowColModel.hidden) {
                count++;
            }
        }
        return count;
    };
    /**
     * To get row/column viewport index.
     *
     * @param {number} index - specify the index.
     * @param {boolean} isCol - specify the bool value.
     * @returns {number} - To get row/column viewport index.
     * @hidden
     */
    Spreadsheet.prototype.getViewportIndex = function (index, isCol) {
        var sheet = this.getActiveSheet();
        var frozenCol = this.frozenColCount(sheet);
        var frozenRow = this.frozenRowCount(sheet);
        if (isCol) {
            if (frozenCol) {
                var leftIndex = getCellIndexes(sheet.topLeftCell)[1];
                if (index < frozenCol) {
                    index -= this.hiddenCount(leftIndex, index, 'columns');
                    index -= leftIndex;
                    return index + 1;
                }
                else {
                    index -= this.hiddenCount(this.viewport.leftIndex + frozenCol, index, 'columns');
                    index -= (this.viewport.leftIndex + frozenCol);
                    return index;
                }
            }
            else {
                index -= this.hiddenCount(this.viewport.leftIndex, index, 'columns');
                index -= this.viewport.leftIndex;
            }
        }
        else {
            if (frozenRow) {
                var topIndex = getCellIndexes(sheet.topLeftCell)[0];
                if (index < frozenRow) {
                    index -= this.hiddenCount(topIndex, index);
                    index -= topIndex;
                    return index + 1;
                }
                else {
                    index -= this.hiddenCount(this.viewport.topIndex + frozenRow, index);
                    index -= (this.viewport.topIndex + frozenRow);
                    return index;
                }
            }
            else {
                index -= this.hiddenCount(this.viewport.topIndex, index);
                index -= this.viewport.topIndex;
            }
        }
        return index;
    };
    /**
     * To initialize the services;
     *
     * @returns {void} - To initialize the services.
     * @hidden
     */
    Spreadsheet.prototype.preRender = function () {
        _super.prototype.preRender.call(this);
        this.serviceLocator = new ServiceLocator;
        this.initServices();
    };
    Spreadsheet.prototype.initServices = function () {
        this.serviceLocator.register(locale, new L10n(this.getModuleName(), defaultLocale, this.locale));
        this.serviceLocator.register(dialog, new Dialog(this));
        this.serviceLocator.register(actionEvents, new ActionEvents(this));
        this.serviceLocator.register(overlay, new Overlay(this));
    };
    /**
     * To Initialize the component rendering.
     *
     * @returns {void} - To Initialize the component rendering.
     * @hidden
     */
    Spreadsheet.prototype.render = function () {
        _super.prototype.render.call(this);
        this.element.setAttribute('tabindex', '0');
        this.renderModule = new Render(this);
        this.renderSpreadsheet();
        this.wireEvents();
        if (this.created && !this.refreshing) {
            if (this.created.observers) {
                if (this.created.observers.length > 0) {
                    var observerObject = { observers: this.created.observers };
                    if (this.isAngular) {
                        observerObject = { observers: this.created.observers,
                            currentObservers: this.created.observers };
                        this.created.currentObservers = [];
                    }
                    this.createdHandler = observerObject;
                    this.created.observers = [];
                }
            }
            else {
                this.createdHandler = this.created;
                this.setProperties({ created: undefined }, true);
            }
        }
    };
    Spreadsheet.prototype.renderSpreadsheet = function () {
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
        this.setHeight();
        this.setWidth();
        createSpinner({ target: this.element }, this.createElement);
        if (this.cssClass && this.cssClass.indexOf('e-mobile-view') === -1 && this.isMobileView()) {
            this.element.classList.add('e-mobile-view');
        }
        if (Browser.isDevice) {
            this.element.classList.add('e-device');
        }
        this.sheetModule = this.serviceLocator.getService('sheet');
        if (this.allowScrolling) {
            this.scrollModule = new Scroll(this);
        }
        if (this.scrollSettings.enableVirtualization) {
            new VirtualScroll(this);
        }
        this.renderModule.render();
        new ShowHide(this);
    };
    /**
     * By default, Spreadsheet shows the spinner for all its actions. To manually show spinner you this method at your needed time.
     *
     * {% codeBlock src='spreadsheet/showSpinner/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - shows spinner
     */
    Spreadsheet.prototype.showSpinner = function () {
        showSpinner(this.element);
    };
    /**
     * To hide showed spinner manually.
     *
     * {% codeBlock src='spreadsheet/hideSpinner/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - To hide showed spinner manually.
     */
    Spreadsheet.prototype.hideSpinner = function () {
        hideSpinner(this.element);
    };
    /**
     * To protect the particular sheet.
     *
     * {% codeBlock src='spreadsheet/protectSheet/index.md' %}{% endcodeBlock %}
     *
     * @param {number | string} sheet - Specifies the sheet to protect.
     * @param {ProtectSettingsModel} protectSettings - Specifies the protect sheet options.
     * @default { selectCells: 'false', formatCells: 'false', formatRows: 'false', formatColumns:'false', insertLink:'false' }
     * @param {string} password - Specifies the password to protect.
     * @returns {void} - To protect the particular sheet.
     */
    Spreadsheet.prototype.protectSheet = function (sheet, protectSettings, password) {
        _super.prototype.protectSheet.call(this, sheet, protectSettings, password);
    };
    /**
     * To unprotect the particular sheet.
     *
     * {% codeBlock src='spreadsheet/unprotectSheet/index.md' %}{% endcodeBlock %}
     *
     * @param {number | string} sheet - Specifies the sheet name or index to Unprotect.
     * @returns {void} - To unprotect the particular sheet.
     */
    Spreadsheet.prototype.unprotectSheet = function (sheet) {
        _super.prototype.unprotectSheet.call(this, sheet);
    };
    /**
     * To find the specified cell value.
     *
     * {% codeBlock src='spreadsheet/find/index.md' %}{% endcodeBlock %}
     *
     * @param {FindOptions} args - Specifies the replace value with find args to replace specified cell value.
     * @param {string} args.value - Specifies the value to be find.
     * @param {string} args.mode - Specifies the value to be find within sheet or workbook.
     * @param {string} args.searchBy - Specifies the value to be find by row or column.
     * @param {boolean} args.isCSen - Specifies the find match with case sensitive or not.
     * @param {boolean} args.isEMatch - Specifies the find match with entire match or not.
     * @param {string} args.findOpt - Specifies the next or previous find match.
     * @param {number} args.sheetIndex - Specifies the current sheet to find.
     * @default { mode: 'Sheet', searchBy: 'By Row', isCSen: 'false', isEMatch:'false' }
     * @returns {void} - To find the specified cell value.
     */
    Spreadsheet.prototype.find = function (args) {
        var activeCell = this.getActiveSheet().activeCell;
        _super.prototype.findHandler.call(this, args);
        if (!args.isAction) {
            if (activeCell !== this.getActiveSheet().activeCell) {
                return this.getActiveSheet().name + '!' + this.getActiveSheet().activeCell;
            }
            else {
                return null;
            }
        }
    };
    /**
     * To replace the specified cell value.
     *
     * {% codeBlock src='spreadsheet/replace/index.md' %}{% endcodeBlock %}
     *
     * @param {FindOptions} args - Specifies the replace value with find args to replace specified cell value.
     * @param {string} args.replaceValue - Specifies the replacing value.
     * @param {string} args.replaceBy - Specifies the value to be replaced for one or all.
     * @param {string} args.value - Specifies the value to be replaced
     * @returns {void} - To replace the specified cell value.
     */
    Spreadsheet.prototype.replace = function (args) {
        args = {
            value: args.value, mode: args.mode ? args.mode : 'Sheet', isCSen: args.isCSen ? args.isCSen : false,
            isEMatch: args.isEMatch ? args.isEMatch : false, searchBy: args.searchBy ? args.searchBy : 'By Row',
            replaceValue: args.replaceValue, replaceBy: args.replaceBy,
            sheetIndex: isUndefined(args.sheetIndex) ? this.activeSheetIndex : args.sheetIndex, findOpt: args.findOpt ? args.findOpt : ''
        };
        _super.prototype.replaceHandler.call(this, args);
    };
    /**
     * To Find All the Match values Address within Sheet or Workbook.
     *
     * {% codeBlock src='spreadsheet/findAll/index.md' %}{% endcodeBlock %}
     *
     * @param {string} value - Specifies the value to find.
     * @param {string} mode - Specifies the value to be find within Sheet/Workbook.
     * @param {boolean} isCSen - Specifies the find match with case sensitive or not.
     * @param {boolean} isEMatch - Specifies the find match with entire match or not.
     * @param {number} sheetIndex - Specifies the sheetIndex. If not specified, it will consider the active sheet.
     * @returns {string[]} - To Find All the Match values Address within Sheet or Workbook.
     */
    Spreadsheet.prototype.findAll = function (value, mode, isCSen, isEMatch, sheetIndex) {
        mode = mode ? mode : 'Sheet';
        sheetIndex = sheetIndex < this.sheets.length ? sheetIndex : this.activeSheetIndex;
        isCSen = isCSen ? isCSen : false;
        isEMatch = isEMatch ? isEMatch : false;
        var findCollection = [];
        var findAllArguments = {
            value: value, mode: mode, sheetIndex: sheetIndex, isCSen: isCSen,
            isEMatch: isEMatch, findCollection: findCollection
        };
        this.notify(findAllValues, findAllArguments);
        return findCollection;
    };
    /**
     * Used to navigate to cell address within workbook.
     *
     * {% codeBlock src='spreadsheet/goTo/index.md' %}{% endcodeBlock %}
     *
     * @param {string} address - Specifies the cell address you need to navigate.
     * You can specify the address in two formats,
     * `{sheet name}!{cell address}` - Switch to specified sheet and navigate to specified cell address.
     * `{cell address}` - Navigate to specified cell address with in the active sheet.
     * @returns {void} - Used to navigate to cell address within workbook.
     */
    Spreadsheet.prototype.goTo = function (address) {
        if (address.includes('!')) {
            var idx = getSheetIndex(this, getSheetNameFromAddress(address));
            if (idx === undefined) {
                return;
            }
            if (idx !== this.activeSheetIndex) {
                var selectRange_1 = address.substring(address.lastIndexOf('!') + 1);
                var activeCell = selectRange_1.split(':')[0];
                var sheet_1 = this.sheets[idx];
                this.setSheetPropertyOnMute(sheet_1, 'activeCell', activeCell);
                this.setSheetPropertyOnMute(sheet_1, 'selectedRange', selectRange_1);
                var cellIndex = getCellIndexes(activeCell);
                if (sheet_1.frozenColumns || sheet_1.frozenRows) {
                    var topLeftCell = getCellIndexes(sheet_1.topLeftCell);
                    if (!((sheet_1.frozenRows && cellIndex[0] < topLeftCell[0]) || (sheet_1.frozenColumns && cellIndex[1] < topLeftCell[1]))) {
                        var frozenRow_1 = this.frozenRowCount(sheet_1);
                        var frozenCol_1 = this.frozenColCount(sheet_1);
                        var curCell = [];
                        var paneCell = [];
                        var paneTopLeftCell = getCellIndexes(sheet_1.paneTopLeftCell);
                        if (frozenRow_1) {
                            curCell.push(topLeftCell[0]);
                            if (cellIndex[0] >= frozenRow_1) {
                                paneCell.push(cellIndex[0]);
                            }
                            else {
                                paneCell.push(paneTopLeftCell[0]);
                            }
                        }
                        else {
                            curCell.push(cellIndex[0]);
                            paneCell.push(cellIndex[0]);
                        }
                        if (frozenCol_1) {
                            curCell.push(topLeftCell[1]);
                            if (cellIndex[1] >= frozenCol_1) {
                                paneCell.push(cellIndex[1]);
                            }
                            else {
                                paneCell.push(paneTopLeftCell[1]);
                            }
                        }
                        else {
                            curCell.push(cellIndex[1]);
                            paneCell.push(cellIndex[1]);
                        }
                        this.setSheetPropertyOnMute(sheet_1, 'topLeftCell', getCellAddress(curCell[0], curCell[1]));
                        this.setSheetPropertyOnMute(sheet_1, 'paneTopLeftCell', getCellAddress(paneCell[0], paneCell[1]));
                    }
                }
                else {
                    if (cellIndex[0] < this.viewport.rowCount) {
                        cellIndex[0] = 0;
                    }
                    if (cellIndex[1] < this.viewport.colCount) {
                        cellIndex[1] = 0;
                    }
                    this.updateTopLeftCell(cellIndex[0], cellIndex[1], null, sheet_1);
                }
                this.activeSheetIndex = idx;
                this.dataBind();
                return;
            }
        }
        var indexes = getRangeIndexes(address);
        var sheet = this.getActiveSheet();
        var frozenRow = this.frozenRowCount(sheet);
        var frozenCol = this.frozenColCount(sheet);
        var insideDomCount = this.insideViewport(indexes[0], indexes[1]);
        if (insideDomCount) {
            this.selectRange(address);
            var viewportIndexes = getCellIndexes(sheet.paneTopLeftCell);
            var viewportSize = this.viewport.height;
            if (this.allowScrolling) {
                viewportSize -= this.getScrollElement().parentElement.getBoundingClientRect().height;
            }
            var threshold = 0;
            var lastRowIdx = 0;
            if (frozenRow) {
                var topLeftIndexes = getCellIndexes(sheet.topLeftCell);
                for (var i = topLeftIndexes[0]; i < frozenRow; i++) {
                    threshold += getRowHeight(sheet, i);
                    if (threshold > viewportSize) {
                        lastRowIdx = i;
                        break;
                    }
                }
            }
            if (lastRowIdx === 0) {
                for (var i = viewportIndexes[0]; i <= this.viewport.bottomIndex; i++) {
                    threshold += getRowHeight(sheet, i);
                    if (threshold > viewportSize) {
                        lastRowIdx = i;
                        break;
                    }
                    else if (i === this.viewport.bottomIndex) {
                        lastRowIdx = this.viewport.bottomIndex;
                    }
                }
            }
            viewportIndexes[2] = lastRowIdx;
            var lastColIdx = 0;
            threshold = 0;
            viewportSize = this.viewport.width - this.sheetModule.getScrollSize();
            if (frozenCol) {
                var topLeftIndexes = getCellIndexes(sheet.topLeftCell);
                for (var i = topLeftIndexes[1]; i < frozenCol; i++) {
                    threshold += getColumnWidth(sheet, i);
                    if (threshold > viewportSize) {
                        lastColIdx = i;
                        break;
                    }
                }
            }
            if (lastColIdx === 0) {
                for (var i = viewportIndexes[1]; i <= this.viewport.rightIndex; i++) {
                    threshold += getColumnWidth(sheet, i);
                    if (threshold > viewportSize) {
                        lastColIdx = i;
                        break;
                    }
                    else if (i === this.viewport.rightIndex) {
                        lastColIdx = this.viewport.rightIndex;
                    }
                }
            }
            viewportIndexes[3] = lastColIdx;
            if (indexes[0] >= viewportIndexes[0] && indexes[0] < viewportIndexes[2] && indexes[1] >= viewportIndexes[1] &&
                indexes[1] < viewportIndexes[3]) {
                return;
            }
            if (frozenRow || frozenCol) {
                viewportIndexes = [].concat(getCellIndexes(sheet.topLeftCell), [frozenRow, viewportIndexes[3]]);
                if (indexes[0] >= viewportIndexes[0] && indexes[0] < viewportIndexes[2] && indexes[1] >= viewportIndexes[1] &&
                    indexes[1] < viewportIndexes[3]) {
                    return;
                }
                viewportIndexes[2] = lastRowIdx;
                viewportIndexes[3] = frozenCol;
                if (indexes[0] >= viewportIndexes[0] && indexes[0] < viewportIndexes[2] && indexes[1] >= viewportIndexes[1] &&
                    indexes[1] < viewportIndexes[3]) {
                    return;
                }
            }
        }
        var content = this.getMainContent().parentElement;
        var vTrack;
        var cVTrack;
        var offset;
        var vWidth;
        var vHeight;
        var scrollableSize;
        if (indexes[0] === frozenRow) {
            offset = 0;
        }
        else {
            offset = getRowsHeight(sheet, frozenRow, indexes[0] - 1, true);
            if (this.scrollSettings.enableVirtualization) {
                scrollableSize = offset + this.getContentTable().getBoundingClientRect().height;
                vHeight = parseFloat(content.querySelector('.e-virtualtrack').style.height);
                if (scrollableSize > vHeight) {
                    scrollableSize += 10;
                    vTrack = content.querySelector('.e-virtualtrack');
                    vTrack.style.height = scrollableSize + "px";
                    getUpdateUsingRaf(function () { vTrack.style.height = vHeight + "px"; });
                }
            }
        }
        content.scrollTop = offset;
        content = this.element.getElementsByClassName('e-scroller')[0];
        if (indexes[1] === frozenCol) {
            offset = 0;
        }
        else {
            offset = getColumnsWidth(sheet, frozenCol, indexes[1] - 1, true);
            if (this.scrollSettings.enableVirtualization) {
                scrollableSize = offset + this.getContentTable().getBoundingClientRect().width;
                vWidth = parseFloat(content.querySelector('.e-virtualtrack').style.width);
                if (scrollableSize > vWidth) {
                    scrollableSize += 10;
                    vTrack = content.querySelector('.e-virtualtrack');
                    vTrack.style.width = scrollableSize + "px";
                    cVTrack = this.getColumnHeaderContent().querySelector('.e-virtualtrack');
                    cVTrack.style.width = scrollableSize + "px";
                    vTrack = this.getMainContent().querySelector('.e-virtualtrack');
                    vTrack.style.width = scrollableSize + "px";
                    getUpdateUsingRaf(function () {
                        vTrack.style.width = vWidth + "px";
                        cVTrack.style.width = vWidth + "px";
                    });
                }
            }
        }
        content.scrollLeft = offset;
        if (!insideDomCount) {
            this.selectRange(address);
        }
    };
    /**
     * @hidden
     * @param {number} rowIndex - Specifies the row index.
     * @param {number} colIndex - Specifies the column index.
     * @returns {boolean} - Specifies the boolean value.
     */
    Spreadsheet.prototype.insideViewport = function (rowIndex, colIndex) {
        var sheet = this.getActiveSheet();
        if (sheet.frozenRows || sheet.frozenColumns) {
            var frozenRow = this.frozenRowCount(sheet);
            var frozenCol = this.frozenColCount(sheet);
            var indexes = getCellIndexes(sheet.topLeftCell);
            return ((rowIndex >= indexes[0] && rowIndex < frozenRow) || (rowIndex >= this.viewport.topIndex + frozenRow && rowIndex <=
                this.viewport.bottomIndex)) && ((colIndex >= indexes[1] && colIndex < frozenCol) || (colIndex >= this.viewport.leftIndex +
                frozenCol && colIndex <= this.viewport.rightIndex));
        }
        else {
            return rowIndex >= this.viewport.topIndex && rowIndex <= this.viewport.bottomIndex && colIndex >= this.viewport.leftIndex &&
                colIndex <= this.viewport.rightIndex;
        }
    };
    /**
     * Used to resize the Spreadsheet.
     *
     * {% codeBlock src='spreadsheet/resize/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - Used to resize the Spreadsheet.
     */
    Spreadsheet.prototype.resize = function () {
        this.renderModule.setSheetPanelSize();
        if (this.scrollSettings.enableVirtualization) {
            this.renderModule.refreshSheet(false, true);
        }
    };
    /**
     * To cut the specified cell or cells properties such as value, format, style etc...
     *
     * {% codeBlock src='spreadsheet/cut/index.md' %}{% endcodeBlock %}
     *
     * @param {string} address - Specifies the range address to cut.
     * @returns {Promise<Object>} - To cut the specified cell or cells properties such as value, format, style etc...
     */
    Spreadsheet.prototype.cut = function (address) {
        var promise = new Promise(function (resolve) { resolve((function () { })()); });
        this.notify(cut, address ? {
            range: getIndexesFromAddress(address),
            sId: this.sheets[getSheetIndex(this, getSheetNameFromAddress(address))] ?
                this.sheets[getSheetIndex(this, getSheetNameFromAddress(address))].id : this.getActiveSheet().id,
            promise: promise, invokeCopy: true, isPublic: true
        } : { promise: promise, invokeCopy: true, isPublic: true });
        return promise;
    };
    /**
     * To copy the specified cell or cells properties such as value, format, style etc...
     *
     * {% codeBlock src='spreadsheet/copy/index.md' %}{% endcodeBlock %}
     *
     * @param {string} address - Specifies the range address.
     * @returns {Promise<Object>} - To copy the specified cell or cells properties such as value, format, style etc...
     */
    Spreadsheet.prototype.copy = function (address) {
        var promise = new Promise(function (resolve) { resolve((function () { })()); });
        this.notify(copy, address ? {
            range: getIndexesFromAddress(address),
            sId: this.sheets[getSheetIndex(this, getSheetNameFromAddress(address))] ?
                this.sheets[getSheetIndex(this, getSheetNameFromAddress(address))].id : this.getActiveSheet().id,
            promise: promise, invokeCopy: true, isPublic: true
        } : { promise: promise, invokeCopy: true, isPublic: true });
        return promise;
    };
    /**
     * This method is used to paste the cut or copied cells in to specified address.
     *
     * {% codeBlock src='spreadsheet/paste/index.md' %}{% endcodeBlock %}
     *
     * @param {string} address - Specifies the cell or range address.
     * @param {PasteSpecialType} type - Specifies the type of paste.
     * @returns {void} - used to paste the cut or copied cells in to specified address.
     */
    Spreadsheet.prototype.paste = function (address, type) {
        this.notify(paste, {
            range: address ? getIndexesFromAddress(address) : address,
            sIdx: address ? getSheetIndex(this, getSheetNameFromAddress(address)) : address,
            type: type, isAction: true, isInternal: true
        });
    };
    /**
     * To update the action which need to perform.
     *
     * {% codeBlock src='spreadsheet/updateAction/index.md' %}{% endcodeBlock %}
     *
     * @param {string} options - It describes an action and event args to perform.
     * @param {string} options.action - specifies an action.
     * @param {string} options.eventArgs - specifies an args to perform an action.
     * @returns {void} - To update the action which need to perform.
     */
    Spreadsheet.prototype.updateAction = function (options) {
        updateAction(options, this);
    };
    Spreadsheet.prototype.setHeight = function () {
        if (this.height) {
            if (this.height.toString().indexOf('%') > -1) {
                this.element.style.minHeight = '400px';
            }
            this.element.style.height = formatUnit(this.height);
        }
    };
    Spreadsheet.prototype.setWidth = function () {
        if (this.width) {
            if (this.width.toString().indexOf('%') > -1 || this.width === 'auto') {
                this.element.style.minWidth = '300px';
            }
            this.element.style.width = formatUnit(this.width);
        }
    };
    /**
     * Set the width of column.
     *
     * {% codeBlock src='spreadsheet/setColWidth/index.md' %}{% endcodeBlock %}
     *
     * @param {number} width - To specify the width
     * @param {number} colIndex - To specify the colIndex
     * @param {number} sheetIndex - To specify the sheetIndex
     * @returns {void} - Set the width of column.
     */
    Spreadsheet.prototype.setColWidth = function (width, colIndex, sheetIndex) {
        if (width === void 0) { width = 64; }
        if (colIndex === void 0) { colIndex = 0; }
        var sheet = isNullOrUndefined(sheetIndex) ? this.getActiveSheet() : this.sheets[sheetIndex];
        if (sheet && (!sheet.isProtected || sheet.protectSettings.formatColumns)) {
            var mIndex_1 = colIndex;
            var colWidth_1 = (typeof width === 'number') ? width + 'px' : width;
            colIndex = isNullOrUndefined(colIndex) ? getCellIndexes(sheet.activeCell)[1] : colIndex;
            var setColModel = function () {
                getColumn(sheet, mIndex_1).width = parseInt(colWidth_1, 10) > 0 ? parseInt(colWidth_1, 10) : 0;
                sheet.columns[mIndex_1].customWidth = true;
            };
            var frozenCol = this.frozenColCount(sheet);
            if (sheet.id === this.getActiveSheet().id) {
                if ((colIndex >= this.viewport.leftIndex + frozenCol && colIndex <= this.viewport.rightIndex) ||
                    (frozenCol && colIndex < frozenCol)) {
                    colIndex = this.getViewportIndex(colIndex, true);
                    var eleWidth = getColumnWidth(sheet, mIndex_1, null, true);
                    var threshold = getDPRValue(parseInt(colWidth_1, 10)) - eleWidth;
                    if (threshold < 0 && eleWidth < -(threshold)) {
                        threshold = -eleWidth;
                    }
                    setColModel();
                    this.notify(colWidthChanged, { threshold: threshold, colIdx: mIndex_1, checkWrapCell: true });
                    setResize(mIndex_1, colIndex, colWidth_1, true, this);
                }
                else {
                    var oldWidth = getColumnWidth(sheet, colIndex);
                    var threshold = void 0;
                    if (parseInt(colWidth_1, 10) > 0) {
                        threshold = -(oldWidth - parseInt(colWidth_1, 10));
                    }
                    else {
                        threshold = -oldWidth;
                    }
                    setColModel();
                    this.notify(colWidthChanged, { threshold: threshold, colIdx: colIndex });
                }
                this.notify(positionAutoFillElement, null);
            }
            else {
                setColModel();
            }
        }
    };
    /**
     * Set the height of row.
     *
     * {% codeBlock src='spreadsheet/setRowHeight/index.md' %}{% endcodeBlock %}
     *
     * @param {number} height - Specifies height needs to be updated. If not specified, it will set the default height 20.
     * @param {number} rowIndex - Specifies the row index. If not specified, it will consider the first row.
     * @param {number} sheetIndex - Specifies the sheetIndex. If not specified, it will consider the active sheet.
     * @param {boolean} edited - Specifies the boolean value.
     * @param {boolean} skipCustomRow - When this parameter is enabled, the method will skip updating the row height if it has already been modified and its 'customHeight' property is set to true.
     * @returns {void} - Set the height of row.
     */
    Spreadsheet.prototype.setRowHeight = function (height, rowIndex, sheetIndex, edited, skipCustomRow) {
        if (height === void 0) { height = 20; }
        if (rowIndex === void 0) { rowIndex = 0; }
        var sheet = isNullOrUndefined(sheetIndex) ? this.getActiveSheet() : this.sheets[sheetIndex];
        if (sheet) {
            var mIndex_2 = rowIndex;
            rowIndex = isNullOrUndefined(rowIndex) ? getCellIndexes(sheet.activeCell)[0] : rowIndex;
            if (skipCustomRow && sheet.rows[rowIndex] && sheet.rows[rowIndex].customHeight) {
                return;
            }
            var rowHeight_1 = (typeof height === 'number') ? height + 'px' : height;
            var setRowModel = function () {
                setRowHeight(sheet, mIndex_2, parseInt(rowHeight_1, 10) > 0 ? parseInt(rowHeight_1, 10) : 0);
                sheet.rows[mIndex_2].customHeight = true;
            };
            if (sheet.id === this.getActiveSheet().id) {
                var frozenRow = this.frozenRowCount(sheet);
                if ((rowIndex >= this.viewport.topIndex + frozenRow && rowIndex <= this.viewport.bottomIndex) ||
                    (frozenRow && rowIndex < frozenRow)) {
                    rowIndex = this.getViewportIndex(mIndex_2);
                    var eleHeight = getRowHeight(sheet, mIndex_2, true);
                    var threshold = getDPRValue(parseInt(rowHeight_1, 10)) - eleHeight;
                    if (threshold < 0 && eleHeight < -(threshold)) {
                        threshold = -eleHeight;
                    }
                    setRowModel();
                    this.notify(rowHeightChanged, { threshold: threshold, rowIdx: mIndex_2, isCustomHgt: true });
                    if (isNullOrUndefined(edited)) {
                        edited = false;
                    }
                    if (!edited) {
                        setResize(mIndex_2, rowIndex, rowHeight_1, false, this);
                        edited = false;
                    }
                }
                else {
                    var oldHeight = getRowHeight(sheet, rowIndex);
                    var threshold = void 0;
                    if (parseInt(rowHeight_1, 10) > 0) {
                        threshold = -(oldHeight - parseInt(rowHeight_1, 10));
                    }
                    else {
                        threshold = -oldHeight;
                    }
                    setRowModel();
                    this.notify(rowHeightChanged, { threshold: threshold, rowIdx: mIndex_2 });
                }
                this.notify(positionAutoFillElement, null);
            }
            else {
                setRowModel();
            }
        }
    };
    /**
     * Allows you to set the height to the single or multiple rows.
     *
     * @param {number} height - Specifies the height for row.
     * @param {string[]} ranges - Specifies the row range to set the height. If the sheet name is not specified then height will apply to
     * the rows in the active sheet. Possible values are
     * * Single row range: ['2'] or ['2:2']
     * * Multiple rows range: ['1:100']
     * * Multiple rows with discontinuous range - ['1:10', '15:25', '30:40']
     * * Multiple rows with different sheets - ['Sheet1!1:50', 'Sheet2!1:50', 'Sheet3!1:50'].
     * @param {boolean} skipCustomRows - When this parameter is enabled, it will skip updating the heights of rows where the height has already been modified, and its 'customHeight' property is set to true.
     * @returns {void}
     */
    Spreadsheet.prototype.setRowsHeight = function (height, ranges, skipCustomRows) {
        if (height === void 0) { height = 20; }
        if (!ranges) {
            ranges = [1 + ":" + (this.getActiveSheet().usedRange.rowIndex + 1)];
        }
        this.setSize(height, ranges, function (idx) { return Number(idx) - 1; }, this.setRowHeight.bind(this), skipCustomRows);
    };
    /**
     * Allows you to set the width to the single or multiple columns.
     *
     * @param {number} width - Specifies the width for column.
     * @param {string[]} ranges - Specifies the column range to set the width. If the sheet name is not specified then width will apply to
     * the column in the active sheet. Possible values are
     * * Single column range: ['F'] or ['F:F']
     * * Multiple columns range: ['A:F']
     * * Multiple columns with discontinuous range - ['A:C', 'G:I', 'K:M']
     * * Multiple columns with different sheets - ['Sheet1!A:H', 'Sheet2!A:H', 'Sheet3!A:H'].
     * @returns {void}
     */
    Spreadsheet.prototype.setColumnsWidth = function (width, ranges) {
        if (width === void 0) { width = 64; }
        if (!ranges) {
            ranges = ["A:" + getColumnHeaderText(this.getActiveSheet().usedRange.colIndex + 1)];
        }
        this.setSize(width, ranges, function (headerText) { return getColIndex(headerText); }, this.setColWidth.bind(this));
    };
    Spreadsheet.prototype.setSize = function (width, ranges, getIndex, updateSize, skipCustomRows) {
        var _this = this;
        var sheetIdx;
        var rangeArr;
        var sheetName;
        var startIdx;
        var endIdx;
        ranges.forEach(function (range) {
            if (range.includes('!')) {
                sheetName = range.substring(0, range.lastIndexOf('!'));
                sheetIdx = getSheetIndex(_this, sheetName);
                range = range.substring(range.lastIndexOf('!') + 1);
            }
            else {
                sheetIdx = _this.activeSheetIndex;
            }
            if (range.includes(':')) {
                rangeArr = range.split(':');
                startIdx = getIndex(rangeArr[0]);
                endIdx = getIndex(rangeArr[1]);
            }
            else {
                startIdx = endIdx = getIndex(range);
            }
            for (var idx = startIdx; idx <= endIdx; idx++) {
                updateSize(width, idx, sheetIdx, false, skipCustomRows);
            }
        });
    };
    /**
     * This method is used to autofit the range of rows or columns
     *
     * {% codeBlock src='spreadsheet/autoFit/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - range of rows or columns that needs to be autofit.
     *
     * @returns {void} - used to autofit the range of rows or columns
     * ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * let spreadsheet = new Spreadsheet({
     *      allowResizing: true
     * ...
     * }, '#Spreadsheet');
     * spreadsheet.autoFit('A:D'); // Auto fit from A to D columns
     * Spreadsheet.autoFit('1:4'); // Auto fit from 1 to 4 rows
     *
     * ```
     */
    Spreadsheet.prototype.autoFit = function (range) {
        var sheetIdx;
        if (range.indexOf('!') !== -1) {
            sheetIdx = getSheetIndex(this, range.substring(0, range.lastIndexOf('!')));
            range = range.substring(range.lastIndexOf('!') + 1);
        }
        var values = this.getIndexes(range);
        var startIdx = values.startIdx;
        var endIdx = values.endIdx;
        var isCol = values.isCol;
        var maximumColInx = isCol ? getColIndex('XFD') : 1048576;
        if (startIdx <= maximumColInx) {
            if (endIdx > maximumColInx) {
                endIdx = maximumColInx;
            }
        }
        else {
            return;
        }
        for (startIdx; startIdx <= endIdx; startIdx++) {
            this.notify(setAutoFit, { idx: startIdx, isCol: isCol, sheetIdx: sheetIdx });
        }
    };
    /**
     * @hidden
     * @param {string} range - specify the range.
     * @returns {number | boolean} - to get the index.
     *
     */
    Spreadsheet.prototype.getIndexes = function (range) {
        var startIsCol;
        var endIsCol;
        var start;
        var end;
        if (range.indexOf(':') !== -1) {
            var starttoend = range.split(':');
            start = starttoend[0];
            end = starttoend[1];
        }
        else {
            start = range;
            end = range;
        }
        if (!isNullOrUndefined(start)) {
            var startValues = this.getAddress(start);
            start = startValues.address;
            startIsCol = startValues.isCol;
        }
        if (!isNullOrUndefined(end)) {
            var endValues = this.getAddress(end);
            end = endValues.address;
            endIsCol = endValues.isCol;
        }
        var isCol = startIsCol === true && endIsCol === true ? true : false;
        var startIdx = isCol ? getColIndex(start.toUpperCase()) : parseInt(start, 10);
        var endIdx = isCol ? getColIndex(end.toUpperCase()) : parseInt(end, 10);
        return { startIdx: startIdx, endIdx: endIdx, isCol: isCol };
    };
    Spreadsheet.prototype.getAddress = function (address) {
        var isCol;
        if (address.substring(0, 1).match(/\D/g)) {
            isCol = true;
            address = address.replace(/[0-9]/g, '');
            return { address: address, isCol: isCol };
        }
        else if (address.substring(0, 1).match(/[0-9]/g) && address.match(/\D/g)) {
            return { address: '', isCol: false };
        }
        else {
            address = (parseInt(address, 10) - 1).toString();
            return { address: address, isCol: isCol };
        }
    };
    /**
     * To add the hyperlink in the cell
     *
     * {% codeBlock src='spreadsheet/addHyperlink/index.md' %}{% endcodeBlock %}
     *
     * @param {string | HyperlinkModel} hyperlink - to specify the hyperlink
     * @param {string} address - to specify the address
     * @param {string} displayText - to specify the text to be displayed, by default value of the cell will be displayed.
     * @returns {void} - To add the hyperlink in the cell
     */
    Spreadsheet.prototype.addHyperlink = function (hyperlink, address, displayText) {
        this.insertHyperlink(hyperlink, address, displayText, true);
    };
    /**
     * To remove the hyperlink in the cell
     *
     * {% codeBlock src='spreadsheet/removeHyperlink/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - To specify the range
     * @returns {void} - To remove the hyperlink in the cell
     */
    Spreadsheet.prototype.removeHyperlink = function (range) {
        this.notify(removeHyperlink, { range: range, preventEventTrigger: true });
    };
    /**
     * @hidden
     * @param {string | HyperlinkModel} hyperlink - specify the hyperlink
     * @param {string} address - To specify the address
     * @param {string} displayText - To specify the displayText
     * @param {boolean} isMethod - To specify the bool value
     * @returns {void} - to insert the hyperlink
     */
    Spreadsheet.prototype.insertHyperlink = function (hyperlink, address, displayText, isMethod) {
        if (this.allowHyperlink) {
            var sheetName = void 0;
            var sheetIdx = void 0;
            var cellIdx = void 0;
            var sheet = this.getActiveSheet();
            address = address ? address : sheet.name + '!' + sheet.activeCell;
            cellIdx = getRangeIndexes(address);
            if (isReadOnlyCells(this, cellIdx)) {
                this.notify(readonlyAlert, null);
                return;
            }
            var prevELem = this.getCell(cellIdx[0], cellIdx[1]);
            var classList = [];
            for (var i = 0; prevELem && i < prevELem.classList.length; i++) {
                classList.push(prevELem.classList[i]);
            }
            var befArgs = { hyperlink: hyperlink, address: address, displayText: displayText, cancel: false };
            var aftArgs = { hyperlink: hyperlink, address: address, displayText: displayText };
            if (!isMethod) {
                this.trigger(beforeHyperlinkCreate, befArgs);
                this.notify(beginAction, { action: 'hyperlink', eventArgs: befArgs });
            }
            if (!befArgs.cancel) {
                hyperlink = befArgs.hyperlink;
                address = befArgs.address;
                var args = {
                    hyperlink: hyperlink, cell: address, displayText: displayText, triggerEvt: !isMethod
                };
                this.notify(setLinkModel, args);
                if (address && address.lastIndexOf('!') !== -1) {
                    var lastIndex = address.lastIndexOf('!');
                    sheetName = address.substring(0, lastIndex);
                    var sheets = this.sheets;
                    for (var idx = 0; idx < sheets.length; idx++) {
                        if (sheets[idx].name === sheetName) {
                            sheetIdx = idx;
                        }
                    }
                    sheet = this.sheets[sheetIdx];
                    address = address.substring(lastIndex + 1);
                }
                if (!sheet) {
                    return;
                }
                address = address ? address : this.getActiveSheet().activeCell;
                cellIdx = getRangeIndexes(address);
                if (!isMethod) {
                    this.trigger(afterHyperlinkCreate, aftArgs);
                    this.notify(completeAction, { action: 'hyperlink', eventArgs: befArgs });
                }
                if (sheet === this.getActiveSheet()) {
                    this.serviceLocator.getService('cell').refreshRange(cellIdx, false, false, false, true, isImported(this));
                    for (var i = 0; i < classList.length; i++) {
                        if (!this.getCell(cellIdx[0], cellIdx[1]).classList.contains(classList[i])) {
                            this.getCell(cellIdx[0], cellIdx[1]).classList.add(classList[i]);
                        }
                    }
                    this.notify(refreshRibbonIcons, null);
                }
            }
        }
    };
    /**
     * This method is used to add data validation.
     *
     * {% codeBlock src='spreadsheet/addDataValidation/index.md' %}{% endcodeBlock %}
     *
     * @param {ValidationModel} rules - specifies the validation rules like type, operator, value1, value2, ignoreBlank, inCellDropDown, isHighlighted arguments.
     * @param {string} range - range that needs to be add validation.
     * @returns {void} - used to add data validation.
     */
    Spreadsheet.prototype.addDataValidation = function (rules, range) {
        _super.prototype.addDataValidation.call(this, rules, range);
    };
    /**
     * This method is used for remove validation.
     *
     * {% codeBlock src='spreadsheet/removeDataValidation/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - range that needs to be remove validation.
     * @returns {void} - This method is used for remove validation.
     */
    Spreadsheet.prototype.removeDataValidation = function (range) {
        _super.prototype.removeDataValidation.call(this, range);
    };
    /**
     * This method is used to highlight the invalid data.
     *
     * {% codeBlock src='spreadsheet/addInvalidHighlight/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - range that needs to be highlight the invalid data.
     * @returns {void} - This method is used to highlight the invalid data.
     */
    Spreadsheet.prototype.addInvalidHighlight = function (range) {
        _super.prototype.addInvalidHighlight.call(this, range);
    };
    /**
     * This method is used for remove highlight from invalid data.
     *
     * {% codeBlock src='spreadsheet/removeInvalidHighlight/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - range that needs to be remove invalid highlight.
     * @returns {void} - This method is used for remove highlight from invalid data.
     */
    Spreadsheet.prototype.removeInvalidHighlight = function (range) {
        _super.prototype.removeInvalidHighlight.call(this, range);
    };
    /**
     * This method is used to add conditional formatting.
     *
     * {% codeBlock src='spreadsheet/conditionalFormat/index.md' %}{% endcodeBlock %}
     *
     * @param {ConditionalFormatModel} conditionalFormat - Specify the conditionalFormat.
     * @returns {void} - used to add conditional formatting.
     */
    Spreadsheet.prototype.conditionalFormat = function (conditionalFormat) {
        _super.prototype.conditionalFormat.call(this, conditionalFormat);
    };
    /**
     * This method is used for remove conditional formatting.
     *
     * {% codeBlock src='spreadsheet/clearConditionalFormat/index.md' %}{% endcodeBlock %}
     *
     * @param {string} range - range that needs to be remove conditional formatting.
     * @returns {void} - used for remove conditional formatting.
     */
    Spreadsheet.prototype.clearConditionalFormat = function (range) {
        range = range || this.getActiveSheet().selectedRange;
        _super.prototype.clearConditionalFormat.call(this, range);
    };
    /**
     * @hidden
     * @returns {void} - set Panel Size.
     */
    Spreadsheet.prototype.setPanelSize = function () {
        if (this.height !== 'auto') {
            var panel = document.getElementById(this.element.id + '_sheet_panel');
            panel.style.height = (this.element.getBoundingClientRect().height * this.viewport.scaleY) -
                getSiblingsHeight(panel, null, this.viewport.scaleY) + "px";
        }
    };
    /**
     * Opens the Excel file.
     *
     * {% codeBlock src='spreadsheet/open/index.md' %}{% endcodeBlock %}
     *
     * @param {OpenOptions} options - Options for opening the excel file.
     * @returns {void} - Open the Excel file.
     */
    Spreadsheet.prototype.open = function (options) {
        this.isOpen = true;
        _super.prototype.open.call(this, options);
        if (this.isOpen) {
            this.showSpinner();
        }
    };
    /**
     * Used to hide/show the rows in spreadsheet.
     *
     * @param {number} startIndex - Specifies the start row index.
     * @param {number} endIndex - Specifies the end row index.
     * @param {boolean} hide - To hide/show the rows in specified range.
     * @returns {void} - To hide/show the rows in spreadsheet.
     */
    Spreadsheet.prototype.hideRow = function (startIndex, endIndex, hide) {
        if (endIndex === void 0) { endIndex = startIndex; }
        if (hide === void 0) { hide = true; }
        if (this.renderModule) {
            this.notify(hideShow, { startIndex: startIndex, endIndex: endIndex, hide: hide, actionUpdate: false });
        }
        else {
            _super.prototype.hideRow.call(this, startIndex, endIndex, hide);
        }
    };
    /**
     * Used to hide/show the columns in spreadsheet.
     *
     * @param {number} startIndex - Specifies the start column index.
     * @param {number} endIndex - Specifies the end column index.
     * @param {boolean} hide - Set `true` / `false` to hide / show the columns.
     * @returns {void} - To hide/show the columns in spreadsheet.
     */
    Spreadsheet.prototype.hideColumn = function (startIndex, endIndex, hide) {
        if (endIndex === void 0) { endIndex = startIndex; }
        if (hide === void 0) { hide = true; }
        if (this.renderModule) {
            this.notify(hideShow, { startIndex: startIndex, endIndex: endIndex, hide: hide, isCol: true, actionUpdate: false });
        }
        else {
            _super.prototype.hideColumn.call(this, startIndex, endIndex, hide);
        }
    };
    /**
     * This method is used to Clear contents, formats and hyperlinks in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/clear/index.md' %}{% endcodeBlock %}
     *
     * @param {ClearOptions} options - Options for clearing the content, formats and hyperlinks in spreadsheet.
     * @returns {void} -  Used to Clear contents, formats and hyperlinks in spreadsheet
     */
    Spreadsheet.prototype.clear = function (options) {
        this.notify(clearViewer, { options: options });
    };
    /**
     * Used to refresh the spreadsheet in UI level.
     *
     * {% codeBlock src='spreadsheet/refresh/index.md' %}{% endcodeBlock %}
     *
     * @param {boolean} isNew - Specifies `true` / `false` to create new workbook in spreadsheet.
     * @returns {void} -  Used to refresh the spreadsheet.
     */
    Spreadsheet.prototype.refresh = function (isNew) {
        var _this = this;
        if (this.isReact) {
            this['clearTemplate']();
        }
        if (isNew) {
            this.notify(clearCopy, null);
            this.sheets.length = 0;
            this.sheetNameCount = 1;
            this.notify(sheetsDestroyed, {});
            this.notify(clearUndoRedoCollection, null);
            this.createSheet();
            this.activeSheetIndex = this.sheets.length - 1;
            this.notify(refreshSheetTabs, null);
            this.notify(workbookFormulaOperation, { action: 'initSheetInfo' });
            this.renderModule.refreshSheet();
        }
        else {
            if (this.createdHandler) {
                var refreshFn_1 = function () {
                    _this.off(spreadsheetCreated, refreshFn_1);
                    _this.refresh();
                };
                this.on(spreadsheetCreated, refreshFn_1, this);
            }
            else {
                this.notify(deInitProperties, {});
                _super.prototype.refresh.call(this);
            }
        }
    };
    /**
     * Used to set the image in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/insertImage/index.md' %}{% endcodeBlock %}
     *
     * @param {ImageModel} images - Specifies the options to insert image in spreadsheet.
     * @param {string} range - Specifies the range in spreadsheet.
     * @returns {void} -  Used to set the image in spreadsheet.
     */
    Spreadsheet.prototype.insertImage = function (images, range) {
        var i;
        for (i = 0; i < images.length; i++) {
            this.notify(createImageElement, {
                options: images[i],
                range: range ? range : this.getActiveSheet().selectedRange, isPublic: true
            });
        }
    };
    /**
     * Used to delete the image in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/deleteImage/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the id of the image element to be deleted.
     * @param {string} range - Specifies the range in spreadsheet.
     * @returns {void} - Used to delete the image in spreadsheet.
     */
    Spreadsheet.prototype.deleteImage = function (id, range) {
        this.notify(deleteImage, { id: id, range: range ? range : this.getActiveSheet().selectedRange });
    };
    /**
     * Gets the row header div of the Spreadsheet.
     *
     * @returns {Element} - Gets the row header div of the Spreadsheet.
     * @hidden
     */
    Spreadsheet.prototype.getRowHeaderContent = function () {
        return this.sheetModule.getRowHeaderPanel();
    };
    /**
     * Gets the column header div of the Spreadsheet.
     *
     * @returns {HTMLElement} - Gets the column header div of the Spreadsheet.
     * @hidden
     */
    Spreadsheet.prototype.getColumnHeaderContent = function () {
        return this.sheetModule.getColHeaderPanel();
    };
    /**
     * Gets the main content div of the Spreadsheet.
     *
     * @returns {HTMLElement} - Gets the main content div of the Spreadsheet.
     * @hidden
     */
    Spreadsheet.prototype.getMainContent = function () {
        return this.sheetModule.getContentPanel();
    };
    /**
     * Get the select all div of spreadsheet
     *
     * @returns {HTMLElement} - Get the select all div of spreadsheet
     */
    Spreadsheet.prototype.getSelectAllContent = function () {
        return this.sheetModule.getSelectAllContent();
    };
    /**
     * Gets the horizontal scroll element of the Spreadsheet.
     *
     * @returns {HTMLElement} - Gets the column header div of the Spreadsheet.
     * @hidden
     */
    Spreadsheet.prototype.getScrollElement = function () {
        return this.sheetModule.getScrollElement();
    };
    /**
     * Get the main content table element of spreadsheet.
     *
     * @returns {HTMLTableElement} -Get the main content table element of spreadsheet.
     * @hidden
     */
    Spreadsheet.prototype.getContentTable = function () {
        return this.sheetModule.getContentTable();
    };
    /**
     * Get the row header table element of spreadsheet.
     *
     * @returns {HTMLTableElement} - Get the row header table element of spreadsheet.
     * @hidden
     */
    Spreadsheet.prototype.getRowHeaderTable = function () {
        return this.sheetModule.getRowHeaderTable();
    };
    /**
     * Get the column header table element of spreadsheet.
     *
     * @returns {HTMLTableElement} - Get the column header table element of spreadsheet.
     * @hidden
     */
    Spreadsheet.prototype.getColHeaderTable = function () {
        return this.sheetModule.getColHeaderTable();
    };
    /**
     * To get the backup element count for row and column virtualization.
     *
     * @param {'row' | 'col'} layout -  specify the layout.
     * @returns {number} - To get the backup element count for row and column virtualization.
     * @hidden
     */
    Spreadsheet.prototype.getThreshold = function (layout) {
        var threshold = Math.round((this.viewport[layout + 'Count'] + 1) / 2);
        return threshold < 15 ? 15 : threshold;
    };
    /**
     * @hidden
     * @returns {boolean} - Returns the bool value.
     */
    Spreadsheet.prototype.isMobileView = function () {
        return (!isNullOrUndefined(this.cssClass) && (this.cssClass.indexOf('e-mobile-view') > -1 || Browser.isDevice) && this.cssClass.indexOf('e-desktop-view') === -1)
            && false;
    };
    /**
     * @hidden
     * @param {number} sheetId - Specifies the sheet id.
     * @param {number} rowIndex - specify the row index.
     * @param {number} colIndex - specify the col index.
     * @param {string} formulaCellReference - specify the col index.
     * @param {boolean} refresh - specify the col index.
     * @param {boolean} isUnique - specifies the unique formula.
     * @param {boolean} isSubtotal - specifies the subtotal formula.
     * @returns {string | number} - to get Value Row Col.
     */
    Spreadsheet.prototype.getValueRowCol = function (sheetId, rowIndex, colIndex, formulaCellReference, refresh, isUnique, isSubtotal) {
        return _super.prototype.getValueRowCol.call(this, sheetId, rowIndex, colIndex, formulaCellReference, refresh, isUnique, isSubtotal);
    };
    /**
     * Updates the properties of a specified cell.
     *
     * {% codeBlock src='spreadsheet/updateCell/index.md' %}{% endcodeBlock %}
     *
     * @param {CellModel} cell - The properties to update for the specified cell.
     * @param {string} address - The address of the cell to update. If not provided, the active cell's address will be used.
     * @param {boolean} enableDependentCellUpdate - Specifies whether dependent cells should also be updated. Default value is <c>true</c>.
     * @returns {void} - This method does not return a value.
     */
    Spreadsheet.prototype.updateCell = function (cell, address, enableDependentCellUpdate) {
        if (isNullOrUndefined(enableDependentCellUpdate)) {
            enableDependentCellUpdate = true;
        }
        this.updateCellInfo(cell, address, enableDependentCellUpdate, undefined, undefined, true);
    };
    /**
     * Updates the properties of a specified cell.
     *
     * @param {CellModel} cell - The properties to update for the specified cell.
     * @param {string} address - The address of the cell to update. If not provided, the active cell's address will be used.
     * @param {boolean} isDependentUpdate - Specifies whether dependent cells should also be updated.
     * @param {UndoRedoEventArgs} cellInformation - It holds the undoRedoCollections.
     * @param {boolean} isRedo - It holds the undo redo information.
     * @param {boolean} isPublic - It holds whether updateCell public method is used.
     * @returns {void} - This method does not return a value.
     *
     * @hidden
     */
    Spreadsheet.prototype.updateCellInfo = function (cell, address, isDependentUpdate, cellInformation, isRedo, isPublic) {
        address = address || this.getActiveSheet().activeCell;
        if (isReadOnlyCells(this, getRangeIndexes(address))) {
            return;
        }
        var isFinite = this.scrollSettings.isFinite;
        _super.prototype.updateCellDetails.call(this, cell, address, cellInformation, isRedo, isDependentUpdate, isFinite, isPublic);
    };
    /**
     * Used to get a row data from the data source with updated cell value.
     *
     * {% codeBlock src='spreadsheet/getRowData/index.md' %}{% endcodeBlock %}
     *
     * @param {number} index - Specifies the row index.
     * @param {number} sheetIndex - Specifies the sheet index. By default, it consider the active sheet index.
     * @returns {Object[]} - Return row data.
     */
    Spreadsheet.prototype.getRowData = function (index, sheetIndex) {
        return _super.prototype.getRowData.call(this, index, sheetIndex);
    };
    /**
     * Sorts the range of cells in the active sheet.
     *
     * {% codeBlock src='spreadsheet/sort/index.md' %}{% endcodeBlock %}
     *
     * @param {SortOptions} sortOptions - options for sorting.
     * @param {string} range - address of the data range.
     * @returns {Promise<SortEventArgs>} - Sorts the range of cells in the active sheet.
     */
    Spreadsheet.prototype.sort = function (sortOptions, range) {
        var _this = this;
        if (!this.allowSorting) {
            return Promise.reject();
        }
        var prevSort = [];
        if (this.sortCollection) {
            for (var i = this.sortCollection.length - 1; i >= 0; i--) {
                if (this.sortCollection[i] && this.sortCollection[i].sheetIndex === this.activeSheetIndex) {
                    prevSort.push(this.sortCollection[i]);
                    this.sortCollection.splice(i, 1);
                }
            }
        }
        this.notify(updateSortCollection, { sortOptions: sortOptions });
        return _super.prototype.sort.call(this, sortOptions, range, prevSort).then(function (args) {
            _this.notify(sortComplete, args);
            return Promise.resolve(args);
        });
    };
    /**
     * @hidden
     * @param {number} sheetId - specify the sheet id.
     * @param {string | number} value - Specify the value.
     * @param {number} rowIndex - Specify the row index.
     * @param {number} colIndex - Specify the col index.
     * @param {string} formula - Specify the col index.
     * @param {boolean} isRandomFormula - Specify the random formula.
     * @returns {void} - To set value for row and col.
     */
    Spreadsheet.prototype.setValueRowCol = function (sheetId, value, rowIndex, colIndex, formula, isRandomFormula) {
        if (!this.isEdit && value === '#CIRCULARREF!') {
            var sheet = getSheet(this, getSheetIndexFromId(this, sheetId));
            var circularArgs = { action: 'isCircularReference', argValue: value,
                address: sheet.name + "!" + getColumnHeaderText(colIndex) + rowIndex };
            this.notify(formulaOperation, circularArgs);
            value = circularArgs.argValue;
        }
        _super.prototype.setValueRowCol.call(this, sheetId, value, rowIndex, colIndex, formula, isRandomFormula);
        if (this.allowEditing) {
            this.notify(editOperation, {
                action: 'refreshDependentCellValue', rowIdx: rowIndex, colIdx: colIndex,
                sheetIdx: getSheetIndexFromId(this, sheetId)
            });
        }
        else {
            var sheetIdx = getSheetIndexFromId(this, sheetId);
            rowIndex--;
            colIndex--;
            if (this.activeSheetIndex === sheetIdx) {
                var sheet = getSheet(this, sheetIdx);
                var td = void 0;
                if (!isHiddenRow(sheet, rowIndex) && !isHiddenCol(sheet, colIndex)) {
                    td = this.getCell(rowIndex, colIndex);
                }
                if (td) {
                    if (td.parentElement) {
                        var curRowIdx = td.parentElement.getAttribute('aria-rowindex');
                        if (curRowIdx && Number(curRowIdx) - 1 !== rowIndex) {
                            return;
                        }
                    }
                    var cell = getCell(rowIndex, colIndex, sheet);
                    var nodeEventArgs = {
                        value: cell.value, format: cell.format, onLoad: true,
                        formattedText: cell.value, isRightAlign: false, type: 'General', cell: cell,
                        rowIndex: rowIndex, colIndex: colIndex, isRowFill: false
                    };
                    this.notify(getFormattedCellObject, nodeEventArgs);
                    this.refreshNode(td, nodeEventArgs);
                }
            }
        }
    };
    /**
     * Get component name.
     *
     * @returns {string} - Get component name.
     * @hidden
     */
    Spreadsheet.prototype.getModuleName = function () {
        return 'spreadsheet';
    };
    /**
     * The `calculateNow` method is used to calculate any uncalculated formulas in a spreadsheet.
     * This method accepts an option to specify whether the calculation should be performed for the entire workbook or a specific sheet.
     *
     * @param {string} [scope] - Specifies the scope of the calculation. Acceptable values are `Sheet` or `Workbook`.
     * If not provided, the default scope is `Sheet`.
     * * `Sheet`: Calculates formulas only on the current sheet or a specified sheet.
     * * `Workbook`: Calculates formulas across the entire workbook.
     * @param {number | string} [sheet] - The index or name of the sheet to calculate if the scope is set to `Sheet`.
     * If not provided and the scope is `Sheet`, the current active sheet will be used.
     * @returns {Promise<void>} - A promise that resolves when the calculation is complete.
     * The promise does not return a specific value, but it can be used to perform actions after the calculation has finished.
     */
    Spreadsheet.prototype.calculateNow = function (scope, sheet) {
        return _super.prototype.calculateNow.call(this, scope, sheet);
    };
    /**
     * @hidden
     * @param {Element} td - Specify the element.
     * @param {NumberFormatArgs} args - specify the args.
     * @returns {void} - to refresh the node.
     */
    Spreadsheet.prototype.refreshNode = function (td, args) {
        var value;
        if (td) {
            if (args) {
                args.result = isNullOrUndefined(args.formattedText) ? (isNullOrUndefined(args.result) ? '' : args.result) :
                    args.formattedText.toString();
                if (!args.isRowFill) {
                    var beforeFillSpan = td.querySelector('.e-fill-before');
                    if (beforeFillSpan) {
                        detach(beforeFillSpan);
                    }
                    var spanFillElem = select('.' + 'e-fill', td);
                    if (spanFillElem) {
                        detach(spanFillElem);
                        td.style.display = 'table-cell';
                    }
                    var spanFillSecElem = select('.' + 'e-fill-sec', td);
                    if (spanFillSecElem) {
                        detach(spanFillSecElem);
                    }
                }
                var spanElem = select('#' + this.element.id + '_currency', td);
                if (spanElem) {
                    detach(spanElem);
                }
                if (args.type === 'Accounting' && isNumber(args.value) && args.result.includes(args.curSymbol)) {
                    var curSymbol = void 0;
                    var result = void 0;
                    var setVal = void 0;
                    if (args.result.trim().endsWith(args.curSymbol)) {
                        result = args.result;
                    }
                    else {
                        curSymbol = args.result.includes(' ' + args.curSymbol) ? ' ' + args.curSymbol : args.curSymbol;
                        result = args.result.split(curSymbol).join('');
                    }
                    var dataBarVal = td.querySelector('.e-databar-value');
                    var iconSetSpan = td.querySelector('.e-iconsetspan');
                    var tdContainer = td;
                    var nodeElement = void 0;
                    if (td.children.length > 0 && td.children[td.childElementCount - 1].className.indexOf('e-addNoteIndicator') > -1) {
                        nodeElement = document.getElementsByClassName('e-addNoteIndicator')[0];
                    }
                    if (dataBarVal) {
                        this.refreshNode(dataBarVal, { result: result });
                        tdContainer = td.querySelector('.e-cf-databar') || td;
                    }
                    else if (td.querySelector('a')) {
                        td.querySelector('a').textContent = result;
                    }
                    else {
                        setVal = true;
                        td.innerText = '';
                    }
                    if (iconSetSpan) {
                        td.insertBefore(iconSetSpan, td.firstElementChild);
                    }
                    if (curSymbol) {
                        var curr = this.createElement('span', { id: this.element.id + '_currency', styles: 'float: left' });
                        curr.innerText = curSymbol;
                        tdContainer.appendChild(curr);
                        if (!isNullOrUndefined(nodeElement)) {
                            tdContainer.appendChild(nodeElement);
                        }
                    }
                    if (setVal) {
                        td.innerHTML += result;
                    }
                    td.classList.add('e-right-align');
                    return;
                }
                else {
                    var alignClass = void 0;
                    if (args.result && (args.result.toLowerCase() === 'true' || args.result.toLowerCase() === 'false')) {
                        args.result = args.result.toUpperCase();
                        alignClass = 'e-center-align';
                        args.isRightAlign = true; // Re-use this to center align the cell.
                    }
                    else {
                        alignClass = 'e-right-align';
                    }
                    value = args.result;
                    if (!this.allowWrap) {
                        if (value.toString().includes('\n')) {
                            value = value.replace(/\n/g, '');
                        }
                    }
                    if (args.isRightAlign) {
                        td.classList.add(alignClass);
                    }
                    else {
                        td.classList.remove(alignClass);
                    }
                }
            }
            value = !isNullOrUndefined(value) ? value : '';
            if (!isNullOrUndefined(args.rowIndex) && !isNullOrUndefined(args.colIndex)) {
                attributes(td, { 'aria-label': (value ? value + ' ' : '') + getCellAddress(args.rowIndex, args.colIndex) });
            }
            var node_1 = td.lastChild;
            if (node_1 && node_1.nodeName === 'SPAN' && node_1.classList.contains('e-iconsetspan')) {
                node_1 = null;
            }
            var nodeIndicator = td.querySelector('.e-addNoteIndicator');
            if (nodeIndicator) {
                node_1 = nodeIndicator.previousSibling;
            }
            if (td.querySelector('.e-databar-value')) {
                node_1 = td.querySelector('.e-databar-value').lastChild;
            }
            if (td.querySelector('.e-hyperlink')) {
                if (args.cell && args.cell.wrap && value && value.toString().indexOf('\n')) {
                    td.querySelector('.e-hyperlink').textContent = value;
                }
                node_1 = td.querySelector('.e-hyperlink').lastChild;
            }
            var wrapContent = td.querySelector('.e-wrap-content');
            if (wrapContent && !(td.querySelector('.e-hyperlink') || td.querySelector('.e-databar-value'))) {
                if (!wrapContent.lastChild) {
                    wrapContent.appendChild(document.createTextNode(''));
                }
                node_1 = wrapContent.lastChild;
            }
            if ((this.isAngular || this.isVue) &&
                td.classList.contains('e-cell-template') && node_1 && (node_1.nodeType === 8 || node_1.nodeType === 3)) {
                if (node_1.nodeType === 3 || value !== '') {
                    var checkNodeFn = function () {
                        if (!td.childElementCount) {
                            if (node_1.nodeType === 3) {
                                if (!args.isRowFill) {
                                    node_1.nodeValue = value;
                                }
                            }
                            else {
                                td.appendChild(document.createTextNode(value));
                            }
                        }
                    };
                    if (this.isAngular) {
                        getUpdateUsingRaf(checkNodeFn);
                    }
                    else {
                        checkNodeFn();
                    }
                }
            }
            else if (node_1 && (node_1.nodeType === 3 || node_1.nodeType === 1)) {
                if (!args.isRowFill) {
                    if (!isNullOrUndefined(node_1.className) &&
                        node_1.className.indexOf('e-addNoteIndicator') > -1) {
                        node_1 = td.lastChild;
                        node_1.nodeValue = value;
                    }
                    else {
                        node_1.nodeValue = value;
                    }
                }
            }
            else {
                td.appendChild(document.createTextNode(value));
            }
        }
    };
    /**
     * @hidden
     * @param {CellStyleModel} style - specify the style.
     * @param {number} lines - Specify the lines.
     * @param {number} borderWidth - Specify the borderWidth.
     * @returns {number} - To calculate Height
     */
    Spreadsheet.prototype.calculateHeight = function (style, lines, borderWidth) {
        if (lines === void 0) { lines = 1; }
        if (borderWidth === void 0) { borderWidth = 1; }
        var fontSize = (style && style.fontSize) || this.cellStyle.fontSize;
        var threshold = style.fontFamily === 'Arial Black' ? 1.44 : 1.24;
        return ((fontSize.indexOf('pt') > -1 ? parseInt(fontSize, 10) * 1.33 : parseInt(fontSize, 10)) * threshold * lines) +
            (borderWidth * threshold);
    };
    /**
     * @hidden
     * @param {number} startIdx - specify the start index.
     * @param {number} endIdx - Specify the end index.
     * @param {string} layout - Specify the rows.
     * @param {boolean} finite - Specifies the scroll mode.
     * @returns {number[]} - To skip the hidden rows.
     */
    Spreadsheet.prototype.skipHidden = function (startIdx, endIdx, layout, finite) {
        if (layout === void 0) { layout = 'rows'; }
        if (finite === void 0) { finite = this.scrollSettings.isFinite; }
        var sheet = this.getActiveSheet();
        var totalCount;
        if (this.scrollSettings.isFinite) {
            totalCount = (layout === 'rows' ? sheet.rowCount : sheet.colCount) - 1;
        }
        for (var i = startIdx; i <= endIdx; i++) {
            if ((sheet["" + layout])[i] && (sheet["" + layout])[i].hidden) {
                if (startIdx === i) {
                    startIdx++;
                }
                endIdx++;
                if (finite && endIdx > totalCount) {
                    endIdx = totalCount;
                    break;
                }
            }
            else if (!finite && this.scrollSettings.isFinite && endIdx > totalCount) {
                if ((sheet["" + layout])[i - 1] && (sheet["" + layout])[i - 1].hidden) {
                    endIdx--;
                    break;
                }
            }
        }
        return [startIdx, endIdx];
    };
    /**
     * @hidden
     * @param {HTMLElement} nextTab - Specify the element.
     * @param {string} selector - Specify the selector
     * @returns {void} - To update the active border.
     */
    Spreadsheet.prototype.updateActiveBorder = function (nextTab, selector) {
        if (selector === void 0) { selector = '.e-ribbon'; }
        var indicator = select(selector + " .e-tab-header .e-indicator", this.element);
        indicator.style.display = 'none';
        setStyleAttribute(indicator, { 'left': '', 'right': '' });
        setStyleAttribute(indicator, {
            'left': nextTab.offsetLeft + 'px', 'right': nextTab.parentElement.offsetWidth - (nextTab.offsetLeft + nextTab.offsetWidth) + 'px'
        });
        indicator.style.display = '';
    };
    /**
     * To perform the undo operation in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/undo/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - To perform the undo operation in spreadsheet.
     */
    Spreadsheet.prototype.undo = function () {
        this.notify(performUndoRedo, { isUndo: true, isPublic: true });
    };
    /**
     * To perform the redo operation in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/redo/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - To perform the redo operation in spreadsheet.
     */
    Spreadsheet.prototype.redo = function () {
        this.notify(performUndoRedo, { isUndo: false, isPublic: true });
    };
    /**
     * To update the undo redo collection in spreadsheet.
     *
     * {% codeBlock src='spreadsheet/updateUndoRedoCollection/index.md' %}{% endcodeBlock %}
     *
     * @param {object} args - options for undo redo.
     * @returns {void} - To update the undo redo collection in spreadsheet.
     */
    Spreadsheet.prototype.updateUndoRedoCollection = function (args) {
        this.notify(updateUndoRedoCollection, { args: args, isPublic: true });
    };
    /**
     * Adds the defined name to the Spreadsheet.
     *
     * {% codeBlock src='spreadsheet/addDefinedName/index.md' %}{% endcodeBlock %}
     *
     * @param {DefineNameModel} definedName - Specifies the name, scope, comment, refersTo.
     * @returns {boolean} - Return the added status of the defined name.
     */
    Spreadsheet.prototype.addDefinedName = function (definedName) {
        var eventArgs = {
            action: 'addDefinedName',
            isAdded: false,
            definedName: definedName
        };
        this.notify(formulaOperation, eventArgs);
        return eventArgs.isAdded;
    };
    /**
     * Removes the defined name from the Spreadsheet.
     *
     * {% codeBlock src='spreadsheet/removeDefinedName/index.md' %}{% endcodeBlock %}
     *
     * @param {string} definedName - Specifies the name.
     * @param {string} scope - Specifies the scope of the defined name.
     * @returns {boolean} - Return the removed status of the defined name.
     */
    Spreadsheet.prototype.removeDefinedName = function (definedName, scope) {
        return _super.prototype.removeDefinedName.call(this, definedName, scope);
    };
    Spreadsheet.prototype.mouseClickHandler = function (e) {
        this.notify(click, e);
    };
    Spreadsheet.prototype.mouseDownHandler = function (e) {
        this.notify(mouseDown, e);
    };
    Spreadsheet.prototype.keyUpHandler = function (e) {
        if (closest(e.target, '.e-find-dlg')) {
            this.notify(findKeyUp, e);
        }
        else {
            this.notify(keyUp, e);
        }
    };
    Spreadsheet.prototype.keyDownHandler = function (e) {
        var findToolDlg = closest(e.target, '.e-findtool-dlg');
        if (findToolDlg) {
            if (e.keyCode === 9) {
                var target = e.target;
                if (e.shiftKey) {
                    if (target.classList.contains('e-text-findNext-short')) {
                        var focusEle = findToolDlg.querySelector('.e-findRib-close .e-tbar-btn');
                        if (focusEle) {
                            e.preventDefault();
                            focusEle.focus();
                        }
                    }
                }
                else if (target.classList.contains('e-tbar-btn') && target.parentElement.classList.contains('e-findRib-close')) {
                    focus(findToolDlg);
                }
            }
        }
        else {
            this.notify(keyDown, e);
            var dialogbox = closest(e.target, '.e-dialog');
            if (!this.enableKeyboardNavigation && (document.activeElement.classList.contains('e-cell') || dialogbox)) {
                if ([38, 40, 33, 34, 35, 36, 9].indexOf(e.keyCode) > -1) {
                    e.preventDefault();
                }
            }
        }
    };
    Spreadsheet.prototype.freeze = function (e) {
        if (!this.allowFreezePane || e.row < 0 || e.column < 0) {
            return;
        }
        if (e.triggerEvent) {
            var args = {
                row: e.row, column: e.column,
                cancel: false, sheetIndex: this.activeSheetIndex
            };
            this.notify(beginAction, { eventArgs: args, action: 'freezePanes' });
            if (args.cancel) {
                return;
            }
        }
        this.on(contentLoaded, this.freezePaneUpdated, this);
        this.freezePanes(e.row, e.column);
        this.notify(refreshRibbonIcons, null);
    };
    Spreadsheet.prototype.freezePaneUpdated = function () {
        this.off(contentLoaded, this.freezePaneUpdated);
        var sheet = this.getActiveSheet();
        focus(this.element);
        this.notify(completeAction, { eventArgs: { row: sheet.frozenRows, column: sheet.frozenColumns,
                sheetIndex: this.activeSheetIndex }, action: 'freezePanes' });
    };
    /**
     * Binding events to the element while component creation.
     *
     * @returns {void} - Binding events to the element while component creation.
     */
    Spreadsheet.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'click', this.mouseClickHandler, this);
        EventHandler.add(this.element, getStartEvent(), this.mouseDownHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        EventHandler.add(this.element, 'keydown', this.keyDownHandler, this);
        this.on(freeze, this.freeze, this);
        this.on(refreshInsertDelete, this.refreshInsertDelete, this);
    };
    /**
     * Destroys the component (detaches/removes all event handlers, attributes, classes, and empties the component element).
     *
     * {% codeBlock src='spreadsheet/destroy/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - Destroys the component.
     */
    Spreadsheet.prototype.destroy = function () {
        if (this.isReact) {
            this['clearTemplate']();
        }
        this.unwireEvents();
        this.notify(spreadsheetDestroyed, null);
        _super.prototype.destroy.call(this);
        this.element.innerHTML = '';
        this.element.removeAttribute('tabindex');
        this.element.removeAttribute('role');
        this.element.style.removeProperty('height');
        this.element.style.removeProperty('width');
        this.element.style.removeProperty('min-height');
        this.element.style.removeProperty('min-width');
        if (this.sheetModule) {
            this.sheetModule.destroy();
        }
    };
    /**
     * Unbinding events from the element while component destroy.
     *
     * @returns {void} - Unbinding events from the element while component destroy.
     */
    Spreadsheet.prototype.unwireEvents = function () {
        EventHandler.remove(this.element, 'click', this.mouseClickHandler);
        EventHandler.remove(this.element, getStartEvent(), this.mouseDownHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        EventHandler.remove(this.element, 'keydown', this.keyDownHandler);
        this.off(freeze, this.freeze);
        this.off(refreshInsertDelete, this.refreshInsertDelete);
    };
    Spreadsheet.prototype.refreshInsertDelete = function (args) {
        var _this = this;
        if (args.modelType === 'Sheet') {
            return;
        }
        var updated;
        var indexes;
        args.sheet.ranges.forEach(function (range) {
            if (range.template && range.address) {
                indexes = getRangeIndexes(range.address);
                updated = _this.updateRangeOnInsertDelete(args, indexes);
                if (updated) {
                    range.address = getRangeAddress(indexes);
                }
            }
        });
        this.setSheetPropertyOnMute(args.sheet, 'ranges', args.sheet.ranges);
    };
    /**
     * To add context menu items.
     *
     * {% codeBlock src='spreadsheet/addContextMenu/index.md' %}{% endcodeBlock %}
     *
     * @param {MenuItemModel[]} items - Items that needs to be added.
     * @param {string} text - Item before / after that the element to be inserted.
     * @param {boolean} insertAfter - Set `false` if the `items` need to be inserted before the `text`.
     * By default, `items` are added after the `text`.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     * @returns {void} - To add context menu items.
     */
    Spreadsheet.prototype.addContextMenuItems = function (items, text, insertAfter, isUniqueId) {
        if (insertAfter === void 0) { insertAfter = true; }
        this.notify(addContextMenuItems, { items: items, text: text, insertAfter: insertAfter, isUniqueId: isUniqueId });
    };
    /**
     * To remove existing context menu items.
     *
     * {% codeBlock src='spreadsheet/removeContextMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} items - Items that needs to be removed.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     * @returns {void} - To remove existing context menu items.
     */
    Spreadsheet.prototype.removeContextMenuItems = function (items, isUniqueId) {
        this.notify(removeContextMenuItems, { items: items, isUniqueId: isUniqueId });
    };
    /**
     * To enable / disable context menu items.
     *
     * {% codeBlock src='spreadsheet/enableContextMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} items - Items that needs to be enabled / disabled.
     * @param {boolean} enable - Set `true` / `false` to enable / disable the menu items.
     * @param {boolean} isUniqueId - Set `true` if the given `text` is a unique id.
     * @returns {void} - To enable / disable context menu items.
     */
    Spreadsheet.prototype.enableContextMenuItems = function (items, enable, isUniqueId) {
        if (enable === void 0) { enable = true; }
        this.notify(enableContextMenuItems, { items: items, enable: enable, isUniqueId: isUniqueId });
    };
    /**
     * To enable / disable file menu items.
     *
     * {% codeBlock src='spreadsheet/enableFileMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} items - Items that needs to be enabled / disabled.
     * @param {boolean} enable - Set `true` / `false` to enable / disable the menu items.
     * @param {boolean} isUniqueId - Set `true` if the given file menu items `text` is a unique id.
     * @returns {void} - To enable / disable file menu items.
     */
    Spreadsheet.prototype.enableFileMenuItems = function (items, enable, isUniqueId) {
        if (enable === void 0) { enable = true; }
        this.notify(enableFileMenuItems, { items: items, enable: enable, isUniqueId: isUniqueId });
    };
    /**
     * To show/hide the file menu items in Spreadsheet ribbon.
     *
     * {% codeBlock src='spreadsheet/hideFileMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} items - Specifies the file menu items text which is to be show/hide.
     * @param {boolean} hide - Set `true` / `false` to hide / show the file menu items.
     * @param {boolean} isUniqueId - Set `true` if the given file menu items `text` is a unique id.
     * @returns {void} - To show/hide the file menu items in Spreadsheet ribbon.
     */
    Spreadsheet.prototype.hideFileMenuItems = function (items, hide, isUniqueId) {
        if (hide === void 0) { hide = true; }
        this.notify(hideFileMenuItems, { items: items, hide: hide, isUniqueId: isUniqueId });
    };
    /**
     * To add custom file menu items.
     *
     * {% codeBlock src='spreadsheet/addFileMenuItems/index.md' %}{% endcodeBlock %}
     *
     * @param {MenuItemModel[]} items - Specifies the ribbon file menu items to be inserted.
     * @param {string} text - Specifies the existing file menu item text before / after which the new file menu items to be inserted.
     * @param {boolean} insertAfter - Set `false` if the `items` need to be inserted before the `text`.
     * By default, `items` are added after the `text`.
     * @param {boolean} isUniqueId - Set `true` if the given file menu items `text` is a unique id.
     * @returns {void} - To add custom file menu items.
     */
    Spreadsheet.prototype.addFileMenuItems = function (items, text, insertAfter, isUniqueId) {
        if (insertAfter === void 0) { insertAfter = true; }
        this.notify(addFileMenuItems, { items: items, text: text, insertAfter: insertAfter, isUniqueId: isUniqueId });
    };
    /**
     * To show/hide the existing ribbon tabs.
     *
     * {% codeBlock src='spreadsheet/hideRibbonTabs/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} tabs - Specifies the tab header text which needs to be shown/hidden.
     * @param {boolean} hide - Set `true` / `false` to hide / show the ribbon tabs.
     * @returns {void} - To show/hide the existing ribbon tabs.
     */
    Spreadsheet.prototype.hideRibbonTabs = function (tabs, hide) {
        if (hide === void 0) { hide = true; }
        this.notify(hideRibbonTabs, { tabs: tabs, hide: hide });
    };
    /**
     * To enable / disable the existing ribbon tabs.
     *
     * {% codeBlock src='spreadsheet/enableRibbonTabs/index.md' %}{% endcodeBlock %}
     *
     * @param {string[]} tabs - Specifies the tab header text which needs to be enabled / disabled.
     * @param {boolean} enable - Set `true` / `false` to enable / disable the ribbon tabs.
     * @returns {void} - To enable / disable the existing ribbon tabs.
     */
    Spreadsheet.prototype.enableRibbonTabs = function (tabs, enable) {
        if (enable === void 0) { enable = true; }
        this.notify(enableRibbonTabs, { tabs: tabs, enable: enable });
    };
    /**
     * To add custom ribbon tabs.
     *
     * {% codeBlock src='spreadsheet/addRibbonTabs/index.md' %}{% endcodeBlock %}
     *
     * @param {RibbonItemModel[]} items - Specifies the ribbon tab items to be inserted.
     * @param {string} insertBefore - Specifies the existing ribbon header text before which the new tabs will be inserted.
     * If not specified, the new tabs will be inserted at the end.
     * @returns {void} - To add custom ribbon tabs.
     */
    Spreadsheet.prototype.addRibbonTabs = function (items, insertBefore) {
        this.notify(addRibbonTabs, { items: items, insertBefore: insertBefore });
    };
    /**
     * Enables or disables the specified ribbon toolbar items or all ribbon items.
     *
     * {% codeBlock src='spreadsheet/enableToolbarItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string} tab - Specifies the ribbon tab header text under which the toolbar items need to be enabled / disabled.
     * @param {number[]} items - Specifies the toolbar item indexes / unique id's which needs to be enabled / disabled.
     * If it is not specified the entire toolbar items will be enabled / disabled.
     * @param  {boolean} enable - Boolean value that determines whether the toolbar items should be enabled or disabled.
     * @returns {void} - Enables or disables the specified ribbon toolbar items or all ribbon items.
     */
    Spreadsheet.prototype.enableToolbarItems = function (tab, items, enable) {
        this.notify(enableToolbarItems, [{ tab: tab, items: items, enable: enable === undefined ? true : enable }]);
    };
    /**
     * To show/hide the existing Spreadsheet ribbon toolbar items.
     *
     * {% codeBlock src='spreadsheet/hideToolbarItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string} tab - Specifies the ribbon tab header text under which the specified items needs to be hidden / shown.
     * @param {number[]} indexes - Specifies the toolbar indexes which needs to be shown/hidden from UI.
     * @param {boolean} hide - Set `true` / `false` to hide / show the toolbar items.
     * @returns {void} - To show/hide the existing Spreadsheet ribbon toolbar items.
     */
    Spreadsheet.prototype.hideToolbarItems = function (tab, indexes, hide) {
        if (hide === void 0) { hide = true; }
        this.notify(hideToolbarItems, { tab: tab, indexes: indexes, hide: hide });
    };
    /**
     * To add the custom items in Spreadsheet ribbon toolbar.
     *
     * {% codeBlock src='spreadsheet/addToolbarItems/index.md' %}{% endcodeBlock %}
     *
     * @param {string} tab - Specifies the ribbon tab header text under which the specified items will be inserted.
     * @param {ItemModel[]} items - Specifies the ribbon toolbar items that needs to be inserted.
     * @param {number} index - Specifies the index text before which the new items will be inserted.
     * If not specified, the new items will be inserted at the end of the toolbar.
     * @returns {void} - To add the custom items in Spreadsheet ribbon toolbar.
     */
    Spreadsheet.prototype.addToolbarItems = function (tab, items, index) {
        this.notify(addToolbarItems, { tab: tab, items: items, index: index });
    };
    /**
     * Selects the cell / range of cells with specified address.
     *
     * {% codeBlock src='spreadsheet/selectRange/index.md' %}{% endcodeBlock %}
     *
     * @param {string} address - Specifies the range address.
     * @returns {void} - To select the range.
     */
    Spreadsheet.prototype.selectRange = function (address) {
        if (this.isEdit) {
            this.notify(editOperation, { action: 'endEdit' });
        }
        this.notify(selectRange, { address: address });
    };
    /**
     * Allows you to select a chart from the active sheet. To select a specific chart from the active sheet, pass the chart `id`.
     * If you pass an empty argument, the chart present in the active cell will be selected. If the active cell does not have a chart,
     * the initially rendered chart will be selected from the active sheet.
     *
     * @param {string} id - Specifies the chart `id` to be selected.
     * @returns {void}
     */
    Spreadsheet.prototype.selectChart = function (id) {
        this.selectOverlay(id, true);
    };
    /**
     * Allows you to select an image from the active sheet. To select a specific image from the active sheet, pass the image `id`.
     * If you pass an empty argument, the image present in the active cell will be selected. If the active cell does not have an image,
     * the initially rendered image will be selected from the active sheet.
     *
     * @param {string} id - Specifies the image `id` to be selected.
     * @returns {void}
     */
    Spreadsheet.prototype.selectImage = function (id) {
        this.selectOverlay(id);
    };
    Spreadsheet.prototype.selectOverlay = function (id, isChart) {
        var sheet = this.getActiveSheet();
        if (sheet.isProtected || !this.allowEditing) {
            return;
        }
        if (!id) {
            var activeCell = getCellIndexes(sheet.activeCell);
            var cell = getCell(activeCell[0], activeCell[1], sheet, false, true);
            if (isChart) {
                if (cell.chart && cell.chart.length) {
                    id = cell.chart[cell.chart.length - 1].id;
                }
            }
            else if (cell.image && cell.image.length) {
                id = cell.image[cell.image.length - 1].id;
            }
        }
        var overlayEle;
        if (id) {
            overlayEle = this.element.querySelector("#" + id);
            if (!overlayEle.classList.contains('e-ss-overlay')) {
                overlayEle = overlayEle.parentElement;
            }
        }
        else {
            overlayEle = this.element.querySelector(".e-ss-overlay" + (isChart ? '.e-datavisualization-chart' : ':not(.e-datavisualization-chart)'));
        }
        if (overlayEle) {
            var isChartActive = void 0;
            var activeOverlay = this.element.getElementsByClassName('e-ss-overlay-active')[0];
            if (activeOverlay) {
                activeOverlay.classList.remove('e-ss-overlay-active');
                isChartActive = activeOverlay.classList.contains('e-datavisualization-chart');
                if (isChartActive) {
                    this.notify(clearChartBorder, null);
                }
            }
            overlayEle.classList.add('e-ss-overlay-active');
            if (overlayEle.classList.contains('e-datavisualization-chart')) {
                this.notify(focusChartBorder, { id: overlayEle.id });
                if (!isChartActive) {
                    this.notify(insertDesignChart, { id: overlayEle.id });
                }
            }
            else if (isChartActive) {
                this.notify(removeDesignChart, null);
            }
        }
    };
    /**
     * Allows you to remove a selection from the active chart.
     *
     * @returns {void}
     */
    Spreadsheet.prototype.deselectChart = function () {
        this.notify(refreshOverlayElem, { selector: '.e-datavisualization-chart' });
    };
    /**
     * Allows you to remove a selection from the active image.
     *
     * @returns {void}
     */
    Spreadsheet.prototype.deselectImage = function () {
        this.notify(refreshOverlayElem, { selector: ':not(.e-datavisualization-chart)' });
    };
    /**
     * Start edit the active cell.
     *
     * {% codeBlock src='spreadsheet/startEdit/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - Start edit the active cell.
     */
    Spreadsheet.prototype.startEdit = function () {
        this.notify(editOperation, { action: 'startEdit', isNewValueEdit: false });
    };
    /**
     * Cancels the edited state, this will not update any value in the cell.
     *
     * {% codeBlock src='spreadsheet/closeEdit/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - Cancels the edited state, this will not update any value in the cell.
     */
    Spreadsheet.prototype.closeEdit = function () {
        this.notify(editOperation, { action: 'cancelEdit' });
    };
    /**
     * If Spreadsheet is in editable state, you can save the cell by invoking endEdit.
     *
     * {% codeBlock src='spreadsheet/endEdit/index.md' %}{% endcodeBlock %}
     *
     * @returns {void} - If Spreadsheet is in editable state, you can save the cell by invoking endEdit.
     */
    Spreadsheet.prototype.endEdit = function () {
        this.notify(editOperation, { action: 'endEdit', isPublic: true });
    };
    /**
     * This method is used to print the active sheet or the entire workbook.
     *
     * @param {printOptions} printOptions - Represents the settings to customize the print type, row and column headers and gridlines in the printing operation.
     * @returns {void}
     */
    Spreadsheet.prototype.print = function (printOptions) {
        if (printOptions === void 0) { printOptions = { type: 'ActiveSheet', allowRowColumnHeader: false, allowGridLines: false }; }
        if (this.allowPrint && !isNullOrUndefined(this.printModule)) {
            this.printModule.print(this, printOptions);
        }
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {SpreadsheetModel} newProp - Specify the new properties
     * @param  {SpreadsheetModel} oldProp - Specify the old properties
     * @returns {void} - Called internally if any of the property value changed.
     * @hidden
     */
    Spreadsheet.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _this = this;
        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
        var sheetTabsRefreshed;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            var header = void 0;
            var addBtn = void 0;
            var sheet = this.getActiveSheet();
            var horizontalScroll = this.getScrollElement();
            switch (prop) {
                case 'enableRtl':
                    if (newProp.locale || newProp.currencyCode) {
                        break;
                    }
                    header = this.getColumnHeaderContent();
                    if (header) {
                        header = header.parentElement;
                    }
                    if (!header) {
                        break;
                    }
                    if (newProp.enableRtl) {
                        header.style.marginRight = '';
                        document.getElementById(this.element.id + '_sheet_panel').classList.add('e-rtl');
                    }
                    else {
                        header.style.marginLeft = '';
                        document.getElementById(this.element.id + '_sheet_panel').classList.remove('e-rtl');
                    }
                    if (this.allowScrolling) {
                        this.scrollModule.setPadding(true);
                    }
                    if (this.allowAutoFill) {
                        var autofillEle = this.element.querySelector('.e-dragfill-ddb');
                        if (autofillEle) {
                            var autofillDdb = getComponent(autofillEle, 'dropdown-btn');
                            if (autofillDdb) {
                                autofillDdb.enableRtl = newProp.enableRtl;
                                autofillDdb.dataBind();
                            }
                        }
                    }
                    this.sheetModule.setPanelWidth(sheet, this.getRowHeaderContent(), true);
                    if (this.allowImage || this.allowChart) {
                        var overlays = this.element.getElementsByClassName('e-ss-overlay');
                        var chart = void 0;
                        var overlay_1 = void 0;
                        var chartEle = void 0;
                        for (var idx = 0, overlayLen = overlays.length - 1; idx <= overlayLen; idx++) {
                            overlay_1 = overlays[0];
                            if (overlay_1.classList.contains('e-datavisualization-chart')) {
                                chartEle = overlay_1.querySelector('.e-accumulationchart');
                                if (chartEle) {
                                    chart = getComponent(chartEle, 'accumulationchart');
                                }
                                else {
                                    chartEle = overlay_1.querySelector('.e-chart');
                                    chart = chartEle && getComponent(chartEle, 'chart');
                                }
                                if (chart) {
                                    chart.destroy();
                                }
                            }
                            detach(overlay_1);
                            if (idx === overlayLen) {
                                this.notify(updateView, {});
                            }
                        }
                    }
                    if (horizontalScroll) {
                        horizontalScroll.scrollLeft = 0;
                    }
                    this.selectRange(sheet.selectedRange);
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    if (newProp.cssClass) {
                        addClass([this.element], newProp.cssClass.split(' '));
                    }
                    break;
                case 'activeSheetIndex':
                    this.renderModule.refreshSheet();
                    this.notify(activeSheetChanged, { idx: newProp.activeSheetIndex });
                    break;
                case 'width':
                    this.setWidth();
                    this.resize();
                    break;
                case 'height':
                    this.setHeight();
                    this.resize();
                    break;
                case 'showRibbon':
                    this.notify(ribbon, { prop: 'showRibbon', onPropertyChange: true });
                    break;
                case 'showFormulaBar':
                    this.notify(formulaBar, { uiUpdate: true });
                    break;
                case 'showSheetTabs':
                    this.notify(sheetTabs, null);
                    break;
                case 'cellStyle':
                    this.renderModule.refreshSheet();
                    break;
                case 'allowEditing':
                    if (this.allowEditing) {
                        this.notify(editOperation, { action: 'renderEditor' });
                        if (this.enableKeyboardNavigation) {
                            // Remove and reassign the `keyDown` and `mouseDown` event in `KeyboardNavigation` and `Selection` module.
                            // To execute the respective event after editing operation.
                            this.enableKeyboardNavigation = false;
                            this.dataBind();
                            this.enableKeyboardNavigation = true;
                            this.dataBind();
                            var mode = this.selectionSettings.mode;
                            if (mode !== 'None') {
                                this.selectionSettings.mode = 'None';
                                this.dataBind();
                                this.selectionSettings.mode = mode;
                                this.dataBind();
                            }
                        }
                    }
                    else {
                        this.notify(refreshOverlayElem, null);
                    }
                    break;
                case 'allowInsert':
                    addBtn = this.element.getElementsByClassName('e-add-sheet-tab')[0];
                    if (addBtn) {
                        addBtn.disabled = !this.allowInsert;
                        if (this.allowInsert) {
                            if (addBtn.classList.contains('e-disabled')) {
                                addBtn.classList.remove('e-disabled');
                            }
                        }
                        else {
                            if (!addBtn.classList.contains('e-disabled')) {
                                addBtn.classList.add('e-disabled');
                            }
                        }
                    }
                    break;
                case 'sheets':
                    if (newProp.sheets === this.sheets) {
                        this.renderModule.refreshSheet();
                        this.notify(refreshSheetTabs, null);
                        this.notify(workbookFormulaOperation, { action: 'initSheetInfo' });
                        break;
                    }
                    Object.keys(newProp.sheets).forEach(function (sheetIndex, index) {
                        var sheetIdx = Number(sheetIndex);
                        var sheet = newProp.sheets[sheetIdx];
                        var curSheet = getSheet(_this, sheetIdx);
                        if (sheet.ranges && Object.keys(sheet.ranges).length) {
                            var ranges = Object.keys(sheet.ranges);
                            var newRangeIdx_1;
                            ranges.forEach(function (rangeIdx, idx) {
                                if (!sheet.ranges[Number(rangeIdx)].info) {
                                    newRangeIdx_1 = idx;
                                }
                            });
                            var rangeIdx_1;
                            var range_1;
                            var curRange_1;
                            var dataSource_1;
                            ranges.forEach(function (rangeIndex, idx) {
                                if (isUndefined(newRangeIdx_1) || newRangeIdx_1 === idx) {
                                    rangeIdx_1 = Number(rangeIndex);
                                    range_1 = sheet.ranges[rangeIdx_1];
                                    curRange_1 = curSheet.ranges[rangeIdx_1];
                                    dataSource_1 = range_1.dataSource;
                                    if (range_1.fieldsOrder && curRange_1.info && !dataSource_1 && curRange_1.dataSource) {
                                        dataSource_1 = curRange_1.dataSource;
                                    }
                                    if (dataSource_1) {
                                        _this.notify(dataSourceChanged, { sheetIdx: sheetIdx, rangeIdx: rangeIdx_1, changedData: dataSource_1 });
                                    }
                                }
                            });
                        }
                        else if (sheet.paneTopLeftCell && oldProp.sheets && oldProp.sheets["" + sheetIdx] &&
                            oldProp.sheets["" + sheetIdx].paneTopLeftCell) {
                            if (_this.activeSheetIndex !== Number(sheetIdx)) {
                                return;
                            }
                            var cIdx = getCellIndexes(sheet.paneTopLeftCell);
                            var pIdx = getCellIndexes(oldProp.sheets["" + sheetIdx].paneTopLeftCell);
                            if (cIdx[0] !== pIdx[0]) {
                                var frozenRow = _this.frozenRowCount(_this.getActiveSheet());
                                var top_1 = cIdx[0] > frozenRow ? getRowsHeight(_this.getActiveSheet(), frozenRow, cIdx[0] - 1) : 0;
                                _this.notify(updateScroll, { top: top_1 });
                            }
                            if (cIdx[1] !== pIdx[1]) {
                                var frozenCol = _this.frozenColCount(_this.getActiveSheet());
                                var left = cIdx[1] > frozenCol ? getColumnsWidth(_this.getActiveSheet(), frozenCol, cIdx[1] - 1) : 0;
                                _this.notify(updateScroll, { left: left });
                            }
                        }
                        else {
                            if (index === 0) {
                                _this.renderModule.refreshSheet();
                            }
                            if (_this.showSheetTabs && sheet.name && !sheetTabsRefreshed) {
                                var items = select('.e-sheet-tabs-items', _this.element);
                                var idx = Number(sheetIdx);
                                if (items.children[idx + 1]) {
                                    _this.notify(sheetNameUpdate, { items: items, value: sheet.name, idx: idx });
                                }
                                else {
                                    _this.notify(refreshSheetTabs, null);
                                    sheetTabsRefreshed = true;
                                }
                            }
                        }
                    });
                    break;
                case 'locale':
                    this.refresh();
                    break;
                case 'currencyCode':
                    if (!newProp.locale) {
                        this.refresh();
                    }
                    break;
                case 'password':
                    if (this.password.length > 0) {
                        if (this.showSheetTabs) {
                            this.element.querySelector('.e-add-sheet-tab').setAttribute('disabled', 'true');
                            this.element.querySelector('.e-add-sheet-tab').classList.add('e-disabled');
                        }
                    }
                    break;
                case 'isProtected':
                    if (this.isProtected) {
                        var addBtn_1 = this.element.getElementsByClassName('e-add-sheet-tab')[0];
                        if (addBtn_1) {
                            addBtn_1.disabled = this.isProtected;
                            if (this.isProtected) {
                                if (addBtn_1.classList.contains('e-disabled')) {
                                    addBtn_1.classList.add('e-disabled');
                                }
                            }
                            else {
                                if (!addBtn_1.classList.contains('e-disabled')) {
                                    addBtn_1.classList.remove('e-disabled');
                                }
                            }
                        }
                    }
                    break;
                case 'allowFreezePane':
                    this.notify(ribbon, { prop: 'allowFreezePane', onPropertyChange: true });
                    break;
                case 'allowImage':
                case 'allowChart':
                    this.renderModule.refreshSheet();
                    this.notify(ribbon, { prop: prop, onPropertyChange: true });
                    break;
                case 'calculationMode':
                    if (oldProp.calculationMode === 'Manual') {
                        this.notify(workbookFormulaOperation, { action: 'ClearDependentCellCollection' });
                    }
                    this.notify(ribbon, { prop: prop, onPropertyChange: true });
                    break;
                case 'allowResizing':
                    if (newProp.allowResizing) {
                        this.notify(propertyChange, { propertyName: prop });
                    }
                    break;
                case 'enableNotes':
                    if (newProp.enableNotes) {
                        this.notify(updateView, {});
                    }
                    break;
                case 'allowNumberFormatting':
                case 'allowWrap':
                case 'allowCellFormatting':
                    this.notify(ribbon, { prop: prop, onPropertyChange: true });
                    this.notify(updateView, {});
                    break;
                case 'showAggregate':
                    this.notify(showAggregate, { remove: !this.showAggregate });
                    break;
            }
        }
    };
    /**
     * To provide the array of modules needed for component rendering.
     *
     * @returns {ModuleDeclaration[]} - To provide the array of modules needed for component rendering.
     * @hidden
     */
    Spreadsheet.prototype.requiredModules = function () {
        return getRequiredModules(this);
    };
    /**
     * Appends the control within the given HTML Div element.
     *
     * {% codeBlock src='spreadsheet/appendTo/index.md' %}{% endcodeBlock %}
     *
     * @param {string | HTMLElement} selector - Target element where control needs to be appended.
     * @returns {void} - Appends the control within the given HTML Div element.
     */
    Spreadsheet.prototype.appendTo = function (selector) {
        _super.prototype.appendTo.call(this, selector);
    };
    /**
     * Filters the range of cells in the sheet.
     *
     * @hidden
     * @param {FilterOptions} filterOptions - specifiy the FilterOptions.
     * @param {string} range - Specify the range
     * @returns {Promise<FilterEventArgs>} - Filters the range of cells in the sheet.
     */
    Spreadsheet.prototype.filter = function (filterOptions, range) {
        if (!this.allowFiltering) {
            return Promise.reject();
        }
        range = range || this.getActiveSheet().selectedRange;
        return _super.prototype.filter.call(this, filterOptions, range);
    };
    /**
     * Clears the filter changes of the sheet.
     *
     * {% codeBlock src='spreadsheet/clearFilter/index.md' %}{% endcodeBlock %}
     *
     * @param {string} field - Specify the field.
     * @param {number} sheetIndex - Specify the index of the sheet.
     * @returns {void} - To clear the filter.
     */
    Spreadsheet.prototype.clearFilter = function (field, sheetIndex) {
        this.notify(clearFilter, { field: field, sheetIndex: sheetIndex });
    };
    /**
     * Applies the filter UI in the range of cells in the sheet.
     *
     * {% codeBlock src='spreadsheet/applyFilter/index.md' %}{% endcodeBlock %}
     *
     * @param {PredicateModel[]} predicates - Specifies the predicates.
     * @param {string} range - Specify the range.
     * @returns {Promise<void>} - to apply the filter.
     */
    Spreadsheet.prototype.applyFilter = function (predicates, range) {
        var _this = this;
        if (!this.allowFiltering) {
            return Promise.reject();
        }
        var promise = new Promise(function (resolve) { resolve((function () { })()); });
        if (predicates && predicates.length) {
            var eventArgs_1;
            predicates.forEach(function (predicate) {
                eventArgs_1 = { instance: { options: { type: predicate.type, format: predicate.type === 'date' && 'yMd' } },
                    arg3: predicate.value, arg2: predicate.operator };
                _this.notify(fltrPrevent, eventArgs_1);
                predicate.value = eventArgs_1.arg3;
            });
        }
        var sheetIdx = range ? getSheetIndexFromAddress(this, range) : this.activeSheetIndex;
        var filterArgs = { predicates: predicates, range: range, isInternal: true, promise: promise, sIdx: sheetIdx };
        this.notify(initiateFilterUI, filterArgs);
        return filterArgs.promise;
    };
    /**
     * To add custom library function.
     *
     *  {% codeBlock src='spreadsheet/addCustomFunction/index.md' %}{% endcodeBlock %}
     *
     * @param {string} functionHandler - Custom function handler name
     * @param {string} functionName - Custom function name
     * @param  {string} formulaDescription - Specifies formula description.
     * @returns {void} - To add custom function.
     */
    Spreadsheet.prototype.addCustomFunction = function (functionHandler, functionName, formulaDescription) {
        _super.prototype.addCustomFunction.call(this, functionHandler, functionName, formulaDescription);
        this.notify(refreshFormulaDatasource, null);
    };
    /**
     * Sets or releases the read-only status for a specified range in the given sheet.
     *
     * @param {boolean} readOnly - A boolean indicating whether the range should be set as read-only (true) or editable (false).
     * @param {string} range - The range to be set as read-only. It can be a single cell, a range of cells (e.g., "A1:B5"), a column (e.g., "C"), or a row (e.g., "10").
     * @param {number} sheetIndex - The index of the sheet where the range is located. If not provided, it defaults to the active sheet index.
     * @returns {void} - Sets the read-only status for a specified range in the given sheet.
     *
     */
    Spreadsheet.prototype.setRangeReadOnly = function (readOnly, range, sheetIndex) {
        range = range || this.getActiveSheet().selectedRange;
        var sheetIdx = sheetIndex || this.activeSheetIndex;
        var indexes = getSwapRange(getRangeIndexes(range));
        var sheet = getSheet(this, sheetIdx);
        if (isNullOrUndefined(sheet)) {
            return;
        }
        this.notify('actionBegin', { action: 'readonly', eventArgs: { readOnly: readOnly, range: range, sheetIdx: sheetIdx } });
        if (isColumnRange(range) || (indexes[0] === 0 && indexes[2] === sheet.rowCount - 1)) {
            for (var col = indexes[1]; col <= indexes[3]; col++) {
                if (!readOnly) {
                    var column = getColumn(sheet, col);
                    if (column && column.isReadOnly) {
                        delete column.isReadOnly;
                    }
                }
                else {
                    setColumn(sheet, col, { isReadOnly: readOnly });
                }
            }
        }
        else if (isRowRange(range) || (indexes[1] === 0 && indexes[3] === sheet.colCount - 1)) {
            for (var row = indexes[0]; row <= indexes[2]; row++) {
                if (!readOnly) {
                    var rowValue = getRow(sheet, row);
                    if (rowValue && rowValue.isReadOnly) {
                        delete rowValue.isReadOnly;
                    }
                }
                else {
                    setRow(sheet, row, { isReadOnly: readOnly });
                }
            }
        }
        else {
            for (var colIdx = indexes[1]; colIdx <= indexes[3]; colIdx++) {
                for (var rowIdx = indexes[0]; rowIdx <= indexes[2]; rowIdx++) {
                    if (!readOnly) {
                        var cell = getCell(rowIdx, colIdx, sheet);
                        if (cell && cell.isReadOnly) {
                            delete cell.isReadOnly;
                        }
                    }
                    else {
                        setCell(rowIdx, colIdx, sheet, { isReadOnly: readOnly }, true);
                    }
                }
            }
        }
        // Added the e-readonly class to cell range/column for providing the customization option from sample end to the readonly mode cells.
        for (var colIndex = indexes[1]; colIndex <= indexes[3]; colIndex++) {
            for (var rowIndex = indexes[0]; rowIndex <= indexes[2]; rowIndex++) {
                var cell = this.getCell(rowIndex, colIndex);
                if (!readOnly && cell && cell.classList.contains('e-readonly')) {
                    cell.classList.remove('e-readonly');
                }
                else if (cell && !cell.classList.contains('e-readonly')) {
                    cell.className += ' e-readonly';
                }
            }
        }
        this.notify('actionComplete', { action: 'readonly', eventArgs: { readOnly: readOnly, range: range, sheetIdx: sheetIdx } });
    };
    var Spreadsheet_1;
    __decorate([
        Property('')
    ], Spreadsheet.prototype, "cssClass", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "allowScrolling", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "allowResizing", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "showAggregate", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "enableClipboard", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "enableContextMenu", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "enableKeyboardNavigation", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "enableKeyboardShortcut", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "allowUndoRedo", void 0);
    __decorate([
        Property(true)
    ], Spreadsheet.prototype, "allowWrap", void 0);
    __decorate([
        Complex({}, SelectionSettings)
    ], Spreadsheet.prototype, "selectionSettings", void 0);
    __decorate([
        Complex({}, ScrollSettings)
    ], Spreadsheet.prototype, "scrollSettings", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeCellRender", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeSelect", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "select", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "contextMenuBeforeOpen", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "fileMenuBeforeOpen", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "contextMenuBeforeClose", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "dialogBeforeOpen", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "fileMenuBeforeClose", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "contextMenuItemSelect", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "fileMenuItemSelect", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeDataBound", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "dataSourceChanged", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "cellEdit", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "cellEditing", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "cellEdited", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "cellSave", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeCellSave", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "created", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeSort", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeHyperlinkCreate", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "afterHyperlinkCreate", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeHyperlinkClick", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "afterHyperlinkClick", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "beforeConditionalFormat", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "openComplete", void 0);
    __decorate([
        Event()
    ], Spreadsheet.prototype, "sortComplete", void 0);
    __decorate([
        Property('USD')
    ], Spreadsheet.prototype, "currencyCode", void 0);
    Spreadsheet = Spreadsheet_1 = __decorate([
        NotifyPropertyChanges
    ], Spreadsheet);
    return Spreadsheet;
}(Workbook));
export { Spreadsheet };
