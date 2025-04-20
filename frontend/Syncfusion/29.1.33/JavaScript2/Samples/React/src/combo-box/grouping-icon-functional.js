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
    //define the data with category
    var vegetableData = data[temp];
    // map the groupBy field with Category column
    var groupFields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    var tempData = 'socialMedia';
    //define the data with icon class
    var socialMediaData = data[tempData];
    // map the iconCss field with Class column
    var iconFields = { text: 'SocialMedia', value: 'Id', iconCss: 'Class' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: 'comboIcon' },
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'drop-down-list-content', id: "group" },
                    React.createElement("label", { className: "h4" }, "Grouping"),
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "grouping", dataSource: vegetableData, fields: groupFields, placeholder: "Select a vegetable", popupHeight: "220px" }))),
            React.createElement("div", { className: 'col-lg-6' },
                React.createElement("div", { className: 'drop-down-list-content', id: "icon" },
                    React.createElement("label", { className: "h4" }, " Icons"),
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "icons", dataSource: socialMediaData, fields: iconFields, placeholder: "Select a social media", popupHeight: "220px" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the grouping and icons supports of the ComboBox. Type a character in the ComboBox element or click on the drodown icon to choose an item from the categorized list/icons list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ComboBox allows to group the relevant items under a corresponding category by mapping the ",
                React.createElement("code", null, "groupBy"),
                " field, and allows to load the list items with icons."),
            React.createElement("p", null, "The grouping sample illustrates how the vegetables are grouped based on its category."),
            React.createElement("p", null,
                "The second ComboBox is populated with icons that is rendered by mapping the ",
                React.createElement("code", null, "iconCss"),
                " field."),
            React.createElement("p", null,
                " More information on the grouping feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/combo-box/grouping.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Grouping;
