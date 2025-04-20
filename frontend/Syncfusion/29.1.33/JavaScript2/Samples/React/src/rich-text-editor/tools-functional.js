"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_react_richtexteditor_2 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_base_2 = require("@syncfusion/ej2-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var CodeMirror = require("codemirror");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/css/css.js");
require("codemirror/mode/htmlmixed/htmlmixed.js");
require("./tools.css");
function Overview() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var editor;
    var mention;
    var codeMirror;
    var hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
    // Rich Text Editor items list
    var items = [
        'Undo', 'Redo', '|', 'ImportWord', 'ExportWord', 'ExportPdf', '|',
        'Bold', 'Italic', 'Underline', 'StrikeThrough', 'InlineCode', 'SuperScript', 'SubScript', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
        'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
        '|', 'EmojiPicker', 'Print', '|',
        'SourceCode', 'FullScreen'
    ];
    var rteValue = "<h1>Welcome to the Syncfusion<sup>\u00AE</sup> Rich Text Editor</h1><p>The Rich Text Editor, a WYSIWYG (what you see is what you get) editor, is a user interface that allows you to create, edit, and format rich text content. You can try out a demo of this editor here.</p><h2>Do you know the key features of the editor?</h2><ul> <li>Basic features include headings, block quotes, numbered lists, bullet lists, and support to insert images, tables, audio, and video.</li> <li>Inline styles include <b>bold</b>, <em>italic</em>, <span style=\"text-decoration: underline\">underline</span>, <span style=\"text-decoration: line-through\">strikethrough</span>, <a class=\"e-rte-anchor\" href=\"https://ej2.syncfusion.com/react/demos/#/material3/rich-text-editor/tools\" title=\"https://ej2.syncfusion.com/react/demos/#/material3/rich-text-editor/tools\">hyperlinks</a>,<code>InlineCode</code>, \uD83D\uDE00 and more.</li> <li>The toolbar has multi-row, expandable, and scrollable modes. The Editor supports an inline toolbar, a floating toolbar, and custom toolbar items.</li> <li>Integration with Syncfusion<sup>\u00AE</sup> Mention control lets users tag other users. To learn more, check out the <a class=\"e-rte-anchor\" href=\"https://ej2.syncfusion.com/react/documentation/rich-text-editor/mention-integration\" title=\"Mention Documentation\">documentation</a> and <a class=\"e-rte-anchor\" href=\"https://ej2.syncfusion.com/react/demos/#/material3/rich-text-editor/mention-integration\" title=\"Mention Demos\">demos</a>.</li> <li><b>Paste from MS Word</b> - helps to reduce the effort while converting the Microsoft Word content to HTML format with format and styles. To learn more, check out the documentation <a class=\"e-rte-anchor\" href=\"https://ej2.syncfusion.com/react/documentation/rich-text-editor/paste-cleanup\" title=\"Paste from MS Word Documentation\">here</a>.</li> <li>Other features: placeholder text, character count, form validation, enter key configuration, resizable editor, IFrame rendering, tooltip, source code view, RTL mode, persistence, HTML Sanitizer, autosave, and <a class=\"e-rte-anchor\" href=\"https://ej2.syncfusion.com/react/documentation/api/rich-text-editor\" title=\"Rich Text Editor API\">more</a>.</li></ul><blockquote><p><em>Easily access Audio, Image, Link, Video, and Table operations through the quick toolbar by right-clicking on the corresponding element with your mouse.</em></p></blockquote><h2>Unlock the Power of Tables</h2><p>A table can be created in the editor using either a keyboard shortcut or the toolbar. With the quick toolbar, you can perform table cell insert, delete, split, and merge operations. You can style the table cells using background colours and borders.</p><table class=\"e-rte-table\" style=\"width: 100%; min-width: 0px; height: 151px\"> <thead style=\"height: 16.5563%\"> <tr style=\"height: 16.5563%\"> <th style=\"width: 12.1813%\"><span>S No</span><br/></th> <th style=\"width: 23.2295%\"><span>Name</span><br/></th> <th style=\"width: 9.91501%\"><span>Age</span><br/></th> <th style=\"width: 15.5807%\"><span>Gender</span><br/></th> <th style=\"width: 17.9887%\"><span>Occupation</span><br/></th> <th style=\"width: 21.1048%\">Mode of Transport</th> </tr> </thead> <tbody> <tr style=\"height: 16.5563%\"> <td style=\"width: 12.1813%\">1</td> <td style=\"width: 23.2295%\">Selma Rose</td> <td style=\"width: 9.91501%\">30</td> <td style=\"width: 15.5807%\">Female</td> <td style=\"width: 17.9887%\"><span>Engineer</span><br/></td> <td style=\"width: 21.1048%\"><span style=\"font-size: 14pt\">\uD83D\uDEB4</span></td> </tr> <tr style=\"height: 16.5563%\"> <td style=\"width: 12.1813%\">2</td> <td style=\"width: 23.2295%\"><span>Robert</span><br/></td> <td style=\"width: 9.91501%\">28</td> <td style=\"width: 15.5807%\">Male</td> <td style=\"width: 17.9887%\"><span>Graphic Designer</span></td> <td style=\"width: 21.1048%\"><span style=\"font-size: 14pt\">\uD83D\uDE97</span></td> </tr> <tr style=\"height: 16.5563%\"> <td style=\"width: 12.1813%\">3</td> <td style=\"width: 23.2295%\"><span>William</span><br/></td> <td style=\"width: 9.91501%\">35</td> <td style=\"width: 15.5807%\">Male</td> <td style=\"width: 17.9887%\">Teacher</td> <td style=\"width: 21.1048%\"><span style=\"font-size: 14pt\">\uD83D\uDE97</span></td> </tr> <tr style=\"height: 16.5563%\"> <td style=\"width: 12.1813%\">4</td> <td style=\"width: 23.2295%\"><span>Laura Grace</span><br/></td> <td style=\"width: 9.91501%\">42</td> <td style=\"width: 15.5807%\">Female</td> <td style=\"width: 17.9887%\">Doctor</td> <td style=\"width: 21.1048%\"><span style=\"font-size: 14pt\">\uD83D\uDE8C</span></td> </tr> <tr style=\"height: 16.5563%\"> <td style=\"width: 12.1813%\">5</td><td style=\"width: 23.2295%\"><span>Andrew James</span><br/></td><td style=\"width: 9.91501%\">45</td><td style=\"width: 15.5807%\">Male</td><td style=\"width: 17.9887%\">Lawyer</td><td style=\"width: 21.1048%\"><span style=\"font-size: 14pt\">\uD83D\uDE95</span></td></tr></tbody></table><h2>Elevating Your Content with Images</h2><p>Images can be added to the editor by pasting or dragging into the editing area, using the toolbar to insert one as a URL, or uploading directly from the File Browser. Easily manage your images on the server by configuring the <a class=\"e-rte-anchor\" href=\"https://ej2.syncfusion.com/react/documentation/api/rich-text-editor/#insertimagesettings\" title=\"Insert Image Settings API\">insertImageSettings</a> to upload, save, or remove them. </p><p>The Editor can integrate with the Syncfusion<sup>\u00AE</sup> Image Editor to crop, rotate, annotate, and apply filters to images. Check out the demos <a class=\"e-rte-anchor\" href=\"https://ej2.syncfusion.com/react/demos/#/material3/rich-text-editor/image-editor-integration\" title=\"Image Editor Demo\">here</a>.</p><p><img alt=\"Sky with sun\" src=\"https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Overview.png\" style=\"width: 440px\" class=\"e-rte-image e-imginline\" /></p>";
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
    var fileManagerSettings = {
        enable: true,
        path: '/Pictures/Food',
        ajaxSettings: {
            url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
            getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage',
            uploadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Upload',
            downloadUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/Download'
        }
    };
    var quickToolbarSettings = {
        table: ['TableHeader', 'TableRows', 'TableColumns', 'TableCell', '-', 'BackgroundColor', 'TableRemove', 'TableCellVerticalAlign', 'Styles'],
        showOnRightClick: true,
    };
    var insertImageSettings = {
        saveUrl: hostUrl + 'api/RichTextEditor/SaveFile',
        removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
        path: hostUrl + 'RichTextEditor/'
    };
    //Rich Text Editor ToolbarSettings
    var toolbarSettings = {
        items: items
    };
    var slashMenuSettings = {
        enable: true,
        items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList',
            'CodeBlock', 'Blockquote', 'Link', 'Image', 'Video', 'Audio', 'Table', 'Emojipicker',
        ]
    };
    var importWord = {
        serviceUrl: hostUrl + 'api/RichTextEditor/ImportFromWord',
    };
    var exportWord = {
        serviceUrl: hostUrl + 'api/RichTextEditor/ExportToDocx',
        fileName: 'RichTextEditor.docx',
        stylesheet: "\n        .e-rte-content {\n            font-size: 1em;\n            font-weight: 400;\n            margin: 0;\n        }\n    "
    };
    var exportPdf = {
        serviceUrl: hostUrl + 'api/RichTextEditor/ExportToPdf',
        fileName: 'RichTextEditor.pdf',
        stylesheet: "\n        .e-rte-content{\n            font-size: 1em;\n            font-weight: 400;\n            margin: 0;\n        }\n    "
    };
    function mirrorConversion(e) {
        var id = editor.getID() + 'mirror-view';
        var rteContainer = editor.element.querySelector('.e-rte-container');
        var mirrorView = editor.element.querySelector('#' + id);
        if (e.targetItem === 'Preview') {
            editor.value = codeMirror.getValue();
            editor.dataBind();
            rteContainer.classList.remove('e-rte-code-mirror-enabled');
            editor.focusIn();
        }
        else {
            rteContainer.classList.add('e-rte-code-mirror-enabled');
            rteContainer.classList.remove('e-source-code-enabled');
            if (!mirrorView) {
                mirrorView = (0, ej2_base_2.createElement)('div', { className: 'rte-code-mirror', id: id, styles: 'display: none;' });
                rteContainer.appendChild(mirrorView);
                renderCodeMirror(mirrorView, editor.value === null ? '' : editor.value);
            }
            else {
                codeMirror.setValue(editor.value);
            }
            codeMirror.focus();
        }
    }
    function renderCodeMirror(mirrorView, content) {
        codeMirror = CodeMirror(mirrorView, {
            value: content,
            lineNumbers: true,
            mode: 'text/html',
            lineWrapping: true,
        });
    }
    function actionCompleteHandler(e) {
        if (e.targetItem && (e.targetItem === 'SourceCode' || e.targetItem === 'Preview')) {
            mirrorConversion(e);
        }
    }
    function actionBeginHandler(e) {
        if (e.requestType === 'EnterAction' && mention && mention.element.classList.contains('e-popup-open')) {
            e.cancel = true;
        }
        if (e.requestType === 'Maximize' || e.requestType === 'Minimize') {
            handleFullScreen(e);
        }
    }
    function handleFullScreen(e) {
        var sbCntEle = document.querySelector('.sb-content.e-view');
        var sbHdrEle = document.querySelector('.sb-header.e-view');
        var leftBar;
        var transformElement;
        if (ej2_base_1.Browser.isDevice) {
            leftBar = document.querySelector('#right-sidebar');
            transformElement = document.querySelector('.sample-browser.e-view.e-content-animation');
        }
        else {
            leftBar = document.querySelector('#left-sidebar');
            transformElement = document.querySelector('#right-pane');
        }
        if (e.targetItem === 'Maximize') {
            if (ej2_base_1.Browser.isDevice && ej2_base_1.Browser.isIos) {
                (0, ej2_base_1.addClass)([sbCntEle, sbHdrEle], ['hide-header']);
            }
            (0, ej2_base_1.addClass)([leftBar], ['e-close']);
            (0, ej2_base_1.removeClass)([leftBar], ['e-open']);
            if (!ej2_base_1.Browser.isDevice) {
                transformElement.style.marginLeft = '0px';
            }
            transformElement.style.transform = 'inherit';
        }
        else if (e.targetItem === 'Minimize') {
            if (ej2_base_1.Browser.isDevice && ej2_base_1.Browser.isIos) {
                (0, ej2_base_1.removeClass)([sbCntEle, sbHdrEle], ['hide-header']);
            }
            (0, ej2_base_1.removeClass)([leftBar], ['e-close']);
            if (!ej2_base_1.Browser.isDevice) {
                (0, ej2_base_1.addClass)([leftBar], ['e-open']);
                transformElement.style.marginLeft = leftBar.offsetWidth + 'px';
            }
            transformElement.style.transform = 'translateX(0px)';
        }
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
        return (React.createElement("a", { href: "mailto:" + data.email, title: data.email },
            "@",
            data.name));
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: "rteTools" },
            React.createElement("div", { className: 'rte-control-section' },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "toolsRTE", ref: function (richtexteditor) { editor = richtexteditor; }, value: rteValue, showCharCount: true, actionBegin: actionBeginHandler.bind(this), actionComplete: actionCompleteHandler.bind(this), toolbarSettings: toolbarSettings, fileManagerSettings: fileManagerSettings, quickToolbarSettings: quickToolbarSettings, enableTabKey: true, insertImageSettings: insertImageSettings, enableXhtml: true, placeholder: 'Type something or use @ to tag a user...', importWord: importWord, exportPdf: exportPdf, exportWord: exportWord, slashMenuSettings: slashMenuSettings },
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Count, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_2.FileManager, ej2_react_richtexteditor_1.EmojiPicker, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio, ej2_react_richtexteditor_1.FormatPainter, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.SlashMenu, ej2_react_richtexteditor_1.ImportExport] })),
                React.createElement(ej2_react_dropdowns_1.MentionComponent, { id: 'editorMention', ref: function (mention) { mention = mention; }, dataSource: emailData, displayTemplate: displayTemplate, itemTemplate: itemTemplate, target: "#toolsRTE_rte-edit-view", fields: { text: 'name' }, popupWidth: '250px', popupHeight: '200px', sortOrder: 'Ascending', allowSpaces: true }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the full features of Rich Text Editor that includes all the tools and functionalities.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample used ",
                React.createElement("code", null, "Code mirror"),
                " plugins helps to highlight the HTML content and when changes happens in code view, the same has been reflected in preview mode. "),
            React.createElement("p", null,
                "The quick toolbar provides a convenient way to customize Image, Video, Audio, Table, and Link elements. Simply right-click on the desired element, utilizing the ",
                React.createElement("code", null, "showOnRightClick"),
                " property, and the quick toolbar will appear, providing an easy way for customization."),
            React.createElement("p", null, "The editor\u2019s toolbar contains commands to format the content. The toolbar consists of:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Lists"),
                    " - NumberFormat list and BulletFormat list types."),
                React.createElement("li", null,
                    React.createElement("code", null, "Links"),
                    " - A hyperlink can be inserted into the editor for quick access to related information."),
                React.createElement("li", null,
                    React.createElement("code", null, "Image"),
                    " - Inserts and manages images."),
                React.createElement("li", null,
                    React.createElement("code", null, "Table"),
                    " - Inserts and manages Tables."),
                React.createElement("li", null,
                    React.createElement("code", null, "Alignment"),
                    " - Aligns the content with left, center, and right margins."),
                React.createElement("li", null,
                    React.createElement("code", null, "Undo/Redo"),
                    " - Allows undo/redo operations."),
                React.createElement("li", null,
                    React.createElement("code", null, "Indent/ Outdent"),
                    " - Increases/decreases the indent level of the content."),
                React.createElement("li", null,
                    React.createElement("code", null, "Font"),
                    " - Able to do styling on text like font family, size, fore color and background color."),
                React.createElement("li", null,
                    React.createElement("code", null, "Lower / Upper case"),
                    " \u2013 Changes the casing of the selected text."),
                React.createElement("li", null,
                    React.createElement("code", null, "SubScript / SuperScript"),
                    " - Makes the selected text as subscript (lower)/superscript(upper)."),
                React.createElement("li", null,
                    React.createElement("code", null, "FullScreen"),
                    " - Stretches the editor to the maximum width and height of the browser window."),
                React.createElement("li", null,
                    React.createElement("code", null, "Format"),
                    " \u2013 Formats the sentence in different ways such as heading level, quotation, and code snippet"),
                React.createElement("li", null,
                    React.createElement("code", null, "Styles"),
                    " \u2013 Allows you to apply inline styles to the selected content like bold, italic, and more."),
                React.createElement("li", null,
                    React.createElement("code", null, "Insert Code"),
                    " - Allows you to apply code format to the selected parent nodes. In the above sample, the style for the code format ('pre' tag) is applied by adding the background color."),
                React.createElement("li", null,
                    React.createElement("code", null, "Insert Emoticon"),
                    " - Inserts the emoticon to the editor"),
                React.createElement("li", null,
                    React.createElement("code", null, "Audio"),
                    " - Inserts and manages audios."),
                React.createElement("li", null,
                    React.createElement("code", null, "Video"),
                    " - Inserts and manages videos."),
                React.createElement("li", null,
                    React.createElement("code", null, "Format Painter"),
                    " - The Format Painter feature allows you to copy the formats and apply them to content without formatting thus saving time to reformat the content."),
                React.createElement("li", null,
                    React.createElement("code", null, "Slash Menu"),
                    " - The Slash Menu feature lets users apply formats, open dialogs by typing \"/\" in the editor."),
                React.createElement("li", null,
                    React.createElement("code", null, "Import / Export"),
                    " - The Import/Export feature enables users to import content from Word documents into the editor and export the editor's content into Word and PDF files."),
                React.createElement("li", null,
                    React.createElement("code", null, "InlineCode"),
                    " - Formats selected text as inline code, highlighting code snippets within the text.")),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject ",
                React.createElement("code", null, "Toolbar, Link, Image, Count, HtmlEditor, QuickToolbar, Table, EmojiPicker, Video, Audio, FormatPainter, PasteCleanup, SlashMenu, ImportExport"),
                " modules into the services."))));
}
exports.default = Overview;
