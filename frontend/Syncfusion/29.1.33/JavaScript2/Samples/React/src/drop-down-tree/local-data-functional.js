"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./local-data.css");
var dataSource = require("./local-data.json");
var LocalData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    // Hierarchical data source for Dropdown Tree component
    var fields = { dataSource: data.hierarchicalData, value: 'code', text: 'name', child: 'countries' };
    // Self-referential list data source for Dropdown Tree component
    var listfields = { dataSource: data.localData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section dropdowntree-local' },
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { id: "local" },
                    React.createElement("p", { className: "displayText" }, " Hierarchical Data"),
                    React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { id: "ddtlocal", fields: fields, popupHeight: "200px", placeholder: "Select an item" }))),
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { id: "local" },
                    React.createElement("p", { className: "displayText" }, "List Data"),
                    React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { id: "ddtlist", fields: listfields, popupHeight: "200px", placeholder: "Select an item" })))),
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
exports.default = LocalData;
