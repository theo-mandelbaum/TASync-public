"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./icons.css");
var data = require("./dataSource.json");
var Grouping = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'vegetableData';
    // define the JSON of data
    var vegetableData = data[temp];
    // maps the appropriate column to grouping fields property
    var groupFields = { groupBy: 'Category', value: 'Vegetable' };
    var tempData = 'socialMedia';
    // define the JSON of data
    var socialMediaData = data[tempData];
    // maps the appropriate column to icons fields property
    var iconFields = { value: 'SocialMedia', iconCss: 'Class' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: 'autoIcon' },
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'drop-down-list-content', id: "group" },
                    React.createElement("label", { className: "h4" }, "Grouping"),
                    React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "vegetables", showPopupButton: true, dataSource: vegetableData, fields: groupFields, placeholder: "e.g. Cabbage" }))),
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'drop-down-list-content', id: "icon" },
                    React.createElement("label", { className: "h4" }, " Icons"),
                    React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "icons", showPopupButton: true, dataSource: socialMediaData, fields: iconFields, placeholder: "e.g. Facebook" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the grouping and icons supports of the AutoComplete. Type a character in the autocomplete element and choose an item from the categorized list/icons list. And also enabled the",
                React.createElement("code", null, "showPopupButton"),
                " property to show the all suggestion items while clicking on popup button.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The AutoComplete allows to group the relevant items under a corresponding category by mapping the ",
                React.createElement("code", null, "groupBy"),
                " field, and allows to load the list items with icons."),
            React.createElement("p", null, "The grouping sample illustrates how the vegetables are grouped based on its category."),
            React.createElement("p", null,
                "The second AutoComplete is populated with icons which is rendered by mapping the ",
                React.createElement("code", null, "iconCss"),
                " field."),
            React.createElement("p", null,
                " More information on the grouping feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/auto-complete/grouping.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Grouping;
