"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_filemanager_1 = require("@syncfusion/ej2-react-filemanager");
require("./custom-thumbnail.css");
/**
 * File Manager custom thumbnail sample
 */
var CustomThumbnail = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
    return (React.createElement("div", null,
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_filemanager_1.FileManagerComponent, { id: "Thumbnail_filemanager", ajaxSettings: { url: hostUrl + "api/FileManager/FileOperations", getImageUrl: hostUrl + "api/FileManager/GetImage", uploadUrl: hostUrl + 'api/FileManager/Upload', downloadUrl: hostUrl + 'api/FileManager/Download' }, toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }, contextMenuSettings: { file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true }, view: "LargeIcons", showThumbnail: false },
                React.createElement(ej2_react_filemanager_1.Inject, { services: [ej2_react_filemanager_1.NavigationPane, ej2_react_filemanager_1.Toolbar] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "In this sample of the File Manager component, the custom thumbnail feature is showcased, allowing users to view personalized thumbnails for both folders and file types using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/file-manager/#showthumbnail" }, " showThumbnail "),
                " property.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, custom thumbnail styles (",
                React.createElement("code", null, "background-image"),
                " for the following classes within the ",
                React.createElement("code", null, ".e-filemanager .e-large-icons"),
                " class) were applied to folder and file types using corresponding class names, resulting in a visually distinctive representation of the thumbnails according to their specific needs."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-image")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-music")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-xlsx")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-video")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-pptx")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-rar")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-zip")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-txt")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-js")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-css")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-html")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-unknown")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-exe")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-msi")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-php")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-doc")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-docx")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-xml")),
                React.createElement("li", null,
                    React.createElement("code", null, ".e-fe-folder"))),
            React.createElement("p", null,
                React.createElement("b", null, "Note: "),
                "File Manager's upload functionality is restricted in the online demos for security reasons. If you need to test upload functionality, please install",
                React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/downloads" }, " Syncfusion Essential Studio "),
                "on your machine and run the demo."))));
};
exports.default = CustomThumbnail;
