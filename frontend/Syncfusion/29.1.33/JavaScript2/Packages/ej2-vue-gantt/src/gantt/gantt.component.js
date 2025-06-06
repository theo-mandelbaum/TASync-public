import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { isUndefined } from '@syncfusion/ej2-base';
import { Gantt } from '@syncfusion/ej2-gantt';
import { ColumnsDirective, ColumnDirective, ColumnsPlugin, ColumnPlugin } from './columns.directive';
import { AddDialogFieldsDirective, AddDialogFieldDirective, AddDialogFieldsPlugin, AddDialogFieldPlugin } from './adddialogfields.directive';
import { EditDialogFieldsDirective, EditDialogFieldDirective, EditDialogFieldsPlugin, EditDialogFieldPlugin } from './editdialogfields.directive';
import { DayWorkingTimeCollectionDirective, DayWorkingTimeDirective, DayWorkingTimeCollectionPlugin, DayWorkingTimePlugin } from './dayworkingtime.directive';
import { WeekWorkingTimesDirective, WeekWorkingTimeDirective, WeekWorkingTimesPlugin, WeekWorkingTimePlugin } from './weekworkingtime.directive';
import { HolidaysDirective, HolidayDirective, HolidaysPlugin, HolidayPlugin } from './holidays.directive';
import { EventMarkersDirective, EventMarkerDirective, EventMarkersPlugin, EventMarkerPlugin } from './eventmarkers.directive';
export var properties = ['isLazyUpdate', 'plugins', 'UpdateOffsetOnTaskbarEdit', 'addDialogFields', 'allowExcelExport', 'allowFiltering', 'allowKeyboard', 'allowParentDependency', 'allowPdfExport', 'allowReordering', 'allowResizing', 'allowRowDragAndDrop', 'allowSelection', 'allowSorting', 'allowTaskbarDragAndDrop', 'allowTaskbarOverlap', 'allowUnscheduledTasks', 'autoCalculateDateScheduling', 'autoFocusTasks', 'baselineColor', 'collapseAllParentTasks', 'columnMenuItems', 'columns', 'connectorLineBackground', 'connectorLineWidth', 'contextMenuItems', 'dataSource', 'dateFormat', 'dayWorkingTime', 'disableHtmlEncode', 'durationUnit', 'editDialogFields', 'editSettings', 'enableAdaptiveUI', 'enableContextMenu', 'enableCriticalPath', 'enableHtmlSanitizer', 'enableImmutableMode', 'enableMultiTaskbar', 'enablePersistence', 'enablePredecessorValidation', 'enableRtl', 'enableTimelineVirtualization', 'enableUndoRedo', 'enableVirtualMaskRow', 'enableVirtualization', 'eventMarkers', 'filterSettings', 'gridLines', 'height', 'highlightWeekends', 'holidays', 'includeWeekend', 'labelSettings', 'loadChildOnDemand', 'loadingIndicator', 'locale', 'milestoneTemplate', 'parentTaskbarTemplate', 'projectEndDate', 'projectStartDate', 'query', 'readOnly', 'renderBaseline', 'resourceFields', 'resourceIDMapping', 'resourceNameMapping', 'resources', 'rowHeight', 'searchSettings', 'segmentData', 'selectedRowIndex', 'selectionSettings', 'showColumnMenu', 'showInlineNotes', 'showOverAllocation', 'sortSettings', 'splitterSettings', 'taskFields', 'taskMode', 'taskType', 'taskbarHeight', 'taskbarTemplate', 'timelineSettings', 'timelineTemplate', 'timezone', 'toolbar', 'tooltipSettings', 'treeColumnIndex', 'undoRedoActions', 'undoRedoStepsCount', 'updateOffsetOnTaskbarEdit', 'validateManualTasksOnLinking', 'viewType', 'weekWorkingTime', 'width', 'workUnit', 'workWeek', 'zoomingLevels', 'actionBegin', 'actionComplete', 'actionFailure', 'beforeExcelExport', 'beforePdfExport', 'beforeTooltipRender', 'cellDeselected', 'cellDeselecting', 'cellEdit', 'cellSelected', 'cellSelecting', 'collapsed', 'collapsing', 'columnDrag', 'columnDragStart', 'columnDrop', 'columnMenuClick', 'columnMenuOpen', 'contextMenuClick', 'contextMenuOpen', 'created', 'dataBound', 'dataStateChange', 'destroyed', 'endEdit', 'excelExportComplete', 'excelHeaderQueryCellInfo', 'excelQueryCellInfo', 'expanded', 'expanding', 'headerCellInfo', 'load', 'onMouseMove', 'onTaskbarClick', 'pdfColumnHeaderQueryCellInfo', 'pdfExportComplete', 'pdfQueryCellInfo', 'pdfQueryTaskbarInfo', 'pdfQueryTimelineCellInfo', 'queryCellInfo', 'queryTaskbarInfo', 'recordDoubleClick', 'resizeStart', 'resizeStop', 'resizing', 'rowDataBound', 'rowDeselected', 'rowDeselecting', 'rowDrag', 'rowDragStart', 'rowDragStartHelper', 'rowDrop', 'rowSelected', 'rowSelecting', 'splitterResizeStart', 'splitterResized', 'splitterResizing', 'taskbarEdited', 'taskbarEditing', 'toolbarClick'];
export var modelProps = ['dataSource'];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * `ejs-gantt` represents the VueJS Gantt Component.
 * ```vue
 * <ejs-gantt :dataSource='data' allowSelection='true' allowSorting='true'></ejs-gantt>
 * ```
 */
