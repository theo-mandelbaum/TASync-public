"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager sample with firebase realtime database service
 */
var Firebase = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var hostUrl = "https://realtime-firebase.azurewebsites.net/";
    return (React.createElement("div", null,
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "firebase", ajaxSettings: { url: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeFileOperations', getImageUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeGetImage', uploadUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeUpload', downloadUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeDownload' }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: { file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true } },
                React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates how to utilize the ",
                React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/firebase-realtime-database-aspcore-file-provider" }, "Firebase Realtime Database file system provider"),
                " with File Manager component. It supports all basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "To run the service, create a ",
                React.createElement("a", { target: "_blank", href: "https://console.firebase.google.com/" }, "Firebase realtime database"),
                " and then register the database's ",
                React.createElement("code", null, "Rest API link"),
                ", ",
                React.createElement("code", null, "root node name"),
                ", and ",
                React.createElement("code", null, "service account key path "),
                " in the ",
                React.createElement("code", null, "RegisterFirebaseRealtimeDB"),
                " method to perform the file operations."),
            React.createElement("p", null,
                "Checkout this ",
                React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/firebase-realtime-database-aspcore-file-provider" }, "Firebase Realtime Database file system provider"),
                " from the GitHub repository to connect with ",
                React.createElement("code", null, "RegisterFirebaseRealtimeDB"),
                " method."),
            React.createElement("b", null, "Note: "),
            "File Manager's upload functionality is restricted in online demos for security reasons. To work with upload functionality, please download ",
            React.createElement("a", { target: "_blank", href: "https://github.com/SyncfusionExamples/ej2-firebase-realtime-database-aspcore-file-provider" }, "ej2-firebase-realtime-database-aspcore-file-provider"),
            " from the GitHub repository.")));
};
exports.default = Firebase;
