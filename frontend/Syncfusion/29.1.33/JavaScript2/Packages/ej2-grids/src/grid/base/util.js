import { ChildProperty, compile as baseTemplateComplier, setValue, Internationalization, isUndefined } from '@syncfusion/ej2-base';
import { extend as baseExtend, isNullOrUndefined, getValue, classList } from '@syncfusion/ej2-base';
import { setStyleAttribute, addClass, attributes, remove, createElement, removeClass } from '@syncfusion/ej2-base';
import { isObject, select, selectAll } from '@syncfusion/ej2-base';
import { DataUtil, Query, DataManager, Predicate, UrlAdaptor, Deferred } from '@syncfusion/ej2-data';
import { Column } from '../models/column';
import { calculateRelativeBasedPosition, calculatePosition } from '@syncfusion/ej2-popups';
import { Print } from '../actions/print';
import { CheckBoxFilterBase } from '../common/checkbox-filter-base';
import * as literals from '../base/string-literals';
//https://typescript.codeplex.com/discussions/401501
/**
 * Function to check whether target object implement specific interface
 *
 * @param  {Object} target - specifies the target
 * @param  {string} checkFor - specifies the checkfors
 * @returns {boolean} returns the boolean
 * @hidden
 */
export function doesImplementInterface(target, checkFor) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return target.prototype && checkFor in target.prototype;
}
/**
 * Function to get value from provided data
 *
 * @param  {string} field - specifies the field
 * @param  {Object} data - specifies the data
 * @param  {ColumnModel} column - specifies the column
 * @returns {Object} returns the object
 * @hidden
 */
// eslint-disable-next-line
export function valueAccessor(field, data, column) {
    return (isNullOrUndefined(field) || field === '') ? '' : DataUtil.getObject(field, data);
}
/**
 * Defines the method used to apply custom header cell values from external function and display this on each header cell rendered.
 *
 * @param  {string} field - specifies the field
 * @param  {ColumnModel} column - specifies the column
 * @returns {object} headerValueAccessor
 * @hidden
 */
export function headerValueAccessor(field, column) {
    return (isNullOrUndefined(field) || field === '') ? '' : DataUtil.getObject(field, column);
}
/**
 * The function used to update Dom using requestAnimationFrame.
 *
 * @param {Function} updateFunction - Function that contains the actual action
 * @param {object} callBack - defines the callback
 * @returns {void}
 * @hidden
 */
// eslint-disable-next-line
export function getUpdateUsingRaf(updateFunction, callBack) {
    requestAnimationFrame(function () {
        try {
            callBack(null, updateFunction());
        }
        catch (e) {
            callBack(e);
        }
    });
}
/**
 * @hidden
 * @param {PdfExportProperties | ExcelExportProperties} exportProperties - Defines the export properties
 * @returns {boolean} Returns isExportColumns
 */
export function isExportColumns(exportProperties) {
    return !isNullOrUndefined(exportProperties) &&
        !isNullOrUndefined(exportProperties.columns) && exportProperties.columns.length > 0;
}
/**
 * @param {PdfExportProperties | ExcelExportProperties} exportProperties - Defines the export properties
 * @param {IGrid} gObj - Defines the grid object
 * @returns {void}
 * @hidden
 */
export function updateColumnTypeForExportColumns(exportProperties, gObj) {
    var exportColumns = exportProperties.columns;
    var gridColumns = gObj.columns;
    for (var i = 0; i < exportColumns.length; i++) {
        if (gridColumns.length - 1 >= i) {
            if (gridColumns[parseInt(i.toString(), 10)].columns) {
                for (var j = 0; j < gridColumns[parseInt(i.toString(), 10)].columns.length; j++) {
                    exportColumns[parseInt(i.toString(), 10)].columns[parseInt(j.toString(), 10)]
                        .type = gridColumns[parseInt(i.toString(), 10)].columns[parseInt(j.toString(), 10)].type;
                }
            }
            else {
                exportColumns[parseInt(i.toString(), 10)].type = gridColumns[parseInt(i.toString(), 10)].type;
            }
        }
    }
}
/**
 * @hidden
 * @param {IGrid} grid - Defines the grid
 * @returns {void}
 */
export function updatecloneRow(grid) {
    var nRows = [];
    var actualRows = grid.vRows;
    for (var i = 0; i < actualRows.length; i++) {
        if (actualRows[parseInt(i.toString(), 10)].isDataRow) {
            nRows.push(actualRows[parseInt(i.toString(), 10)]);
        }
        else if (!actualRows[parseInt(i.toString(), 10)].isDataRow) {
            nRows.push(actualRows[parseInt(i.toString(), 10)]);
            if (!actualRows[parseInt(i.toString(), 10)].isExpand && actualRows[parseInt(i.toString(), 10)].isCaptionRow) {
                i += getCollapsedRowsCount(actualRows[parseInt(i.toString(), 10)], grid);
            }
        }
    }
    grid.vcRows = nRows;
}
var count = 0;
/**
 * @hidden
 * @param {Row<Column>} val - Defines the value
 * @param {IGrid} grid - Defines the grid
 * @returns {number} Returns the collapsed row count
 */
export function getCollapsedRowsCount(val, grid) {
    count = 0;
    var gSummary = 'gSummary';
    var total = 'count';
    var gLen = grid.groupSettings.columns.length;
    var records = 'records';
    var items = 'items';
    var value = val["" + gSummary];
    var dataRowCnt = 0;
    var agrCnt = 'aggregatesCount';
    if (value === val.data["" + total]) {
        if (grid.groupSettings.columns.length && !isNullOrUndefined(val["" + agrCnt]) && val["" + agrCnt]) {
            if (grid.groupSettings.columns.length !== 1) {
                count += (val.indent !== 0 && (value) < 2) ? (val["" + gSummary] * ((gLen - val.indent) + (gLen - val.indent) * val["" + agrCnt])) :
                    (val["" + gSummary] * ((gLen - val.indent) + (gLen - val.indent - 1) * val["" + agrCnt])) + val["" + agrCnt];
            }
            else if (grid.groupSettings.columns.length === 1) {
                count += (val["" + gSummary] * (gLen - val.indent)) + val["" + agrCnt];
            }
        }
        else if (grid.groupSettings.columns.length) {
            if (grid.groupSettings.columns.length !== 1) {
                count += val["" + gSummary] * (grid.groupSettings.columns.length - val.indent);
            }
            else {
                count += val["" + gSummary];
            }
        }
        return count;
    }
    else {
        for (var i = 0, len = val.data["" + items].length; i < len; i++) {
            var gLevel = val.data["" + items][parseInt(i.toString(), 10)];
            count += gLevel["" + items].length + ((gLen !== grid.columns.length) &&
                !isNullOrUndefined(gLevel["" + items]["" + records]) ? gLevel["" + items]["" + records].length : 0);
            dataRowCnt += (!isNullOrUndefined(gLevel["" + items]["" + records]) && !isNullOrUndefined(val["" + agrCnt])) ? gLevel["" + items]["" + records].length :
                gLevel["" + items].length;
            if (gLevel["" + items].GroupGuid && gLevel["" + items].childLevels !== 0) {
                recursive(gLevel);
            }
        }
        count += val.data["" + items].length;
        if (!isNullOrUndefined(val["" + agrCnt])) {
            if (val["" + agrCnt] && count && dataRowCnt !== 0) {
                count += ((count - dataRowCnt) * val["" + agrCnt]) + val["" + agrCnt];
            }
        }
    }
    return count;
}
/**
 * @param {Object[]} row - Defines the row
 * @returns {void}
 * @hidden
 */
export function recursive(row) {
    var items = 'items';
    var rCount = 'count';
    for (var j = 0, length_1 = row["" + items].length; j < length_1; j++) {
        var nLevel = row["" + items][parseInt(j.toString(), 10)];
        count += nLevel["" + rCount];
        if (nLevel["" + items].childLevels !== 0) {
            recursive(nLevel);
        }
    }
}
/**
 * @param {Object[]} collection - Defines the array
 * @param {Object} predicate - Defines the predicate
 * @returns {Object} Returns the object
 * @hidden
 */
export function iterateArrayOrObject(collection, predicate) {
    var result = [];
    for (var i = 0, len = collection.length; i < len; i++) {
        var pred = predicate(collection[parseInt(i.toString(), 10)], i);
        if (!isNullOrUndefined(pred)) {
            result.push(pred);
        }
    }
    return result;
}
/**
 * @param {Object[]} array - Defines the array
 * @returns {Object} Returns the object
 * @hidden
 */
export function iterateExtend(array) {
    var obj = [];
    for (var i = 0; i < array.length; i++) {
        obj.push(baseExtend({}, getActualProperties(array[parseInt(i.toString(), 10)]), {}, true));
    }
    return obj;
}
/**
 * @param {string | Function} template - Defines the template
 * @returns {Function} Returns the function
 * @hidden
 */
export function templateCompiler(template) {
    if (template) {
        try {
            var validSelector = template[0] !== '<';
            if (typeof template === 'function') {
                return baseTemplateComplier(template);
            }
            else if (validSelector && document.querySelectorAll(template).length) {
                return baseTemplateComplier(document.querySelector(template).innerHTML.trim());
            }
            else {
                return baseTemplateComplier(template);
            }
        }
        catch (e) {
            return baseTemplateComplier(template);
        }
    }
    return undefined;
}
/**
 * @param {Element} node - Defines the column
 * @param {Object} customAttributes - Defines the index
 * @returns {void}
 * @hidden
 */
export function setStyleAndAttributes(node, customAttributes) {
    var copyAttr = {};
    var literals = ['style', 'class'];
    //Dont touch the original object - make a copy
    baseExtend(copyAttr, customAttributes, {});
    if ('style' in copyAttr) {
        setStyleAttribute(node, copyAttr[literals[0]]);
        delete copyAttr[literals[0]];
    }
    if ('class' in copyAttr) {
        addClass([node], copyAttr[literals[1]]);
        delete copyAttr[literals[1]];
    }
    attributes(node, copyAttr);
}
/**
 * @param {Object} copied - Defines the column
 * @param {Object} first - Defines the inndex
 * @param {Object} second - Defines the second object
 * @param {string[]} exclude - Defines the exclude
 * @returns {Object} Returns the object
 * @hidden
 */
export function extend(copied, first, second, exclude) {
    var moved = baseExtend(copied, first, second);
    var values = Object.keys(moved);
    for (var i = 0; i < values.length; i++) {
        if (exclude && exclude.indexOf(values[parseInt(i.toString(), 10)]) !== -1) {
            delete moved[values[parseInt(i.toString(), 10)]];
        }
    }
    return moved;
}
/**
 * @param {Column[]} columnModel - Defines the column
 * @param {number} ind - Defines the inndex
 * @returns {number} - Returns the columnindex
 * @hidden
 */
export function setColumnIndex(columnModel, ind) {
    if (ind === void 0) { ind = 0; }
    for (var i = 0, len = (!isNullOrUndefined(columnModel) ? columnModel.length : 0); i < len; i++) {
        if (columnModel[parseInt(i.toString(), 10)].columns) {
            columnModel[parseInt(i.toString(), 10)].index = isNullOrUndefined(columnModel[parseInt(i.toString(), 10)].index) ? ind
                : columnModel[parseInt(i.toString(), 10)].index;
            ind++;
            ind = setColumnIndex(columnModel[parseInt(i.toString(), 10)].columns, ind);
        }
        else {
            columnModel[parseInt(i.toString(), 10)].index = isNullOrUndefined(columnModel[parseInt(i.toString(), 10)].index) ? ind
                : columnModel[parseInt(i.toString(), 10)].index;
            ind++;
        }
    }
    return ind;
}
/**
 * @param {Column[] | string[] | ColumnModel[]} columns - Defines the column
 * @param {boolean} autoWidth - Defines the autowidth
 * @param {IGrid} gObj - Defines the class name
 * @returns {Column} - Returns the columns
 * @hidden
 */
