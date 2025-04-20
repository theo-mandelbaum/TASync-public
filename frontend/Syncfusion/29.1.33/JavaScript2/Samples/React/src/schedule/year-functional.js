"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./schedule-component.css");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
/**
 * Schedule Year view sample
 */
var Year = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var categoriesData = [
        { text: 'Nancy', id: 1, color: '#df5286' },
        { text: 'Steven', id: 2, color: '#7fa900' },
        { text: 'Robert', id: 3, color: '#ea7a57' },
        { text: 'Smith', id: 4, color: '#5978ee' },
        { text: 'Michael', id: 5, color: '#df5286' }
    ];
    var months = [
        { text: 'January', value: 0 },
        { text: 'February', value: 1 },
        { text: 'March', value: 2 },
        { text: 'April', value: 3 },
        { text: 'May', value: 4 },
        { text: 'June', value: 5 },
        { text: 'July', value: 6 },
        { text: 'August', value: 7 },
        { text: 'September', value: 8 },
        { text: 'October', value: 9 },
        { text: 'November', value: 10 },
        { text: 'December', value: 11 }
    ];
    var fields = { text: 'text', value: 'value' };
    var _a = (0, react_1.useState)(0), firstMonth = _a[0], setFirstMonth = _a[1];
    var _b = (0, react_1.useState)(12), monthsCount = _b[0], setMonthsCount = _b[1];
    var onEventRendered = function (args) {
        var eventColor = args.data.EventColor;
        if (!args.element || !eventColor) {
            return;
        }
        else {
            args.element.style.backgroundColor = eventColor;
        }
    };
    var firstMonthOfYear = function (args) {
        setFirstMonth(args.value);
    };
    var numberOfMonths = function (args) {
        setMonthsCount(args.value);
    };
    var generateEvents = function (count, date) {
        if (count === void 0) { count = 250; }
        if (date === void 0) { date = new Date(); }
        var names = [
            'Bering Sea Gold', 'Technology', 'Maintenance', 'Meeting', 'Travelling', 'Annual Conference', 'Birthday Celebration',
            'Farewell Celebration', 'Wedding Anniversary', 'Alaska: The Last Frontier', 'Deadliest Catch', 'Sports Day',
            'MoonShiners', 'Close Encounters', 'HighWay Thru Hell', 'Daily Planet', 'Cash Cab', 'Basketball Practice',
            'Rugby Match', 'Guitar Class', 'Music Lessons', 'Doctor checkup', 'Brazil - Mexico', 'Opening ceremony', 'Final presentation'
        ];
        var colors = [
            '#ff8787', '#9775fa', '#748ffc', '#3bc9db', '#69db7c', '#fdd835', '#748ffc',
            '#9775fa', '#df5286', '#7fa900', '#fec200', '#5978ee', '#00bdae', '#ea80fc'
        ];
        var startDate = new Date(date.getFullYear() - 2, 0, 1);
        var endDate = new Date(date.getFullYear() + 2, 11, 31);
        var dateCollections = [];
        for (var a = 0, id = 1; a < count; a++) {
            var start = new Date(Math.random() * (endDate.getTime() - startDate.getTime()) + startDate.getTime());
            var end = new Date(new Date(start.getTime()).setHours(start.getHours() + 1));
            var nCount = Math.floor(Math.random() * names.length);
            var n = Math.floor(Math.random() * colors.length);
            dateCollections.push({
                Id: id,
                Subject: names[nCount],
                StartTime: new Date(start.getTime()),
                EndTime: new Date(end.getTime()),
                IsAllDay: (id % 10) ? true : false,
                EventColor: colors[n],
                TaskId: (id % 5) + 1
            });
            id++;
        }
        return dateCollections;
    };
    var data = generateEvents();
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '555px', cssClass: "year-view", eventSettings: { dataSource: data }, firstMonthOfYear: firstMonth, monthsCount: monthsCount, eventRendered: onEventRendered },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Category', name: 'Categories', allowMultiple: true, dataSource: categoriesData, textField: 'text', idField: 'id', colorField: 'color' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Year', isSelected: true }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineYear', displayName: 'Horizontal TimelineYear' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineYear', displayName: 'Vertical TimelineYear', orientation: "Vertical", group: { resources: ['Categories'] } })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Year, ej2_react_schedule_1.TimelineYear, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table year-property-panel' },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "firstMonthElement", placeholder: "First month of year", floatLabelType: "Always", fields: fields, value: firstMonth, dataSource: months, change: firstMonthOfYear })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "numberOfMonthsElement", placeholder: "Number of months", floatLabelType: "Always", format: '###.##', min: 1, max: 24, value: monthsCount, change: numberOfMonths })))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This example showcases the year and timeline year views of the Scheduler with the firstMonthOfYear and monthCount properties customizations. Once the property value has been changed in the properties, it will be reflected in the Scheduler.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, we have showcased the year and timeline year views that help to view the appointment in an annual calendar view. The view options are enabled by using the views property. In the ",
                React.createElement("code", null, "TimelineYear"),
                ", ",
                React.createElement("code", null, "Horizontal"),
                " and ",
                React.createElement("code", null, "Vertical"),
                "orientations are available to view the events with a different layout. Also this demo explains the customization of the different starting month of the year using ",
                React.createElement("code", null, "firstMonthOfYear"),
                " property and the number of months using the ",
                React.createElement("code", null, "monthsCount"),
                " property."),
            React.createElement("p", null,
                React.createElement("strong", null, "Module Injection")),
            React.createElement("p", null,
                "To work with Year view on Scheduler \u2013 it is necessary to inject the Year and TimelineYear module like using ",
                React.createElement("code", null, "services"),
                " property under ",
                React.createElement("code", null, "Inject"),
                " tag."))));
};
exports.default = Year;
