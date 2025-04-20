"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var data = require("./dataSource.json");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'emailData';
        _this.emailData = data[_this.temp];
        _this.templateTarget = '#templateMention';
        _this.templateFields = { text: 'Name' };
        return _this;
    }
    Template.prototype.itemTemplate = function (data) {
        return (React.createElement("div", { className: "template_listItems" },
            React.createElement("img", { className: "mentionEmpImage", src: "src/mention/Employees/" + data['Eimg'] + ".png", alt: "employee" }),
            React.createElement("span", { className: "person" }, data.Name),
            React.createElement("span", { className: "email" }, data.EmailId)));
    };
    Template.prototype.displayTemplate = function (data) {
        return (React.createElement(React.Fragment, null, data.Name));
    };
    Template.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { id: 'mention_template' },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("label", { className: "template-size" }, "Compose your content"),
                                        React.createElement("div", { id: "templateMention", placeholder: "Type @ and tag user" }))))),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: this.emailData, target: this.templateTarget, fields: this.templateFields, itemTemplate: this.itemTemplate, displayTemplate: this.displayTemplate, noRecordsTemplate: "No item related to the search", popupWidth: 250, popupHeight: 200 })))),
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
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
