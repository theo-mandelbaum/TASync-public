"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./modal.css");
var Modal = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var items = [
        {
            title: 'Home',
            iconCss: 'e-icons e-home'
        },
        {
            title: 'People',
            iconCss: 'e-icons e-people'
        },
        {
            title: 'Search',
            iconCss: 'e-icons e-search'
        },
        {
            title: 'Message',
            iconCss: 'e-icons e-comment-show'
        }
    ];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "speed-dial-wrapper" },
                React.createElement("div", { id: "speeddialtarget", className: "speeddial-modal-target  custom-index" },
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { title: "Menu", openIconCss: 'e-icons e-justify', closeIconCss: 'e-icons e-close', target: '#speeddialtarget', position: 'BottomCenter', modal: true, items: items })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the modal popup of a speed dial. Click the button to open action items and click the overlay to close the action items.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Speed dial enables modal popup mode when the ",
                React.createElement("code", null, "modal"),
                " property is set. When this mode is enabled, an overlay is added to prevent background interaction, and actions are closed when the overlay is clicked."))));
};
exports.default = Modal;
