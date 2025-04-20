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
exports.Azure = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager sample with azure service
 */
var Azure = /** @class */ (function (_super) {
    __extends(Azure, _super);
    function Azure() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ej2-azure-aspcore-service.azurewebsites.net/";
        return _this;
    }
    Azure.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "azure-file", ajaxSettings: {
                        url: this.hostUrl + 'api/AzureFileManager/AzureFileOperations',
                        getImageUrl: this.hostUrl + 'api/AzureFileManager/AzureGetImage',
                        uploadUrl: this.hostUrl + 'api/AzureFileManager/AzureUpload',
                        downloadUrl: this.hostUrl + 'api/AzureFileManager/AzureDownload'
                    }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: {
                        file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    } },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates how to use the ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/azure-aspcore-file-provider" }, "Azure file system provider"),
                    " with the File Manager component to perform file operations. This supports all basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample demonstrates the Azure file system provider that allows users to access and manage the blobs from the ",
                    React.createElement("code", null, "Azure blob storage"),
                    ". To start the service, create an ",
                    React.createElement("a", { target: "_blank", href: "https://learn.microsoft.com/en-us/azure/storage/common/storage-account-create?tabs=azure-portal" }, "Azure blob storage account"),
                    ". Refer to this ",
                    React.createElement("a", { target: "_blank", href: "https://learn.microsoft.com/en-IN/azure/storage/blobs/storage-quickstart-blobs-dotnet?culture=en-in&country=in&tabs=visual-studio%2Cmanaged-identity%2Croles-azure-portal%2Csign-in-azure-cli%2Cidentity-visual-studio" }, "link"),
                    " for more details."),
                React.createElement("p", null,
                    "Checkout this ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/azure-aspcore-file-provider" }, "Azure file system provider"),
                    " from the GitHub repository to connect with azure blob storage."),
                React.createElement("p", null,
                    "Provide the details such as the ",
                    React.createElement("code", null, "account name"),
                    ", ",
                    React.createElement("code", null, "password"),
                    ", and ",
                    React.createElement("code", null, "blob name"),
                    " in the ",
                    React.createElement("code", null, "RegisterAzure"),
                    " method."),
                React.createElement("p", null,
                    "Access the blob storage account using ",
                    React.createElement("code", null, "BlobContainerClient"),
                    " class and ",
                    React.createElement("code", null, "BlobServiceClient"),
                    " method of Azure. Read the storage files using the ",
                    React.createElement("code", null, "GetFilesAsync"),
                    " method to perform file operations in the File Manager component."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager\u2019s upload functionality is restricted in online demos for security reasons. To work with upload functionality, please download ",
                    React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-azure-aspcore-file-provider" }, "Azure Blob Provider"),
                    " from the GitHub repository."),
                React.createElement("p", null,
                    React.createElement("b", null, "NuGet Package:"),
                    " NuGet package of ",
                    React.createElement("a", { target: "_blank", href: "https://www.nuget.org/packages/Syncfusion.EJ2.FileManager.AzureFileProvider.AspNet.Core" },
                        React.createElement("b", null, "ASP.NET Core Azure file system provider")),
                    " is now available on ",
                    React.createElement("a", { target: "_blank", href: "https://www.nuget.org/" }, "nuget.org"),
                    "."))));
    };
    return Azure;
}(sample_base_1.SampleBase));
exports.Azure = Azure;
