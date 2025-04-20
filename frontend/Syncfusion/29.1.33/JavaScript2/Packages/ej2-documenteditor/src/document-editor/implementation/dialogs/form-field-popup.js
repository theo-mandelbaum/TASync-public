import { createElement, isNullOrUndefined, classList } from '@syncfusion/ej2-base';
import { TextBox, NumericTextBox } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { Popup } from '@syncfusion/ej2-popups';
import { TextFormField, DropDownFormField, CheckBoxFormField } from '../viewer/page';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { afterFormFieldFillEvent } from '../../base/index';
/**
 * @private
 */
var FormFieldPopUp = /** @class */ (function () {
    /**
     * @param {DocumentEditor} owner - Specifies the document editor.
     * @private
     */
    function FormFieldPopUp(owner) {
        var _this = this;
        this.applyTextFormFieldValueClickHandler = this.onApplyTextFormFieldValueClick.bind(this);
        // eslint-disable-next-line max-len
        this.applyDropDownFormFieldValueClickHandler = this.onApplyDropDownFormFieldValueClick.bind(this);
        this.closeButtonClickHandler = this.onCloseButtonClick.bind(this);
        this.applyDateFormFieldValueClickHandler = this.onApplyDateFormFieldValueClick.bind(this);
        this.applyNumberFormFieldValueClickHandler = this.onApplyNumberFormFieldValueClick.bind(this);
        /**
         * @returns {void}
         */
        this.applyTextFormFieldValue = function () {
            _this.owner.editorModule.updateFormField(_this.formField, _this.textBoxInstance.value);
            _this.owner.trigger(afterFormFieldFillEvent, { 'fieldName': _this.formField.formFieldData.name, value: _this.formField.resultText, isCanceled: false });
            _this.hidePopup();
        };
        /**
         * @returns {void}
         */
        this.applyNumberFormFieldValue = function () {
            _this.owner.editorModule.updateFormField(_this.formField, _this.numberInput.value.toString());
            _this.owner.trigger(afterFormFieldFillEvent, { 'fieldName': _this.formField.formFieldData.name, value: _this.formField.resultText, isCanceled: false });
            _this.hidePopup();
        };
        /**
         * @returns {void}
         */
        this.applyDateFormFieldValue = function () {
            if (!isNullOrUndefined(_this.datePickerInstance.value)) {
                _this.owner.editorModule.updateFormField(_this.formField, _this.dateInput.value);
                _this.owner.trigger(afterFormFieldFillEvent, { 'fieldName': _this.formField.formFieldData.name, value: _this.formField.resultText, isCanceled: false });
                _this.hidePopup();
            }
        };
        /**
         * @returns {void}
         */
        this.applyDropDownFormFieldValue = function () {
            _this.owner.editorModule.updateFormField(_this.formField, _this.ddlInstance.index);
            _this.owner.trigger(afterFormFieldFillEvent, { 'fieldName': _this.formField.formFieldData.name, value: _this.formField.formFieldData.selectedIndex, isCanceled: false });
            _this.hidePopup();
        };
        /**
         * @param {ChangedEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.enableDisableDatePickerOkButton = function (args) {
            if (args.isInteracted) {
                _this.dataPickerOkButton.disabled = false;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeButton = function () {
            var field = _this.formField;
            _this.hidePopup();
            var eventArgs = { 'fieldName': field.formFieldData.name };
            if (field.formFieldData instanceof TextFormField) {
                eventArgs.value = field.resultText;
            }
            else if (field.formFieldData instanceof CheckBoxFormField) {
                eventArgs.value = field.formFieldData.checked;
            }
            else {
                eventArgs.value = field.formFieldData.selectedIndex;
            }
            eventArgs.isCanceled = true;
            _this.owner.trigger(afterFormFieldFillEvent, eventArgs);
        };
        /**
         * @private
         * @returns {void}
         */
        this.hidePopup = function () {
            _this.owner.documentHelper.isFormFilling = false;
            _this.formField = undefined;
            if (_this.target) {
                _this.target.style.display = 'none';
            }
            if (_this.popupObject) {
                _this.popupObject.hide();
                _this.popupObject.destroy();
                _this.popupObject = undefined;
            }
        };
        this.owner = owner;
    }
    FormFieldPopUp.prototype.initPopup = function () {
        this.popupElement = createElement('div', { className: 'e-de-form-popup' });
        this.textBoxContainer = this.initTextBoxInput();
        this.popupElement.appendChild(this.textBoxContainer);
        this.popupElement.appendChild(this.initNumericTextBox());
        this.popupElement.appendChild(this.initDatePicker());
        this.popupElement.appendChild(this.initDropDownList());
        this.target = this.popupElement;
        this.owner.documentHelper.viewerContainer.appendChild(this.popupElement);
    };
    FormFieldPopUp.prototype.initTextBoxInput = function () {
        this.textBoxDiv = createElement('div', { className: 'e-de-txt-field' });
        var textBoxInput = createElement('input', { className: 'e-de-txt-form' });
        var textBox = new TextBox();
        this.textBoxInput = textBoxInput;
        this.textBoxButtonDiv = createElement('div', { className: 'e-de-cmt-action-button' });
        this.textBoxOkButton = createElement('button');
        this.textBoxCancelButton = createElement('button');
        this.textBoxOkButton.addEventListener('click', this.applyTextFormFieldValueClickHandler);
        this.textBoxCancelButton.addEventListener('click', this.closeButtonClickHandler);
        this.textBoxDiv.appendChild(textBoxInput);
        this.textBoxButtonDiv.appendChild(this.textBoxOkButton);
        this.textBoxButtonDiv.appendChild(this.textBoxCancelButton);
        this.textBoxDiv.appendChild(this.textBoxButtonDiv);
        textBox.appendTo(textBoxInput);
        new Button({ cssClass: 'e-de-save e-primary', iconCss: 'e-de-save-icon' }, this.textBoxOkButton);
        new Button({ cssClass: 'e-de-cancel', iconCss: 'e-de-cancel-icon' }, this.textBoxCancelButton);
        this.textBoxInstance = textBox;
        return this.textBoxDiv;
    };
    FormFieldPopUp.prototype.initNumericTextBox = function () {
        this.numericDiv = createElement('div', { className: 'e-de-num-field' });
        var numberInput = createElement('input', { className: 'e-de-txt-form' });
        var numericTextBox = new NumericTextBox();
        this.numberInput = numberInput;
        this.textBoxButtonNumericDiv = createElement('div', { className: 'e-de-cmt-action-button' });
        this.textBoxOkButtonNumeric = createElement('button');
        this.textBoxCancelButtonNumeric = createElement('button');
        this.textBoxOkButtonNumeric.addEventListener('click', this.applyNumberFormFieldValueClickHandler);
        this.textBoxCancelButtonNumeric.addEventListener('click', this.closeButtonClickHandler);
        this.numericDiv.appendChild(numberInput);
        this.textBoxButtonNumericDiv.appendChild(this.textBoxOkButtonNumeric);
        this.textBoxButtonNumericDiv.appendChild(this.textBoxCancelButtonNumeric);
        this.numericDiv.appendChild(this.textBoxButtonNumericDiv);
        numericTextBox.appendTo(numberInput);
        new Button({ cssClass: 'e-de-save e-primary', iconCss: 'e-de-save-icon' }, this.textBoxOkButtonNumeric);
        new Button({ cssClass: 'e-de-cancel', iconCss: 'e-de-cancel-icon' }, this.textBoxCancelButtonNumeric);
        this.numericTextBoxInstance = numericTextBox;
        return this.numericDiv;
    };
    FormFieldPopUp.prototype.initDatePicker = function () {
        this.dateDiv = createElement('div', { className: 'e-de-date-field' });
        var dateInput = createElement('input', { className: 'e-de-txt-form' });
        /* eslint-disable-next-line max-len */
        var datePicker = new DateTimePicker({ strictMode: true, change: this.enableDisableDatePickerOkButton });
        this.dateInput = dateInput;
        this.textBoxButtonDateDiv = createElement('div', { className: 'e-de-cmt-action-button' });
        this.textBoxOkButtonDate = createElement('button');
        this.textBoxCancelButtonDate = createElement('button');
        this.textBoxOkButtonDate.addEventListener('click', this.applyDateFormFieldValueClickHandler);
        this.textBoxCancelButtonDate.addEventListener('click', this.closeButtonClickHandler);
        this.dateDiv.appendChild(dateInput);
        this.textBoxButtonDateDiv.appendChild(this.textBoxOkButtonDate);
        this.textBoxButtonDateDiv.appendChild(this.textBoxCancelButtonDate);
        this.dateDiv.appendChild(this.textBoxButtonDateDiv);
        datePicker.appendTo(dateInput);
        this.dataPickerOkButton = new Button({ cssClass: 'e-de-save e-primary', iconCss: 'e-de-save-icon' }, this.textBoxOkButtonDate);
        new Button({ cssClass: 'e-de-cancel', iconCss: 'e-de-cancel-icon' }, this.textBoxCancelButtonDate);
        this.datePickerInstance = datePicker;
        return this.dateDiv;
    };
    FormFieldPopUp.prototype.initDropDownList = function () {
        this.dropDownDiv = createElement('div', { className: 'e-de-ddl-field' });
        var dropDownInput = createElement('input', { className: 'e-de-txt-form' });
        var ddl = new DropDownList();
        this.dropDownInput = dropDownInput;
        this.textBoxButtonDropDownDiv = createElement('div', { className: 'e-de-cmt-action-button' });
        this.textBoxOkButtonDropDown = createElement('button');
        this.textBoxCancelButtonDropDown = createElement('button');
        this.textBoxOkButtonDropDown.addEventListener('click', this.applyDropDownFormFieldValueClickHandler);
        this.textBoxCancelButtonDropDown.addEventListener('click', this.closeButtonClickHandler);
        this.dropDownDiv.appendChild(dropDownInput);
        this.textBoxButtonDropDownDiv.appendChild(this.textBoxOkButtonDropDown);
        this.textBoxButtonDropDownDiv.appendChild(this.textBoxCancelButtonDropDown);
        this.dropDownDiv.appendChild(this.textBoxButtonDropDownDiv);
        ddl.appendTo(dropDownInput);
        new Button({ cssClass: 'e-de-save e-primary', iconCss: 'e-de-save-icon' }, this.textBoxOkButtonDropDown);
        new Button({ cssClass: 'e-de-cancel', iconCss: 'e-de-cancel-icon' }, this.textBoxCancelButtonDropDown);
        this.ddlInstance = ddl;
        return this.dropDownDiv;
    };
    FormFieldPopUp.prototype.onApplyTextFormFieldValueClick = function () {
        this.applyTextFormFieldValue();
    };
    FormFieldPopUp.prototype.onApplyNumberFormFieldValueClick = function () {
        this.applyNumberFormFieldValue();
    };
    FormFieldPopUp.prototype.onApplyDateFormFieldValueClick = function () {
        this.applyDateFormFieldValue();
    };
    FormFieldPopUp.prototype.onApplyDropDownFormFieldValueClick = function () {
        this.applyDropDownFormFieldValue();
    };
    /**
     * @private
     * @param {FieldElementBox} formField - Specifies the field element.
     * @returns {void}
     */
    FormFieldPopUp.prototype.showPopUp = function (formField) {
        var _this = this;
        if (formField) {
            this.formField = formField;
            this.owner.selectionModule.selectField();
            if (isNullOrUndefined(this.target)) {
                this.initPopup();
            }
            classList(this.target, [], ['e-de-txt-form', 'e-de-num-form', 'e-de-date-form', 'e-de-ddl-form']);
            var formFieldData = formField.formFieldData;
            if (formFieldData) {
                if (formFieldData instanceof TextFormField) {
                    var resultText = formField.resultText;
                    var rex = RegExp(this.owner.documentHelper.textHelper.getEnSpaceCharacter(), 'gi');
                    if (resultText.replace(rex, '') === '') {
                        resultText = '';
                    }
                    var maxLength = formFieldData.maxLength;
                    var formFieldType = formFieldData.type;
                    var inputElement_1;
                    resultText = resultText ? resultText : '';
                    if (formFieldType === 'Text' || formFieldType === 'Calculation') {
                        classList(this.target, ['e-de-txt-form'], []);
                        inputElement_1 = this.textBoxInput;
                        this.textBoxInstance.value = resultText;
                    }
                    else if (formFieldData.type === 'Number') {
                        classList(this.target, ['e-de-num-form'], []);
                        inputElement_1 = this.numberInput;
                        this.numericTextBoxInstance.format = formFieldData.format;
                        this.numericTextBoxInstance.value = parseFloat(resultText.replace(/,/gi, ''));
                    }
                    else if (formFieldType === 'Date') {
                        classList(this.target, ['e-de-date-form'], []);
                        inputElement_1 = this.dateInput;
                        var format = formFieldData.format;
                        if (format.indexOf('am/pm') !== -1) {
                            format = format.replace(/am\/pm/gi, 'a');
                        }
                        this.datePickerInstance.format = format;
                        this.datePickerInstance.value = new Date(resultText);
                        this.dataPickerOkButton.disabled = true;
                    }
                    if (inputElement_1) {
                        if (maxLength > 0) {
                            inputElement_1.maxLength = maxLength;
                        }
                        else {
                            inputElement_1.removeAttribute('maxlength');
                        }
                        setTimeout(function () {
                            inputElement_1.focus();
                        });
                    }
                }
                else if (formFieldData instanceof DropDownFormField) {
                    classList(this.target, ['e-de-ddl-form'], []);
                    this.ddlInstance.refresh();
                    this.ddlInstance.dataSource = formFieldData.dropdownItems;
                    this.ddlInstance.index = formFieldData.selectedIndex;
                    setTimeout(function () {
                        _this.ddlInstance.showPopup();
                    }, 50);
                }
                var left = this.owner.selectionModule.getLeftInternal(formField.line, formField, 0);
                var lineHeight = formField.line.height * this.owner.documentHelper.zoomFactor;
                var position = this.owner.selectionModule.getTooltipPosition(formField.line, left, this.target, true);
                if (!this.popupObject) {
                    this.popupObject = new Popup(this.target, {
                        height: 'auto',
                        width: 'auto',
                        relateTo: this.owner.documentHelper.viewerContainer.parentElement,
                        position: { X: position.x, Y: position.y + lineHeight }
                    });
                }
                this.target.style.display = 'block';
                this.popupObject.show();
            }
            this.owner.documentHelper.isFormFilling = true;
        }
    };
    FormFieldPopUp.prototype.onCloseButtonClick = function () {
        this.closeButton();
    };
    /**
     * @private
     * @returns {void}
     */
    FormFieldPopUp.prototype.destroy = function () {
        if (this.formField) {
            this.formField.destroy();
        }
        this.formField = undefined;
        this.owner = undefined;
        this.removeEvents();
        this.removeElements();
    };
    FormFieldPopUp.prototype.removeEvents = function () {
        if (this.textBoxOkButton) {
            this.textBoxOkButton.removeEventListener('click', this.applyTextFormFieldValueClickHandler);
        }
        if (this.textBoxCancelButton) {
            this.textBoxCancelButton.removeEventListener('click', this.closeButtonClickHandler);
        }
        if (this.textBoxOkButtonNumeric) {
            this.textBoxOkButtonNumeric.removeEventListener('click', this.applyNumberFormFieldValueClickHandler);
        }
        if (this.textBoxCancelButtonNumeric) {
            this.textBoxCancelButtonNumeric.removeEventListener('click', this.closeButtonClickHandler);
        }
        if (this.textBoxOkButtonDate) {
            this.textBoxOkButtonDate.removeEventListener('click', this.applyDateFormFieldValueClickHandler);
        }
        if (this.textBoxCancelButtonDate) {
            this.textBoxCancelButtonDate.removeEventListener('click', this.closeButtonClickHandler);
        }
        if (this.textBoxOkButtonDropDown) {
            this.textBoxOkButtonDropDown.removeEventListener('click', this.applyDropDownFormFieldValueClickHandler);
        }
        if (this.textBoxCancelButtonDropDown) {
            this.textBoxCancelButtonDropDown.removeEventListener('click', this.closeButtonClickHandler);
        }
    };
    FormFieldPopUp.prototype.removeElements = function () {
        if (this.popupElement) {
            this.popupElement.remove();
            this.popupElement = undefined;
        }
        if (this.textBoxDiv) {
            this.textBoxDiv.remove();
            this.textBoxDiv = undefined;
        }
        if (this.textBoxButtonDiv) {
            this.textBoxButtonDiv.remove();
            this.textBoxButtonDiv = undefined;
        }
        if (this.textBoxOkButton) {
            this.textBoxOkButton.remove();
            this.textBoxOkButton = undefined;
        }
        if (this.textBoxCancelButton) {
            this.textBoxCancelButton.remove();
            this.textBoxCancelButton = undefined;
        }
        if (this.numericDiv) {
            this.numericDiv.remove();
            this.numericDiv = undefined;
        }
        if (this.textBoxButtonNumericDiv) {
            this.textBoxButtonNumericDiv.remove();
            this.textBoxButtonNumericDiv = undefined;
        }
        if (this.textBoxOkButtonNumeric) {
            this.textBoxOkButtonNumeric.remove();
            this.textBoxOkButtonNumeric = undefined;
        }
        if (this.textBoxCancelButtonNumeric) {
            this.textBoxCancelButtonNumeric.remove();
            this.textBoxCancelButtonNumeric = undefined;
        }
        if (this.dateDiv) {
            this.dateDiv.remove();
            this.dateDiv = undefined;
        }
        if (this.textBoxButtonDateDiv) {
            this.textBoxButtonDateDiv.remove();
            this.textBoxButtonDateDiv = undefined;
        }
        if (this.textBoxOkButtonDate) {
            this.textBoxOkButtonDate.remove();
            this.textBoxOkButtonDate = undefined;
        }
        if (this.textBoxCancelButtonDate) {
            this.textBoxCancelButtonDate.remove();
            this.textBoxCancelButtonDate = undefined;
        }
        if (this.dropDownDiv) {
            this.dropDownDiv.remove();
            this.dropDownDiv = undefined;
        }
        if (this.textBoxButtonDropDownDiv) {
            this.textBoxButtonDropDownDiv.remove();
            this.textBoxButtonDropDownDiv = undefined;
        }
        if (this.textBoxOkButtonDropDown) {
            this.textBoxOkButtonDropDown.remove();
            this.textBoxOkButtonDropDown = undefined;
        }
        if (this.textBoxCancelButtonDropDown) {
            this.textBoxCancelButtonDropDown.remove();
            this.textBoxCancelButtonDropDown = undefined;
        }
        if (this.target) {
            this.target.remove();
            this.target = undefined;
        }
        if (this.textBoxContainer) {
            this.textBoxContainer.remove();
            this.textBoxContainer = undefined;
        }
        if (this.textBoxInput) {
            this.textBoxInput.remove();
            this.textBoxInput = undefined;
        }
        if (this.numberInput) {
            this.numberInput.remove();
            this.numberInput = undefined;
        }
        if (this.dateInput) {
            this.dateInput.remove();
            this.dateInput = undefined;
        }
        if (this.dropDownInput) {
            this.dropDownInput.remove();
            this.dropDownInput = undefined;
        }
        if (this.numbericInput) {
            this.numbericInput.remove();
            this.numbericInput = undefined;
        }
        if (this.popupObject) {
            this.popupObject.destroy();
            this.popupObject = undefined;
        }
        if (this.textBoxInstance) {
            this.textBoxInstance.destroy();
            this.textBoxInstance = undefined;
        }
        if (this.numericTextBoxInstance) {
            this.numericTextBoxInstance.destroy();
            this.numericTextBoxInstance = undefined;
        }
        if (this.datePickerInstance) {
            this.datePickerInstance.destroy();
            this.datePickerInstance = undefined;
        }
        if (this.ddlInstance) {
            this.ddlInstance.destroy();
            this.ddlInstance = undefined;
        }
        if (this.dataPickerOkButton) {
            this.dataPickerOkButton.destroy();
            this.dataPickerOkButton = undefined;
        }
    };
    return FormFieldPopUp;
}());
export { FormFieldPopUp };
