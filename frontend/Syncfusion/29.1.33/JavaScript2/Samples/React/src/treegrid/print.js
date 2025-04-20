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
exports.Print = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n.e-print-fluent2-highcontrast.e-treegrid.e-print-grid-layout,\n    .e-print-fluent2-highcontrast.e-treegrid.e-print-grid-layout .e-gridheader,\n    .e-print-fluent2-highcontrast.e-treegrid.e-print-grid-layout .e-rowcell {\n        border-color: gray !important;\n    }";
var Print = /** @class */ (function (_super) {
    __extends(Print, _super);
    function Print() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['Print'];
        return _this;
    }
    Print.prototype.load = function () {
        this.grid.cssClass = document.querySelector('.fluent2-highcontrast') ? 'e-print-fluent2-highcontrast' : '';
    };
    Print.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', toolbar: this.toolbarOptions, load: this.load, height: '410' },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '70', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '180' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '90', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '90' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the option to print the Tree Grid. Click the print button from the toolbar item to print Tree Grid.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Tree Grid can be printed using the ",
                    React.createElement("code", null, "print"),
                    " method. While printing the pager and scrollbar will be removed if they are enabled in Tree Grid."),
                React.createElement("p", null,
                    "By default, all pages will be printed.We can print current page alone by setting the ",
                    React.createElement("code", null, "printMode"),
                    "property value as ",
                    React.createElement("code", null, "currentpage"),
                    "."),
                React.createElement("p", null, "In this demo, click the print icon to print Tree Grid."),
                React.createElement("p", null,
                    "More information on the print feature can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/print" }, "documentation section"),
                    "."))));
    };
    return Print;
}(sample_base_1.SampleBase));
exports.Print = Print;
