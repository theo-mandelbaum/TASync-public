"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./special-styles.css");
var Special = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(null), selectedValue = _a[0], setSelectedValue = _a[1];
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
        /*Dates need to be customized*/
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
    var onchange = function (args) {
        var title = '';
        if (args.event) {
            /*Displays selected date in the label*/
            title = args.event.currentTarget.classList.contains('e-selected') ? args.event.currentTarget.getAttribute('data-val') : args.event.currentTarget.getElementsByClassName('e-selected').length > 0
                ? args.event.currentTarget.getElementsByClassName('e-selected')[0].getAttribute('data-val') : null;
            title = title == null ? '' : ' ( ' + title + ' )';
        }
        setSelectedValue(args.value.toLocaleDateString() + title);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'calendar-control-section', style: { overflow: 'auto' } },
                React.createElement(ej2_react_calendars_1.CalendarComponent, { renderDayCell: customDates.bind(_this), change: onchange, className: 'e-customStyle' }),
                React.createElement("label", { id: 'date_label' },
                    "Selected Value:",
                    selectedValue))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "In the following sample, specific dates are ",
                React.createElement("code", null, "highlighted"),
                ". In desktop mode highlighted information about the date will be displayed when hovered.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "Special Dates sample demonstrates, how to customize a specific dates in a calendar by using renderDayCell event. This event gets triggered on each day cell element creation that allows you to customize or disable the specific dates in calendar. Here 10, 15 and 25 date's are customized with custom styles by adding the ",
                React.createElement("code", null, "e-customStyle"),
                " class."),
            React.createElement("p", null,
                "More information on the customization can be found in this ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/calendar/customization/#day-cell-format' }, " documentation"),
                " section."))));
};
exports.default = Special;
