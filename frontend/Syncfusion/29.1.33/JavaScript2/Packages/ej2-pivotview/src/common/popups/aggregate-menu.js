import { createElement, remove, extend, getInstance, select } from '@syncfusion/ej2-base';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import * as cls from '../../common/base/css-constant';
import { ContextMenu as Menu } from '@syncfusion/ej2-navigations';
import { Dialog } from '@syncfusion/ej2-popups';
import { MaskedTextBox } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import * as events from '../../common/base/constant';
import { PivotUtil } from '../../base/util';
/**
 * `AggregateMenu` module to create aggregate type popup.
 */
/** @hidden */
var AggregateMenu = /** @class */ (function () {
    /**
     * Constructor for the rener action.
     *
     * @param {PivotView | PivotFieldList} parent - It contains the value of parent.
     * @hidden
     */
    function AggregateMenu(parent) {
        this.menuInfo = [];
        this.stringAggregateTypes = ['Count', 'DistinctCount'];
        this.parent = parent;
    }
    /**
     * Initialize the pivot table rendering
     *
     * @param {MouseEventArgs} args - It contains the args value
     * @param {HTMLElement} parentElement - It contains the value of parentElement
     * @returns {void}
     * @private
     */
    AggregateMenu.prototype.render = function (args, parentElement) {
        this.parentElement = parentElement;
        this.openContextMenu(args);
    };
    AggregateMenu.prototype.openContextMenu = function (args) {
        var _this = this;
        var fieldName = args.target.parentElement.getAttribute('data-uid');
        var fieldInfo = PivotUtil.getFieldInfo(fieldName, this.parent);
        this.buttonElement = args.target.parentElement;
        var isStringField = this.parent.engineModule.fieldList[fieldName].type !== 'number' ? 1 : 0;
        var summaryTypes = this.getMenuItem(isStringField).slice();
        this.parent.actionObj.actionName = events.aggregateField;
        this.parent.actionObj.fieldInfo = fieldInfo.fieldItem;
        if (this.parent.actionBeginMethod()) {
            return;
        }
        var eventArgs = {
            cancel: false, fieldName: fieldName, aggregateTypes: summaryTypes, displayMenuCount: 7
        };
        var control = this.parent.getModuleName() === 'pivotfieldlist' && this.parent.isPopupView ?
            this.parent.pivotGridModule : this.parent;
        try {
            control.trigger(events.aggregateMenuOpen, eventArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    summaryTypes = observedArgs.aggregateTypes;
                    _this.createContextMenu(isStringField, summaryTypes, observedArgs.displayMenuCount);
                    _this.currentMenu = args.target;
                    var pos = _this.currentMenu.getBoundingClientRect();
                    if (_this.parent.enableRtl) {
                        _this.menuInfo[isStringField].open(pos.top + (window.scrollY || document.documentElement.scrollTop), pos.left - 105);
                    }
                    else {
                        _this.menuInfo[isStringField].open(pos.top +
                            (window.scrollY || document.documentElement.scrollTop), pos.left);
                    }
                }
            });
        }
        catch (execption) {
            this.parent.actionFailureMethod(execption);
        }
    };
    AggregateMenu.prototype.createContextMenu = function (isStringField, summaryTypes, displayMenuCount) {
        var _this = this;
        var menuItems = [];
        menuItems[isStringField] = [];
        if (this.menuInfo[isStringField] && !this.menuInfo[isStringField].isDestroyed) {
            this.menuInfo[isStringField].destroy();
        }
        var checkDuplicates = [];
        for (var i = 0; i < summaryTypes.length; i++) {
            var key = summaryTypes[i];
            if (isStringField) {
                if ((this.stringAggregateTypes.indexOf(key) > -1) && (checkDuplicates.indexOf(key) < 0)) {
                    menuItems[isStringField].push({ text: this.parent.localeObj.getConstant(key), id: this.parent.element.id + 'StringMenu_' + key });
                    checkDuplicates.push(key);
                }
            }
            else {
                if ((this.parent.getAllSummaryType().indexOf(key) > -1) && (checkDuplicates.indexOf(key) < 0)) {
                    menuItems[isStringField].push({ text: this.parent.localeObj.getConstant(key), id: this.parent.element.id + '_' + key });
                    checkDuplicates.push(key);
                }
            }
        }
        if (menuItems[isStringField].length > displayMenuCount) {
            menuItems[isStringField].splice(displayMenuCount);
            menuItems[isStringField].push({
                text: this.parent.localeObj.getConstant('MoreOption'),
                id: this.parent.element.id + '_' + 'MoreOption'
            });
        }
        var menuOptions = {
            items: menuItems[isStringField],
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            cssClass: this.parent.cssClass,
            beforeOpen: this.beforeMenuOpen.bind(this, isStringField),
            onClose: function () {
                select('#' + _this.buttonElement.id, _this.parentElement).focus();
            },
            select: this.selectOptionInContextMenu.bind(this)
        };
        var contextMenu = document.getElementById(this.parent.element.id + (isStringField ? 'valueFieldStringContextMenu' : 'valueFieldContextMenu'));
        if (contextMenu !== null) {
            contextMenu.innerHTML = '';
        }
        else {
            contextMenu = createElement('ul', {
                id: this.parent.element.id + (isStringField ? 'valueFieldStringContextMenu' : 'valueFieldContextMenu')
            });
        }
        this.parent.element.appendChild(contextMenu);
        this.menuInfo[isStringField] = new Menu(menuOptions);
        this.menuInfo[isStringField].isStringTemplate = true;
        this.menuInfo[isStringField].appendTo(contextMenu);
    };
    AggregateMenu.prototype.getMenuItem = function (isStringField) {
        var menuItems = [];
        for (var i = 0; i < this.parent.aggregateTypes.length; i++) {
            var key = this.parent.aggregateTypes[i];
            if (isStringField) {
                if ((this.stringAggregateTypes.indexOf(key) > -1) && (menuItems.indexOf(key) === -1)) {
                    menuItems.push(key);
                }
            }
            else {
                if ((this.parent.getAllSummaryType().indexOf(key) > -1) && (menuItems.indexOf(key) === -1)) {
                    menuItems.push(key);
                }
            }
        }
        return menuItems;
    };
    AggregateMenu.prototype.beforeMenuOpen = function (isString, args) {
        args.element.style.zIndex = (this.menuInfo[isString].element.style.zIndex + 3).toString();
        args.element.style.display = 'inline';
    };
    /**
     * create Value Settings Dialog
     *
     * @param {HTMLElement} target - It represent the target element.
     * @param {HTMLElement} parentElement - It represent the parentElement.
     * @param {string} type -It represent the type.
     * @returns {void}
     * @hidden */
    AggregateMenu.prototype.createValueSettingsDialog = function (target, parentElement, type) {
        this.parentElement = parentElement;
        var valueDialogElement = createElement('div', {
            id: this.parentElement.id + '_ValueDialog',
            className: 'e-value-field-settings',
            attrs: { 'data-field': target.getAttribute('data-uid') ? target.getAttribute('data-uid') : target.getAttribute('data-field') }
        });
        this.parentElement.appendChild(valueDialogElement);
        var valueDialog = new Dialog({
            animationSettings: { effect: 'Fade' },
            allowDragging: true,
            header: this.parent.localeObj.getConstant('valueFieldSettings'),
            content: this.createFieldOptions(target, type),
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
                    click: this.updateValueSettings.bind(this),
                    isFlat: false,
                    buttonModel: { cssClass: cls.OK_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('ok'), isPrimary: true }
                },
                {
                    click: function () {
                        valueDialog.hide();
                    },
                    isFlat: false,
                    buttonModel: { cssClass: cls.CANCEL_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            closeOnEscape: (this.parent.getModuleName() === 'pivotfieldlist' && this.parent.renderMode === 'Popup') ? false : true,
            target: this.parentElement,
            close: this.removeDialog.bind(this),
            cssClass: this.parent.cssClass
        });
        valueDialog.isStringTemplate = true;
        valueDialog.appendTo(valueDialogElement);
        // this.valueDialog.element.querySelector('.e-dlg-header').innerText = this.parent.localeObj.getConstant('valueFieldSettings');
    };
    AggregateMenu.prototype.createFieldOptions = function (buttonElement, type) {
        var _this = this;
        var fieldCaption = buttonElement.getAttribute('data-caption');
        var summaryType = (type && type !== 'MoreOption') ? type : buttonElement.getAttribute('data-type');
        var baseField = buttonElement.getAttribute('data-basefield');
        var baseItem = buttonElement.getAttribute('data-baseitem');
        summaryType = (summaryType.toString() !== 'undefined' ? summaryType : 'Sum');
        var summaryDataSource = [];
        var summaryItems = this.parent.aggregateTypes;
        var checkDuplicates = [];
        for (var i = 0; i < summaryItems.length; i++) {
            if (this.parent.getAllSummaryType().indexOf(summaryItems[i]) > -1 &&
                checkDuplicates.indexOf(summaryItems[i]) < 0) {
                summaryDataSource.push({
                    value: summaryItems[i],
                    text: this.parent.localeObj.getConstant(summaryItems[i])
                });
                checkDuplicates.push(summaryItems[i]);
            }
        }
        var baseItemTypes = ['DifferenceFrom', 'PercentageOfDifferenceFrom'];
        var baseFieldTypes = ['DifferenceFrom', 'PercentageOfDifferenceFrom', 'PercentageOfParentTotal'];
        var dataFields = extend([], this.parent.dataSourceSettings.rows, null, true);
        dataFields = dataFields.concat(this.parent.dataSourceSettings.columns);
        var fieldDataSource = [];
        var fieldItemDataSource = [];
        // let summaryDataSource: { [key: string]: Object }[] = [];
        // for (let type of summaryTypes) {
        //     summaryDataSource.push({ value: type, text: type });
        // }
        for (var _i = 0, dataFields_1 = dataFields; _i < dataFields_1.length; _i++) {
            var field = dataFields_1[_i];
            var value = field.name;
            var text = (field.caption ? field.caption : field.name);
            fieldDataSource.push({ value: value, text: text });
        }
        if (Object.keys(fieldDataSource).length === 0) {
            fieldDataSource.push({ value: '', text: '' });
            baseField = '';
            fieldItemDataSource = [];
        }
        else {
            baseField = (baseField && (baseField.toString() !== 'undefined' && baseField.toString() !== 'null') ? baseField : fieldDataSource[0].value);
            var fieldName_1 = baseField.toString() !== 'undefined' ? baseField : fieldDataSource[0].value;
            var isDateField_1 = PivotUtil.isDateField(fieldName_1, this.parent.engineModule);
            fieldItemDataSource = (this.parent.engineModule.fieldList[fieldName_1].dateMember).map(function (item) {
                return isDateField_1 ? item.formattedText :
                    _this.parent.engineModule.getFormattedValue(item.actualText, fieldName_1).formattedText;
            });
        }
        baseItem = (baseItem.toString() !== 'undefined' ? baseItem : fieldItemDataSource[0]);
        var mainDiv = createElement('div', {
            className: 'e-value-field-div-content', id: this.parentElement.id + '_field_div_content',
            attrs: { 'data-type': summaryType, 'data-caption': fieldCaption, 'data-basefield': baseField, 'data-baseitem': baseItem }
        });
        var textWrappper = createElement('div', { className: 'e-field-name-text-container' });
        var filterWrapperDiv1 = createElement('div', { className: 'e-field-option-container' });
        var optionWrapperDiv1 = createElement('div', { className: 'e-type-option-container' });
        var optionWrapperDiv2 = createElement('div', { className: 'e-base-field-option-container' });
        var optionWrapperDiv3 = createElement('div', { className: 'e-base-item-option-container' });
        var texttitle = createElement('div', { className: 'e-field-name-title' });
        texttitle.innerText = this.parent.localeObj.getConstant('sourceName') + ' ';
        var textContent = createElement('div', { className: 'e-field-name-content' });
        textContent.innerText = this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(buttonElement.getAttribute('data-uid') ?
            buttonElement.getAttribute('data-uid') : buttonElement.getAttribute('data-field')) :
            (buttonElement.getAttribute('data-uid') ? buttonElement.getAttribute('data-uid') : buttonElement.getAttribute('data-field'));
        this.buttonElement =
            this.buttonElement ? this.buttonElement : document.getElementsByClassName(textContent.innerText)[0];
        var inputTextDiv1 = createElement('div', {
            className: 'e-type-option-text'
        });
        inputTextDiv1.innerText = this.parent.localeObj.getConstant('sourceCaption');
        var optionTextDiv1 = createElement('div', {
            className: 'e-base-field-option-text'
        });
        optionTextDiv1.innerText = this.parent.localeObj.getConstant('summarizeValuesBy');
        var optionTextDiv2 = createElement('div', {
            className: 'e-base-item-option-text'
        });
        optionTextDiv2.innerText = this.parent.localeObj.getConstant('baseField');
        var optionTextDiv3 = createElement('div', {
            className: 'e-type-option-text'
        });
        optionTextDiv3.innerText = this.parent.localeObj.getConstant('baseItem');
        var inputDiv1 = createElement('div', { className: 'e-caption-input-container' });
        var dropOptionDiv1 = createElement('div', { id: this.parentElement.id + '_type_option' });
        var dropOptionDiv2 = createElement('div', { id: this.parentElement.id + '_base_field_option' });
        var dropOptionDiv3 = createElement('div', { id: this.parentElement.id + '_base_item_option' });
        var inputField1 = createElement('input', {
            id: this.parentElement.id + 'type_input_option',
            className: 'e-caption-input-text',
            attrs: { 'type': 'text' }
        });
        textWrappper.appendChild(texttitle);
        textWrappper.appendChild(textContent);
        inputDiv1.appendChild(inputTextDiv1);
        inputDiv1.appendChild(inputField1);
        optionWrapperDiv1.appendChild(optionTextDiv1);
        optionWrapperDiv2.appendChild(optionTextDiv2);
        optionWrapperDiv3.appendChild(optionTextDiv3);
        optionWrapperDiv1.appendChild(dropOptionDiv1);
        optionWrapperDiv2.appendChild(dropOptionDiv2);
        optionWrapperDiv3.appendChild(dropOptionDiv3);
        filterWrapperDiv1.appendChild(textWrappper);
        filterWrapperDiv1.appendChild(inputDiv1);
        filterWrapperDiv1.appendChild(optionWrapperDiv1);
        filterWrapperDiv1.appendChild(optionWrapperDiv2);
        filterWrapperDiv1.appendChild(optionWrapperDiv3);
        mainDiv.appendChild(filterWrapperDiv1);
        var popupInstance = this;
        var optionWrapper1 = new DropDownList({
            dataSource: summaryDataSource, enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            fields: { value: 'value', text: 'text' },
            value: summaryType,
            // popupWidth: 'auto',
            cssClass: cls.VALUE_OPTIONS_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), width: '100%',
            change: function (args) {
                optionWrapper2.enabled = baseFieldTypes.indexOf(args.value) !== -1 ? true : false;
                optionWrapper3.enabled = baseItemTypes.indexOf(args.value) !== -1 ? true : false;
                if (optionWrapper3.enabled && optionWrapper3.dataSource.length === 1) {
                    optionWrapper3.dataSource = fieldItemDataSource;
                    optionWrapper3.dataBind();
                }
            }
        });
        optionWrapper1.isStringTemplate = true;
        optionWrapper1.appendTo(dropOptionDiv1);
        var optionWrapper2 = new DropDownList({
            dataSource: fieldDataSource, enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            fields: { value: 'value', text: 'text' },
            value: baseField,
            // popupWidth: 'auto',
            enabled: (baseFieldTypes.indexOf(summaryType) !== -1 ? true : false),
            cssClass: cls.VALUE_OPTIONS_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), width: '100%',
            change: function (args) {
                var isDateField = PivotUtil.isDateField(args.value, _this.parent.engineModule);
                fieldItemDataSource = (popupInstance.parent.engineModule.fieldList[args.value].dateMember).map(function (item) {
                    return isDateField ? item.formattedText :
                        _this.parent.engineModule.getFormattedValue(item.actualText, args.value).formattedText;
                });
                optionWrapper3.dataSource = fieldItemDataSource;
                optionWrapper3.value = fieldItemDataSource[0];
                optionWrapper3.filterBarPlaceholder = popupInstance.parent.localeObj.getConstant('example') + ' ' + fieldItemDataSource[0];
                optionWrapper3['itemData'] = null;
                optionWrapper3.dataBind();
            }
        });
        optionWrapper2.isStringTemplate = true;
        optionWrapper2.appendTo(dropOptionDiv2);
        var optionWrapper3 = new DropDownList({
            dataSource: fieldItemDataSource, enableRtl: this.parent.enableRtl, locale: this.parent.locale,
            value: baseItem,
            // popupWidth: 'auto',
            allowFiltering: true,
            filterBarPlaceholder: this.parent.localeObj.getConstant('example') + ' ' + fieldItemDataSource[0],
            enabled: (baseItemTypes.indexOf(summaryType) !== -1 ? true : false),
            cssClass: cls.FILTER_OPERATOR_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), width: '100%'
        });
        optionWrapper3.isStringTemplate = true;
        optionWrapper3.appendTo(dropOptionDiv3);
        var inputObj1 = new MaskedTextBox({
            placeholder: 'Enter field caption',
            // floatLabelType: 'Auto',
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            value: fieldCaption, width: '100%',
            cssClass: this.parent.cssClass
        });
        inputObj1.isStringTemplate = true;
        inputObj1.appendTo(inputField1);
        return mainDiv;
    };
    AggregateMenu.prototype.selectOptionInContextMenu = function (menu) {
        if (menu.item.text !== null) {
            var buttonElement = this.currentMenu.parentElement;
            var fieldInfo = PivotUtil.getFieldInfo((buttonElement ?
                buttonElement.getAttribute('data-uid') : ''), this.parent);
            this.parent.actionObj.actionName = events.aggregateField;
            this.parent.actionObj.fieldInfo = fieldInfo.fieldItem;
            if (this.parent.actionBeginMethod()) {
                return;
            }
            var type = menu.item.id.split('_').pop();
            try {
                if (type === 'MoreOption' || type === 'PercentageOfDifferenceFrom'
                    || type === 'PercentageOfParentTotal' || type === 'DifferenceFrom') {
                    this.createValueSettingsDialog(buttonElement, this.parentElement, type);
                }
                else {
                    var field = buttonElement.getAttribute('data-uid');
                    var valuefields = this.parent.dataSourceSettings.values;
                    var contentElement = buttonElement.querySelector('.' + cls.PIVOT_BUTTON_CONTENT_CLASS);
                    var captionName = menu.item.text + ' ' + this.parent.localeObj.getConstant('of') + ' ' +
                        this.parent.engineModule.fieldList[field].caption;
                    captionName = this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(captionName) : captionName;
                    if (this.parent.dataSourceSettings.showAggregationOnValueField) {
                        contentElement.innerText = captionName;
                    }
                    contentElement.setAttribute('title', captionName);
                    buttonElement.setAttribute('data-type', type);
                    for (var vCnt = 0; vCnt < this.parent.dataSourceSettings.values.length; vCnt++) {
                        if (this.parent.dataSourceSettings.values[vCnt].name === field) {
                            var dataSourceItem = extend({}, valuefields[vCnt].properties ?
                                valuefields[vCnt].properties :
                                valuefields[vCnt], null, true);
                            dataSourceItem.type = type;
                            this.parent.engineModule.fieldList[field].aggregateType = type;
                            valuefields.splice(vCnt, 1, dataSourceItem);
                            this.parent.lastAggregationInfo = dataSourceItem;
                        }
                    }
                    this.updateDataSource();
                }
            }
            catch (execption) {
                this.parent.actionFailureMethod(execption);
            }
        }
    };
    AggregateMenu.prototype.updateDataSource = function (isRefreshed) {
        if (this.parent.isDeferLayoutUpdate === false || (this.parent.pivotGridModule &&
            this.parent.pivotGridModule.pivotDeferLayoutUpdate === false)
            || this.parent.getModuleName() === 'pivotview' || (this.parent.isAdaptive && this.parent.getModuleName() === 'pivotfieldlist'
            && this.parent.renderMode === 'Popup')) {
            this.parent.updateDataSource(isRefreshed);
        }
        else {
            if (this.parent.getModuleName() === 'pivotfieldlist' && this.parent.renderMode === 'Popup') {
                this.parent.pivotGridModule.setProperties({
                    dataSourceSettings: this.parent.dataSourceSettings.properties
                }, true);
                this.parent.pivotGridModule.notify(events.uiUpdate, this);
                this.parent.pivotGridModule.engineModule = this.parent.engineModule;
            }
            else {
                this.parent.triggerPopulateEvent();
            }
        }
    };
    AggregateMenu.prototype.updateValueSettings = function () {
        var valueDialog = getInstance(select('#' + this.parentElement.id + '_ValueDialog', document), Dialog);
        var dialogElement = valueDialog.element;
        var captionInstance = getInstance(select('#' + this.parentElement.id + 'type_input_option'), MaskedTextBox);
        var summaryInstance = getInstance(select('#' + this.parentElement.id + '_type_option'), DropDownList);
        var baseFieldInstance = getInstance(select('#' + this.parentElement.id + '_base_field_option'), DropDownList);
        var baseItemInstance = getInstance(select('#' + this.parentElement.id + '_base_item_option'), DropDownList);
        var fieldName = dialogElement.getAttribute('data-field');
        var buttonElement;
        if (this.parentElement.querySelector('.' + cls.PIVOT_BUTTON_CLASS)) {
            buttonElement =
                this.parentElement.getElementsByClassName(cls.PIVOT_BUTTON_CLASS + " " + fieldName.replace(/[^A-Z0-9]/ig, ''))[0];
        }
        if (buttonElement) {
            var contentElement = buttonElement.querySelector('.' + cls.PIVOT_BUTTON_CONTENT_CLASS);
            var captionName = this.parent.dataSourceSettings.showAggregationOnValueField
                ? (this.parent.localeObj.getConstant(summaryInstance.value) + ' ' +
                    this.parent.localeObj.getConstant('of') + ' ' + captionInstance.value)
                : captionInstance.value;
            captionName = this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(captionName) : captionName;
            contentElement.innerText = captionName;
            contentElement.setAttribute('title', captionName);
            buttonElement.setAttribute('data-type', summaryInstance.value);
            buttonElement.setAttribute('data-caption', captionInstance.value);
            buttonElement.setAttribute('data-basefield', baseFieldInstance.value);
            buttonElement.setAttribute('data-baseitem', baseItemInstance.value);
        }
        var selectedField = PivotUtil.getFieldByName(fieldName, this.parent.dataSourceSettings.values);
        selectedField = selectedField.properties ?
            selectedField.properties : selectedField;
        selectedField.caption = captionInstance.value;
        selectedField.type = summaryInstance.value;
        selectedField.baseField = baseFieldInstance.value;
        selectedField.baseItem = baseItemInstance.value;
        this.parent.engineModule.fieldList[fieldName].aggregateType = selectedField.type;
        valueDialog.close();
        // this.parent.axisFieldModule.render();
        this.parent.lastAggregationInfo = selectedField;
        this.updateDataSource(true);
    };
    AggregateMenu.prototype.removeDialog = function () {
        if (this.buttonElement && select('#' + this.buttonElement.id, this.parentElement)) {
            select('#' + this.buttonElement.id, this.parentElement).focus();
        }
        var element = select('#' + this.parentElement.id + '_ValueDialog', document);
        var valueDialog = element ? getInstance(element, Dialog) : null;
        if (valueDialog && !valueDialog.isDestroyed) {
            valueDialog.destroy();
        }
        if (document.getElementById(this.parentElement.id + '_ValueDialog')) {
            remove(document.getElementById(this.parentElement.id + '_ValueDialog'));
        }
    };
    /**
     * To destroy the pivot button event listener
     *
     * @returns {void}
     * @hidden
     */
    AggregateMenu.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        if (this.menuInfo) {
            if (this.menuInfo[1] !== undefined && !this.menuInfo[1].isDestroyed) {
                this.menuInfo[1].destroy();
            }
            if (this.menuInfo[0] !== undefined && !this.menuInfo[0].isDestroyed) {
                this.menuInfo[0].destroy();
            }
        }
        else {
            return;
        }
    };
    return AggregateMenu;
}());
export { AggregateMenu };
