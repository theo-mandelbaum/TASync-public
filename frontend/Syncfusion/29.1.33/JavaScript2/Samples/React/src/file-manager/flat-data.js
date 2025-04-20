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
exports.FlatData = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
/**
 * File Manager full functionalities sample
 */
var FlatData = /** @class */ (function (_super) {
    __extends(FlatData, _super);
    function FlatData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.permission = {
            "copy": false,
            "download": false,
            "write": false,
            "writeContents": false,
            "read": true,
            "upload": false,
            "message": ""
        };
        _this.fileData = [
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T18:16:38.4384894+05:30"),
                filterPath: "",
                hasChild: true,
                id: '0',
                isFile: false,
                name: "Files",
                parentId: null,
                size: 1779448,
                type: "folder",
            }, {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\",
                hasChild: false,
                id: '1',
                isFile: false,
                name: "Documents",
                parentId: '0',
                size: 680786,
                type: "folder",
                permission: _this.permission
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\",
                hasChild: false,
                id: "2",
                isFile: false,
                name: "Downloads",
                parentId: "0",
                size: 6172,
                type: "folder"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\",
                hasChild: false,
                id: "3",
                isFile: false,
                name: "Music",
                parentId: "0",
                size: 20,
                type: "folder"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\",
                hasChild: true,
                id: "4",
                isFile: false,
                name: "Pictures",
                parentId: "0",
                size: 228465,
                type: "folder"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\",
                hasChild: false,
                id: "5",
                isFile: false,
                name: "Videos",
                parentId: "0",
                size: 20,
                type: "folder"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Documents\\",
                hasChild: false,
                id: "6",
                isFile: true,
                name: "EJ2_File_Manager",
                parentId: "1",
                size: 12403,
                type: ".docx"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Documents\\",
                hasChild: false,
                id: "7",
                isFile: true,
                name: "EJ2_File_Manager",
                parentId: "1",
                size: 90099,
                type: ".pdf"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Documents\\",
                hasChild: false,
                id: "8",
                isFile: true,
                name: "File_Manager_PPT",
                parentId: "1",
                size: 578010,
                type: ".pptx"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Documents\\",
                hasChild: false,
                id: "9",
                isFile: true,
                name: "File_Manager",
                parentId: "1",
                size: 274,
                type: ".txt"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Downloads\\",
                hasChild: false,
                id: "10",
                isFile: true,
                name: "Sample_Work_Sheet",
                parentId: "2",
                size: 6172,
                type: ".xlsx"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Music\\",
                hasChild: false,
                id: "11",
                isFile: true,
                name: "Music",
                parentId: "3",
                size: 10,
                type: ".mp3"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Music\\",
                hasChild: false,
                id: "12",
                isFile: true,
                name: "Sample_Music",
                parentId: "3",
                size: 10,
                type: ".mp3"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Videos\\",
                hasChild: false,
                id: "13",
                isFile: true,
                name: "Demo_Video",
                parentId: "5",
                size: 10,
                type: ".mp4"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Videos\\",
                hasChild: false,
                id: "14",
                isFile: true,
                name: "Sample_Video",
                parentId: "5",
                size: 10,
                type: ".mp4"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Pictures\\",
                hasChild: false,
                id: '15',
                isFile: false,
                name: "Employees",
                parentId: '4',
                size: 237568,
                type: "folder",
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Pictures\\Employees\\",
                hasChild: false,
                id: '16',
                isFile: true,
                name: "Albert",
                parentId: '15',
                size: 53248,
                type: ".png",
                imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic01.png"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Pictures\\Employees\\",
                hasChild: false,
                id: '17',
                isFile: true,
                name: "Nancy",
                parentId: '15',
                size: 65536,
                type: ".png",
                imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic02.png"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Pictures\\Employees\\",
                hasChild: false,
                id: '18',
                isFile: true,
                name: "Michael",
                parentId: '15',
                size: 69632,
                type: ".png",
                imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic03.png"
            },
            {
                dateCreated: new Date("2023-11-15T19:02:02.3419426+05:30"),
                dateModified: new Date("2024-01-08T16:55:20.9464164+05:30"),
                filterPath: "\\Pictures\\Employees\\",
                hasChild: false,
                id: '19',
                isFile: true,
                name: "Robert",
                parentId: '15',
                size: 48951,
                type: ".png",
                imageUrl: "https://ej2.syncfusion.com/demos/src/avatar/images/pic04.png"
            }
        ];
        _this.resultData = [].slice.call(_this.fileData);
        return _this;
    }
    FlatData.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "flatdata", fileSystemData: this.resultData, toolbarSettings: { items: ['NewFolder', 'Cut', 'Copy', 'Paste', 'Delete', 'Rename', 'SortBy', 'Refresh', 'Selection', 'View', 'Details'] }, contextMenuSettings: {
                        file: ["Cut", "Copy", "|", "Delete", "Rename", "|", "Details"], folder: ["Open", "|", "Cut", "Copy", "Paste", "|", "Delete", "Rename", "|", "Details"], layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"], visible: true
                    } },
                    React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.DetailsView, ej2_react_filemanager_1.Toolbar] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates flat data rendering of the File Manager component. The File Manager uses a flat data object as an array of JSON objects for rendering, eliminating the need to define the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#ajaxsettings", target: "_blank" }, "ajaxSettings"),
                    " url.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The File Manager component is used to manage the files and folders in a file system. It supports all the basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more."),
                React.createElement("p", null,
                    "To load a folder data as an array of JSON objects, use the File Manager component ",
                    React.createElement("code", null,
                        React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#fileSystemData", target: "_blank" }, "fileSystemData")),
                    " property."))));
    };
    return FlatData;
}(sample_base_1.SampleBase));
exports.FlatData = FlatData;
