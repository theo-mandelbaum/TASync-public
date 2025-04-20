"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./header-template.css");
var HeaderTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", null,
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.headerData, treeColumnIndex: 0, childMapping: "subtasks", height: "350", allowPaging: true },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", width: "220", headerTemplate: function () {
                                return (React.createElement("div", null,
                                    React.createElement("img", { src: "src/treegrid/images/__Task name.png", width: "20", height: "20", className: "taskName", alt: "taskName" }),
                                    React.createElement("b", { className: "e-header" }, "Task Name")));
                            } }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", format: "yMd", type: "date", textAlign: "Right", width: "120", headerTemplate: function () {
                                return (React.createElement("div", null,
                                    React.createElement("img", { src: "src/treegrid/images/__Start name.png", width: "20", height: "20", className: "startDate", alt: "startDate" }),
                                    React.createElement("b", { className: "e-header" }, "Start Date")));
                            } }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "resourceId", textAlign: "Right", width: "120", headerTemplate: function () {
                                return (React.createElement("div", null,
                                    React.createElement("img", { src: "src/treegrid/images/__Resources.png", width: "20", height: "20", className: "resources", alt: "resources" }),
                                    React.createElement("b", { className: "e-header" }, "Resources")));
                            } }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", textAlign: "Right", width: "110", headerTemplate: function () {
                                return (React.createElement("div", null,
                                    React.createElement("img", { src: "src/treegrid/images/__Duration.png", width: "20", height: "20", className: "duration", alt: "duration" }),
                                    React.createElement("b", { className: "e-header" }, "Duration")));
                            } }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "progress", textAlign: "Right", width: "150", headerTemplate: function () {
                                return (React.createElement("div", null,
                                    React.createElement("img", { src: "src/treegrid/images/__progress.png", width: "20", height: "20", className: "progress-column", alt: "progress-column" }),
                                    React.createElement("b", { className: "e-header" }, "Progress")));
                            } })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Tree Grid header template feature. In this sample, we have shown custom icons in the column headers.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Tree Grid provides a way to define a custom element in header element. ",
                React.createElement("code", null, "columns->headertemplate"),
                " property accepts either string or HTML element`s ID value, which will be used as the template for the header cell."),
            React.createElement("p", null,
                " ",
                "In this demo, we have render customized template for all column headers."),
            React.createElement("p", null,
                " More information about Header template can be found in ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/columns/column-template/" }, "documentation section"),
                "."))));
};
exports.default = HeaderTemplate;
