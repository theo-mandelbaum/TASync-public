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
exports.Default = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager API sample
 */
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
        return _this;
    }
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "api_filemanager", ref: function (scope) { _this.fmObj = scope; }, ajaxSettings: {
                        downloadUrl: this.hostUrl + 'api/FileManagerAccess/Download',
                        getImageUrl: this.hostUrl + 'api/FileManagerAccess/GetImage',
                        uploadUrl: this.hostUrl + 'api/FileManagerAccess/Upload',
                        url: this.hostUrl + 'api/FileManagerAccess/FileOperations'
                    }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: {
                        file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    } },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "The File Manager that gives you complete control over who can access your folders and files. With this essential feature, you can define access permissions and create a secure and organized digital environment. This File Manager sample demonstrates that the enabled access permission will permit only read action and will not allow the user to perform any write action on the ",
                    React.createElement("code", null, "documents"),
                    ", ",
                    React.createElement("code", null, "music"),
                    " folders, and the ",
                    React.createElement("code", null, "bird image"),
                    " file inside the ",
                    React.createElement("code", null, "pictures/nature"),
                    " folder.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The access control feature allows you to define access permissions for folders and files using a set of access rule properties based on user\u2019s role. Refer to the ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/file-manager/access-control#access-rules' }, "Access Rules"),
                    " and ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/file-manager/access-control#permissions' }, "Permissions"),
                    " UG for more details on this."),
                React.createElement("p", null,
                    React.createElement("b", null, "Note: "),
                    "File Manager\u2019s upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install",
                    React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, "Syncfusion Essential Studio "),
                    "on your machine and run the demo."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
