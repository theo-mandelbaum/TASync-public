"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./inline.css");
var data = require("./dataSource.json");
var Inline = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'employees';
    // define the JSON of data
    var employeesData = data[temp];
    // maps the appropriate column to fields property
    var fields = { text: 'Name' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'inline', style: { paddingTop: '75px', textAlign: 'center' } },
                React.createElement("span", { id: "contentText" },
                    "React top expert of this week is",
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "inline", cssClass: "inlinecss", dataSource: employeesData, fields: fields, placeholder: "Select an employee", popupHeight: "200px", width: "65px", popupWidth: "140px", value: 'Michael' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The DropDownList appearing in line with highlighted content. Click that DropDownList value content and select an item from the popup list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The DropDownList component can be rendered in line with other content and you can override the styles of the dropdownlist component."),
            React.createElement("p", null, "This sample illustrates using the user's data that has been used and customized DropDownList border."))));
};
exports.default = Inline;
