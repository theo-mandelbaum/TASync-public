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
import { Component, EventHandler, addClass, append, Property, Event, L10n, compile } from '@syncfusion/ej2-base';
import { setStyleAttribute, extend, removeClass, prepend, isNullOrUndefined, detach, getValue } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, rippleEffect, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';
import { ListBase } from '@syncfusion/ej2-lists';
import { select, selectAll } from '@syncfusion/ej2-base';
import { Skeleton } from '@syncfusion/ej2-notifications';
var FieldSettings = /** @class */ (function (_super) {
    __extends(FieldSettings, _super);
    function FieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], FieldSettings.prototype, "text", void 0);
    __decorate([
        Property()
    ], FieldSettings.prototype, "value", void 0);
    __decorate([
        Property()
    ], FieldSettings.prototype, "iconCss", void 0);
    __decorate([
        Property()
    ], FieldSettings.prototype, "groupBy", void 0);
    __decorate([
        Property()
    ], FieldSettings.prototype, "htmlAttributes", void 0);
    __decorate([
        Property()
    ], FieldSettings.prototype, "disabled", void 0);
    return FieldSettings;
}(ChildProperty));
export { FieldSettings };
export var dropDownBaseClasses = {
    root: 'e-dropdownbase',
    rtl: 'e-rtl',
    content: 'e-content',
    selected: 'e-active',
    hover: 'e-hover',
    noData: 'e-nodata',
    fixedHead: 'e-fixed-head',
    focus: 'e-item-focus',
    li: 'e-list-item',
    group: 'e-list-group-item',
    disabled: 'e-disabled',
    grouping: 'e-dd-group',
    virtualList: 'e-list-item e-virtual-list'
};
var ITEMTEMPLATE_PROPERTY = 'ItemTemplate';
var DISPLAYTEMPLATE_PROPERTY = 'DisplayTemplate';
var SPINNERTEMPLATE_PROPERTY = 'SpinnerTemplate';
var VALUETEMPLATE_PROPERTY = 'ValueTemplate';
var GROUPTEMPLATE_PROPERTY = 'GroupTemplate';
var HEADERTEMPLATE_PROPERTY = 'HeaderTemplate';
var FOOTERTEMPLATE_PROPERTY = 'FooterTemplate';
var NORECORDSTEMPLATE_PROPERTY = 'NoRecordsTemplate';
var ACTIONFAILURETEMPLATE_PROPERTY = 'ActionFailureTemplate';
var HIDE_GROUPLIST = 'e-hide-group-header';
/**
 * DropDownBase component will generate the list items based on given data and act as base class to drop-down related components
 */
