import { PdfViewerBase } from '../index';
import { createElement, isNullOrUndefined, isBlazor, SanitizeHtmlHelper, Browser } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-popups';
import { splitArrayCollection, processPathData, getPathString } from '@syncfusion/ej2-drawings';
import { TextBox } from '@syncfusion/ej2-inputs';
import { cloneObject } from '../drawing/drawing-util';
import { CheckBox } from '@syncfusion/ej2-buttons';
import { Tab } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { DisplayMode } from './types';
/* eslint-disable valid-jsdoc */
/**
 *
 * @param {Event} e - The event object.
 * @param {any} args - Additional arguments passed to the event handler.
 * @hidden
 * @returns {void}
 */
var Signature = /** @class */ (function () {
    /**
     * Initialize the constructor of blazorUIadapater.
     *
     * @private
     * @param { PdfViewer } pdfViewer - Specified PdfViewer class.
     * @param { PdfViewerBase } pdfViewerBase - The pdfViewerBase.
     */
    function Signature(pdfViewer, pdfViewerBase) {
        var _this = this;
        this.mouseMoving = true;
        this.canvasTouched = false;
        this.imageSignatureDataUrl = '';
        this.drawSignatureDataUrl = '';
        this.newObject = [];
        /**
         * @private
         */
        this.outputString = '';
        /**
         * @private
         */
        this.drawOutputString = '';
        /**
         * @private
         */
        this.imageOutputString = '';
        /**
         * @private
         */
        this.signaturecollection = [];
        /**
         * @private
         */
        this.outputcollection = [];
        /**
         * @private
         */
        this.signAnnotationIndex = [];
        this.fontsign = [];
        this.signfontStyle = [];
        this.isSaveSignature = false;
        this.isSaveInitial = false;
        this.isInitialFiledSaveSignature = false;
        this.isSignatureFieldsSaveSignature = false;
        this.issaveTypeSignature = false;
        this.issaveImageSignature = false;
        this.issaveTypeInitial = false;
        this.issaveImageInitial = false;
        this.saveSignatureTypeString = '';
        this.saveInitialTypeString = '';
        this.saveTypeString = '';
        this.signatureTypeString = '';
        this.initialTypeString = '';
        this.saveUploadString = '';
        this.saveSignatureUploadString = '';
        this.saveInitialUploadString = '';
        this.signatureUploadString = '';
        this.initialUploadString = '';
        this.clearUploadString = false;
        this.textValue = '';
        this.signatureDrawString = '';
        this.initialDrawString = '';
        this.signatureTextContentTop = 0.2;
        this.signatureTextContentLeft = 0.7;
        this.saveSignatureString = '';
        this.saveInitialString = '';
        /**
         * @private
         */
        this.saveImageString = '';
        this.signatureFieldCollection = [];
        this.signatureImageString = '';
        this.initialImageString = '';
        /**
         * @private
         */
        this.maxSaveLimit = 5;
        this.select = function (e) {
            if (this.canvasTouched) {
                this.mouseMoving = true;
                this.canvasTouched = false;
            }
            if (e.isSwiped && this.signaturetype === 'Draw' && this.mouseMoving) {
                e.cancel = true;
                this.mouseMoving = false;
            }
        };
        this.addStampImage = function (args) {
            // eslint-disable-next-line
            var proxy = _this;
            var upoadedFiles = args.target.files;
            if (args.target.files[0] !== null) {
                var uploadedFile = upoadedFiles[0];
                if (uploadedFile.type.split('/')[0] === 'image') {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var canvas = document.getElementById(_this.pdfViewer.element.id + '_signatureuploadCanvas_');
                        var context = canvas.getContext('2d');
                        var image = new Image();
                        // eslint-disable-next-line
                        var proxy = _this;
                        image.onload = function () {
                            var signbutton = document.getElementById(_this.pdfViewer.element.id + '_e-pv-upload-button');
                            signbutton.style.visibility = 'hidden';
                            context.drawImage(image, 0, 0, canvas.width, canvas.height);
                            proxy.enableCreateButton(false);
                            proxy.outputString = image.src;
                            proxy.signatureImageHeight = image.naturalHeight;
                            proxy.signatureImageWidth = image.naturalWidth;
                        };
                        image.src = e.currentTarget.result;
                        proxy.outputString = e.currentTarget.result;
                        proxy.switchTabImageSignature = e.currentTarget.result;
                    };
                    reader.readAsDataURL(uploadedFile);
                }
            }
            args.target.value = '';
            args.currentTarget.value = '';
        };
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @private
     * @returns {void}
     */
    Signature.prototype.createSignaturePanel = function () {
        var _this = this;
        var maximumWidth = 750;
        this.imageSignatureDataUrl = '';
        this.drawSignatureDataUrl = '';
        if (!isBlazor()) {
            var elementID = this.pdfViewer.element.id;
            var dialogDiv = createElement('div', { id: elementID + '_signature_window', className: 'e-pv-signature-window' });
            dialogDiv.style.display = 'block';
            this.pdfViewerBase.pageContainer.appendChild(dialogDiv);
            var appearanceTab = this.createSignatureCanvas();
            var signaturePanelHeader = void 0;
            if (!this.pdfViewerBase.isToolbarSignClicked) {
                if (this.pdfViewerBase.isInitialField) {
                    signaturePanelHeader = this.pdfViewer.localeObj.getConstant('HandwrittenInitialDialogHeaderText');
                }
                else {
                    signaturePanelHeader = this.pdfViewer.localeObj.getConstant('HandwrittenSignatureDialogHeaderText');
                }
            }
            else {
                if (this.pdfViewerBase.isInitialField) {
                    signaturePanelHeader = this.pdfViewer.localeObj.getConstant('InitialFieldDialogHeaderText');
                }
                else {
                    signaturePanelHeader = this.pdfViewer.localeObj.getConstant('SignatureFieldDialogHeaderText');
                }
            }
            if (this.signatureDialog) {
                this.signatureDialog.content = appearanceTab;
            }
            else {
                this.signatureDialog = new Dialog({
                    showCloseIcon: true, closeOnEscape: false, isModal: true, header: signaturePanelHeader, cssClass: 'e-pv-signature-dialog-height',
                    target: this.pdfViewerBase.mainContainer, content: appearanceTab, width: '750px', visible: true, allowDragging: true,
                    beforeClose: function () {
                        _this.clearSignatureCanvas();
                        _this.signatureDialog.destroy();
                        _this.signatureDialog = null;
                        if (_this.tabObj) {
                            _this.tabObj.destroy();
                        }
                        var signatureWindow = document.getElementById(_this.pdfViewer.element.id + '_signature_window');
                        if (signatureWindow) {
                            if (signatureWindow.parentNode) {
                                signatureWindow.parentNode.removeChild(signatureWindow);
                            }
                            else {
                                signatureWindow.parentElement.removeChild(signatureWindow);
                            }
                        }
                        if (!_this.pdfViewerBase.isToolbarSignClicked && !_this.pdfViewerBase.drawSignatureWithTool &&
                            !isNullOrUndefined(_this.pdfViewer.formFieldsModule.currentTarget)) {
                            _this.pdfViewer.fireFocusOutFormField(_this.pdfViewer.formFieldsModule.currentTarget.name, '');
                        }
                        _this.pdfViewerBase.isToolbarSignClicked = false;
                        _this.setFocus();
                    }
                });
                this.signatureDialog.buttons = [
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Clear'), disabled: true, cssClass: 'e-pv-clearbtn' }, click: this.clearSignatureCanvas.bind(this) },
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Cancel'), cssClass: 'e-pv-cancelbtn' }, click: this.closeSignaturePanel.bind(this) },
                    { buttonModel: { content: this.pdfViewer.localeObj.getConstant('Create'), isPrimary: true, disabled: true, cssClass: 'e-pv-createbtn' }, click: this.addSignatureInPage.bind(this) }
                ];
                this.signatureDialog.appendTo(dialogDiv);
            }
            if (this.pdfViewer.element.offsetWidth < maximumWidth) {
                this.updateCanvasSize();
            }
            if (this.pdfViewer.enableRtl) {
                this.signatureDialog.enableRtl = this.pdfViewer.enableRtl;
            }
            var checkboxItem = this.signatureDialog.content.ej2_instances[0].items[0];
            if (checkboxItem.header.label === 'DRAW') {
                var drawCheckbox = document.getElementById('checkbox');
                this.hideSignatureCheckbox(drawCheckbox);
            }
            else if (checkboxItem.header.label === 'TYPE') {
                var typeCheckbox = document.getElementById('checkbox1');
                this.hideSignatureCheckbox(typeCheckbox);
            }
            else {
                var imageCheckbox = document.getElementById('checkbox2');
                this.hideSignatureCheckbox(imageCheckbox);
            }
            this.setSignatureCanvasWidth();
        }
        else {
            var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
            if (canvas) {
                if (!this.pdfViewerBase.pageContainer.querySelector('.e-pv-signature-window')) {
                    var elementID = this.pdfViewer.element.id;
                    var dialogDiv = createElement('div', { id: elementID + '_signature_window', className: 'e-pv-signature-window' });
                    dialogDiv.style.display = 'block';
                    this.pdfViewerBase.pageContainer.appendChild(dialogDiv);
                }
                canvas.addEventListener('mousedown', this.signaturePanelMouseDown.bind(this));
                canvas.addEventListener('mousemove', this.signaturePanelMouseMove.bind(this));
                canvas.addEventListener('mouseup', this.signaturePanelMouseUp.bind(this));
                canvas.addEventListener('mouseleave', this.signaturePanelMouseUp.bind(this));
                canvas.addEventListener('touchstart', this.signaturePanelMouseDown.bind(this));
                canvas.addEventListener('touchmove', this.signaturePanelMouseMove.bind(this));
                canvas.addEventListener('touchend', this.signaturePanelMouseUp.bind(this));
                this.clearSignatureCanvas();
            }
            this.pdfViewer._dotnetInstance.invokeMethodAsync('OpenSignaturePanel', this.pdfViewerBase.isToolbarSignClicked);
        }
        this.drawSavedSignature();
    };
    Signature.prototype.setSignatureCanvasWidth = function () {
        var appearanceElement = document.getElementById(this.pdfViewer.element.id + 'Signature_appearance');
        if (appearanceElement) {
            var apperanceTabWidth = appearanceElement.clientWidth;
            var pathcanvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
            if (pathcanvas) {
                pathcanvas.width = apperanceTabWidth;
                pathcanvas.style.width = apperanceTabWidth + 'px';
            }
            var uploadCanvas = document.getElementById(this.pdfViewer.element.id + '_signatureuploadCanvas_');
            if (uploadCanvas) {
                uploadCanvas.width = apperanceTabWidth;
                uploadCanvas.style.width = apperanceTabWidth + 'px';
            }
            var textDiv = document.getElementById(this.pdfViewer.element.id + '_font_appearance');
            if (textDiv) {
                textDiv.width = apperanceTabWidth;
                textDiv.style.width = apperanceTabWidth + 'px';
            }
        }
    };
    Signature.prototype.drawSavedSignature = function () {
        if (!this.pdfViewerBase.isToolbarSignClicked && (this.isSaveSignature || this.isSaveInitial)) {
            if (!this.pdfViewerBase.isInitialField && this.isSaveSignature) {
                this.outputString = this.saveSignatureString;
            }
            else if (this.pdfViewerBase.isInitialField && this.isSaveInitial) {
                this.outputString = this.saveInitialString;
            }
            var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
            var context_1 = canvas.getContext('2d');
            var image_1 = new Image();
            image_1.onload = function () {
                context_1.drawImage(image_1, 0, 0);
            };
            if (!this.pdfViewerBase.isInitialField && this.isSaveSignature) {
                image_1.src = this.signatureDrawString;
            }
            else if (this.pdfViewerBase.isInitialField && this.isSaveInitial) {
                image_1.src = this.initialDrawString;
            }
            var checkbox = document.getElementById(this.pdfViewer.element.id + '_signatureCheckBox');
            if (checkbox) {
                checkbox.checked = true;
            }
            this.enableCreateButton(false);
            this.enableClearbutton(false);
        }
    };
    Signature.prototype.drawSavedTypeSignature = function () {
        var output = '';
        if (!this.pdfViewerBase.isToolbarSignClicked && (this.issaveTypeSignature || this.issaveTypeInitial)) {
            if (!this.pdfViewerBase.isInitialField && this.issaveTypeSignature) {
                output = this.saveSignatureTypeString;
            }
            else {
                output = this.saveInitialTypeString;
            }
        }
        return output;
    };
    Signature.prototype.drawSavedImageSignature = function () {
        var output = '';
        if (!this.pdfViewerBase.isToolbarSignClicked && (this.issaveImageSignature || this.issaveImageInitial)) {
            if (!this.pdfViewerBase.isInitialField && this.issaveImageSignature) {
                output = this.saveSignatureUploadString;
            }
            else {
                output = this.saveInitialUploadString;
            }
        }
        return output;
    };
    Signature.prototype.hideSignatureCheckbox = function (checkbox) {
        if (this.pdfViewerBase.isToolbarSignClicked) {
            if (this.pdfViewerBase.isInitialField) {
                if (this.pdfViewer.handWrittenSignatureSettings.initialDialogSettings &&
                    this.pdfViewer.handWrittenSignatureSettings.initialDialogSettings.hideSaveSignature) {
                    this.hideCheckboxParent(checkbox);
                }
            }
            else if (this.pdfViewer.handWrittenSignatureSettings.signatureDialogSettings &&
                this.pdfViewer.handWrittenSignatureSettings.signatureDialogSettings.hideSaveSignature) {
                this.hideCheckboxParent(checkbox);
            }
        }
        else {
            if (this.pdfViewerBase.isInitialField) {
                if (this.pdfViewer.initialFieldSettings.initialDialogSettings &&
                    this.pdfViewer.initialFieldSettings.initialDialogSettings.hideSaveSignature) {
                    this.hideCheckboxParent(checkbox);
                }
            }
            else {
                if (this.pdfViewer.signatureFieldSettings.signatureDialogSettings &&
                    this.pdfViewer.signatureFieldSettings.signatureDialogSettings.hideSaveSignature) {
                    this.hideCheckboxParent(checkbox);
                }
            }
        }
    };
    Signature.prototype.saveSignatureCheckbox = function () {
        if (this.pdfViewerBase.isToolbarSignClicked) {
            return false;
        }
        else {
            if (this.pdfViewerBase.isInitialField) {
                if (this.pdfViewer.initialFieldSettings.initialDialogSettings &&
                    this.pdfViewer.initialFieldSettings.initialDialogSettings.hideSaveSignature) {
                    return false;
                }
                else {
                    return this.isInitialFiledSaveSignature;
                }
            }
            else {
                if (this.pdfViewer.signatureFieldSettings.signatureDialogSettings &&
                    this.pdfViewer.signatureFieldSettings.signatureDialogSettings.hideSaveSignature) {
                    return false;
                }
                else {
                    return this.isSignatureFieldsSaveSignature;
                }
            }
        }
    };
    Signature.prototype.hideCheckboxParent = function (checkbox) {
        if (checkbox) {
            checkbox.parentElement.style.display = 'none';
        }
    };
    Signature.prototype.saveSignatureImage = function () {
        var checkbox = document.getElementById(this.pdfViewer.element.id + '_signatureCheckBox');
        if (checkbox && checkbox.checked) {
            if (this.outputString !== '') {
                if (!this.pdfViewerBase.isInitialField) {
                    this.isSaveSignature = true;
                    this.saveSignatureString = this.outputString;
                }
                else {
                    this.isSaveInitial = true;
                    this.saveInitialString = this.outputString;
                }
                var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
                this.saveImageString = canvas.toDataURL();
                if (!this.pdfViewerBase.isInitialField) {
                    this.signatureImageString = this.saveImageString;
                }
                else {
                    this.initialImageString = this.saveImageString;
                }
            }
        }
        else {
            if (this.isSaveSignature && !this.pdfViewerBase.isInitialField) {
                this.isSaveSignature = false;
                this.saveSignatureString = '';
                this.saveImageString = '';
                this.signatureImageString = '';
            }
            else if (this.isSaveInitial && this.pdfViewerBase.isInitialField) {
                this.isSaveInitial = false;
                this.saveInitialString = '';
                this.saveImageString = '';
                this.initialImageString = '';
            }
            this.clearSignatureCanvas();
        }
    };
    /**
     * @param {any} type - It describes about the type
     * @private
     * @returns {void}
     */
    Signature.prototype.addSignature = function (type) {
        var annot;
        if (this.pdfViewerBase.isToolbarSignClicked) {
            var annotationName = this.pdfViewer.annotation.createGUID();
            this.pdfViewerBase.currentSignatureAnnot = null;
            this.pdfViewerBase.isSignatureAdded = true;
            var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
            var thickness = this.pdfViewer.handWrittenSignatureSettings.thickness ?
                this.pdfViewer.handWrittenSignatureSettings.thickness : 1;
            var opacity = this.pdfViewer.handWrittenSignatureSettings.opacity ?
                this.pdfViewer.handWrittenSignatureSettings.opacity : 1;
            var strokeColor = this.pdfViewer.handWrittenSignatureSettings.strokeColor ? this.pdfViewer.handWrittenSignatureSettings.strokeColor : '#000000';
            var fontSize = 16;
            var fontFamily = 'Helvetica';
            var signatureBounds = this.updateSignatureAspectRatio(this.outputString, true);
            var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
            this.saveImageString = canvas.toDataURL();
            if (!this.pdfViewerBase.isInitialField) {
                this.signatureImageString = this.saveImageString;
            }
            else {
                this.initialImageString = this.saveImageString;
            }
            annot = {
                id: 'sign' + this.pdfViewerBase.signatureCount, bounds: signatureBounds, pageIndex: pageIndex, data: this.outputString, fontFamily: fontFamily, fontSize: fontSize,
                shapeAnnotationType: 'HandWrittenSignature', opacity: opacity, strokeColor: strokeColor, thickness: thickness, signatureName: annotationName
            };
            this.pdfViewerBase.currentSignatureAnnot = annot;
            var checkbox = void 0;
            if (isBlazor()) {
                checkbox = document.getElementById(this.pdfViewer.element.id + '_signatureCheckBox');
            }
            else {
                checkbox = document.getElementById('checkbox');
            }
            if (checkbox && checkbox.checked) {
                this.addSignatureCollection();
            }
            this.hideSignaturePanel();
            this.pdfViewerBase.isToolbarSignClicked = false;
        }
        else {
            var checkbox = document.getElementById('checkbox');
            var typeCheckbox = document.getElementById('checkbox1');
            var imageCheckbox = document.getElementById('checkbox2');
            var isSignatureAdded = false;
            if (!isSignatureAdded) {
                var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
                this.saveImageString = canvas.toDataURL();
                if (checkbox) {
                    if (checkbox.checked) {
                        if (!this.pdfViewerBase.isInitialField) {
                            this.isSaveSignature = true;
                            this.signatureDrawString = this.saveImageString;
                            this.saveSignatureString = this.outputString;
                        }
                        else {
                            this.isSaveInitial = true;
                            this.initialDrawString = this.saveImageString;
                            this.saveInitialString = this.outputString;
                        }
                        this.checkSaveFiledSign(this.pdfViewerBase.isInitialField, true);
                    }
                    else {
                        if (!this.pdfViewerBase.isInitialField) {
                            this.isSaveSignature = false;
                            this.saveSignatureString = '';
                        }
                        else {
                            this.isSaveInitial = false;
                            this.saveInitialString = '';
                        }
                        this.checkSaveFiledSign(this.pdfViewerBase.isInitialField, false);
                    }
                }
                this.saveTypeSignature(typeCheckbox);
                this.saveUploadSignature(imageCheckbox);
                if (!this.pdfViewerBase.isInitialField) {
                    this.signatureImageString = this.saveImageString;
                }
                else {
                    this.initialImageString = this.saveImageString;
                }
                this.pdfViewer.formFieldsModule.drawSignature(null, null, this.pdfViewerBase.currentTarget, null);
                isSignatureAdded = true;
            }
        }
    };
    /**
     * @param {any} data - It describes about the data
     * @param {boolean} isSignature - It describes about the whether the isSignature is true or not
     * @param {any} currentField - It describes about the current field
     * @param {any} currentData - It describes about the current data
     * @private
     * @returns {any} - any
     */
    Signature.prototype.updateSignatureAspectRatio = function (data, isSignature, currentField, currentData) {
        var collectionData = processPathData(data);
        var csData = splitArrayCollection(collectionData);
        var minimumX = -1;
        var minimumY = -1;
        var maximumX = -1;
        var maximumY = -1;
        var signatureCanvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        var signatureCavasWidth = 0;
        var signatureCavasHeight = 0;
        for (var m = 0; m < csData.length; m++) {
            var val = csData[parseInt(m.toString(), 10)];
            if (minimumX === -1) {
                minimumX = parseFloat(val['x'].toString());
                maximumX = parseFloat(val['x'].toString());
                minimumY = parseFloat(val['y'].toString());
                maximumY = parseFloat(val['y'].toString());
            }
            else {
                var point1 = parseFloat(val['x'].toString());
                var point2 = parseFloat(val['y'].toString());
                if (minimumX >= point1) {
                    minimumX = point1;
                }
                if (minimumY >= point2) {
                    minimumY = point2;
                }
                if (maximumX <= point1) {
                    maximumX = point1;
                }
                if (maximumY <= point2) {
                    maximumY = point2;
                }
            }
        }
        signatureCavasWidth = signatureCanvas ? signatureCanvas.clientWidth : 650;
        signatureCavasHeight = signatureCanvas ? signatureCanvas.clientHeight : 300;
        var newdifferenceX = maximumX - minimumX;
        var newdifferenceY = maximumY - minimumY;
        var signBounds = this.calculateSignatureBounds(signatureCavasWidth, signatureCavasHeight, newdifferenceX, newdifferenceY, isSignature, currentField, currentData);
        if (isSignature) {
            var zoomvalue = this.pdfViewerBase.getZoomFactor();
            var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + pageIndex);
            var currentLeft = ((parseFloat(pageDiv.style.width) / 2) - (signBounds.currentWidth / 2)) / zoomvalue;
            var currentTop = ((parseFloat(pageDiv.style.height) / 2) - (signBounds.currentHeight / 2)) / zoomvalue;
            return { x: currentLeft, y: currentTop, width: signBounds.currentWidth, height: signBounds.currentHeight };
        }
        else {
            return { left: signBounds.currentLeftDiff, top: signBounds.currentTopDiff, width: signBounds.currentWidth,
                height: signBounds.currentHeight };
        }
    };
    Signature.prototype.calculateSignatureBounds = function (signatureCavasWidth, signatureCavasHeight, newdifferenceX, newdifferenceY, isSignature, currentField, currentData) {
        var ratioX = newdifferenceX / signatureCavasWidth;
        var ratioY = newdifferenceY / signatureCavasHeight;
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        var currentWidth = 0;
        var currentHeight = 0;
        var isSignatureStretched = false;
        var isHeightStretched = false;
        var leftDifference = 0;
        var topDifference = 0;
        if (isSignature) {
            currentWidth = this.pdfViewer.handWrittenSignatureSettings.width ? this.pdfViewer.handWrittenSignatureSettings.width : 150;
            currentHeight = this.pdfViewer.handWrittenSignatureSettings.height ? this.pdfViewer.handWrittenSignatureSettings.height : 100;
        }
        else {
            var fieldWidth = currentField ? currentField.style.width === '100%' ? currentField.clientWidth : parseFloat(currentField.style.width) : this.ConvertPointToPixel(currentData.LineBounds.Width);
            var fieldHeight = currentField ? currentField.style.height === '100%' ? currentField.clientHeight : parseFloat(currentField.style.height) : this.ConvertPointToPixel(currentData.LineBounds.Height);
            var fieldWidthRatio = fieldWidth / fieldHeight;
            var fieldHeightRatio = fieldHeight / fieldWidth;
            var canvasWidthRatio = signatureCavasWidth / signatureCavasHeight;
            var canvasHeightRatio = signatureCavasHeight / signatureCavasWidth;
            var fieldRotation = currentField ? currentField.offsetParent.offsetParent.style.transform ?
                currentField.offsetParent.offsetParent.style.transform : currentField.style.transform : currentData.RotationAngle;
            if ((fieldWidthRatio > canvasWidthRatio) || (fieldHeightRatio > canvasWidthRatio) ||
                ((Math.abs(fieldWidthRatio - fieldHeightRatio)) <= 1)) {
                var ratioDifference = 0;
                if ((fieldHeightRatio > canvasWidthRatio) || ((Math.abs(fieldWidthRatio - fieldHeightRatio)) <= 1)) {
                    isHeightStretched = true;
                    ratioDifference = fieldHeightRatio / canvasHeightRatio;
                }
                else {
                    isSignatureStretched = true;
                    ratioDifference = fieldWidthRatio / canvasWidthRatio;
                }
                if (fieldRotation === 'rotate(90deg)' || fieldRotation === 'rotate(270deg)') {
                    currentWidth = fieldHeight / zoomvalue;
                    currentHeight = fieldWidth / zoomvalue;
                }
                else {
                    if (isSignatureStretched) {
                        leftDifference = fieldWidth / zoomvalue;
                        currentWidth = (fieldWidth / ratioDifference) / zoomvalue;
                        currentHeight = fieldHeight / zoomvalue;
                    }
                    if (isHeightStretched) {
                        topDifference = fieldHeight / zoomvalue;
                        currentWidth = fieldWidth / zoomvalue;
                        currentHeight = (fieldHeight / ratioDifference) / zoomvalue;
                    }
                }
            }
            else {
                if (fieldRotation === 'rotate(90deg)' || fieldRotation === 'rotate(270deg)') {
                    currentWidth = fieldHeight / zoomvalue;
                    currentHeight = fieldWidth / zoomvalue;
                }
                else {
                    currentWidth = fieldWidth / zoomvalue;
                    currentHeight = fieldHeight / zoomvalue;
                }
            }
        }
        var currentLeftDiff = (signatureCavasWidth - newdifferenceX) / 2;
        var currentTopDiff = (signatureCavasHeight - newdifferenceY) / 2;
        if (isSignatureStretched) {
            currentLeftDiff = (currentLeftDiff / signatureCavasWidth) * leftDifference;
            var leftValueDiff = ((leftDifference * ratioX) - (currentWidth * ratioX)) / 2;
            currentLeftDiff = currentLeftDiff + leftValueDiff;
            currentTopDiff = (currentTopDiff / signatureCavasHeight) * currentHeight;
        }
        else if (isHeightStretched) {
            currentLeftDiff = (currentLeftDiff / signatureCavasWidth) * currentWidth;
            currentTopDiff = (currentTopDiff / signatureCavasHeight) * topDifference;
            var topValueDiff = ((topDifference * ratioY) - (currentHeight * ratioY)) / 2;
            currentTopDiff = currentTopDiff + topValueDiff;
        }
        else {
            currentLeftDiff = (currentLeftDiff / signatureCavasWidth) * currentWidth;
            currentTopDiff = (currentTopDiff / signatureCavasHeight) * currentHeight;
        }
        if (this.pdfViewer.signatureFitMode !== 'Stretch') {
            currentWidth = currentWidth * ratioX;
            currentHeight = currentHeight * ratioY;
        }
        return { currentLeftDiff: currentLeftDiff, currentTopDiff: currentTopDiff, currentWidth: currentWidth,
            currentHeight: currentHeight };
    };
    /**
     * @param {string} id - It describes about the id value
     * @private
     * @returns {void}
     */
    Signature.prototype.setFocus = function (id) {
        if (!id) {
            if (this.currentTarget) {
                document.getElementById(this.currentTarget.id).focus();
            }
        }
        else {
            this.removeFocus();
            var signatureElement = document.getElementById(id);
            signatureElement.classList.add('e-pv-signature-focus');
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Signature.prototype.removeFocus = function () {
        if (this.signatureFieldCollection) {
            var signatureFields = this.signatureFieldCollection;
            if (signatureFields.length === 0) {
                signatureFields = this.getSignField();
            }
            for (var i = 0; i < this.signatureFieldCollection.length; i++) {
                var signatureFieldId = this.pdfViewer.formDesignerModule ?
                    this.signatureFieldCollection[parseInt(i.toString(), 10)].FormField.uniqueID :
                    this.signatureFieldCollection[parseInt(i.toString(), 10)].uniqueID;
                var signatureElement = document.getElementById(signatureFieldId);
                if (signatureElement) {
                    signatureElement.classList.remove('e-pv-signature-focus');
                }
            }
            if (this.pdfViewer.formFieldsModule.currentTarget) {
                this.pdfViewer.formFieldsModule.currentTarget.classList.remove('e-pv-signature-focus');
            }
        }
    };
    Signature.prototype.getSignField = function () {
        if (this.pdfViewer.formDesignerModule) {
            this.signatureFieldCollection =
                this.pdfViewer.formDesignerModule.getFormDesignerSignField(this.signatureFieldCollection);
        }
        else {
            this.signatureFieldCollection = this.getFormFieldSignField();
        }
        return this.signatureFieldCollection;
    };
    Signature.prototype.getFormFieldSignField = function () {
        var data = this.pdfViewerBase.getItemFromSessionStorage('_formfields');
        var currentData;
        if (data) {
            var formFieldsData = JSON.parse(data);
            for (var i = 0; i < formFieldsData.length; i++) {
                currentData = formFieldsData[parseInt(i.toString(), 10)];
                if (currentData.Name === 'SignatureField' || currentData.Name === 'InitialField') {
                    currentData['uniqueID'] = this.pdfViewer.element.id + 'input_' + currentData.PageIndex + '_' + i;
                    this.signatureFieldCollection.push(formFieldsData[parseInt(i.toString(), 10)]);
                }
            }
        }
        return this.signatureFieldCollection;
    };
    Signature.prototype.checkSaveFiledSign = function (initialField, saveSign) {
        if (initialField) {
            this.isInitialFiledSaveSignature = saveSign;
        }
        else {
            this.isSignatureFieldsSaveSignature = saveSign;
        }
    };
    Signature.prototype.addSignatureInPage = function () {
        if (this.signaturetype === 'Draw') {
            this.addSignature();
        }
        else if (this.signaturetype === 'Type') {
            this.typeAddSignature();
        }
        else {
            this.imageAddSignature();
        }
        this.drawOutputString = '';
        this.imageOutputString = '';
    };
    Signature.prototype.typeAddSignature = function (type) {
        if (this.pdfViewerBase.isToolbarSignClicked) {
            var zoomvalue = this.pdfViewerBase.getZoomFactor();
            var annot = null;
            var annotationName = this.pdfViewer.annotation.createGUID();
            this.pdfViewerBase.currentSignatureAnnot = null;
            this.pdfViewerBase.isSignatureAdded = true;
            var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + pageIndex);
            var thickness = this.pdfViewer.handWrittenSignatureSettings.thickness ?
                this.pdfViewer.handWrittenSignatureSettings.thickness : 1;
            var opacity = this.pdfViewer.handWrittenSignatureSettings.opacity ?
                this.pdfViewer.handWrittenSignatureSettings.opacity : 1;
            var strokeColor = this.pdfViewer.handWrittenSignatureSettings.strokeColor ? this.pdfViewer.handWrittenSignatureSettings.strokeColor : '#000000';
            var fontSize = 16;
            var currentLeft = 0;
            var currentTop = 0;
            var currentHeight = 65;
            var currentWidth = 200;
            if (!isNullOrUndefined(this.pdfViewer.handWrittenSignatureSettings.height) && (this.pdfViewer.signatureFitMode === 'Stretch')) {
                currentHeight = this.pdfViewer.handWrittenSignatureSettings.height;
            }
            if (!isNullOrUndefined(this.pdfViewer.handWrittenSignatureSettings.width) && (this.pdfViewer.signatureFitMode === 'Stretch')) {
                currentWidth = this.pdfViewer.handWrittenSignatureSettings.width;
            }
            currentLeft = ((parseFloat(pageDiv.style.width) / 2) - (currentWidth / 2)) / zoomvalue;
            currentTop = ((parseFloat(pageDiv.style.height) / 2) - (currentHeight / 2)) / zoomvalue;
            var zoomFactor = this.pdfViewerBase.getZoomFactor();
            if (!this.signtypevalue) {
                this.updateSignatureTypeValue(true);
            }
            var inputValue = this.signtypevalue;
            if (this.pdfViewer.enableHtmlSanitizer && this.outputString) {
                this.outputString = SanitizeHtmlHelper.sanitize(this.outputString);
            }
            annot = {
                id: 'Typesign' + this.pdfViewerBase.signatureCount, bounds: {
                    left: currentLeft / zoomFactor, top: currentTop / zoomFactor, x: currentLeft / zoomFactor,
                    y: currentTop / zoomFactor, width: currentWidth, height: currentHeight
                }, pageIndex: pageIndex, dynamicText: inputValue, data: this.pdfViewerBase.signatureModule.outputString, shapeAnnotationType: 'SignatureText',
                opacity: opacity, strokeColor: strokeColor, thickness: thickness, fontSize: fontSize, fontFamily: this.fontName,
                signatureName: annotationName
            };
            this.pdfViewerBase.currentSignatureAnnot = annot;
            var checkbox = void 0;
            if (isBlazor()) {
                checkbox = document.getElementById(this.pdfViewer.element.id + '_signatureCheckBox');
            }
            else {
                checkbox = document.getElementById('checkbox1');
            }
            if (checkbox && checkbox.checked) {
                this.addSignatureCollection();
            }
            this.signtypevalue = '';
            this.hideSignaturePanel();
            this.pdfViewerBase.isToolbarSignClicked = false;
        }
        else {
            var checkbox = document.getElementById('checkbox');
            var typeCheckbox = document.getElementById('checkbox1');
            var imageCheckbox = document.getElementById('checkbox2');
            var isSignatureAdded = false;
            if (!isSignatureAdded) {
                this.saveDrawSignature(checkbox);
                this.saveUploadSignature(imageCheckbox);
                var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
                if (canvas) {
                    this.saveTypeString = canvas.toDataURL();
                }
                this.updateSignatureTypeValue();
                if (this.pdfViewer.enableHtmlSanitizer && this.textValue) {
                    this.textValue = SanitizeHtmlHelper.sanitize(this.textValue);
                }
                if (typeCheckbox && typeCheckbox.checked) {
                    if (!this.pdfViewerBase.isInitialField) {
                        this.isSaveSignature = true;
                        this.signatureImageString = this.saveTypeString;
                        this.saveSignatureTypeString = this.textValue;
                        this.issaveTypeSignature = true;
                    }
                    else {
                        this.isSaveInitial = true;
                        this.initialImageString = this.saveTypeString;
                        this.saveInitialTypeString = this.textValue;
                        this.issaveTypeInitial = true;
                    }
                }
                else {
                    if (!this.pdfViewerBase.isInitialField) {
                        this.isSaveSignature = false;
                        this.saveSignatureTypeString = '';
                        this.issaveTypeSignature = false;
                    }
                    else {
                        this.isSaveInitial = false;
                        this.saveInitialTypeString = '';
                        this.issaveTypeInitial = false;
                    }
                }
                if (!this.pdfViewerBase.isInitialField) {
                    this.signatureTypeString = this.saveTypeString;
                }
                else {
                    this.initialTypeString = this.saveTypeString;
                }
                this.pdfViewer.formFieldsModule.drawSignature('Type', this.textValue, this.pdfViewerBase.currentTarget);
                isSignatureAdded = true;
                this.hideSignaturePanel();
            }
        }
    };
    Signature.prototype.imageAddSignature = function (type) {
        if (this.pdfViewerBase.isToolbarSignClicked) {
            var zoomvalue = this.pdfViewerBase.getZoomFactor();
            var annot = null;
            var annotationName = this.pdfViewer.annotation.createGUID();
            this.pdfViewerBase.currentSignatureAnnot = null;
            this.pdfViewerBase.isSignatureAdded = true;
            var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + pageIndex);
            var thickness = this.pdfViewer.handWrittenSignatureSettings.thickness ?
                this.pdfViewer.handWrittenSignatureSettings.thickness : 1;
            var opacity = this.pdfViewer.handWrittenSignatureSettings.opacity ?
                this.pdfViewer.handWrittenSignatureSettings.opacity : 1;
            var strokeColor = this.pdfViewer.handWrittenSignatureSettings.strokeColor ? this.pdfViewer.handWrittenSignatureSettings.strokeColor : '#000000';
            var fontSize = 16;
            var currentLeft = 0;
            var currentTop = 0;
            var standardImageRatio = 100;
            var currentHeight = 0;
            var currentWidth = 0;
            if (this.pdfViewer.enableHtmlSanitizer && this.outputString) {
                this.outputString = SanitizeHtmlHelper.sanitize(this.outputString);
            }
            if (!isNullOrUndefined(this.pdfViewer.handWrittenSignatureSettings.height) && (this.pdfViewer.signatureFitMode === 'Stretch')) {
                currentHeight = this.pdfViewer.handWrittenSignatureSettings.height;
            }
            else if (this.signatureImageHeight >= this.signatureImageWidth) {
                currentHeight = ((this.signatureImageHeight / this.signatureImageHeight) * standardImageRatio);
            }
            else {
                currentHeight = ((this.signatureImageHeight / this.signatureImageWidth) * standardImageRatio);
            }
            if (!isNullOrUndefined(this.pdfViewer.handWrittenSignatureSettings.width) && (this.pdfViewer.signatureFitMode === 'Stretch')) {
                currentWidth = this.pdfViewer.handWrittenSignatureSettings.width;
            }
            else if (this.signatureImageHeight >= this.signatureImageWidth) {
                currentWidth = ((this.signatureImageWidth / this.signatureImageHeight) * standardImageRatio);
            }
            else {
                currentWidth = ((this.signatureImageWidth / this.signatureImageWidth) * standardImageRatio);
            }
            currentLeft = ((parseFloat(pageDiv.style.width) / 2) - (currentWidth / 2)) / zoomvalue;
            currentTop = ((parseFloat(pageDiv.style.height) / 2) - (currentHeight / 2)) / zoomvalue;
            var zoomFactor = this.pdfViewerBase.getZoomFactor();
            var inputValue = this.signtypevalue;
            annot = {
                id: 'Typesign' + this.pdfViewerBase.signatureCount, bounds: {
                    left: currentLeft / zoomFactor, top: currentTop / zoomFactor, x: currentLeft / zoomFactor,
                    y: currentTop / zoomFactor, width: currentWidth, height: currentHeight
                }, pageIndex: pageIndex, dynamicText: inputValue, data: this.pdfViewerBase.signatureModule.outputString, shapeAnnotationType: 'SignatureImage',
                opacity: opacity, strokeColor: strokeColor, thickness: thickness, fontSize: fontSize, fontFamily: this.fontName,
                signatureName: annotationName
            };
            this.pdfViewerBase.currentSignatureAnnot = annot;
            var checkbox = void 0;
            if (isBlazor()) {
                checkbox = document.getElementById(this.pdfViewer.element.id + '_signatureCheckBox');
            }
            else {
                checkbox = document.getElementById('checkbox2');
            }
            if (checkbox && checkbox.checked) {
                this.addSignatureCollection();
            }
            this.hideSignaturePanel();
            this.pdfViewerBase.isToolbarSignClicked = false;
        }
        else {
            var checkbox = document.getElementById('checkbox');
            var typeCheckbox = document.getElementById('checkbox1');
            var imageCheckbox = document.getElementById('checkbox2');
            var isSignatureAdded = false;
            if (!isSignatureAdded) {
                this.saveDrawSignature(checkbox);
                this.saveTypeSignature(typeCheckbox);
                var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
                if (canvas) {
                    this.saveUploadString = canvas.toDataURL();
                }
                if (this.pdfViewer.enableHtmlSanitizer && this.outputString) {
                    this.outputString = SanitizeHtmlHelper.sanitize(this.outputString);
                }
                if (imageCheckbox && imageCheckbox.checked) {
                    if (!this.pdfViewerBase.isInitialField) {
                        this.isSaveSignature = true;
                        this.signatureImageString = this.saveUploadString;
                        this.saveSignatureUploadString = this.outputString;
                        this.issaveImageSignature = true;
                    }
                    else {
                        this.isSaveInitial = true;
                        this.initialImageString = this.saveUploadString;
                        this.saveInitialUploadString = this.outputString;
                        this.issaveImageInitial = true;
                    }
                }
                else {
                    if (!this.pdfViewerBase.isInitialField) {
                        this.isSaveSignature = false;
                        this.saveSignatureUploadString = '';
                        this.issaveImageSignature = false;
                    }
                    else {
                        this.isSaveInitial = false;
                        this.saveInitialUploadString = '';
                        this.issaveImageInitial = false;
                    }
                }
                if (!this.pdfViewerBase.isInitialField) {
                    this.signatureUploadString = this.saveUploadString;
                }
                else {
                    this.initialUploadString = this.saveUploadString;
                }
                this.pdfViewer.formFieldsModule.drawSignature('Image', '', this.pdfViewerBase.currentTarget);
                isSignatureAdded = true;
                this.hideSignaturePanel();
            }
        }
    };
    Signature.prototype.saveDrawSignature = function (checkbox) {
        if (checkbox) {
            if (checkbox.checked) {
                if (this.drawOutputString !== '') {
                    var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
                    this.saveImageString = canvas.toDataURL();
                    if (!this.pdfViewerBase.isInitialField) {
                        this.saveSignatureString = this.drawOutputString;
                        this.signatureDrawString = this.saveImageString;
                    }
                    else {
                        this.saveInitialString = this.drawOutputString;
                        this.initialDrawString = this.saveImageString;
                    }
                    this.checkSaveFiledSign(this.pdfViewerBase.isInitialField, true);
                }
            }
            else {
                if (!this.pdfViewerBase.isInitialField) {
                    this.saveSignatureString = '';
                }
                else {
                    this.saveInitialString = '';
                }
                this.checkSaveFiledSign(this.pdfViewerBase.isInitialField, false);
            }
        }
    };
    Signature.prototype.saveTypeSignature = function (typeCheckbox) {
        if (typeCheckbox) {
            if (typeCheckbox.checked) {
                this.updateSignatureTypeValue();
                if (this.textValue !== '') {
                    if (!this.pdfViewerBase.isInitialField) {
                        this.issaveTypeSignature = true;
                        this.saveSignatureTypeString = this.textValue;
                    }
                    else {
                        this.issaveTypeInitial = true;
                        this.saveInitialTypeString = this.textValue;
                    }
                }
            }
            else {
                if (!this.pdfViewerBase.isInitialField) {
                    this.saveSignatureTypeString = '';
                    this.issaveTypeSignature = false;
                }
                else {
                    this.saveInitialTypeString = '';
                    this.issaveTypeInitial = false;
                }
            }
        }
    };
    Signature.prototype.saveUploadSignature = function (imageCheckbox) {
        if (imageCheckbox) {
            if (imageCheckbox.checked) {
                var imageCanvas = document.getElementById(this.pdfViewer.element.id + '_signatureuploadCanvas_');
                var uploadString = imageCanvas.toDataURL();
                var imageString = document.getElementById(this.pdfViewer.element.id + '_e-pv-upload-button').style.visibility === 'hidden' ? uploadString : '';
                if (imageString !== '') {
                    if (!this.pdfViewerBase.isInitialField) {
                        this.issaveImageSignature = true;
                        this.saveSignatureUploadString = imageString;
                    }
                    else {
                        this.issaveImageInitial = true;
                        this.saveInitialUploadString = imageString;
                    }
                }
            }
            else {
                if (!this.pdfViewerBase.isInitialField) {
                    this.saveSignatureUploadString = '';
                    this.issaveImageSignature = false;
                }
                else {
                    this.saveInitialUploadString = '';
                    this.issaveImageInitial = false;
                }
            }
        }
    };
    Signature.prototype.updateSignatureTypeValue = function (isType) {
        var fontElements = document.querySelectorAll('.e-pv-font-sign');
        if (fontElements) {
            for (var j = 0; j < fontElements.length; j++) {
                if (fontElements[parseInt(j.toString(), 10)] && fontElements[parseInt(j.toString(), 10)].style.borderColor === 'red') {
                    if (this.pdfViewerBase.isToolbarSignClicked) {
                        if (isType) {
                            this.signtypevalue = fontElements[parseInt(j.toString(), 10)].textContent;
                            this.outputString = fontElements[parseInt(j.toString(), 10)].textContent;
                        }
                        else {
                            this.outputString = fontElements[parseInt(j.toString(), 10)].textContent;
                        }
                    }
                    else {
                        if (isType) {
                            this.signtypevalue = fontElements[parseInt(j.toString(), 10)].textContent;
                            this.textValue = fontElements[parseInt(j.toString(), 10)].textContent;
                        }
                        else {
                            this.textValue = fontElements[parseInt(j.toString(), 10)].textContent;
                        }
                    }
                    try {
                        this.fontName = JSON.parse(fontElements[parseInt(j.toString(), 10)].style.fontFamily);
                    }
                    catch (e) {
                        this.fontName = fontElements[parseInt(j.toString(), 10)].style.fontFamily;
                    }
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Signature.prototype.hideSignaturePanel = function () {
        if (this.signatureDialog) {
            this.signatureDialog.hide();
        }
    };
    Signature.prototype.bindTypeSignatureClickEvent = function () {
        if (isBlazor()) {
            for (var i = 0; i < 4; i++) {
                var fontElement = document.querySelector('#' + this.pdfViewer.element.id + '_font_signature' + i);
                if (fontElement) {
                    fontElement.addEventListener('click', this.typeSignatureclicked.bind(this));
                }
            }
        }
    };
    Signature.prototype.bindDrawSignatureClickEvent = function () {
        var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        if (canvas) {
            canvas.addEventListener('mousedown', this.signaturePanelMouseDown.bind(this));
            canvas.addEventListener('mousemove', this.signaturePanelMouseMove.bind(this));
            canvas.addEventListener('mouseup', this.signaturePanelMouseUp.bind(this));
            canvas.addEventListener('mouseleave', this.signaturePanelMouseUp.bind(this));
            canvas.addEventListener('touchstart', this.signaturePanelMouseDown.bind(this));
            canvas.addEventListener('touchmove', this.signaturePanelMouseMove.bind(this));
            canvas.addEventListener('touchend', this.signaturePanelMouseUp.bind(this));
        }
    };
    Signature.prototype.typeSignatureclicked = function (event) {
        var eventTarget = event.target;
        if (eventTarget) {
            for (var i = 0; i < 4; i++) {
                var fontElement = document.querySelector('#' + this.pdfViewer.element.id + '_font_signature' + i);
                if (fontElement) {
                    fontElement.style.borderColor = '';
                }
            }
            eventTarget.style.borderColor = 'red';
            this.outputString = eventTarget.textContent;
            try {
                this.fontName = JSON.parse(eventTarget.style.fontFamily);
            }
            catch (e) {
                this.fontName = eventTarget.style.fontFamily;
            }
            this.enableCreateButton(false);
        }
    };
    Signature.prototype.createSignatureCanvas = function () {
        var previousField = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        var field = document.getElementById(this.pdfViewer.element.id + 'Signature_appearance');
        if (previousField) {
            previousField.remove();
        }
        if (field) {
            field.remove();
        }
        var canvasHeight = 305;
        var viewerHeight = this.pdfViewer.element.clientHeight;
        if (viewerHeight <= 500) {
            canvasHeight = 250;
        }
        else if (viewerHeight > 500 && viewerHeight <= 750) {
            canvasHeight = 275;
        }
        var appearanceDiv = createElement('div', { id: this.pdfViewer.element.id + 'Signature_appearance', className: 'e-pv-signature-apperance', styles: 'margin-top:30px' });
        var canvas = createElement('canvas', { id: this.pdfViewer.element.id + '_signatureCanvas_', className: 'e-pv-signature-canvas' });
        canvas.classList.add('e-pv-canvas-signature');
        canvas.height = canvasHeight;
        canvas.style.height = canvasHeight + 'px';
        canvas.style.border = '1px dotted #bdbdbd';
        canvas.style.backgroundColor = 'white';
        canvas.style.boxSizing = 'border-box';
        canvas.style.borderRadius = '2px';
        canvas.addEventListener('mousedown', this.signaturePanelMouseDown.bind(this));
        canvas.addEventListener('mousemove', this.signaturePanelMouseMove.bind(this));
        canvas.addEventListener('mouseup', this.signaturePanelMouseUp.bind(this));
        canvas.addEventListener('mouseleave', this.signaturePanelMouseLeave.bind(this));
        canvas.addEventListener('touchstart', this.signaturePanelMouseDown.bind(this));
        canvas.addEventListener('touchmove', this.signaturePanelMouseMove.bind(this));
        canvas.addEventListener('touchend', this.signaturePanelMouseUp.bind(this));
        appearanceDiv.appendChild(canvas);
        var checkBoxObj;
        var input;
        var saveCheckBoxContent;
        if (this.pdfViewerBase.isToolbarSignClicked && !this.pdfViewerBase.isInitialField) {
            saveCheckBoxContent = this.pdfViewer.localeObj.getConstant('Save Signature');
        }
        else {
            saveCheckBoxContent = this.pdfViewerBase.isInitialField ? this.pdfViewer.localeObj.getConstant('Save Initial') : this.pdfViewer.localeObj.getConstant('Save Signature');
        }
        if (!this.pdfViewer.hideSaveSignature) {
            input = document.createElement('input');
            input.type = 'checkbox';
            input.id = 'checkbox';
            appearanceDiv.appendChild(input);
            checkBoxObj = new CheckBox({ label: saveCheckBoxContent, disabled: false, checked: false });
            checkBoxObj.appendTo(input);
        }
        if (!this.pdfViewerBase.isInitialField) {
            this.isSaveSignature = this.saveSignatureCheckbox();
        }
        else {
            this.isSaveInitial = this.saveSignatureCheckbox();
        }
        if (this.isSaveSignature && !this.pdfViewerBase.isInitialField) {
            checkBoxObj.checked = true;
        }
        else if (this.isSaveInitial && this.pdfViewerBase.isInitialField) {
            checkBoxObj.checked = true;
        }
        //if (!this.pdfViewerBase.isToolbarSignClicked) {
        var typeDiv = createElement('div', { id: this.pdfViewer.element.id + 'type_appearance', className: 'e-pv-signature-apperance', styles: 'margin-top:6px' });
        var inputText = document.createElement('input');
        if (!this.pdfViewerBase.isInitialField && this.issaveTypeSignature && !this.pdfViewerBase.isToolbarSignClicked) {
            inputText.value = this.drawSavedTypeSignature();
        }
        else if (this.pdfViewerBase.isInitialField && this.issaveTypeInitial && !this.pdfViewerBase.isToolbarSignClicked) {
            inputText.value = this.drawSavedTypeSignature();
        }
        inputText.type = 'text';
        inputText.id = this.pdfViewer.element.id + '_e-pv-Signtext-box';
        typeDiv.appendChild(inputText);
        var inputobj = new TextBox({
            placeholder: this.pdfViewer.localeObj.getConstant('Enter Signature as Name'),
            floatLabelType: 'Auto'
        });
        inputobj.appendTo(inputText);
        var fontDiv = createElement('div', { id: this.pdfViewer.element.id + '_font_appearance', className: 'e-pv-font-appearance-style' });
        fontDiv.classList.add('e-pv-canvas-signature');
        fontDiv.style.height = (canvasHeight - 35) + 'px';
        fontDiv.style.border = '1px dotted #bdbdbd';
        fontDiv.style.boxSizing = 'border-box';
        fontDiv.style.borderRadius = '2px';
        fontDiv.style.backgroundColor = 'white';
        fontDiv.style.color = 'black';
        fontDiv.style.marginTop = '8px';
        fontDiv.style.paddingRight = '0px';
        typeDiv.appendChild(fontDiv);
        input = document.createElement('input');
        input.type = 'checkbox';
        input.id = 'checkbox1';
        typeDiv.appendChild(input);
        checkBoxObj = new CheckBox({ label: saveCheckBoxContent, disabled: false, checked: false });
        checkBoxObj.appendTo(input);
        if (this.issaveTypeSignature && !this.pdfViewerBase.isInitialField && !this.pdfViewerBase.isToolbarSignClicked) {
            checkBoxObj.checked = true;
        }
        else if (this.issaveTypeInitial && this.pdfViewerBase.isInitialField && !this.pdfViewerBase.isToolbarSignClicked) {
            checkBoxObj.checked = true;
        }
        inputobj.addEventListener('input', this.renderSignatureText.bind(this));
        this.enableCreateButton(true);
        var tab = createElement('div', { id: this.pdfViewer.element.id + 'Signature_tab' });
        var uploadDiv = createElement('div', { id: this.pdfViewer.element.id + 'upload_appearance', className: 'e-pv-signature-apperance', styles: 'padding-top:30px' });
        var button = document.createElement('div');
        button.id = this.pdfViewer.element.id + '_e-pv-upload-button';
        uploadDiv.appendChild(button);
        var uploadButton = new Button({ cssClass: 'e-pv-sign-upload', content: this.pdfViewer.localeObj.getConstant('Browse Signature Image') });
        uploadButton.appendTo(button);
        uploadButton.element.style.position = 'absolute';
        var uploadCanvas = createElement('canvas', { id: this.pdfViewer.element.id + '_signatureuploadCanvas_', className: 'e-pv-signature-uploadcanvas' });
        if (this.pdfViewer.element.offsetWidth > 750) {
            uploadCanvas.width = 714;
        }
        else {
            uploadCanvas.width = this.pdfViewer.element.offsetWidth - 35;
        }
        uploadCanvas.classList.add('e-pv-canvas-signature');
        uploadCanvas.height = canvasHeight;
        uploadCanvas.style.height = canvasHeight + 'px';
        uploadButton.element.style.left = ((uploadCanvas.width / 2) - 50) + 'px';
        uploadButton.element.style.top = ((parseFloat(uploadCanvas.style.height) / 2) + 20) + 'px';
        uploadCanvas.style.border = '1px dotted #bdbdbd';
        uploadCanvas.style.backgroundColor = 'transparent';
        uploadCanvas.style.boxSizing = 'border-box';
        uploadCanvas.style.borderRadius = '2px';
        uploadCanvas.style.zIndex = '0';
        var imageUploadString = '';
        if (!this.pdfViewerBase.isInitialField && this.issaveImageSignature && !this.pdfViewerBase.isToolbarSignClicked) {
            imageUploadString = this.drawSavedImageSignature();
        }
        else if (this.pdfViewerBase.isInitialField && this.issaveImageInitial && !this.pdfViewerBase.isToolbarSignClicked) {
            imageUploadString = this.drawSavedImageSignature();
        }
        if (imageUploadString !== '' && !this.pdfViewerBase.isToolbarSignClicked) {
            this.clearUploadString = false;
            var ctx_1 = uploadCanvas.getContext('2d');
            var image_2 = new Image();
            image_2.src = imageUploadString;
            image_2.onload = function () {
                ctx_1.drawImage(image_2, 0, 0, uploadCanvas.width, uploadCanvas.height);
            };
            uploadButton.element.style.display = 'hidden';
        }
        uploadDiv.appendChild(uploadCanvas);
        input = document.createElement('input');
        input.type = 'checkbox';
        input.id = 'checkbox2';
        uploadDiv.appendChild(input);
        checkBoxObj = new CheckBox({ label: saveCheckBoxContent, disabled: false, checked: false });
        checkBoxObj.appendTo(input);
        if (this.issaveImageSignature && !this.pdfViewerBase.isInitialField && !this.pdfViewerBase.isToolbarSignClicked) {
            checkBoxObj.checked = true;
        }
        else if (this.issaveImageInitial && this.pdfViewerBase.isInitialField && !this.pdfViewerBase.isToolbarSignClicked) {
            checkBoxObj.checked = true;
        }
        button.addEventListener('click', this.uploadSignatureImage.bind(this));
        this.signfontStyle = [{ FontName: 'Helvetica' }, { FontName: 'Times New Roman' }, { FontName: 'Courier' }, { FontName: 'Symbol' }];
        var fontSignature = [];
        if (this.pdfViewerBase.isToolbarSignClicked && !isNullOrUndefined(this.pdfViewer.handWrittenSignatureSettings.typeSignatureFonts)) {
            for (var j = 0; j < 4; j++) {
                if (!isNullOrUndefined(this.pdfViewer.handWrittenSignatureSettings.typeSignatureFonts[parseInt(j.toString(), 10)])) {
                    this.signfontStyle[parseInt(j.toString(), 10)].FontName =
                        this.pdfViewer.handWrittenSignatureSettings.typeSignatureFonts[parseInt(j.toString(), 10)];
                }
            }
        }
        this.setCustomFonts();
        for (var i = 0; i < this.signfontStyle.length; i++) {
            fontSignature[parseInt(i.toString(), 10)] = document.createElement('div');
            fontSignature[parseInt(i.toString(), 10)].id = '_font_signature' + i + '';
            fontSignature[parseInt(i.toString(), 10)].classList.add('e-pv-font-sign');
            if (canvasHeight === 275) {
                fontSignature[parseInt(i.toString(), 10)].style.fontSize = '13px';
                fontSignature[parseInt(i.toString(), 10)].style.paddingTop = '30px';
                fontSignature[parseInt(i.toString(), 10)].style.height = '78px';
            }
            else if (canvasHeight === 250) {
                fontSignature[parseInt(i.toString(), 10)].style.fontSize = '12px';
                fontSignature[parseInt(i.toString(), 10)].style.paddingTop = '25px';
                fontSignature[parseInt(i.toString(), 10)].style.height = '68px';
            }
        }
        this.fontsign = fontSignature;
        // eslint-disable-next-line
        var proxy = this;
        var items = [];
        if (this.pdfViewerBase.isToolbarSignClicked) {
            if (this.pdfViewerBase.isInitialField) {
                items = this.showHideSignatureTab((this.pdfViewer.handWrittenSignatureSettings.initialDialogSettings ?
                    this.pdfViewer.handWrittenSignatureSettings.initialDialogSettings : this.pdfViewer.initialDialogSettings) &&
                    (this.pdfViewer.handWrittenSignatureSettings.initialDialogSettings ?
                        this.pdfViewer.handWrittenSignatureSettings.initialDialogSettings.displayMode :
                        this.pdfViewer.initialDialogSettings.displayMode), appearanceDiv, typeDiv, uploadDiv);
            }
            else {
                items = this.showHideSignatureTab((this.pdfViewer.handWrittenSignatureSettings.signatureDialogSettings ?
                    this.pdfViewer.handWrittenSignatureSettings.signatureDialogSettings :
                    this.pdfViewer.signatureDialogSettings) && (this.pdfViewer.handWrittenSignatureSettings.signatureDialogSettings ?
                    this.pdfViewer.handWrittenSignatureSettings.signatureDialogSettings.displayMode :
                    this.pdfViewer.signatureDialogSettings.displayMode), appearanceDiv, typeDiv, uploadDiv);
            }
        }
        else {
            if (this.pdfViewerBase.isInitialField) {
                items = this.showHideSignatureTab((this.pdfViewer.initialFieldSettings.initialDialogSettings ?
                    this.pdfViewer.initialFieldSettings.initialDialogSettings.displayMode : 7), appearanceDiv, typeDiv, uploadDiv);
            }
            else {
                items = this.showHideSignatureTab((this.pdfViewer.signatureFieldSettings.signatureDialogSettings ?
                    this.pdfViewer.signatureFieldSettings.signatureDialogSettings.displayMode : 7), appearanceDiv, typeDiv, uploadDiv);
            }
        }
        this.tabObj = new Tab({
            selected: function (args) {
                proxy.handleSelectEvent(args);
            },
            selecting: function (args) {
                proxy.select(args);
            },
            items: items
        });
        this.tabObj.appendTo(tab);
        if (items[0].header.label === 'DRAW') {
            this.signaturetype = 'Draw';
        }
        else if (items[0].header.label === 'TYPE') {
            this.signaturetype = 'Type';
        }
        else {
            this.signaturetype = 'Image';
        }
        return tab;
        // } else {
        //     return appearanceDiv;
        // }
    };
    //to set custom fonts for specific settings
    Signature.prototype.setCustomFonts = function () {
        if (!this.pdfViewerBase.isToolbarSignClicked && !isNullOrUndefined(this.pdfViewer.signatureFieldSettings.typeSignatureFonts)) {
            if (!this.pdfViewerBase.isInitialField) {
                for (var j = 0; j < 4; j++) {
                    if (!isNullOrUndefined(this.pdfViewer.signatureFieldSettings.typeSignatureFonts[parseInt(j.toString(), 10)])) {
                        this.signfontStyle[parseInt(j.toString(), 10)].FontName =
                            this.pdfViewer.signatureFieldSettings.typeSignatureFonts[parseInt(j.toString(), 10)];
                    }
                }
            }
        }
        if (!this.pdfViewerBase.isToolbarSignClicked && !isNullOrUndefined(this.pdfViewer.initialFieldSettings.typeInitialFonts)) {
            if (this.pdfViewerBase.isInitialField) {
                for (var j = 0; j < 4; j++) {
                    if (!isNullOrUndefined(this.pdfViewer.initialFieldSettings.typeInitialFonts[parseInt(j.toString(), 10)])) {
                        this.signfontStyle[parseInt(j.toString(), 10)].FontName =
                            this.pdfViewer.initialFieldSettings.typeInitialFonts[parseInt(j.toString(), 10)];
                    }
                }
            }
        }
    };
    Signature.prototype.handleSelectEvent = function (e) {
        var headerText = '';
        var maximumWidth = 750;
        var tabInstance = document.getElementById(this.pdfViewer.element.id + 'Signature_tab').ej2_instances[0];
        if (tabInstance) {
            if (tabInstance.items.length > 0) {
                for (var i = 0; i < tabInstance.items.length; i++) {
                    var headerValue = tabInstance.items[parseInt(i.toString(), 10)].header.text;
                    if (headerValue === e.selectedItem.textContent) {
                        headerText = tabInstance.items[parseInt(i.toString(), 10)].header.label;
                    }
                }
            }
        }
        this.clearSignatureCanvas(e);
        if (headerText.toLocaleLowerCase() === 'draw') {
            this.signaturetype = 'Draw';
            this.enableCreateSignatureButton();
            var drawCheckbox = document.getElementById('checkbox');
            this.hideSignatureCheckbox(drawCheckbox);
        }
        else if (headerText.toLocaleLowerCase() === 'type') {
            var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
            if (canvas) {
                this.drawSignatureDataUrl = canvas.toDataURL();
            }
            this.updateSignatureTypeValue();
            this.signaturetype = 'Type';
            this.enableCreateSignatureButton();
            var typeCheckbox = document.getElementById('checkbox1');
            this.hideSignatureCheckbox(typeCheckbox);
            var textbox = document.getElementById(this.pdfViewer.element.id + '_e-pv-Signtext-box');
            if (!this.pdfViewerBase.isInitialField && this.saveSignatureTypeString !== '' && textbox.value !== '' && !this.pdfViewerBase.isToolbarSignClicked) {
                this.renderSignatureText();
            }
            else if (this.pdfViewerBase.isInitialField && this.saveInitialTypeString !== '' && textbox.value !== '' && !this.pdfViewerBase.isToolbarSignClicked) {
                this.renderSignatureText();
            }
        }
        else if (headerText.toLocaleLowerCase() === 'upload') {
            var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
            if (canvas) {
                this.drawSignatureDataUrl = canvas.toDataURL();
            }
            this.signaturetype = 'Image';
            this.enableCreateSignatureButton();
            var imageCheckbox = document.getElementById('checkbox2');
            this.hideSignatureCheckbox(imageCheckbox);
            var signbutton = document.getElementById(this.pdfViewer.element.id + '_e-pv-upload-button');
            if (this.saveSignatureUploadString !== '' && !this.pdfViewerBase.isInitialField && !this.clearUploadString && !this.pdfViewerBase.isToolbarSignClicked) {
                this.enableCreateButton(false);
                signbutton.style.visibility = 'hidden';
                this.outputString = this.saveSignatureUploadString;
            }
            if (this.saveInitialUploadString !== '' && this.pdfViewerBase.isInitialField && !this.clearUploadString && !this.pdfViewerBase.isToolbarSignClicked) {
                this.enableCreateButton(false);
                signbutton.style.visibility = 'hidden';
                this.outputString = this.saveInitialUploadString;
            }
        }
        if (this.pdfViewer.element.offsetWidth < maximumWidth) {
            this.updateCanvasSize();
        }
        this.drawSignOnTabSwitch();
        if (headerText.toLocaleLowerCase() === 'upload' && this.imageSignatureDataUrl) {
            this.imageSignOnTabSwitch();
        }
    };
    Signature.prototype.enableCreateSignatureButton = function () {
        if (this.pdfViewerBase.isToolbarSignClicked || this.signaturetype !== 'Type') {
            if (this.outputString !== '') {
                this.enableCreateButton(false);
            }
            else {
                this.enableCreateButton(true);
            }
        }
        else {
            if (this.textValue !== '') {
                this.enableCreateButton(false);
            }
            else {
                this.enableCreateButton(true);
            }
        }
    };
    Signature.prototype.showHideSignatureTab = function (displayMode, appearanceDiv, typeDiv, uploadDiv) {
        var items = [];
        if (displayMode & DisplayMode.Draw) {
            items.push({
                header: { 'text': this.pdfViewer.localeObj.getConstant('Draw-hand Signature'), 'label': 'DRAW' },
                content: appearanceDiv
            });
        }
        if (displayMode & DisplayMode.Text) {
            items.push({
                header: { 'text': this.pdfViewer.localeObj.getConstant('Type Signature'), 'label': 'TYPE' },
                content: typeDiv
            });
        }
        if (displayMode & DisplayMode.Upload) {
            items.push({
                header: { 'text': this.pdfViewer.localeObj.getConstant('Upload Signature'), 'label': 'UPLOAD' },
                content: uploadDiv
            });
        }
        return items;
    };
    /**
     * @private
     * @returns {void}
     */
    Signature.prototype.createSignatureFileElement = function () {
        var signImage = createElement('input', { id: this.pdfViewer.element.id + '_signElement', attrs: { 'type': 'file' } });
        signImage.setAttribute('accept', '.jpg,.jpeg,.png');
        signImage.style.position = 'absolute';
        signImage.style.left = '0px';
        signImage.style.top = '0px';
        signImage.style.visibility = 'hidden';
        document.body.appendChild(signImage);
        signImage.addEventListener('change', this.addStampImage);
    };
    Signature.prototype.uploadSignatureImage = function () {
        var signImage = document.getElementById(this.pdfViewer.element.id + '_signElement');
        if (isNullOrUndefined(signImage)) {
            this.createSignatureFileElement();
            signImage = document.getElementById(this.pdfViewer.element.id + '_signElement');
        }
        if (signImage) {
            signImage.click();
        }
    };
    Signature.prototype.renderSignatureText = function () {
        var maximumWidth = 750;
        var enableButtons;
        var fontDiv = document.getElementById(this.pdfViewer.element.id + '_font_appearance');
        var textBox = document.getElementById(this.pdfViewer.element.id + '_e-pv-Signtext-box');
        for (var i = 0; i < this.signfontStyle.length; i++) {
            this.fontsign[parseInt(i.toString(), 10)].innerHTML = textBox.value;
            this.fontsign[parseInt(i.toString(), 10)].style.fontFamily = this.signfontStyle[parseInt(i.toString(), 10)].FontName;
            if (this.fontName !== '' && this.signfontStyle[parseInt(i.toString(), 10)].FontName === this.fontName) {
                this.fontsign[parseInt(i.toString(), 10)].classList.add('e-pv-selected-fontdiv');
                this.fontsign[parseInt(i.toString(), 10)].style.borderColor = 'red';
            }
            else if (isNullOrUndefined(this.fontName) &&
                !isNullOrUndefined(this.signfontStyle[parseInt(i.toString(), 10)].FontName) && i === 0) {
                this.fontsign[parseInt(i.toString(), 10)].classList.add('e-pv-selected-fontdiv');
                this.fontsign[parseInt(i.toString(), 10)].style.borderColor = 'red';
            }
            fontDiv.appendChild(this.fontsign[parseInt(i.toString(), 10)]);
        }
        for (var i = 0; i < this.signfontStyle.length; i++) {
            var clickSign = document.getElementById('_font_signature' + i + '');
            clickSign.addEventListener('click', this.typeSignatureclick.bind(this));
        }
        if (textBox.value.trim() === '') {
            enableButtons = true;
        }
        else {
            enableButtons = false;
        }
        this.enableCreateButton(enableButtons);
        this.enableClearbutton(enableButtons);
        if (this.pdfViewer.element.offsetWidth < maximumWidth) {
            this.updateCanvasSize();
        }
        this.drawSignOnTabSwitch();
    };
    Signature.prototype.typeSignatureclick = function () {
        var eventTarget = event.target;
        if (eventTarget.textContent.trim() !== '') {
            var createButton = document.getElementsByClassName('e-pv-createbtn')[0];
            createButton.disabled = false;
            for (var i = 0; i < 4; i++) {
                var fontElement = document.getElementById('_font_signature' + i + '');
                if (fontElement) {
                    fontElement.style.borderColor = '';
                    fontElement.classList.remove('e-pv-selected-fontdiv');
                }
            }
            eventTarget.classList.add('e-pv-selected-fontdiv');
            eventTarget.style.borderColor = 'red';
            this.outputString = eventTarget.textContent;
            try {
                this.fontName = JSON.parse(eventTarget.style.fontFamily);
            }
            catch (e) {
                this.fontName = eventTarget.style.fontFamily;
            }
        }
    };
    /**
     * @param {any} bounds - It describes about the bounds value
     * @param {any} position - It describes about the position
     * @private
     * @returns {void}
     */
    Signature.prototype.addSignatureCollection = function (bounds, position) {
        var minimumX = -1;
        var minimumY = -1;
        var maximumX = -1;
        var maximumY = -1;
        var collectionData = processPathData(this.outputString);
        var newCanvas = document.createElement('canvas');
        var context = newCanvas.getContext('2d');
        var imageString;
        var signatureType = this.pdfViewerBase.currentSignatureAnnot.shapeAnnotationType;
        if (signatureType === 'HandWrittenSignature') {
            if (collectionData.length !== 0) {
                for (var k = 0; k < collectionData.length; k++) {
                    var val = collectionData[parseInt(k.toString(), 10)];
                    if (minimumX === -1) {
                        minimumX = (val['x']);
                        maximumX = (val['x']);
                        minimumY = (val['y']);
                        maximumY = (val['y']);
                    }
                    else {
                        var point1 = (val['x']);
                        var point2 = (val['y']);
                        if (minimumX >= point1) {
                            minimumX = point1;
                        }
                        if (minimumY >= point2) {
                            minimumY = point2;
                        }
                        if (maximumX <= point1) {
                            maximumX = point1;
                        }
                        if (maximumY <= point2) {
                            maximumY = point2;
                        }
                    }
                }
                var newdifferenceX = maximumX - minimumX;
                var newdifferenceY = maximumY - minimumY;
                var differenceX = newdifferenceX / 100;
                var differenceY = newdifferenceY / 100;
                var left = 0;
                var top_1 = 0;
                if (bounds) {
                    newCanvas.width = position.currentWidth;
                    newCanvas.height = position.currentHeight;
                    differenceX = newdifferenceX / (bounds.width);
                    differenceY = newdifferenceY / (bounds.height);
                    left = bounds.x - position.currentLeft;
                    top_1 = bounds.y - position.currentTop;
                }
                else {
                    newCanvas.width = 100;
                    newCanvas.height = 100;
                }
                context.beginPath();
                for (var n = 0; n < collectionData.length; n++) {
                    var val = collectionData[parseInt(n.toString(), 10)];
                    var point1 = ((val['x'] - minimumX) / differenceX) + left;
                    var point2 = ((val['y'] - minimumY) / differenceY) + top_1;
                    if (val['command'] === 'M') {
                        context.moveTo(point1, point2);
                    }
                    else if (val['command'] === 'L') {
                        context.lineTo(point1, point2);
                    }
                }
                context.stroke();
                context.closePath();
                imageString = newCanvas.toDataURL();
            }
        }
        else if (signatureType === 'SignatureText') {
            imageString = this.outputString;
        }
        else {
            imageString = this.outputString;
        }
        if (bounds) {
            this.saveImageString = imageString;
        }
        else {
            var signCollection = {};
            signCollection['sign_' + this.pdfViewerBase.imageCount] = this.outputString;
            this.outputcollection.push(signCollection);
            var signBounds = {};
            signBounds['height'] = this.pdfViewerBase.currentSignatureAnnot.bounds.height;
            signBounds['width'] = this.pdfViewerBase.currentSignatureAnnot.bounds.width;
            var signature = [];
            signature.push({ id: 'sign_' + this.pdfViewerBase.imageCount, imageData: imageString, signatureType: signatureType, fontFamily: this.pdfViewerBase.currentSignatureAnnot.fontFamily, bounds: signBounds });
            this.signaturecollection.push({ image: signature, isInitial: this.pdfViewerBase.isInitialField });
            this.pdfViewerBase.imageCount++;
        }
    };
    /**
     * @private]
     * @param {number} limit - The limit.
     * @returns {number} - Returns number.
     */
    Signature.prototype.getSaveLimit = function (limit) {
        if (limit > this.maxSaveLimit) {
            limit = this.maxSaveLimit;
        }
        else if (limit < 1) {
            limit = 1;
        }
        return limit;
    };
    /**
     * @private
     * @returns {void}
     */
    Signature.prototype.RenderSavedSignature = function () {
        this.pdfViewerBase.signatureCount++;
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        var annot;
        if (this.pdfViewerBase.isAddedSignClicked) {
            var annotationName = this.pdfViewer.annotation.createGUID();
            this.pdfViewerBase.currentSignatureAnnot = null;
            this.pdfViewerBase.isSignatureAdded = true;
            var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
            var pageDiv = document.getElementById(this.pdfViewer.element.id + '_pageDiv_' + pageIndex);
            var currentLeft = 0;
            var currentTop = 0;
            var currentWidth = this.pdfViewer.handWrittenSignatureSettings.width ?
                this.pdfViewer.handWrittenSignatureSettings.width : 100;
            var currentHeight = this.pdfViewer.handWrittenSignatureSettings.height ?
                this.pdfViewer.handWrittenSignatureSettings.height : 100;
            var thickness = this.pdfViewer.handWrittenSignatureSettings.thickness ?
                this.pdfViewer.handWrittenSignatureSettings.thickness : 1;
            var opacity = this.pdfViewer.handWrittenSignatureSettings.opacity ?
                this.pdfViewer.handWrittenSignatureSettings.opacity : 1;
            var strokeColor = this.pdfViewer.handWrittenSignatureSettings.strokeColor ? this.pdfViewer.handWrittenSignatureSettings.strokeColor : '#000000';
            currentLeft = ((parseFloat(pageDiv.style.width) / 2) - (currentWidth / 2)) / zoomvalue;
            currentTop = ((parseFloat(pageDiv.style.height) / 2) - (currentHeight / 2)) / zoomvalue;
            var keyString = '';
            var signatureType = void 0;
            var signatureFontFamily = void 0;
            var bounds = void 0;
            for (var collection = 0; collection < this.outputcollection.length; collection++) {
                var collectionAddedsign = this.outputcollection[parseInt(collection.toString(), 10)];
                var eventTarget = event.target;
                if (eventTarget && eventTarget.id === 'sign_' + collection || eventTarget && eventTarget.id === 'sign_border' + collection) {
                    keyString = collectionAddedsign['sign_' + collection];
                    break;
                }
            }
            for (var signatureIndex = 0; signatureIndex < this.signaturecollection.length; signatureIndex++) {
                var eventTarget = event.target;
                var signatureId = this.signaturecollection[parseInt(signatureIndex.toString(), 10)].image[0].id.split('_')[1];
                if (eventTarget && eventTarget.id === 'sign_' + signatureId || eventTarget && eventTarget.id === 'sign_border' + signatureId) {
                    signatureType = this.signaturecollection[parseInt(signatureIndex.toString(), 10)].image[0].signatureType;
                    signatureFontFamily = this.signaturecollection[parseInt(signatureIndex.toString(), 10)].image[0].fontFamily;
                    bounds = this.signaturecollection[parseInt(signatureIndex.toString(), 10)].image[0].bounds;
                    break;
                }
            }
            if (signatureType === 'HandWrittenSignature') {
                var signatureBounds = this.updateSignatureAspectRatio(keyString, true);
                if (bounds.width !== signatureBounds.width && bounds.height !== signatureBounds.height) {
                    currentWidth = bounds.width;
                    currentHeight = bounds.height;
                }
                else {
                    currentWidth = signatureBounds.width ? signatureBounds.width : currentWidth;
                    currentHeight = signatureBounds.height ? signatureBounds.height : currentHeight;
                }
            }
            else {
                currentWidth = bounds.width;
                currentHeight = bounds.height;
            }
            annot = {
                id: 'sign' + this.pdfViewerBase.signatureCount, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: pageIndex, data: keyString,
                shapeAnnotationType: signatureType, opacity: opacity, fontFamily: signatureFontFamily, strokeColor: strokeColor,
                thickness: thickness, signatureName: annotationName
            };
            this.pdfViewerBase.currentSignatureAnnot = annot;
            this.pdfViewerBase.isAddedSignClicked = false;
        }
        else {
            this.pdfViewer.formFieldsModule.drawSignature();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Signature.prototype.updateCanvasSize = function () {
        var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        this.setTabItemWidth(canvas);
        var uploadCanvas = document.getElementById(this.pdfViewer.element.id + '_signatureuploadCanvas_');
        this.setTabItemWidth(uploadCanvas);
        var fontAppearance = document.getElementById(this.pdfViewer.element.id + '_font_appearance');
        this.setTabItemWidth(fontAppearance);
    };
    Signature.prototype.setTabItemWidth = function (canvas) {
        var padding = 2;
        var maximumWidth = 750;
        var canvasWidth = 714;
        var margin = 50;
        var elem = document.querySelector('.e-dlg-content');
        if (elem) {
            var style = getComputedStyle(elem);
            padding = padding + parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10);
        }
        if (canvas && this.signatureDialog && this.signatureDialog.visible) {
            if (canvas.tagName !== 'DIV') {
                var context_2 = canvas.getContext('2d');
                var canvasContent = canvas.toDataURL();
                var image_3 = new Image();
                image_3.src = canvasContent;
                image_3.onload = function () {
                    context_2.drawImage(image_3, 0, 0, canvas.width, canvas.height);
                };
            }
            if (this.pdfViewer.element.parentElement.clientWidth > maximumWidth) {
                canvas.width = canvasWidth;
                canvas.style.width = canvasWidth + 'px';
            }
            else {
                canvas.width = this.pdfViewer.element.parentElement.clientWidth - padding;
                canvas.style.width = canvas.width + 'px';
            }
        }
        var fontInnerDiv = document.getElementsByClassName('e-pv-font-sign');
        if (canvas && fontInnerDiv && fontInnerDiv.length > 0) {
            for (var i = 0; i < fontInnerDiv.length; i++) {
                var fontDiv = fontInnerDiv[parseInt(i.toString(), 10)];
                fontDiv.style.width = ((canvas.width / 2) - margin) + 'px';
            }
        }
    };
    Signature.prototype.drawSignOnTabSwitch = function () {
        // eslint-disable-next-line
        var proxy = this;
        var image = new Image();
        image.onload = function () {
            var canvas = document.getElementById(proxy.pdfViewer.element.id + '_signatureCanvas_');
            if (canvas) {
                var context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);
            }
        };
        image.src = this.drawSignatureDataUrl;
    };
    Signature.prototype.imageSignOnTabSwitch = function () {
        // eslint-disable-next-line
        var proxy = this;
        var image = new Image();
        image.onload = function () {
            var canvas = document.getElementById(proxy.pdfViewer.element.id + '_signatureuploadCanvas_');
            if (canvas) {
                var context = canvas.getContext('2d');
                var signbutton = document.getElementById(proxy.pdfViewer.element.id + '_e-pv-upload-button');
                signbutton.style.visibility = 'hidden';
                context.drawImage(image, 0, 0, canvas.width, canvas.height);
                proxy.enableCreateButton(false);
                proxy.signatureImageHeight = image.naturalHeight;
                proxy.signatureImageWidth = image.naturalWidth;
            }
        };
        image.src = this.imageSignatureDataUrl;
    };
    Signature.prototype.signaturePanelMouseDown = function (e) {
        if (e.type !== 'contextmenu') {
            e.preventDefault();
            this.findMousePosition(e);
            this.mouseDetection = true;
            this.oldX = this.mouseX;
            this.oldY = this.mouseY;
            this.newObject = [];
            this.drawMousePosition(e);
            this.mouseMoving = true;
        }
    };
    Signature.prototype.enableCreateButton = function (isEnable) {
        var createbtn = document.getElementsByClassName('e-pv-createbtn')[0];
        if (createbtn) {
            createbtn.disabled = isEnable;
        }
        this.enableClearbutton(isEnable);
    };
    Signature.prototype.enableClearbutton = function (isEnable) {
        var clearbtn = document.getElementsByClassName('e-pv-clearbtn')[0];
        if (clearbtn) {
            clearbtn.disabled = isEnable;
        }
    };
    Signature.prototype.signaturePanelMouseMove = function (e) {
        if (this.mouseDetection && this.signaturetype === 'Draw') {
            this.findMousePosition(e);
            this.enableCreateButton(false);
            this.drawMousePosition(e);
        }
    };
    Signature.prototype.findMousePosition = function (event) {
        var offsetX;
        var offsetY;
        if (event.type.indexOf('touch') !== -1) {
            event = event;
            var element = event.target;
            var currentRect = element.getBoundingClientRect();
            this.mouseX = event.changedTouches[0].clientX - currentRect.left;
            this.mouseY = event.changedTouches[0].clientY - currentRect.top;
        }
        else {
            event = event;
            this.mouseX = event.offsetX;
            this.mouseY = event.offsetY;
        }
    };
    Signature.prototype.drawMousePosition = function (event) {
        if (this.mouseDetection) {
            this.drawSignatureInCanvas();
            this.oldX = this.mouseX;
            this.oldY = this.mouseY;
        }
    };
    Signature.prototype.drawSignatureInCanvas = function () {
        var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        var context = canvas.getContext('2d');
        context.beginPath();
        context.moveTo(this.oldX, this.oldY);
        context.lineTo(this.mouseX, this.mouseY);
        context.stroke();
        context.lineWidth = 2;
        context.arc(this.oldX, this.oldY, 2 / 2, 0, Math.PI * 2, true);
        context.closePath();
        this.newObject.push(this.mouseX, this.mouseY);
    };
    Signature.prototype.signaturePanelMouseUp = function () {
        if (this.mouseDetection) {
            this.convertToPath(this.newObject);
        }
        this.mouseDetection = false;
        if (event.type === 'touchend') {
            this.canvasTouched = true;
        }
    };
    Signature.prototype.signaturePanelMouseLeave = function () {
        if (this.mouseDetection) {
            this.convertToPath(this.newObject);
        }
        this.mouseDetection = false;
        this.mouseMoving = false;
    };
    Signature.prototype.convertToPath = function (newObject) {
        this.movePath(newObject[0], newObject[1]);
        this.linePath(newObject[0], newObject[1]);
        for (var n = 2; n < newObject.length; n = n + 2) {
            this.linePath(newObject[parseInt(n.toString(), 10)], newObject[n + 1]);
        }
    };
    Signature.prototype.linePath = function (x, y) {
        this.outputString += 'L' + x + ',' + y + ' ';
    };
    Signature.prototype.movePath = function (x, y) {
        this.outputString += 'M' + x + ',' + y + ' ';
    };
    /**
     * @param {any} type - It describes about the type
     * @private
     * @returns {void}
     */
    Signature.prototype.clearSignatureCanvas = function (type) {
        var isCanvasClear = true;
        var drawObject = [];
        if (type && !isNullOrUndefined(type.previousIndex) && !isNullOrUndefined(type.selectedIndex)) {
            isCanvasClear = false;
            if (type.previousIndex === 0) {
                this.drawOutputString = this.outputString;
                drawObject = this.newObject;
            }
            else if (type.previousIndex === 2) {
                this.imageOutputString = this.outputString;
            }
            this.outputString = '';
            this.newObject = [];
            if (type.selectedIndex === 0) {
                this.outputString = this.drawOutputString;
                this.newObject = drawObject;
            }
            else if (type.selectedIndex === 2) {
                this.outputString = this.imageOutputString;
            }
        }
        else {
            this.outputString = '';
            this.newObject = [];
        }
        var isClearDrawTab = false;
        var isClearTypeTab = false;
        var isClearImageTab = false;
        if (type && type.currentTarget && type.currentTarget.classList.contains('e-pv-clearbtn')) {
            isCanvasClear = false;
            if (this.signaturetype === 'Draw') {
                isClearDrawTab = true;
                var checkbox = document.getElementById('checkbox');
                var checkBoxElement = document.getElementById('checkbox');
                if (checkbox && checkBoxElement.nextElementSibling) {
                    checkBoxElement.nextElementSibling.classList.remove('e-check');
                    checkbox.checked = false;
                }
            }
            else if (this.signaturetype === 'Type') {
                isClearTypeTab = true;
                var checkbox = document.getElementById('checkbox1');
                var checkBoxElement = document.getElementById('checkbox1');
                if (checkbox && checkBoxElement.nextElementSibling) {
                    checkBoxElement.nextElementSibling.classList.remove('e-check');
                    checkbox.checked = false;
                    this.textValue = '';
                }
            }
            else {
                isClearImageTab = true;
                this.clearUploadString = true;
                var checkbox = document.getElementById('checkbox2');
                var checkBoxElement = document.getElementById('checkbox2');
                if (checkbox && checkBoxElement.nextElementSibling) {
                    checkBoxElement.nextElementSibling.classList.remove('e-check');
                    checkbox.checked = false;
                }
            }
        }
        var canvas = document.getElementById(this.pdfViewer.element.id + '_signatureCanvas_');
        if ((canvas && isCanvasClear) || (isClearDrawTab)) {
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        var imageCanvas = document.getElementById(this.pdfViewer.element.id + '_signatureuploadCanvas_');
        if (imageCanvas && isCanvasClear || (isClearImageTab)) {
            var context = imageCanvas.getContext('2d');
            context.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            var signbutton = document.getElementById(this.pdfViewer.element.id + '_e-pv-upload-button');
            if (signbutton) {
                signbutton.style.visibility = '';
            }
        }
        var fontdiv = document.getElementById(this.pdfViewer.element.id + '_font_appearance');
        var textbox = document.getElementById(this.pdfViewer.element.id + '_e-pv-Signtext-box');
        if ((fontdiv && textbox && isCanvasClear) || (isClearTypeTab)) {
            textbox.value = '';
            if (!isBlazor()) {
                fontdiv.innerHTML = '';
            }
        }
        this.enableCreateButton(true);
    };
    /**
     * @private
     * @returns {void}
     */
    Signature.prototype.closeSignaturePanel = function () {
        if (this.pdfViewerBase.currentTarget) {
            this.pdfViewerBase.drawSignatureWithTool = true;
        }
        this.clearSignatureCanvas();
        if (!isBlazor()) {
            this.signatureDialog.hide();
        }
        this.pdfViewerBase.isToolbarSignClicked = false;
        this.pdfViewerBase.drawSignatureWithTool = false;
        this.drawOutputString = '';
        this.imageOutputString = '';
    };
    /**
     * @private
     * @returns {string} - Returns the string.
     */
    Signature.prototype.saveSignature = function () {
        var storeObject = null;
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sign'];
        }
        else {
            storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_sign');
        }
        var annotations = [];
        for (var j = 0; j < this.pdfViewerBase.pageCount; j++) {
            annotations[parseInt(j.toString(), 10)] = [];
        }
        if (storeObject) {
            var annotationCollection = JSON.parse(storeObject);
            for (var i = 0; i < annotationCollection.length; i++) {
                var newArray = [];
                var pageAnnotationObject = annotationCollection[parseInt(i.toString(), 10)];
                if (pageAnnotationObject) {
                    for (var z = 0; pageAnnotationObject.annotations.length > z; z++) {
                        if (this.pdfViewer.isSignatureEditable) {
                            var signatureSettings = this.pdfViewer.handWrittenSignatureSettings;
                            var annotationSettings = this.pdfViewer.annotationSettings;
                            var annotationAuthor = (signatureSettings.author !== 'Guest') ? signatureSettings.author : annotationSettings.author ? annotationSettings.author : 'Guest';
                            pageAnnotationObject.annotations[parseInt(z.toString(), 10)].author = annotationAuthor;
                        }
                        var strokeColorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].strokeColor ? pageAnnotationObject.annotations[parseInt(z.toString(), 10)].strokeColor : 'black';
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].strokeColor =
                            JSON.stringify(this.getRgbCode(strokeColorString));
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds =
                            JSON.stringify(this.pdfViewer.annotation.
                                getBounds(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds, pageAnnotationObject.pageIndex));
                        if (pageAnnotationObject.annotations[parseInt(z.toString(), 10)].shapeAnnotationType === 'HandWrittenSignature' || pageAnnotationObject.annotations[parseInt(z.toString(), 10)].signatureName === 'ink') {
                            var collectionData = processPathData(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].data);
                            var csData = splitArrayCollection(collectionData);
                            pageAnnotationObject.annotations[parseInt(z.toString(), 10)].data = JSON.stringify(csData);
                        }
                        else {
                            if (pageAnnotationObject.annotations[parseInt(z.toString(), 10)].shapeAnnotationType === 'SignatureText' && !this.checkDefaultFont(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fontFamily)) {
                                var signTypeCanvas = createElement('canvas');
                                var bounds = JSON.parse(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds);
                                signTypeCanvas.width = (bounds && bounds.width) || 150;
                                signTypeCanvas.height = (bounds && bounds.height) ||
                                    pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fontSize * 2;
                                var canvasContext = signTypeCanvas.getContext('2d');
                                var x = signTypeCanvas.width / 2;
                                var y = (signTypeCanvas.height / 2) +
                                    pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fontSize / 2 - 10;
                                canvasContext.textAlign = 'center';
                                canvasContext.font = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fontSize + 'px ' + pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fontFamily;
                                canvasContext.fillText(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].data, x, y);
                                pageAnnotationObject.annotations[parseInt(z.toString(), 10)].data = JSON.stringify(signTypeCanvas.toDataURL('image/png'));
                                pageAnnotationObject.annotations[parseInt(z.toString(), 10)].shapeAnnotationType = 'SignatureImage';
                            }
                            else {
                                pageAnnotationObject.annotations[parseInt(z.toString(), 10)].data =
                                    JSON.stringify(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].data);
                            }
                        }
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                annotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(annotations);
    };
    /**
     *
     * @private
     * @returns {boolean}
     */
    Signature.prototype.checkDefaultFont = function (fontName) {
        if (fontName === 'Helvetica' || fontName === 'Times New Roman' || fontName === 'Courier' || fontName === 'Symbol') {
            return true;
        }
        return false;
    };
    /**
     * @param {string} colorString - It describes about the color string value
     * @private
     * @returns {any} - any
     */
    Signature.prototype.getRgbCode = function (colorString) {
        /* eslint-disable-next-line security/detect-unsafe-regex */
        if (!colorString.match(/#([a-z0-9]+)/gi) && !colorString.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)) {
            colorString = this.pdfViewer.annotationModule.nameToHash(colorString);
        }
        var stringArray = colorString.split(',');
        if (isNullOrUndefined(stringArray[1])) {
            colorString = this.pdfViewer.annotationModule.getValue(colorString, 'rgba');
            stringArray = colorString.split(',');
        }
        var r = parseInt(stringArray[0].split('(')[1], 10);
        var g = parseInt(stringArray[1], 10);
        var b = parseInt(stringArray[2], 10);
        var a = parseInt(stringArray[3], 10);
        return { r: r, g: g, b: b, a: a };
    };
    /**
     * @private
     * @param {number} left - The left.
     * @param {number} top - The top.
     * @returns {void}
     */
    Signature.prototype.renderSignature = function (left, top) {
        var annot;
        var signatureData = '';
        var currentAnnotation = this.pdfViewerBase.currentSignatureAnnot;
        var annotationName = currentAnnotation.signatureName;
        if (annotationName === '' || isNullOrUndefined(annotationName)) {
            annotationName = this.pdfViewer.annotation.createGUID();
        }
        if (currentAnnotation) {
            if (this.pdfViewerBase.currentSignatureAnnot.shapeAnnotationType === 'HandWrittenSignature') {
                annot = {
                    id: currentAnnotation.id, bounds: { x: left, y: top, width: currentAnnotation.bounds.width,
                        height: currentAnnotation.bounds.height }, pageIndex: currentAnnotation.pageIndex, data: currentAnnotation.data,
                    shapeAnnotationType: 'HandWrittenSignature', opacity: currentAnnotation.opacity, fontFamily: currentAnnotation.fontFamily, fontSize: currentAnnotation.fontSize, strokeColor: currentAnnotation.strokeColor, thickness: currentAnnotation.thickness, signatureName: annotationName
                };
            }
            if (this.pdfViewerBase.currentSignatureAnnot.shapeAnnotationType === 'SignatureText') {
                annot = {
                    id: currentAnnotation.id, bounds: { x: left, y: top, width: currentAnnotation.bounds.width,
                        height: currentAnnotation.bounds.height }, pageIndex: currentAnnotation.pageIndex, data: currentAnnotation.data,
                    shapeAnnotationType: 'SignatureText', opacity: currentAnnotation.opacity, fontFamily: currentAnnotation.fontFamily, fontSize: currentAnnotation.fontSize, strokeColor: currentAnnotation.strokeColor, thickness: currentAnnotation.thickness, signatureName: annotationName
                };
            }
            else if (this.pdfViewerBase.currentSignatureAnnot.shapeAnnotationType === 'SignatureImage') {
                annot = {
                    id: currentAnnotation.id, bounds: { x: left, y: top, width: currentAnnotation.bounds.width,
                        height: currentAnnotation.bounds.height }, pageIndex: currentAnnotation.pageIndex, data: currentAnnotation.data,
                    shapeAnnotationType: 'SignatureImage', opacity: currentAnnotation.opacity, fontFamily: currentAnnotation.fontFamily, fontSize: currentAnnotation.fontSize, strokeColor: currentAnnotation.strokeColor, thickness: currentAnnotation.thickness, signatureName: annotationName
                };
            }
            var obj = this.pdfViewer.add(annot);
            var canvass = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', currentAnnotation.pageIndex);
            this.pdfViewer.renderDrawing(canvass, currentAnnotation.pageIndex);
            if (Browser.isDevice && !this.pdfViewer.enableDesktopMode) {
                this.pdfViewer.select([obj.id]);
            }
            this.pdfViewerBase.signatureAdded = true;
            this.storeSignatureData(currentAnnotation.pageIndex, annot);
            if (this.signaturetype === 'Draw') {
                signatureData = this.saveImageString;
            }
            else {
                signatureData = currentAnnotation.data;
            }
            this.pdfViewer.fireSignatureAdd(currentAnnotation.pageIndex, annotationName, currentAnnotation.shapeAnnotationType, currentAnnotation.bounds, currentAnnotation.opacity, currentAnnotation.strokeColor, currentAnnotation.thickness, signatureData);
            if (this.pdfViewer.annotation) {
                this.pdfViewer.annotation.onAnnotationMouseDown();
            }
            this.pdfViewerBase.currentSignatureAnnot = null;
            this.pdfViewerBase.signatureCount++;
        }
    };
    /**
     * @param {any} annotationCollection - It describes about the annotation collection
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isImport - It describes about the whether the isImport is true or not
     * @private
     * @returns {void}
     */
    Signature.prototype.renderExistingSignature = function (annotationCollection, pageIndex, isImport) {
        var annot;
        var isAnnotationAdded = false;
        if (!isImport) {
            for (var p = 0; p < this.signAnnotationIndex.length; p++) {
                if (this.signAnnotationIndex[parseInt(p.toString(), 10)] === pageIndex) {
                    isAnnotationAdded = true;
                    break;
                }
            }
        }
        if (annotationCollection && !isAnnotationAdded) {
            if (annotationCollection.length > 0 && this.signAnnotationIndex.indexOf(pageIndex) === -1) {
                this.signAnnotationIndex.push(pageIndex);
            }
            for (var n = 0; n < annotationCollection.length; n++) {
                var currentAnnotation = annotationCollection[parseInt(n.toString(), 10)];
                if (currentAnnotation) {
                    var data = currentAnnotation.PathData;
                    if (isImport) {
                        if (currentAnnotation.IsSignature) {
                            data = currentAnnotation.PathData;
                        }
                        else if (currentAnnotation.AnnotationType === 'SignatureImage' || currentAnnotation.AnnotationType === 'SignatureText') {
                            data = JSON.parse(JSON.stringify(currentAnnotation.PathData));
                        }
                        else {
                            if (data.includes('command')) {
                                data = getPathString(JSON.parse(currentAnnotation.PathData));
                            }
                            else {
                                data = currentAnnotation.PathData;
                            }
                        }
                    }
                    this.outputString = data;
                    var calculateInkPosition = this.pdfViewer.annotationModule.inkAnnotationModule.
                        calculateInkSize(this.outputString);
                    this.outputString = '';
                    var rectDiff = 0;
                    var rectDifference = 1;
                    var bounds = currentAnnotation.Bounds;
                    if (calculateInkPosition && (currentAnnotation.AnnotationType === 'Ink' ||
                        currentAnnotation.AnnotationType === 'signature' || currentAnnotation.AnnotationType === 'Signature')) {
                        if (calculateInkPosition.height < 1) {
                            rectDiff = bounds.Height ? bounds.Height : bounds.height;
                            rectDifference = bounds.Height ? bounds.Height : bounds.height;
                        }
                        else if (calculateInkPosition.width < 1) {
                            rectDiff = bounds.Width ? bounds.Width : bounds.width;
                            rectDifference = bounds.Width ? bounds.Width : bounds.width;
                        }
                    }
                    var currentLeft = !isNullOrUndefined(bounds.X) ? bounds.X + (rectDiff / 2) : bounds.x + (rectDiff / 2);
                    var currentTop = !isNullOrUndefined(bounds.Y) ? bounds.Y + (rectDiff / 2) : bounds.y + (rectDiff / 2);
                    var currentWidth = bounds.Width ? bounds.Width - (rectDifference - 1) : bounds.width - (rectDifference - 1);
                    var currentHeight = bounds.Height ? bounds.Height - (rectDifference - 1) :
                        bounds.height - (rectDifference - 1);
                    if (currentAnnotation.AnnotationType === 'SignatureText') {
                        annot = {
                            id: 'sign' + this.pdfViewerBase.signatureCount, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: pageIndex, data: data, fontFamily: currentAnnotation.FontFamily, fontSize: currentAnnotation.FontSize,
                            shapeAnnotationType: 'SignatureText', opacity: currentAnnotation.Opacity, strokeColor: currentAnnotation.StrokeColor, thickness: currentAnnotation.Thickness, signatureName: currentAnnotation.SignatureName
                        };
                    }
                    else if (currentAnnotation.AnnotationType === 'SignatureImage') {
                        annot = {
                            id: 'sign' + this.pdfViewerBase.signatureCount, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: pageIndex, data: data, shapeAnnotationType: 'SignatureImage', opacity: currentAnnotation.Opacity, strokeColor: currentAnnotation.StrokeColor, thickness: currentAnnotation.Thickness, signatureName: currentAnnotation.SignatureName
                        };
                    }
                    else {
                        annot = {
                            id: 'sign' + this.pdfViewerBase.signatureCount, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: pageIndex, data: data, shapeAnnotationType: 'HandWrittenSignature', opacity: currentAnnotation.Opacity, strokeColor: currentAnnotation.StrokeColor, thickness: currentAnnotation.Thickness, signatureName: currentAnnotation.SignatureName ? currentAnnotation.SignatureName : 'ink'
                        };
                    }
                }
                this.pdfViewer.add(annot);
                if (this.isAddAnnotationProgramatically) {
                    this.pdfViewer.fireSignatureAdd(annot.pageIndex, annot.signatureName, annot.shapeAnnotationType, annot.bounds, annot.opacity, annot.strokeColor, annot.thickness, annot.data);
                }
                var canvasPageIndex = currentAnnotation.pageIndex ? currentAnnotation.pageIndex : currentAnnotation.PageNumber;
                var canvass = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', canvasPageIndex);
                this.pdfViewer.renderDrawing(canvass, annot.pageIndex);
                this.storeSignatureData(annot.pageIndex, annot);
                this.pdfViewerBase.currentSignatureAnnot = null;
                this.pdfViewerBase.signatureCount++;
            }
        }
    };
    /**
     * @param {number} pageNumber -It describes about the page number value
     * @param {any} annotations - It describes about the annotations
     * @private
     * @returns {void}
     */
    Signature.prototype.storeSignatureData = function (pageNumber, annotations) {
        this.pdfViewer.annotation.addAction(!isNullOrUndefined(annotations.pageIndex) ? annotations.pageIndex : annotations.PageIndex, null, annotations, 'Addition', '', annotations, annotations);
        var annotation = null;
        var left;
        var top;
        var width;
        var height;
        var pageIndex;
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        if (annotations.bounds) {
            left = annotations.bounds.left ? annotations.bounds.left : annotations.bounds.x;
            top = annotations.bounds.top ? annotations.bounds.top : annotations.bounds.y;
            width = annotations.bounds.width;
            height = annotations.bounds.height;
            pageIndex = annotations.pageIndex;
        }
        else {
            left = annotations.Bounds.left ? annotations.Bounds.left : annotations.Bounds.x;
            top = annotations.Bounds.top ? annotations.Bounds.top : annotations.Bounds.y;
            width = annotations.LineBounds.Width;
            height = annotations.LineBounds.Height;
            pageIndex = annotations.PageIndex;
        }
        if (annotations.wrapper && annotations.wrapper.bounds) {
            left = annotations.wrapper.bounds.left;
            top = annotations.wrapper.bounds.top;
        }
        if (annotations.shapeAnnotationType === 'SignatureText' && annotations.wrapper && annotations.wrapper.children && annotations.wrapper.children.length > 1 && annotations.wrapper.children[1]) {
            left = left + annotations.wrapper.pivot.x + (this.signatureTextContentLeft - (this.signatureTextContentTop *
                (zoomvalue - (zoomvalue / this.signatureTextContentLeft))));
            top = top + ((annotations.wrapper.children[1].bounds.y - top) - (annotations.wrapper.children[1].bounds.y - top) / 3) +
                annotations.wrapper.pivot.y + (this.signatureTextContentTop * zoomvalue);
        }
        annotation = {
            id: annotations.id ? annotations.id : null, bounds: { left: left, top: top, width: width, height: height }, shapeAnnotationType: annotations.shapeAnnotationType ? annotations.shapeAnnotationType : 'ink', opacity: annotations.opacity ? annotations.opacity : 1, thickness: annotations.thickness ? annotations.thickness : 1, strokeColor: annotations.strokeColor ? annotations.strokeColor : null, pageIndex: pageIndex, data: annotations.data ? annotations.data : annotations.Value, fontSize: annotations.fontSize ? annotations.fontSize : null, fontFamily: annotations.fontFamily ? annotations.fontFamily : null, signatureName: annotations.signatureName ? annotations.signatureName : annotations.Name
        };
        var sessionSize = PdfViewerBase.sessionStorageManager.getWindowSessionStorageSize();
        var currentAnnotation = Math.round(JSON.stringify(annotation).length / 1024);
        if ((sessionSize + currentAnnotation) > 4500) {
            this.pdfViewerBase.isStorageExceed = true;
            this.pdfViewer.annotationModule.clearAnnotationStorage();
            if (!(this.pdfViewerBase.isFormStorageExceed)) {
                this.pdfViewer.formFieldsModule.clearFormFieldStorage();
            }
        }
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_sign');
        var index = 0;
        if (!storeObject) {
            this.storeSignatureCollections(annotation, pageNumber);
            var shapeAnnotation = { pageIndex: pageNumber, annotations: [] };
            shapeAnnotation.annotations.push(annotation);
            index = shapeAnnotation.annotations.indexOf(annotation);
            var annotationCollection = [];
            annotationCollection.push(shapeAnnotation);
            var annotationStringified = JSON.stringify(annotationCollection);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sign'] = annotationStringified;
            }
            else {
                PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_sign', annotationStringified);
            }
        }
        else {
            this.storeSignatureCollections(annotation, pageNumber);
            var annotObject = JSON.parse(storeObject);
            PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_sign');
            var pageIndex_1 = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (!isNullOrUndefined(pageIndex_1) && annotObject[parseInt(pageIndex_1.toString(), 10)]) {
                annotObject[parseInt(pageIndex_1.toString(), 10)].annotations.push(annotation);
                index = annotObject[parseInt(pageIndex_1.toString(), 10)].annotations.indexOf(annotation);
            }
            else {
                var markupAnnotation = { pageIndex: pageNumber, annotations: [] };
                markupAnnotation.annotations.push(annotation);
                index = markupAnnotation.annotations.indexOf(annotation);
                annotObject.push(markupAnnotation);
            }
            var annotationStringified = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sign'] = annotationStringified;
            }
            else {
                PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_sign', annotationStringified);
            }
        }
    };
    /**
     * @param {string} property - It describes about the property value
     * @param {number} pageNumber - It describes about the page number
     * @param {any} annotationBase - It describes about the annotation base
     * @param {boolean} isSignatureEdited - It describes about the whether the isSignatureEdited is true or not
     * @private
     * @returns {ISignAnnotation} - Isignannotation
     */
    Signature.prototype.modifySignatureCollection = function (property, pageNumber, annotationBase, isSignatureEdited) {
        this.pdfViewerBase.updateDocumentEditedProperty(true);
        var currentAnnotObject = null;
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        var zoomvalue = this.pdfViewerBase.getZoomFactor();
        if (pageAnnotations != null && annotationBase) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (annotationBase.id === pageAnnotations[parseInt(i.toString(), 10)].id) {
                    if (property === 'bounds') {
                        var top_2 = void 0;
                        var left = void 0;
                        if (annotationBase.shapeAnnotationType === 'SignatureText' && annotationBase.wrapper && annotationBase.wrapper.children[1]) {
                            top_2 = annotationBase.wrapper.children[0].bounds.y;
                            left = annotationBase.wrapper.children[0].bounds.x + annotationBase.wrapper.pivot.x +
                                (this.signatureTextContentLeft - (this.signatureTextContentTop * (zoomvalue -
                                    (zoomvalue / this.signatureTextContentLeft))));
                            top_2 = top_2 + ((annotationBase.wrapper.children[1].bounds.y - top_2) -
                                (annotationBase.wrapper.children[1].bounds.y - top_2) / 3) + annotationBase.wrapper.pivot.y +
                                (this.signatureTextContentTop * zoomvalue);
                            pageAnnotations[parseInt(i.toString(), 10)].bounds =
                                { left: left, top: top_2, width: annotationBase.bounds.width, height: annotationBase.bounds.height };
                        }
                        else {
                            pageAnnotations[parseInt(i.toString(), 10)].bounds =
                                { left: annotationBase.wrapper.bounds.left, top: annotationBase.wrapper.bounds.top,
                                    width: annotationBase.bounds.width, height: annotationBase.bounds.height };
                        }
                        pageAnnotations[parseInt(i.toString(), 10)].fontSize = annotationBase.fontSize;
                    }
                    else if (property === 'stroke') {
                        pageAnnotations[parseInt(i.toString(), 10)].strokeColor = annotationBase.wrapper.children[0].style.strokeColor;
                    }
                    else if (property === 'opacity') {
                        pageAnnotations[parseInt(i.toString(), 10)].opacity = annotationBase.wrapper.children[0].style.opacity;
                    }
                    else if (property === 'thickness') {
                        pageAnnotations[parseInt(i.toString(), 10)].thickness = annotationBase.wrapper.children[0].style.strokeWidth;
                    }
                    else if (property === 'delete') {
                        this.updateSignatureCollection(pageAnnotations[parseInt(i.toString(), 10)]);
                        currentAnnotObject = pageAnnotations.splice(i, 1)[0];
                        break;
                    }
                    if (property && property !== 'delete') {
                        this.storeSignatureCollections(pageAnnotations[parseInt(i.toString(), 10)], pageNumber);
                    }
                    if (isSignatureEdited) {
                        pageAnnotations[parseInt(i.toString(), 10)].opacity = annotationBase.wrapper.children[0].style.opacity;
                        pageAnnotations[parseInt(i.toString(), 10)].strokeColor = annotationBase.wrapper.children[0].style.strokeColor;
                        pageAnnotations[parseInt(i.toString(), 10)].thickness = annotationBase.wrapper.children[0].style.strokeWidth;
                        this.storeSignatureCollections(pageAnnotations[parseInt(i.toString(), 10)], pageNumber);
                        break;
                    }
                }
            }
            this.manageAnnotations(pageAnnotations, pageNumber);
        }
        return currentAnnotObject;
    };
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    Signature.prototype.storeSignatureCollections = function (annotation, pageNumber) {
        var collectionDetails = this.checkSignatureCollection(annotation);
        var selectAnnotation = cloneObject(annotation);
        selectAnnotation.annotationId = annotation.signatureName;
        selectAnnotation.pageNumber = pageNumber;
        delete selectAnnotation.annotName;
        if (annotation.id) {
            selectAnnotation.uniqueKey = annotation.id;
            delete selectAnnotation.id;
        }
        if (collectionDetails.isExisting) {
            this.pdfViewer.signatureCollection.splice(collectionDetails.position, 0, selectAnnotation);
        }
        else {
            this.pdfViewer.signatureCollection.push(selectAnnotation);
        }
    };
    Signature.prototype.checkSignatureCollection = function (signature) {
        var collections = this.pdfViewer.signatureCollection;
        if (collections && signature) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[parseInt(i.toString(), 10)].annotationId === signature.signatureName) {
                    this.pdfViewer.signatureCollection.splice(i, 1);
                    return { isExisting: true, position: i };
                }
            }
        }
        return { isExisting: false, position: null };
    };
    /**
     * @param {any} signature - It describes about the signature
     * @private
     * @returns {void}
     */
    Signature.prototype.updateSignatureCollection = function (signature) {
        var collections = this.pdfViewer.signatureCollection;
        if (collections && signature) {
            for (var i = 0; i < collections.length; i++) {
                if (collections[parseInt(i.toString(), 10)].annotationId === signature.signatureName) {
                    this.pdfViewer.signatureCollection.splice(i, 1);
                    break;
                }
            }
        }
    };
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {any} signature - It describes about the signature
     * @private
     * @returns {void}
     */
    Signature.prototype.addInCollection = function (pageNumber, signature) {
        if (signature) {
            this.storeSignatureCollections(signature, pageNumber);
            var pageSignatures = this.getAnnotations(pageNumber, null);
            if (pageSignatures) {
                pageSignatures.push(signature);
            }
            this.manageAnnotations(pageSignatures, pageNumber);
        }
    };
    /**
     * @param {number} pageIndex - This is current page number
     * @param {any[]}  shapeAnnotations - This is annotations
     * @private
     * @returns {any[]}
     */
    Signature.prototype.getAnnotations = function (pageIndex, shapeAnnotations) {
        var annotationCollection;
        var storeObject = null;
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sign'];
        }
        else {
            storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_sign');
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (!isNullOrUndefined(index) && annotObject[parseInt(index.toString(), 10)]) {
                annotationCollection = annotObject[parseInt(index.toString(), 10)].annotations;
            }
            else {
                annotationCollection = shapeAnnotations;
            }
        }
        else {
            annotationCollection = shapeAnnotations;
        }
        return annotationCollection;
    };
    /**
     * @param {ISignAnnotation[]} pageAnnotations - This is annotation
     * @param {number}  pageNumber - This is current page number
     * @private
     * @returns {void}
     */
    Signature.prototype.manageAnnotations = function (pageAnnotations, pageNumber) {
        var storeObject = null;
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sign'];
        }
        else {
            storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_sign');
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_sign');
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (index != null && annotObject[parseInt(index.toString(), 10)]) {
                annotObject[parseInt(index.toString(), 10)].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_sign'] = annotationStringified;
            }
            else {
                PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_sign', annotationStringified);
            }
        }
    };
    /**
     * @private
     * @param {boolean} isShow - Returns the true or false.
     * @returns {void}
     */
    Signature.prototype.showSignatureDialog = function (isShow) {
        if (isShow) {
            this.createSignaturePanel();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Signature.prototype.setAnnotationMode = function () {
        this.pdfViewerBase.isToolbarSignClicked = true;
        this.pdfViewerBase.isInitialField = false;
        this.showSignatureDialog(true);
    };
    /**
     * @private
     * @returns {void}
     */
    Signature.prototype.setInitialMode = function () {
        this.pdfViewerBase.isToolbarSignClicked = true;
        this.pdfViewerBase.isInitialField = true;
        this.showSignatureDialog(true);
    };
    /**
     * @param {any} number - Number value
     * @private
     * @returns {number} - number
     */
    Signature.prototype.ConvertPointToPixel = function (number) {
        return (number * (96 / 72));
    };
    /**
     * @param {any} signature - It describes about the signature
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isImport - It describes about the whether the isImport is true or not
     * @private
     * @returns {PdfAnnotationBaseModel} - PdfAnnotationBaseModel
     */
    Signature.prototype.updateSignatureCollections = function (signature, pageIndex, isImport) {
        var annot;
        if (signature) {
            var bounds = signature.Bounds;
            var currentLeft = bounds.X;
            var currentTop = bounds.Y;
            var currentWidth = bounds.Width;
            var currentHeight = bounds.Height;
            var data = signature.PathData;
            if (isImport) {
                data = getPathString(JSON.parse(signature.PathData));
            }
            annot = {
                id: 'sign' + signature.SignatureName, bounds: { x: currentLeft, y: currentTop, width: currentWidth, height: currentHeight }, pageIndex: pageIndex, data: data,
                shapeAnnotationType: 'HandWrittenSignature', opacity: signature.Opacity, strokeColor: signature.StrokeColor, thickness: signature.Thickness, signatureName: signature.SignatureName
            };
            return annot;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Signature.prototype.destroy = function () {
        PdfViewerBase.sessionStorageManager.removeItem('_annotations_sign');
        var signImage = document.getElementById(this.pdfViewer.element.id + '_signElement');
        if (signImage) {
            signImage.removeEventListener('change', this.addStampImage);
            if (signImage.parentElement) {
                signImage.parentElement.removeChild(signImage);
            }
        }
        if (this.signatureDialog) {
            this.signatureDialog.destroy();
        }
    };
    /**
     * This method was used to add signature programmatically
     *
     * @param {HandWrittenSignatureSettings} annotationObject - It describes type of annotation object
     * @param {IPoint} offset - It describes about the signature bounds or location
     * @param {number} pageNumber - It describes about the signature page number
     * @returns {object} - object
     * @private
     */
    Signature.prototype.updateSignatureDetails = function (annotationObject, offset, pageNumber) {
        //Creating new object if annotationObject is null
        if (!annotationObject) {
            annotationObject = { offset: { x: 10, y: 10 }, pageNumber: 0,
                width: undefined, height: undefined };
            offset = annotationObject.offset;
        }
        else if (!annotationObject.offset) {
            offset = { x: 10, y: 10 };
        }
        else {
            offset = annotationObject.offset;
        }
        var signatureId = this.pdfViewer.annotation.createGUID();
        var annotationSettings = this.pdfViewer.annotation.updateSettings(this.pdfViewer.handWrittenSignatureSettings);
        var annotationSelectorSettings = this.pdfViewer.handWrittenSignatureSettings.annotationSelectorSettings;
        this.pdfViewerBase.updateSelectorSettings(annotationSelectorSettings);
        annotationObject.width = annotationObject.width ? annotationObject.width :
            this.pdfViewer.handWrittenSignatureSettings.width ? this.pdfViewer.handWrittenSignatureSettings.width : 150;
        annotationObject.height =
            annotationObject.height ? annotationObject.height : this.pdfViewer.handWrittenSignatureSettings.height ?
                this.pdfViewer.handWrittenSignatureSettings.height : 100;
        annotationObject.thickness =
            annotationObject.thickness ? annotationObject.thickness : this.pdfViewer.handWrittenSignatureSettings.thickness ?
                this.pdfViewer.handWrittenSignatureSettings.thickness : 1;
        annotationObject.opacity =
            annotationObject.opacity ? annotationObject.opacity : this.pdfViewer.handWrittenSignatureSettings.opacity ?
                this.pdfViewer.handWrittenSignatureSettings.opacity : 1;
        annotationObject.strokeColor = annotationObject.strokeColor ? annotationObject.strokeColor : this.pdfViewer.handWrittenSignatureSettings.strokeColor ? this.pdfViewer.handWrittenSignatureSettings.strokeColor : '#000000';
        annotationObject.path = annotationObject.path ? annotationObject.path : this.pdfViewer.handWrittenSignatureSettings.path ? this.pdfViewer.handWrittenSignatureSettings.path : '';
        annotationObject.canSave = annotationObject.canSave ? annotationObject.canSave : false;
        annotationObject.signatureItem = annotationObject.signatureItem ? annotationObject.signatureItem : ['Signature'];
        annotationObject.fontFamily = annotationObject.fontFamily ? annotationObject.fontFamily : 'Helvetica';
        var displayMode;
        var signatureLimit;
        var initialLimit;
        if (annotationObject.signatureItem[0] === 'Initial') {
            displayMode = annotationObject.initialDialogSettings.displayMode ? annotationObject.initialDialogSettings.displayMode : 1;
            initialLimit = annotationObject.saveInitialLimit ? annotationObject.saveInitialLimit :
                this.pdfViewer.handWrittenSignatureSettings.saveInitialLimit;
            this.pdfViewer.handWrittenSignatureSettings.saveInitialLimit =
                this.pdfViewer.handWrittenSignatureSettings.saveInitialLimit < initialLimit ? initialLimit :
                    this.pdfViewer.handWrittenSignatureSettings.saveInitialLimit;
        }
        else {
            displayMode = annotationObject.signatureDialogSettings.displayMode ? annotationObject.signatureDialogSettings.displayMode : 1;
            signatureLimit = annotationObject.saveSignatureLimit ? annotationObject.saveSignatureLimit :
                this.pdfViewer.handWrittenSignatureSettings.saveSignatureLimit;
            this.pdfViewer.handWrittenSignatureSettings.saveSignatureLimit =
                this.pdfViewer.handWrittenSignatureSettings.saveSignatureLimit < signatureLimit ? signatureLimit :
                    this.pdfViewer.handWrittenSignatureSettings.saveSignatureLimit;
        }
        var signatureAnnotation = [];
        var annotType;
        if (displayMode === 1) {
            annotType = 'signature';
            var pathData = annotationObject.path ? annotationObject.path : '';
            if (!isNullOrUndefined(pathData)) {
                // Check whether the given path of the ink annotation is starts with Move path or Line path.
                if (pathData[0] === 'M' || pathData[0] === 'L') {
                    var collectionData = processPathData(pathData);
                    var csData = splitArrayCollection(collectionData);
                    pathData = JSON.stringify(csData);
                }
                else {
                    pathData = getPathString(JSON.parse(pathData));
                }
            }
            annotationObject.path = pathData;
        }
        if (displayMode === 2) {
            annotationObject.height = 65;
            annotType = 'SignatureText';
        }
        if (displayMode === 4) {
            annotType = 'SignatureImage';
        }
        //Adding the annotation object to an array and return it
        var signature = {
            SignatureName: signatureId,
            AnnotationSettings: annotationSettings,
            AnnotationType: annotType,
            AnnotationSelectorSettings: annotationObject.annotationSelectorSettings ?
                annotationObject.annotationSelectorSettings : annotationSelectorSettings,
            Opacity: annotationObject.opacity,
            PathData: annotationObject.path,
            PageNumber: pageNumber,
            FontFamily: annotationObject.fontFamily,
            FontSize: 32,
            StrokeColor: annotationObject.strokeColor,
            Thickness: annotationObject.thickness,
            Bounds: { x: offset.x, y: offset.y, width: annotationObject.width, height: annotationObject.height }
        };
        signatureAnnotation[0] = signature;
        //To save the programmatically added signature
        if (annotationObject.canSave) {
            var bounds = { x: offset.x, y: offset.y, width: annotationObject.width, height: annotationObject.height };
            this.pdfViewerBase.currentSignatureAnnot = null;
            this.outputString = annotationObject.path;
            this.pdfViewerBase.isInitialField = annotationObject.signatureItem[0] === 'Initial' ? true : false;
            var annot = void 0;
            if (displayMode === 1) {
                annot = {
                    id: 'sign' + this.pdfViewerBase.signatureCount, bounds: bounds, pageIndex: annotationObject.pageNumber, data: this.outputString,
                    shapeAnnotationType: 'HandWrittenSignature', opacity: annotationObject.opacity, strokeColor: annotationObject.strokeColor, thickness: annotationObject.thickness, signatureName: signatureId
                };
            }
            else if (displayMode === 2) {
                annot = {
                    id: 'sign' + this.pdfViewerBase.signatureCount, bounds: bounds, pageIndex: annotationObject.pageNumber, data: this.outputString, fontFamily: annotationObject.fontFamily, fontSize: 32,
                    shapeAnnotationType: 'SignatureText', signatureName: signatureId
                };
            }
            else if (displayMode === 4) {
                annot = {
                    id: 'sign' + this.pdfViewerBase.signatureCount, bounds: bounds, pageIndex: annotationObject.pageNumber, data: this.outputString,
                    shapeAnnotationType: 'SignatureImage', signatureName: signatureId
                };
            }
            this.pdfViewerBase.currentSignatureAnnot = annot;
            this.addSignatureCollection();
            this.outputString = '';
        }
        return { signatureAnnotation: signatureAnnotation };
    };
    return Signature;
}());
export { Signature };
