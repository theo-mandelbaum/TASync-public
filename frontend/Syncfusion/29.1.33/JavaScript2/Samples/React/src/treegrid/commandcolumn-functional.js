"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Command = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Row",
        allowEditOnDblClick: false
    };
    var taskIDRule = { required: true, number: true };
    var taskNameRule = { required: true };
    var dateRule = { date: ['M/d/yyyy', 'Please enter a valid date'] };
    var durationRule = { number: true, min: 0 };
    var editparams2 = { params: { format: "n" } };
    var editparams3 = { params: { format: 'M/d/yyyy' } };
    var commands = [
        {
            type: "Edit",
            buttonOption: { iconCss: " e-icons e-edit", cssClass: "e-flat" },
        },
        {
            type: "Delete",
            buttonOption: { iconCss: "e-icons e-delete", cssClass: "e-flat" },
        },
        {
            type: "Save",
            buttonOption: { iconCss: "e-icons e-update", cssClass: "e-flat" },
        },
        {
            type: "Cancel",
            buttonOption: { iconCss: "e-icons e-cancel-icon", cssClass: "e-flat" },
        },
    ];
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "400", editSettings: editSettings },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right", validationRules: taskIDRule, isPrimaryKey: true }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200", validationRules: taskNameRule }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "140", textAlign: "Right", editType: "datepickeredit", format: "yMd", edit: editparams3, validationRules: dateRule, type: "date" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "130", editType: "numericedit", textAlign: "Right", validationRules: durationRule, edit: editparams2 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "150", textAlign: "Right", editType: "numericedit", validationRules: durationRule, edit: editparams2 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { headerText: "Manage Records", width: "160", commands: commands })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.CommandColumn] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates CRUD operations in Tree Grid using command column. You can perform CRUD operations as follows,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Edit"),
                    " - To edit record, double click a row or click Edit button from command column after selected a row."),
                React.createElement("li", null,
                    React.createElement("code", null, "Delete"),
                    " - To delete record, click Delete button from command column after selected a row."),
                React.createElement("li", null,
                    React.createElement("code", null, "Update, Cancel"),
                    " -You can save or discard changes by click Update and Cancel button from command column respectively."))),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Tree Grid provides an option to render CRUD action buttons in a column by using the ",
                React.createElement("b", null, "CommandColumn"),
                " feature. The",
                " ",
                React.createElement("code", null, "columns->commands"),
                " property accepts array of CommandModel object. The predefined command button can be defined by using type property."),
            React.createElement("p", null, "The built-in command button are,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Edit ")),
                React.createElement("li", null,
                    React.createElement("code", null, "Delete")),
                React.createElement("li", null,
                    React.createElement("code", null, "Cancel")),
                React.createElement("li", null,
                    React.createElement("code", null, "Save"))),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject ",
                React.createElement("code", null, "Edit"),
                " ",
                "module into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the selection configuration can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/editing/command-column-editing" }, "documentation section"),
                "."))));
};
exports.default = Command;
