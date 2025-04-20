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
exports.IBMServer = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager sample with IBM Cloud Object Storage service
 */
var IBMServer = /** @class */ (function (_super) {
    __extends(IBMServer, _super);
    function IBMServer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ej2-ibm-cos-node-file-provider.azurewebsites.net/";
        return _this;
    }
    IBMServer.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ajaxSettings: {
                        url: this.hostUrl,
                        getImageUrl: this.hostUrl + 'GetImage',
                        uploadUrl: this.hostUrl + 'Upload',
                        downloadUrl: this.hostUrl + 'Download'
                    }, rootAliasName: "Files", toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: {
                        file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    } },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar, ej2_react_filemanager_1.ContextMenu] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates how to use the ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/filemanager-ibm-cos-node-file-provider" }, "IBM Cloud Object Storage file provider"),
                    " with the File Manager component. The IBM Cloud Object Storage file provider module provides support for working with the IBM Cloud Object Storage and enables various file actions such as creating a new folder, renaming files, and deleting files. The ",
                    React.createElement("code", null, "ej2-filemanager-ibm-cos-node-file-provider"),
                    " is an NPM package for file provider which is available in npmjs, refer to this ",
                    React.createElement("a", { target: "_blank", href: "https://www.npmjs.com/package/@syncfusion/ej2-filemanager-ibm-cos-node-file-provider" }, "link"),
                    " to download the package.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This file provider serves as a source for the File Manager component when using the IBM Cloud Object Storage."),
                React.createElement("p", null,
                    "To run the service, create an IBM Cloud Object Storage for accessing and storing the cloud objects as files or folders. Create an ",
                    React.createElement("a", { target: "_blank", href: "https://cloud.ibm.com/docs/cloud-object-storage/basics?topic=cloud-object-storage-provision" }, " IBM Cloud account "),
                    " and Cloud Object Storage bucket to perform file operations. Then, define the server credentials details such as ",
                    React.createElement("code", null, "bucketname"),
                    ", ",
                    React.createElement("code", null, "endpoint"),
                    ", ",
                    React.createElement("code", null, "apiKeyId"),
                    ", and ",
                    React.createElement("code", null, "serviceInstanceId"),
                    " within the ",
                    React.createElement("code", null, "config/default.json"),
                    " file found in the config folder."),
                React.createElement("p", null,
                    "Checkout this ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/filemanager-ibm-cos-node-file-provider" }, " IBM Cloud Object Storage file provider "),
                    " from the GitHub repository."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager\u2019s upload functionality is restricted in online demos for security reasons. To work with upload functionality, please download ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-filemanager-ibm-cos-node-file-provider" }, "IBM Cloud Object Storage file provider"),
                    " from the GitHub repository."))));
    };
    return IBMServer;
}(sample_base_1.SampleBase));
exports.IBMServer = IBMServer;
