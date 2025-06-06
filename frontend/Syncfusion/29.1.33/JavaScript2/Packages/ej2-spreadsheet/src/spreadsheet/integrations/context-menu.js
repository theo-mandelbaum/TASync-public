import { ContextMenu as ContextMenuComponent } from '@syncfusion/ej2-navigations';
import { closest, extend, detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import { removeSheetTab, cMenuBeforeOpen, renameSheetTab, cut, copy, paste, focus, getUpdateUsingRaf, readonlyAlert, getRowIdxFromClientY, getColIdxFromClientX } from '../common/index';
import { addContextMenuItems, removeContextMenuItems, enableContextMenuItems, initiateCustomSort, hideSheet } from '../common/index';
import { openHyperlink, initiateHyperlink, editHyperlink, addNote, editNote, deleteNote } from '../common/index';
import { filterByCellValue, reapplyFilter, clearFilter, getFilteredColumn, applySort, locale, removeHyperlink } from '../common/index';
import { getRangeIndexes, getColumnHeaderText, getCellIndexes, insertModel, getDataRange, isReadOnlyCells, updateSortCollection } from '../../workbook/common/index';
import { getSwapRange, getSheetIndex, moveSheet, duplicateSheet, hideShow, getRow, getColumn, getSheet } from '../../workbook/index';
import { toggleProtect } from '../common/index';
/**
 * Represents context menu for Spreadsheet.
 */
var ContextMenu = /** @class */ (function () {
    /**
     * Constructor for ContextMenu module.
     *
     * @param {Spreadsheet} parent - Constructor for ContextMenu module.
     */
    function ContextMenu(parent) {
        this.parent = parent;
        this.init();
    }
    ContextMenu.prototype.init = function () {
        this.initContextMenu();
        this.addEventListener();
    };
    ContextMenu.prototype.initContextMenu = function () {
        var ul = document.createElement('ul');
        ul.id = this.parent.element.id + '_contextmenu';
        this.parent.element.appendChild(ul);
        this.contextMenuInstance = new ContextMenuComponent({
            cssClass: 'e-spreadsheet-contextmenu',
            target: '#' + this.parent.element.id,
            select: this.selectHandler.bind(this),
            beforeOpen: this.beforeOpenHandler.bind(this),
            beforeClose: this.beforeCloseHandler.bind(this),
            beforeItemRender: function (args) {
                args.element.setAttribute('aria-label', args.item.text);
            }
        }, ul);
        ul.setAttribute('role', 'menu');
    };
    /**
     * Before close event handler.
     *
     * @param {BeforeOpenCloseMenuEventArgs} args - Specify the args
     * @returns {void} - Before close event handler.
     */
    ContextMenu.prototype.beforeCloseHandler = function (args) {
        var _this = this;
        this.parent.trigger('contextMenuBeforeClose', args);
        if (this.parent.enableKeyboardShortcut && args.event && args.event.keyCode === 27) { // Esc key
            getUpdateUsingRaf(function () { return focus(_this.parent.element); });
        }
    };
    /**
     * Select event handler.
     *
     * @param {MenuEventArgs} args - Specify the args
     * @returns {void} - Select event handler.
     */
    ContextMenu.prototype.selectHandler = function (args) {
        var selectArgs = extend({ cancel: false }, args);
        this.parent.trigger('contextMenuItemSelect', selectArgs);
        var id = this.parent.element.id + '_cmenu';
        var range = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
        var prevSort = [];
        if ((args.item.id === id + '_ascending' || args.item.id === id + '_descending') && this.parent.sortCollection) {
            for (var i = this.parent.sortCollection.length - 1; i >= 0; i--) {
                if (this.parent.sortCollection[i] &&
                    this.parent.sortCollection[i].sheetIndex === this.parent.activeSheetIndex) {
                    prevSort.push(this.parent.sortCollection[i]);
                    this.parent.sortCollection.splice(i, 1);
                }
            }
        }
        if (args.item.id === id + '_delete_row' || args.item.id === id + '_delete_column' ||
            args.item.id === id + '_insert_column_before' || args.item.id === id + '_insert_column_after' ||
            args.item.id === id + '_insert_row_above' || args.item.id === id + '_insert_row_below') {
            var row = getRow(this.parent.getActiveSheet(), range[0]);
            var column = getColumn(this.parent.getActiveSheet(), range[1]);
            if ((row && !row.isReadOnly) && (column && !column.isReadOnly)) {
                if (isReadOnlyCells(this.parent, range)) {
                    this.parent.notify(readonlyAlert, null);
                    return;
                }
            }
        }
        if (args.item.id === id + '_ascending' || args.item.id === id + '_descending' || args.item.id === id + '_customsort') {
            var sortRange = getDataRange(range[0], range[1], this.parent.getActiveSheet());
            if (isReadOnlyCells(this.parent, sortRange)) {
                this.parent.notify(readonlyAlert, null);
                return;
            }
        }
        var field;
        if (!selectArgs.cancel) {
            var indexes = void 0;
            switch (args.item.id) {
                case id + '_cut':
                    this.parent.notify(cut, { invokeCopy: true, promise: Promise });
                    break;
                case id + '_copy':
                    this.parent.notify(copy, { invokeCopy: true, promise: Promise });
                    break;
                case id + '_paste':
                    this.parent.notify(paste, { isAction: true, isInternal: true, focus: true });
                    break;
                case id + '_pastevalues':
                    this.parent.notify(paste, { type: 'Values', isAction: true, isInternal: true, focus: true });
                    break;
                case id + '_pasteformats':
                    this.parent.notify(paste, { type: 'Formats', isAction: true, isInternal: true, focus: true });
                    break;
                case id + '_rename':
                    this.parent.notify(renameSheetTab, {});
                    break;
                case id + '_delete_sheet':
                    this.parent.notify(removeSheetTab, {});
                    focus(this.parent.element);
                    break;
                case id + '_insert_sheet':
                    this.parent.notify(insertModel, { model: this.parent, start: this.parent.activeSheetIndex,
                        end: this.parent.activeSheetIndex, modelType: 'Sheet', isAction: true, activeSheetIndex: this.parent.activeSheetIndex });
                    break;
                case id + '_hide_sheet':
                    this.parent.notify(hideSheet, { sheetIndex: this.parent.activeSheetIndex, triggerEvent: true });
                    break;
                case id + '_duplicate':
                    duplicateSheet(this.parent, undefined, true);
                    focus(this.parent.element);
                    break;
                case id + '_move_right':
                    moveSheet(this.parent, this.parent.activeSheetIndex + 1, null, true);
                    focus(this.parent.element);
                    break;
                case id + '_move_left':
                    moveSheet(this.parent, this.parent.activeSheetIndex - 1, null, true);
                    focus(this.parent.element);
                    break;
                case id + '_ascending':
                    this.parent.notify(updateSortCollection, { sortOptions: { sortDescriptors: { order: 'Ascending' } } });
                    this.parent.notify(applySort, { sortOptions: { sortDescriptors: { order: 'Ascending' } }, previousSort: prevSort });
                    break;
                case id + '_descending':
                    this.parent.notify(updateSortCollection, { sortOptions: { sortDescriptors: { order: 'Descending' } } });
                    this.parent.notify(applySort, { sortOptions: { sortDescriptors: { order: 'Descending' } }, previousSort: prevSort });
                    break;
                case id + '_customsort':
                    this.parent.notify(initiateCustomSort, null);
                    break;
                case id + '_filtercellvalue':
                    this.parent.notify(filterByCellValue, null);
                    break;
                case id + '_clearfilter':
                    field = getColumnHeaderText(getCellIndexes(this.parent.getActiveSheet().activeCell)[1] + 1);
                    this.parent.notify(clearFilter, { field: field });
                    break;
                case id + '_reapplyfilter':
                    this.parent.notify(reapplyFilter, null);
                    break;
                case id + '_hide_row':
                    indexes = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
                    this.parent.notify(hideShow, {
                        startIndex: indexes[0], endIndex: indexes[2], hide: true, isCol: false, actionUpdate: true
                    });
                    break;
                case id + '_unhide_row':
                    indexes = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
                    this.parent.notify(hideShow, {
                        startIndex: indexes[0], endIndex: indexes[2], hide: false, isCol: false, actionUpdate: true
                    });
                    break;
                case id + '_hide_column':
                    indexes = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
                    this.parent.notify(hideShow, {
                        startIndex: indexes[1], endIndex: indexes[3], hide: true, isCol: true, actionUpdate: true
                    });
                    break;
                case id + '_unhide_column':
                    indexes = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
                    this.parent.notify(hideShow, {
                        startIndex: indexes[1], endIndex: indexes[3], hide: false, isCol: true, actionUpdate: true
                    });
                    break;
                case id + '_insert_row_above':
                case id + '_delete_row':
                    indexes = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
                    this.parent.notify(args.item.id.substr(id.length + 1, 6) + "Model", { model: this.parent.getActiveSheet(), start: indexes[0], end: indexes[2], modelType: 'Row', isAction: true,
                        insertType: 'above' });
                    break;
                case id + '_insert_row_below':
                    indexes = getSwapRange(getRangeIndexes(this.parent.getActiveSheet().selectedRange));
                    this.parent.notify(insertModel, { model: this.parent.getActiveSheet(), start: indexes[2] + 1, end: indexes[2] + 1 + (indexes[2] - indexes[0]), modelType: 'Row', isAction: true,
                        insertType: 'below' });
                    break;
                case id + '_insert_column_before':
                case id + '_delete_column':
                    indexes = getRangeIndexes(this.parent.getActiveSheet().selectedRange);
                    this.parent.notify(args.item.id.substr(id.length + 1, 6) + "Model", { model: this.parent.getActiveSheet(), start: indexes[1], end: indexes[3], modelType: 'Column', isAction: true,
                        insertType: 'before' });
                    break;
                case id + '_insert_column_after':
                    indexes = getSwapRange(getRangeIndexes(this.parent.getActiveSheet().selectedRange));
                    this.parent.notify(insertModel, { model: this.parent.getActiveSheet(), start: indexes[3] + 1, end: indexes[3] + 1 + (indexes[3] - indexes[1]), modelType: 'Column', isAction: true,
                        insertType: 'after' });
                    break;
                case id + '_addNote':
                    this.parent.notify(addNote, null);
                    break;
                case id + '_editNote':
                    this.parent.notify(editNote, null);
                    break;
                case id + '_deleteNote':
                    this.parent.notify(deleteNote, { rowIndex: null, columnIndex: null, isDeleteFromMenu: true });
                    break;
                case id + '_hyperlink':
                    this.parent.notify(initiateHyperlink, null);
                    break;
                case id + '_editHyperlink':
                    this.parent.notify(editHyperlink, null);
                    break;
                case id + '_openHyperlink':
                    this.parent.notify(openHyperlink, null);
                    break;
                case id + '_removeHyperlink':
                    this.parent.notify(removeHyperlink, { range: this.parent.getActiveSheet().selectedRange });
                    break;
                case id + '_protect':
                    this.parent.notify(toggleProtect, {});
                    break;
            }
        }
    };
    ContextMenu.prototype.getInsertModel = function (startIndex, endIndex) {
        var model = [];
        for (var i = startIndex; i <= endIndex; i++) {
            if (i === startIndex) {
                model.push({ index: i });
            }
            else {
                model.push({});
            }
        }
        return model;
    };
    /**
     * Before open event handler.
     *
     * @param {BeforeOpenCloseMenuEventArgs} args - Specify the args.
     * @returns {void} - Before open event handler.
     */
    ContextMenu.prototype.beforeOpenHandler = function (args) {
        var trgt = args.event.target;
        var canOpen;
        var filter = ['e-numericcontainer', 'e-active-cell', 'e-selection', 'e-row', 'e-header-row',
            'e-select-all-cell', 'e-sheet-tabs-items', 'e-spreadsheet-contextmenu'];
        var target;
        var items;
        for (var i = 0, len = filter.length; i < len; i++) {
            if (closest(trgt, '.' + filter[i])) {
                canOpen = true;
                break;
            }
        }
        if (canOpen) {
            target = this.getTarget(trgt);
        }
        else {
            var classesToCheck = ['e-header-cell', 'e-rowhdr-table', 'e-selectall-table', 'e-main-panel'];
            canOpen = classesToCheck.some(function (cls) { return trgt.classList.contains(cls); });
            if (canOpen && (parseInt(trgt.parentElement.style.zIndex, 10) > 1 ||
                parseInt(trgt.parentElement.parentElement.style.zIndex, 10) > 1)) {
                var event_1 = args.event;
                var rowObj = {
                    clientY: event_1.clientY, isImage: false, target: trgt
                };
                var colObj = {
                    clientX: event_1.clientX, isImage: false, target: trgt
                };
                this.parent.notify(getRowIdxFromClientY, rowObj);
                this.parent.notify(getColIdxFromClientX, colObj);
                target = rowObj.size <= 0 ? 'ColumnHeader' : colObj.size <= 0 ? 'RowHeader' : 'Content';
            }
            else {
                canOpen = false;
            }
        }
        if (!canOpen) {
            args.cancel = true;
            return;
        }
        if (args.element.classList.contains('e-contextmenu')) {
            var sheet = this.parent.getActiveSheet();
            if (args.event.target && (trgt.classList.contains('e-rowresize') || trgt.classList.contains('e-colresize'))) {
                var range = getRangeIndexes(sheet.selectedRange);
                if (!(trgt.classList.contains('e-rowresize') ? range[1] === 0 && range[3] === sheet.colCount - 1 :
                    range[0] === 0 && range[2] === sheet.rowCount - 1)) {
                    args.cancel = true;
                    return;
                }
                if (trgt.classList.contains('e-rowresize') ? this.parent.hiddenCount(range[0], range[2]) !== Math.abs(range[2] - range[0]) +
                    1 : this.parent.hiddenCount(range[1], range[3], 'columns') !== Math.abs(range[3] - range[1]) + 1) {
                    items = this.getDataSource(target);
                }
                else {
                    items = this.getDataSource(target, trgt);
                }
            }
            else {
                if (target === 'Content') {
                    var range = getRangeIndexes(sheet.selectedRange);
                    var rowSelect = range[1] === 0 && range[3] === sheet.colCount - 1;
                    var colSelect = range[0] === 0 && range[2] === sheet.rowCount - 1;
                    target = rowSelect && colSelect ? 'SelectAll' : (rowSelect ? 'RowHeader' : (colSelect ? 'ColumnHeader' : 'Content'));
                }
                items = this.getDataSource(target, target === 'Footer' ? trgt : undefined);
            }
            this.contextMenuInstance.items = items;
            this.contextMenuInstance.dataBind();
        }
        else {
            items = args.items;
        }
        if (this.parent.selectionSettings.mode === 'None') {
            if (target === 'Content') {
                this.parent.enableContextMenuItems(['Filter'], false, false);
            }
        }
        if (target === 'ColumnHeader' || target === 'RowHeader') {
            if (args.element && args.element.childElementCount > 0) {
                var insertEle = target === 'ColumnHeader' ? args.element.querySelector('#' + this.parent.element.id + '_cmenu_insert_column') :
                    args.element.querySelector('#' + this.parent.element.id + '_cmenu_insert_row');
                var deleteEle = target ===
                    'ColumnHeader' ? args.element.querySelector('#' + this.parent.element.id + '_cmenu_delete_column') :
                    args.element.querySelector('#' + this.parent.element.id + '_cmenu_delete_row');
                if (this.parent.allowInsert && insertEle.classList.contains('e-disabled')) {
                    insertEle.classList.remove('e-disabled');
                }
                else if ((!this.parent.allowInsert || !!this.parent.element.querySelector('.e-selectall.e-highlight')) &&
                    !insertEle.classList.contains('e-disabled')) {
                    insertEle.classList.add('e-disabled');
                }
                if (this.parent.allowDelete && deleteEle.classList.contains('e-disabled')) {
                    deleteEle.classList.remove('e-disabled');
                }
                else if (!this.parent.allowDelete && !deleteEle.classList.contains('e-disabled')) {
                    deleteEle.classList.add('e-disabled');
                }
                if (this.parent.selectionSettings.mode === 'None') {
                    if (target === 'ColumnHeader') {
                        this.parent.enableContextMenuItems(['Insert Column', 'Delete Column', 'Hide Column'], false, false);
                    }
                    if (target === 'RowHeader') {
                        this.parent.enableContextMenuItems(['Insert Row', 'Delete Row', 'Hide Row'], false, false);
                    }
                }
            }
        }
        else if (target === 'Footer') {
            var sheetIdx = getSheetIndex(this.parent, trgt.textContent);
            if (sheetIdx === 0) {
                args.element.querySelector('#' + this.parent.element.id + '_cmenu_move_left').classList.add('e-disabled');
            }
            if (sheetIdx === this.parent.sheets.length - 1) {
                args.element.querySelector('#' + this.parent.element.id + '_cmenu_move_right').classList.add('e-disabled');
            }
            if (this.parent.selectionSettings.mode === 'None') {
                this.parent.enableContextMenuItems(['Insert'], false, false);
            }
        }
        this.parent.trigger('contextMenuBeforeOpen', args);
        this.parent.notify(cMenuBeforeOpen, extend(args, { target: target, items: items }));
    };
    /**
     * To get target area based on right click.
     *
     * @param {Element} target - Specify the target
     * @returns {string} - To get target area based on right click.
     */
    ContextMenu.prototype.getTarget = function (target) {
        if (closest(target, '.e-sheet-content')) {
            return 'Content';
        }
        else if (closest(target, '.e-column-header')) {
            return target.classList.contains('e-header-cell') ? 'ColumnHeader' : 'Content';
        }
        else if (closest(target, '.e-row-header')) {
            return target.classList.contains('e-header-cell') ? 'RowHeader' : 'Content';
        }
        else if (closest(target, '.e-sheet-tabs-items')) {
            return 'Footer';
        }
        else if (closest(target, '.e-selectall-container')) {
            if (target.classList.contains('e-header-cell')) {
                return closest(target, '.e-header-row') ? 'ColumnHeader' : 'RowHeader';
            }
            return closest(target, '.e-select-all-cell') ? 'SelectAll' : 'Content';
        }
        else {
            return '';
        }
    };
    /**
     * To populate context menu items based on target area.
     *
     * @param {string} target - Specify the target
     * @param {Element} targetEle - Specify the target element
     * @returns {MenuItemModel[]} - To populate context menu items based on target area.
     */
    ContextMenu.prototype.getDataSource = function (target, targetEle) {
        var l10n = this.parent.serviceLocator.getService(locale);
        var items = [];
        var id = this.parent.element.id + '_cmenu';
        if (target === 'Content') {
            this.setClipboardData(items, l10n, id);
            items.push({ separator: true });
            //push filter and sort items here
            this.setFilterItems(items, id);
            this.setSortItems(items, id);
            items.push({ separator: true });
            if (this.parent.enableNotes) {
                this.setNotesMenu(items, id);
                items.push({ separator: true });
            }
            this.setHyperLink(items, id);
        }
        else if (target === 'RowHeader') {
            this.setClipboardData(items, l10n, id);
            var sheet = this.parent.getActiveSheet();
            var indexes = getRangeIndexes(sheet.selectedRange);
            this.setInsertDeleteItems(items, l10n, 'Row', id, [indexes[0], indexes[2]], ['Above', 'Below']);
            if (!targetEle || targetEle.classList.contains('e-rowresize') || !targetEle.parentElement ||
                !targetEle.parentElement.classList.value.includes('e-hide')) {
                this.setHideShowItems(items, l10n, 'Row', id, [indexes[0], indexes[2]]);
            }
        }
        else if (target === 'ColumnHeader') {
            this.setClipboardData(items, l10n, id);
            var sheet = this.parent.getActiveSheet();
            var indexes = getRangeIndexes(sheet.selectedRange);
            this.setInsertDeleteItems(items, l10n, 'Column', id, [indexes[1], indexes[3]], ['Before', 'After']);
            if (!targetEle || !targetEle.classList.value.includes('e-hide')) {
                this.setHideShowItems(items, l10n, 'Column', id, [indexes[1], indexes[3]]);
            }
        }
        else if (target === 'SelectAll') {
            this.setClipboardData(items, l10n, id);
            this.setFilterItems(items, id);
            this.setSortItems(items, id);
        }
        else if (target === 'Footer') {
            items.push({
                text: l10n.getConstant('Insert'), id: id + '_insert_sheet'
            });
            items.push({
                text: l10n.getConstant('Delete'), iconCss: 'e-icons e-delete', id: id + '_delete_sheet'
            });
            items.push({
                text: l10n.getConstant('DuplicateSheet'), id: id + '_duplicate'
            });
            items.push({
                text: l10n.getConstant('Rename'), id: id + '_rename'
            });
            items.push({
                text: l10n.getConstant('Hide'), id: id + '_hide_sheet'
            });
            this.setProtectSheetItems(items, id, targetEle);
            items.push({
                text: l10n.getConstant('MoveRight'), id: id + '_move_right'
            });
            items.push({
                text: l10n.getConstant('MoveLeft'), id: id + '_move_left'
            });
        }
        return items;
    };
    ContextMenu.prototype.setProtectSheetItems = function (items, id, targetEle) {
        var l10n = this.parent.serviceLocator.getService(locale);
        if (getSheet(this.parent, getSheetIndex(this.parent, targetEle.textContent)).isProtected) {
            items.push({
                text: l10n.getConstant('UnprotectSheet'), id: id + '_protect', iconCss: 'e-icons e-protect-icon'
            });
        }
        else {
            items.push({
                text: l10n.getConstant('ProtectSheet'), id: id + '_protect', iconCss: 'e-icons e-protect-icon'
            });
        }
    };
    /**
     * Sets sorting related items to the context menu.
     *
     * @param {MenuItemModel[]} items - Specifies the item
     * @param {string} id - Specify the id.
     * @returns {void} - Sets sorting related items to the context menu.
     */
    ContextMenu.prototype.setFilterItems = function (items, id) {
        if (this.parent.allowFiltering) {
            var l10n = this.parent.serviceLocator.getService(locale);
            var args = { clearFilterText: null, isFiltered: false };
            this.parent.notify(getFilteredColumn, args);
            items.push({
                text: l10n.getConstant('Filter'), id: id + '_filter',
                iconCss: '',
                items: [
                    { text: args.clearFilterText, iconCss: 'e-icons e-filter-clear', id: id + '_clearfilter' },
                    { text: l10n.getConstant('ReapplyFilter'), iconCss: 'e-icons e-filter-reapply', id: id + '_reapplyfilter' },
                    { separator: true },
                    { text: l10n.getConstant('FilterCellValue'), iconCss: '', id: id + '_filtercellvalue' }
                ]
            });
        }
    };
    /**
     * Sets sorting related items to the context menu.
     *
     * @param {MenuItemModel[]} items - Specifies the item
     * @param {string} id - Specify the id.
     * @returns {void} - Sets sorting related items to the context menu.
     */
    ContextMenu.prototype.setSortItems = function (items, id) {
        var l10n = this.parent.serviceLocator.getService(locale);
        if (this.parent.allowSorting) {
            items.push({
                text: l10n.getConstant('Sort'), id: id + '_sort',
                iconCss: 'e-icons e-sort-icon',
                items: [
                    { text: l10n.getConstant('SortAscending'), iconCss: 'e-icons e-sort-asc', id: id + '_ascending' },
                    { text: l10n.getConstant('SortDescending'), iconCss: 'e-icons e-sort-desc', id: id + '_descending' },
                    { text: l10n.getConstant('CustomSort') + '...', iconCss: 'e-icons e-sort-custom', id: id + '_customsort' }
                ]
            });
        }
    };
    ContextMenu.prototype.setHyperLink = function (items, id) {
        if (this.parent.allowHyperlink) {
            var l10n = this.parent.serviceLocator.getService(locale);
            var sheet = this.parent.getActiveSheet();
            var indexes = getCellIndexes(sheet.activeCell);
            var td = this.parent.getCell(indexes[0], indexes[1]);
            if (isNullOrUndefined(td)) {
                items.push({
                    text: l10n.getConstant('Hyperlink'), iconCss: 'e-icons e-hyperlink-icon', id: id + '_hyperlink'
                });
            }
            else if (!td.getElementsByClassName('e-hyperlink')[0] &&
                !td.classList.contains('e-hyperlink')) {
                items.push({
                    text: l10n.getConstant('Hyperlink'), iconCss: 'e-icons e-hyperlink-icon', id: id + '_hyperlink'
                });
            }
            else {
                items.push({ text: l10n.getConstant('EditHyperlink'), iconCss: 'e-icons e-edithyperlink-icon', id: id + '_editHyperlink' }, { text: l10n.getConstant('OpenHyperlink'), iconCss: 'e-icons e-openhyperlink-icon', id: id + '_openHyperlink' }, { text: l10n.getConstant('RemoveHyperlink'), iconCss: 'e-icons e-removehyperlink-icon', id: id + '_removeHyperlink' });
            }
        }
    };
    ContextMenu.prototype.setNotesMenu = function (items, id) {
        if (this.parent.enableNotes) {
            var l10n = this.parent.serviceLocator.getService(locale);
            var cellIndexes = getCellIndexes(this.parent.getActiveSheet().activeCell);
            var targetElement = this.parent.getCell(cellIndexes[0], cellIndexes[1]);
            if (!isNullOrUndefined(targetElement) && targetElement.children.length > 0 && targetElement.children[(targetElement.children.length - 1)].className.indexOf('addNoteIndicator') > -1) {
                items.push({ text: l10n.getConstant('EditNote'), iconCss: 'e-icons e-edit-notes', id: id + '_editNote' }, { text: l10n.getConstant('DeleteNote'), iconCss: 'e-icons e-delete-notes', id: id + '_deleteNote' });
            }
            else {
                items.push({
                    text: l10n.getConstant('AddNote'), iconCss: 'e-icons e-add-notes', id: id + '_addNote'
                });
            }
        }
    };
    ContextMenu.prototype.setClipboardData = function (items, l10n, id) {
        if (this.parent.enableClipboard) {
            items.push({
                text: l10n.getConstant('Cut'),
                iconCss: 'e-icons e-cut-icon', id: id + '_cut'
            });
            items.push({
                text: l10n.getConstant('Copy'),
                iconCss: 'e-icons e-copy-icon', id: id + '_copy'
            });
            items.push({
                text: l10n.getConstant('Paste'),
                iconCss: 'e-icons e-paste-icon', id: id + '_paste'
            });
            items.push({
                text: l10n.getConstant('PasteSpecial'), id: id + '_pastespecial',
                items: [
                    { text: l10n.getConstant('Values'), id: id + '_pastevalues' },
                    { text: l10n.getConstant('Formats'), id: id + '_pasteformats' }
                ]
            });
        }
    };
    ContextMenu.prototype.setInsertDeleteItems = function (items, l10n, layout, id, indexes, subItems) {
        items.push({ separator: true });
        ['Insert', 'Delete'].forEach(function (action) {
            if (indexes[0] === indexes[1]) {
                items.push({ text: l10n.getConstant("" + action + layout), id: id + ("_" + action.toLowerCase() + "_" + layout.toLowerCase()) });
            }
            else {
                items.push({ text: l10n.getConstant("" + action + layout + "s"), id: id + ("_" + action.toLowerCase() + "_" + layout.toLowerCase()) });
            }
            if (action === 'Insert') {
                items[items.length - 1].items = [];
                subItems.forEach(function (item) {
                    items[items.length - 1].items.push({
                        text: l10n.getConstant(item), id: items[items.length - 1].id + "_" + item.toLowerCase()
                    });
                });
            }
        });
    };
    ContextMenu.prototype.setHideShowItems = function (items, l10n, layout, id, indexes) {
        if (indexes[0] === indexes[1]) {
            items.push({ text: l10n.getConstant("Hide" + layout), id: id + ("_hide_" + layout.toLowerCase()) });
        }
        else {
            var StartIdx = indexes[0];
            indexes[0] = indexes[0] > indexes[1] ? indexes[1] : indexes[0];
            indexes[1] = indexes[1] > StartIdx ? indexes[1] : StartIdx;
            items.push({ text: l10n.getConstant("Hide" + layout + "s"), id: id + ("_hide_" + layout.toLowerCase()) });
        }
        if (this.parent.hiddenCount(indexes[0], indexes[1], layout.toLowerCase() + "s")) {
            items.push({ text: l10n.getConstant("Unhide" + layout + "s"), id: id + ("_unhide_" + layout.toLowerCase()) });
        }
    };
    /**
     * To add event listener.
     *
     * @returns {void} - To add event listener.
     */
    ContextMenu.prototype.addEventListener = function () {
        this.parent.on(addContextMenuItems, this.addItemsHandler, this);
        this.parent.on(removeContextMenuItems, this.removeItemsHandler, this);
        this.parent.on(enableContextMenuItems, this.enableItemsHandler, this);
    };
    /**
     * To add context menu items before / after particular item.
     *
     * @param {InsertArgs} args - Specify the add item handler
     * @returns {void} - To add context menu items before / after particular item.
     */
    ContextMenu.prototype.addItemsHandler = function (args) {
        if (args.insertAfter) {
            this.contextMenuInstance.insertAfter(args.items, args.text, args.isUniqueId);
        }
        else {
            this.contextMenuInstance.insertBefore(args.items, args.text, args.isUniqueId);
        }
    };
    /**
     * To remove context menu items.
     *
     * @param {RemoveArgs} args - Specifies the args
     * @returns {void} - To remove context menu items.
     */
    ContextMenu.prototype.removeItemsHandler = function (args) {
        this.contextMenuInstance.removeItems(args.items, args.isUniqueId);
    };
    /**
     * To enable / disable context menu items.
     *
     * @param {EnableDisableArgs} args - Specifies the args
     * @returns {void} - To enable / disable context menu items.
     */
    ContextMenu.prototype.enableItemsHandler = function (args) {
        this.contextMenuInstance.enableItems(args.items, args.enable, args.isUniqueId);
    };
    /**
     * To remove event listener.
     *
     * @returns {void} - To remove event listener.
     */
    ContextMenu.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(addContextMenuItems, this.addItemsHandler);
            this.parent.off(removeContextMenuItems, this.removeItemsHandler);
            this.parent.off(enableContextMenuItems, this.enableItemsHandler);
        }
    };
    /**
     * To get module name.
     *
     * @returns {string} - To get module name.
     */
    ContextMenu.prototype.getModuleName = function () {
        return 'contextMenu';
    };
    /**
     * Destroy method.
     *
     * @returns {void} - Destroy method.
     */
    ContextMenu.prototype.destroy = function () {
        this.removeEventListener();
        this.contextMenuInstance.destroy();
        var ele = document.getElementById(this.parent.element.id + '_contextmenu');
        if (ele) {
            detach(ele);
        }
        this.contextMenuInstance = null;
        this.parent = null;
    };
    return ContextMenu;
}());
export { ContextMenu };
