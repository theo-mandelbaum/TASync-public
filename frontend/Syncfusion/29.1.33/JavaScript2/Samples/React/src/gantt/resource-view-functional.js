"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
var ResourceView = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        resourceInfo: 'resources',
        work: 'work',
        child: 'subtasks'
    };
    var taskType = "FixedWork";
    var resourceFields = {
        id: 'resourceId',
        name: 'resourceName',
        unit: 'resourceUnit',
        group: 'resourceGroup'
    };
    var editSettings = {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        allowTaskbarEditing: true,
        showDeleteConfirmDialog: true
    };
    var toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll',
        { text: 'Show/Hide Overallocation', tooltipText: 'Show/Hide Overallocation', id: 'showhidebar' }];
    var splitterSettings = {
        columnIndex: 3
    };
    var projectStartDate = new Date('03/28/2024');
    var projectEndDate = new Date('05/18/2024');
    var labelSettings = {
        rightLabel: 'resources',
        taskLabel: 'Progress'
    };
    var toolbarClick = function (args) {
        if (args.item.id === 'showhidebar') {
            ganttInstance.current.showOverAllocation = ganttInstance.current.showOverAllocation ? false : true;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'ResourceView', dataSource: data_1.resourcesData, treeColumnIndex: 1, viewType: 'ResourceView', allowSelection: true, allowResizing: true, highlightWeekends: true, toolbar: toolbar, toolbarClick: toolbarClick.bind(_this), editSettings: editSettings, projectStartDate: projectStartDate, projectEndDate: projectEndDate, resourceFields: resourceFields, taskFields: taskFields, taskType: taskType, labelSettings: labelSettings, splitterSettings: splitterSettings, height: '410px', resources: data_1.resourceCollection, showOverAllocation: true, ref: ganttInstance },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', visible: false }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Name', width: '250' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'work', headerText: 'Work' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'resourceGroup', headerText: 'Group' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers, ej2_react_gantt_1.Toolbar, ej2_react_gantt_1.Edit, ej2_react_gantt_1.Resize] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample explains the Resource break down view in the Gantt chart that is how to visualize the list of tasks assigned to each resource in hierarchy manner and switch the resources as per users need by task editing mode.If the no resources are mapped in a task, then it will come under \u201Cunassigned Tasks\u201D category. This feature can be enabled by setting the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#viewtype" }, "viewType"),
                " property to \u201CResourceView\u201D."),
            React.createElement("p", null, "When a resource is assigned with two or more tasks which is scheduleduling on a same date is termed as over allocation for a resource. The number of over allocation dates ranges are highlighted as with square bracket. The following sample demonstrates the over allocation for a resource. In this sample, over allocation can be hidden by using the CSS \u2018visibility\u2019 property on custom toolbar item action.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see the resource break down from a bulk of tasks done by mapping the predefined resource ID-s to each task and resource information can be shown by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#labelsettings" }, "labelSetting"),
                " property. Using the toolbar action, you can perform CRUD operation for resource allocation based on their availability and task complexity."),
            React.createElement("p", null,
                "The resources and tasks assigned to those resources can be grouped into categories. Resources can be mapped using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#resourcefields" }, "resourceFields:"),
                "."),
            React.createElement("p", null,
                React.createElement("code", null, "ID"),
                ": To map resource ID."),
            React.createElement("p", null,
                React.createElement("code", null, "Name"),
                ": To map resource name."),
            React.createElement("p", null,
                React.createElement("code", null, "Unit"),
                ": To map resource unit."),
            React.createElement("p", null,
                React.createElement("code", null, "Group"),
                ": To map resource group."),
            React.createElement("p", null,
                "The Gantt control features are segregated into individual feature-wise modules. To use a selection, inject the",
                React.createElement("code", null, "Selection"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Selection)"),
                " method. To use markers, inject the",
                React.createElement("code", null, "DayMarkers"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                " method. To edit,  inject the ",
                React.createElement("code", null, "Toolbar"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Toolbar)"),
                " method and ",
                React.createElement("code", null, "Edit"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Edit)"),
                " method."))));
};
exports.default = ResourceView;
