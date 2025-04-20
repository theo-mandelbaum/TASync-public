"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var datasource_1 = require("./datasource");
var data = require("./progress.json");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
function Progress() {
    var ganttInstance;
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        parentID: "ParentTaskID"
    };
    var toolbarTemplate = function () {
        return React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'toolbarButton', isPrimary: true }, "Predict milestone");
    };
    var toolbarOptions = [{
            template: toolbarTemplate, text: 'Predict milestone'
        }];
    function toolbarClick(args) {
        if (args.item.text === 'Predict milestone') {
            ganttInstance.showSpinner();
            var input = "You analyze the multiple year HistoricalTaskDataCollections and current TaskDataCollection to predict project completion dates and milestones based on current progress and historical trends. Ignore the null or empty values, and collection values based parent child mapping. Avoid json tags with your response. No other explanation or content to be returned." +
                " HistoricalTaskDataCollections :" + getHistoricalCollection() +
                " TaskDataCollection: " + JSON.stringify(datasource_1.TaskDataCollection) +
                " Generate a JSON object named 'TaskDetails' containing:" +
                "- Key 'MilestoneTaskDate' with a list of milestone dates 'MilestoneDate' with 'TaskName' - task name. A milestone date is defined as the end date of tasks with a duration of 0 and only give current based milestone." +
                "- Key 'ProjectCompletionDate' indicating the latest end date among all tasks." +
                "- Key 'Summary' providing a summary of the project completion date and milestones.Ensure milestones are defined correctly based on tasks with a duration of 0, and the project completion date reflects the latest end date of all tasks ";
            var aioutput = window.getAzureChatAIRequest({ messages: [{ role: 'user', content: input }] });
            aioutput.then(function (result) {
                var cleanedJsonData = result.replace(/^```json\n|```\n?$/g, '');
                var dataset = JSON.parse(cleanedJsonData);
                var eventMarkers = dataset.TaskDetails.MilestoneTaskDate
                    .map(function (milestone) { return ({
                    day: new Date(milestone["MilestoneDate"]),
                    label: milestone["TaskName"]
                }); });
                var projectDetailes = {
                    day: new Date(dataset.TaskDetails.ProjectCompletionDate),
                    label: "Project completion date"
                };
                eventMarkers.push(projectDetailes);
                ganttInstance.eventMarkers = eventMarkers;
                ganttInstance.hideSpinner();
            });
        }
        function getHistoricalCollection() {
            var historicalDataCollection = '';
            var word = data;
            for (var year = 2021; year < 2026; year++) {
                historicalDataCollection += "HistoricalTaskDataCollection" + year + ":" + JSON.stringify(word["TaskDataCollection" + year]);
            }
            return historicalDataCollection;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'container' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { ref: function (gantt) { return ganttInstance = gantt; }, dataSource: datasource_1.TaskDataCollection, enableContextMenu: true, allowSorting: true, allowReordering: true, taskFields: taskFields, editSettings: {
                        allowAdding: true,
                        allowEditing: true,
                        allowDeleting: true,
                        allowTaskbarEditing: true,
                        showDeleteConfirmDialog: true
                    }, toolbar: toolbarOptions, toolbarClick: toolbarClick, splitterSettings: {
                        position: "28%"
                    }, allowSelection: true, treeColumnIndex: 1, height: '550px', projectStartDate: new Date('4/1/2026'), projectEndDate: new Date('6/2/2026') },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', visible: false }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Event Name', width: 250 }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate', headerText: 'Start Date' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate', headerText: 'End Date' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Edit, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.Sort, ej2_react_gantt_1.Reorder, ej2_react_gantt_1.ContextMenu] }))))));
}
exports.default = Progress;
