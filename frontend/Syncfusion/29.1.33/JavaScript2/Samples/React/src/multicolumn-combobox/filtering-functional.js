"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_multicolumn_combobox_1 = require("@syncfusion/ej2-react-multicolumn-combobox");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var react_2 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./filtering.css");
var data = require("./dataSource.json");
var Filter = function () {
    (0, react_2.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var fields = { text: 'Name', value: 'Experience' };
    var mccbDropdownListData = ['StartsWith', 'EndsWith', 'Contains'];
    var _a = (0, react_1.useState)('StartsWith'), filterType = _a[0], setFilterType = _a[1];
    var change = function (args) {
        setFilterType(args.value.toString());
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "col-lg-8" },
                React.createElement("div", { className: "control-wrapper multicolumn" },
                    React.createElement("div", { style: { paddingTop: '50px' } },
                        React.createElement("label", null, "Select an employee"),
                        React.createElement(ej2_react_multicolumn_combobox_1.MultiColumnComboBoxComponent, { type: "text", dataSource: data.employee, fields: fields, placeholder: 'Select a name', filterType: filterType, popupHeight: '200px', popupWidth: '650px' },
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnsDirective, null,
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Name', header: 'Name', width: 110 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Department', header: 'Department', width: 120 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Role', header: 'Role', width: 140 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Location', header: 'Location', width: 100 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Experience', header: 'Experience in Year', width: 150 })))))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement("div", { className: "property-panel-header" }, " Properties "),
                React.createElement("div", { className: "property-panel-content" },
                    React.createElement("table", { className: "property-panel-table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null, " Choose filter type "),
                                React.createElement("td", { style: { paddingRight: '10px' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "filterType", dataSource: mccbDropdownListData, index: 0, change: change, placeholder: "Select a filter type", popupHeight: "200px", popupWidth: "300px" })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the built-in support to filter the ",
                React.createElement("code", null, "datasource"),
                " in the MultiColumn ComboBox.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "MultiColumn ComboBox"),
                " supports filtering, which allows users to search for and select items by typing keywords. The available items are dynamically filtered based on the input, ensuring quick access to the desired data."))));
};
exports.default = Filter;
