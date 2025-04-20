"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxColumn = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n.e-bigger.bootstrap5 .e-treegrid .e-hierarchycheckbox .e-frame, \n.e-bigger.bootstrap5-dark .e-treegrid .e-hierarchycheckbox .e-frame {\n  height: 17px;\n  width: 17px;\n}\n.e-bigger.bootstrap4 .e-treegrid .e-hierarchycheckbox .e-frame {\n  height: 18px;\n  width: 18px;\n}";
var CheckboxColumn = /** @class */ (function (_super) {
    __extends(CheckboxColumn, _super);
    function CheckboxColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckboxColumn.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '410', autoCheckHierarchy: true },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '60', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200', showCheckbox: true }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the checkbox column selection functionality of Tree Grid. Click on any parent record checkbox then the child record checkboxes will get selected and parent record checkbox will get selected while checking all of its child items.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Tree Grid component can be rendered with checkbox on existing column and also this can be enabled by ",
                    React.createElement("code", null, "showCheckbox"),
                    " property as true in columns API."),
                React.createElement("p", null,
                    "For hierarchy selection between the records, we need to enable the ",
                    React.createElement("code", null, "autoCheckHierarchy"),
                    " property."),
                React.createElement("p", null, "While using Tree Grid in a touch device, you have an option to select the checkboxes by tapping on the checkbox."),
                React.createElement("p", null,
                    "More information on the checkbox selection configuration can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/columns/columns#checkbox-column" }, "documentation section"),
                    "."))));
    };
    return CheckboxColumn;
}(sample_base_1.SampleBase));
exports.CheckboxColumn = CheckboxColumn;
