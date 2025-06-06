var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { isNullOrUndefined, isUndefined, extend, setValue, getValue, deleteObject, createElement } from '@syncfusion/ej2-base';
import { DataManager, Query, ODataAdaptor, WebApiAdaptor, ODataV4Adaptor } from '@syncfusion/ej2-data';
import { getSwapKey, isScheduledTask, getTaskData, isRemoteData, getIndex, isCountRequired, updateDates } from '../base/utils';
import { CellEdit } from './cell-edit';
import { TaskbarEdit } from './taskbar-edit';
import { DialogEdit } from './dialog-edit';
import { Dialog } from '@syncfusion/ej2-popups';
import { MultiSelect, CheckBoxSelection, DropDownList } from '@syncfusion/ej2-dropdowns';
import { ConnectorLineEdit } from './connector-line-edit';
import { TreeGrid, Edit as TreeGridEdit } from '@syncfusion/ej2-treegrid';
/**
 * The Edit Module is used to handle editing actions.
 *
 */
var Edit = /** @class */ (function () {
    function Edit(parent) {
        this.isFromDeleteMethod = false;
        this.targetedRecords = [];
        this.isNewRecordAdded = false;
        this.isValidatedEditedRecord = false;
        this.createArray = true;
        this.deletedRecord = [];
        this.canReset = false;
        /** @hidden */
        this.updateParentRecords = [];
        /** @hidden */
        this.isaddtoBottom = false;
        this.confirmDialog = null;
        this.taskbarMoved = false;
        this.predecessorUpdated = false;
        this.isBreakLoop = false;
        /**
         * @private
         */
        this.deletedTaskDetails = [];
        this.parent = parent;
        this.parent.predecessorModule.validatedChildItems = [];
        if (this.parent.editSettings.allowEditing && this.parent.editSettings.mode === 'Auto') {
            this.cellEditModule = new CellEdit(this.parent);
        }
        if (this.parent.taskFields.dependency) {
            this.parent.connectorLineEditModule = new ConnectorLineEdit(this.parent);
        }
        if (this.parent.editSettings.allowAdding || (this.parent.editSettings.allowEditing &&
            (this.parent.editSettings.mode === 'Dialog' || this.parent.editSettings.mode === 'Auto'))) {
            this.dialogModule = new DialogEdit(this.parent);
        }
        if (this.parent.editSettings.allowTaskbarEditing) {
            this.taskbarEditModule = new TaskbarEdit(this.parent);
        }
        if (this.parent.editSettings.allowDeleting) {
            var confirmDialog = createElement('div', {
                id: this.parent.element.id + '_deleteConfirmDialog'
            });
            this.parent.element.appendChild(confirmDialog);
            this.renderDeleteConfirmDialog();
        }
        this.parent.treeGrid.recordDoubleClick = this.recordDoubleClick.bind(this);
        this.parent.treeGrid.editSettings.allowAdding = this.parent.editSettings.allowAdding;
        this.parent.treeGrid.editSettings.allowDeleting = this.parent.editSettings.allowDeleting;
        this.parent.treeGrid.editSettings.showDeleteConfirmDialog = this.parent.editSettings.showDeleteConfirmDialog;
        this.parent.treeGrid.editSettings.allowNextRowEdit = this.parent.editSettings.allowNextRowEdit;
        if (this.parent.editSettings.mode === 'Dialog') {
            TreeGrid.Inject(TreeGridEdit);
        }
        this.updateDefaultColumnEditors();
    }
    Edit.prototype.getModuleName = function () {
        return 'edit';
    };
    /**
     * Method to update default edit params and editors for Gantt
     *
     * @returns {void} .
     */
    Edit.prototype.updateDefaultColumnEditors = function () {
        var customEditorColumns = [this.parent.taskFields.id, this.parent.taskFields.progress, this.parent.taskFields.resourceInfo,
            this.parent.taskFields.type, 'taskType'];
        for (var i = 0; i < customEditorColumns.length; i++) {
            if (!isNullOrUndefined(customEditorColumns[i]) && customEditorColumns[i].length > 0) {
                var column = this.parent.getColumnByField(customEditorColumns[parseInt(i.toString(), 10)], this.parent.treeGridModule.treeGridColumns);
                if (column) {
                    if (column.field === this.parent.taskFields.id) {
                        this.updateIDColumnEditParams(column);
                    }
                    else if (column.field === this.parent.taskFields.progress && isNullOrUndefined(column.edit)) {
                        this.updateProgessColumnEditParams(column);
                    }
                    else if (column.field === this.parent.taskFields.resourceInfo) {
                        this.updateResourceColumnEditor(column);
                    }
                    else if (column.field === this.parent.taskFields.type || column.field === 'taskType') {
                        this.updateTaskTypeColumnEditor(column);
                    }
                }
            }
        }
    };
    /**
     * Method to update editors for id column in Gantt
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    Edit.prototype.updateIDColumnEditParams = function (column) {
        var editParam = {
            min: 0,
            decimals: 0,
            enableRtl: this.parent.enableRtl,
            validateDecimalOnType: true,
            format: 'n0',
            showSpinButton: false
        };
        this.updateEditParams(column, editParam);
    };
    /**
     * Method to update edit params of default progress column
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    Edit.prototype.updateProgessColumnEditParams = function (column) {
        var editParam = {
            min: 0,
            enableRtl: this.parent.enableRtl,
            decimals: 0,
            validateDecimalOnType: true,
            max: 100,
            format: 'n0'
        };
        this.updateEditParams(column, editParam);
    };
    /**
     * Assign edit params for id and progress columns
     *
     * @param {ColumnModel} column .
     * @param {object} editParam .
     * @returns {void} .
     */
    Edit.prototype.updateEditParams = function (column, editParam) {
        if (isNullOrUndefined(column.edit)) {
            column.edit = {};
            column.edit.params = {};
        }
        else if (isNullOrUndefined(column.edit.params)) {
            column.edit.params = {};
        }
        extend(editParam, column.edit.params);
        column.edit.params = editParam;
        var ganttColumn = this.parent.getColumnByField(column.field, this.parent.ganttColumns);
        ganttColumn.edit = column.edit;
    };
    /**
     * Method to update resource column editor for default resource column
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    Edit.prototype.updateResourceColumnEditor = function (column) {
        this.parent.treeGridModule.currentEditRow = {};
        if (this.parent.editSettings.allowEditing && isNullOrUndefined(column.edit) && this.parent.editSettings.mode === 'Auto') {
            column.editType = 'dropdownedit';
            column.edit = this.getResourceEditor();
            var ganttColumn = this.parent.getColumnByField(column.field, this.parent.ganttColumns);
            ganttColumn.editType = 'dropdownedit';
            ganttColumn.edit = column.edit;
        }
    };
    /**
     * Method to create resource custom editor
     *
     * @returns {IEditCell} .
     */
    Edit.prototype.getResourceEditor = function () {
        var _this = this;
        var resourceSettings = this.parent.resourceFields;
        var editObject = {};
        var editor;
        MultiSelect.Inject(CheckBoxSelection);
        editObject.write = function (args) {
            _this.parent.treeGridModule.currentEditRow = {};
            editor = new MultiSelect({
                dataSource: new DataManager(_this.parent.resources),
                fields: { text: resourceSettings.name, value: resourceSettings.id },
                enableRtl: _this.parent.enableRtl,
                mode: 'CheckBox',
                showDropDownIcon: true,
                popupHeight: '350px',
                delimiterChar: ',',
                value: _this.parent.treeGridModule.getResourceIds(args.rowData)
            });
            editor.appendTo(args.element);
        };
        editObject.read = function (element) {
            var value = element.ej2_instances[0].value;
            var resourcesName = [];
            if (isNullOrUndefined(value)) {
                value = [];
            }
            for (var i = 0; i < value.length; i++) {
                for (var j = 0; j < _this.parent.resources.length; j++) {
                    if (_this.parent.resources[j][resourceSettings.id] === value[i]) {
                        resourcesName.push(_this.parent.resources[j][resourceSettings.name]);
                        break;
                    }
                }
            }
            _this.parent.treeGridModule.currentEditRow[_this.parent.taskFields.resourceInfo] = value;
            return resourcesName.join(',');
        };
        editObject.destroy = function () {
            if (editor) {
                editor.destroy();
            }
        };
        return editObject;
    };
    /**
     * Method to update task type column editor for task type
     *
     * @param {ColumnModel} column .
     * @returns {void} .
     */
    Edit.prototype.updateTaskTypeColumnEditor = function (column) {
        if (this.parent.editSettings.allowEditing && isNullOrUndefined(column.edit) && this.parent.editSettings.mode === 'Auto') {
            column.editType = 'dropdownedit';
            column.edit = this.getTaskTypeEditor();
            var ganttColumn = this.parent.getColumnByField(column.field, this.parent.ganttColumns);
            ganttColumn.editType = 'dropdownedit';
            ganttColumn.edit = column.edit;
        }
    };
    /**
     * Method to create task type custom editor
     *
     * @returns {IEditCell} .
     */
    Edit.prototype.getTaskTypeEditor = function () {
        var _this = this;
        var editObject = {};
        var editor;
        var types = [{ 'ID': 1, 'Value': 'FixedUnit' }, { 'ID': 2, 'Value': 'FixedWork' }, { 'ID': 3, 'Value': 'FixedDuration' }];
        editObject.write = function (args) {
            _this.parent.treeGridModule.currentEditRow = {};
            editor = new DropDownList({
                dataSource: new DataManager(types),
                enableRtl: _this.parent.enableRtl,
                fields: { value: 'Value' },
                popupHeight: '350px',
                value: getValue('taskType', args.rowData.ganttProperties)
            });
            editor.appendTo(args.element);
        };
        editObject.read = function (element) {
            var value = element.ej2_instances[0].value;
            var key = _this.parent.taskFields.type || 'taskType';
            _this.parent.treeGridModule.currentEditRow[key] = value;
            return value;
        };
        editObject.destroy = function () {
            if (editor) {
                editor.destroy();
            }
        };
        return editObject;
    };
    /**
     * @returns {void} .
     * @private
     */
    Edit.prototype.reUpdateEditModules = function () {
        var editSettings = this.parent.editSettings;
        if (editSettings.allowEditing) {
            if (this.parent.editModule.cellEditModule && editSettings.mode === 'Dialog') {
                this.cellEditModule.destroy();
                this.parent.treeGrid.recordDoubleClick = this.recordDoubleClick.bind(this);
            }
            else if (isNullOrUndefined(this.parent.editModule.cellEditModule) && editSettings.mode === 'Auto') {
                this.cellEditModule = new CellEdit(this.parent);
            }
            if (this.parent.editModule.dialogModule && editSettings.mode === 'Auto') {
                this.parent.treeGrid.recordDoubleClick = undefined;
            }
            else if (isNullOrUndefined(this.parent.editModule.dialogModule)) {
                this.dialogModule = new DialogEdit(this.parent);
            }
        }
        else {
            if (this.cellEditModule) {
                this.cellEditModule.destroy();
            }
            if (this.dialogModule) {
                this.dialogModule.destroy();
            }
        }
        if (editSettings.allowDeleting && editSettings.showDeleteConfirmDialog) {
            if (isNullOrUndefined(this.confirmDialog)) {
                var confirmDialog = createElement('div', {
                    id: this.parent.element.id + '_deleteConfirmDialog'
                });
                this.parent.element.appendChild(confirmDialog);
                this.renderDeleteConfirmDialog();
            }
        }
        else if (!editSettings.allowDeleting || !editSettings.showDeleteConfirmDialog) {
            if (this.confirmDialog && !this.confirmDialog.isDestroyed) {
                this.confirmDialog.destroy();
            }
        }
        if (editSettings.allowTaskbarEditing) {
            if (isNullOrUndefined(this.parent.editModule.taskbarEditModule)) {
                this.taskbarEditModule = new TaskbarEdit(this.parent);
            }
        }
        else {
            if (this.taskbarEditModule) {
                this.taskbarEditModule.destroy();
            }
        }
    };
    Edit.prototype.recordDoubleClick = function (args) {
        if (this.parent.editSettings.allowEditing && this.parent.editSettings.mode === 'Dialog') {
            var ganttData = void 0;
            if (args.row) {
                var rowIndex = getValue('rowIndex', args.row);
                ganttData = this.parent.currentViewData[rowIndex];
            }
            if (!isNullOrUndefined(ganttData)) {
                this.dialogModule.openEditDialog(ganttData);
            }
        }
        this.parent.ganttChartModule.recordDoubleClick(args);
    };
    /**
     * @returns {void} .
     * @private
     */
    Edit.prototype.destroy = function () {
        if (this.cellEditModule) {
            this.cellEditModule.destroy();
        }
        if (this.taskbarEditModule) {
            this.taskbarEditModule.destroy();
        }
        if (this.dialogModule) {
            this.dialogModule.destroy();
        }
        if (this.confirmDialog && !this.confirmDialog.isDestroyed) {
            this.confirmDialog.destroy();
        }
    };
    /**
     * Method to update record with new values.
     *
     * @param {Object} data - Defines new data to update.
     * @returns {void} .
     */
    Edit.prototype.updateRecordByID = function (data) {
        var _this = this;
        if (this.parent.enableImmutableMode && this.parent.editSettings.allowEditing &&
            this.parent.treeGrid.element.getElementsByClassName('e-editedbatchcell').length > 0) {
            this.parent.treeGrid.endEdit();
        }
        if (!this.parent.readOnly) {
            var tasks = this.parent.taskFields;
            if (isNullOrUndefined(data) || isNullOrUndefined(data[tasks.id])) {
                return;
            }
            var ganttData = this.parent.viewType === 'ResourceView' ?
                this.parent.flatData[this.parent.getTaskIds().indexOf('T' + data[tasks.id])] : this.parent.getRecordByID(data[tasks.id]);
            if (!isNullOrUndefined(ganttData[tasks.milestone])) {
                if (ganttData[tasks.milestone] === true) {
                    ganttData[tasks.milestone] = false;
                }
            }
            if (this.parent.undoRedoModule && !this.parent.undoRedoModule['isUndoRedoPerformed'] && this.parent['isUndoRedoItemPresent']('Edit') && ganttData) {
                this.parent.undoRedoModule['createUndoCollection']();
                var details = {};
                details['requestType'] = ((this.parent.contextMenuModule && this.parent.contextMenuModule.item) ? this.parent.contextMenuModule.item : 'methodUpdate');
                details['modifiedRecords'] = extend([], [ganttData], [], true);
                this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = details;
            }
            if (!isNullOrUndefined(this.parent.editModule) && ganttData) {
                this.parent.isOnEdit = true;
                this.validateUpdateValues(data, ganttData, true);
                if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed']) {
                    if (this.parent.viewType === 'ProjectView' && data['ganttProperties'].predecessor) {
                        var _loop_1 = function (i) {
                            var isValid = ganttData.ganttProperties.predecessor.filter(function (pred) {
                                if ((pred.from === data['ganttProperties'].predecessor[i].from &&
                                    pred.to === data['ganttProperties'].predecessor[i].to
                                    && data['ganttProperties'].predecessor[i].offset !== pred.offset)) {
                                    var record = _this.parent.flatData[_this.parent.ids.indexOf(pred.to)];
                                    var changeValue = record.ganttProperties.predecessor.filter(function (pred) {
                                        return (pred.from === data['ganttProperties'].predecessor[i].from && pred.to === data['ganttProperties'].predecessor[i].to);
                                    });
                                    changeValue[0].offset = data['ganttProperties'].predecessor[i].offset;
                                }
                                return pred.from !== data['ganttProperties'].predecessor[i].from && pred.from !== data['ganttProperties'].predecessor[i].to;
                            });
                            if (isValid.length > 0) {
                                for (var j = 0; j < isValid.length; j++) {
                                    var record = this_1.parent.flatData[this_1.parent.ids.indexOf(isValid[j].from)];
                                    for (var k = 0; k < record.ganttProperties.predecessor.length; k++) {
                                        if (record.ganttProperties.predecessor[k].from === isValid[j].from &&
                                            record.ganttProperties.predecessor[k].to === isValid[j].to) {
                                            record.ganttProperties.predecessor.splice(k, 1);
                                            break;
                                        }
                                    }
                                }
                                return "break";
                            }
                        };
                        var this_1 = this;
                        for (var i = 0; i < data['ganttProperties'].predecessor.length; i++) {
                            var state_1 = _loop_1(i);
                            if (state_1 === "break")
                                break;
                        }
                    }
                    else if (!data['ganttProperties'].predecessor && ganttData.ganttProperties.predecessor) {
                        for (var i = 0; i < ganttData.ganttProperties.predecessor.length; i++) {
                            var id = void 0;
                            if (ganttData.ganttProperties.taskId.toString() === ganttData.ganttProperties.predecessor[i].from) {
                                id = ganttData.ganttProperties.predecessor[i].to;
                            }
                            else {
                                id = ganttData.ganttProperties.predecessor[i].from;
                            }
                            var parentRec = this.parent.flatData[this.parent.ids.indexOf(id)];
                            for (var j = 0; j < parentRec.ganttProperties.predecessor.length; j++) {
                                if (parentRec.ganttProperties.predecessor[j].from ===
                                    ganttData.ganttProperties.predecessor[i].from &&
                                    parentRec.ganttProperties.predecessor[j].to ===
                                        ganttData.ganttProperties.predecessor[i].to) {
                                    parentRec.ganttProperties.predecessor.splice(j, 1);
                                }
                            }
                        }
                    }
                    ganttData.ganttProperties.resourceInfo = data['ganttProperties'].resourceInfo;
                }
                if (data[this.parent.taskFields.resourceInfo]) {
                    if (ganttData.ganttProperties.duration === 0 &&
                        (ganttData.ganttProperties.taskType !== 'FixedWork' || this.parent['isConvertedMilestone'])) {
                        this.parent.dataOperation.updateWorkWithDuration(ganttData);
                    }
                    if (!this.parent.undoRedoModule || !this.parent.undoRedoModule['isUndoRedoPerformed']) {
                        this.updateResourceRelatedFields(ganttData, 'resource');
                    }
                    this.parent.dateValidationModule.calculateEndDate(ganttData);
                }
                var keys = Object.keys(data);
                if (keys.indexOf(tasks.startDate) !== -1 || keys.indexOf(tasks.endDate) !== -1 ||
                    keys.indexOf(tasks.duration) !== -1) {
                    this.parent.dataOperation.calculateScheduledValues(ganttData, ganttData.taskData, false);
                }
                this.parent.dataOperation.updateWidthLeft(ganttData);
                if (!isUndefined(data[this.parent.taskFields.dependency]) &&
                    data[this.parent.taskFields.dependency] !== ganttData.ganttProperties.predecessorsName) {
                    this.parent.connectorLineEditModule.updatePredecessor(ganttData, data[this.parent.taskFields.dependency]);
                }
                else {
                    var args = {};
                    args.data = ganttData;
                    if (this.parent.viewType === 'ResourceView') {
                        args.action = 'methodUpdate';
                    }
                    this.parent.editModule.initiateUpdateAction(args);
                }
            }
        }
    };
    /**
     *
     * @param {object} data .
     * @param {IGanttData} ganttData .
     * @param {boolean} isFromDialog .
     * @returns {void} .
     * @private
     */
    Edit.prototype.validateUpdateValues = function (data, ganttData, isFromDialog) {
        var ganttObj = this.parent;
        var tasks = ganttObj.taskFields;
        var ganttPropByMapping = getSwapKey(ganttObj.columnMapping);
        var scheduleFieldNames = [];
        var isScheduleValueUpdated = false;
        for (var _i = 0, _b = Object.keys(data); _i < _b.length; _i++) {
            var key = _b[_i];
            if (tasks.startDate === key || tasks.endDate === key || tasks.duration === key) {
                if (isNullOrUndefined(data["" + key]) && !ganttObj.allowUnscheduledTasks) {
                    continue;
                }
                var ganttProps = ganttData.ganttProperties;
                var isDurationKey = tasks.duration === key;
                if (isFromDialog) {
                    if (isDurationKey) {
                        ganttObj.dataOperation.updateDurationValue(data[key], ganttProps);
                        if (ganttProps.duration > 0 && ganttProps.isMilestone) {
                            this.parent.setRecordValue('isMilestone', false, ganttProps, true);
                        }
                    }
                    else {
                        var tempDate = typeof data[key] === 'string' ? new Date(data[key]) : data[key];
                        if (key === tasks.endDate && isNullOrUndefined(ganttProps.startDate) && (isNullOrUndefined(data[tasks.duration]) || data[tasks.duration] === '' || Number.isNaN(data[tasks.duration]))) {
                            tempDate = this.parent.editModule.dialogModule['isFromEditDialog'] ? ganttData.ganttProperties.endDate : data[tasks.endDate];
                        }
                        ganttObj.setRecordValue(ganttPropByMapping[key], tempDate, ganttProps, true);
                        if (ganttData[tasks.startDate] && !(ganttData[tasks.startDate] instanceof Date)) {
                            ganttData[tasks.startDate] = new Date(ganttData[tasks.startDate]);
                        }
                        if (ganttData[tasks.endDate] && !(ganttData[tasks.endDate] instanceof Date)) {
                            ganttData[tasks.endDate] = new Date(ganttData[tasks.endDate]);
                        }
                    }
                    ganttObj.dataOperation.updateMappingData(ganttData, ganttPropByMapping[key]);
                }
                else {
                    scheduleFieldNames.push(key);
                    isScheduleValueUpdated = true;
                }
            }
            else if (tasks.resourceInfo === key) {
                var resourceData = ganttObj.dataOperation.setResourceInfo(data);
                if (this.parent.viewType === 'ResourceView') {
                    if (JSON.stringify(resourceData) !== JSON.stringify(ganttData.ganttProperties.resourceInfo)) {
                        this.parent.editModule.dialogModule.isResourceUpdate = true;
                        this.parent.editModule.dialogModule.previousResource = !isNullOrUndefined(ganttData.ganttProperties.resourceInfo) ? ganttData.ganttProperties.resourceInfo.slice() : [];
                    }
                    else {
                        this.parent.editModule.dialogModule.isResourceUpdate = false;
                    }
                }
                if (!this.parent.undoRedoModule || !this.parent.undoRedoModule['isUndoRedoPerformed']) {
                    ganttData.ganttProperties.resourceInfo = resourceData;
                }
                ganttObj.dataOperation.updateMappingData(ganttData, 'resourceInfo');
            }
            else if (tasks.dependency === key) {
                //..
            }
            else if ([tasks.progress, tasks.notes, tasks.durationUnit, tasks.expandState,
                tasks.milestone, tasks.name, tasks.baselineStartDate,
                tasks.baselineEndDate, tasks.id, tasks.segments, tasks.cssClass].indexOf(key) !== -1) {
                var column = ganttObj.columnByField[key];
                /* eslint-disable-next-line */
                var value = data[key];
                if (!isNullOrUndefined(column) && (column.editType === 'datepickeredit' || column.editType === 'datetimepickeredit')) {
                    value = ganttObj.dataOperation.getDateFromFormat(value);
                }
                var ganttPropKey = ganttPropByMapping[key];
                switch (key) {
                    case tasks.id:
                        ganttPropKey = 'taskId';
                        break;
                    case tasks.name:
                        ganttPropKey = 'taskName';
                        break;
                    case tasks.cssClass:
                        ganttPropKey = 'cssClass';
                        break;
                    case tasks.milestone:
                        ganttPropKey = 'isMilestone';
                        if (!isNullOrUndefined(tasks.duration)) {
                            var ganttProp = ganttData.ganttProperties;
                            var durationValue = data[tasks.duration];
                            if (value) {
                                durationValue = 0;
                            }
                            else {
                                durationValue = durationValue <= 0 ? 1 : durationValue;
                            }
                            ganttObj.setRecordValue(tasks.duration, durationValue, ganttData, true);
                            ganttObj.setRecordValue('duration', durationValue, ganttProp, true);
                            ganttObj.setRecordValue('taskData.' + tasks.duration, durationValue, ganttData);
                        }
                        break;
                    case tasks.segments:
                        if (ganttData.ganttProperties.segments) {
                            ganttPropKey = 'segments';
                            /* eslint-disable-next-line */
                            if (data && !isNullOrUndefined(data[tasks.segments]) && data[tasks.segments].length > 0
                                && data['ganttProperties'] && data['ganttProperties'].segments) {
                                if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed']) {
                                    ganttData.ganttProperties.segments = data['ganttProperties'].segments;
                                }
                                var totDuration = ganttData.ganttProperties.segments.reduce(function (acc, segment) { return acc + segment.duration; }, 0);
                                var sdate = ganttData.ganttProperties.startDate;
                                /* eslint-disable-next-line */
                                var edate = this.parent.dataOperation.getEndDate(sdate, totDuration, ganttData.ganttProperties.durationUnit, ganttData.ganttProperties, false);
                                ganttObj.setRecordValue('endDate', ganttObj.dataOperation.getDateFromFormat(edate), ganttData.ganttProperties, true);
                            }
                        }
                        break;
                }
                if (!isNullOrUndefined(ganttPropKey)) {
                    var seg = [];
                    if (ganttPropKey === 'segments' && value && value.length > 0 && !isNullOrUndefined(ganttData.ganttProperties.segments)) {
                        for (var i = 0; i < value.length; i++) {
                            var segment = {};
                            if (value[i][tasks.startDate]) {
                                segment['startDate'] = value[i][tasks.startDate];
                            }
                            if (value[i][tasks.endDate]) {
                                segment['endDate'] = value[i][tasks.endDate];
                            }
                            if (value[i][tasks.duration]) {
                                segment['duration'] = parseFloat(value[i][tasks.duration]);
                            }
                            if (value[i][tasks.id]) {
                                segment['id'] = value[i][tasks.id];
                            }
                            seg.push(segment);
                        }
                        ganttObj.setRecordValue(ganttPropKey, seg, ganttData.ganttProperties, true);
                    }
                    else {
                        if (ganttPropKey !== 'segments' || (ganttPropKey === 'segments' && isNullOrUndefined(value))) {
                            ganttObj.setRecordValue(ganttPropKey, value, ganttData.ganttProperties, true);
                        }
                    }
                }
                if ((key === tasks.baselineStartDate || key === tasks.baselineEndDate) &&
                    (ganttData.ganttProperties.baselineStartDate && ganttData.ganttProperties.baselineEndDate)) {
                    var ganttProps = ganttData.ganttProperties;
                    ganttObj.setRecordValue('baselineStartDate', ganttObj.dataOperation.checkBaselineStartDate(ganttProps.baselineStartDate, ganttProps), ganttProps, true);
                    var dayEndTime = this.parent['getCurrentDayEndTime'](ganttProps.baselineEndDate);
                    if (ganttProps.baselineEndDate && ganttProps.baselineEndDate.getHours() === 0 &&
                        dayEndTime !== 86400) {
                        ganttObj.dataOperation.setTime(dayEndTime, ganttProps.baselineEndDate);
                    }
                    if ((ganttProps.baselineStartDate && ganttProps.baselineEndDate &&
                        (ganttProps.baselineStartDate.getTime() > ganttProps.baselineEndDate.getTime())) ||
                        ((!isNullOrUndefined(ganttProps.baselineStartDate) &&
                            !isNullOrUndefined(ganttProps.startDate) &&
                            (ganttProps.baselineStartDate.getTime() === ganttProps.startDate.getTime()))
                            && (!isNullOrUndefined(ganttProps.baselineEndDate) &&
                                !isNullOrUndefined(ganttProps.endDate) &&
                                (ganttProps.baselineEndDate.toLocaleDateString() ===
                                    ganttProps.endDate.toLocaleDateString())) &&
                            ganttProps.isMilestone)) {
                        ganttProps.baselineEndDate = ganttProps.baselineStartDate;
                    }
                    ganttObj.setRecordValue('baselineEndDate', ganttObj.dataOperation.checkBaselineEndDate(ganttProps.baselineEndDate), ganttProps, true);
                    ganttObj.setRecordValue('baselineLeft', ganttObj.dataOperation.calculateBaselineLeft(ganttProps), ganttProps, true);
                    ganttObj.setRecordValue('baselineWidth', ganttObj.dataOperation.calculateBaselineWidth(ganttProps), ganttProps, true);
                    if (ganttData[tasks.baselineStartDate] && !(ganttData[tasks.baselineStartDate] instanceof Date)) {
                        ganttData[tasks.baselineStartDate] = new Date(ganttData[tasks.baselineStartDate]);
                    }
                    if (ganttData[tasks.baselineEndDate] && !(ganttData[tasks.baselineEndDate] instanceof Date)) {
                        ganttData[tasks.baselineEndDate] = new Date(ganttData[tasks.baselineEndDate]);
                    }
                }
                ganttObj.setRecordValue('taskData.' + key, value, ganttData);
                /* eslint-disable-next-line */
                if (key === tasks.segments && data && !isNullOrUndefined(data[tasks.segments]) && data[tasks.segments].length > 0) {
                    if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed'] && data['ganttProperties']
                        && data['ganttProperties'].segments) {
                        ganttData.ganttProperties.segments = data['ganttProperties'].segments;
                    }
                    ganttObj.dataOperation.setSegmentsInfo(ganttData, true);
                }
                ganttObj.setRecordValue(key, value, ganttData);
            }
            else if (tasks.indicators === key) {
                var value = data[key];
                ganttObj.setRecordValue('indicators', value, ganttData.ganttProperties, true);
                ganttObj.setRecordValue('taskData.' + key, value, ganttData);
                ganttObj.setRecordValue(key, value, ganttData);
            }
            else if (tasks.work === key) {
                ganttObj.setRecordValue('work', data[key], ganttData.ganttProperties, true);
                this.parent.dataOperation.updateMappingData(ganttData, 'work');
                this.parent.dataOperation.updateMappingData(ganttData, 'duration');
                this.parent.dataOperation.updateMappingData(ganttData, 'endDate');
            }
            else if (key === tasks.type) {
                var value = data[key];
                ganttObj.setRecordValue('taskType', value, ganttData.ganttProperties, true);
                ganttObj.setRecordValue(key, value, ganttData);
                ganttObj.setRecordValue('taskData.' + key, value, ganttData);
            }
            else if (ganttObj.customColumns.indexOf(key) !== -1) {
                var column = ganttObj.columnByField[key];
                /* eslint-disable-next-line */
                var value = data[key];
                if (isNullOrUndefined(column.edit)) {
                    if (column.editType === 'datepickeredit' || column.editType === 'datetimepickeredit') {
                        value = ganttObj.dataOperation.getDateFromFormat(value);
                    }
                }
                ganttObj.setRecordValue('taskData.' + key, value, ganttData);
                ganttObj.setRecordValue(key, value, ganttData);
            }
            else if (tasks.manual === key) {
                ganttObj.setRecordValue('isAutoSchedule', !data[key], ganttData.ganttProperties, true);
                this.parent.setRecordValue(key, data[key], ganttData);
                this.updateTaskScheduleModes(ganttData);
            }
        }
        if (isScheduleValueUpdated) {
            this.validateScheduleValues(scheduleFieldNames, ganttData, data);
        }
    };
    /**
     * To update duration, work, resource unit
     *
     * @param {IGanttData} currentData .
     * @param {string} column .
     * @returns {void} .
     */
    Edit.prototype.updateResourceRelatedFields = function (currentData, column) {
        var ganttProp = currentData.ganttProperties;
        var previousdata = this.parent.previousRecords;
        var taskType = ganttProp.taskType ? ganttProp.taskType : this.parent.taskType;
        var isEffectDriven;
        var isAutoSchedule = ganttProp.isAutoSchedule;
        var resources = (this.parent.editModule.dialogModule &&
            this.parent.editModule.dialogModule['currentResources']) ? this.parent.editModule.dialogModule['currentResources']
            : currentData.ganttProperties.resourceInfo;
        if (!isNullOrUndefined(resources)) {
            switch (taskType) {
                case 'FixedUnit':
                    if (!isNullOrUndefined(previousdata[ganttProp.uniqueID]) &&
                        !isNullOrUndefined(previousdata[ganttProp.uniqueID].ganttProperties) &&
                        (previousdata[ganttProp.uniqueID].ganttProperties.resourceNames
                            === null ||
                            previousdata[ganttProp.uniqueID].ganttProperties.resourceNames === '')) {
                        this.parent.dataOperation.updateWorkWithDuration(currentData);
                    }
                    if (resources.length === 0) {
                        return;
                    }
                    else if (isAutoSchedule && resources.length) {
                        if (column === 'resource' || column === 'work') {
                            this.parent.dataOperation.updateDurationWithWork(currentData);
                        }
                        else if (column === 'duration' || column === 'endDate') {
                            this.parent.dataOperation.updateWorkWithDuration(currentData);
                            if (ganttProp.duration === 0) {
                                this.parent.setRecordValue('isMilestone', true, ganttProp, true);
                            }
                        }
                    }
                    else if (!isAutoSchedule && column === 'work') {
                        this.parent.dataOperation.updateUnitWithWork(currentData);
                    }
                    else {
                        this.parent.dataOperation.updateWorkWithDuration(currentData);
                    }
                    break;
                case 'FixedWork':
                    if (resources.length === 0) {
                        return;
                    }
                    else if (isAutoSchedule) {
                        if (column === 'duration' || column === 'endDate') {
                            this.parent.dataOperation.updateUnitWithWork(currentData);
                            if (ganttProp.duration === 0) {
                                this.parent.setRecordValue('isMilestone', true, ganttProp, true);
                            }
                        }
                        else {
                            this.parent.dataOperation.updateDurationWithWork(currentData);
                        }
                    }
                    else {
                        if (column === 'work') {
                            this.parent.dataOperation.updateUnitWithWork(currentData);
                        }
                        else {
                            this.parent.dataOperation.updateWorkWithDuration(currentData);
                        }
                    }
                    break;
                case 'FixedDuration':
                    if (resources.length === 0) {
                        // To validate the work column, if set duration as 0 via celledit action, where resource colection is 0
                        this.parent.dataOperation.updateWorkWithDuration(currentData);
                        return;
                    }
                    if (resources.length && (column === 'work' || (isAutoSchedule &&
                        isEffectDriven && (column === 'resource')))) {
                        if (column === 'work') {
                            this.parent.dataOperation.updateUnitWithWork(currentData);
                        }
                        else {
                            this.parent.dataOperation.updateWorkWithDuration(currentData);
                        }
                    }
                    else {
                        this.parent.dataOperation.updateWorkWithDuration(currentData);
                    }
                    break;
            }
        }
        // To validate the work colum if set duration as 0, while resource is null/undefined
        else if (isNullOrUndefined(resources) && taskType === 'FixedDuration' && ganttProp.duration === 0) {
            this.parent.dataOperation.updateWorkWithDuration(currentData);
        }
    };
    Edit.prototype.validateScheduleValues = function (fieldNames, ganttData, data) {
        var ganttObj = this.parent;
        if (fieldNames.length > 2) {
            ganttObj.dataOperation.calculateScheduledValues(ganttData, data, false);
        }
        else if (fieldNames.length > 1) {
            this.validateScheduleByTwoValues(data, fieldNames, ganttData);
        }
        else {
            this.dialogModule.validateScheduleValuesByCurrentField(fieldNames[0], data[fieldNames[0]], ganttData);
        }
    };
    Edit.prototype.validateScheduleByTwoValues = function (data, fieldNames, ganttData) {
        var ganttObj = this.parent;
        var startDate;
        var endDate;
        var duration;
        var tasks = ganttObj.taskFields;
        var ganttProp = ganttData.ganttProperties;
        var isUnscheduledTask = ganttObj.allowUnscheduledTasks;
        if (fieldNames.indexOf(tasks.startDate) !== -1) {
            startDate = data[tasks.startDate];
        }
        if (fieldNames.indexOf(tasks.endDate) !== -1) {
            endDate = data[tasks.endDate];
        }
        if (fieldNames.indexOf(tasks.duration) !== -1) {
            duration = data[tasks.duration];
        }
        if (startDate && endDate || (isUnscheduledTask && (fieldNames.indexOf(tasks.startDate) !== -1) &&
            (fieldNames.indexOf(tasks.endDate) !== -1))) {
            ganttObj.setRecordValue('startDate', ganttObj.dataOperation.getDateFromFormat(startDate), ganttProp, true);
            ganttObj.setRecordValue('endDate', ganttObj.dataOperation.getDateFromFormat(endDate), ganttProp, true);
            ganttObj.dataOperation.calculateDuration(ganttData);
        }
        else if (endDate && duration || (isUnscheduledTask &&
            (fieldNames.indexOf(tasks.endDate) !== -1) && (fieldNames.indexOf(tasks.duration) !== -1))) {
            ganttObj.setRecordValue('endDate', ganttObj.dataOperation.getDateFromFormat(endDate), ganttProp, true);
            ganttObj.dataOperation.updateDurationValue(duration, ganttProp);
        }
        else if (startDate && duration || (isUnscheduledTask && (fieldNames.indexOf(tasks.startDate) !== -1)
            && (fieldNames.indexOf(tasks.duration) !== -1))) {
            ganttObj.setRecordValue('startDate', ganttObj.dataOperation.getDateFromFormat(startDate), ganttProp, true);
            ganttObj.dataOperation.updateDurationValue(duration, ganttProp);
        }
    };
    Edit.prototype.isTaskbarMoved = function (data) {
        var isMoved = false;
        var taskData = data.ganttProperties;
        var prevData = this.parent.previousRecords &&
            this.parent.previousRecords[data.uniqueID];
        if (prevData && prevData.ganttProperties) {
            var prevStart = getValue('ganttProperties.startDate', prevData);
            var prevEnd = getValue('ganttProperties.endDate', prevData);
            var prevDuration = getValue('ganttProperties.duration', prevData);
            var prevDurationUnit = getValue('ganttProperties.durationUnit', prevData);
            var keys = Object.keys(prevData.ganttProperties);
            if (keys.indexOf('startDate') !== -1 || keys.indexOf('endDate') !== -1 ||
                keys.indexOf('duration') !== -1 || keys.indexOf('durationUnit') !== -1) {
                if ((isNullOrUndefined(prevStart) && !isNullOrUndefined(taskData.startDate)) ||
                    (isNullOrUndefined(prevEnd) && !isNullOrUndefined(taskData.endDate)) ||
                    (isNullOrUndefined(taskData.startDate) && !isNullOrUndefined(prevStart)) ||
                    (isNullOrUndefined(taskData.endDate) && !isNullOrUndefined(prevEnd)) ||
                    (prevStart && prevStart.getTime() !== taskData.startDate.getTime())
                    || (prevEnd && prevEnd.getTime() !== taskData.endDate.getTime())
                    || (!isNullOrUndefined(prevDuration) && prevDuration !== taskData.duration)
                    || (!isNullOrUndefined(prevDuration) && prevDuration === taskData.duration &&
                        prevDurationUnit !== taskData.durationUnit)) {
                    isMoved = true;
                }
            }
        }
        return isMoved;
    };
    Edit.prototype.isPredecessorUpdated = function (data) {
        var isPredecessorUpdated = false;
        var prevData = this.parent.previousRecords[data.uniqueID];
        // eslint-disable-next-line
        if (prevData && prevData.ganttProperties && prevData.ganttProperties.hasOwnProperty('predecessor')) {
            if (data.ganttProperties.predecessorsName !== prevData.ganttProperties.predecessorsName &&
                !(data.ganttProperties.predecessorsName === '' &&
                    isNullOrUndefined(prevData.ganttProperties.predecessorsName))) {
                isPredecessorUpdated = true;
            }
            else {
                this.parent.setRecordValue('predecessor', prevData.ganttProperties.predecessor, data.ganttProperties, true);
            }
        }
        return isPredecessorUpdated;
    };
    /**
     * Method to check need to open predecessor validate dialog
     *
     * @param {IGanttData} data .
     * @returns {boolean} .
     */
    Edit.prototype.isCheckPredecessor = function (data) {
        var isValidatePredecessor = false;
        var prevData = this.parent.previousRecords[data.uniqueID];
        if (prevData && this.parent.taskFields.dependency && this.parent.isInPredecessorValidation &&
            this.parent.predecessorModule.getValidPredecessor(data).length > 0) {
            if (this.isTaskbarMoved(data)) {
                isValidatePredecessor = true;
            }
        }
        return isValidatePredecessor;
    };
    /**
     * Method to copy the ganttProperties values
     *
     * @param {IGanttData} data .
     * @param {IGanttData} updateData .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateGanttProperties = function (data, updateData) {
        var skipProperty = ['taskId', 'uniqueID', 'rowUniqueID', 'parentId', 'predecessor'];
        Object.keys(data.ganttProperties).forEach(function (property) {
            if (skipProperty.indexOf(property) === -1) {
                updateData.ganttProperties[property] = data.ganttProperties[property];
            }
        });
    };
    /**
     * Method to update all dependent record on edit action
     *
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     * @private
     */
    Edit.prototype.initiateUpdateAction = function (args) {
        var isValidatePredecessor = this.isCheckPredecessor(args.data);
        var parentData;
        var childRecordIndex;
        if (!isNullOrUndefined(args.data.parentItem) && !isValidatePredecessor) {
            parentData = this.parent.getRecordByID(args.data.parentItem.taskId);
            if (this.isTaskbarMoved(args.data) && this.parent.predecessorModule.getValidPredecessor(parentData).length > 0
                && this.parent.isInPredecessorValidation) {
                isValidatePredecessor = true;
            }
            else {
                isValidatePredecessor = false;
            }
        }
        else if (args.data.childRecords.length > 0 && !isValidatePredecessor) {
            isValidatePredecessor = this.isCheckPredecessor(args.data);
            if (!isValidatePredecessor && this.isTaskbarMoved(args.data)) {
                for (var i = 0; i < args.data.childRecords.length; i++) {
                    if (this.parent.predecessorModule.getValidPredecessor(args.data.childRecords[i]).length > 0) {
                        childRecordIndex = i;
                        isValidatePredecessor = true;
                    }
                }
            }
        }
        if (!this.parent.undoRedoModule || (this.parent.undoRedoModule && !this.parent.undoRedoModule['currentAction'] ||
            (this.parent.undoRedoModule['currentAction'] && this.parent.undoRedoModule['currentAction']['action'] !== 'indent' &&
                this.parent.undoRedoModule['currentAction']['action'] !== 'outdent'))) {
            this.taskbarMoved = this.isTaskbarMoved(args.data);
        }
        this.predecessorUpdated = this.isPredecessorUpdated(args.data);
        if (this.predecessorUpdated) {
            this.parent.isConnectorLineUpdate = true;
            this.parent.connectorLineEditModule.addRemovePredecessor(args.data);
        }
        var validateObject = {};
        if (isValidatePredecessor && this.parent.autoCalculateDateScheduling && !(this.parent.isLoad &&
            this.parent.treeGrid.loadChildOnDemand && this.parent.taskFields.hasChildMapping)) {
            if (!isNullOrUndefined(parentData)) {
                validateObject = this.parent.connectorLineEditModule.validateTypes(parentData, args.data);
            }
            else if (!isNullOrUndefined(childRecordIndex)) {
                validateObject = this.parent.connectorLineEditModule.validateTypes(args.data.childRecords[childRecordIndex], args.data);
            }
            else {
                validateObject = this.parent.connectorLineEditModule.validateTypes(args.data);
            }
            this.parent.isConnectorLineUpdate = true;
            if (!isNullOrUndefined(getValue('violationType', validateObject))) {
                var newArgs = this.validateTaskEvent(args);
                if (newArgs.validateMode.preserveLinkWithEditing === false &&
                    newArgs.validateMode.removeLink === false &&
                    newArgs.validateMode.respectLink === false) {
                    this.parent.connectorLineEditModule.openValidationDialog(validateObject);
                }
                else {
                    if (this.parent.editModule && this.parent.editModule.dialogModule &&
                        this.parent.editModule.dialogModule['isEdit'] && this.predecessorUpdated) {
                        this.isValidatedEditedRecord = true;
                        this.parent.predecessorModule.validatePredecessor(args.data, [], '');
                    }
                    this.parent.connectorLineEditModule.applyPredecessorOption();
                }
            }
            else {
                this.updateEditedTask(args);
            }
        }
        else {
            if (this.taskbarMoved) {
                this.parent.isConnectorLineUpdate = true;
            }
            this.updateEditedTask(args);
        }
    };
    /**
     *
     * @param {ITaskbarEditedEventArgs} editedEventArgs method to trigger validate predecessor link by dialog
     * @returns {IValidateArgs} .
     */
    Edit.prototype.validateTaskEvent = function (editedEventArgs) {
        var newArgs = {};
        this.resetValidateArgs();
        this.parent.currentEditedArgs = newArgs;
        newArgs.cancel = false;
        newArgs.data = editedEventArgs.data;
        newArgs.requestType = 'validateLinkedTask';
        newArgs.validateMode = this.parent.dialogValidateMode;
        newArgs.editEventArgs = editedEventArgs;
        this.parent.actionBeginTask(newArgs);
        return newArgs;
    };
    Edit.prototype.resetValidateArgs = function () {
        this.parent.dialogValidateMode.preserveLinkWithEditing = true;
        this.parent.dialogValidateMode.removeLink = false;
        this.parent.dialogValidateMode.respectLink = false;
    };
    Edit.prototype.validateChildPredecessors = function () {
        for (var i = 0; i < this.parent.predecessorModule.validatedChildItems.length; i++) {
            var child = this.parent.predecessorModule.validatedChildItems[i];
            if (child.ganttProperties.predecessor && child.ganttProperties.predecessor.length > 0) {
                this.parent.editedTaskBarItem = child;
                if (!this.isValidatedEditedRecord) {
                    this.isFirstCall = true;
                }
                this.parent.predecessorModule.validatePredecessor(child, [], '');
            }
        }
    };
    /**
     *
     * @param {ITaskAddedEventArgs} args - Edited event args like taskbar editing, dialog editing, cell editing
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateEditedTask = function (args) {
        var ganttRecord = args.data;
        this.editedRecord = ganttRecord;
        if (this.parent.autoCalculateDateScheduling && !(this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand &&
            this.parent.taskFields.hasChildMapping)) {
            this.updateParentChildRecord(ganttRecord);
        }
        if (this.parent.predecessorModule) {
            this.parent.predecessorModule.isValidatedParentTaskID = '';
        }
        if ((this.parent.isConnectorLineUpdate || (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed'])) && this.parent.autoCalculateDateScheduling &&
            !(this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand && this.parent.taskFields.hasChildMapping)) {
            /* validating predecessor for updated child items */
            this.validateChildPredecessors();
            /** validating predecessor for current edited records */
            if (ganttRecord.ganttProperties.predecessor) {
                this.parent.isMileStoneEdited = ganttRecord.ganttProperties.isMilestone;
                if (this.taskbarMoved) {
                    this.parent.editedTaskBarItem = ganttRecord;
                }
                if (!this.isValidatedEditedRecord) {
                    this.isFirstCall = true;
                    this.parent.predecessorModule.validatePredecessor(ganttRecord, [], '');
                    this.parent.predecessorModule.isChildRecordValidated = [];
                }
                this.isValidatedEditedRecord = false;
            }
            this.parent.predecessorModule.isValidatedParentTaskID = '';
            if (this.parent.allowParentDependency && this.parent.predecessorModule.isValidatedParentTaskID !==
                ganttRecord.ganttProperties.taskId && ganttRecord.hasChildRecords &&
                (this.parent.previousRecords[ganttRecord.uniqueID].ganttProperties.startDate) && (args.action !== 'TaskbarEditing') &&
                (!ganttRecord.hasChildRecords || (ganttRecord.hasChildRecords && ganttRecord.ganttProperties.isAutoSchedule))) {
                this.parent.predecessorModule['updateChildItems'](ganttRecord);
                this.validateChildPredecessors();
            }
            this.parent.predecessorModule.isValidatedParentTaskID = '';
            if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed']) {
                for (var i = 0; i < ganttRecord.childRecords.length; i++) {
                    if (ganttRecord.childRecords[i].ganttProperties.predecessor) {
                        this.parent.predecessorModule.validatePredecessor(ganttRecord.childRecords[i], [], '');
                    }
                }
            }
            this.updateParentItemOnEditing();
            this.parent.dataOperation.updateParentItems(ganttRecord, true);
        }
        /** Update parent up-to zeroth level */
        if (ganttRecord.parentItem) {
            if (this.parent.autoCalculateDateScheduling && !(this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand &&
                this.parent.taskFields.hasChildMapping)) {
                this.parent.dataOperation.updateParentItems(ganttRecord, true);
            }
            var parentData = this.parent.getRecordByID(ganttRecord.parentItem.taskId);
            if (!isNullOrUndefined(parentData)) {
                if (!parentData.ganttProperties.predecessorsName) {
                    this.isFirstCall = true;
                    this.parent.predecessorModule.validatePredecessor(parentData, [], '');
                    this.updateParentItemOnEditing();
                }
            }
        }
        if (this.parent.updateOffsetOnTaskbarEdit && this.parent.connectorLineEditModule && args.data) {
            this.parent.connectorLineEditModule['validatedOffsetIds'] = [];
            this.parent.connectorLineEditModule['calculateOffset'](args.data);
        }
        this.parent.predecessorModule['validatedParentIds'] = [];
        if (isNullOrUndefined(this.dialogModule) || (this.dialogModule && !this.dialogModule['isFromDialogPredecessor'])) {
            this.initiateSaveAction(args);
        }
    };
    Edit.prototype.updateParentItemOnEditing = function () {
        var _this = this;
        var childRecord = getValue('parentRecord', this.parent.predecessorModule);
        for (var i = 0; i < childRecord.length; i++) {
            this.parent.dataOperation.updateParentItems(childRecord[i]);
        }
        if (this.parent.editModule['updateParentRecords'] && this.parent.editModule['updateParentRecords'].length > 0) {
            this.parent.editModule['updateParentRecords'].forEach(function (record) {
                if (record.ganttProperties.predecessor && record.ganttProperties.predecessor.length > 0) {
                    _this.parent.predecessorModule.validatePredecessor(record, [], '');
                }
            });
        }
        for (var i = 0; i < childRecord.length; i++) {
            this.parent.dataOperation.updateParentItems(childRecord[i]);
        }
        setValue('parentRecord', [], this.parent.predecessorModule);
        setValue('parentIds', [], this.parent.predecessorModule);
    };
    /**
     * To update parent records while perform drag action.
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateParentChildRecord = function (data) {
        var ganttRecord = data;
        if (ganttRecord.hasChildRecords && this.taskbarMoved && (ganttRecord[this.parent.taskFields.manual] === false ||
            this.parent.taskMode === 'Auto') && (!isNullOrUndefined(this.parent.editModule.cellEditModule) &&
            !this.parent.editModule.cellEditModule.isResourceCellEdited)) {
            this.parent.predecessorModule['updateChildItems'](ganttRecord);
        }
        if (!isNullOrUndefined(this.parent.editModule.cellEditModule)) {
            this.parent.editModule.cellEditModule.isResourceCellEdited = false;
        }
    };
    /**
     * To update records while changing schedule mode.
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateTaskScheduleModes = function (data) {
        var currentValue = data[this.parent.taskFields.startDate];
        var ganttProp = data.ganttProperties;
        if (this.parent.taskFields.manual) {
            this.parent.setRecordValue(this.parent.taskFields.manual, !data.ganttProperties.isAutoSchedule, data);
        }
        if (data.hasChildRecords && ganttProp.isAutoSchedule) {
            this.parent.setRecordValue('startDate', ganttProp.autoStartDate, ganttProp, true);
            this.parent.setRecordValue('endDate', ganttProp.autoEndDate, ganttProp, true);
            this.parent.setRecordValue('StartDate', ganttProp.autoStartDate, data, true);
            this.parent.setRecordValue('EndDate', ganttProp.autoEndDate, data, true);
            this.parent.setRecordValue('taskData.StartDate', ganttProp.autoStartDate, data, true);
            this.parent.setRecordValue('taskData.EndDate', ganttProp.autoEndDate, data, true);
            this.parent.setRecordValue('width', this.parent.dataOperation.calculateWidth(data, true), ganttProp, true);
            this.parent.setRecordValue('left', this.parent.dataOperation.calculateLeft(ganttProp, data, true), ganttProp, true);
            this.parent.setRecordValue('progressWidth', this.parent.dataOperation.getProgressWidth(ganttProp.width, ganttProp.progress), ganttProp, true);
            this.parent.dataOperation.calculateDuration(data);
        }
        else if (data.hasChildRecords && !ganttProp.isAutoSchedule) {
            this.parent.dataOperation.updateWidthLeft(data);
            this.parent.dataOperation.calculateDuration(data);
            this.parent.setRecordValue('autoStartDate', ganttProp.autoStartDate, ganttProp, true);
            this.parent.setRecordValue('autoEndDate', ganttProp.autoEndDate, ganttProp, true);
            this.parent.setRecordValue('autoDuration', this.parent.dataOperation.calculateAutoDuration(data), ganttProp, true);
            this.parent.dataOperation.updateAutoWidthLeft(data);
        }
        else {
            var startDate = this.parent.dateValidationModule.checkStartDate(currentValue, data.ganttProperties);
            this.parent.setRecordValue('startDate', startDate, data.ganttProperties, true);
            this.parent.dataOperation.updateMappingData(data, 'startDate');
            this.parent.dateValidationModule.calculateEndDate(data);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.manual, data[this.parent.taskFields.manual], data);
            this.parent.dataOperation.updateWidthLeft(data);
        }
    };
    /**
     * To update progress value of parent tasks
     *
     * @param {IParent} cloneParent .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateParentProgress = function (cloneParent) {
        var parentProgress = 0;
        var parent = this.parent.getParentTask(cloneParent);
        var childRecords = parent.childRecords;
        var childCount = childRecords ? childRecords.length : 0;
        var totalProgress = 0;
        var milesStoneCount = 0;
        var taskCount = 0;
        var totalDuration = 0;
        var progressValues = {};
        if (childRecords) {
            for (var i = 0; i < childCount; i++) {
                if ((!childRecords[i].ganttProperties.isMilestone || childRecords[i].hasChildRecords) &&
                    isScheduledTask(childRecords[i].ganttProperties)) {
                    progressValues = this.parent.dataOperation.getParentProgress(childRecords[i]);
                    totalProgress += getValue('totalProgress', progressValues);
                    totalDuration += getValue('totalDuration', progressValues);
                }
                else {
                    milesStoneCount += 1;
                }
            }
            taskCount = childCount - milesStoneCount;
            parentProgress = taskCount > 0 ? Math.round(totalProgress / totalDuration) : 0;
            if (isNaN(parentProgress)) {
                parentProgress = 0;
            }
            this.parent.setRecordValue('progressWidth', this.parent.dataOperation.getProgressWidth(parent.ganttProperties.isAutoSchedule ? parent.ganttProperties.width : parent.ganttProperties.autoWidth, parentProgress), parent.ganttProperties, true);
            this.parent.setRecordValue('progress', Math.floor(parentProgress), parent.ganttProperties, true);
            this.parent.setRecordValue('totalProgress', totalProgress, parent.ganttProperties, true);
            this.parent.setRecordValue('totalDuration', totalDuration, parent.ganttProperties, true);
        }
        this.parent.dataOperation.updateTaskData(parent);
        if (parent.parentItem) {
            this.updateParentProgress(parent.parentItem);
        }
    };
    /**
     * Method to revert cell edit action
     *
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    Edit.prototype.revertCellEdit = function (args) {
        this.parent.editModule.reUpdatePreviousRecords(false, true);
        this.resetEditProperties();
    };
    /**
     * @param {boolean} isRefreshChart .
     * @param {boolean} isRefreshGrid .
     * @returns {void} .
     * @private
     */
    Edit.prototype.reUpdatePreviousRecords = function (isRefreshChart, isRefreshGrid) {
        var collection = this.parent.previousRecords;
        var keys = Object.keys(collection);
        for (var i = 0; i < keys.length; i++) {
            var uniqueId = keys[i];
            var prevTask = collection[uniqueId];
            var originalData = this.parent.getTaskByUniqueID(uniqueId);
            this.copyTaskData(originalData.taskData, prevTask.taskData);
            delete prevTask.taskData;
            this.copyTaskData(originalData.ganttProperties, prevTask.ganttProperties);
            delete prevTask.ganttProperties;
            this.copyTaskData(originalData, prevTask);
            var rowIndex = this.parent.currentViewData.indexOf(originalData);
            if (isRefreshChart) {
                this.parent.chartRowsModule.refreshRow(rowIndex);
            }
            if (isRefreshGrid) {
                var dataId = this.parent.viewType === 'ProjectView' ? originalData.ganttProperties.taskId : originalData.ganttProperties.rowUniqueID;
                this.parent.treeGrid.grid.setRowData(dataId, originalData);
                var row = this.parent.treeGrid.grid.getRowObjectFromUID(this.parent.treeGrid.grid.getDataRows()[rowIndex].getAttribute('data-uid'));
                row.data = originalData;
            }
        }
    };
    /**
     * Copy previous task data value to edited task data
     *
     * @param {object} existing .
     * @param {object} newValue .
     * @returns {void} .
     */
    Edit.prototype.copyTaskData = function (existing, newValue) {
        if (!isNullOrUndefined(newValue)) {
            extend(existing, newValue);
        }
    };
    /**
     * To update schedule date on editing.
     *
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    Edit.prototype.updateScheduleDatesOnEditing = function (args) {
        //..
    };
    /**
     * @param {ITaskbarEditedEventArgs} args .
     * @returns {void} .
     * @private
     */
    Edit.prototype.initiateSaveAction = function (args) {
        var _this = this;
        var eventArgs = {};
        eventArgs.requestType = 'beforeSave';
        eventArgs.data = args.data;
        eventArgs.cancel = false;
        this.createArray = true;
        if (this.parent.toolbarModule && this.parent.undoRedoModule && !this.parent.undoRedoModule['isUndoRedoPerformed'] && this.parent.undoRedoModule['getUndoCollection'].length > 0) {
            this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], true); // enable toolbar items.
        }
        eventArgs.modifiedRecords = this.parent.editedRecords;
        if (!isNullOrUndefined(args.target)) {
            eventArgs.target = args.target;
        }
        eventArgs.modifiedTaskData = getTaskData(this.parent.editedRecords, true);
        if (args.action === 'DrawConnectorLine' || args.action === 'DeleteConnectorLine') {
            eventArgs.action = args.action;
            if (args.action === 'DeleteConnectorLine') {
                this.parent.connectorLineEditModule['isPublicDependencyDelete'] = false;
                if (this.parent.contextMenuModule) {
                    this.parent.contextMenuModule['isCntxtMenuDependencyDelete'] = false;
                }
            }
        }
        var ganttObj = this.parent;
        var currentBaselineStart = __assign({}, eventArgs.data.ganttProperties.baselineStartDate);
        var currentBaselineEnd = __assign({}, eventArgs.data.ganttProperties.baselineEndDate);
        var currentProgress = eventArgs.data.ganttProperties.progress;
        /* eslint-disable-next-line */
        var unModifiedData = JSON.parse(JSON.stringify(eventArgs.data.ganttProperties));
        this.parent.trigger('actionBegin', eventArgs, function (eventArg) {
            if (currentBaselineStart !== eventArg.data['ganttProperties'].baselineStartDate
                || currentBaselineEnd !== eventArg.data['ganttProperties'].baselineEndDate) {
                ganttObj.setRecordValue('baselineLeft', ganttObj.dataOperation.calculateBaselineLeft(eventArg.data['ganttProperties']), eventArg.data['ganttProperties'], true);
                ganttObj.setRecordValue('baselineWidth', ganttObj.dataOperation.calculateBaselineWidth(eventArg.data['ganttProperties']), eventArg.data['ganttProperties'], true);
            }
            if (_this.parent.autoCalculateDateScheduling && unModifiedData !== eventArg.data['ganttProperties'] &&
                !isNullOrUndefined(eventArg.data['parentItem'])) {
                _this.updateParentItemOnEditing();
                _this.parent.dataOperation.updateParentItems(eventArg.data, true);
            }
            var ganttProps = eventArg.data['ganttProperties'];
            var startDate = ganttProps.startDate, endDate = ganttProps.endDate, segments = ganttProps.segments, durationUnit = ganttProps.durationUnit, isAutoSchedule = ganttProps.isAutoSchedule, isMilestone = ganttProps.isMilestone;
            if (startDate && endDate && !segments) {
                var duration = _this.parent.dateValidationModule.getDuration(startDate, endDate, durationUnit, isAutoSchedule, isMilestone, true);
                if (duration !== 0) {
                    ganttProps.isMilestone = false;
                    _this.parent.dateValidationModule.calculateDuration(eventArg.data);
                }
            }
            _this.parent.dataOperation.updateWidthLeft(eventArg.data);
            if (!isNullOrUndefined(_this.parent.taskFields.progress) && currentProgress !== eventArg.data['ganttProperties'].progress) {
                var width = eventArg.data['ganttProperties'].isAutoSchedule ? eventArg.data['ganttProperties'].width :
                    eventArg.data['ganttProperties'].autoWidth;
                _this.parent.setRecordValue('progressWidth', _this.parent.dataOperation.getProgressWidth(width, eventArg.data['ganttProperties'].progress), eventArg.data['ganttProperties'], true);
            }
            _this.parent.chartRowsModule.updateSegment(eventArg.data['ganttProperties'].segments, eventArg.data['ganttProperties'].taskId);
            if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                _this.parent.showMaskRow();
            }
            else {
                _this.parent.showSpinner();
            }
            if (eventArg.cancel) {
                _this.reUpdatePreviousRecords();
                _this.parent.chartRowsModule.refreshRecords([args.data]);
                _this.resetEditProperties(eventArgs);
                // Trigger action complete event with save canceled request type
            }
            else {
                // To update task data for modified records.
                if (eventArg.modifiedRecords) {
                    for (var i = 0; i < eventArg.modifiedRecords.length; i++) {
                        _this.parent.dataOperation.updateTaskData(eventArg.modifiedRecords[i]);
                    }
                }
                eventArg.modifiedTaskData = getTaskData(eventArg.modifiedRecords, null, null, _this.parent);
                if (isRemoteData(_this.parent.dataSource)) {
                    var data = _this.parent.dataSource;
                    var updatedData = {
                        changedRecords: eventArg.modifiedTaskData
                    };
                    var query = _this.parent.query instanceof Query ? _this.parent.query : new Query();
                    var crud = null;
                    var dataAdaptor = data.adaptor;
                    if (!(dataAdaptor instanceof WebApiAdaptor && dataAdaptor instanceof ODataAdaptor) || data.dataSource.batchUrl) {
                        crud = data.saveChanges(updatedData, _this.parent.taskFields.id, null, query);
                    }
                    else {
                        var changedRecords = 'changedRecords';
                        crud = data.update(_this.parent.taskFields.id, updatedData[changedRecords], null, query);
                    }
                    crud.then(function (e) { return _this.dmSuccess(e, args); })
                        .catch(function (e) { return _this.dmFailure(e, args); });
                }
                else {
                    _this.saveSuccess(args);
                }
                if (_this.parent.enableVirtualization && _this.parent.enableTimelineVirtualization) {
                    _this.parent.ganttChartModule['setVirtualHeight']();
                }
                if (_this.parent.undoRedoModule) {
                    _this.parent.previousFlatData = extend([], _this.parent.flatData, [], true);
                }
            }
        });
        this.parent.ganttChartModule.reRenderConnectorLines();
    };
    /* eslint-disable-next-line */
    Edit.prototype.updateEditedFields = function (e) {
        var eLength;
        var rec;
        if (e.changedRecords) {
            eLength = e.changedRecords['length'];
        }
        else {
            eLength = e['length'];
        }
        for (var i = 0; i < eLength; i++) {
            if (e.changedRecords) {
                rec = e.changedRecords[parseInt(i.toString(), 10)];
            }
            else {
                rec = e[parseInt(i.toString(), 10)];
            }
            var _aLength = Object.keys(rec).length;
            for (var j = 0, _a = Object.keys(rec); j < _aLength; j++) {
                var key = _a[parseInt(j.toString(), 10)];
                this.parent.editedRecords[parseInt(i.toString(), 10)]["" + key] = rec["" + key];
                this.parent.editedRecords[parseInt(i.toString(), 10)].taskData["" + key] = rec["" + key];
            }
            this.updateEditedRecordFields(rec, this.parent.editedRecords[parseInt(i.toString(), 10)]);
        }
    };
    /* eslint-disable-next-line */
    Edit.prototype.dmSuccess = function (e, args) {
        this.updateEditedFields(e);
        this.saveSuccess(args);
    };
    Edit.prototype.updateEditedRecordFields = function (rec, editedRecord) {
        var fields = this.parent.taskFields;
        var _aLength = Object.keys(rec).length;
        for (var j = 0, _a = Object.keys(rec); j < _aLength; j++) {
            var key = _a[parseInt(j.toString(), 10)];
            editedRecord["" + key] = rec["" + key];
        }
        if (fields.id !== null) {
            editedRecord.ganttProperties['taskId'] = rec[fields.id];
        }
        if (fields.name !== null) {
            editedRecord.ganttProperties['taskName'] = rec[fields.name];
        }
        if (fields.startDate !== null) {
            editedRecord.ganttProperties['startDate'] = rec[fields.startDate];
        }
        if (fields.endDate !== null) {
            editedRecord.ganttProperties['endDate'] = rec[fields.endDate];
        }
        if (fields.duration !== null) {
            editedRecord.ganttProperties['duration'] = parseFloat(rec[fields.duration]);
        }
        if (fields.durationUnit !== null) {
            editedRecord.ganttProperties['durationUnit'] = rec[fields.durationUnit];
        }
        if (fields.progress !== null) {
            editedRecord.ganttProperties['progress'] = rec[fields.progress];
        }
        if (fields.dependency !== null) {
            editedRecord.ganttProperties['dependency'] = rec[fields.dependency];
        }
        if (fields.parentID !== null) {
            editedRecord.ganttProperties['parentID'] = rec[fields.parentID];
        }
        if (fields.baselineEndDate !== null) {
            editedRecord.ganttProperties['baselineEndDate'] = rec[fields.baselineEndDate];
        }
        if (fields.baselineStartDate !== null) {
            editedRecord.ganttProperties['baselineStartDate'] = rec[fields.baselineStartDate];
        }
        if (fields.resourceInfo !== null) {
            editedRecord.ganttProperties['resources'] = rec[fields.resourceInfo];
        }
    };
    Edit.prototype.dmFailure = function (e, args) {
        if (this.deletedTaskDetails.length) {
            var deleteRecords = this.deletedTaskDetails;
            for (var d = 0; d < deleteRecords.length; d++) {
                deleteRecords[d].isDelete = false;
            }
            this.deletedTaskDetails = [];
        }
        this.reUpdatePreviousRecords(true, true);
        this.resetEditProperties();
        this.parent.trigger('actionFailure', { error: e });
    };
    Edit.prototype.updateSharedTask = function (data) {
        var ids = data.ganttProperties.sharedTaskUniqueIds;
        for (var i = 0; i < ids.length; i++) {
            var editRecord = this.parent.flatData[this.parent.ids.indexOf(ids[i].toString())];
            if (editRecord && editRecord.uniqueID !== data.uniqueID) {
                this.updateGanttProperties(data, editRecord);
                this.parent.setRecordValue('taskData', data.taskData, editRecord, true);
                this.parent.dataOperation.updateTaskData(editRecord);
                this.parent.dataOperation.updateResourceName(editRecord);
                if (!isNullOrUndefined(editRecord.parentItem)) {
                    this.parent.dataOperation.updateParentItems(editRecord.parentItem);
                }
            }
        }
    };
    /**
     * Method for save action success for local and remote data
     *
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     */
    Edit.prototype.saveSuccess = function (args) {
        var eventArgs = {};
        if (this.parent.timelineSettings.updateTimescaleView) {
            var tempArray = this.parent.editedRecords;
            this.parent.timelineModule.updateTimeLineOnEditing([tempArray], args.action);
        }
        if (this.parent.viewType === 'ResourceView') {
            if (args.action === 'TaskbarEditing' || args.action === 'DrawConnectorLine' || args.action === 'DeleteConnectorLine') {
                this.updateSharedTask(args.data);
            }
            else if (args.action === 'DialogEditing' || args.action === 'CellEditing' || args.action === 'methodUpdate') {
                if (this.parent.editModule.dialogModule.isResourceUpdate) {
                    /* eslint-disable-next-line */
                    this.updateResoures(this.parent.editModule.dialogModule.previousResource, args.data.ganttProperties.resourceInfo, args.data);
                    this.updateSharedTask(args.data);
                    this.isTreeGridRefresh = true;
                }
                else {
                    this.updateSharedTask(args.data);
                }
            }
            // method to update the edited parent records
            for (var k = 0; k < this.updateParentRecords.length; k++) {
                this.parent.dataOperation.updateParentItems(this.updateParentRecords[k]);
            }
            this.updateParentRecords = [];
            this.parent.editModule.dialogModule.isResourceUpdate = false;
            this.parent.editModule.dialogModule.previousResource = [];
        }
        var criticalModule = this.parent.criticalPathModule;
        if (this.parent.enableCriticalPath && criticalModule && criticalModule.criticalPathCollection) {
            criticalModule.showCriticalPath(true);
            criticalModule.criticalConnectorLine(criticalModule.criticalPathCollection, criticalModule.detailPredecessorCollection, true, criticalModule.predecessorCollectionTaskIds);
        }
        if (!this.isTreeGridRefresh) {
            if (this.parent.editSettings.allowEditing && this.parent.treeGrid.element.getElementsByClassName('e-editedbatchcell').length > 0) {
                if (!this.parent.treeGrid.grid.element.querySelector('form').ej2_instances[0].validate()) {
                    setValue('isEdit', false, this.parent.treeGrid.grid);
                    this.parent.editModule.cellEditModule.isCellEdit = false;
                }
                this.parent.treeGrid.endEdit();
            }
            this.parent.chartRowsModule.refreshRecords(this.parent.editedRecords);
            if (!this.parent.allowTaskbarOverlap && this.parent.showOverAllocation) {
                this.parent.contentHeight = this.parent['element'].getElementsByClassName('e-content')[0].children[0]['offsetHeight'];
                this.parent.ganttChartModule.chartBodyContent.style.height = this.parent.contentHeight + 'px';
                this.parent.ganttChartModule.renderRangeContainer(this.parent.currentViewData);
                if (this.parent.taskFields.dependency) {
                    this.parent.ganttChartModule.reRenderConnectorLines();
                }
            }
            if ((this.parent.isConnectorLineUpdate || (this.parent.undoRedoModule && this.parent.undoRedoModule['currentAction'] &&
                this.parent.undoRedoModule['currentAction']['connectedRecords'])) && !isNullOrUndefined(this.parent.connectorLineEditModule)) {
                this.parent.updatedConnectorLineCollection = [];
                this.parent.connectorLineIds = [];
                this.parent.connectorLineEditModule.refreshEditedRecordConnectorLine(this.parent.editedRecords);
                this.updateScheduleDatesOnEditing(args);
            }
        }
        if (!this.parent.editSettings.allowTaskbarEditing || (this.parent.editSettings.allowTaskbarEditing &&
            !this.taskbarEditModule.dependencyCancel)) {
            eventArgs.requestType = 'save';
            eventArgs.data = args.data;
            eventArgs.modifiedRecords = this.parent.editedRecords;
            eventArgs.modifiedTaskData = getTaskData(this.parent.editedRecords, null, null, this.parent);
            // Prevent currentviewdata index update action while allowTaskbarDragAndDrop is enabled- issue-942005
            if (!this.parent.allowTaskbarDragAndDrop && this.parent.rowDragAndDropModule &&
                this.parent.rowDragAndDropModule['dropPosition'] !== 'middleSegment') {
                this.updateRowIndex();
            }
            if (!isNullOrUndefined(args.action)) {
                setValue('action', args.action, eventArgs);
            }
            if (args.action === 'TaskbarEditing') {
                eventArgs.taskBarEditAction = args.taskBarEditAction;
            }
            this.endEditAction(args);
            this.parent.trigger('actionComplete', eventArgs);
            if (this.parent.allowTaskbarDragAndDrop && this.parent.rowDragAndDropModule && this.parent.rowDragAndDropModule['draggedRecord']) {
                this.parent.rowDragAndDropModule['draggedRecord'] = null;
            }
            if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                this.parent.hideMaskRow();
            }
            else {
                this.parent.hideSpinner();
            }
        }
        else {
            this.taskbarEditModule.dependencyCancel = false;
            this.resetEditProperties();
        }
        if (this.parent.viewType === 'ResourceView' && this.isTreeGridRefresh) {
            this.parent.treeGrid.parentData = [];
            this.parent.updatedConnectorLineCollection = [];
            this.parent.connectorLineIds = [];
            this.parent.predecessorModule.createConnectorLinesCollection(this.parent.flatData);
            this.parent.treeGrid.refresh();
            this.isTreeGridRefresh = false;
        }
        this.parent.editedRecords = [];
    };
    Edit.prototype.updateResoures = function (prevResource, currentResource, updateRecord) {
        var flatRecords = this.parent.flatData;
        var currentLength = currentResource ? currentResource.length : 0;
        var previousLength = prevResource ? prevResource.length : 0;
        if (currentLength === 0 && previousLength === 0) {
            return;
        }
        for (var index = 0; index < currentLength; index++) {
            var recordIndex = [];
            var resourceID = parseInt(currentResource[index][this.parent.resourceFields.id], 10).toString();
            if (resourceID === 'NaN') {
                resourceID = currentResource[index][this.parent.resourceFields.id];
            }
            if (!isNullOrUndefined(prevResource)) {
                for (var i = 0; i < prevResource.length; i++) {
                    var prevResourceID = parseInt(prevResource[i][this.parent.resourceFields.id], 10).toString();
                    if (prevResourceID === 'NaN') {
                        prevResourceID = prevResource[i][this.parent.resourceFields.id];
                    }
                    if (prevResourceID === resourceID) {
                        recordIndex.push(i);
                        break;
                    }
                }
            }
            if (recordIndex.length === 0) {
                var parentRecord = flatRecords[this.parent.getTaskIds().indexOf('R' + resourceID)];
                if (parentRecord) {
                    this.addNewRecord(updateRecord, parentRecord);
                }
            }
            else {
                var record1 = parseInt(recordIndex[0].toString(), 10);
                if (record1.toString() === 'NaN') {
                    record1 = recordIndex[0].toString();
                }
                prevResource.splice(record1, 1);
            }
        }
        var prevLength = prevResource ? prevResource.length : 0;
        for (var index = 0; index < prevLength; index++) {
            var taskID = updateRecord.ganttProperties.taskId;
            var resourceID = prevResource[index][this.parent.resourceFields.id];
            var record = flatRecords[this.parent.getTaskIds().indexOf('R' + resourceID)];
            if (!isNullOrUndefined(record)) {
                for (var j = 0; j < record.childRecords.length; j++) {
                    if (record.childRecords[j].ganttProperties.taskId === taskID) {
                        this.removeChildRecord(record.childRecords[j]);
                    }
                }
            }
        }
        if (currentLength > 0) {
            var parentTask = this.parent.getParentTask(updateRecord.parentItem);
            if (parentTask) {
                if (parentTask.ganttProperties.taskName === this.parent.localeObj.getConstant('unassignedTask')) {
                    this.removeChildRecord(updateRecord);
                }
            }
        }
        //Assign resource to unassigned task
        if (currentLength === 0) {
            this.checkWithUnassignedTask(updateRecord);
        }
        if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed'] && this.parent.flatData[this.parent.flatData.length - 1].ganttProperties.taskName === this.parent.localeObj.getConstant('unassignedTask')) {
            this.parent.flatData.splice(this.parent.flatData.length - 1, 1);
            this.parent.currentViewData.splice(this.parent.currentViewData.length - 1, 1);
            this.parent.taskIds.splice(this.parent.flatData.length - 1, 1);
            this.parent.ids.splice(this.parent.flatData.length - 1, 1);
        }
    };
    /**
     * @param {IGanttData} updateRecord .
     * @returns {void} .
     * @private
     */
    Edit.prototype.checkWithUnassignedTask = function (updateRecord) {
        var unassignedTasks = null;
        // Block for check the unassigned task.
        for (var i = 0; i < this.parent.flatData.length; i++) {
            if (this.parent.flatData[i].ganttProperties.taskName === this.parent.localeObj.getConstant('unassignedTask')) {
                unassignedTasks = this.parent.flatData[i];
            }
        }
        if (!isNullOrUndefined(unassignedTasks)) {
            this.addNewRecord(updateRecord, unassignedTasks);
        }
        else {
            // Block for create the unassigned task.
            var unassignTaskObj = {};
            unassignTaskObj[this.parent.taskFields.id] = 0;
            unassignTaskObj[this.parent.taskFields.name] = this.parent.localeObj.getConstant('unassignedTask');
            var beforeEditStatus = this.parent.isOnEdit;
            this.parent.isOnEdit = false;
            var cAddedRecord = this.parent.dataOperation.createRecord(unassignTaskObj, 0);
            this.parent.isOnEdit = beforeEditStatus;
            this.addRecordAsBottom(cAddedRecord);
            var parentRecord = this.parent.flatData[this.parent.flatData.length - 1];
            var index = this.parent.flatData.indexOf(parentRecord);
            var childIndex = (index + 1) + parentRecord.childRecords.length;
            updateRecord.index = childIndex;
            updateRecord.level = parentRecord.level + 1;
            this.addNewRecord(updateRecord, parentRecord);
            /* eslint-disable-next-line */
            var source = this.parent.dataSource;
            source.push(updateRecord.taskData);
        }
        var updatedData = this.parent.currentViewData.filter(function (data) {
            return (data.ganttProperties.taskId === updateRecord.ganttProperties.taskId &&
                (data.hasChildRecords === updateRecord.hasChildRecords));
        })[0];
        updateRecord.parentItem = updatedData.parentItem;
        updateRecord.parentUniqueID = updatedData.parentUniqueID;
    };
    Edit.prototype.addRecordAsBottom = function (cAddedRecord) {
        var recordIndex1 = this.parent.flatData.length;
        this.parent.currentViewData.splice(recordIndex1 + 1, 0, cAddedRecord);
        this.parent.flatData.splice(recordIndex1 + 1, 0, cAddedRecord);
        this.parent.ids.splice(recordIndex1 + 1, 0, cAddedRecord.ganttProperties.rowUniqueID.toString());
        var taskId = cAddedRecord.level === 0 ? 'R' + cAddedRecord.ganttProperties.taskId : 'T' + cAddedRecord.ganttProperties.taskId;
        this.parent.getTaskIds().splice(recordIndex1 + 1, 0, taskId);
        this.updateTreeGridUniqueID(cAddedRecord, 'add');
    };
    Edit.prototype.addNewRecord = function (updateRecord, parentRecord) {
        var cAddedRecord = null;
        cAddedRecord = extend({}, {}, updateRecord, true);
        this.parent.setRecordValue('uniqueID', this.parent.dataOperation['getGanttUid'](this.parent.element.id + '_data_'), cAddedRecord);
        this.parent.setRecordValue('uniqueID', cAddedRecord.uniqueID, cAddedRecord.ganttProperties, true);
        var uniqueId = cAddedRecord.uniqueID.replace(this.parent.element.id + '_data_', '');
        this.parent.setRecordValue('rowUniqueID', uniqueId, cAddedRecord);
        this.parent.setRecordValue('rowUniqueID', uniqueId, cAddedRecord.ganttProperties, true);
        this.parent.setRecordValue('level', 1, cAddedRecord);
        if (this.parent.taskFields.parentID) {
            this.parent.setRecordValue('parentId', parentRecord.ganttProperties.taskId, cAddedRecord.ganttProperties, true);
        }
        this.parent.setRecordValue('parentItem', this.parent.dataOperation.getCloneParent(parentRecord), cAddedRecord);
        var parentUniqId = cAddedRecord.parentItem ? cAddedRecord.parentItem.uniqueID : null;
        this.parent.setRecordValue('parentUniqueID', parentUniqId, cAddedRecord);
        updateRecord.ganttProperties.sharedTaskUniqueIds.push(uniqueId);
        cAddedRecord.ganttProperties.sharedTaskUniqueIds = updateRecord.ganttProperties.sharedTaskUniqueIds;
        this.addRecordAsChild(parentRecord, cAddedRecord);
    };
    Edit.prototype.removeChildRecord = function (record) {
        var gObj = this.parent;
        var data = [];
        if (this.parent.dataSource instanceof DataManager && this.parent.dataSource.dataSource.json.length > 0) {
            data = this.parent.dataSource.dataSource.json;
        }
        else {
            data = this.parent.currentViewData;
        }
        var dataSource = this.parent.dataSource;
        var deletedRow = record;
        var flatParentData = this.parent.getParentTask(deletedRow.parentItem);
        if (deletedRow) {
            if (deletedRow.parentItem) {
                var deleteChildRecords = flatParentData ? flatParentData.childRecords : [];
                var childIndex = 0;
                if (deleteChildRecords && deleteChildRecords.length > 0) {
                    if (deleteChildRecords.length === 1) {
                        //For updating the parent record which has no child reords.
                        this.parent.isOnDelete = true;
                        deleteChildRecords[0].isDelete = true;
                        this.parent.dataOperation.updateParentItems(flatParentData);
                        this.parent.isOnDelete = false;
                        deleteChildRecords[0].isDelete = false;
                    }
                    childIndex = deleteChildRecords.indexOf(deletedRow);
                    flatParentData.childRecords.splice(childIndex, 1);
                    // collection for updating parent record
                    this.updateParentRecords.push(flatParentData);
                }
            }
            if (deletedRow.ganttProperties.sharedTaskUniqueIds.length) {
                var uniqueIDIndex = deletedRow.ganttProperties.sharedTaskUniqueIds.indexOf(deletedRow.ganttProperties.rowUniqueID);
                deletedRow.ganttProperties.sharedTaskUniqueIds.splice(uniqueIDIndex, 1);
            }
            this.updateTreeGridUniqueID(deletedRow, 'delete');
            //method to delete the record from datasource collection
            if (!this.parent.taskFields.parentID) {
                var deleteRecordIDs = [];
                deleteRecordIDs.push(deletedRow.ganttProperties.rowUniqueID.toString());
                if (this.parent.viewType === 'ProjectView') {
                    this.parent.editModule.removeFromDataSource(deleteRecordIDs);
                }
            }
            var flatRecordIndex = this.parent.flatData.indexOf(deletedRow);
            if (gObj.taskFields.parentID) {
                var idx = void 0;
                var ganttData = this.parent.currentViewData;
                for (var i = 0; i < ganttData.length; i++) {
                    if (ganttData[i].ganttProperties.rowUniqueID === deletedRow.ganttProperties.rowUniqueID) {
                        idx = i;
                    }
                }
                if (idx !== -1) {
                    if (dataSource.length > 0) {
                        dataSource.splice(idx, 1);
                    }
                    data.splice(idx, 1);
                    this.parent.flatData.splice(flatRecordIndex, 1);
                    this.parent.ids.splice(flatRecordIndex, 1);
                    this.parent.getTaskIds().splice(flatRecordIndex, 1);
                }
            }
            var recordIndex = data.indexOf(deletedRow);
            if (!gObj.taskFields.parentID) {
                var deletedRecordCount = this.parent.editModule.getChildCount(deletedRow, 0);
                data.splice(recordIndex, deletedRecordCount + 1);
                this.parent.flatData.splice(flatRecordIndex, deletedRecordCount + 1);
                this.parent.ids.splice(flatRecordIndex, deletedRecordCount + 1);
                this.parent.getTaskIds().splice(flatRecordIndex, deletedRecordCount + 1);
            }
            if (deletedRow.parentItem && flatParentData && flatParentData.childRecords && !flatParentData.childRecords.length) {
                this.parent.setRecordValue('expanded', false, flatParentData);
                this.parent.setRecordValue('hasChildRecords', false, flatParentData);
            }
        }
    };
    // Method to add new record after resource edit
    Edit.prototype.addRecordAsChild = function (droppedRecord, draggedRecord) {
        var gObj = this.parent;
        var recordIndex1 = this.parent.flatData.indexOf(droppedRecord);
        var childRecords = this.parent.editModule.getChildCount(droppedRecord, 0);
        var childRecordsLength;
        var spliceIndex;
        var parentTask = this.parent.getTaskByUniqueID(draggedRecord.parentItem.uniqueID);
        if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed'] && this.dialogModule['indexes'] && this.dialogModule['indexes'].deletedIndexes && this.dialogModule['indexes'].deletedIndexes.length > 0) {
            if (parentTask.ganttProperties.taskName === this.parent.localeObj.getConstant('unassignedTask')) {
                childRecordsLength = this.parent.taskIds.length + 1;
            }
            else {
                for (var j = 0; j < this.dialogModule['indexes'].deletedIndexes.length; j++) {
                    if (this.dialogModule['indexes'].deletedIndexes[j].data.parentUniqueID === draggedRecord.parentUniqueID && draggedRecord.ganttProperties.taskId === this.dialogModule['indexes'].deletedIndexes[j].data.ganttProperties.taskId) {
                        var toIndex = this.dialogModule['indexes'].deletedIndexes[j].index;
                        if (this.dialogModule['indexes'].deletedIndexes[j].position === 'above') {
                            (childRecordsLength = toIndex);
                        }
                        else {
                            (childRecordsLength = toIndex + 1);
                        }
                        for (var i = 0; i < droppedRecord.childRecords.length; i++) {
                            if ('T' + droppedRecord.childRecords[i].ganttProperties.taskId === this.dialogModule['indexes'].deletedIndexes[j].id) {
                                if (this.dialogModule['indexes'].deletedIndexes[j].position === 'above') {
                                    spliceIndex = i;
                                }
                                else {
                                    spliceIndex = i + 1;
                                }
                                break;
                            }
                        }
                        break;
                    }
                    else if (this.dialogModule['indexes'].deletedIndexes[j].data.parentUniqueID !== draggedRecord.parentUniqueID && draggedRecord.ganttProperties.taskId === this.dialogModule['indexes'].deletedIndexes[j].data.ganttProperties.taskId) {
                        var draggedParent = this.parent.getTaskByUniqueID(draggedRecord.parentItem.uniqueID);
                        childRecordsLength = draggedParent.index + draggedParent.childRecords.length + 1;
                        break;
                    }
                }
            }
        }
        else if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed'] && parentTask.ganttProperties.taskName === this.parent.localeObj.getConstant('unassignedTask') && this.parent.undoRedoModule['currentAction']['deletedRecordsDetails']) {
            for (var i = 0; i < this.parent.undoRedoModule['currentAction']['deletedRecordsDetails'].length; i++) {
                if (this.parent.undoRedoModule['currentAction']['deletedRecordsDetails'][i].data.ganttProperties.taskId === draggedRecord.ganttProperties.taskId) {
                    if (parentTask.index) {
                        childRecordsLength = this.parent.undoRedoModule['currentAction']['deletedRecordsDetails'][i].data.index;
                        spliceIndex = childRecordsLength - parentTask.index - 1;
                    }
                    else {
                        childRecordsLength = (isNullOrUndefined(childRecords) ||
                            childRecords === 0) ? recordIndex1 + 1 :
                            childRecords + recordIndex1 + 1;
                        spliceIndex = 0;
                    }
                    break;
                }
            }
        }
        else if (!isNullOrUndefined(this.addRowIndex) && this.addRowPosition && droppedRecord.childRecords && this.addRowPosition !== 'Child') {
            var dropChildRecord = droppedRecord.childRecords[this.addRowIndex];
            var position = this.addRowPosition === 'Above' || this.addRowPosition === 'Below' ? this.addRowPosition :
                'Child';
            childRecordsLength = dropChildRecord ? this.addRowIndex + recordIndex1 + 1 :
                childRecords + recordIndex1 + 1;
            childRecordsLength = position === 'Above' ? childRecordsLength : childRecordsLength + 1;
        }
        else {
            childRecordsLength = (isNullOrUndefined(childRecords) ||
                childRecords === 0) ? recordIndex1 + 1 :
                childRecords + recordIndex1 + 1;
        }
        //this.ganttData.splice(childRecordsLength, 0, this.draggedRecord);
        this.parent.currentViewData.splice(childRecordsLength, 0, draggedRecord);
        this.parent.flatData.splice(childRecordsLength, 0, draggedRecord);
        this.parent.ids.splice(childRecordsLength, 0, draggedRecord.ganttProperties.rowUniqueID.toString());
        this.updateTreeGridUniqueID(draggedRecord, 'add');
        var recordId = draggedRecord.level === 0 ? 'R' + draggedRecord.ganttProperties.taskId : 'T' + draggedRecord.ganttProperties.taskId;
        this.parent.getTaskIds().splice(childRecordsLength, 0, recordId);
        if (!droppedRecord.hasChildRecords) {
            this.parent.setRecordValue('hasChildRecords', true, droppedRecord);
            this.parent.setRecordValue('expanded', true, droppedRecord);
            if (!droppedRecord.childRecords.length) {
                droppedRecord.childRecords = [];
                if (!gObj.taskFields.parentID && isNullOrUndefined(droppedRecord.taskData[this.parent.taskFields.child])) {
                    droppedRecord.taskData[this.parent.taskFields.child] = [];
                }
            }
        }
        if (spliceIndex >= 0) {
            droppedRecord.childRecords.splice(spliceIndex, 0, draggedRecord);
        }
        else {
            droppedRecord.childRecords.splice(droppedRecord.childRecords.length, 0, draggedRecord);
        }
        if (!isNullOrUndefined(draggedRecord) && !this.parent.taskFields.parentID
            && !isNullOrUndefined(droppedRecord.taskData[this.parent.taskFields.child])) {
            droppedRecord.taskData[this.parent.taskFields.child].splice(droppedRecord.childRecords.length, 0, draggedRecord.taskData);
        }
        if (!isNullOrUndefined(draggedRecord.parentItem)) {
            //collection to update the parent records
            this.updateParentRecords.push(droppedRecord);
        }
    };
    Edit.prototype.resetEditProperties = function (args) {
        this.parent.currentEditedArgs = {};
        this.resetValidateArgs();
        this.parent.editedTaskBarItem = null;
        this.parent.isOnEdit = false;
        this.parent.predecessorModule.validatedChildItems = [];
        this.parent.isConnectorLineUpdate = false;
        this.parent.editedTaskBarItem = null;
        this.taskbarMoved = false;
        this.predecessorUpdated = false;
        if (!isNullOrUndefined(this.dialogModule) && (isNullOrUndefined(args) ||
            (!isNullOrUndefined(args) && args['requestType'] === 'beforeSave' && !args['cancel']))) {
            if (this.dialogModule.dialog && !this.dialogModule.dialogObj.isDestroyed) {
                this.dialogModule.dialogObj.hide();
            }
            this.dialogModule.dialogClose();
        }
        this.parent.hideSpinner();
        this.parent.initiateEditAction(false);
    };
    /**
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     * @private
     */
    Edit.prototype.endEditAction = function (args) {
        this.resetEditProperties();
        if (args.action === 'TaskbarEditing') {
            this.parent.trigger('taskbarEdited', args);
        }
        else if (args.action === 'CellEditing') {
            this.parent.trigger('endEdit', args);
        }
        else if (args.action === 'DialogEditing') {
            if (this.dialogModule.dialog && !this.dialogModule.dialogObj.isDestroyed) {
                this.dialogModule.dialogObj.hide();
            }
            this.dialogModule.dialogClose();
        }
    };
    // eslint-disable-next-line
    Edit.prototype.saveFailed = function (args) {
        this.reUpdatePreviousRecords();
        this.parent.hideSpinner();
        //action failure event trigger
    };
    /**
     * To render delete confirmation dialog
     *
     * @returns {void} .
     */
    Edit.prototype.renderDeleteConfirmDialog = function () {
        var dialogObj = new Dialog({
            width: '320px',
            isModal: true,
            visible: false,
            enableRtl: this.parent.enableRtl,
            content: this.parent.localeObj.getConstant('confirmDelete'),
            buttons: [
                {
                    click: this.confirmDeleteOkButton.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('okText'), isPrimary: true }
                },
                {
                    click: this.closeConfirmDialog.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            target: this.parent.element,
            animationSettings: { effect: 'None' }
        });
        dialogObj.appendTo('#' + this.parent.element.id + '_deleteConfirmDialog');
        this.confirmDialog = dialogObj;
    };
    Edit.prototype.closeConfirmDialog = function () {
        this.confirmDialog.hide();
    };
    Edit.prototype.confirmDeleteOkButton = function () {
        this.deleteSelectedItems();
        this.confirmDialog.hide();
        var focussedElement = this.parent.element.querySelector('.e-treegrid');
        focussedElement.focus();
    };
    /**
     * @returns {void} .
     * @private
     */
    Edit.prototype.startDeleteAction = function () {
        if (this.parent.editSettings.allowDeleting && !this.parent.readOnly) {
            if (this.parent.editSettings.showDeleteConfirmDialog) {
                this.confirmDialog.show();
            }
            else {
                this.deleteSelectedItems();
                var focusingElement = this.parent.element.querySelector('.e-treegrid');
                focusingElement.focus();
            }
        }
    };
    /**
     *
     * @param {IGanttData[]} selectedRecords - Defines the deleted records
     * @returns {void} .
     * Method to delete the records from resource view Gantt.
     */
    Edit.prototype.deleteResourceRecords = function (selectedRecords) {
        var _this = this;
        var deleteRecords = [];
        var _loop_2 = function (i) {
            if (selectedRecords[i].parentItem) {
                if (selectedRecords[i].ganttProperties.sharedTaskUniqueIds.length === 1) {
                    var data = selectedRecords[i];
                    var ids = data.ganttProperties.sharedTaskUniqueIds;
                    for (var j = 0; j < ids.length; j++) {
                        if (this_2.parent.ids.indexOf(ids[j].toString()) !== -1) {
                            deleteRecords.push(this_2.parent.flatData[this_2.parent.ids.indexOf(ids[j].toString())]);
                        }
                        else if (this_2.parent.undoRedoModule && this_2.parent.undoRedoModule['isUndoRedoPerformed'] && this_2.parent.undoRedoModule['currentAction'] && this_2.parent.undoRedoModule['currentAction']['action'] === 'Delete') {
                            deleteRecords.push(this_2.parent.flatData[this_2.parent.taskIds.indexOf('T' + selectedRecords[i].ganttProperties.taskId)]);
                        }
                    }
                    if (this_2.parent.ids.indexOf(data.ganttProperties.rowUniqueID) !== -1 &&
                        deleteRecords.indexOf(this_2.parent.flatData[this_2.parent.ids.indexOf(data.ganttProperties.rowUniqueID)]) === -1) {
                        deleteRecords.push(this_2.parent.flatData[this_2.parent.ids.indexOf(data.ganttProperties.rowUniqueID)]);
                    }
                }
                else if (selectedRecords[i].ganttProperties.sharedTaskUniqueIds.length > 1) {
                    selectedRecords.forEach(function (record) {
                        record.ganttProperties.sharedTaskUniqueIds.forEach(function (uniqueId) {
                            deleteRecords.push(_this.parent.getTaskByUniqueID(_this.parent.element.id + '_data_' + uniqueId));
                        });
                    });
                }
            }
            else {
                var resourceParent = this_2.parent.flatData.filter(function (data) {
                    return (data.ganttProperties.taskId === selectedRecords[i].ganttProperties.taskId &&
                        data.hasChildRecords);
                })[0];
                if (!isNullOrUndefined(resourceParent)) {
                    deleteRecords.push(resourceParent);
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < selectedRecords.length; i++) {
            _loop_2(i);
        }
        this.deleteRow(deleteRecords);
    };
    Edit.prototype.add = function (record, totalRecords) {
        totalRecords.push(record);
        if (record.hasChildRecords) {
            var child = record.childRecords;
            for (var i = 0; i < child.length; i++) {
                this.add(child[i], totalRecords);
            }
        }
        else {
            if (totalRecords.indexOf(record) === -1) {
                totalRecords.push(record);
            }
        }
    };
    Edit.prototype.deleteSelectedItems = function () {
        if (!this.isFromDeleteMethod) {
            var selectedRecords = [];
            if (this.parent.selectionSettings.mode !== 'Cell') {
                selectedRecords = this.parent.selectionModule.getSelectedRecords();
            }
            else if (this.parent.selectionSettings.mode === 'Cell') {
                selectedRecords = this.parent.selectionModule.getCellSelectedRecords();
            }
            if (this.parent.viewType === 'ResourceView') {
                this.deleteResourceRecords(selectedRecords);
            }
            else {
                this.deleteRow(selectedRecords);
            }
        }
        else {
            if (this.targetedRecords.length) {
                if (this.parent.viewType === 'ResourceView') {
                    this.deleteResourceRecords(this.targetedRecords);
                }
                else {
                    this.deleteRow(this.targetedRecords);
                }
            }
            this.isFromDeleteMethod = false;
        }
    };
    /**
     * Method to delete record.
     *
     * @param {number | string | number[] | string[] | IGanttData | IGanttData[]} taskDetail - Defines the details of data to delete.
     * @returns {void} .
     * @public
     */
    Edit.prototype.deleteRecord = function (taskDetail) {
        this.isFromDeleteMethod = true;
        var variableType = typeof (taskDetail);
        this.targetedRecords = [];
        switch (variableType) {
            case 'number':
            case 'string':
                {
                    var taskId = taskDetail.toString();
                    if (this.parent.viewType === 'ResourceView') {
                        if (!isNullOrUndefined(taskId) && this.parent.getTaskIds().indexOf('T' + taskId) !== -1) {
                            this.targetedRecords.push(this.parent.flatData[this.parent.getTaskIds().indexOf('T' + taskId)]);
                        }
                    }
                    else {
                        if (!isNullOrUndefined(taskId) && this.parent.ids.indexOf(taskId) !== -1) {
                            this.targetedRecords.push(this.parent.getRecordByID(taskId));
                        }
                    }
                    break;
                }
            case 'object':
                if (!Array.isArray(taskDetail)) {
                    this.targetedRecords.push(taskDetail.valueOf());
                }
                else {
                    this.updateTargetedRecords(taskDetail);
                }
                break;
            default:
        }
        this.startDeleteAction();
    };
    /**
     * To update 'targetedRecords collection' from given array collection
     *
     * @param {object[]} taskDetailArray .
     * @returns {void} .
     */
    Edit.prototype.updateTargetedRecords = function (taskDetailArray) {
        if (taskDetailArray.length) {
            var variableType = typeof (taskDetailArray[0]);
            if (variableType === 'object') {
                this.targetedRecords = taskDetailArray;
            }
            else {
                // Get record from array of task ids
                for (var i = 0; i < taskDetailArray.length; i++) {
                    var id = taskDetailArray[i].toString();
                    if (this.parent.viewType === 'ResourceView') {
                        if (!isNullOrUndefined(id) && this.parent.getTaskIds().indexOf('T' + id) !== -1) {
                            this.targetedRecords.push(this.parent.flatData[this.parent.getTaskIds().indexOf('T' + id)]);
                        }
                    }
                    else if (!isNullOrUndefined(id) && this.parent.ids.indexOf(id) !== -1) {
                        this.targetedRecords.push(this.parent.getRecordByID(id));
                    }
                }
            }
        }
    };
    Edit.prototype.deleteRow = function (tasks) {
        var _this = this;
        var rowItems = tasks && tasks.length ? tasks :
            this.parent.selectionModule.getSelectedRecords();
        this.parent.addDeleteRecord = true;
        if (rowItems.length) {
            this.parent.isOnDelete = true;
            rowItems.forEach(function (item) {
                if (_this.parent.undoRedoModule && _this.parent.undoRedoModule['isUndoRedoPerformed']) {
                    var rec = void 0;
                    if (_this.parent.viewType === 'ProjectView') {
                        rec = _this.parent.getRecordByID(item.ganttProperties.taskId);
                    }
                    else {
                        rec = _this.parent.flatData[_this.parent.taskIds.indexOf((item.hasChildRecords ? 'R' : 'T') + item.ganttProperties.taskId)];
                    }
                    rec.isDelete = true;
                }
                item.isDelete = true;
            });
            if (this.parent.viewType === 'ResourceView' && !tasks.length) {
                rowItems = [];
            }
            if (this.parent.undoRedoModule && !this.parent.undoRedoModule['isUndoRedoPerformed'] && this.parent['isUndoRedoItemPresent']('Delete')) {
                if (this.parent.undoRedoModule['redoEnabled'] && !this.parent.undoRedoModule['isUndoRedoPerformed']) {
                    this.parent.undoRedoModule['disableRedo']();
                    this.parent.undoRedoModule['getUndoCollection'][0] = [];
                }
                if (!this.parent.undoRedoModule['isUndoRedoPerformed']) {
                    this.parent.undoRedoModule['createUndoCollection']();
                }
                var records = {};
                records['action'] = 'Delete';
                records['deletedRecordsDetails'] = [];
                this.parent.undoRedoModule['findPosition'](extend([], [], rowItems, true), records, 'deletedRecordsDetails');
                this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = records;
            }
            var _loop_3 = function (i) {
                var deleteRecord = rowItems[i];
                if (this_3.deletedTaskDetails.indexOf(deleteRecord) !== -1) {
                    return "continue";
                }
                var deleteItems = [deleteRecord];
                if (this_3.parent.viewType === 'ResourceView' && this_3.parent.undoRedoModule && this_3.parent.undoRedoModule['isUndoRedoPerformed'] && rowItems[i].ganttProperties.resourceInfo && rowItems[i].ganttProperties.resourceInfo.length > 1) {
                    deleteItems = [];
                    if (!rowItems[i].hasChildRecords) {
                        var id_1 = 'T' + rowItems[i].ganttProperties.taskId;
                        this_3.parent.taskIds.reduce(function (e, j) {
                            if (e === id_1) {
                                deleteItems.push(this.parent.flatData[j]);
                            }
                        }.bind(this_3), []);
                    }
                }
                for (var j = 0; j < deleteItems.length; j++) {
                    var parentTask = this_3.parent.getParentTask(deleteItems[j].parentItem);
                    if (deleteItems[j].parentItem) {
                        var childRecord = void 0;
                        if (!isNullOrUndefined(parentTask)) {
                            childRecord = parentTask.childRecords;
                            var filteredRecord = childRecord.length === 1 ?
                                childRecord : childRecord.filter(function (data) {
                                return !data.isDelete;
                            });
                            if (filteredRecord.length > 0) {
                                this_3.parent.dataOperation.updateParentItems(deleteItems[j].parentItem);
                            }
                        }
                    }
                    var predecessor = deleteItems[j].ganttProperties.predecessor;
                    var canDeletePredecessor = true;
                    if (this_3.parent.viewType === 'ResourceView' && parentTask && parentTask.ganttProperties.taskName !==
                        this_3.parent.localeObj.getConstant('unassignedTask')) {
                        canDeletePredecessor = false;
                    }
                    if (predecessor && predecessor.length && canDeletePredecessor) {
                        this_3.removePredecessorOnDelete(deleteItems[j]);
                    }
                    this_3.deletedTaskDetails.push(deleteItems[j]);
                    if (deleteItems[j].hasChildRecords) {
                        this_3.deleteChildRecords(deleteItems[j]);
                    }
                }
            };
            var this_3 = this;
            for (var i = 0; i < rowItems.length; i++) {
                _loop_3(i);
            }
            if (this.parent.selectionModule && this.parent.allowSelection) {
                // clear selection
                this.parent.selectionModule.clearSelection();
            }
            var delereArgs = {};
            delereArgs.deletedRecordCollection = this.deletedTaskDetails;
            delereArgs.updatedRecordCollection = this.parent.editedRecords;
            delereArgs.cancel = false;
            delereArgs.action = 'delete';
            this.initiateDeleteAction(delereArgs);
            this.parent.isOnDelete = false;
        }
        if (!isNullOrUndefined(this.parent.toolbarModule)) {
            this.parent.toolbarModule.refreshToolbarItems();
        }
    };
    Edit.prototype.removePredecessorOnDelete = function (record) {
        var predecessors = record.ganttProperties.predecessor;
        for (var i = 0; i < predecessors.length; i++) {
            var predecessor = predecessors[i];
            var recordId = this.parent.viewType === 'ResourceView' ? record.ganttProperties.taskId :
                record.ganttProperties.rowUniqueID;
            if (predecessor.from.toString() === recordId.toString()) {
                var toRecord = this.parent.connectorLineModule.getRecordByID(predecessor.to.toString());
                if (!isNullOrUndefined(toRecord)) {
                    var toRecordPredcessor = extend([], [], toRecord.ganttProperties.predecessor, true);
                    var index = void 0;
                    for (var t = 0; t < toRecordPredcessor.length; t++) {
                        var toId = this.parent.viewType === 'ResourceView' ? toRecord.ganttProperties.taskId :
                            toRecord.ganttProperties.rowUniqueID;
                        if (toRecordPredcessor[t].to.toString() === toId.toString()
                            && toRecordPredcessor[t].from.toString() === recordId.toString()) {
                            index = t;
                            break;
                        }
                    }
                    toRecordPredcessor.splice(index, 1);
                    this.updatePredecessorValues(toRecord, toRecordPredcessor);
                }
            }
            else if (predecessor.to.toString() === recordId.toString()) {
                var fromRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from.toString());
                if (!isNullOrUndefined(fromRecord)) {
                    var fromRecordPredcessor = extend([], [], fromRecord.ganttProperties.predecessor, true);
                    var index = void 0;
                    for (var t = 0; t < fromRecordPredcessor.length; t++) {
                        var fromId = this.parent.viewType === 'ResourceView' ? fromRecord.ganttProperties.taskId :
                            fromRecord.ganttProperties.rowUniqueID;
                        if (fromRecordPredcessor[t].from.toString() === fromId.toString()
                            && fromRecordPredcessor[t].to.toString() === recordId.toString()) {
                            index = t;
                            break;
                        }
                    }
                    if (record.uniqueID === fromRecord.parentUniqueID ||
                        record.parentUniqueID === fromRecord.uniqueID || this.parent.isOnDelete) {
                        fromRecordPredcessor.splice(index, 1);
                        this.updatePredecessorValues(fromRecord, fromRecordPredcessor);
                    }
                }
            }
        }
    };
    Edit.prototype.updatePredecessorValues = function (record, predcessorArray) {
        this.parent.setRecordValue('predecessor', predcessorArray, record.ganttProperties, true);
        var predecessorString = this.parent.predecessorModule.getPredecessorStringValue(record);
        this.parent.setRecordValue('predecessorsName', predecessorString, record.ganttProperties, true);
        this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, predecessorString, record);
        this.parent.setRecordValue(this.parent.taskFields.dependency, predecessorString, record);
    };
    /**
     * Method to update TaskID of a gantt record
     *
     * @param {string | number} currentId .
     * @param {number | string} newId .
     * @returns {void} .
     */
    Edit.prototype.updateTaskId = function (currentId, newId) {
        if (!this.parent.readOnly) {
            var cId = typeof currentId === 'number' ? currentId.toString() : currentId;
            var nId = typeof newId === 'number' ? newId.toString() : newId;
            var ids = this.parent.ids;
            if (!isNullOrUndefined(cId) && !isNullOrUndefined(nId)) {
                var cIndex = ids.indexOf(cId);
                var nIndex = ids.indexOf(nId);
                // return false for invalid taskID
                if (cIndex === -1 || nIndex > -1) {
                    return;
                }
                var thisRecord = this.parent.flatData[cIndex];
                if (!isNullOrUndefined(thisRecord)) {
                    this.parent.setRecordValue('taskId', newId, thisRecord.ganttProperties, true);
                    this.parent.setRecordValue('rowUniqueID', nId, thisRecord.ganttProperties, true);
                    this.parent.setRecordValue(this.parent.taskFields.id, newId, thisRecord, true);
                    this.parent.setRecordValue(this.parent.taskFields.id, newId, thisRecord.taskData, true);
                }
                ids[cIndex] = nId;
                if (thisRecord.hasChildRecords && this.parent.taskFields.parentID) {
                    var childRecords = thisRecord.childRecords;
                    for (var count = 0; count < childRecords.length; count++) {
                        var childRecord = childRecords[count];
                        childRecord[this.parent.taskFields.parentID] = newId;
                        this.parent.chartRowsModule.refreshRecords([childRecord]);
                    }
                }
                if (this.parent.taskFields.dependency && !isNullOrUndefined(thisRecord.ganttProperties.predecessor)) {
                    var predecessors = thisRecord.ganttProperties.predecessor;
                    var currentGanttRecord = void 0;
                    for (var i = 0; i < predecessors.length; i++) {
                        var predecessor = predecessors[i];
                        if (predecessor.to === cId) {
                            currentGanttRecord = this.parent.flatData[ids.indexOf(predecessor.from)];
                        }
                        else if (predecessor.from === cId) {
                            currentGanttRecord = this.parent.flatData[ids.indexOf(predecessor.to)];
                        }
                        this.updatePredecessorOnUpdateId(currentGanttRecord, cId, nId);
                    }
                }
                this.parent.treeGrid.parentData = [];
                this.parent.treeGrid.refresh();
            }
        }
    };
    Edit.prototype.updatePredecessorOnUpdateId = function (currentGanttRecord, cId, nId) {
        if (this.parent.flatData.indexOf(currentGanttRecord) > -1) {
            var pred = currentGanttRecord.ganttProperties.predecessor;
            for (var j = 0; j < pred.length; j++) {
                var pre = pred[j];
                if (pre.to === cId) {
                    pre.to = nId;
                }
                else if (pre.from === cId) {
                    pre.from = nId;
                }
            }
        }
        this.updatePredecessorValues(currentGanttRecord, currentGanttRecord.ganttProperties.predecessor);
    };
    Edit.prototype.deleteChildRecords = function (record) {
        var _this = this;
        var childRecords = record.childRecords;
        for (var c = 0; c < childRecords.length; c++) {
            var childRecord = childRecords[c];
            if (this.deletedTaskDetails.indexOf(childRecord) !== -1) {
                continue;
            }
            var predecessor = childRecord.ganttProperties.predecessor;
            var canDeletePredecessor = true;
            var parentTask = this.parent.getParentTask(childRecord.parentItem);
            if (this.parent.viewType === 'ResourceView' && parentTask && parentTask.ganttProperties.taskName !==
                this.parent.localeObj.getConstant('unassignedTask')) {
                canDeletePredecessor = false;
            }
            if (predecessor && predecessor.length && canDeletePredecessor) {
                this.removePredecessorOnDelete(childRecord);
            }
            if (!isNullOrUndefined(childRecord.ganttProperties.sharedTaskUniqueIds) &&
                childRecord.ganttProperties.sharedTaskUniqueIds.length > 1) {
                childRecord.ganttProperties.sharedTaskUniqueIds.forEach(function (uniqueId) {
                    _this.deletedTaskDetails.push(_this.parent.getTaskByUniqueID(_this.parent.element.id + '_data_' + uniqueId));
                });
            }
            else {
                this.deletedTaskDetails.push(childRecord);
            }
            if (childRecord.hasChildRecords) {
                this.deleteChildRecords(childRecord);
            }
        }
    };
    Edit.prototype.removeFromDataSource = function (deleteRecordIDs) {
        var dataSource;
        if (this.parent.dataSource instanceof DataManager) {
            dataSource = this.parent.dataSource.dataSource.json;
        }
        else {
            dataSource = this.parent.dataSource;
        }
        this.removeData(dataSource, deleteRecordIDs);
        this.isBreakLoop = false;
    };
    Edit.prototype.removeData = function (dataCollection, record) {
        for (var i = 0; i < dataCollection.length; i++) {
            if (this.isBreakLoop) {
                break;
            }
            if (record.indexOf(getValue(this.parent.taskFields.id, dataCollection[i]).toString()) !== -1) {
                if (dataCollection[i][this.parent.taskFields.child]) {
                    var childRecords = dataCollection[i][this.parent.taskFields.child];
                    this.removeData(childRecords, record);
                }
                record.splice(record.indexOf(getValue(this.parent.taskFields.id, dataCollection[i]).toString()), 1);
                dataCollection.splice(i, 1);
                if (record.length === 0) {
                    this.isBreakLoop = true;
                    break;
                }
            }
            else if (dataCollection[i][this.parent.taskFields.child]) {
                var childRecords = dataCollection[i][this.parent.taskFields.child];
                this.removeData(childRecords, record);
            }
        }
    };
    Edit.prototype.initiateDeleteAction = function (args) {
        var _this = this;
        this.parent.showSpinner();
        var eventArgs = {};
        eventArgs.requestType = 'beforeDelete';
        eventArgs.data = args.deletedRecordCollection;
        eventArgs.modifiedRecords = args.updatedRecordCollection;
        eventArgs.modifiedTaskData = getTaskData(args.updatedRecordCollection, null, null, this.parent);
        this.parent.trigger('actionBegin', eventArgs, function (eventArg) {
            if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                _this.parent.showMaskRow();
            }
            else {
                _this.parent.showSpinner();
            }
            if (eventArg.cancel) {
                var deleteRecords = _this.deletedTaskDetails;
                for (var d = 0; d < deleteRecords.length; d++) {
                    deleteRecords[d].isDelete = false;
                }
                _this.deletedTaskDetails = [];
                _this.reUpdatePreviousRecords();
                _this.parent.initiateEditAction(false);
                _this.parent.hideSpinner();
            }
            else {
                if (isRemoteData(_this.parent.dataSource)) {
                    var data_1 = _this.parent.dataSource;
                    if (_this.parent.timezone) {
                        eventArg.modifiedRecords.forEach(function (modifiedRecord) {
                            updateDates(modifiedRecord, _this.parent);
                        });
                    }
                    var updatedData_1 = {
                        deletedRecords: getTaskData(eventArg.data, null, null, _this.parent),
                        changedRecords: eventArg.modifiedTaskData
                    };
                    var adaptor = data_1.adaptor;
                    var query_1 = _this.parent.query instanceof Query ? _this.parent.query : new Query();
                    if (!(adaptor instanceof WebApiAdaptor && adaptor instanceof ODataAdaptor) || data_1.dataSource.batchUrl) {
                        var crud = data_1.saveChanges(updatedData_1, _this.parent.taskFields.id, null, query_1);
                        crud.then(function () { return _this.deleteSuccess(args); })
                            .catch(function (e) { return _this.dmFailure(e, args); });
                    }
                    else {
                        var deletedRecords = 'deletedRecords';
                        var deleteCrud = null;
                        for (var i = 0; i < updatedData_1[deletedRecords].length; i++) {
                            deleteCrud = data_1.remove(_this.parent.taskFields.id, updatedData_1[deletedRecords][i], null, query_1);
                        }
                        deleteCrud.then(function () {
                            var changedRecords = 'changedRecords';
                            var _loop_4 = function (i) {
                                if (updatedData_1['deletedRecords'].some(function (record) { return record[_this.parent.taskFields.id] === updatedData_1[changedRecords][i].taskId; })) {
                                    updatedData_1[changedRecords].splice(i, 1);
                                }
                            };
                            for (var i = updatedData_1[changedRecords].length - 1; i >= 0; i--) {
                                _loop_4(i);
                            }
                            var updateCrud = data_1.update(_this.parent.taskFields.id, updatedData_1[changedRecords], null, query_1);
                            updateCrud.then(function () { return _this.deleteSuccess(args); })
                                .catch(function (e) { return _this.dmFailure(e, args); });
                        }).catch(function (e) { return _this.dmFailure(e, args); });
                    }
                }
                else {
                    _this.deleteSuccess(args);
                }
            }
        });
    };
    Edit.prototype.deleteSuccess = function (args) {
        var _this = this;
        var flatData = this.parent.flatData;
        var currentData = this.parent.currentViewData;
        var deletedRecords = [];
        for (var i = 0; i < args.deletedRecordCollection.length; i++) {
            if (this.parent.viewType === 'ProjectView') {
                var record = this.parent.getRecordByID(args.deletedRecordCollection[i].ganttProperties.taskId);
                if (!isNullOrUndefined(record)) {
                    deletedRecords.push(record);
                }
            }
            else {
                var id = void 0;
                var hasChildRecords = args.deletedRecordCollection[i].hasChildRecords;
                var isUnassignedTask = args.deletedRecordCollection[i].ganttProperties.taskName === this.parent.localeObj.getConstant('unassignedTask');
                var isCollapsed = !args.deletedRecordCollection[i].expanded;
                if (hasChildRecords && isUnassignedTask && isCollapsed) {
                    if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                        this.parent.hideMaskRow();
                    }
                    else {
                        this.parent.hideSpinner();
                    }
                    this.deletedTaskDetails = [];
                    this.parent.initiateEditAction(false);
                    return;
                }
                if (args.deletedRecordCollection[i].hasChildRecords) {
                    id = 'R' + args.deletedRecordCollection[i].ganttProperties.taskId;
                }
                else {
                    id = 'T' + args.deletedRecordCollection[i].ganttProperties.taskId;
                }
                deletedRecords.push(this.parent.getTaskByUniqueID(args.deletedRecordCollection[i].uniqueID));
            }
        }
        var deleteRecordIDs = [];
        if (deletedRecords.length > 0) {
            var recordIndex = void 0;
            var record = void 0;
            if (this.parent.enableVirtualization) {
                recordIndex = this.parent.flatData.indexOf(deletedRecords[deletedRecords.length - 1]);
                this.parent.staticSelectedRowIndex = this.parent.selectedRowIndex = recordIndex;
                record = this.parent.flatData[this.parent.selectedRowIndex + 1];
                // perform toolbar CollapseAll later delete action issue handle
                if (!this.parent.isCollapseAll) {
                    // Random parent record delete action, maintaining proper record selection
                    this.parent.staticSelectedRowIndex = (recordIndex - (deletedRecords.length - 1));
                }
            }
            else {
                recordIndex = this.parent.currentViewData.indexOf(deletedRecords[deletedRecords.length - 1]);
                this.parent.staticSelectedRowIndex = this.parent.selectedRowIndex = recordIndex;
                record = this.parent.currentViewData[this.parent.selectedRowIndex + 1];
            }
            if (!isNullOrUndefined(record)) {
                this.parent.currentSelection = record;
            }
            else {
                var prevRecordIndex = this.parent.selectedRowIndex - 1;
                if (prevRecordIndex >= 0) {
                    this.parent.currentSelection = this.parent.enableVirtualization ?
                        this.parent.flatData[prevRecordIndex] : this.parent.currentViewData[prevRecordIndex];
                }
            }
        }
        this.deletedRecord = deletedRecords;
        for (var i = 0; i < deletedRecords.length; i++) {
            var deleteRecord = deletedRecords[i];
            var currentIndex = void 0;
            var flatIndex = void 0;
            if (this.parent.viewType === 'ResourceView') {
                if (deleteRecord.hasChildRecords) {
                    currentIndex = this.parent.taskIds.indexOf('R' + deleteRecord.ganttProperties.taskId.toString());
                    flatIndex = this.parent.taskIds.indexOf('R' + deleteRecord.ganttProperties.taskId.toString());
                }
                else {
                    currentIndex = this.parent.taskIds.indexOf('T' + deleteRecord.ganttProperties.taskId.toString());
                    flatIndex = this.parent.taskIds.indexOf('T' + deleteRecord.ganttProperties.taskId.toString());
                }
            }
            else {
                currentIndex = currentData.indexOf(deleteRecord);
                flatIndex = flatData.indexOf(deleteRecord);
            }
            var treeGridParentIndex = this.parent.treeGrid.parentData.indexOf(deleteRecord);
            var tempData = getValue('dataOperation.dataArray', this.parent);
            var dataIndex = tempData.indexOf(deleteRecord.taskData);
            var childIndex = void 0;
            if (currentIndex !== -1) {
                currentData.splice(currentIndex, 1);
            }
            if (flatIndex !== -1) {
                flatData.splice(flatIndex, 1);
            }
            if (dataIndex !== -1) {
                tempData.splice(dataIndex, 1);
            }
            if (!isNullOrUndefined(deleteRecord)) {
                deleteRecordIDs.push(deleteRecord.ganttProperties.taskId.toString());
                if (flatIndex !== -1) {
                    this.parent.ids.splice(flatIndex, 1);
                    if (this.parent.viewType === 'ResourceView') {
                        this.parent.getTaskIds().splice(flatIndex, 1);
                        if (!deleteRecord.hasChildRecords) {
                            deleteRecord.ganttProperties.resourceInfo = null;
                            delete deleteRecord.ganttProperties.resourceNames;
                            deleteRecord[this.parent.taskFields.resourceInfo] = null;
                            deleteRecord.ganttProperties.sharedTaskUniqueIds = [];
                            delete deleteRecord.taskData[this.parent.taskFields.resourceInfo];
                        }
                    }
                }
                if (deleteRecord.level === 0 && treeGridParentIndex !== -1) {
                    this.parent.treeGrid.parentData.splice(treeGridParentIndex, 1);
                }
                if (deleteRecord.parentItem) {
                    var parentItem = this.parent.getParentTask(deleteRecord.parentItem);
                    if (parentItem) {
                        var childRecords = parentItem.childRecords;
                        childIndex = childRecords.indexOf(deleteRecord);
                        if (childIndex !== -1) {
                            childRecords.splice(childIndex, 1);
                        }
                        if (!childRecords.length) {
                            this.parent.setRecordValue('hasChildRecords', false, parentItem);
                        }
                    }
                }
                this.updateTreeGridUniqueID(deleteRecord, 'delete');
            }
        }
        if (deleteRecordIDs.length > 0) {
            this.removeFromDataSource(deleteRecordIDs);
        }
        this.updateRowIndex();
        var eventArgs = {};
        this.parent.updatedConnectorLineCollection = [];
        this.parent.connectorLineIds = [];
        this.parent.predecessorModule.createConnectorLinesCollection(this.parent.flatData);
        this.parent.treeGrid.parentData = [];
        this.isAdded = false;
        if (this.parent.treeGrid.editModule) {
            this.parent.treeGrid.editModule['isOnBatch'] = false;
        }
        this.parent.treeGrid.refresh();
        if (this.parent.enableImmutableMode) {
            this.refreshRecordInImmutableMode();
        }
        // Trigger actioncomplete event for delete action
        eventArgs.requestType = 'delete';
        eventArgs.data = args.deletedRecordCollection;
        eventArgs.modifiedRecords = args.updatedRecordCollection;
        eventArgs.modifiedTaskData = getTaskData(args.updatedRecordCollection, null, null, this.parent);
        setValue('action', args.action, eventArgs);
        this.parent.isOnDelete = false;
        if (this.parent.viewType === 'ResourceView' && (!this.parent.undoRedoModule || (this.parent.undoRedoModule && (!this.parent.undoRedoModule['isUndoRedoPerformed'] || (this.parent.undoRedoModule['isUndoRedoPerformed'] && this.parent.undoRedoModule['currentAction']['action'] === 'Delete'))))) {
            var updateUnAssignedResources_1 = eventArgs.data.filter(function (data) {
                return !data.hasChildRecords;
            });
            var _loop_5 = function (i) {
                var unassignedTask = this_4.parent.flatData.filter(function (data) {
                    return data.ganttProperties.taskName === _this.parent.localeObj.getConstant('unassignedTask');
                })[0];
                var isDuplicate = [];
                if (unassignedTask) {
                    isDuplicate = unassignedTask.childRecords.filter(function (data) {
                        return data.ganttProperties.taskId === updateUnAssignedResources_1[i].ganttProperties.taskId;
                    });
                }
                var parentTask = this_4.parent.getParentTask(updateUnAssignedResources_1[i].parentItem);
                if (parentTask && parentTask.ganttProperties.taskName !==
                    this_4.parent.localeObj.getConstant('unassignedTask') && isDuplicate.length === 0) {
                    this_4.checkWithUnassignedTask(updateUnAssignedResources_1[i]);
                }
                else if (!parentTask && (!isDuplicate || isDuplicate.length === 0)) {
                    this_4.checkWithUnassignedTask(updateUnAssignedResources_1[i]);
                }
                unassignedTask = this_4.parent.flatData.filter(function (data) {
                    return data.ganttProperties.taskName === _this.parent.localeObj.getConstant('unassignedTask');
                })[0];
                var parentItem = this_4.parent.currentViewData.filter(function (data) {
                    if (data.ganttProperties.taskId === updateUnAssignedResources_1[i].ganttProperties.taskId &&
                        (!data.hasChildRecords && data.parentItem)
                        && unassignedTask.uniqueID === data.parentItem.uniqueID) {
                        return data;
                    }
                    else {
                        return null;
                    }
                });
                if (parentItem[0]) {
                    this_4.parent.dataOperation.updateParentItems(parentItem[0]);
                }
            };
            var this_4 = this;
            for (var i = 0; i < updateUnAssignedResources_1.length; i++) {
                _loop_5(i);
            }
        }
        this.parent.trigger('actionComplete', eventArgs);
        this.deletedTaskDetails = [];
        this.parent.initiateEditAction(false);
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
            this.parent.hideMaskRow();
        }
        else {
            this.parent.hideSpinner();
        }
        this.parent.treeGrid.closeEdit();
    };
    /**
     *
     * @returns {number | string} .
     * @private
     */
    Edit.prototype.getNewTaskId = function () {
        var ids = this.parent.viewType === 'ResourceView' ? this.parent.getTaskIds() : this.parent.ids;
        var maxId = ids.length;
        var newTaskId = maxId + 1;
        if (this.parent.viewType === 'ResourceView') {
            if (ids.indexOf('T' + newTaskId) !== -1 || ids.indexOf('R' + newTaskId) !== -1) {
                newTaskId = newTaskId + 1;
                if (ids.indexOf('T' + newTaskId) !== -1 || ids.indexOf('R' + newTaskId) !== -1) {
                    do {
                        newTaskId = newTaskId + 1;
                    } while (ids.indexOf('T' + newTaskId) !== -1 || ids.indexOf('R' + newTaskId) !== -1);
                }
            }
        }
        else {
            if (ids.indexOf(newTaskId.toString()) !== -1) {
                newTaskId = newTaskId + 1;
                if (ids.indexOf(newTaskId.toString()) !== -1) {
                    do {
                        newTaskId = newTaskId + 1;
                    } while (ids.indexOf(newTaskId.toString()) !== -1);
                }
            }
        }
        if (this.parent.columnByField[this.parent.taskFields.id].editType === 'stringedit') {
            return newTaskId = newTaskId.toString();
        }
        else {
            return newTaskId;
        }
    };
    /**
     * @param {object} obj .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    Edit.prototype.prepareNewlyAddedData = function (obj, rowPosition) {
        var taskModel = this.parent.taskFields;
        var id;
        var newTaskIDmd;
        var ids = this.parent.ids;
        /*Validate Task Id of data*/
        if (obj[taskModel.id]) {
            if (ids.indexOf(obj[taskModel.id].toString()) !== -1) {
                obj[taskModel.id] = null;
            }
            else {
                if (typeof (obj[taskModel.id]) === 'string') {
                    newTaskIDmd = obj[taskModel.id];
                }
                else {
                    newTaskIDmd = parseInt(obj[taskModel.id], 10);
                }
                obj[taskModel.id] = isNullOrUndefined(newTaskIDmd) ? null : newTaskIDmd;
            }
        }
        if (!obj[taskModel.id]) {
            id = this.getNewTaskId();
            obj[taskModel.id] = id;
        }
        if (!this.parent.allowUnscheduledTasks && !obj[taskModel.startDate]) {
            obj[taskModel.startDate] = this.parent.projectStartDate;
        }
        if (!this.parent.allowUnscheduledTasks && taskModel.duration && isNullOrUndefined(obj[taskModel.duration])) {
            if (!obj[taskModel.endDate]) {
                obj[taskModel.duration] = '5';
            }
        }
        if (taskModel.progress) {
            obj[taskModel.progress] = obj[taskModel.progress] ? (obj[taskModel.progress] > 100 ? 100 : obj[taskModel.progress]) : 0;
        }
        if (!this.parent.allowUnscheduledTasks && !obj[taskModel.endDate] && taskModel.endDate) {
            if (!obj[taskModel.duration]) {
                var startDate = this.parent.dataOperation.getDateFromFormat(this.parent.projectStartDate);
                if (!isNullOrUndefined(startDate)) {
                    startDate.setDate(startDate.getDate() + 4);
                    obj[taskModel.endDate] = this.parent.getFormatedDate(startDate, this.parent.getDateFormat());
                }
            }
        }
    };
    /**
     * @param {object} obj .
     * @param {number} level .
     * @param {RowPosition} rowPosition .
     * @param {IGanttData} parentItem .
     * @param {number} rowIndex .
     * @returns {IGanttData} .
     * @private
     */
    Edit.prototype.updateNewlyAddedDataBeforeAjax = function (obj, level, rowPosition, parentItem, rowIndex) {
        var cAddedRecord = this.parent.dataOperation.createRecord(obj, level);
        switch (rowPosition) {
            case 'Above':
                cAddedRecord.index = rowIndex;
                break;
            case 'Below':
            case 'Child':
                cAddedRecord.index = rowIndex + 1;
                break;
            case 'Bottom':
                cAddedRecord.index = this.parent.enableVirtualization ? this.parent.flatData.length : this.parent.currentViewData.length;
                break;
            case 'Top':
                cAddedRecord.index = 0;
                break;
            default:
                break;
        }
        if (!isNullOrUndefined(parentItem)) {
            this.parent.setRecordValue('parentItem', this.parent.dataOperation.getCloneParent(parentItem), cAddedRecord);
            var pIndex = cAddedRecord.parentItem ? cAddedRecord.parentItem.index : null;
            this.parent.setRecordValue('parentIndex', pIndex, cAddedRecord);
            var parentUniqId = cAddedRecord.parentItem ? cAddedRecord.parentItem.uniqueID : null;
            this.parent.setRecordValue('parentUniqueID', parentUniqId, cAddedRecord);
            if (!isNullOrUndefined(this.parent.taskFields.id) &&
                !isNullOrUndefined(this.parent.taskFields.parentID) && cAddedRecord.parentItem) {
                if (this.parent.viewType === 'ProjectView') {
                    this.parent.setRecordValue(this.parent.taskFields.parentID, cAddedRecord.parentItem.taskId, cAddedRecord.taskData, true);
                }
                this.parent.setRecordValue('parentId', cAddedRecord.parentItem.taskId, cAddedRecord.ganttProperties, true);
                this.parent.setRecordValue(this.parent.taskFields.parentID, cAddedRecord.parentItem.taskId, cAddedRecord, true);
            }
        }
        this.parent.isOnEdit = true;
        if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed']) {
            if (obj['hasChildRecords']) {
                var totalRecords = [];
                var currentAction = this.parent.undoRedoModule['currentAction']['deletedRecordsDetails'];
                for (var i = 0; i < obj['childRecords'].length; i++) {
                    this.add(obj['childRecords'][i], totalRecords);
                }
                for (var j = 0; j < currentAction.length; j++) {
                    if (obj['ganttProperties'].taskId === currentAction[j]['data'].ganttProperties.taskId) {
                        if (currentAction[j]['position'] === 'child') {
                            rowPosition = 'Child';
                        }
                        else if (currentAction[j]['position'] === 'below') {
                            rowPosition = 'Below';
                        }
                        else if (currentAction[j]['position'] === 'above') {
                            rowPosition = 'Above';
                        }
                        this.backUpAndPushNewlyAddedRecord(cAddedRecord, rowPosition, parentItem);
                        for (var i = 0; i < totalRecords.length; i++) {
                            if (this.parent.viewType === 'ProjectView') {
                                if (totalRecords[i].parentItem.taskId === cAddedRecord.ganttProperties.taskId) {
                                    totalRecords[i].parentItem.index = cAddedRecord.index;
                                    totalRecords[i].parentItem.taskId = cAddedRecord.ganttProperties.taskId;
                                    totalRecords[i].parentItem.uniqueID = cAddedRecord.ganttProperties.uniqueID;
                                    totalRecords[i].parentUniqueID = cAddedRecord.ganttProperties.uniqueID;
                                }
                            }
                            else {
                                totalRecords[i].parentItem.index = cAddedRecord.index;
                                totalRecords[i].parentItem.taskId = cAddedRecord.ganttProperties.rowUniqueID;
                                totalRecords[i].parentItem.uniqueID = cAddedRecord.ganttProperties.uniqueID;
                                totalRecords[i].parentUniqueID = cAddedRecord.ganttProperties.uniqueID;
                            }
                        }
                        break;
                    }
                }
                this.addRowSelectedItem = cAddedRecord;
                cAddedRecord.taskData[this.parent.taskFields.child] = [];
                for (var k = 0; k < totalRecords.length; k++) {
                    this.parent.isOnEdit = false;
                    var newRecord = this.parent.dataOperation.createRecord(totalRecords[k], totalRecords[k].level);
                    if (newRecord.childRecords.length === 0 && newRecord.taskData[this.parent.taskFields.child]) {
                        newRecord.taskData[this.parent.taskFields.child] = [];
                    }
                    parentItem = this.parent.getRecordByID(totalRecords[k].parentItem.taskId);
                    if (!isNullOrUndefined(parentItem)) {
                        this.parent.setRecordValue('parentItem', this.parent.dataOperation.getCloneParent(parentItem), newRecord);
                        var pIndex = newRecord.parentItem ? newRecord.parentItem.index : null;
                        this.parent.setRecordValue('parentIndex', pIndex, newRecord);
                        var parentUniqId = newRecord.parentItem ? newRecord.parentItem.uniqueID : null;
                        this.parent.setRecordValue('parentUniqueID', parentUniqId, newRecord);
                        if (!isNullOrUndefined(this.parent.taskFields.id) &&
                            !isNullOrUndefined(this.parent.taskFields.parentID) && newRecord.parentItem) {
                            if (this.parent.viewType === 'ProjectView') {
                                this.parent.setRecordValue(this.parent.taskFields.parentID, newRecord.parentItem.taskId, newRecord.taskData, true);
                            }
                            this.parent.setRecordValue('parentId', newRecord.parentItem.taskId, newRecord.ganttProperties, true);
                            this.parent.setRecordValue(this.parent.taskFields.parentID, newRecord.parentItem.taskId, newRecord, true);
                        }
                    }
                    this.parent.isOnEdit = true;
                    if (newRecord.parentItem) {
                        if (parentItem.childRecords.length === 0) {
                            rowPosition = 'Child';
                        }
                        else {
                            rowPosition = 'Below';
                        }
                    }
                    if (this.parent.getParentTask(newRecord.parentItem).childRecords.length > 0) {
                        this.addRowSelectedItem = this.parent.getParentTask(newRecord.parentItem).childRecords[this.parent.getParentTask(newRecord.parentItem).childRecords.length - 1];
                    }
                    this.backUpAndPushNewlyAddedRecord(newRecord, rowPosition, parentItem);
                    for (var i = 0; i < totalRecords.length; i++) {
                        if (this.parent.viewType === 'ProjectView') {
                            if (totalRecords[i].parentItem.taskId === newRecord.ganttProperties.taskId) {
                                totalRecords[i].parentItem.index = newRecord.index;
                                totalRecords[i].parentItem.taskId = newRecord.ganttProperties.taskId;
                                totalRecords[i].parentItem.uniqueID = newRecord.ganttProperties.uniqueID;
                                totalRecords[i].parentUniqueID = newRecord.ganttProperties.uniqueID;
                            }
                        }
                        else {
                            totalRecords[i].parentItem.index = cAddedRecord.index;
                            totalRecords[i].parentItem.taskId = cAddedRecord.ganttProperties.rowUniqueID;
                            totalRecords[i].parentItem.uniqueID = cAddedRecord.ganttProperties.uniqueID;
                            totalRecords[i].parentUniqueID = cAddedRecord.ganttProperties.uniqueID;
                        }
                    }
                }
            }
            else {
                this.backUpAndPushNewlyAddedRecord(cAddedRecord, rowPosition, parentItem);
            }
        }
        else {
            this.backUpAndPushNewlyAddedRecord(cAddedRecord, rowPosition, parentItem);
        }
        // need to push in dataSource also.
        if (this.parent.taskFields.dependency && cAddedRecord.ganttProperties.predecessorsName) {
            if (!this.parent.undoRedoModule || !this.parent.undoRedoModule['isUndoRedoPerformed']) {
                this.parent.predecessorModule.ensurePredecessorCollectionHelper(cAddedRecord, cAddedRecord.ganttProperties);
            }
            this.parent.predecessorModule.updatePredecessorHelper(cAddedRecord);
            this.parent.predecessorModule.validatePredecessorDates(cAddedRecord);
        }
        if (cAddedRecord.parentItem && this.parent.getParentTask(cAddedRecord.parentItem).ganttProperties.isAutoSchedule) {
            this.parent.dataOperation.updateParentItems(cAddedRecord.parentItem);
        }
        this.parent.isOnEdit = false;
        return cAddedRecord;
    };
    /**
     * @param {IGanttData} record .
     * @param {number} count .
     * @returns {number} .
     * @private
     */
    Edit.prototype.getChildCount = function (record, count) {
        var currentRecord;
        if (!record.hasChildRecords) {
            return 0;
        }
        for (var i = 0; i < record.childRecords.length; i++) {
            currentRecord = record.childRecords[i];
            count++;
            if (currentRecord.hasChildRecords) {
                count = this.getChildCount(currentRecord, count);
            }
        }
        return count;
    };
    /**
     * @param {IGanttData} data .
     * @param {number} count .
     * @param {IGanttData[]} collection .
     * @returns {number} .
     * @private
     */
    Edit.prototype.getVisibleChildRecordCount = function (data, count, collection) {
        var childRecords;
        var length;
        if (data.hasChildRecords) {
            childRecords = data.childRecords;
            length = childRecords.length;
            for (var i = 0; i < length; i++) {
                if (collection.indexOf(childRecords[i]) !== -1) {
                    count++;
                }
                if (childRecords[i].hasChildRecords) {
                    count = this.getVisibleChildRecordCount(childRecords[i], count, collection);
                }
            }
        }
        else {
            if (collection.indexOf(data) !== -1) {
                count++;
            }
        }
        return count;
    };
    /**
     * @param {IGanttData} parentRecord .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updatePredecessorOnIndentOutdent = function (parentRecord) {
        var len = parentRecord.ganttProperties.predecessor.length;
        var parentRecordTaskData = parentRecord.ganttProperties;
        var predecessorCollection = parentRecordTaskData.predecessor;
        var childRecord;
        var predecessorIndex;
        var updatedPredecessor = [];
        var validPredecessor;
        for (var count = 0; count < len; count++) {
            var fromRecord = this.parent.getRecordByID(predecessorCollection[count].from);
            var toRecord = this.parent.getRecordByID(predecessorCollection[count].to);
            validPredecessor = this.parent.predecessorModule.validateParentPredecessor(fromRecord, toRecord);
            if (!validPredecessor || !this.parent.allowParentDependency) {
                if (predecessorCollection[count].to === parentRecordTaskData.rowUniqueID.toString()) {
                    childRecord = this.parent.getRecordByID(predecessorCollection[count].from);
                    predecessorIndex = getIndex(predecessorCollection[count], 'from', childRecord.ganttProperties.predecessor, 'to');
                    // eslint-disable-next-line
                    var predecessorCollections = (extend([], childRecord.ganttProperties.predecessor, [], true));
                    predecessorCollections.splice(predecessorIndex, 1);
                    this.parent.setRecordValue('predecessor', predecessorCollections, childRecord.ganttProperties, true);
                }
                else if (predecessorCollection[count].from === parentRecordTaskData.rowUniqueID.toString()) {
                    childRecord = this.parent.getRecordByID(predecessorCollection[count].to);
                    var prdcList = (childRecord.ganttProperties.predecessorsName.toString()).split(',');
                    var str = predecessorCollection[count].from + predecessorCollection[count].type;
                    var ind = prdcList.indexOf(str);
                    prdcList.splice(ind, 1);
                    this.parent.setRecordValue('predecessorsName', prdcList.join(','), childRecord.ganttProperties, true);
                    this.parent.setRecordValue(this.parent.taskFields.dependency, prdcList.join(','), childRecord);
                    predecessorIndex = getIndex(predecessorCollection[count], 'from', childRecord.ganttProperties.predecessor, 'to');
                    // eslint-disable-next-line
                    var temppredecessorCollection = (extend([], childRecord.ganttProperties.predecessor, [], true));
                    temppredecessorCollection.splice(predecessorIndex, 1);
                    this.parent.setRecordValue('predecessor', temppredecessorCollection, childRecord.ganttProperties, true);
                    this.parent.predecessorModule.validatePredecessorDates(childRecord);
                }
            }
        }
        if (!validPredecessor || !this.parent.allowParentDependency) {
            this.parent.setRecordValue('predecessor', updatedPredecessor, parentRecord.ganttProperties, true);
            this.parent.setRecordValue('predecessorsName', '', parentRecord.ganttProperties, true);
        }
    };
    /**
     * @param {IGanttData} record .
     * @param {RowPosition} rowPosition .
     * @param {IGanttData} parentItem .
     * @returns {void} .
     * @private
     */
    Edit.prototype.backUpAndPushNewlyAddedRecord = function (record, rowPosition, parentItem) {
        var flatRecords = this.parent.flatData;
        var currentViewData = this.parent.currentViewData;
        var ids = this.parent.ids;
        var currentItemIndex;
        var recordIndex;
        var updatedCollectionIndex;
        var childIndex;
        switch (rowPosition) {
            case 'Top':
                flatRecords.splice(0, 0, record);
                currentViewData.splice(0, 0, record);
                ids.splice(0, 0, record.ganttProperties.rowUniqueID.toString()); // need to check NAN
                break;
            case 'Bottom':
                flatRecords.push(record);
                currentViewData.push(record);
                ids.push(record.ganttProperties.rowUniqueID.toString()); // need to check NAN
                if (this.parent.viewType === 'ResourceView') {
                    var taskId = record.level === 0 ? 'R' + record.ganttProperties.taskId : 'T' + record.ganttProperties.taskId;
                    this.parent.getTaskIds().push(taskId);
                }
                break;
            case 'Above':
                /*Record Updates*/
                recordIndex = flatRecords.indexOf(this.addRowSelectedItem);
                updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem);
                this.recordCollectionUpdate(childIndex, recordIndex, updatedCollectionIndex, record, parentItem, rowPosition);
                break;
            case 'Below':
                currentItemIndex = flatRecords.indexOf(this.addRowSelectedItem);
                if (this.addRowSelectedItem.hasChildRecords) {
                    var dataChildCount = this.getChildCount(this.addRowSelectedItem, 0);
                    recordIndex = currentItemIndex + dataChildCount + 1;
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) +
                        this.getVisibleChildRecordCount(this.addRowSelectedItem, 0, currentViewData) + 1;
                }
                else {
                    recordIndex = currentItemIndex + 1;
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) + 1;
                }
                this.recordCollectionUpdate(childIndex + 1, recordIndex, updatedCollectionIndex, record, parentItem, rowPosition);
                break;
            case 'Child':
                currentItemIndex = flatRecords.indexOf(this.addRowSelectedItem);
                if (this.addRowSelectedItem.hasChildRecords) {
                    var dataChildCount = this.getChildCount(this.addRowSelectedItem, 0);
                    recordIndex = currentItemIndex + dataChildCount + 1;
                    //Expand Add record's parent item for project view
                    if (!this.addRowSelectedItem.expanded && !this.parent.enableMultiTaskbar) {
                        this.parent.expandByID(this.addRowSelectedItem.ganttProperties.rowUniqueID);
                    }
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) +
                        this.getVisibleChildRecordCount(this.addRowSelectedItem, 0, currentViewData) + 1;
                }
                else {
                    this.parent.setRecordValue('hasChildRecords', true, this.addRowSelectedItem);
                    this.parent.setRecordValue('isMilestone', false, this.addRowSelectedItem.ganttProperties, true);
                    this.parent.setRecordValue('expanded', true, this.addRowSelectedItem);
                    this.parent.setRecordValue('childRecords', [], this.addRowSelectedItem);
                    recordIndex = currentItemIndex + 1;
                    updatedCollectionIndex = currentViewData.indexOf(this.addRowSelectedItem) + 1;
                    if (this.addRowSelectedItem.ganttProperties.predecessor) {
                        this.updatePredecessorOnIndentOutdent(this.addRowSelectedItem);
                    }
                    if (!isNullOrUndefined(this.addRowSelectedItem.ganttProperties.segments)) {
                        this.addRowSelectedItem.ganttProperties.segments = null;
                    }
                }
                this.recordCollectionUpdate(childIndex + 1, recordIndex, updatedCollectionIndex, record, parentItem, rowPosition);
                break;
        }
        this.newlyAddedRecordBackup = record;
    };
    /**
     * @param {number} childIndex .
     * @param {number} recordIndex .
     * @param {number} updatedCollectionIndex .
     * @param {IGanttData} record .
     * @param {IGanttData} parentItem .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    Edit.prototype.recordCollectionUpdate = function (childIndex, recordIndex, updatedCollectionIndex, record, parentItem, rowPosition) {
        var flatRecords = this.parent.flatData;
        var currentViewData = this.parent.currentViewData;
        var ids = this.parent.ids;
        /* Record collection update */
        flatRecords.splice(recordIndex, 0, record);
        currentViewData.splice(updatedCollectionIndex, 0, record);
        ids.splice(recordIndex, 0, record.ganttProperties.rowUniqueID.toString());
        if (this.parent.viewType === 'ResourceView') {
            var taskId = record.level === 0 ? 'R' + record.ganttProperties.taskId : 'T' + record.ganttProperties.taskId;
            this.parent.getTaskIds().splice(recordIndex, 0, taskId);
        }
        /* data Source update */
        if (!isNullOrUndefined(parentItem)) {
            if (rowPosition === 'Above') {
                childIndex = parentItem.childRecords.indexOf(this.addRowSelectedItem);
            }
            else if (rowPosition === 'Below') {
                childIndex = parentItem.childRecords.indexOf(this.addRowSelectedItem) + 1;
            }
            else {
                childIndex = parentItem.childRecords.length;
            }
            /*Child collection update*/
            parentItem.childRecords.splice(childIndex, 0, record);
            if (!this.parent.taskFields.child) {
                this.parent.taskFields.child = 'Children';
            }
            if ((this.parent.dataSource instanceof DataManager &&
                isNullOrUndefined(parentItem.taskData[this.parent.taskFields.parentID])) ||
                !isNullOrUndefined(this.parent.dataSource)) {
                var child = this.parent.taskFields.child;
                if (parentItem.taskData[child] && parentItem.taskData[child].length > 0) {
                    if (rowPosition === 'Above' || rowPosition === 'Below') {
                        parentItem.taskData[child].splice(childIndex, 0, record.taskData);
                    }
                    else {
                        parentItem.taskData[child].push(record.taskData);
                    }
                }
                else {
                    parentItem.taskData[child] = [];
                    parentItem.taskData[child].push(record.taskData);
                }
                this.isNewRecordAdded = true;
            }
        }
    };
    /**
     * @param {IGanttData} cAddedRecord .
     * @param {IGanttData} modifiedRecords .
     * @param {string} event .
     * @returns {ITaskAddedEventArgs} .
     * @private
     */
    Edit.prototype.constructTaskAddedEventArgs = function (cAddedRecord, modifiedRecords, event) {
        var eventArgs = {};
        eventArgs.action = eventArgs.requestType = event;
        if (cAddedRecord.length > 1) {
            eventArgs.data = [];
            eventArgs.newTaskData = [];
            eventArgs.recordIndex = [];
            for (var i = 0; i < cAddedRecord.length; i++) {
                eventArgs.data[i] = cAddedRecord[i];
                (eventArgs.newTaskData[i]) = (getTaskData([cAddedRecord[i]], eventArgs.data[i], eventArgs, this.parent));
                eventArgs.recordIndex[i] = cAddedRecord[i].index;
            }
        }
        else if (cAddedRecord.length === 1) {
            for (var i = 0; i < cAddedRecord.length; i++) {
                (eventArgs.data) = (cAddedRecord[i]);
                (eventArgs.newTaskData) = (getTaskData([cAddedRecord[i]], eventArgs.data, eventArgs, this.parent));
                eventArgs.recordIndex = cAddedRecord[i].index;
            }
        }
        eventArgs.modifiedRecords = modifiedRecords;
        eventArgs.modifiedTaskData = getTaskData(modifiedRecords, null, null, this.parent);
        return eventArgs;
    };
    /**
     * @param {ITaskAddedEventArgs} args .
     * @returns {void} .
     * @private
     */
    Edit.prototype.addSuccess = function (args) {
        // let addedRecords: IGanttData = args.addedRecord;
        // let eventArgs: IActionBeginEventArgs = {};
        this.parent.updatedConnectorLineCollection = [];
        this.parent.connectorLineIds = [];
        this.parent.predecessorModule.createConnectorLinesCollection(this.parent.flatData);
        this.parent.treeGrid.parentData = [];
        this.parent.addDeleteRecord = true;
        this.parent.treeGrid['isAddedFromGantt'] = true;
        this.isAdded = true;
        if (this.parent.treeGrid.editModule) {
            this.parent.treeGrid.editModule['isOnBatch'] = false;
        }
        this.parent.treeGrid.refresh();
        if (this.parent.enableImmutableMode) {
            this.parent.modifiedRecords = args.modifiedRecords;
            this.parent.modifiedRecords.push(args.data);
            this.refreshRecordInImmutableMode();
        }
        this.parent.treeGrid.closeEdit();
    };
    Edit.prototype.refreshRecordInImmutableMode = function (data, dragged) {
        if (!dragged && !isNullOrUndefined(data)) {
            for (var i = data[0].index + 1; i < this.parent.currentViewData.length; i++) {
                if (data[0].level < this.parent.currentViewData[i].level) {
                    this.parent.modifiedRecords.push(this.parent.currentViewData[i]);
                }
                else {
                    break;
                }
            }
        }
        var _loop_6 = function (i) {
            var originalData = this_5.parent.modifiedRecords[i];
            var treeIndex = this_5.parent.rowDragAndDropModule && this_5.parent.allowRowDragAndDrop ? 1 : 0;
            var uniqueTaskID = this_5.parent.taskFields.id;
            var originalIndex = this_5.parent.currentViewData.findIndex(function (data) {
                return (data[uniqueTaskID] === originalData[uniqueTaskID]);
            });
            if (this_5.parent.treeGrid.getRows()[originalIndex]) {
                var row = this_5.parent.treeGrid.grid.getRowObjectFromUID(this_5.parent.treeGrid.grid.getDataRows()[originalIndex].getAttribute('data-uid'));
                this_5.parent.treeGrid.renderModule.cellRender({
                    data: row.data,
                    cell: this_5.parent.treeGrid.getRows()[originalIndex].cells[this_5.parent.treeColumnIndex + treeIndex],
                    column: this_5.parent.treeGrid.grid.getColumns()[this_5.parent.treeColumnIndex],
                    requestType: 'rowDragAndDrop'
                });
                this_5.parent.treeGrid.renderModule.RowModifier({
                    data: originalData, row: this_5.parent.treeGrid.getRows()[originalIndex], rowHeight: this_5.parent.rowHeight
                });
            }
        };
        var this_5 = this;
        for (var i = 0; i < this.parent.modifiedRecords.length; i++) {
            _loop_6(i);
        }
    };
    /**
     * @param {IGanttData} addedRecord .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    Edit.prototype.updateRealDataSource = function (addedRecord, rowPosition) {
        var taskFields = this.parent.taskFields;
        var dataSource = isCountRequired(this.parent) ? getValue('result', this.parent.dataSource) :
            this.parent.dataSource;
        if (this.parent.dataSource instanceof DataManager) {
            dataSource = this.parent.dataSource.dataSource.json;
        }
        for (var i = 0; i < addedRecord.length; i++) {
            if (isNullOrUndefined(rowPosition) || isNullOrUndefined(this.addRowSelectedItem)) {
                rowPosition = rowPosition === 'Bottom' ? 'Bottom' : 'Top';
            }
            if (rowPosition === 'Top') {
                dataSource.splice(0, 0, addedRecord[i].taskData);
            }
            else if (rowPosition === 'Bottom') {
                dataSource.push(addedRecord[i].taskData);
            }
            else {
                if (!isNullOrUndefined(taskFields.id) && !isNullOrUndefined(taskFields.parentID) && rowPosition === 'Child') {
                    dataSource.push(addedRecord[i].taskData);
                }
                else {
                    if (!this.isNewRecordAdded) {
                        this.addDataInRealDataSource(dataSource, addedRecord[i].taskData, rowPosition);
                    }
                    this.isNewRecordAdded = false;
                }
            }
            this.isBreakLoop = false;
        }
    };
    /**
     * @param {object[]} dataCollection .
     * @param {IGanttData} record .
     * @param {RowPosition} rowPosition .
     * @returns {void} .
     * @private
     */
    Edit.prototype.addDataInRealDataSource = function (dataCollection, record, rowPosition) {
        for (var i = 0; i < dataCollection.length; i++) {
            var child = this.parent.taskFields.child;
            if (this.isBreakLoop) {
                break;
            }
            if (getValue(this.parent.taskFields.id, dataCollection[i]).toString() ===
                this.addRowSelectedItem.ganttProperties.rowUniqueID.toString()) {
                var index = void 0;
                if (this.parent.rowDragAndDropModule && this.parent.rowDragAndDropModule['droppedRecord'] && this.parent.viewType === 'ResourceView') {
                    for (var i_1 = 0; i_1 < dataCollection.length; i_1++) {
                        if (dataCollection[i_1][this.parent.taskFields.id] === this.parent.rowDragAndDropModule['droppedRecord'].ganttProperties.taskId) {
                            index = i_1;
                            break;
                        }
                    }
                }
                if (rowPosition === 'Above') {
                    if (index) {
                        dataCollection.splice(index, 0, record);
                    }
                    else {
                        dataCollection.splice(i, 0, record);
                    }
                }
                else if (rowPosition === 'Below') {
                    if (index) {
                        dataCollection.splice(index + 1, 0, record);
                    }
                    else {
                        dataCollection.splice(i + 1, 0, record);
                    }
                }
                else if (rowPosition === 'Child') {
                    if (dataCollection[i][child] && dataCollection[i][child].length > 0) {
                        dataCollection[i][child].push(record);
                    }
                    else {
                        dataCollection[i][child] = [];
                        dataCollection[i][child].push(record);
                    }
                }
                this.isBreakLoop = true;
                break;
            }
            else if (dataCollection[i][child]) {
                var childRecords = dataCollection[i][child];
                this.addDataInRealDataSource(childRecords, record, rowPosition);
            }
        }
    };
    /**
     * Method to update the values to client side from server side.
     *
     * @param {Object} e - Defines the new modified data from the server.
     * @param {Object[]} e.addedRecords .
     * @param {Object[]} e.changedRecords .
     * @param {ITaskAddedEventArgs} args - Defines the client side data.
     * @returns {void} .
     */
    Edit.prototype.updateClientDataFromServer = function (e, args) {
        var serverReturnedValue = e.addedRecords[0];
        var _aLength = Object.keys(serverReturnedValue).length;
        for (var j = 0, _a = Object.keys(serverReturnedValue); j < _aLength; j++) {
            var key = _a[parseInt(j.toString(), 10)];
            args.data["" + key] = serverReturnedValue["" + key];
        }
        if (this.parent.taskFields.id !== null) {
            args.data.ganttProperties['taskId'] = serverReturnedValue[this.parent.taskFields.id];
        }
        if (this.parent.taskFields.name !== null) {
            args.data.ganttProperties['taskName'] = serverReturnedValue[this.parent.taskFields.name];
        }
        if (this.parent.taskFields.startDate !== null) {
            args.data.ganttProperties['startDate'] = serverReturnedValue[this.parent.taskFields.startDate];
        }
        if (this.parent.taskFields.endDate !== null) {
            args.data.ganttProperties['endDate'] = serverReturnedValue[this.parent.taskFields.endDate];
        }
        if (this.parent.taskFields.duration !== null) {
            args.data.ganttProperties['duration'] = parseFloat(serverReturnedValue[this.parent.taskFields.duration]);
        }
        if (this.parent.taskFields.durationUnit !== null) {
            args.data.ganttProperties['durationUnit'] = serverReturnedValue[this.parent.taskFields.durationUnit];
        }
        if (this.parent.taskFields.progress !== null) {
            args.data.ganttProperties['progress'] = serverReturnedValue[this.parent.taskFields.progress];
        }
        if (this.parent.taskFields.dependency !== null) {
            args.data.ganttProperties['dependency'] = serverReturnedValue[this.parent.taskFields.dependency];
        }
        if (this.parent.taskFields.parentID !== null) {
            args.data.ganttProperties['parentID'] = serverReturnedValue[this.parent.taskFields.parentID];
        }
        if (this.parent.taskFields.baselineEndDate !== null) {
            args.data.ganttProperties['baselineEndDate'] = serverReturnedValue[this.parent.taskFields.baselineEndDate];
        }
        if (this.parent.taskFields.baselineStartDate !== null) {
            args.data.ganttProperties['baselineStartDate'] = serverReturnedValue[this.parent.taskFields.baselineStartDate];
        }
        if (this.parent.taskFields.resourceInfo !== null) {
            args.data.ganttProperties['resources'] = serverReturnedValue[this.parent.taskFields.resourceInfo];
        }
    };
    Edit.prototype.addNewUndoCollection = function (record, args) {
        if (this.parent.undoRedoModule && (!this.parent.undoRedoModule['isUndoRedoPerformed'] || (this.parent.undoRedoModule['isUndoRedoPerformed'] && this.parent.undoRedoModule['currentAction']['action'] === 'Add' && this.parent.viewType === 'ResourceView'))
            && this.parent['isUndoRedoItemPresent']('Add')) {
            record['action'] = 'Add';
            var tempArray_1 = args.data.length > 0 ?
                extend([], [], args.data, true) : [args.data];
            var addedRec = [];
            var _loop_7 = function (i) {
                addedRec = (this_6.parent.flatData.filter(function (data) {
                    return (tempArray_1[i].index === data.index && tempArray_1[i]['ganttProperties'].taskId === data.ganttProperties.taskId);
                }));
            };
            var this_6 = this;
            for (var i = 0; i < tempArray_1.length; i++) {
                _loop_7(i);
            }
            record['addedRecords'] = extend([], [], addedRec, true);
            this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = record;
        }
    };
    /**
     * Method to add new record.
     *
     * @param {Object[] | Object} data - Defines the new data to add.
     * @param {RowPosition} rowPosition - Defines the position of row.
     * @param {number} rowIndex - Defines the row index.
     * @returns {void} .
     * @private
     */
    Edit.prototype.addRecord = function (data, rowPosition, rowIndex) {
        var _this = this;
        var tempTaskID = this.parent.taskFields.id;
        if (this.parent.editModule && this.parent.editSettings.allowAdding) {
            this.parent.isDynamicData = true;
            this.parent.treeGrid['isAddedFromGantt'] = true;
            this.parent.isOnAdded = true;
            var cAddedRecord_1 = [];
            if (isNullOrUndefined(data)) {
                this.validateTaskPosition(data, rowPosition, rowIndex, cAddedRecord_1);
            }
            else if (data instanceof Array) {
                if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed']) {
                    var addData = data;
                    var addIndex = rowIndex;
                    if (this.parent.viewType === 'ResourceView') {
                        if (data[0]['position'] === 'below') {
                            rowPosition = 'Below';
                        }
                        else if (data[0]['position'] === 'above') {
                            rowPosition = 'Above';
                        }
                        else if (data[0]['position'] === 'child') {
                            rowPosition = 'Child';
                        }
                        addIndex = this.parent.taskIds.indexOf(data[0]['id'].toString());
                        addData = data[0]['data'];
                    }
                    this.validateTaskPosition(addData, rowPosition, addIndex, cAddedRecord_1);
                }
                else {
                    for (var i = 0; i < data.length; i++) {
                        this.validateTaskPosition(data[i], rowPosition, rowIndex, cAddedRecord_1);
                    }
                }
            }
            else if (typeof (data) === 'object') {
                this.validateTaskPosition(data, rowPosition, rowIndex, cAddedRecord_1);
            }
            else {
                return;
            }
            var args = {};
            args = this.constructTaskAddedEventArgs(cAddedRecord_1, this.parent.editedRecords, 'beforeAdd');
            if (!isNullOrUndefined(rowPosition)) {
                args.rowPosition = rowPosition;
            }
            if (this.parent.undoRedoModule && !this.parent.undoRedoModule['isUndoRedoPerformed'] && this.parent['isUndoRedoItemPresent']('Add')) {
                if (this.parent.undoRedoModule['redoEnabled']) {
                    this.parent.undoRedoModule['disableRedo']();
                }
                this.parent.undoRedoModule['createUndoCollection']();
            }
            this.parent.trigger('actionBegin', args, function (args) {
                _this.parent.previousRecords = {};
                if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                    _this.parent.showMaskRow();
                }
                else {
                    _this.parent.showSpinner();
                }
                var tasks = _this.parent.taskFields;
                var ganttData;
                if (_this.parent.viewType === 'ResourceView') {
                    if (args.data['childRecords'].length > 0) {
                        ganttData = _this.parent.flatData[_this.parent.getTaskIds().indexOf('R' + args.data[tasks.id])];
                    }
                    else {
                        ganttData = _this.parent.flatData[_this.parent.getTaskIds().indexOf('T' + args.data[tasks.id])];
                    }
                }
                else {
                    ganttData = _this.parent.getRecordByID(args.data[tasks.id]);
                }
                if (!isNullOrUndefined(ganttData)) {
                    _this.validateUpdateValues(args.newTaskData, ganttData, true);
                    _this.parent.dateValidationModule.calculateEndDate(ganttData);
                    _this.parent.dataOperation.updateWidthLeft(ganttData);
                    _this.parent.dataOperation.updateParentItems(ganttData);
                }
                if (!isNullOrUndefined(args.data["" + tempTaskID])) {
                    if (args.data[tempTaskID] !== args.data['ganttProperties']['taskId']) {
                        for (var _i = 0, _b = Object.keys(_this.parent.ids); _i < _b.length; _i++) {
                            var key = _b[_i];
                            if (_this.parent.ids[key] === args.data['ganttProperties']['taskId'].toString()) {
                                _this.parent.ids[key] = args.data[tempTaskID].toString();
                                break;
                            }
                        }
                        args.data['ganttProperties']['taskId'] = args.data[tempTaskID];
                        args.newTaskData[tempTaskID] = args.data[tempTaskID];
                        args.data['ganttProperties']['rowUniqueID'] = args.data[tempTaskID].toString();
                    }
                }
                if (!args.cancel) {
                    var record = {};
                    if (isRemoteData(_this.parent.dataSource)) {
                        var data_2 = _this.parent.dataSource;
                        var updatedData_2 = {
                            addedRecords: [args.newTaskData],
                            changedRecords: args.modifiedTaskData
                        };
                        /* tslint:disable-next-line */
                        var query = _this.parent.query instanceof Query ? _this.parent.query : new Query();
                        var adaptor = data_2.adaptor;
                        if (!(adaptor instanceof WebApiAdaptor || adaptor instanceof ODataAdaptor ||
                            adaptor instanceof ODataV4Adaptor) || data_2.dataSource.batchUrl) {
                            /* tslint:disable-next-line */
                            var crud = data_2.saveChanges(updatedData_2, _this.parent.taskFields.id, null, query);
                            crud.then(function (e) {
                                if (e.addedRecords[0][_this.parent.taskFields.id].toString() !== args.data['ganttProperties']['taskId']) {
                                    args.data['ganttProperties']['taskId'] = e.addedRecords[0][_this.parent.taskFields.id].toString();
                                    args.newTaskData[tempTaskID] = e.addedRecords[0][_this.parent.taskFields.id].toString();
                                    args.data['ganttProperties']['rowUniqueID'] = e.addedRecords[0][_this.parent.taskFields.id].toString();
                                    _this.parent.ids.push(e.addedRecords[0][_this.parent.taskFields.id].toString());
                                }
                                var prevID = args.data.ganttProperties.taskId.toString();
                                if (_this.parent.taskFields.id && !isNullOrUndefined(e.addedRecords[0][_this.parent.taskFields.id]) &&
                                    e.addedRecords[0][_this.parent.taskFields.id].toString() === prevID) {
                                    _this.parent.setRecordValue('taskId', e.addedRecords[0][_this.parent.taskFields.id], args.data.ganttProperties, true);
                                    _this.parent.setRecordValue('taskData', e.addedRecords[0], args.data);
                                    _this.parent.setRecordValue(_this.parent.taskFields.id, e.addedRecords[0][_this.parent.taskFields.id], args.data);
                                    _this.parent.setRecordValue('rowUniqueID', e.addedRecords[0][_this.parent.taskFields.id].toString(), args.data.ganttProperties, true);
                                    _this.updateClientDataFromServer(e, args);
                                    var idsIndex = _this.parent.ids.indexOf(prevID);
                                    if (idsIndex !== -1) {
                                        _this.parent.ids[idsIndex] = e.addedRecords[0][_this.parent.taskFields.id].toString();
                                    }
                                }
                                _this.updateNewRecord(cAddedRecord_1, args);
                            }).catch(function (e) {
                                _this.removeAddedRecord();
                                _this.dmFailure(e, args);
                                _this._resetProperties();
                            });
                        }
                        else {
                            var addedRecords = 'addedRecords';
                            var insertCrud = data_2.insert(updatedData_2[addedRecords], null, query);
                            insertCrud.then(function (e) {
                                var addedRecords;
                                if (!isNullOrUndefined(e[0])) {
                                    addedRecords = e[0];
                                }
                                else {
                                    addedRecords = updatedData_2['addedRecords'][0];
                                }
                                cAddedRecord_1.forEach(function (record) {
                                    if (!isNullOrUndefined(record)) {
                                        _this.updateEditedRecordFields(addedRecords, record);
                                        _this.parent.dataOperation.updateTaskData(record);
                                    }
                                });
                                _this.updateNewRecord(cAddedRecord_1, args);
                            }).catch(function (e) {
                                _this.removeAddedRecord();
                                _this.dmFailure(e, args);
                                _this._resetProperties();
                            });
                        }
                    }
                    else {
                        if (_this.parent.viewType === 'ProjectView') {
                            if ((rowPosition === 'Top' || rowPosition === 'Bottom') ||
                                ((rowPosition === 'Above' || rowPosition === 'Below' || rowPosition === 'Child') || isNullOrUndefined(rowPosition) && !args.data.parentItem)) {
                                if (args.data instanceof Array) {
                                    _this.updateRealDataSource(args.data, rowPosition);
                                }
                                else {
                                    var data_3 = [];
                                    data_3.push(args.data);
                                    _this.updateRealDataSource(data_3, rowPosition);
                                    _this.parent.currentSelection = cAddedRecord_1[0];
                                }
                            }
                        }
                        else {
                            var dataSource = isCountRequired(_this.parent) ? getValue('result', _this.parent.dataSource) :
                                _this.parent.dataSource; // eslint-disable-line
                            dataSource.push(args.data.taskData);
                        }
                        if (cAddedRecord_1.level === 0) {
                            _this.parent.treeGrid.parentData.splice(0, 0, cAddedRecord_1);
                        }
                        _this.updateTreeGridUniqueID(cAddedRecord_1, 'add');
                        if (_this.parent.viewType === 'ResourceView' && _this.parent.undoRedoModule && _this.parent.undoRedoModule['currentAction']) {
                            var canDelete = false;
                            if (args.data['hasChildRecords']) {
                                canDelete = true;
                            }
                            else {
                                if (args.data['parentItem']) {
                                    var parentTask = _this.parent.getTaskByUniqueID(args.data['parentItem'].uniqueID);
                                    if (parentTask.ganttProperties.taskName !== _this.parent.localeObj.getConstant('unassignedTask')) {
                                        canDelete = true;
                                    }
                                }
                            }
                            if (_this.parent.taskIds.indexOf('R0') !== -1 && _this.parent.undoRedoModule && _this.parent.undoRedoModule['isUndoRedoPerformed'] && _this.parent.undoRedoModule['currentAction']['action'] === 'Delete'
                                && canDelete) {
                                var unassignedTask = _this.parent.flatData[_this.parent.taskIds.indexOf('R0')];
                                var isPresent = unassignedTask.childRecords.filter(function (data) { return data.ganttProperties.taskId === args.data['ganttProperties'].taskId; });
                                if (args.data['hasChildRecords']) {
                                    isPresent = args.data['childRecords'];
                                }
                                var _loop_8 = function (j) {
                                    if (unassignedTask.childRecords.length === 1) {
                                        _this.parent.flatData.splice(_this.parent.taskIds.indexOf('R0'), 2);
                                        _this.parent.ids.splice(_this.parent.taskIds.indexOf('R0'), 2);
                                        _this.parent.taskIds.splice(_this.parent.taskIds.indexOf('R0'), 2);
                                    }
                                    else {
                                        var index = _this.parent.taskIds.indexOf('T' + isPresent[j].ganttProperties.taskId);
                                        var id_2 = 'T' + isPresent[j].ganttProperties.taskId;
                                        var indexes = _this.parent.taskIds.reduce(function (a, e, i) {
                                            if (e === id_2) {
                                                a.push(i);
                                            }
                                            return a;
                                        }, []);
                                        index = indexes[indexes.length - 1];
                                        _this.parent.taskIds.splice(index, 1);
                                        _this.parent.flatData.splice(index, 1);
                                        _this.parent.ids.splice(index, 1);
                                    }
                                };
                                for (var j = 0; j < isPresent.length; j++) {
                                    _loop_8(j);
                                }
                                if (unassignedTask && _this.parent.viewType === 'ResourceView') {
                                    var isValid = _this.parent.flatData[_this.parent.taskIds.indexOf('R0') + 1];
                                    if (!isValid) {
                                        _this.parent.flatData.splice(_this.parent.taskIds.indexOf('R0'), 1);
                                        _this.parent.ids.splice(_this.parent.taskIds.indexOf('R0'), 1);
                                        _this.parent.taskIds.splice(_this.parent.taskIds.indexOf('R0'), 1);
                                    }
                                }
                            }
                        }
                        _this.refreshNewlyAddedRecord(args, cAddedRecord_1);
                        if (_this.parent.viewType === 'ResourceView' && _this.parent.taskFields.work && ganttData) {
                            _this.parent.dataOperation.updateParentItems(ganttData, true);
                        }
                        _this.addNewUndoCollection(record, args);
                        _this._resetProperties();
                    }
                    _this.parent.isOnAdded = false;
                }
                else {
                    _this.removeAddedRecord();
                    _this.reUpdatePreviousRecords();
                    _this._resetProperties();
                }
            });
        }
    };
    Edit.prototype.createNewRecord = function () {
        var tempRecord = {};
        var ganttColumns = this.parent.ganttColumns;
        var taskSettingsFields = this.parent.taskFields;
        var taskId = this.parent.editModule.getNewTaskId();
        for (var i = 0; i < ganttColumns.length; i++) {
            var fieldName = ganttColumns[i].field;
            if (fieldName === taskSettingsFields.id) {
                tempRecord[fieldName] = taskId;
            }
            else if (ganttColumns[i].field === taskSettingsFields.startDate) {
                if (isNullOrUndefined(tempRecord[taskSettingsFields.endDate])) {
                    tempRecord[fieldName] = this.parent.editModule.dialogModule.getMinimumStartDate();
                }
                else {
                    tempRecord[fieldName] = new Date(tempRecord[taskSettingsFields.endDate]);
                }
                if (this.parent.timezone) {
                    tempRecord[fieldName] = this.parent.dateValidationModule.remove(tempRecord[fieldName], this.parent.timezone);
                }
            }
            else if (ganttColumns[i].field === taskSettingsFields.endDate) {
                if (isNullOrUndefined(tempRecord[taskSettingsFields.startDate])) {
                    tempRecord[fieldName] = this.parent.editModule.dialogModule.getMinimumStartDate();
                }
                else {
                    tempRecord[fieldName] = new Date(tempRecord[taskSettingsFields.startDate]);
                }
                if (this.parent.timezone) {
                    tempRecord[fieldName] = this.parent.dateValidationModule.remove(tempRecord[fieldName], this.parent.timezone);
                }
            }
            else if (ganttColumns[i].field === taskSettingsFields.duration) {
                tempRecord[fieldName] = 1;
            }
            else if (ganttColumns[i].field === taskSettingsFields.name) {
                tempRecord[fieldName] = this.parent.editModule.dialogModule['localeObj'].getConstant('addDialogTitle') + ' ' + taskId;
            }
            else if (ganttColumns[i].field === taskSettingsFields.progress) {
                tempRecord[fieldName] = 0;
            }
            else if (ganttColumns[i].field === taskSettingsFields.work) {
                tempRecord[fieldName] = 0;
            }
            else if (ganttColumns[i].field === taskSettingsFields.type || ganttColumns[i].field === 'taskType') {
                tempRecord[fieldName] = this.parent.taskType;
            }
            else if (ganttColumns[i].field === taskSettingsFields.milestone) {
                tempRecord[fieldName] = null;
            }
            else {
                tempRecord[this.parent.ganttColumns[i].field] = '';
            }
        }
        return tempRecord;
    };
    /**
     * Method to validateTaskPosition.
     *
     * @param {Object | object[] } data - Defines the new data to add.
     * @param {RowPosition} rowPosition - Defines the position of row.
     * @param {number} rowIndex - Defines the row index.
     * @param {IGanttData} cAddedRecord - Defines the single data to validate.
     * @returns {void} .
     * @private
     */
    Edit.prototype.validateTaskPosition = function (data, rowPosition, rowIndex, cAddedRecord) {
        var selectedRowIndex = isNullOrUndefined(rowIndex) || isNaN(parseInt(rowIndex.toString(), 10)) ?
            this.parent.selectionModule ?
                (this.parent.selectionSettings.mode === 'Row' || this.parent.selectionSettings.mode === 'Both') &&
                    this.parent.selectionModule.selectedRowIndexes.length === 1 ?
                    this.parent.selectionModule.selectedRowIndexes[0] :
                    this.parent.selectionSettings.mode === 'Cell' &&
                        this.parent.selectionModule.getSelectedRowCellIndexes().length === 1 ?
                        this.parent.selectionModule.getSelectedRowCellIndexes()[0].rowIndex : null : null : rowIndex;
        this.addRowSelectedItem = isNullOrUndefined(selectedRowIndex) ? null : this.parent.updatedRecords[selectedRowIndex];
        rowPosition = isNullOrUndefined(rowPosition) ? this.parent.editSettings.newRowPosition : rowPosition;
        data = isNullOrUndefined(data) ? this.createNewRecord() : data;
        if (((isNullOrUndefined(selectedRowIndex) || selectedRowIndex < 0 ||
            isNullOrUndefined(this.addRowSelectedItem)) && (rowPosition === 'Above'
            || rowPosition === 'Below'
            || rowPosition === 'Child')) || !rowPosition || (rowPosition !== 'Above'
            && rowPosition !== 'Below'
            && rowPosition !== 'Child' && rowPosition !== 'Top' &&
            rowPosition !== 'Bottom')) {
            rowPosition = 'Top';
        }
        var level = 0;
        var parentItem;
        switch (rowPosition) {
            case 'Top':
            case 'Bottom':
                if (this.parent.viewType === 'ResourceView') {
                    level = 1;
                }
                else {
                    level = 0;
                }
                break;
            case 'Above':
            case 'Below':
                level = this.addRowSelectedItem.level;
                parentItem = this.parent.getParentTask(this.addRowSelectedItem.parentItem);
                break;
            case 'Child':
                level = this.addRowSelectedItem.level + 1;
                parentItem = this.addRowSelectedItem;
                break;
        }
        if (!this.parent.undoRedoModule || !this.parent.undoRedoModule['isUndoRedoPerformed']) {
            this.prepareNewlyAddedData(data, rowPosition);
        }
        var AddRecord = (this.updateNewlyAddedDataBeforeAjax(data, level, rowPosition, parentItem, rowIndex));
        cAddedRecord.push(AddRecord);
    };
    Edit.prototype.updateRowIndex = function () {
        var currentViewData = this.parent.currentViewData;
        var rowCount = currentViewData.length;
        for (var index = 0; index < rowCount; index++) {
            var rowIndex = index;
            currentViewData[index].index = rowIndex;
            if (currentViewData[index].parentItem && currentViewData[index].parentItem.taskId) {
                var parentRecord = this.parent.getRecordByID(currentViewData[index].parentItem.taskId);
                if (!isNullOrUndefined(parentRecord) && !isNullOrUndefined(parentRecord.index) &&
                    !isNullOrUndefined(parentRecord.level)) {
                    currentViewData[index].parentItem.index = parentRecord.index;
                    currentViewData[index].parentItem.level = parentRecord.level;
                }
            }
        }
    };
    Edit.prototype.updateNewRecord = function (cAddedRecord, args) {
        var _this = this;
        cAddedRecord.forEach(function (record) {
            if (record.level === 0) {
                _this.parent.treeGrid.parentData.splice(0, 0, record);
                var tempData = getValue('dataOperation.dataArray', _this.parent);
                tempData.splice(0, 0, record.taskData);
            }
            _this.updateTreeGridUniqueID(record, 'add');
        });
        this.updateTreeGridUniqueID(cAddedRecord, 'add');
        this.refreshNewlyAddedRecord(args, cAddedRecord);
        var objCollection = {};
        this.addNewUndoCollection(objCollection, args);
        this._resetProperties();
    };
    /**
     * Method to reset the flag after adding new record
     *
     * @returns {void} .
     */
    Edit.prototype._resetProperties = function () {
        this.parent.isOnEdit = false;
        this.parent.hideSpinner();
        this.addRowSelectedItem = null;
        this.newlyAddedRecordBackup = null;
        this.isBreakLoop = false;
        this.parent.element.tabIndex = 0;
        this.parent.initiateEditAction(false);
    };
    /**
     * Method to update unique id collection in TreeGrid
     *
     * @param {IGanttData} data .
     * @param {string} action .
     * @returns {void} .
     */
    Edit.prototype.updateTreeGridUniqueID = function (data, action) {
        if (action === 'add') {
            setValue('uniqueIDCollection.' + data.uniqueID, data, this.parent.treeGrid);
        }
        else if (action === 'delete') {
            deleteObject(getValue('uniqueIDCollection', this.parent.treeGrid), data.uniqueID);
        }
    };
    Edit.prototype.refreshNewlyAddedRecord = function (args, cAddedRecord) {
        var _this = this;
        if (this.parent.selectionModule && this.parent.allowSelection &&
            (this.parent.selectionSettings.mode === 'Row' || this.parent.selectionSettings.mode === 'Both')) {
            this.parent.staticSelectedRowIndex = this.parent.currentViewData.indexOf(args.data);
        }
        if (this.parent.timelineSettings.updateTimescaleView) {
            var tempArray = [];
            if (args.modifiedRecords.length > 0) {
                tempArray = args.data.length > 0 ?
                    extend([], [], args.data, true) : [args.data]; // eslint-disable-next-line
                tempArray.push.apply(tempArray, args.modifiedRecords);
            }
            else {
                tempArray = args.data.length > 0 ?
                    extend([], [], args.data, true) : [args.data];
            }
            this.parent.timelineModule.updateTimeLineOnEditing([tempArray], args.action);
        }
        this.addSuccess(args);
        args = this.constructTaskAddedEventArgs(cAddedRecord, args.modifiedRecords, 'add');
        this.updateRowIndex();
        this.parent.trigger('actionComplete', args);
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
            this.parent.hideMaskRow();
        }
        else {
            this.parent.hideSpinner();
        }
        if (this.dialogModule.dialog && !this.dialogModule.dialogObj.isDestroyed) {
            this.dialogModule.dialogObj.hide();
        }
        this.dialogModule.dialogClose();
        if (this.parent.viewType === 'ResourceView') {
            if (cAddedRecord.length > 1) {
                for (var i = 0; i < cAddedRecord.length; i++) {
                    args.data[i].ganttProperties.sharedTaskUniqueIds.push(args.data[i]
                        .ganttProperties.rowUniqueID);
                    if (args.data[i].ganttProperties.resourceInfo) {
                        // if ((args.data[i] as IGanttData).ganttProperties.resourceInfo.length > 1) {
                        var resources = extend([], [], args.data[i].ganttProperties.resourceInfo, true);
                        resources.splice(0, 1);
                        this.updateResoures([], resources, args.data[i]);
                        // }
                    }
                    else {
                        if (!this.parent.undoRedoModule || (this.parent.undoRedoModule && !args.data[i]['hasChildRecords'] && this.parent.undoRedoModule['isUndoRedoPerformed'] || !this.parent.undoRedoModule['isUndoRedoPerformed'])) {
                            this.removeChildRecord(args.data[i]);
                            this.parent.editModule.checkWithUnassignedTask(args.data[i]);
                        }
                    }
                    for (var k = 0; k < this.updateParentRecords.length; k++) {
                        this.parent.dataOperation.updateParentItems(this.updateParentRecords[k]);
                    }
                    this.updateParentRecords = [];
                }
            }
            else {
                args.data.ganttProperties.sharedTaskUniqueIds.push(args.data.ganttProperties.rowUniqueID);
                // eslint-disable-next-line
                var ganttData = args.data;
                var ganttProperties = ganttData.ganttProperties;
                var childRecords = ganttData.childRecords;
                var undoRedoModule_1 = this.parent.undoRedoModule;
                var handleResourceUpdate = function (resourceInfo, targetData) {
                    if (resourceInfo && resourceInfo.length > 1) {
                        var resources = extend([], [], resourceInfo, true);
                        resources.splice(0, 1);
                        if (undoRedoModule_1 && undoRedoModule_1['isUndoRedoPerformed']) {
                            _this.parent.editModule.addRowIndex = undefined;
                        }
                        _this.updateResoures([], resources, targetData);
                    }
                };
                // eslint-disable-next-line
                if (ganttProperties.resourceInfo && ganttProperties.resourceInfo.length) {
                    handleResourceUpdate(ganttProperties.resourceInfo, ganttData);
                }
                else if (childRecords.length > 0 && childRecords[0].ganttProperties.resourceInfo &&
                    childRecords[0].ganttProperties.resourceInfo.length) {
                    handleResourceUpdate(childRecords[0].ganttProperties.resourceInfo, args.data.childRecords[0]);
                }
                else {
                    if (!this.parent.undoRedoModule || (this.parent.undoRedoModule && !args.data['hasChildRecords'] && this.parent.undoRedoModule['isUndoRedoPerformed'] || !this.parent.undoRedoModule['isUndoRedoPerformed'])) {
                        this.removeChildRecord(args.data);
                        this.parent.editModule.checkWithUnassignedTask(args.data);
                    }
                }
                for (var k = 0; k < this.updateParentRecords.length; k++) {
                    this.parent.dataOperation.updateParentItems(this.updateParentRecords[k]);
                }
                this.updateParentRecords = [];
            }
        }
    };
    /**
     *
     * @returns {void} .
     * @private
     */
    Edit.prototype.removeAddedRecord = function () {
        var flatRecords = this.parent.flatData;
        var currentViewData = this.parent.currentViewData;
        var ids = this.parent.ids;
        var flatRecordsIndex = flatRecords.indexOf(this.newlyAddedRecordBackup);
        var currentViewDataIndex = currentViewData.indexOf(this.newlyAddedRecordBackup);
        var idsIndex = ids.indexOf(this.newlyAddedRecordBackup.ganttProperties.rowUniqueID.toString());
        deleteObject(this.parent.previousRecords, flatRecords[flatRecordsIndex].uniqueID);
        if (this.newlyAddedRecordBackup.parentItem) {
            var parentItem = this.parent.getParentTask(this.newlyAddedRecordBackup.parentItem);
            var parentIndex = parentItem.childRecords.indexOf(this.newlyAddedRecordBackup);
            parentItem.childRecords.splice(parentIndex, 1);
            if (parentItem.childRecords.length === 0 && parentItem.hasChildRecords) {
                parentItem.hasChildRecords = false;
            }
        }
        flatRecords.splice(flatRecordsIndex, 1);
        currentViewData.splice(currentViewDataIndex, 1);
        ids.splice(idsIndex, 1);
    };
    Edit.prototype.getPrevRecordIndex = function () {
        var prevRecord = this.parent.updatedRecords[this.parent.selectionModule.getSelectedRowIndexes()[0] - 1];
        var selectedRecord = this.parent.selectionModule.getSelectedRecords()[0];
        var parent = this.parent.getRootParent(prevRecord, selectedRecord.level);
        var prevIndex = this.parent.updatedRecords.indexOf(parent);
        return prevIndex;
    };
    /**
     * indent a selected record
     *
     * @returns {void} .
     */
    Edit.prototype.indent = function () {
        var index = this.parent.selectedRowIndex;
        var isSelected = this.parent.selectionModule ? this.parent.selectionModule.selectedRowIndexes.length === 1 ||
            this.parent.selectionModule.getSelectedRowCellIndexes().length === 1 ? true : false : false;
        var dropIndex;
        var prevRecord = this.parent.updatedRecords[this.parent.selectionModule.getSelectedRowIndexes()[0] - 1];
        var selectedRecord = this.parent.selectionModule.getSelectedRecords()[0];
        if (!this.parent.editSettings.allowEditing || index === 0 || index === -1 || !isSelected ||
            this.parent.viewType === 'ResourceView' || !isNullOrUndefined(this.parent.updatedRecords[index]) && this.parent.updatedRecords[index].level - prevRecord.level === 1) {
            return;
        }
        else {
            if (prevRecord.level - selectedRecord.level === 0) {
                dropIndex = this.parent.selectionModule.getSelectedRowIndexes()[0] - 1;
            }
            else {
                dropIndex = this.getPrevRecordIndex();
            }
            this.indentOutdentRow([this.parent.selectionModule.getSelectedRowIndexes()[0]], dropIndex, 'child');
        }
    };
    /**
     * To perform outdent operation for selected row
     *
     * @returns {void} .
     */
    Edit.prototype.outdent = function () {
        var index = this.parent.selectionModule.getSelectedRowIndexes()[0];
        var dropIndex;
        var isSelected = this.parent.selectionModule ? this.parent.selectionModule.selectedRowIndexes.length === 1 ||
            this.parent.selectionModule.getSelectedRowCellIndexes().length === 1 ? true : false : false;
        if (!this.parent.editSettings.allowEditing || index === -1 || index === 0 || !isSelected ||
            this.parent.viewType === 'ResourceView' || this.parent.updatedRecords[index].level === 0) {
            return;
        }
        else {
            var thisParent = this.parent.getTaskByUniqueID(this.parent.selectionModule.getSelectedRecords()[0].parentItem.uniqueID);
            dropIndex = this.parent.updatedRecords.indexOf(thisParent);
            this.indentOutdentRow([index], dropIndex, 'below');
        }
    };
    Edit.prototype.indentOutdentRow = function (fromIndexes, toIndex, pos) {
        var _this = this;
        // eslint-disable-next-line
        if (fromIndexes[0] !== toIndex && pos === 'above' || 'below' || 'child') {
            if (pos === 'above') {
                this.dropPosition = 'topSegment';
            }
            if (pos === 'below') {
                this.dropPosition = 'bottomSegment';
            }
            if (pos === 'child') {
                this.dropPosition = 'middleSegment';
            }
            var action = void 0;
            var record = [];
            for (var i = 0; i < fromIndexes.length; i++) {
                if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed'] && this.parent.undoRedoModule['currentAction']) {
                    if (this.parent.undoRedoModule['currentAction']['modifiedRecord']) {
                        record[i] = this.parent.undoRedoModule['currentAction']['modifiedRecord'][i].data;
                    }
                    else {
                        record[i] = this.parent.undoRedoModule['currentAction']['data'][i];
                    }
                }
                else {
                    record[i] = this.parent.updatedRecords[fromIndexes[i]];
                }
            }
            var isByMethod_1 = true;
            var args_1 = {
                data: record,
                dropIndex: toIndex,
                dropPosition: this.dropPosition
            };
            if (this.dropPosition === 'middleSegment') {
                action = 'indenting';
            }
            else if (this.dropPosition === 'bottomSegment') {
                action = 'outdenting';
            }
            var actionArgs = {
                action: action,
                data: record[0],
                cancel: false
            };
            this.parent.trigger('actionBegin', actionArgs, function (actionArg) {
                if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                    _this.parent.showMaskRow();
                }
                else {
                    _this.parent.showSpinner();
                }
                if (!actionArg.cancel) {
                    _this.reArrangeRows(args_1, isByMethod_1);
                }
                else {
                    if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                        _this.parent.hideMaskRow();
                    }
                    else {
                        _this.parent.hideSpinner();
                    }
                    return;
                }
            });
        }
        else {
            return;
        }
    };
    Edit.prototype.reArrangeRows = function (args, isByMethod) {
        var _this = this;
        this.dropPosition = args.dropPosition;
        this.parent['oldRecords'] = [];
        this.parent['oldRecords'] = extend([], [], args.data, true);
        if (args.dropPosition !== 'Invalid' && this.parent.editModule) {
            var obj = this.parent;
            var draggedRec = void 0;
            this.droppedRecord = obj.updatedRecords[args.dropIndex];
            var action = args.dropPosition === 'middleSegment' ? 'Indent' : 'Outdent';
            if (this.parent.undoRedoModule && !this.parent.undoRedoModule['isUndoRedoPerformed'] && this.parent['isUndoRedoItemPresent'](action)) {
                var record = {};
                record['action'] = action;
                record['modifiedRecord'] = [];
                record['selectedRowIndexes'] = extend([], [], this.parent.selectionModule.selectedRowIndexes, true);
                this.parent.undoRedoModule['findPosition'](extend([], [], [args.data], true)[0], record, 'modifiedRecord');
                record['droppedRecord'] = extend([], [], this.droppedRecord, true);
                if (this.parent.undoRedoModule['redoEnabled']) {
                    this.parent.undoRedoModule['redoEnabled'] = false;
                    this.parent.undoRedoModule['getUndoCollection'] = [];
                    this.parent.undoRedoModule['getRedoCollection'] = [];
                    if (this.parent.toolbarModule) {
                        this.parent.toolbarModule.enableItems([this.parent.controlId + '_redo'], false);
                    }
                    this.parent.undoRedoModule['getUndoCollection'][0] = [];
                }
                this.parent.undoRedoModule['createUndoCollection']();
                this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = record;
            }
            var dragRecords = [];
            var droppedRec = this.droppedRecord;
            if (!args.data[0]) {
                dragRecords.push(args.data);
            }
            else {
                dragRecords = args.data;
            }
            var c = 0;
            var dLength = dragRecords.length;
            for (var i = 0; i < dLength; i++) {
                this.parent.isOnEdit = true;
                draggedRec = dragRecords[i];
                this.draggedRecord = draggedRec;
                if (this.dropPosition !== 'Invalid') {
                    if (isByMethod) {
                        this.deleteDragRow();
                    }
                    var recordIndex1 = this.treeGridData.indexOf(droppedRec);
                    this.parent.editModule.updateResourceRelatedFields(droppedRec, '');
                    if (this.dropPosition === 'bottomSegment') {
                        if (!droppedRec.hasChildRecords) {
                            if (this.parent.taskFields.parentID && this.ganttData.length > 0) {
                                this.ganttData.splice(recordIndex1 + 1, 0, this.draggedRecord.taskData);
                            }
                            this.treeGridData.splice(recordIndex1 + 1, 0, this.draggedRecord);
                            this.parent.ids.splice(recordIndex1 + 1, 0, this.draggedRecord.ganttProperties.rowUniqueID.toString());
                        }
                        else {
                            c = this.parent.editModule.getChildCount(droppedRec, 0);
                            if (this.parent.taskFields.parentID && this.ganttData.length > 0) {
                                this.ganttData.splice(recordIndex1 + c + 1, 0, this.draggedRecord.taskData);
                            }
                            this.treeGridData.splice(recordIndex1 + c + 1, 0, this.draggedRecord);
                            this.parent.ids.splice(recordIndex1 + c + 1, 0, this.draggedRecord.ganttProperties.rowUniqueID.toString());
                            var idIndex = this.parent.ids.indexOf(this.draggedRecord[this.parent.taskFields.id].toString());
                            if (idIndex !== recordIndex1 + c + 1) {
                                this.parent.ids.splice(idIndex, 1);
                                this.parent.ids.splice(recordIndex1 + c + 1, 0, this.draggedRecord[this.parent.taskFields.id].toString());
                            }
                        }
                        this.parent.setRecordValue('parentItem', this.treeGridData[recordIndex1].parentItem, draggedRec);
                        this.parent.setRecordValue('parentUniqueID', this.treeGridData[recordIndex1].parentUniqueID, draggedRec);
                        this.parent.setRecordValue('level', this.treeGridData[recordIndex1].level, draggedRec);
                        if (draggedRec.hasChildRecords) {
                            var level = 1;
                            this.updateChildRecordLevel(draggedRec, level);
                            this.updateChildRecord(draggedRec, recordIndex1 + c + 1);
                        }
                        if (droppedRec.parentItem) {
                            var record = this.parent.getParentTask(droppedRec.parentItem).childRecords;
                            var childRecords = record;
                            var droppedRecordIndex = childRecords.indexOf(droppedRec) + 1;
                            childRecords.splice(droppedRecordIndex, 0, draggedRec);
                        }
                    }
                    if (this.dropPosition === 'middleSegment') {
                        this.dropMiddle(recordIndex1);
                    }
                    if (!isNullOrUndefined(draggedRec.parentItem && this.updateParentRecords.indexOf(draggedRec.parentItem) !== -1)) {
                        this.updateParentRecords.push(this.parent.getTaskByUniqueID(draggedRec.parentItem.uniqueID));
                    }
                }
                if (isNullOrUndefined(draggedRec.parentItem)) {
                    var parentRecords = this.parent.treeGrid.parentData;
                    var newParentIndex = parentRecords.indexOf(this.droppedRecord);
                    if (this.dropPosition === 'bottomSegment') {
                        parentRecords.splice(newParentIndex + 1, 0, draggedRec);
                    }
                }
                this.refreshDataSource();
            }
            if (this.dropPosition === 'middleSegment') {
                if (!isNullOrUndefined(droppedRec.ganttProperties.predecessor)) {
                    var len = droppedRec.ganttProperties.predecessor.length;
                    for (var count = len - 1; count >= 0; count--) {
                        if (!isNullOrUndefined(droppedRec.ganttProperties.predecessor)) {
                            var fromRecord = this.parent.getRecordByID(droppedRec.ganttProperties.predecessor[count].from);
                            var toRecord = this.parent.getRecordByID(droppedRec.ganttProperties.predecessor[count].to);
                            var validPredecessor = this.parent.predecessorModule.validateParentPredecessor(fromRecord, toRecord);
                            if (droppedRec.ganttProperties.predecessor && (!validPredecessor || !this.parent.allowParentDependency)) {
                                this.parent.editModule.removePredecessorOnDelete(droppedRec);
                                droppedRec.ganttProperties.predecessor.splice(count, 1);
                                droppedRec.ganttProperties.predecessorsName = null;
                                droppedRec[this.parent.taskFields.dependency] = null;
                                droppedRec.taskData[this.parent.taskFields.dependency] = null;
                            }
                        }
                    }
                }
                if (droppedRec.ganttProperties.isMilestone) {
                    this.parent.setRecordValue('isMilestone', false, droppedRec.ganttProperties, true);
                    if (!isNullOrUndefined(droppedRec.taskData[this.parent.taskFields.milestone])) {
                        if (droppedRec.taskData[this.parent.taskFields.milestone] === true) {
                            droppedRec.taskData[this.parent.taskFields.milestone] = false;
                        }
                    }
                }
            }
            for (var k = 0; k < this.updateParentRecords.length; k++) {
                this.parent.dataOperation.updateParentItems(this.updateParentRecords[k]);
            }
            this.parent.editedRecords.forEach(function (record) {
                _this.isFirstCall = true;
                _this.parent.predecessorModule.validatePredecessor(record, [], '');
            });
            for (var k = 0; k < this.updateParentRecords.length; k++) {
                this.parent.dataOperation.updateParentItems(this.updateParentRecords[k]);
            }
            this.updateParentRecords = [];
            this.parent.isOnEdit = false;
        }
        this.canReset = true;
        this.refreshRecord(args);
    };
    /**
     * @returns {void} .
     * @param {RowDropEventArgs} args .
     * @param {boolean} isDrag .
     * @private
     */
    Edit.prototype.refreshRecord = function (args, isDrag) {
        var _this = this;
        if (isRemoteData(this.parent.dataSource)) {
            var data = this.parent.dataSource;
            var updatedData = {
                changedRecords: getTaskData(this.parent.editedRecords, null, null, this.parent)
            };
            var queryValue = this.parent.query instanceof Query ? this.parent.query : new Query();
            var crud = null;
            var adaptor = data.adaptor;
            if (!(adaptor instanceof WebApiAdaptor && adaptor instanceof ODataAdaptor) || data.dataSource.batchUrl) {
                crud = data.saveChanges(updatedData, this.parent.taskFields.id, null, queryValue);
            }
            else {
                var changedRecords = 'changedRecords';
                crud = data.update(this.parent.taskFields.id, updatedData[changedRecords], null, queryValue);
            }
            crud.then(function (e) { return _this.indentSuccess(e, args, isDrag); })
                .catch(function (e) { return _this.indentFailure(e); });
        }
        else {
            this.indentOutdentSuccess(args, isDrag);
        }
    };
    Edit.prototype.indentSuccess = function (e, args, isDrag) {
        this.updateEditedFields(e);
        this.indentOutdentSuccess(args, isDrag);
    };
    Edit.prototype.indentFailure = function (e) {
        this.parent.trigger('actionFailure', { error: e });
    };
    Edit.prototype.indentOutdentSuccess = function (args, isDrag) {
        this.parent.treeGrid.parentData = [];
        if (this.parent.treeGrid.editModule) {
            this.parent.treeGrid.editModule['isOnBatch'] = false;
        }
        this.parent.treeGrid.refresh();
        if (this.parent.enableImmutableMode) {
            this.refreshRecordInImmutableMode(args.data, isDrag);
            this.parent.chartRowsModule.refreshRecords(this.parent.editedRecords);
        }
        if (isDrag) {
            args.requestType = 'rowDropped';
        }
        else {
            if (this.dropPosition === 'middleSegment') {
                args.requestType = 'indented';
            }
            else if (this.dropPosition === 'bottomSegment') {
                args.requestType = 'outdented';
            }
        }
        args.modifiedRecords = this.parent.editedRecords;
        if (this.parent.timezone) {
            for (var i = 0; i < args.modifiedRecords.length; i++) {
                updateDates(args.modifiedRecords[i], this.parent);
            }
        }
        if (this.canReset) {
            this.parent.previousRecords = {};
        }
        this.canReset = false;
        this.parent.trigger('actionComplete', args);
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
            this.parent.hideMaskRow();
        }
        else {
            this.parent.hideSpinner();
        }
        if (this.parent.rowDragAndDropModule) {
            this.parent.rowDragAndDropModule['draggedRecord'] = null;
        }
    };
    Edit.prototype.refreshDataSource = function () {
        var draggedRec = this.draggedRecord;
        var droppedRec = this.droppedRecord;
        var proxy = this.parent;
        var tempData;
        var indx;
        if (this.parent.dataSource instanceof DataManager) {
            tempData = getValue('dataOperation.dataArray', this.parent);
        }
        else {
            tempData = proxy.dataSource;
        }
        if (tempData.length > 0 && (!isNullOrUndefined(droppedRec) && !droppedRec.parentItem)) {
            for (var i = 0; i < Object.keys(tempData).length; i++) {
                if (tempData[i][this.parent.taskFields.child] === droppedRec.taskData[this.parent.taskFields.child]) {
                    indx = i;
                }
            }
            if (this.dropPosition === 'topSegment') {
                if (!this.parent.taskFields.parentID) {
                    tempData.splice(indx, 0, draggedRec.taskData);
                }
            }
            else if (this.dropPosition === 'bottomSegment') {
                if (!this.parent.taskFields.parentID) {
                    tempData.splice(indx + 1, 0, draggedRec.taskData);
                }
            }
        }
        else if (!this.parent.taskFields.parentID && (!isNullOrUndefined(droppedRec) && droppedRec.parentItem)) {
            if (this.dropPosition === 'topSegment' || this.dropPosition === 'bottomSegment') {
                var rowPos = this.dropPosition === 'topSegment' ? 'Above' : 'Below';
                this.parent.editModule.addRowSelectedItem = droppedRec;
                var dragRecord = [];
                if (!Array.isArray(draggedRec)) {
                    dragRecord[0] = draggedRec;
                }
                else {
                    dragRecord = draggedRec;
                }
                this.parent.editModule.updateRealDataSource(dragRecord, rowPos);
                delete this.parent.editModule.addRowSelectedItem;
            }
        }
        if (this.parent.taskFields.parentID) {
            if (draggedRec.parentItem) {
                if (this.dropPosition === 'topSegment' || this.dropPosition === 'bottomSegment') {
                    draggedRec[this.parent.taskFields.parentID] = droppedRec[this.parent.taskFields.parentID];
                    draggedRec.taskData[this.parent.taskFields.parentID] = droppedRec[this.parent.taskFields.parentID];
                    draggedRec.ganttProperties['parentId'] = droppedRec[this.parent.taskFields.parentID];
                }
                else {
                    draggedRec[this.parent.taskFields.parentID] = droppedRec[this.parent.taskFields.id];
                    draggedRec.taskData[this.parent.taskFields.parentID] = droppedRec[this.parent.taskFields.id];
                    draggedRec.ganttProperties['parentId'] = droppedRec[this.parent.taskFields.id];
                }
            }
            else {
                draggedRec[this.parent.taskFields.parentID] = null;
                draggedRec.taskData[this.parent.taskFields.parentID] = null;
                draggedRec.ganttProperties['parentId'] = null;
            }
        }
    };
    Edit.prototype.deleteDragRow = function () {
        if (this.parent.dataSource instanceof DataManager) {
            this.ganttData = getValue('dataOperation.dataArray', this.parent);
        }
        else {
            this.ganttData = isCountRequired(this.parent) ? getValue('result', this.parent.dataSource) :
                this.parent.dataSource;
        }
        this.treeGridData = isCountRequired(this.parent) ?
            getValue('result', this.parent.treeGrid.dataSource) : this.parent.treeGrid.dataSource;
        var delRow = this.parent.getTaskByUniqueID(this.draggedRecord.uniqueID);
        this.removeRecords(delRow);
    };
    Edit.prototype.updateIndentedChildRecords = function (indentedRecord) {
        var createParentItem = {
            uniqueID: indentedRecord.uniqueID,
            expanded: indentedRecord.expanded,
            level: indentedRecord.level,
            index: indentedRecord.index,
            taskId: indentedRecord.ganttProperties.rowUniqueID
        };
        for (var i = 0; i < indentedRecord.childRecords.length; i++) {
            this.parent.setRecordValue('parentItem', createParentItem, indentedRecord.childRecords[i]);
            this.parent.setRecordValue('parentUniqueID', indentedRecord.uniqueID, indentedRecord.childRecords[i]);
        }
        if (indentedRecord.hasChildRecords) {
            indentedRecord = indentedRecord.childRecords;
            for (var j = 0; j < indentedRecord['length']; j++) {
                this.updateIndentedChildRecords(indentedRecord[j]);
            }
        }
    };
    Edit.prototype.dropMiddle = function (recordIndex1) {
        var obj = this.parent;
        var childRec;
        var childRecordsLength;
        if (this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed'] && this.parent.undoRedoModule['currentAction']['modifiedRecord']
            && this.parent.undoRedoModule['currentAction']['modifiedRecord'][0].position !== 'child') {
            if (this.parent.undoRedoModule['currentAction']['modifiedRecord'][0].position === 'above') {
                childRecordsLength = this.parent.ids.indexOf(this.parent.undoRedoModule['currentAction']['modifiedRecord'][0].id.toString());
            }
            else if (this.parent.undoRedoModule['currentAction']['modifiedRecord'][0].position === 'below') {
                childRecordsLength = this.parent.ids.indexOf(this.parent.undoRedoModule['currentAction']['modifiedRecord'][0].id.toString()) + 1;
            }
        }
        else {
            childRec = this.parent.editModule.getChildCount(this.droppedRecord, 0);
            childRecordsLength = (isNullOrUndefined(childRec) ||
                childRec === 0) ? recordIndex1 + 1 :
                childRec + recordIndex1 + 1;
        }
        if (this.dropPosition === 'middleSegment') {
            if (this.droppedRecord.ganttProperties.isAutoSchedule &&
                !isNullOrUndefined(this.droppedRecord.ganttProperties.predecessorsName) &&
                this.droppedRecord.ganttProperties.predecessorsName !== '') {
                var startDate = this.droppedRecord.ganttProperties.startDate;
                this.parent.setRecordValue('startDate', startDate, this.draggedRecord.ganttProperties, true);
                this.parent.dateValidationModule.calculateEndDate(this.draggedRecord);
                this.parent.dataOperation.updateTaskData(this.draggedRecord);
                this.parent.dataOperation['updateTaskLeftWidth'](this.draggedRecord);
            }
            if (obj.taskFields.parentID && this.ganttData.length > 0) {
                this.ganttData.splice(childRecordsLength, 0, this.draggedRecord.taskData);
            }
            this.treeGridData.splice(childRecordsLength, 0, this.draggedRecord);
            this.parent.ids.splice(childRecordsLength, 0, this.draggedRecord[this.parent.taskFields.id].toString());
            this.recordLevel();
            if (this.draggedRecord.hasChildRecords) {
                this.updateChildRecord(this.draggedRecord, childRecordsLength, this.droppedRecord.expanded);
                if (this.parent.enableImmutableMode) {
                    var indentedRecord = this.draggedRecord;
                    this.updateIndentedChildRecords(indentedRecord);
                }
            }
            if (isNullOrUndefined(this.draggedRecord.parentItem &&
                this.updateParentRecords.indexOf(this.draggedRecord.parentItem) !== -1)) {
                this.updateParentRecords.push(this.draggedRecord.parentItem);
            }
        }
    };
    Edit.prototype.updateChildRecordLevel = function (record, levl) {
        var length = 0;
        var currentRec;
        levl++;
        if (!record.hasChildRecords) {
            return 0;
        }
        length = record.childRecords.length;
        for (var j = 0; j < length; j++) {
            currentRec = record.childRecords[j];
            var parentData = void 0;
            if (record.parentItem) {
                var id = 'uniqueIDCollection';
                parentData = this.parent.treeGrid[id][record.parentItem.uniqueID];
            }
            currentRec.level = record.parentItem ? parentData.level + levl : record.level + 1;
            if (currentRec.hasChildRecords) {
                levl--;
                levl = this.updateChildRecordLevel(currentRec, levl);
            }
        }
        return levl;
    };
    /* eslint-disable-next-line */
    Edit.prototype.updateChildRecord = function (record, count, expanded) {
        var currentRec;
        var obj = this.parent;
        var length = 0;
        if (!record.hasChildRecords) {
            return 0;
        }
        length = record.childRecords.length;
        for (var i = 0; i < length; i++) {
            currentRec = record.childRecords[i];
            count++;
            obj.flatData.splice(count, 0, currentRec);
            this.parent.ids.splice(count, 0, currentRec.ganttProperties.rowUniqueID.toString());
            if (obj.taskFields.parentID && this.ganttData.length > 0) {
                this.ganttData.splice(count, 0, currentRec.taskData);
            }
            if (currentRec.hasChildRecords) {
                count = this.updateChildRecord(currentRec, count);
            }
        }
        return count;
    };
    Edit.prototype.removeRecords = function (record) {
        var obj = this.parent;
        var dataSource;
        if (this.parent.dataSource instanceof DataManager) {
            dataSource = getValue('dataOperation.dataArray', this.parent);
        }
        else {
            dataSource = this.parent.dataSource;
        }
        var delRow = record;
        if (delRow) {
            var flatParent = this.parent.getParentTask(delRow.parentItem);
            if (delRow.parentItem) {
                var childRecords = flatParent ? flatParent.childRecords : [];
                var childIndex = 0;
                if (childRecords && childRecords.length > 0) {
                    childIndex = childRecords.indexOf(delRow);
                    flatParent.childRecords.splice(childIndex, 1);
                    if (!this.parent.taskFields.parentID) {
                        flatParent.taskData[this.parent.taskFields.child].splice(childIndex, 1);
                    }
                    // collection for updating parent record
                    this.updateParentRecords.push(flatParent);
                }
            }
            if (obj.taskFields.parentID) {
                if (delRow.hasChildRecords && delRow.childRecords.length > 0) {
                    this.removeChildItem(delRow);
                }
                var indx = void 0;
                var ganttData = dataSource.length > 0 ?
                    dataSource : this.parent.currentViewData;
                for (var i = 0; i < ganttData.length; i++) {
                    if (ganttData[i][this.parent.taskFields.id] === delRow.taskData[this.parent.taskFields.id]) {
                        indx = i;
                    }
                }
                if (indx !== -1) {
                    if (dataSource.length > 0) {
                        dataSource.splice(indx, 1);
                    }
                    var gridIndx = void 0;
                    for (var i = 0; i < this.treeGridData.length; i++) {
                        if (this.treeGridData[i][this.parent.taskFields.id] === delRow.taskData[this.parent.taskFields.id]) {
                            gridIndx = i;
                        }
                    }
                    this.treeGridData.splice(gridIndx, 1);
                    this.parent.ids.splice(gridIndx, 1);
                    if (this.parent.treeGrid.parentData.indexOf(delRow) !== -1) {
                        this.parent.treeGrid.parentData.splice(this.parent.treeGrid.parentData.indexOf(delRow), 1);
                    }
                }
            }
            var recordIdx = this.treeGridData.indexOf(delRow);
            if (!obj.taskFields.parentID) {
                var deletedRecordCount = this.getChildCount(delRow, 0);
                this.treeGridData.splice(recordIdx, deletedRecordCount + 1);
                this.parent.ids.splice(recordIdx, deletedRecordCount + 1);
                var parentIndex = this.ganttData.indexOf(delRow.taskData);
                if (parentIndex !== -1) {
                    this.ganttData.splice(parentIndex, 1);
                    this.parent.treeGrid.parentData.splice(parentIndex, 1);
                }
            }
            if (delRow.parentItem && flatParent && flatParent.childRecords && !flatParent.childRecords.length) {
                this.parent.setRecordValue('expanded', false, flatParent);
                this.parent.setRecordValue('hasChildRecords', false, flatParent);
            }
        }
    };
    Edit.prototype.removeChildItem = function (record) {
        var currentRec;
        var indx;
        for (var i = 0; i < record.childRecords.length; i++) {
            currentRec = record.childRecords[i];
            var data = void 0;
            if (this.parent.dataSource instanceof DataManager) {
                data = getValue('dataOperation.dataArray', this.parent);
            }
            else {
                data = this.parent.dataSource;
            }
            for (var j = 0; j < data.length; j++) {
                if (data[j][this.parent.taskFields.id] === currentRec.taskData[this.parent.taskFields.id]) {
                    indx = j;
                }
            }
            if (indx !== -1) {
                if (data.length > 0) {
                    data.splice(indx, 1);
                }
                var gridIndx = void 0;
                for (var i_2 = 0; i_2 < this.treeGridData.length; i_2++) {
                    if (this.treeGridData[i_2][this.parent.taskFields.id] === currentRec.taskData[this.parent.taskFields.id]) {
                        gridIndx = i_2;
                    }
                }
                this.treeGridData.splice(gridIndx, 1);
                this.parent.ids.splice(gridIndx, 1);
            }
            if (currentRec.hasChildRecords) {
                this.removeChildItem(currentRec);
            }
        }
    };
    Edit.prototype.recordLevel = function () {
        var obj = this.parent;
        var draggedRec = this.draggedRecord;
        var droppedRec = this.droppedRecord;
        var childItem = obj.taskFields.child;
        if (!droppedRec.hasChildRecords) {
            droppedRec.hasChildRecords = true;
            if (!droppedRec.childRecords.length) {
                droppedRec.childRecords = [];
                if (!obj.taskFields.parentID && isNullOrUndefined(droppedRec.taskData[childItem])) {
                    droppedRec.taskData[childItem] = [];
                }
            }
        }
        if (this.dropPosition === 'middleSegment') {
            var parentItem = extend({}, droppedRec);
            delete parentItem.childRecords;
            var createParentItem = {
                uniqueID: parentItem.uniqueID,
                expanded: parentItem.expanded,
                level: parentItem.level,
                index: parentItem.index,
                taskId: parentItem.ganttProperties.rowUniqueID
            };
            this.parent.setRecordValue('parentItem', createParentItem, draggedRec);
            this.parent.setRecordValue('parentUniqueID', droppedRec.uniqueID, draggedRec);
            droppedRec.childRecords.splice(droppedRec.childRecords.length, 0, draggedRec);
            if (!isNullOrUndefined(draggedRec) && !obj.taskFields.parentID &&
                !isNullOrUndefined(droppedRec.taskData[childItem])) {
                droppedRec.taskData[obj.taskFields.child].splice(droppedRec.childRecords.length, 0, draggedRec.taskData);
            }
            if (!isNullOrUndefined(droppedRec.ganttProperties.segments) && droppedRec.ganttProperties.segments.length > 0) {
                droppedRec.ganttProperties.segments = null;
                droppedRec.taskData[obj.taskFields.segments] = null;
            }
            if (!draggedRec.hasChildRecords) {
                draggedRec.level = droppedRec.level + 1;
            }
            else {
                var level = 1;
                draggedRec.level = droppedRec.level + 1;
                this.updateChildRecordLevel(draggedRec, level);
            }
            droppedRec.expanded = true;
        }
    };
    return Edit;
}());
export { Edit };
