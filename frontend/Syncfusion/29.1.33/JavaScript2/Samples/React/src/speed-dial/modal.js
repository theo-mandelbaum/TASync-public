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
exports.Modal = void 0;
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./modal.css");
var Modal = /** @class */ (function (_super) {
    __extends(Modal, _super);
    function Modal() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [
            {
                title: 'Home',
                iconCss: 'e-icons e-home'
            },
            {
                title: 'People',
                iconCss: 'e-icons e-people'
            },
            {
                title: 'Search',
                iconCss: 'e-icons e-search'
            },
            {
                title: 'Message',
                iconCss: 'e-icons e-comment-show'
            }
        ];
        return _this;
    }
    Modal.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "speed-dial-wrapper" },
                    React.createElement("div", { id: "speeddialtarget", className: "speeddial-modal-target  custom-index" },
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { title: "Menu", openIconCss: 'e-icons e-justify', closeIconCss: 'e-icons e-close', target: '#speeddialtarget', position: 'BottomCenter', modal: true, items: this.items })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The following sample demonstrates the modal popup of a speed dial. Click the button to open action items and click the overlay to close the action items.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Speed dial enables modal popup mode when the ",
                    React.createElement("code", null, "modal"),
                    " property is set. When this mode is enabled, an overlay is added to prevent background interaction, and actions are closed when the overlay is clicked."))));
    };
    return Modal;
}(sample_base_1.SampleBase));
exports.Modal = Modal;
