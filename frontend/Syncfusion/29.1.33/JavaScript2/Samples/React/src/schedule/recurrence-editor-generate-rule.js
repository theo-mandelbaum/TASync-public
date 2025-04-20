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
exports.RuleGenerate = void 0;
var React = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./recurrence-editor-rule.css");
var sample_base_1 = require("../common/sample-base");
/**
 * Recurrence editor generate rule
 */
var RuleGenerate = /** @class */ (function (_super) {
    __extends(RuleGenerate, _super);
    function RuleGenerate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.recRule = 'FREQ=DAILY;INTERVAL=2;COUNT=8';
        return _this;
    }
    RuleGenerate.prototype.onChange = function (args) {
        var outputElement = document.querySelector('#rule-output');
        outputElement.innerText = args.value;
    };
    RuleGenerate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'schedule-control-section' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'recurrence-editor-wrap' },
                    React.createElement("div", { className: 'generate-rule', style: { paddingBottom: '15px' } },
                        React.createElement("label", null, "Rule Output"),
                        React.createElement("div", { className: 'rule-output-container' },
                            React.createElement("div", { id: 'rule-output' }, this.recRule))),
                    React.createElement("div", { className: 'RecurrenceEditor' },
                        React.createElement(ej2_react_schedule_1.RecurrenceEditorComponent, { id: 'RecurrenceEditor', value: this.recRule, ref: function (t) { return _this.recObject = t; }, change: this.onChange.bind(this) })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null,
                    "This demo showcases the recurrence rule generation based on the options selected from the Recurrence editor and it usually follows the ",
                    React.createElement("a", { "aria-label": "iCalender", href: 'https://tools.ietf.org/html/rfc5545#section-3.3.10', target: '_blank' }, "iCalendar"),
                    " specifications. This generated recurrence rule string is a valid one to be used with the Scheduler event\u2019s recurrence rule field.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In this demo, a specific rule has been set to the recurrence editor manually by making use of the ",
                    React.createElement("code", null, "setRecurrenceRule"),
                    " method which will be displayed on the label placed at the top of it. Also, when the user dynamically change the options in recurrence editor, the modified rule value as per the selection will be displayed on it which is retrieved within the ",
                    React.createElement("code", null, "change"),
                    " event."))));
    };
    return RuleGenerate;
}(sample_base_1.SampleBase));
exports.RuleGenerate = RuleGenerate;
