"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineTemplate = void 0;
var React = require("react");
var ej2_react_gantt_1 = require("@syncfusion/ej2-react-gantt");
var ej2_base_1 = require("@syncfusion/ej2-base");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./timelinetemplate.css");
var TimelineTemplate = /** @class */ (function (_super) {
    __extends(TimelineTemplate, _super);
    function TimelineTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.taskFields = {
            id: 'TaskID',
            name: 'TaskName',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            dependency: 'Predecessor',
            child: 'subtasks'
        };
        _this.splitterSettings = {
            columnIndex: 1
        };
        _this.labelSettings = {
            leftLabel: 'TaskName',
        };
        // Create an Internationalization instance
        _this.intlObj = new ej2_base_1.Internationalization();
        _this.convertArabicNumeralsToWestern = function (arabicNumerals) {
            var arabicToWesternMap = { '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' };
            return arabicNumerals.replace(/[\u0660-\u0669]/g, function (match) { return arabicToWesternMap[match]; });
        };
        _this.parseArabicDate = function (arabicDateString) {
            // To convert the 'arabicDateString' Arabic Date to ISO Date format
            var normalizedDate = _this.convertArabicNumeralsToWestern(arabicDateString);
            var parts = normalizedDate.split('/'); // Assuming "DD/MM/YYYY" format
            var day = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10) - 1; // Months are zero-based
            var year = parseInt(parts[2], 10);
            return new Date(year, month, day);
        };
        _this.parseDateString = function (dateString) {
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
        _this.timelineSettings = {
            topTier: {
                unit: 'Day',
            },
            timelineUnitSize: 200,
        };
        _this.projectStartDate = new Date('03/31/2024');
        _this.projectEndDate = new Date('04/23/2024');
        return _this;
    }
    TimelineTemplate.prototype.weekDate = function (dateString) {
        var date = this.ganttInstance.locale === 'ar' ? this.parseArabicDate(dateString) : this.parseDateString(dateString);
        return this.intlObj.formatDate(date, { skeleton: 'E' });
    };
    ;
    TimelineTemplate.prototype.formatDate = function (dateString) {
        var date = this.ganttInstance.locale === 'ar' ? this.parseArabicDate(dateString) : this.parseDateString(dateString);
        return this.intlObj.formatDate(date, { skeleton: 'd' });
    };
    ;
    TimelineTemplate.prototype.imageString = function (date) {
        var imageDate = this.ganttInstance.locale === 'ar' ? this.parseArabicDate(date) : this.parseDateString(date);
        return "src/gantt/images/".concat(imageDate.getDay(), ".svg");
    };
    ;
    TimelineTemplate.prototype.timelineTemplate = function (props) {
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
                        } }, this.weekDate(props.date)),
                    React.createElement("div", { style: {
                            lineHeight: 'normal',
                            paddingTop: '5px',
                            paddingBottom: '2px',
                            fontWeight: 'normal'
                        } }, this.formatDate(props.date)),
                    React.createElement("div", { style: {
                            width: '20px',
                            height: '20px',
                            lineHeight: 'normal'
                        } },
                        React.createElement("img", { style: {
                                width: '100%',
                                height: '100%'
                            }, src: this.imageString(props.date) })))));
        }
    };
    TimelineTemplate.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_gantt_1.GanttComponent, { id: 'TimelineTemplate', dataSource: data_1.timelineTemplateData, highlightWeekends: true, splitterSettings: this.splitterSettings, taskFields: this.taskFields, height: '550px', labelSettings: this.labelSettings, projectStartDate: this.projectStartDate, projectEndDate: this.projectEndDate, timelineSettings: this.timelineSettings, timelineTemplate: this.timelineTemplate, treeColumnIndex: 1 },
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
                React.createElement("p", null,
                    "In this demo, the timelineTemplate property enables the customization of timeline cells with any HTML content, allowing for enhanced visual appeal and personalized functionality.",
                    React.createElement("p", null, "The template contains these context properties to design the timeline cells."),
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
    return TimelineTemplate;
}(sample_base_1.SampleBase));
exports.TimelineTemplate = TimelineTemplate;
