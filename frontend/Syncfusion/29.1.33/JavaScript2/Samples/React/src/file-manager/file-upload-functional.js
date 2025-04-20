"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
require("./file-upload.css");
/**
 * File Manager real time use case sample
 */
var FileUpload = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('block'), display = _a[0], setDisplay = _a[1];
    var _b = (0, react_1.useState)([{
            name: "",
            size: null,
            type: ""
        }]), file = _b[0], setFile = _b[1];
    var _c = (0, react_1.useState)('/'), path = _c[0], setPath = _c[1];
    var _d = (0, react_1.useState)([]), selectedItem = _d[0], setSelectedItem = _d[1];
    var fileUploadObj = (0, react_1.useRef)(null);
    var dialogObj = (0, react_1.useRef)(null);
    var filemanagerObj = (0, react_1.useRef)(null);
    var animationSettings = { effect: 'None' };
    // 'Uploader' will be shown, if Dialog is closed
    var dialogClose = function () {
        setDisplay('block');
    };
    // 'Uploader' will be hidden, if Dialog is opened
    var dialogOpen = function () {
        setDisplay('none');
    };
    // File Manager's fileOpen event function
    var onFileOpen = function (args) {
        var file = args.fileDetails;
        if (file.isFile) {
            args.cancel = true;
            if (file.size <= 0) {
                file.size = 10000;
            }
            setFile([{ name: file.name, size: file.size, type: file.type }]);
            dialogObj.current.hide();
        }
    };
    var btnClick = function () {
        dialogObj.current.show();
        dialogOpen();
        setPath('/');
        setSelectedItem([]);
        filemanagerObj.current.refresh();
    };
    var hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
    return (React.createElement("div", null,
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { id: 'uploadFileManager', className: "fileupload", style: { display: display } },
                React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', ref: fileUploadObj, files: file }),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "openBtn", onClick: btnClick.bind(_this) }, "File Browser")),
            React.createElement("div", { id: 'target', className: "control-section" },
                React.createElement(ej2_react_popups_1.DialogComponent, { width: '850px', id: 'dialog', target: '#target', ref: dialogObj, header: "Select a file", showCloseIcon: true, visible: false, open: dialogOpen.bind(_this), close: dialogClose.bind(_this), animationSettings: animationSettings },
                    React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "filemanager", ref: filemanagerObj, path: path, selectedItems: selectedItem, ajaxSettings: { url: hostUrl + "api/FileManager/FileOperations", getImageUrl: hostUrl + "api/FileManager/GetImage", uploadUrl: hostUrl + 'api/FileManager/Upload', downloadUrl: hostUrl + 'api/FileManager/Download' }, allowMultiSelection: false, toolbarSettings: { items: ['NewFolder', 'Upload', 'Delete', 'Cut', 'Copy', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'] }, contextMenuSettings: { file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true }, fileOpen: onFileOpen.bind(_this) },
                        React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the real-time use case of File Manager in a web application. ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/dialog/getting-started", target: "_blank" }, " Dialog "),
                " and ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/uploader/getting-started", target: "_blank" }, " Uploader "),
                " components are integrated with the File Manager. Click the browse button in the uploader element to open the File Manager inside the ",
                React.createElement("code", null, "Dialog"),
                " component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The File Manager component is used to explore a file system through a web application, similar to the Windows Explorer for Windows. It supports all the basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more."),
            React.createElement("p", null,
                React.createElement("b", null, "Note: "),
                "File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install",
                React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, " Syncfusion Essential Studio "),
                "on your machine and run the demo."))));
};
exports.default = FileUpload;
