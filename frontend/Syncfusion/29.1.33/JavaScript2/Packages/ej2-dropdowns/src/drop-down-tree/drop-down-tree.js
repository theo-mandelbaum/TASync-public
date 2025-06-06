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
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, TextBox } from '@syncfusion/ej2-inputs';
import { createCheckBox } from '@syncfusion/ej2-buttons';
import { NotifyPropertyChanges, Property, Event, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { Component, EventHandler, attributes, formatUnit, ChildProperty, remove, L10n, extend } from '@syncfusion/ej2-base';
import { addClass, removeClass, detach, prepend, Complex, closest, setValue, getValue, compile, append } from '@syncfusion/ej2-base';
import { select, selectAll, isNullOrUndefined as isNOU, matches, Browser, KeyboardEvents } from '@syncfusion/ej2-base';
import { DataManager, DataUtil } from '@syncfusion/ej2-data';
import { Popup } from '@syncfusion/ej2-popups';
import { TreeView } from '@syncfusion/ej2-navigations';
var RTL = 'e-rtl';
var DROPDOWNTREE = 'e-ddt';
var HIDDENELEMENT = 'e-ddt-hidden';
var DROPDOWNICON = 'e-input-group-icon e-ddt-icon e-icons';
var SHOW_CHIP = 'e-show-chip';
var SHOW_CLEAR = 'e-show-clear';
var SHOW_DD_ICON = 'e-show-dd-icon';
var CHIP_INPUT = 'e-chip-input';
var INPUTFOCUS = 'e-input-focus';
var INPUTGROUP = 'e-input-group';
var ICONANIMATION = 'e-icon-anim';
var CLOSEICON_CLASS = 'e-clear-icon e-icons';
var CHIP_WRAPPER = 'e-chips-wrapper';
var CHIP_COLLECTION = 'e-chips-collection';
var CHIP = 'e-chips';
var CHIP_CONTENT = 'e-chipcontent';
var CHIP_CLOSE = 'e-chips-close';
var HIDEICON = 'e-icon-hide';
var DDTHIDEICON = 'e-ddt-icon-hide';
var POPUP_CLASS = 'e-ddt e-popup';
var PARENTITEM = 'e-list-parent';
var CONTENT = 'e-popup-content';
var DROPDOWN = 'e-dropdown';
var DISABLED = 'e-disabled';
var ICONS = 'e-icons';
var CHECKALLPARENT = 'e-selectall-parent';
var CHECKALLHIDE = 'e-hide-selectall';
var BIGGER = 'e-bigger';
var SMALL = 'e-small';
var ALLTEXT = 'e-all-text';
var CHECKBOXFRAME = 'e-frame';
var CHECK = 'e-check';
var CHECKBOXWRAP = 'e-checkbox-wrapper';
var FILTERWRAP = 'e-filter-wrap';
var DDTICON = 'e-ddt-icon';
var FOOTER = 'e-ddt-footer';
var HEADER = 'e-ddt-header';
var NODATACONTAINER = 'e-ddt-nodata';
var NODATA = 'e-no-data';
var HEADERTEMPLATE = 'HeaderTemplate';
var FOOTERTEMPLATE = 'FooterTemplate';
var NORECORDSTEMPLATE = 'NoRecordsTemplate';
var ACTIONFAILURETEMPLATE = 'ActionFailureTemplate';
var CUSTOMTEMPLATE = 'CustomTemplate';
var REMAIN_WRAPPER = 'e-remain';
var OVERFLOW_VIEW = 'e-overflow';
var SHOW_TEXT = 'e-show-text';
var TOTAL_COUNT_WRAPPER = 'e-total-count';
var REMAIN_COUNT = 'e-wrap-count';
var Fields = /** @class */ (function (_super) {
    __extends(Fields, _super);
    function Fields() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('child')
    ], Fields.prototype, "child", void 0);
    __decorate([
        Property([])
    ], Fields.prototype, "dataSource", void 0);
    __decorate([
        Property('expanded')
    ], Fields.prototype, "expanded", void 0);
    __decorate([
        Property('hasChildren')
    ], Fields.prototype, "hasChildren", void 0);
    __decorate([
        Property('htmlAttributes')
    ], Fields.prototype, "htmlAttributes", void 0);
    __decorate([
        Property('iconCss')
    ], Fields.prototype, "iconCss", void 0);
    __decorate([
        Property('imageUrl')
    ], Fields.prototype, "imageUrl", void 0);
    __decorate([
        Property('parentValue')
    ], Fields.prototype, "parentValue", void 0);
    __decorate([
        Property(null)
    ], Fields.prototype, "query", void 0);
    __decorate([
        Property('selectable')
    ], Fields.prototype, "selectable", void 0);
    __decorate([
        Property('selected')
    ], Fields.prototype, "selected", void 0);
    __decorate([
        Property(null)
    ], Fields.prototype, "tableName", void 0);
    __decorate([
        Property('text')
    ], Fields.prototype, "text", void 0);
    __decorate([
        Property('tooltip')
    ], Fields.prototype, "tooltip", void 0);
    __decorate([
        Property('value')
    ], Fields.prototype, "value", void 0);
    return Fields;
}(ChildProperty));
export { Fields };
var TreeSettings = /** @class */ (function (_super) {
    __extends(TreeSettings, _super);
    function TreeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], TreeSettings.prototype, "autoCheck", void 0);
    __decorate([
        Property(true)
    ], TreeSettings.prototype, "checkDisabledChildren", void 0);
    __decorate([
        Property('Auto')
    ], TreeSettings.prototype, "expandOn", void 0);
    __decorate([
        Property(false)
    ], TreeSettings.prototype, "loadOnDemand", void 0);
    return TreeSettings;
}(ChildProperty));
export { TreeSettings };
/**
 * The Dropdown Tree control allows you to select single or multiple values from hierarchical data in a tree-like structure.
 * It has several out-of-the-box features, such as data binding, check boxes, templates, filter,
 * UI customization, accessibility, and preselected values.
 * ```html
 *  <input type="text" id="tree"></input>
 * ```
 * ```typescript
 *  let ddtObj: DropDownTree = new DropDownTree();
 *  ddtObj.appendTo("#tree");
 * ```
 */
