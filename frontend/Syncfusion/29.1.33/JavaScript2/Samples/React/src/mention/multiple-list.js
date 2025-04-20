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
exports.MultipleList = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
require("./multiple-list.css");
var data = require("./dataSource.json");
var MultipleList = /** @class */ (function (_super) {
    __extends(MultipleList, _super);
    function MultipleList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.projectTemp = 'projects';
        _this.useCostTemp = 'useCosts';
        _this.statusTemp = 'status';
        _this.data = new ej2_data_1.DataManager({
            url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
            adaptor: new ej2_data_1.WebApiAdaptor,
            crossDomain: true
        });
        _this.query = new ej2_data_1.Query().select(['FirstName', 'EmployeeID']).requiresCount();
        _this.projects = data[_this.projectTemp];
        _this.useCosts = data[_this.useCostTemp];
        _this.status = data[_this.statusTemp];
        _this.commonTarget = '#multipleList';
        _this.dataFields = { text: 'FirstName', value: 'EmployeeID' };
        _this.localFields = { text: 'Value' };
        return _this;
    }
    MultipleList.prototype.projectsDisplayTemplate = function (data) {
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { className: "e-success" }, data.Value)));
    };
    MultipleList.prototype.costDisplayTemplate = function (data) {
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { className: "e-error" }, data.Value)));
    };
    MultipleList.prototype.statusDisplayTemplate = function (data) {
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { className: "e-warning" }, data.Value)));
    };
    MultipleList.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { id: 'mention_multiplelist' },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("label", { id: "label", className: "multiple" },
                                            "Start typing ",
                                            React.createElement("code", null, "@"),
                                            ", ",
                                            React.createElement("code", null, "#"),
                                            ", ",
                                            React.createElement("code", null, "$"),
                                            " or ",
                                            React.createElement("code", null, "%"),
                                            " to select the respective values"),
                                        React.createElement("div", { id: "multipleList", placeholder: "Type here..!" }))))),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: this.data, target: this.commonTarget, fields: this.dataFields, suggestionCount: 15, query: this.query, popupWidth: 250, popupHeight: 250, allowSpaces: true }),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: this.projects, requireLeadingSpace: false, mentionChar: '#', target: this.commonTarget, displayTemplate: this.projectsDisplayTemplate, fields: this.localFields }),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: this.useCosts, mentionChar: '$', target: this.commonTarget, displayTemplate: this.costDisplayTemplate, fields: this.localFields }),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: this.status, mentionChar: '%', target: this.commonTarget, displayTemplate: this.statusDisplayTemplate, fields: this.localFields })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the different mentioned characters that are used to render the suggestion list. Type the ",
                    React.createElement("code", null, "@"),
                    " or ",
                    React.createElement("code", null, "#"),
                    " or ",
                    React.createElement("code", null, "$"),
                    " or ",
                    React.createElement("code", null, "%"),
                    " characters to select or tag the name from respective suggestion lists.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "requireLeadingSpace"),
                    " property in Mention controls whether a space is needed before triggering the Mention suggestion popup. When set to ",
                    React.createElement("code", null, "false"),
                    ", it activates without a space; when set to ",
                    React.createElement("code", null, "true"),
                    ", a space is required before the Mention character. To see this feature in action, start typing with ",
                    React.createElement("code", null, "#"),
                    "."),
                React.createElement("p", null, "In the above sample, the following are configured for the contenteditable div element with @mention integrated."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "@"),
                        " - Typing ",
                        React.createElement("code", null, "@"),
                        " lists out the suggestions of the employee names."),
                    React.createElement("li", null,
                        React.createElement("code", null, "#"),
                        " - Typing ",
                        React.createElement("code", null, "#"),
                        " lists the project names."),
                    React.createElement("li", null,
                        React.createElement("code", null, "$"),
                        " - Typing ",
                        React.createElement("code", null, "$"),
                        " lists out the cost of the project."),
                    React.createElement("li", null,
                        React.createElement("code", null, "%"),
                        " - Typing ",
                        React.createElement("code", null, "%"),
                        " lists the status of the project.")))));
    };
    return MultipleList;
}(sample_base_1.SampleBase));
exports.MultipleList = MultipleList;
