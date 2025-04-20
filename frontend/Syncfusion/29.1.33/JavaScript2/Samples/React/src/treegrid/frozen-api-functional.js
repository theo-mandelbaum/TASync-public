"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var FrozenAPI = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var treegrid = (0, react_1.useRef)(null);
    var freezeDropDown = (0, react_1.useRef)(null);
    var columnDropDown = (0, react_1.useRef)(null);
    var alertDialogInstance = (0, react_1.useRef)(null);
    var refresh = true;
    var columnNames = [
        { id: "taskID", name: "Task ID" },
        { id: "taskName", name: "TaskName" },
        { id: "startDate", name: "Start Date" },
        { id: "endDate", name: "End Date" },
        { id: "duration", name: "Duration" },
        { id: "progress", name: "Progress" },
        { id: "priority", name: "Priority" },
        { id: "designation", name: "Designation" },
        { id: "employeeID", name: "EmployeeID" },
        { id: "approved", name: "Approved" },
    ];
    var directions = [
        { id: "Left", name: "Left" },
        { id: "Right", name: "Right" },
        { id: "Center", name: "Center" },
    ];
    var fields = { text: "name", value: "id" };
    var directionChange = function (e) {
        if (refresh) {
            var columnName_1 = columnDropDown.current.value;
            var mvblColumns = treegrid.current.getMovableColumns();
            if (mvblColumns.length === 1 &&
                columnName_1 === mvblColumns[0].field &&
                e.value !== mvblColumns[0].freeze) {
                alertDialogInstance.current.show();
                refresh = false;
                freezeDropDown.current.value = "Center";
                freezeDropDown.current.refresh();
            }
            else {
                var columns = treegrid.current.getColumns();
                var column = columns.find(function (col) { return col.field === columnName_1; });
                if (column) {
                    column.freeze = e.value === 'Center' ? undefined : e.value;
                }
                treegrid.current.columns = columns;
            }
        }
        refresh = true;
    };
    var columnChange = function (e) {
        var columnName = e.value;
        var column = treegrid.current.getColumnByField(columnName);
        var value = column.freeze === undefined ? "Center" : column.freeze;
        refresh = freezeDropDown.current.value === value;
        freezeDropDown.current.value = value;
    };
    var confirmButton = [
        {
            click: function () {
                alertDialogInstance.current.hide();
            },
            buttonModel: { content: "OK", isPrimary: true },
        },
    ];
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { style: { paddingBottom: "5px" } },
                React.createElement("div", { style: { display: "inline-block", paddingRight: "10px" } },
                    React.createElement("div", { style: { display: "inline-block", paddingRight: "10px" } },
                        React.createElement("span", null, "Column")),
                    React.createElement("div", { style: { display: "inline-block", paddingRight: "10px" } },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "column", dataSource: columnNames, change: columnChange.bind(_this), value: "taskID", fields: fields, ref: columnDropDown }))),
                React.createElement("div", { style: { display: "inline-block", paddingRight: "10px" } },
                    React.createElement("div", { style: { display: "inline-block", paddingRight: "10px" } },
                        React.createElement("span", null, "Freeze Direction")),
                    React.createElement("div", { style: { display: "inline-block", paddingRight: "10px" } },
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "freezedirection", dataSource: directions, value: "Left", change: directionChange.bind(_this), fields: fields, ref: freezeDropDown })))),
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { ref: treegrid, dataSource: data_1.frozenSampleData, childMapping: "subtasks", treeColumnIndex: 1, allowSorting: true, allowSelection: false, height: "410" },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "100", textAlign: "Right", freeze: "Left" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "250" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "130", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "endDate", headerText: "End Date", width: "150", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "130", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "130", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "160", textAlign: "Left" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "designation", headerText: "Designation", width: "190", textAlign: "Left" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "employeeID", headerText: "EmployeeID", width: "120", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "approved", headerText: "Approved", width: "140", displayAsCheckBox: true, textAlign: "Left", freeze: "Right" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Freeze, ej2_react_treegrid_1.Sort] })),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "alertDialog", header: "Frozen", visible: false, animationSettings: { effect: "None" }, width: "300px", content: "Atleast one Column should be in movable", ref: alertDialogInstance, target: ".control-section", buttons: confirmButton, showCloseIcon: false })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the frozen rows and columns feature of the Tree Grid. Scroll the movable content horizontally to view the frozen columns with the content.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The freezing feature enables the user to freeze certain rows/columns at both sides to scroll remaining movable content. This can be achieved by setting",
                " ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/treegrid/scrolling/#frozen-rows-and-columns" }, "freeze")),
                " ",
                "property in column settings."),
            React.createElement("p", null,
                " ",
                "In this demo sample, ",
                React.createElement("b", null, "Task ID"),
                " column is freezed at left side and",
                " ",
                React.createElement("b", null, "Approved"),
                " column is freezed at right side using",
                " ",
                React.createElement("code", null, "Column->freeze"),
                "property."),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                " ",
                "Tree Grid features are segregated into individual feature-wise modules. To use frozen rows and columns feature, we need to inject",
                " ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/treegrid/scrolling/#frozen-rows-and-columns" }, "Freeze")),
                " ",
                "module into the ",
                React.createElement("code", null, "services")))));
};
exports.default = FrozenAPI;
