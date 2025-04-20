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
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "fab-default-container" },
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: "target1", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" }),
                            React.createElement("div", { id: "target2", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" })),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { id: "target3", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" }),
                            React.createElement("div", { id: "target4", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" }))),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab1", iconCss: 'e-icons e-people', isPrimary: false, position: 'MiddleCenter', title: "Contact", target: '#target1' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab2", iconCss: 'e-icons e-people', content: "Contact", position: 'MiddleCenter', target: '#target2' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab3", content: 'Disabled', disabled: true, iconCss: 'e-icons e-people', position: 'MiddleCenter', target: '#target3' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab4", content: 'Text Content', cssClass: 'e-warning', position: 'MiddleCenter', target: '#target4' }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the Floating Action Button (FAB).")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, each FAB showcases the usage of ",
                    React.createElement("code", null, "iconCss"),
                    ",",
                    React.createElement("code", null, "cssClass"),
                    ", ",
                    React.createElement("code", null, "content"),
                    " and ",
                    React.createElement("code", null, "disabled"),
                    " properties, such as:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Icon only FAB"),
                    React.createElement("li", null, "Icon with label FAB"),
                    React.createElement("li", null, "Disabled FAB"),
                    React.createElement("li", null, "Label Only FAB")))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
