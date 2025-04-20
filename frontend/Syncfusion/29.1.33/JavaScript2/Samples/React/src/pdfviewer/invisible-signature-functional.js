"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
var react_1 = require("react");
require("./pdf.component.css");
function InvisibleDigitalSignature() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(false), successVisible = _a[0], setVisible = _a[1];
    var _b = (0, react_1.useState)(false), errorVisible = _b[0], seterrorVisible = _b[1];
    var _c = (0, react_1.useState)(false), warningVisible = _c[0], setwarningVisible = _c[1];
    var viewer;
    var toolbar;
    var fileName = '';
    //Specifies the visibility of the complete signing.
    var buttonVisiblity = true;
    //Specifies the visibility of the download icon
    var downloadVisiblity = true;
    var msgWarning = "The document has been digitally signed and at least one signature has problem ";
    var msgError = "The document has been digitally signed, but it has been modified since it was signed and at least one signature is invalid";
    var msgSuccess = "The document has been digitally signed and all the signatures are valid";
    var documentData;
    // Specifies whether the document has a digital signature or not.
    var hasDigitalSignature = false;
    return (React.createElement("div", null,
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", null,
                React.createElement("div", { className: 'e-pdf-toolbar' },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (scope) { toolbar = scope; }, clicked: clickHandler.bind(this) },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-folder-open', id: 'file_Open', tooltipText: 'Open', cssClass: 'e-pv-button-container' }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { text: "Complete Signing", id: 'pdfviewer_sign', tooltipText: 'Finish Signing', disabled: buttonVisiblity, align: "Right" }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: 'e-icons e-download', tooltipText: "Download", id: 'download', disabled: downloadVisiblity, align: "Right", cssClass: 'e-pv-download-document-container' })))),
                React.createElement("div", null,
                    React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_success", content: msgSuccess, visible: successVisible, severity: "Success" }),
                    React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_warning", content: msgWarning, visible: warningVisible, severity: "Warning" }),
                    React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_error", content: msgError, visible: errorVisible, severity: "Error" })),
                React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "container", ref: function (scope) { viewer = scope; }, enableToolbar: false, enableNavigationToolbar: false, documentLoad: documentLoaded, enableAnnotationToolbar: false, documentPath: "https://cdn.syncfusion.com/content/pdf/InvisibleDigitalSignature.pdf", resourceUrl: 'https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib', addSignature: addSignature, style: { 'display': 'block', 'height': '640px' } },
                    React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView,
                            ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.PageOrganizer] })),
                React.createElement("input", { type: "file", id: "fileUpload", accept: ".pdf", onChange: readFile.bind(this), style: { 'display': 'block', 'visibility': 'hidden', 'width': '0', 'height': '0' } }))),
        React.createElement("div", { id: 'sample' },
            React.createElement("div", { id: 'loader' }, "Loading....")),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how to digitally sign a PDF document from code behind using Syncfusion's PDF Viewer and PDF Library")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This sample operates correctly when a signature field is present in the PDF document. If all signature fields are signed, the \"Finish Signing\" button becomes enabled. Clicking this button adds a digital signature certificate programmatically and reloads the digitally signed document into the viewer."),
            React.createElement("br", null),
            React.createElement("p", null, "The below are the messages shown in the respective scenarios:"),
            React.createElement("br", null),
            React.createElement("p", null, "1. The document has been digitally signed, but it has been modified since it was signed and at least one signature is invalid."),
            React.createElement("ul", null,
                React.createElement("li", null, "This message appears if the digitally signed document is edited after reloading.")),
            React.createElement("p", null, "2. The document has been digitally signed and at least one signature has a problem."),
            React.createElement("ul", null,
                React.createElement("li", null, "This message is shown if the digital signature is not registered on the machine and is not in the trusted list. Adding the certificate to the trusted list is necessary.")),
            React.createElement("p", null, "3. The document has been digitally signed and all the signatures are valid."),
            React.createElement("ul", null,
                React.createElement("li", null, "This message indicates that the document is digitally signed without any issues.")),
            React.createElement("p", null,
                "More information on the PDF Viewer instantiation can be found on this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section "),
                "."))));
    //This method will get invoked while clicking the toolbar items.
    function clickHandler(args) {
        switch (args.item.id) {
            case 'file_Open':
                document.getElementById('fileUpload').click();
                break;
            case 'pdfviewer_sign':
                var url = "https://ej2services.syncfusion.com/production/web-services/api/pdfviewer/AddSignature";
                viewer.saveAsBlob().then(function (value) {
                    var reader = new FileReader();
                    reader.readAsDataURL(value);
                    reader.onload = function (e) {
                        var base64String = e.target ? e.target.result : null;
                        var xhr = new XMLHttpRequest();
                        xhr.open('POST', url, true);
                        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
                        var requestData = JSON.stringify({ base64String: base64String });
                        xhr.onload = function () {
                            if (xhr.status === 200) {
                                documentData = xhr.responseText;
                                viewer.load(xhr.responseText, null);
                                toolbar.items[1].disabled = true;
                                toolbar.items[2].disabled = false;
                                viewer.fileName = fileName;
                                viewer.downloadFileName = fileName;
                            }
                            else {
                                console.error('Error in AddSignature API:', xhr.statusText);
                            }
                        };
                        xhr.onerror = function () {
                            console.error('Error reading Blob as Base64.', xhr.statusText);
                        };
                        xhr.send(requestData);
                    };
                }).catch(function (error) {
                    console.error('Error saving Blob:', error);
                });
                break;
            //Downloads the PDF document being loaded in the PDFViewer.
            case 'download':
                viewer.download();
                break;
        }
    }
    function documentLoaded(args) {
        fileName = args.documentName;
        var postData = {
            documentData: documentData
        };
        var options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        };
        var apiUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer/ValidateSignature';
        fetch(apiUrl, options)
            .then(function (response) { return response.json(); })
            .then(function (body) {
            if (body.successVisible || body.warningVisible || body.errorVisible)
                toolbar.items[1].disabled = true;
            if (!body.downloadVisibility)
                toolbar.items[2].disabled = false;
            if ((body.successVisible)) {
                setTimeout(function () {
                    msgSuccess = body.message;
                    setVisible(true);
                }, 1000);
                setTimeout(function () {
                    setVisible(false);
                }, 5000);
            }
            if ((body.warningVisible)) {
                msgWarning = body.message;
                setwarningVisible(true);
            }
            if (body.errorVisible) {
                msgError = body.message;
                seterrorVisible(false);
            }
        });
    }
    function readFile(evt) {
        var uploadedFiles = evt.target.files;
        var uploadedFile = uploadedFiles[0];
        fileName = uploadedFile.name;
        var reader = new FileReader();
        reader.readAsDataURL(uploadedFile);
        var uploadedFileName = fileName;
        reader.onload = function (e) {
            toolbar.items[2].disabled = true;
            var uploadedFileUrl = e.currentTarget.result;
            documentData = uploadedFileUrl;
            viewer.load(uploadedFileUrl, null);
            viewer.fileName = fileName;
            viewer.downloadFileName = fileName;
        };
    }
    //Triggers while adding the signature in signature field.
    function addSignature() {
        var field;
        // To retrieve the form fields in the loaded PDF Document.
        field = viewer.retrieveFormFields();
        var signatureFieldCount = 0;
        var signaturesCount = 0;
        for (var i = 0; i < field.Count; i++) {
            if (field[i].Type.ToString() === "SignatureField") {
                signatureFieldCount++;
            }
            if (field[i].Value !== "" && field[i].Value !== null && field[i].Type.ToString() === "SignatureField") {
                signaturesCount++;
            }
        }
        // Checks whether all the signature fields are signed or not.
        if (signatureFieldCount === signaturesCount) {
            // Checks whether the document has a digital signature or not.
            if (!hasDigitalSignature) {
                buttonVisiblity = false;
                toolbar.items[1].disabled = false;
            }
        }
    }
}
exports.default = InvisibleDigitalSignature;