var DropDownTree = /** @class */ (function (_super) {
    __extends(DropDownTree, _super);
    function DropDownTree(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.filterTimer = null;
        _this.isFilteredData = false;
        _this.isFilterRestore = false;
        _this.selectedData = [];
        _this.filterDelayTime = 300;
        _this.isClicked = false;
        _this.documentClickContext = _this.onDocumentClick.bind(_this);
        // Specifies if the checkAll method has been called
        _this.isCheckAllCalled = false;
        _this.isFromFilterChange = false;
        return _this;
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string}
     * @hidden
     */
    DropDownTree.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    DropDownTree.prototype.getLocaleName = function () {
        return 'drop-down-tree';
    };
    /**
     * Initialize the event handler.
     *
     * @returns {void}
     * @private
     */
    DropDownTree.prototype.preRender = function () {
        this.inputFocus = false;
        this.isPopupOpen = false;
        this.isFirstRender = true;
        this.isInitialized = false;
        this.currentText = null;
        this.currentValue = null;
        this.oldValue = null;
        this.removeValue = false;
        this.selectedText = [];
        this.treeItems = [];
        this.dataValue = null;
        this.isNodeSelected = false;
        this.isDynamicChange = false;
        this.clearIconWidth = 0;
        this.headerTemplateId = "" + this.element.id + HEADERTEMPLATE;
        this.footerTemplateId = "" + this.element.id + FOOTERTEMPLATE;
        this.actionFailureTemplateId = "" + this.element.id + ACTIONFAILURETEMPLATE;
        this.noRecordsTemplateId = "" + this.element.id + NORECORDSTEMPLATE;
        this.customTemplateId = "" + this.element.id + CUSTOMTEMPLATE;
        this.keyConfigs = {
            escape: 'escape',
            altUp: 'alt+uparrow',
            altDown: 'alt+downarrow',
            tab: 'tab',
            shiftTab: 'shift+tab',
            end: 'end',
            enter: 'enter',
            home: 'home',
            moveDown: 'downarrow',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            moveUp: 'uparrow',
            ctrlDown: 'ctrl+downarrow',
            ctrlUp: 'ctrl+uparrow',
            ctrlEnter: 'ctrl+enter',
            ctrlHome: 'ctrl+home',
            ctrlEnd: 'ctrl+end',
            shiftDown: 'shift+downarrow',
            shiftUp: 'shift+uparrow',
            shiftEnter: 'shift+enter',
            shiftHome: 'shift+home',
            shiftEnd: 'shift+end',
            csDown: 'ctrl+shift+downarrow',
            csUp: 'ctrl+shift+uparrow',
            csEnter: 'ctrl+shift+enter',
            csHome: 'ctrl+shift+home',
            csEnd: 'ctrl+shift+end',
            space: 'space',
            ctrlA: 'ctrl+A'
        };
    };
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    DropDownTree.prototype.render = function () {
        var isTree = select('#' + this.element.id + '_tree', document);
        if (isTree) {
            var popupDiv = select('#' + this.element.id + '_options', document);
            detach(popupDiv ? popupDiv : isTree.parentElement);
        }
        if (this.element.tagName === 'INPUT') {
            this.inputEle = this.element;
            if (isNOU(this.inputEle.getAttribute('role'))) {
                this.inputEle.setAttribute('aria-expanded', 'false');
                this.inputEle.setAttribute('role', 'combobox');
                this.inputEle.setAttribute('aria-haspopup', 'tree');
                this.inputEle.setAttribute('aria-controls', this.element.id + '_options');
            }
            if (isNOU(this.inputEle.getAttribute('type'))) {
                this.inputEle.setAttribute('type', 'text');
            }
        }
        else {
            if (!isNOU(this.element.id)) {
                this.inputEle = this.createElement('input', { attrs: { role: 'textbox', type: 'text', id: this.element.id + '_textbox' } });
            }
            else {
                this.inputEle = this.createElement('input', { attrs: { role: 'textbox', type: 'text' } });
            }
            this.element.parentElement.insertBefore(this.inputEle, this.element);
        }
        this.inputObj = Input.createInput({
            element: this.inputEle,
            floatLabelType: this.floatLabelType,
            buttons: this.showDropDownIcon ? [DROPDOWNICON] : null,
            properties: {
                readonly: true,
                placeholder: this.placeholder,
                enabled: this.enabled,
                cssClass: this.cssClass,
                enableRtl: this.enableRtl
            }
        }, this.createElement);
        this.inputWrapper = this.inputObj.container;
        if (!this.inputWrapper.classList.contains(INPUTGROUP)) {
            this.inputWrapper.classList.add(INPUTGROUP);
        }
        if (this.showDropDownIcon) {
            this.inputWrapper.classList.add(SHOW_DD_ICON);
        }
        if (this.element.tagName === this.getDirective()) {
            this.element.appendChild(this.inputWrapper);
        }
        this.createHiddenElement();
        this.createClearIcon();
        this.inputWrapper.classList.add(DROPDOWNTREE);
        this.setElementWidth(this.width);
        this.updateDataAttribute();
        this.setHTMLAttributes();
        this.setAttributes();
        this.popupDiv = this.createElement('div', { className: CONTENT });
        this.popupDiv.classList.add(DROPDOWN);
        this.tree = this.createElement('div', { id: this.element.id + '_tree' });
        this.popupDiv.appendChild(this.tree);
        if (!this.destroyPopupOnHide) {
            document.body.appendChild(this.popupDiv);
        }
        this.wireTreeEvents();
        addClass([this.popupDiv], DDTHIDEICON);
        this.renderTree();
        this.isRemoteData = this.fields.dataSource instanceof DataManager;
        if (this.allowMultiSelection || this.showCheckBox) {
            if (this.mode !== 'Delimiter') {
                this.createChip();
            }
            if (!this.wrapText && this.mode !== 'Custom') {
                this.overFlowWrapper = this.createElement('span', { className: OVERFLOW_VIEW + ' ' + HIDEICON });
                this.inputWrapper.insertBefore(this.overFlowWrapper, this.hiddenElement);
                if (this.mode !== 'Box') {
                    addClass([this.overFlowWrapper], SHOW_TEXT);
                }
            }
        }
        if (!this.isRemoteData) {
            this.setTreeValue();
            this.setTreeText();
            this.updateHiddenValue();
            this.setSelectedValue();
            if (!this.wrapText) {
                this.updateView();
            }
        }
        this.wireEvents();
        var firstUl = select('.' + PARENTITEM, this.treeObj.element);
        if (firstUl && firstUl.getAttribute('aria-multiselectable')) {
            firstUl.removeAttribute('aria-multiselectable');
        }
        this.setOldValue();
        if (!this.isRemoteData) {
            this.isInitialized = true;
        }
        this.hasTemplate = this.itemTemplate || this.headerTemplate || this.footerTemplate || this.actionFailureTemplate
            || this.noRecordsTemplate || this.customTemplate || this.valueTemplate;
        this.renderComplete();
    };
    DropDownTree.prototype.hideCheckAll = function (flag) {
        var checkAllEle = !isNOU(this.popupEle) ? this.popupEle.querySelector('.' + CHECKALLPARENT) : null;
        if (!isNOU(checkAllEle)) {
            if (flag && !checkAllEle.classList.contains(CHECKALLHIDE)) {
                addClass([checkAllEle], CHECKALLHIDE);
            }
            else if (!flag && checkAllEle.classList.contains(CHECKALLHIDE)) {
                removeClass([checkAllEle], CHECKALLHIDE);
            }
        }
    };
    DropDownTree.prototype.renderFilter = function () {
        this.filterContainer = this.createElement('div', {
            id: this.element.id + '_filter_wrap',
            className: FILTERWRAP
        });
        var filterInput = this.createElement('input', {
            id: this.element.id + '_filter',
            attrs: { autocomplete: 'off', 'aria-label': this.filterBarPlaceholder }
        });
        this.filterContainer.appendChild(filterInput);
        prepend([this.filterContainer], this.popupEle);
        this.filterObj = new TextBox({
            value: '',
            showClearButton: true,
            placeholder: this.filterBarPlaceholder,
            input: this.filterChangeHandler.bind(this)
        });
        this.filterObj.appendTo('#' + this.element.id + '_filter');
        this.keyboardModule = new KeyboardEvents(this.filterObj.element, {
            keyAction: this.filterKeyAction.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    DropDownTree.prototype.filterKeyAction = function (e) {
        var _this = this;
        var eventArgs = {
            cancel: false,
            event: e
        };
        var focusedElement;
        this.trigger('keyPress', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                switch (e.action) {
                    case 'altUp':
                        if (_this.isPopupOpen) {
                            _this.hidePopup();
                        }
                        break;
                    case 'shiftTab':
                        addClass([_this.inputWrapper], [INPUTFOCUS]);
                        break;
                    case 'moveDown':
                        e.preventDefault();
                        _this.filterObj.element.blur();
                        focusedElement = _this.treeObj.element.querySelector('li');
                        if (focusedElement) {
                            focusedElement.focus();
                        }
                        break;
                }
            }
        });
    };
    DropDownTree.prototype.filterChangeHandler = function (args) {
        var _this = this;
        if (!isNOU(args.value)) {
            window.clearTimeout(this.filterTimer);
            this.filterTimer = window.setTimeout(function () { _this.filterHandler(args.value, args.event); }, this.filterDelayTime);
        }
    };
    DropDownTree.prototype.isChildObject = function () {
        if (typeof this.treeObj.fields.child === 'object') {
            return true;
        }
        else {
            return false;
        }
    };
    DropDownTree.prototype.filterHandler = function (value, event) {
        var _this = this;
        this.isFromFilterChange = true;
        if (!this.isFilteredData) {
            if (this.isRemoteData) {
                this.treeObj.expandedNodes = [];
            }
            this.treeData = this.treeObj.getTreeData();
        }
        var filterFields = this.cloneFields(this.fields);
        var args = {
            cancel: false,
            preventDefaultAction: false,
            event: event,
            text: value.trim(),
            fields: filterFields
        };
        this.trigger('filtering', args, function (args) {
            if (!args.cancel) {
                var flag = false;
                var fields = void 0;
                _this.isFilteredData = true;
                if (args.text === '') {
                    _this.isFilteredData = false;
                    _this.isFilterRestore = true;
                    fields = _this.cloneFields(_this.fields);
                    _this.treeObj.element.classList.remove('e-filtering');
                }
                else if (args.preventDefaultAction) {
                    fields = args.fields;
                    _this.treeObj.element.classList.add('e-filtering');
                }
                else {
                    if (_this.treeDataType === 1) {
                        fields = _this.selfReferencefilter(args.text, args.fields);
                    }
                    else {
                        if (_this.fields.dataSource instanceof DataManager) {
                            fields = _this.remoteDataFilter(args.text, args.fields);
                            fields.child = _this.fields.child;
                            _this.treeObj.fields = _this.getTreeFields(args.fields);
                            _this.treeObj.dataBind();
                            flag = true;
                        }
                        else {
                            fields = _this.nestedFilter(args.text, args.fields);
                        }
                    }
                    _this.treeObj.element.classList.add('e-filtering');
                }
                _this.hideCheckAll(_this.isFilteredData);
                if (flag) {
                    return;
                }
                if (_this.isRemoteData) {
                    if (_this.isChildObject()) {
                        fields.child = _this.fields.child;
                    }
                    else {
                        fields = args.fields;
                    }
                }
                _this.treeObj.fields = _this.getTreeFields(fields);
                _this.treeObj.dataBind();
                if (_this.popupObj) {
                    _this.popupObj.refreshPosition();
                }
                if (_this.hasTemplate && _this.portals && _this.treeObj.portals) {
                    for (var i = 0; i < _this.treeObj.portals.length; i++) {
                        if (_this.portals.indexOf(_this.treeObj.portals[i]) === -1) {
                            _this.portals.push(_this.treeObj.portals[i]);
                        }
                    }
                    if (_this.isReact) {
                        _this.renderReactTemplates();
                    }
                }
            }
        });
    };
    DropDownTree.prototype.remoteDataFilter = function (value, filteredFields) {
        var _this = this;
        filteredFields.dataSource = this.treeData.map(function (item) {
            return _this.remoteChildFilter(value, item);
        }).filter(function (filteredChild) {
            return !isNOU(filteredChild);
        });
        return filteredFields;
    };
    DropDownTree.prototype.remoteChildFilter = function (value, node, isChild, isChildFiltering) {
        var children = this.isChildObject() ? node['child'] : node[this.fields.child];
        if (isNOU(children)) {
            return (this.isMatchedNode(value, node, isChild, isChildFiltering)) ? node : null;
        }
        var matchedChildren = [];
        for (var i = 0; i < children.length; i++) {
            var filteredChild = this.remoteChildFilter(value, children[i], true, true);
            if (!isNOU(filteredChild)) {
                matchedChildren.push(filteredChild);
            }
        }
        var filteredItems = Object.assign({}, node);
        isChildFiltering = false;
        if (matchedChildren.length !== 0) {
            filteredItems.child = matchedChildren;
        }
        else {
            filteredItems.child = null;
            filteredItems = (this.isMatchedNode(value, filteredItems)) ? filteredItems : null;
        }
        return filteredItems;
    };
    DropDownTree.prototype.nestedFilter = function (value, filteredFields) {
        var matchedDataSource = [];
        for (var i = 0; i < this.treeData.length; i++) {
            var filteredChild = this.nestedChildFilter(value, this.treeData[parseInt(i.toString(), 10)]);
            if (!isNOU(filteredChild)) {
                matchedDataSource.push(filteredChild);
            }
        }
        filteredFields.dataSource = matchedDataSource;
        return filteredFields;
    };
    DropDownTree.prototype.nestedChildFilter = function (value, node) {
        var children = node[this.fields.child];
        if (isNOU(children)) {
            return (this.isMatchedNode(value, node)) ? node : null;
        }
        else {
            var matchedChildren = [];
            for (var i = 0; i < children.length; i++) {
                var filteredChild = this.nestedChildFilter(value, children[parseInt(i.toString(), 10)]);
                if (!isNOU(filteredChild)) {
                    matchedChildren.push(filteredChild);
                }
            }
            var filteredItems = Object.assign({}, node);
            if (matchedChildren.length !== 0) {
                filteredItems[this.fields.child] = matchedChildren;
                return filteredItems;
            }
            else {
                filteredItems[this.fields.child] = null;
                return (this.isMatchedNode(value, filteredItems)) ? filteredItems : null;
            }
        }
    };
    DropDownTree.prototype.selfReferencefilter = function (value, filteredFields) {
        var matchedData = [];
        var matchedDataSource = [];
        for (var i = 0; i < this.treeData.length; i++) {
            if (this.isMatchedNode(value, this.treeData[i])) {
                matchedData.push(this.treeData[i]);
            }
        }
        for (var i = 0; i < matchedData.length; i++) {
            if (matchedDataSource.indexOf(matchedData[i]) === -1) {
                matchedDataSource.push(matchedData[i]);
                var parentId = matchedData[parseInt(i.toString(), 10)][this.fields.parentValue];
                while (!isNOU(parentId)) {
                    var parent_1 = null;
                    for (var j = 0; j < this.treeData.length; j++) {
                        var value_1 = this.treeData[parseInt(j.toString(), 10)][this.fields.value];
                        if (!isNOU(value_1) && (value_1 === parentId)) {
                            parent_1 = this.treeData[j];
                            break;
                        }
                    }
                    if (!isNOU(parent_1) && (matchedDataSource.indexOf(parent_1) === -1)) {
                        matchedDataSource.push(parent_1);
                        parentId = parent_1[this.fields.parentValue];
                    }
                    else {
                        break;
                    }
                }
            }
        }
        filteredFields.dataSource = matchedDataSource;
        return filteredFields;
    };
    DropDownTree.prototype.isMatchedNode = function (value, node, isChild, isChildFiltering) {
        var checkValue;
        var isObjectValue = isChild && isChildFiltering && this.isChildObject();
        checkValue = isObjectValue ? node[this.fields.child.text] : node[this.fields.text];
        if (!checkValue && !isNOU(this.fields.child.text)) {
            var tempChild = this.fields.child;
            while (!node[tempChild.text]) {
                tempChild = tempChild.child;
            }
            checkValue = node[tempChild.text];
        }
        if (this.ignoreCase) {
            checkValue = checkValue.toLowerCase();
            value = value.toLowerCase();
        }
        if (this.ignoreAccent) {
            checkValue = DataUtil.ignoreDiacritics(checkValue);
            value = DataUtil.ignoreDiacritics(value);
        }
        if (this.filterType === 'StartsWith') {
            return checkValue.slice(0, value.length) === value;
        }
        else if (this.filterType === 'EndsWith') {
            return checkValue.slice(-value.length) === value;
        }
        else {
            return checkValue.indexOf(value) !== -1;
        }
    };
    /* To wire events for the dropdown tree */
    DropDownTree.prototype.wireEvents = function () {
        EventHandler.add(this.inputWrapper, 'mouseup', this.dropDownClick, this);
        EventHandler.add(this.inputWrapper, 'focus', this.focusIn, this);
        EventHandler.add(this.inputWrapper, 'blur', this.focusOut, this);
        EventHandler.add(this.inputWrapper, 'mousemove', this.mouseIn, this);
        EventHandler.add(this.inputWrapper, 'mouseout', this.onMouseLeave, this);
        EventHandler.add(this.overAllClear, 'mousedown', this.clearAll, this);
        EventHandler.add(window, 'resize', this.windowResize, this);
        var formElement = closest(this.inputWrapper, 'form');
        if (formElement) {
            EventHandler.add(formElement, 'reset', this.resetValueHandler, this);
        }
        this.keyboardModule = new KeyboardEvents(this.inputWrapper, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    DropDownTree.prototype.wireTreeEvents = function () {
        this.keyboardModule = new KeyboardEvents(this.tree, {
            keyAction: this.treeAction.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    DropDownTree.prototype.wireCheckAllWrapperEvents = function () {
        this.keyboardModule = new KeyboardEvents(this.checkAllParent, {
            keyAction: this.checkAllAction.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    /* To unwire events for the dropdown tree */
    DropDownTree.prototype.unWireEvents = function () {
        EventHandler.remove(this.inputWrapper, 'mouseup', this.dropDownClick);
        EventHandler.remove(this.inputWrapper, 'focus', this.focusIn);
        EventHandler.remove(this.inputWrapper, 'blur', this.focusOut);
        EventHandler.remove(this.inputWrapper, 'mousemove', this.mouseIn);
        EventHandler.remove(this.inputWrapper, 'mouseout', this.onMouseLeave);
        EventHandler.remove(this.overAllClear, 'mousedown', this.clearAll);
        EventHandler.remove(window, 'resize', this.windowResize);
        var formElement = closest(this.inputWrapper, 'form');
        if (formElement) {
            EventHandler.remove(formElement, 'reset', this.resetValueHandler);
        }
        this.keyboardModule.destroy();
        if (this.showSelectAll && this.checkAllParent) {
            EventHandler.remove(this.checkAllParent, 'mouseup', this.clickHandler);
        }
        document.removeEventListener('mousedown', this.documentClickContext);
    };
    /* Trigger when the dropdown is clicked */
    DropDownTree.prototype.dropDownClick = function (e) {
        if (!this.enabled || this.readonly) {
            return;
        }
        if (this.isClearButtonClick) {
            this.isClearButtonClick = false;
            return;
        }
        if (this.isPopupOpen) {
            this.hidePopup();
        }
        else {
            this.focusIn(e);
            this.renderPopup();
        }
        this.showOverAllClear();
    };
    DropDownTree.prototype.mouseIn = function () {
        if (this.enabled || !this.readonly) {
            this.showOverAllClear();
        }
    };
    DropDownTree.prototype.onMouseLeave = function () {
        if (!this.inputFocus) {
            addClass([this.overAllClear], HIDEICON);
            removeClass([this.inputWrapper], SHOW_CLEAR);
        }
    };
    DropDownTree.prototype.getDirective = function () {
        return 'EJS-DROPDOWNTREE';
    };
    DropDownTree.prototype.focusOut = function (e) {
        if (!this.enabled || this.readonly || !this.inputFocus) {
            return;
        }
        if ((Browser.isIE || Browser.info.name === 'edge') && (e.target === this.inputWrapper)) {
            return;
        }
        var target = e.relatedTarget;
        if ((target !== this.inputEle) && (isNOU(target)) && (e.target !== this.inputWrapper || !this.isPopupOpen)) {
            this.onFocusOut(e);
        }
    };
    DropDownTree.prototype.onFocusOut = function (event) {
        this.inputFocus = false;
        if (this.isPopupOpen) {
            this.hidePopup();
        }
        if (this.isClearButtonClick) {
            this.isClearButtonClick = false;
        }
        if (this.showClearButton) {
            this.clearIconWidth = select('.e-clear-icon', this.inputWrapper).offsetWidth;
            addClass([this.overAllClear], HIDEICON);
            removeClass([this.inputWrapper], SHOW_CLEAR);
        }
        removeClass([this.inputWrapper], [INPUTFOCUS]);
        if ((this.allowMultiSelection || this.showCheckBox)) {
            var isValue = this.value ? (this.value.length ? true : false) : false;
            if (this.mode !== 'Delimiter' && this.mode !== 'Custom') {
                if (this.chipWrapper && (this.mode === 'Default')) {
                    addClass([this.chipWrapper], HIDEICON);
                    removeClass([this.inputWrapper], SHOW_CHIP);
                    removeClass([this.inputEle], CHIP_INPUT);
                }
            }
            if (isValue && this.mode !== 'Custom') {
                this.showOrHideValueTemplate(true);
            }
            if (!this.wrapText && isValue) {
                this.updateView();
            }
        }
        if (this.changeOnBlur) {
            this.triggerChangeEvent(event);
        }
        this.removeValue = false;
        this.setOldValue();
        this.trigger('blur');
    };
    DropDownTree.prototype.updateView = function () {
        if ((!this.showCheckBox && !this.allowMultiSelection) || this.mode === 'Custom' || this.inputFocus) {
            return;
        }
        if (this.mode !== 'Box') {
            addClass([this.inputWrapper, this.overFlowWrapper], SHOW_TEXT);
        }
        else {
            addClass([this.inputWrapper], SHOW_CHIP);
        }
        if (this.value && this.value.length !== 0) {
            if (this.inputWrapper.contains(this.chipWrapper)) {
                addClass([this.chipWrapper], HIDEICON);
            }
            addClass([this.inputEle], CHIP_INPUT);
            this.updateOverFlowView();
        }
        this.ensurePlaceHolder();
    };
    DropDownTree.prototype.triggerChangeEvent = function (event) {
        var isEqual = this.ddtCompareValues(this.oldValue, this.value);
        if ((!isEqual || this.isChipDelete) && !this.removeValue) {
            var eventArgs = {
                e: event,
                oldValue: this.oldValue,
                value: this.value,
                isInteracted: event ? true : false,
                element: this.element
            };
            this.trigger('change', eventArgs);
            this.setOldValue();
        }
    };
    DropDownTree.prototype.ddtCompareValues = function (oldValue, newValue) {
        if (oldValue === null || newValue === null) {
            var isValid = oldValue === null ? ((newValue === oldValue) ? true : false) :
                (oldValue.length === 0 ? (newValue === oldValue) : false);
            return isValid;
        }
        else if (oldValue.length !== newValue.length) {
            return false;
        }
        for (var i = 0; i < oldValue.length; i++) {
            if (oldValue[i] !== newValue[i]) {
                return false;
            }
        }
        return true;
    };
    DropDownTree.prototype.focusIn = function (e) {
        if (!this.enabled || this.readonly || this.inputFocus) {
            return;
        }
        this.showOverAllClear();
        this.inputFocus = true;
        addClass([this.inputWrapper], [INPUTFOCUS]);
        if (this.allowMultiSelection || this.showCheckBox) {
            if (this.mode !== 'Delimiter' && this.inputFocus) {
                if (this.chipWrapper && (this.value && this.value.length !== 0)) {
                    removeClass([this.chipWrapper], HIDEICON);
                    addClass([this.inputEle], CHIP_INPUT);
                    this.showOrHideValueTemplate(false, true);
                }
                addClass([this.inputWrapper], SHOW_CHIP);
                if (this.popupObj) {
                    this.popupObj.refreshPosition();
                }
            }
            if (!this.wrapText && this.mode !== 'Custom') {
                if (this.inputWrapper.contains(this.overFlowWrapper)) {
                    addClass([this.overFlowWrapper], HIDEICON);
                }
                if (this.mode === 'Delimiter') {
                    removeClass([this.inputWrapper], SHOW_CHIP);
                    removeClass([this.inputEle], CHIP_INPUT);
                    this.showOrHideValueTemplate(true);
                }
                else {
                    addClass([this.inputWrapper], SHOW_CHIP);
                }
                removeClass([this.inputWrapper], SHOW_TEXT);
                this.ensurePlaceHolder();
            }
        }
        var args = { isInteracted: e ? true : false, event: e };
        this.trigger('focus', args);
    };
    DropDownTree.prototype.treeAction = function (e) {
        var _this = this;
        var eventArgs = {
            cancel: false,
            event: e
        };
        this.trigger('keyPress', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                switch (e.action) {
                    case 'escape':
                    case 'altUp':
                        _this.inputWrapper.focus();
                        e.preventDefault();
                        if (_this.isPopupOpen) {
                            _this.hidePopup();
                        }
                        break;
                    case 'tab':
                        if (_this.isPopupOpen) {
                            _this.hidePopup();
                        }
                        break;
                    case 'enter':
                    case 'ctrlEnter':
                    case 'shiftEnter':
                    case 'csEnter':
                        if (!_this.showCheckBox) {
                            _this.isValueChange = true;
                            _this.keyEventArgs = e;
                        }
                        break;
                    case 'space':
                        _this.isValueChange = true;
                        _this.keyEventArgs = e;
                        break;
                    case 'ctrlA':
                        if (_this.allowMultiSelection) {
                            _this.selectAll(true);
                        }
                        break;
                    case 'moveRight':
                    case 'moveLeft':
                    case 'shiftDown':
                    case 'moveDown':
                    case 'ctrlDown':
                    case 'csDown':
                    case 'shiftUp':
                    case 'moveUp':
                    case 'ctrlUp':
                    case 'csUp':
                    case 'home':
                    case 'shiftHome':
                    case 'ctrlHome':
                    case 'csHome':
                    case 'end':
                    case 'shiftEnd':
                    case 'ctrlEnd':
                    case 'csEnd':
                }
            }
            else {
                e.stopImmediatePropagation();
            }
        });
    };
    DropDownTree.prototype.keyActionHandler = function (e) {
        var _this = this;
        var eventArgs = {
            cancel: false,
            event: e
        };
        this.trigger('keyPress', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                switch (e.action) {
                    case 'escape':
                    case 'altUp':
                        if (_this.isPopupOpen) {
                            _this.hidePopup();
                        }
                        break;
                    case 'shiftTab':
                        if (_this.isPopupOpen) {
                            _this.hidePopup();
                        }
                        if (_this.inputFocus) {
                            _this.onFocusOut();
                        }
                        break;
                    case 'altDown':
                        if (!_this.isPopupOpen) {
                            _this.showPopup();
                            e.preventDefault();
                        }
                        break;
                    case 'moveDown':
                        if (_this.showSelectAll && _this.showCheckBox) {
                            _this.checkAllParent.focus();
                        }
                        break;
                    case 'tab':
                        if (!_this.isPopupOpen && _this.inputFocus) {
                            _this.onFocusOut();
                        }
                        break;
                }
            }
        });
    };
    DropDownTree.prototype.checkAllAction = function (e) {
        var _this = this;
        var eventArgs = {
            cancel: false,
            event: e
        };
        var focusedElement;
        this.trigger('keyPress', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                switch (e.action) {
                    case 'space':
                        _this.clickHandler(e);
                        break;
                    case 'moveDown':
                        e.preventDefault();
                        focusedElement = _this.treeObj.element.querySelector('li[tabindex="0"]') || _this.treeObj.element.querySelector('li');
                        focusedElement.focus();
                        addClass([focusedElement], ['e-node-focus']);
                        break;
                }
            }
        });
    };
    DropDownTree.prototype.windowResize = function () {
        if (this.popupObj) {
            this.popupObj.setProperties({ width: this.setWidth() });
            this.popupObj.refreshPosition();
        }
    };
    DropDownTree.prototype.resetValueHandler = function (e) {
        var formElement = closest(this.inputWrapper, 'form');
        if (formElement && e.target === formElement) {
            this.isDynamicChange = true;
            this.setProperties({ value: null }, true);
            this.resetValue(true);
            this.isDynamicChange = false;
        }
    };
    DropDownTree.prototype.getAriaAttributes = function () {
        return {};
    };
    DropDownTree.prototype.updateOverFlowView = function () {
        this.overFlowWrapper.classList.remove(TOTAL_COUNT_WRAPPER);
        removeClass([this.overFlowWrapper], HIDEICON);
        if (this.value && this.value.length) {
            var data = '';
            var overAllContainer = void 0;
            var temp = void 0;
            var tempData = void 0;
            var tempIndex = 1;
            var wrapperleng = void 0;
            var remaining = void 0;
            var downIconWidth = 0;
            this.overFlowWrapper.innerHTML = '';
            var l10nLocale = { overflowCountTemplate: '+${count} more..', totalCountTemplate: '${count} selected' };
            this.l10n = new L10n(this.getLocaleName(), l10nLocale, this.locale);
            var remainContent = this.l10n.getConstant('overflowCountTemplate');
            var totalContent = this.l10n.getConstant('totalCountTemplate');
            var remainElement = this.createElement('span', { className: REMAIN_WRAPPER });
            this.overFlowWrapper.appendChild(remainElement);
            remainElement.innerText = remainContent.replace('${count}', this.value.length.toString());
            var remainSize = remainElement.offsetWidth;
            remove(remainElement);
            if (this.showDropDownIcon) {
                downIconWidth = select('.' + DDTICON, this.inputWrapper).offsetWidth;
            }
            if (!isNOU(this.value)) {
                if (this.mode !== 'Box') {
                    if (this.valueTemplate) {
                        remaining = this.updateChipAndValueTemplate(false, downIconWidth, remainSize);
                        this.checkRemainingTemplate(remaining, remainElement, remainContent, totalContent);
                        this.updateDelimMode();
                        return;
                    }
                    for (var index = 0; !isNOU(this.value[index]); index++) {
                        data += (index === 0) ? '' : this.delimiterChar + ' ';
                        temp = this.getOverflowVal(index);
                        data += temp;
                        temp = this.overFlowWrapper.innerHTML;
                        if (this.enableHtmlSanitizer) {
                            this.overFlowWrapper.innerText = SanitizeHtmlHelper.sanitize(data);
                        }
                        else {
                            this.overFlowWrapper.innerHTML = data;
                        }
                        wrapperleng = this.overFlowWrapper.offsetWidth;
                        overAllContainer = this.inputWrapper.offsetWidth;
                        if ((wrapperleng + downIconWidth + this.clearIconWidth) > overAllContainer) {
                            if (tempData !== undefined && tempData !== '') {
                                temp = tempData;
                                index = tempIndex + 1;
                            }
                            this.overFlowWrapper.innerHTML = temp;
                            remaining = this.value.length - index;
                            wrapperleng = this.overFlowWrapper.offsetWidth;
                            while (((wrapperleng + remainSize + downIconWidth + this.clearIconWidth) >= overAllContainer)
                                && wrapperleng !== 0 && this.overFlowWrapper.innerHTML !== '') {
                                var textArr = this.overFlowWrapper.innerHTML.split(this.delimiterChar);
                                textArr.pop();
                                this.overFlowWrapper.innerHTML = textArr.join(this.delimiterChar);
                                remaining++;
                                wrapperleng = this.overFlowWrapper.offsetWidth;
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
                else {
                    remaining = this.updateChipAndValueTemplate(true, downIconWidth, remainSize);
                }
            }
            this.checkRemainingTemplate(remaining, remainElement, remainContent, totalContent);
        }
        else {
            this.overFlowWrapper.innerHTML = '';
            addClass([this.overFlowWrapper], HIDEICON);
        }
        this.updateDelimMode();
    };
    DropDownTree.prototype.checkRemainingTemplate = function (remaining, remainElement, remainContent, totalContent) {
        if (remaining > 0) {
            this.overFlowWrapper.appendChild(this.updateRemainTemplate(remainElement, remaining, remainContent, totalContent));
        }
        if (this.mode === 'Box' && !this.overFlowWrapper.classList.contains(TOTAL_COUNT_WRAPPER)) {
            addClass([remainElement], REMAIN_COUNT);
        }
    };
    DropDownTree.prototype.updateChipAndValueTemplate = function (isChip, downIconWidth, remainSize) {
        if (downIconWidth === void 0) { downIconWidth = 0; }
        var currentHtmlContent = '';
        var overAllContainer;
        var previousHtmlContent;
        var previousData;
        var index = 1;
        var wrapperLength;
        var remainingItemsCount;
        addClass([isChip ? this.chipWrapper : this.valueTemplateContainer], HIDEICON);
        var clonedElement = (isChip ? this.chipWrapper :
            this.valueTemplateContainer).cloneNode(true);
        var valueElements = isChip ? selectAll('.' + CHIP, clonedElement) : Array.prototype.slice.call(clonedElement.children);
        for (var i = 0; i < valueElements.length; i++) {
            previousHtmlContent = this.overFlowWrapper.innerHTML;
            this.overFlowWrapper.appendChild(valueElements[i]);
            currentHtmlContent = this.overFlowWrapper.innerHTML;
            wrapperLength = this.overFlowWrapper.offsetWidth;
            overAllContainer = this.inputWrapper.offsetWidth;
            if ((wrapperLength + downIconWidth + this.clearIconWidth) > overAllContainer) {
                if (previousData !== undefined && previousData !== '') {
                    previousHtmlContent = previousData;
                    i = index + 1;
                }
                this.overFlowWrapper.innerHTML = previousHtmlContent;
                remainingItemsCount = this.value.length - i;
                wrapperLength = this.overFlowWrapper.offsetWidth;
                while (((wrapperLength + remainSize + downIconWidth + this.clearIconWidth) >= overAllContainer)
                    && wrapperLength !== 0 && this.overFlowWrapper.innerHTML !== '') {
                    this.overFlowWrapper.removeChild(this.overFlowWrapper.lastChild);
                    remainingItemsCount++;
                    wrapperLength = this.overFlowWrapper.offsetWidth;
                }
                break;
            }
            else if ((wrapperLength + remainSize + downIconWidth + this.clearIconWidth) <= overAllContainer) {
                previousData = currentHtmlContent;
                index = i;
            }
            else if (i === 0) {
                previousData = '';
                index = -1;
            }
        }
        return remainingItemsCount;
    };
    DropDownTree.prototype.updateRemainTemplate = function (remainElement, remaining, remainContent, totalContent) {
        if (this.overFlowWrapper.firstChild && this.overFlowWrapper.firstChild.nodeType === 3 &&
            this.overFlowWrapper.firstChild.nodeValue === '') {
            this.overFlowWrapper.removeChild(this.overFlowWrapper.firstChild);
        }
        remainElement.innerHTML = '';
        remainElement.innerText = (this.overFlowWrapper.firstChild && (this.overFlowWrapper.firstChild.nodeType === 3 || this.mode === 'Box' || this.valueTemplateContainer)) ?
            remainContent.replace('${count}', remaining.toString()) : totalContent.replace('${count}', remaining.toString());
        if (this.overFlowWrapper.firstChild && (this.overFlowWrapper.firstChild.nodeType === 3 || this.mode === 'Box')) {
            removeClass([this.overFlowWrapper], TOTAL_COUNT_WRAPPER);
        }
        else {
            addClass([this.overFlowWrapper], TOTAL_COUNT_WRAPPER);
            removeClass([this.overFlowWrapper], REMAIN_COUNT);
        }
        return remainElement;
    };
    DropDownTree.prototype.getOverflowVal = function (index) {
        var selectedData = this.getSelectedData(this.value[parseInt(index.toString(), 10)]);
        return getValue(this.treeSettings.loadOnDemand ? this.fields.text : 'text', selectedData);
    };
    DropDownTree.prototype.updateDelimMode = function () {
        if (this.mode !== 'Box') {
            if (select('.' + REMAIN_WRAPPER, this.overFlowWrapper) && !this.overFlowWrapper.classList.contains(TOTAL_COUNT_WRAPPER)) {
                addClass([this.overFlowWrapper], REMAIN_COUNT);
                addClass([this.overFlowWrapper], SHOW_TEXT);
            }
            else {
                this.overFlowWrapper.classList.remove(REMAIN_COUNT);
                removeClass([this.overFlowWrapper], REMAIN_COUNT);
            }
        }
        else if (select('.' + REMAIN_WRAPPER, this.overFlowWrapper)) {
            this.overFlowWrapper.classList.remove(REMAIN_COUNT);
        }
    };
    DropDownTree.prototype.createHiddenElement = function () {
        if (this.allowMultiSelection || this.showCheckBox) {
            this.hiddenElement = this.createElement('select', {
                attrs: { 'aria-hidden': 'true', 'class': HIDDENELEMENT, 'tabindex': '-1', 'multiple': '', 'aria-label': this.getModuleName() }
            });
        }
        else {
            this.hiddenElement = this.createElement('select', {
                attrs: { 'aria-hidden': 'true', 'tabindex': '-1', 'class': HIDDENELEMENT, 'aria-label': this.getModuleName() }
            });
        }
        prepend([this.hiddenElement], this.inputWrapper);
        this.validationAttribute();
    };
    DropDownTree.prototype.createClearIcon = function () {
        this.overAllClear = this.createElement('span', {
            className: CLOSEICON_CLASS
        });
        addClass([this.overAllClear], HIDEICON);
        removeClass([this.inputWrapper], SHOW_CLEAR);
        if (this.showClearButton) {
            this.inputWrapper.insertBefore(this.overAllClear, this.inputObj.buttons[0]);
        }
    };
    DropDownTree.prototype.validationAttribute = function () {
        var name = this.inputEle.getAttribute('name') ? this.inputEle.getAttribute('name') : this.inputEle.getAttribute('id');
        this.hiddenElement.setAttribute('name', name);
        this.inputEle.removeAttribute('name');
        var attributes = ['required', 'aria-required', 'form'];
        for (var i = 0; i < attributes.length; i++) {
            var attr = this.inputEle.getAttribute(attributes[i]);
            if (attr) {
                this.hiddenElement.setAttribute(attributes[i], attr);
                this.inputEle.removeAttribute(attributes[i]);
            }
        }
    };
    DropDownTree.prototype.createChip = function () {
        if (!this.inputWrapper.contains(this.chipWrapper)) {
            this.chipWrapper = this.createElement('span', {
                className: CHIP_WRAPPER
            });
            this.chipCollection = this.createElement('span', {
                className: CHIP_COLLECTION
            });
            this.chipWrapper.appendChild(this.chipCollection);
            this.inputWrapper.insertBefore(this.chipWrapper, this.hiddenElement);
            addClass([this.inputWrapper], SHOW_CHIP);
            var isValid = this.getValidMode();
            if (isValid && this.value !== null && (this.value && this.value.length !== 0)) {
                addClass([this.inputEle], CHIP_INPUT);
            }
            else if (this.value === null || (this.value && this.value.length === 0) || this.checkWrapper) {
                addClass([this.chipWrapper], HIDEICON);
            }
        }
    };
    DropDownTree.prototype.getValidMode = function () {
        if (this.allowMultiSelection || this.showCheckBox) {
            return this.mode === 'Box' ? true : (this.mode === 'Default' && this.inputFocus) ? true : false;
        }
        else {
            return false;
        }
    };
    DropDownTree.prototype.createSelectAllWrapper = function () {
        this.checkAllParent = this.createElement('div', {
            className: CHECKALLPARENT, attrs: { 'tabindex': '0' }
        });
        this.selectAllSpan = this.createElement('span', {
            className: ALLTEXT
        });
        this.selectAllSpan.textContent = '';
        var ele = closest(this.element, '.' + BIGGER);
        var touchClass = isNOU(ele) ? '' : SMALL;
        this.checkBoxElement = createCheckBox(this.createElement, true, { cssClass: touchClass });
        this.checkBoxElement.setAttribute('role', 'checkbox');
        this.checkAllParent.appendChild(this.checkBoxElement);
        this.checkAllParent.appendChild(this.selectAllSpan);
        this.setLocale();
        EventHandler.add(this.checkAllParent, 'mouseup', this.clickHandler, this);
        this.wireCheckAllWrapperEvents();
    };
    DropDownTree.prototype.clickHandler = function (e) {
        var target;
        if ((e.currentTarget && e.currentTarget.classList.contains(CHECKALLPARENT))) {
            target = e.currentTarget.firstElementChild.lastElementChild;
        }
        else {
            target = e.target;
        }
        this.checkWrapper = closest(target, '.' + CHECKBOXWRAP);
        if (!isNOU(this.checkWrapper)) {
            this.isClicked = true;
            var checkElement = select('.' + CHECKBOXFRAME, this.checkWrapper);
            this.changeState(this.checkWrapper, checkElement.classList.contains(CHECK) ? 'uncheck' : 'check', e);
            this.isClicked = false;
        }
        e.preventDefault();
    };
    DropDownTree.prototype.changeState = function (wrapper, state, e) {
        var ariaState;
        var frameSpan = wrapper.getElementsByClassName(CHECKBOXFRAME)[0];
        if (state === 'check' && !frameSpan.classList.contains(CHECK)) {
            frameSpan.classList.add(CHECK);
            ariaState = 'true';
            if (!this.isReverseUpdate) {
                this.setOldValue();
                this.isCheckAllCalled = true;
                this.treeObj.checkAll();
                if (!this.changeOnBlur) {
                    this.triggerChangeEvent(e);
                }
            }
            this.setLocale(true);
        }
        else if (state === 'uncheck' && (frameSpan.classList.contains(CHECK))) {
            frameSpan.classList.remove(CHECK);
            ariaState = 'false';
            if (!this.isReverseUpdate) {
                this.treeObj.uncheckAll();
                if (!this.changeOnBlur) {
                    this.triggerChangeEvent(e);
                }
            }
            this.setLocale(false);
        }
        this.setMultiSelect();
        this.ensurePlaceHolder();
        ariaState = state === 'check' ? 'true' : 'false';
        if (!isNOU(ariaState)) {
            wrapper.parentElement.setAttribute('aria-checked', ariaState);
        }
    };
    DropDownTree.prototype.setLocale = function (unSelect) {
        if (!this.selectAllSpan) {
            return;
        }
        if (this.selectAllText !== 'Select All' || this.unSelectAllText !== 'Unselect All') {
            var template = unSelect ? this.unSelectAllText : this.selectAllText;
            this.selectAllSpan.textContent = '';
            var compiledString = compile(template);
            var templateName = unSelect ? 'unSelectAllText' : 'selectAllText';
            for (var _i = 0, _a = compiledString({}, this, templateName, null, !this.isStringTemplate); _i < _a.length; _i++) {
                var item = _a[_i];
                this.selectAllSpan.textContent = item.textContent;
            }
        }
        else {
            this.selectAllSpan.textContent = unSelect ? this.unSelectAllText : this.selectAllText;
        }
    };
    DropDownTree.prototype.setAttributes = function () {
        this.inputEle.setAttribute('tabindex', '-1');
        this.inputEle.setAttribute('aria-label', this.getModuleName());
        var id = this.element.getAttribute('id');
        this.hiddenElement.id = id + '_hidden';
        this.inputWrapper.setAttribute('tabindex', this.inputWrapper.classList.contains('e-disabled') ? '-1' : '0');
        this.inputWrapper.setAttribute('aria-label', this.getModuleName());
        attributes(this.inputWrapper, this.getAriaAttributes());
    };
    DropDownTree.prototype.setHTMLAttributes = function () {
        if (Object.keys(this.htmlAttributes).length) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var htmlAttr = _a[_i];
                if (htmlAttr === 'class') {
                    this.inputWrapper.classList.add(this.htmlAttributes["" + htmlAttr]);
                }
                else if (htmlAttr === 'disabled') {
                    this.setProperties({ enabled: false }, true);
                    this.setEnable();
                }
                else if (htmlAttr === 'readonly') {
                    this.setProperties({ readonly: true }, true);
                    this.dataBind();
                }
                else if (htmlAttr === 'style') {
                    this.inputWrapper.style.cssText = this.htmlAttributes["" + htmlAttr];
                }
                else {
                    var defaultAttr = ['title', 'id', 'placeholder', 'aria-placeholder',
                        'role', 'autocorrect', 'autocomplete', 'autocapitalize', 'spellcheck', 'minlength', 'maxlength'];
                    var validateAttr = ['name', 'required'];
                    if (htmlAttr.indexOf('data') === 0 || validateAttr.indexOf(htmlAttr) > -1) {
                        this.hiddenElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                    }
                    else if (defaultAttr.indexOf(htmlAttr) > -1) {
                        if (htmlAttr === 'placeholder') {
                            Input.setPlaceholder(this.htmlAttributes["" + htmlAttr], this.inputEle);
                        }
                        else {
                            this.inputEle.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                        }
                    }
                    else {
                        this.inputEle.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                    }
                }
            }
        }
    };
    DropDownTree.prototype.updateDataAttribute = function () {
        var value = this.htmlAttributes;
        var invalidAttr = ['class', 'style', 'id', 'type'];
        var attr = {};
        for (var a = 0; a < this.element.attributes.length; a++) {
            if (invalidAttr.indexOf(this.element.attributes[a].name) === -1 &&
                !(this.element.attributes[a].name === 'readonly')) {
                attr[this.element.attributes[a].name] = this.element.getAttribute(this.element.attributes[a].name);
            }
        }
        extend(attr, value, attr);
        this.setProperties({ htmlAttributes: attr }, true);
    };
    DropDownTree.prototype.showOverAllClear = function () {
        if (!this.enabled || this.readonly) {
            return;
        }
        if (this.overAllClear) {
            var isValue = this.value ? (this.value.length ? true : false) : false;
            if (isValue && this.showClearButton) {
                removeClass([this.overAllClear], HIDEICON);
                addClass([this.inputWrapper], SHOW_CLEAR);
            }
            else {
                addClass([this.overAllClear], HIDEICON);
                removeClass([this.inputWrapper], SHOW_CLEAR);
            }
        }
    };
    DropDownTree.prototype.setTreeValue = function () {
        if (this.value !== null && this.value.length !== 0) {
            var data = void 0;
            if (this.showCheckBox || this.allowMultiSelection) {
                for (var i = this.value.length - 1; i >= 0; i--) {
                    data = this.treeObj.getTreeData(this.value[i])[0];
                    if (isNOU(data)) {
                        this.value.splice(i, 1);
                    }
                }
                if (this.value.length !== 0) {
                    this.setValidValue();
                }
            }
            else {
                data = this.treeObj.getTreeData(this.value[0])[0];
                if (!isNOU(data)) {
                    this.setProperties({ text: data[this.fields.text] }, true);
                    this.setValidValue();
                }
                else {
                    this.setProperties({ value: this.currentValue }, true);
                }
            }
        }
    };
    DropDownTree.prototype.setTreeText = function () {
        if (this.value !== null && !this.isInitialized) {
            return;
        }
        if (this.text !== null) {
            var data = void 0;
            var valArr = [];
            if (this.showCheckBox || this.allowMultiSelection) {
                var textArr = this.text.split(this.delimiterChar);
                for (var i = 0; i < textArr.length; i++) {
                    data = this.getItems(textArr[i]);
                    if (!isNOU(data)) {
                        valArr.push(data[this.fields.value].toString());
                    }
                }
                if (valArr.length !== 0) {
                    this.setOldValue();
                    this.setProperties({ value: valArr }, true);
                    this.setValidValue();
                }
                else {
                    this.setProperties({ text: this.currentText }, true);
                }
            }
            else {
                data = this.getItems(this.text);
                if (!isNOU(data)) {
                    this.setOldValue();
                    this.setProperties({ value: [data[this.fields.value].toString()] }, true);
                    this.setValidValue();
                }
                else {
                    this.setProperties({ text: this.currentText }, true);
                }
            }
        }
    };
    DropDownTree.prototype.setSelectedValue = function () {
        if (this.value !== null && !(this.value.length === 0)) {
            return;
        }
        if (!this.isInitialized) {
            this.setOldValue();
            if (this.treeObj.selectedNodes.length > 0 && !this.showCheckBox) {
                this.setProperties({ value: this.treeObj.selectedNodes }, true);
                if (this.allowMultiSelection) {
                    this.updateMode();
                }
            }
            else if (this.showCheckBox && this.treeObj.checkedNodes) {
                if (this.treeObj.checkedNodes.length > 0) {
                    this.setProperties({ value: this.treeObj.checkedNodes }, true);
                    setValue('selectedNodes', [], this.treeObj);
                    this.treeObj.dataBind();
                    this.updateMode();
                }
            }
            this.updateSelectedValues();
            this.currentText = this.text;
            this.currentValue = this.value;
        }
    };
    DropDownTree.prototype.setValueTemplate = function () {
        var _this = this;
        if (this.valueTemplate) {
            var compiledString = this.initializeValueTemplate();
            this.getValueTemplateElement(this.value[0], compiledString);
            if (this.hasTemplate && this.portals) {
                if (this.treeObj.portals) {
                    this.portals = this.portals.concat(this.treeObj.portals.filter(function (item) {
                        return !_this.portals.includes(item);
                    }));
                }
                if (this.isReact) {
                    this.renderReactTemplates(this.reactCallBack);
                }
            }
            this.showOrHideValueTemplate(true);
        }
    };
    DropDownTree.prototype.getValueTemplateElement = function (value, compiledString) {
        var selectedData = this.getNodeData(value, this.isFilteredData ? this.treeData : this.treeItems);
        var templateElements = compiledString(selectedData, this, 'valueTemplate', this.element.id + "valueTemplate", this.isStringTemplate, undefined, this.valueTemplateContainer);
        if (templateElements) {
            templateElements = Array.prototype.slice.call(templateElements);
            append(templateElements, this.valueTemplateContainer);
        }
    };
    DropDownTree.prototype.setValidValue = function () {
        var _this = this;
        if (!this.showCheckBox && !this.allowMultiSelection) {
            Input.setValue(this.text, this.inputEle, this.floatLabelType);
            this.setValueTemplate();
            var id = this.value[0].toString();
            if (this.treeObj.selectedNodes[0] !== id) {
                setValue('selectedNodes', [id], this.treeObj);
                if (this.fields.dataSource instanceof DataManager) {
                    this.updateSelectedValues();
                }
            }
        }
        else {
            if (this.showCheckBox) {
                var difference = this.value.length !== this.treeObj.checkedNodes.length || this.value.filter(function (e) {
                    return _this.treeObj.checkedNodes.indexOf(e) === -1;
                }).length > 0;
                if (difference || this.treeSettings.autoCheck) {
                    this.treeObj.checkedNodes = this.value.slice();
                    this.treeObj.dataBind();
                    this.setMultiSelect();
                }
            }
            else {
                this.treeObj.selectedNodes = this.value.slice();
                this.selectedText = [];
                this.updateSelectedValues();
            }
            this.treeObj.dataBind();
        }
        this.currentText = this.text;
        this.currentValue = this.value;
        if (!isNOU(this.value) && this.value.length > 0 && !isNOU(this.currentText)) {
            this.inputWrapper.setAttribute('aria-label', this.currentText.replace(/,/g, ', '));
        }
        if (this.isInitialized) {
            this.triggerChangeEvent();
        }
    };
    DropDownTree.prototype.getItems = function (givenText) {
        var data;
        if (this.treeDataType === 1) {
            for (var i = 0; i < this.treeItems.length; i++) {
                var text = getValue(this.fields.text, this.treeItems[parseInt(i.toString(), 10)]);
                if (!isNOU(this.treeItems[i]) && !isNOU(text) && text === givenText) {
                    data = this.treeItems[i];
                    break;
                }
            }
        }
        else {
            data = this.getNestedItems(this.treeItems, this.fields, givenText);
        }
        return data;
    };
    DropDownTree.prototype.getNestedItems = function (data, field, givenText) {
        var newData;
        for (var i = 0, objlen = data.length; i < objlen; i++) {
            var dataId = getValue(this.fields.text, data[parseInt(i.toString(), 10)]);
            if (data[i] && dataId && dataId.toString() === givenText) {
                return data[i];
            }
            else if (typeof field.child === 'string' && !isNOU(getValue(field.child, data[i]))) {
                var childData = getValue(field.child, data[parseInt(i.toString(), 10)]);
                newData = this.getNestedItems(childData, this.getChildType(field), givenText);
                if (newData !== undefined) {
                    break;
                }
            }
            else if (this.fields.dataSource instanceof DataManager && !isNOU(getValue('child', data[i]))) {
                var child = 'child';
                newData = this.getNestedItems(getValue(child, data[parseInt(i.toString(), 10)]), this.getChildType(field), givenText);
                if (newData !== undefined) {
                    break;
                }
            }
        }
        return newData;
    };
    DropDownTree.prototype.getChildType = function (mapper) {
        return (typeof mapper.child === 'string' || isNOU(mapper.child)) ? mapper : mapper.child;
    };
    /* To render the treeview */
    DropDownTree.prototype.renderTree = function () {
        this.treeObj = new TreeView({
            fields: this.getTreeFields(this.fields),
            enableRtl: this.enableRtl,
            nodeSelected: this.onNodeSelected.bind(this),
            nodeChecked: this.onNodeChecked.bind(this),
            nodeChecking: this.beforeCheck.bind(this),
            nodeExpanded: this.onNodeExpanded.bind(this),
            actionFailure: this.onActionFailure.bind(this),
            nodeClicked: this.onNodeClicked.bind(this),
            dataBound: this.OnDataBound.bind(this),
            allowMultiSelection: this.allowMultiSelection,
            enableHtmlSanitizer: this.enableHtmlSanitizer,
            showCheckBox: this.showCheckBox,
            autoCheck: this.treeSettings.autoCheck,
            sortOrder: this.sortOrder,
            expandOn: this.treeSettings.expandOn,
            loadOnDemand: this.treeSettings.loadOnDemand,
            nodeSelecting: this.onBeforeSelect.bind(this),
            nodeTemplate: this.itemTemplate,
            checkDisabledChildren: this.treeSettings.checkDisabledChildren
        });
        this.treeObj.root = this.root ? this.root : this;
        this.treeObj.appendTo(this.tree);
    };
    /* To render the popup element */
    DropDownTree.prototype.renderPopup = function () {
        var _this = this;
        if (this.isFilteredData) {
            this.treeObj.element.classList.remove('e-filtering');
            this.filterObj.value = '';
            this.treeObj.fields = this.getTreeFields(this.fields);
            this.isFilterRestore = true;
            this.isFilteredData = false;
            this.hideCheckAll(false);
        }
        var isCancelled = false;
        var args = { cancel: false };
        this.trigger('beforeOpen', args, function (args) {
            if (!args.cancel) {
                addClass([_this.inputWrapper], [ICONANIMATION]);
                if (_this.isFirstRender) {
                    _this.popupEle = _this.createElement('div', {
                        id: _this.element.id + '_options', className: POPUP_CLASS + ' ' + (_this.cssClass != null ? _this.cssClass : '')
                    });
                    _this.popupEle.setAttribute('role', 'region');
                    _this.popupEle.setAttribute('aria-label', _this.element.id);
                    document.body.appendChild(_this.popupEle);
                    _this.createPopup(_this.popupEle);
                }
                else {
                    _this.popupEle = _this.popupObj.element;
                    if (_this.isReact && _this.isFilterRestore) {
                        _this.treeObj.refresh();
                        _this.isFilteredData = true;
                        _this.popupEle.removeChild(_this.filterContainer);
                    }
                }
            }
            else {
                isCancelled = true;
            }
            if (_this.isFirstRender && !isCancelled || _this.isFilteredData) {
                _this.isFilteredData = false;
                prepend([_this.popupDiv], _this.popupEle);
                removeClass([_this.popupDiv], DDTHIDEICON);
                if (_this.allowFiltering) {
                    _this.renderFilter();
                }
                if (_this.showCheckBox && _this.showSelectAll && (!_this.popupDiv.classList.contains(NODATA))) {
                    _this.createSelectAllWrapper();
                    _this.popupEle.insertBefore(_this.checkAllParent, _this.popupDiv);
                }
                if (_this.headerTemplate) {
                    _this.setHeaderTemplate();
                }
                if (_this.footerTemplate) {
                    _this.setFooterTemplate();
                }
                _this.isFirstRender = false;
                if (_this.hasTemplate && _this.portals) {
                    if (_this.treeObj.portals) {
                        _this.portals = _this.portals.concat(_this.treeObj.portals.filter(function (item) {
                            return !_this.portals.includes(item);
                        }));
                    }
                    if (_this.isReact) {
                        _this.renderReactTemplates(_this.reactCallBack);
                    }
                }
            }
            if (!isCancelled) {
                attributes(_this.inputEle, { 'aria-expanded': 'true' });
                _this.popupObj.show(null, (_this.zIndex === 1000) ? _this.inputEle : null);
                removeClass([_this.popupEle], DDTHIDEICON);
                _this.updatePopupHeight();
                _this.popupObj.refreshPosition();
                if (!(_this.showSelectAll || _this.allowFiltering) && (!_this.popupDiv.classList.contains(NODATA)
                    && _this.treeItems.length > 0)) {
                    var focusedElement = _this.value != null && _this.text != null ? _this.treeObj.element.querySelector('[data-uid="' + _this.value[0] + '"]') : null;
                    if (focusedElement) {
                        _this.treeObj.element.querySelector('li').setAttribute('tabindex', '-1');
                        focusedElement.setAttribute('tabindex', '0');
                    }
                    else {
                        var oldFocussedNode = _this.treeObj.element.querySelector('.e-node-focus');
                        focusedElement = _this.treeObj.element.querySelector('li[tabindex="0"]:not(.e-disable)') ||
                            _this.treeObj.element.querySelector('li:not(.e-disable)');
                        _this.removeFocus(focusedElement, oldFocussedNode);
                    }
                    _this.updateFocus(focusedElement);
                }
                if (_this.treeObj.checkedNodes.length > 0 && !_this.isFilterRestore) {
                    var nodes = _this.treeObj.element.querySelectorAll('li');
                    var checkedNodes = _this.treeObj.element.querySelectorAll('li[aria-checked=true]');
                    if ((checkedNodes.length === nodes.length) && _this.checkBoxElement) {
                        var wrap = closest(_this.checkBoxElement, '.' + CHECKBOXWRAP);
                        _this.changeState(wrap, 'check');
                        _this.checkSelectAll = false;
                    }
                }
                if (_this.showSelectAll && !_this.allowFiltering) {
                    var oldFocussedNode = _this.treeObj.element.querySelector('.e-node-focus');
                    var focusedElement = _this.popupEle.querySelector('.e-selectall-parent');
                    _this.removeFocus(focusedElement, oldFocussedNode);
                    _this.updateFocus(focusedElement);
                }
                if (_this.allowFiltering) {
                    var focusedElement = _this.treeObj.element.querySelector('li.e-node-focus');
                    if (!isNOU(focusedElement)) {
                        removeClass([focusedElement], 'e-node-focus');
                    }
                    removeClass([_this.inputWrapper], [INPUTFOCUS]);
                    _this.filterObj.element.focus();
                }
                var eventArgs = { popup: _this.popupObj };
                _this.trigger('open', eventArgs);
            }
        });
    };
    DropDownTree.prototype.removeFocus = function (focusedElement, oldFocusedElement) {
        if (oldFocusedElement && oldFocusedElement !== focusedElement) {
            oldFocusedElement.setAttribute('tabindex', '-1');
            removeClass([oldFocusedElement], 'e-node-focus');
        }
    };
    DropDownTree.prototype.updateFocus = function (focusedElement) {
        if (!isNOU(focusedElement)) {
            focusedElement.focus();
            addClass([focusedElement], ['e-node-focus']);
        }
    };
    DropDownTree.prototype.reactCallBack = function () {
        if (!isNOU(this.popupObj)) {
            this.updatePopupHeight();
            this.popupObj.refreshPosition();
        }
    };
    DropDownTree.prototype.updatePopupHeight = function () {
        if (this.isFirstRender) {
            return;
        }
        var popupHeight = this.getHeight();
        this.popupEle.style.maxHeight = popupHeight;
        if (this.allowFiltering) {
            var height = Math.round(this.filterContainer.getBoundingClientRect().height);
            popupHeight = formatUnit(parseInt(popupHeight, 10) - height + 'px');
        }
        if (this.headerTemplate) {
            var height = Math.round(this.header.getBoundingClientRect().height);
            popupHeight = formatUnit(parseInt(popupHeight, 10) - height + 'px');
        }
        if (this.showCheckBox && this.showSelectAll && (!this.popupDiv.classList.contains(NODATA))) {
            var height = Math.round(this.checkAllParent.getBoundingClientRect().height);
            popupHeight = formatUnit(parseInt(popupHeight, 10) - height + 'px');
        }
        if (this.footerTemplate) {
            var height = Math.round(this.footer.getBoundingClientRect().height);
            popupHeight = formatUnit(parseInt(popupHeight, 10) - height + 'px');
        }
        var border = parseInt(window.getComputedStyle(this.popupEle).borderTopWidth, 10);
        border = border + parseInt(window.getComputedStyle(this.popupEle).borderBottomWidth, 10);
        popupHeight = formatUnit(parseInt(popupHeight, 10) - border + 'px');
        this.popupDiv.style.maxHeight = popupHeight;
    };
    DropDownTree.prototype.createPopup = function (element) {
        var _this = this;
        if (this.isFirstRender) {
            this.popupObj = new Popup(element, {
                width: this.setWidth(),
                targetType: 'relative',
                collision: { X: 'flip', Y: 'flip' },
                relateTo: this.inputWrapper,
                zIndex: this.zIndex,
                enableRtl: this.enableRtl,
                position: { X: 'left', Y: 'bottom' },
                close: function () {
                    _this.isPopupOpen = false;
                },
                open: function () {
                    document.addEventListener('mousedown', _this.documentClickContext);
                    _this.isPopupOpen = true;
                },
                targetExitViewport: function () {
                    if (!Browser.isDevice) {
                        _this.hidePopup();
                    }
                }
            });
        }
    };
    /* To calculate the width when change via set model */
    DropDownTree.prototype.setElementWidth = function (inputWidth) {
        var ddElement = this.inputWrapper;
        if (!isNOU(inputWidth)) {
            if (typeof inputWidth === 'number') {
                ddElement.style.width = formatUnit(inputWidth);
            }
            else if (typeof inputWidth === 'string') {
                ddElement.style.width = (inputWidth.match(/px|%|em/)) ? (inputWidth) :
                    (formatUnit(inputWidth));
            }
        }
    };
    /* To calculate the width of the popup */
    DropDownTree.prototype.setWidth = function () {
        var width = formatUnit(this.popupWidth);
        if (width.indexOf('%') > -1) {
            width = (this.inputWrapper.offsetWidth * parseFloat(width) / 100).toString() + 'px';
        }
        else if (typeof this.popupWidth === 'string') {
            width = (this.popupWidth.match(/px|em/)) ? (this.popupWidth) : width;
        }
        return width;
    };
    /* To calculate the height of the popup */
    DropDownTree.prototype.getHeight = function () {
        var height = formatUnit(this.popupHeight);
        if (height.indexOf('%') > -1) {
            // Will set the height of the popup according to the view port height
            height = (document.documentElement.clientHeight * parseFloat(height) / 100).toString() + 'px';
        }
        else if (typeof this.popupHeight === 'string') {
            height = (this.popupHeight.match(/px|em/)) ? (this.popupHeight) : height;
        }
        return height;
    };
    DropDownTree.prototype.onDocumentClick = function (e) {
        var target = e.target;
        var isTree = closest(target, '.' + PARENTITEM);
        var isFilter = closest(target, '.' + FILTERWRAP);
        var isHeader = closest(target, '.' + HEADER);
        var isFooter = closest(target, '.' + FOOTER);
        var isScroller = target.classList.contains(DROPDOWN) ? true :
            (matches(target, '.e-ddt .e-popup') || matches(target, '.e-ddt .e-treeview'));
        if ((this.isPopupOpen && ((!isNOU(this.inputWrapper) &&
            this.inputWrapper.contains(target)) || isTree || isScroller || isHeader || isFooter)) ||
            ((this.allowMultiSelection || this.showCheckBox) && (this.isPopupOpen && target.classList.contains(CHIP_CLOSE) ||
                (this.isPopupOpen && (target.classList.contains(CHECKALLPARENT) || target.classList.contains(ALLTEXT)
                    || target.classList.contains(CHECKBOXFRAME)))))) {
            this.isDocumentClick = false;
            e.preventDefault();
        }
        else if (!isNOU(this.inputWrapper) && !this.inputWrapper.contains(target) && this.inputFocus && !isFilter) {
            this.focusOut(e);
        }
    };
    DropDownTree.prototype.onActionFailure = function (e) {
        this.trigger('actionFailure', e);
        this.l10nUpdate(true);
        addClass([this.popupDiv], NODATA);
    };
    DropDownTree.prototype.OnDataBound = function (args) {
        this.treeItems = args.data;
        if (this.treeItems.length <= 0) {
            this.l10nUpdate();
            addClass([this.popupDiv], NODATA);
            this.hideCheckAll(true);
        }
        else if (this.popupDiv.classList.contains(NODATA) && this.treeItems.length >= 1) {
            removeClass([this.popupDiv], NODATA);
            this.hideCheckAll(false);
        }
        if (!this.isFilteredData) {
            this.treeDataType = this.getTreeDataType(this.treeItems, this.fields);
        }
        if (this.isFirstRender && this.isRemoteData) {
            this.setTreeValue();
            this.setTreeText();
            this.updateHiddenValue();
            this.setSelectedValue();
            if (!this.wrapText) {
                this.updateView();
            }
            this.treeObj.element.focus();
            this.isInitialized = true;
        }
        var eventArgs = { data: args.data };
        this.trigger('dataBound', eventArgs);
        if (this.filterObj === null) {
            this.isFilteredData = false;
        }
        if (this.isFilteredData) {
            this.treeObj.expandAll();
        }
        if (this.isFilterRestore) {
            this.restoreFilterSelection();
            if (!this.showSelectAll) {
                this.isFilterRestore = false;
            }
        }
    };
    DropDownTree.prototype.restoreFilterSelection = function () {
        if (this.showCheckBox) {
            this.treeObj.checkedNodes = this.value ? this.value : [];
        }
        else {
            this.treeObj.selectedNodes = this.value ? this.value : [];
        }
    };
    /* To set cssclass for the dropdowntree */
    DropDownTree.prototype.setCssClass = function (newClass, oldClass) {
        var elements = this.popupObj ? [this.inputWrapper, this.popupObj.element] : [this.inputWrapper];
        if (!isNOU(oldClass) && oldClass !== '') {
            removeClass(elements, oldClass.split(' '));
        }
        if (!isNOU(newClass) && newClass !== '') {
            addClass(elements, newClass.split(' '));
        }
    };
    DropDownTree.prototype.setEnableRTL = function (state) {
        if (state) {
            this.inputWrapper.classList.add(RTL);
        }
        else {
            this.inputWrapper.classList.remove(RTL);
        }
        if (this.popupObj) {
            this.popupObj.enableRtl = state;
            this.popupObj.dataBind();
        }
        if (this.treeObj) {
            this.treeObj.enableRtl = state;
            this.treeObj.dataBind();
        }
    };
    /* To set enable property */
    DropDownTree.prototype.setEnable = function () {
        Input.setEnabled(this.enabled, this.inputEle);
        if (this.enabled) {
            removeClass([this.inputWrapper], DISABLED);
            this.inputEle.setAttribute('aria-disabled', 'false');
            this.inputWrapper.setAttribute('aria-disabled', 'false');
        }
        else {
            if (this.isPopupOpen) {
                this.hidePopup();
            }
            addClass([this.inputWrapper], DISABLED);
            if (this.inputWrapper && this.inputWrapper.classList.contains(INPUTFOCUS)) {
                removeClass([this.inputWrapper], [INPUTFOCUS]);
            }
            this.inputEle.setAttribute('aria-disabled', 'true');
            this.inputWrapper.setAttribute('aria-disabled', 'true');
        }
    };
    DropDownTree.prototype.cloneFields = function (fields) {
        var clonedField = {
            dataSource: fields.dataSource, value: fields.value, text: fields.text, parentValue: fields.parentValue,
            child: this.cloneChildField(fields.child), hasChildren: fields.hasChildren, expanded: fields.expanded,
            iconCss: fields.iconCss, imageUrl: fields.imageUrl, htmlAttributes: fields.htmlAttributes, query: fields.query,
            selected: fields.selected, selectable: fields.selectable, tableName: fields.tableName, tooltip: fields.tooltip
        };
        return clonedField;
    };
    DropDownTree.prototype.cloneChildField = function (fields) {
        if (typeof fields === 'string') {
            return fields;
        }
        else {
            var clonedField = {
                dataSource: fields.dataSource, value: fields.value, text: fields.text, parentValue: fields.parentValue,
                child: (fields.child ? this.cloneChildField(fields.child) : null), hasChildren: fields.hasChildren,
                expanded: fields.expanded, iconCss: fields.iconCss, imageUrl: fields.imageUrl, htmlAttributes: fields.htmlAttributes,
                query: fields.query, selected: fields.selected, selectable: fields.selectable,
                tableName: fields.tableName, tooltip: fields.tooltip
            };
            return clonedField;
        }
    };
    DropDownTree.prototype.getTreeFields = function (fields) {
        var treeFields = {
            dataSource: fields.dataSource, id: fields.value, text: fields.text, parentID: fields.parentValue,
            child: this.getTreeChildren(fields.child), hasChildren: fields.hasChildren, expanded: fields.expanded,
            iconCss: fields.iconCss, imageUrl: fields.imageUrl, isChecked: fields.selected,
            htmlAttributes: fields.htmlAttributes, query: fields.query, selectable: fields.selectable, selected: fields.selected,
            tableName: fields.tableName, tooltip: fields.tooltip
        };
        return treeFields;
    };
    DropDownTree.prototype.getTreeChildren = function (mapper) {
        if (typeof mapper === 'string') {
            return mapper;
        }
        else if (!isNOU(mapper)) {
            mapper = this.getActualProperties(mapper);
            var childFields = mapper;
            if (mapper.value) {
                childFields.id = mapper.value;
            }
            if (mapper.parentValue) {
                childFields.parentID = mapper.parentValue;
            }
            if (mapper.child) {
                childFields.child = this.getTreeChildren(mapper.child);
            }
            if (mapper.selected && this.showCheckBox) {
                childFields.isChecked = mapper.selected;
            }
            return childFields;
        }
        return null;
    };
    DropDownTree.prototype.getTreeDataType = function (ds, field) {
        if (this.fields.dataSource instanceof DataManager) {
            for (var i = 0; i < ds.length; i++) {
                if ((typeof field.child === 'string') && isNOU(getValue(field.child, ds[i]))) {
                    return 1;
                }
            }
            return 2;
        }
        if (isNOU(this.fields.dataSource)) {
            this.fields.dataSource = [];
        }
        for (var i = 0, len = this.fields.dataSource.length; i < len; i++) {
            if ((typeof field.child === 'string') && !isNOU(getValue(field.child, this.fields.dataSource[i]))) {
                return 2;
            }
            if (!isNOU(getValue(field.parentValue, this.fields.dataSource[i])) ||
                !isNOU(getValue(field.hasChildren, this.fields.dataSource[i]))) {
                return 1;
            }
        }
        return 1;
    };
    /* Triggers when the tree fields is changed dynamically */
    DropDownTree.prototype.setFields = function () {
        this.resetValue();
        if (this.hasTemplate) {
            this.updateTemplate();
        }
        this.treeObj.fields = this.getTreeFields(this.fields);
        this.setProperties({ value: this.oldValue }, true);
        this.treeObj.dataBind();
        this.updateValue(this.value);
    };
    DropDownTree.prototype.getEventArgs = function (args) {
        var checkData = args.data;
        var selectData = args.nodeData;
        var state;
        if (this.showCheckBox) {
            if (args.action === 'check') {
                state = 'select';
            }
            else if (args.action === 'uncheck') {
                state = 'un-select';
            }
        }
        var eventArgs = {
            action: this.showCheckBox ? state : args.action,
            isInteracted: this.isClicked ? true : args.isInteracted,
            item: args.node,
            itemData: this.showCheckBox ? checkData[0] : selectData
        };
        return eventArgs;
    };
    DropDownTree.prototype.onBeforeSelect = function (args) {
        if (args.isInteracted) {
            this.setOldValue();
            if (this.value === null) {
                this.setProperties({ value: [] }, true);
            }
        }
    };
    DropDownTree.prototype.updateHiddenValue = function () {
        if (this.allowMultiSelection || this.showCheckBox) {
            return;
        }
        if (this.value && this.value.length) {
            this.hiddenElement.innerHTML = '<option selected value ="' + this.value[0] + '">' + this.text + '</option>';
        }
        else {
            this.hiddenElement.innerHTML = '';
        }
    };
    /* Triggers when the tree node is selected */
    DropDownTree.prototype.onNodeSelected = function (args) {
        if (this.showCheckBox) {
            return;
        }
        var eventArgs = this.getEventArgs(args);
        this.trigger('select', eventArgs);
        var selectedText;
        if (args.isInteracted) {
            var id = getValue('id', args.nodeData).toString();
            if (!this.allowMultiSelection) {
                this.hiddenElement.innerHTML = '';
                this.setProperties({ value: [id] }, true);
                if (this.itemTemplate) {
                    selectedText = getValue('text', this.treeObj.getNode(id));
                }
                else {
                    selectedText = getValue('text', args.nodeData).toString();
                }
                Input.setValue(selectedText, this.inputEle, this.floatLabelType);
                this.setProperties({ text: selectedText }, true);
                this.currentText = this.text;
                this.currentValue = this.value;
                this.setValueTemplate();
                if (!isNOU(this.value) && this.value.length > 0) {
                    this.inputWrapper.setAttribute('aria-label', args.nodeData.text.toString());
                }
                attributes(this.inputWrapper, { 'aria-describedby': this.element.id });
                attributes(this.inputWrapper, { 'aria-activedescendant': id.toString() });
                this.updateHiddenValue();
                this.showOverAllClear();
                this.hidePopup();
                this.isNodeSelected = true;
            }
            else if (this.allowMultiSelection) {
                this.setMultiSelect();
            }
        }
        if (this.isValueChange && !this.changeOnBlur) {
            this.triggerChangeEvent(this.keyEventArgs);
            this.isValueChange = false;
        }
    };
    DropDownTree.prototype.onNodeClicked = function (args) {
        if (!this.changeOnBlur && this.isNodeSelected) {
            this.triggerChangeEvent(args.event);
            this.isNodeSelected = false;
        }
        var target = args.event.target;
        if ((target.classList.contains('e-fullrow') || target.classList.contains('e-list-text')) && this.showCheckBox) {
            this.isClicked = true;
            var getNodeDetails = this.treeObj.getNode(args.node);
            if (getNodeDetails.isChecked === 'true') {
                this.treeObj.uncheckAll([args.node]);
            }
            else {
                this.treeObj.checkAll([args.node]);
            }
            this.isClicked = false;
            this.setMultiSelect();
            this.ensurePlaceHolder();
        }
        if (!this.changeOnBlur && (this.allowMultiSelection || this.showCheckBox)) {
            this.triggerChangeEvent(args.event);
        }
    };
    DropDownTree.prototype.onNodeChecked = function (args) {
        var eventArgs = this.getEventArgs(args);
        this.trigger('select', eventArgs);
        if (this.isFilteredData && args.action === 'uncheck') {
            var id = getValue('id', args.data[0]).toString();
            this.removeSelectedData(id, true);
        }
        if (!this.isChipDelete && args.isInteracted || (!this.isFilteredData && args.action === 'check' && this.isFromFilterChange)) {
            this.setMultiSelect();
            this.ensurePlaceHolder();
        }
        if (this.showSelectAll && this.checkBoxElement) {
            var nodes = this.treeObj.element.querySelectorAll('li');
            var checkedNodes = this.treeObj.element.querySelectorAll('li[aria-checked=true]');
            var wrap = closest(this.checkBoxElement, '.' + CHECKBOXWRAP);
            if ((wrap && args.action === 'uncheck' && (args.isInteracted || checkedNodes.length === 0 ||
                (!isNOU(args.data[0]) && args.data[0].isChecked === 'false'))) || !args.isInteracted && this.isFilterRestore) {
                this.isFilterRestore = false;
                this.isReverseUpdate = true;
                this.changeState(wrap, 'uncheck');
                this.isReverseUpdate = false;
            }
            else if (wrap && args.action === 'check'
                && checkedNodes.length === nodes.length
                && (args.isInteracted || this.isCheckAllCalled || (!isNOU(args.data[0]) && args.data[0].isChecked === 'true'))) {
                this.isReverseUpdate = true;
                this.isCheckAllCalled = false;
                this.changeState(wrap, 'check');
                this.isReverseUpdate = false;
            }
        }
        if (this.isValueChange && !this.changeOnBlur) {
            this.triggerChangeEvent(this.keyEventArgs);
            this.isValueChange = false;
        }
    };
    DropDownTree.prototype.beforeCheck = function (args) {
        if (args.isInteracted) {
            this.setOldValue();
        }
    };
    DropDownTree.prototype.onNodeExpanded = function () {
        if (this.hasTemplate && this.portals && this.treeObj.portals) {
            for (var i = 0; i < this.treeObj.portals.length; i++) {
                if (this.portals.indexOf(this.treeObj.portals[i]) === -1) {
                    this.portals.push(this.treeObj.portals[i]);
                }
            }
            this.renderReactTemplates();
        }
    };
    DropDownTree.prototype.updateClearButton = function (state) {
        if (state) {
            if (!this.inputWrapper.contains(this.overAllClear)) {
                this.inputEle.parentElement.insertBefore(this.overAllClear, this.inputEle.nextSibling);
            }
            else {
                removeClass([this.overAllClear], HIDEICON);
                addClass([this.inputWrapper], SHOW_CLEAR);
            }
        }
        else {
            addClass([this.overAllClear], HIDEICON);
            removeClass([this.inputWrapper], SHOW_CLEAR);
        }
        if ((this.allowMultiSelection || this.showCheckBox) && this.chipWrapper) {
            var chipClose = selectAll('.' + CHIP_CLOSE, this.chipWrapper);
            for (var i = 0; i < chipClose.length; i++) {
                if (!state) {
                    addClass([chipClose[i]], HIDEICON);
                }
                else {
                    removeClass([chipClose[i]], HIDEICON);
                }
            }
        }
    };
    DropDownTree.prototype.updateDropDownIconState = function (state) {
        var spinIcon = select('.' + DDTICON, this.inputWrapper);
        if (state) {
            if (!spinIcon) {
                Input.appendSpan(DROPDOWNICON, this.inputWrapper, this.createElement);
            }
            else {
                removeClass([spinIcon], HIDEICON);
            }
            addClass([this.inputWrapper], SHOW_DD_ICON);
        }
        else {
            addClass([spinIcon], HIDEICON);
            removeClass([this.inputWrapper], SHOW_DD_ICON);
        }
    };
    DropDownTree.prototype.updateMode = function () {
        if (this.mode === 'Custom') {
            return;
        }
        if (this.mode !== 'Delimiter') {
            if (!this.inputWrapper.contains(this.chipWrapper)) {
                this.createChip();
            }
            var isValid = this.getValidMode();
            if (this.chipWrapper.classList.contains(HIDEICON) && isValid) {
                removeClass([this.chipWrapper], HIDEICON);
                this.showOrHideValueTemplate(false, true);
                addClass([this.inputWrapper], SHOW_CHIP);
            }
            else if (!isValid) {
                addClass([this.chipWrapper], HIDEICON);
                removeClass([this.inputWrapper], SHOW_CHIP);
                this.showOrHideValueTemplate(true);
            }
            var isValue = this.value !== null ? (this.value.length !== 0 ? true : false) : false;
            if (isValid && isValue) {
                addClass([this.inputEle], CHIP_INPUT);
            }
            else {
                removeClass([this.inputEle], CHIP_INPUT);
            }
        }
        else if (this.inputEle.classList.contains(CHIP_INPUT)) {
            removeClass([this.inputEle], CHIP_INPUT);
            if (this.chipWrapper) {
                addClass([this.chipWrapper], HIDEICON);
                removeClass([this.inputWrapper], SHOW_CHIP);
                this.showOrHideValueTemplate(true);
            }
        }
    };
    DropDownTree.prototype.ensurePlaceHolder = function () {
        if (isNOU(this.value) || (this.value !== null && this.value.length === 0)) {
            removeClass([this.inputEle], CHIP_INPUT);
            if (this.chipWrapper) {
                addClass([this.chipWrapper], HIDEICON);
                this.showOrHideValueTemplate(true);
            }
        }
    };
    DropDownTree.prototype.ensureClearIconPosition = function (floatLabelType) {
        if (floatLabelType !== 'Never') {
            this.inputWrapper.insertBefore(this.overAllClear, this.inputObj.buttons[0]);
        }
    };
    DropDownTree.prototype.setMultiSelectValue = function (newValues) {
        var _this = this;
        if (!this.isFilteredData) {
            this.setProperties({ value: this.isFromFilterChange && newValues && newValues.length === 0 ? this.value : newValues }, true);
            this.isFromFilterChange = false;
            if (newValues && newValues.length !== 0 && !this.showCheckBox &&
                !this.ddtCompareValues(this.treeObj.selectedNodes, this.value.slice())) {
                this.treeObj.selectedNodes = this.value.slice();
                this.treeObj.dataBind();
            }
        }
        else {
            var selectedValues = isNOU(this.value) ? [] : this.value;
            selectedValues = selectedValues.filter(function (selectedValue) {
                var nodeData = _this.treeObj.getTreeData(selectedValue);
                if (Array.isArray(nodeData)) {
                    return nodeData.every(function (nodeSelectedData) { return nodeSelectedData.selected; });
                }
                return true;
            });
            for (var i = 0; i < newValues.length; i++) {
                if (isNOU(this.value) || this.value.indexOf(newValues[i]) === -1) {
                    selectedValues.push(newValues[i]);
                }
            }
            this.setProperties({ value: selectedValues }, true);
        }
    };
    DropDownTree.prototype.setMultiSelect = function () {
        if (this.showCheckBox && !this.isDynamicChange) {
            this.setMultiSelectValue(this.treeObj.checkedNodes.slice());
        }
        else {
            var ddtValue = this.allowMultiSelection ? (this.showCheckBox ? this.treeObj.checkedNodes
                : this.treeObj.selectedNodes) : (this.value ? (this.showCheckBox ? this.value : [this.value[0]]) : null);
            this.setMultiSelectValue(ddtValue);
            if (this.showCheckBox && this.value !== null) {
                this.treeObj.checkedNodes = this.value;
                this.treeObj.dataBind();
            }
        }
        this.selectedText = [];
        var checkSelection = this.allowMultiSelection ? true : (this.showCheckBox ? true : false);
        if (this.inputWrapper.contains(this.chipWrapper) && !checkSelection) {
            removeClass([this.inputEle], CHIP_INPUT);
            detach(this.chipWrapper);
        }
        var isValid = this.getValidMode();
        if (isValid && this.value !== null) {
            addClass([this.inputEle], CHIP_INPUT);
            if (this.chipWrapper) {
                removeClass([this.chipWrapper], HIDEICON);
                this.showOrHideValueTemplate(false, true);
            }
        }
        var isValue = this.value ? (this.value.length ? true : false) : false;
        if (this.chipWrapper && (this.mode === 'Box' && !isValue)) {
            addClass([this.chipWrapper], HIDEICON);
            removeClass([this.inputEle], CHIP_INPUT);
            this.showOrHideValueTemplate(true);
        }
        this.updateSelectedValues();
    };
    DropDownTree.prototype.getSelectedData = function (value) {
        var data = null;
        if (this.isFilteredData) {
            for (var i = 0; i < this.selectedData.length; i++) {
                if (getValue(this.treeSettings.loadOnDemand ? this.fields.value : 'id', this.selectedData[i]).toString() === value) {
                    data = this.selectedData[i];
                    break;
                }
            }
        }
        if (isNOU(data)) {
            if (this.treeSettings.loadOnDemand) {
                data = this.getNodeData(value, this.treeItems);
            }
            else {
                data = this.treeObj.getNode(value);
            }
            if (!isNOU(data)) {
                this.selectedData.push(data);
            }
        }
        return data;
    };
    DropDownTree.prototype.getNodeData = function (id, dataSource) {
        var childItems;
        if (isNOU(id)) {
            return childItems;
        }
        else if (this.treeDataType === 1) {
            for (var i = 0, objlen = dataSource.length; i < objlen; i++) {
                var dataId = getValue(this.fields.value, dataSource[i]);
                if (!isNOU(dataSource[i]) && !isNOU(dataId) && dataId.toString() === id) {
                    return dataSource[i];
                }
            }
        }
        else {
            return this.getChildNodeData(dataSource, this.fields, id);
        }
        return childItems;
    };
    DropDownTree.prototype.getChildNodeData = function (obj, mapper, id) {
        var newChildItems;
        if (isNOU(obj)) {
            return newChildItems;
        }
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            var dataValue = getValue(mapper.value, obj[i]);
            if (obj[i] && dataValue && dataValue.toString() === id) {
                return obj[i];
            }
            else if (typeof mapper.child === 'string' && !isNOU(getValue(mapper.child, obj[i]))) {
                var childNodeData = getValue(mapper.child, obj[i]);
                newChildItems = this.getChildNodeData(childNodeData, this.getChildMapperFields(mapper), id);
                if (newChildItems !== undefined) {
                    break;
                }
            }
            else if (this.fields.dataSource instanceof DataManager && !isNOU(getValue('child', obj[i]))) {
                var child = 'child';
                newChildItems = this.getChildNodeData(getValue(child, obj[i]), this.getChildMapperFields(mapper), id);
                if (newChildItems !== undefined) {
                    break;
                }
            }
        }
        return newChildItems;
    };
    DropDownTree.prototype.getChildMapperFields = function (mapper) {
        return (typeof mapper.child === 'string' || isNOU(mapper.child)) ? mapper : mapper.child;
    };
    DropDownTree.prototype.removeSelectedData = function (value, muteOnChange) {
        var selectedValues = isNOU(this.value) ? [] : this.value.slice();
        selectedValues.splice(selectedValues.indexOf(value), 1);
        this.setProperties({ value: selectedValues }, muteOnChange);
        for (var i = 0; i < this.selectedData.length; i++) {
            if (getValue(this.treeSettings.loadOnDemand ? this.fields.value : 'id', this.selectedData[i]).toString() === value) {
                this.selectedData.splice(i, 1);
                break;
            }
        }
    };
    DropDownTree.prototype.initializeValueTemplate = function () {
        if (!this.valueTemplate) {
            return null;
        }
        if (this.valueTemplateContainer) {
            while (this.valueTemplateContainer.firstChild) {
                this.valueTemplateContainer.removeChild(this.valueTemplateContainer.firstChild);
            }
        }
        else {
            this.valueTemplateContainer = this.createElement('span', { className: OVERFLOW_VIEW + ' ' + SHOW_TEXT + ' ' + 'e-input-value' + ' ' + HIDEICON });
        }
        this.inputWrapper.insertBefore(this.valueTemplateContainer, this.inputEle);
        return this.templateComplier(this.valueTemplate);
    };
    DropDownTree.prototype.showOrHideValueTemplate = function (show, showChip) {
        if (showChip === void 0) { showChip = false; }
        if (!this.valueTemplateContainer || this.mode === 'Box') {
            return;
        }
        if (show) {
            removeClass([this.valueTemplateContainer], HIDEICON);
            addClass([this.inputWrapper], SHOW_CHIP);
            addClass([this.inputEle], CHIP_INPUT);
        }
        else {
            addClass([this.valueTemplateContainer], HIDEICON);
            if (!showChip) {
                removeClass([this.inputWrapper], SHOW_CHIP);
                removeClass([this.inputEle], CHIP_INPUT);
            }
        }
    };
    DropDownTree.prototype.updateSelectedValues = function () {
        var _this = this;
        this.dataValue = '';
        var temp;
        var text;
        var textValue = '';
        var selectedData;
        this.hiddenElement.innerHTML = '';
        var hiddenInputValue = '';
        if ((!this.isChipDelete || this.treeSettings.autoCheck) && (this.inputWrapper.contains(this.chipWrapper))) {
            this.chipCollection.innerHTML = '';
        }
        if (!this.isFilteredData) {
            this.selectedData = [];
        }
        if (!isNOU(this.value)) {
            var compiledString = this.initializeValueTemplate();
            for (var i = 0, len = this.value.length; i < len; i++) {
                selectedData = this.getSelectedData(this.value[i]);
                text = getValue(this.treeSettings.loadOnDemand ? this.fields.text : 'text', selectedData);
                this.selectedText.push(text);
                temp = this.selectedText[this.selectedText.length - 1];
                if (this.selectedText.length > 1) {
                    this.dataValue += (this.delimiterChar + ' ' + temp);
                    textValue += (',' + temp);
                }
                else {
                    this.dataValue += temp;
                    textValue += temp;
                }
                if (this.mode !== 'Custom' && this.mode !== 'Delimiter' && (!this.isChipDelete || this.treeSettings.autoCheck) &&
                    (this.allowMultiSelection || this.showCheckBox)) {
                    this.setChipValues(temp, this.value[i]);
                }
                hiddenInputValue += '<option selected value ="' + this.value[i] + '">' +
                    this.selectedText[this.selectedText.length - 1] + '</option>';
                if (this.valueTemplate) {
                    this.getValueTemplateElement(this.value[i], compiledString);
                }
            }
            if (this.hasTemplate && this.portals) {
                if (this.treeObj.portals) {
                    this.portals = this.portals.concat(this.treeObj.portals.filter(function (item) {
                        return !_this.portals.includes(item);
                    }));
                }
                if (this.isReact) {
                    this.renderReactTemplates(this.reactCallBack);
                }
            }
            if (this.selectedText.length >= 1) {
                this.setProperties({ text: textValue }, true);
            }
            this.hiddenElement.innerHTML = hiddenInputValue;
            if (this.mode === 'Custom' && (this.allowMultiSelection || this.showCheckBox)) {
                this.setTagValues();
            }
        }
        var isValid = this.getValidMode();
        if (this.mode !== 'Custom' && this.mode !== 'Box' && (this.allowMultiSelection || this.showCheckBox) && !isValid) {
            if (this.chipWrapper) {
                addClass([this.chipWrapper], HIDEICON);
                removeClass([this.inputWrapper], SHOW_CHIP);
            }
            this.showOrHideValueTemplate(true);
        }
        Input.setValue(this.dataValue, this.inputEle, this.floatLabelType);
        if (textValue === '') {
            this.setProperties({ text: null }, true);
        }
        else {
            this.setProperties({ text: textValue }, true);
        }
        if (this.showClearButton && this.inputFocus) {
            this.showOverAllClear();
        }
        if ((this.allowMultiSelection || this.showCheckBox) && this.popupObj) {
            this.popupObj.refreshPosition();
        }
        this.currentText = this.text;
        this.currentValue = this.value;
        if (!isNOU(this.value) && this.value.length > 0 && !isNOU(this.currentText)) {
            this.inputWrapper.setAttribute('aria-label', this.currentText.replace(/,/g, ', '));
        }
        else {
            this.inputWrapper.setAttribute('aria-label', this.getModuleName());
        }
    };
    DropDownTree.prototype.setChipValues = function (text, value) {
        if (!this.inputWrapper.contains(this.chipWrapper)) {
            this.createChip();
        }
        var chip = this.createElement('span', {
            className: CHIP,
            attrs: { 'data-value': value }
        });
        var chipContent = this.createElement('span', { className: CHIP_CONTENT });
        var chipClose = this.createElement('span', { className: CHIP_CLOSE + ' ' + ICONS });
        if (this.enableHtmlSanitizer) {
            chipContent.innerText = SanitizeHtmlHelper.sanitize(text);
        }
        else {
            chipContent.innerHTML = text;
        }
        chip.appendChild(chipContent);
        this.chipCollection.appendChild(chip);
        if (this.showClearButton) {
            chip.appendChild(chipClose);
            EventHandler.add(chipClose, 'mouseup', this.removeChip, this);
        }
    };
    DropDownTree.prototype.setTagValues = function () {
        if (this.value === null || this.text == null || this.value.length === 0) {
            if (this.inputWrapper.contains(this.chipWrapper)) {
                addClass([this.chipWrapper], HIDEICON);
            }
            return;
        }
        if (!this.inputWrapper.contains(this.chipWrapper)) {
            this.createChip();
        }
        if (!this.inputWrapper.classList.contains(SHOW_CHIP)) {
            addClass([this.inputWrapper], SHOW_CHIP);
        }
        var chip = this.createElement('span', {
            className: CHIP
        });
        if (!this.inputEle.classList.contains(CHIP_INPUT)) {
            addClass([this.inputEle], CHIP_INPUT);
        }
        if (this.chipWrapper.classList.contains(HIDEICON)) {
            removeClass([this.chipWrapper], HIDEICON);
            this.showOrHideValueTemplate(false, true);
        }
        var chipContent = this.createElement('span', { className: CHIP_CONTENT });
        var template = this.customTemplate;
        var templateId = this.customTemplateId;
        var templatestring = 'customTemplate';
        var compiledString = this.templateComplier(template);
        var tempArr = compiledString({ 'value': this.value, 'text': this.text }, this, templatestring, templateId, this.isStringTemplate, undefined, chipContent);
        if (tempArr) {
            tempArr = Array.prototype.slice.call(tempArr);
            append(tempArr, chipContent);
        }
        chip.appendChild(chipContent);
        this.chipCollection.appendChild(chip);
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    DropDownTree.prototype.setSelectAllWrapper = function (state) {
        if (this.isFirstRender) {
            return;
        }
        if (state && !this.popupEle.contains(this.checkAllParent) && this.showCheckBox) {
            this.createSelectAllWrapper();
            this.popupEle.insertBefore(this.checkAllParent, this.popupDiv);
        }
        else if (this.popupEle.contains(this.checkAllParent)) {
            detach(this.checkAllParent);
            this.checkAllParent = null;
        }
    };
    DropDownTree.prototype.setHeaderTemplate = function () {
        if (this.header) {
            this.header.innerHTML = '';
        }
        else {
            this.header = this.createElement('div');
            addClass([this.header], HEADER);
        }
        var compiledString = this.templateComplier(this.headerTemplate);
        var tempArr = compiledString({}, this, 'headerTemplate', this.headerTemplateId, this.isStringTemplate, undefined, this.header);
        if (tempArr) {
            tempArr = Array.prototype.slice.call(tempArr);
            append(tempArr, this.header);
        }
        this.popupEle.insertBefore(this.header, this.checkAllParent ? this.checkAllParent : this.popupDiv);
    };
    DropDownTree.prototype.templateComplier = function (template) {
        if (template) {
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (e) {
                return compile(template);
            }
        }
        return compile(template);
    };
    DropDownTree.prototype.setFooterTemplate = function () {
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
            addClass([this.footer], FOOTER);
        }
        var compiledString = this.templateComplier(this.footerTemplate);
        var tempArr = compiledString({}, this, 'footerTemplate', this.footerTemplateId, this.isStringTemplate, undefined, this.footer);
        if (tempArr) {
            tempArr = Array.prototype.slice.call(tempArr);
            append(tempArr, this.footer);
        }
        append([this.footer], this.popupEle);
    };
    DropDownTree.prototype.clearAll = function (e) {
        if (!this.enabled || this.readonly) {
            return;
        }
        this.resetValue();
        this.showOverAllClear();
        if ((this.allowMultiSelection || this.showCheckBox)) {
            if (this.popupObj) {
                this.popupObj.refreshPosition();
            }
            if (!this.wrapText) {
                this.updateOverflowWrapper(true);
            }
        }
        if (e) {
            this.isClearButtonClick = true;
        }
        if (!this.changeOnBlur) {
            this.triggerChangeEvent(e);
        }
    };
    DropDownTree.prototype.removeChip = function (e) {
        if (!this.enabled || this.readonly) {
            return;
        }
        if (e.target.classList.contains('e-chips-close') && !this.isPopupOpen) {
            e.stopPropagation();
            e.preventDefault();
        }
        var element = e.target.parentElement;
        var value = element.getAttribute('data-value');
        if (this.chipCollection) {
            if (element) {
                remove(element);
            }
        }
        this.isChipDelete = true;
        this.isClearButtonClick = true;
        this.removeSelectedData(value, true);
        this.selectedText = [];
        if (this.allowMultiSelection) {
            this.treeObj.selectedNodes = this.value.slice();
            this.updateSelectedValues();
        }
        if (this.showCheckBox) {
            this.treeObj.uncheckAll([value]);
            this.clearCheckAll();
            this.setMultiSelect();
        }
        this.triggerChangeEvent(e);
        this.isChipDelete = false;
        this.ensurePlaceHolder();
    };
    DropDownTree.prototype.resetValue = function (isDynamicChange) {
        if (Array.isArray(this.value) && this.value.length === 0 && this.text == null) {
            return;
        }
        Input.setValue(null, this.inputEle, this.floatLabelType);
        if (!isDynamicChange) {
            this.setOldValue();
            this.setProperties({ value: [] }, true);
            this.showOrHideValueTemplate(false);
        }
        if (isNOU(this.value) || this.value.length === 0) {
            this.inputWrapper.setAttribute('aria-label', this.getModuleName());
        }
        this.dataValue = null;
        this.setProperties({ text: null }, true);
        this.selectedData = [];
        setValue('selectedNodes', [], this.treeObj);
        this.hiddenElement.innerHTML = '';
        if (this.showCheckBox) {
            this.treeObj.uncheckAll();
            this.setMultiSelect();
            this.clearCheckAll();
        }
        if (this.oldValue === null && !isDynamicChange) {
            this.removeValue = true;
        }
        else if (isDynamicChange) {
            this.triggerChangeEvent();
        }
        if ((this.allowMultiSelection || this.showCheckBox) && this.chipWrapper) {
            this.chipCollection.innerHTML = '';
            if (!this.wrapText) {
                this.updateOverflowWrapper(true);
            }
            this.ensurePlaceHolder();
        }
    };
    DropDownTree.prototype.clearCheckAll = function () {
        if (this.showSelectAll && this.value && this.value.length === 0) {
            this.setLocale(false);
        }
    };
    DropDownTree.prototype.setOldValue = function () {
        this.oldValue = Array.isArray(this.value) ? this.value.slice() : this.value;
    };
    DropDownTree.prototype.selectAllItems = function (state) {
        if (this.showCheckBox) {
            if (state) {
                this.isCheckAllCalled = true;
                this.treeObj.checkAll();
            }
            else {
                this.treeObj.uncheckAll();
            }
            this.checkSelectAll = state;
        }
        else if (this.allowMultiSelection) {
            if (!state) {
                this.treeObj.selectedNodes = [];
            }
            else {
                var li = selectAll('li', this.treeObj.element);
                var id = void 0;
                var arr = [];
                for (var i = 0; i < li.length; i++) {
                    id = li[i].getAttribute('data-uid').toString();
                    arr.push(id);
                }
                this.treeObj.selectedNodes = arr;
            }
        }
        this.updateMode();
        this.setMultiSelect();
        if (!this.wrapText) {
            if (state) {
                this.updateView();
            }
            else {
                this.updateOverflowWrapper(true);
            }
        }
    };
    DropDownTree.prototype.updateTreeSettings = function (prop) {
        if (prop === 'autoCheck') {
            this.treeObj.autoCheck = this.treeSettings.autoCheck;
        }
        else if (prop === 'loadOnDemand') {
            this.treeObj.loadOnDemand = this.treeSettings.loadOnDemand;
        }
        else if (prop === 'expandOn') {
            this.treeObj.expandOn = this.treeSettings.expandOn;
            this.treeObj.dataBind();
            return;
        }
        else if (prop === 'checkDisabledChildren') {
            this.treeObj.checkDisabledChildren = this.treeSettings.checkDisabledChildren;
        }
        this.treeObj.dataBind();
        this.setMultiSelect();
        this.updateValue(this.value);
    };
    DropDownTree.prototype.updateCheckBoxState = function (checkBox) {
        if (this.hasTemplate) {
            this.updateTemplate();
        }
        if (!this.wrapText) {
            this.updateOverflowWrapper(false);
        }
        this.treeObj.showCheckBox = checkBox;
        this.treeObj.dataBind();
        this.isDynamicChange = true;
        this.setSelectAllWrapper(this.showSelectAll);
        if (this.showSelectAll) {
            this.setLocale();
        }
        if (this.showCheckBox) {
            this.updateMode();
        }
        this.setMultiSelect();
        this.isDynamicChange = false;
    };
    DropDownTree.prototype.updateTemplate = function () {
        if (this.popupObj) {
            this.clearTemplate();
            this.portals = [];
            this.popupObj.destroy();
            if (this.isPopupOpen) {
                this.hidePopup();
                this.isFirstRender = true;
                this.renderPopup();
            }
            else {
                this.isFirstRender = true;
            }
        }
    };
    DropDownTree.prototype.l10nUpdate = function (actionFailure) {
        if (this.noRecord) {
            this.noRecord.innerHTML = '';
        }
        else {
            this.noRecord = this.createElement('div');
        }
        if (this.noRecordsTemplate !== 'No Records Found' || this.actionFailureTemplate !== 'The Request Failed') {
            var template = actionFailure ? this.actionFailureTemplate : this.noRecordsTemplate;
            var templateId = actionFailure ? this.actionFailureTemplateId : this.noRecordsTemplateId;
            var templatestring = actionFailure ? 'actionFailureTemplate' : 'noRecordsTemplate';
            var compiledString = this.templateComplier(template);
            var tempArr = compiledString({}, this, templatestring, templateId, this.isStringTemplate, undefined, this.noRecord);
            if (tempArr) {
                tempArr = Array.prototype.slice.call(tempArr);
                append(tempArr, this.noRecord);
            }
        }
        else {
            var l10nLocale = { noRecordsTemplate: 'No Records Found', actionFailureTemplate: 'The Request Failed' };
            this.l10n = new L10n(this.getLocaleName(), l10nLocale, this.locale);
            this.noRecord.innerHTML = actionFailure ?
                this.l10n.getConstant('actionFailureTemplate') : this.l10n.getConstant('noRecordsTemplate');
        }
        addClass([this.noRecord], NODATACONTAINER);
        prepend([this.noRecord], this.popupDiv);
        if (this.treeObj) {
            this.treeObj.element.removeAttribute('aria-activedescendant');
        }
    };
    DropDownTree.prototype.updateRecordTemplate = function (action) {
        if (this.treeItems && this.treeItems.length <= 0) {
            this.l10nUpdate(action);
            if (this.hasTemplate) {
                this.updateTemplate();
            }
        }
    };
    DropDownTree.prototype.updateOverflowWrapper = function (state) {
        if (!state) {
            if (!this.inputWrapper.contains(this.overFlowWrapper)) {
                this.overFlowWrapper = this.createElement('span', { className: OVERFLOW_VIEW + ' ' + HIDEICON });
                this.inputWrapper.insertBefore(this.overFlowWrapper, this.hiddenElement);
            }
        }
        else if (this.inputWrapper.contains(this.overFlowWrapper) && state) {
            this.overFlowWrapper.innerHTML = '';
        }
    };
    DropDownTree.prototype.updateMultiSelection = function (state) {
        if (!this.wrapText) {
            this.updateOverflowWrapper(false);
        }
        this.treeObj.allowMultiSelection = state;
        this.treeObj.dataBind();
        this.updateOption();
        if (this.allowMultiSelection) {
            this.updateMode();
        }
        this.setMultiSelect();
    };
    DropDownTree.prototype.updateAllowFiltering = function (state) {
        if (!this.isFirstRender) {
            if (state) {
                this.renderFilter();
            }
            else {
                this.destroyFilter();
            }
        }
    };
    DropDownTree.prototype.updateFilterPlaceHolder = function () {
        if (this.filterObj) {
            this.filterObj.placeholder = this.filterBarPlaceholder;
            this.filterObj.element.setAttribute('aria-label', this.filterBarPlaceholder);
        }
    };
    DropDownTree.prototype.updateValue = function (value) {
        this.isDynamicChange = true;
        if (isNOU(value) || value.length === 0) {
            this.resetValue(true);
        }
        else {
            this.setTreeValue();
            if ((this.allowMultiSelection || this.showCheckBox) && !this.wrapText) {
                this.updateOverflowWrapper(false);
                this.updateView();
            }
        }
        this.updateHiddenValue();
        this.isDynamicChange = false;
    };
    DropDownTree.prototype.updateText = function (text) {
        if (isNOU(text)) {
            this.resetValue();
        }
        else {
            this.setTreeText();
            if ((this.allowMultiSelection || this.showCheckBox) && !this.wrapText) {
                this.updateOverflowWrapper(false);
                this.updateView();
            }
        }
        this.updateHiddenValue();
    };
    DropDownTree.prototype.updateModelMode = function () {
        var validMode = this.allowMultiSelection ? true : (this.showCheckBox ? true : false);
        if (!validMode) {
            return;
        }
        if (!this.wrapText) {
            var overFlow = select('.e-overflow:not(.e-input-value)', this.inputWrapper);
            if (overFlow) {
                overFlow.innerHTML = '';
            }
        }
        this.updateMode();
        this.setMultiSelect();
        if (!this.wrapText && (this.value && this.value.length !== 0)) {
            this.updateOverFlowView();
            addClass([this.inputEle], CHIP_INPUT);
            if (this.mode === 'Box') {
                removeClass([this.overFlowWrapper, this.inputWrapper], SHOW_TEXT);
            }
            else {
                addClass([this.overFlowWrapper, this.inputWrapper], SHOW_TEXT);
            }
        }
    };
    DropDownTree.prototype.updateOption = function () {
        if (!this.hiddenElement.hasAttribute('multiple') && (this.allowMultiSelection || this.showCheckBox)) {
            this.hiddenElement.setAttribute('multiple', '');
        }
        else if (this.hiddenElement.hasAttribute('multiple') && (!this.allowMultiSelection && !this.showCheckBox)) {
            this.hiddenElement.removeAttribute('multiple');
        }
    };
    /**
     * Dynamically change the value of properties.
     *
     * @param {DropDownTreeModel} newProp - specifies the newProp value.
     * @param {DropDownTreeModel} oldProp - specifies the newProp value.
     * @returns {void}
     * @private
     */
    DropDownTree.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                    this.setElementWidth(newProp.width);
                    if (this.popupObj) {
                        this.popupObj.element.style.width = this.setWidth();
                    }
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.inputEle);
                    break;
                case 'cssClass':
                    this.setCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'enableRtl':
                    this.setEnableRTL(this.enableRtl);
                    break;
                case 'fields':
                    this.setFields();
                    break;
                case 'readonly':
                    Input.setReadonly(newProp.readonly, this.inputEle);
                    break;
                case 'enabled':
                    this.setEnable();
                    break;
                case 'floatLabelType':
                    Input.removeFloating(this.inputObj);
                    Input.addFloating(this.inputEle, newProp.floatLabelType, this.placeholder, this.createElement);
                    this.ensureClearIconPosition(newProp.floatLabelType);
                    break;
                case 'showClearButton':
                    this.updateClearButton(newProp.showClearButton);
                    break;
                case 'allowFiltering':
                    this.updateAllowFiltering(newProp.allowFiltering);
                    break;
                case 'filterBarPlaceholder':
                    this.updateFilterPlaceHolder();
                    break;
                case 'value':
                    if (JSON.stringify(oldProp.value) !== JSON.stringify(newProp.value)) {
                        this.oldValue = oldProp.value;
                        this.updateValue(newProp.value);
                    }
                    break;
                case 'text':
                    this.updateText(newProp.text);
                    break;
                case 'allowMultiSelection':
                    this.updateMultiSelection(newProp.allowMultiSelection);
                    break;
                case 'mode':
                    if (!this.showCheckBox && !this.allowMultiSelection) {
                        return;
                    }
                    if (this.mode === 'Custom') {
                        if (this.overFlowWrapper) {
                            detach(this.overFlowWrapper);
                        }
                        if (this.chipWrapper) {
                            detach(this.chipWrapper);
                        }
                        this.setTagValues();
                    }
                    else {
                        if (oldProp.mode === 'Custom') {
                            this.updateOverflowWrapper(this.wrapText);
                        }
                        this.updateModelMode();
                    }
                    break;
                case 'delimiterChar':
                    if (this.mode === 'Box') {
                        return;
                    }
                    if (this.showCheckBox || this.allowMultiSelection) {
                        this.setMultiSelect();
                    }
                    break;
                case 'selectAllText':
                    if (this.showCheckBox && this.showSelectAll) {
                        this.setLocale();
                    }
                    break;
                case 'unSelectAllText':
                    if (this.showCheckBox && this.showSelectAll) {
                        this.setLocale(false);
                    }
                    break;
                case 'showSelectAll':
                    if (this.showCheckBox) {
                        this.setSelectAllWrapper(newProp.showSelectAll);
                        this.updatePopupHeight();
                    }
                    break;
                case 'showCheckBox':
                    this.updateCheckBoxState(newProp.showCheckBox);
                    if (!this.wrapText) {
                        this.updateOverflowWrapper(true);
                    }
                    this.updatePopupHeight();
                    this.updateOption();
                    break;
                case 'treeSettings':
                    for (var _b = 0, _c = Object.keys(newProp.treeSettings); _b < _c.length; _b++) {
                        var prop_1 = _c[_b];
                        this.updateTreeSettings(prop_1);
                    }
                    break;
                case 'customTemplate':
                    if (this.mode !== 'Custom') {
                        return;
                    }
                    this.chipCollection.innerHTML = '';
                    this.setTagValues();
                    break;
                case 'sortOrder':
                    if (this.hasTemplate) {
                        this.updateTemplate();
                    }
                    this.treeObj.sortOrder = newProp.sortOrder;
                    this.treeObj.dataBind();
                    this.updateValue(this.value);
                    break;
                case 'showDropDownIcon':
                    this.updateDropDownIconState(newProp.showDropDownIcon);
                    break;
                case 'popupWidth':
                    if (this.popupObj) {
                        this.popupObj.element.style.width = this.setWidth();
                    }
                    break;
                case 'popupHeight':
                    if (this.popupObj) {
                        this.updatePopupHeight();
                    }
                    break;
                case 'zIndex':
                    if (this.popupObj) {
                        this.popupObj.zIndex = newProp.zIndex;
                        this.popupObj.dataBind();
                    }
                    break;
                case 'headerTemplate':
                    this.updateTemplate();
                    break;
                case 'footerTemplate':
                    this.updateTemplate();
                    break;
                case 'itemTemplate':
                    this.updateTemplate();
                    this.treeObj.nodeTemplate = newProp.itemTemplate;
                    this.treeObj.dataBind();
                    break;
                case 'noRecordsTemplate':
                    this.updateRecordTemplate();
                    break;
                case 'actionFailureTemplate':
                    this.updateRecordTemplate(true);
                    break;
                case 'htmlAttributes':
                    this.setHTMLAttributes();
                    break;
                case 'wrapText':
                    this.updateOverflowWrapper(this.wrapText);
                    if ((this.allowMultiSelection || this.showCheckBox) && !this.wrapText) {
                        this.updateView();
                    }
                    else {
                        addClass([this.overFlowWrapper], HIDEICON);
                        if (this.chipWrapper && this.mode === 'Box') {
                            removeClass([this.chipWrapper], HIDEICON);
                        }
                        else {
                            removeClass([this.inputWrapper], SHOW_CHIP);
                            removeClass([this.inputEle], CHIP_INPUT);
                        }
                        this.ensurePlaceHolder();
                    }
                    break;
            }
        }
    };
    /**
     * Allows you to clear the selected values from the Dropdown Tree component.
     *
     * @method clear
     * @returns {void}
     */
    DropDownTree.prototype.clear = function () {
        this.clearAll();
        if (this.inputFocus) {
            this.onFocusOut();
        }
        else {
            if (this.changeOnBlur) {
                this.triggerChangeEvent();
            }
            this.removeValue = false;
        }
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers. Also, it removes the attributes and classes.
     *
     * @method destroy
     * @returns {void}
     */
    DropDownTree.prototype.destroy = function () {
        this.clearTemplate();
        this.unWireEvents();
        this.setCssClass(null, this.cssClass);
        this.setProperties({ text: null }, true);
        this.treeObj.destroy();
        this.destroyFilter();
        if (this.popupObj) {
            this.popupObj.destroy();
            detach(this.popupObj.element);
        }
        if (this.element.tagName !== this.getDirective()) {
            this.inputWrapper.parentElement.insertBefore(this.element, this.inputWrapper);
        }
        Input.setValue(null, this.inputEle, this.floatLabelType);
        detach(this.inputWrapper);
        detach(this.popupDiv);
        detach(this.hiddenElement);
        Input.setRipple(false, [this.inputObj]);
        this.element.classList.remove('e-input');
        if (this.showCheckBox || this.allowMultiSelection || (this.value && this.valueTemplateContainer)) {
            this.element.classList.remove(CHIP_INPUT);
        }
        detach(this.inputObj.container);
        if (this.inputObj.buttons.length) {
            detach(this.inputObj.buttons[0]);
        }
        this.inputObj = null;
        while (this.hiddenElement.options.length > 0) {
            this.hiddenElement.remove(0);
        }
        this.hiddenElement.innerHTML = '';
        this.hiddenElement = null;
        this.inputWrapper.innerHTML = '';
        this.inputWrapper = null;
        this.popupDiv = null;
        this.tree = null;
        this.popupObj = null;
        this.treeObj = null;
        this.overAllClear = null;
        if (this.chipCollection) {
            var chipsIcons = selectAll('.e-chips-close', this.chipCollection);
            for (var _i = 0, chipsIcons_1 = chipsIcons; _i < chipsIcons_1.length; _i++) {
                var element = chipsIcons_1[_i];
                EventHandler.remove(element, 'mouseup', this.removeChip);
            }
        }
        this.chipWrapper = null;
        this.chipCollection = null;
        this.checkAllParent = null;
        this.selectAllSpan = null;
        this.checkBoxElement = null;
        this.checkWrapper = null;
        this.popupEle = null;
        this.header = null;
        this.footer = null;
        this.overFlowWrapper = null;
        this.keyboardModule = null;
        _super.prototype.destroy.call(this);
        this.setProperties({ value: [] }, true);
    };
    DropDownTree.prototype.destroyFilter = function () {
        if (this.filterObj) {
            this.filterObj.destroy();
            detach(this.filterObj.element);
            detach(this.filterContainer);
            this.filterObj = null;
        }
    };
    DropDownTree.prototype.destroyPopup = function () {
        this.isPopupOpen = false;
        if (this.isReact) {
            this.clearTemplate(['headerTemplate', 'footerTemplate', 'itemTemplate', 'actionFailureTemplate',
                'noRecordsTemplate']);
        }
        if (this.popupObj) {
            this.popupObj.destroy();
            detach(this.popupObj.element);
        }
    };
    /**
     * Ensures visibility of the Dropdown Tree item by using item value or item element.
     * If many Dropdown Tree items are present, and we are in need to find a particular item, then the `ensureVisible` property
     * helps you to bring the item to visibility by expanding the Dropdown Tree and scrolling to the specific item.
     *
     * @param  {string | Element} item - Specifies the value of Dropdown Tree item/ Dropdown Tree item element.
     * @returns {void}
     */
    DropDownTree.prototype.ensureVisible = function (item) {
        this.treeObj.ensureVisible(item);
    };
    /**
     * To get the updated data source of the Dropdown Tree.
     *
     * @param  {string | Element} item - Specifies the value of Dropdown Tree item/ Dropdown Tree item element
     * @returns {'{[key: string]: Object }[]'} - returns the updated data source of the Dropdown Tree.
     */
    DropDownTree.prototype.getData = function (item) {
        return this.treeObj.getTreeData(item);
    };
    /**
     * Close the Dropdown tree pop-up.
     *
     * @returns {void}
     */
    DropDownTree.prototype.hidePopup = function () {
        var eventArgs = { popup: this.popupObj, cancel: false };
        this.trigger('close', eventArgs);
        if (eventArgs.cancel) {
            return;
        }
        this.inputWrapper.classList.remove(ICONANIMATION);
        if (this.popupEle) {
            addClass([this.popupEle], DDTHIDEICON);
        }
        attributes(this.inputEle, { 'aria-expanded': 'false' });
        if (this.popupObj && this.isPopupOpen) {
            this.popupObj.hide();
            if (this.inputFocus) {
                this.inputWrapper.focus();
                if (this.allowFiltering) {
                    addClass([this.inputWrapper], [INPUTFOCUS]);
                }
            }
            if (this.isFilteredData) {
                this.treeObj['treeData'] = this.treeData;
            }
            if (this.destroyPopupOnHide) {
                this.isFirstRender = true;
                this.destroyPopup();
            }
        }
    };
    /**
     * Based on the state parameter, entire list item will be selected or deselected.
     *
     * @param {boolean} state - Unselects/Selects entire Dropdown Tree items.
     * @returns {void}
     *
     */
    DropDownTree.prototype.selectAll = function (state) {
        this.selectAllItems(state);
    };
    /**
     * Opens the popup that displays the Dropdown Tree items.
     *
     * @returns {void}
     */
    DropDownTree.prototype.showPopup = function () {
        if (!this.enabled || this.readonly || this.isPopupOpen) {
            return;
        }
        this.renderPopup();
        this.focusIn();
    };
    /**
     * Return the module name.
     *
     * @private
     * @returns {string} - returns the module name.
     */
    DropDownTree.prototype.getModuleName = function () {
        return 'dropdowntree';
    };
    __decorate([
        Property('The Request Failed')
    ], DropDownTree.prototype, "actionFailureTemplate", void 0);
    __decorate([
        Property(false)
    ], DropDownTree.prototype, "allowFiltering", void 0);
    __decorate([
        Property(false)
    ], DropDownTree.prototype, "allowMultiSelection", void 0);
    __decorate([
        Property(true)
    ], DropDownTree.prototype, "changeOnBlur", void 0);
    __decorate([
        Property('')
    ], DropDownTree.prototype, "cssClass", void 0);
    __decorate([
        Property('${value.length} item(s) selected')
    ], DropDownTree.prototype, "customTemplate", void 0);
    __decorate([
        Property(',')
    ], DropDownTree.prototype, "delimiterChar", void 0);
    __decorate([
        Property(true)
    ], DropDownTree.prototype, "enabled", void 0);
    __decorate([
        Complex({}, Fields)
    ], DropDownTree.prototype, "fields", void 0);
    __decorate([
        Property(null)
    ], DropDownTree.prototype, "filterBarPlaceholder", void 0);
    __decorate([
        Property('StartsWith')
    ], DropDownTree.prototype, "filterType", void 0);
    __decorate([
        Property('Never')
    ], DropDownTree.prototype, "floatLabelType", void 0);
    __decorate([
        Property(null)
    ], DropDownTree.prototype, "footerTemplate", void 0);
    __decorate([
        Property(false)
    ], DropDownTree.prototype, "ignoreAccent", void 0);
    __decorate([
        Property(true)
    ], DropDownTree.prototype, "ignoreCase", void 0);
    __decorate([
        Property(null)
    ], DropDownTree.prototype, "headerTemplate", void 0);
    __decorate([
        Property({})
    ], DropDownTree.prototype, "htmlAttributes", void 0);
    __decorate([
        Property(null)
    ], DropDownTree.prototype, "itemTemplate", void 0);
    __decorate([
        Property('Default')
    ], DropDownTree.prototype, "mode", void 0);
    __decorate([
        Property('No Records Found')
    ], DropDownTree.prototype, "noRecordsTemplate", void 0);
    __decorate([
        Property(null)
    ], DropDownTree.prototype, "placeholder", void 0);
    __decorate([
        Property('300px')
    ], DropDownTree.prototype, "popupHeight", void 0);
    __decorate([
        Property('100%')
    ], DropDownTree.prototype, "popupWidth", void 0);
    __decorate([
        Property(false)
    ], DropDownTree.prototype, "readonly", void 0);
    __decorate([
        Property(false)
    ], DropDownTree.prototype, "showSelectAll", void 0);
    __decorate([
        Property('Select All')
    ], DropDownTree.prototype, "selectAllText", void 0);
    __decorate([
        Property(false)
    ], DropDownTree.prototype, "showCheckBox", void 0);
    __decorate([
        Property(true)
    ], DropDownTree.prototype, "destroyPopupOnHide", void 0);
    __decorate([
        Property(true)
    ], DropDownTree.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(true)
    ], DropDownTree.prototype, "showClearButton", void 0);
    __decorate([
        Property(true)
    ], DropDownTree.prototype, "showDropDownIcon", void 0);
    __decorate([
        Property('None')
    ], DropDownTree.prototype, "sortOrder", void 0);
    __decorate([
        Property(null)
    ], DropDownTree.prototype, "text", void 0);
    __decorate([
        Complex({}, TreeSettings)
    ], DropDownTree.prototype, "treeSettings", void 0);
    __decorate([
        Property('Unselect All')
    ], DropDownTree.prototype, "unSelectAllText", void 0);
    __decorate([
        Property(null)
    ], DropDownTree.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], DropDownTree.prototype, "valueTemplate", void 0);
    __decorate([
        Property('100%')
    ], DropDownTree.prototype, "width", void 0);
    __decorate([
        Property(1000)
    ], DropDownTree.prototype, "zIndex", void 0);
    __decorate([
        Property(false)
    ], DropDownTree.prototype, "wrapText", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "change", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "close", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "blur", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "created", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "filtering", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "focus", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "keyPress", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "open", void 0);
    __decorate([
        Event()
    ], DropDownTree.prototype, "select", void 0);
    DropDownTree = __decorate([
        NotifyPropertyChanges
    ], DropDownTree);
    return DropDownTree;
}(Component));
export { DropDownTree };
