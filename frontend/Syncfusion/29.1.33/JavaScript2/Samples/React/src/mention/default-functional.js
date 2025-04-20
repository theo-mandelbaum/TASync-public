"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./default.css");
var data = require("./dataSource.json");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'emailData';
    var emailData = data[temp];
    var emailFields = { text: 'EmailId' };
    var emailTarget = '#emailsMention';
    var commentTarget = '#commentsMention';
    var commentFields = { text: 'Name' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-12' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { id: 'mention_default' },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("label", { className: "default-size" }, "E-mails"),
                                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "emailsMention", placeholder: "Type @ and tag the email" }))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("label", { className: "default-size" }, "Comments"),
                                        React.createElement("div", { id: "commentsMention", placeholder: "Type @ and select your comments" }))))),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: emailData, target: emailTarget, fields: emailFields }),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: emailData, target: commentTarget, fields: commentFields }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the default functionalities of the Mention component. Type the ",
                React.createElement("code", null, "@"),
                " character in the editable element and select or tag the user from the suggestion list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Mention"),
                " is a component used to display a list of items that the users can select or tag from the list suggested. You can use the ",
                React.createElement("code", null, "@"),
                " mention support with the ",
                React.createElement("code", null, "input"),
                ", ",
                React.createElement("code", null, "textarea"),
                ", and ",
                React.createElement("code", null, "contenteditable"),
                " div elements."),
            React.createElement("p", null,
                "In the above sample, the input and div elements are configured with ",
                React.createElement("code", null, "@"),
                " mentions listing the ",
                React.createElement("code", null, "emails"),
                " and ",
                React.createElement("code", null, "comments"),
                " contents."))));
};
exports.default = Default;
