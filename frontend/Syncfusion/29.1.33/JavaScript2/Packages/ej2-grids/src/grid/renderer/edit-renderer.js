import { isNullOrUndefined, closest, extend } from '@syncfusion/ej2-base';
import { InlineEditRender } from './inline-edit-renderer';
import { BatchEditRender } from './batch-edit-renderer';
import { DialogEditRender } from './dialog-edit-renderer';
import { attributes, classList, select } from '@syncfusion/ej2-base';
import { CellType } from '../base/enum';
import { RowModelGenerator } from '../services/row-model-generator';
import { getComplexFieldID, getObject, appendChildren, parentsUntil, extendObjWithFn, padZero } from '../base/util';
import * as events from '../base/constant';
import * as literals from '../base/string-literals';
/**
 * Edit render module is used to render grid edit row.
 *
 * @hidden
 */
var EditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {IGrid} parent -specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the serviceLocator
     */
    function EditRender(parent, serviceLocator) {
        //Internal variables
        this.editType = {
            'Inline': InlineEditRender,
            'Normal': InlineEditRender, 'Batch': BatchEditRender, 'Dialog': DialogEditRender
        };
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.renderer = new this.editType[this.parent.editSettings.mode](parent, serviceLocator);
        this.focus = serviceLocator.getService('focus');
    }
    EditRender.prototype.addNew = function (args) {
        this.renderer.addNew(this.getEditElements(args), args);
        this.convertWidget(args);
    };
    EditRender.prototype.update = function (args) {
        this.renderer.update(this.getEditElements(args), args);
        var isCustomFormValidation = args.isCustomFormValidation;
        if (!isCustomFormValidation) {
            this.parent.notify(events.beforeStartEdit, args);
            this.convertWidget(args);
        }
    };
    EditRender.prototype.convertWidget = function (args) {
        var gObj = this.parent;
        var isFocused;
        var cell;
        var value;
        var form = gObj.editSettings.mode === 'Dialog' ?
            select('#' + gObj.element.id + '_dialogEdit_wrapper .e-gridform', document) : gObj.editSettings.showAddNewRow &&
            gObj.element.querySelector('.e-editedrow') ? gObj.element.querySelector('.e-editedrow').getElementsByClassName('e-gridform')[0]
            : gObj.element.getElementsByClassName('e-gridform')[0];
        var cols = gObj.editSettings.mode !== 'Batch' ? gObj.getColumns() : [gObj.getColumnByField(args.columnName)];
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            if (this.parent.editSettings.template && !isNullOrUndefined(col.field)) {
                var cellArgs = extend({}, args);
                cellArgs.element = form.querySelector('[name=' + getComplexFieldID(col.field) + ']');
                if (typeof col.edit.write === 'string') {
                    getObject(col.edit.write, window)(cellArgs);
                }
                else {
                    col.edit.write(cellArgs);
                }
                continue;
            }
            if (this.parent.editModule.checkColumnIsGrouped(col) || col.commands) {
                continue;
            }
            // eslint-disable-next-line
            value = (col.valueAccessor(col.field, args.rowData, col));
            cell = form.querySelector('[e-mappinguid=' + col.uid + ']');
            var temp = col.edit.write;
            if (!isNullOrUndefined(cell)) {
                if (typeof temp === 'string') {
                    temp = getObject(temp, window);
                    temp({
                        rowData: args.rowData, element: cell, column: col, requestType: args.requestType, row: args.row,
                        foreignKeyData: col.isForeignColumn() && getObject(col.field, args.foreignKeyData)
                    });
                }
                else {
                    col.edit.write({
                        rowData: args.rowData, element: cell, column: col, requestType: args.requestType, row: args.row,
                        foreignKeyData: col.isForeignColumn() && getObject(col.field, args.foreignKeyData)
                    });
                }
                if (!isFocused && isNullOrUndefined(cell.getAttribute('disabled')) && !parentsUntil(cell, 'e-checkbox-disabled')) {
                    this.focusElement(cell, args.type);
                    isFocused = true;
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    EditRender.prototype.focusElement = function (elem, type) {
        var chkBox = this.parent.element.querySelector('.e-edit-checkselect');
        if (!isNullOrUndefined(chkBox) && chkBox.nextElementSibling) {
            chkBox.nextElementSibling.classList.add('e-focus');
        }
        if (this.parent.editSettings.mode === 'Batch') {
            this.focus.onClick({ target: closest(elem, 'td') }, true);
        }
        else {
            var isFocus = (this.parent.enableVirtualization || this.parent.enableColumnVirtualization) && this.parent.editSettings.mode === 'Normal' ? false : true;
            var focusElement = elem.classList.contains('e-dropdownlist') ? elem.parentElement : elem;
            if ((isFocus || ((this.parent.enableVirtualization || this.parent.enableColumnVirtualization) && this.parent.editSettings.newRowPosition === 'Bottom'
                && parentsUntil(elem, literals.addedRow))) && (!this.parent.editSettings.showAddNewRow ||
                (this.parent.editSettings.showAddNewRow && (!parentsUntil(elem, literals.addedRow)) || this.parent.addNewRowFocus))) {
                focusElement.focus();
                if (this.parent.enableVirtualization && this.parent.contentModule &&
                    this.parent.contentModule.content) {
                    this.parent.contentModule.content.scrollTop += this.parent.getRowHeight();
                }
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                focusElement.focus({ preventScroll: true });
            }
        }
        if (elem.classList.contains('e-defaultcell')) {
            elem.setSelectionRange(elem.value.length, elem.value.length);
        }
    };
    EditRender.prototype.getEditElements = function (args) {
        var gObj = this.parent;
        var elements = {};
        var cols = gObj.editSettings.mode !== 'Batch' ? gObj.getColumns() : [gObj.getColumnByField(args.columnName)];
        if (args.isCustomFormValidation) {
            cols = this.parent.columnModel;
        }
        if (this.parent.editSettings.template) {
            return {};
        }
        for (var i = 0, len = cols.length; i < len; i++) {
            var col = cols[parseInt(i.toString(), 10)];
            if (col.commands || col.commandsTemplate) {
                var cellRendererFact = this.serviceLocator.getService('cellRendererFactory');
                var model = new RowModelGenerator(this.parent);
                var cellRenderer = cellRendererFact.getCellRenderer(CellType.CommandColumn);
                var cells = model.generateRows(args.rowData)[0].cells;
                var cell = cells.filter(function (cell) { return cell.rowID; });
                var td = cellRenderer.render(cell[parseInt(i.toString(), 10)], args.rowData, { 'index': args.row ? (parseInt(args.row.getAttribute(literals.ariaRowIndex), 10) - 1).toString() : 0 }, this.parent.enableVirtualization);
                var div = td.firstElementChild;
                div.setAttribute('textAlign', td.getAttribute('textAlign'));
                elements[col.uid] = div;
                continue;
            }
            if (col.type === 'dateonly' && args.rowData[col.field] instanceof Date) {
                var cellValue = args.rowData[col.field];
                args.rowData[col.field] = cellValue.getFullYear() + '-' + padZero(cellValue.getMonth() + 1) + '-' + padZero(cellValue.getDate());
            }
            var value = (col.valueAccessor(col.field, args.rowData, col));
            var tArgs = { column: col, value: value, type: args.requestType, data: args.rowData };
            var temp = col.edit.create;
            var input = void 0;
            if (col.editTemplate) {
                input = this.parent.createElement('span', { attrs: { 'e-mappinguid': col.uid } });
                var tempID = this.parent.element.id + col.uid + 'editTemplate';
                var tempData = extendObjWithFn({}, args.rowData, { column: col });
                var isReactCompiler = this.parent.isReact && typeof (col.editTemplate) !== 'string' &&
                    !(col.editTemplate.prototype && col.editTemplate.prototype.CSPTemplate);
                var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                    this.parent.parentDetails.parentInstObj.isReact;
                if (isReactCompiler || isReactChild) {
                    col.getEditTemplate()(extend({ 'index': args.rowIndex }, tempData), this.parent, 'editTemplate', tempID, null, null, input);
                    this.parent.renderTemplates();
                }
                else {
                    var template = col.getEditTemplate()(extend({ 'index': args.rowIndex }, tempData), this.parent, 'editTemplate', tempID, null, null, null, gObj.root);
                    appendChildren(input, template);
                }
            }
            else {
                if (typeof temp === 'string') {
                    temp = getObject(temp, window);
                    input = temp(tArgs);
                }
                else {
                    input = col.edit.create(tArgs);
                }
                if (typeof input === 'string') {
                    var div = this.parent.createElement('div');
                    div.innerHTML = input;
                    input = div.firstChild;
                }
                var isInput = input.tagName !== 'input' && input.querySelectorAll('input').length;
                var complexFieldName = getComplexFieldID(col.field);
                attributes(isInput ? input.querySelector('input') : input, {
                    name: complexFieldName, 'e-mappinguid': col.uid,
                    id: gObj.element.id + complexFieldName
                });
                classList(input, ['e-input', 'e-field'], []);
                if (col.textAlign === 'Right') {
                    input.classList.add('e-ralign');
                }
                if ((col.isPrimaryKey || col.isIdentity) && args.requestType === 'beginEdit' ||
                    (col.isIdentity && args.requestType === 'add')) { // already disabled in cell plugins
                    input.setAttribute('disabled', '');
                }
            }
            elements[col.uid] = input;
        }
        return elements;
    };
    EditRender.prototype.destroy = function () {
        this.renderer.removeEventListener();
    };
    return EditRender;
}());
export { EditRender };
