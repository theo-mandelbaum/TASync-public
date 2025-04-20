"use strict";
/**
 * ListView Default Sample
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
var listData_1 = require("./listData");
require("./listview.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //Map the appropriate columns to fields property
    var fields = { groupBy: 'category' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: "flat-list" },
                React.createElement("p", { className: "displayText" }, "Flat List"),
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: "sample-list-flat", dataSource: listData_1.flatList })),
            React.createElement("div", { id: "group-list" },
                React.createElement("p", { className: "displayText" }, "Group List"),
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: "sample-list-group", dataSource: listData_1.groupData, fields: fields }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the ListView. Click any item from the list to select and highlight it.")),
        React.createElement("div", { id: "description", className: "descriptionLayout" },
            React.createElement("p", null, "The ListView component represents data in interactive hierarchical structure interface across different layouts or views, that also has the features such as data binding, template rendering, and grouping."),
            React.createElement("p", null,
                "The group list allows you to group the relevant items under a logical category by mapping the ",
                React.createElement("code", null,
                    React.createElement("a", { target: '_blank', className: 'code', href: 'https://ej2.syncfusion.com/react/documentation/api/list-view/fieldSettings/#groupby' }, "groupBy")),
                " field."),
            React.createElement("p", null,
                "In this sample, ",
                React.createElement("b", null, "Cars"),
                " are grouped based on their ",
                React.createElement("b", null, "Category"),
                "."))));
};
exports.default = Default;
