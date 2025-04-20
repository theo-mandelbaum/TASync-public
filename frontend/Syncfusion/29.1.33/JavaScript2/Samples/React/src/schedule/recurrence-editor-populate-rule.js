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
exports.PopulateRule = void 0;
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./recurrence-editor-rule.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
/**
 * Recurrence editor populate rule
 */
var PopulateRule = /** @class */ (function (_super) {
    __extends(PopulateRule, _super);
    function PopulateRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.datas = [
            { rule: 'FREQ=DAILY;INTERVAL=1' },
            { rule: 'FREQ=DAILY;INTERVAL=2;UNTIL=20410606T000000Z' },
            { rule: 'FREQ=DAILY;INTERVAL=2;COUNT=8' },
            { rule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;UNTIL=20410729T000000Z' },
            { rule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1;UNTIL=20410729T000000Z' },
            { rule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1' },
            { rule: 'FREQ=YEARLY;BYDAY=MO;BYSETPOS=-1;INTERVAL=1;COUNT=5' }
        ];
        _this.fields = { text: 'rule', value: 'rule' };
        return _this;
    }
    PopulateRule.prototype.onChange = function (e) {
        this.recObject.setRecurrenceRule(e.value);
    };
    PopulateRule.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'recurrence-editor-wrap' },
                    React.createElement("div", { style: { paddingBottom: '15px' } },
                        "Select Rule",
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'RecurrenceList', dataSource: this.datas, index: 2, fields: this.fields, change: this.onChange.bind(this), popupHeight: '200px' })),
                    React.createElement("div", { className: 'RecurrenceEditor' },
                        React.createElement(ej2_react_schedule_1.RecurrenceEditorComponent, { id: 'RecurrenceEditor', ref: function (t) { return _this.recObject = t; }, value: this.datas[2].rule })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This demo showcases how to fill the recurrence editor fields with appropriate values based on the user-provided recurrence rule string.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, the ",
                    React.createElement("code", null, "setRecurrenceRule"),
                    " method is used to populate the fields of recurrence editor based on the static rule options selected from the dropdown list."))));
    };
    return PopulateRule;
}(sample_base_1.SampleBase));
exports.PopulateRule = PopulateRule;
