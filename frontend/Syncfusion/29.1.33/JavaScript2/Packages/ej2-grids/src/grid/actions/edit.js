import { closest, addClass, select, updateCSSText } from '@syncfusion/ej2-base';
import { extend, getValue } from '@syncfusion/ej2-base';
import { remove } from '@syncfusion/ej2-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { EditRender } from '../renderer/edit-renderer';
import { BooleanEditCell } from '../renderer/boolean-edit-cell';
import { DropDownEditCell } from '../renderer/dropdown-edit-cell';
import { NumericEditCell } from '../renderer/numeric-edit-cell';
import { DefaultEditCell } from '../renderer/default-edit-cell';
import { InlineEdit } from './inline-edit';
import { BatchEdit } from './batch-edit';
import { DialogEdit } from './dialog-edit';
import { Dialog } from '@syncfusion/ej2-popups';
import { parentsUntil, getComplexFieldID, getParsedFieldID, setComplexFieldID, getScrollBarWidth, setValidationRuels } from '../base/util';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { DatePickerEditCell } from '../renderer/datepicker-edit-cell';
import { calculateRelativeBasedPosition } from '@syncfusion/ej2-popups';
import { TemplateEditCell } from '../renderer/template-edit-cell';
import { DataUtil } from '@syncfusion/ej2-data';
import { addRemoveEventListener, padZero, getParentIns } from '../base/util';
import * as literals from '../base/string-literals';
/**
 * The `Edit` module is used to handle editing actions.
 */
