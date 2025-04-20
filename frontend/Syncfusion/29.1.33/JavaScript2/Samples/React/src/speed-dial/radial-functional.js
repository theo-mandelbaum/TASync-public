"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./radial.css");
var Radial = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var items = [
        {
            title: 'Cut',
            iconCss: 'speeddial-icons speeddial-icon-cut'
        },
        {
            title: 'Copy',
            iconCss: 'speeddial-icons speeddial-icon-copy'
        },
        {
            title: 'Paste',
            iconCss: 'speeddial-icons speeddial-icon-paste'
        },
        {
            title: 'Delete',
            iconCss: 'speeddial-icons speeddial-icon-delete'
        }
    ];
    var radialSetting = { offset: '70px' };
    var radialSetting1 = { offset: '110px' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "speed-dial-wrapper" },
                React.createElement("div", { id: "speeddialtarget", className: "speeddial-radial-target  custom-index" },
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-edit', cssClass: "e-success", target: '#speeddialtarget', title: 'Top Left', position: 'TopLeft', radialSettings: radialSetting1, mode: 'Radial', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-edit', cssClass: "e-warning", target: '#speeddialtarget', title: 'Top Center', position: 'TopCenter', radialSettings: radialSetting, mode: 'Radial', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-edit', cssClass: "e-success", target: '#speeddialtarget', title: 'Top Right', position: 'TopRight', radialSettings: radialSetting1, mode: 'Radial', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-edit', cssClass: "e-warning", target: '#speeddialtarget', title: 'Middle Left', position: 'MiddleLeft', radialSettings: radialSetting, mode: 'Radial', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-edit', target: '#speeddialtarget', title: 'Middle Center', position: 'MiddleCenter', radialSettings: radialSetting, mode: 'Radial', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-edit', cssClass: "e-warning", target: '#speeddialtarget', title: 'Middle Right', position: 'MiddleRight', radialSettings: radialSetting, mode: 'Radial', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-edit', cssClass: "e-success", target: '#speeddialtarget', title: 'Bottom Left', position: 'BottomLeft', radialSettings: radialSetting1, mode: 'Radial', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-edit', cssClass: "e-warning", target: '#speeddialtarget', title: 'Bottom Center', position: 'BottomCenter', radialSettings: radialSetting, mode: 'Radial', items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-edit', cssClass: "e-success", target: '#speeddialtarget', title: 'Bottom Right', position: 'BottomRight', radialSettings: radialSetting1, mode: 'Radial', items: items })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the radial menu display mode of action items in the Speed Dial component. Click the speed dial button to open action items like the radial menu.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                " The default display mode is linear. The display mode of the Speed Dial component can be changed using the ",
                React.createElement("code", null, "mode"),
                " property to ",
                React.createElement("code", null, "Radial"),
                ". Radial display of action items can be customized using the below properties of ",
                React.createElement("code", null, "radialSettings"),
                ". "),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "offSet"),
                    ": Specify the position of the action items along the offset-path."),
                React.createElement("li", null,
                    React.createElement("code", null, "direction"),
                    ": Denote whether to arrange action items in a clock or anti-clockwise direction."),
                React.createElement("li", null,
                    React.createElement("code", null, "startAngle"),
                    " and ",
                    React.createElement("code", null, "endAngle"),
                    ": Specify the start and end angles in radial direction. By default, angle is calculated based on the ",
                    React.createElement("code", null, "position"),
                    "property.")))));
};
exports.default = Radial;
