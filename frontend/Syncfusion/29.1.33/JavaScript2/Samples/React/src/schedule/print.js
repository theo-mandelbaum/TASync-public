"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintSchedule = void 0;
var React = require("react");
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
var PrintSchedule = /** @class */ (function (_super) {
    __extends(PrintSchedule, _super);
    function PrintSchedule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = (0, ej2_base_1.extend)([], dataSource.scheduleData, null, true);
        _this.printHeightAndWidthData = ['auto', '100%', '500px'];
        return _this;
    }
    PrintSchedule.prototype.onChange = function (args) {
        var classList = ['.e-height-row', '.e-width-row', '.e-selected-date-row'];
        for (var i = 0; i < classList.length; i++) {
            var element = document.querySelector(classList[i]);
            if (args.checked) {
                element.classList.remove('e-hide-row');
            }
            else {
                element.classList.add('e-hide-row');
            }
        }
    };
    PrintSchedule.prototype.onPrintClick = function () {
        if (this.printWithOptionsObj.checked) {
            var printOptions = {
                height: this.heightObj.value,
                width: this.widthObj.value,
                selectedDate: this.selectedDateObj.value
            };
            this.scheduleObj.print(printOptions);
        }
        else {
            this.scheduleObj.print();
        }
    };
    PrintSchedule.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'col-lg-9 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_schedule_1.ScheduleComponent, { cssClass: 'print', width: '100%', height: '650px', id: 'schedule', ref: function (t) { return _this.scheduleObj = t; }, selectedDate: new Date(2021, 0, 10), eventSettings: { dataSource: this.data } },
                        React.createElement(ej2_react_schedule_1.Inject, { services: [ej2_react_schedule_1.Day, ej2_react_schedule_1.Week, ej2_react_schedule_1.WorkWeek, ej2_react_schedule_1.Month, ej2_react_schedule_1.Agenda, ej2_react_schedule_1.Resize, ej2_react_schedule_1.DragAndDrop, ej2_react_schedule_1.Print] })))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table schedule-print-property-panel' },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { height: '50px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { labelPosition: "Before", label: "Print with options", ref: function (t) { return _this.printWithOptionsObj = t; }, change: this.onChange.bind(this) })))),
                            React.createElement("tr", { className: "e-height-row e-hide-row" },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "heightElement", placeholder: "Height", floatLabelType: "Always", ref: function (t) { return _this.heightObj = t; }, value: 'auto', dataSource: this.printHeightAndWidthData })))),
                            React.createElement("tr", { className: "e-width-row e-hide-row" },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "widthElement", placeholder: "Width", floatLabelType: "Always", ref: function (t) { return _this.widthObj = t; }, value: 'auto', dataSource: this.printHeightAndWidthData })))),
                            React.createElement("tr", { className: "e-selected-date-row e-hide-row" },
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_calendars_1.DatePickerComponent, { id: "selectedDateElement", placeholder: "Selected date", floatLabelType: "Always", ref: function (t) { return _this.selectedDateObj = t; }, value: new Date(2021, 0, 10) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '15px', textAlign: 'center' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_2.ButtonComponent, { iconCss: "e-icons e-print", cssClass: "e-print-btn", onClick: this.onPrintClick.bind(this) }, "Print")))))))),
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
    return PrintSchedule;
}(sample_base_1.SampleBase));
exports.PrintSchedule = PrintSchedule;
