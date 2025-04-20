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
 * Rich Text Editor markdown overview sample
 */
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var Marked = require("marked");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./mention-integration.css");
var MentionIntegration = /** @class */ (function (_super) {
    __extends(MentionIntegration, _super);
    function MentionIntegration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // set the value to Rich Text Editor
        _this.value = 'Hello [@Maria](mailto:maria@gmail.com)\n\nWelcome to the mention integration with markdown editor demo. Type @ character and tag user from the suggestion list.';
        _this.placeholder = 'Enter your text here...';
        // Rich Text Editor items list
        _this.items = ['Bold', 'Italic', 'StrikeThrough', '|',
            'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', 'SuperScript', 'SubScript', '|',
            'CreateLink', 'Image', 'CreateTable', '|',
            {
                tooltipText: 'Preview',
                template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code">' +
                    '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
            }, '|', 'Undo', 'Redo'];
        _this.emailData = [
            { name: "Selma Rose", initial: 'SR', email: "selma@gmail.com", color: '#FAFDFF', bgColor: '#01579B' },
            { name: "Maria", initial: 'MA', email: "maria@gmail.com", color: '#004378', bgColor: '#ADDBFF' },
            { name: "Russo Kay", initial: 'RK', email: "russo@gmail.com", color: '#F9DEDC', bgColor: '#8C1D18' },
            { name: "Robert", initial: 'RO', email: "robert@gmail.com", color: '#FFD6F7', bgColor: '#37003A' },
            { name: "Camden Kate", initial: 'CK', email: "camden@gmail.com", color: '#FFFFFF', bgColor: '#464ECF' },
            { name: "Garth", initial: 'GA', email: "garth@gmail.com", color: '#FFFFFF', bgColor: '#008861' },
            { name: "Andrew James", initial: 'AJ', email: "james@gmail.com", color: '#FFFFFF', bgColor: '#53CA17' },
            { name: "Olivia", initial: 'OL', email: "olivia@gmail.com", color: '#FFFFFF', bgColor: '#8C1D18' },
            { name: "Sophia", initial: 'SO', email: "sophia@gmail.com", color: '#000000', bgColor: '#D0BCFF' },
            { name: "Margaret", initial: 'MA', email: "margaret@gmail.com", color: '#000000', bgColor: '#F2B8B5' },
            { name: "Ursula Ann", initial: 'UA', email: "ursula@gmail.com", color: '#000000', bgColor: '#47ACFB' },
            { name: "Laura Grace", initial: 'LG', email: "laura@gmail.com", color: '#000000', bgColor: '#FFE088' },
            { name: "Albert", initial: 'AL', email: "albert@gmail.com", color: '#FFFFFF', bgColor: '#00335B' },
            { name: "William", initial: 'WA', email: "william@gmail.com", color: '#FFFFFF', bgColor: '#163E02' }
        ];
        //Rich Text Editor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        _this.formatter = new ej2_react_richtexteditor_1.MarkdownFormatter({ listTags: { 'OL': '1., 2., 3.' } });
        return _this;
    }
    MentionIntegration.prototype.markdownConversion = function () {
        if (this.mdsource.classList.contains('e-active')) {
            var id = this.rteObj.getID() + 'html-view';
            var htmlPreview = this.rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked.marked(this.rteObj.contentModule.getEditPanel().value);
        }
    };
    MentionIntegration.prototype.fullPreview = function () {
        var id = this.rteObj.getID() + 'html-preview';
        var htmlPreview = this.rteObj.element.querySelector('#' + id);
        if (this.mdsource.classList.contains('e-active')) {
            this.mdsource.classList.remove('e-active');
            this.mdsource.parentElement.title = 'Preview';
            this.textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        }
        else {
            this.mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = (0, ej2_base_1.createElement)('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                this.textArea.parentNode.appendChild(htmlPreview);
            }
            this.textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked.marked(this.rteObj.contentModule.getEditPanel().value);
            this.mdsource.parentElement.title = 'Code View';
        }
    };
    MentionIntegration.prototype.rendereComplete = function () {
        var _this = this;
        this.textArea = this.rteObj.contentModule.getEditPanel();
        this.textArea.addEventListener('keyup', function (e) {
            _this.markdownConversion();
        });
        this.mdsource = document.getElementById('preview-code');
        this.mdsource.addEventListener('click', function (e) {
            _this.fullPreview();
            if (e.currentTarget.classList.contains('e-active')) {
                _this.rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
            }
            else {
                _this.rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
            }
        });
    };
    MentionIntegration.prototype.itemTemplate = function (data) {
        return (React.createElement("div", { className: "editor-mention-item-template" },
            React.createElement("div", { className: "em-header" },
                React.createElement("div", { className: "em-avatar", style: { backgroundColor: data.bgColor, color: data.color } },
                    React.createElement("div", { className: "em-initial" }, data.initial))),
            React.createElement("div", { className: "em-content" },
                React.createElement("div", { className: "em-name" }, data.name),
                React.createElement("div", { className: "em-email" }, data.email))));
    };
    MentionIntegration.prototype.displayTemplate = function (data) {
        return (React.createElement(React.Fragment, null,
            "[@",
            data.name,
            "](mailto:$",
            data.email,
            ")"));
    };
    MentionIntegration.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { id: "markdownSample", className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rteMarkdown" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "markdownRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, editorMode: 'Markdown', height: '250px', value: this.value, formatter: this.formatter, toolbarSettings: this.toolbarSettings },
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.MarkdownEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Table] })),
                    React.createElement(ej2_react_dropdowns_1.MentionComponent, { id: 'editorMention', ref: function (mention) { _this.mention = mention; }, dataSource: this.emailData, displayTemplate: this.displayTemplate, itemTemplate: this.itemTemplate, target: "#markdownRTE_editable-content", fields: { text: 'name' }, popupWidth: '250px', popupHeight: '200px', sortOrder: 'Ascending', allowSpaces: true, suffixText: '\u00A0' }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example shows how to integrate @mention component within Markdown Editor component. Type `@` character and select a user from the suggestion list.")),
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
