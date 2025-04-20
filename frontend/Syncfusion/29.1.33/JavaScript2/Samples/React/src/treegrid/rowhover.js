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
exports.RowHover = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var rowhover_css = "\n    .material3 #TreeGrid .e-gridcontent tr.e-row:hover .e-rowcell:not(.e-selectionbackground):not(.e-active) {\n       background-color: rgba(28, 27, 31, 0.05) !important;\n    }\n    .material3-dark #TreeGrid .e-gridcontent tr.e-row:hover .e-rowcell:not(.e-selectionbackground):not(.e-active) {\n       background-color: rgba(230, 225, 229, 0.05) !important;\n    }";
var RowHover = /** @class */ (function (_super) {
    __extends(RowHover, _super);
    function RowHover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RowHover.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, rowhover_css),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '350', enableHover: true },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '70', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', type: 'date', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '90', format: 'yMd', type: 'date', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Tree Grid component with the row hover feature. Move the mouse over the Tree Grid rows to see the hover effect.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Row Hover feature enables us to identify the current row by highlighting them with the mouse hovers. This can be enabled by setting the ",
                    React.createElement("code", null, "enableHover"),
                    " property as true,"),
                React.createElement("p", null,
                    "In this demo, by enabling the ",
                    React.createElement("code", null, "enableHover"),
                    " property, you can move the mouse over Tree Grid rows to see the hover effect."))));
    };
    return RowHover;
}(sample_base_1.SampleBase));
exports.RowHover = RowHover;
