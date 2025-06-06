import { TreeGrid } from '@syncfusion/ej2-treegrid';
import { createElement, isNullOrUndefined, getValue, extend, EventHandler, deleteObject, remove, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { setValue } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { Column as GanttColumn } from '../models/column';
import { isCountRequired, isEmptyObject } from './utils';
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
/** @hidden */
var GanttTreeGrid = /** @class */ (function () {
    function GanttTreeGrid(parent) {
        var _this = this;
        this.isPersist = false;
        this.previousScroll = { top: 0, left: 0 };
        this.queryCellInfo = function (args) {
            _this.parent.trigger('queryCellInfo', args);
        };
        this.headerCellInfo = function (args) {
            _this.parent.trigger('headerCellInfo', args);
        };
        this.rowDataBound = function (args) {
            _this.parent.trigger('rowDataBound', args);
        };
        this.columnMenuOpen = function (args) {
            _this.parent.notify('columnMenuOpen', args);
            _this.parent.trigger('columnMenuOpen', args);
            document.querySelector('.e-colmenu').addEventListener('mousemove', function () {
                var filPopOptions = document.querySelector('.e-filter-popup');
                var filOptions = document.querySelector('.e-filter-item');
                if (!isNullOrUndefined(filPopOptions)) {
                    if (!filOptions.classList.contains('e-focused')) {
                        remove(_this.parent.filterModule.filterMenuElement);
                    }
                }
            });
        };
        this.columnMenuClick = function (args) {
            _this.parent.trigger('columnMenuClick', args);
        };
        this.objectEqualityChecker = function (old, current) {
            if (old) {
                var keys = Object.keys(old);
                var isEqual = true;
                var excludeKeys = ['Children', 'childRecords', 'taskData', 'uniqueID', 'parentItem', 'parentUniqueID', 'ganttProperties'];
                for (var i = 0; i < keys.length; i++) {
                    var oldKey = old[keys[parseInt(i.toString(), 10)]] instanceof Date ?
                        new Date(old[keys[parseInt(i.toString(), 10)]]).getTime() : old[keys[parseInt(i.toString(), 10)]];
                    var currentKey = current[keys[parseInt(i.toString(), 10)]] instanceof Date ?
                        new Date(current[keys[parseInt(i.toString(), 10)]]).getTime() : current[keys[parseInt(i.toString(), 10)]];
                    if (oldKey !== currentKey && excludeKeys.indexOf(keys[i]) === -1) {
                        _this.parent.modifiedRecords.push(current);
                        isEqual = false;
                        break;
                    }
                }
                return isEqual;
            }
            else {
                return false;
            }
        };
        this.parent = parent;
        this.parent.treeGrid = new TreeGrid();
        this.parent.treeGrid.allowSelection = false;
        this.parent.treeGrid.allowKeyboard = this.parent.allowKeyboard;
        this.parent.treeGrid['${enableHtmlSanitizer}'] = this.parent.enableHtmlSanitizer;
        this.parent.treeGrid.enableImmutableMode = this.parent.enableImmutableMode;
        this.treeGridColumns = [];
        if (!this.parent.isLocaleChanged && this.parent.isLoad) {
            this.parent.previousGanttColumns = extend([], [], this.parent.columns, true);
        }
        this.validateGanttColumns();
        if (this.parent.isLocaleChanged) {
            this.parent.isLocaleChanged = false;
        }
        this.addEventListener();
    }
    GanttTreeGrid.prototype.addEventListener = function () {
        this.parent.on('renderPanels', this.createContainer, this);
        this.parent.on('chartScroll', this.updateScrollTop, this);
        this.parent.on('destroy', this.destroy, this);
        this.parent.treeGrid.on('renderReactTemplate', this.renderReactTemplate, this);
    };
    GanttTreeGrid.prototype.renderReactTemplate = function (args) {
        var portals = 'portals';
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var portal = args_1[_i];
            if (this.parent[portals].indexOf(portal) === -1) {
                this.parent[portals].push(portal);
            }
        }
        this.parent.renderTemplates();
    };
    GanttTreeGrid.prototype.createContainer = function () {
        //let height: number = this.parent.ganttHeight - this.parent.toolbarModule.element.offsetHeight - 46;
        this.treeGridElement = createElement('div', {
            id: 'treeGrid' + this.parent.element.id, className: 'e-gantt-tree-grid'
            //  styles: 'height:' + height + 'px;'
        });
        var tempHeader = createElement('div', { className: 'e-gantt-temp-header' });
        this.parent.treeGridPane.appendChild(this.treeGridElement);
        this.treeGridElement.appendChild(tempHeader);
        this.parent.treeGridPane.classList.add('e-temp-content');
    };
    /**
     * Method to initiate TreeGrid
     *
     * @returns {void} .
     */
    GanttTreeGrid.prototype.renderTreeGrid = function () {
        this.composeProperties();
        this.bindEvents();
        var root = 'root';
        this.parent.treeGrid[root] = this.parent[root] ? this.parent[root] : this.parent;
        setValue('registeredTemplate', this.registeredTemplate, this.parent.treeGrid);
        var ref = 'viewContainerRef';
        setValue('viewContainerRef', this.parent["" + ref], this.parent.treeGrid);
        if (!this.treeGridElement.contains(this.parent.treeGrid.element)) {
            this.parent.treeGrid.appendTo(this.treeGridElement);
        }
        if (this.parent.treeGrid.grid && this.parent.toolbarModule && this.parent.isReact) {
            this.parent.treeGrid.grid.portals = this.parent.portals;
        }
        this.wireEvents();
    };
    GanttTreeGrid.prototype.composeProperties = function () {
        this.parent.treeGrid.enableAdaptiveUI = this.parent.enableAdaptiveUI;
        this.parent.treeGrid.hasChildMapping = this.parent.taskFields.hasChildMapping;
        this.parent.treeGrid.query = this.parent.query;
        this.parent.treeGrid.loadChildOnDemand = this.parent.loadChildOnDemand;
        this.parent.treeGrid['isFromGantt'] = true;
        this.parent.treeGrid.parentIdMapping = this.parent.taskFields.parentID;
        if (this.parent.taskFields.parentID) {
            this.parent.treeGrid.idMapping = this.parent.taskFields.id;
        }
        this.parent.treeGrid.showColumnMenu = this.parent.showColumnMenu;
        this.parent.treeGrid.enableCollapseAll = this.parent.collapseAllParentTasks;
        this.parent.treeGrid.columnMenuItems = this.parent.columnMenuItems;
        this.parent.treeGrid.enableRtl = this.parent.enableRtl;
        this.parent.treeGrid.childMapping = isNullOrUndefined(this.parent.taskFields.child) ? '' : this.parent.taskFields.child;
        this.parent.treeGrid.treeColumnIndex = this.parent.treeColumnIndex;
        this.parent.treeGrid.columns = this.treeGridColumns;
        this.parent.treeGrid.loadingIndicator = this.parent.loadingIndicator;
        this.parent.treeGrid.enableVirtualMaskRow = this.parent.enableVirtualMaskRow;
        if (this.parent.dataSource instanceof Object && isCountRequired(this.parent)) {
            // In order to bind the observable data at load time, hasChildMapping is necessary to be mapped.
            this.parent.treeGrid.hasChildMapping = 'isParent';
            var count = getValue('count', this.parent.dataSource);
            this.parent.treeGrid.dataSource = { result: this.parent.flatData, count: count };
        }
        else {
            if (this.parent.treeGrid.loadChildOnDemand && this.parent.taskFields.hasChildMapping) {
                this.parent.treeGrid.dataSource = this.parent.dataSource;
            }
            else {
                this.parent.treeGrid.hasChildMapping = null;
                this.parent.treeGrid.dataSource = this.parent.flatData;
            }
        }
        this.parent.treeGrid.expandStateMapping = this.parent.taskFields.expandState;
        var isGantt = 'isGantt';
        this.parent.treeGrid[isGantt] = true;
        this.parent.treeGrid.rowHeight = this.parent.rowHeight;
        this.parent.treeGrid.gridLines = this.parent.gridLines;
        if (this.parent.searchSettings.fields.length !== 0 || this.parent.searchSettings.key !== '') {
            this.parent.treeGrid.searchSettings = this.parent.searchSettings;
        }
        var isJsComponent = 'isJsComponent';
        this.parent.treeGrid[isJsComponent] = true;
        this.parent.treeGrid.height =
            this.parent.element.getElementsByClassName('e-chart-scroll-container e-content')[0]['offsetHeight'] - (this.parent.flatData.length === 0 ? 0 : 19);
    };
    GanttTreeGrid.prototype.getContentDiv = function () {
        return this.treeGridElement.querySelector('.e-content');
    };
    GanttTreeGrid.prototype.getHeaderDiv = function () {
        return this.treeGridElement.querySelector('.e-headercontent');
    };
    GanttTreeGrid.prototype.getScrollbarWidth = function () {
        var outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        var inner = document.createElement('div');
        outer.appendChild(inner);
        this.parent.element.appendChild(outer);
        var scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);
        outer.parentNode.removeChild(outer);
        return scrollbarWidth;
    };
    /**
     * @returns {void} .
     * @private
     */
    GanttTreeGrid.prototype.ensureScrollBar = function () {
        var content = this.getContentDiv();
        var headerDiv = this.getHeaderDiv();
        var scrollWidth = this.getScrollbarWidth();
        var isMobile = /Android|Mac|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        // For Firefox scrollWidth value return 0, causes the grid side column misalign- Task(888356)
        if (scrollWidth !== 0 || navigator.userAgent.includes('Firefox')) {
            content.style.cssText += 'width: calc(100% + ' + (scrollWidth + 1) + 'px);'; //actual scrollbar width 17 px but here scrollbar width set to 16px hence adding increment of 1
        }
        else {
            content.classList.add('e-gantt-scroll-padding');
        }
        if (scrollWidth === 0 && isMobile) {
            headerDiv.style.cssText += 'width: calc(100% + 17px);';
        }
    };
    GanttTreeGrid.prototype.bindEvents = function () {
        this.parent.treeGrid.dataBound = this.dataBound.bind(this);
        this.parent.treeGrid.collapsing = this.collapsing.bind(this);
        this.parent.treeGrid.collapsed = this.collapsed.bind(this);
        this.parent.treeGrid.expanding = this.expanding.bind(this);
        this.parent.treeGrid.expanded = this.expanded.bind(this);
        this.parent.treeGrid.actionBegin = this.actionBegin.bind(this);
        this.parent.treeGrid.actionComplete = this.treeActionComplete.bind(this);
        this.parent.treeGrid.created = this.created.bind(this);
        this.parent.treeGrid.actionFailure = this.actionFailure.bind(this);
        this.parent.treeGrid.headerCellInfo = this.headerCellInfo.bind(this);
        this.parent.treeGrid.rowDataBound = this.rowDataBound.bind(this);
        this.parent.treeGrid.columnMenuOpen = this.columnMenuOpen.bind(this);
        this.parent.treeGrid.columnMenuClick = this.columnMenuClick.bind(this);
        this.parent.treeGrid.beforeDataBound = this.beforeDataBound.bind(this);
        this.parent.treeGrid.dataStateChange = this.dataStateChange.bind(this);
        if (this.parent.queryCellInfo != null) {
            this.parent.treeGrid.queryCellInfo = this.queryCellInfo.bind(this);
        }
    };
    GanttTreeGrid.prototype.beforeDataBound = function (args) {
        if (!isNullOrUndefined(this.parent.selectionModule) && this.parent.selectionSettings &&
            this.parent.selectionSettings.persistSelection && this.parent.selectionModule.getSelectedRowIndexes().length > 0 &&
            args['actionArgs']['requestType'] === 'sorting') {
            this.isPersist = true;
        }
        this.parent.updatedRecords = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
            getValue('virtualScrollModule.visualData', this.parent.treeGrid) : getValue('result', args);
        if (this.parent.virtualScrollModule && this.parent.enableVirtualization) {
            this.parent.updateContentHeight(args);
        }
        setValue('contentModule.objectEqualityChecker', this.objectEqualityChecker, this.parent.treeGrid.grid);
    };
    GanttTreeGrid.prototype.dataBound = function (args) {
        if (this.parent.isReact) {
            this.parent['clearTemplate'](['TaskbarTemplate', 'ParentTaskbarTemplate', 'MilestoneTemplate', 'TaskLabelTemplate', 'RightLabelTemplate', 'LeftLabelTemplate']);
        }
        this.ensureScrollBar();
        this.parent.treeDataBound(args);
        if (this.parent.isVirtualScroll) {
            if ((this.parent.enableVirtualMaskRow && this.parent.enableVirtualization) ||
                (this.parent.enableVirtualization && !this.parent.enableVirtualMaskRow && this.parent.loadingIndicator.indicatorType === 'Shimmer') ||
                (this.parent.loadingIndicator.indicatorType === 'Shimmer')) {
                this.parent.hideMaskRow();
            }
            if (this.parent.editModule && this.parent.editModule.cellEditModule) {
                this.parent.editModule.cellEditModule.isCellEdit = false;
            }
            this.parent.isVirtualScroll = false;
            if (!isNullOrUndefined(this.parent.selectionModule) && !isNullOrUndefined(this.parent.toolbarModule)) {
                this.parent.toolbarModule.refreshToolbarItems();
            }
        }
        this.prevCurrentView = extend([], [], this.parent.currentViewData, true);
    };
    GanttTreeGrid.prototype.dataStateChange = function (args) {
        if (args.action && args.action.requestType === 'refresh') {
            this.parent.treeGrid.dataSource = {
                result: getValue('result', this.parent.treeGrid.dataSource),
                count: getValue('count', this.parent.treeGrid.dataSource)
            };
        }
        this.parent.trigger('dataStateChange', args);
    };
    GanttTreeGrid.prototype.collapsing = function (args) {
        // Collapsing event
        var collapsingArgs;
        var record = getValue('data', args);
        var recordLength = record.length;
        if (!this.parent.ganttChartModule.isExpandCollapseFromChart) {
            if (!isNullOrUndefined(recordLength)) {
                for (var i = 0; i < recordLength; i++) {
                    collapsingArgs = this.createExpandCollapseArgs(args, record[i]);
                    this.parent.ganttChartModule.collapseGanttRow(collapsingArgs);
                }
                setValue('cancel', getValue('cancel', collapsingArgs), args);
            }
            else {
                collapsingArgs = this.createExpandCollapseArgs(args, null);
                this.parent.ganttChartModule.collapseGanttRow(collapsingArgs);
                setValue('cancel', getValue('cancel', collapsingArgs), args);
            }
        }
    };
    GanttTreeGrid.prototype.expanding = function (args) {
        // Expanding event
        var expandingArgs;
        var record = getValue('data', args);
        var recordLength = record.length;
        if (!this.parent.ganttChartModule.isExpandCollapseFromChart) {
            if (!isNullOrUndefined(recordLength)) {
                for (var i = 0; i < recordLength; i++) {
                    expandingArgs = this.createExpandCollapseArgs(args, record[i]);
                    this.parent.ganttChartModule.expandGanttRow(expandingArgs);
                }
                setValue('cancel', getValue('cancel', expandingArgs), args);
            }
            else {
                expandingArgs = this.createExpandCollapseArgs(args, null);
                this.parent.ganttChartModule.expandGanttRow(expandingArgs);
                setValue('cancel', getValue('cancel', expandingArgs), args);
            }
        }
    };
    GanttTreeGrid.prototype.collapsed = function (args) {
        if (!this.parent.ganttChartModule.isExpandCollapseFromChart && !this.parent.isExpandCollapseLevelMethod) {
            var collapsedArgs = void 0;
            var record = getValue('data', args);
            var recordLength = record.length;
            if (!isNullOrUndefined(recordLength)) {
                for (var i = 0; i < recordLength; i++) {
                    collapsedArgs = this.createExpandCollapseArgs(args, record[i]);
                    this.parent.ganttChartModule.collapsedGanttRow(collapsedArgs);
                }
            }
            else {
                collapsedArgs = this.createExpandCollapseArgs(args, null);
                this.parent.ganttChartModule.collapsedGanttRow(collapsedArgs);
            }
            if (!this.parent.ganttChartModule.isCollapseAll && collapsedArgs['gridRow'] && !this.parent.allowTaskbarOverlap) {
                collapsedArgs['gridRow'].style.height = collapsedArgs['chartRow'].style.height;
                this.parent.contentHeight = this.parent.enableRtl ? this.parent['element'].getElementsByClassName('e-content')[2].children[0]['offsetHeight'] :
                    this.parent['element'].getElementsByClassName('e-content')[0].children[0]['offsetHeight'];
                document.getElementsByClassName('e-chart-rows-container')[0]['style'].height = this.parent.contentHeight + 'px';
            }
        }
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
            this.parent.hideMaskRow();
        }
        else {
            this.parent.hideSpinner();
        }
        this.parent.trigger('collapsed', args);
    };
    GanttTreeGrid.prototype.expanded = function (args) {
        if (!this.parent.ganttChartModule.isExpandCollapseFromChart && !this.parent.isExpandCollapseLevelMethod) {
            var expandedArgs = void 0;
            var record = getValue('data', args);
            var recordLength = record.length;
            if (!isNullOrUndefined(recordLength)) {
                for (var i = 0; i < recordLength; i++) {
                    expandedArgs = this.createExpandCollapseArgs(args, record[i]);
                    this.parent.ganttChartModule.expandedGanttRow(expandedArgs);
                }
            }
            else {
                expandedArgs = this.createExpandCollapseArgs(args, null);
                this.parent.ganttChartModule.expandedGanttRow(expandedArgs);
            }
            if (!this.parent.ganttChartModule.isExpandAll && args['row'] && !this.parent.allowTaskbarOverlap) {
                args['row'].style.height = this.parent.rowHeight + 'px';
                this.parent.contentHeight = this.parent.enableRtl ? this.parent['element'].getElementsByClassName('e-content')[2].children[0]['offsetHeight'] :
                    this.parent['element'].getElementsByClassName('e-content')[0].children[0]['offsetHeight'];
                document.getElementsByClassName('e-chart-rows-container')[0]['style'].height = this.parent.contentHeight + 'px';
            }
        }
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
            this.parent.hideMaskRow();
        }
        else {
            this.parent.hideSpinner();
        }
        this.parent.isCollapseAll = false;
        this.parent.trigger('expanded', args);
    };
    GanttTreeGrid.prototype.actionBegin = function (args) {
        if (this.parent.undoRedoModule && (args.requestType === 'filtering' || args.requestType === 'searching' || args.requestType === 'sorting' || args.requestType === 'filterAfterOpen')) {
            this.parent.undoRedoModule['canUpdateIndex'] = false;
        }
        this.parent.notify('actionBegin', args);
        var flag = getValue('doubleClickTarget', this.parent.treeGrid.editModule);
        if (flag !== null) {
            setValue('doubleClickTarget', null, this.parent.treeGrid.editModule);
        }
        this.parent.trigger('actionBegin', args);
        if (args.requestType !== 'virtualscroll' && args.type !== 'edit' && args.requestType !== 'beginEdit' && !args.cancel) {
            if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                this.parent.showMaskRow();
            }
            else {
                this.parent.showSpinner();
            }
        }
    }; // eslint-disable-next-line
    GanttTreeGrid.prototype.created = function (args) {
        this.updateKeyConfigSettings();
    };
    GanttTreeGrid.prototype.actionFailure = function (args) {
        this.parent.trigger('actionFailure', args);
    };
    GanttTreeGrid.prototype.createExpandCollapseArgs = function (args, currentRecord) {
        var chartRow;
        var record = getValue('data', args);
        var recordLength = record.length;
        if (!isNullOrUndefined(recordLength)) {
            var gridRow = getValue('row', args);
            chartRow = this.parent.ganttChartModule.getChartRows()[this.parent.currentViewData.indexOf(currentRecord)];
            var eventArgs = { data: currentRecord, gridRow: gridRow, chartRow: chartRow, cancel: false };
            return eventArgs;
        }
        else {
            var recordOne = getValue('data', args);
            var gridRow = getValue('row', args);
            chartRow = this.parent.ganttChartModule.getChartRows()[this.parent.currentViewData.indexOf(recordOne)];
            var eventArgs = { data: recordOne, gridRow: gridRow, chartRow: chartRow, cancel: false };
            return eventArgs;
        }
    };
    GanttTreeGrid.prototype.treeActionComplete = function (args) {
        var _this = this;
        var _a;
        var updatedArgs = extend({}, args);
        if (getValue('requestType', args) === 'reorder') {
            if (this.parent.undoRedoModule && !this.parent.undoRedoModule['isFromUndoRedo'] && this.parent['isUndoRedoItemPresent']('ColumnReorder')) {
                if (this.parent.undoRedoModule['redoEnabled']) {
                    this.parent.undoRedoModule['disableRedo']();
                }
                this.parent.undoRedoModule['createUndoCollection']();
                var record = {};
                record['action'] = 'ColumnReorder';
                record['fromIndex'] = extend([], [], [args['fromIndex']], true)[0];
                record['toIndex'] = extend([], [], [args['toIndex']], true)[0];
                record['toColumn'] = extend([], [], [this.parent.treeGrid.columns[args['toIndex']]['field']], true)[0];
                record['fromColumn'] = extend([], [], [this.parent.treeGrid.columns[args['fromIndex']]['field']], true)[0];
                this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = record;
            }
        }
        if (getValue('requestType', args) === 'columnstate') {
            if (this.parent.undoRedoModule && !this.parent.undoRedoModule['isFromUndoRedo'] && this.parent['isUndoRedoItemPresent']('ColumnState')) {
                if (this.parent.undoRedoModule['redoEnabled']) {
                    this.parent.undoRedoModule['disableRedo']();
                }
                this.parent.undoRedoModule['createUndoCollection']();
                var record = { action: 'ColumnState' };
                record['showhideColumns'] = extend([], [], args['columns'], true);
                this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = record;
            }
        }
        if (getValue('requestType', args) === 'sorting') {
            if (this.parent.undoRedoModule && this.parent['isUndoRedoItemPresent']('Sorting')) {
                if (this.parent.undoRedoModule['currentAction'] && this.parent.undoRedoModule['currentAction']['sortColumns'] && this.parent.undoRedoModule['currentAction']['sortColumns'].length > 1) {
                    this.parent.undoRedoModule['sortedColumnsLength']++;
                }
                if ((!this.parent.undoRedoModule['currentAction'] || (this.parent.undoRedoModule['currentAction']['sortColumns'] && this.parent.undoRedoModule['sortedColumnsLength'] !== this.parent.undoRedoModule['currentAction']['sortColumns'].length)) && !this.parent.undoRedoModule['isFromUndoRedo']) {
                    if (this.parent.undoRedoModule['redoEnabled']) {
                        this.parent.undoRedoModule['disableRedo']();
                    }
                    this.parent.undoRedoModule['createUndoCollection']();
                    var record = { action: 'Sorting' };
                    record['sortColumns'] = [];
                    record['sortColumns'] = this.parent.undoRedoModule['previousSortedColumns'];
                    this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = record;
                }
                this.parent.undoRedoModule['previousSortedColumns'] = this.parent.treeGrid.sortSettings.columns;
            }
            this.parent.notify('updateModel', {});
            deleteObject(updatedArgs, 'isFrozen');
        }
        else if (getValue('requestType', args) === 'filtering') {
            if (this.parent.undoRedoModule && !this.parent.undoRedoModule['isFromUndoRedo'] && this.parent['isUndoRedoItemPresent']('Filtering')) {
                if (this.parent.undoRedoModule['redoEnabled']) {
                    this.parent.undoRedoModule['disableRedo']();
                }
                this.parent.undoRedoModule['createUndoCollection']();
                var record = { action: 'Filtering' };
                record['filteredColumns'] = extend([], [], args['columns'], true);
                this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = record;
            }
            this.parent.notify('updateModel', {});
        }
        else if (getValue('type', args) === 'save') {
            if (this.parent.editModule && this.parent.editModule.cellEditModule) {
                var data = getValue('data', args);
                if (!isNullOrUndefined(data) && !isNullOrUndefined(this.parent.getTaskByUniqueID(data.uniqueID))) {
                    /* eslint-disable-next-line */
                    this.parent.getTaskByUniqueID(data.uniqueID).taskData[this.parent.taskFields.duration] = data.taskData[this.parent.taskFields.duration];
                    if (!isNullOrUndefined(data.taskData[this.parent.taskFields.resourceInfo])) {
                        /* eslint-disable-next-line */
                        this.parent.getTaskByUniqueID(data.uniqueID).taskData[this.parent.taskFields.resourceInfo] = data.taskData[this.parent.taskFields.resourceInfo];
                    }
                }
                if (isEmptyObject(this.currentEditRow) && args['column'] && args['column'].edit && args['column'].field === this.parent.taskFields.resourceInfo) {
                    var field = this.parent.taskFields.resourceInfo;
                    this.currentEditRow = (_a = {}, _a[field] = data['resources'], _a);
                }
                this.parent.editModule.cellEditModule.initiateCellEdit(args, this.currentEditRow);
                this.parent.editModule.cellEditModule.isCellEdit = false;
                this.currentEditRow = {};
            }
        }
        if (getValue('requestType', args) === 'filterAfterOpen') {
            this.parent.notify('actionComplete', args);
        }
        if (getValue('requestType', args) === 'searching') {
            if (this.parent.undoRedoModule && this.parent['isUndoRedoItemPresent']('Search')) {
                if (!this.parent.undoRedoModule['isFromUndoRedo']) {
                    if (this.parent.undoRedoModule['redoEnabled']) {
                        this.parent.undoRedoModule['disableRedo']();
                    }
                    this.parent.undoRedoModule['createUndoCollection']();
                    var record = { 'action': 'Search' };
                    record['searchString'] = this.parent.undoRedoModule['searchString'];
                    this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = record;
                }
                this.parent.undoRedoModule['searchString'] = this.parent.treeGrid.searchSettings.key;
            }
            this.parent.notify('actionComplete', args);
        }
        if (!isNullOrUndefined(this.parent.toolbarModule) && !isNullOrUndefined(getValue('batchChanges', args))) {
            this.parent.toolbarModule.refreshToolbarItems();
        }
        if (this.parent.isCancelled) {
            setValue('requestType', 'cancel', updatedArgs);
            setValue('action', 'CellEditing', updatedArgs);
            this.parent.isCancelled = false;
        }
        if (getValue('requestType', args) === 'refresh' && isNullOrUndefined(getValue('type', args)) && this.parent.addDeleteRecord) {
            if (this.parent.selectedRowIndex !== -1) {
                if (!isNullOrUndefined(this.parent.selectionModule) &&
                    this.parent.selectionSettings &&
                    this.parent.selectionSettings.persistSelection &&
                    this.parent.editModule.isAdded) {
                    var selectedIndexes = this.parent.selectionModule.selectedRowIndexes;
                    if (selectedIndexes.length > 1 && this.parent.selectionSettings.persistSelection) {
                        for (var i = 0; i < selectedIndexes.length; i++) {
                            var records = this.parent.flatData[selectedIndexes[i].toString()];
                            this.parent.selectRows(records);
                        }
                    }
                }
                else {
                    this.parent.selectRow(this.parent.selectedRowIndex);
                    if (this.parent.selectedRowIndex > this.parent.currentViewData.length - 1) {
                        this.parent.selectedRowIndex = -1;
                    }
                }
            }
            else {
                if (!isNullOrUndefined(this.parent.selectionModule) && this.parent.selectionSettings &&
                    this.parent.selectionSettings.persistSelection
                    && this.parent.editModule && !this.parent.editModule.isAdded) {
                    var selectedRecords = this.parent.selectionModule.getSelectedRecords();
                    var _loop_1 = function (i) {
                        var selectedTaskId = selectedRecords[i][this_1.parent.taskFields.id];
                        var existIndeletedRecords = this_1.parent.editModule.deletedRecord.some(function (item) {
                            return item.ganttProperties.taskId === selectedTaskId;
                        });
                        if (existIndeletedRecords) {
                            selectedRecords.splice(i, 1);
                        }
                    };
                    var this_1 = this;
                    for (var i = selectedRecords.length - 1; i >= 0; i--) {
                        _loop_1(i);
                    }
                }
                var indexvalue_1 = 0;
                var dataCollection = this.parent.enableVirtualization ? this.parent.flatData : this.parent.currentViewData;
                // To maintain 1st record selection, while deleting the last parent record at Virtual mode
                dataCollection.map(function (data, index) {
                    if (!isNullOrUndefined(_this.parent.currentSelection)
                        && (data['ganttProperties'].taskId === _this.parent.currentSelection[_this.parent.taskFields.id]) &&
                        ((_this.parent.viewType === 'ResourceView' &&
                            data['ganttProperties'].rowUniqueID === _this.parent.currentSelection.rowUniqueID) ||
                            _this.parent.viewType !== 'ResourceView')) {
                        indexvalue_1 = index;
                    }
                });
                this.addedRecord = true;
                this.parent.selectRow((isNullOrUndefined(indexvalue_1) ? 0 : indexvalue_1));
            }
            if (!this.parent['isExpandPerformed']) {
                this.parent.addDeleteRecord = false;
            }
            this.parent['isExpandPerformed'] = false;
        }
        if (this.parent.undoRedoModule) {
            this.parent.undoRedoModule['isFromUndoRedo'] = false;
        }
        if (getValue('requestType', args) === 'refresh') {
            this.parent.initiateEditAction(false);
        }
        this.parent.trigger('actionComplete', updatedArgs);
        if (this.parent.showOverAllocation && !this.parent.allowTaskbarOverlap) {
            for (var i = 0; i < this.parent.currentViewData.length; i++) {
                if (this.parent.currentViewData[i].hasChildRecords && !this.parent.currentViewData[i].expanded) {
                    this.parent.chartRowsModule.updateDragDropRecords(this.parent.currentViewData[i]);
                }
            }
            this.parent.ganttChartModule.renderRangeContainer(this.parent.currentViewData);
        }
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
            this.parent.hideMaskRow();
        }
        else {
            this.parent.hideSpinner();
        }
    };
    GanttTreeGrid.prototype.updateKeyConfigSettings = function () {
        delete this.parent.treeGrid.grid.keyboardModule.keyConfigs.delete;
        delete this.parent.treeGrid.grid.keyboardModule.keyConfigs.insert;
        delete this.parent.treeGrid.grid.keyboardModule.keyConfigs.upArrow;
        delete this.parent.treeGrid.grid.keyboardModule.keyConfigs.downArrow;
        delete this.parent.treeGrid.grid.keyboardModule.keyConfigs.ctrlHome;
        delete this.parent.treeGrid.grid.keyboardModule.keyConfigs.ctrlEnd;
        delete this.parent.treeGrid.grid.keyboardModule.keyConfigs.enter;
        delete this.parent.treeGrid.grid.keyboardModule.keyConfigs.tab;
        delete this.parent.treeGrid.grid.keyboardModule.keyConfigs.shiftTab;
        delete this.parent.treeGrid.keyboardModule.keyConfigs.enter;
        delete this.parent.treeGrid.keyboardModule.keyConfigs.upArrow;
        delete this.parent.treeGrid.keyboardModule.keyConfigs.downArrow;
        delete this.parent.treeGrid.keyboardModule.keyConfigs.ctrlShiftUpArrow;
        delete this.parent.treeGrid.keyboardModule.keyConfigs.ctrlShiftDownArrow;
        delete this.parent.treeGrid.keyboardModule.keyConfigs.ctrlUpArrow;
        delete this.parent.treeGrid.keyboardModule.keyConfigs.ctrlDownArrow;
        delete this.parent.treeGrid.keyboardModule.keyConfigs.tab;
        delete this.parent.treeGrid.keyboardModule.keyConfigs.shiftTab;
    };
    /**
     * Method to bind internal events on TreeGrid element
     *
     * @returns {void} .
     */
    GanttTreeGrid.prototype.wireEvents = function () {
        var content = this.parent.treeGrid.element.querySelector('.e-content');
        if (content) {
            EventHandler.add(content, 'scroll', this.scrollHandler, this);
        }
        if (this.parent.isAdaptive) {
            EventHandler.add(this.parent.treeGridPane, 'click', this.treeGridClickHandler, this);
        }
    };
    GanttTreeGrid.prototype.unWireEvents = function () {
        var content = this.parent.treeGrid.element &&
            this.parent.treeGrid.element.querySelector('.e-content');
        if (content) {
            EventHandler.remove(content, 'scroll', this.scrollHandler);
        }
        if (this.parent.isAdaptive) {
            EventHandler.remove(this.parent.treeGridPane, 'click', this.treeGridClickHandler);
        }
    };
    // eslint-disable-next-line
    GanttTreeGrid.prototype.scrollHandler = function (e) {
        var content = this.parent.treeGrid.element.querySelector('.e-content');
        if (content.scrollTop !== this.previousScroll.top) {
            this.parent.notify('grid-scroll', { top: content.scrollTop });
        }
        this.previousScroll.top = content.scrollTop;
        if (this.parent.contextMenuModule && this.parent.contextMenuModule.isOpen) {
            this.parent.contextMenuModule.contextMenu.close();
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    GanttTreeGrid.prototype.validateGanttColumns = function () {
        var ganttObj = this.parent;
        var length = ganttObj.columns.length;
        var tasks = this.parent.taskFields;
        this.parent.columnMapping = {};
        this.parent.columnByField = {};
        this.parent.customColumns = [];
        var tasksMapping = ['id', 'name', 'startDate', 'endDate', 'duration', 'dependency',
            'progress', 'baselineStartDate', 'baselineEndDate', 'resourceInfo', 'notes', 'work', 'manual', 'type', 'milestone', 'segments'];
        var _loop_2 = function (i) {
            var column = {};
            if (typeof ganttObj.columns[i] === 'string') {
                column.field = ganttObj.columns[i];
            }
            else {
                column = ganttObj.columns[i];
            }
            var columnName = [];
            if (tasksMapping.length > 0) {
                columnName = tasksMapping.filter(function (name) {
                    return column.field === tasks[name];
                });
            }
            if (columnName.length === 0) {
                if (column.field === this_2.parent.resourceFields.group) {
                    return "continue";
                }
                this_2.parent.customColumns.push(column.field);
                column.headerText = column.headerText ? column.headerText : column.field;
                column.width = column.width ? column.width : 150;
                column.editType = column.editType ? column.editType : 'stringedit';
                column.type = column.type ? column.type : 'string';
                this_2.bindTreeGridColumnProperties(column, true);
                return "continue";
            }
            else {
                var index = tasksMapping.indexOf(columnName[0]);
                tasksMapping.splice(index, 1);
                this_2.createTreeGridColumn(column, true);
                this_2.parent.columnMapping[columnName[0]] = column.field;
            }
        };
        var this_2 = this;
        for (var i = 0; i < length; i++) {
            _loop_2(i);
        }
        /** Create default columns with task settings property */
        for (var j = 0; j < tasksMapping.length; j++) {
            var column = {};
            if (!isNullOrUndefined(tasks[tasksMapping[j]])) {
                column.field = tasks[tasksMapping[j]];
                this.createTreeGridColumn(column, length === 0);
                this.parent.columnMapping[tasksMapping[j]] = column.field;
            }
        }
        if (this.parent.viewType !== 'ProjectView') {
            var column = {};
            this.composeUniqueIDColumn(column);
            this.createTreeGridColumn(column, true);
        }
    };
    /**
     *
     * @param {GanttColumnModel} column .
     * @param {boolean} isDefined .
     * @returns {void} .
     */
    GanttTreeGrid.prototype.createTreeGridColumn = function (column, isDefined) {
        var _this = this;
        var taskSettings = this.parent.taskFields;
        var previousColumn = this.parent.previousGanttColumns.filter(function (prevcolumn) {
            return column.field === prevcolumn.field;
        })[0];
        column.disableHtmlEncode = !isNullOrUndefined(column.disableHtmlEncode) ? column.disableHtmlEncode : this.parent.disableHtmlEncode;
        if (taskSettings.id !== column.field) {
            column.clipMode = column.clipMode ? column.clipMode : 'EllipsisWithTooltip';
        }
        if (taskSettings.id === column.field) {
            /** Id column */
            this.composeIDColumn(column);
        }
        else if (taskSettings.name === column.field) {
            /** Name column */
            if (this.parent.isLocaleChanged && previousColumn) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('name');
            }
            else {
                column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('name');
            }
            column.width = column.width ? column.width : 150;
            column.editType = column.editType ? column.editType : 'stringedit';
            column.type = column.type ? column.type : 'string';
        }
        else if (taskSettings.startDate === column.field) {
            /** Name column */
            if (this.parent.isLocaleChanged && previousColumn) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('startDate');
            }
            else {
                column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('startDate');
            }
            column.editType = column.editType ? column.editType :
                this.parent.getDateFormat().toLowerCase().indexOf('hh') !== -1 ? 'datetimepickeredit' : 'datepickeredit';
            column.format = column.format ? column.format : { type: 'date', format: this.parent.getDateFormat() };
            column.width = column.width ? column.width : 150;
            if (column.edit && column.edit.params) {
                column.edit.params['renderDayCell'] = this.parent.renderWorkingDayCell.bind(this.parent);
            }
            else {
                if (column.edit) {
                    column.edit.params = { renderDayCell: this.parent.renderWorkingDayCell.bind(this.parent) };
                }
                else {
                    column.edit = { params: { renderDayCell: this.parent.renderWorkingDayCell.bind(this.parent) } };
                }
            }
        }
        else if (taskSettings.endDate === column.field) {
            if (this.parent.isLocaleChanged && previousColumn) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('endDate');
            }
            else {
                column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('endDate');
            }
            column.format = column.format ? column.format : { type: 'date', format: this.parent.getDateFormat() };
            column.editType = column.editType ? column.editType :
                this.parent.getDateFormat().toLowerCase().indexOf('hh') !== -1 ? 'datetimepickeredit' : 'datepickeredit';
            column.width = column.width ? column.width : 150;
            if (column.edit && column.edit.params) {
                column.edit.params['renderDayCell'] = this.parent.renderWorkingDayCell.bind(this.parent);
            }
            else {
                if (column.edit) {
                    column.edit.params = { renderDayCell: this.parent.renderWorkingDayCell.bind(this.parent) };
                }
                else {
                    column.edit = { params: { renderDayCell: this.parent.renderWorkingDayCell.bind(this.parent) } };
                }
            }
        }
        else if (taskSettings.duration === column.field) {
            column.width = column.width ? column.width : 150;
            if (this.parent.isLocaleChanged && previousColumn) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('duration');
            }
            else {
                column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('duration');
            }
            column.valueAccessor = column.valueAccessor ?
                column.valueAccessor : !isNullOrUndefined(column.edit) && !isNullOrUndefined(column.edit.read) ? null :
                this.durationValueAccessor.bind(this);
            column.editType = column.editType ? column.editType : 'stringedit';
            column.type = column.type ? column.type : 'string';
        }
        else if (taskSettings.progress === column.field) {
            this.composeProgressColumn(column);
        }
        else if (taskSettings.dependency === column.field) {
            if (this.parent.isLocaleChanged && previousColumn) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('dependency');
            }
            else {
                column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('dependency');
            }
            column.width = column.width ? column.width : 150;
            column.editType = column.editType ? column.editType : 'stringedit';
            column.type = 'string';
            column.allowFiltering = column.allowFiltering === false ? false : true;
            column.valueAccessor = column.valueAccessor ? column.valueAccessor : this.dependencyValueAccessor.bind(this);
            if (isNullOrUndefined(column.filter) && this.parent.locale !== 'en-US') {
                column.filter = {
                    'ui': {
                        create: function (args) {
                            var flValInput = createElement('input', { className: 'flm-input' });
                            args.target.appendChild(flValInput);
                            _this.dropInstance = new AutoComplete({
                                dataSource: _this.changeLocale(_this.parent.treeGrid.grid.dataSource),
                                fields: { text: _this.parent.taskFields.dependency, value: _this.parent.taskFields.dependency },
                                placeholder: _this.parent.localeObj.getConstant('enterValue'),
                                popupHeight: '200px'
                            });
                            _this.dropInstance.appendTo(flValInput);
                        },
                        write: function (args) {
                            _this.dropInstance.value = args.filteredValue;
                        },
                        read: function (args) {
                            args.fltrObj.filterByColumn(args.column.field, args.operator, _this.changeDelocale((_this.dropInstance.value)));
                        }
                    }
                };
            }
        }
        else if (taskSettings.resourceInfo === column.field) {
            this.composeResourceColumn(column);
        }
        else if (taskSettings.notes === column.field) {
            if (previousColumn && this.parent.isLocaleChanged) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('notes');
            }
            else {
                column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('notes');
            }
            column.width = column.width ? column.width : 150;
            column.editType = column.editType ? column.editType : 'stringedit';
            if (!this.parent.showInlineNotes) {
                if (!column.template) {
                    var contentTemp = function () {
                        return "<div class=\"e-ganttnotes-info\">\n                            <span class=\"e-icons e-notes-info\"></span>\n                        </div>";
                    };
                    column.template = initializeCSPTemplate(contentTemp);
                }
            }
        }
        else if (taskSettings.baselineStartDate === column.field ||
            taskSettings.baselineEndDate === column.field) {
            var colName = (taskSettings.baselineEndDate === column.field) ? 'baselineEndDate' :
                'baselineStartDate';
            column.width = column.width ? column.width : 150;
            if (this.parent.isLocaleChanged && previousColumn) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant(colName);
            }
            else {
                column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant(colName);
            }
            column.format = column.format ? column.format : { type: 'date', format: this.parent.getDateFormat() };
            column.editType = column.editType ? column.editType :
                this.parent.getDateFormat().toLowerCase().indexOf('hh') !== -1 ? 'datetimepickeredit' : 'datepickeredit';
        }
        else if (taskSettings.work === column.field) {
            if (previousColumn && this.parent.isLocaleChanged) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('work');
            }
            else {
                column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('work');
            }
            column.width = column.width ? column.width : 150;
            column.valueAccessor = column.valueAccessor ? column.valueAccessor : this.workValueAccessor.bind(this);
            column.editType = column.editType ? column.editType : 'numericedit';
        }
        else if (taskSettings.type === column.field) {
            if (previousColumn && this.parent.isLocaleChanged) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('taskType');
            }
            else {
                column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('taskType');
            }
            column.width = column.width ? column.width : 150;
            //column.type = 'string';
            column.editType = 'dropdownedit';
            column.valueAccessor = column.valueAccessor ? column.valueAccessor : this.taskTypeValueAccessor.bind(this);
        }
        else if (taskSettings.manual === column.field && this.parent.taskMode === 'Custom') {
            if (previousColumn && this.parent.isLocaleChanged) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('taskMode');
            }
            else {
                column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('taskMode');
            }
            column.width = column.width ? column.width : 120;
            column.editType = column.editType ? column.editType : 'dropdownedit';
            column.valueAccessor = column.valueAccessor ? column.valueAccessor : this.modeValueAccessor.bind(this);
            column.edit = {
                params: {
                    query: new Query(),
                    dataSource: [
                        { id: 1, text: this.parent.localeObj.getConstant('manual'), value: true },
                        { id: 2, text: this.parent.localeObj.getConstant('auto'), value: false }
                    ],
                    fields: { text: 'text', value: 'value' }
                }
            };
        }
        this.bindTreeGridColumnProperties(column, isDefined);
    };
    GanttTreeGrid.prototype.changeLocale = function (data) {
        var _this = this;
        var filter = [];
        var flatdatas = data.map(function (task) { return task.ganttProperties.predecessorsName; });
        flatdatas.map(function (predecessorsName) {
            if (!isNullOrUndefined(predecessorsName)) {
                var value_1 = '';
                var splitString_1 = predecessorsName.split(',');
                splitString_1.map(function (splitvalue, index) {
                    if (splitvalue.includes('FS')) {
                        value_1 += splitvalue.replace('FS', _this.parent.localeObj.getConstant('FS'));
                        value_1 += (splitString_1.length !== index + 1) ? ',' : '';
                    }
                    else if (splitvalue.includes('FF')) {
                        value_1 += splitvalue.replace('FF', _this.parent.localeObj.getConstant('FF'));
                        value_1 += (splitString_1.length !== index + 1) ? ',' : '';
                    }
                    else if (splitvalue.includes('SS')) {
                        value_1 += splitvalue.replace('SS', _this.parent.localeObj.getConstant('SS'));
                        value_1 += (splitString_1.length !== index + 1) ? ',' : '';
                    }
                    else if (splitvalue.includes('SF')) {
                        value_1 += splitvalue.replace('SF', _this.parent.localeObj.getConstant('SF'));
                        value_1 += (splitString_1.length !== index + 1) ? ',' : '';
                    }
                });
                filter.push(value_1);
            }
        });
        return filter;
    };
    GanttTreeGrid.prototype.changeDelocale = function (dependency) {
        var FF = this.parent.localeObj.getConstant('FF');
        var FS = this.parent.localeObj.getConstant('FS');
        var SS = this.parent.localeObj.getConstant('SS');
        var SF = this.parent.localeObj.getConstant('SF');
        if (!isNullOrUndefined(dependency)) {
            var splitString_2 = dependency.split(',');
            var value_2 = '';
            splitString_2.map(function (splitvalue, index) {
                if (splitvalue.includes(FF)) {
                    value_2 += splitvalue.replace(FF, 'FF');
                    value_2 += (splitString_2.length !== index + 1) ? ',' : '';
                }
                else if (splitvalue.includes(FS)) {
                    value_2 += splitvalue.replace(FS, 'FS');
                    value_2 += (splitString_2.length !== index + 1) ? ',' : '';
                }
                else if (splitvalue.includes(SS)) {
                    value_2 += splitvalue.replace(SS, 'SS');
                    value_2 += (splitString_2.length !== index + 1) ? ',' : '';
                }
                else if (splitvalue.includes(SF)) {
                    value_2 += splitvalue.replace(SF, 'SF');
                    value_2 += (splitString_2.length !== index + 1) ? ',' : '';
                }
                else {
                    value_2 += splitvalue;
                    value_2 += (splitString_2.length !== index + 1) ? ',' : '';
                }
            });
            return value_2;
        }
        return null;
    };
    /**
     * Compose Resource columns
     *
     * @param {GanttColumnModel} column .
     * @returns {void} .
     */
    GanttTreeGrid.prototype.composeResourceColumn = function (column) {
        var previousColumn = this.parent.previousGanttColumns.filter(function (prevcolumn) {
            return column.field === prevcolumn.field;
        })[0];
        if (previousColumn && this.parent.isLocaleChanged) {
            column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('resourceName');
        }
        else {
            column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('resourceName');
        }
        column.width = column.width ? column.width : 150;
        column.type = 'string';
        column.valueAccessor = column.valueAccessor ? column.valueAccessor : this.resourceValueAccessor.bind(this);
        column.allowFiltering = column.allowFiltering === false ? false : true;
    };
    /**
     * @param {IGanttData} data .
     * @returns {object} .
     * @private
     */
    GanttTreeGrid.prototype.getResourceIds = function (data) {
        var value = getValue(this.parent.taskFields.resourceInfo, data.taskData);
        var id = [];
        if (!isNullOrUndefined(value)) {
            for (var i = 0; i < value.length; i++) {
                id.push(typeof value[i] === 'object' ? value[i][this.parent.resourceFields.id] : value[i]);
            }
            return id;
        }
        else {
            return value;
        }
    };
    /**
     * Create Id column
     *
     * @param {GanttColumnModel} column .
     * @returns {void} .
     */
    GanttTreeGrid.prototype.composeIDColumn = function (column) {
        var isProjectView = this.parent.viewType === 'ProjectView';
        var lengthDataSource = this.parent.dataSource ? this.parent.dataSource['length'] : 0;
        var taskIDName;
        column.isPrimaryKey = isProjectView ? true : false;
        if (this.parent.isLocaleChanged) {
            var previousColumn = this.parent.previousGanttColumns.filter(function (prevcolumn) {
                return column.field === prevcolumn.field;
            })[0];
            if (previousColumn) {
                column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('id');
            }
        }
        else {
            column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('id');
        }
        column.width = column.width ? column.width : 100;
        for (var i = 0; i < lengthDataSource; i++) {
            if (!isNullOrUndefined(this.parent.dataSource[i][this.parent.taskFields.id])) {
                taskIDName = this.parent.dataSource[i][this.parent.taskFields.id];
                break;
            }
        }
        if (typeof (taskIDName) === 'string' || isNullOrUndefined(taskIDName)) {
            if (this.parent.viewType === 'ResourceView') {
                column.allowEditing = column.allowEditing ? column.allowEditing : false;
            }
            else {
                column.allowEditing = column.allowEditing ? column.allowEditing : true;
            }
            column.editType = column.editType ? column.editType : 'stringedit';
        }
        else {
            column.allowEditing = column.allowEditing ? column.allowEditing : false;
            column.editType = column.editType ? column.editType : 'numericedit';
        }
        column.valueAccessor = isProjectView ? null : this.idValueAccessor.bind(this);
    };
    GanttTreeGrid.prototype.composeUniqueIDColumn = function (column) {
        column.field = 'rowUniqueID';
        column.isPrimaryKey = true;
        column.headerText = 'UniqueID';
        column.allowEditing = false;
        column.visible = false;
    };
    /**
     * Create progress column
     *
     * @param {GanttColumnModel} column .
     * @returns {void} .
     */
    GanttTreeGrid.prototype.composeProgressColumn = function (column) {
        var previousColumn = this.parent.previousGanttColumns.filter(function (prevcolumn) {
            return column.field === prevcolumn.field;
        })[0];
        if (this.parent.isLocaleChanged && previousColumn) {
            column.headerText = previousColumn.headerText ? previousColumn.headerText : this.parent.localeObj.getConstant('progress');
        }
        else {
            column.headerText = column.headerText ? column.headerText : this.parent.localeObj.getConstant('progress');
        }
        column.width = column.width ? column.width : 150;
        column.editType = column.editType ? column.editType : 'numericedit';
    };
    /**
     * @param {GanttColumnModel} newGanttColumn .
     * @param {boolean} isDefined .
     * @returns {void} .
     */
    GanttTreeGrid.prototype.bindTreeGridColumnProperties = function (newGanttColumn, isDefined) {
        var treeGridColumn = {};
        var ganttColumn = {};
        for (var _i = 0, _a = Object.keys(newGanttColumn); _i < _a.length; _i++) {
            var prop = _a[_i];
            treeGridColumn[prop] = ganttColumn[prop] = newGanttColumn[prop];
        }
        this.parent.columnByField[ganttColumn.field] = ganttColumn;
        this.parent.ganttColumns.push(new GanttColumn(ganttColumn));
        if (isDefined) {
            this.treeGridColumns.push(treeGridColumn);
        }
    }; // eslint-disable-next-line
    GanttTreeGrid.prototype.durationValueAccessor = function (field, data, column) {
        if (!isNullOrUndefined(data) && !isNullOrUndefined(data.ganttProperties)) {
            var ganttProp = data.ganttProperties;
            return this.parent.dataOperation.getDurationString(ganttProp.duration, ganttProp.durationUnit);
        }
        else if (this.parent.loadChildOnDemand && this.parent.taskFields.hasChildMapping) {
            return this.parent.dataOperation.getDurationString(parseInt(data[this.parent.taskFields.duration], 10), this.parent.durationUnit);
        }
        return '';
    }; // eslint-disable-next-line
    GanttTreeGrid.prototype.dependencyValueAccessor = function (field, data, column) {
        var _this = this;
        if (data && data.ganttProperties && !isNullOrUndefined(data.ganttProperties.predecessorsName)) {
            var value_3 = '';
            var predecessorsName = data.ganttProperties.predecessorsName;
            var splitString_3 = predecessorsName.split(',');
            splitString_3.map(function (splitvalue, index) {
                if (splitvalue.includes('FS')) {
                    value_3 += splitvalue.replace('FS', _this.parent.localeObj.getConstant('FS'));
                    value_3 += (splitString_3.length !== index + 1) ? ',' : '';
                }
                else if (splitvalue.includes('FF')) {
                    value_3 += splitvalue.replace('FF', _this.parent.localeObj.getConstant('FF'));
                    value_3 += (splitString_3.length !== index + 1) ? ',' : '';
                }
                else if (splitvalue.includes('SS')) {
                    value_3 += splitvalue.replace('SS', _this.parent.localeObj.getConstant('SS'));
                    value_3 += (splitString_3.length !== index + 1) ? ',' : '';
                }
                else if (splitvalue.includes('SF')) {
                    value_3 += splitvalue.replace('SF', _this.parent.localeObj.getConstant('SF'));
                    value_3 += (splitString_3.length !== index + 1) ? ',' : '';
                }
            });
            return value_3;
        }
        return '';
    };
    GanttTreeGrid.prototype.resourceValueAccessor = function (field, data, column) {
        var ganttProp = data.ganttProperties;
        if (!isNullOrUndefined(ganttProp)) {
            return ganttProp.resourceNames;
        }
        return '';
    };
    GanttTreeGrid.prototype.workValueAccessor = function (field, data, column) {
        var ganttProp = data.ganttProperties;
        if (!isNullOrUndefined(ganttProp)) {
            return this.parent.dataOperation.getWorkString(ganttProp.work, ganttProp.workUnit);
        }
        return '';
    };
    GanttTreeGrid.prototype.taskTypeValueAccessor = function (field, data, column) {
        var ganttProp = data.ganttProperties;
        if (!isNullOrUndefined(ganttProp)) {
            return ganttProp.taskType;
        }
        return '';
    };
    GanttTreeGrid.prototype.modeValueAccessor = function (field, data, column) {
        if (data[field]) {
            return 'Manual';
        }
        else {
            return 'Auto';
        }
    };
    GanttTreeGrid.prototype.idValueAccessor = function (field, data, column) {
        return data.level === 0 ? 'R-' + data.ganttProperties.taskId : 'T-' + data.ganttProperties.taskId;
    };
    GanttTreeGrid.prototype.updateScrollTop = function (args) {
        var newScrollTop = getValue('top', args);
        this.treeGridElement.querySelector('.e-content').scrollTop = newScrollTop;
        this.previousScroll.top = this.treeGridElement.querySelector('.e-content').scrollTop;
    };
    GanttTreeGrid.prototype.treeGridClickHandler = function (e) {
        this.parent.notify('treeGridClick', e);
    };
    GanttTreeGrid.prototype.removeEventListener = function () {
        this.parent.off('renderPanels', this.createContainer);
        this.parent.off('chartScroll', this.updateScrollTop);
        this.parent.off('destroy', this.destroy);
        this.parent.treeGrid.off('reactTemplateRender', this.renderReactTemplate);
    };
    GanttTreeGrid.prototype.destroy = function () {
        this.removeEventListener();
        this.unWireEvents();
        if (this.parent.treeGrid.element) {
            this.parent.treeGrid.destroy();
        }
    };
    return GanttTreeGrid;
}());
export { GanttTreeGrid };
