"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./position.css");
var Positioning = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var footerTemplate;
    var buttonEle;
    var _a = (0, react_1.useState)('none'), display = _a[0], setDisplay = _a[1];
    var _b = (0, react_1.useState)(true), status = _b[0], setStatus = _b[1];
    var _c = (0, react_1.useState)({ X: 'center', Y: 'center' }), position = _c[0], setPosition = _c[1];
    var _d = (0, react_1.useState)(' X: "Center", Y: "Center"'), posValue = _d[0], setPosValue = _d[1];
    var buttonRef = function (element) {
        buttonEle = element;
    };
    footerTemplate = '<span id="posvalue" style="float:left;margin-left:8px;padding:10px;">Position: { posValue }</span>';
    var buttonClick = function () {
        setStatus(true);
    };
    var changePosition = function (event) {
        setPosition({
            X: event.currentTarget.value.split(' ')[0],
            Y: event.currentTarget.value.split(' ')[1],
        });
        setPosValue('Position: {X: "' + event.currentTarget.value.split(' ')[0] + '", Y: "' + event.currentTarget.value.split(' ')[1] + '"}');
    };
    var dialogClose = function () {
        setStatus(false);
        setDisplay('inline-block');
    };
    var dialogOpen = function () {
        setStatus(true);
        setDisplay('none');
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { id: "target", className: "col-lg-12 control-section dialog-position" },
            React.createElement("button", { className: "e-control e-btn dlgbtn", ref: buttonRef, onClick: buttonClick, id: "dialogBtn", style: { display: display } }, "Open Dialog"),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "positionDialog", header: "Choose a Dialog Position", width: "452px", visible: status, showCloseIcon: true, position: position, footerTemplate: footerTemplate, target: "#target", open: dialogOpen, close: dialogClose, closeOnEscape: false },
                React.createElement("table", { id: "poschange" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio1", label: "Left Top", value: "left top", name: "xy", onClick: changePosition })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio2", label: "Center Top", value: "center top", name: "xy", onClick: changePosition })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio3", label: "Right Top", value: "right top", name: "xy", onClick: changePosition }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio4", label: "Left Center", value: "left center", name: "xy", onClick: changePosition })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio5", checked: true, label: "Center Center", value: "center center", name: "xy", onClick: changePosition })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio6", label: "Right Center", value: "right center", name: "xy", onClick: changePosition }))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio7", label: "Left Bottom", value: "left bottom", name: "xy", onClick: changePosition })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio8", label: "Center Bottom", value: "center bottom", name: "xy", onClick: changePosition })),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: "radio9", label: "Right Bottom", value: "right bottom", name: "xy", onClick: changePosition })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to position the dialog component. Select the appropriate radio button to position where the dialog is displayed. The current position of the dialog is at the bottom. Enable the \"open dialog\" button to reopen the dialog if it is closed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "By default, the dialog is displayed in the center of the target container. Use the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/dialog/#position" }, "position"),
                    "property to set location where the dialog displays relative to the target. The property point-out the horizontal and vertical coordinates. You can set position with specific X and Y coordinates in pixel values."),
                React.createElement("p", null,
                    "More information on the positioning of Dialog can be found in the",
                    ' ',
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#positioning" }, "documentation section"),
                    ".")))));
};
exports.default = Positioning;
