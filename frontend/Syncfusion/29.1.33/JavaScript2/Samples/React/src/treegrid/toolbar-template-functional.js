"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ToolbarTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var toolbarOptions = [
        "ExpandAll",
        "CollapseAll",
        { text: "Quick Filter", tooltipText: "Quick Filter", id: "filter" },
    ];
    var toolbarClick = function (args) {
        if (args.item.id === "filter") {
            treegridObj.current.filterByColumn("taskName", "startswith", "Testing");
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", null,
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.treesampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, allowFiltering: true, toolbar: toolbarOptions, ref: treegridObj, toolbarClick: toolbarClick.bind(_this), filterSettings: { type: "Menu" }, pageSettings: { pageSize: 11 } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "130" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "90", format: "yMd", type: "date", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "90" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Filter, ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.Page] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample explains the way of rendering custom template element",
                " ",
                React.createElement("code", null, "Quick Filter"),
                " in a toolbar and while click on the icon filters the ",
                React.createElement("code", null, "Task Name"),
                " column in Tree Grid using API")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Custom toolbar items can be added by defining the toolbar as a collection of ItemModels. Actions for this customized toolbar items are defined in the toolbarClick event."),
            React.createElement("p", null,
                "In this sample, rendered the custom template element",
                " ",
                React.createElement("code", null, "Quick Filter"),
                " along with predefined toolbar items ExpandAll and CollapseAll. While click on the",
                " ",
                React.createElement("code", null, "Quick Filter"),
                " button then the filtering is performed for",
                React.createElement("code", null, "Task Name"),
                " column."),
            React.createElement("p", null,
                "More information about Toolbar template can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/tool-bar/tool-bar" }, "documentation section"),
                "."))));
};
exports.default = ToolbarTemplate;
