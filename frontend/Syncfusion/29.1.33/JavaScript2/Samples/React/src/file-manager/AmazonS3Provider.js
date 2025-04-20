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
exports.AmazonS3Provider = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager sample with Amazon S3 file provider service
 */
var AmazonS3Provider = /** @class */ (function (_super) {
    __extends(AmazonS3Provider, _super);
    function AmazonS3Provider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://amazons3.azurewebsites.net/api/AmazonS3Provider/";
        return _this;
    }
    AmazonS3Provider.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ajaxSettings: {
                        url: this.hostUrl + 'AmazonS3FileOperations',
                        getImageUrl: this.hostUrl + 'AmazonS3GetImage',
                        uploadUrl: this.hostUrl + 'AmazonS3Upload',
                        downloadUrl: this.hostUrl + 'AmazonS3Download'
                    }, searchSettings: { allowSearchOnTyping: false }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: {
                        file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    } },
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
    return AmazonS3Provider;
}(sample_base_1.SampleBase));
exports.AmazonS3Provider = AmazonS3Provider;
