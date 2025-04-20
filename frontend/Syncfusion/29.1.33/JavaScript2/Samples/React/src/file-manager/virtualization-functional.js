"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager virtualization feature sample
 */
var VirtualizationSample = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
    var onBeforeSend = function (args) {
        args.ajaxSettings.beforeSend = function (args) {
            args.httpRequest.setRequestHeader('Authorization', 'FileBrowser');
        };
    };
    var beforeImageLoad = function (args) {
        args.imageUrl = args.imageUrl + '&rootName=' + 'FileBrowser';
    };
    var beforeDownload = function (args) {
        args.data.rootFolderName = 'FileBrowser';
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ajaxSettings: { url: hostUrl + "api/Virtualization/FileOperations", getImageUrl: hostUrl + "api/Virtualization/GetImage", uploadUrl: hostUrl + 'api/Virtualization/Upload', downloadUrl: hostUrl + 'api/Virtualization/Download' }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'View', 'Details'] }, contextMenuSettings: { file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true }, view: "Details", enableVirtualization: true, beforeSend: onBeforeSend.bind(_this), beforeImageLoad: beforeImageLoad.bind(_this), beforeDownload: beforeDownload.bind(_this) },
                React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar, ej2_react_filemanager_1.Virtualization] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample illustrates the implementation of UI virtualization within the File Manager component, enhancing performance and user experience by dynamically loading folders and files as the user scrolls through the items. In both the details view and large icons view, the component efficiently handles extensive data sets, ensuring smooth navigation. Particularly, the ",
                React.createElement("code", null, "documents"),
                " and ",
                React.createElement("code", null, "text documents"),
                " folders in this example contain a substantial number of files, showcasing the capability of the File Manager to manage and display large volumes of data seamlessly.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, virtualization is enabled by setting the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#enablevirtualization", target: "_blank" }, "enableVirtualization"),
                " property to ",
                React.createElement("code", null, "true"),
                "."),
            React.createElement("p", null,
                "To use the virtual scrolling feature, inject the virtualization module using the ",
                React.createElement("code", null, "FileManager.Inject(Virtualization)"),
                " section."),
            React.createElement("p", null,
                React.createElement("b", null, "Note: "),
                "File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install",
                React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, " Syncfusion Essential Studio "),
                "on your machine and run the demo."))));
};
exports.default = VirtualizationSample;
