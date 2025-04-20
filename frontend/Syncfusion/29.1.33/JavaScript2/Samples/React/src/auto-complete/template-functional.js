"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./templates.css");
var data = require("./dataSource.json");
var Templates = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'empList';
    // define the JSON of data
    var employeesData = data[temp];
    // maps the appropriate column to fields property
    var fields = { value: 'Name' };
    //set the value to header template
    var headerTemplate = function () {
        return (React.createElement("div", { className: "header" },
            " ",
            React.createElement("span", null, "Photo"),
            " ",
            React.createElement("span", { className: "columnHeader" }, "Employee Info")));
    };
    //set the value to item template
    var itemTemplate = function (data) {
        return (React.createElement("div", null,
            React.createElement("img", { className: "empImage", src: "src/auto-complete/Employees/" + data.Eimg + ".png", alt: "employee" }),
            React.createElement("div", { className: "ename" },
                " ",
                data.Name,
                " "),
            React.createElement("div", { className: "job" },
                " ",
                data.Designation,
                " ")));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'template' },
                React.createElement(ej2_react_dropdowns_1.AutoCompleteComponent, { id: "employees", dataSource: employeesData, fields: fields, placeholder: "e.g. Andrew Fuller", itemTemplate: itemTemplate, headerTemplate: headerTemplate, popupHeight: "350px" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the template functionalities of the AutoComplete. Type a character in the autocomplete element and choose an item from the customized list")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The AutoComplete has been provided with several options to customize each list items, group title, header and footer elements."),
            React.createElement("p", null, "This sample uses the following list of templates in AutoComplete"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "ItemTemplate"),
                    " - To customize the list item's content."),
                React.createElement("li", null,
                    React.createElement("code", null, "HeaderTemplate"),
                    " - To customize the header element.")),
            React.createElement("p", null,
                " More information on the template feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/auto-complete/templates.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Templates;
