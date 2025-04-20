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
exports.Overview = void 0;
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_grids_2 = require("@syncfusion/ej2-react-grids");
require("./overview.css");
var Overview = /** @class */ (function (_super) {
    __extends(Overview, _super);
    function Overview() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editOptions = { allowAdding: true, mode: 'Dialog' };
        return _this;
    }
    Overview.prototype.orders = function () {
        var orders = [];
        for (var i = 1; i < 10; i++) {
            orders.push({
                "OrderID": 10589 + i,
                "CustomerID": ["VINET", "TOMSP", "SUPRD", "CHOPS", "RICSU"][Math.floor(Math.random() * 5)],
                "Freight": (10.35 * i).toFixed(2),
                "ShippingCountry": ["France", "Brazil", "Switzerland", "Germany"][Math.floor(Math.random() * 4)]
            });
        }
        return orders;
    };
    Overview.prototype.handleClick = function () {
        this.grid.addRecord();
    };
    Overview.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { id: "fabTarget", className: "fab-grid-container custom-index" },
                    React.createElement(ej2_react_grids_1.GridComponent, { id: "Grid", className: "fabgrid", dataSource: this.orders(), editSettings: this.editOptions, ref: function (grid) { return _this.grid = grid; } },
                        React.createElement(ej2_react_grids_2.Inject, { services: [ej2_react_grids_2.Edit] })),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab", title: "Add Record", iconCss: "e-icons e-plus", target: "#fabTarget", onClick: this.handleClick = this.handleClick.bind(this) }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of the Floating Action Button (FAB) component to add a new record to a DataGrid.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The FAB is a button that appears in front of all screen contents and performs the primary action. In this example, FAB is positioned at the bottom left of its target DataGrid to perform the add new record action."))));
    };
    return Overview;
}(sample_base_1.SampleBase));
exports.Overview = Overview;
