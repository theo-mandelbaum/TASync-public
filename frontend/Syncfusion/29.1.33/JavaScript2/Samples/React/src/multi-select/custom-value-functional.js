"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./style.css");
var CustomTag = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // define the JSON of data
    var gameList = [
        { Id: 'Game1', Game: 'American Football' },
        { Id: 'Game2', Game: 'Badminton' },
        { Id: 'Game3', Game: 'Basketball' },
        { Id: 'Game4', Game: 'Cricket' },
        { Id: 'Game5', Game: 'Football' },
        { Id: 'Game6', Game: 'Golf' },
        { Id: 'Game7', Game: 'Hockey' },
        { Id: 'Game8', Game: 'Rugby' },
        { Id: 'Game9', Game: 'Snooker' },
        { Id: 'Game10', Game: 'Tennis' },
    ];
    // maps the appropriate column to fields property
    var fields = { text: "Game", value: "Id" };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'multidefault', className: "control-styles" },
                React.createElement("label", { className: "h4" }, " Custom Values"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "customelement", dataSource: gameList, fields: fields, mode: "Box", placeholder: "Favorite sports", allowCustomValue: true }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the custom tag functionalities of the MultiSelect. Type a character(s) in the MultiSelect element that are not present in the dataSource, you can select and tag that custom typed characters as new item from the suggestion list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The MultiSelect allows the user to add a non-present option to the component value when\u00A0the ",
                React.createElement("code", null, "allowCustomValue"),
                "\u00A0is enabled. While selecting new custom value the ",
                React.createElement("code", null, "customValueSelection"),
                "\u00A0event will be triggered."),
            React.createElement("p", null,
                " More information on the custom value feature can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/multi-select/custom-value.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = CustomTag;
