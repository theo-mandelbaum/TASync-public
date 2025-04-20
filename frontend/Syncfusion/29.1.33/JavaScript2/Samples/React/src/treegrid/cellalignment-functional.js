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
var SAMPLE_CSS = "\n.fluent2,\n.fluent2-dark,\n.fluent2-highcontrast {\n  .property-section #columns {\n    width: 95px;\n  }\n}\n @media (min-width: 990px) and (max-width: 1300px){\n .cellalignment {\n      padding-left:0px;\n    }\n} ";
var CellAlign = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var dropdownObj = (0, react_1.useRef)(null);
    var dropdownObj2 = (0, react_1.useRef)(null);
    var columnNames = [
        { id: "taskID", name: "Task ID" },
        { id: "duration", name: "Duration" },
        { id: "startDate", name: "Start Date" },
        { id: "progress", name: "Progress" },
    ];
    var alignment = [
        { id: "Right", name: "Right" },
        { id: "Left", name: "Left" },
        { id: "Center", name: "Center" },
        { id: "Justify", name: "Justify" },
    ];
    var change = function (args) {
        var columnName = args.value.toString();
        var alignment = treegridObj.current.getColumnByField(columnName).textAlign;
        dropdownObj2.current.value = alignment;
    };
    var change2 = function (args) {
        var alignment = args.value;
        var columnName = dropdownObj.current.value.toString();
        treegridObj.current.getColumnByField(columnName).textAlign = alignment;
        treegridObj.current.refreshColumns();
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, ref: treegridObj, pageSettings: { pageSize: 10 } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "100", type: "date", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { className: "col-md-3 property-section cellalignment" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: "10px" } }, " Column ")),
                                React.createElement("td", { style: { width: "70%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "133px", id: "columns", change: change.bind(_this), dataSource: columnNames, fields: { text: "name", value: "id" }, value: "taskID", ref: dropdownObj })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", null, " Cell Alignment ")),
                                React.createElement("td", { style: { width: "70%", padding: "10px 10px 10px 0px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "133px", id: "alignment", change: change2.bind(_this), dataSource: alignment, fields: { text: "name", value: "id" }, value: "Right", ref: dropdownObj2 }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the text alignment functionalities of the Tree Grid columns.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Align both content and header text of particular column using the",
                " ",
                React.createElement("code", null, "textAlign"),
                " property of columns. There are four possible ways to align content and header text of column, they are."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Right")),
                React.createElement("li", null,
                    React.createElement("code", null, "Left")),
                React.createElement("li", null,
                    React.createElement("code", null, "Center")),
                React.createElement("li", null,
                    React.createElement("code", null, "Justify"))),
            React.createElement("p", null,
                "In this sample, we have initially set the ",
                React.createElement("code", null, "textAlign"),
                " ",
                "property as \u201CRight\u201D for Task ID, Start Date, Duration and Progress columns and also we have an option to align the values of content and header text dynamically by select the column and text align value from property panel."),
            React.createElement("p", null, "More information about Cell Alignment can be found in this documentation section."))));
};
exports.default = CellAlign;
