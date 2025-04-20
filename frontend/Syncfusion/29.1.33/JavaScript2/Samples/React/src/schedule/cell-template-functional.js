"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./cell-template.css");
var sample_base_1 = require("../common/sample-base");
/**
 * Schedule cell template sample
 */
var CellTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], null, true);
    var getCellContent = function (date) {
        if (date.getMonth() === 10 && date.getDate() === 23) {
            return '<img src= "src/schedule/images/thanksgiving-day.svg" alt="Thanksgiving day"/><div className="caption">Thanksgiving day</div>';
        }
        else if (date.getMonth() === 11 && date.getDate() === 9) {
            return '<img src="src/schedule/images/get-together.svg" alt="Party time"/><div className="caption">Party time</div>';
        }
        else if (date.getMonth() === 11 && date.getDate() === 13) {
            return '<img src="src/schedule/images/get-together.svg" alt="Party time"/><div className="caption">Party time</div>';
        }
        else if (date.getMonth() === 11 && date.getDate() === 22) {
            return '<img src="src/schedule/images/birthday.svg" alt="Happy birthday"/><div className="caption">Happy birthday</div>';
        }
        else if (date.getMonth() === 11 && date.getDate() === 24) {
            return '<img src="src/schedule/images/christmas-eve.svg" alt="Christmas Eve"/><div className="caption">Christmas Eve</div>';
        }
        else if (date.getMonth() === 11 && date.getDate() === 25) {
            return '<img src="src/schedule/images/christmas.svg" alt="Christmas Day"/><div className="caption">Christmas Day</div>';
        }
        else if (date.getMonth() === 0 && date.getDate() === 1) {
            return '<img src="src/schedule/images/newyear.svg" alt="New year"/><div className="caption">New Year\'s Day</div>';
        }
        else if (date.getMonth() === 0 && date.getDate() === 14) {
            return '<img src="src/schedule/images/get-together.svg" alt="Get together"/><div className="caption">Get together</div>';
        }
        else {
            return '';
        }
    };
    var cellTemplate = function (props) {
        if (props.type === "monthCells") {
            return (React.createElement("div", { className: "templatewrap", dangerouslySetInnerHTML: { __html: getCellContent(props.date) } }));
        }
        return;
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-12 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'cell-template', width: '100%', height: '650px', selectedDate: new Date(2021, 11, 15), cellTemplate: cellTemplate, eventSettings: { dataSource: data } },
                    React.createElement(ej2_react_schedule_1.ViewsDirective, null,
                        React.createElement(ej2_react_schedule_1.ViewDirective, { option: 'Month' })),
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Month, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo illustrates how to customize the background of the specific date cells by adding images and custom text to it by using the cell template option.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null, "cellTemplate"),
                " option which accepts the template string is used to customize the cell background with specific images and appropriate text on the given date values."))));
};
exports.default = CellTemplate;
