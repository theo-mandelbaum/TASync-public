"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_calendars_1 = require("@syncfusion/ej2-react-calendars");
var ej2_react_buttons_2 = require("@syncfusion/ej2-react-buttons");
require("./print.css");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./datasource.json");
/**
 *  Schedule print sample
 */
var PrintSchedule = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('e-height-row e-hide-row'), heightRow = _a[0], setHeightRow = _a[1];
    var _b = (0, react_1.useState)('e-width-row e-hide-row'), widthRow = _b[0], setWidthRow = _b[1];
    var _c = (0, react_1.useState)('e-selected-date-row e-hide-row'), dateRow = _c[0], setDateRow = _c[1];
    var scheduleObj = (0, react_1.useRef)(null);
    var printWithOptionsObj = (0, react_1.useRef)(null);
    var heightObj = (0, react_1.useRef)(null);
    var widthObj = (0, react_1.useRef)(null);
    var selectedDateObj = (0, react_1.useRef)(null);
    var data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
    var printHeightAndWidthData = ['auto', '100%', '500px'];
    var onChange = function (args) {
        if (args.checked) {
            setHeightRow('e-height-row');
            setWidthRow('e-width-row');
            setDateRow('e-selected-date-row');
        }
        else {
            setHeightRow('e-height-row e-hide-row');
            setWidthRow('e-width-row e-hide-row');
            setDateRow('e-selected-date-row e-hide-row');
        }
    };
    var onPrintClick = function () {
        if (printWithOptionsObj.current.checked) {
            var printOptions = {
                height: heightObj.current.value,
                width: widthObj.current.value,
                selectedDate: selectedDateObj.current.value
            };
            scheduleObj.current.print(printOptions);
        }
        else {
            scheduleObj.current.print();
        }
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'col-lg-9 control-section' },
            React.createElement("div", { className: 'control-wrapper' },
                React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'print', width: '100%', height: '650px', id: 'schedule', ref: scheduleObj, selectedDate: new Date(2021, 0, 10), eventSettings: { dataSource: data } },
                    React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop, ej2_react_schedule_1.Print] })))),
        React.createElement("div", { className: 'col-lg-3 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table schedule-print-property-panel' },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { height: '50px' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { labelPosition: "Before", label: "Print with options", ref: printWithOptionsObj, change: onChange })))),
                        React.createElement("tr", { className: heightRow },
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "heightElement", placeholder: "Height", floatLabelType: "Always", ref: heightObj, value: 'auto', dataSource: printHeightAndWidthData })))),
                        React.createElement("tr", { className: widthRow },
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "widthElement", placeholder: "Width", floatLabelType: "Always", ref: widthObj, value: 'auto', dataSource: printHeightAndWidthData })))),
                        React.createElement("tr", { className: dateRow },
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_calendars_1.DatePickerComponent, { id: "selectedDateElement", placeholder: "Selected date", floatLabelType: "Always", ref: selectedDateObj, value: new Date(2021, 0, 10) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '15px', textAlign: 'center' } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_2.ButtonComponent, { iconCss: "e-icons e-print", cssClass: "e-print-btn", onClick: onPrintClick }, "Print")))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This example demonstrates how to print the Scheduler element at client-side.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this example, the Scheduler element is Printed by making use of the public method ",
                React.createElement("code", null, "print"),
                "."),
            React.createElement("p", null,
                "Also, we can print the schedule based on the custom rendering by passing the ",
                React.createElement("code", null, "ScheduleModel"),
                " in the ",
                React.createElement("code", null, "print"),
                " method. In the above demo, we have demonstrated the ",
                React.createElement("code", null, "print"),
                " method with the below properties of the ",
                React.createElement("code", null, "ScheduleModel"),
                "."),
            React.createElement("ul", null,
                React.createElement("li", null, "height"),
                React.createElement("li", null, "width"),
                React.createElement("li", null, "selectedDate")),
            React.createElement("strong", null, "Module Injection"),
            React.createElement("p", null,
                "To start using Print functionality in Scheduler, we need to inject ",
                React.createElement("code", null, "Print"),
                " module into the services."))));
};
exports.default = PrintSchedule;
