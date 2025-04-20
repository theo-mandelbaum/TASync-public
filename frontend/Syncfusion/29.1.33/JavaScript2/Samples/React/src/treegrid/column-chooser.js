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
exports.TreeGridColumnChooser = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var TreeGridColumnChooser = /** @class */ (function (_super) {
    __extends(TreeGridColumnChooser, _super);
    function TreeGridColumnChooser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toolbarOptions = ['ColumnChooser'];
        return _this;
    }
    TreeGridColumnChooser.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '350', allowPaging: true, pageSettings: { pageSize: 10 }, showColumnChooser: true, toolbar: this.toolbarOptions },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '100', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '150', showInColumnChooser: false }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '80' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page, ej2_react_treegrid_1.Toolbar, ej2_react_treegrid_1.ColumnChooser] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the column chooser feature in Tree Grid. Click the column chooser icon in the toolbar to open column chooser and you can select columns to hide/show from the checkbox list.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "The Tree Grid columns can be shown/hidden dynamically by using column chooser. To enable column chooser behavior, set ",
                    React.createElement("code", null, "showColumnChooser"),
                    " property as true. You can also prevent the display of a column by setting ",
                    React.createElement("code", null, "columns->showInColumnChooser"),
                    " as false in columns definition."),
                React.createElement("p", null, "In this demo, when the user clicks column chooser icon from the toolbar then the column chooser menu will open. User can show or hide the columns by changing the state of the checkbox. "),
                React.createElement("p", null, "Injecting Module:"),
                React.createElement("p", null,
                    "Tree Grid features are segregated into individual feature-wise modules. To use column chooser feature, we need to inject ",
                    React.createElement("code", null, "ColumnChooser"),
                    " module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information about Column Chooser can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/columns/column-chooser.html" }, "documentation section.")))));
    };
    return TreeGridColumnChooser;
}(sample_base_1.SampleBase));
exports.TreeGridColumnChooser = TreeGridColumnChooser;
