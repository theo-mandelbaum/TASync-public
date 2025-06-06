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
import { Component, isUndefined, Browser, compile, isNullOrUndefined, SanitizeHtmlHelper, animationMode } from '@syncfusion/ej2-base';
import { Property, NotifyPropertyChanges, ChildProperty, Complex } from '@syncfusion/ej2-base';
import { Event, EventHandler, KeyboardEvents } from '@syncfusion/ej2-base';
import { rippleEffect, Animation, remove } from '@syncfusion/ej2-base';
import { Draggable, Droppable } from '@syncfusion/ej2-base';
import { getElement } from '@syncfusion/ej2-base';
import { addClass, removeClass, closest, matches, detach, select, selectAll, isVisible, append } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { isNullOrUndefined as isNOU, Touch, getValue, setValue, extend, merge, attributes } from '@syncfusion/ej2-base';
import { ListBase } from '@syncfusion/ej2-lists';
import { createCheckBox, rippleMouseHandler } from '@syncfusion/ej2-buttons';
import { Input } from '@syncfusion/ej2-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
var ROOT = 'e-treeview';
var CONTROL = 'e-control';
var COLLAPSIBLE = 'e-icon-collapsible';
var EXPANDABLE = 'e-icon-expandable';
var LISTITEM = 'e-list-item';
var LISTTEXT = 'e-list-text';
var LISTWRAP = 'e-text-wrap';
var IELISTWRAP = 'e-ie-wrap';
var PARENTITEM = 'e-list-parent';
var HOVER = 'e-hover';
var ACTIVE = 'e-active';
var LOAD = 'e-icons-spinner';
var PROCESS = 'e-process';
var ICON = 'e-icons';
var TEXTWRAP = 'e-text-content';
var INPUT = 'e-input';
var INPUTGROUP = 'e-input-group';
var TREEINPUT = 'e-tree-input';
var EDITING = 'e-editing';
var RTL = 'e-rtl';
var INTERACTION = 'e-interaction';
var DRAGITEM = 'e-drag-item';
var DROPPABLE = 'e-droppable';
var DRAGGING = 'e-dragging';
var SIBLING = 'e-sibling';
var DROPIN = 'e-drop-in';
var DROPNEXT = 'e-drop-next';
var DROPOUT = 'e-drop-out';
var NODROP = 'e-no-drop';
var FULLROWWRAP = 'e-fullrow-wrap';
var FULLROW = 'e-fullrow';
var SELECTED = 'e-selected';
var EXPANDED = 'e-expanded';
var NODECOLLAPSED = 'e-node-collapsed';
var DISABLE = 'e-disable';
var DROPCOUNT = 'e-drop-count';
var CHECK = 'e-check';
var INDETERMINATE = 'e-stop';
var CHECKBOXWRAP = 'e-treeview-checkbox';
var CHECKBOXFRAME = 'e-frame';
var CHECKBOXRIPPLE = 'e-ripple-container';
var RIPPLE = 'e-ripple';
var RIPPLEELMENT = 'e-ripple-element';
var FOCUS = 'e-node-focus';
var IMAGE = 'e-list-img';
var BIGGER = 'e-bigger';
var SMALL = 'e-small';
var CHILD = 'e-has-child';
var ITEM_ANIMATION_ACTIVE = 'e-animation-active';
var DISABLED = 'e-disabled';
var PREVENTSELECT = 'e-prevent';
var treeAriaAttr = {
    treeRole: 'group',
    itemRole: 'treeitem',
    listRole: 'group',
    itemText: '',
    wrapperRole: ''
};
/**
 * Configures the fields to bind to the properties of node in the TreeView component.
 */
var FieldsSettings = /** @class */ (function (_super) {
    __extends(FieldsSettings, _super);
    function FieldsSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('child')
    ], FieldsSettings.prototype, "child", void 0);
    __decorate([
        Property([])
    ], FieldsSettings.prototype, "dataSource", void 0);
    __decorate([
        Property('expanded')
    ], FieldsSettings.prototype, "expanded", void 0);
    __decorate([
        Property('hasChildren')
    ], FieldsSettings.prototype, "hasChildren", void 0);
    __decorate([
        Property('htmlAttributes')
    ], FieldsSettings.prototype, "htmlAttributes", void 0);
    __decorate([
        Property('iconCss')
    ], FieldsSettings.prototype, "iconCss", void 0);
    __decorate([
        Property('id')
    ], FieldsSettings.prototype, "id", void 0);
    __decorate([
        Property('imageUrl')
    ], FieldsSettings.prototype, "imageUrl", void 0);
    __decorate([
        Property('isChecked')
    ], FieldsSettings.prototype, "isChecked", void 0);
    __decorate([
        Property('parentID')
    ], FieldsSettings.prototype, "parentID", void 0);
    __decorate([
        Property(null)
    ], FieldsSettings.prototype, "query", void 0);
    __decorate([
        Property('selectable')
    ], FieldsSettings.prototype, "selectable", void 0);
    __decorate([
        Property('selected')
    ], FieldsSettings.prototype, "selected", void 0);
    __decorate([
        Property(null)
    ], FieldsSettings.prototype, "tableName", void 0);
    __decorate([
        Property('text')
    ], FieldsSettings.prototype, "text", void 0);
    __decorate([
        Property('tooltip')
    ], FieldsSettings.prototype, "tooltip", void 0);
    __decorate([
        Property('navigateUrl')
    ], FieldsSettings.prototype, "navigateUrl", void 0);
    return FieldsSettings;
}(ChildProperty));
export { FieldsSettings };
/**
 * Configures animation settings for the TreeView component.
 */
var ActionSettings = /** @class */ (function (_super) {
    __extends(ActionSettings, _super);
    function ActionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('SlideDown')
    ], ActionSettings.prototype, "effect", void 0);
    __decorate([
        Property(400)
    ], ActionSettings.prototype, "duration", void 0);
    __decorate([
        Property('linear')
    ], ActionSettings.prototype, "easing", void 0);
    return ActionSettings;
}(ChildProperty));
export { ActionSettings };
/**
 * Configures the animation settings for expanding and collapsing nodes in TreeView.
 */
var NodeAnimationSettings = /** @class */ (function (_super) {
    __extends(NodeAnimationSettings, _super);
    function NodeAnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Complex({ effect: 'SlideUp', duration: 400, easing: 'linear' }, ActionSettings)
    ], NodeAnimationSettings.prototype, "collapse", void 0);
    __decorate([
        Complex({ effect: 'SlideDown', duration: 400, easing: 'linear' }, ActionSettings)
    ], NodeAnimationSettings.prototype, "expand", void 0);
    return NodeAnimationSettings;
}(ChildProperty));
export { NodeAnimationSettings };
/**
 * The TreeView component is used to represent hierarchical data in a tree like structure with advanced
 * functions to perform edit, drag and drop, selection with check-box, and more.
 * ```html
 * <div id="tree"></div>
 * ```
 * ```typescript
 * let treeObj: TreeView = new TreeView();
 * treeObj.appendTo('#tree');
 * ```
 */
