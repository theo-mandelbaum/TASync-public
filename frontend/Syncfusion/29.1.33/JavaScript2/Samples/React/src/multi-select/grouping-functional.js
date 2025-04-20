"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./style.css");
var data = require("./dataSource.json");
var Grouping = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'vegetableData';
    //define the data with category
    var vegetableData = data[temp];
    // map the groupBy field with category column
    var groupFields = { groupBy: 'Category', text: 'Vegetable', value: 'Id' };
    return (React.createElement("div", { id: 'multigroup', className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "ms-multigroup", className: "control-styles" },
                React.createElement("label", { className: "h4" }, "Grouping"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "grouping", dataSource: vegetableData, fields: groupFields, placeholder: "Select vegetables" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the grouping functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the categorized list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The MultiSelect allows to group the relevant items under a corresponding category by mapping the ",
                React.createElement("code", null, "groupBy"),
                " field, and allows to load the list items with icons."),
            React.createElement("p", null, "The grouping sample illustrates how the vegetables are grouped based on its category."),
            React.createElement("p", null,
                "More information on the grouping feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/multi-select/grouping.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Grouping;
