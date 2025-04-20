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
exports.Group = void 0;
var React = require("react");
var ej2_react_multicolumn_combobox_1 = require("@syncfusion/ej2-react-multicolumn-combobox");
var sample_base_1 = require("../common/sample-base");
require("./grouping.css");
var data = require("./dataSource.json");
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Group.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: 'control-wrapper grouping-multicolumn' },
                    React.createElement("div", { style: { paddingTop: '60px' } },
                        React.createElement("label", null, "Select a product"),
                        React.createElement(ej2_react_multicolumn_combobox_1.MultiColumnComboBoxComponent, { type: "text", dataSource: data.products, fields: this.fields, placeholder: 'e.g. Laptop', popupHeight: '230px', popupWidth: '550px', allowSorting: false },
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
    return Group;
}(sample_base_1.SampleBase));
exports.Group = Group;
