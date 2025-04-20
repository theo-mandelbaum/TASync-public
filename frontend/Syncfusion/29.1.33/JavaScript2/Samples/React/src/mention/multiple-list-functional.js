"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_data_1 = require("@syncfusion/ej2-data");
var sample_base_1 = require("../common/sample-base");
require("./multiple-list.css");
var data = require("./dataSource.json");
var MultipleList = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var projectTemp = 'projects';
    var useCostTemp = 'useCosts';
    var statusTemp = 'status';
    var remotedata = new ej2_data_1.DataManager({
        url: 'https://ej2services.syncfusion.com/production/web-services/api/Employees',
        adaptor: new ej2_data_1.WebApiAdaptor,
        crossDomain: true
    });
    var query = new ej2_data_1.Query().select(['FirstName', 'EmployeeID']).requiresCount();
    var projects = data[projectTemp];
    var useCosts = data[useCostTemp];
    var status = data[statusTemp];
    var commonTarget = '#multipleList';
    var dataFields = { text: 'FirstName', value: 'EmployeeID' };
    var localFields = { text: 'Value' };
    var projectsDisplayTemplate = function (data) {
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { className: "e-success" }, data.Value)));
    };
    var costDisplayTemplate = function (data) {
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { className: "e-error" }, data.Value)));
    };
    var statusDisplayTemplate = function (data) {
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { className: "e-warning" }, data.Value)));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-12' },
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
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: remotedata, target: commonTarget, fields: dataFields, suggestionCount: 15, query: query, popupWidth: 250, allowSpaces: true }),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: projects, requireLeadingSpace: false, mentionChar: '#', target: commonTarget, displayTemplate: projectsDisplayTemplate, fields: localFields }),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: useCosts, mentionChar: '$', target: commonTarget, displayTemplate: costDisplayTemplate, fields: localFields }),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: status, mentionChar: '%', target: commonTarget, displayTemplate: statusDisplayTemplate, fields: localFields }))))),
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
exports.default = MultipleList;
