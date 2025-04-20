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
exports.Styles = void 0;
var React = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./styles.css");
var Styles = /** @class */ (function (_super) {
    __extends(Styles, _super);
    function Styles() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [
            {
                text: 'Cut',
                iconCss: 'speeddial-icons speeddial-icon-cut'
            },
            {
                text: 'Copy',
                iconCss: 'speeddial-icons speeddial-icon-copy'
            },
            {
                text: 'Paste',
                iconCss: 'speeddial-icons speeddial-icon-paste'
            },
            {
                text: 'Delete',
                iconCss: 'speeddial-icons speeddial-icon-delete'
            },
            {
                text: 'Save',
                iconCss: 'speeddial-icons speeddial-icon-save'
            }
        ];
        _this.itemLabel = [
            {
                text: 'Cut'
            },
            {
                text: 'Copy'
            },
            {
                text: 'Paste'
            },
            {
                text: 'Delete'
            },
            {
                text: 'Save'
            }
        ];
        _this.tooltItem = [
            {
                title: 'Cut',
                iconCss: 'speeddial-icons speeddial-icon-cut'
            },
            {
                title: 'Copy',
                iconCss: 'speeddial-icons speeddial-icon-copy'
            },
            {
                title: 'Paste',
                iconCss: 'speeddial-icons speeddial-icon-paste'
            },
            {
                title: 'Delete',
                iconCss: 'speeddial-icons speeddial-icon-delete'
            },
            {
                title: 'Save',
                iconCss: 'speeddial-icons speeddial-icon-save'
            }
        ];
        return _this;
    }
    Styles.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: "speed-dial-wrapper" },
                    React.createElement(ej2_react_popups_1.TooltipComponent, { id: "details", target: ".tooltip-speeddial .e-speeddial-li", position: "LeftCenter" }),
                    React.createElement("div", { id: "speeddialtarget", className: "speeddial-appearence-target  custom-index" },
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { id: "speeddial1", content: "Edit", target: "#speeddialtarget", position: "BottomCenter", openIconCss: "speeddial-icons speeddial-icon-edit", iconPosition: "Left", items: this.items }),
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { id: "speeddial2", content: "Edit", target: "#speeddialtarget", position: "BottomLeft", items: this.itemLabel }),
                        React.createElement(ej2_react_buttons_1.SpeedDialComponent, { id: "speeddial3", title: "Edit", target: "#speeddialtarget", position: "BottomRight", cssClass: "tooltip-speeddial", openIconCss: "speeddial-icons speeddial-icon-edit", items: this.tooltItem })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the appearance customization of the Speed Dial action items. Click the Speed Dial button to open action items.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In the above example, Speed Dial items appearence customized using ",
                    React.createElement("code", null, "text"),
                    " and ",
                    React.createElement("code", null, "iconCss"),
                    " properties of ",
                    React.createElement("code", null, "SpeedDialItemModel"),
                    "."))));
    };
    return Styles;
}(sample_base_1.SampleBase));
exports.Styles = Styles;
