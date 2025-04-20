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
exports.ColumnTemplate = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ColumnTemplate = /** @class */ (function (_super) {
    __extends(ColumnTemplate, _super);
    function ColumnTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.template = _this.columnTemplate.bind(_this);
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            resourceInfo: 'resources',
            child: 'subtasks'
        };
        _this.resourceFields = {
            id: 'resourceId',
            name: 'resourceName'
        };
        _this.labelSettings = {
            leftLabel: 'TaskName'
        };
        _this.splitterSettings = {
            columnIndex: 3
        };
        _this.projectStartDate = new Date('03/24/2024');
        _this.projectEndDate = new Date('07/06/2024');
        return _this;
    }
    ColumnTemplate.prototype.columnTemplate = function (props) {
        var src = 'src/gantt/images/' + props.ganttProperties.resourceNames + '.png';
        if ((props.ganttProperties.resourceNames)) {
            var gantt = document.getElementsByClassName('e-gantt')[0].ej2_instances[0];
            if (gantt.enableRtl) {
                return (React.createElement("div", { className: 'columnTemplate' },
                    React.createElement("img", { src: src, height: '40px', width: '40px', alt: props.ganttProperties.resourceNames }),
                    React.createElement("div", { style: { display: "inline-block", width: '100%', position: "relative", right: "30px" } }, props.ganttProperties.resourceNames)));
            }
            else {
                return (React.createElement("div", { className: 'columnTemplate' },
                    React.createElement("img", { src: src, height: '40px', width: '40px', alt: props.ganttProperties.resourceNames }),
                    React.createElement("div", { style: { display: "inline-block", width: '100%', position: "relative", left: "30px" } }, props.ganttProperties.resourceNames)));
            }
        }
        else {
            return React.createElement("div", null);
        }
    };
    ColumnTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ColumnMenu', rowHeight: 60, resourceFields: this.resourceFields, resources: data_1.editingResources, dataSource: data_1.templateData, highlightWeekends: true, treeColumnIndex: 1, splitterSettings: this.splitterSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', headerText: 'Task ID', width: '80', textAlign: "Left" }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Name', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resources', headerText: 'Resources', width: '250', template: this.template }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', width: '150' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', width: '150' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress', width: '150' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the usage of template columns in Gantt. In this sample, we have shown custom images in the Resources column.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Gantt provides a way to use a custom layout for each cell using the column template feature. The ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/columnModel/#template" }, "columns -> template"),
                    " property accepts the template for the cell."),
                React.createElement("p", null, "In this demo, using column template, resource column has been presented with employee photo"))));
    };
    return ColumnTemplate;
}(sample_base_1.SampleBase));
exports.ColumnTemplate = ColumnTemplate;
