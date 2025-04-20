"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
var RemoteData = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var taskFields = {
        id: 'TaskId',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        dependency: 'Predecessor',
        child: 'SubTasks'
    };
    var projectStartDate = new Date('02/24/2021');
    var projectEndDate = new Date('06/10/2021');
    var gridLines = 'Both';
    var timelineSettings = {
        timelineUnitSize: 50,
        topTier: {
            unit: 'Month',
            format: 'MMM dd, y',
        },
        bottomTier: {
            unit: 'Day',
            formatter: function (date) {
                var month = date.getMonth();
                if (month === 1) {
                    return '';
                }
                else {
                    var presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                    var start = new Date(presentDate.getFullYear(), 0, 0);
                    var diff = Number(presentDate) - Number(start);
                    var oneDay = 1000 * 60 * 60 * 24;
                    var day = Math.floor(diff / oneDay);
                    return 'day ' + (day - 59);
                }
            },
        },
    };
    var dataSource = new ej2_data_1.DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/GanttData',
        adaptor: new ej2_data_1.WebApiAdaptor,
        crossDomain: true
    });
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'RemoteData', dataSource: dataSource, allowSorting: true, dateFormat: 'MMM dd, y', treeColumnIndex: 1, allowSelection: true, highlightWeekends: false, includeWeekend: true, allowUnscheduledTasks: true, projectStartDate: projectStartDate, projectEndDate: projectEndDate, taskFields: taskFields, gridLines: gridLines, timelineSettings: timelineSettings, labelSettings: labelSettings, height: '410px' },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskId', visible: false }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', headerText: 'Task Name', width: '250', clipMode: 'EllipsisWithTooltip' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection] })),
            React.createElement("div", { style: { float: 'right', margin: '10px' } },
                "Source:",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/Cereal_growth_staging_scales", target: '_blank' }, "https://en.wikipedia.org/"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the way of binding data to Gantt chart with remote service. The Gantt chart data source is bound to remote data using DataManager. This sample data helps to visualize the various phases of Barley harvesting.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "dataSource"),
                " property in Gantt chart can be assigned with the instance of",
                React.createElement("code", null, "DataManager"),
                " to bind remote data. The DataManager, which will act as an interface between the service endpoint and the Gantt chart, will require the below minimal information to interact with service endpoint properly.",
                React.createElement("li", null,
                    React.createElement("code", null, "DataManager->url"),
                    " - Defines the service endpoint to fetch data"),
                React.createElement("li", null,
                    React.createElement("code", null, "DataManager->adaptor"),
                    " - Defines the adaptor option. By default, ODataAdaptor is used for remote binding."),
                "Adaptor is responsible for processing response and request from/to the service endpoint.",
                React.createElement("code", null, "@syncfusion/ej2-data"),
                "package provides some predefined adaptors which are designed to interact with particular service endpoints. They are,",
                React.createElement("li", null,
                    React.createElement("code", null, "UrlAdaptor"),
                    " - Use this to interact any remote services. This is the base adaptor for all remote based adaptors."),
                React.createElement("li", null,
                    React.createElement("code", null, "ODataAdaptor"),
                    " - Use this to interact with OData endpoints."),
                React.createElement("li", null,
                    React.createElement("code", null, "ODataV4Adaptor"),
                    " - Use this to interact with OData V4 endpoints."),
                React.createElement("li", null,
                    React.createElement("code", null, "WebApiAdaptor"),
                    " - Use this to interact with Web API created under OData standards."),
                React.createElement("li", null,
                    React.createElement("code", null, "WebMethodAdaptor"),
                    " - Use this to interact with web methods."),
                "In this demo, remote data is bound by assigning service data as an instance of ",
                React.createElement("code", null, "DataManager"),
                " to the",
                React.createElement("code", null, "dataSource"),
                "property. More information on the data binding can be found in this documentation section."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules. To use a selection feature, inject the",
                React.createElement("code", null, "Selection"),
                " module."))));
};
exports.default = RemoteData;
