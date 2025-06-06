import { isNullOrUndefined, removeClass, addClass, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constant';
import { PivotUtil } from '../../base/util';
import * as events from '../base/constant';
/**
 * `EventBase` for active fields action.
 */
/** @hidden */
var EventBase = /** @class */ (function () {
    /**
     * Constructor for the dialog action.
     *
     * @param {PivotCommon} parent - It represent the parent.
     * @hidden
     */
    function EventBase(parent) {
        /** @hidden */
        this.searchListItem = [];
        this.parent = parent;
    }
    /**
     * Updates sorting order for the selected field.
     *
     * @function updateSorting
     * @param  {Event} args - Contains clicked element information to update dataSource.
     * @returns {void}
     * @hidden
     */
    EventBase.prototype.updateSorting = function (args) {
        if (!(args.target.classList.contains(cls.FILTER_COMMON_CLASS)) &&
            !(args.target.classList.contains(cls.REMOVE_CLASS))) {
            if (this.parent.filterDialog.dialogPopUp) {
                this.parent.filterDialog.dialogPopUp.close();
            }
            var target = args.target;
            var fieldName = void 0;
            var checkisDescending = void 0;
            var isDescending = void 0;
            if (target.id) {
                fieldName = target.getAttribute('data-uid');
                checkisDescending = [].slice.call(target.querySelectorAll('.' + cls.SORT_DESCEND_CLASS));
            }
            else {
                fieldName = target.parentElement.getAttribute('data-uid');
                checkisDescending = [].slice.call(target.parentElement.querySelectorAll('.' + cls.SORT_DESCEND_CLASS));
            }
            if (checkisDescending.length === 0) {
                isDescending = false;
            }
            else {
                isDescending = true;
            }
            //isDescending = (target.querySelectorAll(cls.SORT_DESCEND_CLASS));
            var sortObj = PivotUtil.getFieldByName(fieldName, this.parent.dataSourceSettings.sortSettings);
            var addMembersOrder = this.parent.engineModule && this.parent.engineModule.fieldList[fieldName] &&
                this.parent.engineModule.fieldList[fieldName].membersOrder ?
                this.parent.engineModule.fieldList[fieldName].membersOrder.slice() : [];
            if (!isNullOrUndefined(sortObj)) {
                for (var i = 0; i < this.parent.dataSourceSettings.sortSettings.length; i++) {
                    if (this.parent.dataSourceSettings.sortSettings[i].name === fieldName) {
                        this.parent.dataSourceSettings.sortSettings.splice(i, 1);
                        break;
                    }
                }
                var newSortObj = { name: fieldName, order: isDescending ? 'Ascending' : 'Descending', membersOrder: sortObj ? sortObj.membersOrder : addMembersOrder };
                // let newSortObj: ISort = { name: fieldName, order: isNone ? 'Ascending' : isDescending ? 'None' : 'Descending' };
                this.parent.dataSourceSettings.sortSettings.push(newSortObj);
            }
            else {
                var newSortObj = { name: fieldName, order: isDescending ? 'Ascending' : 'Descending', membersOrder: sortObj ? sortObj.membersOrder : addMembersOrder };
                //let newSortObj: ISort = { name: fieldName, order: isNone ? 'Ascending' : isDescending ? 'None' : 'Descending'  };
                this.parent.dataSourceSettings.sortSettings.push(newSortObj);
            }
            this.parent.control.lastSortInfo =
                this.parent.dataSourceSettings.sortSettings[this.parent.dataSourceSettings.sortSettings.length - 1];
            if (isDescending) {
                removeClass([target], cls.SORT_DESCEND_CLASS);
            }
            else {
                addClass([target], cls.SORT_DESCEND_CLASS);
            }
            // if (isDescending) {
            //     removeClass([target], cls.SORT_DESCEND_CLASS);
            //     addClass([target], cls.SORTING);
            // } else if (!isDescending && !isNone) {
            //     addClass([target], cls.SORT_DESCEND_CLASS);
            // } else if (isNone) {
            //     removeClass([target], cls.SORTING);
            // } else if (!isNone) {
            //     removeClass([target], cls.SORT_DESCEND_CLASS);
            //     removeClass([target], cls.SORTING);
            //    //addClass([target], cls.SORT_CLASS);
            // }
        }
    };
    /**
     * Updates sorting order for the selected field.
     *
     * @function updateFiltering
     * @param {Event} args - Contains clicked element information to update dataSource.
     * @returns {void}
     * @hidden
     */
    EventBase.prototype.updateFiltering = function (args) {
        var target = args.target;
        var fieldName = target.parentElement.getAttribute('data-uid');
        var fieldCaption = target.parentElement.textContent;
        var isInclude = false;
        var filterItems = [];
        var treeData = [];
        if (this.parent.dataSourceSettings.allowMemberFilter) {
            if (this.parent.dataType === 'olap') {
                treeData = this.getOlapData(fieldName, isInclude);
            }
            else {
                var fieldInfo = this.parent.engineModule.fieldList[fieldName];
                var members = PivotUtil.getClonedData(fieldInfo.dateMember);
                this.parent.isDateField = PivotUtil.isDateField(fieldName, this.parent.engineModule);
                var membersInfo = fieldInfo && fieldInfo.membersOrder ?
                    fieldInfo.membersOrder.slice() : [];
                var outOfRange = void 0;
                if (members[0].actualText === 'Out of Range') {
                    outOfRange = members[0];
                    members.splice(0, 1);
                }
                else if (members[members.length - 1].actualText === 'Out of Range') {
                    outOfRange = members[members.length - 1];
                    members.splice(members.length - 1, 1);
                }
                var sortDetails = {
                    fieldName: fieldName,
                    sortOrder: fieldInfo.sort,
                    members: membersInfo && membersInfo.length > 0 ? membersInfo : Object.keys(members),
                    IsOrderChanged: false
                };
                var isHeaderSortByDefault = false;
                var sortType = fieldInfo && fieldInfo.isAlphanumeric ? true : undefined;
                if (membersInfo && membersInfo.length > 0) {
                    members = PivotUtil.applyCustomSort(sortDetails, members, sortType);
                }
                else {
                    var groupField = this.parent.dataSourceSettings.groupSettings.filter(function (field) {
                        return field.name === fieldName && field.type.toLocaleLowerCase() === 'number';
                    });
                    var isNumberGroupSorting = !isNullOrUndefined(groupField) && groupField.length > 0 ? true : false;
                    members = PivotUtil.applyHeadersSort(members, sortDetails.sortOrder, sortType, isNumberGroupSorting);
                    isHeaderSortByDefault = true;
                }
                var filterObj = PivotUtil.getFilterItemByName(fieldName, this.parent.dataSourceSettings.filterSettings);
                if (!isNullOrUndefined(filterObj)) {
                    isInclude = this.isValidFilterItemsAvail(fieldName, filterObj) && filterObj.type === 'Include' ? true : false;
                    filterItems = filterObj.items ? filterObj.items : [];
                }
                if (outOfRange) {
                    if (sortDetails.sortOrder === 'Ascending') {
                        if (members[members.length - 1].actualText === 'Grand Total') {
                            members.splice(members.length - 1, 0, outOfRange);
                        }
                        else {
                            members.splice(members.length, 0, outOfRange);
                        }
                    }
                    else {
                        if (members[0].actualText === 'Grand Total') {
                            members.splice(1, 0, outOfRange);
                        }
                        else {
                            members.splice(0, 0, outOfRange);
                        }
                    }
                }
                if (isHeaderSortByDefault) {
                    var copyOrder = [];
                    for (var m = 0, n = 0; m < members.length; m++) {
                        if (members[m].actualText !== 'Grand Total') {
                            copyOrder[n++] = members[m].actualText;
                        }
                    }
                    sortDetails.members = copyOrder;
                }
                this.parent.control.trigger(events.onHeadersSort, sortDetails);
                if (sortDetails.IsOrderChanged) {
                    members = PivotUtil.applyCustomSort(sortDetails, members, sortType, true);
                }
                treeData =
                    this.getTreeData(isInclude, members, filterItems, fieldName);
            }
        }
        if (this.parent.filterDialog.dialogPopUp) {
            this.parent.filterDialog.dialogPopUp.close();
        }
        var popupTarget = this.parent.control.filterTargetID;
        if (isNullOrUndefined(popupTarget)) {
            popupTarget = this.parent.moduleName !== 'pivotfieldlist' ?
                this.parent.element : document.getElementById(this.parent.parentID + '_Container');
        }
        this.parent.filterDialog.createFilterDialog(treeData, fieldName, fieldCaption, popupTarget);
    };
    /**
     * Returns boolean by checing the valid filter members from the selected filter settings.
     *
     * @function isValidFilterItemsAvail
     * @param {string} fieldName - Gets filter members for the given field name.
     * @param {IFilter} filterObj - filterObj.
     * @returns {boolean} - boolean.
     * @hidden
     */
    EventBase.prototype.isValidFilterItemsAvail = function (fieldName, filterObj) {
        var isItemAvail = false;
        var filterTypes = ['Include', 'Exclude'];
        if (filterObj && filterTypes.indexOf(filterObj.type) >= 0) {
            if (filterObj.type === 'Include' && filterObj.items.length === 0) {
                isItemAvail = true;
            }
            else {
                var engineModule = this.parent.engineModule;
                var field = engineModule.fieldList[fieldName];
                var members = void 0;
                if (this.parent.dataSourceSettings.mode === 'Server') {
                    members = field.members;
                }
                else {
                    members = this.parent.dataType === 'olap' ? field.members :
                        PivotUtil.getFormattedMembers(field.members, fieldName, engineModule);
                }
                for (var _i = 0, _a = filterObj.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (members[item]) {
                        isItemAvail = true;
                        break;
                    }
                }
            }
        }
        return isItemAvail;
    };
    EventBase.prototype.getOlapData = function (fieldName, isInclude) {
        var treeData = [];
        var filterItems = [];
        this.parent.filterDialog.isSearchEnabled = false;
        var updatedTreeData = [];
        var engineModule = this.parent.engineModule;
        var filterObj = PivotUtil.getFilterItemByName(fieldName, this.parent.dataSourceSettings.filterSettings);
        if (engineModule.fieldList[fieldName].filterMembers.length === 0) {
            if (!this.parent.control.loadOnDemandInMemberEditor) {
                engineModule.getMembers(this.parent.dataSourceSettings, fieldName, true);
            }
            else if (filterObj && filterObj.levelCount > 1 && engineModule.fieldList[fieldName].levels.length > 1) {
                engineModule.getFilterMembers(this.parent.dataSourceSettings, fieldName, filterObj.levelCount);
            }
            else {
                engineModule.fieldList[fieldName].levelCount = 1;
                engineModule.getMembers(this.parent.dataSourceSettings, fieldName);
            }
        }
        else {
            engineModule.fieldList[fieldName].currrentMembers = {};
            engineModule.fieldList[fieldName].searchMembers = [];
        }
        var isHierarchy = engineModule.fieldList[fieldName].isHierarchy;
        treeData = engineModule.fieldList[fieldName].filterMembers;
        if (!isNullOrUndefined(filterObj)) {
            isInclude = filterObj.type ? filterObj.type === 'Include' ? true : false : true;
            filterItems = filterObj.items ? filterObj.items : [];
        }
        var filterItemObj = {};
        var dummyfilterItems = {};
        var memberObject = engineModule.fieldList[fieldName].members;
        for (var _i = 0, filterItems_1 = filterItems; _i < filterItems_1.length; _i++) {
            var item = filterItems_1[_i];
            filterItemObj[item] = item;
            dummyfilterItems[item] = item;
            if (memberObject[item]) {
                dummyfilterItems = this.getParentNode(fieldName, item, dummyfilterItems);
            }
        }
        treeData = this.getFilteredTreeNodes(fieldName, treeData, dummyfilterItems, updatedTreeData);
        treeData = this.getOlapTreeData(isInclude, PivotUtil.getClonedData(treeData), filterItemObj, fieldName, isHierarchy);
        treeData = this.sortOlapFilterData(treeData, engineModule.fieldList[fieldName].sort);
        return treeData;
    };
    /**
     * Gets sorted filter members for the selected field.
     *
     * @function sortOlapFilterData
     * @param {any} treeData - Gets filter members for the given field name.
     * @param {string} order - It contains the value of order.
     * @returns {any} - It returns the sort Olap Filter Data.
     * @hidden
     */
    EventBase.prototype.sortOlapFilterData = function (treeData, order) {
        if (treeData.length > 0) {
            var isHeaderSortByDefault = false;
            var members = [];
            for (var i = 0; i < treeData.length; i++) {
                members.push(treeData[i].caption);
            }
            var fieldName = treeData[0].caption !== 'Grand Total' || treeData[0].caption === undefined ?
                treeData[0].htmlAttributes['data-fieldName'] :
                treeData[1].htmlAttributes['data-fieldName'];
            var engineModule = this.parent.engineModule;
            var fieldInfo = engineModule.fieldList[fieldName];
            var membersInfo = fieldInfo && fieldInfo.membersOrder ? fieldInfo.membersOrder.slice() : [];
            var sortDetails = {
                fieldName: fieldName,
                sortOrder: order,
                members: membersInfo && membersInfo.length > 0 ? membersInfo : members,
                IsOrderChanged: false
            };
            if (membersInfo && membersInfo.length > 0) {
                this.applyFilterCustomSort(treeData, sortDetails);
            }
            else {
                treeData = order === 'Ascending' ?
                    (treeData.sort(function (a, b) { return (a.caption > b.caption) ? 1 :
                        ((b.caption > a.caption) ? -1 : 0); })) : order === 'Descending' ?
                    (treeData.sort(function (a, b) { return (a.caption < b.caption) ? 1 :
                        ((b.caption < a.caption) ? -1 : 0); })) : treeData;
                isHeaderSortByDefault = true;
            }
            if (isHeaderSortByDefault) {
                var copyOrder = [];
                for (var m = 0, n = 0; m < treeData.length; m++) {
                    if (treeData[m].caption !== 'Grand Total') {
                        copyOrder[n++] = treeData[m].caption;
                    }
                }
                sortDetails.members = copyOrder;
            }
            this.parent.control.trigger(events.onHeadersSort, sortDetails);
            if (sortDetails.IsOrderChanged) {
                this.applyFilterCustomSort(treeData, sortDetails, true);
            }
        }
        return treeData;
    };
    EventBase.prototype.applyFilterCustomSort = function (headers, sortDetails, hasMembersOrder) {
        var order = [];
        var updatedMembers = [];
        var grandTotal;
        if (sortDetails.IsOrderChanged) {
            order = sortDetails.members;
        }
        else {
            order = (sortDetails.sortOrder === 'Ascending' || sortDetails.sortOrder === 'None' || sortDetails.sortOrder === undefined) ? [].concat(sortDetails.members) : [].concat(sortDetails.members).reverse();
        }
        if (headers[0].caption === 'Grand Total') {
            grandTotal = headers[0];
            headers.shift();
        }
        for (var i = 0, j = 0; i < headers.length; i++) {
            var sortText = headers[i].caption;
            if (order[j] === sortText) {
                headers.splice(j++, 0, headers[i]);
                headers.splice(++i, 1);
                if (j < order.length) {
                    i = -1;
                }
                else {
                    if (!hasMembersOrder) {
                        updatedMembers.splice(--j, 0, sortText);
                    }
                    break;
                }
            }
            if (i >= 0 && !hasMembersOrder) {
                updatedMembers[i] = headers[i].caption;
            }
        }
        if (!hasMembersOrder) {
            for (var i = updatedMembers.length; i < headers.length; i++) {
                updatedMembers[i] = headers[i].caption;
            }
            if (updatedMembers[updatedMembers.length - 1] === 'Grand Total') {
                updatedMembers.pop();
            }
            sortDetails.members = updatedMembers;
        }
        if (grandTotal) {
            headers.splice(0, 0, grandTotal);
        }
        return headers;
    };
    /**
     * It used to get the parentIds
     *
     * @param {TreeView} treeObj - Specifies the treeview instance.
     * @param {string} id - Specifies the current node id.
     * @param {string[]} parent - Specifies the collection of parent element.
     * @returns {string[]} - Returns parentIds.
     * @hidden
     */
    EventBase.prototype.getParentIDs = function (treeObj, id, parent) {
        var data = treeObj.fields.dataSource;
        var pid;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var li = data_1[_i];
            if (li.id === id) {
                pid = li.pid;
                break;
            }
        }
        if (pid) {
            parent.push(pid);
            this.getParentIDs(treeObj, pid, parent);
        }
        return parent;
    };
    /**
     * It used to get the childIds
     *
     * @param {TreeView} treeObj - Specifies the treeview instance.
     * @param {string} id - Specifies the current node id.
     * @param {string[]} children - Specifies the collection of clid elements.
     * @returns {string[]} - Return childIds.
     * @hidden
     */
    EventBase.prototype.getChildIDs = function (treeObj, id, children) {
        var data = treeObj.fields.dataSource;
        var cID;
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var li = data_2[_i];
            if (li.pid === id) {
                cID = li.id;
                break;
            }
        }
        if (cID) {
            children.push(cID);
            this.getParentIDs(treeObj, cID, children);
        }
        return children;
    };
    /**
     * show tree nodes using search text.
     *
     * @param {MaskChangeEventArgs} args -  It cotains the args data.
     * @param {TreeView} treeObj -  It cotains the treeObj data.
     * @param {boolean} isFieldCollection -  It cotains the isFieldCollection data.
     * @param {boolean} isHierarchy -  It cotains the isHierarchy data.
     * @returns {void}
     * @hidden
     */
    EventBase.prototype.searchTreeNodes = function (args, treeObj, isFieldCollection, isHierarchy) {
        if (isFieldCollection) {
            var searchList = [];
            var nonSearchList = [];
            var list = [].slice.call(treeObj.element.querySelectorAll('li'));
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var element = list_1[_i];
                if ((element.querySelector('.e-list-text').textContent.toLowerCase()).indexOf(args.value.toLowerCase()) > -1) {
                    searchList.push(element);
                }
                else {
                    nonSearchList.push(element);
                }
            }
            treeObj.enableNodes(searchList);
            removeClass(searchList, cls.ICON_DISABLE);
            treeObj.disableNodes(nonSearchList);
            addClass(nonSearchList, cls.ICON_DISABLE);
            if (searchList.length > 0 && nonSearchList.length > 0) {
                for (var _a = 0, searchList_1 = searchList; _a < searchList_1.length; _a++) {
                    var currentNode = searchList_1[_a];
                    var id = currentNode.getAttribute('data-uid');
                    var parentIDs = this.getParentIDs(treeObj, id, []);
                    var childIDs = this.getChildIDs(treeObj, id, []);
                    var pNodes = [];
                    if (parentIDs.length > 0) {
                        for (var _b = 0, nonSearchList_1 = nonSearchList; _b < nonSearchList_1.length; _b++) {
                            var li = nonSearchList_1[_b];
                            if (PivotUtil.inArray(li.getAttribute('data-uid'), parentIDs) !== -1) {
                                pNodes.push(li);
                            }
                        }
                    }
                    if (childIDs.length > 0) {
                        for (var _c = 0, nonSearchList_2 = nonSearchList; _c < nonSearchList_2.length; _c++) {
                            var li = nonSearchList_2[_c];
                            if (PivotUtil.inArray(li.getAttribute('data-uid'), childIDs) !== -1) {
                                pNodes.push(li);
                            }
                        }
                    }
                    treeObj.enableNodes(pNodes);
                    removeClass(pNodes, cls.ICON_DISABLE);
                }
            }
            if ([].slice.call(treeObj.element.querySelectorAll('li.' + cls.ICON_DISABLE)).length === 0) {
                treeObj.collapseAll();
            }
            else {
                treeObj.expandAll(undefined, undefined, true);
            }
            this.searchListItem = searchList;
        }
        else {
            this.parent.searchTreeItems = [];
            if (this.parent.dataType === 'olap' && !isHierarchy) {
                this.updateOlapSearchTree(args, treeObj, isHierarchy);
            }
            else {
                var searchList = [];
                var memberCount = 0;
                memberCount = 1;
                for (var _d = 0, _e = this.parent.currentTreeItems; _d < _e.length; _d++) {
                    var item = _e[_d];
                    if (item.name.toLowerCase().indexOf(args.value.toLowerCase()) > -1) {
                        this.parent.searchTreeItems.push(item);
                        if (memberCount <= this.parent.control.maxNodeLimitInMemberEditor) {
                            searchList.push(item);
                        }
                        memberCount++;
                    }
                }
                memberCount--;
                if (memberCount > this.parent.control.maxNodeLimitInMemberEditor) {
                    this.parent.editorLabelElement.innerText = (memberCount - this.parent.control.maxNodeLimitInMemberEditor) +
                        this.parent.control.localeObj.getConstant('editorDataLimitMsg');
                    this.parent.filterDialog.dialogPopUp.height = (this.parent.filterDialog.allowExcelLikeFilter ? '440px' : '400px');
                    this.parent.isDataOverflow = true;
                }
                else {
                    this.parent.editorLabelElement.innerText = '';
                    this.parent.filterDialog.dialogPopUp.height = (this.parent.filterDialog.allowExcelLikeFilter ? '400px' : '350px');
                    this.parent.isDataOverflow = false;
                }
                this.parent.isDataOverflow = (memberCount > this.parent.control.maxNodeLimitInMemberEditor);
                this.parent.editorLabelElement.parentElement.style.display = this.parent.isDataOverflow ? 'block' : 'none';
                treeObj.fields = { dataSource: searchList, id: 'id', text: 'name', isChecked: 'isSelected', parentID: 'pid' };
                treeObj.dataBind();
            }
        }
    };
    EventBase.prototype.updateOlapSearchTree = function (args, treeObj, isHierarchy) {
        var treeData = [];
        var filterDialog = this.parent.filterDialog.dialogPopUp.element;
        var fieldName = filterDialog.getAttribute('data-fieldname');
        if (args.value.toLowerCase() === '') {
            this.parent.filterDialog.isSearchEnabled = false;
            this.parent.engineModule.fieldList[fieldName].searchMembers = [];
            // (this.parent.engineModule.fieldList[fieldName as string] as IOlapField).currrentMembers = {};
            var updatedTreeData = [];
            var filterItemObj = {};
            var dummyfilterItems = {};
            var memberObject = this.parent.engineModule.fieldList[fieldName].members;
            var members = Object.keys(memberObject);
            var filterItems = [];
            for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
                var item = members_1[_i];
                if (memberObject[item].isSelected) {
                    if (!(memberObject[item].parent && memberObject[memberObject[item].parent].isSelected)) {
                        filterItems.push(item);
                    }
                }
            }
            for (var _a = 0, filterItems_2 = filterItems; _a < filterItems_2.length; _a++) {
                var item = filterItems_2[_a];
                filterItemObj[item] = item;
                dummyfilterItems[item] = item;
                if (memberObject[item]) {
                    dummyfilterItems = this.getParentNode(fieldName, item, dummyfilterItems);
                }
            }
            var searchData = this.parent.engineModule.fieldList[fieldName].filterMembers;
            treeData = this.getFilteredTreeNodes(fieldName, searchData, dummyfilterItems, updatedTreeData);
            treeData = this.getOlapTreeData(true, PivotUtil.getClonedData(treeData), filterItemObj, fieldName, isHierarchy, true);
        }
        else {
            this.parent.filterDialog.isSearchEnabled = true;
            var searchData = this.parent.engineModule.fieldList[fieldName].searchMembers;
            treeData = PivotUtil.getClonedData(searchData);
            treeData = this.getOlapSearchTreeData(true, treeData, fieldName);
        }
        treeObj.fields = { dataSource: treeData, id: 'id', text: 'name', isChecked: 'isSelected', parentID: 'pid' };
        treeObj.dataBind();
    };
    EventBase.prototype.getTreeData = function (isInclude, members, filterItems, fieldName) {
        this.parent.currentTreeItems = [];
        this.parent.searchTreeItems = [];
        this.parent.currentTreeItemsPos = {};
        this.parent.savedTreeFilterPos = {};
        var engineModule = this.parent.engineModule;
        var list = [];
        var memberCount = 1;
        var filterObj = {};
        for (var _i = 0, filterItems_3 = filterItems; _i < filterItems_3.length; _i++) {
            var item = filterItems_3[_i];
            filterObj[item] = item;
        }
        var modifiedFieldName = fieldName.replace(/[^a-zA-Z0-9 ]/g, '_');
        for (var _a = 0, members_2 = members; _a < members_2.length; _a++) {
            var member = members_2[_a];
            var memberName = member.actualText.toString();
            memberName = this.parent.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(memberName) : memberName;
            var actualText = this.parent.enableHtmlSanitizer ?
                SanitizeHtmlHelper.sanitize(member.actualText) : member.actualText;
            var nodeAttr = { 'data-fieldName': fieldName, 'data-memberId': actualText.toString() };
            var obj = {
                id: modifiedFieldName + '_' + memberCount,
                htmlAttributes: nodeAttr,
                actualText: actualText,
                name: this.parent.isDateField ? member.formattedText :
                    engineModule.getFormattedValue(actualText, fieldName).formattedText,
                isSelected: isInclude ? false : true
            };
            var memberText = this.parent.dataSourceSettings.mode === 'Server' ? member.actualText : member.formattedText;
            if (filterObj[this.parent.isDateField ? memberText : memberName] !== undefined) {
                obj.isSelected = isInclude ? true : false;
            }
            if (memberCount <= this.parent.control.maxNodeLimitInMemberEditor) {
                list.push(obj);
            }
            if (!obj.isSelected) {
                this.parent.savedTreeFilterPos[memberCount - 1] = this.parent.isDateField ? member.formattedText : memberName;
            }
            this.parent.currentTreeItems.push(obj);
            this.parent.searchTreeItems.push(obj);
            this.parent.currentTreeItemsPos[actualText] = { index: memberCount - 1, isSelected: obj.isSelected };
            memberCount++;
        }
        this.parent.isDataOverflow = ((memberCount - 1) > this.parent.control.maxNodeLimitInMemberEditor);
        return list;
    };
    EventBase.prototype.getOlapTreeData = function (isInclude, members, filterObj, fieldName, isHierarchy, isSearchRender) {
        var engineModule = this.parent.engineModule;
        var fieldList = engineModule.fieldList[fieldName];
        this.parent.currentTreeItems = [];
        this.parent.searchTreeItems = [];
        this.parent.currentTreeItemsPos = {};
        var list = [];
        var memberCount = 1;
        for (var _i = 0, members_3 = members; _i < members_3.length; _i++) {
            var member = members_3[_i];
            var obj = member;
            var memberName = member.id.toString();
            if (!isSearchRender) {
                obj.isSelected = isInclude ? false : true;
            }
            if (filterObj[memberName] !== undefined) {
                obj.isSelected = isInclude ? true : false;
            }
            if (!isSearchRender && member.hasChildren) {
                this.updateChildNodeStates(fieldList.filterMembers, fieldName, member.id, obj.isSelected);
            }
            fieldList.members[memberName].isSelected = obj.isSelected;
            if (fieldList.currrentMembers && fieldList.currrentMembers[memberName]) {
                fieldList.currrentMembers[memberName].isSelected = obj.isSelected;
            }
            if (memberCount <= this.parent.control.maxNodeLimitInMemberEditor && isHierarchy) {
                list.push(obj);
            }
            this.parent.currentTreeItems.push(obj);
            this.parent.searchTreeItems.push(obj);
            this.parent.currentTreeItemsPos[memberName] = { index: memberCount - 1, isSelected: obj.isSelected };
            memberCount++;
        }
        this.parent.isDataOverflow = isHierarchy ? ((memberCount - 1) > this.parent.control.maxNodeLimitInMemberEditor) : false;
        return isHierarchy ? list : members;
    };
    EventBase.prototype.getOlapSearchTreeData = function (isInclude, members, fieldName) {
        var cMembers = this.parent.engineModule.fieldList[fieldName].members;
        for (var _i = 0, members_4 = members; _i < members_4.length; _i++) {
            var member = members_4[_i];
            var memberName = member.id.toString();
            if (cMembers[memberName]) {
                member.isSelected = cMembers[memberName].isSelected;
            }
            this.parent.searchTreeItems.push(member);
        }
        return members;
    };
    /**
     * @param {IOlapField[]} members - members.
     * @param {string} fieldName - fieldName.
     * @param {string} node - node.
     * @param {boolean} state - state.
     * @returns {void}
     * @hidden
     */
    EventBase.prototype.updateChildNodeStates = function (members, fieldName, node, state) {
        var cMembers = this.parent.engineModule.fieldList[fieldName].members;
        var sMembers = this.parent.engineModule.fieldList[fieldName].currrentMembers;
        for (var _i = 0, members_5 = members; _i < members_5.length; _i++) {
            var member = members_5[_i];
            if (member.pid && member.pid.toString() === node) {
                cMembers[member.id].isSelected = state;
                if (sMembers && sMembers[member.id]) {
                    sMembers[member.id].isSelected = state;
                }
                if (member.hasChildren) {
                    this.updateChildNodeStates(members, fieldName, member.id, state);
                }
            }
        }
    };
    /**
     * @param {string} fieldName - fieldName.
     * @param {string} item - fieldName.
     * @param {Object} filterObj - filter Object.
     * @returns {Object} -  An object mapping keys to string.
     * @hidden
     */
    EventBase.prototype.getParentNode = function (fieldName, item, filterObj) {
        var members = this.parent.engineModule.fieldList[fieldName].members;
        if (members[item].parent && item !== members[item].parent) {
            var parentItem = members[item].parent;
            filterObj[parentItem] = parentItem;
            this.getParentNode(fieldName, parentItem, filterObj);
        }
        return filterObj;
    };
    EventBase.prototype.getFilteredTreeNodes = function (fieldName, members, filterObj, treeData) {
        var parentNodes = [];
        var memberObject = this.parent.engineModule.fieldList[fieldName].members;
        var selectedNodes = filterObj ? Object.keys(filterObj) : [];
        for (var _i = 0, selectedNodes_1 = selectedNodes; _i < selectedNodes_1.length; _i++) {
            var node = selectedNodes_1[_i];
            var parent_1 = memberObject[node] ? memberObject[node].parent : undefined;
            if (parent_1 !== undefined && PivotUtil.inArray(parent_1, parentNodes) === -1) {
                parentNodes.push(parent_1);
            }
        }
        for (var _a = 0, members_6 = members; _a < members_6.length; _a++) {
            var member = members_6[_a];
            if (isNullOrUndefined(member.pid) || PivotUtil.inArray(member.pid, parentNodes) !== -1) {
                treeData.push(member);
                if (isNullOrUndefined(member.pid) && PivotUtil.inArray(member.id, parentNodes) !== -1) {
                    memberObject[member.id].isNodeExpand = true;
                }
                else if (!isNullOrUndefined(member.pid) && PivotUtil.inArray(member.pid, parentNodes) !== -1) {
                    memberObject[member.id].isNodeExpand = false;
                    memberObject[member.pid].isNodeExpand = true;
                }
                else {
                    memberObject[member.id].isNodeExpand = false;
                }
            }
            else {
                memberObject[member.id].isNodeExpand = false;
            }
        }
        return treeData;
    };
    return EventBase;
}());
export { EventBase };
