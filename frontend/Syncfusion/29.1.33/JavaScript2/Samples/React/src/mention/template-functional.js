"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var data = require("./dataSource.json");
var Template = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'emailData';
    var emailData = data[temp];
    var templateTarget = '#templateMention';
    var templateFields = { text: 'Name' };
    var itemTemplate = function (data) {
        return (React.createElement("div", { className: "template_listItems" },
            React.createElement("img", { className: "mentionEmpImage", src: "src/mention/Employees/" + data['Eimg'] + ".png", alt: "employee" }),
            React.createElement("span", { className: "person" }, data.Name),
            React.createElement("span", { className: "email" }, data.EmailId)));
    };
    var displayTemplate = function (data) {
        return (React.createElement(React.Fragment, null, data.Name));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-12' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { id: 'mention_template' },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("label", { className: "template-size" }, "Compose your content"),
                                        React.createElement("div", { id: "templateMention", placeholder: "Begin writing here..!" }))))),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: emailData, target: templateTarget, fields: templateFields, itemTemplate: itemTemplate, displayTemplate: displayTemplate, noRecordsTemplate: "No item related to the search", popupWidth: 250, popupHeight: 200 }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the template functionalities of the Mention component. Type the ",
                React.createElement("code", null, "@"),
                " character in the editable element and select or tag the user from the customized suggestion list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In the above sample, for the template rendering the following are used"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "itemTemplate"),
                    " - It is used for displaying customized lists."),
                React.createElement("li", null,
                    React.createElement("code", null, "displayTemplate"),
                    " - It is used to display, how the the value selected is previewed in the element."),
                React.createElement("li", null,
                    React.createElement("code", null, "noRecordsTemplate"),
                    " - It is used to display a message if a user searches for irrelevant data in the data source bound.")))));
};
exports.default = Template;
