import { FontStyle } from './../base/types';
import { PdfViewerBase } from '../index';
import { isBlazor, isNullOrUndefined, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
/**
 * @hidden
 */
var FreeTextAnnotation = /** @class */ (function () {
    function FreeTextAnnotation(pdfviewer, pdfViewerBase) {
        /**
         * @private
         */
        this.inputBoxCount = 0;
        /**
         * @private
         */
        this.isFreeTextValueChange = false;
        /**
         * @private
         */
        this.isAddAnnotationProgramatically = false;
        /**
         * @private
         */
        this.isInuptBoxInFocus = false;
        /**
         * @private
         */
        this.freeTextPageNumbers = [];
        /**
         * @private
         */
        this.selectedText = '';
        /**
         * @private
         */
        this.isTextSelected = false;
        this.selectionStart = 0;
        this.selectionEnd = 0;
        /**
         * @private
         */
        this.isBold = false;
        /**
         * @private
         */
        this.isItalic = false;
        /**
         * @private
         */
        this.isUnderline = false;
        /**
         * @private
         */
        this.isStrikethrough = false;
        this.isReadonly = false;
        this.isMaximumWidthReached = false;
        this.freeTextPaddingLeft = 4;
        this.freeTextPaddingTop = 5;
        this.defaultFontSize = 16;
        this.lineGap = 1.5;
        /**
         * @private
         */
        this.previousText = 'Type Here';
        /**
         * @private
         */
        this.currentPosition = [];
        this.pdfViewer = pdfviewer;
        this.pdfViewerBase = pdfViewerBase;
        this.updateTextProperties();
        this.inputBoxElement = document.createElement('textarea');
        this.inputBoxElement.style.position = 'absolute';
        this.inputBoxElement.style.Width = this.defautWidth;
        this.inputBoxElement.style.Height = this.defaultHeight;
        this.inputBoxElement.style.zIndex = '5';
        this.inputBoxElement.style.fontSize = this.fontSize + 'px';
        this.inputBoxElement.className = 'free-text-input';
        this.inputBoxElement.style.resize = 'none';
        this.inputBoxElement.style.borderColor = this.borderColor;
        this.inputBoxElement.style.background = this.fillColor;
        this.inputBoxElement.style.borderStyle = this.borderStyle;
        this.inputBoxElement.style.borderWidth = this.borderWidth + 'px';
        this.inputBoxElement.style.padding = this.padding;
        this.inputBoxElement.style.paddingLeft = this.freeTextPaddingLeft + 'px';
        this.inputBoxElement.style.paddingTop = this.freeTextPaddingTop * (parseFloat(this.inputBoxElement.style.fontSize) / this.defaultFontSize) + 'px';
        this.inputBoxElement.style.borderRadius = '2px';
        this.inputBoxElement.style.verticalAlign = 'middle';
        this.inputBoxElement.style.fontFamily = this.fontFamily;
        this.inputBoxElement.style.color = this.pdfViewer.freeTextSettings.fontColor ?
            this.pdfViewer.freeTextSettings.fontColor : '#000';
        this.inputBoxElement.style.overflow = 'hidden';
        this.inputBoxElement.style.wordBreak = this.wordBreak;
        this.inputBoxElement.readOnly = this.isReadonly;
        this.inputBoxElement.addEventListener('focusout', this.onFocusOutInputBox.bind(this));
        this.inputBoxElement.addEventListener('keydown', this.onKeyDownInputBox.bind(this));
        this.inputBoxElement.addEventListener('mouseup', this.onMouseUpInputBox.bind(this));
        this.freeTextPageNumbers = [];
    }
    /**
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.updateTextProperties = function () {
        this.defautWidth = this.pdfViewer.freeTextSettings.width ? this.pdfViewer.freeTextSettings.width : 151;
        this.defaultHeight = this.pdfViewer.freeTextSettings.height ? this.pdfViewer.freeTextSettings.height : 24.6;
        this.borderColor = this.pdfViewer.freeTextSettings.borderColor ? this.pdfViewer.freeTextSettings.borderColor : '#ffffff00';
        this.fillColor = this.pdfViewer.freeTextSettings.fillColor ? this.pdfViewer.freeTextSettings.fillColor : '#fff';
        this.borderStyle = this.pdfViewer.freeTextSettings.borderStyle ? this.pdfViewer.freeTextSettings.borderStyle : 'solid';
        this.borderWidth = !isNullOrUndefined(this.pdfViewer.freeTextSettings.borderWidth) ?
            this.pdfViewer.freeTextSettings.borderWidth : 1;
        this.fontSize = this.pdfViewer.freeTextSettings.fontSize ? this.pdfViewer.freeTextSettings.fontSize : 16;
        this.opacity = this.pdfViewer.freeTextSettings.opacity ? this.pdfViewer.freeTextSettings.opacity : 1;
        this.fontColor = this.pdfViewer.freeTextSettings.fontColor ? this.pdfViewer.freeTextSettings.fontColor : '#000';
        this.author = (this.pdfViewer.freeTextSettings.author && this.pdfViewer.freeTextSettings.author !== 'Guest') ? this.pdfViewer.freeTextSettings.author : this.pdfViewer.annotationSettings.author ? this.pdfViewer.annotationSettings.author : 'Guest';
        if (!isNullOrUndefined(this.pdfViewer.annotationModule)) {
            if (this.getRgbCode(this.borderColor).a === 0) {
                this.borderWidth = 0;
            }
        }
        if (this.pdfViewer.freeTextSettings.fontFamily) {
            var fontName = this.pdfViewer.freeTextSettings.fontFamily;
            if (fontName === 'Helvetica' || fontName === 'Times New Roman' || fontName === 'Courier' || fontName === 'Symbol' || fontName === 'ZapfDingbats') {
                this.fontFamily = fontName;
            }
            else {
                this.fontFamily = 'Helvetica';
            }
        }
        else {
            this.fontFamily = 'Helvetica';
        }
        this.textAlign = this.pdfViewer.freeTextSettings.textAlignment ? this.pdfViewer.freeTextSettings.textAlignment : 'Left';
        this.defaultText = this.pdfViewer.freeTextSettings.defaultText ? this.pdfViewer.freeTextSettings.defaultText : 'Type here';
        this.isReadonly = false;
        if (this.pdfViewer.freeTextSettings.enableAutoFit) {
            this.wordBreak = 'break-all';
            this.padding = '2px';
        }
        else {
            this.padding = '0px';
            this.wordBreak = 'break-word';
        }
        if (this.pdfViewer.freeTextSettings.isLock || this.pdfViewer.annotationSettings.isLock
            || this.pdfViewer.freeTextSettings.isReadonly) {
            this.isReadonly = true;
        }
        this.isBold = (this.pdfViewer.freeTextSettings.fontStyle & FontStyle.Bold) === FontStyle.Bold;
        this.isItalic = (this.pdfViewer.freeTextSettings.fontStyle & FontStyle.Italic) === FontStyle.Italic;
        this.isUnderline = (this.pdfViewer.freeTextSettings.fontStyle & FontStyle.Underline) === FontStyle.Underline;
        this.isStrikethrough = (this.pdfViewer.freeTextSettings.fontStyle & FontStyle.Strikethrough) === FontStyle.Strikethrough;
    };
    /**
     * @param {any} shapeAnnotations - It describes about the shape annotations
     * @param {number} pageNumber - It describes about the page number value
     * @param {boolean} isImportAction - It ensures whether the isImportAction is true or not
     * @param {boolean} isAnnotOrderAction - It ensures whether the isAnnotOrderAction is true or not
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.renderFreeTextAnnotations = function (shapeAnnotations, pageNumber, isImportAction, isAnnotOrderAction) {
        var isFreeTextAdded = false;
        if (!isImportAction) {
            for (var p = 0; p < this.freeTextPageNumbers.length; p++) {
                if (this.freeTextPageNumbers[parseInt(p.toString(), 10)] === pageNumber) {
                    isFreeTextAdded = true;
                    break;
                }
            }
        }
        if (shapeAnnotations && (!isFreeTextAdded || isAnnotOrderAction)) {
            if (shapeAnnotations.length >= 1) {
                this.freeTextPageNumbers.push(pageNumber);
                for (var i = 0; i < shapeAnnotations.length; i++) {
                    var annotation = shapeAnnotations[parseInt(i.toString(), 10)];
                    annotation.annotationAddMode = this.pdfViewer.annotationModule.
                        findAnnotationMode(annotation, pageNumber, annotation.AnnotType);
                    if (annotation.AnnotType) {
                        var vertexPoints = null;
                        if (annotation.VertexPoints) {
                            vertexPoints = [];
                            for (var j = 0; j < annotation.VertexPoints.length; j++) {
                                var point = { x: annotation.VertexPoints[parseInt(j.toString(), 10)].X,
                                    y: annotation.VertexPoints[parseInt(j.toString(), 10)].Y };
                                vertexPoints.push(point);
                            }
                        }
                        annotation.AnnotationSettings = annotation.AnnotationSettings ?
                            annotation.AnnotationSettings : this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.freeTextSettings);
                        if (annotation.IsLocked) {
                            annotation.AnnotationSettings.isLock = annotation.IsLocked;
                        }
                        var paddingValue = 0.5;
                        var annotationBoundsX = !isNullOrUndefined(annotation.Bounds.X) ?
                            annotation.Bounds.X - paddingValue : annotation.Bounds.x;
                        var annotationBoundsY = !isNullOrUndefined(annotation.Bounds.Y) ?
                            annotation.Bounds.Y - paddingValue : annotation.Bounds.y;
                        var width = annotation.Bounds.Width ?
                            annotation.Bounds.Width : annotation.Bounds.width;
                        var height = annotation.Bounds.Height ?
                            annotation.Bounds.Height : annotation.Bounds.height;
                        var isAddedProgramatically = annotation.isAddAnnotationProgramatically ?
                            annotation.isAddAnnotationProgramatically : false;
                        var rotateValue = this.getRotationValue(pageNumber, isAddedProgramatically);
                        var pageRotate = annotation.PageRotation;
                        if (Math.sign(annotation.Rotate) === 1) {
                            annotation.Rotate = -annotation.Rotate + rotateValue;
                        }
                        else {
                            annotation.Rotate = annotation.Rotate + rotateValue;
                        }
                        var rotateAngle = Math.abs(annotation.Rotate);
                        if (isImportAction && rotateValue !== pageRotate) {
                            if (this.pdfViewerBase.isJsonImported) {
                                var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)];
                                var boundsX = annotation.Bounds.X;
                                var boundsY = annotation.Bounds.Y;
                                var annotationWidth = width;
                                var annotationHeight = height;
                                if (pageRotate > 0) {
                                    var rotatation = pageRotate / 90;
                                    if (rotatation === 1) {
                                        height = width;
                                        width = annotation.Bounds.Height;
                                        annotationBoundsX = annotation.Bounds.Y;
                                        if (rotateValue !== 270) {
                                            annotationBoundsY = pageDetails.height - annotation.Bounds.X -
                                                annotation.Bounds.Width;
                                        }
                                        else {
                                            annotationBoundsY = pageDetails.width - annotation.Bounds.X -
                                                annotation.Bounds.Width;
                                        }
                                    }
                                    else if (rotatation === 2) {
                                        if (rotateValue !== 270 && rotateValue !== 90) {
                                            annotationBoundsX = pageDetails.width - annotation.Bounds.X -
                                                annotation.Bounds.Width;
                                            annotationBoundsY = pageDetails.height - annotation.Bounds.Y -
                                                annotation.Bounds.Height;
                                        }
                                        else {
                                            annotationBoundsX = pageDetails.height - annotation.Bounds.X -
                                                annotation.Bounds.Width;
                                            annotationBoundsY = pageDetails.width - annotation.Bounds.Y -
                                                annotation.Bounds.Height;
                                        }
                                    }
                                    else if (rotatation === 3) {
                                        height = width;
                                        width = annotation.Bounds.Height;
                                        if (rotateValue !== 90) {
                                            annotationBoundsX = pageDetails.width - annotation.Bounds.Y - width;
                                        }
                                        else {
                                            annotationBoundsX = pageDetails.height - annotation.Bounds.Y - width;
                                        }
                                        annotationBoundsY = annotation.Bounds.X;
                                    }
                                    boundsX = annotationBoundsX;
                                    boundsY = annotationBoundsY;
                                    annotationWidth = width;
                                    annotationHeight = height;
                                }
                                rotateAngle = (rotateValue / 90) % 4;
                                if (rotateAngle === 1) {
                                    height = width;
                                    width = annotationHeight;
                                    annotationBoundsX = pageDetails.width - boundsY - annotationHeight - paddingValue;
                                    annotationBoundsY = boundsX - paddingValue;
                                    rotateAngle = 90;
                                }
                                else if (rotateAngle === 2) {
                                    annotationBoundsX = pageDetails.width - boundsX - annotationWidth - paddingValue;
                                    annotationBoundsY = pageDetails.height - boundsY - annotationHeight - paddingValue;
                                    rotateAngle = 180;
                                }
                                else if (rotateAngle === 3) {
                                    height = width;
                                    width = annotationHeight;
                                    annotationBoundsX = boundsY - paddingValue;
                                    annotationBoundsY = pageDetails.height - boundsX - height - paddingValue;
                                    rotateAngle = 270;
                                }
                                else if (rotateAngle === 0) {
                                    annotationBoundsX = boundsX - paddingValue;
                                    annotationBoundsY = boundsY - paddingValue;
                                }
                            }
                        }
                        if (rotateAngle === 90 || rotateAngle === 270) {
                            var rotationHeight = height;
                            var rotationWidth = width;
                            height = rotationWidth;
                            width = rotationHeight;
                            annotationBoundsX = (annotationBoundsX - (width / 2)) + (height / 2);
                            annotationBoundsY = (annotationBoundsY) + (width / 2 - height / 2);
                        }
                        annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions :
                            this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
                        if (!isNullOrUndefined(annotation) && annotation.MarkupText && annotation.MarkupText.includes('\n')) {
                            var noOfLines = annotation.MarkupText.split('\n').length;
                            var newHeight = noOfLines * annotation.FontSize * this.lineGap;
                            var pageHeight = this.pdfViewerBase.pageSize[parseInt(pageNumber.toString(), 10)].height
                                - annotation.Bounds.Y;
                            if (height < newHeight) {
                                height = newHeight;
                            }
                            if (height > pageHeight) {
                                height = pageHeight;
                            }
                        }
                        var annot = {
                            author: annotation.Author, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, id: 'freetext' + this.inputBoxCount,
                            rotateAngle: annotation.Rotate, dynamicText: annotation.MarkupText, strokeColor: annotation.StrokeColor,
                            thickness: annotation.Thickness, fillColor: annotation.FillColor,
                            bounds: {
                                x: annotationBoundsX, y: annotationBoundsY, left: annotationBoundsX, top: annotationBoundsY,
                                width: width, height: height, right: annotation.Bounds.Right,
                                bottom: annotation.Bounds.Bottom
                            }, annotName: annotation.AnnotName, shapeAnnotationType: 'FreeText',
                            pageIndex: pageNumber, opacity: annotation.Opacity, fontColor: annotation.FontColor,
                            fontSize: annotation.FontSize, pageRotation: rotateValue,
                            fontFamily: annotation.FontFamily, notes: annotation.MarkupText, textAlign: annotation.TextAlign,
                            comments: this.pdfViewer.annotationModule.getAnnotationComments(annotation.Comments, annotation, annotation.Author),
                            review: { state: annotation.State, stateModel: annotation.StateModel,
                                modifiedDate: annotation.ModifiedDate, author: annotation.Author },
                            font: { isBold: annotation.Font.Bold, isItalic: annotation.Font.Italic,
                                isStrikeout: annotation.Font.Strikeout, isUnderline: annotation.Font.Underline },
                            annotationSelectorSettings: this.getSettings(annotation), annotationSettings: annotation.AnnotationSettings,
                            customData: this.pdfViewer.annotation.getCustomData(annotation),
                            annotationAddMode: annotation.annotationAddMode, allowedInteractions: annotation.allowedInteractions,
                            isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock, isReadonly: annotation.IsReadonly,
                            isAddAnnotationProgrammatically: isAddedProgramatically, isTransparentSet: annotation.IsTransparentSet
                        };
                        if (isImportAction) {
                            annot.id = annotation.AnnotName;
                            annot.previousFontSize = annotation.FontSize ? annotation.FontSize : this.fontSize;
                        }
                        var addedAnnot = this.pdfViewer.add(annot);
                        this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annot, '_annotations_freetext');
                        if (this.isAddAnnotationProgramatically) {
                            var settings = {
                                opacity: annot.opacity, borderColor: annot.strokeColor, borderWidth: annot.thickness,
                                author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate,
                                fillColor: annot.fillColor, fontSize: annot.fontSize, width: annot.bounds.width,
                                height: annot.bounds.height, fontColor: annot.fontColor, fontFamily: annot.fontFamily,
                                defaultText: annot.dynamicText, fontStyle: annot.font, textAlignment: annot.textAlign
                            };
                            this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, 'FreeText', annot.bounds, settings);
                        }
                        this.inputBoxCount += 1;
                        this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = true;
                        this.pdfViewer.nodePropertyChange(addedAnnot, {});
                        this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = false;
                    }
                }
            }
        }
    };
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {AnnotationSelectorSettingsModel} - AnnotationSelectorSettingsModel
     */
    FreeTextAnnotation.prototype.getSettings = function (annotation) {
        var selector = this.pdfViewer.annotationSelectorSettings;
        if (annotation.AnnotationSelectorSettings) {
            selector = typeof (annotation.AnnotationSelectorSettings) === 'string' ? JSON.parse(annotation.AnnotationSelectorSettings) : annotation.AnnotationSelectorSettings;
        }
        else if (this.pdfViewer.freeTextSettings.annotationSelectorSettings) {
            selector = this.pdfViewer.freeTextSettings.annotationSelectorSettings;
            this.pdfViewerBase.updateSelectorSettings(selector);
        }
        return selector;
    };
    /**
     * @param {AnnotType} type - Annotation type
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.setAnnotationType = function (type) {
        this.pdfViewerBase.disableTextSelectionMode();
        this.pdfViewer.annotationModule.isFormFieldShape = false;
        switch (type) {
            case 'FreeText': {
                this.currentAnnotationMode = 'FreeText';
                this.updateTextProperties();
                var modifiedDateRect = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                this.pdfViewer.drawingObject = {
                    shapeAnnotationType: 'FreeText', strokeColor: this.borderColor,
                    fillColor: this.fillColor, opacity: this.opacity, notes: '', isCommentLock: false,
                    thickness: this.borderWidth, borderDashArray: '0', modifiedDate: modifiedDateRect,
                    author: this.author, subject: this.pdfViewer.freeTextSettings.subject,
                    font: {
                        isBold: this.isBold, isItalic: this.isItalic, isStrikeout: this.isStrikethrough,
                        isUnderline: this.isUnderline
                    }, textAlign: this.textAlign
                };
                this.pdfViewer.tool = 'Select';
                break;
            }
        }
    };
    /**
     * @param {string} property - It describes about the property name
     * @param {number} pageNumber - It describes about the page number value
     * @param {any} annotationBase - It describes about the annotation base
     * @param {boolean} isNewAdded - It describes about whether the isNewAdded is true or not
     * @private
     * @returns {IFreeTextAnnotation} - Ifreetextannotation
     */
    FreeTextAnnotation.prototype.modifyInCollection = function (property, pageNumber, annotationBase, isNewAdded) {
        if (!isNullOrUndefined(annotationBase.formFieldAnnotationType) && annotationBase.formFieldAnnotationType !== '') {
            this.pdfViewer.annotationModule.isFormFieldShape = true;
        }
        else {
            this.pdfViewer.annotationModule.isFormFieldShape = false;
        }
        var currentAnnotObject = null;
        var isEdited = false;
        var pageAnnotations = this.getAnnotations(pageNumber, null);
        if (pageAnnotations !== null && annotationBase) {
            for (var i = 0; i < pageAnnotations.length; i++) {
                if (annotationBase.id === pageAnnotations[parseInt(i.toString(), 10)].id) {
                    if (property === 'bounds') {
                        this.pdfViewerBase.isBounds =
                            this.pdfViewerBase.boundsCalculation(pageAnnotations[parseInt(i.toString(), 10)].bounds, annotationBase.wrapper.bounds);
                        if (this.pdfViewerBase.isBounds) {
                            pageAnnotations[parseInt(i.toString(), 10)].bounds = {
                                left: annotationBase.bounds.x, top: annotationBase.bounds.y,
                                width: annotationBase.bounds.width, height: annotationBase.bounds.height,
                                right: annotationBase.bounds.right,
                                bottom: annotationBase.bounds.bottom
                            };
                        }
                    }
                    else if (property === 'fill') {
                        pageAnnotations[parseInt(i.toString(), 10)].fillColor = annotationBase.wrapper.children[0].style.fill;
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
                    else if (property === 'notes') {
                        pageAnnotations[parseInt(i.toString(), 10)].note = annotationBase.notes;
                    }
                    else if (property === 'delete') {
                        currentAnnotObject = pageAnnotations.splice(i, 1)[0];
                        break;
                    }
                    else if (property === 'dynamicText') {
                        if (pageAnnotations[parseInt(i.toString(), 10)].dynamicText !== annotationBase.dynamicText) {
                            isEdited = true;
                            this.pdfViewer.fireCommentEdit(pageAnnotations[parseInt(i.toString(), 10)].annotName, annotationBase.dynamicText, pageAnnotations[parseInt(i.toString(), 10)]);
                        }
                        pageAnnotations[parseInt(i.toString(), 10)].dynamicText = annotationBase.dynamicText;
                    }
                    else if (property === 'fontColor') {
                        pageAnnotations[parseInt(i.toString(), 10)].fontColor = annotationBase.fontColor;
                    }
                    else if (property === 'fontSize') {
                        pageAnnotations[parseInt(i.toString(), 10)].fontSize = annotationBase.fontSize;
                    }
                    else if (property === 'fontFamily') {
                        pageAnnotations[parseInt(i.toString(), 10)].fontFamily = annotationBase.fontFamily;
                    }
                    else if (property === 'textPropertiesChange') {
                        pageAnnotations[parseInt(i.toString(), 10)].font = { isBold: annotationBase.font.isBold,
                            isItalic: annotationBase.font.isItalic, isStrikeout: annotationBase.font.isStrikeout,
                            isUnderline: annotationBase.font.isUnderline };
                    }
                    else if (property === 'textAlign') {
                        pageAnnotations[parseInt(i.toString(), 10)].textAlign = annotationBase.textAlign;
                    }
                    if (this.pdfViewerBase.isBounds) {
                        pageAnnotations[parseInt(i.toString(), 10)].modifiedDate =
                            this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                    }
                    this.pdfViewer.annotationModule.storeAnnotationCollections(pageAnnotations[parseInt(i.toString(), 10)], pageNumber);
                }
            }
            this.manageAnnotations(pageAnnotations, pageNumber);
        }
        if (!isNewAdded && isEdited) {
            this.pdfViewerBase.updateDocumentEditedProperty(true);
        }
        return currentAnnotObject;
    };
    /**
     * @param {number} pageNumber - This is pageNumber
     * @param {IFreeTextAnnotation} annotationBase - This is annotationBase
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.addInCollection = function (pageNumber, annotationBase) {
        if (annotationBase) {
            var pageAnnotations = this.getAnnotations(pageNumber, null);
            if (pageAnnotations) {
                pageAnnotations.push(annotationBase);
            }
            this.manageAnnotations(pageAnnotations, pageNumber);
        }
    };
    /**
     * @private
     * @returns {string} - string
     */
    FreeTextAnnotation.prototype.saveFreeTextAnnotations = function () {
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_freetext');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_freetext'];
        }
        var annotations = [];
        for (var j = 0; j < this.pdfViewerBase.pageCount; j++) {
            annotations[parseInt(j.toString(), 10)] = [];
        }
        if (storeObject && !this.pdfViewer.annotationSettings.skipDownload) {
            var annotationCollection = JSON.parse(storeObject);
            for (var i = 0; i < annotationCollection.length; i++) {
                var newArray = [];
                var pageAnnotationObject = annotationCollection[parseInt(i.toString(), 10)];
                if (pageAnnotationObject) {
                    for (var z = 0; pageAnnotationObject.annotations.length > z; z++) {
                        this.pdfViewer.annotationModule.updateModifiedDate(pageAnnotationObject.annotations[parseInt(z.toString(), 10)]);
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds =
                            this.getBoundsBasedOnRotation(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds, pageAnnotationObject.annotations[parseInt(z.toString(), 10)].rotateAngle, pageAnnotationObject.pageIndex, pageAnnotationObject.annotations[parseInt(z.toString(), 10)]);
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].bounds =
                            JSON.stringify(this.pdfViewer.annotation.getBounds(pageAnnotationObject.
                                annotations[parseInt(z.toString(), 10)].bounds, pageAnnotationObject.pageIndex));
                        var strokeColorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].strokeColor;
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].strokeColor =
                            JSON.stringify(this.getRgbCode(strokeColorString));
                        var fillColorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fillColor;
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fillColor =
                            JSON.stringify(this.getRgbCode(fillColorString));
                        var fontColorString = pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fontColor;
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].fontColor =
                            JSON.stringify(this.getRgbCode(fontColorString));
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].vertexPoints =
                            JSON.stringify(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].vertexPoints);
                        if (pageAnnotationObject.annotations[parseInt(z.toString(), 10)].rectangleDifference !== null) {
                            pageAnnotationObject.annotations[parseInt(z.toString(), 10)].rectangleDifference =
                                JSON.stringify(pageAnnotationObject.annotations[parseInt(z.toString(), 10)].rectangleDifference);
                        }
                        pageAnnotationObject.annotations[parseInt(z.toString(), 10)].padding = this.getPaddingValues(this.fontSize);
                    }
                    newArray = pageAnnotationObject.annotations;
                }
                annotations[pageAnnotationObject.pageIndex] = newArray;
            }
        }
        return JSON.stringify(annotations);
    };
    FreeTextAnnotation.prototype.getRotationValue = function (pageIndex, isAddedProgrammatically) {
        var pageDetails = this.pdfViewerBase.pageSize[parseInt(pageIndex.toString(), 10)];
        if (!isNullOrUndefined(isAddedProgrammatically) && isAddedProgrammatically) {
            return 0;
        }
        else {
            if (pageDetails.rotation === 0) {
                return 0;
            }
            else if (pageDetails.rotation === 1) {
                return 90;
            }
            else if (pageDetails.rotation === 2) {
                return 180;
            }
            else if (pageDetails.rotation === 3) {
                return 270;
            }
            return 0;
        }
    };
    FreeTextAnnotation.prototype.getBoundsBasedOnRotation = function (bounds, rotateAngle, pageIndex, annotation, isAddedProgrammatically) {
        var rotateValue = this.getRotationValue(pageIndex, isAddedProgrammatically);
        var paddingValue = 0.5;
        annotation.rotateAngle = rotateAngle - rotateValue;
        annotation.pageRotation = rotateValue;
        if (rotateAngle === 90 || rotateAngle === -90 || rotateAngle === 270 || rotateAngle === -270) {
            var x = bounds.left + (bounds.width / 2) - (bounds.height / 2);
            var y = bounds.top - (bounds.width / 2 - bounds.height / 2);
            return { x: x + paddingValue, y: y + paddingValue, left: x + paddingValue,
                top: y + paddingValue, width: bounds.height, height: bounds.width };
        }
        else {
            return { x: bounds.left + paddingValue, y: bounds.top + paddingValue,
                left: bounds.left + paddingValue, top: bounds.top + paddingValue, width: bounds.width, height: bounds.height };
        }
    };
    FreeTextAnnotation.prototype.manageAnnotations = function (pageAnnotations, pageNumber) {
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_freetext');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_freetext'];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            if (!this.pdfViewerBase.isStorageExceed) {
                PdfViewerBase.sessionStorageManager.removeItem(this.pdfViewerBase.documentId + '_annotations_freetext');
            }
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageNumber);
            if (index != null && annotObject[parseInt(index.toString(), 10)]) {
                annotObject[parseInt(index.toString(), 10)].annotations = pageAnnotations;
            }
            var annotationStringified = JSON.stringify(annotObject);
            if (this.pdfViewerBase.isStorageExceed) {
                this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_freetext'] = annotationStringified;
            }
            else {
                PdfViewerBase.sessionStorageManager.setItem(this.pdfViewerBase.documentId + '_annotations_freetext', annotationStringified);
            }
        }
    };
    FreeTextAnnotation.prototype.getAnnotations = function (pageIndex, shapeAnnotations) {
        var annotationCollection;
        var storeObject = PdfViewerBase.sessionStorageManager.getItem(this.pdfViewerBase.documentId + '_annotations_freetext');
        if (this.pdfViewerBase.isStorageExceed) {
            storeObject = this.pdfViewerBase.annotationStorage[this.pdfViewerBase.documentId + '_annotations_freetext'];
        }
        if (storeObject) {
            var annotObject = JSON.parse(storeObject);
            var index = this.pdfViewer.annotationModule.getPageCollection(annotObject, pageIndex);
            if (index != null && annotObject[parseInt(index.toString(), 10)]) {
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
    FreeTextAnnotation.prototype.getRgbCode = function (colorString) {
        // eslint-disable-next-line
        if (!colorString.match(/#([a-z0-9]+)/gi) && !colorString.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)) {
            colorString = this.pdfViewer.annotationModule.nameToHash(colorString);
        }
        var stringArray = colorString.split(',');
        if (isNullOrUndefined(stringArray[1])) {
            colorString = this.pdfViewer.annotationModule.getValue(colorString, 'rgba');
            stringArray = colorString.split(',');
        }
        var r = parseFloat(stringArray[0].split('(')[1]);
        var g = parseFloat(stringArray[1]);
        var b = parseFloat(stringArray[2]);
        var a = parseFloat(stringArray[3]);
        return { r: r, g: g, b: b, a: a };
    };
    /**
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.onFocusOutInputBox = function () {
        var allowServerDataBind = this.pdfViewer.allowServerDataBinding;
        this.pdfViewer.enableServerDataBinding(false);
        if (!this.pdfViewerBase.isFreeTextContextMenu) {
            this.pdfViewer.fireBeforeAddFreeTextAnnotation(this.inputBoxElement.value);
            if (this.pdfViewer.enableHtmlSanitizer && this.inputBoxElement) {
                this.inputBoxElement.value = SanitizeHtmlHelper.sanitize(this.inputBoxElement.value);
            }
            var pageIndex = this.inputBoxElement.id && this.inputBoxElement.id.split('_freeText_')[1] && this.inputBoxElement.id.split('_freeText_')[1].split('_')[0] ? parseFloat(this.inputBoxElement.id.split('_freeText_')[1].split('_')[0]) : this.pdfViewerBase.currentPageNumber - 1;
            var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (pageIndex));
            var width = parseFloat(this.inputBoxElement.style.width);
            // Removed the line since when we click on the freetext the size gets changed. Task Id: 847135
            if (this.pdfViewer.freeTextSettings.enableAutoFit && !this.isMaximumWidthReached && this.isNewFreeTextAnnot) {
                width = parseFloat(this.inputBoxElement.style.width);
                var characterLength = 8;
                this.inputBoxElement.style.width = (width - characterLength) + 'px';
            }
            var inputEleHeight = parseFloat(this.inputBoxElement.style.height);
            var inputEleWidth = parseFloat(this.inputBoxElement.style.width);
            var inputEleLeft = parseFloat(this.inputBoxElement.style.left);
            if (this.pdfViewerBase.isMixedSizeDocument) {
                var canvas = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', pageIndex);
                inputEleLeft = inputEleLeft - canvas.offsetLeft;
            }
            var inputEleTop = parseFloat(this.inputBoxElement.style.top);
            var zoomFactor = this.pdfViewerBase.getZoomFactor();
            if (this.pdfViewer.isValidFreeText) {
                this.inputBoxElement.value = 'Type Here';
                this.pdfViewer.isValidFreeText = false;
            }
            var inputValue = this.inputBoxElement.value;
            var isNewlyAdded = false;
            if (this.isNewFreeTextAnnot === true) {
                var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
                var annotationName = this.pdfViewer.annotation.createGUID();
                this.isNewFreeTextAnnot = false;
                isNewlyAdded = true;
                var commentsDivid = this.pdfViewer.annotation.stickyNotesAnnotationModule.addComments('freeText', pageIndex + 1);
                if (commentsDivid) {
                    document.getElementById(commentsDivid).id = annotationName;
                }
                var annotationSelectorSettings = this.pdfViewer.freeTextSettings.annotationSelectorSettings;
                this.pdfViewerBase.updateSelectorSettings(annotationSelectorSettings);
                var annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.freeTextSettings);
                this.author = this.author ? this.author : this.pdfViewer.freeTextSettings.author ? this.pdfViewer.freeTextSettings.author : 'Guest';
                this.subject = this.subject ? this.subject : this.pdfViewer.freeTextSettings.subject ? this.pdfViewer.freeTextSettings.subject : 'Text Box';
                var allowedInteractions = this.pdfViewer.freeTextSettings.allowedInteractions ?
                    this.pdfViewer.freeTextSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
                var annot = {
                    author: this.author, modifiedDate: currentDateString, subject: this.subject, id: 'free_text' + this.inputBoxCount,
                    rotateAngle: 0, dynamicText: inputValue, strokeColor: this.borderColor,
                    thickness: this.borderWidth, fillColor: this.fillColor,
                    bounds: {
                        left: inputEleLeft / zoomFactor, top: inputEleTop / zoomFactor, x: inputEleLeft / zoomFactor,
                        y: inputEleTop / zoomFactor, width: inputEleWidth / zoomFactor, height: inputEleHeight / zoomFactor
                    }, annotName: annotationName,
                    shapeAnnotationType: 'FreeText', pageIndex: pageIndex, fontColor: this.fontColor, fontSize: this.fontSize,
                    fontFamily: this.fontFamily, opacity: this.opacity, comments: [], textAlign: this.textAlign,
                    font: { isBold: this.isBold, isItalic: this.isItalic, isStrikeout: this.isStrikethrough,
                        isUnderline: this.isUnderline },
                    review: { state: 'Unmarked', stateModel: 'None', modifiedDate: currentDateString, author: this.author },
                    annotationSelectorSettings: annotationSelectorSettings, annotationSettings: annotationSettings,
                    customData: this.pdfViewer.annotationModule.getData('FreeText'), isPrint: (this.pdfViewer.freeTextSettings && !isNullOrUndefined(this.pdfViewer.freeTextSettings.isPrint)) ? this.pdfViewer.freeTextSettings.isPrint : true,
                    allowedInteractions: allowedInteractions, isReadonly: this.isReadonly
                };
                if (this.pdfViewer.enableRtl) {
                    annot.textAlign = 'Right';
                }
                var annotation = this.pdfViewer.add(annot);
                var bounds = { left: annot.bounds.x, top: annot.bounds.y, width: annot.bounds.width,
                    height: annot.bounds.height };
                var settings = {
                    opacity: annot.opacity, borderColor: annot.strokeColor, borderWidth: annot.thickness,
                    author: annotation.author, subject: annotation.subject, modifiedDate: annotation.modifiedDate,
                    fillColor: annot.fillColor, fontSize: annot.fontSize, width: annot.bounds.width,
                    height: annot.bounds.height, fontColor: annot.fontColor, fontFamily: annot.fontFamily,
                    defaultText: annot.dynamicText, fontStyle: annot.font, textAlignment: annot.textAlign
                };
                this.pdfViewer.annotation.storeAnnotations(pageIndex, annot, '_annotations_freetext');
                this.pdfViewer.fireAnnotationAdd(annot.pageIndex, annot.annotName, 'FreeText', bounds, settings);
                this.pdfViewer.fireCommentAdd(annot.annotName, annot.dynamicText, annot);
                this.pdfViewer.annotation.addAction(pageIndex, null, annotation, 'Addition', '', annotation, annotation);
                this.pdfViewer.renderSelector(annot.pageIndex);
                this.pdfViewer.clearSelection(annot.pageIndex);
                this.pdfViewerBase.updateDocumentEditedProperty(true);
                this.selectedAnnotation = annotation;
            }
            this.isInuptBoxInFocus = false;
            if (this.selectedAnnotation && this.pdfViewer.selectedItems.annotations) {
                var isRotated = this.selectedAnnotation.pageRotation === 90 || this.selectedAnnotation.pageRotation === 270;
                inputEleHeight = parseFloat(isRotated ? this.inputBoxElement.style.width : this.inputBoxElement.style.height) / zoomFactor;
                inputEleWidth = parseFloat(isRotated ? this.inputBoxElement.style.height : this.inputBoxElement.style.width) / zoomFactor;
                var heightDiff = (inputEleHeight - this.selectedAnnotation.bounds.height);
                var y = undefined;
                if (heightDiff > 0) {
                    y = this.selectedAnnotation.wrapper.offsetY + (heightDiff / 2);
                    y = y > 0 ? y : undefined;
                }
                var widthDiff = (inputEleWidth - this.selectedAnnotation.bounds.width);
                var x = undefined;
                if (widthDiff > 0) {
                    x = this.selectedAnnotation.wrapper.offsetX + (widthDiff / 2);
                    x = x > 0 ? x : undefined;
                }
                else {
                    widthDiff = Math.abs(widthDiff);
                    x = this.selectedAnnotation.wrapper.offsetX - (widthDiff / 2);
                }
                this.selectedAnnotation.bounds.width = inputEleWidth;
                this.selectedAnnotation.bounds.height = inputEleHeight;
                var lineSpace = 0;
                lineSpace = ((parseFloat(this.inputBoxElement.style.fontSize) / zoomFactor) / (this.defaultFontSize / 2));
                this.selectedAnnotation.wrapper.children[1].margin.left = this.freeTextPaddingLeft;
                this.selectedAnnotation.wrapper.children[1].margin.top =
                    ((parseFloat(this.inputBoxElement.style.paddingTop) / zoomFactor)) + lineSpace;
                this.pdfViewer.annotation.modifyDynamicTextValue(inputValue, this.selectedAnnotation.annotName);
                this.selectedAnnotation.dynamicText = inputValue;
                this.modifyInCollection('dynamicText', pageIndex, this.selectedAnnotation, isNewlyAdded);
                this.modifyInCollection('bounds', pageIndex, this.selectedAnnotation, isNewlyAdded);
                this.pdfViewer.nodePropertyChange(this.selectedAnnotation, { bounds: { width: this.selectedAnnotation.bounds.width,
                        height: this.selectedAnnotation.bounds.height, y: y, x: x } });
                var commentsDiv = document.getElementById(this.selectedAnnotation.annotName);
                if (commentsDiv && commentsDiv.childNodes) {
                    if (commentsDiv.childNodes[0].ej2_instances) {
                        commentsDiv.childNodes[0].ej2_instances[0].value = inputValue;
                    }
                    else if (commentsDiv.childNodes[0].childNodes && commentsDiv.childNodes[0].childNodes[1].ej2_instances) {
                        commentsDiv.childNodes[0].childNodes[1].ej2_instances[0].value = inputValue;
                    }
                }
                this.pdfViewer.renderSelector(this.selectedAnnotation.pageIndex, this.selectedAnnotation.annotationSelectorSettings);
            }
            if (this.inputBoxElement.parentElement) {
                if (pageDiv && (pageDiv.id === this.inputBoxElement.parentElement.id)) {
                    pageDiv.removeChild(this.inputBoxElement);
                }
                else {
                    this.inputBoxElement.parentElement.removeChild(this.inputBoxElement);
                }
            }
            var canvass = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', pageIndex);
            this.pdfViewer.renderDrawing(canvass, pageIndex);
            this.inputBoxCount += 1;
        }
        else {
            this.inputBoxElement.focus();
            if (!this.isTextSelected) {
                window.getSelection().removeAllRanges();
            }
        }
        this.pdfViewer.enableServerDataBinding(allowServerDataBind, true);
    };
    /**
     * @param {KeyboardEvent} event - event
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.onKeyDownInputBox = function (event) {
        // eslint-disable-next-line
        if (event.which !== 18) {
            // eslint-disable-next-line
            var inuptEleObj_1 = this;
            if (event.which === 9 || (isNullOrUndefined(this.pdfViewer.selectedItems.annotations[0]) && !this.isNewFreeTextAnnot)) {
                event.preventDefault();
            }
            this.selectedAnnotation = this.pdfViewer.selectedItems.annotations &&
                this.isNewFreeTextAnnot ? this.pdfViewer.selectedItems.annotations[0]
                : this.selectedAnnotation;
            setTimeout(function () {
                if (inuptEleObj_1.defaultHeight < inuptEleObj_1.inputBoxElement.scrollHeight
                    && parseInt(inuptEleObj_1.inputBoxElement.style.height, 10) < inuptEleObj_1.inputBoxElement.scrollHeight) {
                    inuptEleObj_1.updateFreeTextAnnotationSize(true);
                }
                else {
                    inuptEleObj_1.updateFreeTextAnnotationSize(false);
                }
            }, 0);
        }
    };
    FreeTextAnnotation.prototype.updateFreeTextAnnotationSize = function (isSize) {
        // eslint-disable-next-line
        var inuptEleObj = this;
        var enableAutoFit = inuptEleObj.pdfViewer.freeTextSettings.enableAutoFit;
        if (enableAutoFit) {
            this.autoFitFreeText();
        }
        else {
            this.isMaximumWidthReached = true;
        }
        if (this.isMaximumWidthReached) {
            var previousHeight = inuptEleObj.inputBoxElement.getBoundingClientRect().height;
            if (!isSize && !inuptEleObj.inputBoxElement.readOnly) {
                inuptEleObj.inputBoxElement.style.height = 'auto';
            }
            var currentHeight = inuptEleObj.inputBoxElement.getBoundingClientRect().height;
            var difference = currentHeight - previousHeight;
            var fontSize = parseFloat(inuptEleObj.inputBoxElement.style.fontSize);
            inuptEleObj.inputBoxElement.style.height = inuptEleObj.inputBoxElement.readOnly ? inuptEleObj.inputBoxElement.style.height : inuptEleObj.inputBoxElement.scrollHeight + (fontSize / 2) + 'px';
            inuptEleObj.inputBoxElement.style.height = (difference < 0 && !inuptEleObj.inputBoxElement.readOnly) ? (previousHeight + 'px') : inuptEleObj.inputBoxElement.style.height;
        }
        var zoomFactor = inuptEleObj.pdfViewerBase.getZoomFactor();
        var isRotated = this.selectedAnnotation && (this.selectedAnnotation.pageRotation === 90 ||
            this.selectedAnnotation.pageRotation === 270);
        var inputEleHeight = parseFloat(isRotated ? this.inputBoxElement.style.width :
            this.inputBoxElement.style.height) / zoomFactor;
        var inputEleWidth = parseFloat(isRotated ? this.inputBoxElement.style.height :
            this.inputBoxElement.style.width) / zoomFactor;
        var x = 0;
        if (this.selectedAnnotation) {
            var heightDiff = void 0;
            if (this.selectedAnnotation.pageRotation === 90 || this.selectedAnnotation.pageRotation === 270) {
                heightDiff = (inputEleWidth - inuptEleObj.selectedAnnotation.bounds.width);
            }
            else {
                heightDiff = (inputEleHeight - inuptEleObj.selectedAnnotation.bounds.height);
            }
            var y = 0;
            if (heightDiff > 0) {
                y = inuptEleObj.selectedAnnotation.wrapper.offsetY + (heightDiff / 2);
            }
            else {
                heightDiff = Math.abs(heightDiff);
                y = inuptEleObj.selectedAnnotation.wrapper.offsetY - (heightDiff / 2);
            }
            if (enableAutoFit) {
                var widthDiff = (inputEleWidth - inuptEleObj.selectedAnnotation.bounds.width);
                if (widthDiff > 0) {
                    x = inuptEleObj.selectedAnnotation.wrapper.offsetX + (widthDiff / 2);
                }
                else {
                    widthDiff = Math.abs(widthDiff);
                    x = inuptEleObj.selectedAnnotation.wrapper.offsetX - (widthDiff / 2);
                }
            }
            inuptEleObj.selectedAnnotation.bounds.width = inputEleWidth;
            inuptEleObj.selectedAnnotation.bounds.height = inputEleHeight;
            if (enableAutoFit) {
                inuptEleObj.pdfViewer.nodePropertyChange(inuptEleObj.selectedAnnotation, { bounds: { width: inuptEleObj.selectedAnnotation.bounds.width, height: inuptEleObj.selectedAnnotation.bounds.height, y: y, x: x } });
            }
            else {
                inuptEleObj.pdfViewer.nodePropertyChange(inuptEleObj.selectedAnnotation, { bounds: { width: inuptEleObj.selectedAnnotation.bounds.width, height: inuptEleObj.selectedAnnotation.bounds.height, y: y } });
            }
            inuptEleObj.pdfViewer.renderSelector(inuptEleObj.selectedAnnotation.pageIndex, this.selectedAnnotation.annotationSelectorSettings);
        }
    };
    /**
     * @param {number} xPosition - This is xPosition
     * @param {number} yPosition - This is yPosition
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.autoFitFreeText = function (xPosition, yPosition) {
        var pageIndex = this.pdfViewerBase.currentPageNumber - 1;
        var canvas = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', pageIndex);
        var context = canvas.getContext('2d');
        var fontSize = this.inputBoxElement.style.fontSize;
        if (this.pdfViewer.freeTextSettings.fontStyle === FontStyle.Bold || this.inputBoxElement.style.fontWeight === 'bold') {
            context.font = 'bold' + ' ' + fontSize + ' ' + this.inputBoxElement.style.fontFamily;
        }
        else {
            context.font = fontSize + ' ' + this.inputBoxElement.style.fontFamily;
        }
        var highestTextNode = '';
        var textNodes = [];
        var textboxValue = this.inputBoxElement.value;
        if (textboxValue.indexOf('\n') > -1) {
            textNodes = textboxValue.split('\n');
            for (var j = 0; j < textNodes.length; j++) {
                var textNodeData = context.measureText(textNodes[parseInt(j.toString(), 10)]);
                var highestTextNodeData = context.measureText(highestTextNode);
                if (textNodeData.width > highestTextNodeData.width) {
                    highestTextNode = textNodes[parseInt(j.toString(), 10)];
                }
            }
            this.isMaximumWidthReached = true;
        }
        else {
            highestTextNode = textboxValue;
            this.isMaximumWidthReached = false;
        }
        var textwidth = context.measureText(highestTextNode);
        fontSize = parseFloat(this.inputBoxElement.style.fontSize);
        var inputEleWidth;
        var characterLength = 8;
        var inputEleHeight = (fontSize + (fontSize / 2));
        if (this.isNewFreeTextAnnot) {
            inputEleWidth = Math.ceil(textwidth.width + ((characterLength + 1) * 2));
            this.inputBoxElement.style.height = inputEleHeight + 'px';
            this.inputBoxElement.style.top = (yPosition) - (inputEleHeight / 2) + 'px';
        }
        else {
            inputEleWidth = Math.ceil(textwidth.width) + fontSize + Math.ceil(characterLength / 2);
        }
        // Removed the line since when we double click on the freetext the size gets changed. Task Id: 847135
        this.inputBoxElement.style.width = inputEleWidth + 'px';
        var maxWidth = this.pdfViewerBase.getPageWidth(pageIndex) - parseFloat(this.inputBoxElement.style.left);
        if (parseFloat(this.inputBoxElement.style.width) > maxWidth) {
            this.isMaximumWidthReached = true;
            if (this.isNewAddedAnnot && xPosition) {
                inputEleWidth = inputEleWidth - characterLength;
                this.inputBoxElement.style.width = inputEleWidth + 'px';
                var width = xPosition + (inputEleWidth * this.pdfViewerBase.getZoomFactor());
                var x = parseFloat(this.inputBoxElement.style.left);
                if (width >= this.pdfViewerBase.getPageWidth(pageIndex)) {
                    x = this.pdfViewerBase.getPageWidth(pageIndex) - inputEleWidth;
                }
                this.inputBoxElement.style.left = x + 'px';
            }
            else {
                this.inputBoxElement.style.width = maxWidth + 'px';
            }
        }
    };
    /**
     * @param {MouseEvent} event - This is Mouse event
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.onMouseUpInputBox = function (event) {
        var target = event.target;
        this.selectionStart = 0;
        this.selectionEnd = 0;
        if (event.which === 3 && target) {
            this.selectionStart = target.selectionStart;
            this.selectionEnd = target.selectionEnd;
        }
        if (event.which === 3 && window.getSelection() !== null && window.getSelection().toString() !== '') {
            this.isTextSelected = true;
        }
        else {
            this.isTextSelected = false;
        }
    };
    /**
     * @param {PointModel} currentPosition - This is current position
     * @param {PdfAnnotationBaseModel} annotation - This is annotation
     * @param {number} pageIndex - This is pageIndex
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.addInuptElemet = function (currentPosition, annotation, pageIndex) {
        if (annotation === void 0) { annotation = null; }
        this.currentPosition = [];
        if (isNullOrUndefined(pageIndex)) {
            pageIndex = this.pdfViewerBase.currentPageNumber - 1;
        }
        if (annotation) {
            pageIndex = annotation.pageIndex;
        }
        if (isBlazor() && annotation === null && this.pdfViewer.selectedItems.annotations.length === 0) {
            this.updateTextProperties();
        }
        this.inputBoxElement.id = this.pdfViewer.element.id + '_freeText_' + pageIndex + '_' + this.inputBoxCount;
        var pageDiv = this.pdfViewerBase.getElement('_pageDiv_' + (pageIndex));
        var canvass = this.pdfViewerBase.getAnnotationCanvas('_annotationCanvas_', pageIndex);
        var zoomFactor = this.pdfViewerBase.getZoomFactor();
        this.inputBoxElement.value = (annotation && annotation.dynamicText) ? annotation.dynamicText : this.defaultText;
        this.inputBoxElement.style.boxSizing = 'border-box';
        this.inputBoxElement.style.left = ((currentPosition.x)) + 'px';
        this.inputBoxElement.style.top = ((currentPosition.y)) - ((this.defaultHeight * zoomFactor) / 2) + 'px';
        if (this.pdfViewer.freeTextSettings.enableAutoFit) {
            this.inputBoxElement.style.wordBreak = 'break-all';
        }
        else {
            this.inputBoxElement.style.wordBreak = 'break-word';
        }
        if (annotation) {
            this.applyFreetextStyles(zoomFactor, annotation.isReadonly);
        }
        else {
            this.applyFreetextStyles(zoomFactor);
        }
        if (this.isBold) {
            this.inputBoxElement.style.fontWeight = 'bold';
        }
        else {
            this.inputBoxElement.style.fontWeight = 'normal';
        }
        if (this.isItalic) {
            this.inputBoxElement.style.fontStyle = 'italic';
        }
        else {
            this.inputBoxElement.style.fontStyle = 'normal';
        }
        this.inputBoxElement.style.textDecoration = 'none';
        if (this.isUnderline) {
            this.inputBoxElement.style.textDecoration = 'underline';
        }
        if (this.isStrikethrough) {
            this.inputBoxElement.style.textDecoration = 'line-through';
        }
        if (this.pdfViewer.enableRtl) {
            this.inputBoxElement.style.textAlign = 'right';
            this.inputBoxElement.style.direction = 'rtl';
            this.inputBoxElement.style.left = ((currentPosition.x)) - ((this.defautWidth * zoomFactor / 2));
        }
        else {
            this.inputBoxElement.style.textAlign = this.textAlign.toLowerCase();
        }
        this.inputBoxElement.style.borderColor = this.borderColor;
        this.inputBoxElement.style.color = this.fontColor;
        this.inputBoxElement.style.background = this.fillColor;
        if (annotation && annotation.wrapper && annotation.wrapper.children[0]) {
            this.inputBoxElement.style.opacity = annotation.wrapper.children[0].style.opacity;
        }
        if (this.isNewFreeTextAnnot === true) {
            this.pdfViewer.clearSelection(pageIndex);
        }
        if (annotation && annotation.wrapper && annotation.wrapper.bounds) {
            var annotationBounds = annotation.wrapper.bounds;
            if (annotationBounds.left) {
                this.inputBoxElement.style.left = ((annotationBounds.left) * zoomFactor) + 'px';
            }
            if (annotationBounds.top) {
                this.inputBoxElement.style.top = ((annotationBounds.top) * zoomFactor) + 'px';
            }
            this.inputBoxElement.style.height = annotationBounds.height ? (annotationBounds.height * zoomFactor) + 'px' : (this.defaultHeight * zoomFactor) + 'px';
            this.inputBoxElement.style.width = annotationBounds.width ? (annotationBounds.width * zoomFactor) + 'px' : (this.defautWidth * zoomFactor) + 'px';
            this.selectedAnnotation = annotation;
            this.previousText = this.selectedAnnotation.dynamicText;
            this.selectedAnnotation.dynamicText = '';
            this.inputBoxElement.style.borderColor = this.selectedAnnotation.strokeColor;
            this.inputBoxElement.style.color = this.selectedAnnotation.fontColor;
            this.inputBoxElement.style.background = this.selectedAnnotation.fillColor;
            if (this.selectedAnnotation.font.isBold === true) {
                this.inputBoxElement.style.fontWeight = 'bold';
            }
            if (this.selectedAnnotation.font.isItalic === true) {
                this.inputBoxElement.style.fontStyle = 'italic';
            }
            if (this.selectedAnnotation.font.isUnderline === true) {
                this.inputBoxElement.style.textDecoration = 'underline';
            }
            if (this.selectedAnnotation.font.isStrikeout === true) {
                this.inputBoxElement.style.textDecoration = 'line-through';
            }
            if (this.pdfViewer.enableRtl) {
                this.inputBoxElement.style.textAlign = 'right';
                this.inputBoxElement.style.direction = 'rtl';
            }
            else if (this.selectedAnnotation.textAlign) {
                this.inputBoxElement.style.textAlign = this.selectedAnnotation.textAlign;
            }
            this.inputBoxElement.style.fontSize = (this.selectedAnnotation.fontSize * zoomFactor) + 'px';
            this.inputBoxElement.style.fontFamily = this.selectedAnnotation.fontFamily;
            this.pdfViewer.nodePropertyChange(this.selectedAnnotation, {});
        }
        if (this.pdfViewerBase.isMixedSizeDocument) {
            this.inputBoxElement.style.left = (parseFloat(this.inputBoxElement.style.left)) + canvass.offsetLeft + 'px';
        }
        this.pdfViewer.annotation.freeTextAnnotationModule.isFreeTextValueChange = false;
        if (this.pdfViewer.freeTextSettings.enableAutoFit) {
            this.autoFitFreeText(currentPosition.x, currentPosition.y);
        }
        this.inputBoxElement.style.paddingLeft = (this.freeTextPaddingLeft * zoomFactor) + 'px';
        this.inputBoxElement.style.paddingTop = ((((parseFloat(this.inputBoxElement.style.fontSize) / zoomFactor) / this.defaultFontSize) / zoomFactor)) * this.freeTextPaddingTop + 'px';
        var lineSpace = 0;
        lineSpace = ((parseFloat(this.inputBoxElement.style.fontSize) / zoomFactor) / (this.defaultFontSize / 2));
        this.inputBoxElement.style.paddingTop = ((parseFloat(this.inputBoxElement.style.paddingTop)) - lineSpace) + 'px';
        pageDiv.appendChild(this.inputBoxElement);
        if (!this.pdfViewer.freeTextSettings.enableAutoFit && (this.defaultHeight * zoomFactor)
            < this.inputBoxElement.scrollHeight && parseInt(this.inputBoxElement.style.height, 10) < this.inputBoxElement.scrollHeight) {
            this.inputBoxElement.style.height = this.inputBoxElement.scrollHeight + 'px';
        }
        this.isInuptBoxInFocus = true;
        this.inputBoxElement.focus();
        if (this.isNewFreeTextAnnot === true || this.inputBoxElement.value === this.defaultText) {
            this.inputBoxElement.select();
            this.pdfViewerBase.isFreeTextSelected = true;
        }
        this.currentPosition.push(parseInt(this.inputBoxElement.style.left, 10) / zoomFactor, parseInt(this.inputBoxElement.style.top, 10) / zoomFactor, parseInt(this.inputBoxElement.style.width, 10) / zoomFactor, parseInt(this.inputBoxElement.style.height, 10) / zoomFactor);
    };
    FreeTextAnnotation.prototype.applyFreetextStyles = function (zoomFactor, isReadonly) {
        this.inputBoxElement.style.height = (this.defaultHeight * zoomFactor) + 'px';
        this.inputBoxElement.style.width = (this.defautWidth * zoomFactor) + 'px';
        this.inputBoxElement.style.borderWidth = (this.borderWidth * zoomFactor) + 'px';
        this.inputBoxElement.style.fontSize = (this.fontSize * zoomFactor) + 'px';
        this.inputBoxElement.style.fontFamily = this.fontFamily;
        this.inputBoxElement.readOnly = isNullOrUndefined(isReadonly) ? this.isReadonly : isReadonly;
    };
    /**
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.copySelectedText = function () {
        if (window.getSelection() !== null) {
            this.selectedText = window.getSelection().toString();
            var textArea = document.createElement('textarea');
            textArea.contentEditable = 'true';
            textArea.textContent = this.selectedText;
            textArea.style.position = 'fixed';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
            }
            catch (ex) {
                console.warn('Copy to clipboard failed.', ex);
            }
            finally {
                if (textArea) {
                    document.body.removeChild(textArea);
                }
            }
        }
    };
    /**
     * @param {any} target - It describes about the target text
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.pasteSelectedText = function (target) {
        if (this.selectedText !== '' && target) {
            var text = target.value;
            target.value = text.slice(0, this.selectionStart) + this.selectedText + text.slice(this.selectionEnd, text.length);
        }
        var events = event;
        this.onKeyDownInputBox(events);
    };
    /**
     * @param {any} target - It describes the targeted selected text
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.cutSelectedText = function (target) {
        if (window.getSelection() !== null) {
            var text = target.value;
            this.selectedText = window.getSelection().toString();
            target.value = text.slice(0, target.selectionStart) + text.slice(target.selectionEnd);
            var textArea = document.createElement('textarea');
            textArea.contentEditable = 'true';
            textArea.textContent = this.selectedText;
            textArea.style.position = 'fixed';
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('cut');
            }
            catch (ex) {
                console.warn('Copy to clipboard failed.', ex);
            }
            finally {
                if (textArea) {
                    document.body.removeChild(textArea);
                }
            }
        }
    };
    /**
     * @param {any} shapeAnnotations - It describes about the shape annotations
     * @param {number} pageNumber - It describes about the page number value
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.saveImportedFreeTextAnnotations = function (shapeAnnotations, pageNumber) {
        var annotation = shapeAnnotations;
        if (annotation.AnnotType) {
            var vertexPoints = null;
            if (annotation.VertexPoints) {
                vertexPoints = [];
                for (var j = 0; j < annotation.VertexPoints.length; j++) {
                    var point = { x: annotation.VertexPoints[parseInt(j.toString(), 10)].X,
                        y: annotation.VertexPoints[parseInt(j.toString(), 10)].Y };
                    vertexPoints.push(point);
                }
            }
            annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings :
                this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.freeTextSettings);
            annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions :
                this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
            var annotationBoundsX = !isNullOrUndefined(annotation.Bounds.X) ? annotation.Bounds.X : annotation.Bounds.x;
            var annotationBoundsY = !isNullOrUndefined(annotation.Bounds.Y) ? annotation.Bounds.Y : annotation.Bounds.y;
            var annotationBoundsWidth = annotation.Bounds.Width ? annotation.Bounds.Width : annotation.Bounds.width;
            var annotationBoundsHeight = annotation.Bounds.Height ? annotation.Bounds.Height : annotation.Bounds.height;
            var annot = {
                author: annotation.Author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, id: 'freetext',
                rotateAngle: annotation.Rotate, dynamicText: annotation.MarkupText, strokeColor: annotation.StrokeColor,
                thickness: annotation.Thickness, fillColor: annotation.FillColor,
                bounds: {
                    x: annotationBoundsX, y: annotationBoundsY, left: annotationBoundsX, top: annotationBoundsY,
                    width: annotationBoundsWidth, height: annotationBoundsHeight, right: annotation.Bounds.Right,
                    bottom: annotation.Bounds.Bottom
                }, annotName: annotation.AnnotName, shapeAnnotationType: 'FreeText',
                pageIndex: pageNumber, opacity: annotation.Opacity, fontColor: annotation.FontColor, fontSize: annotation.FontSize,
                fontFamily: annotation.FontFamily, notes: annotation.MarkupText, textAlign: annotation.TextAlign,
                comments: this.pdfViewer.annotationModule.
                    getAnnotationComments(annotation.Comments, annotation, annotation.Author),
                review: { state: annotation.State, stateModel: annotation.StateModel,
                    modifiedDate: annotation.ModifiedDate, author: annotation.Author },
                font: { isBold: annotation.Font.Bold, isItalic: annotation.Font.Italic,
                    isStrikeout: annotation.Font.Strikeout, isUnderline: annotation.Font.Underline },
                annotationSelectorSettings: this.getSettings(annotation), annotationSettings: annotation.AnnotationSettings,
                customData: this.pdfViewer.annotation.getCustomData(annotation),
                isPrint: annotation.IsPrint, isCommentLock: annotation.IsCommentLock, isReadonly: annotation.IsReadonly
            };
            this.pdfViewer.annotationModule.storeAnnotations(pageNumber, annot, '_annotations_freetext');
        }
    };
    /**
     * @param {any} shapeAnnotations - It describes about the shape annotations
     * @param {number} pageNumber - It describes about the page number value
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.updateFreeTextAnnotationCollections = function (shapeAnnotations, pageNumber) {
        var annotation = shapeAnnotations;
        annotation.annotationAddMode = this.pdfViewer.annotationModule.findAnnotationMode(annotation, pageNumber, annotation.AnnotType);
        if (annotation.AnnotType) {
            var vertexPoints = null;
            if (annotation.VertexPoints) {
                vertexPoints = [];
                for (var j = 0; j < annotation.VertexPoints.length; j++) {
                    var point = { x: annotation.VertexPoints[parseInt(j.toString(), 10)].X,
                        y: annotation.VertexPoints[parseInt(j.toString(), 10)].Y };
                    vertexPoints.push(point);
                }
            }
            annotation.AnnotationSettings = annotation.AnnotationSettings ? annotation.AnnotationSettings :
                this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.freeTextSettings);
            if (annotation.IsLocked) {
                annotation.AnnotationSettings.isLock = annotation.IsLocked;
            }
            annotation.allowedInteractions = annotation.AllowedInteractions ? annotation.AllowedInteractions :
                this.pdfViewer.annotationModule.updateAnnotationAllowedInteractions(annotation);
            var annotationBoundsX = annotation.Bounds.X ? annotation.Bounds.X : annotation.Bounds.x;
            var annotationBoundsY = annotation.Bounds.Y ? annotation.Bounds.Y : annotation.Bounds.y;
            var width = annotation.Bounds.Width ? annotation.Bounds.Width : annotation.Bounds.width;
            var height = annotation.Bounds.Height ? annotation.Bounds.Height : annotation.Bounds.height;
            var annot = {
                author: annotation.Author, allowedInteractions: annotation.allowedInteractions, modifiedDate: annotation.ModifiedDate, subject: annotation.Subject, id: 'freetext',
                rotateAngle: annotation.Rotate, dynamicText: annotation.MarkupText, strokeColor: annotation.StrokeColor,
                thickness: annotation.Thickness, fillColor: annotation.FillColor,
                bounds: {
                    x: annotationBoundsX, y: annotationBoundsY, left: annotationBoundsX, top: annotationBoundsY,
                    width: width, height: height, right: annotation.Bounds.Right,
                    bottom: annotation.Bounds.Bottom
                }, annotationId: annotation.AnnotName, shapeAnnotationType: 'FreeText',
                pageIndex: pageNumber, opacity: annotation.Opacity, fontColor: annotation.FontColor, fontSize: annotation.FontSize,
                fontFamily: annotation.FontFamily, notes: annotation.MarkupText,
                comments: this.pdfViewer.annotationModule.
                    getAnnotationComments(annotation.Comments, annotation, annotation.Author),
                review: { state: annotation.State, stateModel: annotation.StateModel,
                    modifiedDate: annotation.ModifiedDate, author: annotation.Author },
                customData: this.pdfViewer.annotation.getCustomData(annotation),
                font: { isBold: annotation.Font.Bold, isItalic: annotation.Font.Italic,
                    isStrikeout: annotation.Font.Strikeout, isUnderline: annotation.Font.Underline },
                pageNumber: pageNumber, annotationSettings: annotation.AnnotationSettings,
                isCommentLock: annotation.IsCommentLock, isReadonly: annotation.IsReadonly, isPrint: annotation.IsPrint
            };
            return annot;
        }
    };
    /**
     * This method used to add annotations with using program.
     *
     * @param {FreeTextSettings} annotationObject - This is annotation object
     * @param {IPoint} offset - It describes about the annotation bounds
     * @returns {object} - object
     * @private
     */
    FreeTextAnnotation.prototype.updateAddAnnotationDetails = function (annotationObject, offset) {
        //Creating new object if annotationObject is null
        if (!annotationObject) {
            annotationObject = { offset: { x: 1, y: 1 }, pageNumber: 0, width: undefined, height: undefined };
            offset = annotationObject.offset;
        }
        else if (!annotationObject.offset) {
            offset = { x: 1, y: 1 };
        }
        else {
            offset = annotationObject.offset;
        }
        //Creating the CurrentDate and Annotation name
        var currentDateString = this.pdfViewer.annotation.stickyNotesAnnotationModule.getDateAndTime();
        var annotationName = this.pdfViewer.annotation.createGUID();
        var fontStyle = annotationObject.fontStyle ? annotationObject.fontStyle : FontStyle.None;
        //Creating annotation settings
        var annotationSelectorSettings = this.pdfViewer.freeTextSettings.annotationSelectorSettings;
        this.pdfViewerBase.updateSelectorSettings(annotationSelectorSettings);
        var annotationSettings = this.pdfViewer.annotationModule.updateSettings(this.pdfViewer.freeTextSettings);
        var allowedInteractions = this.pdfViewer.freeTextSettings.allowedInteractions ?
            this.pdfViewer.freeTextSettings.allowedInteractions : this.pdfViewer.annotationSettings.allowedInteractions;
        annotationObject.author = annotationObject.author ? annotationObject.author : this.pdfViewer.annotationModule.updateAnnotationAuthor('freeText', annotationSettings.annotationSubType);
        annotationSettings.isLock = annotationObject.isLock ? annotationObject.isLock : annotationSettings.isLock;
        if (this.pdfViewer.freeTextSettings.isLock || this.pdfViewer.annotationSettings.isLock ||
            this.pdfViewer.freeTextSettings.isReadonly) {
            annotationObject.isReadonly = true;
        }
        annotationSettings.minHeight = annotationObject.minHeight ? annotationObject.minHeight : 0;
        annotationSettings.minWidth = annotationObject.minWidth ? annotationObject.minWidth : 0;
        annotationSettings.maxWidth = annotationObject.maxWidth ? annotationObject.maxWidth : 0;
        annotationSettings.maxHeight = annotationObject.maxHeight ? annotationObject.maxHeight : 0;
        annotationObject.width = annotationObject.width ? annotationObject.width : 150;
        annotationObject.height = annotationObject.height ? annotationObject.height : 24.6;
        //Creating Annotation objects with it's proper properties
        var freeTextAnnotation = [];
        var freeText = {
            AllowedInteractions: annotationObject.allowedInteractions ? annotationObject.allowedInteractions : allowedInteractions,
            AnnotName: annotationName,
            AnnotType: 'freeText',
            AnnotationFlags: 'Default',
            AnnotationIntent: null,
            AnnotationSelectorSettings: annotationObject.annotationSelectorSettings ?
                annotationObject.annotationSelectorSettings : annotationSelectorSettings,
            AnnotationSettings: annotationSettings,
            Author: annotationObject.author ? annotationObject.author : 'Guest',
            Border: { HorizontalRadius: 0, VerticalRadius: 0, Width: !isNullOrUndefined(annotationObject.borderWidth) ?
                    annotationObject.borderWidth : 1 },
            BorderColor: { IsEmpty: true, B: 255, Blue: 1, C: 0, G: 255 },
            Bounds: { X: offset.x, Y: offset.y, Width: annotationObject.width,
                Height: annotationObject.height, Left: offset.x, Top: offset.y, Right: offset.x + annotationObject.width,
                Bottom: offset.y + annotationObject.height },
            CalloutLines: null,
            Color: { IsEmpty: false, B: 51, Blue: 0.2, C: 0, G: 255 },
            Comments: null,
            CreatedDate: currentDateString,
            CustomData: annotationObject.customData ? annotationObject.customData : null,
            ExistingCustomData: null,
            FillColor: annotationObject.fillColor ? annotationObject.fillColor : '#ffffff00',
            Flatten: false,
            FlattenPopups: false,
            Font: { Bold: (fontStyle & FontStyle.Bold) === FontStyle.Bold,
                Italic: (fontStyle & FontStyle.Italic) === FontStyle.Italic,
                Strikeout: (fontStyle & FontStyle.Strikethrough) === FontStyle.Strikethrough,
                Underline: (fontStyle & FontStyle.Underline) === FontStyle.Underline },
            FontColor: annotationObject.fontColor ? annotationObject.fontColor : '#000',
            FontFamily: annotationObject.fontFamily ? annotationObject.fontFamily : 'Helvetica',
            FontSize: annotationObject.fontSize ? annotationObject.fontSize : 16,
            FreeTextAnnotationType: 'Text Box',
            InnerColor: null,
            IsCommentLock: false,
            IsLock: annotationObject.isLock ? annotationObject.isLock : false,
            IsPrint: !isNullOrUndefined(annotationObject.isPrint) ? annotationObject.isPrint : true,
            Layer: null,
            LineEndingStyle: 'OpenArrow',
            Location: null,
            MarkupText: annotationObject.defaultText ? annotationObject.defaultText : 'Type Here',
            ModifiedDate: '',
            Name: annotationName,
            Opacity: annotationObject.opacity ? annotationObject.opacity : 1,
            Page: null,
            PageTags: null,
            ReviewHistory: null,
            Rotate: 0,
            IsReadonly: annotationObject.isReadonly ? annotationObject.isReadonly : false,
            State: 'Unmarked',
            StateModel: 'None',
            StrokeColor: annotationObject.borderColor ? annotationObject.borderColor : '#ffffff00',
            Subject: annotationObject.subject ? annotationObject.subject : 'Text Box',
            Text: annotationObject.defaultText ? annotationObject.defaultText : 'Type Here',
            TextAlign: annotationObject.textAlignment ? annotationObject.textAlignment : 'Left',
            TextMarkupColor: null,
            Thickness: !isNullOrUndefined(annotationObject.borderWidth) ? annotationObject.borderWidth : 1,
            isAddAnnotationProgramatically: true
        };
        //Adding the annotation object to an array and return it
        freeTextAnnotation[0] = freeText;
        return { freeTextAnnotation: freeTextAnnotation };
    };
    /**
     * This method used to get the padding.
     *
     * @param {number} fontSize - This is font size
     * @returns {any} - any
     */
    FreeTextAnnotation.prototype.getPaddingValues = function (fontSize) {
        var leftPadding = 4; // Left padding used in the drawing.js
        var topPadding = 5; // Top padding used in the drawing.js
        var inputBoxpadding = 2; // we have set the input box padding for the free text.
        topPadding = (topPadding - inputBoxpadding) * (fontSize / 16);
        return [leftPadding, topPadding];
    };
    /**
     * @param {any} currentPosition - currentPosition
     * @private
     * @returns {void}
     */
    FreeTextAnnotation.prototype.addInputInZoom = function (currentPosition) {
        var zoomFactor = this.pdfViewerBase.getZoomFactor();
        this.inputBoxElement.style.left = (currentPosition.x * zoomFactor) + 'px';
        this.inputBoxElement.style.top = (currentPosition.y * zoomFactor) + 'px';
        this.inputBoxElement.style.height = (currentPosition.height * zoomFactor) + 'px';
        this.inputBoxElement.style.width = (currentPosition.width * zoomFactor) + 'px';
        this.inputBoxElement.style.borderWidth = (this.borderWidth * zoomFactor) + 'px';
        this.inputBoxElement.style.fontSize = (this.fontSize * zoomFactor) + 'px';
    };
    return FreeTextAnnotation;
}());
export { FreeTextAnnotation };
