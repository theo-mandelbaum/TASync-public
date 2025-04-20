"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager sample with Amazon S3 file provider service
 */
var AmazonS3Provider = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var hostUrl = "https://amazons3.azurewebsites.net/api/AmazonS3Provider/";
    return (React.createElement("div", null,
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ajaxSettings: { url: hostUrl + 'AmazonS3FileOperations', getImageUrl: hostUrl + 'AmazonS3GetImage', uploadUrl: hostUrl + 'AmazonS3Upload', downloadUrl: hostUrl + 'AmazonS3Download' }, searchSettings: { allowSearchOnTyping: false }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: { file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true } },
                React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar, ej2_react_filemanager_1.ContextMenu] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates how to use the ",
                React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/amazon-s3-aspcore-file-provider" }, "Amazon S3 file system provider"),
                " with the File Manager control to perform file operations. It supports all basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample explains the Amazon S3 (Simple Storage Service) cloud file provider that allows users to access and manage a server-hosted file system as a collection of objects stored in the Amazon S3 Bucket. To start the service,create an ",
                React.createElement("a", { target: "_blank", href: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html" }, "Amazon S3 account"),
                " and a bucket, and then provide your Amazon S3 client account details such as the ",
                React.createElement("code", null, "bucket name"),
                ", ",
                React.createElement("code", null, "AWS access key ID"),
                ", ",
                React.createElement("code", null, "AWS secret key ID"),
                ", and ",
                React.createElement("code", null, "AWS region"),
                " in the ",
                React.createElement("code", null, "RegisterAmazonS3"),
                " method to perform file operations."),
            React.createElement("p", null,
                "Checkout this ",
                React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/amazon-s3-aspcore-file-provider" }, "Amazon S3 file system provider"),
                " from the GitHub repository to connect with the ",
                React.createElement("code", null, "RegisterAmazonS3"),
                " method."),
            React.createElement("p", null,
                React.createElement("b", null, "Note: "),
                "File Manager\u2019s upload functionality is restricted in online demos for security reasons. To work with upload functionality, please download the ",
                React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/amazon-s3-aspcore-file-provider" }, "Amazon S3 File Provider"),
                " from the GitHub repository."))));
};
exports.default = AmazonS3Provider;
