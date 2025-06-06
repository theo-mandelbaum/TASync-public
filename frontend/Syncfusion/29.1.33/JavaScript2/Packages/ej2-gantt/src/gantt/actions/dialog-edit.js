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
import { remove, extend, isNullOrUndefined, createElement, getValue, setValue, closest, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { DataManager, DataUtil } from '@syncfusion/ej2-data';
import { Dialog } from '@syncfusion/ej2-popups';
import { Tab } from '@syncfusion/ej2-navigations';
import { Grid, Edit, Toolbar as GridToolbar, Page, getObject, Sort, RowDD, Group, Aggregate, ColumnChooser, ContextMenu, ColumnMenu, Resize, Reorder, DetailRow, Search, Print, PdfExport, ExcelExport, Filter } from '@syncfusion/ej2-grids';
import { ForeignKey, getActualProperties } from '@syncfusion/ej2-grids';
import { RichTextEditor, Toolbar as RTEToolbar, Link, HtmlEditor, QuickToolbar, Count, Image, Table, EmojiPicker, FileManager, FormatPainter, MarkdownEditor } from '@syncfusion/ej2-richtexteditor';
import { TextBox, NumericTextBox, MaskedTextBox, FormValidator } from '@syncfusion/ej2-inputs';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList, ComboBox } from '@syncfusion/ej2-dropdowns';
import { isScheduledTask } from '../base/utils';
import { TreeGrid, Selection as TreeGridSelection, Filter as TreeGridFilter, Edit as TreeGridEdit, VirtualScroll, Sort as TreeGridSort, Page as TreeGridPage, Aggregate as TreeGridAggregate, Reorder as TreeGridReorder, Resize as TreeGridResize, Toolbar as TreeGridToolbar, RowDD as TreeGridRowDD } from '@syncfusion/ej2-treegrid';
import { getUid } from '../base/utils';
/**
 *
 * @hidden
 */
