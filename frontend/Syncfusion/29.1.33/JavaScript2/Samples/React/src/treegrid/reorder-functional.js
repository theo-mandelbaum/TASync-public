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
var Reorders = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var dropdownObj = (0, react_1.useRef)(null);
    var dropdownObj2 = (0, react_1.useRef)(null);
    var columnNames = [
        { id: "taskID", name: "Task ID" },
        { id: "taskName", name: "Task Name" },
        { id: "startDate", name: "Start Date" },
        { id: "duration", name: "Duration" },
        { id: "progress", name: "Progress" },
    ];
    var columnsIndex = [
        { id: "0", name: "1" },
        { id: "1", name: "2" },
        { id: "2", name: "3" },
        { id: "3", name: "4" },
        { id: "4", name: "5" },
    ];
    var change = function (args) {
        var columnName = args.value.toString();
        var index = treegridObj.current.getColumnIndexByField(columnName);
        dropdownObj2.current.value = index.toString();
    };
    var change2 = function (args) {
        var columnName = dropdownObj.current.value.toString();
        var toColumnIndex = args.value;
        var column = treegridObj.current.columns[toColumnIndex];
        treegridObj.current.reorderColumns(columnName, column.field);
    };
    var actionComplete = function (args) {
        if (args.requestType === "reorder") {
            var columnName = dropdownObj.current.value;
            var index = treegridObj.current.getColumnIndexByField(columnName);
            dropdownObj2.current.value = index.toString();
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, allowPaging: true, childMapping: "subtasks", height: "350", allowReordering: true, pageSettings: { pageCount: 4, pageSize: 11 }, ref: treegridObj, actionComplete: actionComplete.bind(_this) },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "105", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "80", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "80", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Reorder] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: "10px" } }, " Column ")),
                                React.createElement("td", { style: { width: "70%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "140px", id: "columns", change: change.bind(_this), dataSource: columnNames, fields: { text: "name", value: "id" }, value: "taskID", ref: dropdownObj })))),
                            React.createElement("tr", { style: { height: "50px" } },
                                React.createElement("td", null,
                                    React.createElement("div", null, " Column Index ")),
                                React.createElement("td", { style: { width: "70%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "140px", id: "columnindex", change: change2.bind(_this), dataSource: columnsIndex, fields: { text: "name", value: "id" }, value: "0", ref: dropdownObj2 })))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates reordering feature of the Tree Grid columns.You can reorder columns by simply drag and drop in the desired column position. You can also reorder columns by simply drag and drop in the desired column position.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Reordering can be enabled by setting ",
                    React.createElement("code", null, "allowReordering"),
                    " ",
                    "property as true. Reordering can be done by drag and drop the column header from one index to another index within the Tree Grid. The location in which the column to be placed, will be indicated by two arrows symbols"),
                React.createElement("p", null, "In this demo, you can reorder columns by drag and drop."),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "Tree Grid features are segregated into individual feature-wise modules. To use reordering feature, we need to inject",
                    " ",
                    React.createElement("code", null, "Reorder"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information about Column Reorder can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/columns/column-reorder" }, "documentation section"),
                    ".")))));
};
exports.default = Reorders;
