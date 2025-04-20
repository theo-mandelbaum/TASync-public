"use strict";
/**
 * Tooltip template sample
 */
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
exports.TemplateTooltip = void 0;
var React = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./tooltip-sample.css");
var TemplateTooltip = /** @class */ (function (_super) {
    __extends(TemplateTooltip, _super);
    function TemplateTooltip(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { content: '' };
        return _this;
    }
    //Tooltip content customization.
    TemplateTooltip.prototype.onBeforeRender = function (args) {
        var data = [
            { title: 'Bold', name: 'Bold (Ctrl+B)', note: 'Makes your text bold.' },
            { title: 'Underline', name: 'Underline (Ctrl+U)', note: 'Underline your text.' },
            { title: 'Italic', name: 'Italic (Ctrl+I)', note: 'Italicize your text.' },
            {
                title: 'Cut', name: 'Cut (Ctrl+X)',
                note: 'Remove the selection and put it on the Clipboard so you can paste it somewhere else.'
            },
            {
                title: 'Copy', name: 'Copy (Ctrl+C)',
                note: 'Put a copy of a selection on the Clipboard so you can paste it somewhere else.'
            },
            { title: 'Paste', name: 'Paste (Ctrl+V)', note: 'Add content on the Clipboard to your document.' }
        ];
        for (var i = 0; i < data.length; i++) {
            if (data[i].title === args.target.getAttribute('title')) {
                this.setState({
                    content: '<h6>' + data[i].name + '</h6><p>' + data[i].note + '</p>'
                });
            }
        }
    };
    ;
    TemplateTooltip.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_popups_1.TooltipComponent, { id: "template-tootip", content: this.state.content, target: ".toolbar-container [title]", beforeRender: this.onBeforeRender.bind(this), showTipPointer: false, offsetX: 70, width: 170 },
                    React.createElement("div", { className: "toolbar-container" },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { style: { margin: '10px auto' } },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-cut-icon tooltip-icons', tooltipText: 'Cut' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-copy-icon tooltip-icons', tooltipText: 'Copy' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-paste-icon tooltip-icons', tooltipText: 'Paste' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-bold-icon tooltip-icons', tooltipText: 'Bold' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-underline-icon tooltip-icons', tooltipText: 'Underline' }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-italic-icon tooltip-icons', tooltipText: 'Italic' })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the template functionalities of the Tooltip which will open by hover or touch-hold action on Toolbar option.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample illustrates the way to display the template content on the tooltip. With the usage of Template, the user can format and structure the HTML content to be displayed on the tooltip as per their application needs."),
                React.createElement("p", null,
                    "In this sample, the tooltip is integrated with toolbar component to display the respective icon\u2019s information. Here, the HTML template design is compiled and then the resultant output display is directly assigned to the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#content" }, "content"),
                    " property of the tooltip. The template compilation process needs to be done on the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#beforerender" }, "beforeRender"),
                    " event of the tooltip."),
                React.createElement("p", null,
                    "More information about setting template content on the Tooltip can be found in the",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/tooltip/content/#template-content", target: "_blank" }, " documentation section"),
                    "."))));
    };
    return TemplateTooltip;
}(sample_base_1.SampleBase));
exports.TemplateTooltip = TemplateTooltip;
