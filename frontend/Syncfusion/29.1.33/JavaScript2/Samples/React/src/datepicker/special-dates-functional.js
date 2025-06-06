"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./special-style.css");
var Special = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dateValue = new Date('1/7/2017');
    var specialDate = function (args, name) {
        var span = document.createElement('span');
        span.setAttribute('class', 'e-icons highlight');
        args.element.firstElementChild.setAttribute('title', name + '!');
        (0, ej2_base_1.addClass)([args.element], ['e-day', 'special', name.toLowerCase()]);
        args.element.setAttribute('data-val', name + '!');
        args.element.setAttribute('title', name + '!');
        args.element.appendChild(span);
    };
    var customDates = function (args) {
        /*Date need to be customized*/
        if (args.date.getDate() === 10) {
            specialDate(args, "Birthday");
        }
        if (args.date.getDate() === 15) {
            specialDate(args, "Farewell");
        }
        if (args.date.getDate() === 25) {
            specialDate(args, "Vacation");
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'datepicker-control-section' },
                React.createElement(ej2_react_calendars_1.DatePickerComponent, { renderDayCell: customDates.bind(_this), value: dateValue, cssClass: 'e-customStyle' }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "In the following sample, specific dates are ",
                React.createElement("code", null, "highlighted"),
                ". In desktop mode highlighted information about the date will be displayed when hovered.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Special Dates sample demonstrates, how to customize a specific dates in a datepicker by using",
                React.createElement("code", null, "renderDayCell"),
                " event. This event gets triggered on each day cell element creation that allows you to customize or disable the specific dates in datepicker. Here 10, 15 and 25 date's are customized with custom styles by adding ",
                React.createElement("code", null, "e-customStyle"),
                " class."),
            React.createElement("p", null,
                "More information on the DatePicker customization can be found in the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/datepicker/customization/", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Special;
