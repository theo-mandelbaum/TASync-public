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
exports.FileBrowser = void 0;
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_react_richtexteditor_2 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var FileBrowser = /** @class */ (function (_super) {
    __extends(FileBrowser, _super);
    function FileBrowser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';
        _this.toolbarSettings = {
            items: ['FileManager', 'Image']
        };
        _this.fileManagerSettings = {
            enable: true,
            path: '/Pictures/Food',
            ajaxSettings: {
                url: _this.hostUrl + 'api/FileManager/FileOperations',
                getImageUrl: _this.hostUrl + 'api/FileManager/GetImage',
                uploadUrl: _this.hostUrl + 'api/FileManager/Upload',
                downloadUrl: _this.hostUrl + 'api/FileManager/Download'
            }
        };
        return _this;
    }
    FileBrowser.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", null,
                React.createElement("div", { className: 'control-section', id: "rteAPI" },
                    React.createElement("div", { className: 'rte-control-section' },
                        React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { toolbarSettings: this.toolbarSettings, fileManagerSettings: this.fileManagerSettings },
                            React.createElement("p", null, "Rich Text Editor allows inserting images from online sources as well as the local computers where you want to insert the image in your content."),
                            React.createElement("p", null,
                                React.createElement("b", null, "Get started Quick Toolbar to click on the image")),
                            React.createElement("p", null, "It is possible to add custom style on the selected image inside the RichTextEditor through the quick toolbar."),
                            React.createElement("img", { id: 'rteImageID', style: { width: '300px', height: '300px', transform: 'rotate(0deg)' }, alt: "Logo", src: "./src/rich-text-editor/images/RTEImage-Feather.png" }),
                            React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_2.FileManager, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the option to insert the image into the RichTextEditor content using FileManager. Click the open folder button from the toolbar item to insert the image.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The FileManager feature provides an option to insert the image into the editor and its supports various cloud service. It supports all the basic file operations such as create, rename, delete, cut, copy, paste, upload, download and so on."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module:")),
                React.createElement("p", null, "RichTextEditor features are segregated into individual feature-wise modules. To use FileManager tool, we need to inject FileManager module into the service"),
                React.createElement("p", null,
                    React.createElement("b", null, "Note:"),
                    " File Manager\u2019s upload functionality is restricted in online demo."))));
    };
    return FileBrowser;
}(sample_base_1.SampleBase));
exports.FileBrowser = FileBrowser;
