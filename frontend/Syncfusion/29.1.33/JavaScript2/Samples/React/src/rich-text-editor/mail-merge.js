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
exports.MailMerge = void 0;
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./mail-merge.css");
var MailMerge = /** @class */ (function (_super) {
    __extends(MailMerge, _super);
    function MailMerge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rteObj = null;
        _this.mentionObj = null;
        _this.range = new Range();
        _this.selection = new ej2_react_richtexteditor_1.NodeSelection();
        _this.saveSelection = null;
        _this.value = "<p>Dear <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{FirstName}}</span></span> <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{LastName}}</span></span>,</p>\n  <p>We are thrilled to have you with us! Your unique promotional code for this month is: <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{PromoCode}}</span></span>.</p>\n  <p>Your current subscription plan is: <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{SubscriptionPlan}}</span></span>.</p>\n  <p>Your customer ID is: <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{CustomerID}}</span></span>.</p>\n  <p>Your promotional code expires on: <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{ExpirationDate}}</span></span>.</p>\n  <p>Feel free to browse our latest offerings and updates. If you need any assistance, don't hesitate to contact us at <a href=\"mailto:{{SupportEmail}}\"><span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{SupportEmail}}</span></span></a> or call us at <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{SupportPhoneNumber}}</span></span>.</p>\n  <p>Best regards,<br>The <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{CompanyName}}</span></span> Team</p>";
        _this.items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|',
            'CreateLink', 'Image', 'CreateTable', '|',
            { tooltipText: 'Merge Data', template: '#merge_data' },
            { tooltipText: 'Insert Field', template: '#insertField' },
            'SourceCode', '|', 'Undo', 'Redo'
        ];
        //Rich Text Editor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        return _this;
    }
    MailMerge.prototype.actionBegin = function (args) {
        if (args.requestType === 'EnterAction' &&
            this.mentionObj.element.classList.contains('e-popup-open')) {
            args.cancel = true;
        }
    };
    MailMerge.prototype.actionComplete = function (e) {
        if (e.requestType === 'SourceCode') {
            this.rteObj.getToolbar().querySelector('#merge_data').parentElement.classList.add('e-overlay');
            this.rteObj.getToolbar().querySelector('#insertField').parentElement.classList.add('e-overlay');
        }
        else if (e.requestType === 'Preview') {
            this.rteObj.getToolbar().querySelector('#merge_data').parentElement.classList.remove('e-overlay');
            this.rteObj.getToolbar().querySelector('#insertField').parentElement.classList.remove('e-overlay');
        }
    };
    MailMerge.prototype.blur = function () {
        this.range = this.selection.getRange(document);
        this.saveSelection = this.selection.save(this.range, document);
    };
    MailMerge.prototype.onItemSelect = function (args) {
        if (args.item.text != null) {
            var value = this.textToValueMap[args.item.text];
            var trimmedValue = value.trim();
            this.rteObj.formatter.editorManager.nodeSelection.restore();
            this.rteObj.executeCommand('insertHTML', "<span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{".concat(trimmedValue, "}}</span></span>&nbsp;"), { undo: true });
        }
    };
    MailMerge.prototype.displayTemplate = function (data) {
        return (React.createElement(React.Fragment, null,
            data.value,
            "}}"));
    };
    MailMerge.prototype.onClickHandler = function () {
        if (this.rteObj) {
            var editorContent = this.rteObj.value;
            var mergedContent = this.replacePlaceholders(editorContent, this.placeholderData);
            if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
                this.rteObj.formatter.saveData();
            }
            this.rteObj.value = mergedContent;
            this.rteObj.formatter.saveData();
        }
        else {
            console.log('MailMergeEditor is not initialized.');
        }
    };
    MailMerge.prototype.replacePlaceholders = function (template, data) {
        return template.replace(/{{\s*(\w+)\s*}}/g, function (match, key) {
            var value = data[key.trim()];
            return value !== undefined ? value : match;
        });
    };
    MailMerge.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, value: this.value, id: "mailMergeEditor", toolbarSettings: this.toolbarSettings, placeholder: "Type @ and tag the name", blur: this.blur, actionComplete: this.actionComplete, actionBegin: this.actionBegin, saveInterval: 1 },
                React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.PasteCleanup] })),
            React.createElement("button", { className: "e-control e-lib e-btn e-formats-tbar-btn e-rte-elements e-tbar-btn", tabIndex: -1, id: "merge_data", style: { width: '100%' }, onClick: this.onClickHandler },
                React.createElement("span", { style: { display: 'inline-flex' } },
                    React.createElement("span", { className: "e-tbar-btn-text" }, "Merge Data"))),
            React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { className: "e-rte-dropdown-btn e-rte-dropdown-popup e-rte-dropdown-items e-rte-elements e-tbar-btn", items: this.itemsName, content: '<span style="display: inline-flex;"><span class="e-rte-dropdown-btn-text">Insert Field</span></span>', select: this.onItemSelect, id: "insertField" }),
            React.createElement(ej2_react_dropdowns_1.MentionComponent, { ref: function (scope) { _this.mentionObj = scope; }, id: "mentionEditor", target: "#mailMergeEditor", mentionChar: this.mentionChar, showMentionChar: true, allowSpaces: true, dataSource: this.data, fields: this.fieldsData, popupWidth: "250px", popupHeight: "200px", displayTemplate: this.displayTemplate }),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates how to implement a mail merge in the Rich Text Editor sample by inserting placeholders into the editor using custom toolbar item, which are then replaced with actual data to create personalized content.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The mail merge in the Rich Text Editor sample enables users to insert placeholders for personalized content. These placeholders are replaced with actual data when generating the final content, making it easy to create customized letters, invoices, and more."),
                React.createElement("p", null, "The following configurations are used in this sample:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "The ",
                        React.createElement("code", null, "Button"),
                        " and ",
                        React.createElement("code", null, "DropDownButton"),
                        " control are configured in the custom toolbar of the Rich Text Editor."),
                    React.createElement("li", null,
                        "The ",
                        React.createElement("code", null, "Button"),
                        " click action performs the merge of the editor placeholder content."),
                    React.createElement("li", null,
                        "The ",
                        React.createElement("code", null, "DropDownButton"),
                        " control provides a list of available fields, such as \"First Name\" or \"Email Address.\" A selected field from this dropdown is inserted into the editor as a placeholder."),
                    React.createElement("li", null,
                        "The ",
                        React.createElement("code", null, "Button"),
                        " and ",
                        React.createElement("code", null, "DropDownButton"),
                        " control are configured in the custom toolbar of the Rich Text Editor."),
                    React.createElement("li", null,
                        "The ",
                        React.createElement("code", null, "Button"),
                        " click action performs the merge of the editor placeholder content."),
                    React.createElement("li", null,
                        "The ",
                        React.createElement("code", null, "DropDownButton"),
                        " control provides a list of available fields, such as \"First Name\" or \"Email Address.\" A selected field from this dropdown is inserted into the editor as a placeholder."),
                    React.createElement("li", null,
                        "The ",
                        React.createElement("code", null, "Mention"),
                        " control allows insertion of merge fields by pressing the mention character, such as ",
                        React.createElement("code", null,
                            "{",
                            "{"),
                        ", in the editor and selecting an item. These chips make it easy to see and select fields directly within the content.")))));
    };
    return MailMerge;
}(sample_base_1.SampleBase));
exports.MailMerge = MailMerge;
