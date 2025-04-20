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
exports.MultiFormatViewer = void 0;
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_2 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var MultiFormatViewer = /** @class */ (function (_super) {
    __extends(MultiFormatViewer, _super);
    function MultiFormatViewer(props) {
        var _this = _super.call(this, props) || this;
        _this.dropElement = null;
        _this.filesName = [];
        _this.pdfViewerProgressValue = 0;
        _this.uploadProgressValue = 0;
        _this.rendereComplete = function () {
            _this.uploadObj.current.dropArea = _this.dropAreaRef.current;
            document.getElementById('browse').onclick = function () {
                document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
                return false;
            };
        };
        _this.onSelect = function (args) {
            _this.linear.current.value == 0;
            _this.linear.current.refresh();
            var extensions = ['doc', 'docx', 'rtf', 'docm', 'dotm', 'dotx', 'dot', 'xls', 'xlsx', 'pptx', 'pptm', 'potx', 'potm', 'jpeg', 'png', 'bmp', 'pdf', 'jpg'];
            var progressBarContainer = document.getElementById("progressBar");
            var progressBar = document.getElementById("linearProgressBar");
            var progressMessage = document.getElementById("uploadedMessage");
            var fileSizeValidation = document.getElementById("fileSizeValidation");
            document.getElementById("fileDetails").style.display = "block";
            document.getElementById("FailedMessage").style.display = "none";
            progressBarContainer.style.display = "block";
            progressBar.style.display = "flex";
            progressMessage.style.display = "none";
            fileSizeValidation.style.display = "none";
            if (!_this.uploadObj.current.element.querySelector('li')) {
                _this.filesData = [];
            }
            if ((0, ej2_base_1.isNullOrUndefined)(_this.uploadObj.current.element.querySelector('.e-upload-files'))) {
                _this.parentElement = (0, ej2_base_1.createElement)('ul', {
                    className: 'e-upload-files',
                });
                document.getElementsByClassName('e-upload')[0].appendChild(_this.parentElement);
            }
            var validFiles = args.filesData;
            if (validFiles.length === 0) {
                progressBarContainer.style.display = "block";
                progressBar.style.display = "none";
                progressMessage.style.display = "block";
                args.cancel = true;
                return;
            }
            if (!extensions.includes(validFiles[0].type)) {
                document.getElementById("FailedMessage").style.display = "block";
                document.getElementById("fileDetails").style.display = "none";
                progressBar.style.display = "none";
                progressMessage.style.display = "none";
                document.getElementById('pdfviewer_container').style.display = 'none';
                args.cancel = true;
                return;
            }
            if (validFiles[0].type != "pdf" && validFiles[0].size > 4000000) {
                fileSizeValidation.style.display = "block";
                progressBar.style.display = "none";
                document.getElementById("fileDetails").style.display = "none";
                document.getElementById('pdfviewer_container').style.display = 'none';
                args.cancel = true;
                return;
            }
            document.getElementById("fileName").innerHTML = args.filesData[0].name;
            var viewer = document.getElementById('pdfviewer').ej2_instances[0];
            viewer.downloadFileName = args.filesData[0].name;
            viewer.exportAnnotationFileName = args.filesData[0].name;
            var size = document.getElementById("fileSize");
            if ((args.filesData[0].size.toString()).length <= 7) {
                size.innerHTML = ((args.filesData[0].size / 1024).toFixed(1)).toString() + " KB";
            }
            else {
                var kbsize = args.filesData[0].size / 1024;
                size.innerHTML = ((kbsize / 1024).toFixed(1)).toString() + " MB";
            }
            document.getElementById("fileSize");
            _this.formSelectedData(validFiles[0], _this.uploadObj.current);
            _this.filesData = _this.filesData.concat(validFiles);
            var totalProgress = _this.calculateTotalProgress();
            _this.updateProgressBar(totalProgress);
            document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
        };
        _this.formSelectedData = function (file, proxy) {
            var liEle = (0, ej2_base_1.createElement)('li', {
                className: 'e-upload-file-list',
                attrs: {
                    'data-file-name': file.name
                },
            });
            _this.readURL(liEle, file);
            proxy.fileList.push(liEle);
        };
        _this.readURL = function (li, args) {
            var file = args.rawFile;
            var reader = new FileReader();
            var type = args.type;
            var context = _this;
            reader.addEventListener('load', function () {
                var post = JSON.stringify({
                    'data': reader.result,
                    'type': type
                });
                var url = "https://ej2services.syncfusion.com/production/web-services/api/pdfviewer/LoadFile";
                var xhr = new XMLHttpRequest();
                xhr.open('Post', url, true);
                xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                xhr.upload.addEventListener('progress', function (event) {
                    if (event.lengthComputable) {
                        var progressValue = Math.round((event.loaded / event.total) * 100);
                        context.uploadProgressValue = progressValue;
                        var totalProgress = context.calculateTotalProgress();
                        context.updateProgressBar(totalProgress);
                        document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
                    }
                });
                xhr.onreadystatechange = function (event) {
                    if (xhr.responseText != "" && xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            var viewer = document.getElementById('pdfviewer').ej2_instances[0];
                            viewer.documentPath = xhr.responseText;
                            this.pdfViewerProgressValue = 20;
                            var totalProgress = context.calculateTotalProgress();
                            context.updateProgressBar(totalProgress);
                            document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
                            document.getElementById('pdfviewer_container').style.display = 'block';
                        }
                        else {
                            console.error('Error:', xhr.statusText);
                        }
                    }
                }.bind(this);
                xhr.send(post);
            }, false);
            if (file) {
                reader.readAsDataURL(file);
            }
        };
        _this.documentLoad = function (args) {
            _this.pdfViewerProgressValue = 100;
            var totalProgress = _this.calculateTotalProgress();
            _this.updateProgressBar(totalProgress);
            document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
            setTimeout(function () {
                document.getElementById("linearProgressBar").style.display = "none";
                document.getElementById("uploadedMessage").style.display = "block";
                _this.uploadProgressValue = 0;
                _this.pdfViewerProgressValue = 0;
                _this.linear.current.value = 0;
            }, 1000);
        };
        _this.ajaxRequestSuccess = function (args) {
            if (args.action === "Load") {
                _this.pdfViewerProgressValue = 50;
                var totalProgress = _this.calculateTotalProgress();
                _this.updateProgressBar(totalProgress);
                document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
            }
        };
        _this.calculateTotalProgress = function () {
            var totalProgress = (_this.uploadProgressValue + _this.pdfViewerProgressValue) / 2;
            return totalProgress;
        };
        _this.updateProgressBar = function (progress) {
            if (_this.linear) {
                _this.linear.current.value = progress;
            }
        };
        _this.progressLoad = function (args) {
            var div = document.getElementsByClassName('progressbar-label');
            var selectedTheme = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
            if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
                || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark') {
                for (var i = 0; i < div.length; i++) {
                    div[i].setAttribute('style', 'color:white');
                }
            }
        };
        _this.change = function (args) {
            if (args.checked) {
                _this.viewer.serviceUrl = '';
            }
            else {
                _this.viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
            }
            _this.viewer.dataBind();
            _this.viewer.load(_this.viewer.documentPath, null);
        };
        _this.dropAreaRef = React.createRef();
        _this.uploadObj = React.createRef();
        _this.linear = React.createRef();
        _this.allowedExtensions = '.doc, .docx, .rtf, .docm, .dotm, .dotx, .dot, .xls, .xlsx, .pptx, .pptm, .potx, .potm .jpeg, .png, .bmp, .pdf, .jpg';
        return _this;
    }
    MultiFormatViewer.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: 'content-wrapper-pdfviewer', ref: function (scope) { _this.dropAreaRef.current = scope; }, style: { 'textAlign': 'center', 'marginBottom': '15px' } },
                    React.createElement("div", { style: { 'height': 'auto', 'overflow': 'auto' } },
                        React.createElement(ej2_react_buttons_2.ButtonComponent, { id: 'browse' }, "Browse..."),
                        React.createElement("div", null,
                            React.createElement("p", { style: { 'margin': '10px' } }, "OR"),
                            React.createElement("span", { id: "drop" }, "Drop files (Word, Excel, PowerPoint, Image, PDF)"))),
                    React.createElement("div", { id: "progressBar", style: { display: 'none' } },
                        React.createElement("div", { id: 'fileDetails' },
                            React.createElement("p", { id: "fileName" }),
                            React.createElement("p", { id: "fileSize" })),
                        React.createElement("div", { id: 'linearProgressBar', style: { justifyContent: 'center', display: 'none' } },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linear-pdfviewer", ref: function (scope) { _this.linear.current = scope; }, type: 'Linear', width: '250', height: '60', animation: { enable: false, duration: 2000, delay: 0 }, value: 0, load: this.progressLoad.bind(this) }),
                            React.createElement("span", { id: 'progress-status', style: { padding: '18px 5px' } })),
                        React.createElement("div", { id: "uploadedMessage", style: { display: 'none', marginTop: '10px' } },
                            React.createElement("p", { style: { color: 'rgb(110, 218, 110)' } }, "File successfully uploaded...")),
                        React.createElement("div", { id: "FailedMessage", style: { display: 'none', marginTop: '10px' } },
                            React.createElement("p", { style: { color: 'red' } }, "File not Supported!")),
                        React.createElement("div", { id: "fileSizeValidation", style: { display: 'none', marginTop: '10px' } },
                            React.createElement("p", { style: { color: 'rgb(203, 38, 38)' } }, "Maximum file size is (4.0 MB) for this operation..."))),
                    React.createElement("div", { id: "uploader-pdfviewer" },
                        React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', ref: function (scope) { _this.uploadObj.current = scope; }, selected: this.onSelect.bind(this), allowedExtensions: this.allowedExtensions }))),
                React.createElement("div", { id: 'pdfviewer_container', style: { display: 'none' } },
                    React.createElement("div", { className: "flex-container" },
                        React.createElement("label", { htmlFor: "checked", className: "switchLabel" }, " Standalone PDF Viewer "),
                        React.createElement("div", { className: "e-message render-mode-info" },
                            React.createElement("span", { className: "e-msg-icon render-mode-info-icon", title: "Turn OFF to render the PDF Viewer as server-backed" })),
                        React.createElement(ej2_react_buttons_1.SwitchComponent, { cssClass: "buttonSwitch", id: "checked", change: this.change, checked: true })),
                    React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "pdfviewer", className: "e-pv-multi-format-pdfviewer", toolbarSettings: {
                            showTooltip: true, toolbarItems: ["DownloadOption",
                                "UndoRedoTool",
                                "PageNavigationTool",
                                "MagnificationTool",
                                "PanTool",
                                "SelectionTool",
                                "CommentTool",
                                "SubmitForm",
                                "SearchOption",
                                "AnnotationEditTool",
                                "FormDesignerEditTool",
                                "PrintOption"]
                        }, resourceUrl: "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib", style: { 'height': '640px' }, documentLoad: this.documentLoad, zoomMode: "FitToPage", ajaxRequestSuccess: this.ajaxRequestSuccess },
                        React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows how it loads various file types like PDFs, images, and Microsoft Office documents (Word, Excel, PowerPoint) into the PDF Viewer.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample provides a hands-on demonstration of the PDF Viewer's ability to load and display a diverse range of file formats, including PDFs, images, and Microsoft Office documents such as Word, Excel, and PowerPoint files. Users can interact with the sample in the following ways:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Use the Browse button to select any file of interest."),
                    React.createElement("li", null, "Alternatively, drag and drop a chosen file into the designated file pick area."),
                    React.createElement("li", null, "Once a valid file is selected, it will be seamlessly loaded into the PDF Viewer located below, allowing users to easily view and interact with the content."),
                    React.createElement("li", null, "Support for various file formats, including:"),
                    React.createElement("ul", null,
                        React.createElement("li", null, "PDF - '.pdf'"),
                        React.createElement("li", null, "Excel - '.xlsx','.xls'"),
                        React.createElement("li", null, "Image - '.jpeg','.jpg','.png','.bmp'"),
                        React.createElement("li", null, "PowerPoint - '.pptx','.pptm','.potx','.potm'"),
                        React.createElement("li", null, "Word - '.doc','.docx','dot','dotx','docm','dotm','rtf'"))),
                React.createElement("p", null, "Note : The PDF conversions are performed using the appropriate libraries, while the role of the PDF Viewer is solely to display the converted PDF document."),
                React.createElement("p", null,
                    "More information on the PDF Viewer instantiation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                    "."))));
    };
    return MultiFormatViewer;
}(sample_base_1.SampleBase));
exports.MultiFormatViewer = MultiFormatViewer;
