"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSorting = void 0;
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
var CustomSorting = /** @class */ (function (_super) {
    __extends(CustomSorting, _super);
    function CustomSorting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fieldCollections = {};
        _this.isInitial = true;
        _this.getMembers = { 'Country': [], 'Products': [], 'Year': [], 'Order_Source': [] };
        _this.memOrder = [];
        _this.data = [];
        _this.isMemberAdded = true;
        _this.isMemberAdded_1 = true;
        _this.order = ['Ascending', 'Descending'];
        _this.fields = [
            { Field: 'Country', Order: 'Country_asc', caption: 'Country' },
            { Field: 'Products', Order: 'Products_desc', caption: 'Products' },
            { Field: 'Year', Order: 'Year_desc', caption: 'Year' },
            { Field: 'Order_Source', Order: 'Order_Source_asc', caption: 'Order Source' }
        ];
        return _this;
    }
    CustomSorting.prototype.onChange = function (e) {
        if (this.fieldsObj.dataSource[this.fieldsObj.index].Order === this.fieldsObj.dataSource[this.fieldsObj.index].Field + '_asc') {
            this.orderInfo.index = 0;
        }
        else {
            this.orderInfo.index = 1;
        }
        if (this.memOrder.length > 0) {
            if (this.memOrder[this.fieldsObj.index] === 'Ascending') {
                this.orderInfo.index = 0;
            }
            else if (this.memOrder[this.fieldsObj.index] === 'Descending') {
                this.orderInfo.index = 1;
            }
        }
        if (e.itemData['Field'] === 'Year' && this.isMemberAdded) {
            this.fieldCollections.Year[3].Checked = "FY 2018_true";
            this.fieldCollections.Year[2].Checked = "FY 2017_true";
            this.membersOrder.value = this.updateSelectedMembers("Year").reverse();
            this.isMemberAdded = false;
        }
        else if (e.itemData['Field'] === 'Products' && this.isMemberAdded_1) {
            this.fieldCollections.Products[9].Checked = "Gloves_true";
            this.fieldCollections.Products[0].Checked = "Bottles and Cages_true";
            this.membersOrder.value = this.updateSelectedMembers("Products").reverse();
            this.isMemberAdded_1 = false;
        }
        this.membersOrder.dataSource = this.fieldCollections[e.itemData['Field']];
        this.membersOrder.value = this.updateSelectedMembers(e.itemData['Field']);
        this.membersOrder.dataBind();
        this.orderInfo.dataBind();
    };
    /* jshint ignore:start */
    CustomSorting.prototype.dataBound = function (args) {
        if (this.isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            var fieldCount = this.fields.length - 1;
            while (fieldCount > -1) {
                var members = Object.keys(this.pivotObj.engineModule.fieldList[this.fields[fieldCount].Field].members);
                var memberCnt = members.length;
                var memberColl = [];
                for (var i = 0; i < memberCnt; i++) {
                    memberColl.push({ Member: members[i], Checked: members[i] + '_' + false });
                }
                this.fieldCollections[this.fields[fieldCount].Field] = memberColl;
                fieldCount--;
            }
            this.fieldCollections.Order_Source.reverse();
            this.data = (this.fieldCollections[this.fields[0].Field]);
            this.membersOrder.dataSource = this.data;
            this.fieldCollections.Country[0].Checked = "France_true";
            this.fieldCollections.Country[3].Checked = "United States_true";
            this.getMembers.Country.push('France', 'United States');
            this.getMembers.Year.push('FY 2018', 'FY 2017');
            this.getMembers.Products.push('Gloves', 'Bottles and Cages');
            this.membersOrder.value = this.updateSelectedMembers("Country").reverse();
            this.membersOrder.dataBind();
            this.isInitial = false;
        }
    };
    CustomSorting.prototype.actionComplete = function (args) {
        var sortDetails = this.pivotObj.dataSourceSettings.sortSettings;
        for (var i = 0; i < (this.pivotObj.dataSourceSettings.rows.length + this.pivotObj.dataSourceSettings.columns.length); i++) {
            if (sortDetails.length > 0) {
                if (sortDetails[i] && sortDetails[i].name === 'Country') {
                    this.updateOrder(sortDetails, i, 'Country', 0);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Products') {
                    this.updateOrder(sortDetails, i, 'Products', 1);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Year') {
                    this.updateOrder(sortDetails, i, 'Year', 2);
                }
                else if (sortDetails[i] && sortDetails[i].name === 'Order_Source') {
                    this.updateOrder(sortDetails, i, 'Order_Source', 3);
                }
            }
        }
    };
    /* jshint ignore:end */
    CustomSorting.prototype.onChangeOrder = function (args) {
        if (args.value === 'Ascending') {
            this.fieldsObj.dataSource[this.fieldsObj.index].Order = this.fieldsObj.dataSource[this.fieldsObj.index].Field + '_asc';
        }
        else {
            this.fieldsObj.dataSource[this.fieldsObj.index].Order = this.fieldsObj.dataSource[this.fieldsObj.index].Field + '_desc';
        }
        this.fieldsObj.refresh();
    };
    CustomSorting.prototype.onMembersSelect = function (args) {
        this.applyBtn.disabled = false;
        this.maintainCheckedState(this.fieldsObj.itemData.Field, args.item.textContent, args.item.textContent + '_' + true);
        this.getMembers[this.fieldsObj.itemData.Field].push(args.itemData['Member']);
    };
    CustomSorting.prototype.onMembersRemove = function (args) {
        this.maintainCheckedState(this.fieldsObj.itemData.Field, args.item.textContent, args.item.textContent + '_' + false);
        this.index = this.getMembers[this.fieldsObj.itemData.Field].indexOf(args.itemData['Member']);
        if (this.getMembers[this.fieldsObj.itemData.Field].indexOf(args.itemData['Member']) > -1) {
            this.getMembers[this.fieldsObj.itemData.Field].splice(this.index, 1);
        }
    };
    CustomSorting.prototype.open = function (args) {
        args.popup.element.querySelector(".e-filter-parent").style.display = 'none';
    };
    CustomSorting.prototype.checkChange = function (args) {
        var ischecked = args.checked;
        this.fieldsObj.enabled = ischecked;
        this.orderInfo.enabled = ischecked;
        this.membersOrder.enabled = ischecked;
        this.applyBtn.disabled = !ischecked;
        this.pivotObj.dataSourceSettings.enableSorting = ischecked;
    };
    CustomSorting.prototype.onClick = function () {
        if (this.checkBoxObj.checked) {
            this.pivotObj.setProperties({
                dataSourceSettings: {
                    enableSorting: true, sortSettings: [
                        { name: 'Country', order: this.fieldsObj.dataSource[0].Order === 'Country_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Country'] },
                        { name: 'Products', order: this.fieldsObj.dataSource[1].Order === 'Products_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Products'] },
                        { name: 'Year', order: this.fieldsObj.dataSource[2].Order === 'Year_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Year'] },
                        { name: 'Order_Source', order: this.fieldsObj.dataSource[3].Order === 'Order_Source_asc' ? 'Ascending' : 'Descending', membersOrder: this.getMembers['Order_Source'] }
                    ]
                }
            }, true);
        }
        else {
            this.pivotObj.setProperties({ dataSourceSettings: { enableSorting: false, sortSettings: [] } }, true);
        }
        this.pivotObj.refreshData();
    };
    /** To set the checked status of the members maintained in the object fieldCollections. */
    CustomSorting.prototype.maintainCheckedState = function (field, member, checkedState) {
        var members = this.fieldCollections[field];
        var count = members.length - 1;
        while (count > -1) {
            if (members[count].Member === member) {
                members[count].Checked = checkedState;
                break;
            }
            count--;
        }
    };
    /** To get the checked members/status here as string array. */
    CustomSorting.prototype.updateSelectedMembers = function (field) {
        var membersCollections = [];
        var members = this.fieldCollections[field];
        var count = members.length - 1;
        while (count > -1) {
            if (members[count].Checked === members[count].Member + '_' + true) {
                membersCollections.push(members[count].Member.toString());
            }
            count--;
        }
        return membersCollections;
    };
    CustomSorting.prototype.updateOrder = function (sortDetails, i, fieldName, j) {
        if (sortDetails[i].order === 'Ascending') {
            if (this.fieldsObj.itemData.Field === fieldName) {
                this.orderInfo.index = 0;
            }
            this.memOrder[j] = 'Ascending';
        }
        else {
            if (this.fieldsObj.itemData.Field === fieldName) {
                this.orderInfo.index = 1;
            }
            this.memOrder[j] = 'Descending';
        }
    };
    CustomSorting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', style: { overflow: 'auto' } },
                React.createElement("div", { className: 'col-lg-8 adaptive' },
                    React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { _this.pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, showGroupingBar: true, groupingBarSettings: { showRemoveIcon: false, showFilterIcon: false, showSortIcon: true, showValueTypeIcon: false, allowDragAndDrop: false }, width: '100%', height: '450', gridSettings: { columnWidth: 140 }, dataBound: this.dataBound.bind(this), actionComplete: this.actionComplete.bind(this) },
                        React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.GroupingBar] }))),
                React.createElement("div", { className: 'col-lg-4 property-section pivot-property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', height: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { colSpan: 2 },
                                        React.createElement("div", { className: 'row' },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (scope) { _this.checkBoxObj = scope; }, id: 'reorder', checked: true, label: 'Enable Sorting', labelPosition: 'After', change: this.checkChange.bind(this) })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'hdrlabel' }, "Field:")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { _this.fieldsObj = scope; }, change: this.onChange.bind(this), width: "98%", id: "etype", type: 'text', tabIndex: 0, dataSource: this.fields, index: 0, fields: { text: 'caption', value: 'Order' } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'hdrlabel' }, "Headers:")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { ref: function (scope) { _this.membersOrder = scope; }, select: this.onMembersSelect.bind(this), removed: this.onMembersRemove.bind(this), open: this.open.bind(this), width: "98%", placeholder: "Select headers", id: "etype", type: 'text', tabIndex: 1, dataSource: this.data, mode: 'CheckBox', showDropDownIcon: true, showClearButton: false, enableSelectionOrder: false, fields: { text: 'Member' }, "aria-label": 'multiselect' },
                                                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'hdrlabel' }, "Order:")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { _this.orderInfo = scope; }, type: "text", tabIndex: 1, change: this.onChangeOrder.bind(this), width: "98%", id: "etype", dataSource: this.order, index: 0 })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null),
                                    React.createElement("td", null,
                                        React.createElement("div", { id: "btn-control", style: { float: 'right', marginRight: '4px' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'apply', ref: function (scope) { _this.applyBtn = scope; }, onClick: this.onClick.bind(this), isPrimary: true }, "Apply"))))))))),
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
    };
    return CustomSorting;
}(sample_base_1.SampleBase));
exports.CustomSorting = CustomSorting;
