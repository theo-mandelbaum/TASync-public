"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var helper_1 = require("./helper");
require("./date-header-template.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
/**
 * Schedule date header template sample
 */
var DateHeaderTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var scheduleObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
    var instance = new ej2_base_1.Internationalization();
    var getDateHeaderText = function (value) {
        return instance.formatDate(value, { skeleton: 'Ed' });
    };
    var getWeather = function (value) {
        switch (value.getDay()) {
            case 0:
                return '<img class="weather-image"  src= "src/schedule/images/weather-clear.svg" alt="Clear weather"/><div class="weather-text">25°C</div>';
            case 1:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg" alt="Clouds weather"/><div class="weather-text">18°C</div>';
            case 2:
                return '<img class="weather-image" src="src/schedule/images/weather-rain.svg" alt="Rain weather"/><div class="weather-text">10°C</div>';
            case 3:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg" alt="Clouds weather"/><div class="weather-text">16°C</div>';
            case 4:
                return '<img class="weather-image" src="src/schedule/images/weather-rain.svg" alt="Rain weather"/><div class="weather-text">8°C</div>';
            case 5:
                return '<img class="weather-image" src="src/schedule/images/weather-clear.svg" alt="Clear weather"/><div class="weather-text">27°C</div>';
            case 6:
                return '<img class="weather-image" src="src/schedule/images/weather-clouds.svg" alt="Clouds weather"/><div class="weather-text">17°C</div>';
            default:
                return null;
        }
    };
    var dateHeaderTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement("div", null, getDateHeaderText(props.date)),
            React.createElement("div", { className: "date-text", dangerouslySetInnerHTML: { __html: getWeather(props.date) } })));
    };
    var onRenderCell = function (args) {
        if (args.elementType === 'monthCells' && scheduleObj.current.currentView === 'Month') {
            var ele = document.createElement('div');
            ele.innerHTML = getWeather(args.date);
            (args.element).appendChild(ele.firstChild);
        }
    };
    var onEventRendered = function (args) {
        (0, helper_1.applyCategoryColor)(args, scheduleObj.current.currentView);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { width: '100%', height: '650px', cssClass: 'schedule-date-header-template', ref: scheduleObj, renderCell: onRenderCell, eventRendered: onEventRendered, selectedDate: new Date(2021, 0, 10), eventSettings: { dataSource: data }, dateHeaderTemplate: dateHeaderTemplate },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Day' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Week' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'WorkWeek' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' }),
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'TimelineMonth' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.TimelineMonth, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo depicts the way to add images and custom text to the date header bar by making use of the date header template option.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null, "dateHeaderTemplate"),
                " option is used to customize the date header cells of day, week and workweek views. In month view, the date header is not applicable and therefore the same customizations can be added beside the date text in the month cells by making use of the ",
                React.createElement("code", null, "renderCells"),
                " event."))));
};
exports.default = DateHeaderTemplate;