export function prepareColumns(columns, autoWidth, gObj) {
    for (var c = 0, len = (!isNullOrUndefined(columns) ? columns.length : 0); c < len; c++) {
        var column = void 0;
        if (typeof columns[parseInt(c.toString(), 10)] === 'string') {
            column = new Column({ field: columns[parseInt(c.toString(), 10)] }, gObj);
        }
        else if (!(columns[parseInt(c.toString(), 10)] instanceof Column) || columns[parseInt(c.toString(), 10)].columns) {
            if (!columns[parseInt(c.toString(), 10)].columns) {
                column = new Column(columns[parseInt(c.toString(), 10)], gObj);
            }
            else {
                columns[parseInt(c.toString(), 10)].columns = prepareColumns(columns[parseInt(c.toString(), 10)].columns, null, gObj);
                column = new Column(columns[parseInt(c.toString(), 10)], gObj);
            }
        }
        else {
            column = columns[parseInt(c.toString(), 10)];
        }
        if (column.type && column.type.toLowerCase() === 'checkbox') {
            column.allowReordering = false;
        }
        column.headerText = isNullOrUndefined(column.headerText) ? column.foreignKeyValue || column.field || '' : column.headerText;
        column.foreignKeyField = column.foreignKeyField || column.field;
        column.valueAccessor = (typeof column.valueAccessor === 'string' ? getValue(column.valueAccessor, window)
            : column.valueAccessor) || valueAccessor;
        column.headerValueAccessor = typeof column.headerValueAccessor === 'string' ? getValue(column.headerValueAccessor, window)
            : column.headerValueAccessor;
        column.width = autoWidth && isNullOrUndefined(column.width) ? 200 : column.width;
        if (isNullOrUndefined(column.visible)) {
            column.visible = true;
        }
        columns[parseInt(c.toString(), 10)] = column;
    }
    return columns;
}
/**
 * @param {HTMLElement} popUp - Defines the popup element
 * @param {MouseEvent | TouchEvent} e - Defines the moouse event
 * @param {string} className - Defines the class name
 * @returns {void}
 * @hidden
 */
export function setCssInGridPopUp(popUp, e, className) {
    var popUpSpan = popUp.querySelector('span');
    var position = popUp.parentElement.getBoundingClientRect();
    var targetPosition = e.target.getBoundingClientRect();
    popUpSpan.className = className;
    popUp.style.display = '';
    var isBottomTail = (isNullOrUndefined(e.clientY) ? e.changedTouches[0].clientY :
        e.clientY) > popUp.offsetHeight + 10;
    popUp.style.top = targetPosition.top - position.top +
        (isBottomTail ? -(popUp.offsetHeight + 10) : popUp.offsetHeight + 10) + 'px'; //10px for tail element
    popUp.style.left = getPopupLeftPosition(popUp, e, targetPosition, position.left) + 'px';
    if (isBottomTail) {
        popUp.querySelector('.e-downtail').style.display = '';
        popUp.querySelector('.e-uptail').style.display = 'none';
    }
    else {
        popUp.querySelector('.e-downtail').style.display = 'none';
        popUp.querySelector('.e-uptail').style.display = '';
    }
}
/**
 * @param {HTMLElement} popup - Defines the popup element
 * @param {MouseEvent | TouchEvent} e  - Defines the mouse event
 * @param {Object} targetPosition - Defines the target position
 * @param {number} targetPosition.top - Defines the top position
 * @param {number} targetPosition.left  - Defines the left position
 * @param {number} targetPosition.right  - Defines the right position
 * @param {number} left - Defines the left position
 * @returns {number} Returns the popup left position
 * @hidden
 */
function getPopupLeftPosition(popup, e, targetPosition, left) {
    var width = popup.offsetWidth / 2;
    var x = getPosition(e).x;
    if (x - targetPosition.left < width) {
        return targetPosition.left - left;
    }
    else if (targetPosition.right - x < width) {
        return targetPosition.right - left - width * 2;
    }
    else {
        return x - left - width;
    }
}
/**
 * @param {Object} obj - Defines the object
 * @returns {Object} Returns the Properties
 * @hidden
 */
export function getActualProperties(obj) {
    if (obj instanceof ChildProperty) {
        return getValue('properties', obj);
    }
    else {
        return obj;
    }
}
/**
 * @param {Element} elem - Defines the element
 * @param {string} selector - Defines the string selector
 * @param {boolean} isID - Defines the isID
 * @returns {Element} Returns the element
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
 * @param {Element} element - Defines the element
 * @param {Element} elements - Defines the element
 * @returns {number} Returns the element index
 * @hidden
 */
export function getElementIndex(element, elements) {
    var index = -1;
    for (var i = 0, len = elements.length; i < len; i++) {
        if (elements[parseInt(i.toString(), 10)].isEqualNode(element)) {
            index = i;
            break;
        }
    }
    return index;
}
/**
 * @param {Object} value - Defines the value
 * @param {Object} collection - defines the collection
 * @returns {number} Returns the array
 * @hidden
 */
export function inArray(value, collection) {
    for (var i = 0, len = collection.length; i < len; i++) {
        if (collection[parseInt(i.toString(), 10)] === value) {
            return i;
        }
    }
    return -1;
}
/**
 * @param {Object} collection - Defines the collection
 * @returns {Object} Returns the object
 * @hidden
 */
export function getActualPropFromColl(collection) {
    var coll = [];
    for (var i = 0, len = collection.length; i < len; i++) {
        // eslint-disable-next-line no-prototype-builtins
        if (collection[parseInt(i.toString(), 10)].hasOwnProperty('properties')) {
            coll.push(collection[parseInt(i.toString(), 10)].properties);
        }
        else {
            coll.push(collection[parseInt(i.toString(), 10)]);
        }
    }
    return coll;
}
/**
 * @param {Element} target - Defines the target element
 * @param {string} selector - Defines the selector
 * @returns {void}
 * @hidden
 */
export function removeElement(target, selector) {
    var elements = [].slice.call(target.querySelectorAll(selector));
    for (var i = 0; i < elements.length; i++) {
        remove(elements[parseInt(i.toString(), 10)]);
    }
}
/**
 * @param {MouseEvent | TouchEvent} e Defines the mouse event
 * @returns {IPosition} Returns the position
 * @hidden
 */
export function getPosition(e) {
    var position = {};
    position.x = (isNullOrUndefined(e.clientX) ? e.changedTouches[0].clientX :
        e.clientX);
    position.y = (isNullOrUndefined(e.clientY) ? e.changedTouches[0].clientY :
        e.clientY);
    return position;
}
var uid = 0;
/**
 * @param {string} prefix - Defines the prefix string
 * @returns {string} Returns the uid
 * @hidden
 */
export function getUid(prefix) {
    return prefix + uid++;
}
/**
 * @param {Element | DocumentFragment} elem - Defines the element
 * @param {Element[] | NodeList} children - Defines the Element
 * @returns {Element} Returns the element
 * @hidden
 */
export function appendChildren(elem, children) {
    for (var i = 0, len = children.length; i < len; i++) {
        if (len === children.length) {
            elem.appendChild(children[parseInt(i.toString(), 10)]);
        }
        else {
            elem.appendChild(children[0]);
        }
    }
    return elem;
}
/**
 * @param {Element} elem - Defines the element
 * @param {string} selector - Defines the selector
 * @param {boolean} isID - Defines isID
 * @returns {Element} Return the element
 * @hidden
 */
export function parents(elem, selector, isID) {
    var parent = elem;
    var parents = [];
    while (parent) {
        if (isID ? parent.id === selector : parent.classList.contains(selector)) {
            parents.push(parent);
        }
        parent = parent.parentElement;
    }
    return parents;
}
/**
 * @param {AggregateType | string} type - Defines the type
 * @param {Object} data - Defines the data
 * @param {AggregateColumnModel} column - Defines the column
 * @param {Object} context - Defines the context
 * @returns {Object} Returns the calculated aggragate
 * @hidden
 */
export function calculateAggregate(type, data, column, context) {
    if (type === 'Custom') {
        var temp = column.customAggregate;
        if (typeof temp === 'string') {
            temp = getValue(temp, window);
        }
        return temp ? temp.call(context, data, column) : '';
    }
    return (column.field in data || data instanceof Array) ? DataUtil.aggregates[type.toLowerCase()](data, column.field) : null;
}
/** @hidden */
var scrollWidth = null;
/** @hidden
 * @returns {number} - Returns the scrollbarwidth
 */
export function getScrollBarWidth() {
    if (scrollWidth !== null) {
        return scrollWidth;
    }
    var divNode = document.createElement('div');
    var value = 0;
    divNode.style.cssText = 'width:100px;height: 100px;overflow: scroll;position: absolute;top: -9999px;';
    document.body.appendChild(divNode);
    value = (divNode.offsetWidth - divNode.clientWidth) | 0;
    document.body.removeChild(divNode);
    return scrollWidth = value;
}
/** @hidden */
var rowHeight;
/**
 * @param {HTMLElement} element - Defines the element
 * @returns {number} Returns the roww height
 * @hidden
 */
export function getRowHeight(element) {
    if (rowHeight !== undefined) {
        return rowHeight;
    }
    var table = createElement('table', { className: literals.table, attrs: { role: 'grid' } });
    table.style.visibility = 'hidden';
    table.innerHTML = '<tr><td class="e-rowcell">A<td></tr>';
    element.appendChild(table);
    var rect = table.querySelector('td').getBoundingClientRect();
    element.removeChild(table);
    rowHeight = Math.ceil(rect.height);
    return rowHeight;
}
/**
 * @param {HTMLElement} element - Defines the HTMl element
 * @returns {number} Returns the row height
 * @hidden
 */
export function getActualRowHeight(element) {
    var table = createElement('table', { className: literals.table, attrs: { role: 'grid' } });
    table.style.visibility = 'hidden';
    table.innerHTML = '<tr><td class="e-rowcell">A<td></tr>';
    element.appendChild(table);
    var rect = table.querySelector('tr').getBoundingClientRect();
    element.removeChild(table);
    return rect.height;
}
/**
 * @param {string} field - Defines the field
 * @returns {boolean} - Returns is complex field
 * @hidden
 */
export function isComplexField(field) {
    return field.split('.').length > 1;
}
/**
 * @param {string} field - Defines the field
 * @returns {string} - Returns the get complex field ID
 * @hidden
 */
export function getComplexFieldID(field) {
    if (field === void 0) { field = ''; }
    return field.replace(/\./g, '___');
}
/**
 * @param {string} field - Defines the field
 * @returns {string} - Returns the parsed column field id
 * @hidden
 */
export function getParsedFieldID(field) {
    if (field === void 0) { field = ''; }
    return field.replace(/[^a-zA-Z0-9_.]/g, '\\$&');
}
/**
 * @param {string} field - Defines the field
 * @returns {string} - Returns the set complex field ID
 * @hidden
 */
