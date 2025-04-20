"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./mail-merge.css");
function MailMerge() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var value = "<p>Dear <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{FirstName}}</span></span> <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{LastName}}</span></span>,</p>\n  <p>We are thrilled to have you with us! Your unique promotional code for this month is: <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{PromoCode}}</span></span>.</p>\n  <p>Your current subscription plan is: <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{SubscriptionPlan}}</span></span>.</p>\n  <p>Your customer ID is: <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{CustomerID}}</span></span>.</p>\n  <p>Your promotional code expires on: <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{ExpirationDate}}</span></span>.</p>\n  <p>Feel free to browse our latest offerings and updates. If you need any assistance, don't hesitate to contact us at <a href=\"mailto:{{SupportEmail}}\"><span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{SupportEmail}}</span></span></a> or call us at <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{SupportPhoneNumber}}</span></span>.</p>\n  <p>Best regards,<br>The <span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{CompanyName}}</span></span> Team</p>";
    var items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList', '|',
        'CreateLink', 'Image', 'CreateTable', '|',
        { tooltipText: 'Merge Data', template: '#merge_data' },
        { tooltipText: 'Insert Field', template: '#insertField' },
        'SourceCode', '|', 'Undo', 'Redo'
    ];
    //Rich Text Editor ToolbarSettings
    var toolbarSettings = {
        items: items
    };
    var mentionChar = "{{";
    var rteObj;
    var mentionObj;
    var range = new Range();
    var selection = new ej2_react_richtexteditor_1.NodeSelection();
    var saveSelection;
    var itemsName = [
        { text: 'First Name' },
        { text: 'Last Name' },
        { text: 'Support Email' },
        { text: 'Company Name' },
        { text: 'Promo Code' },
        { text: 'Support Phone Number' },
        { text: 'Customer ID' },
        { text: 'Expiration Date' },
        { text: 'Subscription Plan' },
    ];
    var placeholderData = {
        FirstName: 'John',
        LastName: 'Doe',
        PromoCode: 'ABC123',
        SubscriptionPlan: 'Premium',
        CustomerID: '123456',
        ExpirationDate: '2024-12-31',
        SupportEmail: 'support@example.com',
        SupportPhoneNumber: '+1-800-555-5555',
        CompanyName: 'Example Inc.'
    };
    var textToValueMap = {
        'First Name': 'FirstName',
        'Last Name': 'LastName',
        'Support Email': 'SupportEmail',
        'Company Name': 'CompanyName',
        'Promo Code': 'PromoCode',
        'Support Phone Number': 'SupportPhoneNumber',
        'Customer ID': 'CustomerID',
        'Expiration Date': 'ExpirationDate',
        'Subscription Plan': 'SubscriptionPlan'
    };
    var data = [
        { text: 'First Name', value: 'FirstName' },
        { text: 'Last Name', value: 'LastName' },
        { text: 'Support Email', value: 'SupportEmail' },
        { text: 'Company Name', value: 'CompanyName' },
        { text: 'Promo Code', value: 'PromoCode' },
        { text: 'Support Phone Number', value: 'SupportPhoneNumber' },
        { text: 'Customer ID', value: 'CustomerID' },
        { text: 'Expiration Date', value: 'ExpirationDate' },
        { text: 'Subscription Plan', value: 'SubscriptionPlan' },
    ];
    var fieldsData = { text: 'text', value: 'value' };
    function displayTemplate(data) {
        return (React.createElement(React.Fragment, null,
            data.value,
            "}}"));
    }
    function actionBegin(args) {
        if (args.requestType === 'EnterAction' &&
            mentionObj.element.classList.contains('e-popup-open')) {
            args.cancel = true;
        }
    }
    function actionComplete(e) {
        if (e.requestType === 'SourceCode') {
            rteObj.getToolbar().querySelector('#merge_data').parentElement.classList.add('e-overlay');
            rteObj.getToolbar().querySelector('#insertField').parentElement.classList.add('e-overlay');
        }
        else if (e.requestType === 'Preview') {
            rteObj.getToolbar().querySelector('#merge_data').parentElement.classList.remove('e-overlay');
            rteObj.getToolbar().querySelector('#insertField').parentElement.classList.remove('e-overlay');
        }
    }
    function blur() {
        var range = selection.getRange(document);
        var saveSelection = selection.save(range, document);
    }
    function onItemSelect(args) {
        if (args.item.text != null) {
            var value_1 = textToValueMap[args.item.text];
            var trimmedValue = value_1.trim();
            rteObj.formatter.editorManager.nodeSelection.restore();
            rteObj.executeCommand('insertHTML', "<span contenteditable=\"false\" class=\"e-mention-chip\"><span>{{".concat(trimmedValue, "}}</span></span>&nbsp;"), { undo: true });
        }
    }
    function onClickHandler(args) {
        if (rteObj) {
            var editorContent = rteObj.value;
            var mergedContent = replacePlaceholders(editorContent, placeholderData);
            if (rteObj.formatter.getUndoRedoStack().length === 0) {
                rteObj.formatter.saveData();
            }
            rteObj.value = mergedContent;
            rteObj.formatter.saveData();
        }
        else {
            console.log('MailMergeEditor is not initialized.');
        }
    }
    ;
    function replacePlaceholders(template, data) {
        return template.replace(/{{\s*(\w+)\s*}}/g, function (match, key) {
            var value = data[key.trim()];
            return value !== undefined ? value : match;
        });
    }
    ;
    return (React.createElement("div", null,
        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { ref: function (richtexteditor) { rteObj = richtexteditor; }, value: value, id: "mailMergeEditor", toolbarSettings: toolbarSettings, placeholder: "Type @ and tag the name", blur: blur, actionBegin: actionBegin, actionComplete: actionComplete, saveInterval: 1 },
            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.PasteCleanup] })),
        React.createElement("button", { className: "e-control e-lib e-btn e-formats-tbar-btn e-rte-elements e-tbar-btn", tabIndex: -1, id: "merge_data", style: { width: '100%' }, onClick: onClickHandler },
            React.createElement("span", { style: { display: 'inline-flex' } },
                React.createElement("span", { className: "e-tbar-btn-text" }, "Merge Data"))),
        React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { className: "e-rte-dropdown-btn e-control e-dropdown-btn e-lib e-btn e-rte-dropdown-popup e-rte-dropdown-items e-formats-tbar-btn e-rte-elements e-tbar-btn ", items: itemsName, content: '<span style="display: inline-flex;"><span class="e-rte-dropdown-btn-text">Insert Field</span></span>', select: onItemSelect, id: "insertField" }),
        React.createElement(ej2_react_dropdowns_1.MentionComponent, { ref: function (scope) { mentionObj = scope; }, id: "mentionEditor", target: "#mailMergeEditor", mentionChar: mentionChar, showMentionChar: true, allowSpaces: true, dataSource: data, fields: fieldsData, popupWidth: "250px", popupHeight: "200px", displayTemplate: displayTemplate }),
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
}
exports.default = MailMerge;
