import { Draggable, isNullOrUndefined } from '@syncfusion/ej2-base';
import { removeClass } from '@syncfusion/ej2-base';
import { remove, closest as closestElement, classList, extend } from '@syncfusion/ej2-base';
import { parentsUntil, removeElement, getPosition, addRemoveActiveClasses, isActionPrevent } from '../base/util';
import { resetRowIndex, resetCachedRowIndex, groupReorderRowObject } from '../base/util';
import * as events from '../base/constant';
import { Scroll } from '../actions/scroll';
import { DataManager } from '@syncfusion/ej2-data';
import * as literals from '../base/string-literals';
// eslint-disable-next-line valid-jsdoc, jsdoc/require-param, jsdoc/require-returns
/**
 *
 * Reorder module is used to handle row reordering.
 *
 * @hidden
 */
var RowDD = /** @class */ (function () {
    /**
     * Constructor for the Grid print module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @hidden
     */
    function RowDD(parent) {
        var _this = this;
        this.selectedRows = [];
        this.isOverflowBorder = true;
        this.selectedRowColls = [];
        this.isRefresh = true;
        this.isReplaceDragEle = true;
        this.istargetGrid = false;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.helper = function (e) {
            var gObj = _this.parent;
            var target = _this.draggable.currentStateTarget;
            if (!isNullOrUndefined(target) && gObj.rowDropSettings.targetID && !isNullOrUndefined(target.classList) && !target.classList.contains('e-rowcell')) {
                target = parentsUntil(target, 'e-rowcell');
            }
            var visualElement = _this.parent.createElement('div', {
                className: 'e-cloneproperties e-draganddrop e-grid e-dragclone'
            });
            visualElement.style.height = 'auto';
            var table = _this.parent.createElement('table', { attrs: { role: 'grid' } });
            var tbody = _this.parent.createElement(literals.tbody, { attrs: { role: 'rowgroup' } });
            if (document.getElementsByClassName('e-griddragarea').length ||
                (gObj.rowDropSettings.targetID && ((!isNullOrUndefined(target) && !target.classList.contains('e-selectionbackground')
                    && gObj.selectionSettings.type !== 'Single') || !parentsUntil(target, 'e-rowcell'))) ||
                (!gObj.rowDropSettings.targetID && !parentsUntil(target, 'e-rowdragdrop'))) {
                return false;
            }
            if (gObj.rowDropSettings.targetID &&
                gObj.selectionSettings.mode === 'Row' && gObj.selectionSettings.type === 'Single') {
                gObj.selectRow(parseInt(_this.draggable.currentStateTarget.parentElement
                    .getAttribute(literals.ariaRowIndex), 10) - 1);
            }
            _this.startedRow = closestElement(target, 'tr').cloneNode(true);
            if (_this.parent.isFrozenGrid()) {
                var nodes = [].slice.call(_this.startedRow.querySelectorAll('.e-rowcell'));
                for (var i = 0; i < nodes.length; i++) {
                    removeClass([nodes[parseInt(i.toString(), 10)]], ['e-leftfreeze', 'e-freezeleftborder', 'e-fixedfreeze', 'e-freezerightborder', 'e-rightfreeze', 'e-unfreeze']);
                    nodes[parseInt(i.toString(), 10)].removeAttribute('style');
                }
            }
            _this.processArgs(target);
            var args = {
                selectedRow: _this.rows, dragelement: target,
                cloneElement: visualElement, cancel: false, data: _this.rowData
            };
            var selectedRows = gObj.getSelectedRows();
            gObj.trigger(events.rowDragStartHelper, args);
            var cancel = 'cancel';
            if (args["" + cancel]) {
                return false;
            }
            removeElement(_this.startedRow, '.e-indentcell');
            removeElement(_this.startedRow, '.e-detailrowcollapse');
            removeElement(_this.startedRow, '.e-detailrowexpand');
            if (!(gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache)) {
                _this.removeCell(_this.startedRow, literals.gridChkBox);
            }
            var activeCells = _this.startedRow.querySelectorAll('.e-active');
            activeCells.forEach(function (cell) { return cell.classList.remove('e-active'); });
            tbody.appendChild(_this.startedRow);
            if (gObj.getSelectedRowIndexes().length > 1 && _this.startedRow.hasAttribute('aria-selected')) {
                var dropCountEle = _this.parent.createElement('span', {
                    className: 'e-dropitemscount', innerHTML: '' + selectedRows.length
                });
                visualElement.appendChild(dropCountEle);
            }
            var ele = closestElement(target, 'tr').querySelector('.e-icon-rowdragicon');
            if (ele) {
                ele.classList.add('e-dragstartrow');
            }
            table.appendChild(tbody);
            visualElement.appendChild(table);
            gObj.element.appendChild(visualElement);
            return visualElement;
        };
        this.dragStart = function (e) {
            var gObj = _this.parent;
            if ((gObj.enableVirtualization || gObj.infiniteScrollSettings.enableCache) && gObj.allowGrouping &&
                gObj.groupSettings.columns.length && !isNullOrUndefined(e.target.closest('tr'))) {
                var dragTrs = e.dragElement.querySelectorAll('tr');
                var indentCells = e.target.closest('tr').querySelectorAll('.e-indentcell');
                for (var i = 0; i < dragTrs.length; i++) {
                    for (var j = 0; j < indentCells.length; j++) {
                        var cloneIndentCell = indentCells[parseInt(j.toString(), 10)].cloneNode(true);
                        dragTrs[parseInt(i.toString(), 10)].insertBefore(cloneIndentCell, dragTrs[parseInt(i.toString(), 10)].firstElementChild);
                    }
                }
            }
            if (gObj.element.classList.contains('e-childgrid')) {
                var parentGrid = _this.getParentGrid(gObj.element);
                parentGrid.appendChild(e.dragElement);
                gObj.element.appendChild(gObj.createElement('div', { className: 'e-drag-ref' }));
            }
            document.body.classList.add('e-prevent-select');
            if (document.getElementsByClassName('e-griddragarea').length) {
                return;
            }
            var target = e.target;
            var spanCssEle = _this.parent.element.querySelector('.e-dropitemscount');
            if (_this.parent.getSelectedRecords().length > 1 && spanCssEle) {
                spanCssEle.style.left = _this.parent.element.querySelector('.e-cloneproperties table')
                    .offsetWidth - 5 + 'px';
            }
            _this.processArgs(target);
            gObj.trigger(events.rowDragStart, {
                rows: _this.rows, target: e.target,
                draggableType: 'rows', fromIndex: parseInt(_this.rows[0].getAttribute(literals.ariaRowIndex), 10) - 1,
                data: (_this.rowData[0] && Object.keys(_this.rowData[0]).length > 0) ? _this.rowData : _this.currentViewData()
            });
            _this.dragStartData = _this.rowData;
            var dropElem = document.getElementById(gObj.rowDropSettings.targetID);
            if (gObj.rowDropSettings.targetID && dropElem && dropElem.ej2_instances &&
                dropElem.ej2_instances[0].getModuleName() === 'grid') {
                dropElem.ej2_instances[0].getContent().classList.add('e-allowRowDrop');
            }
        };
        this.drag = function (e) {
            var gObj = _this.parent;
            _this.isDropGrid = _this.parent;
            _this.istargetGrid = false;
            if (_this.parent.rowDropSettings.targetID) {
                var dropElement = document.getElementById(gObj.rowDropSettings.targetID);
                _this.isDropGrid = dropElement.ej2_instances[0];
                if (parentsUntil(e.target, 'e-grid')) {
                    _this.istargetGrid = _this.parent.rowDropSettings.targetID === parentsUntil(e.target, 'e-grid').id;
                }
            }
            var cloneElement = _this.parent.element.querySelector('.e-cloneproperties');
            if (gObj.element.classList.contains('e-childgrid')) {
                var parentGrid = _this.getParentGrid(gObj.element);
                cloneElement = parentGrid.querySelector('.e-cloneproperties');
            }
            var target = _this.getElementFromPosition(cloneElement, e.event);
            classList(cloneElement, ['e-defaultcur'], ['e-notallowedcur', 'e-movecur', 'e-grabcur']);
            _this.isOverflowBorder = true;
            _this.hoverState = gObj.enableHover;
            var trElement = parentsUntil(target, 'e-grid') ? closestElement(e.target, 'tr') : null;
            if (!e.target) {
                return;
            }
            _this.processArgs(target);
            if (gObj.enableVirtualization && isNullOrUndefined(_this.rows[0])) {
                classList(cloneElement, ['e-notallowedcur'], ['e-movecur']);
            }
            var args = {
                rows: _this.rows, target: target, draggableType: 'rows',
                data: _this.rowData, originalEvent: e, cancel: false
            };
            gObj.trigger(events.rowDrag, args);
            _this.stopTimer();
            if (args.cancel) {
                return;
            }
            gObj.element.classList.add('e-rowdrag');
            if (trElement && (parentsUntil(target, 'e-grid').id === cloneElement.parentElement.id || parentsUntil(target, 'e-grid').id)) {
                if (_this.isDropGrid.element.querySelector('.e-emptyrow')) {
                    _this.dragTarget = 0;
                }
                else {
                    _this.dragTarget = parseInt(trElement.getAttribute('aria-rowindex'), 10) - 1;
                }
            }
            else {
                _this.dragTarget = parseInt(_this.startedRow.getAttribute('aria-rowindex'), 10) - 1;
            }
            if (gObj.rowDropSettings.targetID) {
                var dragParentElement = document.querySelector('.e-drag-ref');
                if (!parentsUntil(target, 'e-grid') || (dragParentElement
                    && parentsUntil(dragParentElement.parentElement, 'e-grid').id === parentsUntil(target, 'e-grid').id) ||
                    parentsUntil(cloneElement.parentElement, 'e-grid').id === parentsUntil(target, 'e-grid').id) {
                    classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
                }
                else {
                    classList(cloneElement, ['e-grabcur'], ['e-notallowedcur']);
                }
            }
            else {
                var element = parentsUntil(target, 'e-grid');
                if (element && element.id === cloneElement.parentElement.id && parentsUntil(target, 'e-row') &&
                    !parentsUntil(target, 'e-addedrow')) {
                    classList(cloneElement, ['e-movecur'], ['e-defaultcur']);
                }
                else {
                    classList(cloneElement, ['e-notallowedcur'], ['e-movecur']);
                }
            }
            if (parentsUntil(_this.isDropGrid.element, 'e-grid')) {
                if ((!_this.isDropGrid.groupSettings.columns.length || _this.isDropGrid.groupSettings.columns.length)
                    && !_this.isDropGrid.element.querySelector('.e-emptyrow')) {
                    if (parentsUntil(target, 'e-grid') && parentsUntil(target, 'e-grid').id === _this.isDropGrid.element.id) {
                        _this.updateScrollPostion(e.event);
                    }
                    if (((_this.isOverflowBorder || _this.parent.frozenRows > _this.dragTarget) &&
                        (parseInt(_this.startedRow.getAttribute(literals.ariaRowIndex), 10) - 1 !== _this.dragTarget || _this.istargetGrid))
                        || (_this.istargetGrid && trElement && _this.isDropGrid.getRowByIndex(_this.isDropGrid.getCurrentViewRecords().length - 1).
                            getAttribute('data-uid') === trElement.getAttribute('data-uid'))) {
                        _this.moveDragRows(e, _this.startedRow, trElement);
                    }
                    else {
                        var islastRowIndex = void 0;
                        if (_this.parent.enableVirtualization) {
                            islastRowIndex = trElement && parseInt(trElement.getAttribute(literals.ariaRowIndex), 10) - 1 ===
                                _this.parent.renderModule.data.dataManager.dataSource.json.length - 1;
                        }
                        else {
                            var rowIndex = _this.parent.enableInfiniteScrolling && _this.parent.infiniteScrollSettings.enableCache &&
                                !_this.parent.groupSettings.enableLazyLoading ?
                                _this.parent.pageSettings.currentPage * _this.parent.pageSettings.pageSize - 1 :
                                _this.parent.getCurrentViewRecords().length - 1;
                            var lastRow = _this.parent.getRowByIndex(rowIndex);
                            islastRowIndex = trElement && lastRow && lastRow.getAttribute('data-uid') === trElement.getAttribute('data-uid') &&
                                lastRow.getAttribute('data-uid') !== _this.startedRow.getAttribute('data-uid');
                            if (_this.isNewRowAdded() && _this.parent.editSettings.newRowPosition === 'Bottom') {
                                islastRowIndex = false;
                            }
                        }
                        if (islastRowIndex && !_this.parent.rowDropSettings.targetID) {
                            var bottomborder = _this.parent.createElement('div', { className: 'e-lastrow-dragborder' });
                            var gridcontentEle = _this.parent.getContent();
                            bottomborder.style.width = _this.parent.element.offsetWidth - _this.getScrollWidth() + 'px';
                            if (_this.parent.enableVirtualization) {
                                bottomborder.style.zIndex = '1';
                            }
                            if (!gridcontentEle.getElementsByClassName('e-lastrow-dragborder').length &&
                                (!(gObj.allowGrouping && gObj.groupSettings.columns.length) || isNullOrUndefined(trElement.nextSibling))) {
                                gridcontentEle.classList.add('e-grid-relative');
                                gridcontentEle.appendChild(bottomborder);
                                bottomborder.style.bottom = _this.getScrollWidth() + 'px';
                            }
                        }
                        _this.removeBorder(trElement);
                    }
                }
                if (target && target.classList.contains(literals.content)
                    && !_this.isDropGrid.element.querySelector('.e-emptyrow') && _this.istargetGrid) {
                    _this.removeBorder(trElement);
                    var rowIndex = _this.isDropGrid.getCurrentViewRecords().length - 1;
                    var selector = '.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse';
                    var groupSelector = '.e-rowcell:not(.e-hide),.e-rowdragdrop:not(.e-hide),.e-detailrowcollapse:not(.e-hide)';
                    var rowElement = [];
                    if (_this.parent.allowGrouping && _this.parent.groupSettings.columns && _this.parent.groupSettings.columns.length) {
                        rowElement = [].slice.call(_this.isDropGrid.getRowByIndex(rowIndex).querySelectorAll(groupSelector));
                    }
                    else {
                        rowElement = [].slice.call(_this.isDropGrid.getRowByIndex(rowIndex).querySelectorAll(selector));
                    }
                    if (rowElement.length > 0) {
                        if (_this.parent.allowGrouping && _this.parent.groupSettings.columns && _this.parent.groupSettings.columns.length) {
                            _this.groupRowDDIndicator(rowElement, true);
                        }
                        else {
                            addRemoveActiveClasses(rowElement, true, 'e-dragborder');
                        }
                    }
                }
            }
        };
        this.dragStop = function (e) {
            if (_this.parent.isCheckBoxSelection && _this.parent.enableInfiniteScrolling) {
                window.getSelection().removeAllRanges();
            }
            document.body.classList.remove('e-prevent-select');
            if (isActionPrevent(_this.parent)) {
                _this.parent.notify(events.preventBatch, {
                    instance: _this, handler: _this.processDragStop, arg1: e
                });
            }
            else {
                _this.processDragStop(e);
            }
        };
        this.processDragStop = function (e) {
            var gObj = _this.parent;
            if (_this.parent.isDestroyed) {
                return;
            }
            var targetEle = _this.getElementFromPosition(e.helper, e.event);
            var target = targetEle && !targetEle.classList.contains('e-dlg-overlay') ?
                targetEle : e.target;
            gObj.element.classList.remove('e-rowdrag');
            var dropElement = document.getElementById(gObj.rowDropSettings.targetID);
            if (gObj.rowDropSettings.targetID && dropElement && dropElement.ej2_instances &&
                dropElement.ej2_instances[0].getModuleName() === 'grid') {
                dropElement.ej2_instances[0].getContent().classList.remove('e-allowRowDrop');
            }
            if (parentsUntil(_this.isDropGrid.element, 'e-grid')) {
                _this.stopTimer();
                _this.isDropGrid.enableHover = _this.hoverState;
                _this.isDropGrid.getContent().classList.remove('e-grid-relative');
                _this.removeBorder(targetEle);
                var stRow = _this.isDropGrid.element.querySelector('.e-dragstartrow');
                if (stRow) {
                    stRow.classList.remove('e-dragstartrow');
                }
            }
            _this.processArgs(target);
            if (gObj.enableVirtualization && isNullOrUndefined(_this.rows[0])) {
                return;
            }
            var args = {
                target: target, draggableType: 'rows',
                cancel: false,
                fromIndex: parseInt(_this.rows[0].getAttribute(literals.ariaRowIndex), 10) - 1,
                dropIndex: _this.dragTarget, rows: _this.rows,
                data: (Object.keys(_this.dragStartData[0]).length > 0) ? _this.dragStartData : _this.currentViewData()
            };
            gObj.trigger(events.rowDrop, args, function () {
                if (!(parentsUntil(target, literals.row) || parentsUntil(target, 'e-emptyrow')
                    || parentsUntil(target, literals.gridContent)) || args.cancel) {
                    _this.dragTarget = null;
                    remove(e.helper);
                    return;
                }
                _this.isRefresh = false;
                var selectedIndexes = _this.parent.getSelectedRowIndexes();
                if (gObj.isRowDragable()) {
                    if (!_this.parent.rowDropSettings.targetID &&
                        _this.startedRow.querySelector('td.e-selectionbackground') && selectedIndexes.length > 1 &&
                        selectedIndexes.length !== _this.parent.getCurrentViewRecords().length) {
                        _this.reorderRows(selectedIndexes, args.dropIndex);
                    }
                    else {
                        _this.reorderRows([parseInt(_this.startedRow.getAttribute(literals.ariaRowIndex), 10) - 1], _this.dragTarget);
                    }
                    _this.dragTarget = null;
                    if (!gObj.rowDropSettings.targetID) {
                        if (e.helper.classList.contains('e-cloneproperties') && document.querySelector('.' + e.helper.classList[0])) {
                            remove(e.helper);
                        }
                        if (gObj.enableVirtualization && !gObj.sortSettings.columns.length && !gObj.filterSettings.columns.length &&
                            (!_this.parent.allowGrouping || !gObj.groupSettings.columns.length)) {
                            gObj.refresh();
                        }
                        else {
                            _this.rowOrder(args);
                        }
                    }
                    if (_this.parent.getContentTable().scrollHeight < _this.parent.getContent().clientHeight) {
                        _this.parent.scrollModule.setLastRowCell();
                    }
                }
                _this.isRefresh = true;
            });
        };
        this.removeCell = function (targetRow, className) {
            return [].slice.call(targetRow.querySelectorAll('td')).filter(function (cell) {
                if (cell.classList.contains(className)) {
                    targetRow.deleteCell(cell.cellIndex);
                }
            });
        };
        this.parent = parent;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initialEnd, this.initializeDrag, this);
        this.parent.on(events.columnDrop, this.columnDrop, this);
        this.parent.on(events.rowDragAndDropComplete, this.onActionComplete, this);
        this.onDataBoundFn = this.onDataBound.bind(this);
        this.parent.addEventListener(events.dataBound, this.onDataBoundFn);
        this.parent.on(events.uiUpdate, this.enableAfterRender, this);
        this.parent.on(events.destroy, this.destroy, this);
    }
    RowDD.prototype.getParentGrid = function (childGrid) {
        var parentGrid = childGrid;
        var parentGridObtained = false;
        while (!parentGridObtained) {
            if (parentGrid.ej2_instances[0].parentDetails) {
                parentGrid = document.getElementById(parentGrid.ej2_instances[0].parentDetails.parentID);
            }
            if (!parentGrid.classList.contains('e-childgrid')) {
                parentGridObtained = true;
            }
        }
        return parentGrid;
    };
    RowDD.prototype.isNewRowAdded = function () {
        return this.parent.editSettings && this.parent.editSettings.showAddNewRow &&
            !(this.parent.enableInfiniteScrolling || this.parent.enableVirtualization);
    };
    RowDD.prototype.groupRowDDIndicator = function (rowElement, isAdd) {
        addRemoveActiveClasses([rowElement[0]], isAdd, 'e-dragleft');
        addRemoveActiveClasses(rowElement, isAdd, 'e-dragtop', 'e-dragbottom');
        addRemoveActiveClasses([rowElement[rowElement.length - 1]], isAdd, 'e-dragright');
    };
    RowDD.prototype.refreshRow = function (args, tbody, target) {
        var gObj = this.parent;
        var tbodyContent = gObj.getContentTable().querySelector(literals.tbody);
        var tbodyHeader = gObj.getHeaderTable().querySelector(literals.tbody);
        for (var i = 0, len = args.rows.length; i < len; i++) {
            var row = args.rows[parseInt(i.toString(), 10)];
            if (((gObj.enableVirtualization && gObj.allowGrouping && gObj.groupSettings.columns.length) ||
                (gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache)) &&
                args.rows.length === 1) {
                var removeElem = gObj.getRowElementByUID(row.getAttribute('data-uid'));
                if (!isNullOrUndefined(removeElem)) {
                    remove(removeElem);
                }
            }
            var dragstartrow = row.querySelector('.e-dragstartrow');
            if (dragstartrow) {
                dragstartrow.classList.remove('e-dragstartrow');
            }
            tbody.insertBefore(row, target);
            if (gObj.allowGrouping && gObj.groupSettings.columns.length) {
                var dragRowUid = row.getAttribute('data-uid');
                var dropRowUid = args.target.parentElement.getAttribute('data-uid');
                var dragRowObject = gObj.getRowObjectFromUID(dragRowUid);
                var dropRowObject = gObj.getRowObjectFromUID(dropRowUid);
                if (dragRowObject.parentUid !== dropRowObject.parentUid) {
                    gObj['groupModule'].groupReorderHandler(dragRowObject, dropRowObject);
                }
            }
        }
        var tr = [].slice.call(gObj.editSettings.showAddNewRow ?
            tbody.querySelectorAll('.e-row:not(.e-addedrow)') : tbody.getElementsByClassName(literals.row));
        if (gObj.allowGrouping && gObj.groupSettings.columns.length) {
            if (gObj.groupSettings.enableLazyLoading || (gObj.enableInfiniteScrolling &&
                gObj.infiniteScrollSettings.enableCache && tr.length > gObj.pageSettings.pageSize * 3)) {
                gObj.refresh();
            }
            else {
                groupReorderRowObject(this.parent, args, tr);
                if (gObj.enableVirtualization || (gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache)) {
                    resetCachedRowIndex(gObj);
                }
                else {
                    resetRowIndex(this.parent, gObj.getRowsObject().filter(function (data) { return data.isDataRow; }), tr);
                }
                this.parent.notify(events.refreshExpandandCollapse, {
                    rows: gObj.enableVirtualization ? this.parent.vRows : this.parent.getRowsObject()
                });
            }
        }
        else if (gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache &&
            !gObj.groupSettings.columns.length) {
            if (tr.length > gObj.pageSettings.pageSize * 3) {
                gObj.refresh();
            }
            else {
                groupReorderRowObject(this.parent, args, tr);
                resetCachedRowIndex(gObj);
            }
        }
        else {
            this.refreshData(tr);
        }
        if (this.parent.frozenRows) {
            for (var i = 0, len = tr.length; i < len; i++) {
                if (i < this.parent.frozenRows) {
                    tbodyHeader.appendChild(tr[parseInt(i.toString(), 10)]);
                }
                else {
                    tbodyContent.appendChild(tr[parseInt(i.toString(), 10)]);
                }
            }
        }
    };
    RowDD.prototype.updateFrozenRowreOrder = function (args) {
        var gObj = this.parent;
        var tbodyC = gObj.getContentTable().querySelector(literals.tbody);
        var tbodyH = gObj.getHeaderTable().querySelector(literals.tbody);
        var tr = [].slice.call(tbodyH.getElementsByClassName(literals.row)).concat([].slice.call(tbodyC.getElementsByClassName(literals.row)));
        var tbody = gObj.createElement(literals.tbody, { attrs: { role: 'rowgroup' } });
        if (!gObj.selectionSettings.persistSelection && Object.keys(gObj.selectionModule.selectedRowState).length === 0) {
            this.parent.clearSelection();
        }
        else {
            this.parent.clearRowSelection();
        }
        var targetRow = this.refreshRowTarget(args);
        for (var i = 0, len = tr.length; i < len; i++) {
            tbody.appendChild(tr[parseInt(i.toString(), 10)]);
        }
        this.refreshRow(args, tbody, targetRow);
    };
    RowDD.prototype.refreshRowTarget = function (args) {
        var gObj = this.parent;
        var targetIdx = parseInt(args.target.parentElement.getAttribute(literals.ariaRowIndex), 10) - 1;
        if (gObj.enableVirtualization && gObj.allowGrouping && gObj.groupSettings.columns.length) {
            targetIdx = this.parent.getDataRows().indexOf(args.target.parentElement);
        }
        if ((args.fromIndex < args.dropIndex || args.fromIndex === args.dropIndex) && (!gObj.allowGrouping ||
            !gObj.groupSettings.columns.length)) {
            targetIdx = targetIdx + 1;
        }
        var targetTR = gObj.getRowByIndex(targetIdx);
        if (targetIdx === gObj.getRows().length && this.isNewRowAdded() && this.parent.editSettings.newRowPosition === 'Bottom') {
            targetTR = this.parent.element.querySelector('.e-row.e-addedrow');
        }
        var tr = gObj.allowGrouping && gObj.groupSettings.columns.length && targetIdx !== -1 &&
            args.fromIndex < args.dropIndex && targetTR ? targetTR.nextSibling : targetTR;
        return tr;
    };
    RowDD.prototype.updateFrozenColumnreOrder = function (args) {
        var gObj = this.parent;
        var tbody = gObj.getContentTable().querySelector(literals.tbody);
        if (!gObj.selectionSettings.persistSelection && Object.keys(gObj.selectionModule.selectedRowState).length === 0) {
            this.parent.clearSelection();
        }
        else {
            this.parent.clearRowSelection();
        }
        var targetRow = this.refreshRowTarget(args);
        this.refreshRow(args, tbody, targetRow);
    };
    RowDD.prototype.refreshData = function (tr) {
        var rowObj = {};
        var recordobj = {};
        var rowObjects = this.parent.getRowsObject();
        var currentViewData = this.parent.getCurrentViewRecords();
        for (var i = 0, len = tr.length; i < len; i++) {
            var index = parseInt(tr[parseInt(i.toString(), 10)].getAttribute(literals.ariaRowIndex), 10) - 1;
            rowObj[parseInt(i.toString(), 10)] = rowObjects[parseInt(index.toString(), 10)];
            recordobj[parseInt(i.toString(), 10)] = currentViewData[parseInt(index.toString(), 10)];
        }
        var rows = this.parent.getRows();
        for (var i = 0, len = tr.length; i < len; i++) {
            rows[parseInt(i.toString(), 10)] = tr[parseInt(i.toString(), 10)];
            rowObjects[parseInt(i.toString(), 10)] = rowObj[parseInt(i.toString(), 10)];
            currentViewData[parseInt(i.toString(), 10)] = recordobj[parseInt(i.toString(), 10)];
        }
        resetRowIndex(this.parent, rowObjects, tr);
    };
    RowDD.prototype.rowOrder = function (args) {
        if (args.dropIndex === args.fromIndex || isNaN(args.dropIndex) || parentsUntil(args.target, 'e-groupcaption')) {
            return;
        }
        if (this.parent.isDetail()) {
            this.parent.detailCollapseAll();
            var rows = [].slice.call(this.parent.getContentTable().querySelector(literals.tbody).children);
            var rowObjects = this.parent.getRowsObject();
            rows.filter(function (row) {
                if (row.classList.contains('e-detailrow')) {
                    row.remove();
                }
            });
            for (var i = 0, len = rowObjects.length; i < len; i++) {
                if (!rowObjects[parseInt(i.toString(), 10)]) {
                    break;
                }
                if (rowObjects[parseInt(i.toString(), 10)].isDetailRow) {
                    this.parent.getRowsObject().splice(i, 1);
                    i--;
                }
            }
        }
        if (args.target.classList.contains('e-rowcelldrag') || args.target.classList.contains('e-dtdiagonalright')
            || args.target.classList.contains('e-dtdiagonaldown')) {
            args.target = args.target.parentElement;
        }
        if (!args.target.classList.contains('e-rowcell') && parentsUntil(args.target, 'e-rowcell')) {
            args.target = parentsUntil(args.target, 'e-rowcell');
        }
        if (this.parent.frozenRows) {
            this.updateFrozenRowreOrder(args);
        }
        else {
            this.updateFrozenColumnreOrder(args);
        }
        if ((!this.parent.allowGrouping || !this.parent.groupSettings.columns.length) && this.selectedRowColls.length > 0) {
            this.parent.selectRows(this.selectedRowColls);
            var indexes = [];
            if (this.parent.filterSettings.columns.length || this.parent.sortSettings.columns.length) {
                for (var i = 0, len = args.rows.length; i < len; i++) {
                    indexes.push(parseInt(args.rows[parseInt(i.toString(), 10)].getAttribute(literals.ariaRowIndex), 10) - 1);
                }
                this.selectedRowColls = indexes;
            }
            this.selectedRowColls = [];
        }
        else {
            this.selectedRowColls = [];
        }
    };
    RowDD.prototype.currentViewData = function () {
        var selectedIndexes = this.parent.getSelectedRowIndexes();
        var currentVdata = [];
        var fromIdx = parseInt(this.startedRow.getAttribute(literals.ariaRowIndex), 10) - 1;
        for (var i = 0, n = selectedIndexes.length; i < n; i++) {
            var currentV = 'currentViewData';
            currentVdata[parseInt(i.toString(), 10)] = this.parent["" + currentV][selectedIndexes[parseInt(i.toString(), 10)]];
        }
        if (!this.parent.rowDropSettings.targetID && selectedIndexes.length === 0) {
            currentVdata[0] = this.parent.currentViewData[parseInt(fromIdx.toString(), 10)];
        }
        return currentVdata;
    };
    // private saveChange(changeRecords: object, query: Query): void {
    //     this.parent.getDataModule().saveChanges(changeRecords, this.parent.getPrimaryKeyFieldNames()[0], {}, query)
    //         .then(() => {
    //             this.parent.notify(events.modelChanged, {
    //                 type: events.actionBegin, requestType: 'rowdraganddrop'
    //             });
    //         }).catch((e: Error) => {
    //             const error: string = 'error';
    //             const message: string = 'message';
    //             if (!isNullOrUndefined(e[`${error}`]) && !isNullOrUndefined(e[`${error}`][`${message}`])) {
    //                 e[`${error}`] = e[`${error}`][`${message}`];
    //             }
    //             this.parent.trigger(events.actionFailure, e);
    //         });
    // }
    RowDD.prototype.reorderRows = function (fromIndexes, toIndex) {
        var selectedIndexes = this.parent.getSelectedRowIndexes();
        var selectedRecords = [];
        var draggedRecords = [];
        var currentViewData = this.parent.getDataModule().isRemote() ? this.parent.getCurrentViewRecords() :
            this.parent.renderModule.data.dataManager.dataSource.json;
        var skip = this.parent.allowPaging ?
            (this.parent.pageSettings.currentPage * this.parent.pageSettings.pageSize) - this.parent.pageSettings.pageSize : 0;
        var dropIdx = toIndex + skip;
        var actualIdx = fromIndexes[0] + skip;
        for (var i = 0, len = fromIndexes.length; i < len; i++) {
            draggedRecords[parseInt(i.toString(), 10)] = currentViewData[fromIndexes[parseInt(i.toString(), 10)] + skip];
        }
        for (var i = 0, len = selectedIndexes.length; i < len; i++) {
            selectedRecords[parseInt(i.toString(), 10)] = currentViewData[selectedIndexes[parseInt(i.toString(), 10)] + skip];
        }
        for (var i = 0, len = draggedRecords.length; i < len; i++) {
            if (i !== 0) {
                for (var j = 0, len1 = currentViewData.length; j < len1; j++) {
                    if (JSON.stringify(currentViewData[parseInt(j.toString(), 10)]) ===
                        JSON.stringify(draggedRecords[parseInt(i.toString(), 10)])) {
                        actualIdx = j;
                        break;
                    }
                }
                for (var j = 0, len1 = currentViewData.length; j < len1; j++) {
                    if (JSON.stringify(currentViewData[parseInt(j.toString(), 10)]) === JSON
                        .stringify(draggedRecords[i - 1])) {
                        if (actualIdx > j) {
                            dropIdx = j + 1;
                        }
                        break;
                    }
                }
            }
            this.reorderRow(actualIdx - skip, dropIdx - skip);
        }
        if (this.isRefresh) {
            this.parent.notify(events.modelChanged, {
                type: events.actionBegin, requestType: 'rowdraganddrop'
            });
        }
        for (var i = 0, len = selectedRecords.length; i < len; i++) {
            for (var j = 0, len1 = currentViewData.length; j < len1; j++) {
                if (JSON.stringify(currentViewData[parseInt(j.toString(), 10)]) === JSON
                    .stringify(selectedRecords[parseInt(i.toString(), 10)])) {
                    selectedIndexes[parseInt(i.toString(), 10)] = j - skip;
                    break;
                }
            }
        }
        this.selectedRowColls = selectedIndexes;
    };
    RowDD.prototype.stopTimer = function () {
        window.clearInterval(this.timer);
    };
    /**
     * To trigger action complete event.
     *
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    RowDD.prototype.onActionComplete = function (e) {
        this.parent.trigger(events.actionComplete, extend(e, { type: events.actionComplete, requestType: 'rowdraganddrop' }));
    };
    RowDD.prototype.initializeDrag = function () {
        var gObj = this.parent;
        this.draggable = new Draggable(gObj.element, {
            dragTarget: '.e-rowcelldrag, .e-rowdragdrop, .e-rowcell',
            distance: 5,
            helper: this.helper,
            dragStart: this.dragStart,
            drag: this.drag,
            dragStop: this.dragStop,
            isReplaceDragEle: this.isReplaceDragEle,
            isPreventSelect: false,
            isPreventScroll: true
        });
    };
    RowDD.prototype.updateScrollPostion = function (e) {
        var _this = this;
        var y = getPosition(e).y;
        var cliRect = this.isDropGrid.getContent().getBoundingClientRect();
        var rowHeight = this.isDropGrid.getRowHeight() - 15;
        var scrollElem = this.isDropGrid.getContent().firstElementChild;
        var virtualScrollbtm = this.parent.enableVirtualization ? 20 : 0;
        if (cliRect.top >= y) {
            var scrollPixel_1 = -(this.isDropGrid.getRowHeight());
            this.isOverflowBorder = false;
            this.timer = window.setInterval(function () { _this.setScrollDown(scrollElem, scrollPixel_1); }, 200);
        }
        else if (cliRect.top + this.isDropGrid.getContent().clientHeight - rowHeight - 33 - virtualScrollbtm <= y) {
            var scrollPixel_2 = (this.isDropGrid.getRowHeight());
            this.isOverflowBorder = false;
            this.timer = window.setInterval(function () { _this.setScrollDown(scrollElem, scrollPixel_2); }, 200);
        }
    };
    RowDD.prototype.setScrollDown = function (scrollElem, scrollPixel) {
        scrollElem.scrollTop = scrollElem.scrollTop + scrollPixel;
    };
    RowDD.prototype.moveDragRows = function (e, startedRow, targetRow) {
        var cloneElement = this.parent.element.querySelector('.e-cloneproperties');
        if (this.parent.element.classList.contains('e-childgrid')) {
            var parentGrid = this.getParentGrid(this.parent.element);
            cloneElement = parentGrid.querySelector('.e-cloneproperties');
        }
        var element = closestElement(e.target, 'tr');
        if (parentsUntil(element, 'e-grid') &&
            ((!this.parent.rowDropSettings.targetID &&
                parentsUntil(cloneElement.parentElement, 'e-grid').id === parentsUntil(element, 'e-grid').id) || this.istargetGrid)) {
            var targetElement = element;
            if (!element) {
                targetElement = startedRow;
            }
            this.setBorder(targetElement, e.event, startedRow, targetRow);
        }
    };
    RowDD.prototype.setBorder = function (element, event, startedRow, targetRow) {
        var node = this.parent.element;
        if (this.istargetGrid) {
            node = this.isDropGrid.element;
        }
        var cloneElement = this.parent.element.querySelector('.e-cloneproperties');
        if (this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
            this.removeBorder(element);
        }
        else {
            this.removeFirstRowBorder(element);
            this.removeLastRowBorder(element);
        }
        if (parentsUntil(element, 'e-grid') && element.classList.contains(literals.row) && ((!this.parent.rowDropSettings.targetID &&
            parentsUntil(cloneElement.parentElement, 'e-grid').id === parentsUntil(element, 'e-grid').id) || this.istargetGrid)) {
            if (this.parent.allowGrouping && this.parent.groupSettings.columns && this.parent.groupSettings.columns.length) {
                removeClass(node.querySelectorAll('.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse'), ['e-dragtop', 'e-dragright',
                    'e-dragbottom', 'e-dragleft']);
            }
            else {
                removeClass(node.querySelectorAll('.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse'), ['e-dragborder']);
            }
            var rowElement = [];
            var targetRowIndex = parseInt(targetRow.getAttribute(literals.ariaRowIndex), 10) - 1;
            if (targetRow && targetRowIndex === 0 &&
                !(this.isNewRowAdded() && this.parent.editSettings.newRowPosition === 'Top')) {
                if (this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
                    element = targetRow;
                    rowElement = [].slice.call(element
                        .querySelectorAll('.e-groupcaption,.e-summarycell,.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse'));
                }
                else {
                    var div = this.parent.createElement('div', { className: 'e-firstrow-dragborder' });
                    var gridheaderEle = this.isDropGrid.getHeaderContent();
                    gridheaderEle.classList.add('e-grid-relative');
                    div.style.width = node.offsetWidth - this.getScrollWidth() + 'px';
                    if (!gridheaderEle.getElementsByClassName('e-firstrow-dragborder').length) {
                        if (this.parent.frozenRows) {
                            if (this.parent.isFrozenGrid()) {
                                div.style.width = this.parent.getContent().firstElementChild.scrollWidth + 'px';
                            }
                            gridheaderEle.querySelector('thead').appendChild(div);
                            div.style.position = 'relative';
                        }
                        else {
                            gridheaderEle.appendChild(div);
                        }
                    }
                }
            }
            else if (this.parent.rowDropSettings.targetID && targetRow) {
                element = this.isDropGrid.getRowByIndex(targetRowIndex - 1);
                rowElement = [].slice.call(element.querySelectorAll('.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse'));
            }
            else if (targetRow && parseInt(startedRow.getAttribute(literals.ariaRowIndex), 10) - 1 > targetRowIndex) {
                if (this.parent.enableVirtualization && this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
                    targetRowIndex = this.parent.getDataRows().indexOf(targetRow);
                }
                if (this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
                    element = targetRow;
                    rowElement = [].slice.call(element
                        .querySelectorAll(".e-groupcaption,.e-summarycell,.e-rowcell:not(.e-hide),.e-rowdragdrop:not(.e-hide),\n                        .e-detailrowcollapse:not(.e-hide)"));
                }
                else {
                    if (targetRowIndex === 0 && this.isNewRowAdded() && this.parent.editSettings.newRowPosition === 'Top') {
                        element = this.parent.element.querySelector('.e-row.e-addedrow tr');
                    }
                    else {
                        element = this.parent.getRowByIndex(targetRowIndex - 1);
                    }
                    rowElement = [].slice.call(element.querySelectorAll('.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse,.e-dragindentcell'));
                }
            }
            else {
                rowElement = [].slice.call(element.querySelectorAll('.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse'));
            }
            if (rowElement.length > 0) {
                if (this.parent.allowGrouping && this.parent.groupSettings.columns && this.parent.groupSettings.columns.length) {
                    this.groupRowDDIndicator(rowElement, true);
                }
                else {
                    addRemoveActiveClasses(rowElement, true, 'e-dragborder');
                }
            }
        }
    };
    RowDD.prototype.getScrollWidth = function () {
        var scrollElem = this.parent.getContent().firstElementChild;
        return scrollElem.scrollWidth > scrollElem.offsetWidth ? Scroll.getScrollBarWidth() : 0;
    };
    RowDD.prototype.removeFirstRowBorder = function (element) {
        if (this.isDropGrid.element.getElementsByClassName('e-firstrow-dragborder').length > 0 && element &&
            (element.rowIndex !== 0 || element.classList.contains('e-columnheader'))) {
            remove(this.isDropGrid.element.getElementsByClassName('e-firstrow-dragborder')[0]);
        }
        else {
            var addNewRow = this.parent.element.querySelector('.e-row.e-addedrow tr');
            if (addNewRow && addNewRow.querySelector('.e-dragborder')) {
                var rowElement = [].slice.call(addNewRow.
                    querySelectorAll('.e-rowcell,.e-rowdragdrop,.e-detailrowcollapse,.e-dragindentcell'));
                addRemoveActiveClasses(rowElement, false, 'e-dragborder');
            }
        }
    };
    RowDD.prototype.removeLastRowBorder = function (element) {
        var islastRowIndex;
        if (this.parent.enableVirtualization) {
            islastRowIndex = element && parseInt(element.getAttribute(literals.ariaRowIndex), 10) - 1 !==
                this.parent.renderModule.data.dataManager.dataSource.json.length - 1;
        }
        else {
            var rowIndex = this.parent.enableInfiniteScrolling && this.parent.infiniteScrollSettings.enableCache &&
                !this.parent.groupSettings.enableLazyLoading ?
                this.parent.pageSettings.currentPage * this.parent.pageSettings.pageSize - 1 :
                this.parent.getCurrentViewRecords().length - 1;
            var lastRow = this.parent.getRowByIndex(rowIndex);
            islastRowIndex = element && lastRow && lastRow.getAttribute('data-uid') !== element.getAttribute('data-uid');
        }
        if (this.parent.element.getElementsByClassName('e-lastrow-dragborder').length > 0 && element && islastRowIndex) {
            remove(this.parent.element.getElementsByClassName('e-lastrow-dragborder')[0]);
        }
    };
    RowDD.prototype.removeBorder = function (element) {
        this.removeFirstRowBorder(element);
        if (!this.parent.rowDropSettings.targetID) {
            this.removeLastRowBorder(element);
        }
        if (this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
            element = ([].slice.call(this.isDropGrid.getContentTable().querySelectorAll('tr'))).filter(function (row) {
                return row.querySelector('td.e-dragtop.e-dragbottom');
            })[0];
        }
        else {
            element = (this.isDropGrid.getRows()).filter(function (row) { return row.querySelector('td.e-dragborder'); })[0];
        }
        if (element) {
            var rowElement = this.parent.allowGrouping && this.parent.groupSettings.columns.length ? [].slice.call(element
                .querySelectorAll('.e-dragtop.e-dragbottom')) : [].slice.call(element.getElementsByClassName('e-dragborder'));
            if (this.parent.allowGrouping && this.parent.groupSettings.columns && this.parent.groupSettings.columns.length) {
                this.groupRowDDIndicator(rowElement, false);
            }
            else {
                addRemoveActiveClasses(rowElement, false, 'e-dragborder');
            }
        }
    };
    RowDD.prototype.getElementFromPosition = function (element, event) {
        var position = getPosition(event);
        element.style.display = 'none';
        var target = document.elementFromPoint(position.x, position.y);
        element.style.display = '';
        return target;
    };
    RowDD.prototype.onDataBound = function () {
        if (this.selectedRowColls.length > 0 && (this.parent.enableVirtualization || this.parent.allowRowDragAndDrop)) {
            this.parent.selectRows(this.selectedRowColls);
            this.selectedRowColls = [];
        }
    };
    RowDD.prototype.getTargetIdx = function (targetRow) {
        return targetRow ? parseInt(targetRow.getAttribute(literals.ariaRowIndex), 10) - 1 : 0;
    };
    RowDD.prototype.singleRowDrop = function (e) {
        var targetRow = closestElement(e.target, 'tr');
        var srcControl = e.droppedElement.parentElement.ej2_instances[0];
        var currentIndex = targetRow ? targetRow.rowIndex : srcControl.currentViewData.length - 1;
        this.reorderRow(this.startedRowIndex, currentIndex);
    };
    RowDD.prototype.columnDrop = function (e) {
        var gObj = this.parent;
        if (e.droppedElement.getAttribute('action') !== 'grouping' &&
            (parentsUntil(e.target, literals.row) || parentsUntil(e.target, 'e-emptyrow') || parentsUntil(e.target, literals.gridContent))) {
            var targetRow = closestElement(e.target, 'tr');
            var srcControl = void 0;
            var currentIndex = void 0;
            var dragParentElement = document.querySelector('.e-drag-ref');
            if ((e.droppedElement.querySelector('tr').getAttribute('single-dragrow') !== 'true' &&
                (e.droppedElement.parentElement.id === gObj.element.id || (dragParentElement
                    && dragParentElement.parentElement.id === gObj.element.id)))
                || (e.droppedElement.querySelector('tr').getAttribute('single-dragrow') === 'true' &&
                    e.droppedElement.parentElement.id !== gObj.element.id)) {
                return;
            }
            if (e.droppedElement.parentElement.id !== gObj.element.id) {
                if (dragParentElement) {
                    srcControl = dragParentElement.parentElement.ej2_instances[0];
                    remove(dragParentElement);
                }
                else {
                    srcControl = e.droppedElement.parentElement.ej2_instances[0];
                }
            }
            else if (this.isSingleRowDragDrop || e.droppedElement.querySelector('tr').getAttribute('single-dragrow') === 'true') {
                this.singleRowDrop(e);
                return;
            }
            if (srcControl.element.id !== gObj.element.id && srcControl.rowDropSettings.targetID !== gObj.element.id) {
                return;
            }
            var records = srcControl.getSelectedRecords();
            var targetIndex = currentIndex = this.getTargetIdx(targetRow);
            if (e.target && e.target.classList.contains('e-content') && gObj.getCurrentViewRecords().length) {
                var lastrow = gObj.getContentTable().querySelector('tr:last-child');
                if (lastrow) {
                    targetIndex = currentIndex = parseInt(lastrow.getAttribute(literals.ariaRowIndex), 10);
                }
            }
            if (isNaN(targetIndex)) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                targetIndex = currentIndex = 0;
            }
            if (gObj.allowPaging) {
                targetIndex = targetIndex + (gObj.pageSettings.currentPage * gObj.pageSettings.pageSize) - gObj.pageSettings.pageSize;
            }
            //Todo: drag and drop mapper & BatchChanges
            gObj.notify(events.rowsAdded, { toIndex: targetIndex, records: records });
            gObj.notify(events.modelChanged, {
                type: events.actionBegin, requestType: 'rowdraganddrop'
            });
            var selectedRows = srcControl.getSelectedRowIndexes();
            var skip = srcControl.allowPaging ?
                (srcControl.pageSettings.currentPage * srcControl.pageSettings.pageSize) - srcControl.pageSettings.pageSize : 0;
            this.selectedRows = [];
            for (var i = 0, len = records.length; i < len; i++) {
                this.selectedRows.push(skip + selectedRows[parseInt(i.toString(), 10)]);
            }
            srcControl.notify(events.rowsRemoved, { indexes: this.selectedRows, records: records });
            if (srcControl.dataSource instanceof DataManager && srcControl.dataSource.dataSource.offline) {
                srcControl.notify(events.modelChanged, {
                    type: events.actionBegin, requestType: 'rowdraganddrop'
                });
            }
        }
    };
    RowDD.prototype.reorderRow = function (fromIndexes, toIndex) {
        var gObj = this.parent;
        if (!gObj.groupSettings.columns.length) {
            //Todo: drag and drop mapper & BatchChanges
            var skip = gObj.allowPaging ?
                (gObj.pageSettings.currentPage * gObj.pageSettings.pageSize) - gObj.pageSettings.pageSize : 0;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            var fromIndex = fromIndexes;
            toIndex = toIndex + skip;
            this.selectedRows = gObj.getSelectedRowIndexes();
            gObj.notify(events.rowPositionChanged, {
                fromIndex: fromIndexes + skip,
                toIndex: toIndex
            });
        }
    };
    RowDD.prototype.enableAfterRender = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            this.initializeDrag();
        }
    };
    /**
     * To destroy the print
     *
     * @returns {void}
     * @hidden
     */
    RowDD.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (this.parent.isDestroyed || !gridElement || (!gridElement.querySelector('.' + literals.gridHeader) &&
            !gridElement.querySelector('.' + literals.gridContent))) {
            return;
        }
        this.draggable.destroy();
        this.parent.off(events.initialEnd, this.initializeDrag);
        this.parent.off(events.columnDrop, this.columnDrop);
        this.parent.off(events.rowDragAndDropComplete, this.onActionComplete);
        this.parent.removeEventListener(events.dataBound, this.onDataBoundFn);
        this.parent.off(events.uiUpdate, this.enableAfterRender);
        this.parent.off(events.destroy, this.destroy);
        //destory ejdrag and drop
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    RowDD.prototype.getModuleName = function () {
        return 'rowDragAndDrop';
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RowDD.prototype.processArgs = function (target) {
        var gObj = this.parent;
        var dragIdx = parseInt(this.startedRow.getAttribute(literals.ariaRowIndex), 10) - 1;
        if ((gObj.getSelectedRecords().length > 0 && this.startedRow.cells[0].classList.contains('e-selectionbackground') === false)
            || gObj.getSelectedRecords().length === 0) {
            if (gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache) {
                this.rows = [this.startedRow];
            }
            else {
                this.rows = [gObj.getRowByIndex(dragIdx)];
            }
            this.rowData = [gObj.getRowInfo((this.startedRow).querySelector('.' + literals.rowCell)).rowData];
            if ((gObj.enableVirtualization || (gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache))
                && gObj.allowGrouping && gObj.groupSettings.columns.length && gObj.getSelectedRows().length) {
                this.rows = gObj.getSelectedRows();
                this.rowData = Array.from(this.rows, function (row) { return gObj.getRowObjectFromUID(row.getAttribute('data-uid')).data; });
            }
        }
        else {
            this.rows = gObj.getSelectedRows();
            this.rowData = Array.from(this.rows, function (row) { return gObj.getRowObjectFromUID(row.getAttribute('data-uid')).data; });
        }
    };
    return RowDD;
}());
export { RowDD };