export function setComplexFieldID(field) {
    if (field === void 0) { field = ''; }
    return field.replace(/___/g, '.');
}
/**
 * @param {Column} col - Defines the column
 * @param {string} type - Defines the type
 * @param {Element} elem - Defines th element
 * @returns {boolean} Returns is Editable
 * @hidden
 */
export function isEditable(col, type, elem) {
    var row = parentsUntil(elem, literals.row);
    var isOldRow = !row ? true : row && !row.classList.contains('e-insertedrow');
    if (type === 'beginEdit' && isOldRow) {
        if (col.isIdentity || col.isPrimaryKey || !col.allowEditing) {
            return false;
        }
        return true;
    }
    else if (type === 'add' && col.isIdentity) {
        return false;
    }
    else {
        if (isOldRow && !col.allowEditing && !col.isIdentity && !col.isPrimaryKey) {
            return false;
        }
        return true;
    }
}
/**
 * @param {Element} elem - Defines th element
 * @returns {boolean} Returns is Editable
 * @hidden
 */
export function isCellHaveWidth(elem) {
    return elem.getBoundingClientRect().width === 0 ? false : true;
}
/**
 * @param {IGrid} inst - Defines the IGrid
 * @returns {boolean} Returns is action prevent in boolean
 * @hidden
 */
export function isActionPrevent(inst) {
    var dlg = select('#' + inst.element.id + 'EditConfirm', inst.element);
    return inst.editSettings.mode === 'Batch' &&
        (selectAll('.e-updatedtd', inst.element).length || selectAll('.e-gridform.e-formvalidator', inst.element).length)
        && inst.editSettings.showConfirmDialog && (dlg ? dlg.classList.contains('e-popup-close') : true);
}
/**
 * @param {any} elem - Defines the element
 * @param {boolean} action - Defines the boolean for action
 * @returns {void}
 * @hidden
 */
// eslint-disable-next-line
export function wrap(elem, action) {
    var clName = 'e-wrap';
    elem = elem instanceof Array ? elem : [elem];
    for (var i = 0; i < elem.length; i++) {
        if (action) {
            elem[parseInt(i.toString(), 10)].classList.add(clName);
        }
        else {
            elem[parseInt(i.toString(), 10)].classList.remove(clName);
        }
    }
}
/**
 * @param {ServiceLocator} serviceLocator - Defines the service locator
 * @param {Column} column  - Defines the column
 * @returns {void}
 * @hidden
 */
export function setFormatter(serviceLocator, column) {
    var fmtr = serviceLocator.getService('valueFormatter');
    var format = 'format';
    var args;
    if (column.type === 'date' || column.type === 'datetime' || column.type === 'dateonly') {
        args = { type: column.type === 'dateonly' ? 'date' : column.type, skeleton: column.format };
        if ((typeof (column.format) === 'string') && column.format !== 'yMd') {
            args["" + format] = column.format;
        }
    }
    switch (column.type) {
        case 'date':
            column.setFormatter(fmtr.getFormatFunction(args));
            column.setParser(fmtr.getParserFunction(args));
            break;
        case 'dateonly':
            column.setFormatter(fmtr.getFormatFunction(args));
            column.setParser(fmtr.getParserFunction(args));
            break;
        case 'datetime':
            column.setFormatter(fmtr.getFormatFunction(args));
            column.setParser(fmtr.getParserFunction(args));
            break;
        case 'number':
            column.setFormatter(fmtr.getFormatFunction({ format: column.format }));
            column.setParser(fmtr.getParserFunction({ format: column.format }));
            break;
    }
}
/**
 * @param {Element} cells - Defines the cell element
 * @param {boolean} add - Defines the add
 * @param {string} args - Defines the args
 * @returns {void}
 * @hidden
 */
export function addRemoveActiveClasses(cells, add) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    for (var i = 0, len = cells.length; i < len; i++) {
        if (add) {
            classList(cells[parseInt(i.toString(), 10)], args.slice(), []);
            cells[parseInt(i.toString(), 10)].setAttribute('aria-selected', 'true');
        }
        else {
            classList(cells[parseInt(i.toString(), 10)], [], args.slice());
            cells[parseInt(i.toString(), 10)].removeAttribute('aria-selected');
        }
    }
}
/**
 * @param {string} result - Defines th string
 * @returns {string} Returns the distinct staing values
 * @hidden
 */
export function distinctStringValues(result) {
    var temp = {};
    var res = [];
    for (var i = 0; i < result.length; i++) {
        if (!(result[parseInt(i.toString(), 10)] in temp)) {
            res.push(result[parseInt(i.toString(), 10)].toString());
            temp[result[parseInt(i.toString(), 10)]] = 1;
        }
    }
    return res;
}
/**
 * @param {Element} target - Defines the target
 * @param {Dialog} dialogObj - Defines the dialog
 * @returns {void}
 * @hidden
 */
export function getFilterMenuPostion(target, dialogObj) {
    var elementVisible = dialogObj.element.style.display;
    dialogObj.element.style.display = 'block';
    var dlgWidth = dialogObj.width;
    var newpos = calculateRelativeBasedPosition(target, dialogObj.element);
    dialogObj.element.style.display = elementVisible;
    dialogObj.element.style.top = (newpos.top + target.getBoundingClientRect().height) - 5 + 'px';
    var leftPos = ((newpos.left - dlgWidth) + target.clientWidth);
    if (leftPos < 1) {
        dialogObj.element.style.left = (dlgWidth + leftPos) - 16 + 'px'; // right calculation
    }
    else {
        dialogObj.element.style.left = leftPos + -4 + 'px';
    }
}
/**
 * @param {Object} args - Defines the args
 * @param {Popup} args.popup - Defines the args for popup
 * @param {Dialog} dialogObj - Defines the dialog obj
 * @returns {void}
 * @hidden
 */
export function getZIndexCalcualtion(args, dialogObj) {
    args.popup.element.style.zIndex = (dialogObj.zIndex + 1).toString();
}
/**
 * @param {string} operator - Defines the operator
 * @param {string} columnUid - Defines the column uid
 * @param {Column} column - Defines the column
 * @param {string} columnType - Defines the column type
 * @param {Dialog} dlgObj - Defines the dialog
 * @param {string} previousValue - Defines the previous operator
 * @returns {void}
 * @hidden
 */
export function toggleFilterUI(operator, columnUid, column, columnType, dlgObj, previousValue) {
    if (isNullOrUndefined(column.filterTemplate)) {
        var columnID = '';
        if (columnType === 'string') {
            columnID = 'strui-' + columnUid;
        }
        else if (columnType === 'number') {
            columnID = 'numberui-' + columnUid;
        }
        else if (columnType === 'boolean') {
            columnID = 'bool-ui-' + columnUid;
        }
        else if (columnType === 'date') {
            columnID = 'dateui-' + columnUid;
        }
        var isPreviousValue = previousValue === 'in' || previousValue === 'notin';
        var isMultiSelect = operator === 'in' || operator === 'notin';
        var multiselectParent = parentsUntil(dlgObj.element.querySelector("#multiselect" + columnID), 'e-control-wrapper');
        var singleInputParent = parentsUntil(dlgObj.element.querySelector("#" + columnID), (column.isForeignColumn() && (isMultiSelect !== isPreviousValue)) ?
            'e-flmenu-input' : 'e-popup-flmenu');
        if (multiselectParent) {
            multiselectParent.style.display = isMultiSelect ? 'inline-flex' : 'none';
        }
        if (singleInputParent) {
            singleInputParent.style.display = isMultiSelect ? 'none' : 'inline-flex';
        }
    }
}
/**
 * @param {Element} elem - Defines the element
 * @returns {void}
 * @hidden
 */
export function toogleCheckbox(elem) {
    var span = elem.querySelector('.e-frame');
    var input = span.previousSibling;
    if (span.classList.contains('e-check')) {
        input.checked = false;
        classList(span, ['e-uncheck'], ['e-check']);
    }
    else {
        input.checked = true;
        classList(span, ['e-check'], ['e-uncheck']);
    }
}
/**
 * @param {HTMLInputElement} elem - Defines the element
 * @param {boolean} checked - Defines is checked
 * @returns {void}
 * @hidden
 */
export function setChecked(elem, checked) {
    elem.checked = checked;
}
/**
 * @param {string} uid - Defines the string
 * @param {Element} elem - Defines the Element
 * @param {string} className - Defines the classname
 * @returns {Element} Returns the box wrap
 * @hidden
 */
export function createCboxWithWrap(uid, elem, className) {
    var div = createElement('div', { className: className });
    div.appendChild(elem);
    div.setAttribute('uid', uid);
    return div;
}
/**
 * @param {Element} elem - Defines the element
 * @param {boolean} checked - Defines is checked
 * @returns {void}
 * @hidden
 */
export function removeAddCboxClasses(elem, checked) {
    removeClass([elem], ['e-check', 'e-stop', 'e-uncheck']);
    if (checked) {
        elem.classList.add('e-check');
    }
    else {
        elem.classList.add('e-uncheck');
    }
}
/**
 * Refresh the Row model's foreign data.
 *
 * @param {IRow<Column>} row - Grid Row model object.
 * @param {Column[]} columns - Foreign columns array.
 * @param {Object} data - Updated Row data.
 * @returns {void}
 * @hidden
 */
export function refreshForeignData(row, columns, data) {
    for (var i = 0; i < (!isNullOrUndefined(columns) ? columns.length : 0); i++) {
        setValue(columns[parseInt(i.toString(), 10)].field, getForeignData(columns[parseInt(i.toString(), 10)], data), row.foreignKeyData);
    }
    var cells = row.cells;
    for (var i = 0; i < cells.length; i++) {
        if (cells[parseInt(i.toString(), 10)].isForeignKey) {
            setValue('foreignKeyData', getValue(cells[parseInt(i.toString(), 10)].column.field, row.foreignKeyData), cells[parseInt(i.toString(), 10)]);
        }
    }
}
/**
 * Get the foreign data for the corresponding cell value.
 *
 * @param {Column} column - Foreign Key column
 * @param {Object} data - Row data.
 * @param {string | number} lValue - cell value.
 * @param {Object} foreignKeyData - foreign data source.
 * @returns {Object} Returns the object
 * @hidden
 */
export function getForeignData(column, data, lValue, foreignKeyData) {
    var fField = column.foreignKeyField;
    var key = (!isNullOrUndefined(lValue) ? lValue : valueAccessor(column.field, data, column));
    key = isNullOrUndefined(key) ? '' : key;
    var query = new Query();
    var fdata = foreignKeyData || ((column.dataSource instanceof DataManager) && column.dataSource.dataSource.json.length ?
        column.dataSource.dataSource.json : column.columnData);
    if (key.getDay) {
        query.where(getDatePredicate({ field: fField, operator: 'equal', value: key, matchCase: false }));
    }
    else {
        query.where(fField, '==', key, false);
    }
    return new DataManager(fdata).executeLocal(query);
}
/**
 * To use to get the column's object by the foreign key value.
 *
 * @param {string} foreignKeyValue - Defines ForeignKeyValue.
 * @param {Column[]} columns - Array of column object.
 * @returns {Column} Returns the element
 * @hidden
 */
export function getColumnByForeignKeyValue(foreignKeyValue, columns) {
    var column;
    return columns.some(function (col) {
        column = col;
        return col.foreignKeyValue === foreignKeyValue;
    }) && column;
}
/**
 * @param {number} value - Defines the date or month value
 * @returns {string} Returns string
 * @hidden
 */
