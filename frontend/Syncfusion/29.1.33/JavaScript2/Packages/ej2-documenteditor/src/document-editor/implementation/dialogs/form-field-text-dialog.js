import { createElement, L10n, isNullOrUndefined } from '@syncfusion/ej2-base';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { FieldElementBox, TextFormField } from '../viewer/page';
import { NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { DropDownList, ComboBox } from '@syncfusion/ej2-dropdowns';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { HelperMethods } from '../editor/editor-helper';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
/**
 * Form field text dialog is used to modify the value in text form field.
 */
var TextFormFieldDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} owner - Specifies the document helper.
     * @private
     */
    function TextFormFieldDialog(owner) {
        var _this = this;
        /**
         * @private
         * @returns {void}
         */
        this.updateTextFormtas = function () {
            var defautText = _this.updateFormats(_this.defaultTextInput.value);
            _this.defaultTextInput.value = !isNullOrUndefined(defautText) ? defautText : '';
        };
        /**
         * @private
         * @returns {void}
         */
        this.onCancelButtonClick = function () {
            _this.documentHelper.dialog.hide();
        };
        /**
         * @private
         * @returns {void}
         */
        this.insertTextField = function () {
            var valid = true;
            if (_this.typeDropDown.value === 'Date') {
                valid = _this.isValidDateFormat();
            }
            if (valid) {
                _this.updateTextFormtas();
                if (_this.defaultTextInput.value.length > _this.maxLengthNumber.value && !isNullOrUndefined(_this.maxLengthNumber.value) &&
                    _this.maxLengthNumber.value !== 0) {
                    DialogUtility.alert({
                        content: 'The maximum length value must be equal or greater than the length of the default text.',
                        showCloseIcon: true,
                        closeOnEscape: true,
                        position: { X: 'center', Y: 'center' },
                        animationSettings: { effect: 'Zoom' }
                    }).enableRtl = _this.owner.enableRtl;
                }
                else {
                    var type = void 0;
                    if (_this.typeDropDown.value === 'Date') {
                        type = 'Date';
                    }
                    else if (_this.typeDropDown.value === 'Number') {
                        type = 'Number';
                    }
                    else {
                        type = 'Text';
                    }
                    var format = SanitizeHtmlHelper.sanitize(_this.textFormatDropDown.value);
                    var formField = new TextFormField();
                    formField.type = type;
                    formField.defaultValue = _this.defaultTextInput.value;
                    formField.maxLength = _this.maxLengthNumber.value;
                    formField.format = !isNullOrUndefined(format) ? format : '';
                    formField.name = _this.bookmarkTextInput.value;
                    formField.helpText = _this.tooltipTextInput.value;
                    formField.enabled = _this.fillInEnable.checked;
                    _this.owner.editorModule.editFormField('Text', formField);
                    _this.closeTextField();
                }
            }
            else {
                DialogUtility.alert({
                    content: 'A valid date or time is required',
                    showCloseIcon: true,
                    closeOnEscape: true,
                    position: { X: 'center', Y: 'center' },
                    animationSettings: { effect: 'Zoom' }
                }).enableRtl = _this.owner.enableRtl;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeTextField = function () {
            _this.documentHelper.dialog.hide();
            _this.documentHelper.dialog.element.style.pointerEvents = '';
        };
        this.owner = owner;
    }
    Object.defineProperty(TextFormFieldDialog.prototype, "documentHelper", {
        get: function () {
            return this.owner.documentHelper;
        },
        enumerable: true,
        configurable: true
    });
    TextFormFieldDialog.prototype.getModuleName = function () {
        return 'TextFormFieldDialog';
    };
    /* eslint-disable  */
    /**
     * @private
     * @param {L10n} locale - Specifies the locale.
     * @returns {void}
     */
    TextFormFieldDialog.prototype.initTextDialog = function (localValue, isRtl) {
        var _this = this;
        this.target = createElement('div');
        this.dialogDiv = createElement('div');
        this.firstDiv = createElement('div', { className: 'e-de-container-row' });
        this.typeDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.defaultTextDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        // let typeLabel: HTMLElement = createElement('div', {
        //     className: 'e-de-ff-dlg-heading-small',
        //     innerHTML: localValue.getConstant('Type')
        // });
        //define the array of complex data
        var typeDropDownitems = [
            { Value: 'Regular text', Name: localValue.getConstant('Regular text') },
            { Value: 'Number', Name: localValue.getConstant('Number') },
            { Value: 'Date', Name: localValue.getConstant('Date') }
        ];
        this.typeDropDownList = createElement('input');
        this.typeDropDown = new DropDownList({
            dataSource: typeDropDownitems,
            popupHeight: '150px',
            value: 'Regular text',
            change: this.changeTypeDropDown.bind(this),
            floatLabelType: 'Always',
            placeholder: localValue.getConstant('Type'),
            fields: { text: 'Name', value: 'Value' },
            htmlAttributes: { 'aria-labelledby': localValue.getConstant('Type') }
        });
        // this.defaultTextLabel = createElement('div', {
        //     className: 'e-de-ff-dlg-heading-small',
        //     innerHTML: localValue.getConstant('Default text')
        // });
        this.defaultTextInput = createElement('input', { className: 'e-input e-bookmark-textbox-input' });
        this.secondDiv = createElement('div', { className: 'e-de-container-row' });
        this.maxLengthDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        // let maxLengthLabel: HTMLElement = createElement('div', {
        //     className: 'e-de-ff-dlg-heading-small',
        //     innerHTML: localValue.getConstant('Maximum length')
        // });
        this.maxLength = createElement('input', { attrs: { 'aria-labelledby': localValue.getConstant('Maximum length') } });
        this.maxLengthNumber = new NumericTextBox({
            format: 'n', value: 0, min: 0, max: 32767, width: '100%', enablePersistence: false,
            placeholder: localValue.getConstant('Maximum length'), floatLabelType: 'Always',
            change: function (args) {
                if (!args.value) {
                    this.element.value = localValue.getConstant('Unlimited');
                }
            },
            focus: function (args) {
                if (!args.value) {
                    this.element.value = localValue.getConstant('Unlimited');
                }
            },
            blur: function (args) {
                if (!args.value) {
                    var proxy_1 = this;
                    setTimeout(function () {
                        proxy_1.element.value = localValue.getConstant('Unlimited');
                    }, 0);
                }
            },
        });
        this.textFromatDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        // this.textFormatLabel = createElement('div', {
        //     className: 'e-de-ff-dlg-heading-small',
        //     innerHTML: localValue.getConstant('Text format')
        // });
        this.textFormatList = createElement('input');
        var formatDropDownitems = [
            { Value: "Uppercase", Name: localValue.getConstant("Uppercase") },
            { Value: "Lowercase", Name: localValue.getConstant("Lowercase") },
            { Value: "FirstCapital", Name: localValue.getConstant("FirstCapital") },
            { Value: "Titlecase", Name: localValue.getConstant("TitleCase") }
        ];
        this.textFormatDropDown = new ComboBox({
            dataSource: formatDropDownitems,
            popupHeight: '150px',
            allowCustom: true,
            showClearButton: false,
            change: this.updateTextFormtas.bind(this),
            placeholder: localValue.getConstant('Text format'),
            floatLabelType: 'Always',
            fields: { text: 'Name', value: 'Value' }
        });
        this.textFormatDropDown.focus = function () {
            _this.textFormatDropDown.element.select();
        };
        this.fileSettingsLabel = createElement('div', {
            className: 'e-de-ff-dlg-heading',
            innerHTML: localValue.getConstant('Field settings')
        });
        this.thirdDiv = createElement('div', { className: 'e-de-container-row' });
        this.toolTipTotalDiv = createElement('div', { className: 'e-de-subcontainer-left' });
        this.bookmarkTotalDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        // let toolTipHeadingLabel: HTMLElement = createElement('div', {
        //     className: 'e-de-ff-dlg-heading-small',
        //     innerHTML: localValue.getConstant('Tooltip')
        // });
        this.tooltipTextInput = createElement('input', { className: 'e-input e-bookmark-textbox-input' });
        // let bookmarkHeadingLabel: HTMLElement = createElement('div', {
        //     className: 'e-de-ff-dlg-heading-small',
        //     innerHTML: localValue.getConstant('Name')
        // });
        this.bookmarkTextInput = createElement('input', { className: 'e-input e-bookmark-textbox-input' });
        this.fillInEnableDiv = createElement('div');
        this.fillInEnableEle = createElement('input', { attrs: { type: 'checkbox' } });
        this.fillInEnableEle.setAttribute('aria-label', localValue.getConstant('Fillin enabled'));
        this.fillInEnable = new CheckBox({
            cssClass: 'e-de-ff-dlg-check',
            label: localValue.getConstant('Fillin enabled'),
            enableRtl: isRtl
        });
        if (isRtl) {
            this.typeDiv.classList.add('e-de-rtl');
            this.maxLengthDiv.classList.add('e-de-rtl');
            this.toolTipTotalDiv.classList.add('e-de-rtl');
            this.bookmarkTotalDiv.classList.add('e-de-rtl');
        }
        this.target.appendChild(this.dialogDiv);
        this.dialogDiv.appendChild(this.firstDiv);
        this.firstDiv.appendChild(this.typeDiv);
        //typeDiv.appendChild(typeLabel);
        this.typeDiv.appendChild(this.typeDropDownList);
        this.typeDropDown.appendTo(this.typeDropDownList);
        this.firstDiv.appendChild(this.defaultTextDiv);
        //this.defaultTextDiv.appendChild(this.defaultTextLabel);
        this.defaultTextDiv.appendChild(this.defaultTextInput);
        this.dialogDiv.appendChild(this.secondDiv);
        this.secondDiv.appendChild(this.maxLengthDiv);
        //maxLengthDiv.appendChild(maxLengthLabel);
        this.maxLengthDiv.appendChild(this.maxLength);
        this.maxLengthNumber.appendTo(this.maxLength);
        this.secondDiv.appendChild(this.textFromatDiv);
        //textFromatDiv.appendChild(this.textFormatLabel);
        this.textFromatDiv.appendChild(this.textFormatList);
        this.textFormatDropDown.appendTo(this.textFormatList);
        this.dialogDiv.appendChild(this.fileSettingsLabel);
        this.dialogDiv.appendChild(this.thirdDiv);
        this.thirdDiv.appendChild(this.toolTipTotalDiv);
        //toolTipTotalDiv.appendChild(toolTipHeadingLabel);
        this.toolTipTotalDiv.appendChild(this.tooltipTextInput);
        this.thirdDiv.appendChild(this.bookmarkTotalDiv);
        //bookmarkTotalDiv.appendChild(bookmarkHeadingLabel);
        this.bookmarkTotalDiv.appendChild(this.bookmarkTextInput);
        this.dialogDiv.appendChild(this.fillInEnableDiv);
        this.fillInEnableDiv.appendChild(this.fillInEnableEle);
        this.fillInEnable.appendTo(this.fillInEnableEle);
        this.defaultTextLabel = new TextBox({ placeholder: localValue.getConstant('Default text'), floatLabelType: 'Always' }, this.defaultTextInput);
        new TextBox({ placeholder: localValue.getConstant('Tooltip'), floatLabelType: 'Always' }, this.tooltipTextInput);
        new TextBox({ placeholder: localValue.getConstant('Name'), floatLabelType: 'Always', htmlAttributes: { 'aria-labelledby': localValue.getConstant('Name') } }, this.bookmarkTextInput);
        this.defaultTextInput.setAttribute('aria-labelledby', localValue.getConstant('Default text'));
        this.tooltipTextInput.setAttribute('aria-labelledby', localValue.getConstant('Tooltip'));
        this.bookmarkTextInput.setAttribute('aria-labelledby', localValue.getConstant('Name'));
    };
    /**
     * @private
     * @returns {void}
     */
    TextFormFieldDialog.prototype.show = function () {
        this.localObj = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        this.localObj.setLocale(this.documentHelper.owner.locale);
        if (isNullOrUndefined(this.target)) {
            this.initTextDialog(this.localObj, this.documentHelper.owner.enableRtl);
        }
        this.loadTextDialog(this.localObj);
        this.documentHelper.dialog.header = this.localObj.getConstant('Text Form Field');
        this.documentHelper.dialog.position = { X: 'center', Y: 'center' };
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.width = '448px';
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.buttons = [{
                click: this.insertTextField,
                buttonModel: { content: this.localObj.getConstant('Ok'), cssClass: 'e-flat e-table-cell-margin-okay', isPrimary: true }
            },
            {
                click: this.onCancelButtonClick,
                buttonModel: { content: this.localObj.getConstant('Cancel'), cssClass: 'e-flat e-table-cell-margin-cancel' }
            }];
        this.documentHelper.dialog.show();
    };
    /**
     * @private
     * @param {ChangeEventArgs} args - Specifies the event args.
     * @returns {void}
     */
    TextFormFieldDialog.prototype.changeTypeDropDown = function (args) {
        if (args.isInteracted) {
            this.defaultTextInput.value = '';
            this.textFormatDropDown.value = '';
        }
        if (args.value === 'Regular text') {
            this.textFormatDropDown.fields = { text: 'Name', value: 'Value' };
            this.defaultTextLabel.placeholder = this.localObj.getConstant('Default text');
            this.textFormatDropDown.placeholder = this.localObj.getConstant('Text format');
            this.textFormatDropDown.dataSource = [
                { Value: "Uppercase", Name: this.localObj.getConstant("Uppercase") },
                { Value: "Lowercase", Name: this.localObj.getConstant("Lowercase") },
                { Value: "FirstCapital", Name: this.localObj.getConstant("FirstCapital") },
                { Value: "Titlecase", Name: this.localObj.getConstant("TitleCase") }
            ];
        }
        else if (args.value === 'Number') {
            this.textFormatDropDown.fields = { text: null, value: null };
            this.defaultTextLabel.placeholder = this.localObj.getConstant('Default number');
            this.textFormatDropDown.placeholder = this.localObj.getConstant('Number format');
            this.textFormatDropDown.dataSource = ['0', '0.00', '#,##0', '#,##0.00', '$#,##0.00;($#,##0.00)', '0%'];
        }
        else if (args.value === 'Date') {
            this.textFormatDropDown.fields = { text: null, value: null };
            this.defaultTextLabel.placeholder = this.localObj.getConstant('Default date');
            this.textFormatDropDown.placeholder = this.localObj.getConstant('Date format');
            this.textFormatDropDown.dataSource = ['M/d/yyyy', 'dddd, MMMM d, yyyy', 'MMMM d, yyyy', 'M/d/yy', 'yyyy-MM-dd', 'd-MMM-yy',
                'M.d.yyyy', 'MMM. d, yy', 'd MMMM yyyy', 'MMMM yy', 'MMM-yy', 'M/d/yyyy h:mm am/pm', 'M/d/yyyy h:mm:ss am/pm', 'h:mm am/pm', 'h:mm:ss am/pm',
                'HH:mm', 'HH:mm:ss'];
        }
        this.defaultTextLabel.dataBind();
        this.textFormatDropDown.dataBind();
    };
    /**
     * @private
     * @returns {void}
     */
    TextFormFieldDialog.prototype.loadTextDialog = function (local) {
        var inline = this.owner.selectionModule.getCurrentFormField();
        if (inline instanceof FieldElementBox) {
            this.fieldBegin = inline;
            var data = inline.formFieldData;
            if (data.maxLength > 0) {
                this.maxLengthNumber.value = data.maxLength;
            }
            else {
                this.maxLengthNumber.value = 0;
                this.maxLengthNumber.element.value = local ? local.getConstant('Unlimited') : 'Unlimited';
            }
            if (data.type === 'Date') {
                this.typeDropDown.value = 'Date';
            }
            else if (data.type === 'Number') {
                this.typeDropDown.value = 'Number';
            }
            else {
                this.typeDropDown.value = 'Regular text';
            }
            if (data.format) {
                this.textFormatDropDown.value = data.format;
            }
            else {
                this.textFormatDropDown.value = '';
            }
            this.defaultTextInput.value = !isNullOrUndefined(data.defaultValue) ? data.defaultValue : '';
            this.fillInEnable.checked = data.enabled;
            this.tooltipTextInput.value = !isNullOrUndefined(data.helpText) ? data.helpText : '';
            this.bookmarkTextInput.value = !isNullOrUndefined(data.name) ? data.name : '';
        }
    };
    TextFormFieldDialog.prototype.updateFormats = function (value) {
        var format = isNullOrUndefined(this.textFormatDropDown.value) ? '' : this.textFormatDropDown.value.toString();
        if (this.typeDropDown.value === 'Regular text') {
            return HelperMethods.formatText(format, value);
        }
        if (this.typeDropDown.value === 'Number') {
            var data = HelperMethods.formatNumber(format, value);
            if (!(data.toString() === 'NaN')) {
                return data;
            }
            return '';
        }
        if (this.typeDropDown.value === 'Date') {
            return HelperMethods.formatDate(format, value);
        }
        return '';
    };
    /**
     * @private
     * @returns {boolean} returns is valid date format.
     */
    TextFormFieldDialog.prototype.isValidDateFormat = function () {
        var value = this.defaultTextInput.value;
        if (value !== '') {
            var date = new Date(value);
            if (isNaN(date.getDate())) {
                return false;
            }
        }
        return true;
    };
    /**
     * @private
     * @returns {void}
     */
    TextFormFieldDialog.prototype.destroy = function () {
        var textDialogTarget = this.target;
        if (textDialogTarget) {
            if (textDialogTarget.parentElement) {
                textDialogTarget.parentElement.removeChild(textDialogTarget);
            }
            this.target = undefined;
        }
        if (this.maxLengthNumber) {
            this.maxLengthNumber.destroy();
            this.maxLengthNumber = undefined;
        }
        if (this.fillInEnable) {
            this.fillInEnable.destroy();
            this.fillInEnable = undefined;
        }
        if (this.typeDropDown) {
            this.typeDropDown.destroy();
            this.typeDropDown = undefined;
        }
        if (this.textFormatDropDown) {
            this.textFormatDropDown.destroy();
            this.textFormatDropDown = undefined;
        }
        this.owner = undefined;
        this.defaultTextInput = undefined;
        this.tooltipTextInput = undefined;
        this.bookmarkTextInput = undefined;
        this.defaultTextLabel = undefined;
        this.defaultTextDiv = undefined;
        this.textFormatLabel = undefined;
        this.removeElements();
    };
    TextFormFieldDialog.prototype.removeElements = function () {
        if (this.dialogDiv) {
            this.dialogDiv.remove();
            this.dialogDiv = undefined;
        }
        if (this.firstDiv) {
            this.firstDiv.remove();
            this.firstDiv = undefined;
        }
        if (this.typeDiv) {
            this.typeDiv.remove();
            this.typeDiv = undefined;
        }
        if (this.typeDropDownList) {
            this.typeDropDownList.remove();
            this.typeDropDownList = undefined;
        }
        if (this.secondDiv) {
            this.secondDiv.remove();
            this.secondDiv = undefined;
        }
        if (this.maxLengthDiv) {
            this.maxLengthDiv.remove();
            this.maxLengthDiv = undefined;
        }
        if (this.maxLength) {
            this.maxLength.remove();
            this.maxLength = undefined;
        }
        if (this.textFromatDiv) {
            this.textFromatDiv.remove();
            this.textFromatDiv = undefined;
        }
        if (this.textFormatList) {
            this.textFormatList.remove();
            this.textFormatList = undefined;
        }
        if (this.fileSettingsLabel) {
            this.fileSettingsLabel.remove();
            this.fileSettingsLabel = undefined;
        }
        if (this.thirdDiv) {
            this.thirdDiv.remove();
            this.thirdDiv = undefined;
        }
        if (this.toolTipTotalDiv) {
            this.toolTipTotalDiv.remove();
            this.toolTipTotalDiv = undefined;
        }
        if (this.bookmarkTotalDiv) {
            this.bookmarkTotalDiv.remove();
            this.bookmarkTotalDiv = undefined;
        }
        if (this.fillInEnableDiv) {
            this.fillInEnableDiv.remove();
            this.fillInEnableDiv = undefined;
        }
        if (this.fillInEnableEle) {
            this.fillInEnableEle.remove();
            this.fillInEnableEle = undefined;
        }
    };
    return TextFormFieldDialog;
}());
export { TextFormFieldDialog };
