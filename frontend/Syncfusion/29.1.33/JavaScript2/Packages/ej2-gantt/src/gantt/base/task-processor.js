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
import { isNullOrUndefined, getValue, extend, setValue } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { isCountRequired, isScheduledTask } from './utils';
import { DateProcessor } from './date-processor';
/**
 * To calculate and update task related values
 */
var TaskProcessor = /** @class */ (function (_super) {
    __extends(TaskProcessor, _super);
    function TaskProcessor(parent) {
        var _this = _super.call(this, parent) || this;
        _this.customSegmentProperties = [];
        _this.isBaseline = false;
        _this.uid = 0;
        _this.recordIndex = 0;
        _this.taskIds = [];
        _this.hierarchyData = [];
        _this.addEventListener();
        return _this;
    }
    TaskProcessor.prototype.addEventListener = function () {
        this.parent.on('beforeDataManipulate', this.checkDataBinding.bind(this));
    };
    /**
     * @param {boolean} isChange .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.checkDataBinding = function (isChange) {
        var _this = this;
        if (isChange) {
            this.parent.flatData = [];
            this.parent.currentViewData = [];
            this.parent.updatedRecords = [];
            this.dataArray = [];
            this.taskIds = [];
            this.parent.ids = [];
            this.recordIndex = 0;
            this.hierarchyData = [];
            this.parent.predecessorsCollection = [];
            this.parent.treeGrid.parentData = [];
            this.parent.taskIds = [];
        }
        if (isNullOrUndefined(this.parent.dataSource)) {
            this.parent.dataSource = [];
            this.parent.processTimeline();
            this.parent.renderGantt(isChange);
        }
        else if (this.parent.dataSource instanceof DataManager) {
            this.initDataSource(isChange);
        }
        else {
            if (this.parent.dataSource instanceof Object && isCountRequired(this.parent)) {
                var ganttdata = getValue('result', this.parent.dataSource);
                this.dataArray = ganttdata;
            }
            else {
                this.dataArray = this.parent.dataSource;
            }
            this.processTimeline();
            this.cloneDataSource();
            this.parent.renderGantt(isChange);
            this.parent.flatData.map(function (data) {
                _this.parent.chartRowsModule.updateSegment(data.ganttProperties.segments, data.ganttProperties.taskId);
            });
        }
        this.parent.flatData.map(function (data) {
            _this.parent.chartRowsModule.updateSegment(data.ganttProperties.segments, data.ganttProperties.taskId);
        });
    };
    TaskProcessor.prototype.processTimeline = function () {
        this.parent.processTimeline();
        if (!this.parent.enableValidation) {
            this.parent.dataOperation.calculateProjectDatesForValidatedTasks();
            this.parent.timelineModule.validateTimelineProp();
        }
    };
    TaskProcessor.prototype.initDataSource = function (isChange) {
        var _this = this;
        var queryManager = this.parent.query instanceof Query ? this.parent.query : new Query();
        queryManager.requiresCount();
        var dataManager = this.parent.dataSource;
        if (this.parent.loadChildOnDemand && this.parent.taskFields.hasChildMapping) {
            this.processTimeline();
            this.parent.renderGantt(isChange);
        }
        else {
            dataManager.executeQuery(queryManager).then(function (e) {
                _this.dataArray = e.result;
                _this.processTimeline();
                if (!_this.parent.loadChildOnDemand || (_this.parent.loadChildOnDemand && !(_this.parent.taskFields.hasChildMapping))) {
                    _this.cloneDataSource();
                }
                _this.parent.renderGantt(isChange);
            }).catch(function (e) {
                // Trigger action failure event
                _this.parent.processTimeline();
                _this.parent.renderGantt(isChange);
                _this.parent.trigger('actionFailure', { error: e });
            });
        }
    };
    TaskProcessor.prototype.constructDataSource = function (dataSource) {
        var mappingData = new DataManager(dataSource).executeLocal(new Query()
            .group(this.parent.taskFields.parentID));
        var rootData = [];
        var index;
        for (var i = 0; i < mappingData.length; i++) {
            var groupData = mappingData[i];
            if (!isNullOrUndefined(groupData.key)) {
                index = this.taskIds.indexOf(groupData.key.toString());
                if (index > -1) {
                    if (!isNullOrUndefined(groupData.key)) {
                        dataSource[index][this.parent.taskFields.child] = groupData.items;
                        continue;
                    }
                }
            }
            if (index !== -1) {
                rootData.push.apply(rootData, groupData.items); // eslint-disable-line
            }
        }
        this.hierarchyData = this.dataReorder(dataSource, rootData);
    };
    TaskProcessor.prototype.cloneDataSource = function () {
        var taskIdMapping = this.parent.taskFields.id;
        var parentIdMapping = this.parent.taskFields.parentID;
        var hierarchicalData = [];
        if (!isNullOrUndefined(taskIdMapping) && !isNullOrUndefined(parentIdMapping)) {
            var data = [];
            for (var i = 0; i < this.dataArray.length; i++) {
                var tempData = this.dataArray[i];
                if (tempData['parentItem']) {
                    delete tempData['parentItem'];
                }
                data.push(extend({}, {}, tempData, true));
                if (!isNullOrUndefined(tempData[taskIdMapping])) {
                    this.taskIds.push(tempData[taskIdMapping].toString());
                }
            }
            if (!this.parent.taskFields.child) {
                this.parent.setProperties({ taskFields: { child: 'Children' } }, true);
            }
            this.constructDataSource(data);
            hierarchicalData = this.hierarchyData;
        }
        else {
            hierarchicalData = this.dataArray;
        }
        if (this.parent.taskFields.segmentId) {
            this.segmentCollection = new DataManager(this.parent.segmentData).executeLocal(new Query()
                .group(this.parent.taskFields.segmentId));
            if (!this.parent.taskFields.segments) {
                this.parent.taskFields.segments = 'Segments';
            }
        }
        if (this.parent.viewType !== 'ProjectView') {
            var resources = extend([], [], this.parent.resources, true);
            var unassignedTasks = [];
            this.constructResourceViewDataSource(resources, hierarchicalData, unassignedTasks);
            if (unassignedTasks.length > 0) {
                var record = {};
                var resourceName = this.parent.resourceFields.name || 'resourceName';
                record[this.parent.resourceFields.id] = 0;
                record[resourceName] = this.parent.localeObj.getConstant('unassignedTask');
                record[this.parent.taskFields.child] = unassignedTasks;
                resources.push(record);
            }
            hierarchicalData = resources;
        }
        this.prepareDataSource(hierarchicalData);
    };
    /**
     * @param {object[]} resources .
     * @param {object[]} data .
     * @param {object[]} unassignedTasks .
     * @returns {void} .
     *
     */
    TaskProcessor.prototype.constructResourceViewDataSource = function (resources, data, unassignedTasks) {
        var _loop_1 = function (i) {
            var tempData = data[i];
            var child = this_1.parent.taskFields.child !== null ? this_1.parent.taskFields.child : this_1.parent.taskFields.child = 'Children';
            var resourceData = tempData && tempData[this_1.parent.taskFields.resourceInfo];
            var resourceIdMapping = this_1.parent.resourceFields.id;
            if ((!tempData[child] || tempData[child].length === 0) && resourceData && resourceData.length) {
                if (typeof (resourceData) === 'string') {
                    this_1.isResourceString = true;
                    var id = resourceData;
                    for (var j = 0; j < resources.length; j++) {
                        if (resources[j][this_1.parent.resourceFields.name].toString() === id.toString()) {
                            if (resources[j][child]) {
                                resources[j][child].push(tempData);
                            }
                            else {
                                resources[j][child] = [tempData];
                            }
                            break;
                        }
                    }
                }
                else {
                    resourceData.forEach(function (resource) {
                        var id = (typeof resource === 'object') ? resource[resourceIdMapping] :
                            resource;
                        for (var j = 0; j < resources.length; j++) {
                            if (resources[j][resourceIdMapping].toString() === id.toString()) {
                                if (resources[j][child]) {
                                    resources[j][child].push(tempData);
                                }
                                else {
                                    resources[j][child] = [tempData];
                                }
                                break;
                            }
                        }
                    });
                }
            }
            else if (!tempData[child] || (tempData[child] && tempData[child].length === 0)) {
                unassignedTasks.push(tempData);
            }
            if (tempData[this_1.parent.taskFields.child] && tempData[this_1.parent.taskFields.child].length) {
                this_1.constructResourceViewDataSource(resources, tempData[this_1.parent.taskFields.child], unassignedTasks);
            }
        };
        var this_1 = this;
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * Function to manipulate data-source
     *
     * @param {object[]} data .
     * @returns {void} .
     * @hidden
     */
    TaskProcessor.prototype.prepareDataSource = function (data) {
        this.prepareRecordCollection(data, 0);
        this.parent.initialLoadData = extend({}, {}, this.parent.flatData, true);
        if (!this.parent.autoCalculateDateScheduling || (this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand &&
            this.parent.taskFields.hasChildMapping)) {
            this.parent.dataMap = this.parent.flatData.reduce(function (map, val) {
                map.set(val.uniqueID, val);
                return map;
            }, new Map());
        }
        // Method to maintain the shared task uniqueIds
        if (this.parent.viewType === 'ResourceView') {
            this.calculateSharedTaskUniqueIds();
        }
        if (this.parent.taskFields.dependency && this.parent.predecessorModule) {
            this.parent.predecessorModule.ensurePredecessorCollection();
        }
    };
    TaskProcessor.prototype.calculateSharedTaskUniqueIds = function () {
        var _loop_2 = function (i) {
            var value = [];
            value[0] = this_2.parent.getTaskIds()[i][0];
            value[1] = this_2.parent.getTaskIds()[i].slice(1);
            if (value[0] !== 'R') {
                var sharedRecords_1 = [];
                var ids_1 = [];
                this_2.parent.flatData.filter(function (data) {
                    if (data.ganttProperties.taskId.toString() === value[1] && data.level !== 0) {
                        ids_1.push(data.ganttProperties.rowUniqueID);
                        sharedRecords_1.push(data);
                    }
                });
                for (var j = 0; j < sharedRecords_1.length; j++) {
                    sharedRecords_1[j].ganttProperties.sharedTaskUniqueIds = ids_1;
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < this.parent.getTaskIds().length; i++) {
            _loop_2(i);
        }
    };
    TaskProcessor.prototype.prepareRecordCollection = function (data, level, parentItem) {
        var _this = this;
        var length = data.length;
        var _loop_3 = function (i) {
            var tempData = data[i];
            if (!isNullOrUndefined(this_3.parent.taskFields.segmentId)) {
                var segmentData = this_3.segmentCollection.
                    filter(function (x) { return x.key === tempData[_this.parent.taskFields.id]; });
                if (segmentData.length > 0) {
                    tempData[this_3.parent.taskFields.segments] = segmentData[0].items;
                }
            }
            if (this_3.parent.taskFields.hasChildMapping && tempData['parentUniqueID']) {
                parentItem = this_3.parent.getTaskByUniqueID(tempData['parentUniqueID']);
            }
            var ganttData = this_3.createRecord(tempData, level, parentItem, true);
            if (!this_3.parent.enableValidation || (!this_3.parent.autoCalculateDateScheduling || (this_3.parent.isLoad &&
                this_3.parent.treeGrid.loadChildOnDemand && this_3.parent.taskFields.hasChildMapping))) {
                this_3.updateTaskLeftWidth(ganttData);
            }
            ganttData.index = this_3.recordIndex++;
            this_3.parent.ids[ganttData.index] = ganttData.ganttProperties.rowUniqueID;
            this_3.parent.flatData.push(ganttData);
            this_3.parent.setTaskIds(ganttData);
            var childData = tempData[this_3.parent.taskFields.child] || (tempData['taskData'] && tempData['taskData'][this_3.parent.taskFields.child]);
            if (this_3.parent.viewType === 'ResourceView' && isNullOrUndefined(childData)
                && isNullOrUndefined(ganttData.parentItem) && ganttData.level === 0) {
                var ganttProp = ganttData.ganttProperties;
                var parentData = ganttData;
                this_3.parent.setRecordValue(ganttProp.isAutoSchedule ? 'startDate' : 'autoStartDate', null, parentData.ganttProperties, true);
                this_3.parent.setRecordValue(ganttProp.isAutoSchedule ? 'endDate' : 'autoEndDate', null, parentData.ganttProperties, true);
                var parentProgress = 0;
                var parentProp = parentData.ganttProperties;
                this_3.parent.setRecordValue('isMilestone', false, parentProp, true);
                if (parentProp.isAutoSchedule) {
                    this_3.calculateDuration(parentData);
                }
                this_3.updateWorkWithDuration(parentData);
                var parentWork = parentProp.work;
                this_3.parent.setRecordValue('work', parentWork, parentProp, true);
                this_3.parent.setRecordValue('taskType', 'FixedDuration', parentProp, true);
                if (!isNullOrUndefined(this_3.parent.taskFields.type)) {
                    this_3.updateMappingData(parentData, 'type');
                }
                this_3.parent.setRecordValue('progress', Math.floor(parentProgress), parentProp, true);
                this_3.parent.setRecordValue('totalProgress', 0, parentProp, true);
                this_3.parent.setRecordValue('totalDuration', 0, parentProp, true);
                if (!parentProp.isAutoSchedule) {
                    this_3.parent.setRecordValue('autoDuration', this_3.calculateAutoDuration(parentProp), parentProp, true);
                    this_3.updateAutoWidthLeft(parentData);
                }
                if (!this_3.parent.allowParentDependency) {
                    this_3.resetDependency(parentData);
                }
                this_3.updateWidthLeft(parentData);
                this_3.updateTaskData(parentData);
            }
            if (this_3.parent.taskFields.hasChildMapping) {
                parentItem = null;
            }
            if (!isNullOrUndefined(childData) && childData.length > 0) {
                this_3.prepareRecordCollection(childData, ganttData.level + 1, ganttData);
            }
        };
        var this_3 = this;
        for (var i = 0; i < length; i++) {
            _loop_3(i);
        }
    };
    /**
     * Method to update custom field values in gantt record
     *
     * @param {object} data .
     * @param {IGanttData} ganttRecord .
     * @returns {void} .
     */
    TaskProcessor.prototype.addCustomFieldValue = function (data, ganttRecord) {
        var columns = this.parent.ganttColumns;
        var length = columns.length;
        if (length) {
            for (var i = 0; i < length; i++) {
                var fieldName = ganttRecord[columns[i].field];
                if (fieldName === undefined) {
                    this.parent.setRecordValue(columns[i].field, data[columns[i].field], ganttRecord);
                }
            }
        }
    };
    TaskProcessor.prototype.getGanttUid = function (prefix) {
        return prefix + this.uid++;
    };
    /**
     * To populate Gantt record
     *
     * @param {object} data .
     * @param {number} level .
     * @param {IGanttData} parentItem .
     * @param {boolean} isLoad .
     * @returns {IGanttData} .
     * @private
     */
    TaskProcessor.prototype.createRecord = function (data, level, parentItem, isLoad) {
        var taskSettings = this.parent.taskFields;
        var resourceFields = this.parent.resourceFields;
        var progress = data[taskSettings.progress];
        var id = null;
        var name = null;
        var notes = data[taskSettings.notes];
        progress = progress ? parseFloat(progress.toString()) ? parseFloat(progress.toString()) : 0 : 0;
        progress = (100 < progress) ? 100 : progress;
        var predecessors = data[taskSettings.dependency];
        var baselineStartDate = this.getDateFromFormat(data[taskSettings.baselineStartDate], true);
        var baselineEndDate = this.getDateFromFormat(data[taskSettings.baselineEndDate], true);
        var ganttData = {};
        var ganttProperties = {};
        var autoSchedule = (this.parent.taskMode === 'Auto') ? true :
            (this.parent.taskMode === 'Manual') ? false :
                data[taskSettings.manual] === true ? false : true;
        this.parent.setRecordValue('ganttProperties', ganttProperties, ganttData);
        if (data['ganttProperties'] && data['ganttProperties'].predecessor && data['ganttProperties'].predecessor.length > 0 && this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed']) {
            this.parent.setRecordValue('predecessor', data['ganttProperties'].predecessor, ganttProperties, true);
        }
        if (!isNullOrUndefined(data[taskSettings.id])) {
            id = data[taskSettings.id];
            name = data[taskSettings.name];
            var shouldLoadChild = (this.parent.loadChildOnDemand &&
                taskSettings.hasChildMapping && data['taskData']) ? true : false;
            if (shouldLoadChild) {
                ganttData['taskData'] = data['taskData'];
            }
            else {
                if (data['taskData'] && data['ganttProperties']) {
                    this.addTaskData(ganttData, data['taskData'], isLoad);
                }
                else {
                    this.addTaskData(ganttData, data, isLoad);
                }
            }
        }
        else if (!isNullOrUndefined(data[resourceFields.id])) {
            id = data[resourceFields.id];
            if (isNullOrUndefined(data[resourceFields.name]) && data['resourceName'] === 'Unassigned Task') {
                name = data['resourceName'];
            }
            else {
                name = data[resourceFields.name];
            }
            this.addTaskData(ganttData, data, false);
        }
        this.parent.setRecordValue('taskId', id, ganttProperties, true);
        this.parent.setRecordValue('taskName', name, ganttProperties, true);
        // eslint-disable-next-line
        this.parent && taskSettings.parentID && this.parent.setRecordValue('parentId', data[taskSettings.parentID], ganttProperties, true);
        this.addCustomFieldValue(data, ganttData);
        this.parent.setRecordValue('isAutoSchedule', autoSchedule, ganttProperties, true);
        if (!this.parent.undoRedoModule || (this.parent.undoRedoModule && !this.parent.undoRedoModule['isUndoRedoPerformed'])) {
            this.parent.setRecordValue('resourceInfo', this.setResourceInfo(data), ganttProperties, true);
        }
        else if (data['ganttProperties']) {
            this.parent.setRecordValue('resourceInfo', data['ganttProperties'].resourceInfo, ganttProperties, true);
        }
        this.parent.setRecordValue('isMilestone', false, ganttProperties, true);
        this.parent.setRecordValue('indicators', data[taskSettings.indicators], ganttProperties, true);
        this.updateResourceName(ganttData);
        if ((!isNullOrUndefined(data[taskSettings.child]) && data[taskSettings.child].length > 0) ||
            (data['taskData'] && data['taskData'][taskSettings.child] && data['taskData'][taskSettings.child].length > 0)) {
            this.parent.setRecordValue('hasChildRecords', true, ganttData);
            this.parent.setRecordValue('isMilestone', false, ganttProperties, true);
            if (!this.parent.allowParentDependency) {
                this.resetDependency(ganttData);
            }
        }
        else {
            if (this.parent.loadChildOnDemand && taskSettings.hasChildMapping && ganttData.taskData[taskSettings.hasChildMapping]) {
                this.parent.setRecordValue('hasChildRecords', true, ganttData);
            }
            else {
                this.parent.setRecordValue('hasChildRecords', false, ganttData);
            }
        }
        this.calculateScheduledValues(ganttData, data, isLoad);
        this.parent.setRecordValue('baselineStartDate', this.checkBaselineStartDate(baselineStartDate, ganttProperties), ganttProperties, true);
        // set default end time, if hour is 0
        var dayEndTime;
        if (this.parent.weekWorkingTime.length > 0 && baselineEndDate) {
            dayEndTime = this.parent['getEndTime'](baselineEndDate);
        }
        else {
            dayEndTime = this.parent.defaultEndTime;
        }
        if (baselineEndDate && baselineEndDate.getHours() === 0 && dayEndTime !== 86400) {
            this.setTime(dayEndTime, baselineEndDate);
        }
        if ((ganttProperties.baselineStartDate && baselineEndDate &&
            (ganttProperties.baselineStartDate.getTime() > baselineEndDate.getTime())) ||
            ((!isNullOrUndefined(ganttProperties.baselineStartDate) && !isNullOrUndefined(ganttProperties.startDate)
                && (ganttProperties.baselineStartDate.getTime() === ganttProperties.startDate.getTime()))
                && (!isNullOrUndefined(baselineEndDate) && !isNullOrUndefined(ganttProperties.endDate)
                    && (baselineEndDate.toLocaleDateString() === ganttProperties.endDate.toLocaleDateString())) &&
                ganttProperties.isMilestone)) {
            baselineEndDate = ganttProperties.baselineStartDate;
        }
        this.parent.setRecordValue('baselineEndDate', this.checkBaselineEndDate(baselineEndDate, ganttProperties), ganttProperties, true);
        this.parent.setRecordValue('progress', progress, ganttProperties, true);
        this.parent.setRecordValue('totalProgress', progress, ganttProperties, true);
        if (data['ganttProperties'] && data['ganttProperties'].predecessorsName && this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed']) {
            this.parent.setRecordValue('predecessorsName', data['ganttProperties'].predecessorsName, ganttProperties, true);
        }
        else {
            this.parent.setRecordValue('predecessorsName', predecessors, ganttProperties, true);
        }
        this.parent.setRecordValue('notes', notes, ganttProperties, true);
        this.parent.setRecordValue('cssClass', data[taskSettings.cssClass], ganttProperties, true);
        this.parent.setRecordValue('parentItem', this.getCloneParent(parentItem), ganttData);
        if (this.parent.loadChildOnDemand && taskSettings.hasChildMapping && this.parent.currentViewData.length > 0) {
            this.parent.setRecordValue('parentItem', ganttData.parentItem, this.parent.currentViewData[this.taskIds.indexOf(data[taskSettings.id].toString())]);
        }
        var parentUniqId = ganttData.parentItem ? ganttData.parentItem.uniqueID : null;
        this.parent.setRecordValue('parentUniqueID', parentUniqId, ganttData);
        if (this.parent.viewType === 'ResourceView' && !isNullOrUndefined(taskSettings.parentID)
            && !isNullOrUndefined(ganttData.parentItem)) {
            this.parent.setRecordValue('parentId', ganttData.parentItem.taskId, ganttProperties, true);
        }
        this.parent.setRecordValue('level', level, ganttData);
        if (data['ganttProperties'] && this.parent.undoRedoModule && this.parent.undoRedoModule['isUndoRedoPerformed']) {
            this.parent.setRecordValue('uniqueID', data['uniqueID'], ganttData);
        }
        else {
            if (this.parent.loadChildOnDemand && taskSettings.hasChildMapping && data['uniqueID']) {
                this.parent.setRecordValue('uniqueID', data['uniqueID'], ganttData);
            }
            else {
                this.parent.setRecordValue('uniqueID', this.getGanttUid(this.parent.element.id + '_data_'), ganttData);
            }
        }
        this.parent.setRecordValue('uniqueID', ganttData.uniqueID, ganttProperties, true);
        this.parent.setRecordValue('childRecords', [], ganttData);
        if (this.parent.dataSource instanceof Object && isCountRequired(this.parent) &&
            !isNullOrUndefined(taskSettings.child)) {
            this.parent.setRecordValue(taskSettings.child, [], ganttData);
        }
        if (ganttData.hasChildRecords) {
            this.parent.setRecordValue('autoStartDate', ganttData.ganttProperties.startDate, ganttProperties);
            this.parent.setRecordValue('autoEndDate', ganttData.ganttProperties.endDate, ganttProperties);
            this.parent.setRecordValue('autoDuration', ganttData.ganttProperties.duration, ganttProperties);
        }
        this.parent.setRecordValue('expanded', (ganttData.hasChildRecords && this.parent.collapseAllParentTasks) ? false : true, ganttData);
        this.updateExpandStateMappingValue(ganttData, data);
        if (!isLoad) {
            this.parent.setRecordValue('width', this.calculateWidth(ganttData), ganttProperties, true);
            this.parent.setRecordValue('left', this.calculateLeft(ganttProperties, ganttData), ganttProperties, true);
            this.parent.setRecordValue('progressWidth', this.getProgressWidth(ganttProperties.width, progress), ganttProperties, true);
            if (ganttProperties.baselineEndDate && ganttProperties.baselineStartDate) {
                this.parent.setRecordValue('baselineLeft', this.calculateBaselineLeft(ganttProperties), ganttProperties, true);
                this.parent.setRecordValue('baselineWidth', this.calculateBaselineWidth(ganttProperties), ganttProperties, true);
            }
        }
        if (isNullOrUndefined(taskSettings.work)) {
            this.updateWorkWithDuration(ganttData);
        }
        if (!isNullOrUndefined(taskSettings.manual)) {
            this.parent.dataOperation.updateMappingData(ganttData, 'manual');
        }
        this.updateTaskData(ganttData);
        if (predecessors) {
            this.parent.predecessorsCollection.push(ganttData);
        }
        if (!isNullOrUndefined(parentItem)) {
            parentItem.childRecords.push(ganttData);
            if (this.parent.dataSource instanceof Object && isCountRequired(this.parent) &&
                !isNullOrUndefined(this.parent.taskFields.child)) {
                parentItem[this.parent.taskFields.child].push(ganttData.taskData);
            }
        }
        if (this.parent.viewType === 'ProjectView') {
            this.parent.setRecordValue('rowUniqueID', ganttProperties.taskId.toString(), ganttProperties, true);
        }
        else {
            var uniqueId = ganttData.uniqueID.replace(this.parent.element.id + '_data_', '');
            // if (this.parent.viewType === 'ResourceView' && typeof(ganttData.ganttProperties.taskId) === 'string') {
            //     uniqueId = ganttProperties.taskId.toString();
            // }
            this.parent.setRecordValue('rowUniqueID', uniqueId, ganttData);
            this.parent.setRecordValue('rowUniqueID', uniqueId, ganttProperties, true);
            this.parent.setRecordValue('sharedTaskUniqueIds', [], ganttProperties, true);
        }
        if (this.parent.allowUnscheduledTasks && ganttData.ganttProperties.startDate
            && (ganttData.ganttProperties.endDate || ganttData.ganttProperties.duration)) {
            this.parent.setRecordValue('segments', this.setSegmentsInfo(ganttData, true), ganttProperties, true);
            this.parent.dataOperation.updateMappingData(ganttData, 'segments');
            if (!isLoad) {
                this.updateWidthLeft(ganttData);
            }
        }
        this.parent.chartRowsModule.updateSegment(ganttData.ganttProperties.segments, ganttData.ganttProperties.taskId);
        return ganttData;
    };
    TaskProcessor.prototype.sortSegmentsData = function (segments, onLoad, ganttProp) {
        var _this = this;
        if (onLoad) {
            segments.sort(function (a, b) {
                var startDate = _this.parent.taskFields.startDate;
                return _this.getDateFromFormat(a[startDate]).getTime() - _this.getDateFromFormat(b[startDate]).getTime();
            });
        }
        else {
            segments.sort(function (a, b) {
                return a.startDate.getTime() - b.startDate.getTime();
            });
        }
        return segments;
    };
    TaskProcessor.prototype.setSegmentsInfo = function (data, onLoad) {
        var _this = this;
        var taskSettings = this.parent.taskFields;
        var ganttSegments = [];
        var segments;
        var sumOfDuration = 0;
        var remainingDuration = 0;
        var predefinedProperties = [this.parent.taskFields.duration, this.parent.taskFields.endDate,
            this.parent.taskFields.startDate, this.parent.taskFields.id];
        var taskData = [];
        if (!isNullOrUndefined(this.parent.taskFields.segments)) {
            segments = onLoad ? data.taskData[this.parent.taskFields.segments] : data.ganttProperties.segments;
            if (!onLoad) {
                if (data.taskData[this.parent.taskFields.segments] && data.taskData[this.parent.taskFields.segments].length > 0) {
                    data.taskData[this.parent.taskFields.segments].forEach(function (segment) {
                        var cleanedObject = {};
                        var extraProperties = {};
                        for (var key in segment) {
                            if (predefinedProperties.indexOf(key) !== -1) {
                                cleanedObject[key] = segment[key];
                            }
                            else {
                                extraProperties[key] = segment[key];
                            }
                        }
                        _this.customSegmentProperties.push(extraProperties);
                    });
                }
            }
            if (!isNullOrUndefined(segments) && segments.length > 1) {
                this.sortSegmentsData(segments, onLoad, data.ganttProperties);
                for (var i = 0; i < segments.length; i++) {
                    var segment = segments[i];
                    var startDate = onLoad ? segment[taskSettings.startDate] : segment.startDate;
                    var endDate = onLoad ? segment[taskSettings.endDate] : segment.endDate;
                    var duration = onLoad ? segment[taskSettings.duration] : segment.duration;
                    startDate = this.getDateFromFormat(startDate);
                    startDate = this.checkStartDate(startDate, data.ganttProperties, false);
                    if (!isNullOrUndefined(duration)) {
                        endDate = this.getEndDate(startDate, duration, data.ganttProperties.durationUnit, data.ganttProperties, false);
                        if (taskSettings.duration) {
                            remainingDuration = data.ganttProperties.duration - sumOfDuration;
                            if (remainingDuration <= 0) {
                                continue;
                            }
                            duration = i === segments.length - 1 ? remainingDuration : remainingDuration > 0 &&
                                duration > remainingDuration ? remainingDuration : duration;
                            endDate = this.getEndDate(startDate, duration, data.ganttProperties.durationUnit, data.ganttProperties, false);
                        }
                        else if (!taskSettings.duration && taskSettings.endDate && endDate) {
                            endDate = (!isNullOrUndefined(data.ganttProperties.endDate)) && endDate.getTime() >=
                                data.ganttProperties.endDate.getTime() && i === segments.length - 1 ? data.ganttProperties.endDate : endDate;
                            duration = this.getDuration(startDate, endDate, data.ganttProperties.durationUnit, data.ganttProperties.isAutoSchedule, data.ganttProperties.isMilestone);
                            if (ganttSegments.length > 0 && endDate.getTime() < startDate.getTime()
                                && endDate.getTime() <= data.ganttProperties.endDate.getTime()) {
                                ganttSegments[i - 1].duration = this.getDuration(ganttSegments[i - 1].startDate, data.ganttProperties.endDate, data.ganttProperties.durationUnit, data.ganttProperties.isAutoSchedule, data.ganttProperties.isMilestone);
                                continue;
                            }
                        }
                    }
                    else {
                        endDate = this.getDateFromFormat(endDate);
                        if (endDate && (isNullOrUndefined(duration) || String(duration) === '')) {
                            var dayEndTime = void 0;
                            if (this.parent.weekWorkingTime.length > 0) {
                                dayEndTime = this.parent['getEndTime'](endDate);
                            }
                            else {
                                dayEndTime = this.parent.defaultEndTime;
                            }
                            if (endDate.getHours() === 0 && dayEndTime !== 86400) {
                                this.setTime(dayEndTime, endDate);
                            }
                        }
                        endDate = this.checkEndDate(endDate, data.ganttProperties, false);
                        duration = this.getDuration(startDate, endDate, data.ganttProperties.durationUnit, data.ganttProperties.isAutoSchedule, data.ganttProperties.isMilestone);
                        if (taskSettings.duration) {
                            remainingDuration = data.ganttProperties.duration - sumOfDuration - 1;
                            if (remainingDuration <= 0) {
                                continue;
                            }
                            duration = i === segments.length - 1 ? remainingDuration : remainingDuration > 0 &&
                                duration > remainingDuration ? remainingDuration : duration;
                            endDate = this.getEndDate(startDate, duration, data.ganttProperties.durationUnit, data.ganttProperties, false);
                        }
                        else if (!taskSettings.duration && taskSettings.endDate && endDate) {
                            endDate = (!isNullOrUndefined(data.ganttProperties.endDate)) && endDate.getTime() >=
                                data.ganttProperties.endDate.getTime() && i === segments.length - 1 ? data.ganttProperties.endDate : endDate;
                            duration = this.getDuration(startDate, endDate, data.ganttProperties.durationUnit, data.ganttProperties.isAutoSchedule, data.ganttProperties.isMilestone);
                            if (ganttSegments.length > 0 && endDate.getTime() < startDate.getTime()
                                && endDate.getTime() <= data.ganttProperties.endDate.getTime()) {
                                ganttSegments[i - 1].duration = this.getDuration(ganttSegments[i - 1].startDate, data.ganttProperties.endDate, data.ganttProperties.durationUnit, data.ganttProperties.isAutoSchedule, data.ganttProperties.isMilestone);
                                continue;
                            }
                        }
                    }
                    segment = {};
                    if (!(startDate && endDate) || !(startDate && duration)) {
                        break;
                    }
                    sumOfDuration += Number(duration);
                    segment.startDate = startDate;
                    segment.endDate = endDate;
                    segment.duration = Number(duration);
                    segment.width = 0;
                    segment.left = 0;
                    segment.segmentIndex = i;
                    ganttSegments.push(segment);
                    if (!isNullOrUndefined(ganttSegments[i - 1])) {
                        var unit = void 0;
                        if (!isNullOrUndefined(this.parent.timelineSettings.bottomTier)) {
                            if (this.parent.timelineSettings.bottomTier.unit === 'Minutes') {
                                unit = 'minute';
                            }
                            else if (this.parent.timelineSettings.bottomTier.unit === 'Hour') {
                                unit = 'hour';
                            }
                            else {
                                unit = data.ganttProperties.durationUnit;
                            }
                        }
                        else {
                            unit = data.ganttProperties.durationUnit;
                        }
                        var offsetDuration = this.getDuration(ganttSegments[i - 1].endDate, ganttSegments[i].startDate, unit, data.ganttProperties.isAutoSchedule, data.ganttProperties.isMilestone);
                        segment.offsetDuration = offsetDuration;
                        if (offsetDuration < 1) {
                            if (this.parent.weekWorkingTime.length === 0) {
                                segment.startDate = this.getEndDate(ganttSegments[i - 1].endDate, 1, data.ganttProperties.durationUnit, data.ganttProperties, false);
                            }
                            else {
                                var prevSegmentDate = new Date(ganttSegments[i - 1].endDate.getTime());
                                segment.startDate = new Date(prevSegmentDate.setHours(prevSegmentDate.getHours() + 24));
                                if (this.isOnHolidayOrWeekEnd(segment.startDate, true)) {
                                    do {
                                        segment.startDate.setDate(segment.startDate.getDate() + 1);
                                    } while (this.isOnHolidayOrWeekEnd(segment.startDate, true));
                                }
                                if (!this.parent.includeWeekend) {
                                    segment.startDate = this.getNextWorkingDay(segment.startDate);
                                }
                                var dayEndTime = this.parent['getEndTime'](ganttSegments[i - 1].endDate);
                                if (this.getSecondsInDecimal(ganttSegments[i - 1].endDate) === dayEndTime) {
                                    this.setTime(this.parent['getEndTime'](segment.startDate), segment.startDate);
                                }
                            }
                            segment.startDate = this.checkStartDate(segment.startDate, data.ganttProperties, false);
                            segment.endDate = this.getEndDate(segment.startDate, segment.duration, data.ganttProperties.durationUnit, data.ganttProperties, false);
                            segment.endDate = !taskSettings.duration && taskSettings.endDate
                                && segment.endDate > data.ganttProperties.endDate ? data.ganttProperties.endDate : segment.endDate;
                            segment.offsetDuration = 1;
                        }
                    }
                    else {
                        segment.offsetDuration = 0;
                    }
                    taskData.push(this.setSegmentTaskData(segment, segments[i]));
                }
                this.parent.setRecordValue('duration', sumOfDuration, data.ganttProperties, true);
                if (!isNullOrUndefined(ganttSegments[ganttSegments.length - 1])) {
                    this.parent.setRecordValue('endDate', ganttSegments[ganttSegments.length - 1].endDate, data.ganttProperties, true);
                }
                if (!isNullOrUndefined(taskSettings.endDate) && !isNullOrUndefined(ganttSegments[ganttSegments.length - 1])) {
                    this.parent.setRecordValue(this.parent.taskFields.endDate, ganttSegments[ganttSegments.length - 1].endDate, data, true);
                }
                if (!onLoad && taskData && taskData.length > 0) {
                    taskData.forEach(function (task, index) {
                        var mergedObject = Object.assign({}, task, _this.customSegmentProperties[index]);
                        taskData[index] = mergedObject;
                    });
                }
                this.parent.setRecordValue('taskData.' + this.parent.taskFields.segments, taskData, data);
            }
        }
        if (ganttSegments.length > 1) {
            this.parent.setRecordValue('segments', ganttSegments, data.ganttProperties, true);
            this.parent.setRecordValue(this.parent.taskFields.segments, data.taskData[this.parent.taskFields.segments], data, true);
        }
        else {
            ganttSegments = null;
        }
        return ganttSegments;
    };
    TaskProcessor.prototype.setSegmentTaskData = function (segments, segmenttaskData) {
        var taskSettings = this.parent.taskFields;
        var taskData = extend({}, {}, segmenttaskData, true);
        if (!isNullOrUndefined(taskSettings.startDate)) {
            taskData[this.parent.taskFields.startDate] = segments.startDate;
        }
        if (!isNullOrUndefined(taskSettings.endDate)) {
            taskData[this.parent.taskFields.endDate] = segments.endDate;
        }
        if (!isNullOrUndefined(taskSettings.duration)) {
            taskData[this.parent.taskFields.duration] = Number(segments.duration);
        }
        return taskData;
    };
    TaskProcessor.prototype.fetchResources = function (ganttData) {
        if ((this.parent.editModule && this.parent.editModule.dialogModule &&
            (this.parent.editModule.dialogModule['isFromAddDialog'] || this.parent.editModule.dialogModule['isFromEditDialog']))) {
            return this.parent.editModule.dialogModule.ganttResources;
        }
        else {
            return ganttData.ganttProperties.resourceInfo;
        }
    };
    /**
     * Method to calculate work based on resource unit and duration.
     *
     * @param {IGanttData} ganttData .
     * @returns {void} .
     */
    TaskProcessor.prototype.updateWorkWithDuration = function (ganttData) {
        if (this.parent['triggeredColumnName'] === this.parent.taskFields.work && ganttData.ganttProperties.duration !== 0 &&
            (isNullOrUndefined(ganttData.ganttProperties.resourceInfo) || ganttData.ganttProperties.resourceInfo.length !== 0)) {
            return;
        }
        var resources = this.fetchResources(ganttData);
        var work = 0;
        var resourceOneDayWork;
        if ((!isNullOrUndefined(resources) && resources.length > 0) && !ganttData.hasChildRecords) {
            var resourcesLength = resources.length;
            var index = void 0;
            var resourceUnit = void 0;
            var totSeconds = void 0;
            if (this.parent.weekWorkingTime.length > 0) {
                totSeconds = this.parent['getSecondsPerDay'](ganttData.ganttProperties.startDate ? ganttData.ganttProperties.startDate : ganttData.ganttProperties.endDate);
            }
            else {
                totSeconds = this.parent.secondsPerDay;
            }
            var actualOneDayWork = (totSeconds) / 3600;
            var durationInDay = this.getDurationInDay(ganttData.ganttProperties.duration, ganttData.ganttProperties.durationUnit);
            for (index = 0; index < resourcesLength; index++) {
                // const resource: any = ganttData.ganttProperties.resourceInfo ? ganttData.ganttProperties.resourceInfo : resources;
                resourceUnit = resources[index][this.parent.resourceFields.unit]; //in percentage
                resourceOneDayWork = (resourceUnit > 0 ? (actualOneDayWork * resourceUnit) / 100 : 0);
                work += (resourceOneDayWork * durationInDay);
            }
            //Update work as per defined unit.
            if (ganttData.ganttProperties.workUnit === 'minute') {
                work = work * 60;
            }
            if (ganttData.ganttProperties.workUnit === 'day') {
                work = work / actualOneDayWork;
            }
            //To check the decimal places.
            if (work % 1 !== 0) {
                work = parseFloat(work.toFixed(2));
            }
        }
        else if (!ganttData.hasChildRecords && !isNullOrUndefined(ganttData.ganttProperties.work) &&
            (!isNullOrUndefined(ganttData.ganttProperties.duration) && ganttData.ganttProperties.duration > 0)) {
            work = ganttData.ganttProperties.work;
        }
        if (ganttData.childRecords) {
            if (ganttData.childRecords.length > 0 && this.parent.isOnEdit) {
                var childCompletedWorks = 0;
                for (var i = 0; i < ganttData.childRecords.length; i++) {
                    childCompletedWorks += ganttData.childRecords[i].ganttProperties.work;
                }
                work += childCompletedWorks;
            }
        }
        if (ganttData.ganttProperties.taskType === 'FixedUnit' && resourceOneDayWork === 0) {
            work = 0;
            this.parent.setRecordValue('duration', 0, ganttData.ganttProperties, true);
            if (!isNullOrUndefined(this.parent.taskFields.duration)) {
                this.parent.setRecordValue(this.parent.taskFields.duration, 0, ganttData, true);
            }
        }
        this.parent.setRecordValue('work', work, ganttData.ganttProperties, true);
        if (!isNullOrUndefined(this.parent.taskFields.work) && !this.parent.isLoad) {
            this.parent.dataOperation.updateMappingData(ganttData, 'work');
        }
    };
    /**
     *
     * @param {IGanttData} parent .
     * @returns {IParent} .
     * @private
     */
    TaskProcessor.prototype.getCloneParent = function (parent) {
        if (!isNullOrUndefined(parent)) {
            var cloneParent = {};
            cloneParent.uniqueID = parent.uniqueID;
            cloneParent.expanded = parent.expanded;
            cloneParent.level = parent.level;
            cloneParent.index = parent.index;
            cloneParent.taskId = parent.ganttProperties.rowUniqueID;
            return cloneParent;
        }
        else {
            return null;
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.reUpdateResources = function () {
        if (this.parent.flatData.length > 0) {
            var data = void 0;
            var ganttProperties = void 0;
            var ganttData = void 0;
            for (var index = 0; index < this.parent.flatData.length; index++) {
                data = this.parent.flatData[index].taskData;
                ganttProperties = this.parent.flatData[index].ganttProperties;
                ganttData = this.parent.flatData[index];
                this.parent.setRecordValue('resourceInfo', this.setResourceInfo(data), ganttProperties, true);
                this.updateResourceName(ganttData);
            }
        }
    };
    TaskProcessor.prototype.addTaskData = function (ganttData, data, isLoad) {
        var _this = this;
        var taskSettings = this.parent.taskFields;
        var dataManager = this.parent.dataSource;
        if (isLoad) {
            if (taskSettings.parentID || (dataManager instanceof DataManager &&
                dataManager.dataSource.json && dataManager.dataSource.offline)) {
                if (taskSettings.parentID) {
                    var id = data[taskSettings.id];
                    var index = this.taskIds.indexOf(id.toString());
                    var tempData_1 = (index > -1) ? this.dataArray[index] : {};
                    if (!isNullOrUndefined(this.parent.taskFields.segmentId)) {
                        var segmentDataCollection = this.segmentCollection.
                            filter(function (x) { return x.key === tempData_1[_this.parent.taskFields.id]; });
                        if (segmentDataCollection.length > 0) {
                            tempData_1[this.parent.taskFields.segments] = segmentDataCollection[0].items;
                        }
                    }
                    this.parent.setRecordValue('taskData', tempData_1, ganttData);
                }
                else {
                    this.parent.setRecordValue('taskData', data, ganttData);
                }
            }
            else {
                this.parent.setRecordValue('taskData', data, ganttData);
            }
        }
        else {
            this.parent.setRecordValue('taskData', data, ganttData);
        }
    };
    TaskProcessor.prototype.updateExpandStateMappingValue = function (ganttData, data) {
        var expandStateMapping = this.parent.taskFields.expandState;
        var mappingValue = data[expandStateMapping];
        var updatableValue;
        if (expandStateMapping && ganttData.hasChildRecords) {
            if (!isNullOrUndefined(mappingValue)) {
                updatableValue = mappingValue.toString() === 'true' ? true : false;
            }
            else if (isNullOrUndefined(mappingValue) && !this.parent.collapseAllParentTasks) {
                updatableValue = true;
            }
            else if (isNullOrUndefined(mappingValue) && this.parent.collapseAllParentTasks) {
                updatableValue = false;
            }
            this.parent.setRecordValue('taskData.' + expandStateMapping, updatableValue, ganttData);
            this.parent.setRecordValue(expandStateMapping, updatableValue, ganttData);
            this.parent.setRecordValue('expanded', updatableValue, ganttData);
        }
    };
    /**
     * @param {IGanttData} ganttData .
     * @param {object} data .
     * @returns {void} .
     */
    TaskProcessor.prototype.setValidatedDates = function (ganttData, data) {
        var ganttProperties = ganttData.ganttProperties;
        var taskSettings = this.parent.taskFields;
        var duration = data[taskSettings.duration];
        var startDate = this.getDateFromFormat(data[taskSettings.startDate], true);
        var endDate = this.getDateFromFormat(data[taskSettings.endDate], true);
        duration = isNullOrUndefined(duration) || duration === '' ? null : duration;
        this.parent.setRecordValue('startDate', new Date(startDate.getTime()), ganttProperties, true);
        if (!isNullOrUndefined(duration) && duration !== '') {
            this.updateDurationValue(duration, ganttProperties);
        }
        else {
            this.calculateDuration(ganttData);
        }
        this.parent.setRecordValue('endDate', new Date((endDate.getTime())), ganttProperties, true);
    };
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {object} data .
     * @param {boolean} isLoad .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.calculateScheduledValues = function (ganttData, data, isLoad) {
        var taskSettings = this.parent.taskFields;
        var ganttProperties = ganttData.ganttProperties;
        var duration = data[taskSettings.duration];
        duration = isNullOrUndefined(duration) || duration === '' ? null : duration;
        var startDate;
        var endDate;
        if (ganttProperties.startDate && ganttProperties.endDate) {
            startDate = this.getDateFromFormat(ganttProperties.startDate, true);
            endDate = this.getDateFromFormat(ganttProperties.endDate, true);
        }
        else {
            startDate = this.getDateFromFormat(data[taskSettings.startDate], true);
            endDate = this.getDateFromFormat(data[taskSettings.endDate], true);
        }
        var segments = taskSettings.segments ? (data[taskSettings.segments] ||
            ganttData.taskData[taskSettings.segments]) : null;
        var isMileStone = taskSettings.milestone ? data[taskSettings.milestone] ? true : false : false;
        var durationMapping = data[taskSettings.durationUnit] ? data[taskSettings.durationUnit] : '';
        this.parent.setRecordValue('durationUnit', this.validateDurationUnitMapping(durationMapping), ganttProperties, true);
        var work = !isNullOrUndefined(data[taskSettings.work]) ? parseFloat(data[taskSettings.work]) : 0;
        this.parent.setRecordValue('workUnit', this.validateWorkUnitMapping(this.parent.workUnit), ganttProperties, true);
        var taskTypeMapping = data[taskSettings.type] ? data[taskSettings.type] : '';
        var tType = this.validateTaskTypeMapping(taskTypeMapping);
        this.parent.setRecordValue('taskType', tType, ganttProperties, true);
        var isUnassignedTask = data[this.parent.resourceFields.name] === this.parent.localeObj.getConstant('unassignedTask');
        if (isUnassignedTask) {
            this.parent.setRecordValue('taskType', 'FixedDuration', ganttProperties, true);
        }
        if (isLoad && !this.parent.enableValidation && startDate && endDate) {
            this.setValidatedDates(ganttData, data);
        }
        else {
            if (!endDate && !startDate && (isNullOrUndefined(duration) || duration === '')) {
                if (this.parent.allowUnscheduledTasks) {
                    return;
                }
                else {
                    this.parent.setRecordValue('duration', 1, ganttProperties, true);
                    this.parent.setRecordValue('startDate', this.getProjectStartDate(ganttProperties, isLoad), ganttProperties, true);
                    this.calculateEndDate(ganttData);
                }
            }
            else if (startDate) {
                this.calculateDateFromStartDate(startDate, endDate, duration, ganttData, isLoad);
            }
            else if (endDate) {
                this.calculateDateFromEndDate(endDate, duration, ganttData);
            }
            else if (!isNullOrUndefined(duration) && duration !== '') {
                this.updateDurationValue(duration, ganttProperties);
                var startDate_1 = this.parent.allowUnscheduledTasks ? null : this.getProjectStartDate(ganttProperties, isLoad);
                this.parent.setRecordValue('startDate', startDate_1, ganttProperties, true);
                if (this.parent.allowUnscheduledTasks) {
                    this.parent.setRecordValue('endDate', null, ganttProperties, true);
                }
                else {
                    this.calculateEndDate(ganttData);
                }
            }
        }
        if (!this.parent.autoCalculateDateScheduling || (this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand &&
            this.parent.taskFields.hasChildMapping)) {
            if (!isNullOrUndefined(ganttData.ganttProperties.startDate) &&
                !isNullOrUndefined(this.parent.taskFields.startDate)) {
                ganttData[this.parent.taskFields.startDate] = ganttData.ganttProperties.startDate;
                ganttData.taskData[this.parent.taskFields.startDate] = ganttData.ganttProperties.startDate;
            }
            if (!isNullOrUndefined(ganttData.ganttProperties.endDate) &&
                !isNullOrUndefined(this.parent.taskFields.endDate)) {
                ganttData[this.parent.taskFields.endDate] = ganttData.ganttProperties.endDate;
                ganttData.taskData[this.parent.taskFields.endDate] = ganttData.ganttProperties.endDate;
            }
        }
        if (!isNullOrUndefined(taskSettings.work)) {
            var durationUnit = this.parent.taskFields.durationUnit && data[taskSettings.durationUnit] ?
                data[taskSettings.durationUnit] : this.parent.durationUnit;
            this.parent.setRecordValue('durationUnit', durationUnit, ganttProperties, true);
            if (isNaN(work) || isNullOrUndefined(work)) {
                this.parent.setRecordValue('work', 0, ganttProperties, true);
                this.parent.setRecordValue('duration', 0, ganttProperties, true);
                this.parent.setRecordValue('isMilestone', true, ganttProperties, true);
                if (!isNullOrUndefined(this.parent.taskFields) && !isNullOrUndefined(this.parent.taskFields.milestone)) {
                    this.parent.setRecordValue(this.parent.taskFields.milestone, true, ganttData, true);
                }
                this.parent.setRecordValue('endDate', ganttProperties.startDate, ganttProperties, true);
            }
            else {
                this.parent.setRecordValue('work', work, ganttProperties, true);
                switch (tType) {
                    case 'FixedDuration':
                        // To validate the work column as well,when initial dataset have 0 duration
                        if ((!isNullOrUndefined(ganttData[this.parent.taskFields.resourceInfo]) &&
                            !isNullOrUndefined(ganttData.ganttProperties.resourceInfo) &&
                            ganttData.ganttProperties.resourceInfo.length !== 0) ||
                            ganttProperties.duration === 0) {
                            this.updateWorkWithDuration(ganttData);
                        }
                        break;
                    case 'FixedWork':
                        if ((!isNullOrUndefined(ganttData[this.parent.taskFields.resourceInfo]) &&
                            !isNullOrUndefined(ganttData.ganttProperties.resourceInfo) &&
                            ganttData.ganttProperties.resourceInfo.length !== 0) ||
                            ganttProperties.work === 0) {
                            this.updateDurationWithWork(ganttData);
                        }
                        break;
                    case 'FixedUnit':
                        if (!ganttData.hasChildRecords) {
                            this.updateDurationWithWork(ganttData);
                        }
                        break;
                }
                if (!isNullOrUndefined(taskSettings.type)) {
                    this.parent.dataOperation.updateMappingData(ganttData, 'type');
                }
                if (ganttProperties.duration === 0) {
                    this.parent.setRecordValue('isMilestone', true, ganttProperties, true);
                    if (!isNullOrUndefined(this.parent.taskFields) && !isNullOrUndefined(this.parent.taskFields.milestone)) {
                        this.parent.setRecordValue(this.parent.taskFields.milestone, true, ganttData, true);
                    }
                    this.parent.setRecordValue('endDate', ganttProperties.startDate, ganttProperties, true);
                }
                else if (!isNullOrUndefined(ganttProperties.startDate) && !isNullOrUndefined(ganttProperties.duration)) {
                    this.parent.setRecordValue('isMilestone', false, ganttProperties, true);
                    if (!isNullOrUndefined(this.parent.taskFields) && !isNullOrUndefined(this.parent.taskFields.milestone)) {
                        this.parent.setRecordValue(this.parent.taskFields.milestone, false, ganttData, true);
                    }
                    this.calculateEndDate(ganttData);
                }
            }
            this.parent.dataOperation.updateMappingData(ganttData, 'work');
        }
        else if (taskSettings.type && ganttProperties.taskType) {
            this.parent.dataOperation.updateMappingData(ganttData, 'type');
        }
        if (!isNullOrUndefined(segments)) {
            this.parent.setRecordValue('segments', this.setSegmentsInfo(ganttData, true), ganttProperties, true);
        }
        if (ganttProperties.duration === 0) {
            this.parent.setRecordValue('isMilestone', true, ganttProperties, true);
            if (!isNullOrUndefined(this.parent.taskFields) && !isNullOrUndefined(this.parent.taskFields.milestone)) {
                this.parent.setRecordValue(this.parent.taskFields.milestone, true, ganttData, true);
            }
            this.parent.setRecordValue('endDate', ganttProperties.startDate, ganttProperties, true);
        }
        if (!isNullOrUndefined(isMileStone) && isMileStone) {
            this.parent.setRecordValue('duration', 0, ganttProperties, true);
            this.parent.setRecordValue('isMilestone', true, ganttProperties, true);
            if (!isNullOrUndefined(this.parent.taskFields) && !isNullOrUndefined(this.parent.taskFields.milestone)) {
                this.parent.setRecordValue(this.parent.taskFields.milestone, true, ganttData, true);
            }
            this.parent.setRecordValue('endDate', ganttProperties.startDate, ganttProperties, true);
        }
    };
    /**
     * Method to update duration with work value.
     *
     * @param {IGanttData} ganttData .
     * @returns {void} .
     */
    TaskProcessor.prototype.updateDurationWithWork = function (ganttData) {
        var ganttProperties = ganttData.ganttProperties;
        var resources = this.fetchResources(ganttData);
        if (!isNullOrUndefined(resources) && resources.length > 0) {
            var resourcesLength = !isNullOrUndefined(resources) ? resources.length : 0;
            var totalResourceOneDayWork = 0;
            var totSeconds = void 0;
            if (this.parent.weekWorkingTime.length > 0) {
                totSeconds = this.parent['getSecondsPerDay'](ganttData.ganttProperties.startDate ? ganttData.ganttProperties.startDate : ganttData.ganttProperties.endDate);
            }
            else {
                totSeconds = this.parent.secondsPerDay;
            }
            var actualOneDayWork = (totSeconds) / 3600;
            var updatedDuration = 0;
            var resourceUnit = void 0;
            var index = void 0;
            for (index = 0; index < resourcesLength; index++) {
                resourceUnit = resources[index][this.parent.resourceFields.unit]; //in percentage
                totalResourceOneDayWork += (resourceUnit > 0 ? (actualOneDayWork * resourceUnit) / 100 : (ganttData.ganttProperties.taskType !== 'FixedUnit' ? ((ganttProperties.taskType !== 'FixedWork' && ganttProperties.duration !== 0) ? actualOneDayWork : 0) : 0)); //in hours
            }
            var totalHours = this.getWorkInHour(ganttProperties.work, ganttProperties.workUnit);
            if (resourcesLength > 0 && totalResourceOneDayWork > 0) {
                updatedDuration += (totalHours / totalResourceOneDayWork);
            }
            if (ganttProperties.taskType === 'FixedUnit' && totalResourceOneDayWork === 0) {
                this.parent.setRecordValue('work', 0, ganttProperties, true);
                this.parent.setRecordValue(this.parent.taskFields.work, 0, ganttData, true);
            }
            //Update duration as per defined unit.
            if (ganttProperties.durationUnit === 'minute') {
                updatedDuration = updatedDuration * actualOneDayWork * 60;
            }
            if (ganttProperties.durationUnit === 'hour') {
                updatedDuration = updatedDuration * actualOneDayWork;
            }
            //To check the decimal places.
            if (updatedDuration % 1 !== 0) {
                updatedDuration = parseFloat(updatedDuration.toFixed(2));
            }
            if (!isNullOrUndefined(ganttProperties.duration)) {
                this.parent.setRecordValue('duration', updatedDuration, ganttProperties, true);
            }
            this.parent.dataOperation.updateMappingData(ganttData, 'duration');
        }
    };
    /**
     * Update units of resources with respect to duration and work of a task.
     *
     * @param {IGanttData} ganttData .
     * @returns {void} .
     */
    TaskProcessor.prototype.updateUnitWithWork = function (ganttData) {
        var ganttProperties = ganttData.ganttProperties;
        var resources = this.fetchResources(ganttData);
        var resourcesLength = !isNullOrUndefined(resources) ? resources.length : 0;
        var totSeconds;
        if (this.parent.weekWorkingTime.length > 0) {
            totSeconds = this.parent['getSecondsPerDay'](ganttData.ganttProperties.startDate ? ganttData.ganttProperties.startDate : ganttData.ganttProperties.endDate);
        }
        else {
            totSeconds = this.parent.secondsPerDay;
        }
        var actualOneDayWork = (totSeconds) / 3600;
        if (resourcesLength === 0) {
            return;
        }
        var durationInDay = this.getDurationInDay(ganttData.ganttProperties.duration, ganttData.ganttProperties.durationUnit);
        var totalHours = this.getWorkInHour(ganttProperties.work, ganttProperties.workUnit);
        var totalUnitInPercentage = durationInDay > 0 ? (totalHours / (durationInDay * actualOneDayWork)) * 100 : 0;
        var individualUnit = totalUnitInPercentage === 0 ? 0 : totalUnitInPercentage > 0 ?
            totalUnitInPercentage / resourcesLength : 100;
        //To check the decimal places.
        if (individualUnit % 1 !== 0) {
            individualUnit = parseFloat(individualUnit.toFixed(2));
        }
        for (var index = 0; index < resourcesLength; index++) {
            resources[index][this.parent.resourceFields.unit] = individualUnit;
            if (!this.parent.isLoad && !isNullOrUndefined(this.parent.editModule) &&
                !isNullOrUndefined(this.parent.editModule.dialogModule) &&
                !this.parent.editModule.dialogModule['isEdit'] &&
                (!isNullOrUndefined(this.parent.editModule.cellEditModule) && !this.parent.editModule.cellEditModule.isCellEdit)) {
                if (ganttProperties.resourceInfo) {
                    ganttProperties.resourceInfo[index][this.parent.resourceFields.unit] = individualUnit;
                }
            }
            if (this.parent.editModule && this.parent.editModule.dialogModule &&
                !isNullOrUndefined(this.parent.editModule.dialogModule.ganttResources[index])) {
                this.parent.editModule.dialogModule.ganttResources[index][this.parent.resourceFields.unit] = individualUnit;
            }
        }
        //To update the unit value in data source
        this.updateResourceName(ganttData);
    };
    TaskProcessor.prototype.calculateDateFromEndDate = function (endDate, duration, ganttData) {
        var ganttProperties = ganttData.ganttProperties;
        var dayEndTime;
        if (this.parent.weekWorkingTime.length > 0) {
            dayEndTime = this.parent['getEndTime'](endDate);
        }
        else {
            dayEndTime = this.parent.defaultEndTime;
        }
        if (endDate.getHours() === 0 && dayEndTime !== 86400) {
            this.setTime(dayEndTime, endDate);
        }
        var validateAsMilestone = (parseInt(duration, 10) === 0) ? true : null;
        this.parent.setRecordValue('endDate', this.checkEndDate(endDate, ganttData.ganttProperties, validateAsMilestone), ganttProperties, true);
        if (isNullOrUndefined(duration) || duration === '') {
            if (this.parent.allowUnscheduledTasks) {
                this.parent.setRecordValue('startDate', null, ganttProperties, true);
                this.parent.setRecordValue('duration', null, ganttProperties, true);
            }
            else {
                this.parent.setRecordValue('duration', 1, ganttProperties, true);
                this.parent.setRecordValue('startDate', this.getStartDate(ganttProperties.endDate, ganttProperties.duration, ganttProperties.durationUnit, ganttProperties), ganttProperties, true);
            }
        }
        else if (!isNullOrUndefined(duration) && duration !== '') {
            this.updateDurationValue(duration, ganttProperties);
            this.parent.setRecordValue('startDate', this.getStartDate(ganttProperties.endDate, ganttProperties.duration, ganttProperties.durationUnit, ganttProperties), ganttProperties, true);
        }
    };
    TaskProcessor.prototype.calculateDateFromStartDate = function (startDate, endDate, duration, ganttData, isLoad) {
        var ganttProperties = ganttData.ganttProperties;
        var validateAsMilestone = (parseInt(duration, 10) === 0 || ((startDate && endDate) &&
            (new Date(startDate.getTime()) === new Date(endDate.getTime())))) ? true : null;
        this.parent.setRecordValue('startDate', this.checkStartDate(startDate, ganttProperties, validateAsMilestone, isLoad), ganttProperties, true);
        if (this.parent.isTreeGridRendered && ganttData) {
            this.updateTaskData(ganttData);
        }
        if (!endDate && (isNullOrUndefined(duration) || duration === '')) {
            if (this.parent.allowUnscheduledTasks) {
                this.parent.setRecordValue('endDate', null, ganttProperties, true);
                this.parent.setRecordValue('duration', null, ganttProperties, true);
            }
            else {
                this.parent.setRecordValue('duration', 1, ganttProperties, true);
                this.calculateEndDate(ganttData);
            }
        }
        else if (!isNullOrUndefined(duration) && !endDate) {
            this.updateDurationValue(duration, ganttProperties);
            this.calculateEndDate(ganttData);
        }
        else if (endDate && (isNullOrUndefined(duration) || duration === '')) {
            var dayEndTime = void 0;
            if (this.parent.weekWorkingTime.length > 0) {
                dayEndTime = this.parent['getEndTime'](endDate);
            }
            else {
                dayEndTime = this.parent.defaultEndTime;
            }
            if (endDate.getHours() === 0 && dayEndTime !== 86400) {
                this.setTime(dayEndTime, endDate);
            }
            this.parent.setRecordValue('endDate', this.checkEndDate(endDate, ganttData.ganttProperties), ganttProperties, true);
            if (this.compareDates(ganttProperties.startDate, ganttProperties.endDate) === 1) {
                this.parent.setRecordValue('endDate', ganttProperties.startDate, ganttProperties, true);
                this.parent.setRecordValue('isMilestone', true, ganttProperties, true);
                this.parent.setRecordValue('duration', 0, ganttProperties, true);
            }
            else {
                this.calculateDuration(ganttData);
            }
        }
        else {
            this.updateDurationValue(duration, ganttProperties);
            if (this.parent.autoCalculateDateScheduling && !(this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand &&
                this.parent.taskFields.hasChildMapping)) {
                this.calculateEndDate(ganttData);
            }
            else {
                this.parent.setRecordValue('endDate', endDate, ganttProperties, true);
            }
        }
    };
    /**
     *
     * @param {number} parentWidth .
     * @param {number} percent .
     * @returns {number} .
     * @private
     */
    TaskProcessor.prototype.getProgressWidth = function (parentWidth, percent) {
        return (parentWidth * percent) / 100;
    };
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {boolean} isAuto .
     * @returns {number} .
     * @private
     */
    TaskProcessor.prototype.calculateWidth = function (ganttData, isAuto) {
        var ganttProp = ganttData.ganttProperties;
        var sDate = isAuto ? ganttProp.autoStartDate : ganttProp.startDate;
        var eDate = isAuto ? ganttProp.autoEndDate : ganttProp.endDate;
        var unscheduledTaskWidth = 3;
        if (isNullOrUndefined(sDate) && isNullOrUndefined(eDate)) {
            sDate = this.getValidStartDate(ganttProp, isAuto);
            eDate = this.getValidEndDate(ganttProp, isAuto);
        }
        if (isNullOrUndefined(sDate) || isNullOrUndefined(eDate)) {
            return unscheduledTaskWidth;
        }
        else if (ganttProp.isMilestone && (!ganttData.hasChildRecords || ganttProp.isAutoSchedule)) {
            //let taskBarHeight: number = this.getTaskbarHeight();
            return 0;
        }
        else {
            return this.getTaskWidth(sDate, eDate, ganttProp);
        }
    };
    TaskProcessor.prototype.getTaskbarHeight = function () {
        var rowHeight = this.parent.rowHeight;
        var taskBarHeight = this.parent.taskbarHeight;
        if (taskBarHeight < rowHeight) {
            return taskBarHeight;
        }
        else {
            return rowHeight;
        }
    };
    /**
     * Method to calculate left
     *
     * @param {ITaskData} ganttProp .
     * @param {IGanttData} ganttRecord .
     * @param {boolean} isAuto .
     * @returns {number} .
     * @private
     */
    TaskProcessor.prototype.calculateLeft = function (ganttProp, ganttRecord, isAuto) {
        var sDate = null;
        var left = -300;
        var startDate = isAuto ? ganttProp.autoStartDate : ganttProp.startDate;
        var endDate = isAuto ? ganttProp.autoEndDate : ganttProp.endDate;
        var duration = isAuto ? ganttProp.autoDuration : ganttProp.duration; // eslint-disable-line
        var milestone = ganttProp.isMilestone;
        if (ganttRecord && this.parent.allowUnscheduledTasks && isNullOrUndefined(startDate) && isNullOrUndefined(endDate)
            && !isNullOrUndefined(duration) && !ganttRecord.hasChildRecords && ganttRecord.parentItem &&
            (this.parent.taskMode === 'Manual' || (this.parent.taskMode === 'Custom' && ganttRecord[this.parent.taskFields.manual]))) {
            var parentRec = this.parent.getParentTask(ganttRecord.parentItem);
            if (parentRec.ganttProperties.startDate) {
                startDate = parentRec.ganttProperties.startDate;
            }
        }
        if (startDate) {
            sDate = new Date(startDate.getTime());
        }
        else if (endDate) {
            sDate = new Date(endDate.getTime());
            milestone = isNullOrUndefined(startDate) && this.parent.allowUnscheduledTasks ? false : true;
        }
        else {
            sDate = this.getValidStartDate(ganttProp);
        }
        if (!isNullOrUndefined(sDate)) {
            left = this.getTaskLeft(sDate, milestone);
        }
        return left;
    };
    /**
     * calculate the left position of the auto scheduled taskbar
     *
     * @param {ITaskData} ganttProperties - Defines the gantt data.
     * @returns {number} .
     * @private
     */
    TaskProcessor.prototype.calculateAutoLeft = function (ganttProperties) {
        return this.getTaskLeft(ganttProperties.autoStartDate, ganttProperties.isMilestone);
    };
    /**
     * To calculate duration of Gantt record with auto scheduled start date and auto scheduled end date
     *
     * @param {ITaskData} ganttProperties - Defines the gantt data.
     * @returns {number} .
     */
    TaskProcessor.prototype.calculateAutoDuration = function (ganttProperties) {
        return this.getDuration(ganttProperties.autoStartDate, ganttProperties.autoEndDate, ganttProperties.durationUnit, false, ganttProperties.isMilestone);
    };
    /**
     * calculate the with between auto scheduled start date and auto scheduled end date
     *
     * @param {ITaskData} ganttProperties - Defines the gantt data.
     * @returns {number} .
     * @private
     */
    TaskProcessor.prototype.calculateAutoWidth = function (ganttProperties) {
        return this.getTaskWidth(ganttProperties.autoStartDate, ganttProperties.autoEndDate);
    };
    /**
     * calculate the left margin of the baseline element
     *
     * @param {ITaskData} ganttProperties .
     * @returns {number} .
     * @private
     */
    TaskProcessor.prototype.calculateBaselineLeft = function (ganttProperties) {
        var baselineStartDate = this.getDateFromFormat(ganttProperties.baselineStartDate);
        var baselineEndDate = this.getDateFromFormat(ganttProperties.baselineEndDate);
        if (baselineStartDate && baselineEndDate) {
            return (this.getTaskLeft(baselineStartDate, ganttProperties.isMilestone));
        }
        else {
            return 0;
        }
    };
    /**
     * calculate the width between baseline start date and baseline end date.
     *
     * @param {ITaskData} ganttProperties .
     * @returns {number} .
     * @private
     */
    TaskProcessor.prototype.calculateBaselineWidth = function (ganttProperties) {
        var baselineStartDate = this.getDateFromFormat(ganttProperties.baselineStartDate);
        var baselineEndDate = this.getDateFromFormat(ganttProperties.baselineEndDate);
        if (baselineStartDate && baselineEndDate && (baselineStartDate.getTime() !== baselineEndDate.getTime())) {
            this.isBaseline = true;
            return (this.getTaskWidth(baselineStartDate, baselineEndDate));
        }
        else {
            return 0;
        }
    };
    /**
     * To get tasks width value
     *
     * @param {Date} startDate .
     * @param {Date} endDate .
     * @param {ITaskData} [ganttData] .
     * @returns {number} .
     * @private
     */
    TaskProcessor.prototype.getTaskWidth = function (startDate, endDate, ganttData) {
        var sDate = new Date(startDate.getTime());
        var eDate = new Date(endDate.getTime());
        var tierMode = this.parent.timelineModule.customTimelineSettings.bottomTier.unit !== 'None' ? this.parent.timelineModule.customTimelineSettings.bottomTier.unit :
            this.parent.timelineModule.customTimelineSettings.topTier.unit;
        var zoomOrTimeline = this.parent.timelineModule.customTimelineSettings;
        var countValue = zoomOrTimeline['bottomTier'] !== null ? zoomOrTimeline['bottomTier'].count :
            zoomOrTimeline['topTier'].count;
        var isValid = false;
        var modifiedsDate = new Date(startDate.getTime());
        var hour = 0;
        if (!isNullOrUndefined(ganttData) && ganttData.durationUnit === 'hour') {
            modifiedsDate = new Date(modifiedsDate.getTime() + ganttData.duration * 60 * 60 * 1000);
        }
        if (!isNullOrUndefined(ganttData) && (ganttData.durationUnit === 'minute') || !isNullOrUndefined(ganttData) && ganttData.durationUnit === 'day' && ganttData.duration < 1) {
            modifiedsDate = new Date(modifiedsDate.getTime() + ganttData.duration * 60 * 1000);
        }
        if (this.isBaseline && tierMode === 'Day') {
            var duration = this.getDuration(sDate, eDate, 'day', true, false);
            this.isBaseline = false;
            if (duration > 0 && duration < 1) {
                return (duration * this.parent.perDayWidth);
            }
        }
        if (this.parent.weekWorkingTime.length > 0) {
            var date = new Date(startDate.getTime());
            for (var count = startDate.getDate(); count <= endDate.getDate(); count++) {
                var day = date.getDay();
                var currentDay = void 0;
                var weekWorkingTime = this.parent.weekWorkingTime;
                switch (day) {
                    case 0:
                        currentDay = 'Sunday';
                        break;
                    case 1:
                        currentDay = 'Monday';
                        break;
                    case 2:
                        currentDay = 'Tuesday';
                        break;
                    case 3:
                        currentDay = 'Wednesday';
                        break;
                    case 4:
                        currentDay = 'Thursday';
                        break;
                    case 5:
                        currentDay = 'Friday';
                        break;
                    case 6:
                        currentDay = 'Saturday';
                        break;
                    default:
                        currentDay = '';
                }
                var isValid_1 = true;
                for (var i = 0; i < weekWorkingTime.length; i++) {
                    if (weekWorkingTime[i][currentDay]
                        && weekWorkingTime[i][currentDay].length > 0) {
                        isValid_1 = false;
                        for (var j = 0; j < weekWorkingTime[i][currentDay].length; j++) {
                            hour = hour + weekWorkingTime[i][currentDay][j].to
                                - weekWorkingTime[i][currentDay][j].from;
                        }
                    }
                }
                if (isValid_1) {
                    for (var k = 0; k < this.parent.dayWorkingTime.length; k++) {
                        hour = hour + this.parent.dayWorkingTime[k].to - this.parent.dayWorkingTime[k].from;
                    }
                }
                date = new Date(date.setDate(date.getDate() + 1));
                if (!this.parent.includeWeekend) {
                    date = this.parent.dataOperation.getNextWorkingDay(date);
                }
            }
        }
        else {
            for (var i = 0; i < this.parent.dayWorkingTime.length; i++) {
                hour = hour + this.parent.dayWorkingTime[i].to - this.parent.dayWorkingTime[i].from;
            }
        }
        var dateDiff = modifiedsDate.getTime() - sDate.getTime();
        var dayStartTime;
        var dayEndTime;
        if (!isNullOrUndefined(ganttData) && (ganttData.durationUnit === 'minute' && ganttData.duration < (hour * 60)) || !isNullOrUndefined(ganttData) && ganttData.durationUnit === 'day' &&
            !isNullOrUndefined(ganttData.duration) && /^\d+\.\d+$/.test(ganttData.duration.toString())) {
            if (tierMode === 'Day') {
                if (this.parent.weekWorkingTime.length > 0) {
                    dayStartTime = this.parent['getStartTime'](sDate);
                    dayEndTime = this.parent['getEndTime'](eDate);
                }
                else {
                    dayStartTime = this.parent.defaultStartTime;
                    dayEndTime = this.parent.defaultEndTime;
                }
                if ((Math.floor((dateDiff / (1000 * 60 * 60)) % 24) >= hour || dateDiff === 0)) {
                    isValid = true;
                }
                if (this.getSecondsInDecimal(sDate) === dayStartTime && isValid) {
                    sDate.setHours(0, 0, 0, 0);
                }
                if (this.getSecondsInDecimal(eDate) === dayEndTime && isValid) {
                    eDate.setHours(24);
                }
                if (this.getSecondsInDecimal(eDate) === dayStartTime) {
                    eDate.setHours(0, 0, 0, 0);
                }
            }
            else {
                isValid = true;
            }
            if ((sDate).getTime() === (eDate).getTime()) {
                return (this.parent.perDayWidth);
            }
            else {
                if (isValid) {
                    if (this.parent.taskFields.duration && ganttData.durationUnit === 'day' && /^\d+\.\d+$/.test(ganttData.duration.toString()) && this.parent.timelineModule.bottomTier === 'Day'
                        && isNullOrUndefined(ganttData.segments)) {
                        var holidaysCount = this.parent.holidays && this.parent.holidays.length > 0
                            ? this.getHolidaysCount(sDate, eDate)
                            : 0;
                        var weekendCount = !this.parent.includeWeekend ? this.getWeekendCount(sDate, eDate) : 0;
                        return ((holidaysCount + weekendCount + ganttData.duration) * this.parent.perDayWidth);
                    }
                    else {
                        return ((this.getTimeDifference(sDate, eDate, true) / (1000 * 60 * 60 * 24)) * this.parent.perDayWidth);
                    }
                }
                else {
                    if (ganttData.durationUnit === 'day' && ganttData.duration < 1) {
                        return (ganttData.duration * this.parent.perDayWidth);
                    }
                    else {
                        return ((this.getTimeDifference(sDate, eDate) / (1000 * 60 * 60 * hour)) * this.parent.perDayWidth);
                    }
                }
            }
        }
        else {
            if (tierMode === 'Day') {
                if (this.parent.weekWorkingTime.length > 0) {
                    dayStartTime = this.parent['getStartTime'](sDate);
                    dayEndTime = this.parent['getEndTime'](eDate);
                }
                else {
                    dayStartTime = this.parent.defaultStartTime;
                    dayEndTime = this.parent.defaultEndTime;
                }
                if (this.getSecondsInDecimal(sDate) === dayStartTime) {
                    sDate.setHours(0, 0, 0, 0);
                }
                if (this.getSecondsInDecimal(eDate) === dayEndTime) {
                    eDate.setHours(24);
                    eDate.setHours(0, 0, 0, 0);
                }
                if (this.getSecondsInDecimal(eDate) === dayStartTime) {
                    eDate.setHours(0, 0, 0, 0);
                }
            }
            if ((sDate).getTime() === (eDate).getTime()) {
                return (this.parent.perDayWidth);
            }
            else {
                if (this.parent.isInDst(sDate) || this.parent.isInDst(eDate)) {
                    var timeDifference = this.getTimeDifference(sDate, eDate, true);
                    var totalWidth = (timeDifference / (1000 * 60 * 60 * 24)) * this.parent.perDayWidth;
                    var sOffset = sDate.getTimezoneOffset();
                    var eOffset = eDate.getTimezoneOffset();
                    var topTier = this.parent.timelineModule.customTimelineSettings.topTier;
                    if (topTier && topTier['unit'] === 'Hour' && topTier['count'] === 1) {
                        tierMode = topTier['unit'];
                        countValue = topTier['count'];
                    }
                    var unitHour = ((tierMode === 'Hour' && countValue === 1) || (tierMode === 'Minutes' && countValue === 60));
                    if (unitHour && sOffset !== eOffset && sOffset > eOffset) {
                        totalWidth = totalWidth - (this.parent.perDayWidth / 24);
                    }
                    return totalWidth;
                }
                else {
                    return ((this.getTimeDifference(sDate, eDate) / (1000 * 60 * 60 * 24)) * this.parent.perDayWidth);
                }
            }
        }
    };
    TaskProcessor.prototype.getDSTTransitions = function (year, timeZone) {
        function findLastSunday(year, month) {
            var lastDayOfMonth = new Date(Date.UTC(year, month + 1, 0)); // Last day of the month
            var lastSunday = new Date(Date.UTC(year, month, lastDayOfMonth.getUTCDate() - lastDayOfMonth.getUTCDay()));
            return lastSunday;
        }
        function convertToTimezone(date, timeZone) {
            var formatter = new Intl.DateTimeFormat('en-US', {
                timeZone: timeZone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            });
            var formattedDate = formatter.format(date);
            var _a = formattedDate.match(/\d+/g).map(Number), month = _a[0], day = _a[1], year = _a[2], hour = _a[3], minute = _a[4], second = _a[5];
            return new Date(year, month - 1, day, hour, minute, second);
        }
        var dstStartDate = findLastSunday(year, 2);
        var dstEndDate = findLastSunday(year, 9);
        return {
            dstStart: convertToTimezone(dstStartDate, timeZone),
            dstEnd: convertToTimezone(dstEndDate, timeZone)
        };
    };
    TaskProcessor.prototype.hasDSTTransition = function (year) {
        var january = new Date(year, 0, 1);
        var july = new Date(year, 6, 1);
        var janOffset = january.getTimezoneOffset();
        var julOffset = july.getTimezoneOffset();
        // If the offsets are different, it means there is a DST transition
        return janOffset !== julOffset;
    };
    /**
     * Get task left value
     *
     * @param {Date} startDate .
     * @param {boolean} isMilestone .
     * @param {boolean} isFromTimelineVirtulization .
     * @returns {number} .
     * @private
     */
    TaskProcessor.prototype.getTaskLeft = function (startDate, isMilestone, isFromTimelineVirtulization) {
        var isTimeSet = false;
        var date = new Date(startDate.getTime());
        var tierMode = this.parent.timelineModule.customTimelineSettings.bottomTier.unit !== 'None' ? this.parent.timelineModule.customTimelineSettings.bottomTier.unit :
            this.parent.timelineModule.customTimelineSettings.topTier.unit;
        var zoomOrTimeline = this.parent.timelineModule.customTimelineSettings;
        var countValue = zoomOrTimeline['bottomTier'] !== null ? zoomOrTimeline['bottomTier'].count :
            zoomOrTimeline['topTier'].count;
        if (tierMode === 'Day') {
            var dayStartTime = void 0;
            var dayEndTime = void 0;
            if (this.parent.weekWorkingTime.length > 0) {
                dayStartTime = this.parent['getStartTime'](date);
                dayEndTime = this.parent['getEndTime'](date);
            }
            else {
                dayStartTime = this.parent.defaultStartTime;
                dayEndTime = this.parent.defaultEndTime;
            }
            if (this.getSecondsInDecimal(date) === dayStartTime) {
                date.setHours(0, 0, 0, 0);
            }
            else if (isMilestone && this.getSecondsInDecimal(date) === dayEndTime) {
                date.setHours(24);
                isTimeSet = true;
            }
            else if (this.getSecondsInDecimal(date) === dayEndTime && this.parent.allowUnscheduledTasks) {
                date.setHours(22);
                isTimeSet = true;
            }
        }
        var leftValueForStartDate;
        var isValid = true;
        if ((this.parent.editModule && ((this.parent.editModule.taskbarEditModule && this.parent.editModule.taskbarEditModule.taskBarEditAction) || (this.parent.editModule.dialogModule && this.parent.editModule.dialogModule['isEdit']) ||
            (this.parent.editModule.cellEditModule && this.parent.editModule.cellEditModule.isCellEdit) ||
            this.parent.ganttChartModule.scrollObject['isSetScrollLeft'])) && !isFromTimelineVirtulization) {
            isValid = false;
        }
        if (this.parent.enableTimelineVirtualization && isValid && !this.parent.timelineModule['performedTimeSpanAction']) {
            leftValueForStartDate = (this.parent.enableTimelineVirtualization
                && this.parent.ganttChartModule.scrollObject.element.scrollLeft !== 0)
                ? this.parent.ganttChartModule.scrollObject.getTimelineLeft() : null;
        }
        var timelineStartDate = (this.parent.enableTimelineVirtualization && !isNullOrUndefined(leftValueForStartDate))
            ? new Date((this.parent.timelineModule['dateByLeftValue'](leftValueForStartDate)).toString()) : new Date(this.parent.timelineModule.timelineStartDate);
        if (timelineStartDate) {
            var leftValue = void 0;
            var hasDST = this.hasDSTTransition(startDate.getFullYear());
            var transitions = void 0;
            if (hasDST) {
                transitions = this.getDSTTransitions(startDate.getFullYear(), this.systemTimeZone);
            }
            if (this.parent.isInDst(startDate) && !this.parent.isInDst(timelineStartDate)) {
                var newTimelineStartDate = void 0;
                if (this.parent.isInDst(date)) {
                    newTimelineStartDate = new Date(timelineStartDate.getTime() - (60 * 60 * 1000));
                }
                else {
                    newTimelineStartDate = new Date(timelineStartDate.getTime());
                }
                leftValue = (date.getTime() - newTimelineStartDate.getTime()) / (1000 * 60 * 60 * 24) * this.parent.perDayWidth;
            }
            else {
                var width = void 0;
                if (this.parent.timelineModule.bottomTier === 'Day' && this.getSecondsInDecimal(date) !== this.parent.defaultStartTime && this.getSecondsInDecimal(date) !== 0 &&
                    !isTimeSet && !this.parent['isFromEventMarker']) {
                    var newDate = new Date(startDate.getTime());
                    var setStartDate = new Date(newDate.setHours(0, 0, 0, 0));
                    var duration = this.getDuration(setStartDate, startDate, 'day', true, false);
                    width = duration * this.parent.perDayWidth;
                    date.setHours(0, 0, 0, 0);
                    leftValue = (date.getTime() - timelineStartDate.getTime()) / (1000 * 60 * 60 * 24) * this.parent.perDayWidth;
                    if (this.getSecondsInDecimal(startDate) !== this.parent.defaultStartTime && this.parent.timelineModule.bottomTier === 'Day') {
                        leftValue += width;
                    }
                }
                else {
                    leftValue = (date.getTime() - timelineStartDate.getTime()) / (1000 * 60 * 60 * 24) * this.parent.perDayWidth;
                }
            }
            var timelineStartTime = timelineStartDate.getTime();
            var dstStartTime = void 0;
            if (transitions && transitions['dstStart']) {
                dstStartTime = transitions['dstStart'].getTime();
            }
            var isBeforeOrAtDSTStart = timelineStartTime <= dstStartTime;
            if (hasDST && this.parent.dayWorkingTime[0]['properties'].from > transitions['dstStart'].getHours() && isBeforeOrAtDSTStart && tierMode === 'Day' && this.getSecondsInDecimal(date) === this.parent.defaultStartTime) {
                if ((leftValue % this.parent.perDayWidth) !== 0) {
                    var leftDifference = this.parent.perDayWidth - (leftValue % this.parent.perDayWidth);
                    leftValue = leftValue + leftDifference;
                }
            }
            var topTier = this.parent.timelineModule.customTimelineSettings.topTier;
            if (topTier && topTier['unit'] === 'Hour' && topTier['count'] === 1) {
                tierMode = topTier['unit'];
                countValue = topTier['count'];
            }
            var pervYear = startDate.getFullYear() - 1;
            var isprevYearTransitions = false;
            if (timelineStartDate.getFullYear() <= pervYear) {
                if (timelineStartDate.getFullYear() < pervYear) {
                    isprevYearTransitions = true;
                }
                else {
                    var pervDSTTransitions = this.getDSTTransitions(timelineStartDate.getFullYear(), this.systemTimeZone);
                    if (startDate >= pervDSTTransitions['dstStart']) {
                        isprevYearTransitions = true;
                    }
                }
            }
            var isHourly = this.parent.timelineModule.topTier === 'Hour' || this.parent.timelineModule.bottomTier === 'Hour';
            var isDaily = this.parent.timelineModule.topTier === 'Day' || this.parent.timelineModule.bottomTier === 'Day';
            var isStartDateInDst = this.parent.isInDst(startDate);
            var isTimelineStartDateInDst = this.parent.isInDst(timelineStartDate);
            var perHourWidth = this.parent.perDayWidth / 24;
            if (!isStartDateInDst && isTimelineStartDateInDst) {
                if ((countValue !== 1 && isHourly) || (countValue === 1 && isDaily)) {
                    leftValue -= perHourWidth;
                }
            }
            var unitHour = ((tierMode === 'Hour' && countValue === 1) || (tierMode === 'Minutes' && countValue === 60));
            if (hasDST && unitHour && ((startDate >= transitions['dstStart']) || isprevYearTransitions) && !this.parent.enableTimelineVirtualization) {
                if (countValue === 1) {
                    var projectStartDate = new Date(this.parent.projectStartDate);
                    var projectEndDate = new Date(this.parent.projectEndDate);
                    var yearsCount_1 = [];
                    for (var year = projectStartDate.getFullYear(); year <= projectEndDate.getFullYear(); year++) {
                        yearsCount_1.push(year);
                    }
                    var findYearIndex = function (year) {
                        return yearsCount_1.indexOf(year);
                    };
                    var index = findYearIndex(startDate.getFullYear());
                    if (index !== -1) {
                        if ((startDate > transitions['dstEnd']) || index === 0) {
                            index += 1;
                        }
                        leftValue -= index * (this.parent.perDayWidth / 24);
                    }
                }
            }
            return leftValue;
        }
        else {
            return 0;
        }
    };
    TaskProcessor.prototype.getSplitTaskWidth = function (sDate, duration, data) {
        var startDate = new Date(sDate.getTime());
        var endDate = new Date((this.getEndDate(startDate, duration, data.ganttProperties.durationUnit, data.ganttProperties, false).getTime()));
        var tierViewMode = this.parent.timelineModule.bottomTier !== 'None' ? this.parent.timelineModule.bottomTier :
            this.parent.timelineModule.topTier;
        if (tierViewMode === 'Day') {
            var dayStartTime = void 0;
            var dayEndTime = void 0;
            if (this.parent.weekWorkingTime.length > 0) {
                dayStartTime = this.parent['getStartTime'](startDate);
                dayEndTime = this.parent['getEndTime'](endDate);
            }
            else {
                dayStartTime = this.parent.defaultStartTime;
                dayEndTime = this.parent.defaultEndTime;
            }
            if (this.getSecondsInDecimal(startDate) === dayStartTime) {
                startDate.setHours(0, 0, 0, 0);
            }
            if (this.getSecondsInDecimal(endDate) === dayEndTime) {
                endDate.setHours(24);
            }
            if (this.getSecondsInDecimal(endDate) === dayStartTime) {
                endDate.setHours(0, 0, 0, 0);
            }
        }
        return ((this.getTimeDifference(startDate, endDate) / (1000 * 60 * 60 * 24)) * this.parent.perDayWidth);
    };
    TaskProcessor.prototype.getSplitTaskLeft = function (sDate, segmentTaskStartDate) {
        var stDate = new Date(sDate.getTime());
        var tierViewMode = this.parent.timelineModule.bottomTier !== 'None' ? this.parent.timelineModule.bottomTier :
            this.parent.timelineModule.topTier;
        if (tierViewMode === 'Day') {
            var dayStartTime = void 0;
            var segmentStartTime = void 0;
            if (this.parent.weekWorkingTime.length > 0) {
                dayStartTime = this.parent['getStartTime'](stDate);
                segmentStartTime = this.parent['getStartTime'](segmentTaskStartDate);
            }
            else {
                segmentStartTime = dayStartTime = this.parent.defaultStartTime;
            }
            if (this.getSecondsInDecimal(stDate) === dayStartTime) {
                stDate.setHours(0, 0, 0, 0);
            }
            if (this.getSecondsInDecimal(segmentTaskStartDate) === segmentStartTime) {
                segmentTaskStartDate.setHours(0, 0, 0, 0);
            }
        }
        if (segmentTaskStartDate) {
            return (stDate.getTime() - segmentTaskStartDate.getTime()) / (1000 * 60 * 60 * 24) * this.parent.perDayWidth;
        }
        else {
            return 0;
        }
    };
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {string} fieldName .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateMappingData = function (ganttData, fieldName) {
        var columnMapping = this.parent.columnMapping;
        var ganttProp = ganttData.ganttProperties;
        if (isNullOrUndefined(columnMapping[fieldName]) && fieldName !== 'taskType' && fieldName !== 'segments') {
            return;
        }
        if (fieldName === 'predecessorName') {
            //
        }
        else if (fieldName === 'resourceInfo') {
            var resourceData = ganttProp.resourceInfo;
            var resourceSettings = this.parent.resourceFields;
            // eslint-disable-next-line
            var resourcesId = [];
            var resourcesName = [];
            if (!isNullOrUndefined(resourceData)) {
                for (var i = 0; i < resourceData.length; i++) {
                    resourcesId.push(resourceData[i][resourceSettings.id]);
                    var resName = resourceData[i][resourceSettings.name];
                    var resourceUnit = resourceData[i][resourceSettings.unit];
                    if (resourceUnit !== 100) {
                        resName += '[' + resourceUnit + '%' + ']';
                    }
                    if (resName) {
                        resourcesName.push(resName);
                    }
                }
            }
            this.parent.setRecordValue('resourceNames', resourcesName.join(','), ganttProp, true);
            if (this.isResourceString) {
                if (ganttData.taskData[this.parent.taskFields.resourceInfo] &&
                    ganttData.taskData[this.parent.taskFields.resourceInfo][0]) {
                    ganttData.taskData[this.parent.taskFields.resourceInfo] =
                        ganttData.taskData[this.parent.taskFields.resourceInfo][0][resourceSettings.name];
                }
                this.updateTaskDataResource(ganttData);
            }
            else {
                this.updateTaskDataResource(ganttData);
            }
            this.parent.setRecordValue(columnMapping[fieldName], resourcesName.join(','), ganttData);
        }
        else if (fieldName === 'startDate' || fieldName === 'endDate') {
            this.setRecordDate(ganttData, ganttProp[fieldName], columnMapping[fieldName]);
        }
        else if (fieldName === 'duration') {
            this.setRecordDuration(ganttData, columnMapping[fieldName]);
        }
        else if (fieldName === 'work') {
            this.parent.setRecordValue('taskData.' + columnMapping[fieldName], ganttProp.work, ganttData);
            this.parent.setRecordValue(columnMapping[fieldName], ganttProp[fieldName], ganttData);
        }
        else if (fieldName === 'type') {
            this.parent.setRecordValue('taskData.' + columnMapping[fieldName], ganttProp.taskType, ganttData);
            this.parent.setRecordValue(columnMapping[fieldName], ganttProp.taskType, ganttData);
        }
        else if (fieldName === 'manual') {
            this.parent.setRecordValue('taskData.' + columnMapping[fieldName], !ganttProp.isAutoSchedule, ganttData);
            this.parent.setRecordValue(columnMapping[fieldName], !ganttProp.isAutoSchedule, ganttData);
        }
        else if (fieldName === 'segments') {
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.segments, this.segmentTaskData(ganttData), ganttData);
        }
        else {
            this.parent.setRecordValue('taskData.' + columnMapping[fieldName], ganttProp[fieldName], ganttData);
            this.parent.setRecordValue(columnMapping[fieldName], ganttProp[fieldName], ganttData);
        }
    };
    TaskProcessor.prototype.segmentTaskData = function (data) {
        var _this = this;
        var segments = data.ganttProperties.segments;
        var taskSettings = this.parent.taskFields;
        if (isNullOrUndefined(segments)) {
            return null;
        }
        var taskData = extend([], [], data.taskData[taskSettings.segments], true);
        for (var i = 0; i < segments.length; i++) {
            if (this.parent.isEdit || (this.parent.editModule && this.parent.editModule.dialogModule &&
                getValue('isEdit', this.parent.editModule.dialogModule)) || (this.parent.contextMenuModule && getValue('isEdit', this.parent.contextMenuModule))) {
                taskData[i] = {};
            }
            if (!isNullOrUndefined(taskSettings.startDate)) {
                taskData[i][this.parent.taskFields.startDate] = segments[i].startDate;
            }
            if (!isNullOrUndefined(taskSettings.endDate)) {
                taskData[i][this.parent.taskFields.endDate] = segments[i].endDate;
            }
            if (!isNullOrUndefined(taskSettings.duration)) {
                taskData[i][this.parent.taskFields.duration] = Number(segments[i].duration);
            }
        }
        if (this.customSegmentProperties.length > 0 && taskData && taskData.length > 0) {
            taskData.forEach(function (task, index) {
                var mergedObject = Object.assign({}, task, _this.customSegmentProperties[index]);
                taskData[index] = mergedObject;
            });
        }
        return taskData;
    };
    /**
     * Method to update the task data resource values
     *
     * @param {IGanttData} ganttData .
     * @returns {void} .
     */
    TaskProcessor.prototype.updateTaskDataResource = function (ganttData) {
        var resourceData = ganttData.ganttProperties.resourceInfo;
        var preTaskResources = ganttData.taskData[this.parent.taskFields.resourceInfo];
        var resourceSettings = this.parent.resourceFields;
        if (isNullOrUndefined(preTaskResources)) {
            ganttData.taskData[this.parent.taskFields.resourceInfo] = resourceData;
        }
        else if (resourceData && resourceData.length) {
            for (var i = 0; i < resourceData.length; i++) {
                var isAdded = false;
                if (typeof (preTaskResources) === 'string') {
                    if (typeof preTaskResources === 'string') {
                        if ((preTaskResources) === (resourceData[i][resourceSettings.name])) {
                            preTaskResources = resourceData[i][resourceSettings.name];
                            isAdded = true;
                            break;
                        }
                    }
                }
                else {
                    for (var j = 0; j < preTaskResources.length; j++) {
                        if (typeof preTaskResources[j] === 'number' || typeof preTaskResources[j] === 'string') {
                            if (parseInt(preTaskResources[j], 10) ===
                                parseInt(resourceData[i][resourceSettings.id], 10)) {
                                preTaskResources[j] = resourceData[i];
                                isAdded = true;
                                break;
                            }
                        }
                        else if (preTaskResources[j][resourceSettings.id] === resourceData[i][resourceSettings.id] && typeof preTaskResources[j] !== 'number') {
                            preTaskResources[j] = extend({}, preTaskResources[j], resourceData[i], true);
                            isAdded = true;
                            break;
                        }
                    }
                }
                if (!isAdded) {
                    if (typeof (preTaskResources) === 'string') {
                        preTaskResources = resourceData[i][resourceSettings.name];
                    }
                    else {
                        preTaskResources.push(resourceData[i]);
                    }
                }
            }
            var data_1 = [];
            if (!isNullOrUndefined(preTaskResources)) {
                if (typeof (preTaskResources) !== 'string') {
                    var _loop_4 = function (k) {
                        resourceData.filter(function (resourceInfo) {
                            if (resourceInfo[resourceSettings.id] === preTaskResources[k][resourceSettings.id]
                                && data_1.indexOf(preTaskResources[k]) === -1) {
                                data_1.push(preTaskResources[k]);
                            }
                        });
                    };
                    for (var k = 0; k < preTaskResources.length; k++) {
                        _loop_4(k);
                    }
                    this.parent.setRecordValue('taskData.' + this.parent.taskFields.resourceInfo, data_1, ganttData);
                }
                else {
                    this.parent.setRecordValue('taskData.' + this.parent.taskFields.resourceInfo, preTaskResources, ganttData);
                }
            }
        }
        else {
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.resourceInfo, [], ganttData);
        }
    };
    TaskProcessor.prototype.setRecordDate = function (task, value, mapping) {
        var tempDate = typeof value === 'string' ? new Date(value) : value;
        if (!isNullOrUndefined(value)) {
            value = new Date(tempDate.getTime());
        }
        this.parent.setRecordValue(mapping, value, task);
        if (!isNullOrUndefined(value)) {
            value = new Date(tempDate.getTime());
        }
        if (!this.parent.isLoad && !this.parent.isDynamicData) {
            this.parent.setRecordValue('taskData.' + mapping, value, task);
        }
        this.parent.isDynamicData = false;
    };
    TaskProcessor.prototype.getDurationInDay = function (duration, durationUnit) {
        if (durationUnit === 'day') {
            return duration;
        }
        else if (durationUnit === 'hour') {
            return duration / (this.parent.secondsPerDay / 3600);
        }
        else {
            return duration / (this.parent.secondsPerDay / 60);
        }
    };
    TaskProcessor.prototype.setRecordDuration = function (task, mapping) {
        var duration = task.ganttProperties.duration;
        var durationUnit = task.ganttProperties.durationUnit;
        if (!isNullOrUndefined(duration)) {
            this.parent.setRecordValue(mapping, task.ganttProperties.duration, task);
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var durationValue = (getValue(mapping, task.taskData));
            if (isNaN(durationValue) && isNullOrUndefined(this.parent.taskFields.durationUnit) && !isNullOrUndefined(durationValue)) {
                this.parent.setRecordValue('taskData.' + mapping, this.getDurationString(duration, durationUnit), task);
            }
            else {
                if (typeof durationValue === 'string') {
                    this.parent.setRecordValue('taskData.' + mapping, duration.toString(), task);
                }
                else {
                    this.parent.setRecordValue('taskData.' + mapping, duration, task);
                }
            }
        }
        else {
            this.parent.setRecordValue(mapping, duration, task);
            this.parent.setRecordValue('taskData.' + mapping, duration, task);
        }
        if (this.parent.taskFields.durationUnit) {
            task.taskData[this.parent.taskFields.durationUnit] = task.ganttProperties.durationUnit;
        }
    };
    TaskProcessor.prototype.setDataSource = function (data) {
        var dataArray;
        var createData = [];
        if (Array.isArray(data)) {
            dataArray = data;
        }
        var length = dataArray.length;
        for (var i = 0; i < length; i++) {
            var record = data[i];
            createData.push(record);
            if (!(isNullOrUndefined(data[i][this.parent.taskFields.child]))) {
                this.setDataSource(data[i][this.parent.taskFields.child]);
            }
        }
        return createData;
    };
    TaskProcessor.prototype.setStartDate = function (task) {
        var _this = this;
        var hierarchicalData = [];
        if (!isNullOrUndefined(this.parent.taskFields.parentID) && !isNullOrUndefined(this.parent.taskFields.id)) {
            hierarchicalData = this.setDataSource(this.parent.dataSource);
        }
        else {
            hierarchicalData = this.parent.dataSource;
        }
        hierarchicalData.map(function (record) {
            if (task.ganttProperties.taskId === record[_this.parent.taskFields.id]) {
                if (!isNullOrUndefined(_this.parent.taskFields.startDate)) {
                    task[_this.parent.taskFields.startDate] = record[_this.parent.taskFields.startDate];
                }
                if (!isNullOrUndefined(_this.parent.taskFields.endDate)) {
                    task[_this.parent.taskFields.endDate] = record[_this.parent.taskFields.endDate];
                }
            }
        });
    };
    TaskProcessor.prototype.getWorkInHour = function (work, workUnit) {
        if (workUnit === 'day') {
            return work * (this.parent.secondsPerDay / 3600);
        }
        else if (workUnit === 'minute') {
            return work / 60;
        }
        else {
            return work;
        }
    };
    /**
     *
     * @param {IGanttData} ganttData .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateTaskData = function (ganttData) {
        var dataMapping = this.parent.taskFields;
        var ganttProperties = ganttData.ganttProperties;
        if (!isNullOrUndefined(ganttData.taskData)) {
            var data = ganttData.taskData;
            if (dataMapping.id) {
                this.parent.setRecordValue('taskData.' + dataMapping.id, ganttProperties.taskId, ganttData);
                this.parent.setRecordValue(dataMapping.id, ganttProperties.taskId, ganttData);
            }
            if (dataMapping.name) {
                if (!this.parent.isLoad) {
                    this.parent.setRecordValue('taskData.' + dataMapping.name, ganttProperties.taskName, ganttData);
                }
                this.parent.setRecordValue(dataMapping.name, ganttProperties.taskName, ganttData);
            }
            if (dataMapping.startDate) {
                this.setRecordDate(ganttData, ganttProperties.startDate, dataMapping.startDate);
            }
            if (dataMapping.endDate) {
                this.setRecordDate(ganttData, ganttProperties.endDate, dataMapping.endDate);
            }
            if (dataMapping.duration) {
                if (isNullOrUndefined(dataMapping.milestone) || (!isNullOrUndefined(dataMapping.milestone) &&
                    !ganttData.taskData[dataMapping.milestone])) {
                    this.setRecordDuration(ganttData, dataMapping.duration);
                }
            }
            if (dataMapping.durationUnit) {
                data[dataMapping.durationUnit] = ganttProperties.durationUnit;
            }
            if (dataMapping.progress) {
                if (!this.parent.isLoad) {
                    this.parent.setRecordValue('taskData.' + dataMapping.progress, ganttProperties.progress, ganttData);
                }
                this.parent.setRecordValue(dataMapping.progress, ganttProperties.progress, ganttData);
            }
            if (dataMapping.baselineStartDate) {
                this.setRecordDate(ganttData, ganttProperties.baselineStartDate, dataMapping.baselineStartDate);
            }
            if (dataMapping.baselineEndDate) {
                this.setRecordDate(ganttData, ganttProperties.baselineEndDate, dataMapping.baselineEndDate);
            }
            if (dataMapping.notes) {
                if (!this.parent.isLoad) {
                    this.parent.setRecordValue('taskData.' + dataMapping.notes, ganttProperties.notes, ganttData);
                }
                this.parent.setRecordValue(dataMapping.notes, ganttProperties.notes, ganttData);
            }
            if (dataMapping.cssClass) {
                if (!this.parent.isLoad) {
                    this.parent.setRecordValue('taskData.' + dataMapping.cssClass, ganttProperties.cssClass, ganttData);
                }
                this.parent.setRecordValue(dataMapping.cssClass, ganttProperties.cssClass, ganttData);
            }
            if (dataMapping.indicators) {
                if (!this.parent.isLoad) {
                    this.parent.setRecordValue('taskData.' + dataMapping.indicators, ganttProperties.indicators, ganttData);
                }
                this.parent.setRecordValue(dataMapping.indicators, ganttProperties.indicators, ganttData);
            }
            if (dataMapping.parentID) {
                var parentID = this.parent.viewType === 'ProjectView' ? ganttProperties.parentId : data[dataMapping.parentID];
                this.parent.setRecordValue('taskData.' + dataMapping.parentID, parentID, ganttData);
                this.parent.setRecordValue(dataMapping.parentID, ganttProperties.parentId, ganttData);
            }
            if (dataMapping.work) {
                if (!this.parent.isLoad) {
                    this.parent.setRecordValue('taskData.' + dataMapping.work, ganttProperties.work, ganttData);
                }
                this.parent.setRecordValue(dataMapping.work, ganttProperties.work, ganttData);
            }
            if (dataMapping.type) {
                this.parent.setRecordValue('taskData.' + dataMapping.type, ganttProperties.taskType, ganttData);
                this.parent.setRecordValue(dataMapping.type, ganttProperties.taskType, ganttData);
            }
        }
    };
    /**
     * To set resource value in Gantt record
     *
     * @param {object} data .
     * @returns {object[]} .
     * @private
     */
    TaskProcessor.prototype.setResourceInfo = function (data) {
        var _this = this;
        // eslint-disable-next-line
        var resourceIdCollection;
        if (isNullOrUndefined(data[this.parent.taskFields.resourceInfo])) {
            return resourceIdCollection;
        }
        if (this.parent.isLoad) {
            resourceIdCollection = data[this.parent.taskFields.resourceInfo];
        }
        else {
            resourceIdCollection = data['taskData'] && this.parent.taskFields.resourceInfo in data['taskData']
                ? data['taskData'][this.parent.taskFields.resourceInfo]
                : data[this.parent.taskFields.resourceInfo];
        }
        var resourceData;
        if (!isNullOrUndefined(this.parent.editModule) && !isNullOrUndefined(this.parent.editModule.dialogModule)
            && this.parent.editModule.dialogModule.isAddNewResource) {
            resourceData = this.parent.editModule.dialogModule.ganttResources;
        }
        else {
            resourceData = this.parent.resources;
        }
        var resourceIDMapping = this.parent.resourceFields.id;
        var resourceUnitMapping = this.parent.resourceFields.unit;
        var resourceGroup = this.parent.resourceFields.group;
        var resources = [];
        if (typeof (resourceIdCollection) === 'string' && resourceIdCollection !== '') {
            var resource_1 = [];
            var resourceIds_1 = data[this.parent.taskFields.resourceInfo].split(',');
            if (resourceIds_1) {
                resourceData.forEach(function (resourceInfo) {
                    if (resourceIds_1.includes(resourceInfo[_this.parent.resourceFields.name])) {
                        resource_1.push(resourceInfo);
                    }
                });
                var ganttDataResource = extend({}, resource_1[0]);
                resources.push(ganttDataResource);
                if (!isNullOrUndefined(resourceUnitMapping) && !isNullOrUndefined(resourceIdCollection[resourceUnitMapping])) {
                    ganttDataResource[resourceUnitMapping] = resourceIdCollection[resourceUnitMapping];
                }
                if (!isNullOrUndefined(resourceGroup) && !isNullOrUndefined(resourceIdCollection[resourceGroup])) {
                    ganttDataResource[resourceGroup] = resourceIdCollection[resourceGroup];
                }
            }
        }
        else {
            var _loop_5 = function (count) {
                var resource = resourceData.filter(function (resourceInfo) {
                    if (typeof (resourceIdCollection[count]) === 'object' &&
                        resourceIdCollection[count][resourceIDMapping] === resourceInfo[resourceIDMapping]) {
                        return true;
                    }
                    else {
                        return (resourceIdCollection[count] === resourceInfo[resourceIDMapping]);
                    }
                });
                var ganttDataResource = extend({}, resource[0]);
                resources.push(ganttDataResource);
                if (!isNullOrUndefined(resourceUnitMapping)
                    && !isNullOrUndefined(resourceIdCollection[count][resourceUnitMapping])) {
                    ganttDataResource[resourceUnitMapping] = resourceIdCollection[count][resourceUnitMapping];
                }
                if (!isNullOrUndefined(resourceGroup)
                    && !isNullOrUndefined(resourceIdCollection[count][resourceGroup])) {
                    ganttDataResource[resourceGroup] = resourceIdCollection[count][resourceGroup];
                }
            };
            for (var count = 0; count < resourceIdCollection.length; count++) {
                _loop_5(count);
            }
        }
        this.updateResourceUnit(resources);
        return resources;
    };
    /**
     * To set resource unit in Gantt record
     *
     * @param {object[]} resourceData .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateResourceUnit = function (resourceData) {
        var resourceUnit = this.parent.resourceFields.unit;
        if (!isNullOrUndefined(resourceUnit)) {
            var length_1 = resourceData.length;
            var index = void 0;
            for (index = 0; index < length_1; index++) {
                if (isNullOrUndefined(resourceData[index][resourceUnit])) {
                    resourceData[index][resourceUnit] = 100;
                }
            }
        }
    };
    /**
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateResourceName = function (data) {
        var resourceInfo = data.ganttProperties.resourceInfo;
        var resourceName = [];
        var taskMapping = this.parent.taskFields;
        if (resourceInfo && resourceInfo.length > 0) {
            var resourceLength = resourceInfo.length;
            if (typeof data.taskData[this.parent.taskFields.resourceInfo] === 'string') {
                var taskResources = data.taskData[this.parent.taskFields.resourceInfo];
                var stringResourceName = taskResources;
                this.parent.setRecordValue('resourceNames', stringResourceName, data.ganttProperties, true);
                this.parent.setRecordValue(this.parent.taskFields.resourceInfo, stringResourceName, data, true);
                this.updateTaskDataResource(data);
            }
            else {
                var taskResources = extend([], [], data.taskData[this.parent.taskFields.resourceInfo], true);
                this.parent.setRecordValue('taskData.' + this.parent.taskFields.resourceInfo, [], data);
                for (var i = 0; i < resourceLength; i++) {
                    var resource = resourceInfo[i];
                    var resName = resource[this.parent.resourceFields.name];
                    var resourceUnit = resource[this.parent.resourceFields.unit];
                    if (resourceUnit !== 100) {
                        resName += '[' + resourceUnit + '%' + ']';
                    }
                    if (!isNullOrUndefined(resName)) {
                        resourceName.push(resName);
                    }
                    if (data.taskData) {
                        var mapping = taskMapping.resourceInfo;
                        if (taskResources[i] && typeof (taskResources[parseInt(i.toString(), 10)] === 'object')) {
                            data.taskData[mapping].push(taskResources[i]);
                        }
                        else {
                            data.taskData[mapping].push(resource[this.parent.resourceFields.id]);
                        }
                    }
                }
                this.parent.setRecordValue('resourceNames', resourceName.join(','), data.ganttProperties, true);
                this.parent.setRecordValue(this.parent.taskFields.resourceInfo, resourceName.join(','), data, true);
                this.updateTaskDataResource(data);
            }
        }
    };
    TaskProcessor.prototype.dataReorder = function (flatCollection, rootCollection) {
        var result = [];
        while (flatCollection.length > 0 && rootCollection.length > 0) {
            var index = rootCollection.indexOf(flatCollection[0]);
            if (index === -1) {
                flatCollection.shift();
            }
            else {
                result.push(flatCollection.shift());
                rootCollection.splice(index, 1);
            }
        }
        return result;
    };
    TaskProcessor.prototype.validateDurationUnitMapping = function (durationUnit) {
        var unit = durationUnit;
        if ((unit === 'minute') || (unit === 'minutes') || (unit === 'm') || (unit === 'min')) {
            unit = 'minute';
        }
        else if ((unit === 'hour') || (unit === 'hours') || (unit === 'h') || (unit === 'hr')) {
            unit = 'hour';
        }
        else if ((unit === 'day') || (unit === 'days') || (unit === 'd')) {
            unit = 'day';
        }
        else {
            unit = this.parent.durationUnit.toLocaleLowerCase();
        }
        return unit;
    };
    TaskProcessor.prototype.validateTaskTypeMapping = function (taskType) {
        var type = taskType;
        if (type === 'FixedDuration') {
            type = 'FixedDuration';
        }
        else if (type === 'FixedUnit') {
            type = 'FixedUnit';
        }
        else if (type === 'FixedWork') {
            type = 'FixedWork';
        }
        else {
            type = this.parent.taskType;
        }
        return type;
    };
    TaskProcessor.prototype.validateWorkUnitMapping = function (workUnit) {
        var unit = workUnit;
        if (unit === 'minute') {
            unit = 'minute';
        }
        else if (unit === 'hour') {
            unit = 'hour';
        }
        else if (unit === 'day') {
            unit = 'day';
        }
        else {
            unit = this.parent.workUnit.toLocaleLowerCase();
        }
        return unit;
    };
    /**
     * To update duration value in Task
     *
     * @param {string} duration .
     * @param {ITaskData} ganttProperties .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateDurationValue = function (duration, ganttProperties) {
        var tempDuration = this.getDurationValue(duration);
        if (!isNaN(getValue('duration', tempDuration))) {
            this.parent.setRecordValue('duration', getValue('duration', tempDuration), ganttProperties, true);
        }
        if (!isNullOrUndefined(getValue('durationUnit', tempDuration))) {
            this.parent.setRecordValue('durationUnit', getValue('durationUnit', tempDuration), ganttProperties, true);
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.reUpdateGanttData = function () {
        if (this.parent.flatData.length > 0) {
            var data = void 0;
            var ganttData = void 0;
            this.parent.secondsPerDay = this.getSecondsPerDay();
            for (var index = 0; index < this.parent.flatData.length; index++) {
                data = this.parent.flatData[index].taskData;
                ganttData = this.parent.flatData[index];
                if (!isNullOrUndefined(this.parent.taskFields.duration)) {
                    this.setRecordDuration(ganttData, this.parent.taskFields.duration);
                }
                if (this.parent.isLoad) {
                    this.setStartDate(ganttData);
                }
                this.calculateScheduledValues(ganttData, data, false);
            }
            this.updateGanttData();
        }
    };
    //check day is fall between from and to date range
    TaskProcessor.prototype._isInStartDateRange = function (day, from, to) {
        var isInRange = false;
        if (day.getTime() >= from.getTime() && day.getTime() < to.getTime()) {
            isInRange = true;
        }
        return isInRange;
    };
    //check day is fall between from and to date range
    TaskProcessor.prototype._isInEndDateRange = function (day, from, to) {
        var isInRange = false;
        if (day.getTime() > from.getTime() && day.getTime() <= to.getTime()) {
            isInRange = true;
        }
        return isInRange;
    };
    /**
     * Method to find overlapping value of the parent task
     *
     * @param {IGanttData} resourceTask .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateOverlappingValues = function (resourceTask) {
        var _this = this;
        var tasks = resourceTask.childRecords;
        var currentTask;
        var ranges = [];
        if (tasks.length <= 1) {
            resourceTask.ganttProperties.workTimelineRanges = [];
            return;
        }
        tasks = this.setSortedChildTasks(resourceTask);
        this.updateOverlappingIndex(tasks);
        var _loop_6 = function (count) {
            currentTask = tasks[count];
            var currSegments = (currentTask.ganttProperties.segments || [
                { startDate: currentTask.ganttProperties.startDate, endDate: currentTask.ganttProperties.endDate }
            ]).map(function (_a) {
                var startDate = _a.startDate, endDate = _a.endDate;
                return ({
                    startDate: new Date(startDate),
                    endDate: new Date(endDate)
                });
            });
            var range = [];
            currSegments.forEach(function (currSegment) {
                var cStartDate = new Date(currSegment.startDate.getTime());
                var cEndDate = new Date(currSegment.endDate.getTime());
                for (var index = 0; index < count; index++) {
                    var task = tasks[index];
                    var taskSegments = (task.ganttProperties.segments || [
                        { startDate: task.ganttProperties.startDate, endDate: task.ganttProperties.endDate }
                    ]).map(function (_a) {
                        var startDate = _a.startDate, endDate = _a.endDate;
                        return ({
                            startDate: new Date(startDate),
                            endDate: new Date(endDate)
                        });
                    });
                    taskSegments.forEach(function (segment) {
                        var tStartDate = segment.startDate;
                        var tEndDate = segment.endDate;
                        var rangeObj = {};
                        if (cStartDate && cEndDate && tEndDate
                            && (_this._isInStartDateRange(cStartDate, tStartDate, tEndDate)
                                || _this._isInEndDateRange(cEndDate, tStartDate, tEndDate) ||
                                (tStartDate.getTime() >= cStartDate.getTime() && tEndDate.getTime() <= cEndDate.getTime()))) {
                            if ((tStartDate.getTime() > cStartDate.getTime() && tStartDate.getTime() < cEndDate.getTime()
                                && tEndDate.getTime() > cStartDate.getTime() && tEndDate.getTime() >= cEndDate.getTime())
                                || (cStartDate.getTime() === tStartDate.getTime() && cEndDate.getTime() <= tEndDate.getTime())) {
                                rangeObj.from = tStartDate;
                                rangeObj.to = cEndDate;
                            }
                            else if (cStartDate.getTime() === tStartDate.getTime() && cEndDate.getTime() > tEndDate.getTime()) {
                                rangeObj.from = tStartDate;
                                rangeObj.to = tEndDate;
                            }
                            else if (cStartDate.getTime() > tStartDate.getTime() && cEndDate.getTime() >= tEndDate.getTime()) {
                                rangeObj.from = cStartDate;
                                rangeObj.to = tEndDate;
                            }
                            else if (cStartDate.getTime() > tStartDate.getTime() && cEndDate.getTime() < tEndDate.getTime()) {
                                rangeObj.from = cStartDate;
                                rangeObj.to = cEndDate;
                            }
                            else if (tStartDate.getTime() >= cStartDate.getTime() && tEndDate.getTime() <= cEndDate.getTime()) {
                                rangeObj.from = tStartDate;
                                rangeObj.to = tEndDate;
                            }
                            if (rangeObj.from && rangeObj.to) {
                                range.push(rangeObj);
                            }
                        }
                    });
                }
            });
            ranges.push.apply(ranges, this_4.mergeRangeCollections(range));
        };
        var this_4 = this;
        for (var count = 1; count < tasks.length; count++) {
            _loop_6(count);
        }
        this.parent.setRecordValue('workTimelineRanges', this.mergeRangeCollections(ranges, true), resourceTask.ganttProperties, true);
        this.calculateRangeLeftWidth(resourceTask.ganttProperties.workTimelineRanges);
    };
    /**
     * @param {IGanttData[]} tasks .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateOverlappingIndex = function (tasks) {
        for (var i = 0; i < tasks.length; i++) {
            tasks[i].ganttProperties.eOverlapIndex = i;
        }
    };
    /**
     * Method to calculate the left and width value of oarlapping ranges
     *
     * @param {IWorkTimelineRanges[]} ranges .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.calculateRangeLeftWidth = function (ranges) {
        for (var count = 0; count < ranges.length; count++) {
            ranges[count].left = this.getTaskLeft(ranges[count].from, false);
            ranges[count].width = this.getTaskWidth(ranges[count].from, ranges[count].to);
        }
    };
    /**
     * @param {IWorkTimelineRanges[]} ranges .
     * @param {boolean} isSplit .
     * @returns {IWorkTimelineRanges[]} .
     * @private
     */
    TaskProcessor.prototype.mergeRangeCollections = function (ranges, isSplit) {
        var finalRange = [];
        var currentTopRange = {};
        var cCompareRange = {};
        var cStartDate;
        var cEndDate;
        var tStartDate;
        var tEndDate;
        var sortedRanges = new DataManager(ranges).executeLocal(new Query()
            .sortBy(this.parent.taskFields.startDate, 'Ascending'));
        for (var i = 0; i < sortedRanges.length; i++) {
            if (finalRange.length === 0 && i === 0) {
                finalRange.push(sortedRanges[i]);
                continue;
            }
            currentTopRange = finalRange[finalRange.length - 1];
            cStartDate = currentTopRange.from;
            cEndDate = currentTopRange.to;
            cCompareRange = sortedRanges[i];
            tStartDate = cCompareRange.from;
            tEndDate = cCompareRange.to;
            if ((cStartDate.getTime() === tStartDate.getTime() && cEndDate.getTime() >= tEndDate.getTime())
                || (cStartDate.getTime() < tStartDate.getTime() && cEndDate.getTime() >= tEndDate.getTime())) {
                continue;
            }
            /* eslint-disable-next-line */
            else if ((cStartDate.getTime() <= tStartDate.getTime() && cEndDate.getTime() >= tStartDate.getTime() && cEndDate.getTime() < tEndDate.getTime())
                || (cEndDate.getTime() < tStartDate.getTime() && this.checkStartDate(cEndDate).getTime() === tStartDate.getTime())) {
                currentTopRange.to = tEndDate;
            }
            else if (cEndDate.getTime() < tStartDate.getTime() && this.checkStartDate(cEndDate).getTime() !== tStartDate.getTime()) {
                finalRange.push(sortedRanges[i]);
            }
        }
        if (isSplit) {
            finalRange = this.splitRangeCollection(finalRange);
        }
        return finalRange;
    };
    /**
     * Sort resource child records based on start date
     *
     * @param {IGanttData} resourceTask .
     * @returns {IGanttData} .
     * @private
     */
    TaskProcessor.prototype.setSortedChildTasks = function (resourceTask) {
        var sortedRecords = [];
        sortedRecords = new DataManager(resourceTask.childRecords).executeLocal(new Query()
            .sortBy(this.parent.taskFields.startDate, 'Ascending'));
        return sortedRecords;
    };
    TaskProcessor.prototype.splitRangeCollection = function (rangeCollection, fromField, toField) {
        var splitArray = [];
        var unit;
        if (this.parent.timelineModule.isSingleTier) {
            unit = this.parent.timelineModule.bottomTier !== 'None' ?
                this.parent.timelineModule.bottomTier : this.parent.timelineModule.topTier;
        }
        else {
            unit = this.parent.timelineModule.bottomTier;
        }
        if (unit === 'Week' || unit === 'Month' || unit === 'Year') {
            splitArray = rangeCollection;
        }
        else if (unit === 'Day') {
            splitArray = this.getRangeWithWeek(rangeCollection, fromField, toField);
        }
        else {
            if (this.parent.workingTimeRanges[0].from === 0 && this.parent.workingTimeRanges[0].to === 86400) {
                splitArray = this.getRangeWithWeek(rangeCollection, fromField, toField);
            }
            else {
                splitArray = this.getRangeWithDay(rangeCollection, fromField, toField);
            }
        }
        return splitArray;
    };
    TaskProcessor.prototype.getRangeWithDay = function (ranges, fromField, toField) {
        var splitArray = [];
        for (var i = 0; i < ranges.length; i++) {
            splitArray.push.apply(splitArray, this.splitRangeForDayMode(ranges[parseInt(i.toString(), 10)], fromField, toField));
        }
        return splitArray;
    };
    TaskProcessor.prototype.splitRangeForDayMode = function (range, fromField, toField) {
        var fromString = fromField ? fromField : 'from';
        var toString = toField ? toField : 'to';
        var tempStart = new Date(range[fromString]);
        var end = new Date(range[toString]);
        var ranges = [];
        var rangeObject = {};
        if (tempStart.getTime() < end.getTime()) {
            do {
                var nStart = new Date(tempStart.getTime());
                var nEndDate = new Date(tempStart.getTime());
                var nextAvailDuration = 0;
                var sHour = this.parent.dataOperation.getSecondsInDecimal(tempStart);
                var startRangeIndex = -1;
                for (var i = 0; i < this.parent.workingTimeRanges.length; i++) {
                    var val = this.parent.workingTimeRanges[i];
                    if (sHour >= val.from && sHour <= val.to) {
                        startRangeIndex = i;
                        break;
                    }
                }
                if (startRangeIndex !== -1) {
                    nextAvailDuration = Math.round(this.parent.workingTimeRanges[startRangeIndex].to - sHour);
                    nEndDate.setSeconds(nEndDate.getSeconds() + nextAvailDuration);
                }
                var taskName = 'task';
                if (nEndDate.getTime() < end.getTime()) {
                    rangeObject = {};
                    if (range.task) {
                        rangeObject[taskName] = extend([], range.task);
                    }
                    rangeObject[fromString] = nStart;
                    rangeObject[toString] = nEndDate;
                    rangeObject.isSplit = true;
                    ranges.push(rangeObject);
                }
                else {
                    rangeObject = {};
                    if (range.task) {
                        rangeObject[taskName] = extend([], range.task);
                    }
                    rangeObject[fromString] = nStart;
                    rangeObject[toString] = end;
                    rangeObject.isSplit = true;
                    ranges.push(rangeObject);
                }
                tempStart = this.checkStartDate(nEndDate);
            } while (tempStart.getTime() < end.getTime());
        }
        else {
            ranges.push(range);
        }
        return ranges;
    };
    TaskProcessor.prototype.getRangeWithWeek = function (ranges, fromField, toField) {
        var splitArray = [];
        for (var i = 0; i < ranges.length; i++) {
            // eslint-disable-next-line
            splitArray.push.apply(splitArray, this.splitRangeForWeekMode(ranges[i], fromField, toField));
        }
        return splitArray;
    };
    TaskProcessor.prototype.splitRangeForWeekMode = function (range, fromField, toField) {
        var from = fromField ? fromField : 'from';
        var to = toField ? toField : 'to';
        var start = new Date(range[from]);
        var tempStart = new Date(range[from]);
        var end = new Date(range[to]);
        var isInSplit = false;
        var ranges = [];
        var rangeObj = {};
        tempStart.setDate(tempStart.getDate() + 1);
        if (tempStart.getTime() < end.getTime()) {
            do {
                if (this.parent.dataOperation.isOnHolidayOrWeekEnd(tempStart, null)) {
                    var tempEndDate = new Date(tempStart.getTime());
                    tempEndDate.setDate(tempStart.getDate() - 1);
                    var dayEndTime = void 0;
                    if (this.parent.weekWorkingTime.length > 0) {
                        dayEndTime = this.parent['getEndTime'](tempEndDate);
                    }
                    else {
                        dayEndTime = this.parent.defaultEndTime;
                    }
                    this.setTime(dayEndTime, tempEndDate);
                    rangeObj = {};
                    rangeObj[from] = start;
                    rangeObj.isSplit = true;
                    rangeObj[to] = new Date(tempEndDate);
                    if (range.task) {
                        rangeObj.task = extend([], range.task, true);
                    }
                    var isStartNotHolidayOrWeekend = !this.parent.dataOperation.isOnHolidayOrWeekEnd(start, null);
                    var isTempEndDateNotHolidayOrWeekend = !this.parent.dataOperation.isOnHolidayOrWeekEnd(tempEndDate, null);
                    var isDifferentDates = start.getTime() !== tempEndDate.getTime();
                    if (isStartNotHolidayOrWeekend && isTempEndDateNotHolidayOrWeekend && isDifferentDates) {
                        ranges.push(rangeObj);
                    }
                    tempEndDate.setDate(tempEndDate.getDate() + 1);
                    start = this.checkStartDate(tempEndDate);
                    tempStart = new Date(start.getTime());
                    isInSplit = true;
                }
                else {
                    tempStart.setDate(tempStart.getDate() + 1);
                }
            } while (tempStart.getTime() < end.getTime());
            if (isInSplit) {
                if (start.getTime() !== end.getTime()) {
                    rangeObj = {};
                    if (range.task) {
                        rangeObj.task = extend([], range.task, true);
                    }
                    rangeObj[from] = start;
                    rangeObj[to] = end;
                    rangeObj.isSplit = true;
                    ranges.push(rangeObj);
                }
            }
            else {
                ranges.push(range);
            }
        }
        else {
            ranges.push(range);
        }
        return ranges;
    };
    /**
     * Update all gantt data collection width, progress width and left value
     *
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateGanttData = function () {
        this.systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var flatData = this.parent.flatData;
        if (!flatData.length) {
            return;
        }
        var parentTaskMap = new Map();
        for (var _i = 0, flatData_1 = flatData; _i < flatData_1.length; _i++) {
            var task = flatData_1[_i];
            parentTaskMap.set(task.uniqueID, task);
        }
        for (var i = 0, lenth = flatData.length; i < lenth; i++) {
            this.updateTaskLeftWidth(flatData[i], parentTaskMap);
        }
    };
    TaskProcessor.prototype.shouldProcessUpdateWidth = function () {
        return (!this.parent.autoCalculateDateScheduling ||
            (this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand &&
                Boolean(this.parent.taskFields.hasChildMapping)));
    };
    /**
     * Update all gantt data collection width, progress width and left value
     *
     * @param {IGanttData} data .
     * @param {Map<string, IGanttData>} parentRecords .
     * @returns {void} .
     * @public
     */
    TaskProcessor.prototype.updateTaskLeftWidth = function (data, parentRecords) {
        if (parentRecords === void 0) { parentRecords = null; }
        var task = data.ganttProperties;
        if (!data.hasChildRecords || this.shouldProcessUpdateWidth()) {
            this.updateWidthLeft(data);
        }
        this.parent.setRecordValue('baselineLeft', this.calculateBaselineLeft(task), task, true);
        this.parent.setRecordValue('baselineWidth', this.calculateBaselineWidth(task), task, true);
        var parentItem = data.parentItem ? (parentRecords != null ? parentRecords.get(data.parentItem.uniqueID) :
            this.parent.getParentTask(data.parentItem)) : null;
        var isLastChild = parentItem && parentItem.childRecords.slice(-1)[0] === data;
        if (parentItem) {
            if (isLastChild && !data.hasChildRecords && this.parent.enableValidation) {
                if ((this.parent.autoCalculateDateScheduling && !(this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand &&
                    this.parent.taskFields.hasChildMapping)) || this.parent.viewType === 'ResourceView') {
                    this.updateParentItems(parentItem);
                }
                if (this.shouldProcessUpdateWidth()) {
                    this.updateWidthLeft(parentItem);
                }
            }
            else if (parentItem && !this.parent.enableValidation) {
                this.updateWidthLeft(parentItem);
            }
        }
    };
    /**
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.reUpdateGanttDataPosition = function () {
        var flatData;
        if (this.parent.pdfExportModule && this.parent.pdfExportModule.isPdfExport && this.parent.pdfExportModule.helper.exportProps &&
            this.parent.pdfExportModule.helper.exportProps.fitToWidthSettings
            && this.parent.pdfExportModule.helper.exportProps.fitToWidthSettings.isFitToWidth) {
            flatData = this.parent.pdfExportModule.helper.beforeSinglePageExport['cloneFlatData'];
        }
        else {
            flatData = this.parent.flatData;
        }
        var length = flatData.length;
        for (var i = 0; i < length; i++) {
            var data = flatData[i];
            var task = data.ganttProperties;
            this.updateWidthLeft(data);
            if (this.parent.taskMode !== 'Auto' && data.hasChildRecords) {
                this.updateAutoWidthLeft(data);
            }
            this.parent.setRecordValue('baselineLeft', this.calculateBaselineLeft(task), task, true);
            this.parent.setRecordValue('baselineWidth', this.calculateBaselineWidth(task), task, true);
            this.parent.dataOperation.updateTaskData(data);
        }
    };
    /**
     * method to update left, width, progress width in record
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateWidthLeft = function (data) {
        var ganttRecord = data.ganttProperties;
        var totalSegmentsProgressWidth = 0;
        // task endDate may be changed in segment calculation so this must be calculated first.
        // task width calculating was based on endDate
        var progressResizer = 0;
        if (!isNullOrUndefined(ganttRecord.segments) && ganttRecord.segments.length > 0) {
            var segments = ganttRecord.segments;
            for (var i = 0; i < segments.length; i++) {
                var segment = segments[i];
                if (i === 0 && !isNullOrUndefined(ganttRecord.startDate)
                    && !isNullOrUndefined(segment.startDate) && !isNullOrUndefined(segment.startDate.getTime()) &&
                    segment.startDate.getTime() !== ganttRecord.startDate.getTime()) {
                    segment.startDate = ganttRecord.startDate;
                    var endDate = this.parent.dataOperation.getEndDate(segment.startDate, segment.duration, ganttRecord.durationUnit, ganttRecord, false);
                    segment.endDate = this.parent.dataOperation.checkEndDate(endDate, ganttRecord, false);
                    this.parent.chartRowsModule.incrementSegments(segments, 0, data);
                }
                segment.width = this.getSplitTaskWidth(segment.startDate, segment.duration, data);
                totalSegmentsProgressWidth = totalSegmentsProgressWidth + segment.width;
                segment.showProgress = false;
                segment.progressWidth = -1;
                if (i !== 0) {
                    var pStartDate = new Date(ganttRecord.startDate.getTime());
                    segment.left = this.getSplitTaskLeft(segment.startDate, pStartDate);
                }
            }
            var setProgress = this.parent.dataOperation.getProgressWidth(totalSegmentsProgressWidth, ganttRecord.progress);
            var isValid = true;
            for (var i = 0; i < segments.length; i++) {
                if (isValid) {
                    if (setProgress <= segments[i].width) {
                        segments[i].progressWidth = setProgress;
                        segments[i].showProgress = true;
                        isValid = false;
                    }
                    else {
                        segments[i].progressWidth = segments[i].width;
                        setProgress = setProgress - segments[i].progressWidth;
                    }
                    if (segments[i].showProgress) {
                        progressResizer = progressResizer + segments[i].left + segments[i].progressWidth;
                    }
                }
            }
            this.parent.setRecordValue('segments', ganttRecord.segments, ganttRecord, true);
            this.parent.dataOperation.updateMappingData(data, 'segments');
        }
        this.parent.setRecordValue('width', this.parent.dataOperation.calculateWidth(data), ganttRecord, true);
        this.parent.setRecordValue('left', this.parent.dataOperation.calculateLeft(ganttRecord, data), ganttRecord, true);
        if (!isNullOrUndefined(ganttRecord.segments) && ganttRecord.segments.length > 0) {
            this.parent.setRecordValue('progressWidth', progressResizer, ganttRecord, true);
        }
        else {
            this.parent.setRecordValue('progressWidth', this.parent.dataOperation.getProgressWidth((ganttRecord.isAutoSchedule || !data.hasChildRecords ? ganttRecord.width : ganttRecord.autoWidth), ganttRecord.progress), ganttRecord, true);
        }
    };
    /**
     * method to update left, width, progress width in record
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateAutoWidthLeft = function (data) {
        var ganttRecord = data.ganttProperties;
        this.parent.setRecordValue('autoWidth', this.calculateWidth(data, true), ganttRecord, true);
        this.parent.setRecordValue('autoLeft', this.calculateLeft(ganttRecord, data, true), ganttRecord, true);
        this.parent.setRecordValue('progressWidth', this.parent.dataOperation.getProgressWidth((ganttRecord.isAutoSchedule ||
            !data.hasChildRecords ? ganttRecord.width : ganttRecord.autoWidth), ganttRecord.progress), ganttRecord, true);
    };
    /**
     * To calculate parent progress value
     *
     * @param {IGanttData} childGanttRecord .
     * @returns {object} .
     * @private
     */
    TaskProcessor.prototype.getParentProgress = function (childGanttRecord) {
        var durationInDay = 0;
        var progressValues = {};
        var totSeconds;
        if (this.parent.weekWorkingTime.length > 0) {
            totSeconds = this.parent['getSecondsPerDay'](childGanttRecord.ganttProperties.startDate ? childGanttRecord.ganttProperties.startDate : childGanttRecord.ganttProperties.endDate);
        }
        else {
            totSeconds = this.parent.secondsPerDay;
        }
        switch (childGanttRecord.ganttProperties.durationUnit) {
            case 'hour':
                durationInDay = (childGanttRecord.ganttProperties.duration / (totSeconds / 3600));
                break;
            case 'minute':
                durationInDay = (childGanttRecord.ganttProperties.duration / (totSeconds / 60));
                break;
            default:
                durationInDay = childGanttRecord.ganttProperties.duration;
        }
        if (childGanttRecord.hasChildRecords) {
            setValue('totalProgress', childGanttRecord.ganttProperties.totalProgress, progressValues);
            setValue('totalDuration', childGanttRecord.ganttProperties.totalDuration ? childGanttRecord.ganttProperties.totalDuration : 0, progressValues);
        }
        else {
            setValue('totalProgress', childGanttRecord.ganttProperties.progress * durationInDay, progressValues);
            setValue('totalDuration', durationInDay, progressValues);
        }
        return progressValues;
    };
    TaskProcessor.prototype.resetDependency = function (record) {
        var dependency = this.parent.taskFields.dependency;
        if (!isNullOrUndefined(dependency)) {
            var recordProp = record.ganttProperties;
            this.parent.setRecordValue('predecessor', [], recordProp, true);
            this.parent.setRecordValue('predecessorsName', null, recordProp, true);
            this.parent.setRecordValue('taskData.' + dependency, null, record);
            this.parent.setRecordValue(dependency, null, record);
        }
    };
    TaskProcessor.prototype.isUnscheduledTask = function (ganttProperties, parantData) {
        var properties = ['startDate', 'endDate', 'duration'];
        var count = 0;
        var filledProperty = null;
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            if (ganttProperties && ganttProperties[prop]) {
                count++;
                filledProperty = prop;
            }
        }
        if (count === 1 || (count === 0 && !isNullOrUndefined(parantData) && parantData.hasChildRecords)) {
            return [true, filledProperty];
        }
        else {
            return [false, null];
        }
    };
    TaskProcessor.prototype.isFromManual = function (childData) {
        if (this.parent.allowUnscheduledTasks && this.parent.editModule && this.parent['oldRecords'] && this.parent['oldRecords'].length > 0 &&
            isNullOrUndefined(childData.ganttProperties.startDate) && isNullOrUndefined(childData.ganttProperties.endDate)
            && !isNullOrUndefined(childData.ganttProperties.duration) && !childData.hasChildRecords && childData.parentItem &&
            (this.parent.taskMode === 'Manual' || (this.parent.taskMode === 'Custom' && childData[this.parent.taskFields.manual]))) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @param {IParent | IGanttData} cloneParent .
     * @param {boolean} isParent .
     * @returns {void} .
     * @private
     */
    TaskProcessor.prototype.updateParentItems = function (cloneParent, isParent) {
        var _this = this;
        var parentData = isParent ? cloneParent : this.parent.getParentTask(cloneParent);
        parentData = parentData ? parentData : cloneParent;
        var deleteUpdate = false;
        var ganttProp = !isNullOrUndefined(parentData) ? parentData.ganttProperties : null;
        /* eslint-disable-next-line */
        var _a = this.isUnscheduledTask(ganttProp, parentData), isParentUnschecule = _a[0], propertyWithValue = _a[1];
        if ((this.parent.autoCalculateDateScheduling && !(this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand &&
            this.parent.taskFields.hasChildMapping)) || this.parent.viewType === 'ResourceView') {
            if (parentData && parentData.childRecords && parentData.childRecords.length > 0) {
                var previousStartDate = ganttProp.isAutoSchedule ? ganttProp.startDate : ganttProp.autoStartDate;
                var previousEndDate = ganttProp.isAutoSchedule ? ganttProp.endDate :
                    ganttProp.autoEndDate;
                var childRecords_1 = parentData.childRecords;
                var childLength = childRecords_1.length;
                var totalDuration = 0;
                var minStartDate = null;
                var maxEndDate = null;
                var milestoneCount = 0;
                var totalProgress = 0;
                var childCompletedWorks = 0;
                var childData_1;
                var countOfScheduled_1 = 0;
                var countOfUnScheduled_1 = 0;
                childRecords_1.some(function (childRecord) {
                    var _a = _this.isUnscheduledTask(childRecord['ganttProperties']), isUnscheduled = _a[0], propertyWithValue = _a[1];
                    if (isUnscheduled && propertyWithValue === 'duration') {
                        ++countOfUnScheduled_1;
                    }
                    else if (!isUnscheduled) {
                        ++countOfScheduled_1;
                    }
                    return countOfScheduled_1 > 0 && countOfUnScheduled_1 > 0;
                });
                var isChildBoth = (countOfScheduled_1 > 0 && countOfUnScheduled_1 > 0) ? true : undefined;
                var _loop_7 = function (count) {
                    childData_1 = (this_5.parent.loadChildOnDemand && this_5.parent.taskFields.hasChildMapping) ?
                        this_5.parent.currentViewData.filter(function (item) {
                            return item.ganttProperties.taskId === childRecords_1[count][_this.parent.taskFields.id];
                        })[0] :
                        childRecords_1[count];
                    if (this_5.parent.isOnDelete && childData_1.isDelete) {
                        if (childLength === 1 && this_5.parent.viewType === 'ProjectView') {
                            deleteUpdate = true;
                        }
                        return "continue";
                    }
                    var startDate = void 0;
                    var endDate = void 0;
                    var _a = this_5.isUnscheduledTask(childData_1.ganttProperties), isUnscheduled = _a[0], propertyWithValue_1 = _a[1];
                    var parentRec = void 0;
                    if (this_5.isFromManual(childData_1)) {
                        var ganttRec = this_5.parent['oldRecords'].filter(function (record) { return record.ganttProperties.uniqueID === childData_1.ganttProperties.uniqueID; })[0];
                        if (ganttRec) {
                            parentRec = this_5.parent.getParentTask(ganttRec.parentItem);
                        }
                    }
                    var rec = parentRec ? parentRec : childData_1;
                    var prop = parentRec ? parentRec.ganttProperties : ganttProp;
                    startDate = ((isUnscheduled && (propertyWithValue_1 !== 'startDate' && propertyWithValue_1 !== 'endDate')) && !isParentUnschecule) ?
                        ganttProp.startDate : this_5.getValidStartDate(rec.ganttProperties);
                    if (parentData.hasChildRecords && !prop.isAutoSchedule
                        && !isNullOrUndefined(rec.ganttProperties.autoStartDate)) {
                        startDate = rec.ganttProperties.autoStartDate;
                    }
                    endDate = ((isUnscheduled && (propertyWithValue_1 !== 'startDate' && propertyWithValue_1 !== 'endDate')) && !isParentUnschecule) ?
                        this_5.getEndDate(ganttProp.startDate, rec.ganttProperties.duration, rec.ganttProperties.durationUnit, rec.ganttProperties, false) : this_5.getValidEndDate(rec.ganttProperties);
                    if (parentData.hasChildRecords && !prop.isAutoSchedule
                        && !isNullOrUndefined(rec.ganttProperties.autoEndDate)) {
                        endDate = rec.ganttProperties.autoEndDate;
                    }
                    if (isUnscheduled && !(propertyWithValue_1 === 'startDate' || propertyWithValue_1 === 'endDate')) {
                        var formattedEndDate = this_5.getDateFromFormat(endDate);
                        var formattedStartDate = this_5.getDateFromFormat(startDate);
                        if (formattedEndDate > maxEndDate) {
                            maxEndDate = formattedEndDate;
                        }
                        if (formattedStartDate < minStartDate) {
                            minStartDate = formattedStartDate;
                        }
                    }
                    var isChildBothAndScheduled = (isChildBoth && !isUnscheduled) || isNullOrUndefined(isChildBoth);
                    if (isNullOrUndefined(minStartDate) && isChildBothAndScheduled) {
                        minStartDate = this_5.getDateFromFormat(startDate);
                    }
                    if (isNullOrUndefined(maxEndDate) && isChildBothAndScheduled) {
                        maxEndDate = this_5.getDateFromFormat(endDate);
                    }
                    if (!isNullOrUndefined(endDate) && maxEndDate && this_5.compareDates(endDate, maxEndDate) === 1) {
                        maxEndDate = this_5.getDateFromFormat(endDate);
                    }
                    if (!isNullOrUndefined(startDate) && minStartDate && this_5.compareDates(startDate, minStartDate) === -1) {
                        minStartDate = this_5.getDateFromFormat(startDate);
                    }
                    if (!childData_1.ganttProperties.isMilestone && isScheduledTask(childData_1.ganttProperties)) {
                        var progressValues = this_5.getParentProgress(childData_1);
                        totalProgress += getValue('totalProgress', progressValues);
                        totalDuration += getValue('totalDuration', progressValues);
                        if (childData_1[this_5.parent.taskFields.duration] < 1) {
                            totalDuration = Number(totalDuration.toFixed(4));
                        }
                    }
                    else {
                        milestoneCount++;
                    }
                    var work = childData_1.ganttProperties.work;
                    if (typeof work === 'string') {
                        // If it's a string, convert it to a number
                        var numericValue = parseFloat(work);
                        if (!isNaN(numericValue)) {
                            childCompletedWorks += numericValue;
                        }
                    }
                    else if (typeof work === 'number') {
                        // If it's already a number, simply add it to childCompletedWorks
                        childCompletedWorks += work;
                    }
                };
                var this_5 = this;
                for (var count = 0; count < childLength; count++) {
                    _loop_7(count);
                }
                if (!deleteUpdate) {
                    var taskCount = (this.parent.isOnDelete && childData_1.isDelete) ?
                        childLength - milestoneCount - 1 : childLength - milestoneCount;
                    var parentProgress = (taskCount > 0 && totalDuration > 0) ?
                        Number((totalProgress / totalDuration).toFixed(2)) : 0;
                    var parentProp = parentData.ganttProperties;
                    var milestone = (taskCount === 0) && minStartDate && maxEndDate &&
                        minStartDate.getTime() === maxEndDate.getTime() ? true : false;
                    if (this.compareDates(previousStartDate, minStartDate) !== 0) {
                        this.parent.setRecordValue(ganttProp.isAutoSchedule ? 'startDate' : 'autoStartDate', minStartDate, parentData.ganttProperties, true);
                        if ((((!isNullOrUndefined(ganttProp.autoDuration)) ? ganttProp.autoDuration === 0 : ganttProp.duration === 0)) && parentData['isManual'] && milestone && (parentData.hasChildRecords && parentData.ganttProperties.isAutoSchedule && this.parent.editModule.taskbarEditModule.taskbarEditedArgs.action !== 'TaskbarEditing')) {
                            this.parent.setRecordValue('startDate', minStartDate, parentData.ganttProperties, true);
                        }
                    }
                    if (this.compareDates(previousEndDate, maxEndDate) !== 0) {
                        this.parent.setRecordValue(ganttProp.isAutoSchedule ? 'endDate' : 'autoEndDate', maxEndDate, parentData.ganttProperties, true);
                        if ((((!isNullOrUndefined(ganttProp.autoDuration)) ? ganttProp.autoDuration === 0 : ganttProp.duration === 0)) && parentData['isManual'] && milestone && (parentData.hasChildRecords && parentData.ganttProperties.isAutoSchedule && this.parent.editModule.taskbarEditModule.taskbarEditedArgs.action !== 'TaskbarEditing')) {
                            this.parent.setRecordValue('endDate', maxEndDate, parentData.ganttProperties, true);
                        }
                    }
                    this.parent.setRecordValue('isMilestone', milestone, parentProp, true);
                    if (!isNullOrUndefined(this.parent.taskFields.milestone)) {
                        this.updateMappingData(parentData, 'milestone');
                        this.parent.setRecordValue(this.parent.taskFields.milestone, milestone, parentData, true);
                        this.parent.setRecordValue('taskData.' + this.parent.taskFields.milestone, milestone, parentData, true);
                    }
                    if (parentProp.isAutoSchedule) {
                        if (this.isFromManual(childData_1)) {
                            if (parentData.childRecords.length === 1) {
                                parentData.ganttProperties.duration = childData_1.ganttProperties.duration;
                            }
                            this.calculateEndDate(parentData);
                        }
                        else {
                            this.calculateDuration(parentData);
                        }
                    }
                    this.updateWorkWithDuration(parentData);
                    var parentWork = parentProp.work;
                    parentWork = this.parent.isOnEdit ? parentWork : (parentWork + childCompletedWorks);
                    this.parent.setRecordValue('work', parentWork, parentProp, true);
                    this.parent.setRecordValue('taskType', 'FixedDuration', parentProp, true);
                    if (!isNullOrUndefined(this.parent.taskFields.type)) {
                        this.updateMappingData(parentData, 'type');
                    }
                    this.parent.setRecordValue('progress', Math.floor(parentProgress), parentProp, true);
                    this.parent.setRecordValue('totalProgress', totalProgress, parentProp, true);
                    this.parent.setRecordValue('totalDuration', totalDuration, parentProp, true);
                    this.parent.setRecordValue('autoDuration', parentProp.duration, parentProp, true);
                    if (!parentProp.isAutoSchedule) {
                        this.parent.setRecordValue('autoDuration', this.calculateAutoDuration(parentProp), parentProp, true);
                        this.updateAutoWidthLeft(parentData);
                    }
                    if (!this.parent.allowParentDependency) {
                        this.resetDependency(parentData);
                    }
                    this.updateWidthLeft(parentData);
                    this.updateTaskData(parentData);
                }
            }
        }
        else {
            this.parent.setRecordValue('endDate', parentData.taskData[this.parent.taskFields.endDate], parentData.ganttProperties, true);
        }
        if (deleteUpdate && parentData.childRecords.length === 1 && parentData.ganttProperties.duration === 0) {
            this.parent.setRecordValue('isMilestone', true, parentData.ganttProperties, true);
            this.updateWidthLeft(parentData);
            this.updateTaskData(parentData);
        }
        var parentItem = !isNullOrUndefined(parentData) ?
            this.parent.getParentTask(parentData.parentItem) : null;
        if (parentItem) {
            if ((this.parent.autoCalculateDateScheduling && !(this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand &&
                this.parent.taskFields.hasChildMapping)) || this.parent.viewType === 'ResourceView') {
                this.updateParentItems(parentItem);
            }
        }
        deleteUpdate = false;
    };
    return TaskProcessor;
}(DateProcessor));
export { TaskProcessor };
