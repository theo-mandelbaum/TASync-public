import { createElement, formatUnit, EventHandler, Browser } from '@syncfusion/ej2-base';
import { isNullOrUndefined, closest, addClass, removeClass, getValue, setValue } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
import { ChartScroll } from '../actions/chart-scroll';
import { click } from '@syncfusion/ej2-grids';
import { VirtualContentRenderer } from '../renderer/virtual-content-render';
/**
 * module to render gantt chart - project view
 */
var GanttChart = /** @class */ (function () {
    function GanttChart(parent) {
        this.isExpandCollapseFromChart = false;
        this.isExpandAll = false;
        this.isCollapseAll = false;
        this.debounceTimeoutNext = 0;
        this.debounceTimeout = 0;
        this.isGanttElement = false;
        this.previousPinchDistance = 0;
        this.currentToolbarIndex = -1;
        this.isPinching = false;
        this.preventScrollIntoView = false;
        this.parent = parent;
        this.chartTimelineContainer = null;
        this.rangeViewContainer =
            createElement('div', { className: cls.rangeContainer });
        this.rangeViewContainer.setAttribute('role', 'button');
        this.rangeViewContainer.setAttribute('aria-label', 'RangeContainer');
        this.virtualRender = new VirtualContentRenderer(this.parent);
        this.addEventListener();
    }
    GanttChart.prototype.addEventListener = function () {
        this.parent.on('renderPanels', this.renderChartContainer, this);
        this.parent.on('recordsUpdated', this.renderChartElements, this);
        this.parent.on('dataReady', this.renderInitialContents, this);
        this.parent.on('tree-grid-created', this.renderChartContents, this);
        this.parent.on('destroy', this.destroy, this);
    };
    GanttChart.prototype.renderChartContents = function () {
        this.parent.notify('refreshDayMarkers', {});
        this.wireEvents();
    };
    /**
     * Method to render top level containers in Gantt chart
     *
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.renderChartContainer = function () {
        this.chartElement = createElement('div', { id: this.parent.element.id + 'GanttChart', className: cls.ganttChart });
        this.parent.chartPane.appendChild(this.chartElement);
        this.renderTimelineContainer();
        this.renderBodyContainers();
        // render top level div header and content
        // Get timeline header from timeline class file and append to header div
        // render content div
        // Render scroll able div
        // Render container for all element like, table, weekend and holidays
        // Get rows element from rows renderer class
        // Get label related info label renderer class
        // Get baseline from baseline renderer class
        // Get weekend elements from weekend-holidays renderer class
    };
    /**
     * method to render timeline, holidays, weekends at load time
     *
     * @returns {void} .
     */
    GanttChart.prototype.renderInitialContents = function () {
        this.parent.timelineModule.createTimelineSeries();
    };
    /**
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.renderOverAllocationContainer = function () {
        for (var i = 0; i < this.parent.flatData.length; i++) {
            var data = this.parent.flatData[i];
            if (data.childRecords.length > 0) {
                this.parent.dataOperation.updateOverlappingValues(data);
            }
        }
        var rangeContainer = this.parent.element.querySelector('.' + cls.rangeContainer);
        if (rangeContainer) {
            rangeContainer.innerHTML = '';
        }
        if (this.parent.treeGrid.grid.filterSettings.columns.length === 0) {
            this.renderRangeContainer(this.parent.currentViewData);
        }
    };
    GanttChart.prototype.renderChartElements = function () {
        if (this.parent.isFromOnPropertyChange) {
            this.rangeViewContainer.innerHTML = '';
            this.parent.updateProjectDates(this.parent.cloneProjectStartDate, this.parent.cloneProjectEndDate, this.parent.isTimelineRoundOff);
            this.parent.isFromOnPropertyChange = false;
        }
        else {
            this.parent.chartRowsModule.renderChartRows();
            if (this.parent.predecessorModule && this.parent.taskFields.dependency) {
                this.parent.connectorLineIds = [];
                this.parent.updatedConnectorLineCollection = [];
                this.parent.predecessorModule.createConnectorLinesCollection();
            }
            this.parent.connectorLineModule.renderConnectorLines(this.parent.updatedConnectorLineCollection);
            for (var i = 0; i < this.parent.chartRowsModule.ganttChartTableBody.children.length; i++) {
                if (this.parent.chartRowsModule.ganttChartTableBody.children[i].children[0].children[1].children[4]) {
                    this.parent.chartRowsModule.ganttChartTableBody.children[i].children[0].children[1].children[1].setAttribute('tabindex', '-1');
                    this.parent.chartRowsModule.ganttChartTableBody.children[i].children[0].children[1].children[2].setAttribute('tabindex', '-1');
                    this.parent.chartRowsModule.ganttChartTableBody.children[i].children[0].children[1].children[4].setAttribute('tabindex', '-1');
                }
                else {
                    if (this.parent.viewType === 'ProjectView') {
                        var node = this.parent.chartRowsModule.ganttChartTableBody.
                            children[parseInt(i.toString(), 10)].children[0].children[1].children[1];
                        if (!isNullOrUndefined(node)) {
                            this.parent.chartRowsModule.ganttChartTableBody.children[i].children[0].children[1].children[1].setAttribute('tabindex', '-1');
                        }
                    }
                    else if (this.parent.chartRowsModule.ganttChartTableBody.children[parseInt(i.toString(), 10)].children[0].
                        children[1].children[0]) {
                        this.parent.chartRowsModule.ganttChartTableBody.children[i].children[0].children[1].children[0].setAttribute('tabindex', '-1');
                    }
                }
            }
            var criticalModule = this.parent.criticalPathModule;
            if (this.parent.enableCriticalPath && criticalModule && criticalModule.criticalPathCollection) {
                this.parent.criticalPathModule.criticalConnectorLine(criticalModule.criticalPathCollection, criticalModule.detailPredecessorCollection, this.parent.enableCriticalPath, criticalModule.predecessorCollectionTaskIds);
            }
            if (this.parent.showOverAllocation) {
                this.renderOverAllocationContainer();
            }
        }
        this.updateWidthAndHeight();
        if (this.parent.isLoad) {
            this.parent.notify('selectRowByIndex', {});
        }
        if (this.parent.timelineModule.isZoomToFit) {
            this.parent.timelineModule.processZoomToFit();
        }
    };
    /**
     * @param {IGanttData[]} records .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.renderRangeContainer = function (records) {
        var recordLength = records.length;
        var count;
        var ganttRecord;
        var rangeCollection;
        if (this.parent.treeGrid.grid.filterSettings.columns.length === 0) {
            for (count = 0; count < recordLength; count++) {
                ganttRecord = records[count];
                rangeCollection = ganttRecord.ganttProperties.workTimelineRanges;
                if (rangeCollection) {
                    this.renderRange(rangeCollection, ganttRecord);
                }
            }
        }
    };
    GanttChart.prototype.getTopValue = function (currentRecord) {
        var updatedRecords = this.parent.getExpandedRecords(this.parent.currentViewData);
        var recordIndex = updatedRecords.indexOf(currentRecord);
        if (currentRecord.parentItem && recordIndex === -1) {
            var nestedParent = this.parent.getRecordByID(currentRecord.parentItem.taskId);
            recordIndex = updatedRecords.indexOf(nestedParent);
        }
        if (!currentRecord.expanded) {
            return (recordIndex * this.parent.rowHeight);
        }
        return ((recordIndex + 1) * this.parent.rowHeight);
    };
    // Recursively collects all child records in a hierarchy.
    GanttChart.prototype.getHierarchyChildRecords = function (records) {
        var hierarchyChildRecords = [];
        for (var _i = 0, records_1 = records; _i < records_1.length; _i++) {
            var record = records_1[_i];
            if (record.childRecords && record.childRecords.length > 0) {
                hierarchyChildRecords.push(record); // Include the current record
                this.collectHierarchyChildren(record.childRecords, hierarchyChildRecords);
            }
        }
        return hierarchyChildRecords;
    };
    // Helper function to append children records to the list.
    GanttChart.prototype.collectHierarchyChildren = function (records, accumulator) {
        for (var _i = 0, records_2 = records; _i < records_2.length; _i++) {
            var record = records_2[_i];
            if (record.childRecords && record.childRecords.length > 0) {
                accumulator.push(record);
                this.collectHierarchyChildren(record.childRecords, accumulator);
            }
        }
    };
    // Get height for range bar, considering hierarchy child records.
    GanttChart.prototype.getRangeHeight = function (data) {
        var heightDifference = Math.floor(this.parent.rowHeight - this.parent.chartRowsModule.taskBarHeight);
        if (!data.expanded && data.hasChildRecords) {
            return this.calculateCollapsedRowHeight(heightDifference);
        }
        var hierarchyChildLength = this.calculateHierarchyChildLength(data);
        return this.calculateExpandedRowHeight(data.childRecords.length, hierarchyChildLength, heightDifference);
    };
    // Calculates height when the row is collapsed.
    GanttChart.prototype.calculateCollapsedRowHeight = function (heightDifference) {
        return this.parent.rowHeight - heightDifference;
    };
    // Calculates the total length from hierarchy children.
    GanttChart.prototype.calculateHierarchyChildLength = function (data) {
        if (!data.childRecords || data.childRecords.length === 0) {
            return 0;
        }
        var hierarchyChildRecords = this.getHierarchyChildRecords(data.childRecords);
        var hierarchyChildDataLength = 0;
        for (var _i = 0, hierarchyChildRecords_1 = hierarchyChildRecords; _i < hierarchyChildRecords_1.length; _i++) {
            var item = hierarchyChildRecords_1[_i];
            if (item.childRecords.length !== 0 && item.expanded) {
                hierarchyChildDataLength += item.childRecords.length;
            }
        }
        return hierarchyChildDataLength;
    };
    // Calculates height when the row is expanded and incorporates child records.
    GanttChart.prototype.calculateExpandedRowHeight = function (childLength, hierarchyChildLength, heightDifference) {
        return ((childLength + hierarchyChildLength) * this.parent.rowHeight) - heightDifference;
    };
    GanttChart.prototype.renderRange = function (rangeCollection, currentRecord) {
        var topValue = 0;
        var rowIndex = this.parent.currentViewData.indexOf(currentRecord);
        if (!this.parent.allowTaskbarOverlap && this.parent.enableMultiTaskbar) {
            // Handling overallocation lines for multiple hierarchy-level record collapse actions - Task:887301
            var parentRecord = currentRecord.parentItem ? this.parent.getParentTask(currentRecord.parentItem) : null;
            if (currentRecord.parentItem &&
                parentRecord &&
                !parentRecord.expanded &&
                currentRecord.hasChildRecords &&
                !currentRecord.expanded) {
                topValue = this.parent.getRowByIndex(this.parent.getRootParent(currentRecord, 0).index).offsetTop;
            }
            else {
                var rowOffset = this.parent.getRowByIndex(rowIndex).offsetTop;
                topValue = !currentRecord.expanded ? rowOffset : rowOffset + this.parent.rowHeight;
            }
        }
        else {
            topValue = this.getTopValue(currentRecord);
        }
        var sameIDElement = this.rangeViewContainer.querySelector('.' + 'rangeContainer' + currentRecord.ganttProperties.rowUniqueID);
        if (sameIDElement) {
            sameIDElement.remove();
        }
        var parentDiv = createElement('div', {
            className: 'rangeContainer' + currentRecord.ganttProperties.rowUniqueID, styles: "top:" + topValue + "px; position: absolute;"
        });
        if (currentRecord.level === 0 && !currentRecord.expanded && isNullOrUndefined(currentRecord.parentItem)
            && !this.parent.enableMultiTaskbar) {
            return;
        }
        if (currentRecord.level > 0 && currentRecord.expanded && !this.parent.getRecordByID(currentRecord.parentItem.taskId).expanded) {
            return;
        }
        for (var i = 0; i < rangeCollection.length; i++) {
            var height = void 0;
            var node = this.parent.chartRowsModule.ganttChartTableBody.childNodes;
            if (!this.parent.allowTaskbarOverlap && !currentRecord.expanded && this.parent.enableMultiTaskbar) {
                // Render proper overallocation line height during collapseall actions - Task:872518
                var parentRecord = this.parent.getRootParent(currentRecord, 0);
                rowIndex = parentRecord.expanded ? rowIndex : this.parent.currentViewData.indexOf(parentRecord);
                height = parseInt(node[rowIndex].style.height, 10) -
                    (this.parent.rowHeight - this.parent.chartRowsModule.taskBarHeight);
            }
            else {
                height = this.getRangeHeight(currentRecord);
            }
            var leftDiv = createElement('div', {
                className: cls.rangeChildContainer + ' ' + 'e-leftarc', styles: (this.parent.enableRtl ? 'right:' : 'left:') +
                    ((this.parent.enableRtl ? rangeCollection[i].left + rangeCollection[i].width - 5 : rangeCollection[i].left) + "px;\n                top: " + Math.floor((this.parent.rowHeight - this.parent.chartRowsModule.taskBarHeight) / 2) + "px;\n                height: " + (height + 1) + "px; border-right: 0px;\n                z-index: " + ((this.parent.viewType === 'ProjectView') ? currentRecord.childRecords.length > 1 ? currentRecord.childRecords.length + 1 : currentRecord.childRecords.length : 6))
            });
            var rightDiv = createElement('div', {
                className: cls.rangeChildContainer + ' ' + 'e-rightarc',
                styles: (this.parent.enableRtl ? 'right:' : 'left:') + ((this.parent.enableRtl ? rangeCollection[i].left :
                    rangeCollection[i].left + rangeCollection[i].width - 5) + "px;\n                top: " + Math.floor((this.parent.rowHeight - this.parent.chartRowsModule.taskBarHeight) / 2) + "px; height: " + (height + 1) + "px;\n                border-left: 0px;\n                z-index: " + ((this.parent.viewType === 'ProjectView') ? currentRecord.childRecords.length > 1 ? currentRecord.childRecords.length + 1 : currentRecord.childRecords.length : 6))
            });
            parentDiv.appendChild(leftDiv);
            parentDiv.appendChild(rightDiv);
            this.rangeViewContainer.appendChild(parentDiv);
        }
        this.parent.ganttChartModule.chartBodyContent.appendChild(this.rangeViewContainer);
    };
    /**
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.renderTimelineContainer = function () {
        this.chartTimelineContainer =
            createElement('div', { className: cls.timelineHeaderContainer });
        if (this.parent.enableRtl) {
            this.chartTimelineContainer.style.borderLeftWidth = '1px';
            this.chartTimelineContainer.style.borderRightWidth = '0px';
        }
        this.chartTimelineContainer.setAttribute('role', 'presentation');
        this.chartElement.appendChild(this.chartTimelineContainer);
    };
    /**
     * initiate chart container
     *
     * @returns {void} .
     */
    GanttChart.prototype.renderBodyContainers = function () {
        this.chartBodyContainer = createElement('div', { className: cls.chartBodyContainer });
        this.chartElement.appendChild(this.chartBodyContainer);
        this.scrollElement = createElement('div', {
            className: cls.chartScrollElement + ' ' + cls.scrollContent, styles: 'position:relative;'
        });
        this.chartBodyContainer.appendChild(this.scrollElement);
        this.chartBodyContent = createElement('div', { className: cls.chartBodyContent, styles: 'position:relative; overflow:hidden ' });
        if (this.parent.virtualScrollModule && this.parent.enableVirtualization || this.parent.enableTimelineVirtualization) {
            this.parent.ganttChartModule.virtualRender.renderWrapper();
        }
        else {
            this.scrollElement.appendChild(this.chartBodyContent);
        }
        // this.parent.chartRowsModule.createChartTable();
        this.scrollObject = new ChartScroll(this.parent);
        //this.scrollObject.setWidth(this.chartProperties.width);
        var toolbarHeight = 0;
        if (!isNullOrUndefined(this.parent.toolbarModule) && !isNullOrUndefined(this.parent.toolbarModule.element)) {
            toolbarHeight = this.parent.toolbarModule.element.offsetHeight;
        }
        this.scrollObject.
            setHeight(this.parent.ganttHeight - this.chartTimelineContainer.offsetHeight - toolbarHeight);
    };
    /**
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.updateWidthAndHeight = function () {
        //empty row height
        var emptydivHeight = 36;
        var emptyHeight = this.parent.contentHeight === 0 ? this.parent.flatData.length > 1 ? emptydivHeight : 0 :
            this.parent.contentHeight;
        var contentElement = this.parent.element.getElementsByClassName('e-chart-scroll-container e-content')[0];
        if (emptyHeight >= contentElement['offsetHeight'] || this.parent.height === 'auto' || (contentElement['offsetHeight'] - emptyHeight) < emptydivHeight) {
            this.chartBodyContent.style.height = formatUnit(emptyHeight);
        }
        else {
            var scrollHeight = this.parent.element.getElementsByClassName('e-chart-rows-container')[0]['offsetHeight'];
            if (contentElement['offsetHeight'] >= scrollHeight) {
                this.chartBodyContent.style.height = contentElement['offsetHeight'] - 17 + 'px';
            }
            else {
                this.chartBodyContent.style.height = contentElement['offsetHeight'] + 'px';
            }
        } //let element: HTMLElement = this.chartTimelineContainer.querySelector('.' + cls.timelineHeaderTableContainer);
        // Handled zoomtofit horizontal scrollbar hide while performing different zooming levels in browser at virtualtimeline mode-Task(919516)
        if (this.parent.timelineModule.isZoomToFit && this.parent.enableTimelineVirtualization) {
            this.chartBodyContent.style.width = (this.parent.enableTimelineVirtualization
                && (this.parent.timelineModule.totalTimelineWidth > this.parent.element.offsetWidth * 3)) ?
                formatUnit(this.parent.element.offsetWidth * 3)
                : formatUnit(this.parent.timelineModule.totalTimelineWidth - this.parent.timelineModule['clientWidthDifference']);
        }
        else {
            this.chartBodyContent.style.width = (this.parent.enableTimelineVirtualization
                && (this.parent.timelineModule.totalTimelineWidth > this.parent.element.offsetWidth * 3)) ?
                formatUnit(this.parent.element.offsetWidth * 3)
                : formatUnit(this.parent.timelineModule.totalTimelineWidth);
        }
        // To handle the width of chartbody element after zoomtofit action followed by vertical scroll actions
        if (this.parent.timelineModule.isZoomedToFit && this.parent.enableVirtualization) {
            var clientWidth = Math.abs(this.parent.timelineModule.totalTimelineWidth -
                this.parent.element.getElementsByClassName('e-chart-scroll-container e-content')[0].clientWidth);
            this.parent.ganttChartModule.chartBodyContent.style.width =
                formatUnit(this.parent.timelineModule.totalTimelineWidth - clientWidth);
        }
        this.setVirtualHeight();
        this.parent.notify('updateHeight', {});
        this.parent.updateGridLineContainerHeight();
        this.updateLastRowBottomWidth();
    };
    GanttChart.prototype.setVirtualHeight = function () {
        if (this.parent.virtualScrollModule && this.parent.enableVirtualization) {
            var wrapper = getValue('virtualTrack', this.parent.ganttChartModule.virtualRender);
            wrapper.style.height = this.parent.treeGrid.element.getElementsByClassName('e-virtualtrack')[0].style.height;
            var wrapper1 = getValue('wrapper', this.parent.ganttChartModule.virtualRender);
            var treegridVirtualHeight = this.parent.treeGrid.element.getElementsByClassName('e-virtualtable')[0].style.transform;
            var virtualTable = document.getElementsByClassName('e-virtualtable')[1].style.transform;
            if (this.parent.enableTimelineVirtualization) {
                var translateXValue = void 0;
                // Firefox whitespace issue, Firefox omit y axis value if both axis values are 0 and returns translate(0px)-Task(888356)
                if (treegridVirtualHeight === 'translate(0px)' && navigator.userAgent.includes('Firefox')) {
                    treegridVirtualHeight = 'translate(0px, 0px)';
                }
                if (virtualTable !== '') {
                    translateXValue = virtualTable.match(/translate.*\((.+)\)/)[1].split(', ')[0];
                }
                else {
                    var chartTransform = this.parent.ganttChartModule.scrollElement.getElementsByClassName('e-virtualtable')[0].style.transform;
                    translateXValue = chartTransform.match(/translate.*\((.+)\)/)[1].split(', ')[0];
                }
                var translateYValue = treegridVirtualHeight.match(/translate.*\((.+)\)/)[1].split(', ')[1];
                wrapper1.style.transform = "translate(" + translateXValue + ", " + translateYValue + ")";
            }
            else {
                wrapper1.style.transform = treegridVirtualHeight;
            }
        }
    };
    /**
     * Method to update bottom border for chart rows
     *
     * @returns {void} .
     */
    GanttChart.prototype.updateLastRowBottomWidth = function () {
        if (this.parent.currentViewData.length > 0 && this.parent.height !== 'auto') {
            var expandedRecords = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
                this.parent.currentViewData : this.parent.expandedRecords;
            var lastExpandedRow = expandedRecords[expandedRecords.length - 1];
            var lastExpandedRowIndex = this.parent.currentViewData.indexOf(lastExpandedRow);
            var lastRow = this.parent.getRowByIndex(lastExpandedRowIndex);
            var table = this.parent.chartRowsModule.ganttChartTableBody;
            if (table.querySelectorAll('.e-chart-row-cell.e-chart-row-border.e-lastrow')) {
                removeClass(table.querySelectorAll('.e-chart-row-cell.e-chart-row-border.e-lastrow'), 'e-lastrow');
            }
            if (this.chartBodyContent.clientHeight < this.chartBodyContainer.clientHeight) {
                if (lastRow) {
                    addClass(lastRow.querySelectorAll('td'), 'e-lastrow');
                    var emptydivHeight = 36;
                    var emptyHeight = this.parent.contentHeight === 0 ? this.parent.flatData.length > 1 ? emptydivHeight : 0 :
                        this.parent.contentHeight;
                    var contentElement = this.parent.element.getElementsByClassName('e-chart-scroll-container e-content')[0];
                    if (emptyHeight >= contentElement['offsetHeight'] || (contentElement['offsetHeight'] - emptyHeight) < emptydivHeight) {
                        this.chartBodyContent.style.height = formatUnit(emptyHeight);
                    }
                    else {
                        var scrollHeight = this.parent.element.getElementsByClassName('e-chart-rows-container')[0]['offsetHeight'];
                        if (contentElement['offsetHeight'] >= scrollHeight) {
                            this.chartBodyContent.style.height = contentElement['offsetHeight'] - 17 + 'px';
                        }
                        else {
                            this.chartBodyContent.style.height = contentElement['offsetHeight'] + 'px';
                        }
                    }
                }
            }
        }
    };
    GanttChart.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('renderPanels', this.renderChartContainer);
        this.parent.off('recordsUpdated', this.renderChartElements);
        this.parent.off('dataReady', this.renderInitialContents);
        this.parent.off('tree-grid-created', this.renderChartContents);
        this.parent.off('destroy', this.destroy);
    };
    /**
     * Click event handler in chart side
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     */
    GanttChart.prototype.ganttChartMouseDown = function (e) {
        var cancel = false;
        if (e.type === 'touchstart' && e instanceof TouchEvent && e.touches && e.touches.length === 2) {
            // Calculate initial distance between two Pinch touch points
            this.initPinchDistance = this.calculatePinchDistance(e.touches[0], e.touches[1]);
            this.isPinching = true;
        }
        if (this.parent.allowTaskbarDragAndDrop && this.parent.editModule &&
            this.parent.editSettings.allowTaskbarEditing && !this.isPinching) {
            var editAction = this.parent.editModule.taskbarEditModule['getTaskBarAction'](e);
            if (editAction === 'ChildDrag' || editAction === 'ParentDrag' || editAction === 'MilestoneDrag' || editAction === 'ManualParentDrag') {
                var args = {
                    cancel: cancel,
                    data: this.getRecordByTaskBar(e.target),
                    target: e.target,
                    chartRow: closest(e.target, 'tr')
                };
                this.parent.trigger('rowDragStartHelper', args);
                cancel = args['cancel'];
            }
        }
        if (!cancel && !this.isPinching) {
            if (e.which !== 3 && this.parent.editSettings.allowTaskbarEditing) {
                this.parent.notify('chartMouseDown', e);
                this.parent.element.tabIndex = 0;
            }
            var isTaskbarEdited = false;
            if (this.parent.editSettings.allowTaskbarEditing && (this.parent.element.querySelector('.e-left-resize-gripper') || this.parent.element.querySelector('.e-left-connectorpoint-outer-div'))) {
                isTaskbarEdited = true;
            }
            if (!isTaskbarEdited || e.button === 2) {
                if (this.parent.editSettings.allowEditing && this.parent.treeGrid.element.getElementsByClassName('e-editedbatchcell').length > 0) {
                    this.parent.treeGrid.endEdit();
                }
            }
        }
    };
    GanttChart.prototype.calculatePinchDistance = function (touch1, touch2) {
        var dx = touch2.clientX - touch1.clientX;
        var dy = touch2.clientY - touch1.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    };
    GanttChart.prototype.ganttChartMouseClick = function (e) {
        if (this.parent.autoFocusTasks) {
            this.scrollToTarget(e); /** Scroll to task */
        }
        this.parent.notify('chartMouseClick', e);
    };
    GanttChart.prototype.ganttChartMouseUp = function (e) {
        if (e.type === 'touchend') {
            this.initPinchDistance = null;
            this.isPinching = false;
            var resizeCheck = this.parent.ganttChartModule.chartBodyContainer.querySelector('.e-taskbar-resize-div');
            if (!isNullOrUndefined(resizeCheck)) {
                resizeCheck.remove();
            }
            var Check = this.parent.ganttChartModule.chartBodyContainer.querySelector('.e-clone-taskbar') || this.parent.chartPane.querySelector('.e-clone-taskbar');
            if (!isNullOrUndefined(Check)) {
                var clonetbody = Check.parentElement;
                var cloneTable = clonetbody.parentElement;
                cloneTable.remove();
            }
            var falseline = this.parent.ganttChartModule.chartBodyContainer.querySelector('.e-gantt-false-line');
            if (!isNullOrUndefined(falseline)) {
                this.parent.editModule.taskbarEditModule.removeFalseLine(true);
            }
        }
        if (this.parent.editSettings.allowTaskbarEditing) {
            this.parent.notify('chartMouseUp', e);
        }
        if (!this.parent.editSettings.allowEditing) {
            var isTaskbarEdited = false;
            if (this.parent.editSettings.allowTaskbarEditing &&
                getValue('editModule.taskbarEditModule.isMouseDragged', this.parent) &&
                getValue('editModule.taskbarEditModule.taskBarEditAction', this.parent)) {
                isTaskbarEdited = true;
            }
            if (!isTaskbarEdited) {
                /** Expand/collapse action */
                var target = e.target;
                var isOnTaskbarElement = e.target.classList.contains(cls.taskBarMainContainer)
                    || closest(e.target, '.' + cls.taskBarMainContainer);
                if (closest(target, '.e-gantt-parent-taskbar') && !this.parent.editSettings.allowEditing && !this.parent.isAdaptive) {
                    this.chartExpandCollapseRequest(e);
                }
                else if (!isOnTaskbarElement && this.parent.autoFocusTasks) {
                    this.scrollToTarget(e); /** Scroll to task */
                }
            }
        }
    };
    /**
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     */
    GanttChart.prototype.scrollToTarget = function (e) {
        var row = closest(e.target, 'tr');
        if (row && this.parent.element.contains(row) &&
            (this.parent.element.querySelectorAll('.e-chart-rows-container')[0].contains(e.target) ||
                this.parent.element.querySelectorAll('.e-gridcontent')[0].contains(e.target)) &&
            this.parent.currentViewData.length > 0) {
            var rowIndex = getValue('rowIndex', closest(e.target, 'tr'));
            var dateObject = this.parent.currentViewData[rowIndex].ganttProperties.startDate;
            var dateObjLeft = this.parent.currentViewData[rowIndex].ganttProperties.left;
            if (!isNullOrUndefined(dateObject)) {
                var left = !this.parent.enableTimelineVirtualization ?
                    this.parent.dataOperation.getTaskLeft(dateObject, false) : {};
                if (this.parent.autoFocusTasks) {
                    if (this.parent.enableTimelineVirtualization) {
                        this.updateScrollLeft(dateObjLeft);
                    }
                    else {
                        this.updateScrollLeft(left);
                    }
                }
            }
        }
    };
    /**
     * To focus selected task in chart side
     *
     * @param {number} scrollLeft .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.updateScrollLeft = function (scrollLeft) {
        scrollLeft = scrollLeft > 0 ? scrollLeft : 0;
        scrollLeft = this.scrollElement.scrollWidth <= scrollLeft ? this.scrollElement.scrollWidth : scrollLeft;
        if ((this.scrollElement.offsetWidth + this.parent.ganttChartModule.scrollElement.scrollLeft) < scrollLeft
            || (this.scrollElement.scrollLeft > scrollLeft)) {
            this.scrollObject.setScrollLeft(scrollLeft - 50, this.parent.enableRtl ? -1 : 0);
        }
        //  this.parent.ganttChartModule.scrollObject.updateLeftPosition();
    };
    /**
     *  Method trigger while perform mouse up action.
     *
     * @param {PointerEvent} e .
     * @returns {void}
     * @private
     */
    GanttChart.prototype.mouseUp = function (e) {
        if (e.type === 'touchend') {
            this.initPinchDistance = null;
            this.isPinching = false;
        }
        if (!isNullOrUndefined(this.parent.editModule) && !isNullOrUndefined(this.parent.editModule.taskbarEditModule)) {
            this.parent.editModule.taskbarEditModule.removeFalseLine(false);
        }
        var resizeCheck = this.parent.element.querySelector('.e-taskbar-resize-div');
        if (!isNullOrUndefined(resizeCheck)) {
            resizeCheck.remove();
        }
        if (this.parent.allowTaskbarDragAndDrop && this.parent.editModule && this.parent.editModule.taskbarEditModule) {
            this.parent.editModule.taskbarEditModule['previousLeftValue'] = 0;
        }
        if (this.parent.allowRowDragAndDrop) {
            var ganttDragElemet = this.parent.element.querySelector('.e-ganttdrag');
            if (ganttDragElemet) {
                ganttDragElemet.remove();
            }
        }
        if (!this.isGanttElement) {
            this.parent.notify('chartMouseUp', e);
        }
        this.isGanttElement = false;
    };
    /**
     *  Method trigger while perform mouse up action.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.documentMouseUp = function (e) {
        if (e.type === 'touchend') {
            this.initPinchDistance = null;
            this.isPinching = false;
            this.previousPinchDistance = 0;
        }
        this.isGanttElement = true;
        if (e.target.classList.contains('e-treegridexpand') ||
            e.target.classList.contains('e-treegridcollapse')) {
            if (getValue('isEditCollapse', this.parent.treeGrid) === true) {
                setValue('isEditCollapse', false, this.parent.treeGrid);
            }
        }
        if (this.parent.allowRowDragAndDrop) {
            var ganttDragElemet = this.parent.element.querySelector('.e-ganttdrag');
            if (ganttDragElemet) {
                ganttDragElemet.remove();
            }
        }
        if (this.parent.isDestroyed || e.which === 3) {
            return;
        }
        var resizeCheck = this.parent.ganttChartModule.chartBodyContainer.querySelector('.e-taskbar-resize-div');
        if (!isNullOrUndefined(resizeCheck)) {
            resizeCheck.remove();
        }
        var Check = this.parent.element.getElementsByClassName('e-clone-taskbar')[0];
        if (!isNullOrUndefined(Check)) {
            var clonetbody = Check.parentElement;
            var cloneTable = clonetbody.parentElement;
            cloneTable.remove();
        }
        var isTaskbarEdited = false;
        if (this.parent.editSettings.allowTaskbarEditing &&
            getValue('editModule.taskbarEditModule.isMouseDragged', this.parent) &&
            getValue('editModule.taskbarEditModule.taskBarEditAction', this.parent)) {
            isTaskbarEdited = true;
        }
        this.parent.notify('chartMouseUp', e);
        if (this.parent.showActiveElement) {
            this.parent.showIndicator = true;
            if (!isNullOrUndefined(this.parent.loadingIndicator) && this.parent.loadingIndicator.indicatorType === 'Shimmer') {
                this.parent.hideMaskRow();
            }
            else {
                this.parent.hideSpinner();
            }
            if (this.focusedElement && !e.target.classList.contains('e-split-bar')) {
                this.focusedElement.tabIndex = this.focusedElement.tabIndex === 0 ? -1 : this.focusedElement.tabIndex;
                removeClass([this.focusedElement], 'e-active-container');
            }
        }
        if (!isTaskbarEdited) {
            /** Expand/collapse action */
            var target = e.target;
            var isOnTaskbarElement = e.target.classList.contains(cls.taskBarMainContainer)
                || closest(e.target, '.' + cls.taskBarMainContainer);
            if (closest(target, '.e-gantt-parent-taskbar') && !this.parent.editSettings.allowEditing) {
                this.chartExpandCollapseRequest(e);
            }
            else if (!isOnTaskbarElement && this.parent.autoFocusTasks) {
                this.scrollToTarget(e); /** Scroll to task */
            }
        }
        if (this.parent.editModule && this.parent.editModule.taskbarEditModule) {
            this.parent.editModule.taskbarEditModule.removeFalseLine(true);
        }
        if (!isNullOrUndefined(this.parent.onTaskbarClick) && !isTaskbarEdited) {
            var target = e.target;
            var taskbarElement = closest(target, '.e-gantt-parent-taskbar,.e-gantt-child-taskbar,.e-gantt-milestone');
            if (taskbarElement) {
                this.onTaskbarClick(e, target, taskbarElement);
            }
        }
    };
    /**
     * This event triggered when click on taskbar element
     *
     * @param {PointerEvent | KeyboardEventArgs} e .
     * @param {EventTarget} target .
     * @param {Element} taskbarElement .
     * @returns {void}
     */
    GanttChart.prototype.onTaskbarClick = function (e, target, taskbarElement) {
        var rowIndex;
        var chartRow = closest(target, 'tr');
        if (!isNullOrUndefined(chartRow)) {
            rowIndex = getValue('rowIndex', chartRow);
        }
        var data = this.getRecordByTarget(e);
        var args = {
            data: data,
            taskbarElement: taskbarElement,
            rowIndex: rowIndex,
            target: target
        };
        this.parent.trigger('onTaskbarClick', args);
    };
    /**
     *  Method trigger while perform mouse leave action.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.ganttChartLeave = function (e) {
        if (this.parent.editSettings.allowTaskbarEditing) {
            this.parent.notify('chartMouseLeave', e);
        }
    };
    /**
     *  Method trigger while perform mouse move action.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.ganttChartMove = function (e) {
        if (e.type === 'touchmove' && this.isPinching === true && e instanceof TouchEvent && e.touches && e.touches.length === 2) {
            // Calculate current distance between two touch points
            var currentPinchDistance = this.calculatePinchDistance(e.touches[0], e.touches[1]);
            if (Math.abs(this.previousPinchDistance - currentPinchDistance) > 15) {
                if (currentPinchDistance > this.previousPinchDistance) {
                    // Pinch out detected - Perform Zoom in
                    this.parent.timelineModule.processZooming(true);
                }
                else if (currentPinchDistance < this.previousPinchDistance) {
                    // Pinch in detected - Perform Zoom out
                    this.parent.timelineModule.processZooming(false);
                }
                this.previousPinchDistance = currentPinchDistance;
            }
        }
        if (this.parent.editSettings.allowTaskbarEditing && this.isPinching === false) {
            if (this.parent.element.getElementsByClassName('e-clone-taskbar').length > 0 && !this.parent.enableRtl) {
                var xValue = void 0;
                if (e.type === 'touchmove' || e.type === 'touchstart' || e.type === 'touchend') {
                    xValue = e['changedTouches'][0].pageX;
                }
                else {
                    xValue = e.pageX;
                }
                if (xValue <= this.parent.getOffsetRect(this.parent.ganttChartModule.chartElement).left) {
                    return;
                }
            }
            this.parent.notify('chartMouseMove', e);
            if (!isNullOrUndefined(this.parent.taskFields.dependency) && this.parent.connectorLineEditModule) {
                this.parent.connectorLineEditModule.updateConnectorLineEditElement(e);
            }
        }
    };
    /**
     *  Method trigger while perform right click action.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.contextClick = function (e) {
        if (this.parent.allowFiltering && this.parent.filterModule) {
            this.parent.filterModule.closeFilterOnContextClick(e.srcElement);
        }
        if (this.parent.allowTaskbarDragAndDrop) {
            var Check = this.parent.chartPane.querySelector('.e-clone-taskbar');
            if (!isNullOrUndefined(Check)) {
                var clonetbody = Check.parentElement;
                var cloneTable = clonetbody.parentElement;
                cloneTable.remove();
            }
        }
    };
    /**
     * Method to trigger while perform mouse move on Gantt.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.mouseMoveHandler = function (e) {
        if (!isNullOrUndefined(this.parent.onMouseMove) &&
            (this.parent.flatData.length ||
                e.target.classList.contains('e-header-cell-label') ||
                e.target.classList.contains('e-headercell'))) {
            var target = e.target;
            var args = { originalEvent: e };
            var element = closest(target, '.e-chart-row-cell,.e-connector-line-container,' +
                '.e-event-markers,.e-header-cell-label,.e-rowcell,.e-headercell,.e-indicator-span');
            if (element) {
                var rowData = void 0;
                var rowElement = closest(target, '.e-rowcell,.e-chart-row-cell');
                var columnElement = closest(target, '.e-rowcell,.e-headercell');
                if (rowElement) {
                    rowData = this.parent.ganttChartModule.getRecordByTarget(e);
                    args.data = rowData;
                }
                if (columnElement) {
                    var cellIndex = getValue('cellIndex', columnElement);
                    args.column = this.parent.treeGrid.columns[cellIndex];
                }
                if (closest(target, '.e-indicator-span')) {
                    var index = 0;
                    var indicators = rowData.ganttProperties.indicators;
                    if (indicators.length > 1) {
                        for (index = 0; index < indicators.length; index++) {
                            if (indicators[index].name === (element.innerText).trim()) {
                                break;
                            }
                        }
                    }
                    args.indicator = indicators[index];
                }
                if (closest(target, '.e-connector-line-container')) {
                    var obj = {};
                    obj.target = element;
                    args.predecessor = this.parent.tooltipModule.getPredecessorTooltipData(obj);
                }
                if (closest(target, '.e-event-markers')) {
                    var obj = {};
                    obj.target = element;
                    args.eventMarkers = this.parent.tooltipModule.getMarkerTooltipData(obj);
                }
                if (target.classList.contains('e-header-cell-label')) {
                    args.date = new Date(target.dataset.content);
                }
            }
            this.parent.trigger('onMouseMove', args);
        }
    };
    /**
     * Double click handler for chart
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     */
    GanttChart.prototype.doubleClickHandler = function (e) {
        var target = e.target;
        var row = closest(target, 'tr');
        var rowIndex = getValue('rowIndex', row);
        var rowData = this.parent.ganttChartModule.getRecordByTarget(e);
        if (this.parent.editSettings.allowEditing && this.parent.treeGrid.element.getElementsByClassName('e-editedbatchcell').length > 0) {
            this.parent.treeGrid.endEdit();
        }
        this.parent.notify('chartDblClick', e);
        var args = {
            row: row,
            rowData: rowData,
            rowIndex: rowIndex,
            target: target
        };
        this.recordDoubleClick(args);
    };
    /**
     * To trigger record double click event.
     *
     * @param {RecordDoubleClickEventArgs} args .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.recordDoubleClick = function (args) {
        this.parent.trigger('recordDoubleClick', args);
    };
    /**
     * @param {PointerEvent | KeyboardEventArgs} e .
     * @returns {IGanttData} .
     * @private
     */
    GanttChart.prototype.getRecordByTarget = function (e) {
        var ganttData;
        var row = closest(e.target, 'div.' + cls.taskBarMainContainer);
        if (!isNullOrUndefined(row)) {
            var id = row.getAttribute('rowUniqueId');
            ganttData = this.parent.getRecordByID(id);
        }
        else {
            row = closest(e.target, 'tr');
            if (row) {
                var rowIndex = getValue('rowIndex', closest(e.target, 'tr'));
                ganttData = this.parent.currentViewData[rowIndex];
            }
        }
        return ganttData;
    };
    /**
     * To get gantt chart row elements
     *
     * @returns {NodeListOf<Element>} .
     * @private
     */
    GanttChart.prototype.getChartRows = function () {
        if (document.getElementById(this.parent.element.id + 'GanttTaskTableBody') !== null) {
            return document.getElementById(this.parent.element.id + 'GanttTaskTableBody').querySelectorAll('.e-chart-row');
        }
        else {
            return null;
        }
    };
    /**
     * Expand Collapse operations from gantt chart side
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.chartExpandCollapseRequest = function (e) {
        if (this.parent.enableMultiTaskbar) {
            return;
        }
        var target = e.target;
        var parentElement = closest(target, '.e-gantt-parent-taskbar');
        var record = this.getRecordByTarget(e);
        var chartRow = closest(target, 'tr');
        var rowIndex = getValue('rowIndex', chartRow);
        var gridRow = this.parent.treeGrid.getRows()[rowIndex];
        var args = { data: record, gridRow: gridRow, chartRow: chartRow, cancel: false };
        this.isExpandCollapseFromChart = true;
        if (parentElement.classList.contains('e-row-expand')) {
            this.collapseGanttRow(args);
        }
        else if (parentElement.classList.contains('e-row-collapse')) {
            this.expandGanttRow(args);
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.reRenderConnectorLines = function () {
        this.parent.connectorLineModule.dependencyViewContainer.innerHTML = '';
        this.parent.connectorLineIds = [];
        this.parent.updatedConnectorLineCollection = [];
        this.parent.predecessorModule.createConnectorLinesCollection();
        this.parent.connectorLineModule.renderConnectorLines(this.parent.updatedConnectorLineCollection);
        var criticalModule = this.parent.criticalPathModule;
        if (this.parent.enableCriticalPath && criticalModule && criticalModule.criticalPathCollection) {
            criticalModule.criticalConnectorLine(criticalModule.criticalPathCollection, criticalModule.detailPredecessorCollection, true, criticalModule.predecessorCollectionTaskIds);
        }
    };
    /**
     * To collapse gantt rows
     *
     * @param {object} args .
     * @param {boolean} isCancel .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.collapseGanttRow = function (args) {
        var _this = this;
        this.parent.trigger('collapsing', args, function (arg) {
            if (_this.isExpandCollapseFromChart && !getValue('cancel', arg)) {
                _this.collapsedGanttRow(arg);
            }
            _this.isExpandCollapseFromChart = false;
        });
    };
    /**
     * @returns {void} .
     * @param {object} args .
     * @private
     */
    GanttChart.prototype.collapsedGanttRow = function (args) {
        var _this = this;
        var record;
        if (this.parent.loadChildOnDemand && this.parent.taskFields.hasChildMapping) {
            record = this.parent.currentViewData.filter(function (item) { return item.ganttProperties[_this.parent.taskFields.id] === args['data'][_this.parent.taskFields.id]; })[0];
        }
        else {
            record = getValue('data', args);
        }
        if ((isNullOrUndefined(args['gridRow']) && this.parent.enableVirtualization) || isNullOrUndefined(args['chartRow'])) {
            if (record) {
                record.expanded = false;
            }
            return;
        }
        if (this.isExpandCollapseFromChart) {
            this.expandCollapseChartRows('collapse', getValue('chartRow', args), record, null);
            var idField_1 = this.parent.taskFields.id;
            if (this.parent.loadChildOnDemand && this.parent.taskFields.hasChildMapping) {
                var gridRec = this.parent.treeGrid.getCurrentViewRecords().filter(function (item) { return item[idField_1] === args['data'][idField_1]; })[0];
                this.parent.treeGrid.collapseRow(getValue('gridRow', args), gridRec);
            }
            else {
                this.parent.treeGrid.collapseRow(getValue('gridRow', args), record);
            }
            this.isExpandCollapseFromChart = false;
        }
        else {
            this.expandCollapseChartRows('collapse', getValue('chartRow', args), record, null);
        }
        // To render the child record on parent row after collapsing
        if (this.parent.viewType === 'ResourceView' || this.parent.viewType === 'ProjectView') {
            this.renderMultiTaskbar(record);
        }
        if (!this.parent.enableVirtualization) {
            this.parent.updateContentHeight();
        }
        this.updateWidthAndHeight();
        this.reRenderConnectorLines();
        getValue('chartRow', args).setAttribute('aria-expanded', 'false');
    };
    /**
     * To expand gantt rows
     *
     * @returns {void} .
     * @param {object} args .
     * @param {boolean} isCancel .
     * @private
     */
    GanttChart.prototype.expandGanttRow = function (args) {
        var _this = this;
        this.parent.trigger('expanding', args, function (arg) {
            if (_this.isExpandCollapseFromChart && !getValue('cancel', arg)) {
                _this.expandedGanttRow(arg);
            }
            _this.isExpandCollapseFromChart = false;
        });
    };
    /**
     * @returns {void} .
     * @param {object} args .
     * @private
     */
    GanttChart.prototype.expandedGanttRow = function (args) {
        var _this = this;
        var record;
        if (this.parent.loadChildOnDemand && this.parent.taskFields.hasChildMapping) {
            record = this.parent.currentViewData.filter(function (item) { return item.ganttProperties.taskId === args['data'][_this.parent.taskFields.id]; })[0];
        }
        else {
            record = getValue('data', args);
        }
        if ((isNullOrUndefined(args['gridRow']) && this.parent.enableVirtualization) || isNullOrUndefined(args['chartRow'])) {
            if (record) {
                record.expanded = true;
            }
            return;
        }
        if (this.isExpandCollapseFromChart) {
            this.expandCollapseChartRows('expand', getValue('chartRow', args), record, null);
            var idField_2 = this.parent.taskFields.id;
            if (this.parent.loadChildOnDemand && this.parent.taskFields.hasChildMapping) {
                var gridRec = this.parent.treeGrid.getCurrentViewRecords().filter(function (item) { return item[idField_2] === args['data'][idField_2]; })[0];
                this.parent.treeGrid.expandRow(getValue('gridRow', args), gridRec);
            }
            else {
                this.parent.treeGrid.expandRow(getValue('gridRow', args), record);
            }
            this.isExpandCollapseFromChart = false;
        }
        else {
            if (!this.parent.isExpandCollapseLevelMethod) {
                this.expandCollapseChartRows('expand', getValue('chartRow', args), record, null);
            }
            this.parent.isExpandCollapseLevelMethod = false;
        }
        // To render the child record on parent row after expanding.
        if (this.parent.viewType === 'ResourceView' || this.parent.viewType === 'ProjectView') {
            this.renderMultiTaskbar(record);
        }
        if (!this.parent.enableVirtualization) {
            this.parent.updateContentHeight();
        }
        this.updateWidthAndHeight();
        this.reRenderConnectorLines();
        getValue('chartRow', args).setAttribute('aria-expanded', 'true');
    };
    GanttChart.prototype.renderMultiTaskbar = function (record) {
        if (this.parent.enableMultiTaskbar) {
            this.parent.chartRowsModule.refreshRecords([record], true);
        }
        else if (this.parent.showOverAllocation) {
            this.parent.ganttChartModule.renderRangeContainer(this.parent.currentViewData);
        }
    };
    /**
     * On expand collapse operation row properties will be updated here.
     *
     * @param {string} action .
     * @param {Node} rowElement .
     * @param {IGanttData} record .
     * @param {boolean} isChild .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.expandCollapseChartRows = function (action, rowElement, record, isChild) {
        var displayType;
        if (action === 'expand') {
            displayType = 'table-row';
            if (!isChild) {
                record.expanded = true;
            }
            var targetElement = rowElement.querySelectorAll('.e-row-collapse');
            for (var t = 0; t < targetElement.length; t++) {
                addClass([targetElement[t]], 'e-row-expand');
                removeClass([targetElement[t]], 'e-row-collapse');
            }
        }
        else if (action === 'collapse') {
            displayType = 'none';
            if (!isChild) {
                record.expanded = false;
            }
            var targetElement = rowElement.querySelectorAll('.e-row-expand');
            for (var t = 0; t < targetElement.length; t++) {
                addClass([targetElement[t]], 'e-row-collapse');
                removeClass([targetElement[t]], 'e-row-expand');
            }
        }
        if (!this.parent.enableVirtualization) {
            var childRecords = record.childRecords;
            var chartRows = this.getChartRows();
            var rows = [];
            for (var i = 0; i < chartRows.length; i++) {
                if (chartRows[i].classList.contains('gridrowtaskId' +
                    record.ganttProperties.rowUniqueID +
                    'level' +
                    (record.level + 1))) {
                    rows.push(chartRows[i]);
                }
            }
            for (var i = 0; i < rows.length; i++) {
                rows[i].style.display = displayType;
                if (childRecords[i].childRecords &&
                    childRecords[i].childRecords.length &&
                    (action === 'collapse' ||
                        childRecords[i].expanded ||
                        this.isExpandAll)) {
                    this.expandCollapseChartRows(action, rows[i], childRecords[i], true);
                }
            }
        }
    };
    /**
     * Public method to expand or collapse all the rows of Gantt
     *
     * @returns {void}
     * @param {string} action .
     * @private
     */
    GanttChart.prototype.expandCollapseAll = function (action) {
        if (action === 'expand') {
            this.isExpandAll = true;
            this.parent.treeGrid.expandAll();
        }
        else {
            this.isCollapseAll = true;
            this.parent.treeGrid.collapseAll();
            if (this.isCollapseAll && !this.parent.allowTaskbarOverlap) {
                var treeGridContentHeight = this.parent.enableRtl ? this.parent['element'].getElementsByClassName('e-content')[2].children[0]['offsetHeight'] :
                    this.parent['element'].getElementsByClassName('e-content')[0].children[0]['offsetHeight'];
                this.parent.contentHeight = treeGridContentHeight;
                document.getElementsByClassName('e-chart-rows-container')[0]['style'].height = this.parent.contentHeight + 'px';
            }
        }
        this.isExpandAll = false;
        this.isCollapseAll = false;
    };
    /**
     * Public method to expand particular level of rows.
     *
     * @returns {void} .
     * @param {number} level .
     * @private
     */
    GanttChart.prototype.expandAtLevel = function (level) {
        this.parent.treeGrid.expandAtLevel(level);
    };
    /**
     * Public method to collapse particular level of rows.
     *
     * @returns {void} .
     * @param {number} level .
     * @private
     */
    GanttChart.prototype.collapseAtLevel = function (level) {
        if (this.parent.enableVirtualization) {
            this.parent.isExpandCollapseLevelMethod = true;
        }
        this.parent.treeGrid.collapseAtLevel(level);
    };
    /**
     * Event Binding for gantt chart click
     *
     * @returns {void} .
     */
    GanttChart.prototype.wireEvents = function () {
        var _this = this;
        var isIE11Pointer = Browser.isPointer; // eslint-disable-line
        var mouseDown = Browser.touchStartEvent;
        var mouseUp = Browser.touchEndEvent;
        var mouseMove = Browser.touchMoveEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        EventHandler.add(this.parent.chartPane, mouseDown, this.ganttChartMouseDown, this);
        EventHandler.add(this.parent.chartPane, cancel, this.ganttChartLeave, this);
        EventHandler.add(this.parent.chartPane, mouseMove, this.ganttChartMove, this);
        EventHandler.add(this.parent.chartPane, 'wheel', this.onWheelZoom, this);
        if (this.parent.isAdaptive) {
            // pointerdown event which is used to detect double click for both mobile mode
            var tapTimeout_1;
            EventHandler.add(this.parent.chartRowsModule.ganttChartTableBody, 'pointerdown', function (event) {
                if (tapTimeout_1) {
                    clearTimeout(tapTimeout_1);
                    tapTimeout_1 = null;
                    _this.doubleClickHandler(event); // Trigger double-click action
                }
                else {
                    tapTimeout_1 = setTimeout(function () {
                        tapTimeout_1 = null; // Reset after timeout
                    }, 200); // Wait 300ms to detect second tap
                }
            }, this);
            EventHandler.add(this.parent.chartPane, click, this.ganttChartMouseClick, this);
            EventHandler.add(this.parent.chartPane, mouseUp, this.ganttChartMouseUp, this);
        }
        if (!this.parent.isAdaptive) {
            EventHandler.add(this.parent.chartRowsModule.ganttChartTableBody, 'dblclick', this.doubleClickHandler, this);
            EventHandler.add(this.parent.element, mouseUp, this.documentMouseUp, this);
            EventHandler.add(document, mouseUp, this.mouseUp, this);
        }
        EventHandler.add(this.parent.element, 'mousemove', this.mouseMoveHandler, this);
        EventHandler.add(document.body, 'contextmenu', this.contextClick, this);
        EventHandler.add(document, 'mouseup', this.contextClick, this);
    };
    GanttChart.prototype.unWireEvents = function () {
        var isIE11Pointer = Browser.isPointer; // eslint-disable-line
        var mouseDown = Browser.touchStartEvent;
        var mouseUp = Browser.touchEndEvent;
        var mouseMove = Browser.touchMoveEvent;
        var cancel = isIE11Pointer ? 'pointerleave' : 'mouseleave';
        if (!isNullOrUndefined(this.parent.chartRowsModule.ganttChartTableBody)) {
            EventHandler.remove(this.parent.chartRowsModule.ganttChartTableBody, mouseDown, this.ganttChartMouseDown);
        }
        if (!isNullOrUndefined(this.parent.chartPane)) {
            EventHandler.remove(this.parent.chartPane, cancel, this.ganttChartLeave);
            EventHandler.remove(this.parent.chartPane, mouseMove, this.ganttChartMove);
            EventHandler.remove(this.parent.chartPane, 'wheel', this.onWheelZoom);
            EventHandler.remove(this.parent.chartPane, mouseDown, this.ganttChartMouseDown);
        }
        if (this.parent.isAdaptive) {
            if (!isNullOrUndefined(this.parent.chartPane)) {
                EventHandler.remove(this.parent.chartPane, click, this.ganttChartMouseClick);
                EventHandler.remove(this.parent.chartPane, mouseUp, this.ganttChartMouseUp);
            }
        }
        if (!this.parent.isAdaptive) {
            if (!isNullOrUndefined(this.parent.element)) {
                EventHandler.remove(this.parent.element, mouseUp, this.documentMouseUp);
            }
            if (!isNullOrUndefined(document)) {
                EventHandler.remove(document, mouseUp, this.mouseUp);
            }
        }
        if (!isNullOrUndefined(this.parent.element)) {
            EventHandler.remove(this.parent.element, 'mousemove', this.mouseMoveHandler);
        }
        if (!isNullOrUndefined(document)) {
            EventHandler.remove(document, 'mouseup', this.contextClick);
            if (!isNullOrUndefined(document.body)) {
                EventHandler.remove(document.body, 'contextmenu', this.contextClick);
            }
        }
        if (!isNullOrUndefined(this.parent.chartRowsModule.ganttChartTableBody)) {
            EventHandler.remove(this.parent.chartRowsModule.ganttChartTableBody, 'dblclick', this.doubleClickHandler);
        }
    };
    // Triggers while perform ctrl+mouse wheel Pinch IN/OUT actions
    GanttChart.prototype.onWheelZoom = function (e) {
        if (e.ctrlKey) {
            e.preventDefault();
            var zoomIn1_1 = e.deltaY < 0;
            // Differentiating between touchpad and mouse wheel
            var isTouchpad_1 = false;
            if (Math.abs(e.deltaY) < 75) { // Smaller deltaY typically indicates touchpad
                isTouchpad_1 = true;
            }
            if (this.debounceTimeout) {
                if (((this.debounceTimeoutNext + 20) > this.debounceTimeout)) {
                    clearTimeout(this.debounceTimeout);
                }
                if ((this.debounceTimeoutNext + 20) <= this.debounceTimeout || !this.debounceTimeoutNext) {
                    this.debounceTimeoutNext = this.debounceTimeout;
                }
            }
            this.debounceTimeout = setTimeout(function () {
                var verticalScrollDelta = Math.abs(e.deltaY);
                // Adjust threshold based on the input method
                var isValidScrollDelta = isTouchpad_1
                    ? (verticalScrollDelta > 0.5 && verticalScrollDelta < 15)
                    : (verticalScrollDelta > 5 && verticalScrollDelta <= 200);
                if (isValidScrollDelta) {
                    this.parent.timelineModule.processZooming(zoomIn1_1);
                }
            }.bind(this), 100);
        }
    };
    /**
     * To get record by taskbar element.
     *
     * @param {Element} target .
     * @returns {IGanttData} .
     * @private
     */
    GanttChart.prototype.getRecordByTaskBar = function (target) {
        var item;
        if (this.parent.enableVirtualization && this.parent.enableMultiTaskbar) {
            item = this.parent.flatData[this.getIndexByTaskBar(target)];
        }
        else {
            item = this.parent.currentViewData[this.getIndexByTaskBar(target)];
        }
        return item;
    };
    GanttChart.prototype.updateElement = function (next, currentColumn, isTab, isInEditedState, row) {
        if (this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].field === this.parent.taskFields.progress) {
            var rowIndex = row.index;
            do {
                if (row.hasChildRecords) {
                    next = this.getNextElement(next, isTab, isInEditedState);
                }
                currentColumn = this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1];
                rowIndex = this.parent.treeGrid.getRows().indexOf(next.parentElement);
            } while (!currentColumn.allowEditing);
            this.parent.treeGrid.saveCell();
            this.parent.treeGrid.editCell(rowIndex, this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].field);
        }
        return next;
    };
    /**
     * Trigger Tab & Shift + Tab keypress to highlight active element.
     *
     * @param {KeyboardEventArgs} e .
     * @returns {void} .
     * @private
     */
    GanttChart.prototype.onTabAction = function (e) {
        this.parent.treeGrid.grid.enableHeaderFocus = this.parent.enableHeaderFocus;
        var toolbarItems = document.getElementsByClassName('e-toolbar-item');
        var isInEditedState = this.parent.editModule && this.parent.editModule.cellEditModule &&
            this.parent.editModule.cellEditModule.isCellEdit;
        if (!this.parent.showActiveElement && !isInEditedState) {
            return;
        }
        var $target = isInEditedState ? e.target.closest('.e-rowcell') : e.target;
        if (this.parent.element.querySelectorAll('.e-focused').length > 0) {
            $target = this.parent.element.querySelectorAll('.e-focused')[0];
        }
        if ($target && !($target.classList.contains('e-toolbar-item') ||
            $target.classList.contains('e-input') || $target.classList.contains('e-btn'))) {
            this.currentToolbarIndex = -1;
        }
        if ($target.closest('.e-rowcell') || $target.closest('.e-chart-row')) {
            this.parent.focusModule.setActiveElement($target);
        }
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.focusedRowIndex = $target.closest('.e-rowcell') ? $target.parentElement.rowIndex :
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            $target.closest('.e-chart-row') ? $target.closest('.e-chart-row').rowIndex : -1;
        var isTab = (e.action === 'tab') ? true : false;
        var nextElement = this.getNextElement($target, isTab, isInEditedState);
        if (nextElement && (nextElement === 'noNextRow' || nextElement.classList.contains('e-rowdragheader'))) {
            // eslint-disable-next-line
            (nextElement === 'noNextRow' && this.parent.treeGrid.element.getElementsByClassName('e-editedbatchcell').length > 0) ? this.parent.treeGrid.saveCell() : '';
            nextElement = null;
        }
        if (nextElement && $target.classList.contains('e-headercell')) {
            var colIndex = parseInt(nextElement.getAttribute('aria-colindex'), 10) - 1;
            if (e.action === 'shiftTab') {
                while (colIndex !== -1 && !this.parent.treeGrid.columns[colIndex]['visible']) {
                    colIndex = colIndex - 1;
                }
                if (colIndex !== -1) {
                    colIndex = this.parent.allowRowDragAndDrop ? colIndex + 1 : colIndex;
                    nextElement = document.getElementsByClassName('e-columnheader')[0].childNodes[colIndex];
                }
                else {
                    var toolbarItems_1 = document.getElementsByClassName('e-toolbar-item');
                    for (var i = toolbarItems_1.length - 1; i > 0; i--) {
                        if (!document.getElementsByClassName('e-toolbar-item')[i].classList.contains('e-hidden')) {
                            nextElement = document.getElementsByClassName('e-toolbar-item')[i];
                            this.currentToolbarIndex = i;
                            break;
                        }
                    }
                }
            }
            else {
                while (!this.parent.treeGrid.columns[colIndex]['visible']) {
                    colIndex = colIndex + 1;
                }
                colIndex = this.parent.allowRowDragAndDrop ? colIndex + 1 : colIndex;
                nextElement = document.getElementsByClassName('e-columnheader')[0].childNodes[colIndex];
            }
        }
        if (!nextElement && $target.classList.contains('e-headercell') && e.action === 'tab') {
            nextElement = document.getElementsByClassName('e-timeline-header-container')[0];
        }
        if (!nextElement && ($target.classList.contains('e-headercell') || $target.classList.contains('e-toolbar-item') || $target.classList.contains('e-treegrid') ||
            $target.classList.contains('e-input') || $target.classList.contains('e-btn')) && this.parent.toolbarModule && this.parent.toolbar.length > 0) {
            var itemIndex = this.currentToolbarIndex !== -1 ? (e.action === 'tab' ? this.currentToolbarIndex + 1 :
                this.currentToolbarIndex - 1) : (e.action === 'shiftTab' ? toolbarItems.length - 1 : 1);
            var isUpdated = false;
            if (itemIndex !== -1 && (e.action === 'shiftTab' || (e.action === 'tab' && itemIndex < toolbarItems.length))) {
                do {
                    if (!toolbarItems[itemIndex].classList.contains('e-hidden')) {
                        nextElement = toolbarItems[itemIndex];
                        nextElement.setAttribute('tabindex', '-1');
                        if (nextElement.querySelector('.e-btn') === $target) {
                            // eslint-disable-next-line
                            e.action === 'tab' ? itemIndex++ : itemIndex--;
                            nextElement = toolbarItems[itemIndex];
                        }
                        if (nextElement.querySelector('.e-btn')) {
                            (nextElement.querySelector('.e-btn')).setAttribute('tabindex', '0');
                        }
                        isUpdated = true;
                        this.currentToolbarIndex = itemIndex;
                    }
                    else {
                        // eslint-disable-next-line
                        e.action === 'tab' ? itemIndex++ : itemIndex--;
                    }
                } while (!isUpdated);
            }
        }
        if (e.action === 'tab' && !nextElement && (this.currentToolbarIndex === toolbarItems.length - 1 &&
            ($target.classList.contains('e-toolbar-item') || $target.classList.contains('e-input') ||
                $target.classList.contains('e-btn')))) {
            for (var i = 0; i < this.parent.treeGrid.columns.length; i++) {
                if (this.parent.treeGrid.columns[i]['visible']) {
                    nextElement = document.getElementsByClassName('e-columnheader')[0].childNodes[i];
                    break;
                }
            }
        }
        if (e.action === 'shiftTab' && !nextElement && !$target.classList.contains('e-headercell')) {
            nextElement = document.getElementsByClassName('e-timeline-header-container')[0];
        }
        if (e.action === 'shiftTab' && $target.classList.contains('e-timeline-header-container')) {
            for (var i = this.parent.treeGrid.columns.length; i > 0; i--) {
                if (this.parent.treeGrid.columns[i - 1]['visible']) {
                    nextElement = document.getElementsByClassName('e-columnheader')[0].childNodes[i - 1];
                    break;
                }
            }
        }
        this.tempNextElement = nextElement;
        if (!isNullOrUndefined(nextElement) && !isNullOrUndefined(nextElement['cellIndex'])) {
            if (this.parent.allowRowDragAndDrop) {
                this.childrenIndex = nextElement['cellIndex'];
                this.nextElementIndex = nextElement['cellIndex'] - 1;
            }
            else {
                this.childrenIndex = nextElement['cellIndex'];
                this.nextElementIndex = nextElement['cellIndex'];
            }
            if (this.nextElementIndex !== -1 && !this.parent.ganttColumns[this.nextElementIndex]['allowEditing'] &&
                this.parent.ganttColumns[this.nextElementIndex]['field'] !== this.parent.taskFields.id) {
                this.isEditableElement = true;
            }
            else {
                this.isEditableElement = false;
            }
        }
        if (nextElement === 'noNextRow') {
            this.manageFocus($target, 'remove', true);
            return;
        }
        if (typeof nextElement !== 'string') {
            if ($target.closest('.e-chart-row-cell') && nextElement.closest('.e-rowcell')) {
                this.preventScrollIntoView = true;
            }
            if ($target.classList.contains('e-rowcell') || $target.closest('.e-chart-row-cell') ||
                $target.classList.contains('e-headercell') || $target.closest('.e-segmented-taskbar') ||
                $target.classList.contains('e-timeline-header-container')) {
                e.preventDefault();
            }
            if (isTab && $target.classList.contains('e-rowdragdrop')) {
                this.parent.treeGrid.grid.notify('key-pressed', e);
                return;
            }
            if ($target.classList.contains('e-rowcell') && (nextElement && nextElement.classList.contains('e-rowcell')) ||
                $target.classList.contains('e-headercell')) { // eslint-disable-line                                                                                                                                                                                                                                    
                if (isTab) {
                    if (this.parent.editSettings.allowNextRowEdit) {
                        var rowData = this.parent.currentViewData[this.focusedRowIndex];
                        var columnName = this.parent.ganttColumns[parseInt(nextElement.getAttribute('aria-colindex'), 10) - 1].field;
                        if (rowData.hasChildRecords) {
                            if (columnName === this.parent.taskFields.endDate || columnName ===
                                this.parent.taskFields.duration || columnName === this.parent.taskFields.dependency ||
                                columnName === this.parent.taskFields.progress || columnName === this.parent.taskFields.work ||
                                columnName === this.parent.taskFields.type || columnName === 'taskType') {
                                this.parent.treeGrid.grid.endEdit();
                                this.parent.treeGrid.grid.notify('key-pressed', e);
                            }
                            else if (columnName === this.parent.taskFields.name || columnName === this.parent.taskFields.startDate) {
                                this.parent.treeGrid.grid.notify('key-pressed', e);
                            }
                            else {
                                this.parent.treeGrid.grid.notify('key-pressed', e);
                                if (isInEditedState) {
                                    this.parent.treeGrid.editCell(this.focusedRowIndex, columnName);
                                }
                            }
                        }
                        else {
                            this.parent.treeGrid.grid.notify('key-pressed', e);
                        }
                    }
                    else {
                        if (!nextElement || (nextElement && !nextElement.classList.contains('e-headercell') && !nextElement.classList.contains('e-timeline-header-container'))) {
                            if ($target.classList.contains('e-headercell')) {
                                this.manageFocus($target, 'remove', false);
                            }
                            /* eslint-disable-next-line */
                            var row = this.parent.currentViewData[$target.parentElement.rowIndex];
                            var next = nextElement;
                            if (row.hasChildRecords &&
                                (this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].field === this.parent.taskFields.progress ||
                                    !this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].allowEditing) &&
                                this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].field !== this.parent.taskFields.id
                                && $target.classList.contains('e-editedbatchcell')) {
                                var currentColumn = void 0;
                                next = this.updateElement(next, currentColumn, isTab, isInEditedState, row);
                                while (!this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].allowEditing) {
                                    next = this.getNextElement(next, isTab, isInEditedState);
                                }
                                next = this.updateElement(next, currentColumn, isTab, isInEditedState, row);
                            }
                            else if (!nextElement || $target.classList.contains('e-editedbatchcell')) {
                                this.parent.treeGrid.grid.notify('key-pressed', e);
                            }
                        }
                    }
                }
                else {
                    if (nextElement && !nextElement.classList.contains('e-headercell') && nextElement.classList.contains('e-rowcell')
                        && !nextElement.classList.contains('e-toolbar-item')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var row = this.parent.currentViewData[$target.parentElement.rowIndex];
                        var next = nextElement;
                        if (row.hasChildRecords &&
                            (this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].field === this.parent.taskFields.progress ||
                                !this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].allowEditing) &&
                            this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].field !== this.parent.taskFields.id
                            && $target.classList.contains('e-editedbatchcell')) {
                            var currentColumn = void 0;
                            next = this.updateElement(next, currentColumn, isTab, isInEditedState, row);
                            while (!this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].allowEditing) {
                                next = this.getNextElement(next, isTab, isInEditedState);
                            }
                            next = this.updateElement(next, currentColumn, isTab, isInEditedState, row);
                        }
                        else if (parseInt(next.parentElement.getAttribute('aria-rowindex'), 10) - 1 !== 0 &&
                            parseInt(next.getAttribute('aria-colindex'), 10) - 1 === 0 &&
                            this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].field === this.parent.taskFields.id &&
                            $target.classList.contains('e-editedbatchcell')) {
                            /* eslint-disable-next-line */
                            var rowIndex = $target.parentElement.rowIndex;
                            var rowElement = this.getNextRowElement(rowIndex, isTab, true);
                            next = this.getChildElement(rowElement, isTab);
                            var rowData = this.parent.flatData[parseInt(rowElement.getAttribute('aria-rowindex'), 10) - 1];
                            if (rowData.hasChildRecords && (!this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].allowEditing ||
                                this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].field ===
                                    this.parent.taskFields.progress)) {
                                var currentColumn = void 0;
                                next = this.updateElement(next, currentColumn, isTab, isInEditedState, rowData);
                                while (!this.parent.ganttColumns[parseInt(next.getAttribute('aria-colindex'), 10) - 1].allowEditing) {
                                    next = this.getNextElement(next, isTab, isInEditedState);
                                }
                                next = this.updateElement(next, currentColumn, isTab, isInEditedState, rowData);
                            }
                            else {
                                this.parent.treeGrid.grid.notify('key-pressed', e);
                            }
                        }
                        else {
                            this.parent.treeGrid.grid.notify('key-pressed', e);
                        }
                    }
                }
            }
            if (this.parent.element.querySelectorAll('.e-focused').length > 0) {
                this.manageFocus(this.parent.element.querySelectorAll('.e-focused')[0], 'remove', false);
            }
            if (!(this.parent.editModule && this.parent.editModule.cellEditModule
                && !isNullOrUndefined(this.parent.editModule.cellEditModule.editedColumn))) {
                if (nextElement) {
                    if ($target.classList.contains('e-rowcell')) {
                        this.manageFocus($target, 'remove', false);
                    }
                    else {
                        this.manageFocus($target, 'remove', true);
                    }
                    if ((nextElement.classList.contains('e-rowcell') && $target.nextElementSibling && !$target.classList.contains('e-timeline-header-container'))
                        || $target.classList.contains('e-right-label-container')) {
                        if (!$target.classList.contains('e-rowcell')) {
                            this.parent.treeGrid.grid.notify('key-pressed', e);
                            var fmodule = getValue('focusModule', this.parent.treeGrid.grid);
                            fmodule.currentInfo.element = nextElement;
                            fmodule.currentInfo.elementToFocus = nextElement;
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            fmodule.content.matrix.current = [nextElement.parentElement.rowIndex, nextElement.cellIndex];
                        }
                        this.manageFocus(nextElement, 'add', false);
                    }
                    else {
                        if (nextElement && (nextElement.classList.contains('e-toolbar-item') || nextElement.classList.contains('e-headercell')
                            || nextElement.classList.contains('e-rowcell'))) {
                            this.manageFocus($target, 'remove', false);
                            if (!nextElement.classList.contains('e-toolbar-item')) {
                                this.manageFocus(nextElement, 'add', false);
                            }
                            if ($target.classList.contains('e-treegrid')) {
                                e.preventDefault();
                            }
                        }
                        else {
                            this.manageFocus(nextElement, 'add', true);
                        }
                    }
                    this.parent.focusModule.setActiveElement(nextElement);
                }
            }
        }
    };
    /**
     * Get next/previous sibling element.
     *
     * @param {Element} $target .
     * @param {boolean} isTab .
     * @param {boolean} isInEditedState .
     * @returns {Element | string} .
     */
    GanttChart.prototype.getNextElement = function ($target, isTab, isInEditedState) {
        if ($target.classList.contains('e-timeline-header-container') && isTab) {
            var rowElement = this.getNextRowElement(-1, isTab, true);
            return this.getChildElement(rowElement, isTab);
        }
        var nextElement = isTab ? $target.nextElementSibling : $target.previousElementSibling;
        if ($target.parentElement.classList.contains('e-taskbar-main-container')) {
            if (this.parent.labelSettings.rightLabel && isTab) {
                return $target.parentElement.nextElementSibling;
            }
            else if (!isTab && this.parent.labelSettings.leftLabel) {
                return $target.parentElement.previousElementSibling;
            }
        }
        while (nextElement && nextElement.parentElement.classList.contains('e-row')) {
            if (!nextElement.matches('.e-hide') && !nextElement.matches('.e-rowdragdrop')) {
                return nextElement;
            }
            nextElement = isTab ? nextElement.nextElementSibling : nextElement.previousElementSibling;
        }
        if (!isNullOrUndefined(nextElement) && (nextElement.classList.contains('e-taskbar-main-container')
            || nextElement.classList.contains('e-right-connectorpoint-outer-div'))) {
            var record = this.parent.currentViewData[this.focusedRowIndex];
            if (!isNullOrUndefined(record.ganttProperties.segments) && record.ganttProperties.segments.length > 0) {
                nextElement = nextElement.classList.contains('e-right-connectorpoint-outer-div')
                    ? nextElement.parentElement.nextElementSibling
                    : nextElement.getElementsByClassName('e-gantt-child-taskbar-inner-div')[0];
            }
        }
        if (this.validateNextElement(nextElement)) {
            return nextElement;
        }
        else {
            var rowIndex = -1;
            var rowElement = null;
            var childElement = void 0;
            if ($target.classList.contains('e-rowcell') && isInEditedState && this.parent.editSettings.allowNextRowEdit) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                rowIndex = $target.parentElement.rowIndex;
                rowElement = this.getNextRowElement(rowIndex, isTab, true);
                childElement = this.getChildElement(rowElement, isTab);
                return childElement;
            }
            else if ($target.classList.contains('e-rowcell')) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                rowIndex = $target.parentElement.rowIndex;
                if (isTab) {
                    rowElement = this.parent.getRowByIndex(rowIndex);
                    if (this.parent.treeGrid.element.getElementsByClassName('e-editedbatchcell').length > 0) {
                        rowElement = this.getNextRowElement(rowIndex, isTab, true);
                        var childElement_1 = this.getChildElement(rowElement, isTab);
                        return childElement_1;
                    }
                    else {
                        if (this.validateNextElement(rowElement, 'e-left-label-container')) {
                            return rowElement.getElementsByClassName('e-left-label-container')[0];
                        }
                        else if (this.validateNextElement(rowElement, 'e-taskbar-main-container')) {
                            return rowElement.getElementsByClassName('e-taskbar-main-container')[0];
                        }
                        else if (this.validateNextElement(rowElement, 'e-right-label-container')) {
                            return rowElement.getElementsByClassName('e-right-label-container')[0];
                        }
                    }
                }
                else {
                    rowElement = this.getNextRowElement(rowIndex, isTab, false);
                    if (this.validateNextElement(rowElement, 'e-right-label-container')) {
                        return rowElement.getElementsByClassName('e-right-label-container')[0];
                    }
                    else if (this.validateNextElement(rowElement, 'e-taskbar-main-container')) {
                        return rowElement.getElementsByClassName('e-taskbar-main-container')[0];
                    }
                    else if (this.validateNextElement(rowElement, 'e-left-label-container')) {
                        return rowElement.getElementsByClassName('e-left-label-container')[0];
                    }
                }
            }
            else if ($target.parentElement.classList.contains('e-chart-row-cell') ||
                $target.parentElement.parentElement.classList.contains('e-chart-row-cell')) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                rowIndex = closest($target, '.e-chart-row').rowIndex;
                if (isTab) {
                    if (!isTab && this.parent.virtualScrollModule && this.parent.enableVirtualization) {
                        /* eslint-disable-next-line */
                        var rowRecord = this.parent.currentViewData[rowIndex];
                        rowIndex = this.parent.flatData.indexOf(rowRecord);
                    }
                    rowElement = this.getNextRowElement(rowIndex, isTab, true);
                }
                else {
                    rowElement = this.parent.treeGrid.getRows()[rowIndex];
                }
                var childElement_2 = this.getChildElement(rowElement, isTab);
                return childElement_2;
            }
            nextElement = $target;
        }
        return null;
    };
    /**
     * Get next/previous row element.
     *
     * @param {number} rowIndex .
     * @param {boolean} isTab .
     * @param {boolean} isChartRow .
     * @returns {Element} .
     */
    GanttChart.prototype.getNextRowElement = function (rowIndex, isTab, isChartRow) {
        var expandedRecords = this.parent.getExpandedRecords(this.parent.currentViewData);
        var currentItem = this.parent.currentViewData[rowIndex];
        var expandedRecordIndex = expandedRecords.indexOf(currentItem);
        var nextRecord = isTab ? expandedRecords[expandedRecordIndex + 1] : expandedRecords[expandedRecordIndex - 1];
        var nextRowIndex = this.parent.currentViewData.indexOf(nextRecord);
        if (nextRecord) {
            return isChartRow ? this.parent.treeGrid.getRows()[nextRowIndex] : this.parent.getRowByIndex(nextRowIndex);
        }
        else {
            return null;
        }
    };
    /**
     * Validate next/previous sibling element haschilds.
     *
     * @param {Element} $target .
     * @param {string} className .
     * @returns {boolean} .
     */
    GanttChart.prototype.validateNextElement = function ($target, className) {
        if ($target && $target.classList.contains('e-rowcell')) {
            return true;
        }
        if ($target && className) {
            var elementByClass = $target.getElementsByClassName(className)[0];
            return (elementByClass && elementByClass.hasChildNodes()) ? true : false;
        }
        else if ($target) {
            return (!isNullOrUndefined($target) && $target.hasChildNodes()) ? true : false;
        }
        return false;
    };
    /**
     * Getting child element based on row element.
     *
     * @param {Element} rowElement .
     * @param {boolean} isTab .
     * @returns {Element | string} .
     */
    GanttChart.prototype.getChildElement = function (rowElement, isTab) {
        var childElement;
        if (rowElement) {
            childElement = isTab ? rowElement.children[0] : rowElement.children[rowElement.children.length - 1];
            while (childElement) {
                if (!childElement.matches('.e-hide') && !childElement.matches('.e-rowdragdrop')) {
                    return childElement;
                }
                childElement = isTab ? childElement.nextElementSibling : childElement.previousElementSibling;
            }
        }
        else {
            return 'noNextRow';
        }
        return childElement;
    };
    /**
     * Add/Remove active element.
     *
     * @private
     * @param {HTMLElement} element .
     * @param {string} focus .
     * @param {boolean} isChartElement .
     * @param {string} keyAction .
     * @returns {void} .
     */
    GanttChart.prototype.manageFocus = function (element, focus, isChartElement, keyAction) {
        if (isChartElement) {
            var childElement = null;
            if (element.classList.contains('e-left-label-container') ||
                element.classList.contains('e-right-label-container')) {
                childElement = element.getElementsByTagName('span')[0];
            }
            else if (element.classList.contains('e-taskbar-main-container')
                || element.classList.contains('e-gantt-child-taskbar-inner-div')) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var rowIndex = closest(element, '.e-chart-row').rowIndex;
                var data = this.parent.currentViewData[rowIndex];
                var className = data.hasChildRecords ? data.ganttProperties.isAutoSchedule ? 'e-gantt-parent-taskbar' :
                    'e-manualparent-main-container' :
                    data.ganttProperties.isMilestone ? 'e-gantt-milestone' : !isNullOrUndefined(data.ganttProperties.segments)
                        && data.ganttProperties.segments.length > 0 ? 'e-segmented-taskbar' : 'e-gantt-child-taskbar';
                childElement = element.getElementsByClassName(className)[0];
                if (isNullOrUndefined(childElement)) {
                    childElement = element;
                }
            }
            if (element.classList.contains('e-right-label-temp-container') || element.classList.contains('e-left-label-temp-container') || element.classList.contains('e-indicator-span') || element.classList.contains('e-timeline-header-container')) {
                if (focus === 'add') {
                    element.setAttribute('tabIndex', '0');
                    addClass([element], 'e-active-container');
                    element.focus();
                }
                else {
                    if (keyAction !== 'downArrow' && keyAction !== 'upArrow') {
                        removeClass([element], 'e-active-container');
                        element.setAttribute('tabIndex', '-1');
                        element.blur();
                    }
                }
            }
            if (focus === 'add' && !isNullOrUndefined(childElement)) {
                element.setAttribute('tabIndex', '0');
                addClass([childElement], 'e-active-container');
                element.focus();
                this.focusedElement = childElement;
            }
            else if (!isNullOrUndefined(childElement) && (keyAction !== 'downArrow' && keyAction !== 'upArrow')) {
                removeClass([childElement], 'e-active-container');
                element.setAttribute('tabIndex', '-1');
                element.blur();
            }
        }
        else {
            if (focus === 'add') {
                element.setAttribute('tabIndex', '0');
                addClass([element], ['e-focused', 'e-focus']);
                if (!this.preventScrollIntoView) {
                    element.scrollIntoView({
                        block: 'nearest',
                        inline: 'nearest' // Keeps horizontal position stable
                    });
                }
                this.preventScrollIntoView = false;
                element.focus();
            }
            else {
                element.setAttribute('tabIndex', '-1');
                removeClass([element], ['e-focused', 'e-focus']);
                element.blur();
            }
        }
    };
    /**
     * To get index by taskbar element.
     *
     * @param {Element} target .
     * @returns {number} .
     * @private
     */
    GanttChart.prototype.getIndexByTaskBar = function (target) {
        var row;
        var recordIndex;
        if (!target.classList.contains(cls.taskBarMainContainer)) {
            row = closest(target, 'div.' + cls.taskBarMainContainer);
        }
        else {
            row = target;
        }
        if (isNullOrUndefined(row)) {
            row = closest(target, 'tr.' + cls.chartRow);
            recordIndex = [].slice.call(this.parent.chartRowsModule.ganttChartTableBody.childNodes).indexOf(row);
        }
        else {
            var id = row.getAttribute('rowUniqueId');
            var record = this.parent.getRecordByID(id);
            if (this.parent.enableVirtualization && this.parent.enableMultiTaskbar) {
                recordIndex = this.parent.flatData.indexOf(record);
            }
            else {
                if (this.parent.pdfExportModule && this.parent.pdfExportModule.helper.exportProps
                    && this.parent.pdfExportModule.helper.exportProps.fitToWidthSettings
                    && this.parent.pdfExportModule.helper.exportProps.fitToWidthSettings.isFitToWidth
                    && this.parent.pdfExportModule.isPdfExport) {
                    recordIndex = this.parent.ids.indexOf(record.ganttProperties.taskId.toString());
                }
                else {
                    recordIndex = this.parent.currentViewData.indexOf(record);
                }
            }
        }
        return recordIndex;
    };
    GanttChart.prototype.destroy = function () {
        this.removeEventListener();
        this.unWireEvents();
        this.chartElement = null;
        this.rangeViewContainer = null;
        this.chartBodyContent = null;
        this.scrollElement = null;
        this.chartTimelineContainer = null;
        this.chartBodyContainer = null;
        if (!isNullOrUndefined(this.scrollObject)) {
            this.scrollObject.destroy();
            this.scrollObject = null;
        }
    };
    return GanttChart;
}());
export { GanttChart };
