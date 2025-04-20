"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./disabled-items.css");
var data = require("./dataSource.json");
var DisabledItems = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'emailData2';
    var emailData = data[temp];
    var disabledTarget = '#disabledMention';
    var disabledFields = { text: 'Name', disabled: 'State' };
    var itemTemplate = function (data) {
        return (React.createElement("div", { className: "disabled_listItems" },
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
                    React.createElement("div", { id: 'mention_disabled' },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("label", { className: "disabled-size" }, "Compose your content"),
                                        React.createElement("div", { id: "disabledMention", placeholder: "Begin writing here..!" }))))),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: emailData, target: disabledTarget, fields: disabledFields, itemTemplate: itemTemplate, displayTemplate: displayTemplate, noRecordsTemplate: "No item related to the search", popupWidth: 250, popupHeight: 200 }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample showcases the disabled items of the Mention component. Type the ",
                React.createElement("code", null, "@"),
                " character in the editable element and you will notice that the disabled items are greyed out and cannot be selected.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Mention provides options for individual items to be in either an enabled or disabled state for specific scenarios. Once an item is disabled, it cannot be select a particular item. To configure the disabled item columns, use the ",
                React.createElement("b", null, "fields.disabled"),
                " property."))));
};
exports.default = DisabledItems;