export function padZero(value) {
    if (value < 10) {
        return '0' + value;
    }
    return String(value);
}
/**
 * @param {PredicateModel} filterObject - Defines the filterObject
 * @param {string} type - Defines the type
 * @param {boolean} isExecuteLocal - Defines whether the data actions performed in client and used for dateonly type field
 * @returns {Predicate} Returns the Predicate
 * @hidden
 */
export function getDatePredicate(filterObject, type, isExecuteLocal) {
    var datePredicate;
    var prevDate;
    var nextDate;
    var prevObj = baseExtend({}, getActualProperties(filterObject));
    var nextObj = baseExtend({}, getActualProperties(filterObject));
    if (isNullOrUndefined(filterObject.value) || filterObject.value === '') {
        datePredicate = new Predicate(prevObj.field, prevObj.operator, prevObj.value, false);
        return datePredicate;
    }
    var value = new Date(filterObject.value);
    if (type === 'dateonly' && !isExecuteLocal) {
        if (typeof (prevObj.value) === 'string') {
            prevObj.value = new Date(prevObj.value);
        }
        var dateOnlyString = prevObj.value.getFullYear() + '-' + padZero(prevObj.value.getMonth() + 1) + '-' + padZero(prevObj.value.getDate());
        var predicates = new Predicate(prevObj.field, prevObj.operator, dateOnlyString, false);
        datePredicate = predicates;
    }
    else {
        filterObject.operator = filterObject.operator.toLowerCase();
        if (filterObject.operator === 'equal' || filterObject.operator === 'notequal') {
            if (type === 'datetime') {
                prevDate = new Date(value.setSeconds(value.getSeconds() - 1));
                nextDate = new Date(value.setSeconds(value.getSeconds() + 2));
                filterObject.value = new Date(value.setSeconds(nextDate.getSeconds() - 1));
            }
            else {
                prevDate = new Date(value.setHours(0) - 1);
                nextDate = new Date(value.setHours(24));
            }
            prevObj.value = prevDate;
            nextObj.value = nextDate;
            if (filterObject.operator === 'equal') {
                prevObj.operator = 'greaterthan';
                nextObj.operator = 'lessthan';
            }
            else if (filterObject.operator === 'notequal') {
                prevObj.operator = 'lessthanorequal';
                nextObj.operator = 'greaterthanorequal';
            }
            var predicateSt = new Predicate(prevObj.field, prevObj.operator, prevObj.value, false);
            var predicateEnd = new Predicate(nextObj.field, nextObj.operator, nextObj.value, false);
            datePredicate = filterObject.operator === 'equal' ? predicateSt.and(predicateEnd) : predicateSt.or(predicateEnd);
        }
        else {
            if (type === 'date' && (filterObject.operator === 'lessthanorequal' || filterObject.operator === 'greaterthan')) {
                prevObj.value = new Date(value.setHours(24) - 1);
            }
            if (typeof (prevObj.value) === 'string') {
                prevObj.value = new Date(prevObj.value);
            }
            var predicates = new Predicate(prevObj.field, prevObj.operator, prevObj.value, false);
            datePredicate = predicates;
        }
    }
    if (filterObject.setProperties) {
        filterObject.setProperties({ ejpredicate: datePredicate }, true);
    }
    else {
        filterObject.ejpredicate = datePredicate;
    }
    return datePredicate;
}
/**
 * @param {IGrid} grid - Defines the IGrid
 * @returns {boolean} Returns true if group adaptive is true
 * @hidden
 */
export function isGroupAdaptive(grid) {
    return grid.enableVirtualization && grid.groupSettings.columns.length > 0 && grid.isVirtualAdaptive &&
        !grid.groupSettings.enableLazyLoading;
}
/**
 * @param {string} field - Defines the Field
 * @param {Object} object - Defines the objec
 * @returns {any} Returns the object
 * @hidden
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getObject(field, object) {
    if (field === void 0) { field = ''; }
    if (field) {
        var value = object;
        var splits = field.split('.');
        for (var i = 0; i < splits.length && !isNullOrUndefined(value); i++) {
            value = value[splits[parseInt(i.toString(), 10)]];
            if (isUndefined(value)) {
                var newCase = splits[parseInt(i.toString(), 10)].charAt(0).toUpperCase()
                    + splits[parseInt(i.toString(), 10)].slice(1);
                value = object["" + newCase] || object[("" + newCase).charAt(0).toLowerCase() + ("" + newCase).slice(1)];
            }
        }
        return value;
    }
}
/**
 * @param {string | Object} format - defines the format
 * @param {string} colType - Defines the coltype
 * @returns {string} Returns the custom Data format
 * @hidden
 */
export function getCustomDateFormat(format, colType) {
    var intl = new Internationalization();
    var formatvalue;
    var formatter = 'format';
    var type = 'type';
    if (colType === 'date') {
        formatvalue = typeof (format) === 'object' ?
            intl.getDatePattern({ type: format["" + type] ? format["" + type] : 'date', format: format["" + formatter] }, false) :
            intl.getDatePattern({ type: 'dateTime', skeleton: format }, false);
    }
    else {
        formatvalue = typeof (format) === 'object' ?
            intl.getDatePattern({ type: format["" + type] ? format["" + type] : 'dateTime', format: format["" + formatter] }, false) :
            intl.getDatePattern({ type: 'dateTime', skeleton: format }, false);
    }
    return formatvalue;
}
/**
 * @param {IGrid} gObj - Defines the IGrid
 * @param {HierarchyGridPrintMode} hierarchyPrintMode - Defines the hierarchyPrintMode
 * @returns {Object} Returns the object
 * @hidden
 */
export function getExpandedState(gObj, hierarchyPrintMode) {
    var rows = gObj.getRowsObject();
    var obj = {};
    for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
        var row = rows_1[_i];
        if (row.isExpand && !row.isDetailRow) {
            var index = gObj.allowPaging && gObj.printMode === 'AllPages' ? row.index +
                (gObj.pageSettings.currentPage * gObj.pageSettings.pageSize) - gObj.pageSettings.pageSize : row.index;
            if (!isNullOrUndefined(index)) {
                obj[parseInt(index.toString(), 10)] = {};
                obj[parseInt(index.toString(), 10)].isExpand = true;
                if (gObj.childGrid) {
                    obj[parseInt(index.toString(), 10)].gridModel = getPrintGridModel(row.childGrid, hierarchyPrintMode);
                    obj[parseInt(index.toString(), 10)].gridModel.query = gObj.childGrid.query;
                }
            }
        }
    }
    return obj;
}
/**
 * @param {IGrid} gObj - Defines the grid objct
 * @param {HierarchyGridPrintMode} hierarchyPrintMode - Defines the hierarchyPrintMode
 * @returns {IGrid} Returns the IGrid
 * @hidden
 */
export function getPrintGridModel(gObj, hierarchyPrintMode) {
    if (hierarchyPrintMode === void 0) { hierarchyPrintMode = 'Expanded'; }
    var printGridModel = {};
    if (!gObj) {
        return printGridModel;
    }
    for (var _i = 0, _a = Print.printGridProp; _i < _a.length; _i++) {
        var key = _a[_i];
        if (key === 'columns') {
            printGridModel["" + key] = getActualPropFromColl(gObj["" + key]);
        }
        else if (key === 'allowPaging') {
            printGridModel["" + key] = gObj.printMode === 'CurrentPage';
        }
        else {
            printGridModel["" + key] = getActualProperties(gObj["" + key]);
        }
    }
    printGridModel['enableHover'] = false;
    if ((gObj.childGrid || gObj.detailTemplate) && hierarchyPrintMode !== 'None') {
        printGridModel.expandedRows = getExpandedState(gObj, hierarchyPrintMode);
    }
    return printGridModel;
}
/**
 * @param {Object} copied - Defines the copied object
 * @param {Object} first - Defines the first object
 * @param {Object} second - Defines the second object
 * @param {boolean} deep - Defines the deep
 * @returns {Object} Returns the extended object
 * @hidden
 */
export function extendObjWithFn(copied, first, second, deep) {
    var res = copied || {};
    var len = arguments.length;
    if (deep) {
        len = len - 1;
    }
    for (var i = 1; i < len; i++) {
        // eslint-disable-next-line prefer-rest-params
        if (!arguments[parseInt(i.toString(), 10)]) {
            continue;
        }
        // eslint-disable-next-line prefer-rest-params
        var obj1 = arguments[parseInt(i.toString(), 10)];
        var keys = Object.keys(Object.getPrototypeOf(obj1)).length ?
            Object.keys(obj1).concat(getPrototypesOfObj(obj1)) : Object.keys(obj1);
        for (var i_1 = 0; i_1 < keys.length; i_1++) {
            var source = res[keys[parseInt(i_1.toString(), 10)]];
            var cpy = obj1[keys[parseInt(i_1.toString(), 10)]];
            var cln = void 0;
            if (deep && (isObject(cpy) || Array.isArray(cpy))) {
                if (isObject(cpy)) {
                    cln = source ? source : {};
                    res[keys[parseInt(i_1.toString(), 10)]] = baseExtend({}, cln, cpy, deep);
                }
                else {
                    cln = source ? source : [];
                    res[keys[parseInt(i_1.toString(), 10)]] = baseExtend([], cln, cpy, deep);
                }
            }
            else {
                res[keys[parseInt(i_1.toString(), 10)]] = cpy;
            }
        }
    }
    return res;
}
/**
 * @param {Object} obj - Defines the obj
 * @returns {string[]} Returns the string
 * @hidden
 */
export function getPrototypesOfObj(obj) {
    var keys = [];
    while (Object.getPrototypeOf(obj) && Object.keys(Object.getPrototypeOf(obj)).length) {
        keys = keys.concat(Object.keys(Object.getPrototypeOf(obj)));
        obj = Object.getPrototypeOf(obj);
    }
    return keys;
}
/**
 * @param {Column[]} column - Defines the Column
 * @returns {number} Returns the column Depth
 * @hidden
 */
export function measureColumnDepth(column) {
    var max = 0;
    for (var i = 0; i < (!isNullOrUndefined(column) ? column.length : 0); i++) {
        var depth = checkDepth(column[parseInt(i.toString(), 10)], 0);
        if (max < depth) {
            max = depth;
        }
    }
    return max + 1;
}
/**
 * @param {Column} col - Defines the Column
 * @param {number} index - Defines the index
 * @returns {number} Returns the depth
 * @hidden
 */
export function checkDepth(col, index) {
    var max = index;
    var indices = [];
    if (col.columns) {
        index++;
        for (var i = 0; i < col.columns.length; i++) {
            indices[parseInt(i.toString(), 10)] = checkDepth(col.columns[parseInt(i.toString(), 10)], index);
        }
        for (var j = 0; j < indices.length; j++) {
            if (max < indices[parseInt(j.toString(), 10)]) {
                max = indices[parseInt(j.toString(), 10)];
            }
        }
        index = max;
    }
    return index;
}
/**
 * @param {IGrid} gObj - Defines the IGrid
 * @param {PredicateModel[]} filteredCols - Defines the PredicateModel
 * @returns {void}
 * @hidden
 */