export var GanttComponent = vueDefineComponent({
    name: 'GanttComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Gantt({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-columns": "e-column", "e-add-dialog-fields": "e-add-dialog-field", "e-edit-dialog-fields": "e-edit-dialog-field", "e-day-working-time-collection": "e-day-working-time", "e-week-working-times": "e-week-working-time", "e-holidays": "e-holidays", "e-event-markers": "e-event-marker" },
            tagNameMapper: { "e-add-dialog-fields": "e-addDialogFields", "e-edit-dialog-fields": "e-editDialogFields", "e-day-working-time-collection": "e-dayWorkingTime", "e-week-working-times": "e-weekWorkingTime", "e-event-markers": "e-eventMarkers" },
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;
        this.bindProperties();
        this.ej2Instances._setProperties = this.ej2Instances.setProperties;
        this.ej2Instances.setProperties = this.setProperties;
        this.ej2Instances.clearTemplate = this.clearTemplate;
        this.updated = this.updated;
    },
    render: function (createElement) {
        var h = !isExecute ? gh : createElement;
        var slots = null;
        if (!isNullOrUndefined(this.$slots.default)) {
            slots = !isExecute ? this.$slots.default() : this.$slots.default;
        }
        return h('div', slots);
    },
    methods: {
        clearTemplate: function (templateNames) {
            if (!templateNames) {
                templateNames = Object.keys(this.templateCollection || {});
            }
            if (templateNames.length && this.templateCollection) {
                for (var _i = 0, templateNames_1 = templateNames; _i < templateNames_1.length; _i++) {
                    var tempName = templateNames_1[_i];
                    var elementCollection = this.templateCollection[tempName];
                    if (elementCollection && elementCollection.length) {
                        for (var _a = 0, elementCollection_1 = elementCollection; _a < elementCollection_1.length; _a++) {
                            var ele = elementCollection_1[_a];
                            this.destroyPortals(ele);
                        }
                        delete this.templateCollection[tempName];
                    }
                }
            }
        },
        setProperties: function (prop, muteOnChange) {
            var _this = this;
            if (this.isVue3) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if (this.ej2Instances && this.ej2Instances._setProperties) {
                this.ej2Instances._setProperties(prop, muteOnChange);
            }
            if (prop && this.models && this.models.length) {
                Object.keys(prop).map(function (key) {
                    _this.models.map(function (model) {
                        if ((key === model) && !(/datasource/i.test(key))) {
                            if (_this.isVue3) {
                                _this.ej2Instances.vueInstance.$emit('update:' + key, prop[key]);
                            }
                            else {
                                _this.$emit('update:' + key, prop[key]);
                                _this.$emit('modelchanged', prop[key]);
                            }
                        }
                    });
                });
            }
        },
        trigger: function (eventName, eventProp, successHandler) {
            if (!isExecute) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/checked|value/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('update:modelValue', eventProp[propKey]);
                    }
                    else {
                        if (eventName === 'change' || (this.$props && !this.$props.isLazyUpdate)) {
                            this.$emit('update:' + propKey, eventProp[propKey]);
                            this.$emit('modelchanged', eventProp[propKey]);
                        }
                    }
                }
            }
            else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/currentView|selectedDate/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                    }
                    else {
                        this.$emit('update:' + propKey, eventProp[propKey]);
                        this.$emit('modelchanged', eventProp[propKey]);
                    }
                }
            }
            if ((this.ej2Instances && this.ej2Instances._trigger)) {
                this.ej2Instances._trigger(eventName, eventProp, successHandler);
            }
        },
        custom: function () {
            this.updated();
        },
        addPredecessor: function (id, predecessorString) {
            return this.ej2Instances.addPredecessor(id, predecessorString);
        },
        addRecord: function (data, rowPosition, rowIndex) {
            return this.ej2Instances.addRecord(data, rowPosition, rowIndex);
        },
        cancelEdit: function () {
            return this.ej2Instances.cancelEdit();
        },
        changeTaskMode: function (data) {
            return this.ej2Instances.changeTaskMode(data);
        },
        clearFiltering: function (fields) {
            return this.ej2Instances.clearFiltering(fields);
        },
        clearRedoCollection: function () {
            return this.ej2Instances.clearRedoCollection();
        },
        clearSelection: function () {
            return this.ej2Instances.clearSelection();
        },
        clearSorting: function () {
            return this.ej2Instances.clearSorting();
        },
        clearUndoCollection: function () {
            return this.ej2Instances.clearUndoCollection();
        },
        collapseAll: function () {
            return this.ej2Instances.collapseAll();
        },
        collapseByID: function (id) {
            return this.ej2Instances.collapseByID(id);
        },
        collapseByIndex: function (index) {
            return this.ej2Instances.collapseByIndex(index);
        },
        convertToMilestone: function (id) {
            return this.ej2Instances.convertToMilestone(id);
        },
        csvExport: function (excelExportProperties, isMultipleExport, workbook, isBlob) {
            return this.ej2Instances.csvExport(excelExportProperties, isMultipleExport, workbook, isBlob);
        },
        deleteRecord: function (taskDetail) {
            return this.ej2Instances.deleteRecord(taskDetail);
        },
        enableItems: function (items, isEnable) {
            return this.ej2Instances.enableItems(items, isEnable);
        },
        excelExport: function (excelExportProperties, isMultipleExport, workbook, isBlob) {
            return this.ej2Instances.excelExport(excelExportProperties, isMultipleExport, workbook, isBlob);
        },
        expandAll: function () {
            return this.ej2Instances.expandAll();
        },
        expandByID: function (id) {
            return this.ej2Instances.expandByID(id);
        },
        expandByIndex: function (index) {
            return this.ej2Instances.expandByIndex(index);
        },
        filterByColumn: function (fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent) {
            return this.ej2Instances.filterByColumn(fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent);
        },
        fitToProject: function () {
            return this.ej2Instances.fitToProject();
        },
        getCriticalTasks: function () {
            return this.ej2Instances.getCriticalTasks();
        },
        getDurationString: function (duration, durationUnit) {
            return this.ej2Instances.getDurationString(duration, durationUnit);
        },
        getExpandedRecords: function (records) {
            return this.ej2Instances.getExpandedRecords(records);
        },
        getFormatedDate: function (date, format) {
            return this.ej2Instances.getFormatedDate(date, format);
        },
        getGanttColumns: function () {
            return this.ej2Instances.getGanttColumns();
        },
        getGridColumns: function () {
            return this.ej2Instances.getGridColumns();
        },
        getRecordByID: function (id) {
            return this.ej2Instances.getRecordByID(id);
        },
        getRedoActions: function () {
            return this.ej2Instances.getRedoActions();
        },
        getRowByID: function (id) {
            return this.ej2Instances.getRowByID(id);
        },
        getRowByIndex: function (index) {
            return this.ej2Instances.getRowByIndex(index);
        },
        getTaskByUniqueID: function (id) {
            return this.ej2Instances.getTaskByUniqueID(id);
        },
        getTaskbarHeight: function () {
            return this.ej2Instances.getTaskbarHeight();
        },
        getUndoActions: function () {
            return this.ej2Instances.getUndoActions();
        },
        getWorkString: function (work, workUnit) {
            return this.ej2Instances.getWorkString(work, workUnit);
        },
        hideColumn: function (keys, hideBy) {
            return this.ej2Instances.hideColumn(keys, hideBy);
        },
        hideMaskRow: function () {
            return this.ej2Instances.hideMaskRow();
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        indent: function () {
            return this.ej2Instances.indent();
        },
        keyActionHandler: function (e) {
            return this.ej2Instances.keyActionHandler(e);
        },
        mergeTask: function (taskId, segmentIndexes) {
            return this.ej2Instances.mergeTask(taskId, segmentIndexes);
        },
        nextTimeSpan: function (mode) {
            return this.ej2Instances.nextTimeSpan(mode);
        },
        openAddDialog: function () {
            return this.ej2Instances.openAddDialog();
        },
        openEditDialog: function (taskId) {
            return this.ej2Instances.openEditDialog(taskId);
        },
        outdent: function () {
            return this.ej2Instances.outdent();
        },
        pdfExport: function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
            return this.ej2Instances.pdfExport(pdfExportProperties, isMultipleExport, pdfDoc, isBlob);
        },
        previousTimeSpan: function (mode) {
            return this.ej2Instances.previousTimeSpan(mode);
        },
        redo: function () {
            return this.ej2Instances.redo();
        },
        removeCriticalPathStyles: function () {
            return this.ej2Instances.removeCriticalPathStyles();
        },
        removePredecessor: function (id) {
            return this.ej2Instances.removePredecessor(id);
        },
        removeSortColumn: function (columnName) {
            return this.ej2Instances.removeSortColumn(columnName);
        },
        reorderColumns: function (fromFName, toFName) {
            return this.ej2Instances.reorderColumns(fromFName, toFName);
        },
        reorderRows: function (fromIndexes, toIndex, position) {
            return this.ej2Instances.reorderRows(fromIndexes, toIndex, position);
        },
        scrollToDate: function (date) {
            return this.ej2Instances.scrollToDate(date);
        },
        scrollToTask: function (taskId) {
            return this.ej2Instances.scrollToTask(taskId);
        },
        search: function (keyVal) {
            return this.ej2Instances.search(keyVal);
        },
        selectCell: function (cellIndex, isToggle) {
            return this.ej2Instances.selectCell(cellIndex, isToggle);
        },
        selectCells: function (rowCellIndexes) {
            return this.ej2Instances.selectCells(rowCellIndexes);
        },
        selectRow: function (index, isToggle) {
            return this.ej2Instances.selectRow(index, isToggle);
        },
        selectRows: function (records) {
            return this.ej2Instances.selectRows(records);
        },
        setScrollTop: function (scrollTop) {
            return this.ej2Instances.setScrollTop(scrollTop);
        },
        setSplitterPosition: function (value, type) {
            return this.ej2Instances.setSplitterPosition(value, type);
        },
        showColumn: function (keys, showBy) {
            return this.ej2Instances.showColumn(keys, showBy);
        },
        showCriticalPath: function (isCritical) {
            return this.ej2Instances.showCriticalPath(isCritical);
        },
        showMaskRow: function () {
            return this.ej2Instances.showMaskRow();
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
        sortColumn: function (columnName, direction, isMultiSort) {
            return this.ej2Instances.sortColumn(columnName, direction, isMultiSort);
        },
        splitTask: function (taskId, splitDate) {
            return this.ej2Instances.splitTask(taskId, splitDate);
        },
        undo: function () {
            return this.ej2Instances.undo();
        },
        updateChartScrollOffset: function (left, top) {
            return this.ej2Instances.updateChartScrollOffset(left, top);
        },
        updateDataSource: function (dataSource, args) {
            return this.ej2Instances.updateDataSource(dataSource, args);
        },
        updatePredecessor: function (id, predecessorString) {
            return this.ej2Instances.updatePredecessor(id, predecessorString);
        },
        updateProjectDates: function (startDate, endDate, isTimelineRoundOff, isFrom) {
            return this.ej2Instances.updateProjectDates(startDate, endDate, isTimelineRoundOff, isFrom);
        },
        updateRecordByID: function (data) {
            return this.ej2Instances.updateRecordByID(data);
        },
        updateRecordByIndex: function (index, data) {
            return this.ej2Instances.updateRecordByIndex(index, data);
        },
        updateTaskId: function (currentId, newId) {
            return this.ej2Instances.updateTaskId(currentId, newId);
        },
        zoomIn: function () {
            return this.ej2Instances.zoomIn();
        },
        zoomOut: function () {
            return this.ej2Instances.zoomOut();
        },
    }
});
export var GanttPlugin = {
    name: 'ejs-gantt',
    install: function (Vue) {
        Vue.component(GanttPlugin.name, GanttComponent);
        Vue.component(ColumnPlugin.name, ColumnDirective);
        Vue.component(ColumnsPlugin.name, ColumnsDirective);
        Vue.component(AddDialogFieldPlugin.name, AddDialogFieldDirective);
        Vue.component(AddDialogFieldsPlugin.name, AddDialogFieldsDirective);
        Vue.component(EditDialogFieldPlugin.name, EditDialogFieldDirective);
        Vue.component(EditDialogFieldsPlugin.name, EditDialogFieldsDirective);
        Vue.component(DayWorkingTimePlugin.name, DayWorkingTimeDirective);
        Vue.component(DayWorkingTimeCollectionPlugin.name, DayWorkingTimeCollectionDirective);
        Vue.component(WeekWorkingTimePlugin.name, WeekWorkingTimeDirective);
        Vue.component(WeekWorkingTimesPlugin.name, WeekWorkingTimesDirective);
        Vue.component(HolidayPlugin.name, HolidayDirective);
        Vue.component(HolidaysPlugin.name, HolidaysDirective);
        Vue.component(EventMarkerPlugin.name, EventMarkerDirective);
        Vue.component(EventMarkersPlugin.name, EventMarkersDirective);
    }
};
