"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager sample with NodeJs service
 */
var NodeJSServer = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var hostUrl = "https://ej2-nodejs-service.azurewebsites.net/";
    return (React.createElement("div", null,
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ajaxSettings: { url: hostUrl, getImageUrl: hostUrl + 'GetImage', uploadUrl: hostUrl + 'Upload', downloadUrl: hostUrl + 'Download' }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: { file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true } },
                React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar, ej2_react_filemanager_1.ContextMenu] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates how to utilize the ",
                React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem" }, "NodeJS file system provider"),
                " with the File Manager component. It supports all basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more. The ",
                React.createElement("code", null, "ej2-filemanager-node-filesystem"),
                " is an NPM package for file system provider which is available in npmjs, refer to this ",
                React.createElement("a", { target: "_blank", href: "https://www.npmjs.com/package/@syncfusion/ej2-filemanager-node-filesystem" }, "link"),
                " to download package.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Check out the project from this ",
                React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem" }, "link"),
                ". Open the root folder and run the command ",
                React.createElement("code", null, "npm install"),
                " to install the necessary packages."),
            React.createElement("p", null,
                "After installing the packages, set the root folder directory of the file system in the ",
                React.createElement("code", null, "package.json"),
                " file under the ",
                React.createElement("code", null, "scripts"),
                " section, like this: ",
                React.createElement("code", null, " \"start\": \"node filesystem-server.js -d D:/Files\" "),
                "."),
            React.createElement("p", null,
                "Set the port on which the project will be hosted and the root directory of the file system. For example: ",
                React.createElement("code", null, "set PORT=3000 && node filesystem-server.js -d D:/Files"),
                ". "),
            React.createElement("p", null,
                "Finally, map the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/javascript/documentation/api/file-manager/#ajaxsettings", target: "_blank" }, " ajaxSettings "),
                " property to the appropriate file operation methods in the ",
                React.createElement("code", null, "filesystem-server.js"),
                " file. This will allow users to manage the physical file system using the NodeJS file system provider."),
            React.createElement("p", null,
                React.createElement("b", null, "Note: "),
                "File Manager\u2019s upload functionality is restricted in online demos for security reasons. To work with upload functionality, please download ",
                React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem" }, "NodeJS File Provider"),
                " from the GitHub repository."))));
};
exports.default = NodeJSServer;
