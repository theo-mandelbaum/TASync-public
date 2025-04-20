"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./styles.css");
var Styles = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var items = [
        {
            text: 'Cut',
            iconCss: 'speeddial-icons speeddial-icon-cut'
        },
        {
            text: 'Copy',
            iconCss: 'speeddial-icons speeddial-icon-copy'
        },
        {
            text: 'Paste',
            iconCss: 'speeddial-icons speeddial-icon-paste'
        },
        {
            text: 'Delete',
            iconCss: 'speeddial-icons speeddial-icon-delete'
        },
        {
            text: 'Save',
            iconCss: 'speeddial-icons speeddial-icon-save'
        }
    ];
    var itemLabel = [
        {
            text: 'Cut'
        },
        {
            text: 'Copy'
        },
        {
            text: 'Paste'
        },
        {
            text: 'Delete'
        },
        {
            text: 'Save'
        }
    ];
    var tooltItem = [
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
        },
        {
            title: 'Save',
            iconCss: 'speeddial-icons speeddial-icon-save'
        }
    ];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "speed-dial-wrapper" },
                React.createElement(ej2_react_popups_1.TooltipComponent, { id: "details", target: ".tooltip-speeddial .e-speeddial-li", position: "LeftCenter" }),
                React.createElement("div", { id: "speeddialtarget", className: "speeddial-appearence-target  custom-index" },
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { id: "speeddial1", content: "Edit", target: "#speeddialtarget", position: "BottomCenter", openIconCss: "speeddial-icons speeddial-icon-edit", iconPosition: "Left", items: items }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { id: "speeddial2", content: "Edit", target: "#speeddialtarget", position: "BottomLeft", items: itemLabel }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { id: "speeddial3", title: "Edit", target: "#speeddialtarget", position: "BottomRight", cssClass: "tooltip-speeddial", openIconCss: "speeddial-icons speeddial-icon-edit", items: tooltItem })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the appearance customization of the Speed Dial action items. Click the Speed Dial button to open action items.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In the above example, Speed Dial items appearence customized using ",
                React.createElement("code", null, "text"),
                " and ",
                React.createElement("code", null, "iconCss"),
                " properties of ",
                React.createElement("code", null, "SpeedDialItemModel"),
                "."))));
};
exports.default = Styles;
