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
    var fields = { text: 'Name', value: 'Eimg' };
    //set the value to header template
    var headerTemplate = (0, react_1.useCallback)(function () {
        return (React.createElement("div", { className: "header" },
            React.createElement("span", null, "Photo"),
            React.createElement("span", { className: "columnHeader" }, "Employee Info")));
    }, []);
    //set the value to item template
    var itemTemplate = (0, react_1.useCallback)(function (data) {
        return (React.createElement("div", null,
            React.createElement("img", { className: "empImage", src: "src/combo-box/Employees/" + data.Eimg + ".png", alt: "employee" }),
            React.createElement("div", { className: "ms-ename" }, data.Name),
            React.createElement("div", { className: "ms-job" }, data.Job)));
    }, []);
    //set the value to value template
    var valueTemplate = (0, react_1.useCallback)(function (data) {
        return (React.createElement("div", null,
            React.createElement("img", { className: "valueTemp", src: "src/combo-box/Employees/" + data.Eimg + ".png", alt: "employee" }),
            React.createElement("div", { className: "nameTemp" }, data.Name)));
    }, []);
    return (React.createElement("div", { id: 'multitemp', className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'multitemplate', className: "control-styles" },
                React.createElement("label", { className: "h4" }, "Template"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "multiTemplate", dataSource: employeesData, fields: fields, mode: "Box", placeholder: "Select employee", itemTemplate: itemTemplate, valueTemplate: valueTemplate, headerTemplate: headerTemplate }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the template functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the customized list.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The MultiSelect has been provided with several options to customize each list items, group title, selected value, header and footer elements."),
            React.createElement("p", null, "This sample uses the following list of templates in MultiSelect."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "ItemTemplate"),
                    " - To customize the list item's content."),
                React.createElement("li", null,
                    React.createElement("code", null, "ValueTemplate"),
                    " - To customize the value element content that holds the selected item's text."),
                React.createElement("li", null,
                    React.createElement("code", null, "HeaderTemplate"),
                    " - To customize the header element.")),
            React.createElement("p", null,
                " More information on the template feature configuration can be found in the",
                React.createElement("a", { href: "http://ej2.syncfusion.com/react/documentation/multi-select/templates.html", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Templates;
