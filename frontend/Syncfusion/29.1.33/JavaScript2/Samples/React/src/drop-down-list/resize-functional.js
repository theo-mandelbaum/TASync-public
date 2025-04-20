"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * DropDownList resize Sample
 */
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var data = require("./dataSource.json");
require("./resize.css");
var Resize = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //define the resize data
    var temp = 'countries';
    var searchData = data[temp];
    // maps the appropriate column to fields property
    var fields = { text: 'Name', value: 'Code' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'resize' },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "country", dataSource: searchData, allowResize: true, fields: fields, placeholder: "Select a country", popupHeight: "220px" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the custom resizing functionality of the DropDownList component. You can adjust the popup size based on your preferences, providing more control over its appearance.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Enable the resize feature of the DropDownList popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management."))));
};
exports.default = Resize;
