"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var datasource_1 = require("./datasource");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
function ResourceOptimization() {
    var ganttInstance;
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        resourceInfo: 'resourceInfo',
        work: 'work',
        child: 'subtasks'
    };
    var toolbarTemplate = function () {
        return React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toolbarButton', isPrimary: true }, "Optimize resource allocation");
    };
    var toolbarOptions = [{
            template: toolbarTemplate, text: 'Optimize resource allocation'
        }];
    function toolbarClick(args) {
        if (args.item.text === 'Optimize resource allocation') {
            ganttInstance.showSpinner();
            var input = "I want you to act as an AI assistant tasked with updating resource assignments to tasks in a project management system. Your goal is to ensure that resources are not assigned to tasks that overlap in timeline with another task assigned to the same resource.\n          This means checking the start and end dates of all tasks assigned to each resource and making sure no resource is double-booked during any task's duration. If you find that a resource is assigned multiple tasks with overlapping timelines(dates same or conflict any date), replace the conflicting task with another resource that has no tasks overlapping the same dates.\n          Aim to reassign tasks in a way that ensures every task is assigned to a resource, minimizing the chance of any task being left unassigned unless it is unavoidable due to scheduling conflicts.\n          Below is the list of tasks and their current details. It includes taskCollection Data with \"resourceInfo\" field as integer array collection which is assigned to respective tasks.This resourceInfo integer will be referencing from resourceId field of separate resourceCollection.\n          First rearrange taskCollection based on resourceId, then if any resource tasks are overlapped in timeline, reassign any one of the task to other resource by comparing its existing tasks dates, if that too overlap in timeline try changing other resource, if you cannot reassign any one of the resource due to conflict then left the field blank. return only newly prepared collection as json format if you done any reassignment. I dont want code to achieve this, apply your logic to given taskcollection and resourceCollection and return only result in json format.\n          Do not return any content or any other additional information only return JSON.\n            Task Collection Data:" + JSON.stringify(datasource_1.tasksCollection);
            "Resource Collection Data:" + JSON.stringify(datasource_1.resourceCollection);
            var aioutput = window.getAzureChatAIRequest({ messages: [{ role: 'user', content: input }] });
            aioutput.then(function (result) {
                var cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
                cleanedJsonData = cleanedJsonData.replace(/\n}\n/g, '');
                ganttInstance.dataSource = JSON.parse(cleanedJsonData);
                ganttInstance.hideSpinner();
            });
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'container' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: "GanttContainer", ref: function (gantt) { return ganttInstance = gantt; }, dataSource: datasource_1.tasksCollection, resources: datasource_1.resourceCollection, viewType: 'ResourceView', showOverAllocation: true, enableContextMenu: true, allowSorting: true, allowReordering: true, taskFields: taskFields, resourceFields: {
                        id: 'resourceId',
                        name: 'resourceName',
                        unit: 'resourceUnit',
                        group: 'resourceGroup'
                    }, editSettings: {
                        allowAdding: true,
                        allowEditing: true,
                        allowDeleting: true,
                        allowTaskbarEditing: true,
                        showDeleteConfirmDialog: true
                    }, toolbar: toolbarOptions, toolbarClick: toolbarClick, labelSettings: {
                        rightLabel: 'resourceInfo'
                    }, splitterSettings: {
                        columnIndex: 3
                    }, selectionSettings: {
                        mode: 'Row',
                        type: 'Single',
                        enableToggle: false
                    }, tooltipSettings: {
                        showTooltip: true
                    }, timelineSettings: {
                        showTooltip: true,
                        topTier: {
                            unit: 'Week',
                            format: 'dd/MM/yyyy'
                        },
                        bottomTier: {
                            unit: 'Day',
                            count: 1
                        }
                    }, readOnly: false, allowSelection: true, highlightWeekends: true, treeColumnIndex: 1, taskbarHeight: 20, rowHeight: 40, height: '550px' },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', visible: false }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Event Name', width: 250 }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', headerText: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'End Date' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Edit, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Selection, ej2_react_gantt_1.Sort, ej2_react_gantt_1.Reorder, ej2_react_gantt_1.ContextMenu, ej2_react_gantt_1.DayMarkers] }))))));
}
exports.default = ResourceOptimization;
