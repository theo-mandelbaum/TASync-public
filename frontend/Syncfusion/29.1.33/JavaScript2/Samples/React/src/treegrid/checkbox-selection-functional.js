"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var CheckboxSelection = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var selectionsettings = { persistSelection: true };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 2, childMapping: "subtasks", height: "350", allowPaging: true, selectionSettings: selectionsettings },
                React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { type: "checkbox", width: "50" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskID", isPrimaryKey: true, headerText: "Task ID", width: "70", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "taskName", headerText: "Task Name", width: "200" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "startDate", headerText: "Start Date", width: "90", format: "yMd", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "duration", headerText: "Duration", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "progress", headerText: "Progress", width: "90", textAlign: "Right" }),
                    React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: "priority", headerText: "Priority", width: "90" })),
                React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the selection functionality of the Tree Grid using checkbox selection, To select and unselect all rows use header checkbox. To select/unselect particular row, click the desired row.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Tree Grid mutliple selection can be achieved with help of checkbox in each row. To render checkbox in each Tree Grid row, you need to define column type as ",
                React.createElement("code", null, "checkbox"),
                " using",
                " ",
                React.createElement("code", null, "columns->type"),
                " property."),
            React.createElement("p", null,
                "Selection can be persisted on all the operations using",
                " ",
                React.createElement("code", null, "selectionSettings-> persistSelection"),
                " property. For persisting selection on the Tree Grid, any one of the column should be defined as a primary key using ",
                React.createElement("code", null, " columns->isPrimaryKey"),
                " ",
                "property."),
            React.createElement("p", null, "In this demo, Tree Grid mutliple selection has been enabled with selection persistance."),
            React.createElement("p", null,
                "More information on the checkbox selection configuration can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/selection/check-box-selection" }, "documentation section"),
                "."))));
};
exports.default = CheckboxSelection;
