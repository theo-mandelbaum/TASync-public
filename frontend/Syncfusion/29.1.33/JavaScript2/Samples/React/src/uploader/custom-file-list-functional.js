"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_popups_1 = require("@syncfusion/ej2-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./custom-file-list.css");
var react_1 = require("react");
var CustomTemplate = function () {
    // Uploader component
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        renderComplete();
    }, []);
    var uploadObj = (0, react_1.useRef)(null);
    var parentElement;
    var progressbarContainer;
    var filesDetails = [];
    var filesList = [];
    var dropElement;
    var asyncSettings;
    var dropRef;
    var dropContainerRef;
    var dropContainerEle;
    var buttonRef;
    var dropAreaEle;
    var btnRef;
    dropAreaEle = null;
    dropContainerEle = null;
    dropRef = function (element) {
        dropAreaEle = element;
    };
    buttonRef = function (element) {
        btnRef = element;
    };
    dropContainerRef = function (element) {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
        removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
    };
    var onSuccess = function (args) {
        var spinnerElement = dropAreaEle;
        var li = dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        if (args.operation === 'upload') {
            li.querySelector('.close-icon-container').classList.add('delete-icon');
            (0, ej2_base_1.detach)(li.getElementsByTagName('progress')[0]);
            li.querySelector('.file-size').style.display = 'inline-block';
            li.querySelector('.file-name').style.color = 'green';
            li.querySelector('.e-icons').onclick = function () {
                (0, ej2_popups_1.createSpinner)({ target: spinnerElement, width: '25px' });
                (0, ej2_popups_1.showSpinner)(spinnerElement);
            };
            li.querySelector('.close-icon-container').onkeydown = function (e) {
                if (e.keyCode === 13) {
                    (0, ej2_popups_1.createSpinner)({ target: spinnerElement, width: '25px' });
                    (0, ej2_popups_1.showSpinner)(spinnerElement);
                }
            };
        }
        else {
            filesDetails.splice(filesList.indexOf(li), 1);
            filesList.splice(filesList.indexOf(li), 1);
            uploadObj.current.element.value = '';
            (0, ej2_base_1.detach)(li);
            (0, ej2_popups_1.hideSpinner)(spinnerElement);
            (0, ej2_base_1.detach)(spinnerElement.querySelector('.e-spinner-pane'));
        }
        ej2_base_1.EventHandler.add(li.querySelector('.close-icon-container'), 'click', removeFiles, _this);
    };
    var onFileSelect = function (args) {
        if (dropAreaEle.lastChild.className !== 'upload-list-root') {
            parentElement = (0, ej2_base_1.createElement)('div', { className: 'upload-list-root' });
            parentElement.appendChild((0, ej2_base_1.createElement)('ul', { className: 'ul-element' }));
            dropAreaEle.appendChild(parentElement);
        }
        for (var i = 0; i < args.filesData.length; i++) {
            formSelectedData(args.filesData[i], _this); // create the LI element for each file Data
        }
        filesDetails = filesDetails.concat(args.filesData);
        uploadObj.current.upload(args.filesData, true);
        args.cancel = true;
    };
    var formSelectedData = function (selectedFiles, proxy) {
        var liEle = (0, ej2_base_1.createElement)('li', { className: 'file-lists', attrs: { 'data-file-name': selectedFiles.name } });
        liEle.appendChild((0, ej2_base_1.createElement)('span', { className: 'file-name ', innerHTML: selectedFiles.name }));
        liEle.appendChild((0, ej2_base_1.createElement)('span', { className: 'file-size ', innerHTML: uploadObj.current.bytesToSize(selectedFiles.size) }));
        if (selectedFiles.statusCode === '1') {
            progressbarContainer = (0, ej2_base_1.createElement)('span', { className: 'progress-bar-container' });
            progressbarContainer.appendChild((0, ej2_base_1.createElement)('progress', { className: 'progress', attrs: { value: '0', max: '100' } }));
            liEle.appendChild(progressbarContainer);
        }
        else {
            liEle.querySelector('.file-name').classList.add('upload-fails');
        }
        var closeIconContainer = (0, ej2_base_1.createElement)('span', { className: 'e-icons close-icon-container' });
        ej2_base_1.EventHandler.add(closeIconContainer, 'click', removeFiles, proxy);
        liEle.appendChild(closeIconContainer);
        dropAreaEle.querySelector(".ul-element").appendChild(liEle);
        filesList.push(liEle);
    };
    var onFileUpload = function (args) {
        var li = dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        ej2_base_1.EventHandler.remove(li.querySelector('.close-icon-container'), 'click', removeFiles);
        var progressValue = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue)) {
            li.getElementsByTagName('progress')[0].value = progressValue; // Updating the progress bar value
        }
    };
    var onUploadFailed = function (args) {
        var li = dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        ej2_base_1.EventHandler.add(li.querySelector('.close-icon-container'), 'click', removeFiles, _this);
        li.querySelector('.file-name ').classList.add('upload-fails');
        if (args.operation === 'upload') {
            (0, ej2_base_1.detach)(li.querySelector('.progress-bar-container'));
        }
    };
    var removeFiles = function (args) {
        var status = filesDetails[filesList.indexOf(args.currentTarget.parentElement)].statusCode;
        if (status === '2') {
            uploadObj.current.remove(filesDetails[filesList.indexOf(args.currentTarget.parentElement)]);
        }
        else {
            (0, ej2_base_1.detach)(args.currentTarget.parentElement);
        }
    };
    var onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    var renderComplete = function () {
        dropAreaEle.children[0].children[0].onclick = function () {
            dropAreaEle.children[1].children[0].querySelector('button').click();
            return false;
        };
        dropElement = dropContainerEle;
        btnRef.onclick = function () {
            if (!dropAreaEle.lastChild) {
                return;
            }
            (0, ej2_base_1.detach)(dropAreaEle.lastChild);
            filesList = [];
            filesDetails = [];
        };
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
        uploadObj.current.dropArea = dropElement;
        uploadObj.current.dataBind();
        if (ej2_base_1.Browser.isDevice) {
            uploadObj.current.dropArea.querySelector('drop').style.padding = '4% 13%';
        }
    };
    return (React.createElement("div", { className: 'control-pane', ref: dropContainerRef },
        React.createElement("div", { className: 'control-section uploadpreview' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement("div", { className: 'template_wrapper' },
                    React.createElement("div", { id: 'dropArea', className: 'dropArea', ref: dropRef },
                        React.createElement("span", { id: 'drop', className: 'file-name-span drop' },
                            " Drop files here or ",
                            React.createElement("a", { href: "", id: 'browse' },
                                React.createElement("u", null, "Browse")),
                            " "),
                        React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', ref: uploadObj, asyncSettings: asyncSettings, success: onSuccess.bind(_this), removing: onRemoveFile.bind(_this), selected: onFileSelect.bind(_this), progress: onFileUpload.bind(_this), failure: onUploadFailed.bind(_this), dropArea: dropElement })))),
            React.createElement("div", { className: 'property-section template-panel col-lg-3' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("div", { className: 'custom-panel' },
                        React.createElement("button", { className: "e-btn e-css", ref: buttonRef, id: "clearbtn", title: "Clear All" }, "Clear All"))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-file-upload", target: "_blank" }, "\u00A0React File Upload"),
                " example demonstrates how to customize the file list with template. Browse or select the files to view the file list template.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Uploader component allows to customize its file list using template property. The template used for each file in file list."),
            React.createElement("p", null,
                "For more information, you can refer to the Template section from this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/template/#custom-template" }, "documentation section"),
                "."))));
};
exports.default = CustomTemplate;
