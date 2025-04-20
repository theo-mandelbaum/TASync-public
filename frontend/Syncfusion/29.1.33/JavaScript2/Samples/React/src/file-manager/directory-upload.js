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
exports.DirectoryUpload = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
/**
 * File Manager folder upload sample
 */
var DirectoryUpload = /** @class */ (function (_super) {
    __extends(DirectoryUpload, _super);
    function DirectoryUpload() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
        _this.items = [{ text: 'Folder' }, { text: 'Files' }];
        return _this;
    }
    DirectoryUpload.prototype.uploadTemplate = function () {
        return (React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { id: "dropButton", items: this.items, iconCss: 'e-icons e-fe-upload', cssClass: "e-tbar-btn e-tbtn-txt", select: this.onSelect.bind(this), onClick: this.uploadClick.bind(this) },
            React.createElement("span", { className: "e-tbar-btn-text" }, "Upload")));
    };
    DirectoryUpload.prototype.uploadClick = function (e) {
        e.stopPropagation();
    };
    DirectoryUpload.prototype.onSelect = function (args) {
        if (args.item.text === 'Folder') {
            this.fmObj.uploadSettings.directoryUpload = true;
        }
        else {
            this.fmObj.uploadSettings.directoryUpload = false;
        }
        setTimeout(function () {
            var uploadBtn = document.querySelector('.e-file-select-wrap button');
            uploadBtn.click();
        }, 100);
    };
    DirectoryUpload.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "file", ref: function (scope) { _this.fmObj = scope; }, ajaxSettings: {
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }, contextMenuSettings: {
                        file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        visible: true
                    } },
                    React.createElement(ej2_react_filemanager_1.ToolbarItemsDirective, null,
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: 'NewFolder' }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { template: this.uploadTemplate.bind(this), name: "Upload" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "SortBy" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "Refresh" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "Cut" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "Copy" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "Paste" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "Delete" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "Download" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "Rename" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "Selection" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "View" }),
                        React.createElement(ej2_react_filemanager_1.ToolbarItemDirective, { name: "Details" })),
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the folder (directory) upload feature. Select ",
                    React.createElement("code", null, "Folder"),
                    " from the ",
                    React.createElement("code", null, "Upload"),
                    " toolbar item to select and upload a folder in the File Manager component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, a folder upload is enabled by setting ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/uploadSettingsModel/#directoryupload", target: "_blank" }, " directoryUpload "),
                    " to ",
                    React.createElement("code", null, "true"),
                    ". It allows users to select or drag and drop a folder to upload its contents including hierarchy folders and files in the File Manager component."),
                React.createElement("p", null, "The folder (directory) upload is supported for the following file system providers, "),
                React.createElement("ul", null,
                    React.createElement("li", null, " Physical provider"),
                    React.createElement("li", null, " NodeJS provider"),
                    React.createElement("li", null, " Azure provider"),
                    React.createElement("li", null, " Amazon S3 provider")),
                React.createElement("p", null,
                    "To efficiently upload large files and folders to the server in manageable chunks, use the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/uploadsettingsmodel/#chunksize" }, "chunkSize"),
                    " property to specify the desired chunk size."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install",
                    React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, " Syncfusion Essential Studio "),
                    "on your machine and run the demo."))));
    };
    return DirectoryUpload;
}(sample_base_1.SampleBase));
exports.DirectoryUpload = DirectoryUpload;
