import { isScheduledTask } from '../base/utils';
import { getValue, isNullOrUndefined, extend } from '@syncfusion/ej2-base';
var Dependency = /** @class */ (function () {
    function Dependency(gantt) {
        this.parentRecord = [];
        this.parentIds = [];
        this.parentPredecessors = [];
        this.validatedParentIds = [];
        this.storeId = null;
        this.isChildRecordValidated = [];
        this.parent = gantt;
        this.dateValidateModule = this.parent.dateValidationModule;
    }
    /**
     * Method to populate predecessor collections in records
     *
     * @returns {void} .
     * @private
     */
    Dependency.prototype.ensurePredecessorCollection = function () {
        var predecessorTasks = this.parent.predecessorsCollection;
        for (var _i = 0, predecessorTasks_1 = predecessorTasks; _i < predecessorTasks_1.length; _i++) {
            var ganttData = predecessorTasks_1[_i];
            if ((!ganttData.hasChildRecords && !this.parent.allowParentDependency) || this.parent.allowParentDependency) {
                this.ensurePredecessorCollectionHelper(ganttData, ganttData.ganttProperties);
            }
        }
    };
    /**
     *
     * @param {IGanttData} ganttData .
     * @param {ITaskData} ganttProp .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.ensurePredecessorCollectionHelper = function (ganttData, ganttProp) {
        var predecessorVal = ganttProp.predecessorsName;
        if (predecessorVal && (typeof predecessorVal === 'string' || typeof predecessorVal === 'number')) {
            this.parent.setRecordValue('predecessor', this.calculatePredecessor(predecessorVal, ganttData), ganttProp, true);
        }
        else if (predecessorVal && typeof predecessorVal === 'object' && predecessorVal.length) {
            var preValues = [];
            for (var c = 0; c < predecessorVal.length; c++) {
                var predecessorItem = predecessorVal[c];
                var preValue = {};
                preValue.from = getValue('from', predecessorItem) ? getValue('from', predecessorItem) : predecessorVal[c];
                preValue.to = getValue('to', predecessorItem) ? getValue('to', predecessorItem) : ganttProp.rowUniqueID;
                preValue.type = getValue('type', predecessorItem) ? getValue('type', predecessorItem) : 'FS';
                var offsetUnits = getValue('offset', predecessorItem);
                if (isNullOrUndefined(offsetUnits)) {
                    preValue.offset = 0;
                    preValue.offsetUnit = this.parent.durationUnit.toLocaleLowerCase();
                }
                else if (typeof offsetUnits === 'string') {
                    var tempOffsetUnits = this.getOffsetDurationUnit(getValue('offset', predecessorItem));
                    preValue.offset = tempOffsetUnits.duration;
                    preValue.offsetUnit = tempOffsetUnits.durationUnit;
                }
                else {
                    preValue.offset = parseFloat(offsetUnits.toString());
                    preValue.offsetUnit = this.parent.durationUnit.toLocaleLowerCase();
                }
                var isOwnParent = this.checkIsParent(preValue.from.toString());
                if (!isOwnParent) {
                    preValues.push(preValue);
                }
            }
            this.parent.setRecordValue('predecessor', preValues, ganttProp, true);
        }
        this.parent.setRecordValue('predecessorsName', this.getPredecessorStringValue(ganttData), ganttProp, true);
        this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, ganttProp.predecessorsName, ganttData);
        this.parent.setRecordValue(this.parent.taskFields.dependency, ganttProp.predecessorsName, ganttData);
    };
    /**
     * To render unscheduled empty task with 1 day duration during predecessor map
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updateUnscheduledDependency = function (data) {
        var task = this.parent.taskFields;
        var prdList = !isNullOrUndefined(data[task.dependency]) ?
            data[task.dependency].toString().split(',') : [];
        for (var i = 0; i < prdList.length; i++) {
            var predId = parseInt(prdList[i], 10);
            if (!isNaN(predId)) {
                var predData = this.parent.getRecordByID(predId.toString());
                var record = !isNullOrUndefined(predData) ?
                    extend({}, {}, predData.taskData, true) : null;
                if (!isNullOrUndefined(record) && isNullOrUndefined(record[task.startDate])
                    && isNullOrUndefined(record[task.duration]) && isNullOrUndefined(record[task.endDate])) {
                    record[task.duration] = 1;
                    var startDate = void 0;
                    var parentItem = predData.parentItem;
                    if (parentItem) {
                        var parentTask = this.parent.getParentTask(predData.parentItem);
                        while (parentTask && !parentTask.ganttProperties.startDate) {
                            parentTask = this.parent.getParentTask(parentTask.parentItem);
                        }
                        startDate = parentTask ? parentTask.ganttProperties.startDate : this.parent.cloneProjectStartDate;
                    }
                    else {
                        startDate = this.parent.cloneProjectStartDate;
                    }
                    record[task.startDate] = startDate;
                    this.parent.updateRecordByID(record);
                }
            }
        }
    };
    /**
     *
     * @param {string} fromId .
     * @returns {boolean} .
     */
    Dependency.prototype.checkIsParent = function (fromId) {
        var boolValue = false;
        var task = this.parent.connectorLineModule.getRecordByID(fromId);
        if (task.hasChildRecords) {
            boolValue = true;
        }
        return boolValue;
    };
    // Get the root parent of the record
    Dependency.prototype.getRootParent = function (rec) {
        var parentRec = rec;
        if (rec.parentItem) {
            parentRec = this.parent.flatData.filter(function (item) {
                return item.uniqueID === rec.parentUniqueID;
            })[0];
            if (parentRec.parentItem) {
                parentRec = this.getRootParent(parentRec);
            }
            return parentRec;
        }
        return parentRec;
    };
    // To check whether the predecessor drawn is valid for parent task
    Dependency.prototype.validateParentPredecessor = function (fromRecord, toRecord) {
        if (fromRecord && toRecord) {
            if (toRecord.hasChildRecords && !fromRecord.hasChildRecords) {
                if (fromRecord.parentUniqueID === toRecord.uniqueID) {
                    return false;
                }
                else {
                    do {
                        if (fromRecord.parentItem) {
                            fromRecord = this.parent.flatData[this.parent.ids.indexOf(fromRecord.parentItem.taskId)];
                            if (fromRecord.uniqueID === toRecord.uniqueID) {
                                return false;
                            }
                        }
                    } while (fromRecord.parentItem);
                }
            }
            else if (!toRecord.hasChildRecords && fromRecord.hasChildRecords) {
                if (toRecord.parentUniqueID === fromRecord.uniqueID) {
                    return false;
                }
                else {
                    do {
                        if (toRecord.parentItem) {
                            toRecord = this.parent.flatData[this.parent.ids.indexOf(toRecord.parentItem.taskId)];
                            if (toRecord.uniqueID === fromRecord.uniqueID) {
                                return false;
                            }
                        }
                    } while (toRecord.parentItem);
                }
            }
            else if (toRecord.hasChildRecords && fromRecord.hasChildRecords) {
                if (toRecord.parentItem && fromRecord.parentItem) {
                    if (fromRecord.parentUniqueID === toRecord.uniqueID || fromRecord.uniqueID === toRecord.parentUniqueID) {
                        return false;
                    }
                }
                else {
                    if (!toRecord.parentItem && fromRecord.parentItem) {
                        var fromRootParent = this.getRootParent(fromRecord);
                        if (fromRootParent.uniqueID === toRecord.uniqueID) {
                            return false;
                        }
                    }
                    else if (toRecord.parentItem && !fromRecord.parentItem) {
                        var toRootParent = this.getRootParent(toRecord);
                        if (toRootParent.uniqueID === fromRecord.uniqueID) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    };
    /**
     * Get predecessor collection object from predecessor string value
     *
     * @param {string | number} predecessorValue .
     * @param {IGanttData} ganttRecord .
     * @returns {IPredecessor[]} .
     * @private
     */
    Dependency.prototype.calculatePredecessor = function (predecessorValue, ganttRecord) {
        var _this = this;
        var predecessor = predecessorValue.toString();
        var collection = [];
        var match;
        var values = [];
        var offsetValue;
        var predecessorText;
        var parentRecords = [];
        predecessor.split(',').forEach(function (el) {
            var isGUId = false;
            var firstPart;
            var predecessorName;
            var isAlpha = false;
            var regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
            var elSplit = el.split('-');
            var id;
            if (elSplit.length === 6) {
                elSplit[4] = elSplit[4] + '-' + elSplit[5];
                elSplit.pop();
            }
            if (elSplit.length === 5 && elSplit[4].length >= 12) {
                id = el.substring(0, 36);
                if (regex.test(id)) {
                    isGUId = true;
                }
            }
            if (el.includes('-')) {
                var lastIndex = el.lastIndexOf('-');
                var lastPart = el.substring(lastIndex + 1);
                var baseString = el.replace(lastPart, '').trim();
                var match_1 = baseString.match(/(FS|SS|SF|FF)-$/);
                var processedResult = (match_1 ? match_1[0] : '') + lastPart;
                if (!/^(FS|SS|SF|FF)/.test(processedResult)) {
                    var prefixMatch = processedResult.match(/(FS|SS|SF|FF)/);
                    processedResult = prefixMatch
                        ? prefixMatch[0] + processedResult.slice(processedResult.indexOf(prefixMatch[0]) + prefixMatch[0].length)
                        : el;
                }
                predecessorName = processedResult;
                if (el.includes('-') && /[A-Za-z]/.test(predecessorName)) {
                    var indexFS = el.indexOf(predecessorName);
                    if (indexFS !== -1) {
                        firstPart = el.substring(0, indexFS);
                        if (firstPart.includes('-')) {
                            isAlpha = true;
                        }
                    }
                }
            }
            if (isGUId) {
                var split = void 0;
                split = elSplit[4].split('+');
                var spliceLength = void 0;
                if (split.length === 1) {
                    values[0] = el;
                }
                else {
                    spliceLength = split[1].length;
                    values[0] = el.slice(0, -(spliceLength + 1));
                    values[1] = split[1];
                }
                offsetValue = '+';
                if (elSplit[4].indexOf('-') >= 0) {
                    split = elSplit[4].split('-');
                    if (split.length === 1) {
                        values[0] = el;
                    }
                    else {
                        spliceLength = split[1].length;
                        values[0] = el.slice(0, -(spliceLength + 1));
                        values[1] = split[1];
                    }
                    offsetValue = '-';
                }
            }
            else {
                if (isAlpha && firstPart.includes('-')) {
                    values[0] = firstPart;
                }
                else {
                    values = el.split('+');
                    offsetValue = '+';
                    if (el.indexOf('-') >= 0) {
                        values = el.split('-');
                        offsetValue = '-';
                    }
                }
            }
            match = [];
            var ids = _this.parent.viewType === 'ResourceView' ? _this.parent.getTaskIds() : _this.parent.ids;
            var isExist1 = _this.parent.viewType === 'ResourceView' ? ids.indexOf('T' + values[0]) : ids.indexOf(values[0]);
            if (isExist1 !== -1) {
                match[0] = values[0];
            }
            else {
                if (ids.indexOf(values[0]) === -1) {
                    match = values[0].split(' ');
                    if (match.length === 1) {
                        if (match[0].indexOf(' ') !== -1) {
                            match = values[0].match(/(\d+|[A-z]+)/g);
                        }
                        else {
                            match[0] = values[0].slice(0, -2);
                            match[1] = values[0].slice(-2);
                        }
                    }
                }
                else {
                    match[0] = values[0];
                }
            }
            var isExist = _this.parent.viewType === 'ResourceView' ? ids.indexOf('T' + match[0]) : ids.indexOf(match[0]);
            /*Validate for appropriate predecessor*/
            if (match[0] && isExist !== -1) {
                if (match.length > 1) {
                    var type = match[1].toUpperCase();
                    if (type === 'FS' || type === 'FF' || type === 'SF' || type === 'SS') {
                        predecessorText = type;
                    }
                    else {
                        var e = "The provided dependency type, " + type + ", is invalid. Please ensure that the Dependency Type is FS or FF or SS or SF";
                        _this.parent.trigger('actionFailure', { error: e });
                        predecessorText = 'FS';
                    }
                }
                else if (el.includes('-') && /[A-Za-z]/.test(predecessorName) && firstPart.includes('-')) {
                    var type = el.slice(-2).toString();
                    type.toUpperCase();
                    if (type === 'FS' || type === 'FF' || type === 'SF' || type === 'SS') {
                        predecessorText = type;
                    }
                    else {
                        predecessorText = 'FS';
                    }
                }
                else {
                    predecessorText = 'FS';
                }
            }
            else {
                return; // exit current loop for invalid id (match[0])
            }
            var tempOffset = values.length > 1 ? offsetValue + '' + values[1] : '0';
            var offsetUnits = _this.getOffsetDurationUnit(tempOffset);
            var obj = {
                from: match[0],
                type: predecessorText,
                isDrawn: false,
                to: _this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId.toString()
                    : ganttRecord.ganttProperties.rowUniqueID.toString(),
                offsetUnit: offsetUnits.durationUnit,
                offset: offsetUnits.duration
            };
            var isOwnParent = _this.checkIsParent(match[0]);
            if (!_this.parent.allowParentDependency) {
                if (!isOwnParent) {
                    collection.push(obj);
                }
            }
            else {
                var fromData = _this.parent.connectorLineModule.getRecordByID(obj.to);
                var toData = _this.parent.connectorLineModule.getRecordByID(obj.from);
                var isValid = void 0;
                if (toData && fromData) {
                    isValid = _this.validateParentPredecessor(toData, fromData);
                    if (isValid) {
                        collection.push(obj);
                        if (parentRecords.indexOf(toData) === -1 && toData.hasChildRecords && _this.parent.editModule
                            && _this.parent.editModule.cellEditModule && _this.parent.editModule.cellEditModule.isCellEdit) {
                            parentRecords.push(extend([], [], [toData], true)[0]);
                        }
                    }
                }
                else {
                    collection.push(obj);
                }
                match.splice(0);
            }
        });
        if (parentRecords.length > 0 && this.parent.undoRedoModule && this.parent.editModule && this.parent.editModule.cellEditModule &&
            this.parent.editModule.cellEditModule.isCellEdit) {
            this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1]['connectedRecords'] = parentRecords;
        }
        var creatCollection = [];
        collection.map(function (data) {
            var from = data.from;
            var to = data.to;
            var checkColloction = [];
            checkColloction = collection.filter(function (fdata) { return fdata.from === from && fdata.to === to; });
            if (creatCollection.indexOf(checkColloction[checkColloction.length - 1]) === -1) {
                creatCollection.push(checkColloction[checkColloction.length - 1]);
            }
        });
        return creatCollection;
    };
    /**
     * Get predecessor value as string with offset values
     *
     * @param {IGanttData} data .
     * @returns {string} .
     * @private
     */
    Dependency.prototype.getPredecessorStringValue = function (data) {
        var predecessors = data.ganttProperties.predecessor;
        var resultString = '';
        var temp1;
        var match = [];
        if (predecessors) {
            var length_1 = predecessors.length;
            for (var i = 0; i < length_1; i++) {
                var currentValue = predecessors[i];
                var temp = '';
                var id = this.parent.viewType === 'ResourceView' ? data.ganttProperties.taskId
                    : data.ganttProperties.rowUniqueID;
                if (currentValue.from !== id.toString()) {
                    temp = currentValue.from + currentValue.type;
                    if (typeof (data.ganttProperties.taskId) === 'string') {
                        match[0] = temp.slice(0, -2);
                        match[1] = temp.slice(-2);
                        temp1 = match[0] + ' ' + match[1];
                    }
                    else {
                        temp1 = temp;
                    }
                    temp = temp1;
                    if (currentValue.offset !== 0) {
                        temp += currentValue.offset > 0 ? ('+' + currentValue.offset + ' ') : (currentValue.offset + ' ');
                        var multiple = currentValue.offset !== 1;
                        if (currentValue.offsetUnit === 'day') {
                            temp += multiple ? this.parent.localeObj.getConstant('days') : this.parent.localeObj.getConstant('day');
                        }
                        else if (currentValue.offsetUnit === 'hour') {
                            temp += multiple ? this.parent.localeObj.getConstant('hours') : this.parent.localeObj.getConstant('hour');
                        }
                        else {
                            temp += multiple ? this.parent.localeObj.getConstant('minutes') : this.parent.localeObj.getConstant('minute');
                        }
                    }
                    if (resultString.length > 0) {
                        resultString = resultString + ',' + temp;
                    }
                    else {
                        resultString = temp;
                    }
                }
            }
        }
        return resultString;
    };
    /*Get duration and duration unit value from tasks*/
    Dependency.prototype.getOffsetDurationUnit = function (val) {
        var duration = 0;
        var durationUnit = this.parent.durationUnit.toLocaleLowerCase();
        var durationUnitLabels = this.parent.durationUnitEditText;
        if (typeof val === 'string') {
            var values = val.match(/[^0-9]+|[0-9]+/g);
            for (var x = 0; x < values.length; x++) {
                values[x] = (values[x]).trim();
            }
            if (values[0] === '-' && values[1]) {
                values[1] = values[0] + values[1];
                values.shift();
            }
            else if (values[0] === '+') {
                values.shift();
            }
            if (values[1] === '.' && !isNaN(parseInt(values[2], 10))) {
                values[0] += values[1] + values[2];
                values.splice(1, 2);
            }
            if (values && values.length <= 2) {
                duration = parseFloat(values[0]);
                durationUnit = values[1] ? (values[1].toLowerCase()).trim() : '';
                if (getValue('minute', durationUnitLabels).indexOf(durationUnit) !== -1) {
                    durationUnit = 'minute';
                }
                else if (getValue('hour', durationUnitLabels).indexOf(durationUnit) !== -1) {
                    durationUnit = 'hour';
                }
                else if (getValue('day', durationUnitLabels).indexOf(durationUnit) !== -1) {
                    durationUnit = 'day';
                }
                else {
                    durationUnit = this.parent.durationUnit.toLocaleLowerCase();
                }
            }
        }
        else {
            duration = val;
            durationUnit = this.parent.durationUnit.toLocaleLowerCase();
        }
        if (isNaN(duration)) {
            var err = 'The provided value for the offset field is invalid.Please ensure the offset field contains only valid numeric values';
            this.parent.trigger('actionFailure', { error: err });
            duration = 0;
            durationUnit = this.parent.durationUnit.toLocaleLowerCase();
        }
        return {
            duration: duration,
            durationUnit: durationUnit
        };
    };
    /**
     * Update predecessor object in both from and to tasks collection
     *
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updatePredecessors = function (flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        var predecessorsCollection = this.parent.predecessorsCollection;
        var ganttRecord;
        var length = predecessorsCollection.length;
        for (var count = 0; count < length; count++) {
            ganttRecord = predecessorsCollection[count];
            if ((!ganttRecord.hasChildRecords && !this.parent.allowParentDependency) || this.parent.allowParentDependency) {
                this.updatePredecessorHelper(ganttRecord, predecessorsCollection, flatDataCollection);
                if (!ganttRecord.ganttProperties.isAutoSchedule && this.parent.editSettings.allowEditing) {
                    this.parent.connectorLineEditModule['validatedOffsetIds'] = [];
                    this.parent.connectorLineEditModule['calculateOffset'](ganttRecord);
                }
            }
        }
    };
    /**
     * To update predecessor collection to successor tasks
     *
     * @param {IGanttData} ganttRecord .
     * @param {IGanttData[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updatePredecessorHelper = function (ganttRecord, predecessorsCollection, flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        var connectorsCollection = ganttRecord.ganttProperties.predecessor;
        var successorGanttRecord;
        var connectorCount = connectorsCollection.length;
        predecessorsCollection = isNullOrUndefined(predecessorsCollection) ? [] : predecessorsCollection;
        for (var i = 0; i < connectorCount; i++) {
            var connector = connectorsCollection[i];
            if (this.parent.viewType === 'ProjectView' && !isNullOrUndefined(flatDataCollection)) {
                successorGanttRecord = flatDataCollection.get(connector.from);
            }
            else {
                successorGanttRecord = this.parent.connectorLineModule.getRecordByID(connector.from);
            }
            var id = this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId
                : ganttRecord.ganttProperties.rowUniqueID;
            if (connector.from !== id.toString()) {
                if (successorGanttRecord) {
                    var predecessorCollection = void 0;
                    if (successorGanttRecord.ganttProperties.predecessor) {
                        predecessorCollection = (extend([], successorGanttRecord.ganttProperties.predecessor, [], true));
                        predecessorCollection.push(connector);
                        this.parent.setRecordValue('predecessor', predecessorCollection, successorGanttRecord.ganttProperties, true);
                        //  successorGanttRecord.ganttProperties.predecessor.push(connector);
                    }
                    else {
                        predecessorCollection = [];
                        predecessorCollection.push(connector);
                        this.parent.setRecordValue('predecessor', predecessorCollection, successorGanttRecord.ganttProperties, true);
                        // this.parent.setRecordValue('predecessor', [], successorGanttRecord.ganttProperties, true);
                        // successorGanttRecord.ganttProperties.predecessor.push(connector);
                        predecessorsCollection.push(successorGanttRecord);
                    }
                }
            }
        }
    };
    Dependency.prototype.traverseParents = function (record) {
        this.parent.dataOperation.updateParentItems(record);
    };
    /**
     * Method to validate date of tasks with predecessor values for all records
     *
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updatedRecordsDateByPredecessor = function (flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        if (!this.parent.autoCalculateDateScheduling ||
            (this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand && this.parent.taskFields.hasChildMapping)) {
            return;
        }
        var flatData = this.parent.flatData;
        var totLength = flatData.length;
        if (isNullOrUndefined(flatDataCollection)) {
            flatDataCollection = new Map();
            for (var _i = 0, flatData_1 = flatData; _i < flatData_1.length; _i++) {
                var record = flatData_1[_i];
                flatDataCollection.set(record.ganttProperties.rowUniqueID.toString(), record);
            }
        }
        for (var count = 0; count < totLength; count++) {
            var currentTask = flatData[count];
            var properties = currentTask.ganttProperties;
            if (properties.predecessorsName) {
                this.validatePredecessorDates(currentTask, flatDataCollection);
                var predecessorCollection = properties.predecessor;
                if (predecessorCollection && predecessorCollection.length > 1) {
                    for (var _a = 0, predecessorCollection_1 = predecessorCollection; _a < predecessorCollection_1.length; _a++) {
                        var predecessor = predecessorCollection_1[_a];
                        var validateRecord = void 0;
                        if (this.parent.viewType === 'ProjectView') {
                            validateRecord = flatDataCollection.get(predecessor.to);
                        }
                        else {
                            validateRecord = this.parent.getRecordByID(predecessor.to);
                        }
                        if (validateRecord) {
                            this.validatePredecessorDates(validateRecord, flatDataCollection);
                        }
                    }
                }
                if (currentTask.hasChildRecords && properties.startDate && this.parent.allowParentDependency) {
                    this.updateChildItems(currentTask);
                }
                if (currentTask.parentItem) {
                    var recordId = currentTask.parentItem.taskId;
                    var parentRecord = void 0;
                    if (this.parent.viewType === 'ProjectView') {
                        parentRecord = flatDataCollection.get(recordId);
                    }
                    else {
                        parentRecord = this.parent.getRecordByID(recordId);
                    }
                    if (parentRecord) {
                        this.traverseParents(parentRecord);
                    }
                }
            }
        }
    };
    Dependency.prototype.updateParentPredecessor = function (flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        if (this.parent.enablePredecessorValidation) {
            var parentPredecessorLength = this.parentPredecessors.length;
            for (var i = parentPredecessorLength - 1; i >= 0; i--) {
                var item = this.parentPredecessors[i];
                this.validatePredecessorDates(item, flatDataCollection);
                if (item.ganttProperties.startDate) {
                    this.updateChildItems(item);
                }
            }
        }
    };
    /**
     * To validate task date values with dependency
     *
     * @param {IGanttData} ganttRecord .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.validatePredecessorDates = function (ganttRecord, flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        if (ganttRecord.ganttProperties.predecessor) {
            var predecessorsCollection = ganttRecord.ganttProperties.predecessor;
            var count = void 0;
            var parentGanttRecord = void 0;
            var record = null;
            var currentTaskId_1 = this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId.toString()
                : ganttRecord.ganttProperties.rowUniqueID.toString();
            var predecessors = predecessorsCollection.filter(function (data) {
                if (data.to === currentTaskId_1) {
                    return data;
                }
                else {
                    return null;
                }
            });
            for (count = 0; count < predecessors.length; count++) {
                var predecessor = predecessors[count];
                if (this.parent.viewType === 'ProjectView' && !isNullOrUndefined(flatDataCollection)) {
                    parentGanttRecord = flatDataCollection.get(predecessor.from);
                    record = flatDataCollection.get(predecessor.to);
                }
                else {
                    parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from);
                    record = this.parent.connectorLineModule.getRecordByID(predecessor.to);
                }
                if (this.parent.allowParentDependency && parentGanttRecord.hasChildRecords) {
                    this.parent.dataOperation.updateParentItems(parentGanttRecord);
                }
                if (this.parent.viewType === 'ProjectView' && this.parent.allowTaskbarDragAndDrop) {
                    var index = void 0;
                    if (isNullOrUndefined(record)) {
                        index = this.parent.editModule.taskbarEditModule.previousIds.indexOf(predecessor.to);
                        record = this.parent.editModule.taskbarEditModule.previousFlatData[index];
                    }
                    else if (isNullOrUndefined(parentGanttRecord)) {
                        index = this.parent.editModule.taskbarEditModule.previousIds.indexOf(predecessor.from);
                        parentGanttRecord = this.parent.editModule.taskbarEditModule.previousFlatData[index];
                    }
                }
                if (this.parent.allowParentDependency && this.parent.isLoad && this.parentPredecessors.indexOf(ganttRecord) === -1
                    && (ganttRecord.hasChildRecords || record.hasChildRecords)) {
                    this.parentPredecessors.push(ganttRecord);
                }
                if (record.ganttProperties.isAutoSchedule || this.parent.validateManualTasksOnLinking) {
                    this.validateChildGanttRecord(parentGanttRecord, record, flatDataCollection);
                }
            }
        }
    };
    /**
     * Method to validate task with predecessor
     *
     * @param {IGanttData} parentGanttRecord .
     * @param {IGanttData} childGanttRecord .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {void} .
     */
    Dependency.prototype.validateChildGanttRecord = function (parentGanttRecord, childGanttRecord, flatDataCollection) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        if (this.parent.editedTaskBarItem === childGanttRecord || (parentGanttRecord &&
            isNullOrUndefined(isScheduledTask(parentGanttRecord.ganttProperties)))
            || (childGanttRecord && isNullOrUndefined(isScheduledTask(childGanttRecord.ganttProperties)))) {
            return;
        }
        if (this.parent.isInPredecessorValidation && (childGanttRecord.ganttProperties.isAutoSchedule ||
            this.parent.validateManualTasksOnLinking)) {
            var childRecordProperty = childGanttRecord.ganttProperties;
            var currentTaskId_2 = this.parent.viewType === 'ResourceView' ? childRecordProperty.taskId.toString()
                : childRecordProperty.rowUniqueID.toString();
            var predecessorsCollection = childRecordProperty.predecessor;
            var childPredecessor = predecessorsCollection.filter(function (data) {
                if (data.to === currentTaskId_2) {
                    return data;
                }
                else {
                    return null;
                }
            });
            var startDate = this.getPredecessorDate(childGanttRecord, childPredecessor, flatDataCollection);
            this.parent.setRecordValue('startDate', startDate, childRecordProperty, true);
            this.parent.dataOperation.updateMappingData(childGanttRecord, 'startDate');
            var segments = childGanttRecord.ganttProperties.segments;
            if (isNullOrUndefined(segments) || !isNullOrUndefined(segments) && segments.length === 0) {
                this.dateValidateModule.calculateEndDate(childGanttRecord);
            }
            this.parent.dataOperation.updateWidthLeft(childGanttRecord);
            if (!this.parent.isLoad && !this.parent.isFromOnPropertyChange && childGanttRecord.parentItem &&
                this.parent.isInPredecessorValidation &&
                this.parent.getParentTask(childGanttRecord.parentItem).ganttProperties.isAutoSchedule) {
                if (this.parentIds.indexOf(childGanttRecord.parentItem.uniqueID) === -1) {
                    this.parentIds.push(childGanttRecord.parentItem.uniqueID);
                    this.parentRecord.push(childGanttRecord.parentItem);
                }
            }
        }
    };
    /**
     *
     * @param {IGanttData} ganttRecord .
     * @param {IPredecessor[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @returns {Date} .
     * @private
     */
    Dependency.prototype.getPredecessorDate = function (ganttRecord, predecessorsCollection, flatDataCollection) {
        var _this = this;
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        var maxStartDate;
        var tempStartDate;
        var parentGanttRecord;
        var childGanttRecord;
        var validatedPredecessor = predecessorsCollection.filter(function (data) {
            var id = _this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId
                : ganttRecord.ganttProperties.rowUniqueID;
            if (data.to === id.toString()) {
                return data;
            }
            else {
                return null;
            }
        });
        if (validatedPredecessor) {
            var length_2 = validatedPredecessor.length;
            for (var i = 0; i < length_2; i++) {
                var predecessor = validatedPredecessor[i];
                if (this.parent.viewType === 'ProjectView' && !isNullOrUndefined(flatDataCollection)) {
                    parentGanttRecord = flatDataCollection.get(predecessor.from);
                    childGanttRecord = flatDataCollection.get(predecessor.to);
                }
                else {
                    parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from);
                    childGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.to);
                }
                if (this.parent.viewType === 'ProjectView' && this.parent.allowTaskbarDragAndDrop && !(isNullOrUndefined(childGanttRecord) &&
                    isNullOrUndefined(parentGanttRecord))) {
                    childGanttRecord = isNullOrUndefined(childGanttRecord) ?
                        this.getRecord(parentGanttRecord, childGanttRecord, predecessor) : childGanttRecord;
                    parentGanttRecord = isNullOrUndefined(parentGanttRecord) ?
                        this.getRecord(parentGanttRecord, childGanttRecord, predecessor) : parentGanttRecord;
                }
                if (childGanttRecord && parentGanttRecord) {
                    tempStartDate =
                        this.getValidatedStartDate(childGanttRecord.ganttProperties, parentGanttRecord.ganttProperties, predecessor);
                }
                if (maxStartDate === null || this.dateValidateModule.compareDates(tempStartDate, maxStartDate) === 1) {
                    maxStartDate = tempStartDate;
                }
            }
        }
        return maxStartDate;
    };
    /**
     * Get validated start date as per predecessor type
     *
     * @param {ITaskData} ganttProperty .
     * @param {ITaskData} parentRecordProperty .
     * @param {IPredecessor} predecessor .
     * @returns {Date} .
     */
    Dependency.prototype.getValidatedStartDate = function (ganttProperty, parentRecordProperty, predecessor) {
        var type = predecessor.type;
        var offset = predecessor.offset;
        var tempDate;
        var returnStartDate;
        switch (type) {
            case 'FS':
                tempDate = this.dateValidateModule.getValidEndDate(parentRecordProperty);
                if (!ganttProperty.isMilestone || offset !== 0) {
                    tempDate = this.dateValidateModule.checkStartDate(tempDate, ganttProperty);
                }
                if (offset !== 0) {
                    tempDate = this.updateDateByOffset(tempDate, predecessor, ganttProperty);
                }
                if (!ganttProperty.isMilestone) {
                    returnStartDate = this.dateValidateModule.checkStartDate(tempDate, ganttProperty);
                }
                else {
                    returnStartDate = tempDate;
                }
                break;
            case 'FF':
            case 'SF':
                tempDate = type === 'FF' ? this.dateValidateModule.getValidEndDate(parentRecordProperty) :
                    this.dateValidateModule.getValidStartDate(parentRecordProperty);
                if (offset !== 0) {
                    tempDate = this.updateDateByOffset(tempDate, predecessor, ganttProperty);
                }
                if (!ganttProperty.isMilestone) {
                    var date = new Date(tempDate);
                    date.setDate(date.getDate() - 1);
                    tempDate = this.dateValidateModule.checkEndDate(tempDate, ganttProperty);
                }
                if (ganttProperty.segments && ganttProperty.segments.length !== 0) {
                    var duration = this.dateValidateModule.getDuration(ganttProperty.startDate, ganttProperty.endDate, ganttProperty.durationUnit, ganttProperty.isAutoSchedule, ganttProperty.isMilestone);
                    returnStartDate = this.dateValidateModule.getStartDate(tempDate, duration, ganttProperty.durationUnit, ganttProperty);
                }
                else {
                    returnStartDate = this.dateValidateModule.getStartDate(tempDate, ganttProperty.duration, ganttProperty.durationUnit, ganttProperty);
                }
                break;
            case 'SS':
                tempDate = this.dateValidateModule.getValidStartDate(parentRecordProperty);
                if (offset !== 0) {
                    tempDate = this.updateDateByOffset(tempDate, predecessor, ganttProperty);
                }
                if (!ganttProperty.isMilestone) {
                    returnStartDate = this.dateValidateModule.checkStartDate(tempDate, ganttProperty);
                }
                else {
                    returnStartDate = tempDate;
                }
                break;
        }
        return returnStartDate;
    };
    /**
     *
     * @param {Date} date .
     * @param {IPredecessor} predecessor .
     * @param {ITaskData} record .
     * @returns {void} .
     */
    Dependency.prototype.updateDateByOffset = function (date, predecessor, record) {
        var resultDate;
        var offsetValue = predecessor.offset;
        var durationUnit = predecessor.offsetUnit;
        if (offsetValue < 0 && !isNullOrUndefined(date)) {
            resultDate = this.dateValidateModule.getStartDate(this.dateValidateModule.checkEndDate(date, record), (offsetValue * -1), durationUnit, record, true);
        }
        else {
            if (!isNullOrUndefined(date)) {
                resultDate = this.dateValidateModule.getEndDate(date, offsetValue, durationUnit, record, false);
            }
            if (!record.isMilestone) {
                resultDate = this.dateValidateModule.checkStartDate(resultDate, record);
            }
        }
        return resultDate;
    };
    /**
     *
     * @param {IGanttData} records .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.createConnectorLinesCollection = function (records) {
        var ganttRecords = records ? records : this.parent.currentViewData;
        var pdfExportModule = this.parent.pdfExportModule;
        var isPdfExport = pdfExportModule && pdfExportModule.isPdfExport;
        if (isPdfExport) {
            var exportProps = pdfExportModule.helper && pdfExportModule.helper.exportProps;
            var fitToWidthSettings = exportProps && exportProps.fitToWidthSettings;
            if (exportProps && fitToWidthSettings && fitToWidthSettings.isFitToWidth) {
                var exportType = exportProps.exportType;
                var beforeSinglePageExport = pdfExportModule.helper.beforeSinglePageExport;
                ganttRecords = (exportType === 'CurrentViewData') ?
                    beforeSinglePageExport['cloneCurrentViewData'] :
                    beforeSinglePageExport['cloneFlatData'];
            }
        }
        var recordLength = ganttRecords.length;
        var count;
        var ganttRecord;
        var predecessorsCollection;
        if (this.parent.pdfExportModule && this.parent.pdfExportModule.isPdfExport && this.parent.pdfExportModule.helper.exportProps &&
            this.parent.pdfExportModule.helper.exportProps.fitToWidthSettings &&
            this.parent.pdfExportModule.helper.exportProps.fitToWidthSettings.isFitToWidth && this.parent.pdfExportModule.isPdfExport) {
            this.parent.connectorLineModule.expandedRecords = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
                this.parent.pdfExportModule.helper.beforeSinglePageExport['cloneFlatData'] : this.parent.getExpandedRecords(this.parent.pdfExportModule.helper.beforeSinglePageExport['cloneFlatData']);
        }
        else {
            this.parent.connectorLineModule.expandedRecords = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
                this.parent.updatedRecords : this.parent.getExpandedRecords(this.parent.updatedRecords);
        }
        var flatData = this.parent.flatData;
        var flatDataCollection = isPdfExport ? null : new Map();
        if (!isPdfExport && !isNullOrUndefined(flatData)) {
            for (var _i = 0, flatData_2 = flatData; _i < flatData_2.length; _i++) {
                var record = flatData_2[_i];
                flatDataCollection.set(record.ganttProperties.rowUniqueID.toString(), record);
            }
        }
        var chartRows = this.parent.ganttChartModule.getChartRows();
        var rowHeight = !isNullOrUndefined(chartRows) && chartRows[0] && chartRows[0].offsetHeight;
        for (count = 0; count < recordLength; count++) {
            if (this.parent.editModule && this.parent.editModule.deletedTaskDetails.length > 0) {
                var parentRecord = ganttRecords[count].parentItem;
                if (parentRecord) {
                    var parentItem = !isNullOrUndefined(flatDataCollection) ?
                        flatDataCollection.get(parentRecord.taskId.toString()) : this.parent.getRecordByID(parentRecord.taskId.toString());
                    this.parent.setRecordValue('parentItem', this.parent.dataOperation.getCloneParent(parentItem), ganttRecords[count]);
                }
            }
            if (this.parent.undoRedoModule && this.parent.undoRedoModule['canUpdateIndex']) {
                ganttRecords[count].index = count;
                if (ganttRecords[count].parentItem && this.parent.getParentTask(ganttRecords[count].parentItem)) {
                    ganttRecords[count].parentItem.index = this.parent.getParentTask(ganttRecords[count].parentItem).index;
                }
            }
            ganttRecord = ganttRecords[count];
            predecessorsCollection = ganttRecord.ganttProperties.predecessor;
            if (predecessorsCollection) {
                this.addPredecessorsCollection(predecessorsCollection, flatDataCollection, rowHeight);
            }
        }
    };
    /**
     *
     * @param {object[]} predecessorsCollection .
     * @param {Map<string, IGanttData>} flatDataCollection .
     * @param {number} rowHeight .
     * @returns {void} .
     */
    Dependency.prototype.addPredecessorsCollection = function (predecessorsCollection, flatDataCollection, rowHeight) {
        if (flatDataCollection === void 0) { flatDataCollection = null; }
        if (rowHeight === void 0) { rowHeight = 0; }
        var predecessorsLength;
        var predecessorCount;
        var predecessor;
        var parentGanttRecord;
        var childGanttRecord;
        if (predecessorsCollection) {
            predecessorsLength = predecessorsCollection.length;
            for (predecessorCount = 0; predecessorCount < predecessorsLength; predecessorCount++) {
                predecessor = predecessorsCollection[predecessorCount];
                var from = 'from';
                var to = 'to';
                if (this.parent.viewType === 'ProjectView' && !isNullOrUndefined(flatDataCollection)) {
                    parentGanttRecord = flatDataCollection.get(predecessor[from]);
                    childGanttRecord = flatDataCollection.get(predecessor[to]);
                }
                else {
                    parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[from]);
                    childGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[to]);
                }
                var isValid = true;
                if (((parentGanttRecord && parentGanttRecord.hasChildRecords && !parentGanttRecord.expanded) ||
                    (childGanttRecord && childGanttRecord.hasChildRecords && !childGanttRecord.expanded)) &&
                    !this.parent.allowTaskbarOverlap && this.parent.viewType === 'ProjectView') {
                    isValid = false;
                }
                if (isValid && this.parent.connectorLineModule.expandedRecords &&
                    this.parent.connectorLineModule.expandedRecords.indexOf(parentGanttRecord) !== -1 &&
                    this.parent.connectorLineModule.expandedRecords.indexOf(childGanttRecord) !== -1) {
                    this.updateConnectorLineObject(parentGanttRecord, childGanttRecord, predecessor, rowHeight);
                }
            }
        }
    };
    /**
     * To refresh connector line object collections
     *
     * @param {IGanttData} parentGanttRecord .
     * @param {IGanttData} childGanttRecord .
     * @param {IPredecessor} predecessor .
     * @param {number} rowHeight .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.updateConnectorLineObject = function (parentGanttRecord, childGanttRecord, predecessor, rowHeight) {
        if (rowHeight === void 0) { rowHeight = 0; }
        var connectorObj = this.parent.connectorLineModule.createConnectorLineObject(parentGanttRecord, childGanttRecord, predecessor, rowHeight);
        if (connectorObj) {
            if (childGanttRecord.isCritical && parentGanttRecord.isCritical) {
                connectorObj.isCritical = true;
            }
            if ((this.parent.connectorLineIds.length > 0 && this.parent.connectorLineIds.indexOf(connectorObj.connectorLineId) === -1) ||
                this.parent.connectorLineIds.length === 0) {
                this.parent.updatedConnectorLineCollection.push(connectorObj);
                this.parent.connectorLineIds.push(connectorObj.connectorLineId);
            }
            else if (this.parent.connectorLineIds.indexOf(connectorObj.connectorLineId) !== -1) {
                var index = this.parent.connectorLineIds.indexOf(connectorObj.connectorLineId);
                this.parent.updatedConnectorLineCollection[index] = connectorObj;
            }
            predecessor.isDrawn = true;
        }
        return connectorObj;
    };
    /**
     *
     * @param {IGanttData} childGanttRecord .
     * @param {IPredecessor[]} previousValue .
     * @param {string} validationOn .
     * @returns {void} .
     * @private
     */
    Dependency.prototype.validatePredecessor = function (childGanttRecord, previousValue, validationOn) {
        if (!this.parent.isInPredecessorValidation) {
            return;
        }
        if (childGanttRecord.ganttProperties.predecessor) {
            var taskBarModule = this.parent.editModule.taskbarEditModule;
            var ganttProp = void 0;
            if (taskBarModule) {
                ganttProp = taskBarModule.taskBarEditRecord;
            }
            var predecessorsCollection = childGanttRecord.ganttProperties.predecessor;
            var parentGanttRecord = void 0;
            var record = null;
            var predecessor = void 0;
            var successor = void 0;
            var currentTaskId_3 = this.parent.viewType === 'ResourceView' ? childGanttRecord.ganttProperties.taskId.toString()
                : childGanttRecord.ganttProperties.rowUniqueID.toString();
            var predecessors = predecessorsCollection.filter(function (data) {
                if (data.to === currentTaskId_3) {
                    return data;
                }
                else {
                    return null;
                }
            });
            var successors = predecessorsCollection.filter(function (data) {
                if (data.from === currentTaskId_3) {
                    return data;
                }
                else {
                    return null;
                }
            });
            var parentRec = void 0;
            for (var count = 0; count < predecessors.length; count++) {
                predecessor = predecessors[count];
                parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor.from);
                record = this.parent.connectorLineModule.getRecordByID(predecessor.to);
                if (record.parentItem) {
                    parentRec = this.parent.getTaskByUniqueID(record.parentItem.uniqueID);
                    if (this.parent.editModule['updateParentRecords'].indexOf(parentRec) === -1) {
                        this.parent.editModule['updateParentRecords'].push(parentRec);
                    }
                }
                if (parentGanttRecord.parentItem) {
                    parentRec = this.parent.getTaskByUniqueID(parentGanttRecord.parentItem.uniqueID);
                    if (this.parent.editModule['updateParentRecords'].indexOf(parentRec) === -1) {
                        this.parent.editModule['updateParentRecords'].push(parentRec);
                    }
                }
                if (this.parent.viewType === 'ProjectView' && this.parent.allowTaskbarDragAndDrop && !(isNullOrUndefined(record) && isNullOrUndefined(parentGanttRecord))) {
                    record = isNullOrUndefined(record) ? this.getRecord(parentGanttRecord, record, predecessor) : record;
                    parentGanttRecord = isNullOrUndefined(parentGanttRecord) ?
                        this.getRecord(parentGanttRecord, record, predecessor) : parentGanttRecord;
                }
                if (this.parent.isInPredecessorValidation && record.ganttProperties.isAutoSchedule) {
                    this.parent.isValidationEnabled = true;
                }
                else {
                    this.parent.isValidationEnabled = false;
                }
                var id = this.parent.viewType === 'ResourceView' ? childGanttRecord.ganttProperties.taskId
                    : childGanttRecord.ganttProperties.rowUniqueID;
                if ((id.toString() === predecessor.to
                    || id.toString() === predecessor.from)
                    && (!validationOn || validationOn === 'predecessor')) {
                    this.validateChildGanttRecord(parentGanttRecord, record);
                    if (this.parent.editModule['editedRecord'] && this.parent.editModule['editedRecord'].hasChildRecords && !this.parent.editModule['editedRecord'].parentItem) {
                        this.isValidatedParentTaskID = record.ganttProperties.taskId;
                    }
                }
            }
            for (var count = 0; count < successors.length; count++) {
                successor = successors[count];
                parentGanttRecord = this.parent.connectorLineModule.getRecordByID(successor.from);
                record = this.parent.connectorLineModule.getRecordByID(successor.to);
                if (record.parentItem) {
                    parentRec = this.parent.getTaskByUniqueID(record.parentItem.uniqueID);
                    if (this.parent.editModule['updateParentRecords'].indexOf(parentRec) === -1) {
                        this.parent.editModule['updateParentRecords'].push(parentRec);
                    }
                }
                if (parentGanttRecord.parentItem) {
                    parentRec = this.parent.getTaskByUniqueID(parentGanttRecord.parentItem.uniqueID);
                    if (this.parent.editModule['updateParentRecords'].indexOf(parentRec) === -1) {
                        this.parent.editModule['updateParentRecords'].push(parentRec);
                    }
                }
                if (this.parent.viewType === 'ProjectView' && this.parent.allowTaskbarDragAndDrop && !(isNullOrUndefined(record) && isNullOrUndefined(parentGanttRecord))) {
                    record = isNullOrUndefined(record) ? this.getRecord(parentGanttRecord, record, successor) : record;
                    parentGanttRecord = isNullOrUndefined(parentGanttRecord) ?
                        this.getRecord(parentGanttRecord, record, successor) : parentGanttRecord;
                }
                if (this.parent.isInPredecessorValidation && record.ganttProperties.isAutoSchedule) {
                    this.parent.isValidationEnabled = true;
                }
                else {
                    this.parent.isValidationEnabled = false;
                }
                if (validationOn !== 'predecessor' && this.parent.isValidationEnabled) {
                    this.validateChildGanttRecord(parentGanttRecord, record);
                    if (this.parent.editModule['editedRecord'] && record) {
                        var rootParent = parentGanttRecord.parentItem ?
                            this.getRootParent(parentGanttRecord) : null;
                        if (record.hasChildRecords && (!this.parent.editModule['editedRecord'].hasChildRecords || (!record.parentItem &&
                            (!rootParent || (rootParent && rootParent.ganttProperties.taskId === this.parent.editModule['editedRecord'].ganttProperties.taskId)))) &&
                            this.isValidatedParentTaskID !== record.ganttProperties.taskId) {
                            this.updateChildItems(record);
                            for (var i = 0; i < record.childRecords.length; i++) {
                                var ganttProp_1 = record.childRecords[i].ganttProperties;
                                if (this.isChildRecordValidated.indexOf(ganttProp_1.taskId) !== -1) {
                                    return;
                                }
                                this.isChildRecordValidated.push(ganttProp_1.taskId);
                                if (ganttProp_1.predecessor && ganttProp_1.predecessor.length > 0) {
                                    for (var j = 0; j < ganttProp_1.predecessor.length; j++) {
                                        var childRec = void 0;
                                        if (ganttProp_1.predecessor[j].to !== record.ganttProperties.taskId.toString()) {
                                            childRec = this.parent.flatData[this.parent.ids.indexOf(ganttProp_1.predecessor[j].to)];
                                        }
                                        else {
                                            childRec = this.parent.flatData[this.parent.ids.indexOf(ganttProp_1.predecessor[j].from)];
                                        }
                                        if (childRec) {
                                            this.validatePredecessor(childRec, [], '');
                                            if (childRec.hasChildRecords && this.parent.editModule['editedRecord'].hasChildRecords) {
                                                this.updateChildItems(childRec);
                                            }
                                            this.isValidatedParentTaskID = childRec.ganttProperties.taskId;
                                        }
                                    }
                                }
                            }
                            this.isValidatedParentTaskID = record.ganttProperties.taskId;
                        }
                        if (this.parent.editModule['editedRecord'].hasChildRecords && !this.parent.editModule['editedRecord'].parentItem) {
                            this.isValidatedParentTaskID = record.ganttProperties.taskId;
                        }
                    }
                }
                else if (!record.ganttProperties.isAutoSchedule && this.parent.updateOffsetOnTaskbarEdit) {
                    this.parent.connectorLineEditModule['validatedOffsetIds'] = [];
                    this.parent.connectorLineEditModule['calculateOffset'](record);
                }
                if (parentGanttRecord.expanded === false || record.expanded === false) {
                    if (record) {
                        this.validatePredecessor(record, undefined, 'successor');
                    }
                    continue;
                }
                if (record) {
                    if (this.parent.editModule.isFirstCall) {
                        var taskIdsForView = this.parent.viewType === 'ResourceView' ? this.parent.getTaskIds() : this.parent.ids;
                        this.storeId = JSON.parse(JSON.stringify(taskIdsForView));
                        this.parent.editModule.isFirstCall = false;
                    }
                    if (this.storeId) {
                        var index = void 0;
                        var idAsString = record[this.parent.taskFields.id].toString();
                        if (this.parent.viewType === 'ResourceView') {
                            var taskId = "T" + idAsString;
                            index = this.storeId.includes(taskId) ? this.storeId.indexOf(taskId) : -1;
                        }
                        else {
                            index = this.storeId.indexOf(idAsString);
                        }
                        if (index !== -1) {
                            this.storeId = this.storeId.slice(0, index).concat(this.storeId.slice(index + 1));
                            this.validatePredecessor(record, undefined, 'successor');
                        }
                    }
                    else {
                        this.validatePredecessor(record, undefined, 'successor');
                    }
                }
            }
            if (record && !record.hasChildRecords && record.parentItem &&
                this.validatedParentIds.indexOf(record.parentItem.taskId) === -1) {
                this.validatedParentIds.push(record.parentItem.taskId);
            }
            var validUpdate = true;
            if (record && record.hasChildRecords && this.validatedParentIds.indexOf(record.ganttProperties.taskId.toString()) !== -1) {
                validUpdate = false;
            }
            if (validUpdate) {
                if (record && record.ganttProperties.taskId !== this.isValidatedParentTaskID && ganttProp) {
                    if ((taskBarModule.taskBarEditAction !== 'ParentDrag' && taskBarModule.taskBarEditAction !== 'ChildDrag')) {
                        if (!ganttProp.hasChildRecords && record.hasChildRecords) {
                            this.updateChildItems(record);
                            this.isValidatedParentTaskID = record.ganttProperties.taskId;
                        }
                    }
                    if (record.parentItem) {
                        this.parent.dataOperation.updateParentItems(record, true);
                        var parentData = this.parent.getParentTask(record.parentItem);
                        var index = (this.storeId && this.storeId.indexOf(parentData[this.parent.taskFields.id].toString()) !== -1) ?
                            this.storeId.indexOf(parentData[this.parent.taskFields.id].toString()) : -1;
                        if (parentData.ganttProperties.predecessor && parentData.ganttProperties.predecessor.length > 0 && index !== -1) {
                            for (var i = 0; i < parentData.ganttProperties.predecessor.length; i++) {
                                if (parentData.ganttProperties.predecessor[i].to !==
                                    parentData.ganttProperties.taskId.toString()) {
                                    var childRec = this.parent.flatData[this.parent.ids.indexOf(parentData.ganttProperties.predecessor[i].to)];
                                    if (childRec && childRec.parentItem) {
                                        this.validateChildGanttRecord(record, childRec);
                                    }
                                }
                            }
                        }
                    }
                }
                else if (record && record.hasChildRecords && this.isValidatedParentTaskID !== record.ganttProperties.taskId && !ganttProp) {
                    this.updateChildItems(record);
                    this.isValidatedParentTaskID = record.ganttProperties.taskId;
                }
            }
        }
    };
    /**
     *
     * @param {IGanttData} ganttRecord .
     * @returns {void} .
     */
    Dependency.prototype.updateChildItems = function (ganttRecord) {
        var _this = this;
        if (ganttRecord.childRecords.length > 0 && this.validatedChildItems && this.validatedChildItems.length > 0) {
            var isPresent = true;
            isPresent = !ganttRecord.childRecords.some(function (record) {
                return _this.validatedChildItems['includes'](record);
            });
            if (!isPresent) {
                return;
            }
        }
        var previousData = this.parent.previousRecords[ganttRecord.uniqueID];
        var previousStartDate;
        if (isNullOrUndefined(previousData) ||
            (isNullOrUndefined(previousData) && !isNullOrUndefined(previousData.ganttProperties))) {
            previousStartDate = new Date(ganttRecord.ganttProperties.startDate.getTime());
        }
        else {
            if (!isNullOrUndefined(previousData.ganttProperties.startDate)) {
                previousStartDate = new Date(previousData.ganttProperties.startDate.getTime());
            }
        }
        var currentStartDate = ganttRecord.ganttProperties.startDate;
        var childRecords = [];
        var validStartDate;
        var validEndDate;
        var calcEndDate;
        var isRightMove;
        var durationDiff;
        this.getUpdatableChildRecords(ganttRecord, childRecords);
        if (childRecords.length === 0) {
            return;
        }
        if (!isNullOrUndefined(previousStartDate) && !isNullOrUndefined(currentStartDate) &&
            previousStartDate.getTime() > currentStartDate.getTime()) {
            validStartDate = this.parent.dateValidationModule.checkStartDate(currentStartDate);
            validEndDate = this.parent.dateValidationModule.checkEndDate(previousStartDate, ganttRecord.ganttProperties);
            isRightMove = false;
        }
        else {
            validStartDate = this.parent.dateValidationModule.checkStartDate(previousStartDate);
            validEndDate = this.parent.dateValidationModule.checkEndDate(currentStartDate, ganttRecord.ganttProperties);
            isRightMove = true;
        }
        //Get Duration
        if (!isNullOrUndefined(validStartDate) && !isNullOrUndefined(validEndDate) && validStartDate.getTime() >= validEndDate.getTime()) {
            durationDiff = 0;
        }
        else {
            durationDiff = this.parent.dateValidationModule.getDuration(validStartDate, validEndDate, 'minute', true, false);
        }
        for (var i = 0; i < childRecords.length; i++) {
            if (childRecords[i].ganttProperties.isAutoSchedule) {
                if (durationDiff > 0) {
                    var startDate = isScheduledTask(childRecords[i].ganttProperties) ?
                        childRecords[i].ganttProperties.startDate : childRecords[i].ganttProperties.startDate ?
                        childRecords[i].ganttProperties.startDate : childRecords[i].ganttProperties.endDate ?
                        childRecords[i].ganttProperties.endDate : new Date(previousStartDate.toString());
                    if (isRightMove) {
                        calcEndDate = this.parent.dateValidationModule.getEndDate(this.parent.dateValidationModule.checkStartDate(startDate, childRecords[i].ganttProperties, childRecords[i].ganttProperties.isMilestone), durationDiff, 'minute', childRecords[i].ganttProperties, false);
                    }
                    else {
                        calcEndDate = this.parent.dateValidationModule.getStartDate(this.parent.dateValidationModule.checkEndDate(startDate, childRecords[i].ganttProperties), durationDiff, 'minute', childRecords[i].ganttProperties);
                    }
                    this.calculateDateByRoundOffDuration(childRecords[i], calcEndDate);
                    if (this.parent.isOnEdit && this.validatedChildItems.indexOf(childRecords[i]) === -1) {
                        this.validatedChildItems.push(childRecords[i]);
                    }
                }
                else if (isNullOrUndefined(previousData)) {
                    calcEndDate = previousStartDate;
                    if (childRecords[i].ganttProperties.startDate.getTime() <= calcEndDate.getTime()) {
                        this.calculateDateByRoundOffDuration(childRecords[i], calcEndDate);
                    }
                    if (this.parent.isOnEdit && this.validatedChildItems.indexOf(childRecords[i]) === -1) {
                        this.validatedChildItems.push(childRecords[i]);
                    }
                }
            }
        }
        if (childRecords.length) {
            this.parent.dataOperation.updateParentItems(ganttRecord, true);
        }
    };
    /**
     * To get updated child records.
     *
     * @param {IGanttData} parentRecord .
     * @param {IGanttData} childLists .
     * @returns {void} .
     */
    Dependency.prototype.getUpdatableChildRecords = function (parentRecord, childLists) {
        var childRecords = parentRecord.childRecords;
        for (var i = 0; i < childRecords.length; i++) {
            if (childRecords[i].ganttProperties.isAutoSchedule) {
                childLists.push(childRecords[i]);
                if (childRecords[i].hasChildRecords) {
                    this.getUpdatableChildRecords(childRecords[i], childLists);
                }
            }
        }
    };
    /**
     *
     * @param {IGanttData} data .
     * @param {Date} newStartDate .
     * @returns {void} .
     */
    Dependency.prototype.calculateDateByRoundOffDuration = function (data, newStartDate) {
        var ganttRecord = data;
        var taskData = ganttRecord.ganttProperties;
        var projectStartDate = new Date(newStartDate.getTime());
        if (!isNullOrUndefined(taskData.endDate) && isNullOrUndefined(taskData.startDate)) {
            var endDate = this.parent.dateValidationModule.checkStartDate(projectStartDate, taskData, null);
            this.parent.setRecordValue('endDate', this.parent.dateValidationModule.checkEndDate(endDate, ganttRecord.ganttProperties), taskData, true);
        }
        else {
            this.parent.setRecordValue('startDate', this.parent.dateValidationModule.checkStartDate(projectStartDate, taskData, false), taskData, true);
            if (!isNullOrUndefined(taskData.duration)) {
                this.parent.dateValidationModule.calculateEndDate(ganttRecord);
            }
        }
        this.parent.dataOperation.updateWidthLeft(data);
        this.parent.dataOperation.updateTaskData(ganttRecord);
    };
    Dependency.prototype.getRecord = function (parentGanttRecord, record, predecessor) {
        var index;
        var data;
        if (isNullOrUndefined(record)) {
            index = this.parent.editModule.taskbarEditModule.previousIds.indexOf(predecessor.to);
            data = this.parent.editModule.taskbarEditModule.previousFlatData[index];
        }
        else if (isNullOrUndefined(parentGanttRecord)) {
            index = this.parent.editModule.taskbarEditModule.previousIds.indexOf(predecessor.from);
            data = this.parent.editModule.taskbarEditModule.previousFlatData[index];
        }
        return data;
    };
    /**
     * Method to get validate able predecessor alone from record
     *
     * @param {IGanttData} record .
     * @returns {IPredecessor[]} .
     * @private
     */
    Dependency.prototype.getValidPredecessor = function (record) {
        var _this = this;
        var validPredecessor = [];
        if (!isNullOrUndefined(record)) {
            var recPredecessor = record.ganttProperties.predecessor;
            if (recPredecessor && recPredecessor.length > 0) {
                validPredecessor = recPredecessor.filter(function (value) {
                    var id = _this.parent.viewType === 'ResourceView' ? record.ganttProperties.taskId
                        : record.ganttProperties.rowUniqueID;
                    return value.from !== id.toString();
                });
            }
        }
        return validPredecessor;
    };
    return Dependency;
}());
export { Dependency };
