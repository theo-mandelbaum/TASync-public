"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .e-bigger .e-treegrid .e-treegridexpand,\n    .e-bigger .e-treegrid .e-treegridcollapse {\n        width: 18px;\n    }";
var AutoWrap = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.textWrapData, treeColumnIndex: 1, allowPaging: true, childMapping: "subtasks", allowTextWrap: true, pageSettings: { pageSize: 11 } },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "98" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "90", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "90" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Tree Grid component with the auto wrap column cell feature. In this sample, you can see that Task Name column cell content exceeded the available width hence it has been wrapped into multiple lines.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Auto wrap cell content can be enabled using ",
                React.createElement("code", null, "allowTextWrap"),
                " ",
                "property of the Tree Grid. Setting this property will wrap cell text on multiple lines.This feature is useful to view the cell content when it exceeds the cell width."),
            React.createElement("p", null, "Setting this property will wrap the text in both content cell and header cell."),
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null, "allowTextWrap"),
                " property is enabled, and you can also see that the Task Name column whose content exceeded the cell width is wrapped into multiple lines."),
            React.createElement("p", null,
                "More information about Auto wrap cells can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/cell/auto-wrap" }, "documentation section"),
                "."))));
};
exports.default = AutoWrap;
