"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ResourceAllocation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var resColumnTemplate = function (props) {
        if (props.ganttProperties.resourceNames) {
            if (props.ganttProperties.resourceNames.split('[')[0].includes('Rose Fuller')) {
                return (React.createElement("div", { style: { width: '150px', height: '24px', borderRadius: '100px', backgroundColor: '#1c5d8e', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement("span", { style: { color: 'white', fontWeight: 500 } }, props.ganttProperties.resourceNames)));
            }
            if (props.ganttProperties.resourceNames.split('[')[0].includes('Fuller King')) {
                return (React.createElement("div", { style: { width: '150px', height: '24px', borderRadius: '100px', backgroundColor: '#4a7537', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement("span", { style: { color: 'white', fontWeight: 500 } }, props.ganttProperties.resourceNames)));
            }
            if (props.ganttProperties.resourceNames.split('[')[0].includes('Van Jack')) {
                return (React.createElement("div", { style: { width: '150px', height: '24px', borderRadius: '100px', backgroundColor: '#b24531', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement("span", { style: { color: 'white', fontWeight: 500 } }, props.ganttProperties.resourceNames)));
            }
            if (props.ganttProperties.resourceNames.split('[')[0].includes('Bergs Anton')) {
                return (React.createElement("div", { style: { width: '150px', height: '24px', borderRadius: '100px', backgroundColor: '#a53576', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement("span", { style: { color: 'white', fontWeight: 500 } }, props.ganttProperties.resourceNames)));
            }
            if (props.ganttProperties.resourceNames.split('[')[0].includes('Tamer Vinet')) {
                return (React.createElement("div", { style: { width: '150px', height: '24px', borderRadius: '100px', backgroundColor: '#635688', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
                    React.createElement("span", { style: { color: 'white', fontWeight: 500 } }, props.ganttProperties.resourceNames)));
            }
        }
        else {
            return React.createElement("div", null);
        }
    };
    var template = resColumnTemplate.bind(_this);
    var dropdownlistObj;
    var ganttInstance;
    var dropdownlist = {
        read: function () {
            // Get the selected value from the dropdown
            var value = dropdownlistObj.value;
            if (value === null) {
                // If no value is selected, retain the existing resource(s)
                value = ganttInstance.treeGridModule.currentEditRow[ganttInstance.taskFields.resourceInfo];
            }
            else {
                // Update the resource info with the selected value
                ganttInstance.treeGridModule.currentEditRow[ganttInstance.taskFields.resourceInfo] = [value];
            }
            return value;
        },
        destroy: function () {
            dropdownlistObj.destroy();
        },
        write: function (args) {
            // Ensure the currentEditRow object is initialized
            ganttInstance.treeGridModule.currentEditRow = {};
            // Retrieve the existing resource(s) from the row data or set default
            var existingResourceIds = ganttInstance.treeGridModule.getResourceIds(args.rowData);
            var selectedValue = (existingResourceIds && existingResourceIds.length > 0) ? existingResourceIds[0] : null;
            // Initialize the DropDownList
            dropdownlistObj = new ej2_dropdowns_1.DropDownList({
                dataSource: new ej2_data_1.DataManager(ganttInstance.resources),
                fields: { text: ganttInstance.resourceFields.name, value: ganttInstance.resourceFields.id },
                enableRtl: ganttInstance.enableRtl,
                popupHeight: '350px',
                // Set the existing resource(s) as the selected value
                value: selectedValue,
            });
            // Append the dropdown to the element
            dropdownlistObj.appendTo(args.element);
        }
    };
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks',
        work: 'work',
        resourceInfo: 'resources',
        type: 'taskType'
    };
    var taskType = "FixedWork";
    var resourceFields = {
        id: 'resourceId',
        name: 'resourceName',
        unit: 'unit'
    };
    function queryTaskbarInfo(args) {
        if (args.data.ganttProperties.resourceNames) {
            var resourceName = args.data.ganttProperties.resourceNames;
            if (resourceName.split('[')[0].includes('Rose Fuller')) {
                args.taskbarBgColor = '#539ed6';
                args.milestoneColor = '#539ed6';
                args.progressBarBgColor = '#1c5d8e';
                args.taskbarBorderColor = '#1c5d8e';
                if (args.data.ganttProperties.progress === 0) {
                    args.taskLabelColor = 'black';
                }
            }
            else if (resourceName.split('[')[0].includes('Van Jack')) {
                args.taskbarBgColor = '#ff826b';
                args.milestoneColor = '#ff826b';
                args.progressBarBgColor = '#b24531';
                args.taskbarBorderColor = '#b24531';
                if (args.data.ganttProperties.progress === 0) {
                    args.taskLabelColor = 'black';
                }
            }
            else if (resourceName.split('[')[0].includes('Bergs Anton')) {
                args.taskbarBgColor = '#ef6fbb';
                args.milestoneColor = '#ef6fbb';
                args.progressBarBgColor = '#a53576';
                args.taskbarBorderColor = '#a53576';
                if (args.data.ganttProperties.progress === 0) {
                    args.taskLabelColor = 'black';
                }
            }
            else if (resourceName.split('[')[0].includes('Fuller King')) {
                args.taskbarBgColor = '#87b972';
                args.milestoneColor = '#87b972';
                args.progressBarBgColor = '#4a7537';
                args.taskbarBorderColor = '#4a7537';
                if (args.data.ganttProperties.progress === 0) {
                    args.taskLabelColor = 'black';
                }
            }
            else if (resourceName.split('[')[0].includes('Tamer Vinet')) {
                args.taskbarBgColor = '#a496cf';
                args.milestoneColor = '#a496cf';
                args.progressBarBgColor = '#635688';
                args.taskbarBorderColor = '#635688';
                if (args.data.ganttProperties.progress === 0) {
                    args.taskLabelColor = 'black';
                }
            }
        }
        if (args.taskbarType === 'ParentTask') {
            args.taskbarBgColor = '#adadad';
            args.progressBarBgColor = '#6b6b6b';
            if (args.data.ganttProperties.progress === 0) {
                args.taskLabelColor = 'black';
            }
        }
    }
    ;
    var editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    var editDialogFields = [
        { type: 'Resources' }
    ];
    var addDialogFields = [
        { type: 'Resources' }
    ];
    function cellEdit(args) {
        // Restrict editing based on row data
        if (args.rowData.TaskID === 1 || args.rowData.TaskID === 5) {
            args.cancel = true; // Cancel editing for this specific cell
        }
    }
    ;
    function actionBegin(args) {
        if (args.requestType === 'beforeOpenEditDialog' || args.requestType === 'beforeOpenAddDialog') {
            // Restrict editing based on row data for dialog
            if (args.rowData.TaskID === 1 || args.rowData.TaskID === 5) {
                args.cancel = true; // Cancel editing for this specific row dialog
            }
            args.Resources.selectionSettings = {};
            args.Resources.columns.splice(0, 1);
        }
    }
    ;
    function actionComplete(args) {
        if (args.requestType === 'add' && !args.data.TaskName) {
            var taskName = 'Task Name ' + args.data.TaskID;
            args.data.TaskName = taskName;
            args.data.ganttProperties.taskName = taskName;
            args.data.taskData.TaskName = taskName;
        }
    }
    ;
    var toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll'];
    var splitterSettings = {
        columnIndex: 2
    };
    var projectStartDate = new Date('03/28/2024');
    var projectEndDate = new Date('07/28/2024');
    var labelSettings = {
        rightLabel: 'resources',
        taskLabel: '${Progress}%'
    };
    var workUnit = 'Hour';
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'resource', dataSource: data_1.resourceAllocationData, ref: function (gantt) { return ganttInstance = gantt; }, treeColumnIndex: 1, allowSelection: true, highlightWeekends: true, toolbar: toolbar, editSettings: editSettings, projectStartDate: projectStartDate, projectEndDate: projectEndDate, resourceFields: resourceFields, taskFields: taskFields, taskType: taskType, labelSettings: labelSettings, splitterSettings: splitterSettings, height: '450px', resources: data_1.resourceAllocationResources, workUnit: workUnit, queryTaskbarInfo: queryTaskbarInfo, addDialogFields: addDialogFields, editDialogFields: editDialogFields, actionBegin: actionBegin, actionComplete: actionComplete, cellEdit: cellEdit },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', visible: false }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name', width: '180' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resources', headerText: 'Resources', width: '190', template: template, edit: dropdownlist }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'work', width: '110' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration', width: '100' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskType', headerText: 'Task Type', width: '110' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Edit] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the options to allocate one or more resources to tasks based on the task requirement. The Work is the total labor hours necessary to complete a task. Work can be mapped from the data source field using the property ",
                React.createElement("code", null, "work"),
                " and when the work value is mapped from the data source, the end date and duration of the task will be calculated automatically based on the work and resource unit values from the data source. Work can be measured in hours, days and minutes. It is measured in \u2018hours\u2019 scale by default and this can be changed by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#workunit" }, "workUnit"),
                " property.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to allocate single or multiple resources for the task. Based on the task complexity and the resource availability, you can plan and allocate the resources to task in the project. In this demo, there is a set of predefined resources and those IDs are assigned to the task. Resource information can be shown in Gantt chart by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#labelsettings" }, "labelSetting"),
                " property."),
            React.createElement("p", null,
                "Resources can be mapped using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#resourcefields" }, "resourceFields:"),
                ". "),
            React.createElement("p", null,
                React.createElement("code", null, "id"),
                ": To map resource ID"),
            React.createElement("p", null,
                React.createElement("code", null, "name"),
                ": To map resource name"),
            React.createElement("p", null,
                React.createElement("code", null, "unit"),
                ": To map resource unit"),
            React.createElement("p", null,
                "The work, duration and resource unit fields of a task depends upon each other values and will change automatically on editing any one of these fields. But we can also set these field\u2019s values as constant using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#tasktype" }, "taskType"),
                " property. The following values can be set to the type property:"),
            React.createElement("p", null,
                React.createElement("code", null, "FixedDuration"),
                ": Duration task field will remain constant while updating resource unit or work field."),
            React.createElement("p", null,
                React.createElement("code", null, "FixedWork"),
                ": Work field will remain constant while updating resource unit or duration fields."),
            React.createElement("p", null,
                React.createElement("code", null, "FixedUnit"),
                ": Resource units will remain constant while updating duration or work field."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use a selection, inject the",
                React.createElement("code", null, "Selection"),
                " module.To use markers, inject the ",
                React.createElement("code", null, "DayMarkers"),
                " module. To edit resource unit, task type and duration, inject the ",
                React.createElement("code", null, "Toolbar"),
                " and ",
                React.createElement("code", null, "Edit"),
                " module."))));
};
exports.default = ResourceAllocation;
