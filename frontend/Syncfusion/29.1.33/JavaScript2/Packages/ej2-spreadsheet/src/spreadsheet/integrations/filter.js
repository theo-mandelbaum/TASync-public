import { locale, dialog, mouseDown, renderFilterCell, initiateFilterUI, getStartEvent, focus, getChartsIndexes, refreshChartCellModel, readonlyAlert } from '../index';
import { reapplyFilter, filterCellKeyDown, refreshFilterRange, createNoteIndicator } from '../index';
import { getFilteredColumn, cMenuBeforeOpen, filterByCellValue, clearFilter, getFilterRange, applySort } from '../index';
import { applyPredicates, isHiddenRow, isReadOnlyCells } from '../../workbook/index';
import { checkIsNumberAndGetNumber } from '../../workbook/common/internalization';
import { filterRangeAlert, setFilteredCollection, beforeDelete, sheetsDestroyed, initiateFilter, duplicateSheetFilterHandler, moveSheetHandler, updateSortCollection } from '../../workbook/common/event';
import { getRangeIndexes, beforeInsert, parseLocaleNumber } from '../../workbook/index';
import { getIndexesFromAddress, getSwapRange, getColumnHeaderText, getDataRange, isCustomDateTime } from '../../workbook/index';
import { getData, getTypeFromFormat, getCell, getCellIndexes, getRangeAddress, getSheet, inRange } from '../../workbook/index';
import { sortImport, clear, getColIndex, setRow, hideShow } from '../../workbook/index';
import { beginAction, getValueFromFormat } from '../../workbook/index';
import { isFilterHidden, isNumber, checkDateFormat, isDateTime, dateToInt, getFormatFromType } from '../../workbook/index';
import { getComponent, EventHandler, isUndefined, isNullOrUndefined, Browser, removeClass, IntlBase, cldrData } from '@syncfusion/ej2-base';
import { detach, classList, getNumericObject } from '@syncfusion/ej2-base';
import { Internationalization } from '@syncfusion/ej2-base';
import { refreshFilterCellsOnResize, updateWrapCell } from '../common/index';
import { ExcelFilterBase, beforeFltrcMenuOpen, CheckBoxFilterBase, getUid } from '@syncfusion/ej2-grids';
import { filterCmenuSelect, filterCboxValue, filterDialogCreated, filterDialogClose, createCboxWithWrap } from '@syncfusion/ej2-grids';
import { parentsUntil, toogleCheckbox, fltrPrevent, beforeCustomFilterOpen } from '@syncfusion/ej2-grids';
import { Query, DataManager, Predicate, Deferred } from '@syncfusion/ej2-data';
import { TreeView } from '@syncfusion/ej2-navigations';
import { TextBox } from '@syncfusion/ej2-inputs';
import { completeAction, contentLoaded, beforeCheckboxRender, refreshCheckbox } from '../../spreadsheet/index';
/**
 * `Filter` module is used to handle the filter action in Spreadsheet.
 */
