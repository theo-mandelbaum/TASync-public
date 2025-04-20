"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./range-style.css");
function Range() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var endObject;
    var startObject;
    var checkObj;
    var isStartTimeChange = true;
    var endTimeInput;
    var value;
    function rendereComplete() {
        endTimeInput = document.getElementById('maxtimepick');
    }
    function changeTime() {
        /*To determine whether we have selected business hours or not*/
        isStartTimeChange = false;
        if (checkObj.checked) {
            /*Business hours*/
            startObject.value = new Date('9/6/2017 9:00');
            endObject.enabled = true;
            endObject.value = new Date('9/6/2017 18:00');
            startObject.readonly = true;
            endObject.readonly = true;
        }
        else {
            endObject.value = null;
            startObject.value = null;
            endTimeInput.value = '';
            startObject.readonly = false;
            endObject.readonly = false;
            endObject.enabled = false;
        }
    }
    function onEnableEndTime(args) {
        /*Enables end time if start time is selected*/
        if (isStartTimeChange) {
            endObject.enabled = true;
            endObject.value = null;
            endTimeInput.value = '';
            value = new Date(args.value);
            value.setMinutes(value.getMinutes() + endObject.step);
            endObject.min = value;
        }
        else {
            isStartTimeChange = true;
        }
    }
    return (React.createElement("div", { className: 'control-pane range' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'timepicker-control-section range' },
                React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: "mintimepick", ref: function (mintimepick) { startObject = mintimepick; }, change: onEnableEndTime.bind(this) })),
            React.createElement("div", { className: 'timepicker-control-section range' },
                React.createElement(ej2_react_calendars_1.TimePickerComponent, { id: "maxtimepick", enabled: false, ref: function (maxtimepick) { endObject = maxtimepick; } })),
            React.createElement("div", { className: 'timepicker-control-section range' },
                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "checkbox", ref: function (checkbox) { checkObj = checkbox; }, label: "Business Hours", change: changeTime.bind(this) }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "Select a start time from the first TimePicker and then the second TimePicker will be enabled. Select an end time from the second TimePicker to get a ",
                React.createElement("code", null, "time range"),
                ". Click/Touch the Business Hours checkbox to change both the TimePickers to ",
                React.createElement("code", null, "read-only"),
                " state.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null, "Time Range sample illustrates the appointment time selection scenario with the start and end time option. Here, two TimePicker components are used to select the start and end time."),
            React.createElement("p", null,
                "Before the start time selection, the end time TimePicker is in disable state. When the start time is selected, then you will be able to select the end time or else, need to select the entire business hours 9:00 to 18:00 from the ",
                React.createElement("code", null, "Business Hours"),
                " option. Once the options are checked, both the TimePicker components goes to readonly state."),
            React.createElement("p", null,
                "More information about time range restriction can be found in the  ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/timepicker/time-range/' }, "documentation"),
                "  section."))));
}
exports.default = Range;
