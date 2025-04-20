"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./resource.css");
var sample_base_1 = require("../common/sample-base");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
var Resource = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var ownerOneObj = (0, react_1.useRef)(null);
    var ownerTwoObj = (0, react_1.useRef)(null);
    var ownerThreeObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.resourceSampleData, null, true);
    var resourceData = [
        { Text: 'Margaret', Id: 1, Color: '#ea7a57' },
        { Text: 'Robert', Id: 2, Color: '#df5286' },
        { Text: 'Laura', Id: 3, Color: '#865fcf' }
    ];
    var onChange = function () {
        var predicate;
        var checkBoxes = [ownerOneObj.current, ownerTwoObj.current, ownerThreeObj.current];
        checkBoxes.forEach(function (checkBoxObj) {
            if (checkBoxObj.checked) {
                if (predicate) {
                    predicate = predicate.or('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                }
                else {
                    predicate = new ej2_data_1.Predicate('OwnerId', 'equal', parseInt(checkBoxObj.value, 10));
                }
            }
        });
        scheduleObj.current.eventSettings.query = new ej2_data_1.Query().where(predicate);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'resource', width: '100%', height: '650px', selectedDate: new Date(2021, 5, 6), ref: scheduleObj, eventSettings: { dataSource: data } },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'OwnerId', title: 'Owners', name: 'Owners', allowMultiple: true, dataSource: resourceData, textField: 'Text', idField: 'Id', colorField: 'Color' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Resources", className: 'property-panel-table' },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: ownerOneObj, value: '1', id: 'margaret', cssClass: 'margaret', checked: true, label: 'Margaret', change: onChange }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: ownerTwoObj, value: '2', id: 'robert', cssClass: 'robert', checked: true, label: 'Robert', change: onChange }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { ref: ownerThreeObj, value: '3', id: 'laura', cssClass: 'laura', checked: true, label: 'Laura', change: onChange }))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates how to dynamically show or hide the appointments of resources on Scheduler based on the resource selection.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the resource appointments are dynamically shown or hidden on the Scheduler, by passing the filtered event data of selected resources to the ",
                React.createElement("code", null, "query"),
                " option of the ",
                React.createElement("code", null, "eventSettings"),
                "."))));
};
exports.default = Resource;
