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
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../drop-down-base/drop-down-base-model.d.ts'/>
import { EventHandler, Property, Event, compile, KeyboardEvents, append, select } from '@syncfusion/ej2-base';
import { attributes, isNullOrUndefined, getUniqueID, formatUnit, isUndefined, getValue } from '@syncfusion/ej2-base';
import { Animation, Browser, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { addClass, removeClass, closest, prepend, detach, classList } from '@syncfusion/ej2-base';
import { Popup, isCollide, createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { Input } from '@syncfusion/ej2-inputs';
import { incrementalSearch, resetIncrementalSearchValues } from '../common/incremental-search';
import { DropDownBase, dropDownBaseClasses } from '../drop-down-base/drop-down-base';
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data';
// don't use space in classnames
export var dropDownListClasses = {
    root: 'e-dropdownlist',
    hover: dropDownBaseClasses.hover,
    selected: dropDownBaseClasses.selected,
    rtl: dropDownBaseClasses.rtl,
    li: dropDownBaseClasses.li,
    disable: dropDownBaseClasses.disabled,
    base: dropDownBaseClasses.root,
    focus: dropDownBaseClasses.focus,
    content: dropDownBaseClasses.content,
    input: 'e-input-group',
    inputFocus: 'e-input-focus',
    icon: 'e-input-group-icon e-ddl-icon',
    iconAnimation: 'e-icon-anim',
    value: 'e-input-value',
    device: 'e-ddl-device',
    backIcon: 'e-input-group-icon e-back-icon e-icons',
    filterBarClearIcon: 'e-input-group-icon e-clear-icon e-icons',
    filterInput: 'e-input-filter',
    resizeIcon: 'e-resizer-right e-icons',
    filterParent: 'e-filter-parent',
    mobileFilter: 'e-ddl-device-filter',
    footer: 'e-ddl-footer',
    header: 'e-ddl-header',
    clearIcon: 'e-clear-icon',
    clearIconHide: 'e-clear-icon-hide',
    popupFullScreen: 'e-popup-full-page',
    disableIcon: 'e-ddl-disable-icon',
    hiddenElement: 'e-ddl-hidden',
    virtualList: 'e-list-item e-virtual-list'
};
var inputObject = {
    container: null,
    buttons: []
};
/**
 * The DropDownList component contains a list of predefined values from which you can
 * choose a single value.
 * ```html
 * <input type="text" tabindex="1" id="list"> </input>
 * ```
 * ```typescript
 *   let dropDownListObj:DropDownList = new DropDownList();
 *   dropDownListObj.appendTo("#list");
 * ```
 */
var DropDownList = /** @class */ (function (_super) {
    __extends(DropDownList, _super);
    /**
     * * Constructor for creating the DropDownList component.
     *
     * @param {DropDownListModel} options - Specifies the DropDownList model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function DropDownList(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isListSearched = false;
        _this.preventChange = false;
        _this.isTouched = false;
        _this.isFocused = false;
        _this.autoFill = false;
        _this.isUpdateHeaderHeight = false;
        _this.isUpdateFooterHeight = false;
        _this.isReactTemplateUpdate = false;
        return _this;
    }
    /**
     * Initialize the event handler.
     *
     * @private
     * @returns {void}
     */
    DropDownList.prototype.preRender = function () {
        this.valueTempElement = null;
        this.element.style.opacity = '0';
        this.initializeData();
        _super.prototype.preRender.call(this);
        this.activeIndex = this.index;
        this.queryString = '';
    };
    DropDownList.prototype.initializeData = function () {
        this.isPopupOpen = false;
        this.isDocumentClick = false;
        this.isInteracted = false;
        this.isFilterFocus = false;
        this.beforePopupOpen = false;
        this.initial = true;
        this.initialRemoteRender = false;
        this.isNotSearchList = false;
        this.isTyped = false;
        this.isSelected = false;
        this.preventFocus = false;
        this.preventAutoFill = false;
        this.isValidKey = false;
        this.typedString = '';
        this.isEscapeKey = false;
        this.isPreventBlur = false;
        this.isTabKey = false;
        this.actionCompleteData = { isUpdated: false };
        this.actionData = { isUpdated: false };
        this.prevSelectPoints = {};
        this.isSelectCustom = false;
        this.isDropDownClick = false;
        this.preventAltUp = false;
        this.isCustomFilter = false;
        this.isSecondClick = false;
        this.previousValue = null;
        this.keyConfigure = {
            tab: 'tab',
            enter: '13',
            escape: '27',
            end: '35',
            home: '36',
            down: '40',
            up: '38',
            pageUp: '33',
            pageDown: '34',
            open: 'alt+40',
            close: 'shift+tab',
            hide: 'alt+38',
            space: '32'
        };
        this.viewPortInfo = {
            currentPageNumber: null,
            direction: null,
            sentinelInfo: {},
            offsets: {},
            startIndex: 0,
            endIndex: this.itemCount
        };
    };
    DropDownList.prototype.setZIndex = function () {
        if (this.popupObj) {
            this.popupObj.setProperties({ 'zIndex': this.zIndex });
        }
    };
    DropDownList.prototype.requiredModules = function () {
        var modules = [];
        if (this.enableVirtualization) {
            modules.push({ args: [this], member: 'VirtualScroll' });
        }
        return modules;
    };
    DropDownList.prototype.renderList = function (e, isEmptyData) {
        _super.prototype.render.call(this, e, isEmptyData);
        if (!(this.dataSource instanceof DataManager)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.totalItemCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
        }
        if (this.enableVirtualization && this.isFiltering() && this.getModuleName() === 'combobox') {
            this.UpdateSkeleton();
            this.liCollections = this.list.querySelectorAll('.' + dropDownBaseClasses.li);
            this.ulElement = this.list.querySelector('ul');
        }
        this.unWireListEvents();
        this.wireListEvents();
    };
    DropDownList.prototype.floatLabelChange = function () {
        if (this.getModuleName() === 'dropdownlist' && this.floatLabelType === 'Auto') {
            var floatElement = this.inputWrapper.container.querySelector('.e-float-text');
            if (this.inputElement.value !== '' || this.isInteracted) {
                classList(floatElement, ['e-label-top'], ['e-label-bottom']);
            }
            else {
                classList(floatElement, ['e-label-bottom'], ['e-label-top']);
            }
        }
    };
    DropDownList.prototype.resetHandler = function (e) {
        e.preventDefault();
        this.clearAll(e);
        if (this.enableVirtualization) {
            this.list.scrollTop = 0;
            this.virtualListInfo = null;
            this.previousStartIndex = 0;
            this.previousEndIndex = 0;
        }
    };
    DropDownList.prototype.resetFocusElement = function () {
        this.removeHover();
        this.removeSelection();
        this.removeFocus();
        this.list.scrollTop = 0;
        if (this.getModuleName() !== 'autocomplete' && !isNullOrUndefined(this.ulElement)) {
            var li = this.fields.disabled ? this.ulElement.querySelector('.' + dropDownListClasses.li + ':not(.e-disabled)') : this.ulElement.querySelector('.' + dropDownListClasses.li);
            if (this.enableVirtualization) {
                li = this.liCollections[this.skeletonCount];
            }
            if (li) {
                li.classList.add(dropDownListClasses.focus);
            }
        }
    };
    DropDownList.prototype.clearAll = function (e, properties) {
        this.previousItemData = (!isNullOrUndefined(this.itemData)) ? this.itemData : null;
        if (isNullOrUndefined(properties) || (!isNullOrUndefined(properties) &&
            (isNullOrUndefined(properties.dataSource) ||
                (!(properties.dataSource instanceof DataManager) && properties.dataSource.length === 0)))) {
            this.isActive = true;
            this.resetSelection(properties);
        }
        var dataItem = this.getItemData();
        if ((!this.allowObjectBinding && (this.previousValue === dataItem.value)) ||
            (this.allowObjectBinding && this.previousValue &&
                this.isObjectInArray(this.previousValue, [this.allowCustom ? this.value ? this.value : dataItem :
                        dataItem.value ? this.getDataByValue(dataItem.value) : dataItem]))) {
            this.checkAndResetCache();
            if (this.enableVirtualization && this.list) {
                this.updateInitialData();
            }
            return;
        }
        this.onChangeEvent(e);
        this.checkAndResetCache();
        if (this.enableVirtualization) {
            this.updateInitialData();
        }
    };
    DropDownList.prototype.resetSelection = function (properties) {
        if (this.list) {
            if ((!isNullOrUndefined(properties) &&
                (isNullOrUndefined(properties.dataSource) ||
                    (!(properties.dataSource instanceof DataManager) && properties.dataSource.length === 0)))) {
                this.selectedLI = null;
                this.actionCompleteData.isUpdated = false;
                this.actionCompleteData.ulElement = null;
                this.actionCompleteData.list = null;
                this.resetList(properties.dataSource);
            }
            else {
                if (this.allowFiltering && this.getModuleName() !== 'autocomplete'
                    && !isNullOrUndefined(this.actionCompleteData.ulElement) && !isNullOrUndefined(this.actionCompleteData.list) &&
                    this.actionCompleteData.list.length > 0) {
                    this.onActionComplete(this.actionCompleteData.ulElement.cloneNode(true), this.actionCompleteData.list);
                }
                this.resetFocusElement();
            }
        }
        if (!isNullOrUndefined(this.hiddenElement)) {
            this.hiddenElement.innerHTML = '';
        }
        if (!isNullOrUndefined(this.inputElement)) {
            this.inputElement.value = '';
        }
        this.value = null;
        this.itemData = null;
        this.text = null;
        this.index = null;
        this.activeIndex = null;
        this.item = null;
        this.queryString = '';
        if (this.valueTempElement) {
            detach(this.valueTempElement);
            this.inputElement.style.display = 'block';
            this.valueTempElement = null;
        }
        this.setSelection(null, null);
        this.isSelectCustom = false;
        this.updateIconState();
        this.cloneElements();
    };
    DropDownList.prototype.setHTMLAttributes = function () {
        if (Object.keys(this.htmlAttributes).length) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var htmlAttr = _a[_i];
                if (htmlAttr === 'class') {
                    var updatedClassValue = (this.htmlAttributes["" + htmlAttr].replace(/\s+/g, ' ')).trim();
                    if (updatedClassValue !== '') {
                        addClass([this.inputWrapper.container], updatedClassValue.split(' '));
                    }
                }
                else if (htmlAttr === 'disabled' && this.htmlAttributes["" + htmlAttr] === 'disabled') {
                    this.enabled = false;
                    this.setEnable();
                }
                else if (htmlAttr === 'readonly' && !isNullOrUndefined(this.htmlAttributes["" + htmlAttr])) {
                    this.readonly = true;
                    this.dataBind();
                }
                else if (htmlAttr === 'style') {
                    this.inputWrapper.container.setAttribute('style', this.htmlAttributes["" + htmlAttr]);
                }
                else if (htmlAttr === 'aria-label') {
                    if ((this.getModuleName() === 'autocomplete' || this.getModuleName() === 'combobox') && !this.readonly) {
                        this.inputElement.setAttribute('aria-label', this.htmlAttributes["" + htmlAttr]);
                    }
                    else if (this.getModuleName() === 'dropdownlist') {
                        this.inputWrapper.container.setAttribute('aria-label', this.htmlAttributes["" + htmlAttr]);
                    }
                }
                else {
                    var defaultAttr = ['title', 'id', 'placeholder',
                        'role', 'autocomplete', 'autocapitalize', 'spellcheck', 'minlength', 'maxlength'];
                    var validateAttr = ['name', 'required'];
                    if (this.getModuleName() === 'autocomplete' || this.getModuleName() === 'combobox') {
                        defaultAttr.push('tabindex');
                    }
                    if (validateAttr.indexOf(htmlAttr) > -1 || htmlAttr.indexOf('data') === 0) {
                        this.hiddenElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                    }
                    else if (defaultAttr.indexOf(htmlAttr) > -1) {
                        if (htmlAttr === 'placeholder') {
                            Input.setPlaceholder(this.htmlAttributes["" + htmlAttr], this.inputElement);
                        }
                        else {
                            this.inputElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                        }
                    }
                    else {
                        this.inputWrapper.container.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                    }
                }
            }
        }
        if (this.getModuleName() === 'autocomplete' || this.getModuleName() === 'combobox') {
            this.inputWrapper.container.removeAttribute('tabindex');
        }
    };
    DropDownList.prototype.getAriaAttributes = function () {
        return {
            'aria-disabled': 'false',
            'role': 'combobox',
            'aria-expanded': 'false',
            'aria-live': 'polite',
            'aria-labelledby': this.hiddenElement.id
        };
    };
    DropDownList.prototype.setEnableRtl = function () {
        if (!isNullOrUndefined(this.inputElement) && !isNullOrUndefined(this.inputElement.parentElement)) {
            Input.setEnableRtl(this.enableRtl, [this.inputElement.parentElement]);
        }
        if (this.popupObj) {
            this.popupObj.enableRtl = this.enableRtl;
            this.popupObj.dataBind();
        }
    };
    DropDownList.prototype.setEnable = function () {
        Input.setEnabled(this.enabled, this.inputElement);
        if (this.enabled) {
            removeClass([this.inputWrapper.container], dropDownListClasses.disable);
            this.inputElement.setAttribute('aria-disabled', 'false');
            this.targetElement().setAttribute('tabindex', this.tabIndex);
            if (this.inputWrapper && this.inputWrapper.container) {
                this.inputWrapper.container.setAttribute('aria-disabled', 'false');
                this.inputWrapper.container.removeAttribute('disabled');
            }
        }
        else {
            this.hidePopup();
            addClass([this.inputWrapper.container], dropDownListClasses.disable);
            this.inputElement.setAttribute('aria-disabled', 'true');
            this.targetElement().tabIndex = -1;
            if (this.inputWrapper && this.inputWrapper.container) {
                this.inputWrapper.container.setAttribute('aria-disabled', 'true');
                this.inputWrapper.container.setAttribute('disabled', '');
            }
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} Returns the persisted data of the component.
     */
    DropDownList.prototype.getPersistData = function () {
        return this.addOnPersist(['value']);
    };
    DropDownList.prototype.getLocaleName = function () {
        return 'drop-down-list';
    };
    DropDownList.prototype.preventTabIndex = function (element) {
        if (this.getModuleName() === 'dropdownlist') {
            element.tabIndex = -1;
        }
    };
    DropDownList.prototype.targetElement = function () {
        return !isNullOrUndefined(this.inputWrapper) ? this.inputWrapper.container : null;
    };
    DropDownList.prototype.getNgDirective = function () {
        return 'EJS-DROPDOWNLIST';
    };
    DropDownList.prototype.getElementByText = function (text) {
        return this.getElementByValue(this.getValueByText(text));
    };
    DropDownList.prototype.getElementByValue = function (value) {
        var item;
        var listItems = this.getItems();
        for (var _i = 0, listItems_1 = listItems; _i < listItems_1.length; _i++) {
            var liItem = listItems_1[_i];
            if (this.getFormattedValue(liItem.getAttribute('data-value')) === value) {
                item = liItem;
                break;
            }
        }
        return item;
    };
    DropDownList.prototype.initValue = function () {
        this.viewPortInfo.startIndex = this.virtualItemStartIndex = 0;
        this.viewPortInfo.endIndex = this.virtualItemEndIndex = this.itemCount;
        this.renderList();
        if (this.dataSource instanceof DataManager) {
            this.initialRemoteRender = true;
        }
        else {
            this.updateValues();
        }
    };
    /**
     * Checks if the given value is disabled.
     *
     * @param { string | number | boolean | object } value - The value to check for disablement. Can be a string, number, boolean, or object.
     * @returns { boolean } A boolean indicating whether the value is disabled.
     */
    DropDownList.prototype.isDisableItemValue = function (value) {
        if (typeof (value) === 'object') {
            var objectValue = JSON.parse(JSON.stringify(value))[this.fields.value];
            return this.isDisabledItemByIndex(this.getIndexByValue(objectValue));
        }
        return this.isDisabledItemByIndex(this.getIndexByValue(value));
    };
    DropDownList.prototype.updateValues = function () {
        if (this.fields.disabled) {
            if (this.value != null) {
                this.value = !this.isDisableItemValue(this.value) ? this.value : null;
            }
            if (this.text != null) {
                this.text = !this.isDisabledItemByIndex(this.getIndexByValue(this.getValueByText(this.text))) ? this.text : null;
            }
            if (this.index != null) {
                this.index = !this.isDisabledItemByIndex(this.index) ? this.index : null;
                this.activeIndex = this.index;
            }
        }
        this.selectedValueInfo = this.viewPortInfo;
        if (!isNullOrUndefined(this.value)) {
            var value = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(((this.fields.value) ? this.fields.value : ''), this.value) : this.value;
            this.setSelection(this.getElementByValue(value), null);
        }
        else if (this.text && isNullOrUndefined(this.value)) {
            var element = this.getElementByText(this.text);
            if (isNullOrUndefined(element)) {
                this.setProperties({ text: null });
                return;
            }
            else {
                this.setSelection(element, null);
            }
        }
        else {
            this.setSelection(this.liCollections[this.activeIndex], null);
        }
        this.setHiddenValue();
        Input.setValue(this.text, this.inputElement, this.floatLabelType, this.showClearButton);
    };
    DropDownList.prototype.onBlurHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        var target = e.relatedTarget;
        var currentTarget = e.target;
        var isPreventBlur = this.isPreventBlur;
        this.isPreventBlur = false;
        //IE 11 - issue
        if (isPreventBlur && !this.isDocumentClick && this.isPopupOpen && (!isNullOrUndefined(currentTarget) ||
            !this.isFilterLayout() && isNullOrUndefined(target))) {
            if (this.getModuleName() === 'dropdownlist' && this.allowFiltering && this.isPopupOpen) {
                this.filterInput.focus();
            }
            else {
                this.targetElement().focus();
            }
            return;
        }
        if (this.isDocumentClick || (!isNullOrUndefined(this.popupObj)
            && document.body.contains(this.popupObj.element) &&
            this.popupObj.element.classList.contains(dropDownListClasses.mobileFilter))) {
            if (!this.beforePopupOpen) {
                this.isDocumentClick = false;
            }
            return;
        }
        if (((this.getModuleName() === 'dropdownlist' && !this.isFilterFocus && target !== this.inputElement)
            && (document.activeElement !== target || (document.activeElement === target &&
                currentTarget.classList.contains(dropDownListClasses.inputFocus)))) ||
            (isNullOrUndefined(target) && this.getModuleName() === 'dropdownlist' && this.allowFiltering &&
                currentTarget !== this.inputWrapper.container) || this.getModuleName() !== 'dropdownlist' &&
            !this.inputWrapper.container.contains(target) || this.isTabKey) {
            this.isDocumentClick = this.isPopupOpen ? true : false;
            this.focusOutAction(e);
            this.isTabKey = false;
        }
        if (this.isRequested && !this.isPopupOpen && !this.isPreventBlur) {
            this.isActive = false;
            this.beforePopupOpen = false;
        }
        this.isFocused = false;
    };
    DropDownList.prototype.focusOutAction = function (e) {
        this.isInteracted = false;
        this.focusOut(e);
        this.onFocusOut(e);
    };
    DropDownList.prototype.onFocusOut = function (e) {
        if (!this.enabled) {
            return;
        }
        if (this.isSelected) {
            this.isSelectCustom = false;
            this.onChangeEvent(e);
        }
        this.floatLabelChange();
        this.dispatchEvent(this.hiddenElement, 'change');
        if (this.getModuleName() === 'dropdownlist' && this.element.tagName !== 'INPUT') {
            this.dispatchEvent(this.inputElement, 'blur');
        }
        if (this.inputWrapper.clearButton) {
            addClass([this.inputWrapper.clearButton], dropDownListClasses.clearIconHide);
        }
        this.trigger('blur');
    };
    DropDownList.prototype.onFocus = function (e) {
        if (!this.isInteracted) {
            this.isInteracted = true;
            var args = { isInteracted: e ? true : false, event: e };
            this.trigger('focus', args);
        }
        this.updateIconState();
        this.isFocused = true;
    };
    DropDownList.prototype.resizingWireEvent = function () {
        // Mouse events
        EventHandler.add(document, 'mousemove', this.resizePopup, this);
        EventHandler.add(document, 'mouseup', this.stopResizing, this);
        // Touch events
        EventHandler.add(document, 'touchmove', this.resizePopup, this);
        EventHandler.add(document, 'touchend', this.stopResizing, this);
    };
    DropDownList.prototype.resizingUnWireEvent = function () {
        // Mouse events
        EventHandler.remove(document, 'mousemove', this.resizePopup);
        EventHandler.remove(document, 'mouseup', this.stopResizing);
        // Touch events
        EventHandler.remove(document, 'touchmove', this.resizePopup);
        EventHandler.remove(document, 'touchend', this.stopResizing);
    };
    DropDownList.prototype.resetValueHandler = function (e) {
        var formElement = closest(this.inputElement, 'form');
        if (formElement && e.target === formElement) {
            var val = (this.element.tagName === this.getNgDirective()) ? null : this.inputElement.getAttribute('value');
            this.text = val;
        }
    };
    DropDownList.prototype.wireEvent = function () {
        EventHandler.add(this.inputWrapper.container, 'mousedown', this.dropDownClick, this);
        EventHandler.add(this.inputWrapper.container, 'focus', this.focusIn, this);
        EventHandler.add(this.inputWrapper.container, 'keypress', this.onSearch, this);
        EventHandler.add(window, 'resize', this.windowResize, this);
        this.bindCommonEvent();
    };
    DropDownList.prototype.bindCommonEvent = function () {
        EventHandler.add(this.targetElement(), 'blur', this.onBlurHandler, this);
        var formElement = closest(this.inputElement, 'form');
        if (formElement) {
            EventHandler.add(formElement, 'reset', this.resetValueHandler, this);
        }
        if (!Browser.isDevice) {
            this.keyboardModule = new KeyboardEvents(this.targetElement(), {
                keyAction: this.keyActionHandler.bind(this), keyConfigs: this.keyConfigure, eventName: 'keydown'
            });
        }
        else {
            this.keyboardModule = new KeyboardEvents(this.targetElement(), {
                keyAction: this.mobileKeyActionHandler.bind(this), keyConfigs: this.keyConfigure, eventName: 'keydown'
            });
        }
        this.bindClearEvent();
    };
    DropDownList.prototype.windowResize = function () {
        if (this.isPopupOpen) {
            this.popupObj.refreshPosition(this.inputWrapper.container);
        }
    };
    DropDownList.prototype.bindClearEvent = function () {
        if (this.showClearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown', this.resetHandler, this);
        }
    };
    DropDownList.prototype.unBindCommonEvent = function () {
        if (!isNullOrUndefined(this.inputWrapper) && this.targetElement()) {
            EventHandler.remove(this.targetElement(), 'blur', this.onBlurHandler);
        }
        var formElement = this.inputElement && closest(this.inputElement, 'form');
        if (formElement) {
            EventHandler.remove(formElement, 'reset', this.resetValueHandler);
        }
        if (!Browser.isDevice) {
            this.keyboardModule.destroy();
        }
        if (this.showClearButton) {
            EventHandler.remove(this.inputWrapper.clearButton, 'mousedown', this.resetHandler);
        }
    };
    DropDownList.prototype.updateIconState = function () {
        if (this.showClearButton) {
            if (this.inputElement.value !== '' && !this.readonly) {
                removeClass([this.inputWrapper.clearButton], dropDownListClasses.clearIconHide);
            }
            else {
                addClass([this.inputWrapper.clearButton], dropDownListClasses.clearIconHide);
            }
        }
    };
    /**
     * Event binding for list
     *
     * @returns {void}
     */
    DropDownList.prototype.wireListEvents = function () {
        if (!isNullOrUndefined(this.list)) {
            EventHandler.add(this.list, 'click', this.onMouseClick, this);
            EventHandler.add(this.list, 'mouseover', this.onMouseOver, this);
            EventHandler.add(this.list, 'mouseout', this.onMouseLeave, this);
        }
    };
    DropDownList.prototype.onSearch = function (e) {
        if (e.charCode !== 32 && e.charCode !== 13) {
            if (this.list === undefined) {
                this.renderList();
            }
            this.searchKeyEvent = e;
            this.onServerIncrementalSearch(e);
        }
    };
    DropDownList.prototype.onServerIncrementalSearch = function (e) {
        if (!this.isRequested && !isNullOrUndefined(this.list) &&
            !isNullOrUndefined(this.list.querySelector('li')) && this.enabled && !this.readonly) {
            this.incrementalSearch(e);
        }
    };
    DropDownList.prototype.startResizing = function (event) {
        this.isResizing = true;
        this.trigger('resizeStart', event);
        // Get initial touch or mouse coordinates
        var clientX = (event instanceof MouseEvent) ? event.clientX : event.touches[0].clientX;
        var clientY = (event instanceof MouseEvent) ? event.clientY : event.touches[0].clientY;
        // Store the initial dimensions of the popup
        if (this.list && this.list.parentElement) {
            this.originalWidth = this.list.parentElement.offsetWidth;
            this.originalHeight = this.list.parentElement.offsetHeight;
            this.originalMouseX = clientX;
            this.originalMouseY = clientY;
        }
        // Wire up events for resizing
        this.resizingWireEvent();
        if (event) {
            event.preventDefault(); // Prevent selection behavior if event exists
        }
    };
    DropDownList.prototype.resizePopup = function (event) {
        if (!this.isResizing) {
            return;
        }
        this.trigger('resizing', event);
        // Get the current touch or mouse position
        var clientX = (event instanceof MouseEvent) ? event.clientX : event.touches[0].clientX;
        var clientY = (event instanceof MouseEvent) ? event.clientY : event.touches[0].clientY;
        // Calculate the new width and height based on drag
        var dx = clientX - this.originalMouseX;
        var dy = clientY - this.originalMouseY;
        if (this.list && this.list.parentElement) {
            // Minimum width and height (100px)
            var minWidth = parseInt(window.getComputedStyle(this.list.parentElement).minWidth, 10);
            var minHeight = parseInt(window.getComputedStyle(this.list.parentElement).minHeight, 10);
            minWidth = minWidth || 100;
            minHeight = minHeight || 120;
            // Ensure the new width and height are not less than the minimum
            this.resizeWidth = Math.max(this.originalWidth + dx, minWidth);
            this.resizeHeight = Math.max(this.originalHeight + dy, minHeight);
            this.list.parentElement.style.width = this.resizeWidth + "px";
            this.list.parentElement.style.height = this.resizeHeight + "px";
            this.list.parentElement.style.maxHeight = this.resizeHeight + "px";
            this.list.style.maxHeight = this.resizeHeight + "px";
            if (this.fixedHeaderElement && this.ulElement) {
                this.fixedHeaderElement.style.width = this.ulElement.offsetWidth + "px";
            }
        }
        if (event) {
            event.preventDefault(); // Prevent selection behavior if event exists
        }
    };
    DropDownList.prototype.stopResizing = function (event) {
        if (this.isResizing) {
            this.isResizing = false;
            this.trigger('resizeStop', event);
            // Unwire the resize event listeners
            this.resizingUnWireEvent();
        }
        if (event) {
            event.preventDefault(); // Prevent selection behavior if event exists
        }
    };
    DropDownList.prototype.onMouseClick = function (e) {
        var target = e.target;
        this.keyboardEvent = null;
        var li = closest(target, '.' + dropDownBaseClasses.li);
        if (!this.isValidLI(li) || this.isDisabledElement(li)) {
            return;
        }
        this.setSelection(li, e);
        if (Browser.isDevice && this.isFilterLayout()) {
            history.back();
        }
        else {
            var delay = 100;
            this.closePopup(delay, e);
        }
    };
    DropDownList.prototype.onMouseOver = function (e) {
        var currentLi = closest(e.target, '.' + dropDownBaseClasses.li);
        this.setHover(currentLi);
    };
    DropDownList.prototype.setHover = function (li) {
        if (this.enabled && this.isValidLI(li) && !li.classList.contains(dropDownBaseClasses.hover)) {
            this.removeHover();
            addClass([li], dropDownBaseClasses.hover);
        }
    };
    DropDownList.prototype.onMouseLeave = function () {
        this.removeHover();
    };
    DropDownList.prototype.removeHover = function () {
        if (this.list) {
            var hoveredItem = this.list.querySelectorAll('.' + dropDownBaseClasses.hover);
            if (hoveredItem && hoveredItem.length) {
                removeClass(hoveredItem, dropDownBaseClasses.hover);
            }
        }
    };
    DropDownList.prototype.isValidLI = function (li) {
        return (li && li.hasAttribute('role') && li.getAttribute('role') === 'option');
    };
    DropDownList.prototype.updateIncrementalItemIndex = function (startIndex, endIndex) {
        this.incrementalStartIndex = startIndex;
        this.incrementalEndIndex = endIndex;
    };
    DropDownList.prototype.incrementalSearch = function (e) {
        if (this.liCollections.length > 0) {
            if (this.enableVirtualization) {
                var updatingincrementalindex = false;
                var queryStringUpdated = false;
                var activeElement = this.ulElement.getElementsByClassName('e-active')[0];
                var currentValue = activeElement ? activeElement.textContent : null;
                if (this.incrementalQueryString === '') {
                    this.incrementalQueryString = String.fromCharCode(e.charCode);
                    this.incrementalPreQueryString = this.incrementalQueryString;
                }
                else if (String.fromCharCode(e.charCode).toLocaleLowerCase() === this.incrementalPreQueryString.toLocaleLowerCase()) {
                    queryStringUpdated = true;
                }
                else {
                    this.incrementalQueryString = String.fromCharCode(e.charCode);
                }
                if ((this.viewPortInfo.endIndex >= this.incrementalEndIndex && this.incrementalEndIndex <= this.totalItemCount) ||
                    this.incrementalEndIndex === 0) {
                    updatingincrementalindex = true;
                    this.incrementalStartIndex = this.incrementalEndIndex;
                    if (this.incrementalEndIndex === 0) {
                        this.incrementalEndIndex = 100 > this.totalItemCount ? this.totalItemCount : 100;
                    }
                    else {
                        this.incrementalEndIndex = this.incrementalEndIndex + 100 > this.totalItemCount ? this.totalItemCount :
                            this.incrementalEndIndex + 100;
                    }
                    this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
                    updatingincrementalindex = true;
                }
                if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
                    this.updateIncrementalView(0, this.itemCount);
                }
                var li = incrementalSearch(e.charCode, this.incrementalLiCollections, this.activeIndex, true, this.element.id, queryStringUpdated, currentValue, true);
                while (isNullOrUndefined(li) && this.incrementalEndIndex < this.totalItemCount) {
                    this.updateIncrementalItemIndex(this.incrementalEndIndex, this.incrementalEndIndex + 100 > this.totalItemCount ?
                        this.totalItemCount : this.incrementalEndIndex + 100);
                    this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
                    updatingincrementalindex = true;
                    if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
                        this.updateIncrementalView(0, this.itemCount);
                    }
                    li = incrementalSearch(e.charCode, this.incrementalLiCollections, 0, true, this.element.id, queryStringUpdated, currentValue, true, true);
                    if (!isNullOrUndefined(li)) {
                        break;
                    }
                    if (isNullOrUndefined(li) && this.incrementalEndIndex >= this.totalItemCount) {
                        this.updateIncrementalItemIndex(0, 100 > this.totalItemCount ? this.totalItemCount : 100);
                        break;
                    }
                }
                if (isNullOrUndefined(li) && this.incrementalEndIndex >= this.totalItemCount) {
                    this.updateIncrementalItemIndex(0, 100 > this.totalItemCount ? this.totalItemCount : 100);
                    this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
                    updatingincrementalindex = true;
                    if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
                        this.updateIncrementalView(0, this.itemCount);
                    }
                    li = incrementalSearch(e.charCode, this.incrementalLiCollections, 0, true, this.element.id, queryStringUpdated, currentValue, true, true);
                }
                var index = li && this.getIndexByValue(li.getAttribute('data-value'));
                if (!index) {
                    for (var i = 0; i < this.incrementalLiCollections.length; i++) {
                        if (!isNullOrUndefined(li) && !isNullOrUndefined(li.getAttribute('data-value')) &&
                            this.incrementalLiCollections[i].getAttribute('data-value') === li.getAttribute('data-value').toString()) {
                            index = i;
                            index = this.incrementalStartIndex + index;
                            break;
                        }
                    }
                }
                else {
                    index = index - this.skeletonCount;
                }
                if (index) {
                    if ((!(this.viewPortInfo.startIndex >= index)) || (!(index >= this.viewPortInfo.endIndex))) {
                        var startIndex = index - ((this.itemCount / 2) - 2) > 0 ? index - ((this.itemCount / 2) - 2) : 0;
                        var endIndex = this.viewPortInfo.startIndex + this.itemCount > this.totalItemCount ?
                            this.totalItemCount : this.viewPortInfo.startIndex + this.itemCount;
                        this.updateIncrementalView(startIndex, endIndex);
                    }
                }
                if (!isNullOrUndefined(li)) {
                    var index_1 = this.getIndexByValue(li.getAttribute('data-value')) - this.skeletonCount;
                    if (index_1 > this.itemCount / 2) {
                        var startIndex = this.viewPortInfo.startIndex + ((this.itemCount / 2) - 2) < this.totalItemCount ?
                            this.viewPortInfo.startIndex + ((this.itemCount / 2) - 2) : this.totalItemCount;
                        var endIndex = this.viewPortInfo.startIndex + this.itemCount > this.totalItemCount ?
                            this.totalItemCount : this.viewPortInfo.startIndex + this.itemCount;
                        this.updateIncrementalView(startIndex, endIndex);
                    }
                    li = this.getElementByValue(li.getAttribute('data-value'));
                    this.setSelection(li, e);
                    this.setScrollPosition();
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = this.getTransformValues();
                    if (this.enableVirtualization && !this.fields.groupBy) {
                        var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ?
                            this.selectedLI.offsetTop +
                                (this.virtualListInfo.startIndex * this.selectedLI.offsetHeight) : this.selectedLI.offsetTop;
                        this.list.scrollTop = selectedLiOffsetTop -
                            (this.list.querySelectorAll('.e-virtual-list').length * this.selectedLI.offsetHeight);
                    }
                    this.incrementalPreQueryString = this.incrementalQueryString;
                }
                else {
                    this.updateIncrementalView(0, this.itemCount);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = this.getTransformValues();
                    this.list.scrollTop = 0;
                }
            }
            else {
                var li = void 0;
                if (this.fields.disabled) {
                    var enableLiCollections = this.list.querySelectorAll('.' + dropDownBaseClasses.li + ':not(.e-disabled)');
                    li = incrementalSearch(e.charCode, enableLiCollections, this.activeIndex, true, this.element.id);
                }
                else {
                    li = incrementalSearch(e.charCode, this.liCollections, this.activeIndex, true, this.element.id);
                }
                if (!isNullOrUndefined(li)) {
                    this.setSelection(li, e);
                    this.setScrollPosition();
                }
            }
        }
    };
    /**
     * Hides the spinner loader.
     *
     * @returns {void}
     */
    DropDownList.prototype.hideSpinner = function () {
        if (!isNullOrUndefined(this.spinnerElement)) {
            hideSpinner(this.spinnerElement);
            removeClass([this.spinnerElement], dropDownListClasses.disableIcon);
            this.spinnerElement.innerHTML = '';
            this.spinnerElement = null;
        }
    };
    /**
     * Shows the spinner loader.
     *
     * @returns {void}
     */
    DropDownList.prototype.showSpinner = function () {
        if (isNullOrUndefined(this.spinnerElement)) {
            this.spinnerElement = Browser.isDevice && !isNullOrUndefined(this.filterInputObj) && this.filterInputObj.buttons[1] ||
                !isNullOrUndefined(this.filterInputObj) && this.filterInputObj.buttons[0] || this.inputWrapper.buttons[0];
            addClass([this.spinnerElement], dropDownListClasses.disableIcon);
            createSpinner({
                target: this.spinnerElement,
                width: Browser.isDevice ? '16px' : '14px'
            }, this.createElement);
            showSpinner(this.spinnerElement);
        }
    };
    DropDownList.prototype.keyActionHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        this.keyboardEvent = e;
        if (this.isPreventKeyAction && this.enableVirtualization) {
            e.preventDefault();
        }
        var preventAction = e.action === 'pageUp' || e.action === 'pageDown';
        var preventHomeEnd = this.getModuleName() !== 'dropdownlist' && (e.action === 'home' || e.action === 'end');
        this.isEscapeKey = e.action === 'escape';
        this.isTabKey = !this.isPopupOpen && e.action === 'tab';
        var isNavigation = (e.action === 'down' || e.action === 'up' || e.action === 'pageUp' || e.action === 'pageDown'
            || e.action === 'home' || e.action === 'end');
        if ((this.isEditTextBox() || preventAction || preventHomeEnd) && !this.isPopupOpen) {
            return;
        }
        if (!this.readonly) {
            var isTabAction = e.action === 'tab' || e.action === 'close';
            if (isNullOrUndefined(this.list) && !this.isRequested && !isTabAction && e.action !== 'escape') {
                this.searchKeyEvent = e;
                if (!this.enableVirtualization || (this.enableVirtualization && this.getModuleName() !== 'autocomplete' && e.type !== 'mousedown' && (e.keyCode === 40 || e.keyCode === 38))) {
                    this.renderList(e);
                    this.UpdateSkeleton();
                    this.liCollections = this.list.querySelectorAll('.' + dropDownBaseClasses.li);
                    this.ulElement = this.list.querySelector('ul');
                }
            }
            if (isNullOrUndefined(this.list) || (!isNullOrUndefined(this.liCollections) &&
                isNavigation && this.liCollections.length === 0) || this.isRequested) {
                return;
            }
            if ((isTabAction && this.getModuleName() !== 'autocomplete') && this.isPopupOpen
                || e.action === 'escape') {
                e.preventDefault();
            }
            this.isSelected = e.action === 'escape' ? false : this.isSelected;
            this.isTyped = (isNavigation || e.action === 'escape') ? false : this.isTyped;
            switch (e.action) {
                case 'down':
                case 'up':
                    this.updateUpDownAction(e);
                    break;
                case 'pageUp':
                    this.pageUpSelection(this.activeIndex - this.getPageCount(), e);
                    e.preventDefault();
                    break;
                case 'pageDown':
                    this.pageDownSelection(this.activeIndex + this.getPageCount(), e);
                    e.preventDefault();
                    break;
                case 'home':
                    this.isMouseScrollAction = true;
                    this.updateHomeEndAction(e);
                    break;
                case 'end':
                    this.isMouseScrollAction = true;
                    this.updateHomeEndAction(e);
                    break;
                case 'space':
                    if (this.getModuleName() === 'dropdownlist') {
                        if (!this.beforePopupOpen) {
                            this.showPopup();
                            e.preventDefault();
                        }
                    }
                    break;
                case 'open':
                    this.showPopup(e);
                    break;
                case 'hide':
                    this.preventAltUp = this.isPopupOpen;
                    this.hidePopup(e);
                    this.focusDropDown(e);
                    break;
                case 'enter':
                    this.selectCurrentItem(e);
                    break;
                case 'tab':
                    this.selectCurrentValueOnTab(e);
                    break;
                case 'escape':
                case 'close':
                    if (this.isPopupOpen) {
                        this.hidePopup(e);
                        this.focusDropDown(e);
                    }
                    break;
            }
        }
    };
    DropDownList.prototype.updateUpDownAction = function (e, isVirtualKeyAction) {
        if (this.fields.disabled && this.list && this.list.querySelectorAll('.e-list-item:not(.e-disabled)').length === 0) {
            return;
        }
        if (this.allowFiltering && !this.enableVirtualization && this.getModuleName() !== 'autocomplete') {
            var value = this.getItemData().value;
            if (isNullOrUndefined(value)) {
                value = 'null';
            }
            var filterIndex = this.getIndexByValue(value);
            if (!isNullOrUndefined(filterIndex)) {
                this.activeIndex = filterIndex;
            }
        }
        var focusEle = this.list.querySelector('.' + dropDownListClasses.focus);
        if (this.isSelectFocusItem(focusEle) && !isVirtualKeyAction) {
            this.setSelection(focusEle, e);
            if (this.enableVirtualization) {
                var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ? this.selectedLI.offsetTop +
                    (this.virtualListInfo.startIndex * this.selectedLI.offsetHeight) : this.selectedLI.offsetTop;
                if (this.fields.groupBy) {
                    selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex === 0 ?
                        this.selectedLI.offsetHeight - selectedLiOffsetTop : selectedLiOffsetTop - this.selectedLI.offsetHeight;
                }
                this.list.scrollTop = selectedLiOffsetTop -
                    (this.list.querySelectorAll('.e-virtual-list').length * this.selectedLI.offsetHeight);
            }
        }
        else if (!isNullOrUndefined(this.liCollections)) {
            var virtualIndex = this.activeIndex;
            var index = e.action === 'down' ? this.activeIndex + 1 : this.activeIndex - 1;
            index = isVirtualKeyAction ? virtualIndex : index;
            var startIndex = 0;
            if (this.getModuleName() === 'autocomplete') {
                startIndex = e.action === 'down' && isNullOrUndefined(this.activeIndex) ? 0 : this.liCollections.length - 1;
                index = index < 0 ? this.liCollections.length - 1 : index === this.liCollections.length ? 0 : index;
            }
            var nextItem = void 0;
            if (this.getModuleName() !== 'autocomplete' || this.getModuleName() === 'autocomplete' && this.isPopupOpen) {
                if (!this.enableVirtualization) {
                    nextItem = isNullOrUndefined(this.activeIndex) ? this.liCollections[startIndex]
                        : this.liCollections[index];
                }
                else {
                    if (!isVirtualKeyAction) {
                        nextItem = isNullOrUndefined(this.activeIndex) ? this.liCollections[this.skeletonCount]
                            : this.liCollections[index];
                        nextItem = !isNullOrUndefined(nextItem) && !nextItem.classList.contains('e-virtual-list') ? nextItem : null;
                    }
                    else {
                        if (this.getModuleName() === 'autocomplete') {
                            var value = this.getFormattedValue(this.selectedLI.getAttribute('data-value'));
                            nextItem = this.getElementByValue(value);
                        }
                        else {
                            nextItem = this.getElementByValue(this.getItemData().value);
                        }
                    }
                }
            }
            if (!isNullOrUndefined(nextItem)) {
                var focusAtFirstElement = this.liCollections[this.skeletonCount] &&
                    this.liCollections[this.skeletonCount].classList.contains('e-item-focus');
                this.setSelection(nextItem, e);
                if (focusAtFirstElement && this.enableVirtualization && this.getModuleName() === 'autocomplete' && !isVirtualKeyAction) {
                    var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ?
                        this.selectedLI.offsetTop + (this.virtualListInfo.startIndex * this.selectedLI.offsetHeight) :
                        this.selectedLI.offsetTop;
                    selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex === 0 && this.fields.groupBy ?
                        this.selectedLI.offsetHeight - selectedLiOffsetTop : selectedLiOffsetTop - this.selectedLI.offsetHeight;
                    this.list.scrollTop = selectedLiOffsetTop - (this.list.querySelectorAll('.e-virtual-list').length * this.selectedLI.offsetHeight);
                }
            }
            else if (this.enableVirtualization && !this.isPopupOpen && this.getModuleName() !== 'autocomplete' && ((this.viewPortInfo.endIndex !== this.totalItemCount && e.action === 'down') || (this.viewPortInfo.startIndex !== 0 && e.action === 'up'))) {
                if (e.action === 'down') {
                    this.viewPortInfo.startIndex = (this.viewPortInfo.startIndex + this.itemCount) <
                        (this.totalItemCount - this.itemCount) ? this.viewPortInfo.startIndex + this.itemCount :
                        this.totalItemCount - this.itemCount;
                    this.viewPortInfo.endIndex = this.viewPortInfo.startIndex + this.itemCount;
                    this.updateVirtualItemIndex();
                    this.isCustomFilter = this.getModuleName() === 'combobox' ? true : this.isCustomFilter;
                    this.resetList(this.dataSource, this.fields, this.query);
                    this.isCustomFilter = this.getModuleName() === 'combobox' ? false : this.isCustomFilter;
                    var value = this.liCollections[0].getAttribute('data-value') !== 'null' ?
                        this.getFormattedValue(this.liCollections[0].getAttribute('data-value')) : null;
                    var selectedData = this.getDataByValue(value);
                    if (selectedData) {
                        this.itemData = selectedData;
                    }
                }
                else if (e.action === 'up') {
                    this.viewPortInfo.startIndex = (this.viewPortInfo.startIndex - this.itemCount) > 0 ?
                        this.viewPortInfo.startIndex - this.itemCount : 0;
                    this.viewPortInfo.endIndex = this.viewPortInfo.startIndex + this.itemCount;
                    this.updateVirtualItemIndex();
                    this.isCustomFilter = this.getModuleName() === 'combobox' ? true : this.isCustomFilter;
                    this.resetList(this.dataSource, this.fields, this.query);
                    this.isCustomFilter = this.getModuleName() === 'combobox' ? false : this.isCustomFilter;
                    var value = this.liCollections[this.liCollections.length - 1].getAttribute('data-value') !== 'null' ? this.getFormattedValue(this.liCollections[this.liCollections.length - 1].getAttribute('data-value')) : null;
                    var selectedData = this.getDataByValue(value);
                    if (selectedData) {
                        this.itemData = selectedData;
                    }
                }
                this.UpdateSkeleton();
                this.liCollections = this.list.querySelectorAll('.' + dropDownBaseClasses.li);
                this.ulElement = this.list.querySelector('ul');
                this.handleVirtualKeyboardActions(e, this.pageCount);
            }
        }
        if (this.allowFiltering && !this.enableVirtualization && this.getModuleName() !== 'autocomplete') {
            var value = this.getItemData().value;
            var filterIndex = this.getIndexByValueFilter(value, this.actionCompleteData.ulElement);
            if (!isNullOrUndefined(filterIndex)) {
                this.activeIndex = filterIndex;
            }
        }
        if (this.allowFiltering && this.getModuleName() === 'dropdownlist' && this.filterInput) {
            if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName('e-item-focus')[0])) {
                attributes(this.filterInput, { 'aria-activedescendant': this.ulElement.getElementsByClassName('e-item-focus')[0].id });
            }
            else if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName('e-active')[0])) {
                attributes(this.filterInput, { 'aria-activedescendant': this.ulElement.getElementsByClassName('e-active')[0].id });
            }
        }
        var itemIndex;
        for (var index = 0; index < this.liCollections.length; index++) {
            if (this.liCollections[index].classList.contains(dropDownListClasses.focus)
                || this.liCollections[index].classList.contains(dropDownListClasses.selected)) {
                itemIndex = index;
                break;
            }
        }
        if (itemIndex != null && this.isDisabledElement(this.liCollections[itemIndex])) {
            if (this.getModuleName() !== 'autocomplete') {
                if (this.liCollections.length - 1 === itemIndex && e.action === 'down') {
                    e.action = 'up';
                }
                if (itemIndex === 0 && e.action === 'up') {
                    e.action = 'down';
                }
            }
            this.updateUpDownAction(e);
        }
        e.preventDefault();
    };
    DropDownList.prototype.updateHomeEndAction = function (e, isVirtualKeyAction) {
        if (this.getModuleName() === 'dropdownlist') {
            var findLi = 0;
            if (e.action === 'home') {
                findLi = 0;
                if (this.enableVirtualization && this.isPopupOpen) {
                    findLi = this.skeletonCount;
                }
                else if (this.enableVirtualization && !this.isPopupOpen && this.viewPortInfo.startIndex !== 0) {
                    this.viewPortInfo.startIndex = 0;
                    this.viewPortInfo.endIndex = this.itemCount;
                    this.updateVirtualItemIndex();
                    this.resetList(this.dataSource, this.fields, this.query);
                }
            }
            else {
                if (this.enableVirtualization && !this.isPopupOpen && this.viewPortInfo.endIndex !== this.totalItemCount) {
                    this.viewPortInfo.startIndex = this.totalItemCount - this.itemCount;
                    this.viewPortInfo.endIndex = this.totalItemCount;
                    this.updateVirtualItemIndex();
                    this.resetList(this.dataSource, this.fields, this.query);
                }
                findLi = this.getItems().length - 1;
            }
            e.preventDefault();
            if (this.activeIndex === findLi) {
                if (isVirtualKeyAction) {
                    this.setSelection(this.liCollections[findLi], e);
                }
                return;
            }
            if (!this.enableVirtualization && this.liCollections[findLi] && this.liCollections[findLi].classList.contains('e-disabled')) {
                return;
            }
            this.setSelection(this.liCollections[findLi], e);
        }
    };
    DropDownList.prototype.selectCurrentValueOnTab = function (e) {
        if (this.getModuleName() === 'autocomplete') {
            this.selectCurrentItem(e);
        }
        else {
            if (this.isPopupOpen) {
                this.hidePopup(e);
                this.focusDropDown(e);
            }
        }
    };
    DropDownList.prototype.mobileKeyActionHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        if ((this.isEditTextBox()) && !this.isPopupOpen) {
            return;
        }
        if (!this.readonly) {
            if (this.list === undefined && !this.isRequested) {
                this.searchKeyEvent = e;
                this.renderList();
            }
            if (isNullOrUndefined(this.list) || (!isNullOrUndefined(this.liCollections) &&
                this.liCollections.length === 0) || this.isRequested) {
                return;
            }
            if (e.action === 'enter') {
                this.selectCurrentItem(e);
            }
        }
    };
    DropDownList.prototype.handleVirtualKeyboardActions = function (e, pageCount) {
        switch (e.action) {
            case 'down':
            case 'up':
                if (this.itemData != null || this.getModuleName() === 'autocomplete') {
                    this.updateUpDownAction(e, true);
                }
                break;
            case 'pageUp':
                this.activeIndex = this.getModuleName() === 'autocomplete' ?
                    this.getIndexByValue(this.selectedLI.getAttribute('data-value')) + this.getPageCount() - 1 :
                    this.getIndexByValue(this.previousValue);
                this.pageUpSelection(this.activeIndex - this.getPageCount(), e, true);
                e.preventDefault();
                break;
            case 'pageDown':
                this.activeIndex = this.getModuleName() === 'autocomplete' ?
                    this.getIndexByValue(this.selectedLI.getAttribute('data-value')) - this.getPageCount() :
                    this.getIndexByValue(this.previousValue);
                this.pageDownSelection(!isNullOrUndefined(this.activeIndex) ?
                    (this.activeIndex + this.getPageCount()) : (2 * this.getPageCount()), e, true);
                e.preventDefault();
                break;
            case 'home':
                this.isMouseScrollAction = true;
                this.updateHomeEndAction(e, true);
                break;
            case 'end':
                this.isMouseScrollAction = true;
                this.updateHomeEndAction(e, true);
                break;
        }
        this.keyboardEvent = null;
    };
    DropDownList.prototype.selectCurrentItem = function (e) {
        if (this.isPopupOpen) {
            var li = this.list.querySelector('.' + dropDownListClasses.focus);
            if (this.isDisabledElement(li)) {
                return;
            }
            if (li) {
                this.setSelection(li, e);
                this.isTyped = false;
            }
            if (this.isSelected) {
                this.isSelectCustom = false;
                this.onChangeEvent(e);
            }
            this.hidePopup(e);
            this.focusDropDown(e);
        }
        else {
            this.showPopup();
        }
    };
    DropDownList.prototype.isSelectFocusItem = function (element) {
        return !isNullOrUndefined(element);
    };
    DropDownList.prototype.pageUpSelection = function (steps, event, isVirtualKeyAction) {
        var previousItem = steps >= 0 ? this.liCollections[steps + 1] : this.liCollections[0];
        if (!this.enableVirtualization && previousItem && previousItem.classList.contains('e-disabled')) {
            var validIndex = steps >= 0 ? steps + 1 : 0;
            while (validIndex < this.liCollections.length) {
                previousItem = this.liCollections[validIndex];
                if (previousItem && !previousItem.classList.contains('e-disabled')) {
                    break;
                }
                validIndex--;
                if (validIndex < 0) {
                    return;
                }
            }
        }
        if ((this.enableVirtualization && this.activeIndex == null)) {
            previousItem = (this.liCollections.length >= steps && steps >= 0) ?
                this.liCollections[steps + this.skeletonCount + 1] : this.liCollections[0];
        }
        if (!isNullOrUndefined(previousItem) && previousItem.classList.contains('e-virtual-list')) {
            previousItem = this.liCollections[this.skeletonCount];
        }
        this.PageUpDownSelection(previousItem, event);
        if (this.allowFiltering && this.getModuleName() === 'dropdownlist') {
            if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName('e-item-focus')[0])) {
                attributes(this.filterInput, { 'aria-activedescendant': this.ulElement.getElementsByClassName('e-item-focus')[0].id });
            }
            else if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName('e-active')[0])) {
                attributes(this.filterInput, { 'aria-activedescendant': this.ulElement.getElementsByClassName('e-active')[0].id });
            }
        }
    };
    DropDownList.prototype.PageUpDownSelection = function (previousItem, event) {
        if (this.enableVirtualization) {
            if (!isNullOrUndefined(previousItem) && ((this.getModuleName() !== 'autocomplete' &&
                !previousItem.classList.contains('e-active')) || (this.getModuleName() === 'autocomplete' &&
                !previousItem.classList.contains('e-item-focus')))) {
                this.setSelection(previousItem, event);
            }
        }
        else {
            this.setSelection(previousItem, event);
        }
    };
    DropDownList.prototype.pageDownSelection = function (steps, event, isVirtualKeyAction) {
        var list = this.getItems();
        var previousItem = steps <= list.length ? this.liCollections[steps - 1] : this.liCollections[list.length - 1];
        if (!this.enableVirtualization && previousItem && previousItem.classList.contains('e-disabled')) {
            while (steps >= 0 && steps < this.liCollections.length) {
                previousItem = steps <= list.length ? this.liCollections[steps - 1] : this.liCollections[list.length - 1];
                if (previousItem && !previousItem.classList.contains('e-disabled')) {
                    break;
                }
                steps++;
            }
        }
        if (this.enableVirtualization && this.skeletonCount > 0) {
            steps = this.getModuleName() === 'dropdownlist' && this.allowFiltering ? steps + 1 : steps;
            previousItem = steps < list.length ? this.liCollections[steps] : this.liCollections[list.length - 1];
        }
        if ((this.enableVirtualization && this.activeIndex == null)) {
            previousItem = steps <= list.length ? this.liCollections[steps + this.skeletonCount - 1] : this.liCollections[list.length - 1];
        }
        this.PageUpDownSelection(previousItem, event);
        if (this.allowFiltering && this.getModuleName() === 'dropdownlist') {
            if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName('e-item-focus')[0])) {
                attributes(this.filterInput, { 'aria-activedescendant': this.ulElement.getElementsByClassName('e-item-focus')[0].id });
            }
            else if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName('e-active')[0])) {
                attributes(this.filterInput, { 'aria-activedescendant': this.ulElement.getElementsByClassName('e-active')[0].id });
            }
        }
    };
    DropDownList.prototype.unWireEvent = function () {
        if (!isNullOrUndefined(this.inputWrapper)) {
            EventHandler.remove(this.inputWrapper.container, 'mousedown', this.dropDownClick);
            EventHandler.remove(this.inputWrapper.container, 'keypress', this.onSearch);
            EventHandler.remove(this.inputWrapper.container, 'focus', this.focusIn);
            EventHandler.remove(window, 'resize', this.windowResize);
        }
        this.unBindCommonEvent();
    };
    /**
     * Event un binding for list items.
     *
     * @returns {void}
     */
    DropDownList.prototype.unWireListEvents = function () {
        if (this.list) {
            EventHandler.remove(this.list, 'click', this.onMouseClick);
            EventHandler.remove(this.list, 'mouseover', this.onMouseOver);
            EventHandler.remove(this.list, 'mouseout', this.onMouseLeave);
        }
    };
    DropDownList.prototype.checkSelector = function (id) {
        return '[id="' + id.replace(/(:|\.|\[|\]|,|=|@|\\|\/|#)/g, '\\$1') + '"]';
    };
    DropDownList.prototype.onDocumentClick = function (e) {
        var target = e.target;
        if (!(!isNullOrUndefined(this.popupObj) && closest(target, this.checkSelector(this.popupObj.element.id))) &&
            !isNullOrUndefined(this.inputWrapper) && !this.inputWrapper.container.contains(e.target)) {
            if (this.inputWrapper.container.classList.contains(dropDownListClasses.inputFocus) || this.isPopupOpen) {
                this.isDocumentClick = true;
                var isActive = this.isRequested;
                if (this.getModuleName() === 'combobox' && this.isTyped) {
                    this.isInteracted = false;
                }
                this.hidePopup(e);
                this.isInteracted = false;
                if (!isActive) {
                    this.onFocusOut(e);
                    this.inputWrapper.container.classList.remove(dropDownListClasses.inputFocus);
                }
            }
        }
        else if (target !== this.inputElement && !(this.allowFiltering && target === this.filterInput)
            && !(this.getModuleName() === 'combobox' &&
                !this.allowFiltering && Browser.isDevice && target === this.inputWrapper.buttons[0])) {
            this.isPreventBlur = (Browser.isIE || Browser.info.name === 'edge') && (document.activeElement === this.targetElement() ||
                document.activeElement === this.filterInput);
            e.preventDefault();
        }
    };
    DropDownList.prototype.activeStateChange = function () {
        if (this.isDocumentClick) {
            this.hidePopup();
            this.onFocusOut();
            this.inputWrapper.container.classList.remove(dropDownListClasses.inputFocus);
        }
    };
    DropDownList.prototype.focusDropDown = function (e) {
        if (!this.initial && this.isFilterLayout()) {
            this.focusIn(e);
        }
    };
    DropDownList.prototype.dropDownClick = function (e) {
        if (e.which === 3 || e.button === 2) {
            return;
        }
        this.keyboardEvent = null;
        if (this.targetElement().classList.contains(dropDownListClasses.disable) || this.inputWrapper.clearButton === e.target) {
            return;
        }
        var target = e.target;
        if (target !== this.inputElement && !(this.allowFiltering && target === this.filterInput) && this.getModuleName() !== 'combobox') {
            e.preventDefault();
        }
        if (!this.readonly) {
            if (this.isPopupOpen) {
                this.hidePopup(e);
                if (this.isFilterLayout()) {
                    this.focusDropDown(e);
                }
            }
            else {
                this.focusIn(e);
                this.floatLabelChange();
                this.queryString = this.inputElement.value.trim() === '' ? null : this.inputElement.value;
                this.isDropDownClick = true;
                this.showPopup(e);
            }
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var proxy_1 = this;
            // eslint-disable-next-line max-len
            var duration = (this.element.tagName === this.getNgDirective() && this.itemTemplate) ? 500 : 100;
            if (!this.isSecondClick) {
                setTimeout(function () {
                    proxy_1.cloneElements();
                    proxy_1.isSecondClick = true;
                    proxy_1.isSecondClick = proxy_1.isReact && proxy_1.isFiltering() && proxy_1.dataSource instanceof DataManager && !proxy_1.list.querySelector('ul') ? false : true;
                }, duration);
            }
        }
        else {
            this.focusIn(e);
        }
    };
    DropDownList.prototype.cloneElements = function () {
        if (this.list) {
            var ulElement = this.list.querySelector('ul');
            if (ulElement) {
                ulElement = ulElement.cloneNode ? ulElement.cloneNode(true) : ulElement;
                this.actionCompleteData.ulElement = ulElement;
            }
        }
    };
    DropDownList.prototype.updateSelectedItem = function (li, e, preventSelect, isSelection) {
        var _this = this;
        this.removeSelection();
        li.classList.add(dropDownBaseClasses.selected);
        this.removeHover();
        var value = li.getAttribute('data-value') !== null ?
            this.getFormattedValue(li.getAttribute('data-value')) : null;
        var selectedData = this.getDataByValue(value);
        if (!this.initial && !preventSelect && !isNullOrUndefined(e)) {
            var items = this.detachChanges(selectedData);
            this.isSelected = true;
            var eventArgs = {
                e: e,
                item: li,
                itemData: items,
                isInteracted: e ? true : false,
                cancel: false
            };
            this.trigger('select', eventArgs, function (eventArgs) {
                if (eventArgs.cancel) {
                    li.classList.remove(dropDownBaseClasses.selected);
                }
                else {
                    _this.selectEventCallback(li, e, preventSelect, selectedData, value);
                    if (isSelection) {
                        _this.setSelectOptions(li, e);
                    }
                }
            });
        }
        else {
            this.selectEventCallback(li, e, preventSelect, selectedData, value);
            if (isSelection) {
                this.setSelectOptions(li, e);
            }
        }
    };
    DropDownList.prototype.selectEventCallback = function (li, e, preventSelect, selectedData, value) {
        this.previousItemData = (!isNullOrUndefined(this.itemData)) ? this.itemData : null;
        if (this.itemData !== selectedData) {
            this.previousValue = (!isNullOrUndefined(this.itemData)) ? typeof this.itemData == 'object' &&
                !this.allowObjectBinding ? this.checkFieldValue(this.itemData, this.fields.value.split('.')) : this.itemData : null;
        }
        this.item = li;
        this.itemData = selectedData;
        var focusedItem = this.list.querySelector('.' + dropDownBaseClasses.focus);
        if (focusedItem) {
            removeClass([focusedItem], dropDownBaseClasses.focus);
        }
        li.setAttribute('aria-selected', 'true');
        if (isNullOrUndefined(value)) {
            value = 'null';
        }
        if (this.allowFiltering && !this.enableVirtualization && this.getModuleName() !== 'autocomplete') {
            var filterIndex = this.getIndexByValueFilter(value, this.actionCompleteData.ulElement);
            if (!isNullOrUndefined(filterIndex)) {
                this.activeIndex = filterIndex;
            }
            else {
                this.activeIndex = this.getIndexByValue(value);
            }
        }
        else {
            if (this.enableVirtualization && this.activeIndex == null && this.dataSource instanceof DataManager) {
                this.UpdateSkeleton();
                this.liCollections = this.list.querySelectorAll('.' + dropDownBaseClasses.li);
                this.ulElement = this.list.querySelector('ul');
            }
            this.activeIndex = this.getIndexByValue(value);
        }
    };
    DropDownList.prototype.activeItem = function (li) {
        if (this.isValidLI(li) && !li.classList.contains(dropDownBaseClasses.selected)) {
            this.removeSelection();
            li.classList.add(dropDownBaseClasses.selected);
            this.removeHover();
            li.setAttribute('aria-selected', 'true');
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DropDownList.prototype.setValue = function (e) {
        var dataItem = this.getItemData();
        this.isTouched = !isNullOrUndefined(e);
        if (dataItem.value === null) {
            Input.setValue(null, this.inputElement, this.floatLabelType, this.showClearButton);
        }
        else {
            Input.setValue(dataItem.text, this.inputElement, this.floatLabelType, this.showClearButton);
        }
        if (this.valueTemplate && this.itemData !== null) {
            this.setValueTemplate();
        }
        else if (!isNullOrUndefined(this.valueTempElement) && this.inputElement.previousSibling === this.valueTempElement) {
            detach(this.valueTempElement);
            this.inputElement.style.display = 'block';
        }
        if (!isNullOrUndefined(dataItem.value) && !this.enableVirtualization && this.allowFiltering) {
            this.activeIndex = this.getIndexByValueFilter(dataItem.value, this.actionCompleteData.ulElement);
        }
        var clearIcon = dropDownListClasses.clearIcon;
        var isFilterElement = this.isFiltering() && this.filterInput && (this.getModuleName() === 'combobox');
        var clearElement = isFilterElement && this.filterInput.parentElement.querySelector('.' + clearIcon);
        if (this.isFiltering() && clearElement) {
            clearElement.style.removeProperty('visibility');
        }
        if ((!this.allowObjectBinding && (this.previousValue === dataItem.value)) || (this.allowObjectBinding &&
            (this.previousValue != null && this.isObjectInArray(this.previousValue, [this.allowCustom &&
                    this.isObjectCustomValue ? this.value ? this.value : dataItem : dataItem.value ?
                    this.getDataByValue(dataItem.value) : dataItem])))) {
            this.isSelected = false;
            return true;
        }
        else {
            this.isSelected = !this.initial ? true : false;
            this.isSelectCustom = false;
            if (this.getModuleName() === 'dropdownlist') {
                this.updateIconState();
            }
            return false;
        }
    };
    DropDownList.prototype.setSelection = function (li, e) {
        if (this.isValidLI(li) && (!li.classList.contains(dropDownBaseClasses.selected) || (this.isPopupOpen && this.isSelected
            && li.classList.contains(dropDownBaseClasses.selected)))) {
            this.updateSelectedItem(li, e, false, true);
        }
        else {
            this.setSelectOptions(li, e);
            if (this.enableVirtualization && this.value) {
                var fields = !this.isPrimitiveData ? this.fields.value : '';
                var currentValue = this.allowObjectBinding && !isNullOrUndefined(this.value) ?
                    getValue((this.fields.value) ? this.fields.value : '', this.value) : this.value;
                if (this.dataSource instanceof DataManager) {
                    var getItem = new DataManager(this.virtualGroupDataSource).executeLocal(new Query().where(new Predicate(fields, 'equal', currentValue)));
                    if (getItem && getItem.length > 0) {
                        this.itemData = getItem[0];
                        var dataItem = this.getItemData();
                        var value = this.allowObjectBinding ?
                            this.getDataByValue(dataItem.value) : dataItem.value;
                        if ((this.value === dataItem.value && this.text !== dataItem.text) ||
                            (this.value !== dataItem.value && this.text === dataItem.text)) {
                            this.setProperties({ 'text': dataItem.text ? dataItem.text.toString() : dataItem.text, 'value': value });
                        }
                    }
                }
                else {
                    var getItem = new DataManager(this.dataSource).executeLocal(new Query().where(new Predicate(fields, 'equal', currentValue)));
                    if (getItem && getItem.length > 0) {
                        this.itemData = getItem[0];
                        var dataItem = this.getItemData();
                        var value = this.allowObjectBinding ?
                            this.getDataByValue(dataItem.value) : dataItem.value;
                        if ((this.value === dataItem.value && this.text !== dataItem.text) ||
                            (this.value !== dataItem.value && this.text === dataItem.text)) {
                            this.setProperties({ 'text': dataItem.text ? dataItem.text.toString() : dataItem.text, 'value': value });
                        }
                    }
                }
            }
        }
    };
    DropDownList.prototype.setSelectOptions = function (li, e) {
        if (this.list) {
            this.removeHover();
        }
        this.previousSelectedLI = (!isNullOrUndefined(this.selectedLI)) ? this.selectedLI : null;
        this.selectedLI = li;
        if (this.setValue(e)) {
            return;
        }
        if ((!this.isPopupOpen && !isNullOrUndefined(li)) || (this.isPopupOpen && !isNullOrUndefined(e) &&
            (e.type !== 'keydown' || e.type === 'keydown' && e.action === 'enter'))) {
            this.isSelectCustom = false;
            this.onChangeEvent(e);
        }
        if (this.isPopupOpen && !isNullOrUndefined(this.selectedLI) && this.itemData !== null && (!e || e.type !== 'click')) {
            this.setScrollPosition(e);
        }
        if (Browser.info.name !== 'mozilla') {
            if (this.targetElement()) {
                attributes(this.targetElement(), { 'aria-describedby': this.inputElement.id !== '' ? this.inputElement.id : this.element.id });
                this.targetElement().removeAttribute('aria-live');
            }
        }
        if (this.isPopupOpen && !isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName('e-item-focus')[0])) {
            attributes(this.targetElement(), { 'aria-activedescendant': this.ulElement.getElementsByClassName('e-item-focus')[0].id });
        }
        else if (this.isPopupOpen && !isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName('e-active')[0])) {
            attributes(this.targetElement(), { 'aria-activedescendant': this.ulElement.getElementsByClassName('e-active')[0].id });
        }
    };
    DropDownList.prototype.dropdownCompiler = function (dropdownTemplate) {
        var checkTemplate = false;
        if (typeof dropdownTemplate !== 'function' && dropdownTemplate) {
            try {
                checkTemplate = (document.querySelectorAll(dropdownTemplate).length) ? true : false;
            }
            catch (exception) {
                checkTemplate = false;
            }
        }
        return checkTemplate;
    };
    DropDownList.prototype.setValueTemplate = function () {
        var compiledString;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.clearTemplate(['valueTemplate']);
            if (this.valueTempElement) {
                detach(this.valueTempElement);
                this.inputElement.style.display = 'block';
                this.valueTempElement = null;
            }
        }
        if (!this.valueTempElement) {
            this.valueTempElement = this.createElement('span', { className: dropDownListClasses.value });
            this.inputElement.parentElement.insertBefore(this.valueTempElement, this.inputElement);
            this.inputElement.style.display = 'none';
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!this.isReact) {
            this.valueTempElement.innerHTML = '';
        }
        var valuecheck = this.dropdownCompiler(this.valueTemplate);
        if (typeof this.valueTemplate !== 'function' && valuecheck) {
            compiledString = compile(document.querySelector(this.valueTemplate).innerHTML.trim());
        }
        else {
            compiledString = compile(this.valueTemplate);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var valueCompTemp = compiledString(this.itemData, this, 'valueTemplate', this.valueTemplateId, this.isStringTemplate, null, this.valueTempElement);
        if (valueCompTemp && valueCompTemp.length > 0) {
            append(valueCompTemp, this.valueTempElement);
        }
        this.renderReactTemplates();
    };
    DropDownList.prototype.removeSelection = function () {
        if (this.list) {
            var selectedItems = this.list.querySelectorAll('.' + dropDownBaseClasses.selected);
            if (selectedItems.length) {
                removeClass(selectedItems, dropDownBaseClasses.selected);
                selectedItems[0].removeAttribute('aria-selected');
            }
        }
    };
    DropDownList.prototype.getItemData = function () {
        var fields = this.fields;
        var dataItem = null;
        dataItem = this.itemData;
        var dataValue;
        var dataText;
        if (!isNullOrUndefined(dataItem)) {
            dataValue = getValue(fields.value, dataItem);
            dataText = getValue(fields.text, dataItem);
        }
        var value = (!isNullOrUndefined(dataItem) &&
            !isUndefined(dataValue) ? dataValue : dataItem);
        var text = (!isNullOrUndefined(dataItem) &&
            !isUndefined(dataValue) ? dataText : dataItem);
        return { value: value, text: text };
    };
    /**
     * To trigger the change event for list.
     *
     * @param {MouseEvent | KeyboardEvent | TouchEvent} eve - Specifies the event arguments.
     * @param {boolean} isCustomValue - Specifies whether the value is custom value or not.
     * @returns {void}
     */
    DropDownList.prototype.onChangeEvent = function (eve, isCustomValue) {
        var _this = this;
        var dataItem = this.getItemData();
        var index = this.isSelectCustom ? null : this.activeIndex;
        if (this.enableVirtualization) {
            var datas = this.dataSource instanceof DataManager ? this.virtualGroupDataSource : this.dataSource;
            if (dataItem.value && datas && datas.length > 0) {
                var foundIndex = datas.findIndex(function (data) {
                    return !isNullOrUndefined(dataItem.value) && getValue(_this.fields.value, data) === dataItem.value;
                });
                if (foundIndex !== -1) {
                    index = foundIndex;
                }
            }
        }
        var value = this.allowObjectBinding ? isCustomValue ?
            this.value : this.getDataByValue(dataItem.value) : dataItem.value;
        this.setProperties({ 'index': index, 'text': dataItem.text ? dataItem.text.toString() : dataItem.text, 'value': value }, true);
        this.detachChangeEvent(eve);
    };
    DropDownList.prototype.detachChanges = function (value) {
        var items;
        if (typeof value === 'string' ||
            typeof value === 'boolean' ||
            typeof value === 'number') {
            items = Object.defineProperties({}, {
                value: {
                    value: value,
                    enumerable: true
                },
                text: {
                    value: value,
                    enumerable: true
                }
            });
        }
        else {
            items = value;
        }
        return items;
    };
    DropDownList.prototype.detachChangeEvent = function (eve) {
        this.isSelected = false;
        this.previousValue = this.value;
        this.activeIndex = this.enableVirtualization ? this.getIndexByValue(this.value) : this.index;
        this.typedString = !isNullOrUndefined(this.text) ? this.text : '';
        if (!this.initial) {
            var items = this.detachChanges(this.itemData);
            var preItems = void 0;
            if (typeof this.previousItemData === 'string' ||
                typeof this.previousItemData === 'boolean' ||
                typeof this.previousItemData === 'number') {
                preItems = Object.defineProperties({}, {
                    value: {
                        value: this.previousItemData,
                        enumerable: true
                    },
                    text: {
                        value: this.previousItemData,
                        enumerable: true
                    }
                });
            }
            else {
                preItems = this.previousItemData;
            }
            this.setHiddenValue();
            var eventArgs = {
                e: eve,
                item: this.item,
                itemData: items,
                previousItem: this.previousSelectedLI,
                previousItemData: preItems,
                isInteracted: eve ? true : false,
                value: this.value,
                element: this.element,
                event: eve
            };
            if (this.isAngular && this.preventChange) {
                this.preventChange = false;
            }
            else {
                this.trigger('change', eventArgs);
            }
        }
        if ((isNullOrUndefined(this.value) || this.value === '') && this.floatLabelType !== 'Always') {
            removeClass([this.inputWrapper.container], 'e-valid-input');
        }
    };
    DropDownList.prototype.setHiddenValue = function () {
        if (!isNullOrUndefined(this.value)) {
            var value = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue((this.fields.value) ? this.fields.value : '', this.value) : this.value;
            if (this.hiddenElement.querySelector('option')) {
                var selectedElement = this.hiddenElement.querySelector('option');
                selectedElement.textContent = this.text;
                selectedElement.setAttribute('value', value.toString());
            }
            else {
                if (!isNullOrUndefined(this.hiddenElement)) {
                    var option = document.createElement('option');
                    option.text = this.text;
                    option.setAttribute('selected', '');
                    this.hiddenElement.appendChild(option);
                    var selectedElement = this.hiddenElement.querySelector('option');
                    selectedElement.setAttribute('value', value.toString());
                }
            }
        }
        else {
            this.hiddenElement.innerHTML = '';
        }
    };
    /**
     * Filter bar implementation
     *
     * @param {KeyboardEventArgs} e - Specifies the event arguments.
     * @returns {void}
     */
    DropDownList.prototype.onFilterUp = function (e) {
        if (!(e.ctrlKey && e.keyCode === 86) && (this.isValidKey || e.keyCode === 40 || e.keyCode === 38)) {
            this.isValidKey = false;
            this.filterArgs = e;
            this.firstItem = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : null;
            switch (e.keyCode) {
                case 38: //up arrow
                case 40: //down arrow
                    if (this.getModuleName() === 'autocomplete' && !this.isPopupOpen && !this.preventAltUp && !this.isRequested) {
                        this.preventAutoFill = true;
                        this.searchLists(e);
                    }
                    else {
                        this.preventAutoFill = false;
                    }
                    this.preventAltUp = false;
                    if (this.getModuleName() === 'autocomplete' && !isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName('e-item-focus')[0])) {
                        attributes(this.targetElement(), { 'aria-activedescendant': this.ulElement.getElementsByClassName('e-item-focus')[0].id });
                    }
                    e.preventDefault();
                    break;
                case 46: //delete
                case 8: //backspace
                    this.typedString = this.filterInput.value;
                    if (!this.isPopupOpen && this.typedString !== '' || this.isPopupOpen && this.queryString.length > 0) {
                        this.preventAutoFill = true;
                        this.searchLists(e);
                    }
                    else if (this.typedString === '' && this.queryString === '' && this.getModuleName() !== 'autocomplete') {
                        this.preventAutoFill = true;
                        this.searchLists(e);
                    }
                    else if (this.typedString === '') {
                        if (this.list) {
                            this.resetFocusElement();
                        }
                        this.activeIndex = null;
                        if (this.getModuleName() !== 'dropdownlist') {
                            this.preventAutoFill = true;
                            this.searchLists(e);
                            if (this.getModuleName() === 'autocomplete') {
                                this.hidePopup();
                            }
                        }
                    }
                    e.preventDefault();
                    break;
                default:
                    if (this.isFiltering() && this.getModuleName() === 'combobox' && isNullOrUndefined(this.list)) {
                        this.getInitialData = true;
                        this.renderList();
                        if (!this.isSecondClick && !this.isDropDownClick) {
                            this.executeCloneElements();
                        }
                    }
                    this.typedString = this.filterInput.value;
                    this.preventAutoFill = false;
                    if (!this.getInitialData) {
                        this.searchLists(e);
                    }
                    if ((this.enableVirtualization && this.getModuleName() !== 'autocomplete') || (this.getModuleName() === 'autocomplete' && !(this.dataSource instanceof DataManager)) || (this.getModuleName() === 'autocomplete' && (this.dataSource instanceof DataManager) && this.totalItemCount !== 0)) {
                        this.getFilteringSkeletonCount();
                    }
                    break;
            }
        }
        else {
            this.isValidKey = false;
        }
    };
    DropDownList.prototype.onFilterDown = function (e) {
        switch (e.keyCode) {
            case 13: //enter
                break;
            case 40: //down arrow
            case 38: //up arrow
                this.queryString = this.filterInput.value;
                e.preventDefault();
                break;
            case 9: //tab
                if (this.isPopupOpen && this.getModuleName() !== 'autocomplete') {
                    e.preventDefault();
                }
                break;
            default:
                this.prevSelectPoints = this.getSelectionPoints();
                this.queryString = this.filterInput.value;
                break;
        }
    };
    DropDownList.prototype.removeFillSelection = function () {
        if (this.isInteracted) {
            var selection = this.getSelectionPoints();
            this.inputElement.setSelectionRange(selection.end, selection.end);
        }
    };
    DropDownList.prototype.getQuery = function (query) {
        var filterQuery;
        if (!this.isCustomFilter && this.allowFiltering && this.filterInput) {
            filterQuery = query ? query.clone() : this.query ? this.query.clone() : new Query();
            var filterType = this.typedString === '' ? 'contains' : this.filterType;
            var dataType = this.typeOfData(this.dataSource).typeof;
            if (!(this.dataSource instanceof DataManager) && dataType === 'string' || dataType === 'number') {
                filterQuery.where('', filterType, this.typedString, this.ignoreCase, this.ignoreAccent);
            }
            else if (((this.getModuleName() !== 'combobox')) || (this.isFiltering() && this.getModuleName() === 'combobox' && this.typedString !== '')) {
                var fields = (this.fields.text) ? this.fields.text : '';
                filterQuery.where(fields, filterType, this.typedString, this.ignoreCase, this.ignoreAccent);
            }
        }
        else {
            filterQuery = (this.enableVirtualization && !isNullOrUndefined(this.customFilterQuery)) ?
                this.customFilterQuery.clone() : query ? query.clone() : this.query ? this.query.clone() : new Query();
        }
        if (this.enableVirtualization && this.viewPortInfo.endIndex !== 0) {
            var takeValue = this.getTakeValue();
            var alreadySkipAdded = false;
            if (filterQuery) {
                for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
                    if (filterQuery.queries[queryElements].fn === 'onSkip') {
                        alreadySkipAdded = true;
                        break;
                    }
                }
            }
            var queryTakeValue = 0;
            var querySkipValue = 0;
            if (filterQuery && filterQuery.queries.length > 0) {
                for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
                    if (filterQuery.queries[queryElements].fn === 'onSkip') {
                        querySkipValue = filterQuery.queries[queryElements].e.nos;
                    }
                    if (filterQuery.queries[queryElements].fn === 'onTake') {
                        queryTakeValue = takeValue <= filterQuery.queries[queryElements].e.nos ?
                            filterQuery.queries[queryElements].e.nos : takeValue;
                    }
                }
            }
            if (queryTakeValue <= 0 && this.query && this.query.queries.length > 0) {
                for (var queryElements = 0; queryElements < this.query.queries.length; queryElements++) {
                    if (this.query.queries[queryElements].fn === 'onTake') {
                        queryTakeValue = takeValue <= this.query.queries[queryElements].e.nos ?
                            this.query.queries[queryElements].e.nos : takeValue;
                    }
                }
            }
            var skipExists = false;
            if (filterQuery && filterQuery.queries.length > 0) {
                for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
                    if (filterQuery.queries[queryElements].fn === 'onSkip') {
                        querySkipValue = filterQuery.queries[queryElements].e.nos;
                        filterQuery.queries.splice(queryElements, 1);
                        alreadySkipAdded = false;
                        --queryElements;
                        continue;
                    }
                    if (filterQuery.queries[queryElements].fn === 'onTake') {
                        queryTakeValue = filterQuery.queries[queryElements].e.nos <= queryTakeValue ?
                            queryTakeValue : filterQuery.queries[queryElements].e.nos;
                        filterQuery.queries.splice(queryElements, 1);
                        --queryElements;
                    }
                }
            }
            if (!skipExists && (this.allowFiltering || !this.isPopupOpen || !alreadySkipAdded)) {
                if (querySkipValue > 0) {
                    filterQuery.skip(querySkipValue);
                }
                else {
                    filterQuery.skip(this.virtualItemStartIndex);
                }
            }
            if (this.isIncrementalRequest) {
                filterQuery.take(this.incrementalEndIndex);
            }
            else {
                if (queryTakeValue > 0) {
                    filterQuery.take(queryTakeValue);
                }
                else {
                    filterQuery.take(takeValue);
                }
            }
            filterQuery.requiresCount();
        }
        return filterQuery;
    };
    DropDownList.prototype.getSelectionPoints = function () {
        var input = this.inputElement;
        return { start: Math.abs(input.selectionStart), end: Math.abs(input.selectionEnd) };
    };
    DropDownList.prototype.searchLists = function (e) {
        var _this = this;
        this.isTyped = true;
        this.activeIndex = null;
        this.isListSearched = true;
        if (this.filterInput.parentElement.querySelector('.' + dropDownListClasses.clearIcon)) {
            var clearElement = this.filterInput.parentElement.querySelector('.' + dropDownListClasses.clearIcon);
            clearElement.style.visibility = this.filterInput.value === '' ? 'hidden' : 'visible';
        }
        this.isDataFetched = false;
        if (this.isFiltering()) {
            this.checkAndResetCache();
            this.isRequesting = false;
            var eventArgs_1 = {
                preventDefaultAction: false,
                text: this.filterInput.value,
                updateData: function (dataSource, query, fields) {
                    if (eventArgs_1.cancel) {
                        return;
                    }
                    _this.isCustomFilter = true;
                    _this.customFilterQuery = query ? query.clone() : query;
                    _this.filteringAction(dataSource, query, fields);
                },
                baseEventArgs: e,
                cancel: false
            };
            this.trigger('filtering', eventArgs_1, function (eventArgs) {
                if (!eventArgs.cancel && !_this.isCustomFilter && !eventArgs.preventDefaultAction) {
                    _this.filteringAction(_this.dataSource, null, _this.fields);
                }
            });
        }
    };
    /**
     * To filter the data from given data source by using query
     *
     * @param {Object[] | DataManager } dataSource - Set the data source to filter.
     * @param {Query} query - Specify the query to filter the data.
     * @param {FieldSettingsModel} fields - Specify the fields to map the column in the data table.
     * @returns {void}
     * @deprecated
     */
    DropDownList.prototype.filter = function (dataSource, query, fields) {
        this.isCustomFilter = true;
        this.filteringAction(dataSource, query, fields);
    };
    DropDownList.prototype.filteringAction = function (dataSource, query, fields) {
        if (!isNullOrUndefined(this.filterInput)) {
            this.beforePopupOpen = ((!this.isPopupOpen && this.getModuleName() === 'combobox' && this.filterInput.value === '') ||
                this.getInitialData) ? false : true;
            var isNoData = this.list.classList.contains(dropDownBaseClasses.noData);
            if (this.filterInput.value.trim() === '' && !this.itemTemplate) {
                this.actionCompleteData.isUpdated = false;
                this.isTyped = false;
                if (!isNullOrUndefined(this.actionCompleteData.ulElement) && !isNullOrUndefined(this.actionCompleteData.list)) {
                    if (this.enableVirtualization) {
                        if (this.isFiltering()) {
                            this.isPreventScrollAction = true;
                            this.list.scrollTop = 0;
                            this.previousStartIndex = 0;
                            this.virtualListInfo = null;
                        }
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this.totalItemCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
                        this.resetList(dataSource, fields, query);
                        if (isNoData && !this.list.classList.contains(dropDownBaseClasses.noData)) {
                            if (!this.list.querySelector('.e-virtual-ddl-content')) {
                                var virtualContentElement = this.createElement('div', {
                                    className: 'e-virtual-ddl-content'
                                });
                                virtualContentElement.style.cssText = this.getTransformValues();
                                this.list.appendChild(virtualContentElement).appendChild(this.list.querySelector('.e-list-parent'));
                            }
                            if (!this.list.querySelector('.e-virtual-ddl')) {
                                var virtualElement = this.createElement('div', {
                                    id: this.element.id + '_popup',
                                    className: 'e-virtual-ddl'
                                });
                                virtualElement.style.cssText = this.GetVirtualTrackHeight();
                                this.list.parentElement.querySelector('.e-dropdownbase').appendChild(virtualElement);
                            }
                        }
                    }
                    this.onActionComplete(this.actionCompleteData.ulElement, this.actionCompleteData.list);
                }
                this.isTyped = true;
                if (!isNullOrUndefined(this.itemData) && this.getModuleName() === 'dropdownlist') {
                    this.focusIndexItem();
                    this.setScrollPosition();
                }
                this.isNotSearchList = true;
            }
            else {
                this.isNotSearchList = false;
                query = (this.filterInput.value.trim() === '') ? null : query;
                if (this.enableVirtualization && this.isFiltering() && this.isTyped) {
                    this.isPreventScrollAction = true;
                    this.list.scrollTop = 0;
                    this.previousStartIndex = 0;
                    this.virtualListInfo = null;
                }
                this.resetList(dataSource, fields, query);
                if (this.getModuleName() === 'dropdownlist' && this.list.classList.contains(dropDownBaseClasses.noData)) {
                    this.popupContentElement.setAttribute('role', 'status');
                    this.popupContentElement.setAttribute('id', 'no-record');
                    attributes(this.filterInputObj.container, { 'aria-activedescendant': 'no-record' });
                }
                if (this.enableVirtualization && isNoData && !this.list.classList.contains(dropDownBaseClasses.noData)) {
                    if (!this.list.querySelector('.e-virtual-ddl-content')) {
                        var virtualContentElement = this.createElement('div', {
                            className: 'e-virtual-ddl-content'
                        });
                        virtualContentElement.style.cssText = this.getTransformValues();
                        this.list.appendChild(virtualContentElement).appendChild(this.list.querySelector('.e-list-parent'));
                    }
                    if (!this.list.querySelector('.e-virtual-ddl')) {
                        var virtualElement = this.createElement('div', {
                            id: this.element.id + '_popup',
                            className: 'e-virtual-ddl'
                        });
                        virtualElement.style.cssText = this.GetVirtualTrackHeight();
                        this.list.parentElement.querySelector('.e-dropdownbase').appendChild(virtualElement);
                    }
                }
            }
            if (this.enableVirtualization) {
                this.getFilteringSkeletonCount();
            }
            this.renderReactTemplates();
            if (this.filterInput && this.filterInput.value === '' && this.getModuleName() === 'combobox') {
                this.executeCloneElements();
            }
        }
    };
    DropDownList.prototype.setSearchBox = function (popupElement) {
        if (this.isFiltering()) {
            var parentElement = popupElement.querySelector('.' + dropDownListClasses.filterParent) ?
                popupElement.querySelector('.' + dropDownListClasses.filterParent) : this.createElement('span', {
                className: dropDownListClasses.filterParent
            });
            this.filterInput = this.createElement('input', {
                attrs: { type: 'text' },
                className: dropDownListClasses.filterInput
            });
            this.element.parentNode.insertBefore(this.filterInput, this.element);
            var backIcon = false;
            if (Browser.isDevice && this.isDeviceFullScreen) {
                backIcon = true;
            }
            this.filterInputObj = Input.createInput({
                element: this.filterInput,
                buttons: backIcon ?
                    [dropDownListClasses.backIcon, dropDownListClasses.filterBarClearIcon] : [dropDownListClasses.filterBarClearIcon],
                properties: { placeholder: this.filterBarPlaceholder }
            }, this.createElement);
            if (!isNullOrUndefined(this.cssClass)) {
                if (this.cssClass.split(' ').indexOf('e-outline') !== -1) {
                    addClass([this.filterInputObj.container], 'e-outline');
                }
                else if (this.cssClass.split(' ').indexOf('e-filled') !== -1) {
                    addClass([this.filterInputObj.container], 'e-filled');
                }
            }
            append([this.filterInputObj.container], parentElement);
            prepend([parentElement], popupElement);
            attributes(this.filterInput, {
                'aria-disabled': 'false',
                'role': 'combobox',
                'autocomplete': 'off',
                'autocapitalize': 'off',
                'spellcheck': 'false'
            });
            this.clearIconElement = this.filterInput.parentElement.querySelector('.' + dropDownListClasses.clearIcon);
            if (!Browser.isDevice && this.clearIconElement) {
                EventHandler.add(this.clearIconElement, 'click', this.clearText, this);
                this.clearIconElement.style.visibility = 'hidden';
            }
            if (!Browser.isDevice) {
                this.searchKeyModule = new KeyboardEvents(this.filterInput, {
                    keyAction: this.keyActionHandler.bind(this),
                    keyConfigs: this.keyConfigure,
                    eventName: 'keydown'
                });
            }
            else {
                this.searchKeyModule = new KeyboardEvents(this.filterInput, {
                    keyAction: this.mobileKeyActionHandler.bind(this),
                    keyConfigs: this.keyConfigure,
                    eventName: 'keydown'
                });
            }
            EventHandler.add(this.filterInput, 'input', this.onInput, this);
            EventHandler.add(this.filterInput, 'keyup', this.onFilterUp, this);
            EventHandler.add(this.filterInput, 'keydown', this.onFilterDown, this);
            EventHandler.add(this.filterInput, 'blur', this.onBlurHandler, this);
            EventHandler.add(this.filterInput, 'paste', this.pasteHandler, this);
            return this.filterInputObj;
        }
        else {
            return inputObject;
        }
    };
    DropDownList.prototype.onInput = function (e) {
        if (!isNullOrUndefined(e) && !isNullOrUndefined(e.data) && e.data.length > 1 && this.autoFill && (this.getModuleName() === 'combobox' || this.getModuleName() === 'autocomplete')) {
            this.inputElement.value = e.data;
        }
        this.isValidKey = true;
        if (this.getModuleName() === 'combobox') {
            this.updateIconState();
        }
        // For filtering works in mobile firefox.
        if (Browser.isDevice && Browser.info.name === 'mozilla') {
            this.typedString = this.filterInput.value;
            this.preventAutoFill = true;
            this.searchLists(e);
        }
    };
    DropDownList.prototype.pasteHandler = function (e) {
        var _this = this;
        setTimeout(function () {
            _this.typedString = _this.filterInput.value;
            if (_this.getModuleName() === 'combobox' && _this.isFiltering() && isNullOrUndefined(_this.list)) {
                _this.renderList();
            }
            _this.searchLists(e);
        });
    };
    DropDownList.prototype.onActionFailure = function (e) {
        _super.prototype.onActionFailure.call(this, e);
        if (this.beforePopupOpen) {
            this.renderPopup();
        }
    };
    DropDownList.prototype.getTakeValue = function () {
        return this.allowFiltering && this.getModuleName() === 'dropdownlist' && Browser.isDevice ? Math.round(window.outerHeight / this.listItemHeight) : this.itemCount;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DropDownList.prototype.onActionComplete = function (ulElement, list, e, isUpdated) {
        var _this = this;
        if (this.dataSource instanceof DataManager && !isNullOrUndefined(e) && !this.virtualGroupDataSource) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.totalItemCount = e.count;
        }
        if (this.isNotSearchList && !this.enableVirtualization) {
            this.isNotSearchList = false;
            return;
        }
        if (this.getInitialData) {
            this.updateActionCompleteDataValues(ulElement, list);
            this.getInitialData = false;
            this.isReactTemplateUpdate = true;
            this.searchLists(this.filterArgs);
            return;
        }
        var tempItemCount = this.itemCount;
        if (this.isActive || !isNullOrUndefined(ulElement)) {
            var selectedItem = this.selectedLI ? this.selectedLI.cloneNode(true) : null;
            _super.prototype.onActionComplete.call(this, ulElement, list, e);
            this.skeletonCount = this.totalItemCount !== 0 && this.totalItemCount < (this.itemCount * 2) &&
                ((!(this.dataSource instanceof DataManager)) ||
                    ((this.dataSource instanceof DataManager) && (this.totalItemCount <= this.itemCount))) ? 0 : this.skeletonCount;
            this.updateSelectElementData(this.allowFiltering);
            if (this.isRequested && !isNullOrUndefined(this.searchKeyEvent) && this.searchKeyEvent.type === 'keydown') {
                this.isRequested = false;
                this.keyActionHandler(this.searchKeyEvent);
                this.searchKeyEvent = null;
            }
            if (this.isRequested && !isNullOrUndefined(this.searchKeyEvent)) {
                this.incrementalSearch(this.searchKeyEvent);
                this.searchKeyEvent = null;
            }
            if (!this.enableVirtualization) {
                this.list.scrollTop = 0;
            }
            if (!isNullOrUndefined(ulElement)) {
                attributes(ulElement, { 'id': this.element.id + '_options', 'role': 'listbox', 'aria-hidden': 'false', 'aria-label': 'listbox' });
            }
            if (this.initialRemoteRender) {
                this.initial = true;
                this.activeIndex = this.index;
                this.initialRemoteRender = false;
                if (this.value && this.dataSource instanceof DataManager) {
                    var checkField_1 = isNullOrUndefined(this.fields.value) ? this.fields.text : this.fields.value;
                    var value_1 = this.allowObjectBinding && !isNullOrUndefined(this.value) ?
                        getValue(checkField_1, this.value) : this.value;
                    var fieldValue_1 = this.fields.value.split('.');
                    var checkVal = list.some(function (x) {
                        return isNullOrUndefined(x[checkField_1]) && fieldValue_1.length > 1 ?
                            _this.checkFieldValue(x, fieldValue_1) === value_1 : x[checkField_1] === value_1;
                    });
                    if (this.enableVirtualization && this.virtualGroupDataSource) {
                        checkVal = this.virtualGroupDataSource.some(function (x) {
                            return isNullOrUndefined(x[checkField_1]) && fieldValue_1.length > 1 ?
                                _this.checkFieldValue(x, fieldValue_1) === value_1 : x[checkField_1] === value_1;
                        });
                    }
                    if (!checkVal) {
                        this.dataSource.executeQuery(this.getQuery(this.query).where(new Predicate(checkField_1, 'equal', value_1)))
                            .then(function (e) {
                            if (e.result.length > 0) {
                                _this.addItem(e.result, list.length);
                                _this.updateValues();
                            }
                            else {
                                _this.updateValues();
                            }
                        });
                    }
                    else {
                        this.updateValues();
                    }
                }
                else {
                    this.updateValues();
                }
                this.initial = false;
            }
            else if (this.getModuleName() === 'autocomplete' && this.value) {
                this.setInputValue();
            }
            if (this.getModuleName() !== 'autocomplete' && this.isFiltering() && !this.isTyped) {
                if (!this.actionCompleteData.isUpdated || ((!this.isCustomFilter
                    && !this.isFilterFocus) || (isNullOrUndefined(this.itemData) && this.allowFiltering)
                    && ((this.dataSource instanceof DataManager)
                        || (!isNullOrUndefined(this.dataSource) && !isNullOrUndefined(this.dataSource.length) &&
                            this.dataSource.length !== 0)))) {
                    if (this.itemTemplate && (this.element.tagName === 'EJS-COMBOBOX' || this.isReact) && this.allowFiltering) {
                        setTimeout(function () {
                            _this.updateActionCompleteDataValues(ulElement, list);
                        }, 0);
                    }
                    else {
                        this.updateActionCompleteDataValues(ulElement, list);
                    }
                }
                if (this.isDynamicData) {
                    var currentValue = this.allowObjectBinding && !isNullOrUndefined(this.value) ?
                        getValue((this.fields.value) ? this.fields.value : '', this.value) : this.value;
                    this.itemData = this.getDataByValue(currentValue);
                    this.selectedLI = this.getElementByValue(currentValue);
                    this.isDynamicData = false;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if ((this.allowCustom || (this.allowFiltering && !this.isValueInList(list, this.value) &&
                    this.dataSource instanceof DataManager)) && !this.enableVirtualization) {
                    this.addNewItem(list, selectedItem);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                else if ((this.allowCustom || (this.allowFiltering && this.isValueInList(list, this.value))) &&
                    !this.enableVirtualization) {
                    var value = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue((this.fields.value) ? this.fields.value : '', this.value) : this.value;
                    var isValidAddition = !isNullOrUndefined(this.value) && selectedItem && selectedItem.getAttribute('data-value') === value.toString();
                    if (isValidAddition) {
                        this.addNewItem(list, selectedItem);
                    }
                }
                if (!isNullOrUndefined(this.itemData) || (isNullOrUndefined(this.itemData) && this.enableVirtualization)) {
                    this.getSkeletonCount();
                    this.skeletonCount = this.totalItemCount !== 0 && this.totalItemCount < (this.itemCount * 2) &&
                        ((!(this.dataSource instanceof DataManager)) ||
                            ((this.dataSource instanceof DataManager) && (this.totalItemCount <= this.itemCount))) ? 0 : this.skeletonCount;
                    this.UpdateSkeleton();
                    this.focusIndexItem();
                }
                if (this.enableVirtualization) {
                    this.updateActionCompleteDataValues(ulElement, list);
                }
            }
            else if (this.enableVirtualization && this.getModuleName() !== 'autocomplete' && !this.isFiltering()) {
                var value = this.getItemData().value;
                this.activeIndex = this.getIndexByValue(value);
                var element = this.findListElement(this.list, 'li', 'data-value', value);
                this.selectedLI = element;
            }
            else if (this.enableVirtualization && this.getModuleName() === 'autocomplete') {
                this.activeIndex = this.skeletonCount;
            }
            if (this.beforePopupOpen) {
                this.renderPopup(e);
                if (this.enableVirtualization) {
                    if (!this.list.querySelector('.e-virtual-list')) {
                        this.UpdateSkeleton();
                        this.liCollections = this.list.querySelectorAll('.e-list-item');
                    }
                }
                if (this.enableVirtualization && tempItemCount !== this.itemCount) {
                    this.resetList(this.dataSource, this.fields);
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DropDownList.prototype.isValueInList = function (list, valueToFind) {
        if (Array.isArray(list)) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] === valueToFind) {
                    return true;
                }
            }
        }
        else if (typeof list === 'object' && list !== null) {
            for (var key in list) {
                if (Object.prototype.hasOwnProperty.call(list, key) && list[key] === valueToFind) {
                    return true;
                }
            }
        }
        return false;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    DropDownList.prototype.checkFieldValue = function (list, fieldValue) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var checkField = list;
        fieldValue.forEach(function (value) {
            checkField = checkField[value];
        });
        return checkField;
    };
    DropDownList.prototype.updateActionCompleteDataValues = function (ulElement, list) {
        this.actionCompleteData = { ulElement: ulElement.cloneNode(true), list: list, isUpdated: true };
        if (this.actionData.list !== this.actionCompleteData.list && this.actionCompleteData.ulElement && this.actionCompleteData.list) {
            this.actionData = this.actionCompleteData;
        }
    };
    DropDownList.prototype.addNewItem = function (listData, newElement) {
        var _this = this;
        if (!isNullOrUndefined(this.itemData) && !isNullOrUndefined(newElement)) {
            var value_2 = this.getItemData().value;
            var isExist = listData.some(function (data) {
                return (((typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') && data === value_2) ||
                    (getValue(_this.fields.value, data) === value_2));
            });
            if (!isExist) {
                this.addItem(this.itemData);
            }
        }
    };
    DropDownList.prototype.updateActionCompleteData = function (li, item, index) {
        var _this = this;
        if (this.getModuleName() !== 'autocomplete' && this.actionCompleteData.ulElement) {
            if (this.itemTemplate && this.element.tagName === 'EJS-COMBOBOX' && this.allowFiltering) {
                setTimeout(function () {
                    _this.actionCompleteDataUpdate(li, item, index);
                }, 0);
            }
            else {
                this.actionCompleteDataUpdate(li, item, index);
            }
        }
    };
    DropDownList.prototype.actionCompleteDataUpdate = function (li, item, index) {
        if (index !== null) {
            this.actionCompleteData.ulElement.
                insertBefore(li.cloneNode(true), this.actionCompleteData.ulElement.childNodes[index]);
        }
        else {
            this.actionCompleteData.ulElement.appendChild(li.cloneNode(true));
        }
        if (this.isFiltering() && this.actionCompleteData.list && this.actionCompleteData.list.indexOf(item) < 0) {
            this.actionCompleteData.list.push(item);
        }
    };
    DropDownList.prototype.focusIndexItem = function () {
        var value = this.getItemData().value;
        this.activeIndex = ((this.enableVirtualization && !isNullOrUndefined(value)) || !this.enableVirtualization) ?
            this.getIndexByValue(value) : this.activeIndex;
        var element = this.findListElement(this.list, 'li', 'data-value', value);
        this.selectedLI = element;
        this.activeItem(element);
        if (!(this.enableVirtualization && isNullOrUndefined(element))) {
            this.removeFocus();
        }
    };
    DropDownList.prototype.updateSelection = function () {
        var selectedItem = this.list.querySelector('.' + dropDownBaseClasses.selected);
        if (selectedItem) {
            this.setProperties({ 'index': this.getIndexByValue(selectedItem.getAttribute('data-value')) });
            this.activeIndex = this.index;
        }
        else {
            this.removeFocus();
            this.list.querySelector('.' + dropDownBaseClasses.li).classList.add(dropDownListClasses.focus);
        }
    };
    DropDownList.prototype.updateSelectionList = function () {
        var selectedItem = this.list && this.list.querySelector('.' + 'e-active');
        if (!selectedItem && !isNullOrUndefined(this.value) && this.getModuleName() !== 'autocomplete') {
            var value = this.allowObjectBinding ? getValue((this.fields.value) ? this.fields.value : '', this.value) : this.value;
            var findEle = this.findListElement(this.list, 'li', 'data-value', value);
            if (findEle) {
                findEle.classList.add('e-active');
            }
        }
    };
    DropDownList.prototype.removeFocus = function () {
        var highlightedItem = this.list.querySelectorAll('.' + dropDownListClasses.focus);
        if (highlightedItem && highlightedItem.length) {
            removeClass(highlightedItem, dropDownListClasses.focus);
        }
    };
    DropDownList.prototype.renderPopup = function (e) {
        var _this = this;
        if (this.popupObj && document.body.contains(this.popupObj.element)) {
            this.refreshPopup();
            return;
        }
        var args = { cancel: false };
        this.trigger('beforeOpen', args, function (args) {
            var initialPopupHeight;
            if (!args.cancel) {
                var popupEle = _this.createElement('div', {
                    id: _this.element.id + '_popup', className: 'e-ddl e-popup ' + (_this.cssClass !== null ? _this.cssClass : '')
                });
                popupEle.setAttribute('aria-label', _this.element.id);
                popupEle.setAttribute('role', 'dialog');
                var searchBox = _this.setSearchBox(popupEle);
                _this.listContainerHeight = _this.allowFiltering && _this.getModuleName() === 'dropdownlist' && Browser.isDevice ?
                    formatUnit(Math.round(window.outerHeight).toString() + 'px') : formatUnit(_this.popupHeight);
                if (_this.headerTemplate) {
                    _this.setHeaderTemplate(popupEle);
                    _this.isUpdateHeaderHeight = _this.header.offsetHeight !== 0;
                }
                append([_this.list], popupEle);
                if (_this.footerTemplate) {
                    _this.setFooterTemplate(popupEle);
                    _this.isUpdateFooterHeight = _this.footer.offsetHeight !== 0;
                }
                document.body.appendChild(popupEle);
                popupEle.style.top = '0px';
                initialPopupHeight = popupEle.clientHeight;
                if (_this.enableVirtualization && _this.itemTemplate) {
                    var listitems = popupEle.querySelectorAll('li.e-list-item:not(.e-virtual-list)');
                    _this.listItemHeight = listitems.length > 0 ? Math.ceil(listitems[0].getBoundingClientRect().height) +
                        parseInt(window.getComputedStyle(listitems[0]).marginBottom, 10) : 0;
                }
                if (_this.enableVirtualization && !_this.list.classList.contains(dropDownBaseClasses.noData)) {
                    _this.getSkeletonCount();
                    _this.skeletonCount = _this.totalItemCount < (_this.itemCount * 2) && ((!(_this.dataSource instanceof DataManager)) ||
                        ((_this.dataSource instanceof DataManager) && (_this.totalItemCount <= _this.itemCount))) ? 0 : _this.skeletonCount;
                    if (!_this.list.querySelector('.e-virtual-ddl-content')) {
                        var virtualContentElement = _this.createElement('div', {
                            className: 'e-virtual-ddl-content'
                        });
                        virtualContentElement.style.cssText = _this.getTransformValues();
                        _this.list.appendChild(virtualContentElement).appendChild(_this.list.querySelector('.e-list-parent'));
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        _this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = _this.getTransformValues();
                    }
                    _this.UpdateSkeleton();
                    _this.liCollections = _this.list.querySelectorAll('.' + dropDownBaseClasses.li);
                    _this.virtualItemCount = _this.itemCount;
                    if (!_this.list.querySelector('.e-virtual-ddl')) {
                        var virtualElement = _this.createElement('div', {
                            id: _this.element.id + '_popup',
                            className: 'e-virtual-ddl'
                        });
                        virtualElement.style.cssText = _this.GetVirtualTrackHeight();
                        popupEle.querySelector('.e-dropdownbase').appendChild(virtualElement);
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        _this.list.getElementsByClassName('e-virtual-ddl')[0].style = _this.GetVirtualTrackHeight();
                    }
                }
                popupEle.style.visibility = 'hidden';
                if (_this.popupHeight !== 'auto') {
                    _this.searchBoxHeight = 0;
                    if (!isNullOrUndefined(searchBox.container) &&
                        _this.getModuleName() !== 'combobox' && _this.getModuleName() !== 'autocomplete') {
                        _this.searchBoxHeight = (searchBox.container.parentElement).getBoundingClientRect().height;
                        _this.listContainerHeight = (parseInt(_this.listContainerHeight, 10) - (_this.searchBoxHeight)).toString() + 'px';
                    }
                    if (_this.headerTemplate) {
                        _this.header = _this.header ? _this.header : popupEle.querySelector('.e-ddl-header');
                        var height = Math.round(_this.header.getBoundingClientRect().height);
                        _this.listContainerHeight = (parseInt(_this.listContainerHeight, 10) -
                            (height + _this.searchBoxHeight)).toString() + 'px';
                    }
                    if (_this.footerTemplate) {
                        _this.footer = _this.footer ? _this.footer : popupEle.querySelector('.e-ddl-footer');
                        var height = Math.round(_this.footer.getBoundingClientRect().height);
                        _this.listContainerHeight = (parseInt(_this.listContainerHeight, 10) -
                            (height + _this.searchBoxHeight)).toString() + 'px';
                    }
                    _this.list.style.maxHeight = (parseInt(_this.listContainerHeight, 10) - 2).toString() + 'px'; // due to box-sizing property
                    popupEle.style.maxHeight = formatUnit(_this.popupHeight);
                }
                else {
                    popupEle.style.height = 'auto';
                }
                var offsetValue = 0;
                var left = void 0;
                _this.isPreventScrollAction = true;
                if (!isNullOrUndefined(_this.selectedLI) && (!isNullOrUndefined(_this.activeIndex) && _this.activeIndex >= 0)) {
                    _this.setScrollPosition();
                }
                else if (_this.enableVirtualization) {
                    _this.setScrollPosition();
                }
                else {
                    _this.list.scrollTop = 0;
                }
                if (Browser.isDevice && _this.isDeviceFullScreen && (!_this.allowFiltering && (_this.getModuleName() === 'dropdownlist' ||
                    (_this.isDropDownClick && _this.getModuleName() === 'combobox')))) {
                    offsetValue = _this.getOffsetValue(popupEle);
                    var firstItem = _this.isEmptyList() ? _this.list : _this.liCollections[0];
                    if (!isNullOrUndefined(_this.inputElement)) {
                        left = -(parseInt(getComputedStyle(firstItem).textIndent, 10) -
                            parseInt(getComputedStyle(_this.inputElement).paddingLeft, 10) +
                            parseInt(getComputedStyle(_this.inputElement.parentElement).borderLeftWidth, 10));
                    }
                }
                _this.createPopup(popupEle, offsetValue, left);
                _this.popupContentElement = _this.popupObj.element.querySelector('.e-content');
                _this.getFocusElement();
                _this.checkCollision(popupEle);
                if (Browser.isDevice) {
                    if ((parseInt(_this.popupWidth.toString(), 10) > window.outerWidth) &&
                        !(_this.getModuleName() === 'dropdownlist' && _this.allowFiltering)) {
                        _this.popupObj.element.classList.add('e-wide-popup');
                    }
                    _this.popupObj.element.classList.add(dropDownListClasses.device);
                    if (_this.getModuleName() === 'dropdownlist' || (_this.getModuleName() === 'combobox'
                        && !_this.allowFiltering && _this.isDropDownClick)) {
                        _this.popupObj.collision = { X: 'fit', Y: 'fit' };
                    }
                    if (_this.isFilterLayout() && _this.isDeviceFullScreen) {
                        _this.popupObj.element.classList.add(dropDownListClasses.mobileFilter);
                        _this.popupObj.position = { X: 0, Y: 0 };
                        _this.popupObj.dataBind();
                        attributes(_this.popupObj.element, { style: 'left:0px;right:0px;top:0px;bottom:0px;' });
                        addClass([document.body, _this.popupObj.element], dropDownListClasses.popupFullScreen);
                        _this.setSearchBoxPosition();
                        _this.backIconElement = searchBox.container.querySelector('.e-back-icon');
                        _this.clearIconElement = searchBox.container.querySelector('.' + dropDownListClasses.clearIcon);
                        EventHandler.add(_this.backIconElement, 'click', _this.clickOnBackIcon, _this);
                        EventHandler.add(_this.clearIconElement, 'click', _this.clearText, _this);
                    }
                }
                popupEle.style.visibility = 'visible';
                addClass([popupEle], 'e-popup-close');
                var scrollParentElements = _this.popupObj.getScrollableParent(_this.inputWrapper.container);
                for (var _i = 0, scrollParentElements_1 = scrollParentElements; _i < scrollParentElements_1.length; _i++) {
                    var element = scrollParentElements_1[_i];
                    EventHandler.add(element, 'scroll', _this.scrollHandler, _this);
                }
                if (!isNullOrUndefined(_this.list)) {
                    _this.unWireListEvents();
                    _this.wireListEvents();
                }
                _this.selectedElementID = _this.selectedLI ? _this.selectedLI.id : null;
                if (_this.enableVirtualization) {
                    _this.notify('bindScrollEvent', {
                        module: 'VirtualScroll',
                        component: _this.getModuleName(),
                        enable: _this.enableVirtualization
                    });
                    setTimeout(function () {
                        if (_this.value || _this.list.querySelector('.e-active')) {
                            _this.updateSelectionList();
                            if (_this.selectedValueInfo && _this.viewPortInfo && _this.viewPortInfo.offsets.top) {
                                _this.list.scrollTop = _this.viewPortInfo.offsets.top;
                            }
                            else {
                                _this.scrollBottom(true, true);
                            }
                        }
                    }, 5);
                }
                attributes(_this.targetElement(), { 'aria-expanded': 'true', 'aria-owns': _this.element.id + '_popup', 'aria-controls': _this.element.id });
                if (_this.getModuleName() !== 'dropdownlist' && _this.list.classList.contains('e-nodata')) {
                    attributes(_this.targetElement(), { 'aria-activedescendant': 'no-record' });
                    _this.popupContentElement.setAttribute('role', 'status');
                    _this.popupContentElement.setAttribute('id', 'no-record');
                }
                _this.inputElement.setAttribute('aria-expanded', 'true');
                _this.inputElement.setAttribute('aria-controls', _this.element.id + '_popup');
                var inputParent = _this.isFiltering() ? _this.filterInput.parentElement : _this.inputWrapper.container;
                addClass([inputParent], [dropDownListClasses.inputFocus]);
                var animModel = { name: 'FadeIn', duration: 100 };
                _this.beforePopupOpen = true;
                var popupInstance = _this.popupObj;
                var eventArgs = { popup: popupInstance, event: e, cancel: false, animation: animModel };
                _this.trigger('open', eventArgs, function (eventArgs) {
                    if (!eventArgs.cancel) {
                        if (!isNullOrUndefined(_this.inputWrapper)) {
                            addClass([_this.inputWrapper.container], [dropDownListClasses.iconAnimation]);
                        }
                        _this.renderReactTemplates();
                        if (_this.isReact && _this.isFiltering() && _this.dataSource instanceof DataManager && _this.list.querySelector('ul') && !_this.isSecondClick) {
                            _this.executeCloneElements();
                        }
                        if (!isNullOrUndefined(_this.popupObj)) {
                            _this.popupObj.show(new Animation(eventArgs.animation), (_this.zIndex === 1000) ? _this.element : null);
                        }
                        if (_this.isReact) {
                            setTimeout(function () {
                                if (_this.popupHeight && _this.list && _this.popupHeight !== 'auto' && !(_this.getModuleName() === 'dropdownlist' && _this.allowFiltering)) {
                                    var popupHeightValue = typeof _this.popupHeight === 'string' ? parseInt(_this.popupHeight, 10) : _this.popupHeight;
                                    if (!_this.isUpdateHeaderHeight && _this.headerTemplate && _this.header) {
                                        var listHeight = _this.list.style.maxHeight === '' ? popupHeightValue : parseInt(_this.list.style.maxHeight, 10);
                                        _this.list.style.maxHeight = (listHeight - _this.header.offsetHeight).toString() + 'px';
                                        _this.isUpdateHeaderHeight = true;
                                    }
                                    if (!_this.isUpdateFooterHeight && _this.footerTemplate && _this.footer) {
                                        var listHeight = _this.list.style.maxHeight === '' ? popupHeightValue : parseInt(_this.list.style.maxHeight, 10);
                                        _this.list.style.maxHeight = (listHeight - _this.footer.offsetHeight).toString() + 'px';
                                        _this.isUpdateFooterHeight = true;
                                    }
                                }
                            }, 15);
                        }
                    }
                    else {
                        _this.beforePopupOpen = false;
                        _this.destroyPopup();
                    }
                });
                if (_this.allowResize && (_this.getModuleName() !== 'dropdownlist' || !(Browser.isDevice && _this.isDeviceFullScreen && _this.allowFiltering))) {
                    var resizePaddingBottom = 16;
                    // Create the resizer div
                    _this.resizer = _this.createElement('div', {
                        id: _this.element.id + '_resize-popup',
                        className: dropDownListClasses.resizeIcon // Adding class for styling
                    });
                    // Add the resizer div to the popup
                    if (_this.list && _this.list.parentElement) {
                        _this.list.parentElement.classList.add('e-resize');
                        if (_this.popupHeight.toString().toLowerCase() !== 'auto' && initialPopupHeight > parseInt(_this.popupHeight.toString(), 10)) {
                            _this.list.parentElement.style.height = '100%';
                        }
                        _this.list.parentElement.style.paddingBottom = (_this.getModuleName() === 'dropdownlist' && _this.allowFiltering && _this.searchBoxHeight) ? (_this.searchBoxHeight + resizePaddingBottom).toString() + 'px' : resizePaddingBottom.toString() + 'px';
                        if (_this.header || _this.footer || _this.itemTemplate) {
                            _this.list.parentElement.style.paddingBottom = ((parseInt(_this.list.parentElement.style.maxHeight, 10) - parseInt(_this.list.style.maxHeight, 10)) + resizePaddingBottom).toString() + 'px';
                        }
                        _this.list.parentElement.appendChild(_this.resizer);
                        //hold the popup resize
                        _this.list.parentElement.style.width = _this.resizeWidth + "px";
                        _this.list.parentElement.style.height = _this.resizeHeight + "px";
                        _this.list.parentElement.style.maxHeight = _this.resizeHeight + "px";
                        _this.list.style.maxHeight = _this.resizeHeight + "px";
                    }
                    // Attach mouse and touch events to the resizer
                    EventHandler.add(_this.resizer, 'mousedown', _this.startResizing, _this);
                    EventHandler.add(_this.resizer, 'touchstart', _this.startResizing, _this);
                }
            }
            else {
                _this.beforePopupOpen = false;
            }
        });
    };
    DropDownList.prototype.checkCollision = function (popupEle) {
        if (!Browser.isDevice || (Browser.isDevice && !(this.getModuleName() === 'dropdownlist' || this.isDropDownClick))) {
            var collision = isCollide(popupEle);
            if (collision.length > 0) {
                popupEle.style.marginTop = -parseInt(getComputedStyle(popupEle).marginTop, 10) + 'px';
            }
            this.popupObj.resolveCollision();
        }
    };
    DropDownList.prototype.getOffsetValue = function (popupEle) {
        var popupStyles = getComputedStyle(popupEle);
        var borderTop = parseInt(popupStyles.borderTopWidth, 10);
        var borderBottom = parseInt(popupStyles.borderBottomWidth, 10);
        return this.setPopupPosition(borderTop + borderBottom);
    };
    DropDownList.prototype.createPopup = function (element, offsetValue, left) {
        var _this = this;
        this.popupObj = new Popup(element, {
            width: this.setWidth(), targetType: 'relative',
            relateTo: this.inputWrapper.container,
            collision: this.enableRtl ? { X: 'fit', Y: 'flip' } : { X: 'flip', Y: 'flip' }, offsetY: offsetValue,
            enableRtl: this.enableRtl, offsetX: left,
            position: this.enableRtl ? { X: 'right', Y: 'bottom' } : { X: 'left', Y: 'bottom' },
            zIndex: this.zIndex,
            close: function () {
                if (!_this.isDocumentClick) {
                    _this.focusDropDown();
                }
                // eslint-disable-next-line
                if (_this.isReact) {
                    _this.clearTemplate(['headerTemplate', 'footerTemplate']);
                }
                _this.isNotSearchList = false;
                _this.isDocumentClick = false;
                _this.destroyPopup();
                if (_this.isFiltering() && _this.actionCompleteData.list && _this.actionCompleteData.list.length > 0) {
                    _this.isActive = true;
                    if (_this.isReactTemplateUpdate && _this.isReact && _this.itemTemplate && !_this.enableVirtualization) {
                        _this.actionCompleteData.ulElement = _this.renderItems(_this.actionCompleteData.list, _this.fields);
                        _this.isReactTemplateUpdate = false;
                    }
                    if (_this.enableVirtualization) {
                        _this.onActionComplete(_this.ulElement, _this.listData, null, true);
                    }
                    else {
                        _this.onActionComplete(_this.actionCompleteData.ulElement, _this.actionCompleteData.list, null, true);
                    }
                }
                else if (_this.enableVirtualization) {
                    _this.focusIndexItem();
                }
            },
            open: function () {
                EventHandler.add(document, 'mousedown', _this.onDocumentClick, _this);
                _this.isPopupOpen = true;
                var actionList = _this.actionCompleteData && _this.actionCompleteData.ulElement &&
                    _this.actionCompleteData.ulElement.querySelector('li');
                var ulElement = _this.list.querySelector('ul li');
                if (!isNullOrUndefined(_this.ulElement) && !isNullOrUndefined(_this.ulElement.getElementsByClassName('e-item-focus')[0])) {
                    attributes(_this.targetElement(), { 'aria-activedescendant': _this.ulElement.getElementsByClassName('e-item-focus')[0].id });
                }
                else if (!isNullOrUndefined(_this.ulElement) && !isNullOrUndefined(_this.ulElement.getElementsByClassName('e-active')[0])) {
                    attributes(_this.targetElement(), { 'aria-activedescendant': _this.ulElement.getElementsByClassName('e-active')[0].id });
                }
                if (_this.isFiltering() && _this.itemTemplate && (_this.element.tagName === _this.getNgDirective()) &&
                    (actionList && ulElement && actionList.textContent !== ulElement.textContent) &&
                    _this.element.tagName !== 'EJS-COMBOBOX') {
                    _this.cloneElements();
                }
                if (_this.isFilterLayout()) {
                    removeClass([_this.inputWrapper.container], [dropDownListClasses.inputFocus]);
                    _this.isFilterFocus = true;
                    _this.filterInput.focus();
                    if (_this.inputWrapper.clearButton) {
                        addClass([_this.inputWrapper.clearButton], dropDownListClasses.clearIconHide);
                    }
                }
                _this.activeStateChange();
            },
            targetExitViewport: function () {
                if (!Browser.isDevice) {
                    _this.hidePopup();
                }
            }
        });
    };
    DropDownList.prototype.isEmptyList = function () {
        return !isNullOrUndefined(this.liCollections) && this.liCollections.length === 0;
    };
    DropDownList.prototype.getFocusElement = function () {
        // combo-box used this method
    };
    DropDownList.prototype.isFilterLayout = function () {
        return this.getModuleName() === 'dropdownlist' && this.allowFiltering;
    };
    DropDownList.prototype.scrollHandler = function () {
        if (Browser.isDevice && ((this.getModuleName() === 'dropdownlist' &&
            !this.isFilterLayout()) || (this.getModuleName() === 'combobox' && !this.allowFiltering && this.isDropDownClick))) {
            if (this.element && !(this.isElementInViewport(this.element))) {
                this.hidePopup();
            }
        }
    };
    DropDownList.prototype.isElementInViewport = function (element) {
        var elementRect = element.getBoundingClientRect();
        return (elementRect.top >= 0 && elementRect.left >= 0 && elementRect.bottom <= window.innerHeight &&
            elementRect.right <= window.innerWidth);
    };
    DropDownList.prototype.setSearchBoxPosition = function () {
        var searchBoxHeight = this.filterInput.parentElement.getBoundingClientRect().height;
        this.popupObj.element.style.maxHeight = '100%';
        this.popupObj.element.style.width = '100%';
        this.list.style.maxHeight = (window.innerHeight - searchBoxHeight) + 'px';
        this.list.style.height = (window.innerHeight - searchBoxHeight) + 'px';
        var clearElement = this.filterInput.parentElement.querySelector('.' + dropDownListClasses.clearIcon);
        detach(this.filterInput);
        clearElement.parentElement.insertBefore(this.filterInput, clearElement);
    };
    DropDownList.prototype.setPopupPosition = function (border) {
        var offsetValue;
        var popupOffset = border;
        var selectedLI = this.list.querySelector('.' + dropDownListClasses.focus) || this.selectedLI;
        var firstItem = this.isEmptyList() ? this.list : this.liCollections[0];
        var lastItem = this.isEmptyList() ? this.list : this.liCollections[this.getItems().length - 1];
        var liHeight = firstItem.getBoundingClientRect().height;
        this.listItemHeight = liHeight + parseInt(window.getComputedStyle(firstItem).marginBottom, 10);
        var listHeight = this.list.offsetHeight / 2;
        var height = isNullOrUndefined(selectedLI) ? firstItem.offsetTop : selectedLI.offsetTop;
        var lastItemOffsetValue = lastItem.offsetTop;
        if (lastItemOffsetValue - listHeight < height && !isNullOrUndefined(this.liCollections) &&
            this.liCollections.length > 0 && !isNullOrUndefined(selectedLI)) {
            var count = this.list.offsetHeight / liHeight;
            var paddingBottom = parseInt(getComputedStyle(this.list).paddingBottom, 10);
            offsetValue = (count - (this.liCollections.length - this.activeIndex)) * liHeight - popupOffset + paddingBottom;
            this.list.scrollTop = selectedLI.offsetTop;
        }
        else if (height > listHeight && !this.enableVirtualization) {
            offsetValue = listHeight - liHeight / 2;
            this.list.scrollTop = height - listHeight + liHeight / 2;
        }
        else {
            offsetValue = height;
        }
        var inputHeight = this.inputWrapper.container.offsetHeight;
        offsetValue = offsetValue + liHeight + popupOffset - ((liHeight - inputHeight) / 2);
        return -offsetValue;
    };
    DropDownList.prototype.setWidth = function () {
        var width = formatUnit(this.popupWidth);
        if (width.indexOf('%') > -1) {
            var inputWidth = this.inputWrapper.container.offsetWidth * parseFloat(width) / 100;
            width = inputWidth.toString() + 'px';
        }
        if (Browser.isDevice && (width.indexOf('px') > -1) && (!this.allowFiltering && (this.getModuleName() === 'dropdownlist' ||
            (this.isDropDownClick && this.getModuleName() === 'combobox')))) {
            var firstItem = this.isEmptyList() ? this.list : this.liCollections[0];
            width = (parseInt(width, 10) + (parseInt(getComputedStyle(firstItem).textIndent, 10) -
                parseInt(getComputedStyle(this.inputElement).paddingLeft, 10) +
                parseInt(getComputedStyle(this.inputElement.parentElement).borderLeftWidth, 10)) * 2) + 'px';
        }
        return width;
    };
    DropDownList.prototype.scrollBottom = function (isInitial, isInitialSelection, keyAction) {
        var _this = this;
        if (isInitialSelection === void 0) { isInitialSelection = false; }
        if (keyAction === void 0) { keyAction = null; }
        if (isNullOrUndefined(this.selectedLI) && this.enableVirtualization) {
            this.selectedLI = this.list.querySelector('.' + dropDownBaseClasses.li);
            if (!isNullOrUndefined(this.selectedLI) && this.selectedLI.classList.contains('e-virtual-list')) {
                this.selectedLI = this.liCollections[this.skeletonCount];
            }
        }
        if (!isNullOrUndefined(this.selectedLI)) {
            var selectedListMargin = this.selectedLI &&
                !isNaN(parseInt(window.getComputedStyle(this.selectedLI).marginBottom, 10)) ?
                parseInt(window.getComputedStyle(this.selectedLI).marginBottom, 10) : 0;
            this.isUpwardScrolling = false;
            var virtualListCount = this.list.querySelectorAll('.e-virtual-list').length;
            var lastElementValue = this.list.querySelector('li:last-of-type') ?
                this.list.querySelector('li:last-of-type').getAttribute('data-value') : null;
            var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ?
                this.selectedLI.offsetTop + (this.virtualListInfo.startIndex * (this.selectedLI.offsetHeight +
                    selectedListMargin)) : this.selectedLI.offsetTop;
            var currentOffset = this.list.offsetHeight;
            var nextBottom = selectedLiOffsetTop - (virtualListCount * (this.selectedLI.offsetHeight + selectedListMargin)) +
                (this.selectedLI.offsetHeight + selectedListMargin) - this.list.scrollTop;
            var nextOffset = this.list.scrollTop + nextBottom - currentOffset;
            var isScrollerCHanged = false;
            var isScrollTopChanged = false;
            nextOffset = isInitial ? nextOffset + parseInt(getComputedStyle(this.list).paddingTop, 10) * 2 :
                nextOffset + parseInt(getComputedStyle(this.list).paddingTop, 10);
            var boxRange = selectedLiOffsetTop - (virtualListCount * (this.selectedLI.offsetHeight + selectedListMargin)) +
                (this.selectedLI.offsetHeight + selectedListMargin) - this.list.scrollTop;
            boxRange = this.fields.groupBy && !isNullOrUndefined(this.fixedHeaderElement) ?
                boxRange - this.fixedHeaderElement.offsetHeight : boxRange;
            if (this.activeIndex === 0 && !this.enableVirtualization) {
                this.list.scrollTop = 0;
                isScrollerCHanged = this.isKeyBoardAction;
            }
            else if (nextBottom > currentOffset || !(boxRange > 0 && this.list.offsetHeight > boxRange)) {
                var currentElementValue = this.selectedLI ? this.selectedLI.getAttribute('data-value') : null;
                var liCount = keyAction === 'pageDown' ? this.getPageCount() - 2 : 1;
                if (!this.enableVirtualization || this.isKeyBoardAction || isInitialSelection) {
                    if (this.isKeyBoardAction && this.enableVirtualization && lastElementValue &&
                        currentElementValue === lastElementValue && keyAction !== 'end' && !this.isVirtualScrolling) {
                        this.isPreventKeyAction = true;
                        if (this.enableVirtualization && this.itemTemplate) {
                            this.list.scrollTop += nextOffset;
                        }
                        else {
                            if (this.enableVirtualization) {
                                liCount = keyAction === 'pageDown' ? this.getPageCount() + 1 : liCount;
                            }
                            this.list.scrollTop += (this.selectedLI.offsetHeight + selectedListMargin) * liCount;
                        }
                        this.isPreventKeyAction = this.IsScrollerAtEnd() ? false : this.isPreventKeyAction;
                        this.isKeyBoardAction = false;
                        this.isPreventScrollAction = false;
                    }
                    else if (this.enableVirtualization && keyAction === 'end') {
                        this.isPreventKeyAction = false;
                        this.isKeyBoardAction = false;
                        this.isPreventScrollAction = false;
                        this.list.scrollTop = this.list.scrollHeight;
                    }
                    else {
                        if (keyAction === 'pageDown' && this.enableVirtualization && !this.isVirtualScrolling) {
                            this.isPreventKeyAction = false;
                            this.isKeyBoardAction = false;
                            this.isPreventScrollAction = false;
                        }
                        this.list.scrollTop = nextOffset;
                    }
                }
                else {
                    this.list.scrollTop = this.virtualListInfo && this.virtualListInfo.startIndex ?
                        isInitial && this.virtualListInfo.startIndex ? this.virtualListInfo.startIndex * this.listItemHeight +
                            (this.listItemHeight * 2) : this.virtualListInfo.startIndex * this.listItemHeight : 0;
                }
                isScrollerCHanged = this.isKeyBoardAction;
                isScrollTopChanged = true;
            }
            this.isKeyBoardAction = isScrollerCHanged;
            if (this.enableVirtualization && this.fields.groupBy && this.fixedHeaderElement && (keyAction === 'down')) {
                setTimeout(function () {
                    _this.scrollStop(null, true);
                }, 100);
            }
        }
    };
    DropDownList.prototype.scrollTop = function (keyAction) {
        if (keyAction === void 0) { keyAction = null; }
        if (!isNullOrUndefined(this.selectedLI)) {
            var selectedListMargin = this.selectedLI &&
                !isNaN(parseInt(window.getComputedStyle(this.selectedLI).marginBottom, 10)) ?
                parseInt(window.getComputedStyle(this.selectedLI).marginBottom, 10) : 0;
            var virtualListCount = this.list.querySelectorAll('.e-virtual-list').length;
            var selectedLiOffsetTop = (this.virtualListInfo && this.virtualListInfo.startIndex) ?
                this.selectedLI.offsetTop + (this.virtualListInfo.startIndex * (this.selectedLI.offsetHeight +
                    selectedListMargin)) : this.selectedLI.offsetTop;
            var nextOffset = selectedLiOffsetTop - (virtualListCount * (this.selectedLI.offsetHeight +
                selectedListMargin)) - this.list.scrollTop;
            var firstElementValue = this.list.querySelector('li.e-list-item:not(.e-virtual-list)') ?
                this.list.querySelector('li.e-list-item:not(.e-virtual-list)').getAttribute('data-value') : null;
            nextOffset = this.fields.groupBy && !isNullOrUndefined(this.fixedHeaderElement) ?
                nextOffset - this.fixedHeaderElement.offsetHeight : nextOffset;
            var boxRange = (selectedLiOffsetTop - (virtualListCount * (this.selectedLI.offsetHeight + selectedListMargin)) +
                (this.selectedLI.offsetHeight + selectedListMargin) - this.list.scrollTop);
            var isPageUpKeyAction = this.enableVirtualization && this.getModuleName() === 'autocomplete' && nextOffset <= 0;
            if (this.activeIndex === 0 && !this.enableVirtualization) {
                this.list.scrollTop = 0;
            }
            else if (nextOffset < 0 || isPageUpKeyAction) {
                var currentElementValue = this.selectedLI ? this.selectedLI.getAttribute('data-value') : null;
                var liCount = keyAction === 'pageUp' ? this.getPageCount() - 2 : 1;
                if (this.enableVirtualization) {
                    liCount = keyAction === 'pageUp' ? this.getPageCount() : liCount;
                }
                if (this.enableVirtualization && this.isKeyBoardAction && firstElementValue &&
                    currentElementValue === firstElementValue && keyAction !== 'home' && !this.isVirtualScrolling) {
                    this.isUpwardScrolling = true;
                    this.isPreventKeyAction = true;
                    this.list.scrollTop -= (this.selectedLI.offsetHeight + selectedListMargin) * liCount;
                    this.isPreventKeyAction = this.list.scrollTop !== 0 ? this.isPreventKeyAction : false;
                    this.isKeyBoardAction = false;
                    this.isPreventScrollAction = false;
                }
                else if (this.enableVirtualization && keyAction === 'home') {
                    this.isPreventScrollAction = false;
                    this.isPreventKeyAction = true;
                    this.isKeyBoardAction = false;
                    this.list.scrollTo(0, 0);
                }
                else {
                    if (keyAction === 'pageUp' && this.enableVirtualization && !this.isVirtualScrolling) {
                        this.isPreventKeyAction = false;
                        this.isKeyBoardAction = false;
                        this.isPreventScrollAction = false;
                    }
                    this.list.scrollTop = this.list.scrollTop + nextOffset;
                }
            }
            else if (!(boxRange > 0 && this.list.offsetHeight > boxRange)) {
                this.list.scrollTop = this.selectedLI.offsetTop - (this.fields.groupBy && !isNullOrUndefined(this.fixedHeaderElement) ?
                    this.fixedHeaderElement.offsetHeight : 0);
            }
        }
    };
    DropDownList.prototype.IsScrollerAtEnd = function () {
        return this.list && this.list.scrollTop + this.list.clientHeight >= this.list.scrollHeight;
    };
    DropDownList.prototype.isEditTextBox = function () {
        return false;
    };
    DropDownList.prototype.isFiltering = function () {
        return this.allowFiltering;
    };
    DropDownList.prototype.isPopupButton = function () {
        return true;
    };
    DropDownList.prototype.setScrollPosition = function (e) {
        this.isPreventScrollAction = true;
        if (!isNullOrUndefined(e)) {
            switch (e.action) {
                case 'pageDown':
                case 'down':
                case 'end':
                    this.isKeyBoardAction = true;
                    this.scrollBottom(false, false, e.action);
                    break;
                default:
                    this.isKeyBoardAction = e.action === 'up' || e.action === 'pageUp' || e.action === 'open';
                    this.scrollTop(e.action);
                    break;
            }
        }
        else {
            this.scrollBottom(true);
        }
        this.isKeyBoardAction = false;
    };
    DropDownList.prototype.clearText = function () {
        this.filterInput.value = this.typedString = '';
        this.searchLists(null);
        if (this.enableVirtualization) {
            this.list.scrollTop = 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.totalItemCount = this.dataCount = this.dataSource && this.dataSource.length ?
                this.dataSource.length : 0;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.list.getElementsByClassName('e-virtual-ddl')[0]) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.list.getElementsByClassName('e-virtual-ddl')[0].style = this.GetVirtualTrackHeight();
            }
            this.getSkeletonCount();
            this.UpdateSkeleton();
            this.liCollections = this.list.querySelectorAll('.e-list-item');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.list.getElementsByClassName('e-virtual-ddl-content')[0]) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = this.getTransformValues();
            }
        }
    };
    DropDownList.prototype.setEleWidth = function (width) {
        if (!isNullOrUndefined(width)) {
            if (typeof width === 'number') {
                this.inputWrapper.container.style.width = formatUnit(width);
            }
            else if (typeof width === 'string') {
                this.inputWrapper.container.style.width = (width.match(/px|%|em/)) ? (width) : (formatUnit(width));
            }
        }
    };
    DropDownList.prototype.closePopup = function (delay, e) {
        var _this = this;
        var isFilterValue = !isNullOrUndefined(this.filterInput) &&
            !isNullOrUndefined(this.filterInput.value) && this.filterInput.value !== '';
        var typedString = this.getModuleName() === 'combobox' ? this.typedString : null;
        this.isTyped = false;
        this.isVirtualTrackHeight = false;
        if (!(this.popupObj && document.body.contains(this.popupObj.element) && this.beforePopupOpen)) {
            return;
        }
        this.keyboardEvent = null;
        EventHandler.remove(document, 'mousedown', this.onDocumentClick);
        this.isActive = false;
        this.isDropDownClick = false;
        this.preventAutoFill = false;
        var scrollableParentElements = this.popupObj.getScrollableParent(this.inputWrapper.container);
        for (var _i = 0, scrollableParentElements_1 = scrollableParentElements; _i < scrollableParentElements_1.length; _i++) {
            var element = scrollableParentElements_1[_i];
            EventHandler.remove(element, 'scroll', this.scrollHandler);
        }
        if (Browser.isDevice && this.isFilterLayout() && this.isDeviceFullScreen) {
            removeClass([document.body, this.popupObj.element], dropDownListClasses.popupFullScreen);
        }
        if (this.isFilterLayout()) {
            if (!Browser.isDevice) {
                this.searchKeyModule.destroy();
                if (this.clearIconElement) {
                    EventHandler.remove(this.clearIconElement, 'click', this.clearText);
                }
            }
            if (this.backIconElement) {
                EventHandler.remove(this.backIconElement, 'click', this.clickOnBackIcon);
                EventHandler.remove(this.clearIconElement, 'click', this.clearText);
            }
            if (!isNullOrUndefined(this.filterInput)) {
                EventHandler.remove(this.filterInput, 'input', this.onInput);
                EventHandler.remove(this.filterInput, 'keyup', this.onFilterUp);
                EventHandler.remove(this.filterInput, 'keydown', this.onFilterDown);
                EventHandler.remove(this.filterInput, 'blur', this.onBlurHandler);
                EventHandler.remove(this.filterInput, 'paste', this.pasteHandler);
            }
            if (this.allowFiltering && this.getModuleName() === 'dropdownlist') {
                this.filterInput.removeAttribute('aria-activedescendant');
                this.filterInput.removeAttribute('aria-disabled');
                this.filterInput.removeAttribute('role');
                this.filterInput.removeAttribute('autocomplete');
                this.filterInput.removeAttribute('autocapitalize');
                this.filterInput.removeAttribute('spellcheck');
            }
            this.filterInput = null;
        }
        attributes(this.targetElement(), { 'aria-expanded': 'false' });
        this.inputElement.setAttribute('aria-expanded', 'false');
        this.targetElement().removeAttribute('aria-owns');
        this.targetElement().removeAttribute('aria-activedescendant');
        this.inputWrapper.container.classList.remove(dropDownListClasses.iconAnimation);
        if (this.isFiltering()) {
            this.actionCompleteData.isUpdated = false;
        }
        if (this.enableVirtualization) {
            if ((this.value == null || this.isTyped)) {
                this.viewPortInfo.endIndex = this.viewPortInfo && this.viewPortInfo.endIndex > 0 ?
                    this.viewPortInfo.endIndex : this.itemCount;
                if (this.getModuleName() === 'autocomplete' || (this.getModuleName() === 'dropdownlist' &&
                    !isNullOrUndefined(this.typedString) && this.typedString !== '') || (this.getModuleName() === 'combobox' &&
                    this.allowFiltering && !isNullOrUndefined(this.typedString) && this.typedString !== '')) {
                    this.checkAndResetCache();
                }
            }
            else if (this.getModuleName() === 'autocomplete') {
                this.checkAndResetCache();
            }
            if ((this.getModuleName() === 'dropdownlist' || this.getModuleName() === 'combobox') && !(this.skeletonCount === 0)) {
                this.getSkeletonCount(true);
            }
        }
        this.beforePopupOpen = false;
        var animModel = {
            name: 'FadeOut',
            duration: 100,
            delay: delay ? delay : 0
        };
        var popupInstance = this.popupObj;
        var eventArgs = { popup: popupInstance, cancel: false, animation: animModel, event: e || null };
        this.trigger('close', eventArgs, function (eventArgs) {
            if (_this.getModuleName() === 'dropdownlist') {
                Input.destroy({
                    element: _this.filterInput,
                    floatLabelType: _this.floatLabelType,
                    properties: { placeholder: _this.filterBarPlaceholder },
                    buttons: _this.clearIconElement
                }, _this.clearIconElement);
            }
            _this.filterInputObj = null;
            if (!isNullOrUndefined(_this.popupObj) &&
                !isNullOrUndefined(_this.popupObj.element.querySelector('.e-fixed-head'))) {
                var fixedHeader = _this.popupObj.element.querySelector('.e-fixed-head');
                fixedHeader.parentNode.removeChild(fixedHeader);
                _this.fixedHeaderElement = null;
            }
            if (!eventArgs.cancel) {
                if (_this.getModuleName() === 'autocomplete') {
                    _this.rippleFun();
                }
                if (_this.isPopupOpen) {
                    _this.popupObj.hide(new Animation(eventArgs.animation));
                }
                else {
                    _this.destroyPopup();
                }
            }
        });
        if (Browser.isDevice && !eventArgs.cancel && this.popupObj.element.classList.contains('e-wide-popup')) {
            this.popupObj.element.classList.remove('e-wide-popup');
        }
        var dataSourceCount;
        if (this.dataSource instanceof DataManager) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dataSourceCount = this.virtualGroupDataSource && this.virtualGroupDataSource.length ?
                this.virtualGroupDataSource.length : 0;
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dataSourceCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
        }
        if (this.enableVirtualization && this.isFiltering() && isFilterValue && this.totalItemCount !== dataSourceCount) {
            this.updateInitialData();
            this.checkAndResetCache();
        }
    };
    DropDownList.prototype.updateInitialData = function () {
        var currentData = this.selectData;
        if (isNullOrUndefined(currentData)) {
            return;
        }
        var ulElement = this.renderItems(currentData, this.fields);
        this.list.scrollTop = 0;
        this.virtualListInfo = {
            currentPageNumber: null,
            direction: null,
            sentinelInfo: {},
            offsets: {},
            startIndex: 0,
            endIndex: this.itemCount
        };
        if (this.getModuleName() === 'combobox') {
            this.typedString = '';
        }
        this.previousStartIndex = 0;
        this.previousEndIndex = 0;
        if (this.dataSource instanceof DataManager) {
            if (this.remoteDataCount >= 0) {
                this.totalItemCount = this.dataCount = this.remoteDataCount;
            }
            else {
                this.resetList(this.dataSource);
            }
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.totalItemCount = this.dataCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.list.getElementsByClassName('e-virtual-ddl')[0]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.list.getElementsByClassName('e-virtual-ddl')[0].style = this.GetVirtualTrackHeight();
        }
        else if (!this.list.querySelector('.e-virtual-ddl') && this.list.parentElement) {
            var virualElement = this.createElement('div', {
                id: this.element.id + '_popup',
                className: 'e-virtual-ddl'
            });
            virualElement.style.cssText = this.GetVirtualTrackHeight();
            this.list.parentElement.querySelector('.e-dropdownbase').appendChild(virualElement);
        }
        if (this.getModuleName() !== 'autocomplete' && this.totalItemCount !== 0 && this.totalItemCount > (this.itemCount * 2)) {
            this.getSkeletonCount();
        }
        this.UpdateSkeleton();
        this.listData = currentData;
        this.updateActionCompleteDataValues(ulElement, currentData);
        this.liCollections = this.list.querySelectorAll('.e-list-item');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.list.getElementsByClassName('e-virtual-ddl-content')[0]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = this.getTransformValues();
        }
    };
    DropDownList.prototype.destroyPopup = function () {
        this.isPopupOpen = false;
        this.isFilterFocus = false;
        this.inputElement.removeAttribute('aria-controls');
        if (this.popupObj) {
            if (this.resizer) {
                EventHandler.remove(this.resizer, 'mousedown', this.startResizing);
                EventHandler.remove(this.resizer, 'touchstart', this.startResizing);
            }
            this.popupObj.destroy();
            detach(this.popupObj.element);
        }
    };
    DropDownList.prototype.clickOnBackIcon = function () {
        this.hidePopup();
        this.focusIn();
    };
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    DropDownList.prototype.render = function () {
        this.preselectedIndex = !isNullOrUndefined(this.index) ? this.index : null;
        if (this.element.tagName === 'INPUT') {
            this.inputElement = this.element;
            if (isNullOrUndefined(this.inputElement.getAttribute('role'))) {
                this.inputElement.setAttribute('role', 'combobox');
            }
            if (isNullOrUndefined(this.inputElement.getAttribute('type'))) {
                this.inputElement.setAttribute('type', 'text');
            }
            this.inputElement.setAttribute('aria-expanded', 'false');
        }
        else {
            this.inputElement = this.createElement('input', { attrs: { role: 'combobox', type: 'text' } });
            if (this.element.tagName !== this.getNgDirective()) {
                this.element.style.display = 'none';
            }
            this.element.parentElement.insertBefore(this.inputElement, this.element);
            this.preventTabIndex(this.inputElement);
        }
        var updatedCssClassValues = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValues = (this.cssClass.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) &&
            closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        this.inputWrapper = Input.createInput({
            element: this.inputElement,
            buttons: this.isPopupButton() ? [dropDownListClasses.icon] : null,
            floatLabelType: this.floatLabelType,
            properties: {
                readonly: this.getModuleName() === 'dropdownlist' ? true : this.readonly,
                placeholder: this.placeholder,
                cssClass: updatedCssClassValues,
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton
            }
        }, this.createElement);
        if (this.element.tagName === this.getNgDirective()) {
            this.element.appendChild(this.inputWrapper.container);
        }
        else {
            this.inputElement.parentElement.insertBefore(this.element, this.inputElement);
        }
        this.hiddenElement = this.createElement('select', {
            attrs: {
                'aria-hidden': 'true',
                'tabindex': '-1',
                'class': dropDownListClasses.hiddenElement
            }
        });
        prepend([this.hiddenElement], this.inputWrapper.container);
        if (!this.hiddenElement.hasAttribute('aria-label')) {
            this.hiddenElement.setAttribute('aria-label', this.getModuleName());
        }
        this.validationAttribute(this.element, this.hiddenElement);
        this.setReadOnly();
        this.setFields();
        this.inputWrapper.container.style.width = formatUnit(this.width);
        this.inputWrapper.container.classList.add('e-ddl');
        if (this.floatLabelType !== 'Never') {
            Input.calculateWidth(this.inputElement, this.inputWrapper.container);
        }
        if (!isNullOrUndefined(this.inputWrapper.buttons[0]) &&
            this.inputWrapper.container.getElementsByClassName('e-float-text-content')[0] && this.floatLabelType !== 'Never') {
            this.inputWrapper.container.getElementsByClassName('e-float-text-content')[0].classList.add('e-icon');
        }
        this.wireEvent();
        this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
        this.element.removeAttribute('tabindex');
        var id = this.element.getAttribute('id') ? this.element.getAttribute('id') : getUniqueID('ej2_dropdownlist');
        this.element.id = id;
        this.hiddenElement.id = id + '_hidden';
        this.targetElement().setAttribute('tabindex', this.tabIndex);
        if ((this.getModuleName() === 'autocomplete' || this.getModuleName() === 'combobox') && !this.readonly) {
            if (!this.inputElement.hasAttribute('aria-label')) {
                this.inputElement.setAttribute('aria-label', this.getModuleName());
            }
        }
        else if (this.getModuleName() === 'dropdownlist') {
            if (!this.targetElement().hasAttribute('aria-label')) {
                attributes(this.targetElement(), { 'aria-label': this.getModuleName() });
            }
            if (!this.inputElement.hasAttribute('aria-label')) {
                this.inputElement.setAttribute('aria-label', this.getModuleName());
            }
            this.inputElement.setAttribute('aria-expanded', 'false');
        }
        attributes(this.targetElement(), this.getAriaAttributes());
        this.updateDataAttribute(this.htmlAttributes);
        this.setHTMLAttributes();
        if (this.targetElement() === this.inputElement) {
            this.inputElement.removeAttribute('aria-labelledby');
        }
        if (this.value !== null || this.activeIndex !== null || this.text !== null) {
            if (this.enableVirtualization) {
                this.listItemHeight = this.getListHeight();
                this.getSkeletonCount();
                this.updateVirtualizationProperties(this.itemCount, this.allowFiltering);
                if (this.index !== null) {
                    this.activeIndex = this.index + this.skeletonCount;
                }
            }
            this.initValue();
            this.selectedValueInfo = this.viewPortInfo;
            if (this.enableVirtualization) {
                this.activeIndex = this.activeIndex + this.skeletonCount;
            }
        }
        else if (this.element.tagName === 'SELECT' && this.element.options[0]) {
            var selectElement = this.element;
            this.value = this.allowObjectBinding ? this.getDataByValue(selectElement.options[selectElement.selectedIndex].value) :
                selectElement.options[selectElement.selectedIndex].value;
            this.text = isNullOrUndefined(this.value) ? null : selectElement.options[selectElement.selectedIndex].textContent;
            this.initValue();
        }
        this.setEnabled();
        this.preventTabIndex(this.element);
        if (!this.enabled) {
            this.targetElement().tabIndex = -1;
        }
        this.initial = false;
        this.element.style.opacity = '';
        this.inputElement.onselect = function (e) {
            e.stopImmediatePropagation();
        };
        this.inputElement.onchange = function (e) {
            e.stopImmediatePropagation();
        };
        if (this.element.hasAttribute('autofocus')) {
            this.focusIn();
        }
        if (!isNullOrUndefined(this.text)) {
            this.inputElement.setAttribute('value', this.text);
        }
        if (this.element.hasAttribute('data-val')) {
            this.element.setAttribute('data-val', 'false');
        }
        var floatLabelElement = this.inputWrapper.container.getElementsByClassName('e-float-text')[0];
        if (!isNullOrUndefined(this.element.id) && this.element.id !== '' && !isNullOrUndefined(floatLabelElement)) {
            floatLabelElement.id = 'label_' + this.element.id.replace(/ /g, '_');
            attributes(this.inputElement, { 'aria-labelledby': floatLabelElement.id });
        }
        this.renderComplete();
        this.listItemHeight = this.getListHeight();
        this.getSkeletonCount();
        if (this.enableVirtualization) {
            this.updateVirtualizationProperties(this.itemCount, this.allowFiltering);
        }
        this.viewPortInfo.startIndex = this.virtualItemStartIndex = 0;
        this.viewPortInfo.endIndex = this.virtualItemEndIndex = this.viewPortInfo.startIndex > 0 ?
            this.viewPortInfo.endIndex : this.itemCount;
    };
    DropDownList.prototype.getListHeight = function () {
        var listParent = this.createElement('div', {
            className: 'e-dropdownbase'
        });
        var item = this.createElement('li', {
            className: 'e-list-item'
        });
        var listParentHeight = formatUnit(this.popupHeight);
        listParent.style.height = (parseInt(listParentHeight, 10)).toString() + 'px';
        listParent.appendChild(item);
        document.body.appendChild(listParent);
        this.virtualListHeight = listParent.getBoundingClientRect().height;
        var listItemHeight = Math.ceil(item.getBoundingClientRect().height) +
            parseInt(window.getComputedStyle(item).marginBottom, 10);
        listParent.remove();
        return listItemHeight;
    };
    DropDownList.prototype.setFooterTemplate = function (popupEle) {
        var compiledString;
        if (this.footer) {
            if (this.isReact && typeof this.footerTemplate === 'function') {
                this.clearTemplate(['footerTemplate']);
            }
            else {
                this.footer.innerHTML = '';
            }
        }
        else {
            this.footer = this.createElement('div');
            addClass([this.footer], dropDownListClasses.footer);
        }
        var footercheck = this.dropdownCompiler(this.footerTemplate);
        if (typeof this.footerTemplate !== 'function' && footercheck) {
            compiledString = compile(select(this.footerTemplate, document).innerHTML.trim());
        }
        else {
            compiledString = compile(this.footerTemplate);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var footerCompTemp = compiledString({}, this, 'footerTemplate', this.footerTemplateId, this.isStringTemplate, null, this.footer);
        if (footerCompTemp && footerCompTemp.length > 0) {
            append(footerCompTemp, this.footer);
        }
        append([this.footer], popupEle);
    };
    DropDownList.prototype.setHeaderTemplate = function (popupEle) {
        var compiledString;
        if (this.header) {
            this.header.innerHTML = '';
        }
        else {
            this.header = this.createElement('div');
            addClass([this.header], dropDownListClasses.header);
        }
        var headercheck = this.dropdownCompiler(this.headerTemplate);
        if (typeof this.headerTemplate !== 'function' && headercheck) {
            compiledString = compile(select(this.headerTemplate, document).innerHTML.trim());
        }
        else {
            compiledString = compile(this.headerTemplate);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var headerCompTemp = compiledString({}, this, 'headerTemplate', this.headerTemplateId, this.isStringTemplate, null, this.header);
        if (headerCompTemp && headerCompTemp.length) {
            append(headerCompTemp, this.header);
        }
        var contentEle = popupEle.querySelector('div.e-content');
        popupEle.insertBefore(this.header, contentEle);
    };
    /**
     * Sets the enabled state to DropDownBase.
     *
     * @returns {void}
     */
    DropDownList.prototype.setEnabled = function () {
        this.element.setAttribute('aria-disabled', (this.enabled) ? 'false' : 'true');
    };
    DropDownList.prototype.setOldText = function (text) {
        this.text = text;
    };
    DropDownList.prototype.setOldValue = function (value) {
        this.value = value;
    };
    DropDownList.prototype.refreshPopup = function () {
        if (!isNullOrUndefined(this.popupObj) && document.body.contains(this.popupObj.element) &&
            ((this.allowFiltering && !(Browser.isDevice && this.isFilterLayout())) || this.getModuleName() === 'autocomplete')) {
            removeClass([this.popupObj.element], 'e-popup-close');
            this.popupObj.refreshPosition(this.inputWrapper.container);
            this.popupObj.resolveCollision();
        }
    };
    DropDownList.prototype.checkData = function (newProp) {
        if (newProp.dataSource && !isNullOrUndefined(Object.keys(newProp.dataSource)) && this.itemTemplate && this.allowFiltering &&
            !(this.isListSearched && (newProp.dataSource instanceof DataManager))) {
            if (this.list && !(this.isReact)) {
                this.list.innerHTML = '';
            }
            else {
                this.list = null;
            }
            this.actionCompleteData = { ulElement: null, list: null, isUpdated: false };
        }
        this.isListSearched = false;
        var isChangeValue = Object.keys(newProp).indexOf('value') !== -1 && isNullOrUndefined(newProp.value);
        var isChangeText = Object.keys(newProp).indexOf('text') !== -1 && isNullOrUndefined(newProp.text);
        if (this.getModuleName() !== 'autocomplete' && this.allowFiltering && (isChangeValue || isChangeText)) {
            this.itemData = null;
        }
        if (this.allowFiltering && newProp.dataSource && !isNullOrUndefined(Object.keys(newProp.dataSource))) {
            this.actionCompleteData = { ulElement: null, list: null, isUpdated: false };
            this.actionData = this.actionCompleteData;
        }
        else if (this.allowFiltering && newProp.query && !isNullOrUndefined(Object.keys(newProp.query))) {
            this.actionCompleteData = this.getModuleName() === 'combobox' ?
                { ulElement: null, list: null, isUpdated: false } : this.actionCompleteData;
            this.actionData = this.actionCompleteData;
        }
    };
    DropDownList.prototype.updateDataSource = function (props, oldProps) {
        if (this.inputElement.value !== '' || (!isNullOrUndefined(props) && (isNullOrUndefined(props.dataSource)
            || (!(props.dataSource instanceof DataManager) && props.dataSource.length === 0)))) {
            this.clearAll(null, props);
        }
        if ((this.fields.groupBy && props.fields) && !this.isGroupChecking && this.list) {
            EventHandler.remove(this.list, 'scroll', this.setFloatingHeader);
            EventHandler.add(this.list, 'scroll', this.setFloatingHeader, this);
        }
        if (!(!isNullOrUndefined(props) && (isNullOrUndefined(props.dataSource)
            || (!(props.dataSource instanceof DataManager) && props.dataSource.length === 0))) ||
            ((props.dataSource instanceof DataManager) || (!isNullOrUndefined(props) && Array.isArray(props.dataSource) &&
                !isNullOrUndefined(oldProps) && Array.isArray(oldProps.dataSource) && props.dataSource.length !== oldProps.dataSource.length))) {
            this.typedString = '';
            this.resetList(this.dataSource);
        }
        if (!this.isCustomFilter && !this.isFilterFocus && document.activeElement !== this.filterInput) {
            this.checkCustomValue();
        }
    };
    DropDownList.prototype.checkCustomValue = function () {
        var currentValue = this.allowObjectBinding && !isNullOrUndefined(this.value) ?
            getValue((this.fields.value) ? this.fields.value : '', this.value) : this.value;
        this.itemData = this.getDataByValue(currentValue);
        var dataItem = this.getItemData();
        var value = this.allowObjectBinding ? this.itemData : dataItem.value;
        var index = isNullOrUndefined(value) ? null : this.index;
        if ((isNullOrUndefined(index) && (currentValue === value)) || this.isAngular) {
            this.setProperties({ 'text': dataItem.text ? dataItem.text.toString() : dataItem.text, 'value': value });
        }
        else {
            this.setProperties({ 'text': dataItem.text ? dataItem.text.toString() : dataItem.text, 'index': index, 'value': value });
        }
    };
    DropDownList.prototype.updateInputFields = function () {
        if (this.getModuleName() === 'dropdownlist') {
            Input.setValue(this.text, this.inputElement, this.floatLabelType, this.showClearButton);
        }
    };
    /**
     * Dynamically change the value of properties.
     *
     * @private
     * @param {DropDownListModel} newProp - Returns the dynamic property value of the component.
     * @param {DropDownListModel} oldProp - Returns the previous previous value of the component.
     * @returns {void}
     */
    DropDownList.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _this = this;
        if (!isNullOrUndefined(newProp.dataSource) && !this.isTouched && (isNullOrUndefined(newProp.value) &&
            isNullOrUndefined(newProp.index)) && !isNullOrUndefined(this.preselectedIndex) && !isNullOrUndefined(this.index)) {
            newProp.index = this.index;
        }
        if (!isNullOrUndefined(newProp.value) || !isNullOrUndefined(newProp.index)) {
            this.isTouched = true;
        }
        if (this.getModuleName() === 'dropdownlist') {
            this.checkData(newProp);
            this.setUpdateInitial(['fields', 'query', 'dataSource'], newProp);
        }
        var _loop_1 = function (prop) {
            switch (prop) {
                case 'query':
                case 'dataSource':
                    this_1.getSkeletonCount();
                    this_1.checkAndResetCache();
                    break;
                case 'htmlAttributes':
                    this_1.setHTMLAttributes();
                    break;
                case 'width':
                    this_1.setEleWidth(newProp.width);
                    Input.calculateWidth(this_1.inputElement, this_1.inputWrapper.container);
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this_1.inputElement);
                    break;
                case 'filterBarPlaceholder':
                    if (this_1.filterInput) {
                        Input.setPlaceholder(newProp.filterBarPlaceholder, this_1.filterInput);
                    }
                    break;
                case 'readonly':
                    if (this_1.getModuleName() !== 'dropdownlist') {
                        Input.setReadonly(newProp.readonly, this_1.inputElement);
                    }
                    this_1.setReadOnly();
                    break;
                case 'cssClass':
                    this_1.setCssClass(newProp.cssClass, oldProp.cssClass);
                    Input.calculateWidth(this_1.inputElement, this_1.inputWrapper.container);
                    break;
                case 'enableRtl':
                    this_1.setEnableRtl();
                    break;
                case 'enabled':
                    this_1.setEnable();
                    break;
                case 'text':
                    if (this_1.fields.disabled) {
                        newProp.text = newProp.text && !this_1.isDisabledItemByIndex(this_1.getIndexByValue(this_1.getValueByText(newProp.text)))
                            ? newProp.text : null;
                    }
                    if (newProp.text === null) {
                        this_1.clearAll();
                        break;
                    }
                    if (this_1.enableVirtualization) {
                        this_1.updateValues();
                        this_1.updateInputFields();
                        this_1.notify('setCurrentViewDataAsync', {
                            module: 'VirtualScroll'
                        });
                        break;
                    }
                    if (!this_1.list) {
                        if (this_1.dataSource instanceof DataManager) {
                            this_1.initialRemoteRender = true;
                        }
                        this_1.renderList();
                    }
                    if (!this_1.initialRemoteRender) {
                        var li = this_1.getElementByText(newProp.text);
                        if (!this_1.checkValidLi(li)) {
                            if (this_1.liCollections && this_1.liCollections.length === 100 &&
                                this_1.getModuleName() === 'autocomplete' && this_1.listData.length > 100) {
                                this_1.setSelectionData(newProp.text, oldProp.text, 'text');
                            }
                            else if (newProp.text && this_1.dataSource instanceof DataManager) {
                                var listLength_1 = this_1.getItems().length;
                                var checkField = isNullOrUndefined(this_1.fields.text) ? this_1.fields.value : this_1.fields.text;
                                this_1.typedString = '';
                                this_1.dataSource.executeQuery(this_1.getQuery(this_1.query).where(new Predicate(checkField, 'equal', newProp.text)))
                                    .then(function (e) {
                                    if (e.result.length > 0) {
                                        _this.addItem(e.result, listLength_1);
                                        _this.updateValues();
                                    }
                                    else {
                                        _this.setOldText(oldProp.text);
                                    }
                                });
                            }
                            else if (this_1.getModuleName() === 'autocomplete') {
                                this_1.setInputValue(newProp, oldProp);
                            }
                            else {
                                this_1.setOldText(oldProp.text);
                            }
                        }
                        this_1.updateInputFields();
                    }
                    break;
                case 'value':
                    if (this_1.fields.disabled) {
                        newProp.value = newProp.value != null && !this_1.isDisableItemValue(newProp.value) ? newProp.value : null;
                    }
                    if (newProp.value === null) {
                        this_1.clearAll();
                        break;
                    }
                    if (this_1.allowObjectBinding && !isNullOrUndefined(newProp.value) && !isNullOrUndefined(oldProp.value) &&
                        this_1.isObjectInArray(newProp.value, [oldProp.value])) {
                        return { value: void 0 };
                    }
                    if (this_1.enableVirtualization) {
                        this_1.updateValues();
                        this_1.updateInputFields();
                        this_1.notify('setCurrentViewDataAsync', {
                            module: 'VirtualScroll'
                        });
                        this_1.preventChange = this_1.isAngular && this_1.preventChange ? !this_1.preventChange : this_1.preventChange;
                        break;
                    }
                    this_1.notify('beforeValueChange', { newProp: newProp }); // gird component value type change
                    if (!this_1.list) {
                        if (this_1.dataSource instanceof DataManager) {
                            this_1.initialRemoteRender = true;
                        }
                        this_1.renderList();
                    }
                    if (!this_1.initialRemoteRender) {
                        var value = this_1.allowObjectBinding && !isNullOrUndefined(newProp.value) ?
                            getValue((this_1.fields.value) ? this_1.fields.value : '', newProp.value) : newProp.value;
                        var item = this_1.getElementByValue(value);
                        if (!this_1.checkValidLi(item)) {
                            if (this_1.liCollections && this_1.liCollections.length === 100 &&
                                this_1.getModuleName() === 'autocomplete' && this_1.listData.length > 100) {
                                this_1.setSelectionData(newProp.value, oldProp.value, 'value');
                            }
                            else if (newProp.value && this_1.dataSource instanceof DataManager) {
                                var listLength_2 = this_1.getItems().length;
                                var checkField = isNullOrUndefined(this_1.fields.value) ? this_1.fields.text : this_1.fields.value;
                                this_1.typedString = '';
                                var value_3 = this_1.allowObjectBinding && !isNullOrUndefined(newProp.value) ?
                                    getValue(checkField, newProp.value) : newProp.value;
                                this_1.dataSource.executeQuery(this_1.getQuery(this_1.query).where(new Predicate(checkField, 'equal', value_3)))
                                    .then(function (e) {
                                    if (e.result.length > 0) {
                                        _this.addItem(e.result, listLength_2);
                                        _this.updateValues();
                                    }
                                    else {
                                        _this.setOldValue(oldProp.value);
                                    }
                                });
                            }
                            else if (this_1.getModuleName() === 'autocomplete') {
                                this_1.setInputValue(newProp, oldProp);
                            }
                            else {
                                this_1.setOldValue(oldProp.value);
                            }
                        }
                        this_1.updateInputFields();
                        this_1.preventChange = this_1.isAngular && this_1.preventChange ? !this_1.preventChange : this_1.preventChange;
                    }
                    break;
                case 'index':
                    if (this_1.fields.disabled) {
                        newProp.index = newProp.index != null && !this_1.isDisabledItemByIndex(newProp.index) ? newProp.index : null;
                    }
                    if (newProp.index === null) {
                        this_1.clearAll();
                        break;
                    }
                    if (!this_1.list) {
                        if (this_1.dataSource instanceof DataManager) {
                            this_1.initialRemoteRender = true;
                        }
                        this_1.renderList();
                    }
                    if (!this_1.initialRemoteRender && this_1.liCollections) {
                        var element = this_1.liCollections[newProp.index];
                        if (!this_1.checkValidLi(element)) {
                            if (this_1.liCollections && this_1.liCollections.length === 100 &&
                                this_1.getModuleName() === 'autocomplete' && this_1.listData.length > 100) {
                                this_1.setSelectionData(newProp.index, oldProp.index, 'index');
                            }
                            else {
                                this_1.index = oldProp.index;
                            }
                        }
                        this_1.updateInputFields();
                    }
                    break;
                case 'footerTemplate':
                    if (this_1.popupObj) {
                        this_1.setFooterTemplate(this_1.popupObj.element);
                    }
                    break;
                case 'headerTemplate':
                    if (this_1.popupObj) {
                        this_1.setHeaderTemplate(this_1.popupObj.element);
                    }
                    break;
                case 'valueTemplate':
                    if (!isNullOrUndefined(this_1.itemData) && this_1.valueTemplate !== null) {
                        this_1.setValueTemplate();
                    }
                    break;
                case 'allowFiltering':
                    if (this_1.allowFiltering) {
                        this_1.actionCompleteData = {
                            ulElement: this_1.ulElement,
                            list: this_1.listData, isUpdated: true
                        };
                        this_1.actionData = this_1.actionCompleteData;
                        this_1.updateSelectElementData(this_1.allowFiltering);
                    }
                    break;
                case 'floatLabelType':
                    Input.removeFloating(this_1.inputWrapper);
                    Input.addFloating(this_1.inputElement, newProp.floatLabelType, this_1.placeholder, this_1.createElement);
                    if (!isNullOrUndefined(this_1.inputWrapper.buttons[0]) &&
                        this_1.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0] && this_1.floatLabelType !== 'Never') {
                        this_1.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'showClearButton':
                    if (!this_1.inputWrapper.clearButton) {
                        Input.setClearButton(newProp.showClearButton, this_1.inputElement, this_1.inputWrapper, null, this_1.createElement);
                        this_1.bindClearEvent();
                    }
                    break;
                default:
                    {
                        // eslint-disable-next-line max-len
                        var ddlProps = this_1.getPropObject(prop, newProp, oldProp);
                        _super.prototype.onPropertyChanged.call(this_1, ddlProps.newProperty, ddlProps.oldProperty);
                    }
                    break;
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            var state_1 = _loop_1(prop);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    };
    DropDownList.prototype.checkValidLi = function (element) {
        if (this.isValidLI(element)) {
            this.setSelection(element, null);
            return true;
        }
        return false;
    };
    DropDownList.prototype.setSelectionData = function (newProp, oldProp, prop) {
        var _this = this;
        var li;
        this.updateListValues = function () {
            if (prop === 'text') {
                li = _this.getElementByText(newProp);
                if (!_this.checkValidLi(li)) {
                    _this.setOldText(oldProp);
                }
            }
            else if (prop === 'value') {
                var fields = (_this.fields.value) ? _this.fields.value : '';
                var value = _this.allowObjectBinding && !isNullOrUndefined(newProp) ?
                    getValue(fields, newProp) : newProp;
                li = _this.getElementByValue(newProp);
                if (!_this.checkValidLi(li)) {
                    _this.setOldValue(oldProp);
                }
            }
            else if (prop === 'index') {
                li = _this.liCollections[newProp];
                if (!_this.checkValidLi(li)) {
                    _this.index = oldProp;
                }
            }
        };
    };
    DropDownList.prototype.updatePopupState = function () {
        if (this.beforePopupOpen) {
            this.beforePopupOpen = false;
            this.showPopup();
        }
    };
    DropDownList.prototype.setReadOnly = function () {
        if (this.readonly) {
            addClass([this.inputWrapper.container], ['e-readonly']);
        }
        else {
            removeClass([this.inputWrapper.container], ['e-readonly']);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
    DropDownList.prototype.setInputValue = function (newProp, oldProp) {
    };
    DropDownList.prototype.setCssClass = function (newClass, oldClass) {
        if (!isNullOrUndefined(oldClass)) {
            oldClass = (oldClass.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(newClass)) {
            newClass = (newClass.replace(/\s+/g, ' ')).trim();
        }
        Input.setCssClass(newClass, [this.inputWrapper.container], oldClass);
        if (this.popupObj) {
            Input.setCssClass(newClass, [this.popupObj.element], oldClass);
        }
    };
    /**
     * Return the module name of this component.
     *
     * @private
     * @returns {string} Return the module name of this component.
     */
    DropDownList.prototype.getModuleName = function () {
        return 'dropdownlist';
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-param */
    /**
     * Opens the popup that displays the list of items.
     *
     * @returns {void}
     */
    DropDownList.prototype.showPopup = function (e) {
        /* eslint-enable valid-jsdoc, jsdoc/require-param */
        if (!this.enabled) {
            return;
        }
        this.firstItem = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : null;
        if (this.isReact && this.getModuleName() === 'combobox' && this.itemTemplate && this.isCustomFilter && this.isAddNewItemTemplate) {
            this.renderList();
            this.isAddNewItemTemplate = false;
        }
        if (this.isFiltering() && this.dataSource instanceof DataManager && (this.actionData.list !== this.actionCompleteData.list) &&
            this.actionData.list && this.actionData.ulElement) {
            this.actionCompleteData = this.actionData;
            this.onActionComplete(this.actionCompleteData.ulElement, this.actionCompleteData.list, null, true);
        }
        if (this.beforePopupOpen) {
            this.refreshPopup();
            return;
        }
        this.beforePopupOpen = true;
        if (this.isFiltering() && !this.isActive && this.actionCompleteData.list && this.actionCompleteData.list[0]) {
            this.isActive = true;
            this.onActionComplete(this.actionCompleteData.ulElement, this.actionCompleteData.list, null, true);
        }
        else if (isNullOrUndefined(this.list) || !isUndefined(this.list) && (this.list.classList.contains(dropDownBaseClasses.noData) ||
            this.list.querySelectorAll('.' + dropDownBaseClasses.li).length <= 0)) {
            if (this.isReact && this.isFiltering() && this.itemTemplate != null) {
                this.isSecondClick = false;
            }
            this.renderList(e);
        }
        if (this.enableVirtualization && this.listData && this.listData.length) {
            if (!isNullOrUndefined(this.value) && (this.getModuleName() === 'dropdownlist' || this.getModuleName() === 'combobox')) {
                this.removeHover();
            }
            if (!this.beforePopupOpen) {
                this.notify('setCurrentViewDataAsync', {
                    module: 'VirtualScroll'
                });
            }
        }
        if (this.beforePopupOpen) {
            this.invokeRenderPopup(e);
        }
        if (this.enableVirtualization && !this.allowFiltering && this.selectedValueInfo != null &&
            this.selectedValueInfo.startIndex > 0 && this.value != null) {
            this.notify('dataProcessAsync', {
                module: 'VirtualScroll',
                isOpen: true
            });
        }
        if (!this.isSecondClick && !this.isDropDownClick) {
            this.executeCloneElements();
        }
    };
    DropDownList.prototype.executeCloneElements = function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var duration = (this.element.tagName === this.getNgDirective() && this.itemTemplate) ? 500 : 100;
        if (this.isReact && this.isFiltering() && this.itemTemplate != null) {
            setTimeout(function () {
                proxy.cloneElements();
                proxy.isSecondClick = proxy.isReact && proxy.isFiltering() && proxy.dataSource instanceof DataManager && !proxy.list.querySelector('ul') ? false : true;
            }, duration);
        }
    };
    DropDownList.prototype.invokeRenderPopup = function (e) {
        if (Browser.isDevice && this.isFilterLayout()) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var proxy_2 = this;
            window.onpopstate = function () {
                proxy_2.hidePopup();
            };
            history.pushState({}, '');
        }
        if (!isNullOrUndefined(this.list) && (!isNullOrUndefined(this.list.children[0]) ||
            this.list.classList.contains(dropDownBaseClasses.noData))) {
            this.renderPopup(e);
        }
    };
    DropDownList.prototype.renderHightSearch = function () {
        // update high light search
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-param */
    /**
     * Hides the popup if it is in an open state.
     *
     * @returns {void}
     */
    DropDownList.prototype.hidePopup = function (e) {
        /* eslint-enable valid-jsdoc, jsdoc/require-param */
        if (this.isEscapeKey && this.getModuleName() === 'dropdownlist') {
            if (!isNullOrUndefined(this.inputElement)) {
                Input.setValue(this.text, this.inputElement, this.floatLabelType, this.showClearButton);
            }
            this.isEscapeKey = false;
            if (!isNullOrUndefined(this.index)) {
                var value = this.allowObjectBinding ? getValue((this.fields.value) ? this.fields.value : '', this.value) : this.value;
                var element = this.findListElement(this.ulElement, 'li', 'data-value', value);
                this.selectedLI = this.liCollections[this.index] || element;
                if (this.selectedLI) {
                    this.updateSelectedItem(this.selectedLI, null, true);
                    if (this.valueTemplate && this.itemData !== null) {
                        this.setValueTemplate();
                    }
                }
            }
            else {
                this.resetSelection();
            }
        }
        this.isVirtualTrackHeight = false;
        this.customFilterQuery = null;
        this.closePopup(0, e);
        var dataItem = this.getItemData();
        var isSelectVal = !isNullOrUndefined(this.selectedLI);
        if (isSelectVal && this.enableVirtualization && this.selectedLI.classList) {
            isSelectVal = this.selectedLI.classList.contains('e-active');
        }
        if (this.inputElement && this.inputElement.value === '' && !this.isInteracted && (this.isSelectCustom ||
            isSelectVal && this.inputElement.value !== dataItem.text)) {
            this.isSelectCustom = false;
            this.clearAll(e);
        }
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-param */
    /**
     * Sets the focus on the component for interaction.
     *
     * @returns {void}
     */
    DropDownList.prototype.focusIn = function (e) {
        if (!this.enabled) {
            return;
        }
        if (this.targetElement().classList.contains(dropDownListClasses.disable)) {
            return;
        }
        var isFocused = false;
        if (this.preventFocus && Browser.isDevice) {
            this.inputWrapper.container.tabIndex = 1;
            this.inputWrapper.container.focus();
            this.preventFocus = false;
            isFocused = true;
        }
        if (!isFocused) {
            this.targetElement().focus();
        }
        addClass([this.inputWrapper.container], [dropDownListClasses.inputFocus]);
        this.onFocus(e);
        if (this.floatLabelType !== 'Never') {
            Input.calculateWidth(this.inputElement, this.inputWrapper.container);
        }
    };
    /**
     * Moves the focus from the component if the component is already focused.
     *
     * @returns {void}
     */
    DropDownList.prototype.focusOut = function (e) {
        /* eslint-enable valid-jsdoc, jsdoc/require-param */
        if (!this.enabled) {
            return;
        }
        if (!this.enableVirtualization && (this.getModuleName() === 'combobox' || this.getModuleName() === 'autocomplete')) {
            this.isTyped = true;
        }
        this.hidePopup(e);
        if (this.targetElement()) {
            this.targetElement().blur();
        }
        removeClass([this.inputWrapper.container], [dropDownListClasses.inputFocus]);
        if (this.floatLabelType !== 'Never') {
            Input.calculateWidth(this.inputElement, this.inputWrapper.container);
        }
    };
    /**
     * Method to disable specific item in the popup.
     *
     * @param {string | number | object | HTMLLIElement} item - Specifies the item to be disabled.
     * @returns {void}
     * @deprecated
     */
    DropDownList.prototype.disableItem = function (item) {
        if (this.fields.disabled) {
            if (!this.list) {
                this.renderList();
            }
            var itemIndex = -1;
            if (this.liCollections && this.liCollections.length > 0 && this.listData && this.fields.disabled) {
                if (typeof (item) === 'string') {
                    itemIndex = this.getIndexByValue(item);
                }
                else if (typeof item === 'object') {
                    if (item instanceof HTMLLIElement) {
                        for (var index = 0; index < this.liCollections.length; index++) {
                            if (this.liCollections[index] === item) {
                                itemIndex = this.getIndexByValue(item.getAttribute('data-value'));
                                break;
                            }
                        }
                    }
                    else {
                        var value = JSON.parse(JSON.stringify(item))[this.fields.value];
                        for (var index = 0; index < this.listData.length; index++) {
                            if (JSON.parse(JSON.stringify(this.listData[index]))[this.fields.value] === value) {
                                itemIndex = this.getIndexByValue(value);
                                break;
                            }
                        }
                    }
                }
                else {
                    itemIndex = item;
                }
                var isValidIndex = itemIndex < this.liCollections.length && itemIndex > -1;
                if (isValidIndex && !(JSON.parse(JSON.stringify(this.listData[itemIndex]))[this.fields.disabled])) {
                    var li = this.liCollections[itemIndex];
                    if (li) {
                        this.disableListItem(li);
                        var parsedData = JSON.parse(JSON.stringify(this.listData[itemIndex]));
                        parsedData[this.fields.disabled] = true;
                        this.listData[itemIndex] = parsedData;
                        this.dataSource = this.listData;
                        if (li.classList.contains(dropDownListClasses.focus)) {
                            this.removeFocus();
                        }
                        if (li.classList.contains(dropDownListClasses.selected)) {
                            this.clear();
                        }
                    }
                }
            }
        }
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers. Also it removes the attributes and classes.
     *
     * @method destroy
     * @returns {void}
     */
    DropDownList.prototype.destroy = function () {
        this.isActive = false;
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        resetIncrementalSearchValues(this.element.id);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.clearTemplate();
        }
        this.hidePopup();
        if (this.popupObj) {
            this.popupObj.hide();
        }
        this.unWireEvent();
        if (this.list) {
            this.unWireListEvents();
        }
        if (this.element && !this.element.classList.contains('e-' + this.getModuleName())) {
            return;
        }
        if (this.inputElement) {
            var attrArray = ['readonly', 'aria-disabled', 'placeholder', 'aria-labelledby',
                'aria-expanded', 'autocomplete', 'aria-readonly', 'autocapitalize',
                'spellcheck', 'aria-autocomplete', 'aria-live', 'aria-describedby', 'aria-label'];
            for (var i = 0; i < attrArray.length; i++) {
                this.inputElement.removeAttribute(attrArray[i]);
            }
            this.inputElement.setAttribute('tabindex', this.tabIndex);
            this.inputElement.classList.remove('e-input');
            Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
        }
        this.element.style.display = 'block';
        if (this.inputWrapper.container && this.inputWrapper.container.parentElement) {
            if (this.inputWrapper.container.parentElement.tagName === this.getNgDirective()) {
                detach(this.inputWrapper.container);
            }
            else {
                this.inputWrapper.container.parentElement.insertBefore(this.element, this.inputWrapper.container);
                detach(this.inputWrapper.container);
            }
        }
        delete this.hiddenElement;
        this.filterInput = null;
        this.keyboardModule = null;
        this.ulElement = null;
        this.list = null;
        this.clearIconElement = null;
        this.popupObj = null;
        this.popupContentElement = null;
        this.rippleFun = null;
        this.selectedLI = null;
        this.liCollections = null;
        this.item = null;
        this.footer = null;
        this.header = null;
        this.previousSelectedLI = null;
        this.valueTempElement = null;
        this.actionData.ulElement = null;
        if (this.inputElement && !isNullOrUndefined(this.inputElement.onchange)) {
            this.inputElement.onchange = null;
        }
        if (this.inputElement && !isNullOrUndefined(this.inputElement.onselect)) {
            this.inputElement.onselect = null;
        }
        Input.destroy({
            element: this.inputElement,
            floatLabelType: this.floatLabelType,
            properties: this.properties,
            buttons: this.inputWrapper.container.querySelectorAll('.e-input-group-icon')[0]
        }, this.clearButton);
        this.clearButton = null;
        this.inputElement = null;
        this.inputWrapper = null;
        _super.prototype.destroy.call(this);
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets all the list items bound on this component.
     *
     * @returns {Element[]}
     */
    DropDownList.prototype.getItems = function () {
        if (!this.list) {
            if (this.dataSource instanceof DataManager) {
                this.initialRemoteRender = true;
            }
            this.renderList();
        }
        return this.ulElement ? _super.prototype.getItems.call(this) : [];
    };
    /**
     * Gets the data Object that matches the given value.
     *
     * @param { string | number } value - Specifies the value of the list item.
     * @returns {Object}
     */
    DropDownList.prototype.getDataByValue = function (value) {
        return _super.prototype.getDataByValue.call(this, value);
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Allows you to clear the selected values from the component.
     *
     * @returns {void}
     */
    DropDownList.prototype.clear = function () {
        this.value = null;
    };
    __decorate([
        Property(null)
    ], DropDownList.prototype, "cssClass", void 0);
    __decorate([
        Property('100%')
    ], DropDownList.prototype, "width", void 0);
    __decorate([
        Property(true)
    ], DropDownList.prototype, "enabled", void 0);
    __decorate([
        Property(false)
    ], DropDownList.prototype, "enablePersistence", void 0);
    __decorate([
        Property('300px')
    ], DropDownList.prototype, "popupHeight", void 0);
    __decorate([
        Property('100%')
    ], DropDownList.prototype, "popupWidth", void 0);
    __decorate([
        Property(null)
    ], DropDownList.prototype, "placeholder", void 0);
    __decorate([
        Property(null)
    ], DropDownList.prototype, "filterBarPlaceholder", void 0);
    __decorate([
        Property({})
    ], DropDownList.prototype, "htmlAttributes", void 0);
    __decorate([
        Property(null)
    ], DropDownList.prototype, "query", void 0);
    __decorate([
        Property(null)
    ], DropDownList.prototype, "valueTemplate", void 0);
    __decorate([
        Property(null)
    ], DropDownList.prototype, "headerTemplate", void 0);
    __decorate([
        Property(null)
    ], DropDownList.prototype, "footerTemplate", void 0);
    __decorate([
        Property(false)
    ], DropDownList.prototype, "allowFiltering", void 0);
    __decorate([
        Property(true)
    ], DropDownList.prototype, "isDeviceFullScreen", void 0);
    __decorate([
        Property(false)
    ], DropDownList.prototype, "readonly", void 0);
    __decorate([
        Property(false)
    ], DropDownList.prototype, "enableVirtualization", void 0);
    __decorate([
        Property(false)
    ], DropDownList.prototype, "allowResize", void 0);
    __decorate([
        Property(null)
    ], DropDownList.prototype, "text", void 0);
    __decorate([
        Property(null)
    ], DropDownList.prototype, "value", void 0);
    __decorate([
        Property(false)
    ], DropDownList.prototype, "allowObjectBinding", void 0);
    __decorate([
        Property(null)
    ], DropDownList.prototype, "index", void 0);
    __decorate([
        Property('Never')
    ], DropDownList.prototype, "floatLabelType", void 0);
    __decorate([
        Property(false)
    ], DropDownList.prototype, "showClearButton", void 0);
    __decorate([
        Event()
    ], DropDownList.prototype, "filtering", void 0);
    __decorate([
        Event()
    ], DropDownList.prototype, "change", void 0);
    __decorate([
        Event()
    ], DropDownList.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], DropDownList.prototype, "open", void 0);
    __decorate([
        Event()
    ], DropDownList.prototype, "close", void 0);
    __decorate([
        Event()
    ], DropDownList.prototype, "blur", void 0);
    __decorate([
        Event()
    ], DropDownList.prototype, "focus", void 0);
    __decorate([
        Event()
    ], DropDownList.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], DropDownList.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], DropDownList.prototype, "resizeStart", void 0);
    DropDownList = __decorate([
        NotifyPropertyChanges
    ], DropDownList);
    return DropDownList;
}(DropDownBase));
export { DropDownList };
