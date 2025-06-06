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
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';
import { getValue, createElement, extend } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
import { parentsUntil, formatString, isScheduledTask, getIndex } from '../base/utils';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * File for handling connector line edit operation in Gantt.
 *
 */
var ConnectorLineEdit = /** @class */ (function () {
    function ConnectorLineEdit(ganttObj) {
        /**
         * @private
         */
        this.validationPredecessor = null;
        /** @private */
        this.confirmPredecessorDialog = null;
        /** @private */
        this.predecessorIndex = null;
        /** @private */
        this.childRecord = null;
        this.validatedId = [];
        this.validatedOffsetIds = [];
        this.isPublicDependencyDelete = false;
        this.parent = ganttObj;
        this.dateValidateModule = this.parent.dateValidationModule;
        this.parent.on('initPredessorDialog', this.initPredecessorValidationDialog, this);
    }
    /**
     * To update connector line edit element.
     *
     * @param {PointerEvent} e .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.updateConnectorLineEditElement = function (e) {
        var element = this.getConnectorLineHoverElement(e.target);
        if (!getValue('editModule.taskbarEditModule.taskBarEditAction', this.parent)) {
            this.highlightConnectorLineElements(element);
        }
    };
    /**
     * To get hovered connector line element.
     *
     * @param {EventTarget} target .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.getConnectorLineHoverElement = function (target) {
        var isOnLine = parentsUntil(target, cls.connectorLineSVG);
        var isArrow = parentsUntil(target, cls.connectorLineArrow);
        var isCriticalLine = parentsUntil(target, cls.criticalConnectorLineSVG);
        var isCriticalArrow = parentsUntil(target, cls.criticalConnectorArrowSVG);
        if (isOnLine || isArrow || isCriticalLine || isCriticalArrow) {
            return parentsUntil(target, cls.connectorLineContainer);
        }
        else {
            return null;
        }
    };
    /**
     * To highlight connector line while hover.
     *
     * @param {Element} element .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.highlightConnectorLineElements = function (element) {
        if (element) {
            if (element !== this.connectorLineElement) {
                this.removeHighlight();
                this.addHighlight(element);
            }
        }
        else {
            this.removeHighlight();
        }
    };
    /**
     * To add connector line highlight class.
     *
     * @param {Element} element .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.addHighlight = function (element) {
        this.connectorLineElement = element;
        var pathElement = element.querySelector('.' + cls.connectorLineSVG);
        if (pathElement) {
            pathElement.setAttribute('stroke-width', (this.parent.connectorLineModule['lineStroke'] + 1).toString());
        }
    };
    /**
     * To remove connector line highlight class.
     *
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.removeHighlight = function () {
        if (this.connectorLineElement) {
            var pathElement = this.connectorLineElement.querySelector('.' + cls.connectorLineSVG);
            if (pathElement) {
                pathElement.setAttribute('stroke-width', (this.parent.connectorLineModule['lineStroke']).toString());
            }
            this.connectorLineElement = null;
        }
    };
    /**
     * To remove connector line highlight class.
     *
     * @param {IGanttData[]} records .
     * @returns {DocumentFragment} .
     * @private
     */
    ConnectorLineEdit.prototype.getEditedConnectorLineString = function (records) {
        var ganttRecord;
        var predecessorsCollection;
        var parentGanttRecord;
        var childGanttRecord;
        var connectorObj;
        var idSet = new Set();
        var lineFragment = document.createDocumentFragment();
        for (var count = 0; count < records.length; count++) {
            ganttRecord = records[count];
            predecessorsCollection = ganttRecord.ganttProperties.predecessor;
            if (!predecessorsCollection) {
                continue;
            }
            for (var predecessorCount = 0; predecessorCount < predecessorsCollection.length; predecessorCount++) {
                var predecessor = predecessorsCollection[predecessorCount];
                var from = 'from';
                var to = 'to';
                var connectorLineId = 'parent' + predecessor[from] + 'child' + predecessor[to];
                this.parent.connectorLineModule.removeConnectorLineById(connectorLineId);
                parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[from]);
                childGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[to]);
                if ((!this.parent.allowParentDependency && ((parentGanttRecord && parentGanttRecord.expanded) ||
                    (childGanttRecord && childGanttRecord.expanded))) ||
                    (this.parent.allowParentDependency && (parentGanttRecord || childGanttRecord))) {
                    connectorObj = this.parent.predecessorModule.updateConnectorLineObject(parentGanttRecord, childGanttRecord, predecessor);
                    if (!isNullOrUndefined(connectorObj) && !idSet.has(connectorObj.connectorLineId)) {
                        var lineElement = this.parent.connectorLineModule.getConnectorLineTemplate(connectorObj);
                        idSet.add(connectorObj.connectorLineId);
                        lineFragment.appendChild(lineElement);
                    }
                }
            }
        }
        return lineFragment;
    };
    /**
     * Tp refresh connector lines of edited records
     *
     * @param {IGanttData[]} editedRecord .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.refreshEditedRecordConnectorLine = function (editedRecord) {
        this.parent.connectorLineModule.removePreviousConnectorLines(this.parent.previousRecords);
        this.parent.connectorLineModule.expandedRecords = this.parent.virtualScrollModule && this.parent.enableVirtualization ?
            this.parent.updatedRecords : this.parent.getExpandedRecords(this.parent.updatedRecords);
        var editedConnectorElement = this.getEditedConnectorLineString(editedRecord);
        if (editedConnectorElement) {
            this.parent.connectorLineModule.svgObject.appendChild(editedConnectorElement);
        }
    };
    ConnectorLineEdit.prototype.idFromPredecessor = function (pre) {
        var preArray = pre.split(',');
        var preIdArray = [];
        var values = [];
        var match = [];
        for (var j = 0; j < preArray.length; j++) {
            var strArray = [];
            var firstPart = void 0;
            var isAlpha = false;
            var predecessorName = void 0;
            var isGUId = false;
            var regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
            var elSplit = preArray[j].split('-');
            var id = void 0;
            if (elSplit.length === 6) {
                elSplit[4] = elSplit[4] + '-' + elSplit[5];
                elSplit.pop();
            }
            if (elSplit.length === 5 && elSplit[4].length >= 12) {
                id = preArray[j].substring(0, 36);
                if (regex.test(id)) {
                    isGUId = true;
                }
            }
            if (preArray[j].includes('-')) {
                if (preArray[j].includes('-') && (preArray[j].includes('days') || preArray[j].includes('day'))) {
                    var splitName = preArray[j].split(/-(?=\d)/);
                    if (splitName.length > 0) {
                        predecessorName = splitName[splitName.length - 1];
                    }
                }
                if (preArray[j].includes('-') && /[A-Za-z]/.test(predecessorName)) {
                    var indexFS = preArray[j].indexOf(predecessorName);
                    if (indexFS !== -1) {
                        firstPart = preArray[j].substring(0, indexFS - 1);
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
                    values[0] = preArray[j];
                }
                else {
                    spliceLength = split[1].length;
                    values[0] = preArray[j].slice(0, -(spliceLength + 1));
                    values[1] = split[1];
                }
                if (elSplit[4].indexOf('-') >= 0) {
                    split = elSplit[4].split('-');
                    if (split.length === 1) {
                        values[0] = preArray[j];
                    }
                    else {
                        spliceLength = split[1].length;
                        values[0] = preArray[j].slice(0, -(spliceLength + 1));
                        values[1] = split[1];
                    }
                }
            }
            else {
                if (isAlpha && firstPart.includes('-')) {
                    values[0] = firstPart;
                }
                else {
                    values = preArray[j].split('+');
                    if (preArray[j].indexOf('-') >= 0) {
                        values = preArray[j].split('-');
                    }
                }
            }
            if (!isNullOrUndefined(values[0])) {
                var ids = this.parent.viewType === 'ResourceView' ? this.parent.getTaskIds() : this.parent.ids;
                if (ids.indexOf(values[0]) === -1) {
                    if (values[0].indexOf(' ') !== -1) {
                        match = values[0].split(' ');
                        if (match.length === 1) {
                            match = values[0].match(/(\d+|[A-z]+)/g);
                        }
                        strArray.push(match[0]);
                    }
                    else {
                        if (values[0].length === 1 || values[0].length === 2) {
                            strArray.push(values[0]);
                        }
                        else {
                            strArray.push(values[0].slice(0, -2));
                        }
                    }
                }
                else {
                    strArray.push(values[0]);
                }
            }
            preIdArray.push((strArray.join('')));
        }
        return preIdArray;
    };
    ConnectorLineEdit.prototype.predecessorValidation = function (predecessor, record) {
        var recordId = record.rowUniqueID;
        var currentId;
        var currentRecord;
        for (var count = 0; count < predecessor.length; count++) {
            currentId = predecessor[count];
            var visitedIdArray = [];
            var predecessorCollection = predecessor.slice(0);
            predecessorCollection.splice(count, 1);
            var _loop_1 = function () {
                var currentIdArray = [];
                if (visitedIdArray.indexOf(currentId) === -1) {
                    //Predecessor id not in records collection
                    if (isNullOrUndefined(this_1.parent.connectorLineModule.getRecordByID(currentId))) {
                        return { value: false };
                    }
                    currentRecord = this_1.parent.connectorLineModule.getRecordByID(currentId).ganttProperties;
                    if (!isNullOrUndefined(currentRecord.predecessor) && currentRecord.predecessor.length > 0) {
                        currentRecord.predecessor.forEach(function (value) {
                            if (currentRecord.rowUniqueID.toString() !== value.from) {
                                currentIdArray.push(value.from.toString());
                            }
                        });
                    }
                    /* eslint-disable-next-line */
                    if (recordId.toString() === currentRecord.rowUniqueID.toString() || currentIdArray.indexOf(recordId.toString()) !== -1) {
                        return { value: false };
                    }
                    visitedIdArray.push(currentId);
                    if (!isNullOrUndefined(currentRecord.predecessor) && currentRecord.predecessor.length > 0) {
                        currentId = currentRecord.predecessor[0].from;
                    }
                    else {
                        return "break";
                    }
                }
                else {
                    return "break";
                }
            };
            var this_1 = this;
            while (currentId !== null) {
                var state_1 = _loop_1();
                if (typeof state_1 === "object")
                    return state_1.value;
                if (state_1 === "break")
                    break;
            }
        }
        return true;
    };
    /**
     * To validate predecessor relations
     *
     * @param {IGanttData} ganttRecord .
     * @param {string} predecessorString .
     * @returns {boolean} .
     * @private
     */
    ConnectorLineEdit.prototype.validatePredecessorRelation = function (ganttRecord, predecessorString) {
        var flag = true;
        var recordId = this.parent.viewType === 'ResourceView' ? ganttRecord.ganttProperties.taskId
            : ganttRecord.ganttProperties.rowUniqueID;
        var predecessorIdArray;
        var currentId;
        if (!isNullOrUndefined(predecessorString) && predecessorString.length > 0) {
            predecessorIdArray = this.idFromPredecessor(predecessorString);
            var _loop_2 = function (count) {
                //Check edited item has parent item in predecessor collection
                if (!this_2.parent.allowParentDependency) {
                    var checkParent = this_2.checkParentRelation(ganttRecord, predecessorIdArray);
                    if (!checkParent) {
                        return { value: false };
                    }
                }
                else {
                    if (parseInt(predecessorIdArray[predecessorIdArray.length - 1], 10) !== ganttRecord[this_2.parent.taskFields.id]) {
                        var num = this_2.parent.ids.indexOf(predecessorIdArray[predecessorIdArray.length - 1]);
                        var fromRecord = this_2.parent.currentViewData[num];
                        if (fromRecord && ganttRecord) {
                            flag = this_2.parent.predecessorModule.validateParentPredecessor(fromRecord, ganttRecord);
                        }
                    }
                }
                // Check if predecessor exist more then one
                var tempIdArray = predecessorIdArray.slice(0);
                var checkArray = [];
                var countFlag = true;
                tempIdArray.forEach(function (value) {
                    if (checkArray.indexOf(value) === -1) {
                        checkArray.push(value);
                    }
                    else {
                        countFlag = false;
                    }
                });
                if (!countFlag) {
                    return { value: false };
                }
                //Cyclick check
                currentId = predecessorIdArray[count];
                var visitedIdArray = [];
                var predecessorCollection = predecessorIdArray.slice(0);
                predecessorCollection.splice(count, 1);
                var _loop_3 = function () {
                    var currentIdArray = [];
                    var currentIdIndex;
                    var currentRecord;
                    if (visitedIdArray.indexOf(currentId) === -1) {
                        //Predecessor id not in records collection
                        if (isNullOrUndefined(this_2.parent.connectorLineModule.getRecordByID(currentId.toString()))) {
                            return { value: false };
                        }
                        currentRecord = this_2.parent.connectorLineModule.getRecordByID(currentId.toString()).ganttProperties;
                        //  let currentPredecessor='';
                        if (!isNullOrUndefined(currentRecord.predecessor) && currentRecord.predecessor.length > 0) {
                            currentRecord.predecessor.forEach(function (value, index) {
                                if (currentRecord.rowUniqueID.toString() !== value.from) {
                                    currentIdArray.push(value.from.toString());
                                    currentIdIndex = index;
                                }
                            });
                            //    currentPredecessor=currentRecord.predecessor[0].from
                        }
                        if (recordId.toString() === currentRecord.rowUniqueID.toString() ||
                            currentIdArray.indexOf(recordId.toString()) !== -1) {
                            return { value: false };
                        }
                        visitedIdArray.push(currentId);
                        if (!isNullOrUndefined(currentRecord.predecessor) && currentRecord.predecessor.length > 0) {
                            var result = void 0;
                            if (currentIdArray.length > 1) {
                                result = this_2.predecessorValidation(currentIdArray, ganttRecord.ganttProperties);
                            }
                            else if (currentIdArray.length === 1) {
                                currentId = currentRecord.predecessor[currentIdIndex].from;
                            }
                            if (result === false) {
                                return { value: false };
                            }
                        }
                        else {
                            return "break";
                        }
                    }
                    else {
                        return "break";
                    }
                };
                while (currentId !== null) {
                    var state_3 = _loop_3();
                    if (typeof state_3 === "object")
                        return state_3;
                    if (state_3 === "break")
                        break;
                }
            };
            var this_2 = this;
            for (var count = 0; count < predecessorIdArray.length; count++) {
                var state_2 = _loop_2(count);
                if (typeof state_2 === "object")
                    return state_2.value;
            }
        }
        return flag;
    };
    /**
     * To add dependency for Task
     *
     * @param {IGanttData} ganttRecord .
     * @param {string} predecessorString .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.addPredecessor = function (ganttRecord, predecessorString) {
        var tempPredecessorString = isNullOrUndefined(ganttRecord.ganttProperties.predecessorsName) ||
            ganttRecord.ganttProperties.predecessorsName === '' ?
            predecessorString : (ganttRecord.ganttProperties.predecessorsName + ',' + predecessorString);
        this.updatePredecessorHelper(ganttRecord, tempPredecessorString);
    };
    /**
     * To remove dependency from task
     *
     * @param {IGanttData} ganttRecord .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.removePredecessor = function (ganttRecord) {
        this.isPublicDependencyDelete = true;
        this.updatePredecessorHelper(ganttRecord, null);
    };
    /**
     * To modify current dependency values of Task
     *
     * @param {IGanttData} ganttRecord .
     * @param {string} predecessorString .
     * @param {ITaskbarEditedEventArgs} editedArgs .
     * @returns {boolean} .
     * @private
     */
    ConnectorLineEdit.prototype.updatePredecessor = function (ganttRecord, predecessorString, editedArgs) {
        return this.updatePredecessorHelper(ganttRecord, predecessorString, editedArgs);
    };
    ConnectorLineEdit.prototype.updatePredecessorHelper = function (ganttRecord, predecessorString, editedArgs) {
        if (isUndefined(predecessorString) || this.validatePredecessorRelation(ganttRecord, predecessorString)) {
            this.parent.isOnEdit = true;
            var predecessorCollection = [];
            if (!isNullOrUndefined(predecessorString) && predecessorString !== '') {
                predecessorCollection = this.parent.predecessorModule.calculatePredecessor(predecessorString, ganttRecord);
            }
            this.parent.setRecordValue('predecessor', predecessorCollection, ganttRecord.ganttProperties, true);
            var stringValue = this.parent.predecessorModule.getPredecessorStringValue(ganttRecord);
            this.parent.setRecordValue('predecessorsName', stringValue, ganttRecord.ganttProperties, true);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, stringValue, ganttRecord);
            this.parent.setRecordValue(this.parent.taskFields.dependency, stringValue, ganttRecord);
            var args = {};
            args.action = editedArgs && editedArgs.action && editedArgs.action === 'CellEditing' ? editedArgs.action : ((this.parent.contextMenuModule && this.parent.contextMenuModule['isCntxtMenuDependencyDelete']) ||
                this.isPublicDependencyDelete) ? 'DeleteConnectorLine' : 'DrawConnectorLine';
            args.data = ganttRecord;
            this.parent.editModule.initiateUpdateAction(args);
            return true;
        }
        else {
            if (ganttRecord.taskData[this.parent.taskFields.dependency]) {
                ganttRecord.taskData[this.parent.taskFields.dependency] = null;
            }
            var err = predecessorString + " is an invalid relation for task " + this.parent.taskFields.id + ". Kindly ensure the " + this.parent.taskFields.dependency + " field contains only valid predecessor relations.";
            this.parent.trigger('actionFailure', { error: err });
            return false;
        }
    };
    ConnectorLineEdit.prototype.checkParentRelation = function (ganttRecord, predecessorIdArray) {
        var editingData = ganttRecord;
        var checkParent = true;
        if (editingData && editingData.parentItem) {
            if (predecessorIdArray.indexOf(editingData.parentItem.taskId.toString()) !== -1) {
                return false;
            }
        }
        var _loop_4 = function (p) {
            var record = this_3.parent.currentViewData.filter(function (item) {
                return item && item.ganttProperties.rowUniqueID.toString() === predecessorIdArray[p].toString();
            });
            if (record[0] && record[0].hasChildRecords) {
                return { value: false };
            }
        };
        var this_3 = this;
        for (var p = 0; p < predecessorIdArray.length; p++) {
            var state_4 = _loop_4(p);
            if (typeof state_4 === "object")
                return state_4.value;
        }
        return checkParent;
    };
    ConnectorLineEdit.prototype.initPredecessorValidationDialog = function () {
        if (this.parent.taskFields.dependency && this.parent.isInPredecessorValidation) {
            var dialogElement = createElement('div', {
                id: this.parent.element.id + '_dialogValidationRule'
            });
            this.parent.element.appendChild(dialogElement);
            this.renderValidationDialog();
        }
    };
    /**
     * To render validation dialog
     *
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.renderValidationDialog = function () {
        var validationDialog = new Dialog({
            header: 'Validate Editing',
            isModal: true,
            enableRtl: this.parent.enableRtl,
            visible: false,
            width: '50%',
            showCloseIcon: true,
            close: this.validationDialogClose.bind(this),
            content: '',
            buttons: [
                {
                    click: this.validationDialogOkButton.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('okText'), isPrimary: true }
                },
                {
                    click: this.validationDialogCancelButton.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            target: this.parent.element,
            animationSettings: { effect: 'None' }
        });
        document.getElementById(this.parent.element.id + '_dialogValidationRule').innerHTML = '';
        validationDialog.isStringTemplate = true;
        validationDialog.appendTo('#' + this.parent.element.id + '_dialogValidationRule');
        this.parent.validationDialogElement = validationDialog;
    };
    ConnectorLineEdit.prototype.validationDialogOkButton = function () {
        var currentArgs = this.parent.currentEditedArgs;
        currentArgs.validateMode.preserveLinkWithEditing =
            document.getElementById(this.parent.element.id + '_ValidationAddlineOffset').checked;
        currentArgs.validateMode.removeLink =
            document.getElementById(this.parent.element.id + '_ValidationRemoveline').checked;
        currentArgs.validateMode.respectLink =
            document.getElementById(this.parent.element.id + '_ValidationCancel').checked;
        this.applyPredecessorOption();
        this.parent.validationDialogElement.hide();
    };
    ConnectorLineEdit.prototype.validationDialogCancelButton = function () {
        this.parent.currentEditedArgs.validateMode.respectLink = true;
        this.applyPredecessorOption();
        this.parent.validationDialogElement.hide();
    };
    ConnectorLineEdit.prototype.validationDialogClose = function (e) {
        if (getValue('isInteraction', e)) {
            this.parent.currentEditedArgs.validateMode.respectLink = true;
            this.applyPredecessorOption();
        }
    };
    /**
     * Validate and apply the predecessor option from validation dialog
     *
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.applyPredecessorOption = function () {
        var args = this.parent.currentEditedArgs;
        var ganttRecord = args.data;
        if (args.validateMode.respectLink) {
            this.parent.editModule.reUpdatePreviousRecords();
            this.parent.chartRowsModule.refreshRecords([args.data]);
        }
        else if (args.validateMode.removeLink) {
            this.checkChildRecords(ganttRecord);
            this.parent.editModule.updateEditedTask(args.editEventArgs);
        }
        else if (args.validateMode.preserveLinkWithEditing) {
            var connectedTaskId_1;
            if (this.parent.updateOffsetOnTaskbarEdit) {
                var taskId_1 = ganttRecord.ganttProperties.taskId;
                if (ganttRecord.ganttProperties.predecessor) {
                    ganttRecord.ganttProperties.predecessor.forEach(function (predecessor) {
                        if (taskId_1 === predecessor.from) {
                            connectedTaskId_1 = predecessor.to;
                            return;
                        }
                    });
                }
            }
            this.parent.editModule.updateEditedTask(args.editEventArgs);
            this.processPredecessors(connectedTaskId_1);
        }
    };
    ConnectorLineEdit.prototype.compareArrays = function (arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        var str1 = JSON.stringify(arr1);
        var str2 = JSON.stringify(arr2);
        return str1 === str2;
    };
    ConnectorLineEdit.prototype.processPredecessors = function (parentId) {
        var _this = this;
        if (parentId) {
            var record_1 = this.parent.getRecordByID(parentId);
            if (record_1 && record_1.ganttProperties && record_1.ganttProperties.predecessor) {
                this.parent.connectorLineEditModule['validatedOffsetIds'] = [];
                this.calculateOffset(record_1);
                var isIdInclude_1 = true;
                /* eslint-disable-next-line */
                var matchedObject = this.validatedId.find(function (item) {
                    return item.id === record_1.ganttProperties.taskId;
                });
                if (matchedObject) {
                    var predecessorArray = matchedObject.value;
                    var areArraysEqual = this.compareArrays(predecessorArray, record_1.ganttProperties.predecessor);
                    if (areArraysEqual) {
                        isIdInclude_1 = false;
                    }
                }
                var predecessors = record_1.ganttProperties.predecessor;
                predecessors.forEach(function (predecessor) {
                    if (record_1.ganttProperties.taskId === predecessor.from && isIdInclude_1) {
                        _this.processPredecessors(predecessor.to);
                    }
                });
            }
        }
    };
    ConnectorLineEdit.prototype.checkChildRecords = function (ganttRecord) {
        this.validationPredecessor = ganttRecord.ganttProperties.predecessor;
        if (!isNullOrUndefined(this.validationPredecessor)) {
            this.removePredecessors(ganttRecord, this.validationPredecessor);
        }
        if (ganttRecord.childRecords.length > 0) {
            for (var i = 0; i < ganttRecord.childRecords.length; i++) {
                var childRecord = ganttRecord.childRecords[i];
                this.validationPredecessor = childRecord.ganttProperties.predecessor;
                if (!isNullOrUndefined(this.validationPredecessor)) {
                    this.removePredecessors(childRecord, this.validationPredecessor);
                }
                if (childRecord.childRecords.length > 0) {
                    this.checkChildRecords(childRecord);
                }
            }
        }
        else if (!isNullOrUndefined(ganttRecord.parentItem)) {
            var parentRecord = this.parent.getRecordByID(ganttRecord.parentItem.taskId);
            this.validationPredecessor = parentRecord.ganttProperties.predecessor;
            this.removePredecessors(parentRecord, this.validationPredecessor);
        }
    };
    ConnectorLineEdit.prototype.compareObjects = function (obj1, obj2) {
        var keys1 = Object.keys(obj1).filter(function (key) { return key !== 'offset'; });
        var keys2 = Object.keys(obj2).filter(function (key) { return key !== 'offset'; });
        if (keys1.length !== keys2.length) {
            return false;
        }
        return keys1.every(function (key) { return obj1[key] === obj2[key]; });
    };
    ConnectorLineEdit.prototype.calculateOffset = function (record, isRecursive) {
        var _this = this;
        if (!this.parent.autoCalculateDateScheduling || (this.parent.isLoad && this.parent.treeGrid.loadChildOnDemand
            && this.parent.taskFields.hasChildMapping)) {
            return;
        }
        if (record && isScheduledTask(record.ganttProperties) !== null) {
            var prevPredecessor = extend([], record.ganttProperties.predecessor, [], true);
            var validPredecessor_1 = this.parent.predecessorModule.getValidPredecessor(record);
            if (validPredecessor_1.length > 0) {
                this.cumulativePredecessorChanges = prevPredecessor;
                var _loop_5 = function (i) {
                    var predecessor = validPredecessor_1[parseInt(i.toString(), 10)];
                    var parentTask = this_4.parent.connectorLineModule.getRecordByID(predecessor.from);
                    if (this_4.parent.undoRedoModule && this_4.parent.undoRedoModule['isUndoRedoPerformed'] && this_4.parent.viewType === 'ProjectView') {
                        var isPresent = parentTask.ganttProperties.predecessor.filter(function (pred) {
                            return pred.from === validPredecessor_1[i].from && pred.to === validPredecessor_1[i].to;
                        });
                        if (isPresent.length === 0) {
                            parentTask.ganttProperties.predecessor.push(validPredecessor_1[i]);
                        }
                    }
                    var offset = void 0;
                    if ((parentTask.ganttProperties.startDate || parentTask.ganttProperties.endDate) &&
                        (record.ganttProperties.startDate || record.ganttProperties.endDate)) {
                        var tempStartDate = void 0;
                        var tempEndDate = void 0;
                        var tempDuration = void 0;
                        var isNegativeOffset = void 0;
                        switch (predecessor.type) {
                            case 'FS':
                                tempStartDate = new Date((parentTask.ganttProperties.endDate ||
                                    parentTask.ganttProperties.startDate).getTime());
                                tempEndDate = new Date((record.ganttProperties.startDate || record.ganttProperties.endDate).getTime());
                                break;
                            case 'SS':
                                tempStartDate = new Date((parentTask.ganttProperties.startDate ||
                                    parentTask.ganttProperties.endDate).getTime());
                                tempEndDate = new Date((record.ganttProperties.startDate || record.ganttProperties.endDate).getTime());
                                break;
                            case 'SF':
                                tempStartDate = new Date((parentTask.ganttProperties.startDate ||
                                    parentTask.ganttProperties.endDate).getTime());
                                tempEndDate = new Date((record.ganttProperties.endDate || record.ganttProperties.startDate).getTime());
                                break;
                            case 'FF':
                                tempStartDate = new Date((parentTask.ganttProperties.endDate ||
                                    parentTask.ganttProperties.startDate).getTime());
                                tempEndDate = new Date((record.ganttProperties.endDate || record.ganttProperties.startDate).getTime());
                                break;
                        }
                        if (tempStartDate.getTime() < tempEndDate.getTime()) {
                            tempStartDate = this_4.dateValidateModule.checkStartDate(tempStartDate);
                            tempEndDate = this_4.dateValidateModule.checkEndDate(tempEndDate, null);
                            isNegativeOffset = false;
                        }
                        else {
                            var tempDate = new Date(tempStartDate.getTime());
                            tempStartDate = this_4.dateValidateModule.checkStartDate(tempEndDate);
                            tempEndDate = this_4.dateValidateModule.checkEndDate(tempDate, null);
                            isNegativeOffset = true;
                        }
                        if (tempStartDate.getTime() < tempEndDate.getTime()) {
                            tempDuration = this_4.dateValidateModule.getDuration(tempStartDate, tempEndDate, predecessor.offsetUnit, true, false);
                            if (this_4.parent.durationUnit === predecessor.offsetUnit &&
                                ((parentTask.ganttProperties.startDate && isNullOrUndefined(parentTask.ganttProperties.endDate)) ||
                                    (isNullOrUndefined(parentTask.ganttProperties.startDate) && parentTask.ganttProperties.endDate))) {
                                tempDuration = tempDuration - 1;
                            }
                            offset = isNegativeOffset ? (tempDuration * -1) : tempDuration;
                        }
                        else {
                            offset = 0;
                        }
                    }
                    else {
                        offset = 0;
                    }
                    var preIndex = getIndex(predecessor, 'from', prevPredecessor, 'to');
                    if (preIndex !== -1) {
                        prevPredecessor[preIndex].offset = offset;
                    }
                    // Update predecessor in predecessor task
                    var parentPredecessors = extend([], parentTask.ganttProperties.predecessor, [], true);
                    var parentPreIndex = getIndex(predecessor, 'from', parentPredecessors, 'to');
                    if (parentPreIndex !== -1) {
                        parentPredecessors[parentPreIndex].offset = offset;
                    }
                    this_4.parent.setRecordValue('predecessor', parentPredecessors, parentTask.ganttProperties, true);
                };
                var this_4 = this;
                for (var i = 0; i < validPredecessor_1.length; i++) {
                    _loop_5(i);
                }
            }
            else {
                var validPredecessor_2 = record.ganttProperties.predecessor;
                if (validPredecessor_2) {
                    if (validPredecessor_2.length > 0) {
                        validPredecessor_2.forEach(function (element) {
                            if (_this.validatedOffsetIds.indexOf(element.to) === -1) {
                                if (_this.parent.viewType === 'ResourceView') {
                                    _this.validatedOffsetIds.push(element.to);
                                    _this.calculateOffset(_this.parent.getRecordByID((_this.parent.taskIds.indexOf('T' + element.to)).toString()), true);
                                }
                                else {
                                    _this.calculateOffset(_this.parent.getRecordByID(element.to), true);
                                }
                            }
                        });
                    }
                }
            }
            if (!isRecursive) {
                if (validPredecessor_1.length === 0) {
                    this.cumulativePredecessorChanges = [];
                }
                if (prevPredecessor && prevPredecessor.length > 0 && this.cumulativePredecessorChanges &&
                    this.cumulativePredecessorChanges.length > 0) {
                    var matchingObjects = prevPredecessor.map(function (objectToCompare) {
                        var matchedObject = _this.cumulativePredecessorChanges.find(function (obj) { return _this.compareObjects(obj, objectToCompare); });
                        return matchedObject ? __assign({}, matchedObject) : null;
                    }).filter(function (matchedObject) { return matchedObject !== null; });
                    this.parent.setRecordValue('predecessor', matchingObjects, record.ganttProperties, true);
                }
            }
            else {
                this.parent.setRecordValue('predecessor', prevPredecessor, record.ganttProperties, true);
            }
            var predecessorString = this.parent.predecessorModule.getPredecessorStringValue(record);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, predecessorString, record);
            this.parent.setRecordValue(this.parent.taskFields.dependency, predecessorString, record);
            this.parent.setRecordValue('predecessorsName', predecessorString, record.ganttProperties, true);
            if (this.validatedOffsetIds.indexOf(record.ganttProperties.taskId.toString()) === -1) {
                this.validatedOffsetIds.push(record.ganttProperties.taskId.toString());
            }
            if (record.hasChildRecords) {
                for (var i = 0; i < record.childRecords.length; i++) {
                    if (this.validatedOffsetIds.indexOf(record.childRecords[i].ganttProperties.taskId.toString()) === -1 &&
                        record.childRecords[i].ganttProperties.predecessor &&
                        record.childRecords[i].ganttProperties.predecessor.length > 0) {
                        this.calculateOffset(record.childRecords[i]);
                    }
                }
            }
            else if (record.parentItem) {
                var parentItem = this.parent.getRecordByID(record.parentItem.taskId);
                if (this.validatedOffsetIds.indexOf(parentItem.ganttProperties.taskId.toString()) === -1 &&
                    parentItem.ganttProperties.predecessor && parentItem.ganttProperties.predecessor.length > 0) {
                    this.calculateOffset(parentItem);
                }
            }
        }
    };
    /**
     * Update predecessor value with user selection option in predecessor validation dialog
     *
     * @param {IGanttData} ganttRecord .
     * @param {IPredecessor[]} predecessor .
     * @returns {void} .
     */
    ConnectorLineEdit.prototype.removePredecessors = function (ganttRecord, predecessor) {
        var prevPredecessor = extend([], [], ganttRecord.ganttProperties.predecessor, true);
        if (isNullOrUndefined(predecessor)) {
            return;
        }
        var preLength = predecessor.length;
        for (var i = 0; i < preLength; i++) {
            var parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[i].from);
            var parentPredecessor = extend([], [], parentGanttRecord.ganttProperties.predecessor, true);
            var index = getIndex(predecessor[i], 'from', prevPredecessor, 'to');
            prevPredecessor.splice(index, 1);
            var parentIndex = getIndex(predecessor[parseInt(i.toString(), 10)], 'from', parentPredecessor, 'to');
            parentPredecessor.splice(parentIndex, 1);
            this.parent.setRecordValue('predecessor', parentPredecessor, parentGanttRecord.ganttProperties, true);
        }
        if (prevPredecessor.length !== ganttRecord.ganttProperties.predecessor.length) {
            this.parent.setRecordValue('predecessor', prevPredecessor, ganttRecord.ganttProperties, true);
            var predecessorString = this.parent.predecessorModule.getPredecessorStringValue(ganttRecord);
            this.parent.setRecordValue('predecessorsName', predecessorString, ganttRecord.ganttProperties, true);
            this.parent.setRecordValue('taskData.' + this.parent.taskFields.dependency, predecessorString, ganttRecord);
            this.parent.setRecordValue(this.parent.taskFields.dependency, predecessorString, ganttRecord);
        }
    };
    /**
     * To open predecessor validation dialog
     *
     * @param {object} args .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.openValidationDialog = function (args) {
        var contentTemplate = this.validationDialogTemplate(args);
        this.parent.validationDialogElement.setProperties({ content: contentTemplate });
        this.parent.validationDialogElement.show();
    };
    /**
     * Predecessor link validation dialog template
     *
     * @param {object} args .
     * @returns {HTMLElement} .
     * @private
     */
    ConnectorLineEdit.prototype.validationDialogTemplate = function (args) {
        var ganttId = this.parent.element.id;
        var contentdiv = createElement('div', {
            className: 'e-ValidationContent'
        });
        var taskData = getValue('task', args);
        var parenttaskData = getValue('parentTask', args);
        var violationType = getValue('violationType', args);
        var recordName = taskData.ganttProperties.taskName;
        var recordNewStartDate = this.parent.getFormatedDate(taskData.ganttProperties.startDate, this.parent.dateFormat);
        var parentName = parenttaskData.ganttProperties.taskName;
        var recordArgs = [recordName, parentName];
        var topContentText;
        if (violationType === 'taskBeforePredecessor_FS') {
            topContentText = this.parent.localeObj.getConstant('taskBeforePredecessor_FS');
        }
        else if (violationType === 'taskAfterPredecessor_FS') {
            topContentText = this.parent.localeObj.getConstant('taskAfterPredecessor_FS');
        }
        else if (violationType === 'taskBeforePredecessor_SS') {
            topContentText = this.parent.localeObj.getConstant('taskBeforePredecessor_SS');
        }
        else if (violationType === 'taskAfterPredecessor_SS') {
            topContentText = this.parent.localeObj.getConstant('taskAfterPredecessor_SS');
        }
        else if (violationType === 'taskBeforePredecessor_FF') {
            topContentText = this.parent.localeObj.getConstant('taskBeforePredecessor_FF');
        }
        else if (violationType === 'taskAfterPredecessor_FF') {
            topContentText = this.parent.localeObj.getConstant('taskAfterPredecessor_FF');
        }
        else if (violationType === 'taskBeforePredecessor_SF') {
            topContentText = this.parent.localeObj.getConstant('taskBeforePredecessor_SF');
        }
        else if (violationType === 'taskAfterPredecessor_SF') {
            topContentText = this.parent.localeObj.getConstant('taskAfterPredecessor_SF');
        }
        topContentText = formatString(topContentText, recordArgs);
        var topContent = '<div id="' + ganttId + '_ValidationText">' + topContentText + '<div>';
        var innerTable = '<table>' +
            '<tr><td><input type="radio" id="' + ganttId + '_ValidationCancel" name="ValidationRule" checked/><label for="'
            + ganttId + '_ValidationCancel" id= "' + ganttId + '_cancelLink">Cancel, keep the existing link</label></td></tr>' +
            '<tr><td><input type="radio" id="' + ganttId + '_ValidationRemoveline" name="ValidationRule"/><label for="'
            + ganttId + '_ValidationRemoveline" id="' + ganttId + '_removeLink">Remove the link and move <b>'
            + recordName + '</b> to start on <b>' + recordNewStartDate + '</b>.</label></td></tr>' +
            '<tr><td><input type="radio" id="' + ganttId + '_ValidationAddlineOffset" name="ValidationRule"/><label for="'
            + ganttId + '_ValidationAddlineOffset" id="' + ganttId + '_preserveLink">Move the <b>'
            + recordName + '</b> to start on <b>' + recordNewStartDate + '</b> and keep the link.</label></td></tr></table>';
        contentdiv.innerHTML = topContent + innerTable;
        return contentdiv;
    };
    /**
     * To validate the types while editing the taskbar
     *
     * @param {IGanttData} ganttRecord .
     * @param {any} data .
     * @returns {boolean} .
     * @private
     */
    ConnectorLineEdit.prototype.validateTypes = function (ganttRecord, data) {
        var predecessor = this.parent.predecessorModule.getValidPredecessor(ganttRecord);
        var parentGanttRecord;
        this.validationPredecessor = [];
        var violatedParent;
        var ganttTaskData;
        var violateType;
        var startDate = this.parent.predecessorModule.getPredecessorDate(ganttRecord, predecessor);
        if (data) {
            ganttTaskData = data.ganttProperties;
        }
        else {
            ganttTaskData = ganttRecord.ganttProperties;
        }
        var endDate = this.parent.allowUnscheduledTasks && isNullOrUndefined(startDate) ?
            ganttTaskData.endDate :
            this.dateValidateModule.getEndDate(startDate, ganttTaskData.duration, ganttTaskData.durationUnit, ganttTaskData, false);
        for (var i = 0; i < predecessor.length; i++) {
            parentGanttRecord = this.parent.connectorLineModule.getRecordByID(predecessor[i].from);
            var violationType = null;
            if (predecessor[i].type === 'FS') {
                if (this.parent.dateValidationModule.getDuration(startDate, ganttTaskData.startDate, this.parent.durationUnit, ganttTaskData.isAutoSchedule, ganttTaskData.isMilestone, true) !== 0) {
                    if (ganttTaskData.startDate < startDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskBeforePredecessor_FS';
                    }
                    else if (ganttTaskData.startDate > startDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskAfterPredecessor_FS';
                    }
                }
            }
            else if (predecessor[i].type === 'SS') {
                var endDateOlny = new Date(ganttTaskData.endDate);
                var startDateOlny = new Date(startDate);
                if (ganttTaskData.startDate < startDate) {
                    this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                    violationType = 'taskBeforePredecessor_SS';
                }
                else if (ganttTaskData.startDate > startDate) {
                    this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                    violationType = 'taskAfterPredecessor_SS';
                }
                else if (this.parent.allowUnscheduledTasks &&
                    isNullOrUndefined(ganttTaskData.startDate) &&
                    isNullOrUndefined(ganttTaskData.duration) &&
                    endDateOlny.setHours(0, 0, 0, 0) < startDateOlny.setHours(0, 0, 0, 0)) {
                    this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                    violationType = 'taskBeforePredecessor_SS';
                }
                else if (this.parent.allowUnscheduledTasks &&
                    isNullOrUndefined(ganttTaskData.startDate) &&
                    isNullOrUndefined(ganttTaskData.duration) &&
                    endDateOlny.setHours(0, 0, 0, 0) > startDateOlny.setHours(0, 0, 0, 0)) {
                    this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                    violationType = 'taskAfterPredecessor_SS';
                }
            }
            else if (predecessor[i].type === 'FF') {
                if (this.parent.dateValidationModule.getDuration(startDate, parentGanttRecord.ganttProperties.endDate, this.parent.durationUnit, parentGanttRecord.ganttProperties.isAutoSchedule, parentGanttRecord.ganttProperties.isMilestone, true) !== 0) {
                    if (endDate <= parentGanttRecord.ganttProperties.endDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskBeforePredecessor_FF';
                    }
                    else if (endDate > parentGanttRecord.ganttProperties.endDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskAfterPredecessor_FF';
                    }
                }
            }
            else if (predecessor[i].type === 'SF') {
                if (this.parent.dateValidationModule.getDuration(parentGanttRecord.ganttProperties.startDate, endDate, this.parent.durationUnit, parentGanttRecord.ganttProperties.isAutoSchedule, parentGanttRecord.ganttProperties.isMilestone, true) !== 0) {
                    if (endDate < parentGanttRecord.ganttProperties.startDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskBeforePredecessor_SF';
                    }
                    else if (endDate >= parentGanttRecord.ganttProperties.startDate) {
                        this.validationPredecessor.push(predecessor[parseInt(i.toString(), 10)]);
                        violationType = 'taskAfterPredecessor_SF';
                    }
                }
            }
            if (!isNullOrUndefined(violationType) && isNullOrUndefined(violateType)) {
                violatedParent = parentGanttRecord;
                violateType = violationType;
            }
        }
        var validateArgs = {
            parentTask: violatedParent,
            task: ganttRecord,
            violationType: violateType
        };
        return validateArgs;
    };
    /**
     * Method to remove and update new predecessor collection in successor record
     *
     * @param {IGanttData} data .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.addRemovePredecessor = function (data) {
        var prevData = this.parent.previousRecords[data.uniqueID];
        var newPredecessor = data.ganttProperties.predecessor.slice();
        // eslint-disable-next-line
        if (prevData && prevData.ganttProperties && prevData.ganttProperties.hasOwnProperty('predecessor')) {
            var prevPredecessor_1 = prevData.ganttProperties.predecessor;
            if (!isNullOrUndefined(prevPredecessor_1)) {
                var _loop_6 = function (p) {
                    var parentGanttRecord = this_5.parent.connectorLineModule.getRecordByID(prevPredecessor_1[parseInt(p.toString(), 10)].from);
                    if (parentGanttRecord === data) {
                        var isValid = data.ganttProperties.predecessor.filter(function (pred) {
                            return prevPredecessor_1[p].from === pred.from && prevPredecessor_1[p].to === pred.to;
                        });
                        if (isValid.length === 0) {
                            if (data.parentItem && this_5.parent.taskFields.dependency && data.ganttProperties.predecessor &&
                                this_5.parent.allowParentDependency) {
                                if (prevPredecessor_1[p].from !== data.parentItem.taskId &&
                                    prevPredecessor_1[p].to !== data.parentItem.taskId) {
                                    data.ganttProperties.predecessor.push(prevPredecessor_1[parseInt(p.toString(), 10)]);
                                }
                            }
                            else {
                                data.ganttProperties.predecessor.push(prevPredecessor_1[parseInt(p.toString(), 10)]);
                            }
                        }
                    }
                    else {
                        var parentPredecessor = extend([], [], parentGanttRecord.ganttProperties.predecessor, true);
                        var parentIndex = getIndex(prevPredecessor_1[parseInt(p.toString(), 10)], 'from', parentPredecessor, 'to');
                        if (parentIndex !== -1) {
                            parentPredecessor.splice(parentIndex, 1);
                            this_5.parent.setRecordValue('predecessor', parentPredecessor, parentGanttRecord.ganttProperties, true);
                        }
                    }
                };
                var this_5 = this;
                for (var p = 0; p < prevPredecessor_1.length; p++) {
                    _loop_6(p);
                }
            }
            if (!isNullOrUndefined(newPredecessor)) {
                var _loop_7 = function (n) {
                    var parentGanttRecord = this_6.parent.connectorLineModule.getRecordByID(newPredecessor[parseInt(n.toString(), 10)].from);
                    var parentPredecessor = extend([], [], parentGanttRecord.ganttProperties.predecessor, true);
                    var isValid = parentPredecessor.filter(function (pred) {
                        return newPredecessor[n].from === pred.from && newPredecessor[n].to === pred.to;
                    });
                    if (isValid.length === 0) {
                        parentPredecessor.push(newPredecessor[parseInt(n.toString(), 10)]);
                        this_6.parent.setRecordValue('predecessor', parentPredecessor, parentGanttRecord.ganttProperties, true);
                    }
                };
                var this_6 = this;
                for (var n = 0; n < newPredecessor.length; n++) {
                    _loop_7(n);
                }
            }
        }
    };
    /**
     * Method to remove a predecessor from a record.
     *
     * @param {IGanttData} childRecord .
     * @param {number} index .
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.removePredecessorByIndex = function (childRecord, index) {
        if (this.parent.undoRedoModule && !this.parent.undoRedoModule['isUndoRedoPerformed']) {
            if (this.parent.undoRedoModule['redoEnabled']) {
                this.parent.undoRedoModule['disableRedo']();
            }
            this.parent.undoRedoModule['createUndoCollection']();
            var details = {};
            details['action'] = 'DeleteDependency';
            details['modifiedRecords'] = extend([], [childRecord], [], true);
            this.parent.undoRedoModule['getUndoCollection'][this.parent.undoRedoModule['getUndoCollection'].length - 1] = details;
        }
        var childPredecessor = childRecord.ganttProperties.predecessor;
        var predecessor = childPredecessor.splice(index, 1);
        var parentRecord = this.parent.connectorLineModule.getRecordByID(predecessor[0].from);
        var parentPredecessor = parentRecord.ganttProperties.predecessor;
        var parentIndex = getIndex(predecessor[0], 'from', parentPredecessor, 'to');
        parentPredecessor.splice(parentIndex, 1);
        var predecessorString = this.parent.predecessorModule.getPredecessorStringValue(childRecord);
        childPredecessor.push(predecessor[0]);
        this.parent.connectorLineEditModule.updatePredecessor(childRecord, predecessorString);
    };
    /**
     * To render predecessor delete confirmation dialog
     *
     * @returns {void} .
     * @private
     */
    ConnectorLineEdit.prototype.renderPredecessorDeleteConfirmDialog = function () {
        this.confirmPredecessorDialog = new Dialog({
            width: '320px',
            isModal: true,
            enableRtl: this.parent.enableRtl,
            content: this.parent.localeObj.getConstant('confirmPredecessorDelete'),
            buttons: [
                {
                    click: this.confirmOkDeleteButton.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('okText'), isPrimary: true }
                },
                {
                    click: this.confirmCloseDialog.bind(this),
                    buttonModel: { content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            target: this.parent.element,
            animationSettings: { effect: 'None' }
        });
        var confirmDialog = createElement('div', {
            id: this.parent.element.id + '_deletePredecessorConfirmDialog'
        });
        this.parent.element.appendChild(confirmDialog);
        this.confirmPredecessorDialog.isStringTemplate = true;
        this.confirmPredecessorDialog.appendTo(confirmDialog);
    };
    ConnectorLineEdit.prototype.confirmCloseDialog = function () {
        this.confirmPredecessorDialog.destroy();
    };
    ConnectorLineEdit.prototype.confirmOkDeleteButton = function () {
        this.removePredecessorByIndex(this.childRecord, this.predecessorIndex);
        this.confirmPredecessorDialog.destroy();
    };
    return ConnectorLineEdit;
}());
export { ConnectorLineEdit };
