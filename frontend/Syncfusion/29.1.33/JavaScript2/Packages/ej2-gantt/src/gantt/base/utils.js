/**
 * Common methods used in Gantt
 */
import { isNullOrUndefined, extend, getValue } from '@syncfusion/ej2-base';
import { DataManager, UrlAdaptor, WebApiAdaptor, ODataAdaptor } from '@syncfusion/ej2-data';
import { WebMethodAdaptor, CacheAdaptor, RemoteSaveAdaptor, ODataV4Adaptor } from '@syncfusion/ej2-data';
/**
 * @param {Element} elem .
 * @param {string} selector .
 * @param {boolean} isID .
 * @returns {Element} .
 * @hidden
 */
export function parentsUntil(elem, selector, isID) {
    var parent = elem;
    while (parent) {
        if (isID ? parent.id === selector : parent.classList.contains(selector)) {
            break;
        }
        parent = parent.parentElement;
    }
    return parent;
}
/**
 * @param {ITaskData} ganttProp .
 * @returns {boolean} .
 * @hidden
 */
export function isScheduledTask(ganttProp) {
    if (isNullOrUndefined(ganttProp.startDate) && isNullOrUndefined(ganttProp.endDate) &&
        isNullOrUndefined(ganttProp.duration)) {
        return null;
    }
    else if (isNullOrUndefined(ganttProp.startDate) || isNullOrUndefined(ganttProp.endDate) ||
        isNullOrUndefined(ganttProp.duration)) {
        return false;
    }
    else {
        return true;
    }
}
/**
 * @param {Gantt} parent .
 * @returns {boolean} .
 * @hidden
 */
export function isCountRequired(parent) {
    if (parent.dataSource && !(parent.dataSource instanceof DataManager) &&
        'result' in parent.dataSource) {
        return true;
    }
    return false;
}
/**
 * @param {object} obj .
 * @returns {object} .
 * @hidden
 */
export function getSwapKey(obj) {
    var temp = {};
    for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
        var key = _a[_i];
        temp[obj[key]] = key;
    }
    return temp;
}
/**
 * @param {object} obj .
 * @returns {boolean} .
 * @hidden
 */
export function isEmptyObject(obj) {
    if (isNullOrUndefined(obj) || typeof obj !== 'object') {
        return false;
    }
    return Object.keys(obj).length === 0;
}
/**
 * @param {object} dataSource .
 * @returns {boolean} .
 * @hidden
 */
export function isRemoteData(dataSource) {
    if (dataSource instanceof DataManager) {
        var adaptor = dataSource.adaptor;
        return (adaptor instanceof ODataAdaptor || (adaptor instanceof ODataV4Adaptor) ||
            (adaptor instanceof WebApiAdaptor) || (adaptor instanceof WebMethodAdaptor) ||
            (adaptor instanceof CacheAdaptor) || (adaptor instanceof RemoteSaveAdaptor) ||
            adaptor instanceof UrlAdaptor);
    }
    return false;
}
/**
 * @param {IGanttData[]} records .
 * @param {boolean} isNotExtend .
 * @param {ITaskAddedEventArgs} eventArgs .
 * @param {Gantt} parent .
 * @returns {object[]} .
 * @hidden
 */
export function getTaskData(records, isNotExtend, eventArgs, parent) {
    if (eventArgs) {
        var result = void 0;
        for (var i = 0; i < records.length; i++) {
            var data = isNotExtend ?
                (records[parseInt(i.toString(), 10)].taskData) : extend({}, records[parseInt(i.toString(), 10)].taskData, {}, true);
            result = (data);
        }
        return result;
    }
    else {
        var result = [];
        for (var i = 0; i < records.length; i++) {
            if (!isNullOrUndefined(parent) && parent.timezone) {
                updateDates(records[i], parent);
            }
            var data = isNotExtend ? (records[parseInt(i.toString(), 10)].taskData) :
                extend({}, records[parseInt(i.toString(), 10)].taskData, {}, true);
            result.push(data);
        }
        return result;
    }
}
/**
 * @param {IGanttData} record .
 * @param {Gantt} parent .
 * @returns {null} .
 * @hidden
 */
export function updateDates(record, parent) {
    // let startDate: Date = (record as IGanttData).taskData[parent.taskFields.startDate];
    if (record && !isNullOrUndefined(record.ganttProperties)) {
        record.taskData[parent.taskFields.startDate] = parent.dateValidationModule.remove(record.ganttProperties.startDate, parent.timezone);
        if (parent.taskFields.endDate !== null) {
            record.taskData[parent.taskFields.endDate] = parent.dateValidationModule.remove(record.ganttProperties.endDate, parent.timezone);
        }
        if (parent.taskFields.baselineEndDate || parent.taskFields.baselineStartDate) {
            record.taskData[parent.taskFields.baselineStartDate] = parent.dateValidationModule.remove(record.ganttProperties.baselineStartDate, parent.timezone);
            record.taskData[parent.taskFields.baselineEndDate] = parent.dateValidationModule.remove(record.ganttProperties.baselineEndDate, parent.timezone);
        }
    }
    return null;
}
/**
 * @param {string} str .
 * @param {string[]} args .
 * @returns {string} .
 * @hidden
 */
export function formatString(str, args) {
    var regx;
    for (var i = 0; i < args.length; i++) {
        // eslint-disable-next-line security/detect-non-literal-regexp
        regx = new RegExp('\\{' + (i) + '\\}', 'gm');
        str = str.replace(regx, args[i].toString());
    }
    return str;
}
/**
 * @param {any} value .
 * @param {string} key1 .
 * @param {any} collection .
 * @param {string} key2
 * @returns {number} .
 * @hidden
 */
/* eslint-disable-next-line */
export function getIndex(value, key1, collection, key2) {
    var index = -1;
    for (var i = 0; i < collection.length; i++) {
        if (getValue(key1, collection[i]) === getValue(key1, value) && isNullOrUndefined(key2)
            || (!isNullOrUndefined(key2) && getValue(key1, collection[i]) === getValue(key1, value)
                && getValue(key2, collection[i]) === getValue(key2, value))) {
            index = i;
            break;
        }
    }
    return index;
}
/**
 * @param {number} value .
 * @returns {number} .
 * @hidden
 */
export function pixelToPoint(value) {
    return (value * 76) / 92;
}
/**
 * @param {number} value .
 * @returns {number} .
 * @hidden
 */
export function pointToPixel(value) {
    return (value * 92) / 76;
}
var uid = 0;
/**
 * @returns {number} .
 * @hidden
 */
export function getUid() {
    return uid++;
}
