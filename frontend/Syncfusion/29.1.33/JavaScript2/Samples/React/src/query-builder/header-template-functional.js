"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./header-template.css");
var HeaderTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var qryBldrObj = (0, react_1.useRef)(null);
    var columnData;
    var importRules;
    columnData = [
        { field: "EmployeeID", label: "EmployeeID", type: "number" },
        { field: "FirstName", label: "FirstName", type: "string" },
        { field: "LastName", label: "LastName", type: "string" },
        {
            field: "HireDate",
            label: "HireDate",
            type: "date",
            format: "dd/MM/yyyy",
        },
        { field: "Country", label: "Country", type: "string" },
    ];
    importRules = {
        condition: "and",
        rules: [
            {
                label: "First Name",
                field: "FirstName",
                type: "string",
                operator: "equal",
                value: "Nancy",
            },
            {
                label: "Country",
                field: "Country",
                type: "string",
                operator: "equal",
                value: "USA",
            },
        ],
    };
    var headerTemplate = function (props) {
        var items;
        var fields;
        items = [
            { key: "AND", value: "and" },
            { key: "OR", value: "or" },
        ];
        fields = { text: "key", value: "value" };
        var state = Object.assign({}, props);
        var conditionChange = function (args) {
            qryBldrObj.current.notifyChange(args.value, args.element, "condition");
        };
        var addGroupClick = function (args) {
            var addbtn = args.currentTarget.offsetParent.id;
            var ddb = addbtn.split("_");
            qryBldrObj.current.addGroups([{ condition: "and", rules: [{}] }], ddb[1]);
        };
        var addRuleClick = function (args) {
            var addbtn = args.currentTarget.offsetParent.id;
            var ddb = addbtn.split("_");
            qryBldrObj.current.addRules([{}], ddb[1]);
        };
        var onClick = function (args) {
            qryBldrObj.current.deleteGroup((0, ej2_base_1.closest)(args.target.offsetParent, ".e-group-container"));
        };
        var args = state;
        return (React.createElement("div", { className: "query-template-control" },
            React.createElement("div", { className: "e-groupheader" },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: args.ruleID + "_cndtn", cssClass: "e-custom-group-btn", width: "100px", dataSource: items, fields: fields, value: args.condition, change: conditionChange }),
                React.createElement("div", { className: "e-header" },
                    React.createElement("div", { className: "e-qb-hdr-content" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-grp-btn", cssClass: "e-primary", onClick: addGroupClick }, "Add Group")),
                    React.createElement("div", { className: "e-qb-hdr-content" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-cond-btn", cssClass: "e-primary", onClick: addRuleClick }, "Add Condition")),
                    (function () {
                        if (args.ruleID !== "querybuilder_group0") {
                            return (React.createElement("div", { className: "e-qb-hdr-content" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: args.ruleID + "_dltbtn", cssClass: "e-danger", onClick: onClick }, "Remove")));
                        }
                    })()))));
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { id: "querybuilder", columns: columnData, rule: importRules, headerTemplate: headerTemplate, ref: qryBldrObj }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Header Template functionality in QueryBuilder component using DropDownList and Button components. In this sample, user can change the Condition using DropDownList component and adding rules, groups and deleting groups by using Button component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This sample illustrates how to integrate HeaderTemplate in the QueryBuilder. This is used for creating custom user interface for the header with custom components and update the rule collection by using the component events."),
            React.createElement("p", null,
                "More information about Query Builder can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = HeaderTemplate;
