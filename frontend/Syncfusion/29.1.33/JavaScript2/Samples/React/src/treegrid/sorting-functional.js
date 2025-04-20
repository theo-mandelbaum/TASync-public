"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Sorting = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var orderNameObj = (0, react_1.useRef)(null);
    var categoryObj = (0, react_1.useRef)(null);
    var orderDateObj = (0, react_1.useRef)(null);
    var unitsObj = (0, react_1.useRef)(null);
    var sortingOptions = {
        columns: [
            { field: "Category", direction: "Ascending" },
            { field: "orderName", direction: "Ascending" },
        ],
    };
    var orderNameChange = function (args) {
        if (args.checked) {
            treegridObj.current.sortByColumn("orderName", "Ascending", true);
        }
        else {
            treegridObj.current.grid.removeSortColumn("orderName");
        }
    };
    var categoryChange = function (args) {
        if (args.checked) {
            treegridObj.current.sortByColumn("Category", "Ascending", true);
        }
        else {
            treegridObj.current.grid.removeSortColumn("Category");
        }
    };
    var orderDateChange = function (args) {
        if (args.checked) {
            treegridObj.current.sortByColumn("orderDate", "Ascending", true);
        }
        else {
            treegridObj.current.grid.removeSortColumn("orderDate");
        }
    };
    var unitsChange = function (args) {
        if (args.checked) {
            treegridObj.current.sortByColumn("units", "Ascending", true);
        }
        else {
            treegridObj.current.grid.removeSortColumn("units");
        }
    };
    var sort = function (args) {
        if (args.requestType === "sorting") {
            for (var _i = 0, _a = treegridObj.current.getColumns(); _i < _a.length; _i++) {
                var columns = _a[_i];
                for (var _b = 0, _c = treegridObj.current.sortSettings.columns; _b < _c.length; _b++) {
                    var sortcolumns = _c[_b];
                    if (sortcolumns.field === columns.field) {
                        check(sortcolumns.field, true);
                        break;
                    }
                    else {
                        check(columns.field, false);
                    }
                }
            }
        }
    };
    var check = function (field, state) {
        switch (field) {
            case "orderName":
                orderNameObj.current.checked = state;
                break;
            case "Category":
                categoryObj.current.checked = state;
                break;
            case "orderDate":
                orderDateObj.current.checked = state;
                break;
            case "units":
                unitsObj.current.checked = state;
                break;
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sortData, treeColumnIndex: 0, childMapping: "subtasks", height: "350", allowPaging: true, allowSorting: true, sortSettings: sortingOptions, ref: treegridObj, actionComplete: sort.bind(_this) },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "orderName", headerText: "Order Name", width: "220" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "Category", headerText: "Category", width: "150" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "orderDate", headerText: "Order Date", width: "130", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "units", headerText: "Units", width: "130", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Sort] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: "70%" } },
                                React.createElement("div", null, " Order Name")),
                            React.createElement("td", { style: { width: "30%", padding: "10px 10px 10px 0px" } },
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: orderNameChange.bind(_this), ref: orderNameObj })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: "70%" } },
                                React.createElement("div", null, " Category ")),
                            React.createElement("td", { style: { width: "30%", padding: "10px 10px 10px 0px" } },
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: categoryChange.bind(_this), ref: categoryObj })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: "70%" } },
                                React.createElement("div", null, " Order Date ")),
                            React.createElement("td", { style: { width: "30%", padding: "10px 10px 10px 0px" } },
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: orderDateChange.bind(_this), ref: orderDateObj })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: "70%" } },
                                React.createElement("div", null, " Units ")),
                            React.createElement("td", { style: { width: "30%", padding: "10px 10px 10px 0px" } },
                                React.createElement("div", { className: "col-md-6" },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: unitsChange.bind(_this), ref: unitsObj }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Tree Grid multi sorting feature. To sort two or more columns, hold the CTRL key and click the column header.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Sorting feature enables us to order the data in a particular direction. It can be enabled by setting the",
                    " ",
                    React.createElement("code", null, "allowSorting"),
                    " as true."),
                React.createElement("p", { className: "e-grid", style: { border: "none" } },
                    "To sort a Tree Grid column by simply click the column header. The icons ",
                    React.createElement("span", { className: "e-icons e-icon-ascending" }),
                    "(ascending) and ",
                    React.createElement("span", { className: "e-icons e-icon-descending" }),
                    "(descending) specifies the sort direction of a column."),
                React.createElement("p", null,
                    "By default, multi-sorting is enabled in Tree Grid, to sort multiple column hold ",
                    React.createElement("strong", null, "CTRL"),
                    " key and click the column header. To clear sort for a column, hold ",
                    React.createElement("strong", null, "SHIFT"),
                    " key and click the column header."),
                React.createElement("p", null,
                    " ",
                    "While using Tree Grid in a touch device, you have an option for multi sorting in single tap on the Tree Grid header. By tapping on the Tree Grid header, it will show the toggle button in small popup with sort icon. Now tap the button to enable the multi-sorting in single tap."),
                React.createElement("p", null, "In this demo, "),
                React.createElement("ul", null,
                    React.createElement("li", null, "Simply click the column header to sort a column."),
                    React.createElement("li", null, "Check the checkboxes in the properties panel to sort a column and uncheck to remove sort from a column.")),
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
                    ".")))));
};
exports.default = Sorting;
