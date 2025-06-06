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
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
var UndoRedo = /** @class */ (function () {
    function UndoRedo(parent) {
        this.isUndoRedoPerformed = false;
        this.changedRecords = [];
        this.getRedoCollection = [];
        this.getUndoCollection = [];
        this.redoEnabled = false;
        this.previousSortedColumns = [];
        this.searchString = '';
        this.isFromUndoRedo = false;
        this.canUpdateIndex = true;
        this.sortedColumnsLength = 0;
        this.parent = parent;
    }
    /**
     *Initiates an undo action to revert the most recent change performed.
     *
     * @returns {void}
     * @public
     */
    UndoRedo.prototype.undoAction = function () {
        var _this = this;
        if (this.getUndoCollection.length > 0) {
            var updateAction_1 = this.getUndoCollection[this.getUndoCollection.length - 1];
            var previousActions = {};
            if (updateAction_1['action'] === 'ZoomIn' || updateAction_1['action'] === 'ZoomOut' || updateAction_1['action'] === 'ZoomToFit') {
                previousActions['action'] = updateAction_1['action'];
                previousActions['previousZoomingLevel'] = extend({}, {}, this.parent.currentZoomingLevel, true);
            }
            else if (updateAction_1['action'] === 'NextTimeSpan' || updateAction_1['action'] === 'PreviousTimeSpan') {
                previousActions['action'] = updateAction_1['action'];
                previousActions['previousTimelineStartDate'] = extend([], [this.parent.timelineModule.timelineStartDate], [], true)[0];
                previousActions['previousTimelineEndDate'] = extend([], [this.parent.timelineModule.timelineEndDate], [], true)[0];
            }
            else if (updateAction_1['action'] === 'Sorting') {
                previousActions['action'] = 'Sorting';
                previousActions['sortColumns'] = this.previousSortedColumns;
            }
            else if (updateAction_1['action'] === 'Filtering') {
                previousActions['action'] = 'Filtering';
                previousActions['filteredColumns'] = updateAction_1['filteredColumns'];
            }
            else if (updateAction_1['action'] === 'ColumnReorder') {
                previousActions['action'] = updateAction_1['action'];
                previousActions['toColumn'] = updateAction_1['fromColumn'];
                previousActions['fromColumn'] = updateAction_1['toColumn'];
                previousActions['fromIndex'] = updateAction_1['toIndex'];
                previousActions['toIndex'] = updateAction_1['fromIndex'];
            }
            else if (updateAction_1['action'] === 'Search') {
                previousActions['action'] = updateAction_1['action'];
                previousActions['searchString'] = this.searchString;
            }
            else if (updateAction_1['action'] === 'ColumnState') {
                previousActions['action'] = updateAction_1['action'];
                previousActions['showhideColumns'] = updateAction_1['showhideColumns'];
            }
            else if (updateAction_1['action'] === 'ColumnResize') {
                previousActions['action'] = updateAction_1['action'];
                previousActions['resizedColumn'] = __assign({}, this.parent.treeGrid.columns[updateAction_1['resizedColumn'].index]);
            }
            else if (updateAction_1['action'] === 'RowDragAndDrop' || updateAction_1['action'] === 'TaskbarDragAndDrop') {
                var rowItems = [];
                for (var i = 0; i < updateAction_1['beforeDrop'].length; i++) {
                    if (this.parent.viewType === 'ProjectView') {
                        rowItems.push(this.parent.getRecordByID(updateAction_1['beforeDrop'][i]['data'].ganttProperties.taskId));
                    }
                    else {
                        rowItems.push(this.parent.flatData[this.parent.taskIds.indexOf('T' + updateAction_1['beforeDrop'][i]['data'].ganttProperties.taskId.toString())]);
                    }
                }
                previousActions['action'] = updateAction_1['action'];
                previousActions['beforeDrop'] = [];
                var previousDetails = {};
                var dropRecord = extend([], [], [this.parent.getRecordByID(updateAction_1['afterDrop'].dropRecord.ganttProperties.taskId)], true)[0];
                previousDetails['data'] = [];
                for (var i = 0; i < updateAction_1['afterDrop'].data.length; i++) {
                    if (this.parent.viewType === 'ProjectView') {
                        previousDetails['data'].push(extend([], [], [this.parent.getRecordByID(updateAction_1['afterDrop'].data[i].ganttProperties.taskId)], true)[0]);
                    }
                    else {
                        previousDetails['data'].push(extend([], [], this.parent.flatData[this.parent.taskIds.indexOf('T' + updateAction_1['afterDrop'].data[i].ganttProperties.taskId)], true)[0]);
                    }
                }
                previousDetails['dropRecord'] = extend([], [], [dropRecord], true)[0];
                previousDetails['dropPosition'] = updateAction_1['afterDrop'].dropPosition;
                previousActions['afterDrop'] = previousDetails;
                this['findPosition'](rowItems, previousActions, 'beforeDrop');
            }
            else if (updateAction_1['action'] === 'Indent' || updateAction_1['action'] === 'Outdent') {
                previousActions['selectedRowIndexes'] = updateAction_1['selectedRowIndexes'];
                previousActions['droppedRecord'] = extend([], [], [this.parent.flatData[this.parent.ids.indexOf(updateAction_1['droppedRecord'].ganttProperties.taskId.toString())]], true)[0];
                previousActions['modifiedRecord'] = [];
                this.findPosition(extend([], [], [this.parent.flatData[this.parent.ids.indexOf(updateAction_1['modifiedRecord'][0].data.ganttProperties.taskId.toString())]], true), previousActions, 'modifiedRecord');
                previousActions['action'] = updateAction_1['action'];
            }
            else if (updateAction_1['action'] === 'Delete') {
                previousActions['action'] = 'Delete';
                previousActions['deleteRecords'] = [];
                for (var i = 0; i < updateAction_1['deletedRecordsDetails'].length; i++) {
                    previousActions['deleteRecords'].push(updateAction_1['deletedRecordsDetails'][i].data);
                }
            }
            else if (updateAction_1['action'] === 'Add') {
                previousActions['action'] = 'Add';
                previousActions['deletedRecordsDetails'] = [];
                var rowItems = updateAction_1['addedRecords'];
                this.findPosition(rowItems, previousActions, 'deletedRecordsDetails');
            }
            else {
                previousActions['action'] = updateAction_1['action'];
                previousActions['modifiedRecords'] = [];
                for (var i = 0; i < updateAction_1['modifiedRecords'].length; i++) {
                    var index = void 0;
                    if (this.parent.viewType === 'ProjectView') {
                        index = this.parent.ids.indexOf(updateAction_1['modifiedRecords'][i].ganttProperties.taskId.toString());
                    }
                    else {
                        if (updateAction_1['modifiedRecords'][i].hasChildRecords) {
                            index = this.parent.taskIds.indexOf('R' + updateAction_1['modifiedRecords'][i].ganttProperties.taskId);
                        }
                        else {
                            index = this.parent.taskIds.indexOf('T' + updateAction_1['modifiedRecords'][i].ganttProperties.taskId);
                        }
                    }
                    previousActions['modifiedRecords'].push(extend([], [this.parent.flatData[index]], [], true)[0]);
                }
            }
            this.getRedoCollection.push(previousActions);
            this.isUndoRedoPerformed = true;
            this.changedRecords = [];
            this.currentAction = updateAction_1;
            if (updateAction_1['action'] === 'ZoomIn' || updateAction_1['action'] === 'ZoomOut' || updateAction_1['action'] === 'ZoomToFit') {
                this.parent.timelineSettings.timelineViewMode = updateAction_1['previousZoomingLevel'].timelineViewMode;
                this.parent.timelineSettings.timelineUnitSize = updateAction_1['previousZoomingLevel'].timelineUnitSize;
                this.parent.timelineSettings.updateTimescaleView = updateAction_1['previousZoomingLevel'].updateTimescaleView;
                this.parent.timelineSettings.topTier.unit = updateAction_1['previousZoomingLevel'].topTier.unit;
                this.parent.timelineSettings.topTier.count = updateAction_1['previousZoomingLevel'].topTier.count;
                this.parent.timelineSettings.topTier.format = updateAction_1['previousZoomingLevel'].topTier.format;
                this.parent.timelineSettings.bottomTier.unit = updateAction_1['previousZoomingLevel'].bottomTier.unit;
                this.parent.timelineSettings.bottomTier.count = updateAction_1['previousZoomingLevel'].bottomTier.count;
                this.parent.timelineSettings.bottomTier.format = updateAction_1['previousZoomingLevel'].bottomTier.format;
                this.parent.timelineSettings.weekStartDay = updateAction_1['previousZoomingLevel'].weekStartDay;
                this.parent.timelineSettings.weekendBackground = updateAction_1['previousZoomingLevel'].weekendBackground;
                if (updateAction_1['action'] === 'ZoomToFit') {
                    this.parent.timelineModule.refreshTimeline();
                }
            }
            else if (updateAction_1['action'] === 'NextTimeSpan' || updateAction_1['action'] === 'PreviousTimeSpan') {
                this.parent.updateProjectDates(updateAction_1['previousTimelineStartDate'], updateAction_1['previousTimelineEndDate'], false);
            }
            else if (updateAction_1['action'] === 'Sorting') {
                this.isFromUndoRedo = true;
                this.sortedColumnsLength = 0;
                if (updateAction_1['sortColumns'].length > 0) {
                    for (var i = 0; i < updateAction_1['sortColumns'].length; i++) {
                        this.parent.treeGrid.sortByColumn(updateAction_1['sortColumns'][i]['field'], updateAction_1['sortColumns'][i]['direction'], i > 0 ? true : false);
                    }
                }
                else {
                    this.parent.clearSorting();
                }
            }
            else if (updateAction_1['action'] === 'Filtering') {
                this.isFromUndoRedo = true;
                for (var i = this.getUndoCollection.length - 1; i >= 0; i--) {
                    if (this.getUndoCollection[i]['filteredColumns']) {
                        var columnsArray = [];
                        for (var j = 0; j < this.getUndoCollection[i]['filteredColumns'].length; j++) {
                            columnsArray.push(this.getUndoCollection[i]['filteredColumns'][j].field);
                        }
                        this.parent.clearFiltering(columnsArray);
                    }
                }
            }
            else if (updateAction_1['action'] === 'ColumnReorder') {
                this.isFromUndoRedo = true;
                var fromColumn = this.parent.treeGrid.columns[updateAction_1['fromIndex']]['field'];
                var toColumn = this.parent.treeGrid.columns[updateAction_1['toIndex']]['field'];
                this.parent.reorderColumns(fromColumn, toColumn);
            }
            else if (updateAction_1['action'] === 'Search') {
                this.isFromUndoRedo = true;
                this.parent.search(updateAction_1['searchString']);
            }
            else if (updateAction_1['action'] === 'ColumnState') {
                this.isFromUndoRedo = true;
                for (var i = 0; i < updateAction_1['showhideColumns'].length; i++) {
                    if (updateAction_1['showhideColumns'][i].visible) {
                        this.parent.hideColumn(updateAction_1['showhideColumns'][i].field, 'field');
                    }
                    else {
                        this.parent.showColumn(updateAction_1['showhideColumns'][i].field, 'field');
                    }
                }
            }
            else if (updateAction_1['action'] === 'ColumnResize') {
                this.parent.treeGrid.columns[updateAction_1['resizedColumn'].index]['width'] = updateAction_1['resizedColumn'].width;
                this.parent.treeGrid.refreshColumns();
            }
            else if (updateAction_1['action'] === 'RowDragAndDrop' || updateAction_1['action'] === 'TaskbarDragAndDrop') {
                for (var i = 0; i < updateAction_1['beforeDrop'].length; i++) {
                    var fromIndex = void 0;
                    var toIndex = void 0;
                    if (this.parent.viewType === 'ProjectView') {
                        fromIndex = this.parent.ids.indexOf(updateAction_1['beforeDrop'][i].data.ganttProperties.taskId.toString());
                        toIndex = this.parent.ids.indexOf(updateAction_1['beforeDrop'][i]['id'].toString());
                    }
                    else {
                        fromIndex = this.parent.ids.indexOf('T' + updateAction_1['beforeDrop'][i].data.ganttProperties.taskId.toString());
                        toIndex = this.parent.taskIds.indexOf(updateAction_1['beforeDrop'][i]['id'].toString());
                    }
                    this.parent.reorderRows([fromIndex], toIndex, updateAction_1['beforeDrop'][i].position);
                    this.parent.updateRecordByID(updateAction_1['beforeDrop'][i].data);
                    if (updateAction_1['afterDrop'].dropPosition === 'child') {
                        this.parent.updateRecordByID(updateAction_1['afterDrop'].dropRecord);
                    }
                }
            }
            else if (updateAction_1['action'] === 'Indent' || updateAction_1['action'] === 'Outdent') {
                this.parent.selectRow(this.parent.ids.indexOf(updateAction_1['modifiedRecord'][0].data.ganttProperties.taskId.toString()));
                if (updateAction_1['action'] === 'Indent') {
                    this.parent.outdent();
                }
                else {
                    this.parent.indent();
                }
                setTimeout(function () {
                    _this.isUndoRedoPerformed = true;
                    _this.parent.updateRecordByID(updateAction_1['droppedRecord']);
                    _this.isUndoRedoPerformed = false;
                });
            }
            else if (updateAction_1['action'] === 'Delete') {
                var rowIndex = void 0;
                for (var i = 0; i < updateAction_1['deletedRecordsDetails'].length; i++) {
                    if (this.parent.viewType === 'ProjectView') {
                        rowIndex = this.parent.ids.indexOf(updateAction_1['deletedRecordsDetails'][i].id.toString());
                    }
                    else {
                        rowIndex = this.parent.taskIds.indexOf(updateAction_1['deletedRecordsDetails'][i].id.toString());
                    }
                    var position = void 0;
                    if (updateAction_1['deletedRecordsDetails'][i].position === 'above') {
                        position = 'Above';
                    }
                    if (updateAction_1['deletedRecordsDetails'][i].position === 'below') {
                        position = 'Below';
                    }
                    if (updateAction_1['deletedRecordsDetails'][i].position === 'child') {
                        position = 'Child';
                    }
                    if (isNullOrUndefined(position)) {
                        position = updateAction_1['deletedRecordsDetails'][i].position.replace(/^./, function (char) { return char.toUpperCase(); });
                    }
                    this.parent.addRecord(updateAction_1['deletedRecordsDetails'][i].data, position, rowIndex);
                }
            }
            else if (updateAction_1['action'] === 'Add') {
                var isShowDeleteConfirmDialog = extend([], [this.parent.editSettings.showDeleteConfirmDialog], [], true)[0];
                this.parent.editSettings.showDeleteConfirmDialog = false;
                var deleteRec = updateAction_1['addedRecords'];
                if (this.parent.viewType === 'ResourceView' && updateAction_1['addedRecords'].length === 1 && updateAction_1['addedRecords'][0].parentItem) {
                    var parentRec = this.parent.getTaskByUniqueID(updateAction_1['addedRecords'][0].parentItem.uniqueID);
                    if (parentRec.childRecords.length === 1 && parentRec.ganttProperties.taskName === 'Unassigned Task') {
                        deleteRec = parentRec;
                    }
                }
                this.parent.deleteRecord(deleteRec);
                this.parent.editSettings.showDeleteConfirmDialog = isShowDeleteConfirmDialog;
            }
            else {
                this.parent.updateRecordByID(this.getUndoCollection[this.getUndoCollection.length - 1]['modifiedRecords'][0]);
                if (updateAction_1['connectedRecords'] && this.parent.viewType === 'ProjectView') {
                    for (var i = 0; i < updateAction_1['connectedRecords'].length; i++) {
                        this.parent.updateRecordByID(updateAction_1['connectedRecords'][i]);
                    }
                }
            }
            var args = {};
            args = extend([], [], [this.getUndoCollection[this.getUndoCollection.length - 1]], true)[0];
            args['requestType'] = 'afterUndoAction';
            this.parent.trigger('onAfterUndo', args);
            this.isUndoRedoPerformed = false;
            if (this.getRedoCollection.length > 0) {
                if (this.parent.toolbarModule) {
                    this.parent.toolbarModule.enableItems([this.parent.controlId + '_redo'], true);
                }
                this.redoEnabled = true;
            }
            this.getUndoCollection.splice(this.getUndoCollection.length - 1, 1);
            if (this.getUndoCollection.length === 0 && this.parent.toolbarModule) {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], false);
            }
        }
        else {
            this.getUndoCollection.splice(this.getUndoCollection.length - 1, 1);
            if (this.getUndoCollection.length === 0 && this.parent.toolbarModule) {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], false);
            }
        }
    };
    /**
     *Initiates an redo action to reapply the most recent undone change performed.
     *
     * @returns {void}
     * @public
     */
    UndoRedo.prototype.redoAction = function () {
        if (this.getRedoCollection.length > 0) {
            var updateAction = this.getRedoCollection[this.getRedoCollection.length - 1];
            var previousActions = {};
            if (updateAction['action'] === 'ZoomIn' || updateAction['action'] === 'ZoomOut' || updateAction['action'] === 'ZoomToFit') {
                previousActions['action'] = updateAction['action'];
                previousActions['previousZoomingLevel'] = extend({}, {}, this.parent.currentZoomingLevel, true);
            }
            else if (updateAction['action'] === 'NextTimeSpan' || updateAction['action'] === 'PreviousTimeSpan') {
                previousActions['action'] = updateAction['action'];
                previousActions['previousTimelineStartDate'] = extend([], [this.parent.timelineModule.timelineStartDate], [], true)[0];
                previousActions['previousTimelineEndDate'] = extend([], [this.parent.timelineModule.timelineEndDate], [], true)[0];
            }
            else if (updateAction['action'] === 'Sorting') {
                previousActions['action'] = 'Sorting';
                previousActions['sortColumns'] = extend([], this.parent.sortSettings.columns, [], true);
            }
            else if (updateAction['action'] === 'Filtering') {
                previousActions['action'] = 'Filtering';
                previousActions['filteredColumns'] = updateAction['filteredColumns'];
            }
            else if (updateAction['action'] === 'ColumnReorder') {
                previousActions['action'] = updateAction['action'];
                previousActions['toColumn'] = updateAction['fromColumn'];
                previousActions['fromColumn'] = updateAction['toColumn'];
                previousActions['fromIndex'] = updateAction['toIndex'];
                previousActions['toIndex'] = updateAction['fromIndex'];
            }
            else if (updateAction['action'] === 'Search') {
                previousActions['action'] = updateAction['action'];
                previousActions['searchString'] = extend([], [this.parent.searchSettings.key], [], true)[0];
            }
            else if (updateAction['action'] === 'ColumnState') {
                previousActions['action'] = updateAction['action'];
                previousActions['showhideColumns'] = updateAction['showhideColumns'];
            }
            else if (updateAction['action'] === 'ColumnResize') {
                previousActions['action'] = updateAction['action'];
                previousActions['resizedColumn'] = __assign({}, this.parent.treeGrid.columns[updateAction['resizedColumn'].index]);
            }
            else if (updateAction['action'] === 'RowDragAndDrop' || updateAction['action'] === 'TaskbarDragAndDrop') {
                var rowItems = [];
                for (var i = 0; i < updateAction['beforeDrop'].length; i++) {
                    if (this.parent.viewType === 'ProjectView') {
                        rowItems.push(this.parent.getRecordByID(updateAction['beforeDrop'][i]['data'].ganttProperties.taskId));
                    }
                    else {
                        rowItems.push(this.parent.flatData[this.parent.taskIds.indexOf('T' + updateAction['beforeDrop'][i]['data'].ganttProperties.taskId.toString())]);
                    }
                }
                previousActions['action'] = updateAction['action'];
                previousActions['beforeDrop'] = [];
                var previousDetails = {};
                var dropRecord = void 0;
                if (updateAction['afterDrop'].dropRecord) {
                    dropRecord = extend([], [], [this.parent.getRecordByID(updateAction['afterDrop'].dropRecord.ganttProperties.taskId)], true)[0];
                }
                previousDetails['data'] = [];
                for (var i = 0; i < updateAction['afterDrop'].data.length; i++) {
                    if (this.parent.viewType === 'ProjectView') {
                        previousDetails['data'].push(extend([], [], [this.parent.getRecordByID(updateAction['afterDrop'].data[i].ganttProperties.taskId)], true)[0]);
                    }
                    else {
                        if (updateAction['afterDrop'].data[i] !== undefined) {
                            previousDetails['data'].push(extend([], [], this.parent.flatData[this.parent.taskIds.indexOf('T' + updateAction['afterDrop'].data[i].ganttProperties.taskId)], true)[0]);
                        }
                    }
                }
                previousDetails['dropRecord'] = extend([], [], [dropRecord], true)[0];
                previousDetails['dropPosition'] = updateAction['afterDrop'].dropPosition;
                previousActions['afterDrop'] = previousDetails;
                this['findPosition'](rowItems, previousActions, 'beforeDrop');
            }
            else if (updateAction['action'] === 'Indent' || updateAction['action'] === 'Outdent') {
                previousActions['selectedRowIndexes'] = updateAction['selectedRowIndexes'];
                previousActions['droppedRecord'] = extend([], [], [this.parent.flatData[this.parent.ids.indexOf(updateAction['droppedRecord'].ganttProperties.taskId.toString())]], true)[0];
                previousActions['modifiedRecord'] = [];
                this.findPosition(extend([], [], [this.parent.flatData[this.parent.ids.indexOf(updateAction['modifiedRecord'][0].data.ganttProperties.taskId.toString())]], true), previousActions, 'modifiedRecord');
                previousActions['action'] = updateAction['action'];
            }
            else if (updateAction['action'] === 'Delete') {
                previousActions['action'] = 'Delete';
                previousActions['deletedRecordsDetails'] = [];
                this['findPosition'](extend([], [], updateAction['deleteRecords'], true), previousActions, 'deletedRecordsDetails');
            }
            else if (updateAction['action'] === 'Add') {
                previousActions['action'] = 'Add';
                previousActions['addedRecords'] = [updateAction['deletedRecordsDetails'][0].data];
            }
            else {
                previousActions['action'] = updateAction['action'];
                previousActions['modifiedRecords'] = [];
                for (var i = 0; i < updateAction['modifiedRecords'].length; i++) {
                    var index = void 0;
                    if (this.parent.viewType === 'ProjectView') {
                        index = this.parent.ids.indexOf(updateAction['modifiedRecords'][i].ganttProperties.taskId.toString());
                    }
                    else {
                        if (updateAction['modifiedRecords'][i].hasChildRecords) {
                            index = this.parent.taskIds.indexOf('R' + updateAction['modifiedRecords'][i].ganttProperties.taskId);
                        }
                        else {
                            index = this.parent.taskIds.indexOf('T' + updateAction['modifiedRecords'][i].ganttProperties.taskId);
                        }
                    }
                    previousActions['modifiedRecords'].push(extend([], [this.parent.flatData[index]], [], true)[0]);
                }
            }
            this.getUndoCollection.push(previousActions);
            this.isUndoRedoPerformed = true;
            this.currentAction = updateAction;
            if (updateAction['action'] === 'ZoomIn' || updateAction['action'] === 'ZoomOut' || updateAction['action'] === 'ZoomToFit') {
                if (updateAction['action'] === 'ZoomToFit') {
                    this.parent.fitToProject();
                }
                else {
                    this.parent.timelineSettings.timelineViewMode = updateAction['previousZoomingLevel'].timelineViewMode;
                    this.parent.timelineSettings.timelineUnitSize = updateAction['previousZoomingLevel'].timelineUnitSize;
                    this.parent.timelineSettings.updateTimescaleView = updateAction['previousZoomingLevel'].updateTimescaleView;
                    this.parent.timelineSettings.topTier.unit = updateAction['previousZoomingLevel'].topTier.unit;
                    this.parent.timelineSettings.topTier.count = updateAction['previousZoomingLevel'].topTier.count;
                    this.parent.timelineSettings.topTier.format = updateAction['previousZoomingLevel'].topTier.format;
                    this.parent.timelineSettings.bottomTier.unit = updateAction['previousZoomingLevel'].bottomTier.unit;
                    this.parent.timelineSettings.bottomTier.count = updateAction['previousZoomingLevel'].bottomTier.count;
                    this.parent.timelineSettings.bottomTier.format = updateAction['previousZoomingLevel'].bottomTier.format;
                    this.parent.timelineSettings.weekStartDay = updateAction['previousZoomingLevel'].weekStartDay;
                    this.parent.timelineSettings.weekendBackground = updateAction['previousZoomingLevel'].weekendBackground;
                }
            }
            else if (updateAction['action'] === 'NextTimeSpan' || updateAction['action'] === 'PreviousTimeSpan') {
                this.parent.updateProjectDates(updateAction['previousTimelineStartDate'], updateAction['previousTimelineEndDate'], false);
            }
            else if (updateAction['action'] === 'Sorting') {
                this.isFromUndoRedo = true;
                this.sortedColumnsLength = 0;
                if (updateAction['sortColumns'].length === 0) {
                    this.parent.clearSorting();
                }
                else {
                    for (var i = 0; i < updateAction['sortColumns'].length; i++) {
                        this.parent.treeGrid.sortByColumn(updateAction['sortColumns'][i]['field'], updateAction['sortColumns'][i]['direction'], (updateAction['sortColumns'].length > 1 ? true : false));
                    }
                }
            }
            else if (updateAction['action'] === 'ColumnState') {
                this.isFromUndoRedo = true;
                for (var i = 0; i < updateAction['showhideColumns'].length; i++) {
                    if (updateAction['showhideColumns'][i].visible) {
                        this.parent.hideColumn(updateAction['showhideColumns'][i].field, 'field');
                    }
                    else {
                        this.parent.showColumn(updateAction['showhideColumns'][i].field, 'field');
                    }
                }
            }
            else if (updateAction['action'] === 'Filtering') {
                for (var j = 0; j < updateAction['filteredColumns'].length; j++) {
                    this.isFromUndoRedo = true;
                    this.parent.filterByColumn(updateAction['filteredColumns'][j].field, updateAction['filteredColumns'][j].operator, updateAction['filteredColumns'][j].value, updateAction['filteredColumns'][j].predicate, updateAction['filteredColumns'][j].matchCase, updateAction['filteredColumns'][j].ignoreAccent);
                }
            }
            else if (updateAction['action'] === 'ColumnReorder') {
                this.isFromUndoRedo = true;
                var fromColumn = this.parent.treeGrid.columns[updateAction['fromIndex']]['field'];
                var toColumn = this.parent.treeGrid.columns[updateAction['toIndex']]['field'];
                this.parent.reorderColumns(fromColumn, toColumn);
            }
            else if (updateAction['action'] === 'Search') {
                this.isFromUndoRedo = true;
                this.parent.search(updateAction['searchString']);
            }
            else if (updateAction['action'] === 'ColumnResize') {
                this.parent.treeGrid.columns[updateAction['resizedColumn'].index]['width'] = updateAction['resizedColumn'].width;
                this.parent.treeGrid.refreshColumns();
            }
            else if (updateAction['action'] === 'RowDragAndDrop' || updateAction['action'] === 'TaskbarDragAndDrop') {
                for (var i = 0; i < updateAction['beforeDrop'].length; i++) {
                    var fromIndex = void 0;
                    var toIndex = void 0;
                    if (this.parent.viewType === 'ProjectView') {
                        fromIndex = this.parent.ids.indexOf(updateAction['beforeDrop'][i].data.ganttProperties.taskId.toString());
                        toIndex = this.parent.ids.indexOf(updateAction['beforeDrop'][i]['id'].toString());
                    }
                    else {
                        fromIndex = this.parent.ids.indexOf('T' + updateAction['beforeDrop'][i].data.ganttProperties.taskId.toString());
                        toIndex = this.parent.taskIds.indexOf(updateAction['beforeDrop'][i]['id'].toString());
                    }
                    this.parent.reorderRows([fromIndex], toIndex, updateAction['beforeDrop'][i].position);
                }
            }
            else if (updateAction['action'] === 'Indent' || updateAction['action'] === 'Outdent') {
                this.parent.selectRow(updateAction['selectedRowIndexes'][0]);
                if (updateAction['action'] === 'Indent') {
                    this.parent.indent();
                }
                if (updateAction['action'] === 'Outdent') {
                    this.parent.outdent();
                }
            }
            else if (updateAction['action'] === 'Delete') {
                var isShowDeleteConfirmDialog = extend([], [this.parent.editSettings.showDeleteConfirmDialog], [], true)[0];
                this.parent.editSettings.showDeleteConfirmDialog = false;
                this.parent.deleteRecord(updateAction['deleteRecords']);
                this.parent.editSettings.showDeleteConfirmDialog = isShowDeleteConfirmDialog;
            }
            else if (updateAction['action'] === 'Add') {
                if (this.parent.viewType === 'ResourceView' && updateAction['deletedRecordsDetails'].length > 1) {
                    this.parent.editModule.addRecord(extend([], [], updateAction['deletedRecordsDetails'], true));
                }
                else {
                    var rowIndex = void 0;
                    for (var i = 0; i < updateAction['deletedRecordsDetails'].length; i++) {
                        if (this.parent.viewType === 'ProjectView') {
                            rowIndex = this.parent.ids.indexOf(updateAction['deletedRecordsDetails'][i].id.toString());
                        }
                        else {
                            rowIndex = this.parent.taskIds.indexOf(updateAction['deletedRecordsDetails'][i].id.toString());
                        }
                        var position = void 0;
                        if (updateAction['deletedRecordsDetails'][i].position === 'above') {
                            position = 'Above';
                        }
                        if (updateAction['deletedRecordsDetails'][i].position === 'below') {
                            position = 'Below';
                        }
                        if (updateAction['deletedRecordsDetails'][i].position === 'child') {
                            position = 'Child';
                        }
                        if (updateAction['deletedRecordsDetails'][i].position === 'bottom') {
                            position = 'Bottom';
                        }
                        this.parent.editModule.addRecord(updateAction['deletedRecordsDetails'][i].data, position, rowIndex);
                    }
                }
            }
            else {
                this.parent.updateRecordByID(updateAction['modifiedRecords'][0]);
            }
            this.isUndoRedoPerformed = false;
            if (this.getUndoCollection.length > 0 && this.parent.toolbarModule) {
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], true);
            }
            this.getRedoCollection.splice(this.getRedoCollection.length - 1, 1);
            if (this.getRedoCollection.length === 0 && this.parent.toolbarModule) {
                this.redoEnabled = false;
                this.parent.toolbarModule.enableItems([this.parent.controlId + '_redo'], false);
            }
        }
    };
    UndoRedo.prototype.createUndoCollection = function () {
        if (this.parent['totalUndoAction'] + 1 > this.parent.undoRedoStepsCount && this.getUndoCollection.length === this.parent['totalUndoAction']) {
            this.getUndoCollection.splice(0, 1);
            this.disableRedo();
        }
        if (this.parent.toolbarModule) {
            this.parent.toolbarModule.enableItems([this.parent.controlId + '_undo'], true);
        }
        if (this.getUndoCollection.length === 0) {
            this.getUndoCollection[0] = [];
            if (this.parent['totalUndoAction'] + 1 <= this.parent.undoRedoStepsCount) {
                this.parent['totalUndoAction']++;
            }
        }
        else if (Object.keys(this['getUndoCollection'][this['getUndoCollection'].length - 1])['length'] > 0) {
            this.getUndoCollection[this.getUndoCollection.length] = [];
            if (this.parent['totalUndoAction'] + 1 <= this.parent.undoRedoStepsCount) {
                this.parent['totalUndoAction']++;
            }
        }
    };
    UndoRedo.prototype.disableRedo = function () {
        this.redoEnabled = false;
        this.getRedoCollection = [];
        if (this.parent.toolbarModule) {
            this.parent.toolbarModule.enableItems([this.parent.controlId + '_redo'], false);
        }
    };
    UndoRedo.prototype.findPosition = function (rowItems, records, detail) {
        var _loop_1 = function (i) {
            var record = {};
            record['data'] = rowItems[i];
            if (this_1.parent.viewType === 'ProjectView') {
                if (!rowItems[i].hasChildRecords && rowItems[i].parentItem) {
                    var parentItem = this_1.parent.getRecordByID(rowItems[i].parentItem.taskId);
                    if (parentItem.childRecords.length > 1) {
                        var recIndex = this_1.parent.ids.indexOf(rowItems[i].ganttProperties.taskId.toString());
                        var previousRecord = this_1.parent.flatData[recIndex - 1];
                        if (previousRecord.parentItem &&
                            previousRecord.parentItem.taskId.toString() === parentItem.ganttProperties.taskId.toString()) {
                            record['position'] = 'below';
                            record['id'] = extend([], [this_1.parent.flatData[this_1.parent.ids.indexOf(rowItems[i].ganttProperties.taskId.toString()) - 1].ganttProperties.taskId], [], true)[0];
                        }
                        else {
                            record['position'] = 'above';
                            var currentData = this_1.parent.flatData[this_1.parent.ids.indexOf(rowItems[i].ganttProperties.taskId.toString()) + 1];
                            var index = this_1.parent.ids.indexOf(rowItems[i].ganttProperties.taskId.toString()) + 1;
                            var rowIndex = i;
                            do {
                                var rowData = rowItems[rowIndex + 1];
                                if (!rowData ||
                                    (rowData && currentData.ganttProperties.taskId.toString() !==
                                        rowData.ganttProperties.taskId.toString())) {
                                    if (currentData && currentData.parentItem) {
                                        record['id'] = extend([], [currentData.ganttProperties.taskId], [], true)[0];
                                    }
                                    else {
                                        record['id'] = extend([], [rowItems[i].parentItem.taskId], [], true)[0];
                                        record['position'] = 'child';
                                    }
                                }
                                else {
                                    rowIndex++;
                                    index++;
                                    currentData = this_1.parent.flatData[index];
                                }
                            } while (!record['id']);
                        }
                    }
                    else {
                        record['position'] = 'child';
                        record['id'] = extend([], [parentItem.ganttProperties.taskId], [], true)[0];
                    }
                }
                else if (!rowItems[i].hasChildRecords && !rowItems[i].parentItem) {
                    if (this_1.parent.ids.indexOf(rowItems[i].ganttProperties.taskId.toString()) === this_1.parent.ids.length - 1) {
                        record['position'] = 'below';
                    }
                    else {
                        record['position'] = 'above';
                    }
                    var parentIndex = void 0;
                    var currentData = void 0;
                    var prevInd = void 0;
                    for (var k = 0; k < this_1.parent.treeGrid.parentData.length; k++) {
                        if (this_1.parent.treeGrid.parentData[k]['ganttProperties'].taskId.toString() === rowItems[i].ganttProperties.taskId.toString()) {
                            parentIndex = k;
                            currentData = this_1.parent.treeGrid.parentData[k + 1];
                            prevInd = k + 1;
                            break;
                        }
                    }
                    var rowIndex = i;
                    do {
                        var rowData = rowItems[rowIndex + 1];
                        if (!rowData || (rowData && currentData['ganttProperties'].taskId.toString() !== rowData.ganttProperties.taskId.toString())) {
                            if (currentData) {
                                record['id'] = extend([], [currentData['ganttProperties'].taskId], [], true)[0];
                            }
                            else {
                                currentData = this_1.parent.treeGrid.parentData[parentIndex - 1];
                                if (!currentData) {
                                    currentData = this_1.parent.treeGrid.parentData[parentIndex];
                                }
                                record['id'] = extend([], [currentData['ganttProperties'].taskId], [], true)[0];
                            }
                        }
                        else {
                            rowIndex++;
                            prevInd++;
                            currentData = this_1.parent.treeGrid.parentData[prevInd];
                        }
                    } while (!record['id']);
                }
                else if (rowItems[i].hasChildRecords && !rowItems[i].parentItem) {
                    var parentIndex = void 0;
                    var currentData = void 0;
                    var prevInd = void 0;
                    for (var k = 0; k < this_1.parent.treeGrid.parentData.length; k++) {
                        if (this_1.parent.treeGrid.parentData[k]['ganttProperties'].taskId.toString() === rowItems[i].ganttProperties.taskId.toString()) {
                            parentIndex = k;
                            currentData = this_1.parent.treeGrid.parentData[k + 1];
                            prevInd = k + 1;
                            break;
                        }
                    }
                    if (parentIndex !== -1) {
                        if (parentIndex === 0) {
                            record['position'] = 'above';
                            var rowIndex = i;
                            do {
                                var rowData = rowItems[rowIndex + 1];
                                if (!rowData || (rowData && currentData['ganttProperties'].taskId.toString() !== rowData.ganttProperties.taskId.toString())) {
                                    if (!currentData) {
                                        currentData = this_1.parent.treeGrid.parentData[parentIndex];
                                    }
                                    record['id'] = extend([], [currentData['ganttProperties'].taskId], [], true)[0];
                                }
                                else {
                                    rowIndex++;
                                    prevInd++;
                                    currentData = this_1.parent.treeGrid.parentData[prevInd];
                                }
                            } while (!record['id']);
                        }
                        else {
                            record['position'] = 'below';
                            record['id'] = extend([], [this_1.parent.treeGrid.parentData[parentIndex - 1].ganttProperties.taskId], [], true)[0];
                        }
                    }
                }
                else if (rowItems[i].hasChildRecords && rowItems[i].parentItem) {
                    var parentItem = this_1.parent.getRecordByID(rowItems[i].parentItem.taskId);
                    if (parentItem.childRecords.length === 1) {
                        record['position'] = 'child';
                        record['id'] = extend([], [rowItems[i].parentItem.taskId], [], true)[0];
                    }
                    else {
                        var childIndex = void 0;
                        for (var k = 0; k < parentItem.childRecords.length; k++) {
                            if (parentItem.childRecords[i].ganttProperties.taskId.toString() ===
                                rowItems[i].ganttProperties.taskId.toString()) {
                                childIndex = k;
                                break;
                            }
                        }
                        if (!isNullOrUndefined(childIndex)) {
                            if (childIndex === 0) {
                                record['position'] = 'above';
                                record['id'] = extend([], [parentItem.childRecords[childIndex + 1].ganttProperties.taskId], [], true)[0];
                            }
                            else {
                                record['position'] = 'below';
                                record['id'] = extend([], [parentItem.childRecords[childIndex - 1].ganttProperties.taskId], [], true)[0];
                            }
                        }
                    }
                }
            }
            else {
                if (rowItems[i].parentItem) {
                    var parentRecord = void 0;
                    if (rowItems[i].parentItem.index) {
                        parentRecord = this_1.parent.flatData[rowItems[i].parentItem.index];
                    }
                    else {
                        parentRecord = this_1.parent.flatData[this_1.parent.ids.indexOf(rowItems[i].parentItem.taskId)];
                    }
                    if (parentRecord.childRecords.length === 1) {
                        record['position'] = 'bottom';
                        record['id'] = 'R' + parentRecord.ganttProperties.taskId;
                        if (detail === 'deletedIndexes') {
                            record['position'] = 'child';
                            record['index'] = parentRecord.index;
                        }
                    }
                    else {
                        var currentIndex = void 0;
                        for (var j = 0; j < parentRecord.childRecords.length; j++) {
                            if (parentRecord.childRecords[j].ganttProperties.taskId.toString() ===
                                rowItems[i].ganttProperties.taskId.toString()) {
                                currentIndex = j;
                                break;
                            }
                        }
                        var previousRecord = parentRecord.childRecords[currentIndex - 1];
                        if (previousRecord && previousRecord.parentItem && previousRecord.parentUniqueID === parentRecord.uniqueID) {
                            record['position'] = 'below';
                            record['id'] = extend([], ['T' + this_1.parent.flatData[this_1.parent.taskIds.indexOf('T' + rowItems[i].ganttProperties.taskId.toString()) - 1].ganttProperties.taskId], [], true)[0];
                            if (detail === 'deletedIndexes') {
                                record['index'] = this_1.parent.taskIds.indexOf('T' + rowItems[i].ganttProperties.taskId.toString()) - 1;
                            }
                        }
                        else {
                            var index = void 0;
                            if (currentIndex !== parentRecord.childRecords.length - 1) {
                                record['position'] = 'above';
                                if (currentIndex === 0 && parentRecord.childRecords[1]) {
                                    index = parentRecord.childRecords[1].index;
                                }
                                else if (parentRecord.childRecords[currentIndex - 1]) {
                                    index = parentRecord.childRecords[currentIndex - 1].index;
                                }
                                var currentData = this_1.parent.flatData[index];
                                var recIndex = index;
                                var rowIndex = i;
                                do {
                                    var rowData = rowItems[rowIndex + 1];
                                    if (!rowData ||
                                        (rowData && currentData.ganttProperties.taskId.toString() !==
                                            rowData.ganttProperties.taskId.toString())) {
                                        if (currentData.parentItem) {
                                            record['id'] = extend([], ['T' + currentData.ganttProperties.taskId], [], true)[0];
                                            if (detail === 'deletedIndexes') {
                                                record['index'] = extend([], [currentData.index], [], true)[0];
                                                if (currentIndex === 0 && parentRecord.childRecords[1].ganttProperties.taskId ===
                                                    currentData.ganttProperties.taskId) {
                                                    record['index'] = record['index'] - 1;
                                                }
                                            }
                                        }
                                        else {
                                            record['id'] = extend([], ['R' + rowItems[i].parentItem.taskId], [], true)[0];
                                            record['position'] = 'child';
                                            if (detail === 'deletedIndexes') {
                                                record['index'] = rowItems[i].parentItem.index;
                                            }
                                        }
                                    }
                                    else {
                                        rowIndex++;
                                        recIndex++;
                                        currentData = this_1.parent.flatData[recIndex];
                                    }
                                } while (!record['id']);
                            }
                            else {
                                if (currentIndex === parentRecord.childRecords.length - 1) {
                                    record['position'] = 'below';
                                }
                                else {
                                    record['position'] = 'above';
                                }
                                record['id'] = 'T' + parentRecord.childRecords[currentIndex - 1].ganttProperties.taskId;
                                if (detail === 'deletedIndexes') {
                                    record['index'] = parentRecord.childRecords[currentIndex - 1].index;
                                }
                            }
                        }
                    }
                }
                else {
                    var parentData = this_1.parent.treeGrid.parentData.filter(function (parentData) {
                        return parentData.ganttProperties.taskId === rowItems[i].ganttProperties.taskId;
                    })[0];
                    var parentDataIndex = this_1.parent.treeGrid.parentData.indexOf(parentData);
                    if (parentDataIndex === 0) {
                        record['position'] = 'above';
                        var currentData = void 0;
                        var prevInd = void 0;
                        for (var k = 0; k < this_1.parent.treeGrid.parentData.length; k++) {
                            if (this_1.parent.treeGrid.parentData[k]['ganttProperties'].taskId === rowItems[i].ganttProperties.taskId) {
                                currentData = this_1.parent.treeGrid.parentData[k + 1];
                                prevInd = k + 1;
                                break;
                            }
                        }
                        var rowIndex = i;
                        do {
                            var rowData = rowItems[rowIndex + 1];
                            if (!rowData || (rowData && currentData['ganttProperties'].taskId !== rowData.ganttProperties.taskId)) {
                                record['id'] = 'R' + currentData['ganttProperties'].taskId;
                                if (detail === 'deletedIndexes') {
                                    record['index'] = currentData['index'];
                                }
                            }
                            else {
                                rowIndex++;
                                prevInd++;
                                currentData = this_1.parent.treeGrid.parentData[prevInd];
                            }
                        } while (!record['id']);
                    }
                    else {
                        record['position'] = 'below';
                        record['id'] = 'R' + this_1.parent.treeGrid.parentData[parentDataIndex - 1]['ganttProperties']['taskId'];
                        if (detail === 'deletedIndexes') {
                            record['index'] = this_1.parent.treeGrid.parentData[parentDataIndex - 1]['index'];
                        }
                    }
                }
            }
            if (detail === 'deletedIndexes') {
                var parent_1 = this_1.parent.getTaskByUniqueID(record['data'].parentUniqueID);
                if (this_1.parent.editModule.dialogModule.ganttResources.length === 0 && records[detail].indexOf(record) === -1) {
                    records[detail].push(record);
                }
                else {
                    for (var j = 0; j < this_1.parent.editModule.dialogModule.ganttResources.length; j++) {
                        if (this_1.parent.editModule.dialogModule.ganttResources[j][this_1.parent.resourceFields.id] !==
                            parent_1.ganttProperties.taskId && records[detail].indexOf(record) === -1) {
                            records[detail].push(record);
                        }
                    }
                }
            }
            else {
                if (!records[detail].some(function (existingRecord) { return existingRecord.data.ganttProperties.taskId === record['data'].ganttProperties.taskId; })) {
                    records[detail].push(record);
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < rowItems.length; i++) {
            _loop_1(i);
        }
    };
    UndoRedo.prototype.getModuleName = function () {
        return 'undoRedo';
    };
    /**
     * Destroys the UndoRedo of Gantt.
     *
     * @returns {void} .
     * @private
     */
    UndoRedo.prototype.destroy = function () {
        if (!this.parent.enableUndoRedo && this.parent.undoRedoModule) {
            this.parent.undoRedoModule = undefined;
        }
    };
    return UndoRedo;
}());
export { UndoRedo };
