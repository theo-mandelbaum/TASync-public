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
exports.FileUpload = void 0;
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
require("./file-upload.css");
/**
 * File Manager real time use case sample
 */
var FileUpload = /** @class */ (function (_super) {
    __extends(FileUpload, _super);
    function FileUpload(props) {
        var _this = _super.call(this, props) || this;
        _this.hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
        _this.animationSettings = { effect: 'None' };
        return _this;
    }
    // 'Uploader' will be shown, if Dialog is closed
    FileUpload.prototype.dialogClose = function () {
        document.getElementById('uploadFileManager').style.display = 'block';
    };
    // 'Uploader' will be hidden, if Dialog is opened
    FileUpload.prototype.dialogOpen = function () {
        document.getElementById('uploadFileManager').style.display = 'none';
    };
    // File Manager's fileOpen event function
    FileUpload.prototype.onFileOpen = function (args) {
        var file = args.fileDetails;
        if (file.isFile) {
            args.cancel = true;
            if (file.size <= 0) {
                file.size = 10000;
            }
            this.fileUploadObj.files = [{ name: file.name, size: file.size, type: file.type }];
            this.dialogObj.hide();
        }
    };
    FileUpload.prototype.btnClick = function () {
        this.dialogObj.show();
        this.dialogOpen();
        this.filemanagerObj.path = '/';
        this.filemanagerObj.selectedItems = [];
        this.filemanagerObj.refresh();
    };
    FileUpload.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { id: 'uploadFileManager', className: "fileupload" },
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', ref: function (scope) { _this.fileUploadObj = scope; } }),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "openBtn", onClick: this.btnClick.bind(this) }, "File Browser")),
                React.createElement("div", { id: 'target', className: "control-section" },
                    React.createElement(ej2_react_popups_1.DialogComponent, { width: '850px', id: 'dialog', target: '#target', ref: function (scope) { _this.dialogObj = scope; }, header: "Select a file", showCloseIcon: true, visible: false, open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this), animationSettings: this.animationSettings },
                        React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ref: function (scope) { _this.filemanagerObj = scope; }, ajaxSettings: {
                                url: this.hostUrl + "api/FileManager/FileOperations",
                                getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                                uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                                downloadUrl: this.hostUrl + 'api/FileManager/Download'
                            }, allowMultiSelection: false, toolbarSettings: { items: ['NewFolder', 'Upload', 'Delete', 'Cut', 'Copy', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'] }, contextMenuSettings: {
                                file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                                layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                                visible: true
                            }, fileOpen: this.onFileOpen.bind(this) },
                            React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the real-time use case of File Manager in a web application. ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/dialog/getting-started", target: "_blank" }, " Dialog "),
                    " and ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/uploader/getting-started", target: "_blank" }, " Uploader "),
                    " components are integrated with the File Manager. Click the browse button in the uploader element to open the File Manager inside the ",
                    React.createElement("code", null, "Dialog"),
                    " component. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The File Manager component is used to explore a file system through a web application, similar to the Windows Explorer for Windows. It supports all the basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install",
                    React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, " Syncfusion Essential Studio "),
                    "on your machine and run the demo."))));
    };
    return FileUpload;
}(sample_base_1.SampleBase));
exports.FileUpload = FileUpload;
