"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
require("./sample.css");
var sample_base_1 = require("../common/sample-base");
var RowHeight = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var toolbarOptions = [
        {
            prefixIcon: "e-big-icon",
            id: "small",
            align: "Left",
            tooltipText: "Small",
        },
        {
            prefixIcon: "e-medium-icon",
            id: "medium",
            align: "Left",
            tooltipText: "Medium",
        },
        {
            prefixIcon: "e-small-icon",
            id: "big",
            align: "Left",
            tooltipText: "Large",
        },
    ];
    var toolbarClick = function (args) {
        if (args.item.id === "small") {
            treegridObj.current.rowHeight = 20;
        }
        if (args.item.id === "medium") {
            treegridObj.current.rowHeight = 40;
        }
        if (args.item.id === "big") {
            treegridObj.current.rowHeight = 60;
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", rowHeight: 20, toolbar: toolbarOptions, ref: treegridObj, toolbarClick: toolbarClick.bind(_this) },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "70", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "90", format: "yMd", type: "date", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "endDate", headerText: "End Date", width: "90", format: "yMd", type: "date", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "80", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "progress", width: "80", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "90" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the row height feature of the Tree Grid. In this demo, the rowHeight for all the Tree Grid rows can be changed as 20px, 40px and 60px through ToolBar button click.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Tree Grid has provide an option to customize the row height by using",
                " ",
                React.createElement("code", null, "rowHeight"),
                " property of Tree Grid."),
            React.createElement("p", null, "In this sample, we have enabled an option in Toolbar to customize the row height of Tree Grid to 20px, 40px and 60px."))));
};
exports.default = RowHeight;
