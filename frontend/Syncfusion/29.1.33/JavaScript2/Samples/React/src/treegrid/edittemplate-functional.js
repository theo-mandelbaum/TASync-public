"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var EditTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
    var editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        mode: "Row",
        newRowPosition: "Below",
    };
    var taskIDRule = { required: true, number: true };
    var priorityRule = { required: true };
    var dateRule = { date: ['M/d/yyyy', 'Please enter a valid date'] };
    var editparams3 = { params: { format: 'M/d/yyyy' } };
    var durationRule = { number: true, min: 0 };
    var editparams2 = { params: { format: "n" } };
    var elem;
    var autoCompleteobj;
    var treegridObj = (0, react_1.useRef)(null);
    var editTemplate = {
        create: function () {
            elem = document.createElement("input");
            return elem;
        },
        read: function () {
            return autoCompleteobj.value;
        },
        destroy: function () {
            autoCompleteobj.destroy();
        },
        write: function (args) {
            autoCompleteobj = new ej2_react_dropdowns_1.AutoComplete({
                dataSource: treegridObj.current.grid.dataSource,
                fields: { value: "taskName" },
                value: args.rowData[args.column.field],
            });
            autoCompleteobj.appendTo(elem);
        },
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: "subtasks", height: "400", editSettings: editSettings, toolbar: toolbarOptions, ref: treegridObj },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", headerText: "Task ID", width: "80", textAlign: "Right", validationRules: taskIDRule, isPrimaryKey: true }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200", edit: editTemplate }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "140", textAlign: "Right", editType: "datepickeredit", format: "yMd", edit: editparams3, validationRules: dateRule, type: "date" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "140", editType: "numericedit", textAlign: "Right", validationRules: durationRule, edit: editparams2 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "150", textAlign: "Right", editType: "numericedit", validationRules: durationRule, edit: editparams2 }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "130", textAlign: "Right", editType: "stringedit", validationRules: priorityRule })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Edit, ej2_react_treegrid_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This samples demonstrates the Tree Grid Cell Edit template feature. Using Cell Edit Template feature we have rendered the AutoComplete component for \u201C",
                React.createElement("b", null, "Task Name"),
                "\u201D column.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The cell edit template is used to add a custom component for a particular column by invoking the following functions:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "create"),
                    " - It is used to create the element at the time of initialization."),
                React.createElement("li", null,
                    React.createElement("code", null, "write"),
                    " - It is used to create the custom component or assign default value at the time of editing."),
                React.createElement("li", null,
                    React.createElement("code", null, "read"),
                    " - It is used to read the value from the component at the time of save."),
                React.createElement("li", null,
                    React.createElement("code", null, "destroy"),
                    " - It is used to destroy the component.")),
            React.createElement("p", null,
                "In this demo, we have rendered the AutoComplete component for \u201CTask Name\u201D column of Tree Grid using ",
                React.createElement("code", null, "edit"),
                " property."),
            React.createElement("p", null,
                React.createElement("br", null),
                " More information about Cell Edit template can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/editing/template-editing" }, "documentation section"),
                "."))));
};
exports.default = EditTemplate;
