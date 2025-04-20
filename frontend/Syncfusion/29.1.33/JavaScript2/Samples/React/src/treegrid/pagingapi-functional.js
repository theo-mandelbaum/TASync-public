"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var data_1 = require("./data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var PagingAPI = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegridObj = (0, react_1.useRef)(null);
    var sizemodeObj = (0, react_1.useRef)(null);
    var pageSizeObj = (0, react_1.useRef)(null);
    var pageCountObj = (0, react_1.useRef)(null);
    var currentPageObj = (0, react_1.useRef)(null);
    var onChange = function (args) {
        treegridObj.current.allowPaging = args.checked;
        toggleInputs(treegridObj.current.allowPaging, true);
    };
    var changeNum = function () {
        pageSizeObj.current.value =
            pageSizeObj.current.value >
                treegridObj.current.pageSettings.totalRecordsCount
                ? treegridObj.current.pageSettings.totalRecordsCount
                : pageSizeObj.current.value;
        treegridObj.current.pageSettings.pageSize = pageSizeObj.current.value;
        currentPageObj.current.max = Math.ceil(treegridObj.current.pageSettings.totalRecordsCount /
            treegridObj.current.pageSettings.pageSize);
    };
    var countChange = function () {
        pageCountObj.current.value =
            pageCountObj.current.value > 8 ? 8 : pageCountObj.current.value;
        treegridObj.current.pageSettings.pageCount = pageCountObj.current.value;
    };
    var currentPageChange = function () {
        currentPageObj.current.value =
            currentPageObj.current.value > currentPageObj.current.max
                ? currentPageObj.current.max
                : currentPageObj.current.value;
        var pageNumber = currentPageObj.current.value;
        treegridObj.current.goToPage(pageNumber);
    };
    var change = function (args) {
        var type = (0, ej2_react_grids_1.getObject)("value", args);
        if (type === "Root") {
            treegridObj.current.pageSettings = { pageSizeMode: "Root", pageSize: 2 };
        }
        else {
            treegridObj.current.pageSettings = {
                pageSizeMode: "All",
                pageSize: pageSizeObj.current.value,
            };
        }
        toggleInputs(type === "All");
    };
    var toggleInputs = function (state, isPager) {
        if (!(0, ej2_base_1.isNullOrUndefined)(isPager)) {
            var element = document.getElementsByClassName("con-prop1")[0];
            element.style.display = state ? "table-row" : "none";
        }
        var flag = sizemodeObj.current.value === "All";
        var elem = document.getElementsByClassName("con-prop2");
        for (var i = 0; i < elem.length; i++) {
            var element = elem[i];
            element.style.display = state && flag ? "table-row" : "none";
        }
    };
    var type = [
        { id: "All", type: "All" },
        { id: "Root", type: "Root" },
    ];
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-md-9" },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, ref: treegridObj, pageSettings: { pageCount: 2 } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "100", type: "date", format: "yMd", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "progress", width: "90", textAlign: "Right" })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { className: "col-md-3 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table", style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "60%" } },
                                    React.createElement("div", null, " Allow Paging ")),
                                React.createElement("td", { style: { width: "60%" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: onChange.bind(_this) })))),
                            React.createElement("tr", { className: "con-prop1" },
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { style: { paddingTop: "7px" } }, " Page Size Mode ")),
                                React.createElement("td", { style: { width: "50%", paddingTop: "10px 10px 10px 0px" } },
                                    React.createElement("div", { id: "dropdown" },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "115px", id: "sizemode", change: change.bind(_this), dataSource: type, fields: { text: "type", value: "id" }, value: "All", ref: sizemodeObj })))),
                            React.createElement("tr", { className: "con-prop2" },
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { style: { paddingTop: "7px" } }, " Page Size ")),
                                React.createElement("td", { style: { width: "50%", paddingTop: "10px 10px 10px 0px" } },
                                    React.createElement("div", { id: "numericbox" },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "pagesize", format: "##", min: 1, max: 200, value: 12, width: "115px", ref: pageSizeObj, change: changeNum.bind(_this) })))),
                            React.createElement("tr", { className: "con-prop2" },
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { style: { paddingTop: "7px" } }, " Page Count ")),
                                React.createElement("td", { style: { width: "50%", paddingTop: "10px 10px 10px 0px" } },
                                    React.createElement("div", { id: "numericbox" },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "pagecount", format: "##", min: 1, max: 4, value: 2, width: "115px", ref: pageCountObj, change: countChange.bind(_this) })))),
                            React.createElement("tr", { className: "con-prop2" },
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { style: { paddingTop: "7px" } }, " Current Page ")),
                                React.createElement("td", { style: { width: "50%", paddingTop: "10px 10px 10px 0px" } },
                                    React.createElement("div", { id: "numericbox" },
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "currentpage", format: "##", min: 1, max: 17, value: 1, width: "115px", ref: currentPageObj, change: currentPageChange.bind(_this) }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the usage of paging API in Tree Grid. In this sample, use the properties panel to change the page size mode, page size, page count and current page of the Tree Grid.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Paging allows you to display the contents of the Tree Grid in page segments. The number of items on a page is determined by the",
                " ",
                React.createElement("code", null, "pageSettings->pageSize"),
                " property. If no value is specified for the ",
                React.createElement("code", null, "pageSettings->pageSize"),
                " property, the Tree Grid will display 12 items on a page. By default, paging is disabled. To enable paging, set ",
                React.createElement("code", null, "allowPaging"),
                " property to true."),
            React.createElement("p", null, "In this demo,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Click the ",
                    React.createElement("strong", null, "Allow Paging"),
                    " check box to enable/disable paging feature."),
                React.createElement("li", null,
                    "Change the value of ",
                    React.createElement("strong", null, "Page Size Mode"),
                    " Dropdown to change ",
                    React.createElement("code", null, "pageSettings->pageSizeMode.")),
                React.createElement("li", null,
                    "Change the value of ",
                    React.createElement("strong", null, "Page Size"),
                    " textbox to change",
                    " ",
                    React.createElement("code", null, "pageSettings->pageSize.")),
                React.createElement("li", null,
                    "Change the value of ",
                    React.createElement("strong", null, "Page Count"),
                    " textbox to change",
                    " ",
                    React.createElement("code", null, "pageSettings->pageCount.")),
                React.createElement("li", null,
                    "Change the value of ",
                    React.createElement("strong", null, "Current Page"),
                    " textbox to change",
                    React.createElement("code", null, " pageSettings->currentPage."))),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use paging feature, we need to inject",
                React.createElement("code", null, "Page"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the paging configuration can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/paging" }, "documentation section"),
                "."))));
};
exports.default = PagingAPI;
