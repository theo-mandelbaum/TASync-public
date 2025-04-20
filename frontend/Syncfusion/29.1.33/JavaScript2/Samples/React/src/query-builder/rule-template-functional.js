"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var sample_base_1 = require("../common/sample-base");
require("./rule-template.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_source_1 = require("./data-source");
var RuleTemplate = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var qryBldrObj = (0, react_1.useRef)(null);
    var importRules = {
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
    var ruleTemplate = function (props) {
        var items;
        var fields;
        items = [
            { field: "USA", label: "USA" },
            { field: "England", label: "England" },
            { field: "India", label: "India" },
            { field: "Spain", label: "Spain" },
        ];
        fields = { text: "field", value: "label" };
        var state = Object.assign({}, props);
        var fieldChange = function (args) {
            qryBldrObj.current.notifyChange(args.value, args.element, "field");
        };
        var valueChange = function (args) {
            qryBldrObj.current.notifyChange(args.value, args.element, "value");
        };
        var operatorClick = function (args) {
            qryBldrObj.current.getRule(args.event.target).operator = args.value;
        };
        var args = state;
        return (React.createElement("div", { className: "e-rule e-rule-template" },
            React.createElement("div", { className: "e-rule-filter" },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { change: fieldChange, fields: args.fields, dataSource: args.columns, value: args.rule.field })),
            React.createElement("div", { className: "e-rule-operator e-operator" },
                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: args.ruleID + "_operator1", change: operatorClick, label: "Is Equal", value: "equal", name: "operator", checked: true }),
                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: args.ruleID + "_operator2", change: operatorClick, label: "Is Not Equal", value: "not equal", name: "operator" })),
            React.createElement("div", { className: "e-rule-value e-value e-custom-value" },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { change: valueChange, fields: fields, dataSource: items, value: args.rule.value })),
            React.createElement("div", { className: "e-rule-value-delete" },
                React.createElement("button", { className: "e-removerule e-custom-delete e-rule-delete e-css e-btn e-small e-round", title: "Delete Rule" },
                    React.createElement("span", { className: "e-btn-icon e-icons e-delete-icon" })))));
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { id: "querybuilder", rule: importRules, dataSource: data_source_1.employeeData, ref: qryBldrObj },
                    React.createElement(ej2_react_querybuilder_1.ColumnsDirective, null,
                        React.createElement(ej2_react_querybuilder_1.ColumnDirective, { field: "EmployeeID", label: "Employee ID", type: "number" }),
                        React.createElement(ej2_react_querybuilder_1.ColumnDirective, { field: "FirstName", label: "First Name", type: "string" }),
                        React.createElement(ej2_react_querybuilder_1.ColumnDirective, { field: "LastName", label: "Last Name", type: "string" }),
                        React.createElement(ej2_react_querybuilder_1.ColumnDirective, { field: "HireDate", label: "Hire Date", type: "date" }),
                        React.createElement(ej2_react_querybuilder_1.ColumnDirective, { field: "Country", label: "Country", type: "string", ruleTemplate: ruleTemplate }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Rule Template functionality in QueryBuilder component using RadioButton components. In the Country column, user can change the Operator as equal/not equal using RadioButton component and select the Value from DropDownList component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This sample illustrates how to integrate ruleTemplate to the columns in the QueryBuilder. This is used for creating custom user interface for the columns with custom components and update the rule collection by using the component events."),
            React.createElement("p", null,
                "More information about Query Builder can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = RuleTemplate;