var Edit = /** @class */ (function () {
    /**
     * Constructor for the Grid editing module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the servicelocator
     * @hidden
     */
    function Edit(parent, serviceLocator) {
        /** @hidden */
        this.isShowAddedRowValidate = false;
        this.editType = { 'Inline': InlineEdit, 'Normal': InlineEdit, 'Batch': BatchEdit, 'Dialog': DialogEdit };
        this.fieldname = '';
        this.data = {};
        /* @hidden */
        this.editCellDialogClose = false;
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.l10n = this.serviceLocator.getService('localization');
        this.addEventListener();
        this.updateEditObj();
        this.createAlertDlg();
        this.createConfirmDlg();
    }
    Edit.prototype.updateColTypeObj = function () {
        var cols = this.parent.columnModel;
        for (var i = 0; i < cols.length; i++) {
            if (this.parent.editSettings.template || cols[parseInt(i.toString(), 10)].editTemplate) {
                var templteCell = 'templateedit';
                cols[parseInt(i.toString(), 10)].edit = extend(new Edit.editCellType["" + templteCell](this.parent), cols[parseInt(i.toString(), 10)].edit || {});
            }
            else {
                cols[parseInt(i.toString(), 10)].edit = extend(new Edit.editCellType[cols[parseInt(i.toString(), 10)].editType
                    && Edit.editCellType[cols[parseInt(i.toString(), 10)].editType] ?
                    cols[parseInt(i.toString(), 10)].editType : 'defaultedit'](this.parent, this.serviceLocator), cols[parseInt(i.toString(), 10)].edit || {});
            }
        }
        this.parent.log('primary_column_missing');
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    Edit.prototype.getModuleName = function () {
        return 'edit';
    };
    /**
     * @param {NotifyArgs} e - specifies the notifyargs
     * @returns {void}
     * @hidden
     */
    Edit.prototype.onPropertyChanged = function (e) {
        if (e.module !== this.getModuleName()) {
            return;
        }
        var gObj = this.parent;
        for (var _i = 0, _a = Object.keys(e.properties); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'allowAdding':
                case 'allowDeleting':
                case 'allowEditing':
                    if (gObj.editSettings.allowAdding || gObj.editSettings.allowEditing || gObj.editSettings.allowDeleting) {
                        this.initialEnd();
                    }
                    break;
                case 'mode':
                    this.updateEditObj();
                    gObj.isEdit = gObj.editSettings.showAddNewRow ? true : false;
                    gObj.refresh();
                    break;
            }
        }
    };
    Edit.prototype.updateEditObj = function () {
        if (this.editModule) {
            this.editModule.destroy();
        }
        this.renderer = new EditRender(this.parent, this.serviceLocator);
        this.editModule = new this.editType[this.parent.editSettings.mode](this.parent, this.serviceLocator, this.renderer);
    };
    Edit.prototype.initialEnd = function () {
        this.updateColTypeObj();
    };
    /**
     * Edits any bound record in the Grid by TR element.
     *
     * @param {HTMLTableRowElement} tr - Defines the table row to be edited.
     * @returns {void}
     */
    Edit.prototype.startEdit = function (tr) {
        var gObj = this.parent;
        if (!gObj.editSettings.allowEditing || (gObj.isEdit && (!gObj.editSettings.showAddNewRow ||
            (gObj.editSettings.showAddNewRow && !isNullOrUndefined(gObj.element.querySelector('.' + literals.editedRow)))))
            || gObj.editSettings.mode === 'Batch') {
            return;
        }
        this.parent.element.classList.add('e-editing');
        if (!gObj.getSelectedRows().length || isNullOrUndefined(this.parent.getRowByIndex(parseInt(this.parent.getSelectedRows()[0].getAttribute('aria-rowindex'), 10) - 1))) {
            if (!tr) {
                this.showDialog('EditOperationAlert', this.alertDObj);
                return;
            }
        }
        else if (!tr) {
            tr = gObj.getSelectedRows()[0];
        }
        if (this.parent.enableVirtualization && this.parent.editSettings.mode === 'Normal') {
            var idx = parseInt(tr.getAttribute('aria-rowindex'), 10) - 1;
            tr = this.parent.getRowByIndex(idx);
        }
        var lastTr = gObj.getContent().querySelector('tr:last-child');
        var hdrTbody = gObj.getHeaderContent().querySelector('tbody');
        if (gObj.frozenRows && isNullOrUndefined(lastTr) && hdrTbody && hdrTbody.querySelector('tr:last-child')) {
            this.isLastRow = tr.rowIndex === parseInt(gObj.getHeaderContent().querySelector('tbody').querySelector('tr:last-child').getAttribute('aria-rowindex'), 10) - 1;
        }
        else if (lastTr) {
            this.isLastRow = tr.rowIndex === lastTr.rowIndex;
        }
        if (tr.style.display === 'none') {
            return;
        }
        this.editModule.startEdit(tr);
        this.refreshToolbar();
        gObj.element.querySelector('.e-gridpopup').style.display = 'none';
        this.parent.notify('start-edit', {});
        if (gObj.editSettings.showAddNewRow) {
            this.destroyToolTip();
        }
    };
    /**
     * @param {Element} tr - specifies the tr element
     * @param {object} args - specifies the object
     * @param {Element} args.row -specfifes the row
     * @param {string} args.requestType - specifies the request type
     * @returns {void}
     * @hidden
     */
    Edit.prototype.checkLastRow = function (tr, args) {
        var checkLastRow = this.isLastRow;
        if (this.parent.height !== 'auto' && this.parent.editSettings.newRowPosition === 'Bottom' && args && args.requestType === 'add' &&
            this.parent.getContent().firstElementChild.offsetHeight > this.parent.getContentTable().scrollHeight) {
            addClass([].slice.call(tr.getElementsByClassName(literals.rowCell)), 'e-lastrowadded');
        }
        else if (checkLastRow && tr && tr.classList) {
            addClass([].slice.call(tr.getElementsByClassName(literals.rowCell)), 'e-lastrowcell');
        }
    };
    /**
     * Cancels edited state.
     *
     * @returns {void}
     */
    Edit.prototype.closeEdit = function () {
        if (this.parent.editSettings.mode === 'Batch' && this.parent.editSettings.showConfirmDialog
            && this.parent.element.getElementsByClassName('e-updatedtd').length) {
            this.showDialog('CancelEdit', this.dialogObj);
            return;
        }
        this.parent.element.classList.remove('e-editing');
        this.editModule.closeEdit();
        this.refreshToolbar();
        this.parent.notify(events.closeEdit, { requestType: 'cancel' });
        if (this.parent.editSettings.showAddNewRow) {
            this.destroyToolTip();
        }
    };
    Edit.prototype.refreshToolbar = function () {
        this.parent.notify(events.toolbarRefresh, {});
    };
    /**
     * To adds a new row at the top with the given data. When data is not passed, it will add empty rows.
     * > `editSettings.allowEditing` should be true.
     *
     * @param {Object} data - Defines the new add record data.
     * @param {number} index - Defines the row index to be added
     * @returns {void}
     */
    Edit.prototype.addRecord = function (data, index) {
        if (!this.parent.editSettings.allowAdding) {
            return;
        }
        var args = { startEdit: true };
        if (!data) {
            this.parent.notify(events.virtualScrollAddActionBegin, args);
        }
        if (args.startEdit) {
            this.parent.element.classList.add('e-editing');
            this.editModule.addRecord(data, index);
            this.refreshToolbar();
            this.parent.notify('start-add', {});
        }
    };
    /**
     * Deletes a record with the given options. If fieldname and data are not given, the Grid will delete the selected record.
     * > `editSettings.allowDeleting` should be true.
     *
     * @param {string} fieldname - Defines the primary key field name of the column.
     * @param {Object} data - Defines the JSON data record to be deleted.
     * @returns {void}
     */
    Edit.prototype.deleteRecord = function (fieldname, data) {
        var gObj = this.parent;
        if (!gObj.editSettings.allowDeleting) {
            return;
        }
        if (!data) {
            if (!gObj.getSelectedRecords().length && isNullOrUndefined(gObj.commandDelIndex)) {
                this.showDialog('DeleteOperationAlert', this.alertDObj);
                return;
            }
        }
        if (gObj.editSettings.showDeleteConfirmDialog) {
            this.fieldname = fieldname;
            this.data = data;
            this.showDialog('ConfirmDelete', this.dialogObj);
            return;
        }
        this.editModule.deleteRecord(fieldname, data);
    };
    /**
     * Deletes a visible row by TR element.
     *
     * @param {HTMLTableRowElement} tr - Defines the table row element.
     * @returns {void}
     */
    Edit.prototype.deleteRow = function (tr) {
        this.deleteRowUid = tr.getAttribute('data-uid');
        var rowObj = this.parent.getRowObjectFromUID(this.deleteRowUid);
        if (!isNullOrUndefined(rowObj)) {
            this.deleteRecord(null, rowObj.data);
        }
    };
    /**
     * If Grid is in editable state, you can save a record by invoking endEdit.
     *
     * @returns {void}
     */
    Edit.prototype.endEdit = function () {
        if (this.parent.editSettings.mode === 'Batch' && this.parent.editSettings.showConfirmDialog &&
            (isNullOrUndefined(this.formObj) || this.formObj.validate())) {
            this.parent.editModule.saveCell();
            this.parent.notify(events.editNextValCell, {});
            if (isNullOrUndefined(this.formObj) || this.formObj.validate()) {
                this.showDialog('BatchSaveConfirm', this.dialogObj);
                return;
            }
        }
        this.endEditing();
    };
    /**
     * To update the specified cell by given value without changing into edited state.
     *
     * @param {number} rowIndex Defines the row index.
     * @param {string} field Defines the column field.
     * @param {string | number | boolean | Date} value - Defines the value to be changed.
     * @returns {void}
     */
    Edit.prototype.updateCell = function (rowIndex, field, value) {
        this.editModule.updateCell(rowIndex, field, value);
    };
    /**
     * To update the specified row by given values without changing into edited state.
     *
     * @param {number} index Defines the row index.
     * @param {Object} data Defines the data object to be updated.
     * @returns {void}
     */
    Edit.prototype.updateRow = function (index, data) {
        this.editModule.updateRow(index, data);
    };
    /**
     * Resets added, edited, and deleted records in the batch mode.
     *
     * @returns {void}
     */
    Edit.prototype.batchCancel = function () {
        this.closeEdit();
    };
    /**
     * Bulk saves added, edited, and deleted records in the batch mode.
     *
     * @returns {void}
     */
    Edit.prototype.batchSave = function () {
        this.endEdit();
    };
    /**
     * Changes a particular cell into edited state based on the row index and field name provided in the `batch` mode.
     *
     * @param {number} index - Defines row index to edit a particular cell.
     * @param {string} field - Defines the field name of the column to perform batch edit.
     * @returns {void}
     */
    Edit.prototype.editCell = function (index, field) {
        this.editModule.editCell(index, field);
    };
    /**
     * Checks the status of validation at the time of editing. If validation is passed, it returns true.
     *
     * @returns {boolean} returns whether the form is validated
     */
    Edit.prototype.editFormValidate = function () {
        return this.formObj ? this.formObj.validate() : true;
    };
    /**
     * Gets the added, edited,and deleted data before bulk save to the DataSource in batch mode.
     *
     * @returns {Object} returns the Object
     */
    Edit.prototype.getBatchChanges = function () {
        return this.editModule.getBatchChanges ? this.editModule.getBatchChanges() : {};
    };
    /**
     * Gets the current value of the edited component.
     *
     * @returns {Object} returns the Object
     */
    Edit.prototype.getCurrentEditCellData = function () {
        var obj = this.getCurrentEditedData(this.formObj.element, {});
        return obj[Object.keys(obj)[0]];
    };
    /**
     * Saves the cell that is currently edited. It does not save the value to the DataSource.
     *
     * @returns {void}
     */
    Edit.prototype.saveCell = function () {
        this.editModule.saveCell();
    };
    Edit.prototype.endEditing = function () {
        if (!this.parent.editSettings.showAddNewRow) {
            this.parent.element.classList.remove('e-editing');
        }
        this.editModule.endEdit();
        this.isShowAddedRowValidate = false;
        this.refreshToolbar();
    };
    Edit.prototype.showDialog = function (content, obj) {
        obj.content = '<div>' + this.l10n.getConstant(content) + '</div>';
        obj.dataBind();
        obj.show();
        if (this.parent.enableRtl) {
            obj.refresh();
        }
    };
    Edit.prototype.getValueFromType = function (col, value) {
        var val = value;
        switch (col.type) {
            case 'number':
                val = !isNaN(parseFloat(value)) ? parseFloat(value) : null;
                break;
            case 'boolean':
                if (col.editType !== 'booleanedit') {
                    val = value === this.l10n.getConstant('True') || value === true ? true : false;
                }
                break;
            case 'date':
            case 'datetime':
                if (col.editType !== 'datepickeredit' && col.editType !== 'datetimepickeredit'
                    && value && value.length) {
                    val = new Date(value);
                }
                else if (value === '') {
                    val = null;
                }
                break;
            case 'dateonly':
                // eslint-disable-next-line no-cond-assign
                val = value && (value = new Date(value)) ?
                    value.getFullYear() + '-' + padZero(value.getMonth() + 1) + '-' + padZero(value.getDate()) : null;
                break;
        }
        return val;
    };
    Edit.prototype.destroyToolTip = function () {
        var elements = [].slice.call(this.parent.element.getElementsByClassName('e-griderror'));
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var elem = elements_1[_i];
            remove(elem);
        }
        this.parent.getContent().firstElementChild.style.position = 'relative';
        if (this.parent.isFrozenGrid()) {
            if (this.parent.element.querySelector('.e-gridheader')) {
                this.parent.element.querySelector('.e-gridheader').style.position = '';
            }
            this.parent.element.querySelector('.e-gridcontent').style.position = '';
        }
    };
    Edit.prototype.createConfirmDlg = function () {
        this.dialogObj = this.dlgWidget([
            {
                click: this.dlgOk.bind(this),
                buttonModel: { content: this.l10n.getConstant('OKButton'),
                    cssClass: this.parent.cssClass ? 'e-primary' + ' ' + this.parent.cssClass : 'e-primary',
                    isPrimary: true }
            },
            {
                click: this.dlgCancel.bind(this),
                buttonModel: { cssClass: this.parent.cssClass ? 'e-flat' + ' ' + this.parent.cssClass : 'e-flat',
                    content: this.l10n.getConstant('CancelButton') }
            }
        ], 'EditConfirm');
    };
    Edit.prototype.createAlertDlg = function () {
        this.alertDObj = this.dlgWidget([
            {
                click: this.alertClick.bind(this),
                buttonModel: { content: this.l10n.getConstant('OKButton'),
                    cssClass: this.parent.cssClass ? 'e-flat' + ' ' + this.parent.cssClass : 'e-flat',
                    isPrimary: true }
            }
        ], 'EditAlert');
    };
    Edit.prototype.alertClick = function () {
        this.alertDObj.hide();
    };
    Edit.prototype.dlgWidget = function (btnOptions, name) {
        var div = this.parent.createElement('div', { id: this.parent.element.id + name });
        this.parent.element.appendChild(div);
        var options = {
            showCloseIcon: false,
            isModal: true,
            visible: false,
            closeOnEscape: true,
            target: this.parent.element,
            width: '320px',
            animationSettings: { effect: 'None' },
            cssClass: this.parent.cssClass ? this.parent.cssClass : ''
        };
        options.buttons = btnOptions;
        var obj = new Dialog(options);
        var isStringTemplate = 'isStringTemplate';
        obj["" + isStringTemplate] = true;
        obj.appendTo(div);
        return obj;
    };
    Edit.prototype.dlgCancel = function () {
        if (this.parent.pagerModule) {
            this.parent.pagerModule.isForceCancel = false;
        }
        this.parent.focusModule.clearIndicator();
        this.dialogObj.hide();
        this.parent.focusModule.restoreFocus({ requestType: 'cancel' });
        this.parent.notify('cancelcnfrmDlg', {});
    };
    Edit.prototype.dlgOk = function () {
        switch (this.dialogObj.element.querySelector('.e-dlg-content').firstElementChild.innerText) {
            case this.l10n.getConstant('ConfirmDelete'):
                this.editModule.deleteRecord(this.fieldname, this.data);
                if (this.parent.editSettings.showDeleteConfirmDialog && !this.parent.allowSelection) {
                    this.parent.commandDelIndex = undefined;
                }
                break;
            case this.l10n.getConstant('CancelEdit'):
                this.editModule.closeEdit();
                break;
            case this.l10n.getConstant('BatchSaveConfirm'):
                this.endEditing();
                break;
            case this.l10n.getConstant('BatchSaveLostChanges'):
                if (this.parent.editSettings.mode === 'Batch') {
                    this.editModule.addCancelWhilePaging();
                }
                if (this.parent.pagerModule) {
                    this.parent.pagerModule.isForceCancel = false;
                }
                this.executeAction();
                break;
        }
        this.dlgCancel();
    };
    Edit.prototype.destroyEditComponents = function () {
        if (this.parent.isEdit) {
            this.destroyWidgets();
            this.destroyForm();
        }
        this.destroy();
    };
    /**
     * @returns {void}
     * @hidden
     */
    Edit.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.eventDetails = [{ event: events.inBoundModelChanged, handler: this.onPropertyChanged },
            { event: events.initialEnd, handler: this.initialEnd },
            { event: events.keyPressed, handler: this.keyPressHandler },
            { event: events.autoCol, handler: this.updateColTypeObj },
            { event: events.tooltipDestroy, handler: this.destroyToolTip },
            { event: events.preventBatch, handler: this.preventBatch },
            { event: events.destroyForm, handler: this.destroyForm },
            { event: events.destroy, handler: this.destroyEditComponents }];
        addRemoveEventListener(this.parent, this.eventDetails, true, this);
        this.actionBeginFunction = this.onActionBegin.bind(this);
        this.actionCompleteFunction = this.actionComplete.bind(this);
        this.parent.on(events.destroyEditForm, this.actionBeginFunction);
        this.parent.addEventListener(events.actionComplete, this.actionCompleteFunction);
    };
    /**
     * @returns {void}
     * @hidden
     */
    Edit.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        addRemoveEventListener(this.parent, this.eventDetails, false);
        this.parent.removeEventListener(events.actionComplete, this.actionCompleteFunction);
        this.parent.off(events.destroyEditForm, this.actionBeginFunction);
    };
    Edit.prototype.actionComplete = function (e) {
        var actions = ['add', 'beginEdit', 'save', 'delete', 'cancel', 'filterAfterOpen', 'filterchoicerequest'];
        if (actions.indexOf(e.requestType) < 0) {
            this.parent.isEdit = this.parent.editSettings.showAddNewRow ? true : false;
        }
        if (e.requestType === 'batchsave') {
            this.parent.focusModule.restoreFocus({ requestType: 'save' });
        }
        this.refreshToolbar();
    };
    /**
     * @param {Element} form - specifies the element
     * @param {Object} editedData - specifies the edited data
     * @returns {Object} returns the object
     * @hidden
     */
    Edit.prototype.getCurrentEditedData = function (form, editedData) {
        var gObj = this.parent;
        if (gObj.editSettings.template) {
            var elements = [].slice.call(form.elements);
            for (var k = 0; k < elements.length; k++) {
                if (((elements[parseInt(k.toString(), 10)].hasAttribute('name') && (elements[parseInt(k.toString(), 10)].className !== 'e-multi-hidden')) ||
                    elements[parseInt(k.toString(), 10)].classList.contains('e-multiselect')) && !(elements[parseInt(k.toString(), 10)].type === 'hidden' &&
                    (parentsUntil(elements[parseInt(k.toString(), 10)], 'e-switch-wrapper') || parentsUntil(elements[parseInt(k.toString(), 10)], 'e-checkbox-wrapper')))) {
                    var field = (elements[parseInt(k.toString(), 10)].hasAttribute('name')) ? setComplexFieldID(elements[parseInt(k.toString(), 10)].getAttribute('name')) :
                        setComplexFieldID(elements[parseInt(k.toString(), 10)].getAttribute('id'));
                    var column = gObj.getColumnByField(field) || { field: field, type: elements[parseInt(k.toString(), 10)].getAttribute('type') };
                    var value = void 0;
                    if (column.type === 'checkbox' || column.type === 'boolean') {
                        value = elements[parseInt(k.toString(), 10)].checked;
                    }
                    else if (elements[parseInt(k.toString(), 10)].value) {
                        value = elements[parseInt(k.toString(), 10)].value;
                        if (elements[parseInt(k.toString(), 10)].ej2_instances &&
                            elements[parseInt(k.toString(), 10)].ej2_instances.length &&
                            !isNullOrUndefined(elements[parseInt(k.toString(), 10)].ej2_instances[0].value)) {
                            elements[parseInt(k.toString(), 10)].blur();
                            value = elements[parseInt(k.toString(), 10)]
                                .ej2_instances[0].value;
                        }
                    }
                    else if (elements[parseInt(k.toString(), 10)].ej2_instances) {
                        value = elements[parseInt(k.toString(), 10)]
                            .ej2_instances[0].value;
                    }
                    if (column.edit && typeof column.edit.read === 'string') {
                        value = getValue(column.edit.read, window)(elements[parseInt(k.toString(), 10)], value);
                    }
                    else if (column.edit && column.edit.read) {
                        value = column.edit.read(elements[parseInt(k.toString(), 10)], value);
                    }
                    value = gObj.editModule.getValueFromType(column, value);
                    if (elements[parseInt(k.toString(), 10)].type === 'radio') {
                        if (elements[parseInt(k.toString(), 10)].checked) {
                            DataUtil.setValue(column.field, value, editedData);
                        }
                    }
                    else {
                        if (typeof value === 'string') {
                            this.parent.sanitize(value);
                        }
                        DataUtil.setValue(column.field, value, editedData);
                    }
                }
            }
            return editedData;
        }
        var col = gObj.columnModel.filter(function (col) { return col.editTemplate; });
        for (var j = 0; j < col.length; j++) {
            if (form[getComplexFieldID(col[parseInt(j.toString(), 10)].field)]) {
                var inputElements = [].slice.call(form[getComplexFieldID(col[parseInt(j.toString(), 10)].field)])
                    .filter(function (element) { return element.tagName.toLowerCase() === 'input'; });
                inputElements = inputElements.length ? inputElements : [form[getComplexFieldID(col[parseInt(j.toString(), 10)].field)]];
                var temp = inputElements.filter(function (e) {
                    return !isNullOrUndefined((e.ej2_instances));
                });
                if (temp.length === 0) {
                    temp = inputElements.filter(function (e) { return e.hasAttribute('name'); });
                }
                for (var k = 0; k < temp.length; k++) {
                    var value = this.getValue(col[parseInt(j.toString(), 10)], temp[parseInt(k.toString(), 10)], editedData);
                    if (col[parseInt(j.toString(), 10)].type === 'string') {
                        value = this.parent.sanitize(value);
                    }
                    DataUtil.setValue(col[parseInt(j.toString(), 10)].field, value, editedData);
                }
            }
        }
        var inputs = [].slice.call(form.getElementsByClassName('e-field'));
        for (var i = 0, len = inputs.length; i < len; i++) {
            var col_1 = gObj.getColumnByUid(inputs[parseInt(i.toString(), 10)].getAttribute('e-mappinguid'));
            if (col_1 && col_1.field) {
                var value = this.getValue(col_1, inputs[parseInt(i.toString(), 10)], editedData);
                if (col_1.type === 'string' && !(col_1.isForeignColumn() && typeof value !== 'string')) {
                    value = this.parent.sanitize(value);
                }
                DataUtil.setValue(col_1.field, value, editedData);
            }
        }
        return editedData;
    };
    Edit.prototype.getValue = function (col, input, editedData) {
        var value = input.ej2_instances ?
            input.ej2_instances[0].value : input.value;
        var gObj = this.parent;
        var temp = col.edit.read;
        if (col.type === 'checkbox' || col.type === 'boolean') {
            value = input.checked;
        }
        if (typeof temp === 'string') {
            temp = getValue(temp, window);
            value = gObj.editModule.getValueFromType(col, (temp)(input, value));
        }
        else {
            value = gObj.editModule.getValueFromType(col, col.edit.read(input, value));
        }
        if (isNullOrUndefined(editedData[col.field]) && value === '') {
            value = editedData[col.field];
        }
        return value;
    };
    /**
     * @param {NotifyArgs} e - specifies the NotifyArgs
     * @returns {void}
     * @hidden
     */
    Edit.prototype.onActionBegin = function (e) {
        if ((e.requestType === 'columnstate' || (this.parent.enableInfiniteScrolling && this.parent.infiniteScrollSettings.enableCache
            && e.requestType === 'sorting')) && this.parent.isEdit && this.parent.editSettings.mode !== 'Batch') {
            this.closeEdit();
        }
        else {
            var editRow = this.parent.element.querySelector('.' + literals.editedRow);
            var addRow = this.parent.element.querySelector('.' + literals.addedRow);
            if (editRow && this.parent.frozenRows && e.requestType === 'virtualscroll'
                && parseInt(parentsUntil(editRow, literals.row).getAttribute(literals.ariaRowIndex), 10) - 1 < this.parent.frozenRows) {
                return;
            }
            var restrictedRequestTypes = ['filterAfterOpen', 'filterBeforeOpen', 'filterchoicerequest', 'filterSearchBegin', 'save', 'infiniteScroll', 'virtualscroll'];
            var isRestrict = restrictedRequestTypes.indexOf(e.requestType) === -1;
            var isAddRows = !this.parent.editSettings.showAddNewRow || (this.parent.editSettings.showAddNewRow &&
                !isNullOrUndefined(this.parent.element.querySelector('.e-editedrow')));
            var isDestroyVirtualForm = (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling) && this.formObj
                && isAddRows && !this.formObj.isDestroyed && (editRow || addRow || e.requestType === 'cancel') && isRestrict;
            if ((!this.parent.enableVirtualization && isAddRows && this.parent.editSettings.mode !== 'Batch' && this.formObj && !this.formObj.isDestroyed
                && isRestrict && !e.cancel) || isDestroyVirtualForm) {
                this.destroyWidgets();
                this.destroyForm();
            }
        }
    };
    /**
     * @param {Column[]} cols - specfies the column
     * @returns {void}
     * @hidden
     */
    Edit.prototype.destroyWidgets = function (cols) {
        var gObj = this.parent;
        gObj.isWidgetsDestroyed = true;
        if (gObj.editSettings.template) {
            var parentIns = getParentIns(this.parent);
            parentIns = parentIns.isReact ? parentIns : this.parent;
            parentIns.destroyTemplate(['editSettingsTemplate']);
            if (this.parent.isReact) {
                this.parent.renderTemplates();
            }
        }
        if (this.parent.editSettings.mode === 'Dialog' && this.parent.allowGrouping && this.parent.groupSettings.columns.length) {
            cols = [];
            var allColumns = this.parent.getColumns();
            for (var i = 0; i < allColumns.length; i++) {
                var column = allColumns[parseInt(i.toString(), 10)];
                if (column.visible || (this.parent.groupSettings.columns.indexOf(column.field) > -1)) {
                    cols.push(column);
                }
            }
        }
        else {
            cols = cols ? cols : this.parent.getCurrentVisibleColumns(this.parent.enableColumnVirtualization);
        }
        if (cols.some(function (column) { return !isNullOrUndefined(column.editTemplate); })) {
            this.parent.destroyTemplate(['editTemplate']);
            if (this.parent.isReact) {
                this.parent.renderTemplates();
            }
        }
        for (var _i = 0, cols_1 = cols; _i < cols_1.length; _i++) {
            var col = cols_1[_i];
            var temp = col.edit.destroy;
            if (col.edit.destroy) {
                if (typeof temp === 'string') {
                    temp = getValue(temp, window);
                    temp();
                }
                else {
                    col.edit.destroy();
                }
            }
        }
        var elements = [].slice.call(this.formObj.element.elements);
        for (var i = 0; i < elements.length; i++) {
            var element = elements[parseInt(i.toString(), 10)];
            if (element.hasAttribute('name')) {
                var instanceElement = isNullOrUndefined(element.parentElement) ? null : element.parentElement.classList.contains('e-ddl') ?
                    element.parentElement.querySelector('input') : element;
                if (instanceElement && instanceElement.ej2_instances &&
                    instanceElement.ej2_instances.length &&
                    !instanceElement.ej2_instances[0].isDestroyed) {
                    instanceElement.ej2_instances[0].destroy();
                    instanceElement.remove();
                }
            }
        }
    };
    /**
     * @returns {void}
     * @hidden
     */
    Edit.prototype.destroyForm = function () {
        this.destroyToolTip();
        var formObjects = [this.formObj, this.virtualFormObj];
        var col = this.parent.columnModel.filter(function (col) { return col.editTemplate; });
        for (var i = 0; i < formObjects.length; i++) {
            if (formObjects[parseInt(i.toString(), 10)] && formObjects[parseInt(i.toString(), 10)].element
                && !formObjects[parseInt(i.toString(), 10)].isDestroyed) {
                formObjects[parseInt(i.toString(), 10)].destroy();
                var parentIns = getParentIns(this.parent);
                if (parentIns.isReact && this.parent.editSettings.mode === 'Dialog'
                    && (!isNullOrUndefined(this.parent.editSettings.template) || col.length)) {
                    formObjects[parseInt(i.toString(), 10)].element.remove();
                }
            }
        }
        this.destroyToolTip();
    };
    /**
     * To destroy the editing.
     *
     * @returns {void}
     * @hidden
     */
    Edit.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (!gridElement) {
            return;
        }
        var hasGridChild = gridElement.querySelector('.' + literals.gridHeader) &&
            gridElement.querySelector('.' + literals.gridContent) ? true : false;
        if (hasGridChild) {
            this.destroyForm();
        }
        this.removeEventListener();
        var elem = this.dialogObj.element;
        if (elem.childElementCount > 0) {
            this.dialogObj.destroy();
            remove(elem);
        }
        elem = this.alertDObj.element;
        if (elem.childElementCount > 0) {
            this.alertDObj.destroy();
            remove(elem);
        }
        if (!hasGridChild) {
            return;
        }
        if (this.editModule) {
            this.editModule.destroy();
        }
    };
    Edit.prototype.keyPressHandler = function (e) {
        var isMacLike = /(Mac)/i.test(navigator.platform);
        if (isMacLike && e.metaKey && e.action === 'ctrlEnter') {
            e.action = 'insert';
        }
        switch (e.action) {
            case 'insert':
                this.addRecord();
                break;
            case 'delete':
                if ((e.target.tagName !== 'INPUT' || e.target.classList.contains('e-checkselect'))
                    && !document.querySelector('.e-popup-open.e-edit-dialog')) {
                    this.deleteRecord();
                }
                break;
            case 'f2':
                this.startEdit();
                break;
            case 'enter':
                if (!parentsUntil(e.target, 'e-unboundcelldiv') && this.parent.editSettings.mode !== 'Batch' &&
                    (parentsUntil(e.target, literals.gridContent) || ((this.parent.frozenRows ||
                        (this.parent.editSettings.showAddNewRow && (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling)))
                        && parentsUntil(e.target, literals.headerContent)))
                    && (!document.getElementsByClassName('e-popup-open').length || (document.querySelectorAll('.e-popup-open .e-editcell').length &&
                        !document.querySelectorAll('.e-popup-open:not(.e-dialog)').length))) {
                    e.preventDefault();
                    if (this.parent.isEdit) {
                        this.parent.isFocusFirstCell = true;
                    }
                    this.endEdit();
                }
                break;
            case 'escape':
                if (this.parent.isEdit && !this.editCellDialogClose) {
                    if (this.parent.editSettings.mode === 'Batch') {
                        this.editModule.escapeCellEdit();
                    }
                    else {
                        this.curretRowFocus(e);
                    }
                }
                if (this.editCellDialogClose) {
                    this.editCellDialogClose = false;
                }
                break;
            case 'tab':
            case 'shiftTab':
                this.curretRowFocus(e);
                break;
        }
    };
    Edit.prototype.curretRowFocus = function (e) {
        if (this.parent.isEdit && this.parent.editSettings.mode !== 'Batch') {
            this.parent.isWidgetsDestroyed = false;
            var editedRow = parentsUntil(e.target, 'e-editedrow') || parentsUntil(e.target, 'e-addedrow');
            if (editedRow) {
                var focusableEditCells = [].slice.call(editedRow.querySelectorAll('.e-input:not(.e-disabled)'));
                var commandColCell = [].slice.call(editedRow.querySelectorAll('.e-unboundcell'));
                if (commandColCell && commandColCell.length) {
                    for (var i = 0; i < commandColCell.length; i++) {
                        focusableEditCells = focusableEditCells.concat([].slice
                            .call(commandColCell[parseInt(i.toString(), 10)].querySelectorAll('.e-btn:not(.e-hide)')));
                    }
                }
                var rowCell = parentsUntil(e.target, 'e-rowcell');
                rowCell = rowCell && rowCell.classList.contains('e-unboundcell') ? e.target : rowCell;
                var lastCell = parentsUntil(focusableEditCells[focusableEditCells.length - 1], 'e-rowcell');
                lastCell = lastCell && lastCell.classList.contains('e-unboundcell') ?
                    focusableEditCells[focusableEditCells.length - 1] : lastCell;
                if ((rowCell === lastCell && e.action === 'tab') || e.action === 'escape' ||
                    (rowCell === parentsUntil(focusableEditCells[0], 'e-rowcell') && e.action === 'shiftTab' &&
                        !this.parent.editSettings.showAddNewRow)) {
                    var uid = editedRow.getAttribute('data-uid');
                    var rows = this.parent.allowGrouping ? (!isNullOrUndefined(this.parent.getContent()) ?
                        [].slice.call(this.parent.getContent().querySelectorAll('tr')) : []) : this.parent.getRows();
                    var rowIndex = rows.map(function (m) { return m.getAttribute('data-uid'); }).indexOf(uid);
                    if (this.parent.frozenRows) {
                        if (parentsUntil(editedRow, 'e-gridheader')) {
                            rowIndex = editedRow.rowIndex;
                        }
                        else if (parentsUntil(editedRow, 'e-gridcontent')) {
                            rowIndex = rowIndex - this.parent.frozenRows;
                        }
                    }
                    if (editedRow.classList.contains('e-addedrow')) {
                        rowIndex = 0;
                    }
                    if (e.action === 'escape') {
                        this.parent.isFocusFirstCell = true;
                        this.closeEdit();
                    }
                    else {
                        this.isShowAddedRowValidate = true;
                        this.parent.selectionModule.preventFocus = false;
                        this.parent.isFocusFirstCell = true;
                        this.endEdit();
                        this.isShowAddedRowValidate = false;
                    }
                    if (this.parent.focusModule.active && (!this.parent.editSettings.showAddNewRow ||
                        editedRow.classList.contains('e-editedrow') || (this.parent.editSettings.showAddNewRow &&
                        (editedRow.classList.contains('e-addedrow') && isNullOrUndefined(this.parent.element.querySelector('.e-griderror:not([style*="display: none"])')))))) {
                        var firstCellIndex = 0;
                        var matrix = this.parent.focusModule.active.matrix;
                        if (matrix && matrix.matrix.length && matrix.matrix[parseInt(rowIndex.toString(), 10)]) {
                            var rowMatrix = matrix.matrix[parseInt(rowIndex.toString(), 10)];
                            for (var i = 0; i < rowMatrix.length; i++) {
                                if (rowMatrix[parseInt(i.toString(), 10)] > 0) {
                                    firstCellIndex = i;
                                    break;
                                }
                            }
                        }
                        var firstCell = getValue(rowIndex + ".cells." + firstCellIndex, this.parent.focusModule.active.matrix.getRowsFromIndex(rowIndex, this.parent.focusModule.active));
                        if (firstCell && firstCell.getBoundingClientRect().width === 0) {
                            var firstContentCellIndex = this.parent.focusModule.active.matrix.nextVisibleCellFocus(rowIndex, firstCellIndex, e.action, this.parent.focusModule.active.keyActions[e.action], this.parent.focusModule.active, this.parent.focusModule.active.matrix.current[1]);
                            firstCellIndex = firstContentCellIndex[1];
                        }
                        this.parent.focusModule.active.matrix.current = [rowIndex, firstCellIndex];
                    }
                }
                if (this.parent.editSettings.showAddNewRow && e.action === 'tab' && parentsUntil(e.target, 'e-addedrow')) {
                    this.isShowAddedRowValidate = true;
                }
            }
        }
    };
    Edit.prototype.preventBatch = function (args) {
        this.preventObj = args;
        this.showDialog('BatchSaveLostChanges', this.dialogObj);
    };
    Edit.prototype.executeAction = function () {
        this.preventObj.handler.call(this.preventObj.instance, this.preventObj.arg1, this.preventObj.arg2, this.preventObj.arg3, this.preventObj.arg4, this.preventObj.arg5, this.preventObj.arg6, this.preventObj.arg7, this.preventObj.arg8);
    };
    /**
     * @param {Column[]} cols - specifies the column
     * @param {Object} newRule - specifies the new rule object
     * @returns {void}
     * @hidden
     */
    Edit.prototype.applyFormValidation = function (cols, newRule) {
        var gObj = this.parent;
        var idx = 0;
        var form = this.parent.editSettings.mode !== 'Dialog' ?
            gObj.editSettings.showAddNewRow && gObj.element.querySelector('.' + literals.editedRow) ?
                gObj.element.querySelector('.' + literals.editedRow).getElementsByClassName('e-gridform')[parseInt(idx.toString(), 10)] :
                gObj.element.getElementsByClassName('e-gridform')[parseInt(idx.toString(), 10)] :
            select('#' + gObj.element.id + '_dialogEdit_wrapper .e-gridform', document);
        var index = 1;
        var rules = {};
        var mRules = {};
        var frRules = {};
        cols = cols ? cols : gObj.getColumns();
        for (var i = 0; i < cols.length; i++) {
            if (!cols[parseInt(i.toString(), 10)].visible && (gObj.editSettings.mode !== 'Dialog' || (gObj.groupSettings.columns.indexOf(cols[parseInt(i.toString(), 10)].field) === -1
                && gObj.editSettings.mode === 'Dialog'))) {
                continue;
            }
            if (cols[parseInt(i.toString(), 10)].validationRules && isNullOrUndefined(newRule)) {
                setValidationRuels(cols[parseInt(i.toString(), 10)], index, rules, mRules, frRules, cols.length);
            }
        }
        rules = extend(rules, mRules, frRules);
        this.parent.editModule.formObj = this.createFormObj(form, newRule ? newRule : rules);
    };
    /**
     * @param {HTMLFormElement} form - Defined Form element
     * @param {Object} rules - Defines form rules
     * @returns {FormValidator} Returns formvalidator instance
     * @hidden
     */
    Edit.prototype.createFormObj = function (form, rules) {
        var _this = this;
        return new FormValidator(form, {
            rules: rules,
            locale: this.parent.locale,
            validationComplete: function (args) {
                _this.validationComplete(args);
            },
            customPlacement: function (inputElement, error) {
                var uid = inputElement.getAttribute('e-mappinguid');
                var args = {
                    column: _this.parent.getColumnByUid(uid),
                    error: error,
                    inputElement: inputElement,
                    value: inputElement.value
                };
                if ((!(event && event['relatedTarget'] && event['relatedTarget'].classList.contains('e-cancelbutton')) &&
                    !_this.parent.editSettings.showAddNewRow) || (_this.parent.editSettings.showAddNewRow && event && event.target &&
                    (parentsUntil(event.target, _this.parent.element.id + '_update', true) ||
                        (parentsUntil(event.target, 'e-grid-menu') && (event.target.classList.contains('e-save') ||
                            event.target.querySelector('.e-save'))) || _this.isShowAddedRowValidate ||
                        (parentsUntil(event.target, 'e-unboundcell') && parentsUntil(event.target, 'e-update')) ||
                        (event['action'] === 'enter' && (parentsUntil(event.target, 'e-content') || parentsUntil(event.target, 'e-addedrow'))))) ||
                    (_this.parent.editSettings.showAddNewRow && !isNullOrUndefined(_this.parent.element.querySelector('.' + literals.editedRow)))) {
                    _this.valErrorPlacement(inputElement, error);
                }
                _this.isShowAddedRowValidate = false;
                _this.parent.notify(events.valCustomPlacement, args);
            }
        });
    };
    Edit.prototype.valErrorPlacement = function (inputElement, error) {
        if (this.parent.isEdit) {
            var id = error.getAttribute('for');
            var elem = this.getElemTable(inputElement).querySelector('#' + getParsedFieldID(id) + '_Error');
            if (!elem) {
                this.createTooltip(inputElement, error, id, '');
            }
            else {
                elem.querySelector('.e-tip-content').innerHTML = error.outerHTML;
            }
        }
    };
    Edit.prototype.getElemTable = function (inputElement) {
        var isFrozenHdr;
        var gObj = this.parent;
        var table;
        if (gObj.editSettings.mode !== 'Dialog') {
            isFrozenHdr = (gObj.frozenRows && closest(inputElement, '.' + literals.row) && gObj.frozenRows
                > (parseInt(closest(inputElement, '.' + literals.row).getAttribute(literals.ariaRowIndex), 10) - 1 || 0));
            table = this.parent.isFrozenGrid() ? gObj.element : isFrozenHdr || (gObj.editSettings.showAddNewRow &&
                (gObj.enableVirtualization || gObj.enableInfiniteScrolling)) ? gObj.getHeaderTable() : gObj.getContentTable();
        }
        else {
            table = select('#' + gObj.element.id + '_dialogEdit_wrapper', document);
        }
        return table;
    };
    Edit.prototype.resetElemPosition = function (elem, args) {
        var td = parentsUntil(args.element, literals.rowCell);
        if (td) {
            var tdRight = td.getBoundingClientRect().right;
            var elemRight = elem.getBoundingClientRect().right;
            if (elemRight > tdRight) {
                var offSet = elemRight - tdRight;
                elem.style.left = (elem.offsetLeft - offSet) + 'px';
            }
        }
    };
    Edit.prototype.validationComplete = function (args) {
        if (this.parent.isEdit) {
            var elem = this.getElemTable(args.element).querySelector('#' + getParsedFieldID(args.inputName) + '_Error');
            if (this.parent.editSettings.showAddNewRow && !elem && args.element) {
                var error = parentsUntil(args.element, 'e-rowcell').querySelector('.e-error');
                if (error) {
                    error.classList.remove('e-error');
                }
            }
            if (elem) {
                if (args.status === 'failure') {
                    elem.style.display = '';
                    this.resetElemPosition(elem, args);
                }
                else {
                    elem.style.display = 'none';
                }
            }
        }
    };
    Edit.prototype.createTooltip = function (element, error, name, display) {
        var formObj = this.formObj.element;
        var customForm = parentsUntil(element, 'e-virtual-validation');
        if (customForm) {
            formObj = this.virtualFormObj.element;
        }
        var gcontent = this.parent.getContent().firstElementChild;
        var isScroll = gcontent.scrollHeight > gcontent.clientHeight || gcontent.scrollWidth > gcontent.clientWidth;
        var isInline = this.parent.editSettings.mode !== 'Dialog';
        var td = closest(element, '.' + literals.rowCell);
        var row = closest(element, '.' + literals.row);
        var isFHdr;
        var isFHdrLastRow = false;
        var validationForBottomRowPos;
        var isBatchModeLastRow = false;
        var isAddNewRow = this.parent.editSettings.showAddNewRow && !isNullOrUndefined(parentsUntil(element, literals.addedRow))
            && (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling);
        var viewPortRowCount = Math.round(this.parent.getContent().clientHeight / this.parent.getRowHeight()) - 1;
        var rows = [].slice.call(this.parent.getContent().getElementsByClassName(literals.row));
        if (this.parent.editSettings.mode === 'Batch') {
            rows = [].slice.call(this.parent.getContent().querySelectorAll('.e-row:not(.e-hiddenrow)'));
            if (viewPortRowCount > 1 && rows.length > viewPortRowCount && parseInt(rows[rows.length - 1].
                getAttribute(literals.ariaRowIndex), 10) - 1 === parseInt(row.getAttribute(literals.ariaRowIndex), 10) - 1) {
                isBatchModeLastRow = true;
            }
        }
        if (isInline) {
            if (this.parent.frozenRows || isAddNewRow) {
                var headerRows = this.parent.editSettings.showAddNewRow ? '.e-row:not(.e-hiddenrow.e-addedrow)' :
                    '.e-row:not(.e-hiddenrow)';
                var fHearderRows = [].slice.call(this.parent.getHeaderTable().querySelector(literals.tbody).querySelectorAll(headerRows));
                isFHdr = fHearderRows.length > (parseInt(row.getAttribute(literals.ariaRowIndex), 10) - 1 || 0);
                isFHdrLastRow = isFHdr && parseInt(row.getAttribute(literals.ariaRowIndex), 10) - 1 === fHearderRows.length - 1;
                var insertRow = [].slice.call(this.parent.getHeaderTable().querySelector(literals.tbody).querySelectorAll('.e-row:not(.e-hiddenrow)'));
                if (insertRow.length === 1 && (insertRow[0].classList.contains('e-addedrow') || insertRow[0].classList.contains('e-insertedrow'))) {
                    isFHdrLastRow = true;
                }
            }
            if (isFHdrLastRow || (viewPortRowCount > 1 && rows.length > viewPortRowCount
                && ((this.parent.editSettings.newRowPosition === 'Bottom' && (this.editModule.args
                    && this.editModule.args.requestType === 'add')) || (td.classList.contains('e-lastrowcell')
                    && !row.classList.contains(literals.addedRow)))) || isBatchModeLastRow) {
                validationForBottomRowPos = true;
            }
        }
        var table = isInline ?
            (isFHdr ? this.parent.getHeaderTable() : this.parent.getContentTable()) :
            select('#' + this.parent.element.id + '_dialogEdit_wrapper .e-dlg-content', document);
        var client = table.getBoundingClientRect();
        var left = isInline ?
            this.parent.element.getBoundingClientRect().left : client.left;
        var input = closest(element, 'td');
        var inputClient = input ? input.getBoundingClientRect() : element.parentElement.getBoundingClientRect();
        var div = this.parent.createElement('div', {
            className: 'e-tooltip-wrap e-lib e-control e-popup e-griderror',
            id: name + '_Error'
        });
        var divStyles = 'display:' + display + ';top:' +
            ((isFHdr ? inputClient.top + inputClient.height : inputClient.bottom - client.top) + table.scrollTop + 9) + 'px;left:' +
            (inputClient.left - left + table.scrollLeft + inputClient.width / 2) + 'px;' +
            'max-width:' + inputClient.width + 'px;text-align:center;';
        updateCSSText(div, divStyles);
        if (this.parent.cssClass) {
            div.classList.add(this.parent.cssClass);
        }
        if (isInline && client.left < left) {
            div.style.left = parseInt(div.style.left, 10) - client.left + left + 'px';
        }
        var content = this.parent.createElement('div', { className: 'e-tip-content' });
        content.appendChild(error);
        var arrow;
        if (validationForBottomRowPos) {
            arrow = this.parent.createElement('div', { className: 'e-arrow-tip e-tip-bottom' });
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-outer e-tip-bottom' }));
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-inner e-tip-bottom' }));
        }
        else {
            arrow = this.parent.createElement('div', { className: 'e-arrow-tip e-tip-top' });
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-outer e-tip-top' }));
            arrow.appendChild(this.parent.createElement('div', { className: 'e-arrow-tip-inner e-tip-top' }));
        }
        div.appendChild(content);
        div.appendChild(arrow);
        if (!customForm && (this.parent.frozenRows || isAddNewRow) && this.parent.editSettings.mode !== 'Dialog') {
            var getEditCell = this.parent.editSettings.mode === 'Normal' ?
                closest(element, '.e-editcell') : closest(element, '.' + literals.table);
            getEditCell.style.position = 'relative';
            div.style.position = 'absolute';
            if (this.parent.editSettings.mode === 'Batch' ||
                (closest(element, '.' + literals.frozenContent) || closest(element, '.' + literals.frozenHeader))
                || (this.parent.frozenRows || isAddNewRow)) {
                if (this.parent.isFrozenGrid()) {
                    if (td.classList.contains('e-unfreeze')) {
                        addClass([div], 'e-unfreeze');
                        formObj.appendChild(div);
                    }
                    else {
                        var elem = closest(td, '.e-gridheader') ? this.parent.element.querySelector('.e-gridheader') :
                            rows.length === 1 ? this.parent.element.querySelector('.e-gridcontent').querySelector('.e-content') :
                                this.parent.element.querySelector('.e-gridcontent');
                        elem.appendChild(div);
                        elem.style.position = 'relative';
                    }
                }
                else {
                    formObj.appendChild(div);
                }
            }
        }
        else {
            if (customForm) {
                this.virtualFormObj.element.appendChild(div);
            }
            else {
                if (this.parent.editSettings.mode !== 'Dialog' && this.parent.isFrozenGrid()) {
                    if (td.classList.contains('e-unfreeze')) {
                        addClass([div], 'e-unfreeze');
                        this.formObj.element.appendChild(div);
                    }
                    else {
                        var elem = closest(td, '.e-gridheader') ? this.parent.element.querySelector('.e-gridheader') :
                            rows.length === 1 ? this.parent.element.querySelector('.e-gridcontent').querySelector('.e-content') :
                                this.parent.element.querySelector('.e-gridcontent');
                        elem.appendChild(div);
                        elem.style.position = 'relative';
                    }
                }
                else {
                    this.formObj.element.appendChild(div);
                }
            }
        }
        if (!isNullOrUndefined(td)) {
            if (td.classList.contains('e-fixedfreeze')) {
                div.classList.add('e-fixederror');
            }
            else if (td.classList.contains('e-leftfreeze') || td.classList.contains('e-rightfreeze')) {
                div.classList.add('e-freezeerror');
            }
        }
        if (!validationForBottomRowPos && isInline && gcontent.getBoundingClientRect().bottom < inputClient.bottom + inputClient.height) {
            var contentDiv = this.parent.getContent().querySelector('.e-content');
            if (this.parent.currentViewData.length === 0 && contentDiv.scrollTop === 0) {
                contentDiv.scrollTop = div.offsetHeight + arrow.scrollHeight;
            }
            else {
                gcontent.scrollTop = gcontent.scrollTop + div.offsetHeight + arrow.scrollHeight;
            }
        }
        var lineHeight = parseInt(document.defaultView.getComputedStyle(div, null).getPropertyValue('font-size'), 10);
        if ((this.parent.frozenRows || isAddNewRow) && this.parent.editSettings.mode !== 'Dialog') {
            div.style.left = input.offsetLeft + (input.offsetWidth / 2 - div.offsetWidth / 2) + 'px';
        }
        else {
            div.style.left = (parseInt(div.style.left, 10) - div.offsetWidth / 2) + 'px';
        }
        if (div.getBoundingClientRect().width < inputClient.width &&
            div.querySelector('label').getBoundingClientRect().height / (lineHeight * 1.2) >= 2) {
            div.style.width = div.style.maxWidth;
        }
        if (isInline && !isScroll && !this.parent.allowPaging || (this.parent.frozenRows || isAddNewRow)) {
            // gcontent.style.position = 'static';
            var pos = calculateRelativeBasedPosition(input, div);
            div.style.top = pos.top + inputClient.height + 9 + 'px';
        }
        if (validationForBottomRowPos) {
            if (isScroll && this.parent.height !== 'auto' && (!this.parent.frozenRows || !isAddNewRow)
                && !this.parent.enableVirtualization && !this.parent.enableInfiniteScrolling && !(div.classList.contains('e-freezeerror')
                && div.classList.contains('e-fixederror'))) {
                var scrollWidth = gcontent.scrollWidth > gcontent.offsetWidth ? getScrollBarWidth() : 0;
                var gHeight = this.parent.height.toString().indexOf('%') === -1 ?
                    parseInt(this.parent.height, 10) : gcontent.offsetHeight;
                div.style.bottom = (gHeight - gcontent.querySelector('table').offsetHeight
                    - scrollWidth) + inputClient.height + 9 + 'px';
            }
            else {
                div.style.bottom = inputClient.height + 9 + 'px';
            }
            if (rows.length < viewPortRowCount && this.parent.editSettings.newRowPosition === 'Bottom' && (this.editModule.args
                && this.editModule.args.requestType === 'add')) {
                var rowsCount = this.parent.frozenRows ? (isAddNewRow ? this.parent.frozenRows + 1 : this.parent.frozenRows) +
                    (rows.length - 1) : rows.length - 1;
                var rowsHeight = rowsCount * this.parent.getRowHeight();
                var position = this.parent.getContent().clientHeight - rowsHeight;
                div.style.bottom = position + 9 + 'px';
            }
            div.style.top = null;
        }
    };
    /**
     * @param {Column} col - specfies the column
     * @returns {boolean} returns the whether column is grouped
     * @hidden
     */
    Edit.prototype.checkColumnIsGrouped = function (col) {
        return !col.visible && !(this.parent.groupSettings.columns.indexOf(col.field) > -1);
    };
    /**
     * @param {object} editors -specfies the editors
     * @returns {void}
     * @hidden
     */
    Edit.AddEditors = function (editors) {
        Edit.editCellType = extend(Edit.editCellType, editors);
    };
    Edit.editCellType = {
        'dropdownedit': DropDownEditCell, 'numericedit': NumericEditCell,
        'datepickeredit': DatePickerEditCell, 'datetimepickeredit': DatePickerEditCell,
        'booleanedit': BooleanEditCell, 'defaultedit': DefaultEditCell,
        'templateedit': TemplateEditCell
    };
    return Edit;
}());
export { Edit };
