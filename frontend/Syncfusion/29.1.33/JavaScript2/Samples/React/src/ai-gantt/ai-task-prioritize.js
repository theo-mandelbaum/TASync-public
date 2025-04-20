"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var datasource_1 = require("./datasource");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./prioritize-task.css");
function PrioritizeTask() {
    var ganttInstance;
    var taskFields = {
        id: 'Id',
        name: 'Name',
        startDate: 'StartDate',
        endDate: 'EndDate',
        progress: 'Progress',
        parentID: 'ParentId',
        resourceInfo: 'resourceInfo',
        baselineStartDate: "BaselineStartDate",
        baselineEndDate: "BaselineEndDate",
    };
    var toolbarTemplate = function () {
        return React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toolbarButton', isPrimary: true }, "Assign prioritize tasks");
    };
    var toolbarOptions = [{
            template: toolbarTemplate, text: 'Assign prioritize tasks'
        }];
    function toolbarClick(args) {
        if (args.item.text === 'Assign prioritize tasks') {
            ganttInstance.showSpinner();
            var input = "\n          Analyze the following TaskCollection to identify critical tasks. \n          A task is considered critical if its EndDate is greater than its BaselineEndDate, comparing only the dates (not the time). \n          Both EndDate and BaselineEndDate must not be null.\n          Here is the 'TaskCollection': ".concat(JSON.stringify(datasource_1.tasksCollection), ";\n          For each task, add an additional property called isCritical. Set this property to true if the task is critical based on the criteria provided, otherwise set it to false. \n          Ensure that:\n          1. Only the date part (not time) of EndDate and BaselineEndDate is compared.\n          2. Tasks with both EndDate and BaselineEndDate being not null and where EndDate is greater than BaselineEndDate are marked as critical.\n          Return the entire modified TaskCollection in JSON format. Ensure all tasks are included with their updated isCritical property. Do not include any other text or additional information.");
            var prompt_1 = input;
            var aioutput = window.getAzureChatAIRequest({ messages: [{ role: 'user', content: prompt_1 }] });
            aioutput.then(function (result) {
                var cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
                cleanedJsonData = cleanedJsonData.replace(/\n}\n/g, '');
                var input1 = "Analyze the following JSON data:\n    \n            - 'TaskCollection': ".concat(JSON.stringify(datasource_1.tasksCollection), "\n            - 'ResourceCollection': ").concat(JSON.stringify(datasource_1.resourceCollection), "\n            - 'CriticalCollection': ").concat(JSON.stringify(cleanedJsonData), "\n            \n            Perform the following steps:\n            1. For each task in 'CriticalCollection' where 'isCritical' is 'true':\n               - Identify unassigned resources by comparing 'ResourceCollection' with the 'resourceInfo' property in 'TaskCollection'.\n               - Add each unassigned resource to the 'resourceInfo' property of the corresponding critical task without removing any existing resources.\n               - Ensure that each critical task receives a unique unassigned resource, if available.\n            \n            Return the modified 'CriticalCollection' with the additional resources assigned.\n            \n            Additionally, create a new property called 'AddedResourceIds' that contains the IDs of tasks in 'CriticalCollection' where 'isCritical' is 'true' and additional resources were added.\n            \n            Provide the result in JSON format, including:\n            - The modified 'CriticalCollection'.\n            - The 'AddedResourceIds' property with the IDs of tasks where additional resources were added.\n            \n            Do not include any additional text or information.");
                var aioutput1 = window.getAzureChatAIRequest({ messages: [{ role: 'user', content: input1 }] });
                aioutput1.then(function (result) {
                    var cleanedJsonData1 = result.replace(/^```json\n|```\n?$/g, '');
                    var criticalTask = JSON.parse(cleanedJsonData1);
                    ganttInstance.dataSource = criticalTask.CriticalCollection;
                    var modifiedtaskID = criticalTask.AddedResourceIds;
                    var taskIdsString = modifiedtaskID.join(', ');
                    var csfooterElement = document.getElementById('csfooter');
                    if (csfooterElement) {
                        csfooterElement.innerText = ' Critical task containing Task Id: ' + taskIdsString + ' new resources has been added';
                    }
                    ganttInstance.hideSpinner();
                });
            });
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'container' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { ref: function (gantt) { return ganttInstance = gantt; }, dataSource: datasource_1.tasksCollection, resources: datasource_1.resourceCollection, taskFields: taskFields, resourceFields: {
                        id: 'Id',
                        name: 'Name',
                        unit: 'MaxUnit',
                    }, editSettings: {
                        allowAdding: true,
                        allowEditing: true,
                        allowDeleting: true,
                        allowTaskbarEditing: true,
                        showDeleteConfirmDialog: true
                    }, rowDataBound: function (args) {
                        if (args.data.taskData.isCritical) {
                            args.row.style.backgroundColor = '#ffecd4';
                        }
                    }, queryTaskbarInfo: function (args) {
                        if (args.data.taskData.isCritical) {
                            args.taskbarElement.parentElement.parentElement.style.backgroundColor = '#ffecd4';
                        }
                    }, columns: [
                        { field: 'Id', headerText: "Task Id", visible: false },
                        { field: 'Name', headerText: 'Task Name', width: 250, clipMode: 'EllipsisWithTooltip' },
                        { field: 'resourceInfo', headerText: 'Resources' },
                        { field: 'StartDate', headerText: 'Start Date' },
                        { field: 'EndDate', headerText: 'End Date' },
                    ], toolbar: toolbarOptions, toolbarClick: toolbarClick, labelSettings: {
                        rightLabel: 'resourceInfo'
                    }, splitterSettings: {
                        position: "23%"
                    }, readOnly: false, allowSelection: true, highlightWeekends: true, treeColumnIndex: 1, taskbarHeight: 20, rowHeight: 40, height: '550px' },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Id', headerText: 'Task Id', visible: false }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Name', headerText: 'Task Name', width: 250, clipMode: 'EllipsisWithTooltip' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resourceInfo', headerText: 'Resources' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'End Date' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Edit, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Selection] })),
                React.createElement("div", { id: "csfooter" })))));
}
exports.default = PrioritizeTask;
