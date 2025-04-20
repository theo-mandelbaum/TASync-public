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
exports.Default = void 0;
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rows = 5;
        _this.cols = 250;
        _this.cols2 = 500;
        return _this;
    }
    Default.prototype.floatFocus = function (args) {
        args.target.parentElement.classList.add('e-input-focus');
    };
    Default.prototype.floatBlur = function (args) {
        args.target.parentElement.classList.remove('e-input-focus');
    };
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: "textarea-sample", className: 'control-section input-content-wrapper' },
                React.createElement("div", { className: "row custom-margin material" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement("b", null, "Outlined and Filled"))),
                React.createElement("div", { className: "row custom-margin custom-padding-5 material" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement(ej2_react_inputs_1.TextAreaComponent, { placeholder: "Outlined", cssClass: "e-outline", floatLabelType: "Auto", rows: this.rows, cols: this.cols })),
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement(ej2_react_inputs_1.TextAreaComponent, { placeholder: "Filled", cssClass: "e-filled", floatLabelType: "Auto", rows: this.rows, cols: this.cols }))),
                React.createElement("div", { className: "row custom-margin" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement("b", null, "Please leave a comment"))),
                React.createElement("div", { className: "row custom-margin" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12" },
                        React.createElement(ej2_react_inputs_1.TextAreaComponent, { placeholder: "Enter your comments", floatLabelType: "Auto", rows: this.rows, cols: this.cols2 }))),
                React.createElement("div", { className: "row custom-margin" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement("b", null, "Validation States"))),
                React.createElement("div", { className: "row custom-margin" },
                    React.createElement("div", { className: "col-xs-4 col-sm-4 col-lg-4 col-md-4" },
                        React.createElement("div", { className: "e-input-group e-success" },
                            React.createElement("textarea", { className: "e-input", onFocus: this.floatFocus, onBlur: this.floatBlur, placeholder: "Success", rows: this.rows, cols: this.cols }))),
                    React.createElement("div", { className: "col-xs-4 col-sm-4 col-lg-4 col-md-4" },
                        React.createElement("div", { className: "e-input-group e-warning" },
                            React.createElement("textarea", { className: "e-input", onFocus: this.floatFocus, onBlur: this.floatBlur, placeholder: "Warning", rows: this.rows, cols: this.cols }))),
                    React.createElement("div", { className: "col-xs-4 col-sm-4 col-lg-4 col-md-4" },
                        React.createElement("div", { className: "e-input-group e-error" },
                            React.createElement("textarea", { className: "e-input", onFocus: this.floatFocus, onBlur: this.floatBlur, placeholder: "Error", rows: this.rows, cols: this.cols }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This example demonstrates the default functionalities of the ",
                    React.createElement("code", null, "TextArea"),
                    " control. Type a character in the TextArea element or focus-in to the TextArea for floating the label text. The label will be positioned back to TextArea on focus-out without value.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "A TextArea is an input element that allows users to input multiple lines of text. It can be used for editing or displaying text data."),
                React.createElement("br", null),
                React.createElement("table", { className: "custom-width" },
                    React.createElement("tr", null,
                        React.createElement("th", null, "Types"),
                        React.createElement("th", null, "Description")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Outlined & Filled textarea"),
                        React.createElement("td", null,
                            "You can render the following two types of text fields in the material theme by adding ",
                            React.createElement("b", null, "e-outline"),
                            " and ",
                            React.createElement("b", null, "e-filled"),
                            " class to cssClass API.",
                            React.createElement("ul", null,
                                React.createElement("li", null, "Filled text fields"),
                                React.createElement("li", null, "Outlined text fields")))),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Default TextArea"),
                        React.createElement("td", null,
                            React.createElement("div", { className: "custom-padding-bottom-10" },
                                " You can render textarea by adding class as ",
                                React.createElement("b", null, "e-input"),
                                ". You can also render textarea as group by adding parent element with ",
                                React.createElement("b", null, "e-input-group"),
                                " class added."))),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Validation states"),
                        React.createElement("td", null,
                            React.createElement("div", { className: "custom-padding-bottom-10" },
                                "You can apply validation states success, warning, error to the textarea with the corresponding classes added to the input element such as ",
                                React.createElement("b", null, "e-success"),
                                ", ",
                                React.createElement("b", null, "e-warning"),
                                ", ",
                                React.createElement("b", null, "e-error"),
                                ".")))),
                React.createElement("br", null))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
