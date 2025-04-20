"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_schedule_1 = require("@syncfusion/ej2-react-schedule");
require("./recurrence-editor-rule.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
/**
 * Recurrence editor populate rule
 */
var PopulateRule = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var recObject = (0, react_1.useRef)(null);
    var datas = [
        { rule: 'FREQ=DAILY;INTERVAL=1' },
        { rule: 'FREQ=DAILY;INTERVAL=2;UNTIL=20410606T000000Z' },
        { rule: 'FREQ=DAILY;INTERVAL=2;COUNT=8' },
        { rule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1;UNTIL=20410729T000000Z' },
        { rule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1;UNTIL=20410729T000000Z' },
        { rule: 'FREQ=MONTHLY;BYDAY=FR;BYSETPOS=2;INTERVAL=1' },
        { rule: 'FREQ=YEARLY;BYDAY=MO;BYSETPOS=-1;INTERVAL=1;COUNT=5' }
    ];
    var fields = { text: 'rule', value: 'rule' };
    var onChange = function (e) {
        recObject.current.setRecurrenceRule(e.value);
    };
    return (React.createElement("div", { className: 'schedule-control-section' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'recurrence-editor-wrap' },
                React.createElement("div", { style: { paddingBottom: '15px' } },
                    "Select Rule",
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: 'RecurrenceList', dataSource: datas, index: 2, fields: fields, change: onChange, popupHeight: '200px' })),
                React.createElement("div", { className: 'RecurrenceEditor' },
                    React.createElement(ej2_react_schedule_1.RecurrenceEditorComponent, { id: 'RecurrenceEditor', ref: recObject, value: datas[2].rule })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This demo showcases how to fill the recurrence editor fields with appropriate values based on the user-provided recurrence rule string.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "In this demo, the ",
                React.createElement("code", null, "setRecurrenceRule"),
                " method is used to populate the fields of recurrence editor based on the static rule options selected from the dropdown list."))));
};
exports.default = PopulateRule;
