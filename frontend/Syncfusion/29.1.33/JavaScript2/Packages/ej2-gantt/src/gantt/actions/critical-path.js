import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { addClass } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
/** @hidden */
var CriticalPath = /** @class */ (function () {
    function CriticalPath(parent) {
        this.validatedids = [];
        this.resourceCollectionIds = [];
        this.criticalTasks = [];
        this.parent = parent;
    }
    CriticalPath.prototype.getCriticalTasks = function () {
        return this.criticalTasks;
    };
    CriticalPath.prototype.showCriticalPath = function (isCritical) {
        var modelIds = this.parent.ids;
        var totalRecords = this.parent.flatData;
        if (isCritical && this.parent.flatData.length > 0) {
            this.parent.enableCriticalPath = true;
            var parentRecords = this.parent.treeGrid.parentData;
            var checkEndDate = parentRecords[0].ganttProperties.endDate;
            var dateDifference = 0;
            /* eslint-disable-next-line */
            var checkBeyondEnddate_1 = [];
            var totalPredecessorsCollection = [];
            var totalPredecessorsCollectionId = [];
            var predecessorIndex = 0;
            var taskBeyondEnddate = [];
            var predecessorTaskBeyondEnddate = [];
            var collection = [];
            var collectionTaskId = [];
            var fromDataObject = [];
            var criticalPathIds = [];
            this.criticalTasks = [];
            /* eslint-disable-next-line */
            if (parentRecords[0].ganttProperties.autoEndDate > parentRecords[0].ganttProperties.endDate && !parentRecords[0].ganttProperties.isAutoSchedule) {
                checkEndDate = parentRecords[0].ganttProperties.autoEndDate;
            }
            // Find the total project endDate
            for (var i = 1; i < parentRecords.length; i++) {
                if (parentRecords[i].ganttProperties.endDate >= checkEndDate) {
                    checkEndDate = parentRecords[i].ganttProperties.endDate;
                }
                if (!parentRecords[i].ganttProperties.isAutoSchedule) {
                    if (parentRecords[i].ganttProperties.autoEndDate >= checkEndDate) {
                        checkEndDate = parentRecords[i].ganttProperties.autoEndDate;
                    }
                }
            }
            this.maxEndDate = checkEndDate;
            // find the tasks that ends on total project end date that stored in checkBeyondEnddate
            // find the tasks with predecessor that stored in totalPredecessorsCollectionId.
            for (var j = 0; j < totalRecords.length; j++) {
                totalRecords[j].isCritical = false;
                totalRecords[j].ganttProperties.isCritical = false;
                /* eslint-disable-next-line */
                dateDifference = this.parent.dataOperation.getDuration(totalRecords[j].ganttProperties.endDate, checkEndDate, totalRecords[j].ganttProperties.durationUnit, totalRecords[j].ganttProperties.isAutoSchedule, totalRecords[j].ganttProperties.isMilestone);
                totalRecords[j].slack = dateDifference + ' ' + totalRecords[j].ganttProperties.durationUnit;
                totalRecords[j].ganttProperties.slack = dateDifference + ' ' + totalRecords[j].ganttProperties.durationUnit;
                if (totalRecords[j].ganttProperties.endDate >= checkEndDate) {
                    checkBeyondEnddate_1.push(totalRecords[j].ganttProperties.taskId);
                }
                if (totalRecords[j].ganttProperties.predecessor) {
                    if (totalRecords[j].ganttProperties.predecessor.length !== 0) {
                        totalPredecessorsCollection.push(totalRecords[j]);
                        totalPredecessorsCollectionId.push((totalRecords[j].ganttProperties.taskId));
                    }
                }
            }
            if (this.parent.viewType === 'ResourceView') {
                for (var i = 0; i < this.parent.taskIds.length; i++) {
                    this.resourceCollectionIds[i] = this.parent.taskIds[i].slice(1);
                }
            }
            var _loop_1 = function (k) {
                if (totalPredecessorsCollectionId.indexOf(checkBeyondEnddate_1[k]) === -1) {
                    if (this_1.parent.viewType === 'ProjectView') {
                        predecessorIndex = modelIds.indexOf(checkBeyondEnddate_1[k].toString());
                    }
                    else {
                        var currentRecords = this_1.parent.currentViewData.filter(function (data) {
                            return parseInt(data.ganttProperties.taskId, 10) === checkBeyondEnddate_1[k];
                        });
                        for (var i = 0; i < currentRecords.length; i++) {
                            if (!currentRecords[i].hasChildRecords &&
                                currentRecords[i].ganttProperties.endDate >= this_1.maxEndDate) {
                                predecessorIndex = currentRecords[i].index;
                            }
                        }
                    }
                    if (totalRecords[predecessorIndex].ganttProperties.progress < 100) {
                        totalRecords[predecessorIndex].isCritical = true;
                        totalRecords[predecessorIndex].ganttProperties.isCritical = true;
                    }
                    totalRecords[predecessorIndex]['slack'] = 0 + ' ' + totalRecords[predecessorIndex].ganttProperties.durationUnit;
                    taskBeyondEnddate.push(checkBeyondEnddate_1[k]);
                }
                else {
                    predecessorTaskBeyondEnddate.push(checkBeyondEnddate_1[k]);
                }
            };
            var this_1 = this;
            // seperate the predecessor connected taskes from the individual taskes that ends on total project end date
            for (var k = 0; k < checkBeyondEnddate_1.length; k++) {
                _loop_1(k);
            }
            var predecessorLength = totalPredecessorsCollection.length;
            var endTask = [];
            // find the detail collection of predecessor for each taskes that stored in collection.
            for (var x = 0; x < predecessorLength; x++) {
                var to = -1;
                var from = -1;
                var toPredecessor = -1;
                var fromPredecessor = -1;
                var tempTaskId = void 0;
                var currentIndex = x;
                var predecessor = totalPredecessorsCollection[x].ganttProperties.predecessor;
                var individualPredecessorLength = totalPredecessorsCollection[x].ganttProperties.predecessor.length;
                /* eslint-disable-next-line */
                var taskid = ((totalPredecessorsCollection[x].ganttProperties.taskId));
                for (var y = 0; y < individualPredecessorLength; y++) {
                    if (!isNaN(Number(predecessor[y].from)) && typeof (taskid) !== 'string') {
                        tempTaskId = parseInt((predecessor[y].from), 10);
                    }
                    else if (!isNaN(Number(predecessor[y].from)) && typeof (taskid) === 'string') {
                        tempTaskId = predecessor[y].from;
                    }
                    else {
                        tempTaskId = predecessor[y].from;
                    }
                    if (tempTaskId === taskid) {
                        if (to === -1) {
                            if (!predecessor[y].offset) {
                                to = predecessor[y].to;
                                toPredecessor = predecessor[y].type;
                            }
                            else {
                                to = predecessor[y].to + ':' + predecessor[y].offset + predecessor[y].offsetUnit;
                                toPredecessor = predecessor[y].type;
                            }
                        }
                        else {
                            if (!predecessor[y].offset) {
                                to = to + ',' + predecessor[y].to;
                                toPredecessor = toPredecessor + ',' + predecessor[y].type;
                            }
                            else {
                                to = to + ',' + predecessor[y].to + ':' + predecessor[y].offset +
                                    predecessor[y].offsetUnit;
                                toPredecessor = toPredecessor + ',' + predecessor[y].type;
                            }
                        }
                    }
                    if (!isNaN(Number(predecessor[y].to)) && typeof (taskid) !== 'string') {
                        tempTaskId = parseInt((predecessor[y].to), 10);
                    }
                    else if (!isNaN(Number(predecessor[y].to)) && typeof (taskid) === 'string') {
                        tempTaskId = predecessor[y].to;
                    }
                    else {
                        tempTaskId = predecessor[y].to;
                    }
                    if (tempTaskId === taskid) {
                        if (from === -1) {
                            if (!predecessor[y].offset) {
                                from = predecessor[y].from;
                                fromPredecessor = predecessor[y].type;
                            }
                            else {
                                from = predecessor[y].from + ':' + predecessor[y].offset +
                                    predecessor[y].offsetUnit;
                                fromPredecessor = predecessor[y].type;
                            }
                        }
                        else {
                            if (!predecessor[y].offset) {
                                from = from + ',' + predecessor[y].from;
                                fromPredecessor = fromPredecessor + ',' + predecessor[y].type;
                            }
                            else {
                                from = from + ',' + predecessor[y].from + ':' + predecessor[y].offset +
                                    predecessor[y].offsetUnit;
                                fromPredecessor = fromPredecessor + ',' + predecessor[y].type;
                            }
                        }
                    }
                }
                if (from === -1) {
                    from = null;
                    fromPredecessor = null;
                }
                if (to === -1) {
                    to = null;
                    toPredecessor = null;
                }
                /* eslint-disable-next-line */
                collection.push({ from: from, fromPredecessor: fromPredecessor, taskid: taskid, to: to, toPredecessor: toPredecessor, currentIndex: currentIndex, slack: null, enddate: null });
                collectionTaskId.push(taskid);
            }
            var collectionLength = collection.length;
            var indexEnddate = 0;
            var num = void 0;
            // find the predecessors connected taskes that does not contains any successor.
            for (var z = 0; z < collectionLength; z++) {
                if (!collection[z]['to']) {
                    num = collection[z]['taskid'];
                    if (this.parent.viewType === 'ProjectView') {
                        indexEnddate = modelIds.indexOf(num.toString());
                    }
                    else {
                        indexEnddate = this.resourceCollectionIds.indexOf(num.toString());
                    }
                    var flatData = totalRecords[indexEnddate].ganttProperties;
                    dateDifference = this.parent.dataOperation.getDuration(flatData.endDate, checkEndDate, 'minute', flatData.isAutoSchedule, flatData.isMilestone);
                    collection[z]['slack'] = dateDifference;
                    collection[z]['fs'] = -1;
                    collection[z]['enddate'] = flatData.endDate;
                    endTask.push({
                        fromdata: collection[z]['from'], todateID: collection[z]['taskid'],
                        fromDataPredecessor: collection[z]['fromPredecessor']
                    });
                }
            }
            for (var k = 0; k < endTask.length; k++) {
                fromDataObject.push(endTask[k]);
                this.slackCalculation(fromDataObject, collection, collectionTaskId, checkEndDate, totalRecords, modelIds);
            }
            criticalPathIds = this.finalCriticalPath(collection, taskBeyondEnddate, totalRecords, modelIds, checkEndDate);
            this.validatedids = [];
            this.criticalPathCollection = criticalPathIds;
            this.detailPredecessorCollection = collection;
            this.predecessorCollectionTaskIds = collectionTaskId;
        }
        if (isCritical === false && this.parent.flatData.length > 0) {
            var pathIndex = void 0;
            this.parent.enableCriticalPath = false;
            for (var z = 0; z < this.criticalPathCollection.length; z++) {
                pathIndex = modelIds.indexOf(this.criticalPathCollection[z].toString());
                totalRecords[pathIndex].isCritical = false;
            }
            this.criticalPathCollection = [];
            this.detailPredecessorCollection = [];
            this.predecessorCollectionTaskIds = [];
        }
    };
    /* eslint-disable-next-line */
    CriticalPath.prototype.slackCalculation = function (fromDataObject, collection, collectionTaskId, checkEndDate, flatRecords, modelRecordIds) {
        var fromDateArray = fromDataObject[0]['fromdata'].split(',');
        var fromDataPredecessor = fromDataObject[0]['fromDataPredecessor'].split(',');
        collectionTaskId = collectionTaskId.toString();
        collectionTaskId = collectionTaskId.split(',');
        var fromDateArray1 = [];
        var fromTaskIdIndex;
        var indexFromTaskId;
        var indexToTaskId;
        var totaskId;
        var dateDifference;
        var prevTaskEnddate;
        var offsetInMillSec;
        var ffslack;
        for (var i = 0; i < fromDateArray.length; i++) {
            fromDateArray1 = fromDateArray[i].split(':');
            fromTaskIdIndex = collectionTaskId.indexOf((fromDateArray1[0].toString()));
            totaskId = collectionTaskId.indexOf((fromDataObject[0]['todateID'].toString()));
            if (this.parent.viewType === 'ProjectView') {
                indexFromTaskId = modelRecordIds.indexOf(fromDateArray1[0].toString());
                indexToTaskId = modelRecordIds.indexOf(fromDataObject[0]['todateID'].toString());
            }
            else {
                indexFromTaskId = this.resourceCollectionIds.indexOf(fromDateArray1[0].toString());
                indexToTaskId = this.resourceCollectionIds.indexOf(fromDataObject[0]['todateID'].toString());
            }
            var fromIdFlatData = void 0;
            if (indexFromTaskId !== -1) {
                fromIdFlatData = flatRecords[indexFromTaskId].ganttProperties;
            }
            var toIdFlatData = flatRecords[indexToTaskId].ganttProperties;
            if (fromDateArray1.length > 1) {
                if (fromDateArray1[1].indexOf('hour') !== -1) {
                    offsetInMillSec = parseFloat(fromDateArray1[1]) * 60;
                }
                else if (fromDateArray1[1].indexOf('day') !== -1) {
                    offsetInMillSec = parseFloat(fromDateArray1[1]) * (this.parent.secondsPerDay / 3600) * 60;
                }
                else {
                    offsetInMillSec = parseFloat(fromDateArray1[1]);
                }
            }
            if (fromIdFlatData && fromTaskIdIndex !== -1) {
                // calculate slack value for the task contains predecessor connection in "finish to start".
                if (fromDataPredecessor[i] === 'FS') {
                    if (fromIdFlatData.endDate > toIdFlatData.startDate) {
                        dateDifference = -(this.parent.dataOperation.getDuration(toIdFlatData.startDate, fromIdFlatData.endDate, 'minute', fromIdFlatData.isAutoSchedule, fromIdFlatData.isMilestone));
                    }
                    else {
                        dateDifference = this.parent.dataOperation.getDuration(fromIdFlatData.endDate, toIdFlatData.startDate, 'minute', fromIdFlatData.isAutoSchedule, fromIdFlatData.isMilestone);
                    }
                    // execute if the slack value is not set initially.
                    if (isNullOrUndefined(collection[fromTaskIdIndex]['slack'])) {
                        // execute if the offset value is not given.
                        if (fromDateArray1.length <= 1) {
                            if (collection[totaskId]['slack'] + dateDifference <= 0) {
                                collection[fromTaskIdIndex]['slack'] = 0;
                            }
                            else {
                                collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] + dateDifference;
                            }
                        }
                    }
                    // execute if the current calculated slack value is less than the previous slack value.
                    else if (collection[fromTaskIdIndex]['slack'] > dateDifference &&
                        collection[fromTaskIdIndex]['slack'] !== 0) {
                        // execute if the offset value is not given.
                        if (fromDateArray1.length <= 1) {
                            if (collection[totaskId]['slack'] + dateDifference <= 0) {
                                collection[fromTaskIdIndex]['slack'] = 0;
                            }
                            else {
                                collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] + dateDifference;
                            }
                        }
                    }
                    // execute if the offset value is given.
                    if (fromDateArray1.length > 1) {
                        collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] + dateDifference;
                        collection[fromTaskIdIndex]['slack'] = collection[fromTaskIdIndex]['slack'] - (offsetInMillSec);
                        if (collection[fromTaskIdIndex]['slack'] <= 0) {
                            collection[fromTaskIdIndex]['slack'] = 0;
                        }
                    }
                    collection[fromTaskIdIndex]['fs'] = 1;
                    collection[fromTaskIdIndex]['fsslack'] = collection[fromTaskIdIndex]['slack'];
                    collection[fromTaskIdIndex]['enddate'] = fromIdFlatData.startDate;
                    if (fromIdFlatData.endDate >= checkEndDate) {
                        collection[fromTaskIdIndex]['slack'] = 0;
                    }
                }
                //  calculate slack value for the task contains predecessor connection in "start to start".
                if (fromDataPredecessor[i] === 'SS') {
                    // It execute if the task is in auto mode.
                    if (fromIdFlatData.isAutoSchedule) {
                        if (fromIdFlatData.startDate > toIdFlatData.startDate) {
                            dateDifference = -(this.parent.dataOperation.getDuration(toIdFlatData.endDate, fromIdFlatData.startDate, 'minute', fromIdFlatData.isAutoSchedule, fromIdFlatData.isMilestone));
                        }
                        else {
                            dateDifference = this.parent.dataOperation.getDuration(fromIdFlatData.startDate, toIdFlatData.startDate, 'minute', fromIdFlatData.isAutoSchedule, fromIdFlatData.isMilestone);
                        }
                        // It execute while the slack value is not set to the corresponding task.
                        if (isNullOrUndefined(collection[fromTaskIdIndex]['slack'])) {
                            if (fromDateArray1.length <= 1) {
                                if (collection[totaskId]['slack'] + dateDifference <= 0) {
                                    collection[fromTaskIdIndex]['slack'] = 0;
                                }
                                else {
                                    collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] + dateDifference;
                                }
                            }
                        }
                        //It execute while already the slack value is set and it is higher than the datedifference.
                        else if (collection[fromTaskIdIndex]['slack'] > dateDifference &&
                            collection[fromTaskIdIndex]['slack'] !== 0) {
                            if (fromDateArray1.length <= 1) {
                                if (collection[totaskId]['slack'] + dateDifference <= 0) {
                                    collection[fromTaskIdIndex]['slack'] = 0;
                                }
                                else {
                                    collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] + dateDifference;
                                }
                            }
                        }
                        // execute if the offset value is given.
                        if (fromDateArray1.length > 1) {
                            collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] + dateDifference;
                            collection[fromTaskIdIndex]['slack'] = collection[fromTaskIdIndex]['slack'] - (offsetInMillSec);
                            if (collection[fromTaskIdIndex]['slack'] <= 0) {
                                collection[fromTaskIdIndex]['slack'] = 0;
                            }
                        }
                        collection[fromTaskIdIndex]['fs'] = 1;
                        collection[fromTaskIdIndex]['fsslack'] = collection[fromTaskIdIndex]['slack'];
                        collection[fromTaskIdIndex]['enddate'] = fromIdFlatData.startDate;
                    }
                    // It execute if the task is in not an auto mode task.
                    else if (!fromIdFlatData.isAutoSchedule) {
                        dateDifference = this.getSlackDuration(fromIdFlatData.endDate, checkEndDate, 'minute', flatRecords[indexFromTaskId]);
                        if (isNullOrUndefined(collection[fromTaskIdIndex]['slack'])) {
                            collection[fromTaskIdIndex]['slack'] = dateDifference;
                        }
                        else if (collection[fromTaskIdIndex]['slack'] > dateDifference &&
                            collection[fromTaskIdIndex]['slack'] !== 0) {
                            collection[fromTaskIdIndex]['slack'] = dateDifference;
                        }
                    }
                    if (fromIdFlatData.endDate >= checkEndDate && fromIdFlatData.endDate <= checkEndDate) {
                        collection[fromTaskIdIndex]['slack'] = 0;
                    }
                }
                //  calculate slack value for the task contains predecessor connection in "finish to finish".
                if (fromDataPredecessor[i] === 'FF') {
                    // execute if the previous task is from finish to start or finish to finish state.
                    if (collection[totaskId]['fs'] === 1 || collection[totaskId]['ff'] === 1 ||
                        collection[totaskId]['fs'] === -1) {
                        if (collection[totaskId]['fs'] === 1 || collection[totaskId]['ff'] === 1) {
                            prevTaskEnddate = toIdFlatData.endDate;
                            ffslack = collection[totaskId]['slack'];
                        }
                        if (collection[totaskId]['fs'] === -1) {
                            prevTaskEnddate = collection[totaskId]['enddate'];
                            ffslack = collection[totaskId]['slack'];
                        }
                        if (prevTaskEnddate > fromIdFlatData.endDate) {
                            dateDifference = -(this.getSlackDuration(fromIdFlatData.endDate, prevTaskEnddate, 'minute', flatRecords[indexFromTaskId]));
                        }
                        else {
                            dateDifference = this.getSlackDuration(prevTaskEnddate, fromIdFlatData.endDate, 'minute', flatRecords[indexFromTaskId]);
                        }
                        // set the slack value if the slack value is not set initially.
                        if (isNullOrUndefined(collection[fromTaskIdIndex]['slack'])) {
                            // execute if the offset value is not given.
                            if (fromDateArray1.length <= 1) {
                                if (ffslack - dateDifference < 0) {
                                    collection[fromTaskIdIndex]['slack'] = 0;
                                }
                                else {
                                    collection[fromTaskIdIndex]['slack'] = ffslack - dateDifference;
                                }
                            }
                        }
                        // overright the slack value if the current calculated slack value is less than the previous slack value.
                        else if (collection[fromTaskIdIndex]['slack'] > dateDifference && collection[fromTaskIdIndex]['slack'] !== 0) {
                            // execute if the offset value is not given.
                            if (fromDateArray1.length <= 1) {
                                if (ffslack - dateDifference < 0) {
                                    collection[fromTaskIdIndex]['slack'] = 0;
                                }
                                else {
                                    collection[fromTaskIdIndex]['slack'] = ffslack - dateDifference;
                                }
                            }
                        }
                        // execute if the offset value is given.
                        if (fromDateArray1.length > 1) {
                            collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] - dateDifference;
                            collection[fromTaskIdIndex]['slack'] = collection[fromTaskIdIndex]['slack'] - (offsetInMillSec);
                            if (collection[fromTaskIdIndex]['slack'] <= 0) {
                                collection[fromTaskIdIndex]['slack'] = 0;
                            }
                        }
                        collection[fromTaskIdIndex]['ff'] = 1;
                        collection[fromTaskIdIndex]['enddate'] = prevTaskEnddate;
                        collection[fromTaskIdIndex]['fsslack'] = ffslack;
                    }
                    if (fromIdFlatData.endDate >= checkEndDate && fromIdFlatData.endDate <= checkEndDate) {
                        collection[fromTaskIdIndex]['slack'] = 0;
                    }
                }
                //  calculate slack value for the task contains predecessor connection in "start to finish".
                if (fromDataPredecessor[i] === 'SF') {
                    //It execute if the task is an auto mode task.
                    if (fromIdFlatData.isAutoSchedule) {
                        //execute if the slack value is not set initially.
                        if (isNullOrUndefined(collection[fromTaskIdIndex]['slack'])) {
                            // execute if the offset value is not given.
                            if (fromDateArray1.length <= 1) {
                                // execute if the previous task does no has sucessor.
                                if (isNullOrUndefined(collection[totaskId]['to'])) {
                                    dateDifference = this.getSlackDuration(fromIdFlatData.endDate, checkEndDate, 'minute', flatRecords[indexFromTaskId]);
                                    collection[fromTaskIdIndex]['slack'] = dateDifference;
                                }
                                // execute if the previous task has sucessor.
                                else if (!isNullOrUndefined(collection[totaskId]['to'])) {
                                    if (toIdFlatData.endDate > fromIdFlatData.startDate) {
                                        dateDifference = -(this.parent.dataOperation.getDuration(fromIdFlatData.startDate, toIdFlatData.endDate, 'minute', fromIdFlatData.isAutoSchedule, fromIdFlatData.isMilestone));
                                    }
                                    else {
                                        dateDifference = this.getSlackDuration(toIdFlatData.endDate, fromIdFlatData.startDate, 'minute', flatRecords[indexFromTaskId]);
                                    }
                                    if (collection[totaskId]['slack'] + dateDifference <= 0) {
                                        collection[fromTaskIdIndex]['slack'] = 0;
                                    }
                                    else {
                                        collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] + dateDifference;
                                    }
                                }
                            }
                            // execute if the offset value is given.
                            else if (fromDateArray1.length > 1) {
                                if (toIdFlatData.endDate >= fromIdFlatData.endDate) {
                                    if (fromIdFlatData.startDate > toIdFlatData.endDate) {
                                        dateDifference = -(this.getSlackDuration(toIdFlatData.endDate, fromIdFlatData.startDate, 'minute', flatRecords[indexFromTaskId]));
                                    }
                                    else {
                                        dateDifference = this.parent.dataOperation.getDuration(fromIdFlatData.startDate, toIdFlatData.endDate, 'minute', fromIdFlatData.isAutoSchedule, fromIdFlatData.isMilestone);
                                    }
                                }
                                else {
                                    dateDifference = this.getSlackDuration(fromIdFlatData.endDate, checkEndDate, 'minute', flatRecords[indexFromTaskId]);
                                }
                                collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] + dateDifference;
                                collection[fromTaskIdIndex]['slack'] = collection[fromTaskIdIndex]['slack'] - (offsetInMillSec);
                                if (collection[fromTaskIdIndex]['slack'] <= 0) {
                                    collection[fromTaskIdIndex]['slack'] = 0;
                                }
                            }
                            collection[fromTaskIdIndex]['fs'] = 1;
                            collection[fromTaskIdIndex]['fsslack'] = collection[fromTaskIdIndex]['slack'];
                            collection[fromTaskIdIndex]['enddate'] = fromIdFlatData.startDate;
                        }
                        else {
                            if (fromDateArray1.length <= 1) {
                                if (isNullOrUndefined(collection[totaskId]['to'])) {
                                    dateDifference = this.getSlackDuration(fromIdFlatData.endDate, checkEndDate, 'minute', flatRecords[indexFromTaskId]);
                                }
                                else if (!isNullOrUndefined(collection[totaskId]['to'])) {
                                    if (toIdFlatData.endDate > fromIdFlatData.startDate) {
                                        dateDifference = -(this.parent.dataOperation.getDuration(fromIdFlatData.startDate, toIdFlatData.endDate, 'minute', fromIdFlatData.isAutoSchedule, fromIdFlatData.isMilestone));
                                    }
                                    else {
                                        dateDifference = this.getSlackDuration(toIdFlatData.endDate, fromIdFlatData.startDate, 'minute', flatRecords[indexFromTaskId]);
                                    }
                                }
                                // execute if the current calculated slack value is less than the previous slack value.
                                if (collection[fromTaskIdIndex]['slack'] > dateDifference && collection[fromTaskIdIndex]['slack'] !== 0) {
                                    if (isNullOrUndefined(collection[totaskId]['to'])) {
                                        collection[fromTaskIdIndex]['slack'] = dateDifference;
                                    }
                                    else if (!isNullOrUndefined(collection[totaskId]['to'])) {
                                        if (collection[totaskId]['slack'] + dateDifference <= 0) {
                                            collection[fromTaskIdIndex]['slack'] = 0;
                                        }
                                        else {
                                            collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] + dateDifference;
                                        }
                                    }
                                }
                            }
                            else if (fromDateArray1.length > 1) {
                                if (toIdFlatData.endDate > fromIdFlatData.endDate) {
                                    if (fromIdFlatData.startDate > toIdFlatData.endDate) {
                                        dateDifference = -(this.getSlackDuration(toIdFlatData.endDate, fromIdFlatData.startDate, 'minute', flatRecords[indexFromTaskId]));
                                    }
                                    else {
                                        dateDifference = this.parent.dataOperation.getDuration(fromIdFlatData.startDate, toIdFlatData.endDate, 'minute', fromIdFlatData.isAutoSchedule, fromIdFlatData.isMilestone);
                                    }
                                }
                                else {
                                    dateDifference = this.getSlackDuration(fromIdFlatData.endDate, checkEndDate, 'minute', flatRecords[indexFromTaskId]);
                                }
                                // execute if the current calculated slack value is less than the previous slack value.
                                if (collection[fromTaskIdIndex]['slack'] > dateDifference && collection[fromTaskIdIndex]['slack'] !== 0) {
                                    collection[fromTaskIdIndex]['slack'] = collection[totaskId]['slack'] + dateDifference;
                                    collection[fromTaskIdIndex]['slack'] = collection[fromTaskIdIndex]['slack'] - (offsetInMillSec);
                                    if (collection[fromTaskIdIndex]['slack'] <= 0) {
                                        collection[fromTaskIdIndex]['slack'] = 0;
                                    }
                                }
                            }
                            collection[fromTaskIdIndex]['fs'] = 1;
                            collection[fromTaskIdIndex]['fsslack'] = collection[fromTaskIdIndex]['slack'];
                            collection[fromTaskIdIndex]['enddate'] = fromIdFlatData.startDate;
                        }
                    }
                    //It execute if the task is an auto mode task.
                    else if (!fromIdFlatData.isAutoSchedule) {
                        dateDifference = this.getSlackDuration(fromIdFlatData.endDate, checkEndDate, 'minute', flatRecords[indexFromTaskId]);
                        if (isNullOrUndefined(collection[fromTaskIdIndex]['slack'])) {
                            collection[fromTaskIdIndex]['slack'] = dateDifference;
                        }
                        else if (collection[fromTaskIdIndex]['slack'] > dateDifference && collection[fromTaskIdIndex]['slack'] !== 0) {
                            collection[fromTaskIdIndex]['slack'] = dateDifference;
                        }
                    }
                    if (fromIdFlatData.endDate >= checkEndDate && fromIdFlatData.endDate <= checkEndDate) {
                        collection[fromTaskIdIndex]['slack'] = 0;
                    }
                }
                if (collection[fromTaskIdIndex]['from']) {
                    var data = [];
                    data.push({
                        fromdata: collection[fromTaskIdIndex]['from'], todateID: collection[fromTaskIdIndex]['taskid'],
                        fromDataPredecessor: collection[fromTaskIdIndex]['fromPredecessor']
                    });
                    this.slackCalculation(data, collection, collectionTaskId, checkEndDate, flatRecords, modelRecordIds);
                }
            }
        }
    };
    CriticalPath.prototype.getSlackDuration = function (sDate, eDate, durationUnit, record) {
        var startDate = this.parent.dateValidationModule.checkStartDate(new Date(sDate));
        var endDate = this.parent.dateValidationModule.checkEndDate(new Date(eDate));
        if (this.parent.dataOperation['getTimeDifference'](startDate, endDate, true) <= 0) {
            return 0;
        }
        else {
            return this.parent.dataOperation.getDuration(startDate, endDate, durationUnit, record.ganttProperties.isAutoSchedule, true);
        }
    };
    /* eslint-disable-next-line */
    CriticalPath.prototype.updateCriticalTasks = function (record, criticalPathIds) {
        for (var i = 0; i < record.ganttProperties.predecessor.length; i++) {
            var fromRecord = void 0;
            if (this.parent.viewType === 'ProjectView') {
                fromRecord = this.parent.getRecordByID(record.ganttProperties.predecessor[i].from);
            }
            else {
                var resourceIndex = this.resourceCollectionIds.indexOf(record.ganttProperties.predecessor[i].from.toString());
                fromRecord = this.parent.flatData[resourceIndex];
            }
            var durationDiff = void 0;
            if (record.ganttProperties.endDate && record.ganttProperties.endDate.getTime() >= this.maxEndDate.getTime()) {
                record.ganttProperties.slack = record.slack = 0 + ' ' + record.ganttProperties.durationUnit;
                if (record.ganttProperties.progress < 100) {
                    record.isCritical = true;
                    record.ganttProperties.isCritical = true;
                    if (criticalPathIds.indexOf(record.ganttProperties.taskId) === -1) {
                        criticalPathIds.push(record.ganttProperties.taskId);
                    }
                }
            }
            if (fromRecord) {
                if (record.ganttProperties.predecessor[i].type === 'FS') {
                    durationDiff = this.parent.dataOperation.getDuration(fromRecord.ganttProperties.endDate, record.ganttProperties.startDate, fromRecord.ganttProperties.durationUnit, fromRecord.ganttProperties.isAutoSchedule, true);
                }
                else if (record.ganttProperties.predecessor[i].type === 'SS') {
                    durationDiff = this.parent.dataOperation.getDuration(fromRecord.ganttProperties.startDate, record.ganttProperties.startDate, fromRecord.ganttProperties.durationUnit, fromRecord.ganttProperties.isAutoSchedule, true);
                }
                else if (record.ganttProperties.predecessor[i].type === 'FF') {
                    durationDiff = this.parent.dataOperation.getDuration(fromRecord.ganttProperties.endDate, record.ganttProperties.endDate, fromRecord.ganttProperties.durationUnit, fromRecord.ganttProperties.isAutoSchedule, true);
                }
                else if (record.ganttProperties.predecessor[i].type === 'SF') {
                    durationDiff = this.parent.dataOperation.getDuration(record.ganttProperties.endDate, fromRecord.ganttProperties.startDate, fromRecord.ganttProperties.durationUnit, fromRecord.ganttProperties.isAutoSchedule, true);
                }
                if (durationDiff >= 0 && this.validatedids.indexOf(parseInt(fromRecord.ganttProperties.taskId, 10)) === -1 &&
                    fromRecord.ganttProperties.taskId !== record.ganttProperties.taskId) {
                    fromRecord.ganttProperties.slack = record.ganttProperties.slack;
                    fromRecord.slack = record.slack;
                    fromRecord.isCritical = record.ganttProperties.isCritical;
                    fromRecord.ganttProperties.isCritical = record.ganttProperties.isCritical;
                    if (criticalPathIds.indexOf(fromRecord.ganttProperties.taskId) === -1 && fromRecord.ganttProperties.isCritical &&
                        fromRecord.ganttProperties.progress < 100) {
                        criticalPathIds.push(fromRecord.ganttProperties.taskId);
                        this.validatedids.push(parseInt(fromRecord.ganttProperties.taskId, 10));
                        if (this.criticalTasks.indexOf(fromRecord) === -1) {
                            this.criticalTasks.push(fromRecord);
                        }
                    }
                    if (fromRecord.ganttProperties.predecessorsName) {
                        this.updateCriticalTasks(fromRecord, criticalPathIds);
                    }
                }
            }
        }
    };
    /* eslint-disable-next-line */
    CriticalPath.prototype.finalCriticalPath = function (collection, taskBeyondEnddate, flatRecords, modelRecordIds, checkEndDate) {
        /* eslint-disable-next-line */
        var criticalPathIds = [];
        var index;
        var predecessorFrom;
        for (var x = collection.length - 1; x >= 0; x--) {
            if (this.parent.viewType === 'ProjectView') {
                index = modelRecordIds.indexOf(collection[x]['taskid'].toString());
            }
            else {
                index = this.resourceCollectionIds.indexOf(collection[x]['taskid'].toString());
            }
            var predecessorLength = flatRecords[index].ganttProperties.predecessor;
            var noSlackValue = 0 + ' ' + flatRecords[index].ganttProperties.durationUnit;
            if (predecessorLength && predecessorLength.length > 0) {
                for (var i = predecessorLength.length - 1; i >= 0; i--) {
                    var toID = void 0;
                    if (this.parent.viewType === 'ProjectView') {
                        toID = this.parent.ids.indexOf(predecessorLength[i].to);
                    }
                    else {
                        toID = this.resourceCollectionIds.indexOf(predecessorLength[i].to);
                    }
                    var dateDifference = void 0;
                    var currentData = flatRecords[index].ganttProperties;
                    if (toID !== -1) {
                        if (predecessorLength[i].type === 'FS') {
                            if (predecessorLength[i].to !== currentData.taskId.toString()) {
                                if (predecessorLength[i].to !== currentData.taskId.toString() || this.parent.viewType === 'ResourceView') {
                                    /* eslint-disable-next-line */
                                    dateDifference = this.parent.dataOperation.getDuration(currentData.endDate, flatRecords[toID].ganttProperties.startDate, currentData.durationUnit, currentData.isAutoSchedule, currentData.isMilestone);
                                }
                                else {
                                    toID = this.parent.ids.indexOf(predecessorLength[i].from);
                                    if (toID !== -1) {
                                        dateDifference = this.parent.dataOperation.getDuration(flatRecords[toID].ganttProperties.endDate, currentData.startDate, currentData.durationUnit, currentData.isAutoSchedule, currentData.isMilestone);
                                        if (dateDifference === 0 && index !== toID && flatRecords[index].slack === noSlackValue) {
                                            flatRecords[toID].slack = flatRecords[index].slack;
                                            flatRecords[toID].ganttProperties.slack = flatRecords[index].slack;
                                        }
                                    }
                                }
                                if (toID !== -1) {
                                    if (dateDifference === 0 && index !== toID && flatRecords[index].slack !== noSlackValue) {
                                        flatRecords[index].slack = flatRecords[toID].slack;
                                        flatRecords[index].ganttProperties.slack = flatRecords[toID].slack;
                                    }
                                    else if (dateDifference !== 0 && index !== toID && flatRecords[toID].isCritical) {
                                        flatRecords[index].slack = dateDifference + ' ' + flatRecords[index].ganttProperties.durationUnit;
                                        flatRecords[index].ganttProperties.slack = dateDifference + ' ' + flatRecords[index].ganttProperties.durationUnit;
                                    }
                                }
                            }
                        }
                        else if (predecessorLength[i].type === 'SF') {
                            /* eslint-disable-next-line */
                            dateDifference = this.parent.dataOperation.getDuration(currentData.startDate, flatRecords[toID].ganttProperties.endDate, currentData.durationUnit, currentData.isAutoSchedule, currentData.isMilestone);
                        }
                        else if (predecessorLength[i].type === 'SS') {
                            /* eslint-disable-next-line */
                            dateDifference = this.parent.dataOperation.getDuration(currentData.startDate, flatRecords[toID].ganttProperties.startDate, currentData.durationUnit, currentData.isAutoSchedule, currentData.isMilestone);
                        }
                        else {
                            /* eslint-disable-next-line */
                            dateDifference = this.parent.dataOperation.getDuration(currentData.endDate, flatRecords[toID].ganttProperties.endDate, currentData.durationUnit, currentData.isAutoSchedule, currentData.isMilestone);
                        }
                        if (typeof (flatRecords[index][this.parent.taskFields.id]) === 'number') {
                            predecessorFrom = parseInt(predecessorLength[i].from, 10);
                        }
                        else {
                            predecessorFrom = predecessorLength[i].from;
                        }
                        if (predecessorFrom === flatRecords[index][this.parent.taskFields.id] &&
                            flatRecords[toID].slack === noSlackValue && dateDifference <= 0) {
                            flatRecords[index].slack = noSlackValue;
                            flatRecords[index].ganttProperties.slack = noSlackValue;
                        }
                    }
                }
            }
            if (flatRecords[index].slack === noSlackValue) {
                if (flatRecords[index].ganttProperties.progress < 100) {
                    flatRecords[index].isCritical = true;
                    flatRecords[index].ganttProperties.isCritical = true;
                    if (this.criticalTasks.indexOf(flatRecords[index]) === -1) {
                        this.criticalTasks.push(flatRecords[index]);
                    }
                    if (criticalPathIds.indexOf(collection[x]['taskid']) === -1) {
                        criticalPathIds.push(collection[x]['taskid']);
                    }
                }
            }
            if (flatRecords[index].ganttProperties.predecessor &&
                flatRecords[index].ganttProperties.predecessor.length > 0) {
                this.updateCriticalTasks(flatRecords[index], criticalPathIds);
            }
        }
        if (taskBeyondEnddate.length > 0) {
            for (var i = 0; i < taskBeyondEnddate.length; i++) {
                if (this.parent.viewType === 'ProjectView') {
                    index = modelRecordIds.indexOf(taskBeyondEnddate[i].toString());
                }
                else {
                    index = this.resourceCollectionIds.indexOf(taskBeyondEnddate[i].toString());
                }
                if (index !== -1 && flatRecords[index].ganttProperties.progress < 100) {
                    this.criticalTasks.push(flatRecords[index]);
                    if (criticalPathIds.indexOf(taskBeyondEnddate[i]) === -1) {
                        criticalPathIds = criticalPathIds.concat(taskBeyondEnddate[i]);
                    }
                }
            }
        }
        return criticalPathIds;
    };
    /* eslint-disable-next-line */
    CriticalPath.prototype.criticalConnectorLine = function (criticalPathIds, collection, condition, collectionTaskId) {
        this.parent.removeCriticalPathStyles();
        var _loop_2 = function (i) {
            var criticalData;
            if (this_2.parent.viewType === 'ProjectView') {
                criticalData = this_2.parent.flatData[this_2.parent.ids.indexOf(criticalPathIds[i].toString())];
            }
            else {
                var currentRecords = this_2.parent.flatData.filter(function (data) {
                    return (data.ganttProperties.taskId).toString() === criticalPathIds[i].toString();
                });
                for (var i_1 = 0; i_1 < currentRecords.length; i_1++) {
                    if (currentRecords[i_1].ganttProperties.isCritical ||
                        currentRecords[i_1].ganttProperties.endDate >= this_2.maxEndDate) {
                        criticalData = currentRecords[i_1];
                    }
                }
            }
            var index = this_2.parent.currentViewData.indexOf(criticalData);
            var element = this_2.parent.getRowByIndex(index);
            var taskClass = void 0;
            var columnFields = this_2.parent.taskFields;
            if (criticalData && criticalData.parentItem) {
                var parentRecord = this_2.parent.currentViewData.filter(function (data) {
                    return criticalData.parentItem.uniqueID === data.uniqueID;
                });
                var parentIndex = this_2.parent.flatData.indexOf(parentRecord[0]);
                var parentElement = this_2.parent.getRowByIndex(parentIndex);
                if (parentElement) {
                    var parentTaskbarElement = parentElement.querySelectorAll('.e-taskbar-main-container');
                    for (var i_2 = 0; i_2 < parentTaskbarElement.length; i_2++) {
                        if (parentTaskbarElement[i_2].getAttribute('rowuniqueid') === criticalData['rowUniqueID']) {
                            addClass(parentTaskbarElement[i_2].querySelectorAll('.e-gantt-child-taskbar-inner-div'), cls.criticalChildTaskBarInnerDiv);
                        }
                    }
                }
            }
            /* eslint-disable-next-line */
            if (this_2.parent.allowUnscheduledTasks && criticalData && !criticalData[columnFields.startDate] && !criticalData[columnFields.endDate] && criticalData[columnFields.duration]) {
                taskClass = cls.criticalUnscheduledTask;
            }
            else {
                taskClass = cls.criticalChildProgressBarInnerDiv;
            }
            if (element && (this_2.parent.viewType === 'ProjectView' || (this_2.parent.viewType === 'ResourceView' &&
                !criticalData.hasChildRecords))) {
                if (element.getElementsByClassName('e-gantt-milestone')[0]) {
                    addClass(element.querySelectorAll('.e-gantt-milestone'), cls.criticalMilestone);
                }
                if (element.getElementsByClassName('e-gantt-child-taskbar-inner-div').length > 0) {
                    addClass(element.querySelectorAll('.e-gantt-child-taskbar-inner-div'), cls.criticalChildTaskBarInnerDiv);
                }
                if (element.getElementsByClassName('e-gantt-child-progressbar-inner-div').length > 0) {
                    addClass(element.querySelectorAll('.e-gantt-child-progressbar-inner-div'), taskClass);
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < criticalPathIds.length; i++) {
            _loop_2(i);
        }
        if (collection.length !== 0) {
            var index = 0;
            var currentdata = void 0;
            var checking = [];
            /* eslint-disable-next-line */
            var checkint = void 0;
            var values = void 0;
            for (var i = 0; i < this.criticalPathCollection.length; i++) {
                index = collectionTaskId.indexOf(this.criticalPathCollection[i]);
                currentdata = collection[index];
                if (index !== -1 && currentdata['to']) {
                    checking = currentdata['to'].split(',');
                    for (var j = 0; j < checking.length; j++) {
                        values = checking[j].split('+');
                        if (checking[j].indexOf('-') >= 0) {
                            values = checking[j].split('-');
                        }
                        checkint = (values[0].replace(':', ''));
                        if (typeof (criticalPathIds[j]) === 'number') {
                            checkint = parseInt(values[0], 10);
                        }
                        if (criticalPathIds.indexOf(checkint) !== -1) {
                            var taskIdString = String(currentdata['taskid']);
                            var checkintString = String(checkint);
                            var lineElement = this.parent.element.querySelectorAll('#ConnectorLineparent' +
                                taskIdString.replace(/([.])/g, '\\$1') + 'child' + checkintString.replace(/([.])/g, '\\$1'));
                            if (lineElement.length > 0) {
                                addClass(this.parent.element.querySelectorAll('#ConnectorLineparent' + taskIdString.replace(/([.])/g, '\\$1') + 'child' +
                                    checkintString.replace(/([.])/g, '\\$1'))[0].querySelectorAll('.e-connector-line'), cls.criticalConnectorLineSVG);
                                addClass(this.parent.element.querySelectorAll('#ConnectorLineparent' + taskIdString.replace(/([.])/g, '\\$1') + 'child' +
                                    checkintString.replace(/([.])/g, '\\$1'))[0].querySelectorAll('.e-connector-line-arrow'), cls.criticalConnectorArrowSVG);
                            }
                        }
                    }
                }
            }
        }
    };
    CriticalPath.prototype.getModuleName = function () {
        return 'criticalPath';
    };
    /**
     * Destroys the Critical Path of Gantt.
     *
     * @returns {void} .
     * @private
     */
    CriticalPath.prototype.destroy = function () {
        if (!this.parent.enableCriticalPath && this.parent.criticalPathModule) {
            this.parent.criticalPathModule = undefined;
        }
    };
    return CriticalPath;
}());
export { CriticalPath };
