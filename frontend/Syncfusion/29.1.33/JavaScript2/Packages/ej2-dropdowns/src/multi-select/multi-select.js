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
import { DropDownBase, dropDownBaseClasses } from '../drop-down-base/drop-down-base';
import { FieldSettings } from '../drop-down-base/drop-down-base';
import { isCollide, Popup, createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { Input } from '@syncfusion/ej2-inputs';
import { attributes, setValue, getValue } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, extend } from '@syncfusion/ej2-base';
import { EventHandler, Property, Event, compile, L10n } from '@syncfusion/ej2-base';
import { Animation, Browser, prepend, Complex } from '@syncfusion/ej2-base';
import { Search } from '../common/incremental-search';
import { append, addClass, removeClass, closest, detach, remove, select, selectAll } from '@syncfusion/ej2-base';
import { getUniqueID, formatUnit, isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';
import { DataManager, Query, Predicate, JsonAdaptor } from '@syncfusion/ej2-data';
import { createFloatLabel, removeFloating, floatLabelFocus, floatLabelBlur, encodePlaceholder } from './float-label';
var FOCUS = 'e-input-focus';
var DISABLED = 'e-disabled';
var OVER_ALL_WRAPPER = 'e-multiselect e-input-group e-control-wrapper';
var ELEMENT_WRAPPER = 'e-multi-select-wrapper';
var ELEMENT_MOBILE_WRAPPER = 'e-mob-wrapper';
var HIDE_LIST = 'e-hide-listitem';
var DELIMITER_VIEW = 'e-delim-view';
var CHIP_WRAPPER = 'e-chips-collection';
var CHIP = 'e-chips';
var CHIP_CONTENT = 'e-chipcontent';
var CHIP_CLOSE = 'e-chips-close';
var CHIP_SELECTED = 'e-chip-selected';
var SEARCHBOX_WRAPPER = 'e-searcher';
var DELIMITER_VIEW_WRAPPER = 'e-delimiter';
var ZERO_SIZE = 'e-zero-size';
var REMAIN_WRAPPER = 'e-remain';
var CLOSEICON_CLASS = 'e-chips-close e-close-hooker';
var DELIMITER_WRAPPER = 'e-delim-values';
var POPUP_WRAPPER = 'e-ddl e-popup e-multi-select-list-wrapper';
var INPUT_ELEMENT = 'e-dropdownbase';
var RTL_CLASS = 'e-rtl';
var CLOSE_ICON_HIDE = 'e-close-icon-hide';
var MOBILE_CHIP = 'e-mob-chip';
var FOOTER = 'e-ddl-footer';
var HEADER = 'e-ddl-header';
var DISABLE_ICON = 'e-ddl-disable-icon';
var SPINNER_CLASS = 'e-ms-spinner-icon';
var HIDDEN_ELEMENT = 'e-multi-hidden';
var destroy = 'destroy';
var dropdownIcon = 'e-input-group-icon e-ddl-icon';
var iconAnimation = 'e-icon-anim';
var TOTAL_COUNT_WRAPPER = 'e-delim-total';
var BOX_ELEMENT = 'e-multiselect-box';
var FILTERPARENT = 'e-filter-parent';
var CUSTOM_WIDTH = 'e-search-custom-width';
var FILTERINPUT = 'e-input-filter';
var RESIZE_ICON = 'e-resizer-right e-icons';
/**
 * The Multiselect allows the user to pick a more than one value from list of predefined values.
 * ```html
 * <select id="list">
 *      <option value='1'>Badminton</option>
 *      <option value='2'>Basketball</option>
 *      <option value='3'>Cricket</option>
 *      <option value='4'>Football</option>
 *      <option value='5'>Tennis</option>
 * </select>
 * ```
 * ```typescript
 * <script>
 *   var multiselectObj = new Multiselect();
 *   multiselectObj.appendTo("#list");
 * </script>
 * ```
 */
var MultiSelect = /** @class */ (function (_super) {
    __extends(MultiSelect, _super);
    /**
     * Constructor for creating the DropDownList widget.
     *
     * @param {MultiSelectModel} option - Specifies the MultiSelect model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function MultiSelect(option, element) {
        var _this = _super.call(this, option, element) || this;
        _this.clearIconWidth = 0;
        _this.previousFilterText = '';
        _this.storedSelectAllHeight = 0;
        _this.isUpdateHeaderHeight = false;
        _this.isUpdateFooterHeight = false;
        _this.isBlurDispatching = false;
        _this.isFilterPrevented = false;
        _this.isFilteringAction = false;
        _this.isVirtualReorder = false;
        _this.isValidKey = false;
        _this.selectAllEventData = [];
        _this.selectAllEventEle = [];
        _this.preventSetCurrentData = false;
        _this.isSelectAllLoop = false;
        _this.scrollFocusStatus = false;
        _this.keyDownStatus = false;
        return _this;
    }
    MultiSelect.prototype.enableRTL = function (state) {
        if (state) {
            this.overAllWrapper.classList.add(RTL_CLASS);
        }
        else {
            this.overAllWrapper.classList.remove(RTL_CLASS);
        }
        if (this.popupObj) {
            this.popupObj.enableRtl = state;
            this.popupObj.dataBind();
        }
    };
    MultiSelect.prototype.requiredModules = function () {
        var modules = [];
        if (this.enableVirtualization) {
            modules.push({ args: [this], member: 'VirtualScroll' });
        }
        if (this.mode === 'CheckBox') {
            this.isGroupChecking = this.enableGroupCheckBox;
            if (this.enableGroupCheckBox) {
                var prevOnChange = this.isProtectedOnChange;
                this.isProtectedOnChange = true;
                this.enableSelectionOrder = false;
                this.isProtectedOnChange = prevOnChange;
            }
            this.allowCustomValue = false;
            this.hideSelectedItem = false;
            this.closePopupOnSelect = false;
            modules.push({
                member: 'CheckBoxSelection',
                args: [this]
            });
        }
        return modules;
    };
    MultiSelect.prototype.updateHTMLAttribute = function () {
        if (Object.keys(this.htmlAttributes).length) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var htmlAttr = _a[_i];
                switch (htmlAttr) {
                    case 'class': {
                        var updatedClassValue = (this.htmlAttributes["" + htmlAttr].replace(/\s+/g, ' ')).trim();
                        if (updatedClassValue !== '') {
                            addClass([this.overAllWrapper], updatedClassValue.split(' '));
                            addClass([this.popupWrapper], updatedClassValue.split(' '));
                        }
                        break;
                    }
                    case 'disabled':
                        this.enable(false);
                        break;
                    case 'placeholder':
                        if (!this.placeholder) {
                            this.inputElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                            this.setProperties({ placeholder: this.inputElement.placeholder }, true);
                            this.refreshPlaceHolder();
                        }
                        break;
                    default: {
                        var defaultAttr = ['id'];
                        var validateAttr = ['name', 'required', 'aria-required', 'form'];
                        var containerAttr = ['title', 'role', 'style', 'class'];
                        if (defaultAttr.indexOf(htmlAttr) > -1) {
                            this.element.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                        }
                        else if (htmlAttr.indexOf('data') === 0 || validateAttr.indexOf(htmlAttr) > -1) {
                            this.hiddenElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                        }
                        else if (containerAttr.indexOf(htmlAttr) > -1) {
                            this.overAllWrapper.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                        }
                        else if (htmlAttr !== 'size' && !isNullOrUndefined(this.inputElement)) {
                            this.inputElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                        }
                        break;
                    }
                }
            }
        }
    };
    MultiSelect.prototype.updateReadonly = function (state) {
        if (!isNullOrUndefined(this.inputElement)) {
            if (state || this.mode === 'CheckBox') {
                this.inputElement.setAttribute('readonly', 'true');
            }
            else {
                this.inputElement.removeAttribute('readonly');
            }
        }
    };
    MultiSelect.prototype.updateClearButton = function (state) {
        if (state) {
            if (this.overAllClear.parentNode) {
                this.overAllClear.style.display = '';
            }
            else {
                this.componentWrapper.appendChild(this.overAllClear);
            }
            this.componentWrapper.classList.remove(CLOSE_ICON_HIDE);
        }
        else {
            this.overAllClear.style.display = 'none';
            this.componentWrapper.classList.add(CLOSE_ICON_HIDE);
        }
    };
    MultiSelect.prototype.updateCssClass = function () {
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            var updatedCssClassValues = this.cssClass;
            updatedCssClassValues = (this.cssClass.replace(/\s+/g, ' ')).trim();
            if (updatedCssClassValues !== '') {
                addClass([this.overAllWrapper], updatedCssClassValues.split(' '));
                addClass([this.popupWrapper], updatedCssClassValues.split(' '));
            }
        }
    };
    MultiSelect.prototype.updateOldPropCssClass = function (oldClass) {
        if (!isNullOrUndefined(oldClass) && oldClass !== '') {
            oldClass = (oldClass.replace(/\s+/g, ' ')).trim();
            if (oldClass !== '') {
                removeClass([this.overAllWrapper], oldClass.split(' '));
                removeClass([this.popupWrapper], oldClass.split(' '));
            }
        }
    };
    MultiSelect.prototype.onPopupShown = function (e) {
        var _this = this;
        if (Browser.isDevice && (this.mode === 'CheckBox' && this.allowFiltering)) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var proxy_1 = this;
            window.onpopstate = function () {
                proxy_1.hidePopup();
                proxy_1.inputElement.focus();
            };
            history.pushState({}, '');
        }
        var animModel = { name: 'FadeIn', duration: 100 };
        var eventArgs = { popup: this.popupObj, event: e, cancel: false, animation: animModel };
        this.trigger('open', eventArgs, function (eventArgs) {
            if (!eventArgs.cancel) {
                _this.focusAtFirstListItem(true);
                if (_this.popupObj) {
                    document.body.appendChild(_this.popupObj.element);
                }
                if (_this.mode === 'CheckBox' && _this.enableGroupCheckBox && !isNullOrUndefined(_this.fields.groupBy)) {
                    _this.updateListItems(_this.list.querySelectorAll('li.e-list-item'), _this.mainList.querySelectorAll('li.e-list-item'));
                }
                if (_this.mode === 'CheckBox' || _this.showDropDownIcon) {
                    addClass([_this.overAllWrapper], [iconAnimation]);
                }
                _this.refreshPopup();
                _this.renderReactTemplates();
                if (_this.popupObj) {
                    _this.popupObj.show(eventArgs.animation, (_this.zIndex === 1000) ? _this.element : null);
                }
                if (_this.isReact) {
                    setTimeout(function () {
                        if (_this.popupHeight && _this.list && _this.popupHeight !== 'auto') {
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
                attributes(_this.inputElement, {
                    'aria-expanded': 'true', 'aria-owns': _this.element.id + '_popup', 'aria-controls': _this.element.id
                });
                _this.updateAriaActiveDescendant();
                if (_this.isFirstClick) {
                    if (!_this.enableVirtualization) {
                        _this.loadTemplate();
                    }
                }
                if (_this.mode === 'CheckBox' && _this.showSelectAll) {
                    EventHandler.add(_this.popupObj.element, 'click', _this.clickHandler, _this);
                }
            }
        });
    };
    MultiSelect.prototype.updateVirtualReOrderList = function (isCheckBoxUpdate) {
        var query = this.getForQuery(this.value, true).clone();
        this.isVirtualReorder = true;
        if (this.enableVirtualization && this.dataSource instanceof DataManager) {
            this.resetList(this.selectedListData, this.fields, query);
        }
        else {
            this.resetList(this.dataSource, this.fields, query);
        }
        this.isVirtualReorder = false;
        this.UpdateSkeleton();
        this.liCollections = this.list.querySelectorAll('.' + dropDownBaseClasses.li);
        this.virtualItemCount = this.itemCount;
        if (this.mode !== 'CheckBox') {
            this.totalItemCount = this.value && this.value.length ? this.totalItemCount - this.value.length : this.totalItemCount;
        }
        if (!this.list.querySelector('.e-virtual-ddl')) {
            var virualElement = this.createElement('div', {
                id: this.element.id + '_popup',
                className: 'e-virtual-ddl'
            });
            virualElement.style.cssText = this.GetVirtualTrackHeight();
            this.popupWrapper.querySelector('.e-dropdownbase').appendChild(virualElement);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.list.getElementsByClassName('e-virtual-ddl')[0].style = this.GetVirtualTrackHeight();
        }
        if (this.list.querySelector('.e-virtual-ddl-content')) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = this.getTransformValues();
        }
        if (isCheckBoxUpdate) {
            this.loadTemplate();
        }
    };
    MultiSelect.prototype.updateListItems = function (listItems, mainListItems) {
        for (var i = 0; i < listItems.length; i++) {
            this.findGroupStart(listItems[i]);
            this.findGroupStart(mainListItems[i]);
        }
        this.deselectHeader();
    };
    MultiSelect.prototype.loadTemplate = function () {
        this.refreshListItems(null);
        if (this.enableVirtualization && this.list && this.mode === 'CheckBox') {
            var reOrderList = this.list.querySelectorAll('.e-reorder')[0];
            if (this.list.querySelector('.e-virtual-ddl-content') && reOrderList) {
                this.list.querySelector('.e-virtual-ddl-content').removeChild(reOrderList);
            }
        }
        if (this.mode === 'CheckBox') {
            this.removeFocus();
        }
        this.notify('reOrder', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox', e: this });
        this.isPreventScrollAction = true;
    };
    MultiSelect.prototype.setScrollPosition = function () {
        if (((!this.hideSelectedItem && this.mode !== 'CheckBox') || (this.mode === 'CheckBox' && !this.enableSelectionOrder)) &&
            (!isNullOrUndefined(this.value) && (this.value.length > 0))) {
            var value = this.allowObjectBinding
                ? getValue((this.fields.value) ? this.fields.value : '', this.value[this.value.length - 1])
                : this.value[this.value.length - 1];
            var valueEle = this.findListElement((this.hideSelectedItem ? this.ulElement : this.list), 'li', 'data-value', value);
            if (!isNullOrUndefined(valueEle)) {
                this.scrollBottom(valueEle, undefined, false, null, true);
            }
        }
        if (this.enableVirtualization) {
            var focusedItem = this.list.querySelector('.' + dropDownBaseClasses.focus);
            this.isKeyBoardAction = false;
            this.scrollBottom(focusedItem, undefined, false, null, true);
        }
    };
    MultiSelect.prototype.focusAtFirstListItem = function (isOpen) {
        if (this.ulElement && this.ulElement.querySelector('li.'
            + dropDownBaseClasses.li)) {
            var element = void 0;
            if (this.mode === 'CheckBox') {
                this.removeFocus();
                return;
            }
            else {
                if (this.enableVirtualization) {
                    if (this.fields.disabled) {
                        element = this.ulElement.querySelector('li.'
                            + dropDownBaseClasses.li + ':not(.e-virtual-list)' + ':not(.e-hide-listitem)' + ':not(.' + DISABLED + ')');
                        if (isOpen && this.viewPortInfo && this.viewPortInfo.startIndex !== 0) {
                            var elements = this.ulElement.querySelectorAll('li.' + dropDownBaseClasses.li + ':not(.e-virtual-list)' + ':not(.e-hide-listitem)');
                            element = elements && elements.length > 0 ? elements[2] : element;
                        }
                    }
                    else {
                        element = this.ulElement.querySelector('li.'
                            + dropDownBaseClasses.li + ':not(.e-virtual-list)' + ':not(.e-hide-listitem)');
                        if (isOpen && this.viewPortInfo && this.viewPortInfo.startIndex !== 0) {
                            var elements = this.ulElement.querySelectorAll('li.' + dropDownBaseClasses.li + ':not(.e-virtual-list)' + ':not(.e-hide-listitem)');
                            element = elements && elements.length > 0 ? elements[2] : element;
                        }
                    }
                }
                else {
                    if (this.fields.disabled) {
                        element = this.ulElement.querySelector('li.'
                            + dropDownBaseClasses.li + ':not(.'
                            + HIDE_LIST + ')' + ':not(.' + DISABLED + ')');
                    }
                    else {
                        element = this.ulElement.querySelector('li.'
                            + dropDownBaseClasses.li + ':not(.'
                            + HIDE_LIST + ')');
                    }
                }
            }
            if (element !== null) {
                this.removeFocus();
                this.addListFocus(element);
            }
        }
    };
    MultiSelect.prototype.focusAtLastListItem = function (data) {
        var activeElement;
        if (data) {
            activeElement = Search(data, this.liCollections, 'StartsWith', this.ignoreCase);
        }
        else {
            if (this.value && this.value.length) {
                var value = this.allowObjectBinding
                    ? getValue((this.fields.value) ? this.fields.value : '', this.value[this.value.length - 1])
                    : this.value[this.value.length - 1];
                Search(value, this.liCollections, 'StartsWith', this.ignoreCase);
            }
            else {
                activeElement = null;
            }
        }
        if (activeElement && activeElement.item !== null) {
            this.addListFocus(activeElement.item);
            if (((this.allowCustomValue || this.allowFiltering) && this.isPopupOpen() &&
                this.closePopupOnSelect && !this.enableVirtualization) || this.closePopupOnSelect && !this.enableVirtualization) {
                this.scrollBottom(activeElement.item, activeElement.index);
            }
        }
    };
    MultiSelect.prototype.getAriaAttributes = function () {
        var ariaAttributes = {
            'aria-disabled': 'false',
            'role': 'combobox',
            'aria-expanded': 'false'
        };
        return ariaAttributes;
    };
    MultiSelect.prototype.updateListARIA = function () {
        if (!isNullOrUndefined(this.ulElement)) {
            attributes(this.ulElement, {
                'id': this.element.id + '_options',
                'role': 'listbox',
                'aria-hidden': 'false',
                'aria-label': 'list'
            });
        }
        var disableStatus = !isNullOrUndefined(this.inputElement) && (this.inputElement.disabled) ? true : false;
        if (!this.isPopupOpen() && !isNullOrUndefined(this.inputElement)) {
            attributes(this.inputElement, this.getAriaAttributes());
        }
        if (disableStatus) {
            attributes(this.inputElement, { 'aria-disabled': 'true' });
        }
        this.ensureAriaDisabled((disableStatus) ? 'true' : 'false');
    };
    MultiSelect.prototype.ensureAriaDisabled = function (status) {
        if (this.htmlAttributes && this.htmlAttributes['aria-disabled']) {
            var attr = this.htmlAttributes;
            extend(attr, { 'aria-disabled': status }, attr);
            this.setProperties({ htmlAttributes: attr }, true);
        }
    };
    MultiSelect.prototype.removelastSelection = function (e) {
        var selectedElem = this.chipCollectionWrapper.querySelector('span.' + CHIP_SELECTED);
        if (selectedElem !== null) {
            this.removeSelectedChip(e);
            return;
        }
        var elements = this.chipCollectionWrapper.querySelectorAll('span.' + CHIP);
        var value = elements[elements.length - 1].getAttribute('data-value');
        if (!isNullOrUndefined(this.value)) {
            this.tempValues = this.allowObjectBinding ? this.value.slice() : this.value.slice();
        }
        var customValue = this.allowObjectBinding ?
            this.getDataByValue(this.getFormattedValue(value)) : this.getFormattedValue(value);
        if (this.allowCustomValue && (value !== 'false' && customValue === false || (!isNullOrUndefined(customValue) &&
            customValue.toString() === 'NaN'))) {
            customValue = value;
        }
        this.removeValue(customValue, e);
        this.removeChipSelection();
        this.updateDelimeter(this.delimiterChar, e);
        this.makeTextBoxEmpty();
        if (this.mainList && this.listData) {
            this.refreshSelection();
        }
        this.checkPlaceholderSize();
    };
    MultiSelect.prototype.onActionFailure = function (e) {
        _super.prototype.onActionFailure.call(this, e);
        this.renderPopup();
        this.onPopupShown();
    };
    MultiSelect.prototype.targetElement = function () {
        this.targetInputElement = this.inputElement;
        if (this.mode === 'CheckBox' && this.allowFiltering) {
            this.notify('targetElement', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox' });
        }
        return this.targetInputElement.value;
    };
    MultiSelect.prototype.getForQuery = function (valuecheck, isCheckbox) {
        var predicate;
        var field = this.isPrimitiveData ? '' : this.fields.value;
        if (this.enableVirtualization && valuecheck) {
            if (isCheckbox) {
                var startindex = this.viewPortInfo.startIndex;
                var endindex = (((startindex + this.viewPortInfo.endIndex) <= (valuecheck.length)) &&
                    valuecheck[(startindex + this.viewPortInfo.endIndex)]) ? (startindex + this.viewPortInfo.endIndex)
                    : (valuecheck.length);
                for (var i = startindex; i < endindex; i++) {
                    var value = this.allowObjectBinding ? getValue((this.fields.value) ?
                        this.fields.value : '', valuecheck[i]) : valuecheck[i];
                    if (i === startindex) {
                        predicate = new Predicate(field, 'equal', (value));
                    }
                    else {
                        predicate = predicate.or(field, 'equal', (value));
                    }
                }
                return new Query().where(predicate);
            }
            else {
                for (var i = 0; i < valuecheck.length; i++) {
                    var value = this.allowObjectBinding ? getValue((this.fields.value) ?
                        this.fields.value : '', valuecheck[i]) : valuecheck[i];
                    if (this.isaddNonPresentItems) {
                        predicate = i === 0 ? new Predicate(field, 'equal', valuecheck[i])
                            : predicate.or(field, 'equal', valuecheck[i]);
                    }
                    else {
                        predicate = i === 0 ? predicate = new Predicate(field, 'notequal', (value))
                            : predicate.and(field, 'notequal', (value));
                    }
                }
                return new Query().where(predicate);
            }
        }
        else {
            for (var i = 0; i < valuecheck.length; i++) {
                if (i === 0) {
                    predicate = new Predicate(field, 'equal', valuecheck[i]);
                }
                else {
                    predicate = predicate.or(field, 'equal', valuecheck[i]);
                }
            }
        }
        if (this.dataSource instanceof DataManager && this.dataSource.adaptor instanceof JsonAdaptor) {
            return new Query().where(predicate);
        }
        else {
            return this.getQuery(this.query).clone().where(predicate);
        }
    };
    /* eslint-disable @typescript-eslint/no-unused-vars */
    MultiSelect.prototype.onActionComplete = function (ulElement, list, e, isUpdated) {
        var _this = this;
        if (this.dataSource instanceof DataManager && !isNullOrUndefined(e) && !this.virtualGroupDataSource) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.totalItemCount = e.count;
        }
        if (this.value && list && list.length > 0 && this.allowFiltering && this.mode !== 'CheckBox' && !this.enableVirtualization && !this.isFilterPrevented && !this.allowCustomValue && this.isFilteringAction) {
            var allItemsInValue = list.every(function (item) {
                var itemValue = getValue((_this.fields.value) ? _this.fields.value : '', item);
                return _this.value.some(function (val) {
                    var value = _this.allowObjectBinding ? getValue((_this.fields.value) ? _this.fields.value : '', val) : val;
                    return itemValue === value;
                });
            });
            if (allItemsInValue) {
                ulElement.innerHTML = '';
                list = [];
            }
        }
        /* eslint-enable @typescript-eslint/no-unused-vars */
        _super.prototype.onActionComplete.call(this, ulElement, list, e);
        this.skeletonCount = this.totalItemCount !== 0 && this.totalItemCount < (this.itemCount * 2) &&
            ((!(this.dataSource instanceof DataManager)) ||
                ((this.dataSource instanceof DataManager) && (this.totalItemCount <= this.itemCount))) ? 0 : this.skeletonCount;
        this.updateSelectElementData(this.allowFiltering);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        if (!isNullOrUndefined(this.value) && !this.allowCustomValue && !this.enableVirtualization &&
            this.listData && this.listData.length > 0) {
            for (var i = 0; i < this.value.length; i++) {
                var value = this.allowObjectBinding ? getValue((this.fields.value) ?
                    this.fields.value : '', proxy.value[i]) : proxy.value[i];
                var checkEle = this.findListElement(((this.allowFiltering && !isNullOrUndefined(this.mainList)) ? this.mainList : ulElement), 'li', 'data-value', value);
                if (!checkEle && !(this.dataSource instanceof DataManager)) {
                    this.value.splice(i, 1);
                    i -= 1;
                }
            }
        }
        var valuecheck = [];
        if (!isNullOrUndefined(this.value)) {
            valuecheck = this.presentItemValue(this.ulElement);
        }
        if (valuecheck.length > 0 && this.dataSource instanceof DataManager && !isNullOrUndefined(this.value)
            && this.listData != null) {
            this.isaddNonPresentItems = true;
            this.addNonPresentItems(valuecheck, this.ulElement, this.listData);
            this.isaddNonPresentItems = false;
        }
        else {
            this.updateActionList(ulElement, list, e);
        }
        if (this.dataSource instanceof DataManager && this.allowCustomValue && !this.isCustomRendered &&
            this.inputElement.value && this.inputElement.value !== '') {
            var query = new Query();
            query = this.allowFiltering ? query.where(this.fields.text, 'startswith', this.inputElement.value, this.ignoreCase, this.ignoreAccent) : query;
            this.checkForCustomValue(query, this.fields);
            this.isCustomRendered = true;
            this.remoteCustomValue = this.enableVirtualization ? false : this.remoteCustomValue;
        }
        if (this.mode === 'CheckBox' && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy) && !isNullOrUndefined(this.fields.disabled)) {
            this.disableGroupHeader();
        }
        if (this.dataSource instanceof DataManager && this.mode === 'CheckBox' && this.allowFiltering) {
            this.removeFocus();
        }
    };
    /* eslint-disable @typescript-eslint/no-unused-vars */
    MultiSelect.prototype.updateActionList = function (ulElement, list, e, isUpdated) {
        /* eslint-enable @typescript-eslint/no-unused-vars */
        if (this.mode === 'CheckBox' && this.showSelectAll) {
            this.notify('selectAll', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox' });
        }
        if (!this.mainList && !this.mainData) {
            this.mainList = ulElement.cloneNode ? ulElement.cloneNode(true) : ulElement;
            this.mainData = list;
            this.mainListCollection = this.liCollections;
        }
        else if (isNullOrUndefined(this.mainData) || this.mainData.length === 0) {
            this.mainData = list;
        }
        if ((this.remoteCustomValue || list.length <= 0) && this.allowCustomValue && this.inputFocus && this.allowFiltering &&
            this.inputElement.value && this.inputElement.value !== '') {
            this.checkForCustomValue(this.tempQuery, this.fields);
            if (this.isCustomRendered) {
                return;
            }
        }
        if (this.value && this.value.length && ((this.mode !== 'CheckBox' && !isNullOrUndefined(this.inputElement) &&
            this.inputElement.value.trim() !== '') ||
            this.mode === 'CheckBox' || ((this.keyCode === 8 || this.keyCode === 46) && this.allowFiltering &&
            this.allowCustomValue && this.dataSource instanceof DataManager && this.inputElement.value === ''))) {
            this.refreshSelection();
        }
        this.updateListARIA();
        this.unwireListEvents();
        this.wireListEvents();
        if (!isNullOrUndefined(this.setInitialValue)) {
            this.setInitialValue();
        }
        if (!isNullOrUndefined(this.selectAllAction)) {
            this.selectAllAction();
        }
        if (this.setDynValue) {
            if (!isNullOrUndefined(this.text) && (isNullOrUndefined(this.value) || this.value.length === 0)) {
                this.initialTextUpdate();
            }
            if (!this.enableVirtualization || (this.enableVirtualization && (!(this.dataSource instanceof DataManager)))) {
                this.initialValueUpdate();
            }
            else {
                this.initialValueUpdate(this.listData, true);
            }
            this.initialUpdate();
            this.refreshPlaceHolder();
            if (this.mode !== 'CheckBox' && this.changeOnBlur) {
                this.updateValueState(null, this.value, null);
            }
        }
        this.renderPopup();
        if (this.beforePopupOpen) {
            this.beforePopupOpen = false;
            this.onPopupShown(e);
        }
    };
    MultiSelect.prototype.refreshSelection = function () {
        var value;
        var element;
        var className = this.hideSelectedItem ?
            HIDE_LIST :
            dropDownBaseClasses.selected;
        if (!isNullOrUndefined(this.value)) {
            for (var index = 0; !isNullOrUndefined(this.value[index]); index++) {
                value = this.allowObjectBinding ? getValue((this.fields.value) ? this.fields.value : '', this.value[index]) :
                    this.value[index];
                element = this.findListElement(this.list, 'li', 'data-value', value);
                if (element) {
                    addClass([element], className);
                    if (this.hideSelectedItem && element.previousSibling
                        && element.previousElementSibling.classList.contains(dropDownBaseClasses.group)
                        && (!element.nextElementSibling ||
                            element.nextElementSibling.classList.contains(dropDownBaseClasses.group))) {
                        addClass([element.previousElementSibling], className);
                    }
                    if (this.hideSelectedItem && this.fields.groupBy && !element.previousElementSibling.classList.contains(HIDE_LIST)) {
                        this.hideGroupItem(value);
                    }
                    if (this.hideSelectedItem && element.classList.contains(dropDownBaseClasses.focus)) {
                        removeClass([element], dropDownBaseClasses.focus);
                        var listEle = element.parentElement.querySelectorAll('.' +
                            dropDownBaseClasses.li + ':not(.' + HIDE_LIST + ')' + ':not(.' + DISABLED + ')');
                        if (listEle.length > 0) {
                            addClass([listEle[0]], dropDownBaseClasses.focus);
                            this.updateAriaActiveDescendant();
                        }
                        else {
                            //EJ2-57588 - for this task, we prevent the ul element cloning ( this.ulElement = this.ulElement.cloneNode ? <HTMLElement>this.ulElement.cloneNode(true) : this.ulElement;)
                            if (!(this.list && this.list.querySelectorAll('.' + dropDownBaseClasses.li).length > 0)) {
                                this.l10nUpdate();
                                addClass([this.list], dropDownBaseClasses.noData);
                            }
                        }
                    }
                    element.setAttribute('aria-selected', 'true');
                    if (this.mode === 'CheckBox' && element.classList.contains('e-active')) {
                        var ariaValue = element.getElementsByClassName('e-check').length;
                        if (ariaValue === 0) {
                            var args = {
                                module: 'CheckBoxSelection',
                                enable: this.mode === 'CheckBox',
                                li: element,
                                e: null
                            };
                            this.notify('updatelist', args);
                        }
                    }
                }
            }
        }
        this.checkSelectAll();
        this.checkMaxSelection();
    };
    MultiSelect.prototype.hideGroupItem = function (value) {
        var element;
        var element1;
        var className = this.hideSelectedItem ?
            HIDE_LIST :
            dropDownBaseClasses.selected;
        element1 = element = this.findListElement(this.ulElement, 'li', 'data-value', value);
        var i = 0;
        var j = 0;
        var temp = true;
        var temp1 = true;
        do {
            if (element && element.previousElementSibling
                && (!element.previousElementSibling.classList.contains(HIDE_LIST) &&
                    element.previousElementSibling.classList.contains(dropDownBaseClasses.li))) {
                temp = false;
            }
            if (!temp || !element || (element.previousElementSibling
                && element.previousElementSibling.classList.contains(dropDownBaseClasses.group))) {
                i = 10;
            }
            else {
                element = element.previousElementSibling;
            }
            if (element1 && element1.nextElementSibling
                && (!element1.nextElementSibling.classList.contains(HIDE_LIST) &&
                    element1.nextElementSibling.classList.contains(dropDownBaseClasses.li))) {
                temp1 = false;
            }
            if (!temp1 || !element1 || (element1.nextElementSibling
                && element1.nextElementSibling.classList.contains(dropDownBaseClasses.group))) {
                j = 10;
            }
            else {
                element1 = element1.nextElementSibling;
            }
        } while (i < 10 || j < 10);
        if (temp && temp1 && !element.previousElementSibling.classList.contains(HIDE_LIST)) {
            addClass([element.previousElementSibling], className);
        }
        else if (temp && temp1 && element.previousElementSibling.classList.contains(HIDE_LIST)) {
            removeClass([element.previousElementSibling], className);
        }
    };
    MultiSelect.prototype.getValidLi = function () {
        var liElement = this.ulElement.querySelector('li.' + dropDownBaseClasses.li + ':not(.' + HIDE_LIST + ')');
        return (!isNullOrUndefined(liElement) ? liElement : this.liCollections[0]);
    };
    MultiSelect.prototype.checkSelectAll = function () {
        var groupItemLength = !isNullOrUndefined(this.fields.disabled) ? this.list.querySelectorAll('li.e-list-group-item.e-active:not(.e-disabled)').length : this.list.querySelectorAll('li.e-list-group-item.e-active').length;
        var listItem = this.list.querySelectorAll('li.e-list-item');
        var searchCount = this.enableVirtualization ? this.list.querySelectorAll('li.' + dropDownBaseClasses.li + ':not(.e-virtual-list)').length : !isNullOrUndefined(this.fields.disabled) ? this.list.querySelectorAll('li.' + dropDownBaseClasses.li + ':not(.e-disabled)').length : this.list.querySelectorAll('li.' + dropDownBaseClasses.li).length;
        var searchActiveCount = this.list.querySelectorAll('li.' + dropDownBaseClasses.selected).length;
        if (this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
            searchActiveCount = searchActiveCount - groupItemLength;
        }
        if ((!this.enableVirtualization && ((searchCount === searchActiveCount || searchActiveCount === this.maximumSelectionLength)
            && (this.mode === 'CheckBox' && this.showSelectAll))) || (this.enableVirtualization && this.mode === 'CheckBox' &&
            this.showSelectAll && this.virtualSelectAll && this.value && this.value.length === this.totalItemCount)) {
            this.notify('checkSelectAll', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox', value: 'check' });
        }
        else if ((searchCount !== searchActiveCount) && (this.mode === 'CheckBox' && this.showSelectAll) &&
            ((!this.enableVirtualization) || (this.enableVirtualization && !this.virtualSelectAll))) {
            this.notify('checkSelectAll', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox', value: 'uncheck' });
        }
        if (this.enableGroupCheckBox && this.fields.groupBy && !this.enableSelectionOrder) {
            for (var i = 0; i < listItem.length; i++) {
                this.findGroupStart(listItem[i]);
            }
            this.deselectHeader();
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MultiSelect.prototype.openClick = function (e) {
        if (!this.openOnClick && this.mode !== 'CheckBox' && !this.isPopupOpen()) {
            if (this.targetElement() !== '') {
                this.showPopup();
            }
            else {
                this.hidePopup(e);
            }
        }
        else if (!this.openOnClick && this.mode === 'CheckBox' && !this.isPopupOpen()) {
            this.showPopup();
        }
    };
    MultiSelect.prototype.keyUp = function (e) {
        if (this.mode === 'CheckBox' && !this.openOnClick) {
            var char = String.fromCharCode(e.keyCode);
            var isWordCharacter = char.match(/\w/);
            if (!isNullOrUndefined(isWordCharacter)) {
                this.isValidKey = true;
            }
        }
        this.isValidKey = (this.isPopupOpen() && e.keyCode === 8) || this.isValidKey;
        this.isValidKey = e.ctrlKey && e.keyCode === 86 ? false : this.isValidKey;
        if (this.isValidKey && this.inputElement) {
            this.isValidKey = false;
            this.expandTextbox();
            this.showOverAllClear();
            switch (e.keyCode) {
                default:
                    // For filtering works in mobile firefox
                    this.search(e);
            }
        }
    };
    /**
     * To filter the multiselect data from given data source by using query
     *
     * @param {Object[] | DataManager } dataSource - Set the data source to filter.
     * @param {Query} query - Specify the query to filter the data.
     * @param {FieldSettingsModel} fields - Specify the fields to map the column in the data table.
     * @returns {void}
     */
    MultiSelect.prototype.filter = function (dataSource, query, fields) {
        this.isFiltered = true;
        this.remoteFilterAction = true;
        this.dataUpdater(dataSource, query, fields);
    };
    MultiSelect.prototype.getQuery = function (query) {
        var filterQuery = query ? query.clone() : this.query ? this.query.clone() : new Query();
        if (this.isFiltered) {
            if ((this.enableVirtualization && !isNullOrUndefined(this.customFilterQuery))) {
                filterQuery = this.customFilterQuery.clone();
                return this.virtualFilterQuery(filterQuery);
            }
            else if (!this.enableVirtualization) {
                return filterQuery;
            }
        }
        if (this.filterAction) {
            if ((this.targetElement() !== null && !this.enableVirtualization) || (this.enableVirtualization &&
                this.targetElement() !== null && this.targetElement().trim() !== '')) {
                var dataType = this.typeOfData(this.dataSource).typeof;
                if (!(this.dataSource instanceof DataManager) && dataType === 'string' || dataType === 'number') {
                    filterQuery.where('', this.filterType, this.targetElement(), this.ignoreCase, this.ignoreAccent);
                }
                else if ((this.enableVirtualization && this.targetElement() !== '' && !this.isClearAllAction) || !this.enableVirtualization) {
                    var fields = this.fields;
                    filterQuery.where(!isNullOrUndefined(fields.text) ? fields.text : '', this.filterType, this.targetElement(), this.ignoreCase, this.ignoreAccent);
                }
            }
            if (this.enableVirtualization && (this.viewPortInfo.endIndex !== 0) && !this.virtualSelectAll) {
                return this.virtualFilterQuery(filterQuery);
            }
            if (this.virtualSelectAll) {
                return query ? query.take(this.maximumSelectionLength).requiresCount() : this.query ?
                    this.query.take(this.maximumSelectionLength).requiresCount() :
                    new Query().take(this.maximumSelectionLength).requiresCount();
            }
            return filterQuery;
        }
        else {
            if (this.enableVirtualization && (this.viewPortInfo.endIndex !== 0) && !this.virtualSelectAll) {
                return this.virtualFilterQuery(filterQuery);
            }
            if (this.virtualSelectAll) {
                return query ? query.take(this.maximumSelectionLength).requiresCount() : this.query ?
                    this.query.take(this.maximumSelectionLength).requiresCount() :
                    new Query().take(this.maximumSelectionLength).requiresCount();
            }
            return query ? query : this.query ? this.query : new Query();
        }
    };
    MultiSelect.prototype.virtualFilterQuery = function (filterQuery) {
        var takeValue = this.getTakeValue();
        var isReOrder = true;
        var isSkip = true;
        var isTake = true;
        for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
            if (this.getModuleName() === 'multiselect' && ((filterQuery.queries[queryElements].e &&
                filterQuery.queries[queryElements].e.condition === 'or') || (filterQuery.queries[queryElements].e &&
                filterQuery.queries[queryElements].e.operator === 'equal'))) {
                isReOrder = false;
            }
            if (filterQuery.queries[queryElements].fn === 'onSkip') {
                isSkip = false;
            }
            if (filterQuery.queries[queryElements].fn === 'onTake') {
                isTake = false;
            }
        }
        var queryTakeValue = 0;
        if (filterQuery && filterQuery.queries.length > 0) {
            for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
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
        if (filterQuery && filterQuery.queries.length > 0) {
            for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
                if (filterQuery.queries[queryElements].fn === 'onTake') {
                    queryTakeValue = filterQuery.queries[queryElements].e.nos <= queryTakeValue ?
                        queryTakeValue : filterQuery.queries[queryElements].e.nos;
                    filterQuery.queries.splice(queryElements, 1);
                    --queryElements;
                }
            }
        }
        if ((this.allowFiltering && isSkip) || !isReOrder || (!this.allowFiltering && isSkip) && !this.isVirtualReorder) {
            if (!isReOrder) {
                filterQuery.skip(this.viewPortInfo.startIndex);
            }
            else {
                filterQuery.skip(this.virtualItemStartIndex);
            }
        }
        if (this.isIncrementalRequest) {
            filterQuery.take(this.incrementalEndIndex);
        }
        else if (queryTakeValue > 0) {
            filterQuery.take(queryTakeValue);
        }
        else {
            filterQuery.take(takeValue);
        }
        filterQuery.requiresCount();
        this.customFilterQuery = null;
        return filterQuery;
    };
    MultiSelect.prototype.getTakeValue = function () {
        return this.allowFiltering && Browser.isDevice ? Math.round(window.outerHeight / this.listItemHeight) : this.itemCount;
    };
    MultiSelect.prototype.dataUpdater = function (dataSource, query, fields) {
        this.isDataFetched = false;
        var isNoData = this.list.classList.contains(dropDownBaseClasses.noData);
        if (this.targetElement().trim() === '') {
            var list = this.enableVirtualization ? this.list.cloneNode(true) : this.mainList.cloneNode ?
                this.mainList.cloneNode(true) : this.mainList;
            if (this.backCommand || (this.enableVirtualization && this.mode === 'CheckBox' && this.value && this.value.length > 0)) {
                this.remoteCustomValue = false;
                var isReordered = false;
                if (this.allowCustomValue && list.querySelectorAll('li').length === 0 && this.mainData.length > 0) {
                    this.mainData = [];
                }
                if (this.enableVirtualization) {
                    if (this.allowFiltering) {
                        this.isPreventScrollAction = true;
                        this.list.scrollTop = 0;
                        this.previousStartIndex = 0;
                        this.virtualListInfo = null;
                    }
                    if (this.value && this.value.length > 0 && this.mode === 'CheckBox') {
                        this.notify('setCurrentViewDataAsync', {
                            component: this.getModuleName(),
                            module: 'VirtualScroll'
                        });
                        isReordered = true;
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this.totalItemCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
                        this.resetList(dataSource, fields, query);
                        if (this.mode !== 'CheckBox') {
                            this.totalItemCount = this.value && this.value.length ? this.totalItemCount - this.value.length :
                                this.totalItemCount;
                        }
                        this.UpdateSkeleton();
                        if ((isNoData || this.allowCustomValue) && !this.list.classList.contains(dropDownBaseClasses.noData)) {
                            if (!this.list.querySelector('.e-virtual-ddl-content')) {
                                var contentElement = this.createElement('div', {
                                    className: 'e-virtual-ddl-content'
                                });
                                contentElement.style.cssText = this.getTransformValues();
                                this.list.appendChild(contentElement).appendChild(this.list.querySelector('.e-list-parent'));
                            }
                            if (!this.list.querySelector('.e-virtual-ddl')) {
                                var virualElement = this.createElement('div', {
                                    id: this.element.id + '_popup',
                                    className: 'e-virtual-ddl'
                                });
                                virualElement.style.cssText = this.GetVirtualTrackHeight();
                                document.getElementsByClassName('e-multi-select-list-wrapper')[0].querySelector('.e-dropdownbase').appendChild(virualElement);
                            }
                        }
                    }
                }
                this.onActionComplete(list, this.mainData);
                if (this.value && this.value.length) {
                    this.refreshSelection();
                }
                if (this.keyCode !== 8) {
                    this.focusAtFirstListItem();
                }
                if (!isReordered) {
                    this.notify('reOrder', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox', e: this });
                }
            }
        }
        else {
            if (this.enableVirtualization && this.allowFiltering) {
                this.isPreventScrollAction = true;
                this.list.scrollTop = 0;
                this.previousStartIndex = 0;
                this.virtualListInfo = null;
                if (this.list.querySelector('.e-list-parent' + '.e-reorder')) {
                    this.list.querySelector('.e-list-parent' + '.e-reorder').remove();
                }
            }
            this.resetList(dataSource, fields, query);
            if (this.enableVirtualization && (isNoData || this.allowCustomValue) &&
                !this.list.classList.contains(dropDownBaseClasses.noData)) {
                if (!this.list.querySelector('.e-virtual-ddl-content')) {
                    var contentElement = this.createElement('div', {
                        className: 'e-virtual-ddl-content'
                    });
                    contentElement.style.cssText = this.getTransformValues();
                    this.list.appendChild(contentElement).appendChild(this.list.querySelector('.e-list-parent'));
                }
                if (this.mode !== 'CheckBox') {
                    this.totalItemCount = this.value && this.value.length ? this.totalItemCount - this.value.length : this.totalItemCount;
                }
                if (!this.list.querySelector('.e-virtual-ddl')) {
                    var virualElement = this.createElement('div', {
                        id: this.element.id + '_popup',
                        className: 'e-virtual-ddl'
                    });
                    virualElement.style.cssText = this.GetVirtualTrackHeight();
                    document.getElementsByClassName('e-multi-select-list-wrapper')[0].querySelector('.e-dropdownbase').appendChild(virualElement);
                }
            }
            if (this.allowCustomValue) {
                if (!(dataSource instanceof DataManager)) {
                    this.checkForCustomValue(query, fields);
                }
                else {
                    this.remoteCustomValue = true;
                    this.tempQuery = query;
                }
            }
        }
        if (this.enableVirtualization && this.allowFiltering) {
            this.getFilteringSkeletonCount();
        }
        this.refreshPopup();
        if (this.allowResize) {
            this.setResize();
        }
        if (this.mode === 'CheckBox') {
            this.removeFocus();
        }
    };
    MultiSelect.prototype.checkForCustomValue = function (query, fields) {
        var dataChecks = !this.getValueByText(this.inputElement.value, this.ignoreCase);
        var field = fields ? fields : this.fields;
        if (this.allowCustomValue && dataChecks) {
            var value = this.inputElement.value;
            var customData = (!isNullOrUndefined(this.mainData) && this.mainData.length > 0) ?
                this.mainData[0] : this.mainData;
            if (customData && typeof (customData) !== 'string' && typeof (customData) !== 'number' && typeof (customData) !== 'boolean') {
                var dataItem_1 = {};
                setValue(field.text, value, dataItem_1);
                if (typeof getValue((this.fields.value ? this.fields.value : 'value'), customData)
                    === 'number' && this.fields.value !== this.fields.text) {
                    setValue(field.value, Math.random(), dataItem_1);
                }
                else {
                    setValue(field.value, value, dataItem_1);
                }
                var emptyObject_1 = {};
                if (this.allowObjectBinding) {
                    var keys = this.listData && this.listData.length > 0 ? Object.keys(this.listData[0]) : this.firstItem ?
                        Object.keys(this.firstItem) : Object.keys(dataItem_1);
                    // Create an empty object with predefined keys
                    keys.forEach(function (key) {
                        emptyObject_1[key] = ((key === fields.value) || (key === fields.text)) ?
                            getValue(fields.value, dataItem_1) : null;
                    });
                }
                dataItem_1 = this.allowObjectBinding ? emptyObject_1 : dataItem_1;
                if (this.enableVirtualization) {
                    this.virtualCustomData = dataItem_1;
                    var tempData = this.dataSource instanceof DataManager ?
                        JSON.parse(JSON.stringify(this.listData)) : JSON.parse(JSON.stringify(this.dataSource));
                    var totalData = [];
                    if (this.virtualCustomSelectData && this.virtualCustomSelectData.length > 0) {
                        totalData = tempData.concat(this.virtualCustomSelectData);
                    }
                    tempData.splice(0, 0, dataItem_1);
                    this.isCustomDataUpdated = true;
                    var tempCount = this.totalItemCount;
                    this.viewPortInfo.startIndex = this.virtualItemStartIndex = 0;
                    this.viewPortInfo.endIndex = this.virtualItemEndIndex = this.itemCount;
                    this.resetList(tempData, field, query);
                    this.isCustomDataUpdated = false;
                    this.totalItemCount = this.enableVirtualization && this.dataSource instanceof DataManager ?
                        tempCount : this.totalItemCount;
                }
                else {
                    if (this.dataSource instanceof DataManager && this.allowCustomValue && this.allowFiltering) {
                        this.remoteCustomValue = false;
                    }
                    var tempData = JSON.parse(JSON.stringify(this.listData));
                    tempData.splice(0, 0, dataItem_1);
                    this.resetList(tempData, field, query);
                }
            }
            else if (this.listData) {
                var tempData = JSON.parse(JSON.stringify(this.listData));
                tempData.splice(0, 0, this.inputElement.value);
                tempData[0] = (typeof customData === 'number' && !isNaN(parseFloat(tempData[0]))) ?
                    parseFloat(tempData[0]) : tempData[0];
                tempData[0] = (typeof customData === 'boolean') ?
                    (tempData[0] === 'true' ? true : (tempData[0] === 'false' ? false : tempData[0])) : tempData[0];
                this.resetList(tempData, field);
            }
        }
        else if (this.listData && this.mainData && !dataChecks && this.allowCustomValue) {
            if (this.allowFiltering && this.isRemoteSelection && this.remoteCustomValue) {
                this.isRemoteSelection = false;
                if (!this.enableVirtualization) {
                    this.resetList(this.listData, field, query);
                }
            }
            else if (!this.allowFiltering && this.list) {
                var liCollections = this.list.querySelectorAll('li.' + dropDownBaseClasses.li + ':not(.e-hide-listitem)');
                var activeElement = Search(this.targetElement(), liCollections, 'StartsWith', this.ignoreCase);
                if (activeElement && activeElement.item !== null) {
                    this.addListFocus(activeElement.item);
                }
            }
        }
        if (this.value && this.value.length) {
            this.refreshSelection();
        }
    };
    MultiSelect.prototype.getNgDirective = function () {
        return 'EJS-MULTISELECT';
    };
    MultiSelect.prototype.wrapperClick = function (e) {
        this.setDynValue = false;
        this.keyboardEvent = null;
        this.isKeyBoardAction = false;
        if (!this.enabled) {
            return;
        }
        if (e.target === this.overAllClear) {
            e.preventDefault();
            return;
        }
        if (!this.inputFocus) {
            this.inputElement.focus();
        }
        if (!this.readonly) {
            if (e.target && e.target.classList.toString().indexOf(CHIP_CLOSE) !== -1) {
                if (this.isPopupOpen()) {
                    this.refreshPopup();
                }
                return;
            }
            if (!this.isPopupOpen() &&
                (this.openOnClick || (this.showDropDownIcon && e.target && e.target.className === dropdownIcon))) {
                this.showPopup(e);
            }
            else {
                this.hidePopup(e);
                if (this.mode === 'CheckBox') {
                    this.showOverAllClear();
                    this.inputFocus = true;
                    if (!this.overAllWrapper.classList.contains(FOCUS)) {
                        this.overAllWrapper.classList.add(FOCUS);
                    }
                }
            }
        }
        if (!(this.targetElement() && this.targetElement() !== '')) {
            e.preventDefault();
        }
    };
    MultiSelect.prototype.enable = function (state) {
        if (state) {
            this.overAllWrapper.classList.remove(DISABLED);
            this.inputElement.removeAttribute('disabled');
            attributes(this.inputElement, { 'aria-disabled': 'false' });
            this.ensureAriaDisabled('false');
        }
        else {
            this.overAllWrapper.classList.add(DISABLED);
            this.inputElement.setAttribute('disabled', 'true');
            attributes(this.inputElement, { 'aria-disabled': 'true' });
            this.ensureAriaDisabled('true');
        }
        if (this.enabled !== state) {
            this.enabled = state;
        }
        this.hidePopup();
    };
    MultiSelect.prototype.onBlurHandler = function (eve, isDocClickFromCheck) {
        var target;
        if (this.isBlurDispatching && this.isAngular) {
            this.isBlurDispatching = false;
            return;
        }
        if (!isNullOrUndefined(eve)) {
            target = eve.relatedTarget;
        }
        if (this.popupObj && document.body.contains(this.popupObj.element) && this.popupObj.element.contains(target)) {
            if (this.mode !== 'CheckBox') {
                this.inputElement.focus();
            }
            else if ((this.floatLabelType === 'Auto' &&
                ((this.overAllWrapper.classList.contains('e-outline')) || (this.overAllWrapper.classList.contains('e-filled'))))) {
                addClass([this.overAllWrapper], 'e-valid-input');
            }
            return;
        }
        if (this.floatLabelType === 'Auto' && (this.overAllWrapper.classList.contains('e-outline')) && this.mode === 'CheckBox' &&
            ((isNullOrUndefined(this.value)) || this.value.length === 0)) {
            removeClass([this.overAllWrapper], 'e-valid-input');
        }
        if (this.mode === 'CheckBox' && Browser.isIE && !isNullOrUndefined(eve) && !isDocClickFromCheck) {
            this.inputFocus = false;
            this.overAllWrapper.classList.remove(FOCUS);
            return;
        }
        if (this.scrollFocusStatus) {
            if (!isNullOrUndefined(eve)) {
                eve.preventDefault();
            }
            this.inputElement.focus();
            this.scrollFocusStatus = false;
            return;
        }
        this.inputFocus = false;
        this.overAllWrapper.classList.remove(FOCUS);
        if (this.addTagOnBlur) {
            var dataChecks = this.getValueByText(this.inputElement.value, this.ignoreCase, this.ignoreAccent);
            var listLiElement = this.findListElement(this.list, 'li', 'data-value', dataChecks);
            var className = this.hideSelectedItem ? HIDE_LIST : dropDownBaseClasses.selected;
            var allowChipAddition = (listLiElement && !listLiElement.classList.contains(className)) ? true : false;
            if (allowChipAddition) {
                this.updateListSelection(listLiElement, eve);
                if (this.mode === 'Delimiter') {
                    this.updateDelimeter(this.delimiterChar);
                }
            }
        }
        this.updateDataList();
        this.refreshListItems(null);
        if (this.mode !== 'Box' && this.mode !== 'CheckBox') {
            this.updateDelimView();
        }
        if (this.changeOnBlur) {
            this.updateValueState(eve, this.value, this.tempValues);
            this.dispatchEvent(this.hiddenElement, 'change');
        }
        this.overAllClear.style.display = 'none';
        if (this.isPopupOpen()) {
            this.hidePopup(eve);
        }
        this.makeTextBoxEmpty();
        this.trigger('blur');
        this.focused = true;
        if (Browser.isDevice && this.mode !== 'Delimiter' && this.mode !== 'CheckBox') {
            this.removeChipFocus();
        }
        this.removeChipSelection();
        this.refreshInputHight();
        floatLabelBlur(this.overAllWrapper, this.componentWrapper, this.value, this.floatLabelType, this.placeholder);
        this.refreshPlaceHolder();
        if ((this.allowFiltering || (this.enableSelectionOrder === true && this.mode === 'CheckBox'))
            && !isNullOrUndefined(this.mainList)) {
            this.ulElement = this.mainList;
        }
        this.checkPlaceholderSize();
        Input.createSpanElement(this.overAllWrapper, this.createElement);
        this.calculateWidth();
        if (!isNullOrUndefined(this.overAllWrapper) && !isNullOrUndefined(this.overAllWrapper.getElementsByClassName('e-ddl-icon')[0] &&
            this.overAllWrapper.getElementsByClassName('e-float-text-content')[0] && this.floatLabelType !== 'Never')) {
            this.overAllWrapper.getElementsByClassName('e-float-text-content')[0].classList.add('e-icon');
        }
        this.isBlurDispatching = true;
        if (this.isAngular) {
            this.dispatchEvent(this.inputElement, 'blur');
        }
    };
    MultiSelect.prototype.calculateWidth = function () {
        var elementWidth;
        if (this.overAllWrapper) {
            if (!this.showDropDownIcon || this.overAllWrapper.querySelector('.' + 'e-label-top')) {
                elementWidth = this.overAllWrapper.clientWidth - 2 * (parseInt(getComputedStyle(this.inputElement).paddingRight, 10));
            }
            else {
                var downIconWidth = this.dropIcon.offsetWidth +
                    parseInt(getComputedStyle(this.dropIcon).marginRight, 10);
                elementWidth = this.overAllWrapper.clientWidth -
                    (downIconWidth + 2 * (parseInt(getComputedStyle(this.inputElement).paddingRight, 10)));
            }
            if (this.floatLabelType !== 'Never') {
                Input.calculateWidth(elementWidth, this.overAllWrapper, this.getModuleName());
            }
        }
    };
    MultiSelect.prototype.checkPlaceholderSize = function () {
        if (this.showDropDownIcon) {
            var downIconWidth = this.dropIcon.offsetWidth +
                parseInt(window.getComputedStyle(this.dropIcon).marginRight, 10);
            this.setPlaceholderSize(downIconWidth);
        }
        else {
            if (!isNullOrUndefined(this.dropIcon)) {
                this.setPlaceholderSize(this.showDropDownIcon ? this.dropIcon.offsetWidth : 0);
            }
        }
    };
    MultiSelect.prototype.setPlaceholderSize = function (downIconWidth) {
        if (isNullOrUndefined(this.value) || this.value.length === 0) {
            if (this.dropIcon.offsetWidth !== 0) {
                this.searchWrapper.style.width = ('calc(100% - ' + (downIconWidth + 10)) + 'px';
            }
            else {
                addClass([this.searchWrapper], CUSTOM_WIDTH);
            }
        }
        else if (!isNullOrUndefined(this.value)) {
            this.searchWrapper.removeAttribute('style');
            removeClass([this.searchWrapper], CUSTOM_WIDTH);
        }
    };
    MultiSelect.prototype.refreshInputHight = function () {
        if (!isNullOrUndefined(this.searchWrapper)) {
            if ((!this.value || !this.value.length) && (isNullOrUndefined(this.text) || this.text === '')) {
                this.searchWrapper.classList.remove(ZERO_SIZE);
            }
            else {
                this.searchWrapper.classList.add(ZERO_SIZE);
            }
        }
    };
    MultiSelect.prototype.validateValues = function (newValue, oldValue) {
        return JSON.stringify(newValue.slice().sort()) !== JSON.stringify(oldValue.slice().sort());
    };
    MultiSelect.prototype.updateValueState = function (event, newVal, oldVal) {
        var newValue = newVal ? newVal : [];
        var oldValue = oldVal ? oldVal : [];
        if (this.initStatus && this.validateValues(newValue, oldValue)) {
            var eventArgs = {
                e: event,
                oldValue: this.allowObjectBinding ? oldVal : oldVal,
                value: this.allowObjectBinding ? newVal : newVal,
                isInteracted: event ? true : false,
                element: this.element,
                event: event
            };
            if (this.isAngular && this.preventChange) {
                this.preventChange = false;
            }
            else {
                this.trigger('change', eventArgs);
            }
            this.updateTempValue();
            if (!this.changeOnBlur) {
                this.dispatchEvent(this.hiddenElement, 'change');
            }
        }
        this.selectedValueInfo = this.viewPortInfo;
    };
    MultiSelect.prototype.updateTempValue = function () {
        if (!this.value) {
            this.tempValues = this.value;
        }
        else {
            this.tempValues = this.allowObjectBinding ? this.value.slice() : this.value.slice();
        }
    };
    MultiSelect.prototype.updateAriaActiveDescendant = function () {
        if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName('e-item-focus')[0])) {
            attributes(this.inputElement, { 'aria-activedescendant': this.ulElement.getElementsByClassName('e-item-focus')[0].id });
        }
    };
    MultiSelect.prototype.pageUpSelection = function (steps, isVirtualKeyAction) {
        var collection = this.list.querySelectorAll('li.' + dropDownBaseClasses.li +
            ':not(.' + HIDE_LIST + ')' +
            ':not(.e-reorder-hide)');
        var previousItem = steps >= 0 ? collection[steps + 1] : collection[0];
        if (this.fields.disabled && previousItem && !this.enableVirtualization) {
            while (previousItem && (previousItem.classList.contains('e-disabled') || previousItem.classList.contains(HIDE_LIST) ||
                previousItem.classList.contains('.e-reorder-hide') || previousItem.classList.contains('e-list-group-item'))) {
                previousItem = previousItem.previousElementSibling;
            }
            if (!previousItem) {
                return;
            }
        }
        if (this.enableVirtualization && isVirtualKeyAction) {
            previousItem = (this.liCollections.length >= steps && steps >= 0)
                ? this.liCollections[steps]
                : this.liCollections[this.skeletonCount];
        }
        if (!isNullOrUndefined(previousItem) && previousItem.classList.contains('e-virtual-list')) {
            previousItem = this.liCollections[this.skeletonCount];
        }
        if (this.enableVirtualization) {
            if (!isNullOrUndefined(previousItem) && !previousItem.classList.contains('e-item-focus')) {
                this.isKeyBoardAction = true;
                this.addListFocus(previousItem);
                this.scrollTop(previousItem, this.getIndexByValue(previousItem.getAttribute('data-value')), this.keyboardEvent.keyCode);
            }
            else if (this.viewPortInfo.startIndex === 0) {
                this.isKeyBoardAction = true;
                this.scrollTop(previousItem, this.getIndexByValue(previousItem.getAttribute('data-value')), this.keyboardEvent.keyCode);
            }
            this.previousFocusItem = previousItem;
        }
        else {
            this.isKeyBoardAction = true;
            this.addListFocus(previousItem);
            this.scrollTop(previousItem, this.getIndexByValue(previousItem.getAttribute('data-value')), this.keyboardEvent.keyCode);
        }
    };
    MultiSelect.prototype.pageDownSelection = function (steps, isVirtualKeyAction) {
        var list = this.getItems();
        var collection = this.list.querySelectorAll('li.'
            + dropDownBaseClasses.li + ':not(.' + HIDE_LIST + ')' + ':not(.e-reorder-hide)');
        var previousItem = steps <= collection.length ? collection[steps - 1] : collection[collection.length - 1];
        if (this.fields.disabled && previousItem && !this.enableVirtualization) {
            while (previousItem && (previousItem.classList.contains('e-disabled') || previousItem.classList.contains(HIDE_LIST) ||
                previousItem.classList.contains('.e-reorder-hide') || previousItem.classList.contains('e-list-group-item'))) {
                previousItem = previousItem.nextElementSibling;
            }
            if (!previousItem) {
                return;
            }
        }
        if (this.enableVirtualization && this.skeletonCount > 0) {
            previousItem = steps < list.length ? this.liCollections[steps] : this.liCollections[list.length - 1];
        }
        if (this.enableVirtualization && isVirtualKeyAction) {
            previousItem = steps <= list.length ? this.liCollections[steps] : this.liCollections[list.length - 1];
        }
        this.isKeyBoardAction = true;
        this.addListFocus(previousItem);
        this.previousFocusItem = previousItem;
        this.scrollBottom(previousItem, this.getIndexByValue(previousItem.getAttribute('data-value')), false, this.keyboardEvent.keyCode);
    };
    MultiSelect.prototype.getItems = function () {
        if (!this.list) {
            _super.prototype.render.call(this);
        }
        return this.ulElement && this.ulElement.querySelectorAll('.' + dropDownBaseClasses.li).length > 0 ?
            this.ulElement.querySelectorAll('.' + dropDownBaseClasses.li
                + ':not(.' + HIDE_LIST + ')') : [];
    };
    MultiSelect.prototype.focusInHandler = function (e) {
        var _this = this;
        if (this.enabled) {
            this.showOverAllClear();
            this.inputFocus = true;
            if (this.value && this.value.length) {
                if (this.mode !== 'Delimiter' && this.mode !== 'CheckBox') {
                    this.chipCollectionWrapper.style.display = '';
                }
                else {
                    this.showDelimWrapper();
                }
                if (this.mode !== 'CheckBox') {
                    this.viewWrapper.style.display = 'none';
                }
            }
            if (this.mode !== 'CheckBox') {
                this.searchWrapper.classList.remove(ZERO_SIZE);
            }
            this.checkPlaceholderSize();
            if (this.focused) {
                var args = { isInteracted: e ? true : false, event: e };
                this.trigger('focus', args);
                this.focused = false;
            }
            if (!this.overAllWrapper.classList.contains(FOCUS)) {
                this.overAllWrapper.classList.add(FOCUS);
            }
            floatLabelFocus(this.overAllWrapper, this.componentWrapper);
            if (this.isPopupOpen()) {
                this.refreshPopup();
            }
            if (this.allowResize) {
                this.setResize();
            }
            setTimeout(function () {
                _this.calculateWidth();
            }, 150);
            return true;
        }
        else {
            return false;
        }
    };
    MultiSelect.prototype.showDelimWrapper = function () {
        if (this.mode === 'CheckBox') {
            this.viewWrapper.style.display = '';
        }
        else {
            this.delimiterWrapper.style.display = '';
        }
        this.componentWrapper.classList.add(DELIMITER_VIEW_WRAPPER);
    };
    MultiSelect.prototype.hideDelimWrapper = function () {
        this.delimiterWrapper.style.display = 'none';
        this.componentWrapper.classList.remove(DELIMITER_VIEW_WRAPPER);
    };
    MultiSelect.prototype.expandTextbox = function () {
        var size = 5;
        if (this.placeholder) {
            var codePoint = this.placeholder.charCodeAt(0);
            var sizeMultiplier = (0xAC00 <= codePoint && codePoint <= 0xD7AF) ? 1.5
                : (0x4E00 <= codePoint && codePoint <= 0x9FFF) ? 2 : 1;
            size = size > this.inputElement.placeholder.length ? size : this.inputElement.placeholder.length * sizeMultiplier;
        }
        if (this.inputElement.value.length > size) {
            this.inputElement.size = this.inputElement.value.length;
        }
        else {
            this.inputElement.size = size;
        }
    };
    MultiSelect.prototype.isPopupOpen = function () {
        return ((this.popupWrapper !== null) && (this.popupWrapper.parentElement !== null));
    };
    MultiSelect.prototype.refreshPopup = function () {
        if (this.popupObj && this.mobFilter) {
            this.popupObj.setProperties({ width: this.calcPopupWidth() });
            this.popupObj.refreshPosition(this.overAllWrapper);
            this.popupObj.resolveCollision();
        }
    };
    MultiSelect.prototype.checkTextLength = function () {
        return this.targetElement().length < 1;
    };
    MultiSelect.prototype.popupKeyActions = function (e) {
        switch (e.keyCode) {
            case 38:
                this.hidePopup(e);
                if (this.mode === 'CheckBox') {
                    this.inputElement.focus();
                }
                e.preventDefault();
                break;
            case 40:
                if (!this.isPopupOpen()) {
                    this.showPopup(e);
                    e.preventDefault();
                }
                break;
        }
    };
    MultiSelect.prototype.updatePopupPosition = function () {
        this.refreshPopup();
    };
    MultiSelect.prototype.updateAriaAttribute = function () {
        var focusedItem = this.list.querySelector('.' + dropDownBaseClasses.focus);
        if (!isNullOrUndefined(focusedItem)) {
            this.inputElement.setAttribute('aria-activedescendant', focusedItem.id);
            if (this.allowFiltering) {
                var filterInput = this.popupWrapper.querySelector('.' + FILTERINPUT);
                if (filterInput) {
                    filterInput.setAttribute('aria-activedescendant', focusedItem.id);
                }
            }
            else if (this.mode === 'CheckBox') {
                this.overAllWrapper.setAttribute('aria-activedescendant', focusedItem.id);
            }
        }
    };
    MultiSelect.prototype.homeNavigation = function (isHome, isVirtualKeyAction) {
        this.removeFocus();
        if (this.enableVirtualization) {
            if (isHome) {
                if (this.enableVirtualization && this.viewPortInfo.startIndex !== 0) {
                    this.viewPortInfo.startIndex = 0;
                    this.viewPortInfo.endIndex = this.itemCount;
                    this.updateVirtualItemIndex();
                    this.resetList(this.dataSource, this.fields, this.query);
                }
            }
            else {
                if (this.enableVirtualization && ((!this.value && this.viewPortInfo.endIndex !== this.totalItemCount) ||
                    (this.value && this.value.length > 0 && this.viewPortInfo.endIndex !== this.totalItemCount + this.value.length))) {
                    this.viewPortInfo.startIndex = this.totalItemCount - this.itemCount;
                    this.viewPortInfo.endIndex = this.totalItemCount;
                    this.updateVirtualItemIndex();
                    var query = new Query().clone();
                    if (this.value && this.value.length > 0) {
                        query = this.getForQuery(this.value).clone();
                        query = query.skip(this.totalItemCount - this.itemCount);
                    }
                    this.resetList(this.dataSource, this.fields, query);
                }
            }
        }
        this.UpdateSkeleton();
        var scrollEle = this.ulElement.querySelectorAll('li.' + dropDownBaseClasses.li
            + ':not(.' + HIDE_LIST + ')' + ':not(.e-reorder-hide)');
        if (scrollEle.length > 0) {
            var element = scrollEle[(isHome) ? 0 : (scrollEle.length - 1)];
            if (this.enableVirtualization && isHome) {
                element = scrollEle[this.skeletonCount];
            }
            this.removeFocus();
            element.classList.add(dropDownBaseClasses.focus);
            if (this.enableVirtualization && isHome) {
                this.scrollTop(element, undefined, this.keyboardEvent.keyCode);
            }
            else if (!isVirtualKeyAction) {
                this.scrollBottom(element, undefined, false, this.keyboardEvent.keyCode);
            }
            this.updateAriaActiveDescendant();
        }
    };
    MultiSelect.prototype.updateSelectionList = function () {
        if (!isNullOrUndefined(this.value) && this.value.length) {
            for (var index = 0; index < this.value.length; index++) {
                var value = this.allowObjectBinding ?
                    getValue(((this.fields.value) ? this.fields.value : ''), this.value[index]) : this.value[index];
                var selectedItem = this.getElementByValue(value);
                if (selectedItem && !selectedItem.classList.contains(dropDownBaseClasses.selected)) {
                    selectedItem.classList.add('e-active');
                }
            }
        }
    };
    MultiSelect.prototype.handleVirtualKeyboardActions = function (e, pageCount) {
        var focusedItem = this.list.querySelector('.' + dropDownBaseClasses.focus);
        var activeIndex;
        this.isKeyBoardAction = true;
        switch (e.keyCode) {
            case 40:
                this.arrowDown(e, true);
                break;
            case 38:
                this.arrowUp(e, true);
                break;
            case 33:
                e.preventDefault();
                if (focusedItem) {
                    activeIndex = this.getIndexByValue(this.previousFocusItem.getAttribute('data-value')) - 1;
                    this.pageUpSelection(activeIndex, true);
                    this.updateAriaAttribute();
                }
                break;
            case 34:
                e.preventDefault();
                if (focusedItem) {
                    activeIndex = this.getIndexByValue(this.previousFocusItem.getAttribute('data-value'));
                    this.pageDownSelection(activeIndex, true);
                    this.updateAriaAttribute();
                }
                break;
            case 35:
            case 36:
                this.isMouseScrollAction = true;
                this.homeNavigation((e.keyCode === 36) ? true : false, true);
                this.isPreventScrollAction = true;
                break;
        }
        this.keyboardEvent = null;
        this.isScrollChanged = true;
        this.isKeyBoardAction = false;
    };
    MultiSelect.prototype.onKeyDown = function (e) {
        if (this.readonly || !this.enabled && this.mode !== 'CheckBox') {
            return;
        }
        this.preventSetCurrentData = false;
        this.keyboardEvent = e;
        if (this.isPreventKeyAction && this.enableVirtualization) {
            e.preventDefault();
        }
        this.keyCode = e.keyCode;
        this.keyDownStatus = true;
        if (e.keyCode > 111 && e.keyCode < 124) {
            return;
        }
        if (e.altKey) {
            this.popupKeyActions(e);
            return;
        }
        else if (this.isPopupOpen()) {
            var focusedItem = this.list.querySelector('.' + dropDownBaseClasses.focus);
            var activeIndex = void 0;
            switch (e.keyCode) {
                case 36:
                case 35:
                    this.isMouseScrollAction = true;
                    this.isKeyBoardAction = true;
                    this.homeNavigation((e.keyCode === 36) ? true : false);
                    break;
                case 33:
                    e.preventDefault();
                    if (focusedItem) {
                        activeIndex = this.getIndexByValue(focusedItem.getAttribute('data-value'));
                        this.pageUpSelection(activeIndex - this.getPageCount() - 1);
                        this.updateAriaAttribute();
                    }
                    return;
                case 34:
                    e.preventDefault();
                    if (focusedItem) {
                        activeIndex = this.getIndexByValue(focusedItem.getAttribute('data-value'));
                        this.pageDownSelection(activeIndex + this.getPageCount());
                        this.updateAriaAttribute();
                    }
                    return;
                case 38:
                    this.isKeyBoardAction = true;
                    this.arrowUp(e);
                    break;
                case 40:
                    this.isKeyBoardAction = true;
                    this.arrowDown(e);
                    break;
                case 27:
                    e.preventDefault();
                    this.isKeyBoardAction = true;
                    this.hidePopup(e);
                    if (this.mode === 'CheckBox') {
                        this.inputElement.focus();
                    }
                    this.isKeyBoardAction = false;
                    return;
                case 13:
                    e.preventDefault();
                    this.isKeyBoardAction = true;
                    if (this.mode !== 'CheckBox') {
                        this.selectByKey(e);
                    }
                    this.checkPlaceholderSize();
                    this.isKeyBoardAction = false;
                    return;
                case 32:
                    this.isKeyBoardAction = true;
                    this.spaceKeySelection(e);
                    this.isKeyBoardAction = false;
                    return;
                case 9:
                    e.preventDefault();
                    this.isKeyBoardAction = true;
                    this.hidePopup(e);
                    this.inputElement.focus();
                    this.overAllWrapper.classList.add(FOCUS);
            }
        }
        else {
            switch (e.keyCode) {
                case 13:
                case 9:
                case 16:
                case 17:
                case 20:
                    return;
                case 40:
                    if (this.openOnClick) {
                        this.showPopup();
                    }
                    break;
                case 27:
                    e.preventDefault();
                    this.escapeAction();
                    return;
            }
        }
        if (this.checkTextLength()) {
            this.keyNavigation(e);
        }
        if (this.mode === 'CheckBox' && this.enableSelectionOrder) {
            if (this.allowFiltering) {
                this.previousFilterText = this.targetElement();
            }
            this.checkBackCommand(e);
        }
        this.expandTextbox();
        if (!(this.mode === 'CheckBox' && this.showSelectAll)) {
            this.refreshPopup();
        }
        if (this.allowResize) {
            this.setResize();
        }
        this.isKeyBoardAction = false;
    };
    MultiSelect.prototype.arrowDown = function (e, isVirtualKeyAction) {
        e.preventDefault();
        this.moveByList(1, isVirtualKeyAction);
        this.keyAction = true;
        if (document.activeElement.classList.contains(FILTERINPUT)
            || (this.mode === 'CheckBox' && !this.allowFiltering && document.activeElement !== this.list)) {
            EventHandler.add(this.list, 'keydown', this.onKeyDown, this);
        }
        this.updateAriaAttribute();
    };
    MultiSelect.prototype.arrowUp = function (e, isVirtualKeyAction) {
        e.preventDefault();
        this.keyAction = true;
        var list = this.list.querySelectorAll('li.'
            + dropDownBaseClasses.li
            + ':not(.' + HIDE_LIST + ')' + ':not(.e-reorder-hide)');
        if (this.enableGroupCheckBox && this.mode === 'CheckBox' && !isNullOrUndefined(this.fields.groupBy)) {
            list = this.list.querySelectorAll('li.'
                + dropDownBaseClasses.li + ',li.' + dropDownBaseClasses.group
                + ':not(.' + HIDE_LIST + ')' + ':not(.e-reorder-hide)');
        }
        var focuseElem = this.list.querySelector('li.' + dropDownBaseClasses.focus);
        this.focusFirstListItem = !isNullOrUndefined(this.liCollections[0]) ? this.liCollections[0].classList.contains('e-item-focus') :
            false;
        var index = Array.prototype.slice.call(list).indexOf(focuseElem);
        if (index <= 0 && (this.mode === 'CheckBox' && this.allowFiltering)) {
            this.keyAction = false;
            this.notify('inputFocus', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox', value: 'focus' });
        }
        this.moveByList(-1, isVirtualKeyAction);
        this.updateAriaAttribute();
    };
    MultiSelect.prototype.spaceKeySelection = function (e) {
        if (this.mode === 'CheckBox') {
            var li = this.list.querySelector('li.' + dropDownBaseClasses.focus);
            var selectAllParent = document.getElementsByClassName('e-selectall-parent')[0];
            if (!isNullOrUndefined(li) || (selectAllParent && selectAllParent.classList.contains('e-item-focus'))) {
                e.preventDefault();
                this.keyAction = true;
            }
            this.selectByKey(e);
            if (this.keyAction) {
                var li_1 = this.list.querySelector('li.' + dropDownBaseClasses.focus);
                if (!isNullOrUndefined(li_1) && selectAllParent && selectAllParent.classList.contains('e-item-focus')) {
                    li_1.classList.remove('e-item-focus');
                }
            }
        }
        this.checkPlaceholderSize();
    };
    MultiSelect.prototype.checkBackCommand = function (e) {
        if (e.keyCode === 8 && this.allowFiltering ? this.targetElement() !== this.previousFilterText : this.targetElement() === '') {
            this.backCommand = false;
        }
        else {
            this.backCommand = true;
        }
    };
    MultiSelect.prototype.keyNavigation = function (e) {
        if ((this.mode !== 'Delimiter' && this.mode !== 'CheckBox') && this.value && this.value.length) {
            switch (e.keyCode) {
                case 37: //left arrow
                    e.preventDefault();
                    this.moveBy(-1, e);
                    break;
                case 39: //right arrow
                    e.preventDefault();
                    this.moveBy(1, e);
                    break;
                case 8:
                    this.removelastSelection(e);
                    break;
                case 46: //del
                    this.removeSelectedChip(e);
                    break;
            }
        }
        else if (e.keyCode === 8 && this.mode === 'Delimiter') {
            if (this.value && this.value.length) {
                e.preventDefault();
                var temp = this.allowObjectBinding ?
                    getValue(((this.fields.value) ? this.fields.value : ''), this.value[this.value.length - 1]) :
                    this.value[this.value.length - 1];
                this.removeValue(this.value[this.value.length - 1], e);
                this.updateDelimeter(this.delimiterChar, e);
                this.focusAtLastListItem(temp);
            }
        }
    };
    MultiSelect.prototype.selectByKey = function (e) {
        this.removeChipSelection();
        this.selectListByKey(e);
        if (this.hideSelectedItem) {
            this.focusAtFirstListItem();
        }
    };
    MultiSelect.prototype.escapeAction = function () {
        var temp = this.tempValues ? this.tempValues.slice() : [];
        if (this.allowObjectBinding) {
            temp = this.tempValues ? this.tempValues.slice() : [];
        }
        if (this.value && this.validateValues(this.value, temp)) {
            if (this.mode !== 'CheckBox') {
                this.value = temp;
                this.initialValueUpdate();
            }
            if (this.mode !== 'Delimiter' && this.mode !== 'CheckBox') {
                this.chipCollectionWrapper.style.display = '';
            }
            else {
                this.showDelimWrapper();
            }
            this.refreshPlaceHolder();
            if (this.value.length) {
                this.showOverAllClear();
            }
            else {
                this.hideOverAllClear();
            }
        }
        this.makeTextBoxEmpty();
    };
    MultiSelect.prototype.scrollBottom = function (selectedLI, activeIndex, isInitialSelection, keyCode, isInitial) {
        if (isInitialSelection === void 0) { isInitialSelection = false; }
        if (keyCode === void 0) { keyCode = null; }
        if (isInitial === void 0) { isInitial = false; }
        if ((!isNullOrUndefined(selectedLI) && selectedLI.classList.contains('e-virtual-list')) ||
            (this.enableVirtualization && isNullOrUndefined(selectedLI))) {
            selectedLI = this.liCollections[this.skeletonCount];
        }
        var selectedListMargin = selectedLI && !isNaN(parseInt(window.getComputedStyle(selectedLI).marginBottom, 10)) ?
            parseInt(window.getComputedStyle(selectedLI).marginBottom, 10) : 0;
        this.isUpwardScrolling = false;
        var virtualListCount = this.list.querySelectorAll('.e-virtual-list').length;
        var lastElementValue = this.list.querySelector('li:last-of-type') ?
            this.list.querySelector('li:last-of-type').getAttribute('data-value') : null;
        var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ?
            selectedLI.offsetTop + (this.virtualListInfo.startIndex * (selectedLI.offsetHeight + selectedListMargin))
            : selectedLI.offsetTop;
        var currentOffset = this.list.offsetHeight;
        var nextBottom = selectedLiOffsetTop - (virtualListCount * (selectedLI.offsetHeight + selectedListMargin)) +
            (selectedLI.offsetHeight + selectedListMargin) - this.list.scrollTop;
        var nextOffset = this.list.scrollTop + nextBottom - currentOffset;
        var isScrollerCHanged = false;
        var isScrollTopChanged = false;
        var boxRange = selectedLiOffsetTop - (virtualListCount * (selectedLI.offsetHeight + selectedListMargin)) +
            (selectedLI.offsetHeight + selectedListMargin) - this.list.scrollTop;
        boxRange = this.fields.groupBy && !isNullOrUndefined(this.fixedHeaderElement) ?
            boxRange - this.fixedHeaderElement.offsetHeight : boxRange;
        if (activeIndex === 0 && !this.enableVirtualization) {
            this.list.scrollTop = 0;
        }
        else if (nextBottom > currentOffset || !(boxRange > 0 && this.list.offsetHeight > boxRange)) {
            var currentElementValue = selectedLI ? selectedLI.getAttribute('data-value') : null;
            var liCount = keyCode === 34 ? this.getPageCount() - 1 : 1;
            if (!this.enableVirtualization || this.isKeyBoardAction || isInitialSelection) {
                if (this.isKeyBoardAction && this.enableVirtualization && lastElementValue &&
                    currentElementValue === lastElementValue && keyCode !== 35 && !this.isVirtualScrolling) {
                    this.isPreventKeyAction = true;
                    this.list.scrollTop += (selectedLI.offsetHeight + selectedListMargin) * liCount;
                    this.isPreventKeyAction = this.isScrollerAtEnd() ? false : this.isPreventKeyAction;
                    this.isKeyBoardAction = false;
                    this.isPreventScrollAction = false;
                }
                else if (this.enableVirtualization && keyCode === 35) {
                    this.isPreventKeyAction = false;
                    this.isKeyBoardAction = false;
                    this.isPreventScrollAction = false;
                    this.list.scrollTop = this.list.scrollHeight;
                }
                else {
                    if (keyCode === 34 && this.enableVirtualization && !this.isVirtualScrolling) {
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
    };
    MultiSelect.prototype.scrollTop = function (selectedLI, activeIndex, keyCode) {
        if (keyCode === void 0) { keyCode = null; }
        var virtualListCount = this.list.querySelectorAll('.e-virtual-list').length;
        var selectedListMargin = selectedLI && !isNaN(parseInt(window.getComputedStyle(selectedLI).marginBottom, 10)) ?
            parseInt(window.getComputedStyle(selectedLI).marginBottom, 10) : 0;
        var selectedLiOffsetTop = (this.virtualListInfo && this.virtualListInfo.startIndex) ?
            selectedLI.offsetTop + (this.virtualListInfo.startIndex * (selectedLI.offsetHeight + selectedListMargin)) :
            selectedLI.offsetTop;
        var nextOffset = selectedLiOffsetTop - (virtualListCount * (selectedLI.offsetHeight +
            selectedListMargin)) - this.list.scrollTop;
        var firstElementValue = this.list.querySelector('li.e-list-item:not(.e-virtual-list)') ?
            this.list.querySelector('li.e-list-item:not(.e-virtual-list)').getAttribute('data-value') : null;
        nextOffset = this.fields.groupBy && !isUndefined(this.fixedHeaderElement) ?
            nextOffset - this.fixedHeaderElement.offsetHeight : nextOffset;
        var boxRange = (selectedLiOffsetTop - (virtualListCount * (selectedLI.offsetHeight + selectedListMargin)) +
            (selectedLI.offsetHeight + selectedListMargin) - this.list.scrollTop);
        var isPageUpKeyAction = this.enableVirtualization && this.getModuleName() === 'autocomplete' && nextOffset <= 0;
        if (activeIndex === 0 && !this.enableVirtualization) {
            this.list.scrollTop = 0;
        }
        else if (nextOffset < 0 || isPageUpKeyAction) {
            var currentElementValue = selectedLI ? selectedLI.getAttribute('data-value') : null;
            var liCount = keyCode === 33 ? this.getPageCount() - 2 : 1;
            if (this.enableVirtualization && this.isKeyBoardAction && firstElementValue &&
                currentElementValue === firstElementValue && keyCode !== 36 && !this.isVirtualScrolling) {
                this.isUpwardScrolling = true;
                this.isPreventKeyAction = true;
                this.isKeyBoardAction = false;
                this.list.scrollTop -= (selectedLI.offsetHeight + selectedListMargin) * liCount;
                this.isPreventKeyAction = this.list.scrollTop !== 0 ? this.isPreventKeyAction : false;
                this.isPreventScrollAction = false;
            }
            else if (this.enableVirtualization && keyCode === 36) {
                this.isPreventScrollAction = false;
                this.isPreventKeyAction = true;
                this.isKeyBoardAction = false;
                this.list.scrollTo(0, 0);
            }
            else {
                if (keyCode === 33 && this.enableVirtualization && !this.isVirtualScrolling) {
                    this.isPreventKeyAction = false;
                    this.isKeyBoardAction = false;
                    this.isPreventScrollAction = false;
                }
                this.list.scrollTop = this.list.scrollTop + nextOffset;
            }
        }
        else if (!(boxRange > 0 && this.list.offsetHeight > boxRange)) {
            this.list.scrollTop = selectedLI.offsetTop - (this.fields.groupBy && !isNullOrUndefined(this.fixedHeaderElement) ?
                this.fixedHeaderElement.offsetHeight : 0);
        }
    };
    MultiSelect.prototype.isScrollerAtEnd = function () {
        return this.list && this.list.scrollTop + this.list.clientHeight >= this.list.scrollHeight;
    };
    MultiSelect.prototype.selectListByKey = function (e) {
        var li = this.list.querySelector('li.' + dropDownBaseClasses.focus);
        var limit = this.value && this.value.length ? this.value.length : 0;
        var target;
        if (li !== null) {
            e.preventDefault();
            if (li.classList.contains('e-active')) {
                limit = limit - 1;
            }
            if (this.isValidLI(li) && limit < this.maximumSelectionLength) {
                this.updateListSelection(li, e);
                this.addListFocus(li);
                if (this.mode === 'CheckBox') {
                    this.updateDelimView();
                    this.updateDelimeter(this.delimiterChar, e);
                    this.refreshInputHight();
                    this.checkPlaceholderSize();
                    if (this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
                        target = li.firstElementChild.lastElementChild;
                        this.findGroupStart(target);
                        this.deselectHeader();
                    }
                }
                else {
                    this.updateDelimeter(this.delimiterChar, e);
                }
                var isFilterData = this.targetElement().trim() !== '' ? true : false;
                this.makeTextBoxEmpty();
                if (this.mode !== 'CheckBox') {
                    this.refreshListItems(li.textContent, isFilterData);
                }
                if (!this.changeOnBlur) {
                    this.updateValueState(e, this.value, this.tempValues);
                }
                this.refreshPopup();
            }
            else {
                if (!this.isValidLI(li) && limit < this.maximumSelectionLength) {
                    target = li.firstElementChild.lastElementChild;
                    if (target.classList.contains('e-check')) {
                        this.selectAllItem(false, e, li);
                    }
                    else {
                        this.selectAllItem(true, e, li);
                    }
                }
            }
            this.refreshSelection();
            if (this.closePopupOnSelect) {
                this.hidePopup(e);
            }
        }
        var selectAllParent = document.getElementsByClassName('e-selectall-parent')[0];
        if (selectAllParent && selectAllParent.classList.contains('e-item-focus')) {
            var selectAllCheckBox = selectAllParent.childNodes[0];
            if (!selectAllCheckBox.classList.contains('e-check')) {
                selectAllCheckBox.classList.add('e-check');
                var args = {
                    module: 'CheckBoxSelection',
                    enable: this.mode === 'CheckBox',
                    value: 'check',
                    name: 'checkSelectAll'
                };
                this.notify('checkSelectAll', args);
                this.selectAllItem(true, e, li);
            }
            else {
                selectAllCheckBox.classList.remove('e-check');
                var args = {
                    module: 'CheckBoxSelection',
                    enable: this.mode === 'CheckBox',
                    value: 'check',
                    name: 'checkSelectAll'
                };
                this.notify('checkSelectAll', args);
                this.selectAllItem(false, e, li);
            }
        }
        this.refreshPlaceHolder();
    };
    MultiSelect.prototype.refreshListItems = function (data, isFilterData) {
        if ((this.allowFiltering || (this.mode === 'CheckBox' && this.enableSelectionOrder === true)
            || this.allowCustomValue) && this.mainList && this.listData) {
            var list = this.mainList.cloneNode ? this.mainList.cloneNode(true) : this.mainList;
            if (this.enableVirtualization) {
                if (this.allowCustomValue && this.virtualCustomData && data == null && this.virtualCustomData &&
                    this.viewPortInfo && this.viewPortInfo.startIndex === 0 && this.viewPortInfo.endIndex === this.itemCount) {
                    this.virtualCustomData = null;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    this.renderItems(this.mainData, this.fields);
                }
                else {
                    if (this.allowFiltering && isFilterData) {
                        this.updateInitialData();
                        this.onActionComplete(list, this.mainData);
                        this.isVirtualTrackHeight = false;
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if (this.list.getElementsByClassName('e-virtual-ddl')[0]) {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            this.list.getElementsByClassName('e-virtual-ddl')[0].style = this.GetVirtualTrackHeight();
                        }
                        else if (!this.list.querySelector('.e-virtual-ddl') && this.skeletonCount > 0) {
                            var virualElement = this.createElement('div', {
                                id: this.element.id + '_popup',
                                className: 'e-virtual-ddl'
                            });
                            virualElement.style.cssText = this.GetVirtualTrackHeight();
                            this.popupWrapper.querySelector('.e-dropdownbase').appendChild(virualElement);
                        }
                    }
                    else {
                        this.onActionComplete(this.list, this.listData);
                    }
                }
            }
            else {
                this.onActionComplete(list, this.mainData);
            }
            this.focusAtLastListItem(data);
            if (this.value && this.value.length) {
                this.refreshSelection();
            }
        }
        else if (!isNullOrUndefined(this.fields.groupBy) && this.value && this.value.length) {
            this.refreshSelection();
        }
    };
    MultiSelect.prototype.removeSelectedChip = function (e) {
        var selectedElem = this.chipCollectionWrapper.querySelector('span.' + CHIP_SELECTED);
        var temp;
        if (selectedElem !== null) {
            if (!isNullOrUndefined(this.value)) {
                this.tempValues = this.allowObjectBinding ? this.value.slice() : this.value.slice();
            }
            temp = selectedElem.nextElementSibling;
            if (temp !== null) {
                this.removeChipSelection();
                this.addChipSelection(temp, e);
            }
            var currentChip = this.allowObjectBinding ?
                this.getDataByValue(this.getFormattedValue(selectedElem.getAttribute('data-value'))) :
                selectedElem.getAttribute('data-value');
            this.removeValue(currentChip, e);
            this.updateDelimeter(this.delimiterChar, e);
            this.makeTextBoxEmpty();
        }
        if (this.closePopupOnSelect) {
            this.hidePopup(e);
        }
        this.checkPlaceholderSize();
    };
    MultiSelect.prototype.moveByTop = function (state) {
        var elements = this.list.querySelectorAll('li.' + dropDownBaseClasses.li);
        var index;
        if (elements.length > 1) {
            this.removeFocus();
            index = state ? 0 : (elements.length - 1);
            this.addListFocus(elements[index]);
            this.scrollBottom(elements[index], index);
        }
        this.updateAriaAttribute();
    };
    MultiSelect.prototype.clickHandler = function (e) {
        var targetElement = e.target;
        var filterInputClassName = targetElement.className;
        var selectAllParent = document.getElementsByClassName('e-selectall-parent')[0];
        if ((filterInputClassName === 'e-input-filter e-input' ||
            filterInputClassName === 'e-input-group e-control-wrapper e-input-focus') &&
            selectAllParent.classList.contains('e-item-focus')) {
            selectAllParent.classList.remove('e-item-focus');
        }
    };
    MultiSelect.prototype.moveByList = function (position, isVirtualKeyAction) {
        if (this.list) {
            var elements = this.list.querySelectorAll('li.'
                + dropDownBaseClasses.li
                + ':not(.' + HIDE_LIST + ')' + ':not(.e-reorder-hide)');
            if (this.mode === 'CheckBox' && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
                elements = this.list.querySelectorAll('li.'
                    + dropDownBaseClasses.li + ',li.' + dropDownBaseClasses.group
                    + ':not(.' + HIDE_LIST + ')' + ':not(.e-reorder-hide)');
            }
            var selectedElem = this.list.querySelector('li.' + dropDownBaseClasses.focus);
            if (this.enableVirtualization && isVirtualKeyAction && !isNullOrUndefined(this.currentFocuedListElement)) {
                selectedElem = this.getElementByValue(this.getFormattedValue(this.currentFocuedListElement.getAttribute('data-value')));
            }
            var temp = -1;
            var selectAllParent = document.getElementsByClassName('e-selectall-parent')[0];
            if (this.mode === 'CheckBox' && this.showSelectAll && position === 1 && !isNullOrUndefined(selectAllParent) &&
                !selectAllParent.classList.contains('e-item-focus') && this.list.getElementsByClassName('e-item-focus').length === 0 &&
                this.liCollections.length > 1) {
                if (!this.focusFirstListItem && selectAllParent.classList.contains('e-item-focus')) {
                    selectAllParent.classList.remove('e-item-focus');
                }
                else if (!selectAllParent.classList.contains('e-item-focus')) {
                    selectAllParent.classList.add('e-item-focus');
                }
            }
            else if (elements.length) {
                if (this.mode === 'CheckBox' && this.showSelectAll && !isNullOrUndefined(selectAllParent && position === -1)) {
                    if (!this.focusFirstListItem && selectAllParent.classList.contains('e-item-focus')) {
                        selectAllParent.classList.remove('e-item-focus');
                    }
                    else if (this.focusFirstListItem && !selectAllParent.classList.contains('e-item-focus')) {
                        selectAllParent.classList.add('e-item-focus');
                    }
                }
                for (var index = 0; index < elements.length; index++) {
                    if (elements[index] === selectedElem) {
                        temp = index;
                        break;
                    }
                }
                if (position > 0) {
                    if (temp < (elements.length - 1)) {
                        this.removeFocus();
                        if (this.enableVirtualization && isVirtualKeyAction) {
                            this.addListFocus(elements[temp]);
                        }
                        else {
                            if (this.enableVirtualization && elements[temp + 1].classList.contains('e-virtual-list')) {
                                this.addListFocus(elements[this.skeletonCount]);
                            }
                            else {
                                this.addListFocus(elements[++temp]);
                            }
                        }
                        if (temp > -1) {
                            this.updateCheck(elements[temp]);
                            this.scrollBottom(elements[temp], temp);
                            this.currentFocuedListElement = elements[temp];
                        }
                    }
                }
                else {
                    if (temp > 0) {
                        if (this.enableVirtualization) {
                            var isVirtualElement = elements[temp - 1].classList.contains('e-virtual-list');
                            var elementIndex = isVirtualKeyAction ? temp : temp - 1;
                            if (isVirtualKeyAction || !isVirtualElement) {
                                this.removeFocus();
                            }
                            if (isVirtualKeyAction || !isVirtualElement) {
                                this.addListFocus(elements[elementIndex]);
                                this.updateCheck(elements[elementIndex]);
                                this.scrollTop(elements[elementIndex], temp);
                                this.currentFocuedListElement = elements[elementIndex];
                            }
                        }
                        else {
                            this.removeFocus();
                            this.addListFocus(elements[--temp]);
                            this.updateCheck(elements[temp]);
                            this.scrollTop(elements[temp], temp);
                        }
                    }
                }
            }
        }
        var focusedLi = this.list ? this.list.querySelector('.e-item-focus') : null;
        if (this.isDisabledElement(focusedLi)) {
            if (this.list.querySelectorAll('.e-list-item:not(.e-hide-listitem):not(.e-disabled)').length === 0 || (this.keyCode === 38 && this.mode === 'CheckBox' && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy) && focusedLi === this.list.querySelector('li.e-list-group-item'))) {
                this.removeFocus();
                return;
            }
            var index = this.getIndexByValue(focusedLi.getAttribute('data-value'));
            if (index === 0) {
                position = 1;
            }
            if (index === (this.list.querySelectorAll('.e-list-item:not(.e-hide-listitem)').length - 1)) {
                position = -1;
            }
            this.moveByList(position);
        }
    };
    MultiSelect.prototype.getElementByValue = function (value) {
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
    MultiSelect.prototype.updateCheck = function (element) {
        if (this.mode === 'CheckBox' && this.enableGroupCheckBox &&
            !isNullOrUndefined(this.fields.groupBy)) {
            var checkElement = element.firstElementChild.lastElementChild;
            if (checkElement.classList.contains('e-check')) {
                element.classList.add('e-active');
            }
            else {
                element.classList.remove('e-active');
            }
        }
    };
    MultiSelect.prototype.moveBy = function (position, e) {
        var temp;
        var elements = this.chipCollectionWrapper.querySelectorAll('span.' + CHIP);
        var selectedElem = this.chipCollectionWrapper.querySelector('span.' + CHIP_SELECTED);
        if (selectedElem === null) {
            if (position < 0) {
                this.addChipSelection(elements[elements.length - 1], e);
            }
        }
        else {
            if (position < 0) {
                temp = selectedElem.previousElementSibling;
                if (temp !== null) {
                    this.removeChipSelection();
                    this.addChipSelection(temp, e);
                }
            }
            else {
                temp = selectedElem.nextElementSibling;
                this.removeChipSelection();
                if (temp !== null) {
                    this.addChipSelection(temp, e);
                }
            }
        }
    };
    MultiSelect.prototype.chipClick = function (e) {
        if (this.enabled) {
            var elem = closest(e.target, '.' + CHIP);
            this.removeChipSelection();
            this.addChipSelection(elem, e);
        }
    };
    MultiSelect.prototype.removeChipSelection = function () {
        if (this.chipCollectionWrapper) {
            this.removeChipFocus();
        }
    };
    MultiSelect.prototype.addChipSelection = function (element, e) {
        addClass([element], CHIP_SELECTED);
        this.trigger('chipSelection', e);
    };
    MultiSelect.prototype.onChipRemove = function (e) {
        if (e.which === 3 || e.button === 2) {
            return;
        }
        if (this.enabled && !this.readonly) {
            var element = e.target.parentElement;
            var customVal = element.getAttribute('data-value');
            var value = this.allowObjectBinding ?
                this.getDataByValue(this.getFormattedValue(customVal)) : this.getFormattedValue(customVal);
            if (this.allowCustomValue && ((customVal !== 'false' && value === false) ||
                (!isNullOrUndefined(value) && value.toString() === 'NaN'))) {
                value = customVal;
            }
            if (this.isPopupOpen() && this.mode !== 'CheckBox') {
                this.hidePopup(e);
            }
            if (!this.inputFocus) {
                this.inputElement.focus();
            }
            this.removeValue(value, e);
            value = this.allowObjectBinding ? getValue((this.fields.value) ? this.fields.value : '', value) : value;
            if (isNullOrUndefined(this.findListElement(this.list, 'li', 'data-value', value)) &&
                this.mainList && this.listData) {
                var list = this.mainList.cloneNode ? this.mainList.cloneNode(true) : this.mainList;
                this.onActionComplete(list, this.mainData);
            }
            this.updateDelimeter(this.delimiterChar, e);
            if (this.placeholder && this.floatLabelType === 'Never') {
                this.makeTextBoxEmpty();
                this.checkPlaceholderSize();
            }
            else {
                this.inputElement.value = '';
            }
            e.preventDefault();
        }
    };
    MultiSelect.prototype.makeTextBoxEmpty = function () {
        this.inputElement.value = '';
        this.refreshPlaceHolder();
    };
    MultiSelect.prototype.refreshPlaceHolder = function () {
        if (this.placeholder && this.floatLabelType === 'Never') {
            if ((this.value && this.value.length) || (!isNullOrUndefined(this.text) && this.text !== '')) {
                this.inputElement.placeholder = '';
            }
            else {
                this.inputElement.placeholder = encodePlaceholder(this.placeholder);
            }
        }
        else {
            this.setFloatLabelType();
        }
        this.expandTextbox();
    };
    MultiSelect.prototype.removeAllItems = function (value, eve, isClearAll, element, mainElement) {
        var index = this.allowObjectBinding ? this.indexOfObjectInArray(value, this.value) :
            this.value.indexOf(value);
        var removeVal = this.value.slice(0);
        removeVal.splice(index, 1);
        this.setProperties({ value: [].concat([], removeVal) }, true);
        element.setAttribute('aria-selected', 'false');
        var className = this.hideSelectedItem ?
            HIDE_LIST :
            dropDownBaseClasses.selected;
        removeClass([element], className);
        this.notify('activeList', {
            module: 'CheckBoxSelection',
            enable: this.mode === 'CheckBox', li: element,
            e: this, index: index
        });
        this.invokeCheckboxSelection(element, eve, isClearAll);
        var currentValue = this.allowObjectBinding ? getValue(((this.fields.value) ?
            this.fields.value : ''), value) : value;
        this.updateMainList(true, currentValue, mainElement);
        this.updateChipStatus();
    };
    MultiSelect.prototype.invokeCheckboxSelection = function (element, eve, isClearAll) {
        this.notify('updatelist', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox', li: element, e: eve });
        this.updateAriaActiveDescendant();
        if ((this.value && this.value.length !== this.mainData.length)
            && (this.mode === 'CheckBox' && this.showSelectAll && !(this.isSelectAll || isClearAll))) {
            this.notify('checkSelectAll', {
                module: 'CheckBoxSelection',
                enable: this.mode === 'CheckBox',
                value: 'uncheck'
            });
        }
    };
    MultiSelect.prototype.removeValue = function (value, eve, length, isClearAll) {
        var _this = this;
        var index = this.allowObjectBinding ? this.indexOfObjectInArray(value, this.value) :
            this.value.indexOf(this.getFormattedValue(value));
        if (index === -1 && this.allowCustomValue && !isNullOrUndefined(value)) {
            index = this.allowObjectBinding ? this.indexOfObjectInArray(value, this.value) :
                this.value.indexOf(value.toString());
        }
        var targetEle = eve && eve.target;
        isClearAll = (isClearAll || targetEle && targetEle.classList.contains('e-close-hooker')) ? true : null;
        var className = this.hideSelectedItem ?
            HIDE_LIST :
            dropDownBaseClasses.selected;
        if (index !== -1) {
            var currentValue = this.allowObjectBinding ? getValue(((this.fields.value) ?
                this.fields.value : ''), value) : value;
            var element_1 = this.virtualSelectAll ? null : this.findListElement(this.list, 'li', 'data-value', currentValue);
            var val_1 = this.allowObjectBinding ? value : this.getDataByValue(value);
            var eventArgs = {
                e: eve,
                item: element_1,
                itemData: val_1,
                isInteracted: eve ? true : false,
                cancel: false
            };
            this.trigger('removing', eventArgs, function (eventArgs) {
                if (eventArgs.cancel) {
                    _this.removeIndex++;
                }
                else {
                    _this.isRemoveSelection = _this.enableVirtualization ? true : _this.isRemoveSelection;
                    _this.currentRemoveValue = _this.allowObjectBinding ? getValue(((_this.fields.value) ?
                        _this.fields.value : ''), value) : value;
                    _this.virtualSelectAll = false;
                    var removeVal = _this.value.slice(0);
                    removeVal.splice(index, 1);
                    if (_this.enableVirtualization && _this.mode === 'CheckBox') {
                        _this.selectedListData.splice(index, 1);
                    }
                    _this.setProperties({ value: [].concat([], removeVal) }, true);
                    if (_this.enableVirtualization) {
                        var currentText = index === 0 && _this.text.split(_this.delimiterChar) &&
                            _this.text.split(_this.delimiterChar).length === 1 ?
                            _this.text.replace(_this.text.split(_this.delimiterChar)[index], '') :
                            index === 0 ? _this.text.replace(_this.text.split(_this.delimiterChar)[index] +
                                _this.delimiterChar, '') :
                                _this.text.replace(_this.delimiterChar + _this.text.split(_this.delimiterChar)[index], '');
                        _this.setProperties({ text: currentText.toString() }, true);
                    }
                    if (element_1 !== null) {
                        var currentValue_1 = _this.allowObjectBinding ? getValue(((_this.fields.value) ?
                            _this.fields.value : ''), value) : value;
                        var hideElement = _this.findListElement(_this.mainList, 'li', 'data-value', currentValue_1);
                        element_1.setAttribute('aria-selected', 'false');
                        removeClass([element_1], className);
                        if (hideElement) {
                            hideElement.setAttribute('aria-selected', 'false');
                            removeClass([element_1, hideElement], className);
                        }
                        _this.notify('activeList', {
                            module: 'CheckBoxSelection',
                            enable: _this.mode === 'CheckBox', li: element_1,
                            e: _this, index: index
                        });
                        _this.invokeCheckboxSelection(element_1, eve, isClearAll);
                    }
                    var currentValue_2 = _this.allowObjectBinding ? getValue(((_this.fields.value) ?
                        _this.fields.value : ''), value) : value;
                    if (_this.hideSelectedItem && _this.fields.groupBy && element_1) {
                        _this.hideGroupItem(currentValue_2);
                    }
                    if (_this.hideSelectedItem && _this.fixedHeaderElement && _this.fields.groupBy && _this.mode !== 'CheckBox' &&
                        _this.isPopupOpen()) {
                        _super.prototype.scrollStop.call(_this);
                    }
                    _this.updateMainList(true, currentValue_2);
                    _this.removeChip(currentValue_2, isClearAll);
                    _this.updateChipStatus();
                    var limit = _this.value && _this.value.length ? _this.value.length : 0;
                    if (limit < _this.maximumSelectionLength) {
                        var collection = _this.list.querySelectorAll('li.'
                            + dropDownBaseClasses.li + ':not(.e-active)');
                        removeClass(collection, 'e-disable');
                    }
                    _this.trigger('removed', eventArgs);
                    var targetEle_1 = eve && eve.currentTarget;
                    var isSelectAll = (targetEle_1 && targetEle_1.classList.contains('e-selectall-parent')) ? true : null;
                    if (!_this.changeOnBlur && !isClearAll && (eve && length && !isSelectAll && _this.isSelectAllTarget)) {
                        _this.updateValueState(eve, _this.value, _this.tempValues);
                    }
                    if (length) {
                        _this.selectAllEventData.push(val_1);
                        _this.selectAllEventEle.push(element_1);
                    }
                    if (length === 1) {
                        if (!_this.changeOnBlur) {
                            _this.updateValueState(eve, _this.value, _this.tempValues);
                        }
                        var args = {
                            event: eve,
                            items: _this.selectAllEventEle,
                            itemData: _this.selectAllEventData,
                            isInteracted: eve ? true : false,
                            isChecked: false
                        };
                        _this.trigger('selectedAll', args);
                        _this.selectAllEventData = [];
                        _this.selectAllEventEle = [];
                    }
                    if (isClearAll && (length === 1 || length === null)) {
                        _this.clearAllCallback(eve, isClearAll);
                    }
                    if (_this.isPopupOpen() && element_1 && element_1.parentElement.classList.contains('e-reorder')) {
                        if (_this.hideSelectedItem && _this.value && Array.isArray(_this.value) && _this.value.length > 0) {
                            _this.totalItemsCount();
                        }
                        _this.notify('setCurrentViewDataAsync', {
                            module: 'VirtualScroll'
                        });
                    }
                }
            });
        }
    };
    MultiSelect.prototype.updateMainList = function (state, value, mainElement) {
        if (this.allowFiltering || this.mode === 'CheckBox') {
            var element2 = mainElement ? mainElement :
                this.findListElement(this.mainList, 'li', 'data-value', value);
            if (element2) {
                if (state) {
                    element2.setAttribute('aria-selected', 'false');
                    removeClass([element2], this.hideSelectedItem ?
                        HIDE_LIST :
                        dropDownBaseClasses.selected);
                    if (this.mode === 'CheckBox') {
                        removeClass([element2.firstElementChild.lastElementChild], 'e-check');
                    }
                }
                else {
                    element2.setAttribute('aria-selected', 'true');
                    addClass([element2], this.hideSelectedItem ?
                        HIDE_LIST :
                        dropDownBaseClasses.selected);
                    if (this.mode === 'CheckBox') {
                        addClass([element2.firstElementChild.lastElementChild], 'e-check');
                    }
                }
            }
        }
    };
    MultiSelect.prototype.removeChip = function (value, isClearAll) {
        if (this.chipCollectionWrapper) {
            if (!(this.enableVirtualization && isClearAll)) {
                var element = this.findListElement(this.chipCollectionWrapper, 'span', 'data-value', value);
                if (element) {
                    remove(element);
                }
            }
        }
    };
    MultiSelect.prototype.setWidth = function (width) {
        if (!isNullOrUndefined(width)) {
            if (typeof width === 'number') {
                this.overAllWrapper.style.width = formatUnit(width);
            }
            else if (typeof width === 'string') {
                this.overAllWrapper.style.width = (width.match(/px|%|em/)) ? (width) : (formatUnit(width));
            }
        }
    };
    MultiSelect.prototype.updateChipStatus = function () {
        if (this.value && this.value.length) {
            if (!isNullOrUndefined(this.chipCollectionWrapper)) {
                (this.chipCollectionWrapper.style.display = '');
            }
            if (this.mode === 'Delimiter' || this.mode === 'CheckBox') {
                this.showDelimWrapper();
            }
            this.showOverAllClear();
        }
        else {
            if (!isNullOrUndefined(this.chipCollectionWrapper)) {
                this.chipCollectionWrapper.style.display = 'none';
            }
            if (!isNullOrUndefined(this.delimiterWrapper)) {
                (this.delimiterWrapper.style.display = 'none');
            }
            this.hideOverAllClear();
        }
    };
    MultiSelect.prototype.indexOfObjectInArray = function (objectToFind, array) {
        var _loop_1 = function (i) {
            var item = array[i];
            // eslint-disable-next-line no-prototype-builtins
            if (Object.keys(objectToFind).every(function (key) { return item.hasOwnProperty(key) &&
                item[key] === objectToFind[key]; })) {
                return { value: i };
            }
        };
        for (var i = 0; i < array.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return -1; // Return -1 if the object is not found
    };
    MultiSelect.prototype.addValue = function (value, text, eve) {
        if (!this.value) {
            this.value = [];
        }
        var currentValue = this.allowObjectBinding ? this.getDataByValue(value) : value;
        if ((this.allowObjectBinding && !this.isObjectInArray(this.getDataByValue(value), this.value)) || (!this.allowObjectBinding &&
            this.value.indexOf(currentValue) < 0)) {
            this.setProperties({ value: [].concat([], this.value, [currentValue]) }, true);
            if (this.enableVirtualization && !this.isSelectAllLoop) {
                var data = this.viewWrapper.innerHTML;
                var temp = void 0;
                data += (this.value.length === 1) ? '' : this.delimiterChar + ' ';
                temp = this.getOverflowVal(this.value.length - 1);
                data += temp;
                temp = this.viewWrapper.innerHTML;
                this.updateWrapperText(this.viewWrapper, data);
            }
            if (this.enableVirtualization && this.mode === 'CheckBox') {
                var currentText = [];
                var value_1 = this.allowObjectBinding ?
                    getValue(((this.fields.value) ? this.fields.value : ''), this.value[this.value.length - 1]) :
                    this.value[this.value.length - 1];
                var temp = text;
                var textValues = this.text != null && this.text !== '' ? this.text + this.delimiterChar + temp : temp;
                currentText.push(textValues);
                this.setProperties({ text: currentText.toString() }, true);
            }
        }
        var element = this.findListElement(this.list, 'li', 'data-value', value);
        this.removeFocus();
        if (element) {
            this.addListFocus(element);
            this.addListSelection(element);
        }
        if (this.mode !== 'Delimiter' && this.mode !== 'CheckBox') {
            this.addChip(text, value, eve);
        }
        if (this.hideSelectedItem && this.fields.groupBy) {
            this.hideGroupItem(value);
        }
        this.updateChipStatus();
        this.checkMaxSelection();
    };
    MultiSelect.prototype.checkMaxSelection = function () {
        var limit = this.value && this.value.length ? this.value.length : 0;
        if (limit === this.maximumSelectionLength) {
            var activeItems = this.list.querySelectorAll('li.'
                + dropDownBaseClasses.li + '.e-active');
            removeClass(activeItems, 'e-disable');
            var inactiveItems = this.list.querySelectorAll('li.'
                + dropDownBaseClasses.li + ':not(.e-active)');
            addClass(inactiveItems, 'e-disable');
        }
        if (limit < this.maximumSelectionLength) {
            var collection = this.list.querySelectorAll('li.'
                + dropDownBaseClasses.li);
            removeClass(collection, 'e-disable');
        }
    };
    MultiSelect.prototype.dispatchSelect = function (value, eve, element, isNotTrigger, length, dataValue, text) {
        var _this = this;
        var list = this.listData;
        if (this.initStatus && !isNotTrigger) {
            value = this.allowObjectBinding ? getValue(((this.fields.value) ? this.fields.value : ''), value) : value;
            var val_2 = dataValue ? dataValue : this.getDataByValue(value);
            var eventArgs = {
                e: eve,
                item: element,
                itemData: val_2,
                isInteracted: eve ? true : false,
                cancel: false
            };
            this.trigger('select', eventArgs, function (eventArgs) {
                if (!eventArgs.cancel) {
                    if (length) {
                        _this.selectAllEventData.push(val_2);
                        _this.selectAllEventEle.push(element);
                    }
                    if (length === 1) {
                        var args = {
                            event: eve,
                            items: _this.selectAllEventEle,
                            itemData: _this.selectAllEventData,
                            isInteracted: eve ? true : false,
                            isChecked: true
                        };
                        _this.trigger('selectedAll', args);
                        _this.selectAllEventData = [];
                    }
                    if (_this.allowCustomValue && _this.isServerRendered && _this.listData !== list) {
                        _this.listData = list;
                    }
                    value = _this.allowObjectBinding ? _this.getDataByValue(value) : value;
                    if (_this.enableVirtualization) {
                        if (isNullOrUndefined(_this.selectedListData)) {
                            _this.selectedListData = [(_this.getDataByValue(value))];
                        }
                        else {
                            if (dataValue) {
                                if (Array.isArray(_this.selectedListData)) {
                                    _this.selectedListData.push(dataValue);
                                }
                                else {
                                    _this.selectedListData = [_this.selectedListData, dataValue];
                                }
                            }
                            else {
                                if (Array.isArray(_this.selectedListData)) {
                                    _this.selectedListData.push((_this.getDataByValue(value)));
                                }
                                else {
                                    _this.selectedListData = [_this.selectedListData, (_this.getDataByValue(value))];
                                }
                            }
                        }
                    }
                    if ((_this.enableVirtualization && value) || !_this.enableVirtualization) {
                        _this.updateListSelectEventCallback(value, element, eve, text);
                    }
                    if (_this.hideSelectedItem && _this.fixedHeaderElement && _this.fields.groupBy && _this.mode !== 'CheckBox') {
                        _super.prototype.scrollStop.call(_this);
                    }
                }
            });
        }
    };
    MultiSelect.prototype.addChip = function (text, value, e) {
        if (this.chipCollectionWrapper) {
            this.getChip(text, value, e);
        }
    };
    MultiSelect.prototype.removeChipFocus = function () {
        var elements = this.chipCollectionWrapper.querySelectorAll('span.' + CHIP + '.' + CHIP_SELECTED);
        removeClass(elements, CHIP_SELECTED);
        if (Browser.isDevice) {
            var closeElements = this.chipCollectionWrapper.querySelectorAll('span.' + CHIP_CLOSE.split(' ')[0]);
            for (var index = 0; index < closeElements.length; index++) {
                closeElements[index].style.display = 'none';
            }
        }
    };
    MultiSelect.prototype.onMobileChipInteraction = function (e) {
        var chipElem = closest(e.target, '.' + CHIP);
        var chipClose = chipElem.querySelector('span.' + CHIP_CLOSE.split(' ')[0]);
        if (this.enabled && !this.readonly) {
            if (!chipElem.classList.contains(CHIP_SELECTED)) {
                this.removeChipFocus();
                chipClose.style.display = '';
                chipElem.classList.add(CHIP_SELECTED);
            }
            this.refreshPopup();
            e.preventDefault();
        }
    };
    MultiSelect.prototype.multiCompiler = function (multiselectTemplate) {
        var checkTemplate = false;
        if (typeof multiselectTemplate !== 'function' && multiselectTemplate) {
            try {
                checkTemplate = (selectAll(multiselectTemplate, document).length) ? true : false;
            }
            catch (exception) {
                checkTemplate = false;
            }
        }
        return checkTemplate;
    };
    MultiSelect.prototype.encodeHtmlEntities = function (input) {
        return input.replace(/[\u00A0-\u9999<>&]/g, function (match) {
            return "&#" + match.charCodeAt(0) + ";";
        });
    };
    MultiSelect.prototype.getChip = function (data, value, e) {
        var _this = this;
        var itemData = { text: value, value: value };
        var chip = this.createElement('span', {
            className: CHIP,
            attrs: { 'data-value': value, 'title': data }
        });
        var compiledString;
        var chipContent = this.createElement('span', { className: CHIP_CONTENT });
        var chipClose = this.createElement('span', { className: CHIP_CLOSE });
        if (this.mainData) {
            itemData = this.getDataByValue(value);
        }
        if (this.valueTemplate && !isNullOrUndefined(itemData)) {
            var valuecheck = this.multiCompiler(this.valueTemplate);
            if (typeof this.valueTemplate !== 'function' && valuecheck) {
                compiledString = compile(select(this.valueTemplate, document).innerHTML.trim());
            }
            else {
                compiledString = compile(this.valueTemplate);
            }
            var valueCompTemp = compiledString(itemData, this, 'valueTemplate', this.valueTemplateId, this.isStringTemplate, null, chipContent);
            if (valueCompTemp && valueCompTemp.length > 0) {
                append(valueCompTemp, chipContent);
            }
            this.renderReactTemplates();
        }
        else if (this.enableHtmlSanitizer) {
            chipContent.innerText = data;
        }
        else {
            chipContent.innerHTML = this.encodeHtmlEntities(data.toString());
        }
        chip.appendChild(chipContent);
        var eventArgs = {
            isInteracted: e ? true : false,
            itemData: itemData,
            e: e,
            setClass: function (classes) {
                addClass([chip], classes);
            },
            cancel: false
        };
        this.isPreventChange = this.isAngular && this.preventChange;
        this.trigger('tagging', eventArgs, function (eventArgs) {
            if (!eventArgs.cancel) {
                if (Browser.isDevice) {
                    chip.classList.add(MOBILE_CHIP);
                    append([chipClose], chip);
                    chipClose.style.display = 'none';
                    EventHandler.add(chip, 'click', _this.onMobileChipInteraction, _this);
                }
                else {
                    EventHandler.add(chip, 'mousedown', _this.chipClick, _this);
                    if (_this.showClearButton) {
                        chip.appendChild(chipClose);
                    }
                }
                EventHandler.add(chipClose, 'mousedown', _this.onChipRemove, _this);
                _this.chipCollectionWrapper.appendChild(chip);
                if (!_this.changeOnBlur && e) {
                    _this.updateValueState(e, _this.value, _this.tempValues);
                }
            }
        });
    };
    MultiSelect.prototype.calcPopupWidth = function () {
        var width = formatUnit(this.popupWidth);
        if (width.indexOf('%') > -1) {
            var inputWidth = (this.componentWrapper.offsetWidth) * parseFloat(width) / 100;
            width = inputWidth.toString() + 'px';
        }
        return width;
    };
    MultiSelect.prototype.mouseIn = function () {
        if (this.enabled && !this.readonly) {
            this.showOverAllClear();
        }
    };
    MultiSelect.prototype.mouseOut = function () {
        if (!this.inputFocus) {
            this.overAllClear.style.display = 'none';
        }
    };
    MultiSelect.prototype.listOption = function (dataSource, fields) {
        var iconCss = isNullOrUndefined(fields.iconCss) ? false : true;
        var fieldProperty = isNullOrUndefined(fields.properties) ? fields :
            fields.properties;
        this.listCurrentOptions = (fields.text !== null || fields.value !== null) ? {
            fields: fieldProperty, showIcon: iconCss, ariaAttributes: { groupItemRole: 'presentation' }
        } : { fields: { value: 'text' } };
        extend(this.listCurrentOptions, this.listCurrentOptions, fields, true);
        if (this.mode === 'CheckBox') {
            this.notify('listoption', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox', dataSource: dataSource, fieldProperty: fieldProperty });
        }
        return this.listCurrentOptions;
    };
    MultiSelect.prototype.renderPopup = function () {
        var _this = this;
        if (!this.list) {
            _super.prototype.render.call(this);
        }
        if (this.popupObj && document.body.contains(this.popupObj.element) && this.allowFiltering) {
            this.refreshPopup();
            return;
        }
        if (!this.popupObj) {
            if (!isNullOrUndefined(this.popupWrapper)) {
                document.body.appendChild(this.popupWrapper);
                var checkboxFilter = this.popupWrapper.querySelector('.' + FILTERPARENT);
                if (this.mode === 'CheckBox' && !this.allowFiltering && checkboxFilter && this.filterParent) {
                    checkboxFilter.remove();
                    this.filterParent = null;
                }
                var overAllHeight = parseInt(this.popupHeight, 10);
                this.popupWrapper.style.visibility = 'hidden';
                if (this.headerTemplate) {
                    this.setHeaderTemplate();
                    overAllHeight -= this.header.offsetHeight;
                    this.isUpdateHeaderHeight = this.header.offsetHeight !== 0;
                }
                append([this.list], this.popupWrapper);
                if (!this.list.classList.contains(dropDownBaseClasses.noData) && this.getItems()[1]) {
                    this.listItemHeight = this.getItems()[1].offsetHeight +
                        parseInt(window.getComputedStyle(this.getItems()[1]).marginBottom, 10);
                }
                if (this.enableVirtualization && !this.list.classList.contains(dropDownBaseClasses.noData)) {
                    if (!this.list.querySelector('.e-virtual-ddl-content') && this.list.querySelector('.e-list-parent')) {
                        var contentElement = this.createElement('div', {
                            className: 'e-virtual-ddl-content'
                        });
                        contentElement.style.cssText = this.getTransformValues();
                        this.list.appendChild(contentElement).appendChild(this.list.querySelector('.e-list-parent'));
                    }
                    else if (this.list.querySelector('.e-virtual-ddl-content')) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = this.getTransformValues();
                    }
                    this.UpdateSkeleton();
                    this.liCollections = this.list.querySelectorAll('.' + dropDownBaseClasses.li);
                    this.virtualItemCount = this.itemCount;
                    if (this.mode !== 'CheckBox') {
                        this.totalItemsCount();
                    }
                    if (!this.list.querySelector('.e-virtual-ddl')) {
                        var virualElement = this.createElement('div', {
                            id: this.element.id + '_popup',
                            className: 'e-virtual-ddl'
                        });
                        virualElement.style.cssText = this.GetVirtualTrackHeight();
                        this.popupWrapper.querySelector('.e-dropdownbase').appendChild(virualElement);
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this.list.getElementsByClassName('e-virtual-ddl')[0].style = this.GetVirtualTrackHeight();
                    }
                }
                if (this.footerTemplate) {
                    this.setFooterTemplate();
                    overAllHeight -= this.footer.offsetHeight;
                    this.isUpdateFooterHeight = this.footer.offsetHeight !== 0;
                }
                if (this.mode === 'CheckBox' && this.showSelectAll) {
                    this.notify('selectAll', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox' });
                    overAllHeight -= this.selectAllHeight;
                }
                else if (this.mode === 'CheckBox' && !this.showSelectAll && (!this.headerTemplate && !this.footerTemplate)) {
                    this.notify('selectAll', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox' });
                    overAllHeight = parseInt(this.popupHeight, 10);
                }
                else if (this.mode === 'CheckBox' && !this.showSelectAll) {
                    this.notify('selectAll', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox' });
                    overAllHeight = parseInt(this.popupHeight, 10);
                    if (this.headerTemplate && this.header) {
                        overAllHeight -= this.header.offsetHeight;
                    }
                    if (this.footerTemplate && this.footer) {
                        overAllHeight -= this.footer.offsetHeight;
                    }
                }
                if (this.mode === 'CheckBox') {
                    var args = {
                        module: 'CheckBoxSelection',
                        enable: this.mode === 'CheckBox',
                        popupElement: this.popupWrapper
                    };
                    if (this.allowFiltering) {
                        this.notify('searchBox', args);
                        overAllHeight -= this.searchBoxHeight;
                    }
                    addClass([this.popupWrapper], 'e-checkbox');
                }
                if (this.popupHeight !== 'auto') {
                    this.list.style.maxHeight = formatUnit(overAllHeight);
                    this.popupWrapper.style.maxHeight = formatUnit(this.popupHeight);
                }
                else {
                    this.list.style.maxHeight = formatUnit(this.popupHeight);
                }
                this.popupObj = new Popup(this.popupWrapper, {
                    width: this.calcPopupWidth(), targetType: 'relative',
                    position: this.enableRtl ? { X: 'right', Y: 'bottom' } : { X: 'left', Y: 'bottom' },
                    relateTo: this.overAllWrapper,
                    collision: this.enableRtl ? { X: 'fit', Y: 'flip' } : { X: 'flip', Y: 'flip' }, offsetY: 1,
                    enableRtl: this.enableRtl, zIndex: this.zIndex,
                    close: function () {
                        if (_this.popupObj.element.parentElement) {
                            _this.popupObj.unwireScrollEvents();
                            // For restrict the page scrolling in safari browser
                            var checkboxFilterInput = _this.popupWrapper.querySelector('.' + FILTERINPUT);
                            if (_this.mode === 'CheckBox' && checkboxFilterInput && document.activeElement === checkboxFilterInput) {
                                checkboxFilterInput.blur();
                            }
                            detach(_this.popupObj.element);
                        }
                    },
                    open: function () {
                        _this.popupObj.resolveCollision();
                        if (!_this.isFirstClick) {
                            var ulElement = _this.list.querySelector('ul');
                            if (ulElement) {
                                if (!(_this.mode !== 'CheckBox' && (_this.allowFiltering || _this.allowCustomValue) &&
                                    _this.targetElement().trim() !== '')) {
                                    _this.mainList = ulElement.cloneNode ? ulElement.cloneNode(true) : ulElement;
                                }
                            }
                            _this.isFirstClick = true;
                        }
                        _this.popupObj.wireScrollEvents();
                        if (!(_this.mode !== 'CheckBox' && (_this.allowFiltering || _this.allowCustomValue) &&
                            _this.targetElement().trim() !== '') && !_this.enableVirtualization) {
                            _this.loadTemplate();
                            if (_this.enableVirtualization && _this.mode === 'CheckBox') {
                                _this.UpdateSkeleton();
                            }
                        }
                        _this.isPreventScrollAction = true;
                        _this.setScrollPosition();
                        if (!_this.list.classList.contains(dropDownBaseClasses.noData) && _this.getItems()[1] &&
                            _this.getItems()[1].offsetHeight !== 0) {
                            _this.listItemHeight = _this.getItems()[1].offsetHeight +
                                parseInt(window.getComputedStyle(_this.getItems()[1]).marginBottom, 10);
                            if (_this.list.getElementsByClassName('e-virtual-ddl-content')[0]) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                _this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = _this.getTransformValues();
                            }
                        }
                        if (_this.allowFiltering) {
                            _this.notify('inputFocus', {
                                module: 'CheckBoxSelection', enable: _this.mode === 'CheckBox', value: 'focus'
                            });
                        }
                        if (_this.enableVirtualization) {
                            _this.notify('bindScrollEvent', {
                                module: 'VirtualScroll',
                                component: _this.getModuleName(),
                                enable: _this.enableVirtualization
                            });
                            setTimeout(function () {
                                if (_this.value) {
                                    _this.updateSelectionList();
                                }
                                else if (_this.viewPortInfo && _this.viewPortInfo.offsets.top) {
                                    _this.list.scrollTop = _this.viewPortInfo.offsets.top;
                                }
                            }, 5);
                        }
                    }, targetExitViewport: function () {
                        if (!Browser.isDevice) {
                            _this.hidePopup();
                        }
                    }
                });
                this.checkCollision(this.popupWrapper);
                this.popupContentElement = this.popupObj.element.querySelector('.e-content');
                if (this.mode === 'CheckBox' && Browser.isDevice && this.allowFiltering && this.isDeviceFullScreen) {
                    this.notify('deviceSearchBox', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox' });
                }
                if (this.allowResize) {
                    this.setResize();
                }
                this.popupObj.close();
                this.popupWrapper.style.visibility = '';
            }
        }
    };
    MultiSelect.prototype.checkCollision = function (popupEle) {
        if (!(this.mode === 'CheckBox' && Browser.isDevice && this.allowFiltering && this.isDeviceFullScreen)) {
            var collision = isCollide(popupEle);
            if (collision.length > 0) {
                popupEle.style.marginTop = -parseInt(getComputedStyle(popupEle).marginTop, 10) + 'px';
            }
            this.popupObj.resolveCollision();
        }
    };
    MultiSelect.prototype.setHeaderTemplate = function () {
        var compiledString;
        if (this.header) {
            this.header.remove();
        }
        this.header = this.createElement('div');
        addClass([this.header], HEADER);
        var headercheck = this.multiCompiler(this.headerTemplate);
        if (typeof this.headerTemplate !== 'function' && headercheck) {
            compiledString = compile(select(this.headerTemplate, document).innerHTML.trim());
        }
        else {
            compiledString = compile(this.headerTemplate);
        }
        // eslint-disable-next-line
        var elements = compiledString({}, this, 'headerTemplate', this.headerTemplateId, this.isStringTemplate, null, this.header);
        if (elements && elements.length > 0) {
            append(elements, this.header);
        }
        if (this.mode === 'CheckBox' && this.showSelectAll) {
            prepend([this.header], this.popupWrapper);
        }
        else {
            append([this.header], this.popupWrapper);
        }
        EventHandler.add(this.header, 'mousedown', this.onListMouseDown, this);
    };
    MultiSelect.prototype.setFooterTemplate = function () {
        var compiledString;
        if (this.footer) {
            this.footer.remove();
        }
        this.footer = this.createElement('div');
        addClass([this.footer], FOOTER);
        var footercheck = this.multiCompiler(this.footerTemplate);
        if (typeof this.footerTemplate !== 'function' && footercheck) {
            compiledString = compile(select(this.footerTemplate, document).innerHTML.trim());
        }
        else {
            compiledString = compile(this.footerTemplate);
        }
        // eslint-disable-next-line
        var elements = compiledString({}, this, 'footerTemplate', this.footerTemplateId, this.isStringTemplate, null, this.footer);
        if (elements && elements.length > 0) {
            append(elements, this.footer);
        }
        append([this.footer], this.popupWrapper);
        EventHandler.add(this.footer, 'mousedown', this.onListMouseDown, this);
    };
    MultiSelect.prototype.updateInitialData = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var currentData = this.selectData;
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
        this.previousStartIndex = 0;
        this.previousEndIndex = this.itemCount;
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
        if (this.mode !== 'CheckBox') {
            this.totalItemCount = this.value && this.value.length ? this.totalItemCount - this.value.length : this.totalItemCount;
        }
        this.getSkeletonCount();
        this.skeletonCount = this.totalItemCount !== 0 && this.totalItemCount < this.itemCount * 2 &&
            ((!(this.dataSource instanceof DataManager)) || ((this.dataSource instanceof DataManager) &&
                (this.totalItemCount <= this.itemCount))) ? 0 : this.skeletonCount;
        this.UpdateSkeleton();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.list.getElementsByClassName('e-virtual-ddl')[0]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.list.getElementsByClassName('e-virtual-ddl')[0].style = this.GetVirtualTrackHeight();
        }
        else if (!this.list.querySelector('.e-virtual-ddl') && this.skeletonCount > 0) {
            var virualElement = this.createElement('div', {
                id: this.element.id + '_popup',
                className: 'e-virtual-ddl'
            });
            virualElement.style.cssText = this.GetVirtualTrackHeight();
            this.popupWrapper.querySelector('.e-dropdownbase').appendChild(virualElement);
        }
        this.listData = currentData;
        this.liCollections = this.list.querySelectorAll('.e-list-item');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.list.getElementsByClassName('e-virtual-ddl-content')[0]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = this.getTransformValues();
        }
        if (this.enableVirtualization) {
            this.notify('setGeneratedData', {
                module: 'VirtualScroll'
            });
        }
    };
    MultiSelect.prototype.clearAll = function (e) {
        if (this.enabled && !this.readonly) {
            var temp = void 0;
            this.setDynValue = false;
            this.isClearAllAction = true;
            if (this.value && this.value.length > 0) {
                if (this.allowFiltering) {
                    this.refreshListItems(null);
                    if (this.mode === 'CheckBox' && this.targetInputElement) {
                        this.targetInputElement.value = '';
                    }
                }
                var liElement = this.list && this.list.querySelectorAll('li.e-list-item');
                if (liElement && liElement.length > 0) {
                    this.selectAllItems(false, e);
                }
                else {
                    this.removeIndex = 0;
                    for (temp = this.value[this.removeIndex]; this.removeIndex < this.value.length; temp = this.value[this.removeIndex]) {
                        this.removeValue(temp, e, null, true);
                    }
                }
                this.selectedElementID = null;
                this.inputElement.removeAttribute('aria-activedescendant');
            }
            else {
                this.clearAllCallback(e);
            }
            this.checkAndResetCache();
            Input.createSpanElement(this.overAllWrapper, this.createElement);
            this.calculateWidth();
            if (!isNullOrUndefined(this.overAllWrapper) && !isNullOrUndefined(this.overAllWrapper.getElementsByClassName('e-ddl-icon')[0] && this.overAllWrapper.getElementsByClassName('e-float-text-content')[0] && this.floatLabelType !== 'Never')) {
                this.overAllWrapper.getElementsByClassName('e-float-text-content')[0].classList.add('e-icon');
            }
            if (this.enableVirtualization) {
                this.updateInitialData();
                if (this.chipCollectionWrapper) {
                    this.chipCollectionWrapper.innerHTML = '';
                }
                if (!this.isCustomDataUpdated) {
                    this.notify('setGeneratedData', {
                        module: 'VirtualScroll'
                    });
                }
            }
            if (this.enableVirtualization) {
                this.list.scrollTop = 0;
                this.virtualListInfo = null;
                this.previousStartIndex = 0;
                this.previousEndIndex = this.itemCount;
            }
            this.isClearAllAction = false;
        }
        this.isClearAllItem = true;
        EventHandler.add(document, 'mouseup', this.preventSelection, this);
    };
    MultiSelect.prototype.preventSelection = function (e) {
        if (this.isClearAllItem) {
            e.stopPropagation();
        }
        this.isClearAllItem = false;
        EventHandler.remove(document, 'mouseup', this.preventSelection);
    };
    MultiSelect.prototype.clearAllCallback = function (e, isClearAll) {
        var tempValues = this.value ? this.value.slice() : [];
        if (this.mainList && this.listData && ((this.allowFiltering && this.mode !== 'CheckBox') || this.allowCustomValue)) {
            var list = this.mainList.cloneNode ? this.mainList.cloneNode(true) : this.mainList;
            this.onActionComplete(list, this.mainData);
        }
        this.focusAtFirstListItem();
        this.updateDelimeter(this.delimiterChar, e);
        if (this.mode !== 'Box' && (!this.inputFocus || this.mode === 'CheckBox')) {
            this.updateDelimView();
        }
        if (this.inputElement.value !== '') {
            this.makeTextBoxEmpty();
            this.search(null);
        }
        this.checkPlaceholderSize();
        if (this.isPopupOpen()) {
            this.refreshPopup();
        }
        if (this.allowResize) {
            this.setResize();
        }
        if (!this.inputFocus) {
            if (this.changeOnBlur) {
                this.updateValueState(e, this.value, tempValues);
            }
            if (this.mode !== 'CheckBox') {
                this.inputElement.focus();
            }
        }
        if (this.mode === 'CheckBox') {
            this.refreshPlaceHolder();
            this.refreshInputHight();
            if (this.changeOnBlur && isClearAll && (isNullOrUndefined(this.value) || this.value.length === 0)) {
                this.updateValueState(e, this.value, this.tempValues);
            }
        }
        if (!this.changeOnBlur && isClearAll && (isNullOrUndefined(this.value) || this.value.length === 0)) {
            this.updateValueState(e, this.value, this.tempValues);
        }
        if (this.mode === 'CheckBox' && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
            this.updateListItems(this.list.querySelectorAll('li.e-list-item'), this.mainList.querySelectorAll('li.e-list-item'));
        }
        e.preventDefault();
    };
    MultiSelect.prototype.windowResize = function () {
        this.refreshPopup();
        if ((!this.inputFocus || this.mode === 'CheckBox') && this.viewWrapper && this.viewWrapper.parentElement) {
            this.updateDelimView();
        }
    };
    MultiSelect.prototype.resetValueHandler = function (e) {
        if (!isNullOrUndefined(this.inputElement)) {
            var formElement = closest(this.inputElement, 'form');
            if (formElement && e.target === formElement) {
                var textVal = (this.element.tagName === this.getNgDirective()) ?
                    null : this.element.getAttribute('data-initial-value');
                this.text = textVal;
            }
        }
    };
    MultiSelect.prototype.wireEvent = function () {
        EventHandler.add(this.componentWrapper, 'mousedown', this.wrapperClick, this);
        EventHandler.add(window, 'resize', this.windowResize, this);
        EventHandler.add(this.inputElement, 'focus', this.focusInHandler, this);
        EventHandler.add(this.inputElement, 'keydown', this.onKeyDown, this);
        EventHandler.add(this.inputElement, 'keyup', this.keyUp, this);
        if (this.mode !== 'CheckBox') {
            EventHandler.add(this.inputElement, 'input', this.onInput, this);
        }
        EventHandler.add(this.inputElement, 'blur', this.onBlurHandler, this);
        EventHandler.add(this.componentWrapper, 'mouseover', this.mouseIn, this);
        var formElement = closest(this.inputElement, 'form');
        if (formElement) {
            EventHandler.add(formElement, 'reset', this.resetValueHandler, this);
        }
        EventHandler.add(this.componentWrapper, 'mouseout', this.mouseOut, this);
        EventHandler.add(this.overAllClear, 'mousedown', this.clearAll, this);
        EventHandler.add(this.inputElement, 'paste', this.pasteHandler, this);
    };
    MultiSelect.prototype.onInput = function (e) {
        if (this.keyDownStatus) {
            this.isValidKey = true;
        }
        else {
            this.isValidKey = false;
        }
        this.keyDownStatus = false;
        // For Filtering works in mobile firefox
        if (Browser.isDevice && Browser.info.name === 'mozilla') {
            this.search(e);
        }
    };
    MultiSelect.prototype.pasteHandler = function (event) {
        var _this = this;
        setTimeout(function () {
            _this.expandTextbox();
            _this.search(event);
        });
    };
    MultiSelect.prototype.search = function (e) {
        var _this = this;
        this.preventSetCurrentData = false;
        this.firstItem = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : null;
        if (!isNullOrUndefined(e)) {
            this.keyCode = e.keyCode;
        }
        if (!this.isPopupOpen() && this.openOnClick) {
            this.showPopup(e);
        }
        this.openClick(e);
        if (this.checkTextLength() && !this.allowFiltering && !isNullOrUndefined(e) && (e.keyCode !== 8)) {
            this.focusAtFirstListItem();
        }
        else {
            var text = this.targetElement();
            if (this.allowFiltering) {
                if (this.allowCustomValue) {
                    this.isRemoteSelection = true;
                }
                this.checkAndResetCache();
                this.isRequesting = false;
                var eventArgs_1 = {
                    preventDefaultAction: false,
                    text: this.targetElement(),
                    updateData: function (dataSource, query, fields) {
                        if (eventArgs_1.cancel) {
                            return;
                        }
                        _this.isFiltered = true;
                        _this.customFilterQuery = query;
                        _this.remoteFilterAction = true;
                        _this.isCustomFiltering = true;
                        _this.dataUpdater(dataSource, query, fields);
                    },
                    event: e,
                    cancel: false
                };
                this.trigger('filtering', eventArgs_1, function (eventArgs) {
                    _this.isFilterPrevented = eventArgs.cancel;
                    if (!eventArgs.cancel) {
                        if (!_this.isFiltered && !eventArgs.preventDefaultAction) {
                            _this.filterAction = true;
                            _this.isFilteringAction = true;
                            if (_this.dataSource instanceof DataManager && _this.allowCustomValue) {
                                _this.isCustomRendered = false;
                            }
                            _this.dataUpdater(_this.dataSource, null, _this.fields);
                            _this.isFilteringAction = false;
                        }
                    }
                });
            }
            else if (this.allowCustomValue) {
                var query = new Query();
                query = this.allowFiltering && (text !== '') ? query.where(this.fields.text, 'startswith', text, this.ignoreCase, this.ignoreAccent) : query;
                if (this.enableVirtualization) {
                    this.dataUpdater(this.dataSource, query, this.fields);
                }
                else {
                    this.dataUpdater(this.mainData, query, this.fields);
                }
                this.UpdateSkeleton();
            }
            else {
                var liCollections = this.list.querySelectorAll('li.' + dropDownBaseClasses.li + ':not(.e-hide-listitem)');
                var type = this.typeOfData(this.listData).typeof;
                var activeElement = Search(this.targetElement(), liCollections, 'StartsWith', this.ignoreCase);
                if (this.enableVirtualization && this.targetElement().trim() !== '' && !this.allowFiltering) {
                    var updatingincrementalindex = false;
                    if ((this.viewPortInfo.endIndex >= this.incrementalEndIndex && this.incrementalEndIndex <= this.totalItemCount) ||
                        this.incrementalEndIndex === 0) {
                        updatingincrementalindex = true;
                        this.incrementalStartIndex = 0;
                        this.incrementalEndIndex = 100 > this.totalItemCount ? this.totalItemCount : 100;
                        this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
                        updatingincrementalindex = false;
                    }
                    if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
                        this.updateIncrementalView(0, this.itemCount);
                    }
                    activeElement = Search(this.targetElement(), this.incrementalLiCollections, this.filterType, true, this.listData, this.fields, type);
                    while (isNullOrUndefined(activeElement) && this.incrementalEndIndex < this.totalItemCount) {
                        this.incrementalStartIndex = this.incrementalEndIndex;
                        this.incrementalEndIndex = this.incrementalEndIndex + 100 > this.totalItemCount ? this.totalItemCount :
                            this.incrementalEndIndex + 100;
                        this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
                        updatingincrementalindex = true;
                        if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
                            this.updateIncrementalView(0, this.itemCount);
                        }
                        activeElement = Search(this.targetElement(), this.incrementalLiCollections, this.filterType, true, this.listData, this.fields, type);
                        if (!isNullOrUndefined(activeElement)) {
                            break;
                        }
                        if (isNullOrUndefined(activeElement) && this.incrementalEndIndex >= this.totalItemCount) {
                            this.incrementalStartIndex = 0;
                            this.incrementalEndIndex = 100 > this.totalItemCount ? this.totalItemCount : 100;
                            break;
                        }
                    }
                    if (activeElement.index) {
                        if (!(this.viewPortInfo.startIndex >= activeElement.index) ||
                            !(activeElement.index >= this.viewPortInfo.endIndex)) {
                            var startIndex = activeElement.index - ((this.itemCount / 2) - 2) > 0
                                ? activeElement.index - ((this.itemCount / 2) - 2)
                                : 0;
                            var endIndex = startIndex + this.itemCount > this.totalItemCount
                                ? this.totalItemCount
                                : startIndex + this.itemCount;
                            if (startIndex !== this.viewPortInfo.startIndex) {
                                this.updateIncrementalView(startIndex, endIndex);
                            }
                        }
                    }
                    if (!isNullOrUndefined(activeElement.item)) {
                        var index1 = this.getIndexByValue(activeElement.item.getAttribute('data-value')) - this.skeletonCount;
                        if (index1 > this.itemCount / 2) {
                            var startIndex = this.viewPortInfo.startIndex + ((this.itemCount / 2) - 2) < this.totalItemCount
                                ? this.viewPortInfo.startIndex + ((this.itemCount / 2) - 2)
                                : this.totalItemCount;
                            var endIndex = this.viewPortInfo.startIndex + this.itemCount > this.totalItemCount
                                ? this.totalItemCount
                                : this.viewPortInfo.startIndex + this.itemCount;
                            this.updateIncrementalView(startIndex, endIndex);
                        }
                        activeElement.item = this.getElementByValue(activeElement.item.getAttribute('data-value'));
                    }
                    else {
                        this.updateIncrementalView(0, this.itemCount);
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = this.getTransformValues();
                        this.list.scrollTop = 0;
                    }
                    if (activeElement && activeElement.item) {
                        activeElement.item = this.getElementByValue(activeElement.item.getAttribute('data-value'));
                    }
                }
                if (activeElement && activeElement.item) {
                    this.addListFocus(activeElement.item);
                    this.list.scrollTop =
                        activeElement.item.offsetHeight * activeElement.index;
                }
                else if (this.targetElement() !== '') {
                    this.removeFocus();
                }
                else {
                    this.focusAtFirstListItem();
                }
            }
        }
        if (this.enableVirtualization && this.allowFiltering) {
            this.getFilteringSkeletonCount();
        }
    };
    MultiSelect.prototype.preRender = function () {
        if (this.allowFiltering === null) {
            this.allowFiltering = (this.mode === 'CheckBox') ? true : false;
        }
        this.preventSetCurrentData = false;
        this.initializeData();
        this.updateDataAttribute(this.htmlAttributes);
        _super.prototype.preRender.call(this);
    };
    MultiSelect.prototype.getLocaleName = function () {
        return 'multi-select';
    };
    MultiSelect.prototype.initializeData = function () {
        this.mainListCollection = [];
        this.beforePopupOpen = false;
        this.filterAction = false;
        this.remoteFilterAction = false;
        this.isFirstClick = false;
        this.mobFilter = true;
        this.isFiltered = false;
        this.focused = true;
        this.initial = true;
        this.backCommand = true;
        this.isCustomRendered = false;
        this.isRemoteSelection = false;
        this.isSelectAllTarget = true;
        this.isaddNonPresentItems = false;
        this.viewPortInfo = {
            currentPageNumber: null,
            direction: null,
            sentinelInfo: {},
            offsets: {},
            startIndex: 0,
            endIndex: this.itemCount
        };
    };
    MultiSelect.prototype.updateData = function (delimiterChar, e, isInitialVirtualData) {
        var data = '';
        var delim = this.mode === 'Delimiter' || this.mode === 'CheckBox';
        var text = [];
        var temp;
        var tempData = this.listData;
        if (!this.enableVirtualization) {
            this.listData = this.mainData;
        }
        if (!isNullOrUndefined(this.hiddenElement) && !this.enableVirtualization) {
            this.hiddenElement.innerHTML = '';
        }
        if (!isNullOrUndefined(this.value)) {
            var valueLength = this.value.length;
            var hiddenElementContent = '';
            var _loop_2 = function (index) {
                var valueItem = this_1.allowObjectBinding ?
                    getValue((this_1.fields.value) ? this_1.fields.value : '', this_1.value[index]) : this_1.value[index];
                var listValue = this_1.findListElement((!isNullOrUndefined(this_1.mainList) ? this_1.mainList : this_1.ulElement), 'li', 'data-value', valueItem);
                if (this_1.enableVirtualization) {
                    listValue = this_1.findListElement((!isNullOrUndefined(this_1.list) ? this_1.list : this_1.ulElement), 'li', 'data-value', valueItem);
                }
                if (isNullOrUndefined(listValue) && !this_1.allowCustomValue && !this_1.enableVirtualization &&
                    this_1.listData && this_1.listData.length > 0) {
                    this_1.value.splice(index, 1);
                    index -= 1;
                    valueLength -= 1;
                }
                else {
                    if (this_1.listData) {
                        if (this_1.enableVirtualization) {
                            if (delim && !this_1.isDynamicRemoteVirtualData) {
                                data = this_1.delimiterWrapper && this_1.delimiterWrapper.innerHTML === '' ? data :
                                    this_1.delimiterWrapper.innerHTML;
                            }
                            var value = this_1.allowObjectBinding ?
                                getValue(((this_1.fields.value) ? this_1.fields.value : ''), this_1.value[this_1.value.length - 1]) :
                                this_1.value[this_1.value.length - 1];
                            if (this_1.isRemoveSelection) {
                                data = this_1.text.replace(/,/g, delimiterChar + ' ') + delimiterChar + ' ';
                                text = this_1.text.split(delimiterChar);
                            }
                            else {
                                temp = isInitialVirtualData && delim ? this_1.text : this_1.getTextByValue(value);
                                var textValues = this_1.isDynamicRemoteVirtualData && value != null && value !== '' && !isInitialVirtualData ?
                                    this_1.getTextByValue(value) : isInitialVirtualData ? this_1.text : (this_1.text && this_1.text !== '' ? this_1.text + this_1.delimiterChar + temp : temp);
                                data += temp + delimiterChar + ' ';
                                text.push(textValues);
                                hiddenElementContent = this_1.hiddenElement.innerHTML;
                            }
                            if ((e && e.currentTarget && e.currentTarget.classList.contains('e-chips-close')) ||
                                (e && (e.key === 'Backspace'))) {
                                var item_1 = e.target.parentElement.getAttribute('data-value');
                                if (e.key === 'Backspace') {
                                    var lastChild = this_1.hiddenElement.lastChild;
                                    if (lastChild) {
                                        this_1.hiddenElement.removeChild(lastChild);
                                    }
                                }
                                else {
                                    this_1.hiddenElement.childNodes.forEach(function (option) {
                                        if (option.value === item_1) {
                                            option.parentNode.removeChild(option);
                                        }
                                    });
                                }
                                hiddenElementContent = this_1.hiddenElement.innerHTML;
                            }
                            else {
                                hiddenElementContent += '<option selected value=\'' + value + '\'>' + index + '</option>';
                            }
                            return out_index_1 = index, "break";
                        }
                        else {
                            temp = this_1.getTextByValue(valueItem);
                        }
                    }
                    else {
                        temp = valueItem;
                    }
                    data += temp + delimiterChar + ' ';
                    text.push(temp);
                }
                hiddenElementContent += "<option selected value=\"" + valueItem + "\">" + index + "</option>";
                out_index_1 = index;
            };
            var this_1 = this, out_index_1;
            for (var index = 0; index < valueLength; index++) {
                var state_2 = _loop_2(index);
                index = out_index_1;
                if (state_2 === "break")
                    break;
            }
            if (!isNullOrUndefined(this.hiddenElement)) {
                if (this.isRemoveSelection) {
                    if (this.findListElement(this.hiddenElement, 'option', 'value', this.currentRemoveValue)) {
                        this.hiddenElement.removeChild(this.findListElement(this.hiddenElement, 'option', 'value', this.currentRemoveValue));
                    }
                    this.isRemoveSelection = false;
                }
                else {
                    this.hiddenElement.innerHTML = hiddenElementContent;
                }
            }
        }
        var isChipRemove = e && e.target && e.target.classList.contains('e-chips-close');
        if (!this.enableVirtualization || (this.enableVirtualization && this.mode !== 'CheckBox' && !isChipRemove)) {
            this.setProperties({ text: text.toString() }, true);
        }
        if (delim) {
            this.updateWrapperText(this.delimiterWrapper, data);
            this.delimiterWrapper.setAttribute('id', getUniqueID('delim_val'));
            this.inputElement.setAttribute('aria-describedby', this.delimiterWrapper.id);
        }
        var targetEle = e && e.target;
        var isClearAll = (targetEle && targetEle.classList.contains('e-close-hooker')) ? true : null;
        if (!this.changeOnBlur && ((e && !isClearAll)) || this.isSelectAll) {
            this.isSelectAll = false;
            this.updateValueState(e, this.value, this.tempValues);
        }
        this.listData = tempData;
        this.addValidInputClass();
    };
    MultiSelect.prototype.initialTextUpdate = function () {
        if (!isNullOrUndefined(this.text)) {
            var textArr = this.text.split(this.delimiterChar);
            var textVal = [];
            for (var index = 0; textArr.length > index; index++) {
                var val = this.getValueByText(textArr[index]);
                if (!isNullOrUndefined(val)) {
                    textVal.push(val);
                }
                else if (this.allowCustomValue) {
                    textVal.push(textArr[index]);
                }
            }
            if (textVal && textVal.length) {
                var value = this.allowObjectBinding ? this.getDataByValue(textVal) : textVal;
                this.setProperties({ value: value }, true);
            }
        }
        else {
            this.setProperties({ value: null }, true);
        }
    };
    MultiSelect.prototype.renderList = function (isEmptyData) {
        if (!isEmptyData && this.allowCustomValue && this.list && (this.list.textContent === this.noRecordsTemplate
            || this.list.querySelector('.e-ul') && this.list.querySelector('.e-ul').childElementCount === 0)) {
            isEmptyData = true;
        }
        _super.prototype.render.call(this, null, isEmptyData);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.totalItemCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
        this.unwireListEvents();
        this.wireListEvents();
    };
    MultiSelect.prototype.initialValueUpdate = function (listItems, isInitialVirtualData) {
        if (this.list) {
            var text = void 0;
            var element = void 0;
            var value = void 0;
            if (this.chipCollectionWrapper) {
                this.chipCollectionWrapper.innerHTML = '';
            }
            this.removeListSelection();
            if (!isNullOrUndefined(this.value)) {
                for (var index = 0; !isNullOrUndefined(this.value[index]); index++) {
                    value = this.allowObjectBinding ?
                        getValue(((this.fields.value) ? this.fields.value : ''), this.value[index]) :
                        this.value[index];
                    element = this.findListElement(this.hideSelectedItem ? this.ulElement : this.list, 'li', 'data-value', value);
                    var isCustomData = false;
                    if (this.enableVirtualization) {
                        text = null;
                        if (listItems != null && listItems.length > 0) {
                            for (var i = 0; i < listItems.length; i++) {
                                if ((this.isPrimitiveData && listItems[i] === value) || (!this.isPrimitiveData
                                    && getValue((this.fields.value ? this.fields.value :
                                        'value'), listItems[i]) === value)) {
                                    text = this.isPrimitiveData ? listItems[i] :
                                        getValue(this.fields.text, listItems[i]);
                                    if (this.enableVirtualization) {
                                        if (isNullOrUndefined(this.selectedListData)) {
                                            this.selectedListData = [listItems[i]];
                                        }
                                        else {
                                            if (Array.isArray(this.selectedListData)) {
                                                this.selectedListData.push((listItems[i]));
                                            }
                                            else {
                                                this.selectedListData = [this.selectedListData, (listItems[i])];
                                            }
                                        }
                                    }
                                    break;
                                }
                            }
                        }
                        if ((isNullOrUndefined(text) && this.allowCustomValue) &&
                            ((!(this.dataSource instanceof DataManager)) ||
                                (this.dataSource instanceof DataManager && isInitialVirtualData))) {
                            text = this.getTextByValue(value);
                            isCustomData = true;
                        }
                    }
                    else {
                        text = this.getTextByValue(value);
                    }
                    if (((element && (element.getAttribute('aria-selected') !== 'true')) ||
                        (element && (element.getAttribute('aria-selected') === 'true' && this.hideSelectedItem) &&
                            (this.mode === 'Box' || this.mode === 'Default'))) ||
                        (this.enableVirtualization && value != null && text != null && !isCustomData)) {
                        var currentText = [];
                        var textValues = this.isDynamicRemoteVirtualData && text != null && text !== '' && index === 0 ? text : this.text != null && this.text !== '' && !this.text.includes(text) ? this.text + this.delimiterChar + text : text;
                        currentText.push(textValues);
                        this.setProperties({ text: currentText.toString() }, true);
                        this.addChip(text, value);
                        this.addListSelection(element);
                    }
                    else if ((!this.enableVirtualization && value && this.allowCustomValue) ||
                        (this.enableVirtualization &&
                            value &&
                            this.allowCustomValue &&
                            ((!(this.dataSource instanceof DataManager)) ||
                                (this.dataSource instanceof DataManager && isInitialVirtualData)))) {
                        var indexItem = this.listData.length;
                        var newValue = {};
                        setValue(this.fields.text, value, newValue);
                        setValue(this.fields.value, value, newValue);
                        var noDataEle = this.popupWrapper.querySelector('.' + dropDownBaseClasses.noData);
                        if (!this.enableVirtualization) {
                            this.addItem(newValue, indexItem);
                        }
                        if (this.enableVirtualization) {
                            if (this.virtualCustomSelectData && this.virtualCustomSelectData.length >= 0) {
                                this.virtualCustomSelectData.push(newValue);
                            }
                            else {
                                this.virtualCustomSelectData = [newValue];
                            }
                        }
                        element = element ? element : this.findListElement(this.hideSelectedItem ?
                            this.ulElement : this.list, 'li', 'data-value', value);
                        if (this.popupWrapper.contains(noDataEle)) {
                            this.list.setAttribute('style', noDataEle.getAttribute('style'));
                            this.popupWrapper.replaceChild(this.list, noDataEle);
                            this.wireListEvents();
                        }
                        var currentText = [];
                        var textValues = this.text != null && this.text !== '' ? this.text + this.delimiterChar + text : text;
                        currentText.push(textValues);
                        this.setProperties({ text: currentText.toString() }, true);
                        this.addChip(text, value);
                        this.addListSelection(element);
                    }
                }
            }
            if (this.mode === 'CheckBox') {
                this.updateDelimView();
                if (this.changeOnBlur) {
                    this.updateValueState(null, this.value, this.tempValues);
                }
                this.updateDelimeter(this.delimiterChar);
                this.refreshInputHight();
            }
            else {
                this.updateDelimeter(this.delimiterChar, null, isInitialVirtualData);
            }
            if (this.mode === 'CheckBox' && this.showSelectAll && (isNullOrUndefined(this.value) || !this.value.length)) {
                this.notify('checkSelectAll', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox', value: 'uncheck' });
            }
            if (this.mode === 'Box' || (this.mode === 'Default' && this.inputFocus)) {
                this.chipCollectionWrapper.style.display = '';
            }
            else if (this.mode === 'Delimiter' || this.mode === 'CheckBox') {
                this.showDelimWrapper();
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MultiSelect.prototype.updateActionCompleteData = function (li, item) {
        if (this.value && ((!this.allowObjectBinding && this.value.indexOf(li.getAttribute('data-value')) > -1) ||
            (this.allowObjectBinding && this.isObjectInArray(this.getDataByValue(li.getAttribute('data-value')), this.value)))) {
            this.mainList = this.ulElement;
            if (this.hideSelectedItem) {
                addClass([li], HIDE_LIST);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MultiSelect.prototype.updateAddItemList = function (list, itemCount) {
        if (this.popupObj && this.popupObj.element && this.popupObj.element.querySelector('.' + dropDownBaseClasses.noData) && list) {
            this.list = list;
            this.mainList = this.ulElement = list.querySelector('ul');
            remove(this.popupWrapper.querySelector('.e-content'));
            this.popupObj = null;
            this.renderPopup();
        }
        else if (this.allowCustomValue) {
            this.list = list;
            this.mainList = this.ulElement = list.querySelector('ul');
        }
    };
    MultiSelect.prototype.updateDataList = function () {
        if (this.mainList && this.ulElement && !(this.isFiltered || this.filterAction || this.targetElement().trim())) {
            var isDynamicGroupItemUpdate = this.mainList.childElementCount < this.ulElement.childElementCount;
            var isReactTemplateUpdate = ((this.ulElement.childElementCount > 0 &&
                this.ulElement.children[0].childElementCount > 0) &&
                (this.mainList.children[0] && (this.mainList.children[0].childElementCount <
                    this.ulElement.children[0].childElementCount)));
            var isAngularTemplateUpdate = this.itemTemplate && this.ulElement.childElementCount > 0 &&
                !(this.ulElement.childElementCount < this.mainList.childElementCount) &&
                (this.ulElement.children[0].childElementCount > 0 ||
                    (this.fields.groupBy && this.ulElement.children[1] && this.ulElement.children[1].childElementCount > 0));
            if (isDynamicGroupItemUpdate || isReactTemplateUpdate || isAngularTemplateUpdate) {
                //EJ2-57748 - for this task, we prevent the ul element cloning ( this.mainList = this.ulElement.cloneNode ? <HTMLElement>this.ulElement.cloneNode(true) : this.ulElement;)
                this.mainList = this.ulElement;
            }
        }
    };
    MultiSelect.prototype.isValidLI = function (li) {
        return (li && !li.classList.contains(dropDownBaseClasses.disabled) && !li.classList.contains(dropDownBaseClasses.group) &&
            li.classList.contains(dropDownBaseClasses.li));
    };
    MultiSelect.prototype.updateListSelection = function (li, e, length) {
        var customVal = li.getAttribute('data-value');
        var value = this.allowObjectBinding ?
            this.getDataByValue(this.getFormattedValue(customVal)) : this.getFormattedValue(customVal);
        if (this.allowCustomValue && ((customVal !== 'false' && value === false) ||
            (!isNullOrUndefined(value) && value.toString() === 'NaN'))) {
            value = customVal;
        }
        this.removeHover();
        if (!this.value || ((!this.allowObjectBinding && this.value.indexOf(value) === -1) ||
            (this.allowObjectBinding && this.indexOfObjectInArray(value, this.value) === -1))) {
            this.dispatchSelect(value, e, li, (li.getAttribute('aria-selected') === 'true'), length);
        }
        else {
            this.removeValue(value, e, length);
        }
    };
    MultiSelect.prototype.updateListSelectEventCallback = function (value, li, e, currentText) {
        var _this = this;
        value = this.allowObjectBinding ? getValue(((this.fields.value) ? this.fields.value : ''), value) : value;
        var text = currentText ? currentText : this.getTextByValue(value);
        if ((this.allowCustomValue || this.allowFiltering) &&
            !this.findListElement(this.mainList, 'li', 'data-value', value) &&
            (!this.enableVirtualization || (this.enableVirtualization && this.virtualCustomData))) {
            var temp_1 = li ? li.cloneNode(true) : li;
            var fieldValue = this.fields.value ? this.fields.value : 'value';
            if (this.allowCustomValue && this.mainData.length && typeof getValue(fieldValue, this.mainData[0]) === 'number') {
                value = !isNaN(parseFloat(value.toString())) ? parseFloat(value.toString()) : value;
            }
            var data_1 = this.getDataByValue(value);
            var eventArgs = {
                newData: data_1,
                cancel: false
            };
            this.trigger('customValueSelection', eventArgs, function (eventArgs) {
                if (!eventArgs.cancel) {
                    if (_this.enableVirtualization && _this.virtualCustomData) {
                        if (_this.virtualCustomSelectData && _this.virtualCustomSelectData.length >= 0) {
                            _this.virtualCustomSelectData.push(data_1);
                        }
                        else {
                            _this.virtualCustomSelectData = [data_1];
                        }
                        _this.remoteCustomValue = false;
                        _this.addValue(value, text, e);
                    }
                    else {
                        append([temp_1], _this.mainList);
                        _this.mainData.push(data_1);
                        _this.remoteCustomValue = false;
                        _this.addValue(value, text, e);
                    }
                }
            });
        }
        else {
            this.remoteCustomValue = false;
            this.addValue(value, text, e);
        }
    };
    MultiSelect.prototype.removeListSelection = function () {
        var className = this.hideSelectedItem ?
            HIDE_LIST :
            dropDownBaseClasses.selected;
        var selectedItems = this.list.querySelectorAll('.' + className);
        var temp = selectedItems.length;
        if (selectedItems && selectedItems.length) {
            removeClass(selectedItems, className);
            while (temp > 0) {
                selectedItems[temp - 1].setAttribute('aria-selected', 'false');
                temp--;
            }
        }
        if (!isNullOrUndefined(this.mainList)) {
            var selectItems = this.mainList.querySelectorAll('.' + className);
            var temp1 = selectItems.length;
            if (selectItems && selectItems.length) {
                removeClass(selectItems, className);
                while (temp1 > 0) {
                    selectItems[temp1 - 1].setAttribute('aria-selected', 'false');
                    if (this.mode === 'CheckBox') {
                        if (selectedItems && (selectedItems.length > (temp1 - 1))) {
                            removeClass([selectedItems[temp1 - 1].firstElementChild.lastElementChild], 'e-check');
                        }
                        removeClass([selectItems[temp1 - 1].firstElementChild.lastElementChild], 'e-check');
                    }
                    temp1--;
                }
            }
        }
    };
    MultiSelect.prototype.removeHover = function () {
        var hoveredItem = this.list.querySelectorAll('.' + dropDownBaseClasses.hover);
        if (hoveredItem && hoveredItem.length) {
            removeClass(hoveredItem, dropDownBaseClasses.hover);
        }
    };
    MultiSelect.prototype.removeFocus = function () {
        if (this.list && this.mainList) {
            var hoveredItem = this.list.querySelectorAll('.' + dropDownBaseClasses.focus);
            var mainlist = this.mainList.querySelectorAll('.' + dropDownBaseClasses.focus);
            if (hoveredItem && hoveredItem.length) {
                removeClass(hoveredItem, dropDownBaseClasses.focus);
                removeClass(mainlist, dropDownBaseClasses.focus);
            }
        }
    };
    MultiSelect.prototype.addListHover = function (li) {
        if (this.enabled && this.isValidLI(li)) {
            this.removeHover();
            addClass([li], dropDownBaseClasses.hover);
        }
        else {
            if ((li !== null && li.classList.contains('e-list-group-item')) && this.enableGroupCheckBox && this.mode === 'CheckBox'
                && !isNullOrUndefined(this.fields.groupBy)) {
                this.removeHover();
                addClass([li], dropDownBaseClasses.hover);
            }
        }
    };
    MultiSelect.prototype.addListFocus = function (element) {
        if (this.enabled && (this.isValidLI(element) || (this.fields.disabled && this.isDisabledElement(element)))) {
            this.removeFocus();
            addClass([element], dropDownBaseClasses.focus);
            this.updateAriaActiveDescendant();
        }
        else {
            if (this.enableGroupCheckBox && this.mode === 'CheckBox' && !isNullOrUndefined(this.fields.groupBy)) {
                addClass([element], dropDownBaseClasses.focus);
                this.updateAriaActiveDescendant();
            }
        }
    };
    MultiSelect.prototype.addListSelection = function (element, mainElement) {
        var className = this.hideSelectedItem ?
            HIDE_LIST :
            dropDownBaseClasses.selected;
        if (this.isValidLI(element) && !element.classList.contains(dropDownBaseClasses.hover)) {
            addClass([element], className);
            this.updateMainList(false, element.getAttribute('data-value'), mainElement);
            element.setAttribute('aria-selected', 'true');
            if (this.mode === 'CheckBox' && element.classList.contains('e-active')) {
                var ariaCheck = element.getElementsByClassName('e-check').length;
                if (ariaCheck === 0) {
                    this.notify('updatelist', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox', li: element, e: this });
                }
            }
            this.notify('activeList', { module: 'CheckBoxSelection', enable: this.mode === 'CheckBox', li: element, e: this });
            if (this.chipCollectionWrapper) {
                this.removeChipSelection();
            }
            this.selectedElementID = element.id;
        }
    };
    MultiSelect.prototype.updateDelimeter = function (delimChar, e, isInitialVirtualData) {
        this.updateData(delimChar, e, isInitialVirtualData);
    };
    MultiSelect.prototype.onMouseClick = function (e) {
        var _this = this;
        if (!this.isClearAllItem) {
            this.keyCode = null;
            this.scrollFocusStatus = false;
            this.keyboardEvent = null;
            var target = e.target;
            var li = closest(target, '.' + dropDownBaseClasses.li);
            if (this.enableVirtualization && li && li.classList.contains('e-virtual-list')) {
                return;
            }
            var headerLi = closest(target, '.' + dropDownBaseClasses.group);
            if (headerLi && this.enableGroupCheckBox && this.mode === 'CheckBox' && this.fields.groupBy) {
                target = target.classList.contains('e-list-group-item') ? target.firstElementChild.lastElementChild
                    : e.target;
                if (target.classList.contains('e-check')) {
                    this.selectAllItem(false, e);
                    target.classList.remove('e-check');
                    target.classList.remove('e-stop');
                    closest(target, '.' + 'e-list-group-item').classList.remove('e-active');
                    target.setAttribute('aria-selected', 'false');
                }
                else {
                    this.selectAllItem(true, e);
                    target.classList.remove('e-stop');
                    target.classList.add('e-check');
                    closest(target, '.' + 'e-list-group-item').classList.add('e-active');
                    target.setAttribute('aria-selected', 'true');
                }
                this.refreshSelection();
                this.checkSelectAll();
            }
            else {
                if (this.isValidLI(li)) {
                    var limit = this.value && this.value.length ? this.value.length : 0;
                    if (li.classList.contains('e-active')) {
                        limit = limit - 1;
                    }
                    if (limit < this.maximumSelectionLength) {
                        this.updateListSelection(li, e);
                        this.checkPlaceholderSize();
                        this.addListFocus(li);
                        if ((this.allowCustomValue || this.allowFiltering) && this.mainList && this.listData) {
                            if (this.mode !== 'CheckBox') {
                                this.focusAtLastListItem(li.getAttribute('data-value'));
                                this.refreshSelection();
                            }
                        }
                        else {
                            this.makeTextBoxEmpty();
                        }
                    }
                    if (this.mode === 'CheckBox') {
                        this.updateDelimView();
                        if (this.value && this.value.length > 50) {
                            setTimeout(function () {
                                _this.updateDelimeter(_this.delimiterChar, e);
                            }, 0);
                        }
                        else {
                            this.updateDelimeter(this.delimiterChar, e);
                        }
                        this.refreshInputHight();
                    }
                    else {
                        this.updateDelimeter(this.delimiterChar, e);
                    }
                    this.checkSelectAll();
                    this.refreshPopup();
                    if (this.allowResize) {
                        this.setResize();
                    }
                    if (this.hideSelectedItem) {
                        this.focusAtFirstListItem();
                    }
                    if (this.closePopupOnSelect) {
                        this.hidePopup(e);
                    }
                    else {
                        e.preventDefault();
                    }
                    var isFilterData = this.targetElement().trim() !== '' ? true : false;
                    this.makeTextBoxEmpty();
                    this.findGroupStart(target);
                    if (this.mode !== 'CheckBox') {
                        this.refreshListItems(isNullOrUndefined(li) ? null : li.textContent, isFilterData);
                    }
                }
                else {
                    e.preventDefault();
                }
                if (this.enableVirtualization && this.hideSelectedItem) {
                    var visibleListElements = this.list.querySelectorAll('li.'
                        + dropDownBaseClasses.li
                        + ':not(.' + HIDE_LIST + ')' + ':not(.e-reorder-hide)' + ':not(.e-virtual-list)');
                    if (visibleListElements.length) {
                        var actualCount = this.virtualListHeight > 0 ?
                            Math.floor(this.virtualListHeight / this.listItemHeight) : 0;
                        if (visibleListElements.length < (actualCount + 2)) {
                            var query = this.getForQuery(this.value).clone();
                            query = query.skip(this.virtualItemStartIndex);
                            this.resetList(this.dataSource, this.fields, query);
                            this.UpdateSkeleton();
                            this.liCollections = this.list.querySelectorAll('.'
                                + dropDownBaseClasses.li);
                            this.virtualItemCount = this.itemCount;
                            if (this.mode !== 'CheckBox') {
                                this.totalItemCount = this.value && this.value.length ? this.totalItemCount - this.value.length :
                                    this.totalItemCount;
                            }
                            if (!this.list.querySelector('.e-virtual-ddl')) {
                                var virualElement = this.createElement('div', {
                                    id: this.element.id + '_popup',
                                    className: 'e-virtual-ddl'
                                });
                                virualElement.style.cssText = this.GetVirtualTrackHeight();
                                this.popupWrapper.querySelector('.e-dropdownbase').appendChild(virualElement);
                            }
                            else {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                this.list.getElementsByClassName('e-virtual-ddl')[0].style = this.GetVirtualTrackHeight();
                            }
                            if (this.list.querySelector('.e-virtual-ddl-content')) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = this.getTransformValues();
                            }
                        }
                    }
                }
                this.refreshPlaceHolder();
                this.deselectHeader();
            }
        }
    };
    MultiSelect.prototype.findGroupStart = function (target) {
        if (this.enableGroupCheckBox && this.mode === 'CheckBox' && !isNullOrUndefined(this.fields.groupBy)) {
            var count = 0;
            var liChecked = 0;
            var liUnchecked = 0;
            var groupValues = void 0;
            if (this.itemTemplate && !target.getElementsByClassName('e-frame').length) {
                while (!target.getElementsByClassName('e-frame').length) {
                    target = target.parentElement;
                }
            }
            if (target.classList.contains('e-frame')) {
                target = target.parentElement.parentElement;
            }
            groupValues = this.findGroupAttrtibutes(target, liChecked, liUnchecked, count, 0);
            groupValues = this.findGroupAttrtibutes(target, groupValues[0], groupValues[1], groupValues[2], 1);
            while (!target.classList.contains('e-list-group-item')) {
                if (target.classList.contains('e-list-icon')) {
                    target = target.parentElement;
                }
                target = target.previousElementSibling;
                if (target == null) {
                    break;
                }
            }
            this.updateCheckBox(target, groupValues[0], groupValues[1], groupValues[2]);
        }
    };
    MultiSelect.prototype.findGroupAttrtibutes = function (listElement, checked, unChecked, count, position) {
        while (!listElement.classList.contains('e-list-group-item')) {
            if (!(this.fields.disabled && this.isDisabledElement(listElement))) {
                if (listElement.classList.contains('e-list-icon')) {
                    listElement = listElement.parentElement;
                }
                if (listElement.getElementsByClassName('e-frame')[0].classList.contains('e-check') &&
                    listElement.classList.contains('e-list-item')) {
                    checked++;
                }
                else if (listElement.classList.contains('e-list-item')) {
                    unChecked++;
                }
                count++;
            }
            listElement = position ? listElement.nextElementSibling : listElement.previousElementSibling;
            if (listElement == null) {
                break;
            }
        }
        return [checked, unChecked, count];
    };
    MultiSelect.prototype.updateCheckBox = function (groupHeader, checked, unChecked, count) {
        if (groupHeader === null || (!isNullOrUndefined(this.fields.disabled) && count === 0)) {
            return;
        }
        var checkBoxElement = groupHeader.getElementsByClassName('e-frame')[0];
        if (count === checked) {
            checkBoxElement.classList.remove('e-stop');
            checkBoxElement.classList.add('e-check');
            closest(checkBoxElement, '.' + 'e-list-group-item').classList.add('e-active');
            groupHeader.setAttribute('aria-selected', 'true');
        }
        else if (count === unChecked) {
            checkBoxElement.classList.remove('e-check');
            checkBoxElement.classList.remove('e-stop');
            closest(checkBoxElement, '.' + 'e-list-group-item').classList.remove('e-active');
            groupHeader.setAttribute('aria-selected', 'false');
        }
        else if (this.maximumSelectionLength === checked - 1) {
            checkBoxElement.classList.remove('e-stop');
            groupHeader.setAttribute('aria-selected', 'true');
            closest(checkBoxElement, '.' + 'e-list-group-item').classList.add('e-active');
            checkBoxElement.classList.add('e-check');
        }
        else {
            checkBoxElement.classList.remove('e-check');
            checkBoxElement.classList.add('e-stop');
            closest(checkBoxElement, '.' + 'e-list-group-item').classList.add('e-active');
            groupHeader.setAttribute('aria-selected', 'false');
        }
    };
    MultiSelect.prototype.disableGroupHeader = function () {
        var collection = this.list.querySelectorAll('li.e-list-group-item');
        if (collection) {
            for (var index = 0; index < collection.length; index++) {
                var isDisabled = true;
                var target = collection[index].nextElementSibling;
                while (!target.classList.contains('e-list-group-item')) {
                    if (!this.isDisabledElement(target)) {
                        isDisabled = false;
                        break;
                    }
                    target = target.nextElementSibling;
                    if (target == null) {
                        break;
                    }
                }
                if (isDisabled) {
                    this.disableListItem(collection[index]);
                }
            }
        }
    };
    MultiSelect.prototype.deselectHeader = function () {
        var limit = this.value && this.value.length ? this.value.length : 0;
        var collection = this.list.querySelectorAll('li.e-list-group-item:not(.e-active)');
        if (limit < this.maximumSelectionLength) {
            removeClass(collection, 'e-disable');
        }
        if (limit === this.maximumSelectionLength) {
            addClass(collection, 'e-disable');
        }
    };
    MultiSelect.prototype.onMouseOver = function (e) {
        var currentLi = closest(e.target, '.' + dropDownBaseClasses.li);
        if (currentLi === null && this.mode === 'CheckBox' && !isNullOrUndefined(this.fields.groupBy)
            && this.enableGroupCheckBox) {
            currentLi = closest(e.target, '.' + dropDownBaseClasses.group);
        }
        this.addListHover(currentLi);
    };
    MultiSelect.prototype.onMouseLeave = function () {
        this.removeHover();
    };
    MultiSelect.prototype.onListMouseDown = function (e) {
        e.preventDefault();
        this.scrollFocusStatus = true;
    };
    MultiSelect.prototype.onDocumentClick = function (e) {
        if (this.mode !== 'CheckBox') {
            var target = e.target;
            if (!(!isNullOrUndefined(this.popupObj) && closest(target, '[id="' + this.popupObj.element.id + '"]')) &&
                !this.overAllWrapper.contains(e.target)) {
                this.scrollFocusStatus = false;
            }
            else {
                this.scrollFocusStatus = (Browser.isIE || Browser.info.name === 'edge') && (document.activeElement === this.inputElement);
            }
        }
    };
    MultiSelect.prototype.wireListEvents = function () {
        if (!isNullOrUndefined(this.list)) {
            EventHandler.add(document, 'mousedown', this.onDocumentClick, this);
            EventHandler.add(this.list, 'mousedown', this.onListMouseDown, this);
            EventHandler.add(this.list, 'mouseup', this.onMouseClick, this);
            EventHandler.add(this.list, 'mouseover', this.onMouseOver, this);
            EventHandler.add(this.list, 'mouseout', this.onMouseLeave, this);
        }
    };
    MultiSelect.prototype.unwireListEvents = function () {
        EventHandler.remove(document, 'mousedown', this.onDocumentClick);
        if (this.list) {
            EventHandler.remove(this.list, 'mousedown', this.onListMouseDown);
            EventHandler.remove(this.list, 'mouseup', this.onMouseClick);
            EventHandler.remove(this.list, 'mouseover', this.onMouseOver);
            EventHandler.remove(this.list, 'mouseout', this.onMouseLeave);
        }
    };
    MultiSelect.prototype.hideOverAllClear = function () {
        if (!this.value || !this.value.length || this.inputElement.value === '') {
            this.overAllClear.style.display = 'none';
        }
    };
    MultiSelect.prototype.showOverAllClear = function () {
        if (((this.value && this.value.length) || this.inputElement.value !== '') && this.showClearButton && this.readonly !== true) {
            this.overAllClear.style.display = '';
        }
        else {
            this.overAllClear.style.display = 'none';
        }
    };
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    MultiSelect.prototype.focusIn = function () {
        if (document.activeElement !== this.inputElement && this.enabled) {
            this.inputElement.focus();
        }
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    MultiSelect.prototype.focusOut = function () {
        if (document.activeElement === this.inputElement && this.enabled) {
            this.inputElement.blur();
        }
    };
    /**
     * Shows the spinner loader.
     *
     * @returns {void}
     */
    MultiSelect.prototype.showSpinner = function () {
        if (isNullOrUndefined(this.spinnerElement)) {
            var filterClear = this.filterParent && this.filterParent.querySelector('.e-clear-icon.e-icons');
            if (this.overAllClear.style.display !== 'none' || filterClear) {
                this.spinnerElement = filterClear ? filterClear : this.overAllClear;
            }
            else {
                this.spinnerElement = this.createElement('span', { className: CLOSEICON_CLASS + ' ' + SPINNER_CLASS });
                this.componentWrapper.appendChild(this.spinnerElement);
            }
            createSpinner({ target: this.spinnerElement, width: Browser.isDevice ? '16px' : '14px' }, this.createElement);
            addClass([this.spinnerElement], DISABLE_ICON);
            showSpinner(this.spinnerElement);
        }
    };
    /**
     * Hides the spinner loader.
     *
     * @returns {void}
     */
    MultiSelect.prototype.hideSpinner = function () {
        if (!isNullOrUndefined(this.spinnerElement)) {
            hideSpinner(this.spinnerElement);
            removeClass([this.spinnerElement], DISABLE_ICON);
            if (this.spinnerElement.classList.contains(SPINNER_CLASS)) {
                detach(this.spinnerElement);
            }
            else {
                this.spinnerElement.innerHTML = '';
            }
            this.spinnerElement = null;
        }
    };
    MultiSelect.prototype.updateWrapperText = function (wrapperType, wrapperData) {
        if (this.valueTemplate || !this.enableHtmlSanitizer) {
            wrapperType.innerHTML = this.encodeHtmlEntities(wrapperData);
        }
        else {
            wrapperType.innerText = wrapperData;
        }
    };
    MultiSelect.prototype.updateDelimView = function () {
        if (this.delimiterWrapper) {
            this.hideDelimWrapper();
        }
        if (this.chipCollectionWrapper) {
            this.chipCollectionWrapper.style.display = 'none';
        }
        if (!isNullOrUndefined(this.viewWrapper)) {
            this.viewWrapper.style.display = '';
            this.viewWrapper.style.width = '';
            this.viewWrapper.classList.remove(TOTAL_COUNT_WRAPPER);
        }
        if (this.value && this.value.length) {
            var data = '';
            var temp = void 0;
            var tempData = void 0;
            var tempIndex = 1;
            var wrapperleng = void 0;
            var remaining = void 0;
            var downIconWidth = 0;
            var overAllContainer = void 0;
            if (!this.enableVirtualization) {
                this.updateWrapperText(this.viewWrapper, data);
            }
            var l10nLocale = {
                noRecordsTemplate: 'No records found',
                actionFailureTemplate: 'Request failed',
                overflowCountTemplate: '+${count} more..',
                totalCountTemplate: '${count} selected'
            };
            var l10n = new L10n(this.getLocaleName(), l10nLocale, this.locale);
            if (l10n.getConstant('actionFailureTemplate') === '') {
                l10n = new L10n('dropdowns', l10nLocale, this.locale);
            }
            if (l10n.getConstant('noRecordsTemplate') === '') {
                l10n = new L10n('dropdowns', l10nLocale, this.locale);
            }
            var remainContent = l10n.getConstant('overflowCountTemplate');
            var totalContent = l10n.getConstant('totalCountTemplate');
            var raminElement = this.createElement('span', {
                className: REMAIN_WRAPPER
            });
            var remainCompildTemp = remainContent.replace('${count}', this.value.length.toString());
            raminElement.innerText = remainCompildTemp;
            this.viewWrapper.appendChild(raminElement);
            this.renderReactTemplates();
            var remainSize = raminElement.offsetWidth;
            remove(raminElement);
            if (this.showDropDownIcon) {
                downIconWidth = this.dropIcon.offsetWidth + parseInt(window.getComputedStyle(this.dropIcon).marginRight, 10);
            }
            this.checkClearIconWidth();
            if (!isNullOrUndefined(this.value) && (this.allowCustomValue || (this.listData && this.listData.length > 0))) {
                for (var index = 0; !isNullOrUndefined(this.value[index]); index++) {
                    var items = this.text && this.text.split(this.delimiterChar);
                    if (!this.enableVirtualization) {
                        data += (index === 0) ? '' : this.delimiterChar + ' ';
                        temp = this.getOverflowVal(index);
                        data += temp;
                        temp = this.viewWrapper.innerHTML;
                        this.updateWrapperText(this.viewWrapper, data);
                    }
                    else if (items) {
                        data += (index === 0) ? '' : this.delimiterChar + ' ';
                        temp = items[index];
                        data += temp;
                        temp = this.viewWrapper.innerHTML;
                        this.updateWrapperText(this.viewWrapper, data);
                    }
                    wrapperleng = this.viewWrapper.offsetWidth +
                        parseInt(window.getComputedStyle(this.viewWrapper).paddingRight, 10);
                    overAllContainer = this.componentWrapper.offsetWidth -
                        parseInt(window.getComputedStyle(this.componentWrapper).paddingLeft, 10) -
                        parseInt(window.getComputedStyle(this.componentWrapper).paddingRight, 10);
                    if ((wrapperleng + downIconWidth + this.clearIconWidth) > overAllContainer) {
                        if (tempData !== undefined && tempData !== '') {
                            temp = tempData;
                            index = tempIndex + 1;
                        }
                        this.updateWrapperText(this.viewWrapper, temp);
                        remaining = this.value.length - index;
                        wrapperleng = this.viewWrapper.offsetWidth +
                            parseInt(window.getComputedStyle(this.viewWrapper).paddingRight, 10);
                        while (((wrapperleng + remainSize + downIconWidth + this.clearIconWidth) > overAllContainer) && wrapperleng !== 0
                            && this.viewWrapper.innerHTML !== '') {
                            var textArr = [];
                            this.viewWrapper.innerHTML = textArr.join(this.delimiterChar);
                            remaining = this.value.length;
                            wrapperleng = this.viewWrapper.offsetWidth +
                                parseInt(window.getComputedStyle(this.viewWrapper).paddingRight, 10);
                        }
                        break;
                    }
                    else if ((wrapperleng + remainSize + downIconWidth + this.clearIconWidth) <= overAllContainer) {
                        tempData = data;
                        tempIndex = index;
                    }
                    else if (index === 0) {
                        tempData = '';
                        tempIndex = -1;
                    }
                }
            }
            if (remaining > 0) {
                var totalWidth = overAllContainer - downIconWidth - this.clearIconWidth;
                this.viewWrapper.appendChild(this.updateRemainTemplate(raminElement, this.viewWrapper, remaining, remainContent, totalContent, totalWidth));
                this.updateRemainWidth(this.viewWrapper, totalWidth);
                this.updateRemainingText(raminElement, downIconWidth, remaining, remainContent, totalContent);
            }
        }
        else {
            if (!isNullOrUndefined(this.viewWrapper)) {
                this.viewWrapper.innerHTML = '';
                this.viewWrapper.style.display = 'none';
            }
        }
    };
    MultiSelect.prototype.checkClearIconWidth = function () {
        if (this.showClearButton) {
            this.clearIconWidth = this.overAllClear.offsetWidth;
        }
    };
    MultiSelect.prototype.updateRemainWidth = function (viewWrapper, totalWidth) {
        if (viewWrapper.classList.contains(TOTAL_COUNT_WRAPPER) && totalWidth < (viewWrapper.offsetWidth +
            parseInt(window.getComputedStyle(viewWrapper).paddingLeft, 10)
            + parseInt(window.getComputedStyle(viewWrapper).paddingLeft, 10))) {
            viewWrapper.style.width = totalWidth + 'px';
        }
    };
    MultiSelect.prototype.updateRemainTemplate = function (raminElement, viewWrapper, remaining, remainContent, totalContent, totalWidth) {
        if (viewWrapper.firstChild && viewWrapper.firstChild.nodeType === 3 && viewWrapper.firstChild.nodeValue === '') {
            viewWrapper.removeChild(viewWrapper.firstChild);
        }
        raminElement.innerHTML = '';
        var remainTemp = remainContent.replace('${count}', remaining.toString());
        var totalTemp = totalContent.replace('${count}', remaining.toString());
        raminElement.innerText = (viewWrapper.firstChild && viewWrapper.firstChild.nodeType === 3) ? remainTemp : totalTemp;
        if (viewWrapper.firstChild && viewWrapper.firstChild.nodeType === 3) {
            viewWrapper.classList.remove(TOTAL_COUNT_WRAPPER);
        }
        else {
            viewWrapper.classList.add(TOTAL_COUNT_WRAPPER);
            this.updateRemainWidth(viewWrapper, totalWidth);
        }
        return raminElement;
    };
    MultiSelect.prototype.updateRemainingText = function (raminElement, downIconWidth, remaining, remainContent, totalContent) {
        var overAllContainer = this.componentWrapper.offsetWidth -
            parseInt(window.getComputedStyle(this.componentWrapper).paddingLeft, 10) -
            parseInt(window.getComputedStyle(this.componentWrapper).paddingRight, 10);
        var wrapperleng = this.viewWrapper.offsetWidth + parseInt(window.getComputedStyle(this.viewWrapper).paddingRight, 10);
        if (((wrapperleng + downIconWidth) >= overAllContainer) && wrapperleng !== 0 && this.viewWrapper.firstChild &&
            this.viewWrapper.firstChild.nodeType === 3) {
            while (((wrapperleng + downIconWidth) > overAllContainer) && wrapperleng !== 0 && this.viewWrapper.firstChild &&
                this.viewWrapper.firstChild.nodeType === 3) {
                var textArr = this.viewWrapper.firstChild.nodeValue.split(this.delimiterChar);
                textArr.pop();
                this.viewWrapper.firstChild.nodeValue = textArr.join(this.delimiterChar);
                if (this.viewWrapper.firstChild.nodeValue === '') {
                    this.viewWrapper.removeChild(this.viewWrapper.firstChild);
                }
                remaining++;
                wrapperleng = this.viewWrapper.offsetWidth;
            }
            var totalWidth = overAllContainer - downIconWidth;
            this.updateRemainTemplate(raminElement, this.viewWrapper, remaining, remainContent, totalContent, totalWidth);
        }
    };
    MultiSelect.prototype.getOverflowVal = function (index) {
        var temp;
        if (this.mainData && this.mainData.length) {
            var value = this.allowObjectBinding ?
                getValue(((this.fields.value) ? this.fields.value : ''), this.value[index]) : this.value[index];
            if (this.mode === 'CheckBox') {
                var newTemp = this.listData;
                this.listData = this.mainData;
                temp = this.getTextByValue(value);
                this.listData = newTemp;
            }
            else {
                temp = this.getTextByValue(value);
            }
        }
        else {
            temp = this.allowObjectBinding ? getValue(((this.fields.value) ? this.fields.value : ''), this.value[index]) :
                this.value[index];
        }
        return temp;
    };
    MultiSelect.prototype.unWireEvent = function () {
        if (!isNullOrUndefined(this.componentWrapper)) {
            EventHandler.remove(this.componentWrapper, 'mousedown', this.wrapperClick);
        }
        EventHandler.remove(window, 'resize', this.windowResize);
        if (!isNullOrUndefined(this.inputElement)) {
            EventHandler.remove(this.inputElement, 'focus', this.focusInHandler);
            EventHandler.remove(this.inputElement, 'keydown', this.onKeyDown);
            if (this.mode !== 'CheckBox') {
                EventHandler.remove(this.inputElement, 'input', this.onInput);
            }
            EventHandler.remove(this.inputElement, 'keyup', this.keyUp);
            var formElement = closest(this.inputElement, 'form');
            if (formElement) {
                EventHandler.remove(formElement, 'reset', this.resetValueHandler);
            }
            EventHandler.remove(this.inputElement, 'blur', this.onBlurHandler);
        }
        if (!isNullOrUndefined(this.componentWrapper)) {
            EventHandler.remove(this.componentWrapper, 'mouseover', this.mouseIn);
            EventHandler.remove(this.componentWrapper, 'mouseout', this.mouseOut);
        }
        if (!isNullOrUndefined(this.overAllClear)) {
            EventHandler.remove(this.overAllClear, 'mousedown', this.clearAll);
        }
        if (!isNullOrUndefined(this.inputElement)) {
            EventHandler.remove(this.inputElement, 'paste', this.pasteHandler);
        }
    };
    MultiSelect.prototype.resizingWireEvent = function () {
        // Mouse events
        EventHandler.add(document, 'mousemove', this.resizePopup, this);
        EventHandler.add(document, 'mouseup', this.stopResizing, this);
        // Touch events
        EventHandler.add(document, 'touchmove', this.resizePopup, this);
        EventHandler.add(document, 'touchend', this.stopResizing, this);
    };
    MultiSelect.prototype.resizingUnWireEvent = function () {
        // Mouse events
        EventHandler.remove(document, 'mousemove', this.resizePopup);
        EventHandler.remove(document, 'mouseup', this.stopResizing);
        // Touch events
        EventHandler.remove(document, 'touchmove', this.resizePopup);
        EventHandler.remove(document, 'touchend', this.stopResizing);
    };
    MultiSelect.prototype.selectAllItem = function (state, event, list) {
        var li;
        if (!isNullOrUndefined(this.list)) {
            li = this.list.querySelectorAll(state ?
                'li.e-list-item:not([aria-selected="true"]):not(.e-reorder-hide):not(.e-disabled):not(.e-virtual-list)' :
                'li.e-list-item[aria-selected="true"]:not(.e-reorder-hide):not(.e-disabled):not(.e-virtual-list)');
        }
        if (this.value && this.value.length && event && event.target
            && closest(event.target, '.e-close-hooker') && this.allowFiltering) {
            li = this.mainList.querySelectorAll(state ?
                'li.e-list-item:not([aria-selected="true"]):not(.e-reorder-hide):not(.e-disabled):not(.e-virtual-list)' :
                'li.e-list-item[aria-selected="true"]:not(.e-reorder-hide):not(.e-disabled):not(.e-virtual-list)');
        }
        if (this.enableGroupCheckBox && this.mode === 'CheckBox' && !isNullOrUndefined(this.fields.groupBy)) {
            var target = (event ? (this.groupTemplate ?
                closest(event.target, '.e-list-group-item') : event.target) : null);
            target = (event && event.keyCode === 32) ? list : target;
            target = (target && target.classList.contains('e-frame')) ? target.parentElement.parentElement : target;
            if (target && target.classList.contains('e-list-group-item')) {
                var listElement = target.nextElementSibling;
                if (isNullOrUndefined(listElement)) {
                    return;
                }
                while (listElement.classList.contains('e-list-item')) {
                    if (!(this.fields.disabled && this.isDisabledElement(listElement))) {
                        if (state) {
                            if (!listElement.firstElementChild.lastElementChild.classList.contains('e-check')) {
                                var selectionLimit = this.value && this.value.length ? this.value.length : 0;
                                if (listElement.classList.contains('e-active')) {
                                    selectionLimit -= 1;
                                }
                                if (selectionLimit < this.maximumSelectionLength) {
                                    this.updateListSelection(listElement, event);
                                }
                            }
                        }
                        else {
                            if (listElement.firstElementChild.lastElementChild.classList.contains('e-check')) {
                                this.updateListSelection(listElement, event);
                            }
                        }
                    }
                    listElement = listElement.nextElementSibling;
                    if (listElement == null) {
                        break;
                    }
                }
                if (target.classList.contains('e-list-group-item')) {
                    var focusedElement = this.list.getElementsByClassName('e-item-focus')[0];
                    if (focusedElement) {
                        focusedElement.classList.remove('e-item-focus');
                    }
                    if (state) {
                        target.classList.add('e-active');
                    }
                    else {
                        target.classList.remove('e-active');
                    }
                    target.classList.add('e-item-focus');
                    this.updateAriaActiveDescendant();
                }
                this.textboxValueUpdate();
                this.checkPlaceholderSize();
                if (!this.changeOnBlur && event) {
                    this.updateValueState(event, this.value, this.tempValues);
                }
            }
            else {
                this.updateValue(event, li, state);
            }
        }
        else {
            this.updateValue(event, li, state);
        }
        this.addValidInputClass();
    };
    MultiSelect.prototype.virtualSelectionAll = function (state, li, event) {
        var _this = this;
        var index = 0;
        var length = li.length;
        var count = this.maximumSelectionLength;
        if (state) {
            this.virtualSelectAll = true;
            length = this.virtualSelectAllData && this.virtualSelectAllData.length !== 0 ? this.virtualSelectAllData.length : length;
            this.listData = this.virtualSelectAllData;
            var ulElement = this.createListItems(this.virtualSelectAllData.slice(0, 30), this.fields);
            var firstItems = ulElement.querySelectorAll('li');
            var fragment_1 = document.createDocumentFragment();
            firstItems.forEach(function (node) {
                fragment_1.appendChild(node.cloneNode(true));
            });
            li.forEach(function (node) {
                fragment_1.appendChild(node.cloneNode(true));
            });
            var concatenatedNodeList = fragment_1.childNodes;
            if (this.virtualSelectAllData instanceof Array) {
                while (index < length && index <= 50 && index < count) {
                    this.isSelectAllTarget = (length === index + 1);
                    if (concatenatedNodeList[index]) {
                        var value = this.allowObjectBinding
                            ? this.getDataByValue(concatenatedNodeList[index].getAttribute('data-value'))
                            : this.getFormattedValue(concatenatedNodeList[index].getAttribute('data-value'));
                        if (((!this.allowObjectBinding && this.value && this.value.indexOf(value) >= 0) ||
                            (this.allowObjectBinding && this.indexOfObjectInArray(value, this.value) >= 0))) {
                            index++;
                            continue;
                        }
                        this.updateListSelection(concatenatedNodeList[index], event, length - index);
                    }
                    else {
                        var value = getValue(this.fields.value ? this.fields.value : '', this.virtualSelectAllData[index]);
                        value = this.allowObjectBinding ? this.getDataByValue(value) : value;
                        if (((!this.allowObjectBinding && this.value && this.value.indexOf(value) >= 0) ||
                            (this.allowObjectBinding && this.indexOfObjectInArray(value, this.value) >= 0))) {
                            index++;
                            continue;
                        }
                        if (this.value && value != null && Array.isArray(this.value) &&
                            ((!this.allowObjectBinding && this.value.indexOf(value) < 0) ||
                                (this.allowObjectBinding && !this.isObjectInArray(value, this.value)))) {
                            this.dispatchSelect(value, event, null, false, length);
                        }
                    }
                    index++;
                }
                if (length > 50) {
                    setTimeout(function () {
                        if (_this.virtualSelectAllData && _this.virtualSelectAllData.length > 0) {
                            _this.virtualSelectAllData.map(function (obj) {
                                if (_this.value && obj[_this.fields.value] != null && Array.isArray(_this.value) &&
                                    ((!_this.allowObjectBinding && _this.value.indexOf(obj[_this.fields.value]) < 0) ||
                                        (_this.allowObjectBinding && !_this.isObjectInArray(obj[_this.fields.value], _this.value)))) {
                                    var value = obj[_this.fields.value];
                                    var text = (obj[_this.fields.text]).toString();
                                    _this.dispatchSelect(value, event, null, false, length, obj, text);
                                }
                            });
                        }
                        _this.updatedataValueItems(event);
                        _this.isSelectAllLoop = false;
                        if (!_this.changeOnBlur) {
                            _this.updateValueState(event, _this.value, _this.tempValues);
                            _this.isSelectAll = _this.isSelectAll ? !_this.isSelectAll : _this.isSelectAll;
                        }
                        _this.updateHiddenElement(true);
                        if (_this.popupWrapper && li[index - 1] && li[index - 1].classList.contains('e-item-focus')) {
                            var selectAllParent = document.getElementsByClassName('e-selectall-parent')[0];
                            if (selectAllParent && selectAllParent.classList.contains('e-item-focus')) {
                                li[index - 1].classList.remove('e-item-focus');
                            }
                        }
                    }, 0);
                }
            }
        }
        else {
            if (this.virtualSelectAllData && this.virtualSelectAllData.length > 0) {
                this.virtualSelectAllData.map(function (obj) {
                    _this.virtualSelectAll = true;
                    _this.removeValue(_this.value[index], event, _this.value.length - index);
                });
            }
            this.updatedataValueItems(event);
            if (!this.changeOnBlur) {
                this.updateValueState(event, this.value, this.tempValues);
                this.isSelectAll = this.isSelectAll ? !this.isSelectAll : this.isSelectAll;
            }
            this.updateHiddenElement();
            this.setProperties({ value: [] }, true);
            this.virtualSelectAll = false;
            if (!isNullOrUndefined(this.viewPortInfo.startIndex) && !isNullOrUndefined(this.viewPortInfo.endIndex)) {
                this.notify('setCurrentViewDataAsync', {
                    component: this.getModuleName(),
                    module: 'VirtualScroll'
                });
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var virtualTrackElement = this.list.getElementsByClassName('e-virtual-ddl')[0];
        if (virtualTrackElement) {
            virtualTrackElement.style = this.GetVirtualTrackHeight();
        }
        this.UpdateSkeleton();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var virtualContentElement = this.list.getElementsByClassName('e-virtual-ddl-content')[0];
        if (virtualContentElement) {
            virtualContentElement.style = this.getTransformValues();
        }
    };
    MultiSelect.prototype.updateValue = function (event, li, state) {
        var _this = this;
        var length = li.length;
        var beforeSelectArgs = {
            event: event,
            items: state ? li : [],
            itemData: state ? this.listData : [],
            isInteracted: event ? true : false,
            isChecked: state,
            preventSelectEvent: false
        };
        this.trigger('beforeSelectAll', beforeSelectArgs);
        if ((li && li.length) || (this.enableVirtualization && !state)) {
            var index_1 = 0;
            var count_1 = 0;
            if (this.enableGroupCheckBox) {
                count_1 = state ? this.maximumSelectionLength - (this.value ? this.value.length : 0) : li.length;
            }
            else {
                count_1 = state ? this.maximumSelectionLength - (this.value ? this.value.length : 0) : this.maximumSelectionLength;
            }
            if (!beforeSelectArgs.preventSelectEvent) {
                if (this.enableVirtualization) {
                    this.virtualSelectAllState = state;
                    this.virtualSelectAll = true;
                    this.CurrentEvent = event;
                    if (!this.virtualSelectAllData) {
                        this.resetList(this.dataSource, this.fields, new Query());
                    }
                    if (this.virtualSelectAllData) {
                        this.virtualSelectionAll(state, li, event);
                    }
                }
                else {
                    while (index_1 < length && index_1 <= 50 && index_1 < count_1) {
                        this.isSelectAllTarget = (length === index_1 + 1);
                        this.updateListSelection(li[index_1], event, length - index_1);
                        if (this.enableGroupCheckBox) {
                            this.findGroupStart(li[index_1]);
                        }
                        index_1++;
                    }
                    if (length > 50) {
                        setTimeout(function () {
                            while (index_1 < length && index_1 < count_1) {
                                _this.isSelectAllTarget = (length === index_1 + 1);
                                _this.updateListSelection(li[index_1], event, length - index_1);
                                if (_this.enableGroupCheckBox) {
                                    _this.findGroupStart(li[index_1]);
                                }
                                index_1++;
                            }
                            _this.updatedataValueItems(event);
                            if (!_this.changeOnBlur) {
                                _this.updateValueState(event, _this.value, _this.tempValues);
                                _this.isSelectAll = _this.isSelectAll ? !_this.isSelectAll : _this.isSelectAll;
                            }
                            _this.updateHiddenElement();
                            if (_this.popupWrapper && li[index_1 - 1].classList.contains('e-item-focus')) {
                                var selectAllParent = document.getElementsByClassName('e-selectall-parent')[0];
                                if (selectAllParent && selectAllParent.classList.contains('e-item-focus')) {
                                    li[index_1 - 1].classList.remove('e-item-focus');
                                }
                            }
                        }, 0);
                    }
                }
            }
            else {
                for (var i = 0; i < li.length && i < count_1; i++) {
                    this.removeHover();
                    var customVal = li[i].getAttribute('data-value');
                    var value = this.getFormattedValue(customVal);
                    value = this.allowObjectBinding ? this.getDataByValue(value) : value;
                    var mainElement = this.mainList ? this.mainList.querySelectorAll(state ?
                        'li.e-list-item:not([aria-selected="true"]):not(.e-reorder-hide)' :
                        'li.e-list-item[aria-selected="true"]:not(.e-reorder-hide)')[i] : null;
                    if (state) {
                        this.value = !this.value ? [] : this.value;
                        if ((!this.allowObjectBinding && this.value.indexOf(value) < 0) ||
                            (this.allowObjectBinding && !this.isObjectInArray(value, this.value))) {
                            this.setProperties({ value: [].concat([], this.value, [value]) }, true);
                        }
                        this.removeFocus();
                        this.addListSelection(li[i], mainElement);
                        this.updateChipStatus();
                        this.checkMaxSelection();
                    }
                    else {
                        this.removeAllItems(value, event, false, li[i], mainElement);
                    }
                    if (this.enableGroupCheckBox) {
                        this.findGroupStart(li[i]);
                    }
                }
                if (!state) {
                    var limit = this.value && this.value.length ? this.value.length : 0;
                    if (limit < this.maximumSelectionLength) {
                        var collection = this.list.querySelectorAll('li.'
                            + dropDownBaseClasses.li + ':not(.e-active)');
                        removeClass(collection, 'e-disable');
                    }
                }
                var args = {
                    event: event,
                    items: state ? li : [],
                    itemData: state ? this.listData : [],
                    isInteracted: event ? true : false,
                    isChecked: state
                };
                this.trigger('selectedAll', args);
            }
        }
        this.updatedataValueItems(event);
        this.checkPlaceholderSize();
        if (length <= 50 && !beforeSelectArgs.preventSelectEvent) {
            if (!this.changeOnBlur) {
                this.updateValueState(event, this.value, this.tempValues);
                this.isSelectAll = this.isSelectAll ? !this.isSelectAll : this.isSelectAll;
            }
            if ((this.enableVirtualization && this.value && this.value.length > 0) || !this.enableVirtualization) {
                this.updateHiddenElement();
            }
        }
    };
    MultiSelect.prototype.updateHiddenElement = function (isVirtualSelectAll) {
        var _this = this;
        var hiddenValue = '';
        var wrapperText = '';
        var data = '';
        var text = [];
        if (this.mode === 'CheckBox') {
            this.value.map(function (value, index) {
                hiddenValue += '<option selected value ="' + value + '">' + index + '</option>';
                if (!isVirtualSelectAll) {
                    if (_this.listData) {
                        data = _this.getTextByValue(value);
                    }
                    else {
                        data = value;
                    }
                    wrapperText += data + _this.delimiterChar + ' ';
                    text.push(data);
                }
            });
            this.hiddenElement.innerHTML = hiddenValue;
            if (!isVirtualSelectAll) {
                this.updateWrapperText(this.delimiterWrapper, wrapperText);
                this.setProperties({ text: text.toString() }, true);
            }
            this.delimiterWrapper.setAttribute('id', getUniqueID('delim_val'));
            this.inputElement.setAttribute('aria-describedby', this.delimiterWrapper.id);
            this.refreshInputHight();
            this.refreshPlaceHolder();
        }
    };
    MultiSelect.prototype.updatedataValueItems = function (event) {
        this.deselectHeader();
        this.textboxValueUpdate(event);
    };
    MultiSelect.prototype.textboxValueUpdate = function (event) {
        var isRemoveAll = event && event.target && (closest(event.target, '.e-selectall-parent')
            || closest(event.target, '.e-close-hooker'));
        if (this.mode !== 'Box' && !this.isPopupOpen() && !(this.mode === 'CheckBox' && (this.isSelectAll || isRemoveAll))) {
            this.updateDelimView();
        }
        else {
            this.searchWrapper.classList.remove(ZERO_SIZE);
        }
        if (this.mode === 'CheckBox') {
            this.updateDelimView();
            if ((!(isRemoveAll || this.isSelectAll) && this.isSelectAllTarget) || (this.isSelectAll && this.isSelectAllTarget)) {
                this.updateDelimeter(this.delimiterChar, event);
            }
            this.refreshInputHight();
        }
        else {
            this.updateDelimeter(this.delimiterChar, event);
        }
        this.refreshPlaceHolder();
    };
    MultiSelect.prototype.setZIndex = function () {
        if (this.popupObj) {
            this.popupObj.setProperties({ 'zIndex': this.zIndex });
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    MultiSelect.prototype.updateDataSource = function (prop) {
        if (isNullOrUndefined(this.list)) {
            this.renderPopup();
        }
        else {
            this.resetList(this.dataSource);
        }
        if (this.value && this.value.length) {
            this.setProperties({ 'value': this.value });
            this.refreshSelection();
        }
    };
    MultiSelect.prototype.onLoadSelect = function () {
        this.setDynValue = true;
        this.renderPopup();
    };
    MultiSelect.prototype.selectAllItems = function (state, event) {
        var _this = this;
        if (isNullOrUndefined(this.list)) {
            this.selectAllAction = function () {
                if (_this.mode === 'CheckBox' && _this.showSelectAll) {
                    var args = {
                        module: 'CheckBoxSelection',
                        enable: _this.mode === 'CheckBox',
                        value: state ? 'check' : 'uncheck'
                    };
                    _this.notify('checkSelectAll', args);
                }
                _this.selectAllItem(state, event);
                _this.selectAllAction = null;
            };
            _super.prototype.render.call(this);
        }
        else {
            this.selectAllAction = null;
            if (this.mode === 'CheckBox' && this.showSelectAll) {
                var args = {
                    value: state ? 'check' : 'uncheck',
                    enable: this.mode === 'CheckBox',
                    module: 'CheckBoxSelection'
                };
                this.notify('checkSelectAll', args);
            }
            this.selectAllItem(state, event);
        }
        if (!(this.dataSource instanceof DataManager) || (this.dataSource instanceof DataManager && this.virtualSelectAllData)) {
            this.virtualSelectAll = false;
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} Returns the persisted data of the component.
     */
    MultiSelect.prototype.getPersistData = function () {
        return this.addOnPersist(['value']);
    };
    /**
     * Dynamically change the value of properties.
     *
     * @param {MultiSelectModel} newProp - Returns the dynamic property value of the component.
     * @param {MultiSelectModel} oldProp - Returns the previous property value of the component.
     * @private
     * @returns {void}
     */
    MultiSelect.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (newProp.dataSource && !isNullOrUndefined(Object.keys(newProp.dataSource))
            || newProp.query && !isNullOrUndefined(Object.keys(newProp.query))) {
            this.mainList = null;
            this.mainData = null;
            this.isFirstClick = false;
            this.isDynamicDataChange = true;
        }
        if (this.getModuleName() === 'multiselect') {
            this.filterAction = false;
            this.setUpdateInitial(['fields', 'query', 'dataSource'], newProp);
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'query':
                case 'dataSource':
                    if (this.mode === 'CheckBox' && this.showSelectAll) {
                        if (!isNullOrUndefined(this.popupObj)) {
                            this.popupObj.destroy();
                            this.popupObj = null;
                        }
                        this.renderPopup();
                    }
                    break;
                case 'htmlAttributes':
                    this.updateHTMLAttribute();
                    break;
                case 'showClearButton':
                    this.updateClearButton(newProp.showClearButton);
                    break;
                case 'text':
                    if (this.fields.disabled) {
                        this.text =
                            this.text && !this.isDisabledItemByIndex(this.getIndexByValue(this.getValueByText(this.text))) ? this.text : null;
                    }
                    this.updateVal(this.value, this.value, 'text');
                    break;
                case 'value':
                    if (this.fields.disabled) {
                        this.removeDisabledItemsValue(this.value);
                    }
                    this.updateVal(this.value, oldProp.value, 'value');
                    this.addValidInputClass();
                    if (!this.closePopupOnSelect && this.isPopupOpen()) {
                        this.refreshPopup();
                    }
                    if (this.isPopupOpen() && this.mode === 'CheckBox' && this.list && this.list.querySelector('.e-active.e-disable')) {
                        var activeItems = this.list.querySelectorAll('li.' + dropDownBaseClasses.li + '.e-active' + '.e-disable');
                        removeClass(activeItems, 'e-disable');
                    }
                    this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
                    break;
                case 'width':
                    this.setWidth(newProp.width);
                    this.popupObj.setProperties({ width: this.calcPopupWidth() });
                    break;
                case 'placeholder':
                    this.refreshPlaceHolder();
                    break;
                case 'filterBarPlaceholder':
                    if (this.allowFiltering) {
                        this.notify('filterBarPlaceholder', { filterBarPlaceholder: newProp.filterBarPlaceholder });
                    }
                    break;
                case 'delimiterChar':
                    if (this.mode !== 'Box') {
                        this.updateDelimView();
                    }
                    this.updateData(newProp.delimiterChar);
                    break;
                case 'cssClass':
                    this.updateOldPropCssClass(oldProp.cssClass);
                    this.updateCssClass();
                    this.calculateWidth();
                    break;
                case 'enableRtl':
                    this.enableRTL(newProp.enableRtl);
                    _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
                    break;
                case 'allowResize':
                    this.allowResize = newProp.allowResize;
                    if (!this.allowResize && this.popupObj) {
                        var overAllHeight = parseInt(this.popupHeight, 10);
                        if (this.popupHeight !== 'auto') {
                            this.list.style.maxHeight = formatUnit(overAllHeight);
                            this.popupWrapper.style.height = formatUnit(this.popupHeight);
                            this.popupWrapper.style.maxHeight = formatUnit(this.popupHeight);
                        }
                        else {
                            this.list.style.maxHeight = formatUnit(this.popupHeight);
                        }
                    }
                    break;
                case 'readonly':
                    this.updateReadonly(newProp.readonly);
                    this.hidePopup();
                    break;
                case 'enabled':
                    this.hidePopup();
                    this.enable(newProp.enabled);
                    break;
                case 'showSelectAll':
                    if (this.popupObj) {
                        this.popupObj.destroy();
                        this.popupObj = null;
                    }
                    this.renderPopup();
                    break;
                case 'showDropDownIcon':
                    this.dropDownIcon();
                    break;
                case 'floatLabelType':
                    this.setFloatLabelType();
                    this.addValidInputClass();
                    Input.createSpanElement(this.overAllWrapper, this.createElement);
                    this.calculateWidth();
                    if (!isNullOrUndefined(this.overAllWrapper) &&
                        !isNullOrUndefined(this.overAllWrapper.getElementsByClassName('e-ddl-icon')[0] &&
                            this.overAllWrapper.getElementsByClassName('e-float-text-content')[0] && this.floatLabelType !== 'Never')) {
                        this.overAllWrapper.getElementsByClassName('e-float-text-content')[0].classList.add('e-icon');
                    }
                    break;
                case 'enableSelectionOrder':
                    break;
                case 'selectAllText':
                    this.notify('selectAllText', false);
                    break;
                case 'popupHeight':
                    if (this.popupObj) {
                        var overAllHeight = parseInt(this.popupHeight, 10);
                        if (this.popupHeight !== 'auto') {
                            this.list.style.maxHeight = formatUnit(overAllHeight);
                            this.popupWrapper.style.maxHeight = formatUnit(this.popupHeight);
                        }
                        else {
                            this.list.style.maxHeight = formatUnit(this.popupHeight);
                        }
                    }
                    break;
                case 'headerTemplate':
                case 'footerTemplate':
                    this.reInitializePoup();
                    break;
                case 'allowFiltering':
                    if (this.mode === 'CheckBox' && this.popupObj) {
                        this.reInitializePoup();
                    }
                    this.updateSelectElementData(this.allowFiltering);
                    break;
                case 'fields':
                    if (isNullOrUndefined(this.fields.groupBy)) {
                        this.removeScrollEvent();
                    }
                    break;
                default:
                    {
                        var msProps = this.getPropObject(prop, newProp, oldProp);
                        _super.prototype.onPropertyChanged.call(this, msProps.newProperty, msProps.oldProperty);
                    }
                    break;
            }
        }
    };
    MultiSelect.prototype.reInitializePoup = function () {
        if (this.popupObj) {
            this.popupObj.destroy();
            this.popupObj = null;
        }
        this.renderPopup();
    };
    MultiSelect.prototype.totalItemsCount = function () {
        var dataSourceCount;
        if (this.dataSource instanceof DataManager) {
            if (this.remoteDataCount >= 0) {
                dataSourceCount = this.totalItemCount = this.dataCount = this.remoteDataCount;
            }
            else {
                this.resetList(this.dataSource);
            }
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            dataSourceCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
        }
        if (this.mode === 'CheckBox') {
            this.totalItemCount = dataSourceCount !== 0 ? dataSourceCount : this.totalItemCount;
        }
        else {
            if (this.hideSelectedItem) {
                this.totalItemCount = dataSourceCount !== 0 && this.value ? dataSourceCount - this.value.length : this.totalItemCount;
                if (this.allowCustomValue && this.virtualCustomSelectData && this.virtualCustomSelectData.length > 0) {
                    for (var i = 0; i < this.virtualCustomSelectData.length; i++) {
                        for (var j = 0; j < this.value.length; j++) {
                            var value = this.allowObjectBinding ? getValue((this.fields.value) ?
                                this.fields.value : '', this.value[j]) : this.value[j];
                            var customValue = getValue((this.fields.value) ?
                                this.fields.value : '', this.virtualCustomSelectData[i]);
                            if (value === customValue) {
                                this.totalItemCount += 1;
                            }
                        }
                    }
                }
            }
            else {
                this.totalItemCount = dataSourceCount !== 0 ? dataSourceCount : this.totalItemCount;
                if (this.allowCustomValue && this.virtualCustomSelectData && this.virtualCustomSelectData.length > 0) {
                    this.totalItemCount += this.virtualCustomSelectData.length;
                }
            }
        }
    };
    MultiSelect.prototype.presentItemValue = function (ulElement) {
        var valuecheck = [];
        for (var i = 0; i < this.value.length; i++) {
            var value = this.allowObjectBinding ? getValue((this.fields.value) ?
                this.fields.value : '', this.value[i]) : this.value[i];
            var checkEle = this.findListElement(((this.allowFiltering && !isNullOrUndefined(this.mainList)) ? this.mainList : ulElement), 'li', 'data-value', value);
            if (!checkEle) {
                var checkvalue = this.allowObjectBinding ?
                    this.getDataByValue(this.value[i]) : this.value[i];
                valuecheck.push(checkvalue);
            }
        }
        return valuecheck;
    };
    MultiSelect.prototype.addNonPresentItems = function (valuecheck, ulElement, list, event) {
        var _this = this;
        this.dataSource.executeQuery(this.getForQuery(valuecheck)).then(function (e) {
            if (e.result.length > 0) {
                _this.addItem(e.result, list.length);
            }
            _this.updateActionList(ulElement, list, event);
        });
    };
    MultiSelect.prototype.updateVal = function (newProp, oldProp, prop) {
        if (!this.list) {
            this.onLoadSelect();
        }
        else if ((this.dataSource instanceof DataManager) && (!this.listData || !(this.mainList && this.mainData))) {
            this.onLoadSelect();
        }
        else {
            var valuecheck = [];
            if (!isNullOrUndefined(this.value) && !this.allowCustomValue) {
                valuecheck = this.presentItemValue(this.ulElement);
            }
            if (prop === 'value' && valuecheck.length > 0 && this.dataSource instanceof DataManager && !isNullOrUndefined(this.value)
                && this.listData != null) {
                this.mainData = null;
                this.setDynValue = true;
                this.isaddNonPresentItems = true;
                this.addNonPresentItems(valuecheck, this.ulElement, this.listData);
                this.isaddNonPresentItems = false;
            }
            else {
                if (prop === 'text') {
                    this.initialTextUpdate();
                    newProp = this.value;
                }
                if (isNullOrUndefined(this.value) || this.value.length === 0) {
                    this.tempValues = oldProp;
                }
                // eslint-disable-next-line
                if (this.allowCustomValue && (this.mode === 'Default' || this.mode === 'Box') && this.isReact && this.inputFocus
                    && this.isPopupOpen() && this.mainData !== this.listData) {
                    var list = this.mainList.cloneNode ? this.mainList.cloneNode(true) : this.mainList;
                    this.onActionComplete(list, this.mainData);
                }
                if (!this.enableVirtualization) {
                    this.initialValueUpdate();
                }
                else if (this.enableVirtualization && (!(this.dataSource instanceof DataManager))) {
                    this.initialValueUpdate(this.dataSource, true);
                }
                else if (!this.isInitRemoteVirtualData) {
                    this.isDynamicRemoteVirtualData = true;
                    this.initialValueUpdate(this.listData, true);
                    this.isDynamicRemoteVirtualData = false;
                    this.initialUpdate();
                }
                if (this.mode !== 'Box' && !this.inputFocus) {
                    this.updateDelimView();
                }
                if (!this.inputFocus) {
                    this.refreshInputHight();
                }
                this.refreshPlaceHolder();
                if (this.mode !== 'CheckBox' && this.changeOnBlur) {
                    this.updateValueState(null, newProp, oldProp);
                }
                this.checkPlaceholderSize();
            }
        }
        if (!this.changeOnBlur) {
            this.updateValueState(null, newProp, oldProp);
        }
    };
    /**
     * Adds a new item to the multiselect popup list. By default, new item appends to the list as the last item,
     * but you can insert based on the index parameter.
     *
     * @param { Object[] } items - Specifies an array of JSON data or a JSON data.
     * @param { number } itemIndex - Specifies the index to place the newly added item in the popup list.
     * @returns {void}
     */
    MultiSelect.prototype.addItem = function (items, itemIndex) {
        _super.prototype.addItem.call(this, items, itemIndex);
    };
    /**
     * Hides the popup, if the popup in a open state.
     *
     * @param {MouseEvent | KeyboardEventArgs} e - Specifies the mouse event or keyboard event.
     * @returns {void}
     */
    MultiSelect.prototype.hidePopup = function (e) {
        var _this = this;
        var delay = 100;
        if (this.isPopupOpen()) {
            var animModel = {
                name: 'FadeOut',
                duration: 100,
                delay: delay ? delay : 0
            };
            this.customFilterQuery = null;
            var eventArgs = { popup: this.popupObj, cancel: false, animation: animModel, event: e || null };
            this.trigger('close', eventArgs, function (eventArgs) {
                if (!eventArgs.cancel) {
                    if (_this.fields.groupBy && _this.mode !== 'CheckBox' && _this.fixedHeaderElement) {
                        remove(_this.fixedHeaderElement);
                        _this.fixedHeaderElement = null;
                    }
                    _this.beforePopupOpen = false;
                    _this.overAllWrapper.classList.remove(iconAnimation);
                    var typedValue = _this.mode === 'CheckBox' ? _this.targetElement() : null;
                    _this.popupObj.hide(new Animation(eventArgs.animation));
                    attributes(_this.inputElement, { 'aria-expanded': 'false' });
                    _this.inputElement.removeAttribute('aria-owns');
                    _this.inputElement.removeAttribute('aria-activedescendant');
                    if (_this.allowFiltering) {
                        _this.notify('inputFocus', { module: 'CheckBoxSelection', enable: _this.mode === 'CheckBox', value: 'clear' });
                    }
                    _this.popupObj.hide();
                    removeClass([document.body, _this.popupObj.element], 'e-popup-full-page');
                    EventHandler.remove(_this.list, 'keydown', _this.onKeyDown);
                    if (_this.mode === 'CheckBox' && _this.showSelectAll) {
                        EventHandler.remove(_this.popupObj.element, 'click', _this.clickHandler);
                    }
                    if (_this.list && _this.list.parentElement && _this.allowResize) {
                        if (_this.resizer && _this.list.parentElement.contains(_this.resizer)) {
                            _this.list.parentElement.removeChild(_this.resizer);
                        }
                        if (_this.list.parentElement.classList.contains('e-resize')) {
                            _this.list.parentElement.classList.remove('e-resize');
                        }
                        _this.list.parentElement.style.boxSizing = '';
                        _this.list.parentElement.style.paddingBottom = '';
                        var overAllHeight = parseInt(_this.popupHeight, 10);
                        _this.list.style.maxHeight = formatUnit(overAllHeight);
                        _this.list.parentElement.style.height = formatUnit(_this.popupHeight);
                        _this.list.parentElement.style.maxHeight = formatUnit(_this.popupHeight);
                    }
                    if (_this.resizer) {
                        EventHandler.remove(_this.resizer, 'mousedown', _this.startResizing);
                        _this.resizer.remove();
                    }
                    if (_this.enableVirtualization && _this.mode === 'CheckBox' && _this.value && _this.value.length > 0 &&
                        _this.enableSelectionOrder) {
                        _this.viewPortInfo.startIndex = _this.virtualItemStartIndex = 0;
                        _this.viewPortInfo.endIndex = _this.virtualItemEndIndex = _this.viewPortInfo.startIndex > 0 ?
                            _this.viewPortInfo.endIndex : _this.itemCount;
                        _this.virtualListInfo = _this.viewPortInfo;
                        _this.previousStartIndex = 0;
                        _this.previousEndIndex = _this.itemCount;
                    }
                    var dataSourceCount = void 0;
                    if (_this.dataSource instanceof DataManager) {
                        if (_this.remoteDataCount >= 0) {
                            _this.totalItemCount = _this.dataCount = _this.remoteDataCount;
                        }
                        else {
                            _this.resetList(_this.dataSource);
                        }
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        dataSourceCount = _this.dataSource && _this.dataSource.length ? _this.dataSource.length : 0;
                    }
                    if (_this.enableVirtualization && (_this.allowFiltering || _this.allowCustomValue) &&
                        (_this.targetElement() || typedValue) && _this.totalItemCount !== dataSourceCount) {
                        _this.checkAndResetCache();
                        _this.updateInitialData();
                    }
                    if (_this.virtualCustomData && _this.viewPortInfo && _this.viewPortInfo.startIndex === 0 &&
                        _this.viewPortInfo.endIndex === _this.itemCount) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        _this.renderItems(_this.mainData, _this.fields);
                    }
                    _this.virtualCustomData = null;
                    _this.isVirtualTrackHeight = false;
                }
            });
        }
    };
    /**
     * Shows the popup, if the popup in a closed state.
     *
     * @param {MouseEvent | KeyboardEventArgs} e - Specifies the mouse event or keyboard event.
     * @returns {void}
     */
    MultiSelect.prototype.showPopup = function (e) {
        var _this = this;
        if (!this.enabled) {
            return;
        }
        this.firstItem = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : null;
        var args = { cancel: false };
        this.trigger('beforeOpen', args, function (args) {
            if (!args.cancel) {
                if (!_this.ulElement) {
                    _this.beforePopupOpen = true;
                    if (_this.mode === 'CheckBox' && Browser.isDevice && _this.allowFiltering && _this.isDeviceFullScreen) {
                        _this.notify('popupFullScreen', { module: 'CheckBoxSelection', enable: _this.mode === 'CheckBox' });
                    }
                    _super.prototype.render.call(_this, e);
                    return;
                }
                if (_this.mode === 'CheckBox' && Browser.isDevice && _this.allowFiltering && _this.isDeviceFullScreen) {
                    _this.notify('popupFullScreen', { module: 'CheckBoxSelection', enable: _this.mode === 'CheckBox' });
                }
                var mainLiLength = _this.ulElement.querySelectorAll('li.' + 'e-list-item').length;
                var liLength = _this.ulElement.querySelectorAll('li.'
                    + dropDownBaseClasses.li + '.' + HIDE_LIST).length;
                if (mainLiLength > 0 && (mainLiLength === liLength) && (liLength === _this.mainData.length) &&
                    !(_this.targetElement() !== '' && _this.allowCustomValue)) {
                    _this.beforePopupOpen = false;
                    return;
                }
                _this.onPopupShown(e);
                if (_this.enableVirtualization && _this.listData && _this.listData.length) {
                    if (!isNullOrUndefined(_this.value) && (_this.getModuleName() === 'dropdownlist' ||
                        _this.getModuleName() === 'combobox')) {
                        _this.removeHover();
                    }
                    if (!_this.beforePopupOpen) {
                        if (_this.hideSelectedItem && _this.value && Array.isArray(_this.value) && _this.value.length > 0) {
                            _this.totalItemsCount();
                        }
                        if (!_this.preventSetCurrentData && !isNullOrUndefined(_this.viewPortInfo.startIndex) &&
                            !isNullOrUndefined(_this.viewPortInfo.endIndex)) {
                            _this.notify('setCurrentViewDataAsync', {
                                component: _this.getModuleName(),
                                module: 'VirtualScroll'
                            });
                        }
                    }
                }
                if (_this.enableVirtualization && !_this.allowFiltering && _this.selectedValueInfo != null &&
                    _this.selectedValueInfo.startIndex > 0 && _this.value != null) {
                    _this.notify('dataProcessAsync', {
                        module: 'VirtualScroll',
                        isOpen: true
                    });
                }
                if (_this.enableVirtualization) {
                    _this.updatevirtualizationList();
                }
                else {
                    if (_this.value && _this.value.length) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        var element = void 0;
                        var listItems = _this.getItems();
                        for (var _i = 0, _a = _this.value; _i < _a.length; _i++) {
                            var value = _a[_i];
                            var checkValue = _this.allowObjectBinding ?
                                getValue((_this.fields.value) ? _this.fields.value : '', value) : value;
                            element = _this.getElementByValue(checkValue);
                            if (element) {
                                _this.addListSelection(element);
                            }
                        }
                    }
                }
                if (_this.allowResize) {
                    _this.setResize();
                }
                _this.preventSetCurrentData = true;
            }
        });
    };
    /**
     * Based on the state parameter, entire list item will be selected/deselected.
     * parameter
     * `true`   - Selects entire list items.
     * `false`  - Un Selects entire list items.
     *
     * @param {boolean} state - if it’s true then Selects the entire list items. If it’s false the Unselects entire list items.
     * @returns {void}
     */
    MultiSelect.prototype.selectAll = function (state) {
        this.isSelectAll = true;
        this.selectAllItems(state);
    };
    /**
     * Return the module name of this component.
     *
     * @private
     * @returns {string} Return the module name of this component.
     */
    MultiSelect.prototype.getModuleName = function () {
        return 'multiselect';
    };
    /**
     * Allows you to clear the selected values from the Multiselect component.
     *
     * @returns {void}
     */
    MultiSelect.prototype.clear = function () {
        var _this = this;
        this.selectAll(false);
        if (this.value && this.value.length) {
            setTimeout(function () {
                _this.setProperties({ value: null }, true);
            }, 0);
        }
        else {
            this.setProperties({ value: null }, true);
        }
    };
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    MultiSelect.prototype.render = function () {
        if (!isNullOrUndefined(this.value) && this.value.length > 0) {
            // eslint-disable-next-line
            this.value = this.value.slice();
        }
        this.setDynValue = this.initStatus = false;
        this.isSelectAll = false;
        this.selectAllEventEle = [];
        this.searchWrapper = this.createElement('span', {
            className: SEARCHBOX_WRAPPER + ' ' + ((this.mode === 'Box') ?
                BOX_ELEMENT : '')
        });
        this.viewWrapper = this.createElement('span', {
            className: DELIMITER_VIEW + ' ' + DELIMITER_WRAPPER
        });
        this.viewWrapper.style.display = 'none';
        this.overAllClear = this.createElement('span', {
            className: CLOSEICON_CLASS
        });
        this.overAllClear.style.display = 'none';
        this.componentWrapper = this.createElement('div', { className: ELEMENT_WRAPPER });
        this.overAllWrapper = this.createElement('div', { className: OVER_ALL_WRAPPER });
        if (this.mode === 'CheckBox') {
            addClass([this.overAllWrapper], 'e-checkbox');
        }
        if (Browser.isDevice) {
            this.componentWrapper.classList.add(ELEMENT_MOBILE_WRAPPER);
        }
        this.setWidth(this.width);
        this.overAllWrapper.appendChild(this.componentWrapper);
        this.popupWrapper = this.createElement('div', { id: this.element.id + '_popup', className: POPUP_WRAPPER });
        this.popupWrapper.setAttribute('aria-label', this.element.id);
        this.popupWrapper.setAttribute('role', 'dialog');
        if (this.mode === 'Delimiter' || this.mode === 'CheckBox') {
            this.delimiterWrapper = this.createElement('span', { className: DELIMITER_WRAPPER });
            this.delimiterWrapper.style.display = 'none';
            this.componentWrapper.appendChild(this.delimiterWrapper);
        }
        else {
            this.chipCollectionWrapper = this.createElement('span', {
                className: CHIP_WRAPPER
            });
            this.chipCollectionWrapper.style.display = 'none';
            if (this.mode === 'Default') {
                this.chipCollectionWrapper.setAttribute('id', getUniqueID('chip_default'));
            }
            else if (this.mode === 'Box') {
                this.chipCollectionWrapper.setAttribute('id', getUniqueID('chip_box'));
            }
            this.componentWrapper.appendChild(this.chipCollectionWrapper);
        }
        if (this.mode !== 'Box') {
            this.componentWrapper.appendChild(this.viewWrapper);
        }
        this.componentWrapper.appendChild(this.searchWrapper);
        if (this.showClearButton && !Browser.isDevice) {
            this.componentWrapper.appendChild(this.overAllClear);
        }
        else {
            this.componentWrapper.classList.add(CLOSE_ICON_HIDE);
        }
        this.dropDownIcon();
        this.inputElement = this.createElement('input', {
            className: INPUT_ELEMENT,
            attrs: {
                spellcheck: 'false',
                type: 'text',
                autocomplete: 'off',
                tabindex: '0',
                role: 'combobox'
            }
        });
        if (this.mode === 'Default' || this.mode === 'Box') {
            this.inputElement.setAttribute('aria-describedby', this.chipCollectionWrapper.id);
        }
        if (!isNullOrUndefined(this.inputElement)) {
            attributes(this.inputElement, { 'aria-expanded': 'false' });
            if (!this.inputElement.hasAttribute('aria-label')) {
                this.inputElement.setAttribute('aria-label', this.getModuleName());
            }
        }
        if (this.element.tagName !== this.getNgDirective()) {
            this.element.style.display = 'none';
        }
        if (this.element.tagName === this.getNgDirective()) {
            this.element.appendChild(this.overAllWrapper);
            this.searchWrapper.appendChild(this.inputElement);
        }
        else {
            this.element.parentElement.insertBefore(this.overAllWrapper, this.element);
            this.searchWrapper.appendChild(this.inputElement);
            this.searchWrapper.appendChild(this.element);
            this.element.removeAttribute('tabindex');
        }
        if (this.floatLabelType !== 'Never') {
            createFloatLabel(this.overAllWrapper, this.searchWrapper, this.element, this.inputElement, this.value, this.floatLabelType, this.placeholder);
        }
        else if (this.floatLabelType === 'Never') {
            this.refreshPlaceHolder();
        }
        this.addValidInputClass();
        this.element.style.opacity = '';
        var id = this.element.getAttribute('id') ? this.element.getAttribute('id') : getUniqueID('ej2_dropdownlist');
        this.element.id = id;
        this.hiddenElement = this.createElement('select', {
            attrs: { 'aria-hidden': 'true', 'class': HIDDEN_ELEMENT, 'tabindex': '-1', 'multiple': '' }
        });
        this.componentWrapper.appendChild(this.hiddenElement);
        this.validationAttribute(this.element, this.hiddenElement);
        if (this.mode !== 'CheckBox') {
            this.hideOverAllClear();
        }
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) &&
            closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        this.wireEvent();
        this.enable(this.enabled);
        this.enableRTL(this.enableRtl);
        if (this.enableVirtualization) {
            this.updateVirtualizationProperties(this.itemCount, this.allowFiltering, this.mode === 'CheckBox');
        }
        this.listItemHeight = this.getListHeight();
        this.getSkeletonCount();
        this.viewPortInfo.startIndex = this.virtualItemStartIndex = 0;
        this.viewPortInfo.endIndex = this.virtualItemEndIndex = this.viewPortInfo.startIndex > 0 ?
            this.viewPortInfo.endIndex : this.itemCount;
        this.checkInitialValue();
        if (this.element.hasAttribute('data-val')) {
            this.element.setAttribute('data-val', 'false');
        }
        Input.createSpanElement(this.overAllWrapper, this.createElement);
        this.calculateWidth();
        if (!isNullOrUndefined(this.overAllWrapper) && !isNullOrUndefined(this.overAllWrapper.getElementsByClassName('e-ddl-icon')[0] &&
            this.overAllWrapper.getElementsByClassName('e-float-text-content')[0] && this.floatLabelType !== 'Never')) {
            this.overAllWrapper.getElementsByClassName('e-float-text-content')[0].classList.add('e-icon');
        }
        this.renderComplete();
    };
    MultiSelect.prototype.setResize = function () {
        var resizePaddingBottom = 16;
        if (this.list && this.list.parentElement && isNullOrUndefined(this.list.parentElement.querySelector('.e-resizer-right.e-icons'))) {
            this.resizer = this.createElement('div', {
                id: this.element.id + '_resize-popup',
                className: RESIZE_ICON
            });
        }
        if (this.mode === 'CheckBox' && this.showSelectAll && this.selectAllHeight && this.selectAllHeight !== 0) {
            this.storedSelectAllHeight = this.selectAllHeight;
        }
        if (this.list && this.list.parentElement) {
            this.list.parentElement.classList.add('e-resize');
            if (this.popupHeight.toString().toLowerCase() !== 'auto') {
                this.list.parentElement.style.height = '100%';
            }
            this.list.parentElement.style.boxSizing = 'border-box'; // Ensures padding doesn't affect element size
            var paddingBottom = this.mode === 'CheckBox' && this.searchBoxHeight ? this.searchBoxHeight + resizePaddingBottom + (this.showSelectAll ? this.storedSelectAllHeight : 0) : resizePaddingBottom;
            this.list.parentElement.style.paddingBottom = paddingBottom + "px";
            this.list.parentElement.appendChild(this.resizer);
            this.list.parentElement.style.width = this.resizeWidth + 'px';
            this.list.parentElement.style.height = this.resizeHeight + 'px';
            this.list.parentElement.style.maxHeight = this.resizeHeight + 'px';
            this.list.style.maxHeight = this.resizeHeight + "px";
        }
        if (this.resizer) {
            EventHandler.add(this.resizer, 'mousedown', this.startResizing, this);
            EventHandler.add(this.resizer, 'touchstart', this.startResizing, this);
        }
    };
    MultiSelect.prototype.startResizing = function (event) {
        this.isResizing = true;
        this.trigger('resizeStart', event);
        // Get initial touch or mouse coordinates
        var clientX = (event instanceof MouseEvent) ? event.clientX : event.touches[0].clientX;
        var clientY = (event instanceof MouseEvent) ? event.clientY : event.touches[0].clientY;
        if (this.list && this.list.parentElement) {
            this.originalWidth = this.list.parentElement.offsetWidth;
            this.originalHeight = this.list.parentElement.offsetHeight;
            this.originalMouseX = clientX;
            this.originalMouseY = clientY;
        }
        this.resizingWireEvent();
        // Prevent default behavior like text selection
        if (event) {
            event.preventDefault();
        }
    };
    MultiSelect.prototype.resizePopup = function (event) {
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
        // Set minimum width and height (100px)
        var minWidth = 100;
        var minHeight = 130;
        // Ensure the new width and height are not smaller than the minimum
        this.resizeWidth = Math.max(this.originalWidth + dx, minWidth);
        this.resizeHeight = Math.max(this.originalHeight + dy, minHeight);
        if (this.list && this.list.parentElement) {
            // Set minimum width and height (100px)
            var minWidth_1 = parseInt(window.getComputedStyle(this.list.parentElement).minWidth, 10);
            var minHeight_1 = parseInt(window.getComputedStyle(this.list.parentElement).minHeight, 10);
            minWidth_1 = minWidth_1 || 100;
            minHeight_1 = minHeight_1 || 120;
            // Ensure the new width and height are not smaller than the minimum
            this.resizeWidth = Math.max(this.originalWidth + dx, minWidth_1);
            this.resizeHeight = Math.max(this.originalHeight + dy, minHeight_1);
            this.list.parentElement.style.width = this.resizeWidth + "px";
            this.list.parentElement.style.height = this.resizeHeight + "px";
            this.list.parentElement.style.maxHeight = this.resizeHeight + "px";
            this.list.style.maxHeight = this.resizeHeight + "px";
            if (this.fixedHeaderElement && this.ulElement) {
                this.fixedHeaderElement.style.width = this.ulElement.offsetWidth + "px";
            }
        }
        if (event) {
            event.preventDefault();
        }
    };
    MultiSelect.prototype.stopResizing = function (event) {
        if (this.isResizing) {
            this.isResizing = false;
            this.trigger('resizeStop', event);
            this.resizingUnWireEvent();
        }
        if (event) {
            event.preventDefault();
        }
    };
    MultiSelect.prototype.getListHeight = function () {
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
    /**
     * Removes disabled values from the given array.
     *
     * @param { number[] | string[] | boolean[] | object[] } value - The array to check.
     * @returns {void}
     */
    MultiSelect.prototype.removeDisabledItemsValue = function (value) {
        if (value) {
            var data = [];
            var dataIndex = 0;
            for (var index = 0; index < value.length; index++) {
                var indexValue = value[index];
                if (typeof (indexValue) === 'object') {
                    indexValue = JSON.parse(JSON.stringify(indexValue))[this.fields.value];
                }
                if ((indexValue != null) && !(this.isDisabledItemByIndex(this.getIndexByValue(indexValue)))) {
                    data[dataIndex++] = value[index];
                }
            }
            this.value = data.length > 0 ? data : null;
        }
    };
    MultiSelect.prototype.checkInitialValue = function () {
        var _this = this;
        if (this.fields.disabled) {
            this.removeDisabledItemsValue(this.value);
        }
        var isData = this.dataSource instanceof Array ? (this.dataSource.length > 0)
            : !isNullOrUndefined(this.dataSource);
        if (!(this.value && this.value.length) &&
            isNullOrUndefined(this.text) &&
            !isData &&
            this.element.tagName === 'SELECT' &&
            this.element.options.length > 0) {
            var optionsElement = this.element.options;
            var valueCol = [];
            var textCol = '';
            for (var index = 0, optionsLen = optionsElement.length; index < optionsLen; index++) {
                var opt = optionsElement[index];
                if (!isNullOrUndefined(opt.getAttribute('selected'))) {
                    if (opt.getAttribute('value')) {
                        var value = this.allowObjectBinding ? this.getDataByValue(opt.getAttribute('value')) : opt.getAttribute('value');
                        valueCol.push(value);
                    }
                    else {
                        textCol += (opt.text + this.delimiterChar);
                    }
                }
            }
            if (valueCol.length > 0) {
                this.setProperties({ value: valueCol }, true);
            }
            else if (textCol !== '') {
                this.setProperties({ text: textCol }, true);
            }
            if (valueCol.length > 0 || textCol !== '') {
                this.refreshInputHight();
                this.refreshPlaceHolder();
            }
        }
        if ((this.value && this.value.length) || !isNullOrUndefined(this.text)) {
            if (!this.list) {
                _super.prototype.render.call(this);
            }
        }
        if (this.fields.disabled) {
            this.text = this.text && !this.isDisabledItemByIndex(this.getIndexByValue(this.getValueByText(this.text))) ? this.text : null;
        }
        if (!isNullOrUndefined(this.text) && (isNullOrUndefined(this.value) || this.value.length === 0)) {
            this.initialTextUpdate();
        }
        if (this.value && this.value.length) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var listItems_2;
            if (this.enableVirtualization) {
                var fields = !this.isPrimitiveData ? this.fields.value : '';
                var predicate = void 0;
                for (var i = 0; i < this.value.length; i++) {
                    var value = this.allowObjectBinding ?
                        getValue((this.fields.value) ? this.fields.value : '', this.value[i]) :
                        this.value[i];
                    if (i === 0) {
                        predicate = new Predicate(fields, 'equal', value);
                    }
                    else {
                        predicate = predicate.or(fields, 'equal', value);
                    }
                }
                if (this.dataSource instanceof DataManager) {
                    this.dataSource.executeQuery(new Query().where(predicate))
                        .then(function (e) {
                        if (e.result.length > 0) {
                            listItems_2 = e.result;
                            _this.initStatus = false;
                            _this.isInitRemoteVirtualData = true;
                            setTimeout(function () {
                                _this.initialValueUpdate(listItems_2, true);
                                _this.initialUpdate();
                                _this.isInitRemoteVirtualData = false;
                            }, 100);
                            _this.initStatus = true;
                        }
                    });
                }
                else {
                    listItems_2 = new DataManager(this.dataSource).executeLocal(new Query().where(predicate));
                }
            }
            if (!(this.dataSource instanceof DataManager)) {
                this.initialValueUpdate(listItems_2, true);
                this.initialUpdate();
            }
            else {
                this.setInitialValue = function () {
                    _this.initStatus = false;
                    if (!_this.enableVirtualization || (_this.enableVirtualization && (!(_this.dataSource instanceof DataManager)))) {
                        _this.initialValueUpdate(listItems_2);
                    }
                    _this.initialUpdate();
                    _this.setInitialValue = null;
                    _this.initStatus = true;
                };
            }
            this.updateTempValue();
        }
        else {
            this.initialUpdate();
        }
        this.initStatus = true;
        this.checkAutoFocus();
        if (!isNullOrUndefined(this.text)) {
            this.element.setAttribute('data-initial-value', this.text);
        }
    };
    MultiSelect.prototype.checkAutoFocus = function () {
        if (this.element.hasAttribute('autofocus')) {
            this.inputElement.focus();
        }
    };
    MultiSelect.prototype.updatevirtualizationList = function () {
        if (this.value && this.value.length) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var element = void 0;
            for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                var value = _a[_i];
                var checkValue = this.allowObjectBinding ? getValue((this.fields.value) ?
                    this.fields.value : '', value) : value;
                element = this.getElementByValue(checkValue);
                if (element) {
                    this.addListSelection(element);
                }
            }
            if (this.enableVirtualization && this.hideSelectedItem) {
                var visibleListElements = this.list.querySelectorAll('li.'
                    + dropDownBaseClasses.li
                    + ':not(.' + HIDE_LIST + ')' + ':not(.e-reorder-hide)' + ':not(.e-virtual-list)');
                if (visibleListElements.length) {
                    var actualCount = this.virtualListHeight > 0 ? Math.floor(this.virtualListHeight / this.listItemHeight) : 0;
                    if (visibleListElements.length < (actualCount + 2)) {
                        var query = this.getForQuery(this.value).clone();
                        query = query.skip(this.viewPortInfo.startIndex);
                        this.resetList(this.dataSource, this.fields, query);
                    }
                }
            }
        }
    };
    MultiSelect.prototype.setFloatLabelType = function () {
        removeFloating(this.overAllWrapper, this.componentWrapper, this.searchWrapper, this.inputElement, this.value, this.floatLabelType, this.placeholder);
        if (this.floatLabelType !== 'Never') {
            createFloatLabel(this.overAllWrapper, this.searchWrapper, this.element, this.inputElement, this.value, this.floatLabelType, this.placeholder);
        }
    };
    MultiSelect.prototype.addValidInputClass = function () {
        if (!isNullOrUndefined(this.overAllWrapper)) {
            if ((!isNullOrUndefined(this.value) && this.value.length) || this.floatLabelType === 'Always') {
                addClass([this.overAllWrapper], 'e-valid-input');
            }
            else {
                removeClass([this.overAllWrapper], 'e-valid-input');
            }
        }
    };
    MultiSelect.prototype.dropDownIcon = function () {
        if (this.showDropDownIcon) {
            this.dropIcon = this.createElement('span', { className: dropdownIcon });
            this.componentWrapper.appendChild(this.dropIcon);
            addClass([this.componentWrapper], ['e-down-icon']);
        }
        else {
            if (!isNullOrUndefined(this.dropIcon)) {
                this.dropIcon.parentElement.removeChild(this.dropIcon);
                removeClass([this.componentWrapper], ['e-down-icon']);
            }
        }
    };
    MultiSelect.prototype.initialUpdate = function () {
        if (this.mode !== 'Box' && !(this.setDynValue && this.mode === 'Default' && this.inputFocus)) {
            this.updateDelimView();
        }
        this.viewPortInfo.startIndex = this.virtualItemStartIndex = 0;
        this.viewPortInfo.endIndex = this.virtualItemEndIndex = this.itemCount;
        this.updateCssClass();
        this.updateHTMLAttribute();
        this.updateReadonly(this.readonly);
        this.refreshInputHight();
        this.checkPlaceholderSize();
    };
    /**
     * Method to disable specific item in the popup.
     *
     * @param {string | number | object | HTMLLIElement} item - Specifies the item to be disabled.
     * @returns {void}
     * @deprecated
     */
    MultiSelect.prototype.disableItem = function (item) {
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
                        if (li.classList.contains(dropDownBaseClasses.focus)) {
                            this.removeFocus();
                        }
                        if (li.classList.contains(HIDE_LIST) || li.classList.contains(dropDownBaseClasses.selected)) {
                            var oldValue = this.value;
                            this.removeDisabledItemsValue(this.value);
                            this.updateVal(this.value, oldValue, 'value');
                        }
                        if (this.mode === 'CheckBox' && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
                            this.disableGroupHeader();
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
    MultiSelect.prototype.destroy = function () {
        // eslint-disable-next-line
        if (this.isReact) {
            this.clearTemplate();
        }
        if (!isNullOrUndefined(this.popupObj)) {
            this.popupObj.hide();
            this.popupObj.destroy();
        }
        this.notify(destroy, {});
        this.unwireListEvents();
        this.unWireEvent();
        var temp = ['readonly', 'aria-disabled', 'placeholder', 'aria-label', 'aria-expanded'];
        var length = temp.length;
        if (!isNullOrUndefined(this.inputElement)) {
            while (length > 0) {
                this.inputElement.removeAttribute(temp[length - 1]);
                length--;
            }
        }
        if (!isNullOrUndefined(this.element)) {
            this.element.removeAttribute('data-initial-value');
            this.element.style.display = 'block';
        }
        if (this.overAllWrapper && this.overAllWrapper.parentElement) {
            if (this.overAllWrapper.parentElement.tagName === this.getNgDirective()) {
                remove(this.overAllWrapper);
            }
            else {
                this.overAllWrapper.parentElement.insertBefore(this.element, this.overAllWrapper);
                remove(this.overAllWrapper);
            }
        }
        if (this.popupWrapper && this.popupWrapper.parentElement) {
            this.popupWrapper.parentElement.remove();
        }
        while (this.searchWrapper && this.searchWrapper.firstChild) {
            this.searchWrapper.removeChild(this.searchWrapper.firstChild);
        }
        if (this.searchWrapper && this.searchWrapper.parentElement) {
            this.searchWrapper.parentElement.remove();
        }
        if (this.viewWrapper && this.viewWrapper.parentElement) {
            this.viewWrapper.parentElement.remove();
        }
        if (this.overAllClear && this.overAllClear.parentElement) {
            this.overAllClear.parentElement.remove();
        }
        if (this.delimiterWrapper && this.delimiterWrapper.parentElement) {
            this.delimiterWrapper.parentElement.remove();
        }
        // Remove the select element if it exists
        var selectElement = this.overAllWrapper.querySelector('select.e-multi-hidden');
        if (selectElement && selectElement.parentElement) {
            selectElement.parentElement.remove();
        }
        while (this.componentWrapper && this.componentWrapper.firstChild) {
            this.componentWrapper.removeChild(this.componentWrapper.firstChild);
        }
        if (this.componentWrapper && this.componentWrapper.parentElement) {
            this.componentWrapper.removeAttribute('class');
            this.componentWrapper.parentElement.remove();
        }
        while (this.popupWrapper && this.popupWrapper.firstChild) {
            this.popupWrapper.removeChild(this.popupWrapper.firstChild);
        }
        if (this.inputElement) {
            var attrArray = ['readonly', 'aria-disabled', 'placeholder', 'aria-labelledby',
                'aria-expanded', 'autocomplete', 'aria-readonly', 'autocapitalize',
                'spellcheck', 'aria-autocomplete', 'aria-live', 'aria-label', 'aria-hidden', 'tabindex', 'aria-controls',
                'aria-describedby', 'size', 'role', 'type', 'class'];
            for (var i = 0; i < attrArray.length; i++) {
                this.inputElement.removeAttribute(attrArray[i]);
            }
        }
        if (this.inputElement) {
            this.inputElement.remove();
        }
        this.list = null;
        this.popupObj = null;
        this.mainData = null;
        this.filterParent = null;
        this.ulElement = null;
        this.componentWrapper = null;
        this.overAllClear = null;
        this.overAllWrapper = null;
        this.hiddenElement = null;
        this.searchWrapper = null;
        this.viewWrapper = null;
        this.chipCollectionWrapper = null;
        this.targetInputElement = null;
        this.popupWrapper = null;
        this.inputElement = null;
        this.delimiterWrapper = null;
        this.liCollections = null;
        this.popupContentElement = null;
        this.header = null;
        this.mainList = null;
        this.mainListCollection = null;
        this.footer = null;
        this.selectAllEventEle = null;
        _super.prototype.destroy.call(this);
    };
    __decorate([
        Complex({ text: null, value: null, iconCss: null, groupBy: null, disabled: null }, FieldSettings)
    ], MultiSelect.prototype, "fields", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "enablePersistence", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "groupTemplate", void 0);
    __decorate([
        Property('No records found')
    ], MultiSelect.prototype, "noRecordsTemplate", void 0);
    __decorate([
        Property('Request failed')
    ], MultiSelect.prototype, "actionFailureTemplate", void 0);
    __decorate([
        Property('None')
    ], MultiSelect.prototype, "sortOrder", void 0);
    __decorate([
        Property(true)
    ], MultiSelect.prototype, "enabled", void 0);
    __decorate([
        Property(true)
    ], MultiSelect.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "enableVirtualization", void 0);
    __decorate([
        Property([])
    ], MultiSelect.prototype, "dataSource", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "query", void 0);
    __decorate([
        Property('StartsWith')
    ], MultiSelect.prototype, "filterType", void 0);
    __decorate([
        Property(1000)
    ], MultiSelect.prototype, "zIndex", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "ignoreAccent", void 0);
    __decorate([
        Property()
    ], MultiSelect.prototype, "locale", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "enableGroupCheckBox", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "cssClass", void 0);
    __decorate([
        Property('100%')
    ], MultiSelect.prototype, "width", void 0);
    __decorate([
        Property('300px')
    ], MultiSelect.prototype, "popupHeight", void 0);
    __decorate([
        Property('100%')
    ], MultiSelect.prototype, "popupWidth", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "placeholder", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "filterBarPlaceholder", void 0);
    __decorate([
        Property({})
    ], MultiSelect.prototype, "htmlAttributes", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "valueTemplate", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "headerTemplate", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "footerTemplate", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "itemTemplate", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "allowFiltering", void 0);
    __decorate([
        Property(true)
    ], MultiSelect.prototype, "isDeviceFullScreen", void 0);
    __decorate([
        Property(true)
    ], MultiSelect.prototype, "changeOnBlur", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "allowCustomValue", void 0);
    __decorate([
        Property(true)
    ], MultiSelect.prototype, "showClearButton", void 0);
    __decorate([
        Property(1000)
    ], MultiSelect.prototype, "maximumSelectionLength", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "readonly", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "allowResize", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "text", void 0);
    __decorate([
        Property(null)
    ], MultiSelect.prototype, "value", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "allowObjectBinding", void 0);
    __decorate([
        Property(true)
    ], MultiSelect.prototype, "hideSelectedItem", void 0);
    __decorate([
        Property(true)
    ], MultiSelect.prototype, "closePopupOnSelect", void 0);
    __decorate([
        Property('Default')
    ], MultiSelect.prototype, "mode", void 0);
    __decorate([
        Property(',')
    ], MultiSelect.prototype, "delimiterChar", void 0);
    __decorate([
        Property(true)
    ], MultiSelect.prototype, "ignoreCase", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "showDropDownIcon", void 0);
    __decorate([
        Property('Never')
    ], MultiSelect.prototype, "floatLabelType", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "showSelectAll", void 0);
    __decorate([
        Property('Select All')
    ], MultiSelect.prototype, "selectAllText", void 0);
    __decorate([
        Property('Unselect All')
    ], MultiSelect.prototype, "unSelectAllText", void 0);
    __decorate([
        Property(true)
    ], MultiSelect.prototype, "enableSelectionOrder", void 0);
    __decorate([
        Property(true)
    ], MultiSelect.prototype, "openOnClick", void 0);
    __decorate([
        Property(false)
    ], MultiSelect.prototype, "addTagOnBlur", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "change", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "removing", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "removed", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "beforeSelectAll", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "selectedAll", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "open", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "close", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "blur", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "focus", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "chipSelection", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "resizeStart", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "filtering", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "tagging", void 0);
    __decorate([
        Event()
    ], MultiSelect.prototype, "customValueSelection", void 0);
    MultiSelect = __decorate([
        NotifyPropertyChanges
    ], MultiSelect);
    return MultiSelect;
}(DropDownBase));
export { MultiSelect };
