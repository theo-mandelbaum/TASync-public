"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./uploader.css");
var react_1 = require("react");
var Validation = function () {
    // Uploader component
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var uploadObj = (0, react_1.useRef)(null);
    var asyncSettings;
    var allowedExtensions;
    var dropContainerRef;
    var dropContainerEle;
    dropContainerEle = null;
    dropContainerRef = function (element) {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
        removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
    };
    allowedExtensions = '.doc, .docx, .xls, .xlsx';
    var rendereComplete = function () {
        uploadObj.current.dropArea = dropContainerEle;
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
        uploadObj.current.dataBind();
    };
    var onFileSelected = function (args) {
        args.filesData.splice(5);
        var filesData = uploadObj.current.getFilesData();
        var allFiles = filesData.concat(args.filesData);
        if (allFiles.length > 5) {
            for (var i = 0; i < allFiles.length; i++) {
                if (allFiles.length > 5) {
                    allFiles.shift();
                }
            }
            args.filesData = allFiles;
            args.modifiedFilesData = args.filesData;
        }
        args.isModified = true;
    };
    var onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    return (React.createElement("div", { className: 'control-pane', ref: dropContainerRef },
        React.createElement("div", { className: 'control-section col-lg-12 uploadpreview' },
            React.createElement("div", { className: 'upload_wrapper' },
                React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'validation', type: 'file', ref: uploadObj, asyncSettings: asyncSettings, selected: onFileSelected.bind(_this), minFileSize: 10000, autoUpload: false, removing: onRemoveFile.bind(_this), allowedExtensions: allowedExtensions }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-file-upload", target: "_blank" }, "\u00A0React File Upload"),
                " example demonstrates how to validate the files before uploading it to server. Only document files (DOC, DOCX, XLS, XLSX), and the files should contain minimum 10 KB and maximum 28 MB sizes to upload it into server.This sample limits maximum files count as 5 to upload.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Uploader component allows to validate the file\u2019s type, and limit the file size using allowedExtensions, minFileSize, and maxFileSize properties. You can also achieve limit the files count before uploading it using select event. "),
            React.createElement("p", null,
                "For more information, you can refer to the Validation section from this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/validation/" }, "documentation section"),
                "."))));
};
exports.default = Validation;
