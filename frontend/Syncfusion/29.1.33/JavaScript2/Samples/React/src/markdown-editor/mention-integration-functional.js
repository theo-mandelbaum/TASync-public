"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function MentionIntegration() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    // set the value to Rich Text Editor
    var value = 'Hello [@Maria](mailto:maria@gmail.com)\n\nWelcome to the mention integration with markdown editor demo. Type @ character and tag user from the suggestion list.';
    var placeholder = 'Enter your text here...';
    // Rich Text Editor items list
    var items = ['Bold', 'Italic', 'StrikeThrough', '|',
        'Formats', 'Blockquote', 'OrderedList', 'UnorderedList', 'SuperScript', 'SubScript', '|',
        'CreateLink', 'Image', 'CreateTable', '|',
        {
            tooltipText: 'Preview',
            template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn" aria-label="Preview Code" >' +
                '<span class="e-btn-icon e-md-preview e-icons"></span></button>'
        }, '|', 'Undo', 'Redo'];
    var textArea;
    var mdsource;
    var mdPreview;
    var emailData = [
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
    var toolbarSettings = {
        items: items
    };
    var formatter = new ej2_react_richtexteditor_1.MarkdownFormatter({ listTags: { 'OL': '1., 2., 3.' } });
    function markdownConversion() {
        if (mdsource.classList.contains('e-active')) {
            var id = rteObj.getID() + 'html-view';
            var htmlPreview = rteObj.element.querySelector('#' + id);
            htmlPreview.innerHTML = Marked.marked(rteObj.contentModule.getEditPanel().value);
        }
    }
    function fullPreview() {
        var id = rteObj.getID() + 'html-preview';
        var htmlPreview = rteObj.element.querySelector('#' + id);
        if (mdsource.classList.contains('e-active')) {
            mdsource.classList.remove('e-active');
            mdsource.parentElement.title = 'Preview';
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        }
        else {
            mdsource.classList.add('e-active');
            if (!htmlPreview) {
                htmlPreview = (0, ej2_base_1.createElement)('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = Marked.marked(rteObj.contentModule.getEditPanel().value);
            mdsource.parentElement.title = 'Code View';
        }
    }
    function rendereComplete() {
        textArea = rteObj.contentModule.getEditPanel();
        textArea.addEventListener('keyup', function (e) {
            markdownConversion();
        });
        mdsource = document.getElementById('preview-code');
        mdsource.addEventListener('click', function (e) {
            fullPreview();
            if (e.currentTarget.classList.contains('e-active')) {
                rteObj.disableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
            }
            else {
                rteObj.enableToolbarItem(['Bold', 'Italic', 'StrikeThrough', 'OrderedList',
                    'UnorderedList', 'SuperScript', 'SubScript', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Blockquote', 'Undo', 'Redo']);
            }
        });
    }
    function itemTemplate(data) {
        return (React.createElement("div", { className: "editor-mention-item-template" },
            React.createElement("div", { className: "em-header" },
                React.createElement("div", { className: "em-avatar", style: { backgroundColor: data.bgColor, color: data.color } },
                    React.createElement("div", { className: "em-initial" }, data.initial))),
            React.createElement("div", { className: "em-content" },
                React.createElement("div", { className: "em-name" }, data.name),
                React.createElement("div", { className: "em-email" }, data.email))));
    }
    function displayTemplate(data) {
        return (React.createElement(React.Fragment, null,
            "[@",
            data.name,
            "](mailto:$",
            data.email,
            ")"));
    }
    return (React.createElement("div", { id: "markdownSample", className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: "rteMarkdown" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "markdownRTE", ref: function (richtexteditor) { rteObj = richtexteditor; }, editorMode: 'Markdown', height: '250px', value: value, formatter: formatter, created: rendereComplete, toolbarSettings: toolbarSettings },
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.MarkdownEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Table] })),
                React.createElement(ej2_react_dropdowns_1.MentionComponent, { id: 'editorMention', ref: function (mention) { mention = mention; }, dataSource: emailData, displayTemplate: displayTemplate, itemTemplate: itemTemplate, target: "#markdownRTE_editable-content", fields: { text: 'name' }, popupWidth: '250px', popupHeight: '200px', sortOrder: 'Ascending', allowSpaces: true }))),
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
}
exports.default = MentionIntegration;
