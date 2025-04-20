"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
require("./list-style.css");
function Formatting() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //initial time variable declaration
    var startTime;
    var value = new Date();
    var timeObj;
    // scrollTo value will be assigned only if the timepicker value is not null or undefined and is a valid value.
    function onOpen(args) {
        if (timeObj.value && !isNaN(+timeObj.value))
            //assign the current value as the scrollTo value
            timeObj.scrollTo = timeObj.value;
    }
    //item render event handler
    function itemRenderHandler(args) {
        // inner element declaration for text
        var span = document.createElement('span');
        if (args.value.getHours() === 0 && args.value.getMinutes() === 0 && args.value.getSeconds() === 0) {
            //assign the initial value to the variable
            startTime = args.value;
        }
        //get the minutes details
        var minutes = (+args.value - +startTime) / 60000;
        //get the hours details
        var hours = parseInt('' + (minutes / 60), 10);
        var mins = (minutes % 60) / 6;
        //displayed text formation for each LI element.
        var minText;
        if (minutes === 0 || minutes === 30) {
            minText = minutes + ' mins';
        }
        else {
            minText = (mins > 0) ? ('.' + mins) : '';
        }
        span.innerHTML = ' (' + ((hours > 0) ? (hours + minText + ' hrs') : ('' + ' mins')) + ')';
        //disable the specific time from the selection
        if ((minutes / 60) % 3 === 0) {
            //disable the time values by addeding the e-disabled class.
            args.element.classList.add('e-disabled');
        }
        //append the custom SPAN element into LI element
        args.element.appendChild(span);
    }
    return (React.createElement("div", { className: 'control-pane default' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'timepicker-control-section' },
                React.createElement(ej2_react_calendars_1.TimePickerComponent, { cssClass: 'e-custom-style', value: value, ref: function (Timepicker) { return timeObj = Timepicker; }, open: onOpen.bind(this), itemRender: itemRenderHandler.bind(this) }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the popup list element in specific time duration. Click/Touch the TimePicker popup icon to select the desired value.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The Time Duration sample illustrates, how to customize or disable the time values in time list popup by using",
                React.createElement("code", null, "itemRender"),
                " event. Here, all the time values has addition information on duration between them in sequence and some of the values are disabled through itemRender event by adding the ",
                React.createElement("code", null, "e-disabled"),
                " class.By using the",
                React.createElement("code", null, "scrollTo"),
                " can set the scroll position to the given value when no value is selected or the selected value is not availble in the timepicker popup list."),
            React.createElement("p", null,
                " \tMore information about TimePicker and it's configuration can be found in the  ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/timepicker/getting-started/#adding-timepicker-component-to-the-application' }, "documentation"),
                "  section."))));
}
exports.default = Formatting;
