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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexDatabinding = void 0;
var React = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var data_source_1 = require("./data-source");
var sample_base_1 = require("../common/sample-base");
require("./complex-databinding.css");
var ComplexDatabinding = /** @class */ (function (_super) {
    __extends(ComplexDatabinding, _super);
    function ComplexDatabinding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fieldMode = 'DropdownTree';
        _this.separator = '.';
        _this.columns = [
            { field: 'Employee', label: 'Employee', columns: [
                    { field: 'ID', label: 'ID', type: 'number' },
                    { field: 'DOB', label: 'Date of birth', type: 'date', format: 'yMd' },
                    { field: 'HireDate', label: 'Hire Date', type: 'date' },
                    { field: 'Salary', label: 'Salary', type: 'number' },
                    { field: 'Age', label: 'Age', type: 'number' },
                    { field: 'Title', label: 'Title', type: 'string' }
                ] },
            { field: 'Name', label: 'Name', columns: [
                    { field: 'FirstName', label: 'First Name', type: 'string' },
                    { field: 'LastName', label: 'Last Name', type: 'string' }
                ] },
            { field: 'Country', label: 'Country', columns: [
                    { field: 'State', label: 'State', columns: [
                            { field: 'City', label: 'City', type: 'string' },
                            { field: 'Zipcode', label: 'Zip Code', type: 'number' }
                        ] },
                    { field: 'Region', label: 'Region', type: 'string' },
                    { field: 'Name', label: 'Name', type: 'string' }
                ] }
        ];
        _this.importRules = {
            'condition': 'and',
            'rules': [{
                    'label': 'ID',
                    'field': 'Employee.ID',
                    'type': 'number',
                    'operator': 'equal',
                    'value': 1001
                },
                {
                    'label': 'First Name',
                    'field': 'Name.FirstName',
                    'type': 'string',
                    'operator': 'equal',
                    'value': 'Mark'
                },
                {
                    'condition': 'or',
                    'rules': [{
                            'label': 'City',
                            'field': 'Country.State.City',
                            'operator': 'equal',
                            'type': 'string',
                            'value': 'Jersey City'
                        }, {
                            'label': 'Date of birth',
                            'field': 'Employee.DOB',
                            'operator': 'equal',
                            'type': 'date',
                            'value': '7/7/96'
                        }]
                }
            ]
        };
        return _this;
    }
    ComplexDatabinding.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'col-lg-12 control-section' },
                    React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { dataSource: data_source_1.complexData, columns: this.columns, rule: this.importRules, fieldMode: this.fieldMode, separator: this.separator }))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null,
                    "This sample demonstrates the Complex Databinding functionalities of the Query Builder component. In the ",
                    React.createElement("b", null, "Complex Databinding"),
                    ", select an item from the hierarchical structure options list.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null,
                    "In ",
                    React.createElement("b", null, "Query Builder"),
                    ", the Complex Databinding input field can be change neither ",
                    React.createElement("b", null, "Dropdown List"),
                    "nor ",
                    React.createElement("b", null, "Dropdown Tree"),
                    " using the ",
                    React.createElement("code", null, "fieldMode"),
                    " property."),
                React.createElement("p", null, "In this sample, the Complex Databinding integrated with the Dropdown Tree."),
                React.createElement("p", null,
                    "More information about Query Builder can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/' }, "documentation section"),
                    "."))));
    };
    return ComplexDatabinding;
}(sample_base_1.SampleBase));
exports.ComplexDatabinding = ComplexDatabinding;
