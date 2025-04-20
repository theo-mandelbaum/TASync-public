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
exports.Template = void 0;
var React = require("react");
var ej2_react_multicolumn_combobox_1 = require("@syncfusion/ej2-react-multicolumn-combobox");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var data = require("./dataSource.json");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fields = { text: 'Name', value: 'Eimg' };
        return _this;
    }
    Template.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: 'control-wrapper template-multicolumn' },
                    React.createElement("div", { style: { paddingTop: '55px' } },
                        React.createElement("label", null, "Select an employee"),
                        React.createElement(ej2_react_multicolumn_combobox_1.MultiColumnComboBoxComponent, { cssClass: 'multicolumn-customize', type: "text", dataSource: data.empList, fields: this.fields, placeholder: 'e.g. Andrew Fuller', popupHeight: '230px', popupWidth: '540px', gridSettings: { rowHeight: 40 } },
                            React.createElement(ej2_react_multicolumn_combobox_1.ColumnsDirective, null,
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Eimg', header: 'Photos', width: 90, headerTemplate: '<div class="header"> <span>Photo</span> </div>', template: '<div><img class="empImage" src="src/multicolumn-combobox/Employees/${Eimg}.png" alt="employee"/> </div>' }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Name', header: 'Employee Name', width: 160, headerTemplate: '<div class="header"> <span class="e-icons e-multicolumn-userlogin"></span> <span>Employee info</span> </div>', template: '<div class="ename"> ${Name} </div>' + '<div class="job"> ${Designation} </div>' }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'DateofJoining', header: 'Date Of Joining', width: 165, headerTemplate: '<div class="header"> <span class="e-icons e-multicolumn-calender"></span> <span>Date of joining</span> </div>', template: '<div class="dateOfJoining"> ${DateofJoining} </div>' }),
                                React.createElement(ej2_react_multicolumn_combobox_1.ColumnDirective, { field: 'Country', header: 'Country', width: 100, headerTemplate: '<div class="header"> <span>Country</span> </div>', template: '<div class="country"> ${Country} </div>' })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the template functionalities of the MultiColumn ComboBox.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The MultiColumn ComboBox provides several options to customize each list items and column headers."),
                React.createElement("p", null, "This sample uses the following list of templates in ComboBox"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Template"),
                        " - To customize the MultiColumn ComboBox list item's content."),
                    React.createElement("li", null,
                        React.createElement("code", null, "HeaderTemplate"),
                        " - To customize the header element.")))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
