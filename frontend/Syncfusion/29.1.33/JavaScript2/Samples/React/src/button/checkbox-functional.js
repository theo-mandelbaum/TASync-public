"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./checkbox.css");
var CheckBox = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('CheckBox: true'), label = _a[0], setLabel = _a[1];
    // function to handle the CheckBox change event
    var onChange = function (args) {
        setLabel('CheckBox: ' + args.checked);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'checkbox-control' },
                React.createElement("div", { className: 'row' },
                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: label, change: onChange.bind(_this) })),
                React.createElement("div", { className: 'row' },
                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { label: 'Checked, Disabled', disabled: true, checked: true })),
                React.createElement("div", { className: 'row' },
                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { label: 'Indeterminate, Disabled', indeterminate: true, disabled: true })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the CheckBox. Click the CheckBox element to toggle states between checked/unchecked.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "CheckBox is a graphical user interface element that allows to select one or more options from the choices. It contains checked, unchecked, and indeterminate states."),
            React.createElement("p", null,
                "In this sample, checked state is achieved by using the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/check-box/#checked" },
                    React.createElement("code", null, "checked")),
                " property, indeterminate state is achieved by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/check-box/#indeterminate" },
                    React.createElement("code", null, "indeterminate")),
                " property, and disabled state is achieved by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/check-box/#disabled" },
                    React.createElement("code", null, "disabled")),
                " property."),
            React.createElement("p", null,
                "More information about CheckBox can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/check-box/getting-started" }, "documentation section"),
                "."))));
};
exports.default = CheckBox;