var Filter = /** @class */ (function () {
    /**
     * Constructor for filter module.
     *
     * @param {Spreadsheet} parent - Specifies the Spreadsheet.
     */
    function Filter(parent) {
        this.parent = parent;
        this.filterCollection = new Map();
        this.filterRange = new Map();
        this.filterBtn = parent.createElement('div', { className: 'e-filter-btn e-control e-btn e-lib e-filter-iconbtn e-icon-btn' });
        this.filterBtn.appendChild(parent.createElement('span', { className: 'e-btn-icon e-icons e-filter-icon' }));
        this.addEventListener();
    }
    /**
     * To destroy the filter module.
     *
     * @returns {void} - To destroy the filter module.
     */
    Filter.prototype.destroy = function () {
        var _this = this;
        this.removeEventListener();
        if (this.parent.refreshing && this.filterRange.size) {
            this.parent.filterCollection = [];
            this.filterRange.forEach(function (_value, sheetIdx) {
                _this.setFilteredCollection({ sheetIdx: sheetIdx, saveJson: { filterCollection: _this.parent.filterCollection } });
            });
        }
        this.filterRange = null;
        this.filterCollection = null;
        if (this.filterBtn) {
            this.filterBtn.remove();
        }
        this.filterBtn = null;
        if (this.treeViewObj) {
            this.treeViewObj.destroy();
        }
        this.treeViewObj = null;
        if (this.treeViewEle) {
            this.treeViewEle.remove();
        }
        this.treeViewEle = null;
        if (this.cBox) {
            this.cBox.remove();
            this.cBox = null;
        }
        var filterPopupElement = document.querySelectorAll('.e-filter-popup');
        if (filterPopupElement) {
            filterPopupElement.forEach(function (element) {
                element.remove();
            });
        }
        this.parent = null;
    };
    Filter.prototype.addEventListener = function () {
        this.parent.on(filterRangeAlert, this.filterRangeAlertHandler, this);
        this.parent.on(initiateFilterUI, this.initiateFilterUIHandler, this);
        this.parent.on(mouseDown, this.filterMouseDownHandler, this);
        this.parent.on(renderFilterCell, this.renderFilterCellHandler, this);
        this.parent.on(refreshFilterRange, this.refreshFilterRange, this);
        this.parent.on(updateSortCollection, this.updateSortCollectionHandler, this);
        this.parent.on(beforeFltrcMenuOpen, this.beforeFilterMenuOpenHandler, this);
        this.parent.on(filterCmenuSelect, this.closeDialog, this);
        this.parent.on(reapplyFilter, this.reapplyFilterHandler, this);
        this.parent.on(filterByCellValue, this.filterByCellValueHandler, this);
        this.parent.on(clearFilter, this.clearFilterHandler, this);
        this.parent.on(getFilteredColumn, this.getFilteredColumnHandler, this);
        this.parent.on(cMenuBeforeOpen, this.cMenuBeforeOpenHandler, this);
        this.parent.on(filterCboxValue, this.filterCboxValueHandler, this);
        this.parent.on(getFilterRange, this.getFilterRangeHandler, this);
        this.parent.on(filterCellKeyDown, this.filterCellKeyDownHandler, this);
        this.parent.on(setFilteredCollection, this.setFilteredCollection, this);
        this.parent.on(contentLoaded, this.updateFilter, this);
        this.parent.on(beforeInsert, this.beforeInsertHandler, this);
        this.parent.on(beforeDelete, this.beforeDeleteHandler, this);
        this.parent.on(sheetsDestroyed, this.deleteSheetHandler, this);
        this.parent.on(clear, this.clearHandler, this);
        this.parent.on(filterDialogCreated, this.filterDialogCreatedHandler, this);
        this.parent.on(filterDialogClose, this.removeFilterClass, this);
        this.parent.on(duplicateSheetFilterHandler, this.duplicateSheetFilterHandler, this);
        this.parent.on(fltrPrevent, this.beforeFilteringHandler, this);
        this.parent.on(beforeCustomFilterOpen, this.customFilterOpen, this);
        this.parent.on(moveSheetHandler, this.moveSheetHandler, this);
        this.parent.on(refreshFilterCellsOnResize, this.refreshFilterCellsOnResize, this);
    };
    Filter.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(filterRangeAlert, this.filterRangeAlertHandler);
            this.parent.off(initiateFilterUI, this.initiateFilterUIHandler);
            this.parent.off(mouseDown, this.filterMouseDownHandler);
            this.parent.off(renderFilterCell, this.renderFilterCellHandler);
            this.parent.off(refreshFilterRange, this.refreshFilterRange);
            this.parent.off(updateSortCollection, this.updateSortCollectionHandler);
            this.parent.off(beforeFltrcMenuOpen, this.beforeFilterMenuOpenHandler);
            this.parent.off(filterCmenuSelect, this.closeDialog);
            this.parent.off(reapplyFilter, this.reapplyFilterHandler);
            this.parent.off(filterByCellValue, this.filterByCellValueHandler);
            this.parent.off(clearFilter, this.clearFilterHandler);
            this.parent.off(getFilteredColumn, this.getFilteredColumnHandler);
            this.parent.off(cMenuBeforeOpen, this.cMenuBeforeOpenHandler);
            this.parent.off(filterCboxValue, this.filterCboxValueHandler);
            this.parent.off(getFilterRange, this.getFilterRangeHandler);
            this.parent.off(filterCellKeyDown, this.filterCellKeyDownHandler);
            this.parent.off(setFilteredCollection, this.setFilteredCollection);
            this.parent.off(contentLoaded, this.updateFilter);
            this.parent.off(beforeInsert, this.beforeInsertHandler);
            this.parent.off(beforeDelete, this.beforeDeleteHandler);
            this.parent.off(sheetsDestroyed, this.deleteSheetHandler);
            this.parent.off(clear, this.clearHandler);
            this.parent.off(filterDialogCreated, this.filterDialogCreatedHandler);
            this.parent.off(filterDialogClose, this.removeFilterClass);
            this.parent.off(duplicateSheetFilterHandler, this.duplicateSheetFilterHandler);
            this.parent.off(fltrPrevent, this.beforeFilteringHandler);
            this.parent.off(beforeCustomFilterOpen, this.customFilterOpen);
            this.parent.off(moveSheetHandler, this.moveSheetHandler);
            this.parent.off(refreshFilterCellsOnResize, this.refreshFilterCellsOnResize);
        }
    };
    /**
     * Gets the module name.
     *
     * @returns {string} - Gets the module name.
     */
    Filter.prototype.getModuleName = function () {
        return 'filter';
    };
    /**
     * Validates the range and returns false when invalid.
     *
     * @param {SheetModel} sheet - Specify the sheet.
     * @param {string} range - Specify the range.
     * @returns {void} - Validates the range and returns false when invalid.
     */
    Filter.prototype.isInValidFilterRange = function (sheet, range) {
        var selectedRange = range ? getSwapRange(getIndexesFromAddress(range)) :
            getSwapRange(getIndexesFromAddress(sheet.selectedRange));
        var isEmptySheet = false;
        if (sheet.usedRange.colIndex === 0 && sheet.usedRange.rowIndex === 0 && isNullOrUndefined(sheet.rows[sheet.usedRange.rowIndex])) {
            isEmptySheet = true; // For Filtering Empty sheet's A1 cell.
        }
        return selectedRange[0] > sheet.usedRange.rowIndex || selectedRange[1] > sheet.usedRange.colIndex || isEmptySheet;
    };
    /**
     * Shows the range error alert dialog.
     *
     * @param {any} args - Specifies the args
     * @param {string} args.error - range error string.
     * @returns {void} - Shows the range error alert dialog.
     */
    Filter.prototype.filterRangeAlertHandler = function (args) {
        var _this = this;
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        dialogInst.show({
            content: args.error, isModal: true,
            height: 180, width: 400, showCloseIcon: true,
            beforeOpen: function (args) {
                var dlgArgs = {
                    dialogName: 'FilterRangeDialog',
                    element: args.element, target: args.target, cancel: args.cancel
                };
                _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                if (dlgArgs.cancel) {
                    args.cancel = true;
                }
                else {
                    focus(_this.parent.element);
                }
            }
        });
        this.parent.hideSpinner();
    };
    /**
     * Triggers before filter context menu opened and used to add sorting items.
     *
     * @param {any} args - Specifies the args
     * @param {HTMLElement} args.element - Specify the element
     * @returns {void} - Triggers before filter context menu opened and used to add sorting items.
     */
    Filter.prototype.beforeFilterMenuOpenHandler = function (args) {
        var l10n = this.parent.serviceLocator.getService(locale);
        args.element.classList.add('e-spreadsheet-contextmenu'); // to show sort icons
        var ul = args.element.querySelector('ul');
        this.addMenuItem(ul, l10n.getConstant('SortDescending'), 'e-filter-sortdesc', 'e-sort-desc');
        this.addMenuItem(ul, l10n.getConstant('SortAscending'), 'e-filter-sortasc', 'e-sort-asc');
        args.element.appendChild(ul);
    };
    /**
     * Creates new menu item element
     *
     * @param {Element} ul - Specify the element.
     * @param {string} text - Specify the text.
     * @param {string} className - Specify the className
     * @param {string} iconCss - Specify the iconCss
     * @returns {void} - Creates new menu item element
     */
    Filter.prototype.addMenuItem = function (ul, text, className, iconCss) {
        var li = this.parent.createElement('li', { className: className + ' e-menu-item' });
        if (!this.parent.allowSorting) {
            li.classList.add('e-disabled');
        }
        li.innerText = text;
        li.insertBefore(this.parent.createElement('span', { className: 'e-menu-icon e-icons ' + iconCss }), li.firstChild);
        ul.insertBefore(li, ul.firstChild);
    };
    /**
     * Initiates the filter UI for the selected range.
     *
     * @param {any} args - Specifies the args
     * @param {PredicateModel[]} args.predicates - Specify the predicates.
     * @param {number} args.range - Specify the range.
     * @param {Promise<FilterEventArgs>} args.promise - Spefify the promise.
     * @param {number} args.sIdx - Specify the sIdx
     * @param {boolean} args.isCut - Specify the bool value
     * @param {boolean} args.isUndoRedo - Specify the bool value
     * @param {boolean} args.isInternal - Specify the isInternal.
     * @param {boolean} args.useFilterRange - Specify the use Filter Range.
     * @param {boolean} args.isOpen - Specify the isOpen.
     * @param {boolean} args.allowHeaderFilter - Specify the allow header filter.
     * @returns {void} - Initiates the filter UI for the selected range.
     */
    Filter.prototype.initiateFilterUIHandler = function (args) {
        var _this = this;
        var predicates = args ? args.predicates : null;
        var sheetIdx = args.sIdx;
        if (!sheetIdx && sheetIdx !== 0) {
            sheetIdx = args.isOpen ? 0 : this.parent.activeSheetIndex;
        }
        var deferred;
        if (args.promise) {
            deferred = new Deferred();
            args.promise = deferred.promise;
        }
        var resolveFn = function () {
            if (deferred) {
                deferred.resolve();
            }
        };
        var isInternal = args.isInternal || args.isCut;
        if (this.filterRange.size > 0 && this.filterRange.has(sheetIdx) && !this.parent.isOpen && !predicates) { //disable filter
            this.removeFilter(sheetIdx, isInternal, false);
            resolveFn();
            return;
        }
        var sheet = getSheet(this.parent, sheetIdx);
        if (this.isInValidFilterRange(sheet, args.range)) {
            var l10n = this.parent.serviceLocator.getService(locale);
            this.filterRangeAlertHandler({ error: l10n.getConstant('FilterOutOfRangeError') });
            resolveFn();
            return;
        }
        var selectedRange = args.range || sheet.selectedRange;
        var eventArgs;
        var actionArgs;
        if (!isInternal) {
            eventArgs = { range: selectedRange, sheetIndex: sheetIdx, cancel: false, allowHeaderFilter: false };
            if (args.predicates) {
                eventArgs.predicates = args.predicates;
                eventArgs.previousPredicates = this.filterCollection.get(sheetIdx) && [].slice.call(this.filterCollection.get(sheetIdx));
            }
            else {
                eventArgs.filterOptions = { predicates: args.predicates };
            }
            eventArgs.useFilterRange = false;
            actionArgs = { action: 'filter', eventArgs: eventArgs };
            this.parent.notify(beginAction, actionArgs);
            if (eventArgs.cancel) {
                resolveFn();
                return;
            }
            delete eventArgs.cancel;
            args.useFilterRange = eventArgs.useFilterRange;
            args.allowHeaderFilter = eventArgs.allowHeaderFilter;
        }
        if (!args.range && (isInternal || selectedRange === eventArgs.range)) {
            var rangeIdx = getRangeIndexes(selectedRange);
            if (rangeIdx[0] === rangeIdx[2] && rangeIdx[1] === rangeIdx[3]) {
                rangeIdx = getDataRange(rangeIdx[0], rangeIdx[1], sheet);
                selectedRange = getRangeAddress(rangeIdx);
                if (!isInternal) {
                    eventArgs.range = selectedRange;
                }
            }
        }
        else if (!isInternal) {
            selectedRange = eventArgs.range;
        }
        if (predicates) {
            if (predicates.length) {
                var filterRange = this.filterRange.get(sheetIdx);
                if (filterRange) {
                    args.useFilterRange = filterRange.useFilterRange;
                    args.allowHeaderFilter = filterRange.allowHeaderFilter;
                }
                this.processRange(sheet, sheetIdx, selectedRange, true, args.useFilterRange, args.allowHeaderFilter);
                var range = this.filterRange.get(sheetIdx).range.slice();
                if (!args.allowHeaderFilter) {
                    range[0] = range[0] + 1; // to skip first row.
                }
                if (!args.useFilterRange) {
                    range[2] = sheet.usedRange.rowIndex; //filter range should be till used range.
                }
                range[1] = range[3] = getColIndex(predicates[0].field);
                var addr = sheet.name + "!" + this.getPredicateRange(range, predicates.slice(1, predicates.length));
                var fullAddr = getRangeAddress(range);
                getData(this.parent, addr, true, true, null, true, null, null, false, fullAddr).then(function (jsonData) {
                    _this.filterSuccessHandler(new DataManager(jsonData), { action: 'filtering', filterCollection: predicates, field: predicates[0].field, sIdx: args.sIdx,
                        isInternal: isInternal, isOpen: args.isOpen, prevPredicates: eventArgs && eventArgs.previousPredicates });
                    resolveFn();
                });
                return;
            }
            else {
                this.clearFilterHandler({ sheetIndex: sheetIdx });
                resolveFn();
            }
        }
        else {
            this.processRange(sheet, sheetIdx, selectedRange, false, args.useFilterRange, args.allowHeaderFilter);
            resolveFn();
        }
        if (!isInternal) {
            this.parent.notify(completeAction, actionArgs);
            focus(this.parent.element);
        }
    };
    /**
     * Processes the range if no filter applied.
     *
     * @param {SheetModel} sheet - Specify the sheet.
     * @param {number} sheetIdx - Specify the sheet index.
     * @param {string} filterRange - Specify the filterRange.
     * @param {boolean} preventRefresh - To prevent refreshing the filter buttons.
     * @param {boolean} useFilterRange - Specifies whether to consider filtering range or used range during filering.
     * @param {boolean} allowHeaderFilter - Specifies whether to consider first row during filtering.
     * @returns {void} - Processes the range if no filter applied.
     */
    Filter.prototype.processRange = function (sheet, sheetIdx, filterRange, preventRefresh, useFilterRange, allowHeaderFilter) {
        var range = getSwapRange(getIndexesFromAddress(filterRange || sheet.selectedRange));
        if (range[0] === range[2] && range[1] === range[3]) { //if selected range is a single cell
            range[0] = 0;
            range[1] = 0;
            range[2] = sheet.usedRange.rowIndex;
            range[3] = sheet.usedRange.colIndex;
        }
        else if (range[3] > sheet.usedRange.colIndex) {
            range[3] = sheet.usedRange.colIndex;
        }
        var filterOption = { useFilterRange: useFilterRange,
            range: range };
        if (allowHeaderFilter) {
            filterOption.allowHeaderFilter = allowHeaderFilter;
        }
        this.filterRange.set(sheetIdx, filterOption);
        this.filterCollection.set(sheetIdx, []);
        if (!preventRefresh) {
            this.refreshFilterRange(range, false, sheetIdx);
        }
    };
    /**
     * Removes all the filter related collections for the active sheet.
     *
     * @param {number} sheetIdx - Specify the sheet index.
     * @param {boolean} isCut - Specify the bool value.
     * @param {boolean} preventRefresh - Specify the preventRefresh.
     * @param {boolean} clearAction - Specify the current action is clear or not.
     * @returns {void} - Removes all the filter related collections for the active sheet.
     */
    Filter.prototype.removeFilter = function (sheetIdx, isCut, preventRefresh, clearAction) {
        var filterOption = this.filterRange.get(sheetIdx);
        var range = filterOption.range.slice();
        var allowHeaderFilter = filterOption.allowHeaderFilter;
        var rangeAddr = getRangeAddress(range);
        var args;
        if (!isCut) {
            args = { action: 'filter', eventArgs: { range: rangeAddr, sheetIndex: sheetIdx, cancel: false }, isClearAction: clearAction };
            this.parent.notify(beginAction, args);
            if (args.eventArgs.cancel) {
                return;
            }
            delete args.eventArgs.cancel;
        }
        if (this.filterCollection.get(sheetIdx).length || preventRefresh) {
            if (this.filterCollection.get(sheetIdx).length && clearAction) {
                var newArgs = {
                    action: 'filter',
                    eventArgs: {
                        range: rangeAddr, sheetIndex: sheetIdx, predicates: [], previousPredicates: this.filterCollection.get(sheetIdx)
                    }, isClearAction: clearAction
                };
                this.parent.notify(completeAction, newArgs);
            }
            this.clearFilterHandler({ preventRefresh: preventRefresh, sheetIndex: sheetIdx });
        }
        this.filterRange.delete(sheetIdx);
        this.filterCollection.delete(sheetIdx);
        this.refreshFilterRange(range, true, sheetIdx, allowHeaderFilter);
        if (!isCut) {
            this.parent.notify(completeAction, args);
        }
    };
    /**
     * Handles filtering cell value based on context menu.
     *
     * @returns {void} - Handles filtering cell value based on context menu.
     */
    Filter.prototype.filterByCellValueHandler = function () {
        var _this = this;
        var sheetIdx = this.parent.activeSheetIndex;
        var sheet = this.parent.getActiveSheet();
        if (this.isInValidFilterRange(sheet)) {
            var l10n = this.parent.serviceLocator.getService(locale);
            this.filterRangeAlertHandler({ error: l10n.getConstant('FilterOutOfRangeError') });
            return;
        }
        var cell = getRangeIndexes(sheet.activeCell);
        var isNotFilterRange;
        if (!this.isFilterRange(sheetIdx, cell[0], cell[1])) {
            isNotFilterRange = true;
            this.processRange(sheet, sheetIdx);
        }
        var filterOption = this.filterRange.get(sheetIdx);
        var range = filterOption.range.slice();
        var filterRange = getRangeAddress(range);
        range[0] = range[0] + 1; // to skip first row.
        range[2] = sheet.usedRange.rowIndex; //filter range should be till used range.
        range[1] = range[3] = cell[1];
        var field = getColumnHeaderText(cell[1] + 1);
        var selectedCell = getCell(cell[0], cell[1], sheet);
        var cellVal = getValueFromFormat(this.parent, selectedCell, cell[0], cell[1]);
        var predicates = [{ field: field, operator: 'equal', type: this.getColumnType(sheet, cell[1], cell).type,
                matchCase: false, value: cellVal }];
        var prevPredicates = [].slice.call(this.filterCollection.get(sheetIdx));
        if (!prevPredicates.length) {
            prevPredicates = undefined;
        }
        var eventArgs = { range: filterRange, predicates: predicates,
            previousPredicates: prevPredicates, sheetIndex: sheetIdx, cancel: false, allowHeaderFilter: false };
        this.parent.notify(beginAction, { action: 'filter', eventArgs: eventArgs });
        if (eventArgs.cancel) {
            if (isNotFilterRange) {
                this.removeFilter(sheetIdx, true);
            }
            return;
        }
        if (eventArgs.allowHeaderFilter) {
            filterOption.allowHeaderFilter = eventArgs.allowHeaderFilter;
            range[0]--;
        }
        var addr = sheet.name + "!" + this.getPredicateRange(range, this.filterCollection.get(sheetIdx));
        var fullAddr = getRangeAddress(range);
        getData(this.parent, addr, true, true, null, true, null, null, false, fullAddr).then(function (jsonData) {
            _this.filterSuccessHandler(new DataManager(jsonData), { action: 'filtering', filterCollection: predicates, field: field, isFilterByValue: true });
        });
    };
    /**
     * Creates filter buttons and renders the filter applied cells.
     *
     * @param { any} args - Specifies the args
     * @param { HTMLElement} args.td - specify the element
     * @param { number} args.rowIndex - specify the rowIndex
     * @param { number} args.colIndex - specify the colIndex
     * @param { number} args.sIdx - specify the sIdx
     * @param { boolean} args.isAction - specify the apply filter action.
     * @returns {void} - Creates filter buttons and renders the filter applied cells.
     */
    Filter.prototype.renderFilterCellHandler = function (args) {
        var sheetIdx = !isNullOrUndefined(args.sIdx) ? args.sIdx : this.parent.activeSheetIndex;
        if (sheetIdx === this.parent.activeSheetIndex) {
            var option = this.filterRange.get(sheetIdx) &&
                this.filterRange.get(sheetIdx);
            var range = option && option.range;
            if (range && (range[0] === args.rowIndex || option.allowHeaderFilter) && range[1] <= args.colIndex &&
                range[3] >= args.colIndex) {
                if (!args.td || args.td.classList.contains(option.allowHeaderFilter ? 'e-cell' : 'e-header-cell')) {
                    return;
                }
                var filterButton = args.td.querySelector('.e-filter-icon');
                var filterSortCls = '';
                var sortCollection = this.parent.sortCollection;
                var field = getColumnHeaderText(args.colIndex + 1);
                var predicates = this.filterCollection.get(sheetIdx);
                for (var i = 0; i < predicates.length; i++) {
                    if (predicates[i].field === field) {
                        filterSortCls = ' e-filtered';
                        break;
                    }
                }
                if (sortCollection) {
                    for (var i = 0; i < sortCollection.length; i++) {
                        if (sortCollection[i].sheetIndex === sheetIdx &&
                            sortCollection[i].columnIndex === args.colIndex) {
                            filterSortCls += sortCollection[i].order === 'Ascending' ? ' e-sortasc-filter' : ' e-sortdesc-filter';
                            break;
                        }
                    }
                }
                if (filterButton) {
                    filterButton.className = "e-btn-icon e-icons e-filter-icon" + filterSortCls;
                }
                else {
                    var isNoteAvailable = false;
                    filterButton = this.filterBtn.cloneNode(true);
                    if (args.td.children.length > 0 && args.td.children[args.td.childElementCount - 1].className.indexOf('e-addNoteIndicator') > -1) {
                        args.td.removeChild(args.td.children[args.td.childElementCount - 1]);
                        isNoteAvailable = true;
                    }
                    filterButton.firstElementChild.className = "e-btn-icon e-icons e-filter-icon" + filterSortCls;
                    args.td.insertBefore(filterButton, args.td.firstChild);
                    if (args.isAction) {
                        var sheet = getSheet(this.parent, sheetIdx);
                        if (getCell(args.rowIndex, args.colIndex, sheet, false, true).wrap) {
                            this.parent.notify(updateWrapCell, { rowIdx: args.rowIndex, colIdx: args.colIndex, sheet: sheet, ele: args.td });
                        }
                    }
                    if (isNoteAvailable) {
                        this.parent.notify(createNoteIndicator, { targetElement: args.td, rowIndex: args.rowIndex, columnIndex: args.colIndex });
                    }
                }
            }
        }
    };
    /**
     * Refreshes the filter header range.
     *
     * @param {number[]} filterRange - Specify the filterRange.
     * @param {boolean} remove - Specify the bool value
     * @param {number} sIdx - Specify the index.
     * @param {boolean} allowHeaderFilter - Specifies whether to consider first row during filtering.
     * @returns {void} - Refreshes the filter header range.
     */
    Filter.prototype.refreshFilterRange = function (filterRange, remove, sIdx, allowHeaderFilter) {
        var sheetIdx = sIdx;
        if (!sheetIdx && sheetIdx !== 0) {
            sheetIdx = this.parent.activeSheetIndex;
        }
        var filterOption = this.filterRange && this.filterRange.get(sheetIdx);
        if (!filterOption) {
            if (!filterRange) {
                filterRange = [0, 0, 0, 0];
            }
        }
        else {
            filterRange = filterRange || filterOption.range.slice();
            allowHeaderFilter = filterOption.allowHeaderFilter;
        }
        var range = filterRange;
        var cell;
        var sheet = getSheet(this.parent, sheetIdx);
        var frozenCol = this.parent.frozenColCount(sheet);
        for (var index = range[1]; index <= range[3]; index++) {
            if (allowHeaderFilter) {
                var table = index < frozenCol ? this.parent.sheetModule.getSelectAllTable() :
                    this.parent.getColHeaderTable();
                var headerRow = table && this.parent.getRow(0, table);
                cell = headerRow && this.parent.getCell(0, index, headerRow);
            }
            else {
                if (!isHiddenRow(sheet, range[0])) {
                    cell = this.parent.getCell(range[0], index);
                }
                else {
                    cell = null;
                }
            }
            if (remove) {
                if (cell) {
                    var filterBtn = cell.querySelector('.e-filter-btn');
                    if (filterBtn) {
                        var isNoteAvailable = false;
                        if (cell.children.length > 0 && cell.children[cell.childElementCount - 1].className.indexOf('e-addNoteIndicator') > -1) {
                            cell.removeChild(cell.children[cell.childElementCount - 1]);
                            isNoteAvailable = true;
                        }
                        filterBtn.parentElement.removeChild(filterBtn);
                        if (isNoteAvailable) {
                            this.parent.notify(createNoteIndicator, { targetElement: cell, rowIndex: range[0], columnIndex: index });
                        }
                    }
                }
            }
            else {
                this.renderFilterCellHandler({ td: cell, rowIndex: range[0], colIndex: index, sIdx: sheetIdx, isAction: true });
            }
        }
        if (this.parent.sortCollection) {
            this.parent.notify(sortImport, null);
        }
    };
    /**
     * Checks whether the provided cell is a filter cell.
     *
     * @param {number} sheetIdx - Specify the sheet index.
     * @param {number} rowIndex - Specify the row index
     * @param {number} colIndex - Specify the col index.
     * @returns {boolean} - Checks whether the provided cell is a filter cell.
     */
    Filter.prototype.isFilterCell = function (sheetIdx, rowIndex, colIndex) {
        var range = this.filterRange.has(sheetIdx) && this.filterRange.get(sheetIdx).range;
        return (range && range[0] === rowIndex && range[1] <= colIndex && range[3] >= colIndex);
    };
    /**
     * Checks whether the provided cell is in a filter range
     *
     * @param {number} sheetIdx - Specify the sheet index.
     * @param {number} rowIndex - Specify the row index
     * @param {number} colIndex - Specify the col index.
     * @returns {boolean} - Checks whether the provided cell is in a filter range
     */
    Filter.prototype.isFilterRange = function (sheetIdx, rowIndex, colIndex) {
        var range = this.filterRange.get(sheetIdx) && this.filterRange.get(sheetIdx).range;
        return (range && range[0] <= rowIndex && range[2] >= rowIndex && range[1] <= colIndex && range[3] >= colIndex);
    };
    /**
     * Gets the filter information from active cell
     *
     * @param {any} args - Specifies the args
     * @param {string} args.field - Specify the field
     * @param {string} args.clearFilterText - Specify the clearFilterText
     * @param {boolean} args.isFiltered - Specify the isFiltered
     * @param {boolean} args.isClearAll - Specify the isClearAll
     * @param {number} args.sheetIndex - Specify the sheet index value.
     * @returns {void} - Triggers before context menu created to enable or disable items.
     */
    Filter.prototype.getFilteredColumnHandler = function (args) {
        var sheetIdx = isUndefined(args.sheetIndex) ? this.parent.activeSheetIndex : args.sheetIndex;
        var l10n = this.parent.serviceLocator.getService(locale);
        args.clearFilterText = l10n.getConstant('ClearFilter');
        if (this.filterRange.has(sheetIdx)) {
            var filterCollection = this.filterCollection.get(sheetIdx);
            if (args.isClearAll) {
                args.isFiltered = filterCollection && filterCollection.length > 0;
                return;
            }
            var range = this.filterRange.get(sheetIdx).range.slice();
            var sheet = getSheet(this.parent, sheetIdx);
            var cell = getCellIndexes(sheet.activeCell);
            if (this.isFilterRange(sheetIdx, cell[0], cell[1])) {
                args.field = getColumnHeaderText(cell[1] + 1);
                var headerCell = getCell(range[0], cell[1], sheet);
                var cellValue = this.parent.getDisplayText(headerCell);
                args.clearFilterText = l10n.getConstant('ClearFilterFrom') + '"'
                    + (cellValue ? cellValue.toString() : 'Column ' + args.field) + '"';
                filterCollection.some(function (value) {
                    args.isFiltered = value.field === args.field;
                    return args.isFiltered;
                });
            }
        }
    };
    /**
     * Triggers before context menu created to enable or disable items.
     *
     * @param {any} e - Specifies the args
     * @param {HTMLElement} e.element - Specify the element
     * @param {MenuItemModel[]} e.items - Specify the items
     * @param {MenuItemModel} e.parentItem - Specify the parentItem
     * @param {string} e.target - Specify the target
     * @returns {void} - Triggers before context menu created to enable or disable items.
     */
    Filter.prototype.cMenuBeforeOpenHandler = function (e) {
        var id = this.parent.element.id + '_cmenu';
        if (e.parentItem && e.parentItem.id === id + '_filter' && e.target === '') {
            var args = { isFiltered: false };
            this.getFilteredColumnHandler(args);
            this.parent.enableContextMenuItems([id + '_clearfilter', id + '_reapplyfilter'], !!args.isFiltered, true);
        }
    };
    /**
     * Closes the filter popup.
     *
     * @returns {void} - Closes the filter popup.
     */
    Filter.prototype.closeDialog = function () {
        var filterPopup = document.querySelector('.e-filter-popup');
        if (filterPopup && filterPopup.id.includes(this.parent.element.id)) {
            var excelFilter = getComponent(filterPopup, 'dialog');
            EventHandler.remove(filterPopup, getStartEvent(), this.filterMouseDownHandler);
            if (excelFilter) {
                excelFilter.hide();
            }
            this.parent.notify(filterDialogClose, null);
        }
    };
    Filter.prototype.removeFilterClass = function () {
        if (this.parent.element.style.position === 'relative') {
            this.parent.element.style.position = '';
        }
        if (this.parent.element.classList.contains('e-filter-open')) {
            this.parent.element.classList.remove('e-filter-open');
        }
    };
    /**
     * Returns true if the filter popup is opened.
     *
     * @returns {boolean} - Returns true if the filter popup is opened.
     */
    Filter.prototype.isPopupOpened = function () {
        var filterPopup = document.getElementsByClassName('e-filter-popup')[0];
        return filterPopup && filterPopup.id.includes(this.parent.element.id) && filterPopup.style.display !== 'none';
    };
    Filter.prototype.filterCellKeyDownHandler = function (args) {
        var sheet = this.parent.getActiveSheet();
        var indexes = getCellIndexes(sheet.activeCell);
        if (this.isFilterCell(this.parent.activeSheetIndex, indexes[0], indexes[1])) {
            if (args.closePopup) {
                this.closeDialog();
            }
            else {
                args.isFilterCell = true;
                if (!this.isPopupOpened()) {
                    var target = this.parent.getCell(indexes[0], indexes[1]);
                    if (target) {
                        this.openDialog(target);
                    }
                }
            }
        }
    };
    Filter.prototype.filterMouseDownHandler = function (e) {
        if ((Browser.isDevice && e.type === 'mousedown') || this.parent.getActiveSheet().isProtected) {
            return;
        }
        var target = e.target;
        if (target.classList.contains('e-filter-icon') || target.classList.contains('e-filter-btn')) {
            if (this.isPopupOpened()) {
                this.closeDialog();
            }
            this.openDialog((parentsUntil(target, 'e-cell') || parentsUntil(target, 'e-header-cell')));
        }
        else if (this.isPopupOpened()) {
            var offsetEle = target.offsetParent;
            if (!target.classList.contains('e-searchinput') && !target.classList.contains('e-searchclear') && (offsetEle &&
                !offsetEle.classList.contains('e-filter-popup') && !offsetEle.classList.contains('e-text-content') &&
                !offsetEle.classList.contains('e-checkboxtree') && !offsetEle.classList.contains('e-checkbox-wrapper'))) {
                this.closeDialog();
            }
            else {
                this.selectSortItemHandler(target);
            }
        }
    };
    Filter.prototype.cboxListSelected = function (args, selectedList, listCount, e, searched) {
        var wrapper = parentsUntil(e.target, 'e-ftrchk');
        if (wrapper) {
            var addCurCbox = searched && wrapper.querySelector('.e-add-current');
            if (addCurCbox) {
                if (addCurCbox.classList.contains('e-check')) {
                    classList(addCurCbox, ['e-uncheck'], ['e-check']);
                    if (!selectedList.length) {
                        args.btnObj.element.disabled = true;
                    }
                    return false;
                }
                else {
                    classList(addCurCbox, ['e-check'], ['e-uncheck']);
                    args.btnObj.element.disabled = false;
                    return true;
                }
            }
            var selectAll = wrapper.querySelector('.e-selectall');
            if (selectAll) {
                wrapper.querySelector('.e-chk-hidden').indeterminate = false;
                var uncheck = wrapper.querySelector('.e-frame').classList.contains('e-check');
                var checkBoxFrame = void 0;
                var text = void 0;
                for (var idx = searched ? 2 : 1, len = args.element.childElementCount; idx < len; idx++) {
                    checkBoxFrame = args.element.children[idx].querySelector('.e-frame');
                    removeClass([checkBoxFrame], ['e-check', 'e-stop', 'e-uncheck']);
                    if (uncheck) {
                        args.element.children[idx].querySelector('.e-chk-hidden').checked = false;
                        checkBoxFrame.classList.add('e-uncheck');
                        selectedList.splice(0, 1);
                    }
                    else {
                        args.element.children[idx].querySelector('.e-chk-hidden').checked = true;
                        checkBoxFrame.classList.add('e-check');
                        text = args.element.children[idx].querySelector('.e-checkboxfiltertext').textContent;
                        if (selectedList.indexOf(text) === -1) {
                            selectedList.push(text);
                        }
                    }
                }
            }
            else {
                var text = wrapper.querySelector('.e-checkboxfiltertext').textContent;
                if (wrapper.querySelector('.e-frame').classList.contains('e-check')) {
                    selectedList.splice(selectedList.indexOf(text), 1);
                }
                else {
                    selectedList.push(text);
                }
                toogleCheckbox(wrapper);
                selectAll = args.element.querySelector('.e-selectall');
            }
            this.updateState(args, selectAll, selectAll.parentElement.querySelector('.e-chk-hidden'), selectedList.length !== listCount, selectedList.length);
        }
        return null;
    };
    Filter.prototype.initCboxList = function (args, excelFilter, filterData) {
        var _this = this;
        var field = args.column.field;
        var sortedData = new DataManager(args.dataSource).executeLocal(new Query().sortBy(field + '_value', 'ascending'));
        var listData = [];
        var sheet = this.parent.getActiveSheet();
        var l10n = this.parent.serviceLocator.getService(locale);
        var cBoxFrag = document.createDocumentFragment();
        var selectAll = this.createSelectAll(args, excelFilter);
        cBoxFrag.appendChild(selectAll);
        var idCol = {};
        var hidden;
        var initSelectedList = [];
        var selectedList = [];
        var dataVal;
        sortedData.forEach(function (data) {
            if (data[field] === '') {
                if (!idCol['isBlank']) {
                    idCol['isBlank'] = true;
                    var blankObj = {};
                    blankObj[field] = l10n.getConstant('Blanks');
                    hidden = isFilterHidden(sheet, Number(data['__rowIndex']) - 1);
                    var blankCbox = createCboxWithWrap(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    getUid('cbox'), excelFilter.createCheckbox(blankObj[field], !hidden, blankObj), 'e-ftrchk');
                    if (cBoxFrag.childElementCount === 1) {
                        cBoxFrag.appendChild(blankCbox);
                    }
                    else {
                        cBoxFrag.insertBefore(blankCbox, cBoxFrag.children[1]);
                    }
                    listData.splice(0, 0, blankObj[field]);
                    if (!hidden) {
                        initSelectedList.push(blankObj[field]);
                        selectedList.push(blankObj[field]);
                    }
                }
            }
            else if (!idCol[data[field]]) {
                idCol[data[field]] = true;
                hidden = isFilterHidden(sheet, Number(data['__rowIndex']) - 1);
                dataVal = data[field];
                cBoxFrag.appendChild(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                createCboxWithWrap(getUid('cbox'), excelFilter.createCheckbox(dataVal, !hidden, data), 'e-ftrchk'));
                listData.push(dataVal);
                if (!hidden) {
                    initSelectedList.push(dataVal);
                    selectedList.push(dataVal);
                }
            }
        });
        args.element.appendChild(cBoxFrag);
        var cBoxFrame = selectAll.querySelector('.e-frame');
        cBoxFrame.classList.add('e-selectall');
        var cBox = selectAll.querySelector('.e-chk-hidden');
        this.updateState(args, cBoxFrame, cBox, selectedList.length !== listData.length, selectedList.length);
        var mainCboxList = [].slice.call(args.element.childNodes);
        var searchedSelectedList;
        var searchedList;
        var addCurCboxSelected;
        args.element.addEventListener('click', function (e) {
            if (searchedSelectedList) {
                var isCurSelect = _this.cboxListSelected(args, searchedSelectedList, args.element.childElementCount - 2, e, true);
                if (isCurSelect !== null) {
                    addCurCboxSelected = isCurSelect;
                }
            }
            else {
                _this.cboxListSelected(args, selectedList, listData.length, e);
            }
        });
        var sortedFullData;
        var searchValue;
        var updateSearchedList = function (val) {
            if (val.toLowerCase().includes(searchValue)) {
                var obj = {};
                obj[args.column.field] = val;
                cBoxFrag.appendChild(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                createCboxWithWrap(getUid('cbox'), excelFilter.createCheckbox(val, true, obj), 'e-ftrchk'));
                searchedList.push(val);
                searchedSelectedList.push(val);
            }
        };
        var performSearchOnData;
        var filterDataCount = args.dataSource.length > 1000 ? args.dataSource.length : 1000;
        var fullListData = listData;
        if (filterData.length <= filterDataCount) {
            performSearchOnData = function () {
                listData.forEach(function (val) {
                    updateSearchedList(val);
                });
            };
        }
        else {
            performSearchOnData = function () {
                if (!sortedFullData) {
                    fullListData = [];
                    initSelectedList = [];
                    selectedList = [];
                    sortedFullData = new DataManager(filterData).executeLocal(new Query().sortBy(field + '_value', 'ascending'));
                    idCol = {};
                    sortedFullData.forEach(function (data) {
                        if (data[field] === '') {
                            if (!idCol['isBlank']) {
                                idCol['isBlank'] = true;
                                dataVal = l10n.getConstant('Blanks');
                                fullListData.splice(0, 0, dataVal);
                                if (!isFilterHidden(sheet, Number(data['__rowIndex']) - 1)) {
                                    initSelectedList.push(dataVal);
                                    selectedList.push(dataVal);
                                }
                            }
                        }
                        else if (!idCol[data[field]]) {
                            dataVal = data[field];
                            idCol[dataVal] = true;
                            fullListData.push(data[field]);
                            if (!isFilterHidden(sheet, Number(data['__rowIndex']) - 1)) {
                                selectedList.push(dataVal);
                                initSelectedList.push(dataVal);
                            }
                        }
                    });
                }
                for (var filterIdx = 0, len = fullListData.length; filterIdx < len; filterIdx++) {
                    if (searchedList.length < filterDataCount) {
                        updateSearchedList(fullListData[filterIdx]);
                    }
                    else {
                        break;
                    }
                }
            };
        }
        var refreshCheckbox = function (e) {
            if (e.event.type === 'keyup') {
                searchValue = e.event.target.value.toLowerCase();
            }
            else if (e.event.target.classList.contains('e-search-icon')) {
                return;
            }
            cBoxFrag = document.createDocumentFragment();
            cBoxFrag.appendChild(selectAll);
            if (searchValue) {
                searchedList = [];
                searchedSelectedList = [];
                performSearchOnData();
                if (searchedSelectedList.length) {
                    _this.updateState(args, cBoxFrame, cBox, false, 0);
                    selectAll.classList.remove('e-hide');
                    var obj = {};
                    obj[field] = l10n.getConstant('AddCurrentSelection');
                    var addCurrentCbox = createCboxWithWrap(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    getUid('cbox'), excelFilter.createCheckbox(obj[field], false, obj), 'e-ftrchk');
                    cBoxFrag.insertBefore(addCurrentCbox, cBoxFrag.children[1]);
                    addCurrentCbox.querySelector('.e-frame').classList.add('e-add-current');
                }
                else {
                    selectAll.classList.add('e-hide');
                    var noRecordEle = _this.parent.createElement('div', { className: 'e-checkfltrnmdiv' });
                    var noRecordText = _this.parent.createElement('span');
                    noRecordText.innerText = l10n.getConstant('NoResult');
                    noRecordEle.appendChild(noRecordText);
                    cBoxFrag.appendChild(noRecordEle);
                    args.btnObj.element.disabled = true;
                }
            }
            else if (mainCboxList) {
                searchedSelectedList = null;
                searchedList = null;
                _this.updateState(args, cBoxFrame, cBox, selectedList.length !== listData.length, selectedList.length);
                selectAll.classList.remove('e-hide');
                mainCboxList.forEach(function (element) {
                    cBoxFrag.appendChild(element);
                });
            }
            args.element.innerHTML = '';
            args.element.appendChild(cBoxFrag);
        };
        var applyBtnClickHandler = function () {
            if (searchedList) {
                if (addCurCboxSelected) {
                    var text = void 0;
                    var index = void 0;
                    selectedList = initSelectedList;
                    for (var idx = 0, len = searchedList.length; idx < len; idx++) {
                        text = searchedList[idx];
                        if (searchedList.length === searchedSelectedList.length || searchedSelectedList.indexOf(text) > -1) {
                            if (selectedList.indexOf(text) === -1) {
                                selectedList.push(text);
                            }
                        }
                        else {
                            index = selectedList.indexOf(text);
                            if (index > -1) {
                                selectedList.splice(index, 1);
                            }
                        }
                    }
                }
                else {
                    selectedList = searchedSelectedList;
                }
            }
            var checkedLength = selectedList.length;
            if (checkedLength === listData.length && (!searchedSelectedList || filterData.length <= filterDataCount)) {
                _this.filterSuccessHandler(new DataManager(args.dataSource), { action: 'clear-filter', field: args.column.field });
            }
            else {
                var predicates_1 = [];
                var model_1 = { field: field, ignoreAccent: false, matchCase: false, isFilterByMenu: true };
                var localeObj_1 = getNumericObject(_this.parent.locale);
                var updatePredicate = function (val) {
                    var type = args.type;
                    if (type === 'number') {
                        if (val === l10n.getConstant('Blanks')) {
                            val = '';
                            type = 'string';
                        }
                        else if (!isNumber(parseLocaleNumber([val], _this.parent, localeObj_1)[0])) {
                            type = 'string';
                        }
                    }
                    predicates_1.push(Object.assign({ value: val, type: type }, model_1));
                };
                if (checkedLength > fullListData.length / 2) {
                    model_1.operator = 'notequal';
                    model_1.predicate = 'and';
                    for (var idx = 0, len = fullListData.length; idx < len; idx++) {
                        if (selectedList.indexOf(fullListData[idx]) === -1) {
                            updatePredicate(fullListData[idx]);
                        }
                    }
                }
                else {
                    model_1.operator = 'equal';
                    model_1.predicate = 'or';
                    for (var idx = 0, len = checkedLength; idx < len; idx++) {
                        updatePredicate(selectedList[idx]);
                    }
                }
                excelFilter.initiateFilter(predicates_1);
            }
        };
        this.wireFilterEvents(args, applyBtnClickHandler, refreshCheckbox.bind(this));
    };
    Filter.prototype.createSelectAll = function (args, excelFilter) {
        var selectAllObj = {};
        selectAllObj[args.column.field] = this.parent.serviceLocator.getService(locale).getConstant('SelectAll');
        var selectAll = createCboxWithWrap(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        getUid('cbox'), excelFilter.createCheckbox(selectAllObj[args.column.field], false, selectAllObj), 'e-ftrchk');
        return selectAll;
    };
    Filter.prototype.updateState = function (args, cBoxFrame, cBox, indeterminate, checkedCount) {
        removeClass([cBoxFrame], ['e-check', 'e-stop', 'e-uncheck']);
        if (args.btnObj.element.disabled) {
            args.btnObj.element.disabled = false;
        }
        if (indeterminate) {
            if (checkedCount) {
                cBoxFrame.classList.add('e-stop');
            }
            else {
                cBoxFrame.classList.add('e-uncheck');
                var addCurCbox = args.element.querySelector('.e-add-current');
                args.btnObj.element.disabled = !addCurCbox || !addCurCbox.classList.contains('e-check');
            }
        }
        else {
            cBoxFrame.classList.add('e-check');
        }
        cBox.indeterminate = indeterminate;
        cBox.checked = !indeterminate;
    };
    Filter.prototype.beforeFilteringHandler = function (evt) {
        var _this = this;
        if (evt.instance && evt.instance.options) {
            if (evt.isOpen && evt.instance.options.type === 'string') {
                var localeObj = getNumericObject(this.parent.locale);
                if (localeObj.decimal !== '.') {
                    var valArr = evt.arg3.toString().split('.');
                    if (valArr.length === 2) {
                        var parsedNumVal = valArr.join(localeObj.decimal);
                        if (isNumber(new Internationalization(this.parent.locale).parseNumber(parsedNumVal, { format: 'n' }))) {
                            evt.arg3 = parsedNumVal;
                        }
                    }
                }
            }
            var parseValue_1 = function (val, operator) {
                if (operator && (operator === 'notequal' || _this.isCustomNumFilter(operator))) {
                    if (val) {
                        if (isNumber(val)) {
                            val = parseFloat(val.toString());
                        }
                        else if (typeof val === 'string') {
                            var localeObj = getNumericObject(_this.parent.locale);
                            var intl = new Internationalization(_this.parent.locale);
                            var numArgs = {};
                            if (val.includes(localeObj.percentSign)) {
                                var valArr = val.trim().split('%');
                                if (valArr[0] !== '' && !valArr[1]) {
                                    numArgs = checkIsNumberAndGetNumber({ value: valArr[0] }, _this.parent.locale, localeObj.group, localeObj.decimal);
                                }
                            }
                            if (numArgs.isNumber) {
                                val = Number(numArgs.value) / 100;
                            }
                            else {
                                var parsedNumVal = intl.parseNumber(val.trim(), { format: 'n' });
                                if (isNumber(parsedNumVal)) {
                                    if (/^(\(\d+\)|\d+)$/.test(val.trim())) {
                                        val = -parsedNumVal;
                                    }
                                    else {
                                        val = parsedNumVal;
                                    }
                                }
                                else {
                                    var checkVal = val.trim();
                                    var dateEventArgs = { value: checkVal, cell: { value: checkVal } };
                                    _this.parent.notify(checkDateFormat, dateEventArgs);
                                    if (dateEventArgs.isTime || dateEventArgs.isDate) {
                                        val = parseFloat(dateEventArgs.updatedVal);
                                    }
                                }
                            }
                        }
                    }
                    else if (operator === 'notequal' && val === null) {
                        val = '';
                    }
                }
                else if (operator === 'equal') {
                    if (isNumber(val)) {
                        val = val.toString();
                    }
                    else if (typeof val === 'string' && isNumber(parseValue_1(val, 'notequal'))) {
                        val = val.trim();
                    }
                    else if (val === null) {
                        val = '';
                    }
                }
                return val;
            };
            if (evt.instance.options.type !== 'date') {
                evt.arg3 = parseValue_1(evt.arg3, evt.arg2);
                evt.arg8 = parseValue_1(evt.arg8, evt.arg7);
            }
            else if (evt.instance.options.format === 'yMd') {
                var parseDateTime = function (val, operator) {
                    if (val) {
                        if (typeof val === 'string') {
                            var checkVal = val.trim();
                            var dateEventArgs = { value: checkVal, cell: { value: checkVal } };
                            _this.parent.notify(checkDateFormat, dateEventArgs);
                            if (dateEventArgs.isDate) {
                                val = operator === 'equal' ? dateEventArgs.dateObj : parseFloat(dateEventArgs.updatedVal);
                            }
                            else {
                                if (operator === 'equal' || operator === 'notequal') {
                                    var parsedNumVal = parseValue_1(val, 'notequal');
                                    if (isNumber(parsedNumVal)) {
                                        evt.instance.options.type = 'number';
                                        if (operator === 'notequal') {
                                            val = parsedNumVal;
                                        }
                                    }
                                    else {
                                        evt.instance.options.type = 'string';
                                    }
                                }
                            }
                        }
                        else if (isDateTime(val) && operator !== 'equal') {
                            val = dateToInt(val, true);
                        }
                    }
                    return val;
                };
                var filterDateInputs = document.querySelectorAll('.e-xlfl-valuediv input.e-datepicker');
                if (filterDateInputs.length === 2) {
                    evt.arg3 = parseDateTime(evt.arg3 || filterDateInputs[0].value, evt.arg2);
                    evt.arg8 = parseDateTime(evt.arg8 || filterDateInputs[1].value, evt.arg7);
                }
                else if (evt.arg3) {
                    evt.arg3 = parseDateTime(evt.arg3, evt.arg2);
                }
            }
        }
    };
    Filter.prototype.customFilterOpen = function (args) {
        var filterOptDiv = document.querySelectorAll('.e-xlfl-optrdiv input.e-dropdownlist');
        var criterias = [];
        for (var idx = 0; idx < filterOptDiv.length; idx++) {
            var dropDownList = getComponent(filterOptDiv[idx], 'dropdownlist');
            if (dropDownList) {
                criterias.push(dropDownList.value);
            }
        }
        var customFilterValues = [];
        if (criterias.length === 2) {
            var predicates = this.filterCollection.get(this.parent.activeSheetIndex);
            var criteriaIdx = void 0;
            for (var idx = 0; idx < predicates.length; idx++) {
                if (predicates[idx].field === args.column && predicates[idx].value !== null) {
                    criteriaIdx = criterias.indexOf(predicates[idx].operator);
                    if (criteriaIdx > -1) {
                        if (predicates[idx].operator === 'equal' && isDateTime(predicates[idx].value)) {
                            customFilterValues[criteriaIdx] = dateToInt(predicates[idx].value, true).toString();
                        }
                        else {
                            customFilterValues[criteriaIdx] = predicates[idx].value.toString();
                        }
                        criterias[criteriaIdx] = '';
                    }
                }
            }
        }
        var localeNumObj = getNumericObject(this.parent.locale);
        var getParsedVal = function (val) {
            if (localeNumObj.decimal !== '.' && isNumber(val)) {
                var parsedVal = val.toString();
                if (parsedVal.includes('.')) {
                    return parsedVal.replace('.', localeNumObj.decimal);
                }
            }
            return val;
        };
        var filterValInputs = document.querySelectorAll('.e-xlfl-valuediv input.e-ss-filter-input');
        if (filterValInputs.length) {
            for (var idx = 0; idx < filterValInputs.length; idx++) {
                var textObj = new TextBox({ placeholder: this.parent.serviceLocator.getService(locale).getConstant('CustomFilterPlaceHolder') });
                if (customFilterValues[idx]) {
                    textObj.value = getParsedVal(customFilterValues[idx]);
                }
                textObj.appendTo(filterValInputs[idx]);
            }
        }
        else {
            var filterValInputs_1 = document.querySelectorAll('.e-xlfl-valuediv input.e-datepicker');
            var datePickerObj = void 0;
            var val = void 0;
            for (var idx = 0; idx < filterValInputs_1.length; idx++) {
                if (isNumber(customFilterValues[idx])) {
                    val = this.parent.getDisplayText({ value: customFilterValues[idx], format: getFormatFromType('ShortDate') +
                            (customFilterValues[idx].includes('.') ? " " + getFormatFromType('Time') : '') });
                }
                else {
                    val = getParsedVal(customFilterValues[idx]);
                }
                datePickerObj = getComponent(filterValInputs_1[idx], 'datepicker');
                if (datePickerObj) {
                    datePickerObj.value = val;
                    filterValInputs_1[idx].value = val;
                }
            }
        }
    };
    Filter.prototype.wireFilterEvents = function (args, applyBtnClickHandler, refreshCheckboxes) {
        var _this = this;
        args.btnObj.element.addEventListener('click', applyBtnClickHandler.bind(this));
        args.searchBox.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                applyBtnClickHandler();
            }
        });
        var filterDlgCloseHandler = function () {
            _this.parent.off(refreshCheckbox, refreshCheckboxes);
            _this.parent.off(filterDialogClose, filterDlgCloseHandler);
            focus(_this.parent.element);
        };
        this.parent.on(filterDialogClose, filterDlgCloseHandler, this);
        this.parent.on(refreshCheckbox, refreshCheckboxes, this);
    };
    Filter.prototype.initTreeView = function (args, excelFilter) {
        var _this = this;
        var checkedNodes = [];
        var allNodes = [];
        var idColl = {};
        var groupedYears = [];
        var groupedMonths = [];
        var groupedData = [];
        var otherData = [];
        var value;
        var month;
        var day;
        var date;
        var mId;
        var dId;
        var monthNum;
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
            'November', 'December'];
        if (this.parent.locale !== 'en-US') {
            var formats = IntlBase.getDependables(cldrData, this.parent.locale, null).dateObject;
            var monthObj_1 = formats.months['stand-alone'] ? formats.months['stand-alone'].wide : {};
            if (Object.keys(monthObj_1).length === 12) {
                months = Object.keys(monthObj_1).map(Number).map(function (key) { return monthObj_1[key]; });
            }
        }
        var grpObj;
        var indeterminate = false;
        var sheet = this.parent.getActiveSheet();
        var addNodes = function (data) {
            idColl["" + dId] = true;
            if (isFilterHidden(sheet, Number(data['__rowIndex']) - 1)) {
                indeterminate = true;
            }
            else {
                checkedNodes.push(dId);
            }
            allNodes.push(dId);
        };
        args.dataSource.forEach(function (data) {
            date = data[args.column.field];
            if (typeof date === 'object' && !!Date.parse(date.toString())) {
                value = date.getFullYear().toString();
                if (!idColl["" + value]) {
                    grpObj = { __rowIndex: value, hasChild: true };
                    grpObj[args.column.field] = value;
                    groupedYears.push(grpObj);
                    idColl["" + value] = true;
                }
                monthNum = date.getMonth();
                month = months[monthNum];
                mId = value + ' ' + month;
                if (!idColl["" + mId]) {
                    grpObj = { __rowIndex: mId, pId: value, hasChild: true, month: monthNum };
                    grpObj[args.column.field] = month;
                    groupedMonths.push(grpObj);
                    idColl["" + mId] = true;
                }
                day = date.getDate();
                dId = mId + ' ' + day.toString();
                if (!idColl["" + dId]) {
                    grpObj = { __rowIndex: dId, pId: mId };
                    grpObj[args.column.field] = day;
                    groupedData.push(grpObj);
                    addNodes(data);
                }
            }
            else {
                if (!data[args.column.field] && data[args.column.field] !== 0) {
                    dId = 'blanks';
                    value = _this.parent.serviceLocator.getService(locale).getConstant('Blanks');
                }
                else {
                    dId = 'text ' + data[args.column.field].toString().toLowerCase();
                    value = data[args.column.field];
                }
                if (!idColl["" + dId]) {
                    grpObj = { __rowIndex: dId };
                    grpObj[args.column.field] = value;
                    otherData.push(grpObj);
                    addNodes(data);
                }
            }
        });
        groupedYears = new DataManager(groupedYears).executeLocal(new Query().sortBy(args.column.field, 'decending'));
        groupedMonths = new DataManager(groupedMonths).executeLocal(new Query().sortBy('month', 'ascending'));
        groupedData = new DataManager(groupedData).executeLocal(new Query().sortBy(args.column.field, 'ascending'));
        groupedData = groupedYears.concat(groupedMonths.concat(groupedData));
        if (otherData.length) {
            otherData = new DataManager(otherData).executeLocal(new Query().sortBy(args.column.field, 'ascending'));
            groupedData = groupedData.concat(otherData);
        }
        var nodeClick = function (args) {
            var checkedNode = [args.node];
            if (args.event.target.classList.contains('e-fullrow') || args.event.key === 'Enter') {
                var getNodeDetails = treeViewObj.getNode(args.node);
                if (getNodeDetails.isChecked === 'true') {
                    treeViewObj.uncheckAll(checkedNode);
                }
                else {
                    treeViewObj.checkAll(checkedNode);
                }
            }
        };
        var selectAllClick = function () {
            cBox.indeterminate = false;
            if (cBoxFrame.classList.contains('e-check')) {
                treeViewObj.uncheckAll();
                cBoxFrame.classList.add('e-uncheck');
                cBox.checked = false;
            }
            else {
                treeViewObj.checkAll();
                cBoxFrame.classList.add('e-check');
                cBox.checked = true;
            }
        };
        var selectAll = this.createSelectAll(args, excelFilter);
        selectAll.addEventListener('click', selectAllClick.bind(this));
        selectAll.classList.add('e-spreadsheet-ftrchk');
        var cBoxFrame = selectAll.querySelector('.e-frame');
        cBoxFrame.classList.add('e-selectall');
        args.element.appendChild(selectAll);
        var cBox = selectAll.querySelector('.e-chk-hidden');
        var treeViewEle = this.parent.createElement('div');
        var treeViewObj = new TreeView({
            fields: { dataSource: groupedData, id: '__rowIndex', parentID: 'pId', text: args.column.field, hasChildren: 'hasChild' },
            enableRtl: this.parent.enableRtl, showCheckBox: true, cssClass: 'e-checkboxtree', checkedNodes: checkedNodes,
            nodeClicked: nodeClick.bind(this),
            keyPress: nodeClick.bind(this),
            nodeChecked: function (e) {
                if (e.action !== 'indeterminate') {
                    indeterminate = treeViewObj.checkedNodes.length !== treeViewObj.fields.dataSource.length;
                    _this.updateState(args, cBoxFrame, cBox, indeterminate, treeViewObj.checkedNodes.length);
                }
            }
        });
        treeViewObj.createElement = this.parent.createElement;
        treeViewObj.appendTo(treeViewEle);
        args.element.appendChild(treeViewEle);
        checkedNodes = treeViewObj.checkedNodes;
        this.updateState(args, cBoxFrame, cBox, indeterminate, treeViewObj.checkedNodes.length);
        var applyBtnClickHandler = function () {
            if (treeViewObj.checkedNodes.length === groupedData.length) {
                _this.filterSuccessHandler(new DataManager(args.dataSource), { action: 'clear-filter', field: args.column.field });
            }
            else {
                _this.generatePredicate(treeViewObj.checkedNodes, otherData.length ? 'string' : args.type, args.column.field, excelFilter, allNodes, treeViewObj.checkedNodes.length > groupedData.length / 2);
            }
        };
        this.treeViewObj = treeViewObj;
        this.treeViewEle = treeViewEle;
        this.cBox = cBox;
        this.wireFilterEvents(args, applyBtnClickHandler, this.refreshCheckbox.bind(this, groupedData, treeViewObj, checkedNodes));
    };
    Filter.prototype.generatePredicate = function (checkedNodes, type, field, excelFilter, allNodes, isNotEqual) {
        var predicates = [];
        var predicate;
        var months = { 'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5, 'July': 6,
            'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11 };
        var valArr;
        var date;
        var val;
        var otherType;
        var updateOtherPredicate = function () {
            if (valArr[0] === 'blanks') {
                predicates.push(Object.assign({ value: '', type: type }, predicate));
            }
            else if (valArr[0] === 'text') {
                valArr.splice(0, 1);
                val = valArr.join(' ');
                if (isNaN(Number(val))) {
                    otherType = 'string';
                }
                else {
                    val = Number(val);
                    otherType = 'number';
                }
                predicates.push(Object.assign({ value: val, type: otherType }, predicate));
            }
        };
        var setDate = function () {
            date = new Date(Number(valArr[0]), months[valArr[1]], Number(valArr[2]));
            if (date.getDate()) {
                predicates.push(Object.assign({ value: date, type: type }, predicate));
            }
            else {
                updateOtherPredicate();
            }
        };
        if (isNotEqual) {
            predicate = { field: field, ignoreAccent: false, matchCase: false, predicate: 'and', operator: 'notequal',
                isFilterByMenu: true };
            for (var i = 0, len = allNodes.length; i < len; i++) {
                if (checkedNodes.indexOf(allNodes[i]) === -1) {
                    valArr = allNodes[i].split(' ');
                    setDate();
                }
            }
        }
        else {
            predicate = { field: field, ignoreAccent: false, matchCase: false, predicate: 'or', operator: 'equal', isFilterByMenu: true };
            for (var i = 0, len = checkedNodes.length; i < len; i++) {
                valArr = checkedNodes[i].split(' ');
                if (valArr.length === 3) {
                    setDate();
                }
                else {
                    updateOtherPredicate();
                }
            }
        }
        excelFilter.initiateFilter(predicates);
    };
    Filter.prototype.refreshCheckbox = function (groupedData, treeViewObj, checkedNodes, args) {
        var searchValue;
        if (args.event.type === 'keyup') {
            searchValue = args.event.target.value;
        }
        else if (args.event.target.classList.contains('e-search-icon')) {
            return;
        }
        var filteredList;
        var changeData = function () {
            if (filteredList.length && !treeViewObj.fields.dataSource.length) {
                var wrapper = treeViewObj.element.parentElement;
                wrapper.getElementsByClassName('e-spreadsheet-ftrchk')[0].classList.remove('e-hide');
                detach(wrapper.getElementsByClassName('e-checkfltrnmdiv')[0]);
            }
            treeViewObj.fields.dataSource = filteredList;
            treeViewObj.dataBind();
        };
        if (searchValue) {
            filteredList = new DataManager(groupedData).executeLocal(new Query().where(new Predicate(treeViewObj.fields.text, 'contains', searchValue, true)));
            var filterId = {};
            var predicates = [];
            var key = void 0;
            var initList = void 0;
            var strFilter = isNaN(Number(searchValue));
            var expandId = void 0;
            var level = void 0;
            if (strFilter) {
                for (var i = 0; i < filteredList.length; i++) {
                    if (!filteredList[i]['hasChild']) {
                        continue;
                    }
                    predicates.push(new Predicate('pId', 'equal', filteredList[i]['__rowIndex'], false));
                    key = filteredList[i]['pId'];
                    if (!filterId["" + key]) {
                        predicates.push(new Predicate('__rowIndex', 'equal', key, false));
                        filterId["" + key] = true;
                    }
                }
                initList = filteredList;
                level = 1;
            }
            else {
                var year = void 0;
                var filterParentId = {};
                expandId = [];
                for (var i = 0; i < filteredList.length; i++) {
                    key = filteredList[i]['pId'];
                    if (key) {
                        year = key.split(' ')[0];
                        if (!filterId["" + key]) {
                            predicates.push(new Predicate('__rowIndex', 'equal', key, false));
                            filterId["" + key] = true;
                            expandId.push(year);
                            expandId.push(key);
                        }
                        if (!filterParentId["" + year]) {
                            if (!filterId["" + year]) {
                                predicates.push(new Predicate('__rowIndex', 'equal', year, false));
                                filterId["" + year] = true;
                            }
                            predicates.push(new Predicate('__rowIndex', 'equal', filteredList[i]['__rowIndex'], false));
                        }
                    }
                    else {
                        key = filteredList[i]['__rowIndex'];
                        if (!filterParentId["" + key]) {
                            predicates.push(new Predicate('__rowIndex', 'contains', key, false));
                            filterParentId["" + key] = true;
                        }
                    }
                }
                initList = [];
            }
            if (filteredList.length) {
                if (predicates.length) {
                    filteredList = initList.concat(new DataManager(groupedData).executeLocal(new Query().where(Predicate.or(predicates))));
                }
                changeData();
                treeViewObj.checkAll();
                var duration = treeViewObj.animation.expand.duration;
                treeViewObj.animation.expand.duration = 0;
                treeViewObj.expandAll(expandId, level);
                treeViewObj.animation.expand.duration = duration;
            }
            else if (treeViewObj.fields.dataSource.length) {
                changeData();
                var wrapper = treeViewObj.element.parentElement;
                wrapper.getElementsByClassName('e-spreadsheet-ftrchk')[0].classList.add('e-hide');
                var noRecordEle = this.parent.createElement('div', { className: 'e-checkfltrnmdiv' });
                var noRecordText = this.parent.createElement('span');
                noRecordText.innerText = this.parent.serviceLocator.getService(locale).getConstant('NoResult');
                noRecordEle.appendChild(noRecordText);
                wrapper.appendChild(noRecordEle);
            }
        }
        else {
            filteredList = groupedData;
            changeData();
            treeViewObj.checkedNodes = checkedNodes;
            treeViewObj.refresh();
        }
    };
    Filter.prototype.openDialog = function (cell) {
        var _this = this;
        var colIndex = parseInt(cell.getAttribute('aria-colindex'), 10);
        var field = getColumnHeaderText(colIndex);
        this.parent.showSpinner();
        var sheetIdx = this.parent.activeSheetIndex;
        var filterRange = this.filterRange.get(sheetIdx);
        var range = filterRange.range.slice();
        var sheet = this.parent.getActiveSheet();
        var filterCell = getCell(range[0], colIndex - 1, sheet);
        var displayName = this.parent.getDisplayText(filterCell);
        if (!filterRange.allowHeaderFilter) {
            range[0] = range[0] + 1; // to skip first row.
        }
        if (!filterRange.useFilterRange) {
            range[2] = sheet.usedRange.rowIndex; //filter range should be till used range.
        }
        var fullRange = [range[0], colIndex - 1, range[2], colIndex - 1];
        var totalRange = this.getPredicateRange(fullRange, this.filterCollection.get(sheetIdx), colIndex - 1);
        var otherColPredicate = totalRange.otherColPredicate;
        var curColPredicates;
        var curPredicate = totalRange.curPredicate;
        if (curPredicate.length) {
            curColPredicates = {};
            curColPredicates[field] = curPredicate;
        }
        var addr = sheet.name + "!" + totalRange.address;
        var fullAddr = getRangeAddress(fullRange);
        var col = this.getColumnType(sheet, colIndex - 1, range, true);
        var type = col.type;
        var templateColData;
        var isDateCol = type === 'date' || col.isDateAvail;
        var isNumCol = type === 'number';
        var templateFilter = isDateCol || isNumCol;
        var isMultiFormattedCol = col.isMultiFormattedCol;
        if (templateFilter && !totalRange.filteredCol) {
            templateColData = [];
        }
        getData(this.parent, addr, true, true, null, true, null, null, true, fullAddr, null, templateColData).then(function (jsonData) {
            var checkBoxData;
            _this.parent.element.style.position = 'relative';
            _this.parent.element.classList.add('e-filter-open');
            var filterCollection;
            if (templateFilter) {
                if (templateColData || !otherColPredicate.length) {
                    checkBoxData = new DataManager(templateColData || jsonData);
                }
                else {
                    var options_1 = _this.getPredicates(otherColPredicate);
                    var data = applyPredicates(new DataManager(jsonData), options_1.predicates, options_1.equalOrPredicates);
                    checkBoxData = new DataManager(data);
                }
                var beforeCboxRender_1 = function (args) {
                    _this.parent.off(beforeCheckboxRender, beforeCboxRender_1);
                    args.isCheckboxFilterTemplate = true;
                    if (isDateCol) {
                        _this.initTreeView(args, excelFilter);
                    }
                    else {
                        _this.initCboxList(args, excelFilter, jsonData);
                    }
                };
                _this.parent.on(beforeCheckboxRender, beforeCboxRender_1, _this);
                filterCollection = [];
            }
            else {
                if (otherColPredicate.length) {
                    var options_2 = _this.getPredicates(otherColPredicate);
                    var data = applyPredicates(new DataManager(jsonData), options_2.predicates, options_2.equalOrPredicates);
                    checkBoxData = new DataManager(data);
                }
                else {
                    checkBoxData = new DataManager(jsonData);
                }
                filterCollection = _this.getClonedPredicates(curPredicate);
            }
            var target = cell.querySelector('.e-filter-btn');
            var filterCol = {
                field: field, filter: {}
            };
            if (isNumCol) {
                var parent_1 = _this.parent;
                filterCol.filterTemplate = function (element) {
                    if (parent_1.isReact && element) {
                        element.appendChild(parent_1.createElement('input', { className: 'e-ss-filter-input' }));
                    }
                    else {
                        return [parent_1.createElement('input', { className: 'e-ss-filter-input' })];
                    }
                };
                var filterTemplateCallback_1 = function (template) {
                    return function (_data, _parent, _prop, _id, _isStringTemplate, _index, element) {
                        return template(element);
                    };
                };
                filterCol.getFilterTemplate = function () { return filterTemplateCallback_1(filterCol.filterTemplate); };
                if (parent_1.isReact && !parent_1.renderTemplates) {
                    parent_1.renderTemplates = function (callback) { return callback(); };
                }
            }
            var options = {
                type: type, field: field, format: (type === 'date' ? 'yMd' : null), displayName: displayName || 'Column ' + field,
                dataSource: checkBoxData || [], height: _this.parent.element.classList.contains('e-bigger') ? 800 : 500, columns: [],
                hideSearchbox: false, filteredColumns: filterCollection, column: filterCol,
                handler: _this.filterSuccessHandler.bind(_this, new DataManager(jsonData)), target: target,
                position: { X: 0, Y: 0 }, localeObj: _this.parent.serviceLocator.getService(locale), actualPredicate: curColPredicates,
                isFormatted: templateFilter && !isDateCol, isMultiFormattedCol: isMultiFormattedCol
            };
            var excelFilter = new ExcelFilterBase(_this.parent, _this.getLocalizedCustomOperators());
            excelFilter.openDialog(options);
            var filterPopup = document.querySelector('.e-filter-popup');
            if (filterPopup && filterPopup.id.includes(_this.parent.element.id)) {
                EventHandler.add(filterPopup, getStartEvent(), _this.filterMouseDownHandler, _this);
                var parentOff = _this.parent.element.getBoundingClientRect();
                var cellOff = target.getBoundingClientRect();
                var popupOff = filterPopup.getBoundingClientRect();
                var left = (cellOff.right - parentOff.left) - popupOff.width;
                if (left < 0) { // Left collision wrt spreadsheet left
                    left = cellOff.left - parentOff.left;
                }
                filterPopup.style.left = left * _this.parent.viewport.scaleX + "px";
                filterPopup.style.top = '0px';
                filterPopup.style.visibility = 'hidden';
                if (filterPopup.classList.contains('e-hide')) {
                    filterPopup.classList.remove('e-hide');
                }
                var top_1 = cellOff.bottom - parentOff.top;
                if (popupOff.height - (parentOff.bottom - cellOff.bottom) > 0) { // Bottom collision wrt spreadsheet bottom
                    top_1 -= popupOff.height - (parentOff.bottom - cellOff.bottom);
                    if (top_1 < 0) {
                        top_1 = 0;
                    }
                }
                filterPopup.style.top = top_1 * _this.parent.viewport.scaleY + "px";
                filterPopup.style.visibility = '';
            }
            _this.parent.hideSpinner();
        });
    };
    Filter.prototype.getPredicateRange = function (range, predicates, col) {
        var addr = getRangeAddress(range);
        var filteredCol;
        var otherColPredicate = [];
        var curPredicate = [];
        if (predicates && predicates.length) {
            var predicateRange_1;
            var colIdx_1;
            predicates.forEach(function (predicate) {
                if (predicate.field) {
                    predicateRange_1 = "" + predicate.field + (range[0] + 1) + ":" + predicate.field + (range[2] + 1);
                    colIdx_1 = getColIndex(predicate.field);
                    if (!addr.includes(predicateRange_1)) {
                        addr += "," + predicateRange_1;
                        if (colIdx_1 < range[1]) {
                            range[1] = colIdx_1;
                        }
                        if (colIdx_1 > range[3]) {
                            range[3] = colIdx_1;
                        }
                    }
                    if (col !== undefined) {
                        if (colIdx_1 === col) {
                            filteredCol = true;
                            curPredicate.push(predicate);
                        }
                        else {
                            otherColPredicate.push(predicate);
                        }
                    }
                }
            });
        }
        else {
            filteredCol = true;
        }
        return col === undefined ? addr :
            { address: addr, filteredCol: filteredCol, otherColPredicate: otherColPredicate, curPredicate: curPredicate };
    };
    Filter.prototype.filterDialogCreatedHandler = function () {
        var filterPopup = document.querySelector('.e-filter-popup');
        if (filterPopup && filterPopup.id.includes(this.parent.element.id) && filterPopup.classList.contains('e-popup-close')) {
            filterPopup.classList.add('e-hide');
        }
    };
    /**
     * Formats cell value for listing it in filter popup.
     *
     * @param {any} args - Specifies the args
     * @param {string | number} args.value - Specify the value
     * @param {object} args.column - Specify the column
     * @param {object} args.data - Specify the data
     * @returns {void} - Formats cell value for listing it in filter popup.
     */
    Filter.prototype.filterCboxValueHandler = function (args) {
        if (args.column && args.data) {
            var field = args.column.field;
            if (args.value) {
                var indexes = getCellIndexes(field + args.data['dataObj']['__rowIndex']);
                var cell = getCell(indexes[0], indexes[1], this.parent.getActiveSheet());
                if (cell && cell.format) {
                    args.value = this.parent.getDisplayText(cell);
                }
            }
        }
    };
    /**
     * Triggers when sorting items are chosen on context menu of filter popup.
     *
     * @param {HTMLElement} target - Specify the element.
     * @returns {void} - Triggers when sorting items are chosen on context menu of filter popup.
     */
    Filter.prototype.selectSortItemHandler = function (target) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var sortOrder = target.classList.contains('e-filter-sortasc') ? 'Ascending'
            : target.classList.contains('e-filter-sortdesc') ? 'Descending' : null;
        if (sortOrder === 'Ascending') {
            target.setAttribute('aria-label', l10n.getConstant('SortAscending'));
        }
        else {
            target.setAttribute('aria-label', l10n.getConstant('SortDescending'));
        }
        if (!sortOrder) {
            return;
        }
        var sheet = this.parent.getActiveSheet();
        var sheetIdx = this.parent.activeSheetIndex;
        var filterRange = this.filterRange.get(sheetIdx);
        var range = filterRange.range.slice();
        if (!filterRange.allowHeaderFilter) {
            range[0] = range[0] + 1; // to skip first row.
        }
        if (!filterRange.useFilterRange) {
            range[2] = sheet.usedRange.rowIndex; //filter range should be till used range.
        }
        if (isReadOnlyCells(this.parent, range)) {
            this.closeDialog();
            this.parent.notify(readonlyAlert, null);
            return;
        }
        this.parent.sortCollection = this.parent.sortCollection ? this.parent.sortCollection : [];
        var prevSort = [];
        for (var i = this.parent.sortCollection.length - 1; i >= 0; i--) {
            if (this.parent.sortCollection[i] && this.parent.sortCollection[i].sheetIndex === sheetIdx) {
                prevSort.push(this.parent.sortCollection[i]);
                this.parent.sortCollection.splice(i, 1);
            }
        }
        this.parent.sortCollection.push({ sortRange: getRangeAddress(range), columnIndex: getIndexesFromAddress(sheet.activeCell)[1], order: sortOrder,
            sheetIndex: sheetIdx });
        this.parent.notify(applySort, { sortOptions: { sortDescriptors: { order: sortOrder }, containsHeader: false }, previousSort: prevSort, range: getRangeAddress(range) });
        this.refreshFilterRange();
        this.closeDialog();
    };
    /**
     * Triggers when OK button or clear filter item is selected
     *
     * @param {DataManager} dataSource - Specify the data source
     * @param {Object} args - Specify the data source
     * @param {string} args.action - Specify the action
     * @param {PredicateModel[]} args.filterCollection - Specify the filter collection.
     * @param {string} args.field - Specify the field.
     * @param {number} args.sIdx - Specify the index.
     * @param {boolean} args.isInternal - Specify the isInternal.
     * @param {boolean} args.isFilterByValue - Specify the isFilterByValue.
     * @param {PredicateModel[]} args.prevPredicates - Specify the prevPredicates.
     * @param {boolean} args.isOpen - Specify the filtering action is after importing.
     * @returns {void} - Triggers when OK button or clear filter item is selected
     */
    Filter.prototype.filterSuccessHandler = function (dataSource, args) {
        var sheetIdx = args.sIdx;
        if (!sheetIdx && sheetIdx !== 0) {
            sheetIdx = args.isOpen ? 0 : this.parent.activeSheetIndex;
        }
        var prevPredicates = args.prevPredicates || [].slice.call(this.filterCollection.get(sheetIdx));
        if (args.isFilterByValue && !prevPredicates.length) {
            prevPredicates = undefined;
        }
        var predicates = this.filterCollection.get(sheetIdx);
        this.updatePredicate(predicates, args.field);
        if (args.action === 'clear-filter' && predicates.length === prevPredicates.length) {
            return;
        }
        if (args.action === 'filtering') {
            var processWildcards = function (filterCollection) {
                return filterCollection.map(function (predicate) {
                    if (predicate && typeof predicate.value === 'string' && predicate.value.includes('*')) {
                        if (predicate.value.startsWith('*') && predicate.value.endsWith('*')) {
                            predicate.value = predicate.value.split('*').join('');
                            predicate.operator = 'contains';
                        }
                        else if (predicate.value.endsWith('*')) {
                            predicate.value = predicate.value.split('*').join('');
                            predicate.operator = 'startswith';
                        }
                        else if (predicate.value.startsWith('*')) {
                            predicate.value = predicate.value.split('*').join('');
                            predicate.operator = 'endswith';
                        }
                    }
                    return predicate;
                });
            };
            predicates = predicates.concat(processWildcards(args.filterCollection));
        }
        this.filterCollection.set(sheetIdx, predicates);
        var options = this.getPredicates(predicates);
        var filterOptions = { datasource: dataSource, predicates: options.predicates,
            equalOrPredicates: options.equalOrPredicates };
        var filterRange = this.filterRange.get(sheetIdx);
        if (!filterRange.useFilterRange) {
            filterRange.range[2] = getSheet(this.parent, sheetIdx).usedRange.rowIndex; //extend the range if filtered
        }
        this.applyFilter(filterOptions, getRangeAddress(filterRange.range), sheetIdx, prevPredicates, false, args.isInternal, args.isFilterByValue);
    };
    Filter.prototype.isCustomNumFilter = function (operator) {
        return operator.includes('greaterthan') || operator.includes('lessthan') || operator === 'between';
    };
    Filter.prototype.getClonedPredicates = function (predicates, equalOrFields) {
        if (equalOrFields === void 0) { equalOrFields = []; }
        var predicateCol = [];
        var predicate;
        var isNumCustomPredicate;
        for (var i = 0; i < predicates.length; i++) {
            predicate = predicates[i];
            if ((this.isCustomNumFilter(predicate.operator) || (!predicate.isFilterByMenu && predicate.operator === 'notequal')) &&
                isNumber(predicate.value)) {
                predicateCol.push(Object.assign({}, predicate, { field: predicate.field + "_value", type: 'number' }));
                isNumCustomPredicate = true;
            }
            else {
                if (!predicate.isFilterByMenu && predicate.operator === 'equal' && predicate.predicate === 'or') {
                    equalOrFields.push(predicate.field);
                }
                predicateCol.push(predicate);
            }
        }
        if (!isNumCustomPredicate && equalOrFields.length) {
            equalOrFields.splice(0);
        }
        return predicateCol;
    };
    Filter.prototype.updatePredicate = function (predicates, field) {
        var dataManager = new DataManager(predicates);
        var query = new Query();
        var fields = dataManager.executeLocal(query.where('field', 'equal', field));
        for (var index = 0; index < fields.length; index++) {
            var sameIndex = -1;
            for (var filterIndex = 0; filterIndex < predicates.length; filterIndex++) {
                if (predicates[filterIndex].field === fields[index].field) {
                    sameIndex = filterIndex;
                    break;
                }
            }
            if (sameIndex !== -1) {
                predicates.splice(sameIndex, 1);
            }
        }
    };
    /**
     * Triggers events for filtering and applies filter.
     *
     * @param {FilterOptions} filterOptions - Specify the filteroptions.
     * @param {string} range - Specify the range.
     * @param {number} sheetIdx - Specify the sheet index.
     * @param {PredicateModel[]} prevPredicates - Specify the predicates.
     * @param {boolean} refresh - Spefify the refresh.
     * @param {boolean} isInternal - Specify the isInternal.
     * @param {boolean} isFilterByValue - Specify the it is filter by value or not.
     * @returns {void} - Triggers events for filtering and applies filter.
     */
    Filter.prototype.applyFilter = function (filterOptions, range, sheetIdx, prevPredicates, refresh, isInternal, isFilterByValue) {
        var _this = this;
        var eventArgs = { range: range, predicates: [].slice.call(this.filterCollection.get(sheetIdx)),
            previousPredicates: prevPredicates, sheetIndex: sheetIdx, cancel: false };
        if (!isInternal && !isFilterByValue) {
            this.parent.notify(beginAction, { action: 'filter', eventArgs: eventArgs });
            if (eventArgs.cancel) {
                return;
            }
        }
        if (range.indexOf('!') < 0) {
            range = this.parent.sheets[sheetIdx].name + '!' + range;
        }
        this.parent.showSpinner();
        var promise = new Promise(function (resolve) { resolve((function () { })()); });
        var filterArgs = { args: { range: range,
                filterOptions: filterOptions }, promise: promise, refresh: refresh };
        var prevChartIndexes = getChartsIndexes(this.parent);
        this.parent.notify(initiateFilter, filterArgs);
        var currentChartIndexes = getChartsIndexes(this.parent);
        this.parent.notify(refreshChartCellModel, { prevChartIndexes: prevChartIndexes, currentChartIndexes: currentChartIndexes });
        filterArgs.promise.then(function (args) {
            _this.refreshFilterRange();
            _this.parent.hideSpinner();
            if (!isInternal) {
                delete eventArgs.cancel;
                _this.parent.notify(completeAction, { action: 'filter', eventArgs: eventArgs });
                if (document.activeElement.id !== _this.parent.element.id + "_SearchBox") {
                    focus(_this.parent.element);
                }
            }
            return Promise.resolve(args);
        }).catch(function (error) {
            _this.filterRangeAlertHandler({ error: error });
            return Promise.reject(error);
        });
    };
    /**
     * Gets the predicates for the sheet
     *
     * @param {PredicateModel[]} predicateModel - Specifies the predicate collection.
     * @returns {Predicate[]} - Gets the predicates for the sheet
     */
    Filter.prototype.getPredicates = function (predicateModel) {
        var equalOrPredicates;
        var equalOrFields = [];
        var predicateCol = this.getClonedPredicates(predicateModel, equalOrFields);
        if (equalOrFields.length) {
            var field = void 0;
            var predicate = void 0;
            var equalOrPredicatesModel = new Map();
            for (var idx = 0; idx < predicateCol.length; idx++) {
                field = predicateCol[idx].field.replace('_value', '');
                if (equalOrFields.indexOf(field) > -1) {
                    predicate = predicateCol.splice(idx, 1)[0];
                    idx--;
                    if (equalOrPredicatesModel.has(field)) {
                        equalOrPredicatesModel.get(field).push(predicate);
                    }
                    else {
                        equalOrPredicatesModel.set(field, [predicate]);
                    }
                }
            }
            equalOrPredicates = [];
            var predicateList_1;
            equalOrPredicatesModel.forEach(function (predicates) {
                predicateList_1 = [];
                var excelPredicate = CheckBoxFilterBase.getPredicate(predicates);
                for (var _i = 0, _a = Object.keys(excelPredicate); _i < _a.length; _i++) {
                    var prop = _a[_i];
                    predicateList_1.push(excelPredicate["" + prop]);
                }
                equalOrPredicates.push(predicateList_1);
            });
        }
        var predicateList = [];
        var excelPredicate = CheckBoxFilterBase.getPredicate(predicateCol);
        for (var _i = 0, _a = Object.keys(excelPredicate); _i < _a.length; _i++) {
            var prop = _a[_i];
            predicateList.push(excelPredicate["" + prop]);
        }
        return { predicates: predicateList, equalOrPredicates: equalOrPredicates };
    };
    /**
     * Gets the column type to pass it into the excel filter options.
     *
     * @param {SheetModel} sheet - Specify the sheet.
     * @param {number} colIndex - Specify the colindex
     * @param {number[]} range - Specify the range.
     * @param {boolean} isFilterDialog - Indicates whether the filter dialog UI is open.
     * @returns {string} - Gets the column type to pass it into the excel filter options.
     */
    Filter.prototype.getColumnType = function (sheet, colIndex, range, isFilterDialog) {
        var num = 0;
        var str = 0;
        var date = 0;
        var time = 0;
        var cell;
        var formatOption;
        var format;
        var isMultiFormattedCol;
        for (var i = range[0]; i <= range[2]; i++) {
            cell = getCell(i, colIndex, sheet);
            if (cell && !(isFilterDialog && !(cell.value || Number(cell.value) === 0))) {
                if (cell.format && cell.format !== 'General') {
                    var type = getTypeFromFormat(cell.format).toLowerCase();
                    switch (type) {
                        case 'number':
                        case 'currency':
                        case 'accounting':
                        case 'percentage':
                            num++;
                            break;
                        case 'shortdate':
                        case 'longdate':
                            date++;
                            break;
                        case 'time':
                            num++;
                            break;
                        case 'text':
                            str++;
                            break;
                        default:
                            formatOption = {};
                            if (isCustomDateTime(cell.format, true, formatOption)) {
                                if (formatOption.type === 'date') {
                                    date++;
                                }
                                else {
                                    num++;
                                }
                            }
                            else if (isNumber(cell.value)) {
                                num++;
                            }
                            else if (cell.value) {
                                str++;
                            }
                            break;
                    }
                    if (!format) {
                        format = cell.format;
                    }
                }
                else if (isNumber(cell.value)) {
                    num++;
                }
                else if (cell.value) {
                    str++;
                }
                if (format && format !== cell.format) {
                    isMultiFormattedCol = true;
                }
            }
        }
        return { type: (num > str && num > date && num > time) ? 'number' : (str >= num && str >= date && str >= time) ? 'string'
                : (date > num && date > str && date > time) ? 'date' : 'datetime', isDateAvail: !!date, isMultiFormattedCol: isMultiFormattedCol };
    };
    /**
     * Clear filter from the field.
     *
     * @param {any} args - Specifies the args
     * @param {{ field: string }} args.field - Specify the args
     * @param {boolean} args.isAction - Specify the isAction.
     * @param {boolean} args.preventRefresh - Specify the preventRefresh.
     * @param {number} args.sheetIndex - Specify the sheet index value.
     * @returns {void} - Clear filter from the field.
     */
    Filter.prototype.clearFilterHandler = function (args) {
        var sheetIndex = args && !isNullOrUndefined(args.sheetIndex) ? args.sheetIndex : this.parent.activeSheetIndex;
        if (args && args.field) {
            var predicates = [].slice.call(this.filterCollection.get(sheetIndex));
            if (predicates && predicates.length) {
                this.updatePredicate(predicates, args.field);
                this.initiateFilterUIHandler({ predicates: predicates, range: getRangeAddress(this.filterRange.get(sheetIndex).range), sIdx: sheetIndex });
            }
        }
        else {
            var isAction = args && args.isAction;
            var filterArgs = { isFiltered: false, isClearAll: true, sheetIndex: sheetIndex };
            this.getFilteredColumnHandler(filterArgs);
            if (filterArgs.isFiltered || (args && args.preventRefresh)) {
                var eventArgs = void 0;
                var sheet = getSheet(this.parent, sheetIndex);
                var filterRange = this.filterRange.get(sheetIndex);
                var range = filterRange.range;
                if (isAction) {
                    eventArgs = { range: getRangeAddress(range), predicates: [], previousPredicates: this.filterCollection.get(sheetIndex), sheetIndex: sheetIndex, cancel: false };
                    this.parent.notify(beginAction, { action: 'filter', eventArgs: eventArgs });
                    if (eventArgs.cancel) {
                        return;
                    }
                }
                this.filterCollection.set(sheetIndex, []);
                var len = filterRange.useFilterRange ? range[2] : sheet.usedRange.rowIndex;
                if (this.parent.scrollSettings.enableVirtualization && ((len - range[0]) + 1 > (this.parent.viewport.rowCount +
                    (this.parent.getThreshold('row') * 2)))) {
                    for (var i = 0; i <= len; i++) {
                        setRow(sheet, i, { hidden: false, isFiltered: false });
                    }
                    if (!args || !args.preventRefresh) {
                        this.parent.renderModule.refreshSheet(false, false, true);
                    }
                }
                else {
                    this.refreshFilterRange(null, null, sheetIndex);
                    var evtArgs = { startIndex: range[0], hide: false, isFiltering: true, refreshUI: false, endIndex: filterRange.useFilterRange ? range[2] : sheet.usedRange.rowIndex, sheetIndex: sheetIndex };
                    this.parent.notify(hideShow, evtArgs);
                    if (evtArgs.refreshUI && (!args || !args.preventRefresh)) {
                        this.parent.renderModule.refreshSheet(false, false, true);
                    }
                }
                if (isAction) {
                    delete eventArgs.cancel;
                    this.parent.notify(completeAction, { action: 'filter', eventArgs: eventArgs });
                    focus(this.parent.element);
                }
            }
        }
    };
    /**
     * Reapplies the filter.
     *
     * @param {boolean} isInternal - Specifies the isInternal.
     * @param {boolean} refresh - Specifies the refresh.
     * @returns {void} - Reapplies the filter.
     */
    Filter.prototype.reapplyFilterHandler = function (isInternal, refresh) {
        var _this = this;
        var sheetIdx = this.parent.activeSheetIndex;
        if (this.filterRange.has(sheetIdx)) {
            var predicates_2 = this.filterCollection.get(sheetIdx);
            if (predicates_2 && predicates_2.length) {
                var sheet = getSheet(this.parent, sheetIdx);
                var filterRange_1 = this.filterRange.get(sheetIdx);
                var range = filterRange_1.range.slice();
                if (!filterRange_1.allowHeaderFilter) {
                    range[0] = range[0] + 1;
                }
                if (!filterRange_1.useFilterRange) {
                    range[2] = sheet.usedRange.rowIndex;
                }
                range[1] = range[3] = getColIndex(predicates_2[0].field);
                var addr = sheet.name + "!" + this.getPredicateRange(range, predicates_2.slice(1, predicates_2.length));
                getData(this.parent, addr, true, true, null, true, null, null, false, getRangeAddress(range)).then(function (jsonData) {
                    var options = _this.getPredicates(_this.filterCollection.get(sheetIdx));
                    _this.applyFilter({ predicates: options.predicates, datasource: new DataManager(jsonData),
                        equalOrPredicates: options.equalOrPredicates }, getRangeAddress(filterRange_1.range), sheetIdx, [].slice.call(predicates_2), refresh, isInternal);
                });
            }
        }
    };
    /**
     * Gets the filter information of the sheet.
     *
     * @param {FilterInfoArgs} args - Specify the args
     * @returns {void} - Gets the filter information of the sheet.
     */
    Filter.prototype.getFilterRangeHandler = function (args) {
        var sheetIdx = isNullOrUndefined(args.sheetIdx) ? this.parent.activeSheetIndex : args.sheetIdx;
        var filterOption = this.filterRange && this.filterRange.get(sheetIdx);
        if (filterOption) {
            args.hasFilter = true;
            args.filterRange = filterOption.range;
            args.allowHeaderFilter = filterOption.allowHeaderFilter;
            args.isFiltered = this.filterCollection && this.filterCollection.get(sheetIdx) &&
                this.filterCollection.get(sheetIdx).length > 0;
        }
        else {
            args.hasFilter = false;
            args.filterRange = null;
        }
    };
    /**
     * Returns the custom operators for filter items.
     *
     * @returns {Object} - Returns the custom operators for filter items.
     */
    Filter.prototype.getLocalizedCustomOperators = function () {
        var l10n = this.parent.serviceLocator.getService(locale);
        var numOptr = [
            { value: 'equal', text: l10n.getConstant('Equal') },
            { value: 'greaterthan', text: l10n.getConstant('GreaterThan') },
            { value: 'greaterthanorequal', text: l10n.getConstant('GreaterThanOrEqual') },
            { value: 'lessthan', text: l10n.getConstant('LessThan') },
            { value: 'lessthanorequal', text: l10n.getConstant('LessThanOrEqual') },
            { value: 'notequal', text: l10n.getConstant('NotEqual') }
        ];
        var customOperators = {
            stringOperator: [
                { value: 'startswith', text: l10n.getConstant('StartsWith') },
                { value: 'endswith', text: l10n.getConstant('EndsWith') },
                { value: 'contains', text: l10n.getConstant('Contains') },
                { value: 'equal', text: l10n.getConstant('Equal') },
                { value: 'isempty', text: l10n.getConstant('IsEmpty') },
                { value: 'doesnotstartwith', text: l10n.getConstant('NotStartsWith') },
                { value: 'doesnotendwith', text: l10n.getConstant('NotEndsWith') },
                { value: 'doesnotcontain', text: l10n.getConstant('NotContains') },
                { value: 'notequal', text: l10n.getConstant('NotEqual') },
                { value: 'isnotempty', text: l10n.getConstant('IsNotEmpty') }
            ],
            numberOperator: numOptr,
            dateOperator: numOptr,
            datetimeOperator: numOptr,
            booleanOperator: [
                { value: 'equal', text: l10n.getConstant('Equal') },
                { value: 'notequal', text: l10n.getConstant('NotEqual') }
            ]
        };
        return customOperators;
    };
    /**
     * To set the filtered range and predicates collections in the save JSON object.
     *
     * @param {any} args - Specifies the args
     * @param {number} args.sheetIdx - Specifies the sheet index value.
     * @param {boolean} args.isSaveAction - Specifies the Save action.
     * @param {any} args.saveJson - Specifies save as Json.
     * @param {FilterCollectionModel[]} args.saveJson.filterCollection - Specifies the filter collection values.
     * @returns {void}
     */
    Filter.prototype.setFilteredCollection = function (args) {
        var _this = this;
        var filterArgs = { sheetIdx: args.sheetIdx };
        this.getFilterRangeHandler(filterArgs);
        if (filterArgs.hasFilter) {
            var filterModel_1 = { sheetIndex: args.sheetIdx, filterRange: getRangeAddress(filterArgs.filterRange),
                hasFilter: true, column: [], criteria: [], value: [], dataType: [], predicates: [] };
            args.saveJson.filterCollection.push(filterModel_1);
            var predicates = this.filterCollection.get(args.sheetIdx);
            var predicateMap = new Map();
            var predicate = void 0;
            var type_1;
            var getPredicateValue_1 = function (val) {
                if (isNullOrUndefined(val)) {
                    return '';
                }
                else if (args.isSaveAction && type_1 === 'date') {
                    var dateVal = val;
                    val = dateVal.getMonth() + 1 + "/" + dateVal.getDate() + "/" + dateVal.getFullYear() + " " + dateVal.getHours() + ":" + dateVal.getMinutes() + ":" + dateVal.getSeconds();
                }
                return val;
            };
            for (var idx = 0; idx < predicates.length; idx++) {
                predicate = predicates[idx];
                if (args.isSaveAction && predicate.operator === 'notequal' && predicate.isFilterByMenu) {
                    if (predicateMap.has(predicate.field)) {
                        predicateMap.get(predicate.field).push(predicate);
                    }
                    else {
                        predicateMap.set(predicate.field, [predicate]);
                    }
                }
                else {
                    filterModel_1.column.push(getColIndex(predicate.field));
                    filterModel_1.criteria.push(predicate.operator);
                    if (args.isSaveAction) {
                        if (predicate.operator === 'equal') {
                            type_1 = isDateTime(predicate.value) ? 'date' : 'string';
                            filterModel_1.value.push(getPredicateValue_1(predicate.value));
                            filterModel_1.dataType.push(type_1);
                        }
                        else {
                            filterModel_1.value.push(predicate.value);
                            filterModel_1.dataType.push('custom');
                        }
                    }
                    else {
                        filterModel_1.value.push(predicate.value);
                        filterModel_1.dataType.push(predicate.type);
                    }
                    filterModel_1.predicates.push(predicate.predicate);
                }
            }
            var colDataMap_1 = new Map();
            var colIdx_2;
            predicateMap.forEach(function (predicate, field) {
                colIdx_2 = getColIndex(field);
                if (!colDataMap_1.has(field)) {
                    colDataMap_1.set(field, _this.getColData(colIdx_2, field, args.sheetIdx));
                }
                var colData = colDataMap_1.get(field);
                var predicateCol = _this.getPredicates(predicate).predicates;
                var filteredData = new DataManager(colData).executeLocal(new Query().where(Predicate.and(predicateCol)));
                for (var idx = 0; idx < filteredData.length; idx++) {
                    filterModel_1.column.push(colIdx_2);
                    filterModel_1.criteria.push('equal');
                    type_1 = isDateTime(filteredData[idx][field]) ? 'date' : 'string';
                    filterModel_1.value.push(getPredicateValue_1(filteredData[idx][field]));
                    filterModel_1.dataType.push(type_1);
                    filterModel_1.predicates.push('or');
                }
            });
        }
    };
    Filter.prototype.updateFilter = function (args) {
        if (this.parent.filterCollection && (args.initLoad || args.isOpen)) {
            var datePredicate = void 0;
            var predicates = void 0;
            var filterCol = void 0;
            var dateColData = {};
            var filteredData = void 0;
            var predicateCol = void 0;
            var filterOption = void 0;
            for (var i = 0; i < this.parent.filterCollection.length; i++) {
                filterCol = this.parent.filterCollection[i];
                var sIdx = filterCol.sheetIndex;
                if (i === 0 && !this.parent.isOpen && !args.isOpen) {
                    sIdx = 0;
                }
                predicates = [];
                if (filterCol.column) {
                    for (var j = 0; j < filterCol.column.length; j++) {
                        predicateCol = {
                            field: getColumnHeaderText(filterCol.column[j] + 1),
                            operator: this.getFilterOperator(filterCol.criteria[j]), value: typeof filterCol.value[j]
                                === 'string' ? filterCol.value[j].split('*').join('') : filterCol.value[j],
                            predicate: filterCol.predicates && filterCol.predicates[j],
                            type: filterCol.dataType && filterCol.dataType[j]
                        };
                        if (['year', 'month', 'day'].indexOf(predicateCol.type) > -1) {
                            var dateEventArgs = { value: predicateCol.value,
                                cell: { value: predicateCol.value } };
                            this.parent.notify(checkDateFormat, dateEventArgs);
                            if (dateEventArgs.isDate) {
                                var predicateVal = dateEventArgs.dateObj;
                                predicateCol.value = predicateVal;
                                if (predicateCol.type === 'day') {
                                    predicateCol.type = 'date';
                                    predicateCol.predicate = 'or';
                                    predicates.push(predicateCol);
                                }
                                else {
                                    predicateCol.operator = 'greaterthanorequal';
                                    predicateCol.predicate = 'and';
                                    var type = predicateCol.type;
                                    predicateCol.type = 'date';
                                    datePredicate = this.getPredicates([predicateCol, { field: predicateCol.field, operator: 'lessthanorequal', predicate: 'and',
                                            type: 'date', value: new Date(predicateVal.getFullYear(), type === 'year' ? 12 :
                                                predicateVal.getMonth() + 1, 0, 0, 0, 0) }]).predicates;
                                    if (!dateColData[predicateCol.field]) {
                                        dateColData[predicateCol.field] = this.getColData(filterCol.column[j], predicateCol.field, i);
                                    }
                                    filteredData = new DataManager(dateColData[predicateCol.field]).executeLocal(new Query().where(Predicate.and(datePredicate)));
                                    for (var k = 0; k < filteredData.length; k++) {
                                        predicates.push({ field: predicateCol.field, operator: 'equal', predicate: 'or', type: 'date',
                                            value: filteredData[k][predicateCol.field] });
                                    }
                                }
                            }
                        }
                        else {
                            filterOption = { isOpen: true, instance: { options: { type: predicateCol.type } },
                                arg3: predicateCol.value, arg2: predicateCol.operator };
                            this.beforeFilteringHandler(filterOption);
                            predicateCol.value = filterOption.arg3;
                            if (predicateCol.type === 'string' || predicateCol.type === 'custom') {
                                if (this.isCustomNumFilter(predicateCol.operator) && isNumber(predicateCol.value)) {
                                    predicateCol.type = 'number';
                                }
                            }
                            else if (predicateCol.type === 'date' && predicateCol.operator === 'equal' &&
                                typeof predicateCol.value === 'string' && predicateCol.value.includes('/') &&
                                predicateCol.value.includes(':')) {
                                var dateTimeStr = predicateCol.value.split(' ');
                                if (dateTimeStr.length === 2) {
                                    var dateArr = dateTimeStr[0].split('/');
                                    var timeArr = dateTimeStr[1].split(':');
                                    if (dateArr.length === 3 && timeArr.length === 3) {
                                        predicateCol.value = new Date(Number(dateArr[2]), Number(dateArr[0]) - 1, Number(dateArr[1]), Number(timeArr[0]), Number(timeArr[1]), Number(timeArr[2]));
                                    }
                                }
                            }
                            predicates.push(predicateCol);
                        }
                    }
                }
                if (!args.isOpen) {
                    for (var i_1 = 0; i_1 < predicates.length - 1; i_1++) {
                        if (predicates[i_1].field === predicates[i_1 + 1].field) {
                            if (!predicates[i_1].predicate) {
                                predicates[i_1].predicate = 'or';
                            }
                            if (!predicates[i_1 + 1].predicate) {
                                predicates[i_1 + 1].predicate = 'or';
                            }
                        }
                    }
                }
                this.parent.notify(initiateFilterUI, { predicates: predicates.length ? predicates : undefined, range: filterCol.filterRange, sIdx: sIdx, isInternal: true, isOpen: args.isOpen });
            }
            if (this.parent.sortCollection) {
                this.parent.notify(sortImport, null);
            }
            this.parent.setProperties({ filterCollection: null }, true);
        }
    };
    Filter.prototype.getColData = function (colIdx, field, sheetIdx) {
        var sheet = getSheet(this.parent, sheetIdx);
        if (!sheet.rows || !sheet.rows.length) {
            return [];
        }
        var rows = [];
        var row;
        var cell;
        for (var rowIdx = 1, rowLen = sheet.rows.length; rowIdx < rowLen; rowIdx++) {
            if (sheet.rows[rowIdx]) {
                cell = getCell(rowIdx, colIdx, sheet, false, true);
                if (cell && cell.value) {
                    row = {};
                    row[field] = getValueFromFormat(this.parent, cell, rowIdx, colIdx);
                    rows.push(row);
                }
            }
        }
        return rows;
    };
    Filter.prototype.getFilterOperator = function (value) {
        switch (value) {
            case 'BeginsWith':
                value = 'startswith';
                break;
            case 'Less':
                value = 'lessthan';
                break;
            case 'EndsWith':
                value = 'endswith';
                break;
            case 'Equal':
                value = 'equal';
                break;
            case 'Notequal':
                value = 'notEqual';
                break;
            case 'Greater':
                value = 'greaterthan';
                break;
            case 'Contains':
                value = 'contains';
                break;
            case 'LessOrEqual':
                value = 'lessthanorequal';
                break;
            case 'GreaterOrEqual':
                value = 'greaterthanorequal';
                break;
            case 'NotContains':
                value = 'doesnotcontain';
                break;
            case 'NotBeginsWith':
                value = 'doesnotstartwith';
                break;
            case 'NotEndsWith':
                value = 'doesnotendwith';
                break;
            case 'Empty':
                value = 'isempty';
                break;
            case 'NotEmpty':
                value = 'isnotempty';
                break;
        }
        return value;
    };
    Filter.prototype.beforeInsertHandler = function (args) {
        if (args.modelType === 'Column') {
            var sheetIdx_1 = isUndefined(args.activeSheetIndex) ? this.parent.activeSheetIndex : args.activeSheetIndex;
            if (this.filterRange.size && this.filterRange.has(sheetIdx_1)) {
                var range = this.filterRange.get(sheetIdx_1).range;
                if (this.isFilterCell(sheetIdx_1, range[0], args.index) || args.index < range[1]) {
                    range[3] += args.model.length;
                    if (args.index <= range[1]) {
                        range[1] += args.model.length;
                    }
                    this.filterCollection.get(sheetIdx_1).forEach(function (predicate) {
                        var colIdx = getColIndex(predicate.field);
                        if (args.index <= colIdx) {
                            predicate.field = getColumnHeaderText(colIdx + args.model.length + 1);
                        }
                    });
                    if (this.parent.sortCollection) {
                        this.parent.sortCollection.forEach(function (sortCollection) {
                            if (sortCollection.sheetIndex === sheetIdx_1 && args.index <= sortCollection.columnIndex) {
                                sortCollection.columnIndex += args.model.length;
                            }
                        });
                    }
                }
            }
        }
        else if (args.modelType === 'Sheet') {
            for (var _i = 0, _a = Array.from(this.filterRange.keys()).sort().reverse(); _i < _a.length; _i++) {
                var key = _a[_i];
                if (args.index <= key) {
                    this.filterRange.set(key + args.model.length, this.filterRange.get(key));
                    this.filterRange.delete(key);
                    this.filterCollection.set(key + args.model.length, this.filterCollection.get(key));
                    this.filterCollection.delete(key);
                }
            }
            if (this.parent.sortCollection) {
                this.parent.sortCollection.forEach(function (sortCollection) {
                    if (args.index <= sortCollection.sheetIndex) {
                        sortCollection.sheetIndex += args.model.length;
                    }
                });
            }
        }
    };
    Filter.prototype.beforeDeleteHandler = function (args) {
        if (args.modelType === 'Column') {
            var sheetIdx = this.parent.activeSheetIndex;
            if (this.filterRange.size && this.filterRange.has(sheetIdx)) {
                var isChanged = true;
                var range = this.filterRange.get(sheetIdx).range;
                if (args.start >= range[1] && args.end <= range[3]) { // in between
                    range[3] -= args.end - args.start + 1;
                }
                else if (args.start < range[1] && args.end < range[1]) { // before
                    range[1] -= args.end - args.start + 1;
                    range[3] -= args.end - args.start + 1;
                }
                else if (args.start < range[1] && args.end > range[1] && args.end < range[3]) { // from before to inbetween
                    range[1] = args.start;
                    range[3] -= args.end - args.start + 1;
                }
                else {
                    isChanged = false;
                }
                if (isChanged) {
                    var filterCollection = this.filterCollection.get(sheetIdx);
                    var isPredicateRemoved = void 0;
                    for (var i = filterCollection.length - 1; i >= 0; i--) {
                        var colIdx = getColIndex(filterCollection[i].field);
                        if (args.end < colIdx) {
                            filterCollection[i].field = getColumnHeaderText(colIdx - (args.end - args.start + 1) + 1);
                        }
                        else if (args.start <= colIdx && args.end >= colIdx) {
                            isPredicateRemoved = true;
                            filterCollection.splice(i, 1);
                        }
                    }
                    var sortColl = this.parent.sortCollection;
                    if (sortColl) {
                        for (var i = 0; i < sortColl.length; i++) {
                            if (sortColl[i].sheetIndex === sheetIdx) {
                                if (args.end < sortColl[i].columnIndex) {
                                    sortColl[i].columnIndex = sortColl[i].columnIndex - (args.end - args.start + 1);
                                    break;
                                }
                                else if (args.start <= sortColl[i].columnIndex && args.end >= sortColl[i].columnIndex) {
                                    sortColl.splice(i, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (range.some(function (value) { return value < 0; })) {
                        this.removeFilter(sheetIdx, true, true);
                        args.refreshSheet = true;
                    }
                    else if (isPredicateRemoved) {
                        if (filterCollection && filterCollection.length) {
                            this.reapplyFilterHandler(true, true);
                            args.refreshSheet = false;
                        }
                        else {
                            this.clearFilterHandler({ preventRefresh: true });
                            args.refreshSheet = true;
                        }
                    }
                }
            }
        }
    };
    Filter.prototype.deleteSheetHandler = function (args) {
        if (!isUndefined(args.sheetIndex)) {
            for (var _i = 0, _a = Array.from(this.filterRange.keys()).sort().reverse(); _i < _a.length; _i++) {
                var key = _a[_i];
                if (args.sheetIndex === key) {
                    this.filterRange.delete(key);
                    this.filterCollection.delete(key);
                }
                else if (args.sheetIndex < key) {
                    this.filterRange.set(key - 1, this.filterRange.get(key));
                    this.filterRange.delete(key);
                    this.filterCollection.set(key - 1, this.filterCollection.get(key));
                    this.filterCollection.delete(key);
                }
            }
            var sortColl = this.parent.sortCollection;
            if (sortColl) {
                for (var i = sortColl.length - 1; i >= 0; i--) {
                    if (args.sheetIndex === sortColl[i].sheetIndex) {
                        sortColl.splice(i, 1);
                    }
                    else if (args.sheetIndex < sortColl[i].sheetIndex) {
                        sortColl[i].sheetIndex -= 1;
                    }
                }
            }
        }
        else if (this.filterRange.get(this.parent.activeSheetIndex)) {
            this.filterRange.delete(this.parent.activeSheetIndex);
            this.filterCollection.delete(this.parent.activeSheetIndex);
        }
    };
    Filter.prototype.clearHandler = function (args) {
        var info = this.parent.getAddressInfo(args.range);
        if (this.filterRange.has(info.sheetIndex)) {
            var indexes = this.filterRange.get(info.sheetIndex).range.slice();
            if (inRange(info.indices, indexes[0], indexes[1]) && inRange(info.indices, indexes[0], indexes[3])) {
                this.removeFilter(info.sheetIndex, null, null, true);
            }
        }
    };
    Filter.prototype.duplicateSheetFilterHandler = function (args) {
        for (var _i = 0, _a = Array.from(this.filterRange.keys()).sort().reverse(); _i < _a.length; _i++) {
            var key = _a[_i];
            if (args.newSheetIndex <= key) {
                this.filterRange.set(key + 1, this.filterRange.get(key));
                this.filterRange.delete(key);
                this.filterCollection.set(key + 1, this.filterCollection.get(key));
                this.filterCollection.delete(key);
            }
            else {
                break;
            }
        }
        if (this.filterCollection.has(args.sheetIndex)) {
            this.filterCollection.set(args.newSheetIndex, this.filterCollection.get(args.sheetIndex).slice());
        }
        if (this.filterRange.has(args.sheetIndex)) {
            var filterRange = this.filterRange.get(args.sheetIndex);
            this.filterRange.set(args.newSheetIndex, {
                useFilterRange: filterRange.useFilterRange, range: filterRange.range.slice(),
                allowHeaderFilter: filterRange.allowHeaderFilter
            });
        }
    };
    Filter.prototype.updateSortCollectionHandler = function (args) {
        var _a;
        if (args.isDuplicate) {
            if (this.parent.sortCollection && this.parent.sortCollection.length > 0) {
                var newSortCollection = [];
                for (var j = 0; j < this.parent.sortCollection.length; j++) {
                    var sortCol = this.parent.sortCollection[j];
                    if (sortCol.sheetIndex === args.curSheetIndex) {
                        var updatedSortCol = Object.assign({}, sortCol);
                        updatedSortCol.sheetIndex = args.newSheetIndex;
                        newSortCollection.push(updatedSortCol);
                    }
                }
                (_a = this.parent.sortCollection).push.apply(_a, newSortCollection);
            }
            return;
        }
        var sheet = this.parent.getActiveSheet();
        var sheetIdx = this.parent.activeSheetIndex;
        var filterRange = this.filterRange.get(sheetIdx);
        if (filterRange) {
            var range = filterRange.range.slice();
            if (!filterRange.allowHeaderFilter) {
                range[0] = range[0] + 1; // to skip first row.
            }
            if (!filterRange.useFilterRange) {
                range[2] = sheet.usedRange.rowIndex; //filter range should be till used range.
            }
            var sortDescriptors = args.sortOptions.sortDescriptors;
            this.parent.sortCollection = this.parent.sortCollection ? this.parent.sortCollection : [];
            if (Array.isArray(sortDescriptors)) {
                for (var i = 0; i < sortDescriptors.length; i++) {
                    this.parent.sortCollection.push({
                        sortRange: getRangeAddress(range), columnIndex: getColIndex(sortDescriptors[i].field),
                        order: sortDescriptors[i].order, sheetIndex: sheetIdx
                    });
                }
            }
            else {
                this.parent.sortCollection.push({
                    sortRange: getRangeAddress(range), columnIndex: getIndexesFromAddress(sheet.activeCell)[1],
                    order: sortDescriptors.order, sheetIndex: sheetIdx
                });
            }
        }
    };
    Filter.prototype.moveSheetHandler = function (args) {
        var prevSheetFilterRange;
        var currentSheetFilterRange;
        var prevSheetFilterCollection;
        var currentSheetFilterCollection;
        if (this.filterRange.has(args.prevIndex)) {
            prevSheetFilterRange = this.filterRange.get(args.prevIndex);
            prevSheetFilterCollection = this.filterCollection.get(args.prevIndex);
        }
        if (this.filterRange.has(args.currentIndex)) {
            currentSheetFilterRange = this.filterRange.get(args.currentIndex);
            currentSheetFilterCollection = this.filterCollection.get(args.currentIndex);
        }
        if (prevSheetFilterRange && currentSheetFilterRange) {
            this.filterRange.set(args.currentIndex, prevSheetFilterRange);
            this.filterRange.set(args.prevIndex, currentSheetFilterRange);
            this.filterCollection.set(args.currentIndex, prevSheetFilterCollection);
            this.filterCollection.set(args.prevIndex, currentSheetFilterCollection);
        }
        else if (prevSheetFilterRange) {
            this.filterRange.set(args.currentIndex, prevSheetFilterRange);
            this.filterRange.delete(args.prevIndex);
            this.filterCollection.set(args.currentIndex, prevSheetFilterCollection);
            this.filterCollection.delete(args.prevIndex);
        }
        else if (currentSheetFilterRange) {
            this.filterRange.set(args.prevIndex, currentSheetFilterRange);
            this.filterRange.delete(args.currentIndex);
            this.filterCollection.set(args.prevIndex, currentSheetFilterCollection);
            this.filterCollection.delete(args.currentIndex);
        }
    };
    Filter.prototype.refreshFilterCellsOnResize = function (args) {
        var range = this.filterRange.has(this.parent.activeSheetIndex) &&
            this.filterRange.get(this.parent.activeSheetIndex).range;
        if (range && range[0] === args.rowIndex) {
            var sheet = this.parent.getActiveSheet();
            for (var colIdx = range[1]; colIdx <= range[3]; colIdx++) {
                if (getCell(args.rowIndex, colIdx, sheet, false, true).notes) {
                    var cellEle = this.parent.getCell(args.rowIndex, colIdx);
                    if (cellEle) {
                        this.parent.serviceLocator.getService('cell').refresh(args.rowIndex, colIdx, false, cellEle, false, false, true);
                    }
                }
            }
        }
    };
    return Filter;
}());
export { Filter };
