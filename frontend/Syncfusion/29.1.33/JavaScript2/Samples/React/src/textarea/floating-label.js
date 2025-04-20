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
exports.FloatingLabel = void 0;
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./sample.css");
var FloatingLabel = /** @class */ (function (_super) {
    __extends(FloatingLabel, _super);
    function FloatingLabel(props) {
        var _this = _super.call(this, props) || this;
        _this.rows = 5;
        _this.cols = 300;
        _this.value = 'Auto';
        _this.floatLabelData = [
            { Id: 'Auto', Label: 'Auto' },
            { Id: 'Never', Label: 'Never' },
            { Id: 'Always', Label: 'Always' }
        ];
        _this.fields = { text: 'Label', value: 'Id' };
        return _this;
    }
    FloatingLabel.prototype.floatLabelHandler = function (args) {
        switch (args.value) {
            case 'Auto':
                this.textareaObj.floatLabelType = 'Auto';
                break;
            case 'Always':
                this.textareaObj.floatLabelType = 'Always';
                break;
            case 'Never':
                this.textareaObj.floatLabelType = 'Never';
                break;
        }
    };
    FloatingLabel.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: "textarea-sample", className: "col-lg-8 control-section floatinglabel" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { className: "floatinglabel-row" },
                        React.createElement(ej2_react_inputs_1.TextAreaComponent, { id: "floatlabel", placeholder: "Enter your comments", floatLabelType: "Auto", ref: function (scope) { _this.textareaObj = scope; }, rows: this.rows, cols: this.cols })))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "floatinglabel" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: "floatinglabel-property" },
                        React.createElement("tr", null,
                            React.createElement("td", { className: "left-side" }, "Float label type "),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "float", value: this.value, dataSource: this.floatLabelData, ref: function (dropdownlist) { _this.floatLabelObj = dropdownlist; }, fields: this.fields, change: this.floatLabelHandler.bind(this) })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the floating label functionalities of the textarea control. Choose the corresponding floatLabel option from the property panel to update the floating label behaviour in textarea.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The floating label is used to float the placeholder text while the user enters text or focuses on the textarea element with a value. In this sample, the floating label behavior can be changed using the following options:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Choose float label types either 'Never', 'Always', or 'Auto' to control the floating behavior of the placeholder text.")))));
    };
    return FloatingLabel;
}(sample_base_1.SampleBase));
exports.FloatingLabel = FloatingLabel;
