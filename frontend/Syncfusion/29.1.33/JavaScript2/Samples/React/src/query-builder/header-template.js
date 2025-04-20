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
exports.HeaderFormTemplate = exports.HeaderTemplate = void 0;
var React = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./header-template.css");
var HeaderTemplate = /** @class */ (function (_super) {
    __extends(HeaderTemplate, _super);
    function HeaderTemplate(args) {
        var _this = _super.call(this, args) || this;
        _this.columnData = [
            { field: 'EmployeeID', label: 'EmployeeID', type: 'number' },
            { field: 'FirstName', label: 'FirstName', type: 'string' },
            { field: 'LastName', label: 'LastName', type: 'string' },
            { field: 'HireDate', label: 'HireDate', type: 'date', format: 'dd/MM/yyyy' },
            { field: 'Country', label: 'Country', type: 'string' },
        ];
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
    HeaderTemplate.prototype.headerTemplate = function (props) {
        return (React.createElement(HeaderFormTemplate, __assign({}, props)));
    };
    HeaderTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-12 control-section' },
                    React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { id: "querybuilder", columns: this.columnData, rule: this.importRules, headerTemplate: this.headerTemplate, ref: function (scope) { _this.qryBldrObj = scope; } }))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the Header Template functionality in QueryBuilder component using DropDownList and Button components. In this sample, user can change the Condition using DropDownList component and adding rules, groups and deleting groups by using Button component.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "This sample illustrates how to integrate HeaderTemplate in the QueryBuilder. This is used for creating custom user interface for the header with custom components and update the rule collection by using the component events."),
                React.createElement("p", null,
                    "More information about Query Builder can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/' }, "documentation section"),
                    "."))));
    };
    return HeaderTemplate;
}(sample_base_1.SampleBase));
exports.HeaderTemplate = HeaderTemplate;
var HeaderFormTemplate = /** @class */ (function (_super) {
    __extends(HeaderFormTemplate, _super);
    function HeaderFormTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.items = [{ 'key': 'AND', 'value': 'and' }, { 'key': 'OR', 'value': 'or' }];
        _this.fields = { text: 'key', value: 'value' };
        _this.state = Object.assign({}, props);
        _this.qryBldrObj = (0, ej2_base_1.getComponent)(document.getElementById('querybuilder'), 'query-builder');
        return _this;
    }
    HeaderFormTemplate.prototype.conditionChange = function (args) {
        this.qryBldrObj.notifyChange(args.value, args.element, 'condition');
    };
    HeaderFormTemplate.prototype.addGroupClick = function (args) {
        var addbtn = args.currentTarget.offsetParent.id;
        var ddb = addbtn.split('_');
        this.qryBldrObj.addGroups([{ condition: 'and', 'rules': [{}] }], ddb[1]);
    };
    HeaderFormTemplate.prototype.addRuleClick = function (args) {
        var addbtn = args.currentTarget.offsetParent.id;
        var ddb = addbtn.split('_');
        this.qryBldrObj.addRules([{}], ddb[1]);
    };
    HeaderFormTemplate.prototype.onClick = function (args) {
        this.qryBldrObj.deleteGroup((0, ej2_base_1.closest)(args.target.offsetParent, '.e-group-container'));
    };
    HeaderFormTemplate.prototype.render = function () {
        var _this = this;
        var args = this.state;
        return (React.createElement("div", { className: "query-template-control" },
            React.createElement("div", { className: "e-groupheader" },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: args.ruleID + "_cndtn", cssClass: 'e-custom-group-btn', width: "100px", dataSource: this.items, fields: this.fields, value: args.condition, change: this.conditionChange.bind(this) }),
                React.createElement("div", { className: "e-header" },
                    React.createElement("div", { className: "e-qb-hdr-content" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-grp-btn", cssClass: 'e-primary', onClick: this.addGroupClick.bind(this) }, "Add Group")),
                    React.createElement("div", { className: "e-qb-hdr-content" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "e-cond-btn", cssClass: 'e-primary', onClick: this.addRuleClick.bind(this) }, "Add Condition")),
                    (function () {
                        if (args.ruleID !== "querybuilder_group0") {
                            return (React.createElement("div", { className: "e-qb-hdr-content" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: args.ruleID + "_dltbtn", cssClass: 'e-danger', onClick: _this.onClick.bind(_this) }, "Remove")));
                        }
                    })()))));
    };
    return HeaderFormTemplate;
}(React.Component));
exports.HeaderFormTemplate = HeaderFormTemplate;
