"use strict";
/**
 * ListView CheckList Sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./listview.css");
var listData_1 = require("./listData");
var Checklist = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //Map the appropriate columns to fields property
    var fields = { groupBy: 'category' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "flat-list" },
                React.createElement("p", { className: "displayText" }, "Flat List"),
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: "sample-list-flat", dataSource: listData_1.flatList, showCheckBox: true })),
            React.createElement("div", { id: "group-list" },
                React.createElement("p", { className: "displayText" }, "Group List"),
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: "sample-list-group", dataSource: listData_1.groupData, fields: fields, showCheckBox: true }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the checkbox functionalities of the ListView. Click multiple list item to check or uncheck the items.")),
        React.createElement("div", { id: "description", className: "descriptionLayout" },
            React.createElement("p", null,
                "The ListView component has checkbox feature, which is used to select multiple items from the list. This feature can be enabled using the",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view/#showcheckbox' }, "showCheckBox")),
                "property."),
            React.createElement("p", null, "In this sample, the checkbox is enabled on default list and group list."))));
};
exports.default = Checklist;