var DialogEdit = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {Gantt} parent .
     * @returns {void} .
     */
    function DialogEdit(parent) {
        this.isFromDialogPredecessor = false;
        this.isTriggered = false;
        this.taskFieldColumn = [];
        this.customFieldColumn = [];
        this.processedId = [];
        /**
         * @private
         */
        this.updatedEditFields = null;
        this.updatedAddFields = null;
        this.addedRecord = null;
        this.dialogEditValidationFlag = false;
        this.ganttResources = [];
        this.isValidData = true;
        this.isResourceTabUpdated = false;
        /**
         * @private
         */
        this.previousResource = [];
        /**
         * @private
         */
        this.isResourceUpdate = false;
        this.parent = parent;
        this.localeObj = this.parent.localeObj;
        this.beforeOpenArgs = { cancel: false };
        this.types = this.getPredecessorType();
        this.rowData = {};
        this.editedRecord = {};
        this.inputs = {
            booleanedit: CheckBox,
            dropdownedit: DropDownList,
            datepickeredit: DatePicker,
            datetimepickeredit: DateTimePicker,
            maskededit: MaskedTextBox,
            numericedit: NumericTextBox,
            stringedit: TextBox,
            defaultedit: TextBox
        };
        this.processDialogFields();
        this.wireEvents();
    }
    DialogEdit.prototype.wireEvents = function () {
        this.parent.on('chartDblClick', this.dblClickHandler, this);
    };
    DialogEdit.prototype.dblClickHandler = function (e) {
        var ganttData = this.parent.ganttChartModule.getRecordByTarget(e);
        if (!isNullOrUndefined(ganttData) && this.parent.editModule && this.parent.editSettings.allowEditing) {
            this.openEditDialog(ganttData);
        }
    };
    /**
     * Method to validate add and edit dialog fields property.
     *
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.processDialogFields = function () {
        if (isNullOrUndefined(this.parent.editDialogFields) ||
            this.parent.editDialogFields && this.parent.editDialogFields.length === 0) {
            this.updatedEditFields = this.getDefaultDialogFields();
            this.updatedEditFields = this.validateDialogFields(this.updatedEditFields);
        }
        else {
            this.updatedEditFields = this.validateDialogFields(this.parent.editDialogFields);
        }
        if (isNullOrUndefined(this.parent.addDialogFields) ||
            this.parent.addDialogFields && this.parent.addDialogFields.length === 0) {
            this.updatedAddFields = this.getDefaultDialogFields();
            this.updatedAddFields = this.validateDialogFields(this.updatedAddFields);
        }
        else {
            this.updatedAddFields = this.validateDialogFields(this.parent.addDialogFields);
        }
    };
    DialogEdit.prototype.validateDialogFields = function (dialogFields) {
        var newDialogFields = [];
        var emptyCustomColumn = 0;
        for (var i = 0; i < dialogFields.length; i++) {
            var fieldItem = getActualProperties(dialogFields[i]);
            if (fieldItem.type === 'General' && (isNullOrUndefined(fieldItem.fields) || fieldItem.fields.length === 0)) {
                fieldItem.fields = this.getGeneralColumnFields();
            }
            if (fieldItem.type === 'Dependency' && isNullOrUndefined(this.parent.taskFields.dependency)
                || fieldItem.type === 'Resources' && isNullOrUndefined(this.parent.taskFields.resourceInfo)
                || fieldItem.type === 'Notes' && isNullOrUndefined(this.parent.taskFields.notes)) {
                continue;
            }
            if (fieldItem.type === 'Custom' && (isNullOrUndefined(fieldItem.fields) || fieldItem.fields.length === 0)) {
                emptyCustomColumn += 1;
                fieldItem.fields = this.getCustomColumnFields();
            }
            if (emptyCustomColumn > 1) {
                continue;
            }
            newDialogFields.push(fieldItem);
        }
        return newDialogFields;
    };
    /**
     * Method to get general column fields
     *
     * @returns {string[]} .
     */
    DialogEdit.prototype.getGeneralColumnFields = function () {
        var fields = [];
        for (var _i = 0, _a = Object.keys(this.parent.columnMapping); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key === 'dependency' || key === 'resourceInfo' || key === 'notes') {
                continue;
            }
            fields.push(this.parent.columnMapping[key]);
        }
        return fields;
    };
    /**
     * Method to get custom column fields
     *
     * @returns {void} .
     */
    DialogEdit.prototype.getCustomColumnFields = function () {
        var fields = [];
        for (var i = 0; i < this.parent.customColumns.length; i++) {
            fields.push(this.parent.customColumns[i]);
        }
        return fields;
    };
    /**
     * Get default dialog fields when fields are not defined for add and edit dialogs
     *
     * @returns {AddDialogFieldSettings} .
     */
    DialogEdit.prototype.getDefaultDialogFields = function () {
        var dialogFields = [];
        var fieldItem = {};
        var taskFields = this.parent.taskFields;
        var columnMapping = this.parent.columnMapping;
        if (Object.keys(columnMapping).length !== 0) {
            fieldItem.type = 'General';
            dialogFields.push(fieldItem);
        }
        if (!isNullOrUndefined(getValue('dependency', columnMapping))) {
            fieldItem = {};
            if (this.parent.columnByField[columnMapping.dependency.valueOf()].visible !== false) {
                fieldItem.type = 'Dependency';
            }
            dialogFields.push(fieldItem);
        }
        if (!isNullOrUndefined(getValue('resourceInfo', columnMapping))) {
            fieldItem = {};
            if (this.parent.columnByField[columnMapping.resourceInfo.valueOf()].visible !== false) {
                fieldItem.type = 'Resources';
            }
            dialogFields.push(fieldItem);
        }
        if (!isNullOrUndefined(getValue('notes', columnMapping))) {
            fieldItem = {};
            if (this.parent.columnByField[columnMapping.notes.valueOf()].visible !== false) {
                fieldItem.type = 'Notes';
            }
            dialogFields.push(fieldItem);
        }
        if (!isNullOrUndefined(getValue('segments', taskFields))) {
            fieldItem = {};
            fieldItem.type = 'Segments';
            dialogFields.push(fieldItem);
        }
        if (this.parent.customColumns.length > 0) {
            fieldItem = {};
            fieldItem.type = 'Custom';
            dialogFields.push(fieldItem);
        }
        return dialogFields;
    };
    /**
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.openAddDialog = function () {
        this.isEdit = false;
        this.editedRecord = this.composeAddRecord();
        this.isFromAddDialog = true;
        this.createDialog();
    };
    /**
     *
     * @returns {Date} .
     * @private
     */
    DialogEdit.prototype.getMinimumStartDate = function () {
        var minDate = DataUtil.aggregates.min(this.parent.flatData, 'ganttProperties.startDate');
        if (!isNullOrUndefined(minDate)) {
            minDate = new Date(minDate.getTime());
        }
        else {
            minDate = new Date(this.parent.timelineModule.timelineStartDate.getTime());
        }
        minDate = this.parent.dateValidationModule.checkStartDate(minDate);
        return new Date(minDate.getTime());
    };
    /**
     * @returns {IGanttData} .
     * @private
     */
    DialogEdit.prototype.composeAddRecord = function () {
        var tempData = {};
        tempData.ganttProperties = {};
        var columns = this.parent.ganttColumns;
        var taskSettings = this.parent.taskFields;
        var id = this.parent.editModule.getNewTaskId();
        for (var i = 0; i < columns.length; i++) {
            var field = columns[i].field;
            if (field === taskSettings.id) {
                tempData[field] = id;
                tempData.ganttProperties.rowUniqueID = tempData[field];
            }
            else if (columns[i].field === taskSettings.startDate) {
                if (isNullOrUndefined(tempData[taskSettings.endDate])) {
                    tempData[field] = this.getMinimumStartDate();
                }
                else {
                    tempData[field] = new Date(tempData[taskSettings.endDate]);
                }
                if (this.parent.timezone) {
                    tempData[field] = this.parent.dateValidationModule.remove(tempData[field], this.parent.timezone);
                }
                tempData.ganttProperties.startDate = new Date(tempData[field]);
            }
            else if (columns[i].field === taskSettings.endDate) {
                if (isNullOrUndefined(tempData[taskSettings.startDate])) {
                    tempData[field] = this.getMinimumStartDate();
                }
                else {
                    tempData[field] = new Date(tempData[taskSettings.startDate]);
                }
                if (this.parent.timezone) {
                    tempData[field] = this.parent.dateValidationModule.remove(tempData[field], this.parent.timezone);
                }
                tempData.ganttProperties.endDate = new Date(tempData[field]);
            }
            else if (columns[i].field === taskSettings.duration) {
                tempData[field] = 1;
                tempData.ganttProperties.duration = tempData[field];
                tempData.ganttProperties.durationUnit = this.parent.durationUnit.toLocaleLowerCase();
            }
            else if (columns[i].field === taskSettings.name) {
                tempData[field] = this.localeObj.getConstant('addDialogTitle') + ' ' + id;
                tempData.ganttProperties.taskName = tempData[field];
            }
            else if (columns[i].field === taskSettings.progress) {
                tempData[field] = 0;
                tempData.ganttProperties.progress = tempData[field];
            }
            else if (columns[i].field === taskSettings.work) {
                tempData[field] = 0;
                tempData.ganttProperties.work = tempData[field];
            }
            else if (columns[i].field === taskSettings.type) {
                tempData[field] = this.parent.taskType;
                tempData.ganttProperties.taskType = tempData[field];
            }
            else {
                tempData[this.parent.ganttColumns[i].field] = '';
            }
        }
        tempData.ganttProperties.isAutoSchedule = (this.parent.taskMode === 'Auto') ? true :
            (this.parent.taskMode === 'Manual') ? false :
                tempData[taskSettings.manual] === true ? false : true;
        return tempData;
    };
    /**
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.openToolbarEditDialog = function () {
        var gObj = this.parent;
        if (gObj.editModule && gObj.editSettings.allowEditing) {
            if (this.parent.ganttChartModule.focusedRowIndex > -1 && gObj.selectionModule) {
                gObj.selectionModule.selectRow(this.parent.ganttChartModule.focusedRowIndex, false, false);
            }
            var selectedRowId = gObj.selectionModule ?
                (gObj.selectionSettings.mode === 'Row' || gObj.selectionSettings.mode === 'Both') &&
                    gObj.selectionModule.selectedRowIndexes.length === 1 ?
                    gObj.updatedRecords[gObj.selectionModule.selectedRowIndexes[0]].ganttProperties.rowUniqueID :
                    gObj.selectionSettings.mode === 'Cell' &&
                        gObj.selectionModule.getSelectedRowCellIndexes().length === 1 ?
                        gObj.updatedRecords[gObj.selectionModule.getSelectedRowCellIndexes()[0].rowIndex].ganttProperties.rowUniqueID :
                        null : null;
            if (!isNullOrUndefined(selectedRowId)) {
                this.openEditDialog(selectedRowId);
            }
        }
    };
    /**
     * @param { number | string | object} taskId .
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.openEditDialog = function (taskId) {
        var ganttObj = this.parent;
        if (!isNullOrUndefined(taskId)) {
            if (!isNullOrUndefined(taskId['ganttProperties'])) {
                if (typeof taskId['ganttProperties']['taskId'] === 'string') {
                    this.numericOrString = 'stringedit';
                }
                else {
                    this.numericOrString = 'numericedit';
                }
            }
            if (isNullOrUndefined(taskId['ganttProperties']) && !isNullOrUndefined(taskId)) {
                if (isNaN(Number(taskId)) || this.parent.columnByField[this.parent.taskFields.id].editType === 'stringedit') {
                    this.numericOrString = 'stringedit';
                }
                else {
                    this.numericOrString = 'numericedit';
                }
            }
        }
        if (typeof taskId === 'object' && !isNullOrUndefined(taskId)) {
            this.rowIndex = this.parent.currentViewData.indexOf(taskId);
            if (this.rowIndex > -1) {
                this.rowData = taskId;
            }
        }
        else if (!isNullOrUndefined(taskId)) {
            this.rowIndex = ganttObj.ids.indexOf(taskId.toString());
            if (this.rowIndex > -1) {
                this.rowData = ganttObj.flatData[this.rowIndex];
            }
        }
        else if (ganttObj.selectedRowIndex > -1) {
            this.rowData = ganttObj.currentViewData[ganttObj.selectedRowIndex];
            this.rowIndex = ganttObj.selectedRowIndex;
        }
        this.isEdit = true;
        if (this.parent.viewType === 'ResourceView' && this.rowData.level === 0) {
            return;
        }
        if (Object.keys(this.rowData).length !== 0) {
            this.editedRecord = extend({}, {}, this.rowData, true);
            this.isFromEditDialog = true;
            this.createDialog();
        }
    };
    DialogEdit.prototype.createDialog = function () {
        var _this = this;
        var ganttObj = this.parent;
        var dialogModel = {};
        this.beforeOpenArgs.dialogModel = dialogModel;
        this.beforeOpenArgs.rowData = this.editedRecord;
        this.beforeOpenArgs.rowIndex = this.rowIndex;
        var dialogMaxWidth = this.parent.isAdaptive ? '' : '600px';
        var dialog = this.parent.createElement('div', { id: ganttObj.element.id + '_dialog', styles: 'max-width:' + dialogMaxWidth });
        dialog.classList.add('e-gantt-dialog');
        ganttObj.element.appendChild(dialog);
        dialogModel.animationSettings = { effect: 'None' };
        dialogModel.header = this.localeObj.getConstant(this.isEdit ? 'editDialogTitle' : 'addDialogTitle');
        dialogModel.isModal = true;
        dialogModel.enableRtl = this.parent.enableRtl;
        dialogModel.allowDragging = (this.parent.isAdaptive || this.parent.enableAdaptiveUI) ? false : true;
        dialogModel.showCloseIcon = true;
        var position = this.parent.isAdaptive ? { X: 'top', Y: 'left' } : { X: 'center', Y: 'center' };
        dialogModel.position = position;
        //dialogModel.width = '750px';
        dialogModel.height = this.parent.isAdaptive ? '100%' : 'auto';
        dialogModel.target = document.body;
        dialogModel.close = this.dialogClose.bind(this);
        dialogModel.closeOnEscape = true;
        /* eslint-disable-next-line */
        dialogModel.beforeClose = function (args) {
            if (args.closedBy === 'escape') {
                if (args.event.name === 'key-pressed' && args.event.target.nodeName === 'INPUT') {
                    args.cancel = true;
                }
            }
        };
        dialogModel.open = function (args) {
            var dialogElement = getValue('element', args);
            var generalTabElement = dialogElement.querySelector('#' + _this.parent.element.id + 'GeneralTabContainer');
            if (generalTabElement && generalTabElement.scrollHeight > generalTabElement.offsetHeight) {
                generalTabElement.classList.add('e-scroll');
            }
            if (_this.tabObj.selectedItem === 0) {
                _this.tabObj.select(0);
            }
            if (_this.parent.isAdaptive) {
                dialogElement.style.maxHeight = 'none';
            }
            if (_this.parent.focusModule) {
                _this.parent.focusModule.setActiveElement(dialogElement);
            }
        };
        dialogModel.locale = this.parent.locale;
        dialogModel.buttons = [{
                buttonModel: {
                    content: this.localeObj.getConstant('saveButton'), cssClass: 'e-primary'
                },
                click: this.buttonClick.bind(this)
            }, {
                buttonModel: { cssClass: 'e-flat', content: this.localeObj.getConstant('cancel') },
                click: this.buttonClick.bind(this)
            }];
        this.createTab(dialogModel, dialog);
    };
    DialogEdit.prototype.buttonClick = function (e) {
        var target = e.target;
        target.style.pointerEvents = 'none';
        if ((this.localeObj.getConstant('cancel')).toLowerCase() === e.target.innerText.trim().toLowerCase()) {
            if (this.dialog && !this.dialogObj.isDestroyed) {
                this.CustomformObj = null;
                this.formObj = null;
                this.storeValidTab = null;
                this.customFieldColumn = [];
                this.taskFieldColumn = [];
                this.dialogObj.hide();
                this.dialogClose();
            }
        }
        else {
            if (this.CustomformObj) {
                if (!this.CustomformObj.validate()) {
                    target.style.pointerEvents = '';
                    return;
                }
            }
            if (this.formObj) {
                /* eslint-disable-next-line */
                var formValid = this.formObj.validate();
                if (!formValid) {
                    target.style.pointerEvents = '';
                    return;
                }
            }
            if (this.storeDependencyTab || this.firstOccuringTab === 'Dependency') {
                /* eslint-disable-next-line */
                var dependencyTab = void 0;
                if (this.firstOccuringTab === 'Dependency') {
                    var element = e.target.closest('#' + this.parent.element.id + '_dialog');
                    dependencyTab = element.querySelector('.e-gridform');
                }
                else {
                    dependencyTab = this.storeDependencyTab.querySelector('.e-gridform');
                }
                if (dependencyTab) {
                    var dependencyTabValid = dependencyTab['ej2_instances'][0].validate();
                    if (!dependencyTabValid) {
                        target.style.pointerEvents = '';
                        return;
                    }
                }
            }
            if (this.storeResourceTab || this.firstOccuringTab === 'Resources') {
                /* eslint-disable-next-line */
                var resourceTab = void 0;
                if (this.firstOccuringTab === 'Resources') {
                    var element = e.target.closest('#' + this.parent.element.id + '_dialog');
                    resourceTab = element.querySelector('.e-gridform');
                }
                else {
                    resourceTab = this.storeResourceTab.querySelector('.e-gridform');
                }
                if (resourceTab) {
                    var resourceTabValid = resourceTab['ej2_instances'][0].validate();
                    if (!resourceTabValid) {
                        target.style.pointerEvents = '';
                        return;
                    }
                }
            }
            this.initiateDialogSave();
            this.parent['updateDuration'] = false;
            this.CustomformObj = null;
            this.formObj = null;
            this.storeValidTab = null;
            this.customFieldColumn = [];
            this.taskFieldColumn = [];
            target.style.pointerEvents = 'auto';
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.dialogClose = function () {
        if (this.dialog) {
            this.resetValues();
        }
        if (!isNullOrUndefined(this.parent.focusModule) &&
            !isNullOrUndefined(this.parent.focusModule.getActiveElement(true))) {
            this.parent.focusModule.getActiveElement(true).focus();
        }
    };
    DialogEdit.prototype.resetValues = function () {
        this.isEdit = false;
        this.isAddNewResource = false;
        this.editedRecord = {};
        this.parent['triggeredColumnName'] = '';
        this.rowData = {};
        this.rowIndex = -1;
        this.addedRecord = null;
        this.ganttResources = [];
        this.dialogEditValidationFlag = false;
        this.isFromAddDialog = false;
        this.isFromEditDialog = false;
        if (this.dialog && !this.dialogObj.isDestroyed) {
            this.destroyDialogInnerElements();
            this.dialogObj.destroy();
            remove(this.dialog);
        }
    };
    DialogEdit.prototype.destroyDialogInnerElements = function () {
        var ganttObj = this.parent;
        var tabModel = this.beforeOpenArgs.tabModel;
        var items = tabModel.items;
        for (var i = 0; i < items.length; i++) {
            var element = items[i].content;
            var id = element.getAttribute('id');
            if (!isNullOrUndefined(id) || id !== '') {
                id = id.replace(ganttObj.element.id, '');
                id = id.replace('TabContainer', '');
                if (id === 'General') {
                    this.destroyCustomField(element);
                }
                else if (id === 'Dependency') {
                    var gridObj = element.ej2_instances[0];
                    gridObj.destroy();
                }
                else if (id === 'Notes') {
                    var rte = element.ej2_instances[0];
                    rte.destroy();
                }
                else if (id === 'Resources') {
                    var treeGridObj = element.ej2_instances[0];
                    treeGridObj.destroy();
                }
                else if (id.indexOf('Custom') !== -1) {
                    this.destroyCustomField(element);
                }
            }
        }
    };
    DialogEdit.prototype.destroyCustomField = function (element) {
        var childNodes = element.childNodes;
        var ganttObj = this.parent;
        for (var i = 0; i < childNodes.length; i++) {
            var div = childNodes[i];
            var inputElement = div.querySelector('input[id^="' + ganttObj.element.id + '"]');
            if (inputElement) {
                var fieldName = inputElement.id.replace(ganttObj.element.id, '');
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var controlObj = div.querySelector('#' + ganttObj.element.id + fieldName).ej2_instances[0];
                if (!isNullOrUndefined(controlObj)) {
                    var column = ganttObj.columnByField[fieldName];
                    if (!isNullOrUndefined(column) && !isNullOrUndefined(column.edit) && isNullOrUndefined(column.edit.params)) {
                        var destroy = column.edit.destroy;
                        if (typeof destroy === 'string') {
                            destroy = getObject(destroy, window);
                            destroy();
                        }
                        else {
                            column.edit.destroy();
                        }
                    }
                    else {
                        controlObj.destroy();
                    }
                }
            }
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.destroy = function () {
        this.resetValues();
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('chartDblClick', this.dblClickHandler);
        this.parent.editModule.dialogModule = undefined;
    };
    /**
     * Method to get current edit dialog fields value
     *
     * @returns {AddDialogFieldSettings} .
     */
    DialogEdit.prototype.getEditFields = function () {
        if (this.isEdit) {
            return this.updatedEditFields;
        }
        else {
            return this.updatedAddFields;
        }
    };
    DialogEdit.prototype.createTab = function (dialogModel, dialog) {
        var _this = this;
        var ganttObj = this.parent;
        var tabModel = {};
        var tabItems = [];
        var dialogSettings = this.getEditFields();
        var tabElement;
        var tasks = ganttObj.taskFields;
        var length = dialogSettings.length;
        tabModel.items = tabItems;
        tabModel.locale = this.parent.locale;
        tabModel.enableRtl = this.parent.enableRtl;
        this.beforeOpenArgs.tabModel = tabModel;
        var count = 0;
        var index = 0;
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                var dialogField = dialogSettings[i];
                var tabItem = {};
                if (dialogField.type === 'General') {
                    if (Object.keys(ganttObj.columnMapping).length === 0) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('generalTab');
                    }
                    tabItem.content = 'General';
                    this.beforeOpenArgs[tabItem.content] = this.getFieldsModel(dialogField.fields);
                }
                else if (dialogField.type === 'Segments') {
                    if (isNullOrUndefined(tasks.segments)) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('segments');
                    }
                    tabItem.content = 'Segments';
                    this.beforeOpenArgs[tabItem.content] = this.getSegmentsModel(dialogField.fields);
                }
                else if (dialogField.type === 'Dependency') {
                    if (isNullOrUndefined(tasks.dependency)) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('dependency');
                    }
                    tabItem.content = 'Dependency';
                    this.beforeOpenArgs[tabItem.content] = this.getPredecessorModel(dialogField.fields);
                }
                else if (dialogField.type === 'Resources') {
                    if (isNullOrUndefined(tasks.resourceInfo)) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('resourceName');
                    }
                    tabItem.content = 'Resources';
                    this.beforeOpenArgs[tabItem.content] = this.getResourcesModel(dialogField.fields);
                }
                else if (dialogField.type === 'Notes') {
                    if (isNullOrUndefined(tasks.notes)) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('notes');
                    }
                    tabItem.content = 'Notes';
                    this.beforeOpenArgs[tabItem.content] = this.getNotesModel(dialogField.fields);
                }
                else {
                    if (isNullOrUndefined(dialogField.fields) || dialogField.fields.length === 0) {
                        continue;
                    }
                    if (isNullOrUndefined(dialogField.headerText)) {
                        dialogField.headerText = this.localeObj.getConstant('customTab'); // eslint-disable-next-line
                        count++;
                    }
                    tabItem.content = 'Custom' + '' + index++;
                    this.beforeOpenArgs[tabItem.content] = this.getFieldsModel(dialogField.fields);
                }
                tabItem.header = { text: dialogField.headerText };
                tabItems.push(tabItem);
            }
        }
        this.beforeOpenArgs.requestType = this.isEdit ? 'beforeOpenEditDialog' : 'beforeOpenAddDialog';
        this.parent.trigger('actionBegin', this.beforeOpenArgs, function (arg) {
            if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                _this.parent.showMaskRow();
            }
            else {
                _this.parent.showSpinner();
            }
            if (!arg.cancel) {
                _this.renderTabItems();
                tabModel.selected = _this.tabSelectedEvent.bind(_this);
                tabModel.height = _this.parent.isAdaptive ? '100%' : 'auto';
                tabModel.overflowMode = 'Scrollable';
                _this.tabObj = new Tab(tabModel);
                _this.tabObj.isStringTemplate = true;
                tabElement = _this.parent.createElement('div', { id: ganttObj.element.id + '_Tab' });
                _this.tabObj.appendTo(tabElement);
                dialogModel.content = tabElement;
                _this.dialog = dialog;
                _this.dialogObj = new Dialog(dialogModel);
                _this.dialogObj.isStringTemplate = true;
                _this.dialogObj.appendTo(_this.dialog);
                var actionCompleteArgs = {
                    action: 'OpenDialog',
                    requestType: _this.isEdit ? 'openEditDialog' : 'openAddDialog',
                    data: _this.beforeOpenArgs.rowData,
                    element: _this.dialog,
                    cancel: false
                };
                var columns = _this.parent.treeGrid.grid.getColumns();
                /* eslint-disable-next-line */
                var isValidateColumn = columns.some(function (obj) { return obj.validationRules; });
                if (isValidateColumn) {
                    _this.CustomformObj = null;
                    _this.formObj = null;
                    _this.storeValidTab = null;
                    _this.customFieldColumn = [];
                    _this.taskFieldColumn = [];
                    _this.changeFormObj(actionCompleteArgs.element);
                }
                _this.parent.trigger('actionComplete', actionCompleteArgs, function (actionCompleteArg) {
                    if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                        _this.parent.hideMaskRow();
                    }
                    else {
                        _this.parent.hideSpinner();
                    }
                    if (actionCompleteArg.cancel) {
                        _this.resetValues();
                    }
                });
            }
            else {
                arg.cancel = false;
                if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                    _this.parent.hideMaskRow();
                }
                else {
                    _this.parent.hideSpinner();
                }
            }
        });
    };
    /* eslint-disable-next-line */
    DialogEdit.prototype.changeFormObj = function (actionCompleteArgs) {
        if (!this.storeColumn) {
            this.storeColumn = this.parent.treeGrid.grid.getColumns();
        }
        if (!this.taskfields) {
            this.taskfields = this.parent.taskFields['properties'];
        }
        if (!this.storeValidTab) {
            this.storeValidTab = this.getFilteredDialogFields();
        }
        if (this.customFieldColumn.length === 0 || this.taskFieldColumn.length === 0) {
            this.validateColumn(this.storeColumn, this.taskfields, this.storeValidTab);
        }
        if (this.isFromAddDialog && this.parent.addDialogFields && this.parent.addDialogFields.length > 0) {
            var firstFieldType = this.parent.addDialogFields[0].type;
            if (firstFieldType === 'Resources' || firstFieldType === 'Dependency') {
                this.firstOccuringTab = firstFieldType;
            }
        }
        else if (this.isFromEditDialog && this.parent.editDialogFields && this.parent.editDialogFields.length > 0) {
            var firstFieldType = this.parent.editDialogFields[0].type;
            if (firstFieldType === 'Resources' || firstFieldType === 'Dependency') {
                this.firstOccuringTab = firstFieldType;
            }
        }
        if (!this.CustomformObj || !this.formObj) {
            var customFieldColumns = this.customFieldColumn;
            var taskFieldColumns = this.taskFieldColumn;
            if (!this.CustomformObj && customFieldColumns && customFieldColumns.length > 0) {
                /* eslint-disable-next-line */
                var validationRulesArray = {};
                for (var i = 0; i < customFieldColumns.length; i++) {
                    var customColumn = customFieldColumns[i]; // Rename the variable
                    if (customColumn.visible && customColumn.validationRules) {
                        validationRulesArray[customColumn.field] = customColumn.validationRules;
                    }
                }
                if (Object.keys(validationRulesArray).length > 0) {
                    this.CustomformObj = actionCompleteArgs.querySelector('#' + this.parent.element.id + 'Custom0TabContainer');
                    if (this.CustomformObj) {
                        this.CustomformObj = this.createFormObj(this.CustomformObj, validationRulesArray);
                    }
                }
            }
            if (!this.formObj && taskFieldColumns && taskFieldColumns.length > 0) {
                /* eslint-disable-next-line */
                var validationRulesArray = {};
                for (var i = 0; i < taskFieldColumns.length; i++) {
                    var taskColumn = taskFieldColumns[i]; // Rename the variable
                    if (taskColumn.visible && taskColumn.validationRules) {
                        validationRulesArray[taskColumn.field] = taskColumn.validationRules;
                    }
                }
                if (Object.keys(validationRulesArray).length > 0) {
                    this.formObj = actionCompleteArgs.querySelector('#' + this.parent.element.id + 'GeneralTabContainer');
                    if (this.formObj) {
                        this.formObj = this.createFormObj(this.formObj, validationRulesArray);
                    }
                }
            }
        }
        this.isFromAddDialog = false;
        this.isFromEditDialog = false;
    };
    DialogEdit.prototype.getFilteredDialogFields = function () {
        var dialogFields = this.isFromAddDialog
            ? this.parent.addDialogFields
            : this.parent.editDialogFields;
        if (dialogFields.length !== 0) {
            return dialogFields.filter(function (obj) { return obj.type === 'General' || obj.type === 'Custom'; });
        }
        return null;
    };
    /* eslint-disable-next-line */
    DialogEdit.prototype.validateColumn = function (storeColumn, taskfields, storeValidTab) {
        var _this = this;
        if (storeValidTab) {
            storeValidTab.forEach(function (element) {
                /* eslint-disable-next-line */
                var targetArray = element.type === 'General' ? _this.taskFieldColumn : _this.customFieldColumn;
                element.fields.forEach(function (field) {
                    var columnValue = _this.parent.getColumnByField(field, storeColumn);
                    if (columnValue !== null) {
                        targetArray.push(columnValue);
                    }
                    else {
                        targetArray.push(_this.parent.columnByField[field]);
                    }
                });
            });
        }
        else {
            /* eslint-disable-next-line */
            storeColumn.forEach(function (column) {
                if (_this.parent.customColumns.indexOf(column.field) !== -1) {
                    _this.customFieldColumn.push(column);
                }
                else {
                    _this.taskFieldColumn.push(column);
                }
            });
        }
    };
    DialogEdit.prototype.createFormObj = function (form, rules) {
        var _this = this;
        return new FormValidator(form, {
            rules: rules,
            locale: this.parent.locale,
            validationComplete: function (args) {
                _this.validationComplete(args);
            },
            customPlacement: function (inputElement, error) {
                var nameAttribute = inputElement.getAttribute('name');
                if (nameAttribute) {
                    var columnName = nameAttribute;
                    _this.valErrorPlacement(inputElement, error, columnName);
                }
            }
        });
    };
    DialogEdit.prototype.valErrorPlacement = function (inputElement, error, columnName) {
        var id = columnName + "-tooltip";
        var elem = this.getElemTable(inputElement);
        if (!elem) {
            this.createTooltip(inputElement, error, id);
        }
        else {
            var tooltipContent = elem.querySelector('.e-tip-content');
            if (tooltipContent) {
                tooltipContent.innerHTML = error.outerHTML;
            }
        }
    };
    DialogEdit.prototype.createTooltip = function (inputElement, errorMessage, id, display) {
        if (display === void 0) { display = 'block'; }
        var existingTooltip = document.getElementById(id);
        if (existingTooltip) {
            existingTooltip.remove();
        }
        var parentElement = inputElement.parentElement;
        if (parentElement) {
            parentElement.style.position = 'relative';
        }
        var tooltipContainer = document.createElement('div');
        tooltipContainer.className = 'e-tooltip-wrap e-lib e-control e-popup e-griderror';
        tooltipContainer.style.display = display;
        tooltipContainer.style.zIndex = '1000';
        var labelId = id + "-label";
        var tooltipLabel = document.createElement('div');
        tooltipLabel.id = labelId;
        tooltipLabel.className = 'sr-only';
        var tooltipContent = document.createElement('div');
        tooltipContent.className = 'e-tip-content';
        var errorMessageElement = document.createElement('div');
        errorMessageElement.className = 'error-message';
        errorMessageElement.appendChild(errorMessage.cloneNode(true));
        var arrow = document.createElement('div');
        arrow.className = 'e-arrow-tip e-tip-top';
        arrow.appendChild(document.createElement('div')).className = 'e-arrow-tip-outer e-tip-top';
        arrow.appendChild(document.createElement('div')).className = 'e-arrow-tip-inner e-tip-top';
        tooltipContainer.setAttribute('aria-labelledby', labelId);
        tooltipContent.appendChild(errorMessageElement);
        tooltipContainer.appendChild(tooltipContent);
        tooltipContainer.appendChild(arrow);
        tooltipContainer.style.top = '125%';
        tooltipContainer.style.left = '50%';
        tooltipContainer.style.transform = 'translateX(-50%)';
        if (parentElement) {
            parentElement.appendChild(tooltipLabel);
            parentElement.appendChild(tooltipContainer);
        }
    };
    DialogEdit.prototype.getElemTable = function (inputElement) {
        var parentElement = inputElement.parentElement;
        if (parentElement) {
            return parentElement.querySelector('.e-tooltip-wrap');
        }
        return null;
    };
    DialogEdit.prototype.validationComplete = function (args) {
        var elem = this.getElemTable(args.element);
        if (elem) {
            if (args.status === 'failure') {
                elem.style.display = '';
            }
            else {
                elem.style.display = 'none';
            }
        }
    };
    DialogEdit.prototype.tabSelectedEvent = function (args) {
        var ganttObj = this.parent;
        var id = args.selectedContent.childNodes[0].id;
        var dialogModule = this.parent.editModule.dialogModule;
        var dialog = dialogModule.dialog;
        var hasEditedBatchCell = dialog.getElementsByClassName('e-editedbatchcell').length > 0;
        var hasEditedOrAddedRow = dialog.getElementsByClassName('e-editedrow').length > 0 ||
            dialog.getElementsByClassName('e-addedrow').length > 0;
        if (dialogModule.storeResourceTab && hasEditedBatchCell) {
            document.querySelector('#' + ganttObj.element.id + '' + 'Resources' +
                'TabContainer_gridcontrol').ej2_instances[0].saveCell();
        }
        else if (dialogModule.storeDependencyTab && hasEditedOrAddedRow) {
            document.querySelector('#' + ganttObj.element.id + '' + 'Dependency' +
                'TabContainer').ej2_instances[0].editModule.batchSave();
        }
        if (id === ganttObj.element.id + 'DependencyTabContainer') {
            this.storeDependencyTab = args.selectedContent;
        }
        if (id === ganttObj.element.id + 'ResourcesTabContainer') {
            this.storeResourceTab = args.selectedContent;
        }
        if (id === ganttObj.element.id + 'Custom0TabContainer') {
            var columns = this.parent.treeGrid.grid.getColumns();
            /* eslint-disable-next-line */
            var isValidateColumn = columns.some(function (obj) { return obj.validationRules; });
            if (isValidateColumn) {
                this.changeFormObj(args.selectedContent);
            }
        }
        if (id === ganttObj.element.id + 'GeneralTabContainer') {
            var columns = this.parent.treeGrid.grid.getColumns();
            /* eslint-disable-next-line */
            var isValidateColumn = columns.some(function (obj) { return obj.validationRules; });
            if (isValidateColumn) {
                this.changeFormObj(args.selectedContent);
            }
        }
        if (this.parent.isAdaptive || this.parent.enableAdaptiveUI) {
            this.responsiveTabContent(id, ganttObj);
        }
        if (id === ganttObj.element.id + 'ResourcesTabContainer') {
            this.resourceSelection(id);
        }
        else if (id === ganttObj.element.id + 'NotesTabContainer') {
            document.getElementById(id).ej2_instances[0].refresh();
            // const notesTabElement: HTMLElement = document.querySelector('#' + this.parent.element.id + 'NotesTabContainer') as HTMLInputElement;
        }
        else if (id === ganttObj.element.id + 'SegmentsTabContainer') {
            if (isNullOrUndefined(this.beforeOpenArgs.rowData.ganttProperties.startDate)) {
                document.getElementById(id).ej2_instances[0]
                    .enableToolbarItems([this.parent.element.id + 'SegmentsTabContainer' + '_add'], false);
            }
            else {
                document.getElementById(id).ej2_instances[0]
                    .enableToolbarItems([this.parent.element.id + 'SegmentsTabContainer' + '_add'], true);
            }
        }
    };
    DialogEdit.prototype.responsiveTabContent = function (id, ganttObj) {
        var dialogContent = document.getElementById(ganttObj.element.id + '_dialog_dialog-content');
        var dialogContentHeight = dialogContent.clientHeight;
        dialogContentHeight -= dialogContent.querySelector('.e-tab-header').offsetHeight;
        var grid = document.querySelector('#' + id);
        if (grid.classList.contains('e-grid')) {
            dialogContentHeight -= grid.ej2_instances[0].getHeaderContent().offsetHeight;
            var toolbar_1 = grid.querySelector('.e-toolbar');
            if (toolbar_1) {
                dialogContentHeight -= toolbar_1.offsetHeight;
            }
        }
        grid.parentElement.style.height = dialogContentHeight + 'px';
    };
    DialogEdit.prototype.getFieldsModel = function (fields) {
        var fieldsModel = {};
        var columnByField = this.parent.columnByField;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i] === this.parent.taskFields.dependency ||
                fields[i] === this.parent.taskFields.resourceInfo ||
                fields[i] === this.parent.taskFields.notes) {
                continue;
            }
            if (!isNullOrUndefined(columnByField[fields[i]])) {
                var fieldName = fields[i];
                this.createInputModel(columnByField[fieldName], fieldsModel);
            }
        }
        return fieldsModel;
    };
    DialogEdit.prototype.createInputModel = function (column, fieldsModel) {
        var _this = this;
        var ganttObj = this.parent;
        var locale = this.parent.locale;
        var taskSettings = this.parent.taskFields;
        var common = {
            placeholder: column.headerText,
            floatLabelType: 'Auto'
        };
        if (!isNullOrUndefined(this.parent.taskFields.id) && !isNullOrUndefined(this.parent.columnMapping.id)
            && !isNullOrUndefined(this.numericOrString)) {
            if (taskSettings.id === column.field) {
                column.editType = this.numericOrString;
            }
        }
        switch (column.editType) {
            case 'booleanedit':
                {
                    var checkboxModel = {
                        label: column.headerText,
                        locale: locale,
                        enableRtl: this.parent.enableRtl
                    };
                    fieldsModel[column.field] = checkboxModel;
                    break;
                }
            case 'defaultedit':
            case 'stringedit':
                {
                    var textBox = common;
                    textBox.enableRtl = this.parent.enableRtl;
                    if (column.field === ganttObj.columnMapping.duration ||
                        column.field === ganttObj.columnMapping.id || column.field === ganttObj.columnMapping.startDate ||
                        column.field === ganttObj.columnMapping.endDate) {
                        textBox.change = function (args) {
                            if (!_this.isTriggered) {
                                if ((column.field === _this.parent.taskFields.duration ||
                                    column.field === _this.parent.taskFields.work) && !_this.isTriggered) {
                                    _this.isTriggered = true;
                                    _this.parent['triggeredColumnName'] = column.field;
                                }
                                _this.validateScheduleFields(args, column, ganttObj);
                            }
                            else {
                                _this.parent['triggeredColumnName'] = '';
                            }
                        };
                    }
                    fieldsModel[column.field] = common;
                    break;
                }
            case 'numericedit':
                {
                    var numeric = common;
                    numeric.enableRtl = this.parent.enableRtl;
                    if (taskSettings.progress === column.field) {
                        numeric.min = 0;
                        numeric.max = 100;
                    }
                    numeric.change = function (args) {
                        if (!_this.isTriggered) {
                            if ((column.field === _this.parent.taskFields.duration ||
                                column.field === _this.parent.taskFields.work) && !_this.isTriggered) {
                                _this.isTriggered = true;
                                _this.parent['triggeredColumnName'] = column.field;
                            }
                            _this.validateScheduleFields(args, column, ganttObj);
                        }
                        else {
                            _this.parent['triggeredColumnName'] = '';
                        }
                    };
                    fieldsModel[column.field] = numeric;
                    break;
                }
            case 'datepickeredit':
                {
                    var datePickerObj = common;
                    datePickerObj.format = this.parent.getDateFormat();
                    datePickerObj.enableRtl = this.parent.enableRtl;
                    datePickerObj.strictMode = true;
                    datePickerObj.firstDayOfWeek = ganttObj.timelineModule.customTimelineSettings.weekStartDay;
                    if (column.field === ganttObj.columnMapping.startDate ||
                        column.field === ganttObj.columnMapping.endDate) {
                        datePickerObj.renderDayCell = this.parent.renderWorkingDayCell.bind(this.parent);
                        datePickerObj.change = function (args) {
                            _this.validateScheduleFields(args, column, ganttObj);
                        };
                    }
                    fieldsModel[column.field] = datePickerObj;
                    break;
                }
            case 'datetimepickeredit':
                {
                    var dateTimePickerObj = common;
                    dateTimePickerObj.format = this.parent.getDateFormat();
                    dateTimePickerObj.enableRtl = this.parent.enableRtl;
                    dateTimePickerObj.strictMode = true;
                    dateTimePickerObj.firstDayOfWeek = ganttObj.timelineModule.customTimelineSettings.weekStartDay;
                    if (column.field === ganttObj.columnMapping.startDate ||
                        column.field === ganttObj.columnMapping.endDate) {
                        dateTimePickerObj.renderDayCell = this.parent.renderWorkingDayCell.bind(this.parent);
                        dateTimePickerObj.change = function (args) {
                            _this.validateScheduleFields(args, column, ganttObj);
                        };
                    }
                    fieldsModel[column.field] = dateTimePickerObj;
                    break;
                }
            case 'dropdownedit':
                if (column.field === ganttObj.columnMapping.type || column.field === ganttObj.columnMapping.manual) {
                    var dataKey = 'dataSource';
                    var fieldsKey = 'fields';
                    var types = [
                        { 'ID': 1, 'Value': 'FixedUnit' }, { 'ID': 2, 'Value': 'FixedWork' }, { 'ID': 3, 'Value': 'FixedDuration' }
                    ];
                    common[dataKey] = types;
                    common[fieldsKey] = { value: 'Value' };
                    var dropDownListObj = common;
                    dropDownListObj.enableRtl = this.parent.enableRtl;
                    dropDownListObj.change = function (args) {
                        if (column.field === taskSettings.manual) {
                            _this.editedRecord.ganttProperties.isAutoSchedule = !args.value;
                        }
                        _this.validateScheduleFields(args, column, ganttObj);
                    };
                }
                fieldsModel[column.field] = common;
                break;
            case 'maskededit':
                fieldsModel[column.field] = common;
                break;
        }
        if (!isNullOrUndefined(column.edit) && !isNullOrUndefined(column.edit.params)) {
            extend(fieldsModel[column.field], column.edit.params);
        }
        return fieldsModel;
    };
    DialogEdit.prototype.validateScheduleFields = function (args, column, ganttObj) {
        var _a;
        var dialog;
        if (!isNullOrUndefined(ganttObj.editModule.dialogModule.dialog)) {
            dialog = ganttObj.editModule.dialogModule.dialog;
        }
        var targetId = null;
        var inputElement;
        var currentData = ganttObj.editModule.dialogModule.editedRecord;
        var cellValue = null;
        var colName = null;
        var formObject;
        var ids = this.parent.viewType === 'ResourceView' ? this.parent.getTaskIds() : this.parent.ids;
        var strViewType = this.parent.viewType;
        if (!isNullOrUndefined(args.element)) {
            inputElement = args.element;
            targetId = inputElement.getAttribute('id');
        }
        else if (!isNullOrUndefined(args.container)) {
            inputElement = args.container;
            targetId = inputElement.querySelector('input').getAttribute('id');
            inputElement = inputElement.querySelector('#' + targetId);
        }
        else if (!isNullOrUndefined(args.event) && !isNullOrUndefined(args.event.path) &&
            !isNullOrUndefined(args.event.path)[1]) {
            inputElement = args.event.path[1];
            targetId = inputElement.querySelector('input').getAttribute('id');
            inputElement = inputElement.querySelector('#' + targetId);
        }
        if (isNullOrUndefined(inputElement)) {
            cellValue = args.value;
            colName = column.field;
        }
        else {
            cellValue = inputElement.value;
            colName = targetId.replace(ganttObj.element.id, '');
            if (this.parent.columnByField[this.parent.taskFields.id].editType === 'stringedit') {
                var customFn = function (args) {
                    if (strViewType === 'ResourceView') {
                        return ids.indexOf('T' + args['value']) === -1 && ids.indexOf('R' + args['value']) === -1;
                    }
                    else {
                        return ids.indexOf(args['value']) === -1;
                    }
                };
                var options = {
                    rules: (_a = {},
                        _a[this.parent.taskFields.id] = { required: true, minLength: [customFn, 'ID is already present, please enter new value'] },
                        _a)
                };
                /* eslint-disable-next-line */
                formObject = new FormValidator('#' + this.parent.element.id + 'GeneralTabContainer', options);
            }
        }
        if (colName.search('Segments') === 0) {
            colName = colName.replace('SegmentsTabContainer', '');
            this.validateSegmentFields(ganttObj, colName, cellValue, args);
            this.isTriggered = false;
            return true;
        }
        else {
            this.validateScheduleValuesByCurrentField(colName, cellValue, this.editedRecord);
            var ganttProp = currentData.ganttProperties;
            var tasks = ganttObj.taskFields;
            if (!isNullOrUndefined(tasks.startDate) && tasks.startDate !== colName) {
                this.updateScheduleFields(dialog, ganttProp, 'startDate');
            }
            if (tasks.endDate === colName && !isNullOrUndefined(ganttProp.startDate) && !isNullOrUndefined(args.value) &&
                ganttProp.startDate.getTime() > args.value) {
                this.updateScheduleFields(dialog, ganttProp, 'endDate');
            }
            if (!isNullOrUndefined(tasks.endDate) && tasks.endDate !== colName) {
                this.updateScheduleFields(dialog, ganttProp, 'endDate');
            }
            if (!isNullOrUndefined(tasks.duration) && tasks.duration !== colName || ganttProp.duration >= 0) {
                this.updateScheduleFields(dialog, ganttProp, 'duration');
            }
            if (!isNullOrUndefined(tasks.work) && (tasks.work !== colName || ganttProp.taskType !== 'FixedWork')) {
                this.updateScheduleFields(dialog, ganttProp, 'work');
            }
            this.dialogEditValidationFlag = false;
            this.isTriggered = false;
            return true;
        }
    };
    DialogEdit.prototype.updateScheduleFields = function (dialog, ganttProp, ganttField) {
        var ganttObj = this.parent;
        var ganttId = ganttObj.element.id;
        var columnName = getValue(ganttField, ganttObj.columnMapping);
        var col = ganttObj.columnByField[columnName];
        var tempValue;
        var taskField = this.parent.taskFields;
        if (col.editType === 'stringedit') {
            var element = dialog.querySelector('#' + ganttId + columnName);
            if (element) {
                var textBox = element.ej2_instances[0];
                if (textBox) {
                    tempValue = !isNullOrUndefined(col.edit) && !isNullOrUndefined(col.edit.read) ? col.edit.read() :
                        !isNullOrUndefined(col.valueAccessor) ?
                            col.valueAccessor(columnName, ganttObj.editModule.dialogModule.editedRecord, col) :
                            this.parent.dataOperation.getDurationString(ganttProp.duration, ganttProp.durationUnit);
                    if (textBox.value !== tempValue.toString() && taskField.duration === columnName) {
                        textBox.value = tempValue;
                        textBox.dataBind();
                    }
                    else if (taskField.startDate === columnName || taskField.endDate === columnName) {
                        textBox.value = taskField.startDate === columnName ? ganttProp.startDate.toString() : ganttProp.endDate.toString();
                        textBox.dataBind();
                    }
                }
            }
        }
        else if (col.editType === 'datepickeredit' || col.editType === 'datetimepickeredit') {
            var element = dialog.querySelector('#' + ganttId + columnName);
            if (element) {
                var picker = col.editType === 'datepickeredit' ?
                    element.ej2_instances[0] :
                    element.ej2_instances[0];
                if (picker) {
                    tempValue = ganttProp[ganttField];
                    if (((isNullOrUndefined(picker.value)) && !isNullOrUndefined(tempValue)) ||
                        (isNullOrUndefined(tempValue) && !isNullOrUndefined(picker.value)) ||
                        (picker.value !== tempValue && !isNullOrUndefined(picker.value) && !isNullOrUndefined(tempValue)
                            && picker.value.toString() !== tempValue.toString())) {
                        picker.value = tempValue;
                        picker.dataBind();
                    }
                }
            }
        }
        else if (col.editType === 'numericedit') {
            var numericTextBox = dialog.querySelector('#' + ganttId + columnName).ej2_instances[0];
            tempValue = ganttProp[ganttField];
            if (!isNullOrUndefined(tempValue) && numericTextBox.value !== tempValue) {
                numericTextBox.value = tempValue;
                numericTextBox.dataBind();
            }
        }
    };
    /**
     * @param {IGanttData} ganttData .
     * @returns {void} .
     * @private
     */
    DialogEdit.prototype.validateDuration = function (ganttData) {
        var ganttProp = ganttData.ganttProperties;
        if (!this.dialogEditValidationFlag) {
            if (!isNullOrUndefined(ganttProp.startDate) && !isScheduledTask(ganttProp) && isNullOrUndefined(ganttProp.duration)) {
                this.parent.setRecordValue('endDate', null, ganttProp, true);
                this.parent.setRecordValue('isMilestone', false, ganttProp, true);
            }
            else if (isScheduledTask(ganttProp) || !isNullOrUndefined(ganttProp.startDate)) {
                if (ganttData.ganttProperties.isMilestone && ganttData.ganttProperties.duration !== 0) {
                    var updatedStartDate = this.parent.dateValidationModule.checkStartDate(ganttProp.startDate);
                    this.parent.setRecordValue('startDate', updatedStartDate, ganttProp, true);
                    if (this.parent.taskFields.startDate) {
                        this.parent.dataOperation.updateMappingData(ganttData, 'startDate');
                    }
                }
                this.parent.dateValidationModule.calculateEndDate(ganttData);
            }
            else if (!isScheduledTask(ganttProp) && !isNullOrUndefined(ganttProp.endDate)) {
                this.parent.dateValidationModule.calculateStartDate(ganttData);
            }
            var milestone = ganttProp.duration === 0 ? true : false;
            this.parent.setRecordValue('isMilestone', milestone, ganttProp, true);
            this.dialogEditValidationFlag = true;
        }
    };
    DialogEdit.prototype.validateStartDate = function (ganttData) {
        var ganttProp = ganttData.ganttProperties;
        var tasks = this.parent.taskFields;
        if (!this.dialogEditValidationFlag) {
            if (isNullOrUndefined(ganttProp.startDate)) {
                this.parent.setRecordValue('duration', null, ganttProp, true);
                this.parent.setRecordValue('isMilestone', false, ganttProp, true);
                if (this.parent.allowUnscheduledTasks && isNullOrUndefined(tasks.endDate)) {
                    this.parent.setRecordValue('endDate', null, ganttProp, true);
                }
            }
            else if (isScheduledTask(ganttProp)) {
                if (isNullOrUndefined(tasks.duration)) {
                    this.parent.dateValidationModule.calculateDuration(ganttData);
                }
                else if (isNullOrUndefined(tasks.endDate)) {
                    this.parent.dateValidationModule.calculateEndDate(ganttData);
                }
                else {
                    this.parent.dateValidationModule.calculateEndDate(ganttData);
                }
            }
            else {
                if (!isNullOrUndefined(ganttProp.endDate)) {
                    this.parent.dateValidationModule.calculateDuration(ganttData);
                }
                else if (!isNullOrUndefined(ganttProp.duration)) {
                    this.parent.dateValidationModule.calculateEndDate(ganttData);
                }
            }
            this.dialogEditValidationFlag = true;
        }
    };
    DialogEdit.prototype.validateEndDate = function (ganttData) {
        var ganttProp = ganttData.ganttProperties;
        var tasks = this.parent.taskFields;
        if (!this.dialogEditValidationFlag) {
            if (isNullOrUndefined(ganttProp.endDate)) {
                this.parent.setRecordValue('duration', null, ganttProp, true);
                this.parent.setRecordValue('isMilestone', false, ganttProp, true);
            }
            else if (isScheduledTask(ganttProp)) {
                if (isNullOrUndefined(tasks.duration)) {
                    this.parent.dateValidationModule.calculateDuration(ganttData);
                }
                else if (isNullOrUndefined(ganttProp.startDate)) {
                    this.parent.dateValidationModule.calculateStartDate(ganttData);
                }
                else {
                    if (!isNullOrUndefined(ganttProp.segments) && ganttProp.segments.length > 0) {
                        ganttProp.segments = this.parent.editModule.cellEditModule.validateEndDateWithSegments(ganttProp);
                    }
                    this.parent.dateValidationModule.calculateDuration(ganttData);
                }
            }
            else {
                if (!isNullOrUndefined(ganttProp.duration)) {
                    this.parent.dateValidationModule.calculateStartDate(ganttData);
                }
                else if (!isNullOrUndefined(ganttProp.startDate)) {
                    this.parent.dateValidationModule.calculateDuration(ganttData);
                }
            }
            this.dialogEditValidationFlag = true;
        }
    };
    /**
     *
     * @param {string} columnName .
     * @param {string} value .
     * @param {IGanttData} currentData .
     * @returns {boolean} .
     * @private
     */
    DialogEdit.prototype.validateScheduleValuesByCurrentField = function (columnName, value, currentData) {
        var ganttObj = this.parent;
        var ganttProp = currentData.ganttProperties;
        var taskSettings = ganttObj.taskFields;
        if (taskSettings.duration === columnName) {
            if (!isNullOrUndefined(value) && value !== '' && (parseInt(value, 10) >= 0 || parseFloat(value) >= 0)) {
                ganttObj.dataOperation.updateDurationValue(value, ganttProp);
                this.parent.setRecordValue(taskSettings.duration, value, currentData);
                this.parent.setRecordValue('taskData.' + taskSettings.duration, ganttProp.duration, currentData);
                if (ganttProp.isMilestone && !isNullOrUndefined(this.parent.editModule.cellEditModule)) {
                    var editedArgs = {};
                    editedArgs.data = currentData;
                    this.parent.editModule.cellEditModule['updateDates'](editedArgs);
                }
                this.validateDuration(currentData);
            }
            else {
                if (ganttObj.allowUnscheduledTasks) {
                    if ((ganttProp.startDate && ganttProp.endDate && ganttProp.startDate.getTime() > ganttProp.endDate.getTime()) || value.indexOf('-') !== -1) {
                        this.parent.setRecordValue('duration', 0, ganttProp, true);
                        if (ganttProp.endDate) {
                            this.parent.setRecordValue('startDate', ganttProp.endDate, ganttProp, true);
                        }
                    }
                    else {
                        if (value === '') {
                            this.parent.setRecordValue('duration', null, ganttProp, true);
                            if (ganttProp.endDate && ganttProp.startDate) {
                                this.parent.setRecordValue('endDate', null, ganttProp, true);
                            }
                        }
                        else {
                            var regex = /^[^\d.-]+$/;
                            if (regex.test(value)) {
                                var err = "The provided value for the " + taskSettings.duration + " field is invalid. Please ensure the " + taskSettings.duration + " field contains only valid numeric values.";
                                this.parent.trigger('actionFailure', { error: err });
                            }
                            this.parent.setRecordValue('duration', ganttProp.duration, ganttProp, true);
                        }
                    }
                }
            }
            this.parent.editModule.updateResourceRelatedFields(currentData, 'duration');
        }
        if (taskSettings.startDate === columnName) {
            if (value !== '') {
                var startDate = this.parent.dateValidationModule.getDateFromFormat(value);
                startDate = this.parent.dateValidationModule.checkStartDate(startDate, ganttProp);
                this.parent.setRecordValue('startDate', startDate, ganttProp, true);
                this.validateStartDate(currentData);
            }
            else {
                if (ganttObj.allowUnscheduledTasks && !(currentData.hasChildRecords)) {
                    this.parent.setRecordValue('startDate', null, ganttProp, true);
                    this.parent.setRecordValue('duration', null, ganttProp, true);
                    this.parent.setRecordValue('isMilestone', false, ganttProp, true);
                }
            }
        }
        if (taskSettings.endDate === columnName) {
            if (value !== '') {
                var endDate = this.parent.dateValidationModule.getDateFromFormat(value);
                var dayEndTime = this.parent['getCurrentDayEndTime'](endDate);
                if (endDate.getHours() === 0 && dayEndTime !== 86400) {
                    this.parent.dateValidationModule.setTime(dayEndTime, endDate);
                }
                if (!isNullOrUndefined(ganttProp.startDate) && !isNullOrUndefined(ganttProp.endDate) && !isNullOrUndefined(endDate) &&
                    ganttProp.startDate.getTime() > endDate.getTime()) {
                    endDate = ganttProp.endDate;
                }
                endDate = this.parent.dateValidationModule.checkEndDate(endDate, ganttProp);
                if (isNullOrUndefined(ganttProp.startDate) || endDate.getTime() >= (ganttProp.startDate).getTime()) {
                    this.parent.setRecordValue('endDate', endDate, ganttProp, true);
                }
                this.validateEndDate(currentData);
                if (ganttProp.isMilestone && !isNullOrUndefined(this.parent.editModule.cellEditModule)) {
                    var editedArgs = {};
                    editedArgs.data = currentData;
                    this.parent.editModule.cellEditModule['updateDates'](editedArgs);
                }
            }
            else {
                if (ganttObj.allowUnscheduledTasks) {
                    this.parent.setRecordValue('endDate', null, ganttProp, true);
                    this.parent.setRecordValue('duration', null, ganttProp, true);
                    this.parent.setRecordValue('isMilestone', false, ganttProp, true);
                }
            }
        }
        if (taskSettings.work === columnName) {
            if (!isNullOrUndefined(value) && value !== '') {
                this.parent.setRecordValue('work', value, ganttProp, true);
                this.parent.editModule.updateResourceRelatedFields(currentData, 'work');
                this.validateDuration(currentData);
            }
        }
        if (columnName === taskSettings.type) {
            this.parent.setRecordValue('taskType', value, ganttProp, true);
            // To validate the work column as well, if duartion column value is 0, when FixedDuration type
            if (value && value === 'FixedDuration' && ganttProp.duration === 0) {
                this.parent.editModule.updateResourceRelatedFields(currentData, 'work');
            }
        }
        if (taskSettings.manual === columnName) {
            this.parent.editModule.updateTaskScheduleModes(currentData);
        }
        return true;
    };
    DialogEdit.prototype.getSegmentsModel = function (fields) {
        var _this = this;
        var taskSettings = this.parent.taskFields;
        if (isNullOrUndefined(fields) || fields.length === 0) {
            fields = [];
            if (!isNullOrUndefined(taskSettings.startDate)) {
                fields.push(this.parent.taskFields.startDate);
            }
            if (!isNullOrUndefined(taskSettings.endDate)) {
                fields.push(this.parent.taskFields.endDate);
            }
            if (!isNullOrUndefined(taskSettings.duration)) {
                fields.push(this.parent.taskFields.duration);
            }
            if (!isNullOrUndefined(taskSettings.id)) {
                fields.push(this.parent.taskFields.id);
            }
        }
        var segmentInputModel = {};
        segmentInputModel.editSettings = {
            allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', newRowPosition: 'Bottom'
        };
        segmentInputModel.locale = this.parent.locale;
        segmentInputModel.dataSource = [];
        segmentInputModel.rowHeight = this.parent.isAdaptive ? 48 : null;
        segmentInputModel.toolbar = [
            {
                id: this.parent.element.id + 'SegmentsTabContainer' + '_add', prefixIcon: 'e-add',
                tooltipText: this.localeObj.getConstant('add'), align: 'Right',
                text: this.parent.isAdaptive ? '' : this.localeObj.getConstant('add')
            },
            {
                id: this.parent.element.id + 'SegmentsTabContainer' + '_delete', prefixIcon: 'e-delete',
                tooltipText: this.localeObj.getConstant('delete'), align: 'Right',
                text: this.parent.isAdaptive ? '' : this.localeObj.getConstant('delete')
            }
        ];
        var gridColumns = [];
        var _loop_1 = function (i) {
            var gridColumn = {};
            var generalTabString = 'General';
            switch (fields[i]) {
                case this_1.parent.taskFields.id:
                    gridColumn = {
                        field: fields[i], visible: false, isPrimaryKey: true
                    };
                    gridColumns.push(gridColumn);
                    break;
                case this_1.parent.taskFields.startDate:
                case this_1.parent.taskFields.endDate:
                    gridColumn = {
                        field: fields[i], headerText: this_1.localeObj.getConstant((fields[i] === this_1.parent.taskFields.startDate) ? 'startDate' : 'endDate'), editType: 'stringedit', width: '200px',
                        edit: {
                            write: function (args) {
                                var datePickerModel;
                                if (!isNullOrUndefined(_this.beforeOpenArgs[generalTabString]) &&
                                    !isNullOrUndefined(_this.beforeOpenArgs[generalTabString][fields[i]])) {
                                    datePickerModel = _this.beforeOpenArgs[generalTabString][fields[i]];
                                }
                                else {
                                    var columnFields = _this.getGeneralColumnFields();
                                    var columnModel = _this.getFieldsModel(columnFields);
                                    datePickerModel = columnModel[fields[i]];
                                }
                                var value = args.rowData[args.column.field];
                                setValue('value', value, datePickerModel);
                                var datePicker = new _this.inputs[_this.parent.columnByField[fields[i]].editType](datePickerModel);
                                datePicker.appendTo(args.element);
                            },
                            read: function (args) {
                                var ej2Instance = args.ej2_instances[0];
                                return ej2Instance.value;
                            }
                        },
                        format: this_1.parent.getDateFormat()
                    };
                    if (fields[i] === this_1.parent.taskFields.startDate) {
                        gridColumn.validationRules = { required: true };
                    }
                    gridColumns.push(gridColumn);
                    break;
                case this_1.parent.taskFields.duration:
                    gridColumn = {
                        field: fields[i], headerText: this_1.localeObj.getConstant(fields[i].toLocaleLowerCase()), editType: 'stringedit',
                        width: '100px', edit: {
                            write: function (args) {
                                var inputTextModel;
                                if (!isNullOrUndefined(_this.beforeOpenArgs[generalTabString]) &&
                                    !isNullOrUndefined(_this.beforeOpenArgs[generalTabString][fields[i]])) {
                                    inputTextModel = _this.beforeOpenArgs[generalTabString][fields[i]];
                                }
                                else {
                                    var columnFields = _this.getGeneralColumnFields();
                                    var columnModel = _this.getFieldsModel(columnFields);
                                    inputTextModel = columnModel[fields[i]];
                                }
                                inputTextModel.floatLabelType = 'Never';
                                var value = args.rowData[args.column.field];
                                if (!isNullOrUndefined(value)) {
                                    setValue('value', value, inputTextModel);
                                }
                                else {
                                    setValue('value', null, inputTextModel);
                                }
                                setValue('value', value, inputTextModel);
                                var inputModel = new TextBox(inputTextModel);
                                inputModel.appendTo(args.element);
                            },
                            read: function (args) {
                                var ej2Instance = args.ej2_instances[0];
                                return ej2Instance.value.toString();
                            }
                        }
                    };
                    gridColumns.push(gridColumn);
                    break;
            }
        };
        var this_1 = this;
        for (var i = 0; i < fields.length; i++) {
            _loop_1(i);
        }
        segmentInputModel.columns = gridColumns;
        segmentInputModel.height = (this.parent.isAdaptive || this.parent.enableAdaptiveUI) ? '100%' : '153px';
        return segmentInputModel;
    };
    DialogEdit.prototype.getGridColumnByField = function (fieldName, columns) {
        var column;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].field === fieldName) {
                column = columns[i];
            }
        }
        return column;
    };
    DialogEdit.prototype.updateSegmentField = function (columnName, args, segment) {
        var dialog = this.parent.editModule.dialogModule.dialog;
        var gridModel = getValue('Segments', this.beforeOpenArgs);
        var col = this.getGridColumnByField(columnName, gridModel.columns);
        var ganttId = this.parent.element.id;
        var tempValue = segment[columnName];
        var inputValue;
        if (col.editType === 'stringedit') {
            inputValue = dialog.querySelector('#' + ganttId + 'SegmentsTabContainer' + columnName)
                .ej2_instances[0];
        }
        else if (col.editType === 'datepickeredit') {
            inputValue = dialog.querySelector('#' + ganttId + 'SegmentsTabContainer' + columnName)
                .ej2_instances[0];
        }
        if ((!isNullOrUndefined(inputValue.value)) && (!isNullOrUndefined(tempValue)) &&
            (inputValue.value.toString() !== tempValue.toString())) {
            inputValue.value = tempValue;
            inputValue.dataBind();
        }
    };
    DialogEdit.prototype.validateSegmentFields = function (ganttObj, columnName, cellValue, args) {
        var taskSettings = this.parent.taskFields;
        if (!isNullOrUndefined(taskSettings.duration) && taskSettings.duration.toLowerCase() === columnName.toLowerCase()) {
            if (!isNullOrUndefined(cellValue) && cellValue !== '') {
                this.selectedSegment[taskSettings.duration] = Number(cellValue);
                var endDate = ganttObj.dataOperation.getEndDate(this.selectedSegment[taskSettings.startDate], Number(cellValue), this.editedRecord.ganttProperties.durationUnit, this.editedRecord.ganttProperties, false);
                endDate = ganttObj.dataOperation.checkEndDate(endDate, this.editedRecord.ganttProperties, false);
                this.selectedSegment[taskSettings.endDate] = endDate;
            }
        }
        if (!isNullOrUndefined(taskSettings.startDate) && taskSettings.startDate.toLowerCase() === columnName.toLowerCase()) {
            if (cellValue !== '') {
                var startDate = this.parent.dateValidationModule.getDateFromFormat(cellValue);
                startDate = this.parent.dateValidationModule.checkStartDate(startDate);
                this.selectedSegment[taskSettings.startDate] = startDate;
                if (!isNullOrUndefined(taskSettings.endDate)) {
                    this.selectedSegment.endDate = this.parent.dataOperation.getEndDate(startDate, this.selectedSegment[taskSettings.duration], this.editedRecord.ganttProperties.durationUnit, this.editedRecord.ganttProperties, false);
                }
            }
        }
        if (!isNullOrUndefined(taskSettings.endDate) && taskSettings.endDate.toLowerCase() === columnName.toLowerCase()) {
            if (cellValue !== '') {
                var endDate = this.parent.dateValidationModule.getDateFromFormat(cellValue);
                var dayEndTime = this.parent['getCurrentDayEndTime'](endDate);
                if (endDate.getHours() === 0 && dayEndTime !== 86400) {
                    this.parent.dateValidationModule.setTime(dayEndTime, endDate);
                }
                endDate = this.parent.dateValidationModule.checkEndDate(endDate, this.editedRecord.ganttProperties);
                this.selectedSegment[taskSettings.endDate] = endDate;
                this.selectedSegment[taskSettings.duration] = this.parent.dataOperation.getDuration(this.selectedSegment[taskSettings.startDate], this.selectedSegment[taskSettings.endDate], this.editedRecord.ganttProperties.durationUnit, true, false, true);
            }
        }
        if (!isNullOrUndefined(taskSettings.startDate)) {
            this.updateSegmentField(taskSettings.startDate, args, this.selectedSegment);
        }
        if (!isNullOrUndefined(taskSettings.endDate)) {
            this.updateSegmentField(taskSettings.endDate, args, this.selectedSegment);
        }
        if (!isNullOrUndefined(taskSettings.duration)) {
            this.updateSegmentField(taskSettings.duration, args, this.selectedSegment);
        }
    };
    DialogEdit.prototype.getPredecessorModel = function (fields) {
        if (isNullOrUndefined(fields) || fields.length === 0) {
            fields = ['ID', 'Name', 'Type', 'Offset', 'UniqueId'];
        }
        var inputModel = {};
        inputModel.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal' };
        inputModel.locale = this.parent.locale;
        inputModel.dataSource = [];
        inputModel.rowHeight = this.parent.isAdaptive ? 48 : null;
        inputModel.toolbar = [
            {
                id: this.parent.element.id + 'DependencyTabContainer' + '_add', prefixIcon: 'e-add',
                tooltipText: this.localeObj.getConstant('add'), align: 'Right',
                text: this.parent.isAdaptive ? '' : this.localeObj.getConstant('add')
            },
            {
                id: this.parent.element.id + 'DependencyTabContainer' + '_delete', prefixIcon: 'e-delete',
                tooltipText: this.localeObj.getConstant('delete'), align: 'Right',
                text: this.parent.isAdaptive ? '' : this.localeObj.getConstant('delete')
            }
        ];
        var columns = [];
        for (var i = 0; i < fields.length; i++) {
            var column = {};
            if (fields[i].toLowerCase() === 'id') {
                column = {
                    field: 'id', headerText: this.localeObj.getConstant('id'), allowEditing: false, width: '70px'
                };
                columns.push(column);
            }
            else if (fields[i].toLowerCase() === 'name') {
                column = {
                    field: 'name', headerText: this.localeObj.getConstant('name'), editType: 'stringedit', width: '250px',
                    validationRules: { required: true }
                };
                columns.push(column);
            }
            else if (fields[i].toLowerCase() === 'type') {
                column = {
                    field: 'type', headerText: this.localeObj.getConstant('type'), editType: 'dropdownedit',
                    dataSource: this.types, foreignKeyField: 'id', foreignKeyValue: 'text',
                    defaultValue: 'FS', validationRules: { required: true }, width: '150px'
                };
                columns.push(column);
            }
            else if (fields[i].toLowerCase() === 'offset') {
                column = {
                    field: 'offset', headerText: this.localeObj.getConstant('offset'), editType: 'stringedit',
                    defaultValue: this.parent.dataOperation.getDurationString(0, this.beforeOpenArgs.rowData.ganttProperties.durationUnit),
                    validationRules: { required: true }, width: '100px'
                };
                columns.push(column);
            }
            else if (fields[i].toLowerCase() === 'uniqueid') {
                column = {
                    field: 'uniqueId', isPrimaryKey: true, visible: false, defaultValue: getUid().toString()
                };
                columns.push(column);
            }
        }
        inputModel.columns = columns;
        inputModel.height = (this.parent.isAdaptive || this.parent.enableAdaptiveUI) ? '100%' : '153px';
        return inputModel;
    };
    DialogEdit.prototype.getResourcesModel = function (fields) {
        var ganttObj = this.parent;
        var resourceSettings = ganttObj.resourceFields;
        if (isNullOrUndefined(fields) || fields.length === 0) {
            fields = [resourceSettings.id, resourceSettings.name, resourceSettings.unit, resourceSettings.group];
        }
        var inputModel = {
            allowFiltering: true,
            treeColumnIndex: -1,
            childMapping: '',
            editSettings: { allowEditing: true, mode: 'Cell' },
            locale: this.parent.locale,
            allowSelection: true,
            rowHeight: this.parent.isAdaptive ? 48 : null,
            filterSettings: { type: 'Menu' },
            selectionSettings: { checkboxOnly: true, checkboxMode: 'Default', persistSelection: true, type: 'Multiple' }
        };
        var columns = [
            { type: 'checkbox', allowEditing: false, allowSorting: false, allowFiltering: false, width: 60 }
        ];
        for (var i = 0; i < fields.length; i++) {
            var column = {};
            if (fields[i] === resourceSettings.id) {
                column = {
                    field: resourceSettings.id,
                    headerText: this.localeObj.getConstant('id'), isPrimaryKey: true, width: '100px',
                    allowEditing: false
                };
                columns.push(column);
            }
            else if (fields[i] === resourceSettings.name) {
                column = {
                    field: resourceSettings.name, headerText: this.localeObj.getConstant('name'),
                    allowEditing: false
                };
                columns.push(column);
            }
            else if (fields[i] === resourceSettings.unit) {
                column = {
                    field: resourceSettings.unit,
                    headerText: this.localeObj.getConstant('unit'),
                    editType: 'numericedit',
                    edit: { params: { min: 0 } }
                };
                columns.push(column);
            }
            else if (fields[i] === resourceSettings.group && !isNullOrUndefined(resourceSettings.group)) {
                column = {
                    field: resourceSettings.group,
                    headerText: this.localeObj.getConstant('group'),
                    allowEditing: false
                };
                columns.push(column);
            }
        }
        inputModel.columns = columns;
        inputModel.height = (this.parent.isAdaptive || this.parent.enableAdaptiveUI) ? '100%' : '196px';
        return inputModel;
    };
    DialogEdit.prototype.getNotesModel = function (fields) {
        if (isNullOrUndefined(fields) || fields.length === 0) {
            fields = ['Bold', 'Italic', 'Underline', 'StrikeThrough',
                'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
                'LowerCase', 'UpperCase', '|',
                'Alignments', 'OrderedList', 'UnorderedList',
                'Outdent', 'Indent', '|', 'CreateTable',
                'CreateLink', '|', 'ClearFormat', 'Print',
                '|', 'Undo', 'Redo'];
        }
        var inputModel = {
            placeholder: this.localeObj.getConstant('writeNotes'),
            toolbarSettings: {
                items: fields
            },
            height: (this.parent.isAdaptive || this.parent.enableAdaptiveUI) ? '100%' : 'auto',
            locale: this.parent.locale
        };
        return inputModel;
    };
    DialogEdit.prototype.createDivElement = function (className, id) {
        return createElement('div', { className: className, id: id });
    };
    DialogEdit.prototype.createFormElement = function (className, id) {
        return createElement('form', { className: className, id: id });
    };
    DialogEdit.prototype.createInputElement = function (className, id, fieldName, type) {
        return createElement(type || 'input', {
            className: className, attrs: {
                type: 'text', id: id, name: fieldName,
                title: fieldName
            }
        });
    };
    DialogEdit.prototype.renderTabItems = function () {
        var tabModel = this.beforeOpenArgs.tabModel;
        var isCustomTab = false;
        var items = tabModel.items;
        var index = 0;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.content instanceof HTMLElement) {
                continue;
            }
            else if (item.content === 'General') {
                item.content = this.renderGeneralTab(item.content);
            }
            else if (item.content === 'Dependency') {
                if (this.editedRecord.hasChildRecords && !this.parent.allowParentDependency) {
                    item.disabled = true;
                }
                item.content = this.renderPredecessorTab(item.content);
            }
            else if (item.content === 'Resources') {
                item.content = this.renderResourceTab(item.content);
            }
            else if (item.content === ('Custom' + '' + index)) {
                isCustomTab = true;
                item.content = this.renderCustomTab(item.content, isCustomTab);
                index++;
            }
            else if (item.content === 'Notes') {
                item.content = this.renderNotesTab(item.content);
            }
            else if (item.content === 'Segments') {
                if (this.editedRecord.hasChildRecords) {
                    item.disabled = true;
                }
                item.content = this.renderSegmentsTab(item.content);
            }
        }
    };
    DialogEdit.prototype.segmentGridActionBegin = function (args) {
        var _a, _b;
        var taskFields = this.parent.taskFields;
        var itemName = 'Segments';
        var gridModel = this.beforeOpenArgs[itemName];
        if (args.requestType === 'add' || args.requestType === 'beginEdit' || args.requestType === 'save') {
            var gridData = gridModel.dataSource;
            var selectedItem = getValue('rowData', args);
            var startDate = this.beforeOpenArgs.rowData.ganttProperties.startDate;
            if (!isNullOrUndefined(startDate)) {
                if (args.requestType === 'add') {
                    var arg = {};
                    var sDate = getValue(this.parent.taskFields.startDate, selectedItem);
                    var eDate = this.parent.taskFields.endDate ? getValue(this.parent.taskFields.endDate, selectedItem) : null;
                    var duration = void 0;
                    if (!isNullOrUndefined(this.parent.taskFields.duration)) {
                        duration = getValue(this.parent.taskFields.duration, selectedItem);
                    }
                    var startDate_1 = !isNullOrUndefined(gridData) && gridData.length > 0 ?
                        (!isNullOrUndefined(taskFields.endDate) && !isNullOrUndefined(gridData[0][taskFields.endDate])) ?
                            new Date(getValue(taskFields.endDate, gridData[0]).getTime()) :
                            new Date(getValue(taskFields.startDate, gridData[0]).getTime()) :
                        !isNullOrUndefined(this.beforeOpenArgs.rowData.ganttProperties.startDate) &&
                            new Date(this.beforeOpenArgs.rowData.ganttProperties.startDate.getTime());
                    startDate_1.setHours(0, 0, 0, 0);
                    if (!isNullOrUndefined(gridData) && gridData.length > 0) {
                        startDate_1.setDate(startDate_1.getDate() + 2);
                    }
                    sDate = this.parent.dataOperation.checkStartDate(startDate_1);
                    eDate = this.parent.dateValidationModule.getDateFromFormat(sDate);
                    var dayEndTime = this.parent['getCurrentDayEndTime'](eDate);
                    if (eDate.getHours() === 0 && dayEndTime !== 86400) {
                        this.parent.dateValidationModule.setTime(dayEndTime, eDate);
                    }
                    eDate = !isNullOrUndefined(taskFields.endDate) && !isNullOrUndefined(gridData) && gridData.length <= 0 ?
                        this.beforeOpenArgs.rowData.ganttProperties.endDate : eDate;
                    var rowData = this.beforeOpenArgs.rowData.ganttProperties;
                    if (sDate.getTime() === eDate.getTime()) {
                        duration = 1;
                    }
                    else {
                        duration = this.parent.dataOperation.getDuration(sDate, eDate, rowData.durationUnit, true, false, true);
                    }
                    if (!isNullOrUndefined(taskFields['duration'])) {
                        arg = (_a = {},
                            _a[taskFields['startDate']] = sDate,
                            _a[taskFields['endDate']] = eDate,
                            _a[taskFields['duration']] = duration,
                            _a);
                    }
                    else {
                        arg = (_b = {},
                            _b[taskFields['startDate']] = sDate,
                            _b[taskFields['endDate']] = eDate,
                            _b);
                    }
                    args.rowData = arg;
                }
            }
            if (args.requestType === 'save') {
                var dataSource = gridModel.dataSource;
                var taskIdField_1 = this.parent.taskFields.id;
                var newId_1 = dataSource.length;
                while (dataSource.some(function (item) { return item[taskIdField_1] === newId_1; })) {
                    newId_1++;
                }
                if (isNullOrUndefined(args.data[taskIdField_1])) {
                    args.data[taskIdField_1] = newId_1;
                    args.rowData[taskIdField_1] = newId_1;
                }
            }
            this.selectedSegment = args.rowData;
            // if (args.requestType === 'save') {
            //     // let duration: string = 'duration';
            //     // let tempDuration: Object = this.parent.dataOperation.getDurationValue(args.data[duration]);
            //     // args.data[duration] = getValue('duration', tempDuration);
            //     this.selectedSegment = !isNullOrUndefined(this.editedRecord.ganttProperties.segments[args.rowIndex]) ?
            //         this.editedRecord.ganttProperties.segments[args.rowIndex] : !isNullOrUndefined(gridData[args.rowIndex]) ?
            //             gridData[args.rowIndex] : gridData;
            // }
        }
    };
    DialogEdit.prototype.getDialogTabIndex = function (tabName) {
        var indexValue;
        if (!this.isEdit) {
            this.parent.addDialogFields.map(function (item, index) {
                if (item.type === tabName) {
                    indexValue = index;
                }
            });
        }
        else {
            this.parent.editDialogFields.map(function (item, index) {
                if (item.type === tabName) {
                    indexValue = index;
                }
            });
        }
        return indexValue;
    };
    /* eslint-disable-next-line */
    DialogEdit.prototype.setInjected = function (dialogField, allProperty, Grid, toolbar, toolbarCollection, gridModel, columnCollection) {
        if (!isNullOrUndefined(dialogField) && !isNullOrUndefined(dialogField.additionalParams)) {
            allProperty = (dialogField.additionalParams);
            for (var i in allProperty) {
                if (Object.prototype.hasOwnProperty.call(allProperty, i)) {
                    switch (i) {
                        case 'allowFiltering':
                            Grid.Inject(Filter);
                            break;
                        case 'allowSorting':
                            Grid.Inject(Sort);
                            break;
                        case 'allowPaging':
                            Grid.Inject(Page);
                            break;
                        case 'allowGrouping':
                            Grid.Inject(Group);
                            break;
                        case 'editSettings':
                            Grid.Inject(Edit);
                            break;
                        case 'aggregates':
                            Grid.Inject(Aggregate);
                            break;
                        case 'showColumnChooser':
                            Grid.Inject(ColumnChooser);
                            break;
                        case 'showColumnMenu':
                            Grid.Inject(ColumnMenu);
                            break;
                        case 'contextMenuItems':
                            Grid.Inject(ContextMenu);
                            break;
                        case 'allowResizing':
                            Grid.Inject(Resize);
                            break;
                        case 'allowReordering':
                            Grid.Inject(Reorder);
                            break;
                        case 'detailTemplate':
                            Grid.Inject(DetailRow);
                            break;
                        case 'allowRowDragAndDrop':
                            Grid.Inject(RowDD);
                            break;
                        case 'searchSettings':
                            Grid.Inject(Search);
                            break;
                        case 'selectionSettings':
                            Grid.Inject(Selection);
                            break;
                        case 'enableVirtualization':
                            Grid.Inject(VirtualScroll);
                            break;
                        case 'toolbar':
                            toolbar = allProperty['toolbar'];
                            toolbar.map(function (item) {
                                switch (item) {
                                    case 'Search':
                                        Grid.Inject(Search);
                                        break;
                                    case 'Print':
                                        Grid.Inject(Print);
                                        break;
                                    case 'PdfExport':
                                        Grid.Inject(PdfExport);
                                        break;
                                    case 'ExcelExport':
                                        Grid.Inject(ExcelExport);
                                        break;
                                    default:
                                        break;
                                }
                            });
                            toolbarCollection = gridModel.toolbar;
                            Grid.Inject(GridToolbar);
                            break;
                        case 'columns':
                            columnCollection = gridModel.columns;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    };
    DialogEdit.prototype.renderSegmentsTab = function (itemName) {
        var _this = this;
        var ganttObj = this.parent;
        var gridModel = this.beforeOpenArgs[itemName];
        gridModel.enableAdaptiveUI = this.parent.enableAdaptiveUI;
        var ganttData = this.beforeOpenArgs.rowData;
        var preData = [];
        if (this.isEdit) {
            preData = isNullOrUndefined(ganttData.taskData[this.parent.taskFields['segments']]) ? [] : ganttData.taskData[this.parent.taskFields['segments']];
        }
        /* eslint-disable-next-line */
        preData.map(function (item, index) {
            if (isNullOrUndefined(item[_this.parent.taskFields['id']])) {
                item[_this.parent.taskFields['id']] = index;
            }
        });
        gridModel.dataSource = preData;
        gridModel.actionBegin = this.segmentGridActionBegin.bind(this);
        var tabIndex = this.getDialogTabIndex('Segments');
        var dialogField;
        if (!this.isEdit) {
            dialogField = this.parent.addDialogFields[tabIndex];
        }
        else if (this.isEdit) {
            dialogField = this.parent.editDialogFields[tabIndex];
        }
        var allProperty;
        var toolbarCollection = [];
        /* eslint-disable-next-line */
        var columnCollection = [];
        var toolbar;
        if (!isNullOrUndefined(dialogField) && !isNullOrUndefined(dialogField.additionalParams)) {
            allProperty = (dialogField.additionalParams);
        }
        this.setInjected(dialogField, allProperty, Grid, toolbar, toolbarCollection, gridModel, columnCollection);
        Grid.Inject(Edit, Page, GridToolbar, ForeignKey);
        gridModel = __assign({}, gridModel, allProperty);
        gridModel.toolbar = toolbarCollection.concat(gridModel.toolbar);
        var columnCollections = this.updateColumns(columnCollection, gridModel.columns);
        gridModel.columns = columnCollections;
        var gridObj = new Grid(gridModel);
        var divElement = this.createDivElement('', ganttObj.element.id + '' + itemName + 'TabContainer');
        gridObj.appendTo(divElement);
        return divElement;
    };
    DialogEdit.prototype.renderGeneralTab = function (itemName, isCustomTab) {
        var ganttObj = this.parent;
        /* eslint-disable-next-line */
        var addFields = [];
        var divElement;
        var itemModel = this.beforeOpenArgs[itemName];
        if (isCustomTab) {
            divElement = this.createDivElement('e-edit-form-row', ganttObj.element.id
                + '' + itemName + 'TabContainer');
        }
        else {
            divElement = this.createFormElement('e-edit-form-row', ganttObj.element.id
                + '' + itemName + 'TabContainer');
        }
        var table;
        var tbody;
        if (this.parent.enableAdaptiveUI) {
            divElement.style.height = '100%';
            table = createElement('table', { className: 'e-table' });
            table.style.width = '100%';
            tbody = createElement('tbody');
        }
        var getId = divElement.id;
        for (var _i = 0, _a = Object.keys(itemModel); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.parent.columnByField[key].visible === false) {
                continue;
            }
            var column = this.parent.columnByField[key];
            var inputModel = itemModel[key];
            if (this.parent.enableAdaptiveUI) {
                tbody.appendChild(this.renderInputElements(inputModel, column));
            }
            else {
                divElement.appendChild(this.renderInputElements(inputModel, column));
            }
            addFields.push(key);
        }
        if (this.parent.enableAdaptiveUI) {
            table.appendChild(tbody);
            divElement.appendChild(table);
        }
        if (getId !== divElement.id) {
            divElement.id = getId;
        }
        var tabIndex = this.getDialogTabIndex('General');
        var fields = [];
        if (!this.isEdit && !isNullOrUndefined(this.parent.addDialogFields[tabIndex]) &&
            !isNullOrUndefined(this.parent.addDialogFields[tabIndex].fields)) {
            fields = this.parent.addDialogFields[tabIndex].fields;
        }
        else if (this.isEdit && !isNullOrUndefined(this.parent.editDialogFields[tabIndex]) &&
            !isNullOrUndefined(this.parent.editDialogFields[tabIndex].fields)) {
            fields = this.parent.editDialogFields[tabIndex].fields;
        }
        if (!isNullOrUndefined(fields)) {
            var templateFields = fields.filter(function (item) { return !addFields.includes(item); });
            if (!isNullOrUndefined(templateFields)) {
                var template = templateFields;
                for (var i = 0; i <= template.length - 1; i++) {
                    var scriptElement = document.getElementById(template[i]);
                    if (!isNullOrUndefined(scriptElement)) {
                        var templateContent = scriptElement.innerHTML;
                        var div = createElement('div');
                        div.innerHTML = templateContent;
                        divElement.appendChild(div.children[0]);
                    }
                }
            }
        }
        return divElement;
    };
    DialogEdit.prototype.isCheckIsDisabled = function (column) {
        var disabled = false;
        var stringOrNumber;
        if (column.allowEditing === false || column.isPrimaryKey || this.parent.readOnly) {
            if (this.parent.customColumns.indexOf(column.field) !== -1) {
                disabled = true;
            }
            else {
                if (column.field === this.parent.taskFields.baselineStartDate || column.field === this.parent.taskFields.baselineEndDate ||
                    column.field === this.parent.taskFields.work || column.field === this.parent.taskFields.type ||
                    column.field === this.parent.taskFields.id || column.field === this.parent.taskFields.name ||
                    column.field === this.parent.taskFields.duration || column.field === this.parent.taskFields.progress ||
                    column.field === this.parent.taskFields.startDate || column.field === this.parent.taskFields.endDate) {
                    for (var i = 0; i < this.parent.currentViewData['length']; i++) {
                        if (!isNullOrUndefined(this.parent.currentViewData[i].ganttProperties.taskId)) {
                            stringOrNumber = this.parent.currentViewData[i].ganttProperties.taskId;
                            break;
                        }
                    }
                    if (typeof (stringOrNumber) === 'string') {
                        disabled = false;
                    }
                    else {
                        disabled = true;
                    }
                }
            }
        }
        if (this.isEdit) {
            if (column.field === this.parent.taskFields.id) {
                disabled = true;
            }
            if (this.editedRecord.hasChildRecords) {
                if ((column.field === this.parent.taskFields.endDate &&
                    ((!isNullOrUndefined(this.editedRecord[this.parent.taskFields.manual]) &&
                        this.editedRecord[this.parent.taskFields.manual] === false) ||
                        this.parent.taskMode === 'Auto')) || column.field === this.parent.taskFields.duration ||
                    column.field === this.parent.taskFields.progress || column.field === this.parent.taskFields.work ||
                    column.field === this.parent.taskFields.type) {
                    disabled = true;
                }
            }
        }
        return disabled;
    };
    DialogEdit.prototype.isParentValid = function (data) {
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].uniqueID === this.beforeOpenArgs.rowData['uniqueID']) {
                    this.isValidData = false;
                    break;
                }
                if (data[i].hasChildRecords) {
                    this.isParentValid(data[i].childRecords);
                }
                if (!this.isValidData) {
                    break;
                }
            }
        }
        return this.isValidData;
    };
    DialogEdit.prototype.renderPredecessorTab = function (itemName) {
        var _this = this;
        var ganttObj = this.parent;
        var gridModel = this.beforeOpenArgs[itemName];
        var dependencyColumn = this.parent.columnByField[this.parent.taskFields.dependency];
        if (dependencyColumn.allowEditing === false || dependencyColumn.isPrimaryKey || this.parent.readOnly) {
            gridModel.editSettings.allowEditing = false;
            gridModel.editSettings.allowAdding = false;
            gridModel.editSettings.allowDeleting = false;
        }
        var ganttData = this.beforeOpenArgs.rowData;
        var preData = [];
        this.taskNameCollection();
        if (this.isEdit) {
            preData = this.predecessorEditCollection(ganttData);
            this.updatePredecessorDropDownData(ganttData);
        }
        var predecessorLength;
        if (ganttData[this.parent.taskFields.dependency]) {
            predecessorLength = ganttData[this.parent.taskFields.dependency].split(',').length;
        }
        if (this.preTableCollection.length === 0 || this.preTableCollection.length === predecessorLength) {
            gridModel.editSettings.allowAdding = false;
        }
        gridModel.actionComplete = this.gridActionComplete.bind(this);
        gridModel.dataSource = preData;
        gridModel.enableAdaptiveUI = this.parent.enableAdaptiveUI;
        gridModel.actionBegin = this.gridActionBegin.bind(this);
        var columns = gridModel.columns;
        columns[1].edit = {
            write: function (args) {
                if (getValue('requestType', args) === 'add') {
                    setValue('rowData.uniqueId', getUid(), args);
                }
                var field = 'name';
                var autoObj = new ComboBox({
                    dataSource: new DataManager(_this.idCollection),
                    popupHeight: '180px',
                    allowCustom: false,
                    enableRtl: _this.parent.enableRtl,
                    fields: { value: 'text' },
                    value: args.rowData[field],
                    change: function (arg) {
                        var tr = closest(arg.element, 'tr');
                        var idInput = tr.querySelector('#' + _this.parent.element.id + 'DependencyTabContainerid');
                        if (idInput) {
                            if (!isNullOrUndefined(arg.itemData) && !isNullOrUndefined(arg.item)) {
                                idInput.value = arg.itemData.id;
                            }
                            else {
                                idInput.value = '';
                            }
                        }
                    },
                    autofill: true
                });
                autoObj.appendTo(args.element);
            },
            read: function (args) {
                var ej2Instance = args.ej2_instances[0];
                return ej2Instance.value;
            }
        };
        var tabIndex = this.getDialogTabIndex('Dependency');
        var dialogField;
        if (!this.isEdit) {
            dialogField = this.parent.addDialogFields[tabIndex];
        }
        else if (this.isEdit) {
            dialogField = this.parent.editDialogFields[tabIndex];
        }
        var toolbarCollection = [];
        var allProperty;
        var columnCollection = [];
        var toolbar;
        if (!isNullOrUndefined(dialogField) && !isNullOrUndefined(dialogField.additionalParams)) {
            allProperty = dialogField.additionalParams;
        }
        this.setInjected(dialogField, allProperty, Grid, toolbar, toolbarCollection, gridModel, columnCollection);
        Grid.Inject(Edit, Page, GridToolbar, ForeignKey);
        gridModel = __assign({}, gridModel, allProperty);
        gridModel.toolbar = gridModel.toolbar.concat(toolbarCollection);
        var columnCollections = this.updateColumns(columnCollection, gridModel.columns);
        gridModel.columns = columnCollections;
        var gridObj = new Grid(gridModel);
        var divElement = this.createDivElement('e-dependent-div', ganttObj.element.id + '' + itemName + 'TabContainer');
        gridObj.appendTo(divElement);
        return divElement;
    };
    DialogEdit.prototype.updateColumns = function (existingColumns, newColumns) {
        var columnMap = {};
        existingColumns.forEach(function (column) {
            if (typeof column === 'object') {
                columnMap[column.field] = column;
            }
        });
        newColumns.forEach(function (newColumn) {
            if (typeof newColumn === 'object') {
                var field = newColumn.field;
                if (columnMap[field]) {
                    Object.assign(columnMap[field], newColumn);
                }
                else {
                    existingColumns.push(newColumn);
                }
            }
        });
        return existingColumns;
    };
    DialogEdit.prototype.gridActionBegin = function (args) {
        var _this = this;
        var itemName = 'Dependency';
        var gridModel = this.beforeOpenArgs[itemName];
        if (args.requestType === 'add' || args.requestType === 'beginEdit') {
            var isEdit_1 = args.requestType === 'add' ? false : true;
            this.idCollection = extend([], [], this.preTableCollection, true);
            var gridData_1 = gridModel.dataSource;
            var _loop_2 = function (i) {
                // eslint-disable-next-line
                this_2.idCollection.forEach(function (data, index) {
                    if (data.id === getValue('id', gridData_1[i])) {
                        var selectedItem = getValue('rowData', args);
                        if (isEdit_1 && getValue('id', selectedItem) === data.id) {
                            return;
                        }
                        _this.idCollection.splice(_this.idCollection.indexOf(data), 1);
                    }
                });
            };
            var this_2 = this;
            for (var i = 0; i <= gridData_1.length; i++) {
                _loop_2(i);
            }
        }
    };
    DialogEdit.prototype.gridActionComplete = function (args) {
        if (args.requestType === 'save') {
            var dialogElement = this.parent.editModule.dialogModule.dialog.querySelector('#' + this.parent.element.id + 'DependencyTabContainer');
            if (!isNullOrUndefined(dialogElement)) {
                if (!isNullOrUndefined(args['rows']) && args['rows'].length === this.preTableCollection.length) {
                    /* eslint-disable-next-line */
                    var gridObj = dialogElement['ej2_instances'][0];
                    if (gridObj) {
                        gridObj.editSettings.allowAdding = false;
                    }
                }
            }
        }
    };
    DialogEdit.prototype.updateResourceCollection = function (args, resourceTreeGridId) {
        if (!isNullOrUndefined(args.data) && Object.keys(args.data).length) {
            var treeGridId = document.querySelector('#' + resourceTreeGridId);
            var resourceTreeGrid = treeGridId.ej2_instances[0];
            if (!isNullOrUndefined(resourceTreeGrid) && resourceTreeGrid.getSelectedRecords().length > 0) {
                var tempRecords = resourceTreeGrid.getSelectedRecords();
                var index = void 0;
                var selectedItems = [];
                for (index = 0; index < tempRecords.length; index++) {
                    var record = tempRecords[index];
                    if (!isNullOrUndefined(record.taskData) &&
                        !isNullOrUndefined(record.taskData[this.parent.resourceFields.unit]) &&
                        !isNullOrUndefined(args.data[this.parent.resourceFields.unit]) &&
                        (record.taskData[this.parent.resourceFields.id] === args.data[this.parent.resourceFields.id])) {
                        record.taskData[this.parent.resourceFields.unit] = args.data[this.parent.resourceFields.unit];
                    }
                    selectedItems.push(tempRecords[index].taskData);
                }
                this.ganttResources = extend([], selectedItems);
            }
            else {
                this.ganttResources = [];
            }
        }
        else {
            this.ganttResources = [];
        }
    };
    DialogEdit.prototype.renderResourceTab = function (itemName) {
        var _this = this;
        var ganttObj = this.parent;
        var resourceSettings = ganttObj.resourceFields;
        var ganttData = this.beforeOpenArgs.rowData;
        if (((this.beforeOpenArgs.requestType === 'beforeOpenEditDialog' && !isNullOrUndefined(this.editedRecord[this.parent.taskFields.resourceInfo])) || (this.beforeOpenArgs.requestType === 'beforeOpenAddDialog' && !isNullOrUndefined(this.editedRecord[this.parent.taskFields.resourceInfo]))) &&
            (typeof (this.editedRecord[this.parent.taskFields.resourceInfo]) === 'object')) {
            this.parent.setRecordValue('resourceInfo', this.parent.dataOperation.setResourceInfo(this.editedRecord), ganttData.ganttProperties, true);
        }
        var rowResource = ganttData.ganttProperties.resourceInfo;
        var inputModel = this.beforeOpenArgs[itemName];
        inputModel.enableAdaptiveUI = this.parent.enableAdaptiveUI;
        var resourceTreeGridId = ganttObj.element.id + '' + itemName + 'TabContainer';
        var resourceData = [];
        resourceData = extend([], [], ganttObj.resources, true);
        this.parent.dataOperation.updateResourceUnit(resourceData);
        if (!isNullOrUndefined(rowResource)) {
            var count = void 0;
            var rowResourceLength = rowResource.length;
            var index = void 0;
            var resourceDataLength = resourceData.length;
            for (count = 0; count < rowResourceLength; count++) {
                for (index = 0; index < resourceDataLength; index++) {
                    if (rowResource[count][resourceSettings.id] === resourceData[index][resourceSettings.id]) {
                        resourceData[index][resourceSettings.unit] = rowResource[count][resourceSettings.unit];
                    }
                }
            }
        }
        inputModel.dataSource = resourceData;
        var resourceInfo = ganttData.ganttProperties.resourceInfo;
        if (this.isEdit && !isNullOrUndefined(resourceInfo)) {
            for (var i = 0; i < resourceInfo.length; i++) {
                this.ganttResources.push(resourceInfo[i]);
            }
        }
        else if (!this.isEdit && !isNullOrUndefined(resourceInfo)) {
            for (var i = 0; i < resourceInfo.length; i++) {
                this.ganttResources.push(resourceInfo[i]);
            }
        }
        /* eslint-disable-next-line */
        inputModel.actionBegin = function (args) {
            if (args.rowData && args.columnName === _this.parent.resourceFields.unit && _this.editedRecord.ganttProperties.resourceInfo) {
                for (var i = 0; i < _this.editedRecord.ganttProperties.resourceInfo.length; i++) {
                    if (_this.editedRecord.ganttProperties.resourceInfo[i][_this.parent.resourceFields.id] ===
                        args.rowData[_this.parent.resourceFields.id]) {
                        _this.editedRecord.ganttProperties.resourceInfo[i][_this.parent.resourceFields.unit] = args.value;
                    }
                }
            }
        };
        inputModel.rowSelected = function (args) {
            _this.updateResourceCollection(args, resourceTreeGridId);
            _this.currentResources = _this.ganttResources;
        };
        inputModel.rowDeselected = function (args) {
            _this.updateResourceCollection(args, resourceTreeGridId);
            _this.currentResources = _this.ganttResources;
        };
        var divElement = this.createDivElement('e-resource-div', resourceTreeGridId);
        var tabIndex = this.getDialogTabIndex('Resources');
        var dialogField;
        if (!this.isEdit) {
            dialogField = this.parent.addDialogFields[tabIndex];
        }
        else if (this.isEdit) {
            dialogField = this.parent.editDialogFields[tabIndex];
        }
        var allProperty;
        /* eslint-disable-next-line */
        var columnCollection = [];
        var toolbars;
        if (!isNullOrUndefined(dialogField) && !isNullOrUndefined(dialogField.additionalParams)) {
            allProperty = (dialogField.additionalParams);
            for (var i in allProperty) {
                if (Object.prototype.hasOwnProperty.call(allProperty, i)) {
                    switch (i) {
                        case 'allowFiltering':
                            TreeGrid.Inject(TreeGridFilter);
                            break;
                        case 'allowSorting':
                            TreeGrid.Inject(TreeGridSort);
                            break;
                        case 'allowPaging':
                            TreeGrid.Inject(TreeGridPage);
                            break;
                        case 'editSettings':
                            TreeGrid.Inject(TreeGridEdit);
                            break;
                        case 'aggregates':
                            TreeGrid.Inject(TreeGridAggregate);
                            break;
                        case 'showColumnChooser':
                            TreeGrid.Inject(TreeGridAggregate);
                            break;
                        case 'showColumnMenu':
                            TreeGrid.Inject(ColumnMenu);
                            break;
                        case 'contextMenuItems':
                            TreeGrid.Inject(ContextMenu);
                            break;
                        case 'allowResizing':
                            TreeGrid.Inject(TreeGridResize);
                            break;
                        case 'allowReordering':
                            TreeGrid.Inject(TreeGridReorder);
                            break;
                        case 'detailTemplate':
                            TreeGrid.Inject(DetailRow);
                            break;
                        case 'allowRowDragAndDrop':
                            TreeGrid.Inject(TreeGridRowDD);
                            break;
                        case 'searchSettings':
                            TreeGrid.Inject(Search);
                            break;
                        case 'selectionSettings':
                            TreeGrid.Inject(TreeGridSelection);
                            break;
                        case 'toolbar':
                            toolbars = allProperty['toolbar'];
                            toolbars.map(function (item) {
                                switch (item) {
                                    case 'Search':
                                        TreeGrid.Inject(Search);
                                        break;
                                    case 'Print':
                                        TreeGrid.Inject(Print);
                                        break;
                                    case 'PdfExport':
                                        TreeGrid.Inject(PdfExport);
                                        break;
                                    case 'ExcelExport':
                                        TreeGrid.Inject(ExcelExport);
                                        break;
                                    default:
                                        break;
                                }
                            });
                            if (!isNullOrUndefined(toolbars)) {
                                inputModel.toolbar = [];
                                inputModel.toolbar = inputModel.toolbar.concat(toolbars);
                            }
                            TreeGrid.Inject(TreeGridToolbar);
                            break;
                        case 'enableVirtualization':
                            TreeGrid.Inject(VirtualScroll);
                            break;
                        case 'columns':
                            columnCollection = inputModel.columns;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        TreeGrid.Inject(TreeGridSelection, TreeGridFilter, TreeGridEdit, VirtualScroll, TreeGridToolbar);
        inputModel = __assign({}, inputModel, allProperty);
        var columnCollections = this.updateColumns(columnCollection, inputModel.columns);
        inputModel.columns = columnCollections;
        var isColumnMenu = false;
        if (inputModel.showColumnMenu) {
            isColumnMenu = inputModel.showColumnMenu;
            inputModel.showColumnMenu = false;
        }
        var treeGridObj = new TreeGrid(inputModel);
        var resourceColumn = this.parent.columnByField[this.parent.taskFields.resourceInfo];
        if (resourceColumn.allowEditing === false || resourceColumn.isPrimaryKey || this.parent.readOnly) {
            treeGridObj.allowSelection = false;
            treeGridObj.allowFiltering = false;
            treeGridObj.editSettings.allowEditing = false;
        }
        treeGridObj.dataBound = function () {
            if (isColumnMenu) {
                treeGridObj.showColumnMenu = true;
            }
            if (_this.parent.editDialogFields.length >= 1 && _this.parent.editDialogFields[0].type === 'Resources') {
                var id = _this.parent.element.id + 'ResourcesTabContainer';
                _this.resourceSelection(id);
            }
        };
        treeGridObj.appendTo(divElement);
        return divElement;
    };
    DialogEdit.prototype.resourceSelection = function (id) {
        var _this = this;
        var resourceTreeGrid = document.querySelector('#' + id).ej2_instances[0];
        this.parent['triggeredColumnName'] = '';
        var currentViewData = resourceTreeGrid.getCurrentViewRecords();
        var resources = this.ganttResources;
        if (resources && resources.length > 0) {
            currentViewData.forEach(function (data, index) {
                for (var i = 0; i < resources.length; i++) {
                    if (data.taskData[_this.parent.resourceFields.id] === resources[i][_this.parent.resourceFields.id] &&
                        !isNullOrUndefined(resourceTreeGrid.selectionModule) &&
                        resourceTreeGrid.getSelectedRowIndexes().indexOf(index) === -1) {
                        resourceTreeGrid.selectRow(index);
                    }
                }
            });
        }
    };
    DialogEdit.prototype.renderCustomTab = function (itemName, isCustomTab) {
        return this.renderGeneralTab(itemName, isCustomTab);
    };
    DialogEdit.prototype.renderNotesTab = function (itemName) {
        var ganttObj = this.parent;
        var inputModel = this.beforeOpenArgs[itemName];
        inputModel.enableHtmlSanitizer = this.parent.enableHtmlSanitizer;
        var ganttProp = this.editedRecord.ganttProperties;
        var divElement = this.createDivElement('', ganttObj.element.id + '' + itemName + 'TabContainer');
        var tabIndex = this.getDialogTabIndex('Notes');
        var dialogField;
        var toolbarCollection = [];
        if (!this.isEdit) {
            dialogField = this.parent.addDialogFields[tabIndex];
        }
        else if (this.isEdit) {
            dialogField = this.parent.editDialogFields[tabIndex];
        }
        var allProperty;
        if (!isNullOrUndefined(dialogField) && !isNullOrUndefined(dialogField.additionalParams)) {
            allProperty = dialogField.additionalParams;
            for (var i in allProperty) {
                if (Object.prototype.hasOwnProperty.call(allProperty, i)) {
                    switch (i) {
                        case 'toolbarSettings':
                            for (var j = 0; j < allProperty['toolbarSettings'].items.length; j++) {
                                /* eslint-disable-next-line */
                                var key = allProperty['toolbarSettings'].items[j];
                                if (key) {
                                    switch (key) {
                                        case 'Image':
                                            RichTextEditor.Inject(Image);
                                            break;
                                        case 'CreateTable':
                                            RichTextEditor.Inject(Table);
                                            break;
                                        case 'EmojiPicker':
                                            RichTextEditor.Inject(EmojiPicker);
                                            break;
                                        case 'FileManager':
                                            RichTextEditor.Inject(FileManager);
                                            break;
                                        case 'FormatPainter':
                                            RichTextEditor.Inject(FormatPainter);
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                            if (!isNullOrUndefined(allProperty['toolbarSettings'].items)) {
                                toolbarCollection = inputModel.toolbarSettings.items;
                            }
                            RichTextEditor.Inject(RTEToolbar);
                            break;
                        case 'editorMode':
                            RichTextEditor.Inject(MarkdownEditor);
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        RichTextEditor.Inject(RTEToolbar, Link, HtmlEditor, QuickToolbar, Count, Table);
        inputModel.value = ganttProp.notes;
        var notesColumn = this.parent.columnByField[this.parent.taskFields.notes];
        if (notesColumn.allowEditing === false || notesColumn.isPrimaryKey || this.parent.readOnly) {
            inputModel.enabled = false;
        }
        inputModel = __assign({}, inputModel, allProperty);
        inputModel.toolbarSettings.items = toolbarCollection.concat(inputModel.toolbarSettings.items);
        var rteObj = new RichTextEditor(inputModel);
        rteObj.appendTo(divElement);
        return divElement;
    };
    DialogEdit.prototype.renderInputElements = function (inputModel, column) {
        var _this = this;
        var ganttId = this.parent.element.id;
        var ganttData = this.editedRecord;
        var divElement = this.createDivElement('e-edit-form-column');
        var inputElement;
        var tr;
        var td;
        if (this.parent.enableAdaptiveUI) {
            tr = createElement('tr');
            td = createElement('td');
            divElement.style.width = '100%';
        }
        var editArgs = { column: column, data: ganttData };
        if (!isNullOrUndefined(column.edit) && isNullOrUndefined(column.edit.params)) {
            var create = column.edit.create;
            if (typeof create === 'string') {
                create = getObject(create, window);
                inputElement = create(editArgs);
            }
            else {
                inputElement = column.edit.create(editArgs);
            }
            inputElement.className = '';
            inputElement.setAttribute('type', 'text');
            inputElement.setAttribute('id', ganttId + '' + column.field);
            inputElement.setAttribute('name', column.field);
            inputElement.setAttribute('title', column.field);
            divElement.appendChild(inputElement);
        }
        else {
            inputElement = this.createInputElement('', ganttId + '' + column.field, column.field);
            divElement.appendChild(inputElement);
        }
        inputModel.enabled = !isNullOrUndefined(inputModel.enabled) ? inputModel.enabled : !this.isCheckIsDisabled(column);
        if (column.field === this.parent.taskFields.duration) {
            if (!isNullOrUndefined(column.valueAccessor)) {
                if (typeof column.valueAccessor === 'string') {
                    var valueAccessor = getObject(column.valueAccessor, window);
                    inputModel.value = valueAccessor(column.field, ganttData, column);
                }
                else {
                    inputModel.value = column.valueAccessor(column.field, ganttData, column);
                }
            }
            else if (isNullOrUndefined(column.edit)) {
                var ganttProp = ganttData.ganttProperties;
                inputModel.value = this.parent.dataOperation.getDurationString(ganttProp.duration, ganttProp.durationUnit);
            }
        }
        else {
            if (column.editType === 'booleanedit') {
                if (ganttData[column.field] === true) {
                    inputModel.checked = true;
                }
                else {
                    inputModel.checked = false;
                }
            }
            else {
                if (!this.parent.taskFields[column.field] && column.editType === 'numericedit' && (ganttData[column.field] === '' || ganttData[column.field] === 0)) {
                    inputModel.value = 0;
                }
                else {
                    inputModel.value = ganttData[column.field];
                }
            }
        }
        if (!isNullOrUndefined(column.edit) && isNullOrUndefined(column.edit.params)) {
            var write = column.edit.write;
            var inputObj = void 0;
            if (typeof write === 'string') {
                write = getObject(write, window);
                inputObj = write({
                    column: column, rowData: ganttData, element: inputElement
                });
            }
            else {
                inputObj = column.edit.write({
                    column: column, rowData: ganttData, element: inputElement
                });
            }
            if (column.field === this.parent.taskFields.duration) {
                inputObj.change = function (args) {
                    _this.validateScheduleFields(args, column, _this.parent);
                };
            }
        }
        else {
            var inputObj = new this.inputs[column.editType](inputModel);
            inputObj.appendTo(inputElement);
        }
        if (this.parent.enableAdaptiveUI) {
            td.appendChild(divElement);
            tr.appendChild(td);
            return tr;
        }
        else {
            return divElement;
        }
    };
    DialogEdit.prototype.taskNameCollection = function () {
        var flatData = this.parent.flatData;
        this.preTaskIds = [];
        this.preTableCollection = [];
        for (var i = 0; i < flatData.length; i++) {
            var data = flatData[i];
            if (this.parent.allowParentDependency) {
                var currentFlatData = data;
                if (data.parentUniqueID === this.beforeOpenArgs.rowData['uniqueID']) {
                    this.isValidData = false;
                }
                else {
                    do {
                        if (currentFlatData.parentItem) {
                            currentFlatData = this.parent.flatData[this.parent.ids.indexOf(currentFlatData.parentItem.taskId)];
                            if (currentFlatData.uniqueID === this.beforeOpenArgs.rowData['uniqueID']) {
                                this.isValidData = false;
                                break;
                            }
                        }
                    } while (currentFlatData.parentItem);
                }
                if (data.hasChildRecords && this.isValidData) {
                    this.isValidData = this.isParentValid(data.childRecords);
                }
                if (!this.isValidData) {
                    this.isValidData = true;
                    continue;
                }
            }
            else {
                if (data.hasChildRecords) {
                    continue;
                }
            }
            var taskId = this.parent.viewType === 'ResourceView' ? data.ganttProperties.taskId.toString()
                : data.ganttProperties.rowUniqueID.toString();
            var tempObject = {
                id: taskId,
                text: (taskId + '-' + data.ganttProperties.taskName),
                value: taskId
            };
            this.preTaskIds.push(tempObject.id);
            this.preTableCollection.push(tempObject);
        }
    };
    DialogEdit.prototype.predecessorEditCollection = function (ganttData) {
        var preDataCollection = [];
        var ganttProp = ganttData.ganttProperties;
        if (this.isEdit && !isNullOrUndefined(this.parent.taskFields.dependency) && !isNullOrUndefined(ganttData) &&
            !isNullOrUndefined(ganttProp.predecessor)) {
            var predecessor = ganttProp.predecessor;
            var idCollection = this.preTableCollection;
            for (var i = 0; i < predecessor.length; i++) {
                var from = predecessor[i].from.toString();
                var preData = {};
                var taskID = this.parent.viewType === 'ResourceView' ? ganttProp.taskId : ganttProp.rowUniqueID;
                if (taskID.toString() !== from) {
                    preData.id = from;
                    for (var index = 0; index < idCollection.length; index++) {
                        if (idCollection[index].value === from) {
                            preData.name = idCollection[index].text;
                            break;
                        }
                    }
                    preData.type = predecessor[i].type;
                    var offset = predecessor[i].offset;
                    var offsetUnit = predecessor[i].offsetUnit;
                    preData.offset = this.parent.dataOperation.getDurationString(offset, offsetUnit);
                    preData.uniqueId = getUid();
                    preDataCollection.push(preData);
                }
            }
        }
        return preDataCollection;
    };
    DialogEdit.prototype.updatePredecessorDropDownData = function (ganttData) {
        var index = -1;
        var id = this.parent.viewType === 'ResourceView' ? ganttData.ganttProperties.taskId.toString()
            : ganttData.ganttProperties.rowUniqueID.toString();
        index = this.preTaskIds.indexOf(id);
        this.preTableCollection.splice(index, 1);
        this.preTaskIds.splice(index, 1);
        this.validSuccessorTasks(ganttData, this.preTaskIds, this.preTableCollection);
    };
    DialogEdit.prototype.validSuccessorTasks = function (data, ids, idCollection) {
        var _this = this;
        var ganttProp = data.ganttProperties;
        if (ganttProp.predecessor && ganttProp.predecessor.length > 0) {
            var predecessor = ganttProp.predecessor;
            var fromId_1 = this.parent.viewType === 'ResourceView' ? ganttProp.taskId.toString() : ganttProp.rowUniqueID.toString();
            predecessor.forEach(function (item) {
                if (item.from.toString() === fromId_1) {
                    var toId = item.to;
                    var idIndex = -1;
                    idIndex = ids.indexOf(toId);
                    if (idIndex > -1) {
                        ids.splice(idIndex, 1);
                        idCollection.splice(idIndex, 1);
                    }
                    var ganttData = _this.parent.connectorLineModule.getRecordByID(toId);
                    var isIdInclude = true;
                    for (var _i = 0, _a = _this.processedId; _i < _a.length; _i++) {
                        var item_1 = _a[_i];
                        if (item_1.id === ganttData.ganttProperties.taskId) {
                            if (Array.isArray(item_1.value) && Array.isArray(ganttData.ganttProperties.predecessor)) {
                                if (item_1.value.length === ganttData.ganttProperties.predecessor.length) {
                                    var arraysMatch = true;
                                    for (var i = 0; i < item_1.value.length; i++) {
                                        if (item_1.value[i] !== ganttData.ganttProperties.predecessor[i]) {
                                            arraysMatch = false;
                                            break;
                                        }
                                    }
                                    if (arraysMatch) {
                                        isIdInclude = false;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (isIdInclude) {
                        _this.processedId.push({ id: ganttData.ganttProperties.taskId, value: ganttData.ganttProperties.predecessor });
                        _this.validSuccessorTasks(ganttData, ids, idCollection);
                    }
                }
            });
        }
    };
    DialogEdit.prototype.getPredecessorType = function () {
        var typeText = [this.parent.getPredecessorTextValue('SS'), this.parent.getPredecessorTextValue('SF'),
            this.parent.getPredecessorTextValue('FS'), this.parent.getPredecessorTextValue('FF')];
        var types = [
            { id: 'FS', text: typeText[2], value: typeText[2] },
            { id: 'FF', text: typeText[3], value: typeText[3] },
            { id: 'SS', text: typeText[0], value: typeText[0] },
            { id: 'SF', text: typeText[1], value: typeText[1] }
        ];
        return types;
    };
    DialogEdit.prototype.initiateDialogSave = function () {
        if (this.isEdit) {
            this.parent.initiateEditAction(true);
        }
        else {
            this.addedRecord = {};
        }
        if (this.currentResources) {
            this.currentResources = null;
        }
        if (this.parent.undoRedoModule && this.parent['isUndoRedoItemPresent']('Edit')) {
            if (this.parent.undoRedoModule['redoEnabled']) {
                this.parent.undoRedoModule['disableRedo']();
            }
            if (this.isEdit) {
                this.parent.undoRedoModule['createUndoCollection']();
                var action = {};
                action['action'] = 'DialogEdit';
                action['modifiedRecords'] = [];
                this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = action;
                if (this.parent.viewType === 'ResourceView') {
                    var isValid = false;
                    if (!this.rowData.ganttProperties.resourceInfo) {
                        if (this.ganttResources.length > 0) {
                            isValid = true;
                        }
                    }
                    else if (this.ganttResources.length !== this.rowData.ganttProperties.resourceInfo.length) {
                        isValid = true;
                    }
                    else {
                        for (var i = 0; i < this.rowData.ganttProperties.resourceInfo.length; i++) {
                            if (this.ganttResources[i][this.parent.resourceFields.id] !==
                                this.rowData.ganttProperties.resourceInfo[i][this.parent.resourceFields.id]) {
                                isValid = true;
                                break;
                            }
                        }
                    }
                    if (isValid) {
                        var indexes = {};
                        indexes['deletedIndexes'] = [];
                        var id_1 = 'T' + this.rowData.ganttProperties.taskId;
                        var rowItems_1 = [];
                        this.parent.taskIds.reduce(function (e, i) {
                            if (i === id_1) {
                                if (this.ganttResources.length === 0) {
                                    rowItems_1.push(this.parent.flatData[this.parent.taskIds.indexOf(i)]);
                                }
                                else {
                                    var parent_1 = this.parent.getTaskByUniqueID(this.parent.flatData[this.parent.taskIds.indexOf(i)].parentUniqueID);
                                    for (var j = 0; j < this.ganttResources.length; j++) {
                                        if (parent_1.ganttProperties.taskId !==
                                            this.ganttResources[j][this.parent.resourceFields.id] &&
                                            rowItems_1.indexOf(this.parent.flatData[this.parent.taskIds.indexOf(i)]) === -1) {
                                            rowItems_1.push(this.parent.flatData[this.parent.taskIds.indexOf(i)]);
                                        }
                                    }
                                }
                            }
                        }.bind(this), []);
                        this.parent.undoRedoModule['findPosition'](extend([], [], rowItems_1, true), indexes, 'deletedIndexes');
                        if (this['indexes']) {
                            this['indexes']['deletedIndexes'][this['indexes']['deletedIndexes'].length] = indexes['deletedIndexes'][0];
                        }
                        else {
                            this['indexes'] = indexes;
                        }
                    }
                }
            }
        }
        this.parent['updateDuration'] = true;
        var ganttObj = this.parent;
        var tabModel = this.beforeOpenArgs.tabModel;
        var items = tabModel.items;
        for (var i = 0; i < items.length; i++) {
            var element = items[i].content;
            var id = element.getAttribute('id');
            if (!isNullOrUndefined(id) || id !== '') {
                id = id.replace(ganttObj.element.id, '');
                id = id.replace('TabContainer', '');
                if (id === 'General') {
                    this.updateGeneralTab(element, false);
                }
                else if (id === 'Dependency') {
                    this.isFromDialogPredecessor = true;
                    this.updatePredecessorTab(element);
                    this.isFromDialogPredecessor = false;
                }
                else if (id === 'Notes') {
                    this.updateNotesTab(element);
                }
                else if (id === 'Resources') {
                    this.updateResourceTab(element);
                    this.dialogEditValidationFlag = false;
                }
                else if (id.indexOf('Custom') !== -1) {
                    this.updateCustomTab(element);
                }
                else if (id === 'Segments') {
                    this.updateSegmentsData(element);
                }
            }
        }
        if (!this.disableUndo && this.parent.undoRedoModule) {
            this.parent.undoRedoModule['getUndoCollection'].splice(this.parent.undoRedoModule['getUndoCollection'].length - 1, 1);
            if (this.parent.toolbarModule && this.parent.undoRedoModule['getUndoCollection'].length === 0) {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], false);
            }
            this.parent['totalUndoAction']--;
        }
        if (this.isEdit) {
            /**
             * If any update on edited task do it here
             */
            this.parent.editModule['editedRecord'] = this.rowData;
            this.parent.dataOperation.updateWidthLeft(this.rowData);
            var editArgs = {
                data: this.rowData,
                action: 'DialogEditing'
            };
            this.parent.editModule.initiateUpdateAction(editArgs);
        }
        else {
            this.parent.editModule['editedRecord'] = this.addedRecord;
            if (this.parent.viewType === 'ResourceView') {
                var newRecords = extend({}, this.addedRecord, true);
                if (newRecords[this.parent.taskFields.resourceInfo].length) {
                    for (var i = 0; i < newRecords[this.parent.taskFields.resourceInfo].length; i++) {
                        var id = newRecords[this.parent.taskFields.resourceInfo][i].toString();
                        var parentRecordIndex = this.parent.getTaskIds().indexOf('R' + id.toString());
                        if (parentRecordIndex !== -1) {
                            this.parent.editModule.addRecord(this.addedRecord, 'Child', parentRecordIndex);
                            break;
                        }
                    }
                }
                else {
                    this.parent.editModule.addRecord(this.addedRecord, 'Bottom');
                }
            }
            else {
                this.parent.editModule.addRecord(this.addedRecord, this.parent.editSettings.newRowPosition, this.parent.selectedRowIndex);
            }
        }
        return true;
    };
    DialogEdit.prototype.compareObjects = function (prevSegments, currentSegments) {
        if (!isNullOrUndefined(prevSegments)) {
            return prevSegments.every(function (obj1, index) {
                var obj2 = currentSegments[index];
                var key = Object.keys(obj1);
                for (var i = 0; i < key.length; i++) {
                    if (key[i] === 'startDate' || key[i] === 'endDate') {
                        if (obj1[key[i]].getTime() !== obj2[key[i]].getTime()) {
                            return true;
                        }
                    }
                    else if (key[i] === 'duration' && obj1[key[i]] !== obj2[key[i]]) {
                        return true;
                    }
                }
                return false;
            });
        }
        return false;
    };
    DialogEdit.prototype.updateSegmentTaskData = function (dataSource) {
        var taskSettings = this.parent.taskFields;
        if (!this.isEdit) {
            this.addedRecord[taskSettings.segments] = dataSource;
        }
        else {
            var prevSegments = this.rowData.ganttProperties.segments;
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.segments, dataSource, this.rowData);
            var currentSegments = this.parent.dataOperation.setSegmentsInfo(this.rowData, true);
            if (this.parent.enableUndoRedo && (prevSegments && currentSegments && (prevSegments.length !== currentSegments.length)) ||
                (!prevSegments && currentSegments) || ((prevSegments && !currentSegments)) ||
                this.compareObjects(prevSegments, currentSegments)) {
                this.disableUndo = true;
            }
            this.parent.setRecordValue('segments', currentSegments, this.rowData.ganttProperties, true);
            this.parent.setRecordValue('segments', this.parent.dataOperation.setSegmentsInfo(this.rowData, false), this.rowData.ganttProperties, true);
            if (dataSource.length <= 0) {
                this.validateDuration(this.rowData);
            }
        }
    };
    DialogEdit.prototype.updateSegmentsData = function (segmentForm) {
        var gridObj = segmentForm.ej2_instances[0];
        var isEdit = gridObj.isEdit;
        var dataSource;
        if (gridObj.isEdit) {
            gridObj.endEdit();
        }
        if (isEdit && gridObj.currentViewData.length !== gridObj.dataSource['length']) {
            dataSource = gridObj.dataSource;
        }
        else {
            dataSource = gridObj.currentViewData;
        }
        this.updateSegmentTaskData(dataSource);
    };
    DialogEdit.prototype.updateGeneralTab = function (generalForm, isCustom) {
        var ganttObj = this.parent;
        var childNodes = generalForm.childNodes;
        var tasksData = {};
        if (!this.isEdit) {
            tasksData = this.addedRecord;
        }
        for (var i = 0; i < childNodes.length; i++) {
            var div = childNodes[i];
            var inputElement = div.querySelector('input[id^="' + ganttObj.element.id + '"]') || div.querySelector('textarea[id^="' + ganttObj.element.id + '"]');
            if (inputElement) {
                var fieldName = inputElement.id.replace(ganttObj.element.id, '');
                var controlObj = div.querySelector('#' + ganttObj.element.id + fieldName).ej2_instances[0];
                if (this.parent.columnByField[this.parent.taskFields.id].editType === 'stringedit' && fieldName === this.parent.taskFields.id) {
                    var valueString = controlObj.value.toString();
                    controlObj.value = valueString;
                }
                var column = ganttObj.columnByField[fieldName];
                if (fieldName === this.parent.taskFields.duration ?
                    parseInt(this.rowData[fieldName], 10) !== parseInt(controlObj.value, 10) :
                    this.rowData[fieldName] !== controlObj.value) {
                    this.disableUndo = true;
                }
                if (!isNullOrUndefined(column) && !isNullOrUndefined(column.edit) && isNullOrUndefined(column.edit.params)) {
                    var read = column.edit.read;
                    if (typeof read === 'string') {
                        read = getObject(read, window);
                        tasksData[fieldName] = read(inputElement, controlObj.value);
                    }
                    else {
                        tasksData[fieldName] = column.edit.read(inputElement, controlObj.value);
                    }
                }
                else if (!isNullOrUndefined(column) && column.editType === 'booleanedit') {
                    if (inputElement instanceof HTMLInputElement && inputElement.checked === true) {
                        tasksData[fieldName] = true;
                    }
                    else {
                        tasksData[fieldName] = false;
                    }
                }
                else {
                    if (fieldName === this.parent.taskFields.duration) {
                        var numericValue = parseFloat(String(controlObj.value));
                        tasksData[fieldName] = numericValue;
                    }
                    else {
                        if (this.parent.weekWorkingTime.length > 0 && controlObj.value && (fieldName === this.parent.taskFields.startDate ||
                            fieldName === this.parent.taskFields.baselineStartDate)) {
                            var sDate = fieldName === this.parent.taskFields.startDate ? this.beforeOpenArgs.rowData['ganttProperties'].startDate : this.beforeOpenArgs.rowData['ganttProperties'].baselineStartDate;
                            var prevDay = this.parent['getStartTime'](sDate);
                            if (prevDay / 3600 === sDate.getHours()) {
                                var dayStartTime = this.parent['getStartTime'](controlObj.value);
                                this.parent.dataOperation.setTime(dayStartTime, controlObj.value);
                                tasksData[fieldName] = controlObj.value;
                            }
                            else {
                                tasksData[fieldName] = controlObj.value;
                            }
                        }
                        else {
                            tasksData[fieldName] = controlObj.value;
                        }
                    }
                    if (this.parent.enableHtmlSanitizer && typeof (controlObj.value) === 'string') {
                        controlObj.value = SanitizeHtmlHelper.sanitize(controlObj.value);
                        tasksData[fieldName] = controlObj.value;
                    }
                }
            }
        }
        if (this.isEdit) {
            if (!isCustom) {
                this.updateScheduleProperties(this.editedRecord, this.rowData);
            }
            ganttObj.editModule.validateUpdateValues(tasksData, this.rowData, true);
        }
    };
    DialogEdit.prototype.updateScheduleProperties = function (fromRecord, toRecord) {
        this.parent.setRecordValue('startDate', fromRecord.ganttProperties.startDate, toRecord.ganttProperties, true);
        this.parent.setRecordValue('endDate', fromRecord.ganttProperties.endDate, toRecord.ganttProperties, true);
        this.parent.setRecordValue('duration', fromRecord.ganttProperties.duration, toRecord.ganttProperties, true);
        this.parent.setRecordValue('durationUnit', fromRecord.ganttProperties.durationUnit, toRecord.ganttProperties, true);
        this.parent.setRecordValue('work', fromRecord.ganttProperties.work, toRecord.ganttProperties, true);
        this.parent.setRecordValue('type', fromRecord.ganttProperties.taskType, toRecord.ganttProperties, true);
        this.parent.setRecordValue('taskType', fromRecord.ganttProperties.taskType, toRecord.ganttProperties, true);
        this.parent.setRecordValue('resourceNames', fromRecord.ganttProperties.resourceNames, toRecord.ganttProperties, true);
        this.parent.setRecordValue('resourceInfo', fromRecord.ganttProperties.resourceInfo, toRecord.ganttProperties, true);
        if (!isNullOrUndefined(this.parent.taskFields.startDate)) {
            this.parent.dataOperation.updateMappingData(toRecord, 'startDate');
        }
        if (!isNullOrUndefined(this.parent.taskFields.endDate)) {
            this.parent.dataOperation.updateMappingData(toRecord, 'endDate');
        }
        if (!isNullOrUndefined(this.parent.taskFields.duration)) {
            this.parent.dataOperation.updateMappingData(toRecord, 'duration');
            this.parent.setRecordValue('durationUnit', fromRecord.ganttProperties.durationUnit, this.rowData, true);
            if (this.rowData.ganttProperties.duration === 0) {
                this.parent.setRecordValue('isMilestone', true, toRecord.ganttProperties, true);
            }
            else {
                this.parent.setRecordValue('isMilestone', false, this.rowData.ganttProperties, true);
            }
        }
        if (!isNullOrUndefined(this.parent.taskFields.work)) {
            this.parent.dataOperation.updateMappingData(this.rowData, 'work');
        }
        if (!isNullOrUndefined(this.parent.taskFields.manual)) {
            this.parent.dataOperation.updateMappingData(this.rowData, 'manual');
        }
        if (!isNullOrUndefined(this.parent.taskFields.type)) {
            this.parent.dataOperation.updateMappingData(this.rowData, 'type');
        }
        if (!isNullOrUndefined(this.parent.taskFields.resourceInfo)) {
            this.parent.dataOperation.updateMappingData(this.rowData, 'resourceInfo');
        }
    };
    DialogEdit.prototype.getMatchingPrefix = function (preData, idArray) {
        var parts = preData.name.split('-');
        var current = '';
        for (var i = 0; i < parts.length; i++) {
            current = current === '' ? parts[i] : current + '-' + parts[i];
            if (idArray.indexOf(current) !== -1) {
                return [current];
            }
        }
        return [];
    };
    DialogEdit.prototype.updatePredecessorTab = function (preElement) {
        var gridObj = preElement.ej2_instances[0];
        if (gridObj.isEdit) {
            gridObj.endEdit();
        }
        var dataSource = gridObj.dataSource;
        var predecessorName = [];
        var newValues = [];
        var predecessorString = '';
        var ids = [];
        var parentRecord = [];
        for (var i = 0; i < dataSource.length; i++) {
            var preData = dataSource[i];
            var splitString = this.getMatchingPrefix(preData, this.parent.ids);
            if (isNullOrUndefined(preData.id) || (preData.id !== splitString[0] && !isNullOrUndefined(splitString[0]))) {
                preData.id = splitString[0];
            }
            if (ids.indexOf(preData.id) === -1) {
                if (this.parent.viewType === 'ProjectView') {
                    var currentRecord = this.parent.flatData[(this.parent.ids.indexOf(preData.id))];
                    if (currentRecord.hasChildRecords && parentRecord.indexOf(currentRecord) === -1) {
                        parentRecord.push(currentRecord);
                    }
                }
                var name_1 = preData.id + preData.type;
                if (preData.offset && preData.offset.indexOf('-') !== -1) {
                    name_1 += preData.offset;
                }
                else {
                    name_1 += ('+' + preData.offset);
                }
                predecessorName.push(name_1);
                ids.push(preData.id);
            }
        }
        if (this.isEdit) {
            if (predecessorName.length > 0) {
                newValues = this.parent.predecessorModule.calculatePredecessor(predecessorName.join(','), this.rowData);
                this.parent.setRecordValue('predecessor', newValues, this.rowData.ganttProperties, true);
                predecessorString = this.parent.predecessorModule.getPredecessorStringValue(this.rowData);
            }
            else {
                newValues = [];
                this.parent.setRecordValue('predecessor', newValues, this.rowData.ganttProperties, true);
                predecessorString = '';
            }
            if (this.parent.undoRedoModule && this.parent.undoRedoModule['getUndoCollection'].length > 0) {
                this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1]['connectedRecords'] = parentRecord;
                if (predecessorString !== '' || (!isNullOrUndefined(this.rowData.ganttProperties.predecessorsName) && this.rowData.ganttProperties.predecessorsName !== predecessorString) && !this.disableUndo) {
                    this.disableUndo = true;
                }
            }
            this.parent.setRecordValue('predecessorsName', predecessorString, this.rowData.ganttProperties, true);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, predecessorString, this.rowData);
            this.parent.setRecordValue(this.parent.taskFields.dependency, predecessorString, this.rowData);
            this.parent.predecessorModule.updateUnscheduledDependency(this.rowData);
        }
        else {
            this.addedRecord[this.parent.taskFields.dependency] = predecessorName.length > 0 ? predecessorName.join(',') : '';
        }
    };
    DialogEdit.prototype.updateResourceTab = function (resourceElement) {
        var _this = this;
        var treeGridObj = resourceElement.ej2_instances[0];
        if (treeGridObj) {
            treeGridObj.grid.endEdit();
        }
        var selectedItems = this.ganttResources;
        selectedItems.forEach(function (item) {
            if (item[_this.parent.resourceFields.unit] === null) {
                item[_this.parent.resourceFields.unit] = 0;
            }
        });
        if (this.parent.viewType === 'ResourceView' && !isNullOrUndefined(this.rowData.ganttProperties)) {
            if (JSON.stringify(this.ganttResources) !== JSON.stringify(this.rowData.ganttProperties.resourceInfo)) {
                this.isResourceUpdate = true;
                this.previousResource = !isNullOrUndefined(this.rowData.ganttProperties.resourceInfo) ? this.rowData.ganttProperties.resourceInfo.slice() : [];
            }
            else {
                this.isResourceUpdate = false;
            }
        }
        var idArray = [];
        if (this.isEdit) {
            if ((this.rowData.ganttProperties.resourceInfo && selectedItems.length !== this.rowData.ganttProperties.resourceInfo.length) ||
                (isNullOrUndefined(this.rowData.ganttProperties.resourceInfo) && selectedItems.length > 0)) {
                this.disableUndo = true;
            }
            if (!this.disableUndo) {
                for (var i = 0; i < selectedItems.length; i++) {
                    if (JSON.stringify(selectedItems[i]) !==
                        JSON.stringify(this.rowData.ganttProperties.resourceInfo[i])) {
                        this.disableUndo = true;
                        break;
                    }
                }
            }
            this.parent.setRecordValue('resourceInfo', selectedItems, this.editedRecord.ganttProperties, true);
            this.parent.dataOperation.updateMappingData(this.editedRecord, 'resourceInfo');
            this.parent.editModule.updateResourceRelatedFields(this.editedRecord, 'resource');
            this.validateDuration(this.editedRecord);
            this.updateScheduleProperties(this.editedRecord, this.rowData);
        }
        else {
            for (var i = 0; i < selectedItems.length; i++) {
                idArray.push(selectedItems[i][this.parent.resourceFields.id]);
                this.isAddNewResource = true;
            }
            this.addedRecord[this.parent.taskFields.resourceInfo] = idArray;
        }
    };
    DialogEdit.prototype.updateNotesTab = function (notesElement) {
        var ganttObj = this.parent;
        var rte = notesElement.ej2_instances[0];
        if (this.isEdit) {
            if (!ganttObj.columnByField[ganttObj.taskFields.notes].disableHtmlEncode) {
                if (this.rowData.ganttProperties.notes !== rte.getHtml() && (this.rowData.ganttProperties.notes !== null || rte.getHtml() !== '<p><br></p>') && !this.disableUndo) {
                    this.disableUndo = true;
                }
                this.parent.setRecordValue('notes', rte.getHtml(), this.rowData.ganttProperties, true);
            }
            else {
                if (this.rowData.ganttProperties.notes !== rte.getText() && (this.rowData.ganttProperties.notes !== null || rte.getText() !== '') && !this.disableUndo) {
                    this.disableUndo = true;
                }
                if (rte.getHtml().includes('href')) {
                    this.parent.setRecordValue('notes', rte.getHtml(), this.rowData.ganttProperties, true);
                }
                else {
                    this.parent.setRecordValue('notes', rte.getText(), this.rowData.ganttProperties, true);
                }
            }
            ganttObj.dataOperation.updateMappingData(this.rowData, 'notes');
        }
        else {
            if (!ganttObj.columnByField[ganttObj.taskFields.notes].disableHtmlEncode) {
                this.addedRecord[this.parent.taskFields.notes] = rte.getHtml();
            }
            else {
                this.addedRecord[this.parent.taskFields.notes] = rte.getText();
            }
        }
    };
    DialogEdit.prototype.updateCustomTab = function (customElement) {
        this.updateGeneralTab(customElement, true);
    };
    return DialogEdit;
}());
export { DialogEdit };
