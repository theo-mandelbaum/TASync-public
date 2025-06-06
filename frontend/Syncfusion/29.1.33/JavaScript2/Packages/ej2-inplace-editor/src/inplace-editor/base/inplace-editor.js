var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, NotifyPropertyChanges, Property, Event, select } from '@syncfusion/ej2-base';
import { detach, addClass, removeClass, EventHandler, setStyleAttribute, Complex } from '@syncfusion/ej2-base';
import { isNullOrUndefined as isNOU, closest, extend, L10n, compile, Browser, Touch } from '@syncfusion/ej2-base';
import { updateBlazorTemplate, resetBlazorTemplate, SanitizeHtmlHelper, getValue, isBlazor } from '@syncfusion/ej2-base';
import { DataManager, UrlAdaptor, Query, WebApiAdaptor, ODataV4Adaptor, Predicate } from '@syncfusion/ej2-data';
import { Button } from '@syncfusion/ej2-buttons';
import { DatePicker, DateTimePicker } from '@syncfusion/ej2-calendars';
import { createSpinner, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { Tooltip } from '@syncfusion/ej2-popups';
import { NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { FormValidator, MaskedTextBox } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
/* Helper modules */
import * as events from './events';
import * as classes from './classes';
/* Models */
import { PopupSettings, modulesList, localeConstant } from './models';
/* Interface */
import { parseValue, getCompValue, encode } from './util';
/**
 * ```html
 * * The In-place editor control is used to edit an element in a place and to update the value in server.
 * <div id='element' />
 * <script>
 *   var editorObj = new InPlaceEditor();
 *   editorObj.appendTo('#element');
 * </script>
 * ```
 */
var InPlaceEditor = /** @class */ (function (_super) {
    __extends(InPlaceEditor, _super);
    /**
     * Initializes a new instance of the In-place editor class.
     *
     * @param {InPlaceEditorModel} options  - Specifies In-place editor model properties as options.
     * @param {string} element  - Specifies the element for which In-place editor applies.
     */
    function InPlaceEditor(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.needsID = true;
        return _this;
    }
    InPlaceEditor.prototype.initializeValue = function () {
        this.initRender = true;
        this.isTemplate = false;
        this.isVue = false;
        this.isExtModule = false;
        this.submitBtn = undefined;
        this.cancelBtn = undefined;
        this.isClearTarget = false;
        this.btnElements = undefined;
        this.dataManager = undefined;
        this.oldValue = undefined;
        this.divComponents = ['RTE', 'Slider'];
        this.clearComponents = ['AutoComplete', 'Mask', 'Text'];
        this.dateType = ['Date', 'DateTime', 'Time'];
        this.inputDataEle = ['Date', 'DateTime', 'DateRange', 'Time', 'Numeric'];
        this.dropDownEle = ['AutoComplete', 'ComboBox', 'DropDownList', 'MultiSelect'];
        this.moduleList = ['AutoComplete', 'Color', 'ComboBox', 'DateRange', 'MultiSelect', 'RTE', 'Slider', 'Time'];
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    InPlaceEditor.prototype.preRender = function () {
        this.initializeValue();
        this.onScrollResizeHandler = this.scrollResizeHandler.bind(this);
        if (isNOU(this.model)) {
            this.setProperties({ model: {} }, true);
        }
        this.titleEle = this.createElement('div', { className: classes.TITLE });
        if (!isNOU(this.popupSettings.model) && this.popupSettings.model.afterOpen) {
            this.afterOpenEvent = this.popupSettings.model.afterOpen;
        }
    };
    /**
     * To Initialize the In-place editor rendering
     *
     * @returns {void}
     * @private
     */
    InPlaceEditor.prototype.render = function () {
        if (isNOU(this.element.getAttribute('tabindex'))) {
            this.disabled ? this.element.setAttribute('tabindex', '-1') : this.element.setAttribute('tabindex', '0');
        }
        this.checkIsTemplate();
        this.disable(this.disabled);
        this.updateAdaptor();
        this.appendValueElement();
        this.updateValue();
        this.textOption === 'Never' ?
            this.renderValue(this.checkValue(parseValue(this.type, this.value, this.model)))
            : this.renderInitialValue();
        this.wireEvents();
        this.setRtl(this.enableRtl);
        this.enableEditor(this.enableEditMode, true);
        this.setClass('add', this.cssClass);
        this.renderComplete();
    };
    InPlaceEditor.prototype.setClass = function (action, val) {
        if (!this.isEmpty(val)) {
            var allClassName = val.split(' ');
            for (var i = 0; i < allClassName.length; i++) {
                if (allClassName[i].trim() !== '') {
                    action === 'add' ? addClass([this.element], [allClassName[i]]) : removeClass([this.element], [allClassName[i]]);
                }
            }
        }
    };
    InPlaceEditor.prototype.appendValueElement = function () {
        this.valueWrap = this.createElement('div', { id: this.element.id + '_wrap', className: classes.VALUE_WRAPPER });
        if (!isBlazor()) {
            this.element.innerHTML = '';
        }
        this.valueEle = this.createElement('span', { className: classes.VALUE });
        this.editIcon = this.createElement('span', {
            className: classes.OVERLAY_ICON + ' ' + classes.ICONS,
            attrs: { 'title': this.getLocale({ editIcon: 'Click to edit' }, 'editIcon') }
        });
        this.valueWrap.appendChild(this.valueEle);
        this.valueWrap.appendChild(this.editIcon);
        this.element.appendChild(this.valueWrap);
    };
    InPlaceEditor.prototype.renderInitialValue = function () {
        if (['AutoComplete', 'ComboBox', 'DropDownList', 'MultiSelect'].indexOf(this.type) > -1
            && !isNOU(this.value) && !this.isEmpty(this.value.toString()) && !isNOU(this.model.fields)
            && !isNOU(this.model.dataSource)) {
            this.renderValue(this.getLocale({ loadingText: 'Loading...' }, 'loadingText'));
            this.valueWrap.classList.add(classes.LOAD);
            createSpinner({ target: this.valueWrap, width: 10 });
            showSpinner(this.valueWrap);
            this.getInitFieldMapValue();
        }
        else {
            this.renderValue(this.checkValue(parseValue(this.type, this.value, this.model)));
        }
    };
    InPlaceEditor.prototype.getInitFieldMapValue = function () {
        var _this = this;
        var model = this.model;
        var mText = model.fields.text;
        var mVal = model.fields.value;
        var query = isNOU(model.query) ? new Query() : model.query;
        if (model.dataSource instanceof DataManager) {
            model.dataSource.executeQuery(this.getInitQuery(model, query)).then(function (e) {
                _this.updateInitValue(mText, mVal, e.result);
            });
        }
        else {
            this.updateInitValue(mText, mVal, new DataManager(model.dataSource).executeLocal(this.getInitQuery(model, query)));
        }
    };
    InPlaceEditor.prototype.getInitQuery = function (model, query) {
        var predicate;
        var mVal = model.fields.value;
        var value = this.value;
        if (this.type !== 'MultiSelect' || typeof (this.value) !== 'object') {
            predicate = new Predicate(mVal, 'equal', this.value);
        }
        else {
            var i = 0;
            for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                var val = value_1[_i];
                predicate = ((i === 0) ? predicate = new Predicate(mVal, 'equal', val) : predicate.or(mVal, 'equal', val));
                i++;
            }
        }
        return query.where(predicate);
    };
    InPlaceEditor.prototype.updateInitValue = function (mText, mVal, result) {
        if (result.length <= 0) {
            return;
        }
        if (result.length === 1) {
            this.valueEle.innerHTML = this.checkValue(getValue((isNOU(mText) ? mVal : mText), result[0]));
        }
        else {
            var val = [];
            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                var obj = result_1[_i];
                val.push(getValue((isNOU(mText) ? mVal : mText), obj));
            }
            this.valueEle.innerHTML = this.checkValue(val.toString());
        }
        hideSpinner(this.valueWrap);
        this.valueWrap.classList.remove(classes.LOAD);
    };
    InPlaceEditor.prototype.renderValue = function (val) {
        this.enableHtmlSanitizer && this.type !== 'RTE' && this.type !== 'MultiSelect' ? this.valueEle.innerText = val :
            (this.valueEle.innerHTML = this.enableHtmlParse ? val : encode(val));
        if (this.type === 'Color') {
            setStyleAttribute(this.valueEle, { 'color': val });
        }
        if (this.mode === 'Inline') {
            if (this.isEditorOpen()) {
                removeClass([this.valueWrap], [classes.HIDE]);
            }
        }
    };
    InPlaceEditor.prototype.isEditorOpen = function () {
        if (this.isVue && (this.enableEditMode || (!isNOU(this.valueWrap) &&
            !(this.valueWrap.classList.contains(classes.HIDE) || this.valueWrap.classList.contains('e-tooltip'))))) {
            return false;
        }
        else {
            return true;
        }
    };
    InPlaceEditor.prototype.renderEditor = function () {
        this.prevValue = this.value;
        this.beginEditArgs = { mode: this.mode, cancelFocus: false, cancel: false };
        this.trigger('beginEdit', this.beginEditArgs);
        if (this.beginEditArgs.cancel) {
            return;
        }
        var tipOptions = undefined;
        var target = select('.' + classes.VALUE_WRAPPER, this.element);
        if (this.editableOn !== 'EditIconClick') {
            target.parentElement.removeAttribute('title');
        }
        if (this.valueWrap.classList.contains(classes.OPEN)) {
            return;
        }
        if (this.mode === 'Inline') {
            addClass([this.valueWrap], [classes.HIDE]);
            this.inlineWrapper = this.createElement('div', { className: classes.INLINE });
            this.element.appendChild(this.inlineWrapper);
            if (['AutoComplete', 'ComboBox', 'DropDownList', 'MultiSelect'].indexOf(this.type) > -1) {
                this.checkRemoteData(this.model);
            }
            else {
                this.renderAndOpen();
            }
        }
        else {
            if (!isNOU(this.popupSettings.model) && this.popupSettings.model.afterOpen) {
                this.popupSettings.model.afterOpen = this.afterOpenHandler.bind(this);
            }
            var content = this.createElement('div', { className: classes.POPUP });
            if (!this.isEmpty(this.popupSettings.title)) {
                this.titleEle.innerHTML = this.popupSettings.title;
                content.appendChild(this.titleEle);
            }
            tipOptions = {
                content: content, opensOn: 'Custom',
                enableRtl: this.enableRtl, cssClass: classes.ROOT_TIP,
                afterOpen: this.afterOpenHandler.bind(this)
            };
            content.appendChild(this.renderControl(document.body));
            extend(tipOptions, this.popupSettings.model, tipOptions, true);
            this.tipObj = new Tooltip(tipOptions);
            this.tipObj.appendTo(target);
            this.tipObj.open(target);
        }
        if (this.actionOnBlur !== 'Ignore') {
            this.wireDocEvent();
        }
        addClass([this.valueWrap], [classes.OPEN]);
        this.setProperties({ enableEditMode: true }, true);
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    InPlaceEditor.prototype.renderAndOpen = function () {
        this.renderControl(this.inlineWrapper);
        this.afterOpenHandler(null);
    };
    InPlaceEditor.prototype.checkRemoteData = function (model) {
        var _this = this;
        if (model.dataSource instanceof DataManager) {
            model.dataBound = function () {
                _this.afterOpenHandler(null);
            };
            this.renderControl(this.inlineWrapper);
            if ((isNOU(model.value) && isNOU(this.value)) || (model.value === this.value
                && (!isNOU(model.value) && model.value.length === 0))) {
                this.showDropDownPopup();
            }
        }
        else {
            this.renderAndOpen();
        }
    };
    InPlaceEditor.prototype.showDropDownPopup = function () {
        if (this.type === 'DropDownList') {
            if (!this.model.allowFiltering) {
                this.componentObj.focusIn();
            }
            this.componentObj.showPopup();
        }
        else {
            if (this.isExtModule) {
                this.notify(((this.type === 'MultiSelect') ? events.setFocus : events.showPopup), {});
            }
        }
    };
    InPlaceEditor.prototype.setAttribute = function (ele, attr) {
        var value = this.name && this.name.length !== 0 ? this.name : this.element.id;
        attr.forEach(function (val) {
            ele.setAttribute(val, ((val === 'id') ? (value + '_editor') : value));
        });
    };
    InPlaceEditor.prototype.renderControl = function (target) {
        var ele;
        this.containerEle = this.createElement('div', { className: classes.WRAPPER });
        this.loader = this.createElement('div', { className: classes.LOADING });
        this.formEle = this.createElement('form', { className: classes.FORM });
        var ctrlGroupEle = this.createElement('div', { className: classes.CTRL_GROUP });
        var inputWrap = this.createElement('div', { className: classes.INPUT });
        target.appendChild(this.containerEle);
        this.loadSpinner();
        this.containerEle.appendChild(this.formEle);
        this.formEle.appendChild(ctrlGroupEle);
        if (this.isTemplate) {
            this.appendTemplate(inputWrap, this.template);
        }
        else {
            if (Array.prototype.indexOf.call(this.divComponents, this.type) > -1) {
                ele = this.createElement('div');
                this.setAttribute(ele, ['id']);
            }
            else {
                ele = this.createElement('input');
                this.setAttribute(ele, ['id', 'name']);
            }
            this.componentRoot = ele;
            inputWrap.appendChild(ele);
            inputWrap.appendChild(this.loader);
        }
        ctrlGroupEle.appendChild(inputWrap);
        ctrlGroupEle.appendChild(this.createElement('div', { className: classes.EDITABLE_ERROR }));
        this.appendButtons(this.formEle);
        if (!this.isTemplate) {
            this.renderComponent(ele);
        }
        this.removeSpinner();
        if (this.submitOnEnter) {
            this.wireEditorKeyDownEvent(this.containerEle);
        }
        return this.containerEle;
    };
    InPlaceEditor.prototype.appendButtons = function (trg) {
        if (this.showButtons && trg) {
            this.btnElements = this.renderButtons();
            trg.appendChild(this.btnElements);
            this.wireBtnEvents();
        }
    };
    InPlaceEditor.prototype.renderButtons = function () {
        var btnWrap = this.createElement('div', { className: classes.BUTTONS });
        var primary = (!isNOU(this.saveButton.content) && this.saveButton.content.length !== 0) ? (' ' + classes.PRIMARY) : '';
        this.submitBtn = this.createButtons({
            constant: 'save', type: 'submit', container: btnWrap,
            title: { save: 'Save' }, model: this.saveButton,
            className: classes.BTN_SAVE + primary
        });
        this.cancelBtn = this.createButtons({
            type: 'button', constant: 'cancel', title: { cancel: 'Cancel' },
            container: btnWrap, model: this.cancelButton,
            className: classes.BTN_CANCEL
        });
        return btnWrap;
    };
    InPlaceEditor.prototype.createButtons = function (args) {
        var btnObj = undefined;
        if (Object.keys(args.model).length > 0) {
            var btnEle = this.createElement('button', {
                className: args.className,
                attrs: { 'type': args.type, 'title': (args.constant == "save") ? (isNOU(this.saveButton.content) ? this.getLocale(args.title, args.constant) : this.saveButton.content) : (isNOU(this.cancelButton.content) ? this.getLocale(args.title, args.constant) : this.cancelButton.content) }
            });
            args.container.appendChild(btnEle);
            btnObj = new Button(args.model, btnEle);
        }
        return btnObj;
    };
    InPlaceEditor.prototype.renderComponent = function (ele) {
        this.isExtModule = (Array.prototype.indexOf.call(this.moduleList, this.type) > -1) ? true : false;
        var classProp;
        if (!isNOU(this.model.cssClass)) {
            classProp = this.model.cssClass.indexOf(classes.ELEMENTS) < 0 ?
                this.model.cssClass === '' ? classes.ELEMENTS : this.model.cssClass + ' ' + classes.ELEMENTS :
                this.model.cssClass;
        }
        else {
            classProp = classes.ELEMENTS;
        }
        extend(this.model, this.model, {
            cssClass: classProp, enableRtl: this.enableRtl, locale: this.locale, change: this.changeHandler.bind(this)
        });
        if (!isNOU(this.value)) {
            this.updateModelValue(false);
        }
        if (this.isExtModule) {
            this.notify(events.render, { module: modulesList[this.type], target: ele, type: this.type });
        }
        else {
            if (isNOU(this.model.showClearButton) && !isBlazor()) {
                this.model.showClearButton = true;
            }
            switch (this.type) {
                case 'Date':
                    this.componentObj = new DatePicker(this.model);
                    break;
                case 'DateTime':
                    this.componentObj = new DateTimePicker(this.model);
                    break;
                case 'DropDownList':
                    this.componentObj = new DropDownList(this.model);
                    break;
                case 'Mask':
                    this.componentObj = new MaskedTextBox(this.model);
                    break;
                case 'Numeric':
                    if (this.model.value) {
                        var expRegex = new RegExp('[eE][\-+]?([0-9]+)');
                        if (expRegex.test(this.model.value)) {
                            this.model.value = this.model.value;
                        }
                        else {
                            this.model.value = this.model.value.toString().replace(/[`~!@#$%^&*()_|\=?;:'",<>\{\}\[\]\\\/]/gi, '');
                        }
                    }
                    this.componentObj = new NumericTextBox(this.model);
                    break;
                case 'Text':
                    this.componentObj = new TextBox(this.model);
                    break;
            }
            this.componentObj.appendTo(ele);
        }
    };
    InPlaceEditor.prototype.updateAdaptor = function () {
        switch (this.adaptor) {
            case 'UrlAdaptor':
                this.dataAdaptor = new UrlAdaptor;
                break;
            case 'WebApiAdaptor':
                this.dataAdaptor = new WebApiAdaptor;
                break;
            case 'ODataV4Adaptor':
                this.dataAdaptor = new ODataV4Adaptor;
                break;
        }
    };
    InPlaceEditor.prototype.loadSpinner = function (callType) {
        addClass([this.loader], [classes.SHOW]);
        if (callType === 'validate' && (this.type === 'RTE' || this.type === 'Color' || this.type === 'Slider')) {
            addClass([this.loader], [classes.RTE_SPIN_WRAP]);
            addClass([this.getEditElement()], [classes.CTRL_OVERLAY]);
            this.spinObj = { target: this.loader };
        }
        else {
            this.spinObj = { target: this.loader, width: Browser.isDevice ? '16px' : '14px' };
        }
        if (this.formEle) {
            addClass([this.formEle], [classes.LOAD]);
        }
        if (this.btnElements) {
            addClass([this.btnElements], [classes.HIDE]);
        }
        setStyleAttribute(this.loader, { 'width': '100%' });
        createSpinner(this.spinObj);
        showSpinner(this.spinObj.target);
    };
    InPlaceEditor.prototype.removeSpinner = function (callType) {
        this.loader.removeAttribute('style');
        hideSpinner(this.spinObj.target);
        detach(this.spinObj.target.firstChild);
        if (callType === 'submit' && (this.type === 'RTE' || this.type === 'Color' || this.type === 'Slider')) {
            removeClass([this.loader], [classes.RTE_SPIN_WRAP]);
            removeClass([this.getEditElement()], [classes.CTRL_OVERLAY]);
        }
        if (this.formEle) {
            removeClass([this.formEle], [classes.LOAD]);
        }
        if (this.btnElements) {
            removeClass([this.btnElements], [classes.HIDE]);
        }
        removeClass([this.loader], [classes.SHOW]);
    };
    InPlaceEditor.prototype.getEditElement = function () {
        return select('.' + classes.ELEMENTS, this.formEle);
    };
    InPlaceEditor.prototype.getLocale = function (prop, val) {
        return new L10n('inplace-editor', prop, this.locale).getConstant(val);
    };
    InPlaceEditor.prototype.checkValue = function (val) {
        return (!this.isEmpty(val)) ? val : this.emptyText;
    };
    InPlaceEditor.prototype.extendModelValue = function (val) {
        var model = this.model;
        extend(model, { value: val });
        this.setProperties({ model: model }, true);
    };
    InPlaceEditor.prototype.updateValue = function () {
        this.oldValue = this.value;
        if (this.enableHtmlSanitizer && typeof (this.value) === 'string') {
            this.oldValue = this.sanitizeHelper(this.value);
        }
        if (!isNOU(this.value)) {
            this.setProperties({ value: getCompValue(this.type, this.oldValue) }, true);
            this.extendModelValue(getCompValue(this.type, this.oldValue));
        }
    };
    InPlaceEditor.prototype.updateModelValue = function (updateOldValue) {
        if (this.type === 'MultiSelect' && !this.isEmpty(this.value)) {
            this.model.value = !updateOldValue ? this.value.slice() : this.oldValue.slice();
        }
        else {
            this.model.value = !updateOldValue ? this.value : this.oldValue;
        }
    };
    InPlaceEditor.prototype.setValue = function () {
        if (this.isExtModule) {
            this.notify(events.update, { type: this.type });
        }
        else if (this.componentObj) {
            if (this.type === 'Numeric' && this.componentObj.value === null) {
                this.componentObj.setProperties({ value: null }, true);
            }
            this.setProperties({ value: this.componentObj.value }, true);
            this.extendModelValue(this.componentObj.value);
        }
    };
    InPlaceEditor.prototype.getDropDownsValue = function (display) {
        var value;
        if (Array.prototype.indexOf.call(this.dropDownEle, this.type) > -1 && this.type !== 'MultiSelect') {
            value = display ? select('.e-' + this.type.toLocaleLowerCase(), this.containerEle).value :
                this.value.toString();
        }
        else if (this.type === 'MultiSelect') {
            this.notify(events.accessValue, { type: this.type });
            value = display ? this.printValue : this.value.join();
        }
        return value;
    };
    InPlaceEditor.prototype.getSendValue = function () {
        if (this.isEmpty(this.value)) {
            return '';
        }
        if (Array.prototype.indexOf.call(this.dropDownEle, this.type) > -1) {
            return this.getDropDownsValue(false);
        }
        else if (Array.prototype.indexOf.call(this.dateType, this.type) > -1) {
            return this.value.toISOString();
        }
        else if (this.type === 'DateRange') {
            return this.value[0].toISOString() + ' - ' + this.value[1].toISOString();
        }
        else {
            return this.value.toString();
        }
    };
    InPlaceEditor.prototype.getRenderValue = function () {
        if (this.type === 'Mask' && this.componentObj.value.length !== 0) {
            return this.componentObj.getMaskedValue();
        }
        else if (Array.prototype.indexOf.call(this.inputDataEle, this.type) > -1) {
            return this.componentRoot.value;
        }
        else if (Array.prototype.indexOf.call(this.dropDownEle, this.type) > -1) {
            return this.getDropDownsValue(true);
        }
        else {
            return parseValue(this.type, this.value, this.model);
        }
    };
    InPlaceEditor.prototype.setRtl = function (value) {
        value ? addClass([this.element], [classes.RTL]) : removeClass([this.element], [classes.RTL]);
    };
    InPlaceEditor.prototype.setFocus = function () {
        if (this.isTemplate) {
            return;
        }
        this.isExtModule ? this.notify(events.setFocus, {}) : this.componentObj.getModuleName() === 'dropdownlist' ? this.componentObj.focusIn() : this.componentObj.element.focus();
    };
    InPlaceEditor.prototype.removeEditor = function (isBlazorDestroy) {
        var blazorContain = Object.keys(window);
        if (isBlazor() && !this.isStringTemplate) {
            resetBlazorTemplate(this.element.id + 'template', 'Template');
        }
        var tipEle;
        if (this.tipObj && this.formEle) {
            tipEle = closest(this.formEle, '.' + classes.ROOT_TIP);
            tipEle.classList.add(classes.HIDE);
        }
        this.unWireDocEvent();
        this.destroyComponents();
        this.formEle = undefined;
        if (!isNOU(select('.' + classes.INLINE, this.element))) {
            detach(this.inlineWrapper);
            this.inlineWrapper = undefined;
        }
        else if (this.tipObj) {
            if (this.type === 'MultiSelect') {
                EventHandler.remove(this.containerEle, 'mousedown', this.popMouseDown);
                EventHandler.remove(this.containerEle, 'click', this.popClickHandler);
            }
            this.tipObj.close();
            this.tipObj.destroy();
            this.tipObj = undefined;
        }
        this.containerEle = undefined;
        removeClass([this.valueWrap], [classes.OPEN, classes.HIDE]);
        if (!isBlazorDestroy) {
            this.setProperties({ enableEditMode: false }, true);
        }
        if (!isNOU(this.editableOn) && this.editableOn !== 'EditIconClick') {
            var titleConstant = (this.editableOn === 'DblClick') ? 'editAreaDoubleClick' : 'editAreaClick';
            if (!isNOU(this.valueWrap.parentElement)) {
                this.valueWrap.parentElement.setAttribute('title', this.getLocale(localeConstant[this.editableOn], titleConstant));
            }
        }
        if (this.isReact) {
            this.clearTemplate();
        }
    };
    InPlaceEditor.prototype.destroyComponents = function () {
        if (this.showButtons) {
            this.destroyButtons();
        }
        if (this.isExtModule) {
            this.notify(events.destroyModules, {});
        }
        else {
            if (this.templateEle) {
                document.body.appendChild(this.templateEle);
                this.templateEle.style.display = 'none';
                this.templateEle = undefined;
            }
            if (!isNOU(this.componentObj)) {
                this.componentObj.destroy();
                this.componentObj = undefined;
            }
        }
        if (this.formValidate) {
            this.formValidate = undefined;
        }
        if (this.submitOnEnter && this.containerEle) {
            this.unWireEditorKeyDownEvent(this.containerEle);
        }
    };
    InPlaceEditor.prototype.destroyButtons = function () {
        if (!isNOU(this.submitBtn)) {
            EventHandler.remove(this.submitBtn.element, 'mousedown', this.submitHandler);
            EventHandler.remove(this.submitBtn.element, 'click', this.submitPrevent);
            EventHandler.remove(this.submitBtn.element, 'keydown', this.btnKeyDownHandler);
            this.submitBtn.destroy();
            this.submitBtn = undefined;
        }
        if (!isNOU(this.cancelBtn)) {
            EventHandler.remove(this.cancelBtn.element, 'mousedown', this.cancelBtnClick);
            EventHandler.remove(this.cancelBtn.element, 'keydown', this.btnKeyDownHandler);
            this.cancelBtn.destroy();
            this.cancelBtn = undefined;
        }
        this.btnElements = undefined;
    };
    InPlaceEditor.prototype.getQuery = function (params) {
        var query = new Query();
        Object.keys(params).forEach(function (key) {
            query.addParams(key, params[key]);
        });
        return query;
    };
    InPlaceEditor.prototype.sendValue = function () {
        var _this = this;
        var eventArgs = { data: { name: this.name, primaryKey: this.primaryKey, value: this.getSendValue() } };
        this.trigger('actionBegin', eventArgs, function (actionBeginArgs) {
            if (actionBeginArgs.cancel) {
                _this.removeSpinner('submit');
                if (_this.mode === 'Popup') {
                    _this.updateArrow();
                }
            }
            else {
                if (!_this.isEmpty(_this.url) && !_this.isEmpty(_this.primaryKey)
                    && (_this.initRender || (!_this.initRender && _this.prevValue !== _this.value))) {
                    _this.dataManager = new DataManager({ url: _this.url, adaptor: _this.dataAdaptor });
                    if (_this.adaptor === 'UrlAdaptor') {
                        _this.dataManager.executeQuery(_this.getQuery(actionBeginArgs.data), _this.successHandler.bind(_this), _this.failureHandler.bind(_this));
                    }
                    else {
                        var crud = _this.dataManager.insert(actionBeginArgs.data);
                        crud.then(function (e) { return _this.successHandler(e); }).catch(function (e) { return _this.failureHandler(e); });
                    }
                }
                else {
                    var eventArg = { data: {}, value: actionBeginArgs.data.value };
                    _this.triggerSuccess(eventArg);
                }
                _this.dataManager = undefined;
            }
        });
    };
    InPlaceEditor.prototype.isEmpty = function (value) {
        return (!isNOU(value) && value.length !== 0) ? false : true;
    };
    InPlaceEditor.prototype.checkIsTemplate = function () {
        this.isTemplate = (!isNOU(this.template) && this.template !== '') ? true : false;
    };
    InPlaceEditor.prototype.templateCompile = function (trgEle, tempStr) {
        var tempEle;
        var blazorContain = Object.keys(window);
        if (typeof tempStr === 'string') {
            tempStr = tempStr.trim();
        }
        var compiler = compile(tempStr);
        if (!isNOU(compiler)) {
            var isString = (isBlazor() && typeof tempStr !== 'function' &&
                !this.isStringTemplate && (tempStr).indexOf('<div>Blazor') === 0) ?
                this.isStringTemplate : true;
            tempEle = compiler({}, this, 'template', this.element.id + 'template', isString);
        }
        if (!isNOU(compiler) && tempEle.length > 0) {
            [].slice.call(tempEle).forEach(function (el) {
                trgEle.appendChild(el);
            });
            if (isBlazor() && !this.isStringTemplate && typeof tempStr !== 'function' &&
                (tempStr).indexOf('<div>Blazor') === 0) {
                updateBlazorTemplate(this.element.id + 'template', 'Template', this);
            }
        }
    };
    /**
     * @param {string} value - specifies the string value
     * @returns {string} - returns the string
     * @hidden
     */
    InPlaceEditor.prototype.sanitizeHelper = function (value) {
        if (this.enableHtmlSanitizer) {
            var item_1 = SanitizeHtmlHelper.beforeSanitize();
            var beforeEvent = {
                cancel: false,
                helper: null
            };
            extend(item_1, item_1, beforeEvent);
            this.trigger('beforeSanitizeHtml', item_1, function (args) {
                if (item_1.cancel && !isNOU(item_1.helper)) {
                    value = item_1.helper(value);
                }
                else if (!item_1.cancel) {
                    value = SanitizeHtmlHelper.serializeValue(item_1, value);
                }
            });
        }
        return value;
    };
    InPlaceEditor.prototype.appendTemplate = function (trgEle, tempStr) {
        tempStr = typeof (tempStr) === 'string' ? this.sanitizeHelper(tempStr) : tempStr;
        this.setProperties({ template: tempStr }, true);
        if (typeof tempStr === 'function') {
            this.templateCompile(trgEle, tempStr);
        }
        else if (typeof tempStr === 'string' || isNOU(tempStr.innerHTML)) {
            if (tempStr[0] === '.' || tempStr[0] === '#') {
                if (document.querySelectorAll(tempStr).length) {
                    this.templateEle = document.querySelector(tempStr);
                    trgEle.appendChild(this.templateEle);
                    this.templateEle.style.display = '';
                }
                else {
                    this.templateCompile(trgEle, tempStr);
                }
            }
            else {
                this.templateCompile(trgEle, tempStr);
            }
        }
        else {
            this.templateEle = tempStr;
            trgEle.appendChild(this.templateEle);
        }
    };
    InPlaceEditor.prototype.disable = function (value) {
        value ? addClass([this.element], [classes.DISABLE]) : removeClass([this.element], [classes.DISABLE]);
    };
    InPlaceEditor.prototype.enableEditor = function (val, isInit) {
        if (isInit && !val) {
            return;
        }
        (val) ? this.renderEditor() : this.cancelHandler('cancel');
    };
    InPlaceEditor.prototype.checkValidation = function (fromSubmit, isValidate) {
        var _this = this;
        var args;
        if (this.validationRules) {
            var rules = Object.keys(this.validationRules);
            var validationLength_1 = Object.keys(this.validationRules[rules[0]]).length;
            validationLength_1 = 'validateHidden' in this.validationRules[rules[0]] ? validationLength_1 - 1 : validationLength_1;
            var count_1 = 0;
            this.formValidate = new FormValidator(this.formEle, {
                rules: this.validationRules,
                validationBegin: function (e) {
                    if (_this.type === 'RTE') {
                        var ele = document.createElement('div');
                        ele.innerHTML = e.value;
                        e.value = ele.innerText;
                    }
                },
                validationComplete: function (e) {
                    count_1 = count_1 + 1;
                    args = {
                        errorMessage: e.message,
                        data: { name: _this.name, primaryKey: _this.primaryKey, value: _this.checkValue(_this.getSendValue()) }
                    };
                    _this.trigger('validating', args, function (validateArgs) {
                        if (e.status === 'failure') {
                            e.errorElement.innerText = validateArgs.errorMessage;
                            _this.toggleErrorClass(true);
                        }
                        else {
                            _this.toggleErrorClass(false);
                        }
                        if (!isNOU(fromSubmit) && fromSubmit && (validationLength_1 === count_1 || e.status === 'failure')) {
                            fromSubmit = false;
                            _this.afterValidation(isValidate);
                            count_1 = 0;
                        }
                    });
                },
                customPlacement: function (inputElement, errorElement) {
                    if (_this.formEle) {
                        select('.' + classes.EDITABLE_ERROR, _this.formEle).appendChild(errorElement);
                    }
                }
            });
            count_1 = 0;
            this.formValidate.validate();
        }
        else if (this.template !== '') {
            args = {
                errorMessage: '',
                data: { name: this.name, primaryKey: this.primaryKey, value: this.checkValue(this.getSendValue()) }
            };
            this.trigger('validating', args, function (validateArgs) {
                if (validateArgs.errorMessage) {
                    select('.' + classes.EDITABLE_ERROR, _this.formEle).innerHTML = validateArgs.errorMessage;
                    _this.toggleErrorClass(true);
                }
                else {
                    _this.toggleErrorClass(false);
                }
                _this.afterValidation(isValidate);
            });
        }
        else {
            this.afterValidation(isValidate);
        }
    };
    InPlaceEditor.prototype.afterValidation = function (isValidate) {
        if (!this.formEle.classList.contains(classes.ERROR) && isValidate) {
            this.loadSpinner('validate');
            if (this.mode === 'Popup') {
                this.updateArrow();
            }
            this.sendValue();
        }
    };
    InPlaceEditor.prototype.toggleErrorClass = function (value) {
        if (isNOU(this.formEle)) {
            return;
        }
        var inputEle = select('.e-input-group', this.formEle);
        var errorClass = function (element, val, action) {
            [].slice.call(element).forEach(function (ele) {
                if (ele) {
                    action === 'add' ? addClass([ele], [val]) : removeClass([ele], [val]);
                }
            });
        };
        errorClass([this.formEle, inputEle], classes.ERROR, value ? 'add' : 'remove');
    };
    InPlaceEditor.prototype.updateArrow = function () {
        var pos = this.tipObj.tipPointerPosition;
        this.tipObj.tipPointerPosition = (pos === 'Middle') ? 'Auto' : 'Middle';
        this.tipObj.tipPointerPosition = pos;
        this.tipObj.dataBind();
    };
    InPlaceEditor.prototype.triggerSuccess = function (args) {
        var _this = this;
        var val = args.value;
        this.trigger('actionSuccess', args, function (actionArgs) {
            _this.oldValue = val;
            _this.removeSpinner('submit');
            if (!actionArgs.cancel) {
                _this.renderValue(_this.checkValue((actionArgs.value !== val) ? actionArgs.value : _this.getRenderValue()));
            }
            if (actionArgs.cancel && _this.mode === 'Inline') {
                removeClass([_this.valueWrap], [classes.HIDE]);
            }
            _this.removeEditor();
        });
    };
    InPlaceEditor.prototype.triggerEndEdit = function (closeBeginBy) {
        var _this = this;
        var endEditArgs = { cancel: false, mode: this.mode, action: closeBeginBy };
        this.trigger('endEdit', endEditArgs, function (args) {
            if (!args.cancel) {
                if (_this.formEle && _this.formEle.classList.contains(classes.ERROR)) {
                    _this.updateModelValue(true);
                    _this.setProperties({ value: _this.oldValue }, true);
                }
                _this.removeEditor();
            }
        });
    };
    InPlaceEditor.prototype.wireEvents = function () {
        if (!isNOU(this.editableOn)) {
            this.wireEditEvent(this.editableOn);
        }
        EventHandler.add(this.editIcon, 'click', this.clickHandler, this);
        EventHandler.add(this.element, 'keydown', this.valueKeyDownHandler, this);
        document.addEventListener('scroll', this.onScrollResizeHandler);
        window.addEventListener('resize', this.onScrollResizeHandler);
        if (Array.prototype.indexOf.call(this.clearComponents, this.type) > -1) {
            EventHandler.add(this.element, 'mousedown', this.mouseDownHandler, this);
        }
    };
    InPlaceEditor.prototype.wireDocEvent = function () {
        EventHandler.add(document, 'mousedown', this.docClickHandler, this);
    };
    InPlaceEditor.prototype.wireEditEvent = function (event) {
        if (event === 'EditIconClick') {
            return;
        }
        var titleConstant = (event === 'Click') ? 'editAreaClick' : 'editAreaDoubleClick';
        this.element.setAttribute('title', this.getLocale(localeConstant[event], titleConstant));
        if (Browser.isDevice && Browser.isIos && event === 'DblClick') {
            this.touchModule = new Touch(this.valueWrap, { tap: this.doubleTapHandler.bind(this) });
        }
        else {
            EventHandler.add(this.valueWrap, event.toLowerCase(), this.clickHandler, this);
        }
    };
    InPlaceEditor.prototype.wireEditorKeyDownEvent = function (ele) {
        EventHandler.add(ele, 'keydown', this.enterKeyDownHandler, this);
    };
    InPlaceEditor.prototype.wireBtnEvents = function () {
        if (!isNOU(this.submitBtn)) {
            EventHandler.add(this.submitBtn.element, 'mousedown', this.submitHandler, this);
            EventHandler.add(this.submitBtn.element, 'click', this.submitPrevent, this);
            EventHandler.add(this.submitBtn.element, 'keydown', this.btnKeyDownHandler, this);
        }
        if (!isNOU(this.cancelBtn)) {
            EventHandler.add(this.cancelBtn.element, 'mousedown', this.cancelBtnClick, this);
            EventHandler.add(this.cancelBtn.element, 'keydown', this.btnKeyDownHandler, this);
        }
    };
    InPlaceEditor.prototype.cancelBtnClick = function (e) {
        this.cancelHandler('cancel');
        this.trigger('cancelClick', e);
    };
    InPlaceEditor.prototype.unWireEvents = function () {
        if (!isNOU(this.editableOn)) {
            this.unWireEditEvent(this.editableOn);
        }
        EventHandler.remove(this.editIcon, 'click', this.clickHandler);
        document.removeEventListener('scroll', this.onScrollResizeHandler);
        window.removeEventListener('resize', this.onScrollResizeHandler);
        EventHandler.remove(this.element, 'keydown', this.valueKeyDownHandler);
        if (Array.prototype.indexOf.call(this.clearComponents, this.type) > -1) {
            EventHandler.remove(this.element, 'mousedown', this.mouseDownHandler);
        }
    };
    InPlaceEditor.prototype.unWireDocEvent = function () {
        EventHandler.remove(document, 'mousedown', this.docClickHandler);
    };
    InPlaceEditor.prototype.unWireEditEvent = function (event) {
        if (event === 'EditIconClick') {
            return;
        }
        this.element.removeAttribute('title');
        if (Browser.isDevice && Browser.isIos && event === 'DblClick') {
            this.touchModule.destroy();
            this.touchModule = undefined;
        }
        else {
            EventHandler.remove(this.valueWrap, event.toLowerCase(), this.clickHandler);
        }
    };
    InPlaceEditor.prototype.unWireEditorKeyDownEvent = function (ele) {
        EventHandler.remove(ele, 'keydown', this.enterKeyDownHandler);
    };
    InPlaceEditor.prototype.submitPrevent = function (e) {
        e.preventDefault();
    };
    InPlaceEditor.prototype.btnKeyDownHandler = function (e) {
        var trg = e.target;
        if ((e.keyCode === 13 && e.which === 13) || (e.keyCode === 32 && e.which === 32)) {
            if (trg.classList.contains(classes.BTN_SAVE)) {
                this.save();
            }
            else if (trg.classList.contains(classes.BTN_CANCEL)) {
                this.cancelHandler('cancel');
            }
        }
        if (e.keyCode === 9 && e.shiftKey === false &&
            (isNOU(e.target.nextElementSibling) ||
                e.target.nextElementSibling.tagName !== 'BUTTON')) {
            if (this.actionOnBlur === 'Submit') {
                this.save();
            }
            else if (this.actionOnBlur === 'Cancel') {
                this.cancelHandler('cancel');
            }
        }
    };
    InPlaceEditor.prototype.afterOpenHandler = function (e) {
        if (this.mode === 'Popup' && this.type === 'MultiSelect') {
            EventHandler.add(this.containerEle, 'mousedown', this.popMouseDown, this);
            EventHandler.add(this.containerEle, 'click', this.popClickHandler, this);
        }
        if (this.mode === 'Popup' && !this.isEmpty(this.titleEle.innerHTML)) {
            e.element.classList.add(classes.TIP_TITLE);
        }
        if (this.type === 'RTE') {
            this.rteModule.refresh();
            this.setAttribute(select('.e-richtexteditor textarea', this.containerEle), ['name']);
        }
        else if (this.type === 'Slider') {
            this.sliderModule.refresh();
            this.setAttribute(select('.e-slider-input', this.containerEle), ['name']);
        }
        if (!this.beginEditArgs.cancelFocus) {
            if (this.mode === 'Inline' && (['AutoComplete', 'ComboBox', 'DropDownList', 'MultiSelect'].indexOf(this.type) > -1)
                && this.model.dataSource instanceof DataManager) {
                this.showDropDownPopup();
            }
            else {
                this.setFocus();
            }
        }
        if (this.afterOpenEvent) {
            this.tipObj.setProperties({ afterOpen: this.afterOpenEvent }, true);
            this.tipObj.trigger('afterOpen', e);
        }
    };
    InPlaceEditor.prototype.popMouseDown = function (e) {
        var trgClass = e.target.classList;
        if (trgClass.contains('e-chips-close') && !trgClass.contains('e-close-hooker')) {
            this.updateArrow();
        }
    };
    InPlaceEditor.prototype.doubleTapHandler = function (e) {
        if (e.tapCount > 1) {
            this.clickHandler(e.originalEvent);
        }
    };
    InPlaceEditor.prototype.clickHandler = function (e) {
        if (this.editableOn !== 'EditIconClick') {
            e.stopPropagation();
        }
        this.renderEditor();
    };
    InPlaceEditor.prototype.submitHandler = function (e) {
        e.preventDefault();
        this.save();
        this.trigger('submitClick', e);
    };
    InPlaceEditor.prototype.cancelHandler = function (action) {
        this.triggerEndEdit(action);
    };
    InPlaceEditor.prototype.popClickHandler = function (e) {
        var tipTarget = select('.' + classes.VALUE_WRAPPER, this.element);
        if (e.target.classList.contains('e-chips-close')) {
            this.tipObj.refresh(tipTarget);
        }
    };
    InPlaceEditor.prototype.successHandler = function (e) {
        this.initRender = false;
        var eventArgs = { data: e, value: this.getSendValue() };
        this.triggerSuccess(eventArgs);
    };
    InPlaceEditor.prototype.failureHandler = function (e) {
        var _this = this;
        var eventArgs = { data: e, value: this.getSendValue() };
        this.trigger('actionFailure', eventArgs, function (args) {
            _this.removeSpinner('submit');
            if (_this.mode === 'Popup') {
                _this.updateArrow();
            }
        });
    };
    InPlaceEditor.prototype.enterKeyDownHandler = function (e) {
        if (!closest(e.target, '.' + classes.INPUT + ' .e-richtexteditor') && (!e.currentTarget.getElementsByTagName("textarea")[0])) {
            if ((e.keyCode === 13 && e.which === 13) && closest(e.target, '.' + classes.INPUT)) {
                this.save();
                this.trigger('submitClick', e);
            }
            else if (e.keyCode === 27 && e.which === 27) {
                this.cancelHandler('cancel');
            }
        }
    };
    InPlaceEditor.prototype.valueKeyDownHandler = function (e) {
        if (e.keyCode === 9 && e.shiftKey === true && e.target.tagName !== 'BUTTON') {
            if (this.actionOnBlur === 'Submit') {
                this.save();
            }
            else if (this.actionOnBlur === 'Cancel') {
                this.cancelHandler('cancel');
            }
        }
        if ((e.keyCode === 13 && e.which === 13) && e.target.classList.contains(classes.ROOT) &&
            !this.valueWrap.classList.contains(classes.OPEN) && !this.element.classList.contains(classes.DISABLE)) {
            e.preventDefault();
            this.renderEditor();
        }
    };
    InPlaceEditor.prototype.mouseDownHandler = function (e) {
        if (e.target.classList.contains('e-clear-icon')) {
            this.isClearTarget = true;
        }
    };
    InPlaceEditor.prototype.scrollResizeHandler = function () {
        if (this.mode === 'Popup' && this.tipObj && !(Browser.isDevice)) {
            this.triggerEndEdit('cancel');
        }
    };
    InPlaceEditor.prototype.docClickHandler = function (e) {
        var trg = e.target;
        if (this.isClearTarget) {
            this.isClearTarget = false;
            return;
        }
        var relateRoot = closest(trg, '.' + classes.ROOT);
        var relateTipRoot = closest(trg, '.' + classes.ROOT_TIP);
        var relateElements = closest(trg, '.' + classes.ELEMENTS);
        var relateRTEElements = closest(trg, '.e-rte-elements');
        if ((!isNOU(relateRoot) && relateRoot.isEqualNode(this.element)) ||
            (!isNOU(relateTipRoot) && this.tipObj && (relateTipRoot.id.indexOf(this.valueWrap.id) > -1)) ||
            !isNOU(relateElements) || !isNOU(relateRTEElements) || trg.classList.contains('e-chips-close')) {
            return;
        }
        else {
            if (this.actionOnBlur === 'Submit') {
                this.save();
            }
            else if (this.actionOnBlur === 'Cancel') {
                this.cancelHandler('cancel');
            }
        }
    };
    InPlaceEditor.prototype.changeHandler = function (e) {
        var eventArgs = {
            previousValue: this.compPrevValue === undefined ? this.value : this.compPrevValue,
            value: e.value
        };
        if (this.type === 'AutoComplete' || this.type === 'ComboBox' || this.type === 'DropDownList') {
            eventArgs.itemData = e.itemData;
            eventArgs.previousItemData = e.previousItemData;
        }
        this.compPrevValue = eventArgs.value;
        this.trigger('change', eventArgs);
    };
    /**
     * Validate current editor value.
     *
     * @returns {void}
     */
    InPlaceEditor.prototype.validate = function () {
        this.checkValidation(true, false);
    };
    /**
     * Submit the edited input value to the server.
     *
     * @returns {void}
     */
    InPlaceEditor.prototype.save = function () {
        var _this = this;
        if (!this.formEle) {
            return;
        }
        this.element.focus();
        this.editEle = select('.' + classes.INPUT, this.formEle);
        var errEle = null;
        errEle = select('.' + classes.ERROR, this.editEle);
        if (!this.isTemplate) {
            this.setValue();
        }
        var endEditArgs = { cancel: false, mode: this.mode, action: 'submit' };
        this.trigger('endEdit', endEditArgs, function (args) {
            if (!args.cancel) {
                _this.checkValidation(true, true);
            }
        });
    };
    /**
     * Removes the control from the DOM and also removes all its related events.
     *
     * @returns {void}
     */
    InPlaceEditor.prototype.destroy = function () {
        var _this = this;
        this.removeEditor(isBlazor());
        if (this.isExtModule) {
            this.notify(events.destroy, {});
        }
        this.unWireEvents();
        var classList = [classes.DISABLE, classes.RTL];
        classList.forEach(function (val) {
            removeClass([_this.element], [val]);
        });
        while (this.element.firstElementChild) {
            this.element.removeChild(this.element.firstElementChild);
        }
        if (!(isBlazor() && this.isServerRendered)) {
            _super.prototype.destroy.call(this);
        }
        if (this.isReact) {
            this.clearTemplate();
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - returns the string
     */
    InPlaceEditor.prototype.getPersistData = function () {
        return this.addOnPersist(['value']);
    };
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - returns the module declaration
     * @hidden
     */
    InPlaceEditor.prototype.requiredModules = function () {
        var modules = [];
        if (Array.prototype.indexOf.call(this.moduleList, this.type) > -1) {
            modules.push({ member: modulesList[this.type], args: [this] });
        }
        return modules;
    };
    /**
     * Returns the current module name.
     *
     * @returns {string} - returrns the string
     * @private
     */
    InPlaceEditor.prototype.getModuleName = function () {
        return 'inplaceeditor';
    };
    /**
     * Gets called when the model property changes.The data that describes the old and new values of property that changed.
     *
     * @param  {InPlaceEditorModel} newProp - specifies the new property
     * @param  {InPlaceEditorModel} oldProp - specifies the old property
     * @returns {void}
     * @private
     */
    InPlaceEditor.prototype.onPropertyChanged = function (newProp, oldProp) {
        var checkValidation = this.validationRules ? !isNOU(this.element.querySelectorAll('.' + classes.ERROR)) &&
            this.element.querySelectorAll('.' + classes.ERROR).length > 0 ? false : true : true;
        if (checkValidation) {
            if (this.isEditorOpen()) {
                var editModeChanged = 'enableEditMode' in newProp;
                if ((editModeChanged && oldProp.enableEditMode && !newProp.enableEditMode) || (!editModeChanged && this.enableEditMode)) {
                    this.triggerEndEdit('cancel');
                }
                else {
                    this.removeEditor();
                }
            }
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'showButtons':
                        (newProp.showButtons) ? this.appendButtons(this.formEle) : this.destroyButtons();
                        break;
                    case 'value':
                        this.updateValue();
                        this.textOption === 'Never' ? this.renderValue(this.checkValue(parseValue(this.type, this.value, this.model)))
                            : this.renderInitialValue();
                        break;
                    case 'emptyText':
                        this.textOption === 'Never' ? this.renderValue(this.checkValue(parseValue(this.type, this.value, this.model)))
                            : this.renderInitialValue();
                        break;
                    case 'template':
                        this.checkIsTemplate();
                        break;
                    case 'disabled':
                        this.disable(newProp.disabled);
                        newProp.disabled ? this.element.tabIndex = -1 : this.element.tabIndex = 0;
                        break;
                    case 'enableRtl':
                        this.setRtl(newProp.enableRtl);
                        break;
                    case 'cssClass':
                        this.setClass('remove', oldProp.cssClass);
                        this.setClass('add', newProp.cssClass);
                        break;
                    case 'mode':
                        this.enableEditor(this.enableEditMode);
                        break;
                    case 'enableEditMode':
                        this.enableEditor(newProp.enableEditMode);
                        break;
                    case 'editableOn':
                        this.unWireEditEvent(oldProp.editableOn);
                        if (newProp.editableOn !== 'EditIconClick') {
                            this.wireEditEvent(newProp.editableOn);
                        }
                        break;
                }
            }
        }
    };
    __decorate([
        Property('')
    ], InPlaceEditor.prototype, "name", void 0);
    __decorate([
        Property(null)
    ], InPlaceEditor.prototype, "value", void 0);
    __decorate([
        Property('')
    ], InPlaceEditor.prototype, "template", void 0);
    __decorate([
        Property(true)
    ], InPlaceEditor.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(true)
    ], InPlaceEditor.prototype, "enableHtmlParse", void 0);
    __decorate([
        Property('')
    ], InPlaceEditor.prototype, "cssClass", void 0);
    __decorate([
        Property('')
    ], InPlaceEditor.prototype, "primaryKey", void 0);
    __decorate([
        Property('Empty')
    ], InPlaceEditor.prototype, "emptyText", void 0);
    __decorate([
        Property('')
    ], InPlaceEditor.prototype, "url", void 0);
    __decorate([
        Property('Popup')
    ], InPlaceEditor.prototype, "mode", void 0);
    __decorate([
        Property('UrlAdaptor')
    ], InPlaceEditor.prototype, "adaptor", void 0);
    __decorate([
        Property('Text')
    ], InPlaceEditor.prototype, "type", void 0);
    __decorate([
        Property('Click')
    ], InPlaceEditor.prototype, "editableOn", void 0);
    __decorate([
        Property('Never')
    ], InPlaceEditor.prototype, "textOption", void 0);
    __decorate([
        Property('Submit')
    ], InPlaceEditor.prototype, "actionOnBlur", void 0);
    __decorate([
        Property(false)
    ], InPlaceEditor.prototype, "enablePersistence", void 0);
    __decorate([
        Property(false)
    ], InPlaceEditor.prototype, "disabled", void 0);
    __decorate([
        Property(true)
    ], InPlaceEditor.prototype, "showButtons", void 0);
    __decorate([
        Property(false)
    ], InPlaceEditor.prototype, "enableEditMode", void 0);
    __decorate([
        Property(true)
    ], InPlaceEditor.prototype, "submitOnEnter", void 0);
    __decorate([
        Complex({}, PopupSettings)
    ], InPlaceEditor.prototype, "popupSettings", void 0);
    __decorate([
        Property(null)
    ], InPlaceEditor.prototype, "model", void 0);
    __decorate([
        Property({ iconCss: 'e-icons e-save-icon' })
    ], InPlaceEditor.prototype, "saveButton", void 0);
    __decorate([
        Property({ iconCss: 'e-icons e-cancel-icon' })
    ], InPlaceEditor.prototype, "cancelButton", void 0);
    __decorate([
        Property(null)
    ], InPlaceEditor.prototype, "validationRules", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "created", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "beforeSanitizeHtml", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "actionSuccess", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "validating", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "beginEdit", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "endEdit", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "change", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "submitClick", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "cancelClick", void 0);
    __decorate([
        Event()
    ], InPlaceEditor.prototype, "destroyed", void 0);
    InPlaceEditor = __decorate([
        NotifyPropertyChanges
    ], InPlaceEditor);
    return InPlaceEditor;
}(Component));
export { InPlaceEditor };
