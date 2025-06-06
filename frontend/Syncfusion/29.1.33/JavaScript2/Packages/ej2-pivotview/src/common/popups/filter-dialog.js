import { createElement, removeClass, addClass, remove, isNullOrUndefined, setStyleAttribute, closest, EventHandler, getInstance } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constant';
import { TreeView, Tab } from '@syncfusion/ej2-navigations';
import { Dialog } from '@syncfusion/ej2-popups';
import { MaskedTextBox, NumericTextBox } from '@syncfusion/ej2-inputs';
import { setStyleAndAttributes } from '@syncfusion/ej2-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { PivotUtil } from '../../base/util';
import * as events from '../base/constant';
import { Button } from '@syncfusion/ej2-buttons';
/**
 * `FilterDialog` module to create filter dialog.
 */
/** @hidden */
var FilterDialog = /** @class */ (function () {
    /**
     * Constructor for the dialog action.
     *
     * @param {PivotCommon} parent - parent
     * @hidden
     */
    function FilterDialog(parent) {
        this.parent = parent;
    }
    /**
     * Creates the member filter dialog for the selected field.
     *
     * @function createFilterDialog
     * @param {any} treeData -treeData.
     * @param {string} fieldName -fieldName.
     * @param {string} fieldCaption -fieldCaption.
     * @param {HTMLElement} target -target.
     * @returns {void}
     * @hidden
     */
    FilterDialog.prototype.createFilterDialog = function (treeData, fieldName, fieldCaption, target) {
        var _this = this;
        var editorDialog = createElement('div', {
            id: this.parent.parentID + '_EditorTreeView',
            className: cls.MEMBER_EDITOR_DIALOG_CLASS + ' ' + (this.parent.dataType === 'olap' ? 'e-olap-editor-dialog' : '') + (this.parent.isDataOverflow ? ' ' + cls.PIVOT_FILTER_MEMBER_LIMIT : ''),
            attrs: { 'data-fieldName': fieldName, 'aria-label': fieldCaption }
        });
        var filterCaption = this.parent.engineModule.fieldList[fieldName].caption;
        var headerTemplate = this.parent.localeObj.getConstant('filter') + ' ' +
            '"' + fieldCaption + '"' + ' ' + this.parent.localeObj.getConstant('by');
        this.filterObject = this.getFilterObject(fieldName);
        this.isSearchEnabled = false;
        this.allowExcelLikeFilter = this.isExcelFilter(fieldName);
        this.parent.element.appendChild(editorDialog);
        this.dialogPopUp = new Dialog({
            animationSettings: { effect: (this.allowExcelLikeFilter ? 'None' : 'Fade') },
            allowDragging: false,
            header: (this.allowExcelLikeFilter ? headerTemplate : filterCaption),
            // content: (this.allowExcelLikeFilter ? '' : this.createTreeView(treeData, fieldCaption, fieldName)),
            content: '',
            isModal: true,
            visible: true,
            showCloseIcon: this.allowExcelLikeFilter ? true : false,
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            width: '320px',
            height: this.parent.isDataOverflow ? (this.allowExcelLikeFilter ? '440px' : '400px') :
                (this.allowExcelLikeFilter ? '400px' : '350px'),
            position: { X: 'center', Y: 'center' },
            buttons: [
                {
                    isFlat: false,
                    buttonModel: {
                        cssClass: 'e-clear-filter-button' + (this.allowExcelLikeFilter ? '' : ' ' + cls.ICON_DISABLE) + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                        iconCss: 'e-icons e-clear-filter-icon', enableRtl: this.parent.enableRtl,
                        content: this.parent.localeObj.getConstant('clearFilter'), disabled: (this.filterObject ? false : true)
                    }
                },
                {
                    isFlat: false,
                    buttonModel: {
                        cssClass: cls.OK_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('ok'), isPrimary: true
                    }
                },
                {
                    click: this.closeFilterDialog.bind(this),
                    isFlat: false,
                    buttonModel: { cssClass: cls.CANCEL_BUTTON_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), content: this.parent.localeObj.getConstant('cancel') }
                }
            ],
            closeOnEscape: this.parent.renderMode === 'Popup' ? false : true,
            target: target,
            cssClass: this.parent.cssClass,
            close: this.removeFilterDialog.bind(this)
        });
        this.dialogPopUp.isStringTemplate = true;
        this.dialogPopUp.appendTo(editorDialog);
        var filterArgs = {
            cancel: false,
            fieldName: fieldName,
            fieldMembers: this.parent.dataSourceSettings.allowMemberFilter ? treeData : [],
            filterSetting: this.filterObject
        };
        var control = this.parent.moduleName === 'pivotfieldlist' && this.parent.control.isPopupView ?
            this.parent.control.pivotGridModule : this.parent.control;
        control.trigger(events.memberEditorOpen, filterArgs, function (observedArgs) {
            if (!observedArgs.cancel) {
                treeData = observedArgs.fieldMembers;
                if (_this.allowExcelLikeFilter) {
                    _this.createTabMenu(treeData, fieldCaption, fieldName);
                    addClass([_this.dialogPopUp.element], 'e-excel-filter');
                    _this.updateCheckedState();
                }
                else {
                    _this.dialogPopUp.content = _this.createTreeView(treeData, fieldCaption, fieldName);
                    _this.updateCheckedState();
                }
                setStyleAttribute(_this.dialogPopUp.element, { 'visibility': 'visible' });
                if (_this.allowExcelLikeFilter) {
                    _this.dialogPopUp.element.querySelector('.e-dlg-closeicon-btn').focus();
                }
                _this.memberTreeView.nodeChecked =
                    _this.parent.control.pivotButtonModule.nodeStateModified.bind(_this.parent.control.pivotButtonModule);
                _this.allMemberSelect.nodeChecked =
                    _this.parent.control.pivotButtonModule.nodeStateModified.bind(_this.parent.control.pivotButtonModule);
            }
            else {
                _this.dialogPopUp.close();
                _this.dialogPopUp = undefined;
            }
        });
    };
    FilterDialog.prototype.createTreeView = function (treeData, fieldCaption, fieldName) {
        var _this = this;
        var editorTreeWrapper = createElement('div', {
            id: this.parent.parentID + 'EditorDiv',
            className: cls.EDITOR_TREE_WRAPPER_CLASS + (this.allowExcelLikeFilter ? ' e-excelfilter' : '')
        });
        var levelWrapper = createElement('button', {
            id: this.parent.parentID + '_LevelDiv',
            className: 'e-level-container-class', attrs: { 'type': 'button' }
        });
        var searchWrapper = createElement('div', {
            id: this.parent.parentID + '_SearchDiv', attrs: { 'tabindex': '-1' },
            className: cls.EDITOR_SEARCH_WRAPPER_CLASS
        });
        var filterCaption = this.parent.engineModule.fieldList[fieldName].caption;
        var editorSearch = createElement('input', {
            attrs: { 'type': 'text', className: cls.EDITOR_SEARCH__INPUT_CLASS }
        });
        var nodeLimitText = this.parent.isDataOverflow ?
            ((this.parent.currentTreeItems.length - this.parent.control.maxNodeLimitInMemberEditor) +
                this.parent.control.localeObj.getConstant('editorDataLimitMsg')) : '';
        var labelWrapper = createElement('div', {
            id: this.parent.parentID + '_LabelDiv',
            attrs: { 'tabindex': '-1', 'title': nodeLimitText },
            className: cls.EDITOR_LABEL_WRAPPER_CLASS
        });
        this.parent.editorLabelElement = createElement('label', { className: cls.EDITOR_LABEL_CLASS });
        this.parent.editorLabelElement.innerText = nodeLimitText;
        labelWrapper.style.display = this.parent.isDataOverflow ? 'block' : 'none';
        labelWrapper.appendChild(this.parent.editorLabelElement);
        searchWrapper.appendChild(editorSearch);
        this.createSortOptions(fieldName, searchWrapper, treeData);
        var selectAllWrapper = createElement('div', {
            id: this.parent.parentID + '_AllDiv', attrs: { 'tabindex': '-1' },
            className: cls.SELECT_ALL_WRAPPER_CLASS
        });
        var selectAllContainer = createElement('div', { id: this.parent.parentID + '_SelectAllContainer', className: cls.SELECT_ALL_CLASS });
        var treeOuterDiv = createElement('div', { className: cls.EDITOR_TREE_CONTAINER_CLASS + '-outer-div' });
        var treeViewContainer = createElement('div', { className: cls.EDITOR_TREE_CONTAINER_CLASS });
        var promptDiv = createElement('div', {
            className: cls.EMPTY_MEMBER_CLASS + ' ' + cls.ICON_DISABLE
        });
        promptDiv.innerText = this.parent.localeObj.getConstant('noMatches');
        if (this.parent.dataType === 'olap' && this.parent.control.loadOnDemandInMemberEditor &&
            !this.parent.engineModule.fieldList[fieldName].isHierarchy &&
            !this.parent.engineModule.fieldList[fieldName].isNamedSets) {
            searchWrapper.appendChild(levelWrapper);
            this.createLevelWrapper(levelWrapper, fieldName);
        }
        selectAllWrapper.appendChild(selectAllContainer);
        editorTreeWrapper.appendChild(searchWrapper);
        editorTreeWrapper.appendChild(selectAllWrapper);
        editorTreeWrapper.appendChild(promptDiv);
        this.editorSearch = new MaskedTextBox({
            placeholder: this.parent.localeObj.getConstant('search') + ' ' + '&#8220' + filterCaption + '&#8220',
            enableRtl: this.parent.enableRtl,
            cssClass: cls.EDITOR_SEARCH_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
            showClearButton: true,
            change: function (e) {
                if (_this.parent.dataType === 'olap') {
                    _this.searchOlapTreeView(e, promptDiv);
                }
                else {
                    _this.parent.eventBase.searchTreeNodes(e, _this.memberTreeView, false);
                    var filterDialog = _this.dialogPopUp.element;
                    var liList = [].slice.call(_this.memberTreeView.element.querySelectorAll('li'));
                    if (liList.length === 0) {
                        _this.allMemberSelect.disableNodes([_this.allMemberSelect.element.querySelector('li')]);
                        filterDialog.querySelector('.' + cls.OK_BUTTON_CLASS).setAttribute('disabled', 'disabled');
                        removeClass([promptDiv], cls.ICON_DISABLE);
                    }
                    else {
                        _this.allMemberSelect.enableNodes([_this.allMemberSelect.element.querySelector('li')]);
                        filterDialog.querySelector('.' + cls.OK_BUTTON_CLASS).removeAttribute('disabled');
                        addClass([promptDiv], cls.ICON_DISABLE);
                    }
                    _this.updateCheckedState();
                }
            }
        });
        this.editorSearch.isStringTemplate = true;
        this.editorSearch.appendTo(editorSearch);
        var nodeAttr = { 'data-fieldName': fieldName, 'data-memberId': 'all' };
        var data = [{ id: 'all', name: this.parent.localeObj.getConstant('all'), isSelected: true, htmlAttributes: nodeAttr }];
        this.allMemberSelect = new TreeView({
            fields: { dataSource: data, id: 'id', text: 'name', isChecked: 'isSelected' },
            showCheckBox: true,
            expandOn: 'None',
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            nodeClicked: this.nodeCheck.bind(this, true),
            keyPress: this.nodeCheck.bind(this, true),
            nodeSelected: function (args) {
                removeClass([args.node], 'e-active');
                args.cancel = true;
            },
            cssClass: this.parent.cssClass
        });
        this.allMemberSelect.isStringTemplate = true;
        if (!isNullOrUndefined(this.parent.currentTreeItems)) {
            for (var i = 0; i < this.parent.currentTreeItems.length; i++) {
                if (this.parent.currentTreeItems[i].id.indexOf('\n') ||
                    this.parent.currentTreeItems[i].id.indexOf('\n') === 0) {
                    this.parent.currentTreeItems[i].id = this.parent.currentTreeItems[i].id.replace('\n', ' ');
                }
            }
        }
        this.allMemberSelect.appendTo(selectAllContainer);
        treeOuterDiv.appendChild(treeViewContainer);
        editorTreeWrapper.appendChild(treeOuterDiv);
        this.memberTreeView = new TreeView({
            fields: { dataSource: treeData, id: 'id', text: 'name', isChecked: 'isSelected', parentID: 'pid' },
            showCheckBox: true,
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            nodeChecking: this.validateTreeNode.bind(this),
            nodeClicked: this.nodeCheck.bind(this, false),
            keyPress: this.nodeCheck.bind(this, false),
            nodeExpanding: this.updateChildNodes.bind(this),
            nodeSelected: function (args) {
                removeClass([args.node], 'e-active');
                args.cancel = true;
            },
            expandOn: 'None',
            cssClass: this.parent.cssClass
        });
        this.memberTreeView.isStringTemplate = true;
        this.memberTreeView.appendTo(treeViewContainer);
        if (this.parent.isDataOverflow && (this.parent.control.maxNodeLimitInMemberEditor < this.parent.currentTreeItems.length)) {
            editorTreeWrapper.appendChild(labelWrapper);
        }
        return editorTreeWrapper;
    };
    FilterDialog.prototype.createSortOptions = function (fieldName, target, treeData) {
        if (this.parent.dataType === 'pivot' && treeData && treeData.length > 0) {
            var sortOrder = this.parent.engineModule.fieldList[fieldName].sort;
            var sortWrapper = createElement('div', {
                className: cls.FILTER_SORT_CLASS + ' e-btn-group' + (this.parent.enableRtl ? ' ' + cls.RTL : '') + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
                id: this.parent.element.id + '_Member_Sort'
            });
            this.parent.element.appendChild(sortWrapper);
            var sortAscendElement = createElement('button', {
                className: (sortOrder === 'Ascending' ? cls.SORT_SELECTED_CLASS + ' ' : '') + cls.MEMBER_SORT_CLASS,
                id: this.parent.element.id + '_Sort_Ascend', attrs: { 'type': 'button', 'aria-label': 'button' }
            });
            var sortDescendElement = createElement('button', {
                className: (sortOrder === 'Descending' ? cls.SORT_SELECTED_CLASS + ' ' : '') + cls.MEMBER_SORT_CLASS,
                id: this.parent.element.id + '_Sort_Descend', attrs: { 'type': 'button', 'aria-label': 'button' }
            });
            var sortBtnElement = new Button({
                iconCss: cls.ICON + ' ' + cls.SORT_ASCEND_ICON_CLASS, enableRtl: this.parent.enableRtl, cssClass: this.parent.cssClass, enableHtmlSanitizer: this.parent.enableHtmlSanitizer
            });
            sortBtnElement.appendTo(sortAscendElement);
            sortBtnElement = new Button({
                iconCss: cls.ICON + ' ' + cls.SORT_DESCEND_ICON_CLASS, enableRtl: this.parent.enableRtl, cssClass: this.parent.cssClass, enableHtmlSanitizer: this.parent.enableHtmlSanitizer
            });
            sortBtnElement.appendTo(sortDescendElement);
            sortWrapper.appendChild(sortAscendElement);
            sortWrapper.appendChild(sortDescendElement);
            target.appendChild(sortWrapper);
            this.unWireEvent(sortAscendElement);
            this.unWireEvent(sortDescendElement);
            this.wireEvent(sortAscendElement, fieldName);
            this.wireEvent(sortDescendElement, fieldName);
        }
    };
    FilterDialog.prototype.createLevelWrapper = function (levelWrapper, fieldName) {
        var _this = this;
        var engineModule = this.parent.engineModule;
        var levels = engineModule.fieldList[fieldName].levels;
        var levelCount = engineModule.fieldList[fieldName].levelCount;
        var items = [];
        for (var i = 0, cnt = levels.length; i < cnt; i++) {
            items.push({ id: levels[i].id, text: levels[i].name });
        }
        this.dropMenu = new DropDownButton({
            cssClass: 'e-level-drop e-caret-hide' + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
            items: items, iconCss: 'e-icons e-dropdown-icon',
            disabled: (levelCount === levels.length),
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            beforeOpen: function (args) {
                var items = [].slice.call(args.element.querySelectorAll('li'));
                var engineModule = _this.parent.engineModule;
                var levelCount = engineModule.fieldList[fieldName].levelCount;
                removeClass(items, cls.MENU_DISABLE);
                for (var i = 0, cnt = items.length; i < cnt; i++) {
                    if (i < levelCount) {
                        addClass([items[i]], cls.MENU_DISABLE);
                    }
                }
            },
            select: function (args) {
                var fieldName = _this.dialogPopUp.element.getAttribute('data-fieldname');
                var engineModule = _this.parent.engineModule;
                var selectedLevel;
                for (var i = 0, cnt = items.length; i < cnt; i++) {
                    if (items[i].id === args.item.id) {
                        selectedLevel = i;
                    }
                }
                engineModule.getFilterMembers(_this.parent.dataSourceSettings, fieldName, selectedLevel + 1, false, true);
            },
            close: function () {
                var engineModule = _this.parent.engineModule;
                var levels = engineModule.fieldList[fieldName].levels;
                var levelCount = engineModule.fieldList[fieldName].levelCount;
                if (levelCount === levels.length) {
                    _this.dropMenu.disabled = true;
                    _this.dropMenu.dataBind();
                }
                else {
                    _this.dropMenu.disabled = false;
                }
            }
        });
        this.dropMenu.appendTo(levelWrapper);
    };
    FilterDialog.prototype.searchOlapTreeView = function (e, promptDiv) {
        var popupInstance = this;
        clearTimeout(this.timeOutObj);
        this.timeOutObj = setTimeout(function () {
            var engineModule = popupInstance.parent.engineModule;
            var filterDialog = popupInstance.dialogPopUp.element;
            var fieldName = filterDialog.getAttribute('data-fieldname');
            var nodeLimit = popupInstance.parent.control.maxNodeLimitInMemberEditor ?
                popupInstance.parent.control.maxNodeLimitInMemberEditor : 5000;
            if (!engineModule.fieldList[fieldName].isHierarchy) {
                if (popupInstance.dropMenu && e.value !== '') {
                    popupInstance.dropMenu.disabled = true;
                }
                else {
                    popupInstance.dropMenu.disabled = false;
                }
                if (!popupInstance.parent.control.loadOnDemandInMemberEditor) {
                    engineModule.getSearchMembers(popupInstance.parent.dataSourceSettings, fieldName, e.value.toLowerCase(), nodeLimit, true);
                }
                else {
                    var levelCount = engineModule.fieldList[fieldName].levelCount ?
                        engineModule.fieldList[fieldName].levelCount : 1;
                    engineModule.getSearchMembers(popupInstance.parent.dataSourceSettings, fieldName, e.value.toLowerCase(), nodeLimit, false, levelCount);
                }
                popupInstance.parent.eventBase.searchTreeNodes(e, popupInstance.memberTreeView, false, false);
            }
            else {
                popupInstance.parent.eventBase.searchTreeNodes(e, popupInstance.memberTreeView, false, true);
            }
            var liList = [].slice.call(popupInstance.memberTreeView.element.querySelectorAll('li'));
            // for (let element of liList) {
            //     if (element.querySelector('.interaction')) {
            //         setStyleAttribute(element.querySelector('.interaction'), { display: 'none' });
            //     }
            // }
            if (liList.length === 0) {
                popupInstance.allMemberSelect.disableNodes([popupInstance.allMemberSelect.element.querySelector('li')]);
                filterDialog.querySelector('.' + cls.OK_BUTTON_CLASS).setAttribute('disabled', 'disabled');
                removeClass([promptDiv], cls.ICON_DISABLE);
            }
            else {
                popupInstance.allMemberSelect.enableNodes([popupInstance.allMemberSelect.element.querySelector('li')]);
                filterDialog.querySelector('.' + cls.OK_BUTTON_CLASS).removeAttribute('disabled');
                addClass([promptDiv], cls.ICON_DISABLE);
            }
            popupInstance.updateCheckedState();
        }, 500);
    };
    FilterDialog.prototype.nodeCheck = function (isAllMember, args) {
        var checkedNode = [args.node];
        var target = args.event.target;
        if (target.classList.contains('e-fullrow') || args.event.key === 'Enter') {
            var memberObj = isAllMember ? this.allMemberSelect : this.memberTreeView;
            var getNodeDetails = memberObj.getNode(args.node);
            if (getNodeDetails.isChecked === 'true') {
                memberObj.uncheckAll(checkedNode);
            }
            else {
                memberObj.checkAll(checkedNode);
            }
        }
        else if (args.event.keyCode === 38 && !isAllMember) {
            removeClass(this.memberTreeView.element.querySelectorAll('li.e-prev-active-node'), 'e-prev-active-node');
            addClass(checkedNode, 'e-prev-active-node');
        }
    };
    FilterDialog.prototype.applySorting = function (fieldName, args) {
        var target = closest(args.target, '.' + cls.MEMBER_SORT_CLASS);
        if (target) {
            var sortElements = [].slice.call(closest(target, '.' + cls.FILTER_SORT_CLASS).querySelectorAll('.' + cls.MEMBER_SORT_CLASS));
            if (target.querySelector('.' + cls.SORT_ASCEND_ICON_CLASS) && !target.classList.contains(cls.SORT_SELECTED_CLASS)) {
                this.updateFilterMembers('Ascending', fieldName);
                addClass([target], cls.SORT_SELECTED_CLASS);
                removeClass([sortElements[1]], cls.SORT_SELECTED_CLASS);
            }
            else if (target.querySelector('.' + cls.SORT_DESCEND_ICON_CLASS) && !target.classList.contains(cls.SORT_SELECTED_CLASS)) {
                this.updateFilterMembers('Descending', fieldName);
                addClass([target], cls.SORT_SELECTED_CLASS);
                removeClass([sortElements[0]], cls.SORT_SELECTED_CLASS);
            }
            else {
                this.updateFilterMembers('None', fieldName);
                removeClass(sortElements, cls.SORT_SELECTED_CLASS);
            }
        }
    };
    FilterDialog.prototype.updateFilterMembers = function (order, fieldName) {
        var fieldInfo = this.parent.engineModule.fieldList[fieldName];
        var members = order === 'None' ?
            PivotUtil.getClonedData(fieldInfo.dateMember) : this.parent.currentTreeItems.slice();
        var sortType = fieldInfo.isAlphanumeric ? true : undefined;
        var isHeaderSortByDefault = false;
        var membersInfo = fieldInfo && fieldInfo.membersOrder ?
            fieldInfo.membersOrder.slice() : [];
        var sortDetails = {
            fieldName: fieldName,
            sortOrder: order,
            members: membersInfo && membersInfo.length > 0 ? membersInfo : Object.keys(members),
            IsOrderChanged: false
        };
        if (membersInfo && membersInfo.length > 0) {
            members = PivotUtil.applyCustomSort(sortDetails, members, sortType);
        }
        else {
            var groupField = this.parent.dataSourceSettings.groupSettings.filter(function (field) {
                return field.name === fieldName && field.type.toLocaleLowerCase() === 'number';
            });
            var isNumberGroupSorting = !isNullOrUndefined(groupField) && groupField.length > 0 ? true : false;
            members =
                PivotUtil.applyHeadersSort(members, sortDetails.sortOrder, sortType, isNumberGroupSorting);
            isHeaderSortByDefault = true;
        }
        var control = this.parent.moduleName === 'pivotfieldlist' && this.parent.control.isPopupView ?
            this.parent.control.pivotGridModule : this.parent.control;
        if (isHeaderSortByDefault) {
            var copyOrder = [];
            for (var m = 0, n = 0; m < members.length; m++) {
                if (members[m].actualText !== 'Grand Total') {
                    copyOrder[n++] = members[m].actualText;
                }
            }
            sortDetails.members = copyOrder;
        }
        control.trigger(events.onHeadersSort, sortDetails);
        if (sortDetails.IsOrderChanged) {
            members = PivotUtil.applyCustomSort(sortDetails, members, sortType, true);
        }
        this.parent.currentTreeItems = [];
        this.parent.searchTreeItems = [];
        var treeData = [];
        var modifiedFieldName = fieldName.replace(/[^a-zA-Z0-9 ]/g, '_');
        var engineModule = this.parent.engineModule;
        for (var i = 0, lnt = members.length; i < lnt; i++) {
            if (order === 'None') {
                var memberName = members[i].actualText.toString();
                var nodeAttr = { 'data-fieldName': fieldName, 'data-memberId': memberName };
                var obj = {
                    id: modifiedFieldName + '_' + (i + 1),
                    htmlAttributes: nodeAttr,
                    actualText: members[i].actualText,
                    name: this.parent.isDateField ? members[i].formattedText :
                        engineModule.getFormattedValue(memberName, fieldName).formattedText,
                    isSelected: this.parent.currentTreeItemsPos[members[i].actualText].isSelected
                };
                this.parent.currentTreeItems.push(obj);
                if (this.editorSearch.value !== '') {
                    if (obj.name.toLowerCase().indexOf(this.editorSearch.value.toLowerCase()) > -1) {
                        this.parent.searchTreeItems.push(obj);
                        treeData.push(obj);
                    }
                }
                else {
                    this.parent.searchTreeItems.push(obj);
                    treeData.push(obj);
                }
            }
            else {
                this.parent.currentTreeItems.push(members[i]);
                if (this.editorSearch.value !== '') {
                    if (members[i].name.toLowerCase().indexOf(this.editorSearch.value.toLowerCase()) > -1) {
                        this.parent.searchTreeItems.push(members[i]);
                        treeData.push(members[i]);
                    }
                }
                else {
                    this.parent.searchTreeItems.push(members[i]);
                    treeData.push(members[i]);
                }
            }
            this.parent.currentTreeItemsPos[members[i].actualText].index = i;
        }
        var dataCount = this.memberTreeView.fields.dataSource.length;
        this.memberTreeView.fields = { dataSource: treeData.slice(0, dataCount), id: 'id', text: 'name', isChecked: 'isSelected', parentID: 'pid' };
        this.memberTreeView.dataBind();
    };
    FilterDialog.prototype.updateChildNodes = function (args) {
        if (this.parent.dataType === 'olap') {
            var engineModule = this.parent.engineModule;
            var fieldName = args.node.getAttribute('data-fieldname');
            var fieldList = engineModule.fieldList[fieldName];
            var filterItems = [];
            if (fieldList && fieldList.filterMembers.length > 0 && !this.isSearchEnabled &&
                !fieldList.members[args.nodeData.id].isNodeExpand) {
                var childNodes = [];
                for (var _i = 0, _a = fieldList.filterMembers; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.pid === args.nodeData.id.toString()) {
                        childNodes.push(item);
                    }
                }
                if (childNodes.length === 0) {
                    fieldList.childMembers = [];
                    engineModule.getChildMembers(this.parent.dataSourceSettings, args.nodeData.id.toString(), fieldName);
                    childNodes = fieldList.childMembers;
                    fieldList.childMembers = [];
                }
                var treeData = PivotUtil.getClonedData(childNodes);
                var curTreeData = this.memberTreeView.fields.dataSource;
                var isInclude = false;
                if (!isNullOrUndefined(this.filterObject)) {
                    isInclude = this.filterObject.type === 'Include' ? true : false;
                    filterItems = this.filterObject.items ? this.filterObject.items : [];
                }
                treeData = this.updateChildData(isInclude, treeData, filterItems, fieldName, args.nodeData);
                treeData = this.parent.eventBase.sortOlapFilterData(treeData, engineModule.fieldList[fieldName].sort);
                for (var _b = 0, treeData_1 = treeData; _b < treeData_1.length; _b++) {
                    var node = treeData_1[_b];
                    curTreeData.push(node);
                }
                fieldList.members[args.nodeData.id].isNodeExpand = true;
                this.memberTreeView.addNodes(treeData, args.node);
            }
        }
    };
    FilterDialog.prototype.updateChildData = function (isInclude, members, filterItems, fieldName, parentNode) {
        var memberCount = Object.keys(this.parent.currentTreeItemsPos).length;
        var fieldList = this.parent.engineModule.fieldList[fieldName];
        var list = [];
        var childMemberCount = 1;
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            var obj = member;
            var memberName = member.id.toString();
            fieldList.members[memberName].isNodeExpand = false;
            member.isSelected = (parentNode.isChecked === 'true');
            if (childMemberCount <= this.parent.control.maxNodeLimitInMemberEditor) {
                list.push(obj);
            }
            this.parent.currentTreeItems.push(obj);
            this.parent.searchTreeItems.push(obj);
            this.parent.currentTreeItemsPos[memberName] = { index: memberCount, isSelected: obj.isSelected };
            memberCount++;
            childMemberCount++;
        }
        this.parent.isDataOverflow = false;
        return list;
    };
    FilterDialog.prototype.createTabMenu = function (treeData, fieldCaption, fieldName) {
        var wrapper = createElement('div', {
            id: this.parent.parentID + '_FilterTabContainer',
            className: cls.PIVOT_FILTER_TAB_CONTAINER,
            attrs: {
                'tabindex': '-1'
            }
        });
        this.dialogPopUp.content = wrapper;
        this.dialogPopUp.dataBind();
        var types = ['Label', 'Value', 'Include', 'Exclude'];
        var regx = '((-|\\+)?[0-9]+(\\.[0-9]+)?)+';
        var member = Object.keys(this.parent.engineModule.fieldList[fieldName].members)[0];
        var fieldType = this.parent.engineModule.fieldList[fieldName].type;
        var formatObj = PivotUtil.getFieldByName(fieldName, this.parent.dataSourceSettings.formatSettings);
        var items = [
            {
                header: {
                    text: this.parent.localeObj.getConstant('member'),
                    iconCss: (this.filterObject && types.indexOf(this.filterObject.type) > 1 ? cls.SELECTED_OPTION_ICON_CLASS : '')
                },
                content: this.createTreeView(treeData, fieldCaption, fieldName)
            }
        ];
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            if (((type === 'Label') && this.parent.dataSourceSettings.allowLabelFilter) ||
                (type === 'Value' && this.parent.dataSourceSettings.allowValueFilter)) {
                var filterType = (type === 'Label' && member && ((member).match(regx) &&
                    (member).match(regx)[0].length === (member).length) && fieldType === 'number') ? 'Number' :
                    (type === 'Label' && member && (new Date(member).toString() !== 'Invalid Date') &&
                        ((formatObj && formatObj.type) || (this.filterObject && this.filterObject.type === 'Date'))) ? 'Date' : type;
                var item = {
                    header: {
                        text: (filterType === 'Number' ? this.parent.localeObj.getConstant('label') :
                            this.parent.localeObj.getConstant(filterType.toLowerCase())),
                        iconCss: (this.filterObject && this.filterObject.type === filterType ? cls.SELECTED_OPTION_ICON_CLASS : '')
                    },
                    content: this.createCustomFilter(fieldName, (this.filterObject && this.filterObject.type === filterType ? this.filterObject :
                        undefined), filterType.toLowerCase())
                };
                items.push(item);
            }
        }
        var selectedIndex = (this.filterObject ? (['Label', 'Date', 'Number'].indexOf(this.filterObject.type) >= 0) ?
            1 : this.filterObject.type === 'Value' ?
            (this.parent.dataSourceSettings.allowLabelFilter && this.parent.dataSourceSettings.allowValueFilter) ? 2 : 1 : 0 : 0);
        selectedIndex = (!this.parent.dataSourceSettings.allowMemberFilter && selectedIndex === 0) ? 1 : selectedIndex;
        this.tabObj = new Tab({
            heightAdjustMode: 'Auto',
            items: items,
            height: '100%',
            selectedItem: selectedIndex,
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            cssClass: this.parent.cssClass
        });
        this.tabObj.isStringTemplate = true;
        this.tabObj.appendTo(wrapper);
        if (!this.parent.dataSourceSettings.allowMemberFilter) {
            this.tabObj.hideTab(0);
        }
        if (selectedIndex > 0) {
            addClass([this.dialogPopUp.element.querySelector('.e-filter-div-content' + '.' + (selectedIndex === 1 && this.parent.dataSourceSettings.allowLabelFilter ? 'e-label-filter' : 'e-value-filter'))], 'e-selected-tab');
        }
    };
    FilterDialog.prototype.createCustomFilter = function (fieldName, filterObject, type) {
        var dataSource = [];
        var valueOptions = [];
        var levelOptions = [];
        var measures = this.parent.dataSourceSettings.values;
        var selectedOption = 'DoesNotEquals';
        var selectedValueIndex = 0;
        var selectedLevelIndex = 0;
        var options = {
            label: ['Equals', 'DoesNotEquals', 'BeginWith', 'DoesNotBeginWith', 'EndsWith',
                'DoesNotEndsWith', 'Contains', 'DoesNotContains', 'GreaterThan',
                'GreaterThanOrEqualTo', 'LessThan', 'LessThanOrEqualTo', 'Between', 'NotBetween'],
            date: ['Equals', 'DoesNotEquals', 'Before', 'BeforeOrEqualTo', 'After', 'AfterOrEqualTo',
                'Between', 'NotBetween'],
            value: ['Equals', 'DoesNotEquals', 'GreaterThan', 'GreaterThanOrEqualTo', 'LessThan',
                'LessThanOrEqualTo', 'Between', 'NotBetween']
        };
        var betweenOperators = ['Between', 'NotBetween'];
        var operatorCollection = (type === 'label' ? options.label : type === 'date' ? options.date : options.value);
        for (var _i = 0, operatorCollection_1 = operatorCollection; _i < operatorCollection_1.length; _i++) {
            var operator = operatorCollection_1[_i];
            selectedOption = ((filterObject && operator === filterObject.condition) ?
                operatorCollection.indexOf(filterObject.condition) >= 0 ?
                    filterObject.condition : operatorCollection[0] : selectedOption);
            dataSource.push({ value: operator, text: this.parent.localeObj.getConstant(operator) });
        }
        var len = measures.length;
        while (len--) {
            valueOptions.unshift({ value: measures[len].name, text: (measures[len].caption ?
                    measures[len].caption : measures[len].name) });
            selectedValueIndex = filterObject && filterObject.type === 'Value' &&
                filterObject.measure === measures[len].name &&
                filterObject.condition === selectedOption ? len : selectedValueIndex;
        }
        if (this.parent.dataType === 'olap') {
            var engineModule = this.parent.engineModule;
            var levels = engineModule.fieldList[fieldName].levels;
            if (this.parent.engineModule.fieldList[fieldName].isHierarchy) {
                var levelObj = void 0;
                var fieldlistData = this.parent.engineModule.fieldListData;
                for (var _a = 0, fieldlistData_1 = fieldlistData; _a < fieldlistData_1.length; _a++) {
                    var item = fieldlistData_1[_a];
                    if (item && item.pid === fieldName) {
                        levelObj = item;
                        break;
                    }
                }
                levelOptions.push({
                    value: levelObj ? levelObj.id : fieldName,
                    text: levelObj ? levelObj.caption : engineModule.fieldList[fieldName].name
                });
                selectedLevelIndex = 0;
                if (filterObject && filterObject.name === fieldName && filterObject.type.toLowerCase() === type) {
                    levelOptions[levelOptions.length - 1]['iconClass'] = cls.ICON + ' ' + cls.SELECTED_LEVEL_ICON_CLASS;
                }
            }
            else {
                for (var i = 0, cnt = levels.length; i < cnt; i++) {
                    selectedLevelIndex = (filterObject &&
                        filterObject.selectedField === levels[i].id ? i : selectedLevelIndex);
                    levelOptions.push({ value: levels[i].id, text: levels[i].name });
                    for (var _b = 0, _c = this.parent.dataSourceSettings.filterSettings; _b < _c.length; _b++) {
                        var field = _c[_b];
                        if (field.name === fieldName && field.selectedField === levels[i].id &&
                            field.type.toLowerCase() === type) {
                            levelOptions[levelOptions.length - 1]['iconClass'] = cls.ICON + ' ' + cls.SELECTED_LEVEL_ICON_CLASS;
                            break;
                        }
                    }
                }
            }
        }
        var mainDiv = createElement('div', {
            className: cls.FILTER_DIV_CONTENT_CLASS + ' e-' + ((['date', 'number']).indexOf(type) >= 0 ? 'label' : type) + '-filter' + (this.parent.isDataOverflow ? ' ' + cls.PIVOT_FILTER_MEMBER_LIMIT : ''),
            id: this.parent.parentID + '_' + type + '_filter_div_content',
            attrs: {
                'data-type': type, 'data-fieldName': fieldName, 'data-operator': selectedOption,
                'data-selectedField': (this.parent.dataType === 'olap' &&
                    levelOptions.length > 0 ? levelOptions[selectedLevelIndex].value.toString() : ''),
                'data-measure': (this.parent.dataSourceSettings.values.length > 0 ?
                    this.parent.dataSourceSettings.values[selectedValueIndex].name : ''),
                'data-value1': (filterObject && selectedOption === filterObject.condition ?
                    filterObject.value1 ? filterObject.value1.toString() : '' : ''),
                'data-value2': (filterObject && selectedOption === filterObject.condition ?
                    filterObject.value2 ? filterObject.value2.toString() : '' : '')
            }
        });
        var textContentdiv = createElement('div', {
            className: cls.FILTER_TEXT_DIV_CLASS
        });
        textContentdiv.innerText = this.parent.localeObj.getConstant(type + 'TextContent');
        var betweenTextContentdiv = createElement('div', {
            className: cls.BETWEEN_TEXT_DIV_CLASS + ' ' +
                (betweenOperators.indexOf(selectedOption) === -1 ? cls.ICON_DISABLE : '')
        });
        betweenTextContentdiv.innerText = this.parent.localeObj.getConstant('And');
        var separatordiv = createElement('div', { className: cls.SEPARATOR_DIV_CLASS });
        var filterWrapperDiv1 = createElement('div', { className: cls.FILTER_OPTION_WRAPPER_1_CLASS });
        var levelWrapperDiv = createElement('div', {
            className: 'e-level-option-container' + ' ' +
                (this.parent.dataType === 'olap' ? '' : cls.ICON_DISABLE)
        });
        var optionWrapperDiv1 = createElement('div', {
            className: 'e-measure-option-container' + ' ' + (((['label', 'date', 'number']).indexOf(type) >= 0) ? cls.ICON_DISABLE : '')
        });
        var optionWrapperDiv2 = createElement('div', { className: 'e-condition-option-container' });
        var filterWrapperDiv2 = createElement('div', { className: cls.FILTER_OPTION_WRAPPER_2_CLASS });
        var levelDropOption = createElement('div', { id: this.parent.parentID + '_' + type + '_level_option_container' });
        var dropOptionDiv1 = createElement('div', { id: this.parent.parentID + '_' + type + '_measure_option_container' });
        var dropOptionDiv2 = createElement('div', { id: this.parent.parentID + '_' + type + '_contition_option_container' });
        var inputDiv1 = createElement('div', { className: cls.FILTER_INPUT_DIV_1_CLASS });
        var inputDiv2 = createElement('div', {
            className: cls.FILTER_INPUT_DIV_2_CLASS + ' ' +
                (betweenOperators.indexOf(selectedOption) === -1 ? cls.ICON_DISABLE : '')
        });
        var inputField1 = createElement('input', {
            id: this.parent.parentID + '_' + type + '_input_option_1', attrs: { 'type': 'text' }
        });
        var inputField2 = createElement('input', {
            id: this.parent.parentID + '_' + type + '_input_option_2', attrs: { 'type': 'text' }
        });
        inputDiv1.appendChild(inputField1);
        inputDiv2.appendChild(inputField2);
        levelWrapperDiv.appendChild(levelDropOption);
        levelWrapperDiv.appendChild(separatordiv.cloneNode(true));
        optionWrapperDiv1.appendChild(dropOptionDiv1);
        optionWrapperDiv1.appendChild(separatordiv);
        optionWrapperDiv2.appendChild(dropOptionDiv2);
        filterWrapperDiv1.appendChild(levelWrapperDiv);
        filterWrapperDiv1.appendChild(optionWrapperDiv1);
        filterWrapperDiv1.appendChild(optionWrapperDiv2);
        filterWrapperDiv2.appendChild(inputDiv1);
        filterWrapperDiv2.appendChild(betweenTextContentdiv);
        filterWrapperDiv2.appendChild(inputDiv2);
        this.createElements(filterObject, betweenOperators, dropOptionDiv1, dropOptionDiv2, inputField1, inputField2, valueOptions, dataSource, selectedValueIndex, selectedOption, type, levelDropOption, levelOptions, selectedLevelIndex);
        mainDiv.appendChild(textContentdiv);
        mainDiv.appendChild(filterWrapperDiv1);
        mainDiv.appendChild(filterWrapperDiv2);
        return mainDiv;
    };
    FilterDialog.prototype.createElements = function (filterObj, operators, optionDiv1, optionDiv2, inputDiv1, inputDiv2, vDataSource, oDataSource, valueIndex, option, type, levelDropOption, lDataSource, levelIndex) {
        var popupInstance = this;
        if (this.parent.dataType === 'olap') {
            var levelWrapper = new DropDownList({
                dataSource: lDataSource, enableRtl: this.parent.enableRtl,
                fields: { value: 'value', text: 'text', iconCss: 'iconClass' },
                index: levelIndex,
                cssClass: cls.LEVEL_OPTIONS_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), width: '100%',
                change: function (args) {
                    var element = popupInstance.dialogPopUp.element.querySelector('.e-selected-tab');
                    var fieldName = element.getAttribute('data-fieldName');
                    var type = element.getAttribute('data-type');
                    if (!isNullOrUndefined(element)) {
                        popupInstance.updateInputValues(element, type, inputDiv1, inputDiv2);
                        setStyleAndAttributes(element, { 'data-selectedField': args.value });
                        var filterObj_1;
                        for (var _i = 0, _a = popupInstance.parent.dataSourceSettings.filterSettings; _i < _a.length; _i++) {
                            var field = _a[_i];
                            if (field.name === fieldName && field.selectedField === args.value) {
                                filterObj_1 = field;
                                break;
                            }
                        }
                        if (filterObj_1) {
                            if (type === 'value' && filterObj_1.measure && filterObj_1.measure !== '') {
                                optionWrapper1.value = filterObj_1.measure ? filterObj_1.measure : vDataSource[0].value;
                            }
                            if (filterObj_1.condition) {
                                optionWrapper.value = filterObj_1.condition ? filterObj_1.condition : 'DoesNotEquals';
                            }
                            else {
                                optionWrapper.value = 'DoesNotEquals';
                            }
                            var inputObj1 = void 0;
                            var inputObj2 = void 0;
                            if (type === 'value') {
                                inputObj1 = getInstance(inputDiv1, NumericTextBox);
                                inputObj2 = getInstance(inputDiv2, NumericTextBox);
                                if (inputObj1) {
                                    inputObj1.value = filterObj_1.value1 ? parseInt(filterObj_1.value1, 10) : undefined;
                                }
                                if (inputObj2) {
                                    inputObj2.value = filterObj_1.value2 ? parseInt(filterObj_1.value2, 10) : undefined;
                                }
                            }
                            else {
                                inputObj1 = getInstance(inputDiv1, MaskedTextBox);
                                inputObj2 = getInstance(inputDiv2, MaskedTextBox);
                                if (inputObj1) {
                                    inputObj1.value = filterObj_1.value1 ? filterObj_1.value1 : '';
                                }
                                if (inputObj2) {
                                    inputObj2.value = filterObj_1.value2 ? filterObj_1.value2 : '';
                                }
                            }
                        }
                        popupInstance.updateInputValues(element, type, inputDiv1, inputDiv2);
                    }
                    else {
                        return;
                    }
                }
            });
            levelWrapper.isStringTemplate = true;
            levelWrapper.appendTo(levelDropOption);
        }
        var optionWrapper1 = new DropDownList({
            dataSource: vDataSource, enableRtl: this.parent.enableRtl,
            fields: { value: 'value', text: 'text' }, index: valueIndex,
            cssClass: cls.VALUE_OPTIONS_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), width: '100%',
            change: function (args) {
                var element = popupInstance.dialogPopUp.element.querySelector('.e-selected-tab');
                if (!isNullOrUndefined(element)) {
                    popupInstance.updateInputValues(element, type, inputDiv1, inputDiv2);
                    setStyleAndAttributes(element, { 'data-measure': args.value });
                }
                else {
                    return;
                }
            }
        });
        optionWrapper1.isStringTemplate = true;
        optionWrapper1.appendTo(optionDiv1);
        var optionWrapper = new DropDownList({
            dataSource: oDataSource, enableRtl: this.parent.enableRtl,
            fields: { value: 'value', text: 'text' }, value: option,
            cssClass: cls.FILTER_OPERATOR_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''), width: '100%',
            change: function (args) {
                var element = popupInstance.dialogPopUp.element.querySelector('.e-selected-tab');
                if (!isNullOrUndefined(element)) {
                    popupInstance.updateInputValues(element, type, inputDiv1, inputDiv2);
                    var disabledClasses = [cls.BETWEEN_TEXT_DIV_CLASS, cls.FILTER_INPUT_DIV_2_CLASS];
                    for (var _i = 0, disabledClasses_1 = disabledClasses; _i < disabledClasses_1.length; _i++) {
                        var className = disabledClasses_1[_i];
                        if (operators.indexOf(args.value) >= 0) {
                            removeClass([element.querySelector('.' + className)], cls.ICON_DISABLE);
                        }
                        else {
                            addClass([element.querySelector('.' + className)], cls.ICON_DISABLE);
                        }
                    }
                    setStyleAndAttributes(element, { 'data-operator': args.value });
                }
                else {
                    return;
                }
            }
        });
        optionWrapper.isStringTemplate = true;
        optionWrapper.appendTo(optionDiv2);
        if (type === 'date') {
            var inputObj1_1 = new DateTimePicker({
                placeholder: this.parent.localeObj.getConstant('chooseDate'),
                enableRtl: this.parent.enableRtl,
                format: 'dd/MM/yyyy hh:mm:ss a',
                showClearButton: true,
                value: (filterObj && option === filterObj.condition ?
                    (typeof (filterObj.value1) === 'string' ? new Date(filterObj.value1) : filterObj.value1) : null),
                change: function (e) {
                    var element = popupInstance.dialogPopUp.element.querySelector('.e-selected-tab');
                    if (!isNullOrUndefined(element)) {
                        setStyleAndAttributes(element, { 'data-value1': e.value, 'data-value2': inputObj2_1.value });
                    }
                    else {
                        return;
                    }
                },
                width: '100%',
                cssClass: this.parent.cssClass
            });
            var inputObj2_1 = new DateTimePicker({
                placeholder: this.parent.localeObj.getConstant('chooseDate'),
                enableRtl: this.parent.enableRtl,
                format: 'dd/MM/yyyy hh:mm:ss a',
                showClearButton: true,
                value: (filterObj && option === filterObj.condition ?
                    (typeof (filterObj.value2) === 'string' ? new Date(filterObj.value2) : filterObj.value2) : null),
                change: function (e) {
                    var element = popupInstance.dialogPopUp.element.querySelector('.e-selected-tab');
                    if (!isNullOrUndefined(element)) {
                        setStyleAndAttributes(element, { 'data-value1': inputObj1_1.value, 'data-value2': e.value });
                    }
                    else {
                        return;
                    }
                },
                width: '100%',
                cssClass: this.parent.cssClass
            });
            inputObj1_1.isStringTemplate = true;
            inputObj1_1.appendTo(inputDiv1);
            inputObj2_1.isStringTemplate = true;
            inputObj2_1.appendTo(inputDiv2);
        }
        else if (type === 'value') {
            var inputObj1_2 = new NumericTextBox({
                placeholder: this.parent.localeObj.getConstant('enterValue'),
                enableRtl: this.parent.enableRtl,
                showClearButton: true,
                format: '###.##',
                value: (filterObj && option === filterObj.condition ? parseInt(filterObj.value1, 10) : undefined),
                change: function (e) {
                    var element = popupInstance.dialogPopUp.element.querySelector('.e-selected-tab');
                    if (!isNullOrUndefined(element)) {
                        setStyleAndAttributes(element, {
                            'data-value1': (e.value ? e.value.toString() : '0'),
                            'data-value2': (inputObj2_2.value ? inputObj2_2.value.toString() : '0')
                        });
                    }
                    else {
                        return;
                    }
                },
                width: '100%',
                cssClass: this.parent.cssClass
            });
            var inputObj2_2 = new NumericTextBox({
                placeholder: this.parent.localeObj.getConstant('enterValue'),
                enableRtl: this.parent.enableRtl,
                showClearButton: true,
                format: '###.##',
                value: (filterObj && option === filterObj.condition ? parseInt(filterObj.value2, 10) : undefined),
                change: function (e) {
                    var element = popupInstance.dialogPopUp.element.querySelector('.e-selected-tab');
                    if (!isNullOrUndefined(element)) {
                        setStyleAndAttributes(element, {
                            'data-value1': (inputObj1_2.value ? inputObj1_2.value.toString() : '0'),
                            'data-value2': (e.value ? e.value.toString() : '0')
                        });
                    }
                    else {
                        return;
                    }
                },
                width: '100%',
                cssClass: this.parent.cssClass
            });
            inputObj1_2.isStringTemplate = true;
            inputObj1_2.appendTo(inputDiv1);
            inputObj2_2.isStringTemplate = true;
            inputObj2_2.appendTo(inputDiv2);
        }
        else {
            var inputObj1_3 = new MaskedTextBox({
                placeholder: this.parent.localeObj.getConstant('enterValue'),
                enableRtl: this.parent.enableRtl,
                showClearButton: true,
                value: (filterObj && option === filterObj.condition ? filterObj.value1 : ''),
                change: function (e) {
                    var element = popupInstance.dialogPopUp.element.querySelector('.e-selected-tab');
                    if (!isNullOrUndefined(element)) {
                        setStyleAndAttributes(element, { 'data-value1': e.value, 'data-value2': inputObj2_3.value });
                    }
                    else {
                        return;
                    }
                },
                width: '100%',
                cssClass: this.parent.cssClass
            });
            var inputObj2_3 = new MaskedTextBox({
                placeholder: this.parent.localeObj.getConstant('enterValue'),
                enableRtl: this.parent.enableRtl,
                showClearButton: true,
                value: (filterObj && option === filterObj.condition ? filterObj.value2 : ''),
                change: function (e) {
                    var element = popupInstance.dialogPopUp.element.querySelector('.e-selected-tab');
                    if (!isNullOrUndefined(element)) {
                        setStyleAndAttributes(element, { 'data-value1': inputObj1_3.value, 'data-value2': e.value });
                    }
                    else {
                        return;
                    }
                },
                width: '100%',
                cssClass: this.parent.cssClass
            });
            inputObj1_3.isStringTemplate = true;
            inputObj1_3.appendTo(inputDiv1);
            inputObj2_3.isStringTemplate = true;
            inputObj2_3.appendTo(inputDiv2);
        }
    };
    FilterDialog.prototype.updateInputValues = function (element, type, inputDiv1, inputDiv2) {
        var inputObj1 = getInstance(inputDiv1, type === 'date' ? DateTimePicker : type === 'value' ? NumericTextBox : MaskedTextBox);
        var inputObj2 = getInstance(inputDiv2, type === 'date' ? DateTimePicker : type === 'value' ? NumericTextBox : MaskedTextBox);
        var value1 = !isNullOrUndefined(inputObj1.value) ? inputObj1.value.toString() : '';
        var value2 = !isNullOrUndefined(inputObj2.value) ? inputObj2.value.toString() : '';
        setStyleAndAttributes(element, { 'data-value1': value1, 'data-value2': value2 });
    };
    FilterDialog.prototype.validateTreeNode = function (e) {
        if (e.node.classList.contains(cls.ICON_DISABLE)) {
            e.cancel = true;
        }
        else {
            return;
        }
    };
    /**
     * Update filter state while Member check/uncheck.
     *
     * @returns {void}
     * @hidden
     */
    FilterDialog.prototype.updateCheckedState = function () {
        var filterDialog = this.dialogPopUp.element;
        var list = [].slice.call(this.memberTreeView.element.querySelectorAll('li'));
        var fieldName = filterDialog.getAttribute('data-fieldname');
        var uncheckedNodes = this.getUnCheckedNodes(fieldName);
        var checkedNodes = this.getCheckedNodes(fieldName);
        var firstNode = this.allMemberSelect.element.querySelector('li').querySelector('span.' + cls.CHECK_BOX_FRAME_CLASS);
        if (list.length > 0) {
            if (checkedNodes > 0) {
                if (uncheckedNodes > 0) {
                    removeClass([firstNode], cls.NODE_CHECK_CLASS);
                    addClass([firstNode], cls.NODE_STOP_CLASS);
                    var checkBoxNodes = this.allMemberSelect.element.querySelector('li');
                    checkBoxNodes.setAttribute('aria-checked', 'false');
                }
                else if (uncheckedNodes === 0) {
                    removeClass([firstNode], cls.NODE_STOP_CLASS);
                    addClass([firstNode], cls.NODE_CHECK_CLASS);
                }
                this.dialogPopUp.buttons[0].buttonModel.disabled = false;
                filterDialog.querySelector('.' + cls.OK_BUTTON_CLASS).removeAttribute('disabled');
            }
            else if (uncheckedNodes > 0 && checkedNodes === 0) {
                removeClass([firstNode], [cls.NODE_CHECK_CLASS, cls.NODE_STOP_CLASS]);
                if (this.getCheckedNodes(fieldName) === checkedNodes) {
                    this.dialogPopUp.buttons[0].buttonModel.disabled = true;
                    filterDialog.querySelector('.' + cls.OK_BUTTON_CLASS).setAttribute('disabled', 'disabled');
                }
            }
        }
        else {
            this.dialogPopUp.buttons[0].buttonModel.disabled = true;
            filterDialog.querySelector('.' + cls.OK_BUTTON_CLASS).setAttribute('disabled', 'disabled');
        }
    };
    FilterDialog.prototype.getCheckedNodes = function (fieldName) {
        var engineModule = this.parent.engineModule;
        var nodeList = [];
        var checkeNodes = [];
        if (this.parent.dataType === 'olap' && engineModule &&
            !engineModule.fieldList[fieldName].isHierarchy) {
            nodeList = this.memberTreeView.getAllCheckedNodes();
            return nodeList.length;
        }
        else {
            for (var _i = 0, _a = this.parent.searchTreeItems; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.isSelected) {
                    checkeNodes.push(item);
                }
            }
            return checkeNodes.length;
        }
    };
    FilterDialog.prototype.getUnCheckedNodes = function (fieldName) {
        var unCheckeNodes = [];
        var nodeList = [];
        var engineModule = this.parent.engineModule;
        if (this.parent.dataType === 'olap' && engineModule && !engineModule.fieldList[fieldName].isHierarchy) {
            nodeList = this.memberTreeView.getAllCheckedNodes();
            return (this.memberTreeView.fields.dataSource.length - nodeList.length);
        }
        else {
            // unCheckeNodes = this.parent.searchTreeItems.filter((item: { [key: string]: object }) => {
            //     return !item.isSelected;
            // });
            for (var _i = 0, _a = this.parent.searchTreeItems; _i < _a.length; _i++) {
                var item = _a[_i];
                if (!item.isSelected) {
                    unCheckeNodes.push(item);
                }
            }
            return unCheckeNodes.length;
        }
    };
    FilterDialog.prototype.isExcelFilter = function (fieldName) {
        var isFilterField = false;
        for (var _i = 0, _a = this.parent.dataSourceSettings.filters; _i < _a.length; _i++) {
            var field = _a[_i];
            if (field.name === fieldName) {
                isFilterField = true;
                break;
            }
        }
        if (!isFilterField && (this.parent.dataSourceSettings.allowLabelFilter || this.parent.dataSourceSettings.allowValueFilter)) {
            return true;
        }
        else {
            return false;
        }
    };
    FilterDialog.prototype.getFilterObject = function (fieldName) {
        var filterObj = PivotUtil.getFilterItemByName(fieldName, PivotUtil.cloneFilterSettings(this.parent.dataSourceSettings.filterSettings));
        if (filterObj && (((['Label', 'Date', 'Number'].indexOf(filterObj.type) >= 0) &&
            this.parent.dataSourceSettings.allowLabelFilter) ||
            (filterObj.type === 'Value' && this.parent.dataSourceSettings.allowValueFilter) ||
            (['Include', 'Exclude'].indexOf(filterObj.type) >= 0 &&
                this.parent.eventBase.isValidFilterItemsAvail(fieldName, filterObj)))) {
            return filterObj;
        }
        return undefined;
    };
    FilterDialog.prototype.wireEvent = function (element, fieldName) {
        EventHandler.add(element, 'click', this.applySorting.bind(this, fieldName), this);
    };
    FilterDialog.prototype.unWireEvent = function (element) {
        EventHandler.remove(element, 'click', this.applySorting);
    };
    /**
     * To close filter dialog.
     *
     * @returns {void}
     * @hidden
     */
    FilterDialog.prototype.closeFilterDialog = function () {
        this.dialogPopUp.close();
    };
    FilterDialog.prototype.removeFilterDialog = function () {
        if (this.editorSearch && !this.editorSearch.isDestroyed) {
            this.editorSearch.destroy();
            this.editorSearch = null;
        }
        if (this.allowExcelLikeFilter) {
            if (this.tabObj && !this.tabObj.isDestroyed) {
                this.tabObj.destroy();
                this.tabObj = null;
            }
        }
        if (this.dropMenu && !this.dropMenu.isDestroyed) {
            this.dropMenu.destroy();
            this.dropMenu = null;
        }
        if (this.memberTreeView && !this.memberTreeView.isDestroyed) {
            this.memberTreeView.destroy();
            this.memberTreeView = null;
        }
        if (this.allMemberSelect && !this.allMemberSelect.isDestroyed) {
            this.allMemberSelect.destroy();
            this.allMemberSelect = null;
        }
        if (document.getElementById(this.parent.parentID + '_LevelDiv-popup')) {
            remove(document.getElementById(this.parent.parentID + '_LevelDiv-popup'));
        }
        if (this.dialogPopUp && !this.dialogPopUp.isDestroyed) {
            this.dialogPopUp.destroy();
            this.dialogPopUp = null;
            setTimeout(this.setFocus.bind(this));
        }
        if (document.getElementById(this.parent.parentID + '_EditorTreeView')) {
            remove(document.getElementById(this.parent.parentID + '_EditorTreeView'));
        }
    };
    /** @hidden */
    FilterDialog.prototype.setFocus = function () {
        if (this.parent.control.pivotButtonModule.parentElement) {
            var pivotButtons = [].slice.call(this.parent.control.pivotButtonModule.parentElement.querySelectorAll('.e-pivot-button'));
            for (var _i = 0, pivotButtons_1 = pivotButtons; _i < pivotButtons_1.length; _i++) {
                var item = pivotButtons_1[_i];
                if (item.getAttribute('data-uid') === this.parent.control.pivotButtonModule.fieldName) {
                    item.focus();
                    break;
                }
            }
        }
    };
    return FilterDialog;
}());
export { FilterDialog };
