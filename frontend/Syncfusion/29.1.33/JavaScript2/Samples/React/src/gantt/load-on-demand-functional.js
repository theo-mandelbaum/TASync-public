"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
var LoadOnDemand = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dataSource = new ej2_data_1.DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/GanttLoadOnDemand',
        adaptor: new ej2_data_1.WebApiAdaptor,
        crossDomain: true
    });
    var taskFields = {
        id: 'taskId',
        name: 'taskName',
        startDate: 'startDate',
        endDate: 'endDate',
        duration: 'duration',
        progress: 'progress',
        hasChildMapping: 'isParent',
        parentID: 'parentID'
    };
    var projectStartDate = new Date('01/02/2000');
    var projectEndDate = new Date('12/01/2002');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'LoadOnDemand', dataSource: dataSource, treeColumnIndex: 1, taskFields: taskFields, enableVirtualization: true, loadChildOnDemand: true, height: '460px', projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskId', width: '80' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'taskName', headerText: 'Job Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'startDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'progress' })),
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
exports.default = LoadOnDemand;
