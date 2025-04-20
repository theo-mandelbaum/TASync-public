"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var GridLines = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ganttInstance = (0, react_1.useRef)(null);
    var linesData = [
        { id: 'Both', type: 'Both' },
        { id: 'Vertical', type: 'Vertical' },
        { id: 'Horizontal', type: 'Horizontal' },
        { id: 'None', type: 'None' }
    ];
    var changeLine = function (args) {
        var lines = args.value.toString();
        ganttInstance.current.gridLines = lines;
        ganttInstance.current.refresh();
    };
    var gridLines = 'Both';
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    var labelSettings = {
        leftLabel: 'TaskName'
    };
    var splitterSettings = {
        columnIndex: 2
    };
    var projectStartDate = new Date('03/24/2024');
    var projectEndDate = new Date('07/06/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'GridLines', ref: ganttInstance, dataSource: data_1.projectNewData, highlightWeekends: true, taskFields: taskFields, labelSettings: labelSettings, height: '410px', treeColumnIndex: 1, gridLines: gridLines, splitterSettings: splitterSettings, projectStartDate: projectStartDate, projectEndDate: projectEndDate },
                    React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', width: '80' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: '250' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Predecessor' }),
                        React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                    React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", className: "property-panel-table", title: "Properties", style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", { style: { fontSize: '15px' } }, "Grid Lines"))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '100%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'gridLines', dataSource: linesData, fields: { text: 'type', value: 'id' }, value: 'Both', change: changeLine.bind(_this) }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the visibility of Gantt lines that separate the rows and columns.In this sample, you can change the gridlines from the property panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt#gridlines" }, "gridLines"),
                " property is used to control the visibility of line that separates the rows and columns. Gantt allows us to display the following grid lines:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "None"),
                    " - Shows no line."),
                React.createElement("li", null,
                    React.createElement("code", null, "Both"),
                    " - Shows both horizontal and vertical lines."),
                React.createElement("li", null,
                    React.createElement("code", null, "Horizontal"),
                    " - Shows the horizontal line."),
                React.createElement("li", null,
                    React.createElement("code", null, "Vertical"),
                    " - Shows the vertical line.")),
            React.createElement("p", null, " In this demo, you can modify the visibility of gridlines by selecting values in dropdown."),
            React.createElement("p", null,
                "Gantt component features are segregated into individual feature-wise modules.To use a selection, inject the ",
                React.createElement("code", null, "Selection"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(Selection)"),
                "method.To use markers, inject the ",
                React.createElement("code", null, "DayMarkers"),
                " module using the ",
                React.createElement("code", null, "Gantt.Inject(DayMarkers)"),
                " method."))));
};
exports.default = GridLines;
