import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { PdfViewerBase } from '../index';
import { AnnotationRenderer, ShapeAnnotationBase, MeasureShapeAnnotationBase, ImageStructureBase } from './index';
import { PdfDocument, PdfRotationAngle, PdfSquareAnnotation, PdfPopupAnnotation, PdfFreeTextAnnotation, PdfRubberStampAnnotation, PdfTextMarkupAnnotation, PdfInkAnnotation, PdfLineAnnotation, PdfRectangleAnnotation, PdfCircleAnnotation, PdfEllipseAnnotation, PdfPolygonAnnotation, PdfPolyLineAnnotation, PdfAngleMeasurementAnnotation, PdfAnnotationState, PdfAnnotationStateModel, _ContentParser, _stringToBytes, _encode, PdfPageSettings, PdfMargins } from '@syncfusion/ej2-pdf';
import { Rect } from '@syncfusion/ej2-drawings';
import { TaskPriorityLevel } from '../base/pdfviewer-utlis';
/**
 * PageRenderer
 *
 * @hidden
 */
var PageRenderer = /** @class */ (function () {
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @private
     */
    function PageRenderer(pdfViewer, pdfViewerBase) {
        /**
         * @private
         */
        this.shapeAnnotationList = [];
        /**
         * @private
         */
        this.textMarkupAnnotationList = [];
        /**
         * @private
         */
        this.measureAnnotationList = [];
        /**
         * @private
         */
        this.stickyAnnotationList = [];
        /**
         * @private
         */
        this.rubberStampAnnotationList = [];
        /**
         * @private
         */
        this.freeTextAnnotationList = [];
        /**
         * @private
         */
        this.signatureAnnotationList = [];
        /**
         * @private
         */
        this.signatureInkAnnotationList = [];
        /**
         * @private
         */
        this.annotationOrder = [];
        /**
         * @private
         */
        this.hyperlinks = [];
        /**
         * @private
         */
        this.imageData = '';
        /**
         * @private
         */
        this.isMaskedImage = false;
        /**
         * @private
         */
        this.hyperlinkBounds = [];
        /**
         * @private
         */
        this.annotationDestPage = [];
        /**
         * @private
         */
        this.annotationList = [];
        /**
         * @private
         */
        this.annotationYPosition = [];
        /**
         * @private
         */
        this.digitalSignaturePresent = false;
        this.annotationCount = 0;
        /**
         * @private
         */
        this.isAnnotationPresent = false;
        /**
         *
         * @private
         */
        this.htmldata = [];
        /**
         *
         * @private
         */
        this.renderingMode = 0;
        this.textString = '';
        this.baseFont = '';
        this.fontSize = 0;
        this.pdfViewer = pdfViewer;
        this.pdfViewerBase = pdfViewerBase;
    }
    /**
     * @param {number} pageNumber - pageNumber
     * @param {Size} pageSize - pageSize
     * @private
     * @returns {void}
     */
    PageRenderer.prototype.exportAnnotationComments = function (pageNumber, pageSize) {
        var page = this.pdfViewer.pdfRendererModule.loadedDocument.getPage(parseInt(pageNumber.toString(), 10));
        var pageRotation = page.rotation;
        return this.getAnnotationFromPDF(pageSize.height, pageSize.width, pageNumber, pageRotation);
    };
    PageRenderer.prototype.IsStampExist = function (subject) {
        switch (subject.trim()) {
            case 'Approved':
            case 'Not Approved':
            case 'Confidential':
            case 'Draft':
            case 'Final':
            case 'Completed':
            case 'For Public Release':
            case 'Not For Public Release':
            case 'For Comment':
            case 'Void':
            case 'Preliminary Results':
            case 'Information Only':
            case 'Witness':
            case 'Initial Here':
            case 'Sign Here':
            case 'Accepted':
            case 'Rejected':
            case 'Revised':
            case 'Reviewed':
            case 'Received':
                return true;
            default:
                return false;
        }
    };
    PageRenderer.prototype.getAnnotationFromPDF = function (height, width, pageNumber, pageRotation) {
        var loadedPage = this.pdfViewer.pdfRendererModule.loadedDocument.getPage(parseInt(pageNumber.toString(), 10));
        var annotRenderer = new AnnotationRenderer(this.pdfViewer, this.pdfViewerBase);
        var textLabelCollection = [];
        var loadedFreetextAnnotations = [];
        this.isAnnotationPresent = false;
        if (loadedPage != null) {
            loadedFreetextAnnotations = this.getAllFreeTextAnnotations(loadedPage.annotations);
            this.annotationCount = 0;
            if (loadedPage.annotations != null && loadedPage.annotations.count > 0) {
                this.isAnnotationPresent = true;
                var _loop_1 = function (i) {
                    var annotation = loadedPage.annotations.at(i);
                    if (annotation instanceof PdfTextMarkupAnnotation) {
                        var textMarkup = annotRenderer.loadTextMarkupAnnotation(annotation, height, width, pageRotation, loadedPage);
                        this_1.textMarkupAnnotationList[this_1.textMarkupAnnotationList.length] = textMarkup;
                        this_1.annotationOrder[this_1.annotationOrder.length] = textMarkup;
                        var name_1 = this_1.textMarkupAnnotationList[this_1.textMarkupAnnotationList.length - 1].AnnotName;
                        if (isNullOrUndefined(name_1) || name_1 === '') {
                            this_1.textMarkupAnnotationList[this_1.textMarkupAnnotationList.length - 1].AnnotName =
                                this_1.setAnnotationName(pageNumber);
                        }
                    }
                    else if (annotation instanceof PdfLineAnnotation) {
                        var shapeLabel = this_1.getShapeFreeText(annotation.name, loadedFreetextAnnotations);
                        if (!isNullOrUndefined(shapeLabel)) {
                            textLabelCollection.push(shapeLabel.name);
                        }
                        var shapes = annotRenderer.loadLineAnnotation(annotation, height, width, pageRotation, shapeLabel);
                        var name_2 = shapes.AnnotName;
                        if (isNullOrUndefined(name_2) || name_2 === '') {
                            shapes.AnnotName = this_1.setAnnotationName(pageNumber);
                        }
                        if (!isNullOrUndefined(shapes)) {
                            if (shapes instanceof MeasureShapeAnnotationBase) {
                                this_1.measureAnnotationList[this_1.measureAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                            else if (shapes instanceof ShapeAnnotationBase) {
                                this_1.shapeAnnotationList[this_1.shapeAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                        }
                    }
                    else if (annotation instanceof PdfSquareAnnotation || annotation instanceof PdfRectangleAnnotation) {
                        var shapeLabel = this_1.getShapeFreeText(annotation.name, loadedFreetextAnnotations);
                        if (!isNullOrUndefined(shapeLabel)) {
                            textLabelCollection.push(shapeLabel.name);
                        }
                        var shapes = annotRenderer.loadSquareAnnotation(annotation, height, width, pageRotation, shapeLabel);
                        var name_3 = shapes.AnnotName;
                        if (isNullOrUndefined(name_3) || name_3 === '') {
                            shapes.AnnotName = this_1.setAnnotationName(pageNumber);
                        }
                        if (!isNullOrUndefined(shapes)) {
                            if (shapes instanceof MeasureShapeAnnotationBase) {
                                this_1.measureAnnotationList[this_1.measureAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                            else if (shapes instanceof ShapeAnnotationBase) {
                                this_1.shapeAnnotationList[this_1.shapeAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                        }
                    }
                    else if (annotation instanceof PdfCircleAnnotation) {
                        var shapeLabel = this_1.getShapeFreeText(annotation.name, loadedFreetextAnnotations);
                        if (!isNullOrUndefined(shapeLabel)) {
                            textLabelCollection.push(shapeLabel.name);
                        }
                        var shapes = annotRenderer.loadEllipseAnnotation(annotation, height, width, pageRotation, shapeLabel);
                        if (!isNullOrUndefined(shapes)) {
                            if (shapes instanceof MeasureShapeAnnotationBase) {
                                this_1.measureAnnotationList[this_1.measureAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                            else if (shapes instanceof ShapeAnnotationBase) {
                                this_1.shapeAnnotationList[this_1.shapeAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                        }
                    }
                    else if (annotation instanceof PdfEllipseAnnotation) {
                        var shapeLabel = this_1.getShapeFreeText(annotation.name, loadedFreetextAnnotations);
                        if (!isNullOrUndefined(shapeLabel)) {
                            textLabelCollection.push(shapeLabel.name);
                        }
                        var shapes = annotRenderer.loadEllipseAnnotation(annotation, height, width, pageRotation, shapeLabel);
                        if (!isNullOrUndefined(shapes)) {
                            if (shapes instanceof MeasureShapeAnnotationBase) {
                                this_1.measureAnnotationList[this_1.measureAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                            else if (shapes instanceof ShapeAnnotationBase) {
                                this_1.shapeAnnotationList[this_1.shapeAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                        }
                    }
                    else if (annotation instanceof PdfPolygonAnnotation) {
                        var shapeLabel = this_1.getShapeFreeText(annotation.name, loadedFreetextAnnotations);
                        if (!isNullOrUndefined(shapeLabel)) {
                            textLabelCollection.push(shapeLabel.name);
                        }
                        var shapes = annotRenderer.loadPolygonAnnotation(annotation, height, width, pageRotation, shapeLabel);
                        var name_4 = shapes.AnnotName;
                        if (isNullOrUndefined(name_4) || name_4 === '') {
                            shapes.AnnotName = this_1.setAnnotationName(pageNumber);
                        }
                        if (!isNullOrUndefined(shapes)) {
                            if (shapes instanceof MeasureShapeAnnotationBase) {
                                this_1.measureAnnotationList[this_1.measureAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                            else if (shapes instanceof ShapeAnnotationBase) {
                                this_1.shapeAnnotationList[this_1.shapeAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                        }
                    }
                    else if (annotation instanceof PdfPolyLineAnnotation || annotation instanceof PdfAngleMeasurementAnnotation) {
                        var shapeLabel = this_1.getShapeFreeText(annotation.name, loadedFreetextAnnotations);
                        if (!isNullOrUndefined(shapeLabel)) {
                            textLabelCollection.push(shapeLabel.name);
                        }
                        var shapes = annotRenderer.loadPolylineAnnotation(annotation, height, width, pageRotation, shapeLabel);
                        var name_5 = shapes.AnnotName;
                        if (isNullOrUndefined(name_5) || name_5 === '') {
                            shapes.AnnotName = this_1.setAnnotationName(pageNumber);
                        }
                        if (!isNullOrUndefined(shapes)) {
                            if (shapes instanceof MeasureShapeAnnotationBase) {
                                this_1.measureAnnotationList[this_1.measureAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                            else if (shapes instanceof ShapeAnnotationBase) {
                                this_1.shapeAnnotationList[this_1.shapeAnnotationList.length] = shapes;
                                this_1.annotationOrder[this_1.annotationOrder.length] = shapes;
                            }
                        }
                    }
                    if (annotation instanceof PdfRubberStampAnnotation) {
                        this_1.htmldata = [];
                        var stampAnnotation = annotation;
                        var pdfRenderedFormFields = [];
                        for (var _i = 0, _a = this_1.pdfViewer.pdfRendererModule.formFieldsBase.PdfRenderedFormFields; _i < _a.length; _i++) {
                            var formfield = _a[_i];
                            if (formfield.ActualFieldName === stampAnnotation._dictionary._map.T) {
                                pdfRenderedFormFields.push(formfield);
                                break;
                            }
                        }
                        if (stampAnnotation._dictionary.has('T') && this_1.checkName(stampAnnotation)) {
                            this_1.signatureAnnotationList.push(annotRenderer.loadSignatureImage(stampAnnotation, pageNumber));
                        }
                        else if (stampAnnotation._dictionary.has('M') || (stampAnnotation._dictionary.has('NM') ||
                            stampAnnotation._dictionary.has('Name') && !stampAnnotation._dictionary.has('F') ||
                            (!stampAnnotation._dictionary.has('NM') && !stampAnnotation._dictionary.has('T'))) ||
                            isNullOrUndefined(pdfRenderedFormFields[0]) || !this_1.pdfViewerBase.isSignatureWithInRect(this_1.pdfViewerBase.canvasRectArray(pdfRenderedFormFields[0].LineBounds), this_1.pdfViewerBase.canvasRectArray(stampAnnotation.bounds))) {
                            var rubberStampAnnotation = new StampAnnotationBase();
                            rubberStampAnnotation.Author = stampAnnotation.author;
                            rubberStampAnnotation.Subject = stampAnnotation.subject;
                            rubberStampAnnotation.AnnotName = stampAnnotation.name;
                            if (rubberStampAnnotation.AnnotName === '' || isNullOrUndefined(rubberStampAnnotation.AnnotName)) {
                                rubberStampAnnotation.AnnotName = this_1.setAnnotationName(pageNumber);
                            }
                            if (annotation._dictionary.has('rotateAngle')) {
                                var rotateAngle = annotation._dictionary.get('rotateAngle');
                                if (rotateAngle !== undefined) {
                                    // The rotateAngle will get as 1, 2 and 3 To save in RotateAngle multiplying with 90.
                                    rubberStampAnnotation.RotateAngle = parseInt(rotateAngle[0], 10) * 90;
                                }
                            }
                            else {
                                // If the rotate angle is not specified in the annotation dictionary, then calculate it based on the page rotation.
                                rubberStampAnnotation.RotateAngle = 360 - (Math.abs(stampAnnotation.rotate) - (pageRotation * 90));
                                var rubberStampAnnotationAngle = rubberStampAnnotation.RotateAngle;
                                if (rubberStampAnnotation.RotateAngle >= 360) {
                                    rubberStampAnnotation.RotateAngle = rubberStampAnnotationAngle - 360;
                                }
                            }
                            var isBoundsEqual = false;
                            if (rubberStampAnnotation.RotateAngle !== 0) {
                                isBoundsEqual = (Math.ceil(stampAnnotation._innerTemplateBounds.x * 100) / 100 ===
                                    Math.ceil(stampAnnotation.bounds.x * 100) / 100 &&
                                    Math.ceil(stampAnnotation._innerTemplateBounds.y * 100) / 100 ===
                                        Math.ceil(stampAnnotation.bounds.y * 100) / 100 &&
                                    Math.ceil(stampAnnotation._innerTemplateBounds.width * 100) / 100 ===
                                        Math.ceil(stampAnnotation.bounds.width * 100) / 100 &&
                                    Math.ceil(stampAnnotation._innerTemplateBounds.height * 100) / 100 ===
                                        Math.ceil(stampAnnotation.bounds.height * 100) / 100);
                            }
                            if ((rubberStampAnnotation.RotateAngle !== 0 && isBoundsEqual) || (rubberStampAnnotation.RotateAngle === 0)) {
                                rubberStampAnnotation.Rect = this_1.getBounds(stampAnnotation.bounds, height, width, pageRotation);
                            }
                            else {
                                var bounds = this_1.getRubberStampBounds(stampAnnotation._innerTemplateBounds, stampAnnotation.bounds, height, width, pageRotation);
                                rubberStampAnnotation.Rect = bounds;
                            }
                            if (rubberStampAnnotation.Rect.y < 0) {
                                var cropRect = new Rect(rubberStampAnnotation.Rect.x, loadedPage.cropBox[1] + rubberStampAnnotation.Rect.y, rubberStampAnnotation.Rect.width, rubberStampAnnotation.Rect.height);
                                rubberStampAnnotation.Rect = this_1.getBounds(cropRect, height, width, pageRotation);
                            }
                            rubberStampAnnotation.Icon = stampAnnotation.icon;
                            if (!isNullOrUndefined(stampAnnotation.modifiedDate)) {
                                rubberStampAnnotation.ModifiedDate = this_1.formatDate(stampAnnotation.modifiedDate);
                            }
                            else {
                                rubberStampAnnotation.ModifiedDate = this_1.formatDate(new Date());
                            }
                            rubberStampAnnotation.Opacity = stampAnnotation.opacity;
                            rubberStampAnnotation.pageNumber = pageNumber;
                            var dictionary = annotation._dictionary.get('AP');
                            this_1.pdfViewerBase.pngData.push(stampAnnotation);
                            rubberStampAnnotation.IsDynamic = false;
                            rubberStampAnnotation.AnnotType = 'stamp';
                            if (Object.prototype.hasOwnProperty.call(stampAnnotation._dictionary, 'iconName')) {
                                rubberStampAnnotation.IconName = stampAnnotation.getValues('iconName')[0];
                            }
                            else if (stampAnnotation.subject !== null) {
                                rubberStampAnnotation.IconName = stampAnnotation.subject;
                            }
                            else {
                                rubberStampAnnotation.IconName = '';
                            }
                            if (!isNullOrUndefined(stampAnnotation.text)) {
                                rubberStampAnnotation.Note = stampAnnotation.text;
                            }
                            else {
                                rubberStampAnnotation.Note = '';
                            }
                            annotRenderer.updateIsLockProperty(rubberStampAnnotation, stampAnnotation);
                            if (!isNullOrUndefined(stampAnnotation.reviewHistory)) {
                                for (var i_1 = 0; i_1 < stampAnnotation.reviewHistory.count; i_1++) {
                                    rubberStampAnnotation.State =
                                        this_1.getStateString(stampAnnotation.reviewHistory.at(parseInt(i_1.toString(), 10)).state);
                                    rubberStampAnnotation.StateModel =
                                        this_1.getStateModelString(stampAnnotation.reviewHistory.at(parseInt(i_1.toString(), 10)).stateModel);
                                }
                            }
                            if (rubberStampAnnotation.State == null || rubberStampAnnotation.StateModel == null) {
                                rubberStampAnnotation.State = 'Unmarked';
                                rubberStampAnnotation.StateModel = 'None';
                            }
                            rubberStampAnnotation.Comments = new Array();
                            for (var i_2 = 0; i_2 < stampAnnotation.comments.count; i_2++) {
                                var annot = annotRenderer.loadPopupAnnotation(stampAnnotation.comments.at(i_2), height, width, pageRotation);
                                rubberStampAnnotation.Comments.push(annot);
                            }
                            if (annotation._dictionary.has('Name')) {
                                rubberStampAnnotation.Name = annotation._dictionary.get('Name');
                                if (annotation._dictionary.get('Name').name && (annotation._dictionary.get('Name').name.includes('#23D') || annotation._dictionary.get('Name').name.includes('#D'))) {
                                    rubberStampAnnotation.IsDynamic = true;
                                }
                            }
                            rubberStampAnnotation.IsMaskedImage = this_1.isMaskedImage;
                            rubberStampAnnotation.Apperarance = this_1.htmldata;
                            if (stampAnnotation._dictionary.has('CustomData')) {
                                var customData = stampAnnotation._dictionary.get('CustomData');
                                if ((!isNullOrUndefined(customData) && customData.trim())) {
                                    var ExistingCustomData = dictionary.get('CustomData') ? dictionary.get('CustomData') : customData;
                                    if (ExistingCustomData) {
                                        rubberStampAnnotation.CustomData = ExistingCustomData;
                                    }
                                }
                            }
                            this_1.rubberStampAnnotationList.push(rubberStampAnnotation);
                            this_1.annotationOrder.push(rubberStampAnnotation);
                            if (isNullOrUndefined(dictionary)) {
                                var pdfReference = annotation._dictionary.get('AP');
                                if (!isNullOrUndefined(pdfReference) && !isNullOrUndefined(pdfReference.dictionary) && (pdfReference.dictionary.has('N'))) {
                                    var apDictionary = pdfReference.dictionary;
                                    if (!isNullOrUndefined(apDictionary)) {
                                        var template = annotation.createTemplate();
                                        if (template.size[0] === 0 || template.size[1] === 0 || isNullOrUndefined(template._appearance)) {
                                            this_1.findStampImage(annotation);
                                        }
                                        else {
                                            this_1.findStampTemplate(annotation, rubberStampAnnotation, pageRotation, this_1.annotationOrder.length - 1);
                                        }
                                    }
                                }
                            }
                            else if (dictionary.has('N')) {
                                var template = annotation.createTemplate();
                                if (template.size[0] === 0 || template.size[1] === 0 || isNullOrUndefined(template._appearance)) {
                                    this_1.findStampImage(annotation);
                                }
                                else {
                                    this_1.findStampTemplate(annotation, rubberStampAnnotation, pageRotation, this_1.annotationOrder.length - 1);
                                }
                            }
                        }
                    }
                    if (annotation instanceof PdfPopupAnnotation) {
                        if (!annotation._dictionary.has('IRT')) {
                            var stickyNote = annotRenderer.loadPopupAnnotation(annotation, height, width, pageRotation);
                            this_1.stickyAnnotationList[this_1.stickyAnnotationList.length] = stickyNote;
                            this_1.annotationOrder[this_1.annotationOrder.length] = stickyNote;
                            var name_6 = stickyNote.AnnotName;
                            if (isNullOrUndefined(name_6) || name_6 === '') {
                                stickyNote.AnnotName = this_1.setAnnotationName(pageNumber);
                            }
                        }
                    }
                    if (annotation instanceof PdfFreeTextAnnotation) {
                        var freeTextAnnot_1 = annotation;
                        var isFreeTextAnnotation = this_1.isFreeTextAnnotationType(freeTextAnnot_1);
                        if (isFreeTextAnnotation) {
                            var isShapeLabelAnnot = textLabelCollection.some(function (s) { return s === freeTextAnnot_1.name; });
                            var freeText = annotRenderer.loadFreeTextAnnotation(freeTextAnnot_1, height, width, pageRotation, loadedPage);
                            if (!isShapeLabelAnnot) {
                                this_1.freeTextAnnotationList[this_1.freeTextAnnotationList.length] = freeText;
                                this_1.annotationOrder[this_1.annotationOrder.length] = freeText;
                            }
                        }
                        else {
                            var freeText = annotRenderer.loadSignatureText(freeTextAnnot_1, pageNumber, height, width, pageRotation);
                            if (!freeTextAnnot_1._dictionary.has('T')) {
                                this_1.signatureAnnotationList[this_1.signatureAnnotationList.length] = freeText;
                                this_1.annotationOrder[this_1.annotationOrder.length] = freeText;
                            }
                        }
                    }
                    if (annotation instanceof PdfInkAnnotation) {
                        var inkAnnotation = annotation;
                        var signatureData = annotRenderer.loadSignature(inkAnnotation, height, width, pageRotation, pageNumber, loadedPage);
                        var inkSignatureData = annotRenderer.loadInkAnnotation(inkAnnotation, height, width, pageRotation, pageNumber, loadedPage);
                        if (!inkAnnotation._dictionary.has('T')) {
                            this_1.signatureAnnotationList.push(signatureData);
                            this_1.annotationOrder.push(signatureData);
                        }
                        else if (inkAnnotation._dictionary.has('NM')) {
                            this_1.signatureInkAnnotationList.push(inkSignatureData);
                            this_1.annotationOrder.push(inkSignatureData);
                        }
                        else if (inkAnnotation._dictionary.has('T')) {
                            if (inkAnnotation._dictionary.has('annotationSignature')) {
                                var canAdd = true;
                                canAdd = inkAnnotation.getValues('annotationSignature').length > 0 ? false : true;
                                if (canAdd) {
                                    this_1.signatureAnnotationList.push(signatureData);
                                    this_1.annotationOrder.push(signatureData);
                                }
                            }
                        }
                        if (!inkAnnotation._dictionary.has('NM') && !inkAnnotation._dictionary.has('annotationSignature')) {
                            this_1.signatureAnnotationList.push(signatureData);
                            this_1.annotationOrder.push(signatureData);
                        }
                    }
                };
                var this_1 = this;
                for (var i = 0; i < loadedPage.annotations.count; i++) {
                    _loop_1(i);
                }
            }
        }
        return { shapeAnnotation: this.shapeAnnotationList, textMarkupAnnotation: this.textMarkupAnnotationList,
            measureShapeAnnotation: this.measureAnnotationList, stampAnnotations: this.rubberStampAnnotationList,
            stickyNotesAnnotation: this.stickyAnnotationList, freeTextAnnotation: this.freeTextAnnotationList,
            signatureAnnotation: this.signatureAnnotationList, signatureInkAnnotation: this.signatureInkAnnotationList,
            annotationOrder: this.annotationOrder };
    };
    PageRenderer.prototype.formatDate = function (date) {
        var month = this.datePadding(date.getMonth() + 1); // Months are zero-based
        var day = this.datePadding(date.getDate());
        var year = date.getFullYear();
        var hours = this.datePadding(date.getHours());
        var minutes = this.datePadding(date.getMinutes());
        var seconds = this.datePadding(date.getSeconds());
        return month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
    };
    // Pad the numbers with leading zeros if they are single digits
    PageRenderer.prototype.datePadding = function (number) {
        return number < 10 ? ('0' + number) : number.toString();
    };
    /**
     * @private
     * @param {PdfAnnotation} annotation - annotation
     * @returns {void}
     */
    PageRenderer.prototype.findStampImage = function (annotation) {
        var stream = annotation._dictionary.get('AP').get('N');
        if (!isNullOrUndefined(stream)) {
            var appearance = stream;
            var data = appearance.getString();
            var content = _stringToBytes(data, true);
            var parser = new _ContentParser(content);
            var result = parser._readContent();
            this.stampAnnoattionRender(result, stream);
        }
    };
    /**
     * @private
     * @param {PdfRubberStampAnnotation} annotation - annotation
     * @param {any} rubberStampAnnotation - rubberStampAnnotation
     * @param {number} pageRotation - pageRotation
     * @param {number} collectionOrder - Gets the collection order
     * @param {boolean} isFormField - Optional flag indicating whether the annotation is for a form field.
     * @param {string} formFieldName - Optional name of the form field, if applicable.
     * @param {Array<any>} formFieldList - Optional list of form fields, if applicable.
     * @param {number} PageIndex - Optional page index, if applicable.
     * @returns {void}
     */
    PageRenderer.prototype.findStampTemplate = function (annotation, rubberStampAnnotation, pageRotation, collectionOrder, isFormField, formFieldName, formFieldList, PageIndex) {
        // Create a template from the appearance of rubber stamp annotation
        var template = annotation.createTemplate();
        //Store custom stamp model calss
        rubberStampAnnotation.template = template._appearance;
        rubberStampAnnotation.templateSize = template.size;
        var stampDocument = new PdfDocument(this.readFromResources());
        // Add a new page with template size and no margins
        var pageSettings = new PdfPageSettings();
        pageSettings.margins = new PdfMargins(0);
        // pageSettings.rotation = this.getPageRotation(annotation);
        pageSettings.rotation = pageRotation;
        pageSettings.size = template.size;
        var page = stampDocument.addPage(pageSettings);
        // Draw template into new page graphics
        page.graphics.drawTemplate(template, { x: 0, y: 0, width: template.size[0], height: template.size[1] });
        // Remove existing PDF page at index 0
        stampDocument.removePage(0);
        // Save the PDF document which have appearance template
        var data = 'data:application/pdf;base64,' + _encode(stampDocument.save());
        data = this.pdfViewerBase.checkDocumentData(data, false);
        var fileByteArray = this.pdfViewerBase.convertBase64(data);
        if (isFormField) {
            this.pdfViewerBase.pdfViewerRunner.addTask({ uploadedFile: fileByteArray, message: 'LoadPageStampCollection', password: null, pageIndex: 0, zoomFactor: this.pdfViewer.magnificationModule.zoomFactor, isTextNeed: false, isZoomMode: false, AnnotName: rubberStampAnnotation.AnnotName, rubberStampAnnotationPageNumber: rubberStampAnnotation.pageNumber, annotationOrder: JSON.stringify(this.annotationOrder), collectionOrder: collectionOrder, isFormField: isFormField, formFieldName: formFieldName, formFieldList: JSON.stringify(formFieldList), rubberStampAnnotation: rubberStampAnnotation, PageIndex: PageIndex }, TaskPriorityLevel.High);
        }
        else {
            this.pdfViewerBase.pdfViewerRunner.addTask({ uploadedFile: fileByteArray, message: 'LoadPageStampCollection', password: null, pageIndex: 0, zoomFactor: this.pdfViewer.magnificationModule.zoomFactor, isTextNeed: false, isZoomMode: false, AnnotName: rubberStampAnnotation.AnnotName, rubberStampAnnotationPageNumber: rubberStampAnnotation.pageNumber, annotationOrder: JSON.stringify(this.annotationOrder), collectionOrder: collectionOrder }, TaskPriorityLevel.High);
        }
    };
    /**
     * @private
     * @param {any} data - data
     * @returns {void}
     */
    PageRenderer.prototype.initialPagesRendered = function (data) {
        var canvas = document.createElement('canvas');
        var value = data.value, width = data.width, height = data.height;
        canvas.width = width;
        canvas.height = height;
        var canvasContext = canvas.getContext('2d');
        var imageData = canvasContext.createImageData(width, height);
        imageData.data.set(value);
        canvasContext.putImageData(imageData, 0, 0);
        var imageUrl = canvas.toDataURL();
        this.pdfViewerBase.releaseCanvas(canvas);
        var Json = { imagedata: imageUrl };
        var id = data.annotName;
        var annotOrder = [];
        if (JSON.parse(data.annotationOrder).length > 0) {
            annotOrder = JSON.parse(data.annotationOrder);
        }
        else {
            if (this.pdfViewer.viewerBase.importedAnnotation &&
                this.pdfViewer.viewerBase.importedAnnotation[data.rubberStampAnnotationPageNumber]) {
                annotOrder = this.pdfViewer.viewerBase.importedAnnotation[data.rubberStampAnnotationPageNumber].annotationOrder;
            }
        }
        var storeObject;
        var annotObject;
        var currentAnnot = annotOrder.find(function (currentAnnotation) { return id === currentAnnotation.AnnotName; });
        if (currentAnnot) {
            if (!isNullOrUndefined(currentAnnot.Apperarance)) {
                currentAnnot.Apperarance = [];
            }
            currentAnnot.Apperarance.push(Json);
            storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_stamp');
            if (this.pdfViewerBase.isStorageExceed) {
                storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_stamp'];
            }
            var shouldRender = true;
            if (storeObject) {
                annotObject = JSON.parse(storeObject);
                if (annotObject.length > 0) {
                    for (var i = 0; i < annotObject.length; i++) {
                        for (var j = 0; j < annotObject[parseInt(i.toString(), 10)].annotations.length; j++) {
                            if (annotObject[parseInt(i.toString(), 10)].annotations[parseInt(j.toString(), 10)].
                                annotName === currentAnnot.AnnotName) {
                                shouldRender = false;
                            }
                        }
                    }
                }
            }
            if (shouldRender) {
                this.pdfViewer.annotationModule.stampAnnotationModule.renderStampAnnotImage(currentAnnot, 0, null, null, true, true, data.collectionOrder);
            }
        }
        this.Imagedata = imageUrl;
    };
    /**
     * @private
     * @returns {void}
     */
    PageRenderer.prototype.readFromResources = function () {
        var base64string = 'JVBERi0xLjUNCiWDkvr+DQo0IDAgb2JqDQo8PA0KL1R5cGUgL0NhdGFsb2cNCi9QYWdlcyA1IDAgUg0KL0Fjcm9Gb3JtIDYgMCBSDQo+Pg0KZW5kb2JqDQoxIDAgb2JqDQo8PA0KL0ZpbHRlciAvRmxhdGVEZWNvZGUNCi9MZW5ndGggMTINCj4+DQpzdHJlYW0NCnheUyhU4AIAAiEAvA0KZW5kc3RyZWFtDQplbmRvYmoNCjIgMCBvYmoNCjw8DQovRmlsdGVyIC9GbGF0ZURlY29kZQ0KL0xlbmd0aCAxMg0KPj4NCnN0cmVhbQ0KeF5TCFTgAgABwQCcDQplbmRzdHJlYW0NCmVuZG9iag0KMyAwIG9iag0KPDwNCi9GaWx0ZXIgL0ZsYXRlRGVjb2RlDQovTGVuZ3RoIDEzNQ0KPj4NCnN0cmVhbQ0KeF5tjs0KwjAQhO8L+w578diYSlu9+wSC4DnUbRvIT0324ttrogiih2UYlm9mbggbOi4mzExjbGK62mCEKd+zsCeJ5HiSrcRVIbRKa1Lv+5hDtytCo69Zzq7kTZptyE+k0+XXvKRv++r2QyUSIywIFwoFPCcTsivdvzv+dn9F1/YTwgN6hTPqDQplbmRzdHJlYW0NCmVuZG9iag0KOSAwIG9iag0KPDwNCi9GaXJzdCAyNg0KL04gNA0KL1R5cGUgL09ialN0bQ0KL0ZpbHRlciAvRmxhdGVEZWNvZGUNCi9MZW5ndGggMTk2DQo+Pg0Kc3RyZWFtDQp4Xm1PTQuCQBC9L+x/mF+Qu34H4qHCSwRi3cTDYkMI4YauUP++WcVM6rA784b35r0JQHAWgpQ+ZxFIL+QsBlcIzpKEM+fyeiA4ubphT+jYXHsoIxBQVAT3emgNSOoK7PXQ1dhDkqQpZzQ64bVRO/2EciME2BdsA1ti36Vi9YU2yqANMGlGx6zBu3WpVtPF6l+ieE6Uqw6JF1i80i+qhRVNLNrdGsK0R9oJuOPvzTu/b7PiTtdnNFA6+SH7hPy55Q19a1EBDQplbmRzdHJlYW0NCmVuZG9iag0KMTAgMCBvYmoNCjw8DQovUm9vdCA0IDAgUg0KL0luZGV4IFswIDExXQ0KL1NpemUgMTENCi9UeXBlIC9YUmVmDQovVyBbMSAyIDFdDQovRmlsdGVyIC9GbGF0ZURlY29kZQ0KL0xlbmd0aCA0NA0KPj4NCnN0cmVhbQ0KeF4Vw0ENACAMALG77cVzBvCFUEShAkaTAlcWstFCimD89uipB3PyAFuGA3QNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCnN0YXJ0eHJlZg0KNzk4DQolJUVPRg0KJVBERi0xLjUNCiWDkvr+DQoxMSAwIG9iag0KPDwNCi9GaXJzdCA1DQovTiAxDQovVHlwZSAvT2JqU3RtDQovRmlsdGVyIC9GbGF0ZURlY29kZQ0KL0xlbmd0aCA3MQ0KPj4NCnN0cmVhbQ0KeF4zVzDg5bKx4eXSd84vzStRMOTl0g+pLEhV0A9ITE8tBvK8M1OKFaItFAwUgmKB3IDEolSgOlMQn5fLzo6Xi5cLAEOtEAkNCmVuZHN0cmVhbQ0KZW5kb2JqDQoxMiAwIG9iag0KPDwNCi9Sb290IDQgMCBSDQovSW5kZXggWzAgMSA3IDEgMTEgMl0NCi9TaXplIDEzDQovVHlwZSAvWFJlZg0KL1cgWzEgMiAxXQ0KL1ByZXYgNzk4DQovTGVuZ3RoIDI0DQovRmlsdGVyIC9GbGF0ZURlY29kZQ0KPj4NCnN0cmVhbQ0KeF5jYGD4z8TAzcDIwsLAyLKbAQAPSwHWDQplbmRzdHJlYW0NCmVuZG9iag0KDQpzdGFydHhyZWYNCjEyMTENCiUlRU9GDQo=';
        return base64string;
    };
    /**
     * @private
     * @param {PdfRubberStampAnnotation} annotation - annotation
     * @returns {void}
     */
    PageRenderer.prototype.getPageRotation = function (annotation) {
        if (annotation.rotate === 0) {
            return 0;
        }
        else if (annotation.rotate === 90) {
            return 1;
        }
        else if (annotation.rotate === 180) {
            return 2;
        }
        else if (annotation.rotate === 270) {
            return 3;
        }
        return 0;
    };
    PageRenderer.prototype.stampAnnoattionRender = function (recordCollection, dictionary) {
        if (!isNullOrUndefined(recordCollection)) {
            for (var i = 0; i < recordCollection.length; i++) {
                var element = recordCollection[parseInt(i.toString(), 10)]._operands;
                switch (recordCollection[parseInt(i.toString(), 10)]._operator) {
                    case 'q': {
                        var Json = { restorecanvas: false };
                        this.htmldata.push(Json);
                        break;
                    }
                    case 'Q': {
                        var Json = { restorecanvas: true };
                        this.htmldata.push(Json);
                        break;
                    }
                    case 'Tr': {
                        this.renderingMode = parseInt(element[0], 10);
                        break;
                    }
                    case 'TJ':
                    case 'Tj': {
                        this.textString = recordCollection[parseInt(i.toString(), 10)]._operands[0];
                        var Json = { type: 'string', text: this.textString, currentFontname: this.currentFont, baseFontName: this.baseFont, fontSize: this.fontSize };
                        this.htmldata.push(Json);
                        break;
                    }
                    case '\'': {
                        this.textString = recordCollection[parseInt(i.toString(), 10)]._operands[0];
                        var Json = { type: 'string', text: this.textString, currentFontname: this.currentFont, baseFontName: this.baseFont, fontSize: this.fontSize };
                        this.htmldata.push(Json);
                        break;
                    }
                    case 'Tf': {
                        var j = 0;
                        for (j = 0; j < element.length; j++) {
                            if (element[parseInt(j.toString(), 10)].includes('/')) {
                                this.currentFont = element[parseInt(j.toString(), 10)].replace('/', '');
                                break;
                            }
                        }
                        this.fontSize = parseInt(element[j + 1], 10);
                        if (dictionary.dictionary.has('Resources')) {
                            var stdic = dictionary.dictionary.get('Resources');
                            if (!isNullOrUndefined(stdic)) {
                                var fontObject = stdic.get('Font');
                                if (!isNullOrUndefined(fontObject) && recordCollection[parseInt(i.toString(), 10)]._operator === 'Tf') {
                                    var name_7 = element[0].replace('/', '');
                                    var refernceholder = fontObject.get(name_7);
                                    if (!isNullOrUndefined(refernceholder) && !isNullOrUndefined(refernceholder.dictionary)) {
                                        var sub = refernceholder.dictionary;
                                        this.baseFont = sub.get('BaseFont');
                                    }
                                }
                            }
                        }
                        break;
                    }
                    case 'Do': {
                        if (dictionary.dictionary.has('Resources')) {
                            var stdic = dictionary.dictionary.get('Resources');
                            if (!isNullOrUndefined(stdic)) {
                                var xObject = stdic.get('XObject');
                                if (!isNullOrUndefined(xObject) && recordCollection[parseInt(i.toString(), 10)]._operator === 'Do') {
                                    var name_8 = element[0].replace('/', '');
                                    if (xObject.has(name_8)) {
                                        var refernceholder = xObject.get(name_8);
                                        if (!isNullOrUndefined(refernceholder) && !isNullOrUndefined(refernceholder.dictionary)) {
                                            var sub = refernceholder;
                                            if (sub.dictionary.get('Subtype').name === 'Image') {
                                                var imageStucture = new ImageStructureBase(sub, sub.dictionary);
                                                if (!isNullOrUndefined(imageStucture)) {
                                                    var imageStream = imageStucture.getImageStream();
                                                    var imageString = 'data:image/png;base64,' + _encode(imageStream);
                                                    var Json = { imagedata: imageString };
                                                    this.htmldata.push(Json);
                                                    this.Imagedata = imageString;
                                                }
                                            }
                                            else if (sub.dictionary.get('Subtype').name === 'Form') {
                                                var appearance = sub;
                                                var data = appearance.getString();
                                                var content = _stringToBytes(data, true);
                                                var parser = new _ContentParser(content);
                                                var result = parser._readContent();
                                                this.stampAnnoattionRender(result, sub);
                                            }
                                            this.IsMaskedImage = false;
                                            if (sub.dictionary.get('SMask')) {
                                                this.IsMaskedImage = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }
    };
    PageRenderer.prototype.getStateModelString = function (stateModel) {
        switch (stateModel) {
            case PdfAnnotationStateModel.review:
                return 'Review';
            case PdfAnnotationStateModel.marked:
                return 'Marked';
            case PdfAnnotationStateModel.none:
                return 'None';
            default:
                return 'None';
        }
    };
    PageRenderer.prototype.getStateString = function (state) {
        switch (state) {
            case PdfAnnotationState.accepted:
                return 'Accepted';
            case PdfAnnotationState.rejected:
                return 'Rejected';
            case PdfAnnotationState.cancel:
                return 'Cancelled';
            case PdfAnnotationState.completed:
                return 'Completed';
            case PdfAnnotationState.none:
                return 'None';
            case PdfAnnotationState.unmarked:
                return 'Unmarked';
            case PdfAnnotationState.marked:
                return 'Marked';
            case PdfAnnotationState.unknown:
                return 'Unknown';
            default:
                return null;
        }
    };
    PageRenderer.prototype.getBounds = function (bounds, pageHeight, pageWidth, pageRotation) {
        var bound;
        if (pageRotation === 0) {
            bound = new Rect(bounds.x, bounds.y, bounds.width, bounds.height);
        }
        else if (pageRotation === 1) {
            bound = new Rect(this.convertPixelToPoint(pageWidth - this.convertPointToPixel(bounds.y) -
                this.convertPointToPixel(bounds.height)), bounds.x, bounds.height, bounds.width);
        }
        else if (pageRotation === 2) {
            bound = new Rect(this.convertPixelToPoint(pageWidth - this.convertPointToPixel(bounds.x) -
                this.convertPointToPixel(bounds.width)), this.convertPixelToPoint(pageHeight -
                this.convertPointToPixel(bounds.y) - this.convertPointToPixel(bounds.height)), bounds.width, bounds.height);
        }
        else if (pageRotation === 3) {
            bound = new Rect(bounds.y, this.convertPixelToPoint(pageHeight - this.convertPointToPixel(bounds.x) -
                this.convertPointToPixel(bounds.width)), bounds.height, bounds.width);
        }
        return bound;
    };
    PageRenderer.prototype.getRubberStampBounds = function (innerTemplateBounds, bounds, pageHeight, pageWidth, pageRotation) {
        var bound = new Rect();
        var centerPointX = 0;
        var centerPointY = 0;
        if (pageRotation === 0) {
            centerPointX = bounds.x + (bounds.width / 2);
            centerPointY = bounds.y + (bounds.height / 2);
            bound = new Rect(centerPointX - (innerTemplateBounds.width / 2), centerPointY -
                (innerTemplateBounds.height / 2), innerTemplateBounds.width, innerTemplateBounds.height);
        }
        else if (pageRotation === 1) {
            var boundsX = this.convertPixelToPoint(pageWidth - this.convertPointToPixel(!isNullOrUndefined(bounds.Y) ?
                bounds.Y : bounds.y) - this.convertPointToPixel(bounds.height));
            var boundsY = !isNullOrUndefined(bounds.X) ? bounds.X : bounds.x;
            centerPointX = boundsX + (bounds.height / 2);
            centerPointY = boundsY + (bounds.width / 2);
            bound = new Rect(centerPointX - (innerTemplateBounds.width / 2), centerPointY - (innerTemplateBounds.height / 2), innerTemplateBounds.width, innerTemplateBounds.height);
        }
        else if (pageRotation === 2) {
            var boundsX = this.convertPixelToPoint(pageWidth - this.convertPointToPixel(!isNullOrUndefined(bounds.X) ?
                bounds.X : bounds.x) - this.convertPointToPixel(bounds.width));
            var boundsY = this.convertPixelToPoint(pageHeight - this.convertPointToPixel(!isNullOrUndefined(bounds.Y) ?
                bounds.Y : bounds.y) - this.convertPointToPixel(bounds.height));
            centerPointX = boundsX + (bounds.width / 2);
            centerPointY = boundsY + (bounds.height / 2);
            bound = new Rect(centerPointX - (innerTemplateBounds.width / 2), centerPointY - (innerTemplateBounds.height / 2), innerTemplateBounds.width, innerTemplateBounds.height);
        }
        else if (pageRotation === 3) {
            var boundsX = !isNullOrUndefined(bounds.Y) ? bounds.Y : bounds.y;
            var boundsY = this.convertPixelToPoint(pageHeight - this.convertPointToPixel(!isNullOrUndefined(bounds.X) ?
                bounds.X : bounds.x) - this.convertPointToPixel(bounds.width));
            centerPointX = boundsX + (bounds.height / 2);
            centerPointY = boundsY + (bounds.width / 2);
            bound = new Rect(centerPointX - (innerTemplateBounds.width / 2), centerPointY - (innerTemplateBounds.height / 2), innerTemplateBounds.width, innerTemplateBounds.height);
        }
        return bound;
    };
    PageRenderer.prototype.convertPixelToPoint = function (value) {
        return (value * 72 / 96);
    };
    PageRenderer.prototype.convertPointToPixel = function (value) {
        return (value * 96 / 72);
    };
    PageRenderer.prototype.getRotateAngleString = function (angle) {
        switch (angle) {
            case PdfRotationAngle.angle0:
                return 'RotateAngle0';
            case PdfRotationAngle.angle90:
                return 'RotateAngle90';
            case PdfRotationAngle.angle180:
                return 'RotateAngle180';
            case PdfRotationAngle.angle270:
                return 'RotateAngle270';
            default:
                return 'RotateAngle0';
        }
    };
    PageRenderer.prototype.checkName = function (stampAnnotation) {
        // Check if the stamp annotation has a "Name" key in its dictionary.
        if ('Name' in stampAnnotation._dictionary) {
            // Get the custom data for the "Name" key.
            var customData = stampAnnotation.getValues('Name');
            // Check if the custom data is not null and contains a '#' character.
            if (!(isNullOrUndefined(customData)) && customData.indexOf('#') > -1) {
                // The stamp annotation has a name that contains a '#' character.
                return true;
            }
        }
        // The stamp annotation does not have a name that contains a '#' character.
        return false;
    };
    PageRenderer.prototype.getAllFreeTextAnnotations = function (annotations) {
        var loadedFreetextAnnotations = [];
        for (var i = 0; i < annotations.count; i++) {
            var annotation = annotations.at(i);
            if (annotation instanceof PdfFreeTextAnnotation) {
                loadedFreetextAnnotations.push(annotation);
            }
        }
        return loadedFreetextAnnotations;
    };
    PageRenderer.prototype.getShapeFreeText = function (shapeName, loadedFreetextAnnotations) {
        if (!isNullOrUndefined(shapeName) && shapeName !== '') {
            // eslint-disable-next-line
            return loadedFreetextAnnotations.find(function (annot) { return annot.name != undefined &&
                annot.name.includes(shapeName); });
        }
        return null;
    };
    PageRenderer.prototype.setAnnotationName = function (pageNumber) {
        var annotationName = pageNumber + this.annotationCount.toString();
        this.annotationCount++;
        return annotationName;
    };
    PageRenderer.prototype.isFreeTextAnnotationType = function (freeTextAnnot) {
        var isFreeTextAnnotation = true;
        if (freeTextAnnot._dictionary.has('AnnotationType')) {
            var annotType = freeTextAnnot.getValues('AnnotationType');
            if (!isNullOrUndefined(annotType) && annotType[0] === 'Signature') {
                isFreeTextAnnotation = false;
            }
        }
        return isFreeTextAnnotation;
    };
    return PageRenderer;
}());
export { PageRenderer };
/**
 *
 * @hidden
 */
var StampAnnotationBase = /** @class */ (function () {
    function StampAnnotationBase() {
    }
    return StampAnnotationBase;
}());
export { StampAnnotationBase };
