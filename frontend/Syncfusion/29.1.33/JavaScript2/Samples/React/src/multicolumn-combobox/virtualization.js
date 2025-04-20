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
exports.Virtual = void 0;
var React = require("react");
var ej2_react_multicolumn_combobox_1 = require("@syncfusion/ej2-react-multicolumn-combobox");
var sample_base_1 = require("../common/sample-base");
require("./virtualization.css");
var Virtual = /** @class */ (function (_super) {
    __extends(Virtual, _super);
    function Virtual() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = function (count) {
            var names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Emily Davis"];
            var departments = ["HR", "IT", "Finance", "Marketing", "Sales"];
            var roles = ["Manager", "Developer", "Analyst", "Consultant", "Executive"];
            var locations = ["New York", "San Francisco", "London", "Berlin", "Tokyo"];
            var result = [];
            for (var i = 0; i < count; i++) {
                result.push({
                    Name: names[Math.floor(Math.random() * names.length)],
                    Department: departments[Math.floor(Math.random() * departments.length)],
                    Role: roles[Math.floor(Math.random() * roles.length)],
                    Location: locations[Math.floor(Math.random() * locations.length)]
                });
            }
            return result;
        };
        return _this;
    }
    Virtual.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: 'control-wrapper virtualization-multicolumn' },
                    React.createElement("div", { style: { paddingTop: '55px' } },
                        React.createElement("label", null, "Select an employee"),
                        React.createElement(ej2_react_multicolumn_combobox_1.MultiColumnComboBoxComponent, { type: "text", dataSource: this.data(150), enableVirtualization: true, fields: this.fields, placeholder: 'e.g. Alice Johnson', popupHeight: '230px', popupWidth: '550px', gridSettings: this.gridSettings },
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnsDirective, null,
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Name', header: 'Name', width: 100 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Department', header: 'Department', width: 100 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Role', header: 'Role', width: 90 }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Location', header: 'Location', width: 90 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the virtualization support in the MultiColumn ComboBox. It has 150 items bound to it. However, when you open the suggestion list only few items are loaded based on the popup height and the remaining items are loaded while scrolling.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The MultiColumn ComboBox supports virtualization, which improves UI performance for large amounts of data. To enable virtualization, set the ",
                    React.createElement("code", null, "enableVirtualization"),
                    " property to ",
                    React.createElement("code", null, "true"),
                    ". When virtualization is enabled, MultiColumn ComboBox doesn't render the entire suggestion data source on initial rendering. It loads the N number of items in the popup on initial rendering and the remaining set number of items will load while scrolling. Virtualization works with both local and remote data."))));
    };
    return Virtual;
}(sample_base_1.SampleBase));
exports.Virtual = Virtual;
