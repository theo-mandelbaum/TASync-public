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
exports.VirtualizationSample = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager virtualization feature sample
 */
var VirtualizationSample = /** @class */ (function (_super) {
    __extends(VirtualizationSample, _super);
    function VirtualizationSample() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
        return _this;
    }
    VirtualizationSample.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ajaxSettings: {
                        url: this.hostUrl + "api/Virtualization/FileOperations",
                        getImageUrl: this.hostUrl + "api/Virtualization/GetImage",
                        uploadUrl: this.hostUrl + 'api/Virtualization/Upload',
                        downloadUrl: this.hostUrl + 'api/Virtualization/Download'
                    }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'View', 'Details'] }, contextMenuSettings: {
                        file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'],
                        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'],
                        visible: true
                    }, view: "Details", enableVirtualization: true },
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
    return VirtualizationSample;
}(sample_base_1.SampleBase));
exports.VirtualizationSample = VirtualizationSample;
