"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./recurrence-editor-rule.css");
var sample_base_1 = require("../common/sample-base");
/**
 * Recurrence editor generate rule
 */
var RuleGenerate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('FREQ=DAILY;INTERVAL=2;COUNT=8'), ruleOutput = _a[0], setRuleOutput = _a[1];
    var onChange = function (args) {
        setRuleOutput(args.value);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'recurrence-editor-wrap' },
                React.createElement("div", { className: 'generate-rule', style: { paddingBottom: '15px' } },
                    React.createElement("label", null, "Rule Output"),
                    React.createElement("div", { className: 'rule-output-container' },
                        React.createElement("div", { id: 'rule-output' }, ruleOutput))),
                React.createElement("div", { className: 'RecurrenceEditor' },
                    React.createElement(ej2_react_schedule_1.RecurrenceEditorComponent, { id: 'RecurrenceEditor', value: ruleOutput, change: onChange })))),
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
exports.default = RuleGenerate;
