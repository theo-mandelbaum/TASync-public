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
exports.Firebase = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager sample with firebase realtime database service
 */
var Firebase = /** @class */ (function (_super) {
    __extends(Firebase, _super);
    function Firebase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://realtime-firebase.azurewebsites.net/";
        return _this;
    }
    Firebase.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "firebase", ajaxSettings: {
                        url: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeFileOperations',
                        getImageUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeGetImage',
                        uploadUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeUpload',
                        downloadUrl: this.hostUrl + 'api/FirebaseProvider/FirebaseRealtimeDownload'
                    }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: {
                        file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    } },
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
    return Firebase;
}(sample_base_1.SampleBase));
exports.Firebase = Firebase;
