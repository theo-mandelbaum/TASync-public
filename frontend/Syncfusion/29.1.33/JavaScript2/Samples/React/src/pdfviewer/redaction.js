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
exports.Redaction = void 0;
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var viewer;
var Redaction = /** @class */ (function (_super) {
    __extends(Redaction, _super);
    function Redaction(props) {
        var _this_1 = _super.call(this, props) || this;
        _this_1.currentPageNumber = '1';
        _this_1.fileName = 'programmatical-annotations.pdf';
        _this_1.redactionCount = 0;
        _this_1.asyncSettings = {
            saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
            removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
        };
        _this_1.dropAreaRef = document.getElementsByClassName('drop-area-wrap')[0];
        _this_1.allowedExtensions = '.png, .jpg, .jpeg';
        _this_1.url = "https://ej2services.syncfusion.com/production/web-services/api/pdfviewer/Redaction";
        //To update page number when page has been changed
        _this_1.onPageChange = function () {
            _this_1.currentPageNumber = viewer.currentPageNumber.toString();
            document.getElementById('e-pv-redact-sb-currentPage').textContent = _this_1.viewer.currentPageNumber.toString() + ' ';
            _this_1.updatePageNavigation.bind(_this_1);
        };
        //Updating the total number of pages while loading
        _this_1.documentLoaded = function () {
            _this_1.viewer = document.getElementById('container').ej2_instances[0];
            var pageCount = document.getElementById('e-pv-redact-sb-totalPage');
            pageCount.textContent = '/ ' + viewer.pageCount;
            (document.getElementById('e-pv-redact-sb-currentPage')).textContent = _this_1.viewer.currentPageNumber.toString();
            _this_1.updatePageNavigation();
            _this_1.updateRedaction();
        };
        //To update page number when the previous and next button is clicked
        _this_1.updatePageNavigation = function () {
            if (_this_1.viewer.currentPageNumber === 1) {
                _this_1.toolbar.enableItems(document.getElementById('previousPage').parentElement, false);
                _this_1.toolbar.enableItems(document.getElementById('nextPage').parentElement, true);
            }
            else if (viewer.currentPageNumber === viewer.pageCount) {
                _this_1.toolbar.enableItems(document.getElementById('previousPage').parentElement, true);
                _this_1.toolbar.enableItems(document.getElementById('nextPage').parentElement, false);
            }
            else {
                _this_1.toolbar.enableItems(document.getElementById('previousPage').parentElement, true);
                _this_1.toolbar.enableItems(document.getElementById('nextPage').parentElement, true);
            }
        };
        //To update the redaction count
        _this_1.updateRedaction = function () {
            if (_this_1.redactionCount <= 0) {
                _this_1.toolbar.enableItems(document.getElementById('redacticon').parentElement, false);
            }
            else {
                _this_1.toolbar.enableItems(document.getElementById('redacticon').parentElement, true);
            }
        };
        //Updating the number of redaction while the annotation has been added
        _this_1.annotationAdd = function (e) {
            var pdfAnnotationList = new Array();
            pdfAnnotationList = _this_1.viewer.annotationCollection;
            var selectedAnnotationIndex = pdfAnnotationList.findIndex(function (item) { return item.annotationId == e.annotationId; });
            if (selectedAnnotationIndex != -1) {
                _this_1.annotation = pdfAnnotationList[selectedAnnotationIndex];
            }
            if (_this_1.annotation.author == "Redaction" || _this_1.annotation.customStampName == "Image" || _this_1.annotation.author == "Pattern" || _this_1.annotation.author == "Text") {
                _this_1.redactionCount = _this_1.redactionCount + 1;
                _this_1.updateRedaction();
            }
        };
        //Updating the number of redaction while the annotation has been removed
        _this_1.annotationRemove = function () {
            if (_this_1.annotation.author == "Redaction" || _this_1.annotation.customStampName == "Image" || _this_1.annotation.author == "Pattern" || _this_1.annotation.author == "Text") {
                _this_1.redactionCount = _this_1.redactionCount - 1;
                _this_1.updateRedaction();
            }
        };
        _this_1.downloadDocument = function (blobUrl) {
            var Url = URL || webkitURL;
            blobUrl = Url.createObjectURL(blobUrl);
            viewer.fileName = _this_1.fileName;
            var anchorElement = document.createElement('a');
            if (anchorElement.click) {
                anchorElement.href = blobUrl;
                anchorElement.target = '_parent';
                if ('download' in anchorElement) {
                    var downloadFileName = viewer.fileName || 'downloadedFile.pdf';
                    if (downloadFileName) {
                        if (downloadFileName.endsWith('.pdf')) {
                            anchorElement.download = downloadFileName;
                        }
                        else {
                            var splitPdf = downloadFileName.split('.pdf')[0] + '.pdf';
                            anchorElement.download = splitPdf;
                        }
                    }
                    else {
                        anchorElement.download = 'Default.pdf';
                    }
                }
                (document.body || document.documentElement).appendChild(anchorElement);
                anchorElement.click();
            }
            else {
                if (window.top === window &&
                    blobUrl.split('#')[0] === window.location.href.split('#')[0]) {
                    var padCharacter = blobUrl.indexOf('?') === -1 ? '?' : '&';
                    blobUrl = blobUrl.replace(/#|$/, padCharacter + '$&');
                }
                window.open(blobUrl, '_parent');
            }
        };
        //To download the redacted pdf
        _this_1.download = function () {
            var _this = _this_1;
            viewer.saveAsBlob().then(function (value) {
                var reader = new FileReader();
                reader.readAsDataURL(value);
                reader.onload = function (e) {
                    var _a;
                    var base64String = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', _this.url, true);
                    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                    var requestData = JSON.stringify({ base64String: base64String });
                    xhr.onload = function () {
                        if (xhr.status === 200) {
                            var blobUrl = _this.createBlobUrl(xhr.responseText.split('base64,')[1], 'application/pdf');
                            _this.downloadDocument(blobUrl);
                        }
                        else {
                            console.error('Download failed:', xhr.statusText);
                        }
                    };
                    xhr.onerror = function () {
                        console.error('An error occurred during the download:', xhr.statusText);
                    };
                    xhr.send(requestData);
                };
            }).catch(function (error) {
                console.error('Error saving Blob:', error);
            });
        };
        _this_1.createBlobUrl = function (base64String, contentType) {
            var sliceSize = 512;
            var byteCharacters = atob(base64String);
            var byteArrays = [];
            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[parseInt(i.toString(), 10)] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            var blob = new Blob(byteArrays, { type: contentType });
            return blob;
        };
        _this_1.uploadObj = React.createRef();
        return _this_1;
    }
    Redaction.prototype.componentDidMount = function () {
        viewer = document.getElementById('container').ej2_instances[0];
    };
    Redaction.prototype.render = function () {
        var _this_1 = this;
        var data = ['10%', '25%', '50%', '75%', '100%', '200%', '400%'];
        function template() {
            return (React.createElement("div", null,
                React.createElement("span", { id: "e-pv-redact-sb-currentPage", title: "Current Page" }, "1 "),
                React.createElement("span", { id: "e-pv-redact-sb-totalPage", title: "Total Page" }, "/ 1")));
        }
        var clickHandler = function (args) {
            switch (args.item.id) {
                case 'pdfviewer_open':
                    {
                        var fileUpload = document.getElementById('fileUpload');
                        fileUpload.click();
                        break;
                    }
                case 'text_annot':
                    {
                        this.viewer.rectangleSettings.fillColor = '#a3a2a0';
                        this.viewer.rectangleSettings.strokeColor = '#a3a2a0';
                        this.viewer.rectangleSettings.author = 'Text';
                        this.viewer.annotation.setAnnotationMode('Rectangle');
                        break;
                    }
                case 'image_annot':
                    {
                        this.dialogInstance.show();
                        break;
                    }
                case 'pattern_annot':
                    {
                        this.viewer.rectangleSettings.fillColor = '#dedfe0';
                        this.viewer.rectangleSettings.strokeColor = '#dedfe0';
                        this.viewer.rectangleSettings.author = 'Pattern';
                        this.viewer.annotation.setAnnotationMode('Rectangle');
                        break;
                    }
                case 'black_annot':
                    {
                        this.viewer.rectangleSettings.fillColor = '#000000';
                        this.viewer.rectangleSettings.strokeColor = '#000000';
                        this.viewer.rectangleSettings.author = 'Redaction';
                        this.viewer.annotation.setAnnotationMode('Rectangle');
                        break;
                    }
                case 'white_annot':
                    {
                        this.viewer.rectangleSettings.fillColor = '#ffffff';
                        this.viewer.rectangleSettings.strokeColor = '#ffffff';
                        this.viewer.rectangleSettings.author = 'Redaction';
                        this.viewer.annotation.setAnnotationMode('Rectangle');
                        break;
                    }
                case 'previousPage':
                    {
                        viewer.navigation.goToPreviousPage();
                        break;
                    }
                case 'nextPage':
                    {
                        viewer.navigation.goToNextPage();
                        break;
                    }
                case 'redacticon':
                    {
                        if (this.redactionCount > 0) {
                            var _this_2 = this;
                            viewer.saveAsBlob().then(function (value) {
                                var data = value;
                                var reader = new FileReader();
                                reader.readAsDataURL(data);
                                reader.onload = function (e) {
                                    var _a;
                                    var base64String = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                                    var xhr = new XMLHttpRequest();
                                    xhr.open('POST', _this_2.url, true);
                                    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                                    var requestData = JSON.stringify({ base64String: base64String });
                                    xhr.onload = function () {
                                        if (xhr.status === 200) {
                                            viewer.load(xhr.responseText, null);
                                        }
                                        else {
                                            console.error('Redaction failed:', xhr.statusText);
                                        }
                                    };
                                    xhr.onerror = function () {
                                        console.error('An error occurred during the redaction:', xhr.statusText);
                                    };
                                    xhr.send(requestData);
                                };
                            });
                            this.redactionCount = 0;
                            this.updateRedaction();
                        }
                        break;
                    }
            }
        };
        //To get the header in upload image dialog box
        var header = function () {
            return (React.createElement("div", null,
                React.createElement("div", { id: "dlg-template", title: "Upload image", className: "e-icon-settings" }, "Upload Image")));
        };
        //When the cancel button is clicked
        var CloseDialog = function () {
            this.dialogInstance.hide();
        };
        //To get the footer content in upload image dialog box
        var footerTemplate = function () {
            return (React.createElement("div", null,
                React.createElement("button", { id: "cancelButton", className: "e-control e-btn e-primary", "data-ripple": "true", onClick: CloseDialog.bind(_this_1) }, "Cancel")));
        };
        //To get the content of dialog box
        var contentTemplate = function () {
            return (React.createElement("div", { id: 'dialog' },
                React.createElement("div", { id: 'e-pv-redact-sb-defaultfileupload' },
                    React.createElement("div", { className: "drop-area-wrap", id: 'e-pv-redact-sb-drop-area-wrap' },
                        React.createElement("div", null,
                            React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileupload', type: 'file', ref: function (scope) { _this_1.uploadObj.current = scope; }, asyncSettings: _this_1.asyncSettings, change: onFileChange.bind(_this_1), dropArea: _this_1.dropAreaRef, allowedExtensions: _this_1.allowedExtensions })),
                        React.createElement("div", null, "(Only JPG and PNG images will be accepted)")),
                    React.createElement("div", { className: "e-pv-redact-sb-image-list" },
                        React.createElement("div", { id: 'imageContainer', className: "e-pv-redact-sb-image-container" },
                            React.createElement("img", { id: 'imageView', className: "e-pv-redact-sb-image-source", style: { 'display': 'none' } }))))));
        };
        //When the zoom dropdown is changed
        var zoomValueChange = function (args) {
            var zoom = (args).value;
            var previousZoom = (args).previousItemData.value;
            if (zoom !== null || previousZoom !== null) {
                var zoomchange = parseInt(zoom.replace("%", ""), 10);
                viewer.magnificationModule.zoomTo(zoomchange);
            }
        };
        //To display the zoom percentage dropdown
        var dropDown = function () {
            return (React.createElement("div", null,
                React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { width: 88, popupWidth: 80, value: '100%', dataSource: data, showClearButton: false, change: zoomValueChange.bind(this) })));
        };
        var imageSrc;
        var customStampSource;
        var onFileChange = function (args) {
            var file = args.file[0].rawFile;
            var imageElement = document.getElementById('imageView');
            var imageElementContainer = document.getElementById('imageContainer');
            var reader = new FileReader();
            var _this = this;
            reader.onload = function (e) {
                var base64String = e.target ? e.target.result : null;
                imageSrc = base64String;
                customStampSource = imageSrc;
                (imageElement).src = imageSrc;
                imageElementContainer.className =
                    'image-container image-container-selected';
                (imageElement).style.display = 'block';
                // Bind click event to the image element
                imageElement.addEventListener('click', handleImageClick.bind(_this));
            };
            reader.readAsDataURL(file);
        };
        var handleImageClick = function () {
            customStampSource = imageSrc;
            this.dialogInstance.hide();
            addImage();
        };
        //To add the image in pdf
        var addImage = function () {
            viewer.stampSettings.author = "Image";
            viewer.customStampSettings = {
                width: 200,
                author: 'Image',
                height: 125,
                isAddToMenu: false,
                enableCustomStamp: false
            };
            viewer.customStamp = [
                {
                    customStampName: 'Image',
                    customStampImageSource: customStampSource
                },
            ];
        };
        return (React.createElement("div", null,
            React.createElement("div", { className: "control-section", id: 'e-pv-redact-sb-panel' },
                React.createElement("div", { className: "flex-container", id: "e-pv-redact-sb-flexContainer" }),
                React.createElement("div", { className: 'control-container' },
                    React.createElement(ej2_react_navigations_1.AppBarComponent, { colorMode: "Primary" },
                        React.createElement("span", { className: "regular" }, "Redaction"),
                        React.createElement("div", { className: "e-appbar-spacer" }),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-inherit ', iconCss: 'e-icons e-download e-btn-icon e-icon-left', id: 'download_pdf', onClick: this.download }, "Download"))),
                React.createElement("div", { className: 'primaryToolbar', id: 'toolbar_default' },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (scope) { _this_1.primaryToolbar = scope; }, clicked: clickHandler.bind(this), id: 'e-pv-redact-sb-toolbar' },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icon e-folder', tooltipText: 'Open', cssClass: 'e-pv-redact-sb-open-container', id: 'pdfviewer_open', text: 'Open' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icon e-text-annotation', tooltipText: 'Text', cssClass: 'e-pv-redact-sb-font-container', text: 'Text', id: 'text_annot' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-image', tooltipText: 'Image', cssClass: 'e-pv-redact-sb-image-container', text: 'Image', id: 'image_annot' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-opacity', tooltipText: 'Pattern', cssClass: 'e-pv-redact-sb-pattern-container', text: 'Pattern', id: 'pattern_annot' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons black-out', tooltipText: 'Blackout', cssClass: 'e-pv-redact-sb-black-out-container', text: 'Blackout', id: 'black_annot' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons white-out', tooltipText: 'Whiteout', cssClass: 'e-pv-redact-sb-white-out-container', text: 'Whiteout', id: 'white_annot' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { type: 'Separator' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-redact', tooltipText: 'Redaction', cssClass: 'e-pv-redact-sb-redaction-container', text: 'Redact', id: 'redacticon', disabled: true })))),
                React.createElement("div", { className: 'e-pv-redact-sb-secondary-toolbar', id: 'toolbar_secondary' },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (scope) { _this_1.toolbar = scope; }, clicked: clickHandler.bind(this), id: 'e-pv-redact-sb-toolbar-secondary' },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-chevron-left', cssClass: 'e-pv-redact-sb-previous-container', tooltipText: "Previous Page", id: 'previousPage', disabled: true }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: template, tooltipText: "Page Number" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icon e-chevron-right', cssClass: 'e-pv-redact-sb-next-container', tooltipText: "Next Page", id: 'nextPage', disabled: true }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { cssClass: 'percentage', type: "Input", tooltipText: "Zoom", template: dropDown, align: "Left" })))),
                React.createElement("div", { id: "targetDialog", className: "dialog-element" },
                    React.createElement(ej2_react_popups_1.DialogComponent, { header: header, footerTemplate: footerTemplate, content: contentTemplate, showCloseIcon: true, target: "#targetDialog", width: '437px', height: '255px', visible: false, isModal: true, ref: function (scope) { _this_1.dialogInstance = scope; }, id: 'e-pv-redact-sb-dialog' })),
                React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: function (scope) { _this_1.viewer = scope; }, id: "container", documentPath: "https://cdn.syncfusion.com/content/pdf/programmatical-annotations.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/27.1.55/dist/ej2-pdfviewer-lib", style: { 'height': '640px' }, enableToolbar: false, enableNavigationToolbar: false, enableAnnotationToolbar: false, enableCommentPanel: false, documentLoad: this.documentLoaded, pageChange: this.onPageChange, annotationAdd: this.annotationAdd, annotationRemove: this.annotationRemove },
                    React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] })),
                React.createElement("input", { type: "file", id: "fileUpload", accept: ".pdf", onChange: this.readFile.bind(this), style: { 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' } })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    " The PDF Viewer facilitates the permanent removal of sensitive or confidential data from PDF files. Simplifying the redaction process, Syncfusion\u2019s ",
                    React.createElement("a", { target: '_blank', href: 'https://www.syncfusion.com/document-processing/pdf-framework/net/pdf-library', "aria-label": "Navigate to the Redaction Documendation in PDF library" }, ".NET PDF library"),
                    " includes features for seamless implementation. ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " This example showcases the implementation of redaction using rectangle annotation, leveraging the Redaction feature in ",
                    React.createElement("a", { target: '_blank', href: 'https://help.syncfusion.com/file-formats/pdf/working-with-redaction', "aria-label": "Navigate to the Redaction Documendation by pdf viewer Library" }, "File formats"),
                    "."),
                React.createElement("br", null),
                React.createElement("p", null, "Various types of redactions are demonstrated: "),
                React.createElement("br", null),
                React.createElement("ul", null,
                    React.createElement("li", null, "Displaying text over the redacted area"),
                    React.createElement("li", null, "Adding an image to the redacted area"),
                    React.createElement("li", null, "Drawing patterns on the redacted area"),
                    React.createElement("li", null, "Blacking out the redacted area"),
                    React.createElement("li", null, "Whitening out the redacted area")),
                React.createElement("br", null),
                React.createElement("p", null, " Upon selecting areas on a page or across different pages with different redaction options, users can click the `Redact button`. This action redacts the document and reloads it into the PDF Viewer. The redacted document can then be saved or downloaded. "),
                React.createElement("p", null,
                    "More information on adding annotation programmatically can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/introduction" }, " documentation section"),
                    "."))));
    };
    //To read the file when loaded
    Redaction.prototype.readFile = function (evt) {
        var proxy = this;
        var uploadedFiles = evt.target.files;
        var uploadedFile = uploadedFiles[0];
        this.fileName = uploadedFile.name;
        var reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        reader.onload = function (e) {
            var uploadedFileUrl = e.currentTarget.result;
            viewer.documentPath = uploadedFileUrl;
            viewer.fileName = proxy.fileName;
            viewer.downloadFileName = proxy.fileName;
        };
    };
    return Redaction;
}(sample_base_1.SampleBase));
exports.Redaction = Redaction;
