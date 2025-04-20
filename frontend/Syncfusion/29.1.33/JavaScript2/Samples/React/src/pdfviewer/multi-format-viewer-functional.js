"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_2 = require("@syncfusion/ej2-react-buttons");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
function MultiFormatViewer() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var viewer;
    var allowedExtensions;
    var parentElement;
    var dropAreaRef = React.useRef(null);
    var filesData;
    var uploadObj = React.useRef(null);
    var linear = React.useRef(null);
    var _a = React.useState({ color: "" }), style = _a[0], setStyle = _a[1];
    var pdfViewerProgressValue = 0;
    var uploadProgressValue = 0;
    var rendereComplete = function () {
        uploadObj.current.dropArea = dropAreaRef.current;
        document.getElementById('browse').onclick = function () {
            document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
            return false;
        };
    };
    allowedExtensions = '.doc, .docx, .rtf, .docm, .dotm, .dotx, .dot, .xls, .xlsx, .pptx, .pptm, .potx, .potm .jpeg, .png, .bmp, .pdf, .jpg';
    var onSelect = function (args) {
        linear.current.value == 0;
        linear.current.refresh();
        var extensions = ['doc', 'docx', 'rtf', 'docm', 'dotm', 'dotx', 'dot', 'xls', 'xlsx', 'pptx', 'pptm', 'potx', 'potm', 'jpeg', 'png', 'bmp', 'pdf', 'jpg'];
        var progressBarContainer = document.getElementById("progressBar");
        var progressBar = document.getElementById("linearProgressBar");
        var progressMessage = document.getElementById("uploadedMessage");
        document.getElementById("fileDetails").style.display = "block";
        document.getElementById("FailedMessage").style.display = "none";
        var fileSizeValidation = document.getElementById("fileSizeValidation");
        progressBarContainer.style.display = "block";
        progressBar.style.display = "flex";
        progressMessage.style.display = "none";
        fileSizeValidation.style.display = "none";
        if (!uploadObj.current.element.querySelector('li')) {
            filesData = [];
        }
        if ((0, ej2_base_1.isNullOrUndefined)(uploadObj.current.element.querySelector('.e-upload-files'))) {
            parentElement = (0, ej2_base_1.createElement)('ul', {
                className: 'e-upload-files',
            });
            document.getElementsByClassName('e-upload')[0].appendChild(parentElement);
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
        viewer = document.getElementById('pdfviewer').ej2_instances[0];
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
        formSelectedData(validFiles[0], uploadObj.current);
        filesData = filesData.concat(validFiles);
        var totalProgress = calculateTotalProgress();
        updateProgressBar(totalProgress);
        document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
    };
    var formSelectedData = function (file, proxy) {
        var liEle = (0, ej2_base_1.createElement)('li', {
            className: 'e-upload-file-list',
            attrs: {
                'data-file-name': file.name
            },
        });
        readURL(liEle, file);
        proxy.fileList.push(liEle);
    };
    var readURL = function (li, args) {
        var file = args.rawFile;
        var reader = new FileReader();
        var type = args.type;
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
                    uploadProgressValue = progressValue;
                    var totalProgress = calculateTotalProgress();
                    updateProgressBar(totalProgress);
                    document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
                }
            });
            xhr.onreadystatechange = function (event) {
                if (xhr.responseText != "" && xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        viewer = document.getElementById('pdfviewer').ej2_instances[0];
                        viewer.documentPath = xhr.responseText;
                        pdfViewerProgressValue = 20;
                        var totalProgress = calculateTotalProgress();
                        updateProgressBar(totalProgress);
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
    var documentLoad = function (args) {
        pdfViewerProgressValue = 100;
        var totalProgress = calculateTotalProgress();
        updateProgressBar(totalProgress);
        document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
        setTimeout(function () {
            document.getElementById("linearProgressBar").style.display = "none";
            document.getElementById("uploadedMessage").style.display = "block";
            uploadProgressValue = 0;
            pdfViewerProgressValue = 0;
            linear.current.value = 0;
        }, 1000);
    };
    var calculateTotalProgress = function () {
        var totalProgress = (uploadProgressValue + pdfViewerProgressValue) / 2;
        return totalProgress;
    };
    var updateProgressBar = function (progress) {
        if (linear) {
            linear.current.value = progress;
        }
    };
    var progressLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.progressBar.theme = (selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/contrast/i, 'Contrast');
        if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
            || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark') {
            setStyle({ color: "White" });
        }
    };
    var ajaxRequestSuccess = function (args) {
        if (args.action === "Load") {
            pdfViewerProgressValue = 50;
            var totalProgress = calculateTotalProgress();
            updateProgressBar(totalProgress);
            document.getElementById("progress-status").innerHTML = totalProgress.toString() + "%";
        }
    };
    function change(args) {
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }
    return (React.createElement("div", null,
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'content-wrapper-pdfviewer', ref: dropAreaRef, style: { 'textAlign': 'center', 'marginBottom': '15px' } },
                React.createElement("div", { style: { 'height': 'auto', 'overflow': 'auto', marginBottom: '15px' } },
                    React.createElement(ej2_react_buttons_2.ButtonComponent, { id: 'browse' }, "Browse..."),
                    React.createElement("div", null,
                        React.createElement("p", { style: { 'margin': '10px' } }, "OR"),
                        React.createElement("span", { id: "drop" }, "Drop files (Word, Excel, PowerPoint, Image, PDF)"))),
                React.createElement("div", { id: "progressBar", style: { display: 'none' } },
                    React.createElement("div", { id: 'fileDetails' },
                        React.createElement("p", { id: "fileName" }),
                        React.createElement("p", { id: "fileSize" })),
                    React.createElement("div", { id: 'linearProgressBar', style: { justifyContent: 'center', display: 'none' } },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linear-pdfviewer", ref: linear, type: 'Linear', width: '250', height: '60', animation: { enable: false, duration: 2000, delay: 0 }, value: 0, load: progressLoad.bind(this) }),
                        React.createElement("span", { id: 'progress-status', style: { padding: '18px 5px' } })),
                    React.createElement("div", { id: "uploadedMessage", style: { display: 'none', marginTop: '10px' } },
                        React.createElement("p", { style: { color: 'rgb(110, 218, 110)' } }, "File successfully uploaded...")),
                    React.createElement("div", { id: "FailedMessage", style: { display: 'none', marginTop: '10px' } },
                        React.createElement("p", { style: { color: 'red' } }, "File not Supported!")),
                    React.createElement("div", { id: "fileSizeValidation", style: { display: 'none', marginTop: '10px' } },
                        React.createElement("p", { style: { color: 'rgb(203, 38, 38)' } }, "Maximum file size is (4.0 MB) for this operation..."))),
                React.createElement("div", { id: "uploader-pdfviewer" },
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', ref: uploadObj, multiple: false, selected: onSelect, allowedExtensions: allowedExtensions }))),
            React.createElement("div", { id: 'pdfviewer_container', style: { display: 'none' } },
                React.createElement("div", { className: "flex-container" },
                    React.createElement("label", { htmlFor: "checked", className: "switchLabel" }, " Standalone PDF Viewer "),
                    React.createElement("div", { className: "e-message render-mode-info" },
                        React.createElement("span", { className: "e-msg-icon render-mode-info-icon", title: "Turn OFF to render the PDF Viewer as server-backed" })),
                    React.createElement(ej2_react_buttons_1.SwitchComponent, { cssClass: "buttonSwitch", id: "checked", change: change, checked: true })),
                React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "pdfviewer", className: "e-pv-multi-format-pdfviewer", resourceUrl: "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib", toolbarSettings: {
                        showTooltip: true, toolbarItems: [
                            "DownloadOption",
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
                            "PrintOption"
                        ]
                    }, documentLoad: documentLoad, ajaxRequestSuccess: ajaxRequestSuccess, zoomMode: "FitToPage", style: { 'height': '640px' } },
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
}
exports.default = MultiFormatViewer;
