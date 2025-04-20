"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "410" },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "70", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "90", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "endDate", headerText: "End Date", width: "90", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "90" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default rendering of the Tree Grid with minimum configuration.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Tree Grid is used to represent the hierarchical data in a tabular format, combining the visual representation of Grid and TreeView controls. It represents the data from ",
                React.createElement("code", null, "DataManager"),
                "binding data fields to columns or self-referential datasource."),
            React.createElement("p", null, "In this demo, the Tree Grid is populated with its minimum default settings."),
            React.createElement("p", null,
                "More information on the Tree Grid instantiation can be found in this",
                " ",
                React.createElement("a", { target: "_blank", href: "#" },
                    " ",
                    "documentation section.")))));
};
exports.default = Default;
