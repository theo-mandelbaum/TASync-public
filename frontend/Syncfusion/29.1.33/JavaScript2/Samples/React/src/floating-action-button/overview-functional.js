"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_grids_2 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
require("./overview.css");
var Overview = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var grid = (0, react_1.useRef)(null);
    var editOptions = { allowAdding: true, mode: 'Dialog' };
    var orders = function () {
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
    var handleClick = function () {
        grid.current.addRecord();
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { id: "fabTarget", className: "fab-grid-container custom-index" },
                React.createElement(ej2_react_grids_1.GridComponent, { id: "Grid", className: "fabgrid", dataSource: orders(), editSettings: editOptions, ref: grid },
                    React.createElement(ej2_react_grids_2.Inject, { services: [ej2_react_grids_2.Edit] })),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab", title: "Add Record", iconCss: "e-icons e-plus", target: "#fabTarget", onClick: handleClick }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the usage of the Floating Action Button (FAB) component to add a new record to a DataGrid.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The FAB is a button that appears in front of all screen contents and performs the primary action. In this example, FAB is positioned at the bottom left of its target DataGrid to perform the add new record action."))));
};
exports.default = Overview;
