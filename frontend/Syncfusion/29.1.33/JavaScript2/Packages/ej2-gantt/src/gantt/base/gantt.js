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
import { Component, createElement, Complex, addClass, removeClass, Event, formatUnit, Browser, closest } from '@syncfusion/ej2-base';
import { Internationalization, extend, getValue, isObjectArray, isObject, setValue, isUndefined } from '@syncfusion/ej2-base';
import { Property, NotifyPropertyChanges, L10n, EventHandler } from '@syncfusion/ej2-base';
import { isNullOrUndefined, KeyboardEvents, Collection, append, remove } from '@syncfusion/ej2-base';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { TaskProcessor } from './task-processor';
import { GanttChart } from './gantt-chart';
import { Timeline } from '../renderer/timeline';
import { GanttTreeGrid } from './tree-grid';
import { SortSettings } from '../models/models';
import { LoadingIndicator } from '../models/models';
import { TaskFields, TimelineSettings, Holiday, EventMarker, DayWorkingTime, EditSettings, SelectionSettings } from '../models/models';
import { FilterSettings, SplitterSettings, TooltipSettings, LabelSettings } from '../models/models';
import { SearchSettings, ResourceFields } from '../models/models';
import { DateProcessor } from './date-processor';
import { ChartRows } from '../renderer/chart-rows';
import { Dependency } from '../actions/dependency';
import * as cls from './css-constants';
import { DataManager } from '@syncfusion/ej2-data';
import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { getActualProperties } from '@syncfusion/ej2-grids';
import { ConnectorLine } from '../renderer/connector-line';
import { Splitter } from './splitter';
import { Tooltip } from '../renderer/tooltip';
import { FocusModule } from '../actions/keyboard';
import { isCountRequired } from './utils';
import { WeekWorkingTime } from '../models/week-working-time';
/**
 *
 * Represents the Gantt chart component.
 * ```html
 * <div id='gantt'></div>
 * <script>
 *  var ganttObject = new Gantt({
 *      taskFields: { id: 'taskId', name: 'taskName', startDate: 'startDate', duration: 'duration' }
 *  });
 *  ganttObject.appendTo('#gantt');
 * </script>
 * ```
 */
