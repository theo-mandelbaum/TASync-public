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
import { isNullOrUndefined, createElement, extend, addClass, remove, removeClass, closest, merge, classList, getValue } from '@syncfusion/ej2-base';
import { parentsUntil } from '../base/utils';
import { DateProcessor } from '../base/date-processor';
import * as cls from '../base/css-constants';
import { EditTooltip } from '../renderer/edit-tooltip';
/**
 * File for handling taskbar editing operation in Gantt.
 */
var TaskbarEdit = /** @class */ (function (_super) {
    __extends(TaskbarEdit, _super);
    function TaskbarEdit(ganttObj) {
        var _this = _super.call(this, ganttObj) || this;
        _this.leftValue = 0;
        _this.previousLeftValue = 0;
        _this.isMouseDragged = false;
        _this.dependencyCancel = false;
        _this.isDragged = false;
        _this.editElement = null;
        _this.elementOffsetLeft = 0;
        _this.elementOffsetTop = 0;
        _this.elementOffsetWidth = 0;
        _this.elementOffsetHeight = 0;
        _this.segmentIndex = -1;
        _this.currentItemTop = 0;
        _this.currentItemPrevTop = 0;
        _this.topValue = 0;
        _this.draggedRecordMarginTop = '0px';
        _this.isClonedElement = false;
        _this.updatePosition = false;
        _this.tooltipValue = 0;
        _this.parent = ganttObj;
        _this.initPublicProp();
        _this.wireEvents();
        _this.editTooltip = new EditTooltip(_this.parent, _this);
        return _this;
    }
    TaskbarEdit.prototype.wireEvents = function () {
        this.parent.on('chartMouseDown', this.mouseDownHandler, this);
        this.parent.on('chartMouseUp', this.mouseUpHandler, this);
        this.parent.on('chartMouseLeave', this.mouseLeaveHandler, this);
        this.parent.on('chartMouseMove', this.mouseMoveAction, this);
        this.parent.on('chartMouseClick', this.mouseClickHandler, this);
    };
    /**
     * To initialize the public property.
     *
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.initPublicProp = function () {
        this.taskBarEditElement = null;
        this.taskBarEditRecord = null;
        this.taskBarEditAction = null;
        this.connectorSecondElement = null;
        this.connectorSecondRecord = null;
        this.connectorSecondAction = null;
        this.highlightedSecondElement = null;
        this.fromPredecessorText = null;
        this.toPredecessorText = null;
        this.finalPredecessor = null;
        this.drawPredecessor = false;
        this.roundOffDuration = true;
        this.dragMouseLeave = false;
        this.isMouseDragged = false;
        this.previousItemProperty = ['left', 'progress', 'duration', 'isMilestone', 'startDate', 'endDate', 'width', 'progressWidth',
            'autoLeft', 'autoDuration', 'autoStartDate', 'autoEndDate', 'autoWidth', 'segments'];
        this.tapPointOnFocus = false;
        this.touchEdit = false;
    };
    TaskbarEdit.prototype.mouseDownHandler = function (e) {
        if (this.parent.editSettings.allowTaskbarEditing && !this.parent.readOnly) {
            this.canDrag = false;
            if (this.taskBarEditElement) {
                var targetElement = this.getElementByPosition(e);
                var element = parentsUntil(targetElement, cls.taskBarMainContainer);
                if ((element && element.innerHTML === this.taskBarEditElement.innerHTML ||
                    this.taskBarEditElement.classList.contains('e-segmented-taskbar') || this.taskBarEditElement.classList.contains('collpse-parent-border'))) {
                    this.updateTaskBarEditElement(e);
                    this.canDrag = true;
                    e.preventDefault();
                }
            }
            else if (!this.parent.isAdaptive) {
                this.updateTaskBarEditElement(e);
            }
        }
    };
    TaskbarEdit.prototype.mouseClickHandler = function (e) {
        if (!this.parent.editSettings.allowTaskbarEditing) {
            return;
        }
        var targetElement = this.getElementByPosition(e);
        var element = parentsUntil(targetElement, cls.taskBarMainContainer);
        if (this.parent.selectionModule && this.parent.selectionModule.enableSelectMultiTouch) {
            if (this.tapPointOnFocus) {
                this.updateTaskBarEditElement(e);
            }
            return;
        }
        if (this.tapPointOnFocus && !isNullOrUndefined(this.taskBarEditElement) && element &&
            element.innerHTML !== this.taskBarEditElement.innerHTML) {
            this.connectorSecondRecord = this.parent.ganttChartModule.getRecordByTaskBar(element);
            this.connectorSecondAction = 'ConnectorPointLeftDrag';
            this.connectorSecondElement = element;
            this.fromPredecessorText = 'Finish';
            if (this.validateConnectorPoint()) {
                this.taskBarEditingAction(e, true);
            }
            this.showHideActivePredecessors(false);
            this.initPublicProp();
        }
        else if (targetElement.classList.contains(cls.connectorPointLeftHover)) {
            this.canDrag = false;
            this.multipleSelectionEnabled();
            this.showHideTaskBarEditingElements(targetElement, this.taskBarEditElement);
            this.tapPointOnFocus = true;
            this.taskBarEditAction = 'ConnectorPointLeftDrag';
            this.connectorSecondRecord = this.taskBarEditRecord;
            this.taskBarEditingAction(e, false);
        }
        else if (targetElement.classList.contains(cls.connectorPointRightHover)) {
            this.canDrag = false;
            this.multipleSelectionEnabled();
            this.showHideTaskBarEditingElements(targetElement, this.taskBarEditElement);
            this.tapPointOnFocus = true;
            this.taskBarEditAction = 'ConnectorPointRightDrag';
            this.connectorSecondRecord = this.taskBarEditRecord;
            this.taskBarEditingAction(e, false);
        }
        else {
            if (this.tapPointOnFocus) {
                this.showHideActivePredecessors(false);
                this.showHideTaskBarEditingElements(element, this.taskBarEditElement);
            }
            this.updateTaskBarEditElement(e);
        }
    };
    TaskbarEdit.prototype.showHideActivePredecessors = function (show) {
        var ganttProp = this.taskBarEditRecord.ganttProperties;
        var predecessors = ganttProp.predecessor;
        var id = this.parent.viewType === 'ResourceView' ? ganttProp.taskId : ganttProp.rowUniqueID;
        if (predecessors) {
            for (var i = 0; i < predecessors.length; i++) {
                var predecessor = predecessors[i];
                if (id.toString() === predecessor.from || id.toString() === predecessor.to) {
                    this.applyActiveColor(predecessor.from, predecessor.to, show);
                }
            }
        }
        var chartContent = this.parent.ganttChartModule.chartBodyContainer;
        if (show) {
            addClass([this.taskBarEditElement], [cls.activeChildTask]);
            addClass([chartContent], [cls.touchMode]);
        }
        else {
            removeClass([this.taskBarEditElement], [cls.activeChildTask]);
            removeClass([chartContent], [cls.touchMode]);
        }
        this.touchEdit = show;
        if (!isNullOrUndefined(this.parent.toolbarModule)) {
            this.parent.toolbarModule.refreshToolbarItems();
        }
    };
    TaskbarEdit.prototype.applyActiveColor = function (from, to, enable) {
        var taskId = this.parent.viewType === 'ProjectView' ? this.taskBarEditRecord.ganttProperties.taskId.toString() :
            this.taskBarEditRecord.ganttProperties.rowUniqueID.toString();
        var ganttRecord = (taskId === from) ? this.parent.connectorLineModule.getRecordByID(to) :
            this.parent.connectorLineModule.getRecordByID(from);
        var $tr = this.parent.ganttChartModule.getChartRows()[this.parent.currentViewData.indexOf(ganttRecord)];
        if (!isNullOrUndefined($tr)) {
            var $taskbar = $tr.querySelector('.' + cls.taskBarMainContainer);
            var $connectorElement = this.parent.element.querySelector('#ConnectorLineparent' + from + 'child' + to);
            if (enable) {
                addClass([$taskbar], [cls.activeConnectedTask]);
                if ($connectorElement) {
                    addClass([$connectorElement], [cls.activeConnectedTask]);
                }
            }
            else {
                removeClass([$taskbar], [cls.activeConnectedTask]);
                if ($connectorElement) {
                    removeClass([$connectorElement], [cls.activeConnectedTask]);
                }
            }
        }
    };
    TaskbarEdit.prototype.validateConnectorPoint = function () {
        var parentRecord = this.taskBarEditRecord.ganttProperties;
        var childRecord = this.connectorSecondRecord.ganttProperties;
        var isValid = true;
        var parentId = this.parent.viewType === 'ResourceView' ? parentRecord.taskId : parentRecord.rowUniqueID;
        var childId = this.parent.viewType === 'ResourceView' ? childRecord.taskId : childRecord.rowUniqueID;
        if (this.connectorSecondRecord.hasChildRecords) {
            isValid = false;
        }
        else if (childRecord.predecessor) {
            for (var i = 0; i < childRecord.predecessor.length; i++) {
                var predecessor = childRecord.predecessor[i];
                if (predecessor.from === parentId.toString() &&
                    predecessor.to === childId.toString()) {
                    this.parent.connectorLineEditModule.childRecord = this.connectorSecondRecord;
                    this.parent.connectorLineEditModule.predecessorIndex = i;
                    this.parent.connectorLineEditModule.renderPredecessorDeleteConfirmDialog();
                    isValid = false;
                    break;
                }
                else if (predecessor.from === childId.toString() &&
                    predecessor.to === parentId.toString()) {
                    this.parent.connectorLineEditModule.childRecord = this.taskBarEditRecord;
                    this.parent.connectorLineEditModule.predecessorIndex = i;
                    this.parent.connectorLineEditModule.renderPredecessorDeleteConfirmDialog();
                    isValid = false;
                    break;
                }
            }
        }
        return isValid;
    };
    // eslint-disable-next-line
    TaskbarEdit.prototype.mouseLeaveHandler = function (e) {
        if (this.taskBarEditAction === 'ChildDrag' || this.taskBarEditAction === 'ParentDrag' ||
            this.taskBarEditAction === 'ProgressResizing' || this.taskBarEditAction === 'LeftResizing' ||
            this.taskBarEditAction === 'RightResizing') {
            this.dragMouseLeave = false;
        }
        else {
            this.dragMouseLeave = true;
        }
    };
    /**
     * To update taskbar edited elements on mouse down action.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.updateTaskBarEditElement = function (e) {
        var target = this.getElementByPosition(e);
        var cloneTaskBar;
        var element;
        if (target.classList.contains(cls.manualParentRightResizer) || target.classList.contains(cls.manualParentMainContainer)
            || target.classList.contains(cls.manualParentTaskBar)) {
            element = parentsUntil(target, cls.manualParentMainContainer);
        }
        else if (target.classList.contains(cls.manualParentMilestone)) {
            element = parentsUntil(target, cls.manualParentMilestone);
        }
        else {
            element = parentsUntil(target, cls.taskBarMainContainer);
            if (!isNullOrUndefined(element) && !target.classList.contains('e-connectorpoint-left') &&
                !target.classList.contains('e-connectorpoint-right')) {
                var currentRecord = this.parent.ganttChartModule.getRecordByTaskBar(element);
                if (!isNullOrUndefined(currentRecord.ganttProperties.segments) && currentRecord.ganttProperties.segments.length > 0) {
                    if (target.classList.contains('e-progressbar-handler-after')) {
                        for (var i = 0; i < currentRecord.ganttProperties.segments.length; i++) {
                            if (currentRecord.ganttProperties.segments[i].showProgress) {
                                element = element.querySelectorAll('.e-segmented-taskbar')[i];
                                break;
                            }
                        }
                    }
                    else {
                        element = parentsUntil(target, cls.childTaskBarInnerDiv);
                    }
                }
            }
        }
        if (this.parent.editSettings.allowTaskbarEditing && element) {
            this.showHideTaskBarEditingElements(element, this.editElement);
            this.editElement = element;
            this.realTaskbarElement = this.editElement;
            var index = this.editElement.getAttribute('data-segment-index');
            if (!isNullOrUndefined(index)) {
                this.segmentIndex = Number(index);
            }
            else {
                this.segmentIndex = -1;
            }
            this.taskBarEditRecord = this.parent.ganttChartModule.getRecordByTaskBar(this.editElement);
            if (e.type === 'mousedown' || e.type === 'touchstart' || e.type === 'click') {
                this.taskBarEditAction = this.getTaskBarAction(e);
                var index_1 = this.editElement.getAttribute('data-segment-index');
                var currentRecord = this.parent.ganttChartModule.getRecordByTaskBar(element);
                var ganttprop = currentRecord.ganttProperties;
                var parentleft = this.editElement.parentElement.offsetLeft;
                this.currentData = currentRecord;
                var resizeElement = createElement('div', { styles: 'height:100%;border-style:dashed;border-bottom:none;border-top:none;border-width:1px;position:absolute;z-index:10000' });
                addClass([resizeElement], 'e-taskbar-resize-div');
                resizeElement.style.setProperty('width', ganttprop.width + 'px');
                var currentindex = this.editElement.getAttribute('data-segment-index');
                if (!isNullOrUndefined(ganttprop.segments) && this.parent.allowTaskbarDragAndDrop && this.taskBarEditAction !== 'LeftResizing' && this.taskBarEditAction !== 'RightResizing' && this.taskBarEditAction !== 'ProgressResizing') {
                    resizeElement.style.setProperty('left', ((!isNullOrUndefined(ganttprop.segments) ? parentleft + 'px' : (ganttprop.left) + 'px')));
                }
                else {
                    resizeElement.style.setProperty('left', (((!isNullOrUndefined(ganttprop.segments) && ganttprop.segments.length > 1) ? parentleft + ganttprop.segments[Number(currentindex)].left + 'px' : (ganttprop.left) + 'px')));
                }
                var resizeTable = this.parent.createElement('table');
                var resizetableBody = this.parent.createElement('tbody');
                resizetableBody.appendChild(resizeElement);
                resizeTable.appendChild(resizetableBody);
                var Check = this.parent.ganttChartModule.chartBodyContainer.querySelector('.e-clone-taskbar');
                var createTable = null;
                if ((this.taskBarEditAction === 'ChildDrag' || this.taskBarEditAction === 'LeftResizing') && !isNullOrUndefined(index_1) && !isNullOrUndefined(index_1) ? Number(index_1) === 0 : false) {
                    cloneTaskBar = this.editElement.parentElement.cloneNode(true);
                }
                else {
                    if (this.segmentIndex !== -1 && this.parent.allowTaskbarDragAndDrop && this.taskBarEditAction !== 'LeftResizing' &&
                        this.taskBarEditAction !== 'RightResizing' && this.taskBarEditAction !== 'ProgressResizing') {
                        cloneTaskBar = this.editElement.parentElement.cloneNode(true);
                    }
                    else {
                        cloneTaskBar = this.editElement.cloneNode(true);
                    }
                }
                if (!Check) {
                    addClass([cloneTaskBar], 'e-clone-taskbar');
                    cloneTaskBar.style.setProperty('position', 'absolute');
                    if (currentRecord.hasChildRecords && !currentRecord.ganttProperties.isAutoSchedule) {
                        var containerPosition = this.parent.getOffsetRect(this.parent.ganttChartModule.chartBodyContainer);
                        var taskbarPosition = this.parent.getOffsetRect(this.editElement);
                        if (this.editElement.classList.contains('e-manualparent-main-container')) {
                            cloneTaskBar.style.setProperty('left', (currentRecord.ganttProperties.left - currentRecord.ganttProperties.autoLeft) + 'px');
                        }
                        else {
                            cloneTaskBar.style.setProperty(this.parent.enableRtl ?
                                'right' : 'left', Math.abs(taskbarPosition.left - containerPosition.left + Math.abs(this.parent.ganttChartModule.scrollElement.scrollLeft)) + 'px');
                        }
                    }
                    cloneTaskBar.style.setProperty('top', 0 + 'px');
                    createTable = this.parent.createElement('table');
                    var tableBody = this.parent.createElement('tbody');
                    tableBody.appendChild(cloneTaskBar);
                    createTable.appendChild(tableBody);
                }
                if ((this.taskBarEditAction === 'ChildDrag' || this.taskBarEditAction === 'LeftResizing') && !isNullOrUndefined(index_1) && !isNullOrUndefined(index_1) ? Number(index_1) === 0 : false) {
                    var segmentedTasks = cloneTaskBar.getElementsByClassName('e-segmented-taskbar');
                    this.cloneTaskbarElement = segmentedTasks[Number(index_1)];
                }
                else {
                    this.cloneTaskbarElement = cloneTaskBar;
                }
                this.taskBarEditElement = this.cloneTaskbarElement;
                this.taskbarElement = createTable;
                this.taskbarResizer = resizeTable;
                this.currentIndex = index_1;
                this.roundOffDuration = true;
                if ((this.taskBarEditAction === 'ConnectorPointLeftDrag' || this.taskBarEditAction === 'ConnectorPointRightDrag') &&
                    isNullOrUndefined(this.parent.taskFields.dependency)) {
                    this.taskBarEditAction = null;
                }
                this.updateMouseDownProperties(e);
                if (this.parent.viewType === 'ResourceView' || this.parent.viewType === 'ProjectView') {
                    if (this.taskBarEditRecord.level === 0) {
                        return;
                    }
                    else if (this.parent.enableMultiTaskbar) {
                        var parentRecord = this.parent.getTaskByUniqueID(this.taskBarEditRecord.parentItem.uniqueID);
                        if (!isNullOrUndefined(parentRecord) && !parentRecord.expanded) {
                            this.prevZIndex = (this.taskBarEditElement).style.zIndex;
                            (this.taskBarEditElement).style.zIndex = '1000';
                            if (this.taskBarEditElement.querySelector('.e-gantt-child-taskbar')) {
                                addClass([this.taskBarEditElement.querySelector('.e-gantt-child-taskbar')], 'e-collapsed-taskbar-drag');
                            }
                        }
                    }
                }
            }
        }
        else {
            if (this.parent.isAdaptive) {
                if (this.taskBarEditElement) {
                    this.showHideTaskBarEditingElements(element, this.editElement);
                }
                this.initPublicProp();
            }
            else {
                this.showHideTaskBarEditingElements(element, this.editElement);
            }
        }
    };
    /**
     * To show/hide taskbar editing elements.
     *
     * @param {Element} element .
     * @param {Element} secondElement .
     * @param {boolean} fadeConnectorLine .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.showHideTaskBarEditingElements = function (element, secondElement, fadeConnectorLine) {
        secondElement = secondElement ? secondElement : this.editElement;
        var isShowProgressResizer = this.parent.taskFields.progress ? true : false;
        var isShowConnectorPoints = true;
        if (this.parent.readOnly) {
            return;
        }
        var record = element ? this.parent.ganttChartModule.getRecordByTaskBar(element) :
            secondElement ? this.parent.ganttChartModule.getRecordByTaskBar(secondElement) : null;
        if (this.parent.enableMultiTaskbar && element) {
            var parentRecord = this.parent.getParentTask(record.parentItem);
            if (!isNullOrUndefined(parentRecord)) {
                if (!parentRecord.expanded) {
                    isShowConnectorPoints = false;
                    addClass([element], [cls.collapseMultiTaskBar]);
                }
            }
        }
        if (element) {
            if (element.querySelector('.' + cls.taskBarLeftResizer)) {
                addClass([element.querySelector('.' + cls.taskBarLeftResizer)], [cls.leftResizeGripper]);
                addClass([element.querySelector('.' + cls.taskBarRightResizer)], [cls.rightResizeGripper]);
                if (isShowProgressResizer) {
                    var progressElement = (record && record.ganttProperties.segments &&
                        record.ganttProperties.segments.length > 0) ?
                        this.parent.getRowByIndex(this.parent.currentViewData.indexOf(record)).
                            querySelectorAll('.' + cls.childProgressResizer)[0] :
                        element.querySelector('.' + cls.childProgressResizer);
                    if (!isNullOrUndefined(progressElement)) {
                        addClass([progressElement], [cls.progressResizeGripper]);
                        progressElement.style.top = '3px';
                    }
                }
            }
            else if (this.parent.isAdaptive && isShowProgressResizer) {
                var record_1 = this.parent.ganttChartModule.getRecordByTaskBar(element);
                if (record_1.hasChildRecords) {
                    addClass([element], [cls.activeParentTask]);
                }
            }
            addClass(this.parent.ganttChartModule.scrollElement.querySelectorAll('.' + cls.connectorLineContainer), [cls.connectorLineZIndex]);
            if (!isNullOrUndefined(this.parent.taskFields.dependency)
                && (element.querySelector('.' + cls.connectorPointLeft)
                    || element.parentElement.querySelector('.' + cls.connectorPointLeft))
                && isShowConnectorPoints) {
                var connectorElement = !isNullOrUndefined(element.querySelector('.' + cls.connectorPointLeft)) ?
                    element : element.parentElement;
                if (!isNullOrUndefined(connectorElement.querySelector('.' + cls.connectorPointLeft))) {
                    addClass([connectorElement.querySelector('.' + cls.connectorPointLeft)], [cls.connectorPointLeftHover]);
                }
                if (!isNullOrUndefined(connectorElement.querySelector('.' + cls.connectorPointRight))) {
                    addClass([connectorElement.querySelector('.' + cls.connectorPointRight)], [cls.connectorPointRightHover]);
                }
            }
        }
        else if (!fadeConnectorLine) {
            removeClass(this.parent.ganttChartModule.scrollElement.querySelectorAll('.' + cls.connectorLineContainer), [cls.connectorLineZIndex]);
        }
        if (secondElement && element !== secondElement) {
            if (secondElement.querySelector('.' + cls.taskBarLeftResizer)) {
                removeClass([secondElement.querySelector('.' + cls.taskBarLeftResizer)], [cls.leftResizeGripper]);
                removeClass([secondElement.querySelector('.' + cls.taskBarRightResizer)], [cls.rightResizeGripper]);
                var progressElement = (record && record.ganttProperties.segments && record.ganttProperties.segments.length > 0) ?
                    this.parent.getRowByIndex(this.parent.currentViewData.indexOf(record)) : secondElement;
                if (progressElement && progressElement.querySelector('.' + cls.childProgressResizer)) {
                    removeClass([progressElement.querySelector('.' + cls.childProgressResizer)], [cls.progressResizeGripper]);
                }
            }
            if (!isNullOrUndefined(this.parent.taskFields.dependency)
                && (secondElement.querySelector('.' + cls.connectorPointLeft)
                    || secondElement.parentElement.querySelector('.' + cls.connectorPointLeft))) {
                var connectorElement = !isNullOrUndefined(secondElement.querySelector('.' + cls.connectorPointLeft)) ?
                    secondElement : secondElement.parentElement;
                var leftConnector = connectorElement.querySelector('.' + cls.connectorPointLeft);
                var rightConnector = connectorElement.querySelector('.' + cls.connectorPointRight);
                if (leftConnector) {
                    removeClass([leftConnector], [cls.connectorPointLeftHover]);
                }
                if (rightConnector) {
                    removeClass([rightConnector], [cls.connectorPointRightHover]);
                }
            }
            else if (this.parent.isAdaptive) {
                var record_2 = this.parent.ganttChartModule.getRecordByTaskBar(secondElement);
                if (record_2 && record_2.hasChildRecords) {
                    removeClass([secondElement], [cls.activeParentTask]);
                }
            }
            this.editElement = null;
        }
    };
    /**
     * To get taskbar edit actions.
     *
     * @param {PointerEvent} e .
     * @returns {string} .
     * @private
     */
    TaskbarEdit.prototype.getTaskBarAction = function (e) {
        var mouseDownElement = this.getElementByPosition(e);
        var data = this.taskBarEditRecord;
        var action = '';
        if (mouseDownElement.classList.contains(cls.taskBarLeftResizer)) {
            action = 'LeftResizing';
        }
        else if (mouseDownElement.classList.contains(cls.taskBarRightResizer)) {
            action = 'RightResizing';
        }
        else if ((mouseDownElement.classList.contains(cls.childProgressResizer) ||
            closest(mouseDownElement, '.' + cls.childProgressResizer)) && (this.parent.taskFields.progress)) {
            action = 'ProgressResizing';
        }
        else if (mouseDownElement.classList.contains(cls.connectorPointLeft)) {
            action = 'ConnectorPointLeftDrag';
        }
        else if (mouseDownElement.classList.contains(cls.connectorPointRight)) {
            action = 'ConnectorPointRightDrag';
        }
        else if (mouseDownElement.classList.contains(cls.manualParentRightResizer)) {
            action = 'ParentResizing';
        }
        else if (mouseDownElement.classList.contains(cls.manualParentTaskBar) ||
            mouseDownElement.classList.contains(cls.manualParentMainContainer) ||
            mouseDownElement.classList.contains(cls.manualParentMilestone)) {
            action = 'ManualParentDrag';
        }
        else if (data) {
            action = data.hasChildRecords ? data[this.parent.taskFields.manual] ? '' : 'ParentDrag'
                : data.ganttProperties.isMilestone ? 'MilestoneDrag' : 'ChildDrag';
        }
        return action;
    };
    /**
     * To update property while perform mouse down.
     *
     * @param {PointerEvent} event .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.updateMouseDownProperties = function (event) {
        var e = this.getCoordinate(event);
        var parentWithZoomStyle = this.parent.element.closest('[style*="zoom"]');
        if (parentWithZoomStyle) {
            var zoom1 = parseFloat(getComputedStyle(parentWithZoomStyle).zoom);
            e.pageX = e.pageX / zoom1;
            e.pageY = e.pageY / zoom1;
        }
        if (e.pageX || e.pageY) {
            var containerPosition = this.parent.getOffsetRect(this.parent.ganttChartModule.chartBodyContainer);
            if (this.parent.enableRtl) {
                this.mouseDownX = Math.abs(e.pageX - (containerPosition.left +
                    Math.abs(this.parent.ganttChartModule.scrollObject.previousScroll.left)));
            }
            else {
                this.mouseDownX = (e.pageX - containerPosition.left) +
                    this.parent.ganttChartModule.scrollObject.previousScroll.left;
            }
            this.tooltipPositionX = this.mouseDownX;
            this.mouseDownY = this.dragMoveY = e.pageY - containerPosition.top +
                this.parent.ganttChartModule.scrollObject.previousScroll.top;
        }
        if (this.taskBarEditAction === 'ConnectorPointLeftDrag' || this.taskBarEditAction === 'ConnectorPointRightDrag') {
            this.fromPredecessorText = this.taskBarEditAction === 'ConnectorPointLeftDrag' ? 'start' : 'finish';
            this.parent.connectorLineModule.tooltipTable.innerHTML = '';
            this.parent.connectorLineModule.tooltipTable.appendChild(this.parent.connectorLineModule.getConnectorLineTooltipInnerTd(this.taskBarEditRecord.ganttProperties.taskName, this.fromPredecessorText, '', ''));
        }
    };
    TaskbarEdit.prototype.isMouseDragCheck = function () {
        if (!this.isMouseDragged && this.taskBarEditAction && ((this.mouseDownX !== this.mouseMoveX) &&
            ((this.mouseDownX + 3) < this.mouseMoveX || (this.mouseDownX - 3) > this.mouseMoveX)
            || (this.mouseDownY !== this.mouseMoveY) &&
                ((this.mouseDownY + 3) < this.mouseMoveY || (this.mouseDownY - 3) > this.mouseMoveY))) {
            this.isMouseDragged = true;
            this.parent.initiateEditAction(true);
            var item = this.taskBarEditRecord.ganttProperties;
            this.previousItem = this.parent.timelineModule.extendFunction(item, this.previousItemProperty);
            if (this.taskBarEditAction !== 'ConnectorPointLeftDrag' &&
                this.taskBarEditAction !== 'ConnectorPointRightDrag' &&
                !(this.parent.viewType === 'ResourceView' && this.taskBarEditAction === 'ParentDrag')) {
                this.editTooltip.showHideTaskbarEditTooltip(true, this.segmentIndex);
            }
            this.taskBarEditElement.setAttribute('aria-grabbed', 'true');
        }
    };
    /* eslint-disable-next-line */
    TaskbarEdit.prototype.removeFirstBorder = function (element) {
        var canremove = this.parent.rowDragAndDropModule['dropPosition'] === 'bottomSegment';
        if (this.parent.element.getElementsByClassName('e-firstrow-border').length > 0 && element &&
            (element.getAttribute('aria-rowindex') - 1 !== 0 || canremove)) {
            this.parent.element.getElementsByClassName('e-firstrow-border')[0].remove();
        }
    };
    TaskbarEdit.prototype.removeLastBorder = function (element) {
        var isEmptyRow = element && (element.classList.contains('e-emptyrow') || element.classList.contains('e-columnheader')
            || element.classList.contains('e-detailrow'));
        var islastRowIndex;
        if (this.parent.enableVirtualization) {
            islastRowIndex = element && !isEmptyRow &&
                this.parent.treeGrid.getRows()[this.parent.treeGrid.getCurrentViewRecords().length - 1].getAttribute('data-uid') !==
                    element.getAttribute('data-uid');
        }
        else {
            islastRowIndex = element && !isEmptyRow &&
                this.parent.treeGrid.getRowByIndex(this.parent.treeGrid.getCurrentViewRecords().length - 1).getAttribute('data-uid') !==
                    element.getAttribute('data-uid');
        }
        var canremove = islastRowIndex || this.parent.rowDragAndDropModule['dropPosition'] === 'topSegment';
        if (this.parent.element.getElementsByClassName('e-lastrow-border').length > 0 && element && (islastRowIndex || canremove)) {
            this.parent.element.getElementsByClassName('e-lastrow-border')[0].remove();
        }
    };
    TaskbarEdit.prototype.removetopOrBottomBorder = function () {
        var border = [].slice.call(this.parent.element.querySelectorAll('.e-dropbottom, .e-droptop'));
        if (border.length) {
            this.addRemoveClasses(border, false, 'e-dropbottom');
            this.addRemoveClasses(border, false, 'e-droptop');
        }
    };
    TaskbarEdit.prototype.topOrBottomBorder = function (target) {
        var rowElement;
        if (this.parent.enableVirtualization) {
            var gridElement = this.parent.treeGrid.getRows().filter(function (data) {
                return parseInt(data.getAttribute('aria-rowindex'), 10) - 1 === parseInt(target.getAttribute('aria-rowindex'), 10) - 1;
            })[0];
            var index = this.parent.treeGrid.getRows().indexOf(gridElement);
            rowElement = this.parent.getRowByIndex(index).children;
        }
        else {
            rowElement = this.parent.getRowByIndex(parseInt(target.getAttribute('aria-rowindex'), 10) - 1).children;
        }
        if (rowElement) {
            if (this.parent.rowDragAndDropModule['dropPosition'] === 'above') {
                this.addRemoveClasses(rowElement, true, 'e-droptop');
                if (this.parent.element.getElementsByClassName('e-lastrow-dragborder').length > 0) {
                    this.parent.element.getElementsByClassName('e-lastrow-dragborder')[0].remove();
                }
            }
            if (this.parent.rowDragAndDropModule['dropPosition'] === 'below') {
                this.addRemoveClasses(rowElement, true, 'e-dropbottom');
            }
        }
    };
    TaskbarEdit.prototype.removeChildBorder = function () {
        var borderElem = [].slice.call(this.parent.element.querySelectorAll('.e-childborder'));
        if (borderElem.length > 0) {
            this.addRemoveClasses(borderElem, false, 'e-childborder');
        }
    };
    TaskbarEdit.prototype.addRemoveClasses = function (cells, add, className) {
        for (var i = 0, len = cells.length; i < len; i++) {
            if (add) {
                cells[parseInt(i.toString(), 10)].classList.add(className);
            }
            else {
                cells[parseInt(i.toString(), 10)].classList.remove(className);
            }
        }
    };
    TaskbarEdit.prototype.addErrorElem = function () {
        var dragelem = document.getElementsByClassName('e-clone-taskbar')[0];
        var errorelem = document.querySelectorAll('.e-errorelem').length;
        if (!errorelem) {
            var ele = document.createElement('div');
            classList(ele, ['e-errorcontainer'], []);
            classList(ele, ['e-icons', 'e-errorelem'], []);
            if (this.taskBarEditRecord.ganttProperties.segments && this.taskBarEditRecord.ganttProperties.segments.length > 0) {
                ele.style.paddingTop = this.parent.taskbarHeight + 'px';
            }
            dragelem.appendChild(ele);
        }
    };
    TaskbarEdit.prototype.removeErrorElem = function () {
        var errorelem = document.querySelector('.e-errorelem');
        if (errorelem) {
            errorelem.remove();
        }
    };
    TaskbarEdit.prototype.ensurePosition = function (draggedRecords, currentRecord) {
        var _this = this;
        draggedRecords.filter(function (draggedRecord) {
            if (draggedRecord.hasChildRecords && !isNullOrUndefined(draggedRecord.childRecords)) {
                var valid = draggedRecord.childRecords.indexOf(currentRecord);
                if (valid === -1) {
                    _this.ensurePosition(draggedRecord.childRecords, currentRecord);
                }
                else {
                    _this.parent.rowDragAndDropModule['dropPosition'] = 'Invalid';
                    _this.addErrorElem();
                    return;
                }
            }
        });
    };
    /**
     * To handle mouse move action in chart
     *
     * @param {PointerEvent} event .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.mouseMoveAction = function (event) {
        var _this = this;
        if (this.parent.isAdaptive) {
            if (!this.canDrag) {
                return;
            }
            else {
                this.multipleSelectionEnabled();
            }
        }
        var containerPosition = this.parent.getOffsetRect(this.parent.ganttChartModule.chartBodyContainer);
        var e = this.getCoordinate(event);
        if (this.parent.enableRtl) {
            this.mouseMoveX = Math.abs(e.pageX - (containerPosition.left +
                Math.abs(this.parent.ganttChartModule.scrollObject.previousScroll.left)));
        }
        else {
            this.mouseMoveX = e.pageX - containerPosition.left +
                this.parent.ganttChartModule.scrollObject.previousScroll.left;
        }
        this.mouseMoveY = e.pageY - containerPosition.top +
            this.parent.ganttChartModule.scrollObject.previousScroll.top;
        this.dragMouseLeave = false;
        var cancel = false;
        if (this.taskBarEditAction === 'ChildDrag' || this.taskBarEditAction === 'ParentDrag' || this.taskBarEditAction === 'ManualParentDrag' || this.taskBarEditAction === 'MilestoneDrag') {
            var ganttRowElement = void 0;
            if (this.parent.enableVirtualization) {
                var index = this.parent.currentViewData.indexOf(this.taskBarEditRecord);
                ganttRowElement = this.parent.getRowByIndex(index);
            }
            else {
                ganttRowElement = this.parent.getRowByIndex(this.taskBarEditRecord.index);
            }
            var eventArgs = {
                cancel: cancel,
                cloneElement: this.taskbarElement,
                data: this.taskBarEditRecord,
                target: event.target,
                rows: ganttRowElement
            };
            this.parent.trigger('rowDrag', eventArgs);
            cancel = eventArgs['cancel'];
        }
        if (!cancel) {
            this.isMouseDragCheck();
        }
        if (this.isMouseDragged && this.taskBarEditAction) {
            event.preventDefault();
            if (!isNullOrUndefined(this.taskbarElement) && !isNullOrUndefined(this.editElement) && (this.taskBarEditAction !== 'ConnectorPointRightDrag' &&
                this.taskBarEditAction !== 'ConnectorPointLeftDrag') && !(this.parent.viewType === 'ResourceView' && this.currentData.hasChildRecords)) {
                var currentElement = this.editElement.parentElement;
                if (this.parent.enableTimelineVirtualization &&
                    this.parent.timelineModule.wholeTimelineWidth > this.parent.element.offsetWidth * 3) {
                    currentElement.style.setProperty('position', 'relative');
                }
                else {
                    currentElement.style.setProperty('position', 'absolute');
                }
                if ((this.taskBarEditAction === 'ChildDrag' || this.taskBarEditAction === 'LeftResizing') &&
                    !isNullOrUndefined(this.currentIndex) && !isNullOrUndefined(this.currentIndex) ? Number(this.currentIndex) === 0 : false) {
                    this.taskbarElement.childNodes[0].childNodes[0].style.setProperty('top', currentElement.parentElement.offsetTop + 'px');
                    if (this.parent.allowTaskbarDragAndDrop && this.taskBarEditAction !== 'LeftResizing' && this.taskBarEditAction !== 'RightResizing' && this.taskBarEditAction !== 'ProgressResizing') {
                        this.parent.chartPane.getElementsByClassName('e-gantt-chart')[0].appendChild(this.taskbarElement);
                    }
                    else {
                        currentElement.parentElement.appendChild(this.taskbarElement);
                    }
                }
                else {
                    if (this.parent.allowTaskbarDragAndDrop && this.taskBarEditAction !== 'LeftResizing' && this.taskBarEditAction !== 'RightResizing' && this.taskBarEditAction !== 'ProgressResizing') {
                        this.parent.chartPane.getElementsByClassName('e-gantt-chart')[0].appendChild(this.taskbarElement);
                    }
                    else {
                        currentElement.appendChild(this.taskbarElement);
                    }
                }
                if (this.taskBarEditAction !== 'ProgressResizing') {
                    if (this.parent.enableTimelineVirtualization &&
                        this.parent.timelineModule.wholeTimelineWidth > this.parent.element.offsetWidth * 3) {
                        var rootElement = this.parent.ganttChartModule.chartBodyContainer.querySelectorAll('.e-chart-scroll-container');
                        rootElement[0].appendChild(this.taskbarResizer);
                    }
                    else {
                        var rootElement = this.parent.ganttChartModule.chartBodyContainer.querySelectorAll('.e-chart-rows-container');
                        rootElement[0].appendChild(this.taskbarResizer);
                    }
                }
            }
            if (this.parent.allowTaskbarDragAndDrop && (this.taskBarEditAction === 'ChildDrag' || this.taskBarEditAction === 'ParentDrag' ||
                this.taskBarEditAction === 'MilestoneDrag' || this.taskBarEditAction === 'ManualParentDrag')) {
                var taskbarPosition = this.parent.getOffsetRect(this.taskBarEditElement);
                var left = (!isNullOrUndefined(document.body.className) && document.body.className.includes('e-bigger')) ? 12 : 0;
                var pointerLeft = (3 + this.parent.chartRowsModule.connectorPointWidth + left);
                var xValue = void 0;
                if (this.parent.enableRtl) {
                    xValue = Math.abs(taskbarPosition.left + pointerLeft + 1);
                }
                else {
                    xValue = Math.abs(taskbarPosition.left - pointerLeft - 1);
                }
                if (!this.isClonedElement && !this.parent.enableRtl) {
                    xValue = xValue - this.parent.ganttChartModule.scrollElement.scrollLeft;
                    this.isClonedElement = true;
                }
                var rowPositionHeight = 0;
                this.parent.rowDragAndDropModule['dropPosition'] = undefined;
                var target = void 0;
                var yValue = void 0;
                if (event.type === 'touchmove' || event.type === 'touchstart' || event.type === 'touchend') {
                    yValue = event['changedTouches'][0].pageY;
                }
                else {
                    yValue = event.y;
                }
                if (this.parent.enableRtl) {
                    target = document.elementFromPoint(this.parent.ganttChartModule.chartBodyContainer.offsetWidth, yValue);
                    if (target.classList.contains('e-taskbar-resize-div')) {
                        target = document.elementFromPoint(this.parent.ganttChartModule.chartBodyContainer.offsetWidth - target['offsetWidth'], yValue);
                    }
                }
                else {
                    target = document.elementFromPoint(xValue, yValue);
                }
                var draggedTreeGridRowElement = void 0;
                if (this.parent.enableVirtualization) {
                    if (!this.draggedTreeGridRowElement) {
                        var currentElement = this.editElement.parentElement;
                        draggedTreeGridRowElement = currentElement.parentElement;
                        this.draggedTreeGridRowElement = draggedTreeGridRowElement;
                        this.draggedTreeGridRowHeight = this.draggedTreeGridRowElement.offsetHeight;
                    }
                }
                else {
                    draggedTreeGridRowElement = this.parent.treeGrid.getRows()[this.parent.flatData.indexOf(this.taskBarEditRecord)];
                    this.draggedTreeGridRowElement = draggedTreeGridRowElement;
                    if (this.parent.enableMultiTaskbar) {
                        if (this.taskBarEditRecord.parentItem &&
                            !isNullOrUndefined(this.parent.getRowByID(this.taskBarEditRecord.parentItem.taskId))) {
                            this.draggedTreeGridRowHeight = this.parent.getRowByID(this.taskBarEditRecord.parentItem.taskId).offsetHeight;
                            if (this.parent.viewType === 'ProjectView' && this.draggedTreeGridRowHeight === 0) {
                                var nestedParent = this.parent.getRecordByID(this.taskBarEditRecord.parentItem.taskId);
                                while (nestedParent.parentItem) {
                                    nestedParent = this.parent.getRecordByID(nestedParent.parentItem.taskId);
                                    this.draggedTreeGridRowHeight = this.parent.getRowByID(nestedParent['TaskID']).offsetHeight;
                                }
                            }
                        }
                        else {
                            var currentElement = this.editElement.parentElement;
                            this.draggedTreeGridRowElement = currentElement.parentElement;
                            this.draggedTreeGridRowHeight = this.draggedTreeGridRowElement.offsetHeight;
                        }
                    }
                    else {
                        this.draggedTreeGridRowHeight = this.draggedTreeGridRowElement.offsetHeight;
                    }
                }
                var chartRowElement_1;
                if (target) {
                    chartRowElement_1 = closest(target, 'tr.' + cls.chartRow);
                }
                if (chartRowElement_1) {
                    var droppedTreeGridRowElement = void 0;
                    if (this.parent.enableVirtualization) {
                        droppedTreeGridRowElement = this.parent.treeGrid.getRows().filter(function (data) {
                            return parseInt(data.getAttribute('aria-rowindex'), 10) - 1 === parseInt(chartRowElement_1.getAttribute('aria-rowindex'), 10) - 1;
                        })[0];
                    }
                    else {
                        droppedTreeGridRowElement = this.parent.treeGrid.getRows()[parseInt(chartRowElement_1.getAttribute('aria-rowindex'), 10) - 1];
                    }
                    this.removeFirstBorder(droppedTreeGridRowElement);
                    this.removeLastBorder(droppedTreeGridRowElement);
                    if (!isNullOrUndefined(droppedTreeGridRowElement) && droppedTreeGridRowElement.getAttribute('data-uid') === this.draggedTreeGridRowElement.getAttribute('data-uid')
                        || !parentsUntil(target, 'e-chart-rows-container')) {
                        this.parent.rowDragAndDropModule['dropPosition'] = 'Invalid';
                        this.addErrorElem();
                    }
                    var tObj = this.parent;
                    var rowTop = 0;
                    var toolHeight = tObj.toolbarModule ?
                        this.parent.toolbarModule.element.offsetHeight : 0;
                    var positionOffSet = this.parent.getOffsetRect(tObj.element);
                    var contentHeight = tObj.treeGrid.getHeaderContent().offsetHeight + positionOffSet.top + toolHeight;
                    var scrollTop = tObj.treeGrid.getContent().firstElementChild.scrollTop;
                    if (!isNullOrUndefined(droppedTreeGridRowElement)) {
                        rowPositionHeight = droppedTreeGridRowElement.offsetTop - scrollTop;
                    }
                    if (this.parent.enableVirtualization) {
                        rowTop = this.parent.getOffsetRect(droppedTreeGridRowElement).top;
                    }
                    else {
                        rowTop = rowPositionHeight + contentHeight;
                    }
                    var rowBottom = rowTop + this.draggedTreeGridRowHeight;
                    var difference = rowBottom - rowTop;
                    var divide = difference / 3;
                    var topRowSegment = rowTop + divide;
                    var middleRowSegment = topRowSegment + divide;
                    var bottomRowSegment = middleRowSegment + divide;
                    var posy = (event.type === 'mousemove') ? event.pageY : ((!isNullOrUndefined(event['changedTouches'])) ? event['changedTouches'][0].pageY : null);
                    var isTopSegment = posy <= topRowSegment;
                    var isMiddleRowSegment = (posy > topRowSegment && posy <= middleRowSegment);
                    var isBottomRowSegment = (posy > middleRowSegment && posy <= bottomRowSegment);
                    if (isTopSegment || isMiddleRowSegment || isBottomRowSegment) {
                        var rowElement = void 0;
                        if (this.parent.enableVirtualization) {
                            var index = this.parent.treeGrid.getRows().indexOf(droppedTreeGridRowElement);
                            rowElement = this.parent.getRowByIndex(index);
                        }
                        else {
                            rowElement = this.parent.getRowByIndex(parseInt(droppedTreeGridRowElement.getAttribute('aria-rowindex'), 10) - 1);
                        }
                        var rowIndex = getValue('rowIndex', rowElement);
                        var droppedTreeGridRecord = this.parent.flatData[rowIndex];
                        var isValid = true;
                        if (this.parent.viewType === 'ResourceView' && !this.taskBarEditRecord.hasChildRecords && !droppedTreeGridRecord.hasChildRecords &&
                            !isNullOrUndefined(droppedTreeGridRecord.parentItem) &&
                            this.taskBarEditRecord.parentItem.taskId === droppedTreeGridRecord.parentItem.taskId) {
                            isValid = false;
                        }
                        if (droppedTreeGridRecord) {
                            this.ensurePosition([this.taskBarEditRecord], droppedTreeGridRecord);
                        }
                        if (isValid) {
                            if (isTopSegment && this.parent.rowDragAndDropModule['dropPosition'] !== 'Invalid') {
                                this.parent.rowDragAndDropModule['dropPosition'] = 'above';
                                this.removeChildBorder();
                                this.removeErrorElem();
                                this.removetopOrBottomBorder();
                                this.topOrBottomBorder(rowElement);
                            }
                            if (isMiddleRowSegment && this.parent.rowDragAndDropModule['dropPosition'] !== 'Invalid') {
                                this.parent.rowDragAndDropModule['dropPosition'] = 'child';
                                this.removetopOrBottomBorder();
                                this.addRemoveClasses(rowElement.children, true, 'e-childborder');
                            }
                            if (isBottomRowSegment && this.parent.rowDragAndDropModule['dropPosition'] !== 'Invalid') {
                                this.parent.rowDragAndDropModule['dropPosition'] = 'below';
                                this.removetopOrBottomBorder();
                                this.removeErrorElem();
                                this.removeChildBorder();
                                this.removeFirstBorder(droppedTreeGridRowElement);
                                this.topOrBottomBorder(droppedTreeGridRowElement);
                            }
                        }
                    }
                }
            }
            var args_1 = {
                cancel: false,
                requestType: 'taskbarediting',
                taskBarEditAction: this.taskBarEditAction,
                data: this.taskBarEditRecord
            };
            if (this.segmentIndex !== -1) {
                args_1.requestType = 'mergeSegment';
            }
            this.parent.trigger('actionBegin', args_1, function (arg) {
                if (args_1.taskBarEditAction === 'ConnectorPointRightDrag' || args_1.taskBarEditAction === 'ConnectorPointLeftDrag'
                    || args_1.taskBarEditAction === 'LeftResizing' || args_1.taskBarEditAction === 'RightResizing'
                    || args_1.taskBarEditAction === 'ProgressResizing' || args_1.taskBarEditAction === 'ChildDrag' || args_1.taskBarEditAction === 'ParentDrag' ||
                    args_1.taskBarEditAction === 'MilestoneDrag' || args_1.taskBarEditAction === 'ManualParentDrag' || args_1.taskBarEditAction === 'ParentResizing') {
                    _this.parent.showIndicator = false;
                    if (_this.parent.undoRedoModule && _this.parent['isUndoRedoItemPresent']('Edit')) {
                        if (_this.parent.undoRedoModule['redoEnabled']) {
                            _this.parent.undoRedoModule['disableRedo']();
                        }
                        var action = {};
                        if (_this.parent.undoRedoModule['getUndoCollection'].length === 0) {
                            _this.isDragged = true;
                            action['modifiedRecords'] = [];
                            action['action'] = args_1.taskBarEditAction;
                            _this.parent.undoRedoModule['createUndoCollection']();
                            _this.parent.undoRedoModule['getUndoCollection'][_this.parent.undoRedoModule['getUndoCollection'].length - 1] = action;
                            _this.parent.editModule['createArray'] = false;
                            _this.parent.undoRedoModule['changedRecords'] = [];
                        }
                        else if (_this.parent.editModule['createArray']) {
                            _this.isDragged = true;
                            action['modifiedRecords'] = [];
                            action['action'] = args_1.taskBarEditAction;
                            _this.parent.undoRedoModule['createUndoCollection']();
                            _this.parent.undoRedoModule['getUndoCollection'][_this.parent.undoRedoModule['getUndoCollection'].length - 1] = action;
                            _this.parent.editModule['createArray'] = false;
                            _this.parent.undoRedoModule['changedRecords'] = [];
                        }
                    }
                }
                if (!isNullOrUndefined(_this.parent.loadingIndicator) && _this.parent.loadingIndicator.indicatorType === 'Shimmer' && _this.parent.showIndicator) {
                    _this.parent.showMaskRow();
                }
                else if (_this.parent.showIndicator) {
                    _this.parent.showSpinner();
                }
                if (arg.cancel === false) {
                    _this.taskBarEditingAction(event, false);
                }
            });
        }
        else if (!this.parent.isAdaptive && !this.taskBarEditAction) {
            this.updateTaskBarEditElement(event);
        }
    };
    /**
     * Method to update taskbar editing action on mous move.
     *
     * @param {PointerEvent} e .
     * @param {boolean} isMouseClick .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.taskBarEditingAction = function (e, isMouseClick) {
        var _this = this;
        var args = {};
        var recordIndex = this.parent.ganttChartModule.getIndexByTaskBar(this.taskBarEditElement);
        if (this.taskBarEditRecord !== null) {
            args.editingFields = this.taskBarEditRecord.ganttProperties;
            args.data = this.taskBarEditRecord;
            if (this.parent.viewType === 'ResourceView' && args.data.level === 0) {
                return;
            }
            args.recordIndex = recordIndex;
            args.taskBarEditAction = this.taskBarEditAction;
            args.roundOffDuration = this.roundOffDuration;
            args.cancel = false;
            args.previousData = this.previousItem;
            args.segmentIndex = this.segmentIndex;
            this.roundOffDuration = args.roundOffDuration;
            this.targetElement = args.target = closest(e.target, '.e-gantt-child-taskbar');
            this.updateMouseMoveProperties(e);
            if (!this.oldData) {
                this.oldData = extend([], [], [this.taskBarEditRecord], true)[0];
            }
            var segmentIndex = this.segmentIndex !== -1 ? this.segmentIndex : null;
            if (this.taskBarEditAction === 'ProgressResizing') {
                this.mainElement = parentsUntil(this.taskBarEditElement, cls.taskBarMainContainer);
                if (this.taskBarEditRecord.ganttProperties.segments && this.taskBarEditRecord.ganttProperties.segments.length > 0) {
                    segmentIndex = -1;
                    for (var i = 0; i < this.taskBarEditRecord.ganttProperties.segments.length; i++) {
                        var resizeGripper = document.getElementsByClassName('e-child-progress-resizer e-progress-resize-gripper')[0]['style'];
                        var currentWidth = (this.parent.enableRtl ? parseInt(resizeGripper['right'], 10) - 8 : parseInt(resizeGripper['left'], 10) + 8);
                        if (currentWidth < this.taskBarEditRecord.ganttProperties.segments[i].width && i === 0) {
                            segmentIndex = i;
                        }
                        if (this.taskBarEditRecord.ganttProperties.segments[i + 1] &&
                            currentWidth < this.taskBarEditRecord.ganttProperties.segments[i + 1].width +
                                this.taskBarEditRecord.ganttProperties.segments[i + 1].left && currentWidth >
                            this.taskBarEditRecord.ganttProperties.segments[i + 1].left) {
                            segmentIndex = i + 1;
                        }
                    }
                }
                this.performProgressResize(e, segmentIndex);
            }
            else if (this.taskBarEditAction === 'LeftResizing') {
                this.enableLeftResizing(e);
            }
            else if (this.taskBarEditAction === 'RightResizing' || this.taskBarEditAction === 'ParentResizing') {
                this.enableRightResizing(e);
            }
            else if (this.taskBarEditAction === 'ParentDrag' || this.taskBarEditAction === 'ChildDrag' ||
                this.taskBarEditAction === 'MilestoneDrag' || this.taskBarEditAction === 'ManualParentDrag') {
                this.enableDragging(e);
            }
            else if (this.taskBarEditAction === 'ConnectorPointLeftDrag' ||
                this.taskBarEditAction === 'ConnectorPointRightDrag') {
                this.updateConnectorLineSecondProperties(e);
                this.triggerDependencyEvent(e);
                this.drawFalseLine();
            }
            if (this.parent.allowTaskbarDragAndDrop && this.taskBarEditAction !== 'LeftResizing' && this.taskBarEditAction !== 'RightResizing' && this.taskBarEditAction !== 'ProgressResizing') {
                var parentClientRect = this.parent.getOffsetRect(this.parent.chartPane);
                var coordinates = this.getCoordinate(e);
                var position = { top: coordinates.pageY, left: coordinates.pageX };
                var pos = { left: Math.abs(position.left - parentClientRect.left), top: position.top - parentClientRect.top };
                if (this.parent.viewType === 'ResourceView' && this.parent.enableMultiTaskbar) {
                    var parentRecord = this.parent.getRecordByID(this.taskBarEditRecord.parentItem.taskId);
                    if (!this.parent.allowTaskbarOverlap && this.taskBarEditRecord.parentItem && !parentRecord.expanded) {
                        var reduceHeight = 0;
                        if (parseInt(this.editElement['style'].marginTop, 10) > this.parent.rowHeight) {
                            for (var i = 0; i < parentRecord.childRecords.length; i++) {
                                if (parentRecord.childRecords[i].ganttProperties.taskId !==
                                    this.taskBarEditRecord.ganttProperties.taskId) {
                                    reduceHeight = reduceHeight + this.parent.rowHeight;
                                }
                                else {
                                    break;
                                }
                            }
                            pos.top = pos.top - reduceHeight;
                        }
                    }
                }
                this.topValue = pos.top;
                var xValue = void 0;
                if (e.type === 'touchmove' || e.type === 'touchstart' || e.type === 'touchend') {
                    xValue = e['changedTouches'][0].pageX;
                }
                else {
                    xValue = e.pageX;
                }
                if (this.parent.enableRtl) {
                    this.leftValue = pos.left - Math.abs(xValue - (this.parent.getOffsetRect(this.taskBarEditElement).left)) -
                        (this.previousLeftValue !== 0 ? xValue - this.previousLeftValue : 0);
                }
                else {
                    this.leftValue = pos.left - (xValue - this.parent.getOffsetRect(this.taskBarEditElement).left) +
                        (this.previousLeftValue !== 0 ? xValue - this.previousLeftValue : 0);
                }
                if (this.previousLeftValue === 0) {
                    if (!this.parent.enableRtl) {
                        this.leftValue = this.leftValue - this.parent.ganttChartModule.scrollObject.previousScroll.left;
                    }
                    else {
                        this.leftValue = this.leftValue - (this.parent.ganttChartModule.scrollObject.previousScroll.left);
                        if (this.parent.ganttChartModule.scrollObject.previousScroll.left === 0) {
                            this.leftValue = this.leftValue - 60;
                        }
                    }
                }
                this.previousLeftValue = xValue;
            }
            else {
                this.leftValue = this.taskBarEditRecord.ganttProperties.left;
            }
            this.currentSegmentIndex = segmentIndex;
            this.setItemPosition();
            this.updateEditedItem();
            this.tooltipValue = (e.type === 'touchmove' || e.type === 'touchstart' || e.type === 'touchend') ? e['changedTouches'][0].pageX : e.pageX;
            if ((!this.taskBarEditRecord.ganttProperties.segments || segmentIndex !== -1)) {
                this.editTooltip.updateTooltip(segmentIndex);
            }
            if (isMouseClick) {
                this.taskBarEditedAction(e);
            }
            this.parent.trigger('taskbarEditing', args, function (arg) {
                if (arg.cancel && _this.taskBarEditRecord !== null) {
                    _this.tapPointOnFocus = false;
                    merge(_this.taskBarEditRecord.ganttProperties, arg.previousData);
                }
            });
        }
    };
    /**
     * To update property while perform mouse move.
     *
     * @param {PointerEvent} event .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.updateMouseMoveProperties = function (event) {
        var containerPosition = this.parent.getOffsetRect(this.parent.ganttChartModule.chartBodyContainer);
        var e = this.getCoordinate(event);
        var parentWithZoomStyle = this.parent.element.closest('[style*="zoom"]');
        if (parentWithZoomStyle) {
            var zoom1 = parseFloat(getComputedStyle(parentWithZoomStyle).zoom);
            e.pageX = e.pageX / zoom1;
            e.pageY = e.pageY / zoom1;
        }
        if (e.pageX || e.pageY) {
            if (this.parent.enableRtl) {
                this.mouseMoveX = Math.abs(e.pageX - (containerPosition.left +
                    Math.abs(this.parent.ganttChartModule.scrollObject.previousScroll.left)));
            }
            else {
                this.mouseMoveX = e.pageX - containerPosition.left +
                    this.parent.ganttChartModule.scrollObject.previousScroll.left;
            }
            this.tooltipPositionX = this.mouseMoveX;
            this.mouseMoveY = e.pageY - containerPosition.top +
                this.parent.ganttChartModule.scrollObject.previousScroll.top;
        }
        var isConnectorLineEdit = (this.taskBarEditAction === 'ConnectorPointLeftDrag' ||
            this.taskBarEditAction === 'ConnectorPointRightDrag') ?
            true : false;
        if (((this.taskBarEditRecord.ganttProperties.width > 3 || this.taskBarEditRecord.ganttProperties.isMilestone) && !(this.taskBarEditAction === 'ProgressResizing' &&
            (this.taskBarEditRecord.ganttProperties.progress === 0 || this.taskBarEditRecord.ganttProperties.progress === 100))) ||
            isConnectorLineEdit) {
            var mouseX = 0;
            if (this.parent.enableRtl) {
                mouseX = Math.abs(Math.abs(this.mouseMoveX) - Math.abs(this.parent.ganttChartModule.scrollObject.previousScroll.left) +
                    containerPosition.left);
            }
            else {
                mouseX = this.mouseMoveX - this.parent.ganttChartModule.scrollObject.previousScroll.left +
                    containerPosition.left;
            }
            var mouseY = this.mouseMoveY - this.parent.ganttChartModule.scrollObject.previousScroll.top +
                containerPosition.top;
            if ((mouseX + 20) >
                containerPosition.left + this.parent.ganttChartModule.chartBodyContainer.offsetWidth) {
                this.timerCount = this.parent.ganttChartModule.scrollObject.previousScroll.left;
                this.startScrollTimer('right');
            }
            else if ((mouseX + 40) >
                containerPosition.left + this.parent.ganttChartModule.chartBodyContainer.offsetWidth && this.parent.enableRtl &&
                this.parent.ganttChartModule.scrollObject.previousScroll.left === 0) {
                this.parent.ganttChartModule.scrollObject.previousScroll.left = -1;
                this.timerCount = this.parent.ganttChartModule.scrollObject.previousScroll.left;
                this.startScrollTimer('right');
            }
            else if ((mouseX - 20) < containerPosition.left) {
                this.timerCount = this.parent.ganttChartModule.scrollObject.previousScroll.left;
                this.startScrollTimer('left');
            }
            else if (((mouseY + 80) >
                containerPosition.top + this.parent.ganttChartModule.chartBodyContainer.offsetHeight)) {
                this.timerCount = this.parent.ganttChartModule.scrollObject.previousScroll.top;
                this.startScrollTimer('bottom');
            }
            else if (((mouseY - 20) < containerPosition.top)) {
                this.timerCount = this.parent.ganttChartModule.scrollObject.previousScroll.top;
                this.startScrollTimer('top');
            }
            else {
                this.stopScrollTimer();
            }
        }
        else {
            this.stopScrollTimer();
        }
    };
    /**
     * To start the scroll timer.
     *
     * @param {string} direction .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.startScrollTimer = function (direction) {
        var _this = this;
        this.stopScrollTimer();
        var leftSign = 0;
        this.scrollTimer = window.setInterval(function () {
            if (Math.sign(_this.timerCount) === -1) {
                leftSign = -1;
                _this.timerCount = Math.abs(_this.timerCount);
            }
            if (direction === 'right') {
                var timelineWidth = _this.parent.enableTimelineVirtualization ?
                    _this.parent.timelineModule.wholeTimelineWidth : _this.parent.timelineModule.totalTimelineWidth;
                _this.timerCount = (_this.timerCount + 1) >= timelineWidth ?
                    timelineWidth : (_this.timerCount + 1);
            }
            else if (direction === 'bottom') {
                _this.timerCount = _this.timerCount + 1;
            }
            else {
                _this.timerCount = (_this.timerCount - 1) < 0 ? 0 : (_this.timerCount - 1);
            }
            if (direction === 'bottom' || direction === 'top') {
                _this.parent.ganttChartModule.scrollObject.setScrollTop(_this.timerCount);
            }
            else {
                _this.parent.ganttChartModule.scrollObject.setScrollLeft(_this.timerCount, leftSign);
            }
            if (_this.taskBarEditAction === 'ConnectorPointLeftDrag'
                || _this.taskBarEditAction === 'ConnectorPointRightDrag') {
                _this.drawFalseLine();
            }
        }, 0);
    };
    /**
     * To stop the scroll timer.
     *
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.stopScrollTimer = function () {
        window.clearInterval(this.scrollTimer);
        this.scrollTimer = null;
    };
    /**
     * To update left and width while perform taskbar drag operation.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    // eslint-disable-next-line
    TaskbarEdit.prototype.enableDragging = function (e) {
        var item = this.taskBarEditRecord.ganttProperties;
        var timelineWidth = this.parent.enableTimelineVirtualization ?
            this.parent.timelineModule.wholeTimelineWidth : this.parent.timelineModule.totalTimelineWidth;
        var differenceWidth = 0;
        if (this.taskBarEditElement.classList.contains('e-segmented-taskbar') &&
            !this.taskBarEditElement.classList.contains('e-segment-first')) {
            var segments = this.taskBarEditRecord.ganttProperties.segments.map(function (e) { return (__assign({}, e)); });
            var segment = segments[this.segmentIndex];
            if (this.mouseDownX > this.mouseMoveX) {
                differenceWidth = isNullOrUndefined(this.previousMouseMove) ?
                    (this.mouseDownX - this.mouseMoveX) : (this.previousMouseMove - this.mouseMoveX);
                this.previousMouseMove = this.mouseMoveX;
                segment.left = segment.left - differenceWidth;
            }
            else {
                differenceWidth = isNullOrUndefined(this.previousMouseMove) ?
                    (this.mouseMoveX - this.mouseDownX) : (this.mouseMoveX - this.previousMouseMove);
                this.previousMouseMove = this.mouseMoveX;
                segment.left = segment.left + differenceWidth;
            }
            var previousSegment = segments[this.segmentIndex - 1];
            var nextSegment = segments[this.segmentIndex + 1];
            var left = void 0;
            if (this.taskBarEditElement.classList.contains('e-segment-inprogress')) {
                left = segment.left < (previousSegment.left + previousSegment.width) ? (previousSegment.left + previousSegment.width) :
                    ((segment.width + segment.left) > (nextSegment.left)) ? nextSegment.left - segment.width : segment.left;
            }
            else {
                left = segment.left < (previousSegment.left + previousSegment.width) ? (previousSegment.left + previousSegment.width) :
                    (item.left + segment.width + segment.left) >= timelineWidth ?
                        (timelineWidth - segment.width) : segment.left;
            }
            segment.left = left;
            this.parent.setRecordValue('segments', segments, item, true);
            this.parent.dataOperation.updateMappingData(this.taskBarEditRecord, 'segments');
        }
        else {
            if (this.mouseDownX > this.mouseMoveX) {
                differenceWidth = this.mouseDownX - this.mouseMoveX;
                if (differenceWidth > 0) {
                    this.parent.setRecordValue('left', this.previousItem.left - differenceWidth, item, true);
                }
            }
            else {
                differenceWidth = this.mouseMoveX - this.mouseDownX;
                this.parent.setRecordValue('left', this.previousItem.left + differenceWidth, item, true);
            }
            var left = item.left < 0 ? 0 : (item.left + item.width) >= timelineWidth ?
                (timelineWidth - item.width) : item.left;
            this.parent.setRecordValue('left', left, item, true);
        }
    };
    // eslint-disable-next-line
    TaskbarEdit.prototype.validateProgressWidth = function (item, progressWidth, totalTaskWidth) {
        var reduceWidth = 0;
        if (this.currentSegmentIndex !== -1 && item.segments) {
            var startIndex = this.currentSegmentIndex >= this.segmentIndex ? 0 : this.currentSegmentIndex !== 0 ?
                this.currentSegmentIndex : -1;
            var endIndex = this.currentSegmentIndex >= this.segmentIndex ? this.currentSegmentIndex : this.segmentIndex;
            if (startIndex !== -1) {
                for (var i = startIndex; i < endIndex; i++) {
                    reduceWidth = (item.segments[i + 1].left) - (item.segments[i].left + item.segments[i].width);
                    progressWidth = progressWidth - reduceWidth;
                }
            }
        }
        var totalWidth = 0;
        if (item.segments && item.segments.length > 0) {
            totalTaskWidth = this.splitTasksDuration(item.segments) * this.parent.perDayWidth;
            totalWidth = item.segments.reduce(function (width, segment) {
                return width + segment.width;
            }, 0);
            totalTaskWidth = totalWidth;
        }
        if (progressWidth > totalTaskWidth) {
            progressWidth = totalTaskWidth;
        }
        return { progressWidth: progressWidth, totalTaskWidth: totalTaskWidth };
    };
    /**
     * To update left and width while perform progress resize operation.
     *
     * @param {PointerEvent} e .
     * @param {number} segmentIndex .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.performProgressResize = function (e, segmentIndex) {
        var item = this.taskBarEditRecord.ganttProperties;
        var diffrenceWidth = 0;
        var prevProgress = item.progressWidth;
        if (this.mouseDownX > this.mouseMoveX) {
            if (this.mouseMoveX > item.left &&
                (this.mouseMoveX < (item.left + item.width)) && item.left > 0) {
                diffrenceWidth = this.mouseMoveX - item.left;
                this.parent.setRecordValue('progressWidth', diffrenceWidth, item, true);
            }
            else {
                if (this.mouseMoveX >= (item.left + item.width)) {
                    this.parent.setRecordValue('progressWidth', item.width, item, true);
                }
                else {
                    this.parent.setRecordValue('progressWidth', 0, item, true);
                }
            }
        }
        else {
            if (this.mouseMoveX > item.left &&
                (this.mouseMoveX < (item.left + item.width))) {
                diffrenceWidth = this.mouseMoveX - item.left;
                this.parent.setRecordValue('progressWidth', diffrenceWidth, item, true);
            }
            else {
                if (this.mouseMoveX <= item.left) {
                    this.parent.setRecordValue('progressWidth', 0, item, true);
                }
                else {
                    this.parent.setRecordValue('progressWidth', item.width, item, true);
                }
            }
        }
        var widthValue = item.progressWidth > item.width ?
            item.width : item.progressWidth;
        widthValue = item.progressWidth < 0 ? 0 : item.progressWidth;
        if (segmentIndex !== -1 || !segmentIndex) {
            this.parent.setRecordValue('progressWidth', widthValue, item, true);
        }
        else {
            this.parent.setRecordValue('progressWidth', prevProgress, item, true);
        }
        this.progressValue = widthValue;
        var diff = item.width - item.progressWidth;
        if (diff <= 4) {
            this.progressBorderRadius = 4 - diff;
        }
        else {
            this.progressBorderRadius = 0;
        }
    };
    /**
     * To update left and width while perform taskbar left resize operation.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.enableLeftResizing = function (e) {
        var item = this.taskBarEditRecord.ganttProperties;
        var differenceWidth = 0;
        if (this.taskBarEditElement.classList.contains('e-segmented-taskbar') && item.segments.length > 1) {
            this.enableSplitTaskLeftResize(item);
        }
        else {
            if (this.mouseDownX > this.mouseMoveX) {
                if (this.mouseMoveX < (item.left + item.width)) {
                    differenceWidth = this.mouseDownX - this.mouseMoveX;
                    if (item.left > 0) {
                        this.parent.setRecordValue('left', this.previousItem.left - differenceWidth, item, true);
                        this.parent.setRecordValue('width', this.previousItem.width + differenceWidth, item, true);
                    }
                }
                else {
                    if (this.mouseMoveX > (item.left + item.width)) {
                        differenceWidth = this.mouseDownX - this.mouseMoveX;
                        this.parent.setRecordValue('left', this.previousItem.left - differenceWidth, item, true);
                        this.parent.setRecordValue('width', 3, item, true);
                    }
                }
            }
            else {
                if (this.mouseMoveX < (item.left + item.width)) {
                    differenceWidth = this.mouseMoveX - this.mouseDownX;
                    if ((item.left) < (item.left + item.width) &&
                        ((this.previousItem.left + differenceWidth) <= (this.previousItem.left + this.previousItem.width))) {
                        this.parent.setRecordValue('left', this.previousItem.left + differenceWidth, item, true);
                        this.parent.setRecordValue('width', this.previousItem.width - differenceWidth, item, true);
                    }
                }
                else {
                    differenceWidth = this.mouseMoveX - this.mouseDownX;
                    this.parent.setRecordValue('left', this.previousItem.left + differenceWidth, item, true);
                    this.parent.setRecordValue('width', 3, item, true);
                }
            }
            if (item.segments && item.segments.length === 1) {
                item.segments[0].width = item.width;
            }
            this.updateEditPosition(e, item);
            this.parent.setRecordValue('left', (this.previousItem.left + this.previousItem.width - item.width), item, true);
        }
    };
    TaskbarEdit.prototype.enableSplitTaskLeftResize = function (item) {
        var segments = this.taskBarEditRecord.ganttProperties.segments.map(function (e) { return (__assign({}, e)); });
        var segment = segments[this.segmentIndex];
        var differenceWidth = 0;
        //when decrease the left and increase the width
        if (this.mouseDownX > this.mouseMoveX) {
            if (this.mouseMoveX < (item.left + segment.width + segment.left)) {
                differenceWidth = isNullOrUndefined(this.previousMouseMove) ?
                    (this.mouseDownX - this.mouseMoveX) : (this.previousMouseMove - this.mouseMoveX);
                this.previousMouseMove = this.mouseMoveX;
                // when resize other than 0th segment
                if (segment.left > 0) {
                    segment.left = segment.left - differenceWidth;
                    segment.width = segment.width + differenceWidth;
                    if (this.segmentIndex !== 0) {
                        var previousSegment = segments[this.segmentIndex - 1];
                        if ((item.left + segment.left) < (item.left + previousSegment.left + previousSegment.width)) {
                            var difference = (item.left + previousSegment.left + previousSegment.width) - (item.left + segment.left);
                            segment.width -= difference;
                            segment.left = segment.left + difference;
                        }
                    }
                }
                else if (segment.left <= 0 && this.segmentIndex === 0) {
                    this.parent.setRecordValue('left', item.left - differenceWidth, item, true);
                    this.parent.setRecordValue('width', item.width + differenceWidth, item, true);
                    segment.width = segment.width + differenceWidth;
                    for (var i = 1; i < item.segments.length; i++) {
                        var segment_1 = segments[i];
                        segment_1.left = segment_1.left + differenceWidth;
                    }
                }
            }
            else {
                if (this.mouseMoveX > (item.left + segment.width + segment.left)) {
                    differenceWidth = isNullOrUndefined(this.previousMouseMove) ?
                        (this.mouseDownX - this.mouseMoveX) : (this.previousMouseMove - this.mouseMoveX);
                    this.previousMouseMove = this.mouseMoveX;
                    segment.left = segment.left - differenceWidth;
                    segment.width = this.parent.perDayWidth;
                }
            }
        }
        else {
            // when increase left value and decrease width of segment
            if (this.mouseMoveX < (item.left + segment.width + segment.left - this.parent.perDayWidth)) {
                differenceWidth = isNullOrUndefined(this.previousMouseMove) ?
                    (this.mouseMoveX - this.mouseDownX) : (this.mouseMoveX - this.previousMouseMove);
                this.previousMouseMove = this.mouseMoveX;
                // when decrease the first segment width
                if (this.segmentIndex === 0 && segment.left <= 0) {
                    this.parent.setRecordValue('left', item.left + differenceWidth, item, true);
                    this.parent.setRecordValue('width', item.width - differenceWidth, item, true);
                    segment.width = segment.width - differenceWidth;
                    for (var i = 1; i < item.segments.length; i++) {
                        var segment_2 = segments[i];
                        segment_2.left = segment_2.left - differenceWidth;
                    }
                    // when decrease remaining segments
                }
                else if ((segment.left) < (segment.left + segment.width) &&
                    ((segment.left + differenceWidth) <= (segment.left + segment.width))) {
                    segment.left = segment.left + differenceWidth;
                    segment.width = segment.width - differenceWidth;
                }
                // when mouse move goes beyond one day width of task bar.
            }
            else {
                if (this.mouseMoveX < (item.left + segment.left + segment.width)) {
                    if (segment.width > this.parent.perDayWidth) {
                        differenceWidth = isNullOrUndefined(this.previousMouseMove) ?
                            (this.mouseMoveX - this.mouseDownX) : (this.mouseMoveX - this.previousMouseMove);
                        this.previousMouseMove = this.mouseMoveX;
                        var singleDayDifference = (segment.width - differenceWidth) < this.parent.perDayWidth ?
                            this.parent.perDayWidth > segment.width ?
                                this.parent.perDayWidth - segment.width : segment.width - this.parent.perDayWidth : 0;
                        differenceWidth -= singleDayDifference;
                        if (this.segmentIndex === 0) {
                            this.parent.setRecordValue('width', item.width - differenceWidth, item, true);
                            this.parent.setRecordValue('left', item.left + differenceWidth, item, true);
                            segment.width = segment.width - differenceWidth;
                            for (var i = 1; i < item.segments.length; i++) {
                                var segment_3 = segments[i];
                                segment_3.left = segment_3.left - differenceWidth;
                            }
                        }
                        else {
                            segment.left = segment.left + differenceWidth;
                            segment.width = segment.width - differenceWidth;
                        }
                    }
                }
            }
        }
        this.parent.setRecordValue('segments', segments, item, true);
        this.parent.dataOperation.updateMappingData(this.taskBarEditRecord, 'segments');
    };
    /**
     * Update mouse position and edited item value
     *
     * @param {PointerEvent} e .
     * @param {ITaskData} item .
     * @returns {void} .
     */
    TaskbarEdit.prototype.updateEditPosition = function (e, item) {
        this.updateIsMilestone(item);
        this.parent.setRecordValue('progressWidth', this.parent.dataOperation.getProgressWidth(item.width, item.progress), item, true);
    };
    /**
     *  To update milestone property.
     *
     * @param {ITaskData} item .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.updateIsMilestone = function (item) {
        if (item.width <= 3) {
            this.parent.setRecordValue('width', 3, item, true);
            this.parent.setRecordValue('isMilestone', true, item, true);
            if (!isNullOrUndefined(this.taskBarEditRecord[this.parent.taskFields.milestone])) {
                this.parent.setRecordValue(this.parent.taskFields.milestone, true, this.taskBarEditRecord, true);
            }
        }
        else {
            this.parent.setRecordValue('width', item.width, item, true);
            this.parent.setRecordValue('isMilestone', false, item, true);
            if (!isNullOrUndefined(this.taskBarEditRecord[this.parent.taskFields.milestone])) {
                this.parent.setRecordValue(this.parent.taskFields.milestone, false, this.taskBarEditRecord, true);
            }
        }
    };
    /**
     * To update left and width while perform taskbar right resize operation.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.enableRightResizing = function (e) {
        var item = this.taskBarEditRecord.ganttProperties;
        var differenceWidth = 0;
        if (this.taskBarEditElement.classList.contains('e-segmented-taskbar') && item.segments.length > 1) {
            var segments = this.taskBarEditRecord.ganttProperties.segments.map(function (e) { return (__assign({}, e)); });
            var segment = segments[this.segmentIndex];
            if (this.mouseDownX > this.mouseMoveX) {
                if (this.mouseMoveX > (item.left + segment.left) && (this.mouseDownX - this.mouseMoveX) > 3) {
                    differenceWidth = isNullOrUndefined(this.previousMouseMove) ?
                        (this.mouseDownX - this.mouseMoveX) : (this.previousMouseMove - this.mouseMoveX);
                    this.previousMouseMove = this.mouseMoveX;
                    segment.width = segment.width - differenceWidth;
                }
                else {
                    if (this.mouseMoveX < (item.left + segment.left)) {
                        var segmentWidth = (this.parent.timelineModule.isSingleTier &&
                            (this.parent.timelineModule.customTimelineSettings.bottomTier.unit === 'Hour' ||
                                this.parent.timelineModule.customTimelineSettings.topTier.unit === 'Hour' ||
                                this.parent.timelineModule.customTimelineSettings.bottomTier.unit === 'Minutes' ||
                                this.parent.timelineModule.customTimelineSettings.topTier.unit === 'Minutes')) ||
                            (this.parent.timelineModule.customTimelineSettings.bottomTier.unit === 'Hour' ||
                                this.parent.timelineModule.customTimelineSettings.bottomTier.unit === 'Minutes') ?
                            this.parent.timelineModule.customTimelineSettings.timelineUnitSize :
                            this.parent.perDayWidth;
                        segment.width = segmentWidth;
                    }
                }
            }
            else {
                if (this.mouseMoveX > segment.left) {
                    differenceWidth = isNullOrUndefined(this.previousMouseMove) ?
                        (this.mouseMoveX - this.mouseDownX) : (this.mouseMoveX - this.previousMouseMove);
                    this.previousMouseMove = this.mouseMoveX;
                    segment.width = segment.width + differenceWidth;
                }
            }
            var width = void 0;
            var nextSegment = this.segmentIndex !== segments.length - 1 ? segments[this.segmentIndex + 1] : null;
            if (!isNullOrUndefined(nextSegment)) {
                if (!this.taskBarEditElement.classList.contains('e-segment-last')) {
                    width = (segment.left + segment.width) > nextSegment.left ? (nextSegment.left - segment.left) : segment.width;
                }
                segment.width = width;
            }
            if (this.segmentIndex === item.segments.length - 1) {
                if (this.segmentIndex === 0) {
                    this.parent.setRecordValue('width', segment.width, item, true);
                }
            }
            this.parent.setRecordValue('segments', segments, item, true);
            this.parent.dataOperation.updateMappingData(this.taskBarEditRecord, 'segments');
        }
        else {
            if (this.mouseDownX > this.mouseMoveX) {
                if (this.mouseMoveX > item.left && (this.mouseDownX - this.mouseMoveX) > 3) {
                    differenceWidth = this.mouseDownX - this.mouseMoveX;
                    this.parent.setRecordValue('width', this.previousItem.width - differenceWidth, item, true);
                }
                else {
                    if (this.mouseMoveX < item.left) {
                        this.parent.setRecordValue('width', 3, item, true);
                    }
                }
            }
            else {
                if (this.mouseMoveX > item.left) {
                    differenceWidth = this.mouseMoveX - this.mouseDownX;
                    this.parent.setRecordValue('width', this.previousItem.width + differenceWidth, item, true);
                }
            }
            if (item.segments && item.segments.length === 1) {
                item.segments[0].width = item.width;
            }
            this.updateEditPosition(e, item);
        }
    };
    /**
     * To updated startDate and endDate while perform taskbar edit operation.
     *
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.updateEditedItem = function () {
        var item = this.taskBarEditRecord.ganttProperties;
        var left;
        var projectStartDate;
        var endDate;
        var startDate;
        switch (this.taskBarEditAction) {
            case 'ProgressResizing':
                {
                    var progressWidth = item.progressWidth;
                    var totalTaskWidth = item.width;
                    var updatedValues = this.validateProgressWidth(item, progressWidth, totalTaskWidth);
                    this.parent.setRecordValue('progress', this.getProgressPercent(updatedValues.totalTaskWidth, updatedValues.progressWidth), item, true);
                    break;
                }
            case 'LeftResizing':
                if (this.segmentIndex === -1) {
                    left = this.getRoundOffStartLeft(item, this.roundOffDuration);
                    projectStartDate = this.getDateByLeft(left);
                    if (isNullOrUndefined(item.endDate)) {
                        endDate = this.parent.dateValidationModule.getValidEndDate(item);
                        this.parent.setRecordValue('endDate', endDate, item, true);
                    }
                    startDate = this.parent.dateValidationModule.checkStartDate(projectStartDate, item, null);
                    this.parent.setRecordValue('startDate', new Date(startDate.getTime()), item, true);
                    if (this.parent.dateValidationModule.compareDates(item.startDate, item.endDate) === 0
                        && isNullOrUndefined(item.isMilestone) && item.isMilestone === false && item.duration === 0) {
                        this.parent.setRecordValue('duration', 1, item, true);
                    }
                    if (item.isMilestone) {
                        this.parent.setRecordValue('endDate', new Date(startDate.getTime()), item, true);
                    }
                    this.parent.dateValidationModule.calculateDuration(this.taskBarEditRecord);
                    this.parent.editModule.updateResourceRelatedFields(this.taskBarEditRecord, 'duration');
                }
                else {
                    this.updateSplitLeftResize(item);
                }
                break;
            case 'RightResizing':
            case 'ParentResizing':
                if (this.segmentIndex === -1) {
                    left = this.getRoundOffEndLeft(item, this.roundOffDuration);
                    var tempEndDate = this.getDateByLeft(left);
                    if (isNullOrUndefined(item.startDate)) {
                        startDate = this.parent.dateValidationModule.getValidStartDate(item);
                        this.parent.setRecordValue('startDate', startDate, item, true);
                    }
                    var tempdate = isNullOrUndefined(item.startDate) ? startDate : item.startDate;
                    endDate = item.isMilestone ? tempdate :
                        this.parent.dateValidationModule.checkEndDate(tempEndDate, this.taskBarEditRecord.ganttProperties);
                    this.parent.setRecordValue('endDate', new Date(endDate.getTime()), item, true);
                    this.parent.dateValidationModule.calculateDuration(this.taskBarEditRecord);
                    this.parent.editModule.updateResourceRelatedFields(this.taskBarEditRecord, 'duration');
                }
                else {
                    this.updateSplitRightResizing(item);
                }
                break;
            case 'ParentDrag':
            case 'ChildDrag':
            case 'MilestoneDrag':
            case 'ManualParentDrag':
                if (this.segmentIndex === -1 || this.segmentIndex === 0 || (this.segmentIndex !== -1 && this.parent.allowTaskbarDragAndDrop)) {
                    this.updateChildDrag(item);
                }
                else {
                    this.setSplitTaskDrag(item);
                }
                break;
        }
        if (!isNullOrUndefined(this.taskBarEditRecord.ganttProperties.segments)) {
            this.parent.chartRowsModule.updateSegment(this.taskBarEditRecord.ganttProperties.segments, this.taskBarEditRecord.ganttProperties.taskId);
        }
    };
    TaskbarEdit.prototype.updateChildDrag = function (item) {
        var left = this.getRoundOffStartLeft(item, this.roundOffDuration);
        var projectStartDate = this.getDateByLeft(left, item.isMilestone, item);
        var endDate;
        if (this.segmentIndex === 0) {
            this.parent.setRecordValue('startDate', this.parent.dateValidationModule.checkStartDate(projectStartDate, item, null), item, true);
            item.segments[0].startDate = projectStartDate;
            item.segments[0].endDate = this.parent.dataOperation.getEndDate(item.segments[0].startDate, item.segments[0].duration, item.durationUnit, item, false);
            this.parent.setRecordValue('segments', item.segments, item, true);
            this.parent.dataOperation.updateMappingData(this.taskBarEditRecord, 'segments');
            this.parent.chartRowsModule.incrementSegments(item.segments, 0, this.taskBarEditRecord);
            this.parent.setRecordValue('endDate', item.segments[item.segments.length - 1].endDate, item, true);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.segments, item.segments, this.taskBarEditRecord, true);
        }
        else {
            if (!isNullOrUndefined(item.endDate) && isNullOrUndefined(item.startDate)) {
                endDate = this.parent.dateValidationModule.checkStartDate(projectStartDate, item, null);
                endDate = this.parent.dateValidationModule.checkEndDate(endDate, this.taskBarEditRecord.ganttProperties);
                this.parent.setRecordValue('endDate', endDate, item, true);
            }
            else {
                this.parent.setRecordValue('startDate', this.parent.dateValidationModule.checkStartDate(projectStartDate, item, null), item, true);
                if (!isNullOrUndefined(item.duration)) {
                    this.parent.dateValidationModule.calculateEndDate(this.taskBarEditRecord);
                }
            }
        }
    };
    TaskbarEdit.prototype.updateSplitLeftResize = function (item) {
        var segment = item.segments[this.segmentIndex];
        var left = this.segmentIndex === 0 ? this.getRoundOffStartLeft(item, this.roundOffDuration) :
            this.getRoundOffStartLeft(segment, this.roundOffDuration);
        var projectStartDate = this.getDateByLeft(left);
        var startDate = this.parent.dataOperation.checkStartDate(projectStartDate, item, false);
        var duration = this.parent.dataOperation.getDuration(startDate, segment.endDate, item.durationUnit, item.isAutoSchedule, item.isMilestone);
        segment.startDate = new Date(startDate.getTime());
        segment.duration = duration;
        this.parent.setRecordValue('duration', this.sumOfDuration(item.segments), item, true);
        if (this.segmentIndex === 0) {
            this.parent.setRecordValue('startDate', segment.startDate, item, true);
        }
        this.parent.editModule.updateResourceRelatedFields(this.taskBarEditRecord, 'duration');
        if (!isNullOrUndefined(item.segments[this.segmentIndex - 1])) {
            var segmentOffsetDuration = this.parent.dataOperation.getDuration(item.segments[this.segmentIndex - 1].endDate, item.segments[this.segmentIndex].startDate, item.durationUnit, item.isAutoSchedule, item.isMilestone);
            segment.offsetDuration = segmentOffsetDuration;
        }
        this.parent.setRecordValue('segments', item.segments, item, true);
        this.parent.dataOperation.updateMappingData(this.taskBarEditRecord, 'segments');
    };
    TaskbarEdit.prototype.updateSplitRightResizing = function (item) {
        var segment = item.segments[this.segmentIndex];
        var left = this.getRoundOffEndLeft(item, this.roundOffDuration);
        var tempEndDate = this.getDateByLeft(left);
        var endDate = this.parent.dataOperation.checkEndDate(tempEndDate, item, false);
        var duration = this.parent.dataOperation.getDuration(segment.startDate, endDate, item.durationUnit, item.isAutoSchedule, item.isMilestone);
        segment.endDate = new Date(endDate.getTime());
        segment.duration = duration;
        // update next segment offset duration
        if (!isNullOrUndefined(item.segments[this.segmentIndex + 1])) {
            var nextSegment = item.segments[this.segmentIndex + 1];
            var segmentOffset = this.parent.dataOperation.getDuration(item.segments[this.segmentIndex].endDate, nextSegment.startDate, item.durationUnit, item.isAutoSchedule, item.isMilestone);
            segment.offsetDuration = segmentOffset;
        }
        this.parent.setRecordValue('segments', item.segments, item, true);
        this.parent.dataOperation.updateMappingData(this.taskBarEditRecord, 'segments');
        this.parent.setRecordValue('duration', this.sumOfDuration(item.segments), item, true);
        this.parent.setRecordValue('endDate', item.segments[item.segments.length - 1].endDate, item, true);
        this.parent.editModule.updateResourceRelatedFields(this.taskBarEditRecord, 'duration');
    };
    TaskbarEdit.prototype.sumOfDuration = function (segments) {
        var duration = 0;
        for (var i = 0; i < segments.length; i++) {
            var segment = segments[i];
            duration += segment.duration;
        }
        return duration;
    };
    TaskbarEdit.prototype.setSplitTaskDrag = function (item) {
        var segment = item.segments[this.segmentIndex];
        var left = this.getRoundOffStartLeft(segment, this.roundOffDuration);
        var projectStartDate = this.getDateByLeft(left);
        projectStartDate = this.parent.dateValidationModule.checkStartDate(projectStartDate, item, null);
        segment.startDate = projectStartDate;
        var segmentDate = this.parent.dataOperation.getEndDate(segment.startDate, segment.duration, item.durationUnit, item, false);
        if (item.segments[this.segmentIndex + 1] && segmentDate.getTime() > item.segments[this.segmentIndex + 1].startDate.getTime()) {
            segment.endDate = item.segments[this.segmentIndex + 1].startDate;
        }
        else {
            segment.endDate = segmentDate;
        }
        segment.duration = this.parent.dataOperation.getDuration(segment.startDate, segment.endDate, item.durationUnit, item.isAutoSchedule, item.isMilestone);
        this.parent.setRecordValue('duration', this.sumOfDuration(item.segments), item, true);
        this.parent.setRecordValue('endDate', item.segments[item.segments.length - 1].endDate, item, true);
        if (!isNullOrUndefined(this.parent.taskFields.endDate)) {
            this.parent.dataOperation.updateMappingData(this.taskBarEditRecord, 'endDate');
        }
        //set offset if previous record present
        if (!isNullOrUndefined(item.segments[this.segmentIndex - 1])) {
            var offsetDuration = this.parent.dataOperation.getDuration(item.segments[this.segmentIndex - 1].endDate, item.segments[this.segmentIndex].startDate, item.durationUnit, item.isAutoSchedule, item.isMilestone);
            if (segment.startDate.getDay() === 1 && offsetDuration === 0 && !this.parent.includeWeekend) {
                offsetDuration = 1;
            }
            segment.offsetDuration = offsetDuration;
        }
        //set next record  offset if present
        if (!isNullOrUndefined(item.segments[this.segmentIndex + 1])) {
            var nextSegment = item.segments[this.segmentIndex + 1];
            var offsetDuration = this.parent.dataOperation.getDuration(item.segments[this.segmentIndex].endDate, nextSegment.startDate, item.durationUnit, item.isAutoSchedule, item.isMilestone);
            if (nextSegment.startDate.getDay() === 1 && offsetDuration === 0 && !this.parent.includeWeekend) {
                offsetDuration = 1;
            }
            nextSegment.offsetDuration = offsetDuration;
        }
        this.parent.setRecordValue('segments', item.segments, item, true);
        this.parent.dataOperation.updateMappingData(this.taskBarEditRecord, 'segments');
    };
    /**
     * To get roundoff enddate.
     *
     * @param {ITaskData} ganttRecord .
     * @param {boolean} isRoundOff .
     * @returns {number} .
     * @private
     */
    TaskbarEdit.prototype.getRoundOffEndLeft = function (ganttRecord, isRoundOff) {
        var tierMode = this.parent.timelineModule.bottomTier !== 'None' ? this.parent.timelineModule.bottomTier :
            this.parent.timelineModule.topTier;
        var totalLeft = ganttRecord.width + ganttRecord.left;
        if (this.segmentIndex !== -1 && ganttRecord.segments.length > 1) {
            var segment = ganttRecord.segments[this.segmentIndex];
            totalLeft = totalLeft - ganttRecord.width + segment.width + segment.left;
        }
        var remainingContribution = (1 / (this.parent.timelineModule.getIncrement(this.getDateByLeft(totalLeft), 1, 'Day') / (1000 * 60 * 60 * 24)));
        var remainingLeft = this.parent.perDayWidth - (this.parent.perDayWidth / remainingContribution);
        var positionValue = remainingLeft / this.parent.perDayWidth;
        if (isRoundOff === undefined) {
            isRoundOff = false;
        }
        /*Rounding the decimal value for week-month-year schedule mode*/
        if (!isRoundOff) {
            if ((tierMode !== 'Hour' && tierMode !== 'Minutes')) {
                if (positionValue > 0.5) {
                    totalLeft = totalLeft - remainingLeft + this.parent.perDayWidth;
                }
                else if (positionValue < 0.5) {
                    totalLeft = (totalLeft - remainingLeft) + (this.parent.perDayWidth / 2);
                }
            }
        }
        else if (isRoundOff) {
            if (tierMode === 'Hour') {
                var inHour = (this.parent.perDayWidth / 24);
                remainingContribution =
                    (1 / (this.parent.timelineModule.getIncrement(this.getDateByLeft(totalLeft), 1, 'Hour') / (1000 * 60 * 60)));
                remainingLeft = (this.parent.perDayWidth / 24) - ((this.parent.perDayWidth / 24) / remainingContribution);
                if (remainingLeft !== 0) {
                    totalLeft = (totalLeft - remainingLeft) + inHour;
                }
            }
            else if (tierMode === 'Minutes') {
                var inMinutes = (this.parent.perDayWidth / (24 * 60));
                remainingContribution =
                    (1 / (this.parent.timelineModule.getIncrement(this.getDateByLeft(totalLeft), 1, 'Minutes') / (1000 * 60)));
                remainingLeft = (this.parent.perDayWidth / (24 * 60)) - ((this.parent.perDayWidth / (24 * 60)) / remainingContribution);
                if (remainingLeft !== 0) {
                    totalLeft = (totalLeft - remainingLeft) + inMinutes;
                }
            }
            else {
                if (remainingLeft !== 0) {
                    totalLeft = (totalLeft - remainingLeft) + this.parent.perDayWidth;
                }
            }
        }
        return totalLeft;
    };
    /**
     * To get roundoff startdate.
     *
     * @param {ITaskData | ITaskSegment} ganttRecord .
     * @param {boolean} isRoundOff .
     * @returns {number} .
     * @private
     */
    TaskbarEdit.prototype.getRoundOffStartLeft = function (ganttRecord, isRoundOff) {
        var left = isNullOrUndefined(ganttRecord) ? ganttRecord.left
            : ganttRecord.left;
        if (this.segmentIndex !== -1 && isNullOrUndefined(ganttRecord.segments)) {
            left = ganttRecord.left + this.taskBarEditRecord.ganttProperties.left;
        }
        var tierMode = this.parent.timelineModule.bottomTier !== 'None' ? this.parent.timelineModule.bottomTier :
            this.parent.timelineModule.topTier;
        var remainingContribution = (1 / (this.parent.timelineModule.getIncrement(this.getDateByLeft(left, isNullOrUndefined(ganttRecord) ? ganttRecord.isMilestone : null, ganttRecord), 1, 'Day') / (1000 * 60 * 60 * 24)));
        var remainDays = this.parent.perDayWidth - (this.parent.perDayWidth / remainingContribution);
        var remainDaysInDecimal = remainDays / this.parent.perDayWidth;
        if (isRoundOff === undefined) {
            isRoundOff = false;
        }
        /*Rounding the decimal value for week-month-year schedule mode*/
        if (!isRoundOff) {
            if ((tierMode !== 'Hour' && tierMode !== 'Minutes')) {
                if (remainDaysInDecimal <= 0.5) {
                    left = left - remainDays;
                }
                else if (remainDaysInDecimal > 0.5) {
                    left = (left - remainDays) + this.parent.perDayWidth / 2;
                }
            }
        }
        else if (isRoundOff) {
            if (tierMode === 'Hour') {
                remainingContribution =
                    (1 / (this.parent.timelineModule.getIncrement(this.getDateByLeft(left), 1, 'Hour') / (1000 * 60 * 60)));
                remainDays = (this.parent.perDayWidth / 24) - ((this.parent.perDayWidth / 24) / remainingContribution);
                left = left - remainDays;
            }
            else if (tierMode === 'Minutes') {
                remainingContribution =
                    (1 / (this.parent.timelineModule.getIncrement(this.getDateByLeft(left), 1, 'Minutes') / (1000 * 60)));
                remainDays = (this.parent.perDayWidth / (24 * 60)) - ((this.parent.perDayWidth / (24 * 60)) / remainingContribution);
                left = left - remainDays;
            }
            else {
                left = left - remainDays;
            }
        }
        return left;
    };
    /**
     * To get date by left value.
     *
     * @param {number} left .
     * @param {boolean} isMilestone .
     * @param {ITaskData} property .
     * @returns {Date} .
     * @private
     */
    TaskbarEdit.prototype.getDateByLeft = function (left, isMilestone, property) {
        var pStartDate = new Date(this.parent.timelineModule.timelineStartDate.toString());
        var milliSecondsPerPixel = (24 * 60 * 60 * 1000) / this.parent.perDayWidth;
        pStartDate.setTime(pStartDate.getTime() + (left * milliSecondsPerPixel));
        /* To render the milestone in proper date while editing */
        if (isMilestone && !isNullOrUndefined(property.predecessorsName) && property.predecessorsName !== '') {
            //  pStartDate.setDate(pStartDate.getDate() -1);
            var dayEndTime = this.parent['getCurrentDayEndTime'](property.isAutoSchedule ? property.autoEndDate : property.endDate);
            this.parent.dateValidationModule.setTime(dayEndTime, pStartDate);
            pStartDate = this.parent.dateValidationModule.checkStartDate(pStartDate, property, true);
        }
        var tierMode = this.parent.timelineModule.bottomTier !== 'None' ? this.parent.timelineModule.topTier :
            this.parent.timelineModule.bottomTier;
        if (tierMode !== 'Hour' && tierMode !== 'Minutes') {
            if (this.parent.isInDst(new Date(this.parent.timelineModule.timelineStartDate.toString())) &&
                !this.parent.isInDst(pStartDate)) {
                pStartDate.setTime(pStartDate.getTime() + (60 * 60 * 1000));
            }
            // else if (!this.parent.isInDst(new Date(this.parent.timelineModule.timelineStartDate.toString())) && this.parent.isInDst(pStartDate)) {
            //     pStartDate.setTime(pStartDate.getTime() - (60 * 60 * 1000));
            // }
        }
        return pStartDate;
    };
    /**
     * To set item position.
     *
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.setItemPosition = function () {
        if (!isNullOrUndefined(this.editElement)) {
            var currentElement = this.editElement.parentElement;
            if (this.parent.allowTaskbarDragAndDrop && this.taskBarEditAction === 'ChildDrag') {
                currentElement.style.position = null;
            }
            else {
                if (this.parent.enableTimelineVirtualization &&
                    this.parent.timelineModule.wholeTimelineWidth > this.parent.element.offsetWidth * 3) {
                    currentElement.style.setProperty('position', 'relative');
                }
                else {
                    currentElement.style.setProperty('position', 'absolute');
                }
            }
        }
        var item = this.taskBarEditRecord.ganttProperties;
        var position = this.parent.enableRtl ? 'right' : 'left';
        var segment = !isNullOrUndefined(item.segments) ? item.segments[this.segmentIndex] : null;
        var width = this.taskBarEditAction === 'MilestoneDrag' || item.isMilestone ?
            this.parent.chartRowsModule.milestoneHeight : item.width;
        var rightResizer = this.parent.isAdaptive ? (width - 2) : (width - 10);
        if (!isNullOrUndefined(segment)) {
            rightResizer = this.parent.isAdaptive ? (segment.width - 2) : (segment.width - 10);
        }
        this.taskBarEditElement.style.setProperty('opacity', '.75');
        var taskBarMainContainer;
        if (this.parent.allowTaskbarDragAndDrop && !item.isAutoSchedule && this.taskBarEditRecord.hasChildRecords) {
            taskBarMainContainer = this.taskBarEditElement;
        }
        else {
            taskBarMainContainer = (!this.taskBarEditElement.classList.contains(cls.taskBarMainContainer)) ? ((this.taskBarEditAction === 'ChildDrag' ||
                this.taskBarEditAction === 'LeftResizing') && this.segmentIndex === 0) ? this.taskBarEditElement.parentElement : closest(this.taskBarEditElement, 'tr.' + cls.chartRow)
                .querySelector('.' + cls.taskBarMainContainer) : this.taskBarEditElement;
        }
        var segmentedTaskBarContainer = (this.taskBarEditElement.classList.contains('e-segmented-taskbar') ||
            this.taskBarEditElement.querySelector('.e-segmented-taskbar')) ? true : false;
        var traceChildProgressBar = this.taskBarEditElement.querySelector('.' + cls.traceChildProgressBar);
        var traceChildTaskBar = this.taskBarEditElement.querySelector('.' + cls.traceChildTaskBar);
        var childProgressResizer = segmentedTaskBarContainer ? parentsUntil(this.taskBarEditElement, cls.taskBarMainContainer).querySelector('.' + cls.childProgressResizer) : this.taskBarEditElement.querySelector('.' + cls.childProgressResizer);
        var taskBarRightResizer = this.taskBarEditElement.querySelector('.' + cls.taskBarRightResizer);
        var traceParentTaskBar = this.taskBarEditElement.querySelector('.' + cls.traceParentTaskBar);
        var traceParentProgressBar = this.taskBarEditElement.querySelector('.' + cls.traceParentProgressBar);
        var traceConnectorPointRight = this.taskBarEditElement.querySelector('.' + cls.rightConnectorPointOuterDiv);
        var segmentConnectorPointRight = taskBarMainContainer.querySelector('.' + cls.rightConnectorPointOuterDiv);
        var manualParentTaskbar = this.taskBarEditElement;
        var manualTaskbar = this.taskBarEditElement.querySelector('.' + cls.manualParentTaskBar);
        var manualParentRight = this.taskBarEditElement.querySelector('.' + cls.manualParentRightResizer);
        var manualParentLeft = this.taskBarEditElement.querySelector('.' + cls.manualParentLeftResizer);
        var resizeLine = this.parent.ganttChartModule.chartBodyContainer.querySelector('.e-taskbar-resize-div');
        if (this.parent.allowTaskbarDragAndDrop && !this.updatePosition) {
            this.leftValue = this.leftValue + 30;
            this.updatePosition = true;
        }
        if (this.taskBarEditAction !== 'ConnectorPointRightDrag' &&
            this.taskBarEditAction !== 'ConnectorPointLeftDrag') {
            if (this.taskBarEditAction !== 'ParentResizing' && this.taskBarEditAction !== 'ManualParentDrag') {
                if (segmentedTaskBarContainer && !isNullOrUndefined(item.segments)
                    && (this.taskBarEditAction === 'RightResizing' || this.segmentIndex !== 0)) {
                    if (!isNullOrUndefined(resizeLine)) {
                        if (!this.parent.allowTaskbarDragAndDrop || (this.parent.allowTaskbarDragAndDrop && this.parent.rowDragAndDropModule && this.taskBarEditAction !== 'ChildDrag' &&
                            this.taskBarEditAction !== 'ParentDrag')) {
                            resizeLine.style.width = (segment.width) + 'px';
                        }
                    }
                    this.taskBarEditElement.style.width = (segment.width) + 'px';
                    if (this.parent.enableRtl) {
                        this.taskBarEditElement.style.right = (segment.left) + 'px';
                    }
                    else {
                        this.taskBarEditElement.style.left = (segment.left) + 'px';
                        if (!isNullOrUndefined(resizeLine)) {
                            if (!this.parent.allowTaskbarDragAndDrop || (this.parent.allowTaskbarDragAndDrop && this.parent.rowDragAndDropModule && this.taskBarEditAction !== 'ChildDrag'
                                && this.taskBarEditAction !== 'ParentDrag')) {
                                resizeLine.style.left = (segment.left + this.editElement.parentElement.offsetLeft) + 'px';
                            }
                        }
                    }
                }
                taskBarMainContainer.style.setProperty(position, (this.parent.allowTaskbarDragAndDrop ? this.leftValue : (item.left)) + 'px');
                taskBarMainContainer.style.width = (width) + 'px';
                if (segmentedTaskBarContainer && segmentConnectorPointRight) {
                    segmentConnectorPointRight.style.left = (this.parent.isAdaptive ? (width + 10) : (width + 2)) + 'px';
                }
                if (this.parent.allowTaskbarDragAndDrop && this.parent.rowDragAndDropModule && this.taskBarEditAction !== 'LeftResizing' &&
                    this.taskBarEditAction !== 'RightResizing' && this.taskBarEditAction !== 'ProgressResizing') {
                    var addTop = this.parent.taskbarHeight / 2;
                    taskBarMainContainer.style.setProperty('top', (this.topValue + addTop) + 'px');
                    taskBarMainContainer.style.zIndex = '4';
                }
                if (this.taskBarEditAction === 'LeftResizing' && this.segmentIndex === 0) {
                    this.taskBarEditElement.style.setProperty('opacity', '.75');
                    var parent_1 = this.taskBarEditElement.parentElement;
                    var segmentedTasks = parent_1.getElementsByClassName('e-segmented-taskbar');
                    for (var i = 0; i < item.segments.length; i++) {
                        var segment_4 = item.segments[i];
                        var segmentElement = segmentedTasks[i];
                        segmentElement.style.width = (segment_4.width) + 'px';
                        if (item.segments.length === 1) {
                            resizeLine.style.width = (segment_4.width) + 'px';
                            resizeLine.style.setProperty(position, (item.left) + 'px');
                        }
                        else {
                            if (i === 0) {
                                resizeLine.style.width = (segment_4.width) + 'px';
                                resizeLine.style.setProperty(position, (segment_4.left + item.left) + 'px');
                            }
                            if (this.parent.enableRtl) {
                                segmentElement.style.right = (segment_4.left) + 'px';
                            }
                            else {
                                segmentElement.style.left = (segment_4.left) + 'px';
                            }
                        }
                    }
                }
                if (this.taskBarEditAction === 'ChildDrag' && (this.segmentIndex === 0 || (this.segmentIndex !== -1 && this.parent.allowTaskbarDragAndDrop))) {
                    resizeLine.style.width = (width) + 'px';
                    resizeLine.style.setProperty(position, item.left + 'px');
                    taskBarMainContainer.style.setProperty('opacity', '.75');
                }
            }
            if (traceConnectorPointRight) {
                if (this.parent.enableRtl) {
                    traceConnectorPointRight.style.left = (this.parent.isAdaptive ? (width + 10) : (width - 2)) + 'px';
                }
                else {
                    traceConnectorPointRight.style.left = (this.parent.isAdaptive ? (width + 10) : (width + 2)) + 'px';
                }
            }
            if (traceConnectorPointRight && this.taskBarEditAction === 'LeftResizing') {
                traceConnectorPointRight.style.left = (width - 2) + 'px';
            }
            if (childProgressResizer && traceChildProgressBar && (this.taskBarEditAction === 'LeftResizing' || this.taskBarEditAction === 'RightResizing' || this.taskBarEditAction === 'ChildDrag' || this.taskBarEditAction === 'ParentDrag')) {
                childProgressResizer.style.display = 'none';
                traceChildProgressBar.style.display = 'none';
            }
            if (traceConnectorPointRight && this.taskBarEditAction === 'ProgressResizing') {
                traceConnectorPointRight.style.display = 'none';
            }
            if (this.taskBarEditAction === 'MilestoneDrag' || item.isMilestone) {
                taskBarMainContainer.style.setProperty(position, (this.parent.allowTaskbarDragAndDrop ? this.leftValue : (item.left - (width / 2))) + 'px');
                resizeLine.style.setProperty(position, (item.left - (width / 2)) + 'px');
                resizeLine.style.width = (width) + 'px';
            }
            else if (this.taskBarEditAction === 'ProgressResizing') {
                if (this.segmentIndex === -1) {
                    traceChildTaskBar.style.setProperty(position, (item.left + item.progressWidth - 10) + 'px');
                    if (!isNullOrUndefined(traceChildProgressBar)) {
                        traceChildProgressBar.style.width = item.progressWidth + 'px';
                        traceChildProgressBar.style.borderBottomRightRadius = this.progressBorderRadius + 'px';
                        traceChildProgressBar.style.borderTopRightRadius = this.progressBorderRadius + 'px';
                        var width_1 = this.parent.enableRtl ? item.progressWidth + 8 : item.progressWidth - 8;
                        childProgressResizer.style.setProperty(position, width_1 + 'px');
                    }
                }
                else {
                    this.updateSegmentProgress(this.taskBarEditRecord.ganttProperties);
                    var progressElements = taskBarMainContainer.querySelectorAll('.e-gantt-child-progressbar');
                    for (var count = 0; count < progressElements.length; count++) {
                        if (item.segments[count] && item.segments[count].progressWidth && this.segmentIndex !== count) {
                            progressElements[count]['style'].display = 'block';
                            progressElements[count].style.width = item.segments[count].progressWidth + 'px';
                        }
                    }
                    traceChildProgressBar.style.width = item.segments[this.segmentIndex].progressWidth + 'px';
                    traceChildProgressBar.style.borderBottomRightRadius = this.progressBorderRadius + 'px';
                    traceChildProgressBar.style.borderTopRightRadius = this.progressBorderRadius + 'px';
                    var width_2 = this.parent.enableRtl ? this.progressValue + 8 : this.progressValue - 8;
                    childProgressResizer.style.setProperty(position, width_2 + 'px');
                }
            }
            else if (this.taskBarEditAction === 'RightResizing' && !isNullOrUndefined(traceChildTaskBar)) {
                resizeLine.style.width = (width) + 'px';
                traceChildTaskBar.style.width = (width) + 'px';
                if (!isNullOrUndefined(traceChildProgressBar)) {
                    traceChildProgressBar.style.width = (item.progressWidth) + 'px';
                    taskBarRightResizer.style.setProperty(position, rightResizer + 'px');
                    if (!isNullOrUndefined(childProgressResizer)) {
                        childProgressResizer.style.setProperty(position, item.progressWidth - 10 + 'px');
                    }
                }
            }
            else if (this.taskBarEditAction === 'ParentDrag') {
                resizeLine.style.setProperty(position, item.left + 'px');
                resizeLine.style.width = (width) + 'px';
                resizeLine.style.width = (item.width) + 'px';
                if (!isNullOrUndefined(traceParentTaskBar)) {
                    traceParentTaskBar.style.width = (width) + 'px';
                    resizeLine.style.width = (item.width) + 'px';
                }
                if (!isNullOrUndefined(traceChildProgressBar) && !isNullOrUndefined(traceParentProgressBar)) {
                    traceParentProgressBar.style.width = (item.progressWidth) + 'px';
                }
            }
            else if (this.taskBarEditAction === 'ParentResizing') {
                resizeLine.style.width = (item.width) + 'px';
                resizeLine.style.setProperty(position, item.left + 'px');
                manualParentTaskbar.style.setProperty('width', (item.width) + 'px');
                manualTaskbar.style.setProperty('width', (item.width) + 'px');
                this.editElement.parentElement.style.setProperty('width', (item.width) + 'px');
            }
            else if (this.taskBarEditAction === 'ManualParentDrag') {
                resizeLine.style.width = (item.width) + 'px';
                resizeLine.style.setProperty(position, item.left + 'px');
                manualParentTaskbar.style.setProperty(position, item.left - item.autoLeft + 'px');
                if (this.parent.allowTaskbarDragAndDrop) {
                    manualParentTaskbar.style.setProperty(position, this.leftValue + 'px');
                    manualParentTaskbar.style.setProperty('top', (this.topValue) + 'px');
                    manualParentTaskbar.style.zIndex = '4';
                }
            }
            else {
                if (!isNullOrUndefined(traceChildTaskBar) && !segmentedTaskBarContainer) {
                    traceChildTaskBar.style.width = (item.width) + 'px';
                    traceChildTaskBar.style.left = (item.left) + 'px';
                    this.taskBarEditElement.style.width = (item.width) + 'px';
                    this.taskBarEditElement.style.left = ((this.parent.allowTaskbarDragAndDrop ? this.leftValue : (item.left))) + 'px';
                    resizeLine.style.setProperty(position, item.left + 'px');
                    resizeLine.style.width = (item.width) + 'px';
                }
                if (!isNullOrUndefined(traceChildProgressBar)) {
                    taskBarRightResizer.style.setProperty(position, rightResizer + 'px');
                    traceChildProgressBar.style.width = (item.progressWidth) + 'px';
                    if (!isNullOrUndefined(childProgressResizer)) {
                        childProgressResizer.style.setProperty(position, item.progressWidth - 10 + 'px');
                    }
                }
                if (segmentedTaskBarContainer) {
                    taskBarRightResizer.style.setProperty(position, rightResizer + 'px');
                    traceChildProgressBar.style.width = (segment.width) + 'px';
                    if (!isNullOrUndefined(childProgressResizer)) {
                        childProgressResizer.style.setProperty(position, segment.width - 10 + 'px');
                    }
                }
            }
        }
        if (this.parent.allowTaskbarDragAndDrop && (this.taskBarEditAction === 'ChildDrag' || this.taskBarEditAction === 'ParentDrag' ||
            this.taskBarEditAction === 'ManualParentDrag' || this.taskBarEditAction === 'MilestoneDrag')) {
            var resizeValue = this.parent.enableRtl ? parseInt(resizeLine.style.right, 10) : parseInt(resizeLine.style.left, 10);
            if (this.parent.enableRtl) {
                resizeLine.style.right = (resizeValue - 30) + 'px';
            }
            else {
                resizeLine.style.left = (resizeValue + 30) + 'px';
            }
        }
    };
    /**
     * To handle mouse up event in chart
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.mouseUpHandler = function (e) {
        var mouseDragged = this.isMouseDragged;
        this.previousMouseMove = null;
        this.leftValue = 0;
        this.previousLeftValue = 0;
        this.editTooltip.showHideTaskbarEditTooltip(false, this.segmentIndex);
        if (this.taskBarEditAction && this.isMouseDragged) {
            if ((!this.dragMouseLeave && this.taskBarEditedAction) || (this.parent.allowTaskbarDragAndDrop)) {
                if (e.type === 'touchmove' || e.type === 'touchstart' || e.type === 'touchend') {
                    var coordinates = this.getCoordinate(e);
                    this['droppedTarget'] = document.elementFromPoint(coordinates.pageX, coordinates.pageY);
                }
                else {
                    if (this.taskBarEditRecord.hasChildRecords && !this.taskBarEditRecord.ganttProperties.isAutoSchedule) {
                        var taskbarPosition = this.parent.getOffsetRect(this.taskBarEditElement);
                        var left = (!isNullOrUndefined(document.body.className) && document.body.className.includes('e-bigger')) ? 12 : 0;
                        var pointerLeft = (3 + this.parent.chartRowsModule.connectorPointWidth + left);
                        var xValue = void 0;
                        if (this.parent.enableRtl) {
                            xValue = Math.abs(taskbarPosition.left + pointerLeft + 1);
                        }
                        else {
                            xValue = Math.abs(Math.abs(taskbarPosition.left - pointerLeft - 1) -
                                this.parent.ganttChartModule.scrollElement.scrollLeft);
                        }
                        this['droppedTarget'] = document.elementFromPoint(xValue, e.y);
                    }
                    else {
                        this['droppedTarget'] = document.elementFromPoint(e.x, e.y);
                    }
                    if (this['droppedTarget'] && this['droppedTarget'].classList.contains('e-span-label')) {
                        this['droppedTarget'] = document.elementFromPoint(e.x + this['droppedTarget']['offsetWidth'], e.y);
                    }
                }
                this.previousIds = this.parent.ids.slice();
                this.previousFlatData = this.parent.flatData.slice();
                this.taskBarEditedAction(e);
                this.isMouseDragged = false;
            }
            else {
                this.parent.isOnEdit = false;
                this.cancelTaskbarEditActionInMouseLeave();
                var criticalModule = this.parent.criticalPathModule;
                if (this.parent.enableCriticalPath && criticalModule && criticalModule.criticalPathCollection) {
                    criticalModule.criticalConnectorLine(criticalModule.criticalPathCollection, criticalModule.detailPredecessorCollection, true, criticalModule.predecessorCollectionTaskIds);
                }
            }
        }
        if (this.parent.enableMultiTaskbar && !isNullOrUndefined(this.taskBarEditElement)) {
            if (!isNullOrUndefined(this.taskBarEditElement.querySelector('.e-gantt-child-taskbar'))) {
                if (this.taskBarEditElement.querySelector('.e-gantt-child-taskbar').classList.contains('e-collapsed-taskbar-drag')) {
                    removeClass([this.taskBarEditElement.querySelector('.e-gantt-child-taskbar')], 'e-collapsed-taskbar-drag');
                    this.taskBarEditElement.style.zIndex = this.prevZIndex;
                    this.prevZIndex = '';
                }
            }
        }
        if (!this.parent.isAdaptive || mouseDragged) {
            this.initPublicProp();
        }
        this.stopScrollTimer();
    };
    /**
     * To perform taskbar edit operation.
     *
     * @param {PointerEvent} event .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.taskBarEditedAction = function (event) {
        var args = {};
        var x1 = this.mouseDownX;
        var y1 = this.mouseDownY;
        var item = this.taskBarEditRecord;
        var recordIndex = this.parent.ganttChartModule.getIndexByTaskBar(this.taskBarEditElement);
        var x2 = this.mouseMoveX;
        var e = this.getCoordinate(event);
        var resMouseY = e.pageY - this.parent.ganttChartModule.chartBodyContainer.offsetTop;
        if ((this.taskBarEditAction === 'ConnectorPointLeftDrag' ||
            this.taskBarEditAction === 'ConnectorPointRightDrag') && !this.drawPredecessor) {
            this.dependencyCancel = true;
        }
        var parentRecord = [];
        if ((this.taskBarEditAction === 'ConnectorPointLeftDrag' ||
            this.taskBarEditAction === 'ConnectorPointRightDrag') && this.drawPredecessor && (!this.connectorSecondRecord.hasChildRecords ||
            this.connectorSecondRecord.hasChildRecords && this.parent.allowParentDependency)) {
            parentRecord.push(extend([], [], [this.taskBarEditRecord], true)[0]);
            if (this.parent.undoRedoModule) {
                this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1]['connectedRecords'] = parentRecord;
                if (this.parent.toolbarModule) {
                    this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], true);
                }
            }
            this.parent.connectorLineEditModule.updatePredecessor(this.connectorSecondRecord, this.finalPredecessor);
        }
        else {
            if ((this.taskBarEditAction === 'ConnectorPointLeftDrag' ||
                this.taskBarEditAction === 'ConnectorPointRightDrag') || (this.oldData && JSON.stringify(item.ganttProperties) === JSON.stringify(this.oldData.ganttProperties))) {
                if (this.parent.undoRedoModule && this.parent.undoRedoModule['getUndoCollection'].length > 0) {
                    this.parent['totalUndoAction']--;
                    this.parent.undoRedoModule['getUndoCollection'].splice(this.parent.undoRedoModule['getUndoCollection'].length - 1, 1);
                    if (this.parent.toolbarModule) {
                        this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], false);
                    }
                }
            }
            else {
                if (this.parent.undoRedoModule && this.parent.toolbarModule && this.parent.undoRedoModule['getUndoCollection'].length > 0) {
                    this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], true);
                }
            }
            if (x1 !== x2 || (Math.abs(y1 - resMouseY) >= (this.parent.rowHeight - this.parent.taskbarHeight) / 2)) {
                if (item !== null) {
                    args.editingFields = item.ganttProperties;
                    args.data = item;
                    args.recordIndex = recordIndex;
                    args.previousData = this.previousItem;
                    args.taskBarEditAction = this.taskBarEditAction;
                    args.action = 'TaskbarEditing';
                    args.roundOffDuration = this.roundOffDuration;
                    args.target = this.targetElement;
                    this.taskbarEditedArgs = args;
                    this.taskbarEdited(args);
                }
            }
        }
        this.parent['isProjectDateUpdated'] = false;
    };
    /**
     * To cancel the taskbar edt action.
     *
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.cancelTaskbarEditActionInMouseLeave = function () {
        this.parent.editModule.reUpdatePreviousRecords(true);
    };
    TaskbarEdit.prototype.updateSegmentProgress = function (taskData) {
        var segments = taskData.segments;
        var fixedWidth = true;
        var totalTaskWidth = this.splitTasksDuration(segments) * this.parent.perDayWidth;
        var progress = Math.ceil((taskData.progressWidth / totalTaskWidth) * 100);
        var totalProgressWidth = (totalTaskWidth * progress) / 100;
        var tempWidth = totalProgressWidth;
        for (var i = 0; i < segments.length; i++) {
            var segment = segments[i];
            if (i !== 0) {
                if (segment.left <= tempWidth) {
                    var newWidth = (tempWidth - segment.left);
                    totalProgressWidth = newWidth;
                }
                else {
                    totalProgressWidth = 0;
                }
            }
            delete segment.progressWidth;
            if (totalProgressWidth > 0 && totalProgressWidth > segment.width) {
                totalProgressWidth = totalProgressWidth - segment.width;
                segment.progressWidth = segment.width;
                segment.showProgress = false;
            }
            else if (fixedWidth) {
                segment.progressWidth = totalProgressWidth;
                segment.showProgress = true;
                totalProgressWidth = totalProgressWidth - segment.width;
                fixedWidth = false;
            }
        }
    };
    /**
     * To trigger taskbar edited event.
     *
     * @param {ITaskbarEditedEventArgs} arg .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.taskbarEdited = function (arg) {
        var args = extend({}, arg);
        var ganttRecord = args.data;
        var taskData = ganttRecord.ganttProperties;
        var draggedRecIndex = this.parent.flatData.indexOf(ganttRecord);
        if ((this.parent.allowTaskbarDragAndDrop && this.taskBarEditAction === 'ChildDrag' || this.taskBarEditAction === 'ParentDrag' ||
            this.taskBarEditAction === 'MilestoneDrag' || this.taskBarEditAction === 'ManualParentDrag') && this.dragMoveY > 0 &&
            ((this.parent.viewType === 'ResourceView' && !ganttRecord.hasChildRecords) || this.parent.viewType === 'ProjectView')) {
            if (this.parent.rowDragAndDropModule) {
                var flatRecordCol = this.parent.currentViewData;
                if (this.taskBarEditRecord.parentItem && flatRecordCol[this.taskBarEditRecord.parentItem.index] &&
                    ((this.parent.editedRecords.indexOf(flatRecordCol[this.taskBarEditRecord.parentItem.index]) === -1))) {
                    this.parent.editedRecords.push(flatRecordCol[this.taskBarEditRecord.parentItem.index]);
                }
                this.removeChildBorder();
                this.removeErrorElem();
                this.removetopOrBottomBorder();
                var droppedRecord = void 0;
                this.updatePosition = false;
                this.draggedRecordMarginTop = this.taskBarEditElement.style.marginTop;
                var row = void 0;
                if (!isNullOrUndefined(this.droppedTarget)) {
                    row = closest(this.droppedTarget, 'tr.' + cls.chartRow);
                }
                if (row) {
                    var recordIndex = parseInt(row.getAttribute('aria-rowindex'), 10) - 1;
                    droppedRecord = this.parent.flatData[recordIndex];
                    var droppedParentRecordIndex = this.parent.getRootParent(droppedRecord, 0).index;
                    var draggedParentRecordIndex = this.parent.getRootParent(this.taskBarEditRecord, 0).index;
                    var e = {
                        cancel: false,
                        data: this.taskBarEditRecord,
                        fromIndex: this.taskBarEditRecord.index,
                        dropIndex: droppedRecord.index,
                        dropPosition: this.parent.rowDragAndDropModule['dropPosition'],
                        dropRecord: droppedRecord
                    };
                    this.parent.trigger('rowDrop', e);
                    if (!e['cancel'] && droppedRecord && recordIndex !== draggedRecIndex && ((droppedParentRecordIndex !== draggedParentRecordIndex ||
                        (this.taskBarEditRecord.hasChildRecords && droppedRecord.hasChildRecords)) ||
                        !this.taskBarEditRecord.hasChildRecords)) {
                        var droppedRecordIndex = this.parent.flatData.indexOf(droppedRecord);
                        var position = void 0;
                        if (this.parent.viewType === 'ProjectView' && !isNullOrUndefined(this.parent.rowDragAndDropModule['dropPosition'])) {
                            position = this.parent.rowDragAndDropModule['dropPosition'];
                        }
                        else {
                            position = (droppedRecord.hasChildRecords || (!droppedRecord.parentItem &&
                                droppedRecord.childRecords.length === 0)) ? 'child' : this.parent.rowDragAndDropModule['dropPosition'];
                        }
                        if (this.parent.rowDragAndDropModule) {
                            if (this.parent.viewType === 'ResourceView' && (position === 'child' && !droppedRecord.hasChildRecords) && !isNullOrUndefined(droppedRecord.parentItem)) {
                                position = 'Invalid';
                                this.parent.rowDragAndDropModule['dropPosition'] = 'Invalid';
                            }
                            if (position) {
                                this.parent.rowDragAndDropModule.reorderRows([draggedRecIndex], droppedRecordIndex, position);
                            }
                        }
                        this.dragMoveY = 0;
                    }
                }
                this.isClonedElement = false;
            }
            if (this.parent.showOverAllocation) {
                this.parent.ganttChartModule.renderOverAllocationContainer();
            }
        }
        if (args.taskBarEditAction === 'ProgressResizing') {
            if (args.previousData.progress !== taskData.progress) {
                var progressWidth = args.data.ganttProperties.progressWidth;
                var totalTaskWidth = args.data.ganttProperties.width;
                /* eslint-disable-next-line */
                var updatedValues = this.validateProgressWidth(args.data.ganttProperties, progressWidth, totalTaskWidth);
                this.parent.setRecordValue('progress', this.getProgressPercent(updatedValues.totalTaskWidth, updatedValues.progressWidth), taskData, true);
                if (ganttRecord.parentItem) {
                    this.parent.editModule.updateParentProgress(ganttRecord.parentItem);
                }
                if (!isNullOrUndefined(taskData.segments)) {
                    this.updateSegmentProgress(taskData);
                }
            }
        }
        else {
            var segments = args.data.ganttProperties.segments;
            if (!isNullOrUndefined(segments) && segments.length > 0
                && ((this.taskBarEditAction === 'LeftResizing' && this.segmentIndex !== 0)
                    || (this.taskBarEditAction === 'ChildDrag' && this.segmentIndex !== 0)
                    || (this.taskBarEditAction === 'RightResizing'))) {
                var segment = segments[this.segmentIndex];
                var ganttProp = this.taskBarEditRecord.ganttProperties;
                var previousSegment = this.segmentIndex === 0 ? null
                    : segments[this.segmentIndex - 1];
                var nextSegment = this.segmentIndex === segments.length - 1 ? null
                    : segments[this.segmentIndex + 1];
                var sDate = !isNullOrUndefined(nextSegment) ?
                    new Date(nextSegment.startDate.getTime()) : this.parent.cloneProjectEndDate;
                var eDate = !isNullOrUndefined(previousSegment) ?
                    new Date(previousSegment.endDate.getTime()) : this.parent.cloneProjectStartDate;
                var cStartDate = new Date(segment.startDate.getTime());
                var cEndDate = new Date(segment.endDate.getTime());
                if (this.parent.timelineModule.topTier === 'Day' && this.parent.timelineModule.bottomTier === 'Hour') {
                    cStartDate.setHours(cStartDate.getHours() - 1);
                    cEndDate.setHours(cEndDate.getHours() + 1);
                }
                else {
                    cStartDate.setDate(cStartDate.getDate());
                    cEndDate.setDate(cEndDate.getDate());
                }
                if (this.parent.includeWeekend) {
                    sDate.setHours(0, 0, 0, 0);
                    eDate.setHours(0, 0, 0, 0);
                    cStartDate.setDate(cStartDate.getDate() - 1);
                    cEndDate.setDate(cEndDate.getDate() + 1);
                    cStartDate.setHours(0, 0, 0, 0);
                    cEndDate.setHours(0, 0, 0, 0);
                    if (cStartDate.getTime() <= eDate.getTime() && !isNullOrUndefined(previousSegment) && !isNullOrUndefined(segment)) {
                        var segmentIndexes = [
                            { 'firstSegmentIndex': previousSegment.segmentIndex, 'secondSegmentIndex': segment.segmentIndex }
                        ];
                        this.parent.chartRowsModule.mergeTask(ganttProp.taskId, segmentIndexes);
                    }
                    else if (cEndDate.getTime() >= sDate.getTime() && this.segmentIndex !== segments.length - 1) {
                        var segmentIndexes = [
                            { 'firstSegmentIndex': segment.segmentIndex, 'secondSegmentIndex': nextSegment.segmentIndex }
                        ];
                        this.parent.chartRowsModule.mergeTask(ganttProp.taskId, segmentIndexes);
                    }
                    else if (cEndDate.getTime() >= sDate.getTime()) {
                        segment.endDate.setDate(this.parent.cloneProjectEndDate.getDate() - 1);
                        segment.startDate = this.parent.dataOperation.getStartDate(segment.endDate, segment.duration, ganttProp.durationUnit, ganttProp);
                        // eslint-disable-next-line
                        for (var i = segments.length - 2; i >= 0; i--) {
                            var segment_5 = __assign({}, segments[i]);
                            if (!isNullOrUndefined(segment_5)) {
                                var eDate_1 = new Date(segment_5.endDate);
                                eDate_1.setDate(eDate_1.getDate() - segment_5.offsetDuration);
                                segment_5.endDate = eDate_1;
                                segment_5.startDate = this.parent.dataOperation.getStartDate(segment_5.endDate, segment_5.duration, ganttProp.durationUnit, ganttProp);
                            }
                        }
                    }
                }
                else {
                    //Hits while dragging taskbar toward right & taskbar rightside resizing:
                    if (cEndDate.getTime() <= sDate.getTime() && this.segmentIndex !== segments.length - 1 && !this.parent.includeWeekend &&
                        this.parent.dataOperation.getDuration((this.parent.dataOperation.checkStartDate(cEndDate, taskData, false)), sDate, taskData.durationUnit, false, false) === 0) {
                        var segmentIndexes = [
                            { 'firstSegmentIndex': segment.segmentIndex, 'secondSegmentIndex': nextSegment.segmentIndex }
                        ];
                        this.parent.chartRowsModule.mergeTask(ganttProp.taskId, segmentIndexes);
                    }
                    //Hits while dragging taskbar toward left & taskbar leftside resizing:
                    else if (cStartDate.getTime() >= eDate.getTime() &&
                        !isNullOrUndefined(previousSegment) && !isNullOrUndefined(segment) &&
                        !this.parent.includeWeekend && this.parent.dataOperation.getDuration((this.parent.dataOperation.checkEndDate(cStartDate, taskData, false)), eDate, taskData.durationUnit, false, false) === 0) {
                        var segmentIndexes = [
                            { 'firstSegmentIndex': previousSegment.segmentIndex, 'secondSegmentIndex': segment.segmentIndex }
                        ];
                        this.parent.chartRowsModule.mergeTask(ganttProp.taskId, segmentIndexes);
                    }
                }
            }
            this.parent.dataOperation.updateWidthLeft(args.data);
        }
        this.isDragged = false;
        this.parent.dataOperation.updateTaskData(ganttRecord);
        this.parent.editModule.initiateUpdateAction(args);
    };
    /**
     * To get progress in percentage.
     *
     * @param {number} parentwidth .
     * @param {number} progresswidth .
     * @returns {number} .
     * @private
     */
    TaskbarEdit.prototype.getProgressPercent = function (parentwidth, progresswidth) {
        return Math.ceil(((progresswidth / parentwidth) * 100));
    };
    /**
     * false line implementation.
     *
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.drawFalseLine = function () {
        var x1 = this.mouseDownX;
        var y1 = this.mouseDownY;
        var x2 = this.mouseMoveX;
        var y2 = this.mouseMoveY;
        var length = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        var transform = 'rotate(' + (this.parent.enableRtl ? -angle : angle) + 'deg)';
        var left;
        var width = 0;
        if (!isNullOrUndefined(document.querySelectorAll('.e-chart-row')[0])) {
            width = document.querySelectorAll('.e-chart-row')[0].offsetWidth;
        }
        if (this.taskBarEditAction === 'ConnectorPointLeftDrag') {
            if (this.parent.enableRtl) {
                left = ((width - (this.elementOffsetLeft + (this.parent.chartRowsModule.connectorPointWidth / 2)))) -
                    Math.abs(this.parent.ganttChartModule.scrollObject.previousScroll.left);
            }
            else {
                left = (this.elementOffsetLeft - (this.parent.chartRowsModule.connectorPointWidth / 2)) -
                    this.parent.ganttChartModule.scrollObject.previousScroll.left;
            }
        }
        if (this.taskBarEditAction === 'ConnectorPointRightDrag') {
            if (this.parent.enableRtl) {
                left = (width - (this.elementOffsetLeft + this.elementOffsetWidth +
                    (this.parent.chartRowsModule.connectorPointWidth / 2))) - Math.abs(this.parent.ganttChartModule.scrollObject.previousScroll.left);
            }
            else {
                left = (this.elementOffsetLeft + this.elementOffsetWidth) +
                    (this.parent.chartRowsModule.connectorPointWidth / 2) - Math.abs(this.parent.ganttChartModule.scrollObject.previousScroll.left);
            }
        }
        var top = ((this.elementOffsetTop) + (this.elementOffsetHeight / 2) +
            this.parent.ganttChartModule.chartBodyContainer.offsetTop) - this.parent.ganttChartModule.scrollObject.previousScroll.top;
        this.removeFalseLine(false);
        this.falseLine = createElement('div', {
            className: cls.falseLine, id: 'ganttfalseline' + this.parent.element.id,
            styles: 'position: absolute;transform:' + transform + ';' +
                'border-top-width: 1px;border-top-style: dashed;z-index: 5;width:' + (length - 3) + 'px;' +
                'top:' + top + 'px;'
        });
        if (this.parent.enableRtl) {
            this.falseLine.style.left = 'auto';
            this.falseLine.style.right = left + 'px';
            this.falseLine.style.transformOrigin = '100% 0%';
        }
        else {
            this.falseLine.style.right = 'auto';
            this.falseLine.style.left = left + 'px';
            this.falseLine.style.transformOrigin = '0% 100%';
        }
        this.parent.ganttChartModule.chartBodyContainer.appendChild(this.falseLine);
    };
    /**
     *
     * @param {boolean} isRemoveConnectorPointDisplay .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.removeFalseLine = function (isRemoveConnectorPointDisplay) {
        if (this.falseLine) {
            remove(this.falseLine);
            this.falseLine = null;
            if (isRemoveConnectorPointDisplay) {
                this.elementOffsetLeft = 0;
                this.elementOffsetTop = 0;
                this.elementOffsetWidth = 0;
                this.elementOffsetHeight = 0;
                removeClass(this.parent.ganttChartModule.scrollElement.querySelectorAll('.' + cls.connectorLineContainer), [cls.connectorLineZIndex]);
            }
        }
    };
    /**
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.updateConnectorLineSecondProperties = function (e) {
        var target = this.getElementByPosition(e);
        var element = parentsUntil(target, cls.taskBarMainContainer);
        var isBigger = document.body.className.includes('e-bigger');
        this.connectorSecondAction = null;
        var scrollTop = 0;
        if (parentsUntil(target, cls.connectorPointLeft)) {
            this.connectorSecondAction = 'ConnectorPointLeftDrag';
            this.toPredecessorText = 'Start';
        }
        else if (parentsUntil(target, cls.connectorPointRight)) {
            this.connectorSecondAction = 'ConnectorPointRightDrag';
            this.toPredecessorText = 'Finish';
        }
        else {
            this.connectorSecondAction = null;
            this.toPredecessorText = null;
        }
        if (this.taskBarEditElement !== element && this.taskBarEditElement !== this.highlightedSecondElement) {
            if (this.parent.virtualScrollModule && this.parent.enableVirtualization) {
                var top_1 = this.parent.virtualScrollModule.getTopPosition();
                scrollTop = top_1;
            }
            if ((this.parent.virtualScrollModule && this.parent.enableVirtualization &&
                !this.elementOffsetLeft) || !this.parent.enableVirtualization) {
                if (!this.parent.allowParentDependency) {
                    this.elementOffsetLeft = this.realTaskbarElement.offsetLeft - ((isBigger) ? 10 : 0);
                    this.elementOffsetTop = this.realTaskbarElement.parentElement.offsetTop +
                        this.realTaskbarElement.offsetHeight / 3 + scrollTop;
                }
                else {
                    if (this.taskBarEditElement.children[0].classList.contains('e-manualparent-main-container')) {
                        this.elementOffsetLeft = this.realTaskbarElement.children[0]['offsetLeft'] +
                            this.realTaskbarElement.offsetLeft - ((isBigger) ? 10 : 0);
                        this.elementOffsetTop = ((this.realTaskbarElement.parentElement.offsetTop + this.realTaskbarElement.offsetHeight / 3 - 5) + this.taskBarEditElement.children[0]['offsetTop']) + scrollTop;
                    }
                    else {
                        this.elementOffsetLeft = this.realTaskbarElement.offsetLeft - ((isBigger) ? 10 : 0);
                        this.elementOffsetTop = this.realTaskbarElement.parentElement.offsetTop +
                            this.realTaskbarElement.offsetHeight / 3 + scrollTop;
                    }
                }
                this.elementOffsetWidth = this.realTaskbarElement.offsetWidth + ((isBigger) ? 20 : 0);
                this.elementOffsetHeight = this.realTaskbarElement.offsetHeight;
            }
            this.showHideTaskBarEditingElements(element, this.highlightedSecondElement, true);
        }
        if (isNullOrUndefined(this.connectorSecondAction) && !isNullOrUndefined(this.connectorSecondElement) &&
            (!this.connectorSecondRecord.hasChildRecords || this.connectorSecondRecord.hasChildRecords &&
                this.parent.allowParentDependency)) {
            this.editTooltip.showHideTaskbarEditTooltip(false, this.segmentIndex);
            removeClass([this.connectorSecondElement.querySelector('.' + cls.connectorPointLeft)], [cls.connectorPointAllowBlock]);
            removeClass([this.connectorSecondElement.querySelector('.' + cls.connectorPointRight)], [cls.connectorPointAllowBlock]);
        }
        this.connectorSecondElement = this.connectorSecondAction ? element : null;
        this.highlightedSecondElement = element;
        this.connectorSecondRecord = isNullOrUndefined(this.connectorSecondElement) ?
            null : this.parent.ganttChartModule.getRecordByTaskBar(this.connectorSecondElement);
    };
    // eslint-disable-next-line
    TaskbarEdit.prototype.triggerDependencyEvent = function (e, mouseUp) {
        var parentWithZoomStyle = this.parent.element.closest('[style*="zoom"]');
        var zoomedPageY;
        if (parentWithZoomStyle) {
            var zoom1 = parseFloat(getComputedStyle(parentWithZoomStyle).zoom);
            zoomedPageY = e.pageY / zoom1;
        }
        var fromItem = this.taskBarEditRecord.ganttProperties;
        var toItem = this.connectorSecondRecord ? this.connectorSecondRecord.ganttProperties : null;
        var predecessor;
        var currentTarget;
        var target = this.getElementByPosition(e);
        var element = target;
        var uniqueId = this.parent.viewType === 'ResourceView' ? fromItem.taskId : fromItem.rowUniqueID;
        if (this.taskBarEditAction === 'ConnectorPointLeftDrag') {
            predecessor = uniqueId + (this.parent.enableRtl ? 'F' : 'S');
        }
        else if (this.taskBarEditAction === 'ConnectorPointRightDrag') {
            predecessor = uniqueId + (this.parent.enableRtl ? 'S' : 'F');
        }
        if (this.connectorSecondAction) {
            if (this.connectorSecondAction === 'ConnectorPointLeftDrag') {
                predecessor += this.parent.enableRtl ? 'F' : 'S';
                currentTarget = this.parent.enableRtl ? 'finish' : 'start';
            }
            else if (this.connectorSecondAction === 'ConnectorPointRightDrag') {
                predecessor += this.parent.enableRtl ? 'S' : 'F';
                currentTarget = this.parent.enableRtl ? 'start' : 'finish';
            }
        }
        if (isNullOrUndefined(toItem)) {
            this.drawPredecessor = false;
            return;
        }
        if (toItem.predecessorsName) {
            this.finalPredecessor = toItem.predecessorsName + ',' + predecessor;
        }
        else {
            this.finalPredecessor = predecessor;
        }
        var isValidLink = this.parent.connectorLineEditModule.validatePredecessorRelation(this.connectorSecondRecord, this.finalPredecessor);
        // eslint-disable-next-line
        var predecessorArray = this.parent.predecessorModule.calculatePredecessor(predecessor, this.connectorSecondRecord);
        var args = {};
        args.fromItem = fromItem;
        args.toItem = toItem;
        args.newPredecessorString = this.finalPredecessor;
        args.predecessor = predecessorArray && predecessorArray[0];
        args.isValidLink = isValidLink;
        args.requestType = 'ValidateDependency';
        this.parent.trigger('actionBegin', args);
        if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer' && args.requestType !== 'ValidateDependency') {
            this.parent.showMaskRow();
        }
        else if (args.requestType !== 'ValidateDependency') {
            this.parent.showSpinner();
        }
        args.isValidLink = !isValidLink && args.isValidLink ? false : args.isValidLink;
        if (args.isValidLink) {
            if (!this.editTooltip.toolTipObj && !this.parent.isAdaptive) {
                this.editTooltip.showHideTaskbarEditTooltip(true, this.segmentIndex);
            }
            if (!isNullOrUndefined(this.editTooltip.toolTipObj)) {
                this.parent.connectorLineModule.tooltipTable.innerHTML = '';
                this.parent.connectorLineModule.tooltipTable.appendChild(this.parent.connectorLineModule.getConnectorLineTooltipInnerTd(this.parent.editModule.taskbarEditModule.taskBarEditRecord.ganttProperties.taskName, this.parent.editModule.taskbarEditModule.fromPredecessorText, '', ''));
                var table = this.parent.connectorLineModule.tooltipTable.querySelector('#toPredecessor').querySelectorAll('td');
                table[1].innerText = toItem.taskName;
                table[2].innerText = this.parent.localeObj.getConstant(currentTarget);
                if (!isNullOrUndefined(this.parent.connectorLineModule.tooltipTable.parentElement) &&
                    !isNullOrUndefined(this.parent.connectorLineModule.tooltipTable.parentElement.parentElement)) {
                    var tooltipElement = this.parent.connectorLineModule.tooltipTable.parentElement.parentElement;
                    if (tooltipElement.offsetTop + tooltipElement.offsetHeight > zoomedPageY) {
                        tooltipElement.style.top = (e.pageY - tooltipElement.offsetHeight - 20) + 'px';
                    }
                }
            }
            this.drawPredecessor = true;
        }
        else {
            if (this.parent.isAdaptive) {
                if (target.classList.contains(cls.connectorPointLeft) ||
                    target.classList.contains(cls.connectorPointRight)) {
                    this.showHideActivePredecessors(true);
                }
            }
            else {
                addClass([element], [cls.connectorPointAllowBlock]);
            }
            this.drawPredecessor = false;
        }
    };
    // Get XY coordinates for touch and non-touch device
    TaskbarEdit.prototype.getCoordinate = function (event) {
        var coordinates = {};
        var e = event;
        coordinates.pageX = e.pageX;
        coordinates.pageY = e.pageY;
        if (event && event.type !== 'click') {
            var e_1 = event;
            if (e_1.type === 'touchmove' || e_1.type === 'touchstart' || e_1.type === 'touchend') {
                coordinates.pageX = e_1.changedTouches[0].pageX;
                coordinates.pageY = e_1.changedTouches[0].pageY;
            }
        }
        return coordinates;
    };
    // Get current target element by mouse position
    // window.pageXOffset && window.pageYOffset is used to find the accurate element position in IPad/IPhone
    TaskbarEdit.prototype.getElementByPosition = function (event) {
        if (!this.parent.isAdaptive) {
            return event.target;
        }
        else {
            var e = this.getCoordinate(event);
            return document.elementFromPoint((e.pageX - window.pageXOffset), (e.pageY - window.pageYOffset));
        }
    };
    TaskbarEdit.prototype.multipleSelectionEnabled = function () {
        if (this.parent.selectionModule &&
            this.parent.selectionSettings.mode !== 'Cell'
            && this.parent.selectionSettings.type === 'Multiple') {
            this.parent.selectionModule.hidePopUp();
        }
    };
    TaskbarEdit.prototype.unWireEvents = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('chartMouseDown', this.mouseDownHandler);
        this.parent.off('chartMouseUp', this.mouseUpHandler);
        this.parent.off('chartMouseLeave', this.mouseLeaveHandler);
        this.parent.off('chartMouseMove', this.mouseMoveAction);
        this.parent.off('chartMouseClick', this.mouseClickHandler);
    };
    /**
     * @returns {void} .
     * @private
     */
    TaskbarEdit.prototype.destroy = function () {
        this.unWireEvents();
        this.stopScrollTimer();
        this.parent.editModule.taskbarEditModule = undefined;
    };
    return TaskbarEdit;
}(DateProcessor));
export { TaskbarEdit };
