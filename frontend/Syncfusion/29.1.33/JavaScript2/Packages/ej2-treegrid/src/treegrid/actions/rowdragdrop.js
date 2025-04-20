import { Grid, RowDD as GridDragDrop, parentsUntil } from '@syncfusion/ej2-grids';
import { getObject, Scroll } from '@syncfusion/ej2-grids';
import { closest, isNullOrUndefined, setValue, extend, getValue, removeClass, addClass, setStyleAttribute } from '@syncfusion/ej2-base';
import { DataManager } from '@syncfusion/ej2-data';
import * as events from '../base/constant';
import { editAction } from './crud-actions';
import { getParentData, findChildrenRecords, isRemoteData, isOffline, isCountRequired } from '../utils';
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
        Grid.Inject(GridDragDrop);
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
        this.parent.on(events.rowdraging, this.Rowdraging, this);
        this.parent.on(events.rowDropped, this.rowDropped, this);
        this.parent.on(events.rowsAdd, this.rowsAdded, this);
        this.parent.on(events.rowsRemove, this.rowsRemoved, this);
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
        this.parent.trigger(events.actionBegin, actionArgs, function (actionArgs) {
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
                                childData[parseInt(j.toString(), 10)].taskData = extend({}, childData[parseInt(j.toString(), 10)]);
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
                tObj.trigger(events.rowDrop, args);
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
                tObj.trigger(events.rowDrop, args);
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
            tObj.notify(events.rowsRemove, { indexes: indexes, records: records });
            srcControl.notify(events.rowsAdd, { toIndex: targetIndex, records: records });
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
            var parentItem = extend({}, droppedRecord);
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
        this.parent.off(events.rowdraging, this.Rowdraging);
        this.parent.off(events.rowDropped, this.rowDropped);
        this.parent.off(events.rowsAdd, this.rowsAdded);
        this.parent.off(events.rowsRemove, this.rowsRemoved);
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
export { RowDD };