export function refreshFilteredColsUid(gObj, filteredCols) {
    for (var i = 0; i < filteredCols.length; i++) {
        filteredCols[parseInt(i.toString(), 10)].uid = filteredCols[parseInt(i.toString(), 10)].isForeignKey ?
            getColumnByForeignKeyValue(filteredCols[parseInt(i.toString(), 10)].field, gObj.getForeignKeyColumns()).uid
            : gObj.enableColumnVirtualization ? getColumnModelByFieldName(gObj, filteredCols[parseInt(i.toString(), 10)].field).uid
                : gObj.getColumnByField(filteredCols[parseInt(i.toString(), 10)].field).uid;
    }
}
/** @hidden */
// eslint-disable-next-line @typescript-eslint/no-namespace
export var Global;
(function (Global) {
    // eslint-disable-next-line prefer-const
    Global.timer = null;
})(Global || (Global = {}));
/**
 * @param {Element} element - Defines the element
 * @returns {Object} Returns the transform values
 * @hidden
 */
export function getTransformValues(element) {
    var style = document.defaultView.getComputedStyle(element, null);
    var transformV = style.getPropertyValue('transform');
    var replacedTv = transformV.replace(/,/g, '');
    var translateX = parseFloat((replacedTv).split(' ')[4]);
    var translateY = parseFloat((replacedTv).split(' ')[5]);
    return { width: translateX, height: translateY };
}
/**
 * @param {Element} rootElement - Defines the root Element
 * @param {Element} element - Defines the element
 * @returns {void}
 * @hidden
 */
export function applyBiggerTheme(rootElement, element) {
    if (rootElement.classList.contains('e-bigger')) {
        element.classList.add('e-bigger');
    }
}
/**
 * @param {IGrid} gObj - Defines grid object
 * @returns {number}  - Returns scroll width
 * @hidden
 */
export function getScrollWidth(gObj) {
    var scrollElem = gObj.getContent().firstElementChild;
    return scrollElem.scrollWidth > scrollElem.offsetWidth ? getScrollBarWidth() : 0;
}
/**
 * @param {IGrid} gObj - Defines grid object
 * @param {number} idx - Defines the index
 * @returns {number} Returns colSpan index
 * @hidden
 */
export function resetColspanGroupCaption(gObj, idx) {
    var colspan = 0;
    var cols = gObj.getColumns();
    var width = idx * 30;
    if (gObj.isRowDragable()) {
        colspan++;
        width += 30;
    }
    colspan += (gObj.groupSettings.columns.length - idx);
    width += (30 * (gObj.groupSettings.columns.length - idx));
    var gridWidth = (gObj.width === 'auto' ? gObj.element.offsetWidth : gObj.width.toString().indexOf('%') !== -1 ?
        gObj.element.getBoundingClientRect().width : parseInt(gObj.width.toString(), 10)) - getScrollWidth(gObj);
    for (var i = 0; i < cols.length; i++) {
        if (cols[parseInt(i.toString(), 10)].visible) {
            width += parseInt(cols[parseInt(i.toString(), 10)].width.toString(), 10);
            colspan++;
        }
        if (width > gridWidth) {
            colspan--;
            break;
        }
    }
    return colspan;
}
/**
 * @param {HTMLElement} tr - Defines the tr Element
 * @param {IGrid} gObj - Defines grid object
 * @returns {void}
 * @hidden
 */
export function groupCaptionRowLeftRightPos(tr, gObj) {
    var width = 0;
    var idx = 0;
    var frozenCount = gObj.getVisibleFrozenLeftCount();
    for (var j = 0; j < tr.childNodes.length; j++) {
        var td = tr.childNodes[parseInt(j.toString(), 10)];
        if (frozenCount === idx) {
            break;
        }
        if (td.classList.contains('e-groupcaption') || td.classList.contains('e-summarycell')) {
            idx += parseInt(td.getAttribute('colspan'), 10);
        }
        td.classList.add('e-leftfreeze');
        if (td.classList.contains('e-groupcaption') && parseInt(td.getAttribute('colspan'), 10) === 1) {
            td.classList.add('e-freezeleftborder');
        }
        applyStickyLeftRightPosition(td, width, gObj.enableRtl, 'Left');
        if (td.classList.contains('e-indentcell') || td.classList.contains('e-recordplusexpand') ||
            td.classList.contains('e-recordpluscollapse')) {
            width += 30;
        }
        if (td.classList.contains('e-groupcaption')) {
            var colspan = parseInt(td.getAttribute('colspan'), 10);
            if (gObj.isRowDragable()) {
                colspan--;
                width += 30;
            }
            colspan = colspan - (gObj.groupSettings.columns.length - j);
            width = width + (30 * (gObj.groupSettings.columns.length - j));
            var cols = gObj.getColumns();
            for (var i = 0; i < cols.length; i++) {
                if ((parseInt(td.getAttribute('colspan'), 10) > 1) &&
                    (parseInt(cols[parseInt(i.toString(), 10)].width.toString(), 10)
                        + width) > (parseInt(gObj.width.toString(), 10) - getScrollWidth(gObj))) {
                    var newColspan = resetColspanGroupCaption(gObj, j);
                    td.setAttribute('colspan', newColspan.toString());
                    break;
                }
                if (cols[parseInt(i.toString(), 10)].visible) {
                    width += parseInt(cols[parseInt(i.toString(), 10)].width.toString(), 10);
                    colspan--;
                }
                if (colspan === 0) {
                    break;
                }
            }
        }
        if (td.classList.contains('e-summarycell')) {
            var uid_1 = td.getAttribute('e-mappinguid');
            var column = gObj.getColumnByUid(uid_1);
            width += parseInt(column.width.toString(), 10);
        }
    }
}
/**
 * @param {Element} row - Defines row element
 * @param {IGrid} gridObj - Defines grid object
 * @returns {boolean} Returns isRowEnteredInGrid
 * @hidden
 */
export function ensureLastRow(row, gridObj) {
    var content = gridObj.getContent().firstElementChild;
    return row && (row.getBoundingClientRect().top - content.getBoundingClientRect().top +
        gridObj.getRowHeight()) > content.offsetHeight;
}
/**
 * @param {Element} row - Defines row element
 * @param {number} rowTop - Defines row top number
 * @returns {boolean} Returns first row is true
 * @hidden
 */
export function ensureFirstRow(row, rowTop) {
    return row && row.getBoundingClientRect().top < rowTop;
}
/**
 * @param {number} index - Defines index
 * @param {IGrid} gObj - Defines grid object
 * @returns {boolean} Returns isRowEnteredInGrid
 * @hidden
 */
export function isRowEnteredInGrid(index, gObj) {
    var rowHeight = gObj.getRowHeight();
    var startIndex = gObj.getContent().firstElementChild.scrollTop / rowHeight;
    var endIndex = startIndex + (gObj.getContent().firstElementChild.offsetHeight / rowHeight);
    return index < endIndex && index > startIndex;
}
/**
 * @param {IGrid} gObj - Defines the grid object
 * @param {Object} data - Defines the query
 * @returns {number} Returns the edited data index
 * @hidden
 */
export function getEditedDataIndex(gObj, data) {
    var keyField = gObj.getPrimaryKeyFieldNames()[0];
    var dataIndex;
    gObj.getCurrentViewRecords().filter(function (e, index) {
        if (keyField.includes('.')) {
            var currentValue = getObject(keyField, e);
            var originalValue = getObject(keyField, data);
            if (currentValue === originalValue) {
                dataIndex = index;
            }
        }
        else {
            if (e["" + keyField] === data["" + keyField]) {
                dataIndex = index;
            }
        }
    });
    return dataIndex;
}
/**
 * @param {Object} args - Defines the argument
 * @param {Query} query - Defines the query
 * @returns {FilterStateObj} Returns the filter state object
 * @hidden
 */
export function eventPromise(args, query) {
    var state = getStateEventArgument(query);
    var def = new Deferred();
    state.dataSource = def.resolve;
    state.action = args;
    return { state: state, deffered: def };
}
/**
 * @param {Query} query - Defines the query
 * @returns {Object} Returns the state event argument
 * @hidden
 */
export function getStateEventArgument(query) {
    var adaptr = new UrlAdaptor();
    var dm = new DataManager({ url: '', adaptor: new UrlAdaptor });
    var state = adaptr.processQuery(dm, query);
    var data = JSON.parse(state.data);
    return data;
}
/**
 * @param {IGrid} gObj - Defines the Igrid
 * @returns {boolean} Returns the ispercentageWidth
 * @hidden
 */
export function ispercentageWidth(gObj) {
    var columns = gObj.getVisibleColumns();
    var percentageCol = 0;
    var undefinedWidthCol = 0;
    for (var i = 0; i < columns.length; i++) {
        if (isUndefined(columns[parseInt(i.toString(), 10)].width)) {
            undefinedWidthCol++;
        }
        else if (columns[parseInt(i.toString(), 10)].width.toString().indexOf('%') !== -1) {
            percentageCol++;
        }
    }
    return (gObj.width === 'auto' || typeof (gObj.width) === 'string' && gObj.width.indexOf('%') !== -1) &&
        !gObj.groupSettings.showGroupedColumn && gObj.groupSettings.columns.length
        && percentageCol && !undefinedWidthCol;
}
/**
 * @param {IGrid} gObj - Defines the IGrid
 * @param {Row<Column>[]} rows - Defines the row
 * @param {HTMLTableRowElement[]} rowElms - Row elements
 * @param {number} index - Row index
 * @param {number} startRowIndex - Start Row Index
 * @returns {void}
 * @hidden
 */
export function resetRowIndex(gObj, rows, rowElms, index, startRowIndex) {
    var startIndex = index ? index : 0;
    for (var i = startRowIndex ? startRowIndex : 0; i < rows.length; i++) {
        if (rows[parseInt(i.toString(), 10)] && rows[parseInt(i.toString(), 10)].isDataRow) {
            rows[parseInt(i.toString(), 10)].index = startIndex;
            rows[parseInt(i.toString(), 10)].isAltRow = gObj.enableAltRow ? startIndex % 2 !== 0 : false;
            rowElms[parseInt(i.toString(), 10)].setAttribute(literals.ariaRowIndex, (startIndex + 1).toString());
            if (rows[parseInt(i.toString(), 10)].isAltRow) {
                rowElms[parseInt(i.toString(), 10)].classList.add('e-altrow');
            }
            else {
                rowElms[parseInt(i.toString(), 10)].classList.remove('e-altrow');
            }
            for (var j = 0; j < rowElms[parseInt(i.toString(), 10)].cells.length; j++) {
                rowElms[parseInt(i.toString(), 10)].cells[parseInt(j.toString(), 10)].setAttribute('index', startIndex.toString());
            }
            startIndex++;
        }
    }
    if (!rows.length) {
        gObj.renderModule.emptyRow(true);
    }
}
/**
 * @param {IGrid} gObj - Defines the IGrid
 * @returns {void}
 * @hidden
 */
