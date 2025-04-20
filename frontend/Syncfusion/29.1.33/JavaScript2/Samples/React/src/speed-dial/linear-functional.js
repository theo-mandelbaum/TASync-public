"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./linear.css");
var Linear = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var items = [
        {
            title: 'Image',
            iconCss: 'speeddial-icons speeddial-icon-image'
        },
        {
            title: 'Audio',
            iconCss: 'speeddial-icons speeddial-icon-audio'
        },
        {
            title: 'Video',
            iconCss: 'speeddial-icons speeddial-icon-video'
        }
    ];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "speed-dial-wrapper" },
                React.createElement("div", { id: "speeddialtarget", className: "speeddial-linear-target  custom-index" },
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-success", target: '#speeddialtarget', title: 'Top Left', position: 'TopLeft', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-warning", target: '#speeddialtarget', title: 'Top Center', position: 'TopCenter', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-success", target: '#speeddialtarget', title: 'Top Right', position: 'TopRight', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-warning", target: '#speeddialtarget', title: 'Middle Left', position: 'MiddleLeft', direction: "Right", items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', target: '#speeddialtarget', title: 'Middle Center', position: 'MiddleCenter', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-warning", target: '#speeddialtarget', title: 'Middle Right', position: 'MiddleRight', direction: "Left", items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-success", target: '#speeddialtarget', title: 'Bottom Left', position: 'BottomLeft', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-warning", target: '#speeddialtarget', title: 'Bottom Center', position: 'BottomCenter', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-success", target: '#speeddialtarget', title: 'Bottom Right', position: 'BottomRight', items: items })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the different positions of the Speed Dial component in the target container. Based on the position of the speed dial, action items\u2019 display direction will vary. Click the speed dial button to open action items. ")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Speed dial displays action items based on ",
                React.createElement("code", null, "position"),
                ", by default. Using the ",
                React.createElement("code", null, "direction"),
                " property, specify one of the below directions."),
            React.createElement("ul", null,
                React.createElement("li", null, "Up"),
                React.createElement("li", null, "Down"),
                React.createElement("li", null, "Left"),
                React.createElement("li", null, "Right")))));
};
exports.default = Linear;
