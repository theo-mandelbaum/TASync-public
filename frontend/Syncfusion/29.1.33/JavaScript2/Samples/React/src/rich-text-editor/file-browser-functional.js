"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var ej2_react_richtexteditor_2 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
function FileBrowser() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var hostUrl = 'https://ej2-aspcore-service.azurewebsites.net/';
    var toolbarSettings = {
        items: ['FileManager', 'Image']
    };
    var fileManagerSettings = {
        enable: true,
        path: '/Pictures/Food',
        ajaxSettings: {
            url: hostUrl + 'api/FileManager/FileOperations',
            getImageUrl: hostUrl + 'api/FileManager/GetImage',
            uploadUrl: hostUrl + 'api/FileManager/Upload',
            downloadUrl: hostUrl + 'api/FileManager/Download'
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", null,
            React.createElement("div", { className: 'control-section', id: "rteAPI" },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { toolbarSettings: toolbarSettings, fileManagerSettings: fileManagerSettings },
                        React.createElement("p", null, "Rich Text Editor allows inserting images from online sources as well as the local computers where you want to insert the image in your content."),
                        React.createElement("p", null,
                            React.createElement("b", null, "Get started Quick Toolbar to click on the image")),
                        React.createElement("p", null, "It is possible to add custom style on the selected image inside the RichTextEditor through the quick toolbar."),
                        React.createElement("img", { id: 'rteImageID', style: { width: '300px', height: '300px', transform: 'rotate(0deg)' }, alt: "Logo", src: "./src/rich-text-editor/images/RTEImage-Feather.png" }),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_2.FileManager, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] }))))),
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
}
exports.default = FileBrowser;
