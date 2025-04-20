"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_multicolumn_combobox_1 = require("@syncfusion/ej2-react-multicolumn-combobox");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./grouping.css");
var data = require("./dataSource.json");
var Group = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var fields = { text: 'Name', value: 'Name', groupBy: 'Category' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: 'control-wrapper grouping-multicolumn' },
                React.createElement("div", { style: { paddingTop: '60px' } },
                    React.createElement("label", null, "Select a product"),
                    React.createElement(ej2_react_multicolumn_combobox_1.MultiColumnComboBoxComponent, { type: "text", dataSource: data.products, fields: fields, placeholder: 'e.g. Laptop', popupHeight: '230px', popupWidth: '550px', allowSorting: false },
                        React.createElement(ej2_react_multicolumn_combobox_1.ColumnsDirective, null,
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Name', header: 'Name', width: 110 }),
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Price', header: 'Price', width: 70 }),
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Availability', header: 'Availability', width: 98 }),
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Category', header: 'Category', width: 95 }),
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Rating', header: 'Rating', width: 70 })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates grouping feature of the MultiColumn Combobox.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The MultiColumn ComboBox allows to group the relevant items under a corresponding category by mapping the ",
                React.createElement("code", null, "groupBy"),
                " property in the ",
                React.createElement("code", null, "fieldSettings"),
                " which allows to load the list of employees. In this sample, the order data is grouped against ",
                React.createElement("code", null, "Position"),
                " column, which illustrates how the orders details are grouped based on its category."))));
};
exports.default = Group;
