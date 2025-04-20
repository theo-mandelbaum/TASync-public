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
exports.Linear = void 0;
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./linear.css");
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [
            {
                title: 'Image',
                iconCss: 'speeddial-icons speeddial-icon-image'
            },
            {
                title: 'Audio',
                iconCss: 'speeddial-icons speeddial-icon-audio'
            },
            {
                title: 'Video',
                iconCss: 'speeddial-icons speeddial-icon-video'
            }
        ];
        return _this;
    }
    Linear.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "speed-dial-wrapper" },
                    React.createElement("div", { id: "speeddialtarget", className: "speeddial-linear-target  custom-index" },
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-success", target: '#speeddialtarget', title: 'Top Left', position: 'TopLeft', items: this.items }),
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-warning", target: '#speeddialtarget', title: 'Top Center', position: 'TopCenter', items: this.items }),
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-success", target: '#speeddialtarget', title: 'Top Right', position: 'TopRight', items: this.items }),
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-warning", target: '#speeddialtarget', title: 'Middle Left', position: 'MiddleLeft', direction: "Right", items: this.items }),
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', target: '#speeddialtarget', title: 'Middle Center', position: 'MiddleCenter', items: this.items }),
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-warning", target: '#speeddialtarget', title: 'Middle Right', position: 'MiddleRight', direction: "Left", items: this.items }),
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-success", target: '#speeddialtarget', title: 'Bottom Left', position: 'BottomLeft', items: this.items }),
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-warning", target: '#speeddialtarget', title: 'Bottom Center', position: 'BottomCenter', items: this.items }),
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { openIconCss: 'speeddial-icons speeddial-icon-upload', cssClass: "e-success", target: '#speeddialtarget', title: 'Bottom Right', position: 'BottomRight', items: this.items })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the different positions of the Speed Dial component in the target container. Based on the position of the speed dial, action items\u2019 display direction will vary. Click the speed dial button to open action items. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Speed dial displays action items based on ",
                    React.createElement("code", null, "position"),
                    ", by default. Using the ",
                    React.createElement("code", null, "direction"),
                    " property, specify one of the below directions."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Up"),
                    React.createElement("li", null, "Down"),
                    React.createElement("li", null, "Left"),
                    React.createElement("li", null, "Right")))));
    };
    return Linear;
}(sample_base_1.SampleBase));
exports.Linear = Linear;
