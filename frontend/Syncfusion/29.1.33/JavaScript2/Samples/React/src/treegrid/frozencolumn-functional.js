"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
{ /* custom code start */ }
var SAMPLE_CSS = "\n    .bootstrap5 tr.e-row, .bootstrap5-dark tr.e-row, .tailwind tr.e-row, .tailwind-dark tr.e-row{\n        height:39px;\n    }\n    ";
{ /* custom code end */ }
var FrozenColumn = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, frozenColumns: 2, allowSelection: false, allowResizing: true, allowSorting: true, childMapping: "subtasks", treeColumnIndex: 1, height: "410" },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "100", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "260" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "230", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "endDate", headerText: "End Date", width: "230", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "210", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "210", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "230" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "approved", headerText: "Approved", textAlign: "Center", width: "230" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Freeze, ej2_react_treegrid_1.Resize, ej2_react_treegrid_1.Sort] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the frozen columns feature of the Tree Grid. Scroll the movable content horizontally to view the frozen columns with the content.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The freezing feature enables the user to freeze certain columns to scroll remaining movable content. This can be achieved by setting",
                " ",
                React.createElement("b", null, "frozenColumns"),
                " property."),
            React.createElement("p", null,
                "Note: In this demo sample, the first two columns is set to frozen by using the",
                " ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/column/#frozencolumns" }, "frozenColumns")),
                " ",
                "properties."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use frozen columns feature, we need to inject",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/treegrid/frozenrowsandcolumns" },
                        " ",
                        "Freeze",
                        " "),
                    " "),
                " ",
                "module into the ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = FrozenColumn;
