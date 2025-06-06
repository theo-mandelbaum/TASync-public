import { Grid, Edit as GridEdit, getUid, getObject, resetRowIndex } from '@syncfusion/ej2-grids';
import { parentsUntil } from '@syncfusion/ej2-grids';
import * as events from '../base/constant';
import { isNullOrUndefined, extend, setValue, removeClass, addClass, getValue } from '@syncfusion/ej2-base';
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { findChildrenRecords, getParentData, isCountRequired, isRemoteData } from '../utils';
import { editAction, updateParentRow } from './crud-actions';
import { BatchEdit } from './batch-edit';
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
        Grid.Inject(GridEdit);
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
        this.parent.on(events.crudAction, this.crudAction, this);
        this.parent.on(events.beginEdit, this.beginEdit, this);
        this.parent.on(events.beginAdd, this.beginAdd, this);
        this.parent.on(events.recordDoubleClick, this.recordDoubleClick, this);
        this.parent.on(events.cellSave, this.cellSave, this);
        this.parent.on(events.batchCancel, this.batchCancel, this);
        this.parent.grid.on(events.keyPressed, this.keyPressed, this);
        this.parent.grid.on('batchedit-form', this.lastCellTab, this);
        this.parent.grid.on('content-ready', this.contentready, this);
        this.parent.on(events.cellEdit, this.cellEdit, this);
        this.parent.on('actionBegin', this.editActionEvents, this);
        this.parent.on('actionComplete', this.editActionEvents, this);
        this.parent.grid.on(events.doubleTap, this.recordDoubleClick, this);
        this.parent.grid.on('dblclick', this.gridDblClick, this);
        this.parent.grid.on('recordAdded', this.customCellSave, this);
        this.parent.on('savePreviousRowPosition', this.savePreviousRowPosition, this);
        // this.parent.on(events.beforeDataBound, this.beforeDataBound, this);
        this.parent.grid.on(events.beforeStartEdit, this.beforeStartEdit, this);
        this.parent.grid.on(events.beforeBatchCancel, this.beforeBatchCancel, this);
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
            this.parent.trigger(events.actionBegin, args);
        }
    };
    Edit.prototype.beforeBatchCancel = function (args) {
        if (this.parent.editSettings.mode === 'Cell') {
            args['requestType'] = 'cancel';
            this.parent.trigger(events.actionComplete, args);
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
        this.parent.off(events.crudAction, this.crudAction);
        this.parent.off(events.beginEdit, this.beginEdit);
        this.parent.off(events.beginAdd, this.beginAdd);
        this.parent.off(events.recordDoubleClick, this.recordDoubleClick);
        this.parent.off(events.batchCancel, this.batchCancel);
        this.parent.grid.off(events.keyPressed, this.keyPressed);
        this.parent.grid.off('batchedit-form', this.lastCellTab);
        this.parent.grid.off('content-ready', this.contentready);
        this.parent.off(events.cellEdit, this.cellEdit);
        this.parent.off('actionBegin', this.editActionEvents);
        this.parent.off('actionComplete', this.editActionEvents);
        this.parent.grid.off('recordAdded', this.customCellSave);
        this.parent.grid.off(events.doubleTap, this.recordDoubleClick);
        this.parent.off('savePreviousRowPosition', this.savePreviousRowPosition);
        this.parent.grid.off(events.beforeStartEdit, this.beforeStartEdit);
        this.parent.grid.off(events.beforeBatchCancel, this.beforeBatchCancel);
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
            this.parent.trigger(events.cellEdit, args, function (celleditArgs) {
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
            extend(arg, args);
            arg.cancel = false;
            arg.type = 'save';
            row_1 = this.parent.grid.getRows()[row_1.rowIndex];
            this.parent.trigger(events.actionBegin, arg);
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
        this.parent.trigger(events.actionComplete, saveArgs);
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
            value.taskData = isNullOrUndefined(value.taskData) ? extend({}, args.data) : value.taskData;
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
                        value.parentItem = extend({}, currentData[this.addRowIndex]);
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
                        value.parentItem = extend({}, parentItem);
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
            this.parent.notify(events.batchSave, { updatedRecords: updatedRecords, index: index });
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
export { Edit };
