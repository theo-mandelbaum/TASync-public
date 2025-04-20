"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./position.css");
var Position = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { id: "fabtarget", className: "fab-position-container custom-index" },
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab1", iconCss: 'fab-icons fab-icon-people', title: 'Top Left', position: 'TopLeft', cssClass: "e-success", target: '#fabtarget' }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab2", iconCss: 'fab-icons fab-icon-people', title: 'Top Center', position: 'TopCenter', cssClass: "e-warning", target: '#fabtarget' }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab3", iconCss: 'fab-icons fab-icon-people', title: 'Top Right', position: 'TopRight', cssClass: "e-success", target: '#fabtarget' }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab4", iconCss: 'fab-icons fab-icon-people', title: 'Middle Left', position: 'MiddleLeft', cssClass: "e-warning", target: '#fabtarget' }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab5", iconCss: 'fab-icons fab-icon-people', title: 'Middle Center', position: 'MiddleCenter', target: '#fabtarget' }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab6", iconCss: 'fab-icons fab-icon-people', title: 'Middle Right', position: 'MiddleRight', cssClass: "e-warning", target: '#fabtarget' }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab7", iconCss: 'fab-icons fab-icon-people', title: 'Bottom Left', position: 'BottomLeft', cssClass: "e-success", target: '#fabtarget' }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab8", iconCss: 'fab-icons fab-icon-people', title: 'Bottom Center', position: 'BottomCenter', cssClass: "e-warning", target: '#fabtarget' }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab9", iconCss: 'fab-icons fab-icon-people', title: 'Bottom Right', position: 'BottomRight', cssClass: "e-success", target: '#fabtarget' }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the different positions of the Floating Action Button in the target container.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Use the ",
                React.createElement("code", null, "position"),
                " property to change the position of the FAB in the target element."))));
};
exports.default = Position;
