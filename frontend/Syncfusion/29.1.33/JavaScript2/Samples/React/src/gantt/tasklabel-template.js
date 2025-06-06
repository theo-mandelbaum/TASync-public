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
exports.TasklabelTemplate = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var TasklabelTemplate = /** @class */ (function (_super) {
    __extends(TasklabelTemplate, _super);
    function TasklabelTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
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
        _this.templateLeft = _this.LeftLabelTemplate;
        _this.templateRight = _this.RightLabelTemplate;
        _this.labelSettings = {
            leftLabel: _this.templateLeft.bind(_this),
            rightLabel: _this.templateRight.bind(_this),
            taskLabel: '${Progress}%'
        };
        _this.splitterSettings = {
            position: "35%"
        };
        _this.projectStartDate = new Date('03/24/2024');
        _this.projectEndDate = new Date('05/04/2024');
        return _this;
    }
    TasklabelTemplate.prototype.LeftLabelTemplate = function (props) {
        return (React.createElement("span", null,
            props.TaskName,
            " [ ",
            props.Progress,
            "% ]"));
    };
    ;
    TasklabelTemplate.prototype.RightLabelTemplate = function (props) {
        if (props.ganttProperties.resourceInfo) {
            var resources = props.ganttProperties.resourceInfo;
            var out = [];
            for (var index = 0; index < resources.length; index++) {
                var src = 'src/gantt/images/' + resources[index].resourceName + '.png';
                var img = React.createElement("img", { src: src, height: '40px', alt: resources[index].resourceName });
                var span = React.createElement("span", { style: { marginLeft: '5px', marginRight: '5px' } }, resources[index].resourceName);
                out.push(img, span);
            }
            return (React.createElement("div", null, out));
        }
        else {
            return React.createElement("div", null);
        }
    };
    ;
    TasklabelTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'TasklabelTemplate', dataSource: data_1.labelData, highlightWeekends: true, rowHeight: 46, treeColumnIndex: 1, splitterSettings: this.splitterSettings, taskFields: this.taskFields, labelSettings: this.labelSettings, height: '410px', projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, resourceFields: this.resourceFields, resources: data_1.editingResources },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resources' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample explains the way of rendering label template for left, right, and task labels by mapping template elements to the leftLabel, rightLabel and taskLabel properties in labelSettings.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, the label template is rendered using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/labelSettingsModel/#leftlabel" }, "leftLabel"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/labelSettingsModel/#rightlabel" }, "rightLabel"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/labelSettingsModel/#tasklabel" }, "taskLabel"),
                    " properties in ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#labelsettings" }, "labelSettings"),
                    "."),
                React.createElement("p", null,
                    "Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the",
                    React.createElement("code", null, "Selection"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(Selection)"),
                    " method.To use markers, inject the",
                    React.createElement("code", null, "DayMarkers"),
                    " module using the ",
                    React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                    " method."))));
    };
    return TasklabelTemplate;
}(sample_base_1.SampleBase));
exports.TasklabelTemplate = TasklabelTemplate;
