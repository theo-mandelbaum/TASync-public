"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./chip-customization.css");
var ChipCustomization = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // define the JSON of data
    var colorsData = [
        { Color: 'Chocolate', Code: '#75523C' },
        { Color: 'CadetBlue', Code: '#3B8289' },
        { Color: 'DarkOrange', Code: '#FF843D' },
        { Color: 'DarkRed', Code: '#CA3832' },
        { Color: 'Fuchsia', Code: '#D44FA3' },
        { Color: 'HotPink', Code: '#F23F82' },
        { Color: 'Indigo', Code: '#2F5D81' },
        { Color: 'LimeGreen', Code: '#4CD242' },
        { Color: 'OrangeRed', Code: '#FE2A00' },
        { Color: 'Tomato', Code: '#FF745C' }
    ];
    // maps the appropriate column to fields property
    var fields = { text: 'Color', value: 'Code' };
    // set the value to MultiSelect
    var colorValues = ['#75523C', '#4CD242', '#FF745C', '#3B8289', '#CA3832'];
    // bind the tagging event
    var onTagging = function (e) {
        // set the current selected item text as class to chip element.
        e.setClass(e.itemData[fields.text].toLowerCase());
    };
    return (React.createElement("div", { className: 'col-lg-12 control-pane' },
        React.createElement("div", { className: 'control-section ms-chip-customize' },
            React.createElement("div", { id: 'multi-customize', className: "control-styles" },
                React.createElement("label", { className: "h4" }, "Chip Customization"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "chip-customization", value: colorValues, dataSource: colorsData, fields: fields, mode: "Box", placeholder: "Favorite Colors", tagging: onTagging.bind(_this) }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the customization of selected chip element in the MultiSelect. Type a character in the MultiSelect element or click on the element to choose one or more items from the list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The MultiSelect allows the user to customize the selected chip element through the ",
                React.createElement("code", null, "tagging"),
                " event. In that event, you can set the custom classes to chip element via the event argument of the ",
                React.createElement("code", null, "setClass"),
                " method."),
            React.createElement("p", null,
                "This sample illustrates how to use the favorite colors of data and set the favorite color text as custom class through",
                React.createElement("code", null, "tagging"),
                " event argument of the ",
                React.createElement("code", null, "setClass"),
                " method."))));
};
exports.default = ChipCustomization;