var Gantt = /** @class */ (function (_super) {
    __extends(Gantt, _super);
    function Gantt(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isRowSelected = false;
        _this.showIndicator = true;
        _this.singleTier = 0;
        _this.expandedRecords = [];
        _this.isLocaleChanged = false;
        _this.triggeredColumnName = '';
        _this.totalUndoAction = 0;
        _this.previousFlatData = [];
        _this.isExpandPerformed = false;
        _this.oldRecords = [];
        _this.updateDuration = false;
        _this.isConvertedMilestone = false;
        /** @hidden */
        _this.isCancelled = false;
        /** @hidden */
        _this.isCollapseAll = false;
        /** @hidden */
        _this.previousRecords = {};
        /** @hidden */
        _this.editedRecords = [];
        /** @hidden */
        _this.modifiedRecords = [];
        /** @hidden */
        _this.isOnEdit = false;
        /** @hidden */
        _this.isOnDelete = false;
        /** @hidden */
        _this.isOnAdded = false;
        /** @hidden */
        _this.isExpandCollapseLevelMethod = false;
        /** @hidden */
        _this.isFromEventMarker = false;
        /** @hidden */
        _this.isDynamicData = false;
        /** @hidden */
        _this.isConnectorLineUpdate = false;
        /** @hidden */
        _this.staticSelectedRowIndex = -1;
        _this.needsID = true;
        /** @hidden */
        _this.showActiveElement = true;
        /** @hidden */
        _this.addDeleteRecord = false;
        /** @hidden */
        _this.enableHeaderFocus = true;
        /** @hidden */
        _this.enableValidation = true;
        /**
         * @private
         */
        _this.isTreeGridRendered = false;
        /**
         * @private
         */
        _this.isFromOnPropertyChange = false;
        /**
         * @private
         */
        _this.isFromRenderBaseline = false;
        /**
         * @private
         */
        _this.isGanttChartRendered = false;
        /**
         * @private
         */
        _this.isEdit = false;
        /**
         * To get the module name
         *
         * @returns {string} .
         * @private
         */
        _this.eventMarkerColloction = [];
        setValue('mergePersistData', _this.mergePersistGanttData, _this);
        return _this;
    }
    Gantt.prototype.getModuleName = function () {
        return 'gantt';
    };
    /**
     * For internal use only - Initialize the event handler
     *
     * @returns {void} .
     * @private
     */
    Gantt.prototype.preRender = function () {
        this.initProperties();
    };
    Gantt.prototype.getCurrentDayStartTime = function (date) {
        var dayStartTime;
        if (this.weekWorkingTime.length > 0) {
            dayStartTime = this['getStartTime'](date);
        }
        else {
            dayStartTime = this.defaultStartTime;
        }
        return dayStartTime;
    };
    Gantt.prototype.getCurrentDayEndTime = function (date) {
        var dayEndTime;
        if (this.weekWorkingTime.length > 0) {
            dayEndTime = this['getEndTime'](date);
        }
        else {
            dayEndTime = this.defaultEndTime;
        }
        return dayEndTime;
    };
    Gantt.prototype.getStartTime = function (date) {
        var day = date.getDay();
        var startTime;
        switch (day) {
            case 0:
                startTime = this.sundayDefaultStartTime;
                break;
            case 1:
                startTime = this.mondayDefaultStartTime;
                break;
            case 2:
                startTime = this.tuesdayDefaultStartTime;
                break;
            case 3:
                startTime = this.wednesdayDefaultStartTime;
                break;
            case 4:
                startTime = this.thursdayDefaultStartTime;
                break;
            case 5:
                startTime = this.fridayDefaultStartTime;
                break;
            default:
                startTime = this.saturdayDefaultStartTime;
                break;
        }
        return startTime;
    };
    Gantt.prototype.getEndTime = function (date) {
        var day = date.getDay();
        var endTime;
        switch (day) {
            case 0:
                endTime = this.sundayDefaultEndTime;
                break;
            case 1:
                endTime = this.mondayDefaultEndTime;
                break;
            case 2:
                endTime = this.tuesdayDefaultEndTime;
                break;
            case 3:
                endTime = this.wednesdayDefaultEndTime;
                break;
            case 4:
                endTime = this.thursdayDefaultEndTime;
                break;
            case 5:
                endTime = this.fridayDefaultEndTime;
                break;
            default:
                endTime = this.saturdayDefaultEndTime;
                break;
        }
        return endTime;
    };
    Gantt.prototype.getNonWorkingRange = function (date) {
        var day = date.getDay();
        var nonWorkingTimeRange;
        switch (day) {
            case 0:
                nonWorkingTimeRange = this.sundayNonWorkingTimeRanges;
                break;
            case 1:
                nonWorkingTimeRange = this.mondayNonWorkingTimeRanges;
                break;
            case 2:
                nonWorkingTimeRange = this.tuesdayNonWorkingTimeRanges;
                break;
            case 3:
                nonWorkingTimeRange = this.wednesdayNonWorkingTimeRanges;
                break;
            case 4:
                nonWorkingTimeRange = this.thursdayNonWorkingTimeRanges;
                break;
            case 5:
                nonWorkingTimeRange = this.fridayNonWorkingTimeRanges;
                break;
            default:
                nonWorkingTimeRange = this.saturdayNonWorkingTimeRanges;
                break;
        }
        return nonWorkingTimeRange;
    };
    Gantt.prototype.getWorkingRange = function (date) {
        var day = date.getDay();
        var workingTimeRanges;
        switch (day) {
            case 0:
                workingTimeRanges = this.sundayWorkingTimeRanges;
                break;
            case 1:
                workingTimeRanges = this.mondayWorkingTimeRanges;
                break;
            case 2:
                workingTimeRanges = this.tuesdayWorkingTimeRanges;
                break;
            case 3:
                workingTimeRanges = this.wednesdayWorkingTimeRanges;
                break;
            case 4:
                workingTimeRanges = this.thursdayWorkingTimeRanges;
                break;
            case 5:
                workingTimeRanges = this.fridayWorkingTimeRanges;
                break;
            default:
                workingTimeRanges = this.saturdayWorkingTimeRanges;
                break;
        }
        return workingTimeRanges;
    };
    Gantt.prototype.getSecondsPerDay = function (date) {
        var day = date.getDay();
        var totalSeconds;
        switch (day) {
            case 0:
                totalSeconds = this.sundaySeconds;
                break;
            case 1:
                totalSeconds = this.mondaySeconds;
                break;
            case 2:
                totalSeconds = this.tuesdaySeconds;
                break;
            case 3:
                totalSeconds = this.wednesdaySeconds;
                break;
            case 4:
                totalSeconds = this.thursdaySeconds;
                break;
            case 5:
                totalSeconds = this.fridaySeconds;
                break;
            case 6:
                totalSeconds = this.saturdaySeconds;
                break;
            default:
                totalSeconds = this.secondsPerDay;
                break;
        }
        return totalSeconds;
    };
    Gantt.prototype.initProperties = function () {
        this.globalize = new Internationalization(this.locale);
        this.isAdaptive = Browser.isDevice;
        this.flatData = [];
        this.currentViewData = [];
        this.updatedRecords = [];
        this.ids = [];
        this.ganttColumns = [];
        this.updateOffsetOnTaskbarEdit = this.UpdateOffsetOnTaskbarEdit === false ?
            this.UpdateOffsetOnTaskbarEdit : this.updateOffsetOnTaskbarEdit;
        this.localeObj = new L10n(this.getModuleName(), this.getDefaultLocale(), this.locale);
        this.dataOperation = new TaskProcessor(this);
        this.nonWorkingHours = [];
        this.mondayNonWorkingHours = [];
        this.tuesdayNonWorkingHours = [];
        this.wednesdayNonWorkingHours = [];
        this.thursdayNonWorkingHours = [];
        this.fridayNonWorkingHours = [];
        this.saturdayNonWorkingHours = [];
        this.sundayNonWorkingHours = [];
        this.nonWorkingTimeRanges = [];
        this.mondayNonWorkingTimeRanges = [];
        this.tuesdayNonWorkingTimeRanges = [];
        this.wednesdayNonWorkingTimeRanges = [];
        this.thursdayNonWorkingTimeRanges = [];
        this.fridayNonWorkingTimeRanges = [];
        this.saturdayNonWorkingTimeRanges = [];
        this.sundayNonWorkingTimeRanges = [];
        this.workingTimeRanges = [];
        this.mondayWorkingTimeRanges = [];
        this.tuesdayWorkingTimeRanges = [];
        this.wednesdayWorkingTimeRanges = [];
        this.thursdayWorkingTimeRanges = [];
        this.fridayWorkingTimeRanges = [];
        this.saturdayWorkingTimeRanges = [];
        this.sundayWorkingTimeRanges = [];
        this.defaultEndTime = null;
        this.defaultStartTime = null;
        this.mondayDefaultStartTime = null;
        this.mondayDefaultEndTime = null;
        this.tuesdayDefaultStartTime = null;
        this.tuesdayDefaultEndTime = null;
        this.wednesdayDefaultStartTime = null;
        this.wednesdayDefaultEndTime = null;
        this.thursdayDefaultStartTime = null;
        this.thursdayDefaultEndTime = null;
        this.fridayDefaultStartTime = null;
        this.fridayDefaultEndTime = null;
        this.saturdayDefaultStartTime = null;
        this.saturdayDefaultEndTime = null;
        this.sundayDefaultStartTime = null;
        this.sundayDefaultEndTime = null;
        this.durationUnitTexts = {
            days: 'days',
            hours: 'hours',
            minutes: 'minutes',
            day: 'day',
            hour: 'hour',
            minute: 'minute'
        };
        this.durationUnitEditText = {
            minute: ['m', 'min', 'minute', 'minutes'],
            hour: ['h', 'hr', 'hour', 'hours'],
            day: ['d', 'dy', 'day', 'days']
        };
        this.perDayWidth = null;
        this.isMileStoneEdited = false;
        this.chartVerticalLineContainer = null;
        this.updatedConnectorLineCollection = [];
        this.connectorLineIds = [];
        this.predecessorsCollection = [];
        this.isInPredecessorValidation = this.enablePredecessorValidation;
        this.isValidationEnabled = true;
        this.isLoad = true;
        this.editedTaskBarItem = null;
        this.validationDialogElement = null;
        this.currentEditedArgs = {};
        this.dialogValidateMode = {
            respectLink: false,
            removeLink: false,
            preserveLinkWithEditing: true
        };
        this.secondsPerDay = this.dataOperation.getSecondsPerDay();
        this.nonWorkingDayIndex = [];
        this.dataOperation.getNonWorkingDayIndex();
        this.columnMapping = {};
        this.controlId = this.element.id;
        this.cloneProjectStartDate = this.enablePersistence && this.cloneProjectStartDate ?
            this.cloneProjectStartDate : null;
        this.cloneProjectEndDate = this.enablePersistence && this.cloneProjectEndDate ?
            this.cloneProjectEndDate : null;
        this.totalHolidayDates = this.dataOperation.getHolidayDates();
        this.ganttChartModule = new GanttChart(this);
        this.timelineModule = new Timeline(this);
        this.chartRowsModule = new ChartRows(this);
        this.treeGridModule = new GanttTreeGrid(this);
        this.dateValidationModule = new DateProcessor(this);
        this.predecessorModule = new Dependency(this);
        this.connectorLineModule = new ConnectorLine(this);
        this.splitterModule = new Splitter(this);
        this.tooltipModule = new Tooltip(this);
        this.keyConfig = {
            home: 'home',
            end: 'end',
            downArrow: 'downarrow',
            upArrow: 'uparrow',
            collapseAll: 'ctrl+uparrow',
            expandAll: 'ctrl+downarrow',
            collapseRow: 'ctrl+shift+uparrow',
            expandRow: 'ctrl+shift+downarrow',
            saveRequest: '13',
            escape: '27',
            addRow: 'insert',
            addRowDialog: 'ctrl+insert',
            editRowDialog: 'ctrl+f2',
            delete: 'delete',
            tab: 'tab',
            shiftTab: 'shift+tab',
            focusTask: 'shift+f5',
            indentLevel: 'shift+leftarrow',
            outdentLevel: 'shift+rightarrow',
            focusSearch: 'ctrl+shift+70',
            contextMenu: 'shift+F10',
            undo: 'ctrl+z',
            redo: 'ctrl+y',
            selectAll: 'ctrl+a'
        };
        this.focusModule = new FocusModule(this);
        if (this.zoomingLevels.length === 0) {
            this.setProperties({ zoomingLevels: this.getZoomingLevels() }, true);
        }
        this.resourceFieldsMapping();
        if (isNullOrUndefined(this.resourceFields.unit)) { //set resourceUnit as unit if not mapping
            this.setProperties({ resourceFields: { unit: 'unit' } }, true);
        }
        this.taskIds = [];
    };
    Gantt.prototype.isUndoRedoItemPresent = function (action) {
        if (this.undoRedoModule && this.undoRedoActions && this.undoRedoActions.indexOf(action) !== -1) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @returns {string} .
     * @private
     */
    Gantt.prototype.getDateFormat = function () {
        if (!isNullOrUndefined(this.dateFormat)) {
            return this.dateFormat;
        }
        else {
            var ganttDateFormat = this.globalize.getDatePattern({ skeleton: 'yMd' });
            return ganttDateFormat;
        }
    };
    /**
     * To get timezone offset.
     *
     * @returns {number} .
     * @private
     */
    Gantt.prototype.getDefaultTZOffset = function () {
        var janMonth = new Date(new Date().getFullYear(), 0, 1);
        var julMonth = new Date(new Date().getFullYear(), 6, 1); //Because there is no reagions DST inbetwwen this range
        return Math.max(janMonth.getTimezoneOffset(), julMonth.getTimezoneOffset());
    };
    /**
     * To check whether the date is in DST.
     *
     * @param {Date} date - Defines the date to check whether it is DST.
     * @returns {boolean} .
     * @private
     */
    Gantt.prototype.isInDst = function (date) {
        return date.getTimezoneOffset() < this.getDefaultTZOffset();
    };
    /**
     * Method to map resource fields.
     *
     * @returns {void} .
     */
    Gantt.prototype.resourceFieldsMapping = function () {
        var resourceSettings = this.resourceFields;
        resourceSettings.id = !isNullOrUndefined(resourceSettings.id) ? resourceSettings.id : this.resourceIDMapping;
        resourceSettings.name = !isNullOrUndefined(resourceSettings.name) ? resourceSettings.name : this.resourceNameMapping;
    };
    /**
     * To validate height and width
     *
     * @param {string | number} value .
     * @returns {string} .
     */
    Gantt.prototype.validateDimentionValue = function (value) {
        if (!isNullOrUndefined(value)) {
            if (typeof (value) === 'string' && value !== 'auto' && value.indexOf('%') === -1) {
                return value.indexOf('px') === -1 ? value + 'px' : value;
            }
            else if (typeof (value) === 'number') {
                return value + 'px';
            }
            else {
                return value.toString();
            }
        }
        else {
            return null;
        }
    };
    /**
     * To calculate dimensions of Gantt control
     *
     * @returns {void} .
     */
    Gantt.prototype.calculateDimensions = function () {
        var settingsHeight = this.validateDimentionValue(this.height);
        var settingsWidth = this.validateDimentionValue(this.width);
        if (!isNullOrUndefined(this.width) && typeof (this.width) === 'string' && this.width.indexOf('%') !== -1) {
            settingsWidth = this.width;
        }
        var elementStyleHeight = this.element.style.height;
        var elementStyleWidth = this.element.style.width;
        if (settingsWidth) {
            this.element.style.width = settingsWidth;
        }
        if (settingsHeight) {
            this.element.style.height = settingsHeight;
        }
        if (!settingsHeight && !elementStyleHeight) {
            this.element.style.height = 'auto'; // old 450px
        }
        if (!settingsWidth && !elementStyleWidth) {
            this.element.style.width = 'auto';
        }
        this.ganttHeight = this.element.offsetHeight;
        this.ganttWidth = this.element.offsetWidth;
    };
    /**
     * @returns {void} .
     * @private
     */
    Gantt.prototype.render = function () {
        if (this.isReact) {
            this.treeGrid.isReact = true;
            this.treeGrid.grid.isReact = true;
        }
        if (this.isVue) {
            this.treeGrid.isVue = true;
            this.treeGrid.grid.isVue = true;
            /* eslint-disable-next-line */
            this.treeGrid.vueInstance = this.vueInstance;
            /* eslint-disable-next-line */
            this.treeGrid.grid.vueInstance = this.vueInstance;
        }
        this.element.setAttribute('role', 'application');
        createSpinner({ target: this.element }, this.createElement);
        this.trigger('load', {});
        this.element.classList.add(cls.root);
        if (this.isAdaptive) {
            this.element.classList.add(cls.adaptive);
        }
        else {
            this.element.classList.remove(cls.adaptive);
        }
        this.calculateDimensions();
        if (!isNullOrUndefined(this.toolbarModule)) {
            this.renderToolbar();
        }
        this.splitterModule.renderSplitter();
        this.notify('renderPanels', null);
        this.actionFailures();
        if (!isNullOrUndefined(this.loadingIndicator) && this.loadingIndicator.indicatorType === 'Shimmer') {
            this.showMaskRow();
        }
        else {
            this.showSpinner();
        }
        if (this.dataMap) {
            this.dataMap.clear();
        }
        this.dataOperation.checkDataBinding();
    };
    Gantt.prototype.actionFailures = function () {
        var failureCases = [];
        var lettersRegex = /^[a-zA-Z\s/]+$/;
        var allPropertiesNull = true;
        var fields = this.taskFields['properties'];
        var shouldBreak = false;
        Object.keys(fields).forEach(function (key) {
            if (fields[key] !== null) {
                allPropertiesNull = false;
                shouldBreak = true;
            }
        });
        var isPrimary = true;
        for (var i = 0; i < this.columns.length; i++) {
            if (this.columns[i]['isPrimaryKey']) {
                isPrimary = false;
                break;
            }
        }
        if (allPropertiesNull) {
            failureCases.push('Gantt Task Fields are not configured properly. The task fields are crucial for both the project and resource views to function properly. Please ensure that the gantt task fields are properly configured!');
        }
        if (this.viewType === 'ResourceView') {
            if (!this.resourceFields.id) {
                failureCases.push('Gantt Resource Fields are not properly configured, which is crucial for the Resource View. Please ensure that the resource fields are configured correctly!');
            }
        }
        if (this.dataSource instanceof DataManager && isNullOrUndefined(this.taskFields.hasChildMapping)) {
            failureCases.push('hasChildMapping property is not configured for load-on-demand. Please ensure its properly configured in the Gantt Task Fields!');
        }
        if (!isNullOrUndefined(this.timelineSettings.topTier.format) && this.timelineSettings.topTier.format !== '' && !lettersRegex.test(this.timelineSettings.topTier.format)) {
            failureCases.push('The provided top tier format is invalid. Please ensure that you provide a valid format for these tier. Make sure to use only letters and avoid numbers or special characters!');
        }
        if (!isNullOrUndefined(this.timelineSettings.bottomTier.format) && this.timelineSettings.bottomTier.format !== '' && !lettersRegex.test(this.timelineSettings.bottomTier.format)) {
            failureCases.push('The provided bottom  tier format is invalid. Please ensure that you provide a valid format for these tier. Make sure to use only letters and avoid numbers or special characters!');
        }
        if (isPrimary && this.viewType !== 'ResourceView') {
            failureCases.push('Primarykey is not configured properly. The primarykey is crucial for doing CRUD operations or map taskId in column field of gantt!');
        }
        if (this.eventMarkers.length > 0) {
            this.eventMarkers.forEach(function (markers) {
                if (!markers.day) {
                    failureCases.push('Day is not configured properly in event markers.Please ensure that the day in event markers is properly configured!');
                }
            });
        }
        /* eslint-disable-next-line */
        function checkModule(moduleName, settings, injectedModules, failureCases) {
            /* eslint-disable-next-line */
            var modules;
            if (!isNullOrUndefined(injectedModules)) {
                modules = injectedModules.filter(function (e) { return e.prototype.getModuleName() === moduleName; });
            }
            if (settings && !isNullOrUndefined(modules) && modules.length === 0) {
                failureCases.push("Module " + moduleName + " is not available in Gantt component! You either misspelled the module name or forgot to load it!");
            }
        }
        checkModule('sort', this.allowSorting, this.injectedModules, failureCases);
        var editSettings;
        if (this.editSettings.allowAdding || this.editSettings.allowDeleting || this.editSettings.allowEditing ||
            this.editSettings.allowNextRowEdit || this.editSettings.allowTaskbarEditing || this.editSettings.mode ||
            this.editSettings.newRowPosition || this.editSettings.showDeleteConfirmDialog) {
            editSettings = true;
        }
        checkModule('edit', editSettings, this.injectedModules, failureCases);
        checkModule('reorder', this.allowReordering, this.injectedModules, failureCases);
        checkModule('excelExport', this.allowExcelExport, this.injectedModules, failureCases);
        var dragAndDrop;
        if (this.allowRowDragAndDrop || this.allowTaskbarDragAndDrop) {
            dragAndDrop = true;
        }
        checkModule('rowDragAndDrop', dragAndDrop, this.injectedModules, failureCases);
        checkModule('criticalPath', this.enableCriticalPath, this.injectedModules, failureCases);
        checkModule('undoRedo', this.enableUndoRedo, this.injectedModules, failureCases);
        checkModule('resize', this.allowResizing, this.injectedModules, failureCases);
        var toolbar;
        if (this.toolbar && this.toolbar.length > 0) {
            toolbar = true;
        }
        checkModule('toolbar', toolbar, this.injectedModules, failureCases);
        var filter;
        if (this.allowFiltering || (this.toolbar && this.toolbar.indexOf('Search') !== -1)) {
            filter = true;
        }
        checkModule('filter', filter, this.injectedModules, failureCases);
        checkModule('selection', this.allowSelection, this.injectedModules, failureCases);
        var dayMarkers;
        if (this.highlightWeekends || (this.holidays && this.holidays.length > 0)
            || (this.eventMarkers && this.eventMarkers.length > 0)) {
            dayMarkers = true;
        }
        checkModule('dayMarkers', dayMarkers, this.injectedModules, failureCases);
        checkModule('contextMenu', this.enableContextMenu, this.injectedModules, failureCases);
        checkModule('columnMenu', this.showColumnMenu, this.injectedModules, failureCases);
        checkModule('pdfExport', this.allowPdfExport, this.injectedModules, failureCases);
        checkModule('virtualScroll', this.enableVirtualization, this.injectedModules, failureCases);
        if (failureCases.length > 0) {
            /* eslint-disable-next-line */
            var failureEventArgs_1 = {
                error: {}
            };
            /* eslint-disable-next-line */
            failureCases.forEach(function (err, index) {
                failureEventArgs_1.error[parseInt(index, 10)] = err;
            });
            this.trigger('actionFailure', failureEventArgs_1);
        }
    };
    Gantt.prototype.hideMaskRow = function () {
        var isTablePresent = this.element.querySelectorAll('.e-masked-table').length;
        if (!isNullOrUndefined(this.contentMaskTable) && (isTablePresent !== 0 || this.contentMaskTable)) {
            var maskTable = this.contentMaskTable;
            remove(maskTable);
            this.contentMaskTable = null;
        }
        isTablePresent = this.element.querySelectorAll('.e-masked-table').length;
        if (!isNullOrUndefined(this.headerMaskTable) && (isTablePresent !== 0 || this.headerMaskTable)) {
            var maskTable = this.headerMaskTable;
            remove(maskTable);
            this.headerMaskTable = null;
        }
        while ((this.element.querySelectorAll('.e-table-background')).length !== 0) {
            this.element.querySelectorAll('.e-table-background')[0].remove();
        }
        while ((this.element.querySelectorAll('.e-temp-timeline')).length !== 0) {
            this.element.querySelectorAll('.e-temp-timeline')[0].remove();
        }
        if (this.element.querySelectorAll('.' + cls.timelineHeaderTableContainer).length !== 0) {
            for (var i = 0; i < this.singleTier; i++) {
                if (!isNullOrUndefined(this.element.querySelectorAll('.' + cls.timelineHeaderTableContainer)[parseInt(i.toString(), 10)])) {
                    this.element.querySelectorAll('.' + cls.timelineHeaderTableContainer)[parseInt(i.toString(), 10)]['style'].visibility = 'visible';
                }
            }
        }
        if (!isNullOrUndefined(this.element.querySelector('.' + cls.timelineHeaderContainer))) {
            this.element.querySelector('.' + cls.timelineHeaderContainer)['style'].position = 'relative';
        }
        if (!isNullOrUndefined(this.element.getElementsByClassName(cls.chartBodyContent)[0])) {
            this.element.getElementsByClassName(cls.chartBodyContent)[0]['style'].visibility = 'visible';
        }
    };
    Gantt.prototype.showMaskRow = function () {
        var ganttHeader = this.chartPane.childNodes[0].childNodes[0];
        this.scrollLeftValue = this.chartPane.childNodes[0].childNodes[0]['scrollLeft'];
        var ganttContent = this.chartPane.childNodes[0].childNodes[1];
        if (this.treeGrid.element) {
            this.ganttChartModule['setVirtualHeight']();
        }
        if (!this.contentMaskTable) {
            if (ganttContent) {
                var content = ganttContent;
                this.renderBackGround(content);
                if (this.ganttChartModule.scrollObject['isSetScrollLeft']) {
                    if (this.element.querySelectorAll('.' + cls.timelineHeaderTableContainer).length !== 0) {
                        this.singleTier = this.timelineModule.isSingleTier ? 1 : 2;
                        for (var i = 0; i < this.singleTier; i++) {
                            this.element.querySelectorAll('.' + cls.timelineHeaderTableContainer)[parseInt(i.toString(), 10)]['style'].visibility = 'hidden';
                        }
                    }
                    if (this.singleTier === 0) {
                        this.singleTier = 2;
                    }
                }
                this.element.getElementsByClassName(cls.chartBodyContent)[0]['style'].visibility = 'hidden';
                this.contentMaskTable = this.contentMaskTable = this.createMaskTable(content);
            }
            if (ganttHeader && this.ganttChartModule.scrollObject['isSetScrollLeft']) {
                this.element.querySelector('.' + cls.timelineHeaderContainer)['style'].position = 'static';
                var content = ganttHeader;
                this.renderHeaderBackground(content);
                this.headerMaskTable = this.headerMaskTable = this.createMaskTable(content);
            }
        }
    };
    Gantt.prototype.renderHeaderBackground = function (element) {
        var parentElement = element;
        // const timelineHeight: any = element.getBoundingClientRect().height;
        var header = closest(parentElement, '.' + cls.timelineHeaderContainer) ? true : false;
        if (header) {
            var div = this.createElement('div', { className: 'e-table-background' });
            // const tempRow: Element = this.createElement('tr', {
            //     className: 'e-masked-row e-row', attrs: {
            //         style: 'height: ' + timelineHeight + 'px;'
            //     }
            // });
            var backgroundLines = 0;
            var containerWidth = Math.round(element.getBoundingClientRect().width);
            for (var i = 0; i < 3; i++) {
                if (this.enableRtl) {
                    div.appendChild(this.createElement('div', { className: 'e-div-background', attrs: {
                            style: 'left: ' + (containerWidth -= ((160))) + 'px; top:0px;'
                        } }));
                }
                else {
                    div.appendChild(this.createElement('div', { className: 'e-div-background', attrs: {
                            style: 'left: ' + (backgroundLines += ((160))) + 'px; top:0px;'
                        } }));
                }
            }
            parentElement.insertBefore(div, parentElement.firstChild);
        }
    };
    Gantt.prototype.renderBackGround = function (element) {
        var parentElement = element;
        // const timelineHeight: number = element.getBoundingClientRect().height;
        var content = closest(parentElement, '.' + cls.chartBodyContainer) ? true : false;
        if (content) {
            var div = this.createElement('div', { className: 'e-table-background' });
            // const tempRow: Element = this.createElement('tr', {
            //     className: 'e-masked-row e-row', attrs: {
            //         style: 'height: ' + timelineHeight + 'px;'
            //     }
            // });
            var backgroundLines = 0;
            var containerWidth = Math.round(element.getBoundingClientRect().width);
            for (var i = 0; i < 3; i++) {
                if (this.enableRtl) {
                    div.appendChild(this.createElement('div', { className: 'e-div-background', attrs: {
                            style: 'left: ' + (containerWidth -= (160)) + 'px;z-index:1;'
                        } }));
                }
                else {
                    div.appendChild(this.createElement('div', { className: 'e-div-background', attrs: {
                            style: 'left: ' + (backgroundLines += (160)) + 'px;z-index:1;'
                        } }));
                }
            }
            parentElement.insertBefore(div, parentElement.firstChild);
        }
    };
    /* eslint-disable-next-line */
    Gantt.prototype.createMaskTable = function (element) {
        var parentElement = element;
        var shimmerContainerHeight = element.getBoundingClientRect().height;
        var header = closest(parentElement, '.' + cls.timelineHeaderContainer) ? true : false;
        /* eslint-disable-next-line */
        var maskTable;
        if (header) {
            maskTable = this.createEmptyTimeLineTable(shimmerContainerHeight);
            maskTable.style.position = 'sticky';
            maskTable.style.left = 0 + 'px';
            if (this.enableRtl) {
                maskTable.style.removeProperty('left');
            }
        }
        else {
            maskTable = this.createEmptyMaskTable(shimmerContainerHeight);
            maskTable.style.position = 'absolute';
            maskTable.style.zIndex = 1;
        }
        if (!header) {
            maskTable.style.height = element.getBoundingClientRect().height + 'px';
            parentElement.insertBefore(maskTable, parentElement.firstChild);
        }
        else {
            maskTable.style.height = element.getBoundingClientRect().height + 'px';
            var div = this.createElement('div', { className: 'e-temp-timeline' });
            div.style.width = this.element.getElementsByClassName('e-timeline-header-container')[0]['offsetWidth'] + 'px';
            div.style.position = 'sticky';
            if (this.enableRtl) {
                div.style['margin-right'] = Math.abs(this.scrollLeftValue) + 'px';
            }
            else {
                div.style['margin-left'] = this.scrollLeftValue + 'px';
            }
            div.appendChild(maskTable);
            parentElement.insertBefore(div, parentElement.firstChild);
        }
        return maskTable;
    };
    Gantt.prototype.createEmptyTimeLineTable = function (timelineHeight) {
        var table = this.createElement('table', { className: 'e-table e-masked-table' });
        var tbody = this.createElement('tbody', { className: 'e-masked-tbody' });
        /* eslint-disable-next-line */
        var row = [];
        var duplicateRow = this.createElement('tr', {
            className: 'e-masked-row e-row', attrs: {
                style: 'height: ' + timelineHeight / 2 + 'px;'
            }
        });
        for (var i = 0; i < this.singleTier; i++) {
            row.push(duplicateRow.cloneNode(true));
        }
        this.topBottomHeader = 0;
        for (var i = 0; i < row.length; i++) {
            tbody.appendChild(this.applyTimelineMaskRow(row[parseInt(i.toString(), 10)]));
            this.topBottomHeader = this.topBottomHeader + 1;
        }
        table.appendChild(tbody);
        table.style.width = 100 + '%';
        return table;
    };
    Gantt.prototype.applyTimelineMaskRow = function (row) {
        var maskRow = row;
        var num = 4;
        if (this.element.getElementsByClassName('e-timeline-header-container')[0]['offsetWidth'] / 166 > 4) {
            num = this.element.getElementsByClassName('e-timeline-header-container')[0]['offsetWidth'] / 166;
        }
        for (var i = 0; i < num; i++) {
            maskRow.appendChild(this.createElement('td', { className: 'e-timeline-masked-top-header-cell' }));
        }
        for (var i = 0; i < maskRow.childNodes.length - 1; i++) {
            maskRow.childNodes[parseInt(i.toString(), 10)]['style']['width'] = 166 + 'px';
        }
        var maskCells = [].slice.call(maskRow.childNodes);
        for (var i = 0; i < maskCells.length; i++) {
            var maskCell = maskCells[parseInt(i.toString(), 10)];
            switch (this.topBottomHeader) {
                case 0:
                    {
                        if (this.enableRtl) {
                            maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-timelineHeader"></span>';
                            maskCell.children[0]['style'].left = -20 + 'px';
                        }
                        else {
                            maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-timelineHeader"></span>';
                        }
                        break;
                    }
                case 1:
                    {
                        maskCell.appendChild(this.createElement('td', { className: 'e-timeline-masked-top-header-cell' }));
                        maskCell.appendChild(this.createElement('td', { className: 'e-timeline-masked-top-header-cell' }));
                        maskCell.appendChild(this.createElement('td', { className: 'e-timeline-masked-top-header-cell' }));
                        var innerMaskCells = [].slice.call(maskCell.childNodes);
                        for (var i_1 = 0; i_1 < innerMaskCells.length; i_1++) {
                            var htmlInner = innerMaskCells[parseInt(i_1.toString(), 10)];
                            if (i_1 === 0) {
                                if (this.enableRtl) {
                                    htmlInner.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-innerHTML"></span>';
                                    htmlInner.children[0]['style'].left = -14 + 'px';
                                }
                                else {
                                    htmlInner.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-innerHTML"></span>';
                                }
                            }
                            else if (i_1 === 1) {
                                if (this.enableRtl) {
                                    htmlInner.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-innerHTML1"></span>';
                                    htmlInner.children[0]['style'].left = -30 + 'px';
                                }
                                else {
                                    htmlInner.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-innerHTML1"></span>';
                                }
                            }
                            else {
                                if (this.enableRtl) {
                                    htmlInner.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-innerHTML2"></span>';
                                    htmlInner.children[0]['style'].left = -60 + 'px';
                                }
                                else {
                                    htmlInner.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-innerHTML2"></span>';
                                }
                            }
                        }
                        break;
                    }
            }
        }
        return maskRow;
    };
    Gantt.prototype.createEmptyMaskTable = function (timelineHeight) {
        var table = this.createElement('table', { className: 'e-table e-masked-table' });
        var tbody = this.createElement('tbody', { className: 'e-masked-tbody' });
        /* eslint-disable-next-line */
        var row = [];
        var duplicateRow = this.createElement('tr', { className: 'e-masked-row e-row', attrs: {
                style: 'height: ' + timelineHeight / 7 + 'px;'
            } });
        this.columnLoop = 0;
        for (var i = 0; i < 6; i++) {
            row.push(duplicateRow.cloneNode(true));
        }
        for (var j = 0; j < row.length; j++) {
            if (this.columnLoop < 4) {
                this.columnLoop = this.columnLoop + 1;
            }
            else if (this.columnLoop === 4) {
                this.columnLoop = 1;
            }
            tbody.appendChild(this.applyMaskRow(row[parseInt(j.toString(), 10)]));
        }
        table.appendChild(tbody);
        table.style.width = 100 + '%';
        var div = this.createElement('div', { className: 'e-temp-container' });
        div.style.width = 'calc(100% - ' + 17 + 'px)';
        div.style.overflow = 'hidden';
        div.appendChild(table);
        return div;
    };
    Gantt.prototype.applyMaskRow = function (row) {
        var maskRow = row;
        if (this.columnLoop < 4) {
            var num = 2;
            if (this.element.getElementsByClassName('e-timeline-header-container')[0]['offsetWidth'] / 300 > 2) {
                num = this.element.getElementsByClassName('e-timeline-header-container')[0]['offsetWidth'] / 300;
            }
            for (var i = 0; i < num; i++) {
                maskRow.appendChild(this.createElement('td', { className: 'e-masked-cell e-rowcell' }));
            }
        }
        else {
            maskRow.appendChild(this.createElement('td', { className: 'e-masked-cell e-rowcell' }));
        }
        var maskCells = [].slice.call(maskRow.childNodes);
        for (var i = 0; i < maskCells.length; i++) {
            var maskCell = maskCells[parseInt(i.toString(), 10)];
            switch (this.columnLoop) {
                case 1:
                    if (i === 0) {
                        if (this.enableRtl) {
                            maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell01"></span>';
                            maskCell.children[0]['style'].left = -14 + 'px';
                        }
                        else {
                            maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell01"></span>';
                        }
                    }
                    else {
                        maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell02"></span>';
                    }
                    break;
                case 2:
                    if (i === 0) {
                        if (this.enableRtl) {
                            maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell03"></span>';
                            maskCell.children[0]['style'].left = -14 + 'px';
                        }
                        else {
                            maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell03"></span>';
                        }
                    }
                    else {
                        maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell04"></span>';
                    }
                    break;
                case 3:
                    if (i === 0) {
                        if (this.enableRtl) {
                            maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell05"></span>';
                            maskCell.children[0]['style'].left = -64 + 'px';
                        }
                        else {
                            maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell05"></span>';
                        }
                    }
                    else {
                        if (this.enableRtl) {
                            maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell06"></span>';
                            maskCell.children[0]['style'].left = -192 + 'px';
                        }
                        else {
                            maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell06"></span>';
                        }
                    }
                    break;
                case 4:
                    if (this.enableRtl) {
                        maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell07"></span>';
                        maskCell.children[0]['style'].left = -388 + 'px';
                    }
                    else {
                        maskCell.innerHTML = '<span class="e-mask e-skeleton e-skeleton-text e-shimmer-wave e-maskcell07"></span>';
                    }
                    break;
            }
        }
        return maskRow;
    };
    /**
     * Method used to show spinner.
     *
     * @returns {void} .
     */
    Gantt.prototype.showSpinner = function () {
        showSpinner(this.element);
    };
    /**
     * Method used to hide spinner.
     *
     * @returns {void} .
     */
    Gantt.prototype.hideSpinner = function () {
        hideSpinner(this.element);
    };
    /**
     * @returns {void} .
     * @private
     */
    Gantt.prototype.processTimeline = function () {
        this.timelineModule.processTimelineUnit();
        this.timelineModule.calculateZoomingLevelsPerDayWidth(); // To calculate the perDaywidth
    };
    /**
     * @param {boolean} isChange -Defines whether task data is changed.
     * @returns {void} .
     * @private
     */
    Gantt.prototype.renderGantt = function (isChange) {
        if (isChange) {
            this.isFromOnPropertyChange = isChange;
        }
        if (this.enableValidation) {
            this.dataOperation.calculateProjectDates();
            this.timelineModule.validateTimelineProp();
        }
        var flatData = this.flatData;
        var flatDataCollection = new Map();
        if (flatData != null) {
            for (var _i = 0, flatData_1 = flatData; _i < flatData_1.length; _i++) {
                var record = flatData_1[_i];
                flatDataCollection.set(record.ganttProperties.rowUniqueID.toString(), record);
            }
        }
        if (this.allowParentDependency) {
            this.predecessorModule.updateParentPredecessor(flatDataCollection);
        }
        if (this.predecessorModule && this.taskFields.dependency) {
            this.predecessorModule['parentIds'] = [];
            this.predecessorModule['parentRecord'] = [];
            this.predecessorModule.updatePredecessors(flatDataCollection);
            if (this.isInPredecessorValidation && this.enableValidation && this.autoCalculateDateScheduling &&
                !(this.isLoad && !this.treeGrid.loadChildOnDemand && this.taskFields.hasChildMapping)) {
                this.predecessorModule.updatedRecordsDateByPredecessor(flatDataCollection);
            }
        }
        if (this.enableValidation) {
            this.dataOperation.calculateProjectDates();
            this.timelineModule.validateTimelineProp();
            this.dataOperation.updateGanttData();
        }
        if (isChange) {
            if (this.dataSource instanceof Object && isCountRequired(this)) {
                var count = getValue('count', this.dataSource);
                this.treeGrid.dataSource = { result: this.flatData, count: count };
            }
            else {
                this.treeGrid.setProperties({ dataSource: this.flatData }, false);
            }
            if (!isNullOrUndefined(this.selectionModule)) {
                this.treeGrid.setProperties({ selectedRowIndex: this.selectedRowIndex }, false);
            }
        }
        else {
            this.treeGridPane.classList.remove('e-temp-content');
            if (!isNullOrUndefined(this.treeGridPane.querySelector('.e-gantt-temp-header'))) {
                remove(this.treeGridPane.querySelector('.e-gantt-temp-header'));
            }
            this.notify('dataReady', {});
            if (this.enableContextMenu) {
                this.notify('initiate-contextMenu', {});
            }
            var height = (!isNullOrUndefined(document.body.className) && document.body.className.includes('e-bigger')) ? (this.rowHeight === 36) ? 46 : this.rowHeight : this.rowHeight;
            this.rowHeight = isNullOrUndefined(this.rowHeight) ? 36 : height;
            this.renderTreeGrid();
            this.wireEvents();
            this.notify('initPredessorDialog', {});
        }
        if (!this.isFromOnPropertyChange) {
            this.splitterModule.updateSplitterPosition();
        }
        if ((this.gridLines === 'Vertical' || this.gridLines === 'Both') && (!this.dayMarkersModule)) {
            this.renderChartVerticalLines();
        }
    };
    Gantt.prototype.removeCriticalPathStyles = function () {
        var ganttChartElement = this.ganttChartModule.chartElement;
        removeClass(ganttChartElement.querySelectorAll('.e-gantt-child-taskbar-inner-div'), cls.criticalChildTaskBarInnerDiv);
        removeClass(ganttChartElement.querySelectorAll('.e-gantt-child-progressbar-inner-div'), cls.criticalChildProgressBarInnerDiv);
        removeClass(ganttChartElement.querySelectorAll('.e-critical-milestone'), cls.criticalMilestone);
        removeClass(this.element.querySelectorAll('.e-connector-line'), cls.criticalConnectorLineSVG);
        removeClass(this.element.querySelectorAll('.e-connector-line-arrow'), cls.criticalConnectorArrowSVG);
    };
    Gantt.prototype.wireEvents = function () {
        if (this.allowKeyboard) {
            this.keyboardModule = new KeyboardEvents(this.element, {
                keyAction: this.keyActionHandler.bind(this),
                keyConfigs: this.keyConfig,
                eventName: 'keydown'
            });
        }
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        EventHandler.add(window, 'resize', this.windowResize, this);
        EventHandler.add(document.body, 'keydown', this.keyDownHandler, this);
    };
    Gantt.prototype.unwireEvents = function () {
        if (this.keyboardModule) {
            this.keyboardModule.destroy();
            this.keyboardModule = null;
        }
        /* eslint-disable-next-line */
        EventHandler.remove(window, 'resize', this.windowResize);
        EventHandler.remove(document.body, 'keydown', this.keyDownHandler);
    };
    Gantt.prototype.keyDownHandler = function (e) {
        if (e.altKey) {
            if (e.keyCode === 74) { //alt j
                this.ganttChartModule.manageFocus(this.treeGrid.element.childNodes[1], 'remove', false);
                this.ganttChartModule.manageFocus(this.element, 'add', false);
            }
        }
    };
    /**
     * Method trigger while user perform window resize.
     *
     * @returns {void} .
     * @private
     */
    Gantt.prototype.windowResize = function () {
        var _this = this;
        if (!isNullOrUndefined(this.element)) {
            this.updateContentHeight();
            this.ganttChartModule.updateWidthAndHeight(); // Updating chart scroll conatiner height for row mismatch
            this.treeGridModule.ensureScrollBar();
            if (this.predecessorModule && this.taskFields.dependency) {
                this.updateRowHeightInConnectorLine(this.updatedConnectorLineCollection);
                this.connectorLineModule.renderConnectorLines(this.updatedConnectorLineCollection);
            }
            var criticalModule = this.criticalPathModule;
            if (this.enableCriticalPath && criticalModule && criticalModule.criticalPathCollection) {
                this.criticalPathModule.criticalConnectorLine(criticalModule.criticalPathCollection, criticalModule.detailPredecessorCollection, true, criticalModule.predecessorCollectionTaskIds);
            }
            this.calculateDimensions();
            var pane1 = this.splitterModule.splitterObject.element.querySelectorAll('.e-pane')[0];
            var pane2 = this.splitterModule.splitterObject.element.querySelectorAll('.e-pane')[1];
            this.splitterModule.splitterPreviousPositionGrid = pane1.scrollWidth + 1 + 'px';
            this.splitterModule.splitterPreviousPositionChart = pane2.scrollWidth + 1 + 'px';
            this.splitterModule.splitterObject.paneSettings[1].size = (this.ganttWidth - parseInt(this.splitterModule.splitterPreviousPositionGrid, 10) - this.splitterSettings.separatorSize) + 'px';
            if (this.timelineModule.isZoomedToFit) {
                setTimeout(function () {
                    _this.timelineModule.processZoomToFit();
                }, 0);
            }
        }
        if (this.dayMarkersModule && this.dayMarkersModule['eventMarkerRender']) {
            this.dayMarkersModule['eventMarkerRender'].updateContainerHeight();
        }
        if (this.enableTimelineVirtualization) {
            this.timelineModule.refreshTimeline();
        }
    };
    Gantt.prototype.keyActionHandler = function (e) {
        if (this.enableContextMenu && this.contextMenuModule && (e.action === 'downArrow' || e.action === 'upArrow') && document.getElementById(this.element.id + '_contextmenu') && this['args']) {
            var firstMenuItem = this['args'];
            if (!isNullOrUndefined(firstMenuItem)) {
                (firstMenuItem).focus();
            }
        }
        if ((e.target && (e.action === 'downArrow' || e.action === 'upArrow') && e.target === this.element.querySelector('.e-rowcell')) ||
            (e.target && e.action === 'escape' && this.treeGrid.grid.columnMenuModule &&
                this.treeGrid.grid.columnMenuModule['columnMenu'].element.style.display === 'block')) {
            this.treeGrid.grid.notify('key-pressed', e);
        }
        else {
            this.focusModule.onKeyPress(e);
        }
    };
    /**
     * Method for updating row height value in connector line collections
     *
     * @param {IConnectorLineObject[]} collection  -Defines the CollectorLine collection.
     * @returns {void} .
     * @private
     */
    Gantt.prototype.updateRowHeightInConnectorLine = function (collection) {
        if (collection && collection.length) {
            var rowHeight = !isNullOrUndefined(this.ganttChartModule) && this.ganttChartModule.getChartRows()[0]
                && this.ganttChartModule.getChartRows()[0].getBoundingClientRect().height;
            if (rowHeight && !isNaN(rowHeight)) {
                for (var count = 0; count < collection.length; count++) {
                    collection[count].rowHeight = rowHeight;
                }
            }
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    Gantt.prototype.renderToolbar = function () {
        if (!isNullOrUndefined(this.toolbarModule)) {
            this.toolbarModule.renderToolbar();
            this.toolbarModule.refreshToolbarItems();
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    Gantt.prototype.renderTreeGrid = function () {
        this.treeGridModule.renderTreeGrid();
    };
    Gantt.prototype.updateCurrentViewData = function () {
        var _this = this;
        this.currentViewData = this.treeGrid.getCurrentViewRecords().slice();
        if (this.currentViewData.length > 0 && this.loadChildOnDemand && this.taskFields.hasChildMapping) {
            this.isLoad = true;
            this.flatData = [];
            this.dataOperation.taskIds = [];
            this.ids = [];
            this.dataOperation.recordIndex = 0;
            this.dataOperation.dataArray = this.currentViewData;
            this.dataOperation.cloneDataSource();
            if (this.predecessorModule && this.taskFields.dependency) {
                this.predecessorModule['parentIds'] = [];
                this.predecessorModule['parentRecord'] = [];
                this.predecessorModule.updatePredecessors();
            }
            /* eslint-disable-next-line */
            var gridData = this.treeGrid.grid.contentModule['rows'];
            /* eslint-disable-next-line */
            var data = gridData.filter(function (x) {
                if (x['data'][_this.taskFields.id] === _this.flatData[0].ganttProperties.taskId) {
                    return x;
                }
            })[0];
            var index = data['index'];
            for (var i = 0; i < this.flatData.length; i++) {
                this.flatData[i].index = index;
                index++;
            }
            this.currentViewData = this.flatData;
            this.treeGrid.grid.currentViewData = this.flatData;
            if (!isNullOrUndefined(this.treeGrid['virtualScrollModule'])) {
                this.treeGrid['virtualScrollModule'].visualData = this.flatData;
                this.updatedRecords = this.flatData;
            }
        }
    };
    /**
     * @param {IGanttData} records -Defines the delete record collections.
     * @returns {IGanttData} .
     * @private
     */
    Gantt.prototype.getRecordFromFlatdata = function (records) {
        var updatedRecord = [];
        for (var i = 0; i < records.length; i++) {
            updatedRecord.push(this.getTaskByUniqueID(records[i].uniqueID));
        }
        return updatedRecord;
    };
    /**
     * @param {object} args -Update the gantt element content height.
     * @returns {void} .
     * @private
     */
    Gantt.prototype.updateContentHeight = function (args) {
        if ((!this.allowTaskbarOverlap && !this.ganttChartModule.isCollapseAll && !this.ganttChartModule.isExpandAll) && !this.isLoad) {
            return;
        }
        else {
            if (this.virtualScrollModule && this.enableVirtualization && !isNullOrUndefined(args)) {
                var length_1 = getValue('result.length', args);
                this.contentHeight = length_1 * this.rowHeight;
            }
            else {
                var expandedRecords = this.virtualScrollModule && this.enableVirtualization ?
                    this.currentViewData : this.getExpandedRecords(this.currentViewData);
                this.expandedRecords = expandedRecords;
                var height = void 0;
                var chartRow = (!isNullOrUndefined(this.ganttChartModule) &&
                    !isNullOrUndefined(this.ganttChartModule.getChartRows())) ? this.ganttChartModule.getChartRows()[0] : null;
                if (!isNullOrUndefined(chartRow) && chartRow.offsetHeight > 0) {
                    height = chartRow.offsetHeight;
                }
                else {
                    height = this.rowHeight;
                }
                this.contentHeight = expandedRecords.length * height;
            }
        }
    };
    /**
     * To get expand status.
     *
     * @param {IGanttData} data .
     * @returns {boolean} .
     * @private
     */
    Gantt.prototype.getExpandStatus = function (data) {
        var parentRecord = this.getParentTask(data.parentItem);
        if (!isNullOrUndefined(parentRecord)) {
            if (parentRecord.expanded === false) {
                return false;
            }
            else if (parentRecord.parentItem) {
                var parentData = this.getParentTask(parentRecord.parentItem);
                if (parentData.expanded === false) {
                    return false;
                }
                else {
                    return this.getExpandStatus(this.getParentTask(parentRecord.parentItem));
                }
            }
            else {
                return true;
            }
        }
        else {
            return true;
        }
    };
    /**
     * Get expanded records from given record collection.
     *
     * @param {IGanttData[]} records - Defines record collection.
     * @returns {IGanttData[]} .
     */
    Gantt.prototype.getExpandedRecords = function (records) {
        var _this = this;
        if (isNullOrUndefined(records)) {
            return [];
        }
        var expandedRecords = records.filter(function (record) {
            return _this.getExpandStatus(record) === true;
        });
        this.expandedRecords = expandedRecords;
        return expandedRecords;
    };
    /**
     * Getting the Zooming collections of the Gantt control
     *
     * @returns {ZoomTimelineSettings} .
     * @private
     */
    Gantt.prototype.getZoomingLevels = function () {
        var _WeekStartDay = this.timelineSettings.weekStartDay;
        var zoomingLevels = [
            {
                topTier: { unit: 'Year', format: 'yyyy', count: 50 },
                bottomTier: { unit: 'Year', format: 'yyyy', count: 10 }, timelineUnitSize: 99, level: 0,
                timelineViewMode: 'Year', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Year', format: 'yyyy', count: 20 },
                bottomTier: { unit: 'Year', format: 'yyyy', count: 5 }, timelineUnitSize: 99, level: 1,
                timelineViewMode: 'Year', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Year', format: 'yyyy', count: 5 },
                bottomTier: { unit: 'Year', format: 'yyyy', count: 1 }, timelineUnitSize: 99, level: 2,
                timelineViewMode: 'Year', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Year', format: 'MMM, yy', count: 1 },
                bottomTier: {
                    unit: 'Month', formatter: this.displayHalfValue, count: 6
                }, timelineUnitSize: 66, level: 3,
                timelineViewMode: 'Year', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Year', format: 'MMM, yy', count: 1 },
                bottomTier: {
                    unit: 'Month', formatter: this.displayHalfValue, count: 6
                }, timelineUnitSize: 99, level: 4,
                timelineViewMode: 'Year', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Year', format: 'MMM, yy', count: 1 },
                bottomTier: {
                    unit: 'Month', formatter: this.displayQuarterValue, count: 3
                }, timelineUnitSize: 66, level: 5,
                timelineViewMode: 'Year', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Year', format: 'yyyy', count: 1 },
                bottomTier: {
                    unit: 'Month', formatter: this.displayQuarterValue, count: 3
                }, timelineUnitSize: 99, level: 6,
                timelineViewMode: 'Year', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Year', format: 'yyyy', count: 1 },
                bottomTier: { unit: 'Month', format: 'MMM yyyy', count: 1 }, timelineUnitSize: 99, level: 7,
                timelineViewMode: 'Year', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Month', format: 'MMM, yy', count: 1 },
                bottomTier: { unit: 'Week', format: 'dd', count: 1 }, timelineUnitSize: 33, level: 8,
                timelineViewMode: 'Month', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
                bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 66, level: 9,
                timelineViewMode: 'Month', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Month', format: 'MMM, yyyy', count: 1 },
                bottomTier: { unit: 'Week', format: 'dd MMM', count: 1 }, timelineUnitSize: 99, level: 10,
                timelineViewMode: 'Month', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
                bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 33, level: 11,
                timelineViewMode: 'Week', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
                bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 66, level: 12,
                timelineViewMode: 'Week', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Week', format: 'MMM dd, yyyy', count: 1 },
                bottomTier: { unit: 'Day', format: 'd', count: 1 }, timelineUnitSize: 99, level: 13,
                timelineViewMode: 'Week', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
                bottomTier: { unit: 'Hour', format: 'hh a', count: 12 }, timelineUnitSize: 66, level: 14,
                timelineViewMode: 'Day', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
                bottomTier: { unit: 'Hour', format: 'hh a', count: 12 }, timelineUnitSize: 99, level: 15,
                timelineViewMode: 'Day', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
                bottomTier: { unit: 'Hour', format: 'hh a', count: 6 }, timelineUnitSize: 66, level: 16,
                timelineViewMode: 'Day', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
                bottomTier: { unit: 'Hour', format: 'hh a', count: 6 }, timelineUnitSize: 99, level: 17,
                timelineViewMode: 'Day', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
                bottomTier: { unit: 'Hour', format: 'hh a', count: 2 }, timelineUnitSize: 66, level: 18,
                timelineViewMode: 'Day', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
                bottomTier: { unit: 'Hour', format: 'hh a', count: 2 }, timelineUnitSize: 99, level: 19,
                timelineViewMode: 'Day', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
                bottomTier: { unit: 'Hour', format: 'hh a', count: 1 }, timelineUnitSize: 66, level: 20,
                timelineViewMode: 'Day', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Day', format: 'E dd yyyy', count: 1 },
                bottomTier: { unit: 'Hour', format: 'hh a', count: 1 }, timelineUnitSize: 99, level: 21,
                timelineViewMode: 'Day', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Hour', format: 'ddd MMM, h a', count: 1 },
                bottomTier: { unit: 'Minutes', format: 'mm', count: 30 }, timelineUnitSize: 66, level: 22,
                timelineViewMode: 'Hour', weekStartDay: 0, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Hour', format: 'ddd MMM, h a', count: 1 },
                bottomTier: { unit: 'Minutes', format: 'mm', count: 15 }, timelineUnitSize: 66, level: 23,
                timelineViewMode: 'Hour', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            },
            {
                topTier: { unit: 'Hour', format: 'ddd MMM, h a', count: 1 },
                bottomTier: { unit: 'Minutes', format: 'mm', count: 1 }, timelineUnitSize: 66, level: 24,
                timelineViewMode: 'Hour', weekStartDay: _WeekStartDay, updateTimescaleView: true, weekendBackground: null, showTooltip: true
            }
        ];
        return zoomingLevels;
    };
    Gantt.prototype.displayQuarterValue = function (date) {
        var month = date.getMonth();
        if (month >= 0 && month <= 2) {
            return 'Q1';
        }
        else if (month >= 3 && month <= 5) {
            return 'Q2';
        }
        else if (month >= 6 && month <= 8) {
            return 'Q3';
        }
        else {
            return 'Q4';
        }
    };
    Gantt.prototype.displayHalfValue = function (date) {
        var month = date.getMonth();
        if (month >= 0 && month <= 5) {
            return 'H1';
        }
        else {
            return 'H2';
        }
    };
    /**
     *
     * @param {Date} date .
     * @param {string} format .
     * @returns {string} .
     */
    Gantt.prototype.getFormatedDate = function (date, format) {
        if (isNullOrUndefined(date)) {
            return null;
        }
        if (isNullOrUndefined(format)) {
            format = this.getDateFormat();
        }
        return this.globalize.formatDate(date, { format: format });
    };
    /**
     * Get duration value as string combined with duration and unit values.
     *
     * @param {number} duration - Defines the duration.
     * @param {string} durationUnit - Defines the duration unit.
     * @returns {string} .
     */
    Gantt.prototype.getDurationString = function (duration, durationUnit) {
        var value = this.dateValidationModule.getDurationString(duration, durationUnit);
        return value;
    };
    /**
     * Get work value as string combined with work and unit values.
     *
     * @param {number} work - Defines the work value.
     * @param {string} workUnit - Defines the work unit.
     * @returns {string} .
     */
    Gantt.prototype.getWorkString = function (work, workUnit) {
        var value = this.dateValidationModule.getWorkString(work, workUnit);
        return value;
    };
    Gantt.prototype.updateTreeColumns = function () {
        var temp;
        // let field: string;
        var gridColumns = this.treeGrid.grid.getColumns();
        if (this.treeColumnIndex !== -1 && this.columns[this.treeColumnIndex] &&
            !isNullOrUndefined(this.columns[this.treeColumnIndex]['template'])) {
            temp = this.columns[this.treeColumnIndex]['template'];
            // field = this.columns[this.treeColumnIndex]['field'];
        }
        var gridColumn;
        for (var i = 0; i < gridColumns.length; i++) {
            gridColumn = {};
            for (var j = 0; j < this.columns.length; j++) {
                if (this.columns[j]['field'] === gridColumns[i].field) {
                    for (var _i = 0, _a = Object.keys(this.columns[j]); _i < _a.length; _i++) {
                        var prop = _a[_i];
                        if (!isUndefined(this.columns[j][prop])) {
                            gridColumn[prop] = gridColumns[i][prop];
                        }
                        gridColumn.visible = gridColumns[i].visible;
                        gridColumn.width = gridColumns[i].width;
                    }
                    this.columns[j] = (gridColumn);
                    if (this.columns[j]['type'] !== 'checkbox' && (!isNullOrUndefined(temp) && temp !== '')) {
                        this.columns[j]['template'] = temp;
                    }
                }
            }
        }
        if (this.columns.length > 0) {
            this.treeGrid.setProperties({ columns: this.columns }, true);
        }
    };
    /**
     *
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    Gantt.prototype.treeDataBound = function (args) {
        var _this = this;
        if (this.isLoad && this.undoRedoModule) {
            if (this.sortSettings.columns.length > 0) {
                this.undoRedoModule['previousSortedColumns'] = this.sortSettings.columns;
            }
            else if (this.searchSettings.key !== '') {
                this.undoRedoModule['searchString'] = this.searchSettings.key;
            }
        }
        this.element.getElementsByClassName('e-chart-root-container')[0]['style'].height = '100%';
        // let gridHeight: string = this.element.getElementsByClassName('e-gridcontent')[0]['style'].height;
        var gridContent = this.element.getElementsByClassName('e-gridcontent')[0].childNodes[0];
        gridContent.setAttribute('tabindex', '0');
        var treeGridrole = this.element.getElementsByClassName('e-gridcontent')[0].childNodes[0].childNodes[0];
        treeGridrole.setAttribute('role', 'treegrid');
        var timelineContainer = this.element.getElementsByClassName('e-timeline-header-container')[0]['offsetHeight'];
        // gridHeight = 'calc(100% - ' + timelineContainer + 'px)';
        // this.element.getElementsByClassName('e-chart-scroll-container e-content')[0]['style'].height = 'calc(100% - ' + timelineContainer + 'px)';
        var scrollContainer = this.element.getElementsByClassName('e-chart-scroll-container e-content')[0];
        scrollContainer['style'].height = 'calc(100% - ' + timelineContainer + 'px)';
        scrollContainer.setAttribute('tabindex', '0');
        if (!isNullOrUndefined(this.toolbarModule) && !isNullOrUndefined(this.toolbarModule.element)) {
            this.splitterElement.style.height = 'calc(100% - ' + this.toolbarModule.element.offsetHeight + 'px)';
        }
        else {
            this.splitterElement.style.height = '100%';
        }
        if (this.filterSettings && this.filterSettings['properties'] && this.filterSettings['properties'].columns) {
            this.filterSettings['properties'].columns.forEach(function (column) {
                var searchString = column.properties.field;
                var matchedObject = null;
                for (var i = 0; i < _this.treeGrid.columns.length; i++) {
                    var treeColumn = _this.treeGrid.columns[i];
                    if (treeColumn['field'] === searchString) {
                        matchedObject = treeColumn;
                        break;
                    }
                }
                if (matchedObject && column.properties.uid !== matchedObject['uid']) {
                    column.properties.uid = matchedObject['uid'];
                }
            });
        }
        if (this.isLoad) {
            if (this.enablePersistence) {
                this.updateTreeColumns();
            }
            this.updateCurrentViewData();
            if (!this.enableVirtualization) {
                this.updateContentHeight();
            }
            else if (this.virtualScrollModule && this.enableVirtualization) {
                this.ganttChartModule.virtualRender.adjustTable();
                this.ganttChartModule.scrollObject.updateTopPosition();
            }
            if (!this.isTreeGridRendered) {
                this.isTreeGridRendered = true;
                // let toolbarHeight: number = 0;
                // if (!isNullOrUndefined(this.toolbarModule) && !isNullOrUndefined(this.toolbarModule.element)) {
                //     toolbarHeight = this.toolbarModule.element.offsetHeight;
                // }
                if (this.timelineModule.isSingleTier) {
                    this.element.classList.add(cls.ganttSingleTimeline);
                }
                else {
                    this.element.classList.remove(cls.ganttSingleTimeline);
                }
                var timelineContainer_1 = this.element.getElementsByClassName('e-timeline-header-container')[0]['offsetHeight'];
                scrollContainer['style'].height = 'calc(100% - ' + timelineContainer_1 + 'px)';
                this.treeGrid.setProperties({ height: '100%' }, false);
                this.notify('tree-grid-created', {});
                this.createGanttPopUpElement();
                if (!isNullOrUndefined(this.loadingIndicator) && this.loadingIndicator.indicatorType === 'Shimmer') {
                    this.hideMaskRow();
                }
                else {
                    this.hideSpinner();
                }
                setValue('isGanttCreated', true, args);
                this.renderComplete();
            }
        }
        else {
            this.getCurrentRecords(args);
        }
        if (this.loadChildOnDemand && this.taskFields.hasChildMapping) {
            this.updateContentHeight();
        }
        if (this.enableCriticalPath && this.criticalPathModule) {
            this.criticalPathModule.showCriticalPath(this.enableCriticalPath);
        }
        this.notify('recordsUpdated', {});
        for (var i = 0; i < document.getElementsByClassName('e-timeline-header-table-container').length; i++) {
            for (var j = 0; j < document.getElementsByClassName('e-timeline-header-table-container')[i].children[0].children[0].children.length; j++) {
                var childElement = document.getElementsByClassName('e-timeline-header-table-container')[i].children[0].children[0].children[j].children[0];
                if (childElement) {
                    childElement.setAttribute('tabindex', '-1');
                }
            }
        }
        var criticalModule = this.criticalPathModule;
        if (this.enableCriticalPath && criticalModule && criticalModule.criticalPathCollection) {
            this.criticalPathModule.criticalConnectorLine(criticalModule.criticalPathCollection, criticalModule.detailPredecessorCollection, true, criticalModule.predecessorCollectionTaskIds);
        }
        this.initialChartRowElements = this.ganttChartModule.getChartRows();
        this.isLoad = false;
        this.isExpandPerformed = !this.enableVirtualization ? false : this.isExpandPerformed;
        if (!this.isExpandPerformed) {
            this.previousFlatData = extend([], this.flatData, [], true);
        }
        this.trigger('dataBound', args);
    };
    /**
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    Gantt.prototype.getCurrentRecords = function (args) {
        if (this.predecessorModule && this.taskFields.dependency) {
            this.connectorLineModule.removePreviousConnectorLines(this.currentViewData);
        }
        this.updateCurrentViewData();
        if (!this.enableVirtualization) {
            this.updateContentHeight();
        }
        // this.chartRowsModule.refreshGanttRows();
        if (this.virtualScrollModule && this.enableVirtualization) {
            this.ganttChartModule.virtualRender.adjustTable();
            this.ganttChartModule.scrollObject.updateTopPosition();
        }
    };
    /**
     * Called internally, if any of the property value changed.
     *
     * @param {GanttModel} newProp - Defines the New GanttModel.
     * @param {GanttModel} oldProp - Defines the old GanttModel.
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    Gantt.prototype.onPropertyChanged = function (newProp, oldProp) {
        var isRefresh = false;
        // eslint-disable-next-line
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'allowSelection':
                case 'allowRowDragAndDrop':
                case 'allowFiltering':
                case 'showColumnMenu':
                case 'allowResizing':
                case 'allowReordering':
                case 'allowSorting':
                case 'enableImmutableMode':
                    this.treeGrid[prop] = this[prop];
                    this.treeGrid.dataBind();
                    break;
                case 'workWeek':
                    this.dataOperation.getNonWorkingDayIndex();
                    this.dataOperation.reUpdateGanttData();
                    this.chartRowsModule.initiateTemplates();
                    if (this.taskFields.dependency) {
                        this.predecessorModule.updatedRecordsDateByPredecessor();
                    }
                    this.chartRowsModule.refreshGanttRows();
                    this.treeGrid.refreshColumns();
                    this.timelineModule.refreshTimeline();
                    break;
                case 'toolbar':
                    this.notify('ui-toolbarupdate', { module: 'toolbar', properties: newProp });
                    break;
                case 'columnMenuItems':
                    this.treeGrid.grid.columnMenuItems =
                        getActualProperties(this.columnMenuItems);
                    break;
                case 'eventMarkers':
                case 'highlightWeekends':
                    this.notify('ui-update', { module: 'day-markers', properties: newProp });
                    break;
                case 'sortSettings':
                    this.treeGrid.sortSettings = getActualProperties(this.sortSettings);
                    this.treeGrid.dataBind();
                    break;
                case 'timelineSettings':
                    this.timelineModule.refreshTimeline();
                    break;
                case 'rowHeight':
                case 'taskbarHeight':
                    this.treeGrid.rowHeight = this.rowHeight;
                    this.treeGrid.dataBind();
                    this.chartRowsModule.initiateTemplates();
                    this.timelineModule.updateChartByNewTimeline();
                    if (this.taskFields.dependency) {
                        this.ganttChartModule.reRenderConnectorLines();
                    }
                    break;
                case 'timezone':
                    this.dataOperation.checkDataBinding(true);
                    break;
                case 'enableCriticalPath':
                    if (!isNullOrUndefined(this.loadingIndicator) && this.loadingIndicator.indicatorType === 'Shimmer') {
                        this.hideMaskRow();
                    }
                    else {
                        this.hideSpinner();
                    }
                    if (this.enableCriticalPath && this.criticalPathModule) {
                        this.criticalPathModule.showCriticalPath(this.enableCriticalPath);
                        var criticalModule = this.criticalPathModule;
                        if (criticalModule.criticalPathCollection) {
                            this.criticalPathModule.criticalConnectorLine(criticalModule.criticalPathCollection, criticalModule.detailPredecessorCollection, true, criticalModule.predecessorCollectionTaskIds);
                        }
                    }
                    else {
                        this.removeCriticalPathStyles();
                    }
                    break;
                case 'filterSettings':
                    if (isNullOrUndefined(newProp.filterSettings)) {
                        this.filterSettings.columns = [];
                    }
                    this.treeGrid.filterSettings = getActualProperties(this.filterSettings);
                    this.treeGrid.dataBind();
                    break;
                case 'gridLines':
                    this.treeGrid.gridLines = this.gridLines;
                    this.treeGrid.dataBind();
                    this.renderChartGridLines();
                    break;
                case 'tooltipSettings':
                    if (this.tooltipModule.toolTipObj) {
                        this.tooltipModule.toolTipObj.destroy();
                    }
                    this.tooltipModule.createTooltip();
                    break;
                case 'splitterSettings':
                    this.splitterModule.updateSplitterPosition();
                    break;
                case 'selectionSettings':
                    this.treeGrid.selectionSettings = getActualProperties(this.selectionSettings);
                    this.treeGrid.grid.selectionSettings.enableToggle = this.selectionSettings.enableToggle;
                    this.treeGrid.dataBind();
                    break;
                case 'searchSettings':
                    if (newProp.searchSettings.key !== ('' || undefined)) {
                        this.treeGrid.grid.searchSettings = getActualProperties(this.searchSettings);
                        this.treeGrid.grid.dataBind();
                    }
                    this.treeGrid.searchSettings = getActualProperties(this.searchSettings);
                    this.treeGrid.dataBind();
                    if (this.toolbarModule) {
                        this.toolbarModule.updateSearchTextBox();
                    }
                    break;
                case 'labelSettings':
                case 'renderBaseline':
                case 'baselineColor':
                    this.isFromRenderBaseline = true;
                    this.chartRowsModule.initiateTemplates();
                    this.chartRowsModule.refreshGanttRows();
                    this.isFromRenderBaseline = false;
                    break;
                case 'resourceIDMapping':
                case 'resourceNameMapping':
                case 'resources':
                    this.dataOperation.reUpdateResources();
                    this.treeGrid.refreshColumns();
                    this.chartRowsModule.initiateTemplates();
                    this.chartRowsModule.refreshGanttRows();
                    break;
                case 'includeWeekend':
                case 'allowUnscheduledTasks':
                case 'holidays':
                    this.isLoad = true;
                    if (prop === 'holidays') {
                        this.totalHolidayDates = this.dataOperation.getHolidayDates();
                        this.notify('ui-update', { module: 'day-markers', properties: newProp });
                    }
                    this.dataOperation.reUpdateGanttData();
                    this.treeGrid.refreshColumns();
                    this.chartRowsModule.initiateTemplates();
                    this.chartRowsModule.refreshGanttRows();
                    this.isLoad = false;
                    if (this.taskFields.dependency) {
                        this.predecessorModule.updatedRecordsDateByPredecessor();
                        this.treeGrid.refreshColumns();
                        this.chartRowsModule.refreshGanttRows();
                    }
                    break;
                case 'dayWorkingTime':
                case 'weekWorkingTime':
                    isRefresh = true;
                    break;
                case 'addDialogFields':
                case 'editDialogFields':
                    if (this.editModule && this.editModule.dialogModule) {
                        this.editModule.dialogModule.processDialogFields();
                    }
                    break;
                case 'columns':
                    this.treeGridModule.treeGridColumns = [];
                    this.treeGridModule.validateGanttColumns();
                    this.treeGrid.columns = this.treeGridModule.treeGridColumns;
                    this.treeGrid.refreshColumns();
                    this.chartRowsModule.initiateTemplates();
                    this.timelineModule.updateChartByNewTimeline();
                    break;
                case 'width':
                case 'height':
                    this.reUpdateDimention(prop);
                    break;
                case 'editSettings':
                    this.treeGrid.editSettings.allowAdding = this.editSettings.allowAdding;
                    this.treeGrid.editSettings.allowDeleting = this.editSettings.allowDeleting;
                    this.treeGrid.editSettings.showDeleteConfirmDialog = this.editSettings.showDeleteConfirmDialog;
                    this.treeGrid.editSettings.allowEditing = this.editSettings.allowEditing;
                    this.treeGrid.editSettings.allowNextRowEdit = this.editSettings.allowNextRowEdit;
                    if (!isNullOrUndefined(this.editModule)) {
                        this.editModule.reUpdateEditModules();
                    }
                    if (!isNullOrUndefined(this.toolbarModule)) {
                        this.toolbarModule.refreshToolbarItems();
                    }
                    break;
                case 'connectorLineBackground':
                case 'connectorLineWidth':
                    if (this.taskFields.dependency) {
                        this.connectorLineModule.initPublicProp();
                        this.ganttChartModule.reRenderConnectorLines();
                    }
                    break;
                case 'treeColumnIndex':
                    this.treeGrid.treeColumnIndex = this.treeColumnIndex;
                    break;
                case 'projectStartDate':
                case 'projectEndDate':
                    this.timelineModule.isZoomToFit = false;
                    this.dataOperation.calculateProjectDates();
                    this.updateProjectDates(this.cloneProjectStartDate, this.cloneProjectEndDate, this.isTimelineRoundOff);
                    break;
                case 'selectedRowIndex':
                    if (!isNullOrUndefined(this.selectionModule)) {
                        this.selectionModule.selectRowByIndex();
                    }
                    break;
                case 'dataSource':
                    if (this.isReact) {
                        this['clearTemplate'](['TaskbarTemplate', 'ParentTaskbarTemplate', 'MilestoneTemplate', 'TaskLabelTemplate', 'RightLabelTemplate', 'LeftLabelTemplate']);
                    }
                    this.closeGanttActions();
                    if (this.dataSource instanceof Object && isCountRequired(this)) {
                        // In order to bind the observable data at load time, hasChildMapping is necessary to be mapped.
                        this.treeGrid.hasChildMapping = 'isParent';
                        var count = getValue('count', this.dataSource);
                        this.treeGrid.dataSource = { result: this.flatData, count: count };
                    }
                    else {
                        this.treeGrid.hasChildMapping = null;
                    }
                    this.dataOperation.checkDataBinding(true);
                    break;
                case 'enableContextMenu':
                case 'contextMenuItems':
                    if (this.enableContextMenu || prop === 'contextMenuItems') {
                        this.notify('reRender-contextMenu', { module: 'contextMenu', enable: true });
                    }
                    else {
                        this.treeGrid.contextMenuItems = [];
                    }
                    this.treeGrid.dataBind();
                    break;
                case 'currencyCode':
                case 'locale':
                case 'enableRtl':
                case 'readOnly':
                case 'viewType':
                case 'taskFields':
                case 'allowTaskbarDragAndDrop':
                case 'allowTaskbarOverlap':
                case 'allowParentDependency':
                case 'enableMultiTaskbar':
                    if (prop === 'locale') {
                        this.isLocaleChanged = true;
                    }
                    if (prop === 'taskFields') {
                        if (!isNullOrUndefined(newProp.taskFields.child)) {
                            return;
                        }
                    }
                    if (prop !== 'allowTaskbarDragAndDrop') {
                        isRefresh = true;
                    }
                    break;
                case 'validateManualTasksOnLinking':
                    this.validateManualTasksOnLinking = newProp.validateManualTasksOnLinking;
                    break;
                case 'showOverAllocation':
                    this.updateOverAllocationCotainer();
                    break;
            }
        }
        if (isRefresh) {
            if (this.isLoad && this.contentMaskTable) {
                this.contentMaskTable = null;
            }
            this.refresh();
        }
    };
    Gantt.prototype.updateOverAllocationCotainer = function () {
        if (this.showOverAllocation) {
            this.ganttChartModule.renderOverAllocationContainer();
        }
        else {
            var rangeContainer = this.element.querySelector('.' + cls.rangeContainer);
            if (rangeContainer) {
                rangeContainer.innerHTML = '';
            }
        }
    };
    /**
     * Returns the properties to be maintained in persisted state.
     *
     * @returns {string} .
     * @private
     */
    Gantt.prototype.getPersistData = function () {
        var keyEntity = ['sortSettings',
            'filterSettings', 'columns', 'searchSettings', 'selectedRowIndex', 'treeColumnIndex', 'currentZoomingLevel', 'cloneProjectStartDate', 'cloneProjectEndDate', 'splitterSettings'];
        var ignoreOnPersist = {
            filterSettings: ['type', 'mode', 'showFilterBarStatus', 'immediateModeDelay', 'ignoreAccent', 'hierarchyMode'],
            searchSettings: ['fields', 'operator', 'ignoreCase'],
            sortSettings: [], columns: [], selectedRowIndex: []
        };
        var ignoreOnColumn = ['filter', 'edit', 'filterBarTemplate', 'headerTemplate', 'template',
            'commandTemplate', 'commands', 'dataSource'];
        for (var i = 0; i < keyEntity.length; i++) {
            var currentObject = this[keyEntity[i]];
            for (var k = 0, val = ignoreOnPersist[keyEntity[i]]; (!isNullOrUndefined(val) && k < val.length); k++) {
                var objVal = val[k];
                delete currentObject[objVal];
            }
        }
        this.ignoreInArrays(ignoreOnColumn, this.columns);
        return this.addOnPersist(keyEntity);
    };
    Gantt.prototype.ignoreInArrays = function (ignoreOnColumn, columns) {
        for (var i = 0; i < columns.length; i++) {
            this.ignoreInColumn(ignoreOnColumn, columns[i]);
        }
    };
    Gantt.prototype.ignoreInColumn = function (ignoreOnColumn, column) {
        for (var i = 0; i < ignoreOnColumn.length; i++) {
            delete column[ignoreOnColumn[i]];
            column.filter = {};
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    Gantt.prototype.destroy = function () {
        this.notify('destroy', {});
        this.unwireEvents();
        if (!isNullOrUndefined(this.validationDialogElement) && !this.validationDialogElement.isDestroyed) {
            this.validationDialogElement.destroy();
        }
        var modules = ['ganttChartModule', 'timelineModule', 'chartRowsModule',
            'treeGridModule', 'ganttDataUpdatesModule', 'dateValidationModule', 'tooltipModule'];
        for (var i = 0; i < modules.length; i++) {
            if (this[modules[i]]) {
                this[modules[i]] = null;
            }
        }
        if (this.keyboardModule) {
            this.keyboardModule.destroy();
        }
        if (this.editModule && this.editModule.dialogModule) {
            this.editModule.dialogModule.destroy();
        }
        if (this.splitterModule) {
            this.splitterModule['destroy']();
        }
        if (this.toolbarModule && this.toolbarModule.toolbar) {
            this.toolbarModule.toolbar.destroy();
        }
        if (!isNullOrUndefined(this.dayMarkersModule)) {
            if (!isNullOrUndefined(this.dayMarkersModule['eventMarkerRender']) && !isNullOrUndefined(this.dayMarkersModule['eventMarkerRender'].eventMarkersContainer)) {
                this.dayMarkersModule['eventMarkerRender'].eventMarkersContainer = null;
            }
            if (!isNullOrUndefined(this.dayMarkersModule.nonworkingDayRender)) {
                if (!isNullOrUndefined(this.dayMarkersModule.nonworkingDayRender.nonworkingContainer)) {
                    this.dayMarkersModule.nonworkingDayRender.nonworkingContainer = null;
                }
                if (!isNullOrUndefined(this.dayMarkersModule.nonworkingDayRender['weekendContainer'])) {
                    this.dayMarkersModule.nonworkingDayRender['weekendContainer'] = null;
                }
                if (!isNullOrUndefined(this.dayMarkersModule.nonworkingDayRender['holidayContainer'])) {
                    this.dayMarkersModule.nonworkingDayRender['holidayContainer'] = null;
                }
            }
        }
        if (this.connectorLineModule) {
            this.connectorLineModule.dependencyViewContainer = null;
            this.connectorLineModule.svgObject = null;
            this.connectorLineModule.renderer = null;
            this.connectorLineModule.tooltipTable = null;
        }
        this.treeGridPane = null;
        this.chartPane = null;
        this.initialChartRowElements = null;
        _super.prototype.destroy.call(this);
        this.chartVerticalLineContainer = null;
        this.element.innerHTML = '';
        removeClass([this.element], cls.root);
        this.element.innerHTML = '';
        this.isTreeGridRendered = false;
        this.resetTemplates();
        this.dataOperation['uid'] = null;
    };
    /**
     * Method to get taskbarHeight.
     *
     * @returns {number} .
     * @public
     */
    Gantt.prototype.getTaskbarHeight = function () {
        return this.chartRowsModule.taskBarHeight;
    };
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} .
     * @hidden
     */
    Gantt.prototype.requiredModules = function () {
        var modules = [];
        if (this.isDestroyed) {
            return modules;
        }
        if (this.allowSorting) {
            modules.push({
                member: 'sort',
                args: [this]
            });
        }
        if (this.allowFiltering || (this.toolbar && this.toolbar.indexOf('Search') !== -1)) {
            modules.push({
                member: 'filter',
                args: [this]
            });
        }
        if (this.allowReordering) {
            modules.push({
                member: 'reorder',
                args: [this]
            });
        }
        if (this.allowExcelExport) {
            modules.push({
                member: 'excelExport',
                args: [this]
            });
        }
        if (this.allowRowDragAndDrop || this.allowTaskbarDragAndDrop) {
            modules.push({
                member: 'rowDragAndDrop',
                args: [this]
            });
        }
        if (this.enableCriticalPath) {
            modules.push({
                member: 'criticalPath',
                args: [this]
            });
        }
        if (this.enableUndoRedo) {
            modules.push({
                member: 'undoRedo',
                args: [this]
            });
        }
        if (this.allowResizing) {
            modules.push({
                member: 'resize',
                args: [this]
            });
        }
        if (this.toolbar && this.toolbar.length > 0) {
            modules.push({
                member: 'toolbar',
                args: [this]
            });
        }
        if (this.editSettings.allowAdding || this.editSettings.allowEditing || this.editSettings.allowDeleting
            || this.editSettings.allowTaskbarEditing || this.allowRowDragAndDrop) {
            modules.push({
                member: 'edit',
                args: [this]
            });
        }
        if (this.allowSelection) {
            modules.push({
                member: 'selection',
                args: [this]
            });
        }
        if (this.tooltipSettings.showTooltip) {
            modules.push({
                member: 'tooltip',
                args: [this]
            });
        }
        if (this.highlightWeekends || (this.holidays && this.holidays.length > 0)
            || (this.eventMarkers && this.eventMarkers.length > 0)) {
            modules.push({
                member: 'dayMarkers',
                args: [this]
            });
        }
        if (this.enableContextMenu) {
            modules.push({
                member: 'contextMenu',
                args: [this]
            });
        }
        if (this.showColumnMenu) {
            modules.push({
                member: 'columnMenu',
                args: [this]
            });
        }
        if (this.allowPdfExport) {
            modules.push({
                member: 'pdfExport',
                args: [this]
            });
        }
        if (this.enableVirtualization) {
            modules.push({
                member: 'virtualScroll',
                args: [this]
            });
        }
        return modules;
    };
    /**
     * Sorts a column with the given options.
     *
     * @param {string} columnName - Defines the column name to be sorted.
     * @param {SortDirection} direction - Defines the direction of sorting field.
     * @param {boolean} isMultiSort - Specifies whether the previous sorted columns are to be maintained.
     * @returns {void} .
     */
    Gantt.prototype.sortColumn = function (columnName, direction, isMultiSort) {
        if (this.sortModule && this.allowSorting) {
            this.sortModule.sortColumn(columnName, direction, isMultiSort);
        }
    };
    Gantt.prototype.mergePersistGanttData = function () {
        if (!this.treeGrid) {
            this.treeGrid = new TreeGrid();
        }
        var persist1 = 'mergePersistGridData';
        this.treeGrid.grid[persist1].apply(this);
    };
    Gantt.prototype.mergeColumns = function (storedColumn, columns) {
        var persist2 = 'mergeColumns';
        this.treeGrid.grid[persist2].apply(this, [storedColumn, columns]);
    };
    Gantt.prototype.setFrozenCount = function () {
        var persist3 = 'setFrozenCount';
        this.treeGrid.grid["" + persist3].apply(this);
    };
    Gantt.prototype.splitFrozenCount = function (columns) {
        var persist4 = 'splitFrozenCount';
        this.treeGrid.grid["" + persist4].apply(this, [columns]);
    };
    Gantt.prototype.isFrozenGrid = function () {
        return this.treeGrid.grid.isFrozenGrid();
    };
    /**
     * Clears all the sorted columns of the Gantt.
     *
     * @returns {void} .
     */
    Gantt.prototype.clearSorting = function () {
        this.sortModule.clearSorting();
    };
    /**
     * To validate and render chart horizontal and vertical lines in the Gantt
     *
     * @returns {void} .
     * @hidden
     */
    Gantt.prototype.renderChartGridLines = function () {
        var className = 'e-chart-row-border';
        var verticalLines = this.chartVerticalLineContainer;
        var chartRowsTD = document.getElementById(this.element.id + 'GanttTaskTableBody').querySelectorAll('td');
        if (this.gridLines === 'Vertical') {
            if (isNullOrUndefined(verticalLines)) {
                this.renderChartVerticalLines();
            }
            else {
                if (window.getComputedStyle(verticalLines).display === 'none') {
                    verticalLines.style.display = 'block';
                }
            }
            if (chartRowsTD && chartRowsTD.length > 0 && chartRowsTD[0].classList.contains(className)) {
                for (var c = 0; c < chartRowsTD.length; c++) {
                    removeClass([chartRowsTD[c]], className);
                }
            }
        }
        else if (this.gridLines === 'Horizontal') {
            if (!isNullOrUndefined(verticalLines)) {
                verticalLines.style.display = 'none';
            }
            if (chartRowsTD && chartRowsTD.length > 0 && !chartRowsTD[0].classList.contains(className)) {
                for (var c = 0; c < chartRowsTD.length; c++) {
                    addClass([chartRowsTD[c]], className);
                }
            }
        }
        else if (this.gridLines === 'Both') {
            if (isNullOrUndefined(verticalLines)) {
                this.renderChartVerticalLines();
            }
            else {
                if (window.getComputedStyle(verticalLines).display === 'none') {
                    verticalLines.style.display = 'block';
                }
            }
            if (chartRowsTD && chartRowsTD.length > 0 && !chartRowsTD[0].classList.contains(className)) {
                for (var c = 0; c < chartRowsTD.length; c++) {
                    addClass([chartRowsTD[c]], className);
                }
            }
        }
        else if (this.gridLines === 'None') {
            if (!isNullOrUndefined(verticalLines) && window.getComputedStyle(verticalLines).display !== 'none') {
                verticalLines.style.display = 'none';
            }
            if (chartRowsTD && chartRowsTD.length > 0 && chartRowsTD[0].classList.contains(className)) {
                for (var c = 0; c < chartRowsTD.length; c++) {
                    removeClass([chartRowsTD[c]], className);
                }
            }
        }
    };
    /**
     * To update height of the Grid lines in the Gantt chart side.
     *
     * @returns {void} .
     * @private
     */
    Gantt.prototype.updateGridLineContainerHeight = function () {
        if (this.chartVerticalLineContainer) {
            this.chartVerticalLineContainer.style.height = formatUnit(this.getContentHeight());
        }
    };
    /**
     * To get actual height of grid lines, holidays, weekend and event markers.
     *
     * @returns {number} .
     * @private
     */
    Gantt.prototype.getContentHeight = function () {
        var scrollHeight = this.ganttChartModule.scrollElement.offsetHeight - 16; //16 is horizontal scrollbar height
        var contentHeight = this.ganttChartModule.chartBodyContent.offsetHeight;
        var height = contentHeight < scrollHeight ? contentHeight : scrollHeight;
        return height;
    };
    /**
     * To update height of the Grid lines in the Gantt chart side.
     *
     * @param {boolean} currentProp - Update current property change in the Gantt chart.
     * @returns {void} .
     * @private
     */
    Gantt.prototype.reUpdateDimention = function (currentProp) {
        var toolbarHeight = 0;
        this.calculateDimensions();
        if (!isNullOrUndefined(this.toolbarModule) && !isNullOrUndefined(this.toolbarModule.element)) {
            this.toolbarModule.toolbar.refresh();
            this.toolbarModule.refreshToolbarItems();
            toolbarHeight = this.toolbarModule.element.offsetHeight;
        }
        this.treeGrid.height = this.ganttHeight - toolbarHeight -
            this.treeGrid.grid.getHeaderContent().offsetHeight;
        this.splitterModule.splitterObject.height = (this.ganttHeight - toolbarHeight).toString();
        if (!isNullOrUndefined(this.chartVerticalLineContainer)) {
            this.chartVerticalLineContainer.style.height = this.ganttHeight + 'px';
        }
        if (!isNullOrUndefined(this.dayMarkersModule)) {
            var holidayContainer = getValue('nonworkingDayRender.holidayContainer', this.dayMarkersModule);
            var weekendContainer = getValue('nonworkingDayRender.weekendContainer', this.dayMarkersModule);
            var eventMarkersContainer = getValue('eventMarkerRender.eventMarkersContainer', this.dayMarkersModule);
            if (holidayContainer) {
                holidayContainer.style.height = this.ganttHeight + 'px';
            }
            if (weekendContainer) {
                weekendContainer.style.height = this.ganttHeight + 'px';
            }
            if (eventMarkersContainer) {
                eventMarkersContainer.style.height = this.ganttHeight + 'px';
            }
        }
        if (currentProp === 'width') {
            this.splitterModule.splitterObject.width = this.ganttWidth.toString();
        }
        this.ganttChartModule.scrollObject.
            setHeight(this.ganttHeight - this.ganttChartModule.chartTimelineContainer.offsetHeight - toolbarHeight);
    };
    /**
     * To render vertical lines in the Gantt chart side.
     *
     * @returns {void} .
     */
    Gantt.prototype.renderChartVerticalLines = function () {
        if (!this.element.contains(this.chartVerticalLineContainer)) {
            this.chartVerticalLineContainer = createElement('div', {
                id: this.element.id + 'line-container',
                styles: 'position:absolute;height:100%;'
            });
            this.ganttChartModule.chartBodyContent.insertBefore(this.chartVerticalLineContainer, this.ganttChartModule.chartBodyContent.lastChild);
        }
        this.chartVerticalLineContainer.innerHTML = '';
        var headerTable = this.element.getElementsByClassName('e-timeline-header-table-container')[1];
        if (isNullOrUndefined(headerTable)) {
            headerTable = this.element.getElementsByClassName('e-timeline-header-table-container')[0];
        }
        var thElements = headerTable.getElementsByTagName('th');
        var thLength = thElements.length;
        var thWidth;
        var leftPos = 0;
        var containerDiv = createElement('div');
        for (var n = 0; n < thLength; n++) {
            leftPos = n === 0 ? -1 : (leftPos + parseFloat(thWidth));
            thWidth = thElements[n].style.width;
            var divElement = createElement('div', {
                className: 'e-line-container-cell',
                styles: (this.enableRtl ? 'right:' + (leftPos + 1) : 'left:' + (leftPos !== -1 ? (leftPos + 0.3) : leftPos)) + 'px'
            });
            containerDiv.appendChild(divElement);
        }
        while (containerDiv.firstChild) {
            this.chartVerticalLineContainer.appendChild(containerDiv.firstChild);
        }
    };
    /**
     * Method to get default localized text of the Gantt.
     *
     * @returns {void} .
     * @hidden
     */
    Gantt.prototype.getDefaultLocale = function () {
        var ganttLocale = {
            emptyRecord: 'No records to display',
            id: 'ID',
            name: 'Name',
            startDate: 'Start Date',
            endDate: 'End Date',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Dependency',
            notes: 'Notes',
            criticalPath: 'Critical Path',
            undo: 'Undo',
            redo: 'Redo',
            baselineStartDate: 'Baseline Start Date',
            baselineEndDate: 'Baseline End Date',
            taskMode: 'Task Mode',
            changeScheduleMode: 'Change Schedule Mode',
            subTasksStartDate: 'SubTasks Start Date',
            subTasksEndDate: 'SubTasks End Date',
            scheduleStartDate: 'Schedule Start Date',
            scheduleEndDate: 'Schedule End Date',
            auto: 'Auto',
            manual: 'Manual',
            type: 'Type',
            offset: 'Offset',
            resourceName: 'Resources',
            resourceID: 'Resource ID',
            day: 'day',
            hour: 'hour',
            minute: 'minute',
            days: 'days',
            hours: 'hours',
            minutes: 'minutes',
            generalTab: 'General',
            customTab: 'Custom Columns',
            writeNotes: 'Write Notes',
            addDialogTitle: 'New Task',
            editDialogTitle: 'Task Information',
            add: 'Add',
            edit: 'Edit',
            update: 'Update',
            delete: 'Delete',
            cancel: 'Cancel',
            search: 'Search',
            task: ' task',
            tasks: ' tasks',
            zoomIn: 'Zoom in',
            zoomOut: 'Zoom out',
            zoomToFit: 'Zoom to fit',
            excelExport: 'Excel export',
            csvExport: 'CSV export',
            pdfExport: 'PDF export',
            expandAll: 'Expand all',
            collapseAll: 'Collapse all',
            nextTimeSpan: 'Next timespan',
            prevTimeSpan: 'Previous timespan',
            saveButton: 'Save',
            taskBeforePredecessorFS: 'You moved "{0}" to start before "{1}" finishes and the two tasks are linked.'
                + 'As the result, the links cannot be honored. Select one action below to perform',
            taskAfterPredecessorFS: 'You moved "{0}" away from "{1}" and the two tasks are linked.'
                + 'As the result, the links cannot be honored. Select one action below to perform',
            taskBeforePredecessorSS: 'You moved "{0}" to start before "{1}" starts and the two tasks are linked.'
                + 'As the result, the links cannot be honored. Select one action below to perform',
            taskAfterPredecessorSS: 'You moved "{0}" to start after "{1}" starts and the two tasks are linked.'
                + 'As the result, the links cannot be honored. Select one action below to perform',
            taskBeforePredecessorFF: 'You moved "{0}" to finish before "{1}" finishes and the two tasks are linked.'
                + 'As the result, the links cannot be honored. Select one action below to perform',
            taskAfterPredecessorFF: 'You moved "{0}" to finish after "{1}" finishes and the two tasks are linked.'
                + 'As the result, the links cannot be honored. Select one action below to perform',
            taskBeforePredecessorSF: 'You moved "{0}" away from "{1}" to starts and the two tasks are linked.'
                + 'As the result, the links cannot be honored. Select one action below to perform',
            taskAfterPredecessorSF: 'You moved "{0}" to finish after "{1}" starts and the two tasks are linked.'
                + 'As the result, the links cannot be honored. Select one action below to perform',
            okText: 'Ok',
            confirmDelete: 'Are you sure you want to Delete Record?',
            from: 'From',
            to: 'To',
            taskLink: 'Task Link',
            lag: 'Lag',
            start: 'Start',
            finish: 'Finish',
            enterValue: 'Enter the value',
            taskInformation: 'Task Information',
            deleteTask: 'Delete Task',
            deleteDependency: 'Delete Dependency',
            convert: 'Convert',
            save: 'Save',
            above: 'Above',
            below: 'Below',
            child: 'Child',
            milestone: 'Milestone',
            toTask: 'To Task',
            toMilestone: 'To Milestone',
            eventMarkers: 'Event markers',
            leftTaskLabel: 'Left task label',
            rightTaskLabel: 'Right task label',
            timelineCell: 'Timeline cell',
            confirmPredecessorDelete: 'Are you sure you want to remove dependency link?',
            unit: 'Unit',
            work: 'Work',
            taskType: 'Task Type',
            unassignedTask: 'Unassigned Task',
            group: 'Group',
            indent: 'Indent',
            outdent: 'Outdent',
            segments: 'Segments',
            splitTask: 'Split Task',
            mergeTask: 'Merge Task',
            left: 'Left',
            right: 'Right',
            FF: 'FF',
            FS: 'FS',
            SF: 'SF',
            SS: 'SS'
        };
        return ganttLocale;
    };
    /**
     * To remove sorted records of particular column.
     *
     * @param {string} columnName - Defines the sorted column name.
     * @returns {void} .
     */
    Gantt.prototype.removeSortColumn = function (columnName) {
        this.sortModule.removeSortColumn(columnName);
    };
    /**
     *
     * @param {object} args -Defines the edited event args.
     * @returns {void} .
     * @private
     */
    Gantt.prototype.actionBeginTask = function (args) {
        this.trigger('actionBegin', args);
        if (!isNullOrUndefined(this.loadingIndicator) && this.loadingIndicator.indicatorType === 'Shimmer') {
            this.showMaskRow();
        }
        else {
            this.showSpinner();
        }
    };
    /**
     * To move horizontal scroll bar of Gantt to specific date.
     *
     * @param  {string} date - Defines the date to which the Gantt chart should scroll.
     * @returns {void} .
     */
    Gantt.prototype.scrollToDate = function (date) {
        var tempDate = this.dateValidationModule.getDateFromFormat(date);
        var left = this.dataOperation.getTaskLeft(tempDate, false);
        this.ganttChartModule.updateScrollLeft(left);
    };
    /**
     * To move horizontal scroll bar of Gantt to specific task id.
     *
     * @param  {string} taskId - Defines the task id of data.
     * @returns {void} .
     */
    Gantt.prototype.scrollToTask = function (taskId) {
        if (this.ids.indexOf(taskId) !== -1) {
            var left = this.flatData[this.ids.indexOf(taskId)].ganttProperties.left;
            this.ganttChartModule.updateScrollLeft(left);
        }
    };
    /**
     * To update the horizontal (left) and vertical (top) scroll positions of the Gantt chart.
     *
     * @param  {number} left - Defines the scroll left value of chart side.
     * @param  {number} top - Defines the scroll top value of chart side.
     * @returns {void} .
     */
    Gantt.prototype.updateChartScrollOffset = function (left, top) {
        if (!isNullOrUndefined(left)) {
            left = this.ganttChartModule.scrollElement.scrollWidth <= left ?
                this.ganttChartModule.scrollElement.scrollWidth : left;
            this.ganttChartModule.scrollObject.setScrollLeft(left, this.enableRtl ? -1 : 0);
        }
        if (!isNullOrUndefined(top)) {
            top = this.ganttChartModule.scrollElement.scrollHeight <= top ? this.ganttChartModule.scrollElement.scrollHeight : top;
            this.ganttChartModule.scrollObject.setScrollTop(top);
        }
    };
    /**
     * Get parent task by clone parent item.
     *
     * @param {IParent} cloneParent - Defines the clone parent item.
     * @returns {IGanttData} .
     * @hidden
     */
    Gantt.prototype.getParentTask = function (cloneParent) {
        if (isNullOrUndefined(cloneParent)) {
            return null;
        }
        if (!this.autoCalculateDateScheduling && this.dataMap && this.dataMap.size > 0 && !this.taskFields.hasChildMapping &&
            this.isLoad) {
            var parent_1 = this.dataMap.get(cloneParent.uniqueID);
            if (parent_1) {
                return parent_1;
            }
        }
        else {
            var parent_2 = this.flatData.find(function (val) { return cloneParent.uniqueID === val.uniqueID; });
            if (parent_2) {
                return parent_2;
            }
        }
        return null;
    };
    /**
     * Get parent task by clone parent item.
     *
     * @param {IGanttData} ganttRecord -Defines the Gantt record.
     * @param {number} level -Defines the selected record level.
     * @returns {IGanttData} .
     * @hidden
     */
    Gantt.prototype.getRootParent = function (ganttRecord, level) {
        if (ganttRecord.level === level) {
            return ganttRecord;
        }
        return this.getRootParent(this.getParentTask(ganttRecord.parentItem), level);
    };
    /**
     * Filters TreeGrid row by column name with the given options.
     *
     * @param  {string} fieldName - Defines the field name of the column.
     * @param  {string} filterOperator - Defines the operator to filter records.
     * @param  {string | number | Date | boolean | number[] | string[] | Date[] | boolean[]} filterValue - Defines the value
     *  used to filter records.
     * @param  {string} predicate - Defines the relationship between one filter query and another by using AND or OR predicate.
     * @param  {boolean} matchCase - If match case is set to true, TreeGrid filters the records with exact match.if false, it filters case
     * insensitive records (uppercase and lowercase letters treated the same).
     * @param  {boolean} ignoreAccent - If ignoreAccent set to true,
     * then filter ignores the diacritic characters or accents while filtering.
     * @returns {void} .
     */
    Gantt.prototype.filterByColumn = function (fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent) {
        this.treeGrid.filterByColumn(fieldName, filterOperator, filterValue, predicate, matchCase, ignoreAccent);
    };
    /**
     * Export Gantt data to Excel file(.xlsx).
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Gantt.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} .
     */
    Gantt.prototype.excelExport = function (excelExportProperties, isMultipleExport, 
    /* eslint-disable-next-line */
    workbook, isBlob) {
        return this.excelExportModule ? this.treeGrid.excelExport(excelExportProperties, isMultipleExport, workbook, isBlob) : null;
    };
    /**
     * Export Gantt data to CSV file.
     *
     * @param  {ExcelExportProperties} excelExportProperties - Defines the export properties of the Gantt.
     * @param  {boolean} isMultipleExport - Define to enable multiple export.
     * @param  {workbook} workbook - Defines the Workbook if multiple export is enabled.
     * @param  {boolean} isBlob - If 'isBlob' set to true, then it will be returned as blob data.
     * @returns {Promise<any>} .
     */
    Gantt.prototype.csvExport = function (excelExportProperties, 
    /* eslint-disable-next-line */
    isMultipleExport, workbook, isBlob) {
        return this.excelExportModule ? this.treeGrid.csvExport(excelExportProperties, isMultipleExport, workbook, isBlob) : null;
    };
    /**
     * Export Gantt data to PDF document.
     *
     * @param  {PdfExportProperties} pdfExportProperties - Defines the export properties of the Gantt.
     * @param  {isMultipleExport} isMultipleExport - Define to enable multiple export.
     * @param  {pdfDoc} pdfDoc - Defined the Pdf Document if multiple export is enabled.
     * @param  {boolean} isBlob - If the 'isBlob' parameter is set to true, the method returns PDF data as a blob instead of exporting it as a down-loadable PDF file. The default value is false.
     * @returns {Promise<any>} .
     */
    Gantt.prototype.pdfExport = function (pdfExportProperties, isMultipleExport, pdfDoc, isBlob) {
        return this.pdfExportModule ? this.pdfExportModule.export(pdfExportProperties, isMultipleExport, pdfDoc, isBlob)
            : null;
    };
    /**
     * Clears the filtered columns in Gantt.
     *
     * Can also be used to clear filtering of a specific column in Gantt.
     *
     * @param {string[]} fields - Defines the specific column to remove filter.
     * @returns {void} .
     */
    Gantt.prototype.clearFiltering = function (fields) {
        this.treeGrid.grid.clearFiltering(fields);
    };
    /**
     * Removes filtered column by field name.
     *
     * @param  {string} field - Defines column field name to remove filter.
     * @returns {void} .
     * @hidden
     */
    Gantt.prototype.removeFilteredColsByField = function (field) {
        this.treeGrid.removeFilteredColsByField(field, false);
    };
    /**
     * Method to set holidays and non working days in date time and date picker controls
     *
     * @param {RenderDayCellEventArgs} args .
     * @returns {void} .
     * @private
     */
    Gantt.prototype.renderWorkingDayCell = function (args) {
        var includeWeekend = false;
        var isCustomManual = false;
        includeWeekend = (this.taskMode !== 'Auto' && this.taskMode !== 'Custom') ? true : (this.includeWeekend || !this.autoCalculateDateScheduling) ? true : false;
        if (this.taskMode === 'Custom' && this.taskFields.manual) {
            var editModule = this.editModule;
            if (editModule && editModule.cellEditModule && editModule.cellEditModule.isCellEdit) {
                isCustomManual = editModule.cellEditModule.currentEditedRowData[this.taskFields.manual];
            }
            else if (editModule && editModule.dialogModule && editModule.dialogModule['isEdit']) {
                isCustomManual = editModule.dialogModule['editedRecord'][this.taskFields.manual];
            }
            includeWeekend = isCustomManual || this.includeWeekend || !this.autoCalculateDateScheduling;
        }
        var nonWorkingDays = !includeWeekend ? this.nonWorkingDayIndex : [];
        var holidays = this.totalHolidayDates;
        if (nonWorkingDays.length > 0 && nonWorkingDays.indexOf(args.date.getDay()) !== -1) {
            args.isDisabled = true;
        }
        else if (holidays.length > 0) {
            var tempDate = new Date(args.date.getTime());
            tempDate.setHours(0, 0, 0);
            if (holidays.indexOf(tempDate.getTime()) !== -1) {
                if (!this.autoCalculateDateScheduling || (this.isLoad && !this.treeGrid.loadChildOnDemand &&
                    this.taskFields.hasChildMapping)) {
                    args.isDisabled = false;
                }
                else {
                    args.isDisabled = true;
                }
            }
        }
    };
    /**
     * Updates the Gantt timeline to the previous time span by one unit.
     *
     * @param {string} mode - Render previous span of Timeline.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.previousTimeSpan = function (mode) {
        if (this.isReact) {
            this['clearTemplate'](['TaskbarTemplate', 'ParentTaskbarTemplate', 'MilestoneTemplate', 'TaskLabelTemplate', 'RightLabelTemplate', 'LeftLabelTemplate']);
        }
        if (this.undoRedoModule && this['isUndoRedoItemPresent']('PreviousTimeSpan')) {
            if (this.undoRedoModule['redoEnabled']) {
                this.undoRedoModule['disableRedo']();
            }
            this.undoRedoModule['createUndoCollection']();
            var timeSpan = {};
            timeSpan['action'] = 'PreviousTimeSpan';
            timeSpan['previousTimelineStartDate'] = extend([], [], [this.timelineModule.timelineStartDate], true)[0];
            timeSpan['previousTimelineEndDate'] = extend([], [], [this.timelineModule.timelineEndDate], true)[0];
            this.undoRedoModule['getUndoCollection'][this.undoRedoModule['getUndoCollection'].length - 1] = timeSpan;
        }
        this.timelineModule.performTimeSpanAction('prevTimeSpan', 'publicMethod', new Date(this.timelineModule.timelineStartDate.getTime()), new Date(this.timelineModule.timelineEndDate.getTime()), mode);
    };
    /**
     * To update timeline at end point with one unit.
     *
     * @param {string} mode - Render next span of Timeline.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.nextTimeSpan = function (mode) {
        if (this.isReact) {
            this['clearTemplate'](['TaskbarTemplate', 'ParentTaskbarTemplate', 'MilestoneTemplate', 'TaskLabelTemplate', 'RightLabelTemplate', 'LeftLabelTemplate']);
        }
        if (this.undoRedoModule && this['isUndoRedoItemPresent']('NextTimeSpan')) {
            if (this.undoRedoModule['redoEnabled']) {
                this.undoRedoModule['disableRedo']();
            }
            this.undoRedoModule['createUndoCollection']();
            var timeSpan = {};
            timeSpan['action'] = 'NextTimeSpan';
            timeSpan['previousTimelineStartDate'] = extend([], [], [this.timelineModule.timelineStartDate], true)[0];
            timeSpan['previousTimelineEndDate'] = extend([], [], [this.timelineModule.timelineEndDate], true)[0];
            this.undoRedoModule['getUndoCollection'][this.undoRedoModule['getUndoCollection'].length - 1] = timeSpan;
        }
        this.timelineModule.performTimeSpanAction('nextTimeSpan', 'publicMethod', new Date(this.timelineModule.timelineStartDate.getTime()), new Date(this.timelineModule.timelineEndDate.getTime()), mode);
    };
    /**
     * To validate project start date and end date.
     *
     * @param  {Date} startDate - Defines start date of project.
     * @param  {Date} endDate - Defines end date of project.
     * @param  {boolean} isTimelineRoundOff - Defines project start date and end date need to be round off or not.
     * @param {string} isFrom - Defines whether the call originates from a public method action or a taskbar editing action.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.updateProjectDates = function (startDate, endDate, isTimelineRoundOff, isFrom) {
        this.timelineModule.totalTimelineWidth = 0;
        this.cloneProjectStartDate = startDate;
        this.cloneProjectEndDate = endDate;
        this.isTimelineRoundOff = isTimelineRoundOff;
        this.timelineModule.refreshTimelineByTimeSpan();
        this.dataOperation.reUpdateGanttDataPosition();
        if (!this.pdfExportModule || (this.pdfExportModule && !this.pdfExportModule.isPdfExport) ||
            (this.pdfExportModule && this.pdfExportModule.isPdfExport && this.pdfExportModule.helper.exportProps &&
                this.pdfExportModule.helper.exportProps.fitToWidthSettings &&
                !this.pdfExportModule.helper.exportProps.fitToWidthSettings.isFitToWidth)) {
            this.timelineModule.updateChartByNewTimeline();
            var browserZoomLevel = (window.outerWidth / window.innerWidth);
            // Handled zoomtofit horizontal scrollbar hide while performing different zooming levels in browser-Task(919516)
            if (this.timelineModule.isZoomToFit && !this.enableTimelineVirtualization && browserZoomLevel < 1) {
                var clientWidthDifference = void 0;
                if (this.enableVirtualization) {
                    clientWidthDifference = Math.abs(this.timelineModule.totalTimelineWidth - this.element.getElementsByClassName('e-chart-scroll-container e-content')[0].clientWidth) + 1;
                }
                else {
                    clientWidthDifference = Math.abs(this.timelineModule.totalTimelineWidth -
                        this.ganttChartModule.chartBodyContent.parentElement.clientWidth);
                }
                this.ganttChartModule.chartBodyContent.style.width =
                    formatUnit(this.timelineModule.totalTimelineWidth - clientWidthDifference);
            }
            else {
                this.ganttChartModule.chartBodyContent.style.width = formatUnit(this.timelineModule.totalTimelineWidth);
            }
            this.ganttChartModule.updateLastRowBottomWidth();
            if (this.taskFields.dependency) {
                this.ganttChartModule.reRenderConnectorLines();
            }
            if (isFrom !== 'beforeAdd') {
                this.notify('selectRowByIndex', {});
            }
        }
    };
    /**
     * Splits the taskbar of a specified task into segments based on the given date.
     *
     * @param  {string} taskId - Defines the id of a task to be split.
     * @param  {string} splitDate - Defines in which date the taskbar must be split up.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.splitTask = function (taskId, splitDate) {
        this.isEdit = true;
        this.chartRowsModule.splitTask(taskId, splitDate);
    };
    /**
     * Merge the split taskbar with the given segment indexes.
     *
     * @param  {string} taskId - Defines the id of a task to be split.
     * @param  {string} segmentIndexes - Defines the object array of indexes which must be merged.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.mergeTask = function (taskId, segmentIndexes) {
        this.chartRowsModule.mergeTask(taskId, segmentIndexes);
    };
    /**
     * Changes the TreeGrid column positions by field names.
     *
     * @param  {string} fromFName - Defines origin field name.
     * @param  {string} toFName - Defines destination field name.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.reorderColumns = function (fromFName, toFName) {
        this.treeGrid.reorderColumns(fromFName, toFName);
    };
    /**
     * Method to clear edited collections in gantt set edit flag value
     *
     * @param {boolean} isStart -Defines whether to initiate edit action.
     * @returns {void} .
     * @private
     */
    Gantt.prototype.initiateEditAction = function (isStart) {
        this.isOnEdit = isStart;
        this.previousRecords = {};
        this.editedRecords = [];
    };
    /**
     *
     * @param {string} field Method to update value in Gantt record and make clone record for this
     * @param {IGanttData | ITaskData} record .
     * @param {boolean} isTaskData .
     * @returns {void} .
     * @private
     */
    /* eslint-disable-next-line */
    Gantt.prototype.setRecordValue = function (field, value, record, isTaskData) {
        value = isUndefined(value) ? null : value;
        var resultIf = (this.isOnEdit || this.isOnDelete) ? true : false;
        if (resultIf) {
            this.makeCloneData(field, record, isTaskData);
            var ganttData = isTaskData ? record : record.ganttProperties;
            var id = ganttData.rowUniqueID;
            var task_1 = this.getRecordByID(id);
            var isValid = false;
            isValid = (isNullOrUndefined(value) ||
                (!isNullOrUndefined(value) && !isNullOrUndefined(record["" + field]) &&
                    (value instanceof Date ? value.getTime() !== record["" + field].getTime() :
                        record["" + field] !== value))) ? true : isValid;
            if (task_1 && ((this.editedRecords.indexOf(task_1) === -1 && isValid) || this.editedRecords.length === 0)) {
                if (this.editModule['draggedRecord'] && this.editModule['draggedRecord'].ganttProperties.taskId === ganttData.taskId) {
                    this.editedRecords.splice(0, 0, task_1);
                }
                else {
                    this.editedRecords.push(task_1);
                }
                if (this.undoRedoModule) {
                    if (this.undoRedoModule['changedRecords'].indexOf(task_1) === -1) {
                        this.undoRedoModule['changedRecords'].push(extend({}, {}, task_1, true));
                    }
                    var currentAction = this.undoRedoModule['getUndoCollection'].length > 0 ? this.undoRedoModule['getUndoCollection'][this.undoRedoModule['getUndoCollection'].length - 1]['action'] : null;
                    if (this.editModule && this.editSettings.allowEditing && !this.undoRedoModule['isUndoRedoPerformed'] && !this.isOnDelete && !this.isOnAdded && currentAction !== 'outdent' && currentAction !== 'indent' &&
                        currentAction !== 'RowDragAndDrop' && currentAction !== 'TaskbarDragAndDrop') {
                        var oldRecord = this.previousFlatData.filter(function (data) {
                            return data.ganttProperties.taskId === task_1.ganttProperties.taskId;
                        })[0];
                        if (oldRecord && this.undoRedoModule['getUndoCollection'][this.undoRedoModule['getUndoCollection'].length - 1] && this.undoRedoModule['getUndoCollection'][this.undoRedoModule['getUndoCollection'].length - 1]['modifiedRecords']) {
                            this.undoRedoModule['getUndoCollection'][this.undoRedoModule['getUndoCollection'].length - 1]['modifiedRecords'].push(oldRecord);
                        }
                    }
                }
                if (this.enableImmutableMode) {
                    this.modifiedRecords.push(task_1);
                }
            }
        }
        setValue(field, value, record);
    };
    Gantt.prototype.makeCloneData = function (field, record, isTaskData) {
        var cloneData;
        /* eslint-disable-next-line */
        var value = getValue(field, record);
        /* eslint-disable-next-line */
        var prevValue;
        /* eslint-disable-next-line */
        var clonedValue;
        if (isTaskData) {
            field = 'ganttProperties.' + field;
        }
        if (isNullOrUndefined(this.previousRecords[record.uniqueID])) {
            var tempData = {};
            this.previousRecords[record.uniqueID] = tempData;
        }
        /* eslint-disable-next-line */
        cloneData = this.previousRecords[record.uniqueID];
        /* eslint-disable-next-line */
        prevValue = getValue(field, cloneData);
        if (isUndefined(prevValue)) {
            if (value instanceof Date) {
                clonedValue = new Date(value.getTime());
            }
            else if (isObjectArray(value)) {
                clonedValue = extend([], value, [], true);
            }
            else if (isObject(value)) {
                clonedValue = extend({}, {}, value, true);
            }
            else {
                clonedValue = value;
            }
            if (!isUndefined(clonedValue)) {
                setValue(field, clonedValue, cloneData);
            }
            else {
                setValue(field, null, cloneData);
            }
        }
    };
    Gantt.prototype.closeGanttActions = function () {
        if (this.editModule) {
            if (this.editModule.cellEditModule && this.editModule.cellEditModule.isCellEdit) {
                this.treeGrid.closeEdit();
                this.editModule.cellEditModule.isCellEdit = false;
                if (!isNullOrUndefined(this.toolbarModule)) {
                    this.toolbarModule.refreshToolbarItems();
                }
            }
            else if (this.editModule.dialogModule && this.editModule.dialogModule.dialogObj &&
                this.editModule.dialogModule.dialogObj.visible) {
                this.editModule.dialogModule.dialogObj.hide();
                this.editModule.dialogModule.dialogClose();
            }
        }
    };
    /**
     * Method to get task by uniqueId value.
     *
     * @param {string} id - Defines the task id.
     * @returns {IGanttData} .
     * @isGenericType true
     */
    Gantt.prototype.getTaskByUniqueID = function (id) {
        var value = this.flatData.filter(function (val) {
            return val.uniqueID === id;
        });
        if (value.length > 0) {
            return value[0];
        }
        else {
            return null;
        }
    };
    /**
     * Method to get record by id value.
     *
     * @param {string} id - Defines the id of record.
     * @returns {IGanttData} .
     * @isGenericType true
     */
    Gantt.prototype.getRecordByID = function (id) {
        if (isNullOrUndefined(id)) {
            return null;
        }
        return this.flatData[this.ids.indexOf(id.toString())];
    };
    /**
     * Method to set splitter position.
     *
     * @param {string|number} value - Define value to splitter settings property.
     * @param {string} type - Defines name of internal splitter settings property.
     * @returns {void} .
     */
    Gantt.prototype.setSplitterPosition = function (value, type) {
        var tempSplitterSettings = {};
        tempSplitterSettings[type] = value;
        var splitterPosition = this.splitterModule.calculateSplitterPosition(tempSplitterSettings);
        switch (type) {
            case 'view':
                this.splitterSettings.view = tempSplitterSettings[type];
                break;
            case 'columnIndex':
                this.splitterModule['isSplitterResized'] = true;
                this.splitterSettings.columnIndex = tempSplitterSettings[type];
                break;
            case 'position':
                this.splitterModule['isSplitterResized'] = true;
                this.splitterSettings.position = tempSplitterSettings[type];
                break;
            default:
                break;
        }
        var pane1 = this.splitterModule.splitterObject.element.querySelectorAll('.e-pane')[0];
        var pane2 = this.splitterModule.splitterObject.element.querySelectorAll('.e-pane')[1];
        this.splitterModule.splitterPreviousPositionGrid = pane1.scrollWidth + 1 + 'px';
        this.splitterModule.splitterPreviousPositionChart = pane2.scrollWidth + 1 + 'px';
        this.splitterModule.splitterObject.paneSettings[0].size = splitterPosition;
        this.splitterModule.splitterObject.paneSettings[1].size = (parseFloat('99.75%') - parseFloat(splitterPosition)) + '%';
        this.splitterModule.triggerCustomResizedEvent();
    };
    /**
     * Expand the records by index value.
     *
     * @param {number[] | number} index - Defines the index of rows to be expand.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.expandByIndex = function (index) {
        if (typeof index === 'number') {
            var args = this.contructExpandCollapseArgs(null, index);
            this.ganttChartModule.isExpandCollapseFromChart = true;
            this.ganttChartModule.expandGanttRow(args);
        }
        else {
            for (var i = 0; i < index.length; i++) {
                if (typeof index[i] === 'number') {
                    var ind = index[i];
                    var args = this.contructExpandCollapseArgs(null, ind);
                    this.ganttChartModule.isExpandCollapseFromChart = true;
                    this.ganttChartModule.expandGanttRow(args);
                }
            }
        }
    };
    /**
     * Expand the record by task id.
     *
     * @param {number} id - Defines the id of task.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.expandByID = function (id) {
        if (this.enableVirtualization) {
            this.isExpandPerformed = true;
        }
        var args = this.contructExpandCollapseArgs(id);
        this.ganttChartModule.isExpandCollapseFromChart = true;
        this.ganttChartModule.expandGanttRow(args);
    };
    /**
     * Collapse the record by index value.
     *
     * @param {number} index - Defines the index of row.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.collapseByIndex = function (index) {
        var args = this.contructExpandCollapseArgs(null, index);
        this.ganttChartModule.isExpandCollapseFromChart = true;
        this.ganttChartModule.collapseGanttRow(args);
    };
    /**
     * Collapse the record by id value.
     *
     * @param {number} id - Defines the id of task.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.collapseByID = function (id) {
        var args = this.contructExpandCollapseArgs(id);
        this.ganttChartModule.isExpandCollapseFromChart = true;
        this.ganttChartModule.collapseGanttRow(args);
    };
    /**
     * Method to add record.
     *
     * @param {Object[] | IGanttData | Object} data - Defines record to add.
     * @param {RowPosition} rowPosition - Defines the position of row.
     * @param {number} rowIndex - Defines the row index.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.addRecord = function (data, rowPosition, rowIndex) {
        if (this.editModule && this.editSettings.allowAdding) {
            if (this.viewType === 'ResourceView') {
                this.editModule.addRowPosition = rowPosition;
                this.editModule.addRowIndex = rowIndex;
                var resources = void 0;
                if (!isNullOrUndefined(data)) {
                    if (this.undoRedoModule && this.undoRedoModule['isUndoRedoPerformed']) {
                        resources = data.ganttProperties.resourceInfo;
                    }
                    else {
                        resources = data[this.taskFields.resourceInfo];
                    }
                }
                var id = void 0;
                var parentTask = void 0;
                if (!isNullOrUndefined(resources) && resources.length) {
                    for (var i = 0; i < resources.length; i++) {
                        id = (typeof resources[i] === 'object') ? resources[i][this.resourceFields.id] :
                            resources[0];
                        parentTask = this.flatData[this.getTaskIds().indexOf('R' + id)];
                        if (parentTask) {
                            break;
                        }
                    }
                    if (parentTask && (parentTask.level === 0 || parentTask.childRecords.length)) {
                        var dropChildRecord = parentTask.childRecords[rowIndex];
                        if (this.viewType === 'ResourceView' && this.undoRedoModule && this.undoRedoModule['isUndoRedoPerformed']) {
                            this.editModule.addRecord(data, rowPosition, rowIndex);
                        }
                        else if (dropChildRecord) {
                            var position = rowPosition === 'Above' || rowPosition === 'Below' ? rowPosition :
                                'Child';
                            if (position === 'Child') {
                                this.editModule.addRecord(data, position, this.getTaskIds().indexOf('R' + id));
                            }
                            else {
                                this.editModule.addRecord(data, position, this.flatData.indexOf(dropChildRecord));
                            }
                        }
                        else {
                            this.editModule.addRecord(data, 'Child', this.getTaskIds().indexOf('R' + id));
                        }
                    }
                    else {
                        this.editModule.addRecord(data, 'Bottom');
                    }
                }
                else {
                    if (this.undoRedoModule && this.undoRedoModule['isUndoRedoPerformed']) {
                        this.editModule.addRecord(data, rowPosition, rowIndex);
                    }
                    else {
                        this.editModule.addRecord(data, 'Bottom');
                    }
                }
                this.editModule.addRowPosition = null;
                this.editModule.addRowIndex = null;
            }
            else {
                this.editModule.addRecord(data, rowPosition, rowIndex);
                if (rowPosition === 'Bottom') {
                    this.selectedRowIndex = rowIndex;
                }
            }
            if (rowPosition === 'Above' || rowPosition === 'Below' || rowPosition === 'Child') {
                this.currentSelection = !isNullOrUndefined(data) ? data : this.currentSelection;
            }
        }
    };
    /**
     * Method to update record by ID.
     *
     * @param  {Object} data - Defines the data to modify.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.updateRecordByID = function (data) {
        if (this.editModule && this.editSettings.allowEditing) {
            this.updateDuration = true;
            this.editModule.updateRecordByID(data);
            this.updateDuration = false;
        }
    };
    /**
     * To update existing taskId with new unique Id.
     *
     * @param {number | string} currentId - Defines the current Id of the record.
     * @param {number | string} newId - Defines the new Id of the record.
     * @returns {void} .
     */
    Gantt.prototype.updateTaskId = function (currentId, newId) {
        if (this.editModule && this.editSettings.allowEditing) {
            this.editModule.updateTaskId(currentId, newId);
        }
    };
    /**
     * Public method to expand particular level of rows.
     *
     * @returns {void} .
     * @param {number} level .
     * @private
     */
    Gantt.prototype.expandAtLevel = function (level) {
        if (this.enableVirtualization) {
            this.isExpandCollapseLevelMethod = true;
        }
        this.ganttChartModule.expandAtLevel(level);
    };
    /**
     * To indent the level of selected task to the hierarchical Gantt task.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.indent = function () {
        if (this.editModule && this.editSettings.allowEditing) {
            this.editModule.indent();
        }
    };
    /**
     * To outdent the level of selected task from the hierarchical Gantt task.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.outdent = function () {
        if (this.editModule && this.editSettings.allowEditing) {
            this.editModule.outdent();
        }
    };
    /**
     * To retrieve the collection of previously recorded actions. This method returns an object as a collection that holds the following details.
     * `modifiedRecords` - retrieves the modified records.
     * `action` - shows the current performed action such as 'sorting','columnReorder','columnResize','progressResizing','rightResizing','leftResizing','add','delete','search','filtering','zoomIn','zoomOut','zoomToFit','columnState','previousTimeSpan','nextTimeSpan','indent','outdent','rowDragAndDrop','taskbarDragAndDrop','dialogEdit'
     *
     * @returns {Object[]} To get the collection of actions
     * @public
     */
    Gantt.prototype.getUndoActions = function () {
        if (this.undoRedoModule) {
            return this.undoRedoModule['getUndoCollection'];
        }
        else {
            return [];
        }
    };
    /**
     * To retrieve the collection of actions to reapply.
     * `modifiedRecords` - retrieves the modified records.
     * `action` - shows the current performed action such as 'sorting','columnReorder','columnResize','progressResizing','rightResizing','leftResizing','add','delete','search','filtering','zoomIn','zoomOut','zoomToFit','columnState','previousTimeSpan','nextTimeSpan','indent','outdent','rowDragAndDrop','taskbarDragAndDrop','dialogEdit'
     *
     * @returns {Object[]} To get the collection of actions
     *
     * @public
     */
    Gantt.prototype.getRedoActions = function () {
        if (this.undoRedoModule) {
            return this.undoRedoModule['getRedoCollection'];
        }
        else {
            return [];
        }
    };
    /**
     * Clears the stack collection for undo action.
     *
     * @public
     * @returns {void}
     */
    Gantt.prototype.clearUndoCollection = function () {
        if (this.undoRedoModule) {
            this.undoRedoModule['getUndoCollection'] = [];
            if (this.toolbarModule) {
                this.toolbarModule.enableItems([this.controlId + '_undo'], false);
            }
        }
    };
    /**
     * Clears the stack collection for redo action.
     *
     * @public
     * @returns {void}
     */
    Gantt.prototype.clearRedoCollection = function () {
        if (this.undoRedoModule) {
            this.undoRedoModule['getRedoCollection'] = [];
            if (this.toolbarModule) {
                this.toolbarModule.enableItems([this.controlId + '_redo'], false);
            }
        }
    };
    /**
     * Initiates an undo action to revert the most recent change performed.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.undo = function () {
        if (this.undoRedoModule) {
            this.undoRedoModule['undoAction']();
        }
    };
    /**
     * Initiates a redo action to reapply the most recent undone change performed.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.redo = function () {
        if (this.undoRedoModule) {
            this.undoRedoModule['redoAction']();
        }
    };
    /**
     * To render the critical path tasks in Gantt.
     *
     * @returns {void} .
     * @param {boolean} isCritical - To checks whether to render critical path or not .
     * @public
     */
    Gantt.prototype.showCriticalPath = function (isCritical) {
        if (this.criticalPathModule) {
            this.criticalPathModule.showCriticalPath(isCritical);
            var criticalModule = this.criticalPathModule;
            this.criticalPathModule.criticalConnectorLine(criticalModule.criticalPathCollection, criticalModule.detailPredecessorCollection, true, criticalModule.predecessorCollectionTaskIds);
        }
    };
    /**
     * To get all the critical tasks in Gantt.
     *
     * @returns {IGanttData[]} .
     * @public
     */
    Gantt.prototype.getCriticalTasks = function () {
        if (!isNullOrUndefined(this.criticalPathModule) && this.enableCriticalPath) {
            return this.criticalPathModule.getCriticalTasks();
        }
        else {
            return null;
        }
    };
    /**
     * To perform Zoom in action on Gantt timeline.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.zoomIn = function () {
        this.timelineModule.processZooming(true);
    };
    /**
     * To perform zoom out action on Gantt timeline.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.zoomOut = function () {
        this.timelineModule.processZooming(false);
    };
    /**
     * To show all project task in available chart width.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.fitToProject = function () {
        this.timelineModule.processZoomToFit();
        this.ganttChartModule.updateScrollLeft(0);
    };
    /**
     * Reorder the rows based on given indexes and position.
     *
     * @param {number[]} fromIndexes - Defines the indexes of the dragged records.
     * @param {number} toIndex - Defines the index where the dragged rows will be dropped.
     * @param {string} position - Defines the position of the dropped row.
     * @returns {void} .
     */
    Gantt.prototype.reorderRows = function (fromIndexes, toIndex, position) {
        this.rowDragAndDropModule.reorderRows(fromIndexes, toIndex, position);
    };
    /**
     * Method to update record by Index.
     *
     * @param  {number} index - Defines the index of data to modify.
     * @param  {object} data - Defines the data to modify.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.updateRecordByIndex = function (index, data) {
        if (this.editModule && this.editSettings.allowEditing) {
            var tasks = this.taskFields;
            var record = this.updatedRecords.length > 0 ?
                !isNullOrUndefined(this.updatedRecords[index]) ? this.updatedRecords[index] : null : null;
            if (!isNullOrUndefined(record)) {
                data[tasks.id] = record[tasks.id];
                this.editModule.updateRecordByID(data);
            }
        }
    };
    /**
     * To add dependency for Task.
     *
     * @param  {number} id - Defines the ID of data to modify.
     * @param  {string} predecessorString - Defines the predecessor string to add.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.addPredecessor = function (id, predecessorString) {
        var ganttRecord = this.getRecordByID(id.toString());
        if (this.editModule && !isNullOrUndefined(ganttRecord) && this.editSettings.allowTaskbarEditing) {
            this.connectorLineEditModule.addPredecessor(ganttRecord, predecessorString);
        }
    };
    /**
     * To remove dependency from task.
     *
     * @param  {number} id - Defines the ID of the task from which the dependency will be removed.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.removePredecessor = function (id) {
        var ganttRecord = this.getRecordByID(id.toString());
        if (this.editModule && !isNullOrUndefined(ganttRecord) && this.editSettings.allowTaskbarEditing) {
            this.connectorLineEditModule.removePredecessor(ganttRecord);
        }
    };
    /**
     * To modify current dependency values of Task by task id.
     *
     * @param  {number} id - Defines the ID of data to modify.
     * @param  {string} predecessorString - Defines the predecessor string to update.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.updatePredecessor = function (id, predecessorString) {
        var ganttRecord = this.getRecordByID(id.toString());
        if (this.editModule && !isNullOrUndefined(ganttRecord) && this.editSettings.allowTaskbarEditing) {
            this.connectorLineEditModule.updatePredecessor(ganttRecord, predecessorString);
        }
    };
    /**
     * Method to open Add dialog.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.openAddDialog = function () {
        if (this.editModule && this.editModule.dialogModule && this.editSettings.allowAdding) {
            this.editModule.dialogModule.openAddDialog();
        }
    };
    /**
     * Method to open Edit dialog.
     *
     * @param {number } taskId - Defines the id of task.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.openEditDialog = function (taskId) {
        if (this.editModule && this.editModule.dialogModule && this.editSettings.allowEditing) {
            this.editModule.dialogModule.openEditDialog(taskId);
        }
    };
    /**
     * Changes the TreeGrid column positions by field names.
     *
     * @param {string | number} id .
     * @param {number} index .
     * @returns {void} .
     * @private
     */
    Gantt.prototype.contructExpandCollapseArgs = function (id, index) {
        var chartRow;
        var record;
        var rowIndex;
        if (isNullOrUndefined(index) && id) {
            record = this.getRecordByID(id.toString());
            chartRow = this.getRowByID(id);
            if (!isNullOrUndefined(chartRow)) {
                rowIndex = getValue('rowIndex', chartRow);
            }
        }
        else if (!isNullOrUndefined(index)) {
            chartRow = this.getRowByIndex(index);
            rowIndex = index;
            record = this.flatData[rowIndex];
        }
        var gridRow = this.treeGrid.getRows()[rowIndex];
        return { data: record, gridRow: gridRow, chartRow: chartRow, cancel: false };
    };
    /**
     * Method to get chart row value by index.
     *
     * @param {number} index - Defines the index of row.
     * @returns {HTMLElement} .
     */
    Gantt.prototype.getRowByIndex = function (index) {
        try {
            var gridRows = this.element.querySelectorAll('.e-chart-row');
            if (!isNullOrUndefined(index)) {
                return gridRows[index];
            }
            else {
                return null;
            }
        }
        catch (e) {
            return null;
        }
    };
    /**
     * Method to get the row element by task id.
     *
     * @param {string | number} id - Defines the id of task.
     * @returns {HTMLElement} .
     */
    Gantt.prototype.getRowByID = function (id) {
        var _this = this;
        var record = this.getRecordByID(id.toString());
        var index;
        if (this.loadChildOnDemand && this.taskFields.hasChildMapping) {
            index = this.updatedRecords.map(function (item) { return item[_this.taskFields.id]; }).indexOf(record.ganttProperties.taskId);
        }
        else {
            index = this.enableVirtualization ? this.currentViewData.indexOf(record) : this.updatedRecords.indexOf(record);
        }
        if (index !== -1) {
            return this.getRowByIndex(index);
        }
        else {
            return null;
        }
    };
    /**
     * Method to get class name for unscheduled tasks
     *
     * @param {ITaskData} ganttProp .
     * @returns {string} .
     * @private
     */
    Gantt.prototype.getUnscheduledTaskClass = function (ganttProp) {
        if (isNullOrUndefined(ganttProp.startDate) && isNullOrUndefined(ganttProp.endDate) &&
            isNullOrUndefined(ganttProp.duration)) {
            return ' ' + cls.traceUnscheduledTask;
        }
        else if (isNullOrUndefined(ganttProp.startDate) || isNullOrUndefined(ganttProp.endDate) ||
            isNullOrUndefined(ganttProp.duration)) {
            return ' ' + cls.traceUnscheduledTask;
        }
        else {
            return '';
        }
    };
    /**
     * Method to get class name for unscheduled tasks
     *
     * @param {ITaskData} ganttProp -Defines the Gantt propertie.
     * @returns {boolean} .
     * @private
     */
    Gantt.prototype.isUnscheduledTask = function (ganttProp) {
        if (isNullOrUndefined(ganttProp.startDate) || isNullOrUndefined(ganttProp.endDate) ||
            isNullOrUndefined(ganttProp.duration)) {
            return true;
        }
        else {
            return false;
        }
    };
    Gantt.prototype.createGanttPopUpElement = function () {
        var popup = this.createElement('div', { className: 'e-ganttpopup', styles: 'display:none;' });
        var content = this.createElement('div', { className: 'e-content', attrs: { tabIndex: '-1' } });
        append([content, this.createElement('div', { className: 'e-uptail e-tail' })], popup);
        content.appendChild(this.createElement('span'));
        append([content, this.createElement('div', { className: 'e-downtail e-tail' })], popup);
        document.getElementById(this.element.id + 'GanttChart').appendChild(popup);
    };
    /**
     * Method to get predecessor value as string.
     *
     * @param {string} type .
     * @returns {HTMLElement} .
     * @private
     */
    Gantt.prototype.getPredecessorTextValue = function (type) {
        var textValue;
        switch (type) {
            case 'SS':
                textValue = this.localeObj.getConstant('start') + '-' + this.localeObj.getConstant('start');
                break;
            case 'FF':
                textValue = this.localeObj.getConstant('finish') + '-' + this.localeObj.getConstant('finish');
                break;
            case 'SF':
                textValue = this.localeObj.getConstant('start') + '-' + this.localeObj.getConstant('finish');
                break;
            case 'FS':
                textValue = this.localeObj.getConstant('finish') + '-' + this.localeObj.getConstant('start');
                break;
        }
        return textValue;
    };
    /**
     * Method to perform search action in Gantt.
     *
     * @param {string} keyVal - Defines key value to search.
     * @returns {void} .
     */
    Gantt.prototype.search = function (keyVal) {
        if (this.filterModule) {
            this.searchSettings.key = keyVal;
            this.dataBind();
        }
    };
    /**
     * Method to get offset rect value
     *
     * @param {HTMLElement} element .
     * @returns {number} .
     * @hidden
     */
    Gantt.prototype.getOffsetRect = function (element) {
        var box = element.getBoundingClientRect();
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop
            || document.body.scrollTop;
        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft ||
            document.body.scrollLeft;
        var clientTop = document.documentElement.clientTop || document.body.clientTop || 0;
        var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
        var top = box.top + scrollTop - clientTop;
        var left = this.enableRtl ? box.right + scrollLeft - clientLeft : box.left + scrollLeft - clientLeft;
        return { top: Math.round(top), left: Math.round(left), width: box.width, height: box.height };
    };
    /**
     * Method to expand all the rows of Gantt.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.expandAll = function () {
        this.ganttChartModule.expandCollapseAll('expand');
    };
    /**
     * Method to update data source.
     *
     * @returns {void} .
     * @param {object[]} dataSource - Defines a collection of data.
     * @param {object} args - Defines the projectStartDate and projectEndDate values.
     * @public
     */
    Gantt.prototype.updateDataSource = function (dataSource, args) {
        this.isDynamicData = true;
        if (!isNullOrUndefined(args)) {
            for (var _i = 0, _a = Object.keys(args); _i < _a.length; _i++) { // eslint-disable-line
                var prop = _a[_i];
                switch (prop) {
                    case 'projectStartDate':
                        this.setProperties({ projectStartDate: args[prop] }, true);
                        break;
                    case 'projectEndDate':
                        this.setProperties({ projectEndDate: args[prop] }, true);
                        break;
                }
            }
        }
        this.dataSource = dataSource;
    };
    /**
     * Method to collapse all the rows of Gantt.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.collapseAll = function () {
        this.ganttChartModule.expandCollapseAll('collapse');
    };
    /**
     * Gets the columns from the TreeGrid.
     *
     * @returns {Column[]} .
     * @public
     */
    Gantt.prototype.getGridColumns = function () {
        return this.treeGrid.getColumns();
    };
    /**
     * Method to column from given column collection based on field value
     *
     * @param {string} field .
     * @param {ColumnModel[]} columns .
     * @returns {ColumnModel} .
     * @private
     */
    Gantt.prototype.getColumnByField = function (field, columns) {
        var column = columns.filter(function (value) {
            return value.field === field;
        });
        return column.length > 0 ? column[0] : null;
    };
    /**
     * Gets the Gantt columns.
     *
     * @returns {ColumnModel[]} .
     * @public
     */
    Gantt.prototype.getGanttColumns = function () {
        return this.ganttColumns;
    };
    /**
     * Shows a column by its column name.
     *
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.showColumn = function (keys, showBy) {
        this.treeGrid.showColumns(keys, showBy);
        this.updateTreeColumns();
    };
    /**
     * Hides one or more columns in the Gantt chart based on the specified column names or header texts.
     *
     * @param  {string|string[]} keys - Defines a single or collection of column names.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.hideColumn = function (keys, hideBy) {
        this.treeGrid.hideColumns(keys, hideBy);
        this.updateTreeColumns();
    };
    /**
     * To set scroll top for chart scroll container.
     *
     * @param {number} scrollTop - Defines scroll top value for scroll container.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.setScrollTop = function (scrollTop) {
        this.ganttChartModule.scrollObject.setScrollTop(scrollTop);
    };
    /**
     * Cancels the current edit operation and reverts the changes made during editing.
     *
     * @returns {void} .
     * @public
     */
    Gantt.prototype.cancelEdit = function () {
        this.isCancelled = true;
        this.closeGanttActions();
    };
    /**
     * Selects a cell by the given index.
     *
     * @param  {IIndex} cellIndex - Defines the row and column indexes.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void} .
     */
    Gantt.prototype.selectCell = function (cellIndex, isToggle) {
        if (this.selectionModule) {
            this.selectionModule.selectCell(cellIndex, isToggle);
        }
    };
    /**
     * Selects a collection of cells by row and column indexes.
     *
     * @param  {ISelectedCell[]} rowCellIndexes - Specifies the row and column indexes.
     * @returns {void} .
     */
    Gantt.prototype.selectCells = function (rowCellIndexes) {
        if (this.selectionModule) {
            this.selectionModule.selectCells(rowCellIndexes);
        }
    };
    /**
     * Selects a row by given index.
     *
     * @param  {number} index - Defines the row index.
     * @param  {boolean} isToggle - If set to true, then it toggles the selection.
     * @returns {void} .
     */
    Gantt.prototype.selectRow = function (index, isToggle) {
        if (this.selectionModule) {
            this.selectionModule.selectRow(index, isToggle);
        }
    };
    /**
     * Selects a collection of rows by indexes.
     *
     * @param  {number[]} records - Defines the collection of row indexes.
     * @returns {void} .
     */
    Gantt.prototype.selectRows = function (records) {
        if (this.selectionModule) {
            this.selectionModule.selectRows(records);
        }
    };
    /**
     * Method to delete record.
     *
     * @param {number | string } taskDetail - Defines the details of data to delete.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.deleteRecord = function (taskDetail) {
        if (this.editModule) {
            this.editModule.deleteRecord(taskDetail);
        }
    };
    /**
     * Enables or disables ToolBar items.
     *
     * @param {string[]} items - Defines the collection of itemID of ToolBar items.
     * @param {boolean} isEnable - Defines the items to be enabled or disabled.
     * @returns {void} .
     */
    Gantt.prototype.enableItems = function (items, isEnable) {
        if (this.toolbarModule) {
            this.toolbarModule.enableItems(items, isEnable);
        }
    };
    /**
     * Deselects the current selected rows and cells.
     *
     * @returns {void} .
     */
    Gantt.prototype.clearSelection = function () {
        if (this.selectionModule) {
            this.selectionModule.clearSelection();
        }
    };
    /**
     * @param {ITaskAddedEventArgs | IActionBeginEventArgs} args .
     * @returns {ITaskAddedEventArgs | IActionBeginEventArgs} .
     * @hidden
     */
    Gantt.prototype.updateDataArgs = function (args) {
        if (!Array.isArray(args.data)) {
            var customData = [];
            customData.push(args.data);
            setValue('data', customData, args);
        }
        return args;
    };
    /**
     * Method to convert task data to milestone data.
     *
     * @param {string} id - Defines id of record.
     * @returns {void} .
     * @public
     */
    Gantt.prototype.convertToMilestone = function (id) {
        var rowData = this.getRecordByID(id);
        if (!isNullOrUndefined(rowData)) {
            var data = extend({}, {}, rowData.taskData, true);
            var taskfields = this.taskFields;
            if (data[taskfields.startDate]) {
                this.setRecordValue(taskfields.startDate, rowData.ganttProperties.startDate, data, true);
            }
            if (!isNullOrUndefined(taskfields.duration)) {
                data[taskfields.duration] = 0;
            }
            else {
                data[taskfields.startDate] = new Date(rowData.ganttProperties.startDate);
                data[taskfields.endDate] = new Date(rowData.ganttProperties.endDate);
            }
            if (!isNullOrUndefined(taskfields.milestone)) {
                if (data[taskfields.milestone] === false) {
                    data[taskfields.milestone] = true;
                }
            }
            if (!isNullOrUndefined(taskfields.progress)) {
                data[taskfields.progress] = 0;
            }
            if (!isNullOrUndefined(taskfields.child) && data[taskfields.child]) {
                data[taskfields.child] = [];
            }
            if (!isNullOrUndefined(taskfields.parentID) && data[taskfields.parentID]) {
                data[taskfields.parentID] = null;
            }
            if (!isNullOrUndefined(taskfields.segments)) {
                data[taskfields.segments] = null;
            }
            var taskType = !isNullOrUndefined(rowData.ganttProperties.taskType) ? rowData.ganttProperties.taskType
                : this.taskType;
            if (taskType === 'FixedWork') {
                if (!isNullOrUndefined(data[taskfields.work])) {
                    data[taskfields.work] = 0;
                }
                else {
                    rowData.ganttProperties.work = 0;
                }
            }
            if (!isNullOrUndefined(this.contextMenuModule) &&
                this.contextMenuModule.isOpen &&
                this.contextMenuModule.item === 'Milestone') {
                if (!isNullOrUndefined(taskfields.dependency)) {
                    data[taskfields.dependency] = null;
                }
                var position = this.editSettings.newRowPosition;
                this.addRecord(data, position, this.selectedRowIndex);
            }
            else {
                if (!rowData.hasChildRecords && !rowData.ganttProperties.isMilestone) {
                    this.isConvertedMilestone = true;
                    this.updateRecordByID(data);
                    this.isConvertedMilestone = false;
                }
            }
        }
    };
    /**
     * To change the mode of a record.
     *
     * @param {object} data - Use to change the TaskMode either manual, auto or custom.
     * @returns {void} .
     */
    Gantt.prototype.changeTaskMode = function (data) {
        if (this.undoRedoModule && !this.undoRedoModule['isUndoRedoPerformed']) {
            if (this.undoRedoModule['redoEnabled']) {
                this.undoRedoModule['disableRedo']();
            }
            this.undoRedoModule['createUndoCollection']();
            var details = {};
            details['action'] = 'TaskMode';
            details['modifiedRecords'] = extend([], [data], [], true);
            this.undoRedoModule['getUndoCollection'][this.undoRedoModule['getUndoCollection'].length - 1] = details;
        }
        var tasks = this.taskFields;
        var ganttData = this.getRecordByID(data[tasks.id]);
        var ganttProp = ganttData.ganttProperties;
        this.isOnEdit = true;
        this.setRecordValue('isAutoSchedule', !ganttProp.isAutoSchedule, ganttProp, true);
        if (!isNullOrUndefined(this.taskFields.manual)) {
            this.setRecordValue('taskData.' + tasks.manual, !ganttProp.isAutoSchedule, ganttData);
            this.setRecordValue(tasks.manual, !ganttProp.isAutoSchedule, ganttData);
        }
        this.editModule.updateTaskScheduleModes(ganttData);
        var args = {
            data: ganttData
        };
        this.editModule.initiateUpdateAction(args);
    };
    /**
     * @returns {string[]} .
     * @private
     */
    Gantt.prototype.getTaskIds = function () {
        return this.taskIds;
    };
    /**
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    Gantt.prototype.setTaskIds = function (data) {
        if (this.viewType !== 'ProjectView') {
            var id = data.ganttProperties.taskId;
            id = data.level === 0 ? 'R' + id : 'T' + id;
            this.taskIds.push(id);
        }
    };
    /**
     * To render the react templates
     *
     * @returns {void} .
     *  @hidden
     */
    Gantt.prototype.renderTemplates = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    /**
     * To reset the react templates
     *
     * @returns {void} .
     *  @hidden
     */
    Gantt.prototype.resetTemplates = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.clearTemplate();
        }
    };
    __decorate([
        Property(true)
    ], Gantt.prototype, "allowKeyboard", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "enableImmutableMode", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "allowParentDependency", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "disableHtmlEncode", void 0);
    __decorate([
        Complex({}, LoadingIndicator)
    ], Gantt.prototype, "loadingIndicator", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "enableVirtualMaskRow", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "loadChildOnDemand", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "updateOffsetOnTaskbarEdit", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "UpdateOffsetOnTaskbarEdit", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "autoCalculateDateScheduling", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "autoFocusTasks", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "enableAdaptiveUI", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "allowSelection", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "allowSorting", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "enablePredecessorValidation", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "showColumnMenu", void 0);
    __decorate([
        Property()
    ], Gantt.prototype, "columnMenuItems", void 0);
    __decorate([
        Property(['Sorting', 'Add', 'ColumnReorder', 'ColumnResize', 'ColumnState', 'Delete', 'Edit', 'Filtering', 'Indent', 'Outdent', 'NextTimeSpan', 'PreviousTimeSpan', 'RowDragAndDrop', 'TaskbarDragAndDrop', 'Search', 'ZoomIn', 'ZoomOut', 'ZoomToFit'])
    ], Gantt.prototype, "undoRedoActions", void 0);
    __decorate([
        Property()
    ], Gantt.prototype, "timezone", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "collapseAllParentTasks", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "highlightWeekends", void 0);
    __decorate([
        Property(0)
    ], Gantt.prototype, "treeColumnIndex", void 0);
    __decorate([
        Property([])
    ], Gantt.prototype, "dataSource", void 0);
    __decorate([
        Property('day')
    ], Gantt.prototype, "durationUnit", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "query", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "dateFormat", void 0);
    __decorate([
        Property('auto')
    ], Gantt.prototype, "height", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "renderBaseline", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "allowTaskbarDragAndDrop", void 0);
    __decorate([
        Property(true)
    ], Gantt.prototype, "allowTaskbarOverlap", void 0);
    __decorate([
        Property('Horizontal')
    ], Gantt.prototype, "gridLines", void 0);
    __decorate([
        Complex({}, LabelSettings)
    ], Gantt.prototype, "labelSettings", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "taskbarTemplate", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "parentTaskbarTemplate", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "timelineTemplate", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "milestoneTemplate", void 0);
    __decorate([
        Property()
    ], Gantt.prototype, "baselineColor", void 0);
    __decorate([
        Property('auto')
    ], Gantt.prototype, "width", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "enableVirtualization", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "enableTimelineVirtualization", void 0);
    __decorate([
        Property()
    ], Gantt.prototype, "toolbar", void 0);
    __decorate([
        Property(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    ], Gantt.prototype, "workWeek", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "includeWeekend", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "allowUnscheduledTasks", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "showInlineNotes", void 0);
    __decorate([
        Property(36)
    ], Gantt.prototype, "rowHeight", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "taskbarHeight", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "projectStartDate", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "projectEndDate", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "resourceIDMapping", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "resourceNameMapping", void 0);
    __decorate([
        Property([])
    ], Gantt.prototype, "resources", void 0);
    __decorate([
        Property([])
    ], Gantt.prototype, "segmentData", void 0);
    __decorate([
        Property(null)
    ], Gantt.prototype, "connectorLineBackground", void 0);
    __decorate([
        Property(1)
    ], Gantt.prototype, "connectorLineWidth", void 0);
    __decorate([
        Property([])
    ], Gantt.prototype, "columns", void 0);
    __decorate([
        Property([])
    ], Gantt.prototype, "addDialogFields", void 0);
    __decorate([
        Property([])
    ], Gantt.prototype, "editDialogFields", void 0);
    __decorate([
        Property(-1)
    ], Gantt.prototype, "selectedRowIndex", void 0);
    __decorate([
        Property('hour')
    ], Gantt.prototype, "workUnit", void 0);
    __decorate([
        Property('FixedUnit')
    ], Gantt.prototype, "taskType", void 0);
    __decorate([
        Property('ProjectView')
    ], Gantt.prototype, "viewType", void 0);
    __decorate([
        Collection([{ from: 8, to: 12 }, { from: 13, to: 17 }], DayWorkingTime)
    ], Gantt.prototype, "dayWorkingTime", void 0);
    __decorate([
        Collection([], WeekWorkingTime)
    ], Gantt.prototype, "weekWorkingTime", void 0);
    __decorate([
        Collection([], Holiday)
    ], Gantt.prototype, "holidays", void 0);
    __decorate([
        Collection([], EventMarker)
    ], Gantt.prototype, "eventMarkers", void 0);
    __decorate([
        Complex({}, TaskFields)
    ], Gantt.prototype, "taskFields", void 0);
    __decorate([
        Complex({}, ResourceFields)
    ], Gantt.prototype, "resourceFields", void 0);
    __decorate([
        Complex({}, TimelineSettings)
    ], Gantt.prototype, "timelineSettings", void 0);
    __decorate([
        Property([])
    ], Gantt.prototype, "zoomingLevels", void 0);
    __decorate([
        Complex({}, SortSettings)
    ], Gantt.prototype, "sortSettings", void 0);
    __decorate([
        Complex({}, EditSettings)
    ], Gantt.prototype, "editSettings", void 0);
    __decorate([
        Complex({}, TooltipSettings)
    ], Gantt.prototype, "tooltipSettings", void 0);
    __decorate([
        Complex({}, SelectionSettings)
    ], Gantt.prototype, "selectionSettings", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "allowFiltering", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "allowExcelExport", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "allowRowDragAndDrop", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "allowReordering", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "readOnly", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "allowResizing", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "enableContextMenu", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "enableCriticalPath", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "enableUndoRedo", void 0);
    __decorate([
        Property(10)
    ], Gantt.prototype, "undoRedoStepsCount", void 0);
    __decorate([
        Property()
    ], Gantt.prototype, "contextMenuItems", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "allowPdfExport", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "validateManualTasksOnLinking", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "enableMultiTaskbar", void 0);
    __decorate([
        Property(false)
    ], Gantt.prototype, "showOverAllocation", void 0);
    __decorate([
        Property('Auto')
    ], Gantt.prototype, "taskMode", void 0);
    __decorate([
        Complex({}, FilterSettings)
    ], Gantt.prototype, "filterSettings", void 0);
    __decorate([
        Complex({}, SearchSettings)
    ], Gantt.prototype, "searchSettings", void 0);
    __decorate([
        Complex({}, SplitterSettings)
    ], Gantt.prototype, "splitterSettings", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "queryTaskbarInfo", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "beforeExcelExport", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "excelExportComplete", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "excelQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "excelHeaderQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "rowDrag", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "rowDragStart", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "rowDragStartHelper", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "rowDrop", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "collapsing", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "collapsed", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "expanding", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "expanded", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "dataStateChange", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "taskbarEdited", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "endEdit", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "cellEdit", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "load", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "created", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "taskbarEditing", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "resizeStart", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "splitterResizeStart", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "splitterResizing", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "splitterResized", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "columnDragStart", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "columnDrag", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "columnDrop", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "beforeTooltipRender", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "rowSelecting", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "rowSelected", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "rowDeselecting", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "rowDeselected", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "cellSelecting", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "cellSelected", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "cellDeselecting", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "cellDeselected", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "queryCellInfo", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "headerCellInfo", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "rowDataBound", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "columnMenuOpen", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "toolbarClick", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "columnMenuClick", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "contextMenuOpen", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "contextMenuClick", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "onTaskbarClick", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "recordDoubleClick", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "onMouseMove", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "beforePdfExport", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "pdfExportComplete", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "pdfQueryCellInfo", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "pdfQueryTaskbarInfo", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "pdfQueryTimelineCellInfo", void 0);
    __decorate([
        Event()
    ], Gantt.prototype, "pdfColumnHeaderQueryCellInfo", void 0);
    Gantt = __decorate([
        NotifyPropertyChanges
    ], Gantt);
    return Gantt;
}(Component));
export { Gantt };
