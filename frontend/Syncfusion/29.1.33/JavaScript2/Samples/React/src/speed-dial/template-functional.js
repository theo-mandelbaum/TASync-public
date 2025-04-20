"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var Template = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var speeddialObj = (0, react_1.useRef)(null);
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
    var closeClick = function () {
        speeddialObj.current.hide();
    };
    var submitClick = function () {
        speeddialObj.current.hide();
    };
    var itemTemplate = function (props) {
        var classname = "icon " + props.properties.iconCss;
        return (React.createElement("div", { className: "itemlist" },
            React.createElement("span", { className: classname }),
            React.createElement("span", { className: "text" }, props.properties.text)));
    };
    var popupTemplate = function () {
        return (React.createElement("div", { className: "popuptempContent" },
            React.createElement("div", { className: "speeddial-form" },
                React.createElement("div", { className: "head" },
                    React.createElement("div", { className: "textEle" }, "Feedback & Question"),
                    React.createElement("div", { className: "iconEle" },
                        React.createElement("span", { className: "speeddial-icons speeddial-icon-close closeicon", onClick: closeClick }))),
                React.createElement("div", { className: "form_content" },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "name", floatLabelType: "Always", showClearButton: true, placeholder: "Enter your name", style: { width: '100%' } }),
                    React.createElement("br", null),
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "email", floatLabelType: "Always", showClearButton: true, placeholder: "Enter your e-mail", style: { width: '100%' } }),
                    React.createElement("br", null),
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { multiline: true, name: "comment", floatLabelType: "Always", showClearButton: true, placeholder: "Share your comments", style: { width: '100%' } }),
                    React.createElement("br", null)),
                React.createElement("div", { className: "footer" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "primarybtn", cssClass: "e-success", onClick: submitClick }, " Submit ")))));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "speed-dial-wrapper" },
                React.createElement("div", { className: "speeddial-template-target  custom-index", id: "speeddialtarget" },
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { target: "#speeddialtarget", cssClass: "popupSpeedDial", popupTemplate: popupTemplate, content: "Feedback", position: "BottomLeft", openIconCss: "speeddial-icons speeddial-icon-feedback", ref: speeddialObj }),
                    React.createElement(ej2_react_buttons_1.SpeedDialComponent, { target: "#speeddialtarget", itemTemplate: itemTemplate, position: "BottomRight", content: "Edit", openIconCss: "speeddial-icons speeddial-icon-edit", items: items })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The following sample demonstrates the customization of action items and Speed Dial popup using template. Click the Speed Dial button to open action items.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In the above example action items customized using ",
                React.createElement("code", null, "itemTemplate"),
                " and in another Speed Dial, popup is customized to load custom UI using ",
                React.createElement("code", null, "popupTemplate"),
                "."))));
};
exports.default = Template;