export function resetCachedRowIndex(gObj) {
    var rowObjects = gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache ?
        gObj.getRowsObject() : gObj.vRows;
    var rowElements = gObj.getRows();
    for (var i = 0, startIndex = 0, k = 0; i < rowObjects.length; i++) {
        var rowObject = rowObjects[parseInt(i.toString(), 10)];
        if (rowObject.isDataRow) {
            rowObject.index = startIndex;
            rowObject.isAltRow = gObj.enableAltRow ? startIndex % 2 !== 0 : false;
            var rowElement = gObj.getRowElementByUID(rowObject.uid);
            if (!isNullOrUndefined(rowElement)) {
                rowElements[parseInt(k.toString(), 10)] = rowElement;
                rowElement.setAttribute(literals.ariaRowIndex, (startIndex + 1).toString());
                if (rowObject.isAltRow) {
                    rowElement.classList.add('e-altrow');
                }
                else {
                    rowElement.classList.remove('e-altrow');
                }
                for (var j = 0; j < rowElement.cells.length; j++) {
                    rowElement.cells[parseInt(j.toString(), 10)].setAttribute('index', startIndex.toString());
                }
                k++;
            }
            startIndex++;
        }
    }
    if (gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache) {
        gObj.infiniteScrollModule.resetInfiniteCache(rowObjects);
    }
}
/**
 * @param {IGrid} gObj - Defines the IGrid
 * @param {RowDropEventArgs} args - Defines the row drop event argument
 * @param {HTMLTableRowElement[]} tr - Row elements
 * @param {Row<Column>} dropRObj - dropped row object
 * @returns {void}
 * @hidden
 */
export function groupReorderRowObject(gObj, args, tr, dropRObj) {
    var rowObjects = gObj.enableVirtualization ? gObj.vRows : gObj.getRowsObject();
    var orderChangeRowObjects = [];
    var dropRowObject = dropRObj ? dropRObj :
        gObj.getRowObjectFromUID(args.target.closest('tr').getAttribute('data-uid'));
    var rowObjectDropIndex;
    for (var i = 0; i < args.rows.length; i++) {
        var orderChangeRowObject = gObj.getRowObjectFromUID(args.rows[parseInt(i.toString(), 10)].getAttribute('data-uid'));
        if (dropRowObject === orderChangeRowObject) {
            rowObjectDropIndex = rowObjects.indexOf(dropRowObject);
        }
        orderChangeRowObjects.push(rowObjects.splice(rowObjects.indexOf(orderChangeRowObject), 1)[0]);
    }
    if (isNullOrUndefined(rowObjectDropIndex)) {
        rowObjectDropIndex = rowObjects.indexOf(dropRowObject);
        if (args.fromIndex > args.dropIndex) {
            rowObjects.splice.apply(rowObjects, [rowObjectDropIndex, 0].concat(orderChangeRowObjects));
        }
        else {
            rowObjects.splice.apply(rowObjects, [rowObjectDropIndex + 1, 0].concat(orderChangeRowObjects));
        }
    }
    else {
        rowObjects.splice.apply(rowObjects, [rowObjectDropIndex, 0].concat(orderChangeRowObjects));
    }
    if (!gObj.enableVirtualization && !gObj.infiniteScrollSettings.enableCache) {
        var record = {};
        var currentViewData = gObj.getCurrentViewRecords();
        for (var i = 0, len = tr.length; i < len; i++) {
            var index = parseInt(tr[parseInt(i.toString(), 10)].getAttribute(literals.ariaRowIndex), 10) - 1;
            record[parseInt(i.toString(), 10)] = currentViewData[parseInt(index.toString(), 10)];
        }
        var rows = gObj.getRows();
        for (var i = 0, len = tr.length; i < len; i++) {
            rows[parseInt(i.toString(), 10)] = tr[parseInt(i.toString(), 10)];
            currentViewData[parseInt(i.toString(), 10)] = record[parseInt(i.toString(), 10)];
        }
    }
    if (gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache) {
        gObj.infiniteScrollModule.resetInfiniteCache(rowObjects);
    }
}
/**
 * @param {IGrid} gObj - Defines the grid object
 * @param {Object} changes - Defines the changes
 * @param {string} type - Defines the type
 * @param {string} keyField - Defines the keyfield
 * @returns {void}
 * @hidden
 */
export function compareChanges(gObj, changes, type, keyField) {
    var newArray = gObj.dataToBeUpdated["" + type].concat(changes["" + type]).reduce(function (r, o) {
        r[o["" + keyField]] = r[o["" + keyField]] === undefined ? o : Object.assign(r[o["" + keyField]], o);
        return r;
    }, {});
    gObj.dataToBeUpdated["" + type] = Object.keys(newArray).map(function (k) { return newArray["" + k]; });
}
/**
 * @param {IGrid} gObj - Defines the grid object
 * @returns {void}
 * @hidden
 */
export function setRowElements(gObj) {
    if (gObj.enableInfiniteScrolling && (gObj.childGrid || gObj.detailTemplate)) {
        (gObj).contentModule.rowElements = [].slice.call(gObj.getContentTable().rows)
            .filter(function (row) { return (row.classList.contains('e-row') || row.classList.contains('e-detailrow'))
            && !row.classList.contains('e-addedrow'); });
        return;
    }
    (gObj).contentModule.rowElements =
        [].slice.call(gObj.element.querySelectorAll('.e-row:not(.e-addedrow):not(.e-cloneproperties .e-row)'));
}
/**
 * @param {Element} row - Defines the row
 * @param {number} start - Defines the start index
 * @param {number} end - Defines the end index
 * @returns {void}
 * @hidden
 */
export function sliceElements(row, start, end) {
    var cells = row.children;
    var len = cells.length;
    var k = 0;
    for (var i = 0; i < len; i++, k++) {
        if (i >= start && i < end) {
            continue;
        }
        row.removeChild(row.children[parseInt(k.toString(), 10)]);
        k--;
    }
}
/**
 * @param {IGrid} gObj - Defines the grid
 * @param {Dialog} dlgObj - Defines the dialog
 * @returns {void}
 * @hidden
 */
export function resetDialogAppend(gObj, dlgObj) {
    var element = gObj.createElement('div', { className: 'e-grid-popup', id: gObj.element.id + '_e-popup' });
    var pos = calculatePosition(gObj.element, 'left', 'Top');
    if (document.getElementById(gObj.element.id + '_e-popup')) {
        element = document.getElementById(gObj.element.id + '_e-popup');
    }
    element.style.top = pos.top + 'px';
    element.style.left = pos.left + 'px';
    element.style.zIndex = (dlgObj.zIndex).toString();
    element.style.width = dlgObj.element.offsetWidth + 'px';
    element.appendChild(dlgObj.element);
    var sbPanel = document.querySelector('.sb-demo-section,.e-grid-dialog-fixed');
    if (sbPanel) {
        var sbPos = calculateRelativeBasedPosition(gObj.element, sbPanel);
        element.style.top = sbPos.top + 'px';
        element.style.left = sbPos.left + 'px';
        sbPanel.insertBefore(element, sbPanel.firstChild);
    }
    else {
        document.body.insertBefore(element, document.body.firstChild);
    }
}
/**
 * @param {Column} column - Defines the column
 * @param {string} uid - Defines the uid
 * @returns {boolean} Returns is child column
 * @hidden
 */
export function isChildColumn(column, uid) {
    var uids = [];
    uids.push(column.uid);
    pushuid(column, uids);
    if (uids.indexOf(uid) > -1) {
        return true;
    }
    else {
        return false;
    }
}
/**
 * @param {Column} column - Defines the column
 * @param {string[]} uids - Defines the uid
 * @returns {void}
 * @hidden
 */
export function pushuid(column, uids) {
    for (var i = 0; i < column.columns.length; i++) {
        if (column.columns[parseInt(i.toString(), 10)].uid) {
            uids.push(column.columns[parseInt(i.toString(), 10)].uid);
        }
        if (column.columns[parseInt(i.toString(), 10)].columns &&
            column.columns[parseInt(i.toString(), 10)].columns.length) {
            pushuid(column.columns[parseInt(i.toString(), 10)], uids);
        }
    }
}
/**
 * @param {Column} column - Defines the column
 * @returns {string} Returns the direction
 * @hidden
 */
export function frozenDirection(column) {
    if (column.columns[0].freeze || column.columns[0].isFrozen) {
        if (column.columns[0].freeze === 'Left' || column.columns[0].isFrozen) {
            return 'Left';
        }
        else if (column.columns[0].freeze === 'Right') {
            return 'Right';
        }
        else if (column.columns[0].freeze === 'Fixed') {
            return 'Fixed';
        }
        else {
            return 'None';
        }
    }
    else {
        if (column.columns[0].columns && column.columns[0].columns.length) {
            return frozenDirection(column.columns[0]);
        }
        else {
            return 'None';
        }
    }
}
/**
 * @param {Element} row - Defines the row
 * @returns {void}
 * @hidden
 */
export function addFixedColumnBorder(row) {
    if (row.querySelector('.e-fixedfreeze')) {
        var cells = [].slice.call(row.querySelectorAll('.e-filterbarcell:not(.e-hide),.e-summarycell:not(.e-hide),.e-headercell:not(.e-hide),.e-rowcell:not(.e-hide)'));
        for (var j = 0; j < cells.length; j++) {
            if (cells[parseInt(j.toString(), 10)].classList.contains('e-fixedfreeze') && (!(cells[j - 1]) ||
                (cells[j - 1] && !cells[j - 1].classList.contains('e-fixedfreeze')))) {
                cells[parseInt(j.toString(), 10)].classList.add('e-freezeleftborder');
            }
            if (cells[parseInt(j.toString(), 10)].classList.contains('e-fixedfreeze') && (!(cells[j + 1]) ||
                (cells[j + 1] && !cells[j + 1].classList.contains('e-fixedfreeze')))) {
                cells[parseInt(j.toString(), 10)].classList.add('e-freezerightborder');
            }
        }
    }
}
/**
 * @param {HTMLElement} node - Defines the row
 * @param {number} width - Defines the width
 * @param {boolean} isRtl - Boolean property
 * @param {string} position - Defines the position
 * @returns {void}
 * @hidden
 */
export function applyStickyLeftRightPosition(node, width, isRtl, position) {
    if (position === 'Left') {
        if (isRtl) {
            node.style.right = width + 'px';
        }
        else {
            node.style.left = width + 'px';
        }
    }
    if (position === 'Right') {
        if (isRtl) {
            node.style.left = width + 'px';
        }
        else {
            node.style.right = width + 'px';
        }
    }
}
/**
 * @param {IGrid} gObj - Defines the grid
 * @param {Column} column - Defines the column
 * @param {Element} node - Defines the Element
 * @param {number} colSpan - Defines the colSpan value
 * @returns {void}
 * @hidden
 */
export function resetColandRowSpanStickyPosition(gObj, column, node, colSpan) {
    var columns = gObj.getColumns();
    var index = column.index;
    if (column.freeze === 'Left' && column.border !== 'Left') {
        var idx = index + (colSpan - 1);
        while (columns[parseInt(idx.toString(), 10)].visible === false) {
            idx++;
        }
        if (columns[parseInt(idx.toString(), 10)].border === 'Left') {
            node.classList.add('e-freezeleftborder');
        }
    }
    else if (column.freeze === 'Right' || column.freeze === 'Fixed') {
        var width = 0;
        for (var j = index + 1; j < index + colSpan; j++) {
            if (j === columns.length) {
                break;
            }
            if (columns[parseInt(j.toString(), 10)].visible) {
                width += parseInt(columns[parseInt(j.toString(), 10)].width.toString(), 10);
            }
            else {
                colSpan++;
            }
        }
        if (gObj.enableRtl) {
            node.style.left = parseInt(node.style.left, 10) - width + 'px';
        }
        else {
            node.style.right = parseInt(node.style.right, 10) - width + 'px';
        }
    }
}
/**
 * @param {IGrid} gObj - Defines the grid
 * @param {number} rowIndex - Defines the row index
 * @param {number} colIndex - Defines the colum index
 * @returns {void}
 * @hidden
 */
