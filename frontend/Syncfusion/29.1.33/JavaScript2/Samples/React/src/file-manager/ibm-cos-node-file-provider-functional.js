"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager sample with IBM Cloud Object Storage service
 */
var IBMServer = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var hostUrl = "https://ej2-ibm-cos-node-file-provider.azurewebsites.net/";
    return (React.createElement("div", null,
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ajaxSettings: { url: hostUrl, getImageUrl: hostUrl + 'GetImage', uploadUrl: hostUrl + 'Upload', downloadUrl: hostUrl + 'Download' }, rootAliasName: "Files", toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: { file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true } },
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
exports.default = IBMServer;
