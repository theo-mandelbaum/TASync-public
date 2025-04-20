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
exports.DrillDown = void 0;
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
    dataSource: Pivot_Data,
    expandAll: false,
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    rows: [{ name: 'Country', expandAll: true }, { name: 'Products' }],
    columns: [{ name: 'Year', dataType: 'string' }, { name: 'Order_Source', caption: 'Order Source' }],
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};
var DrillDown = /** @class */ (function (_super) {
    __extends(DrillDown, _super);
    function DrillDown() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fieldCollections = {};
        _this.isInitial = true;
        _this.storeMembers = { 'Country': [], 'Year': [] };
        _this.isRowSelect = false;
        _this.isColumnSelect = false;
        _this.values = [];
        _this.fields = [
            { Field: 'Country', expandAll: false },
            { Field: 'Year', expandAll: false }
        ];
        _this.options = [
            { value: 'allHeaders', text: 'All headers' },
            { value: 'rowHeaders', text: 'Row headers' },
            { value: 'columnHeader', text: 'Column headers' },
            { value: 'specificFields', text: 'Specific fields' },
            { value: 'specificHeaders', text: 'Specific headers' }
        ];
        return _this;
    }
    DrillDown.prototype.onChange = function (e) {
        this.membersOrder.dataSource = this.fieldCollections[e.itemData['Field']];
        this.membersOrder.value = this.getSelectedMembers(e.itemData['Field']);
        this.membersOrder.dataBind();
        this.field1.dataBind();
    };
    /* jshint ignore:start */
    DrillDown.prototype.dataBound = function (args) {
        if (this.isInitial) {
            /** To fill the members for each fields into the object fieldCollections. */
            var fieldCnt = this.fields.length - 1;
            while (fieldCnt > -1) {
                var members = Object.keys(this.pivotObj.engineModule.fieldList[this.fields[fieldCnt].Field].members);
                var memberCnt = members.length;
                var membersCollection = [];
                for (var i = 0; i < memberCnt; i++) {
                    membersCollection.push({ Member: members[i], Checked: members[i] + '_' + false });
                }
                this.fieldCollections[this.fields[fieldCnt].Field] = membersCollection;
                fieldCnt--;
            }
            this.values = this.fieldCollections[this.fields[0].Field];
            this.membersOrder.dataSource = this.values;
            this.membersOrder.dataBind();
            this.fieldsddl.dataBind();
            this.isInitial = false;
        }
    };
    /* jshint ignore:end */
    DrillDown.prototype.onChangeOption = function (args) {
        document.querySelector('.field_cls').style.display = 'none';
        document.querySelector('.field_cls_1').style.display = 'none';
        document.querySelector('.members_cls').style.display = 'none';
        document.querySelector('.apply_cls').style.display = 'none';
        if (args.value == 'allHeaders') {
            this.clear();
            this.pivotObj.setProperties({ dataSourceSettings: { expandAll: true, drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.pivotObj.refreshData();
        }
        else if (args.value == 'rowHeaders') {
            this.clear();
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, true, false);
        }
        else if (args.value == 'columnHeader') {
            this.clear();
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, false, true);
        }
        else if (args.value == 'specificFields') {
            document.querySelector('.field_cls').style.display = '';
        }
        else if (args.value == 'specificHeaders') {
            document.querySelector('.field_cls_1').style.display = '';
            document.querySelector('.members_cls').style.display = '';
            document.querySelector('.apply_cls').style.display = '';
        }
    };
    DrillDown.prototype.onMembersSelect = function (args) {
        this.setMemberCheckedState(this.field1.itemData.Field, args['item'].textContent, args['item'].textContent + '_' + true);
        this.applyBtn.disabled = false;
        this.storeMembers[this.field1.itemData.Field].push(args.itemData['Member']);
    };
    DrillDown.prototype.onMembersRemove = function (args) {
        this.setMemberCheckedState(this.field1.itemData.Field, args['item'].textContent, args['item'].textContent + '_' + false);
        this.index = this.storeMembers[this.field1.itemData.Field].indexOf(args.itemData['Member']);
        if (this.storeMembers[this.field1.itemData.Field].indexOf(args.itemData['Member']) > -1) {
            this.storeMembers[this.field1.itemData.Field].splice(this.index, 1);
        }
    };
    DrillDown.prototype.onFieldSelect = function (args) {
        this.membersOrder.value = [];
        if (this.storeMembers['Country'].length > 0 || this.storeMembers['Year'].length > 0) {
            this.storeMembers = { 'Country': [], 'Year': [] };
            this.isInitial = true;
        }
        if (args.itemData['Field'] === 'Country') {
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, true, this.isColumnSelect);
            this.isRowSelect = true;
        }
        else if (args.itemData['Field'] === 'Year') {
            this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: [] }, { name: 'Year', items: [] }] } }, true);
            this.updateRowColumn(false, this.isRowSelect, true);
            this.isColumnSelect = true;
        }
    };
    DrillDown.prototype.onFieldRemove = function (args) {
        if (args.itemData['Field'] === 'Country') {
            this.updateRowColumn(false, false, this.isColumnSelect);
            this.isRowSelect = false;
        }
        else if (args.itemData['Field'] === 'Year') {
            this.updateRowColumn(false, this.isRowSelect, false);
            this.isColumnSelect = false;
        }
    };
    DrillDown.prototype.open = function (args) {
        args.popup.element.querySelector(".e-filter-parent").style.display = 'none';
    };
    DrillDown.prototype.onClick = function () {
        this.fieldsddl.value = [];
        this.isRowSelect = false;
        this.isColumnSelect = false;
        this.pivotObj.setProperties({ dataSourceSettings: { drilledMembers: [{ name: 'Country', items: this.storeMembers['Country'] }, { name: 'Year', items: this.storeMembers['Year'] }] } }, true);
        this.updateRowColumn(false, false, false);
    };
    /** To set the checked status of the members maintained in the object fieldCollections. */
    DrillDown.prototype.setMemberCheckedState = function (field, member, checkedState) {
        var members = this.fieldCollections[field];
        var membersLength = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Member === member) {
                members[membersLength].Checked = checkedState;
                break;
            }
            membersLength--;
        }
    };
    /** To get the checked members/status here as string array. */
    DrillDown.prototype.getSelectedMembers = function (field) {
        var membersCollection = [];
        var members = this.fieldCollections[field];
        var membersLength = members.length - 1;
        while (membersLength > -1) {
            if (members[membersLength].Checked === members[membersLength].Member + '_' + true) {
                membersCollection.push(members[membersLength].Member.toString());
            }
            membersLength--;
        }
        return membersCollection;
    };
    DrillDown.prototype.updateRowColumn = function (isExpand, isRowExpand, isColumnExpand) {
        this.pivotObj.setProperties({
            dataSourceSettings: {
                expandAll: isExpand, rows: [
                    { name: 'Country', expandAll: this.fieldsddl.dataSource[0].expandAll = isRowExpand },
                    { name: 'Products' }
                ], columns: [
                    { name: 'Year', expandAll: this.fieldsddl.dataSource[1].expandAll = isColumnExpand },
                    { name: 'Order_Source' }
                ]
            }
        }, true);
        this.pivotObj.refreshData();
    };
    DrillDown.prototype.clear = function () {
        this.fieldsddl.value = [];
        this.isRowSelect = false;
        this.isColumnSelect = false;
        this.membersOrder.value = [];
        if (this.storeMembers['Country'].length > 0 || this.storeMembers['Year'].length > 0) {
            this.storeMembers = { 'Country': [], 'Year': [] };
            this.isInitial = true;
        }
    };
    DrillDown.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', style: { overflow: 'auto' } },
                React.createElement("div", { className: 'col-lg-8 adaptive' },
                    React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { _this.pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '300', gridSettings: { columnWidth: 140 }, dataBound: this.dataBound.bind(this) })),
                React.createElement("div", { className: 'col-lg-4 property-section pivot-property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%', height: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'hdrlabel', style: { height: '50px' } }, "Drill Down:")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { _this.optionsdll = scope; }, type: "text", tabIndex: 0, change: this.onChangeOption.bind(this), width: "98%", id: "etype", dataSource: this.options, fields: { value: 'value', text: 'text' }, value: 'rowHeaders' })))),
                                React.createElement("tr", { className: 'field_cls', style: { height: '50px', display: 'none' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'hdrlabel' }, "Fields:")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { ref: function (scope) { _this.fieldsddl = scope; }, select: this.onFieldSelect.bind(this), removed: this.onFieldRemove.bind(this), open: this.open.bind(this), width: "98%", placeholder: "Select fields", id: "etype", type: 'text', tabIndex: 1, dataSource: this.fields, mode: 'CheckBox', showDropDownIcon: true, showClearButton: false, enableSelectionOrder: false, fields: { text: 'Field' } },
                                                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
                                React.createElement("tr", { className: 'field_cls_1', style: { height: '50px', display: 'none' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'hdrlabel' }, "Fields:")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { _this.field1 = scope; }, placeholder: "Select fields", change: this.onChange.bind(this), width: "100%", id: "etype", type: 'text', tabIndex: 1, dataSource: this.fields, fields: { text: 'Field' }, value: "Country" })))),
                                React.createElement("tr", { className: 'members_cls', style: { height: '50px', display: 'none' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { className: 'hdrlabel' }, "Headers:")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { ref: function (scope) { _this.membersOrder = scope; }, select: this.onMembersSelect.bind(this), removed: this.onMembersRemove.bind(this), open: this.open.bind(this), width: "98%", placeholder: "Select headers", id: "etype", type: 'text', tabIndex: 1, dataSource: this.values, mode: 'CheckBox', showDropDownIcon: true, showClearButton: false, enableSelectionOrder: false, fields: { text: 'Member' } },
                                                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] }))))),
                                React.createElement("tr", { className: 'apply_cls', style: { height: '50px', display: "none" } },
                                    React.createElement("td", null),
                                    React.createElement("td", null,
                                        React.createElement("div", { id: "btn-control", style: { float: 'right' } },
                                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'apply', ref: function (scope) { _this.applyBtn = scope; }, onClick: this.onClick.bind(this), isPrimary: true }, "Apply"))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to drill down on all headers, column headers only, row headers only, specific field(s), and specific member(s) within the specific field(s).")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, drill down can be performed based on the option selected from the ",
                    React.createElement("b", null, "Drill Down"),
                    " dropdown list. The available options are described in detail below."),
                React.createElement("table", null,
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '10px 0', width: '150px' } },
                            React.createElement("code", null, "All headers :")),
                        React.createElement("td", { style: { paddingTop: '10px' } },
                            "Allows to expand all headers of row and column axes in the pivot table. It can be achieved by setting the ",
                            React.createElement("code", null, "expandAll"),
                            " property to ",
                            React.createElement("b", null, "true"),
                            " in the ",
                            React.createElement("code", null, "dataSourceSettings"),
                            ".")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Row headers :")),
                        React.createElement("td", { style: { paddingTop: '2px' } },
                            "Allows to expand all row headers in the pivot table. It can be achieved by setting the ",
                            React.createElement("code", null, "expandAll"),
                            " property to ",
                            React.createElement("b", null, "true"),
                            " for row fields only.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Column headers :")),
                        React.createElement("td", { style: { paddingTop: '2px' } },
                            "Allows to expand all column headers in the pivot table. It can be achieved by setting the ",
                            React.createElement("code", null, "expandAll"),
                            " property to ",
                            React.createElement("b", null, "true"),
                            " for column fields only.")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Specific fields :")),
                        React.createElement("td", { style: { paddingTop: '3px' } },
                            "Allows to expand specific field(s) in the pivot table's row or column axes. It can be achieved by setting the ",
                            React.createElement("code", null, "expandAll"),
                            " property for the relevant field(s) in the row and column axes to ",
                            React.createElement("b", null, "true"),
                            ".")),
                    React.createElement("tr", null,
                        React.createElement("td", { style: { verticalAlign: 'top', padding: '4px 0' } },
                            React.createElement("code", null, "Specific headers :")),
                        React.createElement("td", { style: { paddingTop: '3px' } },
                            "Allows to expand specific header(s) within the respective field available in the pivot table's row or column axes. It can be achieved by specifying the respective field name and its member(s), aka header name(s), inside the ",
                            React.createElement("code", null, "drilledMembers"),
                            " property in the ",
                            React.createElement("code", null, "dataSourceSettings"),
                            "."))),
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information on the drill down can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/drill-down" }, "documentation section"),
                    "."))));
    };
    return DrillDown;
}(sample_base_1.SampleBase));
exports.DrillDown = DrillDown;
