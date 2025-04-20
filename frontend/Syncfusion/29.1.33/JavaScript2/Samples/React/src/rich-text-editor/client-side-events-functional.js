"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor events sample
 */
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./rte-events.css");
function RTEEvents() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    var clear;
    var EventLogEle;
    var EventLogRef = function (element) {
        EventLogEle = element;
    };
    // Rich Text Editor items list
    var items = ['Bold', 'Italic', 'Underline', 'StrikeThrough', 'SuperScript', 'SubScript', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'LowerCase', 'UpperCase', '|',
        'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList', '|',
        'Outdent', 'Indent', '|', 'CreateLink', 'Image', 'FileManager', 'Video', 'Audio', 'CreateTable', '|', 'FormatPainter', 'ClearFormat',
        '|', 'EmojiPicker', 'Print', '|',
        'SourceCode', 'FullScreen', '|', 'Undo', 'Redo'];
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
    //Rich Text Editor ToolbarSettings
    var toolbarSettings = {
        items: items
    };
    function ClearClick() {
        EventLogEle.innerHTML = '';
    }
    function create() {
        appendElement('Rich Text Editor <b>create</b> event called<hr>');
    }
    function actionBegin(args) {
        appendElement('<b>' + args.requestType + '</b> action is called<hr>');
        handleFullScreen(args);
    }
    function actionComplete(args) {
        appendElement('<b>' + args.requestType + '</b> action is completed<hr>');
        actionCompleteHandler();
    }
    function focus() {
        appendElement('Rich Text Editor <b>focus</b> event called<hr>');
    }
    function blur() {
        appendElement('Rich Text Editor <b>blur</b> event called<hr>');
    }
    function change() {
        appendElement('Rich Text Editor <b>change</b> event called<hr>');
    }
    function toolbarClick() {
        appendElement('Rich Text Editor <b>toolbar click</b> event called<hr>');
    }
    function beforeDialogOpen() {
        appendElement('Rich Text Editor <b>beforeDialogOpen</b> event called<hr>');
    }
    function dialogOpen() {
        appendElement('Rich Text Editor <b>dialogOpen</b> event called<hr>');
    }
    function dialogClose() {
        appendElement('Rich Text Editor <b>dialogClose</b> event called<hr>');
    }
    function beforeQuickToolbarOpen() {
        appendElement('Rich Text Editor <b>beforeQuickToolbarOpen</b> event called<hr>');
    }
    function quickToolbarOpen() {
        appendElement('Rich Text Editor <b>quickToolbarOpen</b> event called<hr>');
    }
    function quickToolbarClose() {
        appendElement('Rich Text Editor <b>quickToolbarClose</b> event called<hr>');
    }
    function imageSelected() {
        appendElement('Rich Text Editor <b>imageSelected</b> event called<hr>');
    }
    function imageUploading() {
        appendElement('Rich Text Editor <b>imageUploading</b> event called<hr>');
    }
    function imageUploadSuccess() {
        appendElement('Rich Text Editor <b>imageUploadSuccess</b> event called<hr>');
    }
    function imageUploadFailed() {
        appendElement('Rich Text Editor <b>imageUploadFailed</b> event called<hr>');
    }
    function imageRemoving() {
        appendElement('Rich Text Editor <b>imageRemoving</b> event called<hr>');
    }
    function destroyed() {
        appendElement('Rich Text Editor <b>destroyed</b> event called<hr>');
    }
    function beforeSanitizeHtml() {
        appendElement('Rich Text Editor <b>beforeSanitizeHtml</b> event called<hr>');
    }
    function resizing() {
        appendElement('Rich Text Editor <b>resizing</b> event called<hr>');
    }
    function resizeStart() {
        appendElement('Rich Text Editor <b>resizeStart</b> event called<hr>');
    }
    function resizeStop() {
        appendElement('Rich Text Editor <b>resizeStop</b> event called<hr>');
    }
    function appendElement(html) {
        if (EventLogEle) {
            var span = document.createElement('span');
            span.innerHTML = html;
            EventLogEle.insertBefore(span, EventLogEle.firstChild);
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
    function actionCompleteHandler() {
        setTimeout(function () {
            rteObj.toolbarModule.refreshToolbarOverflow();
        }, 400);
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-8 control-section', id: 'rteEvent' },
            React.createElement("div", { className: 'rte-control-section' },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "clientsideRTE", ref: function (richtexteditor) { rteObj = richtexteditor; }, toolbarSettings: toolbarSettings, fileManagerSettings: fileManagerSettings, created: create.bind(this), actionBegin: actionBegin.bind(this), actionComplete: actionComplete.bind(this), focus: focus.bind(this), blur: blur.bind(this), change: change.bind(this), toolbarClick: toolbarClick.bind(this), beforeDialogOpen: beforeDialogOpen.bind(this), dialogOpen: dialogOpen.bind(this), dialogClose: dialogClose.bind(this), beforeQuickToolbarOpen: beforeQuickToolbarOpen.bind(this), quickToolbarOpen: quickToolbarOpen.bind(this), quickToolbarClose: quickToolbarClose.bind(this), imageSelected: imageSelected.bind(this), imageUploading: imageUploading.bind(this), imageUploadSuccess: imageUploadSuccess.bind(this), imageUploadFailed: imageUploadFailed.bind(this), imageRemoving: imageRemoving.bind(this), destroyed: destroyed.bind(this), beforeSanitizeHtml: beforeSanitizeHtml.bind(this), resizing: resizing.bind(this), resizeStart: resizeStart.bind(this), resizeStop: resizeStop.bind(this) },
                    React.createElement("p", null, "The Rich Text Editor component is a WYSIWYG (\"what you see is what you get\") editor that provides the best user experience to create and update the content. Users can format their content using standard toolbar commands."),
                    React.createElement("p", null,
                        React.createElement("b", null, "Key features:")),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("p", null, "Provides <IFRAME> and <DIV> modes")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Capable of handling markdown editing.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Contains a modular library to load the necessary functionality on demand.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Provides a fully customizable toolbar.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Provides HTML view to edit the source directly for developers.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Supports third-party library integration.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Allows a preview of modified content before saving it.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Handles images, hyperlinks, video, hyperlinks, uploads, etc.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Contains undo/redo manager.")),
                        React.createElement("li", null,
                            React.createElement("p", null, "Creates bulleted and numbered lists."))),
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.EmojiPicker, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Audio, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.FormatPainter, ej2_react_richtexteditor_1.FileManager] })))),
        React.createElement("div", { className: 'col-lg-4 property-section', id: "rteEventProperty" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Event Trace", className: 'property-panel-table rte-event-panel' },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { className: "eventarea", style: { height: '245px', overflow: 'auto' } },
                                    React.createElement("span", { className: "EventLog", ref: EventLogRef, id: "EventLog", style: { wordBreak: 'normal' } })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", { className: "evtbtn", style: { paddingBottom: '10px' } },
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "clear", ref: function (btn) { clear = btn; }, onClick: ClearClick.bind(this) }, "Clear")))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the events that trigger on every action of the Rich Text Editor. The event details are showcased in the event trace panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Rich Text Editor triggers the events based on its actions. The events can be used as an extension point to perform custom operations."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "change"),
                    " - Triggers when the editor gets blurred and changes are made to the content."),
                React.createElement("li", null,
                    React.createElement("code", null, "focus"),
                    " - Triggers when the editor is in focus."),
                React.createElement("li", null,
                    React.createElement("code", null, "blur"),
                    " - Triggers when focused out of the editor."),
                React.createElement("li", null,
                    React.createElement("code", null, "actionBegin"),
                    " - Triggers before the execution of command."),
                React.createElement("li", null,
                    React.createElement("code", null, "actionComplete"),
                    " - Triggers after the execution of command."),
                React.createElement("li", null,
                    React.createElement("code", null, "created"),
                    " - Triggers when the component is created."),
                React.createElement("li", null,
                    React.createElement("code", null, "beforeDialogOpen"),
                    " \u2013 Event triggers when the dialog is being opened.."),
                React.createElement("li", null,
                    React.createElement("code", null, "dialogOpen"),
                    " \u2013 Event triggers when a dialog is opened."),
                React.createElement("li", null,
                    React.createElement("code", null, "dialogClose"),
                    " \u2013 Event triggers after the dialog has been closed."),
                React.createElement("li", null,
                    React.createElement("code", null, "beforeQuickToolbarOpen"),
                    " \u2013 Event triggers when the quick toolbar is being opened."),
                React.createElement("li", null,
                    React.createElement("code", null, "quickToolbarOpen"),
                    " \u2013 Event triggers when a quick toolbar is opened."),
                React.createElement("li", null,
                    React.createElement("code", null, "quickToolbarClose"),
                    " \u2013 Event triggers after the quick toolbar has been closed."),
                React.createElement("li", null,
                    React.createElement("code", null, "imageSelected"),
                    " \u2013 Event triggers when the image is selected or dragged into the insert image dialog"),
                React.createElement("li", null,
                    React.createElement("code", null, "imageUploading"),
                    " \u2013 Event triggers when the selected image begins to upload in the insert image dialog"),
                React.createElement("li", null,
                    React.createElement("code", null, "imageUploadSuccess"),
                    " \u2013 Event triggers when the image is successfully uploaded to the server side"),
                React.createElement("li", null,
                    React.createElement("code", null, "imageUploadFailed"),
                    " \u2013 Event triggers when there is an error in the image upload"),
                React.createElement("li", null,
                    React.createElement("code", null, "imageRemoving"),
                    " \u2013 Event triggers when the selected image is cleared from the insert image dialog"),
                React.createElement("li", null,
                    React.createElement("code", null, "destroyed"),
                    " \u2013 Triggers when the component is destroyed."),
                React.createElement("li", null,
                    React.createElement("code", null, "beforeSanitizeHtml"),
                    " \u2013 Event triggers before sanitize the value. It's only applicable to editorMode as `HTML`"),
                React.createElement("li", null,
                    React.createElement("code", null, "resizing"),
                    " \u2013 Triggers only when resizing the image"),
                React.createElement("li", null,
                    React.createElement("code", null, "resizeStart"),
                    " \u2013Triggers only when start resize the image"),
                React.createElement("li", null,
                    React.createElement("code", null, "resizeStop"),
                    " \u2013 Triggers only when stop resize the image")),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject ",
                React.createElement("code", null, "Toolbar, Link, Image, HtmlEditor, QuickToolbar, Table, EmojiPicker, PasteCleanup, Audio, Video, FormatPainter, FileManager"),
                " modules into the services."))));
}
exports.default = RTEEvents;
