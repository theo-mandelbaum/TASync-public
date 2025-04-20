"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var data_1 = require("./data");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
function DetailTemplate() {
    var _this = this;
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var taskData;
    var salesData;
    var emailTemplate = function (props) {
        var src = 'mailto:${MailID}' + props.MailID;
        return (React.createElement("div", null,
            React.createElement("a", { href: src }, props.MailID)));
    };
    var generateSalesData = function (taskData) {
        var statusCategories = ['Open', 'InProgress', 'Testing', 'Close'];
        var statusData = statusCategories.map(function (status) {
            var filteredTasks = taskData.filter(function (task) { return task.Status === status; });
            var estimatedHours = filteredTasks.reduce(function (sum, task) { return sum + task.Estimate; }, 0);
            // Assuming tasks have an EstimatedHours field
            var spentHours = filteredTasks.reduce(function (sum, task) { return sum + task.Spent; }, 0);
            var taskid = '';
            if (filteredTasks.length) {
                taskid = filteredTasks[0].Id;
            }
            return { spentHours: spentHours, estimatedHours: estimatedHours, status: status, taskid: taskid };
        });
        return statusData;
    };
    var detailDataBound = function (args) {
        var rowData = args.data;
        taskData = data_1.taskDetail.filter(function (task) { return task.Assignee === rowData.Name; });
        salesData = generateSalesData(taskData);
    };
    var cardTemplate = function (props) {
        return (React.createElement("div", { className: "card-template" },
            React.createElement("table", { className: "card-template-wrap", style: { width: '100%' } },
                React.createElement("tbody", null,
                    React.createElement("tr", null,
                        React.createElement("td", { className: "e-title" },
                            React.createElement("div", { className: "e-card-header" },
                                React.createElement("div", { className: "e-card-header-caption" },
                                    React.createElement("div", { className: "e-card-header-title e-tooltip-text" }, props.Id))),
                            React.createElement("table", { className: "card-template-wrap" },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { className: 'e-tooltip-text' },
                                        React.createElement("td", null,
                                            React.createElement("div", { className: "e-card-content" }, props.Summary),
                                            React.createElement("span", { className: "e-card-content" },
                                                React.createElement("b", null, "Estimated hour:"),
                                                " ",
                                                props.Estimate)))))))))));
    };
    var taskTemplate = function () {
        return (React.createElement("div", { style: { paddingTop: '20px', paddingBottom: '20px' } },
            React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "kanban", cssClass: "kanban-swimlane-template", keyField: "Status", dataSource: taskData, cardSettings: { template: cardTemplate.bind(_this), headerField: 'Id' } },
                React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                    React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Open", keyField: "Open" }),
                    React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                    React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Testing", keyField: "Testing" }),
                    React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" })))));
    };
    var chartTemplate = function () {
        return (React.createElement("div", { style: { paddingTop: '20px', paddingBottom: '20px' } },
            React.createElement(ej2_react_charts_1.ChartComponent, { height: "302px", tooltip: { enable: true }, primaryXAxis: { valueType: 'Category', title: 'Status' }, title: "Burndown Chart" },
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_charts_1.Tooltip, ej2_react_charts_1.LineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: salesData, xName: "taskid", yName: "estimatedHours", name: "Estimated Hours", marker: { visible: true, width: 10, height: 10 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: salesData, xName: "taskid", yName: "spentHours", name: "Spent Hours", marker: { visible: true, width: 10, height: 10 } })))));
    };
    var detailTemplate = function () {
        var headertext = [{ text: "Taskboard" }, { text: "Burndown Chart" }];
        return (React.createElement("div", null,
            React.createElement("p", { style: { textAlign: "center", paddingTop: "3px", fontSize: "17px" } },
                React.createElement("b", null, "Sprint")),
            React.createElement(ej2_react_navigations_1.TabComponent, { animation: {
                    previous: { effect: 'None', duration: 0, easing: '' },
                    next: { effect: 'None', duration: 0, easing: '' }
                } },
                React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[0], content: taskTemplate }),
                    React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[1], content: chartTemplate })))));
    };
    var employeeTemplate = function (props) {
        var src = 'src/grid/images/' + props.EmployeeID.replace('Emp100', '') + '.png';
        return (React.createElement("div", { className: 'image' },
            React.createElement("img", { src: src, alt: props.EmployeeID })));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_grids_1.GridComponent, { dataSource: data_1.employeeDetail, height: '600', detailDataBound: detailDataBound, detailTemplate: detailTemplate, width: 'auto', allowSorting: true, allowFiltering: true, filterSettings: { type: 'CheckBox' } },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Image', width: '180', template: employeeTemplate, textAlign: 'Center' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "EmployeeID", headerText: 'ID', isPrimaryKey: true, width: 70 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "Name", headerText: 'Name', width: 70 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "MailID", headerText: 'Email', width: 120, template: emailTemplate }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "SoftwareTeam", headerText: 'Team(s)', width: 70 }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { field: "ReportTo", headerText: 'Reporter', width: 70 })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.DetailRow, ej2_react_grids_1.Sort, ej2_react_grids_1.Filter] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Grid component's with the detail template feature. It lets users click the expand button in each grid row to display detailed information about that row.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "This additional information can be shown or hidden by clicking on the expand or collapse button. The",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/documentation/api/grid#detailtemplate" }, "detailTemplate")),
                " property accepts either a string or HTML element`s ID value, which will be used as the template for the detail row."),
            React.createElement("p", null,
                "In this demonstration, the parent row provides information about employees name, ID, team and reporter names. In each employee row with a details view, when expanding the details, you can see the sprint report of that employee. In the details row with two tabs, the first tab contains",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/demos/#/fluent2/kanban/overview" }, "Syncfusion Kanban component")),
                " used to list assigned tasks and their current statuses, and the second tab contains ",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", className: "code", href: "https://ej2.syncfusion.com/react/demos/#/fluent2/chart/overview.html" }, " Syncfusion Chart Component")),
                " used to display the burndown chart of employee task estimated time vs actual spend time."),
            React.createElement("br", null),
            React.createElement("p", { style: { fontWeight: 500 } }, "Injecting Module:"),
            React.createElement("p", null,
                "Features of the Grid component are segregated into individual feature-wise modules. To use the Detail row feature, inject the ",
                React.createElement("code", null, "DetailRow"),
                " module into the ",
                React.createElement("code", null, "services")),
            React.createElement("p", null,
                "More information on the detail template can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/grid/row/detail-template" }, "documentation section"),
                "."))));
}
exports.default = DetailTemplate;
