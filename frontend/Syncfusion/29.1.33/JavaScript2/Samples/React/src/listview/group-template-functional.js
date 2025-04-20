"use strict";
/**
 * ListView GroupTemplate Sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./group-template.css");
var listData_1 = require("./listData");
var GroupTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //Map the appropriate columns to fields property
    var fields = { text: 'Name', groupBy: 'order' };
    //Set customized list template
    var listTemplate = function (data) {
        return (React.createElement("div", { className: "settings e-list-wrapper e-list-multi-line e-list-avatar" },
            React.createElement("span", { className: "icon ".concat(data.class, " e-avatar") }),
            React.createElement("span", { className: "e-list-item-header" }, data.Name),
            React.createElement("span", { className: "e-list-content" }, data.content)));
    };
    //Set customized group-header template
    var groupTemplate = function (data) {
        return (React.createElement("div", { className: "e-list-wrapper" },
            React.createElement("span", { className: "e-list-item-content" }, data.items[0].category)));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'groupedList', dataSource: listData_1.groupDataSource, headerTitle: 'Settings', showHeader: true, fields: fields, cssClass: "e-list-template", template: listTemplate, groupTemplate: groupTemplate })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the group template functionalities of ListView. Click any list item from the settings option to select and highlight an option.")),
        React.createElement("div", { id: "description", className: "descriptionLayout" },
            React.createElement("p", null,
                "The ListView component has an option to custom design the group header title with the help of ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view#grouptemplate' }, "groupTemplate")),
                " property."),
            React.createElement("p", null,
                "In this example, both the group header and list items are customized using the ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view#grouptemplate' }, "groupTemplate")),
                "and ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view#template' }, "template")),
                "property."))));
};
exports.default = GroupTemplate;
