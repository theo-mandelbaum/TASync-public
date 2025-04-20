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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = ej2_base_1.Browser.isDevice ? 'Touch hold to open the ContextMenu' :
            'Right click/Touch hold to open the ContextMenu';
        _this.template = "<div class='menu-wrapper'><span class='${iconCss} icon-right'></span><div class='text-content'><span class='text'>${answerType}</span><span class='description'>${description}</span></div></div>";
        //ContextMenu items definition
        _this.menuItems = [
            {
                answerType: 'Selection',
                description: "Choose from options",
                iconCss: 'e-icons e-list-unordered'
            },
            {
                answerType: 'Yes / No',
                description: "Select Yes or No",
                iconCss: 'e-icons e-check-box',
            },
            {
                answerType: 'Text',
                description: "Type own answer",
                iconCss: 'e-icons e-caption',
                items: [
                    {
                        answerType: 'Single line',
                        description: "Type answer in a single line",
                        iconCss: 'e-icons e-text-form'
                    },
                    {
                        answerType: 'Multiple line',
                        description: "Type answer in multiple line",
                        iconCss: 'e-icons e-text-wrap'
                    }
                ]
            },
            {
                answerType: 'None',
                iconCss: 'e-icons e-comment-show',
                description: "No answer required"
            },
        ];
        _this.addTemplateClass = function (args) {
            if (args.element.classList.contains('e-ul')) {
                args.element.classList.add('e-contextMenu-template');
            }
        };
        return _this;
    }
    Template.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'contextmenu-section' },
                    React.createElement("div", { id: 'contextmenu-control' },
                        React.createElement("div", { id: "contextmenutarget" }, this.content),
                        React.createElement(ej2_react_navigations_1.ContextMenuComponent, { className: "e-contextMenu-template", target: '#contextmenutarget', items: this.menuItems, itemTemplate: this.template, beforeOpen: this.addTemplateClass })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the template functionality of the ContextMenu. Right-click or touch and hold the designated rectangular area to open the ContextMenu, which displays customized items using a template.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "ContextMenu is a graphical user interface that appears on a right-click or touch-and-hold action. It supports displaying single-level or multi-level menus and allows for customizing the menu items through templates."),
                React.createElement("p", null,
                    "In this demo, ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", className: "your-class-name", href: "https://ej2.syncfusion.com/react/documentation/api/context-menu/#itemTemplate" }, "itemTemplate")),
                    " property is used to enable template support for customizing ContextMenu items. Each menu item is customized using a template to include icons, descriptive text, and additional content, offering a flexible and user-friendly interface."),
                React.createElement("p", null, "In mobile, the sub menu opens in a single layer with option for switching back to parent menu."),
                React.createElement("p", null,
                    "More information about ContextMenu can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/context-menu/getting-started" }, "documentation section"),
                    "."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
