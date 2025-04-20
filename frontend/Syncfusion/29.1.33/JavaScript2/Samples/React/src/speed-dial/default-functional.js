"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = function () {
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
                React.createElement("div", { id: "speeddialtarget", className: "speeddial-default-target  custom-index" },
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { title: "Menu", openIconCss: 'e-icons e-justify', closeIconCss: 'e-icons e-close', target: '#speeddialtarget', position: 'BottomCenter', items: items })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the default functionalities of the Speed Dial component. Speed dial is a ",
                React.createElement("b", null, "transition type"),
                " of FAB which displays a list of action buttons when clicked.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Speed Dial component is used to display multiple action items for the floating action button. It is useful when there are more than one primary action on the page. The Speed dial displays action items in linear and radial directions.. "))));
};
exports.default = Default;
