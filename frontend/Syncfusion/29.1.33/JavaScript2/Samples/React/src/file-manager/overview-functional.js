"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager full functionalities sample
 */
var Overview = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
    return (React.createElement("div", null,
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "overview_file", ajaxSettings: { url: hostUrl + "api/FileManager/FileOperations", getImageUrl: hostUrl + "api/FileManager/GetImage", uploadUrl: hostUrl + 'api/FileManager/Upload', downloadUrl: hostUrl + 'api/FileManager/Download' }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: { file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true }, view: "Details" },
                React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "The File Manager component is an efficient tool for managing files and folders, providing a comprehensive set of features such as a ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#toolbarsettings", target: "_blank" }, " toolbar"),
                ", ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#navigationpanesettings", target: "_blank" }, " navigation pane"),
                " and ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#detailsviewsettings", target: "_blank" }, " details view"),
                ", which make it easy to create, rename, delete, cut, copy, paste, upload, download, and more. With its user-friendly interface, users can easily navigate through folders and effortlessly select their desired files or folders.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The File Manager component is a great tool for navigating a file system within a web application, offering functionality similar to Windows Explorer. It supports essential file operations, including ",
                React.createElement("code", null, "creating"),
                ", ",
                React.createElement("code", null, "renaming"),
                ", ",
                React.createElement("code", null, "deleting"),
                ", ",
                React.createElement("code", null, "refreshing"),
                ", and more."),
            React.createElement("p", null,
                "The ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#ajaxsettings", target: "_blank" }, " ajaxSettings "),
                " must be defined when initializing the File Manager, as it uses the URLs specified in ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#ajaxsettings", target: "_blank" }, " ajaxSettings "),
                " to send file operation requests to the server."),
            React.createElement("p", null,
                "The context menu can be customized using the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#contextmenusettings", target: "_blank" }, " contextMenuSettings "),
                " API, which is used to add new menu items."),
            React.createElement("p", null,
                "The custom toolbar items can be added and customized using the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#toolbarsettings", target: "_blank" }, " toolbarSettings "),
                " API. If a new toolbar is needed, it can be added using the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#toolbarsettings", target: "_blank" }, " toolbarSettings "),
                "."),
            React.createElement("p", null,
                React.createElement("b", null, "Note: "),
                "File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install",
                React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, " Syncfusion Essential Studio "),
                "on your machine and run the demo."))));
};
exports.default = Overview;
