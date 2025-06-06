import { isNullOrUndefined, extend, setValue, getValue } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { DataManager } from '@syncfusion/ej2-data';
import { findChildrenRecords, getParentData, extendArray } from '../utils';
import { getUid } from '@syncfusion/ej2-grids';
import { updateParentRow, editAction } from './crud-actions';
import { classList } from '@syncfusion/ej2-base';
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
        this.parent.on(events.cellSaved, this.cellSaved, this);
        this.parent.on(events.batchAdd, this.batchAdd, this);
        this.parent.on(events.beforeBatchAdd, this.beforeBatchAdd, this);
        this.parent.on(events.batchSave, this.batchSave, this);
        this.parent.on(events.beforeBatchDelete, this.beforeBatchDelete, this);
        this.parent.on(events.beforeBatchSave, this.beforeBatchSave, this);
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
        this.parent.off(events.cellSaved, this.cellSaved);
        this.parent.off(events.batchAdd, this.batchAdd);
        this.parent.off(events.batchSave, this.batchSave);
        this.parent.off(events.beforeBatchAdd, this.beforeBatchAdd);
        this.parent.off(events.beforeBatchDelete, this.beforeBatchDelete);
        this.parent.off(events.beforeBatchSave, this.beforeBatchSave);
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
                                added.parentItem = extend({}, this.batchRecords[this.addRowIndex]);
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
                this.parent.notify(events.beginAdd, {});
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
                var taskData = extend({}, addRecords[parseInt(i.toString(), 10)]);
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
export { BatchEdit };
