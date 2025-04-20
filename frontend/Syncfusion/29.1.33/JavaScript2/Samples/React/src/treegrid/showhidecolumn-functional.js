"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var SAMPLE_CSS = "\n.fluent2 .btn,\n.fluent2-dark .btn,\n.fluent2-highcontrast .btn{\n  outline: none !important;\n}\n   @media (min-width: 990px) and (max-width: 1300px){\n  .column-property {\n  padding-left:5px;\n  }\n  }";
var ShowHideColumn = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        document.getElementById("hide").addEventListener("click", btnClick);
        document.getElementById("show").addEventListener("click", showClick);
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var dropdownObj = (0, react_1.useRef)(null);
    var button1 = (0, react_1.useRef)(null);
    var button2 = (0, react_1.useRef)(null);
    var columnsName = [
        { id: "taskID", name: "Task ID" },
        { id: "duration", name: "Duration" },
        { id: "startDate", name: "Start Date" },
        { id: "progress", name: "Progress" },
    ];
    var btnClick = function () {
        var columnName = dropdownObj.current.value.toString();
        var column = treegridObj.current.getColumnByField(columnName);
        if (treegridObj.current.getHeaderTable().querySelectorAll("th.e-hide")
            .length === 3) {
            alert("Atleast one Column should be visible");
        }
        else {
            treegridObj.current.grid.hideColumns(column.headerText, "headerText");
            var hiddenColumns = document.getElementById("hiddencolumns");
            button1.current.disabled = true;
            button2.current.disabled = false;
            hiddenColumns.value = hiddenColumns.value + column.headerText + "\n";
        }
    };
    var showClick = function () {
        var columnName = dropdownObj.current.value.toString();
        var column = treegridObj.current.getColumnByField(columnName);
        treegridObj.current.grid.showColumns(column.headerText, "headerText");
        var hiddenColumns = document.getElementById("hiddencolumns");
        button2.current.disabled = true;
        button1.current.disabled = false;
        hiddenColumns.value = hiddenColumns.value.replace(column.headerText + "\n", "");
    };
    var change = function (e) {
        var columnName = e.value;
        var column = treegridObj.current.getColumnByField(columnName);
        if (column.visible === undefined || column.visible) {
            button2.current.disabled = true;
            button1.current.disabled = false;
        }
        else {
            button1.current.disabled = true;
            button2.current.disabled = false;
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, ref: treegridObj, pageSettings: { pageSize: 10 } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "100", type: "date", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { className: "col-md-3 property-section column-property" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, " Column ")),
                                React.createElement("td", { style: { width: "70%", paddingRight: "10px" } },
                                    React.createElement("div", { id: "columnddl" },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "132px", id: "ddlelement", dataSource: columnsName, fields: { text: "name", value: "id" }, change: change.bind(_this), value: "taskID", ref: dropdownObj })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "hide", ref: button1 },
                                            " ",
                                            "Hide",
                                            " "))),
                                React.createElement("td", { style: { width: "70%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "show", ref: button2 },
                                            " ",
                                            "Show",
                                            " ")))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { paddingTop: "10px" } }, " Hidden Columns")),
                                React.createElement("td", { style: { width: "70%", padding: "10px 10px 10px 0px" } },
                                    React.createElement("div", null,
                                        React.createElement("textarea", { id: "hiddencolumns", style: {
                                                resize: "none",
                                                height: "65px",
                                                width: "100%",
                                                backgroundColor: "#fff",
                                                padding: "6px",
                                            }, className: "form-control" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the text alignment functionalities of the Tree Grid columns.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Tree Grid column can be showed/hidden dynamically using",
                " ",
                React.createElement("code", null, "showColumns"),
                " and ",
                React.createElement("code", null, "hideColumns"),
                " method of the Grid."),
            React.createElement("p", null,
                "In this demo, the columns can be showed and hidden by selecting the column name in the dropdown and click the Show or Hide buttons to toggle visibility. And the columns visibility is toggled based on the",
                React.createElement("code", null, "columns->headerText"),
                " value."),
            React.createElement("br", null),
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "columns->visible"),
                " property specifies the visibility of a column. To hide a column at the initial rendering, set the",
                " ",
                React.createElement("code", null, "columns->visible"),
                " property to false."))));
};
exports.default = ShowHideColumn;
