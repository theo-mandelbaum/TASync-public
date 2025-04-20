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
exports.LocalData = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./local-data.css");
var dataSource = require("./local-data.json");
var LocalData = /** @class */ (function (_super) {
    __extends(LocalData, _super);
    function LocalData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = dataSource;
        // Hierarchical data source for Dropdown Tree component
        _this.fields = { dataSource: _this.data.hierarchicalData, value: 'code', text: 'name', child: 'countries' };
        // Self-referential list data source for Dropdown Tree component
        _this.listfields = { dataSource: _this.data.localData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
        return _this;
    }
    LocalData.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section dropdowntree-local' },
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { id: "local" },
                        React.createElement("p", { className: "displayText" }, " Hierarchical Data"),
                        React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { id: "ddtlocal", fields: this.fields, popupHeight: "200px", placeholder: "Select an item" }))),
                React.createElement("div", { className: 'col-lg-6' },
                    React.createElement("div", { id: "local" },
                        React.createElement("p", { className: "displayText" }, "List Data"),
                        React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { id: "ddtlist", fields: this.listfields, popupHeight: "200px", placeholder: "Select an item" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample explains you about the different local data binding supports of the Dropdown Tree component. Click the Dropdown Tree element, and then select an item from the hierarchical structure suggestion list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Dropdown Tree"),
                    " component loads the data through the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#datasource" }, "dataSource"),
                    " property, where the data can be either local data or remote data. In case of local data, the data structure can be hierarchical data or list data (with self-referential format i.e., mapped with the ",
                    React.createElement("b", null, "value"),
                    " and ",
                    React.createElement("b", null, "parentValue"),
                    " fields)."),
                React.createElement("p", null,
                    "In this demo, the first Dropdown Tree is bound with the hierarchical data that contains the array of nested objects. And, the second Dropdown Tree is bound with the list type data where the parent-child relation is referred by the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#value" }, "value"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/fields/#parentvalue" }, "parentValue"),
                    " mapping fields."))));
    };
    return LocalData;
}(sample_base_1.SampleBase));
exports.LocalData = LocalData;
