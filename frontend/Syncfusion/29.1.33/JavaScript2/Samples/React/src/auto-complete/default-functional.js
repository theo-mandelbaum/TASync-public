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
    // define the array of string
    var sportsData = data[temp];
    return (React.createElement("div", { id: 'combodefault', className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-12 control-wrappers' },
                React.createElement("div", { id: 'default' },
                    React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "games", dataSource: sportsData, placeholder: "e.g. Basketball" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the AutoComplete. Type a character in the autocomplete element and choose an item from the suggestion list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "AutoComplete"),
                " component provides the matched suggestion list when a character is typed in the input, from that the user can select one."),
            " By default, the filter type value is ",
            React.createElement("code", null, "contains"),
            ".",
            React.createElement("p", null, "The default sample illustrates the use of AutoComplete that allows the end-users to select an item from the suggestion list."),
            React.createElement("p", null,
                " More information on the AutoComplete instantiation can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/auto-complete/getting-started/", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Default;
