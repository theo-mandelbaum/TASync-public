import * as cons from './../base/css-constants';
import { TreeGrid, ContextMenu as TreeGridContextMenu } from '@syncfusion/ej2-treegrid';
import { remove, closest, isNullOrUndefined, getValue, extend, addClass } from '@syncfusion/ej2-base';
import { Deferred } from '@syncfusion/ej2-data';
import { ContextMenu as Menu } from '@syncfusion/ej2-navigations';
// eslint-disable-next-line
/**
 * The ContextMenu module is used to handle the context menu items & sub-menu items.
 *
 * @returns {void} .
 */
var ContextMenu = /** @class */ (function () {
    function ContextMenu(parent) {
        var _this = this;
        this.segmentIndex = -1;
        this.isCntxtMenuDependencyDelete = false;
        this.headerContextMenuClick = function (args) {
            var gridRow = closest(args.event.target, '.e-row');
            var chartRow = closest(args.event.target, '.e-chart-row');
            if (isNullOrUndefined(gridRow) && isNullOrUndefined(chartRow)) {
                args.type = 'Header';
                _this.parent.trigger('contextMenuClick', args);
            }
        };
        this.headerContextMenuOpen = function (args) {
            var gridRow = closest(args.event.target, '.e-row');
            var chartRow = closest(args.event.target, '.e-chart-row');
            if (isNullOrUndefined(gridRow) && isNullOrUndefined(chartRow)) {
                args.type = 'Header';
                _this.parent.trigger('contextMenuOpen', args);
            }
            else {
                args.cancel = true;
            }
        };
        this.parent = parent;
        this.ganttID = parent.element.id;
        TreeGrid.Inject(TreeGridContextMenu);
        this.parent.treeGrid.contextMenuClick = this.headerContextMenuClick.bind(this);
        this.parent.treeGrid.contextMenuOpen = this.headerContextMenuOpen.bind(this);
        this.addEventListener();
        this.resetItems();
    }
    ContextMenu.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on('initiate-contextMenu', this.render, this);
        this.parent.on('reRender-contextMenu', this.reRenderContextMenu, this);
        this.parent.on('contextMenuClick', this.contextMenuItemClick, this);
        this.parent.on('contextMenuOpen', this.contextMenuBeforeOpen, this);
    };
    ContextMenu.prototype.reRenderContextMenu = function (e) {
        if (e.module === this.getModuleName() && e.enable) {
            if (this.contextMenu) {
                this.contextMenu.destroy();
                remove(this.element);
            }
            this.resetItems();
            this.render();
        }
    };
    ContextMenu.prototype.render = function () {
        this.element = this.parent.createElement('ul', {
            id: this.ganttID + '_contextmenu', className: cons.focusCell
        });
        this.parent.element.appendChild(this.element);
        var target = '#' + this.ganttID;
        this.contextMenu = new Menu({
            items: this.getMenuItems(),
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            target: target,
            animationSettings: { effect: 'None' },
            select: this.contextMenuItemClick.bind(this),
            beforeOpen: this.contextMenuBeforeOpen.bind(this),
            onOpen: this.contextMenuOpen.bind(this),
            onClose: this.contextMenuOnClose.bind(this),
            cssClass: 'e-gantt'
        });
        this.contextMenu.appendTo(this.element);
        this.parent.treeGrid.contextMenuItems = this.headerMenuItems;
    };
    ContextMenu.prototype.contextMenuItemClick = function (args) {
        this.item = this.getKeyFromId(args.item.id);
        var position;
        var data;
        var taskfields;
        var parentItem = getValue('parentObj', args.item);
        var index = -1;
        args.type = 'Content';
        args.rowData = this.rowData;
        this.parent.trigger('contextMenuClick', args);
        if (parentItem && !isNullOrUndefined(parentItem.id) && this.getKeyFromId(parentItem.id) === 'DeleteDependency') {
            index = parentItem.items.indexOf(args.item);
        }
        if (this.parent.isAdaptive) {
            if (this.item === 'TaskInformation' || this.item === 'Above' || this.item === 'Below'
                || this.item === 'Child' || this.item === 'DeleteTask') {
                if (this.parent.selectionModule && this.parent.selectionSettings.type === 'Multiple') {
                    this.parent.selectionModule.hidePopUp();
                    document.getElementsByClassName('e-gridpopup')[0].style.display = 'none';
                }
            }
        }
        switch (this.item) {
            case 'TaskInformation':
                if (!isNullOrUndefined(this.rowData)) {
                    if (typeof this.rowData.ganttProperties.taskId === 'string') {
                        this.parent.openEditDialog(this.rowData.ganttProperties.rowUniqueID);
                    }
                    else {
                        this.parent.openEditDialog(Number(this.rowData.ganttProperties.rowUniqueID));
                    }
                }
                break;
            case 'Above':
            case 'Below':
            case 'Child':
                if (!isNullOrUndefined(this.rowData)) {
                    position = this.item;
                    data = extend({}, {}, this.rowData.taskData, true);
                    taskfields = this.parent.taskFields;
                    if (data[taskfields.startDate]) {
                        this.parent.setRecordValue(taskfields.startDate, this.rowData.ganttProperties.startDate, data, true);
                    }
                    if (data[taskfields.endDate]) {
                        this.parent.setRecordValue(taskfields.endDate, this.rowData.ganttProperties.endDate, data, true);
                    }
                    if (!isNullOrUndefined(taskfields.dependency)) {
                        data[taskfields.dependency] = null;
                    }
                    if (!isNullOrUndefined(taskfields.child) && data[taskfields.child]) {
                        delete data[taskfields.child];
                    }
                    if (!isNullOrUndefined(taskfields.parentID) && data[taskfields.parentID]) {
                        data[taskfields.parentID] = null;
                    }
                    if (this.rowData) {
                        if (this.parent.viewType === 'ResourceView' && this.rowData.parentItem
                            && data[this.parent.taskFields.resourceInfo]) {
                            var parentItem_1 = this.parent.getParentTask(this.rowData.parentItem);
                            var resourceFieldId_1 = this.parent.resourceFields.id;
                            var taskResources = this.rowData.taskData[this.parent.taskFields.resourceInfo];
                            var matchingResource = taskResources.find(function (resource) {
                                return resource[resourceFieldId_1] === parentItem_1.ganttProperties.taskId;
                            });
                            data[this.parent.taskFields.resourceInfo] = matchingResource ? [matchingResource] : [];
                        }
                        var rowIndex = this.parent.updatedRecords.indexOf(this.rowData);
                        this.parent.addRecord(data, position, rowIndex);
                    }
                }
                else if (this.parent.flatData.length === 0) {
                    this.parent.addRecord();
                }
                break;
            case 'Milestone':
            case 'ToMilestone':
                if (!isNullOrUndefined(this.rowData)) {
                    this.parent.convertToMilestone(this.rowData.ganttProperties.rowUniqueID);
                }
                else if (this.parent.flatData.length === 0 && this.item === 'Milestone') {
                    var data_1 = this.parent.editModule.createNewRecord();
                    var taskSettings = this.parent.taskFields;
                    if (this.parent.taskFields['duration']) {
                        data_1[taskSettings['duration']] = 0;
                    }
                    if (this.parent.taskFields['milestone']) {
                        data_1[taskSettings['milestone']] = true;
                    }
                    this.parent.addRecord(data_1);
                }
                break;
            case 'DeleteTask':
                if ((this.parent.selectionSettings.mode !== 'Cell' && this.parent.selectionModule.selectedRowIndexes.length > 1)
                    || (this.parent.selectionSettings.mode === 'Cell' && this.parent.selectionModule.getSelectedRowCellIndexes().length)) {
                    this.parent.editModule.startDeleteAction();
                }
                else {
                    this.parent.editModule.deleteRecord(this.rowData);
                }
                break;
            case 'ToTask':
                if (!isNullOrUndefined(this.rowData)) {
                    data = extend({}, {}, this.rowData.taskData, true);
                    taskfields = this.parent.taskFields;
                    if (!isNullOrUndefined(taskfields.duration)) {
                        var duration = parseInt(data[taskfields.duration], 10) <= 0 ? 1 : data[taskfields.duration];
                        data[taskfields.duration] = duration;
                        this.parent.setRecordValue('duration', duration, this.rowData.ganttProperties, true);
                    }
                    else {
                        data[taskfields.startDate] = new Date(this.rowData.taskData[taskfields.startDate]);
                        var endDate = new Date(this.rowData.taskData[taskfields.startDate]);
                        endDate.setDate(endDate.getDate() + 1);
                        data[taskfields.endDate] = endDate;
                    }
                    if (!isNullOrUndefined(data[taskfields.milestone])) {
                        if (data[taskfields.milestone] === true) {
                            data[taskfields.milestone] = false;
                        }
                    }
                    var taskType = !isNullOrUndefined(this.rowData.ganttProperties.taskType) ? this.rowData.ganttProperties.taskType
                        : this.parent.taskType;
                    if (taskType === 'FixedWork' || taskType === 'FixedUnit') {
                        this.parent.dataOperation.updateWorkWithDuration(this.rowData);
                        if (!isNullOrUndefined(data[taskfields.work])) {
                            data[taskfields.work] = this.rowData.ganttProperties.work;
                        }
                    }
                    if (data[taskfields.startDate]) {
                        this.parent.setRecordValue(taskfields.startDate, this.rowData.ganttProperties.startDate, data, true);
                    }
                    this.parent.updateRecordByID(data);
                }
                break;
            case 'Cancel':
                this.parent.cancelEdit();
                break;
            case 'Save':
                this.parent.editModule.cellEditModule.isCellEdit = false;
                this.parent.treeGrid.grid.saveCell();
                break;
            case 'Dependency' + index:
                this.isCntxtMenuDependencyDelete = true;
                this.parent.connectorLineEditModule.removePredecessorByIndex(this.rowData, index);
                break;
            case 'Auto':
            case 'Manual':
                this.parent.changeTaskMode(this.rowData);
                break;
            case 'Indent':
                this.parent.indent();
                break;
            case 'Outdent':
                this.parent.outdent();
                break;
            case 'Left':
            case 'Right':
                this.mergeCall(this.item);
                break;
            case 'SplitTask':
                this.splitTaskCall(args);
                break;
        }
    };
    ContextMenu.prototype.splitTaskCall = function (args) {
        var _this = this;
        this.isEdit = true;
        var taskSettings = this.parent.taskFields;
        var currentClickedDate = this.getClickedDate(args.element);
        if (isNullOrUndefined(this.parent.timelineSettings.bottomTier) && this.parent.timelineSettings.bottomTier.unit !== 'Hour') {
            currentClickedDate.setHours(0, 0, 0, 0);
        }
        var eventArgs = {
            rowData: this.rowData,
            requestType: 'splitTaskbar',
            splitDate: currentClickedDate,
            cancel: false,
            target: this.targetElement
        };
        // eslint-disable-next-line
        this.parent.trigger('actionBegin', eventArgs, function (eventArgs) {
            if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                _this.parent.showMaskRow();
            }
            else {
                _this.parent.showSpinner();
            }
            _this.parent.chartRowsModule.splitTask(_this.rowData[taskSettings.id], currentClickedDate);
            _this.parent.chartRowsModule.updateSegment(_this.rowData.ganttProperties.segments, _this.rowData.ganttProperties.taskId);
        });
    };
    ContextMenu.prototype.mergeCall = function (item) {
        var _this = this;
        this.isEdit = true;
        var taskSettings = this.parent.taskFields;
        var segments = this.rowData.ganttProperties.segments;
        var firstSegment = item === 'Right' ? this.segmentIndex : segments[this.segmentIndex - 1].segmentIndex;
        var secondSegment = item === 'Left' ? this.segmentIndex : segments[this.segmentIndex + 1].segmentIndex;
        var segmentIndexes = [
            { 'firstSegmentIndex': firstSegment, 'secondSegmentIndex': secondSegment }
        ];
        var eventArgs = {
            rowData: this.rowData,
            mergeSegmentIndexes: segmentIndexes,
            requestType: 'mergeSegment',
            cancel: false,
            target: this.targetElement
        };
        this.parent.trigger('actionBegin', eventArgs, function (eventArgs) {
            if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                _this.parent.showMaskRow();
            }
            else {
                _this.parent.showSpinner();
            }
            if (eventArgs.cancel === false) {
                _this.parent.chartRowsModule.mergeTask(_this.rowData[taskSettings.id], segmentIndexes);
            }
        });
    };
    // eslint-disable-next-line
    ContextMenu.prototype.getClickedDate = function (element) {
        // context menu click position
        var ganttElementPositionLeft;
        // task left position
        if (this.parent.enableRtl) {
            var box = this.parent.element.getBoundingClientRect();
            var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft ||
                document.body.scrollLeft;
            var clientLeft = document.documentElement.clientLeft || document.body.clientLeft || 0;
            ganttElementPositionLeft = box.left + scrollLeft - clientLeft;
        }
        else {
            ganttElementPositionLeft = this.parent.getOffsetRect(this.parent.element).left;
        }
        var pageLeft;
        var currentTaskDifference;
        if (this.parent.enableRtl) {
            pageLeft = Math.abs(ganttElementPositionLeft + this.parent.ganttChartModule.chartElement.offsetWidth -
                this.rowData.ganttProperties.left - this.parent.ganttChartModule.scrollElement.scrollLeft);
            currentTaskDifference = Math.abs(this.clickedPosition - pageLeft);
        }
        else {
            pageLeft = ganttElementPositionLeft + this.parent.ganttChartModule.chartElement.offsetLeft +
                this.rowData.ganttProperties.left - this.parent.ganttChartModule.scrollElement.scrollLeft;
            currentTaskDifference = this.clickedPosition - pageLeft;
        }
        var splitTaskDuration = Math.ceil(currentTaskDifference / this.parent.perDayWidth);
        var startDate = this.rowData.ganttProperties.startDate;
        if (!isNullOrUndefined(this.parent.timelineSettings.bottomTier) && this.parent.timelineSettings.bottomTier.unit === 'Hour') {
            splitTaskDuration = Math.ceil(currentTaskDifference / this.parent.timelineSettings.timelineUnitSize);
            splitTaskDuration -= 1;
        }
        var contextMenuClickDate;
        if (!isNullOrUndefined(this.parent.timelineSettings.bottomTier) && (this.parent.timelineSettings.bottomTier.unit === 'Minutes' || this.parent.timelineSettings.bottomTier.unit === 'Hour')) {
            splitTaskDuration = Math.ceil(currentTaskDifference / this.parent.timelineSettings.timelineUnitSize);
            splitTaskDuration -= 1;
            contextMenuClickDate = this.parent.dataOperation.getEndDate(startDate, splitTaskDuration, this.parent.timelineSettings.bottomTier.unit.toLocaleLowerCase(), this.rowData, false);
        }
        else {
            contextMenuClickDate =
                this.parent.dataOperation.getEndDate(startDate, splitTaskDuration, this.rowData.ganttProperties.duration > 1 ?
                    this.rowData.ganttProperties.durationUnit : (this.parent.timelineSettings.bottomTier.unit !== 'None') ?
                    this.parent.timelineSettings.bottomTier.unit.toLocaleLowerCase() :
                    this.parent.timelineSettings.topTier.unit.toLocaleLowerCase(), this.rowData, false);
        }
        return contextMenuClickDate;
    };
    ContextMenu.prototype.contextMenuBeforeOpen = function (args) {
        var _this = this;
        var target = args.event ? args.event.target :
            !this.parent.focusModule ? this.parent.focusModule.getActiveElement() :
                this.parent.ganttChartModule.targetElement;
        // Closed edited cell before opening context menu
        if ((!isNullOrUndefined(this.parent.editModule) && this.parent.editModule.cellEditModule && this.parent.editModule.cellEditModule.isCellEdit && target.parentElement.classList.contains('e-row')) || target.parentElement.classList.contains('e-treecolumn-container')) {
            this.parent.treeGrid.endEdit();
        }
        if (!isNullOrUndefined(args.element) && args.element.id === this.parent.element.id + '_contextmenu') {
            this.clickedPosition = getValue('event', args).clientX;
        }
        var targetElement = closest(target, '.e-gantt-child-taskbar');
        if (targetElement) {
            this.targetElement = args.target = targetElement;
        }
        args.gridRow = closest(target, '.e-row');
        args.chartRow = closest(target, '.e-chart-row');
        var menuElement = closest(target, '.e-gantt');
        var editForm = closest(target, cons.editForm);
        if (!editForm && this.parent.editModule && this.parent.editModule.cellEditModule
            && this.parent.editModule.cellEditModule.isCellEdit && this.parent.editModule.dialogModule.dialogObj
            && !this.parent.editModule.dialogModule.dialogObj.open) {
            this.parent.treeGrid.grid.saveCell();
            this.parent.editModule.cellEditModule.isCellEdit = false;
        }
        if (this.parent.readOnly) {
            this.contextMenu.enableItems(['Add', 'Save', 'Convert', 'Delete Dependency', 'Delete Task', 'TaskMode', 'Indent', 'Outdent', 'SplitTask', 'MergeTask'], false);
        }
        if ((isNullOrUndefined(args.gridRow) && isNullOrUndefined(args.chartRow)) || this.contentMenuItems.length === 0) {
            if (!isNullOrUndefined(args.parentItem) && !isNullOrUndefined(menuElement) || !isNullOrUndefined(closest(target, '.e-content'))) {
                args.cancel = false;
            }
            else {
                args.cancel = true;
            }
        }
        if (!args.cancel) {
            var rowIndex = -1;
            if (args.gridRow) {
                // eslint-disable-next-line
                rowIndex = parseInt(args.gridRow.getAttribute('aria-rowindex'), 0) - 1;
            }
            else if (args.chartRow) {
                // eslint-disable-next-line
                rowIndex = parseInt(args.chartRow.getAttribute('aria-rowindex'), 0) - 1;
            }
            if (this.parent.selectionModule && this.parent.allowSelection && !args.parentItem && !isNullOrUndefined(args.chartRow)) {
                this.parent.selectionModule.selectRow(rowIndex);
            }
            if (!args.parentItem) {
                this.rowData = this.parent.ganttChartModule.getRecordByTarget(args['event']);
            }
            for (var _i = 0, _a = args.items; _i < _a.length; _i++) {
                var item = _a[_i];
                // let target: EventTarget = target;
                if (!item.separator) {
                    if ((target.classList.contains('e-gantt-unscheduled-taskbar')) && ((item.text === this.getLocale('splitTask')) || (item.text === this.getLocale('mergeTask')))) {
                        this.hideItems.push(item.text);
                    }
                    else {
                        this.updateItemStatus(item, target, rowIndex);
                    }
                }
            }
            args.rowData = this.rowData;
            args.type = 'Content';
            args.disableItems = this.disableItems;
            args.hideItems = this.hideItems;
            args.hideChildItems = [];
            if (!isNullOrUndefined(args.rowData) && args.rowData.level === 0 && this.parent.viewType === 'ResourceView') {
                args.cancel = true;
                return;
            }
            var callBackPromise_1 = new Deferred();
            this.parent.trigger('contextMenuOpen', args, function (arg) {
                callBackPromise_1.resolve(arg);
                _this.hideItems = arg.hideItems;
                _this.disableItems = arg.disableItems;
                if (!arg.parentItem && arg.hideItems.length === arg.items.length) {
                    _this.revertItemStatus();
                    arg.cancel = true;
                }
                if (_this.hideItems.length > 0) {
                    _this.contextMenu.hideItems(_this.hideItems);
                }
                if (_this.disableItems.length > 0) {
                    _this.contextMenu.enableItems(_this.disableItems, false);
                }
                if (args.hideChildItems.length > 0) {
                    _this.contextMenu.hideItems(args.hideChildItems);
                }
            });
            return callBackPromise_1;
        }
    };
    ContextMenu.prototype.updateItemStatus = function (item, target, rowIndex) {
        var key = this.getKeyFromId(item.id);
        var editForm = closest(target, cons.editForm);
        var subMenu = [];
        var taskbarElement = closest(target, '.e-gantt-child-taskbar') ||
            closest(target, 'e-taskbar-right-resizer') || closest(target, 'e-taskbar-left-resizer');
        if (editForm) {
            if (!(key === 'Save' || key === 'Cancel')) {
                this.hideItems.push(item.text);
            }
        }
        else {
            switch (key) {
                case 'TaskInformation':
                    if (!this.parent.editSettings.allowEditing || !this.parent.editModule) {
                        this.updateItemVisibility(item.text);
                    }
                    if (this.parent.flatData.length === 0) {
                        this.hideItems.push(item.text);
                    }
                    break;
                case 'Add':
                    if (!this.parent.editSettings.allowAdding || !this.parent.editModule) {
                        this.updateItemVisibility(item.text);
                    }
                    break;
                case 'Save':
                case 'Cancel':
                    this.hideItems.push(item.text);
                    break;
                case 'Convert':
                    if (!isNullOrUndefined(this.rowData) && this.rowData.hasChildRecords) {
                        this.hideItems.push(item.text);
                    }
                    else if (!this.parent.editSettings.allowEditing || !this.parent.editModule) {
                        this.updateItemVisibility(item.text);
                    }
                    else {
                        if (!isNullOrUndefined(this.rowData) && !this.rowData.ganttProperties.isMilestone) {
                            subMenu.push(this.createItemModel(cons.content, 'ToMilestone', this.getLocale('toMilestone')));
                        }
                        else {
                            subMenu.push(this.createItemModel(cons.content, 'ToTask', this.getLocale('toTask')));
                        }
                        item.items = subMenu;
                    }
                    if (this.parent.flatData.length === 0) {
                        this.hideItems.push(item.text);
                    }
                    break;
                case 'DeleteDependency':
                    {
                        var items = this.getPredecessorsItems();
                        if (!isNullOrUndefined(this.rowData) && this.rowData.hasChildRecords && !this.parent.allowParentDependency) {
                            this.hideItems.push(item.text);
                        }
                        else if (!this.parent.editSettings.allowDeleting || items.length === 0 || !this.parent.editModule) {
                            this.updateItemVisibility(item.text);
                        }
                        else if (items.length > 0) {
                            item.items = items;
                        }
                        break;
                    }
                case 'DeleteTask':
                    if (!this.parent.editSettings.allowDeleting || !this.parent.editModule) {
                        this.updateItemVisibility(item.text);
                    }
                    if (this.parent.flatData.length === 0) {
                        this.hideItems.push(item.text);
                    }
                    break;
                case 'TaskMode':
                    if (this.parent.taskMode !== 'Custom') {
                        this.updateItemVisibility(item.text);
                    }
                    else {
                        if (this.rowData.ganttProperties.isAutoSchedule) {
                            subMenu.push(this.createItemModel(cons.content, 'Manual', this.getLocale('manual')));
                        }
                        else {
                            subMenu.push(this.createItemModel(cons.content, 'Auto', this.getLocale('auto')));
                        }
                        item.items = subMenu;
                    }
                    break;
                case 'Indent':
                    {
                        if (!this.parent.allowSelection || !this.parent.editModule || !this.parent.editSettings) {
                            this.hideItems.push(item.text);
                        }
                        else {
                            var index = this.parent.selectedRowIndex;
                            var isSelected = this.parent.selectionModule ? this.parent.selectionModule.selectedRowIndexes.length === 1 ||
                                this.parent.selectionModule.getSelectedRowCellIndexes().length === 1 ? true : false : false;
                            var prevRecord = this.parent.updatedRecords[this.parent.selectionModule.getSelectedRowIndexes()[0] - 1];
                            if (!this.parent.editSettings.allowEditing || index === 0 || index === -1 || !isSelected ||
                                this.parent.viewType === 'ResourceView' ||
                                this.parent.updatedRecords[parseInt(index.toString(), 10)].level - prevRecord.level === 1) {
                                this.updateItemVisibility(item.text);
                            }
                        }
                        break;
                    }
                case 'Outdent':
                    {
                        if (!this.parent.allowSelection || !this.parent.editModule || !this.parent.editSettings) {
                            this.hideItems.push(item.text);
                        }
                        else {
                            var ind = this.parent.selectionModule.getSelectedRowIndexes()[0];
                            var isSelect = this.parent.selectionModule ? this.parent.selectionModule.selectedRowIndexes.length === 1 ||
                                this.parent.selectionModule.getSelectedRowCellIndexes().length === 1 ? true : false : false;
                            if (!this.parent.editSettings.allowEditing || ind === -1 || ind === 0 || !isSelect ||
                                this.parent.viewType === 'ResourceView' || this.parent.updatedRecords[parseInt(ind.toString(), 10)].level === 0) {
                                this.updateItemVisibility(item.text);
                            }
                        }
                        break;
                    }
                case 'SplitTask':
                    {
                        var isBottomTierMinute = false;
                        var isBottomTierHour = false;
                        var taskSettings = this.parent.taskFields;
                        if (!isNullOrUndefined(this.parent.timelineSettings.bottomTier)) {
                            isBottomTierMinute = this.parent.timelineSettings.bottomTier.unit === 'Minutes';
                            isBottomTierHour = this.parent.timelineSettings.bottomTier.unit === 'Hour';
                        }
                        if (this.parent.readOnly || !taskbarElement || isNullOrUndefined(taskSettings.segments) ||
                            this.parent.flatData[Number(rowIndex)].hasChildRecords ||
                            (this.parent.flatData[Number(rowIndex)].ganttProperties.duration < 2
                                && !(isBottomTierMinute || isBottomTierHour))) {
                            this.updateItemVisibility(item.text);
                        }
                        break;
                    }
                case 'MergeTask':
                    if (this.parent.readOnly || !taskbarElement) {
                        this.updateItemVisibility(item.text);
                    }
                    else {
                        this.mergeItemVisiblity(target, item);
                    }
                    break;
            }
        }
    };
    ContextMenu.prototype.mergeItemVisiblity = function (target, item) {
        var subMenu = [];
        var taskfields = this.parent.taskFields;
        var currentClickedDate = this.getClickedDate(target);
        this.segmentIndex = this.parent.chartRowsModule.getSegmentIndex(currentClickedDate, this.rowData);
        var segments = this.rowData.ganttProperties.segments;
        if (!isNullOrUndefined(segments) && segments.length > 0) {
            if (isNullOrUndefined(taskfields.segments) && this.segmentIndex === -1) {
                this.updateItemVisibility(item.text);
            }
            else {
                if (this.segmentIndex === 0) {
                    subMenu.push(this.createItemModel(cons.content, 'Right', this.getLocale('right')));
                }
                else if (this.segmentIndex === segments.length - 1) {
                    subMenu.push(this.createItemModel(cons.content, 'Left', this.getLocale('left')));
                }
                else {
                    subMenu.push(this.createItemModel(cons.content, 'Right', this.getLocale('right')));
                    subMenu.push(this.createItemModel(cons.content, 'Left', this.getLocale('left')));
                }
                item.items = subMenu;
            }
        }
        else {
            this.hideItems.push(item.text);
        }
    };
    ContextMenu.prototype.updateItemVisibility = function (text) {
        var isDefaultItem = !isNullOrUndefined(this.parent.contextMenuItems) ? false : true;
        if (isDefaultItem) {
            this.hideItems.push(text);
        }
        else {
            this.disableItems.push(text);
        }
    };
    ContextMenu.prototype.contextMenuOpen = function (args) {
        this.isOpen = true;
        var firstMenuItem = this.parent['args'] = args.element.querySelectorAll('li:not(.e-menu-hide):not(.e-disabled)')[0];
        if (!isNullOrUndefined(firstMenuItem)) {
            addClass([firstMenuItem], 'e-focused');
        }
    };
    ContextMenu.prototype.getMenuItems = function () {
        var menuItems = !isNullOrUndefined(this.parent.contextMenuItems) ?
            this.parent.contextMenuItems : this.getDefaultItems();
        for (var _i = 0, menuItems_1 = menuItems; _i < menuItems_1.length; _i++) {
            var item = menuItems_1[_i];
            if (typeof item === 'string' && this.getDefaultItems().indexOf(item) !== -1) {
                this.buildDefaultItems(item);
            }
            else if (typeof item !== 'string') {
                if (this.getDefaultItems().indexOf(item.text) !== -1) {
                    this.buildDefaultItems(item.text, item.iconCss);
                }
                else if (item.target === cons.columnHeader) {
                    this.headerMenuItems.push(item);
                }
                else {
                    this.contentMenuItems.push(item);
                }
            }
        }
        return this.contentMenuItems;
    };
    ContextMenu.prototype.createItemModel = function (target, item, text, iconCss) {
        var itemModel = {
            text: text,
            id: this.generateID(item),
            target: target,
            iconCss: iconCss ? 'e-icons ' + iconCss : null
        };
        return itemModel;
    };
    ContextMenu.prototype.getLocale = function (text) {
        var localeText = this.parent.localeObj.getConstant(text);
        return localeText;
    };
    ContextMenu.prototype.buildDefaultItems = function (item, iconCSS) {
        var contentMenuItem;
        switch (item) {
            case 'AutoFitAll':
            case 'AutoFit':
            case 'SortAscending':
            case 'SortDescending':
                this.headerMenuItems.push(item);
                break;
            case 'TaskInformation':
                contentMenuItem = this.createItemModel(cons.content, item, this.getLocale('taskInformation'), this.getIconCSS(cons.editIcon, iconCSS));
                break;
            case 'Indent':
                contentMenuItem = this.createItemModel(cons.content, item, this.getLocale('indent'), this.getIconCSS(cons.indentIcon, iconCSS));
                break;
            case 'Outdent':
                contentMenuItem = this.createItemModel(cons.content, item, this.getLocale('outdent'), this.getIconCSS(cons.outdentIcon, iconCSS));
                break;
            case 'Save':
                contentMenuItem = this.createItemModel(cons.editIcon, item, this.getLocale('save'), this.getIconCSS(cons.saveIcon, iconCSS));
                break;
            case 'Cancel':
                contentMenuItem = this.createItemModel(cons.editIcon, item, this.getLocale('cancel'), this.getIconCSS(cons.cancelIcon, iconCSS));
                break;
            case 'Add':
                contentMenuItem = this.createItemModel(cons.content, item, this.getLocale('add'), this.getIconCSS(cons.addIcon, iconCSS));
                //Sub item menu
                contentMenuItem.items = [];
                contentMenuItem.items.push(this.createItemModel(cons.content, 'Above', this.getLocale('above'), this.getIconCSS(cons.addAboveIcon, iconCSS)));
                contentMenuItem.items.push(this.createItemModel(cons.content, 'Below', this.getLocale('below'), this.getIconCSS(cons.addBelowIcon, iconCSS)));
                if (this.parent.viewType !== 'ResourceView') {
                    contentMenuItem.items.push(this.createItemModel(cons.content, 'Child', this.getLocale('child')));
                }
                contentMenuItem.items.push(this.createItemModel(cons.content, 'Milestone', this.getLocale('milestone')));
                break;
            case 'DeleteTask':
                contentMenuItem = this.createItemModel(cons.content, item, this.getLocale('deleteTask'), this.getIconCSS(cons.deleteIcon, iconCSS));
                break;
            case 'DeleteDependency':
                contentMenuItem = this.createItemModel(cons.content, item, this.getLocale('deleteDependency'));
                contentMenuItem.items = [];
                contentMenuItem.items.push({});
                break;
            case 'Convert':
                contentMenuItem = this.createItemModel(cons.content, item, this.getLocale('convert'));
                contentMenuItem.items = [];
                contentMenuItem.items.push({});
                break;
            case 'TaskMode':
                contentMenuItem = this.createItemModel(cons.content, item, this.getLocale('changeScheduleMode'));
                contentMenuItem.items = [];
                contentMenuItem.items.push({});
                break;
            case 'SplitTask':
                contentMenuItem = this.createItemModel(cons.content, item, this.getLocale('splitTask'));
                break;
            case 'MergeTask':
                contentMenuItem = this.createItemModel(cons.content, item, this.getLocale('mergeTask'));
                contentMenuItem.items = [];
                contentMenuItem.items.push({});
        }
        if (contentMenuItem) {
            this.contentMenuItems.push(contentMenuItem);
        }
    };
    ContextMenu.prototype.getIconCSS = function (menuClass, iconString) {
        return isNullOrUndefined(iconString) ? menuClass : iconString;
    };
    ContextMenu.prototype.getPredecessorsItems = function () {
        this.predecessors = this.parent.predecessorModule.getValidPredecessor(this.rowData);
        var items = [];
        var itemModel;
        var increment = 0;
        for (var _i = 0, _a = this.predecessors; _i < _a.length; _i++) {
            var predecessor = _a[_i];
            var ganttData = this.parent.getRecordByID(predecessor.from);
            var ganttProp = ganttData.ganttProperties;
            var text = ganttProp.rowUniqueID + ' - ' + ganttProp.taskName;
            var id = 'Dependency' + increment++;
            itemModel = this.createItemModel(cons.content, id, text);
            items.push(itemModel);
        }
        return items;
    };
    ContextMenu.prototype.getDefaultItems = function () {
        return ['AutoFitAll', 'AutoFit',
            'TaskInformation', 'DeleteTask', 'Save', 'Cancel',
            'SortAscending', 'SortDescending', 'Add',
            'DeleteDependency', 'Convert', 'TaskMode', 'Indent', 'Outdent', 'SplitTask', 'MergeTask'
        ];
    };
    /**
     * To get ContextMenu module name.
     *
     * @returns {string} .
     */
    ContextMenu.prototype.getModuleName = function () {
        return 'contextMenu';
    };
    ContextMenu.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('initiate-contextMenu', this.render);
        this.parent.off('reRender-contextMenu', this.reRenderContextMenu);
        this.parent.off('contextMenuClick', this.contextMenuItemClick);
        this.parent.off('contextMenuOpen', this.contextMenuOpen);
    };
    ContextMenu.prototype.contextMenuOnClose = function (args) {
        var parent = 'parentObj';
        if (args.items.length > 0 && args.items[0]["" + parent] instanceof Menu) {
            this.revertItemStatus();
        }
    };
    ContextMenu.prototype.revertItemStatus = function () {
        this.contextMenu.showItems(this.hideItems);
        this.contextMenu.enableItems(this.disableItems);
        this.hideItems = [];
        this.disableItems = [];
        this.isOpen = false;
    };
    ContextMenu.prototype.resetItems = function () {
        this.hideItems = [];
        this.disableItems = [];
        this.headerMenuItems = [];
        this.contentMenuItems = [];
        this.item = null;
    };
    ContextMenu.prototype.generateID = function (item) {
        return this.ganttID + '_contextMenu_' + item;
    };
    ContextMenu.prototype.getKeyFromId = function (id) {
        var idPrefix = this.ganttID + '_contextMenu_';
        if (id.indexOf(idPrefix) > -1) {
            return id.replace(idPrefix, '');
        }
        else {
            return 'Custom';
        }
    };
    /**
     * To destroy the contextmenu module.
     *
     * @returns {void} .
     * @private
     */
    ContextMenu.prototype.destroy = function () {
        this.contextMenu.destroy();
        remove(this.element);
        this.removeEventListener();
        this.contextMenu = null;
        this.element = null;
    };
    return ContextMenu;
}());
export { ContextMenu };
