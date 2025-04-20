"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var GridLines = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var lines = [
        { id: "Horizontal", type: "Horizontal" },
        { id: "Vertical", type: "Vertical" },
        { id: "Both", type: "Both" },
        { id: "None", type: "None" },
    ];
    var change = function (args) {
        var lines = args.value.toString();
        treegridObj.current.gridLines = lines;
        treegridObj.current.refresh();
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, ref: treegridObj, pageSettings: { pageSize: 10 }, gridLines: "Vertical" },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "100", type: "date", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Grid Lines")),
                                React.createElement("td", { style: { width: "60%" } },
                                    React.createElement("div", { style: { paddingLeft: '15px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "138px", id: "selmode", change: change.bind(_this), dataSource: lines, fields: { text: "type", value: "id" }, value: "Vertical" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates visibility of the Tree Grid lines that separates the rows and columns. In this sample, you can change the gridline from the properties panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "gridLines"),
                " property is used to control the line visibility that separates the rows and columns. Tree Grid allows us to display the following grid lines,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Default"),
                    " - Shows the Horizontal line."),
                React.createElement("li", null,
                    React.createElement("code", null, "None"),
                    " - Shows no line."),
                React.createElement("li", null,
                    React.createElement("code", null, "Both"),
                    " - Shows both Horizontal and Vertical lines."),
                React.createElement("li", null,
                    React.createElement("code", null, "Horizontal"),
                    " - Shows the Horizontal line."),
                React.createElement("li", null,
                    React.createElement("code", null, "Vertical"),
                    " - Shows the Vertical line.")),
            React.createElement("p", null,
                " ",
                "In this demo, you can modify the visibility of gridlines by selecting values in the dropdown."),
            React.createElement("p", null,
                "More information on the gridLines configuration can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/cell/cell#treegrid-lines" }, "documentation section"),
                "."))));
};
exports.default = GridLines;
