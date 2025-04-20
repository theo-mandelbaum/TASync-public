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
exports.LoadOnDemand = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
var LoadOnDemand = /** @class */ (function (_super) {
    __extends(LoadOnDemand, _super);
    function LoadOnDemand() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataSource = new ej2_data_1.DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/GanttLoadOnDemand',
            adaptor: new ej2_data_1.WebApiAdaptor,
            crossDomain: true
        });
        _this.taskFields = {
            id: 'taskId',
            name: 'taskName',
            startDate: 'startDate',
            endDate: 'endDate',
            duration: 'duration',
            progress: 'progress',
            hasChildMapping: 'isParent',
            parentID: 'parentID'
        };
        _this.projectStartDate = new Date('01/02/2000');
        _this.projectEndDate = new Date('12/01/2002');
        return _this;
    }
    LoadOnDemand.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'LoadOnDemand', dataSource: this.dataSource, treeColumnIndex: 1, taskFields: this.taskFields, enableVirtualization: true, loadChildOnDemand: true, height: '460px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskId', width: '80', headerText: 'Task ID' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskName', headerText: 'Task Name', width: '250', allowReordering: false }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'startDate', headerText: 'Start Date', allowSorting: false }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'duration', headerText: 'Duration', allowEditing: false }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'progress', headerText: 'Progress', allowFiltering: false })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.VirtualScroll] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the load on-demand data binding support in Gantt Chart. It allows users to load parent records alone on load time. Child records render on demand during expansion action.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Load on demand and virtualization support is used to render a large number of tasks in the Gantt Chart with an effective performance. And so, in this demo, row virtualization is enabled with remote data binding which has 50,000 records."),
                React.createElement("p", null,
                    "With the virtualization feature enabled in remote data binding, only the root level records are fetched from the remote server at the initial load time. So, need to set the ",
                    React.createElement("code", null, "hasChildMapping"),
                    " property of ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#taskfields" }, "taskFields"),
                    " that denotes whichever records have child records and set ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#loadchildondemand" }, "loadChildOnDemand"),
                    " property as false."),
                React.createElement("p", null, "When expanding the root parent node or scrolling vertically, the corresponding tasks are dynamically fetched from the remote server and then updated in the DOM based on the current viewport position."))));
    };
    return LoadOnDemand;
}(sample_base_1.SampleBase));
exports.LoadOnDemand = LoadOnDemand;
