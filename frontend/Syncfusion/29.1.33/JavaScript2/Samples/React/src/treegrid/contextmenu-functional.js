"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var TreeContextMenu = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Row",
    };
    var contextMenuItems = [
        "AutoFit",
        "AutoFitAll",
        "SortAscending",
        "SortDescending",
        "Edit",
        "Delete",
        "Save",
        "Cancel",
        "PdfExport",
        "ExcelExport",
        "CsvExport",
        "FirstPage",
        "PrevPage",
        "LastPage",
        "NextPage",
        "Indent",
        "Outdent",
    ];
    var validationRule = { required: true };
    var validationRule1 = { date: true };
    var validationRule2 = { required: true, number: true };
    var editparams2 = { params: { format: "n" } };
    var editparams = { params: { popupHeight: "300px" } };
    var pageSettings = { pageSize: 11 };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, editSettings: editSettings, pageSettings: pageSettings, contextMenuItems: contextMenuItems, allowSorting: true, allowExcelExport: true, allowPdfExport: true, allowResizing: true },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right", validationRules: validationRule, isPrimaryKey: true }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "180", validationRules: validationRule }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "130", textAlign: "Right", editType: "datepickeredit", type: "date", format: "yMd", validationRules: validationRule1 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "endDate", headerText: "End Date", width: "130", textAlign: "Right", editType: "datepickeredit", type: "date", format: "yMd", validationRules: validationRule1 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "130", minWidth: "120", editType: "numericedit", textAlign: "Right", validationRules: validationRule2, edit: editparams2 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "120", textAlign: "Right", editType: "dropdownedit", edit: editparams }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "120" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [
                        ej2_react_treegrid_1.Page,
                        ej2_react_treegrid_1.Edit,
                        ej2_react_treegrid_1.Toolbar,
                        ej2_react_treegrid_1.ContextMenu,
                        ej2_react_treegrid_1.Sort,
                        ej2_react_treegrid_1.Resize,
                        ej2_react_treegrid_1.ExcelExport,
                        ej2_react_treegrid_1.PdfExport,
                        ej2_react_treegrid_1.RowDD,
                    ] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the usage of context menu in Tree Grid component. Right click anywhere on the Grid to view context menu.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Tree Grid has an option to show the context menu when right click on it. To configure the items in context menu, you should define either default or custom item in ",
                React.createElement("code", null, "contextMenuItems"),
                ".Each item will be shown based on its target. The default items are"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Edit"),
                    " - Edit the current record."),
                React.createElement("li", null,
                    React.createElement("code", null, "Delete"),
                    " - Delete the current record."),
                React.createElement("li", null,
                    React.createElement("code", null, "Save"),
                    " - Save the edited record."),
                React.createElement("li", null,
                    React.createElement("code", null, "Cancel"),
                    " - Cancel the edited state."),
                React.createElement("li", null,
                    React.createElement("code", null, "PdfExport"),
                    " - Export the grid as Pdf format."),
                React.createElement("li", null,
                    React.createElement("code", null, "ExcelExport"),
                    " - Export the grid as Excel format."),
                React.createElement("li", null,
                    React.createElement("code", null, "CsvExport"),
                    " - Export the grid as CSV format."),
                React.createElement("li", null,
                    React.createElement("code", null, "SortAscending"),
                    " - Sort the current column in ascending order."),
                React.createElement("li", null,
                    React.createElement("code", null, "SortDescending"),
                    " - Sort the current column in descending order."),
                React.createElement("li", null,
                    React.createElement("code", null, "FirstPage"),
                    " - Go to the first page."),
                React.createElement("li", null,
                    React.createElement("code", null, "PrevPage"),
                    " - Go to the previous page."),
                React.createElement("li", null,
                    React.createElement("code", null, "LastPage"),
                    " - Go to the last page."),
                React.createElement("li", null,
                    React.createElement("code", null, "NextPage"),
                    " - Go to the next page."),
                React.createElement("li", null,
                    React.createElement("code", null, "Add Row"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "Above"),
                            " - Add a new row above the selected row"),
                        React.createElement("li", null,
                            React.createElement("code", null, "Below"),
                            " - Add a new row below the selected row"))),
                React.createElement("li", null,
                    React.createElement("code", null, "Indent"),
                    " - Indents the record to one level of hierarchy."),
                React.createElement("li", null,
                    React.createElement("code", null, "Outdent"),
                    " - Outdent the record to one level of hierarchy.")),
            React.createElement("p", null,
                "In this demo, Context Menu feature has enabled by defining the",
                " ",
                React.createElement("code", null, "contextMenuItems"),
                " property with all default items."),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use context menu feature, we need to inject",
                " ",
                React.createElement("code", null, "ContextMenu"),
                " module into the ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = TreeContextMenu;
