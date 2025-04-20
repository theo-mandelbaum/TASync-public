"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./custom-drop-area.css");
var Customdroparea = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        renderComplete();
    }, []);
    // Uploader component
    var uploadObj = (0, react_1.useRef)(null);
    var asyncSettings;
    var allowedExtensions;
    var target = (0, react_1.useRef)(null);
    asyncSettings = {
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
        removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
    };
    allowedExtensions = '.pdf, .png, .txt';
    var renderComplete = function () {
        uploadObj.current.dropArea = target.current;
        document.getElementById('browse').onclick = function () {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
        document.getElementById('customdropArea').onclick = function (args) {
            var target = args.target;
            if (target.classList.contains('e-file-delete-btn')) {
                for (var i = 0; i < uploadObj.current.getFilesData().length; i++) {
                    if (target.parentElement.parentElement.getAttribute('data-file-name') === uploadObj.current.getFilesData()[i].name) {
                        uploadObj.current.remove(uploadObj.current.getFilesData()[i]);
                    }
                }
            }
            else if (target.classList.contains('e-file-remove-btn')) {
                (0, ej2_base_1.detach)(target.parentElement.parentElement);
            }
        };
    };
    var listTemplate = function (data) {
        return (React.createElement("span", null,
            React.createElement("span", { className: 'fileListwrapper' },
                React.createElement("span", { className: "icon template-icons sf-icon-".concat(data.type) }),
                React.createElement("span", { className: 'upload-name file-name' },
                    data.name,
                    " (",
                    data.size,
                    " bytes)"),
                React.createElement("span", { className: 'upload-status' }, data.status)),
            React.createElement("span", { className: 'e-icons e-file-remove-btn', title: 'Remove' })));
    };
    var onUploadSuccess = function (args) {
        var li = getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status;
        li.querySelector('.upload-status').classList.add('upload-success');
    };
    var onUploadFailed = function (args) {
        var li = getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status;
        li.querySelector('.upload-status').classList.add('upload-failed');
    };
    var onUploadInProgress = function (args) {
        var progressValue = Math.round((args.e.loaded / args.e.total) * 100) + '%';
        var li = getLiElement(args);
        li.querySelector('.upload-status').innerHTML = args.file.status + '(' + progressValue + ' )';
    };
    var onSelect = function (args) {
        var allowedTypes = ['pdf', 'png', 'txt'];
        var modifiedFiles = [];
        for (var _i = 0, _a = args.filesData; _i < _a.length; _i++) {
            var file = _a[_i];
            if (allowedTypes.indexOf(file.type.toLowerCase()) > -1) {
                modifiedFiles.push(file);
            }
        }
        if (modifiedFiles.length > 0) {
            args.isModified = true;
            args.modifiedFiles = modifiedFiles;
        }
        else {
            args.cancel = true;
        }
    };
    var getLiElement = function (args) {
        var liElements = document.getElementsByClassName('e-upload')[0].querySelectorAll('.e-upload-files > li');
        var li;
        for (var i = 0; i < liElements.length; i++) {
            if (liElements[i].getAttribute('data-file-name') === args.file.name) {
                li = liElements[i];
            }
        }
        return li;
    };
    var onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section row uploadpreview' },
            React.createElement("div", { className: 'col-lg-12 control-section upload-custom' },
                React.createElement("div", { className: 'customdrop_wrapper' },
                    React.createElement("div", { className: "dropArea_wrap", id: "customTarget", ref: target },
                        React.createElement("div", { className: "font-icons" },
                            React.createElement("span", { className: "e-icons sf-icon-pdf" }),
                            React.createElement("span", { className: "e-icons sf-icon-txt" }),
                            React.createElement("span", { className: "e-icons sf-icon-png" })),
                        React.createElement("span", { className: "dropText", id: "dropText" }, "Drop files here to upload")),
                    React.createElement("div", { id: "customdropArea" },
                        React.createElement("span", { id: "drop", className: "customdropArea" },
                            React.createElement("a", { href: "", id: "browse" },
                                React.createElement("u", null, "Browse"))),
                        React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'UploadFiles', type: 'file', ref: uploadObj, asyncSettings: asyncSettings, selected: onSelect.bind(_this), removing: onRemoveFile.bind(_this), progress: onUploadInProgress.bind(_this), success: onUploadSuccess.bind(_this), failure: onUploadFailed.bind(_this), allowedExtensions: allowedExtensions, template: listTemplate, dropArea: target.current }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-file-upload", target: "_blank" }, "\u00A0React File Upload"),
                " example demonstrates how to configure custom drop area of the Uploader. You can drop the files into specified custom drop area location to upload.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Uploader component allows to set any external element as drop area using the \u00A0",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/uploader/#droparea" }, "dropArea"),
                " property."),
            React.createElement("p", null,
                "More information on the drag-and-drop can be found on this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/file-source/#drag-and-drop" }, " documentation section"),
                "."))));
};
exports.default = Customdroparea;