export function getCellFromRow(gObj, rowIndex, colIndex) {
    var row = (gObj.getRowByIndex(rowIndex));
    for (var i = 0; i < row.cells.length; i++) {
        if (parseInt(row.cells[parseInt(i.toString(), 10)].getAttribute('aria-colindex').toString(), 10) - 1 === colIndex) {
            return row.cells[parseInt(i.toString(), 10)];
        }
    }
    return null;
}
/**
 * @param {IGrid} gObj - Defines the grid
 * @param {Column} column - Defines the column
 * @param {Element} node - Defines the Element
 * @returns {void}
 * @hidden
 */
export function addStickyColumnPosition(gObj, column, node) {
    if (column.freeze === 'Left' || column.isFrozen) {
        node.classList.add('e-leftfreeze');
        if (column.border === 'Left') {
            node.classList.add('e-freezeleftborder');
        }
        if (column.index === 0) {
            applyStickyLeftRightPosition(node, (gObj.getIndentCount() * 30), gObj.enableRtl, 'Left');
            if (gObj.enableColumnVirtualization) {
                column.valueX = (gObj.getIndentCount() * 30);
            }
        }
        else {
            var cols = gObj.getColumns();
            var width = gObj.getIndentCount() * 30;
            for (var i = 0; i < cols.length; i++) {
                if (column.uid === cols[parseInt(i.toString(), 10)].uid) {
                    break;
                }
                if (cols[parseInt(i.toString(), 10)].visible) {
                    width += parseFloat(cols[parseInt(i.toString(), 10)].width.toString());
                }
            }
            applyStickyLeftRightPosition(node, width, gObj.enableRtl, 'Left');
            if (gObj.enableColumnVirtualization) {
                column.valueX = width;
            }
        }
    }
    else if (column.freeze === 'Right') {
        node.classList.add('e-rightfreeze');
        var cols = gObj.getColumns();
        if (column.border === 'Right') {
            node.classList.add('e-freezerightborder');
        }
        if (column.index === cols[cols.length - 1].index) {
            var width = gObj.getFrozenMode() === 'Right' && gObj.isRowDragable() ? 30 : 0;
            applyStickyLeftRightPosition(node, width, gObj.enableRtl, 'Right');
            if (gObj.enableColumnVirtualization) {
                column.valueX = width;
            }
        }
        else {
            var width = gObj.getFrozenMode() === 'Right' && gObj.isRowDragable() ? 30 : 0;
            for (var i = cols.length - 1; i >= 0; i--) {
                if (column.uid === cols[parseInt(i.toString(), 10)].uid) {
                    break;
                }
                if (cols[parseInt(i.toString(), 10)].visible) {
                    width += parseFloat(cols[parseInt(i.toString(), 10)].width.toString());
                }
            }
            applyStickyLeftRightPosition(node, width, gObj.enableRtl, 'Right');
            if (gObj.enableColumnVirtualization) {
                column.valueX = width;
            }
        }
    }
    else if (column.freeze === 'Fixed') {
        node.classList.add('e-fixedfreeze');
        var cols = gObj.getColumns();
        var width = 0;
        if (gObj.getVisibleFrozenLeftCount()) {
            width = gObj.getIndentCount() * 30;
        }
        else if (gObj.getFrozenMode() === 'Right') {
            width = gObj.groupSettings.columns.length * 30;
        }
        for (var i = 0; i < cols.length; i++) {
            if (column.uid === cols[parseInt(i.toString(), 10)].uid) {
                break;
            }
            if ((cols[parseInt(i.toString(), 10)].freeze === 'Left' || cols[parseInt(i.toString(), 10)].isFrozen) ||
                cols[parseInt(i.toString(), 10)].freeze === 'Fixed') {
                if (cols[parseInt(i.toString(), 10)].visible) {
                    width += parseFloat(cols[parseInt(i.toString(), 10)].width.toString());
                }
            }
        }
        applyStickyLeftRightPosition(node, (width - 1), gObj.enableRtl, 'Left');
        width = gObj.getFrozenMode() === 'Right' && gObj.isRowDragable() ? 30 : 0;
        for (var i = cols.length - 1; i >= 0; i--) {
            if (column.uid === cols[parseInt(i.toString(), 10)].uid) {
                break;
            }
            if (cols[parseInt(i.toString(), 10)].freeze === 'Right' || cols[parseInt(i.toString(), 10)].freeze === 'Fixed') {
                if (cols[parseInt(i.toString(), 10)].visible) {
                    width += parseFloat(cols[parseInt(i.toString(), 10)].width.toString());
                }
            }
        }
        applyStickyLeftRightPosition(node, (width - 1), gObj.enableRtl, 'Right');
    }
    else {
        node.classList.add('e-unfreeze');
    }
}
/**
 * @param {IGrid} gObj - Defines the grid Object
 * @param {Column} col - Defines the column
 * @param {number} rowIndex - Defines the rowindex
 * @returns {Element} Returns the element
 * @hidden
 */
export function getCellsByTableName(gObj, col, rowIndex) {
    return [].slice.call(gObj.getDataRows()[parseInt(rowIndex.toString(), 10)].getElementsByClassName(literals.rowCell));
}
/**
 * @param {IGrid} gObj - Defines the column
 * @param {Column} col - Defines the index
 * @param {number} rowIndex - Defines the rules
 * @param {number} index - Defines the movable column rules
 * @returns {Element} Returns the Element
 * @hidden
 */
export function getCellByColAndRowIndex(gObj, col, rowIndex, index) {
    return getCellsByTableName(gObj, col, rowIndex)[parseInt(index.toString(), 10)];
}
/**
 * @param {Column} col - Defines the column
 * @param {number} index - Defines the index
 * @param {Object} rules - Defines the rules
 * @param {Object} mRules - Defines the movable column rules
 * @param {Object} frRules - Defines the Frozen rules
 * @param {number} len - Defines the length
 * @param {boolean} isCustom - Defines custom form validation
 * @returns {void}
 * @hidden
 */
export function setValidationRuels(col, index, rules, mRules, frRules, len, isCustom) {
    if (isCustom) {
        rules[getComplexFieldID(col.field)] = col.validationRules;
    }
    else {
        if (col.getFreezeTableName() === literals.frozenLeft
            || (!index && col.getFreezeTableName() === literals.frozenRight) || len === 1) {
            rules[getComplexFieldID(col.field)] = col.validationRules;
        }
        else if (col.getFreezeTableName() === 'movable' || !col.getFreezeTableName()) {
            mRules[getComplexFieldID(col.field)] = col.validationRules;
        }
        else if (col.getFreezeTableName() === literals.frozenRight) {
            frRules[getComplexFieldID(col.field)] = col.validationRules;
        }
    }
}
/**
 * @param {string} numberFormat - Format
 * @param {string} type - Value type
 * @param {boolean} isExcel - Boolean property
 * @param {string} currencyCode - Specifies the currency code to be used for formatting.
 * @returns {string} returns formated value
 * @hidden
 */
export function getNumberFormat(numberFormat, type, isExcel, currencyCode) {
    var format;
    var intl = new Internationalization();
    if (type === 'number') {
        try {
            format = intl.getNumberPattern({ format: numberFormat, currency: currencyCode, useGrouping: true }, true);
        }
        catch (error) {
            format = numberFormat;
        }
    }
    else if (type === 'date' || type === 'time' || type === 'datetime') {
        try {
            format = intl.getDatePattern({ skeleton: numberFormat, type: type }, isExcel);
            if (isNullOrUndefined(format)) {
                // eslint-disable-next-line
                throw 'error';
            }
        }
        catch (error) {
            try {
                format = intl.getDatePattern({ format: numberFormat, type: type }, isExcel);
            }
            catch (error) {
                format = numberFormat;
            }
        }
    }
    else {
        format = numberFormat;
    }
    if (type !== 'number') {
        var patternRegex = /G|H|c|'| a|yy|y|EEEE|E/g;
        var mtch_1 = { 'G': '', 'H': 'h', 'c': 'd', '\'': '"', ' a': ' AM/PM', 'yy': 'yy', 'y': 'yyyy', 'EEEE': 'dddd', 'E': 'ddd' };
        format = format.replace(patternRegex, function (pattern) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return mtch_1["" + pattern];
        });
    }
    return format;
}
/**
 * @param {IGrid} gObj - Grid instance
 * @returns {void}
 * @hidden
 */
export function addBiggerDialog(gObj) {
    if (gObj.enableAdaptiveUI) {
        var dialogs = document.getElementsByClassName('e-responsive-dialog');
        for (var i = 0; i < dialogs.length; i++) {
            dialogs[parseInt(i.toString(), 10)].classList.add('e-bigger');
        }
    }
}
/**
 * @param {string} value - specifies the trr
 * @param {Object} mapObject - specifies the idx
 * @returns {Object | string} returns object or string
 * @hidden
 */
export function performComplexDataOperation(value, mapObject) {
    var returnObj;
    var length = value.split('.').length;
    var splits = value.split('.');
    var duplicateMap = mapObject;
    for (var i = 0; i < length; i++) {
        returnObj = duplicateMap[splits[parseInt(i.toString(), 10)]];
        duplicateMap = returnObj;
    }
    return returnObj;
}
/**
 * @param {Object} tr - specifies the trr
 * @param {number} idx - specifies the idx
 * @param {string} displayVal - specifies the displayval
 * @param {Row<Column>} rows - specifies the rows
 * @param {IGrid} parent - Grid instance
 * @param {boolean} isContent - check for content renderer
 * @returns {void}
 * @hidden
 */
