"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var data_1 = require("./data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./timelinetemplate.css");
var TimelineTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var taskFields = {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        duration: 'Duration',
        progress: 'Progress',
        dependency: 'Predecessor',
        child: 'subtasks'
    };
    var ganttInstance;
    // Create an Internationalization instance
    var intlObj = new ej2_base_1.Internationalization();
    var weekDate = function (dateString) {
        var date = ganttInstance.locale === 'ar' ? parseArabicDate(dateString) : parseDateString(dateString);
        return intlObj.formatDate(date, { skeleton: 'E' });
    };
    var formatDate = function (dateString) {
        var date = ganttInstance.locale === 'ar' ? parseArabicDate(dateString) : parseDateString(dateString);
        return intlObj.formatDate(date, { skeleton: 'd' });
    };
    var imageString = function (date) {
        var imageDate = ganttInstance.locale === 'ar' ? parseArabicDate(date) : parseDateString(date);
        return "src/gantt/images/".concat(imageDate.getDay(), ".svg");
    };
    var convertArabicNumeralsToWestern = function (arabicNumerals) {
        var arabicToWesternMap = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
        return arabicNumerals.replace(/[\u0660-\u0669]/g, function (match) { return arabicToWesternMap[match]; });
    };
    var parseArabicDate = function (arabicDateString) {
        // To convert the 'arabicDateString' Arabic Date to ISO Date format
        var normalizedDate = convertArabicNumeralsToWestern(arabicDateString);
        var parts = normalizedDate.split('/'); // Assuming "DD/MM/YYYY" format
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1; // Months are zero-based
        var year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    };
    var parseDateString = function (dateString) {
        // Check if the date string is in the format "DD.MM.YYYY"
        if (dateString.includes('.')) {
            var parts = dateString.split('.');
            var day = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10) - 1;
            var year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        }
        // Fallback to default date parsing
        return new Date(dateString);
    };
    var timelineTemplate = function (props) {
        if (props.tier == 'topTier') {
            return (React.createElement("div", { className: "e-header-cell-label e-gantt-top-cell-text", style: {
                    width: '100%',
                    fontWeight: 'bold',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }, title: props.date },
                React.createElement("div", { style: {
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    } },
                    React.createElement("div", { style: {
                            lineHeight: 'initial',
                            fontWeight: 'normal'
                        } }, weekDate(props.date)),
                    React.createElement("div", { style: {
                            lineHeight: 'normal',
                            paddingTop: '5px',
                            paddingBottom: '2px',
                            fontWeight: 'normal'
                        } }, formatDate(props.date)),
                    React.createElement("div", { style: {
                            width: '20px',
                            height: '20px',
                            lineHeight: 'normal'
                        } },
                        React.createElement("img", { style: {
                                width: '100%',
                                height: '100%'
                            }, src: imageString(props.date) })))));
        }
    };
    var splitterSettings = {
        columnIndex: 1
    };
    var timelineSettings = {
        topTier: {
            unit: 'Day',
        },
        timelineUnitSize: 200,
    };
    var labelSettings = {
        leftLabel: 'TaskName',
    };
    var projectStartDate = new Date('03/31/2024');
    var projectEndDate = new Date('04/23/2024');
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'TimelineTemplate', dataSource: data_1.timelineTemplateData, ref: function (gantt) { return ganttInstance = gantt; }, splitterSettings: splitterSettings, taskFields: taskFields, height: '550px', projectStartDate: projectStartDate, projectEndDate: projectEndDate, timelineSettings: timelineSettings, timelineTemplate: timelineTemplate, labelSettings: labelSettings, treeColumnIndex: 1 },
                React.createElement(ej2_react_gantt_1.ColumnsDirective, null,
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskID', visible: false }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'TaskName', width: 300 }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'StartDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'EndDate' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Duration' }),
                    React.createElement(ej2_react_gantt_1.ColumnDirective, { field: 'Progress' })),
                React.createElement(ej2_react_gantt_1.Inject, { services: [ej2_react_gantt_1.Selection, ej2_react_gantt_1.DayMarkers] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample explains the way of rendering timeline template by mapping template elements to the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/gantt/#timelineTemplate" }, "timelineTemplate"),
                " property.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this demo, the timelineTemplate property enables the customization of timeline cells with any HTML content, allowing for enhanced visual appeal and personalized functionality."),
            React.createElement("p", null, "The template contains these context properties to design the timeline cells:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "date"),
                    ": Defines the date of timeline date."),
                React.createElement("li", null,
                    React.createElement("code", null, "value"),
                    ": Defines the date value to display in the timeline."),
                React.createElement("li", null,
                    React.createElement("code", null, "tier"),
                    ": Defines the tier of timeline.")))));
};
exports.default = TimelineTemplate;