var DropDownBase = /** @class */ (function (_super) {
    __extends(DropDownBase, _super);
    /**
     * * Constructor for DropDownBase class
     *
     * @param {DropDownBaseModel} options - Specifies the DropDownBase model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function DropDownBase(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.preventChange = false;
        _this.isPreventChange = false;
        _this.isDynamicDataChange = false;
        _this.addedNewItem = false;
        _this.isAddNewItemTemplate = false;
        _this.isRequesting = false;
        _this.isVirtualizationEnabled = false;
        _this.isCustomDataUpdated = false;
        _this.isAllowFiltering = false;
        _this.virtualizedItemsCount = 0;
        _this.isCheckBoxSelection = false;
        _this.totalItemCount = 0;
        _this.dataCount = 0;
        _this.remoteDataCount = -1;
        _this.isRemoteDataUpdated = false;
        _this.isIncrementalRequest = false;
        _this.itemCount = 30;
        _this.virtualListHeight = 0;
        _this.isVirtualScrolling = false;
        _this.isPreventScrollAction = false;
        _this.scrollPreStartIndex = 0;
        _this.isScrollActionTriggered = false;
        _this.previousStartIndex = 0;
        _this.isMouseScrollAction = false;
        _this.isKeyBoardAction = false;
        _this.isScrollChanged = false;
        _this.isUpwardScrolling = false;
        _this.startIndex = 0;
        _this.currentPageNumber = 0;
        _this.pageCount = 0;
        _this.isPreventKeyAction = false;
        _this.generatedDataObject = {};
        _this.skeletonCount = 32;
        _this.isVirtualTrackHeight = false;
        _this.virtualSelectAll = false;
        _this.incrementalQueryString = '';
        _this.incrementalEndIndex = 0;
        _this.incrementalStartIndex = 0;
        _this.incrementalPreQueryString = '';
        _this.isObjectCustomValue = false;
        _this.appendUncheckList = false;
        _this.getInitialData = false;
        _this.preventPopupOpen = true;
        _this.virtualSelectAllState = false;
        _this.CurrentEvent = null;
        _this.isDynamicData = false;
        _this.isPrimitiveData = false;
        _this.isCustomFiltering = false;
        _this.virtualListInfo = {
            currentPageNumber: null,
            direction: null,
            sentinelInfo: {},
            offsets: {},
            startIndex: 0,
            endIndex: 0
        };
        _this.viewPortInfo = {
            currentPageNumber: null,
            direction: null,
            sentinelInfo: {},
            offsets: {},
            startIndex: 0,
            endIndex: 0
        };
        _this.selectedValueInfo = {
            currentPageNumber: null,
            direction: null,
            sentinelInfo: {},
            offsets: {},
            startIndex: 0,
            endIndex: 0
        };
        return _this;
    }
    DropDownBase.prototype.getPropObject = function (prop, newProp, oldProp) {
        var newProperty = new Object();
        var oldProperty = new Object();
        var propName = function (prop) {
            return prop;
        };
        newProperty[propName(prop)] = newProp[propName(prop)];
        oldProperty[propName(prop)] = oldProp[propName(prop)];
        var data = new Object();
        data.newProperty = newProperty;
        data.oldProperty = oldProperty;
        return data;
    };
    DropDownBase.prototype.getValueByText = function (text, ignoreCase, ignoreAccent) {
        var value = null;
        if (!isNullOrUndefined(this.listData)) {
            if (ignoreCase) {
                value = this.checkValueCase(text, true, ignoreAccent);
            }
            else {
                value = this.checkValueCase(text, false, ignoreAccent);
            }
        }
        return value;
    };
    DropDownBase.prototype.checkValueCase = function (text, ignoreCase, ignoreAccent, isTextByValue) {
        var _this = this;
        var value = null;
        if (isTextByValue) {
            value = text;
        }
        if (!isNullOrUndefined(this.listData)) {
            var dataSource = this.listData;
            var fields_1 = this.fields;
            var type = this.typeOfData(dataSource).typeof;
            if (type === 'string' || type === 'number' || type === 'boolean') {
                for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
                    var item = dataSource_1[_i];
                    if (!isNullOrUndefined(item)) {
                        if (ignoreAccent) {
                            value = this.checkingAccent(String(item), text, ignoreCase);
                        }
                        else {
                            if (ignoreCase) {
                                if (this.checkIgnoreCase(String(item), text)) {
                                    value = this.getItemValue(String(item), text, ignoreCase);
                                }
                            }
                            else {
                                if (this.checkNonIgnoreCase(String(item), text)) {
                                    value = this.getItemValue(String(item), text, ignoreCase, isTextByValue);
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (ignoreCase) {
                    dataSource.filter(function (item) {
                        var itemValue = getValue(fields_1.value, item);
                        if (!isNullOrUndefined(itemValue) && _this.checkIgnoreCase(getValue(fields_1.text, item).toString(), text)) {
                            value = getValue(fields_1.value, item);
                        }
                    });
                }
                else {
                    if (isTextByValue) {
                        var compareValue_1 = null;
                        compareValue_1 = value;
                        dataSource.filter(function (item) {
                            var itemValue = getValue(fields_1.value, item);
                            if (!isNullOrUndefined(itemValue) && !isNullOrUndefined(value) &&
                                itemValue.toString() === compareValue_1.toString()) {
                                value = getValue(fields_1.text, item);
                            }
                        });
                    }
                    else {
                        dataSource.filter(function (item) {
                            if (_this.checkNonIgnoreCase(getValue(fields_1.text, item), text)) {
                                value = getValue(fields_1.value, item);
                            }
                        });
                    }
                }
            }
        }
        return value;
    };
    DropDownBase.prototype.checkingAccent = function (item, text, ignoreCase) {
        var dataItem = DataUtil.ignoreDiacritics(String(item));
        var textItem = DataUtil.ignoreDiacritics(text.toString());
        var value = null;
        if (ignoreCase) {
            if (this.checkIgnoreCase(dataItem, textItem)) {
                value = this.getItemValue(String(item), text, ignoreCase);
            }
        }
        else {
            if (this.checkNonIgnoreCase(String(item), text)) {
                value = this.getItemValue(String(item), text, ignoreCase);
            }
        }
        return value;
    };
    DropDownBase.prototype.checkIgnoreCase = function (item, text) {
        return String(item).toLowerCase() === text.toString().toLowerCase() ? true : false;
    };
    DropDownBase.prototype.checkNonIgnoreCase = function (item, text) {
        return String(item) === text.toString() ? true : false;
    };
    DropDownBase.prototype.getItemValue = function (dataItem, typedText, ignoreCase, isTextByValue) {
        var value = null;
        var dataSource = this.listData;
        var type = this.typeOfData(dataSource).typeof;
        if (isTextByValue) {
            value = dataItem.toString();
        }
        else {
            if (ignoreCase) {
                value = type === 'string' ? String(dataItem) : this.getFormattedValue(String(dataItem));
            }
            else {
                value = type === 'string' ? typedText : this.getFormattedValue(typedText);
            }
        }
        return value;
    };
    DropDownBase.prototype.templateCompiler = function (baseTemplate) {
        var checkTemplate = false;
        if (typeof baseTemplate !== 'function' && baseTemplate) {
            try {
                checkTemplate = (selectAll(baseTemplate, document).length) ? true : false;
            }
            catch (exception) {
                checkTemplate = false;
            }
        }
        return checkTemplate;
    };
    DropDownBase.prototype.l10nUpdate = function (actionFailure) {
        var ele = this.getModuleName() === 'listbox' ? this.ulElement : this.list;
        if ((!isNullOrUndefined(this.noRecordsTemplate) && this.noRecordsTemplate !== 'No records found') || this.actionFailureTemplate !== 'Request failed') {
            var template = actionFailure ? this.actionFailureTemplate : this.noRecordsTemplate;
            var compiledString = void 0;
            var templateId = actionFailure ? this.actionFailureTemplateId : this.noRecordsTemplateId;
            ele.innerHTML = '';
            var tempaltecheck = this.templateCompiler(template);
            if (typeof template !== 'function' && tempaltecheck) {
                compiledString = compile(select(template, document).innerHTML.trim());
            }
            else {
                compiledString = compile(template);
            }
            var templateName = actionFailure ? 'actionFailureTemplate' : 'noRecordsTemplate';
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var noDataElement = void 0;
            if ((this.isReact) && typeof template === 'function') {
                noDataElement = compiledString({}, this, templateName, templateId, this.isStringTemplate, null);
            }
            else {
                noDataElement = compiledString({}, this, templateName, templateId, this.isStringTemplate, null, ele);
            }
            if (noDataElement && noDataElement.length > 0) {
                for (var i = 0; i < noDataElement.length; i++) {
                    if (this.getModuleName() === 'listbox' && templateName === 'noRecordsTemplate') {
                        if (noDataElement[i].nodeName === '#text') {
                            var liElem = this.createElement('li');
                            liElem.textContent = noDataElement[i].textContent;
                            liElem.classList.add('e-list-nrt');
                            liElem.setAttribute('role', 'option');
                            ele.appendChild(liElem);
                        }
                        else {
                            noDataElement[i].classList.add('e-list-nr-template');
                            ele.appendChild(noDataElement[i]);
                        }
                    }
                    else {
                        if (noDataElement[i] instanceof HTMLElement || ((noDataElement[i] instanceof Text) && (noDataElement[i]).textContent !== '')) {
                            ele.appendChild(noDataElement[i]);
                        }
                    }
                }
            }
            this.renderReactTemplates();
        }
        else {
            var l10nLocale = { noRecordsTemplate: 'No records found', actionFailureTemplate: 'Request failed' };
            var componentLocale = new L10n(this.getLocaleName(), {}, this.locale);
            if (componentLocale.getConstant('actionFailureTemplate') !== '' || componentLocale.getConstant('noRecordsTemplate') !== '') {
                this.l10n = componentLocale;
            }
            else {
                this.l10n = new L10n(this.getModuleName() === 'listbox' ? 'listbox' :
                    this.getModuleName() === 'mention' ? 'mention' : 'dropdowns', l10nLocale, this.locale);
            }
            var content = actionFailure ?
                this.l10n.getConstant('actionFailureTemplate') : this.l10n.getConstant('noRecordsTemplate');
            if (this.getModuleName() === 'listbox') {
                var liElem = this.createElement('li');
                liElem.textContent = content;
                ele.appendChild(liElem);
                liElem.classList.add('e-list-nrt');
                liElem.setAttribute('role', 'option');
            }
            else {
                if (!isNullOrUndefined(ele)) {
                    ele.innerHTML = content;
                }
            }
        }
    };
    DropDownBase.prototype.checkAndResetCache = function () {
        if (this.isVirtualizationEnabled) {
            this.generatedDataObject = {};
            this.virtualItemStartIndex = this.virtualItemEndIndex = 0;
            this.viewPortInfo = {
                currentPageNumber: null,
                direction: null,
                sentinelInfo: {},
                offsets: {},
                startIndex: 0,
                endIndex: this.itemCount
            };
            this.selectedValueInfo = null;
        }
    };
    DropDownBase.prototype.updateIncrementalInfo = function (startIndex, endIndex) {
        this.viewPortInfo.startIndex = startIndex;
        this.viewPortInfo.endIndex = endIndex;
        this.updateVirtualItemIndex();
        this.isIncrementalRequest = true;
        this.resetList(this.dataSource, this.fields, this.query);
        this.isIncrementalRequest = false;
    };
    DropDownBase.prototype.updateIncrementalView = function (startIndex, endIndex) {
        this.viewPortInfo.startIndex = startIndex;
        this.viewPortInfo.endIndex = endIndex;
        this.updateVirtualItemIndex();
        this.resetList(this.dataSource, this.fields, this.query);
        this.UpdateSkeleton();
        this.liCollections = this.list.querySelectorAll('.' + dropDownBaseClasses.li);
        this.ulElement = this.list.querySelector('ul');
    };
    DropDownBase.prototype.updateVirtualItemIndex = function () {
        this.virtualItemStartIndex = this.viewPortInfo.startIndex;
        this.virtualItemEndIndex = this.viewPortInfo.endIndex;
        this.virtualListInfo = this.viewPortInfo;
    };
    DropDownBase.prototype.getFilteringSkeletonCount = function () {
        var currentSkeletonCount = this.skeletonCount;
        this.getSkeletonCount(true);
        this.skeletonCount = this.dataCount < this.itemCount * 2 && ((!(this.dataSource instanceof DataManager)) ||
            ((this.dataSource instanceof DataManager) && (this.totalItemCount <= this.itemCount))) ? 0 : this.skeletonCount;
        var skeletonUpdated = true;
        if ((this.getModuleName() === 'autocomplete' || this.getModuleName() === 'multiselect') && (this.totalItemCount < (this.itemCount * 2)) && ((!(this.dataSource instanceof DataManager)) || ((this.dataSource instanceof DataManager) && (this.totalItemCount <= this.itemCount)))) {
            this.skeletonCount = 0;
            skeletonUpdated = false;
        }
        if (!this.list.classList.contains(dropDownBaseClasses.noData)) {
            if (currentSkeletonCount !== this.skeletonCount && skeletonUpdated) {
                this.UpdateSkeleton(true, Math.abs(currentSkeletonCount - this.skeletonCount));
            }
            else {
                this.UpdateSkeleton();
            }
            this.liCollections = this.list.querySelectorAll('.e-list-item');
            if ((this.list.getElementsByClassName('e-virtual-ddl').length > 0)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.list.getElementsByClassName('e-virtual-ddl')[0].style = this.GetVirtualTrackHeight();
            }
            else if (!this.list.querySelector('.e-virtual-ddl') && this.skeletonCount > 0 && this.list.querySelector('.e-dropdownbase')) {
                var virualElement = this.createElement('div', {
                    id: this.element.id + '_popup', className: 'e-virtual-ddl', styles: this.GetVirtualTrackHeight()
                });
                this.list.querySelector('.e-dropdownbase').appendChild(virualElement);
            }
            if (this.list.getElementsByClassName('e-virtual-ddl-content').length > 0) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.list.getElementsByClassName('e-virtual-ddl-content')[0].style = this.getTransformValues();
            }
        }
    };
    DropDownBase.prototype.getSkeletonCount = function (retainSkeleton) {
        this.virtualListHeight = this.listContainerHeight != null ? parseInt(this.listContainerHeight, 10) : this.virtualListHeight;
        var actualCount = this.virtualListHeight > 0 && this.listItemHeight > 0 ?
            Math.floor(this.virtualListHeight / this.listItemHeight) : 0;
        this.skeletonCount = actualCount * 4 < this.itemCount ? this.itemCount : actualCount * 4;
        this.itemCount = retainSkeleton ? this.itemCount : this.skeletonCount;
        this.virtualItemCount = this.itemCount;
        this.skeletonCount = Math.floor(this.skeletonCount / 2);
    };
    DropDownBase.prototype.GetVirtualTrackHeight = function () {
        var height = this.totalItemCount === this.viewPortInfo.endIndex ?
            this.totalItemCount * this.listItemHeight - this.itemCount * this.listItemHeight : this.totalItemCount * this.listItemHeight;
        height = this.isVirtualTrackHeight ? 0 : height;
        var heightDimension = "height: " + (height - this.itemCount * this.listItemHeight) + "px;";
        if ((this.getModuleName() === 'autocomplete' || this.getModuleName() === 'multiselect') && this.skeletonCount === 0) {
            return 'height: 0px;';
        }
        return heightDimension;
    };
    DropDownBase.prototype.getTransformValues = function () {
        var translateY = this.viewPortInfo.startIndex * this.listItemHeight;
        translateY = translateY - (this.skeletonCount * this.listItemHeight);
        translateY = ((this.viewPortInfo.startIndex === 0 && this.listData && this.listData.length === 0) ||
            this.skeletonCount === 0) ? 0 : translateY;
        var styleText = "transform: translate(0px, " + translateY + "px);";
        return styleText;
    };
    DropDownBase.prototype.UpdateSkeleton = function (isSkeletonCountChange, skeletonCount) {
        var isContainSkeleton = this.list.querySelector('.e-virtual-ddl-content');
        var isContainVirtualList = this.list.querySelector('.e-virtual-list');
        if (isContainSkeleton && (!isContainVirtualList || isSkeletonCountChange) && this.isVirtualizationEnabled) {
            var totalSkeletonCount = isSkeletonCountChange ? skeletonCount : this.skeletonCount;
            for (var i = 0; i < totalSkeletonCount; i++) {
                var liElement = this.createElement('li', { className: dropDownBaseClasses.virtualList, styles: 'overflow: inherit' });
                if (this.isVirtualizationEnabled && this.itemTemplate) {
                    liElement.style.height = (this.listItemHeight - parseInt(window.getComputedStyle(this.getItems()[1]).marginBottom, 10)) + 'px';
                }
                var skeleton = new Skeleton({
                    shape: 'Text',
                    height: '10px',
                    width: '95%',
                    cssClass: 'e-skeleton-text'
                });
                skeleton.appendTo(this.createElement('div'));
                liElement.appendChild(skeleton.element);
                if (isContainSkeleton.firstChild) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    isContainSkeleton.firstChild.insertBefore(liElement, isContainSkeleton.firstChild.children[0]);
                }
            }
        }
    };
    DropDownBase.prototype.getLocaleName = function () {
        return 'drop-down-base';
    };
    DropDownBase.prototype.getTextByValue = function (value) {
        var text = this.checkValueCase(value, false, false, true);
        return text;
    };
    DropDownBase.prototype.getFormattedValue = function (value) {
        if (this.listData && this.listData.length) {
            var item = void 0;
            if (this.properties.allowCustomValue &&
                this.properties.value &&
                this.properties.value instanceof Array &&
                this.properties.value.length > 0) {
                item = this.typeOfData(this.properties.value);
            }
            else {
                item = this.typeOfData(this.listData);
            }
            if (typeof getValue((this.fields.value ? this.fields.value : 'value'), item.item) === 'number' ||
                item.typeof === 'number') {
                return parseFloat(value);
            }
            if (typeof getValue((this.fields.value ? this.fields.value : 'value'), item.item) === 'boolean' ||
                item.typeof === 'boolean') {
                return ((value === 'true') || ('' + value === 'true'));
            }
        }
        return value;
    };
    /**
     * Sets RTL to dropdownbase wrapper
     *
     * @returns {void}
     */
    DropDownBase.prototype.setEnableRtl = function () {
        if (!isNullOrUndefined(this.enableRtlElements)) {
            if (this.list) {
                this.enableRtlElements.push(this.list);
            }
            if (this.enableRtl) {
                addClass(this.enableRtlElements, dropDownBaseClasses.rtl);
            }
            else {
                removeClass(this.enableRtlElements, dropDownBaseClasses.rtl);
            }
        }
    };
    /**
     * Initialize the Component.
     *
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - The event object.
     * @returns {void}
     */
    DropDownBase.prototype.initialize = function (e) {
        this.bindEvent = true;
        this.preventPopupOpen = true;
        this.actionFailureTemplateId = "" + this.element.id + ACTIONFAILURETEMPLATE_PROPERTY;
        if (this.element.tagName === 'UL') {
            var jsonElement = ListBase.createJsonFromElement(this.element);
            this.setProperties({ fields: { text: 'text', value: 'text' } }, true);
            this.resetList(jsonElement, this.fields);
        }
        else if (this.element.tagName === 'SELECT') {
            var dataSource = this.dataSource instanceof Array ? (this.dataSource.length > 0 ? true : false)
                : !isNullOrUndefined(this.dataSource) ? true : false;
            if (!dataSource) {
                this.renderItemsBySelect();
            }
            else if (this.isDynamicDataChange) {
                this.setListData(this.dataSource, this.fields, this.query);
            }
        }
        else {
            this.setListData(this.dataSource, this.fields, this.query, e);
        }
    };
    /**
     * Get the properties to be maintained in persisted state.
     *
     * @returns {string} Returns the persisted data of the component.
     */
    DropDownBase.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Sets the enabled state to DropDownBase.
     *
     * @param {string} value - Specifies the attribute values to add on the input element.
     * @returns {void}
     */
    DropDownBase.prototype.updateDataAttribute = function (value) {
        var invalidAttr = ['class', 'style', 'id', 'type', 'aria-expanded', 'aria-autocomplete', 'aria-readonly'];
        var attr = {};
        for (var a = 0; a < this.element.attributes.length; a++) {
            if (invalidAttr.indexOf(this.element.attributes[a].name) === -1 &&
                !(this.getModuleName() === 'dropdownlist' && this.element.attributes[a].name === 'readonly')) {
                attr[this.element.attributes[a].name] = this.element.getAttribute(this.element.attributes[a].name);
            }
        }
        extend(attr, value, attr);
        this.setProperties({ htmlAttributes: attr }, true);
    };
    DropDownBase.prototype.renderItemsBySelect = function () {
        var element = this.element;
        var group = element.querySelectorAll('select>optgroup');
        var fields;
        var isSelectGroupCheck = this.getModuleName() === 'multiselect' && this.isGroupChecking && group.length > 0;
        fields = isSelectGroupCheck ? { value: 'value', text: 'text', groupBy: 'categeory' } : fields = { value: 'value', text: 'text' };
        var jsonElement = [];
        var option = element.querySelectorAll('select>option');
        this.getJSONfromOption(jsonElement, option, fields);
        if (group.length) {
            for (var i = 0; i < group.length; i++) {
                var item = group[i];
                var optionGroup = {};
                optionGroup[fields.text] = item.label;
                optionGroup.isHeader = true;
                var child = item.querySelectorAll('option');
                if (isSelectGroupCheck) {
                    this.getJSONfromOption(jsonElement, child, fields, item.label);
                }
                else {
                    jsonElement.push(optionGroup);
                    this.getJSONfromOption(jsonElement, child, fields);
                }
            }
            element.querySelectorAll('select>option');
        }
        this.updateFields(fields.text, fields.value, isSelectGroupCheck ? fields.groupBy : this.fields.groupBy, this.fields.htmlAttributes, this.fields.iconCss, this.fields.disabled);
        this.resetList(jsonElement, fields);
    };
    DropDownBase.prototype.updateFields = function (text, value, groupBy, htmlAttributes, iconCss, disabled) {
        var field = {
            'fields': {
                text: text,
                value: value,
                groupBy: !isNullOrUndefined(groupBy) ? groupBy : this.fields && this.fields.groupBy,
                htmlAttributes: !isNullOrUndefined(htmlAttributes) ? htmlAttributes : this.fields && this.fields.htmlAttributes,
                iconCss: !isNullOrUndefined(iconCss) ? iconCss : this.fields && this.fields.iconCss,
                disabled: !isNullOrUndefined(disabled) ? disabled : this.fields && this.fields.disabled
            }
        };
        this.setProperties(field, true);
    };
    DropDownBase.prototype.getJSONfromOption = function (items, options, fields, category) {
        if (category === void 0) { category = null; }
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var option = options_1[_i];
            var json = {};
            json[fields.text] = option.innerText;
            json[fields.value] = !isNullOrUndefined(option.getAttribute(fields.value)) ?
                option.getAttribute(fields.value) : option.innerText;
            if (!isNullOrUndefined(category)) {
                json[fields.groupBy] = category;
            }
            items.push(json);
        }
    };
    /**
     * Execute before render the list items
     *
     * @private
     * @returns {void}
     */
    DropDownBase.prototype.preRender = function () {
        // there is no event handler
        this.scrollTimer = -1;
        this.enableRtlElements = [];
        this.isRequested = false;
        this.isDataFetched = false;
        this.itemTemplateId = "" + this.element.id + ITEMTEMPLATE_PROPERTY;
        this.displayTemplateId = "" + this.element.id + DISPLAYTEMPLATE_PROPERTY;
        this.spinnerTemplateId = "" + this.element.id + SPINNERTEMPLATE_PROPERTY;
        this.valueTemplateId = "" + this.element.id + VALUETEMPLATE_PROPERTY;
        this.groupTemplateId = "" + this.element.id + GROUPTEMPLATE_PROPERTY;
        this.headerTemplateId = "" + this.element.id + HEADERTEMPLATE_PROPERTY;
        this.footerTemplateId = "" + this.element.id + FOOTERTEMPLATE_PROPERTY;
        this.noRecordsTemplateId = "" + this.element.id + NORECORDSTEMPLATE_PROPERTY;
    };
    /**
     * Creates the list items of DropDownBase component.
     *
     * @param {Object[] | string[] | number[] | DataManager | boolean[]} dataSource - Specifies the data to generate the list.
     * @param {FieldSettingsModel} fields - Maps the columns of the data table and binds the data to the component.
     * @param {Query} query - Accepts the external Query that execute along with data processing.
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} event - Specifies the event which is the reason for the invocation of this method.
     * @returns {void}
     */
    DropDownBase.prototype.setListData = function (dataSource, fields, query, event) {
        var _this = this;
        fields = fields ? fields : this.fields;
        var ulElement;
        this.isActive = true;
        var eventArgs = { cancel: false, data: dataSource, query: query };
        this.isPreventChange = this.isAngular && this.preventChange ? true : this.isPreventChange;
        if (!this.isRequesting) {
            this.trigger('actionBegin', eventArgs, function (eventArgs) {
                if (!eventArgs.cancel) {
                    _this.isRequesting = true;
                    _this.showSpinner();
                    if (dataSource instanceof DataManager) {
                        _this.isRequested = true;
                        var isWhereExist_1 = false;
                        if (_this.isDataFetched) {
                            _this.emptyDataRequest(fields);
                            return;
                        }
                        eventArgs.data.executeQuery(_this.getQuery(eventArgs.query)).then(function (e) {
                            _this.isPreventChange = _this.isAngular && _this.preventChange ? true : _this.isPreventChange;
                            var isReOrder = true;
                            if (!_this.virtualSelectAll) {
                                var newQuery = _this.getQuery(eventArgs.query);
                                for (var queryElements = 0; queryElements < newQuery.queries.length; queryElements++) {
                                    if (newQuery.queries[queryElements].fn === 'onWhere') {
                                        isWhereExist_1 = true;
                                    }
                                }
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                if (_this.isVirtualizationEnabled && (e.count !== 0 && e.count < (_this.itemCount * 2))) {
                                    if (newQuery) {
                                        for (var queryElements = 0; queryElements < newQuery.queries.length; queryElements++) {
                                            if (newQuery.queries[queryElements].fn === 'onTake') {
                                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                newQuery.queries[queryElements].e.nos = e.count;
                                            }
                                            if (_this.getModuleName() === 'multiselect' && (newQuery.queries[queryElements].e.condition === 'or' || newQuery.queries[queryElements].e.operator === 'equal') && !_this.isCustomFiltering) {
                                                isReOrder = false;
                                            }
                                        }
                                    }
                                }
                                else {
                                    _this.isVirtualTrackHeight = false;
                                    if (newQuery) {
                                        for (var queryElements = 0; queryElements < newQuery.queries.length; queryElements++) {
                                            if (_this.getModuleName() === 'multiselect' && ((newQuery.queries[queryElements].e && newQuery.queries[queryElements].e.condition === 'or') || (newQuery.queries[queryElements].e && newQuery.queries[queryElements].e.operator === 'equal'))) {
                                                isReOrder = false;
                                            }
                                        }
                                    }
                                }
                            }
                            if (isReOrder) {
                                // eslint-disable @typescript-eslint/no-explicit-any
                                _this.dataCount = _this.totalItemCount = e.count;
                            }
                            _this.trigger('actionComplete', e, function (e) {
                                if (!e.cancel) {
                                    _this.isRequesting = false;
                                    _this.isCustomFiltering = false;
                                    var listItems = e.result;
                                    if (_this.isIncrementalRequest) {
                                        ulElement = _this.renderItems(listItems, fields);
                                        return;
                                    }
                                    if ((!_this.isVirtualizationEnabled && listItems.length === 0) ||
                                        (_this.isVirtualizationEnabled && listItems.length === 0 && !isWhereExist_1)) {
                                        _this.isDataFetched = true;
                                    }
                                    if (!isWhereExist_1) {
                                        _this.remoteDataCount = e.count;
                                    }
                                    _this.dataCount = !_this.virtualSelectAll ? e.count : _this.dataCount;
                                    _this.totalItemCount = !_this.virtualSelectAll ? e.count : _this.totalItemCount;
                                    ulElement = _this.renderItems(listItems, fields);
                                    _this.appendUncheckList = false;
                                    _this.onActionComplete(ulElement, listItems, e);
                                    if (_this.groupTemplate) {
                                        _this.renderGroupTemplate(ulElement);
                                    }
                                    _this.isRequested = false;
                                    _this.bindChildItems(listItems, ulElement, fields, e);
                                    if (_this.getInitialData) {
                                        _this.getInitialData = false;
                                        _this.preventPopupOpen = false;
                                        return;
                                    }
                                    if (_this.isVirtualizationEnabled && _this.setCurrentView) {
                                        _this.notify('setCurrentViewDataAsync', {
                                            module: 'VirtualScroll'
                                        });
                                    }
                                    if (_this.keyboardEvent != null) {
                                        _this.handleVirtualKeyboardActions(_this.keyboardEvent, _this.pageCount);
                                    }
                                    if (_this.isVirtualizationEnabled) {
                                        _this.getFilteringSkeletonCount();
                                        _this.updatePopupPosition();
                                    }
                                    if (_this.virtualSelectAll && _this.virtualSelectAllData) {
                                        _this.virtualSelectionAll(_this.virtualSelectAllState, _this.liCollections, _this.CurrentEvent);
                                        _this.virtualSelectAllState = false;
                                        _this.CurrentEvent = null;
                                        _this.virtualSelectAll = false;
                                    }
                                }
                            });
                        }).catch(function (e) {
                            _this.isRequested = false;
                            _this.isRequesting = false;
                            _this.onActionFailure(e);
                            _this.hideSpinner();
                        });
                    }
                    else {
                        _this.isRequesting = false;
                        var isReOrder = true;
                        var listItems = void 0;
                        if (_this.isVirtualizationEnabled && !_this.virtualGroupDataSource && _this.fields.groupBy) {
                            var data = new DataManager(_this.dataSource).executeLocal(new Query().group(_this.fields.groupBy));
                            _this.virtualGroupDataSource = data.records;
                        }
                        var dataManager = _this.isVirtualizationEnabled &&
                            _this.virtualGroupDataSource
                            && !_this.isCustomDataUpdated ? new DataManager(_this.virtualGroupDataSource) :
                            new DataManager(eventArgs.data);
                        listItems = (_this.getQuery(eventArgs.query)).executeLocal(dataManager);
                        if (!_this.virtualSelectAll) {
                            var newQuery = _this.getQuery(eventArgs.query);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            if (_this.isVirtualizationEnabled && (listItems.count !== 0 &&
                                listItems.count < (_this.itemCount * 2))) {
                                if (newQuery) {
                                    for (var queryElements = 0; queryElements < newQuery.queries.length; queryElements++) {
                                        if (newQuery.queries[queryElements].fn === 'onTake') {
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            newQuery.queries[queryElements].e.nos = listItems.count;
                                            listItems = (newQuery).executeLocal(dataManager);
                                        }
                                        if (_this.getModuleName() === 'multiselect' && (newQuery.queries[queryElements].e.condition === 'or' || newQuery.queries[queryElements].e.operator === 'equal') && !_this.isCustomFiltering) {
                                            isReOrder = false;
                                        }
                                    }
                                    if (isReOrder) {
                                        listItems = (newQuery).executeLocal(dataManager);
                                        _this.isVirtualTrackHeight = (!(_this.dataSource instanceof DataManager) &&
                                            !_this.isCustomDataUpdated) ? true : false;
                                    }
                                }
                            }
                            else {
                                _this.isVirtualTrackHeight = false;
                                if (newQuery) {
                                    for (var queryElements = 0; queryElements < newQuery.queries.length; queryElements++) {
                                        if (_this.getModuleName() === 'multiselect' && ((newQuery.queries[queryElements].e && newQuery.queries[queryElements].e.condition === 'or') || (newQuery.queries[queryElements].e && newQuery.queries[queryElements].e.operator === 'equal'))) {
                                            isReOrder = false;
                                        }
                                    }
                                }
                            }
                        }
                        if (isReOrder && (!(_this.dataSource instanceof DataManager) && !_this.isCustomDataUpdated) &&
                            !_this.virtualSelectAll) {
                            // eslint-disable @typescript-eslint/no-explicit-any
                            _this.dataCount = _this.totalItemCount = _this.virtualSelectAll ? listItems.length :
                                listItems.count;
                        }
                        listItems = _this.isVirtualizationEnabled ? listItems.result : listItems;
                        // eslint-enable @typescript-eslint/no-explicit-any
                        var localDataArgs = { cancel: false, result: listItems };
                        _this.isPreventChange = _this.isAngular && _this.preventChange ? true : _this.isPreventChange;
                        _this.trigger('actionComplete', localDataArgs, function (localDataArgs) {
                            _this.isCustomFiltering = false;
                            if (_this.isIncrementalRequest) {
                                ulElement = _this.renderItems(localDataArgs.result, fields);
                                return;
                            }
                            if (!localDataArgs.cancel) {
                                ulElement = _this.renderItems(localDataArgs.result, fields);
                                _this.onActionComplete(ulElement, localDataArgs.result, event);
                                if (_this.groupTemplate) {
                                    _this.renderGroupTemplate(ulElement);
                                }
                                _this.bindChildItems(localDataArgs.result, ulElement, fields);
                                if (_this.getInitialData) {
                                    _this.getInitialData = false;
                                    _this.preventPopupOpen = false;
                                    return;
                                }
                                setTimeout(function () {
                                    if (_this.getModuleName() === 'multiselect' && _this.itemTemplate != null && (ulElement.childElementCount > 0 && (ulElement.children[0].childElementCount > 0 || (_this.fields.groupBy && ulElement.children[1] && ulElement.children[1].childElementCount > 0)))) {
                                        _this.updateDataList();
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
    };
    DropDownBase.prototype.handleVirtualKeyboardActions = function (e, pageCount) {
        // Used this method in component side.
    };
    DropDownBase.prototype.updatePopupState = function () {
        // Used this method in component side.
    };
    DropDownBase.prototype.updatePopupPosition = function () {
        // Used this method in component side.
    };
    DropDownBase.prototype.virtualSelectionAll = function (state, li, event) {
        // Used this method in component side.
    };
    DropDownBase.prototype.updateRemoteData = function () {
        this.setListData(this.dataSource, this.fields, this.query);
    };
    DropDownBase.prototype.bindChildItems = function (listItems, ulElement, fields, e) {
        var _this = this;
        if (listItems.length >= 100 && this.getModuleName() === 'autocomplete') {
            setTimeout(function () {
                var childNode = _this.remainingItems(_this.sortedData, fields);
                append(childNode, ulElement);
                _this.liCollections = _this.list.querySelectorAll('.' + dropDownBaseClasses.li);
                _this.updateListValues();
                _this.raiseDataBound(listItems, e);
            }, 0);
        }
        else {
            this.raiseDataBound(listItems, e);
        }
    };
    DropDownBase.prototype.isObjectInArray = function (objectToFind, array) {
        return array.some(function (item) {
            return Object.keys(objectToFind).every(function (key) {
                return Object.prototype.hasOwnProperty.call(item, key) && item[key] === objectToFind[key];
            });
        });
    };
    DropDownBase.prototype.updateListValues = function () {
        // Used this method in component side.
    };
    DropDownBase.prototype.findListElement = function (list, findNode, attribute, value) {
        var liElement = null;
        if (list) {
            var listArr = [].slice.call(list.querySelectorAll(findNode));
            for (var index = 0; index < listArr.length; index++) {
                if (listArr[index].getAttribute(attribute) === (value + '')) {
                    liElement = listArr[index];
                    break;
                }
            }
        }
        return liElement;
    };
    DropDownBase.prototype.raiseDataBound = function (listItems, e) {
        this.hideSpinner();
        var dataBoundEventArgs = {
            items: listItems,
            e: e
        };
        this.trigger('dataBound', dataBoundEventArgs);
    };
    DropDownBase.prototype.remainingItems = function (dataSource, fields) {
        var spliceData = new DataManager(dataSource).executeLocal(new Query().skip(100));
        if (this.itemTemplate) {
            var listElements = this.templateListItem(spliceData, fields);
            return [].slice.call(listElements.childNodes);
        }
        var type = this.typeOfData(spliceData).typeof;
        if (type === 'string' || type === 'number' || type === 'boolean') {
            return ListBase.createListItemFromArray(this.createElement, spliceData, true, this.listOption(spliceData, fields), this);
        }
        return ListBase.createListItemFromJson(this.createElement, spliceData, this.listOption(spliceData, fields), 1, true, this);
    };
    DropDownBase.prototype.emptyDataRequest = function (fields) {
        var listItems = [];
        this.onActionComplete(this.renderItems(listItems, fields), listItems);
        this.isRequested = false;
        this.isRequesting = false;
        this.hideSpinner();
    };
    DropDownBase.prototype.showSpinner = function () {
        // Used this method in component side.
    };
    DropDownBase.prototype.hideSpinner = function () {
        // Used this method in component side.
    };
    DropDownBase.prototype.onActionFailure = function (e) {
        this.liCollections = [];
        this.trigger('actionFailure', e);
        this.l10nUpdate(true);
        if (!isNullOrUndefined(this.list)) {
            addClass([this.list], dropDownBaseClasses.noData);
        }
    };
    /* eslint-disable @typescript-eslint/no-unused-vars */
    DropDownBase.prototype.onActionComplete = function (ulElement, list, e) {
        /* eslint-enable @typescript-eslint/no-unused-vars */
        this.listData = list;
        if (this.isVirtualizationEnabled && !this.isCustomDataUpdated && !this.virtualSelectAll) {
            this.notify('setGeneratedData', {
                module: 'VirtualScroll'
            });
        }
        if (this.getModuleName() !== 'listbox') {
            ulElement.setAttribute('tabindex', '0');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.clearTemplate(['itemTemplate', 'groupTemplate', 'actionFailureTemplate', 'noRecordsTemplate']);
        }
        if (!this.isVirtualizationEnabled) {
            this.fixedHeaderElement = isNullOrUndefined(this.fixedHeaderElement) ? this.fixedHeaderElement : null;
        }
        if (this.getModuleName() === 'multiselect' && this.properties.allowCustomValue && this.fields.groupBy) {
            for (var i = 0; i < ulElement.childElementCount; i++) {
                if (ulElement.children[i].classList.contains('e-list-group-item')) {
                    if (isNullOrUndefined(ulElement.children[i].innerHTML) || ulElement.children[i].innerHTML === '') {
                        addClass([ulElement.children[i]], HIDE_GROUPLIST);
                    }
                }
                if (ulElement.children[0].classList.contains('e-hide-group-header')) {
                    setStyleAttribute(ulElement.children[1], { zIndex: 11 });
                }
            }
        }
        if (!isNullOrUndefined(this.list)) {
            if (!this.isVirtualizationEnabled) {
                this.list.innerHTML = '';
                this.list.appendChild(ulElement);
                this.liCollections = this.list.querySelectorAll('.' + dropDownBaseClasses.li);
                this.ulElement = this.list.querySelector('ul');
                this.postRender(this.list, list, this.bindEvent);
            }
        }
    };
    /* eslint-disable @typescript-eslint/no-unused-vars */
    DropDownBase.prototype.postRender = function (listElement, list, bindEvent) {
        if (this.fields.disabled) {
            var liCollections = listElement.querySelectorAll('.' + dropDownBaseClasses.li);
            for (var index = 0; index < liCollections.length; index++) {
                if (JSON.parse(JSON.stringify(this.listData[index]))[this.fields.disabled]) {
                    if (!isNullOrUndefined(this.fields.groupBy)) {
                        var item = this.listData[index];
                        var value = getValue((this.fields.value ? this.fields.value : 'value'), item);
                        var li = listElement.querySelector('li[data-value="' + value + '"]');
                        if (!isNullOrUndefined(li)) {
                            this.disableListItem(li);
                        }
                    }
                    else {
                        this.disableListItem(liCollections[index]);
                    }
                }
            }
        }
        /* eslint-enable @typescript-eslint/no-unused-vars */
        var focusItem = this.fields.disabled ? listElement.querySelector('.' + dropDownBaseClasses.li + ':not(.e-disabled') : listElement.querySelector('.' + dropDownBaseClasses.li);
        var selectedItem = listElement.querySelector('.' + dropDownBaseClasses.selected);
        if (focusItem && !selectedItem) {
            if (this.isVirtualizationEnabled && this.viewPortInfo.startIndex !== 0) {
                var elements = this.ulElement.querySelectorAll('li.' + dropDownBaseClasses.li + ':not(.e-virtual-list)' + ':not(.e-hide-listitem)');
                focusItem = elements && elements.length > 0 ? elements[2] : focusItem;
            }
            if (focusItem) {
                focusItem.classList.add(dropDownBaseClasses.focus);
            }
        }
        if (list.length <= 0) {
            this.l10nUpdate();
            addClass([listElement], dropDownBaseClasses.noData);
        }
        else {
            listElement.classList.remove(dropDownBaseClasses.noData);
        }
    };
    /**
     * Get the query to do the data operation before list item generation.
     *
     * @param {Query} query - Accepts the external Query that execute along with data processing.
     * @returns {Query} Returns the query to do the data query operation.
     */
    DropDownBase.prototype.getQuery = function (query) {
        return query ? query : this.query ? this.query : new Query();
    };
    DropDownBase.prototype.updateVirtualizationProperties = function (itemCount, filtering, isCheckbox) {
        this.isVirtualizationEnabled = true;
        this.virtualizedItemsCount = itemCount;
        this.isAllowFiltering = filtering;
        this.isCheckBoxSelection = isCheckbox;
    };
    /**
     * To render the template content for group header element.
     *
     * @param {HTMLElement} listEle - Specifies the group list elements.
     * @returns {void}
     */
    DropDownBase.prototype.renderGroupTemplate = function (listEle) {
        if (this.fields.groupBy !== null && this.dataSource || this.element.querySelector('.' + dropDownBaseClasses.group)) {
            var dataSource = this.dataSource;
            var option = { groupTemplateID: this.groupTemplateId, isStringTemplate: this.isStringTemplate };
            var headerItems = listEle.querySelectorAll('.' + dropDownBaseClasses.group);
            var groupcheck = this.templateCompiler(this.groupTemplate);
            if (typeof this.groupTemplate !== 'function' && groupcheck) {
                var groupValue = select(this.groupTemplate, document).innerHTML.trim();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                var tempHeaders = ListBase.renderGroupTemplate(groupValue, dataSource, this.fields.properties, headerItems, option, this);
                //EJ2-55168- Group checkbox is not working with group template
                if (this.isGroupChecking) {
                    for (var i = 0; i < tempHeaders.length; i++) {
                        this.notify('addItem', { module: 'CheckBoxSelection', item: tempHeaders[i] });
                    }
                }
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                var tempHeaders = ListBase.renderGroupTemplate(this.groupTemplate, dataSource, this.fields.properties, headerItems, option, this);
                //EJ2-55168- Group checkbox is not working with group template
                if (this.isGroupChecking) {
                    for (var i = 0; i < tempHeaders.length; i++) {
                        this.notify('addItem', { module: 'CheckBoxSelection', item: tempHeaders[i] });
                    }
                }
            }
            this.renderReactTemplates();
        }
    };
    /**
     * To create the ul li list items
     *
     * @param {object []} dataSource - Specifies the data to generate the list.
     * @param {FieldSettingsModel} fields - Maps the columns of the data table and binds the data to the component.
     * @returns {HTMLElement} Return the ul li list items.
     */
    DropDownBase.prototype.createListItems = function (dataSource, fields) {
        if (dataSource) {
            if (fields.groupBy || this.element.querySelector('optgroup')) {
                if (fields.groupBy) {
                    if (this.sortOrder !== 'None') {
                        dataSource = this.getSortedDataSource(dataSource);
                    }
                    if (this.element.querySelector('optgroup') && this.isGroupChecking && this.getModuleName() === 'multiselect') {
                        dataSource = ListBase.groupDataSource(dataSource, fields, this.sortOrder);
                    }
                    else {
                        dataSource = ListBase.groupDataSource(dataSource, fields.properties, this.sortOrder);
                    }
                }
                addClass([this.list], dropDownBaseClasses.grouping);
            }
            else if (this.getModuleName() !== 'listbox' || (this.getModuleName() === 'listbox' && !this.preventDefActionFilter)) {
                dataSource = this.getSortedDataSource(dataSource);
            }
            var options = this.listOption(dataSource, fields);
            var spliceData = (dataSource.length > 100) ?
                new DataManager(dataSource).executeLocal(new Query().take(100))
                : dataSource;
            this.sortedData = dataSource;
            return ListBase.createList(this.createElement, (this.getModuleName() === 'autocomplete') ? spliceData : dataSource, options, true, this);
        }
        return null;
    };
    DropDownBase.prototype.listOption = function (dataSource, fields) {
        var iconCss = isNullOrUndefined(fields.iconCss) ? false : true;
        var fieldValues = !isNullOrUndefined(fields.properties) ?
            fields.properties : fields;
        var options = (fields.text !== null || fields.value !== null) ? {
            fields: fieldValues,
            showIcon: iconCss, ariaAttributes: { groupItemRole: 'presentation' }
        } : { fields: { value: 'text' } };
        return extend({}, options, fields, true);
    };
    DropDownBase.prototype.setFloatingHeader = function (e) {
        if (!isNullOrUndefined(this.list) && !this.list.classList.contains(dropDownBaseClasses.noData)) {
            if (isNullOrUndefined(this.fixedHeaderElement)) {
                this.fixedHeaderElement = this.createElement('div', { className: dropDownBaseClasses.fixedHead });
                if (!isNullOrUndefined(this.list) && !this.list.querySelector('li').classList.contains(dropDownBaseClasses.group)) {
                    this.fixedHeaderElement.style.display = 'none';
                }
                if (!isNullOrUndefined(this.fixedHeaderElement) && !isNullOrUndefined(this.list)) {
                    prepend([this.fixedHeaderElement], this.list);
                }
                this.setFixedHeader();
            }
            if (!isNullOrUndefined(this.fixedHeaderElement) && this.fixedHeaderElement.style.zIndex === '0') {
                this.setFixedHeader();
            }
            this.scrollStop(e);
        }
    };
    DropDownBase.prototype.scrollStop = function (e, isDownkey) {
        var target = !isNullOrUndefined(e) ? e.target : this.list;
        var computedHeight = getComputedStyle(this.getValidLi(), null).getPropertyValue('height');
        var computedMarginValue = getComputedStyle(this.getValidLi(), null).getPropertyValue('margin-bottom');
        var marginValue = parseInt(computedMarginValue, 10);
        var liHeight = this.getModuleName() === 'multiselect' ? parseFloat(computedHeight) : parseInt(computedHeight, 10);
        var topIndex = Math.round(target.scrollTop / (liHeight + marginValue));
        var liCollections = this.list.querySelectorAll('li' + ':not(.e-hide-listitem)');
        var virtualListCount = this.list.querySelectorAll('.e-virtual-list').length;
        var count = 0;
        var isCount = false;
        for (var i = topIndex; i > -1; i--) {
            var index = this.isVirtualizationEnabled ? i + virtualListCount : i;
            if (this.isVirtualizationEnabled) {
                if (isCount) {
                    count++;
                }
                if (this.fixedHeaderElement && this.updateGroupHeader(index, liCollections, target)) {
                    break;
                }
                if (isDownkey) {
                    if ((!isNullOrUndefined(liCollections[index]) && liCollections[index].classList.contains(dropDownBaseClasses.selected) && this.getModuleName() !== 'autocomplete') || (!isNullOrUndefined(liCollections[index]) && liCollections[index].classList.contains(dropDownBaseClasses.focus) && this.getModuleName() === 'autocomplete')) {
                        count++;
                        isCount = true;
                    }
                }
            }
            else {
                if (this.updateGroupHeader(index, liCollections, target)) {
                    break;
                }
            }
        }
    };
    DropDownBase.prototype.getPageCount = function (returnExactCount) {
        if (this.list) {
            var liHeight = this.list.classList.contains(dropDownBaseClasses.noData) ? null :
                getComputedStyle(this.getItems()[0], null).getPropertyValue('height');
            var pageCount = Math.round(this.list.getBoundingClientRect().height / parseInt(liHeight, 10));
            return returnExactCount ? pageCount : Math.round(pageCount);
        }
        else {
            return 0;
        }
    };
    DropDownBase.prototype.updateGroupHeader = function (index, liCollections, target) {
        if (!isNullOrUndefined(liCollections[index]) &&
            liCollections[index].classList.contains(dropDownBaseClasses.group)) {
            this.updateGroupFixedHeader(liCollections[index], target);
            return true;
        }
        else {
            this.fixedHeaderElement.style.display = 'none';
            this.fixedHeaderElement.style.top = 'none';
            return false;
        }
    };
    DropDownBase.prototype.updateGroupFixedHeader = function (element, target) {
        if (this.fixedHeaderElement) {
            if (!isNullOrUndefined(element.innerHTML)) {
                this.fixedHeaderElement.innerHTML = element.innerHTML;
            }
            this.fixedHeaderElement.style.position = 'fixed';
            this.fixedHeaderElement.style.top = (this.list.parentElement.offsetTop + this.list.offsetTop) - window.scrollY + 'px';
            this.fixedHeaderElement.style.display = 'block';
        }
    };
    DropDownBase.prototype.getValidLi = function () {
        if (this.isVirtualizationEnabled) {
            return this.liCollections[0].classList.contains('e-virtual-list') ? this.liCollections[this.skeletonCount] : this.liCollections[0];
        }
        return this.liCollections[0];
    };
    /**
     * To render the list items
     *
     * @param {object[]} listData - Specifies the list of array of data.
     * @param {FieldSettingsModel} fields - Maps the columns of the data table and binds the data to the component.
     * @param {boolean} isCheckBoxUpdate - Specifies whether the list item is updated with checkbox.
     * @returns {HTMLElement} Return the list items.
     */
    DropDownBase.prototype.renderItems = function (listData, fields, isCheckBoxUpdate) {
        var ulElement;
        if (this.itemTemplate && listData) {
            if (this.getModuleName() === 'multiselect' && this.virtualSelectAll) {
                this.virtualSelectAllData = listData;
                listData = listData.slice(this.virtualItemStartIndex, this.virtualItemEndIndex);
            }
            var dataSource = listData;
            if (dataSource && fields.groupBy) {
                if (this.sortOrder !== 'None') {
                    dataSource = this.getSortedDataSource(dataSource);
                }
                dataSource = ListBase.groupDataSource(dataSource, fields.properties, this.sortOrder);
            }
            else if (this.getModuleName() !== 'listbox' || (this.getModuleName() === 'listbox' && !this.preventDefActionFilter)) {
                dataSource = this.getSortedDataSource(dataSource);
            }
            this.sortedData = dataSource;
            var spliceData = (dataSource.length > 100) ?
                new DataManager(dataSource).executeLocal(new Query().take(100))
                : dataSource;
            ulElement = this.templateListItem((this.getModuleName() === 'autocomplete') ? spliceData : dataSource, fields);
            if (this.isIncrementalRequest) {
                this.incrementalLiCollections = ulElement.querySelectorAll('.' + dropDownBaseClasses.li);
                this.incrementalUlElement = ulElement;
                this.incrementalListData = listData;
                return ulElement;
            }
            if (this.isVirtualizationEnabled) {
                var oldUlElement = this.list.querySelector('.e-list-parent');
                var virtualUlElement = this.list.querySelector('.e-virtual-ddl-content');
                if ((listData.length >= this.virtualizedItemsCount && oldUlElement && virtualUlElement) || (oldUlElement && virtualUlElement && this.isAllowFiltering) || (oldUlElement && virtualUlElement && this.getModuleName() === 'autocomplete')) {
                    if (this.getModuleName() === 'multiselect' && this.isCheckBoxSelection && this.appendUncheckList && this.list && this.list.querySelector('.e-active')) {
                        virtualUlElement.appendChild(ulElement);
                        isCheckBoxUpdate = true;
                    }
                    else {
                        virtualUlElement.replaceChild(ulElement, oldUlElement);
                    }
                    var reOrderList = this.list.querySelectorAll('.e-reorder');
                    if (this.list.querySelector('.e-virtual-ddl-content') && reOrderList && reOrderList.length > 0 && !isCheckBoxUpdate) {
                        this.list.querySelector('.e-virtual-ddl-content').removeChild(reOrderList[0]);
                    }
                    this.updateListElements(listData);
                }
                else if (!virtualUlElement) {
                    this.list.innerHTML = '';
                    this.createVirtualContent();
                    this.list.querySelector('.e-virtual-ddl-content').appendChild(ulElement);
                    this.updateListElements(listData);
                }
            }
        }
        else {
            if (this.getModuleName() === 'multiselect' && this.virtualSelectAll) {
                this.virtualSelectAllData = listData;
                listData = listData.slice(this.virtualItemStartIndex, this.virtualItemEndIndex);
            }
            ulElement = this.createListItems(listData, fields);
            if (this.isIncrementalRequest) {
                this.incrementalLiCollections = ulElement.querySelectorAll('.' + dropDownBaseClasses.li);
                this.incrementalUlElement = ulElement;
                this.incrementalListData = listData;
                return ulElement;
            }
            if (this.isVirtualizationEnabled) {
                var oldUlElement = this.list.querySelector('.e-list-parent' + ':not(.e-reorder)');
                var virtualUlElement = this.list.querySelector('.e-virtual-ddl-content');
                var isRemovedUlelement = false;
                if (!oldUlElement && this.list.querySelector('.e-list-parent' + '.e-reorder')) {
                    oldUlElement = this.list.querySelector('.e-list-parent' + '.e-reorder');
                }
                if ((listData.length >= this.virtualizedItemsCount && oldUlElement && virtualUlElement) || (oldUlElement && virtualUlElement && this.isAllowFiltering) || (oldUlElement && virtualUlElement && (this.getModuleName() === 'autocomplete' || this.getModuleName() === 'multiselect')) || isRemovedUlelement) {
                    if (!this.appendUncheckList) {
                        virtualUlElement.replaceChild(ulElement, oldUlElement);
                    }
                    else {
                        virtualUlElement.appendChild(ulElement);
                    }
                    this.updateListElements(listData);
                }
                else if ((!virtualUlElement) || (!virtualUlElement.firstChild)) {
                    this.list.innerHTML = '';
                    this.createVirtualContent();
                    this.list.querySelector('.e-virtual-ddl-content').appendChild(ulElement);
                    this.updateListElements(listData);
                }
            }
        }
        return ulElement;
    };
    DropDownBase.prototype.createVirtualContent = function () {
        if (!this.list.querySelector('.e-virtual-ddl-content')) {
            this.list.appendChild(this.createElement('div', {
                className: 'e-virtual-ddl-content'
            }));
        }
    };
    DropDownBase.prototype.updateListElements = function (listData) {
        this.liCollections = this.list.querySelectorAll('.' + dropDownBaseClasses.li);
        this.ulElement = this.list.querySelector('ul');
        this.listData = listData;
        this.postRender(this.list, listData, this.bindEvent);
    };
    DropDownBase.prototype.templateListItem = function (dataSource, fields) {
        var option = this.listOption(dataSource, fields);
        option.templateID = this.itemTemplateId;
        option.isStringTemplate = this.isStringTemplate;
        var itemcheck = this.templateCompiler(this.itemTemplate);
        var ulElement;
        if (typeof this.itemTemplate !== 'function' && itemcheck) {
            var itemValue = select(this.itemTemplate, document).innerHTML.trim();
            ulElement = ListBase.renderContentTemplate(this.createElement, itemValue, dataSource, fields.properties, option, this);
            if (this.isVirtualizationEnabled && this.isReact) {
                this.renderReactTemplates();
            }
            return ulElement;
        }
        else {
            ulElement = ListBase.renderContentTemplate(this.createElement, this.itemTemplate, dataSource, fields.properties, option, this);
            if (this.isVirtualizationEnabled && this.isReact) {
                this.renderReactTemplates();
            }
            return ulElement;
        }
    };
    DropDownBase.prototype.typeOfData = function (items) {
        var item = { typeof: null, item: null };
        for (var i = 0; (!isNullOrUndefined(items) && i < items.length); i++) {
            if (!isNullOrUndefined(items[i])) {
                var listDataType = typeof (items[i]) === 'string' ||
                    typeof (items[i]) === 'number' || typeof (items[i]) === 'boolean';
                var isNullData = listDataType ? isNullOrUndefined(items[i]) :
                    isNullOrUndefined(getValue((this.fields.value ? this.fields.value : 'value'), items[i]));
                if (!isNullData) {
                    return item = { typeof: typeof items[i], item: items[i] };
                }
            }
        }
        return item;
    };
    DropDownBase.prototype.setFixedHeader = function () {
        if (!isNullOrUndefined(this.list)) {
            this.list.parentElement.style.display = 'block';
        }
        var borderWidth = 0;
        if (this.list && this.list.parentElement) {
            borderWidth = parseInt(document.defaultView.getComputedStyle(this.list.parentElement, null).getPropertyValue('border-width'), 10);
            /*Shorthand property not working in Firefox for getComputedStyle method.
            Refer bug report https://bugzilla.mozilla.org/show_bug.cgi?id=137688
            Refer alternate solution https://stackoverflow.com/a/41696234/9133493*/
            if (isNaN(borderWidth)) {
                var borderTopWidth = parseInt(document.defaultView.getComputedStyle(this.list.parentElement, null).getPropertyValue('border-top-width'), 10);
                var borderBottomWidth = parseInt(document.defaultView.getComputedStyle(this.list.parentElement, null).getPropertyValue('border-bottom-width'), 10);
                var borderLeftWidth = parseInt(document.defaultView.getComputedStyle(this.list.parentElement, null).getPropertyValue('border-left-width'), 10);
                var borderRightWidth = parseInt(document.defaultView.getComputedStyle(this.list.parentElement, null).getPropertyValue('border-right-width'), 10);
                borderWidth = (borderTopWidth + borderBottomWidth + borderLeftWidth + borderRightWidth);
            }
        }
        if (!isNullOrUndefined(this.liCollections)) {
            var liWidth = this.getValidLi().offsetWidth - borderWidth;
            this.fixedHeaderElement.style.width = liWidth.toString() + 'px';
        }
        setStyleAttribute(this.fixedHeaderElement, { zIndex: 10 });
        var firstLi = this.ulElement.querySelector('.' + dropDownBaseClasses.group + ':not(.e-hide-listitem)');
        this.fixedHeaderElement.innerHTML = firstLi.innerHTML;
    };
    DropDownBase.prototype.getSortedDataSource = function (dataSource) {
        if (dataSource && this.sortOrder !== 'None') {
            var textField = this.fields.text ? this.fields.text : 'text';
            if (this.typeOfData(dataSource).typeof === 'string' || this.typeOfData(dataSource).typeof === 'number'
                || this.typeOfData(dataSource).typeof === 'boolean') {
                textField = '';
            }
            dataSource = ListBase.getDataSource(dataSource, ListBase.addSorting(this.sortOrder, textField));
        }
        return dataSource;
    };
    /**
     * Return the index of item which matched with given value in data source
     *
     * @param {string | number | boolean} value - Specifies given value.
     * @returns {number} Returns the index of the item.
     */
    DropDownBase.prototype.getIndexByValue = function (value) {
        var index;
        var listItems = [];
        if (this.fields.disabled && this.getModuleName() === 'multiselect' && this.liCollections) {
            listItems = this.liCollections;
        }
        else {
            listItems = this.getItems();
        }
        for (var i = 0; i < listItems.length; i++) {
            if (!isNullOrUndefined(value) && listItems[i].getAttribute('data-value') === value.toString()) {
                index = i;
                break;
            }
        }
        return index;
    };
    /**
     * Return the index of item which matched with given value in data source
     *
     * @param {string | number | boolean} value - Specifies given value.
     * @param {HTMLElement} ulElement - Specifies given value.
     * @returns {number} Returns the index of the item.
     */
    DropDownBase.prototype.getIndexByValueFilter = function (value, ulElement) {
        var index;
        if (!ulElement) {
            return null;
        }
        var listItems = ulElement.querySelectorAll('li' + ':not(.e-list-group-item)');
        if (listItems) {
            for (var i = 0; i < listItems.length; i++) {
                if (!isNullOrUndefined(value) && listItems[i].getAttribute('data-value') === value.toString()) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    };
    /**
     * To dispatch the event manually
     *
     * @param {HTMLElement} element - Specifies the element to dispatch the event.
     * @param {string} type - Specifies the name of the event.
     * @returns {void}
     */
    DropDownBase.prototype.dispatchEvent = function (element, type) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(type, false, true);
        if (element) {
            element.dispatchEvent(evt);
        }
    };
    /**
     * To set the current fields
     *
     * @returns {void}
     */
    DropDownBase.prototype.setFields = function () {
        if (this.fields.value && !this.fields.text) {
            this.updateFields(this.fields.value, this.fields.value);
        }
        else if (!this.fields.value && this.fields.text) {
            this.updateFields(this.fields.text, this.fields.text);
        }
        else if (!this.fields.value && !this.fields.text) {
            this.isPrimitiveData = true;
            this.updateFields('text', 'text');
        }
    };
    /**
     * reset the items list.
     *
     * @param {Object[] | string[] | number[] | DataManager | boolean[]} dataSource - Specifies the data to generate the list.
     * @param {FieldSettingsModel} fields - Maps the columns of the data table and binds the data to the component.
     * @param {Query} query - Accepts the external Query that execute along with data processing.
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - Specifies the event.
     * @returns {void}
     */
    DropDownBase.prototype.resetList = function (dataSource, fields, query, e) {
        if (this.list) {
            if ((this.element.tagName === 'SELECT' && this.element.options.length > 0)
                || (this.element.tagName === 'UL' && this.element.childNodes.length > 0)) {
                var data = dataSource instanceof Array ? (dataSource.length > 0)
                    : !isNullOrUndefined(dataSource);
                if (!data && this.selectData && this.selectData.length > 0) {
                    dataSource = this.selectData;
                }
            }
            dataSource = this.getModuleName() === 'combobox' && this.selectData && dataSource instanceof Array && dataSource.length < this.selectData.length && this.addedNewItem ? this.selectData : dataSource;
            this.addedNewItem = false;
            this.setListData(dataSource, fields, query, e);
        }
    };
    DropDownBase.prototype.updateSelectElementData = function (isFiltering) {
        if ((isFiltering || this.isVirtualizationEnabled) &&
            isNullOrUndefined(this.selectData) && this.listData && this.listData.length > 0) {
            this.selectData = this.listData;
        }
    };
    DropDownBase.prototype.updateSelection = function () {
        // This is for after added the item, need to update the selected index values.
    };
    DropDownBase.prototype.renderList = function () {
        // This is for render the list items.
        this.render();
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DropDownBase.prototype.updateDataSource = function (props, oldProps) {
        this.resetList(this.dataSource);
        this.totalItemCount = this.dataSource instanceof DataManager ? this.dataSource.dataSource.json.length : 0;
    };
    DropDownBase.prototype.setUpdateInitial = function (props, newProp, oldProp) {
        this.isDataFetched = false;
        this.isPrimitiveData = false;
        var updateData = {};
        for (var j = 0; props.length > j; j++) {
            if (newProp[props[j]] && props[j] === 'fields') {
                this.setFields();
                updateData[props[j]] = newProp[props[j]];
            }
            else if (newProp[props[j]]) {
                updateData[props[j]] = newProp[props[j]];
            }
        }
        if (Object.keys(updateData).length > 0) {
            if (Object.keys(updateData).indexOf('dataSource') === -1) {
                updateData.dataSource = this.dataSource;
            }
            if (this.getModuleName() === 'listbox') {
                if (!this.isReact || (this.isReact && (!isNullOrUndefined(newProp.dataSource) || !isNullOrUndefined(newProp.sortOrder)))) {
                    this.updateDataSource(updateData, oldProp);
                }
            }
            else {
                this.isDynamicData = true;
                this.updateDataSource(updateData, oldProp);
            }
        }
    };
    /**
     * When property value changes happened, then onPropertyChanged method will execute the respective changes in this component.
     *
     * @param {DropDownBaseModel} newProp - Returns the dynamic property value of the component.
     * @param {DropDownBaseModel} oldProp - Returns the previous property value of the component.
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DropDownBase.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (this.getModuleName() === 'dropdownbase') {
            this.setUpdateInitial(['fields', 'query', 'dataSource'], newProp);
        }
        this.setUpdateInitial(['sortOrder', 'itemTemplate'], newProp);
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'query':
                case 'sortOrder':
                case 'dataSource':
                case 'itemTemplate':
                    break;
                case 'enableRtl':
                    this.setEnableRtl();
                    break;
                case 'groupTemplate':
                    this.renderGroupTemplate(this.list);
                    if (this.ulElement && this.fixedHeaderElement) {
                        var firstLi = this.ulElement.querySelector('.' + dropDownBaseClasses.group);
                        this.fixedHeaderElement.innerHTML = firstLi.innerHTML;
                    }
                    break;
                case 'locale':
                    if (this.list && (!isNullOrUndefined(this.liCollections) && this.liCollections.length === 0)) {
                        this.l10nUpdate();
                    }
                    break;
                case 'zIndex':
                    this.setProperties({ zIndex: newProp.zIndex }, true);
                    this.setZIndex();
                    break;
            }
        }
    };
    /**
     * Build and render the component
     *
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - Specifies the event.
     * @param {boolean} isEmptyData - Specifies the component to initialize with list data or not.
     * @private
     * @returns {void}
     */
    DropDownBase.prototype.render = function (e, isEmptyData) {
        if (this.getModuleName() === 'listbox') {
            this.list = this.createElement('div', { className: dropDownBaseClasses.content, attrs: { 'tabindex': '0' } });
        }
        else {
            this.list = this.createElement('div', { className: dropDownBaseClasses.content });
        }
        this.list.classList.add(dropDownBaseClasses.root);
        this.setFields();
        var rippleModel = { duration: 300, selector: '.' + dropDownBaseClasses.li };
        this.rippleFun = rippleEffect(this.list, rippleModel);
        var group = this.element.querySelector('select>optgroup');
        if ((this.fields.groupBy || !isNullOrUndefined(group)) && !this.isGroupChecking) {
            EventHandler.add(this.list, 'scroll', this.setFloatingHeader, this);
            EventHandler.add(document, 'scroll', this.updateGroupFixedHeader, this);
        }
        if (this.getModuleName() === 'dropdownbase') {
            if (this.element.getAttribute('tabindex')) {
                this.list.setAttribute('tabindex', this.element.getAttribute('tabindex'));
            }
            removeClass([this.element], dropDownBaseClasses.root);
            this.element.style.display = 'none';
            var wrapperElement = this.createElement('div');
            this.element.parentElement.insertBefore(wrapperElement, this.element);
            wrapperElement.appendChild(this.element);
            wrapperElement.appendChild(this.list);
        }
        this.setEnableRtl();
        if (!isEmptyData) {
            this.initialize(e);
        }
    };
    DropDownBase.prototype.removeScrollEvent = function () {
        if (this.list) {
            EventHandler.remove(this.list, 'scroll', this.setFloatingHeader);
        }
    };
    /**
     * Return the module name of this component.
     *
     * @private
     * @returns {string} Return the module name of this component.
     */
    DropDownBase.prototype.getModuleName = function () {
        return 'dropdownbase';
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets all the list items bound on this component.
     *
     * @returns {Element[]}
     */
    DropDownBase.prototype.getItems = function () {
        return this.ulElement.querySelectorAll('.' + dropDownBaseClasses.li);
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Adds a new item to the popup list. By default, new item appends to the list as the last item,
     * but you can insert based on the index parameter.
     *
     * @param { Object[] } items - Specifies an array of JSON data or a JSON data.
     * @param { number } itemIndex - Specifies the index to place the newly added item in the popup list.
     * @returns {void}
     * @deprecated
     */
    DropDownBase.prototype.addItem = function (items, itemIndex) {
        if (!this.list || (this.list.textContent === this.noRecordsTemplate && this.getModuleName() !== 'listbox')) {
            this.renderList();
        }
        if (this.sortOrder !== 'None' && isNullOrUndefined(itemIndex)) {
            var newList = [].slice.call(this.listData);
            newList.push(items);
            newList = this.getSortedDataSource(newList);
            if (this.fields.groupBy) {
                newList = ListBase.groupDataSource(newList, this.fields.properties, this.sortOrder);
                itemIndex = newList.indexOf(items);
            }
            else {
                itemIndex = newList.indexOf(items);
            }
        }
        var itemsCount = this.getItems().length;
        var isListboxEmpty = itemsCount === 0;
        var selectedItemValue = this.list.querySelector('.' + dropDownBaseClasses.selected);
        items = (items instanceof Array ? items : [items]);
        var index;
        index = (isNullOrUndefined(itemIndex) || itemIndex < 0 || itemIndex > itemsCount - 1) ? itemsCount : itemIndex;
        var fields = this.fields;
        if (items && fields.groupBy) {
            items = ListBase.groupDataSource(items, fields.properties);
        }
        var liCollections = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var isHeader = item.isHeader;
            var li = this.createElement('li', { className: isHeader ? dropDownBaseClasses.group : dropDownBaseClasses.li, id: 'option-add-' + i });
            var itemText = item instanceof Object ? getValue(fields.text, item) : item;
            if (isHeader) {
                li.innerText = itemText;
            }
            if (this.itemTemplate && !isHeader) {
                var itemCheck = this.templateCompiler(this.itemTemplate);
                var compiledString = typeof this.itemTemplate !== 'function' &&
                    itemCheck ? compile(select(this.itemTemplate, document).innerHTML.trim()) : compile(this.itemTemplate);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var addItemTemplate = compiledString(item, this, 'itemTemplate', this.itemTemplateId, this.isStringTemplate, null, li);
                if (addItemTemplate) {
                    append(addItemTemplate, li);
                }
            }
            else if (!isHeader) {
                li.appendChild(document.createTextNode(itemText));
            }
            li.setAttribute('data-value', item instanceof Object ? getValue(fields.value, item) : item);
            li.setAttribute('role', 'option');
            this.notify('addItem', { module: 'CheckBoxSelection', item: li });
            liCollections.push(li);
            if (this.getModuleName() === 'listbox') {
                this.listData.splice(isListboxEmpty ?
                    this.listData.length : index, 0, item);
                if (this.listData.length !== this.sortedData.length) {
                    this.sortedData = this.listData;
                }
            }
            else {
                this.listData.push(item);
            }
            if (this.sortOrder === 'None' && isNullOrUndefined(itemIndex) && index === 0) {
                index = null;
            }
            if (this.getModuleName() === 'listbox') {
                this.updateActionCompleteData(li, item, isListboxEmpty ? null : index + i);
            }
            else {
                this.updateActionCompleteData(li, item, index);
            }
            //Listbox event
            this.trigger('beforeItemRender', { element: li, item: item });
        }
        if (itemsCount === 0 && isNullOrUndefined(this.list.querySelector('ul'))) {
            if (!isNullOrUndefined(this.list)) {
                this.list.innerHTML = '';
                this.list.classList.remove(dropDownBaseClasses.noData);
                this.isAddNewItemTemplate = true;
                if (!isNullOrUndefined(this.ulElement)) {
                    this.list.appendChild(this.ulElement);
                }
            }
            this.liCollections = liCollections;
            if (!isNullOrUndefined(liCollections) && !isNullOrUndefined(this.ulElement)) {
                append(liCollections, this.ulElement);
            }
            this.updateAddItemList(this.list, itemsCount);
        }
        else {
            if (this.getModuleName() === 'listbox' && itemsCount === 0) {
                this.ulElement.innerHTML = '';
            }
            var attr = [];
            for (var i = 0; i < items.length; i++) {
                var listGroupItem = this.ulElement.querySelectorAll('.e-list-group-item');
                for (var j = 0; j < listGroupItem.length; j++) {
                    attr[j] = listGroupItem[j].innerText;
                }
                if (attr.indexOf(liCollections[i].innerText) > -1 && fields.groupBy) {
                    for (var j = 0; j < listGroupItem.length; j++) {
                        if (attr[j] === liCollections[i].innerText) {
                            if (this.sortOrder === 'None') {
                                this.ulElement.insertBefore(liCollections[i + 1], listGroupItem[j + 1]);
                            }
                            else {
                                this.ulElement.insertBefore(liCollections[i + 1], this.ulElement.childNodes[itemIndex]);
                            }
                            i = i + 1;
                            break;
                        }
                    }
                }
                else {
                    if (this.liCollections[index] && this.liCollections[index].parentNode) {
                        this.liCollections[index].parentNode.
                            insertBefore(liCollections[i], this.liCollections[index]);
                    }
                    else {
                        if (itemIndex && this.getModuleName() === 'listbox') {
                            this.ulElement.insertBefore(liCollections[i], this.ulElement.childNodes[itemIndex + i]);
                        }
                        else {
                            this.ulElement.appendChild(liCollections[i]);
                        }
                    }
                }
                var tempLi = [].slice.call(this.liCollections);
                tempLi.splice(index, 0, liCollections[i]);
                this.liCollections = tempLi;
                index += 1;
                if (this.getModuleName() === 'multiselect') {
                    this.updateDataList();
                }
            }
        }
        if (this.getModuleName() === 'listbox' && this.isReact) {
            this.renderReactTemplates();
        }
        if (selectedItemValue || itemIndex === 0) {
            this.updateSelection();
        }
        this.addedNewItem = true;
    };
    /**
     * Checks if the given HTML element is disabled.
     *
     * @param {HTMLElement} li - The HTML element to check.
     * @returns {boolean} - Returns true if the element is disabled, otherwise false.
     */
    DropDownBase.prototype.isDisabledElement = function (li) {
        if (li && li.classList.contains('e-disabled')) {
            return true;
        }
        return false;
    };
    /**
     * Checks whether the list item at the specified index is disabled.
     *
     * @param {number} index - The index of the list item to check.
     * @returns {boolean} True if the list item is disabled, false otherwise.
     */
    DropDownBase.prototype.isDisabledItemByIndex = function (index) {
        if (this.fields.disabled && this.liCollections) {
            return this.isDisabledElement(this.liCollections[index]);
        }
        return false;
    };
    /**
     * Disables the given list item.
     *
     * @param { HTMLLIElement } li - The list item to disable.
     * @returns {void}
     */
    DropDownBase.prototype.disableListItem = function (li) {
        li.classList.add('e-disabled');
        li.setAttribute('aria-disabled', 'true');
        li.setAttribute('aria-selected', 'false');
    };
    DropDownBase.prototype.validationAttribute = function (target, hidden) {
        var name = target.getAttribute('name') ? target.getAttribute('name') : target.getAttribute('id');
        hidden.setAttribute('name', name);
        target.removeAttribute('name');
        var attributes = ['required', 'aria-required', 'form'];
        for (var i = 0; i < attributes.length; i++) {
            if (!target.getAttribute(attributes[i])) {
                continue;
            }
            var attr = target.getAttribute(attributes[i]);
            hidden.setAttribute(attributes[i], attr);
            target.removeAttribute(attributes[i]);
        }
    };
    DropDownBase.prototype.setZIndex = function () {
        // this is for component wise
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DropDownBase.prototype.updateActionCompleteData = function (li, item, index) {
        // this is for ComboBox custom value
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DropDownBase.prototype.updateAddItemList = function (list, itemCount) {
        // this is for multiselect add item
    };
    DropDownBase.prototype.updateDataList = function () {
        // this is for multiselect update list items
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the data Object that matches the given value.
     *
     * @param { string | number } value - Specifies the value of the list item.
     * @returns {Object}
     */
    DropDownBase.prototype.getDataByValue = function (value) {
        if (!isNullOrUndefined(this.listData)) {
            var type = this.typeOfData(this.listData).typeof;
            if (type === 'string' || type === 'number' || type === 'boolean') {
                for (var _i = 0, _a = this.listData; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (!isNullOrUndefined(item) && item === value) {
                        return item;
                    }
                }
            }
            else {
                for (var _b = 0, _c = this.listData; _b < _c.length; _b++) {
                    var item = _c[_b];
                    if (!isNullOrUndefined(item) && getValue((this.fields.value ? this.fields.value : 'value'), item) === value) {
                        return item;
                    }
                }
            }
        }
        return null;
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Removes the component from the DOM and detaches all its related event handlers. It also removes the attributes and classes.
     *
     * @method destroy
     * @returns {void}
     */
    DropDownBase.prototype.destroy = function () {
        if (document) {
            EventHandler.remove(document, 'scroll', this.updateGroupFixedHeader);
            if (document.body.contains(this.list)) {
                EventHandler.remove(this.list, 'scroll', this.setFloatingHeader);
                if (!isNullOrUndefined(this.rippleFun)) {
                    this.rippleFun();
                }
                detach(this.list);
            }
        }
        this.liCollections = null;
        this.ulElement = null;
        this.list = null;
        this.enableRtlElements = null;
        this.rippleFun = null;
        _super.prototype.destroy.call(this);
    };
    __decorate([
        Complex({ text: null, value: null, iconCss: null, groupBy: null, disabled: null }, FieldSettings)
    ], DropDownBase.prototype, "fields", void 0);
    __decorate([
        Property(null)
    ], DropDownBase.prototype, "itemTemplate", void 0);
    __decorate([
        Property(null)
    ], DropDownBase.prototype, "groupTemplate", void 0);
    __decorate([
        Property('No records found')
    ], DropDownBase.prototype, "noRecordsTemplate", void 0);
    __decorate([
        Property('Request failed')
    ], DropDownBase.prototype, "actionFailureTemplate", void 0);
    __decorate([
        Property('None')
    ], DropDownBase.prototype, "sortOrder", void 0);
    __decorate([
        Property([])
    ], DropDownBase.prototype, "dataSource", void 0);
    __decorate([
        Property(null)
    ], DropDownBase.prototype, "query", void 0);
    __decorate([
        Property('StartsWith')
    ], DropDownBase.prototype, "filterType", void 0);
    __decorate([
        Property(true)
    ], DropDownBase.prototype, "ignoreCase", void 0);
    __decorate([
        Property(1000)
    ], DropDownBase.prototype, "zIndex", void 0);
    __decorate([
        Property(false)
    ], DropDownBase.prototype, "ignoreAccent", void 0);
    __decorate([
        Property()
    ], DropDownBase.prototype, "locale", void 0);
    __decorate([
        Event()
    ], DropDownBase.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], DropDownBase.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], DropDownBase.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], DropDownBase.prototype, "select", void 0);
    __decorate([
        Event()
    ], DropDownBase.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], DropDownBase.prototype, "created", void 0);
    __decorate([
        Event()
    ], DropDownBase.prototype, "destroyed", void 0);
    DropDownBase = __decorate([
        NotifyPropertyChanges
    ], DropDownBase);
    return DropDownBase;
}(Component));
export { DropDownBase };
