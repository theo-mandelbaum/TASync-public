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
exports.Resize = void 0;
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./sample.css");
var Resize = /** @class */ (function (_super) {
    __extends(Resize, _super);
    function Resize(props) {
        var _this = _super.call(this, props) || this;
        _this.rows = 5;
        _this.cols = 300;
        _this.value = 'Auto';
        _this.resizeModeData = [
            { Id: 'Vertical', Label: 'Vertical' },
            { Id: 'Horizontal', Label: 'Horizontal' },
            { Id: 'Both', Label: 'Both' },
            { Id: 'None', Label: 'None' }
        ];
        _this.fields = { text: 'Label', value: 'Id' };
        return _this;
    }
    Resize.prototype.resizeHandler = function (args) {
        switch (args.value) {
            case 'None':
                this.textareaObj.resizeMode = 'None';
                break;
            case 'Both':
                this.textareaObj.resizeMode = 'Both';
                break;
            case 'Vertical':
                this.textareaObj.resizeMode = 'Vertical';
                break;
            case 'Horizontal':
                this.textareaObj.resizeMode = 'Horizontal';
                break;
        }
    };
    Resize.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: "textarea-sample", className: "col-lg-8 control-section resize" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { className: "resize-row" },
                        React.createElement(ej2_react_inputs_1.TextAreaComponent, { id: "resize", placeholder: "Enter your comments", floatLabelType: "Auto", ref: function (scope) { _this.textareaObj = scope; }, rows: this.rows, cols: this.cols })))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "resize" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: "floatinglabel-property" },
                        React.createElement("tr", null,
                            React.createElement("td", { className: "left-side" }, "Resize Mode"),
                            React.createElement("td", null,
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "resizedropdown", value: this.value, dataSource: this.resizeModeData, ref: function (dropdownlist) { _this.resizeModeObj = dropdownlist; }, fields: this.fields, change: this.resizeHandler.bind(this) })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the resize functionalities of the textarea control. Choose the corresponding resizeMode option from the property panel to update the resize behavior in the textarea.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The textarea can be resized vertically, horizontally, or in both directions by selecting the following corresponding options:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Choose resizeMode options such as 'Both', 'Vertical', 'Horizontal', or 'None' to control the resize behavior of the textarea.")))));
    };
    return Resize;
}(sample_base_1.SampleBase));
exports.Resize = Resize;
