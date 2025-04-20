"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var EditType = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
    var editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        showDeleteConfirmDialog: true,
        mode: "Row",
        newRowPosition: "Above",
    };
    var editparams = { params: { popupHeight: "300px" } };
    var validationRule = { required: true };
    var validationRule1 = { date: ['M/d/y hh:mm a', 'Please enter a valid date'] };
    var validationRule2 = { required: true, number: true };
    var editparams2 = { params: { format: "n" } };
    var editparams3 = { params: { format: 'M/d/y hh:mm a' } };
    var pageSettings = { pageCount: 5 };
    var format = { type: "dateTime", format: "M/d/y hh:mm a" };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "400", editSettings: editSettings, pageSettings: pageSettings, toolbar: toolbarOptions },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right", validationRules: validationRule, isPrimaryKey: true }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "150", validationRules: validationRule }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "170", textAlign: "Right", editType: "datetimepickeredit", edit: editparams3, format: format, validationRules: validationRule1 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "150", editType: "numericedit", textAlign: "Right", validationRules: validationRule2, edit: editparams2 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "150", textAlign: "Right", editType: "dropdownedit", edit: editparams }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "150", textAlign: "Right", editType: "dropdownedit", edit: editparams })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the supported cell edit types of Tree Grid columns. The list of cell edit types are as follows,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "NumericTextBox"),
                    " component for integers, double, and decimal data types."),
                React.createElement("li", null,
                    React.createElement("code", null, "TextBox"),
                    " component for string data type."),
                React.createElement("li", null,
                    React.createElement("code", null, "DropDownList"),
                    " component for list data type."),
                React.createElement("li", null,
                    React.createElement("code", null, "DatePicker"),
                    " component for date data type."),
                React.createElement("li", null,
                    React.createElement("code", null, "DateTimePicker"),
                    " component for dateTime data type."),
                React.createElement("li", null,
                    React.createElement("code", null, "Checkbox"),
                    " component for boolean data type"))),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "columns.editType"),
                " is used to customize the edit type of the particular column. You can set the columns editType based on data type of the column."),
            React.createElement("p", null, "In this sample, we show the following editTypes for the Tree Grid columns"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "NumericTextBox")),
                React.createElement("li", null,
                    React.createElement("code", null, "TextBox")),
                React.createElement("li", null,
                    React.createElement("code", null, "DropDownList")),
                React.createElement("li", null,
                    React.createElement("code", null, "DatePicker")),
                React.createElement("li", null,
                    React.createElement("code", null, "DateTimePicker")),
                React.createElement("li", null,
                    React.createElement("code", null, "Checkbox"))),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject",
                React.createElement("code", null, "Edit"),
                "module into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the selection configuration can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/editing/cell-editing" }, "documentation section"),
                "."))));
};
exports.default = EditType;
