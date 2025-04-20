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
exports.InsertMedia = void 0;
/*
* Rich Text Editor Insert Media sample
*/
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
require("./insert-media.css");
// Rich Text Editor items list
var InsertMedia = /** @class */ (function (_super) {
    __extends(InsertMedia, _super);
    function InsertMedia() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // Rich Text Editor items list
        _this.items = ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignments', 'Blockquote', 'OrderedList', 'UnorderedList', '|', 'CreateLink', 'Image', 'Audio', 'Video', '|', 'SourceCode', 'Undo', 'Redo'];
        //Rich Text Editor ToolbarSettings
        _this.toolbarSettings = {
            items: _this.items
        };
        return _this;
    }
    InsertMedia.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "insertMediaRTE" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "insertMedia", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, toolbarSettings: this.toolbarSettings },
                        React.createElement("p", null, "Rich Text Editor allows inserting video and audio from online sources and the local computers where you want to insert a video and audio into your content."),
                        React.createElement("p", null,
                            React.createElement("b", null, "Get started with Quick Toolbar to click on a video")),
                        React.createElement("p", null, "Using the quick toolbar, users can replace, align, display, dimension, and delete the selected video."),
                        React.createElement("p", null,
                            React.createElement("video", { style: { width: '30%' }, controls: true },
                                React.createElement("source", { src: "https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Ocean-Waves.mp4", type: "video/mp4" }))),
                        React.createElement("p", null,
                            React.createElement("b", null, "Get started with Quick Toolbar to click on an audio")),
                        React.createElement("p", null, "Using the quick toolbar, users can replace, display, and delete the selected audio."),
                        React.createElement("p", null,
                            React.createElement("audio", { controls: true },
                                React.createElement("source", { src: "https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Audio.wav", type: "audio/mp3" }))),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.Audio, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the option to insert the media into the Rich Text Editor content. Click the audio and video button from the toolbar item to insert the media.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Video tools are used to insert a video into the Rich Text Editor and click on the video to customize the video using a quick toolbar. The quick toolbar has the following items:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Replace"),
                        " \u2013 can replace the video with some other video."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Align"),
                        " \u2013 Align the video with left, right, and justify."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " \u2013 delete the video."),
                    React.createElement("li", null,
                        React.createElement("code", null, "LayoutOption"),
                        " - display the video as inline or with a break."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Resize"),
                        " \u2013 can resize the video dimension with resize options.")),
                React.createElement("p", null, "Audio tools are used to insert audio to the Rich Text Editor and click on the audio to customize the audio using a quick toolbar easily. The quick toolbar has the following items:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Replace"),
                        " \u2013 can replace the audio with some other audio."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Delete"),
                        " \u2013 delete the audio."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Display"),
                        " - display the audio as inline or with a break.")),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Rich Text Editor features are segregated into individual feature-wise modules. To use the audio and video tool, we need to inject the audio and video module using the ",
                    React.createElement("code", null, "Audio, Video"),
                    "."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note:"),
                    " For security reasons, the embed video URL is restricted in this demo. If you want to insert an embed URL video, set the ",
                    React.createElement("code", null, "enableHtmlSanitizer"),
                    " to false in your application."))));
    };
    return InsertMedia;
}(sample_base_1.SampleBase));
exports.InsertMedia = InsertMedia;
