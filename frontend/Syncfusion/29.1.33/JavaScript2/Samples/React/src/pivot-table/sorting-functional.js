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
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    dataSource: Pivot_Data,
    expandAll: false,
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }],
    enableSorting: true
};
function Sorting() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pivotObj;
    var fieldsddl;
    var orderddl;
    var applyBtn;
    var checkBoxObj;
    var order = ['Ascending', 'Descending'];
    var fields = [{ Field: 'Country', Order: 'Country_asc' },
        { Field: 'Products', Order: 'Products_asc' },
        { Field: 'Year', Order: 'Year_asc' },
        { Field: 'Order Source', Order: 'Order Source_asc' }];
    function onChange(e) {
        if (fieldsddl.dataSource[fieldsddl.index].Order === fieldsddl.dataSource[fieldsddl.index].Field + '_asc') {
            orderddl.index = 0;
        }
        else {
            orderddl.index = 1;
        }
    }
    function onChangeOrder(args) {
        if (args.value === 'Ascending') {
            fieldsddl.dataSource[fieldsddl.index].Order = fieldsddl.dataSource[fieldsddl.index].Field + '_asc';
        }
        else {
            fieldsddl.dataSource[fieldsddl.index].Order = fieldsddl.dataSource[fieldsddl.index].Field + '_desc';
        }
        fieldsddl.refresh();
    }
    function checkChange(args) {
        var ischecked = args.checked;
        fieldsddl.enabled = ischecked;
        orderddl.enabled = ischecked;
        applyBtn.disabled = !ischecked;
        pivotObj.dataSourceSettings.enableSorting = ischecked;
    }
    function onClick() {
        if (checkBoxObj.checked) {
            pivotObj.dataSourceSettings.enableSorting = true;
            pivotObj.dataSourceSettings.sortSettings = [
                { name: 'Country', order: fieldsddl.dataSource[0].Order === 'Country_asc' ? 'Ascending' : 'Descending' },
                { name: 'Products', order: fieldsddl.dataSource[1].Order === 'Products_asc' ? 'Ascending' : 'Descending' },
                { name: 'Year', order: fieldsddl.dataSource[2].Order === 'Year_asc' ? 'Ascending' : 'Descending' },
                { name: 'Order_Source', order: fieldsddl.dataSource[3].Order === 'Order Source_asc' ? 'Ascending' : 'Descending' }
            ];
        }
        else {
            pivotObj.dataSourceSettings.enableSorting = false;
            pivotObj.dataSourceSettings.sortSettings = [];
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', style: { overflow: 'auto' } },
            React.createElement("div", { className: 'col-lg-8 adaptive' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (pivotview) { pivotObj = pivotview; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '300', gridSettings: { columnWidth: 140 } })),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'pivot-property-panel-table property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'row', style: { paddingLeft: 0, marginLeft: '-10px' } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: function (scope) { checkBoxObj = scope; }, id: 'reorder', checked: true, label: 'Enable Sorting', labelPosition: 'After', change: checkChange.bind(this) })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'pivotHdrLabel' }, "Fields:")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { marginLeft: '-50px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { fieldsddl = scope; }, change: onChange.bind(this), width: "98%", id: "etype", dataSource: fields, index: 0, fields: { text: 'Field', value: 'Order' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'pivotHdrLabel' }, "Order:")),
                                React.createElement("td", null,
                                    React.createElement("div", { style: { marginLeft: '-50px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { enabled: true, ref: function (scope) { orderddl = scope; }, change: onChangeOrder.bind(this), width: "98%", id: "etype", dataSource: order, index: 0 })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null),
                                React.createElement("td", null,
                                    React.createElement("div", { className: 'row', style: { float: 'right', paddingRight: '15px' } },
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { applyBtn = scope; }, onClick: onClick.bind(this), isPrimary: true }, "Apply"))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates ordering fields in row and column axes either in ascending or descending order.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this sample, any field can be selected from the",
                React.createElement("b", null, " Fields"),
                " dropdown list and its order can be changed to display headers either in ascending or descending order. It can be enabled using the",
                React.createElement("code", null, " enableSorting"),
                " property and it can be configured using the",
                React.createElement("code", null, " name"),
                " and",
                React.createElement("code", null, " order"),
                " options inside the",
                React.createElement("code", null, " sortSettings"),
                " property in the pivot table."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the sorting can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/sorting" }, "documentation section"),
                "."))));
}
exports.default = Sorting;
