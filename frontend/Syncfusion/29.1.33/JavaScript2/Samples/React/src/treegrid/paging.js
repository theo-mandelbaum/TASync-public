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
exports.Paging = void 0;
var React = require("react");
var ej2_react_treegrid_1 = require("@syncfusion/ej2-react-treegrid");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var Paging = /** @class */ (function (_super) {
    __extends(Paging, _super);
    function Paging() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Paging.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_treegrid_1.TreeGridComponent, { dataSource: data_1.sampleData, treeColumnIndex: 1, childMapping: 'subtasks', height: '350', allowPaging: true, pageSettings: { pageSizes: true, pageSize: 10, pageCount: 2 } },
                    React.createElement(ej2_react_treegrid_1.ColumnsDirective, null,
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskID', headerText: 'Task ID', width: '70', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '200' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'endDate', headerText: 'End Date', width: '90', format: 'yMd', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'duration', headerText: 'Duration', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'progress', headerText: 'Progress', width: '80', textAlign: 'Right' }),
                        React.createElement(ej2_react_treegrid_1.ColumnDirective, { field: 'priority', headerText: 'Priority', width: '80' })),
                    React.createElement(ej2_react_treegrid_1.Inject, { services: [ej2_react_treegrid_1.Page] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Tree Grid paging feature. In this sample, click the numeric items to navigate to another page. You can also change the page size using the dropdown.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "Paging allows you to display the contents of the Tree Grid in page segments. By default, paging is disabled. To enable paging, set ",
                    React.createElement("code", null, "allowPaging"),
                    " property to true. ",
                    React.createElement("code", null, "pageSettings->pageSizes"),
                    " property enables a dropdown in pager which allows you to change the number of records in the Tree Grid dynamically."),
                React.createElement("p", null,
                    "In this demo, the Tree Grid is rendered with ",
                    React.createElement("code", null, "pageSettings->pageSizes"),
                    " set to true and have an option to change the pagesize of Tree Grid dynamically."),
                React.createElement("p", null,
                    "Injecting Module: Tree Grid features are segregated into individual feature-wise modules. To use paging feature, we need to inject ",
                    React.createElement("code", null, "Page"),
                    "module into the ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the paging configuration can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/treegrid/paging#pager-with-page-size-dropdown" }, "documentation section"),
                    "."))));
    };
    return Paging;
}(sample_base_1.SampleBase));
exports.Paging = Paging;
