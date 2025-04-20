"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var rowhover_css = "\n   .material3 #TreeGrid .e-gridcontent tr.e-row:hover .e-rowcell:not(.e-selectionbackground):not(.e-active) {\n       background-color: rgba(28, 27, 31, 0.05) !important;\n    }\n    .material3-dark #TreeGrid .e-gridcontent tr.e-row:hover .e-rowcell:not(.e-selectionbackground):not(.e-active) {\n       background-color: rgba(230, 225, 229, 0.05) !important;\n    }";
var RowHover = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, rowhover_css),
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", enableHover: true },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "70", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "90", format: "yMd", type: "date", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "endDate", headerText: "End Date", width: "90", format: "yMd", type: "date", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "80", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "80", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "90" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Tree Grid component with the row hover feature. Move the mouse over the Tree Grid rows to see the hover effect.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Row Hover feature enables us to identify the current row by highlighting them with the mouse hovers. This can be enabled by setting the ",
                React.createElement("code", null, "enableHover"),
                " property as true,"),
            React.createElement("p", null,
                "In this demo, by enabling the ",
                React.createElement("code", null, "enableHover"),
                " property, you can move the mouse over Tree Grid rows to see the hover effect."))));
};
exports.default = RowHover;
