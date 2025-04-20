"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./virtual-scrolling.css");
var sample_base_1 = require("../common/sample-base");
var helper_1 = require("./helper");
/**
 * schedule virtual scrolling sample
 */
var VirtualScrolling = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var timelineEventTemplate = function (props) {
        return (React.createElement("div", { className: "template-wrap", style: { background: props.PrimaryColor } },
            React.createElement("div", { className: "subject", style: { background: props.SecondaryColor } }, props.Subject)));
    };
    var generateStaticEvents = function (start, resCount, overlapCount) {
        var data = [];
        var id = 1;
        for (var i = 0; i < resCount; i++) {
            var randomCollection = [];
            var random = 0;
            for (var j = 0; j < overlapCount; j++) {
                random = Math.floor(Math.random() * (30));
                random = (random === 0) ? 1 : random;
                if (randomCollection.indexOf(random) !== -1 || randomCollection.indexOf(random + 2) !== -1 ||
                    randomCollection.indexOf(random - 2) !== -1) {
                    random += (Math.max.apply(null, randomCollection) + 10);
                }
                for (var k = 1; k <= 2; k++) {
                    randomCollection.push(random + k);
                }
                var startDate = new Date(start.getFullYear(), start.getMonth(), random);
                startDate = new Date(startDate.getTime() + (((random % 10) * 10) * (1000 * 60)));
                var endDate = new Date(startDate.getTime() + ((1440 + 30) * (1000 * 60)));
                data.push({
                    Id: id,
                    Subject: 'Event #' + id,
                    StartTime: startDate,
                    EndTime: endDate,
                    IsAllDay: (id % 10) ? false : true,
                    ResourceId: i + 1
                });
                id++;
            }
        }
        return data;
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'virtual-scrolling', width: '100%', height: '650px', selectedDate: new Date(2021, 4, 1), group: { resources: ['Resources'] }, eventSettings: { dataSource: generateStaticEvents(new Date(2021, 4, 1), 300, 12) } },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'ResourceId', title: 'Resource', name: 'Resources', allowMultiple: true, dataSource: (0, helper_1.generateResourceData)(1, 300, 'Resource'), textField: 'Text', idField: 'Id', colorField: 'Color' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth', isSelected: true, eventTemplate: timelineEventTemplate, allowVirtualScrolling: true }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month', eventTemplate: timelineEventTemplate, allowVirtualScrolling: true })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example illustrates how to dynamically load the resources and events as you scroll through the scheduler. All the events in this example are loaded at the initial rendering of scheduler, but the events in the visible area alone will be rendered. Here, the scheduler is made to dynamically load 300 resources along with the events count of 3600 (300 resources * 12 events).")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the virtual scrolling option is enabled on timeline month and month views to load the large number of resources and its associated events. To enable the dynamic loading of events and resources in the Scheduler, set the ",
                React.createElement("code", null, "allowVirtualScrolling"),
                " property to ",
                React.createElement("code", null, "true"),
                " within the view-specific settings."))));
};
exports.default = VirtualScrolling;
