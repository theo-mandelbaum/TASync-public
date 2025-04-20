import { createElement, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { AjaxHandler } from '../index';
import { Size } from '@syncfusion/ej2-drawings';
import { TaskPriorityLevel } from '../base/pdfviewer-utlis';
/**
 * Print module
 */
var Print = /** @class */ (function () {
    /**
     * @param {PdfViewer} viewer - It describes about the viewer
     * @param {PdfViewerBase} base - It describes about the base
     * @private
     * @returns {void}
     */
    function Print(viewer, base) {
        this.printHeight = 1056;
        this.printWidth = 816;
        this.maximumPixels = 16777216;
        this.pdfViewer = viewer;
        this.pdfViewerBase = base;
    }
    /**
     * Print the PDF document being loaded in the ejPdfViewer control.
     *
     * @returns {void}
     */
    Print.prototype.print = function () {
        var _this = this;
        var pageIndex;
        if (this.pdfViewerBase.pageCount > 0) {
            this.printViewerContainer = createElement('div', {
                id: this.pdfViewer.element.id + '_print_viewer_container',
                className: 'e-pv-print-viewer-container'
            });
            if (this.pdfViewer.printMode === 'Default') {
                this.pdfViewerBase.showPrintLoadingIndicator(true);
                this.iframe = document.createElement('iframe');
                this.iframe.className = 'iframeprint';
                this.iframe.id = 'iframePrint';
                this.iframe.style.position = 'fixed';
                this.iframe.style.top = '-100000000px';
                document.body.appendChild(this.iframe);
                this.frameDoc = this.iframe.contentWindow ? this.iframe.contentWindow : this.iframe.contentDocument;
                this.frameDoc.document.open();
            }
            else {
                this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
                this.printWindow.moveTo(0, 0);
                this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
                this.createPrintLoadingIndicator(this.printWindow.document.body);
            }
            setTimeout(function () {
                for (pageIndex = 0; pageIndex < _this.pdfViewerBase.pageCount; pageIndex++) {
                    var pageWidth = _this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].width;
                    var pageHeight = _this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)].height;
                    // Check if the document is A4 by comparing the A4 standard values with the buffer value
                    var a4StdWidth = 793;
                    var a4StdHeight = 1122;
                    var bufferWidth = 10;
                    var bufferHeight = 10;
                    //Reduced the A4 standard width and height to prevent blank pages while printing
                    var a4PrintWidth = 783;
                    var a4PrintHeight = 1110;
                    _this.printWidth = 816;
                    _this.printHeight = 1056;
                    // Check if the A4 document is protrait or landscape
                    if (pageWidth > pageHeight) {
                        a4StdWidth = 1122;
                        a4StdHeight = 793;
                    }
                    if (!(pageWidth >= (a4StdWidth + bufferWidth) || pageWidth <= (a4StdWidth - bufferWidth)) &&
                        !(pageHeight >= (a4StdHeight + bufferHeight) || pageHeight <= (a4StdHeight - bufferHeight))) {
                        _this.printWidth = a4PrintWidth;
                        _this.printHeight = a4PrintHeight;
                    }
                    _this.pdfViewer.printModule.createRequestForPrint(pageIndex, pageWidth, pageHeight, _this.pdfViewerBase.pageCount, _this.pdfViewer.printScaleFactor);
                }
                _this.pdfViewer.firePrintEnd(_this.pdfViewer.downloadFileName);
            }, 100);
        }
    };
    Print.prototype.createRequestForPrint = function (pageIndex, pageWidth, pageHeight, pageCount, printScaleFactor) {
        // eslint-disable-next-line
        var proxy = this;
        var jsonObject = {
            pageNumber: pageIndex.toString(),
            documentId: this.pdfViewerBase.documentId,
            hashId: this.pdfViewerBase.hashId, zoomFactor: '1',
            action: 'PrintImages',
            elementId: this.pdfViewer.element.id,
            uniqueId: this.pdfViewerBase.documentId,
            digitalSignaturePresent: this.pdfViewerBase.digitalSignaturePresent(pageIndex),
            printScaleFactor: printScaleFactor >= 0.5 && printScaleFactor <= 5 ? printScaleFactor : printScaleFactor > 5 ? 5 : 1
        };
        if (this.pdfViewerBase.jsonDocumentId) {
            jsonObject.documentId = this.pdfViewerBase.jsonDocumentId;
        }
        proxy.pdfViewerBase.createFormfieldsJsonData();
        proxy.printRequestHandler = new AjaxHandler(proxy.pdfViewer);
        proxy.printRequestHandler.url = proxy.pdfViewer.serviceUrl + '/' + proxy.pdfViewer.serverActionSettings.print;
        proxy.printRequestHandler.responseType = null;
        proxy.printRequestHandler.mode = false;
        if (this.pdfViewerBase.validateForm && this.pdfViewer.enableFormFieldsValidation) {
            this.pdfViewer.fireValidatedFailed(proxy.pdfViewer.serverActionSettings.download);
            this.pdfViewerBase.validateForm = false;
            this.pdfViewerBase.showPrintLoadingIndicator(false);
        }
        else {
            if (proxy.pdfViewerBase.clientSideRendering) {
                this.pdfViewerBase.pdfViewerRunner.addTask({
                    pageIndex: pageIndex, message: 'printImage', printScaleFactor: printScaleFactor >= 0.5 && printScaleFactor <= 5 ? printScaleFactor : printScaleFactor > 5 ? 5 : 1
                }, TaskPriorityLevel.High);
            }
            else {
                proxy.printRequestHandler.send(jsonObject);
            }
        }
        proxy.printRequestHandler.onSuccess = function (result) {
            proxy.printSuccess(result, pageWidth, pageHeight, pageIndex);
        };
        this.printRequestHandler.onFailure = function (result) {
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.print);
        };
        this.printRequestHandler.onError = function (result) {
            proxy.pdfViewerBase.openNotificationPopup();
            proxy.pdfViewer.fireAjaxRequestFailed(result.status, result.statusText, proxy.pdfViewer.serverActionSettings.print);
        };
    };
    /**
     * @param {any} event - It describes about the event
     * @private
     * @returns {void}
     */
    Print.prototype.printOnMessage = function (event) {
        var canvas = document.createElement('canvas');
        var _a = event.data, value = _a.value, width = _a.width, height = _a.height, pageIndex = _a.pageIndex, pageWidth = _a.pageWidth, pageHeight = _a.pageHeight;
        canvas.width = width;
        canvas.height = height;
        var canvasContext = canvas.getContext('2d');
        var imageData = canvasContext.createImageData(width, height);
        imageData.data.set(value);
        canvasContext.putImageData(imageData, 0, 0);
        var imageUrl = canvas.toDataURL();
        this.pdfViewerBase.releaseCanvas(canvas);
        var data = ({ image: imageUrl, pageNumber: pageIndex, uniqueId: this.pdfViewerBase.documentId, pageWidth: width });
        this.printSuccess(data, pageWidth, pageHeight, pageIndex);
    };
    Print.prototype.printSuccess = function (result, pageWidth, pageHeight, pageIndex) {
        var _this = this;
        this.pdfViewerBase.isPrint = true;
        var printImage = this.pdfViewerBase.clientSideRendering ? result : result.data;
        var redirect = this.pdfViewerBase.checkRedirection(printImage);
        if (redirect) {
            this.pdfViewerBase.showPrintLoadingIndicator(false);
        }
        else {
            if (printImage) {
                if (typeof printImage !== 'object') {
                    try {
                        printImage = JSON.parse(printImage);
                        if (typeof printImage !== 'object') {
                            this.pdfViewerBase.onControlError(500, printImage, this.pdfViewer.serverActionSettings.print);
                            printImage = null;
                        }
                    }
                    catch (error) {
                        this.pdfViewerBase.onControlError(500, printImage, this.pdfViewer.serverActionSettings.print);
                        printImage = null;
                    }
                }
            }
            if (printImage && printImage.uniqueId === this.pdfViewerBase.documentId) {
                this.pdfViewer.fireAjaxRequestSuccess(this.pdfViewer.serverActionSettings.print, printImage);
                var annotationSource_1;
                if (!this.pdfViewer.annotationSettings.skipPrint) {
                    var annotationCollections = this.pdfViewerBase.documentAnnotationCollections;
                    if (annotationCollections && annotationCollections[printImage.pageNumber] &&
                        this.pdfViewerBase.isTextMarkupAnnotationModule()) {
                        var printCollection = annotationCollections[printImage.pageNumber];
                        if (this.pdfViewerBase.isImportAction) {
                            var textMarkupAnnotation = printCollection.textMarkupAnnotation;
                            var shapeAnnotation = printCollection.shapeAnnotation;
                            var measureShapeAnnotation = printCollection.measureShapeAnnotation;
                            var stampAnnotation = printCollection.stampAnnotations;
                            var freeTextAnnotation = printCollection.freeTextAnnotation;
                            var inkAnnotation = printCollection.signatureInkAnnotation;
                            var stickyNoteAnnotation = printCollection.stickyNotesAnnotation;
                            annotationSource_1 = this.pdfViewer.annotationModule.textMarkupAnnotationModule.
                                printAnnotationsInCanvas(textMarkupAnnotation, printImage.pageNumber, stampAnnotation, shapeAnnotation, measureShapeAnnotation, stickyNoteAnnotation, freeTextAnnotation, inkAnnotation);
                        }
                        else {
                            annotationSource_1 = this.pdfViewer.annotationModule.textMarkupAnnotationModule.
                                printAnnotationsInCanvas(printCollection.textMarkupAnnotation, printImage.pageNumber, printCollection.stampAnnotations, printCollection.shapeAnnotation, printCollection.measureShapeAnnotation, printCollection.stickyNotesAnnotation, printCollection.freeTextAnnotation, printCollection.signatureInkAnnotation);
                        }
                    }
                    if (this.pdfViewerBase.isAnnotationCollectionRemoved) {
                        annotationSource_1 = this.pdfViewer.annotationModule.textMarkupAnnotationModule.
                            printAnnotationsInCanvas(null, printImage.pageNumber, null, null, null, null, null, null);
                    }
                }
                var currentPageNumber_1 = printImage.pageNumber;
                this.printCanvas = createElement('canvas', { id: this.pdfViewer.element.id + '_printCanvas_' + pageIndex, className: 'e-pv-print-canvas' });
                this.printCanvas.style.width = pageWidth + 'px';
                this.printCanvas.style.height = pageHeight + 'px';
                var printScaleValue = this.pdfViewer.printScaleFactor > 1 && this.pdfViewer.printScaleFactor <= 5 ?
                    this.pdfViewer.printScaleFactor : this.pdfViewer.printScaleFactor > 5 ? 5 : 2;
                if (this.pdfViewerBase.clientSideRendering) {
                    //An A0 piece of paper measures 33.1 × 46.8 inches, with 46.8 inches being the greater dimension. The pixel value of 46.8 inches is 4493px. If the document size is too large, we may not be able to display the image. Therefore, we should consider the maximum size of A0 paper if the page size is greater than 4493 pixels.
                    var maxPageSize = 4493;
                    var whichIsBigger = (pageWidth > pageHeight) ? 'Width' : 'Height';
                    var maxWidth = pageWidth;
                    var maxHeight = pageHeight;
                    if (whichIsBigger === 'Width') {
                        maxWidth = (pageWidth > maxPageSize) ? maxPageSize : pageWidth;
                        if (maxWidth === maxPageSize) {
                            maxHeight = pageHeight / (pageWidth / maxPageSize);
                        }
                    }
                    else {
                        maxHeight = (pageHeight > maxPageSize) ? maxPageSize : pageHeight;
                        if (maxHeight === maxPageSize) {
                            maxWidth = pageWidth / (pageHeight / maxPageSize);
                        }
                    }
                    if ((pageHeight < pageWidth) && this.pdfViewer.enablePrintRotation) {
                        this.printCanvas.height = pageWidth * printScaleValue * window.devicePixelRatio;
                        this.printCanvas.width = pageHeight * printScaleValue * window.devicePixelRatio;
                    }
                    else {
                        this.printCanvas.height = maxHeight * printScaleValue * window.devicePixelRatio;
                        this.printCanvas.width = maxWidth * printScaleValue * window.devicePixelRatio;
                    }
                }
                else {
                    this.printCanvas.height = this.printHeight * printScaleValue * window.devicePixelRatio;
                    this.printCanvas.width = this.printWidth * printScaleValue * window.devicePixelRatio;
                }
                if (this.pdfViewerBase.isDeviceiOS) {
                    var size = new Size(this.printCanvas.width, this.printCanvas.height);
                    var newSize = this.limitSize(size, this.maximumPixels);
                    this.printCanvas.width = newSize.width;
                    this.printCanvas.height = newSize.height;
                }
                var context_1 = this.printCanvas.getContext('2d');
                var pageImage_1 = new Image();
                var annotationImage_1 = new Image();
                var annotationImage1_1 = new Image();
                pageImage_1.onload = function () {
                    _this.pdfViewerBase.isPrint = true;
                    if ((pageHeight > pageWidth) || !_this.pdfViewer.enablePrintRotation) {
                        context_1.drawImage(pageImage_1, 0, 0, _this.printCanvas.width, _this.printCanvas.height);
                        if (annotationSource_1 && annotationSource_1.annotImg) {
                            context_1.drawImage(annotationImage_1, 0, 0, _this.printCanvas.width, _this.printCanvas.height);
                        }
                        if (annotationSource_1 && annotationSource_1.highlightImg) {
                            context_1.save();
                            context_1.globalCompositeOperation = 'multiply';
                            context_1.drawImage(annotationImage1_1, 0, 0, _this.printCanvas.width, _this.printCanvas.height);
                            context_1.restore();
                        }
                    }
                    else {
                        // translate to center canvas
                        context_1.translate(_this.printCanvas.width * 0.5, _this.printCanvas.height * 0.5);
                        // rotate the canvas to - 90 degree
                        context_1.rotate(-0.5 * Math.PI);
                        // un translate the canvas back to origin
                        context_1.translate(-_this.printCanvas.height * 0.5, -_this.printCanvas.width * 0.5);
                        // draw the image
                        context_1.drawImage(pageImage_1, 0, 0, _this.printCanvas.height, _this.printCanvas.width);
                        if (annotationSource_1 && annotationSource_1.annotImg) {
                            context_1.drawImage(annotationImage_1, 0, 0, _this.printCanvas.height, _this.printCanvas.width);
                        }
                        if (annotationSource_1 && annotationSource_1.highlightImg) {
                            context_1.save();
                            context_1.globalCompositeOperation = 'multiply';
                            context_1.drawImage(annotationImage1_1, 0, 0, _this.printCanvas.width, _this.printCanvas.height);
                            context_1.restore();
                        }
                    }
                    if (currentPageNumber_1 === (_this.pdfViewerBase.pageCount - 1)) {
                        _this.printWindowOpen();
                    }
                    _this.pdfViewer.renderDrawing(null, pageIndex);
                    _this.pdfViewerBase.isPrint = false;
                };
                pageImage_1.src = printImage.image;
                if (annotationSource_1 && !isNullOrUndefined(annotationSource_1.annotImg)) {
                    annotationImage_1.src = annotationSource_1.annotImg;
                }
                if (annotationSource_1 && !isNullOrUndefined(annotationSource_1.highlightImg)) {
                    annotationImage1_1.src = annotationSource_1.highlightImg;
                }
                this.printViewerContainer.appendChild(this.printCanvas);
            }
        }
        this.pdfViewerBase.isPrint = false;
    };
    Print.prototype.limitSize = function (size, maximumPixels) {
        var width = size.width, height = size.height;
        var requiredPixels = width * height;
        if (requiredPixels <= maximumPixels) {
            return new Size(size.width, size.height);
        }
        var scalar = Math.sqrt(maximumPixels) / Math.sqrt(requiredPixels);
        return new Size(Math.floor(width * scalar), Math.floor(height * scalar));
    };
    Print.prototype.renderFieldsForPrint = function (pageIndex, heightRatio, widthRatio) {
        var data = null;
        var targetField;
        if (this.pdfViewer.printMode === 'Default') {
            targetField = this.frameDoc.document.getElementById('fields_' + pageIndex);
        }
        else {
            targetField = this.printWindow.document.getElementById('fields_' + pageIndex);
        }
        if (this.pdfViewer.formFieldsModule) {
            data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        }
        if (!this.pdfViewer.formDesignerModule) {
            if (data) {
                var formFieldsData = JSON.parse(data);
                for (var i = 0; i < formFieldsData.length; i++) {
                    var currentData = formFieldsData[parseInt(i.toString(), 10)];
                    if (parseFloat(currentData['PageIndex']) === pageIndex) {
                        var field = this.pdfViewer.formFieldsModule.createFormFields(currentData, pageIndex, i, targetField);
                        var inputField = field.currentField;
                        if (inputField) {
                            var bounds = currentData['LineBounds'];
                            var font = currentData['Font'];
                            this.applyPosition(inputField, bounds, font, heightRatio, widthRatio);
                            inputField.InsertSpaces = currentData.InsertSpaces;
                            if (inputField.InsertSpaces) {
                                var font_1 = ((parseInt(inputField.style.width, 10) / inputField.maxLength) -
                                    (parseFloat(inputField.style.fontSize) / 2)) - 0.6;
                                inputField.style.letterSpacing = '' + font_1 + 'px';
                                inputField.style.fontFamily = 'monospace';
                            }
                            var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
                            if ((pageDetails.width > pageDetails.height) && this.pdfViewer.enablePrintRotation) {
                                /*
                                The below logig have been modified for the bug https://syncfusion.atlassian.net/browse/EJ2-57986
                                This code changes is specific for form field elements.

                                    inputField.style.transform = 'rotate(-90deg)';
                                    let previousLeft: number = parseFloat(inputField.style.left);
                                    let currentWidthPosition: number = parseFloat(inputField.style.width) / 2;
                                    let currentHeightPosition: number = parseFloat(inputField.style.height) / 2;
                                    let currentTop: number = parseFloat(inputField.style.top);
                                    let currentHeight: number = parseFloat(inputField.style.height);
                                    inputField.style.left = (currentHeightPosition - currentWidthPosition + currentTop) + 'px';
                                    inputField.style.top = (pageDetails.width / widthRatio) - (currentHeight / heightRatio) - ((currentWidthPosition / heightRatio) - (currentHeightPosition / heightRatio) + previousLeft) + 'px';
                                */
                                var x = this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.X);
                                var y = this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.Y);
                                var width = this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.Width);
                                var height = this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.Height);
                                var pageHeight = pageDetails.width;
                                var top_1 = pageHeight - x - height;
                                var left = (y + height);
                                inputField.style.transform = 'rotate(-90deg)';
                                inputField.style.transformOrigin = 'left bottom';
                                inputField.style.left = left + 'px';
                                inputField.style.top = top_1 + 'px';
                                inputField.style.height = height + 'px';
                                inputField.style.width = width + 'px';
                            }
                            inputField.style.backgroundColor = 'transparent';
                            if (!currentData.IsSignatureField) {
                                inputField.style.borderColor = 'transparent';
                            }
                            targetField.appendChild(inputField);
                        }
                    }
                }
            }
        }
        else {
            var formDesignerData = null;
            if (this.pdfViewer.formDesignerModule) {
                formDesignerData = this.pdfViewerBase.getItemFromSessionStorage('_formDesigner');
            }
            if (formDesignerData) {
                var formDesignerFieldsData = JSON.parse(formDesignerData);
                for (var i = 0; i < formDesignerFieldsData.length; i++) {
                    var currentData = formDesignerFieldsData[parseInt(i.toString(), 10)].FormField;
                    if (currentData.pageNumber - 1 === pageIndex && currentData.isPrint) {
                        var signatureField = this.pdfViewer.nameTable[formDesignerFieldsData[parseInt(i.toString(), 10)].Key.split('_')[0]];
                        var element = signatureField.wrapper.children[0];
                        var htmlElement = void 0;
                        if (element) {
                            if (currentData.formFieldAnnotationType === 'RadioButton') {
                                for (var j = 0; j < currentData.radiobuttonItem.length; j++) {
                                    signatureField = this.pdfViewer.nameTable[currentData.radiobuttonItem[parseInt(j.toString(), 10)].id.split('_')[0]];
                                    htmlElement = this.createFormDesignerFields(currentData.radiobuttonItem[parseInt(j.toString(), 10)], element, signatureField);
                                    if (htmlElement) {
                                        var bounds = currentData.radiobuttonItem[parseInt(j.toString(), 10)].lineBound;
                                        var font = currentData.radiobuttonItem[parseInt(j.toString(), 10)].fontFamily;
                                        this.applyPosition(htmlElement, bounds, font, heightRatio, widthRatio, true, currentData.radiobuttonItem[parseInt(j.toString(), 10)].zoomValue, currentData.pageNumber - 1);
                                        targetField.appendChild(htmlElement);
                                    }
                                }
                            }
                            else {
                                htmlElement = this.createFormDesignerFields(currentData, element, signatureField);
                                if (htmlElement) {
                                    var bounds = currentData.lineBound;
                                    var font = currentData.fontFamily;
                                    this.applyPosition(htmlElement, bounds, font, heightRatio, widthRatio, true, currentData.zoomValue, currentData.pageNumber - 1);
                                    if (!isNullOrUndefined(bounds) && bounds.Width > 0 && bounds.Height > 0) {
                                        targetField.appendChild(htmlElement);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Print.prototype.createFormDesignerFields = function (currentData, element, signatureField) {
        var parentHtmlElementAttribute = {
            'id': 'form_field_' + element.id + '_html_element',
            'class': 'foreign-object'
        };
        var parentHtmlElement = this.pdfViewer.formDesignerModule.createHtmlElement('div', parentHtmlElementAttribute);
        var HtmlElementAttribute = {
            'id': element.id + '_html_element',
            'class': 'foreign-object'
        };
        var htmlElement = this.pdfViewer.formDesignerModule.createHtmlElement('div', HtmlElementAttribute);
        if (currentData.formFieldAnnotationType === 'SignatureField' || currentData.formFieldAnnotationType === 'InitialField') {
            this.pdfViewer.formDesignerModule.disableSignatureClickEvent = true;
            element.template = htmlElement.appendChild(this.pdfViewer.formDesignerModule.
                createSignatureDialog(this.pdfViewer, signatureField, null, true));
            this.pdfViewer.formDesignerModule.disableSignatureClickEvent = false;
        }
        else if (currentData.formFieldAnnotationType === 'DropdownList') {
            element.template = htmlElement.appendChild(this.pdfViewer.formDesignerModule.createDropDownList(element, signatureField, true));
        }
        else if (currentData.formFieldAnnotationType === 'ListBox') {
            element.template = htmlElement.appendChild(this.pdfViewer.formDesignerModule.createListBox(element, signatureField, true));
        }
        else {
            element.template = htmlElement.appendChild(this.pdfViewer.formDesignerModule.
                createInputElement(currentData.formFieldAnnotationType, signatureField, null, true));
        }
        parentHtmlElement.appendChild(htmlElement);
        return htmlElement;
    };
    /**
     * @param {any} inputField - It describes about the input field
     * @param {any} bounds - It describes about the bounds
     * @param {any} font - It describes about the font
     * @param {number} heightRatio - It describes about the height ratio
     * @param {number} widthRatio - It describes about the width ratio
     * @param {boolean} isFormDesignerField - It describes about the isFormDesignerField
     * @param {number} zoomValue - It describes about the zoom value
     * @param {number} pageIndex - It describes about the page index value
     * @private
     * @returns {void}
     */
    Print.prototype.applyPosition = function (inputField, bounds, font, heightRatio, widthRatio, isFormDesignerField, zoomValue, pageIndex) {
        if (bounds) {
            var pageHeight = void 0;
            var left = void 0;
            var top_2;
            var width = void 0;
            var height = void 0;
            // This code changes is specific for form designer elements. https://syncfusion.atlassian.net/browse/EJ2-57986
            // eslint-disable-next-line
            var pageDetails = this.pdfViewerBase.pageSize[pageIndex];
            var actualWidth = pageDetails ? pageDetails.width : 0;
            var actualHeight = pageDetails ? pageDetails.height : 0;
            if (isFormDesignerField && actualHeight < actualWidth && this.pdfViewer.enablePrintRotation) {
                /*
                The below logig have been modified for the bug https://syncfusion.atlassian.net/browse/EJ2-57986
                This code changes is specific for form designer elements.
                pageHeight = actualWidth;
                top=  pageHeight - bounds.X / zoomValue;
                left = bounds.Y / zoomValue;
                width = (bounds.Width / zoomValue);
                height = (bounds.Height / zoomValue);
                inputField.style.transform = "rotate(-90deg)";
                inputField.style.transformOrigin = "top left";
                */
                // need to set inverse page height and width
                pageHeight = actualWidth;
                top_2 = pageHeight - bounds.X / zoomValue - bounds.Height / zoomValue;
                left = (bounds.Y + bounds.Height) / zoomValue;
                width = (bounds.Width / zoomValue);
                height = (bounds.Height / zoomValue);
                inputField.style.transform = 'rotate(-90deg)';
                inputField.style.transformOrigin = 'left bottom';
            }
            else {
                left = isFormDesignerField ? (bounds.X / zoomValue) / widthRatio :
                    (this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.X)) / widthRatio;
                top_2 = isFormDesignerField ? (bounds.Y / zoomValue) / heightRatio :
                    (this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.Y)) / heightRatio;
                width = isFormDesignerField ? (bounds.Width / zoomValue) / widthRatio :
                    (this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.Width)) / widthRatio;
                height = isFormDesignerField ? (bounds.Height / zoomValue) / heightRatio :
                    (this.pdfViewer.formFieldsModule.ConvertPointToPixel(bounds.Height)) / heightRatio;
            }
            var fontHeight = 0;
            if (font !== null && font.Height) {
                inputField.style.fontFamily = font.Name;
                if (font.Italic) {
                    inputField.style.fontStyle = 'italic';
                }
                if (font.Bold) {
                    inputField.style.fontWeight = 'Bold';
                }
                fontHeight = this.pdfViewerBase.ConvertPointToPixel(font.Size);
            }
            if (Browser.isIE) {
                top_2 = top_2 - 1;
            }
            this.pdfViewerBase.setStyleToTextDiv(inputField, left, top_2, fontHeight, width, height, true);
        }
    };
    Print.prototype.printWindowOpen = function () {
        var _this = this;
        var browserUserAgent = navigator.userAgent;
        var printDocument;
        if (this.pdfViewer.printMode === 'Default') {
            printDocument = this.frameDoc.document;
        }
        else {
            printDocument = this.printWindow.document;
        }
        for (var i = 0; i < this.printViewerContainer.children.length; i++) {
            /*
            Create a new Base64-encoded image with increased quality
            Also help to reduce the file size while save as pdf
            */
            var canvasUrl = this.printViewerContainer.children[parseInt(i.toString(), 10)].toDataURL('image/jpeg');
            printDocument.write('<div style="margin:0mm;width:' + this.printWidth.toString() + 'px;height:' + this.printHeight.toString() + 'px;position:relative"><img src="' + canvasUrl + '" id="' + 'image_' + i + '" /><div id="' + 'fields_' + i + '" style="margin:0px;top:0px;left:0px;position:absolute;width:' + this.printWidth.toString() + 'px;height:' + this.printHeight.toString() + 'px;z-index:2"></div></div>');
            if (this.pdfViewer.formFieldsModule || this.pdfViewer.formDesignerModule) {
                var pageWidth = this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].width;
                var pageHeight = this.pdfViewerBase.pageSize[parseInt(i.toString(), 10)].height;
                var heightRatio = void 0;
                var widthRatio = void 0;
                if ((pageHeight < pageWidth) && this.pdfViewer.enablePrintRotation) {
                    heightRatio = pageHeight / this.printWidth;
                    widthRatio = pageWidth / this.printHeight;
                }
                else {
                    heightRatio = pageHeight / this.printHeight;
                    widthRatio = pageWidth / this.printWidth;
                }
                this.renderFieldsForPrint(i, heightRatio, widthRatio);
            }
            if (i === 0) {
                if ((browserUserAgent.indexOf('Chrome') !== -1) || (browserUserAgent.indexOf('Safari') !== -1) ||
                    (browserUserAgent.indexOf('Firefox')) !== -1) {
                    printDocument.write('<!DOCTYPE html>');
                    printDocument.write('<html moznomarginboxes mozdisallowselectionprint><head><style>html, body { height: 100%; width:100% }'
                        + ' img { height: 100%; width: 100%; display: block; }@media print { body { margin: 0cm; }'
                        + ' img { width:100%; width:100%; box-sizing: border-box; }br, button { display: none; }'
                        + ' div{ page-break-inside: avoid; }} @page{margin:0mm;  size:' + this.printWidth.toString() + 'px ' + this.printHeight.toString() + 'px; }</style></head><body>');
                }
                else {
                    printDocument.write('<!DOCTYPE html>');
                    printDocument.write('<html><head>'
                        + '<style>html, body { height: 100%; } img { height: 100%; width: 100%; }@media print { body { margin: 0cm; }'
                        + 'img { width:100%; width:100%; box-sizing: border-box; }br, button { display: none; } '
                        + 'div{ page-break-inside: avoid; }} @page{margin:0mm;  size:' + this.printWidth.toString() + 'px ' + this.printHeight.toString() + 'px; }</style></head><body>');
                }
            }
        }
        if (Browser.isIE || Browser.info.name === 'edge') {
            try {
                if (this.pdfViewer.printMode === 'Default') {
                    this.pdfViewerBase.showPrintLoadingIndicator(false);
                    this.iframe.contentWindow.document.execCommand('print', false, null);
                }
                else {
                    this.printWindow.document.execCommand('print', false, null);
                }
            }
            catch (e) {
                if (this.pdfViewer.printMode === 'Default') {
                    this.pdfViewerBase.showPrintLoadingIndicator(false);
                    this.iframe.contentWindow.print();
                }
                else {
                    this.printWindow.print();
                }
            }
        }
        else {
            setTimeout(function () {
                if (_this.pdfViewer.printMode === 'Default') {
                    _this.pdfViewerBase.showPrintLoadingIndicator(false);
                    _this.iframe.contentWindow.print();
                    _this.iframe.contentWindow.focus();
                    if (_this.pdfViewerBase.isDeviceiOS || Browser.isDevice) {
                        // eslint-disable-next-line
                        var proxy_1 = _this;
                        window.onafterprint = function () {
                            document.body.removeChild(proxy_1.iframe);
                        };
                    }
                    else {
                        document.body.removeChild(_this.iframe);
                    }
                }
                else {
                    if (_this.printWindow) {
                        _this.printWindow.print();
                        _this.printWindow.focus();
                        if (!Browser.isDevice || _this.pdfViewerBase.isDeviceiOS) {
                            _this.printWindow.close();
                        }
                    }
                }
            }, 200);
        }
    };
    Print.prototype.createPrintLoadingIndicator = function (element) {
        var printWindowContainer = createElement('div', {
            id: this.pdfViewer.element.id + '_printWindowcontainer'
        });
        printWindowContainer.style.height = '100%';
        printWindowContainer.style.width = '100%';
        printWindowContainer.style.position = 'absolute';
        printWindowContainer.style.zIndex = 2000;
        printWindowContainer.style.left = 0;
        printWindowContainer.style.top = 0;
        printWindowContainer.style.overflow = 'auto';
        printWindowContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        element.appendChild(printWindowContainer);
        var printWaitingPopup = createElement('div', {
            id: this.pdfViewer.element.id + '_printLoadingContainer'
        });
        printWaitingPopup.style.position = 'absolute';
        printWaitingPopup.style.width = '50px';
        printWaitingPopup.style.height = '50px';
        printWaitingPopup.style.left = '46%';
        printWaitingPopup.style.top = '45%';
        printWindowContainer.style.zIndex = 3000;
        printWindowContainer.appendChild(printWaitingPopup);
        var printImageContainer = new Image();
        printImageContainer.src = 'data:image/gif;base64,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';
        printImageContainer.style.width = '50px';
        printImageContainer.style.height = '50px';
        printWaitingPopup.appendChild(printImageContainer);
        var printLabelContainer = createElement('div', {
            id: this.pdfViewer.element.id + '_printLabelContainer'
        });
        printLabelContainer.style.position = 'absolute';
        printLabelContainer.textContent = 'Loading ...';
        printLabelContainer.style.fontWeight = 'Bold';
        printLabelContainer.style.left = '46%';
        printLabelContainer.style.top = '54.5%';
        printLabelContainer.style.zIndex = '3000';
        printWindowContainer.appendChild(printLabelContainer);
    };
    /**
     * @private
     * @returns {void}
     */
    Print.prototype.destroy = function () {
        this.printViewerContainer = undefined;
        this.frameDoc = undefined;
        this.printWindow = undefined;
    };
    /**
     * @private
     * @returns {string} - string
     */
    Print.prototype.getModuleName = function () {
        return 'Print';
    };
    return Print;
}());
export { Print };
