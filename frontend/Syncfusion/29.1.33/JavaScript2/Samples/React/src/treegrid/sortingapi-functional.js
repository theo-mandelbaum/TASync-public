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
var SAMPLE_CSS = "\n@media (min-width: 990px) and (max-width: 1300px) {\n  .property-panel-section{\n    padding-left:0px;\n  }\n}";
var SortingAPI = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var columnName = (0, react_1.useRef)(null);
    var sortDirection = (0, react_1.useRef)(null);
    var columnsName = [
        { id: "taskID", name: "Task ID" },
        { id: "taskName", name: "Task Name" },
        { id: "duration", name: "Duration" },
        { id: "progress", name: "Progress" },
    ];
    var direction = [
        { id: "Ascending", name: "Ascending" },
        { id: "Descending", name: "Descending" },
    ];
    var btnClick = function () {
        var columnNam = columnName.current.value;
        var sortType = sortDirection.current.value;
        treegridObj.current.sortByColumn(columnNam, sortType, false);
    };
    var btnClick2 = function () {
        treegridObj.current.clearSorting();
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "410", ref: treegridObj, allowSorting: true },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "160" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Sort] }))),
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, " Column ")),
                                React.createElement("td", { style: { width: "80%", paddingRight: "10px" } },
                                    React.createElement("div", { style: { paddingLeft: '8px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "146px", id: "columns", ref: columnName, dataSource: columnsName, fields: { text: "name", value: "id" }, value: "taskID" })))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, " Direction ")),
                                React.createElement("td", { style: { width: "80%", paddingRight: "10px" } },
                                    React.createElement("div", { style: { paddingLeft: '8px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "146px", id: "direction", ref: sortDirection, dataSource: direction, fields: { text: "name", value: "id" }, value: "Ascending" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { colSpan: 2, style: { paddingTop: '10%', paddingLeft: '10px' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { style: { marginRight: '10px' }, onClick: btnClick.bind(_this) }, "Sort"),
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: btnClick2.bind(_this) }, "Clear")))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "Sorting feature enables us to order the data in a particular direction. It can be enabled by setting the allowSorting as true.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Sorting feature enables us to order the data in a particular direction. It can be enabled by setting the ",
                React.createElement("code", null, "allowSorting"),
                " ",
                "as true."),
            React.createElement("p", { className: "e-treegrid", style: { border: "none" } },
                "To sort a Tree Grid column simply click the column header. The icons",
                " ",
                React.createElement("span", { className: "e-icons e-icon-ascending" }),
                "(ascending) and",
                " ",
                React.createElement("span", { className: "e-icons e-icon-descending" }),
                "(descending) specifies the sort direction of a column."),
            React.createElement("p", null,
                "By default, multi-sorting is enabled in Tree Grid, to sort multiple column hold ",
                React.createElement("strong", null, "CTRL"),
                " key and click the column header. To clear sort for a column, hold ",
                React.createElement("strong", null, "SHIFT"),
                " key and click the column header."),
            React.createElement("p", null, "While using Tree Grid in a touch device, you have an option for multi sorting in single tap on the Tree Grid header. By tapping on the Tree Grid header, it will show the toggle button in small popup with sort icon. Now tap the button to enable the multi-sorting in single tap."),
            React.createElement("p", null, "In this demo, select the column and direction from the properties panel then click the Sort button. Use the Clear button to remove sort for the selected column."),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use sorting feature, we need to inject",
                React.createElement("code", null, "Sort"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the sorting feature configuration can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/sorting" }, "documentation section"),
                "."))));
};
exports.default = SortingAPI;
