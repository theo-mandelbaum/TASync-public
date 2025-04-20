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
exports.Position = void 0;
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./position.css");
var Position = /** @class */ (function (_super) {
    __extends(Position, _super);
    function Position() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Position.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { id: "fabtarget", className: "fab-position-container custom-index" },
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab1", iconCss: 'fab-icons fab-icon-people', title: 'Top Left', position: 'TopLeft', cssClass: "e-success", target: '#fabtarget' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab2", iconCss: 'fab-icons fab-icon-people', title: 'Top Center', position: 'TopCenter', cssClass: "e-warning", target: '#fabtarget' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab3", iconCss: 'fab-icons fab-icon-people', title: 'Top Right', position: 'TopRight', cssClass: "e-success", target: '#fabtarget' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab4", iconCss: 'fab-icons fab-icon-people', title: 'Middle Left', position: 'MiddleLeft', cssClass: "e-warning", target: '#fabtarget' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab5", iconCss: 'fab-icons fab-icon-people', title: 'Middle Center', position: 'MiddleCenter', target: '#fabtarget' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab6", iconCss: 'fab-icons fab-icon-people', title: 'Middle Right', position: 'MiddleRight', cssClass: "e-warning", target: '#fabtarget' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab7", iconCss: 'fab-icons fab-icon-people', title: 'Bottom Left', position: 'BottomLeft', cssClass: "e-success", target: '#fabtarget' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab8", iconCss: 'fab-icons fab-icon-people', title: 'Bottom Center', position: 'BottomCenter', cssClass: "e-warning", target: '#fabtarget' }),
                    React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab9", iconCss: 'fab-icons fab-icon-people', title: 'Bottom Right', position: 'BottomRight', cssClass: "e-success", target: '#fabtarget' }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the different positions of the Floating Action Button in the target container.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Use the ",
                    React.createElement("code", null, "position"),
                    " property to change the position of the FAB in the target element."))));
    };
    return Position;
}(sample_base_1.SampleBase));
exports.Position = Position;
