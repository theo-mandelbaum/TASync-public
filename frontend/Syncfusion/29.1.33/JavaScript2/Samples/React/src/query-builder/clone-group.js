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
exports.CloneTemplate = void 0;
var React = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var sample_base_1 = require("../common/sample-base");
var data_source_1 = require("./data-source");
var CloneTemplate = /** @class */ (function (_super) {
    __extends(CloneTemplate, _super);
    function CloneTemplate(args) {
        var _this = _super.call(this, args) || this;
        _this.boolOperators = [
            { value: 'equal', key: 'Equal' },
        ];
        _this.dateOperators = [
            { value: 'equal', key: 'Equal' },
            { value: 'greaterthan', key: 'Greater Than' },
            { value: 'greaterthanorequal', key: 'Greater Than Or Equal' },
            { value: 'lessthan', key: 'Less Than' },
            { value: 'lessthanorequal', key: 'Less Than Or Equal' },
            { value: 'notequal', key: 'Not Equal' },
            { value: 'between', key: 'Between' },
            { value: 'notbetween', key: 'Not Between' }
        ];
        _this.columnData = [
            { field: "EmployeeID", label: "Employee ID", type: "number" },
            { field: "FirstName", label: "First Name", type: "string" },
            { field: "LastName", label: "Last Name", type: "string" },
            { field: "Age", label: "Age", type: "number" },
            { field: "IsDeveloper", label: "Is Developer", type: "boolean", operators: _this.boolOperators },
            { field: "PrimaryFramework", label: "Primary Framework", type: "string" },
            { field: "HireDate", label: "Hire Date", type: "date", format: "MM/dd/yyyy", operators: _this.dateOperators },
            { field: "Country", label: "Country", type: "string" },
        ];
        _this.importRules = {
            condition: "and",
            rules: [
                { label: "First Name", field: "FirstName", type: "string", operator: "startswith", value: "Andre" },
                { label: "Last Name", field: "LastName", type: "string", operator: "in", value: ['Davolio', 'Buchanan'] },
                { label: "Age", field: "Age", type: "number", operator: "greaterthan", value: 29 },
                { condition: "or", rules: [
                        { label: "Is Developer", field: "IsDeveloper", type: "boolean", operator: "equal", value: true },
                        { label: "Primary Framework", field: "PrimaryFramework", type: "string", operator: "equal", value: "React" }
                    ]
                },
                { label: "Hire Date", field: "HireDate", type: "date", operator: "between", value: ["11/22/2023", "11/30/2023"] },
            ],
        };
        return _this;
    }
    CloneTemplate.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'row' },
                    React.createElement("div", { className: 'col-lg-12 control-section' },
                        React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { id: "querybuilder", dataSource: data_source_1.employeeData, columns: this.columnData, rule: this.importRules, ref: function (scope) { _this.qryBldrObj = scope; }, showButtons: { cloneGroup: true, cloneRule: true } })))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the clone support of the Query Builder component. Click the clone button to clone the group or rule.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "The Clone options will create an exact replica of a rule or group next to the original."),
                React.createElement("p", null, " In mobile mode it is shown in vertical mode."),
                React.createElement("p", null,
                    "More information about Query Builder can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/' }, "documentation section"),
                    "."))));
    };
    return CloneTemplate;
}(sample_base_1.SampleBase));
exports.CloneTemplate = CloneTemplate;