export function setDisplayValue(tr, idx, displayVal, rows, parent, isContent) {
    var trs = Object.keys(tr);
    var actualIndex = idx;
    for (var i = 0; i < trs.length; i++) {
        var td = tr[trs[parseInt(i.toString(), 10)]].querySelectorAll('td.e-rowcell')[parseInt(idx.toString(), 10)];
        if (parent && !parent.isFrozenGrid() && !parent.isRowDragable()) {
            td = (!isNullOrUndefined(td) && (parseInt(td.getAttribute('aria-colindex'), 10) - 1 === idx ||
                (parentsUntil(td, 'e-addedrow') && td.parentElement.childNodes[parseInt(idx.toString(), 10)] === td)))
                ? td : tr[parseInt(i.toString(), 10)].querySelector("td[aria-colindex=\"" + (idx + 1) + "\"]");
            if (isNullOrUndefined(td)) {
                continue;
            }
            else {
                idx = (parent.getContentTable().querySelector('.e-detailrowcollapse, .e-detailrowexpand')) ?
                    (td.cellIndex - 1) : td.cellIndex;
            }
        }
        if (tr[trs[parseInt(i.toString(), 10)]].querySelectorAll('td.e-rowcell').length && td) {
            setStyleAttribute(tr[trs[parseInt(i.toString(), 10)]].querySelectorAll('td.e-rowcell')[parseInt(idx.toString(), 10)], { 'display': displayVal });
            if (tr[trs[parseInt(i.toString(), 10)]].querySelectorAll('td.e-rowcell')[parseInt(idx.toString(), 10)].classList.contains('e-hide')) {
                removeClass([tr[trs[parseInt(i.toString(), 10)]].querySelectorAll('td.e-rowcell')[parseInt(idx.toString(), 10)]], ['e-hide']);
            }
            if ((isContent && parent.isRowDragable()) || (parent && parent.isDetail())) {
                var index = idx + 1;
                rows[trs[parseInt(i.toString(), 10)]].cells[parseInt(index.toString(), 10)].visible = displayVal === '' ? true : false;
            }
            else {
                if (!isNullOrUndefined(rows[trs[parseInt(i.toString(), 10)]])) {
                    rows[trs[parseInt(i.toString(), 10)]].cells[parseInt(idx.toString(), 10)].visible = displayVal === '' ? true : false;
                    if (rows[trs[parseInt(i.toString(), 10)]].cells[parseInt(idx.toString(), 10)].visible === false) {
                        tr[trs[parseInt(i.toString(), 10)]].querySelectorAll('td.e-rowcell')[parseInt(idx.toString(), 10)].classList.add('e-hide');
                    }
                }
            }
            idx = actualIndex;
        }
    }
}
// eslint-disable-next-line
/** @hidden */
export function addRemoveEventListener(parent, evt, isOn, module) {
    for (var _i = 0, evt_1 = evt; _i < evt_1.length; _i++) {
        var inst = evt_1[_i];
        if (isOn) {
            parent.on(inst.event, inst.handler, module);
        }
        else {
            parent.off(inst.event, inst.handler);
        }
    }
}
// eslint-disable-next-line
/** @hidden */
export function createEditElement(parent, column, classNames, attr) {
    var complexFieldName = getComplexFieldID(column.field);
    attr = Object.assign(attr, {
        id: parent.element.id + complexFieldName,
        name: complexFieldName, 'e-mappinguid': column.uid
    });
    return parent.createElement('input', {
        className: classNames, attrs: attr
    });
}
/**
 * @param {IGrid} gObj - Grid instance
 * @param {string} uid - Defines column's uid
 * @returns {Column} returns column model
 * @hidden
 */
export function getColumnModelByUid(gObj, uid) {
    var column;
    for (var _i = 0, _a = (gObj.columnModel); _i < _a.length; _i++) {
        var col = _a[_i];
        if (col.uid === uid) {
            column = col;
            break;
        }
    }
    return column;
}
/**
 * @param {IGrid} gObj - Grid instance
 * @param {string} field - Defines column's uid
 * @returns {Column} returns column model
 * @hidden
 */
export function getColumnModelByFieldName(gObj, field) {
    var column;
    if (!gObj.columnModel) {
        gObj.getColumns();
    }
    for (var _i = 0, _a = (gObj.columnModel); _i < _a.length; _i++) {
        var col = _a[_i];
        if (col.field === field) {
            column = col;
            break;
        }
    }
    return column;
}
/**
 * @param {string} id - Defines component id
 * @param {string[]} evts - Defines events
 * @param {object} handlers - Defines event handlers
 * @param {any} instance - Defines class instance
 * @returns {void}
 * @hidden
 */
// eslint-disable-next-line
export function registerEventHandlers(id, evts, handlers, instance) {
    instance.eventHandlers["" + id] = {};
    for (var i = 0; i < evts.length; i++) {
        instance.eventHandlers["" + id][evts[parseInt(i.toString(), 10)]] = handlers[evts[parseInt(i.toString(), 10)]];
    }
}
/**
 * @param {any} component - Defines component instance
 * @param {string[]} evts - Defines events
 * @param {any} instance - Defines class instance
 * @returns {void}
 * @hidden
 */
// eslint-disable-next-line
export function removeEventHandlers(component, evts, instance) {
    for (var i = 0; i < evts.length; i++) {
        if (component.isDestroyed) {
            break;
        }
        component.removeEventListener(evts[parseInt(i.toString(), 10)], instance.eventHandlers[component.element.id][evts[parseInt(i.toString(), 10)]]);
    }
}
/**
 * @param {IGrid | IXLFilter} parent - Defines parent instance
 * @param {string[]} templates - Defines the templates name which are needs to clear
 * @returns {void}
 * @hidden
 */
export function clearReactVueTemplates(parent, templates) {
    parent.destroyTemplate(templates);
    if (parent.isReact) {
        parent.renderTemplates();
    }
}
/**
 *
 * @param { HTMLElement[] } removeElem - Defines checkbox wrapper element
 * @returns {void}
 * @hidden
 */
export function infiniteRemoveElements(removeElem) {
    for (var i = 0; i < removeElem.length; i++) {
        remove(removeElem[i]);
    }
}
/**
 *
 * @param { HTMLElement[] } appendElem - Defines checkbox wrapper element
 * @param { HTMLElement } ulElement - Defines ul element
 * @returns {void}
 * @hidden
 */
export function infiniteAppendElements(appendElem, ulElement) {
    for (var i = 0; i < appendElem.length; i++) {
        ulElement.insertBefore(appendElem[i], ulElement.children[i]);
    }
}
/**
 *
 * @param { HTMLElement } element - Defines checkbox wrapper element
 * @param { boolean } isChooser - Defines checkbox filter column chooser
 * @returns { number } list height value
 * @hidden
 */
export function getListHeight(element, isChooser) {
    var listDiv = isChooser ? createElement('li', { className: 'e-cclist' })
        : createElement('div', { className: 'e-ftrchk' });
    listDiv.style.visibility = 'hidden';
    if (isChooser) {
        listDiv.style.listStyle = 'none';
    }
    listDiv.innerHTML = isChooser ? '<div class="e-ccheck"><div class="e-checkbox-wrapper"><span class="e-frame e-icons e-check"></span><span class="e-label">A</span></div></div>' :
        '<div class="e-checkbox-wrapper"><span class="e-frame e-icons e-check"></span><span class="e-label e-checkboxfiltertext">A</div></span>';
    element.appendChild(listDiv);
    var rect = listDiv.getBoundingClientRect();
    element.removeChild(listDiv);
    var listHeight = Math.round(rect.height);
    return listHeight;
}
/**
 *
 * @param { Element } row - Defines row element
 * @returns { number } row index
 */
export function getRowIndexFromElement(row) {
    return parseInt(row.getAttribute(literals.ariaRowIndex), 10) - 1;
}
/**
 *
 * @param { IGrid } grid - Defines grid instance
 * @returns { IGrid } returns parent grid instance
 */
export function getParentIns(grid) {
    return grid.parentDetails && grid.parentDetails.parentInstObj ?
        getParentIns(grid.parentDetails.parentInstObj) : grid;
}
/**
 *
 * @param { string[] } fields - Defines grouped fields
 * @param { values } values - Defines caption keys
 * @param { any } instance - Defines dynamic class instance
 * @returns { Predicate } returns filter predicate
 */
// eslint-disable-next-line
export function generateExpandPredicates(fields, values, instance) {
    var filterCols = [];
    for (var i = 0; i < fields.length; i++) {
        var column = instance.parent.getColumnByField(fields[parseInt(i.toString(), 10)]);
        var value = values[parseInt(i.toString(), 10)] === 'null' ? null : values[parseInt(i.toString(), 10)];
        var pred = {
            field: fields[parseInt(i.toString(), 10)], predicate: 'or', uid: column.uid, operator: 'equal', type: column.type,
            matchCase: instance.allowCaseSensitive, ignoreAccent: instance.parent.filterSettings.ignoreAccent
        };
        if (value === '' || isNullOrUndefined(value)) {
            filterCols = filterCols.concat(CheckBoxFilterBase.generateNullValuePredicates(pred));
        }
        else {
            filterCols.push(extend({}, { value: value }, pred));
        }
    }
    return CheckBoxFilterBase.getPredicate(filterCols);
}
/**
 *
 * @param { Predicate } pred - Defines filter predicate
 * @returns { Predicate[] } Returns formed predicate
 */
export function getPredicates(pred) {
    var predicateList = [];
    for (var _i = 0, _a = Object.keys(pred); _i < _a.length; _i++) {
        var prop = _a[_i];
        predicateList.push(pred["" + prop]);
    }
    return predicateList;
}
/**
 *
 * @param { number } index - Defines group caption indent
 * @param { Row<Column>[] } rowsObject - Defines rows object
 * @returns { { fields: string[], keys: string[] } } Returns grouped keys and values
 */
export function getGroupKeysAndFields(index, rowsObject) {
    var fields = [];
    var keys = [];
    for (var i = index; i >= 0; i--) {
        if (rowsObject[parseInt(i.toString(), 10)].isCaptionRow
            && fields.indexOf(rowsObject[parseInt(i.toString(), 10)].data.field) === -1
            && (rowsObject[parseInt(i.toString(), 10)].indent < rowsObject[parseInt(index.toString(), 10)].indent || i === index)) {
            fields.push(rowsObject[parseInt(i.toString(), 10)].data.field);
            keys.push(rowsObject[parseInt(i.toString(), 10)].data.key);
            if (rowsObject[parseInt(i.toString(), 10)].indent === 0) {
                break;
            }
        }
    }
    return { fields: fields, keys: keys };
}
// eslint-disable-next-line
/**
 *
 * @param { number[][] } checkActiveMatrix - Defines matrix to check
 * @param { number[] } checkCellIndex - Defines index to check
 * @param { boolean } next - Defines select next or previous index
 * @returns { number[] } - Returns next active current index
 */
export function findCellIndex(checkActiveMatrix, checkCellIndex, next) {
    var activeMatrix = checkActiveMatrix;
    var cellIndex = checkCellIndex;
    var currentCellIndexPass = false;
    if (next) {
        for (var i = cellIndex[0]; i < activeMatrix.length; i++) {
            var rowCell = activeMatrix[parseInt(i.toString(), 10)];
            for (var j = 0; j < rowCell.length; j++) {
                if (currentCellIndexPass && activeMatrix[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] === 1) {
                    cellIndex = [i, j];
                    return cellIndex;
                }
                if (!currentCellIndexPass && cellIndex.toString() === [i, j].toString()) {
                    currentCellIndexPass = true;
                }
            }
        }
    }
    else {
        for (var i = cellIndex[0]; i >= 0; i--) {
            var rowCell = activeMatrix[parseInt(i.toString(), 10)];
            for (var j = rowCell.length - 1; j >= 0; j--) {
                if (currentCellIndexPass && activeMatrix[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)] === 1) {
                    cellIndex = [i, j];
                    return cellIndex;
                }
                if (!currentCellIndexPass && cellIndex.toString() === [i, j].toString()) {
                    currentCellIndexPass = true;
                }
            }
        }
    }
    return cellIndex;
}
/**
 *
 * @param { string } string - Defines string need to capitalized first letter
 * @returns { string } - Returns capitalized first letter string
 */
export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 *
 * @param { IGrid } grid - Defines parent instance
 * @returns { boolean } - Returns is virtual
 */
export function checkIsVirtual(grid) {
    return !(isGroupAdaptive(grid) || grid.groupSettings.enableLazyLoading
        || (!grid.enableVirtualization && grid.enableColumnVirtualization));
}
/**
 *
 * @param { number[] } blockes - Defines block indexes
 * @returns { number[] } - Returns is visible page
 */
export function getVisiblePage(blockes) {
    var visiblePage = [];
    for (var i = 0; i < blockes.length; i++) {
        var page = Math.ceil(blockes[parseInt(i.toString(), 10)] / 2);
        if (visiblePage.indexOf(page) === -1) {
            visiblePage.push(page);
        }
    }
    return visiblePage;
}
