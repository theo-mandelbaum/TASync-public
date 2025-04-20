"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./sorting.css");
/**
 * PivotView Member Sorting sample.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    drilledMembers: [{ name: 'Country', items: ['Germany'] }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    sortSettings: [{ name: 'Country', order: 'Ascending', membersOrder: ['France', 'United States'] }, { name: 'Year', order: 'Descending', membersOrder: ['FY 2018', 'FY 2017'] },
        { name: 'Products', order: 'Descending', membersOrder: ['Gloves', 'Bottles and Cages'] }],
    columns: [{ name: 'Year', dataType: 'string' }, { name: 'Order_Source', caption: 'Order Source' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }]
};
function CustomSorting() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pivotObj;
    var fieldCollections = {};
    var isInitial = true;
    var getMembers = { 'Country': [], 'Products': [], 'Year': [], 'Order_Source': [] };
    var memOrder = [];
    var index;
    var data = [];
    var fieldsObj;
    var isMemberAdded = true;
    var isMemberAdded_1 = true;
    var membersOrder;
    var orderInfo;
    var applyBtn;
    var checkBoxObj;
    var order = ['Ascending', 'Descending'];
    var fields = [
        { Field: 'Country', Order: 'Country_asc', caption: 'Country' },
        { Field: 'Products', Order: 'Products_desc', caption: 'Products' },
        { Field: 'Year', Order: 'Year_desc', caption: 'Year' },
        { Field: 'Order_Source', Order: 'Order_Source_asc', caption: 'Order Source' }
    ];
    function onChange(e) {
        if (fieldsObj.dataSource[fieldsObj.index].Order === fieldsObj.dataSource[fieldsObj.index].Field + '_asc') {
            orderInfo.index = 0;
        }
        else {
            orderInfo.index = 1;
        }
        if (memOrder.length > 0) {
            if (memOrder[fieldsObj.index] === 'Ascending') {
                orderInfo.index = 0;
            }
            else if (memOrder[fieldsObj.index] === 'Descending') {
                orderInfo.index = 1;
            }
        }
        if (e.itemData['Field'] === 'Year' && isMemberAdded) {
            fieldCollections.Year[3].Checked = "FY 2018_true";
            fieldCollections.Year[2].Checked = "FY 2017_true";
            membersOrder.value = updateSelectedMembers("Year").reverse();
            isMemberAdded = false;
        }
        else if (e.itemData['Field'] === 'Products' && isMemberAdded_1) {
            fieldCollections.Products[9].Checked = "Gloves_true";
            fieldCollections.Products[0].Checked = "Bottles and Cages_true";
            membersOrder.value = updateSelectedMembers("Products").reverse();
            isMemberAdded_1 = false;
        }
        membersOrder.dataSource = fieldCollections[e.itemData['Field']];
        membersOrder.value = updateSelectedMembers(e.itemData['Field']);
        membersOrder.dataBind();
        orderInfo.dataBind();
    }
    /* jshint ignore:start */
    function dataBound(args) {
        if (isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            var fieldCount = fields.length - 1;
            while (fieldCount > -1) {
                var members = Object.keys(pivotObj.engineModule.fieldList[fields[fieldCount].Field].members);
                var memberCnt = members.length;
                var memberColl = [];
                for (var i = 0; i < memberCnt; i++) {
                    memberColl.push({ Member: members[i], Checked: members[i] + '_' + false });
                }
                fieldCollections[fields[fieldCount].Field] = memberColl;
                fieldCount--;
            }
            fieldCollections.Order_Source.reverse();
            data = (fieldCollections[fields[0].Field]);
            membersOrder.dataSource = data;
            fieldCollections.Country[0].Checked = "France_true";
            fieldCollections.Country[3].Checked = "United States_true";
            getMembers.Country.push('France', 'United States');
            getMembers.Year.push('FY 2018', 'FY 2017');
            getMembers.Products.push('Gloves', 'Bottles and Cages');
            membersOrder.value = updateSelectedMembers("Country").reverse();
            membersOrder.dataBind();
            isInitial = false;
        }
    }
    function actionComplete(args) {
        var sortDetails = pivotObj.dataSourceSettings.sortSettings;
        for (var i = 0; i < (pivotObj.dataSourceSettings.rows.length + pivotObj.dataSourceSettings.columns.length); i++) {
            if (sortDetails.length > 0) {
                if (sortDetails[i] && sortDetails[i].name === 'Country') {
                    updateOrder(sortDetails, i, 'Country', 0);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Products') {
                    updateOrder(sortDetails, i, 'Products', 1);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Year') {
                    updateOrder(sortDetails, i, 'Year', 2);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Order_Source') {
                    updateOrder(sortDetails, i, 'Order_Source', 3);
                }
            }
        }
    }
    /* jshint ignore:end */
    function onChangeOrder(args) {
        if (args.value === 'Ascending') {
            fieldsObj.dataSource[fieldsObj.index].Order = fieldsObj.dataSource[fieldsObj.index].Field + '_asc';
        }
        else {
            fieldsObj.dataSource[fieldsObj.index].Order = fieldsObj.dataSource[fieldsObj.index].Field + '_desc';
        }
        fieldsObj.refresh();
    }
    function onMembersSelect(args) {
        applyBtn.disabled = false;
        maintainCheckedState(fieldsObj.itemData.Field, args.item.textContent, args.item.textContent + '_' + true);
        getMembers[fieldsObj.itemData.Field].push(args.itemData['Member']);
    }
    function onMembersRemove(args) {
        maintainCheckedState(fieldsObj.itemData.Field, args.item.textContent, args.item.textContent + '_' + false);
        index = getMembers[fieldsObj.itemData.Field].indexOf(args.itemData['Member']);
        if (getMembers[fieldsObj.itemData.Field].indexOf(args.itemData['Member']) > -1) {
            getMembers[fieldsObj.itemData.Field].splice(index, 1);
        }
    }
    function open(args) {
        args.popup.element.querySelector(".e-filter-parent").style.display = 'none';
    }
    function checkChange(args) {
        var ischecked = args.checked;
        fieldsObj.enabled = ischecked;
        orderInfo.enabled = ischecked;
        membersOrder.enabled = ischecked;
        applyBtn.disabled = !ischecked;
        pivotObj.dataSourceSettings.enableSorting = ischecked;
    }
    function onClick() {
        if (checkBoxObj.checked) {
            pivotObj.setProperties({
                dataSourceSettings: {
                    enableSorting: true, sortSettings: [
                        { name: 'Country', order: fieldsObj.dataSource[0].Order === 'Country_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Country'] },
                        { name: 'Products', order: fieldsObj.dataSource[1].Order === 'Products_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Products'] },
                        { name: 'Year', order: fieldsObj.dataSource[2].Order === 'Year_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Year'] },
                        { name: 'Order_Source', order: fieldsObj.dataSource[3].Order === 'Order_Source_asc' ? 'Ascending' : 'Descending', membersOrder: getMembers['Order_Source'] }
                    ]
                }
            }, true);
        }
        else {
            pivotObj.setProperties({ dataSourceSettings: { enableSorting: false, sortSettings: [] } }, true);
        }
        pivotObj.refreshData();
    }
    /** To set the checked status of the members maintained in the object fieldCollections. */
    function maintainCheckedState(field, member, checkedState) {
        var members = fieldCollections[field];
        var count = members.length - 1;
        while (count > -1) {
            if (members[count].Member === member) {
                members[count].Checked = checkedState;
                break;
            }
            count--;
        }
    }
    /** To get the checked members/status here as string array. */
    function updateSelectedMembers(field) {
        var membersCollections = [];
        var members = fieldCollections[field];
        var count = members.length - 1;
        while (count > -1) {
            if (members[count].Checked === members[count].Member + '_' + true) {
                membersCollections.push(members[count].Member.toString());
            }
            count--;
        }
        return membersCollections;
    }
    function updateOrder(sortDetails, i, fieldName, j) {
        if (sortDetails[i].order === 'Ascending') {
            if (fieldsObj.itemData.Field === fieldName) {
                orderInfo.index = 0;
            }
            memOrder[j] = 'Ascending';
        }
        else {
            if (fieldsObj.itemData.Field === fieldName) {
                orderInfo.index = 1;
            }
            memOrder[j] = 'Descending';
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', style: { overflow: 'auto' } },
            React.createElement("div", { className: 'col-lg-8 adaptive' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, showGroupingBar: true, groupingBarSettings: { showRemoveIcon: false, showFilterIcon: false, showSortIcon: true, showValueTypeIcon: false, allowDragAndDrop: false }, width: '100%', height: '450', gridSettings: { columnWidth: 140 }, dataBound: dataBound.bind(this), actionComplete: actionComplete.bind(this) },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.GroupingBar] }))),
            React.createElement("div", { className: 'col-lg-4 property-section pivot-property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', height: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", { colSpan: 2 },
                                    React.createElement("div", { className: 'row' },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (scope) { checkBoxObj = scope; }, id: 'reorder', checked: true, label: 'Enable Sorting', labelPosition: 'After', change: checkChange.bind(this) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'hdrlabel' }, "Field:")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { fieldsObj = scope; }, change: onChange.bind(this), width: "98%", id: "etype", type: 'text', tabIndex: 0, dataSource: fields, index: 0, fields: { text: 'caption', value: 'Order' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'hdrlabel' }, "Headers:")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { ref: function (scope) { membersOrder = scope; }, select: onMembersSelect.bind(this), removed: onMembersRemove.bind(this), open: open.bind(this), width: "98%", placeholder: "Select headers", id: "etype", type: 'text', tabIndex: 1, dataSource: data, mode: 'CheckBox', showDropDownIcon: true, showClearButton: false, enableSelectionOrder: false, fields: { text: 'Member' }, "aria-label": 'multiselect' },
                                            React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'hdrlabel' }, "Order:")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { orderInfo = scope; }, type: "text", tabIndex: 1, change: onChangeOrder.bind(this), width: "98%", id: "etype", dataSource: order, index: 0 })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("div", { id: "btn-control", style: { float: 'right', marginRight: '4px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'apply', ref: function (scope) { applyBtn = scope; }, onClick: onClick.bind(this), isPrimary: true }, "Apply"))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates ordering used-defined member(s), aka header name(s), of specific field in row and column axes in ascending or descending order.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this sample, any field from the ",
                React.createElement("b", null, "Field"),
                " dropdown list and its member(s), aka header name(s), from the ",
                React.createElement("b", null, "Headers"),
                " dropdown list can be ordered ascending or descending. It is possible to achieve this by setting the ",
                React.createElement("code", null, "enableSorting"),
                " property to ",
                React.createElement("b", null, "true"),
                ", as well as the field name, sort order, and member(s) (which can be in any order) inside the pivot table's ",
                React.createElement("code", null, "sortSettings"),
                " property. The ",
                React.createElement("code", null, "dataSourceSettings"),
                " includes ",
                React.createElement("code", null, "enableSorting"),
                " and ",
                React.createElement("code", null, "sortSettings"),
                " properties."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the custom sorting can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/sorting#custom-sorting" }, "documentation section"),
                "."))));
}
exports.default = CustomSorting;
