"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
{ /* custom code start */ }
var editDialog_height = "\n  #_gridcontrol_dialogEdit_wrapper.e-dialog.e-edit-dialog {\n    max-height: 589px !important;\n  } ";
{ /* custom code end */ }
var Dialog = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
    var editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Dialog",
    };
    var editparams = { params: { popupHeight: "300px" } };
    var validationRule = { required: true };
    var validationRule1 = { date: ['M/d/yyyy', 'Please enter a valid date'] };
    var editparams3 = { params: { format: 'M/d/yyyy', } };
    var validationRule2 = { required: true, number: true };
    var editparams2 = { params: { format: "n" } };
    var pageSettings = { pageCount: 8 };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("style", null, editDialog_height),
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "350", allowPaging: true, editSettings: editSettings, pageSettings: pageSettings, toolbar: toolbarOptions },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right", validationRules: validationRule2, isPrimaryKey: true }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "150", validationRules: validationRule }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "110", textAlign: "Right", editType: "datepickeredit", format: "yMd", edit: editparams3, validationRules: validationRule1 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "endDate", headerText: "End Date", width: "130", textAlign: "Right", editType: "datepickeredit", format: "yMd" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", editType: "numericedit", textAlign: "Right", validationRules: validationRule2, edit: editparams2 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right", editType: "dropdownedit", edit: editparams })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, " This sample demonstrates Dialog Editing ")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, Dialog mode is enabled for editing by defining",
                " ",
                React.createElement("code", null, "editSettings.mode"),
                " as dialog. You can start editing by double clicking a row or clicking on toolbar's Edit button, then the currently selected row will be shown on a dialog and you can change the row values and save edited data to the datasource."),
            React.createElement("p", null, "Injecting Module:"),
            React.createElement("p", null,
                "Tree Grid features are segregated into individual feature-wise modules. To use editing feature, we need to inject",
                React.createElement("code", null, "Edit"),
                "module into the ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the selection configuration can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/editing/dialog-editing" }, "documentation section"),
                "."))));
};
exports.default = Dialog;
