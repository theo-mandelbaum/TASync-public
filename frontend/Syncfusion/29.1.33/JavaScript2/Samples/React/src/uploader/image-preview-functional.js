"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./image-preview.css");
var react_1 = require("react");
var Preview = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        renderComplete();
    }, []);
    // Uploader component
    var uploadObj = (0, react_1.useRef)(null);
    var filesDetails = [];
    var dropElement;
    var filesList = [];
    var filesName = [];
    var parentElement;
    var asyncSettings;
    var allowedExtensions;
    var dropContainerEle = null;
    var dropAreaEle = null;
    var dropImageEle = null;
    var buttonEle;
    var clearEle;
    var dropArea;
    var dropContainerRef = function (element) {
        dropContainerEle = element;
    };
    var dropAreaRef = function (element) {
        dropAreaEle = element;
    };
    var dropImageRef = function (element) {
        dropImageEle = element;
    };
    var buttonRef = function (element) {
        buttonEle = element;
    };
    var clearRef = function (element) {
        clearEle = element;
    };
    asyncSettings = {
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
        removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
    };
    allowedExtensions = '.jpg,.png,.jpeg';
    var renderComplete = function () {
        dropArea = dropAreaEle;
        dropElement = dropContainerEle;
        if (ej2_base_1.Browser.isDevice) {
            dropImageEle.style.padding = '0px 10%';
        }
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
        dropAreaEle.children[0].children[0].onclick = function () {
            dropAreaEle.children[1].children[0].querySelector('button').click();
            return false;
        };
        clearEle.onclick = function () {
            if (!dropElement.querySelector('ul')) {
                return;
            }
            (0, ej2_base_1.detach)(dropElement.querySelector('ul'));
            filesList = [];
            filesDetails = [];
            filesName = [];
            if (dropArea.classList.contains('e-spinner-pane')) {
                (0, ej2_react_popups_1.hideSpinner)(dropArea);
                (0, ej2_base_1.detach)(dropElement.querySelector('.e-spinner-pane'));
            }
        };
        buttonEle.onclick = function () {
            if (dropElement.querySelector('ul') && filesDetails.length > 0) {
                uploadObj.current.upload(filesDetails, true);
            }
        };
        uploadObj.current.dropArea = dropElement;
        uploadObj.current.dataBind();
    };
    var onSelect = function (args) {
        if (!dropElement.querySelector('li')) {
            filesDetails = [];
        }
        if ((0, ej2_base_1.isNullOrUndefined)(dropArea.querySelector('.e-upload-files'))) {
            parentElement = (0, ej2_base_1.createElement)('ul', { className: 'e-upload-files' });
            dropAreaEle.children[1].appendChild(parentElement);
        }
        var validFiles = validateFiles(args, filesDetails);
        if (validFiles.length === 0) {
            args.cancel = true;
            return;
        }
        for (var i = 0; i < validFiles.length; i++) {
            formSelectedData(validFiles[i], _this);
        }
        filesDetails = filesDetails.concat(validFiles);
        args.cancel = true;
    };
    var validateFiles = function (args, viewedFiles) {
        var modifiedFiles = [];
        var validFiles = [];
        var isModified = false;
        if (args.event.type === 'drop') {
            isModified = true;
            var allImages = ['png', 'jpg', 'jpeg'];
            var files_4 = args.filesData;
            for (var _i = 0, files_1 = files_4; _i < files_1.length; _i++) {
                var file = files_1[_i];
                if (allImages.indexOf(file.type) !== -1) {
                    modifiedFiles.push(file);
                }
            }
        }
        var files = modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
        if (filesName.length > 0) {
            for (var _a = 0, files_2 = files; _a < files_2.length; _a++) {
                var file = files_2[_a];
                if (filesName.indexOf(file.name) === -1) {
                    filesName.push(file.name);
                    validFiles.push(file);
                }
            }
        }
        else {
            for (var _b = 0, files_3 = files; _b < files_3.length; _b++) {
                var file = files_3[_b];
                filesName.push(file.name);
                validFiles.push(file);
            }
        }
        return validFiles;
    };
    var formSelectedData = function (file, proxy) {
        var liEle = (0, ej2_base_1.createElement)('li', { className: 'e-upload-file-list', attrs: { 'data-file-name': file.name } });
        var imageTag = (0, ej2_base_1.createElement)('IMG', { className: 'upload-image', attrs: { 'alt': 'Image' } });
        var wrapper = (0, ej2_base_1.createElement)('span', { className: 'wrapper' });
        wrapper.appendChild(imageTag);
        liEle.appendChild(wrapper);
        liEle.appendChild((0, ej2_base_1.createElement)('div', { className: 'file-name', innerHTML: file.name, attrs: { 'title': file.name } }));
        liEle.appendChild((0, ej2_base_1.createElement)('div', { className: 'file-size', innerHTML: uploadObj.current.bytesToSize(file.size) }));
        var clearbtn;
        var uploadbtn;
        clearbtn = (0, ej2_base_1.createElement)('span', { id: 'removeIcon', className: 'e-icons e-file-remove-btn', attrs: { 'title': 'Remove' } });
        ej2_base_1.EventHandler.add(clearbtn, 'click', removeFiles, proxy);
        liEle.setAttribute('title', 'Ready to Upload');
        uploadbtn = (0, ej2_base_1.createElement)('span', { className: 'e-upload-icon e-icons e-file-remove-btn', attrs: { 'title': 'Upload' } });
        uploadbtn.setAttribute('id', 'iconUpload');
        ej2_base_1.EventHandler.add(uploadbtn, 'click', uploadFile, proxy);
        var progressbarContainer;
        progressbarContainer = (0, ej2_base_1.createElement)('progress', { className: 'progressbar', id: 'progressBar', attrs: { value: '0', max: '100' } });
        liEle.appendChild(clearbtn);
        liEle.appendChild(uploadbtn);
        liEle.appendChild(progressbarContainer);
        readURL(liEle, file);
        dropAreaEle.children[1].children[1].appendChild(liEle);
        filesList.push(liEle);
    };
    var uploadFile = function (args) {
        uploadObj.current.upload([filesDetails[filesList.indexOf(args.currentTarget.parentElement)]], true);
    };
    var removeFiles = function (args) {
        var removeFile = filesDetails[filesList.indexOf(args.currentTarget.parentElement)];
        var statusCode = removeFile.statusCode;
        if (statusCode === '2' || statusCode === '1') {
            uploadObj.current.remove(removeFile, true);
            uploadObj.current.element.value = '';
        }
        var index = filesList.indexOf(args.currentTarget.parentElement);
        filesList.splice(index, 1);
        filesDetails.splice(index, 1);
        filesName.splice(filesName.indexOf(removeFile.name), 1);
        if (statusCode !== '2') {
            (0, ej2_base_1.detach)(args.currentTarget.parentElement);
        }
    };
    var onFileUpload = function (args) {
        var li = dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        var iconEle = li.querySelector('#iconUpload');
        iconEle.style.cursor = 'not-allowed';
        iconEle.classList.add('e-uploaded');
        ej2_base_1.EventHandler.remove(li.querySelector('#iconUpload'), 'click', uploadFile);
        var progressValue = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue) && li.querySelector('.progressbar')) {
            li.getElementsByTagName('progress')[0].value = progressValue;
        }
    };
    var onUploadSuccess = function (args) {
        var spinnerElement = dropAreaEle;
        var li = dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        if (li && !(0, ej2_base_1.isNullOrUndefined)(li.querySelector('.progressbar'))) {
            li.querySelector('.progressbar').style.visibility = 'hidden';
        }
        if (args.operation === 'upload') {
            ej2_base_1.EventHandler.remove(li.querySelector('#iconUpload'), 'click', uploadFile);
            li.querySelector('.file-name').style.color = 'green';
            li.querySelector('.e-icons').onclick = function () {
                generateSpinner(dropArea);
            };
        }
        else {
            (0, ej2_base_1.detach)(li);
            (0, ej2_react_popups_1.hideSpinner)(spinnerElement);
            (0, ej2_base_1.detach)(spinnerElement.querySelector('.e-spinner-pane'));
        }
        if (!(0, ej2_base_1.isNullOrUndefined)(li)) {
            li.setAttribute('title', args.e.currentTarget.statusText);
        }
    };
    var generateSpinner = function (targetElement) {
        (0, ej2_react_popups_1.createSpinner)({ target: targetElement, width: '25px' });
        (0, ej2_react_popups_1.showSpinner)(targetElement);
    };
    var onUploadFailed = function (args) {
        var li = dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
        li.querySelector('.file-name').style.color = 'red';
        li.setAttribute('title', args.e.currentTarget.statusText);
        if (args.operation === 'upload') {
            ej2_base_1.EventHandler.remove(li.querySelector('#iconUpload'), 'click', uploadFile);
            li.querySelector('.progressbar').style.visibility = 'hidden';
        }
    };
    var readURL = function (li, args) {
        var preview = li.querySelector('.upload-image');
        var file = args.rawFile;
        var reader = new FileReader();
        reader.addEventListener('load', function () { preview.src = reader.result; }, false);
        if (file) {
            reader.readAsDataURL(file);
        }
    };
    var onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    return (React.createElement("div", { className: 'control-pane', ref: dropContainerRef },
        React.createElement("div", { className: 'control-section', id: 'uploadpreview' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement("div", { className: 'imagepreview' },
                    React.createElement("div", { id: 'dropArea', ref: dropAreaRef, className: 'dropTarget' },
                        React.createElement("span", { id: 'dropimage', ref: dropImageRef, className: 'file-name-drop' },
                            " Drop image (JPG, PNG) files here or ",
                            React.createElement("a", { href: "", id: 'browse' },
                                React.createElement("u", null, "Browse")),
                            " "),
                        React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'previewfileupload', type: 'file', ref: uploadObj, asyncSettings: asyncSettings, success: onUploadSuccess.bind(_this), selected: onSelect.bind(_this), removing: onRemoveFile.bind(_this), progress: onFileUpload.bind(_this), failure: onUploadFailed.bind(_this), allowedExtensions: allowedExtensions })))),
            React.createElement("div", { className: 'property-section uploader-panel col-lg-3' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("div", { className: 'panel-style' },
                        React.createElement("button", { className: "e-btn e-css", id: "clearbtn", ref: clearRef, title: "Clear All" }, "Clear All")),
                    React.createElement("div", { className: 'panel-style' },
                        React.createElement("button", { className: "e-btn e-css", id: "uploadbtn", ref: buttonRef, title: "Upload All" }, "Upload All"))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-file-upload", target: "_blank" }, "\u00A0React File Upload"),
                " example demonstrates how to add an image preview of the uploaded files. Browse or drag-and-drop image files (PNG, JPG) to display preview for the selected files.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Uploader component allows to create preview images after uploaded it. The preview images created by reading the file using success event.  Also, the user can create preview images before uploading to server using select event."))));
};
exports.default = Preview;