var TreeView = /** @class */ (function (_super) {
    __extends(TreeView, _super);
    function TreeView(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isRefreshed = false;
        _this.preventExpand = false;
        _this.checkedElement = [];
        _this.disableNode = [];
        _this.validArr = [];
        _this.validNodes = [];
        _this.expandChildren = [];
        _this.isFieldChange = false;
        _this.changeDataSource = false;
        _this.hasTemplate = false;
        _this.isFirstRender = false;
        // Specifies whether the node is dropped or not
        _this.isNodeDropped = false;
        _this.isInteracted = false;
        _this.isRightClick = false;
        _this.mouseDownStatus = false;
        _this.isDropIn = false;
        _this.OldCheckedData = [];
        _this.isHiddenItem = false;
        return _this;
    }
    TreeView_1 = TreeView;
    /**
     * Get component name.
     *
     * @returns {string} - returns module name.
     * @private
     */
    TreeView.prototype.getModuleName = function () {
        return 'treeview';
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     */
    TreeView.prototype.preRender = function () {
        var _this = this;
        this.checkActionNodes = [];
        this.parentNodeCheck = [];
        this.dragStartAction = false;
        this.isAnimate = false;
        this.keyConfigs = {
            escape: 'escape',
            end: 'end',
            enter: 'enter',
            f2: 'f2',
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
            ctrlA: 'ctrl+A',
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
            shiftSpace: 'shift+space',
            ctrlSpace: 'ctrl+space'
        };
        this.listBaseOption = {
            expandCollapse: true,
            showIcon: true,
            expandIconClass: EXPANDABLE,
            ariaAttributes: treeAriaAttr,
            expandIconPosition: 'Left',
            itemCreated: function (e) {
                _this.beforeNodeCreate(e);
            },
            enableHtmlSanitizer: this.enableHtmlSanitizer,
            itemNavigable: this.fullRowNavigable
        };
        this.updateListProp(this.fields);
        this.aniObj = new Animation({});
        this.treeList = [];
        this.isLoaded = false;
        this.isInitalExpand = false;
        this.expandChildren = [];
        this.index = 0;
        this.setTouchClass();
        this.DDTTreeData = JSON.parse(JSON.stringify(this.fields.dataSource));
        if (isNOU(this.selectedNodes)) {
            this.setProperties({ selectedNodes: [] }, true);
        }
        if (isNOU(this.checkedNodes)) {
            this.setProperties({ checkedNodes: [] }, true);
        }
        if (isNOU(this.expandedNodes)) {
            this.setProperties({ expandedNodes: [] }, true);
        }
        else {
            this.isInitalExpand = true;
        }
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - returns the persisted data
     * @hidden
     */
    TreeView.prototype.getPersistData = function () {
        var keyEntity = ['selectedNodes', 'checkedNodes', 'expandedNodes'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * To Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    TreeView.prototype.render = function () {
        this.initialRender = true;
        this.initialize();
        this.setDataBinding(false);
        this.setDisabledMode();
        this.setExpandOnType();
        if (!this.disabled) {
            this.setRipple();
        }
        this.wireEditingEvents(this.allowEditing);
        this.setDragAndDrop(this.allowDragAndDrop);
        if (!this.disabled) {
            this.wireEvents();
        }
        this.initialRender = false;
        this.renderComplete();
    };
    TreeView.prototype.initialize = function () {
        this.element.setAttribute('role', 'tree');
        if (!isNOU(this.fields.dataSource) && Array.isArray(this.fields.dataSource) && this.fields.dataSource.length !== 0) {
            this.element.setAttribute('aria-activedescendant', this.element.id + '_active');
        }
        this.setCssClass(null, this.cssClass);
        this.setEnableRtl();
        this.setFullRow(this.fullRowSelect);
        this.setTextWrap();
        this.nodeTemplateFn = this.templateComplier(this.nodeTemplate);
    };
    TreeView.prototype.setDisabledMode = function () {
        if (this.disabled) {
            this.element.classList.add(DISABLED);
            this.element.setAttribute('aria-disabled', 'true');
        }
        else {
            this.element.classList.remove(DISABLED);
            this.element.setAttribute('aria-disabled', 'false');
        }
    };
    TreeView.prototype.setEnableRtl = function () {
        (this.enableRtl ? addClass : removeClass)([this.element], RTL);
    };
    TreeView.prototype.setRipple = function () {
        var tempStr = '.' + FULLROW + ',.' + TEXTWRAP;
        var rippleModel = {
            selector: tempStr,
            ignore: '.' + TEXTWRAP + ' > .' + ICON + ',.' + INPUTGROUP + ',.' + INPUT + ', .' + CHECKBOXWRAP
        };
        this.rippleFn = rippleEffect(this.element, rippleModel);
        var iconModel = {
            selector: '.' + TEXTWRAP + ' > .' + ICON,
            isCenterRipple: true
        };
        this.rippleIconFn = rippleEffect(this.element, iconModel);
    };
    TreeView.prototype.setFullRow = function (isEnabled) {
        (isEnabled ? addClass : removeClass)([this.element], FULLROWWRAP);
    };
    TreeView.prototype.setMultiSelect = function (isEnabled) {
        if (isEnabled) {
            this.element.setAttribute('aria-multiselectable', 'true');
        }
        else {
            this.element.setAttribute('aria-multiselectable', 'false');
        }
    };
    TreeView.prototype.templateComplier = function (template) {
        if (template) {
            this.hasTemplate = true;
            this.element.classList.add(INTERACTION);
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
        this.element.classList.remove(INTERACTION);
        return undefined;
    };
    TreeView.prototype.setDataBinding = function (changeDataSource) {
        var _this = this;
        this.treeList.push('false');
        if (this.fields.dataSource instanceof DataManager) {
            this.isOffline = this.fields.dataSource.dataSource.offline;
            if (this.fields.dataSource.ready) {
                this.fields.dataSource.ready.then(function (e) {
                    _this.isOffline = _this.fields.dataSource.dataSource.offline;
                    if (_this.fields.dataSource instanceof DataManager && _this.isOffline) {
                        _this.treeList.pop();
                        _this.treeData = e.result;
                        _this.isNumberTypeId = _this.getType();
                        _this.setRootData();
                        _this.renderItems(true);
                        if (_this.treeList.length === 0 && !_this.isLoaded) {
                            _this.finalize();
                        }
                    }
                }).catch(function (e) {
                    _this.trigger('actionFailure', { error: e });
                });
            }
            else {
                this.fields.dataSource.executeQuery(this.getQuery(this.fields)).then(function (e) {
                    _this.treeList.pop();
                    _this.treeData = e.result;
                    _this.isNumberTypeId = _this.getType();
                    _this.setRootData();
                    if (changeDataSource) {
                        _this.changeDataSource = true;
                    }
                    _this.renderItems(true);
                    _this.changeDataSource = false;
                    if (_this.treeList.length === 0 && !_this.isLoaded) {
                        _this.finalize();
                    }
                }).catch(function (e) {
                    _this.trigger('actionFailure', { error: e });
                });
            }
        }
        else {
            this.treeList.pop();
            if (isNOU(this.fields.dataSource)) {
                this.rootData = this.treeData = [];
            }
            else {
                this.treeData = JSON.parse(JSON.stringify(this.fields.dataSource));
                this.setRootData();
            }
            this.isNumberTypeId = this.getType();
            this.renderItems(false);
        }
        if (this.treeList.length === 0 && !this.isLoaded) {
            this.finalize();
        }
    };
    TreeView.prototype.getQuery = function (mapper, value) {
        if (value === void 0) { value = null; }
        var columns = [];
        var query;
        if (!mapper.query) {
            query = new Query();
            var prop = this.getActualProperties(mapper);
            for (var _i = 0, _a = Object.keys(prop); _i < _a.length; _i++) {
                var col = _a[_i];
                if (col !== 'dataSource' && col !== 'tableName' && col !== 'child' && !!mapper["" + col]
                    && col !== 'url' && columns.indexOf(mapper["" + col]) === -1) {
                    columns.push(mapper["" + col]);
                }
            }
            query.select(columns);
            if (Object.prototype.hasOwnProperty.call(prop, 'tableName')) {
                query.from(mapper.tableName);
            }
        }
        else {
            query = mapper.query.clone();
        }
        ListBase.addSorting(this.sortOrder, mapper.text, query);
        if (!isNOU(value) && !isNOU(mapper.parentID)) {
            query.where(mapper.parentID, 'equal', (this.isNumberTypeId ? parseFloat(value) : value));
        }
        return query;
    };
    TreeView.prototype.getType = function () {
        return this.treeData[0] ? ((typeof getValue(this.fields.id, this.treeData[0]) === 'number') ? true : false) : false;
    };
    TreeView.prototype.setRootData = function () {
        this.dataType = this.getDataType(this.treeData, this.fields);
        if (this.dataType === 1) {
            this.groupedData = this.getGroupedData(this.treeData, this.fields.parentID);
            var rootItems = this.getChildNodes(this.treeData, undefined, true);
            if (isNOU(rootItems)) {
                this.rootData = [];
            }
            else {
                this.rootData = rootItems;
            }
        }
        else {
            this.rootData = this.treeData;
        }
    };
    TreeView.prototype.isChildObject = function () {
        if (typeof this.fields.child === 'object') {
            return true;
        }
        else {
            return false;
        }
    };
    TreeView.prototype.renderItems = function (isSorted) {
        this.listBaseOption.ariaAttributes.level = 1;
        var sortedData = this.getSortedData(this.rootData);
        this.ulElement = ListBase.createList(this.createElement, isSorted ? this.rootData : sortedData, this.listBaseOption);
        this.element.appendChild(this.ulElement);
        var rootNodes = this.ulElement.querySelectorAll('.e-list-item');
        if (this.loadOnDemand === false) {
            var i = 0;
            while (i < rootNodes.length) {
                this.renderChildNodes(rootNodes[parseInt(i.toString(), 10)], true, null, true);
                i++;
            }
        }
        var parentEle = selectAll('.' + PARENTITEM, this.element);
        if ((parentEle.length === 1 && (rootNodes && rootNodes.length !== 0)) || this.loadOnDemand) {
            this.finalizeNode(this.element);
        }
        this.parentNodeCheck = [];
        this.parentCheckData = [];
        this.updateCheckedStateFromDS();
        if (this.autoCheck && this.showCheckBox && !this.isLoaded) {
            this.updateParentCheckState();
        }
    };
    /**
     * Update the checkedNodes from datasource at initial rendering
     *
     * @returns {void}
     */
    TreeView.prototype.updateCheckedStateFromDS = function () {
        this.validNodes = [];
        if (this.treeData && this.showCheckBox) {
            if (this.dataType === 1) {
                var mapper = this.fields;
                var resultData = new DataManager(this.treeData).executeLocal(new Query().where(mapper.isChecked, 'equal', true, false));
                for (var i = 0; i < resultData.length; i++) {
                    var resultId = resultData[parseInt(i.toString(), 10)][this.fields.id]
                        ? resultData[parseInt(i.toString(), 10)][this.fields.id].toString()
                        : null;
                    if (this.checkedNodes.indexOf(resultId) === -1 && !(this.isLoaded)) {
                        this.checkDisabledState(resultId, resultData[i]);
                    }
                    if (resultData[parseInt(i.toString(), 10)][this.fields.hasChildren]) {
                        var id = resultData[parseInt(i.toString(), 10)][this.fields.id];
                        var childData = new DataManager(this.treeData).
                            executeLocal(new Query().where(mapper.parentID, 'equal', id, false));
                        for (var child = 0; child < childData.length; child++) {
                            var childId = childData[parseInt(child.toString(), 10)][this.fields.id]
                                ? childData[parseInt(child.toString(), 10)][this.fields.id].toString()
                                : null;
                            if (this.checkedNodes.indexOf(childId) === -1 && this.autoCheck) {
                                this.checkDisabledState(childId, childData[child]);
                            }
                        }
                    }
                }
                for (var i = 0; i < this.checkedNodes.length; i++) {
                    var mapper_1 = this.fields;
                    var checkState = new DataManager(this.treeData).
                        executeLocal(new Query().where(mapper_1.id, 'equal', this.checkedNodes[parseInt(i.toString(), 10)], true));
                    if (checkState[0] && this.autoCheck) {
                        this.getCheckedNodeDetails(mapper_1, checkState);
                        this.checkIndeterminateState(checkState[0]);
                    }
                    if (checkState.length > 0) {
                        var checkedId = checkState[0][this.fields.id] ? checkState[0][this.fields.id].toString() : null;
                        if (this.checkedNodes.indexOf(checkedId) > -1 && this.validNodes.indexOf(checkedId) === -1) {
                            this.validNodes.push(checkedId);
                        }
                    }
                    var checkedData = new DataManager(this.treeData).
                        executeLocal(new Query().where(mapper_1.parentID, 'equal', this.checkedNodes[parseInt(i.toString(), 10)], true));
                    for (var index = 0; index < checkedData.length; index++) {
                        var checkedId = checkedData[parseInt(index.toString(), 10)][this.fields.id]
                            ? checkedData[parseInt(index.toString(), 10)][this.fields.id].toString()
                            : null;
                        if (this.checkedNodes.indexOf(checkedId) === -1 && this.autoCheck) {
                            this.checkDisabledState(checkedId, checkedData[index]);
                        }
                        if (this.checkedNodes.indexOf(checkedId) > -1 && this.validNodes.indexOf(checkedId) === -1) {
                            this.validNodes.push(checkedId);
                        }
                    }
                }
            }
            else if (this.dataType === 2 || (this.fields.dataSource instanceof DataManager &&
                this.isOffline)) {
                for (var index = 0; index < this.treeData.length; index++) {
                    var fieldId = this.treeData[parseInt(index.toString(), 10)][this.fields.id] ? this.treeData[parseInt(index.toString(), 10)][this.fields.id].toString() : '';
                    if (this.treeData[parseInt(index.toString(), 10)][this.fields.isChecked] &&
                        !(this.isLoaded) && this.checkedNodes.indexOf(fieldId) === -1) {
                        this.checkDisabledState(fieldId, this.treeData[index]);
                    }
                    if (this.checkedNodes.indexOf(fieldId) > -1 && this.validNodes.indexOf(fieldId) === -1) {
                        this.validNodes.push(fieldId);
                    }
                    var childItems = getValue(this.fields.child.toString(), this.treeData[parseInt(index.toString(), 10)]);
                    if (childItems) {
                        this.updateChildCheckState(childItems, this.treeData[parseInt(index.toString(), 10)]);
                    }
                }
                this.validNodes = (this.enablePersistence) ? this.checkedNodes : this.validNodes;
            }
            this.setProperties({ checkedNodes: this.validNodes }, true);
        }
    };
    /**
     * To check whether the list data has sub child and to change the parent check state accordingly
     *
     * @param {FieldsSettingsModel} mapper - The mapper object containing field settings.
     * @param {Object[]} checkNodes - The array of checked nodes.
     * @returns {void}
     * @private
     */
    TreeView.prototype.getCheckedNodeDetails = function (mapper, checkNodes) {
        var id = checkNodes[0][this.fields.parentID] ? checkNodes[0][this.fields.parentID].toString() : null;
        var count = 0;
        var element = this.element.querySelector('[data-uid="' + checkNodes[0][this.fields.id] + '"]');
        var parentEle = this.element.querySelector('[data-uid="' + checkNodes[0][this.fields.parentID] + '"]');
        if (!element && !parentEle) {
            if (this.parentNodeCheck.indexOf(id) === -1) {
                this.parentNodeCheck.push(id);
            }
            var childNodes = this.getChildNodes(this.treeData, id);
            for (var i = 0; i < childNodes.length; i++) {
                var childId = childNodes[parseInt(i.toString(), 10)][this.fields.id]
                    ? childNodes[parseInt(i.toString(), 10)][this.fields.id].toString()
                    : null;
                if (this.checkedNodes.indexOf(childId) !== -1) {
                    count++;
                }
                if (count === childNodes.length && this.checkedNodes.indexOf(id) === -1) {
                    this.checkDisabledState(id);
                }
            }
            var preElement = new DataManager(this.treeData).
                executeLocal(new Query().where(mapper.id, 'equal', id, true));
            this.getCheckedNodeDetails(mapper, preElement);
        }
        else if (parentEle) {
            var check = select('.' + CHECK, parentEle);
            if (!check) {
                this.changeState(parentEle, 'indeterminate', null, true, true);
            }
        }
    };
    /**
     * Update the checkedNodes and parent state when all the child Nodes are in checkedstate at initial rendering
     *
     * @returns {void}
     * @private
     */
    TreeView.prototype.updateParentCheckState = function () {
        var indeterminate = selectAll('.' + INDETERMINATE, this.element);
        var childCheckedElement;
        var data = this.treeData;
        if (this.element.classList.contains('e-filtering')) {
            data = this.DDTTreeData;
        }
        for (var i = 0; i < indeterminate.length; i++) {
            var node = closest(indeterminate[parseInt(i.toString(), 10)], '.' + LISTITEM);
            var nodeId = node.getAttribute('data-uid').toString();
            var OldCheckedNodes = void 0;
            if (this.element.classList.contains('e-filtering')) {
                OldCheckedNodes = new DataManager(this.OldCheckedData).executeLocal(new Query().where('parentID', 'equal', nodeId, true));
            }
            if (this.dataType === 1) {
                childCheckedElement = new DataManager(data).
                    executeLocal(new Query().where(this.fields.parentID, 'equal', nodeId, true));
            }
            else {
                childCheckedElement = this.getChildNodes(data, nodeId);
            }
            var count = 0;
            if (childCheckedElement) {
                var _loop_1 = function (j) {
                    var childId = childCheckedElement[parseInt(j.toString(), 10)][this_1.fields.id].toString();
                    if (this_1.checkedNodes.indexOf(childId) !== -1) {
                        count++;
                    }
                    else if (this_1.element.classList.contains('e-filtering') && OldCheckedNodes.findIndex(function (e) { return e['id'] === childId; }) !== -1) {
                        count++;
                    }
                };
                var this_1 = this;
                for (var j = 0; j < childCheckedElement.length; j++) {
                    _loop_1(j);
                }
                if (count === childCheckedElement.length) {
                    var nodeCheck = node.getAttribute('data-uid');
                    if (this.checkedNodes.indexOf(nodeCheck) === -1) {
                        this.checkDisabledState(nodeCheck);
                    }
                    this.changeState(node, 'check', null, true, true);
                }
                else if (count === 0 && this.checkedNodes.length === 0) {
                    this.changeState(node, 'uncheck', null, true, true);
                }
            }
        }
    };
    /**
     * Change the parent to indeterminate state whenever the child is in checked state which is not rendered in DOM
     *
     * @param {Object} data - The data object to check for indeterminate state.
     * @returns {void}
     * @private
     */
    TreeView.prototype.checkIndeterminateState = function (data) {
        var element;
        if (this.dataType === 1) {
            element = this.element.querySelector('[data-uid="' + data[this.fields.parentID] + '"]');
        }
        else {
            element = this.element.querySelector('[data-uid="' + data[this.fields.id] + '"]');
        }
        if (element) {
            var ariaChecked = element.getAttribute('aria-checked');
            if (ariaChecked !== 'true') {
                this.changeState(element, 'indeterminate', null, true, true);
            }
        }
        else if (this.dataType === 2) {
            if (this.parentNodeCheck.indexOf(data[this.fields.id].toString()) === -1) {
                this.parentNodeCheck.push(data[this.fields.id].toString());
            }
        }
    };
    /**
     * Update the checkedNodes for child and subchild from datasource (hierarchical datasource) at initial rendering
     *
     * @param {Object[]} childItems - The array of child items to update the checked state.
     * @param {Object} treeData - The tree data object containing field values.
     * @returns {void}
     * @private
     */
    TreeView.prototype.updateChildCheckState = function (childItems, treeData) {
        var count = 0;
        var checkedParent = treeData[this.fields.id] ? treeData[this.fields.id].toString() : '';
        for (var index = 0; index < childItems.length; index++) {
            var checkedChild = childItems[parseInt(index.toString(), 10)][this.fields.id] ? childItems[parseInt(index.toString(), 10)][this.fields.id].toString() : '';
            if (childItems[parseInt(index.toString(), 10)][this.fields.isChecked] &&
                !(this.isLoaded) && this.checkedNodes.indexOf(checkedChild) === -1) {
                this.checkDisabledState(checkedChild, childItems[index]);
            }
            if (this.checkedNodes.indexOf(checkedParent) !== -1 && this.checkedNodes.indexOf(checkedChild) === -1 && this.autoCheck) {
                this.checkDisabledState(checkedChild, childItems[index]);
            }
            if (this.checkedNodes.indexOf(checkedChild) !== -1 && this.autoCheck) {
                count++;
            }
            if (this.checkedNodes.indexOf(checkedChild) > -1 && this.validNodes.indexOf(checkedChild) === -1) {
                this.validNodes.push(checkedChild);
            }
            var subChildItems = getValue(this.fields.child.toString(), childItems[parseInt(index.toString(), 10)]);
            if (subChildItems && subChildItems.length) {
                if (this.parentCheckData.indexOf(treeData) === -1) {
                    this.parentCheckData.push(treeData);
                }
                this.updateChildCheckState(subChildItems, childItems[parseInt(index.toString(), 10)]);
            }
            if (count === childItems.length && this.autoCheck && this.checkedNodes.indexOf(checkedParent) === -1) {
                this.checkDisabledState(checkedParent, treeData);
            }
        }
        if (count !== 0 && this.autoCheck) {
            this.checkIndeterminateState(treeData);
            for (var len = 0; len < this.parentCheckData.length; len++) {
                if ((treeData !== this.parentCheckData[parseInt(len.toString(), 10)]) &&
                    (this.parentCheckData[parseInt(len.toString(), 10)])) {
                    this.checkIndeterminateState(this.parentCheckData[parseInt(len.toString(), 10)]);
                }
            }
        }
        this.parentCheckData = [];
    };
    TreeView.prototype.beforeNodeCreate = function (e) {
        if (this.showCheckBox) {
            var checkboxEle = createCheckBox(this.createElement, true, { cssClass: this.touchClass });
            checkboxEle.classList.add(CHECKBOXWRAP);
            var icon = select('div.' + EXPANDABLE + ', div.' + COLLAPSIBLE, e.item);
            var id = e.item.getAttribute('data-uid');
            e.item.childNodes[0].insertBefore(checkboxEle, e.item.childNodes[0].childNodes[isNOU(icon) ? 0 : 1]);
            var checkValue = getValue(e.fields.isChecked, e.curData);
            if (this.checkedNodes.indexOf(id) > -1) {
                select('.' + CHECKBOXFRAME, checkboxEle).classList.add(CHECK);
                e.item.setAttribute('aria-checked', 'true');
                this.addCheck(e.item);
            }
            else if (!isNOU(checkValue) && checkValue.toString() === 'true') {
                select('.' + CHECKBOXFRAME, checkboxEle).classList.add(CHECK);
                e.item.setAttribute('aria-checked', 'true');
                this.addCheck(e.item);
            }
            else {
                e.item.setAttribute('aria-checked', 'false');
            }
            var frame = select('.' + CHECKBOXFRAME, checkboxEle);
            EventHandler.add(frame, 'mousedown', this.frameMouseHandler, this);
            EventHandler.add(frame, 'mouseup', this.frameMouseHandler, this);
        }
        if (this.fullRowSelect) {
            this.createFullRow(e.item);
        }
        if (this.allowMultiSelection && !e.item.classList.contains(SELECTED)) {
            e.item.setAttribute('aria-selected', 'false');
        }
        var fields = e.fields;
        this.addActionClass(e, fields.selected, SELECTED);
        this.addActionClass(e, fields.expanded, EXPANDED);
        e.item.setAttribute('tabindex', '-1');
        EventHandler.add(e.item, 'focus', this.focusIn, this);
        if (!isNOU(this.nodeTemplateFn)) {
            var textEle = e.item.querySelector('.' + LISTTEXT);
            var dataId = e.item.getAttribute('data-uid');
            textEle.innerHTML = '';
            this.renderNodeTemplate(e.curData, textEle, dataId);
        }
        var eventArgs = {
            node: e.item,
            nodeData: e.curData,
            text: e.text
        };
        if (!this.isRefreshed) {
            this.trigger('drawNode', eventArgs);
            if (e.curData[this.fields.selectable] === false && !this.showCheckBox) {
                e.item.classList.add(PREVENTSELECT);
                var firstChild = e.item.firstElementChild;
                firstChild.style.cursor = 'not-allowed';
            }
        }
    };
    TreeView.prototype.frameMouseHandler = function (e) {
        var rippleSpan = select('.' + CHECKBOXRIPPLE, e.target.parentElement);
        rippleMouseHandler(e, rippleSpan);
    };
    TreeView.prototype.addActionClass = function (e, action, cssClass) {
        var data = e.curData;
        var actionValue = getValue(action, data);
        if (!isNOU(actionValue) && actionValue.toString() !== 'false') {
            e.item.classList.add(cssClass);
        }
    };
    TreeView.prototype.getDataType = function (ds, mapper) {
        if (this.fields.dataSource instanceof DataManager) {
            for (var i = 0; i < ds.length; i++) {
                if (this.isOffline) {
                    if ((typeof mapper.child === 'string') && isNOU(getValue(mapper.child, ds[parseInt(i.toString(), 10)])) && !isNOU(getValue(mapper.parentID, ds[parseInt(i.toString(), 10)]))) {
                        return 1;
                    }
                }
                else if ((typeof mapper.child === 'string') && isNOU(getValue(mapper.child, ds[parseInt(i.toString(), 10)]))) {
                    return 1;
                }
            }
            return 2;
        }
        for (var i = 0, len = ds.length; i < len; i++) {
            if ((typeof mapper.child === 'string') && (!isNOU(getValue(mapper.child, ds[parseInt(i.toString(), 10)])) || (Object.prototype.hasOwnProperty.call(ds[parseInt(i.toString(), 10)], mapper.child)))) {
                return 2;
            }
            if (this.isChildObject()) {
                return 2;
            }
            if (!isNOU(getValue(mapper.parentID, ds[parseInt(i.toString(), 10)])) ||
                !isNOU(getValue(mapper.hasChildren, ds[parseInt(i.toString(), 10)]))) {
                return 1;
            }
        }
        return 1;
    };
    TreeView.prototype.getGroupedData = function (dataSource, groupBy) {
        var cusQuery = new Query().group(groupBy);
        var ds = ListBase.getDataSource(dataSource, cusQuery);
        var grpItem = [];
        for (var j = 0; j < ds.length; j++) {
            var itemObj = ds[parseInt(j.toString(), 10)].items;
            grpItem.push(itemObj);
        }
        return grpItem;
    };
    TreeView.prototype.getSortedData = function (list) {
        if (list && this.sortOrder !== 'None') {
            list = ListBase.getDataSource(list, ListBase.addSorting(this.sortOrder, this.fields.text));
        }
        return list;
    };
    TreeView.prototype.finalizeNode = function (element, isFromExpandAll, expandChild) {
        var _this = this;
        if (!isFromExpandAll) {
            this.updateAttributes(element);
        }
        if (!expandChild) {
            var eNodes = selectAll('.' + EXPANDED, element);
            if (!this.loadOnDemand && this.fields.dataSource instanceof DataManager) {
                this.isInitalExpand = this.treeData.filter(function (e) { return e[_this.fields.expanded] === true; }).length > 0
                    ? true
                    : this.isInitalExpand;
            }
            if (!this.isInitalExpand) {
                for (var i = 0; i < eNodes.length; i++) {
                    this.renderChildNodes(eNodes[parseInt(i.toString(), 10)]);
                }
            }
            removeClass(eNodes, EXPANDED);
        }
        if (!isFromExpandAll) {
            this.updateList();
        }
        if (this.isLoaded) {
            this.updateCheckedProp();
        }
    };
    TreeView.prototype.updateAttributes = function (element) {
        var iNodes = selectAll('.' + IMAGE, element);
        for (var k = 0; k < iNodes.length; k++) {
            iNodes[parseInt(k.toString(), 10)].setAttribute('alt', IMAGE);
        }
        if (this.isLoaded) {
            var sNodes = selectAll('.' + SELECTED, element);
            for (var i = 0; i < sNodes.length; i++) {
                this.selectNode(sNodes[parseInt(i.toString(), 10)], null);
                break;
            }
            removeClass(sNodes, SELECTED);
        }
        var cNodes = selectAll('.' + LISTITEM + ':not(.' + EXPANDED + ')', element);
        for (var j = 0; j < cNodes.length; j++) {
            var icon = select('div.' + ICON, cNodes[parseInt(j.toString(), 10)]);
            if (icon && icon.classList.contains(EXPANDABLE)) {
                this.disableExpandAttr(cNodes[parseInt(j.toString(), 10)]);
            }
        }
    };
    TreeView.prototype.updateCheckedProp = function () {
        if (this.showCheckBox) {
            var nodes = [].concat([], this.checkedNodes);
            this.setProperties({ checkedNodes: nodes }, true);
        }
    };
    TreeView.prototype.ensureIndeterminate = function () {
        if (this.autoCheck) {
            var liElement = selectAll('li', this.element);
            var ulElement = void 0;
            for (var i = 0; i < liElement.length; i++) {
                if (liElement[parseInt(i.toString(), 10)].classList.contains(LISTITEM)) {
                    ulElement = select('.' + PARENTITEM, liElement[parseInt(i.toString(), 10)]);
                    if (ulElement) {
                        this.ensureParentCheckState(liElement[parseInt(i.toString(), 10)]);
                    }
                    else {
                        this.ensureChildCheckState(liElement[parseInt(i.toString(), 10)]);
                    }
                }
            }
        }
        else {
            var indeterminate = selectAll('.' + INDETERMINATE, this.element);
            for (var i = 0; i < indeterminate.length; i++) {
                indeterminate[parseInt(i.toString(), 10)].classList.remove(INDETERMINATE);
            }
        }
    };
    TreeView.prototype.ensureParentCheckState = function (element) {
        if (!isNOU(element)) {
            if (element.classList.contains(ROOT)) {
                return;
            }
            var ulElement = element;
            if (element.classList.contains(LISTITEM)) {
                ulElement = select('.' + PARENTITEM, element);
            }
            var checkedNodes = selectAll('.' + CHECKBOXWRAP + ' .' + CHECK, ulElement);
            var indeterminateNodes = selectAll('.' + INDETERMINATE, ulElement);
            var nodes = selectAll(this.checkDisabledChildren ? '.' + LISTITEM : '.' + LISTITEM + ':not(.' + DISABLE + ')', ulElement);
            var checkBoxEle = element.getElementsByClassName(CHECKBOXWRAP)[0];
            var count = nodes.length;
            var checkedCount = checkedNodes.length;
            var matchedChildNodes = [];
            var oldChildCount = [];
            var dataUid_1 = element.getAttribute('data-uid');
            var rootNodeChecked_1 = true;
            var childNodeChecked_1 = false;
            nodes.forEach(function (childNode) {
                if (childNode instanceof HTMLElement) {
                    var ariaChecked = childNode.getAttribute('aria-checked');
                    if (ariaChecked === 'true') {
                        childNodeChecked_1 = true;
                    }
                    else {
                        rootNodeChecked_1 = false;
                    }
                }
            });
            var parentNodeChecked = false;
            if (this.element.classList.contains('e-filtering')) {
                var oldCheckedNodes = new DataManager(this.OldCheckedData).executeLocal(new Query().where('parentID', 'equal', dataUid_1, true));
                checkedCount = oldCheckedNodes.length;
                var parentNode = new DataManager(this.OldCheckedData).executeLocal(new Query().where('hasChildren', 'equal', true, true));
                if (parentNode.length > 0 && childNodeChecked_1 && ((this.OldCheckedData.some(function (oldNode) { return oldNode.id === dataUid_1; })) ||
                    this.parentNodeCheck.indexOf(dataUid_1) !== -1)) {
                    checkedCount = parentNode.length;
                    parentNodeChecked = true;
                }
                var childItems = [];
                if (this.dataType === 1) {
                    childItems = new DataManager(this.DDTTreeData).executeLocal(new Query().where(this.fields.parentID, 'equal', dataUid_1, true));
                }
                else {
                    childItems = this.getChildNodes(this.DDTTreeData, dataUid_1);
                }
                count = childItems.length;
            }
            if (this.autoCheck && this.showCheckBox && !(this.fields.dataSource instanceof DataManager)) {
                var selectedChildNodeDetails = this.getSelectedChildNodeDetails(dataUid_1);
                matchedChildNodes = selectedChildNodeDetails;
                oldChildCount = new DataManager(this.checkActionNodes)
                    .executeLocal(new Query().where('parentID', 'equal', dataUid_1, true));
            }
            if (count === 0 && checkedCount === 0) {
                return;
            }
            else if (count === checkedCount || ((parentNodeChecked && count > 0) && ((oldChildCount.length === matchedChildNodes.length)
                || (oldChildCount.length !== matchedChildNodes.length))
                && (oldChildCount.length !== 0 && matchedChildNodes.length !== 0) && rootNodeChecked_1
                && (this.autoCheck && this.showCheckBox))) {
                this.changeState(checkBoxEle, 'check', null, true, true);
            }
            else if ((checkedCount > 0 && !parentNodeChecked && (this.autoCheck && this.showCheckBox))) {
                this.changeState(checkBoxEle, 'indeterminate', null, true, true);
            }
            else if (checkedCount > 0 || indeterminateNodes.length > 0) {
                this.changeState(checkBoxEle, 'indeterminate', null, true, true);
            }
            else if (checkedCount === 0) {
                this.changeState(checkBoxEle, 'uncheck', null, true, true);
            }
            var parentUL = closest(element, '.' + PARENTITEM);
            if (!isNOU(parentUL)) {
                var currentParent = closest(parentUL, '.' + LISTITEM);
                this.ensureParentCheckState(currentParent);
            }
        }
    };
    TreeView.prototype.getSelectedChildNodeDetails = function (dataUid) {
        var _this = this;
        var childKey = typeof this.fields.child === 'string' ? this.fields.child : null;
        var dataId = this.fields.id;
        var parentKey = this.fields.parentID;
        var matchesDataUid = function (childNode) {
            if (!isNOU(childKey) && childKey in childNode && Array.isArray(childNode[childKey])) {
                var matchNode = childNode[dataId];
                if (!isNOU(matchNode)) {
                    return matchNode.toString() === dataUid;
                }
            }
            else {
                var childNodePid = childNode[parentKey];
                if (!isNOU(childNodePid)) {
                    return childNodePid.toString() === dataUid;
                }
            }
            return false;
        };
        return this.checkedNodes
            .map(function (checkedNodeId) {
            return _this.getNodeObject(checkedNodeId);
        })
            .filter(function (childNode) {
            if (childNode && typeof childNode === 'object' && (childKey in childNode)) {
                return matchesDataUid(childNode);
            }
            else if (_this.dataType !== 2 && typeof childNode === 'object' && (parentKey in childNode || childKey in childNode)) {
                return matchesDataUid(childNode);
            }
            return false;
        });
    };
    TreeView.prototype.ensureChildCheckState = function (element, e, isFromExpandAll) {
        var _this = this;
        if (!isNOU(element)) {
            var childElement = select('.' + PARENTITEM, element);
            var checkBoxes = void 0;
            if (!isNOU(childElement)) {
                var childCheck = Array.from(childElement.querySelectorAll('li'));
                checkBoxes = selectAll('.' + CHECKBOXWRAP, childElement);
                if (this.isFilter) {
                    checkBoxes = Array.from(checkBoxes).filter(function (checkbox) {
                        var dataUID = checkbox.closest('li').getAttribute('data-uid');
                        return dataUID !== null && _this.checkedNodes.indexOf(dataUID) !== -1;
                    });
                    childCheck = Array.from(childCheck).filter(function (li) {
                        var childIds = li.getAttribute('data-uid');
                        return childIds !== null && _this.checkedNodes.indexOf(childIds) !== -1;
                    });
                    if (checkBoxes.length === 0) {
                        checkBoxes = selectAll('.' + CHECKBOXWRAP, childElement);
                        childCheck = Array.from(childElement.querySelectorAll('li'));
                    }
                }
                var isChecked = element.getElementsByClassName(CHECKBOXFRAME)[0].classList.contains(CHECK);
                var parentCheck = element.getElementsByClassName(CHECKBOXFRAME)[0].classList.contains(INDETERMINATE);
                var checkedState = void 0;
                for (var index = 0; index < checkBoxes.length; index++) {
                    var childId = childCheck[parseInt(index.toString(), 10)].getAttribute('data-uid');
                    if (!isNOU(this.currentLoadData) &&
                        !isNOU(getValue(this.fields.isChecked, this.currentLoadData[parseInt(index.toString(), 10)]))) {
                        checkedState = getValue(this.fields.isChecked, this.currentLoadData[parseInt(index.toString(), 10)]) ? 'check' : 'uncheck';
                        if (this.ele !== -1) {
                            checkedState = isChecked ? 'check' : 'uncheck';
                        }
                        if ((checkedState === 'uncheck') && (!isUndefined(this.parentNodeCheck) && this.autoCheck
                            && this.parentNodeCheck.indexOf(childId) !== -1)) {
                            this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(childId), 1);
                            checkedState = 'indeterminate';
                        }
                    }
                    else {
                        var isNodeChecked = checkBoxes[parseInt(index.toString(), 10)]
                            .getElementsByClassName(CHECKBOXFRAME)[0]
                            .classList.contains(CHECK);
                        if (isChecked) {
                            checkedState = 'check';
                        }
                        else if (isNodeChecked && !this.isLoaded) {
                            checkedState = 'check';
                        }
                        else if (this.checkedNodes.indexOf(childId) !== -1 && this.isLoaded && (parentCheck || isChecked)) {
                            checkedState = 'check';
                        }
                        else if (childCheck[parseInt(index.toString(), 10)].classList.contains(CHILD) &&
                            (!isUndefined(this.parentNodeCheck) && this.autoCheck
                                && (isChecked || parentCheck) && this.parentNodeCheck.indexOf(childId) !== -1)) {
                            checkedState = 'indeterminate';
                            this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(childId), 1);
                        }
                        else if (this.dataType === 1 && (!isUndefined(this.parentNodeCheck) && this.autoCheck &&
                            (isChecked || parentCheck) && this.parentNodeCheck.indexOf(childId) !== -1)) {
                            checkedState = 'indeterminate';
                            this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(childId), 1);
                        }
                        else {
                            checkedState = 'uncheck';
                        }
                    }
                    this.changeState(checkBoxes[parseInt(index.toString(), 10)], checkedState, e, true, true);
                }
            }
            if (this.autoCheck && this.isLoaded && !isFromExpandAll) {
                this.updateParentCheckState();
            }
        }
    };
    TreeView.prototype.doCheckBoxAction = function (nodes, doCheck) {
        if (!isNOU(nodes)) {
            nodes.reverse();
            for (var len = nodes.length - 1; len >= 0; len--) {
                var liEle = this.getElement(nodes[parseInt(len.toString(), 10)]);
                if (isNOU(liEle)) {
                    var node = nodes[len - nodes.length] ? nodes[len - nodes.length].toString()
                        : nodes[parseInt(len.toString(), 10)]
                            ? nodes[parseInt(len.toString(), 10)].toString()
                            : null;
                    if (node !== '' && doCheck && node) {
                        this.setValidCheckedNode(node, nodes);
                        this.dynamicCheckState(node, doCheck);
                    }
                    else if (this.checkedNodes.indexOf(node) !== -1 && node !== '' && !doCheck) {
                        this.checkedNodes.splice(this.checkedNodes.indexOf(node), 1);
                        var childItems = this.getChildNodes(this.treeData, node);
                        if (childItems) {
                            for (var i = 0; i < childItems.length; i++) {
                                var id = childItems[parseInt(i.toString(), 10)][this.fields.id]
                                    ? childItems[parseInt(i.toString(), 10)][this.fields.id].toString()
                                    : null;
                                if (this.checkedNodes.indexOf(id) !== -1) {
                                    this.checkedNodes.splice(this.checkedNodes.indexOf(id), 1);
                                    var ele = this.element.querySelector('[data-uid="' + id + '"]');
                                    if (ele) {
                                        this.changeState(ele, 'uncheck', null);
                                    }
                                }
                            }
                            if (this.parentNodeCheck.indexOf(node) !== -1) {
                                this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(node), 1);
                            }
                        }
                        if (node) {
                            this.dynamicCheckState(node, doCheck);
                        }
                        this.updateField(this.treeData, this.fields, node, 'isChecked', null);
                    }
                    continue;
                }
                var checkBox = select('.' + PARENTITEM + ' .' + CHECKBOXWRAP, liEle);
                this.validateCheckNode(checkBox, !doCheck, liEle, null);
            }
        }
        else {
            var checkBoxes = selectAll('.' + CHECKBOXWRAP, this.element);
            if (this.loadOnDemand) {
                for (var index = 0; index < checkBoxes.length; index++) {
                    var liEle = closest(checkBoxes[parseInt(index.toString(), 10)], '.' + LISTITEM);
                    this.updateFieldChecked(checkBoxes[parseInt(index.toString(), 10)], doCheck);
                    this.changeState(checkBoxes[parseInt(index.toString(), 10)], doCheck ? 'check' : 'uncheck', null, null, null, doCheck);
                    this.updateOldCheckedData([this.getNodeData(liEle)]);
                }
            }
            else {
                for (var index = 0; index < checkBoxes.length; index++) {
                    var liEle = closest(checkBoxes[parseInt(index.toString(), 10)], '.' + LISTITEM);
                    this.updateFieldChecked(checkBoxes[parseInt(index.toString(), 10)], doCheck);
                    this.changeState(checkBoxes[parseInt(index.toString(), 10)], doCheck ? 'check' : 'uncheck');
                    this.updateOldCheckedData([this.getNodeData(liEle)]);
                }
            }
        }
        if (nodes) {
            for (var j = 0; j < nodes.length - 1; j++) {
                var node = nodes[parseInt(j.toString(), 10)] ? nodes[parseInt(j.toString(), 10)].toString() : '';
                if (!doCheck) {
                    this.updateField(this.treeData, this.fields, node, 'isChecked', null);
                }
            }
        }
        if (this.autoCheck) {
            this.updateParentCheckState();
        }
    };
    TreeView.prototype.updateFieldChecked = function (checkbox, doCheck) {
        var currLi = closest(checkbox, '.' + LISTITEM);
        var id = currLi.getAttribute('data-uid');
        var nodeDetails = this.getNodeData(currLi);
        if (nodeDetails.isChecked === 'true' && !doCheck) {
            this.updateField(this.treeData, this.fields, id, 'isChecked', null);
        }
    };
    /**
     * Changes the parent and child  check state while changing the checkedNodes via setmodel
     *
     * @param {string} node - The unique identifier of the node.
     * @param {boolean} doCheck - A boolean value indicating whether to check or uncheck the node.
     * @returns {void}
     * @private
     */
    TreeView.prototype.dynamicCheckState = function (node, doCheck) {
        if (this.dataType === 1) {
            var count = 0;
            var resultId = new DataManager(this.treeData).executeLocal(new Query().where(this.fields.id, 'equal', node, true));
            if (resultId[0]) {
                var id = resultId[0][this.fields.id] ? resultId[0][this.fields.id].toString() : null;
                var parent_1 = resultId[0][this.fields.parentID] ? resultId[0][this.fields.parentID].toString() : null;
                var parentElement = this.element.querySelector('[data-uid="' + parent_1 + '"]');
                var element = this.element.querySelector('[data-uid="' + id + '"]');
                var childNodes = this.getChildNodes(this.treeData, parent_1);
                if (childNodes) {
                    for (var i = 0; i < childNodes.length; i++) {
                        var childId = childNodes[parseInt(i.toString(), 10)][this.fields.id]
                            ? childNodes[parseInt(i.toString(), 10)][this.fields.id].toString()
                            : null;
                        if (this.checkedNodes.indexOf(childId) !== -1) {
                            count++;
                        }
                    }
                }
                if (this.checkedNodes.indexOf(node) !== -1 && parentElement && (id === node) && this.autoCheck) {
                    this.changeState(parentElement, 'indeterminate', null);
                }
                else if (this.checkedNodes.indexOf(node) === -1 && element && (id === node) && !doCheck) {
                    this.changeState(element, 'uncheck', null);
                }
                else if (this.checkedNodes.indexOf(node) !== -1 && element && (id === node) && doCheck) {
                    this.changeState(element, 'check', null);
                }
                else if (this.checkedNodes.indexOf(node) === -1 && !element && parentElement && (id === node) && this.autoCheck
                    && count !== 0) {
                    this.changeState(parentElement, 'indeterminate', null);
                }
                else if (this.checkedNodes.indexOf(node) === -1 && !element && parentElement && (id === node) && this.autoCheck
                    && count === 0) {
                    this.changeState(parentElement, 'uncheck', null);
                }
                else if (!element && !parentElement && (id === node) && this.autoCheck) {
                    this.updateIndeterminate(node, doCheck);
                }
            }
        }
        else if (this.dataType === 2 || (this.fields.dataSource instanceof DataManager &&
            this.isOffline)) {
            var id = void 0;
            var parentElement = void 0;
            var check = void 0;
            for (var i = 0; i < this.treeData.length; i++) {
                id = this.treeData[parseInt(i.toString(), 10)][this.fields.id] ? this.treeData[parseInt(i.toString(), 10)][this.fields.id].toString() : '';
                parentElement = this.element.querySelector('[data-uid="' + id + '"]');
                check = parentElement ? select('.' + CHECK, parentElement) : null;
                if (this.checkedNodes.indexOf(id) === -1 && parentElement && check && !doCheck) {
                    this.changeState(parentElement, 'uncheck', null);
                }
                var subChild = getValue(this.fields.child.toString(), this.treeData[parseInt(i.toString(), 10)]);
                if (subChild) {
                    this.updateChildIndeterminate(subChild, id, node, doCheck, id);
                }
            }
        }
    };
    /**
     * updates the parent and child  check state while changing the checkedNodes via setmodel for listData
     *
     * @param {string} node - The unique identifier of the node.
     * @param {boolean} doCheck - A boolean value indicating whether to check or uncheck the node.
     * @returns {void}
     * @private
     */
    TreeView.prototype.updateIndeterminate = function (node, doCheck) {
        var indeterminateData = this.getTreeData(node);
        var count = 0;
        var parent;
        if (this.dataType === 1) {
            parent = indeterminateData[0][this.fields.parentID] ? indeterminateData[0][this.fields.parentID].toString() : null;
        }
        var childNodes = this.getChildNodes(this.treeData, parent);
        if (childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var childId = childNodes[parseInt(i.toString(), 10)][this.fields.id]
                    ? childNodes[parseInt(i.toString(), 10)][this.fields.id].toString()
                    : null;
                if (this.checkedNodes.indexOf(childId) !== -1) {
                    count++;
                }
            }
        }
        var parentElement = this.element.querySelector('[data-uid="' + parent + '"]');
        if (parentElement && doCheck) {
            this.changeState(parentElement, 'indeterminate', null);
        }
        else if (!doCheck && parentElement && this.parentNodeCheck.indexOf(parent) === -1 && count !== 0) {
            this.changeState(parentElement, 'indeterminate', null);
        }
        else if (!doCheck && parentElement && this.parentNodeCheck.indexOf(parent) === -1 && count === 0) {
            this.changeState(parentElement, 'uncheck', null);
        }
        else if (!parentElement) {
            if (!doCheck && this.checkedNodes.indexOf(parent) === -1 && this.parentNodeCheck.indexOf(parent) !== -1) {
                this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(parent), 1);
            }
            else if (doCheck && this.checkedNodes.indexOf(parent) === -1 && this.parentNodeCheck.indexOf(parent) === -1) {
                this.parentNodeCheck.push(parent);
            }
            else if (!doCheck && this.checkedNodes.indexOf(parent) !== -1 && this.parentNodeCheck.indexOf(parent) === -1
                && count !== 0) {
                this.parentNodeCheck.push(parent);
            }
            this.updateIndeterminate(parent, doCheck);
            if (this.checkedNodes.indexOf(parent) !== -1 && !doCheck) {
                this.checkedNodes.splice(this.checkedNodes.indexOf(parent), 1);
            }
        }
    };
    /**
     * updates the parent and child  check state while changing the checkedNodes via setmodel for hierarchical data
     *
     * @param {Object[]} subChild - Array of child nodes
     * @param {string} parent - Parent identifier
     * @param {string} node - Current node identifier
     * @param {boolean} doCheck - Boolean indicating whether to perform a check
     * @param {string} [child] - Optional child identifier
     * @returns {void}
     * @private
     */
    TreeView.prototype.updateChildIndeterminate = function (subChild, parent, node, doCheck, child) {
        var count = 0;
        for (var j = 0; j < subChild.length; j++) {
            var subId = subChild[parseInt(j.toString(), 10)][this.fields.id] ? subChild[parseInt(j.toString(), 10)][this.fields.id].toString() : '';
            if (this.checkedNodes.indexOf(subId) !== -1) {
                count++;
            }
            var parentElement = this.element.querySelector('[data-uid="' + parent + '"]');
            var indeterminate = parentElement ? select('.' + INDETERMINATE, parentElement) : null;
            var check = parentElement ? select('.' + CHECK, parentElement) : null;
            var element = this.element.querySelector('[data-uid="' + subId + '"]');
            var childElementCheck = element ? select('.' + CHECK, element) : null;
            if (this.checkedNodes.indexOf(node) !== -1 && parentElement && (subId === node) && this.autoCheck) {
                this.changeState(parentElement, 'indeterminate', null);
            }
            else if (this.checkedNodes.indexOf(node) === -1 && parentElement && !element && (subId === node) && !doCheck) {
                if (this.autoCheck) {
                    this.changeState(parentElement, 'uncheck', null);
                }
                else {
                    if (count !== 0) {
                        this.changeState(parentElement, 'indeterminate', null);
                    }
                    else {
                        this.changeState(parentElement, 'uncheck', null);
                    }
                }
            }
            else if (this.checkedNodes.indexOf(node) === -1 && element && (subId === node) && !doCheck) {
                this.changeState(element, 'uncheck', null);
            }
            else if (this.checkedNodes.indexOf(node) === -1 && indeterminate && (subId === node) && this.autoCheck && count === 0
                && !doCheck) {
                indeterminate.classList.remove(INDETERMINATE);
            }
            else if (this.checkedNodes.indexOf(node) === -1 && !element && check && (subId === node) && count === 0) {
                this.changeState(parentElement, 'uncheck', null);
            }
            else if (this.checkedNodes.indexOf(subId) === -1 && element && childElementCheck && count === 0) {
                this.changeState(element, 'uncheck', null);
            }
            else if (!element && !parentElement && (subId === node) || (this.parentNodeCheck.indexOf(parent) !== -1) && this.autoCheck) {
                var childElement = this.element.querySelector('[data-uid="' + child + '"]');
                if (doCheck && count !== 0) {
                    this.changeState(childElement, 'indeterminate', null);
                }
                else if (doCheck && count === subChild.length && this.checkedNodes.indexOf(parent) === -1) {
                    this.checkDisabledState(parent);
                }
                else if (!doCheck && count === 0 && this.parentNodeCheck.indexOf(parent) !== -1) {
                    this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(parent));
                }
                if (this.parentNodeCheck.indexOf(parent) === -1) {
                    this.parentNodeCheck.push(parent);
                }
            }
            var innerChild = getValue(this.fields.child.toString(), subChild[parseInt(j.toString(), 10)]);
            if (innerChild) {
                this.updateChildIndeterminate(innerChild, subId, node, doCheck, child);
            }
        }
    };
    TreeView.prototype.changeState = function (wrapper, state, e, isPrevent, isAdd, doCheck) {
        var _this = this;
        var eventArgs;
        var currLi = closest(wrapper, '.' + LISTITEM);
        if (!this.checkDisabledChildren && currLi && (currLi.classList.contains(DISABLE)
            || (this.disableNode && this.disableNode.indexOf(currLi.getAttribute('data-uid')) !== -1))) {
            return;
        }
        if (wrapper === currLi) {
            wrapper = select('.' + CHECKBOXWRAP, currLi);
        }
        if (!isPrevent) {
            this.checkActionNodes = [];
            eventArgs = this.getCheckEvent(currLi, state, e);
            this.trigger('nodeChecking', eventArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    _this.nodeCheckAction(wrapper, state, currLi, observedArgs, e, isPrevent, isAdd, doCheck);
                }
            });
        }
        else {
            this.nodeCheckAction(wrapper, state, currLi, eventArgs, e, isPrevent, isAdd, doCheck);
        }
    };
    TreeView.prototype.nodeCheckAction = function (wrapper, state, currLi, eventArgs, e, isPrevent, isAdd, doCheck) {
        var ariaState;
        var frameSpan = wrapper.getElementsByClassName(CHECKBOXFRAME)[0];
        if (state === 'check' && !frameSpan.classList.contains(CHECK)) {
            frameSpan.classList.remove(INDETERMINATE);
            frameSpan.classList.add(CHECK);
            this.addCheck(currLi);
            ariaState = 'true';
        }
        else if (state === 'uncheck' && (frameSpan.classList.contains(CHECK) || frameSpan.classList.contains(INDETERMINATE))) {
            removeClass([frameSpan], [CHECK, INDETERMINATE]);
            this.removeCheck(currLi);
            ariaState = 'false';
        }
        else if (state === 'indeterminate' && this.autoCheck) {
            frameSpan.classList.remove(CHECK);
            frameSpan.classList.add(INDETERMINATE);
            this.removeCheck(currLi);
            ariaState = 'mixed';
        }
        ariaState = state === 'check' ? 'true' : state === 'uncheck' ? 'false' : ariaState;
        if (!isNOU(ariaState)) {
            currLi.setAttribute('aria-checked', ariaState);
        }
        if (isAdd) {
            var data = [].concat([], this.checkActionNodes);
            eventArgs = this.getCheckEvent(currLi, state, e);
            if (isUndefined(isPrevent)) {
                eventArgs.data = data;
            }
        }
        if (doCheck !== undefined) {
            this.ensureStateChange(currLi, doCheck);
        }
        if (!isPrevent) {
            if (!isNOU(ariaState)) {
                currLi.setAttribute('aria-checked', ariaState);
                eventArgs.data[0].checked = ariaState;
                this.trigger('nodeChecked', eventArgs);
                this.checkActionNodes = [];
            }
        }
    };
    TreeView.prototype.addCheck = function (liEle) {
        var id = liEle.getAttribute('data-uid');
        if (!isNOU(id) && this.checkedNodes.indexOf(id) === -1) {
            this.checkDisabledState(id);
        }
    };
    TreeView.prototype.removeCheck = function (liEle) {
        var index = this.checkedNodes.indexOf(liEle.getAttribute('data-uid'));
        if (index > -1) {
            this.checkedNodes.splice(index, 1);
        }
    };
    TreeView.prototype.getCheckEvent = function (currLi, action, e) {
        this.checkActionNodes.push(this.getNodeData(currLi));
        var nodeData = this.checkActionNodes;
        return { action: action, cancel: false, isInteracted: isNOU(e) ? false : true, node: currLi, data: nodeData };
    };
    TreeView.prototype.finalize = function () {
        var firstUl = select('.' + PARENTITEM, this.element);
        if (!isNullOrUndefined(firstUl)) {
            firstUl.setAttribute('role', treeAriaAttr.treeRole);
            this.setMultiSelect(this.allowMultiSelection);
            this.setNodeFocusable();
            if (this.allowTextWrap) {
                this.updateWrap();
            }
            this.renderReactTemplates();
            this.hasPid = this.rootData[0] ? Object.prototype.hasOwnProperty.call(this.rootData[0], this.fields.parentID) : false;
            this.doExpandAction();
        }
    };
    TreeView.prototype.setTextWrap = function () {
        (this.allowTextWrap ? addClass : removeClass)([this.element], LISTWRAP);
        if (Browser.isIE) {
            (this.allowTextWrap ? addClass : removeClass)([this.element], IELISTWRAP);
        }
    };
    TreeView.prototype.updateWrap = function (ulEle) {
        if (!this.fullRowSelect) {
            return;
        }
        var liEle = ulEle ? selectAll('.' + LISTITEM, ulEle) : this.liList;
        var length = liEle.length;
        for (var i = 0; i < length; i++) {
            this.calculateWrap(liEle[parseInt(i.toString(), 10)]);
        }
    };
    TreeView.prototype.calculateWrap = function (liEle) {
        var element = select('.' + FULLROW, liEle);
        if (element && element.nextElementSibling) {
            element.style.height = this.allowTextWrap ? element.nextElementSibling.offsetHeight + 'px' : '';
        }
    };
    TreeView.prototype.doExpandAction = function () {
        var _this = this;
        var eUids = this.expandedNodes;
        if (!this.loadOnDemand && this.fields.dataSource instanceof DataManager) {
            this.isInitalExpand = this.treeData.filter(function (e) { return e[_this.fields.expanded] === true; }).length > 0
                ? true
                : this.isInitalExpand;
        }
        if (this.isInitalExpand && eUids.length > 0) {
            this.setProperties({ expandedNodes: [] }, true);
            if (this.fields.dataSource instanceof DataManager) {
                this.expandGivenNodes(eUids);
            }
            else {
                for (var i = 0; i < eUids.length; i++) {
                    var eNode = select('[data-uid="' + eUids[parseInt(i.toString(), 10)] + '"]', this.element);
                    if (!isNOU(eNode)) {
                        var icon = select('.' + EXPANDABLE, select('.' + TEXTWRAP, eNode));
                        if (!isNOU(icon)) {
                            this.expandAction(eNode, icon, null);
                        }
                    }
                    else {
                        if (eUids[parseInt(i.toString(), 10)] && this.expandChildren.indexOf(eUids[parseInt(i.toString(), 10)]) === -1) {
                            this.expandChildren.push(eUids[parseInt(i.toString(), 10)].toString());
                        }
                        continue;
                    }
                }
                this.afterFinalized();
            }
        }
        else {
            this.afterFinalized();
        }
    };
    TreeView.prototype.expandGivenNodes = function (arr) {
        var _this = this;
        this.expandCallback(arr[this.index], function () {
            _this.index++;
            if (_this.index < arr.length) {
                _this.expandGivenNodes(arr);
            }
            else {
                _this.afterFinalized();
            }
        });
        if (this.index > 0) {
            this.index = 0;
        }
    };
    TreeView.prototype.expandCallback = function (eUid, callback) {
        var eNode = select('[data-uid="' + eUid + '"]', this.element);
        if (!isNOU(eNode)) {
            var icon = select('.' + EXPANDABLE, select('.' + TEXTWRAP, eNode));
            if (!isNOU(icon)) {
                this.expandAction(eNode, icon, null, false, callback);
            }
            callback();
        }
        else {
            callback();
        }
    };
    TreeView.prototype.afterFinalized = function () {
        this.doSelectionAction();
        this.updateCheckedProp();
        this.isAnimate = true;
        this.isInitalExpand = false;
        if ((!this.isLoaded || this.isFieldChange) && !this.isNodeDropped) {
            var eventArgs = { data: this.treeData };
            this.trigger('dataBound', eventArgs);
        }
        this.isLoaded = true;
        this.isNodeDropped = false;
    };
    TreeView.prototype.doSelectionAction = function () {
        var sNodes = selectAll('.' + SELECTED, this.element);
        var sUids = this.selectedNodes;
        if (sUids.length > 0) {
            this.setProperties({ selectedNodes: [] }, true);
            for (var i = 0; i < sUids.length; i++) {
                var sNode = select('[data-uid="' + sUids[parseInt(i.toString(), 10)] + '"]', this.element);
                if (sNode && !(sNode.classList.contains('e-active'))) {
                    this.selectNode(sNode, null, true);
                }
                else {
                    this.selectedNodes.push(sUids[parseInt(i.toString(), 10)]);
                }
                if (!this.allowMultiSelection) {
                    break;
                }
            }
        }
        else {
            this.selectGivenNodes(sNodes);
        }
        removeClass(sNodes, SELECTED);
    };
    TreeView.prototype.selectGivenNodes = function (sNodes) {
        for (var i = 0; i < sNodes.length; i++) {
            if (!sNodes[parseInt(i.toString(), 10)].classList.contains('e-disable')) {
                this.selectNode(sNodes[parseInt(i.toString(), 10)], null, true);
            }
            if (!this.allowMultiSelection) {
                break;
            }
        }
    };
    TreeView.prototype.clickHandler = function (event) {
        var target = Browser.isDevice && event.originalEvent.changedTouches && !Browser.isIos
            ? document.elementFromPoint(event.originalEvent.changedTouches[0].clientX, event.originalEvent.changedTouches[0].clientY)
            : event.originalEvent.target;
        EventHandler.remove(this.element, 'contextmenu', this.preventContextMenu);
        if (!target || this.dragStartAction) {
            return;
        }
        else {
            var classList = target.classList;
            var li = closest(target, '.' + LISTITEM);
            if (!li || (li.classList.contains(PREVENTSELECT) && !(classList.contains(EXPANDABLE) || classList.contains(COLLAPSIBLE)))) {
                return;
            }
            else if (event.originalEvent.which !== 3) {
                var rippleElement = select('.' + RIPPLEELMENT, li);
                var rippleIcons = select('.' + ICON, li);
                this.removeHover();
                this.setFocusElement(li);
                if (this.showCheckBox && !li.classList.contains('e-disable')) {
                    var checkWrapper = closest(target, '.' + CHECKBOXWRAP);
                    if (!isNOU(checkWrapper)) {
                        var checkElement = select('.' + CHECKBOXFRAME, checkWrapper);
                        this.validateCheckNode(checkWrapper, checkElement.classList.contains(CHECK), li, event.originalEvent);
                        this.triggerClickEvent(event.originalEvent, li);
                        return;
                    }
                }
                if (classList.contains(EXPANDABLE)) {
                    this.expandAction(li, target, event);
                }
                else if (classList.contains(COLLAPSIBLE)) {
                    this.collapseNode(li, target, event);
                }
                else if (rippleElement && rippleIcons) {
                    if (rippleIcons.classList.contains(RIPPLE) && rippleIcons.classList.contains(EXPANDABLE)) {
                        this.expandAction(li, rippleIcons, event);
                    }
                    else if (rippleIcons.classList.contains(RIPPLE) && rippleIcons.classList.contains(COLLAPSIBLE)) {
                        this.collapseNode(li, rippleIcons, event);
                    }
                    else if (!classList.contains(PARENTITEM) && !classList.contains(LISTITEM)) {
                        this.toggleSelect(li, event.originalEvent, false);
                    }
                }
                else {
                    if (!classList.contains(PARENTITEM) && !classList.contains(LISTITEM)) {
                        this.toggleSelect(li, event.originalEvent, false);
                    }
                }
            }
            if (event.originalEvent.which === 3) {
                this.isRightClick = true;
            }
            this.triggerClickEvent(event.originalEvent, li);
        }
    };
    TreeView.prototype.nodeCheckedEvent = function (wrapper, isCheck, e) {
        var eventArgs = this.getCheckEvent(wrapper, isCheck ? 'uncheck' : 'check', e);
        eventArgs.data = eventArgs.data.splice(0, eventArgs.data.length - 1);
        this.trigger('nodeChecked', eventArgs);
    };
    TreeView.prototype.updateOldCheckedData = function (data) {
        var _this = this;
        var dataManager = new DataManager(data);
        var childItems = dataManager.executeLocal(new Query().where('isChecked', 'equal', 'true', true));
        var uncheckedItems = dataManager.executeLocal(new Query().where('isChecked', 'equal', 'false', true));
        if (uncheckedItems.length > 0) {
            var index = this.OldCheckedData.findIndex(function (e) { return e['id'] === uncheckedItems[0]['id']; });
            if (index !== -1) {
                this.OldCheckedData.splice(index, 1);
                var childNodes = this.OldCheckedData.filter(function (e) { return e['parentID'] === uncheckedItems[0]['id']; });
                if (childNodes.length > 0) {
                    childNodes.forEach(function (child) {
                        var childIndex = _this.OldCheckedData.findIndex(function (e) { return e['id'] === child.id; });
                        if (childIndex !== -1) {
                            _this.OldCheckedData.splice(childIndex, 1);
                        }
                    });
                }
                return;
            }
        }
        if (childItems.length > 0) {
            var index = this.OldCheckedData.findIndex(function (e) { return e['id'] === childItems[0]['id']; });
            if (index === -1) {
                this.OldCheckedData.push(childItems[0]);
                return;
            }
        }
    };
    TreeView.prototype.triggerClickEvent = function (e, li) {
        var eventArgs = {
            event: e,
            node: li
        };
        this.trigger('nodeClicked', eventArgs);
    };
    TreeView.prototype.expandNode = function (currLi, icon, loaded) {
        var _this = this;
        this.renderReactTemplates();
        if (icon.classList.contains(LOAD)) {
            this.hideSpinner(icon);
        }
        if (!this.initialRender) {
            icon.classList.add('interaction');
        }
        if (loaded !== true || (loaded === true && currLi.classList.contains('e-expanded'))) {
            if (this.preventExpand !== true) {
                removeClass([icon], EXPANDABLE);
                addClass([icon], COLLAPSIBLE);
                var start_1 = 0;
                var end_1 = 0;
                var ul_1 = select('.' + PARENTITEM, currLi);
                var liEle_1 = currLi;
                if (this.isAnimate && !this.isRefreshed) {
                    this.setHeight(liEle_1, ul_1);
                    var activeElement_1 = select('.' + LISTITEM + '.' + ACTIVE, currLi);
                    this.aniObj.animate(ul_1, {
                        name: this.animation.expand.effect,
                        duration: (this.animation.expand.duration === 0 && animationMode === 'Enable') ? 400 : this.animation.expand.duration,
                        timingFunction: this.animation.expand.easing,
                        begin: function () {
                            liEle_1.style.overflow = 'hidden';
                            if (!isNullOrUndefined(activeElement_1) && activeElement_1 instanceof HTMLElement) {
                                activeElement_1.classList.add(ITEM_ANIMATION_ACTIVE);
                            }
                            start_1 = liEle_1.offsetHeight;
                            end_1 = select('.' + TEXTWRAP, currLi).offsetHeight;
                        },
                        progress: function (args) {
                            args.element.style.display = 'block';
                            _this.animateHeight(args, start_1, end_1);
                        },
                        end: function (args) {
                            args.element.style.display = 'block';
                            if (!isNullOrUndefined(activeElement_1) && activeElement_1 instanceof HTMLElement) {
                                activeElement_1.classList.remove(ITEM_ANIMATION_ACTIVE);
                            }
                            _this.expandedNode(liEle_1, ul_1, icon);
                        }
                    });
                }
                else {
                    this.expandedNode(liEle_1, ul_1, icon);
                }
            }
        }
        else {
            var ul = select('.' + PARENTITEM, currLi);
            ul.style.display = 'none';
            if (this.fields.dataSource instanceof DataManager === true) {
                this.preventExpand = false;
            }
        }
        if (this.initialRender) {
            icon.classList.add('interaction');
        }
    };
    TreeView.prototype.expandedNode = function (currLi, ul, icon) {
        ul.style.display = 'block';
        currLi.style.display = 'block';
        currLi.style.overflow = '';
        currLi.style.height = '';
        removeClass([icon], PROCESS);
        this.addExpand(currLi);
        if (this.allowTextWrap && this.isLoaded && this.isFirstRender) {
            this.updateWrap(currLi);
            this.isFirstRender = false;
        }
        if (this.isLoaded && this.expandArgs && !this.isRefreshed) {
            this.expandArgs = this.getExpandEvent(currLi, null);
            this.expandArgs.isInteracted = this.isInteracted;
            this.trigger('nodeExpanded', this.expandArgs);
        }
        if (this.isHiddenItem) {
            this.collapseAll([this.getNodeData(currLi).id]);
        }
    };
    TreeView.prototype.addExpand = function (liEle) {
        liEle.setAttribute('aria-expanded', 'true');
        removeClass([liEle], NODECOLLAPSED);
        var id = liEle.getAttribute('data-uid');
        if (!isNOU(id) && this.expandedNodes.indexOf(id) === -1) {
            this.expandedNodes.push(id);
        }
    };
    TreeView.prototype.collapseNode = function (currLi, icon, e) {
        var _this = this;
        if (icon.classList.contains(PROCESS)) {
            return;
        }
        else {
            addClass([icon], PROCESS);
        }
        var colArgs;
        if (this.isLoaded) {
            colArgs = this.getExpandEvent(currLi, e);
            this.isInteracted = colArgs.isInteracted;
            this.trigger('nodeCollapsing', colArgs, function (observedArgs) {
                if (observedArgs.cancel) {
                    removeClass([icon], PROCESS);
                }
                else {
                    _this.nodeCollapseAction(currLi, icon, observedArgs);
                }
            });
        }
        else {
            this.nodeCollapseAction(currLi, icon, colArgs);
        }
    };
    TreeView.prototype.nodeCollapseAction = function (currLi, icon, colArgs) {
        var _this = this;
        removeClass([icon], COLLAPSIBLE);
        addClass([icon], EXPANDABLE);
        var start = 0;
        var end = 0;
        var ul = select('.' + PARENTITEM, currLi);
        var liEle = currLi;
        var activeElement = select('.' + LISTITEM + '.' + ACTIVE, currLi);
        if (this.isAnimate) {
            this.aniObj.animate(ul, {
                name: this.animation.collapse.effect,
                duration: (this.animation.collapse.duration === 0 && animationMode === 'Enable') ? 400 : this.animation.collapse.duration,
                timingFunction: this.animation.collapse.easing,
                begin: function () {
                    liEle.style.overflow = 'hidden';
                    if (!isNullOrUndefined(activeElement) && activeElement instanceof HTMLElement) {
                        activeElement.classList.add(ITEM_ANIMATION_ACTIVE);
                    }
                    start = select('.' + TEXTWRAP, currLi).offsetHeight;
                    end = liEle.offsetHeight;
                },
                progress: function (args) {
                    _this.animateHeight(args, start, end);
                },
                end: function (args) {
                    args.element.style.display = 'none';
                    if (!isNullOrUndefined(activeElement) && activeElement instanceof HTMLElement) {
                        activeElement.classList.remove(ITEM_ANIMATION_ACTIVE);
                    }
                    _this.collapsedNode(liEle, ul, icon, colArgs);
                }
            });
        }
        else {
            this.collapsedNode(liEle, ul, icon, colArgs);
        }
    };
    TreeView.prototype.collapsedNode = function (liEle, ul, icon, colArgs) {
        ul.style.display = 'none';
        liEle.style.overflow = '';
        liEle.style.height = '';
        removeClass([icon], PROCESS);
        this.removeExpand(liEle);
        if (this.isLoaded) {
            colArgs = this.getExpandEvent(liEle, null);
            colArgs.isInteracted = this.isInteracted;
            this.trigger('nodeCollapsed', colArgs);
        }
    };
    TreeView.prototype.removeExpand = function (liEle, toRemove) {
        if (toRemove) {
            liEle.removeAttribute('aria-expanded');
        }
        else {
            this.disableExpandAttr(liEle);
        }
        var index = this.expandedNodes.indexOf(liEle.getAttribute('data-uid'));
        if (index > -1) {
            this.expandedNodes.splice(index, 1);
        }
    };
    TreeView.prototype.disableExpandAttr = function (liEle) {
        liEle.setAttribute('aria-expanded', 'false');
        addClass([liEle], NODECOLLAPSED);
    };
    TreeView.prototype.setHeight = function (currLi, ul) {
        ul.style.display = 'block';
        ul.style.visibility = 'hidden';
        currLi.style.height = currLi.offsetHeight + 'px';
        ul.style.display = 'none';
        ul.style.visibility = '';
    };
    TreeView.prototype.animateHeight = function (args, start, end) {
        if (isNullOrUndefined(args.element.parentElement)) {
            return;
        }
        var remaining = (args.duration - args.timeStamp) / args.duration;
        var currentHeight = (end - start) * remaining + start;
        args.element.parentElement.style.height = currentHeight + 'px';
    };
    TreeView.prototype.renderChildNodes = function (parentLi, expandChild, callback, loaded, isFromExpandAll) {
        var _this = this;
        var eicon = select('div.' + ICON, parentLi);
        if (isNOU(eicon)) {
            return;
        }
        this.showSpinner(eicon);
        var childItems;
        if (this.fields.dataSource instanceof DataManager) {
            var level = this.parents(parentLi, '.' + PARENTITEM).length;
            var mapper_2 = this.getChildFields(this.fields, level, 1);
            if (isNOU(mapper_2) || isNOU(mapper_2.dataSource)) {
                detach(eicon);
                this.removeExpand(parentLi, true);
                return;
            }
            this.treeList.push('false');
            if (this.fields.dataSource instanceof DataManager && this.isOffline) {
                this.treeList.pop();
                childItems = this.getChildNodes(this.treeData, parentLi.getAttribute('data-uid'));
                this.loadChild(childItems, mapper_2, eicon, parentLi, expandChild, callback, loaded);
            }
            else {
                mapper_2.dataSource.executeQuery(this.getQuery(mapper_2, parentLi.getAttribute('data-uid'))).then(function (e) {
                    _this.treeList.pop();
                    childItems = e.result;
                    if (_this.dataType === 1) {
                        _this.dataType = 2;
                    }
                    _this.loadChild(childItems, mapper_2, eicon, parentLi, expandChild, callback, loaded);
                }).catch(function (e) {
                    _this.trigger('actionFailure', { error: e });
                });
            }
        }
        else {
            childItems = this.getChildNodes(this.treeData, parentLi.getAttribute('data-uid'), false, parseFloat(parentLi.getAttribute('aria-level')) + 1);
            this.currentLoadData = this.getSortedData(childItems);
            if (isNOU(childItems) || childItems.length === 0) {
                detach(eicon);
                if (eicon.classList.contains(LOAD)) {
                    this.hideSpinner(eicon);
                }
                this.removeExpand(parentLi, true);
                return;
            }
            else {
                this.listBaseOption.ariaAttributes.level = parseFloat(parentLi.getAttribute('aria-level')) + 1;
                parentLi.appendChild(ListBase.createList(this.createElement, this.currentLoadData, this.listBaseOption));
                this.expandNode(parentLi, eicon, loaded);
                this.setSelectionForChildNodes(childItems);
                this.ensureCheckNode(parentLi, isFromExpandAll);
                this.finalizeNode(parentLi, isFromExpandAll, expandChild);
                this.disableTreeNodes(childItems);
                this.renderSubChild(parentLi, expandChild, loaded, isFromExpandAll);
            }
        }
    };
    TreeView.prototype.loadChild = function (childItems, mapper, eicon, parentLi, expandChild, callback, loaded) {
        this.currentLoadData = childItems;
        if (isNOU(childItems) || childItems.length === 0) {
            detach(eicon);
            this.removeExpand(parentLi, true);
        }
        else {
            this.updateListProp(mapper);
            if (this.fields.dataSource instanceof DataManager && !this.isOffline) {
                var id = parentLi.getAttribute('data-uid');
                var nodeData = this.getNodeObject(id);
                setValue('child', childItems, nodeData);
            }
            this.listBaseOption.ariaAttributes.level = parseFloat(parentLi.getAttribute('aria-level')) + 1;
            parentLi.appendChild(ListBase.createList(this.createElement, childItems, this.listBaseOption));
            this.expandNode(parentLi, eicon, loaded);
            this.setSelectionForChildNodes(childItems);
            this.ensureCheckNode(parentLi);
            this.finalizeNode(parentLi);
            this.disableTreeNodes(childItems);
            this.renderSubChild(parentLi, expandChild, loaded);
        }
        if (callback) {
            callback();
        }
        if (expandChild) {
            this.expandedNodes.push(parentLi.getAttribute('data-uid'));
        }
        if (this.treeList.length === 0 && !this.isLoaded) {
            this.finalize();
        }
    };
    TreeView.prototype.disableTreeNodes = function (childItems) {
        if (isNOU(this.disableNode) || this.disableNode.length === 0) {
            return;
        }
        var i = 0;
        while (i < childItems.length) {
            var id = childItems[parseInt(i.toString(), 10)][this.fields.id]
                ? childItems[parseInt(i.toString(), 10)][this.fields.id].toString()
                : null;
            if (this.disableNode !== undefined && this.disableNode.indexOf(id) !== -1) {
                this.doDisableAction([id]);
            }
            i++;
        }
    };
    /**
     * Sets the child Item in selectedState while rendering the child node
     *
     * @param {Object[]} nodes - Array of nodes
     * @returns {void}
     */
    TreeView.prototype.setSelectionForChildNodes = function (nodes) {
        if (isNOU(this.selectedNodes) || this.selectedNodes.length === 0) {
            return;
        }
        var i;
        for (i = 0; i < nodes.length; i++) {
            var id = nodes[parseInt(i.toString(), 10)][this.fields.id]
                ? nodes[parseInt(i.toString(), 10)][this.fields.id].toString()
                : null;
            if (this.selectedNodes !== undefined && this.selectedNodes.indexOf(id) !== -1) {
                this.doSelectionAction();
            }
        }
    };
    TreeView.prototype.ensureCheckNode = function (element, isFromExpandAll) {
        if (this.showCheckBox) {
            this.ele = (this.checkedElement) ? this.checkedElement.indexOf(element.getAttribute('data-uid')) : null;
            if (this.autoCheck) {
                this.ensureChildCheckState(element, null, isFromExpandAll);
                if (isFromExpandAll ? (select('.' + CHECK, this.element) || select('.' + INDETERMINATE, this.element)) : true) {
                    this.ensureParentCheckState(element);
                }
            }
        }
        this.currentLoadData = null;
    };
    TreeView.prototype.getFields = function (mapper, nodeLevel, dataLevel) {
        if (nodeLevel === dataLevel) {
            return mapper;
        }
        else {
            return this.getFields(this.getChildMapper(mapper), nodeLevel, dataLevel + 1);
        }
    };
    TreeView.prototype.getChildFields = function (mapper, nodeLevel, dataLevel) {
        if (nodeLevel === dataLevel) {
            return this.getChildMapper(mapper);
        }
        else {
            return this.getChildFields(this.getChildMapper(mapper), nodeLevel, dataLevel + 1);
        }
    };
    TreeView.prototype.getChildMapper = function (mapper) {
        return (typeof mapper.child === 'string' || isNOU(mapper.child)) ? mapper : mapper.child;
    };
    TreeView.prototype.getChildNodes = function (obj, parentId, isRoot, level) {
        var _this = this;
        if (isRoot === void 0) { isRoot = false; }
        var childNodes;
        if (isNOU(obj)) {
            return childNodes;
        }
        if (this.dataType === 1) {
            return this.getChildGroup(this.groupedData, parentId, isRoot);
        }
        if (typeof this.fields.child === 'string') {
            return this.findChildNodes(obj, this.fields.id, parentId) || this.findNestedChildNodes(obj, parentId, level) || [];
        }
        if (this.isChildObject()) {
            var tempField = !isNOU(level) ? this.fields : this.fields.child;
            var i = 1;
            while (i < level) {
                if (!isNOU(tempField.child)) {
                    tempField = tempField.child;
                }
                else {
                    break;
                }
                i++;
            }
            this.updateListProp(tempField);
            var index = obj.findIndex(function (data) {
                return getValue(_this.fields.id, data) &&
                    getValue(_this.fields.id, data).toString() === parentId;
            });
            if (index !== -1) {
                return getValue('child', obj[parseInt(index.toString(), 10)]);
            }
            if (index === -1) {
                for (var i_1 = 0, objlen = obj.length; i_1 < objlen; i_1++) {
                    var tempArray = getValue('child', obj[parseInt(i_1.toString(), 10)]);
                    var childIndex = !isNOU(tempArray)
                        ? tempArray.findIndex(function (data) {
                            return getValue(_this.fields.child.id, data) &&
                                getValue(_this.fields.child.id, data).toString() === parentId;
                        })
                        : -1;
                    if (childIndex !== -1) {
                        return getValue('child', tempArray[parseInt(childIndex.toString(), 10)]);
                    }
                    else if (!isNOU(tempArray)) {
                        childNodes = this.getChildNodes(tempArray, parentId, false, level);
                        if (childNodes !== undefined) {
                            break;
                        }
                    }
                }
            }
        }
        return childNodes;
    };
    TreeView.prototype.findChildNodes = function (items, idField, parentId) {
        var index = items.findIndex(function (data) {
            var value = getValue(idField, data);
            return value && value.toString() === parentId;
        });
        if (index !== -1) {
            return getValue(this.fields.child, items[index]);
        }
        return null;
    };
    TreeView.prototype.findNestedChildNodes = function (items, parentId, level) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var tempArray = getValue(this.fields.child, item);
            if (!isNOU(tempArray)) {
                var childNodes = this.findChildNodes(tempArray, this.fields.id, parentId);
                if (childNodes) {
                    return childNodes;
                }
                var nestedChildNodes = this.getChildNodes(tempArray, parentId, false, level);
                if (nestedChildNodes && nestedChildNodes.length > 0) {
                    return nestedChildNodes;
                }
            }
        }
        return undefined;
    };
    TreeView.prototype.getChildGroup = function (data, parentId, isRoot) {
        var childNodes;
        if (isNOU(data)) {
            return childNodes;
        }
        for (var i = 0, objlen = data.length; i < objlen; i++) {
            if (!isNOU(data[parseInt(i.toString(), 10)][0]) &&
                !isNOU(getValue(this.fields.parentID, data[parseInt(i.toString(), 10)][0]))) {
                if (getValue(this.fields.parentID, data[parseInt(i.toString(), 10)][0]).toString() === parentId) {
                    return data[parseInt(i.toString(), 10)];
                }
            }
            else if (isRoot) {
                return data[parseInt(i.toString(), 10)];
            }
            else {
                return [];
            }
        }
        return childNodes;
    };
    TreeView.prototype.renderSubChild = function (element, expandChild, loaded, isFromExpandAll) {
        if (expandChild) {
            var cIcons = selectAll('.' + EXPANDABLE, element);
            for (var i = 0, len = cIcons.length; i < len; i++) {
                var icon = cIcons[parseInt(i.toString(), 10)];
                if (element.querySelector('.e-icons') !== cIcons[parseInt(i.toString(), 10)]) {
                    var curLi = closest(icon, '.' + LISTITEM);
                    this.expandArgs = this.getExpandEvent(curLi, null);
                    if (loaded !== true) {
                        this.trigger('nodeExpanding', this.expandArgs);
                    }
                    this.renderChildNodes(curLi, expandChild, null, loaded, isFromExpandAll);
                }
            }
        }
    };
    TreeView.prototype.toggleSelect = function (li, e, multiSelect) {
        if (!li.classList.contains('e-disable')) {
            if (this.allowMultiSelection && ((e && e.ctrlKey) || multiSelect) && this.isActive(li)) {
                this.unselectNode(li, e);
            }
            else {
                this.selectNode(li, e, multiSelect);
            }
        }
    };
    TreeView.prototype.isActive = function (li) {
        return li.classList.contains(ACTIVE) ? true : false;
    };
    TreeView.prototype.selectNode = function (li, e, multiSelect) {
        var _this = this;
        if (isNOU(li) || (!this.allowMultiSelection && this.isActive(li) && !isNOU(e))) {
            this.setFocusElement(li);
            return;
        }
        var eventArgs;
        if (this.isLoaded) {
            eventArgs = this.getSelectEvent(li, 'select', e);
            this.trigger('nodeSelecting', eventArgs, function (observedArgs) {
                if ((!observedArgs.cancel) && !observedArgs.node.classList.contains(PREVENTSELECT)) {
                    _this.nodeSelectAction(li, e, observedArgs, multiSelect);
                }
            });
        }
        else {
            this.nodeSelectAction(li, e, eventArgs, multiSelect);
        }
    };
    TreeView.prototype.nodeSelectAction = function (li, e, eventArgs, multiSelect) {
        if (!this.allowMultiSelection || (!multiSelect && (!e || (e && !(e.ctrlKey || e.metaKey))))) {
            this.removeSelectAll();
        }
        if (this.allowMultiSelection && e && e.shiftKey) {
            if (!this.startNode) {
                this.startNode = li;
            }
            var startIndex = this.liList.indexOf(this.startNode);
            var endIndex = this.liList.indexOf(li);
            if (startIndex > endIndex) {
                var temp = startIndex;
                startIndex = endIndex;
                endIndex = temp;
            }
            for (var i = startIndex; i <= endIndex; i++) {
                var currNode = this.liList[parseInt(i.toString(), 10)];
                if (isVisible(currNode) && !currNode.classList.contains('e-disable')) {
                    this.addSelect(currNode);
                }
            }
        }
        else {
            this.startNode = li;
            this.addSelect(li);
        }
        if (this.isLoaded) {
            eventArgs.nodeData = this.getNodeData(li);
            this.trigger('nodeSelected', eventArgs);
            this.isRightClick = false;
        }
        this.isRightClick = false;
    };
    TreeView.prototype.unselectNode = function (li, e) {
        var _this = this;
        var eventArgs;
        if (this.isLoaded) {
            eventArgs = this.getSelectEvent(li, 'un-select', e);
            this.trigger('nodeSelecting', eventArgs, function (observedArgs) {
                if (!observedArgs.cancel) {
                    _this.nodeUnselectAction(li, observedArgs);
                }
            });
        }
        else {
            this.nodeUnselectAction(li, eventArgs);
        }
    };
    TreeView.prototype.nodeUnselectAction = function (li, eventArgs) {
        this.removeSelect(li);
        this.setFocusElement(li);
        if (this.isLoaded) {
            eventArgs.nodeData = this.getNodeData(li);
            this.trigger('nodeSelected', eventArgs);
        }
    };
    TreeView.prototype.setFocusElement = function (li) {
        if (!isNOU(li)) {
            var focusedNode = this.getFocusedNode();
            if (focusedNode) {
                removeClass([focusedNode], FOCUS);
                focusedNode.setAttribute('tabindex', '-1');
            }
            addClass([li], FOCUS);
            li.setAttribute('tabindex', '0');
            EventHandler.add(li, 'blur', this.focusOut, this);
            this.updateIdAttr(focusedNode, li);
        }
    };
    TreeView.prototype.addSelect = function (liEle) {
        liEle.setAttribute('aria-selected', 'true');
        addClass([liEle], ACTIVE);
        var id = liEle.getAttribute('data-uid');
        if (!isNOU(id) && this.selectedNodes.indexOf(id) === -1) {
            this.selectedNodes.push(id);
        }
    };
    TreeView.prototype.removeSelect = function (liEle) {
        if (this.allowMultiSelection) {
            liEle.setAttribute('aria-selected', 'false');
        }
        else {
            liEle.removeAttribute('aria-selected');
        }
        removeClass([liEle], ACTIVE);
        var index = this.selectedNodes.indexOf(liEle.getAttribute('data-uid'));
        if (index > -1) {
            this.selectedNodes.splice(index, 1);
        }
    };
    TreeView.prototype.removeSelectAll = function () {
        var selectedLI = this.element.querySelectorAll('.' + ACTIVE);
        for (var _i = 0, selectedLI_1 = selectedLI; _i < selectedLI_1.length; _i++) {
            var ele = selectedLI_1[_i];
            if (this.allowMultiSelection) {
                ele.setAttribute('aria-selected', 'false');
            }
            else {
                ele.removeAttribute('aria-selected');
            }
        }
        removeClass(selectedLI, ACTIVE);
        this.setProperties({ selectedNodes: [] }, true);
    };
    TreeView.prototype.getSelectEvent = function (currLi, action, e) {
        var nodeData = this.getNodeData(currLi);
        return { action: action, cancel: false, isInteracted: isNOU(e) ? false : true, node: currLi, nodeData: nodeData };
    };
    TreeView.prototype.setExpandOnType = function () {
        this.expandOnType = (this.expandOn === 'Auto') ? (Browser.isDevice ? 'Click' : 'DblClick') : this.expandOn;
    };
    TreeView.prototype.expandHandler = function (e) {
        var target = Browser.isDevice && e.originalEvent.changedTouches && !Browser.isIos
            ? document.elementFromPoint(e.originalEvent.changedTouches[0].clientX, e.originalEvent.changedTouches[0].clientY)
            : e.originalEvent.target;
        if (!target || target.classList.contains(INPUT) || target.classList.contains(ROOT) ||
            target.classList.contains(PARENTITEM) || target.classList.contains(LISTITEM) ||
            target.classList.contains(ICON) || this.showCheckBox && closest(target, '.' + CHECKBOXWRAP)) {
            return;
        }
        else {
            this.expandCollapseAction(closest(target, '.' + LISTITEM), e);
        }
    };
    TreeView.prototype.expandCollapseAction = function (currLi, e) {
        var icon = select('div.' + ICON, currLi);
        if (!icon || icon.classList.contains(PROCESS)) {
            return;
        }
        else {
            var classList = icon.classList;
            if (classList.contains(EXPANDABLE)) {
                this.expandAction(currLi, icon, e);
            }
            else if (classList.contains(COLLAPSIBLE)) {
                this.collapseNode(currLi, icon, e);
            }
        }
    };
    TreeView.prototype.expandAction = function (currLi, icon, e, expandChild, callback, isFromExpandAll) {
        var _this = this;
        if (icon.classList.contains(PROCESS)) {
            return;
        }
        else {
            addClass([icon], PROCESS);
        }
        if (this.isLoaded && !this.isRefreshed) {
            this.expandArgs = this.getExpandEvent(currLi, e);
            this.isInteracted = this.expandArgs.isInteracted;
            this.trigger('nodeExpanding', this.expandArgs, function (observedArgs) {
                if (observedArgs.cancel) {
                    removeClass([icon], PROCESS);
                }
                else {
                    _this.nodeExpandAction(currLi, icon, expandChild, callback, isFromExpandAll);
                }
            });
        }
        else {
            this.nodeExpandAction(currLi, icon, expandChild, callback, isFromExpandAll);
        }
    };
    TreeView.prototype.nodeExpandAction = function (currLi, icon, expandChild, callback, isFromExpandAll) {
        var ul = select('.' + PARENTITEM, currLi);
        if (ul && ul.nodeName === 'UL') {
            this.expandNode(currLi, icon);
        }
        else {
            this.isFirstRender = true;
            this.renderChildNodes(currLi, expandChild, callback, null, isFromExpandAll);
            var liEles = selectAll('.' + LISTITEM, currLi);
            for (var i = 0; i < liEles.length; i++) {
                var id = this.getId(liEles[parseInt(i.toString(), 10)]);
                if (this.expandChildren.indexOf(id) !== -1 && this.expandChildren !== undefined) {
                    var icon_1 = select('.' + EXPANDABLE, select('.' + TEXTWRAP, liEles[parseInt(i.toString(), 10)]));
                    if (!isNOU(icon_1)) {
                        this.expandAction(liEles[parseInt(i.toString(), 10)], icon_1, null);
                    }
                    this.expandChildren.splice(this.expandChildren.indexOf(id), 1);
                }
            }
        }
    };
    TreeView.prototype.keyActionHandler = function (e) {
        var _this = this;
        var target = e.target;
        var focusedNode = this.getFocusedNode();
        if (target && target.classList.contains(INPUT)) {
            var inpEle = target;
            if (e.action === 'enter') {
                inpEle.blur();
            }
            else if (e.action === 'escape') {
                inpEle.value = this.oldText;
                inpEle.blur();
            }
            return;
        }
        e.preventDefault();
        var eventArgs = {
            cancel: false,
            event: e,
            node: focusedNode
        };
        this.trigger('keyPress', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                switch (e.action) {
                    case 'space':
                        if (_this.showCheckBox) {
                            _this.checkNode(e);
                        }
                        else {
                            _this.toggleSelect(focusedNode, e);
                        }
                        break;
                    case 'moveRight':
                        _this.openNode(_this.enableRtl ? false : true, e);
                        break;
                    case 'moveLeft':
                        _this.openNode(_this.enableRtl ? true : false, e);
                        break;
                    case 'shiftDown':
                        _this.shiftKeySelect(true, e);
                        break;
                    case 'moveDown':
                    case 'ctrlDown':
                    case 'csDown':
                        _this.navigateNode(true);
                        break;
                    case 'shiftUp':
                        _this.shiftKeySelect(false, e);
                        break;
                    case 'moveUp':
                    case 'ctrlUp':
                    case 'csUp':
                        _this.navigateNode(false);
                        break;
                    case 'home':
                    case 'shiftHome':
                    case 'ctrlHome':
                    case 'csHome':
                        _this.navigateRootNode(true);
                        break;
                    case 'end':
                    case 'shiftEnd':
                    case 'ctrlEnd':
                    case 'csEnd':
                        _this.navigateRootNode(false);
                        break;
                    case 'enter':
                    case 'ctrlEnter':
                    case 'shiftEnter':
                    case 'csEnter':
                    case 'shiftSpace':
                    case 'ctrlSpace':
                        _this.toggleSelect(focusedNode, e);
                        break;
                    case 'f2':
                        if (_this.allowEditing && !focusedNode.classList.contains('e-disable')) {
                            _this.createTextbox(focusedNode);
                        }
                        break;
                    case 'ctrlA':
                        if (_this.allowMultiSelection) {
                            var sNodes = selectAll('.' + LISTITEM + ':not(.' + ACTIVE + ')', _this.element);
                            _this.selectGivenNodes(sNodes);
                        }
                        break;
                }
            }
        });
    };
    TreeView.prototype.navigateToFocus = function (isUp) {
        var focusNode = this.getFocusedNode().querySelector('.' + TEXTWRAP);
        var pos = focusNode.getBoundingClientRect();
        var parent = this.getScrollParent(this.element);
        if (!isNOU(parent)) {
            var parentPos = parent.getBoundingClientRect();
            if (pos.bottom > parentPos.bottom) {
                parent.scrollTop += pos.bottom - parentPos.bottom;
            }
            else if (pos.top < parentPos.top) {
                parent.scrollTop -= parentPos.top - pos.top;
            }
        }
        var isVisible = this.isVisibleInViewport(focusNode);
        if (!isVisible) {
            focusNode.scrollIntoView(isUp);
        }
    };
    TreeView.prototype.isVisibleInViewport = function (txtWrap) {
        var pos = txtWrap.getBoundingClientRect();
        return (pos.top >= 0 && pos.left >= 0 && pos.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            pos.right <= (window.innerWidth || document.documentElement.clientWidth));
    };
    TreeView.prototype.getScrollParent = function (node) {
        if (isNOU(node)) {
            return null;
        }
        return (node.scrollHeight > node.clientHeight) ? node : this.getScrollParent(node.parentElement);
    };
    TreeView.prototype.shiftKeySelect = function (isTowards, e) {
        if (this.allowMultiSelection) {
            var focusedNode = this.getFocusedNode();
            var nextNode = isTowards ? this.getNextNode(focusedNode) : this.getPrevNode(focusedNode);
            this.removeHover();
            this.setFocusElement(nextNode);
            this.toggleSelect(nextNode, e, false);
            this.navigateToFocus(!isTowards);
        }
        else {
            this.navigateNode(isTowards);
        }
    };
    TreeView.prototype.checkNode = function (e) {
        var focusedNode = this.getFocusedNode();
        var checkWrap = select('.' + CHECKBOXWRAP, focusedNode);
        var isChecked = select(' .' + CHECKBOXFRAME, checkWrap).classList.contains(CHECK);
        if (!focusedNode.classList.contains('e-disable')) {
            if (focusedNode.getElementsByClassName('e-checkbox-disabled').length === 0) {
                this.validateCheckNode(checkWrap, isChecked, focusedNode, e);
            }
        }
    };
    TreeView.prototype.validateCheckNode = function (checkWrap, isCheck, li, e) {
        var _this = this;
        var currLi = closest(checkWrap, '.' + LISTITEM);
        this.checkActionNodes = [];
        var ariaState = !isCheck ? 'true' : 'false';
        if (!isNOU(ariaState)) {
            currLi.setAttribute('aria-checked', ariaState);
        }
        var eventArgs = this.getCheckEvent(currLi, isCheck ? 'uncheck' : 'check', e);
        this.trigger('nodeChecking', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                _this.nodeCheckingAction(checkWrap, isCheck, li, observedArgs, e);
            }
        });
    };
    TreeView.prototype.nodeCheckingAction = function (checkWrap, isCheck, li, eventArgs, e) {
        if (this.checkedElement.indexOf(li.getAttribute('data-uid')) === -1) {
            this.checkedElement.push(li.getAttribute('data-uid'));
            if (this.autoCheck) {
                var child = this.getChildNodes(this.treeData, li.getAttribute('data-uid'));
                if (child !== null) {
                    this.allCheckNode(child, this.checkedElement, null, null, false);
                }
                else {
                    child = null;
                }
            }
        }
        this.changeState(checkWrap, isCheck ? 'uncheck' : 'check', e, true);
        if (this.autoCheck) {
            this.ensureChildCheckState(li);
            this.updateOldCheckedData([this.getNodeData(li)]);
            this.ensureParentCheckState(closest(closest(li, '.' + PARENTITEM), '.' + LISTITEM));
            var doCheck = void 0;
            if (eventArgs.action === 'check') {
                doCheck = true;
            }
            else if (eventArgs.action === 'uncheck') {
                doCheck = false;
            }
            this.ensureStateChange(li, doCheck);
        }
        this.nodeCheckedEvent(checkWrap, isCheck, e);
    };
    /**
     * Update checkedNodes when UI interaction happens before the child node renders in DOM
     *
     * @param {Element} li - The list item element
     * @param {boolean} [doCheck] - Optional parameter to specify whether to perform a check
     * @returns {void}
     */
    TreeView.prototype.ensureStateChange = function (li, doCheck) {
        var _this = this;
        var childElement = select('.' + PARENTITEM, li);
        var parentIndex = li.getAttribute('data-uid');
        var mapper = this.fields;
        if (this.dataType === 1 && this.autoCheck) {
            var resultData = new DataManager(this.treeData).executeLocal(new Query().where(mapper.parentID, 'equal', parentIndex, true));
            var childMatchesCheckedNodes = resultData.filter(function (item) {
                return _this.checkedNodes.indexOf(item[mapper.id].toString()) !== -1;
            }, this);
            if (this.checkedNodes.indexOf(parentIndex) !== -1 && childMatchesCheckedNodes.length !== resultData.length && this.isFilter) {
                if (childMatchesCheckedNodes.length > 0) {
                    resultData = childMatchesCheckedNodes;
                }
            }
            for (var i = 0; i < resultData.length; i++) {
                var resultId = resultData[parseInt(i.toString(), 10)][this.fields.id]
                    ? resultData[parseInt(i.toString(), 10)][this.fields.id].toString()
                    : null;
                var isCheck = resultData[parseInt(i.toString(), 10)][this.fields.isChecked]
                    ? resultData[parseInt(i.toString(), 10)][this.fields.isChecked].toString()
                    : null;
                if (this.checkedNodes.indexOf(parentIndex) !== -1 && this.checkedNodes.indexOf(resultId) === -1) {
                    this.checkDisabledState(resultId, resultData[i]);
                    var childItems = this.getChildNodes(this.treeData, resultId);
                    this.getChildItems(childItems, doCheck);
                    if (this.parentNodeCheck.indexOf(resultId) !== -1) {
                        this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(resultId), 1);
                    }
                }
                else if (this.checkedNodes.indexOf(parentIndex) === -1 && childElement === null &&
                    this.checkedNodes.indexOf(resultId) !== -1) {
                    this.checkedNodes.splice(this.checkedNodes.indexOf(resultId), 1);
                    if (isCheck === 'true') {
                        this.updateField(this.treeData, this.fields, resultId, 'isChecked', null);
                    }
                    if (this.checkedNodes.indexOf(parentIndex) === -1 && childElement === null ||
                        this.parentNodeCheck.indexOf(resultId) !== -1) {
                        var childNodes = this.getChildNodes(this.treeData, resultId);
                        this.getChildItems(childNodes, doCheck);
                        if (this.parentNodeCheck.indexOf(resultId) !== -1) {
                            this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(resultId), 1);
                        }
                    }
                }
                else {
                    var childItems = this.getChildNodes(this.treeData, resultId);
                    this.getChildItems(childItems, doCheck);
                }
            }
        }
        else if (this.dataType === 1 && !this.autoCheck) {
            if (!doCheck) {
                var checkedData = new DataManager(this.treeData).executeLocal(new Query().where(mapper.isChecked, 'equal', true, false));
                for (var i = 0; i < checkedData.length; i++) {
                    var id = checkedData[parseInt(i.toString(), 10)][this.fields.id]
                        ? checkedData[parseInt(i.toString(), 10)][this.fields.id].toString()
                        : null;
                    if (this.checkedNodes.indexOf(id) !== -1) {
                        this.checkedNodes.splice(this.checkedNodes.indexOf(id), 1);
                    }
                    this.updateField(this.treeData, this.fields, id, 'isChecked', null);
                }
                this.checkedNodes = [];
            }
            else {
                for (var i = 0; i < this.treeData.length; i++) {
                    var checkedId = this.treeData[parseInt(i.toString(), 10)][this.fields.id]
                        ? this.treeData[parseInt(i.toString(), 10)][this.fields.id].toString()
                        : null;
                    if (this.checkedNodes.indexOf(checkedId) === -1) {
                        this.checkDisabledState(checkedId, this.treeData[i]);
                    }
                }
            }
        }
        else {
            var childItems = this.getChildNodes(this.treeData, parentIndex);
            if (childItems) {
                var filteredChildItems = childItems.filter(function (item) {
                    var itemValue = String(item[Object.keys(item)[0]]);
                    return _this.checkedNodes.indexOf(itemValue) !== -1;
                });
                if (filteredChildItems.length > 0 && childItems.length && this.isFilter) {
                    childItems = filteredChildItems;
                }
                this.childStateChange(childItems, parentIndex, childElement, doCheck);
            }
        }
    };
    TreeView.prototype.checkDisabledState = function (resultId, currentItem) {
        var requiresUpdate = this.checkDisabledChildren;
        if (!requiresUpdate) {
            var shouldPreventUpdate = true;
            if (this.loadOnDemand && this.fields.htmlAttributes) {
                currentItem = isNOU(currentItem) ? currentItem : this.getNodeObject(resultId);
                if (!isNOU(currentItem)) {
                    var htmlAttributes = currentItem[this.fields.htmlAttributes];
                    if (htmlAttributes && !isNOU(htmlAttributes.class) && htmlAttributes.class.indexOf(DISABLE) !== -1) {
                        shouldPreventUpdate = false;
                    }
                }
            }
            var liElement = select("[data-uid=\"" + resultId + "\"]", this.element);
            requiresUpdate = liElement ? !liElement.classList.contains(DISABLE)
                : (this.disableNode.indexOf(resultId) === -1 && shouldPreventUpdate);
        }
        if (requiresUpdate) {
            this.checkedNodes.push(resultId);
        }
    };
    TreeView.prototype.getChildItems = function (childItems, doCheck) {
        for (var i = 0; i < childItems.length; i++) {
            var childId = childItems[parseInt(i.toString(), 10)][this.fields.id]
                ? childItems[parseInt(i.toString(), 10)][this.fields.id].toString()
                : null;
            var childIsCheck = childItems[parseInt(i.toString(), 10)][this.fields.isChecked]
                ? childItems[parseInt(i.toString(), 10)][this.fields.isChecked].toString()
                : null;
            if (this.checkedNodes.indexOf(childId) !== -1 && !doCheck) {
                this.checkedNodes.splice(this.checkedNodes.indexOf(childId), 1);
            }
            if (this.checkedNodes.indexOf(childId) === -1 && doCheck) {
                this.checkDisabledState(childId, childItems[i]);
            }
            if (childIsCheck === 'true' && !doCheck) {
                this.updateField(this.treeData, this.fields, childId, 'isChecked', null);
            }
            var subChildItems = this.getChildNodes(this.treeData, childId);
            if (subChildItems.length > 0) {
                this.getChildItems(subChildItems, doCheck);
            }
        }
    };
    /**
     * Update checkedNodes when UI interaction happens before the child node renders in DOM for hierarchical DS
     *
     * @param {Object[]} childItems - Array of child items
     * @param {string} parent - Parent identifier
     * @param {Element} childElement - Child DOM element
     * @param {boolean} [doCheck] - Optional parameter to specify whether to perform a check
     * @returns {void}
     */
    TreeView.prototype.childStateChange = function (childItems, parent, childElement, doCheck) {
        for (var i = 0; i < childItems.length; i++) {
            var checkedChild = childItems[parseInt(i.toString(), 10)][this.fields.id] ? childItems[parseInt(i.toString(), 10)][this.fields.id].toString() : '';
            var isCheck = childItems[parseInt(i.toString(), 10)][this.fields.isChecked]
                ? childItems[parseInt(i.toString(), 10)][this.fields.isChecked].toString()
                : null;
            if (this.autoCheck) {
                if (this.checkedNodes.indexOf(parent) !== -1 && this.checkedNodes.indexOf(checkedChild) === -1) {
                    this.checkDisabledState(checkedChild, childItems[i]);
                    if (this.parentNodeCheck.indexOf(checkedChild) !== -1) {
                        this.parentNodeCheck.splice(this.parentNodeCheck.indexOf(checkedChild), 1);
                    }
                }
                else if (this.checkedNodes.indexOf(parent) === -1 && this.checkedNodes.indexOf(checkedChild) !== -1 && !doCheck) {
                    this.checkedNodes.splice(this.checkedNodes.indexOf(checkedChild), 1);
                    if (isCheck === 'true') {
                        this.updateField(this.treeData, this.fields, checkedChild, 'isChecked', null);
                    }
                }
            }
            else if (!this.autoCheck) {
                if (!doCheck) {
                    if (this.checkedNodes.indexOf(checkedChild) !== -1) {
                        this.checkedNodes.splice(this.checkedNodes.indexOf(checkedChild), 1);
                    }
                    this.updateField(this.treeData, this.fields, checkedChild, 'isChecked', null);
                    this.checkedNodes = [];
                }
                else {
                    if (this.checkedNodes.indexOf(checkedChild) === -1) {
                        this.checkDisabledState(checkedChild, childItems[i]);
                    }
                }
            }
            var subChild = this.getChildNodes([childItems[parseInt(i.toString(), 10)]], checkedChild);
            if (subChild) {
                this.childStateChange(subChild, parent, childElement, doCheck);
            }
        }
    };
    //This method can be used to get all child nodes of a parent by passing the children of a parent along with 'validateCheck' set to false
    TreeView.prototype.allCheckNode = function (child, newCheck, checked, childCheck, validateCheck) {
        if (child) {
            for (var length_1 = 0; length_1 < child.length; length_1++) {
                var childId = getValue(this.fields.id, child[parseInt(length_1.toString(), 10)]);
                var check = this.element.querySelector('[data-uid="' + childId + '"]');
                //Validates isChecked case while no UI interaction has been performed on the node or it's parent
                if (validateCheck !== false && this.checkedElement.indexOf(childId.toString()) === -1) {
                    if (((check === null && !isNOU(child[parseInt(length_1.toString(), 10)][this.fields.isChecked]) &&
                        newCheck.indexOf(childId.toString()) === -1)
                        || childCheck === 0 || checked === 2)) {
                        if (child[parseInt(length_1.toString(), 10)][this.fields.isChecked] !== false || checked === 2) {
                            newCheck.push(childId.toString());
                        }
                        else {
                            childCheck = null;
                        }
                        childCheck = (child[parseInt(length_1.toString(), 10)][this.fields.isChecked] !== false || checked === 2) ? 0 : null;
                    }
                }
                //Pushes child checked node done thro' UI interaction
                if (newCheck.indexOf(childId.toString()) === -1 && isNOU(checked)) {
                    newCheck.push(childId.toString());
                }
                var hierChildId = getValue(this.fields.child.toString(), child[parseInt(length_1.toString(), 10)]);
                //Gets if any next level children are available for child nodes
                if (getValue(this.fields.hasChildren, child[parseInt(length_1.toString(), 10)]) === true || hierChildId) {
                    var id = getValue(this.fields.id, child[parseInt(length_1.toString(), 10)]);
                    var childId_1 = void 0;
                    if (this.dataType === 1) {
                        childId_1 = this.getChildNodes(this.treeData, id.toString());
                    }
                    else {
                        childId_1 = hierChildId;
                    }
                    if (childId_1) {
                        if (isNOU(validateCheck)) {
                            this.allCheckNode(childId_1, newCheck, checked, childCheck);
                        }
                        else {
                            this.allCheckNode(childId_1, newCheck, checked, childCheck, validateCheck);
                        }
                        childCheck = null;
                    }
                }
                childCheck = null;
            }
        }
    };
    TreeView.prototype.openNode = function (toBeOpened, e) {
        var focusedNode = this.getFocusedNode();
        var icon = select('div.' + ICON, focusedNode);
        if (toBeOpened) {
            if (!icon) {
                return;
            }
            else if (icon.classList.contains(EXPANDABLE)) {
                this.expandAction(focusedNode, icon, e);
            }
            else {
                this.focusNextNode(focusedNode, true);
            }
        }
        else {
            if (icon && icon.classList.contains(COLLAPSIBLE)) {
                this.collapseNode(focusedNode, icon, e);
            }
            else {
                var parentLi = closest(closest(focusedNode, '.' + PARENTITEM), '.' + LISTITEM);
                if (!parentLi) {
                    return;
                }
                else {
                    if (!parentLi.classList.contains('e-disable')) {
                        this.setFocus(focusedNode, parentLi);
                        this.navigateToFocus(true);
                    }
                }
            }
        }
    };
    TreeView.prototype.navigateNode = function (isTowards) {
        var focusedNode = this.getFocusedNode();
        this.focusNextNode(focusedNode, isTowards);
    };
    TreeView.prototype.navigateRootNode = function (isBackwards) {
        var focusedNode = this.getFocusedNode();
        var rootNode = isBackwards ? this.getRootNode() : this.getEndNode();
        if (!rootNode.classList.contains('e-disable')) {
            this.setFocus(focusedNode, rootNode);
            this.navigateToFocus(isBackwards);
        }
    };
    TreeView.prototype.getFocusedNode = function () {
        var selectedItem;
        var fNode = select('.' + LISTITEM + '[tabindex="0"]', this.element);
        if (!isNOU(fNode)) {
            var ariaChecked = fNode.getAttribute('aria-checked');
            if (ariaChecked === 'mixed' || ariaChecked === 'false') {
                this.isFilter = false;
            }
        }
        if (isNOU(fNode)) {
            selectedItem = select('.' + LISTITEM, this.element);
        }
        return isNOU(fNode) ? (isNOU(selectedItem) ? this.element.firstElementChild : selectedItem) : fNode;
    };
    TreeView.prototype.focusNextNode = function (li, isTowards) {
        var nextNode = isTowards ? this.getNextNode(li) : this.getPrevNode(li);
        this.setFocus(li, nextNode);
        this.navigateToFocus(!isTowards);
        if (nextNode.classList.contains('e-disable')) {
            var lastChild = nextNode.lastChild;
            if (nextNode.previousSibling == null && nextNode.classList.contains('e-level-1')) {
                this.focusNextNode(nextNode, true);
            }
            else if (nextNode.nextSibling == null && nextNode.classList.contains('e-node-collapsed')) {
                this.focusNextNode(nextNode, false);
            }
            else if (nextNode.nextSibling == null && lastChild.classList.contains(TEXTWRAP)) {
                this.focusNextNode(nextNode, false);
            }
            else {
                this.focusNextNode(nextNode, isTowards);
            }
        }
    };
    TreeView.prototype.getNextNode = function (li) {
        var index = this.liList.indexOf(li);
        var nextNode;
        do {
            index++;
            nextNode = this.liList[parseInt(index.toString(), 10)];
            if (isNOU(nextNode)) {
                return li;
            }
        } while (!isVisible(nextNode));
        return nextNode;
    };
    TreeView.prototype.getPrevNode = function (li) {
        var index = this.liList.indexOf(li);
        var prevNode;
        do {
            index--;
            prevNode = this.liList[parseInt(index.toString(), 10)];
            if (isNOU(prevNode)) {
                return li;
            }
        } while (!isVisible(prevNode));
        return prevNode;
    };
    TreeView.prototype.getRootNode = function () {
        var index = 0;
        var rootNode;
        do {
            rootNode = this.liList[parseInt(index.toString(), 10)];
            index++;
        } while (!isVisible(rootNode));
        return rootNode;
    };
    TreeView.prototype.getEndNode = function () {
        var index = this.liList.length - 1;
        var endNode;
        do {
            endNode = this.liList[parseInt(index.toString(), 10)];
            index--;
        } while (!isVisible(endNode));
        return endNode;
    };
    TreeView.prototype.setFocus = function (preNode, nextNode) {
        removeClass([preNode], FOCUS);
        preNode.setAttribute('tabindex', '-1');
        if (!nextNode.classList.contains('e-disable')) {
            addClass([nextNode], FOCUS);
            nextNode.setAttribute('tabindex', '0');
            nextNode.focus();
            EventHandler.add(nextNode, 'blur', this.focusOut, this);
            this.updateIdAttr(preNode, nextNode);
        }
    };
    TreeView.prototype.updateIdAttr = function (preNode, nextNode) {
        this.element.removeAttribute('aria-activedescendant');
        if (preNode) {
            preNode.removeAttribute('id');
        }
        nextNode.setAttribute('id', this.element.id + '_active');
        this.element.setAttribute('aria-activedescendant', this.element.id + '_active');
    };
    TreeView.prototype.focusIn = function () {
        if (!this.mouseDownStatus) {
            var focusedElement = this.getFocusedNode();
            if (focusedElement.classList.contains('e-disable')) {
                focusedElement.setAttribute('tabindex', '-1');
                this.navigateNode(true);
            }
            else {
                focusedElement.setAttribute('tabindex', '0');
                addClass([focusedElement], FOCUS);
                EventHandler.add(focusedElement, 'blur', this.focusOut, this);
            }
            this.mouseDownStatus = false;
        }
    };
    TreeView.prototype.focusOut = function (event) {
        var focusedElement = this.getFocusedNode();
        if (event.target === focusedElement) {
            removeClass([focusedElement], FOCUS);
            EventHandler.remove(focusedElement, 'blur', this.focusOut);
        }
    };
    TreeView.prototype.onMouseOver = function (e) {
        if (Browser.isDevice) {
            return;
        }
        var target = e.target;
        var classList = target.classList;
        var currentLi = closest(target, '.' + LISTITEM);
        if (!currentLi || classList.contains(PARENTITEM) || classList.contains(LISTITEM)) {
            this.removeHover();
            return;
        }
        else {
            if (currentLi && !currentLi.classList.contains('e-disable')) {
                this.setHover(currentLi);
            }
        }
    };
    TreeView.prototype.setHover = function (li) {
        if (!li.classList.contains(HOVER) && !li.classList.contains(PREVENTSELECT)) {
            this.removeHover();
            addClass([li], HOVER);
        }
    };
    TreeView.prototype.onMouseLeave = function () {
        this.removeHover();
    };
    TreeView.prototype.removeHover = function () {
        var hoveredNode = selectAll('.' + HOVER, this.element);
        if (hoveredNode && hoveredNode.length) {
            removeClass(hoveredNode, HOVER);
        }
    };
    TreeView.prototype.getNodeData = function (currLi, fromDS) {
        if (!isNOU(currLi) && currLi.classList.contains(LISTITEM) &&
            !isNOU(closest(currLi, '.' + CONTROL)) && closest(currLi, '.' + CONTROL).classList.contains(ROOT)) {
            var id = currLi.getAttribute('data-uid');
            var text = this.getText(currLi, fromDS);
            var pNode = closest(currLi.parentNode, '.' + LISTITEM);
            var pid = pNode ? pNode.getAttribute('data-uid') : null;
            var selected = currLi.classList.contains(ACTIVE);
            var selectable = currLi.classList.contains(PREVENTSELECT) ? false : true;
            var expanded = (currLi.getAttribute('aria-expanded') === 'true') ? true : false;
            var hasChildren = currLi.getAttribute('aria-expanded') !== null ? true : (select('.' + EXPANDABLE, currLi) || select('.' + COLLAPSIBLE, currLi)) != null ? true : false;
            var checked = null;
            var checkboxElement = select('.' + CHECKBOXWRAP, currLi);
            if (this.showCheckBox && checkboxElement) {
                checked = currLi.getAttribute('aria-checked');
            }
            return {
                id: id, text: text, parentID: pid, selected: selected, selectable: selectable, expanded: expanded,
                isChecked: checked, hasChildren: hasChildren
            };
        }
        return { id: '', text: '', parentID: '', selected: false, expanded: false, isChecked: '', hasChildren: false };
    };
    TreeView.prototype.getText = function (currLi, fromDS) {
        if (fromDS) {
            var nodeData = this.getNodeObject(currLi.getAttribute('data-uid'));
            var level = parseFloat(currLi.getAttribute('aria-level'));
            var nodeFields = this.getFields(this.fields, level, 1);
            return getValue(nodeFields.text, nodeData);
        }
        return select('.' + LISTTEXT, currLi).textContent;
    };
    TreeView.prototype.getExpandEvent = function (currLi, e) {
        var nodeData = this.getNodeData(currLi);
        return { cancel: false, isInteracted: isNOU(e) ? false : true, node: currLi, nodeData: nodeData, event: e };
    };
    TreeView.prototype.renderNodeTemplate = function (data, textEle, dataId) {
        var tempArr = this.nodeTemplateFn(data, this, 'nodeTemplate' + dataId, this.element.id + 'nodeTemplate', this.isStringTemplate, undefined, textEle, this.root);
        if (tempArr) {
            tempArr = Array.prototype.slice.call(tempArr);
            append(tempArr, textEle);
        }
    };
    TreeView.prototype.destroyTemplate = function (liEle) {
        this.clearTemplate(['nodeTemplate' + liEle.getAttribute('data-uid')]);
    };
    TreeView.prototype.reRenderNodes = function () {
        this.updateListProp(this.fields);
        if (Browser.isIE) {
            this.ulElement = this.element.querySelector('.e-list-parent.e-ul');
            this.ulElement.parentElement.removeChild(this.ulElement);
        }
        else {
            this.element.innerHTML = '';
        }
        if (!isNOU(this.nodeTemplateFn)) {
            this.clearTemplate();
        }
        this.setTouchClass();
        this.setProperties({ selectedNodes: [], checkedNodes: [], expandedNodes: [] }, true);
        this.checkedElement = [];
        this.isLoaded = false;
        this.setDataBinding(true);
    };
    TreeView.prototype.setCssClass = function (oldClass, newClass) {
        if (!isNOU(oldClass) && oldClass !== '') {
            removeClass([this.element], oldClass.split(' '));
        }
        if (!isNOU(newClass) && newClass !== '') {
            addClass([this.element], newClass.split(' '));
        }
    };
    TreeView.prototype.editingHandler = function (e) {
        var target = e.target;
        if (!target || target.classList.contains(ROOT) || target.classList.contains(PARENTITEM) ||
            target.classList.contains(LISTITEM) || target.classList.contains(ICON) ||
            target.classList.contains(INPUT) || target.classList.contains(INPUTGROUP)) {
            return;
        }
        else {
            var liEle = closest(target, '.' + LISTITEM);
            this.createTextbox(liEle);
        }
    };
    TreeView.prototype.createTextbox = function (liEle) {
        var _this = this;
        var oldInpEle = select('.' + TREEINPUT, this.element);
        if (oldInpEle) {
            oldInpEle.blur();
        }
        var textEle = select('.' + LISTTEXT, liEle);
        this.updateOldText(liEle);
        var innerEle = this.createElement('input', { className: TREEINPUT, attrs: { value: this.oldText } });
        var eventArgs = this.getEditEvent(liEle, null, innerEle.outerHTML);
        this.trigger('nodeEditing', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                var inpWidth = textEle.offsetWidth + 5;
                var widthSize_1 = inpWidth + 'px';
                addClass([liEle], EDITING);
                if (!isNOU(_this.nodeTemplateFn)) {
                    _this.destroyTemplate(liEle);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (_this.isReact) {
                    setTimeout(function () {
                        _this.renderTextBox(eventArgs, textEle, widthSize_1);
                    }, 5);
                }
                else {
                    _this.renderTextBox(eventArgs, textEle, widthSize_1);
                }
            }
        });
    };
    TreeView.prototype.renderTextBox = function (eventArgs, textEle, widthSize) {
        textEle.innerHTML = eventArgs.innerHtml;
        var inpEle = select('.' + TREEINPUT, textEle);
        this.inputObj = Input.createInput({
            element: inpEle,
            properties: {
                enableRtl: this.enableRtl
            }
        }, this.createElement);
        this.inputObj.container.style.width = widthSize;
        inpEle.focus();
        var inputEle = inpEle;
        inputEle.setSelectionRange(0, inputEle.value.length);
        this.wireInputEvents(inpEle);
    };
    TreeView.prototype.updateOldText = function (liEle) {
        var id = liEle.getAttribute('data-uid');
        this.editData = this.getNodeObject(id);
        var level = parseFloat(liEle.getAttribute('aria-level'));
        this.editFields = this.getFields(this.fields, level, 1);
        this.oldText = getValue(this.editFields.text, this.editData);
    };
    TreeView.prototype.inputFocusOut = function (e) {
        if (!select('.' + TREEINPUT, this.element)) {
            return;
        }
        var target = e.target;
        var newText = target.value;
        var txtEle = closest(target, '.' + LISTTEXT);
        var liEle = closest(target, '.' + LISTITEM);
        detach(this.inputObj.container);
        Input.destroy({ element: target, properties: this.properties });
        if (this.fields.dataSource instanceof DataManager && !this.isOffline) {
            this.crudOperation('update', null, liEle, newText, null, null, true);
        }
        else {
            this.appendNewText(liEle, txtEle, newText, true);
        }
        EventHandler.remove(target, 'blur', this.inputFocusOut);
        this.inputObj = null;
        detach(target);
        target = null;
    };
    TreeView.prototype.appendNewText = function (liEle, txtEle, newText, isInput) {
        var _this = this;
        var eventArgs = this.getEditEvent(liEle, newText, null);
        this.trigger('nodeEdited', eventArgs, function (observedArgs) {
            newText = observedArgs.cancel ? observedArgs.oldText : observedArgs.newText;
            _this.updateText(liEle, txtEle, newText, isInput);
            if (observedArgs.oldText !== newText) {
                _this.triggerEvent('nodeEdited', [_this.getNode(liEle)]);
            }
        });
    };
    TreeView.prototype.updateText = function (liEle, txtEle, newText, isInput) {
        var newData = setValue(this.editFields.text, newText, this.editData);
        if (!isNOU(this.nodeTemplateFn)) {
            txtEle.innerText = '';
            var dataId = liEle.getAttribute('data-uid');
            this.renderNodeTemplate(newData, txtEle, dataId);
            this.renderReactTemplates();
        }
        else {
            if (this.enableHtmlSanitizer) {
                txtEle.innerText = SanitizeHtmlHelper.sanitize(newText);
            }
            else {
                txtEle.innerHTML = newText;
            }
        }
        if (isInput) {
            removeClass([liEle], EDITING);
            liEle.focus();
            EventHandler.add(liEle, 'blur', this.focusOut, this);
            addClass([liEle], FOCUS);
        }
        if (this.allowTextWrap) {
            this.calculateWrap(liEle);
        }
    };
    TreeView.prototype.getElement = function (ele) {
        if (isNOU(ele)) {
            return null;
        }
        else if (typeof ele === 'string') {
            return this.element.querySelector('[data-uid="' + ele + '"]');
        }
        else if (typeof ele === 'object') {
            return getElement(ele);
        }
        else {
            return null;
        }
    };
    TreeView.prototype.getId = function (ele) {
        if (isNOU(ele)) {
            return null;
        }
        else if (typeof ele === 'string') {
            return ele;
        }
        else if (typeof ele === 'object') {
            return (getElement(ele)).getAttribute('data-uid');
        }
        else {
            return null;
        }
    };
    TreeView.prototype.getEditEvent = function (liEle, newText, inpEle) {
        var data = this.getNodeData(liEle);
        return { cancel: false, newText: newText, node: liEle, nodeData: data, oldText: this.oldText, innerHtml: inpEle };
    };
    TreeView.prototype.getNodeObject = function (id) {
        var childNodes;
        if (isNOU(id)) {
            return childNodes;
        }
        else if (this.dataType === 1) {
            for (var i = 0, objlen = this.treeData.length; i < objlen; i++) {
                var dataId = getValue(this.fields.id, this.treeData[parseInt(i.toString(), 10)]);
                if (!isNOU(this.treeData[parseInt(i.toString(), 10)]) && !isNOU(dataId) && dataId.toString() === id) {
                    return this.treeData[parseInt(i.toString(), 10)];
                }
            }
        }
        else {
            return this.getChildNodeObject(this.treeData, this.fields, id);
        }
        return childNodes;
    };
    TreeView.prototype.getChildNodeObject = function (obj, mapper, id) {
        var newList;
        if (isNOU(obj)) {
            return newList;
        }
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            var dataId = getValue(mapper.id, obj[parseInt(i.toString(), 10)]);
            if (obj[parseInt(i.toString(), 10)] && dataId && dataId.toString() === id) {
                return obj[parseInt(i.toString(), 10)];
            }
            else if (typeof mapper.child === 'string' && !isNOU(getValue(mapper.child, obj[parseInt(i.toString(), 10)]))) {
                var childData = getValue(mapper.child, obj[parseInt(i.toString(), 10)]);
                newList = this.getChildNodeObject(childData, this.getChildMapper(mapper), id);
                if (newList !== undefined) {
                    break;
                }
            }
            else if (this.fields.dataSource instanceof DataManager && !isNOU(getValue('child', obj[parseInt(i.toString(), 10)]))) {
                var child = 'child';
                newList = this.getChildNodeObject(getValue(child, obj[parseInt(i.toString(), 10)]), this.getChildMapper(mapper), id);
                if (newList !== undefined) {
                    break;
                }
            }
            else if (this.isChildObject()) {
                var children = 'child';
                var childData = getValue(children, obj[parseInt(i.toString(), 10)]);
                newList = this.getChildNodeObject(childData, this.getChildMapper(mapper), id);
                if (newList !== undefined) {
                    break;
                }
            }
        }
        return newList;
    };
    TreeView.prototype.setDragAndDrop = function (toBind) {
        if (toBind && !this.disabled) {
            this.initializeDrag();
        }
        else {
            this.destroyDrag();
        }
    };
    TreeView.prototype.initializeDrag = function () {
        var _this = this;
        var virtualEle;
        this.dragObj = new Draggable(this.element, {
            enableTailMode: true, enableAutoScroll: true,
            dragArea: this.dragArea,
            dragTarget: '.' + TEXTWRAP,
            enableTapHold: true,
            tapHoldThreshold: 100,
            helper: function (e) {
                _this.dragTarget = e.sender.target;
                var dragRoot = closest(_this.dragTarget, '.' + ROOT);
                var dragWrap = closest(_this.dragTarget, '.' + TEXTWRAP);
                _this.dragLi = closest(_this.dragTarget, '.' + LISTITEM);
                if (_this.fullRowSelect && !dragWrap && _this.dragTarget.classList.contains(FULLROW)) {
                    dragWrap = _this.dragTarget.nextElementSibling;
                }
                if (!_this.dragTarget || !e.element.isSameNode(dragRoot) || !dragWrap ||
                    _this.dragTarget.classList.contains(ROOT) || _this.dragTarget.classList.contains(PARENTITEM) ||
                    _this.dragTarget.classList.contains(LISTITEM) || _this.dragLi.classList.contains('e-disable')) {
                    return false;
                }
                var cloneEle = (dragWrap.cloneNode(true));
                if (isNOU(select('div.' + ICON, cloneEle))) {
                    var icon = _this.createElement('div', { className: ICON + ' ' + EXPANDABLE });
                    cloneEle.insertBefore(icon, cloneEle.children[0]);
                }
                var cssClass = DRAGITEM + ' ' + ROOT + ' ' + _this.cssClass + ' ' + (_this.enableRtl ? RTL : '');
                virtualEle = _this.createElement('div', { className: cssClass });
                virtualEle.appendChild(cloneEle);
                var nLen = _this.selectedNodes.length;
                if (nLen > 1 && _this.allowMultiSelection && _this.dragLi.classList.contains(ACTIVE)) {
                    var cNode = _this.createElement('span', { className: DROPCOUNT, innerHTML: '' + nLen });
                    virtualEle.appendChild(cNode);
                }
                document.body.appendChild(virtualEle);
                document.body.style.cursor = '';
                _this.dragData = _this.getNodeData(_this.dragLi);
                return virtualEle;
            },
            dragStart: function (e) {
                addClass([_this.element], DRAGGING);
                var listItem = closest(e.target, '.e-list-item');
                var level;
                if (listItem) {
                    level = parseInt(listItem.getAttribute('aria-level'), 10);
                }
                var eventArgs = _this.getDragEvent(e.event, _this, null, e.target, null, virtualEle, level);
                if (eventArgs.draggedNode.classList.contains(EDITING)) {
                    _this.dragObj.intDestroy(e.event);
                    _this.dragCancelAction(virtualEle);
                }
                else {
                    _this.trigger('nodeDragStart', eventArgs, function (observedArgs) {
                        if (observedArgs.cancel) {
                            _this.dragObj.intDestroy(e.event);
                            _this.dragCancelAction(virtualEle);
                        }
                        else {
                            _this.dragStartAction = true;
                        }
                    });
                }
            },
            drag: function (e) {
                _this.dragObj.setProperties({ cursorAt: { top: (!isNOU(e.event.targetTouches) || Browser.isDevice) ? 60 : -20 } });
                _this.dragAction(e, virtualEle);
            },
            dragStop: function (e) {
                removeClass([_this.element], DRAGGING);
                if (!e.target.classList.contains('e-sibling')) {
                    _this.removeVirtualEle();
                }
                var dropTarget = e.target;
                var preventTargetExpand = false;
                var dropRoot = (closest(dropTarget, '.' + DROPPABLE));
                // eslint-disable-next-line
                var isHelperElement = true;
                if (!dropTarget || !dropRoot) {
                    detach(e.helper);
                    document.body.style.cursor = '';
                }
                var listItem = closest(dropTarget, '.e-list-item');
                var level;
                if (listItem) {
                    level = parseInt(listItem.getAttribute('aria-level'), 10);
                }
                var eventArgs = _this.getDragEvent(e.event, _this, dropTarget, dropTarget, null, e.helper, level);
                eventArgs.preventTargetExpand = preventTargetExpand;
                _this.trigger('nodeDragStop', eventArgs, function (observedArgs) {
                    _this.dragParent = observedArgs.draggedParentNode;
                    _this.preventExpand = observedArgs.preventTargetExpand;
                    if (observedArgs.cancel) {
                        if (e.helper.parentNode) {
                            detach(e.helper);
                        }
                        document.body.style.cursor = '';
                        isHelperElement = false;
                        if (dropTarget.classList.contains('e-sibling')) {
                            _this.removeVirtualEle();
                        }
                    }
                    _this.dragStartAction = false;
                });
            }
        });
        this.dropObj = new Droppable(this.element, {
            out: function (e) {
                if (!isNOU(e) && !e.target.classList.contains(SIBLING) &&
                    (_this.dropObj.dragData.default && _this.dropObj.dragData.default.helper.classList.contains(ROOT))) {
                    document.body.style.cursor = 'not-allowed';
                }
            },
            over: function () {
                document.body.style.cursor = '';
            },
            drop: function (e) {
                _this.dropAction(e);
                _this.removeVirtualEle();
            }
        });
    };
    TreeView.prototype.dragCancelAction = function (virtualEle) {
        detach(virtualEle);
        removeClass([this.element], DRAGGING);
        this.dragStartAction = false;
    };
    TreeView.prototype.getOffsetX = function (event, target) {
        var touchList = event.changedTouches;
        if (touchList && touchList.length > 0) {
            return touchList[0].clientX - target.getBoundingClientRect().left;
        }
        else {
            return event.offsetX;
        }
    };
    TreeView.prototype.getOffsetY = function (event, target) {
        var touchList = event.changedTouches;
        if (touchList && touchList.length > 0) {
            return touchList[0].clientY - target.getBoundingClientRect().top;
        }
        else {
            return event.offsetY;
        }
    };
    TreeView.prototype.dragAction = function (e, virtualEle) {
        var dropRoot = closest(e.target, '.' + DROPPABLE);
        var dropWrap = closest(e.target, '.' + TEXTWRAP);
        var icon = select('div.' + ICON, virtualEle);
        removeClass([icon], [DROPIN, DROPNEXT, DROPOUT, NODROP]);
        this.isDropIn = false;
        this.removeVirtualEle();
        document.body.style.cursor = '';
        var classList = e.target.classList;
        var event = e.event;
        var offsetY = this.getOffsetY(event, e.target);
        var offsetX = this.getOffsetX(event, e.target);
        if (this.fullRowSelect && !dropWrap && !isNOU(classList) && classList.contains(FULLROW)) {
            dropWrap = e.target.nextElementSibling;
        }
        if (dropRoot) {
            var dropLi = closest(e.target, '.' + LISTITEM);
            var checkWrapper = closest(e.target, '.' + CHECKBOXWRAP);
            var collapse = closest(e.target, '.' + COLLAPSIBLE);
            var expand = closest(e.target, '.' + EXPANDABLE);
            if (!dropRoot.classList.contains(ROOT) || (dropWrap &&
                (!dropLi.isSameNode(this.dragLi) && !this.isDescendant(this.dragLi, dropLi)))) {
                if (this.hasTemplate && dropLi) {
                    var templateTarget = select(this.fullRowSelect ? '.' + FULLROW : '.' + TEXTWRAP, dropLi);
                    if ((e && (!expand && !collapse) && offsetY < 7 && !checkWrapper) ||
                        (((expand && offsetY < 5) || (collapse && offsetX < 3)))) {
                        var index = this.fullRowSelect ? (1) : (0);
                        this.appendIndicator(dropLi, icon, index);
                    }
                    else if ((e && (!expand && !collapse) &&
                        !checkWrapper && templateTarget && offsetY > templateTarget.offsetHeight - 10) ||
                        ((expand && offsetY > 19) || (collapse && offsetX > 19))) {
                        var index = this.fullRowSelect ? (2) : (1);
                        this.appendIndicator(dropLi, icon, index);
                    }
                    else {
                        addClass([icon], DROPIN);
                        this.isDropIn = true;
                    }
                }
                else {
                    if ((dropLi && e && (!expand && !collapse) && (offsetY < 7) && !checkWrapper) ||
                        (((expand && offsetY < 5) || (collapse && offsetX < 3)))) {
                        var index = this.fullRowSelect ? (1) : (0);
                        this.appendIndicator(dropLi, icon, index);
                    }
                    else if ((dropLi && e && (!expand && !collapse) &&
                        (e.target.offsetHeight > 0 && offsetY > (e.target.offsetHeight - 10)) && !checkWrapper) ||
                        (((expand && offsetY > 19) || (collapse && offsetX > 19)))) {
                        var index = this.fullRowSelect ? (2) : (1);
                        this.appendIndicator(dropLi, icon, index);
                    }
                    else {
                        addClass([icon], DROPIN);
                        this.isDropIn = true;
                    }
                }
            }
            else if (e.target.nodeName === 'LI' && (!dropLi.isSameNode(this.dragLi) && !this.isDescendant(this.dragLi, dropLi))) {
                addClass([icon], DROPNEXT);
                this.renderVirtualEle(e);
            }
            else if (e.target.classList.contains(SIBLING)) {
                addClass([icon], DROPNEXT);
            }
            else {
                addClass([icon], DROPOUT);
            }
        }
        else {
            addClass([icon], NODROP);
            document.body.style.cursor = 'not-allowed';
        }
        var listItem = closest(e.target, '.e-list-item');
        var level;
        if (listItem) {
            level = parseInt(listItem.getAttribute('aria-level'), 10);
        }
        var eventArgs = this.getDragEvent(e.event, this, e.target, e.target, null, virtualEle, level);
        if (eventArgs.dropIndicator) {
            removeClass([icon], eventArgs.dropIndicator);
        }
        this.trigger('nodeDragging', eventArgs);
        if (eventArgs.dropIndicator) {
            addClass([icon], eventArgs.dropIndicator);
        }
    };
    TreeView.prototype.appendIndicator = function (dropLi, icon, index) {
        addClass([icon], DROPNEXT);
        var virEle = this.createElement('div', { className: SIBLING });
        dropLi.insertBefore(virEle, dropLi.children[parseInt(index.toString(), 10)]);
    };
    TreeView.prototype.dropAction = function (e) {
        var event = e.event;
        var offsetY = this.getOffsetY(event, e.target);
        var dropTarget = e.target;
        var dragObj;
        var level;
        var drop = false;
        var nodeData = [];
        var liArray = [];
        var dragInstance = e.dragData.draggable;
        for (var i = 0; i < dragInstance.ej2_instances.length; i++) {
            if (dragInstance.ej2_instances[parseInt(i.toString(), 10)] instanceof TreeView_1) {
                dragObj = dragInstance.ej2_instances[parseInt(i.toString(), 10)];
                break;
            }
        }
        if (dragObj && dragObj.dragTarget) {
            var dragTarget = dragObj.dragTarget;
            var dragLi = (closest(dragTarget, '.' + LISTITEM));
            var dropLi = (closest(dropTarget, '.' + LISTITEM));
            liArray.push(dragLi);
            if (dropLi == null && dropTarget.classList.contains(ROOT)) {
                dropLi = dropTarget.firstElementChild;
            }
            detach(e.droppedElement);
            document.body.style.cursor = '';
            if (!dropLi || dropLi.isSameNode(dragLi) || this.isDescendant(dragLi, dropLi)) {
                if (this.fields.dataSource instanceof DataManager === false) {
                    this.preventExpand = false;
                }
                return;
            }
            if (dragObj.allowMultiSelection && dragLi.classList.contains(ACTIVE)) {
                var sNodes = selectAll('.' + ACTIVE, dragObj.element);
                liArray = sNodes;
                if (e.target.offsetHeight <= 33 && offsetY > e.target.offsetHeight - 10 && offsetY > 6) {
                    for (var i = sNodes.length - 1; i >= 0; i--) {
                        if (dropLi.isSameNode(sNodes[parseInt(i.toString(), 10)]) ||
                            this.isDescendant(sNodes[parseInt(i.toString(), 10)], dropLi)) {
                            continue;
                        }
                        this.appendNode(dropTarget, sNodes[parseInt(i.toString(), 10)], dropLi, e, dragObj, offsetY);
                    }
                }
                else {
                    for (var i = 0; i < sNodes.length; i++) {
                        if (dropLi.isSameNode(sNodes[parseInt(i.toString(), 10)]) ||
                            this.isDescendant(sNodes[parseInt(i.toString(), 10)], dropLi)) {
                            continue;
                        }
                        this.appendNode(dropTarget, sNodes[parseInt(i.toString(), 10)], dropLi, e, dragObj, offsetY);
                    }
                }
            }
            else {
                this.appendNode(dropTarget, dragLi, dropLi, e, dragObj, offsetY);
            }
            level = parseInt(dragLi.getAttribute('aria-level'), 10);
            drop = true;
        }
        if (this.fields.dataSource instanceof DataManager === false) {
            this.preventExpand = false;
        }
        for (var i = 0; i < liArray.length; i++) {
            nodeData.push(this.getNode(liArray[parseInt(i.toString(), 10)]));
        }
        this.trigger('nodeDropped', this.getDragEvent(e.event, dragObj, dropTarget, e.target, e.dragData.draggedElement, null, level, drop));
        if (dragObj.element.id !== this.element.id) {
            dragObj.triggerEvent('nodeDropped', nodeData);
            this.isNodeDropped = true;
            this.fields.dataSource = this.treeData;
        }
        this.triggerEvent('nodeDropped', nodeData);
    };
    TreeView.prototype.appendNode = function (dropTarget, dragLi, dropLi, e, dragObj, offsetY) {
        var checkWrapper = closest(dropTarget, '.' + CHECKBOXWRAP);
        var collapse = closest(e.target, '.' + COLLAPSIBLE);
        var expand = closest(e.target, '.' + EXPANDABLE);
        if (!dragLi.classList.contains('e-disable') && !checkWrapper && ((expand && e.event.offsetY < 5) || (collapse && e.event.offsetX < 3) || (expand && e.event.offsetY > 19) || (collapse && e.event.offsetX > 19) || (!expand && !collapse))) {
            if (dropTarget.nodeName === 'LI') {
                this.dropAsSiblingNode(dragLi, dropLi, e, dragObj);
            }
            else if (dropTarget.firstElementChild && dropTarget.classList.contains(ROOT)) {
                if (dropTarget.firstElementChild.nodeName === 'UL') {
                    this.dropAsSiblingNode(dragLi, dropLi, e, dragObj);
                }
            }
            else if ((dropTarget.classList.contains('e-icon-collapsible')) || (dropTarget.classList.contains('e-icon-expandable'))) {
                this.dropAsSiblingNode(dragLi, dropLi, e, dragObj);
            }
            else {
                this.dropAsChildNode(dragLi, dropLi, dragObj, null, e, offsetY, null, dropTarget);
            }
        }
        else {
            this.dropAsChildNode(dragLi, dropLi, dragObj, null, e, offsetY, true, dropTarget);
        }
        if (this.showCheckBox) {
            this.ensureIndeterminate();
        }
    };
    TreeView.prototype.dropAsSiblingNode = function (dragLi, dropLi, e, dragObj) {
        var dropUl = closest(dropLi, '.' + PARENTITEM);
        var dragParentUl = closest(dragLi, '.' + PARENTITEM);
        var dragParentLi = closest(dragParentUl, '.' + LISTITEM);
        var pre;
        if (e.target.offsetHeight > 0 && e.event.offsetY > e.target.offsetHeight - 2) {
            pre = false;
        }
        else if (e.event.offsetY < 2) {
            pre = true;
        }
        else if (e.target.classList.contains('e-icon-expandable') || (e.target.classList.contains('e-icon-collapsible'))) {
            if ((e.event.offsetY < 5) || (e.event.offsetX < 3)) {
                pre = true;
            }
            else if ((e.event.offsetY > 15) || (e.event.offsetX > 17)) {
                pre = false;
            }
        }
        if ((e.target.classList.contains('e-icon-expandable')) || (e.target.classList.contains('e-icon-collapsible'))) {
            var target = e.target.closest('li');
            dropUl.insertBefore(dragLi, pre ? target : target.nextElementSibling);
        }
        else {
            dropUl.insertBefore(dragLi, pre ? e.target : e.target.nextElementSibling);
        }
        this.moveData(dragLi, dropLi, dropUl, pre, dragObj);
        this.updateElement(dragParentUl, dragParentLi);
        this.updateAriaLevel(dragLi);
        if (dragObj.element.id === this.element.id) {
            this.updateList();
        }
        else {
            dragObj.updateInstance();
            this.updateInstance();
        }
    };
    TreeView.prototype.dropAsChildNode = function (dragLi, dropLi, dragObj, index, e, pos, isCheck, dropTarget) {
        var dragParentUl = closest(dragLi, '.' + PARENTITEM);
        var dragParentLi = closest(dragParentUl, '.' + LISTITEM);
        var dropParentUl = closest(dropLi, '.' + PARENTITEM);
        var templateTarget;
        if (e && e.target) {
            templateTarget = select(this.fullRowSelect ? '.' + FULLROW : '.' + TEXTWRAP, dropLi);
        }
        if (e && ((pos < 7 && !dropTarget.classList.contains('e-sibling')) || (dropTarget.classList.contains('e-sibling') && !dropLi.lastChild.classList.contains('e-sibling'))) && !isCheck) {
            dropParentUl.insertBefore(dragLi, dropLi);
            this.moveData(dragLi, dropLi, dropParentUl, true, dragObj);
        }
        else if (e && (e.target.offsetHeight > 0 && pos > (e.target.offsetHeight - 10)) && !isCheck && !this.hasTemplate) {
            dropParentUl.insertBefore(dragLi, dropLi.nextElementSibling);
            this.moveData(dragLi, dropLi, dropParentUl, false, dragObj);
        }
        else if (this.hasTemplate && templateTarget && pos > templateTarget.offsetHeight - 10 && !isCheck) {
            dropParentUl.insertBefore(dragLi, dropLi.nextElementSibling);
            this.moveData(dragLi, dropLi, dropParentUl, false, dragObj);
        }
        else {
            var dropUl = this.expandParent(dropLi);
            var childLi = !isNullOrUndefined(index) ? dropUl.childNodes[parseInt(index.toString(), 10)] : null;
            dropUl.insertBefore(dragLi, childLi);
            this.moveData(dragLi, childLi, dropUl, true, dragObj);
        }
        this.updateElement(dragParentUl, dragParentLi);
        this.updateAriaLevel(dragLi);
        if (dragObj.element.id === this.element.id) {
            this.updateList();
        }
        else {
            dragObj.updateInstance();
            this.updateInstance();
        }
    };
    TreeView.prototype.moveData = function (dragLi, dropLi, dropUl, pre, dragObj) {
        var dropParentLi = closest(dropUl, '.' + LISTITEM);
        var id = this.getId(dragLi);
        var removedData = dragObj.updateChildField(dragObj.treeData, dragObj.fields, id, null, null, true);
        var refId = this.getId(dropLi);
        var index = this.getDataPos(this.treeData, this.fields, refId);
        var parentId = this.getId(dropParentLi);
        if (this.dataType === 1) {
            this.updateField(this.treeData, this.fields, parentId, 'hasChildren', true);
            var pos = isNOU(index) ? this.treeData.length : (pre ? index : index + 1);
            if (isNOU(parentId) && !this.hasPid) {
                delete removedData[0][this.fields.parentID];
            }
            else {
                var currPid = this.isNumberTypeId ? parseFloat(parentId) : parentId;
                setValue(this.fields.parentID, currPid, removedData[0]);
            }
            this.treeData.splice(pos, 0, removedData[0]);
            if (dragObj.element.id !== this.element.id) {
                var childData = dragObj.removeChildNodes(id);
                pos++;
                for (var i = 0, len = childData.length; i < len; i++) {
                    this.treeData.splice(pos, 0, childData[parseInt(i.toString(), 10)]);
                    pos++;
                }
                dragObj.groupedData = dragObj.getGroupedData(dragObj.treeData, dragObj.fields.parentID);
            }
            this.groupedData = this.getGroupedData(this.treeData, this.fields.parentID);
        }
        else {
            this.addChildData(this.treeData, this.fields, parentId, removedData, pre ? index : index + 1);
        }
    };
    TreeView.prototype.expandParent = function (dropLi) {
        var dropIcon = select('div.' + EXPANDABLE + ', div.' + COLLAPSIBLE, dropLi);
        if (dropIcon && dropIcon.classList.contains(EXPANDABLE) && this.preventExpand !== true) {
            this.expandAction(dropLi, dropIcon, null);
        }
        var dropUl = select('.' + PARENTITEM, dropLi);
        if (this.preventExpand === true && !dropUl && dropIcon) {
            this.renderChildNodes(dropLi);
        }
        dropUl = select('.' + PARENTITEM, dropLi);
        if (!isNOU(dropUl) && (this.preventExpand && !(dropLi.getAttribute('aria-expanded') === 'true'))) {
            dropUl.style.display = 'none';
        }
        if (!isNOU(dropUl) && this.preventExpand === false) {
            dropUl.style.display = 'block';
        }
        if (isNOU(dropUl) && this.preventExpand === true) {
            if (isNOU(dropIcon)) {
                ListBase.generateIcon(this.createElement, dropLi, EXPANDABLE, this.listBaseOption);
            }
            var icon = select('div.' + EXPANDABLE + ', div.' + COLLAPSIBLE, dropLi);
            if (icon) {
                icon.classList.add('e-icon-expandable');
            }
            dropUl = ListBase.generateUL(this.createElement, [], null, this.listBaseOption);
            dropLi.appendChild(dropUl);
            if (icon) {
                removeClass([icon], COLLAPSIBLE);
            }
            else {
                ListBase.generateIcon(this.createElement, dropLi, EXPANDABLE, this.listBaseOption);
            }
            dropLi.setAttribute('aria-expanded', 'false');
            dropUl.style.display = 'none';
        }
        if (isNOU(dropUl)) {
            var args = this.expandArgs;
            if (isNOU(args) || (args && args.name !== 'nodeExpanding')) {
                this.trigger('nodeExpanding', this.getExpandEvent(dropLi, null));
            }
            if (isNOU(dropIcon)) {
                ListBase.generateIcon(this.createElement, dropLi, COLLAPSIBLE, this.listBaseOption);
            }
            var icon = select('div.' + EXPANDABLE + ', div.' + COLLAPSIBLE, dropLi);
            if (icon) {
                removeClass([icon], EXPANDABLE);
            }
            else {
                ListBase.generateIcon(this.createElement, dropLi, COLLAPSIBLE, this.listBaseOption);
                icon = select('div.' + ICON, dropLi);
                removeClass([icon], EXPANDABLE);
            }
            dropUl = ListBase.generateUL(this.createElement, [], null, this.listBaseOption);
            dropLi.appendChild(dropUl);
            this.addExpand(dropLi);
            this.trigger('nodeExpanded', this.getExpandEvent(dropLi, null));
        }
        var collapseIcon = select('div.' + COLLAPSIBLE, dropLi);
        if (!isNOU(dropUl) && collapseIcon && (this.preventExpand && !(dropLi.getAttribute('aria-expanded') === 'true'))) {
            removeClass([collapseIcon], COLLAPSIBLE);
            dropLi.setAttribute('aria-expanded', 'false');
            addClass([collapseIcon], EXPANDABLE);
        }
        return dropUl;
    };
    TreeView.prototype.updateElement = function (dragParentUl, dragParentLi) {
        if (dragParentLi && dragParentUl.childElementCount === 0) {
            var dragIcon = select('div.' + ICON, dragParentLi);
            detach(dragParentUl);
            detach(dragIcon);
            var parentId = this.getId(dragParentLi);
            this.updateField(this.treeData, this.fields, parentId, 'hasChildren', false);
            this.removeExpand(dragParentLi, true);
        }
    };
    TreeView.prototype.updateAriaLevel = function (dragLi) {
        var level = this.parents(dragLi, '.' + PARENTITEM).length;
        dragLi.setAttribute('aria-level', '' + level);
        this.updateChildAriaLevel(select('.' + PARENTITEM, dragLi), level + 1);
    };
    TreeView.prototype.updateChildAriaLevel = function (element, level) {
        if (!isNOU(element)) {
            var cNodes = element.childNodes;
            for (var i = 0, len = cNodes.length; i < len; i++) {
                var liEle = cNodes[parseInt(i.toString(), 10)];
                liEle.setAttribute('aria-level', '' + level);
                this.updateChildAriaLevel(select('.' + PARENTITEM, liEle), level + 1);
            }
        }
    };
    TreeView.prototype.renderVirtualEle = function (e) {
        var pre;
        var event = e.event;
        var offsetY = this.getOffsetY(event, e.target);
        if (offsetY > e.target.offsetHeight - 2) {
            pre = false;
        }
        else if (offsetY < 2) {
            pre = true;
        }
        var virEle = this.createElement('div', { className: SIBLING });
        var index = this.fullRowSelect ? (pre ? 1 : 2) : (pre ? 0 : 1);
        e.target.insertBefore(virEle, e.target.children[parseInt(index.toString(), 10)]);
    };
    TreeView.prototype.removeVirtualEle = function () {
        var sibEle = select('.' + SIBLING);
        if (sibEle) {
            detach(sibEle);
        }
    };
    TreeView.prototype.destroyDrag = function () {
        if (this.dragObj && this.dropObj) {
            this.dragObj.destroy();
            this.dropObj.destroy();
        }
    };
    TreeView.prototype.getDragEvent = function (event, obj, dropTarget, target, dragNode, cloneEle, level, drop) {
        var dropLi = dropTarget ? closest(dropTarget, '.' + LISTITEM) : null;
        var dropData = dropLi ? this.getNodeData(dropLi) : null;
        var draggedNode = obj ? obj.dragLi : dragNode;
        var draggedNodeData = obj ? obj.dragData : null;
        var newParent = dropTarget ? this.parents(dropTarget, '.' + LISTITEM) : null;
        var dragLiParent = obj.dragLi.parentElement;
        var dragParent = obj.dragLi ? closest(dragLiParent, '.' + LISTITEM) : null;
        var targetParent = null;
        var indexValue = null;
        var iconCss = [DROPNEXT, DROPIN, DROPOUT, NODROP];
        var iconClass = null;
        var node = (drop === true) ? draggedNode : dropLi;
        var index = node ? closest(node, '.e-list-parent') : null;
        var i = 0;
        var position = null;
        dragParent = (obj.dragLi && dragParent === null) ? closest(dragLiParent, '.' + ROOT) : dragParent;
        dragParent = (drop === true) ? this.dragParent : dragParent;
        if (cloneEle) {
            while (i < 4) {
                if (select('.' + ICON, cloneEle).classList.contains(iconCss[parseInt(i.toString(), 10)])) {
                    iconClass = iconCss[parseInt(i.toString(), 10)];
                    break;
                }
                i++;
            }
        }
        if (index) {
            var dropTar = 0;
            for (i = 0; i < index.childElementCount; i++) {
                dropTar = (drop !== true && index.children[parseInt(i.toString(), 10)] === draggedNode && dropLi !== draggedNode)
                    ? ++dropTar
                    : dropTar;
                if ((drop !== true && index.children[parseInt(i.toString(), 10)].classList.contains('e-hover'))) {
                    indexValue = (event.offsetY >= 23) ? i + 1 : i;
                    break;
                }
                else if (index.children[parseInt(i.toString(), 10)] === node) {
                    indexValue = (event.offsetY >= 23) ? i : i;
                    break;
                }
            }
            indexValue = (dropTar !== 0) ? --indexValue : indexValue;
            position = this.isDropIn ? 'Inside' : ((event.offsetY < 7) ? 'Before' : 'After');
        }
        if (dropTarget) {
            if (newParent.length === 0) {
                targetParent = null;
            }
            else if (dropTarget.classList.contains(LISTITEM)) {
                targetParent = newParent[0];
            }
            else {
                targetParent = newParent[1];
            }
        }
        if (dropLi === draggedNode) {
            targetParent = dropLi;
        }
        if (dropTarget && target.offsetHeight <= 33 && event.offsetY < target.offsetHeight - 10 && event.offsetY > 6) {
            targetParent = dropLi;
            if (drop !== true) {
                level = ++level;
                var parent_2 = targetParent ? select('.e-list-parent', targetParent) : null;
                indexValue = (parent_2) ? parent_2.children.length : 0;
                if (!(this.fields.dataSource instanceof DataManager) && parent_2 === null && targetParent) {
                    var parent_3 = targetParent.hasAttribute('data-uid') ?
                        this.getChildNodes(this.fields.dataSource, targetParent.getAttribute('data-uid').toString()) : null;
                    indexValue = (parent_3) ? parent_3.length : 0;
                }
            }
        }
        return {
            cancel: false,
            clonedNode: cloneEle,
            event: event,
            draggedNode: draggedNode,
            draggedNodeData: draggedNodeData,
            droppedNode: dropLi,
            droppedNodeData: dropData,
            dropIndex: indexValue,
            dropLevel: level,
            draggedParentNode: dragParent,
            dropTarget: targetParent,
            dropIndicator: iconClass,
            target: target,
            position: position
        };
    };
    TreeView.prototype.addFullRow = function (toAdd) {
        var len = this.liList.length;
        if (toAdd) {
            for (var i = 0; i < len; i++) {
                this.createFullRow(this.liList[parseInt(i.toString(), 10)]);
            }
        }
        else {
            for (var i = 0; i < len; i++) {
                var rowDiv = select('.' + FULLROW, this.liList[parseInt(i.toString(), 10)]);
                detach(rowDiv);
            }
        }
    };
    TreeView.prototype.createFullRow = function (item) {
        var rowDiv = this.createElement('div', { className: FULLROW });
        item.insertBefore(rowDiv, item.childNodes[0]);
    };
    TreeView.prototype.addMultiSelect = function (toAdd) {
        if (toAdd) {
            var liEles = selectAll('.' + LISTITEM + ':not([aria-selected="true"])', this.element);
            for (var _i = 0, liEles_1 = liEles; _i < liEles_1.length; _i++) {
                var ele = liEles_1[_i];
                ele.setAttribute('aria-selected', 'false');
            }
        }
        else {
            var liEles = selectAll('.' + LISTITEM + '[aria-selected="false"]', this.element);
            for (var _a = 0, liEles_2 = liEles; _a < liEles_2.length; _a++) {
                var ele = liEles_2[_a];
                ele.removeAttribute('aria-selected');
            }
        }
    };
    TreeView.prototype.collapseByLevel = function (element, level, excludeHiddenNodes, currentLevel) {
        currentLevel = isNOU(currentLevel) ? 1 : currentLevel;
        if (level > 0 && !isNOU(element)) {
            var cNodes = this.getVisibleNodes(excludeHiddenNodes, element.childNodes);
            for (var i = 0, len = cNodes.length; i < len; i++) {
                var liEle = cNodes[parseInt(i.toString(), 10)];
                var icon = select('.' + COLLAPSIBLE, select('.' + TEXTWRAP, liEle));
                if (currentLevel >= level && !isNOU(icon)) {
                    this.collapseNode(liEle, icon, null);
                }
                this.collapseByLevel(select('.' + PARENTITEM, liEle), level, excludeHiddenNodes, currentLevel + 1);
            }
        }
    };
    TreeView.prototype.collapseAllNodes = function (excludeHiddenNodes) {
        var cIcons = this.getVisibleNodes(excludeHiddenNodes, selectAll('.' + COLLAPSIBLE, this.element));
        for (var i = 0, len = cIcons.length; i < len; i++) {
            var icon = cIcons[parseInt(i.toString(), 10)];
            var liEle = closest(icon, '.' + LISTITEM);
            this.collapseNode(liEle, icon, null);
        }
    };
    TreeView.prototype.expandByLevel = function (element, level, excludeHiddenNodes) {
        if (level > 0 && !isNOU(element)) {
            var eNodes = this.getVisibleNodes(excludeHiddenNodes, element.childNodes);
            for (var i = 0, len = eNodes.length; i < len; i++) {
                var liEle = eNodes[parseInt(i.toString(), 10)];
                var icon = select('.' + EXPANDABLE, select('.' + TEXTWRAP, liEle));
                if (!isNOU(icon)) {
                    this.expandAction(liEle, icon, null);
                }
                this.expandByLevel(select('.' + PARENTITEM, liEle), level - 1, excludeHiddenNodes);
            }
        }
    };
    TreeView.prototype.expandAllNodes = function (excludeHiddenNodes) {
        var eIcons = this.getVisibleNodes(excludeHiddenNodes, selectAll('.' + EXPANDABLE, this.element));
        for (var _i = 0, eIcons_1 = eIcons; _i < eIcons_1.length; _i++) {
            var icon = eIcons_1[_i];
            var liEle = closest(icon, '.' + LISTITEM);
            this.expandAction(liEle, icon, null, true, null, true);
        }
    };
    TreeView.prototype.getVisibleNodes = function (excludeHiddenNodes, nodes) {
        var vNodes = Array.prototype.slice.call(nodes);
        if (excludeHiddenNodes) {
            for (var i = 0; i < vNodes.length; i++) {
                if (!isVisible(vNodes[parseInt(i.toString(), 10)])) {
                    vNodes.splice(i, 1);
                    i--;
                }
            }
        }
        return vNodes;
    };
    TreeView.prototype.removeNode = function (node) {
        var dragParentUl = closest(node, '.' + PARENTITEM);
        var dragParentLi = closest(dragParentUl, '.' + LISTITEM);
        if (!isNOU(this.nodeTemplateFn)) {
            this.destroyTemplate(node);
        }
        detach(node);
        this.updateElement(dragParentUl, dragParentLi);
        this.removeData(node);
    };
    TreeView.prototype.updateInstance = function () {
        this.updateList();
        this.updateSelectedNodes();
        this.updateExpandedNodes();
    };
    TreeView.prototype.updateList = function () {
        this.liList = Array.prototype.slice.call(selectAll('.' + LISTITEM, this.element));
    };
    TreeView.prototype.updateSelectedNodes = function () {
        this.setProperties({ selectedNodes: [] }, true);
        var sNodes = selectAll('.' + ACTIVE, this.element);
        this.selectGivenNodes(sNodes);
    };
    TreeView.prototype.updateExpandedNodes = function () {
        this.setProperties({ expandedNodes: [] }, true);
        var eNodes = selectAll('[aria-expanded="true"]', this.element);
        for (var i = 0, len = eNodes.length; i < len; i++) {
            this.addExpand(eNodes[parseInt(i.toString(), 10)]);
        }
    };
    TreeView.prototype.removeData = function (node) {
        if (this.dataType === 1) {
            var dm = new DataManager(this.treeData);
            var id = this.getId(node);
            var data = {};
            var newId = this.isNumberTypeId ? parseFloat(id) : id;
            data[this.fields.id] = newId;
            dm.remove(this.fields.id, data);
            this.removeChildNodes(id);
        }
        else {
            var id = this.getId(node);
            this.updateChildField(this.treeData, this.fields, id, null, null, true);
        }
    };
    TreeView.prototype.removeChildNodes = function (parentId) {
        var cNodes = this.getChildGroup(this.groupedData, parentId, false);
        var childData = [];
        if (cNodes) {
            for (var i = 0, len = cNodes.length; i < len; i++) {
                var dm = new DataManager(this.treeData);
                var id = getValue(this.fields.id, cNodes[parseInt(i.toString(), 10)]).toString();
                var data = {};
                var currId = this.isNumberTypeId ? parseFloat(id) : id;
                data[this.fields.id] = currId;
                var nodeData = dm.remove(this.fields.id, data);
                childData.push(nodeData[0]);
                this.removeChildNodes(id);
            }
        }
        return childData;
    };
    TreeView.prototype.doGivenAction = function (nodes, selector, toExpand) {
        for (var i = 0, len = nodes.length; i < len; i++) {
            var liEle = this.getElement(nodes[parseInt(i.toString(), 10)]);
            if (isNOU(liEle)) {
                continue;
            }
            var icon = select('.' + selector, select('.' + TEXTWRAP, liEle));
            if (!isNOU(icon)) {
                if (toExpand) {
                    this.expandAction(liEle, icon, null);
                }
                else {
                    this.collapseNode(liEle, icon, null);
                }
            }
        }
    };
    TreeView.prototype.addGivenNodes = function (nodes, dropLi, index, isRemote, dropEle) {
        if (nodes.length === 0) {
            return;
        }
        var sNodes = this.getSortedData(nodes);
        var level = dropLi ? parseFloat(dropLi.getAttribute('aria-level')) + 1 : 1;
        if (isRemote) {
            this.updateMapper(level);
        }
        var li = ListBase.createListItemFromJson(this.createElement, sNodes, this.listBaseOption, level);
        var id = this.getId(dropLi);
        var dropIcon1;
        if (!isNullOrUndefined(dropLi)) {
            dropIcon1 = select('div.' + ICON, dropLi);
        }
        if (this.dataType === 1 && dropIcon1 && dropIcon1.classList.contains(EXPANDABLE) && this.preventExpand && !isNOU(this.element.offsetParent) && !this.element.offsetParent.parentElement.classList.contains('e-filemanager')) {
            this.preventExpand = true;
        }
        if (this.dataType !== 1) {
            this.addChildData(this.treeData, this.fields, id, nodes, index);
            this.isFirstRender = false;
        }
        var dropUl;
        if (!dropEle) {
            dropUl = dropLi ? this.expandParent(dropLi) : select('.' + PARENTITEM, this.element);
        }
        else {
            dropUl = dropEle;
        }
        var refNode = !isNullOrUndefined(index) ? dropUl.childNodes[parseInt(index.toString(), 10)] : null;
        if (!this.isFirstRender || this.dataType === 1) {
            var args = this.expandArgs;
            if (refNode || this.sortOrder === 'None') {
                for (var i = 0; i < li.length; i++) {
                    dropUl.insertBefore(li[parseInt(i.toString(), 10)], refNode);
                }
                if (this.dataType === 1 && !isNullOrUndefined(dropLi) && !this.preventExpand && !isNOU(this.element.offsetParent) && !this.element.offsetParent.parentElement.classList.contains('e-filemanager')) {
                    this.preventExpand = false;
                    var dropIcon = select('div.' + ICON, dropLi);
                    if (dropIcon && dropIcon.classList.contains(EXPANDABLE) && (isNOU(args) || args.name !== 'nodeExpanding')) {
                        this.expandAction(dropLi, dropIcon, null);
                    }
                }
            }
            if (!refNode && ((this.sortOrder === 'Ascending') || (this.sortOrder === 'Descending'))) {
                if (dropUl.childNodes.length === 0) {
                    for (var i = 0; i < li.length; i++) {
                        dropUl.insertBefore(li[parseInt(i.toString(), 10)], refNode);
                    }
                    if (this.dataType === 1 && !isNullOrUndefined(dropLi) && !this.preventExpand && !isNOU(this.element.offsetParent) && !this.element.offsetParent.parentElement.classList.contains('e-filemanager')) {
                        this.preventExpand = false;
                        var dropIcon = select('div.' + ICON, dropLi);
                        if (dropIcon && dropIcon.classList.contains(EXPANDABLE) && (isNOU(args) || args.name !== 'nodeExpanding')) {
                            this.expandAction(dropLi, dropIcon, null);
                        }
                    }
                }
                else {
                    var cNodes = dropUl.childNodes;
                    for (var i = 0; i < li.length; i++) {
                        for (var j = 0; j < cNodes.length; j++) {
                            var returnValue = (this.sortOrder === 'Ascending') ? cNodes[parseInt(j.toString(), 10)].textContent.toUpperCase() > li[parseInt(i.toString(), 10)].innerText.toUpperCase() : cNodes[parseInt(j.toString(), 10)].textContent.toUpperCase() < li[parseInt(i.toString(), 10)].innerText.toUpperCase();
                            if (returnValue) {
                                dropUl.insertBefore(li[parseInt(i.toString(), 10)], cNodes[parseInt(j.toString(), 10)]);
                                break;
                            }
                            dropUl.insertBefore(li[parseInt(i.toString(), 10)], cNodes[cNodes.length]);
                        }
                    }
                }
            }
        }
        if (this.dataType === 1) {
            this.updateField(this.treeData, this.fields, id, 'hasChildren', true);
            var refId = this.getId(refNode);
            var pos = isNOU(refId) ? this.treeData.length : this.getDataPos(this.treeData, this.fields, refId);
            for (var j = 0; j < nodes.length; j++) {
                if (!isNOU(id)) {
                    var currId = this.isNumberTypeId ? parseFloat(id) : id;
                    setValue(this.fields.parentID, currId, nodes[parseInt(j.toString(), 10)]);
                }
                this.treeData.splice(pos, 0, nodes[parseInt(j.toString(), 10)]);
                pos++;
            }
        }
        this.finalizeNode(dropUl);
    };
    TreeView.prototype.updateMapper = function (level) {
        var mapper = (level === 1) ? this.fields : this.getChildFields(this.fields, level - 1, 1);
        this.updateListProp(mapper);
    };
    TreeView.prototype.updateListProp = function (mapper) {
        var prop = this.getActualProperties(mapper);
        this.listBaseOption.fields = prop;
        this.listBaseOption.fields.url = Object.prototype.hasOwnProperty.call(prop, 'navigateUrl') ? prop.navigateUrl : 'navigateUrl';
    };
    TreeView.prototype.getDataPos = function (obj, mapper, id) {
        var pos = null;
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            var nodeId = getValue(mapper.id, obj[parseInt(i.toString(), 10)]);
            if (obj[parseInt(i.toString(), 10)] && nodeId && nodeId.toString() === id) {
                return i;
            }
            else if (typeof mapper.child === 'string' && !isNOU(getValue(mapper.child, obj[parseInt(i.toString(), 10)]))) {
                var data = getValue(mapper.child, obj[parseInt(i.toString(), 10)]);
                pos = this.getDataPos(data, this.getChildMapper(mapper), id);
                if (pos !== null) {
                    break;
                }
            }
            else if (this.fields.dataSource instanceof DataManager && !isNOU(getValue('child', obj[parseInt(i.toString(), 10)]))) {
                var items = getValue('child', obj[parseInt(i.toString(), 10)]);
                pos = this.getDataPos(items, this.getChildMapper(mapper), id);
                if (pos !== null) {
                    break;
                }
            }
        }
        return pos;
    };
    TreeView.prototype.addChildData = function (obj, mapper, id, data, index) {
        var updated;
        if (isNOU(id)) {
            index = isNOU(index) ? obj.length : index;
            for (var k = 0, len = data.length; k < len; k++) {
                obj.splice(index, 0, data[parseInt(k.toString(), 10)]);
                index++;
            }
            return updated;
        }
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            var nodeId = getValue(mapper.id, obj[parseInt(i.toString(), 10)]);
            if (obj[parseInt(i.toString(), 10)] && nodeId && nodeId.toString() === id) {
                if ((typeof mapper.child === 'string' && (Object.prototype.hasOwnProperty.call(obj[parseInt(i.toString(), 10)], mapper.child) && obj[parseInt(i.toString(), 10)][mapper.child] !== null)) ||
                    ((this.fields.dataSource instanceof DataManager) && Object.prototype.hasOwnProperty.call(obj[parseInt(i.toString(), 10)], 'child'))) {
                    var key = (typeof mapper.child === 'string') ? mapper.child : 'child';
                    var childData = getValue(key, obj[parseInt(i.toString(), 10)]);
                    if (isNOU(childData)) {
                        childData = [];
                    }
                    index = isNOU(index) ? childData.length : index;
                    for (var k = 0, len = data.length; k < len; k++) {
                        childData.splice(index, 0, data[parseInt(k.toString(), 10)]);
                        index++;
                    }
                }
                else {
                    var key = (typeof mapper.child === 'string') ? mapper.child : 'child';
                    obj[parseInt(i.toString(), 10)]["" + key] = data;
                }
                return true;
            }
            else if (typeof mapper.child === 'string' && !isNOU(getValue(mapper.child, obj[parseInt(i.toString(), 10)]))) {
                var childObj = getValue(mapper.child, obj[parseInt(i.toString(), 10)]);
                updated = this.addChildData(childObj, this.getChildMapper(mapper), id, data, index);
                if (updated !== undefined) {
                    break;
                }
            }
            else if ((this.fields.dataSource instanceof DataManager) && !isNOU(getValue('child', obj[parseInt(i.toString(), 10)]))) {
                var childData = getValue('child', obj[parseInt(i.toString(), 10)]);
                updated = this.addChildData(childData, this.getChildMapper(mapper), id, data, index);
                if (updated !== undefined) {
                    break;
                }
            }
        }
        return updated;
    };
    TreeView.prototype.doDisableAction = function (nodes) {
        var validNodes = this.nodeType(nodes);
        var validID = this.checkValidId(validNodes);
        this.validArr = [];
        for (var i = 0, len = validID.length; i < len; i++) {
            var id = validID[parseInt(i.toString(), 10)][this.fields.id].toString();
            if (id && this.disableNode.indexOf(id) === -1) {
                this.disableNode.push(id);
            }
            var liEle = this.getElement(id);
            if (liEle) {
                liEle.setAttribute('aria-disabled', 'true');
                addClass([liEle], DISABLE);
            }
        }
    };
    TreeView.prototype.doEnableAction = function (nodes) {
        var strNodes = this.nodeType(nodes);
        for (var i = 0, len = strNodes.length; i < len; i++) {
            var liEle = this.getElement(strNodes[parseInt(i.toString(), 10)]);
            var id = strNodes[parseInt(i.toString(), 10)];
            if (id && this.disableNode.indexOf(id) !== -1) {
                this.disableNode.splice(this.disableNode.indexOf(id), 1);
            }
            if (liEle) {
                liEle.removeAttribute('aria-disabled');
                removeClass([liEle], DISABLE);
            }
        }
    };
    TreeView.prototype.nodeType = function (nodes) {
        var validID = [];
        for (var i = 0, len = nodes.length; i < len; i++) {
            var id = void 0;
            if (typeof nodes[parseInt(i.toString(), 10)] == 'string') {
                id = (nodes[parseInt(i.toString(), 10)]) ? nodes[parseInt(i.toString(), 10)].toString() : null;
            }
            else if (typeof nodes[parseInt(i.toString(), 10)] === 'object') {
                id = nodes[parseInt(i.toString(), 10)] ? nodes[parseInt(i.toString(), 10)].getAttribute('data-uid').toString() : null;
            }
            if (validID.indexOf(id) === -1) {
                validID.push(id);
            }
        }
        return validID;
    };
    TreeView.prototype.checkValidId = function (node) {
        var _this = this;
        if (this.dataType === 1) {
            this.validArr = this.treeData.filter(function (data) {
                return node.indexOf(data[_this.fields.id] ? data[_this.fields.id].toString() : null) !== -1;
            });
        }
        else if (this.dataType === 2) {
            for (var k = 0; k < this.treeData.length; k++) {
                var id = this.treeData[parseInt(k.toString(), 10)][this.fields.id]
                    ? this.treeData[parseInt(k.toString(), 10)][this.fields.id].toString()
                    : null;
                if (node.indexOf(id) !== -1) {
                    this.validArr.push(this.treeData[parseInt(k.toString(), 10)]);
                }
                var childItems = getValue(this.fields.child.toString(), this.treeData[parseInt(k.toString(), 10)]);
                if (childItems) {
                    this.filterNestedChild(childItems, node);
                }
            }
        }
        return this.validArr;
    };
    TreeView.prototype.filterNestedChild = function (treeData, nodes) {
        for (var k = 0; k < treeData.length; k++) {
            var id = treeData[parseInt(k.toString(), 10)][this.fields.id]
                ? treeData[parseInt(k.toString(), 10)][this.fields.id].toString()
                : null;
            if (nodes.indexOf(id) !== -1) {
                this.validArr.push(treeData[parseInt(k.toString(), 10)]);
            }
            var childItems = getValue(this.fields.child.toString(), treeData[parseInt(k.toString(), 10)]);
            if (childItems) {
                this.filterNestedChild(childItems, nodes);
            }
        }
    };
    TreeView.prototype.setTouchClass = function () {
        var ele = closest(this.element, '.' + BIGGER);
        this.touchClass = isNOU(ele) ? '' : SMALL;
    };
    TreeView.prototype.updatePersistProp = function () {
        this.removeField(this.treeData, this.fields, ['selected', 'expanded']);
        var sleNodes = this.selectedNodes;
        for (var l = 0, slelen = sleNodes.length; l < slelen; l++) {
            this.updateField(this.treeData, this.fields, sleNodes[parseInt(l.toString(), 10)], 'selected', true);
        }
        var enodes = this.expandedNodes;
        for (var k = 0, nodelen = enodes.length; k < nodelen; k++) {
            this.updateField(this.treeData, this.fields, enodes[parseInt(k.toString(), 10)], 'expanded', true);
        }
        if (this.showCheckBox) {
            this.removeField(this.treeData, this.fields, ['isChecked']);
            var cnodes = this.checkedNodes;
            for (var m = 0, nodelen = cnodes.length; m < nodelen; m++) {
                this.updateField(this.treeData, this.fields, cnodes[parseInt(m.toString(), 10)], 'isChecked', true);
            }
        }
    };
    TreeView.prototype.removeField = function (obj, mapper, names) {
        if (isNOU(obj) || isNOU(mapper)) {
            return;
        }
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            for (var j = 0; j < names.length; j++) {
                var field = this.getMapperProp(mapper, names[parseInt(j.toString(), 10)]);
                if (!isNOU(obj[parseInt(i.toString(), 10)]["" + field])) {
                    delete obj[parseInt(i.toString(), 10)]["" + field];
                }
            }
            if (typeof mapper.child === 'string' && !isNOU(getValue(mapper.child, obj[parseInt(i.toString(), 10)]))) {
                this.removeField(getValue(mapper.child, obj[parseInt(i.toString(), 10)]), this.getChildMapper(mapper), names);
            }
            else if (this.fields.dataSource instanceof DataManager && !isNOU(getValue('child', obj[parseInt(i.toString(), 10)]))) {
                this.removeField(getValue('child', obj[parseInt(i.toString(), 10)]), this.getChildMapper(mapper), names);
            }
        }
    };
    TreeView.prototype.getMapperProp = function (mapper, fieldName) {
        switch (fieldName) {
            case 'selected':
                return !isNOU(mapper.selected) ? mapper.selected : 'selected';
            case 'expanded':
                return !isNOU(mapper.expanded) ? mapper.expanded : 'expanded';
            case 'isChecked':
                return !isNOU(mapper.isChecked) ? mapper.isChecked : 'isChecked';
            case 'hasChildren':
                return !isNOU(mapper.hasChildren) ? mapper.hasChildren : 'hasChildren';
            default:
                return fieldName;
        }
    };
    TreeView.prototype.updateField = function (obj, mapper, id, key, value) {
        if (isNOU(id)) {
            return;
        }
        else if (this.dataType === 1) {
            var newId = this.isNumberTypeId ? parseFloat(id) : id;
            var resultData = new DataManager(this.treeData).executeLocal(new Query().where(mapper.id, 'equal', newId, false));
            setValue(this.getMapperProp(mapper, key), value, resultData[0]);
        }
        else {
            this.updateChildField(obj, mapper, id, key, value);
        }
    };
    TreeView.prototype.updateChildField = function (obj, mapper, id, key, value, remove) {
        var removedData;
        if (isNOU(obj)) {
            return removedData;
        }
        for (var i = 0, objlen = obj.length; i < objlen; i++) {
            var nodeId = getValue(mapper.id, obj[parseInt(i.toString(), 10)]);
            if (obj[parseInt(i.toString(), 10)] && !isNOU(nodeId) && nodeId.toString() === id) {
                if (remove) {
                    removedData = obj.splice(i, 1);
                }
                else {
                    setValue(this.getMapperProp(mapper, key), value, obj[parseInt(i.toString(), 10)]);
                    removedData = [];
                }
                return removedData;
            }
            else if (typeof mapper.child === 'string' && !isNOU(getValue(mapper.child, obj[parseInt(i.toString(), 10)]))) {
                var childData = getValue(mapper.child, obj[parseInt(i.toString(), 10)]);
                removedData = this.updateChildField(childData, this.getChildMapper(mapper), id, key, value, remove);
                if (removedData !== undefined) {
                    break;
                }
            }
            else if (this.fields.dataSource instanceof DataManager && !isNOU(getValue('child', obj[parseInt(i.toString(), 10)]))) {
                var childItems = getValue('child', obj[parseInt(i.toString(), 10)]);
                removedData = this.updateChildField(childItems, this.getChildMapper(mapper), id, key, value, remove);
                if (removedData !== undefined) {
                    break;
                }
            }
        }
        return removedData;
    };
    TreeView.prototype.triggerEvent = function (action, node) {
        this.renderReactTemplates();
        if (action === 'addNodes') {
            var nodeData = [];
            for (var i = 0; i < node.length; i++) {
                nodeData.push(this.getNode(this.getElement(isNOU(node[parseInt(i.toString(), 10)][this.fields.id])
                    ? getValue(this.fields.id, node[parseInt(i.toString(), 10)]).toString()
                    : null)));
            }
            node = nodeData;
        }
        var eventArgs = { data: this.treeData, action: action, nodeData: node };
        this.trigger('dataSourceChanged', eventArgs);
    };
    TreeView.prototype.wireInputEvents = function (inpEle) {
        EventHandler.add(inpEle, 'blur', this.inputFocusOut, this);
    };
    TreeView.prototype.wireEditingEvents = function (toBind) {
        var _this = this;
        if (toBind && !this.disabled) {
            this.touchEditObj = new Touch(this.element, {
                tap: function (e) {
                    if (_this.isDoubleTapped(e) && e.tapCount === 2) {
                        e.originalEvent.preventDefault();
                        _this.editingHandler(e.originalEvent);
                    }
                }
            });
        }
        else {
            if (this.touchEditObj) {
                this.touchEditObj.destroy();
            }
        }
    };
    TreeView.prototype.wireClickEvent = function (toBind) {
        var _this = this;
        if (toBind) {
            this.touchClickObj = new Touch(this.element, {
                tap: function (e) {
                    _this.clickHandler(e);
                }
            });
        }
        else {
            if (this.touchClickObj) {
                this.touchClickObj.destroy();
            }
        }
    };
    TreeView.prototype.wireExpandOnEvent = function (toBind) {
        var _this = this;
        if (toBind) {
            this.touchExpandObj = new Touch(this.element, {
                tap: function (e) {
                    if ((_this.expandOnType === 'Click' || (_this.expandOnType === 'DblClick' && _this.isDoubleTapped(e) && e.tapCount === 2))
                        && e.originalEvent.which !== 3) {
                        _this.expandHandler(e);
                    }
                }
            });
        }
        else {
            if (this.touchExpandObj) {
                this.touchExpandObj.destroy();
            }
        }
    };
    TreeView.prototype.mouseDownHandler = function (e) {
        this.mouseDownStatus = true;
        if (e.shiftKey || e.ctrlKey) {
            e.preventDefault();
        }
        if (e.ctrlKey && this.allowMultiSelection) {
            EventHandler.add(this.element, 'contextmenu', this.preventContextMenu, this);
        }
    };
    TreeView.prototype.preventContextMenu = function (e) {
        e.preventDefault();
    };
    TreeView.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'mousedown', this.mouseDownHandler, this);
        this.wireClickEvent(true);
        if (this.expandOnType !== 'None') {
            this.wireExpandOnEvent(true);
        }
        EventHandler.add(this.element, 'mouseover', this.onMouseOver, this);
        EventHandler.add(this.element, 'mouseout', this.onMouseLeave, this);
        this.keyboardModule = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    TreeView.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'mousedown', this.mouseDownHandler);
        this.wireClickEvent(false);
        this.wireExpandOnEvent(false);
        EventHandler.remove(this.element, 'mouseover', this.onMouseOver);
        EventHandler.remove(this.element, 'mouseout', this.onMouseLeave);
        if (!this.disabled) {
            this.keyboardModule.destroy();
        }
    };
    TreeView.prototype.parents = function (element, selector) {
        var matched = [];
        var el = element.parentNode;
        while (!isNOU(el)) {
            if (matches(el, selector)) {
                matched.push(el);
            }
            el = el.parentNode;
        }
        return matched;
    };
    TreeView.prototype.isDoubleTapped = function (e) {
        var target = e.originalEvent.target;
        var secondTap;
        if (target && e.tapCount) {
            if (e.tapCount === 1) {
                this.firstTap = closest(target, '.' + LISTITEM);
            }
            else if (e.tapCount === 2) {
                secondTap = closest(target, '.' + LISTITEM);
            }
        }
        return (this.firstTap === secondTap);
    };
    TreeView.prototype.isDescendant = function (parent, child) {
        var node = child.parentNode;
        while (!isNOU(node)) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    TreeView.prototype.showSpinner = function (element) {
        addClass([element], LOAD);
        createSpinner({
            target: element,
            width: Browser.isDevice ? 16 : 14
        }, this.createElement);
        showSpinner(element);
    };
    TreeView.prototype.hideSpinner = function (element) {
        hideSpinner(element);
        element.innerHTML = '';
        removeClass([element], LOAD);
    };
    TreeView.prototype.setCheckedNodes = function (nodes) {
        nodes = JSON.parse(JSON.stringify(nodes));
        if (nodes.length > 1 && typeof this.nodeChecked === 'function' && this.nodeChecked.length > 0) {
            this.isFilter = true;
        }
        this.uncheckAll(this.checkedNodes);
        this.setIndeterminate(nodes);
        if (nodes.length > 0) {
            this.checkAll(nodes);
        }
    };
    /**
     * Checks whether the checkedNodes entered are valid and sets the valid checkedNodes while changing via setmodel
     *
     * @param {string} node - The unique identifier of the node.
     * @param {string[]} [nodes=[]] - The list of node IDs to check.
     * @returns {void}
     * @private
     */
    TreeView.prototype.setValidCheckedNode = function (node, nodes) {
        if (nodes === void 0) { nodes = []; }
        if (this.dataType === 1) {
            var mapper = this.fields;
            var resultData = new DataManager(this.treeData).executeLocal(new Query().where(mapper.id, 'equal', node, true));
            if (resultData[0]) {
                this.setChildCheckState(resultData, node, resultData[0], nodes);
                if (this.autoCheck) {
                    var parent_4 = resultData[0][this.fields.parentID] ? resultData[0][this.fields.parentID].toString() : null;
                    var childNodes = this.getChildNodes(this.treeData, parent_4);
                    var count = 0;
                    for (var len = 0; len < childNodes.length; len++) {
                        var childId = childNodes[parseInt(len.toString(), 10)][this.fields.id].toString();
                        if (this.checkedNodes.indexOf(childId) !== -1) {
                            count++;
                        }
                    }
                    if (count === childNodes.length && this.checkedNodes.indexOf(parent_4) === -1 && parent_4) {
                        this.checkDisabledState(parent_4);
                    }
                }
            }
        }
        else if (this.dataType === 2) {
            for (var a = 0; a < this.treeData.length; a++) {
                var index = this.treeData[parseInt(a.toString(), 10)][this.fields.id] ? this.treeData[parseInt(a.toString(), 10)][this.fields.id].toString() : '';
                if (index === node && this.checkedNodes.indexOf(node) === -1) {
                    this.checkDisabledState(node);
                    break;
                }
                var childItems = getValue(this.fields.child.toString(), this.treeData[parseInt(a.toString(), 10)]);
                if (childItems) {
                    this.setChildCheckState(childItems, node, this.treeData[parseInt(a.toString(), 10)], nodes);
                }
            }
        }
    };
    /**
     * Checks whether the checkedNodes entered are valid and sets the valid checkedNodes while changing via setmodel(for hierarchical DS)
     *
     * @param {Object[]} childItems - The child items to check.
     * @param {string} node - The node to set the check state for.
     * @param {Object} [treeData] - The optional tree data.
     * @param {string[]} [nodes=[]] - The list of node IDs to check.
     * @returns {void}
     * @private
     */
    TreeView.prototype.setChildCheckState = function (childItems, node, treeData, nodes) {
        if (nodes === void 0) { nodes = []; }
        var checkedParent;
        var count = 0;
        if (this.dataType === 1) {
            if (treeData) {
                checkedParent = treeData[this.fields.id] ? treeData[this.fields.id].toString() : null;
            }
            for (var index = 0; index < childItems.length; index++) {
                var checkNode = childItems[parseInt(index.toString(), 10)][this.fields.id]
                    ? childItems[parseInt(index.toString(), 10)][this.fields.id].toString()
                    : null;
                if (treeData && checkedParent && this.autoCheck) {
                    if (this.checkedNodes.indexOf(checkedParent) !== -1 && this.checkedNodes.indexOf(checkNode) === -1) {
                        this.checkDisabledState(checkNode, childItems[index]);
                    }
                }
                if (checkNode === node && this.checkedNodes.indexOf(node) === -1) {
                    this.checkDisabledState(node);
                }
                var subChildItems = this.getChildNodes(this.treeData, checkNode);
                var isParentNodeCheck = (nodes.length === 1 && nodes[0] === checkNode);
                if (subChildItems.length === node.length || isParentNodeCheck) {
                    this.setChildCheckState(subChildItems, node, treeData);
                }
            }
        }
        else {
            if (treeData) {
                checkedParent = treeData[this.fields.id] ? treeData[this.fields.id].toString() : '';
            }
            for (var index = 0; index < childItems.length; index++) {
                var checkedChild = childItems[parseInt(index.toString(), 10)][this.fields.id] ? childItems[parseInt(index.toString(), 10)][this.fields.id].toString() : '';
                var isParentNodeCheck = ([node].length === 1 && nodes.length === 0);
                if (treeData && checkedParent && this.autoCheck) {
                    if (this.checkedNodes.indexOf(checkedParent) !== -1 && this.checkedNodes.indexOf(checkedChild) === -1
                        && (checkedChild === node || isParentNodeCheck)) {
                        this.checkDisabledState(checkedChild, childItems[index]);
                    }
                }
                if (checkedChild === node && this.checkedNodes.indexOf(node) === -1) {
                    this.checkDisabledState(node);
                }
                var subChildItems = getValue(this.fields.child.toString(), childItems[parseInt(index.toString(), 10)]);
                if (subChildItems) {
                    this.setChildCheckState(subChildItems, node, childItems[parseInt(index.toString(), 10)]);
                }
                if (this.checkedNodes.indexOf(checkedChild) !== -1 && this.autoCheck) {
                    count++;
                }
                if (count === childItems.length && this.checkedNodes.indexOf(checkedParent) === -1 && this.autoCheck) {
                    this.checkDisabledState(checkedParent, treeData);
                }
            }
        }
    };
    TreeView.prototype.setIndeterminate = function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            this.setValidCheckedNode(nodes[parseInt(i.toString(), 10)], nodes);
        }
    };
    TreeView.prototype.updatePosition = function (id, newData, isRefreshChild, childValue) {
        if (this.dataType === 1) {
            var pos = this.getDataPos(this.treeData, this.fields, id);
            this.treeData.splice(pos, 1, newData);
            if (isRefreshChild) {
                this.removeChildNodes(id);
                for (var j = 0; j < childValue.length; j++) {
                    this.treeData.splice(pos, 0, childValue[parseInt(j.toString(), 10)]);
                    pos++;
                }
            }
            this.groupedData = this.getGroupedData(this.treeData, this.fields.parentID);
        }
        else {
            this.updateChildPosition(this.treeData, this.fields, id, [newData], undefined);
        }
    };
    TreeView.prototype.updateChildPosition = function (treeData, mapper, currID, newData, index) {
        var found;
        for (var i = 0, objlen = treeData.length; i < objlen; i++) {
            var nodeId = getValue(mapper.id, treeData[parseInt(i.toString(), 10)]);
            if (treeData[parseInt(i.toString(), 10)] && nodeId && nodeId.toString() === currID) {
                treeData[parseInt(i.toString(), 10)] = newData[0];
                return true;
            }
            else if (typeof mapper.child === 'string' && !isNOU(getValue(mapper.child, treeData[parseInt(i.toString(), 10)]))) {
                var childObj = getValue(mapper.child, treeData[parseInt(i.toString(), 10)]);
                found = this.updateChildPosition(childObj, this.getChildMapper(mapper), currID, newData, index);
                if (found !== undefined) {
                    break;
                }
            }
            else if (this.fields.dataSource instanceof DataManager && !isNOU(getValue('child', treeData[parseInt(i.toString(), 10)]))) {
                var childData = getValue('child', treeData[parseInt(i.toString(), 10)]);
                found = this.updateChildPosition(childData, this.getChildMapper(mapper), currID, newData, index);
                if (found !== undefined) {
                    break;
                }
            }
        }
        return found;
    };
    TreeView.prototype.dynamicState = function () {
        this.setDragAndDrop(this.allowDragAndDrop);
        this.wireEditingEvents(this.allowEditing);
        if (!this.disabled) {
            this.wireEvents();
            this.setRipple();
        }
        else {
            this.unWireEvents();
            this.rippleFn();
            this.rippleIconFn();
        }
    };
    TreeView.prototype.crudOperation = function (operation, nodes, target, newText, newNode, index, prevent) {
        var _this = this;
        var data = this.fields.dataSource;
        var matchedArr = [];
        var query = this.getQuery(this.fields);
        var key = this.fields.id;
        var crud;
        var changes = {
            addedRecords: [],
            deletedRecords: [],
            changedRecords: []
        };
        var nodesID = [];
        if (nodes) {
            nodesID = this.nodeType(nodes);
        }
        else if (target) {
            if (typeof target == 'string') {
                nodesID[0] = target.toString();
            }
            else if (typeof target === 'object') {
                nodesID[0] = target.getAttribute('data-uid').toString();
            }
        }
        for (var i = 0, len = nodesID.length; i < len; i++) {
            var liEle = this.getElement(nodesID[parseInt(i.toString(), 10)]);
            if (isNullOrUndefined(liEle)) {
                continue;
            }
            var removedData = this.getNodeObject(nodesID[parseInt(i.toString(), 10)]);
            matchedArr.push(removedData);
        }
        switch (operation) {
            case 'delete':
                if (nodes.length === 1) {
                    crud = data.remove(key, matchedArr[0], query.fromTable, query);
                }
                else {
                    changes.deletedRecords = matchedArr;
                    crud = data.saveChanges(changes, key, query.fromTable, query);
                }
                crud.then(function () { return _this.deleteSuccess(nodesID); })
                    .catch(function (e) { return _this.dmFailure(e); });
                break;
            case 'update':
                matchedArr[0][this.fields.text] = newText;
                crud = data.update(key, matchedArr[0], query.fromTable, query);
                crud.then(function () { return _this.editSucess(target, newText, prevent); })
                    .catch(function (e) { return _this.dmFailure(e, target, prevent); });
                break;
            case 'insert':
                if (newNode.length === 1) {
                    crud = data.insert(newNode[0], query.fromTable, query);
                }
                else {
                    var arr = [];
                    for (var i = 0, len = newNode.length; i < len; i++) {
                        arr.push(newNode[parseInt(i.toString(), 10)]);
                    }
                    changes.addedRecords = arr;
                    crud = data.saveChanges(changes, key, query.fromTable, query);
                }
                crud.then(function () {
                    var dropLi = _this.getElement(target);
                    _this.addSuccess(newNode, dropLi, index);
                    _this.preventExpand = false;
                }).catch(function (e) { return _this.dmFailure(e); });
                break;
        }
    };
    TreeView.prototype.deleteSuccess = function (nodes) {
        var nodeData = [];
        for (var i = 0, len = nodes.length; i < len; i++) {
            var liEle = this.getElement(nodes[parseInt(i.toString(), 10)]);
            nodeData.push(this.getNode(liEle));
            if (isNOU(liEle)) {
                continue;
            }
            this.removeNode(liEle);
        }
        this.updateInstance();
        if (this.dataType === 1) {
            this.groupedData = this.getGroupedData(this.treeData, this.fields.parentID);
        }
        this.triggerEvent('removeNode', nodeData);
    };
    TreeView.prototype.editSucess = function (target, newText, prevent) {
        var liEle = this.getElement(target);
        var txtEle = select('.' + LISTTEXT, liEle);
        this.appendNewText(liEle, txtEle, newText, prevent);
    };
    TreeView.prototype.addSuccess = function (nodes, dropLi, index) {
        var _this = this;
        var dropUl;
        var icon = dropLi ? dropLi.querySelector('.' + ICON) : null;
        if (dropLi && icon && icon.classList.contains(EXPANDABLE) &&
            dropLi.querySelector('.' + PARENTITEM) === null) {
            this.renderChildNodes(dropLi, null, function () {
                dropUl = dropLi.querySelector('.' + PARENTITEM);
                _this.addGivenNodes(nodes, dropLi, index, true, dropUl);
                _this.triggerEvent('addNodes', nodes);
            });
        }
        else {
            this.addGivenNodes(nodes, dropLi, index, true);
            this.triggerEvent('addNodes', nodes);
        }
    };
    TreeView.prototype.dmFailure = function (e, target, prevent) {
        if (target) {
            this.updatePreviousText(target, prevent);
        }
        this.trigger('actionFailure', { error: e });
    };
    TreeView.prototype.updatePreviousText = function (target, prevent) {
        var liEle = this.getElement(target);
        var txtEle = select('.' + LISTTEXT, liEle);
        this.updateText(liEle, txtEle, this.oldText, prevent);
    };
    TreeView.prototype.getHierarchicalParentId = function (node, data, parentsID) {
        var _this = this;
        var index = data.findIndex(function (data) {
            return data[_this.fields.id] && data[_this.fields.id].toString() === node;
        });
        if (index === -1) {
            for (var i = 0; i < data.length; i++) {
                var childItems = getValue(this.fields.child.toString(), data[parseInt(i.toString(), 10)]);
                if (!isNOU(childItems)) {
                    index = childItems.findIndex(function (data) {
                        return data[_this.fields.id] && data[_this.fields.id].toString() === node;
                    });
                    if (index === -1) {
                        this.getHierarchicalParentId(node, childItems, parentsID);
                    }
                    else {
                        parentsID.push(data[parseInt(i.toString(), 10)][this.fields.id].toString());
                        this.getHierarchicalParentId(data[parseInt(i.toString(), 10)][this.fields.id].toString(), this.treeData, parentsID);
                        break;
                    }
                }
            }
        }
        return parentsID;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {TreeViewModel} newProp - The new property value.
     * @param {TreeViewModel} oldProp - The old property value.
     * @returns {void}
     * @private
     */
    TreeView.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'allowDragAndDrop':
                    this.setDragAndDrop(this.allowDragAndDrop);
                    break;
                case 'dragArea':
                    if (this.allowDragAndDrop) {
                        this.dragObj.dragArea = this.dragArea;
                    }
                    break;
                case 'allowEditing':
                    this.wireEditingEvents(this.allowEditing);
                    break;
                case 'allowMultiSelection':
                    if (this.selectedNodes.length > 1) {
                        var sNode = this.getElement(this.selectedNodes[0]);
                        this.isLoaded = false;
                        this.removeSelectAll();
                        this.selectNode(sNode, null);
                        this.isLoaded = true;
                    }
                    this.setMultiSelect(this.allowMultiSelection);
                    this.addMultiSelect(this.allowMultiSelection);
                    break;
                case 'allowTextWrap':
                    this.setTextWrap();
                    this.updateWrap();
                    break;
                case 'checkedNodes':
                    if (JSON.stringify(oldProp.checkedNodes) !== JSON.stringify(newProp.checkedNodes)) {
                        if (this.showCheckBox) {
                            this.checkedNodes = oldProp.checkedNodes;
                            this.setCheckedNodes(newProp.checkedNodes);
                        }
                    }
                    break;
                case 'autoCheck':
                    if (this.showCheckBox) {
                        this.autoCheck = newProp.autoCheck;
                        this.ensureIndeterminate();
                    }
                    break;
                case 'cssClass':
                    this.setCssClass(oldProp.cssClass, newProp.cssClass);
                    break;
                case 'enableRtl':
                    this.setEnableRtl();
                    break;
                case 'expandedNodes':
                    this.isAnimate = false;
                    this.setProperties({ expandedNodes: [] }, true);
                    this.collapseAll();
                    this.isInitalExpand = true;
                    this.setProperties({ expandedNodes: isNOU(newProp.expandedNodes) ? [] : newProp.expandedNodes }, true);
                    this.doExpandAction();
                    this.isInitalExpand = false;
                    this.isAnimate = true;
                    break;
                case 'expandOn':
                    this.wireExpandOnEvent(false);
                    this.setExpandOnType();
                    if (this.expandOnType !== 'None' && !this.disabled) {
                        this.wireExpandOnEvent(true);
                    }
                    break;
                case 'disabled':
                    this.setDisabledMode();
                    this.dynamicState();
                    break;
                case 'fields':
                    this.isAnimate = false;
                    this.isFieldChange = true;
                    this.initialRender = true;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if (!this.isReact || this.isReact && !(this.fields.dataSource instanceof DataManager)) {
                        if (!this.element.classList.contains('e-filtering')) {
                            this.DDTTreeData = JSON.parse(JSON.stringify(this.fields.dataSource));
                        }
                        this.reRenderNodes();
                    }
                    this.initialRender = false;
                    this.isAnimate = true;
                    this.isFieldChange = false;
                    break;
                case 'fullRowSelect':
                    this.setFullRow(this.fullRowSelect);
                    this.addFullRow(this.fullRowSelect);
                    if (this.allowTextWrap) {
                        this.setTextWrap();
                        this.updateWrap();
                    }
                    break;
                case 'loadOnDemand':
                    if (this.loadOnDemand === false && !this.onLoaded) {
                        var nodes = this.element.querySelectorAll('li');
                        var i = 0;
                        while (i < nodes.length) {
                            if (nodes[parseInt(i.toString(), 10)].getAttribute('aria-expanded') !== 'true') {
                                this.renderChildNodes(nodes[parseInt(i.toString(), 10)], true, null, true);
                            }
                            i++;
                        }
                        this.onLoaded = true;
                    }
                    break;
                case 'nodeTemplate':
                    this.hasTemplate = false;
                    this.nodeTemplateFn = this.templateComplier(this.nodeTemplate);
                    this.reRenderNodes();
                    break;
                case 'selectedNodes':
                    this.removeSelectAll();
                    this.setProperties({ selectedNodes: newProp.selectedNodes }, true);
                    this.doSelectionAction();
                    break;
                case 'showCheckBox':
                case 'checkDisabledChildren':
                    this.reRenderNodes();
                    break;
                case 'sortOrder':
                    this.reRenderNodes();
                    break;
                case 'fullRowNavigable':
                    this.setProperties({ fullRowNavigable: newProp.fullRowNavigable }, true);
                    this.listBaseOption.itemNavigable = newProp.fullRowNavigable;
                    this.reRenderNodes();
                    break;
            }
        }
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers. It also removes the attributes and classes.
     *
     * @returns {void}
     */
    TreeView.prototype.destroy = function () {
        this.clearTemplate();
        this.element.removeAttribute('aria-activedescendant');
        this.unWireEvents();
        this.wireEditingEvents(false);
        if (!this.disabled) {
            this.rippleFn();
            this.rippleIconFn();
        }
        this.setCssClass(this.cssClass, null);
        this.setDragAndDrop(false);
        this.setFullRow(false);
        if (this.ulElement && this.ulElement.parentElement) {
            this.ulElement.parentElement.removeChild(this.ulElement);
        }
        this.ulElement = null;
        this.liList = null;
        this.startNode = null;
        this.firstTap = null;
        this.expandArgs = null;
        this.dragLi = null;
        this.dragTarget = null;
        this.dragParent = null;
        this.dragObj = null;
        this.dropObj = null;
        this.inputObj = null;
        this.touchEditObj = null;
        this.touchExpandObj = null;
        this.touchClickObj = null;
        _super.prototype.destroy.call(this);
    };
    /**
     * Adds the collection of TreeView nodes based on target and index position. If target node is not specified,
     * then the nodes are added as children of the given parentID or in the root level of TreeView.
     *
     * @param  { object } nodes - Specifies the array of JSON data that has to be added.
     * @param  { string | Element } target - Specifies ID of TreeView node/TreeView node as target element.
     * @param  { number } index - Specifies the index to place the newly added nodes in the target element.
     * @param { boolean } preventTargetExpand - If set to true, the target parent node will be prevented from auto expanding.
     * @returns {void}
     */
    TreeView.prototype.addNodes = function (nodes, target, index, preventTargetExpand) {
        if (isNOU(nodes)) {
            return;
        }
        nodes = JSON.parse(JSON.stringify(nodes));
        var dropLi = this.getElement(target);
        this.preventExpand = preventTargetExpand;
        if (this.fields.dataSource instanceof DataManager) {
            if (!this.isOffline) {
                this.crudOperation('insert', null, target, null, nodes, index, this.preventExpand);
            }
            else {
                this.addSuccess(nodes, dropLi, index);
            }
        }
        else if (this.dataType === 2) {
            this.addGivenNodes(nodes, dropLi, index);
        }
        else {
            if (dropLi) {
                this.addGivenNodes(nodes, dropLi, index);
            }
            else {
                nodes = this.getSortedData(nodes);
                for (var i = 0; i < nodes.length; i++) {
                    var pid = getValue(this.fields.parentID, nodes[parseInt(i.toString(), 10)]);
                    dropLi = pid ? this.getElement(pid.toString()) : pid;
                    if (!isNullOrUndefined(pid) && isNullOrUndefined(dropLi)) {
                        this.isHiddenItem = true;
                        this.preventExpand = false;
                        this.ensureVisible(pid);
                        this.preventExpand = preventTargetExpand;
                        this.isHiddenItem = false;
                        dropLi = this.getElement(pid.toString());
                    }
                    this.addGivenNodes([nodes[parseInt(i.toString(), 10)]], dropLi, index);
                }
            }
            this.groupedData = this.getGroupedData(this.treeData, this.fields.parentID);
        }
        this.setNodeFocusable();
        this.updateCheckedStateFromDS();
        if (this.showCheckBox && dropLi) {
            this.ensureParentCheckState(dropLi);
        }
        if ((this.fields.dataSource instanceof DataManager === false)) {
            this.preventExpand = false;
            this.triggerEvent('addNodes', nodes);
        }
    };
    /**
     * Editing can also be enabled by using the `beginEdit` property, instead of clicking on the
     * TreeView node. On passing the node ID or element through this property, the edit textBox
     * will be created for the particular node thus allowing us to edit it.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView node.
     * @returns {void}
     */
    TreeView.prototype.beginEdit = function (node) {
        var ele = this.getElement(node);
        if (isNOU(ele) || this.disabled) {
            return;
        }
        this.createTextbox(ele);
    };
    /**
     * Checks all the unchecked nodes. You can also check specific nodes by passing array of unchecked nodes
     * as argument to this method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @returns {void}
     */
    TreeView.prototype.checkAll = function (nodes) {
        if (this.showCheckBox) {
            this.doCheckBoxAction(nodes, true);
        }
    };
    /**
     * Collapses all the expanded TreeView nodes. You can collapse specific nodes by passing array of nodes as argument to this method.
     * You can also collapse all the nodes excluding the hidden nodes by setting **excludeHiddenNodes** to true. If you want to collapse
     * a specific level of nodes, set **level** as argument to collapseAll method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/ array of TreeView node.
     * @param  {number} level - TreeView nodes will collapse up to the given level.
     * @param  {boolean} excludeHiddenNodes - Whether or not to exclude hidden nodes of TreeView when collapsing all nodes.
     * @returns {void}
     */
    TreeView.prototype.collapseAll = function (nodes, level, excludeHiddenNodes) {
        if (!isNOU(nodes)) {
            this.doGivenAction(nodes, COLLAPSIBLE, false);
        }
        else {
            if (level > 0) {
                this.collapseByLevel(select('.' + PARENTITEM, this.element), level, excludeHiddenNodes);
            }
            else {
                this.collapseAllNodes(excludeHiddenNodes);
            }
        }
    };
    /**
     * Disables the collection of nodes by passing the ID of nodes or node elements in the array.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView nodes.
     * @returns {void}
     */
    TreeView.prototype.disableNodes = function (nodes) {
        if (!isNOU(nodes)) {
            this.doDisableAction(nodes);
        }
    };
    /**
     * Enables the collection of disabled nodes by passing the ID of nodes or node elements in the array.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView nodes.
     * @returns {void}
     */
    TreeView.prototype.enableNodes = function (nodes) {
        if (!isNOU(nodes)) {
            this.doEnableAction(nodes);
        }
    };
    /**
     * Ensures visibility of the TreeView node by using node ID or node element.
     * When many TreeView nodes are present and we need to find a particular node, `ensureVisible` property
     * helps bring the node to visibility by expanding the TreeView and scrolling to the specific node.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView nodes.
     * @returns {void}
     */
    TreeView.prototype.ensureVisible = function (node) {
        var parentsId = [];
        if (this.dataType === 1) {
            var nodeData = this.getTreeData(node);
            while (nodeData.length !== 0 && !isNOU(nodeData[0][this.fields.parentID])) {
                parentsId.push(nodeData[0][this.fields.parentID].toString());
                nodeData = this.getTreeData(nodeData[0][this.fields.parentID].toString());
            }
        }
        else if (this.dataType === 2) {
            parentsId = this.getHierarchicalParentId(node, this.treeData, parentsId);
        }
        this.expandAll(parentsId.reverse(), null, null, this.isHiddenItem);
        var liEle = this.getElement(node);
        if (!isNOU(liEle)) {
            if (typeof node == 'object') {
                var parents = this.parents(liEle, '.' + LISTITEM);
                this.expandAll(parents);
            }
            setTimeout(function () { liEle.scrollIntoView({ behavior: 'smooth' }); }, 450);
        }
    };
    /**
     * Expands all the collapsed TreeView nodes. You can expand the specific nodes by passing the array of collapsed nodes
     * as argument to this method. You can also expand all the collapsed nodes by excluding the hidden nodes by setting
     * **excludeHiddenNodes** to true to this method. To expand a specific level of nodes, set **level** as argument to expandAll method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView nodes.
     * @param  {number} level - TreeView nodes will expand up to the given level.
     * @param  {boolean} excludeHiddenNodes - Whether or not to exclude hidden nodes when expanding all nodes.
     * @param  {boolean} preventAnimation - Prevent the expand animation when expanding all nodes.
     * @returns {void}
     */
    TreeView.prototype.expandAll = function (nodes, level, excludeHiddenNodes, preventAnimation) {
        this.isAnimate = !preventAnimation;
        if (!isNOU(nodes)) {
            this.doGivenAction(nodes, EXPANDABLE, true);
        }
        else {
            if (level > 0) {
                this.expandByLevel(select('.' + PARENTITEM, this.element), level, excludeHiddenNodes);
            }
            else {
                this.expandAllNodes(excludeHiddenNodes);
                if (!this.loadOnDemand || this.element.classList.contains('e-filtering')) {
                    this.updateAttributes(this.element);
                    this.updateList();
                }
            }
        }
        this.isAnimate = true;
    };
    /**
     * Gets all the checked nodes including child, whether it is loaded or not.
     *
     * @returns {string[]} - An array of strings representing the unique identifiers of checked nodes.
     */
    TreeView.prototype.getAllCheckedNodes = function () {
        var checkNodes = this.checkedNodes;
        return checkNodes;
    };
    /**
     * Gets all the disabled nodes including child, whether it is loaded or not.
     *
     * @returns {string[]} An array of strings representing the unique identifiers of disabled nodes.
     */
    TreeView.prototype.getDisabledNodes = function () {
        var disabledNodes = this.disableNode;
        return disabledNodes;
    };
    /**
     * Gets the node's data such as id, text, parentID, selected, isChecked, and expanded by passing the node element or it's ID.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView node.
     * @returns {Object} - The data associated with the specified node.
     */
    TreeView.prototype.getNode = function (node) {
        var ele = this.getElement(node);
        return this.getNodeData(ele, true);
    };
    /**
     * To get the updated data source of TreeView after performing some operation like drag and drop, node editing,
     * node selecting/unSelecting, node expanding/collapsing, node checking/unChecking, adding and removing node.
     * * If you pass the ID of TreeView node as arguments for this method then it will return the updated data source
     * of the corresponding node otherwise it will return the entire updated data source of TreeView.
     * * The updated data source also contains custom attributes if you specified in data source.
     *
     * @param  {string | Element} node - Specifies ID of TreeView node/TreeView node.
     * @isGenericType true
     * @returns {Object} - The tree data associated with the specified node or element.
     */
    TreeView.prototype.getTreeData = function (node) {
        var id = this.getId(node);
        this.updatePersistProp();
        if (isNOU(id)) {
            return this.treeData;
        }
        else {
            var data = this.getNodeObject(id);
            return isNOU(data) ? [] : [data];
        }
    };
    /**
     * Moves the collection of nodes within the same TreeView based on target or its index position.
     *
     * @param  {string[] | Element[]} sourceNodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @param  {string | Element} target - Specifies ID of TreeView node/TreeView node as target element.
     * @param  {number} index - Specifies the index to place the moved nodes in the target element.
     * @param { boolean } preventTargetExpand - If set to true, the target parent node will be prevented from auto expanding.
     * @returns {void}
     */
    TreeView.prototype.moveNodes = function (sourceNodes, target, index, preventTargetExpand) {
        if (isNOU(sourceNodes) || sourceNodes.length === 0) {
            return;
        }
        var dropLi = this.getElement(target);
        var nodeData = [];
        if (isNOU(dropLi)) {
            this.isHiddenItem = true;
            this.ensureVisible(target);
            this.isHiddenItem = false;
            dropLi = this.getElement(target);
        }
        for (var i = 0; i < sourceNodes.length; i++) {
            var dragLi = this.getElement(sourceNodes[parseInt(i.toString(), 10)]);
            nodeData.push(this.getNode(dragLi));
            if (isNOU(dragLi) || dropLi.isSameNode(dragLi) || this.isDescendant(dragLi, dropLi)) {
                continue;
            }
            this.preventExpand = preventTargetExpand;
            this.dropAsChildNode(dragLi, dropLi, this, index, null, null, null, dropLi);
        }
        if (this.fields.dataSource instanceof DataManager === false) {
            this.preventExpand = false;
        }
        this.triggerEvent('moveNodes', nodeData);
    };
    /**
     * Refreshes a particular node of the TreeView.
     *
     * @param  {string | Element} target - Specifies the ID of TreeView node or TreeView node as target element.
     * @param  {Object[]} newData - Specifies the new data of TreeView node.
     * @returns {void}
     * ```typescript
     * var treeObj = document.getElementById("treeview").ej2_instances[0];
     * var data = treeObj.getTreeData("01");
     * var newData = {
     *   id: data[0].id,
     *   name: "new Text",
     * };
     * treeObj.refreshNode("01", [newData]);
     * ```
     */
    TreeView.prototype.refreshNode = function (target, newData) {
        if (isNOU(target) || isNOU(newData)) {
            return;
        }
        var isRefreshChild = false;
        if (this.dataType === 1 && newData.length > 1) {
            isRefreshChild = true;
        }
        else if (this.dataType === 2 && newData.length === 1) {
            var updatedChildValue = getValue(this.fields.child.toString(), newData[0]);
            if (!isNOU(updatedChildValue)) {
                isRefreshChild = true;
            }
        }
        var liEle = this.getElement(target);
        var id = liEle ? liEle.getAttribute('data-uid') : ((target) ? target.toString() : null);
        this.refreshData = this.getNodeObject(id);
        newData = JSON.parse(JSON.stringify(newData));
        var newNodeData;
        var parentData;
        if (this.dataType === 1 && isRefreshChild) {
            for (var k = 0; k < newData.length; k++) {
                if (isNOU(newData[parseInt(k.toString(), 10)][this.fields.parentID])) {
                    parentData = newData[parseInt(k.toString(), 10)];
                    newData.splice(k, 1);
                    break;
                }
            }
            newNodeData = extend({}, this.refreshData, parentData);
        }
        else {
            newNodeData = extend({}, this.refreshData, newData[0]);
        }
        if (isNOU(liEle)) {
            this.updatePosition(id, newNodeData, isRefreshChild, newData);
            return;
        }
        this.isRefreshed = true;
        var level = parseFloat(liEle.getAttribute('aria-level'));
        var newliEle = ListBase.createListItemFromJson(this.createElement, [newNodeData], this.listBaseOption, level);
        var ul = select('.' + PARENTITEM, liEle);
        var childItems = getValue(this.fields.child.toString(), newNodeData);
        if ((isRefreshChild && ul) || (isRefreshChild && !isNOU(childItems))) {
            var parentEle = liEle.parentElement;
            var index = Array.prototype.indexOf.call(parentEle.childNodes, liEle);
            remove(liEle);
            parentEle.insertBefore(newliEle[0], parentEle.childNodes[parseInt(index.toString(), 10)]);
            this.updatePosition(id, newNodeData, isRefreshChild, newData);
            if (isRefreshChild && ul) {
                this.expandAll([id]);
            }
        }
        else {
            var txtEle = select('.' + TEXTWRAP, liEle);
            var newTextEle = select('.' + TEXTWRAP, newliEle[0]);
            var icon = select('div.' + ICON, txtEle);
            var newIcon = select('div.' + ICON, newTextEle);
            if (icon && newIcon) {
                if (newIcon.classList.contains(EXPANDABLE) && icon.classList.contains(COLLAPSIBLE)) {
                    removeClass([newIcon], EXPANDABLE);
                    addClass([newIcon], COLLAPSIBLE);
                }
                else if (newIcon.classList.contains(COLLAPSIBLE) && icon.classList.contains(EXPANDABLE)) {
                    removeClass([newIcon], COLLAPSIBLE);
                    addClass([newIcon], EXPANDABLE);
                }
                else if (icon.classList.contains('interaction')) {
                    addClass([newIcon], 'interaction');
                }
            }
            remove(txtEle);
            var fullEle = select('.' + FULLROW, liEle);
            fullEle.parentNode.insertBefore(newTextEle, fullEle.nextSibling);
            this.updatePosition(id, newNodeData, isRefreshChild, newData);
        }
        liEle = this.getElement(target);
        if (newNodeData[this.fields.tooltip]) {
            liEle.setAttribute('title', newNodeData[this.fields.tooltip]);
        }
        if (Object.prototype.hasOwnProperty.call(newNodeData, this.fields.htmlAttributes) && newNodeData[this.fields.htmlAttributes]) {
            var attr = {};
            merge(attr, newNodeData[this.fields.htmlAttributes]);
            if (attr.class) {
                addClass([liEle], attr.class.split(' '));
                delete attr.class;
            }
            else {
                attributes(liEle, attr);
            }
        }
        if (this.selectedNodes.indexOf(id) !== -1) {
            liEle.setAttribute('aria-selected', 'true');
            addClass([liEle], ACTIVE);
        }
        this.isRefreshed = false;
        this.triggerEvent('refreshNode', [this.getNode(liEle)]);
    };
    /**
     * Removes the collection of TreeView nodes by passing the array of node details as argument to this method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @returns {void}
     */
    TreeView.prototype.removeNodes = function (nodes) {
        if (!isNOU(nodes)) {
            if (this.fields.dataSource instanceof DataManager && !this.isOffline) {
                this.crudOperation('delete', nodes);
            }
            else {
                this.deleteSuccess(nodes);
            }
        }
    };
    /**
     * Replaces the text of the TreeView node with the given text only when the `allowEditing` property is enabled.
     *
     * @param  {string | Element} target - Specifies ID of TreeView node/TreeView node as target element.
     * @param  {string} newText - Specifies the new text of TreeView node.
     * @returns {void}
     */
    TreeView.prototype.updateNode = function (target, newText) {
        var _this = this;
        if (isNOU(target) || isNOU(newText) || !this.allowEditing) {
            return;
        }
        var liEle = this.getElement(target);
        if (isNOU(liEle)) {
            return;
        }
        var txtEle = select('.' + LISTTEXT, liEle);
        this.updateOldText(liEle);
        var eventArgs = this.getEditEvent(liEle, null, null);
        this.trigger('nodeEditing', eventArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                if (_this.fields.dataSource instanceof DataManager && !_this.isOffline) {
                    _this.crudOperation('update', null, target, newText, null, null, false);
                }
                else {
                    _this.appendNewText(liEle, txtEle, newText, false);
                }
            }
        });
    };
    /**
     * Unchecks all the checked nodes. You can also uncheck the specific nodes by passing array of checked nodes
     * as argument to this method.
     *
     * @param  {string[] | Element[]} nodes - Specifies the array of TreeView nodes ID/array of TreeView node.
     * @returns {void}
     */
    TreeView.prototype.uncheckAll = function (nodes) {
        if (this.showCheckBox) {
            this.doCheckBoxAction(nodes, false);
        }
    };
    TreeView.prototype.setNodeFocusable = function () {
        var firstNode = select('.' + LISTITEM, this.element);
        if (firstNode) {
            firstNode.setAttribute('tabindex', '0');
            this.updateIdAttr(null, firstNode);
        }
    };
    var TreeView_1;
    __decorate([
        Property(false)
    ], TreeView.prototype, "allowDragAndDrop", void 0);
    __decorate([
        Property(false)
    ], TreeView.prototype, "allowEditing", void 0);
    __decorate([
        Property(false)
    ], TreeView.prototype, "allowMultiSelection", void 0);
    __decorate([
        Property(false)
    ], TreeView.prototype, "allowTextWrap", void 0);
    __decorate([
        Complex({}, NodeAnimationSettings)
    ], TreeView.prototype, "animation", void 0);
    __decorate([
        Property()
    ], TreeView.prototype, "checkedNodes", void 0);
    __decorate([
        Property(true)
    ], TreeView.prototype, "checkDisabledChildren", void 0);
    __decorate([
        Property('')
    ], TreeView.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], TreeView.prototype, "disabled", void 0);
    __decorate([
        Property(null)
    ], TreeView.prototype, "dragArea", void 0);
    __decorate([
        Property(true)
    ], TreeView.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(false)
    ], TreeView.prototype, "enablePersistence", void 0);
    __decorate([
        Property()
    ], TreeView.prototype, "expandedNodes", void 0);
    __decorate([
        Property('Auto')
    ], TreeView.prototype, "expandOn", void 0);
    __decorate([
        Complex({}, FieldsSettings)
    ], TreeView.prototype, "fields", void 0);
    __decorate([
        Property(true)
    ], TreeView.prototype, "fullRowSelect", void 0);
    __decorate([
        Property(true)
    ], TreeView.prototype, "loadOnDemand", void 0);
    __decorate([
        Property()
    ], TreeView.prototype, "locale", void 0);
    __decorate([
        Property()
    ], TreeView.prototype, "nodeTemplate", void 0);
    __decorate([
        Property()
    ], TreeView.prototype, "selectedNodes", void 0);
    __decorate([
        Property('None')
    ], TreeView.prototype, "sortOrder", void 0);
    __decorate([
        Property(false)
    ], TreeView.prototype, "showCheckBox", void 0);
    __decorate([
        Property(true)
    ], TreeView.prototype, "autoCheck", void 0);
    __decorate([
        Property(false)
    ], TreeView.prototype, "fullRowNavigable", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "created", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "dataBound", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "dataSourceChanged", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "drawNode", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "keyPress", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeChecked", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeChecking", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeClicked", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeCollapsed", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeCollapsing", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeDragging", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeDragStart", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeDragStop", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeDropped", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeEdited", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeEditing", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeExpanded", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeExpanding", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeSelected", void 0);
    __decorate([
        Event()
    ], TreeView.prototype, "nodeSelecting", void 0);
    TreeView = TreeView_1 = __decorate([
        NotifyPropertyChanges
    ], TreeView);
    return TreeView;
}(Component));
export { TreeView };
