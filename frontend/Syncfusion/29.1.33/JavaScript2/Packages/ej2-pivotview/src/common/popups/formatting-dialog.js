import { Dialog } from '@syncfusion/ej2-popups';
import { createElement, remove, extend, select, SanitizeHtmlHelper, getInstance, isNullOrUndefined } from '@syncfusion/ej2-base';
import * as cls from '../../common/base/css-constant';
import * as events from '../../common/base/constant';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { PivotUtil } from '../../base/util';
/**
 * Module to render NumberFormatting Dialog
 */
var NumberFormatting = /** @class */ (function () {
    function NumberFormatting(parent) {
        this.parent = parent;
        this.parent.numberFormattingModule = this;
        this.removeEventListener();
        this.addEventListener();
        this.newFormat = [];
        this.lastFormattedValue = [];
    }
    /**
     * To get module name.
     *
     * @returns {string} - It returns Module Name
     */
    NumberFormatting.prototype.getModuleName = function () {
        return 'numberFormatting';
    };
    /**
     * To show Number Formatting dialog.
     *
     * @returns {void}
     * @hidden
     */
    NumberFormatting.prototype.showNumberFormattingDialog = function () {
        var _this = this;
        var valueDialog = createElement('div', {
            id: this.parent.element.id + '_FormatDialog',
            className: cls.FORMATTING_DIALOG
        });
        this.parent.element.appendChild(valueDialog);
        this.dialog = new Dialog({
            animationSettings: { effect: 'Fade' },
            allowDragging: true,
            header: this.parent.localeObj.getConstant('numberFormat'),
            content: this.getDialogContent(),
            isModal: true,
            visible: true,
            showCloseIcon: true,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            width: '320px',
            height: 'auto',
            position: { X: 'center', Y: 'center' },
            buttons: [
                {
                    click: this.updateFormatting.bind(this),
                    isFlat: false,
                    buttonModel: { cssClass: cls.OK_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('apply'), isPrimary: true }
                },
                {
                    click: function () {
                        _this.dialog.hide();
                    },
                    isFlat: false,
                    buttonModel: { cssClass: cls.CANCEL_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            closeOnEscape: true,
            cssClass: this.parent.cssClass,
            target: this.parent.element,
            close: this.removeDialog.bind(this)
        });
        this.dialog.isStringTemplate = true;
        this.dialog.appendTo(valueDialog);
        this.dialog.element.querySelector('.' + cls.DIALOG_HEADER).innerText = this.parent.localeObj.getConstant('numberFormat');
        var formatObject;
        this.newFormat = [{ name: this.parent.localeObj.getConstant('AllValues'), format: 'N0', useGrouping: true, type: undefined }];
        var format = [];
        for (var i = 0; i < this.parent.dataSourceSettings.formatSettings.length; i++) {
            formatObject = {
                name: this.parent.dataSourceSettings.formatSettings[i].name,
                format: this.parent.dataSourceSettings.formatSettings[i].format,
                useGrouping: this.parent.dataSourceSettings.formatSettings[i].useGrouping,
                type: this.parent.dataSourceSettings.formatSettings[i].type
            };
            this.newFormat.push(formatObject);
        }
        for (var i = 0; i < this.newFormat.length; i++) {
            format.push(this.newFormat[i].name);
        }
        for (var j = 0; j < this.parent.dataSourceSettings.values.length; j++) {
            if (format.indexOf(this.parent.dataSourceSettings.values[j].name) === -1) {
                formatObject = {
                    name: this.parent.dataSourceSettings.values[j].name, format: 'N0',
                    useGrouping: true
                };
                this.newFormat.push(formatObject);
            }
        }
        this.renderControls();
    };
    NumberFormatting.prototype.getDialogContent = function () {
        var outerElement = createElement('div', {
            id: this.parent.element.id + '_FormatDialogOuter',
            className: cls.FORMATTING_DIALOG_OUTER
        });
        var table = createElement('table', {
            id: this.parent.element.id + '_FormatTable',
            className: cls.FORMATTING_TABLE,
            attrs: { 'role': 'tableItems' }
        });
        var tRow = createElement('tr');
        var tValue = createElement('td');
        var valueLable = createElement('div', {
            id: this.parent.element.id + '_FormatValueLable',
            className: cls.FORMATTING_VALUE_LABLE
        });
        valueLable.innerText = this.parent.localeObj.getConstant('values');
        var valueDrop = createElement('div', {
            id: this.parent.element.id + '_FormatValueDrop'
        });
        tValue.appendChild(valueLable);
        tValue.appendChild(valueDrop);
        tRow.appendChild(tValue);
        table.appendChild(tRow);
        tRow = createElement('tr');
        tValue = createElement('td');
        var formatLable = createElement('div', {
            id: this.parent.element.id + '_FormatLable',
            className: cls.FORMATTING_FORMAT_LABLE
        });
        formatLable.innerText = this.parent.localeObj.getConstant('formatType');
        var formatDrop = createElement('div', {
            id: this.parent.element.id + '_FormatDrop'
        });
        tValue.appendChild(formatLable);
        tValue.appendChild(formatDrop);
        tRow.appendChild(tValue);
        table.appendChild(tRow);
        tRow = createElement('tr');
        tValue = createElement('td');
        var groupingLable = createElement('div', {
            id: this.parent.element.id + '_GroupingLable',
            className: cls.FORMATTING_GROUPING_LABLE
        });
        groupingLable.innerText = this.parent.localeObj.getConstant('grouping');
        var groupingDrop = createElement('div', {
            id: this.parent.element.id + '_GroupingDrop'
        });
        tValue.appendChild(groupingLable);
        tValue.appendChild(groupingDrop);
        tRow.appendChild(tValue);
        table.appendChild(tRow);
        tRow = createElement('tr');
        tValue = createElement('td');
        var decimalLable = createElement('div', {
            id: this.parent.element.id + '_DecimalLable',
            className: cls.FORMATTING_DECIMAL_LABLE
        });
        decimalLable.innerText = this.parent.localeObj.getConstant('decimalPlaces');
        var decimalDrop = createElement('div', {
            id: this.parent.element.id + '_DecimalDrop'
        });
        tValue.appendChild(decimalLable);
        tValue.appendChild(decimalDrop);
        tRow.appendChild(tValue);
        table.appendChild(tRow);
        tRow = createElement('tr');
        tValue = createElement('td');
        this.customLable = createElement('div', {
            id: this.parent.element.id + '_CustomLable',
            className: cls.FORMATTING_CUSTOM_LABLE
        });
        this.customLable.innerText = this.parent.localeObj.getConstant('customFormatString');
        this.customText = createElement('input', {
            id: this.parent.element.id + '_CustomText',
            attrs: {
                'type': 'text', 'tabindex': '0'
            },
            className: cls.INPUT + ' ' + cls.FORMATTING_CUSTOM_TEXT
        });
        tValue.appendChild(this.customLable);
        tValue.appendChild(this.customText);
        tRow.appendChild(tValue);
        table.appendChild(tRow);
        tRow = createElement('tr');
        table.appendChild(tRow);
        outerElement.appendChild(table);
        return outerElement;
    };
    NumberFormatting.prototype.renderControls = function () {
        var valuesDropDown;
        var formatDropDown;
        var groupingDropDown;
        if (select('#' + this.parent.element.id + '_FormatValueDrop', this.dialog.element)) {
            var valueFields = [];
            valueFields.push({
                index: 0, name: this.parent.localeObj.getConstant('AllValues'), field: this.parent.localeObj.getConstant('AllValues')
            });
            for (var i = 0; i < this.parent.dataSourceSettings.values.length; i++) {
                var caption = this.parent.dataSourceSettings.values[i].caption ||
                    this.parent.dataSourceSettings.values[i].name;
                caption = this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(caption) : caption;
                valueFields.push({
                    index: i + 1, name: caption,
                    field: this.parent.dataSourceSettings.values[i].name
                });
            }
            valuesDropDown = new DropDownList({
                dataSource: valueFields, fields: { text: 'name', value: 'field' }, enableRtl: this.parent.enableRtl, locale: this.parent.locale,
                index: 0, cssClass: cls.FORMATTING_VALUE_DROP + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), change: this.valueChange.bind(this), width: '100%',
                open: this.customUpdate.bind(this)
            });
            valuesDropDown.isStringTemplate = true;
            valuesDropDown.appendTo(select('#' + this.parent.element.id + '_FormatValueDrop', this.dialog.element));
        }
        if (select('#' + this.parent.element.id + '_FormatDrop', this.dialog.element)) {
            var fields = [
                { index: 0, name: this.parent.localeObj.getConstant('number') },
                { index: 1, name: this.parent.localeObj.getConstant('currency') },
                { index: 2, name: this.parent.localeObj.getConstant('percentage') },
                { index: 3, name: this.parent.localeObj.getConstant('Custom') }
            ];
            formatDropDown = new DropDownList({
                dataSource: fields, fields: { text: 'name', value: 'name' },
                index: 0, change: this.dropDownChange.bind(this), enableRtl: this.parent.enableRtl, locale: this.parent.locale,
                cssClass: cls.FORMATTING_FORMAT_DROP + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), width: '100%'
            });
            formatDropDown.isStringTemplate = true;
            formatDropDown.appendTo(select('#' + this.parent.element.id + '_FormatDrop', this.dialog.element));
        }
        if (select('#' + this.parent.element.id + '_GroupingDrop', this.dialog.element)) {
            var fields = [
                { index: 0, name: this.parent.localeObj.getConstant('true') },
                { index: 1, name: this.parent.localeObj.getConstant('false') }
            ];
            groupingDropDown = new DropDownList({
                dataSource: fields, fields: { text: 'name', value: 'name' }, enableRtl: this.parent.enableRtl, locale: this.parent.locale,
                index: 0, cssClass: cls.FORMATTING_GROUPING_DROP + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), width: '100%', change: this.groupingChange.bind(this)
            });
            groupingDropDown.isStringTemplate = true;
            groupingDropDown.appendTo(select('#' + this.parent.element.id + '_GroupingDrop', this.dialog.element));
        }
        if (select('#' + this.parent.element.id + '_DecimalDrop', this.dialog.element)) {
            var fields = [
                { index: 0, name: 0 },
                { index: 1, name: 1 },
                { index: 2, name: 2 },
                { index: 3, name: 3 },
                { index: 4, name: 4 },
                { index: 5, name: 5 },
                { index: 6, name: 6 },
                { index: 7, name: 7 },
                { index: 8, name: 8 },
                { index: 9, name: 9 },
                { index: 10, name: 10 }
            ];
            var decimalDropDown = new DropDownList({
                dataSource: fields, fields: { text: 'name', value: 'name' }, enableRtl: this.parent.enableRtl, locale: this.parent.locale,
                index: 0, cssClass: cls.FORMATTING_DECIMAL_DROP + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), popupHeight: 150, width: '100%', change: this.decimalChange.bind(this)
            });
            decimalDropDown.isStringTemplate = true;
            decimalDropDown.appendTo(select('#' + this.parent.element.id + '_DecimalDrop', this.dialog.element));
        }
        if (formatDropDown.value !== this.parent.localeObj.getConstant('Custom')) {
            this.customText.disabled = true;
        }
        if (this.lastFormattedValue.length !== 0) {
            valuesDropDown.value = this.lastFormattedValue[0].name;
            var fString = this.lastFormattedValue[0].format;
            var first = fString === '' ? '' : fString.split('')[0].toLowerCase();
            var group = this.lastFormattedValue[0].useGrouping ? this.parent.localeObj.getConstant('true') :
                this.parent.localeObj.getConstant('false');
            this.updateFormattingDialog(fString, first, group);
        }
    };
    NumberFormatting.prototype.valueChange = function (args) {
        var format = this.newFormat;
        var isExist = false;
        for (var i = 0; i < format.length; i++) {
            if (format[i].name === args.value) {
                var fString = format[i].format;
                var first = fString === '' ? '' : fString.split('')[0].toLowerCase();
                var group = format[i].useGrouping ? this.parent.localeObj.getConstant('true') :
                    this.parent.localeObj.getConstant('false');
                this.updateFormattingDialog(fString, first, group);
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            var formatDropDown = getInstance(select('#' + this.parent.element.id + '_FormatDrop', this.parent.element), DropDownList);
            formatDropDown.value = this.parent.localeObj.getConstant('number');
            var decimalDropDown = getInstance(select('#' + this.parent.element.id + '_DecimalDrop', this.parent.element), DropDownList);
            decimalDropDown.value = 0;
            var groupingDropDown = getInstance(select('#' + this.parent.element.id + '_GroupingDrop', this.parent.element), DropDownList);
            groupingDropDown.value = this.parent.localeObj.getConstant('true');
        }
    };
    NumberFormatting.prototype.updateFormattingDialog = function (fString, first, group) {
        var formatDropDown = getInstance(select('#' + this.parent.element.id + '_FormatDrop', this.parent.element), DropDownList);
        if (fString.length === 2 && ['n', 'p', 'c'].indexOf(first) > -1) {
            formatDropDown.value = first === 'n' ? this.parent.localeObj.getConstant('number') : first === 'p' ?
                this.parent.localeObj.getConstant('percentage') : first === 'c' ? this.parent.localeObj.getConstant('currency') :
                this.parent.localeObj.getConstant('number');
            var decimalDropDown = getInstance(select('#' + this.parent.element.id + '_DecimalDrop', this.parent.element), DropDownList);
            decimalDropDown.value = Number(fString.split('')[1]);
            var groupingDropDown = getInstance(select('#' + this.parent.element.id + '_GroupingDrop', this.parent.element), DropDownList);
            groupingDropDown.value = group;
        }
        else {
            formatDropDown.value = this.parent.localeObj.getConstant('Custom');
            this.customText.value = fString;
        }
    };
    NumberFormatting.prototype.customUpdate = function () {
        var formatDropDown = getInstance(select('#' + this.parent.element.id + '_FormatDrop', this.parent.element), DropDownList);
        if (formatDropDown.value === this.parent.localeObj.getConstant('Custom')) {
            var index = this.getIndexValue();
            this.newFormat[index].format = this.customText.value;
        }
    };
    NumberFormatting.prototype.dropDownChange = function (args) {
        var index = this.getIndexValue();
        var groupingDropDown = getInstance(select('#' + this.parent.element.id + '_GroupingDrop', this.parent.element), DropDownList);
        var decimalDropDown = getInstance(select('#' + this.parent.element.id + '_DecimalDrop', this.parent.element), DropDownList);
        if (args.value === this.parent.localeObj.getConstant('Custom')) {
            this.customText.disabled = false;
            groupingDropDown.enabled = false;
            decimalDropDown.enabled = false;
            this.newFormat[index].format = this.customText.value;
        }
        else {
            var text = this.formattedText();
            this.newFormat[index].format = text;
            this.customText.disabled = true;
            groupingDropDown.enabled = true;
            decimalDropDown.enabled = true;
            this.customText.value = '';
        }
    };
    NumberFormatting.prototype.groupingChange = function () {
        var index = this.getIndexValue();
        var groupingDropDown = getInstance(select('#' + this.parent.element.id + '_GroupingDrop', this.parent.element), DropDownList);
        this.newFormat[index].useGrouping = groupingDropDown.value === this.parent.localeObj.getConstant('true') ? true : false;
    };
    NumberFormatting.prototype.getIndexValue = function () {
        var format = [];
        for (var i = 0; i < this.newFormat.length; i++) {
            format.push(this.newFormat[i].name);
        }
        var valuesDropDown = getInstance(select('#' + this.parent.element.id + '_FormatValueDrop', this.parent.element), DropDownList);
        var index = format.indexOf(valuesDropDown.value.toString());
        return index;
    };
    NumberFormatting.prototype.decimalChange = function () {
        var index = this.getIndexValue();
        var text = this.formattedText();
        this.newFormat[index].format = text;
    };
    NumberFormatting.prototype.formattedText = function () {
        var text;
        var formatDropDown = getInstance(select('#' + this.parent.element.id + '_FormatDrop', this.parent.element), DropDownList);
        var decimalDropDown = getInstance(select('#' + this.parent.element.id + '_DecimalDrop', this.parent.element), DropDownList);
        if (formatDropDown.value === this.parent.localeObj.getConstant('number') ||
            formatDropDown.value === this.parent.localeObj.getConstant('percentage') ||
            formatDropDown.value === this.parent.localeObj.getConstant('currency')) {
            text = formatDropDown.value === this.parent.localeObj.getConstant('number') ? 'N' :
                formatDropDown.value === this.parent.localeObj.getConstant('currency') ? 'C' : 'P';
            return text += decimalDropDown.value;
        }
        else {
            return text = this.customText.value;
        }
    };
    NumberFormatting.prototype.removeDialog = function () {
        if (this.dialog && !this.dialog.isDestroyed) {
            this.dialog.destroy();
        }
        if (document.getElementById(this.parent.element.id + '_FormatDialog')) {
            remove(document.getElementById(this.parent.element.id + '_FormatDialog'));
        }
    };
    NumberFormatting.prototype.updateFormatting = function () {
        var _this = this;
        var text = this.formattedText();
        var index = this.getIndexValue();
        this.newFormat = this.newFormat.splice(index, 1);
        var format = extend([], this.newFormat, true);
        var formatSettings = this.parent.dataSourceSettings.formatSettings;
        for (var i = 0; i < formatSettings.length; i++) {
            this.insertFormat(formatSettings[i].name, formatSettings[i].format, formatSettings[i].type, formatSettings[i].currency, formatSettings[i].useGrouping);
        }
        var valuesDropDown = getInstance(select('#' + this.parent.element.id + '_FormatValueDrop', this.parent.element), DropDownList);
        if (valuesDropDown.value === this.parent.localeObj.getConstant('AllValues')) {
            for (var i = 0; i < this.parent.dataSourceSettings.values.length; i++) {
                this.insertFormat(this.parent.dataSourceSettings.values[i].name, text);
            }
        }
        else {
            this.insertFormat(valuesDropDown.value.toString(), text);
        }
        var eventArgs = {
            formatSettings: PivotUtil.cloneFormatSettings(this.newFormat),
            formatName: valuesDropDown.value.toString(),
            cancel: false
        };
        this.parent.trigger(events.numberFormatting, eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                if (_this.parent.dataType === 'olap') {
                    var _loop_1 = function (i) {
                        var fieldInfo = PivotUtil.getFieldInfo(observedArgs.formatSettings[i].name, _this.parent);
                        _this.parent.dataSourceSettings.calculatedFieldSettings.forEach(function (calculatedField) {
                            if (calculatedField.name === fieldInfo.fieldName) {
                                calculatedField.formatString = observedArgs.formatSettings[i].format;
                            }
                        });
                    };
                    for (var i = 0; i < observedArgs.formatSettings.length; i++) {
                        _loop_1(i);
                    }
                }
                _this.parent.setProperties({ dataSourceSettings: { formatSettings: observedArgs.formatSettings } }, true);
                var actionInfo = {
                    numberFormattingInfo: _this.parent.dataSourceSettings.formatSettings
                };
                _this.parent.actionObj.actionInfo = actionInfo;
                try {
                    _this.parent.updateDataSource();
                    _this.dialog.close();
                }
                catch (exception) {
                    _this.parent.setProperties({ dataSourceSettings: { formatSettings: format } }, true);
                    _this.parent.pivotCommon.errorDialog.createErrorDialog(_this.parent.localeObj.getConstant('error'), _this.parent.localeObj.getConstant('invalidFormat'));
                    _this.parent.hideWaitingPopup();
                }
            }
            else {
                _this.dialog.close();
                _this.parent.setProperties({ dataSourceSettings: { formatSettings: format } }, true);
            }
        });
    };
    NumberFormatting.prototype.insertFormat = function (fieldName, text, formatType, currency, useGrouping) {
        var isExist = false;
        var groupingDropDown = getInstance(select('#' + this.parent.element.id + '_GroupingDrop', this.parent.element), DropDownList);
        var newFormat = {
            name: fieldName, format: text,
            useGrouping: !isNullOrUndefined(useGrouping) ?
                useGrouping : groupingDropDown.value === this.parent.localeObj.getConstant('true') ? true : false,
            type: formatType,
            currency: currency
        };
        var format = this.newFormat;
        for (var i = 0; i < format.length; i++) {
            if (format[i].name === fieldName) {
                format[i] = newFormat;
                isExist = true;
            }
        }
        if (!isExist) {
            format.push(newFormat);
        }
        this.lastFormattedValue = [];
        this.lastFormattedValue.push(newFormat);
    };
    /**
     * To add event listener.
     *
     * @returns {void}
     * @hidden
     */
    NumberFormatting.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initFormatting, this.showNumberFormattingDialog, this);
    };
    /**
     * To remove event listener.
     *
     * @returns {void}
     * @hidden
     */
    NumberFormatting.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initFormatting, this.showNumberFormattingDialog);
    };
    /**
     * To destroy the calculated field dialog
     *
     * @returns {void}
     * @hidden
     */
    NumberFormatting.prototype.destroy = function () {
        if (this.dialog && !this.dialog.isDestroyed) {
            this.dialog.destroy();
            this.dialog = null;
        }
        this.removeEventListener();
    };
    return NumberFormatting;
}());
export { NumberFormatting };
