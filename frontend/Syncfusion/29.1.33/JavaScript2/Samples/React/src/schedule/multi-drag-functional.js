"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * schedule multiple dragging sample
 */
var MultiDrag = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.resourceData.concat(dataSource.timelineResourceData), null, true);
    var ownerData = [
        { text: 'Nancy', id: 1, color: '#df5286' },
        { text: 'Steven', id: 2, color: '#7fa900' },
        { text: 'Robert', id: 3, color: '#ea7a57' },
        { text: 'Smith', id: 4, color: '#5978ee' },
        { text: 'Michael', id: 5, color: '#df5286' }
    ];
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', selectedDate: new Date(2023, 0, 4), currentView: 'Month', allowMultiDrag: true, allowResizing: false, showQuickInfo: false, eventSettings: { dataSource: data }, group: { resources: ['Owners'] } },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'TaskId', title: 'Owners', name: 'Owners', dataSource: ownerData, textField: 'text', idField: 'id', colorField: 'color' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example showcases how to select the multiple events and drag them simultaneously. We can select multiple events by pressing the CTRL key with a click. We can also drag the multiple events from one resource to another resource.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, ",
                React.createElement("code", null, "allowMultiDrag"),
                " property is set as ",
                React.createElement("code", null, "true"),
                " to drag the multiple selected events simultaneously . We can simply reschedule the multiple events in single drag action. We can select multiple events by pressing the CTRL key. Once the events are selected, we can leave the CTRL key and start dragging the event."),
            React.createElement("p", null, "Here, we can also drag the multiple events from one resource to another resource. In this case, if all the selected events are in the different resources, then all the events should be moved to the single resource which is related to the target event."))));
};
exports.default = MultiDrag;
