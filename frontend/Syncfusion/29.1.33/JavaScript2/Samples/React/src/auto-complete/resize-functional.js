"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AutoComplete Custom Filtering Sample
 */
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./resize.css");
var data = require("./dataSource.json");
var ResizeFunctionality = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'booksData';
    var booksData = data[temp];
    // maps the appropriate column to fields property
    var fields = { value: 'BookName' };
    return (React.createElement("div", { id: 'autocustom', className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'resize' },
                React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "books", dataSource: booksData, allowResize: true, fields: fields, placeholder: "e.g. Node.js Succinctly" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the custom resizing functionality of the AutoComplete component. You can adjust the popup size based on your preferences, providing more control over its appearance.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Enable the resize feature of the AutoComplete popup by setting AllowResize to true. This allows you to drag the resize handle at the bottom-right corner of the popup, adjusting its dimensions to suit your preferences and enhancing its visual management."))));
};
exports.default = ResizeFunctionality;
