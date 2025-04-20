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
exports.MentionIntegration = void 0;
/**
 * Rich Text Editor Mention integration sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./mention-integration.css");
var MentionIntegration = /** @class */ (function (_super) {
    __extends(MentionIntegration, _super);
    function MentionIntegration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.data = [
            { Name: "Selma Rose", Status: "active", Eimg: "2", EmailId: "selma@gmail.com" },
            { Name: "Maria", Status: "active", Eimg: "1", EmailId: "maria@gmail.com" },
            { Name: "Russo Kay", Status: "busy", Eimg: "8", EmailId: "russo@gmail.com" },
            { Name: "Camden Kate", Status: "active", Eimg: "9", EmailId: "camden@gmail.com" },
            { Name: "Robert", Status: "busy", Eimg: "dp", EmailId: "robert@gmail.com" },
            { Name: "Garth", Status: "active", Eimg: "7", EmailId: "garth@gmail.com" },
            { Name: "Andrew James", Status: "away", Eimg: "pic04", EmailId: "noah@gmail.com" },
            { Name: "Olivia", Status: "busy", Eimg: "5", EmailId: "olivia@gmail.com" },
            { Name: "Sophia", Status: "away", Eimg: "6", EmailId: "sophia@gmail.com" },
            { Name: "Margaret", Status: "active", Eimg: "3", EmailId: "margaret@gmail.com" },
            { Name: "Ursula Ann", Status: "active", Eimg: "dp", EmailId: "ursula@gmail.com" },
            { Name: "Laura Grace", Status: "away", Eimg: "4", EmailId: "laura@gmail.com" },
            { Name: "Albert", Status: "active", Eimg: "pic03", EmailId: "albert@gmail.com" },
            { Name: "William", Status: "away", Eimg: "10", EmailId: "william@gmail.com" }
        ];
        _this.fieldsData = { text: 'Name' };
        return _this;
    }
    MentionIntegration.prototype.itemTemplate = function (data) {
        return (React.createElement("table", null,
            React.createElement("tr", null,
                React.createElement("td", null,
                    React.createElement("div", { id: "mention-TemplateList" },
                        React.createElement("img", { className: "mentionEmpImage", src: "src/rich-text-editor/images/" + data.Eimg + ".png" }),
                        React.createElement("span", { className: "e-badge e-badge-success e-badge-overlap e-badge-dot e-badge-bottom" + data.Status }))),
                React.createElement("td", { className: "mentionNameList" },
                    React.createElement("span", { className: "person" }, data.Name),
                    React.createElement("span", { className: "email" }, data.EmailId)))));
    };
    MentionIntegration.prototype.displayTemplate = function (data) {
        return (React.createElement(React.Fragment, null,
            React.createElement("a", { href: "mailto:".concat(data.EmailId), title: data.EmailId },
                "@",
                data.Name)));
    };
    MentionIntegration.prototype.actionBegineHandler = function (args) {
        if (args.requestType === 'EnterAction' && this.mentionObj.element.classList.contains('e-popup-open')) {
            args.cancel = true;
        }
    };
    MentionIntegration.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rte" },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "mention_integration", placeholder: "Type @ and tag the name", actionBegin: this.actionBegineHandler.bind(this) },
                        React.createElement("p", null,
                            "Hello ",
                            React.createElement("span", { contentEditable: false, className: 'e-mention-chip' },
                                React.createElement("a", { href: "mailto:maria@gmail.com", title: "maria@gmail.com" }, "@Maria")),
                            "\u200B"),
                        React.createElement("p", null,
                            "Welcome to the mention integration with rich text editor demo. Type ",
                            React.createElement("code", null, "@"),
                            " character and tag user from the suggestion list. "),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup] })))),
            React.createElement(ej2_react_dropdowns_1.MentionComponent, { ref: function (scope) { _this.mentionObj = scope; }, id: "mentionEditor", target: "#mention_integration_rte-edit-view", suggestionCount: 8, showMentionChar: false, allowSpaces: true, dataSource: this.data, fields: this.fieldsData, popupWidth: "250px", popupHeight: "200px", itemTemplate: this.itemTemplate, displayTemplate: this.displayTemplate, suffixText: '\u00A0' }),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example shows how to integrate @mention component within Rich Text Editor component. Type `@` character and select a user from the suggestion list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, " The @Mention is a component used to display a list of items that users can select or tag from the suggested list. In this demo, configured the following properties with popup dimensions."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "allowSpaces"),
                        " - Allows to search a word with space."),
                    React.createElement("li", null,
                        React.createElement("code", null, "suggestionCount"),
                        " - Control the items in suggestion list."),
                    React.createElement("li", null,
                        React.createElement("code", null, "itemTemplate"),
                        " - Used to display the customized appearance in suggestion list.")))));
    };
    return MentionIntegration;
}(sample_base_1.SampleBase));
exports.MentionIntegration = MentionIntegration;
