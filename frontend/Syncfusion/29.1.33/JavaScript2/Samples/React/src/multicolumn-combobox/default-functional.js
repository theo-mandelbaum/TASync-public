"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_multicolumn_combobox_1 = require("@syncfusion/ej2-react-multicolumn-combobox");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./default.css");
var data = require("./dataSource.json");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("Electronics"), value = _a[0], setValue = _a[1];
    var _b = (0, react_1.useState)("Laptop"), text = _b[0], setText = _b[1];
    var valueChange = function (args) {
        setValue(args.itemData.value || "null");
        setText(args.itemData.text || "null");
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "col-lg-8" },
                React.createElement("div", { className: "control-wrapper multicolumn" },
                    React.createElement("div", { style: { paddingTop: '50px' } },
                        React.createElement("label", null, "Select a product"),
                        React.createElement(ej2_react_multicolumn_combobox_1.MultiColumnComboBoxComponent, { dataSource: data.products, fields: { text: 'Name', value: 'Category' }, popupHeight: '230px', popupWidth: '520px', placeholder: 'Select any product', value: value, text: text, change: valueChange, showClearButton: true },
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnsDirective, null,
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Name', header: 'Name', width: 110 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Price', header: 'Price', width: 70 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Availability', header: 'Availability', width: 98 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Category', header: 'Category', width: 95 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Rating', header: 'Rating', width: 70 })))))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', margin: '10px' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { className: "left-side" }, "Value"),
                                React.createElement("td", null,
                                    ":",
                                    React.createElement("span", { id: 'value', className: "right-side" }, value))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: "left-side" }, "Text"),
                                React.createElement("td", null,
                                    ":",
                                    React.createElement("span", { id: 'text', className: "right-side" },
                                        " ",
                                        text)))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the default functionalities of the ",
                React.createElement("code", null, "MultiColumn ComboBox"),
                ".")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "MultiColumn ComboBox"),
                " allows the user to display detailed information about items in multiple columns. In the above sample, type any character in the MultiColumn ComboBox or click the dropdown icon to choose an employee from the options available in the list. The selected item's ",
                React.createElement("code", null, "value"),
                " and ",
                React.createElement("code", null, "text"),
                " property values will be shown in the property panel."))));
};
exports.default = Default;
