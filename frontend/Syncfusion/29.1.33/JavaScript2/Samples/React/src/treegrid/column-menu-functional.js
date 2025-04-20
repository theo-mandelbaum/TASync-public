"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var TreeGridColumnMenu = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, pageSettings: { pageSize: 10 }, allowSorting: true, allowFiltering: true, showColumnMenu: true, filterSettings: { type: "Menu" } },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "100", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "150" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "90", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "80", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "80", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "80" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.ColumnMenu, ej2_react_treegrid_1.Sort, ej2_react_treegrid_1.Resize, ej2_react_treegrid_1.Filter] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the Column Menu. Click on multiple icon of each column to open the column menu.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Tree Grid has an option to show column menu while click on multiple icon of each column. The column menu has an integrated option to interact the features like sorting, filtering, column chooser and and autoFit. This features can be enabled by defining the",
                " ",
                React.createElement("code", null, "showColumnMenu"),
                " as true. The default items are"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "SortAscending"),
                    " - Sort the current column in ascending order."),
                React.createElement("li", null,
                    React.createElement("code", null, "SortDescending"),
                    " - Sort the current column in descending order."),
                React.createElement("li", null,
                    React.createElement("code", null, "AutoFit"),
                    " - Auto fit current column."),
                React.createElement("li", null,
                    React.createElement("code", null, "AutoFitAll"),
                    " - Auto fit all columns."),
                React.createElement("li", null,
                    React.createElement("code", null, "ColumnChooser"),
                    " - Choose the column visibility."),
                React.createElement("li", null,
                    React.createElement("code", null, "Filter"),
                    " - Filter option is shown to filter the current column.")),
            React.createElement("p", null,
                "In this demo, Column Menu feature has enabled by defining",
                " ",
                React.createElement("code", null, "showColumnMenu"),
                " as true with sorting, filtering, column chooser and autoFit options."),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use column menu feature, we need to inject",
                React.createElement("code", null, "ColumnMenu"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information about Column Menu can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/columns/column-menu" }, "documentation section"),
                "."))));
};
exports.default = TreeGridColumnMenu;
