"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./default.css");
var data = require("./dataSource.json");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'sportsData';
    // define the JSON of data
    var sportsData = data[temp];
    // maps the appropriate column to fields property
    var fields = { text: 'Game', value: 'Id' };
    // set the value to select an item based on mapped value at initial rendering
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { id: "multisection", className: 'control-section' },
            React.createElement("div", { id: "multidefault" },
                React.createElement("div", { className: "control-styles" },
                    React.createElement("label", { className: "h4" }, " Default Mode"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "defaultelement", dataSource: sportsData, mode: "Default", fields: fields, placeholder: "Favorite Sports" }))),
                React.createElement("div", { className: "control-styles" },
                    React.createElement("label", { className: "h4" }, "Box Mode"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "boxelement", dataSource: sportsData, mode: "Box", fields: fields, placeholder: "Favorite Sports" }))),
                React.createElement("div", { className: "control-styles" },
                    React.createElement("label", { className: "h4" }, "Delimiter Mode"),
                    React.createElement("div", null,
                        React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "delimiterelement", dataSource: sportsData, mode: "Delimiter", fields: fields, placeholder: "Favorite Sports" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the suggestion list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "MultiSelect"),
                " component contains a list of predefined values, from that the user can choose a multiple values. "),
            React.createElement("p", null, "In this sample, the selected items are shown with three different UI modes in three different MultiSelect elements. That three UI modes are listed here below,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "Default"),
                    " - on focus-in, the component will act in ",
                    React.createElement("code", null, "box mode"),
                    " and on blur, the component will act in ",
                    React.createElement("code", null, "delimiter mode"),
                    "."),
                React.createElement("li", null,
                    React.createElement("b", null, "Box"),
                    " - selected items will be visualized in chip."),
                React.createElement("li", null,
                    React.createElement("b", null, "Delimiter"),
                    " - selected items will be visualized in text content.")),
            React.createElement("p", null,
                " More information on the MultiSelect instantiation can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/multi-select/getting-started/", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Default;
