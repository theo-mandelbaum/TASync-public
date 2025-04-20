"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesTemplate = exports.RuleTemplate = void 0;
var React = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./rule-template.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var data_source_1 = require("./data-source");
var RuleTemplate = /** @class */ (function (_super) {
    __extends(RuleTemplate, _super);
    function RuleTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.importRules = {
            'condition': 'and',
            'rules': [{
                    'label': 'First Name',
                    'field': 'FirstName',
                    'type': 'string',
                    'operator': 'equal',
                    'value': 'Nancy'
                },
                {
                    'label': 'Country',
                    'field': 'Country',
                    'type': 'string',
                    'operator': 'equal',
                    'value': "USA"
                }
            ]
        };
        return _this;
    }
    RuleTemplate.prototype.ruleTemplate = function (props) {
        return (React.createElement(RulesTemplate, __assign({}, props)));
    };
    RuleTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-12 control-section' },
                    React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { id: "querybuilder", rule: this.importRules, dataSource: data_source_1.employeeData, ref: function (scope) { _this.qryBldrObj = scope; } },
                        React.createElement(ej2_react_querybuilder_1.ColumnsDirective, null,
                            React.createElement(ej2_react_querybuilder_1.ColumnDirective, { field: "EmployeeID", label: "Employee ID", type: "number" }),
                            React.createElement(ej2_react_querybuilder_1.ColumnDirective, { field: "FirstName", label: "First Name", type: "string" }),
                            React.createElement(ej2_react_querybuilder_1.ColumnDirective, { field: "LastName", label: "Last Name", type: "string" }),
                            React.createElement(ej2_react_querybuilder_1.ColumnDirective, { field: "HireDate", label: "Hire Date", type: "date" }),
                            React.createElement(ej2_react_querybuilder_1.ColumnDirective, { field: "Country", label: "Country", type: "string", ruleTemplate: this.ruleTemplate }))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the Rule Template functionality in QueryBuilder component using RadioButton components.  In the Country column, user can change the Operator as equal/not equal using RadioButton component and select the Value from DropDownList component.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "This sample illustrates how to integrate ruleTemplate to the columns in the QueryBuilder. This is used for creating custom user interface for the columns with custom components and update the rule collection by using the component events."),
                React.createElement("p", null,
                    "More information about Query Builder can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/' }, "documentation section"),
                    "."))));
    };
    return RuleTemplate;
}(sample_base_1.SampleBase));
exports.RuleTemplate = RuleTemplate;
var RulesTemplate = /** @class */ (function (_super) {
    __extends(RulesTemplate, _super);
    function RulesTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.items = [{ field: 'USA', label: 'USA' }, { field: 'England', label: 'England' }, { field: 'India', label: 'India' }, { field: 'Spain', label: 'Spain' }];
        _this.fields = { text: 'field', value: 'label' };
        _this.state = Object.assign({}, props);
        _this.qryBldrObj = (0, ej2_base_1.getComponent)(document.getElementById('querybuilder'), 'query-builder');
        return _this;
    }
    ;
    RulesTemplate.prototype.fieldChange = function (args) {
        this.qryBldrObj.notifyChange(args.value, args.element, 'field');
    };
    RulesTemplate.prototype.valueChange = function (args) {
        this.qryBldrObj.notifyChange(args.value, args.element, 'value');
    };
    RulesTemplate.prototype.operatorClick = function (args) {
        this.qryBldrObj.getRule(args.event.target).operator = args.value;
    };
    RulesTemplate.prototype.render = function () {
        var args = this.state;
        return (React.createElement("div", { className: "e-rule e-rule-template" },
            React.createElement("div", { className: "e-rule-filter" },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { change: this.fieldChange.bind(this), fields: args.fields, dataSource: args.columns, value: args.rule.field })),
            React.createElement("div", { className: "e-rule-operator e-operator" },
                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: args.ruleID + "_operator1", change: this.operatorClick.bind(this), label: "Is Equal", value: "equal", name: "operator", checked: true }),
                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { id: args.ruleID + "_operator2", change: this.operatorClick.bind(this), label: "Is Not Equal", value: "not equal", name: "operator" })),
            React.createElement("div", { className: "e-rule-value e-value e-custom-value" },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { change: this.valueChange.bind(this), fields: this.fields, dataSource: this.items, value: args.rule.value })),
            React.createElement("div", { className: "e-rule-value-delete" },
                React.createElement("button", { className: "e-removerule e-custom-delete e-rule-delete e-css e-btn e-small e-round", title: "Delete Rule" },
                    React.createElement("span", { className: "e-btn-icon e-icons e-delete-icon" })))));
    };
    return RulesTemplate;
}(React.Component));
exports.RulesTemplate = RulesTemplate;
