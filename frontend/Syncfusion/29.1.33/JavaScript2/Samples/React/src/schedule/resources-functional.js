"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./resources.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
/**
 * schedule resources fare-calendar sample
 */
var Resources = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dManager = [];
    var initialLoad = true;
    var scheduleObj = (0, react_1.useRef)(null);
    var instance = new ej2_base_1.Internationalization();
    var resourceData = [
        { text: 'Airways 1', id: 1 },
        { text: 'Airways 2', id: 2 },
        { text: 'Airways 3', id: 3 }
    ];
    var getAirwaysName = function (value) {
        return (value === 1) ? 'Airways 1' : (value === 2) ? 'Airways 2' : 'Airways 3';
    };
    var getAirwaysImage = function (value) {
        return (value === 1) ? 'airways-1' : (value === 2) ? 'airways-2' : 'airways-3';
    };
    var getFormattedTime = function (date) {
        return instance.formatDate(date, { skeleton: 'Hm' });
    };
    var onActionBegin = function (args) {
        if (args.requestType === 'toolbarItemRendering') {
            args.items[2].align = 'Center';
            args.items[2].suffixIcon = '';
            args.items = args.items.splice(2, 1);
        }
    };
    var onDataBinding = function () {
        if (initialLoad) {
            scheduleObj.current.eventSettings.dataSource = generateEvents(scheduleObj.current);
            initialLoad = false;
        }
    };
    var onDataBound = function () {
        var eventCollections = scheduleObj.current.getCurrentViewEvents();
        eventCollections.sort(function (a, b) { return a.Fare - b.Fare; });
        var indexDate = new Date(eventCollections[0].StartTime.getTime());
        indexDate.setHours(0, 0, 0, 0);
        var index = scheduleObj.current.getIndexOfDate(scheduleObj.current.activeView.renderDates, indexDate);
        var target = scheduleObj.current.element.querySelectorAll('.e-work-cells')[index];
        (0, ej2_base_1.addClass)([target], 'best-price');
        target.appendChild((0, ej2_base_1.createElement)('div', { className: 'best-price', innerHTML: 'Best Price' }));
    };
    var onPopupOpen = function (args) {
        args.cancel = true;
    };
    var onChange = function (args) {
        var tdElement = scheduleObj.current.element.querySelector('.best-price:not(.e-work-cells)');
        if (tdElement) {
            (0, ej2_base_1.removeClass)([(0, ej2_base_1.closest)(tdElement, 'td')], 'best-price');
            (0, ej2_base_1.remove)(tdElement);
        }
        var scheduleData = (0, ej2_base_1.extend)([], dManager, null, true);
        var selectedResource = [];
        var propertyTable = document.querySelector('.property-panel-table');
        var resourceCollection = [].slice.call(propertyTable.querySelectorAll('.e-resource'));
        resourceCollection.forEach(function (element, index) {
            var resEle = element.querySelector('.e-icons');
            if (resEle && resEle.classList.contains('e-check')) {
                selectedResource.push(index);
            }
        });
        var filteredData = [];
        var resources = scheduleObj.current.resourceBase.resourceCollection.slice(-1)[0].dataSource;
        var _loop_1 = function (resource) {
            var data = scheduleData.filter(function (event) { return resources[resource].id === event.AirlineId; });
            filteredData = filteredData.concat(data);
        };
        for (var _i = 0, selectedResource_1 = selectedResource; _i < selectedResource_1.length; _i++) {
            var resource = selectedResource_1[_i];
            _loop_1(resource);
        }
        filteredData = filterByFare(filteredData, scheduleObj.current);
        scheduleObj.current.eventSettings.dataSource = filteredData;
        scheduleObj.current.dataBind();
    };
    var filterByFare = function (appointments, scheduleObj) {
        var fieldMapping = scheduleObj.eventFields;
        appointments.sort(function (object1, object2) {
            var d1 = +object1[fieldMapping.startTime];
            var d2 = +object2[fieldMapping.startTime];
            var d3 = +object1[fieldMapping.endTime];
            var d4 = +object2[fieldMapping.endTime];
            return ((d1 - d2) || ((d4 - d2) - (d3 - d1)));
        });
        var renderDate = scheduleObj.activeView.getRenderDates();
        var finalData = [];
        for (var _i = 0, renderDate_1 = renderDate; _i < renderDate_1.length; _i++) {
            var date = renderDate_1[_i];
            if (scheduleObj.selectedDate.getMonth() === date.getMonth()) {
                var strTime = new Date(+date);
                var endTime = new Date(new Date(strTime.getTime()).setHours(23, 59, 59, 59));
                var perDayData = scheduleObj.eventBase.filterEvents(strTime, endTime, appointments);
                if (perDayData.length > 0) {
                    perDayData.sort(function (a, b) {
                        return (a.Fare - b.Fare);
                    });
                    finalData.push(perDayData[0]);
                }
            }
        }
        return finalData;
    };
    var generateEvents = function (scheduleObj) {
        var collections = [];
        var dataCollections = [
            {
                Id: 100,
                StartTime: new Date(2021, 3, 1, 8, 30),
                EndTime: new Date(2021, 3, 1, 10, 0),
                AirlineId: 1
            }, {
                Id: 102,
                StartTime: new Date(2021, 3, 1, 11, 0),
                EndTime: new Date(2021, 3, 1, 12, 0),
                AirlineId: 2
            }, {
                Id: 103,
                StartTime: new Date(2021, 3, 1, 14, 0),
                EndTime: new Date(2021, 3, 1, 15, 0),
                AirlineId: 3
            }
        ];
        var start = new Date(2021, 3, 1);
        var dateCollections = Array.apply(null, { length: 30 })
            .map(function (value, index) { return new Date(start.getTime() + (1000 * 60 * 60 * 24 * index)); });
        var id = 1;
        var day = 0;
        for (var _i = 0, dateCollections_1 = dateCollections; _i < dateCollections_1.length; _i++) {
            var date = dateCollections_1[_i];
            var resource = 1;
            for (var _a = 0, dataCollections_1 = dataCollections; _a < dataCollections_1.length; _a++) {
                var data = dataCollections_1[_a];
                var strDate = new Date(data.StartTime.getTime());
                var endDate = new Date(data.EndTime.getTime());
                collections.push({
                    Id: id,
                    StartTime: new Date(strDate.setDate(strDate.getDate() + day)),
                    EndTime: new Date(endDate.setDate(endDate.getDate() + day)),
                    AirlineId: resource,
                    Fare: ((Math.random() * 500) + 100).toFixed(2)
                });
                resource += 1;
                id += 1;
            }
            day += 1;
        }
        dManager = (0, ej2_base_1.extend)([], collections, null, true);
        var filteredCollection = filterByFare(collections, scheduleObj);
        return filteredCollection;
    };
    var template = function (props) {
        return (React.createElement("div", { className: "template-wrap" },
            React.createElement("div", { className: "fare-detail" },
                "$",
                props.Fare),
            React.createElement("div", { className: "airline-name", style: { display: 'flex', paddingLeft: '5px' } },
                React.createElement("div", { className: "airline-logo " + getAirwaysImage(props.AirlineId) }),
                React.createElement("div", { className: "airway-name" }, getAirwaysName(props.AirlineId)))));
    };
    var toolTipTemplate = function (props) {
        return (React.createElement("div", { className: "event-tooltip" },
            React.createElement("div", { className: "airline-header" },
                React.createElement("div", { className: "airline-logo " + getAirwaysImage(props.AirlineId) }),
                React.createElement("div", { className: "airline-name" }, getAirwaysName(props.AirlineId))),
            React.createElement("div", { className: "airline-details text-size" },
                React.createElement("div", { className: "airline-title" }, "Fare Details:"),
                React.createElement("div", { className: "airline-fare" },
                    "$",
                    props.Fare,
                    " per person")),
            React.createElement("div", { className: "airline-flex-row text-size" },
                React.createElement("div", { className: "airline-flex-col airline-title border-right" }, "Arrival"),
                React.createElement("div", { className: "airline-flex-col airline-title text-right" }, "Depature")),
            React.createElement("div", { className: "airline-flex-row text-size" },
                React.createElement("div", { className: "airline-flex-col border-right" }, getFormattedTime(props.StartTime)),
                React.createElement("div", { className: "airline-flex-col margin-right text-right" }, getFormattedTime(props.EndTime)))));
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement("div", { className: 'schedule-demo-heading' }, "Cheapest one way fares from Barcelona to Los Angeles"),
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { ref: scheduleObj, cssClass: 'schedule-resources', width: '100%', height: '650px', readonly: true, selectedDate: new Date(2021, 3, 1), eventSettings: { template: template.bind(_this), enableTooltip: true, tooltipTemplate: toolTipTemplate.bind(_this) }, actionBegin: onActionBegin, dataBinding: onDataBinding, popupOpen: onPopupOpen, dataBound: onDataBound },
                    React.createElement(ej2_react_schedule_1.ResourcesDirective, null,
                        React.createElement(ej2_react_schedule_1.ResourceDirective, { field: 'AirlineId', title: 'Airline', name: 'Airlines', allowMultiple: true, dataSource: resourceData, textField: 'text', idField: 'id' })),
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", { className: 'airways-1' },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'airways-1', cssClass: 'e-resource e-airways-1', checked: true, label: 'Airways 1', change: onChange })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", { className: 'airways-2' },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'airways-2', cssClass: 'e-resource e-airways-2', checked: true, label: 'Airways 2', change: onChange })))),
                        React.createElement("tr", { style: { height: '50px' } },
                            React.createElement("td", { style: { width: '100%' } },
                                React.createElement("div", { className: 'airways-3' },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'airways-3', cssClass: 'e-resource e-airways-3', checked: true, label: 'Airways 3', change: onChange })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This demo illustrates how to customize the scheduler to showcase it as an",
                React.createElement("strong", null, "Airfare calendar"),
                " depicting the lowest available price on each day of a month for a specific route, say between Barcelona and Los Angeles.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, Scheduler initially displays the fare of the airline service which offers lowest price on each day by comparing between the 3 available airlines. Here, the 3 airline services acts as the Scheduler resources. Appointment collection has been dynamically generated for a month (for all the 3 resources) within the",
                React.createElement("code", null, "generateEvents"),
                " method and then filtered externally based on the ascending Fare value within the",
                React.createElement("code", null, "filterByFare"),
                " method. Since each day of the Scheduler needs to display only a single appointment showing the fare value, therefore it\u2019s been queried to take only the first 30 values from the sorted list and assigned it to the Schedule",
                React.createElement("code", null, "dataSource"),
                ". Here, the filtering process needs to be carried out during the",
                React.createElement("code", null, "databinding"),
                " event and therefore, the dataSource of Scheduler is assigned within this event."),
            React.createElement("p", null,
                "Scheduler has been rendered in a readonly mode and therefore no editing actions are allowed here. To customize the look of the appointments that displays the fare value,",
                React.createElement("code", null, "template"),
                " option within the",
                React.createElement("code", null, "eventSettings"),
                " is being used. To highlight the day that holds the overall lowest price of a month, the background color of that day\u2019s cell is customized within the",
                React.createElement("code", null, "dataBound"),
                " event. Also, the tooltip has been enabled with",
                React.createElement("code", null, "template"),
                " option to display the flight details in a customized style."))));
};
exports.default = Resources;
