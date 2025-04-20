"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager Drag and Drop feature sample
 */
var DragAndDrop = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
    return (React.createElement("div", null,
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ajaxSettings: { url: hostUrl + "api/FileManager/FileOperations", getImageUrl: hostUrl + "api/FileManager/GetImage", uploadUrl: hostUrl + 'api/FileManager/Upload', downloadUrl: hostUrl + 'api/FileManager/Download' }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: { file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true }, allowDragAndDrop: true },
                React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This example demonstrates the ",
                React.createElement("code", null, "drag-and-drop"),
                " feature. To drag and drop a file in the File Manager, select and drag it to the target folder. The File Manager component allows users to drag file and drop it into any folder, whether it is located in the same directory or a different one, using the ",
                React.createElement("code", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#allowdraganddrop", target: "_blank" }, "allowDragAndDrop")),
                " property.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this sample, the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#allowdraganddrop", target: "_blank" }, " allowDragAndDrop "),
                " property enables users to move files or folders from one folder to another. Additionally, it supports file upload by dragging and dropping files from Windows Explorer and Mac onto the File Manager component."),
            React.createElement("p", null,
                React.createElement("b", null, "Note: "),
                "File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install",
                React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, " Syncfusion Essential Studio "),
                "on your machine and run the demo."))));
};
exports.default = DragAndDrop;
